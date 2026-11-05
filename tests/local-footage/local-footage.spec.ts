import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { expect, test, type Browser, type BrowserContext, type Page, type Response } from "@playwright/test";
import { credentials, optionalStorageState, targets } from "../../src/config.js";
import { assertWorkspaceOpened } from "../../src/staging.js";
import { confirmRenderPlan, isRunSubmission } from "../../src/workspace.js";

const mediaRoot = process.env.CINLINK_FOOTAGE_MEDIA_ROOT
  || "E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道/素材查找";
const reportRoot = path.resolve(process.env.CINLINK_FOOTAGE_REPORT_DIR || "reports/local-footage");
const files = [
  { name: "01_60秒_单镜头_仅背景音乐.mp4", sha: "f9c151666ebd5f1a9fc15345f4fdea9b2b83e4c635e092df242fc3dc13a5e9cc", duration: 60 },
  { name: "02_60秒_单镜头_仅人声.mp4", sha: "78001c5c4eeb24fbe3eb15f4e0510a95eea924af8a5458c71dde14ca6f445234", duration: 60 },
  { name: "03_60秒_单镜头_无音轨.mp4", sha: "7f60c019bf4622896af1385925aa63cb1ecc78e2cfe714840336088d067f5811", duration: 60 },
  { name: "04_300秒_20镜头_有人声.mp4", sha: "4cb12ed3abb9129e7f6da2dad6bb72497ba2e08c8220524b3b3a528c12c759a1", duration: 300 },
];
const definitions = [
  { id: "LF-01", title: "四素材分析与机器人片段检索", indices: [0, 1, 2, 3], target: 3,
    prompt: "找出画面里出现黄色机器人，旁边有黑板和桌子的片段。", start: 90, end: 105 },
  { id: "LF-02", title: "音乐类原片视觉检索仙人掌", indices: [0], target: 0,
    prompt: "找出绿色盆栽仙人掌的画面，附近有橙色兔子和穿蓝衣服的男孩。", start: 0, end: 60 },
  { id: "LF-03", title: "有语音原片视觉检索蓝衣男孩", indices: [1], target: 1,
    prompt: "找出穿蓝色上衣、深色裤子的卡通男孩，旁边有绿色盆栽仙人掌的片段。", start: 0, end: 60 },
];

