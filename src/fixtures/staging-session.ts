import { test as base, expect } from "@playwright/test";

import { credentials } from "../config.js";

/**
 * 需要登录会话的测试：teardown 时把令牌写回文件。
 *
 * ## 为什么必须这么做
 *
 * 被测产品对 refresh token 做**轮转**：用过一次即失效，同时下发新 token。
 * 而 Playwright 的 `storageState` 是**只读注入**——运行过程中页面自动刷新拿到的新
 * refresh token 只存在于内存 context 里，不会自动回写文件。
 *
 * 后果：**跑一次测试就把文件里的会话用掉了**，第二次必然 401。
 * 实测症状极具误导性——「刚跑完 auth 说会话有效，紧接着跑用例却报会话失效」，
 * 看起来像会话天然短命（30 分钟），实际是被测试自己消耗掉的。
 *
 * ## 判定条件
 *
 * 只在 context **确实带上了认证 cookie** 时才回写。
 * 否则 `tests/staging/session.spec.ts` 里那条"匿名 context 不应误判为已登录"的用例
 * 会把空状态写进文件，反而毁掉会话。
 */

const AUTH_COOKIE_MARKERS = ["access_token", "refresh_token"];

export const test = base.extend({
  context: async ({ context }, use) => {
    await use(context);

    const path = credentials.storageStatePath;
    if (!path) return;

    const cookies = await context.cookies().catch(() => []);
    const hasAuthCookie = cookies.some(
      (c) =>
        c.domain.includes("cinlink.ai") &&
        c.httpOnly &&
        c.secure &&
        AUTH_COOKIE_MARKERS.some((marker) => c.name.includes(marker)),
    );

    if (!hasAuthCookie) return;

    await context.storageState({ path }).catch(() => undefined);
  },
});

export { expect };
