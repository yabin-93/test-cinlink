import { createHarness, controls } from './common.cua.mjs';
export function createCase001(config) {
  const h = createHarness({ ...config, caseId: 'ERYE196-001' });
  return { h, async run() {
    const before = controls(await h.state()); h.assertScan(await h.scan('before'));
    const target = config.playheadTarget || h.baseline.find(c => c.start >= 5);
    if (!target) throw new Error('Fixture must contain a subtitle after five seconds');
    await h.locate(target); let ax = await h.capture('playhead');
    const playhead = Number(ax.match(/预览播放进度, Value: ([\d.]+)/)?.[1]);
    if (!Number.isFinite(playhead) || playhead <= 0) return h.finish('Failed', { reason: 'Locate did not move the playhead' });
    const zoom = Number(ax.match(/时间轴缩放, Value: ([\d.]+)/)?.[1]);
    await h.click(/按钮 放大时间轴$/); ax = await h.capture('zoom');
    const enlarged = Number(ax.match(/时间轴缩放, Value: ([\d.]+)/)?.[1]);
    if (!(enlarged > zoom)) return h.finish('Failed', { reason: 'Timeline zoom did not increase' });
    await h.click(/切换按钮 媒体, Value:/); await h.capture('media');
    await h.click(/切换按钮 字幕, Value: 0$/);
    h.assertScan(await h.scan('after'));
    const after = controls(await h.state());
    if (JSON.stringify(before) !== JSON.stringify(after)) return h.finish('Failed', { reason: 'View operations changed content controls', before, after });
    await h.click(/按钮 缩小时间轴$/);
    return h.finish('Passed', { playhead, zoomBefore: zoom, zoomAfter: enlarged, before, after, boundary: 'Observable UI history only; no internal revision claim.' });
  } };
}
