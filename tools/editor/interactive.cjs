// Persistent headed test window for user-prepared editor projects.
// Commands arrive only on this process's stdin; it does not expose a network API.
const { chromium } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline');

(async () => {
  const base = process.env.CINLINK_BASE_URL || 'https://app.cinlink.ai';
  if (new URL(base).hostname !== 'app.cinlink.ai') throw Error('This interactive window is restricted to the requested production host');
  const statePath = process.env.CINLINK_TEST_STORAGE_STATE || path.resolve('.auth/storage-state-prod-editor.json');
  const report = path.resolve('reports/editor-196', process.env.CINLINK_EDITOR_BATCH || '20261106-prod-user-project');
  await fs.mkdir(report, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: false, args: ['--start-maximized'] });
  const context = await browser.newContext({ storageState: statePath, viewport: null });
  context.setDefaultTimeout(15_000);
  const page = await context.newPage();
  const observed = { projects: new Map(), latestProjectId: '', submissions: [] };
  page.on('response', async response => {
    try {
      const url = new URL(response.url());
      if (url.origin !== new URL(base).origin) return;
      if (/\/cloud-tool-api\/v1\/editor\/projects\/[a-f0-9-]+$/.test(url.pathname) && response.request().method() === 'GET' && response.ok()) {
        const body = await response.json();
        observed.projects.set(body.project_id, body);
        observed.latestProjectId = body.project_id;
      }
      if (/\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(url.pathname) && response.request().method() === 'POST') {
        const body = await response.json();
        observed.submissions.push({ path: url.pathname, status: response.status(), body });
      }
    } catch { /* Incomplete network responses are not edited or replayed. */ }
  });
  const saveState = async () => {
    if (!page.isClosed() && !page.url().includes('/login') && await page.locator('#workspace-prompt').count())
      await context.storageState({ path: statePath });
  };
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('#workspace-prompt').waitFor({ state: 'attached', timeout: 45_000 }).catch(() => {});
  await page.bringToFront();
  await saveState();
  const cdp = await browser.newBrowserCDPSession();
  const processes = await cdp.send('SystemInfo.getProcessInfo');
  const browserPID = processes.processInfo.find(p => p.type === 'browser')?.id;
  await cdp.detach();
  await fs.writeFile(path.resolve('.auth/editor-user-window.json'), JSON.stringify({ browserPID, report, base, openedAt: new Date().toISOString() }));
  await page.screenshot({ path: path.join(report, 'window-opened.png') });
  console.log(JSON.stringify({ event: 'ready', ready: !!(await page.locator('#workspace-prompt').count()), url: page.url().split('?')[0], persistent: true, browserPID }));
  const heartbeat = setInterval(() => saveState().catch(() => {}), 20_000);
  const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of input) {
    if (!line.trim()) continue;
    let command;
    try {
      command = JSON.parse(line);
      if (command.action === 'close') {
        clearInterval(heartbeat); await saveState(); await browser.close();
        console.log(JSON.stringify({ id: command.id, closed: true })); break;
      }
      if (command.action === 'inspect') {
        const name = await page.locator('.ed-project-name').first().innerText().catch(() => null);
        const url = new URL(page.url());
        const project = observed.projects.get(observed.latestProjectId);
        const info = { url: url.origin + url.pathname, editorName: name, projectId: observed.latestProjectId,
          project: project && project.content?.name === name ? project : null };
        await fs.writeFile(path.join(report, 'current-project.json'), JSON.stringify(info, null, 2));
        console.log(JSON.stringify({ id: command.id, url: info.url, editorName: name, projectId: info.project ? info.projectId : null }));
      } else if (command.action === 'run') {
        const run = new Function('page', 'context', 'browser', 'fs', 'path', 'report', 'observed', `return (async()=>{${command.code}})()`);
        const value = await run(page, context, browser, fs, path, report, observed);
        await saveState();
        console.log(JSON.stringify({ id: command.id, result: value }));
      } else throw Error('Unknown command');
    } catch (error) {
      console.log(JSON.stringify({ id: command?.id, error: String(error).split('\n')[0].slice(0, 250) }));
    }
  }
})().catch(error => { console.error(String(error).split('\n')[0].slice(0, 250)); process.exitCode = 1; });
