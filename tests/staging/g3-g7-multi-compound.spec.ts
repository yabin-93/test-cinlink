import type { Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS, WATERMARK_IMAGE, type TestAsset } from "../../src/assets.js";
import { type CompoundAudit, observeCompoundRun, saveCompoundAudit, waitForObservedCompound } from "../../src/fixtures/compound-audit.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import { checkMedia, probeMedia } from "../../src/assertions/media.js";
import { targets } from "../../src/config.js";
import { createProjectSessionPair } from "../../src/fixtures/project-sessions.js";
import { fillClarificationFields } from "../../src/fixtures/clarification.js";
import { assertWorkspaceOpened } from "../../src/staging.js";
import {
  appendPromptText,
  attachAssets,
  cancelRun,
  confirmRenderPlan,
  conversationForRun,
  disposeAttached,
  getRunDetail,
  findStringField,
  isRunSubmission,
  openWorkspaceSession,
  pollRunUntilSettled,
  referenceAssetInPrompt,
  restoreRunConversation,
  submitCurrentPrompt,
  type AttachedAsset,
} from "../../src/workspace.js";

/**
 * 多工作流复合用例（MW-06~14/18/21/23~26）
 *
 * 每条只跑一次完整链路：上传 1–3 个素材 → @ 引用 → 一句话提示词 → 等待所有 run 收敛。
 * 复合指令是否拆成多个 run、产物数量与类型，以实际产品行为为准；
 * 普通用例预先写明参数；MW-13 专门验证参数冲突澄清；MW-21 使用同项目双会话夹具。
 * 缺失故障注入或真实复测未通过的场景保留 fixme。
 */

const POLL_TIMEOUT_MS = 30 * 60_000;
const SHORT = TEST_ASSETS.videoShort;

interface CompoundCase {
  id: string;
  name: string;
  prompt: string;
  assets: TestAsset[];
  expectArtifacts: number;
  expectKinds?: Array<"srt" | "video" | "image" | "text">;
  videoDuration?: { min?: number; max?: number };
  fixme?: string;
}

