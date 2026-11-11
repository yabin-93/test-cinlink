// Continue direct single-action checks in the user's existing production window.
// No browser launch, Agent prompt, backend save, retry or cloud defect write.
import assert from 'node:assert/strict';
import { single, unchangedExcept, dragMove, captions, field } from './ui-expanded-basics.mjs?fill-gaps-20261106';
import { contentEqual, seekUI, dragEdge } from './ui-basics.mjs?fill-gaps-20261106';

export async function openTab(page, name) {
  const tab = page.locator(`button[data-tab="${name}"]`);
  if (await tab.getAttribute('aria-expanded') !== 'true') await tab.click();
}
export async function imagePanel(page) {
  await openTab(page, 'watermark');
  await page.getByRole('button', { name: '图片水印', exact: true }).click();
}
const image = p => p.content.watermarks.image;
const imageOnly = (a, b) => unchangedExcept(a, b, 'watermarks');
async function range(page, label, value) {
  const input = page.getByLabel(label, { exact: true }); await input.fill(String(value)); await input.press('Tab');
}

export async function imageChecks(d) {
  const page = d.ctx.page, out = [];
  const item = async (id, label, action, check) => {
    await imagePanel(page);
    out.push(await single(d, id, label, action, (a, b) => imageOnly(a, b) && check(a, b)));
  };
  try {
    await page.keyboard.press('Escape');
    await item('UI-53', '图片水印宽160改240', () => range(page, '图片宽度', 240), a => image(a)?.width === 240);
    await item('UI-54', '图片水印0%透明度边界', () => range(page, '水印不透明度', 0), a => image(a)?.opacity === 0);
    await item('UI-55', '图片水印边距24改40', () => field(page, '水印边距', 40), a => image(a)?.placement.margin_px === 40);
    await item('UI-56', '图片水印右上改左下', async () => {
      await page.getByRole('combobox', { name: '水印位置', exact: true }).click();
      await page.getByRole('option', { name: '左下', exact: true }).click();
    }, a => image(a)?.placement.preset === 'bottom-left');
    await imagePanel(page);
    await page.locator('.ed-wm-footer > summary').click();
    const timing = await d.run('UI-57', '图片水印从全片切换时间范围', () => page.getByRole('switch', { name: '全片显示', exact: true }).uncheck(),
      (a, b) => imageOnly(a, b) && a.content.watermarks.timing.mode === 'range' && a.content.watermarks.timing.end_sec > 0);
    out.push({ id: timing.id, status: timing.status });
    if (timing.status === 'Passed') {
      await d.refresh(timing.after, 'UI-57');
      try {
        const timed = async (id, label, action, check) => {
          await imagePanel(page);
          const footer = page.locator('.ed-wm-footer'); if (await footer.getAttribute('open') === null) await footer.locator('summary').click();
          out.push(await single(d, id, label, action, check));
        };
        await timed('UI-58', '图片水印开始0改2秒', () => field(page, '水印开始时间（秒）', 2), (a, b) => imageOnly(a, b) && a.content.watermarks.timing.start_sec === 2);
        await timed('UI-59', '图片水印结束改10秒', () => field(page, '水印结束时间（秒）', 10), (a, b) => imageOnly(a, b) && a.content.watermarks.timing.end_sec === 10);
        await timed('UI-60', '图片水印结束-1秒非法值拦截', async () => {
          await field(page, '水印结束时间（秒）', -1); await page.waitForTimeout(1400);
        }, async (a, b) => contentEqual(a, b) && a.revision === b.revision && (await page.locator('.ed-watermark-panel').innerText()).includes('有效'));
      } finally { await d.restore('UI-57', timing.before); await d.refresh(timing.before, 'UI-57-restored'); }
    } else if (timing.changed) { await d.restore('UI-57', timing.before); await d.refresh(timing.before, 'UI-57-restored'); }
    await item('UI-61', 'JPEG水印替换为PNG并保留设置', async () => {
      const picker = page.waitForEvent('filechooser'); await page.getByRole('button', { name: '替换', exact: true }).click();
      await (await picker).setFiles('E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道/11.png');
    }, (a, b) => image(a)?.file_id !== image(b)?.file_id && image(a)?.watermark_id === image(b)?.watermark_id &&
      image(a)?.width === image(b)?.width && image(a)?.opacity === image(b)?.opacity && JSON.stringify(image(a)?.placement) === JSON.stringify(image(b)?.placement));
    await item('UI-62', '删除图片水印', () => page.getByRole('button', { name: '移除图片水印', exact: true }).click(), a => image(a) === null);
    return out;
  } finally { await d.restore('UI-52', d.baseline); await d.refresh(d.baseline, 'UI-52-restored'); }
}

