/**
 * SRT 字幕结构校验
 *
 * 校验项直接对齐既有桌面用例 automatedChecks 的原话，不改判定口径：
 *   - 解析为 UTF-8 非空文本
 *   - 序号从 1 连续递增
 *   - 所有时间戳 start < end
 *   - 后一条不早于前一条
 */

export interface SrtCue {
  index: number;
  startMs: number;
  endMs: number;
  text: string;
}

export interface SrtCheck {
  ok: boolean;
  failures: string[];
  cues: SrtCue[];
}

export interface SrtCheckOptions {
  /** 产物原始字节；用于识别"能解析但编码已损坏"的假通过 */
  sourceBytes?: Uint8Array;
}

const TIME_TOKEN = /^(\d{1,3}):([0-5]?\d):([0-5]?\d)[,.](\d{1,3})$/;
const TIMING_LINE = /^(.*?)\s*-->\s*(.*?)(?:\s+.*)?$/;

export function parseTimestamp(value: string): number | null {
  const match = TIME_TOKEN.exec(value.trim());
  if (!match) return null;
  const [, hh, mm, ss, ms] = match;
  const millis = Number(ms.padEnd(3, "0").slice(0, 3));
  return Number(hh) * 3_600_000 + Number(mm) * 60_000 + Number(ss) * 1_000 + millis;
}

export function parseSrt(input: string): SrtCue[] {
  const normalized = input
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .trim();

  if (!normalized) return [];

  const cues: SrtCue[] = [];

  for (const block of normalized.split(/\n{2,}/)) {
    const lines = block.split("\n").filter((line, index) => index === 0 || line !== "");
    if (lines.length < 2) continue;

    const indexText = lines[0].trim();
    if (!/^\d+$/.test(indexText)) continue;

    const timing = TIMING_LINE.exec(lines[1] ?? "");
    if (!timing) continue;

    const startMs = parseTimestamp(timing[1]);
    const endMs = parseTimestamp(timing[2]);
    if (startMs === null || endMs === null) continue;

    cues.push({
      index: Number(indexText),
      startMs,
      endMs,
      text: lines.slice(2).join("\n").trim(),
    });
  }

  return cues;
}

export function checkSrtStructure(
  input: string,
  options: SrtCheckOptions = {},
): SrtCheck {
  const failures: string[] = [];

  if (typeof input !== "string" || input.trim().length === 0) {
    return { ok: false, failures: ["字幕内容为空"], cues: [] };
  }

  if (input.includes("\uFFFD")) {
    failures.push("字幕包含替换字符 U+FFFD，编码可能已损坏");
  }

  if (options.sourceBytes && options.sourceBytes.length === 0) {
    failures.push("字幕文件长度为 0");
  }

  const cues = parseSrt(input);

  if (cues.length === 0) {
    failures.push("未解析出任何字幕条目，格式不合法");
    return { ok: false, failures, cues };
  }

  cues.forEach((cue, position) => {
    if (cue.index !== position + 1) {
      failures.push(`第 ${position + 1} 条的序号为 ${cue.index}，未从 1 连续递增`);
    }
    if (!(cue.startMs < cue.endMs)) {
      failures.push(
        `第 ${position + 1} 条时间戳非法：start(${cue.startMs}) 未小于 end(${cue.endMs})`,
      );
    }
    if (cue.text.length === 0) {
      failures.push(`第 ${position + 1} 条文本为空`);
    }
  });

  for (let i = 1; i < cues.length; i += 1) {
    if (cues[i].startMs < cues[i - 1].startMs) {
      failures.push(
        `第 ${i + 1} 条的起始时间 ${cues[i].startMs} 早于前一条的 ${cues[i - 1].startMs}`,
      );
    }
  }

  return { ok: failures.length === 0, failures, cues };
}
