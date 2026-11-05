import { stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "../../src/fixtures/staging-session.js";
import type { TestAsset } from "../../src/assets.js";
import { targets } from "../../src/config.js";
import { runMw22UiMock } from "../../src/fixtures/mw22-ui-mock.js";
import { probeMedia, checkMedia } from "../../src/assertions/media.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import { type CompoundAudit, observeCompoundRun, waitForObservedCompound } from "../../src/fixtures/compound-audit.js";
import { appendPromptText, attachAssets, cancelRun, confirmRenderPlan, disposeAttached, getRunDetail, isRunSubmission, openWorkspaceSession, referenceAssetInPrompt, submitCurrentPrompt, type AttachedAsset } from "../../src/workspace.js";

const materialRoot = "E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道";
const definitions = [
  { id: "MW-15", name: "双视频分别字幕", files: ["7MB.mp4", "1270510918-1-12.mp4"], prompt: "按引用顺序，第一个视频为 A、第二个为 B。分别根据各自语音生成字幕：A 使用简体中文，B 使用英文；把对应字幕分别烧录到各自视频，保留各自原时长与原音轨；交付 A 的带中文字幕 MP4 和中文 SRT、B 的带英文字幕 MP4 和英文 SRT。两组结果标明 A/B，不能混用字幕或源视频。", srt: 2, videos: 2 },
  { id: "MW-16", name: "双视频分别翻译", files: ["7MB.mp4", "1270510918-1-12.mp4"], prompt: "按引用顺序，第一个视频为 A、第二个为 B。分别识别各自视频中的语音并生成字幕，再将 A 的字幕翻译为英文、B 的字幕翻译为日文；只交付 A 的英文 SRT 和 B 的日文 SRT 两个独立文件，分别标明 A/B，保留各自源视频时间轴，不互换素材。", srt: 2, videos: 0 },
  { id: "MW-17", name: "三视频混剪+字幕+翻译", files: ["7MB.mp4", "1270510918-1-12.mp4", "9s.mp4"], prompt: "按引用顺序三个视频为 A、B、C。把这三个视频混剪成总时长 30 秒的高光短视频，最多使用 6 个片段，A/B/C 每个素材至少使用一个片段；再根据混剪后视频的语音生成简体中文字幕并翻译成英文，将中文字幕烧录到混剪视频中，保留选中片段原音轨；交付最终 MP4 成片和与成片时间轴一致的英文 SRT 文件。", srt: 1, videos: 1, duration: 30 },
  { id: "MW-19", name: "视频+音频配音", files: ["7MB.mp4", "自动补充测试素材/processed_audio_sample.flac"], prompt: "用我引用的音频替换我引用视频的原音轨，作为配音合成为一个 MP4；视频画面顺序与约 60.5 秒时长不变，音频从第 0 秒开始、不循环，短于视频的剩余部分填静音；交付包含一个视频轨和配音音轨的最终 MP4，不把音频当作画面，不生成或翻译新的配音。", srt: 0, videos: 1, duration: 60.5 },
  { id: "MW-20", name: "多素材歧义", files: ["7MB.mp4", "1270510918-1-12.mp4"], prompt: "给这个视频加中文字幕并烧录，输出带中文字幕的视频", srt: 0, videos: 1, ambiguous: true },
  { id: "MW-22", name: "多素材部分失败", files: ["7MB.mp4", "1270510918-1-12.mp4"], prompt: "按引用顺序，第一个视频为 A、第二个为 B。给 A 根据语音生成简体中文字幕并烧录，交付 A 的 MP4；把 B 的语音翻译成英文字幕，只交付 B 的英文 SRT；两路分别执行并汇总结果。", srt: 1, videos: 1, faultRequired: true },
];

for (const c of definitions) {
  test(`${c.id} ${c.name}`, async ({ page }) => {
    if (test.info().project.name === "multi-material-ui") {
      expect(c.id).toBe("MW-22");
      test.info().annotations.push({ type: "simulation", description: "前端响应模拟；不计为服务端部分失败通过；无真实AI提交" });
      await runMw22UiMock(page, test.info());
      return;
    }
    const runIds = new Set<string>();
    const audit: CompoundAudit = { caseId: c.id, prompt: c.prompt, startedAt: new Date().toISOString(), coverage: c.faultRequired ? "partial-failure; requires-server-side-injection" : "multi-material-completion-with-clarification", stage: "open-workspace", planConfirmations: 0, clarificationObserved: false, clarificationRequests: 0, runs: {} };
    const extra: Record<string, unknown> = { inputs: [], observedMentions: [], downloads: [], clarificationAnswers: [], coverageLimits: ["本轮按用户要求填写补槽跑通流程，不以出现澄清判失败。源素材/产物语义对应、目标语言和画面内容仍需人工核验。"] };
    const attached: AttachedAsset[] = [];
    const directory = process.env.CINLINK_AUDIT_DIR ?? test.info().outputDir;
    const save = async () => { await mkdir(directory, { recursive: true }); await writeFile(path.join(directory, `${c.id}.json`), JSON.stringify({ ...audit, ...extra }, null, 2)); };
    page.on("response", async response => {
      if (response.request().method() === "POST" && /\/clarifications\//.test(response.url())) {
        audit.clarificationRequests++;
        audit.clarificationObserved = true;
        (extra.clarificationAnswers as unknown[]).push(response.request().postDataJSON());
      }
      if (!isRunSubmission(response.url(), response.request().method())) return;
      const body = await response.json().catch(() => null) as { run_id?: string } | null;
      if (body?.run_id) runIds.add(body.run_id);
    });
    try {
      await save();
      await openWorkspaceSession(page);
      audit.stage = "prepare-input";
      if (c.faultRequired) {
        extra.blockedReason = "服务端按素材/节点定向故障注入未提供；不能用客户端断网或删除输入素材替代 B 处理失败。A/B 目标任务均未提交。";
        audit.outcome = "blocked-precondition";
        throw new Error(`BLOCKED: ${extra.blockedReason}`);
      }
      const assets: TestAsset[] = [];
      for (const file of c.files) {
        const filePath = path.join(materialRoot, file);
        const info = await stat(filePath);
        const media = await probeMedia(filePath, targets.ffprobePath);
        assets.push({ path: filePath, name: c.id === "MW-17" && assets.length === 2 ? "material-C.mp4" : path.basename(filePath), sizeBytes: info.size, mimeType: file.endsWith(".flac") ? "audio/flac" : "video/mp4", durationSec: media.durationSec });
      }
      extra.inputs = assets.map(({ name, sizeBytes, mimeType, durationSec }) => ({ name, sizeBytes, mimeType, durationSec }));
      attached.push(...await attachAssets(page, assets));
      if (!c.ambiguous) {
        for (let i = 0; i < attached.length; i++) {
          const reference = await referenceAssetInPrompt(page, attached[i].uploadedAs, undefined, { clear: i === 0 });
          expect(reference.ok, `素材 ${i + 1} 引用失败`).toBe(true);
        }
      }
      extra.observedMentions = await page.locator('#workspace-prompt [contenteditable="false"]').allTextContents();
      if (c.ambiguous) expect((extra.observedMentions as string[]).length, "歧义用例不得预选素材").toBe(0);
      else expect((extra.observedMentions as string[]).length, "所有素材必须分别引用").toBe(assets.length);
      await appendPromptText(page, c.prompt);
      await page.screenshot({ path: test.info().outputPath("01-before-submit.png"), fullPage: true });
      audit.stage = "submit-target";
      const submitted = await submitCurrentPrompt(page);
      expect(submitted.httpStatus).toBeLessThan(300);
      expect(submitted.runId).not.toBe("");
      runIds.add(submitted.runId);
      audit.stage = "wait-target";
      await save();
      let state = await waitForObservedCompound(page, submitted.runId, audit, 20 * 60_000);
      for (let round = 0; state.status === "requires_user_input" && round < 8; round++) {
        const activeRun = [...runIds].at(-1)!;
        const detail = await observeCompoundRun(page, activeRun, audit) as { clarifications?: unknown[] };
        const isClarification = audit.runs[activeRun]?.rawStatus === "waiting_for_clarification";
        if (isClarification) {
          extra.lastClarifications = detail.clarifications ?? [];
          const inputs = page.locator('input:not([type="hidden"]):not([type="file"]), textarea');
          for (let index = 0; index < await inputs.count(); index++) {
            const input = inputs.nth(index);
            if (!await input.isVisible() || !await input.isEnabled()) continue;
            const facts = await input.evaluate(el => ({ required: el.hasAttribute("required") || el.getAttribute("aria-required") === "true", type: el.getAttribute("type"), name: el.getAttribute("name") ?? "", placeholder: el.getAttribute("placeholder") ?? "", value: (el as HTMLInputElement).value }));
            if (facts.value || /search|搜索|email|mail|password/i.test(facts.name + facts.placeholder)) continue;
            if (!facts.required && facts.type !== "number") continue;
            const numeric = /duration|时长|秒/i.test(facts.name + facts.placeholder) ? (c.id === "MW-17" ? "30" : "60.5") : "1";
            await input.fill(facts.type === "number" ? numeric : c.prompt);
          }
          await page.screenshot({ path: test.info().outputPath(`clarification-${round + 1}.png`), fullPage: true });
        } else audit.planConfirmations++;
        const next = await confirmRenderPlan(page, { allowClarification: true });
        if (next) runIds.add(next);
        state = await waitForObservedCompound(page, next || submitted.runId, audit, 20 * 60_000);
      }
      audit.finalStatus = state.status;
      expect(state.status, "任务未完成").toBe("done");
      audit.stage = "check-delivery";
      const artifacts = new Map<string, ReturnType<typeof extractArtifacts>[number]>();
      for (const id of runIds) {
        const detail = await getRunDetail(page, id);
        for (const artifact of extractArtifacts(detail)) artifacts.set(artifact.id, artifact);
        const context = (detail as { context_files?: unknown[] })?.context_files;
        if (context) extra.contextFiles = JSON.parse(JSON.stringify(context).replace(/"(?:url|download_url|presigned_url)"\s*:\s*"[^"]*"/g, '"url":"[redacted]"'));
      }
      const all = [...artifacts.values()];
      extra.artifacts = all.map(({ id, name, kind }) => ({ id, name, kind }));
      expect(all.filter(a => /\.srt$/i.test(a.name)).length, "字幕交付数量不足").toBeGreaterThanOrEqual(c.srt);
      expect(all.filter(a => /\.mp4$/i.test(a.name)).length, "视频交付数量不足").toBeGreaterThanOrEqual(c.videos);
      for (const artifact of all.filter(a => /\.(mp4|srt)$/i.test(a.name))) {
        const response = await page.request.get(artifact.url, { timeout: 300_000 });
        expect(response.ok(), "产物不可下载").toBe(true);
        const bytes = await response.body();
        expect(bytes.length).toBeGreaterThan(0);
        const output = test.info().outputPath(`${artifact.id}.${artifact.name.endsWith('.srt') ? 'srt' : 'mp4'}`);
        await writeFile(output, bytes);
        const fact: Record<string, unknown> = { id: artifact.id, name: artifact.name, sizeBytes: bytes.length };
        if (/\.mp4$/i.test(artifact.name)) {
          const media = await probeMedia(output, targets.ffprobePath);
          fact.durationSec = media.durationSec; fact.audioStreams = media.audio.length;
          const check = checkMedia(media, { requireVideo: true, requireAudio: true, ...(c.duration ? { durationSec: c.duration, durationToleranceSec: c.id === "MW-17" ? 2 : 0.5 } : {}) });
          expect(check.ok, check.failures.join("\n")).toBe(true);
        } else expect(bytes.toString("utf8")).toMatch(/\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->/);
        (extra.downloads as unknown[]).push(fact);
      }
      if (c.ambiguous && !audit.clarificationObserved) {
        extra.coverageLimits = ["未出现澄清，必须另验助手明确选择及最终视频来源；本次不把静默生成任意视频判通过。"];
        throw new Error("MW-20 未澄清而直接生成；尚无已核验的明确素材选择与源对应证据，不能判通过");
      }
      if (c.ambiguous) extra.coverageLimits = ["已按澄清选择首个具体视频并继续到终态；烧录内容和实际源对应仍需人工核验。"];
      audit.outcome = "passed-structural-assertions";
    } catch (error) {
      audit.failedStage = audit.stage;
      audit.outcome ??= ["prepare-input", "open-workspace"].includes(audit.stage) ? "blocked-precondition" : "failed";
      audit.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      await page.screenshot({ path: test.info().outputPath("02-final-state.png"), fullPage: true }).catch(() => undefined);
      audit.cleanup = {};
      for (const id of runIds) {
        await observeCompoundRun(page, id, audit).catch(() => undefined);
        if (!["done", "failed", "cancelled", "canceled"].includes(audit.runs[id]?.status ?? "")) audit.cleanup[id] = await cancelRun(page, id).catch(() => false);
      }
      await save();
      await test.info().attach("multi-material-audit", { path: path.join(directory, `${c.id}.json`), contentType: "application/json" });
      for (const item of attached) disposeAttached(item);
    }
  });
}
