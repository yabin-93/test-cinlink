import { existsSync } from "node:fs";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import {
  checkChunkCount,
  checkUploadedAsset,
  expectedChunkCount,
  UPLOAD_CHUNK_SIZE_BYTES,
} from "../../src/assertions/upload.js";
import { deleteAgentFile, openWorkspaceSession, referenceAssetInPrompt, uploadAsset } from "../../src/workspace.js";

/**
 * G1 · 素材就绪
 *
 * 断言项（来自 `CinLink-Web-AI工作流链路测试设计.md`）：
 *   1. 上传返回 `cloud_file_id` 且非空、符合契约格式
 *   2. 分片上传的 part 数与文件大小匹配（5 MiB 分片）
 *   3. 服务端登记的 name / size / mime 与源文件一致
 *   4. S3 对象可读、字节数与源文件一致
 *
 * ## 成本与副作用
 *
 * **上传不消耗积分**（`api.js` 的上传链路不涉及 credits 校验；
 * 计费确认点在 `renderWorkspaceMediaAnalysisConfirm` 这类显式确认弹窗）。
 *
 * 但会上传**真实文件**并登记进项目素材库。**必须清理**——原因不是配额，
 * 而是**同名素材会让 AI 无法消歧**（详见 `src/workspace.ts` 的 `deleteAgentFile` 注释）。
 * 用例末尾一律调用 `deleteAgentFile`。
 *
 * ## 命名策略
 *
 * 上传用**唯一文件名**（`7MB-<时间戳>.mp4`），从源头避免与历史素材同名。
 * 因此 `name` 断言是"匹配 `7MB-<数字>.mp4`"而不是等于 `7MB.mp4`。
 *
 * ## 实测基线（预发 2026-10-16）
 *
 * ```
 * cloud_file_id : file_21dabdc872bf48f3      （file_ + 16 位 hex）
 * multipart     : true
 * part 请求数   : 2                          （7,815,126 / 5,242,880 = 2）
 * size_bytes    : 7815126                    （与源文件一致）
 * storage_backend: s3
 * ```
 */

/** 7.8 MB > 5 MiB，必然走分片上传 */
const SHORT = TEST_ASSETS.videoShort;

/** 唯一名策略下，服务端回显的文件名形如 `7MB-1760000000000.mp4` */
const UNIQUE_NAME_PATTERN = /^7MB-\d{10,}\.mp4$/;

