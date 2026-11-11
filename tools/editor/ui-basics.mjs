// Direct editor UI checks in the already-open interactive.cjs window.
// Business mutations happen only through real clicks/typing/dragging, never API writes.
import assert from 'node:assert/strict';
const origin = 'https://app.cinlink.ai';
export const contentEqual = (a, b) => JSON.stringify(a.content) === JSON.stringify(b.content);
export const videoClips = p => p.content.tracks.filter(t => t.type === 'video').flatMap(t => t.clips);
export const narration = p => p.content.tracks.find(t => t.type === 'audio' && t.role === 'narration');

export async function seekUI(page, seconds) {
  const slider = page.locator('.ed-preview-playback input[type="range"]');
  if (seconds === 0) await slider.press('Home');
  else {
    const box = await slider.boundingBox(), max = Number(await slider.getAttribute('max'));
    assert(box && max > 0);
    await slider.click({ position: { x: 8 + (box.width - 16) * seconds / max, y: box.height / 2 } });
    const step = Number(await slider.getAttribute('step'));
    const delta = Math.round((seconds - Number(await slider.inputValue())) / step);
    assert(Math.abs(delta) < 100, '先核对实际进度控件');
    for (let n = 0; n < Math.abs(delta); n++) await slider.press(delta > 0 ? 'ArrowRight' : 'ArrowLeft');
  }
  await page.waitForTimeout(500);
  assert(Math.abs(Number(await slider.inputValue()) - seconds) < 1e-9, '播放头没有到指定刻度');
}

export async function dragEdge(page, clip, edge, seconds, duration) {
  const max = Number(await page.locator('.ed-preview-playback input[type="range"]').getAttribute('max'));
  await seekUI(page, Math.min(10, Math.floor(max / 2)));
  const handle = clip.locator(`.ed-trim-handle.is-${edge}`);
  await handle.scrollIntoViewIfNeeded();
  if (edge === 'start') {
    // scrollIntoView may put a handle underneath the sticky track heading.
    await page.locator('.ed-timeline-scroll').evaluate(e => { e.scrollLeft = 0; });
    await page.waitForTimeout(200);
  }
  const c = await clip.boundingBox(), h = await handle.boundingBox();
  assert(c && h, '实际裁剪手柄不可见');
  const from = { x: h.x + h.width / 2, y: h.y + h.height / 2 }, delta = c.width / duration * seconds;
  const hit = await handle.evaluate((e, point) => {
    const top = document.elementFromPoint(point.x, point.y); return top === e || e.contains(top);
  }, from);
  assert(hit, '实际裁剪手柄被其他控件遮挡，未拖动');
  await page.mouse.move(from.x, from.y); await page.mouse.down();
  await page.mouse.move(from.x + delta, from.y, { steps: 16 }); await page.mouse.up();
  return { edge, requestedDeltaSeconds: seconds, deltaPixels: delta, clipWidth: c.width };
}

