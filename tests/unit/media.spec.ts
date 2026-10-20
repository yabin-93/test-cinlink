import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "@playwright/test";

import { checkMedia, probeMedia } from "../../src/assertions/media.js";
import { targets } from "../../src/config.js";
import { createSyntheticSrt, createSyntheticVideo } from "../../src/fixtures/media-factory.js";
import { checkSrtStructure } from "../../src/assertions/srt.js";

/**
 * 这组用例用 ffmpeg 真实合成素材再跑 ffprobe，
 * 目的是让断言器被真实验证，而不是只靠 mock 自证正确。
 */

const workDir = path.join(os.tmpdir(), "cinlink-web-tests-fixtures");

test.beforeAll(() => {
  if (!existsSync(workDir)) {
    // createSyntheticVideo 内部会创建目录
  }
});

test.describe("probeMedia + checkMedia（真实 ffmpeg 素材）", () => {
  test.setTimeout(120_000);

  test("带音轨视频可探测并匹配期望", async () => {
    const file = await createSyntheticVideo({
      outPath: path.join(workDir, "with-audio.mp4"),
      durationSec: 2,
      width: 320,
      height: 240,
      fps: 30,
      withAudio: true,
    });

    const info = await probeMedia(file, targets.ffprobePath);

    expect(info.video).toBeDefined();
    expect(info.video?.width).toBe(320);
    expect(info.video?.height).toBe(240);
    expect(info.audio.length).toBeGreaterThan(0);
    expect(info.sizeBytes).toBeGreaterThan(0);

    const check = checkMedia(info, {
      durationSec: 2,
      durationToleranceSec: 0.5,
      width: 320,
      height: 240,
      fps: 30,
      requireAudio: true,
    });
    expect(check.failures).toEqual([]);
  });

  test("无声视频按期望带音轨校验时判定失败", async () => {
    const file = await createSyntheticVideo({
      outPath: path.join(workDir, "no-audio.mp4"),
      durationSec: 1,
      width: 160,
      height: 120,
      fps: 15,
      withAudio: false,
    });

    const info = await probeMedia(file, targets.ffprobePath);
    expect(info.audio).toHaveLength(0);

    const check = checkMedia(info, { requireAudio: true });
    expect(check.ok).toBe(false);
    expect(check.failures.join(" ")).toContain("不存在音轨");
  });

  test("时长不符按容差判定失败", async () => {
    const file = await createSyntheticVideo({
      outPath: path.join(workDir, "short.mp4"),
      durationSec: 1,
      width: 160,
      height: 120,
      fps: 15,
      withAudio: false,
    });

    const info = await probeMedia(file, targets.ffprobePath);
    const check = checkMedia(info, { durationSec: 30, durationToleranceSec: 1.5 });
    expect(check.ok).toBe(false);
    expect(check.failures.join(" ")).toContain("超出容差");
  });

  test("分辨率不符判定失败", async () => {
    const file = await createSyntheticVideo({
      outPath: path.join(workDir, "size.mp4"),
      durationSec: 1,
      width: 320,
      height: 240,
      fps: 15,
      withAudio: false,
    });

    const info = await probeMedia(file, targets.ffprobePath);
    const check = checkMedia(info, { width: 1920, height: 1080 });
    expect(check.ok).toBe(false);
    expect(check.failures.join(" ")).toContain("宽度");
  });

  test("时长上下限约束生效", async () => {
    const file = await createSyntheticVideo({
      outPath: path.join(workDir, "bounds.mp4"),
      durationSec: 2,
      width: 160,
      height: 120,
      fps: 15,
      withAudio: false,
    });

    const info = await probeMedia(file, targets.ffprobePath);
    expect(checkMedia(info, { minDurationSec: 1, maxDurationSec: 3 }).ok).toBe(true);
    expect(checkMedia(info, { minDurationSec: 5 }).ok).toBe(false);
    expect(checkMedia(info, { maxDurationSec: 1 }).ok).toBe(false);
  });

  test("文件不存在时探测抛错（不可解码）", async () => {
    await expect(
      probeMedia(path.join(workDir, "definitely-missing.mp4"), targets.ffprobePath),
    ).rejects.toThrow();
  });
});

test.describe("SRT 与媒体对齐校验", () => {
  test("合成 SRT 结构合法且时长覆盖合理", async () => {
    const file = await createSyntheticSrt({
      outPath: path.join(workDir, "sample.srt"),
      cueCount: 5,
      cueDurationSec: 2,
      gapSec: 0.5,
    });

    const { readFile } = await import("node:fs/promises");
    const text = await readFile(file, "utf8");
    const check = checkSrtStructure(text);

    expect(check.failures).toEqual([]);
    expect(check.cues).toHaveLength(5);
    expect(check.cues[0].startMs).toBe(0);
    expect(check.cues[4].endMs).toBeGreaterThan(check.cues[0].endMs);
  });
});
