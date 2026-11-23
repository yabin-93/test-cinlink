import { createHarness, replaceCaption } from './common.cua.mjs';
export function createCase005(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-005' }), target = config.target;
  const prompt = `只把当前工程中${target.start.toFixed(2)}～${target.end.toFixed(2)}秒、原文为${target.text}的这一条字幕原文改为欢迎使用 CinLink，译文、其他字幕、声音和视频不改`;
  const expected = replaceCaption(h.baseline, target, '欢迎使用 CinLink');
  return { h, prompt,
    async start() { h.assertScan(await h.scan('baseline')); return h.submitOnce('target', prompt); },
    async observe() { return h.observe('target'); },
    async answerClarification(answer) { return h.submitOnce('clarification', answer); },
    async verifyChanged() {
      const c = await h.load(), key = c.submissions.clarification ? 'clarification' : 'target', o = await h.observe(key);
      if (o.running) return { status: 'Running' };
      if (!o.completed || o.failed) return h.finish('Failed', { reason: 'Target request did not complete', chat: o.chat });
      h.assertScan(await h.scan('changed'), expected);
      const ax = await h.locate({ ...target, text: '欢迎使用 CinLink' });
      if (!ax.replace(/\s/g, '').includes('欢迎使用CinLink')) throw new Error('Changed caption preview unavailable');
      await h.capture('preview'); c.steps.changedVerified = true; await h.persist(); return h.refresh();
    },
    async verifySaved() {
      if (!(await h.load()).steps.changedVerified) throw new Error('Verify changed preview before refresh');
      await h.reopen(); const diff = h.assertScan(await h.scan('saved'), expected);
      return h.finish('Passed', { target, diff, boundary: 'Page subtitles/preview/save. No exported-audio hash claim.' });
    },
  };
}
