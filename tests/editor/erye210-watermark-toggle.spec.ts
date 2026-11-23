import { test210 as test, guarded210 } from '../../tools/editor/erye210-runner.js';
import { watermarkToggle014, watermarkToggle014Version } from '../../tools/editor/erye210-watermark-toggle.js';

test('ERYE210-014 v2 水印开关与跨TAB控件限制及内容恢复 @ERYE-210', async ({ nav210: n }) => guarded210(async () => {
  test.info().annotations.push({ type: 'case-version', description: watermarkToggle014Version });
  test.info().annotations.push({ type: 'coverage', description: '原只读身份与权限拒绝仍待覆盖；本例只验证水印开关、跨TAB控件状态和保存恢复。' });
  await watermarkToggle014(n);
}));
