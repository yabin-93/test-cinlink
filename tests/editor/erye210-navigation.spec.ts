import { isSupersededLegacy210 } from '../../tools/editor/erye210-retired.js';
import { existsSync } from 'node:fs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import path from 'node:path';
import { test as base, expect, chromium, type BrowserContext, type Page } from '@playwright/test';
import { credentials } from '../../src/config.js';
import { Navigation210, Prerequisite210, rails210 } from '../../tools/editor/erye210.js';

type Json = Record<string, any>;
const origin = process.env.CINLINK_ERYE210_ORIGIN || 'https://app.cinlink.ai';
const root = path.resolve('reports/editor-210', process.env.CINLINK_ERYE210_BATCH || 'local');
const records: Json[] = [];
let workspace = '';
const test = base.extend<{ nav: Navigation210 }, { session: { page: Page; context: BrowserContext; ready: boolean; reason: string } }>({
  session: [async ({}, use) => {
    const endpoint = process.env.CINLINK_ERYE210_CDP_ENDPOINT;
    if (endpoint && !/^http:\/\/(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(endpoint))
      throw Error('仅允许连接本机Chrome调试端口');
    const browser = endpoint ? await chromium.connectOverCDP(endpoint) : await chromium.launch({ channel: 'chrome', headless: false });
    let context: BrowserContext, page: Page, reason = '';
    if (endpoint) {
      const matches = browser.contexts().flatMap(c => c.pages().filter(p => new URL(p.url()).origin === origin).map(p => ({ context: c, page: p })));
      if (matches.length !== 1) throw Error('Chrome中必须恰有一个目标环境测试页，请关闭重复测试标签');
      ({ context, page } = matches[0]);
    } else {
      const hasStorage = existsSync(credentials.storageStatePath);
      if (!hasStorage) reason = '缺少生产登录状态；先登录，或配置已登录Chrome的CDP端口';
      context = await browser.newContext({ storageState: hasStorage ? credentials.storageStatePath : undefined, viewport: { width: 1800, height: 1000 } });
      page = await context.newPage(); await page.goto(origin, { waitUntil: 'domcontentloaded' });
    }
    try {
      if (!reason) await page.locator('#workspace-prompt').waitFor({ timeout: 30_000 })
        .catch(() => { reason = '当前Chrome未进入已登录工作台；登录失效或页面前置未就绪，没有执行目标操作'; });
      await use({ page, context, ready: !reason, reason });
    } finally {
      // External Chrome and the user's login are deliberately left open.
      if (!endpoint) {
        // A refresh can rotate the login cookie. Persist the fresh session before a worker restarts.
        if (await page.locator('#workspace-prompt').isVisible().catch(() => false))
          await context.storageState({ path: credentials.storageStatePath });
        await browser.close();
      }
    }
  }, { scope: 'worker' }],
  nav: async ({ session }, use, info) => {
    const id = info.title.match(/ERYE210-(\d+)/)![1];
    const n = new Navigation210(session.page, path.join(root, id), origin);
    let outcome = 'Not Run', reason = '';
    try {
      if (session.ready) workspace ||= await n.createWorkspace();
      else info.annotations.push({ type: 'blocked', description: session.reason });
      await use(n);
      outcome = info.status === 'passed' ? 'Passed' : info.status === 'skipped'
        ? info.annotations.some(a => a.type === 'not-applicable') ? 'Not Applicable' : 'Blocked' : 'Failed';
      reason = info.annotations.filter(a => a.type === 'blocked').map(a => a.description).join('; ');
    } catch (error) {
      outcome = error instanceof Prerequisite210 ? 'Blocked' : 'Failed';
      reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
      throw error;
    } finally {
      const screenshot = await n.shot(`ERYE210-${id}-${info.status || 'interrupted'}`).catch(() => '');
      if (screenshot) await info.attach('页面结果', { path: screenshot, contentType: 'image/png' });
      const record = { id: `ERYE210-${id}`, status: outcome, reason, automated: true, workspaceId: workspace,
        annotations: info.annotations, projects: n.prepared, checks: n.checks,
        screenshot: screenshot ? path.relative(root, screenshot) : '', finishedAt: new Date().toISOString() };
      records.push(record); await n.record('result', record);
      await mkdir(root, { recursive: true });
      const summaryPath = path.join(root, 'execution-status.json');
      // Playwright starts a fresh worker after a failure. Merge the on-disk cases so that
      // finishing 010 cannot erase 007's result from the same serial batch.
      const previous = existsSync(summaryPath) ? JSON.parse(await readFile(summaryPath, 'utf8')) : { cases: [] };
      const combined = new Map<string, Json>([...previous.cases, ...records].map(c => [c.id, c]));
      const workspaceIds = [...new Set([...(previous.workspaceIds || [previous.workspaceId]), workspace].filter(Boolean))];
      await writeFile(summaryPath, JSON.stringify({ origin, workspaceIds,
        cases: [...combined.values()].sort((a, b) => a.id.localeCompare(b.id)) }, null, 2));
      n.dispose();
    }
  },
});

test.beforeEach(async ({ nav: _nav, session }) => {
  test.skip(!session.ready, session.reason);
});

function note(text: string) { test.info().annotations.push({ type: 'coverage', description: text }); }
async function prerequisite(action: () => Promise<void>) {
  try { await action(); }
  catch (error) {
    if (!(error instanceof Prerequisite210)) throw error;
    test.info().annotations.push({ type: 'blocked', description: error.message });
    test.skip(true, error.message);
  }
}
async function seed(n: Navigation210, kind = 'SEED'): Promise<Json> {
  const id = process.env[`CINLINK_ERYE210_${kind}_PROJECT_ID`];
  if (!id) throw new Prerequisite210(`未配置 CINLINK_ERYE210_${kind}_PROJECT_ID（当前账号、当前环境的只读素材基线）`);
  const p = await n.get(id);
  if (!p.content?.tracks?.some((t: Json) => t.type === 'video' && t.clips?.length))
    throw new Prerequisite210('基线没有可用源视频');
  return p;
}
async function video() {
  const file = process.env.CINLINK_ERYE210_SOURCE_VIDEO;
  if (!file || !existsSync(file)) throw new Prerequisite210('未配置真实20秒 E196-A.mp4：CINLINK_ERYE210_SOURCE_VIDEO');
  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  if (hash !== 'c453166c6396fe1c427c8a045ad2f84a8f5d4e4ff0f905b47d79114172829d15')
    throw new Prerequisite210('源视频与已登记A20金标不同，请先更新独立金标');
  return file;
}
async function fixture(n: Navigation210, id: string, kind = 'SEED') {
  const s = await seed(n, kind);
  if (kind === 'WATERMARK' && (!s.content.watermarks?.text || !s.content.watermarks?.image?.file_id))
    throw new Prerequisite210('水印基线须同时有合法文字和已上传图片水印');
  return n.copy(workspace, id, s);
}
async function observedProject(n: Navigation210) {
  await expect.poll(() => n.latestProjectId, { message: '等待页面实际加载的工程ID' }).not.toBe('');
  return n.get(n.latestProjectId);
}

test('ERYE210-001 五入口名称顺序与可达性 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '001'), before = await n.get(f.pid);
    await expect(n.nav().getByRole('button')).toHaveText(rails210);
    for (const name of [...rails210, '媒体']) {
      await n.choose(name); n.checks.push(await n.state()); await n.shot('001-' + name);
    }
    await n.unchanged(f.pid, before);
  });
});

