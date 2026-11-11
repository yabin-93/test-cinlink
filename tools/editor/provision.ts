import { randomUUID, createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { targets } from '../../src/config.js';
import { uploadAssetViaApi } from '../../src/workspace.js';

/** Prepare account-owned resources on the selected host; never copy cloud IDs across environments. */
export async function provisionEditorBaseline(page: Page, out: string) {
  const origin = new URL(targets.webBase).origin;
  if (new URL(targets.studioBase).origin !== origin) throw Error('前端与素材服务不在同一目标环境');
  await mkdir(out, { recursive: true });
  const record = async (name: string, value: unknown) => writeFile(path.join(out, `${name}.json`), JSON.stringify(value, null, 2));
  const uploads: Record<string, string> = {};
  const fixtures = path.resolve('reports/erye196-001-005-headed-20261105/fixtures');
  const videoPath = process.env.CINLINK_EDITOR_SOURCE_VIDEO || path.join(fixtures, 'E196-A.mp4');
  const uploaded = await uploadAssetViaApi(page, { path: videoPath, name: `E196-A20-${Date.now()}.mp4`,
    sizeBytes: (await stat(videoPath)).size, mimeType: 'video/mp4', durationSec: 20 });
  if (!uploaded.fileId) throw Error('A20上传未返回素材ID');
  uploads.__VIDEO__ = uploaded.fileId;
  await record('bootstrap-video', { fileId: uploaded.fileId, sizeBytes: uploaded.sizeBytes, httpStatus: uploaded.httpStatus });
  for (const [placeholder, filename] of [['__SOURCE_SRT__', 'E196-source-en.srt'], ['__TRANSLATION_SRT__', 'E196-translation-zh.srt']]) {
    const bytes = await readFile(path.resolve('tools/editor/fixtures', filename));
    const descriptor = { filename: `E196-${Date.now()}-${filename}`, kind: 'subtitle', mime_type: 'application/x-subrip',
      size_bytes: bytes.length, checksum_sha256: createHash('sha256').update(bytes).digest('base64') };
    const base = `${targets.studioBase}${process.env.CINLINK_FILES_API_BASE || '/studio-api/v1/agent/files'}`;
    const presign = await page.request.post(`${base}/presign`, { data: descriptor, timeout: 60_000 });
    if (!presign.ok()) throw Error(`字幕预上传 HTTP ${presign.status()}`);
    const signed = await presign.json();
    const put = await page.request.put(signed.upload_url, { data: bytes, headers: signed.upload_headers || {}, timeout: 90_000 });
    if (!put.ok()) throw Error(`字幕文件上传 HTTP ${put.status()}`);
    const complete = await page.request.post(`${base}/complete`, { data: { ...descriptor, bucket: signed.bucket, object_key: signed.object_key }, timeout: 60_000 });
    if (!complete.ok()) throw Error(`字幕登记 HTTP ${complete.status()}`);
    const file = await complete.json();
    uploads[placeholder] = file.cloud_file_id || file.file_id || file.resource_id;
    if (!uploads[placeholder]) throw Error('字幕登记未返回素材ID');
    await record(`bootstrap-${placeholder === '__SOURCE_SRT__' ? 'source' : 'translation'}`, { fileId: uploads[placeholder], httpStatus: complete.status() });
  }
  const conversationId = randomUUID(), projectId = randomUUID();
  const conversation = await page.request.put(`${origin}/runtime-api/v1/conversations/${conversationId}`, {
    data: { conversation_id: conversationId, title: `ERYE196-013-${new URL(origin).hostname}-${Date.now()}`, messages_partial: true,
      response_message_limit: 30, response_include_project_json: true, response_include_editor_project: true }, timeout: 60_000,
  });
  await record('bootstrap-conversation', { conversationId, status: conversation.status(), body: await conversation.json() });
  if (!conversation.ok()) throw Error(`专用会话创建 HTTP ${conversation.status()}`);
  let template = await readFile(path.resolve('tools/editor/fixtures/a20-subtitles-template.json'), 'utf8');
  for (const [placeholder, fileId] of Object.entries(uploads)) template = template.replaceAll(placeholder, fileId);
  const content = JSON.parse(template);
  content.project_id = projectId;
  content.name = `E196-A20-control-${new URL(origin).hostname}-${Date.now()}`;
  const operationId = randomUUID();
  const saved = await page.request.post(`${origin}/cloud-tool-api/v1/editor/projects/save`, {
    data: { conversation_id: conversationId, project_id: projectId, operation_id: operationId, base_revision: 0, content },
    headers: { 'idempotency-key': operationId }, timeout: 60_000,
  });
  await record('bootstrap-save', { projectId, conversationId, status: saved.status(), body: await saved.json() });
  if (!saved.ok()) throw Error(`控制工程保存 HTTP ${saved.status()}`);
  const environment = { origin, conversationId, projectId, uploads, setupOnly: true, createdAt: new Date().toISOString() };
  await record('environment', environment);
  return environment;
}
