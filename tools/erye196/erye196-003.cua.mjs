import { createHarness, replaceCaption, captions, compareCaptions } from './common.cua.mjs';
export function createCase003(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-003' }), target = config.target;
  const expected = replaceCaption(h.baseline, target, '新版C2');
  return { h,
    async openB() {
      h.assertScan(await h.scan('a-baseline'));
      const c = await h.load(); if (c.steps.openBAttempted) throw new Error('Second tab already attempted');
      c.steps.openBAttempted = true; await h.persist();
      await h.app.pressKey('super+l'); await h.app.pressKey('alt+Return');
      return { status: 'TabOpened', next: 'editB after the duplicate finishes loading' };
    },
    async editB() {
      await h.reopen(); h.assertScan(await h.scan('b-baseline'));
      const c = await h.load(); if (c.steps.editBAttempted) throw new Error('B edit already attempted');
      c.steps.editBAttempted = true; await h.persist();
      await h.edit(target, '新版C2'); h.assertScan(await h.scan('b-saved'), expected);
      await h.app.pressKey('ctrl+shift+Tab'); return h.capture('a-after-b-save');
    },
    async checkA() {
      const c = await h.load(), ax = await h.state();
      const list = await h.scan('a-before-refresh');
      c.steps.aUpdated = compareCaptions(expected, list.captions).passed;
      const chatAndEditor = ax.slice(ax.indexOf('HTML 内容'));
      c.steps.refreshNotice = /(?:文本|text|按钮) [^\n]*(?:工程已更新|内容已更新|刷新以|请刷新|版本已更新)/.test(chatAndEditor);
      c.steps.stale = !c.steps.aUpdated && !c.steps.refreshNotice;
      await h.persist(); return h.refresh();
    },
    async verifyRefreshedA() {
      await h.reopen(); const diff = h.assertScan(await h.scan('a-refreshed'), expected), c = await h.load();
      return h.finish(c.steps.stale ? 'Failed' : 'Passed', { diff, aUpdated: c.steps.aUpdated, refreshNotice: c.steps.refreshNotice,
        reason: c.steps.stale ? 'A retained old subtitles with no refresh/update notice' : 'A update/notice and saved refresh agree' });
    },
    async restore() {
      const c = await h.load(); if (c.steps.restoreAttempted) throw new Error('Undo already attempted; inspect before another undo');
      c.steps.restoreAttempted = true; await h.persist(); await h.undo(); h.assertScan(await h.scan('restored'));
      c.steps.restored = true; await h.persist(); return { restored: true, note: 'Close only the duplicate tab created by this case after checking its identity.' };
    },
  };
}
