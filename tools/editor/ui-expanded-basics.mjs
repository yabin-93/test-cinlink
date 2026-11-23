// Single-action checks invoked inside the existing interactive browser driver.
// No launch, API mutation, Agent prompt, automatic retry or cloud defect submission.
import assert from 'node:assert/strict';
import { contentEqual, seekUI, dragEdge } from './ui-basics.mjs?expanded-20261106';

export const subtitleTrack = p => p.content.tracks.find(t => t.type === 'subtitle');
export const videoTrack = p => p.content.tracks.find(t => t.type === 'video');
export const narrationTrack = p => p.content.tracks.find(t => t.type === 'audio' && t.role === 'narration');
export const unchangedExcept = (a, b, key) => {
  const x = structuredClone(a.content), y = structuredClone(b.content);
  delete x[key]; delete y[key];
  return JSON.stringify(x) === JSON.stringify(y);
};

export async function captions(page) {
  const tab = page.locator('button[data-tab="captions"]');
  if (await tab.getAttribute('aria-expanded') !== 'true') await tab.click();
  await page.getByRole('button', { name: '字幕', exact: true }).first().click();
}

export async function style(page) {
  const tab = page.locator('button[data-tab="captions"]');
  if (await tab.getAttribute('aria-expanded') !== 'true') await tab.click();
  await page.getByRole('button', { name: '样式', exact: true }).click();
  await seekUI(page, 1);
  const more = page.locator('details.ed-typography-more');
  if (await more.count() && !(await more.getAttribute('open') !== null)) await more.locator('summary').click();
}

export async function field(page, label, value) {
  const control = page.getByLabel(label, { exact: true });
  await control.fill(String(value)); await control.press('Enter'); await control.blur();
}

// An individual change must save, survive refresh, and be undone through the UI.
// Failure to restore is fatal: later items must not inherit an uncertain baseline.
export async function single(d, id, label, action, verify, options = {}) {
  const result = await d.run(id, label, action, verify, { timeoutMs: 9000, ...options });
  if (result.changed) {
    try {
      await d.refresh(result.after, id);
      await d.ctx.page.screenshot({ path: d.ctx.path.join(d.ctx.report, `${id}-refreshed.png`), timeout: 30000 });
    } finally {
      await d.restore(id, result.before);
      await d.refresh(result.before, `${id}-restored`);
    }
  } else {
    await d.refresh(result.before, `${id}-unchanged`);
  }
  return { id, status: result.status, reason: result.reason, beforeRevision: result.beforeRevision, afterRevision: result.afterRevision };
}

export async function styleCheck(d, id, label, action, check) {
  await style(d.ctx.page);
  return single(d, id, label, action, (a, b) => a.revision > b.revision &&
    unchangedExcept(a, b, 'subtitle_style') && check(a.content.subtitle_style, b.content.subtitle_style));
}

export async function selectedTimeline(page, trackId) {
  const clip = page.locator(`.ed-track-row[data-track-id="${trackId}"] .ed-timeline-clip`).first();
  await seekUI(page, 10);
  await clip.click({ position: { x: 100, y: 10 } });
  assert(await clip.count());
  return clip;
}

export { contentEqual };

export async function timeInputChecks(d) {
  const page = d.ctx.page, out = [];
  await captions(page); await page.getByRole('button', { name: '编辑字幕时间', exact: true }).first().click();
  out.push(await single(d, 'UI-12', '字幕结束时间输入框：3.20改为2.70', () => field(page, '字幕结束时间', '00:02.70'),
    async (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) &&
      (await page.getByRole('button', { name: '编辑字幕时间', exact: true }).first().innerText()).includes('00:02.70')));
  await captions(page); await page.getByRole('button', { name: '编辑字幕时间', exact: true }).first().click();
  out.push(await single(d, 'UI-13', '字幕结束早于开始：阻止保存', async () => {
    await field(page, '字幕结束时间', '00:00.01'); await page.waitForTimeout(1500);
  }, async (a, b) => a.revision === b.revision && contentEqual(a, b) &&
    (await page.locator('.ed-caption-panel').innerText()).includes('结束时间必须晚于开始时间')));
  return out;
}

