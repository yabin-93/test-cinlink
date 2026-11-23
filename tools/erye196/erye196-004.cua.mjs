import { createHarness } from './common.cua.mjs';
/** Current application negative branch is automated. Future delivered reference UI needs observed selectors. */
export function createCase004(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-004' });
  return { h,
    async checkReferenceEntry() {
      await h.app.pressKey('Escape'); await h.capture('reference-entry');
      const ax = await h.state();
      const anchor = config.referenceEntry;
      if (!anchor) return h.finish('Blocked', { reason: 'Record current object-selection/reference anchors first; global absence of a label is not proof of missing functionality.' });
      for (const select of config.selections || []) await h.click(select);
      const selected = await h.state();
      if (!selected.split('\n').some(l => anchor.test(l))) return h.finish('Failed', { reason: 'Requirement §03 object/range reference entry absent after fixture selection', boundary: 'Entry failure only; removal and Agent update not executed.' });
      await h.capture('reference-entry-present');
      return { status: 'NeedsReferenceWorkflow', boundary: 'Selection/reference/remove interaction must be configured from actual UI before full-case automation can be claimed.' };
    },
  };
}
