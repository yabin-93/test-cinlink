import { createHarness, captionKey, replaceCaption, escapeRE } from './common.cua.mjs';
export function createCase007(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-007' });
  const { removedTarget, repairTarget } = config;
  const remaining = h.baseline.filter(c => captionKey(c) !== captionKey(removedTarget));
  if (remaining.length !== h.baseline.length - 1) throw new Error('Removed target must be unique');
  const stalePrompt = `只把刚才显示的当前${h.documentName}工程中${removedTarget.start.toFixed(2)}～${removedTarget.end.toFixed(2)}秒、原文为${removedTarget.text}的这一条字幕原文改为失效目标测试，其他内容不变。`;
  const repairPrompt = `重新选择当前${h.documentName}工程中${repairTarget.start.toFixed(2)}～${repairTarget.end.toFixed(2)}秒、原文为${repairTarget.text}的字幕，仅把这条原文改为引用修复测试，其他字幕、时间、声音和视频不改。`;
  return { h, stalePrompt, repairPrompt,
    async prepareT1() {
      h.assertScan(await h.scan('t1-baseline')); await h.locate(removedTarget); await h.capture('t1-target');
      const c = await h.load(); if (c.steps.openT2Attempted) throw new Error('T2 already attempted');
      c.steps.openT2Attempted = true; await h.persist();
      await h.app.pressKey('super+l'); await h.app.pressKey('alt+Return'); return { status: 'T2Opened' };
    },
    async deleteInT2() {
      await h.reopen();
      if (captionKey(h.baseline.at(-1)) !== captionKey(removedTarget)) throw new Error('This fixture requires the last, single-word subtitle group');
      await h.scroll('down', 100); // virtualized AX exposes offscreen controls; bring the actual last row into view
      const current = await h.state(), lines = current.split('\n');
      const targetIndex = h.id(current, new RegExp(`按钮 ${escapeRE(removedTarget.text)}, Help: ${removedTarget.start.toFixed(2)}–${removedTarget.end.toFixed(2)} 秒$`));
      const at = lines.findIndex(l => Number(l.trim().match(/^\d+/)?.[0]) === targetIndex);
      const start = lines.slice(0, at).map((l, i) => /按钮 定位此句字幕$/.test(l) ? i : -1).filter(i => i >= 0).at(-1);
      let end = lines.findIndex((l, i) => i > at && /按钮 定位此句字幕$/.test(l)); if (end < 0) end = lines.length;
      const group = lines.slice(start, end).join('\n');
      if ([...group.matchAll(/Help: [\d.]+–[\d.]+ 秒/g)].length !== 1) throw new Error('Choose a single-word subtitle group so deletion removes exactly C1');
      const c = await h.load(); if (c.steps.deleteAttempted && !c.steps.deleteKnownUnchanged) throw new Error('Deletion already attempted; inspect the saved list');
      c.steps.deleteAttempted = true; c.steps.deleteKnownUnchanged = false; c.steps.deleteAttemptCount = (c.steps.deleteAttemptCount || 0) + 1; await h.persist();
      await h.capture('visible-last-row-before-delete');
      // Some native AX presses on hover-only trash icons do nothing. A point is allowed only
      // when supplied from the current screenshot of this exact fixture/window size.
      if (config.deleteButtonPoint) await h.app.click(config.deleteButtonPoint);
      else {
        const fresh = await h.state(), rows = fresh.split('\n');
        const index = rows.map(l => /按钮 删除字幕$/.test(l) ? Number(l.trim().match(/^\d+/)[0]) : -1).filter(i => i >= 0).at(-1);
        if (index === undefined) throw new Error('Visible last-row delete control unavailable');
        await h.app.click(index);
      }
      return { status: 'Deleting', next: 'verifyDeletionAndReturnT1 after native controls settle' };
    },
    async verifyDeletionAndReturnT1() {
      if (/按钮 \(disabled\) 删除字幕/.test(await h.state())) return { status: 'Running', stage: 'SavingDeletion' };
      h.assertScan(await h.scan('t2-deleted'), remaining);
      const c = await h.load(); c.steps.deletedVerified = true; await h.persist();
      await h.app.pressKey('super+w'); await h.capture('t1-stale-after-t2-close');
      return { status: 'T1ReadyForStaleTargetRequest', deletedCaptions: 1 };
    },
    async verifyUnappliedDeletionAfterRefresh() {
      const c = await h.load();
      if (!c.steps.deleteAttempted || !c.steps.refreshRequestedAt || c.steps.deletedVerified) throw new Error('Only recover an unverified deletion after an explicit page refresh');
      await h.reopen(); h.assertScan(await h.scan('delete-not-applied-after-refresh'));
      c.steps.deleteKnownUnchanged = true; await h.persist(); return { deletionNotApplied: true, next: 'deleteInT2 will target the visible last row' };
    },
    requestMissing: () => h.submitOnce('missing', stalePrompt),
    async inspectMissing() {
      const o = await h.observe('missing'); if (o.running) return { status: 'Running' };
      const c = await h.load();
      c.steps.missingFeedback = /不存在|已删除|失效|找不到|未找到|没有.*字幕|重新选择|请.*选|无效/.test(o.chat);
      await h.persist(); await h.capture('missing-feedback'); return h.refresh();
    },
    async verifyMissing() {
      await h.reopen(); h.assertScan(await h.scan('missing-saved'), remaining);
      const c = await h.load(); if (!c.steps.missingFeedback) return h.finish('Failed', { reason: 'No missing-target/reselection feedback' });
      c.steps.missingSafe = true; await h.persist(); return { status: 'NeedsRepairTarget' };
    },
    async requestRepair() {
      if (!(await h.load()).steps.missingSafe) throw new Error('Missing-target safety must be verified first');
      return h.submitOnce('repair', repairPrompt);
    },
    async verifyRepair() {
      const o = await h.observe('repair'); if (o.running) return { status: 'Running' };
      if (!o.completed || o.failed) return h.finish('Failed', { reason: 'Valid replacement target did not complete', chat: o.chat });
      const diff = h.assertScan(await h.scan('repair-saved'), replaceCaption(remaining, repairTarget, '引用修复测试'));
      return h.finish('Passed', { diff, removedTarget, repairTarget });
    },
    async restore() {
      const c = await h.load();
      for (const key of ['undoRepair', 'undoDeletion']) {
        if (c.steps[key]) throw new Error(`Restore step ${key} already attempted; verify current content before another undo`);
        c.steps[key] = true; await h.persist(); await h.undo();
      }
      h.assertScan(await h.scan('restored')); c.steps.restored = true; await h.persist(); return { restored: true };
    },
  };
}
