import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { test as base, chromium, expect, type BrowserContext, type Page } from '@playwright/test';
import { credentials } from '../../src/config.js';
import { Navigation210, Prerequisite210 } from './erye210.js';
type Json = Record<string, any>;
const origin = process.env.CINLINK_ERYE210_ORIGIN || 'https://app.cinlink.ai';
const root = path.resolve('reports/editor-210', process.env.CINLINK_ERYE210_BATCH || 'local');
let workspace = '';
export const workspace210 = () => workspace;
export const test210 = base.extend<{ nav210: Navigation210 }, { chrome210: { page: Page; context: BrowserContext; ready: boolean; reason: string } }>({
  chrome210: [async ({}, use) => {
    const endpoint = process.env.CINLINK_ERYE210_CDP_ENDPOINT;
    if (endpoint && !/^http:\/\/(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(endpoint)) throw Error('仅允许本机Chrome调试端口');
    const browser = endpoint ? await chromium.connectOverCDP(endpoint) : await chromium.launch({ channel: 'chrome', headless: false });
    let page: Page, context: BrowserContext;
    if (endpoint) {
      const matches = browser.contexts().flatMap(c => c.pages().filter(p => p.url().startsWith(origin + '/')).map(p => ({ page: p, context: c })));
      if (matches.length !== 1) throw Error('须恰有一个目标环境Chrome标签，不能任意选择用户页面');
      ({ page, context } = matches[0]);
    } else {
      context = await browser.newContext({ storageState: existsSync(credentials.storageStatePath) ? credentials.storageStatePath : undefined, viewport: { width: 1800, height: 1000 } });
      page = await context.newPage(); await page.goto(origin, { waitUntil: 'domcontentloaded' });
    }
    let reason = '';
    await page.locator('#workspace-prompt').waitFor({ timeout: 30_000 }).catch(() => { reason = 'Chrome未处于已登录生产工作台，需恢复登录；未执行目标操作'; });
    try { await use({ page, context, ready: !reason, reason }); }
    finally {
      if (await page.locator('#workspace-prompt').isVisible().catch(() => false)) await context.storageState({ path: credentials.storageStatePath });
      if (!endpoint) await browser.close();
    }
  }, { scope: 'worker' }],
  nav210: async ({ chrome210: c }, use, info) => {
    const id = info.title.match(/ERYE210-(\d+)/)![1];
    const n = new Navigation210(c.page, path.join(root, id), origin);
    if (c.ready && !workspace) {
      const directFile = process.env[`CINLINK_ERYE210_DIRECT_FIXTURE_${id}`];
      const direct = directFile ? JSON.parse(await readFile(directFile, 'utf8')) : null;
      const resume = id === '011' && process.env.CINLINK_ERYE210_011_RESUME_DIR;
      const checkpoint = resume ? JSON.parse(await readFile(path.join(resume, '011-agent-checkpoint.json'), 'utf8')) : null;
      const continued = /^04[5-9]$/.test(id) ? process.env.CINLINK_ERYE210_FIVE_RESUME_DIR
        : id === '017' ? process.env.CINLINK_ERYE210_017_VERIFY_DIR
        : id === '052' ? process.env.CINLINK_ERYE210_052_RESUME_DIR
          : id === '054' ? process.env.CINLINK_ERYE210_054_RESUME_DIR : undefined;
      const previous = continued && existsSync(path.join(continued, 'result.json'))
        ? JSON.parse(await readFile(path.join(continued, 'result.json'), 'utf8')) : null;
      workspace = direct?.workspaceId || checkpoint?.userProvidedWorkspace || previous?.workspaceId || await n.createWorkspace();
    }
    try { await use(n); }
    finally {
      const status = info.errors.length ? 'Failed' : info.status === 'passed' ? 'Passed' : info.status === 'skipped' ? 'Blocked' : 'Failed';
      const reason = info.annotations.filter(a => a.type === 'blocked').map(a => a.description).join('; ')
        || info.errors[0]?.message?.replace(/\u001b\[[0-9;]*m/g, '').slice(0, 1200) || '';
      // A prerequisite-only entry has no target page. Never archive another case's page as its screenshot.
      const shot = Object.keys(n.prepared).length ? await n.shot(`ERYE210-${id}-${status.toLowerCase()}`).catch(() => '') : '';
      if (shot) await info.attach('页面结果', { path: shot, contentType: 'image/png' });
      const record = { id: `ERYE210-${id}`, status, reason, automated: true, workspaceId: workspace,
        caseVersion: info.annotations.find(a => a.type === 'case-version')?.description || (info.title.includes(' v2 ') ? 'v2-current-features-20261113' : 'original'),
        annotations: info.annotations, projects: n.prepared, checks: n.checks, screenshot: shot ? path.relative(root, shot) : '', finishedAt: new Date().toISOString() };
      await n.record('result', record); await mkdir(root, { recursive: true });
      const file = path.join(root, 'execution-status.json');
      const old = existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : { cases: [] };
      const cases = new Map<string, Json>(old.cases.map((r: Json) => [r.id, r])); cases.set(record.id, record);
      await writeFile(file, JSON.stringify({ origin, cases: [...cases.values()].sort((a, b) => a.id.localeCompare(b.id)) }, null, 2)); n.dispose();
    }
  },
});
test210.beforeEach(async ({ chrome210 }) => { test210.skip(!chrome210.ready, chrome210.reason); });
export async function guarded210(action: () => Promise<void>) {
  try { await action(); } catch (e) {
    if (!(e instanceof Prerequisite210)) throw e;
    test210.info().annotations.push({ type: 'blocked', description: e.message }); test210.skip(true, e.message);
  }
}
export function block210(reason: string): never { throw new Prerequisite210(reason); }
export function coverage210(text: string) { test210.info().annotations.push({ type: 'coverage', description: text }); }
export async function seed210(n: Navigation210, kind = 'SEED'): Promise<Json> {
  const pid = process.env[`CINLINK_ERYE210_${kind}_PROJECT_ID`];
  if (!pid) block210(`未配置当前账号/当前环境真实${kind}基线`);
  return n.get(pid);
}
export async function fixture210(n: Navigation210, id: string, kind = 'SEED') { return n.copy(workspace, id, await seed210(n, kind)); }
export const c1English210 = 'Efforts to sabotage our healthcare by filing a formal';
export async function editCaption210(n: Navigation210, text: string) {
  await n.choose('字幕');
  await n.page.locator('.ed-inspector').getByRole('button', { name: text, exact: true }).click();
  const input = n.page.getByRole('textbox', { name: '字幕文本', exact: true }); await expect(input).toBeVisible(); return input;
}
export async function reopen210(n: Navigation210, f: Json, module: string) {
  await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.page.locator('#workspace-prompt').waitFor();
  await n.open(f.name); await n.choose(module);
}
