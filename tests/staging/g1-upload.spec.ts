import { existsSync } from "node:fs";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import {
  checkChunkCount,
  checkUploadedAsset,
  expectedChunkCount,
  UPLOAD_CHUNK_SIZE_BYTES,
} from "../../src/assertions/upload.js";
import {
  attachAsset,
  deleteAgentFile,
  disposeAttached,
  openWorkspaceSession,
  referenceAssetInPrompt,
  uploadAssetViaApi,
  type UploadedFacts,
} from "../../src/workspace.js";

/**
 * G1 · 素材就绪（新版工作台）
 *
 * 新版 composer 把上传推迟到发送、且是否上传不稳定，因此拆成两层断言：
 *   1. 上传合同（API 级）：按前端 bundle 的同一套请求形状
 *      presign → PUT → complete（>5 MiB 走 multipart/start + part + complete），
 *      断言文件 ID、大小、MIME、分片数、S3 字节数；
 *   2. UI 挂载：文件出现在 composer 的 media thumb，且可被 @ 引用。
 *
 * 这样不依赖新版“何时上传”的策略，同时仍覆盖上传链路的真实后端合同。
 */

const SHORT = TEST_ASSETS.videoShort;
const UNIQUE_NAME_PATTERN = /^7MB-\d{10,}\.mp4$/;

async function attachAndReference(page: import("@playwright/test").Page) {
  const attached = await attachAsset(page, SHORT);
  try {
    await expect(
      page.locator(".workspace-media-thumb").first(),
      "附件应出现在 composer 的 media thumb 中",
    ).toBeVisible({ timeout: 30_000 });

    const reference = await referenceAssetInPrompt(page, attached.uploadedAs);
    expect(
      reference.ok,
      `刚挂上的素材无法通过 @ 引用：${reference.candidates.join(", ")}`,
    ).toBe(true);
  } finally {
    disposeAttached(attached);
  }
}

async function cleanup(page: import("@playwright/test").Page, upload: UploadedFacts) {
  if (!upload.fileId) return;
  const removed = await deleteAgentFile(page, upload.fileId).catch(() => false);
  console.log(`清理素材 ${upload.fileId}: ${removed ? "成功" : "失败（需人工确认）"}`);
  if (!removed) {
    test.info().annotations.push({ type: "cleanup", description: `素材未清理：${upload.fileId}` });
  }
}

test.describe("@regression G1 素材就绪", () => {
  test("前置：素材文件存在", () => {
    expect(existsSync(SHORT.path), `素材不存在：${SHORT.path}`).toBe(true);
  });

  test("短视频素材上传后，登记信息与源文件完全一致", async ({ page }) => {
    await openWorkspaceSession(page);
    await attachAndReference(page);

    const upload = await uploadAssetViaApi(page, SHORT);
    try {
      expect(upload.httpStatus, "上传 complete 接口必须受理成功").toBe(200);

      await test.info().attach("G1-upload", {
        body: JSON.stringify(upload, null, 2),
        contentType: "application/json",
      });

      console.log("");
      console.log("── G1 上传结果 ──────────────────────────────");
      console.log(`file_id       : ${upload.fileId || "(空)"}`);
      console.log(`name          : ${upload.name || "(空)"}`);
      console.log(`size_bytes    : ${upload.sizeBytes}`);
      console.log(`mime_type     : ${upload.mimeType || "(空)"}`);
      console.log(`multipart     : ${upload.multipart}`);
      console.log(`part 请求数   : ${upload.partRequests}`);
      console.log("──────────────────────────────────────────────");

      const assetCheck = checkUploadedAsset(
        {
          cloud_file_id: upload.fileId,
          size_bytes: upload.sizeBytes,
          mime_type: upload.mimeType,
        },
        {
          sizeBytes: SHORT.sizeBytes,
          mimeType: SHORT.mimeType,
          expectFormat: true,
        },
      );
      expect(
        assetCheck.ok,
        `素材登记信息校验失败：\n${assetCheck.failures.join("\n")}`,
      ).toBe(true);

      expect(upload.name, "服务端应回显上传时使用的唯一文件名").toMatch(UNIQUE_NAME_PATTERN);

      const chunkCheck = checkChunkCount(SHORT.sizeBytes, upload.partRequests);
      expect(
        chunkCheck.ok,
        `分片数校验失败（文件 ${SHORT.sizeBytes} 字节，分片 ${UPLOAD_CHUNK_SIZE_BYTES}）：\n${chunkCheck.failures.join("\n")}`,
      ).toBe(true);

      expect(
        upload.multipart,
        `素材 ${SHORT.sizeBytes} 字节超过单段上限 ${UPLOAD_CHUNK_SIZE_BYTES}，应走分片上传`,
      ).toBe(true);
    } finally {
      await cleanup(page, upload);
    }
  });

  test("分片数计算与实际请求数一致", async ({ page }) => {
    await openWorkspaceSession(page);
    const upload = await uploadAssetViaApi(page, SHORT);
    try {
      const expected = expectedChunkCount(SHORT.sizeBytes);
      expect(expected, "按 5 MiB 分片，7.8MB 素材应为 2 片").toBe(2);
      expect(
        upload.partRequests,
        `实际发出 ${upload.partRequests} 个分片请求，期望 ${expected} 个`,
      ).toBe(expected);
    } finally {
      await cleanup(page, upload);
    }
  });

  test("S3 上的对象可读且字节数与源文件一致", async ({ page }) => {
    await openWorkspaceSession(page);
    const upload = await uploadAssetViaApi(page, SHORT);
    try {
      expect(upload.downloadUrl, "上传响应未返回可下载 URL，无法验证 S3 对象").not.toBe("");

      const download = await page.request.get(upload.downloadUrl, { timeout: 180_000 });
      expect(download.status(), "S3 预签名 URL 应可直接读取").toBe(200);

      const body = await download.body();
      expect(
        body.byteLength,
        `S3 对象字节数 ${body.byteLength} 与源文件 ${SHORT.sizeBytes} 不一致 —— 上传可能被截断`,
      ).toBe(SHORT.sizeBytes);
    } finally {
      await cleanup(page, upload);
    }
  });
});