if (!isSupersededLegacy210('ERYE210-002')) test('ERYE210-002 首次视频导入默认Media @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const file = await video(), c = await n.createConversation(workspace, '002');
    await n.enterConversation(c.cid); n.latestProjectId = ''; await n.open();
    const choose = n.page.getByRole('button', { name: '选择媒体', exact: true });
    await expect(choose).toBeVisible();
    const chooser = n.page.waitForEvent('filechooser'); await choose.click();
    await (await chooser).setFiles(file);
    await expect(n.page.getByRole('slider', { name: '预览播放进度', exact: true })).toBeVisible();
    const p = await observedProject(n);
    n.prepared['002'] = { cid: c.cid, pid: p.project_id, name: p.content.name };
    n.checks.push(await n.state()); await n.shot('002-first-import');
    // Assert before any manual navigation or refresh; a later recovery cannot overwrite this result.
    await expect(n.rail('媒体')).toHaveAttribute('aria-pressed', 'true');
    note('外部显式素材入口分支需真实独立入口；素材预览不代替工程导航。');
    await n.unchanged(p.project_id, p);
  });
});

test('ERYE210-003 真实字幕任务结果进入Captions @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const file = await video(), c = await n.createConversation(workspace, '003');
    await n.enterConversation(c.cid); await n.uploadToChat(file);
    const assistant = await n.agentPreparation('003', c.cid);
    n.latestProjectId = ''; await n.open();
    const before = await observedProject(n), f = { cid: c.cid, pid: before.project_id, name: before.content.name };
    n.prepared['003'] = f; n.checks.push(await n.state()); await n.shot('003-result-first-entry');
    await expect(n.rail('字幕')).toHaveAttribute('aria-pressed', 'true');
    const golden = await readFile(path.resolve('docs/cases/requirements/ERYE-210/evidence-001-005-prod-20261113/003-subtitle.srt'), 'utf8');
    const lines = golden.split(/\r?\n/).map(s => s.trim()).filter(s => s && !/^\d+$/.test(s) && !s.includes('-->'));
    const list = n.page.getByRole('list', { name: '字幕列表' });
    for (const line of lines) await expect(list).toContainText(line);
    const subtitles = before.content.tracks.filter((t: Json) => t.type === 'subtitle').flatMap((t: Json) => t.clips);
    expect(subtitles.length).toBeGreaterThan(0);
    // Actual generated result association is recorded, never inferred merely from "completed".
    const actualResults = JSON.stringify(assistant.result_files || assistant.artifacts || []);
    expect(subtitles.some((s: Json) => actualResults.includes(s.file_id)), '字幕必须绑定本次任务结果').toBe(true);
    for (const name of rails210) await n.choose(name);
    await n.choose('字幕'); await n.unchanged(f.pid, before);
  });
});

if (!isSupersededLegacy210('ERYE210-004')) test('ERYE210-004 新生成短旁白结果显式进入Voiceover @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const s = structuredClone(await seed(n, 'VOICE'));
    const translation = s.content.tracks.filter((t: Json) => t.type === 'subtitle').flatMap((t: Json) => t.clips)
      .find((c: Json) => c.role === 'translation' && c.language === 'zh');
    if (!translation || translation.bindings?.length !== 2) throw new Prerequisite210('配音准备基线必须含两句合法中文短旁白，不能使用任意长文');
    s.content.dubbing = []; s.content.tracks = s.content.tracks.filter((t: Json) => !(t.type === 'audio' && t.role === 'dubbing'));
    const f = await n.copy(workspace, '004', s);
    await n.choose('配音');
    await n.page.getByLabel('配音字幕来源', { exact: true }).selectOption(translation.file_id);
    await n.page.getByLabel('配音语言', { exact: true }).selectOption('zh');
    const panel = n.page.locator('.ed-voice-panel');
    await expect(panel).toContainText('欢迎使用 CinLink。'); await expect(panel).toContainText('这是导航测试。');
    const generate = panel.getByRole('button', { name: /^(创建配音|生成全部.*|Generate all 2 sentences)$/ });
    await expect(generate).toBeEnabled(); await generate.click(); // One generation, zero retries.
    await expect.poll(async () => {
      const p = await n.get(f.pid); return p.content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length;
    }, { timeout: 180_000 }).toBe(2);
    const before = await n.get(f.pid); await n.shot('004-real-voice-ready');
    await n.choose('媒体'); await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click(); await n.open(f.name);
    await expect(n.rail('媒体')).toHaveAttribute('aria-pressed', 'true');
    const entry = n.page.getByRole('button', { name: /^(编辑配音|编辑旁白|Edit voiceover|Open voiceover)$/ });
    n.checks.push({ state: await n.state(), directVoiceEntryCount: await entry.count() });
    await n.shot('004-voice-result-entry');
    // Timeline selection and a media preview are not claimed to be an explicit function entry.
    expect(await entry.count(), '合法配音结果需提供明确进入Voiceover的编辑入口').toBeGreaterThan(0);
    await entry.first().click(); await expect(n.rail('配音')).toHaveAttribute('aria-pressed', 'true');
    await expect(panel).toContainText('欢迎使用 CinLink。'); await n.unchanged(f.pid, before);
  });
});