export async function viewChecks(d, { skipZoom = false, frameId = 'UI-39' } = {}) {
  const page = d.ctx.page, out = [];
  let enlarged = false, restored = false;
  if (!skipZoom) out.push(await single(d, 'UI-38', '时间轴放大及恢复', async () => {
    const slider = page.getByLabel('时间轴缩放', { exact: true }), before = Number(await slider.inputValue());
    await page.getByRole('button', { name: '放大时间轴', exact: true }).click();
    enlarged = Number(await slider.inputValue()) > before;
    await page.getByRole('button', { name: '缩小时间轴', exact: true }).click();
    restored = Number(await slider.inputValue()) === before;
  }, (a, b) => enlarged && restored && a.revision === b.revision && contentEqual(a, b)));
  const steps = {};
  out.push(await single(d, frameId, '逐帧前后与跳转开头', async () => {
    const slider = page.getByLabel('预览播放进度', { exact: true });
    await seekUI(page, 1); steps.start = Number(await slider.inputValue());
    await page.locator('.ed-playback-tools').hover();
    await page.locator('details.ed-playback-more > summary').click();
    await page.getByRole('button', { name: '下一帧', exact: true }).click(); steps.next = Number(await slider.inputValue());
    await page.getByRole('button', { name: '上一帧', exact: true }).click(); steps.previous = Number(await slider.inputValue());
    await page.getByRole('button', { name: '跳转到开头', exact: true }).click(); steps.home = Number(await slider.inputValue());
    await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, 'UI-39-playhead.json'), JSON.stringify(steps, null, 2));
  }, (a, b) => steps.next > steps.start && steps.previous === steps.start && steps.home === 0 && a.revision === b.revision && contentEqual(a, b)));
  return out;
}

export async function styleBoundaries(d) {
  const page = d.ctx.page, out = [];
  await style(page);
  out.push(await single(d, 'UI-43', '字幕字号0非法值拦截', async () => {
    await field(page, '字号', 0); await page.waitForTimeout(1400);
  }, async (a, b) => a.revision === b.revision && contentEqual(a, b) &&
    await page.getByLabel('字号', { exact: true }).evaluate(e => e.validity.rangeUnderflow)));
  await style(page); await page.locator('details.ed-position-more > summary').click();
  out.push(await single(d, 'UI-44', '字幕Y坐标1.20越界拦截', async () => {
    await field(page, '字幕 Y', 1.2); await page.waitForTimeout(1400);
  }, async (a, b) => a.revision === b.revision && contentEqual(a, b) &&
    await page.getByLabel('字幕 Y', { exact: true }).evaluate(e => e.validity.rangeOverflow)));
  await style(page);
  out.push(await single(d, 'UI-45', '字幕默认颜色白色改为绿色', async () => {
    const input = page.getByLabel('默认颜色', { exact: true }); await input.fill('#00ff00'); await input.blur();
  }, (a, b) => a.content.subtitle_style.color.toUpperCase() === '#00FF00' && unchangedExcept(a, b, 'subtitle_style')));
  return out;
}

export async function addCaptionAndEditCheck(d) {
  const page = d.ctx.page;
  await captions(page); await seekUI(page, 28.2);
  let insertedId;
  const add = await d.run('UI-26-direct', '添加字幕：新空行可在面板定位并编辑', async () => {
    await page.getByRole('button', { name: '添加字幕', exact: true }).click();
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
      const p = await d.get();
      insertedId = subtitleTrack(p).clips[0].diff.find(row => row.start_sec === 28.2 && row.text === '' && row.after)?.identity;
      if (insertedId) break;
      await page.waitForTimeout(500);
    }
    assert(insertedId, '没有保存新增字幕空行');
    const panel = page.locator('.ed-caption-panel');
    await panel.hover(); await page.mouse.wheel(0, 4000); await page.waitForTimeout(800);
  }, async (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) && insertedId &&
    await page.locator(`.ed-caption-text[data-block-id="${insertedId}"]`).count() === 1);
  try {
    if (add.status !== 'Passed') return { add: { id: add.id, status: add.status }, edit: 'Blocked: 新字幕行无法定位' };
    await d.refresh(add.after, 'UI-26-direct');
    await captions(page); await page.locator('.ed-caption-panel').hover(); await page.mouse.wheel(0, 4000); await page.waitForTimeout(800);
    const edit = await d.run('UI-46', '新增空字幕填写并提交文字', async () => {
      await page.locator(`.ed-caption-text[data-block-id="${insertedId}"]`).click();
      await page.locator('.ed-caption-inline-input').fill('TEST caption');
      await page.locator('.ed-caption-inline-input').press('Enter');
    }, (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) && subtitleTrack(a).clips[0].diff.some(row => row.identity === insertedId && row.text === 'TEST caption'));
    if (edit.changed) {
      await d.refresh(edit.after, 'UI-46');
      await d.restore('UI-46', edit.before); await d.refresh(edit.before, 'UI-46-restored');
    }
    return { add: { id: add.id, status: add.status }, edit: { id: edit.id, status: edit.status } };
  } finally {
    await d.restore('UI-26-direct', add.before); await d.refresh(add.before, 'UI-26-direct-restored');
  }
}

