#!/usr/bin/env python3
"""区域帧差校验：判断产物是否只在批注区域内发生了明显变化。

用法：
  python tools/annotation/region_diff.py --source a.mp4 --result b.mp4 \
      --time 3.5 --rect 0.4 0.35 0.2 0.25

输出 JSON（stdout），退出码 0=通过，2=失败，1=参数/解码错误。

判定：
  inside_ratio  >= --min-inside（区域内变化像素占比）
  outside_ratio <= --max-outside（区域外变化像素占比）

自测：
  python tools/annotation/region_diff.py --selftest
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image


def extract_frame(video: Path, time_sec: float, out_png: Path, size: tuple[int, int]) -> None:
    cmd = [
        "ffmpeg", "-y", "-ss", f"{time_sec:.3f}", "-i", str(video),
        "-frames:v", "1", "-vf", f"scale={size[0]}:{size[1]}", str(out_png),
    ]
    proc = subprocess.run(cmd, capture_output=True)
    if proc.returncode != 0 or not out_png.exists():
        raise RuntimeError(f"抽帧失败：{video} @ {time_sec}s\n{proc.stderr.decode('utf-8', 'ignore')[-500:]}")


def load_gray(path: Path) -> np.ndarray:
    return np.asarray(Image.open(path).convert("L"), dtype=np.int16)


def compare_frames(
    source_png: Path,
    result_png: Path,
    rect: tuple[float, float, float, float],
    pixel_threshold: int,
    min_inside: float,
    max_outside: float,
    diff_png: Path | None = None,
) -> dict:
    a = load_gray(source_png)
    b = load_gray(result_png)
    if a.shape != b.shape:
        raise ValueError(f"帧尺寸不一致：{a.shape} vs {b.shape}")

    diff = np.abs(a - b) > pixel_threshold
    height, width = diff.shape
    x, y, w, h = rect
    x0, y0 = int(x * width), int(y * height)
    x1, y1 = int((x + w) * width), int((y + h) * height)
    x0, y0 = max(0, min(width - 1, x0)), max(0, min(height - 1, y0))
    x1, y1 = max(x0 + 1, min(width, x1)), max(y0 + 1, min(height, y1))

    inside = float(diff[y0:y1, x0:x1].mean())
    mask = np.ones_like(diff, dtype=bool)
    mask[y0:y1, x0:x1] = False
    outside = float(diff[mask].mean()) if mask.any() else 0.0

    if diff_png is not None:
        rgb = np.asarray(Image.open(result_png).convert("RGB")).copy()
        rgb[diff] = [255, 0, 0]
        Image.fromarray(rgb).save(diff_png)

    passed = inside >= min_inside and outside <= max_outside
    return {
        "pass": passed,
        "inside_ratio": round(inside, 6),
        "outside_ratio": round(outside, 6),
        "rect_px": {"x": x0, "y": y0, "w": x1 - x0, "h": y1 - y0},
        "thresholds": {
            "pixel_threshold": pixel_threshold,
            "min_inside": min_inside,
            "max_outside": max_outside,
        },
        "diff_png": str(diff_png) if diff_png else None,
    }


def selftest() -> int:
    out_dir = Path("reports") / "tmp" / "region-diff-selftest"
    out_dir.mkdir(parents=True, exist_ok=True)

    base = np.full((360, 640), 128, dtype=np.uint8)
    changed = base.copy()
    changed[144:216, 256:384] = 255  # 区域 x=0.4 y=0.4 w=0.2 h=0.2 内
    full = np.full((360, 640), 255, dtype=np.uint8)

    base_png = out_dir / "base.png"
    changed_png = out_dir / "changed.png"
    full_png = out_dir / "full.png"
    Image.fromarray(base).save(base_png)
    Image.fromarray(changed).save(changed_png)
    Image.fromarray(full).save(full_png)

    rect = (0.4, 0.4, 0.2, 0.2)
    inside_only = compare_frames(base_png, changed_png, rect, 12, 0.02, 0.02, out_dir / "diff-inside.png")
    full_frame = compare_frames(base_png, full_png, rect, 12, 0.02, 0.02, out_dir / "diff-full.png")

    ok = inside_only["pass"] and not full_frame["pass"]
    print(json.dumps({"selftest_pass": ok, "inside_only": inside_only, "full_frame": full_frame}, indent=2, ensure_ascii=False))
    return 0 if ok else 2


def main() -> int:
    parser = argparse.ArgumentParser(description="批注区域帧差校验")
    parser.add_argument("--source", type=Path)
    parser.add_argument("--result", type=Path)
    parser.add_argument("--time", type=float, default=0.0)
    parser.add_argument("--rect", type=float, nargs=4, metavar=("X", "Y", "W", "H"))
    parser.add_argument("--pixel-threshold", type=int, default=12)
    parser.add_argument("--min-inside", type=float, default=0.02)
    parser.add_argument("--max-outside", type=float, default=0.02)
    parser.add_argument("--out-dir", type=Path, default=Path("reports/artifacts/region-diff"))
    parser.add_argument("--selftest", action="store_true")
    args = parser.parse_args()

    if args.selftest:
        return selftest()
    if not args.source or not args.result or not args.rect:
        parser.error("需要 --source、--result 与 --rect X Y W H")

    args.out_dir.mkdir(parents=True, exist_ok=True)
    stamp = f"{args.time:.2f}".replace(".", "_")
    with tempfile.TemporaryDirectory() as tmp:
        source_png = Path(tmp) / "source.png"
        result_png = Path(tmp) / "result.png"
        extract_frame(args.source, args.time, source_png, (640, 360))
        extract_frame(args.result, args.time, result_png, (640, 360))
        report = compare_frames(
            source_png, result_png, tuple(args.rect),
            args.pixel_threshold, args.min_inside, args.max_outside,
            args.out_dir / f"diff-{stamp}.png",
        )

    report.update({"source": str(args.source), "result": str(args.result), "time": args.time, "rect": args.rect})
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["pass"] else 2


if __name__ == "__main__":
    sys.exit(main())