export { single, contentEqual, seekUI, dragEdge, dragMove, field, captions };

export async function blocked(d, id, label, reason) {
  const p = await d.get(), screenshot = `${id}-blocked.png`;
  await d.ctx.page.screenshot({ path: d.ctx.path.join(d.ctx.report, screenshot) });
  const row = { id, kind: 'case', label, status: 'Blocked', reason, changed: false,
    beforeRevision: p.revision, afterRevision: p.revision, projectId: p.project_id,
    conversationId: d.target.conversationId, screenshot, executed: false };
  for (const [name, data] of [[`${id}-before.json`, p], [`${id}-after.json`, p], [`${id}-result.json`, row]])
    await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, name), JSON.stringify(data, null, 2));
  d.results.push(row); await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, 'results.json'), JSON.stringify(d.results, null, 2));
  return { id, status: row.status, reason };
}

export function observeOwnedSaves(d, tag) {
  const saves = [], rpc = [], pending = new Set();
  const listener = response => {
    const work = (async () => {
      const request = response.request(), url = new URL(response.url());
      if (request.method() !== 'POST') return;
      const projectSave = url.pathname.endsWith('/editor/projects/save') || url.pathname.endsWith(`/editor/projects/${d.target.projectId}/save`);
      const taskCall = url.pathname.includes('/mcp');
      if (!projectSave && !taskCall) return;
      const input = request.postDataJSON(), body = await response.json();
      if (projectSave && response.ok() && input?.project_id === d.target.projectId && input.content) {
        saves.push({ project_id: input.project_id, revision: body.revision, content: input.content, base_revision: input.base_revision });
      } else if (taskCall) rpc.push({ path: url.pathname, input, body });
    })().catch(() => {});
    pending.add(work); work.finally(() => pending.delete(work));
  };
  d.ctx.page.on('response', listener);
  return { saves, rpc, async stop() {
    d.ctx.page.off('response', listener); await Promise.all([...pending]);
    await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, `${tag}-owned-saves.json`), JSON.stringify(saves, null, 2));
    await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, `${tag}-rpc.json`), JSON.stringify(rpc, null, 2));
  } };
}

// A single UI action may create an entry, set its voice, then apply audio.
// Undo only to known earlier snapshots from that action, checking every step.
export async function restoreOwnedStates(d, id, baseline, ownedSaves, after) {
  const ordered = value => Array.isArray(value) ? value.map(ordered) : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(k => [k, ordered(value[k])])) : value;
  const same = (a, b) => JSON.stringify(ordered(a.content)) === JSON.stringify(ordered(b.content));
  const states = [baseline];
  for (const saved of [...ownedSaves].sort((a, b) => a.revision - b.revision))
    if (!states.some(p => same(p, saved))) states.push(saved);
  if (!states.some(p => same(p, after))) states.push(after);
  let current = await d.get(), index = states.findIndex(p => same(p, current));
  assert(index >= 0, '当前内容不属于本轮已记录状态，不撤销');
  for (let n = 1; index > 0 && n <= states.length; n++) {
    const allowed = states.slice(0, index);
    const result = await d.run(`${id}-owned-restore-${n}`, '逐次撤销至本轮已记录的前置快照',
      () => d.ctx.page.getByRole('button', { name: '撤销', exact: true }).click(),
      p => allowed.some(s => same(p, s)), { kind: 'cleanup' });
    assert.equal(result.status, 'Passed', '撤销未匹配任何本轮前置，停止');
    current = result.after; index = allowed.findIndex(p => same(p, current));
  }
  assert(same(current, baseline), '本轮多个保存阶段未完整恢复，停止');
  await d.refresh(baseline, `${id}-restored`);
}

