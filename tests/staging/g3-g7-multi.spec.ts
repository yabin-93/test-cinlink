import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import {
  cancelRun,
  deleteAgentFile,
  getRunDetail,
  openWorkspaceSession,
  pollRunUntilSettled,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
  type UploadOutcome,
} from "../../src/workspace.js";

/**
 * G3–G7 · 多工作流场景（MW-01 ~ MW-05）
 *
 * 验证“上一步产物/上下文能否被下一步继续使用”，以及同一会话内多任务的排队与取消。
 * 这些都是真实任务，会消耗积分与较长时间。
 */

const POLL_TIMEOUT_MS = 20 * 60_000;
const SHORT = TEST_ASSETS.videoShort;
const LONG = TEST_ASSETS.videoLong;

async function prepare(page: Page, asset = SHORT): Promise<UploadOutcome> {
  await openWorkspaceSession(page);
  const uploaded = await uploadAsset(page, asset);
  expect(uploaded.cloudFileId, "素材上传失败").not.toBe("");
  const reference = await referenceAssetInPrompt(page, uploaded.uploadedAs, uploaded.cloudFileId);
  expect(reference.ok, `@ 引用失败：${reference.candidates.join(", ")}`).toBe(true);
  return uploaded;
}

async function sendPrompt(page: Page, prompt: string): Promise<string> {
  await page.locator("#workspace-prompt").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Backspace");
  await page.keyboard.insertText(prompt);
  const submit = await submitCurrentPrompt(page);
  expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
  expect(submit.runId, "提交未返回 run_id").not.toBe("");
  return submit.runId;
}

async function waitDone(page: Page, runId: string, timeoutMs = POLL_TIMEOUT_MS) {
  const polled = await pollRunUntilSettled(page, runId, { timeoutMs, intervalMs: 5_000 });
  expect(polled.status, `任务未收敛到 done（run=${runId}）`).toBe("done");
}

test.describe("@regression G3–G7 多工作流", () => {
  test("@slow MW-01 串行依赖：字幕完成后继续翻译", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const uploaded = await prepare(page);
    try {
      const subtitleRun = await sendPrompt(page, "给这个视频生成中文字幕");
      await waitDone(page, subtitleRun);

      // 第二条不 @，依赖上一轮产物与上下文
      const translateRun = await sendPrompt(page, "把刚才的字幕翻译成英文，只输出字幕文件");
      await waitDone(page, translateRun);

      const detail = await getRunDetail(page, translateRun);
      const artifacts = extractArtifacts(detail);
      expect(
        artifacts.some((a) => /\.srt$/i.test(a.name)),
        `翻译没有 SRT 产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
      ).toBe(true);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  test("@slow MW-02 同源多任务：字幕与增强分别收敛", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const uploaded = await prepare(page);
    try {
      const subtitleRun = await sendPrompt(page, "给这个视频生成中文字幕");
      const enhanceRun = await sendPrompt(page, "增强这个视频的画质");
      expect(enhanceRun, "第二个任务没有创建新的 run").not.toBe(subtitleRun);

      await waitDone(page, subtitleRun);
      await waitDone(page, enhanceRun);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  test("@slow MW-03 单句复合：一条指令触发多步处理", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const uploaded = await prepare(page);
    try {
      const runId = await sendPrompt(page, "给这个视频加中文字幕，并把画质增强一下");
      await waitDone(page, runId);

      const detail = await getRunDetail(page, runId);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "复合指令没有产出任何产物").toBeGreaterThan(0);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  // 双素材混剪受 CINLINK-MIX-001 阻塞：续跑丢上下文，done 但 0 产物。
  test.fixme("@slow MW-04 多素材多任务：双素材混剪", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const first = await prepare(page);
    try {
      const second = await uploadAsset(page, LONG);
      const reference = await referenceAssetInPrompt(page, second.uploadedAs, second.cloudFileId);
      expect(reference.ok).toBe(true);

      const runId = await sendPrompt(page, "把这两个视频的高光混剪成 18 秒");
      await waitDone(page, runId);
      const detail = await getRunDetail(page, runId);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "混剪没有产物").toBeGreaterThan(0);
    } finally {
      await deleteAgentFile(page, first.cloudFileId).catch(() => undefined);
    }
  });

  test("@slow MW-05 中断恢复：取消后重新提交", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const uploaded = await prepare(page);
    try {
      const firstRun = await sendPrompt(page, "把这个视频剪成 20 秒左右的高光短视频");
      const cancelled = await cancelRun(page, firstRun);
      expect(cancelled, "取消任务失败").toBe(true);

      const secondRun = await sendPrompt(page, "把这个视频剪成 20 秒左右的高光短视频");
      expect(secondRun, "重新提交没有创建新 run").not.toBe(firstRun);
      await waitDone(page, secondRun);

      const detail = await getRunDetail(page, secondRun);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "重新提交后没有产物").toBeGreaterThan(0);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });
});
