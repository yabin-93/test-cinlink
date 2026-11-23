import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const exec = promisify(execFile);
export function decodeFrameMarkers(bytes) {
  if (bytes.length % 10) throw new Error('Incomplete ten-bit frame marker');
  const ids = [];
  for (let frame = 0; frame < bytes.length / 10; frame++) {
    let id = 0;
    for (let bit = 0; bit < 10; bit++) {
      const v = bytes[frame * 10 + bit];
      if (v > 80 && v < 175) throw new Error('Unreliable marker contrast');
      if (v >= 175) id |= 1 << bit;
    }
    ids.push(id);
  }
  return ids;
}
export function assertFrameSequence(ids, expectedCount = 600) {
  return { expectedCount, actualCount: ids.length, mismatches: ids.flatMap((id, frame) => id === frame ? [] : [{ frame, sourceFrame: id }]),
    passed: ids.length === expectedCount && ids.every((id, frame) => id === frame) };
}
function correlation(a, b, start, end, lag) {
  let aa = 0, bb = 0, ab = 0, n = 0;
  for (let i = start; i < end && i < a.length / 4; i++) {
    const j = i + lag; if (j < 0 || j >= b.length / 4) continue;
    const x = a.readFloatLE(i * 4), y = b.readFloatLE(j * 4);
    aa += x * x; bb += y * y; ab += x * y; n++;
  }
  return { correlation: aa && bb ? ab / Math.sqrt(aa * bb) : 0, gain: aa ? ab / aa : null, samples: n };
}
export async function analyzeContinuity({ ffmpegPath, sourcePath, resultPath, sourceSha256, outputPath }) {
  if (await realpath(sourcePath) === await realpath(resultPath)) throw new Error('Result must be a separately obtained actual export');
  const source = await readFile(sourcePath);
  if (createHash('sha256').update(source).digest('hex') !== sourceSha256) throw new Error('Fixture source changed');
  async function decode(path, kind) {
    const filters = kind === 'frames'
      ? ['-map', '0:v:0', '-vf', 'crop=200:8:0:8,scale=10:1:flags=area,format=gray', '-fps_mode', 'passthrough', '-f', 'rawvideo']
      : ['-map', '0:a:0', '-vn', '-ar', '16000', '-ac', '1', '-f', 'f32le'];
    const r = await exec(ffmpegPath, ['-hide_banner', '-nostdin', '-i', path, ...filters, '-'], { encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 });
    return r.stdout;
  }
  const sourceFrames = decodeFrameMarkers(await decode(sourcePath, 'frames'));
  if (!assertFrameSequence(sourceFrames).passed) throw new Error('Independent source fixture marker sequence is invalid');
  const actual = assertFrameSequence(decodeFrameMarkers(await decode(resultPath, 'frames')));
  const a = await decode(sourcePath, 'audio'), b = await decode(resultPath, 'audio');
  // Allow only a constant AAC encoder delay up to 25ms; separately inspect the cut.
  const countA = a.length / 4, countB = b.length / 4;
  let best = { correlation: -1, lag: 0 };
  for (let lag = -400; lag <= 400; lag += 16) {
    const r = correlation(a, b, 1600, Math.min(countA, 48000), lag);
    if (r.correlation > best.correlation) best = { ...r, lag };
  }
  const rough = best.lag;
  for (let lag = rough - 15; lag <= rough + 15; lag++) {
    const r = correlation(a, b, 1600, Math.min(countA, 48000), lag);
    if (r.correlation > best.correlation) best = { ...r, lag };
  }
  const full = correlation(a, b, 1600, Math.min(countA, 318400), best.lag);
  const cut = correlation(a, b, 76800, 83200, best.lag);
  const audioPassed = Math.abs(countB - 320000) <= 1600 && full.correlation >= .98 && cut.correlation >= .98 && Math.abs(full.gain - 1) <= .03;
  const result = { frames: actual, audio: { sourceSamples: countA, outputSamples: countB, lag: best.lag, full, cut, passed: audioPassed },
    marker: 'Ten-bit source frame number in top-left 200x24 fixture overlay', passed: actual.passed && audioPassed };
  await writeFile(outputPath, JSON.stringify(result, null, 2)); return result;
}
