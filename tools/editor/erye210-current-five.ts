import { createHash, randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { expect, type Locator } from '@playwright/test';
import { Navigation210 } from './erye210.js';
import { block210, seed210, workspace210, reopen210 } from './erye210-runner.js';
import { media210 } from './erye210-completion.js';
import { findStringField } from '../../src/workspace.js';
type Json = Record<string, any>;
const execute = promisify(execFile);
const digest = (b: Uint8Array) => createHash('sha256').update(b).digest('hex');
const subtitles = (p: Json) => p.content.tracks.filter((t: Json) => t.type === 'subtitle');
const videos = (p: Json) => p.content.tracks.filter((t: Json) => t.type === 'video');
const audioClips = (p: Json) => p.content.tracks.filter((t: Json) => t.type === 'audio').flatMap((t: Json) => t.clips);
const voiceClips = (p: Json) => p.content.tracks.filter((t: Json) => t.type === 'audio' && ['dubbing', 'narration'].includes(t.role)).flatMap((t: Json) => t.clips);
const hasRealVoices = (p: Json) => voiceClips(p).filter((c: Json) => c.file_id).length >= 2;
const duration = (p: Json) => Math.max(0, ...videos(p).flatMap((t: Json) => t.clips.map((c: Json) =>
  (t.offset_sec || 0) + c.timeline_start_sec + (c.source_out_sec - c.source_in_sec) / (c.playback_rate || 1))));
const saved = async (n: Navigation210) => expect(n.page.locator('.ed-save-status')).toHaveText('已同步');
async function fill(n: Navigation210, input: Locator, value: string) { await input.fill(value); await input.blur(); await saved(n); }
async function select(n: Navigation210, clip: Locator) {
  await expect(clip).toHaveCount(1); await clip.scrollIntoViewIfNeeded(); const b = await clip.boundingBox();
  if (!b) block210('目标时间线片段不可见，未任意选择其他对象');
  await clip.click({ position: { x: b!.width / 2, y: Math.max(2, b!.height - 4) } });
}
function row(n: Navigation210, trackId: string) { return n.page.locator(`.ed-track-row[data-track-id="${trackId}"]`); }
async function fresh(n: Navigation210, id: string, seed: Json) {
  if (existsSync(path.join(n.out, 'checkpoint.json'))) block210('本批次已有原工程检查点；先核对原结果并以续跑模式继续，不自动新建重复任务');
  const f = await n.copy(workspace210(), id, seed);
  const state: Json = { id, f, workspaceId: workspace210(), checks: [] }; await n.record('checkpoint', state); return state;
}
async function continued(n: Navigation210, id: string, module: string): Promise<Json | null> {
  const folder = process.env.CINLINK_ERYE210_FIVE_RESUME_DIR;
  if (!folder) return null;
  const s: Json = JSON.parse(await readFile(path.join(folder, 'checkpoint.json'), 'utf8'));
  expect(s.id).toBe(id); n.prepared[id] = s.f; n.checks.push(...(s.checks || []));
  await n.enterConversation(s.f.cid); await n.open(s.f.name); await n.choose(module); return s;
}
async function checkpoint(n: Navigation210, s: Json) { s.checks = structuredClone(n.checks); await n.record('checkpoint', s); }


export async function current045(n: Navigation210) {
  const s = await fresh(n, '045', await seed210(n)); const pa = s.f;
  await n.choose('媒体'); await n.page.locator('.ed-inspector').getByRole('button', { name: '聊天', exact: true }).click();
  const name = 'ERYE210-045-shared-20261116.wav', input = path.join(n.out, name);
  await copyFile(path.resolve('reports/yunxiao/ERYE210-019-INDEPENDENT-AUDIO-DELETE-PROD-20261113-input/A1-independent.wav'), input);
  const chooser = n.page.waitForEvent('filechooser');
  await n.page.locator('.ed-inspector').getByRole('button', { name: '导入素材', exact: true }).click();
  await (await chooser).setFiles(input);
  const add = n.page.getByRole('button', { name: `将 ${name} 添加到时间轴`, exact: true });
  await expect(add).toHaveCount(1, { timeout: 60000 });
  const seek = n.page.getByRole('slider', { name: '预览播放进度', exact: true }); await seek.press('End');
  expect(Number(await seek.inputValue())).toBeCloseTo(20, 1); await add.focus(); await add.press('Enter');
  const originalAudioCount = audioClips(await seed210(n)).length;
  await expect.poll(async () => audioClips(await n.get(pa.pid)).length).toBeGreaterThan(originalAudioCount);
  await saved(n); const paWith = await n.get(pa.pid);
  const bg = paWith.content.tracks.find((t: Json) => t.type === 'audio' && t.clips.some((c: Json) => c.timeline_start_sec >= 19.99));
  expect(bg, '明确导入的独立音频在原20秒画面后').toBeTruthy(); const file = bg.clips[0].file_id;
  const pb = await n.copy(workspace210(), '045-PB', paWith, pa.cid); s.pb = pb; s.sharedFile = file;
  await n.choose('媒体'); await saved(n); const pbBefore = await n.get(pb.pid);
  await n.selectProject(pa.name); await select(n, row(n, bg.track_id).locator('.ed-timeline-clip'));
  await n.shot('045-two-projects-shared-before-delete'); await n.page.locator('.ed-timeline').press('Delete');
  await expect.poll(async () => audioClips(await n.get(pa.pid)).some((c: Json) => c.file_id === file)).toBe(false); await saved(n);
  const paDeleted = await n.get(pa.pid); expect(videos(paDeleted)).toEqual(videos(paWith)); expect(subtitles(paDeleted)).toEqual(subtitles(paWith));
  expect(media210(paDeleted)).toEqual(media210(paWith).filter((t: Json) => !t.clips.some((c: Json) => c.file === file)));
  await n.selectProject(pb.name); await n.choose('媒体');
  expect(media210(await n.get(pb.pid))).toEqual(media210(pbBefore)); expect(subtitles(await n.get(pb.pid))).toEqual(subtitles(pbBefore));
  const slider = n.page.getByRole('slider', { name: '预览播放进度', exact: true });
  const bounds = await slider.boundingBox(); const max = Number(await slider.getAttribute('max'));
  if (!bounds || max <= 20.2) block210('共享音频区间未可定位，未以原片其他时段替代播放检查');
  await slider.click({ position: { x: Math.max(1, Math.min(bounds!.width - 1, bounds!.width * 20.1 / max)), y: bounds!.height / 2 } });
  const time = Number(await slider.inputValue()); await n.page.getByRole('button', { name: '预览播放', exact: true }).click();
  await expect.poll(async () => Number(await slider.inputValue())).toBeGreaterThan(time);
  const pause = n.page.getByRole('button', { name: '预览暂停', exact: true }); if (await pause.isVisible()) await pause.click();
  await n.shot('045-PB-shared-audio-preserved');
  await n.selectProject(pa.name); await n.choose('媒体'); await n.page.locator('.ed-inspector').getByRole('button', { name: '聊天', exact: true }).click();
  await expect(add).toHaveCount(1); await seek.press('End'); await add.focus(); await add.press('Enter');
  await expect.poll(async () => audioClips(await n.get(pa.pid)).some((c: Json) => c.file_id === file)).toBe(true); await saved(n);
  await reopen210(n, pa, '媒体'); expect(audioClips(await n.get(pa.pid)).some((c: Json) => c.file_id === file)).toBe(true);
  expect(media210(await n.get(pb.pid))).toEqual(media210(pbBefore));
  n.checks.push({ stage: 'shared-reference-delete-reuse', pa, pb, sharedFile: file, deleteOnlyPA: true, PBPlayable: true, sameOriginalFileReused: true });
  await checkpoint(n, s); await n.shot('045-original-material-reused');
}

async function analysis(n: Navigation210, s: Json, phase: string) {
  await n.choose('文稿'); const panel = n.page.locator('.ed-inspector').getByRole('region', { name: '文稿', exact: true });
  await n.page.getByText('正在加载文稿…', { exact: true }).waitFor({ state: 'hidden', timeout: 45000 });
  if (!s[phase]?.ready && await panel.getByRole('button', { name: /^(重新分析|去除口水词|Remove filler words)$/ }).count() === 0) {
    n.checks.push({ stage: 'analysis-entry-unavailable', phase, text: await panel.innerText(), buttons: await panel.getByRole('button').evaluateAll(es => es.map(e => ({ text: e.textContent, label: e.getAttribute('aria-label') }))), targetSubmissionMade: false });
    await checkpoint(n, s); await n.shot('046-current-analysis-entry-unavailable');
    block210('已完成首次清理，但当前文稿页面（刷新重开亦同）没有明确重新分析入口；二次分析和已删除源区间复用分支未执行，不以脚本定位失败判算法缺陷');
  }
  if (!s[phase]) {
    s[phase] = { attemptedAt: new Date().toISOString() }; await checkpoint(n, s);
    const start = panel.getByRole('button', { name: /^(重新分析|去除口水词|Remove filler words)$/ });
    await expect(start).toHaveCount(1); await expect(start).toBeEnabled(); await start.click();
    const until = Date.now() + 240000;
    while (Date.now() < until && !await panel.getByRole('button', { name: '口水词与停顿', exact: true }).isEnabled().catch(() => false)) {
      expect(await n.page.getByRole('alert').allTextContents(), '明确分析应形成候选，不应停留页面错误').toEqual([]); await n.page.waitForTimeout(1500);
    }
    await expect(panel.getByRole('button', { name: '口水词与停顿', exact: true })).toBeEnabled();
    s[phase].ready = true; await checkpoint(n, s);
  } else if (!s[phase].ready) block210('原分析已尝试，先核对原任务完成状态，不自动重新提交');
  const toggle = panel.getByRole('button', { name: '口水词与停顿', exact: true });
  if (await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
  const boxes = panel.getByRole('checkbox'); await expect(boxes).toHaveCount(2);
  await boxes.nth(0).uncheck(); await boxes.nth(1).check();
  const threshold = panel.getByRole('spinbutton', { name: /最短停顿/ }); await threshold.fill('0.8'); await threshold.blur(); return panel;
}
export async function current046(n: Navigation210) {
  const seed = structuredClone(await seed210(n)); delete seed.content.cleanup_analysis;
  const s = await continued(n, '046', '文稿') || await fresh(n, '046', seed); const f = s.f;
  if (!s.cleaned) {
    const panel = await analysis(n, s, 'firstAnalysis'); s.before = await n.get(f.pid);
    const candidates = panel.locator('[data-token-id].is-pause.is-candidate');
    if (!await candidates.count()) block210('真实分析没有有效停顿候选，无法准备已清理基线');
    s.firstCandidates = await candidates.evaluateAll(es => es.map(e => ({ id: e.getAttribute('data-token-id'), title: e.getAttribute('title') })));
    await n.shot('046-first-analysis-before-cleanup'); await panel.getByRole('button', { name: '移除', exact: true }).click();
    await expect.poll(async () => duration(await n.get(f.pid))).toBeLessThan(duration(s.before)); await saved(n);
    s.cleaned = await n.get(f.pid); await checkpoint(n, s); await n.shot('046-first-cleanup-saved');
  }
  const before = s.cleaned;
  await n.choose('文稿');
  if (!s.secondAnalysis?.ready && await n.page.locator('.ed-inspector').getByRole('button', { name: /^(重新分析|去除口水词|Remove filler words)$/ }).count() === 0) {
    // The published page has no repeat-analysis button after a successful cleanup.
    // Use its existing conversation input with an explicit analysis-only instruction.
    if (s.secondConversation?.attemptedAt && !s.secondConversation.completed)
      block210('本工程会话二次分析已有原任务检查点，先核对原任务，不重复发送');
    if (!s.secondConversation?.completed) {
      const retained = videos(before).flatMap((t: Json) => t.clips.map((c: Json) => `${c.source_in_sec.toFixed(3)}～${c.source_out_sec.toFixed(3)}秒`));
      const prompt = `只分析当前工程已保留的片段（共${duration(before).toFixed(6)}秒，源区间${retained.join('、')}）。识别口水词及至少0.8秒的停顿，列出候选后等待审核。保留当前时间线和全部内容，不应用候选或生成成片。`;
      s.secondConversation = { attemptedAt: new Date().toISOString(), prompt }; await checkpoint(n, s); await n.shot('046-before-explicit-conversation-reanalysis');
      const receipt = await n.agentPreparation('005', f.cid, prompt);
      s.secondConversation.completed = { at: new Date().toISOString(), runId: receipt.run_id || receipt.job_id, status: receipt.status };
      await checkpoint(n, s); await reopen210(n, f, '文稿');
      const candidate = await n.get(f.pid);
      if (!candidate.content.cleanup_analysis?.analysis_id || candidate.content.cleanup_analysis.analysis_id === before.content.cleanup_analysis?.analysis_id)
        block210('已通过会话提交明确只分析指令，但新结果尚未进入同一已清理工程；保留原任务，不能用旧候选判二次分析通过');
    }
    s.secondAnalysis = { ready: true, entry: 'existing-conversation-input', ...s.secondConversation.completed }; await checkpoint(n, s);
  }
  const panel = await analysis(n, s, 'secondAnalysis'); const after = await n.get(f.pid);
  expect(media210(after), '再次分析不能自动重复裁剪').toEqual(media210(before)); expect(subtitles(after)).toEqual(subtitles(before));
  const ranges = videos(before).flatMap((t: Json) => t.clips.map((c: Json) => ({ start: c.source_in_sec, end: c.source_out_sec }))).sort((a: Json, b: Json) => a.start - b.start);
  const removed: Json[] = []; let end = 0; for (const r of ranges) { if (r.start > end + .001) removed.push({ start: end, end: r.start }); end = Math.max(end, r.end); }
  if (end < duration(s.before) - .001) removed.push({ start: end, end: duration(s.before) });
  const ids = await panel.locator('[data-token-id].is-pause.is-candidate').evaluateAll(es => es.map(e => e.getAttribute('data-token-id')));
  const result = after.content.cleanup_analysis?.result; const candidates = (result?.candidates || []).filter((c: Json) => ids.includes(c.candidate_id));
  if (ids.length && result?.coordinate_space !== 'source_media') block210('候选以非原素材时码展示，需逐项人工对照保留片段，未猜测坐标');
  const reused = candidates.filter((c: Json) => removed.some(r => Math.min(r.end, c.suggested_end_sec ?? c.end_sec) - Math.max(r.start, c.suggested_start_sec ?? c.start_sec) > .02));
  n.checks.push({ stage: 'reanalyze-cleaned-project', removedSourceRanges: removed, visibleCandidateIds: ids, candidateRanges: candidates.map((c: Json) => ({ id: c.candidate_id, start: c.suggested_start_sec ?? c.start_sec, end: c.suggested_end_sec ?? c.end_sec })), reusedRemovedRanges: reused, beforeSeconds: duration(before), afterSeconds: duration(after), automaticallyApplied: false });
  await checkpoint(n, s); await n.shot('046-second-analysis-review'); expect(reused, '新候选不得再次指向已删除的源区间').toEqual([]);
  await reopen210(n, f, '字幕'); const reopened = await n.get(f.pid); expect(media210(reopened)).toEqual(media210(before)); expect(subtitles(reopened)).toEqual(subtitles(before));
  const source = reopened.content.tracks.filter((t: Json) => t.type === 'audio' && t.role === 'source').flatMap((t: Json) => t.clips.map((c: Json) => (t.offset_sec || 0) + c.timeline_start_sec + (c.source_out_sec - c.source_in_sec) / c.playback_rate));
  expect(Math.max(...source)).toBeCloseTo(duration(before), 5); await n.shot('046-reanalysis-reopened-no-second-cut');
}

async function voiceFixture(n: Navigation210, id: string, background: boolean) {
  const directFile = process.env[`CINLINK_ERYE210_DIRECT_FIXTURE_${id}`];
  if (directFile && !process.env.CINLINK_ERYE210_FIVE_RESUME_DIR) {
    const state: Json = JSON.parse(await readFile(directFile, 'utf8')); expect(state.id).toBe(id);
    if (background && (!state.bg?.track || !state.bg?.clip || !state.bg?.file))
      block210('047真实翻译配音前置缺少已明确登记的14秒独立WAV背景轨；先完成本例背景轨前置，未任意选择原工程其他音轨');
    if (existsSync(path.join(n.out, 'checkpoint.json'))) block210('本批已有直接翻译配音工程检查点，请沿原结果续跑，不重复目标操作');
    n.prepared[id] = state.f;
    if (new URL(n.page.url()).pathname !== '/c/' + state.f.cid) await n.enterConversation(state.f.cid);
    await n.open();
    if (await n.page.locator('.ed-project-name').innerText() !== state.f.name) await n.selectProject(state.f.name);
    n.checks.push({ stage: 'fresh-native-translation-project', runId: state.runId, project: state.f, dedicatedCase: id, copiedToUnrelatedConversation: false });
    await checkpoint(n, state); await captureVoiceBaseline(n, state); return state;
  }
  const resumed = await continued(n, id, '配音');
  if (resumed) {
    if (!resumed.before || !resumed.originalTexts?.length) {
      if ((!resumed.runId && !process.env.CINLINK_ERYE210_TRANSLATED_BASELINE_ID) || !hasRealVoices(await n.get(resumed.f.pid)))
        block210('该检查点没有真实翻译配音前置，保留为准备历史；不能续验为本轮产品结果');
      await captureVoiceBaseline(n, resumed);
    }
    return resumed;
  }
  block210(`未登记本例专用的真实翻译配音工程：请先用页面翻译配音入口完成，再配置CINLINK_ERYE210_DIRECT_FIXTURE_${id}；不以普通字幕工程或跨会话复制代替`);
}
async function captureVoiceBaseline(n: Navigation210, state: Json) {
  await n.choose('配音');
  const until = Date.now() + 30000;
  while (await n.page.locator('.ed-voice-panel textarea[aria-label$="配音文案"]').count() < 2 && Date.now() < until) {
    const alerts = await n.page.getByRole('alert').allTextContents();
    if (alerts.length) { await n.shot('translated-project-prerequisite-page-error'); block210('真实翻译配音工程当前无法显示既有配音稿，未点击创建配音或重复生成；目标更新步骤尚未执行：'+alerts.join('; ')); }
    await n.page.waitForTimeout(1000);
  }
  if (await n.page.locator('.ed-voice-panel textarea[aria-label$="配音文案"]').count() < 2)
    block210('前置工程未显示至少两句实际配音稿；需要恢复原翻译配音结果，不在测试捕获基线时再次创建/生成配音');
  await saved(n);
  state.originalTexts = await n.page.locator('.ed-voice-panel textarea[aria-label$="配音文案"]').evaluateAll(es => es.map(e => (e as HTMLTextAreaElement).value));
  expect(state.originalTexts.length).toBeGreaterThanOrEqual(2); expect(state.originalTexts.every((t: string) => /[\u4e00-\u9fff]/.test(t))).toBe(true);
  state.before = await n.get(state.f.pid);
  const script = state.before.content.voiceover_sources?.find((v: Json) => v.role === 'translation' && /^zh/.test(v.language));
  if (script) {
    expect(script.bindings.length).toBe(state.originalTexts.length);
    const ordered = script.bindings.map((binding: Json) => voiceClips(state.before).filter((c: Json) => c.speech_source?.file_id === script.file_id && c.speech_source.block_ids.includes(binding.block_id)));
    expect(ordered.every((clips: Json[]) => clips.length === 1), '每句可见中文配音稿对应唯一实际声音').toBe(true);
    state.oldIds = ordered.map((clips: Json[]) => clips[0].file_id);
  } else {
    const ordered = state.originalTexts.map((text: string) => state.before.content.dubbing.find((d: Json) => d.translation_text === text && d.audio_state === 'ready'));
    expect(ordered.every(Boolean), '逐句匹配真实目标语言稿和旧声音').toBe(true); state.oldIds = ordered.map((d: Json) => d.audio_file_id);
  }
  await checkpoint(n, state);
}
async function regenerate(n: Navigation210, s: Json, text: string) {
  await n.choose('配音'); const first = n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true });
  if (!s.regenerateAttempted) {
    await fill(n, first, text); await expect(n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true })).toHaveValue(s.originalTexts[1]);
    expect(voiceClips(await n.get(s.f.pid)).filter((c: Json) => s.oldIds.includes(c.file_id)).map((c: Json) => c.file_id).sort()).toEqual([...s.oldIds].sort());
    await n.shot(`${s.id}-draft-old-audio-before-explicit-regenerate`);
    const b = n.page.locator('.ed-voice-panel').getByRole('button', { name: /重新生成|生成配音|Regenerate|Generate voice/ }); await expect(b).toHaveCount(1); await expect(b).toBeEnabled();
    s.regenerateAttempted = true; await checkpoint(n, s); await b.click();
  }
  const until = Date.now() + 240000;
  while (Date.now() < until && !voiceClips(await n.get(s.f.pid)).some((c: Json) => c.file_id && !s.oldIds.includes(c.file_id))) {
    expect(await n.page.getByRole('alert').allTextContents(), '目标工程的明确重新生成应完成，不应停留错误').toEqual([]); await n.page.waitForTimeout(1500);
  }
  expect(voiceClips(await n.get(s.f.pid)).some((c: Json) => c.file_id && !s.oldIds.includes(c.file_id))).toBe(true);
  const after = await n.get(s.f.pid), files = voiceClips(after).map((c: Json) => c.file_id);
  expect(files, '成功后旧第一句声音应替换').not.toContain(s.oldIds[0]); expect(files, '未操作第二句声音须保留').toContain(s.oldIds[1]);
  expect(s.oldIds.slice(1).every((id: string) => files.includes(id)), '其他每句已生成声音均须保持').toBe(true);
  await expect(first).toHaveValue(text); await expect(n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true })).toHaveValue(s.originalTexts[1]);
  n.checks.push({ stage: 'single-explicit-regeneration', oldFirst: s.oldIds[0], preservedSecond: s.oldIds[1], text, newFiles: files.filter((x: string) => !s.oldIds.includes(x)) });
  await checkpoint(n, s); return after;
}
export async function current047(n: Navigation210) {
  const s = await voiceFixture(n, '047', true); if (!s.before) block210('原配音创建基线尚未完成，先核对原任务，禁止重建');
  n.checks.push({ stage: 'target-steps-began', id: '047', realVoiceSentences: s.originalTexts.length });
  if (!s.mixed) {
    const handle = row(n, s.bg.track).getByRole('slider', { name: '调整片段音量', exact: true }); await expect(handle).toHaveAttribute('aria-valuenow', '100');
    await handle.scrollIntoViewIfNeeded(); const b = await handle.boundingBox(); if (!b) block210('背景音量线不可见');
    await n.page.mouse.move(b!.x + b!.width / 2, b!.y + b!.height / 2); await n.page.mouse.down();
    await n.page.mouse.move(b!.x + b!.width / 2, b!.y + b!.height / 2 + 12, { steps: 8 }); await n.page.mouse.up();
    await expect(handle).toHaveAttribute('aria-valuenow', '50'); await saved(n);
    await reopen210(n, s.f, '配音'); await expect(handle).toHaveAttribute('aria-valuenow', '50');
    s.mixed = await n.get(s.f.pid); await checkpoint(n, s); await n.shot('047-background-volume-line-half-saved');
  }
  const after = await regenerate(n, s, '混音后重新生成047。');
  const bg = (p: Json) => p.content.tracks.find((t: Json) => t.type === 'audio' && t.clips.some((c: Json) => c.clip_id === s.bg.clip));
  expect(bg(after)).toEqual(bg(s.mixed)); expect(videos(after)).toEqual(videos(s.mixed)); expect(subtitles(after)).toEqual(subtitles(s.mixed));
  await reopen210(n, s.f, '配音'); await expect(row(n, s.bg.track).getByRole('slider', { name: '调整片段音量', exact: true })).toHaveAttribute('aria-valuenow', '50');
  await expect(n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true })).toHaveValue('混音后重新生成047。');
  n.checks.push({ stage: 'mix-survives-regeneration', background: s.bg, volumeBefore: 1, volumeAfter: .5, actualMouseDragPx: 12, otherMediaUnchanged: true });
  await checkpoint(n, s); await n.shot('047-reopened-mix-and-new-first-voice');
}
export async function current048(n: Navigation210) {
  const s = await voiceFixture(n, '048', false); if (!s.before) block210('原配音创建基线尚未完成，先核对原任务，禁止重建');
  n.checks.push({ stage: 'target-steps-began', id: '048', realVoiceSentences: s.originalTexts.length });
  const text = '译文改稿048，仅更新这一句。';
  const zh = s.before.content.tracks.find((t: Json) => t.type === 'subtitle' && t.clips.some((c: Json) => /^zh/.test(c.language)));
  const en = s.before.content.tracks.find((t: Json) => t.type === 'subtitle' && t.clips.some((c: Json) => c.language === 'en'));
  expect(zh).toBeTruthy(); expect(en).toBeTruthy(); const c1 = zh.clips[0];
  if (!s.captionEdited) {
    await n.choose('字幕'); await select(n, row(n, zh.track_id).locator('.ed-timeline-clip').first()); await n.choose('字幕');
    const target = n.page.locator(`.ed-caption-text[data-file-id="${c1.file_id}"][data-block-id="${c1.bindings[0].block_id}"]`);
    const second = zh.clips.flatMap((c: Json) => c.bindings || [])[1]; expect(second).toBeTruthy();
    s.originalChineseSecond = await n.page.locator(`.ed-caption-text[data-file-id="${c1.file_id}"][data-block-id="${second.block_id}"]`).innerText();
    await expect(target).toHaveCount(1); await target.click(); await fill(n, n.page.getByRole('textbox', { name: '字幕文本', exact: true }), text);
    await n.choose('配音'); await expect(n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true })).toHaveValue(s.originalTexts[0]);
    await expect(n.page.locator('.ed-voice-panel').getByRole('button', { name: /重新生成|生成配音|Regenerate|Generate voice/ })).toHaveCount(0);
    const p = await n.get(s.f.pid); expect(audioClips(p)).toEqual(audioClips(s.before)); expect(p.content.tracks.find((t: Json) => t.track_id === en.track_id)).toEqual(en);
    s.captionEdited = p; await checkpoint(n, s); await n.shot('048-caption-edit-no-automatic-voice-update');
  }
  const after = await regenerate(n, s, text); expect(subtitles(after)).toEqual(subtitles(s.captionEdited)); expect(videos(after)).toEqual(videos(s.before));
  const bindings = zh.clips.flatMap((c: Json) => c.bindings || []); const secondBefore = bindings[1];
  expect(secondBefore, '必须有可明确核验的中文C2，不能把空对象相等当保护通过').toBeTruthy();
  expect(after.content.tracks.find((t: Json) => t.track_id === zh.track_id).clips.flatMap((c: Json) => c.bindings || [])[1]).toEqual(secondBefore);
  await reopen210(n, s.f, '字幕'); await select(n, row(n, zh.track_id).locator('.ed-timeline-clip').first()); await n.choose('字幕');
  await expect(n.page.locator('.ed-inspector').getByRole('button', { name: text, exact: true })).toBeVisible();
  await expect(n.page.locator(`.ed-caption-text[data-file-id="${c1.file_id}"][data-block-id="${secondBefore.block_id}"]`)).toHaveText(s.originalChineseSecond);
  await n.choose('配音'); await expect(n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true })).toHaveValue(text);
  n.checks.push({ stage: 'caption-explicit-voice-isolation', EnglishUnchanged: true, ChineseSecondUnchanged: true, automaticVoiceGeneration: false, explicitFirstOnly: true });
  await checkpoint(n, s); await n.shot('048-reopened-caption-and-voice-independent');
}

