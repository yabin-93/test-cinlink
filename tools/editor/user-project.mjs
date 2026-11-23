// Use the user's selected project in the already-open headed test window.
// This module never creates, clones, imports, or directly saves editor content.
const origin = 'https://app.cinlink.ai';
const safeError = error => String(error).split('\n')[0].slice(0, 220);
const save = async (ctx, name, value) => ctx.fs.writeFile(ctx.path.join(ctx.report, name), JSON.stringify(value, null, 2));

export async function submit(ctx, spec) {
  const { page, context, fs, path, report } = ctx;
  if (page.url().split('?')[0] !== `${origin}/c/${spec.conversationId}`) throw Error('当前会话已改变，未发送测试指令');
  if ((await page.locator('.ed-project-name').first().innerText()).trim() !== spec.projectName) throw Error('当前工程已改变，未发送测试指令');
  if ((await page.locator('#workspace-prompt').innerText()).trim()) throw Error('用户输入框存在草稿，未覆盖或发送');
  const response = await context.request.get(`${origin}/cloud-tool-api/v1/editor/projects/${spec.projectId}`, { timeout: 60_000 });
  if (!response.ok()) throw Error(`当前工程回读HTTP ${response.status()}`);
  const before = await response.json();
  if (before.project_id !== spec.projectId || before.content.name !== spec.projectName || before.revision !== spec.expectedRevision)
    throw Error('当前已保存基线发生变化，需重新核对后执行');
  const old = await fs.readFile(path.join(report, `${spec.caseId}-user-submission.json`), 'utf8').then(JSON.parse).catch(() => null);
  if (old?.submission?.runId) throw Error('本轮已受理目标请求，须先回读原run，不能再次提交');
  const record = { ...spec, mode: 'user-created-existing-project', origin, startedAt: new Date().toISOString(), beforeRevision: before.revision };
  await save(ctx, `${spec.caseId}-user-before.json`, before);
  await save(ctx, `${spec.caseId}-user-intent.json`, record);
  await page.locator('#workspace-prompt').fill(spec.prompt);
  await page.screenshot({ path: path.join(report, `${spec.caseId}-user-prompt.png`) });
  const promise = page.waitForResponse(r => r.request().method() === 'POST' && /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(r.url()).pathname), { timeout: 90_000 });
  await page.locator('#workspace-send').click();
  const accepted = await promise;
  const raw = await accepted.json();
  record.submission = { httpStatus: accepted.status(), runId: raw.run_id, status: raw.status, traceId: raw.trace_id, raw };
  record.acceptedConversationId = new URL(accepted.url()).pathname.match(/conversations\/([^/]+)\/turns$/)?.[1];
  await save(ctx, `${spec.caseId}-user-submission.json`, record);
  if (!accepted.ok() || !raw.run_id) throw Error(`目标请求未正常受理：HTTP ${accepted.status()}`);
  return { caseId: spec.caseId, projectId: spec.projectId, runId: raw.run_id, status: raw.status, httpStatus: accepted.status() };
}

export async function observe(ctx, caseId) {
  const { page, context, fs, path, report } = ctx;
  const record = JSON.parse(await fs.readFile(path.join(report, `${caseId}-user-submission.json`), 'utf8'));
  const cid = record.acceptedConversationId || record.conversationId;
  const res = await context.request.get(`${origin}/runtime-api/v1/conversations/${cid}/messages?limit=200`, { timeout: 30_000 });
  if (!res.ok()) throw Error(`原任务回读HTTP ${res.status()}`);
  const body = await res.json();
  const messages = (body.messages || []).filter(m => (m.job_id || m.run_id) === record.submission.runId);
  const assistant = messages.filter(m => m.role === 'assistant').at(-1);
  const state = { caseId, runId: record.submission.runId, status: assistant?.status || 'pending', intentSatisfied: assistant?.intent_fully_satisfied,
    elapsedSec: Math.round((Date.now() - Date.parse(record.startedAt)) / 1000) };
  await save(ctx, `${caseId}-user-observation.json`, { ...state, messages });
  if (state.status === 'requires_user_input') {
    await page.screenshot({ path: path.join(report, `${caseId}-user-clarification.png`) });
    return { ...state, text: (await page.locator('body').innerText()).slice(-5500) };
  }
  if (['done', 'failed', 'cancelled', 'canceled'].includes(state.status)) {
    const fetched = await context.request.get(`${origin}/cloud-tool-api/v1/editor/projects/${record.projectId}`, { timeout: 60_000 });
    if (!fetched.ok()) throw Error(`原工程结果回读HTTP ${fetched.status()}`);
    const after = await fetched.json();
    const before = JSON.parse(await fs.readFile(path.join(report, `${caseId}-user-before.json`), 'utf8'));
    await page.waitForTimeout(1000);
    const screenshot = path.join(report, `${caseId}-user-result.png`);
    await page.screenshot({ path: screenshot });
    await save(ctx, `${caseId}-user-after.json`, after);
    const final = { ...record, ...state, messages, after, unchanged: JSON.stringify(before.content) === JSON.stringify(after.content),
      beforeRevision: before.revision, afterRevision: after.revision, resultScreenshot: screenshot,
      pageText: (await page.locator('body').innerText()).slice(-12000), observedAt: new Date().toISOString() };
    await save(ctx, `${caseId}-user-execution.json`, final);
    return { ...state, unchanged: final.unchanged, afterRevision: after.revision,
      assistant: assistant?.text?.slice(-1800), errors: (assistant?.plan || []).filter(n => n.error).map(n => ({ tool: n.tool, error: n.error })) };
  }
  return state;
}

export function sanitizedError(error) { return safeError(error); }
