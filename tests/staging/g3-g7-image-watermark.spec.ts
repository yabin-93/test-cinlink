import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS, WATERMARK_IMAGE } from "../../src/assets.js";
import { targets } from "../../src/config.js";
import {
  checkArtifactsDeliverable,
  extractArtifacts,
  type RunArtifact,
} from "../../src/assertions/artifact.js";
import { extractPools, pollUntilSettled, sumPoolMetric, type StatusSample } from "../../src/assertions/job.js";
import { checkMedia, probeMedia } from "../../src/assertions/media.js";
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
 * G3–G7 · image-watermark 真实任务
 *
 * 与 `g3-g7-subtitle.spec.ts` 同一套关卡，差异在工作流与产物：
 *   - 素材：7MB.mp4（被加水印）+ cinlink-smoke-watermark.png（水印图片）
 *   - 产物：一个带图片水印的视频，不产出 SRT
 *   - G6 只校验结构层（可解码、时长/分辨率/音轨）；水印是否真的出现在画面上、
 *     位置与不透明度是否符合预期，属于内容/参数层，按设计留人工复核，不在这里硬判定。
 *
 * ## 为什么用两个 @ 引用
 *
 * 产品的图片水印既可以用品牌套件里的 Logo，也可以临时指定图片。本用例不依赖
 * 账号里的品牌套件配置（它在浏览器 localStorage 里，测试账号不保证已设置），
 * 而是显式上传一张水印图并引用，让同一条请求自带水印素材。
 *
 * ## 成本与副作用
 *
 * 会真实上传两个素材并提交一个水印任务（可能计费、耗时 1–3 分钟）。
 * 任务与两个素材都在 `finally` 中清理。
 */

const SOURCE = TEST_ASSETS.videoShort;

/** 固定提示词：显式说明哪个引用是水印，降低澄清概率 */
const PROMPT = "给这个视频添加图片水印，水印图片用我引用的这张图片";

const POLL_TIMEOUT_MS = 15 * 60_000;
// 落盘到 reports/ 而不是 test-results/：后者每次 Playwright 运行都会清空，
// 产物需要跨运行保留供人工复核。
const ARTIFACT_DIR = path.resolve("reports", "artifacts", "g3-g7-image-watermark");

