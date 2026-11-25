import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, type Response } from '@playwright/test';
import { submitCurrentPrompt, findStringField } from '../../src/workspace.js';
import { Navigation210, Prerequisite210 } from './erye210.js';

type Json = Record<string, any>;
const readJson = async (file: string) => JSON.parse(await readFile(file, 'utf8'));
const failPrerequisite = (reason: string): never => { throw new Prerequisite210(reason); };

/** One Agent translation/dubbing request, with a durable checkpoint for original-run continuation. */
export async function translatedDubbing011(n: Navigation210, workspace: string) {
  const resume = process.env.CINLINK_ERYE210_011_RESUME_DIR;
  const checkpoint = path.resolve(resume || n.out, '011-agent-checkpoint.json');
  let state: Json;
  if (resume) {
    state = await readJson(checkpoint);
    if (state.origin !== n.origin || !state.pa || !state.pb) failPrerequisite('原011检查点与当前环境不一致，未执行或重发任务');
    n.prepared['011-PA'] = state.pa; n.prepared['011-PB'] = state.pb;
    await n.enterConversation(state.pa.cid); await n.open();
    if (!state.submitted?.runId) failPrerequisite('原提交结果未知，先核对原会话；禁止重新发送');
    await n.selectProject(state.pb.name); await n.choose('媒体');
  } else {
    if (existsSync(checkpoint)) failPrerequisite('本批011已有检查点，请续跑原任务，不创建或重复发送');
    const seedId = process.env.CINLINK_ERYE210_SEED_PROJECT_ID;
    if (!seedId) failPrerequisite('未登记当前账号真实英语视频基线');
    const seed = process.env.CINLINK_ERYE210_011_SOURCE_SNAPSHOT
      ? await readJson(path.resolve(process.env.CINLINK_ERYE210_011_SOURCE_SNAPSHOT)) : await n.get(seedId!);
    const pa = await n.copy(workspace, '011-PA-EN-ZH', seed);
    const pb = await n.copy(workspace, '011-PB-CONTROL', seed, pa.cid);
    await n.choose('媒体'); const beforePB = await n.get(pb.pid);
    await n.selectProject(pa.name); await n.choose('配音');
    const beforePA = await n.get(pa.pid);
    const video = beforePA.content.tracks.filter((t: Json) => t.type === 'video').flatMap((t: Json) => t.clips || []);
    const seconds = Math.max(...video.map((c: Json) => c.timeline_start_sec + (c.source_out_sec - c.source_in_sec) / (c.playback_rate || 1)));
    const size = `${beforePA.content.canvas.width}×${beforePA.content.canvas.height}`;
    const prompt = `仅处理当前工程的唯一英语原片（约${seconds.toFixed(2)}秒，${size}）。按默认设置生成普通话配音和中英双语字幕，中文字幕与配音对应。保留画面、时长、分辨率和背景声，移除英语人声，不加水印。交付配音加字幕的MP4，并保留可编辑工程。`;
    state = { origin: n.origin, sourceLanguage: 'en', targetLanguage: 'zh', pa, pb, prompt,
      beforePA, beforePB, runIds: [], confirmations: [], clarifications: [], samples: [], violations: [] };
    await mkdir(n.out, { recursive: true });
    await writeFile(checkpoint, JSON.stringify(state, null, 2));
    await n.record('011-preparation', { pa, pb, sourceLanguage: 'en', targetLanguage: 'zh', prompt });
    await n.page.locator('#workspace-prompt').fill(prompt); await n.shot('011-PA-target-language-before-submit');
    // Persist the attempt before clicking; transport uncertainty must never cause a repeat.
    state.submitAttemptedAt = new Date().toISOString(); await writeFile(checkpoint, JSON.stringify(state, null, 2));
    const submission = await submitCurrentPrompt(n.page);
    state.submitted = { runId: submission.runId, httpStatus: submission.httpStatus, status: submission.status, submitRequests: submission.submitRequests };
    state.runIds.push(submission.runId); await writeFile(checkpoint, JSON.stringify(state, null, 2));
    expect(submission.httpStatus).toBeLessThan(300); expect(submission.runId).not.toBe(''); expect(submission.submitRequests).toBe(1);
    await n.selectProject(pb.name); await n.choose('媒体');
    state.pbEstablishedAt = Date.now(); state.pbEstablishedState = await n.state();
    await n.shot('011-PB-established');
  }
  const persist = () => writeFile(checkpoint, JSON.stringify(state, null, 2));
  const deadline = Date.now() + 600_000;
  while (Date.now() < deadline) {
    const body = await n.messages(state.pa.cid);
    const assistant = (body.messages || []).filter((m: Json) => m.role === 'assistant' && state.runIds.includes(m.run_id)).at(-1);
    const status = String(assistant?.status || '').toLowerCase();
    const view = await n.state().catch(() => ({ name: '', module: [] }));
    if (view.name !== state.pb.name || !(view.module as string[]).includes('媒体')) {
      if (!state.violations.some((v: Json) => v.type === 'view-stolen')) {
        state.violations.push({ type: 'view-stolen', at: Date.now(), view, status }); await n.shot('011-PB-view-stolen');
      }
    }
    const pb = await n.get(state.pb.pid);
    if (JSON.stringify(pb.content) !== JSON.stringify(state.beforePB.content)
      && !state.violations.some((v: Json) => v.type === 'PB-content-changed')) {
      state.violations.push({ type: 'PB-content-changed', at: Date.now(), revision: pb.revision });
      await n.record('011-PB-unexpected-content', { before: state.beforePB, after: pb }); await n.shot('011-PB-content-changed');
    }
    state.samples.push({ at: Date.now(), status, revisionPB: pb.revision, view });
    await persist();
    if (/failed|error|cancelled/.test(status)) {
      await n.record('011-agent-terminal', { runIds: state.runIds, assistant }); await n.shot('011-agent-failed');
      failPrerequisite('011原翻译配音任务' + status + '，保留原任务及新工程；不自动重发');
    }
    if (/completed|succeeded|^done$/.test(status)) {
      state.completed = { at: Date.now(), status }; await n.record('011-agent-terminal', { runIds: state.runIds, assistant });
      await n.shot('011-PB-after-completed'); await persist(); break;
    }
    // Confirm the actual displayed plan once. Clarifications are handled separately from plan confirmation.
    const plan = n.page.locator('.node-plan-review__actions button').filter({ hasText: /^(提交|Submit)$/ });
    if (await plan.count() === 1 && await plan.isVisible() && await plan.isEnabled()) {
      const card = plan.locator('xpath=../..'); const text = await card.innerText();
      if (!state.confirmations.some((c: Json) => c.text === text)) {
        state.confirmations.push({ text, attemptedAt: Date.now() }); await persist(); await n.shot('011-plan-before-confirm');
        const response = n.page.waitForResponse(r => r.request().method() === 'POST' && /confirmations|clarifications|\/turns$/.test(new URL(r.url()).pathname), { timeout: 30000 }).catch(() => null);
        await plan.click(); const confirmed = await response;
        if (confirmed) await recordResponse(confirmed, state);
        await persist();
      }
    }
    const form = n.page.locator('.node-clarification:visible, .clarification-card:visible').first();
    if (await form.count()) {
      await n.record('011-pending-clarification', { text: await form.innerText(), controls: await form.locator('input,textarea,select,button,[role=combobox]').evaluateAll(es => es.map(e => ({ tag: e.tagName, label: e.getAttribute('aria-label'), text: e.textContent, name: e.getAttribute('name'), value: (e as HTMLInputElement).value }))) });
      await n.shot('011-clarification-pending'); await persist();
      failPrerequisite('011出现澄清，待按本次英语→简体中文、20秒、默认普通话音色填写原表单后续跑；不重新发送');
    }
    await n.page.waitForTimeout(2000);
  }
  if (!state.completed) failPrerequisite('原011翻译配音未在观察窗口内完成；保留检查点与原任务，不重发');
  n.checks.push({ stage: 'agent-completed-background', runIds: state.runIds, pa: state.pa, pb: state.pb,
    sourceLanguage: state.sourceLanguage, targetLanguage: state.targetLanguage, pbEstablishedAt: state.pbEstablishedAt,
    completed: state.completed, violations: state.violations, pbState: await n.state() });
  expect.soft(state.violations, 'PA翻译配音后台处理不得抢占或串改PB').toEqual([]);
  // Discover actual result affordances; do not invent a card or select an arbitrary WAV.
  const buttons = await n.page.locator('button,a').evaluateAll(es => es.filter(e => e.getClientRects().length).map(e => ({ label: e.getAttribute('aria-label'), title: e.getAttribute('title'), text: e.textContent?.trim().slice(0, 160), href: e.getAttribute('href')?.split('?')[0] })));
  await n.record('011-result-affordances', { buttons }); await n.shot('011-real-result-cards');
  const entry = n.page.getByRole('button', { name: /^(编辑配音|编辑配音结果|打开配音工程|在编辑器中打开|打开工程|编辑视频|Open voiceover result|Edit voiceover)$/ });
  const directEntry = await entry.count() === 1;
  const artifacts = await n.page.locator('.workspace-progress-artifacts').evaluateAll(es => es.map(e => ({
    text: e.textContent, buttons: Array.from(e.querySelectorAll('button')).map(b => ({
      label: b.getAttribute('aria-label'), title: b.getAttribute('title'), text: b.textContent,
    })),
  })));
  state.resultEntry = { directEntry, artifacts, verified: false };
  await n.record('011-result-entry', state.resultEntry);
  if (directEntry) {
    await entry.click(); await n.open(state.pa.name); state.resultEntry.verified = true;
  } else {
    // Manual project selection verifies the generated content, never the missing card shortcut.
    await n.selectProject(state.pa.name);
  }
  await n.choose('配音');
  // A project loaded while the Agent was running can retain its old editor snapshot.
  // Reopen the saved result before evaluating an apparent empty panel; retain both screenshots.
  await n.shot('011-PA-before-result-reopen');
  await n.page.reload({ waitUntil: 'domcontentloaded' });
  await n.page.locator('#workspace-prompt').waitFor(); await n.open(state.pa.name); await n.choose('配音');
  await expect.poll(() => n.page.locator('.ed-voice-panel textarea').count(), { timeout: 30000 }).toBeGreaterThan(0);
  const texts = await n.page.locator('.ed-voice-panel textarea').evaluateAll(es => es.map(e => (e as HTMLTextAreaElement).value));
  expect(texts.every(t => /[\u4e00-\u9fff]/.test(t)), '目标语言中文配音文稿须真实显示').toBe(true);
  const project = await n.get(state.pa.pid);
  expect(project.content.name).toBe(state.pa.name);
  const translations = (project.content.tracks || []).flatMap((t: Json) => t.type === 'subtitle' ? t.clips || [] : [])
    .filter((c: Json) => /^zh(?:-|$)/i.test(c.language));
  const audioClips = (project.content.tracks || []).filter((t: Json) => t.type === 'audio' && t.role === 'narration')
    .flatMap((t: Json) => t.clips || []).filter((c: Json) => c.file_id);
  expect(translations.length, '结果有真实中文字幕').toBeGreaterThan(0);
  expect(audioClips.length, '结果有真实生成配音音频').toBeGreaterThan(0);
  await n.shot('011-target-language-result-project');
  await n.record('011-result-visible-content', { texts, translations: translations.map((c: Json) => ({ fileId: c.file_id, language: c.language })), audioClips: audioClips.map((c: Json) => ({ fileId: c.file_id, start: c.timeline_start_sec })) });
  await n.unchanged(state.pb.pid, state.beforePB);
  state.resultProject = { pid: state.pa.pid, name: state.pa.name, voiceoverTextCount: texts.length,
    chineseSubtitleFiles: translations.map((c: Json) => c.file_id), generatedAudioCount: audioClips.length,
    reachedBy: directEntry ? 'result-entry' : 'explicit-project-picker-and-reopen' };
  await persist(); n.checks.push({ stage: 'target-language-content', ...state.resultProject });
  n.checks.push({ stage: 'result-entry', ...state.resultEntry });
  // v3 accepts the published project picker followed by the actual Voiceover rail.
  // The retired v2 shortcut expectation remains an explicitly deferred branch.
  n.checks.push({ stage: 'v3-explicit-editor-navigation', passed: true,
    entry: directEntry ? 'result-editor-entry' : 'project-picker-then-Voiceover',
    directResultShortcutCovered: directEntry, oldShortcutRequirement: 'deferred-not-counted-as-covered' });
}

async function recordResponse(response: Response, state: Json) {
  const body = await response.json().catch(() => null); const runId = findStringField(body, 'run_id');
  if (runId && !state.runIds.includes(runId)) state.runIds.push(runId);
}
