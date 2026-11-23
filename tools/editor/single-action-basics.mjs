// Runs in the existing interactive.cjs window. Never launches/closes a browser,
// creates a project, or writes editor content through an API.
import assert from 'node:assert/strict';
import { submit, observe } from './user-project.mjs';

export const b01Spec = Object.freeze({
  caseId: 'B01',
  conversationId: '9500f848-2da3-4dd4-be21-43149cd5fd29',
  projectId: 'a4c860bc-f50d-4f73-9b20-7c31ca2dd748',
  projectName: '英文30S.mp4',
  expectedRevision: 2,
  prompt: '查看当前工程的素材、音轨、字幕和时长。',
});

export const b02Spec = Object.freeze({
  caseId: 'B02',
  conversationId: b01Spec.conversationId,
  projectId: b01Spec.projectId,
  projectName: b01Spec.projectName,
  prompt: '只把当前工程中唯一的视频片段在时间线5秒处分成两段，保留全部视频内容，不移动片段。',
});

export const b03Spec = Object.freeze({
  caseId: 'B03',
  conversationId: b01Spec.conversationId,
  projectId: b01Spec.projectId,
  projectName: b01Spec.projectName,
  trimHeadSeconds: 4,
  prompt: '先只做一步：在当前工程“英文30S.mp4”中裁掉视频片段开头4秒，暂时不移动片段，也不调整字幕和旁白。',
});

export const b04Spec = Object.freeze({
  caseId: 'B04', trimTailSeconds: 3,
  prompt: '只裁掉当前工程中唯一视频片段的最后3秒，不另做其他编辑。',
});

const origin = 'https://app.cinlink.ai';
const write = (ctx, name, data) => ctx.fs.writeFile(ctx.path.join(ctx.report, name), JSON.stringify(data, null, 2));
const read = async (ctx, name) => JSON.parse(await ctx.fs.readFile(ctx.path.join(ctx.report, name), 'utf8'));

async function project(ctx, projectId = b01Spec.projectId) {
  const response = await ctx.context.request.get(`${origin}/cloud-tool-api/v1/editor/projects/${projectId}`, { timeout: 60_000 });
  assert(response.ok(), `工程回读HTTP ${response.status()}`);
  return response.json();
}

function baselineFacts(saved) {
  const tracks = saved.content.tracks;
  const videos = tracks.filter(t => t.type === 'video').flatMap(t => t.clips);
  const audio = tracks.filter(t => t.type === 'audio');
  const subs = tracks.filter(t => t.type === 'subtitle').flatMap(t => t.clips);
  assert.equal(videos.length, 1, '本例要求唯一视频片段');
  assert.equal(audio.filter(t => t.role === 'narration').length, 1, '本例要求独立旁白');
  assert.equal(subs.length, 1, '本例要求单个英文字幕通道');
  assert.equal(subs[0].role, 'translation');
  assert.equal(subs[0].bindings.length, 13, '已登记13条字幕的前置发生变化');
  assert.equal(saved.revision, b01Spec.expectedRevision, '用户工程已更新，需先重新核对基线');
  return {
    videoSeconds: videos[0].source_out_sec - videos[0].source_in_sec,
    videoCount: videos.length,
    audio: audio.map(t => ({ role: t.role, muted: t.muted, clips: t.clips.map(c => ({
      sourceIn: c.source_in_sec, sourceOut: c.source_out_sec, timelineStart: c.timeline_start_sec,
    })) })),
    subtitleCount: subs[0].bindings.length,
    subtitleRole: subs[0].role,
    subtitleLanguage: subs[0].language,
    dubbingCount: saved.content.dubbing?.length || 0,
    backgroundTrackCount: audio.filter(t => ['background', 'bgm', 'music'].includes(t.role)).length,
  };
}

async function view(ctx) {
  return {
    url: ctx.page.url().split('?')[0],
    projectName: (await ctx.page.locator('.ed-project-name').first().innerText()).trim(),
    // Caption rows are virtualized. DOM count alone is not the total cue count.
    renderedCaptionRows: await ctx.page.locator('.ed-caption-row').count(),
    text: await ctx.page.locator('body').innerText(),
  };
}

/** Exactly one authorized read request. A batch directory must never be reused
 * after an uncertain send: the guard remains even if no acceptance was captured.
 * Return Blocked on clarification so its real fields can be inspected/answered
 * through the same window, rather than inventing an answer or resending B01.
 */
export async function runB01(ctx, { timeoutMs = 600_000, onProgress = () => {} } = {}) {
  await ctx.fs.mkdir(ctx.report, { recursive: true });
  const guard = await ctx.fs.open(ctx.path.join(ctx.report, 'B01-started.lock'), 'wx');
  await guard.writeFile(new Date().toISOString());
  await guard.close();
  let accepted = false;
  try {
    const before = await project(ctx);
    assert.equal(before.project_id, b01Spec.projectId);
    assert.equal(before.content.name, b01Spec.projectName);
    const facts = baselineFacts(before);
    const ui = await view(ctx);
    assert.equal(ui.url, `${origin}/c/${b01Spec.conversationId}`);
    assert.equal(ui.projectName, b01Spec.projectName);
    assert.equal((await ctx.page.locator('#workspace-prompt').innerText()).trim(), '', '输入框有用户草稿');
    await write(ctx, 'B01-baseline-facts.json', facts);
    await write(ctx, 'B01-view-before.json', ui);
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B01-before.png') });
    const submission = await submit(ctx, b01Spec);
    accepted = true;
    onProgress({ phase: 'accepted', ...submission });
    const started = Date.now();
    let observed;
    while (Date.now() - started < timeoutMs) {
      observed = await observe(ctx, 'B01');
      onProgress({ phase: 'observation', caseId: 'B01', status: observed.status, elapsedSec: observed.elapsedSec });
      if (observed.status === 'requires_user_input') {
        const result = { caseId: 'B01', status: 'Blocked', runId: submission.runId,
          reason: '任务需要真实补槽；保留原任务，检查页面字段后填写并继续，不重提原指令',
          screenshot: 'B01-user-clarification.png' };
        await write(ctx, 'B01-result.json', result);
        return result;
      }
      if (['done', 'failed', 'cancelled', 'canceled'].includes(observed.status)) break;
      await ctx.page.waitForTimeout(5000);
    }
    if (!['done', 'failed', 'cancelled', 'canceled'].includes(observed?.status)) {
      throw Error('本次等待期限内原任务未结束；回读原run，不能重新提交');
    }
    return await finishB01(ctx);
  } catch (error) {
    const screenshot = accepted ? 'B01-failed.png' : 'B01-precondition-failed.png';
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) }).catch(() => {});
    const result = { caseId: 'B01', status: accepted ? 'Failed' : 'Blocked',
      reason: String(error).split('\n')[0].slice(0, 400), screenshot, accepted };
    await write(ctx, 'B01-result.json', result);
    return result;
  }
}