export async function watermarkChecks(d) {
  const page = d.ctx.page, out = [];
  const tab = page.locator('button[data-tab="watermark"]');
  const open = async () => { if (await tab.getAttribute('aria-expanded') !== 'true') await tab.click(); };
  await open();
  const add = await d.run('UI-42', '添加文字水印TEST', async () => {
    const input = page.getByLabel('文字', { exact: true }); await input.fill('TEST'); await input.blur();
  }, (a, b) => a.content.watermarks.text?.text === 'TEST' && unchangedExcept(a, b, 'watermarks'));
  out.push({ id: add.id, status: add.status });
  try {
    if (add.status !== 'Passed') return out;
    await d.refresh(add.after, 'UI-42');
    await open();
    out.push(await single(d, 'UI-47', '文字水印内容改为TEST 2', async () => {
      const input = page.getByLabel('文字', { exact: true }); await input.fill('TEST 2'); await input.blur();
    }, (a, b) => a.content.watermarks.text?.text === 'TEST 2' && unchangedExcept(a, b, 'watermarks')));
    await open();
    out.push(await single(d, 'UI-48', '文字水印不透明度75%改为50%', async () => {
      const input = page.getByLabel('水印不透明度', { exact: true }); await input.fill('0.5'); await input.press('Tab');
    }, (a, b) => a.content.watermarks.text?.opacity === .5 && unchangedExcept(a, b, 'watermarks')));
    await open();
    out.push(await single(d, 'UI-49', '关闭水印显示', () => page.getByRole('switch', { name: '启用水印', exact: true }).uncheck(),
      (a, b) => a.content.watermarks.enabled === false && a.content.watermarks.text?.text === 'TEST' && unchangedExcept(a, b, 'watermarks')));
    await open();
    const more = page.locator('.ed-wm-footer'); if (!(await more.getAttribute('open') !== null)) await more.locator('summary').click();
    out.push(await single(d, 'UI-50', '水印全片改为时间范围', () => page.getByRole('switch', { name: '全片显示', exact: true }).uncheck(),
      (a, b) => a.content.watermarks.timing.mode === 'range' && a.content.watermarks.timing.end_sec > 0 && unchangedExcept(a, b, 'watermarks')));
    await open();
    const footer = page.locator('.ed-wm-footer'); if (!(await footer.getAttribute('open') !== null)) await footer.locator('summary').click();
    out.push(await single(d, 'UI-51', '删除文字水印', () => page.getByRole('button', { name: '移除文字水印', exact: true }).click(),
      (a, b) => a.content.watermarks.text === null && unchangedExcept(a, b, 'watermarks')));
    return out;
  } finally {
    await d.restore('UI-42', add.before); await d.refresh(add.before, 'UI-42-restored');
  }
}

export async function exportVideoTaskCheck(d) {
  const { page, fs, path, report } = d.ctx, calls = [];
  const listener = async response => {
    try {
      const request = response.request(), u = new URL(response.url());
      if (request.method() !== 'POST' || !u.pathname.includes('/mcp')) return;
      const input = request.postDataJSON();
      if (input?.params?.name !== 'editor_export' && input?.method !== 'editor.task.get') return;
      calls.push({ path: u.pathname, status: response.status(), input, body: await response.json() });
      await fs.writeFile(path.join(report, 'UI-41-export-receipts.json'), JSON.stringify(calls, null, 2));
    } catch { /* Raw receipt is supplementary to the actual UI result. */ }
  };
  page.on('response', listener);
  try {
    const result = await d.run('UI-41', '导出当前视频：任务及实际产物', async () => {
      await page.getByRole('button', { name: '导出', exact: true }).click();
    }, (a, b) => {
      const data = calls.map(c => c.body?.result?.structuredContent).filter(Boolean);
      const failed = data.find(x => x.status === 'failed' || x.error);
      if (failed) throw new Error(String(failed.error?.message || '导出任务失败'));
      const ready = data.find(x => x.status === 'done' && x.result?.files?.length);
      return !!ready && a.revision === b.revision && contentEqual(a, b);
    }, { timeoutMs: 180000 });
    return { id: result.id, status: result.status, beforeRevision: result.beforeRevision, afterRevision: result.afterRevision,
      receiptCount: calls.length, reason: result.reason };
  } finally { page.off('response', listener); }
}

const sameNonSubtitleTracks = (a, b) => JSON.stringify(a.content.tracks.filter(t => t.type !== 'subtitle')) ===
  JSON.stringify(b.content.tracks.filter(t => t.type !== 'subtitle'));

