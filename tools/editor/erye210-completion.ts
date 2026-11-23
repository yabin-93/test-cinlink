import { randomUUID, createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { expect, type Locator, type Route } from '@playwright/test';
import { Navigation210, rails210 } from './erye210.js';
import { block210, seed210, workspace210, reopen210, editCaption210 } from './erye210-runner.js';
import { submitCurrentPrompt, findStringField } from '../../src/workspace.js';
type Json = Record<string, any>;
const originalC1 = 'Efforts to sabotage our healthcare by filing a formal';
export const media210 = (p: Json) => p.content.tracks.filter((t: Json) => ['video', 'audio'].includes(t.type) && t.clips.length)
  .map((t: Json) => ({ type: t.type, role: t.role || '', muted: !!t.muted, offset: t.offset_sec || 0,
    clips: t.clips.map((c: Json) => ({ file: c.file_id, start: c.timeline_start_sec, in: c.source_in_sec, out: c.source_out_sec, rate: c.playback_rate, volume: c.volume })) }));
const undo = (n: Navigation210) => n.page.getByRole('button', { name: '撤销', exact: true });
const redo = (n: Navigation210) => n.page.getByRole('button', { name: '重做', exact: true });
const saveText = async (input: Locator, text: string) => { await input.fill(text); await input.blur(); };

export async function oldVoice210(n: Navigation210, id: string) {
  const s = structuredClone(await seed210(n, 'VOICE')); delete s.content.voiceover_sources;
  // Prepare the two original voices in this project through the published UI.
  // Copying legacy audio while discarding its script projection is not a valid native baseline.
  s.content.dubbing = [];
  s.content.tracks = s.content.tracks.filter((t: Json) => !(t.type === 'audio' && t.role === 'dubbing'));
  const f = await n.copy(workspace210(), id, s); await n.choose('配音');
  await n.page.getByRole('button', { name: '创建配音', exact: true }).click();
  await expect.poll(async () => (await n.get(f.pid)).content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length || 0, { timeout: 180000 }).toBe(2);
  const input = n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true });
  await expect(input).toHaveValue('欢迎使用 CinLink。', { timeout: 60000 });
  await reopen210(n, f, '配音'); await expect(input).toBeEnabled();
  const before = await n.get(f.pid);
  await n.record('017-native-baseline-private', before);
  if (before.content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length !== 2) block210('缺少两句真实已就绪配音基线');
  return { f, before, input };
}

