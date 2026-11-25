import { expect } from '@playwright/test';
import { test210 as test, guarded210, workspace210 } from '../../tools/editor/erye210-runner.js';
import { translatedDubbing011 } from '../../tools/editor/erye210-011-agent.js';
import { case017, case019, case050, case051, case052, case053, case054 } from '../../tools/editor/erye210-completion.js';

test('ERYE210-011 v3 后台翻译配音隔离及真实工程入口定位 @ERYE-210', async ({ nav210: n }) => guarded210(async () => {
  test.setTimeout(900000);
  test.info().annotations.push({ type: 'case-version', description: 'v3-current-entry-20261113' });
  await translatedDubbing011(n, workspace210());
  expect(n.checks.some(c => c.stage === 'v3-explicit-editor-navigation' && c.passed)).toBe(true);
}));

for (const [id, title, version, action] of [
  ['017', '改稿后提交失败保留旧声并明确恢复', 'v2-client-submit-recovery-20261113', case017],
  ['019', '合法字幕与独立音频混合删除及一次撤销', 'v3-legal-mixed-delete-20261113', case019],
  ['050', '全局控件可达与跨模块统一历史', 'current-global-history-20261113', case050],
  ['051', '字幕页Agent只调整明确背景音量', 'current-agent-background-20261113', case051],
  ['052', '清理配音混音及导出后继续编辑', 'v2-current-export-20261113', case052],
  ['053', 'Windows窄屏五入口及键盘焦点', 'v2-windows-keyboard-20261113', case053],
  ['054', '显式双语显示及独立编辑保持', 'current-explicit-bilingual-20261113', case054],
] as const) test(`ERYE210-${id} ${title} @ERYE-210`, async ({ nav210: n }) => guarded210(async () => {
  test.setTimeout(1200000);
  test.info().annotations.push({ type: 'case-version', description: version });
  await action(n);
}));
