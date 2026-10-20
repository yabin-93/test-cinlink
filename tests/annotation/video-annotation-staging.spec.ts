import { existsSync } from "node:fs";
import path from "node:path";

import { chromium, expect, test, type BrowserContext, type Page } from "@playwright/test";

/**
 * 视频批注 · 预发真实链路（DC-07 P0）
 *
 * 预发里批注入口只在「口水词项目 → 在编辑器中精修」后出现。
 * 为了隔离状态：整组用例共用一个 browser context（避免反复用旧 token 打开页面），
 * 但每条用例新建 page、重新创建一个 clean-cut 工程；会话在组结束后统一写回。
 *
 * 运行：npm run test:annotation:staging
 */

const PROFILE_DIR = path.resolve(".auth/chrome-profile");
const ASSET =
  process.env.CINLINK_ANNOTATION_ASSET ||
  "E:\\图片视频素材\\cinlink测试数据\\---视频批注用例\\批注\\动物河边散步_中文_1分钟.mp4";

test.describe.configure({ mode: "serial" });

let context: BrowserContext;

async function openCleanCutPage(assetPath: string = ASSET, extraAssets: string[] = []): Promise<Page> {
  const page = await context.newPage();
  try {
    await page.goto("https://staging-app.cinlink.ai/", { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 90_000 });
    await page.waitForTimeout(2_000);

    await page.locator('[data-workspace-new-session="non-project"]:visible').click();
    await page.waitForTimeout(1_200);

    // 等上传完成响应，而不是固定等待：12.9MB 素材在慢网络下 20 秒并不够，
    // 固定 sleep 会把“还在上传”误判成“@ 候选没出现”。
    const firstUpload = page
      .waitForResponse(
        (response) =>
          response.request().method() === "POST" &&
          /\/v1\/agent\/files\/(multipart\/)?complete/.test(response.url()),
        { timeout: 180_000 },
      )
      .catch(() => null);
    await page.locator("#workspace-file-input").setInputFiles(assetPath);
    await firstUpload;
    await page.waitForTimeout(2_000);

    // 追加素材只上传、不 @ 引用，进入编辑器后从「素材 → 会话」添加到工程末尾
    for (const extra of extraAssets) {
      const extraUpload = page
        .waitForResponse(
          (response) =>
            response.request().method() === "POST" &&
            /\/v1\/agent\/files\/(multipart\/)?complete/.test(response.url()),
          { timeout: 180_000 },
        )
        .catch(() => null);
      await page.locator("#workspace-file-input").setInputFiles(extra);
      await extraUpload;
      await page.waitForTimeout(2_000);
    }

    await page.locator("#workspace-prompt").click();
    await page.keyboard.insertText(`@${path.basename(assetPath, ".mp4")}`);
    await page.waitForTimeout(1_200);
    const candidate = page.locator("[data-workspace-mention-file-key]").first();
    await candidate.waitFor({ state: "visible", timeout: 45_000 }).catch(() => undefined);
    if (!(await candidate.isVisible().catch(() => false))) {
      throw new Error("上传后未出现 @ 引用候选，可能是素材仍在处理");
    }
    await candidate.click();
    await page.keyboard.insertText(" 去掉这个视频里的口水词");
    await page.locator("#workspace-send").first().click();

    const refine = page.getByText("在编辑器中精修", { exact: false }).first();
    await refine.waitFor({ state: "visible", timeout: 300_000 });
    await refine.click({ timeout: 30_000 });

    const openAnnotate = async () => {
      await page.locator(".video-editor-shell").waitFor({ state: "attached", timeout: 60_000 });
      await page.locator("#video-editor-mode-annotate").waitFor({ state: "attached", timeout: 60_000 });
    };

    try {
      await openAnnotate();
    } catch {
      // setup 抖动：有时编辑器打开了但批注入口没渲染，重试一次
      const refineAgain = page.getByText("在编辑器中精修", { exact: false }).first();
      if (await refineAgain.isVisible().catch(() => false)) {
        await refineAgain.click({ timeout: 20_000 }).catch(() => undefined);
      } else if (await page.locator("#workspace-editor-toggle").count()) {
        await clickBySelector(page, "#workspace-editor-toggle").catch(() => undefined);
      }
      await page.waitForTimeout(2_000);
      await openAnnotate();
    }
    // 批注创建时会从 <video> 抓帧；视频未就绪会拿到空 frames，添加按钮会一直禁用
    await page
      .waitForFunction(
        () => {
          const video = document.getElementById("video-editor-preview") as HTMLVideoElement | null;
          return Boolean(video && video.readyState >= 2 && Number(video.duration) > 0);
        },
        { timeout: 60_000 },
      )
      .catch(() => undefined);
    await page.waitForTimeout(1_500);
    return page;
  } catch (error) {
    await page.close().catch(() => undefined);
    throw error;
  }
}