if (!isSupersededLegacy210('ERYE210-005')) test('ERYE210-005 清理分析与审阅入口定位Scripts @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '005');
    await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click();
    await n.agentPreparation('005', f.cid);
    await n.open(f.name); const before = await n.get(f.pid);
    n.checks.push({ firstEntry: await n.state() }); await n.shot('005-first-review');
    await expect(n.rail('文稿')).toHaveAttribute('aria-pressed', 'true');
    await expect(n.page.locator('.ed-inspector')).toContainText('Efforts');
    await n.choose('媒体');
    const entry = n.page.getByRole('button', { name: '审阅剪辑', exact: true });
    await expect(entry).toBeVisible(); await entry.click();
    await expect(n.rail('文稿')).toHaveAttribute('aria-pressed', 'true', { timeout: 30_000 });
    n.checks.push({ reviewReentry: await n.state() }); await n.unchanged(f.pid, before);
    note('仅分析与审阅，保留等待人工确认状态；不点击移除、应用、确认生成。');
  });
});

test('ERYE210-006 水印两级入口与Text/Image子页 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '006', 'WATERMARK'), before = await n.get(f.pid);
    await n.choose('字幕');
    for (const child of ['文字水印', '图片水印', '文字水印', '图片水印'] as const) {
      await n.choose('水印'); await n.sub(child);
      if (child === '文字水印') await expect(n.page.locator('.ed-inspector textarea')).toHaveValue(before.content.watermarks.text.text);
      else { await expect(n.page.locator('.ed-watermark-panel textarea')).toHaveCount(0); await expect(n.page.locator('.ed-watermark-panel img:visible').first()).toBeVisible(); }
      n.checks.push({ child, state: await n.state() }); await n.shot('006-' + child);
    }
    await n.unchanged(f.pid, before);
    note('验证当前真实Watermark一级→Text/Image二级控件；不宣称存在独立结果卡快捷入口。');
  });
});

if (!isSupersededLegacy210('ERYE210-007')) test('ERYE210-007 普通关闭重开恢复Watermark/Image @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    note('旧voice迁移及清除两种记忆分支未覆盖：没有真实旧版状态，不伪造存储字段。');
    const f = await fixture(n, '007', 'WATERMARK'), before = await n.get(f.pid);
    await n.choose('水印'); await n.sub('图片水印'); await n.shot('007-before-image');
    n.checks.push({ beforeClose: await n.state(), imagePressed: 'true', revision: before.revision });
    await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click(); await n.open(f.name);
    await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    const reopenedImage = n.page.getByRole('button', { name: '图片水印', exact: true });
    await expect.soft(n.rail('水印')).toHaveAttribute('aria-pressed', 'true');
    if (await reopenedImage.count()) await expect.soft(reopenedImage).toHaveAttribute('aria-pressed', 'true');
    else expect.soft(await reopenedImage.count(), '重开后应有图片水印子页').toBeGreaterThan(0);
    n.checks.push({ reopen: await n.state(), imagePressed: await reopenedImage.count() ? await reopenedImage.getAttribute('aria-pressed') : null });
    await n.shot('007-reopen');
    await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.open(f.name);
    await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await expect.soft(n.rail('水印')).toHaveAttribute('aria-pressed', 'true');
    n.checks.push({ refreshed: await n.state() }); await n.shot('007-refreshed');
    const image = n.page.getByRole('button', { name: '图片水印', exact: true });
    expect.soft(await image.count() ? await image.getAttribute('aria-pressed') : null).toBe('true');
    const after = await n.unchanged(f.pid, before);
    n.checks.push({ stage: 'final', beforeRevision: before.revision, afterRevision: after.revision, savedContentUnchanged: true });
  });
});

