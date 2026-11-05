import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import { test, type BrowserContext, type Page } from "@playwright/test";

import { credentialStatus, credentials, targets } from "../src/config.js";
import { WORKSPACE_READY_ANCHOR } from "../src/staging.js";

/**
 * 一次性人工登录，把会话保存成 storageState。
 *
 * 为什么需要人工：预发用邮箱验证码登录，自动化拿不到验证码。
 * 登录一次后，storageState 会被所有其它项目自动套用。
 *
 * 运行：
 *   npx playwright test --project=auth
 *
 * 会打开一个有头浏览器窗口——在其中完成登录即可，脚本自动保存并退出。
 * 期间会把页面结构快照写到 docs/login-page-report.md，便于定位卡点。
 */

// Interactive recovery can wait until the user finishes, without closing the
// only visible login window. Ordinary runs retain the five-minute default.
const TIMEOUT_MS = Number(process.env.CINLINK_AUTH_WAIT_MS ?? 300_000);
if (!Number.isFinite(TIMEOUT_MS) || TIMEOUT_MS < 0) throw new Error("CINLINK_AUTH_WAIT_MS 必须为非负毫秒数，0表示持续等待");
const HEARTBEAT_MS = 15_000;
const REPORT_PATH = "docs/login-page-report.md";

interface AuthSignal {
  url: string;
  /** 认证 cookie 数：`.cinlink.ai` 域下且 httpOnly + secure */
  authCookies: number;
  allCookies: number;
  elementCount: number;
  /** 页面是否仍显示"正在检查登录状态" */
  checkingLogin: boolean;
  workspaceReady: boolean;
}

interface PageSnapshot {
  at: string;
  url: string;
  title: string;
  text: string;
  buttons: Array<{ tag: string; text: string; href: string }>;
  inputs: Array<{ tag: string; type: string; name: string; placeholder: string }>;
}

/**
 * 登录判据必须精确到认证 cookie 本身。
 *
 * 踩过的坑：曾用「cookie 总数增加」作判据——用户一点登录按钮，
 * Google Analytics 的 `g_state` / `_ga` 就写进去了，总数从 2 变 3，
 * 脚本误判成功，实际会话完全无效（页面还停在"正在检查登录状态"）。
 *
 * 产品 README 明确：登录态是 `.cinlink.ai` 域下的 **Secure HttpOnly** Cookie。
 * 所以只认同时满足 domain 含 cinlink.ai + httpOnly + secure 的 cookie。
 */
function countAuthCookies(
  cookies: Array<{ domain: string; httpOnly: boolean; secure: boolean }>,
): number {
  return cookies.filter((c) => c.domain.includes("cinlink.ai") && c.httpOnly && c.secure).length;
}

async function inspect(page: Page, context: BrowserContext): Promise<AuthSignal> {
  const cookies = await context.cookies();

  const dom = await page
    .evaluate(() => ({
      elementCount: document.querySelectorAll("*").length,
      checkingLogin: (document.body.innerText || "").includes("检查登录状态"),
      workspaceReady: Boolean(document.querySelector("#workspace-prompt")) && !location.pathname.includes("/login"),
    }))
    .catch(() => ({ elementCount: 0, checkingLogin: false, workspaceReady: false }));

  return {
    url: page.url(),
    authCookies: countAuthCookies(cookies),
    allCookies: cookies.length,
    elementCount: dom.elementCount,
    checkingLogin: dom.checkingLogin,
    workspaceReady: dom.workspaceReady,
  };
}

/** 残留/失效 Cookie 不代表登录成功；必须真正进入工作台。 */
function isLoggedIn(signal: AuthSignal): { ok: boolean; reason: string } {
  if (signal.workspaceReady && !signal.checkingLogin) {
    return { ok: true, reason: "工作台输入框已就绪，页面已离开登录页" };
  }
  return { ok: false, reason: "" };
}

