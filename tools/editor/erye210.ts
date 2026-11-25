import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, type Page, type Request } from '@playwright/test';
import { appendPromptText, submitCurrentPrompt, uploadAsset } from '../../src/workspace.js';

type Json = Record<string, any>;
export const rails210 = ['媒体', '文稿', '字幕', '配音', '水印'];
export class Prerequisite210 extends Error {}
export const prompts210 = {
  '003': '请识别本次上传的 E196-A.mp4 中的英语语音，生成英语字幕并烧录到视频中；保留原片完整20秒画面、原声和1920×1080分辨率，不翻译、不裁剪、不增加水印。请交付带英语字幕的MP4及独立英语SRT字幕文件，方便随后进入字幕编辑。',
  '005': '请分析当前工程的原始20秒视频 E196-A.mp4 中的停顿和口水词，提供清理候选并打开审核剪辑界面，保留完整英语文稿。只分析和审核，不移除或应用候选，不裁剪、不生成成片、不改变字幕、原声和水印；等我明确确认后再应用。',
};

/** Fresh fixtures use existing, observed production APIs. Navigation is always exercised in the UI. */
export class Navigation210 {
  readonly origin: string;
  readonly prepared: Record<string, Json> = {};
  readonly checks: Json[] = [];
  latestProjectId = '';
  readonly writes: Array<{ method: string; pathname: string }> = [];
  private listener = (r: Request) => {
    const u = new URL(r.url());
    const project = u.pathname.match(/^\/cloud-tool-api\/v1\/editor\/projects\/([a-f0-9-]+)$/);
    if (u.origin === this.origin && r.method() === 'GET' && project) this.latestProjectId = project[1];
    if (u.origin === this.origin && /POST|PUT|PATCH|DELETE/.test(r.method())
      && /\/editor\/projects\/(save|commit)|\/agent\/runs|\/conversations\/[^/]+\/(turns|messages)/.test(u.pathname))
      this.writes.push({ method: r.method(), pathname: u.pathname });
  };
  constructor(readonly page: Page, readonly out: string, origin: string) {
    this.origin = new URL(origin).origin;
    page.setDefaultTimeout(20_000);
    page.on('request', this.listener);
  }
  dispose() { this.page.off('request', this.listener); }
  async record(name: string, value: unknown) {
    await mkdir(this.out, { recursive: true });
    await writeFile(path.join(this.out, name + '.json'), JSON.stringify(value, null, 2));
  }
  async shot(name: string) {
    await mkdir(this.out, { recursive: true });
    const file = path.join(this.out, name + '.png');
    await this.page.screenshot({ path: file }); return file;
  }
  async json(route: string, data?: Json, method: 'get' | 'put' | 'post' = 'get'): Promise<Json> {
    if (process.env.CINLINK_ERYE210_CDP_ENDPOINT) {
      // CDP's APIRequestContext can lack an existing incognito context's cookies. Use the
      // signed-in page's same-origin fetch; never copy credentials into scripts or reports.
      if (new URL(this.page.url()).origin !== this.origin) throw new Prerequisite210('当前Chrome页面不是目标环境');
      const result = await this.page.evaluate(async ({ route, data, method }) => {
        const response = await fetch(route, { method: method.toUpperCase(), credentials: 'include',
          ...(data ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } : {}) });
        return { status: response.status, body: response.ok ? await response.json() : null };
      }, { route, data, method }).catch(() => { throw new Prerequisite210(`请求中断：${route.split('?')[0]}；先核对原工程/任务，不自动重发`); });
      if (result.status < 200 || result.status >= 300) throw new Prerequisite210(`前置/回读请求 ${route.split('?')[0]} HTTP ${result.status}`);
      return result.body;
    }
    const response = await this.page.request[method](this.origin + route, data ? { data } : {})
      .catch(() => { throw new Prerequisite210(`请求中断：${route.split('?')[0]}；先核对原工程/任务，不自动重发`); });
    if (!response.ok()) throw new Prerequisite210(`前置/回读请求 ${route.split('?')[0]} HTTP ${response.status()}`);
    return response.json();
  }
  get(pid: string) { return this.json('/cloud-tool-api/v1/editor/projects/' + pid); }
  messages(cid: string) { return this.json('/runtime-api/v1/conversations/' + cid + '/messages?limit=200'); }
  nav() { return this.page.getByRole('navigation', { name: '编辑器功能', exact: true }); }
  rail(name: string) { return this.nav().getByRole('button', { name, exact: true }); }
  async choose(name: string) {
    const b = this.rail(name);
    if (await b.getAttribute('aria-pressed') !== 'true') await b.click();
    await expect(b).toHaveAttribute('aria-pressed', 'true');
    await expect(this.page.locator('.ed-inspector')).toBeVisible();
    await this.expectPanel(name);
  }
  async expectPanel(name: string) {
    const panel = this.page.locator('.ed-inspector');
    if (name === '媒体') await expect(panel.getByRole('button', { name: '聊天', exact: true })).toBeVisible();
    if (name === '文稿') await expect(panel.getByRole('region', { name: '文稿', exact: true })).toBeVisible();
    if (name === '字幕') await expect(panel.getByRole('button', { name: '样式', exact: true })).toBeVisible();
    if (name === '配音') await expect(panel.locator('.ed-voice-panel')).toBeVisible();
    if (name === '水印') await expect(panel.getByRole('button', { name: '图片水印', exact: true })).toBeVisible();
  }
  async sub(name: '文字水印' | '图片水印') {
    const b = this.page.getByRole('button', { name, exact: true });
    if (await b.getAttribute('aria-pressed') !== 'true') await b.click();
    await expect(b).toHaveAttribute('aria-pressed', 'true');
  }
  async state() {
    return {
      name: await this.page.locator('.ed-project-trigger .ed-project-name').innerText(),
      module: await this.nav().locator('button[aria-pressed=true]').allTextContents(),
      playhead: await this.page.getByRole('slider', { name: '预览播放进度', exact: true }).inputValue(),
      selected: await this.page.locator('.ed-timeline-clip.is-selected').evaluateAll(es => es.map(e => e.getAttribute('aria-label'))),
      media: await this.page.locator('[aria-label="工程实时预览"] video').evaluateAll(es => es.map(e => ({ paused: (e as HTMLVideoElement).paused, duration: (e as HTMLVideoElement).duration }))),
    };
  }
  async createWorkspace() {
    const id = randomUUID();
    await this.json('/runtime-api/v1/projects/' + id, { project_id: id, display_name: 'ERYE210-自动化-' + Date.now() }, 'put');
    return id;
  }
  async createConversation(wid: string, id: string) {
    const cid = randomUUID(), title = `ERYE210-${id}-${Date.now()}`;
    await this.json('/runtime-api/v1/conversations/' + cid, { conversation_id: cid, project_id: wid, title,
      messages_partial: true, response_message_limit: 30, response_include_editor_project: true }, 'put');
    return { cid, title };
  }
  async enterConversation(cid: string) {
    await this.page.goto(this.origin + '/c/' + cid, { waitUntil: 'domcontentloaded' });
    await this.page.locator('#workspace-prompt').waitFor({ timeout: 45_000 });
  }
  async open(name?: string) {
    if (!(await this.page.locator('.ed-project-trigger .ed-project-name').isVisible()))
      await this.page.getByRole('button', { name: '视频编辑器', exact: true }).click();
    const title = this.page.locator('.ed-project-trigger .ed-project-name');
    try { await expect(title).toBeVisible(); }
    catch (error) {
      if (await this.page.getByRole('region', { name: '欢迎使用 CinLink', exact: true }).isVisible())
        throw new Prerequisite210('Chrome登录已失效，需在测试窗口重新登录；没有执行目标导航');
      throw error;
    }
    if (name) await expect(title).toHaveText(name);
  }
  async copy(wid: string, id: string, seed: Json, cid?: string) {
    const conversation = cid ? { cid } : await this.createConversation(wid, id);
    const pid = randomUUID(), content = structuredClone(seed.content);
    delete content.media_context;
    content.project_id = pid; content.name = `ERYE210-${id}-${pid.slice(0, 8)}`;
    // Real cleanup data can be used as a fixture, with its baseline bound to this new project.
    if (content.cleanup_analysis?.baseline_content) content.cleanup_analysis.baseline_content.project_id = pid;
    await this.json('/cloud-tool-api/v1/editor/projects/save', { project_id: pid, conversation_id: conversation.cid,
      operation_id: randomUUID(), base_revision: 0, content }, 'post');
    const f = { cid: conversation.cid, pid, name: content.name };
    this.prepared[id] = f; await this.record(id + '-location', f);
    if (cid) {
      // A newly saved project does not replace the conversation's current selection. Keep PA's
      // in-page view memory and explicitly choose the new PB through the real project picker.
      if (new URL(this.page.url()).pathname !== '/c/' + cid) await this.enterConversation(cid);
      await this.open(); await this.selectProject(f.name);
    } else {
      await this.enterConversation(f.cid); await this.open(f.name);
    }
    return f;
  }
  async unchanged(pid: string, before: Json) {
    const after = await this.get(pid);
    expect(after.project_id).toBe(before.project_id);
    expect(after.revision).toBe(before.revision);
    expect(after.content).toEqual(before.content);
    return after;
  }
  async credits() {
    const profile = this.page.getByRole('complementary').getByRole('button').filter({ hasText: /Free|Pro|Plus/ }).last();
    await profile.click();
    const item = this.page.getByRole('menu', { name: '账户菜单' }).getByRole('button', { name: /^积分 / });
    await expect(item).toBeVisible(); const text = await item.innerText();
    await this.page.keyboard.press('Escape');
    await expect(this.page.getByRole('menu', { name: '账户菜单' })).toBeHidden();
    return text.replace(/\s/g, '');
  }
  async selectProject(name: string) {
    await this.page.locator('.ed-project-trigger').click();
    await this.page.getByRole('dialog', { name: '选择工程', exact: true }).getByRole('button').filter({ hasText: name }).click();
    await expect(this.page.locator('.ed-project-trigger .ed-project-name')).toHaveText(name);
  }
  async uploadToChat(videoPath: string) {
    // Existing repository helper waits for the actual upload/registration response.
    const { stat } = await import('node:fs/promises');
    const outcome = await uploadAsset(this.page, { path: videoPath, name: 'E196-A.mp4', mimeType: 'video/mp4',
      sizeBytes: (await stat(videoPath)).size, durationSec: 20 }, { uniqueName: false });
    if (!outcome.cloudFileId) throw new Prerequisite210('视频上传未取得真实素材ID');
    return outcome.cloudFileId;
  }
  async agentPreparation(id: '003' | '005', cid: string, prompt = prompts210[id]) {
    await this.record(id + '-preparation-prompt', { prompt });
    await appendPromptText(this.page, prompt);
    const submit = await submitCurrentPrompt(this.page); // Exactly one initial submission, never retry.
    await this.record(id + '-submission', { runId: submit.runId, status: submit.status, submitRequests: submit.submitRequests });
    const answered = new Set<string>();
    const deadline = Date.now() + 480_000;
    while (Date.now() < deadline) {
      const body = await this.messages(cid);
      const assistant = (body.messages || []).filter((m: Json) => m.role === 'assistant').at(-1);
      if (assistant) {
        const status = String(assistant.status || '').toLowerCase();
        if (/failed|error|cancelled/.test(status)) throw new Prerequisite210(`准备任务${submit.runId} ${status}，未重试`);
        if (/completed|succeeded|^done$/.test(status)
          || (id === '005' && await this.page.getByRole('button', { name: '审阅剪辑', exact: true }).isVisible())) {
          await this.record(id + '-preparation-result', { runId: submit.runId, status,
            resultFiles: (assistant.result_files || []).map((f: Json) => ({ fileId: f.file_id || f.cloud_file_id, name: f.name || f.filename })) });
          return assistant;
        }
      }
      const form = this.page.locator('.node-clarification:visible, .clarification-card:visible').first();
      if (await form.count()) {
        // Only fill explicitly configured answers; never pick an arbitrary source or default option.
        const answers = JSON.parse(process.env.CINLINK_ERYE210_CLARIFICATION_ANSWERS || '{}');
        const text = await form.innerText();
        for (const [label, value] of Object.entries(answers)) {
          const input = form.getByLabel(label, { exact: true });
          if (!(await input.count())) continue;
          if (await input.evaluate(e => e.tagName === 'SELECT')) await input.selectOption(String(value));
          else await input.fill(String(value));
        }
        const key = text + JSON.stringify(answers);
        if (!Object.keys(answers).length || answered.has(key))
          throw new Prerequisite210('出现未配置/未解决的补槽；请在Chrome填写后使用原任务续跑，禁止重复提交');
        await this.record(id + '-clarification', { text, answers });
        await this.shot(id + '-clarification-filled');
        await form.getByRole('button', { name: /^(提交|Submit)$/ }).click(); answered.add(key);
      }
      // Analysis confirmation is deliberately left waiting for human review in 005.
      if (id === '003') {
        const confirmation = this.page.locator('.node-plan-review__actions button').filter({ hasText: /^(提交|Submit)$/ });
        if (await confirmation.isVisible() && !answered.has('plan')) { await confirmation.click(); answered.add('plan'); }
      }
      await this.page.waitForTimeout(2000);
    }
    throw new Prerequisite210(`准备任务${submit.runId}未在等待时间内结束；保留原任务，禁止重发`);
  }
}
