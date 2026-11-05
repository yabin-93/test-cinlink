import { expect, test } from "../../src/fixtures/staging-session.js";
import { extractPools } from "../../src/assertions/job.js";
import {
  cancelRun,
  conversationForRun,
  findStringField,
  getRunDetail,
  openWorkspaceSession,
  readAccount,
  readConversationMessages,
  readRuntimeHealth,
  submitPrompt,
} from "../../src/workspace.js";

/**
 * G2 · 提交受理
 *
 * 断言项（来自设计文档）：
 *   1. 一次提交只创建一个 Job（会话内 job_id 唯一，且只有一条用户消息）
 *   2. 本次仅发出一个创建请求，返回非空 Job ID，且可按 ID 回读
 *   3. 提交最多触发一次计费请求，余额不重复扣减
 *   4. 提交未被 400 / 429 拒绝
 *
 * ## 证据边界（2026-11-03 更新）
 *
 * 预发目前**没有**“账户级 Job 列表”和“按 Job 关联的预扣流水”接口：
 * `/platform-api/v1/jobs`、`/credits/transactions`、`/billing/transactions` 均 404。
 * `/platform-api/v1/me` 只返回 `account.balance_cents` 和最近 `ledger`（目前仅充值/调整）。
 *
 * 因此本文件用两个可验证的替代口径：
 *   - Job 数量：提交只发 1 个 `POST /turns`，且该会话内只出现 1 个 `job_id`、1 条用户消息；
 *   - 计费次数：提交期间监听计费类请求（credit/charge/billing/ledger），最多 1 次；
 *     余额若变化只能是减少，`ledger` 新增条目最多 1 条。
 *
 * 这不是“服务端预扣流水”的等价证明，报告里会标注证据边界；接口补齐后可再升级。
 *
 * ## 成本
 *
 * 通过真实输入框提交，mode 由产品决定，不能假设只做 plan 或不会计费。
 * 用例在 finally 中取消任务。
 */

/** 极简 prompt：目标是验证「受理机制」，不是验证某个工作流的效果 */
const PROBE_PROMPT = "你好，请用一句话说明你能做什么";