/** Can resume only the accepted original B01 after real clarification/recovery. */
export async function finishB01(ctx) {
  const execution = await read(ctx, 'B01-user-execution.json');
  const before = await read(ctx, 'B01-user-before.json');
  const assistant = execution.messages.filter(m => m.role === 'assistant').at(-1);
  const reply = assistant?.text || '';
  const nodes = assistant?.plan || [];
  const checks = [];
  const check = (name, passed) => checks.push({ name, passed: !!passed });
  check('任务成功结束且未声明目标未完成', assistant?.status === 'done' && assistant.intent_fully_satisfied !== false);
  check('实际工程读取成功', nodes.some(n => (n.tool || n.tool_name) === 'editor_project_get' && n.status === 'done'));
  check('无失败工具步骤', nodes.every(n => !n.error && n.status !== 'failed'));
  check('仅使用读取工具', nodes.every(n => /^editor_(?:.*_(?:get|list|read)|capabilities)$/.test(n.tool || n.tool_name || '')));
  check('回复描述视频实际时长30.63秒', /30[.．]63/.test(reply));
  check('回复包含原声及静音状态', /(原声|source|original audio)/i.test(reply) && /(静音|muted)/i.test(reply));
  check('回复区分独立旁白', /(旁白|narration)/i.test(reply));
  check('回复包含英文可编辑字幕及13条数量', /(字幕|subtitle|caption)/i.test(reply) && /\b13\b/.test(reply) && /(英文|英语|English|translation)/i.test(reply));
  check('结果回读内容及版本保持', execution.unchanged && execution.afterRevision === before.revision);
  const uiAfter = await view(ctx);
  await write(ctx, 'B01-view-after.json', uiAfter);
  check('读取后仍在用户工程', uiAfter.projectName === b01Spec.projectName && uiAfter.url === `${origin}/c/${b01Spec.conversationId}`);

  // Refresh verification is read-only and must not introduce another /turns POST.
  const refreshedTurns = [];
  const track = request => {
    if (request.method() === 'POST' && /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(request.url()).pathname))
      refreshedTurns.push({ method: 'POST', path: new URL(request.url()).pathname });
  };
  ctx.page.on('request', track);
  try {
    await ctx.page.reload({ waitUntil: 'domcontentloaded', timeout: 60_000 });
    await ctx.page.locator('#workspace-prompt').waitFor({ state: 'visible', timeout: 45_000 });
    // The SPA may restore the selected editor after the conversation is ready.
    const editorName = ctx.page.locator('.ed-project-name').first();
    await editorName.waitFor({ state: 'visible', timeout: 8000 }).catch(async () => {
      const toggle = ctx.page.locator('.workspace-editor-toggle');
      if (await toggle.isVisible()) await toggle.click();
      await editorName.waitFor({ state: 'visible', timeout: 30_000 });
    });
    // A visible "空白工程 / 正在打开工程" placeholder is not a loaded project.
    await ctx.page.waitForFunction(expected => Array.from(document.querySelectorAll('.ed-project-name'))
      .some(node => node.textContent?.trim() === expected), b01Spec.projectName, { timeout: 45_000 });
    const refreshed = await project(ctx);
    const uiRefreshed = await view(ctx);
    await write(ctx, 'B01-project-refreshed.json', refreshed);
    await write(ctx, 'B01-view-refreshed.json', uiRefreshed);
    check('刷新后内容及版本保持', JSON.stringify(refreshed.content) === JSON.stringify(before.content) && refreshed.revision === before.revision);
    check('刷新后当前工程正确且未重复提交任务', refreshed.project_id === b01Spec.projectId &&
      uiRefreshed.projectName === b01Spec.projectName && uiRefreshed.url === `${origin}/c/${b01Spec.conversationId}` && refreshedTurns.length === 0);
  } finally {
    ctx.page.off('request', track);
  }
  const passed = checks.every(c => c.passed);
  const screenshot = passed ? 'B01-passed.png' : 'B01-failed.png';
  if (reply) await ctx.page.getByText(reply, { exact: true }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
  const result = { caseId: 'B01', status: passed ? 'Passed' : 'Failed', runId: execution.runId,
    traceId: execution.submission.traceId, prompt: b01Spec.prompt, projectId: b01Spec.projectId,
    conversationId: b01Spec.conversationId, startedAt: execution.startedAt, finishedAt: new Date().toISOString(),
    runtimeStatus: assistant?.status, beforeRevision: before.revision, afterRevision: execution.afterRevision,
    checks, failedChecks: checks.filter(c => !c.passed).map(c => c.name), assistant: reply,
    screenshot, resultScreenshot: 'B01-user-result.png', clarificationCount: assistant?.clarifications?.length || 0,
    tools: nodes.map(n => ({ tool: n.tool || n.tool_name, status: n.status, error: n.error || null })),
    refreshedTurns, unchanged: execution.unchanged, browserKeptOpen: !ctx.page.isClosed() };
  await write(ctx, 'B01-result.json', result);
  return result;
}

const videoSegments = saved => saved.content.tracks.filter(t => t.type === 'video')
  .flatMap(t => t.clips.map(c => ({ ...c, track_id: t.track_id, offset_sec: t.offset_sec || 0 })))
  .sort((a, b) => a.timeline_start_sec + a.offset_sec - b.timeline_start_sec - b.offset_sec);
// Floating arithmetic equality only; this is not an audiovisual time tolerance.
const sameNumber = (a, b) => Number.isFinite(a) && Number.isFinite(b) &&
  Math.abs(a - b) <= Number.EPSILON * Math.max(1, Math.abs(a), Math.abs(b)) * 16;

/** The caller must inspect the current saved revision, including manual changes,
 * before authorizing this specific baseline. No B01 revision/fixture is reused.
 */
export async function runB02(ctx, { expectedRevision, timeoutMs = 600_000, onProgress = () => {} } = {}) {
  assert(Number.isInteger(expectedRevision), '先核对当前已保存版本，再传expectedRevision');
  await ctx.fs.mkdir(ctx.report, { recursive: true });
  const guard = await ctx.fs.open(ctx.path.join(ctx.report, 'B02-started.lock'), 'wx');
  await guard.writeFile(new Date().toISOString()); await guard.close();
  let accepted = false;
  try {
    const before = await project(ctx);
    const videos = videoSegments(before);
    assert.equal(before.project_id, b02Spec.projectId);
    assert.equal(before.revision, expectedRevision, '已核对的用户基线再次变化，未发送');
    assert.equal(videos.length, 1, 'B02要求唯一完整视频片段');
    const clip = videos[0];
    assert(sameNumber(clip.source_in_sec, 0) && sameNumber(clip.timeline_start_sec + clip.offset_sec, 0));
    assert(sameNumber(clip.playback_rate, 1) && clip.source_out_sec > 5, '本例5秒切点必须在片段内部');
    const ui = await view(ctx);
    assert.equal(ui.projectName, b02Spec.projectName);
    assert.equal(ui.url, `${origin}/c/${b02Spec.conversationId}`);
    await write(ctx, 'B02-view-before.json', ui);
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B02-before.png') });
    const submission = await submit(ctx, { ...b02Spec, expectedRevision });
    accepted = true;
    onProgress({ phase: 'accepted', ...submission });
    const start = Date.now();
    let observed;
    while (Date.now() - start < timeoutMs) {
      observed = await observe(ctx, 'B02');
      onProgress({ phase: 'observation', caseId: 'B02', status: observed.status, elapsedSec: observed.elapsedSec });
      if (observed.status === 'requires_user_input') {
        const result = { caseId: 'B02', status: 'Blocked', runId: submission.runId,
          reason: '检查本轮真实补槽字段后填写并继续原任务；不要重新提交B02', screenshot: 'B02-user-clarification.png' };
        await write(ctx, 'B02-result.json', result); return result;
      }
      if (['done', 'failed', 'cancelled', 'canceled'].includes(observed.status)) break;
      await ctx.page.waitForTimeout(5000);
    }
    assert(['done', 'failed', 'cancelled', 'canceled'].includes(observed?.status), '等待期限内原任务未结束，保留原run回读');
    return await finishB02(ctx);
  } catch (error) {
    const screenshot = accepted ? 'B02-verification-error.png' : 'B02-precondition-failed.png';
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) }).catch(() => {});
    const result = { caseId: 'B02', status: accepted ? 'Failed' : 'Blocked', accepted,
      reason: String(error).split('\n')[0].slice(0, 400), screenshot };
    await write(ctx, 'B02-result.json', result); return result;
  }
}