export async function case017(n: Navigation210) {
  const verify = process.env.CINLINK_ERYE210_017_VERIFY_DIR;
  if (verify) {
    const f = JSON.parse(await readFile(path.join(verify, '017-v2-location.json'), 'utf8'));
    const before = JSON.parse(await readFile(path.join(verify, '017-native-baseline-private.json'), 'utf8'));
    const original = JSON.parse(await readFile(path.join(verify, 'result.json'), 'utf8'));
    n.prepared['017-v2'] = f; await n.enterConversation(f.cid); await n.open(f.name); await n.choose('配音');
    await expect(n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true })).toHaveValue('欢迎回到CinLink，这是第十七条测试。');
    await expect(n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true })).toHaveValue('这是导航测试。');
    const after = await n.get(f.pid), oldIds = before.content.dubbing.map((d: Json) => d.audio_file_id);
    expect(after.content.dubbing.some((d: Json) => d.audio_file_id === oldIds[1] && d.audio_state === 'ready')).toBe(true);
    expect(after.content.tracks.filter((t: Json) => t.type === 'audio').flatMap((t: Json) => t.clips).some((c: Json) => c.file_id === oldIds[0])).toBe(false);
    expect(after.content.tracks.filter((t: Json) => t.type === 'subtitle')).toEqual(before.content.tracks.filter((t: Json) => t.type === 'subtitle'));
    n.checks.push(...original.checks, { stage: 'same-original-generation-live-verification', project: f, firstText: '欢迎回到CinLink，这是第十七条测试。', secondText: '这是导航测试。', oldFirstAudioRemoved: true, secondAudioPreserved: true, submittedNewTask: false });
    await n.shot('017-original-result-live-verified'); return;
  }
  const { f, before, input } = await oldVoice210(n, '017-v2');
  const secondText = await n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true }).inputValue();
  const oldIds = before.content.dubbing.map((d: Json) => d.audio_file_id);
  const text = '欢迎回到CinLink，这是第十七条测试。'; await saveText(input, text);
  await n.choose('字幕'); await n.choose('配音'); await expect(input).toHaveValue(text);
  const pending = await n.get(f.pid); expect(pending.content.dubbing.map((d: Json) => d.audio_file_id)).toEqual(oldIds);
  const generate = n.page.locator('.ed-voice-panel').getByRole('button', { name: /重新生成|生成配音|Regenerate|Generate voice/ });
  await expect(generate).toHaveCount(1); await expect(generate).toBeEnabled(); await n.shot('017-pending-old-voice');
  let aborted = 0;
  const abort = async (route: Route) => {
    const r = route.request(); let b: Json = {}; try { b = r.postDataJSON() || {}; } catch {}
    if (!aborted && r.method() === 'POST' && b.method === 'editor.task.submit' && b.params?.task_type === 'dubbing.generate'
      && JSON.stringify(b).includes(f.pid)) { aborted++; await route.abort('internetdisconnected'); } else await route.continue();
  };
  await n.page.route('**/cloud-tool-api/mcp**', abort);
  try { await generate.click(); await expect.poll(() => aborted).toBe(1); }
  finally { await n.page.unroute('**/cloud-tool-api/mcp**', abort); }
  const errors = n.page.locator('.ed-voice-panel [role=alert]'); await expect(errors).toBeVisible();
  const failed = await n.get(f.pid); expect(failed.content.dubbing.map((d: Json) => d.audio_file_id)).toEqual(oldIds);
  await expect(input).toHaveValue(text); await n.shot('017-real-submission-error');
  n.checks.push({ stage: 'client-submit-error', aborted, error: await errors.innerText(), oldAudioPreserved: true });
  // Deliberate recovery is a case step, not an automatic retry of an accepted task.
  await generate.click();
  await expect.poll(async () => (await n.get(f.pid)).content.dubbing.some((d: Json) => d.audio_state === 'ready' && d.audio_file_id && !oldIds.includes(d.audio_file_id)), { timeout: 180000 }).toBe(true);
  const after = await n.get(f.pid); await n.record('017-after-regenerate-private', after);
  expect(after.content.dubbing.some((d: Json) => d.audio_file_id === oldIds[1])).toBe(true);
  expect(after.content.tracks.filter((t: Json) => t.type === 'audio').flatMap((t: Json) => t.clips).some((c: Json) => c.file_id === oldIds[0]), '成功后目标旧音频不应留在时间线上叠音').toBe(false);
  expect(after.content.tracks.filter((t: Json) => t.type === 'subtitle')).toEqual(before.content.tracks.filter((t: Json) => t.type === 'subtitle'));
  await reopen210(n, f, '配音'); await expect(input).toHaveValue(text);
  await expect(n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true })).toHaveValue(secondText);
  n.checks.push({ stage: 'explicit-recovery', oldIds, newIds: after.content.dubbing.map((d: Json) => d.audio_file_id), pid: f.pid, remoteExecutionFailureCovered: false });
  await n.shot('017-recovered');
}