let browser: Browser;
let context: BrowserContext;
let page: Page;
let external = false;
let batchSourceProject = process.env.CINLINK_FOOTAGE_SOURCE_PROJECT;
const execute = promisify(execFile);
function sanitized(value: unknown): any {
  if (Array.isArray(value)) return value.map(sanitized);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value)
    .filter(([k]) => !/url|token|cookie|authorization|signature/i.test(k))
    .map(([k, v]) => [k, sanitized(v)]));
  return typeof value === "string" ? value.replace(/https?:\/\/[^\s"<>]+/g, "[URL redacted]") : value;
}
function objects(value: any): any[] {
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(objects)];
}
async function browserJSON(url: string, method = "GET", body?: unknown): Promise<{ status: number; body: any }> {
  // CDP APIRequestContext does not inherit all of an existing context's auth.
  // Use the real browser's authenticated fetch, the same cookies as the UI.
  return page.evaluate(async ({ url, method, body }) => {
    const response = await fetch(url, { method, credentials: "include",
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    return { status: response.status, body: await response.json() };
  }, { url, method, body });
}
async function openSearchMode() {
  const button = page.locator('[data-workspace-action-id="local-material"]');
  if (await button.getAttribute("aria-pressed") !== "true") await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
}

test.beforeAll(async ({ playwright }) => {
  await mkdir(reportRoot, { recursive: true });
  const projectCheckpoint = path.join(reportRoot, "source-project.json");
  if (!batchSourceProject && existsSync(projectCheckpoint)) {
    batchSourceProject = JSON.parse(await readFile(projectCheckpoint, "utf8")).projectId;
  }
  const endpoint = process.env.CINLINK_FOOTAGE_CDP_ENDPOINT;
  external = Boolean(endpoint);
  if (endpoint) {
    if (!/^http:\/\/(?:127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(endpoint)) throw new Error("仅允许连接本机测试浏览器");
    browser = await playwright.chromium.connectOverCDP(endpoint);
    const match = browser.contexts().flatMap(c => c.pages().map(p => ({ context: c, page: p })))
      .filter(item => item.page.url().startsWith(targets.webBase));
    expect(match, "必须只有一个已打开的目标测试页").toHaveLength(1);
    ({ context, page } = match[0]);
  } else {
    const executablePath = process.env.CINLINK_FOOTAGE_CHROME
      || (existsSync("C:/Program Files/Google/Chrome/Application/chrome.exe")
        ? "C:/Program Files/Google/Chrome/Application/chrome.exe" : undefined);
    browser = await playwright.chromium.launch({ headless: false, ...(executablePath ? { executablePath } : { channel: "chrome" }) });
    context = await browser.newContext({ storageState: optionalStorageState(), viewport: { width: 1440, height: 1000 } });
    page = await context.newPage();
  }
  page.setDefaultTimeout(30_000);
});

test.afterAll(async () => {
  if (!context) return;
  const cookies = await context.cookies().catch(() => []);
  if (cookies.some(c => c.domain.includes("cinlink.ai") && c.httpOnly && c.secure && /access_token|refresh_token/.test(c.name))) {
    await context.storageState({ path: credentials.storageStatePath });
  }
  // A CDP run leaves the single agent-owned window available for failure inspection.
  if (!external) await browser?.close();
});

for (const definition of definitions) test(`${definition.id} ${definition.title}`, async ({}, info) => {
  const folder = path.resolve(`.tmp-footage/${path.basename(reportRoot)}/${definition.id}`);
  await mkdir(folder, { recursive: true });
  const audit: any = { caseId: definition.id, startedAt: new Date().toISOString(), headed: true,
    stage: "fixture", prompt: definition.prompt, expectedFile: files[definition.target].name,
    sources: [], events: [], screenshots: [], coverageLimits: ["固定素材以原片正/负对照及RGB模板校验机器人/仙人掌/蓝衣男孩；不代表通用视觉语义质量。"] };
  const pending = new Set<Promise<void>>();
  const searchResponses: Array<{ status: number; body: any }> = [];
  const runSubmissions: Array<{ runId: string; conversationId: string; status: number }> = [];
  const save = async () => {
    await writeFile(path.join(reportRoot, `${definition.id}.json`), JSON.stringify(audit, null, 2));
  };
  const stage = async (value: string) => { audit.stage = value; console.log(`${definition.id}: ${value}`); await save(); };
  const shot = async (name: string) => {
    const destination = path.join(reportRoot, `${definition.id}-${name}.png`);
    await page.screenshot({ path: destination, fullPage: true, timeout: 15_000 });
    audit.screenshots.push(path.basename(destination)); await save();
    await info.attach(name, { path: destination, contentType: "image/png" });
  };
  const listener = (response: Response) => {
    const pathname = new URL(response.url()).pathname;
    if (!/\/projects\/|\/project-assets\/|\/analysis-requests|\/material-search|\/agent\/|\/conversations\//.test(pathname)) return;
    const task = (async () => {
      const request = response.request();
      const type = response.headers()["content-type"] || "";
      let body: any;
      if (/json/.test(type)) body = await response.json().catch(() => null);
      else if (/event-stream/.test(type) && /materials\/search/.test(pathname)) {
        const text = await response.text().catch(() => "");
        body = text.split(/\r?\n\r?\n/).map(block => {
          const data = block.split(/\r?\n/).filter(line => line.startsWith("data:")).map(line => line.slice(5).trim()).join("\n");
          try { return JSON.parse(data); } catch { return data || null; }
        }).filter(Boolean);
      }
      const record = { at: new Date().toISOString(), path: pathname, method: request.method(), status: response.status(),
        request: sanitized(request.postDataJSON?.bind(request) ? (() => { try { return request.postDataJSON(); } catch { return null; } })() : null), body: sanitized(body) };
      audit.events.push(record);
      if (isRunSubmission(response.url(), request.method())) {
        const nodes = objects(body);
        const runId = nodes.map(n => n.run_id || n.job_id).find(v => typeof v === "string" && v);
        const conversationId = pathname.match(/\/conversations\/([^/]+)\/turns$/)?.[1]
          || nodes.map(n => n.conversation_id).find(v => typeof v === "string" && v);
        if (runId && conversationId) runSubmissions.push({ runId, conversationId, status: response.status() });
      }
      if (request.method() === "POST" && /materials\/search|material-search/.test(pathname)) searchResponses.push({ status: response.status(), body });
      if (request.method() !== "GET" || response.status() >= 400) console.log(`${definition.id}: ${request.method()} ${pathname} HTTP ${response.status()}`);
      await save();
    })().catch(error => { audit.observationError = sanitized(String(error)); });
    pending.add(task); void task.finally(() => pending.delete(task));
  };
  page.on("response", listener);
  try {
    for (const index of definition.indices) {
      const source = files[index], bytes = await readFile(path.join(mediaRoot, source.name));
      const sha256 = createHash("sha256").update(bytes).digest("hex");
      expect(sha256, `${source.name}必须为登记原片`).toBe(source.sha);
      await copyFile(path.join(mediaRoot, source.name), path.join(folder, source.name));
      audit.sources.push({ ...source, sha256, bytes: bytes.byteLength });
    }
    const resumeDirectory = process.env.CINLINK_FOOTAGE_RESUME_AUDIT_DIR;
    const prior = resumeDirectory && existsSync(path.join(resumeDirectory, `${definition.id}.json`))
      ? JSON.parse(await readFile(path.join(resumeDirectory, `${definition.id}.json`), "utf8")) : null;
    const resumeRun = prior?.runId && prior?.conversationId;
    if (resumeRun) {
      expect(prior.prompt).toBe(definition.prompt);
      expect(prior.sources.map((s: any) => s.sha256)).toEqual(audit.sources.map((s: any) => s.sha256));
      audit.projectId = prior.projectId;
      audit.resumedFrom = { directory: resumeDirectory, runId: prior.runId, conversationId: prior.conversationId };
      await page.goto(`${targets.webBase}/c/${prior.conversationId}`, { waitUntil: "domcontentloaded" });
      await page.locator("#workspace-prompt").waitFor({ state: "visible" });
    } else {
    const suppliedProject = batchSourceProject;
    if (suppliedProject) {
      expect(suppliedProject).toMatch(/^[a-f0-9-]{36}$/);
      const response = await browserJSON(`${targets.studioBase}/cloud-tool-api/v1/projects/${suppliedProject}/files`);
      expect(response.status, "回读本批上传的项目素材").toBe(200);
      const imported = response.body.files as any[];
      for (const source of audit.sources) {
        const match = imported.filter(f => f.relative_path === source.name && Number(f.size_bytes) === source.bytes);
        expect(match, "已上传文件名、字节数必须与原片一一对应").toHaveLength(1);
        source.fileId = match[0].file_id;
      }
      audit.importedFromProject = suppliedProject;
      if (definition.id === "LF-01") {
        expect(imported).toHaveLength(4);
        audit.projectId = suppliedProject;
        audit.projectSetup = "本轮用户通过原生目录选择器完成真实上传；本次从上传后继续，未重新上传";
      } else {
        await stage("create-isolated-project");
        await assertWorkspaceOpened(page);
        await page.locator("#workspace-new-project").click();
        await page.locator('[data-project-card="create"]').click();
        await page.locator(".workspace-project-name-dialog input").fill(`${definition.id}-${Date.now()}`);
        const created = page.waitForResponse(r => r.request().method() === "PUT"
          && /\/runtime-api\/v1\/projects\/[^/?]+$/.test(r.url()) && r.ok());
        await page.locator(".workspace-project-name-dialog button.primary").click();
        audit.projectId = new URL((await created).url()).pathname.split("/").at(-1);
        const linked = await browserJSON(`${targets.studioBase}/cloud-tool-api/v1/projects/${audit.projectId}/files`, "POST",
          { files: audit.sources.map((s: any) => ({ file_id: s.fileId, kind: "video", root_name: definition.id,
            relative_path: s.name, mime_type: "video/mp4", size_bytes: s.bytes })) });
        expect(linked.status, "新项目仅关联本例真实源片").toBe(200);
        audit.projectSetup = "新建独立项目后关联本批相同真实file_id，无模拟检索/分析、无重传";
      }
      if (new URL(page.url()).searchParams.get("project_id") !== audit.projectId) {
        await page.goto(`${targets.webBase}/?project_id=${audit.projectId}`, { waitUntil: "domcontentloaded" });
      }
      await page.locator("#workspace-prompt").waitFor({ state: "visible" });
    } else {
    const confirmation = page.locator(".workspace-project-upload-dialog");
    const resumeConfirmation = process.env.CINLINK_FOOTAGE_RESUME_CONFIRMATION === "1" && await confirmation.isVisible();
    if (!resumeConfirmation) {
      await stage("open-workspace");
      await assertWorkspaceOpened(page);
      const close = page.locator('.workspace-project-create-dialog button[aria-label="Close"],.workspace-project-create-dialog button[aria-label="关闭"]');
      if (await close.isVisible()) await close.click();
      await page.locator("#workspace-new-project").click();
      await expect(page.locator('[data-project-card="upload"]')).toBeVisible();
      await stage("native-folder-selection");
      audit.folderSelectionPath = folder; await save();
      await shot("before-folder-selection");
      console.log(`${definition.id}: 请在原生文件夹选择器选取 ${folder}，脚本等待确认页后自动继续`);
      // Real File System Access picker: no handles, responses or media are mocked.
      await page.locator('[data-project-card="upload"]').click({ noWaitAfter: true });
    } else {
      audit.resumedFromUploadConfirmation = true;
      await stage("upload-confirmation-resumed");
    }
    await expect(confirmation).toBeVisible({ timeout: 5 * 60_000 });
    // The deployed confirmation shows only root name/count, not individual filenames.
    await expect(confirmation).toContainText(new RegExp(`${definition.indices.length}\\s*(?:个文件|files)`, "i"));
    await shot("upload-confirmation");
    await stage("upload-project");
    const previous = new URL(page.url()).searchParams.get("project_id");
    await confirmation.locator("button.primary").click();
    await expect.poll(() => new URL(page.url()).searchParams.get("project_id"), { timeout: 180_000 })
      .not.toBe(previous);
    audit.projectId = new URL(page.url()).searchParams.get("project_id");
    expect(audit.projectId).toBeTruthy();
    await expect(confirmation).not.toBeVisible({ timeout: 180_000 });
    }
    if (definition.id === "LF-01") {
      batchSourceProject = audit.projectId;
      await writeFile(path.join(reportRoot, "source-project.json"), JSON.stringify({ projectId: batchSourceProject }));
    }
    }
    const projectListing = await browserJSON(`${targets.studioBase}/cloud-tool-api/v1/projects/${audit.projectId}/files`);
    expect(projectListing.status).toBe(200);
    const projectFiles = projectListing.body.files as any[];
    expect(projectFiles, "项目素材数必须精确等于本例前置，不混入其他文件").toHaveLength(audit.sources.length);
    for (const source of audit.sources) {
      const match = projectFiles.find(f => f.relative_path === source.name && Number(f.size_bytes) === source.bytes);
      expect(match, "项目必须包含本例原片").toBeTruthy();
      source.fileId = match.file_id;
      const sourceLink = await browserJSON(`${targets.studioBase}/cloud-tool-api/v1/agent/files/${source.fileId}/url?disposition=inline`);
      expect(sourceLink.status).toBe(200);
      const downloaded = await context.request.get(sourceLink.body.url);
      expect(downloaded.ok(), "上传原片必须可回读").toBe(true);
      source.cloudSha256 = createHash("sha256").update(await downloaded.body()).digest("hex");
      expect(source.cloudSha256, "云端源片必须与用户指定原文件字节一致").toBe(source.sha256);
    }
    await shot("project-sources-ready");
    if (!resumeRun) {
    await stage("analysis-prepare");
    await openSearchMode();
    await shot("before-analysis");
    const analysisConfirmation = page.locator('[role="dialog"]').filter({ has: page.locator("[data-media-analysis-file]") });
    const readyPattern = new RegExp(`${definition.indices.length}\\s*[/／]\\s*${definition.indices.length}\\s*(?:media files analyzed|媒体已分析)`, "i");
    const phase = async () => await page.locator("[data-analysis-status]").evaluateAll(els => els[0]?.getAttribute("data-analysis-status") || null);
    const ready = async () => readyPattern.test(await page.locator("body").innerText());
    const initialPhase = await phase();
    if (!await ready() && !await analysisConfirmation.isVisible() && !["scanning", "analyzing"].includes(initialPhase || "")) {
      try { await page.locator(".workspace-composer-analyze").click({ timeout: 10_000 }); }
      catch (error) { if (!["scanning", "analyzing", "awaiting"].includes((await phase()) || "")) throw error; }
    } else audit.analysisResumed = initialPhase || "ready-or-confirmation";
    const estimateDeadline = Date.now() + 10 * 60_000;
    await stage("analysis-estimating");
    while (!await ready() && !await analysisConfirmation.isVisible() && await phase() !== "analyzing" && Date.now() < estimateDeadline) {
      if (await phase() === "failed") throw new Error(`分析预处理失败：${await page.locator("body").innerText().then(t => t.slice(-1800))}`);
      await page.waitForTimeout(5000);
    }
    if (await analysisConfirmation.isVisible()) {
      await expect(analysisConfirmation.locator("[data-media-analysis-file]")).toHaveCount(definition.indices.length);
      audit.analysisConfirmation = await analysisConfirmation.innerText();
      await shot("analysis-confirmation");
      await analysisConfirmation.locator("button.primary").click();
    } else if (!await ready() && await phase() !== "analyzing") {
      throw new Error("分析预处理10分钟未收敛到费用确认或已分析就绪；未提交目标查询");
    }
    await stage("analysis-running");
    const deadline = Date.now() + 20 * 60_000;
    let last = "";
    while (Date.now() < deadline) {
      const text = await page.locator("body").innerText();
      const status = await page.locator("[data-analysis-status]").evaluateAll(els => els.map(el => ({ phase: el.getAttribute("data-analysis-status"), text: el.textContent })));
      const display = JSON.stringify(status);
      if (display !== last) { last = display; audit.analysisStatus = status; console.log(`${definition.id}: analysis ${display}`); await save(); }
      if (status.some(item => item.phase === "failed")) throw new Error(`媒体分析失败：${display}`);
      const count = definition.indices.length;
      if (new RegExp(`${count}\\s*[/／]\\s*${count}\\s*(?:media files analyzed|媒体已分析)`, "i").test(text)
        || status.some(item => item.phase === "done" || item.phase === "completed")) break;
      await page.waitForTimeout(5000);
    }
    audit.analysisPageText = sanitized((await page.locator("body").innerText()).slice(-8000));
    expect(audit.analysisStatus?.some((item: any) => ["done", "completed"].includes(item.phase))
      || new RegExp(`${definition.indices.length}\\s*[/／]\\s*${definition.indices.length}\\s*(?:media files analyzed|媒体已分析)`, "i").test(audit.analysisPageText), "分析必须就绪，不把未分析的无结果当作通过").toBe(true);
    await shot("analysis-ready");
    await stage("search");
    await openSearchMode();
    await page.locator("#workspace-prompt").fill(definition.prompt);
    await shot("search-prompt");
    await page.locator("#workspace-send").click();
    } else {
      audit.analysisPageText = prior.analysisPageText;
      expect(new RegExp(`${definition.indices.length}\\s*[/／]\\s*${definition.indices.length}\\s*(?:media files analyzed|媒体已分析)`, "i").test(prior.analysisPageText), "原执行必须有分析就绪证据").toBe(true);
      runSubmissions.push({ runId: prior.runId, conversationId: prior.conversationId, status: 200 });
      await stage("read-existing-search-no-resubmit");
    }
    await expect.poll(() => searchResponses.length + runSubmissions.length, { timeout: 180_000 }).toBeGreaterThan(0);
    await Promise.allSettled([...pending]);
    let response = searchResponses.at(-1);
    if (!response) {
      const submitted = runSubmissions.at(-1)!;
      audit.runId = submitted.runId; audit.conversationId = submitted.conversationId;
      await stage("search-agent-running");
      const deadline = Date.now() + 15 * 60_000;
      let lastStatus = "";
      let interactions = 0;
      while (Date.now() < deadline) {
        const messages = await browserJSON(`${targets.studioBase}/runtime-api/v1/conversations/${submitted.conversationId}/messages?limit=200`);
        expect(messages.status).toBe(200);
        const related = (messages.body.messages || []).filter((m: any) => m.job_id === submitted.runId);
        const assistant = related.filter((m: any) => m.role === "assistant").at(-1);
        if (assistant) {
          audit.searchMessage = sanitized(assistant);
          if (assistant.status !== lastStatus) { lastStatus = assistant.status; console.log(`${definition.id}: search run ${lastStatus} ${submitted.runId}`); await save(); }
          if (["done", "failed", "cancelled", "canceled"].includes(assistant.status)) {
            expect(assistant.status, `检索任务终态：${assistant.error_code || ""} ${assistant.error_msg || ""}`).toBe("done");
            response = { status: submitted.status, body: assistant }; break;
          }
          if (["waiting_for_confirmation", "waiting_for_clarification"].includes(assistant.status)) {
            expect(++interactions, "补槽/确认不得无限循环").toBeLessThanOrEqual(8);
            const filled: Array<{ field: string; value: string }> = [];
            for (const select of await page.locator("select:visible").all()) {
              const choices = await select.locator("option").evaluateAll(els => els.map(el => ({ value: (el as HTMLOptionElement).value, label: el.textContent || "" })));
              const target = audit.sources.find((s: any) => s.name === files[definition.target].name);
              const option = choices.find(o => o.value === target.fileId || o.label.includes(target.name));
              if (option) { await select.selectOption(option.value); filled.push({ field: "source", value: option.value }); }
            }
            for (const input of await page.locator('input:visible:not([type="file"]):not([type="password"]),textarea:visible').all()) {
              if (!await input.isEditable()) continue;
              const name = await input.evaluate(el => { const input = el as HTMLInputElement; return [input.name, input.id, input.placeholder, ...Array.from(input.labels || []).map(l => l.textContent)].join(" "); });
              if (/email|password|search conversations|搜索会话/i.test(name)) continue;
              if (/query|keyword|content|prompt|查询|关键|查找|目标/i.test(name)) {
                await input.fill(definition.prompt); filled.push({ field: name, value: definition.prompt });
              }
            }
            audit.interactions ||= [];
            audit.interactions.push({ status: assistant.status, questions: sanitized(assistant.clarifications), filled });
            await shot(`search-interaction-${interactions}`);
            const resumed = await confirmRenderPlan(page, { allowClarification: true });
            if (resumed) { submitted.runId = resumed; audit.runId = resumed; }
            await save();
          }
        }
        await page.waitForTimeout(5000);
      }
      expect(response, "检索Agent必须收敛到终态").toBeTruthy();
    }
    if (!response) throw new Error("未取得本轮检索结果");
    audit.search = sanitized(response);
    expect(response.status, "真实搜索请求应成功").toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    const targetId = audit.sources.find((s: any) => s.name === files[definition.target].name).fileId;
    const released = response.body.result_files || response.body.orchestrator_context_files || [];
    const unique = new Map<string, any>();
    for (const item of released) if (item.kind === "video") unique.set(item.file_id || item.cloud_file_id, item);
    audit.candidates = [];
    for (const [fileId, item] of unique) {
      expect(fileId, "返回文件ID必须为合法云端标识").toMatch(/^file_cloud_[\w-]+$/);
      const facts = item.facts || item.metadata || {};
      const sourceId = facts.source_file_id || item.source_file_id || fileId;
      const start = Number(facts.start_sec ?? facts.library_match_start_sec ?? (facts.start_ms == null ? NaN : Number(facts.start_ms) / 1000));
      const end = Number(facts.end_sec ?? facts.library_match_end_sec ?? (facts.end_ms == null ? NaN : Number(facts.end_ms) / 1000));
      const candidate: any = { fileId, name: item.name, sourceId, sourceName: facts.source_file_name || item.name, start, end,
        evidence: facts.summary || facts.library_match_evidence, facts: sanitized(facts) };
      const link = await browserJSON(`${targets.studioBase}/cloud-tool-api/v1/agent/files/${fileId}/url?disposition=inline`);
      expect(link.status, "真实返回的匹配短片必须可回读").toBe(200);
      const video = await context.request.get(link.body.url);
      expect(video.ok()).toBe(true);
      const clip = path.join(reportRoot, `${definition.id}-${fileId}.mp4`);
      await writeFile(clip, await video.body());
      const { stdout } = await execute("python", ["tools/local-footage/check-visual.py", "--case", definition.id,
        "--source", path.join(mediaRoot, files[definition.target].name), "--clip", clip,
        "--output", path.join(reportRoot, `${definition.id}-${fileId}-visual`)], { timeout: 120_000, maxBuffer: 1024 * 1024 });
      candidate.visual = JSON.parse(stdout);
      candidate.validSource = sourceId === targetId;
      candidate.validTime = Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start && end <= files[definition.target].duration
        && Math.min(end, definition.end) > Math.max(start, definition.start);
      const preview = page.getByLabel(String(item.name), { exact: true }).filter({ visible: true });
      await expect(preview, "每个返回短片必须在真实会话中可预览").toHaveCount(1);
      if (await preview.evaluate((el: HTMLVideoElement) => el.paused)) {
        await preview.locator("..").locator(".workspace-message-video-center").click();
      }
      await expect.poll(() => preview.evaluate((el: HTMLVideoElement) => el.currentTime), { timeout: 15_000 }).toBeGreaterThan(0.1);
      candidate.preview = await preview.evaluate((el: HTMLVideoElement) => ({ duration: el.duration, currentTime: el.currentTime,
        width: el.videoWidth, height: el.videoHeight, readyState: el.readyState, error: el.error?.code || null }));
      await shot(`preview-${audit.candidates.length + 1}`);
      await preview.evaluate((el: HTMLVideoElement) => el.pause());
      audit.candidates.push(candidate); await save();
    }
    await shot("search-results");
    expect(audit.candidates.length, "必须有实际匹配片段").toBeGreaterThan(0);
    const invalid = (predicate: (candidate: any) => boolean) => audit.candidates.filter(predicate)
      .map((c: any) => ({ name: c.name, sourceId: c.sourceId, start: c.start, end: c.end, visualMatched: c.visual.matched }));
    expect(invalid(c => !c.validSource), "不能返回其他源片冒充匹配").toHaveLength(0);
    expect(invalid(c => !c.validTime), "全部匹配片段的时间必须对应目标场景").toHaveLength(0);
    expect(invalid(c => !c.visual.matched), "实际短片必须出现查询对象，不能只用整段摘要自证匹配").toHaveLength(0);
    audit.outcome = "passed";
    await stage("preview-review");
  } catch (error) {
    audit.outcome = ["fixture", "open-workspace", "native-folder-selection", "upload-project", "create-isolated-project", "upload-confirmation-resumed"].includes(audit.stage) ? "precondition-blocked" : "failed";
    audit.error = sanitized(error instanceof Error ? error.message : String(error));
    audit.failureStage = audit.stage;
    audit.failurePageText = sanitized((await page.locator("body").innerText().catch(() => "")).slice(-14000));
    await shot("failed").catch(err => { audit.screenshotError = String(err); });
    throw error;
  } finally {
    await Promise.allSettled([...pending]);
    page.off("response", listener);
    audit.finishedAt = new Date().toISOString(); await save();
    await info.attach("audit", { path: path.join(reportRoot, `${definition.id}.json`), contentType: "application/json" });
  }
});