async function b02Playback(ctx) {
  const slider = ctx.page.locator('.ed-preview-playback input[type="range"]');
  const box = await slider.boundingBox();
  assert(box, '预览进度条不可见');
  const max = Number(await slider.getAttribute('max'));
  await slider.click({ position: { x: 8 + (box.width - 16) * 4 / max, y: box.height / 2 } });
  const startTime = Number(await slider.inputValue());
  assert(startTime > 3 && startTime < 5, '实际预览应从切点前开始');
  const samples = [];
  let beforeShot = false, afterShot = false;
  try {
    await ctx.page.getByRole('button', { name: /^(预览播放|Play preview)$/ }).click();
    const start = Date.now();
    while (Date.now() - start < 30_000) {
      const time = Number(await slider.inputValue());
      const videos = await ctx.page.locator('.ed-preview-canvas video').evaluateAll(elements => elements.map(v => ({
        currentTime: v.currentTime, readyState: v.readyState, error: v.error?.code || null,
        width: v.videoWidth, height: v.videoHeight,
      })));
      samples.push({ time, videos });
      if (!beforeShot && time >= 4.2 && time < 5) {
        await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B02-cut-before.png') }); beforeShot = true;
      }
      if (!afterShot && time >= 5.2) {
        await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B02-cut-after.png') }); afterShot = true;
      }
      if (time >= 6) break;
      await ctx.page.waitForTimeout(200);
    }
  } finally {
    const pause = ctx.page.getByRole('button', { name: /^(预览暂停|Pause preview)$/ });
    if (await pause.isVisible()) await pause.click();
  }
  await write(ctx, 'B02-playback.json', { startTime, samples, beforeShot, afterShot });
  return { status: samples.at(-1)?.time >= 6 && beforeShot && afterShot &&
    samples.some(s => s.videos.some(v => v.readyState >= 2 && !v.error && v.width > 0)) ? 'Passed' : 'Failed',
    startTime, endTime: samples.at(-1)?.time, beforeShot, afterShot };
}

async function restoreB02(ctx, before, after, nodes) {
  if (JSON.stringify(before.content) === JSON.stringify(after.content)) return { status: 'NotNeeded', reason: '本轮未改工程', revision: after.revision };
  const ownWrite = nodes.some(n => /^(editor_video_clip_split|editor_batch_apply)$/.test(n.tool || n.tool_name || '') && n.status === 'done');
  if (!ownWrite || after.revision !== before.revision + 1)
    return { status: 'Blocked', reason: '不能确认最新单次改动完全属于本轮分割，未撤销可能的用户编辑' };
  // Never undo an intervening user edit, or blindly unwind multiple history items.
  const current = await project(ctx);
  if (current.revision !== after.revision || JSON.stringify(current.content) !== JSON.stringify(after.content))
    return { status: 'Blocked', reason: '检测到后续修改，未自动撤销' };
  const undo = ctx.page.getByRole('button', { name: /^(撤销|Undo)$/, exact: true }).first();
  if (!(await undo.isEnabled())) return { status: 'Blocked', reason: '没有可用撤销入口，未覆盖用户工程' };
  await undo.click();
  const start = Date.now();
  while (Date.now() - start < 30_000) {
    const saved = await project(ctx);
    if (JSON.stringify(saved.content) === JSON.stringify(before.content)) {
      await write(ctx, 'B02-restored-project.json', saved);
      await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B02-restored.png') });
      return { status: 'Passed', revision: saved.revision, method: '单次页面撤销', contentMatchesBefore: true };
    }
    await ctx.page.waitForTimeout(1000);
  }
  return { status: 'Failed', reason: '撤销一次后内容未恢复到本例基线；已停止，不连续撤销或覆盖JSON' };
}