export async function backgroundSeed210(n: Navigation210) {
  const s = structuredClone(await seed210(n));
  const v = await seed210(n, 'VOICE'); const d = v.content.dubbing.find((d: Json) => d.audio_file_id && d.audio_state === 'ready');
  const clip = v.content.tracks.filter((t: Json) => t.type === 'audio').flatMap((t: Json) => t.clips).find((c: Json) => c.file_id === d?.audio_file_id);
  if (!clip) block210('缺少本账号真实可用的独立WAV音频，未伪造媒体');
  const a = { ...structuredClone(clip), clip_id: randomUUID(), timeline_start_sec: 22, volume: 1 }; delete a.speech_source;
  const trackId = randomUUID();
  s.content.tracks.push({ track_id: trackId, type: 'audio', role: 'background', muted: false, offset_sec: 0, linked_video_track_id: null, clips: [a] });
  return { s, trackId, clipId: a.clip_id, fileId: a.file_id };
}
async function selectClip(n: Navigation210, target: Locator, shift = false) {
  await expect(target).toHaveCount(1); await expect(target).toBeVisible(); const box = await target.boundingBox();
  if (!box) block210('目标片段不可见，未选择其他对象');
  await target.click({ position: { x: box!.width / 2, y: Math.max(2, box!.height - 4) }, modifiers: shift ? ['Shift'] : [] });
}
export async function case019(n: Navigation210) {
  const { s, trackId } = await backgroundSeed210(n); const f = await n.copy(workspace210(), '019-v3', s);
  const first = n.page.locator('.ed-timeline-clip').filter({ hasText: originalC1 });
  const audio = n.page.locator(`.ed-track-row[data-track-id="${trackId}"] .ed-timeline-clip`);
  await n.choose('字幕'); const before = await n.get(f.pid);
  const originalText = await n.page.locator('.ed-caption-text').allTextContents();
  await selectClip(n, first); await selectClip(n, audio, true);
  await expect(n.page.locator('.ed-timeline-clip.is-selected')).toHaveCount(2); await n.shot('019-two-legal-targets');
  await n.page.locator('.ed-timeline').press('Delete');
  await expect(first).toHaveCount(0); await expect(audio).toHaveCount(0); const after = await n.get(f.pid);
  await n.shot('019-after-delete');
  expect.soft(media210(after)).toEqual(media210(before).filter((t: Json) => t.type !== 'audio' || !t.clips.some((c: Json) => c.file === s.content.tracks.find((t: Json) => t.track_id === trackId).clips[0].file_id)));
  await n.choose('字幕'); expect.soft(await n.page.locator('.ed-caption-text').allTextContents()).toEqual(originalText.filter(t => t !== originalC1));
  await undo(n).click(); await expect(first).toHaveCount(1); await expect(audio).toHaveCount(1);
  const restored = await n.get(f.pid); expect.soft(media210(restored)).toEqual(media210(before));
  for (const module of rails210) await n.choose(module);
  await reopen210(n, f, '字幕'); expect(await n.page.locator('.ed-caption-text').allTextContents()).toEqual(originalText);
  n.checks.push({ stage: 'legal-mixed-delete-undo', beforeMedia: media210(before), deletedMedia: media210(after), restoredMedia: media210(restored), selectedCount: 2, restrictedDeleteCovered: false });
  await n.shot('019-one-undo-restored');
}

export async function case050(n: Navigation210) {
  const f = await n.copy(workspace210(), '050', await seed210(n, 'WATERMARK')); const before = await n.get(f.pid);
  for (const module of rails210) {
    await n.choose(module); await expect(n.page.locator('.ed-project-trigger')).toBeVisible();
    await expect(undo(n)).toBeVisible(); await expect(redo(n)).toBeVisible();
    await expect(n.page.getByRole('button', { name: /^(导出|Export)$/ })).toBeVisible();
  }
  await saveText(await editCaption210(n, originalC1), '全局历史050'); await n.choose('水印'); await n.sub('文字水印');
  const mark = n.page.locator('.ed-watermark-panel textarea'); const oldMark = before.content.watermarks.text.text;
  await saveText(mark, '全局水印050');
  await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.text).toBe('全局水印050'); await n.shot('050-two-module-edits');
  await n.choose('媒体'); await undo(n).click();
  await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.text).toBe(oldMark);
  await undo(n).click(); await n.choose('字幕'); await expect(n.page.locator('.ed-inspector').getByRole('button', { name: originalC1, exact: true })).toBeVisible();
  await redo(n).click(); await expect(n.page.locator('.ed-inspector').getByRole('button', { name: '全局历史050', exact: true })).toBeVisible();
  await redo(n).click(); await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.text).toBe('全局水印050');
  await reopen210(n, f, '字幕'); await expect(n.page.locator('.ed-inspector').getByRole('button', { name: '全局历史050', exact: true })).toBeVisible();
  const after = await n.get(f.pid); expect(media210(after)).toEqual(media210(before));
  n.checks.push({ stage: 'global-history', operations: ['caption', 'watermark', 'undo-watermark', 'undo-caption', 'redo-caption', 'redo-watermark'], oldMark, finalMark: after.content.watermarks.text.text, mediaUnchanged: true });
  await n.shot('050-redone-and-reopened');
}

