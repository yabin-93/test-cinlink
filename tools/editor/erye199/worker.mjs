import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createContext, json, result, retiredCaseIds } from './core.mjs';
import { prepareMedia, uploadAssets } from './media.mjs';
import { cases } from './cases.mjs';
import { cases as laterCases } from './cases-011-015.mjs';
import { currentReleaseScope } from './release-scope.mjs';
import { cases as transformCases } from './cases-016-020.mjs';
import { cases as extendedCases } from './cases-051-068.mjs';
import { cases as currentCases, currentV2Ids } from './cases-current-v2.mjs';
export async function runSuite(config) {
  config = { ...config, cases: config.cases.filter(id => !retiredCaseIds.includes(id)) };
  if (!config.cases.length) { await json(path.join(config.outDir, 'results.json'), []); return []; }
  let task, ctx, media, assets;
  const results = [];
  if (config.cases.some(id => !currentReleaseScope(id))) {
    task = await taskSpace(config.spaceId ?? ('erye199-' + config.batch)); const p = task.page('p1');
    await p.goto(config.baseURL, { timeout: 60_000 });
    await p.waitForSelector('[contenteditable="true"]', { state: 'visible', timeout: 30_000 });
    ctx = await createContext(config, p);
    // Empty-project checks must not require or upload unrelated media fixtures.
    if (config.cases.some(id => id !== '068')) media = await prepareMedia(config);
    // Current v2 cases each create their own workspace in prepareCurrent.
    if(config.cases.some(id=>!currentReleaseScope(id)&&!currentV2Ids.includes(id))){
      ctx.workspaceId = crypto.randomUUID(); await ctx.api('/runtime-api/v1/projects/' + ctx.workspaceId, { project_id: ctx.workspaceId, display_name: 'ERYE199-AUTO-' + config.batch }, 'PUT');
    }
    await json(path.join(config.outDir, 'batch.json'), { spaceId: task.spaceId, workspaceId: ctx.workspaceId, baseURL: config.baseURL });
    assets = media ? await uploadAssets(ctx, media) : {};
  }
  for (const id of config.cases) {
    const scope = currentReleaseScope(id);
    if (scope) {
      const record = { id: 'ERYE199-' + id, status: scope.status, actual: scope.reason, scope_source: scope.source, executed: false, completed: new Date().toISOString() };
      results.push(record); await json(path.join(config.outDir, id, 'result.json'), record); await json(path.join(config.outDir, 'results.json'), results); console.log(JSON.stringify(record)); continue;
    }
    const source = currentV2Ids.includes(id) ? 'cases-current-v2.mjs' : Number(id) >= 51 ? 'cases-051-068.mjs' : Number(id) > 15 ? 'cases-016-020.mjs' : Number(id) > 10 ? 'cases-011-015.mjs' : 'cases.mjs';
    const originalWorkspaceId=ctx.workspaceId;
    ctx.caseId = id; ctx.fixture = null; const record = { id: 'ERYE199-' + id, started: new Date().toISOString(), automation: 'tools/editor/erye199/' + source + '#' + id };
    try {
      const actual = await ({ ...cases, ...laterCases, ...transformCases, ...extendedCases, ...currentCases })[id](ctx, assets, media);
      if (actual && typeof actual === 'object' && ['Passed', 'Failed', 'Blocked', 'Not Applicable'].includes(actual.status)) Object.assign(record, actual);
      else { record.actual = actual; record.status = 'Passed'; }
    }
    catch (error) { record.status = result(error); record.actual = error.message; record.errorType = error.name; if (error.name !== 'AssertionError' && error.name !== 'Blocked') { record.status = 'Blocked'; record.category = '执行异常，需核对页面/脚本；不直接认定产品缺陷'; } try { await ctx.shot('failure'); } catch (capture) { record.captureError = capture.message; } }
    record.fixture = ctx.fixture;record.workspace_id=ctx.workspaceId;ctx.workspaceId=originalWorkspaceId; record.completed = new Date().toISOString(); results.push(record);
    await json(path.join(config.outDir, id, 'result.json'), record); await json(path.join(config.outDir, 'results.json'), results); console.log(JSON.stringify(record));
    // Do not navigate away from a still-active accepted run or pending form.
    if (ctx.activeFaultPage || record.status === 'Blocked' && /原任务|补槽|确认|Control of this task space|takeover/.test(record.actual)) { console.log('需要继续当前原任务、故障恢复或用户控制现场；TaskSpace保留，未重发。'); return results; }
  }
  if (task && !config.keepSpace) await task.finish({ keep: [] });
  return results;
}