test('ERYE210-008 功能面板收起展开及收起后切换模块 v2 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '008'), before = await n.get(f.pid);
    const panel = n.page.locator('.ed-inspector');
    await n.choose('字幕');
    const captions = n.page.getByRole('list', { name: '字幕列表', exact: true }).getByRole('listitem');
    await expect(captions).toHaveCount(8);
    await expect(captions.first()).toContainText('Efforts to sabotage our healthcare by filing a formal');
    await expect(captions.last()).toContainText('It affects');
    const captionRows = await captions.allTextContents();
    await n.shot('008-before-captions');
    await n.rail('字幕').click(); await expect(panel).toBeHidden();
    await n.rail('字幕').click(); await expect(panel).toBeVisible(); await n.expectPanel('字幕');
    await expect(captions).toHaveText(captionRows);
    await n.shot('008-captions-reopened');
    await n.rail('字幕').click(); await expect(panel).toBeHidden();
    await n.choose('水印'); await n.choose('字幕'); await expect(captions).toHaveText(captionRows);
    for (let i = 0; i < rails210.length; i++) {
      const name = rails210[i], next = rails210[(i + 1) % rails210.length];
      await n.choose(name);
      await n.rail(name).click(); await expect(panel).toBeHidden();
      await expect(n.nav().getByRole('button')).toHaveCount(5);
      await expect(n.page.locator('.ed-project-trigger .ed-project-name')).toHaveText(f.name);
      await expect(n.page.locator('[aria-label="工程实时预览"]')).toBeVisible();
      // A panel resize can remount the media element. Check the decoded frame before capturing it;
      // a visible but still-loading black video rectangle is not evidence of a stable preview.
      const preview = n.page.locator('[aria-label="工程实时预览"] video');
      await expect.poll(async () => preview.evaluateAll(es => es.length > 0 && es.every(e => {
        const v = e as HTMLVideoElement; return v.readyState >= 2 && v.videoWidth > 0 && !v.error;
      })), { message: '收起面板后原视频须恢复可解码画面' }).toBe(true);
      await n.page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      await n.shot('008-' + name + '-collapsed');
      await n.rail(name).click(); await expect(panel).toBeVisible(); await n.expectPanel(name);
      if (name === '字幕') await expect(captions).toHaveText(captionRows);
      await expect(n.rail(name)).toHaveAttribute('aria-pressed', 'true');
      await n.rail(name).click(); await expect(panel).toBeHidden();
      await n.choose(next); n.checks.push({ from: name, to: next, state: await n.state() }); await n.shot('008-' + name + '-to-' + next);
    }
    await n.choose('字幕'); await expect(captions).toHaveText(captionRows);
    const after = await n.unchanged(f.pid, before);
    n.checks.push({ stage: 'final', beforeRevision: before.revision, afterRevision: after.revision,
      savedContentUnchanged: JSON.stringify(before.content) === JSON.stringify(after.content), captionRows: await captions.allTextContents() });
  });
});

test('ERYE210-009 五入口及子页切换保持12秒C1与工程 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '009'), before = await n.get(f.pid);
    await n.choose('字幕');
    const c1 = n.page.getByRole('button', { name: /^原文字幕 Efforts to sabotage/ }).first();
    const box = await c1.boundingBox(); if (!box) throw new Prerequisite210('缺少可选择的独立C1金标');
    await c1.click({ position: { x: Math.min(box.width / 4, 8), y: box.height / 2 } });
    await n.page.getByRole('slider', { name: '预览播放进度', exact: true }).fill('12');
    const expected = await n.state(), credits = await n.credits(), messages = await n.messages(f.cid), writeStart = n.writes.length;
    const check = async (step: string) => {
      const s = await n.state(); n.checks.push({ step, ...s });
      expect(s.name).toBe(f.name); expect(Number(s.playhead)).toBe(12); expect(s.selected).toEqual(expected.selected);
      expect(s.selected).toHaveLength(1); expect(s.media.length).toBeGreaterThan(0); expect(s.media.every(m => m.paused)).toBe(true);
    };
    for (const name of [...rails210, '字幕']) {
      await n.choose(name); await check(name);
      if (name === '媒体') for (const sub of ['聊天', '工程']) {
        const b = n.page.locator('.ed-inspector').getByRole('button', { name: sub, exact: true });
        if (await b.getAttribute('aria-pressed') !== 'true') await b.click(); await check('Media/' + sub);
      }
      if (name === '字幕') {
        const style = n.page.getByRole('button', { name: '样式', exact: true });
        await style.click(); await check('Captions/Style');
        await style.locator('..').getByRole('button', { name: '字幕', exact: true }).click(); await check('Captions/Subtitles');
      }
      if (name === '水印') for (const sub of ['文字水印', '图片水印'] as const) { await n.sub(sub); await check('Watermark/' + sub); }
    }
    expect(n.writes.slice(writeStart)).toEqual([]);
    expect((await n.messages(f.cid)).messages?.length).toBe(messages.messages?.length);
    expect(await n.credits()).toBe(credits); await n.unchanged(f.pid, before);
    // Fresh balance is an additional check after the in-page playback/selection checks have finished.
    await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.open(f.name); expect(await n.credits()).toBe(credits);
    note('核验页面积分及任务未新增；未提交Agent写操作，不宣称Agent目标执行/服务端账本专项通过。');
  });
});

if (!isSupersededLegacy210('ERYE210-010')) test('ERYE210-010 同账号同设备双工程视图隔离与刷新恢复 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    note('仅U1/D1双工程分支；U2账号及D2独立设备无环境，未执行，不以第二标签替代第二设备。');
    const s = await seed(n), a = await n.copy(workspace, '010-PA', s), beforeA = await n.get(a.pid);
    await n.choose('字幕'); await n.shot('010-PA-captions');
    const b = await n.copy(workspace, '010-PB', s, a.cid), beforeB = await n.get(b.pid);
    await n.choose('媒体'); await n.shot('010-PB-media');
    await n.selectProject(a.name); await expect(n.rail('字幕')).toHaveAttribute('aria-pressed', 'true');
    n.checks.push({ projectSwitch: 'PA', state: await n.state() }); await n.shot('010-PA-restored');
    await n.selectProject(b.name); await expect(n.rail('媒体')).toHaveAttribute('aria-pressed', 'true');
    n.checks.push({ projectSwitch: 'PB', state: await n.state() }); await n.shot('010-PB-restored');
    n.checks.push({ beforeRefresh: await n.state() });
    await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.open(b.name);
    await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await expect.soft(n.rail('媒体'), 'PB刷新后仍应恢复Media').toHaveAttribute('aria-pressed', 'true');
    n.checks.push({ afterRefresh: await n.state() }); await n.shot('010-PB-after-refresh');
    const afterA = await n.unchanged(a.pid, beforeA), afterB = await n.unchanged(b.pid, beforeB);
    n.checks.push({ stage: 'final', projectA: { beforeRevision: beforeA.revision, afterRevision: afterA.revision, savedContentUnchanged: true },
      projectB: { beforeRevision: beforeB.revision, afterRevision: afterB.revision, savedContentUnchanged: true } });
  });
});

