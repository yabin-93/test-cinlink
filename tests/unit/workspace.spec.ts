import { expect, test } from "@playwright/test";
import * as workspace from "../../src/workspace.js";
import { targets } from "../../src/config.js";

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
