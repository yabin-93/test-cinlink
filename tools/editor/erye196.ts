import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { expect, type Page, type BrowserContext } from '@playwright/test';
import { credentials, targets } from '../../src/config.js';
import { openWorkspaceSession, submitPrompt, conversationForRun, readConversationMessages,
  readRunStatus, confirmRenderPlan, uploadAssetViaApi } from '../../src/workspace.js';
import { provisionEditorBaseline } from './provision.js';

// Only fixture setup uses the observed editor save API. Target edits always use the Agent UI.
// Loose JSON types here reflect observed saved documents; they are not PRD schema assertions.
export type Json = Record<string, any>;
export const evidenceRoot = path.resolve('reports/editor-196', process.env.CINLINK_EDITOR_BATCH || new Date().toISOString().replace(/[:.]/g, '-'));
const staging = new URL(targets.webBase).hostname === 'staging-app.cinlink.ai';
let originalId = process.env.CINLINK_EDITOR_ORIGINAL_ID || (staging ? '3bc78d71-8cf6-4caf-b347-a2f19962f471' : '');
let baselineId = process.env.CINLINK_EDITOR_BASELINE_ID || (staging ? '95bac85e-de3f-43d1-adfa-7e1f1e87054c' : '');
let conversationId = process.env.CINLINK_EDITOR_CONVERSATION_ID || (staging ? 'bb4f1a9a-c3fb-4de0-aa25-f48f15621303' : '');
const audioFixtureVersion = '2-linked-cues';
export function transportError(operation: string, error: unknown): Error {
  // Playwright transport stacks can contain cookie headers; never send them to the console.
  const summary = error instanceof Error ? error.message.split('\n')[0].slice(0, 140) : '请求中断';
  return new Error(`${operation}: ${summary}`);
}

export class Editor196 {
  private headers: Record<string, string> = {};
  private base!: Json;
  private original!: Json;
  private speechFile = '';
  private bgmFile = '';
  private cueFiles: Record<string, string> = {};
  readonly results: Json[] = [];
  constructor(readonly page: Page, readonly context: BrowserContext) {}

