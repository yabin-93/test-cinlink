import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS } from "../../src/assets.js";
import { targets } from "../../src/config.js";
import {
  checkArtifactsDeliverable,
  checkSubtitleArtifact,
  extractArtifacts,
  type RunArtifact,
} from "../../src/assertions/artifact.js";
import { extractPools, pollUntilSettled, sumPoolMetric, type StatusSample } from "../../src/assertions/job.js";
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
  getRunDetail,
  openWorkspaceSession,
  readBalanceCents,
  readRunStatus,
  readRuntimeHealth,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
  waitForActiveDrain,
} from "../../src/workspace.js";

/**
 * G3–G7 · subtitle 真实任务
 *
 * 设计依据：`CinLink-Web-AI工作流链路测试设计.md`（G3 执行可观测、G4 终态收敛、
 * G5 产物可交付、G6 结构层、G7 资源账本）。
 *
 * ## 与其他用例的边界
 *
 * - G1/G2 已经单独覆盖素材上传与提交受理；这里从「引用素材 + 提交真实字幕任务」开始，
 *   把同一条任务的后续观测串起来。G1 的断言不重复，只保留最小前置（上传成功、拿到 ID）。
 * - G6 只做**结构层**（SRT 可解析、序号连续、时间戳合法；视频可解码、时长/音轨匹配）。
 *   **内容层**（字幕是否与语音同步）按设计明确留给人工，不在这里假装自动判定。
 * - G7 目前只能验证「无孤儿任务」；积分预扣次数需要按 Job 关联的流水接口，
 *   与 G2 的两个 fixme 同源，这里不制造假绿灯。
 *
 * ## 成本与副作用
 *
 * 会真实上传 7.8MB 素材并提交一个字幕任务（可能计费、耗时数分钟）。
 * 素材与任务都在 `finally` 中清理。固定提示词，不做随机生成。
 */

const SHORT = TEST_ASSETS.videoShort;

/** 固定提示词：字幕工作流，参数尽量少，避免澄清分支 */
const PROMPT = "给这个视频生成中文字幕";

/** 轮询上限：设计文档给的 20 分钟以内，这里留 15 分钟 */
const POLL_TIMEOUT_MS = 15 * 60_000;

/** 产物落盘目录（失败证据 / 人工复核用） */
// 落盘到 reports/ 而不是 test-results/：后者每次 Playwright 运行都会清空，
// 产物需要跨运行保留供人工复核。
const ARTIFACT_DIR = path.resolve("reports", "artifacts", "g3-g7-subtitle");