async function exportPhase(n: Navigation210, s: Json, phase: 'OFF' | 'ON') {
  const f = s.f, key = `export${phase}`;
  if (!s[key]) {
    s[key] = { attemptedAt: new Date().toISOString() }; await checkpoint(n, s);
    const response = n.page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.includes('/cloud-tool-api/mcp') && /editor_export|export\.video/.test(r.request().postData() || ''), { timeout: 45000 });
    await n.page.getByRole('button', { name: /^(导出|Export)$/ }).click(); const receipt = await response; const body = await receipt.json();
    s[key].accepted = { taskId: findStringField(body, 'task_id'), status: receipt.status(), body }; await checkpoint(n, s); expect(receipt.ok()).toBe(true);
  }
  const task = s[key].accepted?.taskId; if (!task) block210(`${phase}原导出已尝试但未确认受理，先核对原任务，不重复点击导出`);
  let message: Json | undefined; const deadline = Date.now() + 480000;
  while (Date.now() < deadline) {
    const body = await n.messages(f.cid); message = body.messages?.find((m: Json) => m.ext?.editor_export?.task_id === task && m.result_files?.some((x: Json) => x.kind === 'video'));
    if (message) break;
    const alerts = await n.page.getByRole('alert').allTextContents();
    const originalFailure = existsSync(path.join(n.out, '049-native-export-ui-error.json'));
    if (alerts.length || originalFailure) {
      const receipt = await n.json('/cloud-tool-api/mcp', { jsonrpc: '2.0', id: randomUUID(), method: 'editor.task.get', params: { project_id: f.pid, task_id: task } }, 'post');
      const actual = receipt.result?.structuredContent || {};
      await n.record('049-original-task-status-private', actual);
      n.checks.push({ stage: `native-export-${phase}-page-error`, taskId: task, taskStatus: actual.status || 'unknown', resultFiles: actual.result?.files?.map((x: Json) => ({ fileId: x.file_id, name: x.name })), alerts, originalErrorEvidenceRetained: originalFailure, noExportResubmitted: true });
      await checkpoint(n, s); await n.shot(`049-${phase}-export-page-failure`);
      expect(alerts.length || originalFailure, '原生导出应交付可用结果，不能报错后停留在无结果状态').toBeFalsy();
    }
    await n.page.waitForTimeout(2000);
  }
  if (!message) block210(`${phase}原导出仍未返回视频，保留检查点，不重复导出`);
  expect(message.ext.editor_export.project_id).toBe(f.pid); const file = message.result_files.find((x: Json) => x.kind === 'video');
  const mp4 = path.join(n.out, `049-${phase}.mp4`), frame = path.join(n.out, `049-${phase}-1s.png`);
  if (!existsSync(mp4)) {
    const cards = n.page.locator('.workspace-progress-artifacts .workspace-artifact-video-card video');
    await expect(cards).toHaveCount(phase === 'OFF' ? 1 : 2, { timeout: 60000 }); const video = cards.nth(phase === 'OFF' ? 0 : 1);
    await expect.poll(() => video.getAttribute('src')).toMatch(/^https:\/\//); const src = await video.getAttribute('src');
    const response = await fetch(src!, { signal: AbortSignal.timeout(120000) }); expect(response.ok).toBe(true); await writeFile(mp4, new Uint8Array(await response.arrayBuffer()));
  }
  const mp4Sha256 = digest(await readFile(mp4)); expect(mp4Sha256, '下载视频须对应本阶段真实任务的产物').toBe(file.facts?.content_sha256);
  const probe = await execute(process.env.CINLINK_FFPROBE || 'ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,width,height', '-of', 'json', mp4]); const meta = JSON.parse(probe.stdout);
  const v = meta.streams.find((x: Json) => x.codec_type === 'video'); expect(v.width).toBe(s.before.content.canvas.width); expect(v.height).toBe(s.before.content.canvas.height);
  expect(Math.abs(Number(meta.format.duration) - duration(s.before))).toBeLessThan(.2); expect(meta.streams.some((x: Json) => x.codec_type === 'audio')).toBe(true);
  await execute('ffmpeg', ['-y', '-v', 'error', '-ss', '1', '-i', mp4, '-frames:v', '1', frame]);
  s[key].result = { taskId: task, fileId: file.file_id, mp4Sha256, frameSha256: digest(await readFile(frame)), frame: path.basename(frame), metadata: meta };
  n.checks.push({ stage: `native-export-${phase}`, ...s[key].result }); await checkpoint(n, s); await n.shot(`049-${phase}-native-export-ready`);
}
export async function current049(n: Navigation210) {
  const s = await continued(n, '049', '水印') || await fresh(n, '049', await seed210(n, 'WATERMARK')); const f = s.f;
  if (!s.before) {
    await n.choose('水印'); await n.sub('文字水印'); await fill(n, n.page.locator('.ed-watermark-panel textarea'), 'WM049');
    await n.sub('图片水印'); await expect(n.page.getByRole('img', { name: '图片水印预览', exact: true })).toBeVisible(); s.before = await n.get(f.pid); await checkpoint(n, s);
  }
  for (const phase of ['OFF', 'ON'] as const) {
    if (s[`export${phase}`]?.result) continue;
    await n.choose('水印'); const enabled = n.page.getByLabel('启用水印', { exact: true });
    if (phase === 'OFF') await enabled.uncheck(); else await enabled.check(); await saved(n);
    await reopen210(n, f, '水印'); if (phase === 'OFF') await expect(enabled).not.toBeChecked(); else await expect(enabled).toBeChecked();
    const p = await n.get(f.pid); const preserved = (w: Json) => { const c = structuredClone(w); delete c.enabled; return c; };
    expect(preserved(p.content.watermarks)).toEqual(preserved(s.before.content.watermarks)); expect(media210(p)).toEqual(media210(s.before)); expect(subtitles(p)).toEqual(subtitles(s.before));
    await n.sub('文字水印'); await expect(n.page.locator('.ed-watermark-panel textarea')).toHaveValue('WM049'); await n.sub('图片水印');
    await expect(n.page.getByRole('img', { name: '图片水印预览', exact: true })).toBeVisible(); await n.shot(`049-${phase}-saved-reopened`);
    await exportPhase(n, s, phase);
  }
  const review = path.join(n.out, '049-visual-review.json');
  if (!existsSync(review)) block210('OFF/ON原生导出及原始帧已保存，待核验OFF无两类水印、ON同时出现WM049及原图片水印；沿检查点续跑，不重复导出');
  const r = JSON.parse(await readFile(review, 'utf8'));
  for (const phase of ['OFF', 'ON'] as const) {
    expect(r[phase].mp4Sha256).toBe(s[`export${phase}`].result.mp4Sha256); expect(r[phase].frameSha256).toBe(s[`export${phase}`].result.frameSha256);
    expect(r[phase].textPresent).toBe(phase === 'ON'); expect(r[phase].imagePresent).toBe(phase === 'ON');
  }
  n.checks.push({ stage: 'native-off-on-video-visual-review', ...r }); await checkpoint(n, s); await n.shot('049-both-native-exports-verified');
}
