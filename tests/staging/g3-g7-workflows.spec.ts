import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS, type TestAsset } from "../../src/assets.js";
import { targets } from "../../src/config.js";
import {
  checkArtifactsDeliverable,
  extractArtifacts,
  type RunArtifact,
} from "../../src/assertions/artifact.js";
import {
  extractPools,
  sumPoolMetric,
  type StatusSample,
} from "../../src/assertions/job.js";
import { checkMedia, probeMedia } from "../../src/assertions/media.js";
import { checkSrtStructure } from "../../src/assertions/srt.js";
import {
  gate3Observable,
  gate4Settled,
  gate5Deliverable,
  gate7Ledger,
  type Observation,
} from "../../src/levels/gates.js";
import {
  cancelRun,
  deleteAgentFile,
  findStringField,
  getRunDetail,
  isRunSubmission,
  openWorkspaceSession,
  pollRunUntilSettled,
  readBalanceCents,
  readRuntimeHealth,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
  waitForActiveDrain,
  type UploadOutcome,
} from "../../src/workspace.js";

/**
 * G3–G7 · 其余五条主干工作流
 *
 * 与 `g3-g7-subtitle` / `g3-g7-image-watermark` 同一套关卡，用表驱动覆盖：
 *   translation、enhance、text-watermark、long-to-short、mix。
 *
 * ## 断言边界
 *
 * - G5/G6 只做结构层：产物可下载、视频可解码、时长符合该工作流的预期；
 *   画面是否更好看、翻译是否准确、混剪节奏是否合理，属于内容层，留人工。
 * - long-to-short / mix 在部分环境下会先出「剪辑方案」等待确认。本用例固定提示词
 *   要求直接剪；若产品仍停在 requires_user_input，G4 会失败并保留 Run 详情，
 *   这属于流程差异，需要在用例里补确认步骤，而不是放宽终态断言。
 *
 * ## 成本
 *
 * 每条都是真实任务，会消耗积分与数分钟时间；素材与任务在 `finally` 中清理。
 */

interface FlowCase {
  /** 用例标题 */
  name: string;
  prompt: string;
  assets: TestAsset[];
  /** 期望至少有一个结构化字幕产物 */
  expectSubtitle?: boolean;
  /** 期望视频产物的结构约束；不填表示不要求视频产物 */
  video?: {
    durationSec?: number;
    durationToleranceSec?: number;
    minDurationSec?: number;
    maxDurationSec?: number;
    requireAudio?: boolean;
  };
  /**
   * 该工作流会先追问一个文本参数时，这里给固定答复。
   * 实测：双素材混剪必问「最多用几个高光片段（2～10个）？」。
   */
  clarify?: { value: string };
  /** 已确认的产品缺陷：默认跳过并在报告里写明原因；设 CINLINK_INCLUDE_BLOCKED=1 可强制跑 */
  blocked?: string;
}

const SHORT = TEST_ASSETS.videoShort;
const LONG = TEST_ASSETS.videoLong;

const FLOWS: FlowCase[] = [
  {
    name: "translation · 英文翻译字幕",
    prompt: "把这个视频翻译成英文（English）字幕，只输出翻译后的字幕文件",
    assets: [SHORT],
    expectSubtitle: true,
  },
  {
    name: "enhance · 增强画质",
    prompt: "增强这个视频的画质",
    assets: [SHORT],
    video: { durationSec: SHORT.durationSec, durationToleranceSec: 3, requireAudio: true },
  },
  {
    name: "text-watermark · 文字水印",
    prompt: "给这个视频添加文字水印，文字内容是 E2E-TEST",
    assets: [SHORT],
    video: { durationSec: SHORT.durationSec, durationToleranceSec: 2, requireAudio: true },
  },
  {
    name: "long-to-short · 高光短视频",
    prompt: "把这个视频剪成 20 秒左右的高光短视频，直接剪，不用先给我方案",
    assets: [SHORT],
    video: { minDurationSec: 5, maxDurationSec: 40, requireAudio: true },
  },
  {
    name: "mix · 双素材混剪",
    // 双素材高光必问 max_clips（实测澄清原话：「最多用几个高光片段（2～10个）？」）；
    // 用例按产品的真实流程回答该问题，而不是写死提示词绕过它。
    prompt: "把这两个视频的高光混剪成 18 秒",
    assets: [SHORT, LONG],
    video: { minDurationSec: 5, maxDurationSec: 40, requireAudio: true },
    clarify: { value: "最多用 4 个高光片段" },
    blocked:
      "产品缺陷（2026-10-19 复现 7 次）：双素材混剪回答 max_clips 澄清后，续跑 Run 的 prompt 只剩回答文本，" +
      "丢失原任务上下文，助手回复「该请求目前没有可执行的 CinLink 工作流程」，状态 done 但 0 产物；" +
      "另有 2 次 intent_recognition_invalid_output。设 CINLINK_INCLUDE_BLOCKED=1 可强制运行。",
  },
];