test.describe("G3–G7 字幕链路", () => {
  test("提交字幕任务后，状态收敛、产物可交付且结构合法", async ({ page }) => {
    // 该用例包含真实排队与执行时间，必须放宽 Playwright 默认 5 分钟
    test.setTimeout(POLL_TIMEOUT_MS + 3 * 60_000);

    await openWorkspaceSession(page);

    const poolBefore = extractPools(await readRuntimeHealth(page));
    const balanceBefore = await readBalanceCents(page);

    const upload = await uploadAsset(page, SHORT);
    expect(upload.cloudFileId, "前置：素材必须上传成功并返回 cloud_file_id").not.toBe("");

    let runId = "";
    let poolAfter = poolBefore;

    try {
      // ── 引用素材 + 追加指令 ──────────────────────────────────────────
      // 不能用 submitPrompt()：它会 fill() 清空 composer，把 @ 引用一起抹掉。
      const reference = await referenceAssetInPrompt(
        page,
        upload.uploadedAs,
        upload.cloudFileId,
      );
      expect(
        reference.ok,
        `素材未能通过 @ 引用：${reference.candidates.join(", ")}`,
      ).toBe(true);

      const editor = page.locator("#workspace-prompt");
      await editor.click({ timeout: 20_000 });
      await page.keyboard.press("End");
      await page.keyboard.insertText(` ${PROMPT}`);

      const startedAt = Date.now();
      const submit = await submitCurrentPrompt(page);
      runId = submit.runId;

      // ── G2 的最小前置（完整 G2 判定由 g2-submit 负责）──────────────
      expect(submit.httpStatus, "提交不得被 4xx/5xx 拒绝").toBeLessThan(300);
      expect(submit.submitRequests, "一次提交只应发出 1 个创建请求").toBe(1);
      expect(runId, "提交未返回 run_id，任务未被创建").not.toBe("");

      // ── G3/G4：轮询状态时间线 ───────────────────────────────────────
      const timeline: StatusSample[] = [
        { status: submit.status || "queued", at: startedAt },
      ];
      const polled = await pollUntilSettled(() => readRunStatus(page, runId), {
        timeoutMs: POLL_TIMEOUT_MS,
        intervalMs: 5_000,
      });
      timeline.push(...polled.samples);

      await test.info().attach("G3-G4-timeline", {
        body: JSON.stringify(
          { runId, elapsedMs: polled.elapsedMs, timedOut: polled.timedOut, timeline },
          null,
          2,
        ),
        contentType: "application/json",
      });

      const observationBase: Observation = {
        uploaded: [
          { cloudFileId: upload.cloudFileId, sizeBytes: upload.sizeBytes, listable: true },
        ],
        jobIds: [runId],
        poolBefore,
        poolAfter, // 收敛后再更新
        creditsBefore: balanceBefore,
        timeline,
        timeoutMs: POLL_TIMEOUT_MS,
        artifacts: [],
      };

      const gate3 = gate3Observable(observationBase);
      expect(
        gate3.ok,
        `G3 执行可观测失败：\n${gate3.failures.join("\n")}`,
      ).toBe(true);

      const gate4 = gate4Settled({
        ...observationBase,
        expectedTerminal: "done",
      });
      expect(
        gate4.ok,
        `G4 终态收敛失败：\n${gate4.failures.join("\n")}`,
      ).toBe(true);

      // ── G5：产物可交付 ─────────────────────────────────────────────
      const detail = await getRunDetail(page, runId);
      expect(detail, "任务收敛后无法回读 Run 详情").not.toBeNull();

      const artifacts = extractArtifacts(detail);
      await test.info().attach("G5-artifacts", {
        body: JSON.stringify(
          artifacts.map((a) => ({ name: a.name, kind: a.kind, id: a.id, url: a.url })),
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

      const subtitleCheck = checkSubtitleArtifact(artifacts);
      expect(
        subtitleCheck.ok,
        `G5 字幕产物缺失：\n${subtitleCheck.failures.join("\n")}`,
      ).toBe(true);

      await mkdir(ARTIFACT_DIR, { recursive: true });

      // ── G6 结构层：SRT ─────────────────────────────────────────────
      const srt = artifacts.find((a) => /\.srt$/i.test(a.name) && a.url);
      expect(srt, "没有可下载的 .srt 产物").toBeTruthy();

      const srtResponse = await page.request.get(srt!.url, { timeout: 180_000 });
      expect(srtResponse.status(), "SRT 预签名地址应可直接下载").toBe(200);
      const srtBytes = await srtResponse.body();
      const srtPath = path.join(ARTIFACT_DIR, path.basename(srt!.name));
      await writeFile(srtPath, srtBytes);

      const srtText = srtBytes.toString("utf8");
      const srtStructure = checkSrtStructure(srtText, { sourceBytes: srtBytes });
      expect(
        srtStructure.ok,
        `G6 SRT 结构校验失败：\n${srtStructure.failures.join("\n")}`,
      ).toBe(true);
      console.log("");
      console.log("── G6 SRT 结构 ──────────────────────────────");
      console.log(`文件          : ${srtPath}`);
      console.log(`字节数        : ${srtBytes.byteLength}`);
      console.log(`字幕条目      : ${srtStructure.cues.length}`);
      console.log("──────────────────────────────────────────────");

      // ── G6 结构层：视频（有才校验）─────────────────────────────────
      const video = pickVideoArtifact(artifacts);
      if (video) {
        const videoResponse = await page.request.get(video.url, { timeout: 300_000 });
        expect(videoResponse.status(), "产物视频应可直接下载").toBe(200);
        const videoBytes = await videoResponse.body();
        const videoPath = path.join(ARTIFACT_DIR, path.basename(video.name));
        await writeFile(videoPath, videoBytes);

        const media = await probeMedia(videoPath, targets.ffprobePath);
        const mediaCheck = checkMedia(media, {
          durationSec: SHORT.durationSec,
          durationToleranceSec: 2,
          requireAudio: true,
        });
        expect(
          mediaCheck.ok,
          `G6 视频结构校验失败：\n${mediaCheck.failures.join("\n")}`,
        ).toBe(true);
        console.log(`视频产物      : ${videoPath}`);
        console.log(`时长/音轨     : ${media.durationSec.toFixed(2)}s / ${media.audio.length} 条`);
      } else {
        test.info().annotations.push({
          type: "g6-video",
          description: "本次只产出字幕文件，没有视频产物；视频层校验跳过",
        });
      }

      // ── G5/G7：交付物与账本 ────────────────────────────────────────
      // done 之后 worker 可能还占着 active 几秒，直接读会被误判成孤儿任务
      poolAfter = await waitForActiveDrain(page, sumPoolMetric(poolBefore, "active"));
      const balanceAfter = await readBalanceCents(page);

      await test.info().attach("G7-pools", {
        body: JSON.stringify({ poolBefore, poolAfter, balanceBefore, balanceAfter }, null, 2),
        contentType: "application/json",
      });

      const delivered = [
        { name: srt!.name, sizeBytes: srtBytes.byteLength, kind: "subtitle" as const },
      ];

      const gate5 = gate5Deliverable({
        ...observationBase,
        poolAfter,
        submittedJobId: runId,
        artifacts: delivered,
      });
      expect(
        gate5.ok,
        `G5 产物交付判定失败：\n${gate5.failures.join("\n")}`,
      ).toBe(true);

      const gate7 = gate7Ledger({
        ...observationBase,
        poolAfter,
        creditsAfter: Number.isFinite(balanceAfter) ? balanceAfter : undefined,
      });
      expect(
        gate7.ok,
        `G7 资源账本失败：\n${gate7.failures.join("\n")}`,
      ).toBe(true);

      console.log("");
      console.log("── G3–G7 结果 ───────────────────────────────");
      console.log(`run_id        : ${runId}`);
      console.log(`状态时间线    : ${timeline.map((s) => s.status).join(" -> ")}`);
      console.log(`收敛耗时      : ${(polled.elapsedMs / 1000).toFixed(1)} s`);
      console.log(`产物数        : ${artifacts.length}`);
      console.log(`余额          : ${balanceBefore} -> ${balanceAfter} cents`);
      console.log(`余额变化      : ${balanceAfter - balanceBefore}`);
      console.log("──────────────────────────────────────────────");
      console.log("");
    } finally {
      if (runId) {
        // 已完成的任务取消会失败，属于预期；未完成时这是唯一清理手段
        const cancelled = await cancelRun(page, runId).catch(() => false);
        console.log(`清理任务 ${runId}: ${cancelled ? "已取消" : "无需取消或取消失败"}`);
      }
      const removed = await deleteAgentFile(page, upload.cloudFileId).catch(() => false);
      console.log(
        `清理素材 ${upload.cloudFileId}: ${removed ? "成功" : "失败（需人工确认）"}`,
      );
      if (!removed) {
        test.info().annotations.push({
          type: "cleanup",
          description: `素材未清理：${upload.cloudFileId}`,
        });
      }
    }
  });
});

/** 优先选交付级视频产物（mp4），跳过音频/图片 */
function pickVideoArtifact(artifacts: RunArtifact[]): RunArtifact | undefined {
  return artifacts.find(
    (a) => a.url && (/\.(mp4|mov|webm)$/i.test(a.name) || a.kind === "video"),
  );
}
