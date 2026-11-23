/** Native Chrome CUA harness. Import inside cua_repl; never launches a browser. */
export const escapeRE = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const captions = ax => [...ax.matchAll(/按钮 (.+?), Help: ([\d.]+)–([\d.]+) 秒/g)]
  .map(m => ({ text: m[1], start: Number(m[2]), end: Number(m[3]) }));
export const captionKey = c => `${c.start}-${c.end}`;
export function controls(ax) {
  const editor = ax.slice(ax.indexOf('container 编辑区'));
  return {
    document: editor.match(/弹出式按钮 ([^\n]+)/)?.[1],
    characters: Number(ax.match(/每条字幕字符数, Value: (\d+)/)?.[1]),
    undo: !/按钮 \(disabled\) 撤销/.test(ax), redo: !/按钮 \(disabled\) 重做/.test(ax),
    volume: Number(ax.match(/调整片段音量, Value: (\d+)/)?.[1]),
    tracks: ax.split('\n').filter(l => /\d+ 文本 (原文字幕|视频|原声)$/.test(l)).map(l => l.trim().replace(/^\d+ /, '')),
    clips: ax.split('\n').filter(l => /按钮 (视频 视频|原声 音频) .*\d\d:/.test(l)).map(l => l.trim().replace(/^\d+ /, '')),
  };
}
export function compareCaptions(expected, actual) {
  const key = c => JSON.stringify([c.text, c.start, c.end]);
  const counts = list => { const m = new Map(); for (const c of list) m.set(key(c), (m.get(key(c)) || 0) + 1); return m; };
  const a = counts(expected), b = counts(actual);
  const missing = [], extra = [];
  for (const [k, n] of a) if (n > (b.get(k) || 0)) missing.push({ caption: JSON.parse(k), count: n - (b.get(k) || 0) });
  for (const [k, n] of b) if (n > (a.get(k) || 0)) extra.push({ caption: JSON.parse(k), count: n - (a.get(k) || 0) });
  return { expected: expected.length, actual: actual.length, missing, extra,
    passed: !missing.length && !extra.length && expected.length === actual.length };
}
export function replaceCaption(baseline, target, replacement) {
  const hits = baseline.filter(c => c.text === target.text && c.start === target.start && c.end === target.end);
  if (hits.length !== 1) throw new Error('Fixture target must be unique by full text and times');
  return baseline.map(c => c === hits[0] ? { ...c, text: replacement } : { ...c });
}
export function createHarness({ app, fs, outputDir, conversationId, documentName, baseline, caseId }) {
  if (!app || !fs || !outputDir || !conversationId || !documentName || !caseId) throw new Error('Missing CUA fixture configuration');
  let checkpoint;
  const path = `${outputDir}/${caseId}-checkpoint.json`;
  const id = (ax, re) => {
    const found = ax.split('\n').filter(l => /^\s*\d+ /.test(l) && re.test(l));
    if (found.length !== 1) throw new Error(`Expected one AX anchor, found ${found.length}: ${re}`);
    return Number(found[0].trim().match(/^\d+/)[0]);
  };
  async function state({ allowConversation = conversationId, requireDocument = true } = {}) {
    const ax = await app.getAXState({ emit: false, disableDiffing: true });
    const current = ax.match(/URL: app\.cinlink\.ai\/c\/([a-z0-9-]+)/)?.[1];
    if (current !== allowConversation) throw new Error(`Wrong conversation: expected ${allowConversation}; no input sent`);
    if (requireDocument && !ax.includes(`弹出式按钮 ${documentName}`)) throw new Error(`Expected open document ${documentName}`);
    return ax;
  }
  async function load() {
    if (checkpoint) return checkpoint;
    await fs.mkdir(outputDir, { recursive: true });
    try { checkpoint = JSON.parse(await fs.readFile(path, 'utf8')); }
    catch (e) { if (e.code !== 'ENOENT') throw e; checkpoint = { caseId, conversationId, documentName, submissions: {}, steps: {} }; }
    if (checkpoint.caseId !== caseId || checkpoint.conversationId !== conversationId || checkpoint.documentName !== documentName) throw new Error('Checkpoint fixture mismatch');
    return checkpoint;
  }
  async function persist() { await fs.writeFile(path, JSON.stringify(await load(), null, 2)); }
  async function capture(label, options) {
    await fs.mkdir(outputDir, { recursive: true });
    await state(options);
    const bytes = await app.getScreenshot({ emit: false });
    const ext = bytes[0] === 0x89 && bytes[1] === 0x50 ? 'png' : 'jpg';
    await fs.writeFile(`${outputDir}/${caseId}-${label}.${ext}`, bytes);
    const ax = await state(options); // screenshots invalidate native AX indices
    await fs.writeFile(`${outputDir}/${caseId}-${label}.txt`, ax);
    return ax;
  }
  async function click(re, options) { const ax = await state(options); await app.click(id(ax, re)); return state(options); }
  async function scroll(direction, pages = 1) {
    const ax = await state(); await app.scroll(id(ax, /内容列表 字幕列表$/), direction, pages); return state();
  }
  async function scan(label) {
    await load();
    const known = new Map(), windows = [], conflicts = [], duplicates = [];
    await scroll('up', 100);
    let previous = null, reachedBottom = false;
    for (let n = 0; n < 60; n++) {
      const ax = await state(), list = captions(ax), local = new Set();
      if (!list.length) throw new Error('No editable subtitle entries; fixture is not ready');
      for (const c of list) {
        const k = captionKey(c);
        if (local.has(k)) duplicates.push({ window: n, caption: c });
        local.add(k);
        if (known.has(k) && JSON.stringify(known.get(k)) !== JSON.stringify(c)) conflicts.push({ before: known.get(k), after: c });
        known.set(k, c);
      }
      windows.push({ n, list });
      await fs.writeFile(`${outputDir}/${caseId}-${label}-window-${n}.txt`, ax);
      const signature = JSON.stringify(list);
      if (signature === previous) { reachedBottom = true; break; }
      previous = signature;
      await scroll('down', 1);
    }
    if (!reachedBottom) throw new Error('List did not settle at the bottom within the fixture scan budget');
    const result = { captions: [...known.values()].sort((a, b) => a.start - b.start), windows, conflicts, duplicates, reachedBottom };
    await fs.writeFile(`${outputDir}/${caseId}-${label}-scan.json`, JSON.stringify(result, null, 2));
    await capture(`${label}-bottom`);
    await scroll('up', 100);
    await capture(`${label}-top`);
    return result;
  }
  function assertScan(result, expected = baseline) {
    if (!expected?.length) throw new Error('Independent expected caption manifest is required');
    const diff = compareCaptions(expected, result.captions);
    const order = result.windows.every(w => w.list.every((c, n) => n === 0 || c.start >= w.list[n - 1].start));
    if (!diff.passed || result.conflicts.length || result.duplicates.length || !order) throw new Error(`Caption assertion failed: ${JSON.stringify({ ...diff, conflicts: result.conflicts.length, duplicates: result.duplicates.length, order })}`);
    return diff;
  }
  async function findTarget(target) {
    await scroll('up', 100);
    for (let n = 0; n < 60; n++) {
      const ax = await state();
      const re = new RegExp(`按钮 ${escapeRE(target.text)}, Help: ${target.start.toFixed(2)}–${target.end.toFixed(2)} 秒$`);
      if (ax.split('\n').some(l => re.test(l))) return { ax, index: id(ax, re) };
      await scroll('down', 1);
    }
    throw new Error('Target not found in current subtitle list');
  }
  async function edit(target, replacement) {
    const found = await findTarget(target); await app.click(found.index);
    let ax = await state();
    const field = id(ax, /文本输入区.*字幕文本/);
    await app.setValue(field, replacement); await app.pressKey('Right'); await app.typeText(' '); await app.pressKey('BackSpace');
    ax = await state();
    if (!ax.split('\n').some(l => /文本输入区/.test(l) && l.includes(replacement))) throw new Error('Inline draft did not match');
    await app.pressKey('Return'); return state();
  }
  async function locate(target) {
    const found = await findTarget(target), lines = found.ax.split('\n');
    const pos = lines.findIndex(l => Number(l.trim().match(/^\d+/)?.[0]) === found.index);
    const line = lines.slice(0, pos).reverse().find(l => /按钮 定位此句字幕$/.test(l));
    if (!line) throw new Error('No locate button for target subtitle group');
    await app.click(Number(line.trim().match(/^\d+/)[0])); return state();
  }
  async function submitOnce(key, prompt) {
    const c = await load();
    if (c.submissions[key]) throw new Error(`Submission ${key} already attempted; observe/resume instead`);
    let ax = await state();
    if (/按钮 (?:\(disabled\) )?停止任务/.test(ax)) throw new Error('Another task is running');
    const field = id(ax, /文本输入区 \(settable\)/);
    await app.setValue(field, prompt); await app.pressKey('Right'); await app.typeText(' '); await app.pressKey('BackSpace');
    ax = await state();
    if (!ax.split('\n').some(l => /文本输入区/.test(l) && l.endsWith(prompt))) throw new Error('Full draft mismatch; not submitted');
    const send = id(ax, /按钮 发送$/);
    c.submissions[key] = { prompt, attemptedAt: new Date().toISOString(), accepted: false };
    await persist(); // write-ahead guard: a lost click response must never trigger a second submission
    await app.click(send);
    ax = await capture(`${key}-submitted`);
    c.submissions[key].accepted = ax.includes(`文本 ${prompt}`); await persist();
    return observe(key);
  }
  async function adoptSubmitted(key, prompt, evidencePaths) {
    const c = await load(), ax = await state();
    if (!ax.includes(`文本 ${prompt}`) || !evidencePaths?.length) throw new Error('Cannot adopt without accepted UI message and existing evidence');
    for (const p of evidencePaths) { if (!(await fs.stat(p)).isFile()) throw new Error('Missing historical evidence'); }
    if (c.submissions[key]?.prompt && c.submissions[key].prompt !== prompt) throw new Error('Checkpoint prompt mismatch');
    c.submissions[key] = { ...c.submissions[key], prompt, accepted: true, adoptedFromExistingCUA: true, evidencePaths };
    await persist();
  }
  async function observe(key) {
    const c = await load(), sent = c.submissions[key];
    if (!sent) throw new Error('No accepted/attempted submission checkpoint');
    const ax = await state(), pos = ax.lastIndexOf(`文本 ${sent.prompt}`);
    if (pos < 0) throw new Error('Submitted message is absent from this conversation');
    const tail = ax.slice(pos), chat = tail.split(/container 编辑区/)[0];
    return { running: /按钮 (?:\(disabled\) )?停止任务/.test(chat), failed: /文本 失败(?:\n|$)/.test(chat),
      completed: /已完成 总耗时/.test(chat), requiresTarget: /没有唯一字幕|请选中一条字幕|明确指定|请选择|请提供/.test(chat), ax, chat };
  }
  async function refresh() {
    await state(); await app.pressKey('super+r');
    const c = await load(); c.steps.refreshRequestedAt = new Date().toISOString(); await persist();
    return { status: 'Refreshing', instruction: 'Call reopen() in the next cua_repl step; do not submit again.' };
  }
  async function reopen() {
    let ax = await state({ requireDocument: false });
    if (!ax.includes(`弹出式按钮 ${documentName}`)) {
      await app.click(id(ax, /按钮 视频编辑器$/)); ax = await state();
    }
    return ax;
  }
  async function undo() { return click(/按钮 撤销$/); }
  async function finish(status, details) {
    if (!['Passed', 'Failed', 'Blocked'].includes(status)) throw new Error('Invalid terminal status');
    const c = await load();
    const result = { caseId, status, executionMode: 'Chrome native CUA', script: `tools/erye196/erye196-${caseId.slice(-3)}.cua.mjs`,
      conversationId, documentName, ...details, recordedAt: new Date().toISOString() };
    await capture('result'); c.result = result; await persist();
    await fs.writeFile(`${outputDir}/${caseId}-result.json`, JSON.stringify(result, null, 2));
    return result;
  }
  return { app, fs, outputDir, baseline, caseId, conversationId, documentName, id, state, load, persist, capture, click, scroll,
    scan, assertScan, findTarget, edit, locate, submitOnce, adoptSubmitted, observe, refresh, reopen, undo, finish };
}