export async function captionChecks(d) {
  const page = d.ctx.page, out = [];
  const clips = () => page.locator('.ed-track-subtitle .ed-timeline-clip');
  await captions(page);
  out.push(await single(d, 'UI-24', '隐藏译文字幕轨', () => page.getByRole('button', { name: '译文字幕隐藏', exact: true }).click(),
    (a, b) => subtitleTrack(a).clips[0].visible === false && sameNonSubtitleTracks(a, b)));
  await captions(page);
  out.push(await single(d, 'UI-25', '删除第二条字幕real?', async () => {
    await seekUI(page, 10);
    const clip = clips().filter({ hasText: /^real\?$/ }); assert.equal(await clip.count(), 1);
    await clip.click(); await page.locator('.ed-timeline').press('Delete');
  }, async (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) && await clips().filter({ hasText: /^real\?$/ }).count() === 0));
  await captions(page);
  const initialCount = await clips().count();
  // Empty cues do not render as non-empty timeline clips. Creation and editing
  // are checked through the actual caption panel in addCaptionAndEditCheck.
  const beforeText = (await clips().allTextContents()).join('').replace(/\s/g, '');
  out.push(await single(d, 'UI-27', '第一条字幕在1.50秒处分割', async () => {
    await seekUI(page, 10); await clips().first().click({ position: { x: 50, y: 10 } });
    await seekUI(page, 1.5); await page.getByRole('button', { name: '分割所选片段', exact: true }).click();
  }, async (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) &&
    await clips().count() === initialCount + 1 && (await clips().allTextContents()).join('').replace(/\s/g, '') === beforeText));
  await captions(page);
  out.push(await single(d, 'UI-28', '每条字幕字符数60改为30', async () => {
    const control = page.getByLabel('每条字幕字符数', { exact: true }); await control.fill('30'); await control.press('Tab');
  }, async (a, b) => a.revision > b.revision && sameNonSubtitleTracks(a, b) &&
    (await clips().allTextContents()).join('').replace(/\s/g, '') === beforeText));
  return out;
}

export async function dragMove(page, clip, seconds, duration) {
  await seekUI(page, 10);
  await clip.scrollIntoViewIfNeeded();
  await page.locator('.ed-timeline-scroll').evaluate(e => { e.scrollLeft = 0; });
  const b = await clip.boundingBox(); assert(b);
  const from = { x: b.x + 80, y: b.y + 8 };
  assert(await clip.evaluate((e, p) => e.contains(document.elementFromPoint(p.x, p.y)), from), '移动起点被遮挡，未拖动');
  await page.mouse.move(from.x, from.y); await page.mouse.down();
  await page.mouse.move(from.x + b.width / duration * seconds, from.y, { steps: 16 }); await page.mouse.up();
}

