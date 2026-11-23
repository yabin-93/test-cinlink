import { test210 as test, guarded210 } from '../../tools/editor/erye210-runner.js';
import { current045, current047, current049 } from '../../tools/editor/erye210-current-five.js';
import { restore046, existingVoice048, currentTwoVersion210 } from '../../tools/editor/erye210-current-two.js';

for (const [id, title, action] of [
  ['045', 'v2 同素材双工程引用隔离及素材复用', current045],
  ['046', 'v3 单独恢复已删除停顿且保留其他删除段', restore046],
  ['047', 'v2 背景混音后单句配音再生成', current047],
  ['048', 'v3 中文字幕修改与已有译制人声静音恢复隔离', existingVoice048],
  ['049', 'v2 双水印总开关保存及实际导出', current049],
] as const) test(`ERYE210-${id} ${title} @ERYE-210`, async ({ nav210: n }) => guarded210(async () => {
  test.setTimeout(1200000);
  test.info().annotations.push({ type: 'case-version', description: ['046', '048'].includes(id) ? currentTwoVersion210 : id === '047' ? 'v2-translated-prerequisite-20261116' : 'v2-current-functions-20261116' });
  await action(n);
}));