/** 抓一份页面结构快照——用于判断登录页提供了哪些入口 */async function snapshot(page: Page, secret: string): Promise<PageSnapshot> {
  const raw = await page
    .evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll("button, [role='button'], a[href]"),
      )
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
          href: (el.getAttribute("href") || "").slice(0, 120),
        }))
        .filter((x) => x.text || x.href);

      const inputs = Array.from(document.querySelectorAll("input, textarea, select")).map(
        (el) => ({
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute("type") || "",
          name: el.getAttribute("name") || "",
          placeholder: el.getAttribute("placeholder") || "",
        }),
      );

      return {
        url: location.href,
        title: document.title,
        text: (document.body.innerText || "").slice(0, 600),
        buttons: buttons.slice(0, 40),
        inputs: inputs.slice(0, 20),
      };
    })
    .catch(() => ({ url: page.url(), title: "", text: "", buttons: [], inputs: [] }));

  // 报告可能落到磁盘，掩掉账号
  const mask = (s: string) => (secret ? s.split(secret).join("***@***") : s);

  return {
    at: new Date().toISOString().slice(11, 19),
    url: mask(raw.url),
    title: mask(raw.title),
    text: mask(raw.text),
    buttons: raw.buttons.map((b) => ({ ...b, text: mask(b.text), href: mask(b.href) })),
    inputs: raw.inputs,
  };
}

async function writeReport(snapshots: PageSnapshot[], outcome: string): Promise<void> {
  const lines: string[] = [];
  lines.push("# 登录页面结构快照");
  lines.push("");
  lines.push("> 由 `npx playwright test --project=auth` 自动生成，用于定位登录卡点。");
  lines.push("> 账号已掩码，不含任何凭据值。");
  lines.push("");
  lines.push(`**结果**：${outcome}`);
  lines.push("");
  lines.push(`**快照数**：${snapshots.length}`);
  lines.push("");

  snapshots.forEach((snap, i) => {
    lines.push(`## 快照 ${i + 1} · ${snap.at}`);
    lines.push("");
    lines.push(`- URL: \`${snap.url}\``);
    lines.push(`- 标题: ${snap.title || "（空）"}`);
    lines.push("");
    lines.push("可见文本：");
    lines.push("");
    lines.push("```");
    lines.push(snap.text || "（空）");
    lines.push("```");
    lines.push("");

    if (snap.buttons.length) {
      lines.push("可点击元素：");
      lines.push("");
      lines.push("| 标签 | 文案 | href |");
      lines.push("|---|---|---|");
      for (const b of snap.buttons) {
        lines.push(`| ${b.tag} | ${b.text || "—"} | ${b.href || "—"} |`);
      }
      lines.push("");
    }

    if (snap.inputs.length) {
      lines.push("输入控件：");
      lines.push("");
      lines.push("| 标签 | type | name | placeholder |");
      lines.push("|---|---|---|---|");
      for (const el of snap.inputs) {
        lines.push(`| ${el.tag} | ${el.type || "—"} | ${el.name || "—"} | ${el.placeholder || "—"} |`);
      }
      lines.push("");
    }
  });

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, lines.join("\n"), "utf8");
}

function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain) return "***";
  const head = name.slice(0, 2);
  return `${head}${"*".repeat(Math.max(1, name.length - 2))}@${domain}`;
}

/**
 * 自动走到「邮箱验证码」这一步并触发发送。
 *
 * 为什么不让用户自己走：登录页首屏最突出的是 Google 按钮，而 Google 会拒绝
 * 自动化浏览器（`accounts.google.com/v3/signin/rejected` → "This browser or app
 * may not be secure"）。实测确认页面上有「使用其他方式登录」，点进去就是
 * 邮箱 + 验证码表单，这条路没有任何反自动化限制。
 *
 * 脚本代劳到「发送验证码」为止，用户只需要收码、填码、点 Login。
 */
async function prepareEmailLogin(page: Page, email: string): Promise<string[]> {
  const steps: string[] = [];
  const emailInput = page.locator('input[type="email"]').first();

  let emailVisible = await emailInput.isVisible().catch(() => false);

  if (!emailVisible) {
    const otherWay = page
      .getByRole("button", { name: /使用其他方式登录|其他方式|Other ways|More options|Try another way/i })
      .first();

    if (await otherWay.isVisible().catch(() => false)) {
      await otherWay.click({ timeout: 10_000 }).catch(() => undefined);
      await page.waitForTimeout(1_500);
      emailVisible = await emailInput.isVisible().catch(() => false);
      steps.push("已点开「使用其他方式登录」");
    }
  } else {
    steps.push("已在邮箱输入页");
  }

  if (!emailVisible) {
    steps.push("未自动定位到邮箱入口 —— 请在窗口内手动选择「使用其他方式登录」");
    return steps;
  }

  if (!email) {
    steps.push("local.env 未配置 CINLINK_TEST_EMAIL —— 请手动输入邮箱");
    return steps;
  }

  await emailInput.fill(email).catch(() => undefined);
  steps.push(`已填入邮箱 ${maskEmail(email)}`);

  const sendCode = page.getByRole("button", { name: /发送验证码|Send code|Send/i }).first();
  if (await sendCode.isVisible().catch(() => false)) {
    await sendCode.click({ timeout: 10_000 }).catch(() => undefined);
    steps.push("已点击「发送验证码」");
  } else {
    steps.push("未找到「发送验证码」按钮 —— 请手动点击");
  }

  return steps;
}