/** Original accepted B02 only; supports resumption after real clarification. */
export async function finishB02(ctx) {
  const execution = await read(ctx, 'B02-user-execution.json');
  const before = await read(ctx, 'B02-user-before.json');
  const assistant = execution.messages.filter(m => m.role === 'assistant').at(-1);
  const nodes = assistant?.plan || [];
  const after = execution.after;
  const original = videoSegments(before)[0], clips = videoSegments(after);
  const checks = [];
  const check = (name, passed) => checks.push({ name, passed: !!passed });
  check('任务成功结束且未声明未完成', assistant?.status === 'done' && assistant.intent_fully_satisfied !== false);
  check('无失败工具步骤', nodes.every(n => !n.error && n.status !== 'failed'));
  check('视频实际由一段变为两段', clips.length === 2);
  const two = clips.length === 2;
  check('两段均来自原视频且速度保持', two && clips.every(c => c.file_id === original.file_id && sameNumber(c.playback_rate, original.playback_rate)));
  check('源范围在5秒切开且无丢重', two && sameNumber(clips[0].source_in_sec, original.source_in_sec) &&
    sameNumber(clips[0].source_out_sec, 5) && sameNumber(clips[1].source_in_sec, 5) && sameNumber(clips[1].source_out_sec, original.source_out_sec));
  check('时间线不移动且切点连续', two && sameNumber(clips[0].timeline_start_sec + clips[0].offset_sec, 0) &&
    sameNumber(clips[1].timeline_start_sec + clips[1].offset_sec, 5));
  check('总视频内容时长保持', two && sameNumber(clips.reduce((sum, c) => sum + (c.source_out_sec - c.source_in_sec) / c.playback_rate, 0),
    (original.source_out_sec - original.source_in_sec) / original.playback_rate));
  check('保存同一用户工程', after.project_id === before.project_id && after.content.name === before.content.name);
  const nonVideo = p => p.content.tracks.filter(t => t.type !== 'video');
  const linkedChanges = { nonVideoUnchanged: JSON.stringify(nonVideo(before)) === JSON.stringify(nonVideo(after)),
    before: nonVideo(before), after: nonVideo(after) };
  await write(ctx, 'B02-linked-changes.json', linkedChanges);
  const errorText = nodes.find(n => n.error)?.error;
  const focus = typeof errorText === 'string' ? errorText : assistant?.text;
  if (focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B02-terminal.png') });

  let playback = { status: 'NotRun', reason: '分割未完成，不把原片播放当成切点验收' };
  if (checks.every(c => c.passed)) {
    try { playback = await b02Playback(ctx); }
    catch (error) { playback = { status: 'Failed', reason: String(error).split('\n')[0] }; }
    check('切点前后实际预览播放抽检', playback.status === 'Passed');
  }
  const refreshedTurns = [];
  const track = request => {
    if (request.method() === 'POST' && /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(request.url()).pathname)) refreshedTurns.push('POST /turns');
  };
  ctx.page.on('request', track);
  let refreshed;
  try {
    await ctx.page.reload({ waitUntil: 'domcontentloaded', timeout: 60_000 });
    await ctx.page.locator('#workspace-prompt').waitFor({ state: 'visible', timeout: 45_000 });
    const editorName = ctx.page.locator('.ed-project-name').first();
    await editorName.waitFor({ state: 'visible', timeout: 8000 }).catch(async () => {
      const toggle = ctx.page.locator('.workspace-editor-toggle');
      if (await toggle.isVisible()) await toggle.click();
      await editorName.waitFor({ state: 'visible', timeout: 30_000 });
    });
    await ctx.page.waitForFunction(name => Array.from(document.querySelectorAll('.ed-project-name'))
      .some(node => node.textContent?.trim() === name), b02Spec.projectName, { timeout: 45_000 });
    refreshed = await project(ctx);
    await write(ctx, 'B02-refreshed-project.json', refreshed);
    check('刷新后保存结果和版本一致', JSON.stringify(refreshed.content) === JSON.stringify(after.content) && refreshed.revision === after.revision);
    check('刷新仍在用户会话且未重提任务', ctx.page.url().split('?')[0] === `${origin}/c/${b02Spec.conversationId}` && refreshedTurns.length === 0);
  } finally { ctx.page.off('request', track); }
  const passed = checks.every(c => c.passed);
  const screenshot = passed ? 'B02-passed.png' : 'B02-failed.png';
  if (focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
  const restoration = await restoreB02(ctx, before, after, nodes);
  const result = { caseId: 'B02', status: passed ? 'Passed' : 'Failed', prompt: b02Spec.prompt,
    runId: execution.runId, traceId: execution.submission.traceId,
    projectId: b02Spec.projectId, conversationId: b02Spec.conversationId,
    startedAt: execution.startedAt, finishedAt: new Date().toISOString(), runtimeStatus: assistant?.status,
    intentSatisfied: assistant?.intent_fully_satisfied, beforeRevision: before.revision, afterRevision: after.revision,
    refreshedRevision: refreshed.revision, unchanged: execution.unchanged,
    beforeVideo: videoSegments(before), afterVideo: clips, nonVideoUnchanged: linkedChanges.nonVideoUnchanged,
    checks, failedChecks: checks.filter(c => !c.passed).map(c => c.name), playback, restoration,
    tools: nodes.map(n => ({ tool: n.tool || n.tool_name, status: n.status, error: n.error || null, arguments: n.arguments })),
    assistant: assistant?.text || '', screenshot, refreshedTurns,
    clarificationCount: assistant?.clarifications?.length || 0, browserKeptOpen: !ctx.page.isClosed() };
  await write(ctx, 'B02-result.json', result);
  return result;
}

async function b03UserDraft(ctx) {
  const draft = await ctx.page.evaluate(() => {
    const focused = document.activeElement;
    const inEditor = focused?.closest('.ed-root, .editor-root, [id^="editor-"]') ||
      /\bed-/.test(String(focused?.className || ''));
    return {
      composer: !!document.querySelector('#workspace-prompt')?.textContent?.trim(),
      editorInput: !!(inEditor && focused?.matches('textarea, input:not([type="range"]):not([type="file"]), [contenteditable="true"]')),
      openCaptionInput: [...document.querySelectorAll('textarea')].some(e => e.getClientRects().length && /caption|subtitle/.test(e.className)),
    };
  });
  assert(!draft.composer && !draft.editorInput && !draft.openCaptionInput, '检测到用户输入/编辑草稿，未覆盖或刷新');
  return draft;
}

/** B03 uses the inspected current revision, never the old revision-2 fixture.
 * Accepted/uncertain submissions are guarded permanently; use observe/finish to resume.
 */
export async function runB03(ctx, { expectedRevision, target = {}, timeoutMs = 600_000, onProgress = () => {} } = {}) {
  assert(Number.isInteger(expectedRevision), '先核对当前已保存版本，再传expectedRevision');
  const spec = { ...b03Spec, projectId: target.projectId || b03Spec.projectId,
    conversationId: target.conversationId || b03Spec.conversationId, projectName: target.projectName || b03Spec.projectName };
  spec.prompt = b03Spec.prompt.replace('“英文30S.mp4”', `“${spec.projectName}”`);
  await ctx.fs.mkdir(ctx.report, { recursive: true });
  const guard = await ctx.fs.open(ctx.path.join(ctx.report, 'B03-started.lock'), 'wx');
  await guard.writeFile(new Date().toISOString()); await guard.close();
  let submission;
  try {
    const selectedIds = await ctx.page.locator('[aria-controls^="editor-inspector-"]').evaluateAll(elements =>
      [...new Set(elements.map(e => e.getAttribute('aria-controls').replace('editor-inspector-', '')))]);
    assert.deepEqual(selectedIds, [spec.projectId], '当前选中的同名工程与授权目标不符，未发送');
    const before = await project(ctx, spec.projectId), videos = videoSegments(before);
    assert.equal(before.project_id, spec.projectId);
    assert.equal(before.content.name, spec.projectName);
    assert.equal(before.revision, expectedRevision, '已核对的用户基线再次变化，未发送');
    assert.equal(videos.length, 1, 'B03要求当前唯一视频片段');
    const clip = videos[0];
    assert(sameNumber(clip.source_in_sec, 0) && sameNumber(clip.timeline_start_sec + clip.offset_sec, 0), '重新核对实际视频起点，不套用旧目标');
    assert(sameNumber(clip.playback_rate, 1) && clip.source_out_sec > b03Spec.trimHeadSeconds);
    const ui = await view(ctx);
    assert.equal(ui.projectName, spec.projectName);
    assert.equal(ui.url, `${origin}/c/${spec.conversationId}`);
    await write(ctx, 'B03-view-before.json', ui);
    await write(ctx, 'B03-draft-check.json', await b03UserDraft(ctx));
    await ctx.page.waitForTimeout(1000);
    const stable = await project(ctx, spec.projectId);
    assert(stable.revision === before.revision && JSON.stringify(stable.content) === JSON.stringify(before.content), '用户工程仍在保存或有并发修改，未发送');
    await b03UserDraft(ctx);
    await b03SourceFrame(ctx);
    await b03UserDraft(ctx);
    await ctx.page.waitForTimeout(1000);
    const afterPreview = await project(ctx, spec.projectId);
    assert(afterPreview.revision === before.revision && JSON.stringify(afterPreview.content) === JSON.stringify(before.content), '参考帧检查期间保存基线发生变化，未发送');
    const selectedNow = await ctx.page.locator('[aria-controls^="editor-inspector-"]').evaluateAll(elements =>
      [...new Set(elements.map(e => e.getAttribute('aria-controls').replace('editor-inspector-', '')))]);
    assert.deepEqual(selectedNow, [spec.projectId], '发送前当前工程已切换，未发送');
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B03-before.png') });
    submission = await submit(ctx, { ...spec, expectedRevision });
    onProgress({ phase: 'accepted', ...submission });
    let observed; const started = Date.now();
    do {
      observed = await observe(ctx, 'B03');
      onProgress({ phase: 'observation', caseId: 'B03', status: observed.status, elapsedSec: observed.elapsedSec });
      if (observed.status === 'requires_user_input') {
        const result = { caseId: 'B03', status: 'Blocked', runId: submission.runId, verificationComplete: false,
          reason: '检查并填写本轮真实补槽后继续原run；只调用observe/finishB03，不重提B03', screenshot: 'B03-user-clarification.png' };
        await write(ctx, 'B03-result.json', result); return result;
      }
      if (['done', 'failed', 'cancelled', 'canceled'].includes(observed.status)) break;
      await ctx.page.waitForTimeout(5000);
    } while (Date.now() - started < timeoutMs);
    assert(['done', 'failed', 'cancelled', 'canceled'].includes(observed?.status), '原run未结束，仅续接回读，不重新发送');
    return await finishB03(ctx);
  } catch (error) {
    const screenshot = submission ? 'B03-verification-error.png' : 'B03-precondition-failed.png';
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) }).catch(() => {});
    const attempted = await ctx.fs.access(ctx.path.join(ctx.report, 'B03-user-intent.json')).then(() => true).catch(() => false);
    const result = { caseId: 'B03', status: submission ? 'Failed' : 'Blocked', runId: submission?.runId,
      accepted: submission ? true : attempted ? null : false, submissionUncertain: !submission && attempted,
      verificationComplete: false, reason: String(error).split('\n')[0].slice(0, 400), screenshot };
    await write(ctx, 'B03-result.json', result); return result;
  }
}