export async function generateOneVoice(d) {
  const page = d.ctx.page;
  await openTab(page, 'voiceover');
  const before = await d.get(), subtitle = before.content.tracks.find(t => t.type === 'subtitle');
  const blockId = subtitle.clips[0].bindings[2].block_id;
  await page.getByLabel('第 3 句配音文案', { exact: true }).click();
  await page.getByLabel('配音语言', { exact: true }).selectOption('en');
  const observed = observeOwnedSaves(d, 'UI-72');
  let result;
  try {
    result = await d.run('UI-72', '仅第3句生成English逐句配音一次',
      () => page.getByRole('button', { name: '生成配音', exact: true }).click(),
      async (a, b) => {
        const errors = await page.locator('.ed-voice-panel [role="alert"],.ed-voice-panel .ed-script-error').allTextContents();
        if (errors.some(x => x.trim())) throw new Error(errors.join(' ').slice(0, 300));
        const entries = a.content.dubbing.filter(x => !b.content.dubbing.some(old => old.dubbing_id === x.dubbing_id));
        return entries.length === 1 && entries[0].block_id === blockId && entries[0].audio_state === 'ready' && !!entries[0].audio_file_id;
      }, { timeoutMs: 180000 });
  } finally { await observed.stop(); }
  await d.refresh(result.after, 'UI-72');
  return { result, blockId, saves: observed.saves, rpc: observed.rpc };
}

