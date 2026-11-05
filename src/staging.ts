import type { Page } from "@playwright/test";

import { targets } from "./config.js";

/**
 * 预发工作台的打开与就绪判定。
 *
 * 实测结论（决定这些常量的取值）：
 *
 * - 预发首屏是 SPA 门禁，会先渲染「正在检查登录状态」，**约 8 秒后**才进入工作台。
 *   早期探测只等 2–6 秒就下结论，误判成"会话无效"。
 * - **headless 可用**。此前记的"headless 渲染不完整"是错的——根因同样是等待不足。
 *   实测 headless 下 3 条用例全过（14.0 / 17.5 / 22.5 秒）。等待给足即可，与渲染模式无关。
 * - 进入工作台后元素数约 **537**，锚点约 **26** 个。
 * - 核心工作台锚点与本地 `?workspace-preview` 采集的**完全一致**
 *   （`data-workspace-new-session` / `-upload` / `-sidebar-toggle` / `-project-toggle`），
 *   所以本地产出的锚点可以复用到预发——此前"不能复用"的判断同样是等待不足造成的误判。
 * - 页面加载时 `POST /platform-api/v1/auth/refresh` 会返回 **401**，属预期内的会话恢复
 *   fallback（源码见 `app.js` 的 `refreshPortal`，注释明确写了 401 retry 是 fallback 机制）。
 *   **控制台出现这一个 401 不代表失败**，断言不要把它当错误信号。
 */

/** 工作台就绪的唯一判据：新旧两版工作台都只有进入后才渲染 composer */
export const WORKSPACE_READY_ANCHOR = "#workspace-prompt";

/** 工作台骨架锚点 —— 全部缺失说明不是会话问题，而是前端结构变了 */
export const WORKSPACE_SHELL_ANCHORS = [
  "#workspace-prompt",
  "#workspace-send",
  "[data-workspace-new-session]",
  "input[type=file]",
] as const;

/** 登录页特征（用于失败归因） */
const SIGN_IN_MARKERS = /使用其他方式登录|使用 Google 账号继续|Continue with Apple/;

export interface WorkspaceOpenResult {
  /** 从 goto 到工作台就绪的毫秒数 */
  elapsedMs: number;
}

/**
 * 打开预发工作台，就绪则返回；否则抛出**带归因**的错误。
 *
 * 为什么不直接用 `waitForSelector`：失败时只得到一句 timeout，无法区分
 * 「会话失效」「卡在检查态」「前端结构变了」。这三种原因的处置方式完全不同，
 * 所以失败信息必须把它们分开。
 */
export async function assertWorkspaceOpened(
  page: Page,
  timeoutMs = 60_000,
): Promise<WorkspaceOpenResult> {
  const startedAt = Date.now();
  await page.goto(targets.webBase, { waitUntil: "domcontentloaded" });

  try {
    await page.waitForSelector(WORKSPACE_READY_ANCHOR, {
      state: "attached",
      timeout: timeoutMs,
    });
    return { elapsedMs: Date.now() - startedAt };
  } catch {
    const diagnosis = await page
      .evaluate(() => {
        const text = (document.body?.innerText || "").trim();
        return {
          bodyText: text.slice(0, 200),
          checking: text.includes("检查登录状态"),
          elements: document.querySelectorAll("*").length,
        };
      })
      .catch(() => null);

    const lines = [
      `工作台未在 ${timeoutMs} ms 内就绪（等待锚点 ${WORKSPACE_READY_ANCHOR}）`,
      `  URL: ${page.url()}`,
    ];

    if (diagnosis) {
      lines.push(`  页面文本: ${diagnosis.bodyText || "(空)"}`);
      lines.push(`  元素数: ${diagnosis.elements}`);

      if (diagnosis.checking) {
        lines.push("  → 卡在「正在检查登录状态」：会话可能已失效，重跑 --project=auth");
      } else if (SIGN_IN_MARKERS.test(diagnosis.bodyText)) {
        lines.push("  → 停在登录页：会话已失效，重跑 --project=auth");
      } else if (diagnosis.elements === 0) {
        lines.push("  → 页面空白：若为 headless 运行，改有头重试（该站点 headless 下渲染不完整）");
      } else {
        lines.push("  → 页面结构可能已变化，需重跑 --project=staging-probe 重新采集锚点");
      }
    }

    throw new Error(lines.join("\n"));
  }
}
