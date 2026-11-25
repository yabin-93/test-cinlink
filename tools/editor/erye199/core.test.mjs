import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCases, targetOrigin, aligned, result, Blocked, terminalAssistant, acceptedRunForPrompt } from './core.mjs';
import { baseline, twoInstances } from './fixtures.mjs';
import { syncFixture } from './cases-011-015.mjs';
import { currentReleaseScope, pendingManualRevisionIds } from './release-scope.mjs';
import { runSuite } from './worker.mjs';
import { transformFixture } from './cases-016-020.mjs';
import { currentV2Ids, currentFixture, cases as currentCases } from './cases-current-v2.mjs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
test('范围去重、拒绝越界和无效逆序，避免执行未授权用例', () => {
  assert.deepEqual(parseCases('001-003,002,010'), ['001', '002', '003', '010']);
  assert.deepEqual(parseCases('011-015'), ['011', '012', '013', '014', '015']);
  assert.deepEqual(parseCases('015-020'), ['015', '016', '017', '018', '019', '020']);
  assert.deepEqual(parseCases('051-068'), ['051','052','053','054','055','056','057','059','062','064','065','066','067','068']);
  assert.deepEqual(parseCases('062-064'),['062','064']);
  assert.deepEqual(parseCases('057-059'), ['057', '059']);
  for (const s of ['0-5', '3-2', '1-21', '021-050', '058', '060-061', '063', '069', 'abc', '']) assert.throws(() => parseCases(s));
});
test('环境要求精确HTTPS目标，禁止近似域和附带参数', () => {
  assert.equal(targetOrigin('https://app.cinlink.ai'), 'https://app.cinlink.ai');
  for (const s of ['http://app.cinlink.ai', 'https://app.cinlink.ai.example.org', 'https://app.cinlink.ai/c/1', 'https://app.cinlink.ai/?x=1']) assert.throws(() => targetOrigin(s));
});
test('29.97帧边界不能用1.000秒冒充30帧', () => { assert.equal(aligned(1, 30000, 1001), false); assert.equal(aligned(1.001, 30000, 1001), true); });
test('前置阻塞和真实断言失败分别报告', () => { assert.equal(result(new Blocked('缺环境')), 'Blocked'); assert.equal(result(new Error('错误')), 'Failed'); assert.equal(result(), 'Passed'); });
test('两实例同源不同ID；修改A不会通过夹具对象引用改写B', () => {
  const a = { video: { fileId: 'V' } }, c = twoInstances(a), [first, second] = c.tracks[0].clips;
  assert.notEqual(first.clip_id, second.clip_id); assert.equal(first.file_id, second.file_id); first.transform.position.x = 50; assert.equal(second.transform.position.x, 320);
  assert.equal(baseline({}, { empty: true }).tracks.length, 0);
});
test('同步锁对照轨独立，非关联音轨显式为空引用，不把原声关联当同步锁', () => {
  const c = syncFixture({ video: { fileId: 'V' }, audio: { fileId: 'A' } });
  assert.equal(new Set(c.tracks.map(t => t.track_id)).size, 4);
  const [target, control] = c.tracks.slice(2); assert.equal(target.linked_video_track_id, null); assert.equal(control.linked_video_track_id, null);
  target.clips[0].timeline_start_sec = 9; assert.equal(control.clips[0].timeline_start_sec, 8);
  assert.notEqual(target.clips[0].clip_id, control.clips[0].clip_id);
});
test('会话摘要滞后时读取同一原run的终态回复和满足标记，不重发任务', () => {
  const r = terminalAssistant({ status: 'queued', text: '', intent_fully_satisfied: false }, { status: 'done', messages: [{ role: 'assistant', content_text: '已完成', intent_fully_satisfied: true }] });
  assert.equal(r.status, 'done'); assert.equal(r.text, '已完成'); assert.equal(r.intent_fully_satisfied, true);
});
test('延期和人工用例保留执行门禁，已接入新版的用例继续运行', () => {
  for (const id of ['014', '016', '018', '056']) assert.equal(currentReleaseScope(id).status, 'Not Applicable');
  for (const id of pendingManualRevisionIds) assert.equal(currentReleaseScope(id).status, 'Not Run');
  assert.equal(currentReleaseScope('051').status, 'Not Run');
  for (const id of currentV2Ids) { assert.equal(currentReleaseScope(id), null); assert.equal(typeof currentCases[id], 'function'); }
  for (const id of ['006', '010', '012', '015', '019']) assert.equal(currentReleaseScope(id), null);
});
test('仅选择延期用例时不打开浏览器、不准备工程，输出不适用且未执行', async () => {
  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'erye199-scope-'));
  const results = await runSuite({ cases: ['014', '016', '018', '056'], outDir });
  assert.equal(results.length, 4); assert.ok(results.every(r => r.status === 'Not Applicable' && r.executed === false));
  assert.equal((await fs.stat(path.join(outDir, 'batch.json')).catch(() => null)), null);
});