export async function voiceRemainder(d, generated, ownedVersions, { includeEmpty = true, restore = true } = {}) {
  const page = d.ctx.page, out = [], target = generated.result.after.content.dubbing.find(e => e.block_id === generated.blockId);
  const entry = p => p.content.dubbing.find(e => e.dubbing_id === target?.dubbing_id);
  const advanced = async () => {
    await openTab(page, 'voiceover');
    const details = page.locator('.ed-speech-advanced'); if (await details.getAttribute('open') === null) await details.locator('summary').click();
  };
  const savedSubtitles = p => p.content.tracks.filter(t => t.type === 'subtitle');
  try {
    if (target?.audio_state === 'ready') {
      const isolation = await d.run('UI-73-isolation-fixture', '仅为单句预览临时静音独立旁白',
        () => page.getByRole('button', { name: '旁白静音', exact: true }).click(),
        p => p.content.tracks.find(t => t.type === 'audio' && t.role === 'narration').muted, { kind: 'fixture' });
      assert.equal(isolation.status, 'Passed');
      try {
        let played = false;
        out.push(await single(d, 'UI-73', '时间线预览新生成的单句音频并下载', async () => {
          await seekUI(page, 3.7); await page.getByRole('button', { name: '预览播放', exact: true }).click();
          await page.waitForTimeout(1000); await page.getByRole('button', { name: '预览暂停', exact: true }).click();
          const progress = Number(await page.getByLabel('预览播放进度', { exact: true }).inputValue()); played = progress > 3.7 && progress < target.end_sec;
          await advanced(); const download = page.waitForEvent('download', { timeout: 60000 });
          await page.locator('.ed-execution-download').filter({ hasText: 'dubbing-' }).click();
          await (await download).saveAs(d.ctx.path.join(d.ctx.report, 'UI-73-generated.wav'));
          await d.ctx.fs.writeFile(d.ctx.path.join(d.ctx.report, 'UI-73-playback.json'), JSON.stringify({ progress, start: 3.7, end: target.end_sec, otherSourceAndNarrationMuted: true, audioFileId: target.audio_file_id }));
        }, (a, b) => played && contentEqual(a, b) && entry(a)?.audio_state === 'ready'));
      } finally { await d.restore('UI-73-isolation-fixture', isolation.before); await d.refresh(isolation.before, 'UI-73-isolation-fixture-restored'); }
    } else out.push(await blocked(d, 'UI-73', '时间线预览单句配音', '目标单句音频未就绪'));
    if (target) {
      await advanced();
      out.push(await single(d, 'UI-74', '仅现有逐句配音文案改为TEST voice line', async () => {
        const input = page.getByLabel('配音译文', { exact: true }); await input.fill('TEST voice line'); await input.blur();
      }, (a, b) => entry(a)?.translation_text === 'TEST voice line' && JSON.stringify(savedSubtitles(a)) === JSON.stringify(savedSubtitles(b))));
      if (target.audio_state === 'ready') {
        await advanced(); const more = page.locator('.ed-voiceover-more'); if (await more.getAttribute('open') === null) await more.locator('summary').click();
        out.push(await single(d, 'UI-75', '仅删除目标句配音音频', () => more.getByRole('button', { name: '删除音频', exact: true }).click(),
          (a, b) => entry(a)?.audio_state === 'explicitly_deleted' && !entry(a)?.audio_file_id && JSON.stringify(savedSubtitles(a)) === JSON.stringify(savedSubtitles(b))));
      } else out.push(await blocked(d, 'UI-75', '删除单句配音音频', '目标音频未就绪'));
      if (includeEmpty) {
      await advanced();
      const empty = await d.run('UI-76-empty-fixture', '准备目标句空配音文案，结果单列', async () => {
        const input = page.getByLabel('配音译文', { exact: true }); await input.fill(''); await input.blur();
      }, a => entry(a)?.translation_text === '', { kind: 'fixture' });
      try {
        if (empty.status === 'Passed') {
          await advanced(); const more = page.locator('.ed-voiceover-more'); if (await more.getAttribute('open') === null) await more.locator('summary').click();
          const observed = observeOwnedSaves(d, 'UI-76'); let rejected = false;
          try {
            out.push(await single(d, 'UI-76', '空文案拒绝生成单句配音', async () => {
              await more.getByRole('button', { name: '生成配音', exact: true }).click(); await page.waitForTimeout(1000);
              const dialogs = page.getByRole('dialog');
              if (await dialogs.count()) {
                const referenceVideo = d.baseline.content.tracks.find(t => t.type === 'video').clips[0].file_id;
                await dialogs.getByLabel('参考音频/视频', { exact: true }).selectOption(referenceVideo);
                await dialogs.getByLabel('参考字幕', { exact: true }).selectOption(target.subtitle_file_id);
                const voice = await dialogs.getByLabel('音色', { exact: true }).locator('option').nth(1).getAttribute('value');
                await dialogs.getByLabel('音色', { exact: true }).selectOption(voice);
                const confirm = dialogs.getByRole('button', { name: /确认生成|生成配音|开始生成/ });
                if (await confirm.count() === 1) await confirm.click();
              }
              await page.waitForTimeout(1200);
              rejected = /不能为空|请.*文案|没有.*文本|缺少.*文本|non-empty spoken text/.test(await page.locator('.ed-editor').innerText());
            }, async (a, b) => {
              rejected ||= /不能为空|请.*文案|没有.*文本|缺少.*文本|non-empty spoken text/.test(await page.locator('.ed-editor').innerText());
              const submitted = observed.rpc.find(r => r.input.method === 'editor.task.submit')?.body.result?.structuredContent;
              const failed = observed.rpc.map(r => r.body.result?.structuredContent).find(t => t?.task_id === submitted?.task_id && t?.status === 'failed' && !t.result?.files?.length);
              if (submitted && observed.rpc.some(r => r.body.result?.structuredContent?.task_id === submitted.task_id && r.body.result?.structuredContent?.status === 'done')) throw new Error('空文案任务成功生成了产物');
              return rejected && contentEqual(a, b) && (!submitted || !!failed);
            }, { timeoutMs: 120000 }));
          } finally { await observed.stop(); }
        } else out.push(await blocked(d, 'UI-76', '空文案拒绝生成', '空文案前置未能提交，未继续发起真实任务'));
      } finally { await d.restore('UI-76-empty-fixture', empty.before); await d.refresh(empty.before, 'UI-76-empty-fixture-restored'); }
      }
    } else {
      for (const [id, label] of [['UI-74', '修改单句配音文案'], ['UI-75', '删除单句音频'], ['UI-76', '空文案拒绝生成']]) out.push(await blocked(d, id, label, '未创建逐句配音实体'));
    }
    await openTab(page, 'voiceover'); let selected = false;
    out.push(await single(d, 'UI-77', '配音语言切为中文，不自动生成', async () => {
      await page.getByLabel('配音语言', { exact: true }).selectOption('zh'); selected = await page.getByLabel('配音语言', { exact: true }).inputValue() === 'zh';
    }, (a, b) => selected && contentEqual(a, b) && a.revision === b.revision));
    return out;
  } finally { if (restore) await restoreOwnedStates(d, 'UI-72', generated.result.before, ownedVersions, generated.result.after); }
}

