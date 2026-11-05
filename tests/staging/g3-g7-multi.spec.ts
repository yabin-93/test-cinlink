import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import { type CompoundAudit, observeCompoundRun, saveCompoundAudit, waitForObservedCompound } from "../../src/fixtures/compound-audit.js";
import { fillClarificationFields } from "../../src/fixtures/clarification.js";
import {
  appendPromptText,
  attachAssets,
  cancelRun,
  confirmRenderPlan,
  conversationForRun,
  disposeAttached,
  getRunDetail,
  isRunSubmission,
  openWorkspaceSession,
  pollRunUntilSettled,
  readRunStatus,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  submitPrompt,
  type AttachedAsset,
} from "../../src/workspace.js";

/**
 * G3–G7 · 多工作流场景（MW-01 ~ MW-05，新版工作台）
 *
 * 验证“上一步产物/上下文能否被下一步继续使用”，以及单条指令对同一原片执行多项处理。
 * 这些是真实任务，会消耗积分与较长时间。
 *
 * 提示词按新版行为写明参数（字幕交付方式、增强倍率），避免停下来澄清。
 */

const POLL_TIMEOUT_MS = 20 * 60_000;
const SHORT = TEST_ASSETS.videoShort;
const LONG = TEST_ASSETS.videoLong;

async function prepare(page: Page, asset = SHORT): Promise<AttachedAsset> {
  await openWorkspaceSession(page);
  const [attached] = await attachAssets(page, [asset]);
  expect(attached.uploadedAs, "素材挂载失败").not.toBe("");
  const reference = await referenceAssetInPrompt(page, attached.uploadedAs);
  expect(reference.ok, `@ 引用失败：${reference.candidates.join(", ")}`).toBe(true);
  return attached;
}

async function sendPrompt(page: Page, prompt: string): Promise<string> {
  await appendPromptText(page, prompt);
  const submit = await submitCurrentPrompt(page);
  expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
  expect(submit.runId, "提交未返回 run_id").not.toBe("");
  return submit.runId;
}

async function waitDone(page: Page, runId: string, timeoutMs = POLL_TIMEOUT_MS) {
  const polled = await pollRunUntilSettled(page, runId, { timeoutMs, intervalMs: 5_000 });
  expect(polled.status, `任务未收敛到 done（run=${runId}）`).toBe("done");
}

type BaseMultiAudit = CompoundAudit & {
  prompts: string[];
  roles: Record<string, string>;
  sendButtons: Array<{ role: string; label: string; enabled: boolean; at: string }>;
  sourceSrt?: Array<{ id: string; name: string }>;
  sourceFile?: string;
  beforeCleanupStatuses?: Record<string, string | null>;
};