test.describe("@regression G1 素材就绪", () => {
  test("前置：素材文件存在", () => {
    // 单独一条，避免素材缺失时表现为"上传失败"这种误导性症状
    expect(existsSync(SHORT.path), `素材不存在：${SHORT.path}`).toBe(true);
  });

  test("短视频素材上传后，登记信息与源文件完全一致", async ({ page }) => {
    await openWorkspaceSession(page);

    const outcome = await uploadAsset(page, SHORT);

    try {
      expect(outcome.httpStatus, "上传 complete 接口必须受理成功").toBeGreaterThanOrEqual(200);
      expect(outcome.httpStatus, "上传 complete 接口必须受理成功").toBeLessThan(300);
      await test.info().attach("G1-upload", {
        body: JSON.stringify({ cloudFileId: outcome.cloudFileId, name: outcome.name,
          sizeBytes: outcome.sizeBytes, partRequests: outcome.partRequests,
          multipart: outcome.multipart, httpStatus: outcome.httpStatus }, null, 2),
        contentType: "application/json",
      });
      console.log("");
      console.log("── G1 上传结果 ──────────────────────────────");
      console.log(`cloud_file_id : ${outcome.cloudFileId || "(空)"}`);
      console.log(`name          : ${outcome.name || "(空)"}（上传为 ${outcome.uploadedAs}）`);
      console.log(`size_bytes    : ${outcome.sizeBytes}`);
      console.log(`mime_type     : ${outcome.mimeType || "(空)"}`);
      console.log(`multipart     : ${outcome.multipart}`);
      console.log(`part 请求数   : ${outcome.partRequests}`);
      console.log("──────────────────────────────────────────────");
      console.log("");

      // 断言 1 + 3：ID 格式符合契约；size / mime 与源文件一致
      const assetCheck = checkUploadedAsset(
        {
          cloud_file_id: outcome.cloudFileId,
          size_bytes: outcome.sizeBytes,
          mime_type: outcome.mimeType,
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

      // 断言 3（名称）：唯一名策略下，服务端必须原样回显上传时用的名字
      expect(
        outcome.name,
        `服务端回显的文件名 ${outcome.name} 与上传时使用的 ${outcome.uploadedAs} 不一致`,
      ).toBe(outcome.uploadedAs);
      expect(
        outcome.name,
        `文件名 ${outcome.name} 不符合唯一名格式（期望 7MB-<时间戳>.mp4）`,
      ).toMatch(UNIQUE_NAME_PATTERN);

      // 断言 2：分片数与文件大小匹配
      const chunkCheck = checkChunkCount(SHORT.sizeBytes, outcome.partRequests);
      expect(
        chunkCheck.ok,
        `分片数校验失败（文件 ${SHORT.sizeBytes} 字节，分片 ${UPLOAD_CHUNK_SIZE_BYTES}）：\n${chunkCheck.failures.join("\n")}`,
      ).toBe(true);

      // 断言：大文件必须走分片而非单段（单段上限就是 5 MiB，走错分支说明分支判断有问题）
      expect(
        outcome.multipart,
        `素材 ${SHORT.sizeBytes} 字节超过单段上限 ${UPLOAD_CHUNK_SIZE_BYTES}，应走分片上传`,
      ).toBe(true);

      // 复用现有引用操作；用本次 cloud_file_id 精确选中候选，避免同名素材假通过。
      const reference = await referenceAssetInPrompt(page, outcome.uploadedAs, outcome.cloudFileId);
      expect(reference.ok, `刚上传的素材无法通过 @ 引用：${reference.candidates.join(", ")}`).toBe(true);
    } finally {
      // 必须清理：同名素材会让后续任务无法消歧
      const removed = await deleteAgentFile(page, outcome.cloudFileId);
      console.log(`清理素材 ${outcome.cloudFileId}: ${removed ? "成功" : "失败（需人工确认）"}`);
      if (!removed) test.info().annotations.push({ type: "cleanup", description: `素材未清理：${outcome.cloudFileId}` });
    }
  });

  test("分片数计算与实际请求数一致", async ({ page }) => {
    await openWorkspaceSession(page);

    const outcome = await uploadAsset(page, SHORT);

    try {
      const expected = expectedChunkCount(SHORT.sizeBytes);

      expect(expected, "按 5 MiB 分片，7.8MB 素材应为 2 片").toBe(2);
      expect(
        outcome.partRequests,
        `实际发出 ${outcome.partRequests} 个分片请求，期望 ${expected} 个`,
      ).toBe(expected);
    } finally {
      await deleteAgentFile(page, outcome.cloudFileId);
    }
  });

  test("S3 上的对象可读且字节数与源文件一致", async ({ page }) => {
    await openWorkspaceSession(page);

    const outcome = await uploadAsset(page, SHORT);

    try {
      expect(outcome.downloadUrl, "上传响应未返回可下载 URL，无法验证 S3 对象").not.toBe("");

      // 预签名 URL 有效期短，必须在本用例内立即使用
      const download = await page.request.get(outcome.downloadUrl, { timeout: 180_000 });
      expect(download.status(), "S3 预签名 URL 应可直接读取").toBe(200);

      const body = await download.body();
      expect(
        body.byteLength,
        `S3 对象字节数 ${body.byteLength} 与源文件 ${SHORT.sizeBytes} 不一致 —— 上传可能被截断`,
      ).toBe(SHORT.sizeBytes);
    } finally {
      await deleteAgentFile(page, outcome.cloudFileId);
    }
  });
});