export async function case053(n: Navigation210) {
  const f = await n.copy(workspace210(), '053', await seed210(n)); const before = await n.get(f.pid);
  const original = n.page.viewportSize() || { width: 1800, height: 1000 };
  try {
    for (const size of [{ width: 1024, height: 768 }, { width: 1280, height: 900 }]) {
      await n.page.setViewportSize(size); await n.choose('媒体'); await n.rail('媒体').focus();
      for (let i = 0; i < rails210.length; i++) {
        const rail = n.rail(rails210[i]); await expect(rail).toBeVisible(); const box = await rail.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(size.width + 1);
        if (i) { await n.page.keyboard.press('Tab'); await expect(rail).toBeFocused(); await n.page.keyboard.press('Enter'); await n.expectPanel(rails210[i]); }
      }
      const exportButton = n.page.getByRole('button', { name: /^(导出|Export)$/ }); await expect(exportButton).toBeVisible();
      await exportButton.focus(); await expect(exportButton).toBeFocused();
      n.checks.push({ stage: 'windows-narrow-keyboard', size, modules: rails210, exportFocused: true, macCovered: false }); await n.shot(`053-${size.width}-keyboard`);
    }
  } finally { await n.page.setViewportSize(original); }
  await n.choose('字幕'); await n.unchanged(f.pid, before); await n.shot('053-original-size-restored');
}

export async function case054(n: Navigation210) {
  const folder = process.env.CINLINK_ERYE210_TRANSLATED_CASE_DIR;
  if (!folder) block210('未登记本轮真实完成的英语→中文翻译配音工程');
  const state = JSON.parse(await readFile(path.join(folder!, '011-agent-checkpoint.json'), 'utf8'));
  const resume = process.env.CINLINK_ERYE210_054_RESUME_DIR;
  const f = resume ? JSON.parse(await readFile(path.join(resume, '054-location.json'), 'utf8'))
    : await n.copy(workspace210(), '054', await n.get(state.pa.pid));
  if (resume) { n.prepared['054'] = f; await n.enterConversation(f.cid); await n.open(f.name); }
  // Warm actual editor projections before taking the navigation-only baseline.
  for (const module of rails210) await n.choose(module); await n.choose('字幕');
  let p = await n.get(f.pid);
  const zh = p.content.tracks.find((t: Json) => t.type === 'subtitle' && t.clips.some((c: Json) => /^zh/.test(c.language)));
  const en = p.content.tracks.find((t: Json) => t.type === 'subtitle' && t.clips.some((c: Json) => c.language === 'en'));
  if (!zh || !en) block210('真实结果中没有可区分的中文及英文两个字幕通道');
  for (const track of [zh, en]) {
    const row = n.page.locator(`.ed-track-row[data-track-id="${track.track_id}"]`);
    const toggle = row.getByRole('button', { name: /隐藏$|显示$/ }); await expect(toggle).toHaveCount(1);
    if ((await toggle.getAttribute('aria-label'))?.endsWith('隐藏')) await toggle.click();
    await expect(toggle).toHaveAttribute('aria-label', /显示$/); await toggle.click(); await expect(toggle).toHaveAttribute('aria-label', /隐藏$/);
  }
  await expect.poll(async () => {
    const saved = await n.get(f.pid);
    return [zh, en].every(t => saved.content.tracks.find((s: Json) => s.track_id === t.track_id)?.clips.every((c: Json) => c.visible !== false));
  }, { message: '两通道均已保存为显示，再记录导航基线' }).toBe(true);
  const before = await n.get(f.pid); await n.shot('054-explicit-bilingual');
  for (const module of rails210) await n.choose(module); await n.choose('字幕');
  for (const t of [zh, en]) await expect(n.page.locator(`.ed-track-row[data-track-id="${t.track_id}"]`).getByRole('button', { name: /隐藏$/ })).toHaveCount(1);
  const cue = zh.clips[0], binding = cue.bindings[0];
  // Select the actual Chinese channel; reopening can initially show the English file.
  const chineseC1 = n.page.locator(`.ed-track-row[data-track-id="${zh.track_id}"] .ed-timeline-clip`).first();
  await selectClip(n, chineseC1); await n.choose('字幕');
  const target = n.page.locator(`.ed-caption-text[data-file-id="${cue.file_id}"][data-block-id="${binding.block_id}"]`);
  await expect(target).toHaveCount(1); await target.click(); await saveText(n.page.getByRole('textbox', { name: '字幕文本', exact: true }), '双语独立编辑054');
  await expect(n.page.locator('.ed-inspector').getByRole('button', { name: '双语独立编辑054', exact: true })).toBeVisible();
  await expect(n.page.locator('.ed-save-status'), '等待页面明确已同步后刷新').toHaveText('已同步');
  await n.record('054-saved-before-reopen-private', await n.get(f.pid)); await n.shot('054-Chinese-edit-saved');
  await reopen210(n, f, '字幕'); await selectClip(n, chineseC1); await n.choose('字幕');
  await expect(n.page.locator('.ed-inspector').getByRole('button', { name: '双语独立编辑054', exact: true })).toBeVisible();
  const after = await n.get(f.pid); expect(after.content.tracks.find((t: Json) => t.track_id === en.track_id)).toEqual(before.content.tracks.find((t: Json) => t.track_id === en.track_id));
  expect(media210(after)).toEqual(media210(before));
  n.checks.push({ stage: 'explicit-bilingual-kept', sourceFile: en.clips[0].file_id, targetFile: cue.file_id, editedText: '双语独立编辑054', englishUnchanged: true, audioUnchanged: true, firstTranslationDefaultsCovered: false });
  await n.shot('054-independent-edit-reopened');
}

