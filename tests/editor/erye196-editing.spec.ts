import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';
import { credentials } from '../../src/config.js';
import { Editor196, evidenceRoot, videoClips, expectRange, expectBusinessCompletion, expectSpecificRejection, type Json } from '../../tools/editor/erye196.js';

const test = base.extend<{}, { editor: Editor196 }>({
  editor: [async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({ storageState: credentials.storageStatePath, viewport: { width: 1600, height: 1000 } });
    const page: Page = await context.newPage();
    const editor = new Editor196(page, context);
    try { await editor.init(); await use(editor); await editor.finish(); }
    catch (error) {
      await editor.shot(`worker-error-${Date.now()}`).catch(() => undefined);
      throw error;
    }
    finally { await context.storageState({ path: credentials.storageStatePath }); await context.close(); }
  }, { scope: 'worker', timeout: process.env.CINLINK_EDITOR_BOOTSTRAP === '1' ? 360_000 : 180_000 }],
});
test.afterEach(async ({ editor }, info) => {
  const file = await editor.shot(`${info.title.match(/ERYE196-\d+/)?.[0]}-${info.status}`);
  await info.attach('页面结果', { path: file, contentType: 'image/png' });
  await editor.record('batch-location', { root: evidenceRoot });
});

test('ERYE196-010 主片内部5秒分割 @ERYE-196', async ({ editor }) => {
  const f = await editor.fixture('010');
  const r = await editor.execute('010', f, 'A片段为当前唯一20秒视频，源范围0～20秒。在A片段内部第5秒处分割，保留全部内容，不移动任何片段，声音和字幕保持原对应关系。');
  expectBusinessCompletion(r);
  const clips = videoClips(r.after).sort((a, b) => a.timeline_start_sec - b.timeline_start_sec);
  expect(clips).toHaveLength(2);
  expectRange(clips[0], 0, 5, 0); expectRange(clips[1], 5, 20, 5);
  expect(clips.every(c => c.file_id === videoClips(f.before)[0].file_id)).toBe(true);
  const nonVideo = (p: Json) => p.content.tracks.filter((t: Json) => t.type !== 'video');
  expect(nonVideo(r.after)).toEqual(nonVideo(f.before));
});
test('ERYE196-011 追加B片段内部4秒分割 @ERYE-196', async ({ editor }) => {
  const f = await editor.fixture('011', 'append');
  const r = await editor.execute('011', f, '时间线前20秒是A片段，20～30秒是追加的B片段（B素材的源0～10秒）。只在B片段内部第4秒，即时间线24秒处分割B，保留B的全部10秒内容，不移动片段，不修改A或字幕。');
  expectBusinessCompletion(r);
  const clips = videoClips(r.after).sort((a, b) => a.timeline_start_sec - b.timeline_start_sec);
  expect(clips).toHaveLength(3);
  expect(clips[0]).toEqual(videoClips(f.before)[0]);
  expectRange(clips[1], 0, 4, 20); expectRange(clips[2], 4, 10, 24);
  expect(clips[1].file_id).toBe(videoClips(f.before)[1].file_id);
  expect(clips[2].file_id).toBe(clips[1].file_id);
});
test('ERYE196-012 起止端点分割均明确拒绝 @ERYE-196', async ({ editor }) => {
  for (const endpoint of [0, 20]) {
    const f = await editor.fixture(`012-${endpoint}`);
    const r = await editor.execute(`012-${endpoint}`, f, `当前唯一A片段20秒，源0～20秒。请在此片段内部第${endpoint}秒处分割，保留全部内容，不移动片段；若该位置不允许分割，请明确说明原因，不修改工程。`);
    // Soft checks ensure the other endpoint still executes after the first rejection fails.
    await test.step(`端点${endpoint}秒`, async () => {
      try { expectSpecificRejection(r, f.before); }
      catch (error) { expect.soft(false, String(error)).toBe(true); }
    });
  }
});
test('ERYE196-013 裁头2秒同步字幕配音固定BGM @ERYE-196', async ({ editor }) => {
  const f = await editor.fixture('013', 'speech');
  const r = await editor.execute('013', f, '当前A片段20秒，源0～20秒，原文字幕Welcome位于4～6秒，关联配音轨与A同源定位，背景音乐轨固定从0秒开始。只从A片段当前开头删除2秒，采用波纹裁剪；保留视频从时间线0秒开始，关联原声音频、字幕和配音同步前移2秒，删去已删除区间的对白；固定背景音乐保持原位置和范围。');
  expectBusinessCompletion(r);
  const clips = videoClips(r.after); expect(clips).toHaveLength(1); expectRange(clips[0], 2, 20, 0);
  const audio = (p: Json, role: string) => p.content.tracks.filter((t: Json) => t.type === 'audio' && t.role === role);
  expect(audio(r.after, 'background')).toEqual(audio(f.before, 'background'));
  const dubbing = r.after.content.dubbing.sort((a: Json, b: Json) => a.start_sec - b.start_sec);
  expect(dubbing).toHaveLength(2);
  expect(dubbing.map((d: Json) => [d.start_sec, d.end_sec])).toEqual([[2, 4], [8, 10]]);
  expectRange(audio(r.after, 'source')[0].clips[0], 2, 20, 0);
  await editor.page.reload({ waitUntil: 'domcontentloaded' });
  await expect(editor.page.locator('.ed-project-name')).toContainText(f.name);
  const captionsToggle = editor.page.locator('button[data-tab="captions"]');
  if (await captionsToggle.getAttribute('aria-expanded') !== 'true') await captionsToggle.click();
  const welcome = editor.page.locator('.ed-caption-row').filter({ hasText: 'Welcome' }).first();
  await expect(welcome).toBeVisible();
  // Caption timing and audible playback are additional acceptance evidence, not inferred from run=done.
  await expect(welcome.locator('.ed-cue-time')).toHaveText(/00:02\.00\s*[–-]\s*00:04\.00/);
});
test('ERYE196-014 跨边界字幕与保留讲话同步 @ERYE-196', async ({ editor }) => {
  const f = await editor.fixture('014', 'cross');
  const r = await editor.execute('014', f, '当前A片段20秒，源0～20秒。字幕Intro在0～1秒，Remove Keep在1～3秒；真实配音Intro为0～1秒、Remove为1～2秒、Keep为2～3秒。请从A开头波纹裁剪2秒，视频、关联字幕和配音同步，固定BGM不移动。删除Intro和Remove，只保留Keep并使其字幕及讲话在新时间线0～1秒，不要保留已删词或重复词。');
  expectBusinessCompletion(r);
  expectRange(videoClips(r.after)[0], 2, 20, 0);
  await editor.page.reload({ waitUntil: 'domcontentloaded' });
  await expect(editor.page.locator('.ed-project-name')).toContainText(f.name);
  const captionsToggle = editor.page.locator('button[data-tab="captions"]');
  if (await captionsToggle.getAttribute('aria-expanded') !== 'true') await captionsToggle.click();
  const captions = editor.page.locator('.ed-caption-panel').first();
  await expect(captions).toContainText('Keep');
  await expect(captions).not.toContainText('Intro');
  await expect(captions).not.toContainText('Remove');
});
test('ERYE196-015 裁头21秒超过20秒范围明确拒绝 @ERYE-196', async ({ editor }) => {
  const f = await editor.fixture('015');
  const r = await editor.execute('015', f, '当前唯一A片段实际20秒，源0～20秒。请从这个20秒片段开头删除21秒，采用波纹裁剪；如果超出范围，请明确定位裁剪参数错误，不修改其他内容。');
  expectSpecificRejection(r, f.before);
});