async function b03FirstFrame(ctx, after) {
  const videos = videoSegments(after), clip = videos[0];
  const start = clip.timeline_start_sec + clip.offset_sec;
  await b03Seek(ctx, start);
  const sample = await b03FrameSample(ctx);
  const reference = await read(ctx, 'B03-source-frame.json');
  const hashes = reference.frames.map(v => v.pixelSha256).filter(Boolean);
  const matches = hashes.length > 0 && sample.some(v => v.pixelSha256 && hashes.includes(v.pixelSha256));
  const readable = hashes.length > 0 && sample.some(v => v.pixelSha256);
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B03-first-frame-after.png') });
  const result = { status: matches ? 'Passed' : readable ? 'Failed' : 'NeedsReview',
    requestedSourceStart: b03Spec.trimHeadSeconds, videos: sample,
    screenshot: 'B03-first-frame-after.png', referenceScreenshot: 'B03-source-frame.png',
    reason: matches ? '当前视频帧像素与本轮原视频4秒参考帧完全一致' : readable ? '当前视频帧像素与参考帧不一致，保留真实截图复核' : '浏览器未允许像素读取，需对照两张原始截图人工审核；未自动判通过' };
  await write(ctx, 'B03-first-frame.json', result); return result;
}

async function b03Seek(ctx, seconds) {
  const slider = ctx.page.locator('.ed-preview-playback input[type="range"]');
  await slider.waitFor({ state: 'visible' });
  // Use real pointer/keyboard input: changing the DOM range value alone does not
  // necessarily seek this React preview. Correct the pointer's pixel rounding by
  // the control's published step, without introducing a media-time tolerance.
  if (seconds === 0) await slider.press('Home');
  else {
    const box = await slider.boundingBox(), max = Number(await slider.getAttribute('max'));
    assert(box && max > 0, '预览进度条不可操作');
    await slider.click({ position: { x: 8 + (box.width - 16) * seconds / max, y: box.height / 2 } });
    const step = Number(await slider.getAttribute('step'));
    assert(step > 0, '预览控件未提供可用步长');
    const delta = Math.round((seconds - Number(await slider.inputValue())) / step);
    assert(Math.abs(delta) < 100, '预览定位需先核对真实控件范围');
    for (let i = 0; i < Math.abs(delta); i++) await slider.press(delta > 0 ? 'ArrowRight' : 'ArrowLeft');
  }
  await ctx.page.waitForTimeout(1000);
  assert(sameNumber(Number(await slider.inputValue()), seconds), '预览定位未到指定时间');
}

async function b03FrameSample(ctx) {
  return ctx.page.locator('.ed-preview-canvas video').evaluateAll(async elements => {
    const frames = [];
    for (const video of elements.filter(v => v.getClientRects().length)) {
      const frame = { currentTime: video.currentTime, readyState: video.readyState, error: video.error?.code || null,
        width: video.videoWidth, height: video.videoHeight };
      try {
        if (video.readyState < 2 || !video.videoWidth) throw Error('视频帧未就绪');
        const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        const draw = canvas.getContext('2d'); draw.drawImage(video, 0, 0);
        const pixels = draw.getImageData(0, 0, canvas.width, canvas.height).data;
        frame.pixelSha256 = [...new Uint8Array(await crypto.subtle.digest('SHA-256', pixels))].map(x => x.toString(16).padStart(2, '0')).join('');
      } catch (e) { frame.pixelReadError = e.name || 'Unavailable'; }
      frames.push(frame);
    }
    return frames;
  });
}

async function b03SourceFrame(ctx) {
  const slider = ctx.page.locator('.ed-preview-playback input[type="range"]');
  const originalTime = Number(await slider.inputValue());
  const pause = ctx.page.getByRole('button', { name: /^(预览暂停|Pause preview)$/ });
  if (await pause.isVisible()) await pause.click();
  try {
    await b03Seek(ctx, b03Spec.trimHeadSeconds);
    const frames = await b03FrameSample(ctx);
    assert(frames.some(v => v.readyState >= 2 && !v.error && sameNumber(v.currentTime, b03Spec.trimHeadSeconds)), '原视频4秒参考帧未实际就绪，未提交裁剪');
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B03-source-frame.png') });
    await write(ctx, 'B03-source-frame.json', { sourceSeconds: b03Spec.trimHeadSeconds, frames, screenshot: 'B03-source-frame.png' });
  } finally { await b03Seek(ctx, originalTime); }
}

async function restoreB03(ctx, before, after, nodes) {
  const existing = await read(ctx, 'B03-restoration.json').catch(() => null);
  if (existing) return existing;
  let result;
  if (JSON.stringify(before.content) === JSON.stringify(after.content)) result = { status: 'NotNeeded', reason: '本轮未改工程', revision: after.revision };
  else {
    const ownWrite = nodes.some(n => /^(editor_video_clip_trim|editor_batch_apply)$/.test(n.tool || n.tool_name || '') && n.status === 'done');
    const current = await project(ctx, before.project_id);
    const safe = ownWrite && after.revision === before.revision + 1 && current.revision === after.revision && JSON.stringify(current.content) === JSON.stringify(after.content);
    if (!safe) result = { status: 'Blocked', reason: '不能确认最新改动仅属于本轮，未撤销可能的用户编辑' };
    else {
      await b03UserDraft(ctx);
      const undo = ctx.page.getByRole('button', { name: /^(撤销|Undo)$/, exact: true }).first();
      if (!await undo.isEnabled()) result = { status: 'Blocked', reason: '没有可用撤销入口，未覆盖用户工程' };
      else {
        // Persist intent before clicking; a resumed finisher must never click twice.
        await write(ctx, 'B03-restoration.json', { status: 'Pending', reason: '单次页面撤销已准备；续接只回读，不重复点击' });
        await undo.click(); const started = Date.now();
        do {
          const restored = await project(ctx, before.project_id);
          if (JSON.stringify(restored.content) === JSON.stringify(before.content)) {
            await write(ctx, 'B03-restored-project.json', restored);
            result = { status: 'Passed', method: '单次页面撤销', revision: restored.revision, contentMatchesBefore: true }; break;
          }
          await ctx.page.waitForTimeout(1000);
        } while (Date.now() - started < 30000);
        result ||= { status: 'Failed', reason: '撤销一次后未恢复；已停止，不连续撤销或覆盖JSON' };
      }
    }
  }
  await write(ctx, 'B03-restoration.json', result); return result;
}