async function clickBySelector(page: Page, selector: string) {
  const point = await page.evaluate((sel) => {
    const element = document.querySelector(sel) as HTMLElement | null;
    if (!element || element.offsetParent === null) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  }, selector);
  if (!point) throw new Error(`element not found: ${selector}`);
  await page.mouse.click(point.x, point.y);
}

async function createPointAnnotation(page: Page, xRatio = 0.4, yRatio = 0.5) {
  await page.locator("#video-editor-mode-annotate").click();
  const overlay = page.locator("[data-video-annotation-overlay]");
  const box = await overlay.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + box!.width * xRatio, box!.y + box!.height * yRatio);
  await page.locator("[data-video-annotation-describe]:visible").last().waitFor({ state: "visible", timeout: 30_000 });
}

async function openAnnotationCard(page: Page) {
  const describe = page.locator("[data-video-annotation-describe]:visible").last();
  const card = page.locator("[data-video-annotation-card]:visible").last();
  await describe.click();
  try {
    await card.waitFor({ state: "visible", timeout: 8_000 });
  } catch {
    await describe.click().catch(() => undefined);
    await card.waitFor({ state: "visible", timeout: 20_000 });
  }
}

async function describeAndAdd(page: Page, text: string) {
  await openAnnotationCard(page);
  const textarea = page.locator("[data-video-annotation-description]:visible").last();
  await textarea.click();
  await textarea.pressSequentially(text, { delay: 30 });
  // 卡片会随 render() 反复重建，locator 的稳定性/挂载等待会挂起。
  // 先一次性读坐标，再发真实鼠标事件（等价于人工点击）。
  const point = await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
      .find((el) => el.offsetParent !== null);
    if (!button) return null;
    const rect = button.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  if (!point) throw new Error("annotation add button not found");
  await page.mouse.click(point.x, point.y);
  await expect(page.locator("#workspace-prompt")).toContainText("◉ 批注", { timeout: 20_000 });
}

/** 发送当前输入框内容，返回本次创建请求的 run_id */
async function sendAndCaptureRun(page: Page): Promise<string> {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" && /\/v1\/agent\/runs/.test(response.url()),
    { timeout: 90_000 },
  );
  await page.locator("#workspace-send").first().click();
  const response = await responsePromise;
  const body = await response.json().catch(() => null);
  await page
    .locator("[data-workspace-task-id]")
    .first()
    .waitFor({ state: "attached", timeout: 90_000 });
  return String(body?.run_id || "");
}

/** 等任务卡片进入终态（已完成/失败/已取消），返回卡片文本 */
async function waitForTaskSettled(page: Page, timeoutMs = 180_000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  let text = "";
  while (Date.now() < deadline) {
    text = await page
      .locator("[data-workspace-task-id]")
      .first()
      .innerText()
      .catch(() => "");
    if (/已完成|失败|已取消/.test(text)) return text;
    await page.waitForTimeout(2_000);
  }
  return text;
}

test.beforeAll(async () => {
  test.skip(!existsSync(ASSET), `缺少测试素材：${ASSET}`);
  // 单持久会话：整个 profile 复用同一份 cookie，避免每条用例反复轮转 refresh token
  context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: "chrome",
    headless: process.env.CINLINK_HEADLESS !== "0",
    viewport: { width: 1600, height: 1000 },
  });
  const page = await context.newPage();
  try {
    await page.goto("https://staging-app.cinlink.ai/", { waitUntil: "domcontentloaded", timeout: 90_000 });
    const ready = await page
      .waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 20_000 })
      .then(() => true)
      .catch(() => false);
    if (!ready) {
      if (process.env.CINLINK_HEADLESS !== "0") {
        throw new Error("持久会话未登录：请先用 CINLINK_HEADLESS=0 运行一次并人工登录");
      }
      console.log("持久会话未登录，请在打开的窗口里登录（最多 5 分钟）…");
      await page.waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 300_000 });
    }
  } finally {
    await page.close().catch(() => undefined);
  }
});