test.describe("@regression G2 提交受理", () => {
  test("提交任务被受理，且客户端只提交了一次", async ({ page }) => {
    await openWorkspaceSession(page);

    const poolsBefore = extractPools(await readRuntimeHealth(page));
    const before = await readAccount(page);

    const outcome = await submitPrompt(page, PROBE_PROMPT);

    try {
      const poolsAfter = extractPools(await readRuntimeHealth(page));
      const after = await readAccount(page);

      await test.info().attach("G2-submission", {
        body: JSON.stringify({
          runId: outcome.runId,
          httpStatus: outcome.httpStatus,
          submitRequests: outcome.submitRequests,
          status: outcome.status,
          conversationId: conversationForRun(outcome.runId),
          balanceBefore: Number.isFinite(before.balanceCents) ? before.balanceCents : null,
          balanceAfter: Number.isFinite(after.balanceCents) ? after.balanceCents : null,
          poolsBefore,
          poolsAfter,
        }, null, 2),
        contentType: "application/json",
      });

      expect(outcome.httpStatus, "提交不得被 400/429 或其他 HTTP 错误拒绝").toBeGreaterThanOrEqual(200);
      expect(outcome.httpStatus, "提交不得被 400/429 或其他 HTTP 错误拒绝").toBeLessThan(300);

      console.log("");
      console.log("── G2 提交结果 ──────────────────────────────");
      console.log(`run_id        : ${outcome.runId || "(空)"}`);
      console.log(`status        : ${outcome.status || "(空)"}`);
      console.log(`提交请求数    : ${outcome.submitRequests}`);
      console.log(`余额          : ${before.balanceCents} → ${after.balanceCents} cents`);
      console.log(`余额变化      : ${after.balanceCents - before.balanceCents}`);
      console.log("──────────────────────────────────────────────");
      console.log("");

      expect(
        outcome.submitRequests,
        `一次提交发出了 ${outcome.submitRequests} 个创建请求 —— 存在重复提交`,
      ).toBe(1);

      expect(outcome.runId, "提交未返回 run_id，任务未被创建").not.toBe("");

      expect(
        ["preparing", "queued", "running", "waiting_for_local", "done", "requires_user_input"],
        `新任务的初始状态为 ${outcome.status}，不在已受理的状态集合中`,
      ).toContain(outcome.status);

      const detail = await getRunDetail(page, outcome.runId);
      expect(findStringField(detail, "run_id"), "服务端应可回读本次提交的 Run").toBe(outcome.runId);
    } finally {
      const cancelled = await cancelRun(page, outcome.runId);
      console.log(`清理：取消任务 ${cancelled ? "成功" : "失败 —— 请人工确认该 run 是否仍在运行"}`);
      console.log("");
      if (!cancelled) {
        test.info().annotations.push({ type: "cleanup", description: `任务未取消：${outcome.runId}` });
      }
    }
  });

  test("一次提交只创建一个 Job（会话内 job_id 唯一）", async ({ page }) => {
    await openWorkspaceSession(page);
    const outcome = await submitPrompt(page, PROBE_PROMPT);

    try {
      expect(outcome.submitRequests, "一次提交应只发出 1 个创建请求").toBe(1);

      const conversationId = conversationForRun(outcome.runId);
      expect(conversationId, "提交响应没有关联到会话，无法校验 Job 数量").not.toBe("");

      const messages = await readConversationMessages(page, conversationId);
      expect(messages.length, "会话消息为空，无法校验 Job 数量").toBeGreaterThan(0);

      const jobIds = [...new Set(messages.map((message) => message.job_id).filter(Boolean))];
      expect(
        jobIds,
        `会话内出现多个 job_id：${jobIds.join(", ")}（期望只有 ${outcome.runId}）`,
      ).toEqual([outcome.runId]);

      const userMessages = messages.filter((message) => message.role === "user");
      expect(
        userMessages.length,
        `会话内出现 ${userMessages.length} 条用户消息，期望 1 条`,
      ).toBe(1);
    } finally {
      const cancelled = await cancelRun(page, outcome.runId).catch(() => false);
      if (!cancelled) {
        test.info().annotations.push({ type: "cleanup", description: `任务未取消：${outcome.runId}` });
      }
    }
  });

  test("提交最多触发一次计费请求，余额不重复扣减", async ({ page }) => {
    await openWorkspaceSession(page);

    const chargeRequests: string[] = [];
    const onRequest = (request: { method: () => string; url: () => string }) => {
      if (request.method() !== "POST") return;
      if (/credit|charge|billing|ledger|payment/i.test(request.url())) {
        chargeRequests.push(request.url());
      }
    };
    page.on("request", onRequest);

    const before = await readAccount(page);
    const outcome = await submitPrompt(page, PROBE_PROMPT);
    page.off("request", onRequest);
    await page.waitForTimeout(3_000);

    try {
      const after = await readAccount(page);

      expect(
        chargeRequests.length,
        `一次提交触发了 ${chargeRequests.length} 个计费请求：${chargeRequests.join(", ")}`,
      ).toBeLessThanOrEqual(1);

      const delta = after.balanceCents - before.balanceCents;
      if (delta !== 0) {
        expect(delta, `余额变化为 ${delta}，提交不应产生正向入账`).toBeLessThan(0);
      }

      const newLedgerEntries = after.ledger.length - before.ledger.length;
      expect(
        newLedgerEntries,
        `一次提交新增了 ${newLedgerEntries} 条账本记录`,
      ).toBeLessThanOrEqual(1);

      await test.info().attach("G2-billing", {
        body: JSON.stringify({
          runId: outcome.runId,
          chargeRequests,
          balanceBefore: before.balanceCents,
          balanceAfter: after.balanceCents,
          delta,
          newLedgerEntries,
          evidence:
            "无按 Job 的预扣流水接口；以计费请求数 + 余额方向 + 账本新增条数替代，仅证明“未重复计费请求”，不等于服务端预扣次数",
        }, null, 2),
        contentType: "application/json",
      });

      if (delta === 0) {
        test.info().annotations.push({
          type: "billing",
          description: "本次为免费任务（余额未变化），仅验证未发生重复计费请求",
        });
      }

      console.log("");
      console.log("── G2 计费检查 ──────────────────────────────");
      console.log(`run_id        : ${outcome.runId}`);
      console.log(`计费请求数    : ${chargeRequests.length}`);
      console.log(`余额          : ${before.balanceCents} → ${after.balanceCents}（${delta}）`);
      console.log(`账本新增      : ${newLedgerEntries}`);
      console.log("──────────────────────────────────────────────");
      console.log("");
    } finally {
      const cancelled = await cancelRun(page, outcome.runId).catch(() => false);
      if (!cancelled) {
        test.info().annotations.push({ type: "cleanup", description: `任务未取消：${outcome.runId}` });
      }
    }
  });
});
