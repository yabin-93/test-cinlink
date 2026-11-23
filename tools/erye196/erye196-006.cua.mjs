import { createHarness, replaceCaption, captions, captionKey, compareCaptions } from './common.cua.mjs';
export const PROMPT = '把这条字幕原文改成欢迎使用 CinLink';
export function createCase006(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-006' });
  const { target } = config;
  const answer = `目标是当前${h.documentName}工程中${target.start.toFixed(2)}～${target.end.toFixed(2)}秒、原文为${target.text}的字幕；仅把这条原文改为欢迎使用 CinLink，其他字幕、时间、声音和视频不改。`;
  return {
    h, answer,
    async start() {
      await h.app.pressKey('Escape');
      const ax = await h.state();
      if (/文本 .*字幕.*改为|文本 .*字幕.*改成/.test(ax)) throw new Error('Use an isolated conversation without a previous subtitle target');
      h.assertScan(await h.scan('baseline'));
      return h.submitOnce('ambiguous', PROMPT);
    },
    async inspectAmbiguous() {
      const o = await h.observe('ambiguous');
      if (o.running) return { status: 'Running' };
      h.assertScan(await h.scan('before-answer'));
      if (!o.requiresTarget) return h.finish('Failed', { reason: 'Ambiguous request did not ask for a unique target', chat: o.chat });
      await h.capture('target-feedback');
      const c = await h.load(); c.steps.ambiguousUnchanged = true; await h.persist();
      return { status: 'NeedsTarget', feedback: o.chat };
    },
    async answerTarget() {
      if (!(await h.load()).steps.ambiguousUnchanged) throw new Error('Verify target feedback and unchanged captions first');
      return h.submitOnce('answer', answer);
    },
    async adoptExisting({ ambiguousEvidence, answerEvidence }) {
      const all = new Map(); let feedback = false;
      for (const path of ambiguousEvidence) {
        const ax = await h.fs.readFile(path, 'utf8');
        if (!ax.includes(h.conversationId)) throw new Error('Evidence belongs to another conversation');
        feedback ||= /没有唯一字幕|请选中一条字幕|明确指定/.test(ax);
        for (const c of captions(ax)) all.set(captionKey(c), c);
      }
      if (!feedback || !compareCaptions(h.baseline, [...all.values()]).passed) throw new Error('Pre-answer evidence must show target feedback and complete unchanged captions');
      await h.adoptSubmitted('ambiguous', PROMPT, ambiguousEvidence);
      await h.adoptSubmitted('answer', answer, answerEvidence);
      const c = await h.load(); c.steps.ambiguousUnchanged = true; await h.persist();
      return { status: 'Adopted', coverage: 'Existing CUA submissions; script verification continues without resend.' };
    },
    async verify() {
      if (!(await h.load()).steps.ambiguousUnchanged) throw new Error('Missing ambiguous-target safety assertion');
      const o = await h.observe('answer');
      if (o.running) return { status: 'Running' };
      if (!o.completed || o.failed) return h.finish('Failed', { reason: 'Unique-target answer did not complete', chat: o.chat });
      const expected = replaceCaption(h.baseline, target, '欢迎使用 CinLink');
      const diff = h.assertScan(await h.scan('after-answer'), expected);
      await h.capture('changed');
      return h.finish('Passed', { diff, target, replacement: '欢迎使用 CinLink', boundary: 'Page business; target feedback may be displayed as failed task rather than a structured question.' });
    },
    async restore() {
      const c = await h.load();
      if (c.steps.restoreAttempted) throw new Error('Restore already attempted; verify before any additional undo');
      c.steps.restoreAttempted = true; await h.persist();
      await h.undo(); h.assertScan(await h.scan('restored'));
      c.steps.restored = true; await h.persist(); return { restored: true };
    },
    async verifyRestored() {
      const c = await h.load();
      if (!c.steps.restoreAttempted) throw new Error('No restore attempt to recover');
      h.assertScan(await h.scan('restored-recovered'));
      c.steps.restored = true; await h.persist(); return { restored: true, additionalUndo: false };
    },
  };
}
