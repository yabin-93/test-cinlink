import { expect, type Page } from "@playwright/test";
import { assertWorkspaceOpened } from "../staging.js";
import { targets } from "../config.js";

/** Create an isolated project through the product UI; never reuse a historical project. */
export async function createProjectSessionPair(page: Page) {
  await assertWorkspaceOpened(page);
  await page.locator("#workspace-new-project").click({ timeout: 30_000 });
  await page.locator('[data-project-card="create"]').click({ timeout: 30_000 });
  const name = `MW21-跨会话复用-${Date.now()}`;
  await page.locator(".workspace-project-name-dialog input").fill(name);
  const saved = page.waitForResponse((response) => response.request().method() === "PUT"
    && /\/runtime-api\/v1\/projects\/[^/?]+$/.test(response.url()) && response.ok(), { timeout: 30_000 });
  await page.locator(".workspace-project-name-dialog button.primary").click();
  const response = await saved;
  const projectId = decodeURIComponent(new URL(response.url()).pathname.split("/").at(-1)!);
  const projectName = String(response.request().postDataJSON().display_name ?? "");

  const assertSelected = async () => {
    const picker = page.locator("#workspace-composer-project-toggle");
    await expect(picker).toBeEnabled({ timeout: 30_000 });
    await expect.poll(() => new URL(page.url()).searchParams.get("project_id")).toBe(projectId);
    await picker.click();
    await expect(page.getByRole("option", { name: projectName, exact: true })).toHaveAttribute("aria-selected", "true");
    await picker.click();
  };
  await assertSelected();
  return {
    projectId, projectName,
    /** Link A's uploaded file into P without uploading a second copy. */
    async registerSourceFile(file: { id: string; name: string; sizeBytes: number; mimeType: string }) {
      const base = `${targets.studioBase}/cloud-tool-api/v1/projects/${encodeURIComponent(projectId)}/files`;
      const registered = await page.request.post(base, {
        data: { files: [{ file_id: file.id, kind: "video", root_name: projectName,
          relative_path: file.name, mime_type: file.mimeType, size_bytes: file.sizeBytes }] },
        timeout: 30_000,
      });
      expect(registered.ok(), `源素材登记到项目失败：HTTP ${registered.status()}`).toBe(true);
      const listing = await page.request.get(base, { timeout: 30_000 });
      expect(listing.ok(), "项目素材登记后必须可以回读").toBe(true);
      const body = await listing.json() as { files?: Array<{ file_id?: string }>; items?: Array<{ file_id?: string }> } | Array<{ file_id?: string }>;
      const files = Array.isArray(body) ? body : body.files ?? body.items ?? [];
      expect(files.some((item) => item.file_id === file.id), "项目素材库必须包含源会话相同的 file_id").toBe(true);
    },
    async openTarget() {
      const button = page.locator(`.workspace-project-new[data-react-new-session="${projectId}"]`);
      await button.waitFor({ state: "attached", timeout: 30_000 });
      // The sidebar reveals this control on hover. A DOM click uses the same product handler.
      await button.evaluate((element: HTMLElement) => element.click());
      await expect(page.locator("#workspace-prompt")).toBeVisible();
      await expect(page.locator("#workspace-prompt")).toHaveText("");
      await assertSelected();
    },
    async verifyConversation(conversationId: string) {
      expect(conversationId, "会话必须已持久化").not.toBe("");
      const record = await page.evaluate(async (url) => {
        const result = await fetch(url, { credentials: "include" });
        if (!result.ok) throw new Error(`读取会话归属失败：HTTP ${result.status}`);
        return await result.json() as { conversation_id?: string; project_id?: string; metadata?: { project_id?: string } };
      }, `${targets.studioBase}/runtime-api/v1/conversations/${encodeURIComponent(conversationId)}`);
      expect(record.conversation_id, "回读会话 ID 不一致").toBe(conversationId);
      const actualProjectId = record.project_id ?? record.metadata?.project_id;
      expect(actualProjectId, "会话未归属本次独立项目").toBe(projectId);
      return actualProjectId!;
    },
  };
}
