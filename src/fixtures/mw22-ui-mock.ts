import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import type { Page, TestInfo } from "@playwright/test";
import { expect } from "@playwright/test";
import { targets } from "../config.js";
import { createSyntheticVideo } from "./media-factory.js";

const CONVERSATION = "00000000-0022-4000-8000-000000000022";
const RUN = "run_v2_mw22_ui_mock";
const FILE_A = "file_cloud_mw22_ui_mock_a";
const FILE_B = "file_cloud_mw22_ui_mock_b";
const OUTPUT_A = "file_cloud_mw22_ui_mock_a_result";
const NAME_A = "A-MW22-subtitled.mp4";
const ERROR = "MW22_UI_MOCK_TRANSLATION_FAILURE";

/** Product UI with intercepted responses only. Never submits a real AI task. */
export async function runMw22UiMock(page: Page, info: TestInfo): Promise<void> {
  const samplePath = await createSyntheticVideo({ outPath: info.outputPath("mock-A-fixture.mp4"), durationSec: 1, width: 160, height: 90 });
  const sample = await readFile(samplePath);
  const origin = new URL(targets.studioBase).origin;
  const mediaUrl = `${origin}/__mw22_ui_mock/A-result.mp4`;
  let phase: "b-running" | "b-failed" = "b-running";
  const requests: Array<{ method: string; path: string; phase: string }> = [];
  const blocked: Array<{ method: string; path: string }> = [];
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const now = "2026-11-03T12:00:00.000Z";
  const source = (id: string, name: string) => ({ file_id: id, kind: "video", name, facts: { duration_sec: "60.5", has_audio: "true" } });
  const resultA = { file_id: OUTPUT_A, name: NAME_A, kind: "video", plan_id: "A_mp4", group_id: "A",
    facts: { file_id: OUTPUT_A, duration_sec: "1", has_audio: "true", mime_type: "video/mp4", size_bytes: String(sample.length), source_file_id: FILE_A } };
  const plan = () => [
    { node_id: "A_mp4:burn_subtitles", plan_id: "A_mp4", group_id: "A", step: "burn_subtitles", tool: "burn_subtitles", tool_name: "burn_subtitles", workflow: "subtitle", step_name: "A 中文字幕烧录", step_index: 0, status: "done", tool_call_id: "call_mw22_mock_a", arguments: {}, result_files: [resultA], input_media_context: { video_files: [source(FILE_A, "A.mp4")] }, error: null },
    { node_id: "B_srt:translate_subtitle", plan_id: "B_srt", group_id: "B", step: "translate_subtitle", tool: "translate_subtitle", tool_name: "translate_subtitle", workflow: "translation", step_name: "B 英文字幕翻译", step_index: 1, status: phase === "b-failed" ? "failed" : "running", tool_call_id: "call_mw22_mock_b", arguments: { target_language: "en" }, result_files: [], input_media_context: { video_files: [source(FILE_B, "B.mp4")] }, error: phase === "b-failed" ? { code: ERROR, message: "B 字幕翻译失败（前端模拟）" } : null },
  ];
  const messages = () => [
    { id: "message_mw22_ui_user", role: "user", text: "[MW-22 前端模拟] 给 A 烧录中文字幕，给 B 生成英文 SRT，两路分别执行并汇总。", files: [source(FILE_A, "A.mp4"), source(FILE_B, "B.mp4")], result_files: [], job_id: RUN, timestamp: "2026-11-03T11:59:59.000Z", updated_at: now, status: "done", ext: {} },
    { id: "message_mw22_ui_assistant", conversation_id: CONVERSATION, role: "assistant", text: phase === "b-failed" ? `前端模拟结果：A 成功，B 失败。A 成片仍可下载；B 翻译错误：${ERROR}。汇总：1 成功，1 失败。` : "前端模拟：A 已成功，B 翻译处理中。", status: phase === "b-failed" ? "done" : "running", job_id: RUN, timestamp: now, updated_at: phase === "b-failed" ? "2026-11-03T12:00:01.000Z" : now, intention: "MW-22 前端模拟", planning_summary: "A/B 独立处理", plan: plan(), result_files: [resultA], files: [], ext: {}, clarifications: [], intent_fully_satisfied: false, task_parameters: {}, error_code: null, error_msg: null },
  ];
  const summary = { conversation_id: CONVERSATION, title: "MW-22 UI MOCK · A成功 / B失败", status: "active", project_id: "", project_name: "", created_at: now, updated_at: now };
  const conversation = () => ({ ...summary, metadata: { source: "web", web_workspace: "true" }, messages: messages(), message_count: 2, messages_has_more: false });
  // A finite route.fulfill SSE body closes before the app finishes hydrating.
  // Keep this browser-only stream open so the real UI can load its mocked snapshot.
  await page.addInitScript(({ id }) => {
    const fetchOriginal = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (new URL(url, location.href).pathname === `/runtime-api/v1/conversations/${id}/sse`) {
        let heartbeat: ReturnType<typeof setInterval>;
        let stop: () => void;
        const stream = new ReadableStream({
          start(controller) {
            let closed = false;
            const message = (event: Event) => controller.enqueue(new TextEncoder().encode(`event: conversation\ndata: ${JSON.stringify((event as CustomEvent).detail)}\n\n`));
            window.addEventListener("__mw22_mock_message", message);
            stop = () => {
              if (closed) return;
              closed = true; clearInterval(heartbeat);
              window.removeEventListener("__mw22_mock_message", message);
              controller.close();
            };
            const ping = () => controller.enqueue(new TextEncoder().encode(": MW22 UI mock heartbeat\n\n"));
            ping(); heartbeat = setInterval(ping, 5_000);
            init?.signal?.addEventListener("abort", stop, { once: true });
          },
          cancel() { stop(); },
        });
        return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
      }
      return fetchOriginal(input, init);
    };
  }, { id: CONVERSATION });
  await page.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname;
    const method = request.method();
    // Remote web fonts are irrelevant to this behavior check; use browser fallbacks.
    if (request.resourceType() === "font") { await route.abort(); return; }
    if (url.origin === origin && path === "/__mw22_ui_mock/A-result.mp4") {
      await route.fulfill({ status: 200, contentType: "video/mp4", body: sample,
        headers: url.searchParams.get("disposition") === "attachment" || url.searchParams.has("download") ? { "Content-Disposition": `attachment; filename="${NAME_A}"` } : {} });
      return;
    }
    const api = /^\/(platform-api|runtime-api|studio-api|cloud-tool-api|cloud-tool-executor|__platform|__orchestrator|__web_api|v1|api)(\/|$)/.test(path);
    if (method === "GET" && (path.startsWith("/platform-api/v1/i18n/") || !api && (["document", "script", "stylesheet", "image", "font"].includes(request.resourceType()) || /\.(png|svg|webp|woff2?|css|js)$/.test(path)))) {
      await route.continue(); // Only the deployed product's static UI is real.
      return;
    }
    requests.push({ method, path, phase });
    const fulfill = async (body: unknown, status = 200) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    if (path.endsWith("/auth/refresh")) { await fulfill({ detail: "UI mock has no real session" }, 401); return; }
    if (path === "/platform-api/v1/me") {
      await fulfill({ user_id: "user_mw22_ui_mock", email: "mw22-ui@example.invalid", preferred_language: "en", used_features: [], pricing: [], ledger: [], api_keys: [], account: { account_id: "acct_mw22_ui_mock", label: "MW22 UI MOCK", balance_cents: 100000, currency: "usd", status: "active" }, subscription: { status: "active", plan_name: "CinLink Pro" } }); return;
    }
    if (path === "/platform-api/v1/auth/validate") {
      await fulfill({ valid: true, user: { user_id: "user_mw22_ui_mock", email: "mw22-ui@example.invalid", display_name: "MW22 UI MOCK", email_verified: true, preferred_language: "en", used_features: [] }, account: { account_id: "acct_mw22_ui_mock", label: "MW22 UI MOCK", balance_cents: 100000, currency: "usd", status: "active" }, pricing: [], subscription: { status: "active", plan_name: "CinLink Pro" } }); return;
    }
    if (path === "/runtime-api/v1/projects") { await fulfill([]); return; }
    if (path === "/runtime-api/v1/conversations") { await fulfill({ items: [summary], total: 1, has_more: false, next_offset: null }); return; }
    if (path === `/runtime-api/v1/conversations/${CONVERSATION}`) { await fulfill(conversation()); return; }
    if (path === `/runtime-api/v1/conversations/${CONVERSATION}/messages`) { await fulfill({ messages: messages(), has_more: false }); return; }
    if (path.endsWith("/sse") || path.endsWith("/events")) { await route.fulfill({ status: 200, contentType: "text/event-stream", body: "retry: 60000\n\n" }); return; }
    if (path.includes(OUTPUT_A) && path.endsWith("/url") || path.endsWith("/files") && url.searchParams.get("file_id") === OUTPUT_A) {
      const disposition = url.searchParams.get("disposition") || "inline";
      // Browser-native fixture download avoids Chrome cancelling an intercepted navigation.
      const downloadUrl = `data:video/mp4;base64,${sample.toString("base64")}`;
      await fulfill({ file_id: OUTPUT_A, url: disposition === "attachment" ? downloadUrl : mediaUrl, download_url: downloadUrl, filename: NAME_A, name: NAME_A }); return;
    }
    blocked.push({ method, path });
    // Fail closed: no API, task submission, analytics or other fetch is sent upstream.
    await fulfill(method === "GET" ? {} : { mocked: true });
  });
  const audit: Record<string, unknown> = { caseId: "MW-22", mode: "ui-response-mock", coverage: "A/B result presentation only", serverFailureVerified: false, realAiTasksSubmitted: 0, cloudCodeChanged: false, fixtureVideoSynthetic: true, mockRunId: RUN, mockConversationId: CONVERSATION };
  audit.sseMockedInBrowser = true;
  const screenshot = async (name: string) => page.screenshot({ path: info.outputPath(name), fullPage: true, timeout: 10_000 });
  try {
    await page.goto(`${origin}/c/${CONVERSATION}`, { waitUntil: "domcontentloaded" });
    const assistant = page.getByRole("article").filter({ has: page.getByRole("button", { name: "Burn subtitles", exact: true }) });
    await expect(assistant.locator("video")).toBeVisible({ timeout: 30_000 });
    await expect(assistant.locator("video")).toHaveAttribute("aria-label", NAME_A);
    await expect(assistant.locator('[data-step-status="done"]')).toHaveCount(1);
    await expect(assistant.locator('[data-step-status="running"]')).toHaveCount(1);
    await expect(assistant.getByRole("button", { name: "Download", exact: true })).toBeVisible();
    await screenshot("01-A-ready-B-running.png");
    phase = "b-failed";
    await page.evaluate((message) => window.dispatchEvent(new CustomEvent("__mw22_mock_message", { detail: message })), messages()[1]);
    await expect(assistant.locator("video")).toBeVisible({ timeout: 30_000 });
    await expect(assistant.locator('[data-step-status="done"]')).toHaveCount(1);
    const failedStep = assistant.locator('[data-step-status="failed"]');
    await expect(failedStep).toHaveCount(1);
    await expect(failedStep).toContainText("Translate subtitles");
    await expect(failedStep.getByRole("alert")).toHaveText("B 字幕翻译失败（前端模拟）");
    await assistant.getByRole("button", { name: "Translate subtitles", exact: true }).click();
    await expect(page.getByText(ERROR, { exact: false }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/1 成功，1 失败/).first()).toBeVisible();
    await screenshot("02-A-retained-B-failed.png");
    await writeFile(info.outputPath("ui-snapshot.txt"), await page.locator("body").ariaSnapshot());
    const downloadButton = page.getByRole("button", { name: /^(Download|下载)$/i }).first();
    const [download] = await Promise.all([page.waitForEvent("download", { timeout: 20_000 }), downloadButton.click({ timeout: 10_000 })]);
    const downloaded = info.outputPath("A-after-B-failure.mp4");
    await download.saveAs(downloaded);
    const bytes = await readFile(downloaded);
    expect(createHash("sha256").update(bytes).digest("hex"), "B失败后A下载内容应保持完整").toBe(createHash("sha256").update(sample).digest("hex"));
    expect(requests.filter((r) => r.method === "POST" && /\/turns$|\/mcp$/.test(r.path)), "前端模拟不得提交真实或模拟AI任务").toHaveLength(0);
    audit.outcome = "passed-ui-mock-only";
    audit.aDownloadBytes = bytes.length;
  } catch (error) {
    audit.outcome = "failed-ui-mock";
    audit.error = error instanceof Error ? error.message : String(error);
    await screenshot("failure.png").catch(() => undefined);
    await writeFile(info.outputPath("ui-snapshot.txt"), await page.locator("body").ariaSnapshot()).catch(() => undefined);
    throw error;
  } finally {
    audit.mockedRequests = requests;
    audit.pageErrors = pageErrors;
    audit.otherRequestsBlocked = blocked;
    await writeFile(info.outputPath("MW-22-ui-mock.json"), JSON.stringify(audit, null, 2));
    await info.attach("MW-22-ui-mock-audit", { path: info.outputPath("MW-22-ui-mock.json"), contentType: "application/json" });
  }
}