test('045人工用例即使直接调用执行器也不重跑旧探测、不创建浏览器或工程', async () => {
  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'erye199-revised-manual-'));
  const results = await runSuite({ cases: [...pendingManualRevisionIds], outDir });
  assert.equal(results.length, 1);
  assert.ok(results.every(r => r.status === 'Not Run' && r.executed === false));
  assert.equal(await fs.stat(path.join(outDir, 'batch.json')).catch(() => null), null);
});
test('017普通同源实例及关联原声是独立对象，裁A夹具不能串改B', () => {
  const c=currentFixture('017',{video:{fileId:'V'}});
  const [v,a]=c.tracks;
  assert.equal(a.linked_video_track_id,v.track_id);
  assert.equal(v.clips[0].file_id,v.clips[1].file_id);
  assert.notEqual(v.clips[0].clip_id,v.clips[1].clip_id);
  v.clips[0].source_out_sec=3;a.clips[0].source_out_sec=3;
  assert.equal(v.clips[1].source_out_sec,5);assert.equal(v.clips[1].timeline_start_sec,5);
  assert.equal(a.clips[1].source_out_sec,5);assert.equal(a.clips[1].timeline_start_sec,5);
});
test('011独立音乐不伪造关联，013固定字幕不伪造源绑定', () => {
  const a={video:{fileId:'V'},music:{fileId:'M'},fixed:{fileId:'S',sha256:'sha'}};
  const music=currentFixture('011',a).tracks.at(-1);
  assert.equal(music.linked_video_track_id,null);assert.equal(music.clips[0].timeline_start_sec,8);
  assert.equal(music.clips[0].source_out_sec,2);assert.equal(music.clips[0].volume,.3);
  const fixed=currentFixture('013',a).tracks.find(t=>t.type==='subtitle').clips[0];
  assert.deepEqual(fixed.bindings.map(b=>[b.original_start_sec,b.original_end_sec]),[[1,3],[6,8]]);
  assert.equal('source_video_clip_id' in fixed,false);
});
test('直接调用执行器也排除退役058/060/061/063，不创建浏览器或测试项目', async () => {
  const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'erye199-retired-'));
  assert.deepEqual(await runSuite({ cases: ['058', '060', '061','063'], outDir }), []);
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(outDir, 'results.json'), 'utf8')), []);
  assert.equal(await fs.stat(path.join(outDir, 'batch.json')).catch(() => null), null);
});
test('变换对照使用独立背景原片，前景改动不会串改背景或原声引用', () => {
  const content = transformFixture({ video: { fileId: 'A' }, videoB: { fileId: 'B' } });
  const [front, back, audio] = content.tracks;
  assert.notEqual(front.track_id, back.track_id); assert.notEqual(front.clips[0].clip_id, back.clips[0].clip_id);
  assert.equal(front.clips[0].file_id, 'A'); assert.equal(back.clips[0].file_id, 'B'); assert.equal(audio.linked_video_track_id, front.track_id);
  const backAudio = content.tracks[3]; assert.equal(backAudio.linked_video_track_id, back.track_id); assert.equal(backAudio.clips[0].file_id, 'B'); assert.equal(backAudio.muted, true);
  front.clips[0].transform.position.x = 400; assert.equal(back.clips[0].transform.position.x, 320);
});
test('连续提交只认本条完整提示词对应的新run，旧终态和同词历史不能冒充新结果', () => {
  const messages = [{ role: 'user', text: 'basic', run_id: 'old' }, { role: 'assistant', status: 'done', run_id: 'old' }, { role: 'user', text: 'remaining', run_id: 'new' }];
  assert.equal(acceptedRunForPrompt(messages, 'remaining'), 'new');
  assert.equal(acceptedRunForPrompt(messages.slice(0, 2), 'remaining'), undefined);
  assert.equal(acceptedRunForPrompt(messages.slice(0, 2), 'basic', ['old']), undefined);
});
