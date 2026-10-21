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

test.describe("批注交互补充（DC-07-006 / 011 / 017 / 055）", () => {
  test.skip(
    process.env.CINLINK_ANNOTATION_SKIP === "1",
    "按环境变量跳过批注 UI 用例",
  );

  test.beforeEach(async ({ page }) => {
    try {
      await openEditor(page);
    } catch {
      test.skip(true, `编辑器预览不可用：${EDITOR_URL}`);
    }
    const entry = page.locator("#video-editor-mode-annotate");
    if ((await entry.count()) === 0) {
      test.skip(true, "当前页面未部署视频批注功能");
    }
    await entry.click();
    await expect(page.locator("[data-active-module]")).toHaveAttribute("data-annotation-mode", "annotate");
  });

  async function overlayBox(page: Page) {
    const box = await page.locator("[data-video-annotation-overlay]").boundingBox();
    if (!box) throw new Error("没有批注画布");
    return box;
  }

  test("点选画面生成描述入口（DC-07-006）", async ({ page }) => {
    const box = await overlayBox(page);
    await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.4);
    const describe = page.locator("[data-video-annotation-describe]");
    await expect(describe).toHaveCount(1);
    const style = (await describe.getAttribute("style")) || "";
    expect(style).toContain("--annotation-x");
    expect(style).toContain("--annotation-y");
  });

  test("两次点选位置不同，描述入口随之移动（DC-07-006）", async ({ page }) => {
    const box = await overlayBox(page);
    const describe = page.locator("[data-video-annotation-describe]");

    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height * 0.3);
    await expect(describe).toHaveCount(1);
    const first = (await describe.getAttribute("style")) || "";

    await page.mouse.click(box.x + box.width * 0.65, box.y + box.height * 0.6);
    await expect(describe).toHaveCount(1);
    const second = (await describe.getAttribute("style")) || "";
    expect(second).not.toBe(first);
  });

  test("画笔拖拽生成选择轮廓（DC-07-055）", async ({ page }) => {
    const box = await overlayBox(page);
    await page.locator('[data-video-annotation-tool="drawing"]').click();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.25);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.4, { steps: 8 });
    await page.mouse.up();

    const selection = page.locator("[data-video-annotation-overlay] [data-video-annotation-selection]");
    await expect(selection).toHaveCount(1);
    await expect(selection.locator("polyline.annotation-selection-outline")).toHaveCount(1);
  });

  test("框选拖拽生成矩形选区（DC-07-055）", async ({ page }) => {
    const box = await overlayBox(page);
    await page.locator('[data-video-annotation-tool="area"]').click();
    await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.3);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.55, { steps: 8 });
    await page.mouse.up();

    const selection = page.locator("[data-video-annotation-overlay] [data-video-annotation-selection]");
    await expect(selection).toHaveCount(1);
    expect(await selection.locator("rect").count()).toBeGreaterThan(0);
  });

  test("时间轴缩放控件生效（DC-07-017）", async ({ page }) => {
    const slider = page.locator("[data-video-timeline-zoom-value]");
    await expect(slider).toHaveValue("1");

    await page.locator('[data-video-timeline-zoom="-0.125"]').click();
    await expect(slider).toHaveValue("0.875");

    await page.locator('[data-video-timeline-zoom="0.125"]').click();
    await expect(slider).toHaveValue("1");
  });

  test("点选坐标被归一化到画布内（DC-07-006）", async ({ page }) => {
    const box = await overlayBox(page);
    await page.mouse.click(box.x + box.width * 0.48, box.y + box.height * 0.52);

    const style = (await page.locator("[data-video-annotation-describe]").getAttribute("style")) || "";
    const x = Number((style.match(/--annotation-x:\s*([\d.]+)%/) || [])[1]);
    const y = Number((style.match(/--annotation-y:\s*([\d.]+)%/) || [])[1]);
    expect(Number.isFinite(x)).toBe(true);
    expect(Number.isFinite(y)).toBe(true);
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(100);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThanOrEqual(100);
  });
});