test.describe("@regression G3–G7 图片水印链路", () => {
  test("提交图片水印任务后，状态收敛、产物可交付且结构合法", async ({ page }) => {
    test.setTimeout(POLL_TIMEOUT_MS + 3 * 60_000);

    await openWorkspaceSession(page);

    const poolBefore = extractPools(await readRuntimeHealth(page));
    const balanceBefore = await readBalanceCents(page);

    const video = await uploadAsset(page, SOURCE);
    expect(video.cloudFileId, "前置：源视频必须上传成功").not.toBe("");

    const watermark = await uploadAsset(page, WATERMARK_IMAGE);
    expect(watermark.cloudFileId, "前置：水印图片必须上传成功").not.toBe("");

    let runId = "";
    let poolAfter = poolBefore;

    try {
      // ── 依次引用两个素材 ────────────────────────────────────────────
      // 第二次必须传 { clear: false }，否则会把第一个引用抹掉。
      const videoRef = await referenceAssetInPrompt(
        page,
        video.uploadedAs,
        video.cloudFileId,
      );
      expect(
        videoRef.ok,
        `源视频未能通过 @ 引用：${videoRef.candidates.join(", ")}`,
      ).toBe(true);

      const imageRef = await referenceAssetInPrompt(
        page,
        watermark.uploadedAs,
        watermark.cloudFileId,
        { clear: false },
      );
      expect(
        imageRef.ok,
        `水印图片未能通过 @ 引用：${imageRef.candidates.join(", ")}`,
      ).toBe(true);

      const editor = page.locator("#workspace-prompt");
      // 两个引用 chip 占满一行时，普通 click + End 可能把光标落在 chip 上而不是文本末尾，
      // 导致 insertText 被丢弃（提交里只剩 @ 引用，AI 会反问"你想如何处理"）。
      // 这里显式把选区折叠到编辑器内容末尾，再插入指令。
      await editor.evaluate((el) => {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      });
      await page.keyboard.insertText(` ${PROMPT}`);

      // 提交前确认指令真的进了 composer，避免只提交引用导致澄清（会浪费一次真实任务）
      const composed = (await editor.innerText()).replace(/\s+/g, " ").trim();
      expect(
        composed,
        `composer 中缺少指令文本，实际内容：${composed}`,
      ).toContain(PROMPT);

      const startedAt = Date.now();
      const submit = await submitCurrentPrompt(page);
      runId = submit.runId;

      // ── G2 最小前置 ────────────────────────────────────────────────
      expect(submit.httpStatus, "提交不得被 4xx/5xx 拒绝").toBeLessThan(300);
      expect(submit.submitRequests, "一次提交只应发出 1 个创建请求").toBe(1);
      expect(runId, "提交未返回 run_id，任务未被创建").not.toBe("");

      // ── G3/G4：状态时间线 ──────────────────────────────────────────
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
          { cloudFileId: video.cloudFileId, sizeBytes: video.sizeBytes, listable: true },
        ],
        jobIds: [runId],
        poolBefore,
        poolAfter,
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

      const gate4 = gate4Settled({ ...observationBase, expectedTerminal: "done" });
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

      const outputVideo = pickVideoArtifact(artifacts);
      expect(
        outputVideo,
        `没有视频产物（现有：${artifacts.map((a) => a.name).join(", ")}）`,
      ).toBeTruthy();

      // ── G6 结构层：下载并 ffprobe ──────────────────────────────────
      await mkdir(ARTIFACT_DIR, { recursive: true });

      const response = await page.request.get(outputVideo!.url, { timeout: 300_000 });
      expect(response.status(), "产物视频应可直接下载").toBe(200);
      const bytes = await response.body();

      const videoPath = path.join(ARTIFACT_DIR, path.basename(outputVideo!.name));
      await writeFile(videoPath, bytes);

      const media = await probeMedia(videoPath, targets.ffprobePath);
      const mediaCheck = checkMedia(media, {
        durationSec: SOURCE.durationSec,
        durationToleranceSec: 2,
        width: 1280,
        height: 720,
        requireAudio: true,
      });
      expect(
        mediaCheck.ok,
        `G6 视频结构校验失败：\n${mediaCheck.failures.join("\n")}`,
      ).toBe(true);

      console.log("");
      console.log("── G6 产物结构 ──────────────────────────────");
      console.log(`文件          : ${videoPath}`);
      console.log(`字节数        : ${bytes.byteLength}`);
      console.log(`时长          : ${media.durationSec.toFixed(2)}s（源 ${SOURCE.durationSec}s）`);
      console.log(`分辨率/帧率   : ${media.video?.width}x${media.video?.height} / ${media.video?.fps.toFixed(2)}fps`);
      console.log(`编码/音轨     : ${media.video?.codec} / ${media.audio.length} 条`);
      console.log("──────────────────────────────────────────────");

      // ── G5/G7：交付物与账本 ────────────────────────────────────────
      // done 之后 worker 可能还占着 active 几秒，直接读会被误判成孤儿任务
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
        artifacts: [
          { name: outputVideo!.name, sizeBytes: bytes.byteLength, kind: "video" as const },
        ],
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
        const cancelled = await cancelRun(page, runId).catch(() => false);
        console.log(`清理任务 ${runId}: ${cancelled ? "已取消" : "无需取消或取消失败"}`);
      }
      for (const [label, id] of [
        ["源视频", video.cloudFileId],
        ["水印图片", watermark.cloudFileId],
      ] as const) {
        const removed = await deleteAgentFile(page, id).catch(() => false);
        console.log(`清理${label} ${id}: ${removed ? "成功" : "失败（需人工确认）"}`);
        if (!removed) {
          test.info().annotations.push({
            type: "cleanup",
            description: `${label}未清理：${id}`,
          });
        }
      }
    }
  });
});

/** 优先选视频产物（mp4/mov/webm），跳过音轨、缩略图等中间产物 */
function pickVideoArtifact(artifacts: RunArtifact[]): RunArtifact | undefined {
  return artifacts.find(
    (a) => a.url && (/\.(mp4|mov|webm)$/i.test(a.name) || a.kind === "video"),
  );
}