export async function textBoundaries(d) {
  const page = d.ctx.page, out = [], cue = d.baseline.content.tracks.find(t => t.type === 'subtitle').clips[0].bindings[1].block_id;
  const edit = async text => {
    await page.locator(`.ed-caption-text[data-block-id="${cue}"]`).click();
    await page.locator('.ed-caption-inline-input').fill(text); await page.locator('.ed-caption-inline-input').press('Enter');
  };
  const changedTo = text => (a, b) => {
    const oldTracks = b.content.tracks.filter(t => t.type !== 'subtitle'), newTracks = a.content.tracks.filter(t => t.type !== 'subtitle');
    return JSON.stringify(oldTracks) === JSON.stringify(newTracks) && a.content.tracks.find(t => t.type === 'subtitle').clips[0].diff.some(x => x.identity === cue && x.text === text && x.start_sec === 3.26 && x.end_sec === 3.52);
  };
  await captions(page); await seekUI(page, 0);
  out.push(await single(d, 'UI-81', '字幕中文标点与emoji保存', () => edit('你好，CinLink！🎬'), changedTo('你好，CinLink！🎬')));
  await captions(page); await seekUI(page, 0);
  out.push(await single(d, 'UI-82', '字幕200字符完整保存', () => edit('A'.repeat(200)), changedTo('A'.repeat(200))));
  await captions(page); await seekUI(page, 0);
  const cancel = await d.run('UI-83', '字幕编辑按Esc取消并恢复原文', async () => {
    await page.locator(`.ed-caption-text[data-block-id="${cue}"]`).click();
    await page.locator('.ed-caption-inline-input').fill('ESC temporary text');
    await page.locator('.ed-caption-inline-input').press('Escape'); await page.waitForTimeout(800);
  }, async (a, b) => contentEqual(a, b) && a.revision === b.revision &&
    await page.locator('.ed-caption-inline-input:visible').count() === 0 &&
    (await page.locator(`.ed-caption-text[data-block-id="${cue}"]`).innerText()) === 'real?');
  out.push({ id: cancel.id, status: cancel.status });
  if (await page.locator('.ed-caption-inline-input:visible').count()) {
    const cleanup = await d.run('UI-83-clear-draft', '保留失败证据后仅清理本轮临时编辑文字', async () => {
      await page.locator('.ed-caption-inline-input').fill('real?'); await page.locator('.ed-caption-inline-input').press('Enter');
    }, p => contentEqual(p, cancel.before), { kind: 'cleanup' });
    assert.equal(cleanup.status, 'Passed', '临时字幕输入未恢复，停止');
  } else if (cancel.changed) await d.restore('UI-83', cancel.before);
  await d.refresh(cancel.before, 'UI-83-restored');
  const video = (await d.get()).content.tracks.find(t => t.type === 'video');
  out.push(await single(d, 'UI-84', '视频起点禁止零长度分割', async () => {
    await seekUI(page, 10);
    await page.locator(`.ed-track-row[data-track-id="${video.track_id}"] .ed-timeline-clip`).click({ position: { x: 80, y: 8 } });
    await seekUI(page, 0);
    const split = page.getByRole('button', { name: '分割所选片段', exact: true });
    if (await split.isEnabled()) { await split.click(); await page.waitForTimeout(1000); }
  }, (a, b) => a.revision === b.revision && contentEqual(a, b)));
  return out;
}