// ERYE210-011 v3 is registered in erye210-completion.spec.ts using the checkpointed Agent flow.

test('ERYE210-012 无字幕配音的空态引导不自动生成 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const s = structuredClone(await seed(n));
    s.content.tracks = s.content.tracks.filter((t: Json) => t.type !== 'subtitle' && !(t.type === 'audio' && t.role === 'dubbing'));
    s.content.dubbing = []; delete s.content.cleanup_analysis;
    s.content.watermarks = { text: null, image: null, timing: { mode: 'whole_project', start_sec: 0, end_sec: null } };
    const f = await n.copy(workspace, '012', s), before = await n.get(f.pid);
    const messages = await n.messages(f.cid), writeStart = n.writes.length;
    await n.choose('字幕'); await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await expect(n.page.getByRole('button', { name: '生成字幕', exact: true })).toBeVisible();
    await expect(n.page.getByRole('button', { name: '生成字幕', exact: true })).toBeEnabled();
    await expect(n.page.getByRole('list', { name: '字幕列表', exact: true }).getByRole('listitem')).toHaveCount(0);
    n.checks.push({ module: 'Captions', text: await n.page.locator('.ed-inspector').innerText(), state: await n.state() });
    await n.shot('012-captions-empty');
    await n.choose('配音'); await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await expect(n.page.locator('.ed-voice-panel')).toContainText('暂无配音');
    await expect(n.page.getByRole('button', { name: '创建配音', exact: true })).toBeEnabled();
    n.checks.push({ module: 'Voiceover', text: await n.page.locator('.ed-inspector').innerText(), state: await n.state() });
    await n.shot('012-voiceover-empty');
    const after = await n.unchanged(f.pid, before), afterMessages = await n.messages(f.cid);
    expect(after.content.dubbing).toEqual([]);
    expect(afterMessages.messages?.length).toBe(messages.messages?.length);
    expect(n.writes.slice(writeStart)).toEqual([]);
    n.checks.push({ stage: 'final', beforeRevision: before.revision, afterRevision: after.revision,
      savedContentUnchanged: true, messagesBefore: messages.messages?.length, messagesAfter: afterMessages.messages?.length,
      writesDuringNavigation: n.writes.slice(writeStart) });
  });
});

if (!isSupersededLegacy210('ERYE210-013')) test('ERYE210-013 纯音频工程水印写操作受限 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const s = structuredClone(await seed(n, 'VOICE'));
    const track = structuredClone(s.content.tracks.find((t: Json) => t.type === 'audio' && t.role === 'dubbing'));
    if (!track?.clips?.length) throw new Prerequisite210('没有已核实的真实纯音频素材');
    track.role = 'source'; track.clips = [track.clips[0]]; track.clips[0].timeline_start_sec = 0;
    track.linked_video_track_id = null;
    s.content.tracks = [track]; s.content.dubbing = []; delete s.content.cleanup_analysis;
    s.content.watermarks = { text: null, image: null, timing: { mode: 'whole_project', start_sec: 0, end_sec: null } };
    const f = await n.copy(workspace, '013', s), before = await n.get(f.pid);
    expect(before.content.tracks.every((t: Json) => t.type === 'audio')).toBe(true);
    for (const module of rails210) { await n.choose(module); n.checks.push({ module, state: await n.state() }); }
    await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await n.sub('文字水印');
    const text = n.page.locator('.ed-watermark-panel textarea');
    const textEnabled = await text.isEnabled();
    n.checks.push({ mode: 'text', enabled: textEnabled, explanation: await n.page.locator('.ed-inspector').innerText() });
    await n.shot('013-audio-text-watermark');
    expect.soft(textEnabled, '无画面工程的文字水印写入控件应禁用').toBe(false);
    if (textEnabled) {
      await text.fill('AUDIO_ONLY_013'); await text.blur();
      const response = await n.get(f.pid);
      n.checks.push({ attemptedText: 'AUDIO_ONLY_013', storedWatermarks: response.content.watermarks,
        revision: response.revision, alerts: await n.page.getByRole('alert').allTextContents() });
      await n.shot('013-text-write-result');
    }
    await n.sub('图片水印');
    const image = n.page.getByRole('button', { name: /^(水印图片选择与预览|选择并预览水印图片)$/ });
    const imageEnabled = await image.isEnabled();
    n.checks.push({ mode: 'image', enabled: imageEnabled, explanation: await n.page.locator('.ed-inspector').innerText() });
    await n.shot('013-audio-image-watermark');
    expect.soft(imageEnabled, '无画面工程的图片水印写入入口应禁用').toBe(false);
    const explanation = n.page.locator('.ed-inspector').getByText(/无.*画面|仅音频|纯音频|不支持.*水印|audio.only|no video/i);
    expect.soft(await explanation.count(), '应说明纯音频没有画面，不能添加水印').toBeGreaterThan(0);
    const after = await n.get(f.pid);
    expect.soft(after.content.watermarks.text, '纯音频工程不应保存文字水印').toBeNull();
    expect.soft(after.content.watermarks.image).toBeNull();
    n.checks.push({ stage: 'final', beforeRevision: before.revision, afterRevision: after.revision,
      watermarks: after.content.watermarks, audioClips: after.content.tracks.filter((t: Json) => t.type === 'audio').flatMap((t: Json) => t.clips),
      alerts: await n.page.getByRole('alert').allTextContents() });
  });
});

if (!isSupersededLegacy210('ERYE210-014')) test('ERYE210-014 真实只读授权工程的浏览与写入限制 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const missing = '缺少真实只读授权工程及独立只读身份；此前用户确认没有第二账号环境。未伪造只读标记，未执行写入拒绝验证。';
    await n.record('014-prerequisites', { readonlyIdentityAvailable: false, genuineReadonlyProjectAvailable: false,
      productStepsExecuted: false, reason: missing });
    throw new Prerequisite210(missing);
  });
});

