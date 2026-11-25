import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// Fixture upload only. Product regression actions stay in Ego Lite's native UI.
// This uses the repository's observed /agent/files multipart contract.
export async function uploadRegressionAsset(ctx, key, filename, kind, mime) {
  if (!/^[a-zA-Z0-9_-]+$/.test(key)) throw Error('Invalid asset key');
  const bytes = await fs.readFile(filename), sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  const cachePath = path.join(ctx.config.outDir, 'assets.json');
  let cache = {}; try { cache = JSON.parse(await fs.readFile(cachePath, 'utf8')); } catch {}
  if (cache[key]) { if (cache[key].sha256 !== sha256) throw Error('Existing asset changed'); return cache[key]; }
  const dir = path.join(ctx.config.outDir, 'asset-upload-intents'); await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, key + '.json'), JSON.stringify({ filename: path.basename(filename), bytes: bytes.length, sha256, createdAt: new Date().toISOString() }), { flag: 'wx' });
  const descriptor = { filename: path.basename(filename), kind, mime_type: mime, size_bytes: bytes.length, checksum_sha256: Buffer.from(sha256, 'hex').toString('base64') };
  const base = '/cloud-tool-api/v1/agent/files', chunkSize = 5 * 1024 * 1024;
  const put = async (signed, body) => {
    if (new URL(signed.upload_url).protocol !== 'https:') throw Error('HTTPS required');
    const r = await fetch(signed.upload_url, { method: 'PUT', headers: signed.upload_headers || {}, body, signal: AbortSignal.timeout(45000) });
    if (!r.ok) throw Error('Asset storage PUT HTTP ' + r.status);
    return r.headers.get('etag');
  };
  let completed;
  if (bytes.length <= chunkSize) {
    const signed = await ctx.api(base + '/presign', descriptor); await put(signed, bytes);
    completed = await ctx.api(base + '/complete', { ...descriptor, bucket: signed.bucket, object_key: signed.object_key });
  } else {
    const session = await ctx.api(base + '/multipart/start', descriptor), parts = [];
    for (let partNumber = 1; partNumber <= Math.ceil(bytes.length / chunkSize); partNumber++) {
      const part = { bucket: session.bucket, object_key: session.object_key, upload_id: session.upload_id, part_number: partNumber };
      const signed = await ctx.api(base + '/multipart/part', part);
      const etag = await put(signed, bytes.subarray((partNumber - 1) * chunkSize, Math.min(bytes.length, partNumber * chunkSize)));
      if (!etag) throw Error('Multipart ETag missing');
      parts.push({ part_number: partNumber, etag });
    }
    completed = await ctx.api(base + '/multipart/complete', { ...descriptor, bucket: session.bucket, object_key: session.object_key, upload_id: session.upload_id, parts });
  }
  const fileId = completed.file_id || completed.cloud_file_id || completed.resource_id;
  if (!fileId) throw Error('Registered asset ID missing');
  cache[key] = { fileId, sha256, name: descriptor.filename, bytes: bytes.length };
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
  return cache[key];
}
