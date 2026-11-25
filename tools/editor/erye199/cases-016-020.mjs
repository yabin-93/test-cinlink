import crypto from 'node:crypto';
import { assert, Blocked, clips } from './core.mjs';
import { baseline, fourObjects } from './fixtures.mjs';
import { agentStep } from './cases-011-015.mjs';
const video = '.ed-timeline-clip[aria-label^="视频"]';
export function transformFixture(a) {
  const content = baseline(a), back = structuredClone(content.tracks[0]);
  back.track_id = crypto.randomUUID(); back.muted = true; back.clips[0].clip_id = crypto.randomUUID(); back.clips[0].file_id = a.videoB.fileId;
  const backAudio = structuredClone(content.tracks.find(t => t.type === 'audio'));
  backAudio.track_id = crypto.randomUUID(); backAudio.linked_video_track_id = back.track_id; backAudio.muted = true;
  backAudio.clips[0].clip_id = crypto.randomUUID(); backAudio.clips[0].file_id = a.videoB.fileId;
  content.tracks.splice(1, 0, back); content.tracks.push(backAudio); return content;
}
async function probe(ctx, phase, prompt) {
  const before = await ctx.read(); const assistant = await agentStep(ctx, phase, prompt); const after = await ctx.read();
  await ctx.write(phase + '-result', { before, after, assistant }); await ctx.shot(phase + '-result'); return { before, after, assistant };
}
async function createChild(ctx, a) {
  await ctx.prepare(fourObjects(a)); const initial = await ctx.read();
  await ctx.page.click(video);
  await ctx.page.keyboard.down('Control');
  try {
    for (const sel of ['.ed-timeline-clip[aria-label^="原声 "]', '.ed-timeline-clip[aria-label^="原文字幕 E199 Source Caption A"]', '.ed-timeline-clip[aria-label^="原文字幕 E199 Source Caption B"]']) await ctx.page.click(sel);
  } finally { await ctx.page.keyboard.up('Control'); }
  const selected = await ctx.page.evaluate(() => [...document.querySelectorAll('.ed-timeline-clip.is-selected')].map(e => e.getAttribute('aria-label')));
  await ctx.write('selected', selected); assert.equal(selected.length, 4, '多轨前置未完成：应仅选中视频、关联原声与两条字幕'); await ctx.shot('selected-baseline');
  const v = initial.content.tracks.find(t => t.type === 'video'), audio = initial.content.tracks.find(t => t.type === 'audio'), image = initial.content.tracks.find(t => t.type === 'image'), srt = initial.content.tracks.find(t => t.type === 'subtitle');
  const childName = 'E199_CHILD_' + crypto.randomUUID().slice(0, 8);
  const outcome = await probe(ctx, 'create-child', `把已选中的跨轨对象建立为一个真实、可继续进入编辑的子序列“${childName}”：视频轨${v.track_id}片段${v.clips[0].clip_id}与其关联原声轨${audio.track_id}均为0～10秒，字幕文件${srt.clips[0].file_id}的A为1～3秒、B为6～8秒。将该子序列以引用实例放回当前父序列0～10秒，保留子序列内相对位置与音画关系；未选中的图片实例${image.clips[0].clip_id}（0～5秒）不得改变。需要父子序列及引用关系，不用新视频、拼接、烘焙画面或新建普通视频工程替代。创建成功后提供进入/返回入口和子序列标识；如当前不支持，明确说明并保留原工程，不添加假字段。`);
  ctx.nestingGate = { source_case: 'ERYE199-' + ctx.caseId, fixture: ctx.fixture, child_name: childName, run_id: outcome.assistant.run_id, status: outcome.assistant.status, text: outcome.assistant.text, content_unchanged: JSON.stringify(outcome.before.content) === JSON.stringify(outcome.after.content), prepared: false };
  await ctx.write('nesting-gate', ctx.nestingGate);
  if (outcome.assistant.status === 'failed') assert.fail('子序列创建任务失败；见原任务错误和截图');
  if (ctx.nestingGate.content_unchanged && outcome.assistant.intent_fully_satisfied !== true) throw new Blocked('子序列未建立，父实例及进入/返回验证无法继续；实际回复和原工程已留证');
  throw new Blocked('子序列创建结果已留证；真实父子引用、范围和编辑入口需核验，未以任务完成代替整例通过');
}
async function requireChild(ctx, a, target) {
  if (!ctx.nestingGate) await createChild(ctx, a);
  await ctx.write('dependency', { target, gate: ctx.nestingGate, target_steps_executed: false });
  throw new Blocked(target + '前置不足：同批子序列未能建立，复用该次能力探测证据，不重复创建任务；目标步骤未执行');
}
export const cases = {
  async '016'(ctx, a) { await createChild(ctx, a); },
  async '017'(ctx, a) { await requireChild(ctx, a, '共享子序列与独立副本'); },
  async '018'(ctx, a) { await requireChild(ctx, a, '父子序列范围及嵌套引用'); },
  async '019'(ctx, a) {
    await ctx.prepare(transformFixture(a)); const before = await ctx.read(), tracks = before.content.tracks.filter(t => t.type === 'video'), top = tracks[0], original = top.clips[0], back = tracks[1].clips[0];
    await ctx.page.click(video + ' >> nth=0'); await ctx.seek(2); await ctx.shot('basic-before');
    const basic = await probe(ctx, 'basic-transform', `在当前工程中，仅将前景视频（轨道${top.track_id}、片段${original.clip_id}）的中心设为序列像素(400,200)，等比缩放60%、旋转15°、不透明度50%。保留源和时间线0～10秒、1倍速、背景B（轨道${tracks[1].track_id}、片段${back.clip_id}）及原声。仅改静态设置，不加关键帧，不生成或导出替代视频。`);
    const actual = clips(basic.after).find(c => c.clip_id === original.clip_id);
    if (JSON.stringify(basic.before.content) === JSON.stringify(basic.after.content) && basic.assistant.intent_fully_satisfied !== true) throw new Blocked('位置/等比缩放/旋转/不透明度设置未执行；保留任务及页面证据');
    assert.deepEqual(actual.transform.position, { x: 400, y: 200 }); assert.equal(actual.transform.scale_percent, 60); assert.equal(actual.transform.rotation_deg, 15); assert.equal(actual.opacity, .5);
    assert.equal(actual.file_id, original.file_id); assert.equal(actual.source_in_sec, 0); assert.equal(actual.source_out_sec, 10); assert.equal(actual.timeline_start_sec, 0); assert.equal(actual.playback_rate, 1);
    assert.deepEqual(clips(basic.after).find(c => c.clip_id === back.clip_id), back, '背景片段被串改');
    for (const track of before.content.tracks.filter(t => t.type === 'audio')) assert.deepEqual(basic.after.content.tracks.find(t => t.track_id === track.track_id), track, '已准备的原声音轨被串改');
    await ctx.seek(2); await ctx.frame(); await ctx.shot('basic-verified'); await ctx.open(ctx.fixture); assert.deepEqual((await ctx.read()).content, basic.after.content); await ctx.seek(2); await ctx.shot('basic-refreshed');
    await ctx.write('partial-result', { basic_transform: 'Passed', position: [400, 200], scale_percent: 60, rotation_deg: 15, opacity: .5, background_unchanged: true, refreshed: true });
    return '019 v2：静态位置(400,200)、等比缩放60%、旋转15度、不透明度50%及刷新保持通过；前景源范围/速度/引用、背景片段及原声音轨均未串改';
  },
  async '020'(ctx, a) {
    await ctx.prepare(baseline(a)); const initial = await ctx.read(), track = initial.content.tracks.find(t => t.type === 'video'); await ctx.page.click(video); await ctx.shot('selected-baseline');
    const result = await probe(ctx, 'create-keyframes', `仅给视频轨${track.track_id}的片段${track.clips[0].clip_id}添加真实可继续编辑的关键帧，时间均为源1秒和8秒：位置中心(320,180)→(420,220)像素；等比缩放100%→75%；旋转0→30度；不透明度100%→50%；模糊0→10像素；羽化0→10像素；从左到右擦除进度0%→100%。先建立各属性关键帧和对应属性，暂不切换插值；请逐项说明实际支持项。关键帧成功后才验证保持/线性/贝塞尔、位置空间路径和独立时间缓动。如不支持真实关键帧，明确说明，保留原工程；不以静态参数、淡入淡出、字幕/水印或生成成片替代，不添加假字段。源范围0～10秒、速度、原声与文件引用不变。`);
    await ctx.write('keyframe-summary', { before_revision: result.before.revision, after_revision: result.after.revision, content_unchanged: JSON.stringify(result.before.content) === JSON.stringify(result.after.content), assistant: { status: result.assistant.status, text: result.assistant.text, intent_fully_satisfied: result.assistant.intent_fully_satisfied } });
    if (result.assistant.status === 'failed') assert.fail('关键帧创建任务失败；插值及空间路径步骤未执行');
    throw new Blocked('真实关键帧及所需属性未完成独立核验，保持/线性/贝塞尔和位置路径/时间缓动步骤未计通过，见实际回复及保存状态');
  }
};
