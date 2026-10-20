/**
 * 检查预发是否已部署视频批注功能。
 * 用法：node tools/annotation/check-staging.mjs [baseUrl]
 * 需要 .auth/storage-state.json（npm run auth 生成的测试账号会话）。
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";
import path from "node:path";

const base = process.argv[2] || "https://staging-app.cinlink.ai";
const stateFile = path.resolve(".auth/storage-state.json");
const browser = await chromium.launch({ channel: "chrome", headless: process.env.CINLINK_HEADLESS !== "0" });
const context = await browser.newContext({
  storageState: existsSync(stateFile) ? stateFile : undefined,
  viewport: { width: 1600, height: 1000 },
});
const page = await context.newPage();
try {
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await page.waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 90_000 });
  await page.waitForTimeout(2_000);

  const toggle = page.locator("#workspace-editor-toggle");
  const toggleVisible = await toggle.isVisible().catch(() => false);
  if (toggleVisible) {
    await toggle.click().catch(() => {});
    await page.waitForTimeout(3_000);
  }

  const annotationEntry = await page.locator("#video-editor-mode-annotate").count();
  const shell = await page.locator(".video-editor-shell").count();
  const overlay = await page.locator("[data-video-annotation-overlay]").count();

  console.log(JSON.stringify({ base, toggleVisible, shell, overlay, annotationEntry, deployed: annotationEntry > 0 }, null, 2));
  process.exitCode = annotationEntry > 0 ? 0 : 2;
} catch (error) {
  console.log(JSON.stringify({ base, error: String(error).slice(0, 200), deployed: false }, null, 2));
  process.exitCode = 3;
} finally {
  // 会话是轮转的：任何页面加载后都必须写回，否则下一次打开就失效
  await context.storageState({ path: stateFile }).catch(() => {});
  await browser.close();
}
