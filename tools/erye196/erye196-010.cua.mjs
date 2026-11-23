import { createHarness, controls } from './common.cua.mjs';
import { analyzeContinuity } from './media-continuity.mjs';
export const PROMPT = '在当前片段内部第5秒处分割，保留全部内容，不移动任何片段';
export function createCase010(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-010' });
  return { h,
    async start() {
      if (config.media?.duration !== 20 || config.media?.fps !== 30 || config.media?.frames !== 600 || !config.media?.sha256) throw new Error('Require verified 20-second / 30fps / 600-frame fixture');
      h.assertScan(await h.scan('baseline'));
      const c = await h.load(); c.steps.before = controls(await h.state()); await h.persist();
      await h.click(/按钮 视频 视频 00:00.00–00:20.00$/);
      return h.submitOnce('split', PROMPT);
    },
    async inspect() {
      const o = await h.observe('split'); if (o.running) return { status: 'Running' };
      if (!o.completed || o.failed) return h.finish('Failed', { reason: 'Split request did not complete', chat: o.chat });
      const current = controls(await h.state());
      const videos = current.clips.filter(c => c.startsWith('按钮 视频 视频 '));
      const correct = videos.length === 2 && videos.some(c => c.endsWith('00:00.00–00:05.00')) && videos.some(c => c.endsWith('00:05.00–00:20.00'));
      if (!correct) return h.finish('Failed', { reason: 'Actual video clips do not split into 0–5 and 5–20 seconds', videos });
      h.assertScan(await h.scan('after-split'));
      const c = await h.load(); c.steps.clipRangesVerified = true; await h.persist(); await h.capture('split-ranges');
      return { status: 'NeedsContinuityVerification', requirement: 'Verify real source mapping and cross-cut playback/file frames/audio; timeline labels alone do not prove no missing or duplicate frames.' };
    },
    async verifyContinuityFromFile(options) {
      if (!(await h.load()).steps.clipRangesVerified) throw new Error('Verify actual split clip ranges first');
      const evidence = await analyzeContinuity({ ...options, sourceSha256: config.media.sha256, outputPath: `${h.outputDir}/continuity.json` });
      h.assertScan(await h.scan('final-captions'));
      return h.finish(evidence.passed ? 'Passed' : 'Failed', { continuity: evidence, sourceRangesVerifiedByMarkers: evidence.frames.passed,
        boundary: 'Actual exported frames/audio plus unchanged editable subtitle times; export acquisition is a prepared input, not a generated mock.' });
    },
    async restore() {
      const c = await h.load(); if (c.steps.restoreAttempted) throw new Error('Restore already attempted');
      c.steps.restoreAttempted = true; await h.persist(); await h.undo(); h.assertScan(await h.scan('restored'));
      const clips = controls(await h.state()).clips.filter(c => c.startsWith('按钮 视频 视频 '));
      if (clips.length !== 1 || !clips[0].endsWith('00:00.00–00:20.00')) throw new Error('Original single video clip was not restored');
      c.steps.restored = true; await h.persist(); return { restored: true };
    },
  };
}