export async function case051(n: Navigation210) {
  const resume = process.env.CINLINK_ERYE210_051_RESUME_DIR;
  let state: Json; const checkpoint = path.join(resume || n.out, '051-checkpoint.json');
  if (!resume && existsSync(checkpoint)) block210('051本批已有检查点，请核对原任务并沿检查点续验，禁止覆盖或重复发送');
  if (resume) {
    state = JSON.parse(await readFile(checkpoint, 'utf8')); n.prepared['051'] = state.f;
    await n.enterConversation(state.f.cid); await n.open(state.f.name); await n.choose('字幕');
  } else {
    const prepared = await backgroundSeed210(n); prepared.s.content.tracks.find((t: Json) => t.track_id === prepared.trackId).clips[0].timeline_start_sec = 0;
    const f = await n.copy(workspace210(), '051', prepared.s); await n.choose('字幕');
    const before = await n.get(f.pid);
    const prompt = '只将当前工程中从0秒开始、音量100%的独立背景音轨降低6dB一次。保留音轨位置、原视频、原声、字幕和配音，不导出。';
    state = { f, before, trackId: prepared.trackId, prompt, attemptedAt: new Date().toISOString(), samples: [] };
    await n.record('051-checkpoint', state); await n.page.locator('#workspace-prompt').fill(prompt); await n.shot('051-prompt-captions');
    state.submission = await submitCurrentPrompt(n.page); await n.record('051-checkpoint', state);
    expect(state.submission.httpStatus).toBe(200); expect(state.submission.submitRequests).toBe(1);
  }
  if (!state.submission?.runId) block210('051提交状态未知，请核对原会话，禁止重发');
  const deadline = Date.now() + 480000; let assistant: Json | undefined;
  while (Date.now() < deadline) {
    const body = await n.messages(state.f.cid);
    assistant = body.messages?.find((m: Json) => m.role === 'assistant' && m.run_id === state.submission.runId);
    const view = await n.state(); state.samples.push({ at: Date.now(), status: assistant?.status, view });
    await writeFile(checkpoint, JSON.stringify(state, null, 2));
    if (/done|completed|failed|error|cancelled/.test(assistant?.status || '')) break;
    const confirmation = n.page.locator('.node-plan-review__actions button').filter({ hasText: /^(提交|Submit)$/ });
    if (await confirmation.count() === 1 && await confirmation.isVisible() && await confirmation.isEnabled()) {
      const planText = await confirmation.locator('xpath=../..').innerText();
      state.confirmedPlans ||= [];
      if (!state.confirmedPlans.includes(planText)) {
        state.confirmedPlans.push(planText); await writeFile(checkpoint, JSON.stringify(state, null, 2));
        await n.shot('051-confirm-plan'); await confirmation.click();
      }
    }
    const clarification = n.page.locator('.node-clarification:visible, .clarification-card:visible');
    if (await clarification.count()) {
      await n.record('051-clarification', { text: await clarification.innerText() }); await n.shot('051-clarification');
      block210('051出现原任务补槽：按唯一独立背景音轨、降低6dB填写后沿检查点继续，禁止重新发送');
    }
    await n.page.waitForTimeout(2000);
  }
  await n.record('051-terminal-private', { runId: state.submission.runId, assistant });
  if (!/done|completed/.test(assistant?.status || '')) {
    await n.record('051-terminal', { status: assistant?.status, error: assistant?.error_msg });
    if (/failed|error|cancelled/.test(assistant?.status || '')) expect(assistant?.status, '明确降低背景音量任务应成功').toMatch(/done|completed/);
    block210('051原任务仍未完成，保留原任务检查点，不重发');
  }
  const after = await n.get(state.f.pid); const bg = after.content.tracks.find((t: Json) => t.track_id === state.trackId);
  await n.shot('051-after-agent');
  n.checks.push({ stage: 'agent-background-volume', runId: state.submission.runId, before: state.before.content.tracks.find((t: Json) => t.track_id === state.trackId), after: bg, status: assistant!.status, view: await n.state() });
  expect.soft(bg?.clips[0].volume, '按页面音量精度核验约50%（-6dB）').toBeCloseTo(Math.pow(10, -6 / 20), 2);
  const withoutVolume = (t: Json) => ({ ...t, clips: t.clips.map(({ volume, ...clip }: Json) => clip) });
  if (bg) expect.soft(withoutVolume(bg)).toEqual(withoutVolume(state.before.content.tracks.find((t: Json) => t.track_id === state.trackId)));
  expect.soft(after.content.tracks.filter((t: Json) => t.track_id !== state.trackId)).toEqual(state.before.content.tracks.filter((t: Json) => t.track_id !== state.trackId));
  expect.soft(state.samples.every((x: Json) => x.view.name === state.f.name && x.view.module.includes('字幕')), 'Agent执行不得抢占Captions').toBe(true);
  await n.selectProject(state.f.name);
  const target = n.page.locator(`.ed-track-row[data-track-id="${state.trackId}"] .ed-timeline-clip`);
  await selectClip(n, target); const volume = target.getByRole('slider', { name: '调整片段音量', exact: true }); await expect(volume).toBeVisible();
  await volume.hover();
  const ariaValue = await volume.getAttribute('aria-valuenow');
  n.checks.push({ stage: 'explicit-volume-location', control: '音频轴上可上下拖拽的音量线', ariaValue, readOnly: true, manualDragPerformed: false, project: state.f });
  expect.soft(Number(ariaValue), '音量线应显示约50%').toBeCloseTo(Math.pow(10, -6 / 20) * 100, 0);
  await n.shot('051-real-volume-control');
}

