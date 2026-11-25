import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
export { assert };
export class Blocked extends Error { constructor(message) { super(message); this.name = 'Blocked'; } }
export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export const retiredCaseIds = Object.freeze(['058', '060', '061', '063']);
export function parseCases(value = '001-010') {
  const ids = new Set();
  for (const part of value.split(',')) {
    const match = /^(?:ERYE199-)?(\d{1,3})(?:-(\d{1,3}))?$/.exec(part.trim());
    if (!match) throw Error('无效用例范围：' + part);
    const first = Number(match[1]), last = Number(match[2] || first);
    if (first < 1 || last > 68 || last < first) throw Error('仅支持ERYE199-001～020、051～057、059、062及064～068的正向范围');
    for (let i = first; i <= last; i++) {
      if (i >= 21 && i <= 50) throw Error('021～050按用户要求暂不接入自动化');
      if (retiredCaseIds.includes(String(i).padStart(3, '0'))) continue;
      ids.add(String(i).padStart(3, '0'));
    }
  }
  if (!ids.size) throw Error('没有有效用例；058/060/061/063已按用户要求删除');
  return [...ids].sort();
}
export function targetOrigin(value) {
  const url = new URL(value);
  if (!['https://app.cinlink.ai', 'https://staging-app.cinlink.ai'].includes(url.origin) || url.pathname !== '/' || url.search || url.hash) throw Error('请明确提供生产或预发根地址');
  return url.origin;
}
export const clips = (document, type = 'video') => document.content.tracks.filter(t => t.type === type).flatMap(t => t.clips);
export function range(clip, start, end, at) { assert.equal(clip.source_in_sec, start); assert.equal(clip.source_out_sec, end); assert.equal(clip.timeline_start_sec, at); }
export function aligned(seconds, numerator, denominator, tolerance = 1e-6) { const n = seconds * numerator / denominator; return Math.abs(n - Math.round(n)) <= tolerance; }
export async function json(file, value) { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(value, null, 2) + '\n'); }
export function result(error) { return error ? error instanceof Blocked ? 'Blocked' : 'Failed' : 'Passed'; }
export function terminalAssistant(assistant, run) {
  const final = [...(run.messages || [])].reverse().find(m => m.role === 'assistant');
  return { ...assistant, ...(final || {}), text: final?.content_text ?? final?.text ?? assistant?.text ?? '', status: run.status, run_state: run };
}
export function acceptedRunForPrompt(messages, prompt, excludedRunIds = []) {
  const excluded = new Set(excludedRunIds);
  return [...messages].reverse().find(m => m.role === 'user' && String(m.text ?? m.content_text ?? '').trim() === prompt.trim() && m.run_id && !excluded.has(m.run_id))?.run_id;
}
export async function createContext(config, page) {
  const ctx = { config, page, caseId: null, fixture: null };
  ctx.write = (name, value) => json(path.join(config.outDir, ctx.caseId || 'batch', name + '.json'), value);
  ctx.api = async (url, data, method) => {
    const r = await page.fetch(url, { method: method || (data ? 'POST' : 'GET'), ...(data ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } : {}), timeout: 30_000 });
    let body = r.body; try { if (typeof body === 'string') body = JSON.parse(body); } catch {}
    if (!r.ok) throw Error(`${url.split('?')[0]} HTTP ${r.status}`);
    return body;
  };
  ctx.shot = async name => {
    const dir = path.join(config.outDir, ctx.caseId || 'batch'); await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name + '.txt'), await page.snapshot({ scope: 'full_page' }));
    await page.screenshot({ path: path.join(dir, name + '.png').replaceAll('\\', '/') });
  };
  ctx.open = async (fixture, video = true) => {
    await page.goto(config.baseURL + '/c/' + fixture.conversationId, { timeout: 60_000 });
    await page.waitForSelector('[contenteditable="true"]', { state: 'visible', timeout: 30_000 });
    if (!await page.evaluate(() => !!document.querySelector('.ed-project-trigger'))) await page.click('button[aria-label="视频编辑器"]');
    await page.waitForFunction(name => document.querySelector('.ed-project-name')?.textContent === name, fixture.name, { timeout: 30_000 });
    if (video) await page.waitForFunction(() => document.querySelector('[aria-label="工程实时预览"] video')?.readyState >= 2, undefined, { timeout: 45_000 });
  };
  ctx.read = () => ctx.api('/cloud-tool-api/v1/editor/projects/' + ctx.fixture.editorId);
  ctx.prepare = async (content, suffix = '') => {
    const dir = path.join(config.outDir, ctx.caseId, suffix || 'fixture');
    // An uncertain preparation is never replayed under the same batch/case key.
    await fs.mkdir(dir, { recursive: true }); const lock = await fs.open(path.join(dir, 'prepare.lock'), 'wx'); await lock.close();
    const fixture = { conversationId: crypto.randomUUID(), editorId: crypto.randomUUID(), name: `ERYE199-${ctx.caseId}${suffix ? '-' + suffix : ''}-${config.batch}` };
    content = structuredClone(content); content.project_id = fixture.editorId; content.name = fixture.name;
    await json(path.join(dir, 'intent.json'), fixture);
    await ctx.api('/runtime-api/v1/conversations/' + fixture.conversationId, { conversation_id: fixture.conversationId, project_id: ctx.workspaceId, title: fixture.name, messages_partial: true, response_message_limit: 30, response_include_project_json: true, response_include_editor_project: true }, 'PUT');
    await ctx.api('/cloud-tool-api/v1/editor/projects/save', { conversation_id: fixture.conversationId, project_id: fixture.editorId, operation_id: crypto.randomUUID(), base_revision: 0, content });
    ctx.fixture = fixture; await json(path.join(dir, 'setup.json'), fixture); await ctx.open(fixture, content.tracks.some(t => t.type === 'video' && t.clips.length));
    await ctx.write('before' + (suffix ? '-' + suffix : ''), await ctx.read());
    return fixture;
  };
  ctx.waitSaved = async revision => {
    let doc;
    for (let i = 0; i < 30; i++) { doc = await ctx.read(); if (doc.revision > revision) return doc; await new Promise(r => setTimeout(r, 200)); }
    throw Error('页面操作后未观察到新的已保存版本');
  };
  ctx.seek = async time => {
    const inputType = await page.evaluate(() => document.querySelector('input[aria-label="预览播放进度"]').type);
    if (inputType === 'number') {
      const selector = 'input[aria-label="预览播放进度"]';
      await page.fill(selector, String(time)); await page.press(selector, 'Tab');
      await page.waitForFunction(t => Math.abs(Number(document.querySelector('input[aria-label="预览播放进度"]').value) - t) < .006, time, { timeout: 8_000 });
      await ctx.write('seek-' + time, { target: time, inputType, actual: await page.evaluate(() => Number(document.querySelector('input[aria-label="预览播放进度"]').value)) });
      return;
    }
    const sel = 'input[aria-label="预览播放进度"]'; let { current, max } = await page.evaluate(() => { const e = document.querySelector('input[aria-label="预览播放进度"]'); return { current: Number(e.value), max: Number(e.max) }; });
    if (time < Math.abs(time - current) && time <= Math.abs(max - time)) { await page.press(sel, 'Home'); current = 0; }
    else if (Math.abs(max - time) < Math.abs(time - current)) { await page.press(sel, 'End'); current = max; }
    for (let i = 0, n = Math.abs(Math.round((time - current) * 100)); i < n; i++) await page.press(sel, time > current ? 'ArrowRight' : 'ArrowLeft');
    // Native range inputs can lose a key step during a React render. Read the
    // actual displayed value and complete the same seek using real keyboard input.
    const adjustments = [];
    for (let pass = 0; pass < 5; pass++) {
      const value = await page.evaluate(() => Number(document.querySelector('input[aria-label="预览播放进度"]').value));
      if (Math.abs(value - time) < .006) break;
      const ticks = Math.round((time - value) * 100); adjustments.push({ value, ticks });
      if (Math.abs(ticks) > 5) break;
      for (let k = 0; k < Math.abs(ticks); k++) await page.press(sel, ticks > 0 ? 'ArrowRight' : 'ArrowLeft');
    }
    await page.press(sel, 'Tab');
    await page.waitForFunction(t => Math.abs(Number(document.querySelector('input[aria-label="预览播放进度"]').value) - t) < .006, time, { timeout: 8_000 });
    await ctx.write('seek-' + time, { target: time, adjustments, actual: await page.evaluate(() => Number(document.querySelector('input[aria-label="预览播放进度"]').value)) });
  };
  ctx.frame = async () => {
    await page.waitForFunction(() => { const v = document.querySelector('[aria-label="工程实时预览"] video'); return v && v.readyState >= 2 && !v.seeking; }, undefined, { timeout: 10_000 });
    return page.evaluate(() => new Promise((resolve, reject) => { const v = document.querySelector('[aria-label="工程实时预览"] video'), before = v.currentTime, timer = setTimeout(() => reject(Error('呈现帧读取超时')), 5_000); v.requestVideoFrameCallback((now, m) => { clearTimeout(timer); resolve({ mediaTime: m.mediaTime, before, currentTime: v.currentTime, rate: v.playbackRate }); }); v.currentTime = v.currentTime; }));
  };
  ctx.panel = async label => {
    const aliases = { Media: ['Media', '媒体'], Captions: ['Captions', '字幕'] };
    const selector = '[aria-label="编辑器功能"] button'; const index = await page.evaluate(labels => [...document.querySelectorAll('[aria-label="编辑器功能"] button')].findIndex(e => labels.includes(e.textContent.trim())), aliases[label] || [label]);
    if (index < 0) throw new Blocked('页面没有' + label + '面板');
    const open = await page.evaluate(i => { const e = document.querySelectorAll('[aria-label="编辑器功能"] button')[i]; return e.getAttribute('aria-expanded') === 'true' || e.getAttribute('aria-pressed') === 'true'; }, index);
    if (!open) await page.click(selector + ' >> nth=' + index);
  };
  ctx.agent = async instruction => {
    const fixture = ctx.fixture;
    const prompt = `只编辑当前工程，不新建工程或生成替代视频。${instruction}`;
    const history = await ctx.api('/runtime-api/v1/conversations/' + fixture.conversationId + '/messages?limit=200');
    const excludedRunIds = [...new Set((history.messages || []).map(m => m.run_id).filter(Boolean))];
    await ctx.write('agent-cursor', { prompt, excludedRunIds });
    await ctx.write('prompt', { prompt, ...fixture }); await page.fill('[contenteditable="true"]', prompt); await ctx.shot('before-submit'); await page.click('button[aria-label="发送"]');
    return ctx.observeAgent({ prompt, excludedRunIds });
  };
  ctx.observeAgent = async ({ runId, prompt = '', excludedRunIds = [] }) => {
    const fixture = ctx.fixture;
    let assistant;
    for (let i = 0; i < 180; i++) {
      const data = await ctx.api('/runtime-api/v1/conversations/' + fixture.conversationId + '/messages?limit=200'); await ctx.write('messages', data);
      runId ||= acceptedRunForPrompt(data.messages || [], prompt, excludedRunIds);
      assistant = runId ? [...(data.messages || [])].reverse().find(m => m.role === 'assistant' && m.run_id === runId) : undefined;
      if (runId) {
        await ctx.write('accepted-run', { run_id: runId, prompt, conversation_id: fixture.conversationId });
        const run = await ctx.api('/runtime-api/v2/agent/runs/' + runId);
        if (run.conversation_id && run.conversation_id !== fixture.conversationId) throw Error('原run与当前用例会话不匹配，停止回读');
        // Conversation summaries can lag the original run's terminal state.
        await ctx.write('run-state', { run_id: run.run_id, status: run.status, error: run.error, clarifications: run.clarifications, plan: run.plan, intention: run.intention, messages: run.messages });
        if (['done', 'failed', 'cancelled'].includes(run.status)) { await ctx.write('after-agent', await ctx.read()); await ctx.shot('agent-terminal'); return terminalAssistant(assistant, run); }
        if (['waiting_for_clarification', 'requires_user_input', 'waiting_for_confirmation'].includes(run.status)) { await ctx.shot('needs-input'); throw new Blocked('原任务需要补槽/确认；保留原run和表单，按用例意图填写后继续，不重发'); }
      }
      if (assistant && ['done', 'failed', 'cancelled'].includes(assistant.status)) { await ctx.write('after-agent', await ctx.read()); await ctx.shot('agent-terminal'); return assistant; }
      if (assistant && ['waiting_for_clarification', 'requires_user_input', 'waiting_for_confirmation'].includes(assistant.status)) {
        await ctx.shot('needs-input'); throw new Blocked('原任务需要补槽/确认；保留原run和表单，按用例意图填写后继续，不重发');
      }
      await new Promise(r => setTimeout(r, 2_000));
    }
    throw new Blocked('原任务仍未终结，保留run，不重复提交');
  };
  return ctx;
}
