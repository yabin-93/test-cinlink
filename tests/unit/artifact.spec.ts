import { expect, test } from "@playwright/test";

import {
  artifactsOfKind,
  checkArtifactOwnership,
  checkArtifactsDeliverable,
  checkBurnedSubtitleVideo,
  checkCompletionDelivered,
  checkSubtitleArtifact,
  checkVideoMetadataMatches,
  deliveryCloudFileIds,
  extractArtifacts,
  type RunArtifact,
} from "../../src/assertions/artifact.js";

function artifact(patch: Partial<RunArtifact> = {}): RunArtifact {
  return {
    id: "file_result",
    deliveryId: "artifact_result",
    name: "result.mp4",
    kind: "video",
    url: "https://cdn.example.test/result.mp4",
    cloudFileId: "file_result",
    metadata: {},
    ...patch,
  };
}

function completedRun(patch: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    artifacts: [
      {
        id: "file_result",
        name: "result.mp4",
        kind: "video",
        url: "https://cdn.example.test/result.mp4",
        cloud_file_id: "file_result",
        metadata: { duration_sec: "2", has_audio: "true", content_sha256: "abc" },
      },
    ],
    completion: { primary_artifact_ids: ["artifact_result"] },
    client_delivery: {
      status: "ready",
      primary: [{ id: "artifact_result", cloud_file_id: "file_result" }],
    },
    ...patch,
  };
}

test.describe("G5 产物交付与归属", () => {
  test("从 Run 详情提取产物并保留 metadata 字符串", () => {
    const artifacts = extractArtifacts(completedRun());
    expect(artifacts).toHaveLength(1);
    expect(artifacts[0].cloudFileId).toBe("file_result");
    expect(artifacts[0].metadata.duration_sec).toBe("2");
    expect(artifactsOfKind(artifacts, "video")).toHaveLength(1);
  });

  test("所有交付字段齐全时通过", () => {
    expect(checkArtifactsDeliverable([artifact()]).failures).toEqual([]);
  });

  test("空产物、缺 URL、缺 ID 或 cloud_file_id 均判定失败", () => {
    expect(checkArtifactsDeliverable([]).ok).toBe(false);
    const result = checkArtifactsDeliverable([
      artifact({ id: "", url: "", cloudFileId: "" }),
    ]);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toMatch(/缺少 id|没有可下载 URL|缺少 cloud_file_id/);
  });

  test("交付级产物必须归属于本次 Run", () => {
    const result = checkArtifactOwnership(
      [artifact({ metadata: { producer_run_id: "run-current", creation_key: "job-run-current" } })],
      "run-current",
      ["file_result"],
    );
    expect(result.failures).toEqual([]);
  });

  test("交付级产物缺 producer_run_id 或归属错误时失败", () => {
    const missing = checkArtifactOwnership([artifact()], "run-current", ["file_result"]);
    expect(missing.ok).toBe(false);
    expect(missing.failures.join(" ")).toContain("缺少 producer_run_id");

    const wrong = checkArtifactOwnership(
      [artifact({ metadata: { producer_run_id: "run-history" } })],
      "run-current",
      ["file_result"],
    );
    expect(wrong.failures.join(" ")).toContain("归属错误");
  });

  test("中间产物没有 producer_run_id 不误报", () => {
    const result = checkArtifactOwnership(
      [artifact({ cloudFileId: "file-intermediate", metadata: {} })],
      "run-current",
    );
    expect(result.failures).toEqual([]);
  });

  test("completion 与 client_delivery 互相引用且产物存在时通过", () => {
    const run = completedRun();
    expect(checkCompletionDelivered(run).failures).toEqual([]);
    expect(deliveryCloudFileIds(run)).toEqual(["file_result"]);
  });

  test("主产物未交付或 delivery 指向不存在文件时失败", () => {
    const missingPrimary = checkCompletionDelivered(
      completedRun({ client_delivery: { status: "ready", primary: [] } }),
    );
    expect(missingPrimary.ok).toBe(false);
    expect(missingPrimary.failures.join(" ")).toContain("未出现在");

    const dangling = checkCompletionDelivered(
      completedRun({
        client_delivery: {
          status: "ready",
          primary: [{ id: "artifact_result", cloud_file_id: "file_missing" }],
        },
      }),
    );
    expect(dangling.failures.join(" ")).toContain("在 artifacts 中不存在");
  });
});

test.describe("G6 产物结构与参数", () => {
  test("字幕烧录视频的 fact receipt 满足预期语言时通过", () => {
    const result = checkBurnedSubtitleVideo(
      artifact({
        metadata: {
          contains_burned_subtitles: "true",
          subtitle_has_usable_cues: "true",
          subtitle_languages: "zh,en",
        },
      }),
      ["zh", "en"],
    );
    expect(result.failures).toEqual([]);
  });

  test("字幕烧录标志或语言缺失时失败", () => {
    const result = checkBurnedSubtitleVideo(artifact({ metadata: {} }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toMatch(/contains_burned_subtitles|subtitle_has_usable_cues|subtitle_languages/);
  });

  test("视频时长在容差内且有音轨和哈希时通过", () => {
    const result = checkVideoMetadataMatches(
      artifact({ metadata: { duration_sec: "2.05", has_audio: "true", content_sha256: "abc" } }),
      { durationSec: 2, durationToleranceSec: 0.1, requireAudio: true },
    );
    expect(result.failures).toEqual([]);
  });

  test("视频被截断、丢失音轨或完整性哈希缺失时失败", () => {
    const result = checkVideoMetadataMatches(
      artifact({ metadata: { duration_sec: "1", has_audio: "false" } }),
      { durationSec: 2, requireAudio: true },
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toMatch(/时长|音轨|content_sha256/);
  });

  test("字幕产物至少包含可下载的 .srt，size_bytes 缺失不误报", () => {
    const result = checkSubtitleArtifact([
      artifact({
        name: "subtitle.srt",
        kind: "subtitle",
        metadata: {},
      }),
    ]);
    expect(result.failures).toEqual([]);
  });

  test("字幕为空或只有 rendered.txt 时失败", () => {
    const empty = checkSubtitleArtifact([
      artifact({ name: "subtitle.srt", kind: "subtitle", metadata: { size_bytes: "0" } }),
    ]);
    expect(empty.ok).toBe(false);
    expect(empty.failures.join(" ")).toContain("空文件");

    const noSrt = checkSubtitleArtifact([
      artifact({ name: "rendered.txt", kind: "subtitle" }),
    ]);
    expect(noSrt.failures.join(" ")).toContain("没有 .srt");
  });
});