if (!isSupersededLegacy210('ERYE210-015')) test('ERYE210-015 Scripts页缺选区与选择片段后的剪辑操作 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const f = await fixture(n, '015'), before = await n.get(f.pid);
    await n.choose('文稿'); await expect(n.page.locator('.ed-inspector')).toBeEnabled();
    await n.page.getByRole('slider', { name: '预览播放进度', exact: true }).fill('12');
    await expect(n.page.locator('.ed-timeline-clip.is-selected')).toHaveCount(0);
    const split = n.page.getByRole('button', { name: '分割所选片段', exact: true });
    await expect(split).toBeDisabled(); await split.hover();
    const tooltip = await n.page.getByRole('tooltip').allTextContents();
    const title = await split.getAttribute('title');
    const explanation = [...tooltip, title || '', ...await n.page.getByText(/请先选择.*片段|先选.*片段|select a clip/i).allTextContents()];
    n.checks.push({ stage: 'no-selection', disabled: true, title, tooltip, explanation, state: await n.state() });
    await n.shot('015-no-selection');
    expect.soft(explanation.some(t => /请先选择.*片段|先选.*片段|select a clip/i.test(t)), '缺选区应明确提示先选择片段').toBe(true);
    await n.unchanged(f.pid, before);
    const clip = n.page.getByRole('button', { name: /^视频 视频 00:00\.00/ }).first();
    const box = await clip.boundingBox(); if (!box) throw new Prerequisite210('原视频片段不可见，未执行分割');
    await clip.click({ position: { x: Math.min(15, box.width / 4), y: box.height / 2 } });
    await n.page.getByRole('slider', { name: '预览播放进度', exact: true }).fill('12');
    await expect(split).toBeEnabled();
    n.checks.push({ stage: 'selected', enabled: true, state: await n.state() }); await n.shot('015-selected');
    await split.click();
    const videos = (p: Json) => p.content.tracks.filter((t: Json) => t.type === 'video').flatMap((t: Json) => t.clips);
    await expect.poll(async () => videos(await n.get(f.pid)).length).toBe(2);
    const after = await n.get(f.pid);
    const parts = videos(after).sort((a: Json, b: Json) => a.timeline_start_sec - b.timeline_start_sec);
    expect(parts.map((p: Json) => [p.source_in_sec, p.source_out_sec, p.timeline_start_sec])).toEqual([[0, 12, 0], [12, 20, 12]]);
    expect(parts.every((p: Json) => p.file_id === videos(before)[0].file_id)).toBe(true);
    n.checks.push({ stage: 'split-completed', beforeRevision: before.revision, afterRevision: after.revision,
      parts: parts.map((p: Json) => ({ fileId: p.file_id, sourceIn: p.source_in_sec, sourceOut: p.source_out_sec, timelineStart: p.timeline_start_sec })) });
    await n.shot('015-split-completed');
    await n.page.getByRole('button', { name: '撤销', exact: true }).click();
    await expect.poll(async () => videos(await n.get(f.pid)).length).toBe(1);
    const restored = await n.get(f.pid); expect(restored.content).toEqual(before.content);
    n.checks.push({ stage: 'final', restoredRevision: restored.revision, originalContentRestored: true });
    note('使用Scripts页仍可见的实际时间线分割控件；不声称逐字稿选区清理功能已验证。');
  });
});

async function readyVoice(n: Navigation210, id: string) {
  const source = structuredClone(await seed(n, 'VOICE'));
  // Retain the real old audio, but let this new project prepare its own editable script.
  // Carrying another project's script materialization can leave preparation writes in Undo.
  delete source.content.voiceover_sources;
  const f = await n.copy(workspace, id, source);
  await n.choose('配音');
  const first = n.page.getByRole('textbox', { name: '第 1 句配音文案', exact: true });
  await expect(first).toHaveValue('欢迎使用 CinLink。', { timeout: 60_000 });
  await expect(n.page.getByRole('textbox', { name: '第 2 句配音文案', exact: true })).toHaveValue('这是导航测试。');
  // Opening a copied legacy voice fixture can materialize its own saved script sources.
  // Take the baseline after that visible preparation has settled, never use its initial empty frame.
  await expect.poll(async () => {
    const saved = await n.get(f.pid);
    return saved.content.voiceover_sources?.some((s: Json) => s.role === 'translation' && String(s.track_id).includes(f.pid));
  }, { timeout: 60_000, message: '等待本工程自己的可编辑配音稿准备并保存，排除基线准备写入干扰撤销' }).toBe(true);
  await n.page.reload({ waitUntil: 'domcontentloaded' });
  await n.page.locator('#workspace-prompt').waitFor(); await n.open(f.name); await n.choose('配音');
  await expect(first).toHaveValue('欢迎使用 CinLink。'); await expect(first).toBeEnabled();
  const before = await n.get(f.pid);
  if (before.content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length !== 2)
    throw new Prerequisite210('本例须两句已保存文稿及旧音频ready，当前基线不满足');
  return { f, before, first };
}