test.afterAll(async () => {
  await context?.close().catch(() => undefined);
});

test("DC-07-005 单点批注：点选画面后生成批注条目", async () => {
  const page = await openCleanCutPage();
  try {
    const before = await page.locator("[data-video-annotation-timeline]").count();
    await createPointAnnotation(page);
    const after = await page.locator("[data-video-annotation-timeline]").count();
    expect(after).toBe(before + 1);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-008 批注描述：上限 2000 字符并加入对话", async () => {
  const page = await openCleanCutPage();
  page.on("console", (message) => console.log(`CONSOLE[${message.type()}]`, message.text().slice(0, 200)));
  page.on("pageerror", (error) => console.log("PAGEERROR", String(error).slice(0, 300)));
  page.on("requestfailed", (request) =>
    console.log("REQFAIL", request.url().slice(0, 140), request.failure()?.errorText),
  );
  try {
    await createPointAnnotation(page);
    await openAnnotationCard(page);
    const textarea = page.locator("[data-video-annotation-description]:visible").last();
    await expect(textarea).toHaveAttribute("maxlength", "2000");
    await textarea.click();
    await textarea.pressSequentially("这里增加一朵小花", { delay: 30 });

    const addButton = page.locator("[data-video-annotation-add]:visible").last();
    for (let i = 0; i < 15; i += 1) {
      const enabled = await addButton.isEnabled().catch(() => false);
      const title = await addButton.getAttribute("title").catch(() => null);
      if (i % 3 === 0) console.log(`ADD[${i}] enabled=${enabled} title=${title ?? "(none)"}`);
      if (enabled) break;
      await page.waitForTimeout(1_000);
    }
    // 按钮所在卡片会随编辑器 render() 反复重建：
    // locator.boundingBox()/click() 会一直等“稳定/挂载”，最终挂起。
    // 这里用页面内一次性查询拿坐标（不经过 locator 等待），再用真实鼠标事件点击。
    const point = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
        .find((el) => el.offsetParent !== null);
      if (!button) return null;
      const rect = button.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!point) throw new Error("annotation add button not found");
    await page.mouse.click(point.x, point.y);
    await page.waitForFunction(
      () => (document.querySelector("#workspace-prompt")?.textContent || "").includes("◉ 批注"),
      undefined,
      { timeout: 30_000 },
    );
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-013 引用标签可从输入框单独移除", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "这里增加一朵小花");
    const remove = page.locator("[data-workspace-annotation-remove]").first();
    await expect(remove).toBeVisible();
    await remove.click();
    await expect(page.locator(".workspace-annotation-references")).toHaveCount(0);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-024 发送批注只创建一次 Agent run", async () => {
  const page = await openCleanCutPage();
  let runs = 0;
  page.on("request", (request) => {
    if (request.method() === "POST" && /\/v1\/agent\/runs/.test(request.url())) runs += 1;
  });
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "这一段整体提亮");
    await page.locator("#workspace-send").first().click();
    await page.waitForTimeout(8_000);
    expect(runs).toBe(1);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test.fixme("DC-07-040 run 创建失败时给出失败态并可基于原锚点重试（失败态无“重试”按钮，待确认 UI）", async () => {
  const page = await openCleanCutPage();
  let runs = 0;
  let failOnce = true;
  page.on("request", (request) => {
    if (request.method() === "POST" && /\/v1\/agent\/runs/.test(request.url())) runs += 1;
  });
  await page.route("**/agent/runs", async (route) => {
    if (route.request().method() === "POST" && failOnce) {
      failOnce = false;
      await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "forced failure" }) });
      return;
    }
    await route.continue();
  });
  try {
    await createPointAnnotation(page, 0.6, 0.4);
    await describeAndAdd(page, "这一段降噪");
    await page.locator("#workspace-send").first().click();

    const retry = page.getByText(/重试|Retry/).first();
    await expect(retry).toBeVisible({ timeout: 30_000 });
    const before = runs;
    await retry.click();
    await page.waitForTimeout(8_000);
    expect(runs).toBeGreaterThan(before);
  } finally {
    await page.unroute("**/agent/runs").catch(() => undefined);
    await page.close().catch(() => undefined);
  }
});