/** Verify only the accepted B03 run. User drafts stop refresh/cleanup rather
 * than being blurred, discarded, or replaced by an old snapshot. */
export async function finishB03(ctx) {
  const cached = await read(ctx, 'B03-result.json').catch(() => null);
  if (cached?.verificationComplete) return cached;
  const execution = await read(ctx, 'B03-user-execution.json'), before = await read(ctx, 'B03-user-before.json');
  const spec = { projectId: execution.projectId, conversationId: execution.conversationId, projectName: execution.projectName, prompt: execution.prompt };
  const assistant = execution.messages.filter(m => m.role === 'assistant').at(-1), nodes = assistant?.plan || [], after = execution.after;
  const original = videoSegments(before)[0], clips = videoSegments(after), target = clips[0];
  const checks = [], check = (name, passed) => checks.push({ name, passed: !!passed });
  check('任务成功结束且未声明未完成', assistant?.status === 'done' && assistant.intent_fully_satisfied !== false);
  check('无失败工具步骤', nodes.every(n => !n.error && n.status !== 'failed'));
  check('仍为同一原始视频的一个片段', clips.length === 1 && target.file_id === original.file_id);
  check('视频源入点已裁到请求4秒', sameNumber(target?.source_in_sec, b03Spec.trimHeadSeconds));
  check('源终点及播放速度保持', sameNumber(target?.source_out_sec, original.source_out_sec) && sameNumber(target?.playback_rate, original.playback_rate));
  check('没有额外移动视频片段', sameNumber(target?.timeline_start_sec + target?.offset_sec, original.timeline_start_sec + original.offset_sec));
  const actualSeconds = target && (target.source_out_sec - target.source_in_sec) / target.playback_rate;
  check('视频保留原4秒之后的全部内容', sameNumber(actualSeconds, (original.source_out_sec - b03Spec.trimHeadSeconds) / original.playback_rate));
  check('结果保存于用户原工程', after.project_id === before.project_id && after.content.name === before.content.name);
  const tracksOf = (p, predicate) => p.content.tracks.filter(predicate);
  const linkedChanges = {
    subtitlesUnchanged: JSON.stringify(tracksOf(before, t => t.type === 'subtitle')) === JSON.stringify(tracksOf(after, t => t.type === 'subtitle')),
    narrationUnchanged: JSON.stringify(tracksOf(before, t => t.role === 'narration')) === JSON.stringify(tracksOf(after, t => t.role === 'narration')),
    nonVideoUnchanged: JSON.stringify(tracksOf(before, t => t.type !== 'video')) === JSON.stringify(tracksOf(after, t => t.type !== 'video')),
  };
  await write(ctx, 'B03-linked-changes.json', linkedChanges);
  check('字幕及独立旁白未被额外调整', linkedChanges.subtitlesUnchanged && linkedChanges.narrationUnchanged);
  const rawFocus = nodes.find(n => n.error)?.error;
  const focus = typeof rawFocus === 'string' ? rawFocus : rawFocus?.error?.message || rawFocus?.message || assistant?.text;
  if (typeof focus === 'string' && focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B03-terminal.png') });
  let firstFrame = { status: 'NotRun', reason: '裁头未完成，不用原片首帧冒充裁后画面通过' };
  if (checks.every(c => c.passed)) firstFrame = await b03FirstFrame(ctx, after);
  const current = await project(ctx, spec.projectId); await b03UserDraft(ctx);
  assert(current.revision === after.revision && JSON.stringify(current.content) === JSON.stringify(after.content), '检测到后续用户改动，未刷新或恢复');
  const refreshedTurns = [], track = r => { if (r.method() === 'POST' && /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(r.url()).pathname)) refreshedTurns.push('POST /turns'); };
  ctx.page.on('request', track); let refreshed;
  try {
    await ctx.page.reload({ waitUntil: 'domcontentloaded', timeout: 60_000 });
    await ctx.page.locator('#workspace-prompt').waitFor({ state: 'visible', timeout: 45_000 });
    const editorName = ctx.page.locator('.ed-project-name').first();
    await editorName.waitFor({ state: 'visible', timeout: 6000 }).catch(async () => {
      const toggle = ctx.page.locator('.workspace-editor-toggle');
      if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
      await editorName.waitFor({ state: 'visible', timeout: 30000 });
    });
    await ctx.page.waitForFunction(name => Array.from(document.querySelectorAll('.ed-project-name')).some(n => n.textContent?.trim() === name), spec.projectName, { timeout: 45000 });
    refreshed = await project(ctx, spec.projectId); await write(ctx, 'B03-refreshed-project.json', refreshed);
    check('刷新后实际保存结果和版本一致', refreshed.revision === after.revision && JSON.stringify(refreshed.content) === JSON.stringify(after.content));
    check('刷新仍在用户会话且未重提任务', ctx.page.url().split('?')[0] === `${origin}/c/${spec.conversationId}` && refreshedTurns.length === 0);
  } finally { ctx.page.off('request', track); }
  if (firstFrame.status !== 'NotRun') check('裁后首帧已完成真实画面对照', firstFrame.status === 'Passed');
  const passed = checks.every(c => c.passed), pendingReview = firstFrame.status === 'NeedsReview';
  const status = pendingReview ? 'Blocked' : passed ? 'Passed' : 'Failed', screenshot = `B03-${status.toLowerCase()}.png`;
  if (typeof focus === 'string' && focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
  const restoration = await restoreB03(ctx, before, after, nodes);
  const result = { caseId: 'B03', status, verificationComplete: true, prompt: spec.prompt,
    runId: execution.runId, traceId: execution.submission.traceId, projectId: spec.projectId, conversationId: spec.conversationId,
    startedAt: execution.startedAt, finishedAt: new Date().toISOString(), runtimeStatus: assistant?.status, intentSatisfied: assistant?.intent_fully_satisfied,
    beforeRevision: before.revision, afterRevision: after.revision, refreshedRevision: refreshed.revision, unchanged: execution.unchanged,
    beforeVideo: videoSegments(before), afterVideo: clips, expectedSourceIn: b03Spec.trimHeadSeconds, expectedRemainingSeconds: original.source_out_sec - b03Spec.trimHeadSeconds,
    actualRemainingSeconds: actualSeconds, checks, failedChecks: checks.filter(c => !c.passed).map(c => c.name), linkedChanges, firstFrame, restoration,
    tools: nodes.map(n => ({ tool: n.tool || n.tool_name, status: n.status, error: n.error || null, arguments: n.arguments })),
    assistant: assistant?.text || '', screenshot, refreshedTurns, clarificationCount: assistant?.clarifications?.length || 0, browserKeptOpen: !ctx.page.isClosed() };
  await write(ctx, 'B03-result.json', result); return result;
}

async function b04Selected(ctx, spec) {
  const ids = await ctx.page.locator('[aria-controls^="editor-inspector-"]').evaluateAll(elements =>
    [...new Set(elements.map(e => e.getAttribute('aria-controls').replace('editor-inspector-', '')))]);
  assert.deepEqual(ids, [spec.projectId], 'B04当前工程ID已改变，不按同名选择其他工程');
  assert.equal(ctx.page.url().split('?')[0], `${origin}/c/${spec.conversationId}`);
  assert.equal((await ctx.page.locator('.ed-project-name').first().innerText()).trim(), spec.projectName);
}

/** B04 requires an explicitly inspected current project, not a historical ID. */
export async function runB04(ctx, { target, expectedRevision, timeoutMs = 600_000, onProgress = () => {} } = {}) {
  assert(target?.projectId && target?.conversationId && target?.projectName && Number.isInteger(expectedRevision), '先核对当前项目完整身份与保存版本');
  const spec = { ...b04Spec, ...target, expectedRevision };
  await ctx.fs.mkdir(ctx.report, { recursive: true });
  const guard = await ctx.fs.open(ctx.path.join(ctx.report, 'B04-started.lock'), 'wx');
  await guard.writeFile(new Date().toISOString()); await guard.close();
  let submission;
  try {
    await b04Selected(ctx, spec); await b03UserDraft(ctx);
    const before = await project(ctx, spec.projectId), videos = videoSegments(before);
    assert.equal(before.revision, expectedRevision, 'B04已核对基线再次变化，未发送');
    assert.equal(videos.length, 1, 'B04要求唯一完整视频片段');
    const clip = videos[0];
    assert(sameNumber(clip.source_in_sec, 0) && sameNumber(clip.timeline_start_sec + clip.offset_sec, 0));
    assert(sameNumber(clip.playback_rate, 1) && clip.source_out_sec > b04Spec.trimTailSeconds);
    await write(ctx, 'B04-preflight-project.json', before);
    await write(ctx, 'B04-view-before.json', await view(ctx));
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B04-before.png') });
    // Reference pictures are real preview seeks, never content edits. Always
    // restore the playhead and recheck saved content/revision before sending.
    const slider = ctx.page.locator('.ed-preview-playback input[type="range"]');
    const originalTime = Number(await slider.inputValue());
    const pause = ctx.page.getByRole('button', { name: /^(预览暂停|Pause preview)$/ });
    if (await pause.isVisible()) await pause.click();
    const reference = { frames: [], expectedSourceOut: clip.source_out_sec - b04Spec.trimTailSeconds };
    const positions = [...new Set([0, Math.floor(reference.expectedSourceOut), Math.floor(clip.source_out_sec - 1)])];
    try {
      for (const seconds of positions) {
        await b03Seek(ctx, seconds);
        const frames = await b03FrameSample(ctx), screenshot = `B04-source-${seconds}s.png`;
        await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
        reference.frames.push({ seconds, frames, screenshot });
      }
    } finally { await b03Seek(ctx, originalTime); }
    await write(ctx, 'B04-source-reference.json', reference);
    await b03UserDraft(ctx); await b04Selected(ctx, spec);
    const stable = await project(ctx, spec.projectId);
    assert(stable.revision === before.revision && JSON.stringify(stable.content) === JSON.stringify(before.content), '参考画面检查期间工程发生变化，未发送');
    submission = await submit(ctx, spec);
    onProgress({ phase: 'accepted', ...submission });
    let state; const started = Date.now();
    do {
      state = await observe(ctx, 'B04');
      onProgress({ phase: 'observation', caseId: 'B04', status: state.status, elapsedSec: state.elapsedSec });
      if (state.status === 'requires_user_input') {
        const result = { caseId: 'B04', status: 'Blocked', verificationComplete: false, runId: submission.runId,
          reason: '沿原run检查并填写真实补槽后继续，不能重提B04', screenshot: 'B04-user-clarification.png' };
        await write(ctx, 'B04-result.json', result); return result;
      }
      if (['done', 'failed', 'cancelled', 'canceled'].includes(state.status)) break;
      await ctx.page.waitForTimeout(5000);
    } while (Date.now() - started < timeoutMs);
    assert(['done', 'failed', 'cancelled', 'canceled'].includes(state?.status), '原run尚未结束，只续接回读');
    return await finishB04(ctx);
  } catch (error) {
    const screenshot = submission ? 'B04-verification-error.png' : 'B04-precondition-failed.png';
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) }).catch(() => {});
    const attempted = await ctx.fs.access(ctx.path.join(ctx.report, 'B04-user-intent.json')).then(() => true).catch(() => false);
    const result = { caseId: 'B04', status: submission ? 'Failed' : 'Blocked', verificationComplete: false,
      accepted: submission ? true : attempted ? null : false, submissionUncertain: !submission && attempted,
      runId: submission?.runId, reason: String(error).split('\n')[0].slice(0, 400), screenshot };
    await write(ctx, 'B04-result.json', result); return result;
  }
}

