import crypto from 'node:crypto';
const id = () => crypto.randomUUID();
export function baseline(assets, { file = 'video', duration = 10, rate = 1, audio = true, empty = false } = {}) {
  const videoTrack = id(), fileId = empty ? '' : assets[file].fileId;
  const clip = { clip_id: id(), file_id: fileId, timeline_start_sec: 0, source_in_sec: 0, source_out_sec: duration, playback_rate: rate, volume: 1, opacity: 1, transform: { position: { x: 320, y: 180 }, rotation_deg: 0, scale_percent: 100 }, fade: { in_sec: 0, out_sec: 0 } };
  return { format_version: 3, project_id: '', name: '', canvas: { width: 640, height: 360, fps: file === 'fractional' ? 29.97 : 30, background_color: '#000000' }, tracks: empty ? [] : [{ type: 'video', track_id: videoTrack, offset_sec: 0, visible: true, muted: false, clips: [clip] }, ...(audio ? [{ type: 'audio', role: 'source', track_id: id(), offset_sec: 0, muted: false, linked_video_track_id: videoTrack, clips: [{ clip_id: id(), file_id: fileId, timeline_start_sec: 0, source_in_sec: 0, source_out_sec: duration, playback_rate: rate, volume: 1 }] }] : [])], dubbing: [], watermarks: { text: null, image: null, timing: { mode: 'whole_project', start_sec: 0, end_sec: null } }, subtitle_style: { color: '#FFFFFF', effect: 'regular', outline: { enabled: true, color: '#000000', width: 1.125 }, case_mode: 'original', font_name: 'Arial', font_size: 20, placement: { mode: 'preset', preset: 'bottom', position: null, margin_px: 22.5 }, background: { enabled: true, color: '#111111', opacity: 0 }, font_weight: 400, bold_override: false, highlight_color: '#FFD54F', highlight_typography: { bold: false, italic: false, font_name: null, font_size: null, underline: false } } };
}
export function fourObjects(assets) {
  const c = baseline(assets), subtitleTrack = id(), imageTrack = id();
  c.tracks.unshift({ type: 'subtitle', track_id: subtitleTrack, clips: [{ track_id: subtitleTrack, clip_id: id(), file_id: assets.subtitle.fileId, role: 'source', language: 'en', content_sha256: assets.subtitle.sha256, visible: true, characters_per_cue: 60, segmenter_version: 'parent-layout-v2', diff: [], bindings: [{ block_id: id(), source_ordinal: 1, original_start_sec: 1, original_end_sec: 3, speaker_id: null }, { block_id: id(), source_ordinal: 2, original_start_sec: 6, original_end_sec: 8, speaker_id: null }] }] }, { type: 'image', track_id: imageTrack, clips: [{ clip_id: id(), file_id: assets.image.fileId, timeline_start_sec: 0, duration_sec: 5, opacity: 1, transform: { position: { x: 100, y: 80 }, rotation_deg: 0, scale_percent: 25 }, fade: { in_sec: 0, out_sec: 0 } }] });
  return c;
}
export function twoInstances(assets) {
  const c = baseline(assets, { duration: 5, audio: false }), second = structuredClone(c.tracks[0].clips[0]); second.clip_id = id(); second.timeline_start_sec = 5; c.tracks[0].clips.push(second); return c;
}