const POLL_TIMEOUT_MS = 15 * 60_000;

for (const flow of FLOWS) {
  test.describe(`G3–G7 ${flow.name}`, () => {
    test(`${flow.name}：状态收敛、产物可交付且结构合法`, async ({ page }) => {
      test.setTimeout(POLL_TIMEOUT_MS + 3 * 60_000);

      if (flow.blocked && process.env.CINLINK_INCLUDE_BLOCKED !== "1") {
        test.fixme(true, flow.blocked);
        return;
      }

      // 落盘到 reports/ 而不是 test-results/：后者每次运行都会被清空
      const dir = path.resolve("reports", "artifacts", "g3-g7-workflows", slug(flow.name));
      await mkdir(dir, { recursive: true });

      await openWorkspaceSession(page);

      const poolBefore = extractPools(await readRuntimeHealth(page));
      const balanceBefore = await readBalanceCents(page);

      const uploaded: UploadOutcome[] = [];
      const runIds: string[] = [];
      let runId = "";
      let poolAfter = poolBefore;

      try {
        for (const asset of flow.assets) {
          const outcome = await uploadAsset(page, asset);
          expect(outcome.cloudFileId, `前置：素材 ${asset.name} 上传失败`).not.toBe("");
          uploaded.push(outcome);
        }

        // 依次引用；第一次清空 composer，后续追加
        for (let i = 0; i < uploaded.length; i += 1) {
          const outcome = uploaded[i];
          const reference = await referenceAssetInPrompt(
            page,
            outcome.uploadedAs,
            outcome.cloudFileId,
            { clear: i === 0 },
          );
          expect(
            reference.ok,
            `素材 ${outcome.uploadedAs} 未能通过 @ 引用：${reference.candidates.join(", ")}`,
          ).toBe(true);
        }

        await typePrompt(page, flow.prompt);

        const startedAt = Date.now();
        const submit = await submitCurrentPrompt(page);
        runId = submit.runId;
        runIds.push(runId);

        expect(submit.httpStatus, "提交不得被 4xx/5xx 拒绝").toBeLessThan(300);
        expect(submit.submitRequests, "一次提交只应发出 1 个创建请求").toBe(1);
        expect(runId, "提交未返回 run_id").not.toBe("");

        // ── G3/G4 ──────────────────────────────────────────────────
        const timeline: StatusSample[] = [
          { status: submit.status || "queued", at: startedAt },
        ];
        let polled = await pollRunUntilSettled(page, runId, {
          timeoutMs: POLL_TIMEOUT_MS,
          intervalMs: 5_000,
        });
        timeline.push(...polled.samples);

        // 部分工作流会先追问参数（实测混剪必问 max_clips）。按产品真实流程回答：
        // 回答会调用一次新的创建请求，得到一个续跑 Run，然后继续等它收敛。
        let clarifyRounds = 0;
        while (polled.status === "requires_user_input" && flow.clarify && clarifyRounds < 2) {
          clarifyRounds += 1;
          const answered = await answerTextClarification(page, flow.clarify.value);
          expect(answered.runId, "回答澄清后没有创建续跑 Run").not.toBe("");
          runId = answered.runId;
          runIds.push(runId);
          console.log(`已回答澄清「${flow.clarify.value}」，续跑 Run: ${runId}`);

          polled = await pollRunUntilSettled(page, runId, {
            timeoutMs: POLL_TIMEOUT_MS,
            intervalMs: 5_000,
          });
          timeline.push(...polled.samples);
        }

        await test.info().attach("G3-G4-timeline", {
          body: JSON.stringify(
            { flow: flow.name, runIds, elapsedMs: polled.elapsedMs, timeline },
            null,
            2,
          ),
          contentType: "application/json",
        });

        const observationBase: Observation = {
          uploaded: uploaded.map((u) => ({
            cloudFileId: u.cloudFileId,
            sizeBytes: u.sizeBytes,
            listable: true,
          })),
          jobIds: runIds,
          poolBefore,
          poolAfter,
          creditsBefore: balanceBefore,
          timeline,
          timeoutMs: POLL_TIMEOUT_MS,
          artifacts: [],
        };

        const gate3 = gate3Observable(observationBase);
        expect(gate3.ok, `G3 执行可观测失败：\n${gate3.failures.join("\n")}`).toBe(true);

        // 停在澄清态时把服务端详情一起留档，便于判断是流程差异还是缺陷
        const detail = polled.timedOut ? null : await getRunDetail(page, runId);
        if (polled.status !== "done" && detail) {
          await test.info().attach("run-detail-on-stop", {
            body: JSON.stringify(detail, null, 2),
            contentType: "application/json",
          });
        }

        const gate4 = gate4Settled({ ...observationBase, expectedTerminal: "done" });
        expect(gate4.ok, `G4 终态收敛失败：\n${gate4.failures.join("\n")}`).toBe(true);

        // ── G5 ─────────────────────────────────────────────────────
        expect(detail, "任务收敛后无法回读 Run 详情").not.toBeNull();
        const artifacts = extractArtifacts(detail);
        await test.info().attach("G5-artifacts", {
          body: JSON.stringify(
            artifacts.map((a) => ({ name: a.name, kind: a.kind, id: a.id, size: a.metadata.size_bytes })),
            null,
            2,
          ),
          contentType: "application/json",
        });

        const deliverable = checkArtifactsDeliverable(artifacts);
        expect(
          deliverable.ok,
          `G5 产物可交付失败：\n${deliverable.failures.join("\n")}`,
        ).toBe(true);

        // ── G6 结构层 ───────────────────────────────────────────────
        const delivered: Array<{ name: string; sizeBytes: number; kind: "video" | "subtitle" }> = [];

        if (flow.expectSubtitle) {
          const srt = artifacts.find((a) => /\.srt$/i.test(a.name) && a.url);
          expect(
            srt,
            `没有 .srt 产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
          ).toBeTruthy();

          const response = await page.request.get(srt!.url, { timeout: 180_000 });
          expect(response.status(), "SRT 应可直接下载").toBe(200);
          const bytes = await response.body();
          const srtPath = path.join(dir, path.basename(srt!.name));
          await writeFile(srtPath, bytes);

          const structure = checkSrtStructure(bytes.toString("utf8"), { sourceBytes: bytes });
          expect(
            structure.ok,
            `G6 SRT 结构校验失败：\n${structure.failures.join("\n")}`,
          ).toBe(true);

          delivered.push({ name: srt!.name, sizeBytes: bytes.byteLength, kind: "subtitle" });
          console.log(`\n字幕产物: ${srtPath}（${bytes.byteLength} 字节，${structure.cues.length} 条）`);
        }

        if (flow.video) {
          const video = pickVideoArtifact(artifacts);
          expect(
            video,
            `没有视频产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
          ).toBeTruthy();

          const response = await page.request.get(video!.url, { timeout: 300_000 });
          expect(response.status(), "产物视频应可直接下载").toBe(200);
          const bytes = await response.body();
          const videoPath = path.join(dir, path.basename(video!.name));
          await writeFile(videoPath, bytes);

          const media = await probeMedia(videoPath, targets.ffprobePath);
          const mediaCheck = checkMedia(media, {
            durationSec: flow.video.durationSec,
            durationToleranceSec: flow.video.durationToleranceSec,
            minDurationSec: flow.video.minDurationSec,
            maxDurationSec: flow.video.maxDurationSec,
            requireAudio: flow.video.requireAudio,
          });
          expect(
            mediaCheck.ok,
            `G6 视频结构校验失败：\n${mediaCheck.failures.join("\n")}`,
          ).toBe(true);

          delivered.push({ name: video!.name, sizeBytes: bytes.byteLength, kind: "video" });
          console.log(
            `\n视频产物: ${videoPath}\n` +
              `时长 ${media.durationSec.toFixed(2)}s · ${media.video?.width}x${media.video?.height} · ` +
              `${media.video?.fps.toFixed(2)}fps · 音轨 ${media.audio.length}`,
          );
        }

        // ── G5/G7 ──────────────────────────────────────────────────
        poolAfter = await waitForActiveDrain(page, sumPoolMetric(poolBefore, "active"));
        const balanceAfter = await readBalanceCents(page);

        await test.info().attach("G7-pools", {
          body: JSON.stringify({ poolBefore, poolAfter, balanceBefore, balanceAfter }, null, 2),
          contentType: "application/json",
        });

        const gate5 = gate5Deliverable({
          ...observationBase,
          poolAfter,
          submittedJobId: runId,
          artifacts: delivered,
        });
        expect(gate5.ok, `G5 产物交付判定失败：\n${gate5.failures.join("\n")}`).toBe(true);

        const gate7 = gate7Ledger({
          ...observationBase,
          poolAfter,
          creditsAfter: Number.isFinite(balanceAfter) ? balanceAfter : undefined,
        });
        expect(gate7.ok, `G7 资源账本失败：\n${gate7.failures.join("\n")}`).toBe(true);

        console.log("");
        console.log(`── ${flow.name} ──`);
        console.log(`run_id      : ${runId}`);
        console.log(`时间线      : ${timeline.map((s) => s.status).join(" -> ")}`);
        console.log(`收敛耗时    : ${(polled.elapsedMs / 1000).toFixed(1)} s`);
        console.log(`产物数      : ${artifacts.length}`);
        console.log(`余额        : ${balanceBefore} -> ${balanceAfter} (${balanceAfter - balanceBefore})`);
        console.log("");
      } finally {
        if (runId) {
          const cancelled = await cancelRun(page, runId).catch(() => false);
          console.log(`清理任务 ${runId}: ${cancelled ? "已取消" : "无需取消或取消失败"}`);
        }
        for (const [index, outcome] of uploaded.entries()) {
          const removed = await deleteAgentFile(page, outcome.cloudFileId).catch(() => false);
          console.log(`清理素材 ${outcome.cloudFileId}: ${removed ? "成功" : "失败"}`);
          if (!removed) {
            test.info().annotations.push({
              type: "cleanup",
              description: `第 ${index + 1} 个素材未清理：${outcome.cloudFileId}`,
            });
          }
        }
      }
    });
  });
}