/** Keep both rounds in the same UI conversation, including clarification and failure evidence. */
function baseMultiProbe(page: Page, caseId: string, prompts: string[]) {
  const audit: BaseMultiAudit = { caseId, prompts, prompt: prompts.join("\n"), startedAt: new Date().toISOString(), coverage: "two-turn-same-conversation; completion-with-clarification", stage: "prepare-input", planConfirmations: 0, clarificationObserved: false, clarificationRequests: 0, runs: {}, roles: {}, sendButtons: [] };
  const runs = new Set<string>();
  const enabled = Boolean(process.env.CINLINK_AUDIT_DIR);
  page.on("response", async response => {
    if (response.request().method() === "POST" && /\/clarifications(?:\/|$)/.test(response.url())) {
      audit.clarificationObserved = true; audit.clarificationRequests++;
      try { (audit.clarificationAnswers ??= []).push(response.request().postDataJSON()); } catch { /* Private trace retains non-JSON answers. */ }
    }
    if (!isRunSubmission(response.url(), response.request().method())) return;
    const body = await response.json().catch(() => null) as { run_id?: string } | null;
    if (body?.run_id) runs.add(body.run_id);
  });
  const stage = async (name: string) => { audit.stage = name; await saveCompoundAudit(audit); };
  const submit = async (role: string, prompt: string, followup = false) => {
    await stage(`submit-${role}`);
    await appendPromptText(page, prompt);
    if (enabled) await page.screenshot({ path: test.info().outputPath(`${role}-before-submit.png`), fullPage: true, timeout: 15_000 });
    if (followup) {
      // Never click a Stop control while trying to submit the second request.
      await expect.poll(async () => {
        const button = page.locator("#workspace-send").first();
        const label = [await button.getAttribute("aria-label"), await button.getAttribute("title"), await button.innerText()].filter(Boolean).join(" ");
        const state = { role, label, enabled: await button.isEnabled(), at: new Date().toISOString() };
        audit.sendButtons.push(state); await saveCompoundAudit(audit);
        return state.enabled && /send|发送|submit|提交/i.test(label) && !/stop|停止|cancel|取消/i.test(label);
      }, { timeout: 10_000, intervals: [250, 500, 1000], message: "第二条请求无法发送：按钮未恢复为可用Send；实际按钮状态已留档，未误点Stop" }).toBe(true);
    }
    const response = await submitCurrentPrompt(page);
    expect(response.httpStatus, `${role}提交被拒绝`).toBeLessThan(300);
    expect(response.runId, `${role}未返回run_id`).not.toBe("");
    runs.add(response.runId); audit.roles[role] = response.runId;
    await observeCompoundRun(page, response.runId, audit);
    return response.runId;
  };
  const settle = async (role: string, runId: string, prompt: string) => {
    await stage(`wait-${role}`);
    let active = runId;
    let result = await waitForObservedCompound(page, active, audit, POLL_TIMEOUT_MS);
    for (let round = 1; result.status === "requires_user_input" && process.env.CINLINK_ALLOW_CLARIFICATION === "1" && round <= 8; round++) {
      const detail = await observeCompoundRun(page, active, audit) as { clarifications?: unknown[] };
      if (audit.runs[active]?.rawStatus === "waiting_for_clarification") {
        (audit.clarificationQuestions ??= []).push({ role, questions: detail.clarifications ?? [] });
        (audit.clarificationFieldValues ??= []).push(...await fillClarificationFields(page, caseId, prompt));
        // These fixtures contain English speech; the requested subtitle output is Chinese in round one.
        const languageInputs = page.locator('input:visible:not([type="search"]), textarea:visible');
        for (let i = 0; i < await languageInputs.count(); i++) {
          const input = languageInputs.nth(i);
          const name = await input.evaluate(el => { const field = el as HTMLInputElement; return [field.name, field.id, field.placeholder, ...Array.from(field.labels ?? []).map(l => l.textContent ?? "")].join(" "); });
          if (!/language|语言|语种/i.test(name) || !await input.isEditable()) continue;
          const value = /source|源/i.test(name) ? (role === "translate" ? "zh" : "en") : (role === "translate" ? "en" : "zh-Hans");
          await input.fill(value); (audit.clarificationFieldValues ??= []).push({ role, field: name, value });
        }
        if (role === "translate" && audit.sourceSrt?.length) {
          for (const select of await page.locator("select:visible").all()) {
            const choices = await select.locator("option").evaluateAll(options => options.map(el => ({ value: (el as HTMLOptionElement).value, label: el.textContent ?? "" })));
            const match = choices.find(option => audit.sourceSrt!.some(file => option.value === file.id || option.label.includes(file.name)));
            if (match) await select.selectOption(match.value);
            else if (choices.some(option => /\.mp4|\.srt|file_cloud_/i.test(option.value + option.label))) throw new Error("翻译补槽未提供上一轮SRT选项，不能改选原视频来替代字幕产物依赖");
          }
        }
        if (enabled) await page.screenshot({ path: test.info().outputPath(`${role}-clarification-${round}.png`), fullPage: true, timeout: 15_000 });
      } else audit.planConfirmations++;
      const next = await confirmRenderPlan(page, { allowClarification: true });
      if (next) { active = next; runs.add(next); audit.roles[role] = next; }
      result = await waitForObservedCompound(page, active, audit, POLL_TIMEOUT_MS);
    }
    audit.finalStatus = result.status;
    expect(result.status, `${role}补槽/计划确认后任务未完成`).toBe("done");
    return active;
  };
  const finish = async () => {
    if (enabled) await page.screenshot({ path: test.info().outputPath("final-state.png"), fullPage: true, timeout: 15_000 }).catch(() => undefined);
    audit.cleanup = {}; audit.beforeCleanupStatuses = {};
    for (const id of runs) {
      await observeCompoundRun(page, id, audit).catch(() => undefined);
      const status = audit.runs[id]?.status ?? null; audit.beforeCleanupStatuses[id] = status;
      if (status && !["done", "failed", "cancelled", "canceled"].includes(status)) {
        audit.cleanup[id] = await cancelRun(page, id).catch(() => false);
        await observeCompoundRun(page, id, audit).catch(() => undefined);
      }
    }
    await saveCompoundAudit(audit);
    if (enabled) await test.info().attach(`${caseId}-execution-audit`, { body: JSON.stringify(audit, null, 2), contentType: "application/json" });
  };
  return { audit, stage, submit, settle, finish };
}

