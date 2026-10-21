import { expect, test } from "../../src/fixtures/staging-session.js";
import { extractPools } from "../../src/assertions/job.js";
import {
  cancelRun,
  findStringField,
  getRunDetail,
  openWorkspaceSession,
  readBalanceCents,
  readRuntimeHealth,
  submitPrompt,
} from "../../src/workspace.js";

/**
 * G2 · 提交受理
 *
 * 断言项（来自设计文档）：
 *   1. 提交前后 Job 数量差恰好为 1（待接权威任务列表）
 *   2. 本次仅发出一个创建请求，返回非空 Job ID，且可按 ID 回读
 *   3. 积分预扣次数与任务数一致（待接关联流水）
 *   4. 提交未被 400 / 429 拒绝
 *
 * ## 共享靶场的证据边界
 *
 * Runtime 的 submitted/rejected 是全局累计值，共享预发上其他人的任务也会影响它。
 * 因此只留存为诊断，不用它替代设计要求的账户/请求范围 Job 数量差。
 *
 * 客户端请求数和按 ID 回读可验证提交入口，但不能证明服务端内部未多建 Job。
 * 两个尚缺权威数据源的验收项用 fixme 显式列出，不能宣称 G2 全覆盖。
 *
 * ## 成本
 *
 * 通过真实输入框提交，mode 由产品决定，不能假设只做 plan 或不会计费。
 * 用例在 finally 中取消任务。余额仅留存事实，不能代替预扣流水次数断言。
 *
 * ⚠️ 仍然是真实调用。请确认使用的是专用测试账号。
 */

/** 极简 prompt：目标是验证「受理机制」，不是验证某个工作流的效果 */
const PROBE_PROMPT = "你好，请用一句话说明你能做什么";

test.describe("@regression G2 提交受理", () => {
  test("提交任务被受理，且客户端只提交了一次", async ({ page }) => {
    await openWorkspaceSession(page);

    const poolsBefore = extractPools(await readRuntimeHealth(page));
    const balanceBefore = await readBalanceCents(page);

    const outcome = await submitPrompt(page, PROBE_PROMPT);

    try {
      const poolsAfter = extractPools(await readRuntimeHealth(page));
      const balanceAfter = await readBalanceCents(page);

      await test.info().attach("G2-submission", {
        body: JSON.stringify({ runId: outcome.runId, httpStatus: outcome.httpStatus,
          submitRequests: outcome.submitRequests, status: outcome.status,
          balanceBefore: Number.isFinite(balanceBefore) ? balanceBefore : null,
          balanceAfter: Number.isFinite(balanceAfter) ? balanceAfter : null,
          poolsBefore, poolsAfter,
          pending: ["账户/请求范围的 Job 数量差恰好为 1", "按 Job 关联的积分预扣次数"] }, null, 2),
        contentType: "application/json",
      });

      expect(outcome.httpStatus, "提交不得被 400/429 或其他 HTTP 错误拒绝").toBeGreaterThanOrEqual(200);
      expect(outcome.httpStatus, "提交不得被 400/429 或其他 HTTP 错误拒绝").toBeLessThan(300);

      console.log("");
      console.log("── G2 提交结果 ──────────────────────────────");
      console.log(`run_id        : ${outcome.runId || "(空)"}`);
      console.log(`status        : ${outcome.status || "(空)"}`);
      console.log(`提交请求数    : ${outcome.submitRequests}`);
      console.log(`余额          : ${balanceBefore} → ${balanceAfter} cents`);
      console.log(`余额变化      : ${balanceAfter - balanceBefore}`);
      console.log("──────────────────────────────────────────────");
      console.log("");

      // 判据 1（防重复提交，主判据）：客户端只发出一次提交请求
      expect(
        outcome.submitRequests,
        `一次提交发出了 ${outcome.submitRequests} 个 POST /v1/agent/runs —— 存在重复提交`,
      ).toBe(1);

      // 判据 2：拿到唯一且非空的 run_id
      expect(outcome.runId, "提交未返回 run_id，任务未被创建").not.toBe("");

      // 判据 3：任务已被受理；很快结束或进入澄清也是合法受理结果。
      expect(
        ["preparing", "queued", "running", "waiting_for_local", "done", "requires_user_input"],
        `新任务的初始状态为 ${outcome.status}，不在已受理的状态集合中`,
      ).toContain(outcome.status);

      // 按本次 ID 回读服务端对象；共享环境全局 submitted/rejected 仅作诊断。
      const detail = await getRunDetail(page, outcome.runId);
      expect(findStringField(detail, "run_id"), "服务端应可回读本次提交的 Run").toBe(outcome.runId);

    } finally {
      // 即使断言失败，也清理本次已经创建的任务。
      const cancelled = await cancelRun(page, outcome.runId);
      console.log(`清理：取消任务 ${cancelled ? "成功" : "失败 —— 请人工确认该 run 是否仍在运行"}`);
      console.log("");
      if (!cancelled) test.info().annotations.push({ type: "cleanup", description: `任务未取消：${outcome.runId}` });
    }
  });

  test.fixme("账户/请求范围内新增 Job 恰好为 1（待接入权威任务列表）", () => {});
  test.fixme("积分预扣次数与任务数一致（待接入按 Job 关联的预扣流水）", () => {});
});
