import { expect, test, type Page } from "@playwright/test";


/**
 * 视频批注 · 编辑器 UI 用例（DC-07 P0 中的静态/交互骨架）
 *
 * 目标页面是本地 editor preview（`?workspace-preview=editor`）。annotation 功能位于
 * 产品分支 `feature/web-editor-video-annotation`，未部署时整组用例会跳过。
 *
 * 运行：
 *   1. 在产品仓库切出该分支的 worktree，`npm run dev -- --port 4210 --host 127.0.0.1`
 *   2. `npm run test:annotation`
 * 也可用 `CINLINK_ANNOTATION_URL` 指向已部署的功能环境。
 */

const EDITOR_URL =
  process.env.CINLINK_ANNOTATION_URL || "http://127.0.0.1:4210/?workspace-preview=editor";

async function openEditor(page: Page) {
  await page.goto(EDITOR_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator(".video-editor-shell").waitFor({ state: "attached", timeout: 60_000 });
  await page.waitForTimeout(2_000);
}

test.describe("批注入口与模式（DC-07-001 / 051）", () => {
  test.skip(
    process.env.CINLINK_ANNOTATION_SKIP === "1",
    "按环境变量跳过批注 UI 用例",
  );

  test.beforeEach(async ({ page }) => {
    try {
      await openEditor(page);
    } catch {
      test.skip(true, `编辑器预览不可用：${EDITOR_URL}（先在批注 worktree 启动 4210 dev server）`);
    }
    const entry = page.locator("#video-editor-mode-annotate");
    if ((await entry.count()) === 0) {
      test.skip(true, "当前页面未部署视频批注功能（feature/web-editor-video-annotation）");
    }
  });

  test("工具栏提供添加批注入口，且有无障碍名称", async ({ page }) => {
    const entry = page.locator("#video-editor-mode-annotate");
    await expect(entry).toBeVisible();
    const label = (await entry.getAttribute("aria-label")) || (await entry.getAttribute("title")) || "";
    expect(label.length).toBeGreaterThan(0);
  });

  test("默认处于选择模式", async ({ page }) => {
    await expect(page.locator("[data-active-module]")).toHaveAttribute("data-annotation-mode", "select");
  });

  test("点击入口进入批注模式并展示三种工具", async ({ page }) => {
    await page.locator("#video-editor-mode-annotate").click();
    await expect(page.locator("[data-active-module]")).toHaveAttribute("data-annotation-mode", "annotate");
    await expect(page.locator("[data-video-annotation-tool]")).toHaveCount(3);
  });

  test("点选/画笔/框选三种模式可切换且状态正确", async ({ page }) => {
    await page.locator("#video-editor-mode-annotate").click();
    for (const tool of ["point", "drawing", "area"]) {
      const button = page.locator(`[data-video-annotation-tool="${tool}"]`);
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
    }
  });

  test("批注画布与批注轨存在", async ({ page }) => {
    await expect(page.locator("[data-video-annotation-overlay]")).toHaveCount(1);
    await expect(page.locator("[data-video-annotation-track-surface]")).toHaveCount(1);
  });

  test("批注轨标题展示数量", async ({ page }) => {
    const trackText = await page.locator(".video-editor-annotation-track").innerText();
    expect(trackText).toMatch(/批注\s*·\s*\d+/);
  });
});