  async record(name: string, value: unknown) {
    await mkdir(evidenceRoot, { recursive: true });
    await writeFile(path.join(evidenceRoot, `${name}.json`), JSON.stringify(value, null, 2));
  }
  async shot(name: string) {
    const file = path.join(evidenceRoot, `${name}.png`);
    await this.page.screenshot({ path: file });
    return file;
  }
  async get(id: string): Promise<Json> {
    const res = await this.context.request.get(`${targets.studioBase}/cloud-tool-api/v1/editor/projects/${id}`, { headers: this.headers, timeout: 60_000 })
      .catch(error => { throw transportError('工程回读', error); });
    if (!res.ok()) throw Error(`读取工程 ${id} HTTP ${res.status()}`);
    return res.json();
  }
  async init() {
    await mkdir(evidenceRoot, { recursive: true });
    this.context.setDefaultTimeout(20_000);
    this.context.setDefaultNavigationTimeout(60_000);
    this.page.on('request', request => {
      if (/\/cloud-tool-api\/v1\/editor\/projects\/[a-f0-9-]+$/.test(new URL(request.url()).pathname)) {
        const headers = { ...request.headers() };
        for (const key of ['host', 'content-length', 'cookie']) delete headers[key];
        this.headers = headers; // Session credentials stay in memory, never in evidence.
      }
    });
    await openWorkspaceSession(this.page, { fresh: false });
    console.log('[editor196] workspace ready');
    if (process.env.CINLINK_EDITOR_BOOTSTRAP === '1') {
      const prepared = await provisionEditorBaseline(this.page, evidenceRoot)
        .catch(error => { throw transportError('当前环境夹具准备', error); });
      baselineId = prepared.projectId;
      originalId = prepared.projectId; // Only a disposable control project is opened on a new environment.
      conversationId = prepared.conversationId;
    }
    if (!baselineId || !originalId || !conversationId) throw Error('当前环境未登记工程/会话，禁止使用预发ID执行');
    await this.page.goto(`${targets.webBase}/c/${conversationId}`, { waitUntil: 'domcontentloaded' });
    await this.page.locator('#workspace-prompt').waitFor({ timeout: 60_000 });
    console.log('[editor196] project page ready');
    if (!(await this.page.locator('.ed-project-name').count()))
      await this.page.locator('.workspace-editor-toggle').click();
    await this.page.locator('.ed-project-name').waitFor({ timeout: 30_000 });
    console.log('[editor196] editor ready; reading saved fixtures');
    this.base = await this.get(baselineId);
    this.original = await this.get(originalId);
    await this.record('source-baseline', this.base);
    await this.record('user-original-before', this.original);
    await this.context.storageState({ path: credentials.storageStatePath });
  }
  async audio() {
    if (this.speechFile && this.bgmFile && Object.keys(this.cueFiles).length === 4) return;
    try {
      const sourceRecord = JSON.parse(await readFile(path.join(evidenceRoot, 'fixture-speech.json'), 'utf8'));
      if (sourceRecord.fixtureVersion !== audioFixtureVersion) throw Error('旧音频夹具版本不可复用');
      this.speechFile = sourceRecord.fileId;
      this.bgmFile = JSON.parse(await readFile(path.join(evidenceRoot, 'fixture-bgm.json'), 'utf8')).fileId;
      for (const cue of ['welcome-2', 'second-2', 'intro-1', 'cross-2']) {
        this.cueFiles[cue] = JSON.parse(await readFile(path.join(evidenceRoot, `fixture-${cue}.json`), 'utf8')).fileId;
      }
      if (this.speechFile && this.bgmFile && Object.keys(this.cueFiles).length === 4) return;
    } catch { /* This batch has not uploaded the controlled audio yet. */ }
    for (const type of ['speech', 'bgm', 'welcome-2', 'second-2', 'intro-1', 'cross-2']) {
      const filename = type === 'speech' || type === 'bgm' ? `${type}-20` : type;
      const duration = type.endsWith('-1') ? 1 : type.endsWith('-2') ? 2 : 20;
      const filePath = path.resolve(`reports/editor-196/fixtures/${filename}.wav`);
      const info = await stat(filePath);
      const uploaded = await uploadAssetViaApi(this.page, {
        path: filePath, name: `E196-${type}-${Date.now()}.wav`, sizeBytes: info.size,
        mimeType: 'audio/wav', durationSec: duration,
      }).catch(error => { throw transportError('音频夹具上传', error); });
      if (!uploaded.fileId) throw Error(`音频夹具上传失败 ${type} HTTP ${uploaded.httpStatus}`);
      if (type === 'speech') this.speechFile = uploaded.fileId;
      else if (type === 'bgm') this.bgmFile = uploaded.fileId;
      else this.cueFiles[type] = uploaded.fileId;
      await this.record(`fixture-${type}`, { fixtureVersion: audioFixtureVersion, fileId: uploaded.fileId, httpStatus: uploaded.httpStatus, duration });
    }
  }
  async fixture(caseId: string, mode: 'plain' | 'append' | 'speech' | 'cross' = 'plain') {
    const id = randomUUID(), content = structuredClone(this.base.content);
    content.project_id = id;
    content.name = `E196-${caseId}-${path.basename(evidenceRoot).slice(0, 19)}`;
    const video = content.tracks.find((t: Json) => t.type === 'video');
    if (!video || video.clips.length !== 1 || video.clips[0].source_out_sec !== 20)
      throw Error('A20基线已变化，停止以免错误执行');
    if (mode === 'append') {
      const b = this.original.content.tracks.find((t: Json) => t.type === 'video').clips[0];
      video.clips.push({ ...structuredClone(b), clip_id: randomUUID(), source_in_sec: 0, source_out_sec: 10, timeline_start_sec: 20 });
      const audio = content.tracks.find((t: Json) => t.type === 'audio' && t.role === 'source');
      if (audio) audio.clips.push({ clip_id: randomUUID(), file_id: b.file_id, source_in_sec: 0, source_out_sec: 10, timeline_start_sec: 20, volume: 1, playback_rate: 1 });
    }
    if (mode === 'speech' || mode === 'cross') {
      await this.audio();
      // Mute the existing source audio. Speech and fixed BGM are separate, audible real files.
      const sourceAudio = content.tracks.find((t: Json) => t.type === 'audio' && t.role === 'source');
      if (!sourceAudio) throw Error('夹具缺少关联原声音轨');
      sourceAudio.muted = mode === 'cross';
      sourceAudio.clips[0].file_id = this.speechFile;
      content.tracks.push({ type: 'audio', role: 'dubbing', track_id: randomUUID(), muted: false, offset_sec: 0,
        linked_video_track_id: video.track_id, clips: [] });
      content.tracks.push({ type: 'audio', role: 'background', track_id: randomUUID(), muted: false, offset_sec: 0,
        linked_video_track_id: null, clips: [{ clip_id: randomUUID(), file_id: this.bgmFile, source_in_sec: 0, source_out_sec: 20, timeline_start_sec: 0, playback_rate: 1, volume: 1 }] });
      const source = content.tracks.find((t: Json) => t.type === 'subtitle')?.clips.find((c: Json) => c.role === 'source');
      if (!source?.bindings?.length) throw Error('字幕夹具缺少真实绑定');
      let targets = [source.bindings[0].block_id, source.bindings[1].block_id];
      if (mode === 'cross') {
        targets = [randomUUID(), randomUUID()];
        source.diff = [
          ...source.bindings.map((b: Json) => ({ text: '', start_sec: b.original_start_sec, end_sec: b.original_end_sec })),
          { identity: targets[0], text: 'Intro', start_sec: 0, end_sec: 1 },
          { identity: targets[1], text: 'Remove Keep', start_sec: 1, end_sec: 3 },
        ];
        // Independent gold is the audible word sequence, not invented server word-time fields.
        content.tracks = content.tracks.filter((t: Json) => t.type !== 'subtitle' || t.clips.some((c: Json) => c.role === 'source'));
      }
      content.dubbing = targets.map((block: string, index: number) => ({
        dubbing_id: randomUUID(), subtitle_file_id: source.file_id, block_id: block,
        source_text: mode === 'cross' ? ['Intro', 'Remove Keep'][index] : ['Welcome', 'Second caption'][index],
        translation_text: mode === 'cross' ? ['Intro', 'Remove Keep'][index] : ['Welcome', 'Second caption'][index],
        speaker_id: null, voice_id: null, audio_state: 'ready',
        audio_file_id: this.cueFiles[mode === 'cross' ? ['intro-1', 'cross-2'][index] : ['welcome-2', 'second-2'][index]],
        start_sec: mode === 'cross' ? [0, 1][index] : [4, 10][index],
        end_sec: mode === 'cross' ? [1, 3][index] : [6, 12][index], playback_rate: 1, volume: 1,
      }));
    }
    const operation = randomUUID();
    const response = await this.context.request.post(`${targets.studioBase}/cloud-tool-api/v1/editor/projects/save`, {
      headers: { ...this.headers, 'idempotency-key': operation },
      data: { project_id: id, operation_id: operation, base_revision: 0, conversation_id: conversationId, content },
    }).catch(error => { throw transportError('工程夹具保存', error); });
    await this.record(`${caseId}-setup`, { setupOnly: true, projectId: id, status: response.status(), response: await response.json() });
    if (!response.ok()) throw Error(`工程夹具保存失败 HTTP ${response.status()}`);
    const before = await this.get(id);
    expect(before.content).toEqual(content);
    await this.record(`${caseId}-before`, before);
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.page.locator('#workspace-prompt').waitFor({ timeout: 60_000 });
    if (!(await this.page.locator('.ed-project-name').count()))
      await this.page.locator('.workspace-editor-toggle').click();
    await this.page.locator('.ed-project-name').first().click();
    await this.page.getByRole('button', { name: new RegExp(`^${content.name}`) }).last().click();
    await expect(this.page.locator('.ed-project-name').first()).toContainText(content.name, { timeout: 30_000 });
    const captions = this.page.locator('button[data-tab="captions"]');
    if (await captions.count() && await captions.getAttribute('aria-expanded') !== 'true') await captions.click();
    if (mode === 'cross') await expect(this.page.locator('body')).toContainText('Remove Keep');
    await this.shot(`${caseId}-before`);
    return { id, name: content.name as string, before };
  }
  async execute(caseId: string, fixture: { id: string; name: string; before: Json }, instruction: string) {
    const prompt = `只编辑当前已保存工程“${fixture.name}”（工程ID：${fixture.id}），不要新建工程或生成替代视频。${instruction}`;
    const row: Json = { caseId, projectId: fixture.id, projectName: fixture.name, prompt, startedAt: new Date().toISOString(), clarifications: [] };
    this.results.push(row);
    try {
      const submission = await submitPrompt(this.page, prompt);
      row.submission = submission;
      await this.record(`${caseId}-submission`, row);
      expect(submission.httpStatus).toBeGreaterThanOrEqual(200);
      expect(submission.httpStatus).toBeLessThan(300);
      expect(submission.runId).not.toBe('');
      row.conversationId = conversationForRun(submission.runId);
      await this.record(`${caseId}-submission`, row);
      const end = Date.now() + 360_000;
      while (Date.now() < end) {
        row.status = await readRunStatus(this.page, submission.runId)
          .catch(error => { throw transportError('原任务状态回读', error); });
        if (['done', 'failed', 'cancelled'].includes(row.status)) break;
        if (row.status === 'requires_user_input') {
          await this.shot(`${caseId}-clarification-${row.clarifications.length}`);
          const question = (await this.page.locator('body').innerText()).slice(-7000);
          const select = this.page.locator('select:visible').last();
          const radio = this.page.getByRole('radio', { name: new RegExp(fixture.name) }).last();
          if (await select.count()) {
            const choices = await select.locator('option').evaluateAll(es => es.map(e => ({ label: e.textContent || '', value: (e as HTMLOptionElement).value })));
            const option = choices.find(c => c.label.includes(fixture.name) || c.value === fixture.id);
            if (!option) throw Error('澄清未提供本用例工程，需人工确认，不能自动选其他工程');
            await select.selectOption(option.value);
          } else if (await radio.count()) await radio.check();
          else if (await this.page.getByRole('radio').count()) throw Error('无法安全匹配工程澄清选项');
          row.clarifications.push({ question, answer: fixture.name });
          await confirmRenderPlan(this.page, { allowClarification: true });
        }
        await this.page.waitForTimeout(3000);
      }
      row.messages = (await readConversationMessages(this.page, row.conversationId)
        .catch(error => { throw transportError('原任务消息回读', error); })).filter(m => m.job_id === submission.runId);
      row.after = await this.get(fixture.id);
      row.unchanged = JSON.stringify(row.after.content) === JSON.stringify(fixture.before.content);
      row.pageText = (await this.page.locator('body').innerText()).slice(-10000);
      row.resultScreenshot = await this.shot(`${caseId}-result`);
      await this.record(`${caseId}-after`, row.after);
      await this.record(`${caseId}-execution`, row);
      return row;
    } catch (error) {
      row.observationError = transportError('观测未完成', error).message;
      row.resultScreenshot = await this.shot(`${caseId}-observation-interrupted`).catch(() => null);
      await this.record(`${caseId}-execution`, row);
      throw transportError('执行或回读中断', error);
    } finally {
      await this.context.storageState({ path: credentials.storageStatePath });
      const earlier: Json[] = await readFile(path.join(evidenceRoot, 'executions.json'), 'utf8')
        .then(value => JSON.parse(value)).catch(() => []);
      const runs = new Map(earlier.map(value => [value.submission?.runId || value.caseId, value]));
      for (const value of this.results) runs.set(value.submission?.runId || value.caseId, value);
      await this.record('executions', [...runs.values()]);
    }
  }
  async finish() {
    const after = await this.get(originalId);
    await this.record('user-original-after', after);
    expect(after.content, '用户原工程不应被测试修改').toEqual(this.original.content);
    expect(after.revision).toBe(this.original.revision);
    try {
      await this.page.locator('.ed-project-name').first().click();
      const escaped = String(this.original.content.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      await this.page.getByRole('button', { name: new RegExp(`^${escaped}`) }).last().click();
      await expect(this.page.locator('.ed-project-name').first()).toContainText(this.original.content.name);
      await this.record('original-view-restored', { restored: true, projectId: originalId, revision: after.revision });
      await this.shot('original-view-restored');
    } catch (error) {
      await this.record('original-view-restored', { restored: false, contentUnchanged: true, error: transportError('视图恢复', error).message });
    }
    await this.context.storageState({ path: credentials.storageStatePath });
  }
}

export function videoClips(row: Json) { return row.content.tracks.filter((t: Json) => t.type === 'video').flatMap((t: Json) => t.clips) as Json[]; }
export function expectRange(clip: Json, start: number, end: number, timeline: number) {
  expect(Math.abs(clip.source_in_sec - start)).toBeLessThan(1 / 30);
  expect(Math.abs(clip.source_out_sec - end)).toBeLessThan(1 / 30);
  expect(Math.abs(clip.timeline_start_sec - timeline)).toBeLessThan(1 / 30);
}
export function expectBusinessCompletion(row: Json) {
  expect(row.status, `run ${row.submission?.runId}; ${row.messages?.filter((m: Json) => m.role === 'assistant').map((m: Json) => m.error_msg || m.text?.slice(0, 180)).join('; ')}`).toBe('done');
  expect(JSON.stringify(row.messages)).not.toMatch(/Run failed before execution/i);
}
export function expectSpecificRejection(row: Json, before: Json) {
  const message = row.messages.filter((m: Json) => m.role === 'assistant')
    .map((m: Json) => `${m.text || ''} ${m.error_msg || ''}`).join('\n');
  expect(message, '通用任务失败不能证明无效参数防护').not.toMatch(/Run failed before execution/i);
  expect(message).toMatch(/不能|无法|无效|超出|超过|端点|边界|invalid|out.of.range|boundary|cannot.split|can.t.split|exceed/i);
  expect(row.after.content).toEqual(before.content);
  expect(row.after.revision, '无操作不应新增保存版本').toBe(before.revision);
}
