import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface SyntheticVideoOptions {
  outPath: string;
  durationSec?: number;
  width?: number;
  height?: number;
  fps?: number;
  withAudio?: boolean;
  ffmpegPath?: string;
}

/**
 * 用 ffmpeg lavfi 合成测试视频，不依赖外部素材文件。
 * 这样断言器可以被真实验证，而不是只靠 mock 自证。
 */
export async function createSyntheticVideo(
  options: SyntheticVideoOptions,
): Promise<string> {
  const {
    outPath,
    durationSec = 2,
    width = 320,
    height = 240,
    fps = 30,
    withAudio = true,
    ffmpegPath = "ffmpeg",
  } = options;

  await mkdir(path.dirname(outPath), { recursive: true });

  const args = [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `testsrc=size=${width}x${height}:rate=${fps}:duration=${durationSec}`,
  ];

  if (withAudio) {
    args.push(
      "-f",
      "lavfi",
      "-i",
      `sine=frequency=440:sample_rate=44100:duration=${durationSec}`,
    );
  }

  args.push(
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-pix_fmt",
    "yuv420p",
  );

  if (withAudio) {
    args.push("-c:a", "aac", "-shortest");
  } else {
    args.push("-an");
  }

  args.push(outPath);

  await execFileAsync(ffmpegPath, args, { maxBuffer: 16 * 1024 * 1024 });
  return outPath;
}

export interface SyntheticSrtOptions {
  outPath: string;
  cueCount?: number;
  /** 每条字幕的持续时间 */
  cueDurationSec?: number;
  /** 条目之间的间隔，0 表示首尾相接 */
  gapSec?: number;
}

/** 生成结构合法、序号连续、时间戳单调的 SRT */
export async function createSyntheticSrt(
  options: SyntheticSrtOptions,
): Promise<string> {
  const { outPath, cueCount = 3, cueDurationSec = 2, gapSec = 0.5 } = options;
  await mkdir(path.dirname(outPath), { recursive: true });

  const blocks: string[] = [];
  let cursor = 0;

  for (let i = 0; i < cueCount; i += 1) {
    const start = cursor;
    const end = start + cueDurationSec;
    blocks.push(
      [
        String(i + 1),
        `${formatTimestamp(start)} --> ${formatTimestamp(end)}`,
        `第 ${i + 1} 条测试字幕`,
      ].join("\n"),
    );
    cursor = end + gapSec;
  }

  const { writeFile } = await import("node:fs/promises");
  await writeFile(outPath, `${blocks.join("\n\n")}\n`, "utf8");
  return outPath;
}

export function formatTimestamp(seconds: number): string {
  const totalMs = Math.round(seconds * 1000);
  const hh = Math.floor(totalMs / 3_600_000);
  const mm = Math.floor((totalMs % 3_600_000) / 60_000);
  const ss = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;
  return `${pad(hh)}:${pad(mm)}:${pad(ss)},${String(ms).padStart(3, "0")}`;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}
