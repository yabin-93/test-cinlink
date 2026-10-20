import { execFile } from "node:child_process";
import { promisify } from "node:util";

import type { CheckResult } from "./job.js";

const execFileAsync = promisify(execFile);

export interface VideoStream {
  codec: string;
  width: number;
  height: number;
  fps: number;
}

export interface AudioStream {
  codec: string;
  channels: number;
}

export interface MediaInfo {
  durationSec: number;
  container: string;
  sizeBytes: number;
  video?: VideoStream;
  audio: AudioStream[];
  raw: unknown;
}

export interface MediaExpectation {
  /** 期望时长，配合 durationToleranceSec 使用 */
  durationSec?: number;
  durationToleranceSec?: number;
  minDurationSec?: number;
  maxDurationSec?: number;
  width?: number;
  height?: number;
  fps?: number;
  fpsTolerance?: number;
  videoCodec?: string;
  requireVideo?: boolean;
  requireAudio?: boolean;
  noAudio?: boolean;
  maxSizeBytes?: number;
}

function parseFrameRate(value: unknown): number {
  const text = String(value ?? "").trim();
  if (!text) return 0;
  const [num, den] = text.split("/");
  const n = Number(num);
  const d = den === undefined ? 1 : Number(den);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return 0;
  return n / d;
}

function normalize(raw: unknown): MediaInfo {
  const data = raw as {
    format?: Record<string, unknown>;
    streams?: Array<Record<string, unknown>>;
  };
  const format = data.format ?? {};
  const streams = data.streams ?? [];

  const videoStream = streams.find((s) => s.codec_type === "video");
  const audioStreams = streams.filter((s) => s.codec_type === "audio");

  return {
    durationSec: Number(format.duration ?? 0),
    container: String(format.format_name ?? ""),
    sizeBytes: Number(format.size ?? 0),
    video: videoStream
      ? {
          codec: String(videoStream.codec_name ?? ""),
          width: Number(videoStream.width ?? 0),
          height: Number(videoStream.height ?? 0),
          fps: parseFrameRate(videoStream.r_frame_rate),
        }
      : undefined,
    audio: audioStreams.map((s) => ({
      codec: String(s.codec_name ?? ""),
      channels: Number(s.channels ?? 0),
    })),
    raw,
  };
}

/** 调用 ffprobe 读取媒体事实。可解码性是隐含前提——解析失败即判定不可读。 */
export async function probeMedia(
  file: string,
  ffprobePath = "ffprobe",
): Promise<MediaInfo> {
  const { stdout } = await execFileAsync(
    ffprobePath,
    [
      "-v",
      "error",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      file,
    ],
    { maxBuffer: 16 * 1024 * 1024 },
  );
  return normalize(JSON.parse(stdout));
}

export function checkMedia(
  info: MediaInfo,
  expected: MediaExpectation = {},
): CheckResult {
  const failures: string[] = [];
  const tolerance = expected.durationToleranceSec ?? 1.5;

  if (expected.requireVideo !== false && !info.video) {
    failures.push("产物中不存在视频流");
  }

  if (expected.requireAudio && info.audio.length === 0) {
    failures.push("产物中不存在音轨，但期望保留音轨");
  }

  if (expected.noAudio && info.audio.length > 0) {
    failures.push(`期望无音轨，实际存在 ${info.audio.length} 条`);
  }

  if (expected.durationSec !== undefined) {
    const delta = Math.abs(info.durationSec - expected.durationSec);
    if (delta > tolerance) {
      failures.push(
        `时长 ${info.durationSec.toFixed(3)}s 与期望 ${expected.durationSec}s 相差 ${delta.toFixed(3)}s，超出容差 ${tolerance}s`,
      );
    }
  }

  if (expected.minDurationSec !== undefined && info.durationSec < expected.minDurationSec) {
    failures.push(`时长 ${info.durationSec.toFixed(3)}s 小于下限 ${expected.minDurationSec}s`);
  }

  if (expected.maxDurationSec !== undefined && info.durationSec > expected.maxDurationSec) {
    failures.push(`时长 ${info.durationSec.toFixed(3)}s 超出上限 ${expected.maxDurationSec}s`);
  }

  if (info.video) {
    if (expected.width !== undefined && info.video.width !== expected.width) {
      failures.push(`宽度 ${info.video.width} 与期望 ${expected.width} 不一致`);
    }
    if (expected.height !== undefined && info.video.height !== expected.height) {
      failures.push(`高度 ${info.video.height} 与期望 ${expected.height} 不一致`);
    }
    if (expected.fps !== undefined) {
      const fpsTolerance = expected.fpsTolerance ?? 1.5;
      const delta = Math.abs(info.video.fps - expected.fps);
      if (delta > fpsTolerance) {
        failures.push(
          `帧率 ${info.video.fps.toFixed(3)} 与期望 ${expected.fps} 相差 ${delta.toFixed(3)}，超出容差 ${fpsTolerance}`,
        );
      }
    }
    if (expected.videoCodec && info.video.codec !== expected.videoCodec) {
      failures.push(`视频编码为 ${info.video.codec}，期望 ${expected.videoCodec}`);
    }
  }

  if (expected.maxSizeBytes !== undefined && info.sizeBytes > expected.maxSizeBytes) {
    failures.push(`文件大小 ${info.sizeBytes} 超出上限 ${expected.maxSizeBytes}`);
  }

  return { ok: failures.length === 0, failures };
}
