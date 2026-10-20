import path from "node:path";

import { chromium, test } from "@playwright/test";

const PROFILE_DIR = path.resolve(".auth/chrome-profile");

/**
 * 持久 profile 登录种子：只负责打开窗口、等人工登录、等主工作台出现。
 * 不做任何业务点击，避免被引导层/布局变化影响。
 */
test("持久 profile 登录", async () => {
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1600, height: 1000 },
  });
  const page = await context.newPage();
  try {
    await page.goto("https://staging-app.cinlink.ai/", {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });

    const ready = await page
      .waitForSelector("[data-workspace-new-session]", { state: "attached", timeout: 15_000 })
      .then(() => true)
      .catch(() => false);

    if (!ready) {
      console.log("");
      console.log(">>> 请在打开的窗口里完成登录（最多 5 分钟）");
      console.log(">>> 登录完成会自动继续，无需按键");
      console.log("");
      await page.waitForSelector("[data-workspace-new-session]", {
        state: "attached",
        timeout: 300_000,
      });
    }

    console.log("✓ 持久会话已就绪，可以直接跑 npm run test:annotation:staging");
  } finally {
    await context.close().catch(() => undefined);
  }
});
