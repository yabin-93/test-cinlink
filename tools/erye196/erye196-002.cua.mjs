import { createHarness, controls } from './common.cua.mjs';
export function createCase002(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-002' });
  return { h,
    async beforeRefresh() {
      const c = await h.load(); c.steps.beforeControls = controls(await h.state()); await h.persist();
      h.assertScan(await h.scan('before-refresh'));
      c.steps.beforeVerified = true; await h.persist();
      return h.refresh();
    },
    async afterRefresh() {
      const c = await h.load(); if (!c.steps.beforeVerified) throw new Error('Missing pre-refresh verification');
      await h.reopen(); const diff = h.assertScan(await h.scan('after-refresh'));
      const after = controls(await h.state());
      if (JSON.stringify(c.steps.beforeControls) !== JSON.stringify(after)) return h.finish('Failed', { reason: 'Content/observable history changed', before: c.steps.beforeControls, after });
      return h.finish('Passed', { diff, before: c.steps.beforeControls, after, boundary: 'Page list; not the old range/pagination API scenario.' });
    },
  };
}