test("确保存在有效会话（必要时人工登录）", async ({ page, context }) => {
  test.setTimeout(TIMEOUT_MS === 0 ? 0 : Math.max(360_000, TIMEOUT_MS + 60_000));
  const status = credentialStatus();
  const email = credentials.email ?? "";

  // ── 前置：已有会话仍然有效就直接跳过，避免每次无谓地重新登录 ──
  // 预发 access token 有时效（实测约 30 分钟后失效），所以"重新登录"是常态操作，
  // 但不应牺牲"还有效时的不打扰"。
  if (existsSync(credentials.storageStatePath)) {
    // Reuse the one visible login window; a separate probe context creates another window.
    const stillValid = await page
      .goto(targets.webBase, { waitUntil: "domcontentloaded" })
      .then(() =>
        page.waitForSelector(WORKSPACE_READY_ANCHOR, {
          state: "attached",
          timeout: 15_000,
        }),
      )
      .then(() => true)
      .catch(() => false);

    if (stillValid) {
      // ── 关键：探测过程本身会消耗会话 ──
      // 页面加载时会调 POST /v1/auth/refresh，而服务端对 refresh token 做「轮转」：
      // 用过一次的 token 立即失效，新 token 写回 cookie。
      // 这个新 token 只在当前 context 里 —— 若不写回文件，
      // 下一次任何测试拿着**已被轮转掉的旧 token**，就会 401。
      //
      // 注意：必须先写回、再关闭 context；先 close 会抛
      // “Target page, context or browser has been closed”，会话也会被用掉。
      await context.storageState({ path: credentials.storageStatePath });

      console.log("");
      console.log("✓ 现有会话仍然有效，无需重新登录。");
      console.log(`  文件: ${credentials.storageStatePath}`);
      console.log("  已写回探测过程中刷新的令牌（refresh token 会轮转，不回写会把会话用掉）。");
      console.log("");
      return;
    }

    console.log("");
    console.log("现有会话已失效（或不存在），进入人工登录流程…");
    console.log("");
  }

  console.log("");
  console.log("── 登录会话准备 ──────────────────────────────");
  console.log(`靶场地址      : ${targets.webBase}`);
  console.log(
    `凭据文件      : ${
      status.localEnvFiles.length
        ? status.localEnvFiles.join(", ")
        : "（未找到，请从 .env.local.example 复制为 local.env）"
    }`,
  );
  console.log(`已配置邮箱    : ${status.hasEmail ? "是" : "否"}`);
  console.log(`已配置 API Key: ${status.hasApiKey ? "是" : "否"}`);
  console.log(`保存位置      : ${credentials.storageStatePath}`);
  console.log(`等待上限      : ${TIMEOUT_MS === 0 ? "持续等待，直到完成登录或手动关闭窗口" : `${TIMEOUT_MS / 1000} 秒`}`);
  console.log("──────────────────────────────────────────────");
  console.log("");

  // 在首次导航前抹掉 webdriver 标记。
  // Google 的反自动化检测会读 navigator.webdriver，config 里的启动参数
  // 只解决 Chrome 侧的标记，这里补 JS 侧。
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  await page.goto(targets.webBase, { waitUntil: "domcontentloaded" });
  if (TIMEOUT_MS === 0) {
    // Record only the owned browser PID, so the host can focus this window
    // without touching another Chrome window or persisting any credentials.
    const cdp = await context.browser()!.newBrowserCDPSession();
    const processes = await cdp.send("SystemInfo.getProcessInfo");
    const browserPID = processes.processInfo.find(p => p.type === "browser")?.id;
    await mkdir(".auth", { recursive: true });
    await writeFile(".auth/login-window.json", JSON.stringify({ browserPID, openedAt: new Date().toISOString() }));
    const windowCDP = await context.newCDPSession(page);
    const { windowId } = await windowCDP.send("Browser.getWindowForTarget");
    await windowCDP.send("Browser.setWindowBounds", { windowId, bounds: { windowState: "maximized" } });
    await windowCDP.detach();
    await cdp.detach();
  }
  // 把窗口带到最前，避免用户在后台进程启动时找不到浏览器窗口
  await page.bringToFront();
  // 该站点是 SPA：domcontentloaded 时 body 还是空的，必须等实际渲染出文本
  await page
    .waitForFunction(() => (document.body?.innerText || "").trim().length > 0, undefined, {
      timeout: 30_000,
    })
    .catch(() => undefined);
  await page.waitForTimeout(2_500);

  const baseline = await inspect(page, context);
  console.log(
    `初始状态: url=${baseline.url} 认证Cookie=${baseline.authCookies} 全部Cookie=${baseline.allCookies} 元素=${baseline.elementCount}`,
  );

  // 自动推进到「验证码已发送」，把用户要做的事压到最少
  let prepped: string[] = [];
  if (baseline.authCookies === 0) {
    prepped = await prepareEmailLogin(page, email);
    console.log("");
    console.log("── 自动前置 ──");
    for (const s of prepped) console.log(`  · ${s}`);
  }
  console.log("");
  console.log(">>> 请在浏览器窗口中：");
  console.log(">>>   1. 去邮箱收验证码（Gmail 收件箱，可能等 10–30 秒）");
  console.log(">>>   2. 填入「输入验证码」并点 Login");
  console.log(">>> 脚本自动检测，无需按键。每 15 秒打印一次状态。");
  console.log("");

  const snapshots: PageSnapshot[] = [await snapshot(page, email)];
  let lastUrl = snapshots[0].url;

  const startedAt = Date.now();
  let lastBeat = 0;
  let loggedIn = false;
  let reason = "";
  let last: AuthSignal = baseline;

  while (TIMEOUT_MS === 0 || Date.now() - startedAt < TIMEOUT_MS) {
    if (page.isClosed()) throw new Error("登录窗口已手动关闭，会话未保存");
    last = await inspect(page, context);
    const verdict = isLoggedIn(last);

    if (verdict.ok) {
      loggedIn = true;
      reason = verdict.reason;
      console.log("");
      console.log(`检测到登录完成：${verdict.reason}`);
      break;
    }

    // URL 变化时抓一份新快照，记录用户在哪个页面卡住
    if (last.url !== lastUrl) {
      lastUrl = last.url;
      const snap = await snapshot(page, email);
      snapshots.push(snap);
      console.log("");
      console.log(`[页面变化] ${snap.url}`);
      if (snap.buttons.length) {
        console.log(`  可点击: ${snap.buttons.map((b) => b.text || b.href).filter(Boolean).slice(0, 8).join(" | ")}`);
      }
      if (snap.inputs.length) {
        console.log(
          `  输入框: ${snap.inputs.map((i) => i.type || i.tag).join(", ")}`,
        );
      }
      console.log("");
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed - lastBeat >= HEARTBEAT_MS) {
      lastBeat = elapsed;
      console.log(
        `[${Math.round(elapsed / 1000)}s] 等待中… 认证Cookie=${last.authCookies} 全部Cookie=${last.allCookies} ` +
          `元素=${last.elementCount}${last.checkingLogin ? " (仍在检查登录状态)" : ""}`,
      );
    }

    await page.waitForTimeout(1_500);
  }

  if (!loggedIn) {
    snapshots.push(await snapshot(page, email));
    await writeReport(snapshots, `未在 ${TIMEOUT_MS / 1000} 秒内完成登录`);
    console.log("");
    console.log("✗ 未在限定时间内检测到登录完成。");
    console.log(
      `  最后状态: url=${last.url} 认证Cookie=${last.authCookies} 全部Cookie=${last.allCookies} 元素=${last.elementCount}`,
    );
    console.log(`  页面结构快照已写入: ${REPORT_PATH}`);
    console.log("");
    throw new Error(`登录等待超时（${TIMEOUT_MS / 1000}s）`);
  }

  // 等一拍，确保登录写入已经落定（太短会拿到即将被轮转的 token）
  await page.waitForTimeout(6_000);

  await mkdir(path.dirname(credentials.storageStatePath), { recursive: true });
  await context.storageState({ path: credentials.storageStatePath });

  const saved = await inspect(page, context);
  snapshots.push(await snapshot(page, email));
  await writeReport(snapshots, `登录成功（${reason}）`);

  console.log("");
  console.log("✓ 登录成功，会话已保存");
  console.log(`  判定依据: ${reason}`);
  console.log(`  认证Cookie: ${saved.authCookies} 个`);
  console.log(`  文件: ${credentials.storageStatePath}`);
  console.log("");
  console.log("后续所有测试会自动带上该会话。会话过期时重新执行本命令即可。");
  console.log("");
});
