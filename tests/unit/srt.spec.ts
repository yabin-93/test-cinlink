import { expect, test } from "@playwright/test";

import { checkSrtStructure, parseSrt, parseTimestamp } from "../../src/assertions/srt.js";

const VALID_SRT = [
  "1",
  "00:00:01,000 --> 00:00:03,000",
  "第一句字幕",
  "",
  "2",
  "00:00:03,500 --> 00:00:05,000",
  "第二句字幕",
  "",
].join("\n");

test.describe("parseTimestamp", () => {
  test("解析标准时间戳", () => {
    expect(parseTimestamp("00:00:01,500")).toBe(1500);
    expect(parseTimestamp("01:02:03,004")).toBe(3_723_004);
  });

  test("容忍点号分隔与多余空白", () => {
    expect(parseTimestamp("  00:00:02.250  ")).toBe(2250);
  });

  test("非法时间戳返回 null", () => {
    expect(parseTimestamp("abc")).toBeNull();
    expect(parseTimestamp("00:99:00,000")).toBeNull();
  });
});

test.describe("parseSrt", () => {
  test("解析出正确条目数与文本", () => {
    const cues = parseSrt(VALID_SRT);
    expect(cues).toHaveLength(2);
    expect(cues[0].index).toBe(1);
    expect(cues[0].startMs).toBe(1000);
    expect(cues[0].endMs).toBe(3000);
    expect(cues[0].text).toBe("第一句字幕");
  });

  test("保留多行字幕文本", () => {
    const cues = parseSrt(
      ["1", "00:00:01,000 --> 00:00:02,000", "第一行", "第二行", ""].join("\n"),
    );
    expect(cues[0].text).toBe("第一行\n第二行");
  });

  test("兼容 CRLF 与 BOM", () => {
    const crlf = "\uFEFF" + VALID_SRT.replace(/\n/g, "\r\n");
    expect(parseSrt(crlf)).toHaveLength(2);
  });
});

test.describe("checkSrtStructure 正向", () => {
  test("合法字幕通过全部校验", () => {
    const result = checkSrtStructure(VALID_SRT);
    expect(result.failures).toEqual([]);
    expect(result.ok).toBe(true);
  });

  test("首尾相接（无间隔）仍然合法", () => {
    const touching = [
      "1",
      "00:00:00,000 --> 00:00:02,000",
      "A",
      "",
      "2",
      "00:00:02,000 --> 00:00:04,000",
      "B",
      "",
    ].join("\n");
    expect(checkSrtStructure(touching).ok).toBe(true);
  });
});

test.describe("checkSrtStructure 负向", () => {
  test("空内容判定失败", () => {
    expect(checkSrtStructure("").ok).toBe(false);
    expect(checkSrtStructure("   \n  ").ok).toBe(false);
  });

  test("序号不连续判定失败", () => {
    const broken = [
      "1",
      "00:00:01,000 --> 00:00:02,000",
      "A",
      "",
      "3",
      "00:00:03,000 --> 00:00:04,000",
      "B",
      "",
    ].join("\n");
    const result = checkSrtStructure(broken);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("未从 1 连续递增");
  });

  test("start 不小于 end 判定失败", () => {
    const broken = ["1", "00:00:05,000 --> 00:00:02,000", "A", ""].join("\n");
    const result = checkSrtStructure(broken);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("未小于");
  });

  test("时间戳倒退判定失败", () => {
    const broken = [
      "1",
      "00:00:10,000 --> 00:00:12,000",
      "A",
      "",
      "2",
      "00:00:01,000 --> 00:00:03,000",
      "B",
      "",
    ].join("\n");
    const result = checkSrtStructure(broken);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("早于前一条");
  });

  test("编码损坏（出现 U+FFFD）判定失败", () => {
    const result = checkSrtStructure(VALID_SRT + "\n\uFFFD\n");
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("U+FFFD");
  });

  test("非 SRT 内容判定失败", () => {
    const result = checkSrtStructure("这是一段普通文本，没有任何字幕结构");
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("未解析出任何字幕条目");
  });

  test("零字节文件判定失败", () => {
    const result = checkSrtStructure(VALID_SRT, { sourceBytes: new Uint8Array(0) });
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("长度为 0");
  });
});
