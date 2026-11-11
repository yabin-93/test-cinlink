// Review local, real UI evidence; never contact the application or Yunxiao.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const root = process.cwd();
const raw = path.join(root, 'reports/editor-ui/20261106-expanded');
const dest = path.join(root, 'docs/cases/requirements/ERYE-196/evidence-editor-ui-expanded-20261106');
const read = async name => JSON.parse(await fs.readFile(path.join(raw, name), 'utf8'));
const same = (a, b) => JSON.stringify(a.content) === JSON.stringify(b.content);
const baseline = await read('baseline.json');
const final = await read('final-project.json');
assert(same(baseline, final), '最终内容未恢复，不生成完成报告');
const rawSummary = await read('summary.json');
assert.equal(rawSummary.submittedTurns, 0);
const review = await read('acceptance-review.json');
await fs.mkdir(dest, { recursive: true });
const files = [];
async function copy(name) {
  const bytes = await fs.readFile(path.join(raw, name));
  await fs.writeFile(path.join(dest, name), bytes);
  files.push({ name, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
}
const aliases = { 15: 'UI-15-direct', 16: 'UI-16-direct', 20: 'UI-20-direct', 22: 'UI-22-direct', 26: 'UI-26-direct', 39: 'UI-39-direct' };
const cases = [];
for (let n = 12; n <= 51; n++) {
  const id = `UI-${n}`, evidenceId = aliases[n] || id;
  const override = review.cases[id];
  let result;
  try { result = await read(`${evidenceId}-result.json`); }
  catch (e) { if (!override?.notExecuted || e.code !== 'ENOENT') throw e; }
  const effectiveStatus = override?.status || result.status;
  const row = { id, evidenceId, label: result?.label || override.label, status: effectiveStatus,
    automationStatus: result?.status ?? 'NotRun', review: override?.reason ?? null,
    beforeRevision: result?.beforeRevision ?? null, afterRevision: result?.afterRevision ?? null,
    changed: result?.changed ?? false, reason: result?.reason ?? null,
    screenshot: result?.screenshot || override?.screenshot || null };
  if (result) {
    const before = await read(`${evidenceId}-before.json`), after = await read(`${evidenceId}-after.json`);
    assert.equal(before.revision, row.beforeRevision); assert.equal(after.revision, row.afterRevision);
    if (effectiveStatus === 'Passed' && row.changed) {
      const refreshed = await read(`${evidenceId}-refreshed.json`);
      assert(same(after, refreshed), `${id}刷新内容不一致`);
    }
    row.observation = {
      styles: JSON.stringify(before.content.subtitle_style) === JSON.stringify(after.content.subtitle_style) ? undefined : after.content.subtitle_style,
      subtitleDiff: after.content.tracks.find(t => t.type === 'subtitle')?.clips[0]?.diff,
      mediaTracks: after.content.tracks.filter(t => t.type !== 'subtitle').map(t => ({
        type: t.type, role: t.role, trackId: t.track_id, muted: t.muted, visible: t.visible,
        clips: t.clips.map(c => ({ clipId: c.clip_id, fileId: c.file_id, in: c.source_in_sec, out: c.source_out_sec,
          start: c.timeline_start_sec, rate: c.playback_rate, volume: c.volume }))
      })), watermarks: after.content.watermarks,
    };
  }
  if (row.screenshot && !files.some(f => f.name === row.screenshot)) await copy(row.screenshot);
  cases.push(row);
}
await copy('final-restored-refreshed.png');
const counts = Object.fromEntries(['Passed', 'Failed', 'Blocked', 'NotRun'].map(s => [s, cases.filter(r => r.status === s).length]));
const summary = { date: '2026-11-06', environment: 'https://app.cinlink.ai', entry: 'direct editor UI',
  projectId: baseline.project_id, conversationId: rawSummary.target.conversationId,
  baselineRevision: baseline.revision, finalRevision: final.revision, contentRestored: true,
  submittedAgentTurns: rawSummary.submittedTurns, browserKeptOpen: rawSummary.browserKeptOpen,
  counts, cases, diagnostics: review.diagnostics, acceptanceReviews: review.cases,
  exportVerification: review.exportVerification, complexTestsAllowed: false, files };
await fs.writeFile(path.join(dest, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
const table = ['| 单项 | 操作 | 实际结果 | 状态／截图 |', '|---|---|---|---|', ...cases.map(r =>
  `| ${r.id} | ${r.label} | ${r.beforeRevision ?? '—'}→${r.afterRevision ?? '—'}；${(review.cases[r.id]?.observation || r.review || (r.status === 'Passed' ? '本项实际保存、刷新与恢复核对通过' : r.reason || '见覆盖缺口')).replace(/\|/g, '／')} | **${r.status}**${r.screenshot ? `；[原始截图](evidence-editor-ui-expanded-20261106/${r.screenshot})` : ''} |`)];
await fs.writeFile(path.join(raw, 'accepted-results-table.md'), table.join('\n') + '\n');
console.log(JSON.stringify({ counts, baselineRevision: baseline.revision, finalRevision: final.revision, screenshots: files.length, contentRestored: true }));
