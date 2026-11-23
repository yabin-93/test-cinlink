import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { assert, Blocked, clips, range, aligned } from './core.mjs';
import { baseline, fourObjects, twoInstances } from './fixtures.mjs';
import { coordinatePrompt, verifyCoordinateCase } from './coordinates.mjs';

const video = '.ed-timeline-clip[aria-label^="视频"]';
const wait = ms => new Promise(r => setTimeout(r, ms));
async function verifyFrame(ctx, target, tolerance = .04) {
  await ctx.seek(target); const frame = await ctx.frame();
  await ctx.write('frame-' + target, frame);
  assert.ok(Math.abs(frame.mediaTime - target) <= tolerance, `源画面时间${frame.mediaTime}不对应${target}`);
  return frame;
}
async function audio(ctx, expected, seconds = .6) {
  const p = ctx.page;
  await p.evaluate(() => { const v = document.querySelector('[aria-label="工程实时预览"] video'), tracks = v.captureStream().getAudioTracks(); if (tracks.length !== 1) throw Error('预览没有唯一原声音轨'); const a = window.__e199Audio = { chunks: [] }; a.recorder = new MediaRecorder(new MediaStream(tracks)); a.done = new Promise(resolve => { a.recorder.onstop = async () => { const bytes = new Uint8Array(await new Blob(a.chunks).arrayBuffer()); let text = ''; for (const b of bytes) text += String.fromCharCode(b); resolve(btoa(text)); }; }); a.recorder.ondataavailable = e => a.chunks.push(e.data); a.recorder.start(); });
  await p.click('button[aria-label="预览播放"]'); await wait(seconds * 1000); await p.click('button[aria-label="预览暂停"]');
  const b64 = await p.evaluate(async () => { window.__e199Audio.recorder.stop(); return window.__e199Audio.done; });
  const file = path.join(ctx.config.outDir, ctx.caseId, 'preview-audio.webm'); await fs.writeFile(file, Buffer.from(b64, 'base64'));
  await verifyAudioFile(ctx, file, expected);
}
export async function verifyAudioFile(ctx, file, expected) {
  // Ego's Node bridge does not support binary stdout encoding; decode to disk.
  const pcmFile = file + '.pcm';
  execFileSync(ctx.config.ffmpeg || 'ffmpeg', ['-v', 'error', '-nostdin', '-y', '-i', file, '-ac', '1', '-ar', '48000', '-f', 's16le', pcmFile], { encoding: 'utf8' });
  const pcm = await fs.readFile(pcmFile);
  const samples = []; for (let i = 0; i + 1 < pcm.length; i += 2) samples.push(pcm.readInt16LE(i));
  const stable = samples.slice(Math.round(samples.length * .2), Math.round(samples.length * .8)); let crossings = 0;
  for (let i = 1; i < stable.length; i++) if (stable[i - 1] < 0 && stable[i] >= 0) crossings++;
  const hz = crossings * 48000 / stable.length; await ctx.write('audio-check', { hz, expected, samples: samples.length });
  assert.ok(stable.length > 8000 && Math.abs(hz - expected) < 20, `预览音频${hz}Hz不匹配源${expected}Hz`);
}
async function selectVideo(ctx, index = 0) { await ctx.page.click(video + ' >> nth=' + index); }
async function undo(ctx, revision, redo = false) { await ctx.page.click(`button[aria-label="${redo ? '重做' : '撤销'}"]`); return ctx.waitSaved(revision); }
async function uploadUI(ctx, item) {
  const p = ctx.page, empty = !await p.evaluate(() => !!document.querySelector('[aria-label="编辑器功能"]'));
  if (!empty) await ctx.panel('Media');
  const chooser = p.waitForFileChooser(); await p.click(empty ? 'loc=role:button[name="选择媒体"]' : 'button[aria-label="导入素材"]'); await (await chooser).setFiles(item.path);
  await p.waitForSelector('.ed-media-card[title="' + item.name + '"]', { state: 'visible', timeout: 60_000 });
}
async function dragMedia(ctx, item, selector, x, y) {
  await ctx.page.dragAndDrop('.ed-media-card[title="' + item.name + '"]', selector, { targetPosition: { x, y }, label: '将测试素材放入时间线' });
}
export const cases = {
  async '001'(ctx, a) {
    await ctx.prepare(fourObjects(a)); const before = await ctx.read();
    assert.equal(clips(before).length, 1); assert.equal(clips(before, 'audio')[0].file_id, a.video.fileId);
    for (const stage of ['initial', 'reopened']) {
      if (stage === 'reopened') await ctx.open(ctx.fixture);
      for (const t of [2, 4, 7, 9]) {
        await verifyFrame(ctx, t); const seen = await ctx.page.evaluate(() => ({ caption: document.querySelector('.ed-preview-canvas')?.textContent || '', image: !!document.querySelector('img[alt="图片叠加层"]') }));
        assert.equal(seen.image, t < 5); assert.equal(seen.caption.includes('E199 Source Caption A'), t === 2); assert.equal(seen.caption.includes('E199 Source Caption B'), t === 7);
        await ctx.shot(stage + '-' + t);
      }
      assert.deepEqual((await ctx.read()).content, before.content);
    }
    await ctx.seek(.5); await audio(ctx, 440); return '四类对象、四个画面点、原声及刷新恢复断言通过';
  },
  async '002'(ctx, a) {
    await ctx.prepare(baseline(a, { file: 'fractional' })); const before = await ctx.read();
    await selectVideo(ctx); await ctx.seek(1); await ctx.page.click('button[aria-label="分割所选片段"]');
    const after = await ctx.waitSaved(before.revision); await ctx.write('after-split', after); await ctx.shot('after-split');
    await ctx.open(ctx.fixture); await ctx.shot('reopened'); const current = await ctx.read(); assert.deepEqual(current.content, after.content);
    const split = clips(current); assert.equal(split.length, 2);
    assert.ok(aligned(split[0].source_out_sec, 30000, 1001), `分割点${split[0].source_out_sec}秒未按30000/1001帧率对齐`);
    return '分割点按分数帧率对齐且刷新保存';
  },
  async '003'(ctx, a, media) {
    await ctx.prepare(baseline(a, { file: 'vfr' })); const before = await ctx.read();
    const pts = media.vfr.frames.map(f => Number(f.best_effort_timestamp_time));
    for (const stage of ['initial', 'reopened']) {
      if (stage === 'reopened') await ctx.open(ctx.fixture);
      for (const t of [2, 4.9, 5.1, 8, 9.8]) { const f = await verifyFrame(ctx, t, t < 5 ? .067 : .034); assert.ok(pts.some(x => Math.abs(x - f.mediaTime) < .00001)); await ctx.shot(stage + '-' + t); }
      assert.deepEqual((await ctx.read()).content, before.content);
    }
    await ctx.seek(3); await ctx.frame();
    await ctx.page.evaluate(() => { const v = document.querySelector('[aria-label="工程实时预览"] video'), o = window.__e199Frames = { frames: [], running: true }; const next = (n, m) => { if (o.running) { o.frames.push(m.mediaTime); v.requestVideoFrameCallback(next); } }; v.requestVideoFrameCallback(next); });
    await ctx.page.click('button[aria-label="预览播放"]'); await wait(4100); await ctx.page.click('button[aria-label="预览暂停"]');
    const observed = await ctx.page.evaluate(() => { window.__e199Frames.running = false; return window.__e199Frames.frames; });
    await ctx.write('continuous', observed); if (observed.length < 5) throw new Blocked('浏览器呈现帧回调采样不足；五处定位及刷新观察已保存'); assert.ok(observed[0] < 5 && observed.at(-1) > 5); assert.ok(observed.every((t, i) => i === 0 || t > observed[i - 1])); assert.ok(observed.every(t => pts.some(x => Math.abs(x - t) < .00001)), '连续播放出现不属于独立源PTS的帧');
    await ctx.seek(.5); await audio(ctx, 440); return 'VFR独立PTS、跨帧率区间连续播放及刷新恢复通过';
  },
  async '004'(ctx, a) {
    await ctx.prepare(baseline(a, { rate: 2 })); const before = await ctx.read(), clip = clips(before)[0]; range(clip, 0, 10, 0); assert.equal(clip.playback_rate, 2);
    const duration = await ctx.page.evaluate(() => Number(document.querySelector('input[aria-label="预览播放进度"]').max)); assert.equal(duration, 5);
    await ctx.seek(2); const frame = await ctx.frame(); assert.ok(Math.abs(frame.mediaTime - 4) < .04); await ctx.shot('rate2');
    await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, before.content); return '10秒源片2倍速时间线5秒，2秒映射源4秒';
  },
  async '005'(ctx, a) {
    await ctx.prepare(baseline(a)); const before = await ctx.read(); await selectVideo(ctx); await ctx.seek(.5);
    const width = await ctx.page.evaluate(sel => document.querySelector(sel).getBoundingClientRect().width, video);
    await ctx.page.dragAndDrop(video + ' .ed-trim-handle.is-start', video, { sourcePosition: { x: 3, y: 24 }, targetPosition: { x: width * .2 + 3, y: 24 }, label: '裁掉源视频片头两秒' });
    const trimmed = await ctx.waitSaved(before.revision); await ctx.write('trimmed', trimmed); range(clips(trimmed)[0], 2, 10, 2); range(clips(trimmed, 'audio')[0], 2, 10, 2); await ctx.shot('trimmed');
    const restored = await undo(ctx, trimmed.revision); range(clips(restored)[0], 0, 10, 0); await verifyFrame(ctx, 1); await ctx.shot('undo');
    const redone = await undo(ctx, restored.revision, true); range(clips(redone)[0], 2, 10, 2); await verifyFrame(ctx, 3); await ctx.shot('redo');
    await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, redone.content); await verifyFrame(ctx, 8); await ctx.shot('reopened'); await ctx.seek(2.5); await audio(ctx, 660); return '页面裁头、撤销、重做及刷新后的源范围/原声正确';
  },
  async '006'(ctx, a) {
    await ctx.prepare(baseline(a));
    const before = await ctx.read(), track = before.content.tracks.find(t => t.type === 'video');
    await selectVideo(ctx); await ctx.shot('baseline');
    const assistant = await ctx.agent(coordinatePrompt(track.track_id, track.clips[0].clip_id));
    return verifyCoordinateCase(ctx, before, assistant);
  },
  async '007'(ctx, a) {
    await ctx.prepare(twoInstances(a)); await selectVideo(ctx, 1); await ctx.panel('Media');
    const state = () => ctx.page.evaluate(() => ({ selected: [...document.querySelectorAll('.ed-timeline-clip.is-selected')].map(e => e.getAttribute('aria-label')), panel: [...document.querySelectorAll('[aria-label="编辑器功能"] button')].filter(e => e.classList.contains('is-active') || e.getAttribute('aria-selected') === 'true' || e.getAttribute('aria-pressed') === 'true').map(e => e.textContent.trim()) }));
    const before = await state(); assert.equal(before.selected.length, 1); assert.ok(before.panel.length === 1 && ['Media', '媒体'].includes(before.panel[0])); await ctx.write('selected-before', before); await ctx.shot('selected-before');
    await ctx.open(ctx.fixture); const after = await state(); await ctx.write('selected-after', after); await ctx.shot('reopened'); assert.deepEqual(after, before); return '选择第二片段与Media面板分别恢复';
  },
  async '008'(ctx, a, media) {
    const observations = [], failures = [];
    for (const kind of ['video', 'audio', 'image']) {
      await ctx.prepare(baseline(a, { empty: true }), kind); const before = await ctx.read(); await uploadUI(ctx, media[kind]);
      const registered = await ctx.read(); assert.equal(registered.content.tracks.flatMap(t => t.clips).length, 0, kind + '登记直接插入了时间线'); await ctx.shot(kind + '-registered');
      const rect = await ctx.page.evaluate(() => { const e = document.querySelector('.ed-timeline-inner'), r = e.getBoundingClientRect(); return { width: r.width, height: r.height }; });
      await dragMedia(ctx, media[kind], '.ed-timeline-inner', 60, Math.min(rect.height - 8, 70));
      let placed;
      try { placed = await ctx.waitSaved(before.revision); } catch (e) { failures.push(kind + '放入时间线未保存：' + e.message); await ctx.shot(kind + '-placement-failed'); continue; }
      await ctx.write(kind + '-placed', placed); await ctx.shot(kind + '-placed');
      assert.ok(clips(placed, kind).length > 0, kind + '未进入对应轨道');
      const reverted = await undo(ctx, placed.revision); assert.equal(reverted.content.tracks.flatMap(t => t.clips).length, 0, kind + '放入未独立撤销'); observations.push({ kind, registrationSeparateFromPlacement: true, inserted: true, placementUndone: true });
    }
    await ctx.write('observations', { observations, failures, acceptanceRevision: '008-registration-placement-v2-20261118' }); assert.deepEqual(failures, []); return '三类素材登记与放入分离，放入对应轨道且可撤销放入';
  },
  async '009'(ctx, a) {
    await ctx.prepare(twoInstances(a)); const before = await ctx.read(), [first, second] = clips(before);
    const trackId = before.content.tracks.find(t => t.type === 'video').track_id;
    const assistant = await ctx.agent(`当前视频轨道ID为${trackId}。仅将该轨道视频实例A（片段ID ${first.clip_id}，时间线0～5秒）的不透明度设为50%；同轨实例B（片段ID ${second.clip_id}，时间线5～10秒）保持100%。两个实例使用同一源文件，只修改A，不改变B、源范围、位置、速度或其他属性。无需再确认。`);
    const after = await ctx.read(); await ctx.write('effect-result', { assistant, before, after }); await ctx.shot('effect-result');
    const actual = clips(after); assert.equal(actual.find(c => c.clip_id === first.clip_id)?.opacity, .5, '实例A未变为50%'); assert.deepEqual(actual.find(c => c.clip_id === first.clip_id), { ...first, opacity: .5 }, '实例A发生了目标以外的变化'); assert.deepEqual(actual.find(c => c.clip_id === second.clip_id), second, '实例B被串改');
    for (const t of [2, 7]) { await ctx.seek(t); await ctx.shot('effect-' + t); }
    await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, after.content); return '同源两实例效果隔离且刷新保持';
  },
  async '010'(ctx, a, media) {
    await ctx.prepare(baseline(a, { audio: false })); await uploadUI(ctx, media.videoB); await ctx.seek(.5); const before = await ctx.read();
    const width = await ctx.page.evaluate(sel => document.querySelector(sel).getBoundingClientRect().width, video);
    await dragMedia(ctx, media.videoB, '.ed-track-video .ed-track-lane', width / 2, 24);
    const after = await ctx.waitSaved(before.revision); await ctx.write('overwrite-result', after); await ctx.shot('overwrite');
    const tracks = after.content.tracks.filter(t => t.type === 'video'); assert.equal(tracks.length, 1, '没有覆盖到同一轨道'); const list = [...tracks[0].clips].sort((x, y) => x.timeline_start_sec - y.timeline_start_sec);
    assert.equal(list.length, 2); range(list[0], 0, 5, 0); range(list[1], 0, 10, 5); assert.equal(list[0].file_id, a.video.fileId); assert.equal(list[1].file_id, a.videoB.fileId);
    await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, after.content); for (const t of [2, 7, 12]) { await ctx.seek(t); await ctx.shot('overwrite-' + t); } return '同轨覆盖保留0～5秒残段、B位于5～15秒且无重叠';
  }
};