export async function secondSubtitleChecks(d, { reuseLibrary = false, addId = 'UI-78', chineseId = 'UI-79', englishId = 'UI-80' } = {}) {
  const page = d.ctx.page, out = [], beforeFiles = new Set((await d.get()).content.tracks.filter(t => t.type === 'subtitle').flatMap(t => t.clips.map(c => c.file_id)));
  const fileName = 'E196-translation-zh.srt';
  await openTab(page, 'media'); await page.getByRole('button', { name: '聊天', exact: true }).click(); await seekUI(page, 0);
  const add = await d.run(addId, '通过媒体导入新增独立中文字幕文件', async () => {
    if (!reuseLibrary) {
    const picker = page.waitForEvent('filechooser'); await page.getByRole('button', { name: '导入素材', exact: true }).click();
    await (await picker).setFiles(d.ctx.path.resolve('tools/editor/fixtures', fileName));
    }
    // Upload deduplication can reuse a library name with an earlier prefix.
    const card = page.locator(`.ed-media-card[title$="${fileName}"]`); await card.waitFor({ timeout: 60000 });
    assert.equal(await card.count(), 1, '同名字幕候选不唯一，停止而不猜测');
    const displayedName = await card.getAttribute('title');
    await page.locator('.ed-media-card-wrap').filter({ has: card }).hover();
    await page.getByRole('button', { name: `将 ${displayedName} 添加到时间轴`, exact: true }).click();
    await page.waitForTimeout(800);
    const dialog = page.getByRole('dialog', { name: '绑定字幕文件', exact: true });
    if (await dialog.isVisible()) {
      await dialog.getByLabel('字幕用途', { exact: true }).selectOption('additional');
      const language = dialog.getByLabel('字幕语言（可留空）', { exact: true }); await language.fill('zh'); await language.blur();
      await dialog.getByLabel('替换已有字幕', { exact: true }).selectOption('');
      await dialog.getByRole('button', { name: '绑定', exact: true }).click();
    }
  }, (a, b) => {
    const fresh = a.content.tracks.filter(t => t.type === 'subtitle').flatMap(t => t.clips).filter(c => !beforeFiles.has(c.file_id));
    return fresh.length === 1 && fresh[0].bindings.length === 2 && b.content.tracks.every(t => JSON.stringify(a.content.tracks.find(x => x.track_id === t.track_id)) === JSON.stringify(t));
  }, { timeoutMs: 60000 });
  out.push({ id: add.id, status: add.status });
  try {
    if (add.status !== 'Passed') {
      out.push(await blocked(d, chineseId, '仅修改新增中文字幕', '第二字幕文件没有完成可用前置'));
      out.push(await blocked(d, englishId, '仅修改原英文字幕且隔离中文', '第二字幕文件没有完成可用前置'));
      return out;
    }
    await d.refresh(add.after, addId);
    const chinese = add.after.content.tracks.filter(t => t.type === 'subtitle').flatMap(t => t.clips).find(c => !beforeFiles.has(c.file_id));
    const en = add.before.content.tracks.find(t => t.type === 'subtitle').clips[0];
    const change = async (block, text) => {
      await captions(page); await seekUI(page, 0);
      await page.locator(`.ed-caption-text[data-block-id="${block}"]`).click();
      await page.locator('.ed-caption-inline-input').fill(text); await page.locator('.ed-caption-inline-input').press('Enter');
    };
    const targetClip = (p, id) => p.content.tracks.filter(t => t.type === 'subtitle').flatMap(t => t.clips).find(c => c.file_id === id);
    out.push(await single(d, chineseId, '只改中文欢迎为欢迎使用CinLink', () => change(chinese.bindings[0].block_id, '欢迎使用CinLink'),
      (a, b) => targetClip(a, chinese.file_id).diff.some(x => x.text === '欢迎使用CinLink') && JSON.stringify(targetClip(a, en.file_id)) === JSON.stringify(targetClip(b, en.file_id))));
    out.push(await single(d, englishId, '只改英文real?且中文不变', () => change(en.bindings[1].block_id, 'Really?'),
      (a, b) => targetClip(a, en.file_id).diff.some(x => x.text === 'Really?') && JSON.stringify(targetClip(a, chinese.file_id)) === JSON.stringify(targetClip(b, chinese.file_id))));
    return out;
  } finally {
    if (await page.getByRole('dialog', { name: '绑定字幕文件', exact: true }).isVisible()) await page.getByRole('dialog').getByRole('button', { name: '取消', exact: true }).click();
    await d.restore(addId, add.before); await d.refresh(add.before, `${addId}-restored`);
  }
}

const bgm = p => p.content.tracks.find(t => t.type === 'audio' && t.role === 'background');
const withoutBgm = p => p.content.tracks.filter(t => !(t.type === 'audio' && t.role === 'background'));
const bgmOnly = (a, b) => JSON.stringify(withoutBgm(a)) === JSON.stringify(withoutBgm(b));

