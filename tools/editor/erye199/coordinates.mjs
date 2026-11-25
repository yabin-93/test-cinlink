import { assert, clips } from './core.mjs';

export const coordinateSkippedCapabilities = Object.freeze([
  '独立可编辑蒙版及其输入局部坐标', '独立局部锚点及其坐标变换'
]);

export function coordinatePrompt(trackId, clipId) {
  return `在当前工程中，仅调整唯一视频（轨道${trackId}、片段${clipId}）：以640×360序列左上角为原点，中心设为(400,200)像素，等比缩放50%，顺时针旋转30°。保持原片、源0～10秒、时间线起点0秒、1倍速、关联原声及不透明度。仅做静态变换，不加关键帧、蒙版或局部锚点，不生成替代视频。`;
}

async function seek(ctx, time) {
  const selector = 'input[aria-label="预览播放进度"]';
  if (await ctx.page.evaluate(() => document.querySelector('input[aria-label="预览播放进度"]').type) === 'number') {
    await ctx.page.fill(selector, String(time)); await ctx.page.press(selector, 'Tab');
  } else await ctx.seek(time);
  await ctx.page.waitForFunction(t => Math.abs(Number(document.querySelector('input[aria-label="预览播放进度"]').value) - t) < .025, time, { timeout: 8_000 });
  await ctx.page.waitForFunction(() => [...document.querySelectorAll('.ed-preview-visual video')].some(v => getComputedStyle(v).visibility === 'visible' && v.readyState >= 2 && !v.seeking), undefined, { timeout: 15_000 });
}

export async function observeCoordinateGeometry(ctx, label) {
  const observed = await ctx.page.evaluate(() => {
    const canvas = document.querySelector('.ed-preview-canvas'), cr = canvas?.getBoundingClientRect();
    const media = [...document.querySelectorAll('.ed-preview-visual video')].filter(v => getComputedStyle(v).visibility === 'visible' && v.readyState >= 2);
    if (!cr || media.length !== 1) return { error: '没有唯一已加载的可见工程视频', mediaCount: media.length };
    const v = media[0], r = v.getBoundingClientRect(), css = getComputedStyle(v), m = new DOMMatrixReadOnly(css.transform);
    const sx = cr.width / 640, sy = cr.height / 360;
    return { canvasScreen: { x: cr.x, y: cr.y, width: cr.width, height: cr.height },
      mediaScreen: { x: r.x, y: r.y, width: r.width, height: r.height },
      centerSequencePixels: { x: ((r.left + r.right) / 2 - cr.x) / sx, y: ((r.top + r.bottom) / 2 - cr.y) / sy },
      boundsSequencePixels: { width: r.width / sx, height: r.height / sy },
      unrotatedSize: { width: parseFloat(css.width), height: parseFloat(css.height) },
      renderedRotationDeg: Math.atan2(m.b, m.a) * 180 / Math.PI,
      displayedTime: Number(document.querySelector('input[aria-label="预览播放进度"]').value), mediaTime: v.currentTime,
      duration: Number(document.querySelector('input[aria-label="预览播放进度"]').max), fullscreen: !!document.fullscreenElement };
  });
  await ctx.write(label + '-geometry', observed); await ctx.shot(label);
  assert.equal(observed.error, undefined, observed.error);
  const near = (actual, expected, tolerance, message) => assert.ok(Math.abs(actual - expected) <= tolerance, `${message}：实际${actual}，预期${expected}`);
  near(observed.centerSequencePixels.x, 400, 1, '画面中心X不是序列像素');
  near(observed.centerSequencePixels.y, 200, 1, '画面中心Y不是序列像素');
  near(observed.unrotatedSize.width, 320, 1, '50%后原片宽度'); near(observed.unrotatedSize.height, 180, 1, '50%后原片高度');
  near(observed.renderedRotationDeg, 30, .1, '可见视频旋转角度');
  // Independent rectangular geometry: a 320x180 rectangle rotated 30 degrees.
  near(observed.boundsSequencePixels.width, 367.128129, 2, '旋转后画面边界宽度');
  near(observed.boundsSequencePixels.height, 315.884573, 2, '旋转后画面边界高度');
  near(observed.displayedTime, 2, .025, '页面2秒位置'); near(observed.mediaTime, 2, .05, '原片2秒画面');
  near(observed.duration, 10, .001, '工程时长');
  return observed;
}

export async function verifyCoordinateCase(ctx, before, assistant) {
  assert.equal(assistant.status, 'done', '三项静态变换任务没有成功完成');
  const after = await ctx.read(), original = clips(before)[0], changed = clips(after)[0];
  const expected = structuredClone(before.content), target = expected.tracks.find(t => t.type === 'video').clips[0];
  target.transform = { position: { x: 400, y: 200 }, rotation_deg: 30, scale_percent: 50 };
  assert.deepEqual(after.content, expected, '变换没有完整生效，或原片/原声/时间线被额外改变');
  assert.equal(changed.clip_id, original.clip_id);
  await ctx.write('after-transform', after);
  await seek(ctx, 2); const normal = await observeCoordinateGeometry(ctx, 'normal-verified');
  await ctx.page.click('button[aria-label="放大预览"]');
  await ctx.page.waitForFunction(() => !!document.fullscreenElement, undefined, { timeout: 5_000 });
  const fullscreen = await observeCoordinateGeometry(ctx, 'fullscreen-verified');
  await ctx.page.click('button[aria-label="退出放大预览"]');
  await ctx.open(ctx.fixture); await seek(ctx, 2); const refreshed = await observeCoordinateGeometry(ctx, 'refreshed-verified');
  assert.deepEqual((await ctx.read()).content, after.content, '刷新后工程内容变化');
  await ctx.page.click('button[aria-label="预览播放"]');
  await ctx.page.waitForFunction(() => Number(document.querySelector('input[aria-label="预览播放进度"]').value) >= 2.8, undefined, { timeout: 10_000 });
  await ctx.page.click('button[aria-label="预览暂停"]'); await ctx.shot('playback-verified');
  await ctx.write('coordinate-checks', { normal, fullscreen, refreshed, skipped: coordinateSkippedCapabilities, source_and_audio_unchanged: true });
  return { status: 'Passed', actual: '006 v2：中心序列像素(400,200)、50%等比缩放、顺时针30度在普通预览/全屏/刷新后均正确；实际播放正常，原片/源范围/10秒时间线/关联原声未改。独立蒙版、局部锚点及输入局部坐标跳过。', definition_revision: 2, skipped_capabilities: coordinateSkippedCapabilities };
}