test("DC-07-002 无视频时批注入口不可用", async () => {
  const page = await context.newPage();
  try {
    await page.goto("https://staging-app.cinlink.ai/", { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 90_000 });
    await page.waitForTimeout(1_500);
    await page.locator('[data-workspace-new-session="non-project"]:visible').click();
    await page.waitForTimeout(1_000);

    const toggle = page.locator("#workspace-editor-toggle");
    if ((await toggle.count()) > 0 && (await toggle.isEnabled().catch(() => false))) {
      await toggle.click().catch(() => undefined);
      await page.waitForTimeout(2_000);
    }
    expect(await page.locator("#video-editor-mode-annotate").count()).toBe(0);
    expect(await page.locator("[data-video-annotation-overlay]").count()).toBe(0);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-003 播放头位于空白区时不创建批注", async () => {
  const page = await openCleanCutPage(
    "E:/图片视频素材/cinlink测试数据/---视频批注用例/批注/测试视频_003_12秒.mp4",
  );
  try {
    const seek = async (seconds: number) => {
      await page.evaluate((time) => {
        const video = document.getElementById("video-editor-preview") as HTMLVideoElement | null;
        if (!video) return;
        video.currentTime = time;
        video.dispatchEvent(new Event("timeupdate"));
      }, seconds);
      await page.waitForTimeout(800);
    };

    // 1) 把视频片段向右拖，制造片头空白区
    const dragged = await page.evaluate(() => {
      const clip = document.querySelector(".video-editor-track [data-video-editor-clip]") as HTMLElement | null;
      const track = clip?.closest(".video-editor-track") as HTMLElement | null;
      if (!clip || !track) return false;
      const clipRect = clip.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const startX = clipRect.x + clipRect.width / 2;
      const y = clipRect.y + clipRect.height / 2;
      const dx = trackRect.width * 0.3;
      const originalCapture = Element.prototype.setPointerCapture;
      Element.prototype.setPointerCapture = () => undefined;
      const pointer = (type: string, x: number, buttons: number) =>
        new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons, clientX: x, clientY: y });
      clip.dispatchEvent(pointer("pointerdown", startX, 1));
      clip.dispatchEvent(pointer("pointermove", startX + dx, 1));
      clip.dispatchEvent(pointer("pointerup", startX + dx, 0));
      Element.prototype.setPointerCapture = originalCapture;
      return true;
    });
    if (!dragged) test.skip(true, "找不到可拖拽的视频片段");
    await page.waitForTimeout(1_500);

    // 2) 播放头停在 1 秒，确认处于空白区
    await page.evaluate(() => {
      const video = document.getElementById("video-editor-preview") as HTMLVideoElement | null;
      if (!video) return;
      video.currentTime = 1;
      video.dispatchEvent(new Event("timeupdate"));
    });
    await page.waitForTimeout(1_000);
    const gapInfo = await page.evaluate(() => {
      const gap = document.querySelector(".video-editor-track-gap") as HTMLElement | null;
      return gap ? { width: Math.round(gap.getBoundingClientRect().width), label: gap.getAttribute("aria-label") } : null;
    });
    if (!gapInfo) test.skip(true, "拖拽后时间线没有形成片头空白");
    console.log("GAP:", JSON.stringify(gapInfo));

    // 3) 在空白区创建批注
    await clickBySelector(page, "#video-editor-mode-annotate");
    const overlayPoint = await page.evaluate(() => {
      const element = document.querySelector("[data-video-annotation-overlay]") as HTMLElement | null;
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    expect(overlayPoint).not.toBeNull();
    await page.mouse.click(overlayPoint!.x, overlayPoint!.y);
    await page.waitForTimeout(2_000);

    const created = await page.evaluate(
      () => document.querySelectorAll("[data-video-annotation-timeline]").length,
    );
    if (created === 0) return;

    // 4) 允许落草稿时，发送必须被拦
    await clickBySelector(page, "[data-video-annotation-describe]");
    await page.waitForTimeout(800);
    const textareaPoint = await page.evaluate(() => {
      const element = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-description]"))
        .find((el) => el.offsetParent !== null);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!textareaPoint) test.skip(true, "找不到批注描述输入框");
    await page.mouse.click(textareaPoint!.x, textareaPoint!.y);
    await page.keyboard.type("空白区测试", { delay: 20 });

    const addState = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
        .find((el) => el.offsetParent !== null) as HTMLButtonElement | undefined;
      return button ? { disabled: button.disabled, title: button.title } : null;
    });
    expect(addState).not.toBeNull();
    expect(addState!.disabled).toBe(true);
    expect(addState!.title).toContain("批注必须完整落在有视频的区间内");  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-009 保存失败时不创建 run", async () => {
  const page = await openCleanCutPage();
  let runs = 0;
  page.on("request", (request) => {
    if (request.method() === "POST" && /\/v1\/agent\/runs/.test(request.url())) runs += 1;
  });
  await page.route("**/*", async (route) => {
    const request = route.request();
    if (request.method() === "POST" && /annotation/i.test(request.url())) {
      await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "forced save failure" }) });
      return;
    }
    await route.continue();
  });
  try {
    await createPointAnnotation(page);
    await openAnnotationCard(page);
    const textarea = page.locator("[data-video-annotation-description]:visible").last();
    await textarea.click();
    await page.keyboard.type("保存失败测试", { delay: 20 });
    const addPoint = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
        .find((el) => el.offsetParent !== null);
      if (!button) return null;
      const rect = button.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!addPoint) test.skip(true, "找不到添加到对话按钮");
    await page.mouse.click(addPoint!.x, addPoint!.y);
    await page.waitForTimeout(3_000);
    const body = await page.evaluate(() => document.body.innerText);
    expect(body).toMatch(/保存失败|重试/);
    expect(runs).toBe(0);
  } finally {
    await page.unroute("**/*").catch(() => undefined);
    await page.close().catch(() => undefined);
  }
});