export async function bgmChecks(d, { reuseLibrary = false, insertId = 'UI-64' } = {}) {
  const page = d.ctx.page, out = [];
  await openTab(page, 'media');
  await page.getByRole('button', { name: '聊天', exact: true }).click();
  const library = reuseLibrary ? { id: 'UI-63', status: 'Passed' } : await d.run('UI-63', '导入12秒MP3到聊天素材库', async () => {
    const chooser = page.waitForEvent('filechooser'); await page.getByRole('button', { name: '导入素材', exact: true }).click();
    await (await chooser).setFiles(d.ctx.path.join(d.ctx.report, 'fixtures/6-first12s.mp3'));
  }, async (a, b) => contentEqual(a, b) && a.revision === b.revision &&
    await page.locator('.ed-media-card[title="6-first12s.mp3"]').count() === 1, { timeoutMs: 60000 });
  if (!reuseLibrary) out.push({ id: library.id, status: library.status });
  if (library.status !== 'Passed') return out;
  await seekUI(page, 0);
  const insert = await d.run(insertId, '音频素材加入独立BGM轨', async () => {
    await openTab(page, 'media');
    await page.locator('.ed-media-card-wrap').filter({ has: page.locator('.ed-media-card[title="6-first12s.mp3"]') }).hover();
    await page.getByRole('button', { name: '将 6-first12s.mp3 添加到时间轴', exact: true }).click();
  }, (a, b) => bgmOnly(a, b) && !!bgm(a) && bgm(a).clips.length === 1 &&
    bgm(a).clips[0].source_out_sec > 11.9 && bgm(a).clips[0].source_out_sec < 12.1);
  out.push({ id: insert.id, status: insert.status });
  try {
    if (insert.status !== 'Passed') return out;
    await d.refresh(insert.after, insertId);
    const track = bgm(insert.after), trackId = track.track_id, length = track.clips[0].source_out_sec;
    const row = () => page.locator(`.ed-track-row[data-track-id="${trackId}"]`);
    const clip = () => row().locator('.ed-timeline-clip').first();
    const each = async (id, label, action, verify) => out.push(await single(d, id, label, action,
      (a, b) => bgmOnly(a, b) && verify(a, b)));
    await each('UI-65', '仅BGM音量100%降为50%', async () => {
      await row().scrollIntoViewIfNeeded(); await row().hover();
      const handle = row().locator('.ed-volume-handle'), box = await handle.boundingBox(); assert(box);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 12, { steps: 12 }); await page.mouse.up();
    }, a => bgm(a).clips[0].volume === .5);
    await each('UI-66', '仅BGM静音', async () => {
      await row().scrollIntoViewIfNeeded(); await row().locator('.ed-track-heading button').last().click();
    }, a => bgm(a).muted === true);
    await each('UI-67', 'BGM裁头约1秒', () => dragEdge(page, clip(), 'start', 1, length), a => bgm(a).clips[0].source_in_sec > .5);
    await each('UI-68', 'BGM裁尾约1秒', () => dragEdge(page, clip(), 'end', -1, length), a => bgm(a).clips[0].source_out_sec < length - .5);
    await each('UI-69', 'BGM整体右移约2秒', () => dragMove(page, clip(), 2, length),
      (a, b) => bgm(a).clips[0].timeline_start_sec > 1 && bgm(a).clips[0].source_out_sec === bgm(b).clips[0].source_out_sec);
    const select = async () => { await seekUI(page, 10); await clip().click({ position: { x: 80, y: 8 } }); };
    await each('UI-70', '只复制BGM并粘贴到15秒', async () => {
      await select(); await page.locator('.ed-timeline').press('Control+c'); await seekUI(page, 15); await page.locator('.ed-timeline').press('Control+v');
    }, a => bgm(a).clips.length === 2);
    await each('UI-71', '删除唯一BGM片段', async () => { await select(); await page.locator('.ed-timeline').press('Delete'); }, a => !bgm(a)?.clips.length);
    return out;
  } finally {
    await d.restore(insertId, insert.before); await d.refresh(insert.before, `${insertId}-restored`);
  }
}
