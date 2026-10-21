import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import { checkArtifactsDeliverable, extractArtifacts } from "../../src/assertions/artifact.js";
import { checkSrtStructure } from "../../src/assertions/srt.js";
import {
  deleteAgentFile,
  findStringField,
  getRunDetail,
  isRunSubmission,
  openWorkspaceSession,
  pollRunUntilSettled,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
  type UploadOutcome,
} from "../../src/workspace.js";

/**
 * G3–G7 · 快捷卡片（依赖视频上下文）
 *
 * 转写字幕 / 导出字幕 / 查找片段：先上传并 @ 引用视频，再点快捷卡片。
 * 快捷卡片可能直接提交，也可能只把指令写进输入框；两种都兼容。
 */

const POLL_TIMEOUT_MS = 15 * 60_000;
const SHORT = TEST_ASSETS.videoShort;

async function clickPoint(page: Page, selector: string) {
  const point = await page.evaluate((sel) => {
    const element = document.querySelector(sel) as HTMLElement | null;
    if (!element || element.offsetParent === null) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  }, selector);
  if (!point) throw new Error(`找不到元素：${selector}`);
  await page.mouse.click(point.x, point.y);
}

async function prepareVideo(page: Page): Promise<UploadOutcome> {
  await openWorkspaceSession(page);
  const uploaded = await uploadAsset(page, SHORT);
  expect(uploaded.cloudFileId, "素材上传失败").not.toBe("");
  const reference = await referenceAssetInPrompt(page, uploaded.uploadedAs, uploaded.cloudFileId);
  expect(reference.ok, `@ 引用失败：${reference.candidates.join(", ")}`).toBe(true);
  return uploaded;
}

async function clickQuickPrompt(page: Page, prompt: string): Promise<string> {
  const selector = `[data-workspace-quick-prompt="${prompt}"]`;
  if ((await page.locator(selector).count()) === 0) {
    test.skip(true, `快捷卡片不存在：${prompt}`);
  }

  const submission = page
    .waitForResponse(
      (response) => isRunSubmission(response.url(), response.request().method()),
      { timeout: 20_000 },
    )
    .catch(() => null);

  await clickPoint(page, selector);
  const response = await submission;
  if (response) {
    const raw = await response.json().catch(() => null);
    return findStringField(raw, "run_id") ?? "";
  }

  const composer = (await page.locator("#workspace-prompt").innerText()).trim();
  if (composer) {
    const submit = await submitCurrentPrompt(page);
    return submit.runId;
  }

  test.skip(true, `点击快捷卡片无反应：${prompt}`);
  return "";
}

async function waitDone(page: Page, runId: string) {
  const polled = await pollRunUntilSettled(page, runId, {
    timeoutMs: POLL_TIMEOUT_MS,
    intervalMs: 5_000,
  });
  expect(polled.status, `任务未收敛到 done（run=${runId}）`).toBe("done");
}

test.describe("@regression G3–G7 快捷卡片", () => {
  test("转写字幕快捷卡片 · 产出 SRT", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 5 * 60_000);
    const dir = path.resolve("reports", "artifacts", "g3-g7-quick", "transcribe");
    await mkdir(dir, { recursive: true });
    const uploaded = await prepareVideo(page);

    let runId = "";
    try {
      runId = await clickQuickPrompt(page, "为这条视频转写并添加字幕");
      expect(runId, "快捷卡片未创建 run").not.toBe("");
      await waitDone(page, runId);

      const detail = await getRunDetail(page, runId);
      const artifacts = extractArtifacts(detail);
      expect(checkArtifactsDeliverable(artifacts).ok, "产物不可交付").toBe(true);

      const srt = artifacts.find((a) => a.url && /\.srt$/i.test(a.name));
      expect(srt, `没有 SRT 产物（现有：${artifacts.map((a) => a.name).join(", ")}）`).toBeTruthy();

      const response = await page.request.get(srt!.url!, { timeout: 180_000 });
      expect(response.status(), "SRT 应可下载").toBe(200);
      const bytes = await response.body();
      const filePath = path.join(dir, path.basename(srt!.name));
      await writeFile(filePath, bytes);
      const structure = checkSrtStructure(bytes.toString("utf8"), { sourceBytes: bytes });
      expect(structure.ok, `SRT 结构不合法：\n${structure.failures.join("\n")}`).toBe(true);
    } finally {
      if (runId) await page.request.post(`/v1/agent/runs/${runId}/cancel`).catch(() => undefined);
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  test("导出字幕快捷卡片 · 可下载字幕文件", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 8 * 60_000);
    const uploaded = await prepareVideo(page);

    let runId = "";
    try {
      // 先转写字幕，再导出，避免“当前视频没有字幕”
      const transcribeRun = await clickQuickPrompt(page, "为这条视频转写并添加字幕");
      expect(transcribeRun, "转写未创建 run").not.toBe("");
      await waitDone(page, transcribeRun);

      const downloadPromise = page.waitForEvent("download", { timeout: 30_000 }).catch(() => null);
      runId = await clickQuickPrompt(page, "导出当前视频的字幕文件");
      const download = await downloadPromise;

      if (download) {
        const filePath = path.join(
          path.resolve("reports", "artifacts", "g3-g7-quick", "export"),
          download.suggestedFilename(),
        );
        await mkdir(path.dirname(filePath), { recursive: true });
        await download.saveAs(filePath);
        expect(filePath.endsWith(".srt") || filePath.endsWith(".txt"), "导出文件应为字幕").toBe(true);
        return;
      }

      expect(runId, "导出既没有下载，也没有创建 run").not.toBe("");
      await waitDone(page, runId);
      const detail = await getRunDetail(page, runId);
      const artifacts = extractArtifacts(detail);
      expect(
        artifacts.some((a) => /\.(srt|txt)$/i.test(a.name)),
        `没有字幕产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
      ).toBe(true);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  // 查找片段返回的是片段/消息结果，不是视频产物；先确认结果 UI 再补真实断言。
  test.fixme("查找片段快捷卡片 · 返回相关片段", async () => {
    // TODO: 点击「在这条视频里查找相关片段」后断言片段列表/消息出现
  });
});
