import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import {
  checkArtifactsDeliverable,
  extractArtifacts,
} from "../../src/assertions/artifact.js";
import { checkMedia, probeMedia } from "../../src/assertions/media.js";
import {
  getRunDetail,
  openWorkspaceSession,
  pollRunUntilSettled,
  submitCurrentPrompt,
} from "../../src/workspace.js";

/**
 * G3–G7 · AI 生成类与剪辑类工作流（第一批 P0）
 *
 * 覆盖：AI 生图、AI 生视频、总结视频、生成解说（卡片入口）。
 * 卡片入口用 `data-workspace-action-id`，卡片不会写输入框，点发送后由前端提交默认提示词。
 */

const POLL_TIMEOUT_MS = 15 * 60_000;

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

async function openCard(page: Page, category: string, actionId: string) {
  await clickPoint(page, `[data-workspace-category="${category}"]`);
  await page.waitForTimeout(500);
  await clickPoint(page, `[data-workspace-action-id="${actionId}"]`);
  await page.waitForTimeout(1_200);
}

async function downloadVideo(page: Page, runId: string, dir: string) {
  const detail = await getRunDetail(page, runId);
  expect(detail, "无法回读 Run 详情").not.toBeNull();
  const artifacts = extractArtifacts(detail);
  const deliverable = checkArtifactsDeliverable(artifacts);
  expect(deliverable.ok, `G5 产物不可交付：\n${deliverable.failures.join("\n")}`).toBe(true);

  const video = artifacts.find((a) => a.url && /\.(mp4|mov|webm)$/i.test(a.name));
  expect(video, `没有视频产物（现有：${artifacts.map((a) => a.name).join(", ")}）`).toBeTruthy();

  const response = await page.request.get(video!.url!, { timeout: 300_000 });
  expect(response.status(), "视频产物应可直接下载").toBe(200);
  const bytes = await response.body();
  const filePath = path.join(dir, path.basename(video!.name));
  await writeFile(filePath, bytes);
  return probeMedia(filePath);
}

test.describe("@regression G3–G7 卡片入口", () => {
  test("@smoke AI 生图 · 默认 1K / 1:1", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 5 * 60_000);
    await openWorkspaceSession(page);

    await openCard(page, "material", "image");
    const submit = await submitCurrentPrompt(page);
    expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
    expect(submit.runId, "提交未返回 run_id").not.toBe("");

    const polled = await pollRunUntilSettled(page, submit.runId, {
      timeoutMs: POLL_TIMEOUT_MS,
      intervalMs: 5_000,
    });
    expect(polled.status, "任务未收敛到 done").toBe("done");

    const detail = await getRunDetail(page, submit.runId);
    const artifacts = extractArtifacts(detail);
    const deliverable = checkArtifactsDeliverable(artifacts);
    expect(deliverable.ok, `产物不可交付：\n${deliverable.failures.join("\n")}`).toBe(true);
    expect(
      artifacts.some((a) => /\.(png|jpe?g|webp)$/i.test(a.name)),
      `没有图片产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
    ).toBe(true);
  });

  test("@slow AI 生视频 · 默认 720P / 16:9 / 5 秒", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 8 * 60_000);
    const dir = path.resolve("reports", "artifacts", "g3-g7-ai", "ai-video");
    await mkdir(dir, { recursive: true });
    await openWorkspaceSession(page);

    await openCard(page, "material", "video");
    const submit = await submitCurrentPrompt(page);
    expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
    expect(submit.runId, "提交未返回 run_id").not.toBe("");

    const polled = await pollRunUntilSettled(page, submit.runId, {
      timeoutMs: POLL_TIMEOUT_MS,
      intervalMs: 5_000,
    });
    expect(polled.status, "任务未收敛到 done").toBe("done");

    const media = await downloadVideo(page, submit.runId, dir);
    const width = media.video?.width ?? 0;
    const height = media.video?.height ?? 0;
    expect(width, "产物应可解码出视频流").toBeGreaterThan(0);
    expect(Math.abs(width / Math.max(1, height) - 16 / 9), "默认比例应为 16:9").toBeLessThan(0.12);
    const check = checkMedia(media, {
      durationSec: 5,
      durationToleranceSec: 3,
      requireAudio: false,
    });
    expect(check.ok, `视频结构不合法：\n${check.failures.join("\n")}`).toBe(true);
  });

  test("总结视频 · 产出总结", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 5 * 60_000);
    await openWorkspaceSession(page);

    await openCard(page, "repurpose", "summarize");
    const submit = await submitCurrentPrompt(page);
    expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
    expect(submit.runId, "提交未返回 run_id").not.toBe("");

    const polled = await pollRunUntilSettled(page, submit.runId, {
      timeoutMs: POLL_TIMEOUT_MS,
      intervalMs: 5_000,
    });
    expect(polled.status, "任务未收敛到 done").toBe("done");

    // 总结可能是文本消息而不是文件产物，两者满足其一即可
    const detail = await getRunDetail(page, submit.runId);
    const artifacts = extractArtifacts(detail);
    const body = await page.locator("body").innerText();
    const hasSummaryText = /总结|summary/i.test(body) && body.length > 200;
    expect(artifacts.length > 0 || hasSummaryText, "既没有产物也没有总结文本").toBe(true);
  });

  test("@slow 生成解说 · 默认 3 分钟", async ({ page }) => {
    test.setTimeout(25 * 60_000);
    const dir = path.resolve("reports", "artifacts", "g3-g7-ai", "narrated-recap");
    await mkdir(dir, { recursive: true });
    await openWorkspaceSession(page);

    await openCard(page, "repurpose", "narrated-recap");
    const submit = await submitCurrentPrompt(page);
    expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
    expect(submit.runId, "提交未返回 run_id").not.toBe("");

    const polled = await pollRunUntilSettled(page, submit.runId, {
      timeoutMs: 20 * 60_000,
      intervalMs: 5_000,
    });
    expect(polled.status, "任务未收敛到 done").toBe("done");

    const media = await downloadVideo(page, submit.runId, dir);
    const check = checkMedia(media, {
      minDurationSec: 150,
      maxDurationSec: 210,
      requireAudio: true,
    });
    expect(check.ok, `解说视频结构不合法：\n${check.failures.join("\n")}`).toBe(true);
  });
});