test('ERYE210-016 Windows Chrome图片水印控件限制及上传后恢复 v2 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const png = path.resolve('assets/cinlink-smoke-watermark.png');
    if (!existsSync(png)) throw new Prerequisite210('缺少仓库图片水印测试素材 assets/cinlink-smoke-watermark.png');
    expect(createHash('sha256').update(await readFile(png)).digest('hex'), '使用已登记的512×512四色PNG').toBe(
      '5141c012c8e14c1c5a67cfc50842d7bf037842ff8437adc9ba4c110c2e3f26b5');
    const source = structuredClone(await seed(n));
    source.content.watermarks = { text: null, image: null, timing: { mode: 'whole_project', start_sec: 0, end_sec: null } };
    const f = await n.copy(workspace, '016', source), before = await n.get(f.pid);
    await n.choose('水印'); await n.sub('图片水印');
    const panel = n.page.locator('.ed-watermark-panel');
    const upload = panel.getByRole('button', { name: /^(水印图片选择与预览|选择并预览水印图片)$/ });
    const width = panel.getByRole('slider', { name: '图片宽度', exact: true });
    const opacity = panel.getByRole('slider', { name: '水印不透明度', exact: true });
    await expect(upload).toBeVisible(); await expect(upload).toBeEnabled();
    await expect(width, '未选择图片时尺寸不可写').toBeDisabled();
    await expect(opacity, '未选择图片时不透明度不可写').toBeDisabled();
    await expect(panel).toContainText(/上传图片|Upload image/i);
    await n.unchanged(f.pid, before);
    n.checks.push({ stage: 'no-image', uploadEnabled: true, widthDisabled: true, opacityDisabled: true,
      instruction: await panel.innerText(), revision: before.revision }); await n.shot('016-v2-before-upload');
    const chooser = n.page.waitForEvent('filechooser');
    await upload.click(); await (await chooser).setFiles(png);
    await expect.poll(async () => Boolean((await n.get(f.pid)).content.watermarks.image?.file_id),
      { message: '等待真实PNG上传及图片水印保存', timeout: 60_000 }).toBe(true);
    const image = panel.getByRole('img', { name: '图片水印预览', exact: true });
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate(e => (e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth > 0)).toBe(true);
    await expect(width).toBeEnabled(); await expect(opacity).toBeEnabled();
    // Native range inputs are adjusted through pointer/keyboard, not a text fill.
    for (const [control, value] of [[width, 120], [opacity, .6]] as const) {
      const bounds = await control.evaluate(e => ({ min: Number((e as HTMLInputElement).min), max: Number((e as HTMLInputElement).max), step: Number((e as HTMLInputElement).step || 1) }));
      const box = await control.boundingBox(); if (!box) throw new Prerequisite210('水印滑块不可见，未通过接口写入目标值');
      await n.page.mouse.click(box.x + 8 + (box.width - 16) * (value - bounds.min) / (bounds.max - bounds.min), box.y + box.height / 2);
      const steps = Math.round((value - Number(await control.inputValue())) / bounds.step);
      if (Math.abs(steps) > 10) throw new Prerequisite210('水印滑块指针定位偏差过大，保留现场核对，不循环盲调');
      for (let i = 0; i < Math.abs(steps); i++) await control.press(steps > 0 ? 'ArrowRight' : 'ArrowLeft');
      await control.blur();
    }
    await expect.poll(async () => {
      const mark = (await n.get(f.pid)).content.watermarks.image;
      return { width: mark?.width, opacity: mark?.opacity };
    }).toEqual({ width: 120, opacity: 0.6 });
    const edited = await n.get(f.pid);
    const media = (p: Json) => p.content.tracks.filter((t: Json) => ['video', 'audio', 'subtitle'].includes(t.type));
    expect(media(edited), '图片水印操作不修改原视频、原声及字幕').toEqual(media(before));
    n.checks.push({ stage: 'image-editable', image: edited.content.watermarks.image, revision: edited.revision });
    await n.shot('016-v2-after-upload');
    await n.choose('字幕'); await n.choose('水印'); await n.sub('图片水印');
    await expect(width).toHaveValue('120'); await expect(opacity).toHaveValue('0.6');
    await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click();
    await n.open(f.name); await n.choose('水印'); await n.sub('图片水印');
    await expect(image).toBeVisible(); await expect(width).toBeEnabled(); await expect(opacity).toBeEnabled();
    await expect(width).toHaveValue('120'); await expect(opacity).toHaveValue('0.6');
    await n.unchanged(f.pid, edited);
    n.checks.push({ stage: 'reopened', projectId: f.pid, image: edited.content.watermarks.image,
      mediaUnchanged: true, navigationContentUnchanged: true }); await n.shot('016-v2-reopened');
    note('v2只验证Windows Chrome中图片素材前置缺失→补齐后控件恢复，不依赖mac或未发布样本；不将该场景当作未发布/端侧不支持对照已通过。');
  });
});

// 017 v2 is registered in erye210-completion.spec.ts.