export async function begin(ctx, target) {
  const { page, context, fs, path, report } = ctx;
  await fs.mkdir(report, { recursive: true });
  const lock = await fs.open(path.join(report, 'ui-basics-started.lock'), 'wx'); await lock.close();
  const save = (name, data) => fs.writeFile(path.join(report, name), JSON.stringify(data, null, 2));
  const get = async () => {
    const r = await context.request.get(`${origin}/cloud-tool-api/v1/editor/projects/${target.projectId}`, { timeout: 30000 });
    assert(r.ok(), `工程回读HTTP ${r.status()}`); return r.json();
  };
  const identity = async () => {
    const ids = await page.locator('[aria-controls^="editor-inspector-"]').evaluateAll(es =>
      [...new Set(es.map(e => e.getAttribute('aria-controls').replace('editor-inspector-', '')))]);
    assert.deepEqual(ids, [target.projectId], '当前选中工程改变，停止，不按同名操作');
    assert.equal(page.url().split('?')[0], `${origin}/c/${target.conversationId}`);
    assert.equal((await page.locator('.ed-project-name').first().innerText()).trim(), target.projectName);
    assert(!(await page.locator('#workspace-prompt').innerText()).trim(), '保留用户对话草稿，停止');
  };
  await identity();
  const baseline = await get(), results = [], requests = [], turns = [];
  let expected = baseline;
  const listener = async response => {
    try {
      const u = new URL(response.url()), req = response.request();
      if (u.origin !== origin || req.method() === 'GET') return;
      if (/\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(u.pathname)) turns.push({ path: u.pathname, status: response.status() });
      if (u.pathname.includes('/editor/projects/')) {
        const row = { path: u.pathname, method: req.method(), status: response.status(), body: req.postDataJSON(), response: await response.json().catch(() => null) };
        requests.push(row);
      }
    } catch { /* Keep UI outcomes separate from telemetry availability. */ }
  };
  page.on('response', listener);
  await save('baseline.json', baseline);
  const driver = {
    ctx, target, baseline, results, get,
    async run(id, label, action, verify, { kind = 'case', timeoutMs = 20000 } = {}) {
      await identity();
      const before = await get();
      assert(before.revision === expected.revision && contentEqual(before, expected), '检测到非本轮操作的内容或修订变化，停止');
      const startedAt = new Date().toISOString(), startRequest = requests.length;
      let after = before, status = 'Passed', reason = null;
      await save(`${id}-before.json`, before);
      try {
        await action();
        const started = Date.now(); let matched = false;
        do {
          after = await get(); matched = !!(await verify(after, before));
          if (matched) break;
          await page.waitForTimeout(700);
        } while (Date.now() - started < timeoutMs);
        assert(matched, '页面操作后的实际保存结果不符合本项预期');
        await identity(); assert.equal(turns.length, 0, '本轮不应提交对话任务');
      } catch (e) { status = 'Failed'; reason = String(e).split('\n')[0].slice(0, 350); after = await get(); }
      expected = after;
      const screenshot = `${id}-${status.toLowerCase()}.png`;
      await page.screenshot({ path: path.join(report, screenshot) });
      const result = { id, kind, label, status, reason, startedAt, finishedAt: new Date().toISOString(),
        projectId: target.projectId, conversationId: target.conversationId,
        beforeRevision: before.revision, afterRevision: after.revision,
        changed: !contentEqual(before, after), screenshot, requestCount: requests.length - startRequest,
        pageText: (await page.locator('body').innerText()).slice(-7000) };
      await save(`${id}-after.json`, after); await save(`${id}-result.json`, result);
      results.push(result); await save('results.json', results);
      console.log(JSON.stringify({ event: 'editor-ui-result', id, label, status, beforeRevision: before.revision, afterRevision: after.revision, reason }));
      return { ...result, before, after };
    },
    async restore(id, wanted) {
      const current = await get();
      if (contentEqual(current, wanted)) return { status: 'NotNeeded', revision: current.revision };
      const result = await driver.run(`${id}-restore`, '仅撤销本项改动并恢复前置', async () => {
        const undo = page.getByRole('button', { name: '撤销', exact: true }).first();
        assert(await undo.isEnabled(), '撤销不可用，不覆盖旧JSON'); await undo.click();
      }, p => contentEqual(p, wanted), { kind: 'cleanup' });
      assert.equal(result.status, 'Passed', '本项没有恢复前置，停止后续修改'); return result;
    },
    async refresh(wanted, id) {
      await identity();
      assert.equal(await page.locator('.ed-caption-inline-input:visible').count(), 0, '字幕输入尚未提交，不刷新');
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.locator('#workspace-prompt').waitFor({ state: 'visible', timeout: 45000 });
      await page.locator('.ed-project-name').first().waitFor({ state: 'visible', timeout: 6000 }).catch(async () => {
        const toggle = page.locator('.workspace-editor-toggle');
        if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
      });
      await page.waitForFunction(name => [...document.querySelectorAll('.ed-project-name')].some(e => e.textContent?.trim() === name), target.projectName, { timeout: 45000 });
      await identity(); const actual = await get();
      await save(`${id}-refreshed.json`, actual);
      assert(contentEqual(actual, wanted), '刷新后内容未保持');
      expected = actual; return actual;
    },
    async finish() {
      const final = await get();
      await save('final-project.json', final); await save('editor-ui-requests.json', requests);
      const summary = { target, cases: results.filter(r => r.kind === 'case').map(({ pageText, ...r }) => r),
        cleanups: results.filter(r => r.kind === 'cleanup').map(({ pageText, ...r }) => r),
        baselineRevision: baseline.revision, finalRevision: final.revision,
        contentRestored: contentEqual(final, baseline), submittedTurns: turns.length, browserKeptOpen: !page.isClosed() };
      await save('summary.json', summary); page.off('response', listener); return summary;
    },
  };
  return driver;
}
