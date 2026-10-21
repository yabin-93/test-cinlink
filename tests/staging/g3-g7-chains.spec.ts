import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import { checkRegionChanged, checkRegionDiff } from "../../src/assertions/region.js";
import {
  deleteAgentFile,
  getRunDetail,
  openWorkspaceSession,
  pollRunUntilSettled,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
} from "../../src/workspace.js";

/**
 * 跨工作流链路（CHAIN）
 *
 * CHAIN-01 已实现；CHAIN-05/06 与批注区域链路（CHAIN-13）先以 fixme 骨架存在，
 * 等预发上传/Run 恢复、且编辑器批注可保存后再启用。
 */

const POLL_TIMEOUT_MS = 25 * 60_000;
const SHORT = TEST_ASSETS.videoShort;

async function prepare(page: Page) {
  await openWorkspaceSession(page);
  const uploaded = await uploadAsset(page, SHORT);
  expect(uploaded.cloudFileId, "素材上传失败").not.toBe("");
  const reference = await referenceAssetInPrompt(page, uploaded.uploadedAs, uploaded.cloudFileId);
  expect(reference.ok, `@ 引用失败：${reference.candidates.join(", ")}`).toBe(true);
  return uploaded;
}

async function send(page: Page, prompt: string): Promise<string> {
  await page.locator("#workspace-prompt").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Backspace");
  await page.keyboard.insertText(prompt);
  const submit = await submitCurrentPrompt(page);
  expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
  expect(submit.runId, "提交未返回 run_id").not.toBe("");
  return submit.runId;
}

async function waitDone(page: Page, runId: string) {
  const polled = await pollRunUntilSettled(page, runId, { timeoutMs: POLL_TIMEOUT_MS, intervalMs: 5_000 });
  expect(polled.status, `任务未收敛到 done（run=${runId}）`).toBe("done");
}

test.describe("@regression CHAIN 跨工作流", () => {
  test("@slow CHAIN-01 长变短 → 加字幕", async ({ page }) => {
    test.setTimeout(50 * 60_000);
    const uploaded = await prepare(page);
    try {
      const shortRun = await send(page, "把这个视频剪成 20 秒左右的高光短视频，直接剪");
      await waitDone(page, shortRun);

      // 第二条不 @，依赖上一轮产物与上下文
      const subtitleRun = await send(page, "给刚才剪好的短视频加上中文字幕");
      await waitDone(page, subtitleRun);

      const detail = await getRunDetail(page, subtitleRun);
      const artifacts = extractArtifacts(detail);
      expect(
        artifacts.some((a) => /\.srt$/i.test(a.name)),
        `没有 SRT 产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
      ).toBe(true);
    } finally {
      await deleteAgentFile(page, uploaded.cloudFileId).catch(() => undefined);
    }
  });

  test.fixme("@slow CHAIN-05 AI 生视频 → 加字幕", async () => {
    // 1) 点卡片 image/video 生成视频
    // 2) 等 done 后不发 @，直接说“给这个视频加中文字幕”
    // 3) 断言 SRT 产物且时间轴覆盖生成视频
    // 依赖：卡片生成 + 上下文引用，预发恢复后验证
  });

  test.fixme("@slow CHAIN-06 AI 生视频 → 加水印 → 导出", async () => {
    // 1) 生成视频 → 2) 加水印 → 3) 导出
    // 断言：三级产物逐级引用，最终导出可下载
  });

  test.fixme("@slow CHAIN-13 批注区域修改 → 产物区域变化", async ({ page }) => {
    // 预发恢复后：
    // 1) clean-cut 建工程 → 编辑器创建区域批注（rect）→ 发送
    // 2) 下载原片与产物
    // 3) 用区域帧差断言产物只改了批注区域
    const source = "reports/artifacts/chain-13/source.mp4";
    const result = "reports/artifacts/chain-13/result.mp4";
    const report = await checkRegionDiff({
      source,
      result,
      timeSec: 3.5,
      rect: { x: 0.4, y: 0.35, w: 0.2, h: 0.25 },
    });
    const check = checkRegionChanged(report);
    expect(check.ok, check.failures.join("\n")).toBe(true);
  });
});