if (!isSupersededLegacy210('ERYE210-018')) test('ERYE210-018 真实配音处理中独立修改与最终结果 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const s = structuredClone(await seed(n, 'VOICE'));
    s.content.dubbing = []; delete s.content.voiceover_sources;
    s.content.tracks = s.content.tracks.filter((t: Json) => !(t.type === 'audio' && t.role === 'dubbing'));
    s.content.watermarks = { text: null, image: null, timing: { mode: 'whole_project', start_sec: 0, end_sec: null } };
    const f = await n.copy(workspace, '018', s); await n.choose('配音');
    const before = await n.get(f.pid);
    const submissions: Json[] = [];
    const listener = (r: import('@playwright/test').Request) => {
      if (r.method() !== 'POST' || !new URL(r.url()).pathname.includes('/cloud-tool-api/mcp')) return;
      let body: Json = {}; try { body = r.postDataJSON() || {}; } catch {}
      if (body.method === 'editor.task.submit' && /dubbing.generate/.test(JSON.stringify(body)))
        submissions.push({ at: Date.now(), method: body.method, targetPA: JSON.stringify(body).includes(f.pid) });
    };
    n.page.on('request', listener);
    try {
      await n.page.getByRole('button', { name: '创建配音', exact: true }).click();
      await expect.poll(() => submissions.length).toBeGreaterThan(0);
      const pending = await n.get(f.pid);
      const readyAtInspection = (pending.content.dubbing || []).filter((d: Json) => d.audio_state === 'ready').length;
      n.checks.push({ stage: 'task-started', at: Date.now(), submissions, readyAtInspection,
        panelText: await n.page.locator('.ed-inspector').innerText(),
        controls: await n.page.locator('.ed-inspector button,.ed-inspector textarea').evaluateAll(es => es.map(e => ({ label: e.getAttribute('aria-label'), text: e.textContent, disabled: (e as HTMLButtonElement).disabled }))) });
      await n.shot('018-during-generation');
      if (readyAtInspection === 2) throw new Prerequisite210('配音在独立修改前已完成，处理中场景没有建立；保留真实任务，不重复生成');
      await n.choose('水印'); await n.sub('文字水印');
      const input = n.page.locator('.ed-watermark-panel textarea');
      const enabled = await input.isEnabled();
      if (enabled) {
        await input.fill('INDEPENDENT_018'); await input.blur();
        await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text?.text).toBe('INDEPENDENT_018');
      }
      const independent = await n.get(f.pid);
      n.checks.push({ stage: 'independent-edit', at: Date.now(), enabled,
        watermark: independent.content.watermarks.text, revision: independent.revision,
        readyCount: (independent.content.dubbing || []).filter((d: Json) => d.audio_state === 'ready').length });
      await n.shot('018-independent-edit');
      for (const name of rails210) await n.choose(name);
      const deadline = Date.now() + 180_000;
      let taskErrors: string[] = [];
      while (Date.now() < deadline) {
        const current = await n.get(f.pid);
        taskErrors = await n.page.locator('.ed-voice-panel [role="alert"]').allTextContents();
        if (taskErrors.length || current.content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length === 2) break;
        await n.page.waitForTimeout(1500);
      }
      const after = await n.get(f.pid);
      if (enabled) expect(after.content.watermarks.text?.text, '任务完成不得覆盖独立水印修改').toBe('INDEPENDENT_018');
      n.checks.push({ stage: 'task-final-state', at: Date.now(), revision: after.revision,
        taskErrors, dubbing: after.content.dubbing, watermark: after.content.watermarks.text });
      if (taskErrors.length) { await n.choose('配音'); await n.shot('018-task-error'); }
      expect(taskErrors, '原配音任务应形成可应用结果；保留原任务错误，不自动重发').toEqual([]);
      expect(after.content.dubbing?.filter((d: Json) => d.audio_state === 'ready' && d.audio_file_id).length,
        '原配音任务须完成两句真实音频，不能仅以独立编辑成功判整例通过').toBe(2);
      expect(after.content.dubbing.map((d: Json) => d.translation_text)).toEqual(['欢迎使用 CinLink。', '这是导航测试。']);
      n.checks.push({ stage: 'completed', at: Date.now(), submissions, revision: after.revision,
        dubbing: after.content.dubbing, watermark: after.content.watermarks.text, state: await n.state() });
      await n.shot('018-completed');
      note('C1为真实配音生成，C2为独立文字水印；未模拟后台完成。只按已显示可用/禁用及真实保存结果核验，不宣称内部对象锁已验证。');
      throw new Prerequisite210('真实生成与独立水印修改/导航结果已记录；页面未提供可明确指定的“处理中受限对象操作”说明或入口，该分支未覆盖，整例不以局部观察记Passed');
    } finally { n.page.off('request', listener); }
  });
});

// 019 v3 is registered in erye210-completion.spec.ts.

if (!isSupersededLegacy210('ERYE210-020')) test('ERYE210-020 配音文案切页保存重开及撤销 @ERYE-210', async ({ nav: n }) => {
  await prerequisite(async () => {
    const { f, before, first } = await readyVoice(n, '020');
    const original = await first.inputValue(), changed = '新稿未提交';
    const tasks: Json[] = [];
    const listener = (r: import('@playwright/test').Request) => {
      let body: Json = {}; try { body = r.postDataJSON() || {}; } catch {}
      if (r.method() === 'POST' && body.method === 'editor.task.submit') tasks.push({ method: body.method, at: Date.now() });
    };
    n.page.on('request', listener);
    try {
      await first.fill(changed);
      const focused = await n.get(f.pid);
      n.checks.push({ stage: 'typed-before-blur', value: await first.inputValue(), revision: focused.revision });
      await n.shot('020-typed');
      await n.choose('字幕'); await n.choose('配音');
      await expect(first).toHaveValue(changed);
      // Current page saves text on leaving the field; Ctrl+Enter explicitly ends editing.
      await first.focus(); await first.press('Control+Enter'); await first.blur();
      const saved = await n.get(f.pid);
      n.checks.push({ stage: 'returned-and-committed', value: await first.inputValue(), revision: saved.revision,
        dubbing: saved.content.dubbing, taskSubmissions: tasks }); await n.shot('020-after-switch');
      await n.page.getByRole('button', { name: '收起编辑区', exact: true }).click(); await n.open(f.name); await n.choose('配音');
      await expect(first).toHaveValue(changed); await n.shot('020-reopened');
      await n.page.getByRole('button', { name: '撤销', exact: true }).click();
      await n.record('020-after-undo-observation', { state: await n.state(),
        value: await first.inputValue(), project: await n.get(f.pid), taskSubmissions: tasks });
      await expect(first).toHaveValue(original);
      await expect.poll(async () => JSON.stringify((await n.get(f.pid)).content)).toBe(JSON.stringify(before.content));
      const restored = await n.get(f.pid);
      expect(tasks, '改文案及切页不得自动提交配音生成').toEqual([]);
      n.checks.push({ stage: 'undo-restored', value: await first.inputValue(), revision: restored.revision,
        fullContentRestored: true, taskSubmissions: tasks, beforeDubbing: before.content.dubbing, afterDubbing: restored.content.dubbing });
      await n.shot('020-undo-restored');
      note('当前页面采用离开文本框保存，无独立保存按钮；允许按实际保存方式验收，不以缺少独立保存按钮判失败。未发送Agent指令或生成音频。');
    } finally { n.page.off('request', listener); }
  });
});
