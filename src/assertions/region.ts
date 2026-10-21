import { execFile } from "node:child_process";
import path from "node:path";

export interface RegionRect {
  /** 归一化 0-1 */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RegionDiffOptions {
  source: string;
  result: string;
  timeSec: number;
  rect: RegionRect;
  pixelThreshold?: number;
  minInside?: number;
  maxOutside?: number;
  outDir?: string;
}

export interface RegionDiffReport {
  pass: boolean;
  inside_ratio: number;
  outside_ratio: number;
  rect_px: { x: number; y: number; w: number; h: number };
  thresholds: { pixel_threshold: number; min_inside: number; max_outside: number };
  diff_png: string | null;
  source: string;
  result: string;
  time: number;
  rect: number[];
}

export interface RegionCheck {
  ok: boolean;
  failures: string[];
}

const SCRIPT = path.resolve("tools", "annotation", "region_diff.py");

function runPython(args: string[]): Promise<{ stdout: string; stderr: string; code: number }> {
  const python = process.env.CINLINK_PYTHON || "python";
  return new Promise((resolve, reject) => {
    execFile(
      python,
      [SCRIPT, ...args],
      { timeout: 180_000, maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error && typeof (error as { code?: number }).code === "number") {
          resolve({ stdout, stderr, code: (error as { code: number }).code });
          return;
        }
        if (error) {
          reject(new Error(`region diff 执行失败：${stderr || error.message}`));
          return;
        }
        resolve({ stdout, stderr, code: 0 });
      },
    );
  });
}

/**
 * 调 `tools/annotation/region_diff.py`，返回结构化报告。
 * 退出码 2 表示“校验不通过”，不是执行错误。
 */
export async function checkRegionDiff(options: RegionDiffOptions): Promise<RegionDiffReport> {
  const args = [
    "--source", options.source,
    "--result", options.result,
    "--time", String(options.timeSec),
    "--rect", String(options.rect.x), String(options.rect.y), String(options.rect.w), String(options.rect.h),
  ];
  if (options.pixelThreshold !== undefined) args.push("--pixel-threshold", String(options.pixelThreshold));
  if (options.minInside !== undefined) args.push("--min-inside", String(options.minInside));
  if (options.maxOutside !== undefined) args.push("--max-outside", String(options.maxOutside));
  if (options.outDir) args.push("--out-dir", options.outDir);

  const { stdout, stderr, code } = await runPython(args);
  let report: RegionDiffReport;
  try {
    report = JSON.parse(stdout) as RegionDiffReport;
  } catch {
    throw new Error(`region diff 输出不是 JSON（exit=${code}）：${stdout.slice(0, 300)} ${stderr.slice(0, 300)}`);
  }
  if (code !== 0 && code !== 2) {
    throw new Error(`region diff 执行失败（exit=${code}）：${stderr.slice(0, 500)}`);
  }
  return report;
}

/** 与其它断言器一致的 ok/failures 形式，便于直接 expect(...).toBe(true) */
export function checkRegionChanged(report: RegionDiffReport): RegionCheck {
  const failures: string[] = [];
  if (!report.pass) {
    failures.push(
      `区域内外变化不符合预期：inside=${report.inside_ratio}（要求 ≥ ${report.thresholds.min_inside}），` +
        `outside=${report.outside_ratio}（要求 ≤ ${report.thresholds.max_outside}）`,
    );
  }
  if (report.rect_px.w <= 0 || report.rect_px.h <= 0) {
    failures.push("批注区域换算后为空");
  }
  if (!report.diff_png) {
    failures.push("没有生成差异热力图");
  }
  return { ok: failures.length === 0, failures };
}