const CASES: CompoundCase[] = [
  {
    id: "MW-06", name: "字幕+翻译+总结",
    prompt: "根据这个视频的中文语音生成简体中文字幕，再翻译成英文；分别交付中文字幕 SRT、英文字幕 SRT，以及一份中文要点总结文本。",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["srt", "text"],
  },
  {
    id: "MW-07", name: "去口水词+字幕+翻译+导出",
    prompt: "先去掉这个视频中的口水词和重复语气词，再根据清理后的视频生成简体中文字幕并翻译成英文；交付清理后的 MP4 视频、中文字幕 SRT 和英文字幕 SRT，保留原音轨。",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["video", "srt"],
  },
  {
    id: "MW-08", name: "长变短+字幕+翻译+水印+导出",
    prompt: "先把这个视频剪成 30 秒高光，再根据高光视频生成简体中文字幕并翻译成英文；把中文字幕和文字水印 E2E-TEST 烧录到成片中，水印位于右上角、全程可见；交付一个最终 MP4 视频，以及中文和英文 SRT 文件。",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["video", "srt"],
    videoDuration: { min: 20, max: 45 },
  },
  {
    id: "MW-09", name: "混剪+字幕+翻译+增强+水印+导出",
    // 2026-11-03 通过：确认卡片“Render multi-source highlights → 提交”后可跑完；
    // 产品只交付最终成片（1 个视频），不单独回传中间字幕文件
    prompt: "把这两个视频混剪成 18 秒，最多使用 4 个高光片段；根据混剪后的视频生成简体中文字幕并翻译成英文，将英文字幕烧录；再把分辨率增强到 2 倍，并添加右上角、全程可见的文字水印 E2E-TEST；交付一个最终 MP4 成片。",
    assets: [SHORT, TEST_ASSETS.videoLong], expectArtifacts: 1, expectKinds: ["video"],
  },
  {
    id: "MW-10", name: "显式顺序：增强→字幕→长变短",
    prompt: "按顺序先把这个视频的分辨率增强到 2 倍，再根据中文语音生成简体中文字幕并烧录，最后剪成 20 秒高光；交付最终 MP4 视频，以及与最终成片时间轴一致的中文字幕 SRT。",
    assets: [SHORT], expectArtifacts: 2, expectKinds: ["video", "srt"],
    videoDuration: { min: 15, max: 30 },
  },
  {
    id: "MW-11", name: "生成→字幕→翻译",
    prompt: "先生成一个 5 秒、720P、16:9 的视频，内容为人物用普通话说“这是自动化测试”；再只针对生成的视频生成简体中文字幕并翻译成英文，交付中文和英文 SRT 文件。",
    assets: [], expectArtifacts: 2, expectKinds: ["srt"],
    fixme: "2026-11-03 严格复测无补槽，但 done 后仅交付 media-info.json，缺少中英文 SRT",
  },
  {
    id: "MW-12", name: "中间翻译失败",
    prompt: "根据这个视频的中文语音生成简体中文字幕，再翻译成英文并烧录到 MP4 成片；交付中文 SRT、英文 SRT 和最终 MP4 视频。",
    assets: [SHORT], expectArtifacts: 1,
    fixme: "故障注入工具仍缺失；2026-11-03 正常路径无补槽，但缺少单独交付的英文 SRT",
  },
  {
    id: "MW-13", name: "参数冲突",
    prompt: "把视频剪成 20 秒，再剪成 30 秒，只输出一个最终版本",
    // 2026-11-03 通过：产品先澄清"确认最终时长"，提交预填 30 后生成计划，再确认计划即可
    assets: [SHORT], expectArtifacts: 1,
  },
  {
    id: "MW-14", name: "7 工作流长链路",
    prompt: "先用中文总结这个视频的要点，再根据中文语音生成简体中文字幕并翻译成英文；将英文字幕烧录，把视频剪成 30 秒高光，分辨率增强到 2 倍，并添加右上角、全程可见的文字水印 E2E-TEST；交付中文总结、中文和英文 SRT、最终 MP4 成片。",
    assets: [SHORT], expectArtifacts: 2,
    fixme: "7 工作流规划超时：产品返回 TimeoutError（规划模型 60s），run failed，0 产物",
  },
  {
    id: "MW-18", name: "视频+图片水印+字幕",
    prompt: "先把我引用的图片加到我引用的视频右上角作为图片水印，透明度 50%、全程可见；再根据视频的中文语音生成简体中文字幕；交付带图片水印的 MP4 视频和中文字幕 SRT 文件。",
    assets: [SHORT, WATERMARK_IMAGE], expectArtifacts: 2, expectKinds: ["video", "srt"],
  },
  {
    id: "MW-21", name: "跨会话素材复用",
    prompt: "根据我在本会话中明确 @ 引用的视频生成简体中文字幕并烧录，保留原音轨，交付一个带中文字幕的 MP4 视频。",
    assets: [SHORT], expectArtifacts: 1, expectKinds: ["video"],
    fixme: "2026-11-03 同项目 A/B 夹具已接入：A 的 F 已登记并回读项目归属，B @ 无候选；目标字幕未提交",
  },
  // ── 2026-11-03 新增 P0：单视频、多工作流（优先多工作流，不涉及多视频） ──
  {
    id: "MW-23", name: "字幕链：中文→英文→烧录",
    prompt: "根据这个视频的中文语音生成简体中文字幕，再翻译成英文，将中英文双语字幕烧录到视频中，保留原音轨，交付一个最终 MP4 成片。",
    assets: [SHORT], expectArtifacts: 1, expectKinds: ["video"],
  },
  {
    id: "MW-24", name: "去口癖→中文字幕",
    prompt: "先去掉这个视频中的口水词和重复语气词，保留有效语义；再根据清理后的视频生成简体中文字幕并烧录，保留原音轨，交付一个清理后带中文字幕的 MP4 成片。",
    assets: [SHORT], expectArtifacts: 1, expectKinds: ["video"],
  },
  {
    id: "MW-25", name: "长变短→中文字幕",
    prompt: "先把这个视频剪成 30 秒高光，再根据剪辑后的视频生成简体中文字幕并烧录，保留原音轨，交付一个带中文字幕的 MP4 成片。",
    assets: [SHORT], expectArtifacts: 1, expectKinds: ["video"],
  },
  {
    id: "MW-26", name: "文字水印→英文字幕",
    prompt: "先给这个视频添加文字水印 E2E-P0，位于右上角、全程可见；再根据中文语音生成英文字幕并烧录，保留原音轨，交付一个带水印和英文字幕的 MP4 成片。",
    assets: [SHORT], expectArtifacts: 1, expectKinds: ["video"],
  },
];