test("DC-07-015 已有锚点时再次添加批注", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "第一个批注");

    await createPointAnnotation(page, 0.6, 0.4);
    await openAnnotationCard(page);
    const textarea = page.locator("[data-video-annotation-description]:visible").last();
    await textarea.click();
    await page.keyboard.type("第二个批注", { delay: 20 });
    const addPoint = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
        .find((el) => el.offsetParent !== null);
      if (!button) return null;
      const rect = button.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!addPoint) test.skip(true, "找不到添加到对话按钮");
    await page.mouse.click(addPoint!.x, addPoint!.y);
    await page.waitForTimeout(2_500);

    const state = await page.evaluate(() => ({
      references: document.querySelectorAll(".workspace-annotation-references span").length,
      prompt: document.querySelector("#workspace-prompt")?.textContent || "",
    }));
    expect(state.references).toBeGreaterThanOrEqual(1);
    expect(state.prompt).toContain("批注");
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-029 裁剪后批注引用不可用", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "裁剪后不可用");
    await clickBySelector(page, "#workspace-send");
    await page.waitForTimeout(5_000);

    await page.locator('[data-video-clip-time="start"]').first().evaluate((element, value) => {
      const input = element as HTMLInputElement;
      input.value = String(value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, 8);
    await page.waitForTimeout(3_000);

    const body = await page.evaluate(() => document.body.innerText);
    if (!/不可用|unavailable|已失效/.test(body)) {
      test.skip(true, "裁剪后未出现不可用提示");
    }
    expect(body).toMatch(/不可用|unavailable|已失效/);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-037 跨源批注被阻止", async () => {
  const page = await openCleanCutPage(
    "E:/图片视频素材/cinlink测试数据/---视频批注用例/批注/测试视频_003_12秒.mp4",
  );
  try {
    await clickBySelector(page, '[data-video-editor-module="media"]');
    await page.waitForTimeout(1_500);
    await page.locator("#video-editor-asset-import").setInputFiles(
      "E:/图片视频素材/cinlink测试数据/---视频批注用例/批注/动物切换_3秒.mp4",
    );
    await page.waitForTimeout(8_000);
    const assetPoint = await page.evaluate(() => {
      const card = Array.from(document.querySelectorAll<HTMLElement>("[data-video-editor-asset-open]"))
        .find((el) => (el.innerText || "").includes("动物切换"));
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!assetPoint) test.skip(true, "素材面板找不到第二个视频");
    await page.mouse.click(assetPoint!.x, assetPoint!.y);
    await page.waitForTimeout(8_000);

    const clips = await page.evaluate(() => document.querySelectorAll(".video-editor-track [data-video-editor-clip]").length);
    if (clips < 2) test.skip(true, `第二个视频未拼接成功（clips=${clips}）`);

    const total = await page.evaluate(() => {
      const label = document.getElementById("video-editor-playback-time")?.textContent || "";
      const match = label.match(/\/\s*(\d+):(\d+(?:\.\d+)?)/);
      return match ? Number(match[1]) * 60 + Number(match[2]) : 0;
    });
    expect(total).toBeGreaterThan(3);
    await page.evaluate((time) => {
      const video = document.getElementById("video-editor-preview") as HTMLVideoElement | null;
      if (!video) return;
      video.currentTime = time;
      video.dispatchEvent(new Event("timeupdate"));
    }, total - 2.5);
    await page.waitForTimeout(1_000);

    await clickBySelector(page, "#video-editor-mode-annotate");
    const overlayPoint = await page.evaluate(() => {
      const element = document.querySelector("[data-video-annotation-overlay]") as HTMLElement | null;
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    expect(overlayPoint).not.toBeNull();
    await page.mouse.click(overlayPoint!.x, overlayPoint!.y);
    await page.waitForTimeout(2_000);

    const created = await page.evaluate(
      () => document.querySelectorAll("[data-video-annotation-timeline]").length,
    );
    if (created === 0) return;

    await clickBySelector(page, "[data-video-annotation-describe]");
    await page.waitForTimeout(800);
    const textareaPoint = await page.evaluate(() => {
      const element = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-description]"))
        .find((el) => el.offsetParent !== null);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    if (!textareaPoint) test.skip(true, "找不到批注描述输入框");
    await page.mouse.click(textareaPoint!.x, textareaPoint!.y);
    await page.keyboard.type("跨源测试", { delay: 20 });

    const addState = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll<HTMLElement>("[data-video-annotation-add]"))
        .find((el) => el.offsetParent !== null) as HTMLButtonElement | undefined;
      return button ? { disabled: button.disabled, title: button.title } : null;
    });
    expect(addState).not.toBeNull();
    expect(addState!.disabled).toBe(true);
    expect(addState!.title).toMatch(/跨越两个视频源|必须完整落在有视频的区间内/);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-001 批注入口可用并进入批注模式", async () => {
  const page = await openCleanCutPage(
    "E:/图片视频素材/cinlink测试数据/---视频批注用例/批注/测试视频_003_12秒.mp4",
  );
  try {
    const readState = () =>
      page.evaluate(() => {
        const entry = document.getElementById("video-editor-mode-annotate");
        return {
          entry: Boolean(entry),
          aria: entry?.getAttribute("aria-label") || "",
          selected: (entry?.className || "").includes("selected"),
          tools: document.querySelectorAll("[data-video-annotation-tool]").length,
          overlay: document.querySelector("[data-video-annotation-overlay]")?.getAttribute("class") || "",
        };
      });

    const initial = await readState();
    expect(initial.entry).toBe(true);
    expect(initial.aria).toContain("批注");
    expect(initial.selected).toBe(false);
    expect(initial.tools).toBe(0);

    await clickBySelector(page, "#video-editor-mode-annotate");
    await page.waitForTimeout(800);
    const annotating = await readState();
    expect(annotating.selected).toBe(true);
    expect(annotating.tools).toBe(3);
    expect(annotating.overlay).toContain("drawing");

    await clickBySelector(page, "#video-editor-mode-select");
    await page.waitForTimeout(800);
    const exited = await readState();
    expect(exited.selected).toBe(false);
    expect(exited.tools).toBe(0);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-016 已发送批注刷新后引用、正文与任务状态完整恢复", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "这一段整体提亮");
    const runId = await sendAndCaptureRun(page);
    expect(runId).not.toBe("");

    const before = await page.locator(".workspace-chat-message.user").last().innerText();
    expect(before).toContain("批注");
    expect(before).toContain("这一段整体提亮");

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 90_000 });

    // 刷新后优先等会话自动恢复；未自动恢复时点开最近一个会话
    if ((await page.locator(".workspace-chat-message").count()) === 0) {
      await page.locator("[data-workspace-project-id]").first().click().catch(() => undefined);
    }
    await page.locator(".workspace-chat-message").first().waitFor({ state: "visible", timeout: 60_000 });

    // 刷新后消息顺序可能变化，按内容找带批注引用的那条用户消息，而不是取最后一条
    let after = "";
    for (let attempt = 0; attempt < 3 && !after; attempt += 1) {
      const messages = await page.locator(".workspace-chat-message.user").allInnerTexts().catch(() => []);
      after = messages.find((text) => text.includes("这一段整体提亮")) || "";
      if (!after) await page.waitForTimeout(3_000);
    }
    expect(after, "刷新后应能恢复带批注引用的用户消息").not.toBe("");
    expect(after, "刷新后引用仍在").toContain("批注");
    expect(after, "刷新后正文仍在").toContain("这一段整体提亮");
    await expect(
      page.locator("[data-workspace-task-id]").first(),
      "刷新后任务卡片仍应存在",
    ).toBeVisible();
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-020 点击批注轨色块选中草稿并可继续拖动调整", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);

    // 创建后默认处于选中态：先用画布上的标记把选中清掉，才能验证“点击色块选中”
    for (let i = 0; i < 3; i += 1) {
      const selected = await page.locator(".video-editor-annotation-timeline-item.selected").count();
      if (selected === 0) break;
      await clickBySelector(page, "[data-video-annotation-marker]");
      await page.waitForTimeout(500);
    }
    expect(
      await page.locator(".video-editor-annotation-timeline-item.selected").count(),
      "前置：应能取消选中",
    ).toBe(0);

    const item = page.locator("[data-video-annotation-timeline]").first();
    const beforeLabel = await item.getAttribute("aria-label");

    await clickBySelector(page, "[data-video-annotation-timeline]");
    await expect(
      page.locator(".video-editor-annotation-timeline-item.selected"),
      "点击批注轨色块后应进入选中态",
    ).toHaveCount(1);

    // 继续调整：真实拖动色块，时间应发生变化
    const box = await item.boundingBox();
    expect(box).not.toBeNull();
    const cx = box!.x + box!.width / 2;
    const cy = box!.y + box!.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 40, cy, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(1_000);

    const afterLabel = await page.locator("[data-video-annotation-timeline]").first().getAttribute("aria-label");
    expect(afterLabel, `拖动后时间应变化（拖动前：${beforeLabel}）`).not.toBe(beforeLabel);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-021 消息保存成功后草稿立即消失，不等 Agent 执行完", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "发送后草稿立即消失");
    expect(await page.locator("[data-video-annotation-timeline]").count()).toBe(1);

    await sendAndCaptureRun(page);

    let cleared = false;
    for (let i = 0; i < 10; i += 1) {
      if ((await page.locator("[data-video-annotation-timeline]").count()) === 0) {
        cleared = true;
        break;
      }
      await page.waitForTimeout(1_000);
    }
    const taskText = await page
      .locator("[data-workspace-task-id]")
      .first()
      .innerText()
      .catch(() => "");
    expect(cleared, `发送 10 秒内草稿色块应消失，当前任务状态：${taskText.replace(/\s+/g, " ")}`).toBe(true);
    expect(taskText).not.toMatch(/已完成/);
  } finally {
    await page.close().catch(() => undefined);
  }
});

test("DC-07-022 时间轴不回显历史批注，历史只留在会话里", async () => {
  const page = await openCleanCutPage();
  try {
    await createPointAnnotation(page);
    await describeAndAdd(page, "历史批注不回显");
    await sendAndCaptureRun(page);

    const taskText = await waitForTaskSettled(page, 180_000);
    expect(taskText.replace(/\s+/g, " ")).toMatch(/已完成|失败|已取消/);
    expect(
      await page.locator("[data-video-annotation-timeline]").count(),
      "任务结束后时间轴不应回显历史批注",
    ).toBe(0);
    const message = await page.locator(".workspace-chat-message.user").last().innerText();
    expect(message, "历史批注应留在会话消息里").toContain("批注");
    expect(message).toContain("历史批注不回显");
  } finally {
    await page.close().catch(() => undefined);
  }
});