async function b04CompareFrames(ctx) {
  const reference = await read(ctx, 'B04-source-reference.json');
  const rows = [];
  for (const saved of reference.frames.filter(r => r.seconds < reference.expectedSourceOut)) {
    await b03Seek(ctx, saved.seconds);
    const frames = await b03FrameSample(ctx), hashes = saved.frames.map(v => v.pixelSha256).filter(Boolean);
    const readable = hashes.length > 0 && frames.some(v => v.pixelSha256);
    const matches = readable && frames.some(v => hashes.includes(v.pixelSha256));
    const screenshot = `B04-retained-${saved.seconds}s.png`;
    await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
    rows.push({ seconds: saved.seconds, status: matches ? 'Passed' : readable ? 'Failed' : 'NeedsReview', frames, screenshot });
  }
  const result = { status: rows.some(r => r.status === 'Failed') ? 'Failed' : rows.every(r => r.status === 'Passed') ? 'Passed' : 'NeedsReview', rows };
  await write(ctx, 'B04-retained-frames.json', result); return result;
}

async function restoreB04(ctx, before, after, nodes, spec) {
  const existing = await read(ctx, 'B04-restoration.json').catch(() => null);
  if (existing) return existing;
  let result;
  if (JSON.stringify(before.content) === JSON.stringify(after.content)) result = { status: 'NotNeeded', reason: '本轮未改工程', revision: after.revision };
  else {
    const ownWrite = nodes.some(n => /^(editor_video_clip_trim|editor_batch_apply)$/.test(n.tool || n.tool_name || '') && n.status === 'done');
    const current = await project(ctx, spec.projectId);
    if (!ownWrite || after.revision !== before.revision + 1 || current.revision !== after.revision || JSON.stringify(current.content) !== JSON.stringify(after.content))
      result = { status: 'Blocked', reason: '不能确认最新单次编辑完全属于本轮，未自动撤销' };
    else {
      await b04Selected(ctx, spec); await b03UserDraft(ctx);
      const undo = ctx.page.getByRole('button', { name: /^(撤销|Undo)$/, exact: true }).first();
      if (!await undo.isEnabled()) result = { status: 'Blocked', reason: '没有可用撤销入口，不覆盖JSON' };
      else {
        await write(ctx, 'B04-restoration.json', { status: 'Pending', reason: '已准备单次撤销，续接不重复点击' });
        await undo.click(); const started = Date.now();
        do {
          const restored = await project(ctx, spec.projectId);
          if (JSON.stringify(restored.content) === JSON.stringify(before.content)) {
            await write(ctx, 'B04-restored-project.json', restored);
            result = { status: 'Passed', revision: restored.revision, method: '单次页面撤销', contentMatchesBefore: true }; break;
          }
          await ctx.page.waitForTimeout(1000);
        } while (Date.now() - started < 30000);
        result ||= { status: 'Failed', reason: '单次撤销未恢复，停止，不连续撤销或覆盖JSON' };
      }
    }
  }
  await write(ctx, 'B04-restoration.json', result); return result;
}