async function attachAndReference(page: Page, assets: TestAsset[]): Promise<AttachedAsset[]> {
  const attached = await attachAssets(page, assets);
  for (let i = 0; i < attached.length; i += 1) {
    const reference = await referenceAssetInPrompt(page, attached[i].uploadedAs, undefined, {
      clear: i === 0,
    });
    expect(reference.ok, `素材 ${attached[i].uploadedAs} 未能 @ 引用`).toBe(true);
  }
  return attached;
}

function artifactKind(name: string): "srt" | "video" | "image" | "text" | null {
  if (/\.srt$/i.test(name)) return "srt";
  if (/\.(mp4|mov|webm)$/i.test(name)) return "video";
  if (/\.(png|jpe?g|webp)$/i.test(name)) return "image";
  if (/\.(txt|md|json)$/i.test(name)) return "text";
  return null;
}

test.describe("@regression 多工作流复合（MW-06~22）", () => {
  for (const c of CASES) {
    test(`${c.id} ${c.name}`, async ({ page }) => {
      if (c.fixme && process.env.CINLINK_INCLUDE_BLOCKED !== "1") {
        test.fixme(true, c.fixme);
        return;
      }
      test.setTimeout(POLL_TIMEOUT_MS + 10 * 60_000);
      const probe = process.env.CINLINK_PROMPT_PROBE === "1" || c.id === "MW-21";
      const allowClarification = process.env.CINLINK_ALLOW_CLARIFICATION === "1";
      const resumeRunId = process.env.CINLINK_RESUME_CASE === c.id ? process.env.CINLINK_RESUME_RUN_ID ?? "" : "";
      const audit: CompoundAudit = {
        caseId: c.id, prompt: c.prompt, startedAt: new Date().toISOString(),
        coverage: c.id === "MW-12" && probe ? "prompt-normal-path-only; server fault injection unavailable" : "case-path",
        stage: "open-workspace", planConfirmations: 0, clarificationObserved: false, clarificationRequests: 0, runs: {},
      };
      const waitRun = (runId: string, timeoutMs = POLL_TIMEOUT_MS) => probe
        ? waitForObservedCompound(page, runId, audit, timeoutMs)
        : pollRunUntilSettled(page, runId, { timeoutMs, intervalMs: 5_000 });
      const runIds = new Set<string>();
      page.on("response", async (response) => {
        if (probe && response.request().method() === "POST" && /\/clarifications(?:\/|$)/.test(response.url())) {
          audit.clarificationRequests += 1;
          audit.clarificationObserved = true;
          try { (audit.clarificationAnswers ??= []).push(response.request().postDataJSON()); } catch { /* Non-JSON answers remain in the private trace. */ }
        }
        if (!isRunSubmission(response.url(), response.request().method())) return;
        const body = await response.json().catch(() => null);
        const id = body && typeof body === "object" ? (body as { run_id?: string }).run_id : undefined;
        if (id) runIds.add(id);
      });

      const attached: AttachedAsset[] = [];
      let projectPair: Awaited<ReturnType<typeof createProjectSessionPair>> | undefined;
      let targetPhase = false;
      page.on("request", (request) => {
        if (targetPhase && request.method() === "POST" && /\/agent\/files\/(?:presign|complete|register|multipart\/(?:start|part|complete))(?:\?|$)/.test(request.url())) {
          audit.targetUploadRequests = (audit.targetUploadRequests ?? 0) + 1;
        }
      });
      try {
        await saveCompoundAudit(audit);
        if (resumeRunId) {
          const conversationId = process.env.CINLINK_RESUME_CONVERSATION_ID ?? "";
          restoreRunConversation(resumeRunId, conversationId);
          runIds.add(resumeRunId);
          audit.coverage = "resumed-existing-run; completion-with-clarification";
          await assertWorkspaceOpened(page);
          const conversation = page.locator(`[data-react-conversation-id="${conversationId}"]`).first();
          await conversation.waitFor({ state: "attached", timeout: 45_000 });
          await conversation.evaluate((element: HTMLElement) => element.click());
          const recovered = await observeCompoundRun(page, resumeRunId, audit) as { messages?: unknown[] };
          expect((recovered.messages ?? []).length, "原会话中找不到已受理的Run，停止而不重复提交").toBeGreaterThan(0);
        } else if (c.id === "MW-21") {
          projectPair = await createProjectSessionPair(page);
          audit.projectId = projectPair.projectId;
          audit.projectName = projectPair.projectName;
          audit.coverage = "same-project-two-conversations; no target re-upload; exact file identity";
        } else await openWorkspaceSession(page);
        audit.stage = "prepare-input";
        await saveCompoundAudit(audit);
        if (c.id === "MW-21") {
          // Bind the upload to a real source conversation, then reference it in a fresh conversation without re-upload.
          attached.push(...(await attachAndReference(page, c.assets)));
          await appendPromptText(page, "请记录我引用的视频素材，只回复素材文件名，供本项目的后续会话处理；本条不执行编辑或生成。");
          const setup = await submitCurrentPrompt(page);
          expect(setup.runId, "源会话未创建").not.toBe("");
          runIds.add(setup.runId);
          audit.setupRunId = setup.runId;
          audit.setupConversationId = conversationForRun(setup.runId);
          const prepared = await waitRun(setup.runId, 120_000);
          expect(prepared.status, "源会话登记任务未完成").toBe("done");
          audit.sourceProjectId = await projectPair!.verifyConversation(audit.setupConversationId);
          const source = await observeCompoundRun(page, setup.runId, audit);
          const file = source?.context_files?.[0];
          audit.sourceFileId = findStringField(file, "file_id") ?? findStringField(file, "cloud_file_id") ?? findStringField(file, "id") ?? "";
          audit.sourceFileName = findStringField(file, "name") ?? attached[0].uploadedAs;
          expect(audit.sourceFileId, "源会话没有可核验的 file_id，不能证明跨会话复用").not.toBe("");
          expect(audit.clarificationObserved, "源会话准备阶段出现澄清").toBe(false);
          await projectPair!.registerSourceFile({ id: audit.sourceFileId, name: audit.sourceFileName,
            sizeBytes: c.assets[0].sizeBytes, mimeType: c.assets[0].mimeType });
          audit.sourceRegisteredInProject = true;
          targetPhase = true;
          audit.targetUploadRequests = 0;
          await projectPair!.openTarget();
          audit.targetDraftProjectId = projectPair!.projectId;
          audit.stage = "reference-source";
          await saveCompoundAudit(audit);
          const reference = await referenceAssetInPrompt(page, audit.sourceFileName, audit.sourceFileId);
          audit.referenceCandidates = reference.candidates;
          expect(reference.ok, "新会话无法引用源会话素材；没有用重新上传掩盖跨会话前置失败").toBe(true);
        } else if (!resumeRunId && c.assets.length > 0) attached.push(...(await attachAndReference(page, c.assets)));

        audit.stage = "submit-target";
        await saveCompoundAudit(audit);
        if (!resumeRunId) await appendPromptText(page, c.prompt);
        if (probe) await page.screenshot({ path: test.info().outputPath("before-submit.png"), fullPage: true });
        const submit = resumeRunId ? { httpStatus: 200, runId: resumeRunId } : await submitCurrentPrompt(page);
        expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
        expect(submit.runId, "提交未返回 run_id").not.toBe("");
        runIds.add(submit.runId);
        if (probe && c.id === "MW-21") {
          audit.targetConversationId = conversationForRun(submit.runId);
          expect(conversationForRun(submit.runId), "目标会话必须不同于源会话").not.toBe(audit.setupConversationId);
          audit.targetProjectId = await projectPair!.verifyConversation(audit.targetConversationId);
          expect(audit.targetUploadRequests, "会话 B 不得重新上传素材").toBe(0);
          const target = await getRunDetail(page, submit.runId) as { context_files?: unknown[] };
          audit.targetFileIds = (target.context_files ?? []).map((file) => findStringField(file, "file_id") ?? findStringField(file, "cloud_file_id") ?? findStringField(file, "id") ?? "");
          audit.crossSessionReferenceVerified = audit.targetFileIds.includes(audit.sourceFileId!);
          expect(audit.crossSessionReferenceVerified, "目标会话必须引用源素材的相同 file_id").toBe(true);
        }
        audit.stage = "wait-target";

        // 复合指令可能在首个 run 完成后继续派生新 run，先等首条收敛
        let activeRunId = submit.runId;
        let polled = await waitRun(activeRunId);

        // 计划确认：优先点确认拿续跑 run；没有确认入口时给原 run 自动续跑机会
        let confirmRounds = 0;
        while (polled.status === "requires_user_input" && confirmRounds < (allowClarification ? 8 : 2)) {
          confirmRounds += 1;
          if (probe) {
            const detail = await observeCompoundRun(page, [...runIds].at(-1)!, audit);
            if (!allowClarification) expect(audit.clarificationObserved, `${c.id} 出现缺参补槽，已停止而未自动选择答案`).toBe(false);
            const latest = audit.runs[[...runIds].at(-1)!];
            const planVisible = await page.locator(".node-plan-review__actions button").first().isVisible().catch(() => false);
            if (allowClarification && latest?.rawStatus === "waiting_for_clarification") {
              (audit.clarificationQuestions ??= []).push((detail as { clarifications?: unknown[] })?.clarifications ?? []);
              (audit.clarificationFieldValues ??= []).push(...await fillClarificationFields(page, c.id, c.prompt));
              await page.screenshot({ path: test.info().outputPath(`clarification-${confirmRounds}.png`), fullPage: true });
            } else {
              expect(latest?.rawStatus === "waiting_for_confirmation" || planVisible, `${c.id} 等待输入但无法证明是执行计划确认（${detail?.status}）`).toBe(true);
              audit.planConfirmations += 1;
            }
          }
          const confirmedRunId = await confirmRenderPlan(page, { allowClarification: !probe || allowClarification });
          if (confirmedRunId) {
            runIds.add(confirmedRunId);
            activeRunId = confirmedRunId;
            polled = await waitRun(confirmedRunId);
          } else {
            // 确认走 /confirmations，原 run 继续渲染，给它完整超时
            polled = await waitRun(activeRunId);
            if (polled.status === "requires_user_input" && !allowClarification) {
              expect(polled.status, `${c.id} 停在确认且无法继续`).not.toBe("requires_user_input");
            }
          }
        }

        if (probe) {
          audit.finalStatus = polled.status;
          if (!allowClarification) expect(audit.clarificationObserved, `${c.id} 出现过缺参补槽`).toBe(false);
          expect(polled.status, `${c.id} 未完成；服务端详情已记录到审计文件`).toBe("done");
        }

        await page.waitForTimeout(5_000);

        const artifacts: Array<{ name: string; kind: string | null }> = [];
        for (const id of runIds) {
          if (c.id === "MW-21" && id === audit.setupRunId) continue;
          const detail = await getRunDetail(page, id);
          for (const a of extractArtifacts(detail)) artifacts.push({ name: a.name, kind: artifactKind(a.name) });
          if (c.id === "MW-21") {
            expect(conversationForRun(id), "目标产物必须归属于 B").toBe(audit.targetConversationId);
            for (const video of extractArtifacts(detail).filter((a) => /\.mp4$/i.test(a.name))) {
              const download = await page.request.get(video.url, { timeout: 300_000 });
              expect(download.status(), "MP4 产物不可下载").toBe(200);
              const videoPath = test.info().outputPath("mw21-subtitled.mp4");
              await writeFile(videoPath, await download.body());
              const media = await probeMedia(videoPath, targets.ffprobePath);
              const source = await probeMedia(c.assets[0].path, targets.ffprobePath);
              const checked = checkMedia(media, { durationSec: source.durationSec, durationToleranceSec: 0.5, requireVideo: true, requireAudio: true });
              audit.media = { durationSec: media.durationSec, audioStreams: media.audio.length, width: media.video?.width, height: media.video?.height };
              expect(checked.ok, checked.failures.join("\n")).toBe(true);
            }
          }
        }

        const expectedArtifactCount = probe && c.id === "MW-12" ? 3 : c.expectArtifacts;
        expect(
          artifacts.length,
          `${c.id} 产物不足：期望 ≥${expectedArtifactCount}，实际 ${artifacts.map((a) => a.name).join(", ")}`,
        ).toBeGreaterThanOrEqual(expectedArtifactCount);

        if (c.expectKinds) {
          const kinds = new Set(artifacts.map((a) => a.kind));
          for (const kind of c.expectKinds) {
            expect(kinds.has(kind), `${c.id} 缺少 ${kind} 产物（现有：${[...kinds].join(", ")}）`).toBe(true);
          }
        }
        if (c.id === "MW-21") {
          expect(artifacts.filter((a) => /\.mp4$/i.test(a.name)), "应交付一个最终 MP4").toHaveLength(1);
          expect(audit.media, "必须实际下载并核验 MP4 媒体结构").toBeDefined();
          expect(audit.targetUploadRequests, "B 执行全程不得重新上传素材").toBe(0);
          await projectPair!.verifyConversation(audit.setupConversationId!);
        }
        audit.outcome = "passed";
      } catch (error) {
        if (c.id === "MW-21") {
          audit.referenceCandidates = await page.locator("[data-workspace-mention-file-key], [role=option]").allTextContents().catch(() => []);
        }
        audit.failedStage = audit.stage;
        audit.outcome = ["open-workspace", "prepare-input"].includes(audit.stage) ? "blocked-precondition" : "failed";
        audit.error = error instanceof Error ? error.message : String(error);
        throw error;
      } finally {
        if (probe) {
          await page.screenshot({ path: test.info().outputPath("final-state.png"), fullPage: true }).catch(() => undefined);
          audit.cleanup = {};
          for (const id of runIds) {
            await observeCompoundRun(page, id, audit).catch(() => undefined);
            const state = audit.runs[id]?.status;
            if (state && !["done", "failed", "cancelled", "canceled"].includes(state)) audit.cleanup[id] = await cancelRun(page, id);
          }
          audit.stage = "finished";
          await saveCompoundAudit(audit);
          await test.info().attach(`${c.id}-execution-audit`, { body: JSON.stringify(audit, null, 2), contentType: "application/json" });
        }
        for (const item of attached) disposeAttached(item);
      }
    });
  }
});
