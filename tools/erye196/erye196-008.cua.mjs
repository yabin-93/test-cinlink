import { createHarness, replaceCaption } from './common.cua.mjs';
export function createCase008(config) {
  const a = createHarness({ ...config, caseId: 'ERYE196-008' });
  const b = createHarness({ ...config, ...config.projectB, app: config.app, fs: config.fs, outputDir: `${config.outputDir}/project-b`, caseId: 'ERYE196-008' });
  if (a.conversationId === b.conversationId) throw new Error('Use two independently saved project conversations');
  const t = config.target;
  const prompt = `只把工程A（当前会话的${a.documentName}）中${t.start.toFixed(2)}～${t.end.toFixed(2)}秒、原文为${t.text}的这条字幕原文改为A目标固定，其他内容不变。`;
  return { a, b, prompt,
    async startA() { a.assertScan(await a.scan('a-baseline')); return a.submitOnce('target-a', prompt); },
    async switchToB() {
      const c = await a.load(); if (!c.submissions['target-a']) throw new Error('Start A before switching');
      if (c.steps.openBAttempted) throw new Error('B tab navigation already attempted');
      c.steps.openBAttempted = true; await a.persist();
      await a.state(); await a.app.pressKey('super+l'); await a.app.pressKey('alt+Return');
      let ax = await a.state({ requireDocument: false });
      await a.app.setValue(a.id(ax, /文本栏 \(settable\) 地址和搜索栏/), `https://app.cinlink.ai/c/${b.conversationId}`);
      await a.app.pressKey('Return'); return { status: 'NavigatingToB' };
    },
    async observeB() {
      await b.reopen(); b.assertScan(await b.scan('b-visible-during-a'));
      await b.capture('b-still-active');
      const c = await a.load(); c.steps.bObservedWhileA = true; await a.persist(); return { status: 'BStillActive' };
    },
    async inspectA() {
      const c = await a.load(); if (!c.steps.bObservedWhileA) throw new Error('First observe B while A runs');
      await b.state(); await a.app.pressKey('ctrl+shift+Tab');
      const o = await a.observe('target-a');
      if (o.running) { await a.app.pressKey('ctrl+Tab'); await b.state(); return { status: 'Running' }; }
      if (!o.completed || o.failed) return a.finish('Failed', { reason: 'A edit failed', chat: o.chat });
      a.assertScan(await a.scan('a-result'), replaceCaption(a.baseline, t, 'A目标固定'));
      c.steps.aVerified = true;
      c.steps.projectLabelVisible = o.chat.includes(a.documentName) || o.chat.includes('工程A');
      await a.persist(); await a.app.pressKey('ctrl+Tab'); await b.state();
      return { status: 'NeedsFinalBVerification' };
    },
    async verifyB() {
      const c = await a.load(); if (!c.steps.aVerified) throw new Error('Verify A first');
      b.assertScan(await b.scan('b-after-a')); await b.capture('b-final');
      await b.state(); await a.app.pressKey('super+w'); await a.state();
      return a.finish(c.steps.projectLabelVisible ? 'Passed' : 'Failed', { target: t, projectB: b.conversationId,
        reason: c.steps.projectLabelVisible ? 'A-only update; B unchanged and remained active' : 'Result did not identify originating project A' });
    },
    async restore() {
      const c = await a.load(); if (c.steps.restoreAttempted) throw new Error('Restore already attempted');
      c.steps.restoreAttempted = true; await a.persist(); await a.undo(); a.assertScan(await a.scan('restored'));
      c.steps.restored = true; await a.persist(); return { restored: true };
    },
  };
}