export async function mediaChecks(d) {
  const page = d.ctx.page, out = [];
  out.push(await single(d, 'UI-29', '隐藏视频轨', () => page.getByRole('button', { name: '视频隐藏', exact: true }).click(),
    (a, b) => a.revision > b.revision && videoTrack(a).visible === false && narrationTrack(a).clips.length === narrationTrack(b).clips.length));
  const baseVideo = videoTrack(d.baseline), baseAudio = narrationTrack(d.baseline);
  const video = () => page.locator(`.ed-track-row[data-track-id="${baseVideo.track_id}"] .ed-timeline-clip`).first();
  const audio = () => page.locator(`.ed-track-row[data-track-id="${baseAudio.track_id}"] .ed-timeline-clip`).first();
  out.push(await single(d, 'UI-30', '视频片段整体右移约2秒', () => dragMove(page, video(), 2, 30.6306),
    (a, b) => videoTrack(a).clips[0].timeline_start_sec > 1 && videoTrack(a).clips[0].source_in_sec === videoTrack(b).clips[0].source_in_sec && videoTrack(a).clips[0].source_out_sec === videoTrack(b).clips[0].source_out_sec));
  out.push(await single(d, 'UI-31', '复制视频并粘贴到结尾', async () => {
    await selectedTimeline(page, baseVideo.track_id); await page.locator('.ed-timeline').press('Control+c');
    await seekUI(page, 30.63); await page.locator('.ed-timeline').press('Control+v');
  }, (a, b) => videoTrack(a).clips.length === 2 && videoTrack(a).clips.every(c => c.file_id === videoTrack(b).clips[0].file_id) &&
    JSON.stringify(narrationTrack(a)) === JSON.stringify(narrationTrack(b)) && JSON.stringify(subtitleTrack(a)) === JSON.stringify(subtitleTrack(b))));
  out.push(await single(d, 'UI-32', '删除唯一视频片段', async () => {
    await selectedTimeline(page, baseVideo.track_id); await page.locator('.ed-timeline').press('Delete');
  }, (a, b) => (videoTrack(a)?.clips.length ?? 0) === 0 && JSON.stringify(narrationTrack(a)) === JSON.stringify(narrationTrack(b)) && JSON.stringify(subtitleTrack(a)) === JSON.stringify(subtitleTrack(b))));
  out.push(await single(d, 'UI-33', '独立旁白裁头约1秒', () => dragEdge(page, audio(), 'start', 1, 28.975192743764172),
    (a, b) => narrationTrack(a).clips[0].source_in_sec > .5 && JSON.stringify(videoTrack(a)) === JSON.stringify(videoTrack(b)) && JSON.stringify(subtitleTrack(a)) === JSON.stringify(subtitleTrack(b))));
  out.push(await single(d, 'UI-34', '独立旁白裁尾约1秒', () => dragEdge(page, audio(), 'end', -1, 28.975192743764172),
    (a, b) => narrationTrack(a).clips[0].source_out_sec < narrationTrack(b).clips[0].source_out_sec - .5 && JSON.stringify(videoTrack(a)) === JSON.stringify(videoTrack(b)) && JSON.stringify(subtitleTrack(a)) === JSON.stringify(subtitleTrack(b))));
  out.push(await single(d, 'UI-35', '独立旁白整体右移约1秒', () => dragMove(page, audio(), 1, 28.975192743764172),
    (a, b) => narrationTrack(a).clips[0].timeline_start_sec > .5 && narrationTrack(a).clips[0].source_in_sec === narrationTrack(b).clips[0].source_in_sec && narrationTrack(a).clips[0].source_out_sec === narrationTrack(b).clips[0].source_out_sec && JSON.stringify(videoTrack(a)) === JSON.stringify(videoTrack(b)) && JSON.stringify(subtitleTrack(a)) === JSON.stringify(subtitleTrack(b))));
  out.push(await single(d, 'UI-36', '旁白音量0%边界', async () => {
    const gain = page.locator(`.ed-track-row[data-track-id="${baseAudio.track_id}"] .ed-volume-handle`);
    const b = await gain.boundingBox(); assert(b);
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2 + 24, { steps: 12 }); await page.mouse.up();
  }, a => narrationTrack(a).clips[0].volume === 0));
  out.push(await single(d, 'UI-37', '启用原声', () => page.getByRole('button', { name: '原声启用', exact: true }).click(),
    (a, b) => a.content.tracks.some(t => t.type === 'audio' && t.role !== 'narration' && t.muted === false) && JSON.stringify(narrationTrack(a)) === JSON.stringify(narrationTrack(b))));
  return out;
}

export async function basicStyles(d) {
  const page = d.ctx.page, out = [];
  const items = [
    ['UI-15-direct', '字幕粗体开关', () => page.getByRole('button', { name: '粗体', exact: true }).click(), s => s.bold_override === true],
    ['UI-16-direct', '字幕斜体开关', () => page.getByRole('button', { name: '字幕斜体', exact: true }).click(), s => s.italic === true],
    ['UI-17', '字幕下划线开关', () => page.getByRole('button', { name: '字幕下划线', exact: true }).click(), s => s.underline === true],
    ['UI-18', '字幕字母转大写', () => page.getByRole('button', { name: '大写', exact: true }).click(), s => s.case_mode === 'upper'],
    ['UI-19', '字幕左对齐', () => page.getByRole('button', { name: '字幕对齐方式：start', exact: true }).click(), s => s.alignment === 'left'],
    ['UI-20', '字幕垂直位置0.85改为0.70', async () => {
      await page.locator('details.ed-position-more > summary').click(); await field(page, '字幕 Y', 0.7);
    }, s => s.placement.position?.y === 0.7],
    ['UI-21', '关闭字幕描边', () => page.getByRole('switch', { name: '描边', exact: true }).uncheck(), s => s.outline.enabled === false],
    ['UI-22', '字幕背景不透明度0改为0.5', async () => {
      await page.locator('details.ed-background-more > summary').click();
      const slider = page.getByLabel('背景不透明度', { exact: true });
      await slider.fill('0.5'); await slider.press('Tab');
    }, s => s.background.opacity === 0.5],
    ['UI-23', '应用Sunshine字幕模板', () => page.getByRole('button', { name: 'Sunshine', exact: true }).click(), s => s.color === '#F0DD44'],
  ];
  for (const [id, label, action, check] of items) out.push(await styleCheck(d, id, label, action, check));
  return out;
}