test.describe("@regression G3–G7 多工作流", () => {
  test("@slow MW-01 单次提交串行依赖：中文字幕再翻译英文", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const prompts = ["先根据我引用的原始视频的英文语音生成简体中文字幕 SRT，再以上一步生成的中文字幕 SRT 为唯一输入翻译成英文 SRT；分别交付中文字幕 SRT 和英文字幕 SRT 两个独立文件，两份字幕保留原视频的完整时间轴。"];
    const probe = baseMultiProbe(page, "MW-01", prompts);
    probe.audit.coverage = "single-prompt; Chinese-SRT-to-English-SRT-dependency";
    let attached: AttachedAsset | undefined;
    try {
      await probe.stage("prepare-input"); attached = await prepare(page); probe.audit.sourceFile = attached.uploadedAs;
      const deliveryRun = await probe.settle("subtitle-chain", await probe.submit("subtitle-chain", prompts[0]), prompts[0]);
      await probe.stage("check-delivery");
      const subtitles = extractArtifacts(await getRunDetail(page, deliveryRun)).filter(a => /\.srt$/i.test(a.name));
      probe.audit.sourceSrt = subtitles.map(a => ({ id: a.id, name: a.name }));
      expect(subtitles.length, `单次字幕链需交付中文和英文两份SRT，实际：${subtitles.map(a => a.name).join(", ")}`).toBeGreaterThanOrEqual(2);
      probe.audit.outcome = "passed";
    } catch (error) {
      probe.audit.failedStage = probe.audit.stage;
      probe.audit.outcome = probe.audit.stage === "prepare-input" ? "blocked-precondition" : "failed";
      probe.audit.error = error instanceof Error ? error.message : String(error); throw error;
    } finally {
      await probe.finish(); if (attached) disposeAttached(attached);
    }
  });

  test("@slow MW-02 同源多任务：单次提交字幕与增强", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const prompts = ["对我引用的同一个原始视频完成两项处理：根据原片的英文语音生成简体中文字幕，交付独立的中文字幕 SRT 文件，保留源视频时间轴；同时将原片分辨率增强 2 倍至 2560×1440，保留原时长和原音轨，交付增强后的 MP4 视频。两项处理都以同一个原片为输入，交付中文字幕 SRT 和增强 MP4；字幕作为独立文件交付，不烧录进视频。"];
    const probe = baseMultiProbe(page, "MW-02", prompts);
    probe.audit.coverage = "single-prompt; same-original-video; subtitle-SRT-and-enhanced-MP4";
    let attached: AttachedAsset | undefined;
    try {
      await probe.stage("prepare-input"); attached = await prepare(page); probe.audit.sourceFile = attached.uploadedAs;
      const deliveryRun = await probe.settle("compound", await probe.submit("compound", prompts[0]), prompts[0]);
      await probe.stage("check-delivery");
      const artifacts = extractArtifacts(await getRunDetail(page, deliveryRun));
      expect(artifacts.some(a => /\.srt$/i.test(a.name)), "单次复合请求未交付中文字幕SRT").toBe(true);
      expect(artifacts.some(a => /\.mp4$/i.test(a.name)), "单次复合请求未交付增强MP4").toBe(true);
      probe.audit.outcome = "passed";
    } catch (error) {
      probe.audit.failedStage = probe.audit.stage;
      probe.audit.outcome = probe.audit.stage === "prepare-input" ? "blocked-precondition" : "failed";
      probe.audit.error = error instanceof Error ? error.message : String(error); throw error;
    } finally {
      await probe.finish(); if (attached) disposeAttached(attached);
    }
  });

  test("@slow MW-03 单句复合：一条指令触发多步处理", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const audit: CompoundAudit = { caseId: "MW-03", prompt: "根据这个视频的中文语音生成简体中文字幕并烧录，同时将分辨率增强 2 倍至 2560×1440，保留源时长与原音轨，交付最终 MP4 视频", startedAt: new Date().toISOString(), coverage: "case-path; completion-with-clarification", stage: "open-workspace", planConfirmations: 0, clarificationObserved: false, clarificationRequests: 0, runs: {} };
    const auditEnabled = Boolean(process.env.CINLINK_AUDIT_DIR);
    const allowClarification = process.env.CINLINK_ALLOW_CLARIFICATION === "1";
    const runs = new Set<string>();
    let attached: AttachedAsset | undefined;
    page.on("response", async response => {
      if (response.request().method() === "POST" && /\/clarifications(?:\/|$)/.test(response.url())) {
        audit.clarificationObserved = true; audit.clarificationRequests++;
        try { (audit.clarificationAnswers ??= []).push(response.request().postDataJSON()); } catch { /* Recorded in trace. */ }
      }
      if (!isRunSubmission(response.url(), response.request().method())) return;
      const body = await response.json().catch(() => null) as { run_id?: string } | null;
      if (body?.run_id) runs.add(body.run_id);
    });
    try {
      await saveCompoundAudit(audit);
      audit.stage = "prepare-input";
      attached = await prepare(page);
      audit.stage = "submit-target";
      const runId = await sendPrompt(page, audit.prompt);
      runs.add(runId);
      let deliveryRunId = runId;
      audit.stage = "wait-target";
      if (allowClarification) {
        let active = runId;
        let state = await waitForObservedCompound(page, active, audit, POLL_TIMEOUT_MS);
        for (let round = 1; state.status === "requires_user_input" && round <= 8; round++) {
          const detail = await observeCompoundRun(page, active, audit) as { clarifications?: unknown[] };
          if (audit.runs[active]?.rawStatus === "waiting_for_clarification") {
            (audit.clarificationQuestions ??= []).push(detail.clarifications ?? []);
            (audit.clarificationFieldValues ??= []).push(...await fillClarificationFields(page, "MW-03", audit.prompt));
            await page.screenshot({ path: test.info().outputPath(`clarification-${round}.png`), fullPage: true });
          } else audit.planConfirmations++;
          const next = await confirmRenderPlan(page, { allowClarification: true });
          if (next) { active = next; runs.add(next); }
          state = await waitForObservedCompound(page, active, audit, POLL_TIMEOUT_MS);
        }
        audit.finalStatus = state.status;
        deliveryRunId = active;
        expect(state.status, "补槽/确认后任务仍未完成").toBe("done");
      } else await waitDone(page, runId);

      audit.stage = "check-delivery";
      const detail = await getRunDetail(page, deliveryRunId);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "复合指令没有产出任何产物").toBeGreaterThan(0);
      expect(artifacts.some(a => /\.mp4$/i.test(a.name)), "明确要求的最终MP4未交付").toBe(true);
      audit.outcome = "passed";
    } catch (error) {
      audit.failedStage = audit.stage;
      audit.outcome = ["open-workspace", "prepare-input"].includes(audit.stage) ? "blocked-precondition" : "failed";
      audit.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      if (auditEnabled) {
        await page.screenshot({ path: test.info().outputPath("final-state.png"), fullPage: true }).catch(() => undefined);
        audit.cleanup = {};
        for (const id of runs) {
          await observeCompoundRun(page, id, audit).catch(() => undefined);
          if (!["done", "failed", "cancelled", "canceled"].includes(audit.runs[id]?.status ?? "")) audit.cleanup[id] = await cancelRun(page, id).catch(() => false);
        }
        await saveCompoundAudit(audit);
        await test.info().attach("MW-03-execution-audit", { body: JSON.stringify(audit, null, 2), contentType: "application/json" });
      }
      if (attached) disposeAttached(attached);
    }
  });

  // CINLINK-MIX-001 已修复（2026-11-02），恢复为正式用例
  test("@slow MW-04 多素材多任务：双素材混剪", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const first = await prepare(page);
    try {
      const [second] = await attachAssets(page, [LONG]);
      const reference = await referenceAssetInPrompt(page, second.uploadedAs, undefined, {
        clear: false,
      });
      expect(reference.ok).toBe(true);

      const runId = await sendPrompt(page, "把这两个视频的高光混剪成 18 秒，输出混剪后的视频，最多用 4 个高光片段");
      await waitDone(page, runId);
      const detail = await getRunDetail(page, runId);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "混剪没有产物").toBeGreaterThan(0);
    } finally {
      disposeAttached(first);
    }
  });

  // 2026-11-03：取消端点已可用（/runtime-api/v2/agent/runs/{id}/cancel，G2 清理已验证）；
  // 但取消后在同一会话重提，第二条 run done 且 0 产物，助手回复
  // “workflow’s required tool definitions were not supplied” —— 待产品修复后启用。
  // 云效工作项：b6b809cfd596d4f47862fc68ed
  test.fixme("@slow MW-05 中断恢复：取消后重新提交", async ({ page }) => {
    test.setTimeout(45 * 60_000);
    const attached = await prepare(page);
    try {
      const firstRun = await sendPrompt(page, "把这个视频剪成 20 秒左右的高光短视频，输出剪辑后的视频");
      const cancelled = await cancelRun(page, firstRun);
      expect(cancelled, "取消任务失败").toBe(true);

      // 取消后界面仍可能显示 Thinking，发送键变停止键；等第一条 run 真正停稳再发第二条
      let firstStatus = await readRunStatus(page, firstRun);
      for (let i = 0; i < 30 && (!firstStatus || ["queued", "running", "preparing"].includes(firstStatus)); i += 1) {
        await page.waitForTimeout(2_000);
        firstStatus = await readRunStatus(page, firstRun);
      }
      console.log(`取消后首条 run 状态: ${firstStatus}`);
      expect(firstStatus, "取消后首条 run 仍在运行").not.toMatch(/^(queued|running|preparing)$/);

      // 取消后界面仍停在 Thinking（发送键变停止键）；刷新会话恢复输入区再提交
      await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
      await page.locator("#workspace-prompt").waitFor({ state: "attached", timeout: 60_000 });

      // 刷新会丢附件；重新挂载同一素材并 @ 引用，避免第二条指令没有输入
      expect(attached.tempPath, "临时附件已被清理，无法重新挂载").not.toBeNull();
      await page
        .locator("#workspace-file-input, input[type=file]")
        .first()
        .setInputFiles(attached.tempPath as string);
      await page.waitForTimeout(2_000);
      const reReference = await referenceAssetInPrompt(page, attached.uploadedAs);
      expect(reReference.ok, `重新提交前无法 @ 引用素材：${reReference.candidates.join(", ")}`).toBe(true);
      await appendPromptText(page, "把这个视频剪成 20 秒左右的高光短视频，输出剪辑后的视频");

      const secondSubmit = await submitCurrentPrompt(page);
      const secondRun = secondSubmit.runId;
      expect(secondSubmit.httpStatus, "重新提交被拒绝").toBeLessThan(300);
      expect(secondRun, "重新提交没有创建新 run").not.toBe(firstRun);
      await waitDone(page, secondRun);

      const detail = await getRunDetail(page, secondRun);
      const artifacts = extractArtifacts(detail);
      expect(artifacts.length, "重新提交后没有产物").toBeGreaterThan(0);
    } finally {
      disposeAttached(attached);
    }
  });
});
