import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { assert, Blocked, clips, range } from './core.mjs';
import { baseline, fourObjects, twoInstances } from './fixtures.mjs';
const id = () => crypto.randomUUID();
const video = '.ed-timeline-clip[aria-label^="视频"]';
const controls = p => p.evaluate(() => [...document.querySelectorAll('[aria-label="编辑区"] button, .ed-timeline button')].map(e => ({ text: e.textContent.trim(), label: e.getAttribute('aria-label'), pressed: e.getAttribute('aria-pressed'), disabled: e.disabled })));
export async function agentStep(ctx, phase, prompt) {
  try { return await ctx.agent(prompt); }
  finally {
    const dir = path.join(ctx.config.outDir, ctx.caseId);
    for (const name of ['prompt.json', 'messages.json', 'run-state.json', 'after-agent.json', 'agent-cursor.json', 'accepted-run.json', 'before-submit.png', 'agent-terminal.png', 'needs-input.png']) {
      const file = path.join(dir, name); if (await fs.stat(file).catch(() => null)) await fs.copyFile(file, path.join(dir, phase + '-' + name));
    }
  }
}
async function feature(ctx, phase, instruction) {
  const before = await ctx.read(); await ctx.write(phase + '-controls', await controls(ctx.page)); await ctx.shot(phase + '-before');
  const assistant = await agentStep(ctx, phase, instruction + '这是测试前置准备；如当前接口或页面不支持，请明确说明并保留工程，不用其他操作替代，不添加假字段。');
  const after = await ctx.read(); await ctx.write(phase + '-preparation', { before, after, assistant });
  // A no-op or a refused preparation cannot establish the required locked/bound state.
  if (JSON.stringify(before.content) === JSON.stringify(after.content) && assistant.intent_fully_satisfied !== true) throw new Blocked(phase + '前置未建立；原工程保持，见实际任务回复和截图，后续目标步骤未冒充通过');
  return { before, after, assistant };
}
function background(a, at, sourceIn = 0) { return { type: 'audio', role: 'background', track_id: id(), offset_sec: 0, muted: false, linked_video_track_id: null, clips: [{ clip_id: id(), file_id: a.audio.fileId, timeline_start_sec: at, source_in_sec: sourceIn, source_out_sec: sourceIn + 2, playback_rate: 1, volume: 1 }] }; }
export function syncFixture(a) { const c = baseline(a); c.tracks.push(background(a, 6), background(a, 8, 2)); return c; }
export const cases = {
  async '011'(ctx, a) {
    await ctx.prepare(syncFixture(a)); const initial = await ctx.read(), target = initial.content.tracks[2], control = initial.content.tracks[3];
    await feature(ctx, '同步锁', `仅为独立背景音频轨道${target.track_id}开启“同步锁”，使其在视频中间插入片段时跟随推移；保持背景音频轨道${control.track_id}同步锁关闭且位置不动。不要把同步锁替换成编辑锁、静音或原声关联。先只设置同步锁，不插入片段。`);
    await agentStep(ctx, 'insert', `在视频轨道${initial.content.tracks[0].track_id}的时间线5秒处插入已登记原片B（文件ID ${a.videoB.fileId}）的源0～2秒，后段原视频应顺移2秒。保留已开启的同步锁；仅同步锁音频轨${target.track_id}从6秒推到8秒，未同步锁音频轨${control.track_id}仍在8秒，不修改两段音频的源范围。`);
    const after = await ctx.read(); await ctx.write('insert-result', after); await ctx.shot('insert-result');
    assert.equal(after.content.tracks.find(t => t.track_id === target.track_id).clips[0].timeline_start_sec, 8);
    assert.equal(after.content.tracks.find(t => t.track_id === control.track_id).clips[0].timeline_start_sec, 8);
    await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, after.content); return '同步锁轨按2秒插入推移，未锁独立轨保持原位置，刷新后保持';
  },
  async '012'(ctx, a) {
    await ctx.prepare(twoInstances(a)); const original = await ctx.read(), [first, second] = clips(original), failures = [], observations = [];
    await ctx.seek(.5); const width = await ctx.page.evaluate(sel => document.querySelector(sel).getBoundingClientRect().width, video);
    await ctx.page.dragAndDrop(video + ' >> nth=1', '.ed-track-video .ed-track-lane', { sourcePosition: { x: width / 2, y: 24 }, targetPosition: { x: width * 1.9, y: 24 }, label: '将第二片段右移两秒' });
    const moved = await ctx.waitSaved(original.revision); await ctx.write('after-move', moved); await ctx.shot('after-move');
    const aMove = clips(moved).find(c => c.clip_id === first.clip_id), bMove = clips(moved).find(c => c.clip_id === second.clip_id);
    if (aMove?.timeline_start_sec !== 0 || bMove?.timeline_start_sec !== 7) failures.push('普通移动没有保持A0～5秒、B7～12秒及5～7秒空隙');
    observations.push({ step: 'move', first: aMove, second: bMove });
    await ctx.page.click(video + ' >> nth=0'); await ctx.page.press('[aria-label="编辑时间轴"]', 'Delete');
    const removed = await ctx.waitSaved(moved.revision); await ctx.write('after-delete', removed); await ctx.shot('after-delete');
    const remaining = clips(removed).find(c => c.clip_id === second.clip_id);
    assert.ok(remaining && !clips(removed).some(c => c.clip_id === first.clip_id), '普通删除未完成，不能进入波纹步骤');
    if (remaining.timeline_start_sec !== bMove.timeline_start_sec) failures.push(`普通删除自动移动了B：${bMove.timeline_start_sec}→${remaining.timeline_start_sec}秒，未保留空隙`);
    observations.push({ step: 'delete', remaining });
    const assistant = await agentStep(ctx, 'ripple', `执行一次独立的“波纹删除空隙”：仅闭合当前唯一视频片段B（轨道${removed.content.tracks.find(t => t.type === 'video').track_id}，片段${remaining.clip_id}）前方0～${remaining.timeline_start_sec}秒的空隙，使B从0秒开始；保留源范围0～5秒、原片ID和片段ID。不用普通移动、普通删除、拼接或生成成片替代波纹删除；如不支持明确说明并保留工程。`);
    const after = await ctx.read(); await ctx.write('after-ripple', after); await ctx.write('observations', { observations, failures, assistant }); await ctx.shot('after-ripple');
    if (failures.length) assert.fail(failures.join('；'));
    if (clips(after)[0]?.timeline_start_sec !== 0) throw new Blocked('普通移动/删除观察已保存；未执行成功独立波纹删除，完整用例未通过');
    range(clips(after)[0], 0, 5, 0); return '普通移动和删除留空隙，显式波纹删除才闭合';
  },
  async '013'(ctx, a) {
    const content = fourObjects(a); content.tracks = content.tracks.filter(t => t.type !== 'image'); await ctx.prepare(content);
    const before = await ctx.read(), v = before.content.tracks.find(t => t.type === 'video'), audio = before.content.tracks.find(t => t.type === 'audio');
    await feature(ctx, '源绑定字幕', `为现有视频片段${v.clips[0].clip_id}（轨道${v.track_id}，原片文件${a.video.fileId}）及字幕文件${a.subtitle.fileId}建立真实source-bound源时间绑定；字幕A源1～3秒、字幕B源6～8秒。保留原声轨${audio.track_id}与视频关联。字幕必须能随该片段的裁剪/分割/变速映射，不把普通固定时间字幕称为源绑定字幕；先只准备关联，不裁剪、不分割、不变速。`);
    await agentStep(ctx, 'linked-edit', `对已建立源绑定字幕的原视频片段${v.clips[0].clip_id}，按顺序裁掉源片头2秒、在剩余片段相对0.5秒处分割、将右半段设为2倍速，关联原声同步处理；source-bound字幕按源时间映射，跨分割边界的字幕A应按实际策略切分并提供可识别的新条目标识。保留源视频、SRT和音频，不新建成片，不用静态改字幕时间替代源绑定。`);
    const after = await ctx.read(); await ctx.write('linked-edit-result', after); await ctx.shot('linked-edit-result');
    // Full source binding must be independently observable; a successful video edit alone is insufficient.
    throw new Blocked('已保存源绑定及联动任务结果；需核验真实字幕源映射/切分标识与显式解除关联入口，不能仅凭任务完成判本例通过');
  },
  async '014'(ctx, a) {
    const content = baseline(a); content.tracks.push(background(a, 0)); await ctx.prepare(content);
    const initial = await ctx.read(), locked = initial.content.tracks[0], unlocked = initial.content.tracks.at(-1);
    const prepared = await feature(ctx, '轨道编辑锁', `仅锁定视频轨道${locked.track_id}，禁止其片段${locked.clips[0].clip_id}被移动或删除；保持独立音频轨${unlocked.track_id}可编辑。这是轨道编辑锁，不是同步锁、隐藏、静音或锁定执行事务。先只设锁，不移动和删除。`);
    for (const action of ['移动', '删除']) {
      const assistant = await agentStep(ctx, 'batch-' + action, `一次批量${action}以下两对象：锁定视频轨${locked.track_id}上的片段${locked.clips[0].clip_id}，以及未锁音频轨${unlocked.track_id}上的片段${unlocked.clips[0].clip_id}。${action === '移动' ? '两片段都向右移动1秒。' : '删除两片段。'}请按真实锁定冲突处理，不要解锁、拆成逐个操作或跳过锁定对象。`);
      const after = await ctx.read(); await ctx.write('batch-' + action + '-result', { after, assistant }); await ctx.shot('batch-' + action + '-result'); assert.deepEqual(after.content, prepared.after.content, '含锁定对象的批量操作发生部分写入');
      assert.match(assistant.text || '', /锁定|locked|lock/i, '没有给出锁定冲突反馈');
    }
    return '含锁定轨对象的批量移动/删除均整批拒绝且无部分写入';
  },
  async '015'(ctx, a) {
    await ctx.prepare(baseline(a)); const before = await ctx.read(); await ctx.seek(2); await ctx.frame(); await ctx.shot('visible-audible-baseline');
    await ctx.page.click('button[aria-label="视频隐藏"]'); const hidden = await ctx.waitSaved(before.revision); await ctx.write('hidden', hidden); await ctx.shot('hidden');
    assert.equal(hidden.content.tracks.find(t => t.type === 'video').visible, false); assert.deepEqual(clips(hidden), clips(before));
    await ctx.page.click('button[aria-label="原声静音"]'); const muted = await ctx.waitSaved(hidden.revision); await ctx.write('muted', muted); await ctx.shot('hidden-muted');
    assert.equal(muted.content.tracks.find(t => t.type === 'audio').muted, true); assert.deepEqual(clips(muted, 'audio'), clips(before, 'audio'));
    await ctx.open(ctx.fixture, false); const persisted = await ctx.read(); await ctx.write('hidden-muted-refreshed', persisted); await ctx.shot('hidden-muted-refreshed');
    assert.deepEqual(persisted.content, muted.content);
    await ctx.page.click('button[aria-label="视频显示"]'); const shown = await ctx.waitSaved(persisted.revision);
    await ctx.page.click('button[aria-label="原声启用"]'); const restored = await ctx.waitSaved(shown.revision); await ctx.write('restored', restored);
    assert.deepEqual(restored.content, before.content, '恢复可见/原声后，内容与基线不一致');
    await ctx.seek(2); await ctx.frame(); await ctx.shot('restored'); await ctx.open(ctx.fixture); await ctx.seek(2); await ctx.frame();
    const reopened = await ctx.read(); await ctx.write('restored-refreshed', reopened); await ctx.shot('restored-refreshed'); assert.deepEqual(reopened.content, before.content);
    return '015 v2：轨道图标隐藏/显示、原声静音/启用及两种状态刷新保持通过；片段和源范围未删除或串改';
  }
};
