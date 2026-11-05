import { expect, test } from "@playwright/test";
import * as workspace from "../../src/workspace.js";
import { targets } from "../../src/config.js";
import { createProjectSessionPair } from "../../src/fixtures/project-sessions.js";

test("同项目夹具按新建项目 ID 建立 B，并回读 A/B 归属，避免误选历史项目或非项目会话", async ({ page }) => {
  const projectId = "fresh-project";
  await page.route(`${targets.studioBase}/runtime-api/v1/projects/${projectId}`, (route) => route.fulfill({ json: { project_id: projectId } }));
  await page.route(`${targets.studioBase}/runtime-api/v1/conversations/*`, (route) => route.fulfill({
    json: { conversation_id: route.request().url().split("/").at(-1), project_id: projectId, metadata: {} },
  }));
  await page.route(targets.webBase + "/", (route) => route.fulfill({ contentType: "text/html", body: `
    <button id="workspace-new-project">项目</button>
    <button data-project-card="create">新建</button>
    <div class="workspace-project-name-dialog"><input><button class="primary" onclick="fetch('/runtime-api/v1/projects/fresh-project',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({display_name:'MW21 fixture'})}).then(()=>history.pushState({},'', '/?project_id=fresh-project'))">创建</button></div>
    <button id="workspace-composer-project-toggle">MW21 fixture</button>
    <button role="option" aria-selected="true">MW21 fixture</button>
    <button class="workspace-project-new" data-react-new-session="historical-project" onclick="document.body.dataset.selected='historical-project'">旧项目</button>
    <button class="workspace-project-new" data-react-new-session="non-project" onclick="document.body.dataset.selected='non-project'">非项目</button>
    <button class="workspace-project-new" data-react-new-session="fresh-project" onclick="document.body.dataset.selected='fresh-project';document.querySelector('#workspace-prompt').textContent='';history.pushState({},'', '/?project_id=fresh-project')">B</button>
    <div id="workspace-prompt" contenteditable="true">源会话 A</div>
  ` }));
  const pair = await createProjectSessionPair(page);
  expect(pair.projectId).toBe(projectId);
  expect(await pair.verifyConversation("conversation-A")).toBe(projectId);
  await pair.openTarget();
  expect(await page.locator("body").getAttribute("data-selected")).toBe(projectId);
  expect(await pair.verifyConversation("conversation-B")).toBe(projectId);
});

test("新会话应隔离到非项目区，不选择列表中的第一个历史项目", async ({ page }) => {
  await page.route(targets.webBase + "/", async (route) => {
    await route.fulfill({ contentType: "text/html", body: `
      <button data-workspace-new-session="historical-project"
        onclick="document.body.dataset.selected='historical-project'">旧项目</button>
      <button data-workspace-new-session="non-project"
        onclick="document.body.dataset.selected='non-project'">非项目</button>
      <div id="workspace-prompt" contenteditable="true"> </div>
    ` });
  });
  await workspace.openWorkspaceSession(page);
  expect(await page.locator("body").getAttribute("data-selected")).toBe("non-project");
});

test("新版悬停侧栏使用 data-react-new-session 创建非项目会话，找不到入口时不能静默复用旧项目", async ({ page }) => {
  await page.route(targets.webBase + "/", route => route.fulfill({ contentType: "text/html", body: `
    <button class="workspace-project-new" data-react-new-session="historical-project" style="display:none">旧项目</button>
    <span class="workspace-project-add" data-react-new-session="non-project" aria-label="New no-project session" style="display:none" onclick="document.body.dataset.selected='non-project'">非项目</span>
    <div id="workspace-prompt" contenteditable="true"></div>
  ` }));
  await workspace.openWorkspaceSession(page);
  expect(await page.locator("body").getAttribute("data-selected")).toBe("non-project");
});

test("原生select补槽选择首个具体素材后提交，并继续确认计划", async ({ page }) => {
  await page.route("**/clarifications", route => route.fulfill({ json: { ok: true } }));
  await page.route("**/confirmations", route => route.fulfill({ json: { ok: true } }));
  await page.route(targets.webBase + "/", route => route.fulfill({ contentType: "text/html; charset=utf-8", body: `
    <select id="source" onchange="document.querySelector('#submit').disabled=!this.value"><option value="">请选择</option><option value="A">A: first.mp4</option><option value="B">B: second.mp4</option></select>
    <button id="submit" disabled onclick="document.body.dataset.answer=document.querySelector('#source').value;fetch('/clarifications',{method:'POST'}).then(()=>{this.remove();document.querySelector('#plan').style.display='block'})">提交</button>
    <div class="node-plan-review__actions" id="plan" style="display:none"><button onclick="fetch('/confirmations',{method:'POST'})">Submit</button></div>
  ` }));
  await page.goto(targets.webBase + "/");
  await workspace.confirmRenderPlan(page, { allowClarification: true });
  expect(await page.locator("body").getAttribute("data-answer")).toBe("A");
});

test("恢复已受理Run保留原会话绑定，拒绝改绑和缺失ID", () => {
  workspace.restoreRunConversation("run_v2_unit_recovery", "conversation-unit-recovery");
  expect(workspace.conversationForRun("run_v2_unit_recovery")).toBe("conversation-unit-recovery");
  expect(() => workspace.restoreRunConversation("run_v2_unit_recovery", "another-conversation")).toThrow("不同会话");
  expect(() => workspace.restoreRunConversation("", "conversation-unit-recovery")).toThrow("run_id");
});

test("G2 只匹配创建 Run 的 POST，不把取消、SSE 或查询算作提交", () => {
  const matches = (workspace as Record<string, unknown>).isRunSubmission as
    ((url: string, method: string) => boolean) | undefined;
  expect(typeof matches, "应提供精确的提交端点判定").toBe("function");
  if (!matches) return;
  expect(matches("https://example.test/v1/agent/runs", "POST")).toBe(true);
  expect(matches("https://example.test/studio-api/v1/agent/runs", "POST")).toBe(true);
  expect(matches("https://example.test/v1/agent/runs/run-1/cancel", "POST")).toBe(false);
  expect(matches("https://example.test/v1/agent/runs/run-1/events", "POST")).toBe(false);
  expect(matches("https://example.test/v1/agent/runs", "GET")).toBe(false);
  expect(matches("https://example.test/other?path=/v1/agent/runs", "POST")).toBe(false);
});
