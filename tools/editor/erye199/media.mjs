import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { sha256, json, Blocked } from './core.mjs';
import { extendCurrentMedia } from './media-current-v2.mjs';
export async function prepareMedia(config) {
  const dir = path.join(config.outDir, 'media'); await fs.mkdir(dir, { recursive: true });
  const ff = config.ffmpeg || 'ffmpeg', fp = config.ffprobe || 'ffprobe';
  const run = args => { try { return execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-nostdin', '-y', ...args], { timeout: 120_000, maxBuffer: 10_000_000 }); } catch { throw new Blocked('ffmpeg素材准备失败，请核对ffmpeg和字体路径；未开始产品操作'); } };
  let font = config.fontFile || (process.platform === 'win32' ? path.join(process.env.WINDIR || 'C:/Windows', 'Fonts/arial.ttf') : '');
  font = font ? `fontfile='${font.replaceAll('\\', '/').replaceAll(':', '\\:')}':` : '';
  const items = {};
  for (const [key, rate, vf] of [['video', '30', ''], ['videoB', '30', 'hue=h=90,'], ['fractional', '30000/1001', ''], ['vfr', '30', "select='if(lt(t,5),not(mod(n,2)),1)',"]]) {
    const file = path.join(dir, `ERYE199-${key}.mp4`);
    if (!await fs.stat(file).catch(() => null)) run(['-f', 'lavfi', '-i', `testsrc2=size=640x360:rate=${rate}:duration=10`, '-f', 'lavfi', '-i', 'aevalsrc=0.12*sin(2*PI*(440+220*floor(t/2))*t):s=48000:d=10', '-vf', vf + `drawtext=${font}text='${key} frame %{n} pts %{pts\\:hms}':x=8:y=8:fontsize=20:fontcolor=white:box=1:boxcolor=black`, ...(key === 'vfr' ? ['-fps_mode', 'vfr'] : []), '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ar', '48000', '-movflags', '+faststart', file]);
    const probe = JSON.parse(execFileSync(fp, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file], { encoding: 'utf8' })); probe.format.filename = path.basename(file);
    const frames = JSON.parse(execFileSync(fp, ['-v', 'error', '-select_streams', 'v:0', '-show_frames', '-show_entries', 'frame=pts,best_effort_timestamp_time', '-of', 'json', file], { encoding: 'utf8', maxBuffer: 5_000_000 })).frames;
    items[key] = { path: file, name: path.basename(file), kind: 'video', mime: 'video/mp4', sha256: sha256(await fs.readFile(file)), probe, frames };
  }
  const audio = path.join(dir, 'ERYE199-audio.wav'); if (!await fs.stat(audio).catch(() => null)) run(['-i', items.video.path, '-vn', '-c:a', 'pcm_s16le', '-ar', '48000', audio]);
  items.audio = { path: audio, name: path.basename(audio), kind: 'audio', mime: 'audio/wav', sha256: sha256(await fs.readFile(audio)) };
  for (const [key, file, kind, mime] of [['image', path.join(config.repo, 'assets/cinlink-smoke-watermark.png'), 'image', 'image/png'], ['subtitle', path.join(config.repo, 'tools/editor/erye199/fixtures/source-en.srt'), 'subtitle', 'application/x-subrip']]) items[key] = { path: file, name: path.basename(file), kind, mime, sha256: sha256(await fs.readFile(file)) };
  await extendCurrentMedia(config,items);
  await json(path.join(dir, 'oracle.json'), items);
  return items;
}
export async function uploadAssets(ctx, media) {
  const file = path.join(ctx.config.outDir, 'assets.json'); let assets;
  try { assets = JSON.parse(await fs.readFile(file, 'utf8')); } catch { assets = {}; }
  for (const [key, item] of Object.entries(media)) {
    if(item.upload===false)continue;
    if (assets[key]) { if (assets[key].sha256 !== item.sha256) throw Error('本批素材已改变，不复用旧云端标识'); continue; }
    const b = await fs.readFile(item.path), d = { filename: item.name, kind: item.kind, mime_type: item.mime, size_bytes: b.length, checksum_sha256: Buffer.from(item.sha256, 'hex').toString('base64') };
    if (b.length > 5 * 1024 * 1024) throw Error('固定夹具超出本入口5MiB上限');
    const base = '/cloud-tool-api/v1/agent/files', signed = await ctx.api(base + '/presign', d);
    if (new URL(signed.upload_url).protocol !== 'https:') throw Error('拒绝非HTTPS上传地址');
    const response = await fetch(signed.upload_url, { method: 'PUT', headers: signed.upload_headers || {}, body: b, signal: AbortSignal.timeout(45_000) });
    if (!response.ok) throw Error('素材上传HTTP ' + response.status);
    const completed = await ctx.api(base + '/complete', { ...d, bucket: signed.bucket, object_key: signed.object_key });
    const fileId = completed.file_id || completed.cloud_file_id || completed.resource_id; if (!fileId) throw Error('素材登记未返回ID');
    assets[key] = { fileId, sha256: item.sha256, name: item.name, bytes: b.length }; await json(file, assets);
  }
  return assets;
}