/** Verify only the original accepted B04; no automatic stale-revision retry. */
export async function finishB04(ctx) {
  const cached = await read(ctx, 'B04-result.json').catch(() => null);
  if (cached?.verificationComplete) return cached;
  const execution = await read(ctx, 'B04-user-execution.json'), before = await read(ctx, 'B04-user-before.json');
  const spec = execution, after = execution.after, original = videoSegments(before)[0], clips = videoSegments(after), clip = clips[0];
  const assistant = execution.messages.filter(m => m.role === 'assistant').at(-1), nodes = assistant?.plan || [];
  const expectedOut = original.source_out_sec - b04Spec.trimTailSeconds * original.playback_rate;
  const checks = [], check = (name, passed) => checks.push({ name, passed: !!passed });
  check('任务成功结束且未声明未完成', assistant?.status === 'done' && assistant.intent_fully_satisfied !== false);
  check('无失败工具步骤', nodes.every(n => !n.error && n.status !== 'failed'));
  check('仍为同一原视频的一个片段', clips.length === 1 && clip.file_id === original.file_id);
  check('只将视频源终点裁去最后3秒', sameNumber(clip?.source_out_sec, expectedOut));
  check('视频源起点和播放速度保持', sameNumber(clip?.source_in_sec, original.source_in_sec) && sameNumber(clip?.playback_rate, original.playback_rate));
  check('视频片段没有额外移动', sameNumber(clip?.timeline_start_sec + clip?.offset_sec, original.timeline_start_sec + original.offset_sec));
  const actualSeconds = clip && (clip.source_out_sec - clip.source_in_sec) / clip.playback_rate;
  check('视频内容时长减少3秒', sameNumber(actualSeconds, (original.source_out_sec - original.source_in_sec) / original.playback_rate - b04Spec.trimTailSeconds));
  check('结果仍属用户指定的最新工程', after.project_id === spec.projectId && after.content.name === spec.projectName);
  const tracksOf = (p, predicate) => p.content.tracks.filter(predicate);
  const linkedChanges = {
    subtitlesUnchanged: JSON.stringify(tracksOf(before, t => t.type === 'subtitle')) === JSON.stringify(tracksOf(after, t => t.type === 'subtitle')),
    narrationUnchanged: JSON.stringify(tracksOf(before, t => t.role === 'narration')) === JSON.stringify(tracksOf(after, t => t.role === 'narration')),
    nonVideoUnchanged: JSON.stringify(tracksOf(before, t => t.type !== 'video')) === JSON.stringify(tracksOf(after, t => t.type !== 'video')),
  };
  await write(ctx, 'B04-linked-changes.json', linkedChanges);
  const rawError = nodes.find(n => n.error)?.error;
  const focus = typeof rawError === 'string' ? rawError : rawError?.error?.message || rawError?.message || assistant?.text;
  if (focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, 'B04-terminal.png') });
  let frames = { status: 'NotRun', reason: '裁尾未完成，不用原片画面冒充裁后画面通过' };
  if (checks.every(c => c.passed)) frames = await b04CompareFrames(ctx);
  await b04Selected(ctx, spec); await b03UserDraft(ctx);
  const current = await project(ctx, spec.projectId);
  assert(current.revision === after.revision && JSON.stringify(current.content) === JSON.stringify(after.content), '检测到后续用户编辑，未刷新/恢复');
  const refreshedTurns = [], track = r => { if (r.method() === 'POST' && /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(r.url()).pathname)) refreshedTurns.push('POST /turns'); };
  ctx.page.on('request', track); let refreshed;
  try {
    await ctx.page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await ctx.page.locator('#workspace-prompt').waitFor({ state: 'visible', timeout: 45000 });
    await ctx.page.locator('.ed-project-name').first().waitFor({ state: 'visible', timeout: 6000 }).catch(async () => {
      const toggle = ctx.page.locator('.workspace-editor-toggle');
      if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
    });
    await ctx.page.waitForFunction(name => [...document.querySelectorAll('.ed-project-name')].some(n => n.textContent?.trim() === name), spec.projectName, { timeout: 45000 });
    await b04Selected(ctx, spec);
    refreshed = await project(ctx, spec.projectId); await write(ctx, 'B04-refreshed-project.json', refreshed);
    check('刷新后实际保存内容及版本一致', refreshed.revision === after.revision && JSON.stringify(refreshed.content) === JSON.stringify(after.content));
    check('刷新未重新提交编辑任务', refreshedTurns.length === 0);
  } finally { ctx.page.off('request', track); }
  if (frames.status !== 'NotRun') check('保留画面与本轮原片参考一致', frames.status === 'Passed');
  const status = frames.status === 'NeedsReview' ? 'Blocked' : checks.every(c => c.passed) ? 'Passed' : 'Failed';
  const screenshot = `B04-${status.toLowerCase()}.png`;
  if (focus) await ctx.page.getByText(focus, { exact: false }).last().scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
  await ctx.page.screenshot({ path: ctx.path.join(ctx.report, screenshot) });
  const restoration = await restoreB04(ctx, before, after, nodes, spec);
  const result = { caseId: 'B04', status, verificationComplete: true, prompt: spec.prompt,
    projectId: spec.projectId, conversationId: spec.conversationId, projectName: spec.projectName,
    runId: execution.runId, traceId: execution.submission.traceId, startedAt: execution.startedAt, finishedAt: new Date().toISOString(),
    runtimeStatus: assistant?.status, intentSatisfied: assistant?.intent_fully_satisfied,
    beforeRevision: before.revision, afterRevision: after.revision, refreshedRevision: refreshed.revision, unchanged: execution.unchanged,
    beforeVideo: videoSegments(before), afterVideo: clips, expectedSourceOut: expectedOut, actualRemainingSeconds: actualSeconds,
    checks, failedChecks: checks.filter(c => !c.passed).map(c => c.name), linkedChanges, retainedFrames: frames, restoration,
    tools: nodes.map(n => ({ tool: n.tool || n.tool_name, status: n.status, error: n.error || null, arguments: n.arguments })),
    assistant: assistant?.text || '', screenshot, refreshedTurns, clarificationCount: assistant?.clarifications?.length || 0, browserKeptOpen: !ctx.page.isClosed() };
  await write(ctx, 'B04-result.json', result); return result;
}