async function nativeBackgroundHalf(n: Navigation210, trackId: string, pid: string) {
  const target = n.page.locator(`.ed-track-row[data-track-id="${trackId}"] .ed-timeline-clip`);
  await selectClip(n, target); const slider = target.getByRole('slider', { name: '调整片段音量', exact: true });
  await expect(slider).toBeVisible(); await slider.focus(); for (let i = 0; i < 10; i++) await slider.press('ArrowDown');
  await expect(slider).toHaveAttribute('aria-valuenow', '50');
  await expect.poll(async () => (await n.get(pid)).content.tracks.find((t: Json) => t.track_id === trackId).clips[0].volume).toBe(.5);
}
const execute = promisify(execFile);
export async function case052(n: Navigation210) {
  const resume = process.env.CINLINK_ERYE210_052_RESUME_DIR;
  let state: Json; const checkpoint = path.join(resume || n.out, '052-checkpoint.json');
  if (resume) {
    state = JSON.parse(await readFile(checkpoint, 'utf8')); n.prepared['052'] = state.f;
    await n.enterConversation(state.f.cid); await n.open(state.f.name);
    if (!state.exportAccepted) block210('052检查点未确认原导出受理，先核对原任务；禁止自动重发');
  } else {
    const prepared = await backgroundSeed210(n); prepared.s.content.tracks.find((t: Json) => t.track_id === prepared.trackId).clips[0].timeline_start_sec = 0;
    delete prepared.s.content.cleanup_analysis;
    const f = await n.copy(workspace210(), '052', prepared.s); state = { f, trackId: prepared.trackId, phase: 'prepared' }; await n.record('052-checkpoint', state);
    await n.choose('文稿'); await n.page.getByText('正在加载文稿…', { exact: true }).waitFor({ state: 'hidden', timeout: 45000 });
    const panel = n.page.locator('.ed-inspector').getByRole('region', { name: '文稿', exact: true });
    const analyze = panel.getByRole('button', { name: /^(重新分析|去除口水词|Remove filler words)$/ }); await expect(analyze).toHaveCount(1);
    state.phase = 'analysis-attempted'; await n.record('052-checkpoint', state); await analyze.click();
    const detect = panel.getByRole('button', { name: '口水词与停顿', exact: true }); await expect(detect).toBeEnabled({ timeout: 240000 });
    if (await detect.getAttribute('aria-expanded') !== 'true') await detect.click();
    const boxes = panel.getByRole('checkbox'); await expect(boxes).toHaveCount(2); await boxes.nth(0).uncheck(); await boxes.nth(1).check();
    const threshold = panel.getByRole('spinbutton', { name: /最短停顿/ }); await threshold.fill('0.8'); await threshold.blur();
    const count = await panel.locator('[data-token-id].is-pause.is-candidate').count(); if (!count) block210('052真实分析无可用停顿候选，不编造范围');
    const before = await n.get(f.pid); await panel.getByRole('button', { name: '移除', exact: true }).click();
    await expect.poll(async () => (await n.get(f.pid)).content.tracks.filter((t: Json) => t.type === 'video').flatMap((t: Json) => t.clips).reduce((a: number, c: Json) => a + (c.source_out_sec - c.source_in_sec) / c.playback_rate, 0)).toBeLessThan(20);
    const cleaned = await n.get(f.pid); await n.shot('052-cleaned');
    state.phase = 'cleaned'; state.cleanup = { count, before: media210(before), after: media210(cleaned) }; await n.record('052-checkpoint', state);
    await n.choose('配音'); const create = n.page.getByRole('button', { name: '创建配音', exact: true }); await expect(create).toBeVisible();
    state.phase = 'voice-create-attempted'; await n.record('052-checkpoint', state); await create.click();
    const first = n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true }); await expect(first).toBeVisible({ timeout: 180000 });
    await expect.poll(async () => (await n.get(f.pid)).content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length || 0, { timeout: 180000 }).toBeGreaterThan(0);
    const oldIds = (await n.get(f.pid)).content.dubbing.map((d: Json) => d.audio_file_id);
    await saveText(first, 'Welcome to CinLink.');
    const generate = n.page.locator('.ed-voice-panel').getByRole('button', { name: /重新生成|生成配音|Regenerate|Generate voice/ }); await expect(generate).toHaveCount(1);
    state.phase = 'voice-regenerate-attempted'; await n.record('052-checkpoint', state); await generate.click();
    await expect.poll(async () => (await n.get(f.pid)).content.dubbing.some((d: Json) => d.audio_state === 'ready' && d.audio_file_id && !oldIds.includes(d.audio_file_id)), { timeout: 180000 }).toBe(true);
    await n.shot('052-voice-ready'); await nativeBackgroundHalf(n, state.trackId, f.pid); await n.shot('052-background-half');
    // Distinct visible markers let the downloaded video prove the accepted export snapshot.
    await n.choose('水印'); await n.sub('文字水印'); await saveText(n.page.locator('.ed-watermark-panel textarea'), 'BEFORE052');
    await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text?.text).toBe('BEFORE052');
    state.beforeExport = await n.get(f.pid); state.phase = 'export-attempted'; await n.record('052-checkpoint', state);
    const response = n.page.waitForResponse(r => {
      if (r.request().method() !== 'POST' || !new URL(r.url()).pathname.includes('/cloud-tool-api/mcp')) return false;
      const data = r.request().postData() || ''; return /editor_export|export\.video/.test(data);
    }, { timeout: 45000 });
    await n.page.getByRole('button', { name: /^(导出|Export)$/ }).click(); const receipt = await response;
    const body = await receipt.json(); state.exportAccepted = { status: receipt.status(), body, taskId: findStringField(body, 'task_id'), at: Date.now() };
    state.phase = 'export-accepted'; await n.record('052-checkpoint', state); expect(receipt.ok()).toBe(true);
  }
  const f = state.f;
  if (!state.editedAfterExport) {
    const input = await editCaption210(n, originalC1); await saveText(input, '导出后新文052');
    await n.choose('水印'); await n.sub('文字水印'); await saveText(n.page.locator('.ed-watermark-panel textarea'), 'AFTER052');
    await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.text).toBe('AFTER052');
    state.editedAfterExport = true; state.afterEdit = await n.get(f.pid); await writeFile(checkpoint, JSON.stringify(state, null, 2));
    await n.shot('052-edited-after-export-accepted');
    await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click();
    await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.page.locator('#workspace-prompt').waitFor(); await n.open(f.name);
  }
  const deadline = Date.now() + 480000; let file: Json | undefined;
  while (Date.now() < deadline) {
    const messages = await n.messages(f.cid);
    file = messages.messages?.flatMap((m: Json) => m.result_files || []).find((x: Json) => x.kind === 'video' && (!x.project_id || x.project_id === f.pid));
    if (file) break;
    await n.page.waitForTimeout(2000);
  }
  if (!file) block210('052原导出尚未返回会话视频卡，保留受理检查点，不重新导出');
  await n.choose('字幕'); await expect(n.page.locator('.ed-inspector').getByRole('button', { name: '导出后新文052', exact: true })).toBeVisible();
  const current = await n.get(f.pid); expect(current.content.watermarks.text.text).toBe('AFTER052');
  const video = n.page.locator('.workspace-progress-artifacts .workspace-artifact-video-card video'); await expect(video).toHaveCount(1);
  await expect.poll(() => video.getAttribute('src')).toMatch(/^https:\/\//);
  const src = await video.getAttribute('src'); const mp4 = path.join(resume || n.out, '052-export.mp4');
  const digest = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
  const cached = existsSync(mp4) && state.result?.fileId === file.file_id && digest(await readFile(mp4)) === state.result.mp4Sha256;
  if (!cached) {
    const response = await fetch(src!, { signal: AbortSignal.timeout(120000) }); expect(response.ok).toBe(true);
    await writeFile(mp4, new Uint8Array(await response.arrayBuffer()));
  }
  const probe = await execute(process.env.CINLINK_FFPROBE || 'ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height', '-of', 'json', mp4]);
  const metadata = JSON.parse(probe.stdout); await n.record('052-export-probe', metadata);
  const renderedVideo = metadata.streams.find((s: Json) => s.codec_type === 'video');
  expect(renderedVideo?.width).toBe(state.beforeExport.content.canvas.width);
  expect(renderedVideo?.height).toBe(state.beforeExport.content.canvas.height);
  expect(metadata.streams.some((s: Json) => s.codec_type === 'audio')).toBe(true);
  const expectedDuration = Math.max(...state.beforeExport.content.tracks.filter((t: Json) => t.type === 'video').flatMap((t: Json) => t.clips)
    .map((c: Json) => c.timeline_start_sec + (c.source_out_sec - c.source_in_sec) / c.playback_rate));
  expect(Math.abs(Number(metadata.format.duration) - expectedDuration)).toBeLessThan(.2);
  const frame = path.join(resume || n.out, '052-export-frozen-frame.png');
  await execute('ffmpeg', ['-y', '-v', 'error', '-ss', '1', '-i', mp4, '-frames:v', '1', frame]);
  state.result = { fileId: file.file_id, name: file.name, metadata, frame: '052-export-frozen-frame.png', expectedMarker: 'BEFORE052', currentMarker: 'AFTER052',
    mp4Sha256: digest(await readFile(mp4)), frameSha256: digest(await readFile(frame)) };
  await writeFile(checkpoint, JSON.stringify(state, null, 2));
  n.checks.push({ stage: 'cross-module-export', cleanup: state.cleanup, fileId: file.file_id, metadata, markerReviewRequired: true, currentMarker: 'AFTER052', expectedExportMarker: 'BEFORE052' });
  await n.shot('052-export-result-current-edit');
  const reviewFile = process.env.CINLINK_ERYE210_052_REVIEW_FILE || path.join(resume || n.out, '052-visual-review.json');
  if (!existsSync(reviewFile)) block210('052原导出已完成且后续编辑已保存；需审核归档原始视频帧为BEFORE052、未混入AFTER052，再沿原检查点完成，不重新导出');
  const review = JSON.parse(await readFile(reviewFile, 'utf8'));
  expect(review.frameSha256).toBe(state.result.frameSha256); expect(review.mp4Sha256).toBe(state.result.mp4Sha256);
  expect(review.marker).toBe('BEFORE052'); expect(review.afterMarkerAbsent).toBe(true);
  n.checks.push({ stage: 'export-snapshot-visual-review', ...review });
}