/** 把指令追加到 composer 末尾（两个引用 chip 时 click+End 不可靠，实测会丢文本） */
async function typePrompt(page: Page, prompt: string): Promise<void> {
  const editor = page.locator("#workspace-prompt");
  await editor.evaluate((el) => {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  });
  await page.keyboard.insertText(` ${prompt}`);

  const composed = (await editor.innerText()).replace(/\s+/g, " ").trim();
  expect(composed, `composer 中缺少指令文本，实际内容：${composed}`).toContain(prompt);
}

/** 回答文本型澄清；回答会触发一次新的创建请求，返回续跑 Run 的 id */
async function answerTextClarification(page: Page, value: string): Promise<{ runId: string }> {
  const input = page.locator("[data-workspace-clarification-input]").first();
  await input.waitFor({ state: "visible", timeout: 30_000 });
  await input.fill(value);

  const responsePromise = page.waitForResponse(
    (response) => isRunSubmission(response.url(), response.request().method()),
    { timeout: 120_000 },
  );
  await page.locator("[data-workspace-clarification-submit]").first().click();

  const response = await responsePromise;
  const raw = await response.json().catch(() => null);
  return { runId: findStringField(raw, "run_id") ?? "" };
}

function pickVideoArtifact(artifacts: RunArtifact[]): RunArtifact | undefined {
  return artifacts.find(
    (a) => a.url && (/\.(mp4|mov|webm)$/i.test(a.name) || a.kind === "video"),
  );
}

function slug(value: string): string {
  return value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, "-");
}
