import { expect, test } from "@playwright/test";

import {
  UPLOAD_CHUNK_SIZE_BYTES,
  checkAssetReferencable,
  checkChunkCount,
  checkUploadedAsset,
  expectedChunkCount,
} from "../../src/assertions/upload.js";

/** 真实素材大小：7MB.mp4 = 7,815,126 字节（用于计算分片数） */
const SEVEN_MB_SAMPLE = 7_815_126;

test.describe("expectedChunkCount", () => {
  test("零字节或非法大小不能通过分片验收", () => {
    for (const size of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(checkChunkCount(size, 0).ok).toBe(false);
    }
  });
  test("按 5 MiB 分片计算 7.8MB 素材应为 2 片", () => {
    expect(expectedChunkCount(SEVEN_MB_SAMPLE)).toBe(2);
  });

  test("恰好等于分片大小算 1 片，不多算", () => {
    expect(expectedChunkCount(UPLOAD_CHUNK_SIZE_BYTES)).toBe(1);
  });

  test("超出 1 字节即为 2 片（边界）", () => {
    expect(expectedChunkCount(UPLOAD_CHUNK_SIZE_BYTES + 1)).toBe(2);
  });

  test("小于分片大小算 1 片", () => {
    expect(expectedChunkCount(1024)).toBe(1);
  });

  test("零字节不算分片", () => {
    expect(expectedChunkCount(0)).toBe(0);
  });

  test("非法输入返回 0，不抛异常", () => {
    expect(expectedChunkCount(Number.NaN)).toBe(0);
    expect(expectedChunkCount(-1)).toBe(0);
  });
});

test.describe("checkUploadedAsset 正向", () => {
  test("字段齐全时通过", () => {
    const r = checkUploadedAsset(
      {
        cloud_file_id: "cf_abc123",
        name: "7MB.mp4",
        size_bytes: SEVEN_MB_SAMPLE,
        mime_type: "video/mp4",
      },
      { name: "7MB.mp4", sizeBytes: SEVEN_MB_SAMPLE, mimeType: "video/mp4" },
    );
    expect(r.ok).toBe(true);
    expect(r.failures).toEqual([]);
  });

  test("旧版 file_<hex16> ID 符合契约", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "file_72c83ab55d4542f3", size_bytes: SEVEN_MB_SAMPLE },
      { sizeBytes: SEVEN_MB_SAMPLE, expectFormat: true },
    );
    expect(r.failures).toEqual([]);
  });

  test("新版 file_cloud_<base32> ID 符合契约", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "file_cloud_zquu6agl4hjy5eyplmfrfxv4ji", size_bytes: SEVEN_MB_SAMPLE },
      { sizeBytes: SEVEN_MB_SAMPLE, expectFormat: true },
    );
    expect(r.failures).toEqual([]);
  });

  test("云端未返回 name / mime_type 时不判失败（只有 cloud_file_id 是必须的）", () => {    const r = checkUploadedAsset(
      { cloud_file_id: "cf_abc123", size_bytes: SEVEN_MB_SAMPLE },
      { name: "7MB.mp4", sizeBytes: SEVEN_MB_SAMPLE, mimeType: "video/mp4" },
    );
    expect(r.ok).toBe(true);
  });

  test("size 字段名兼容 size_bytes", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "cf_abc123", size: SEVEN_MB_SAMPLE },
      { sizeBytes: SEVEN_MB_SAMPLE },
    );
    expect(r.ok).toBe(true);
  });
});

test.describe("checkUploadedAsset 负向", () => {
  test("接口 200 但没返回 cloud_file_id 判定失败（最典型的假成功）", () => {
    const r = checkUploadedAsset({ name: "7MB.mp4", size_bytes: SEVEN_MB_SAMPLE });
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("未返回 cloud_file_id");
  });

  test("cloud_file_id 为空串判定失败", () => {
    const r = checkUploadedAsset({ cloud_file_id: "   " });
    expect(r.ok).toBe(false);
  });

  test("cloud_file_id 含空白字符判定失败", () => {
    const r = checkUploadedAsset({ cloud_file_id: "cf_ab c123" });
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("空白字符");
  });

  test("cloud_file_id 异常长判定失败", () => {
    const r = checkUploadedAsset({ cloud_file_id: "x".repeat(201) });
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("长度异常");
  });

  test("素材为空对象判定失败", () => {
    expect(checkUploadedAsset({}).ok).toBe(false);
  });

  test("null 判定失败且不抛异常", () => {
    expect(checkUploadedAsset(null).ok).toBe(false);
  });

  test("大小不符判定失败", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "cf_abc123", size_bytes: SEVEN_MB_SAMPLE - 1 },
      { sizeBytes: SEVEN_MB_SAMPLE },
    );
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("大小不符");
  });

  test("期望大小但云端未返回大小判定失败（不能默认通过）", () => {
    const r = checkUploadedAsset({ cloud_file_id: "cf_abc123" }, { sizeBytes: SEVEN_MB_SAMPLE });
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("无法校验大小");
  });

  test("容差范围内的差异通过", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "cf_abc123", size_bytes: SEVEN_MB_SAMPLE + 10 },
      { sizeBytes: SEVEN_MB_SAMPLE, sizeToleranceBytes: 64 },
    );
    expect(r.ok).toBe(true);
  });

  test("名称不符判定失败（云端确实返回了 name 时）", () => {
    const r = checkUploadedAsset(
      { cloud_file_id: "cf_abc123", name: "other.mp4" },
      { name: "7MB.mp4" },
    );
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("名称不符");
  });
});

test.describe("checkChunkCount", () => {
  test("分片数匹配通过", () => {
    expect(checkChunkCount(SEVEN_MB_SAMPLE, 2).ok).toBe(true);
  });

  test("分片数少于预期判定失败（可能被截断）", () => {
    const r = checkChunkCount(SEVEN_MB_SAMPLE, 1);
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("应为 2 个");
  });

  test("分片数多于预期判定失败（可能重复上传）", () => {
    expect(checkChunkCount(SEVEN_MB_SAMPLE, 3).ok).toBe(false);
  });
});

test.describe("checkAssetReferencable", () => {
  test("候选中能找到该素材通过", () => {
    const r = checkAssetReferencable(
      [{ cloud_file_id: "cf_a", name: "a.mp4" }, { cloud_file_id: "cf_b", name: "b.mp4" }],
      { cloud_file_id: "cf_b" },
    );
    expect(r.ok).toBe(true);
  });

  test("候选中找不到判定失败（上传成功但引用不到 = 等于没传）", () => {
    const r = checkAssetReferencable(
      [{ cloud_file_id: "cf_a", name: "a.mp4" }],
      { cloud_file_id: "cf_missing" },
    );
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("未找到刚上传的素材");
  });

  test("候选为空判定失败", () => {
    expect(checkAssetReferencable([], { cloud_file_id: "cf_a" }).ok).toBe(false);
  });

  test("待校验素材缺 id 判定失败", () => {
    const r = checkAssetReferencable([{ cloud_file_id: "cf_a" }], {});
    expect(r.ok).toBe(false);
    expect(r.failures.join(" ")).toContain("无法验证可引用性");
  });

  test("按 id 匹配而不是按名称匹配（同名不同 id 不算命中）", () => {
    const r = checkAssetReferencable(
      [{ cloud_file_id: "cf_other", name: "7MB.mp4" }],
      { cloud_file_id: "cf_mine", name: "7MB.mp4" },
    );
    expect(r.ok).toBe(false);
  });
});
