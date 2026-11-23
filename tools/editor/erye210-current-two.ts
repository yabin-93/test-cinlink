import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { expect, type Locator } from '@playwright/test';
import { Navigation210 } from './erye210.js';
import { block210, seed210, workspace210, reopen210 } from './erye210-runner.js';
import { media210 } from './erye210-completion.js';
type Json = Record<string, any>;
export const currentTwoVersion210 = 'v3-restore-existing-voice-20261116';
const synced = async (n: Navigation210) => expect(n.page.locator('.ed-save-status')).toHaveText('已同步');
const video = (p: Json) => p.content.tracks.find((t: Json) => t.type === 'video');
const end = (p: Json) => Math.max(...video(p).clips.map((c: Json) => (video(p).offset_sec || 0) + c.timeline_start_sec + (c.source_out_sec - c.source_in_sec) / c.playback_rate));
function merge(ranges: number[][]) {
  const out: number[][] = [];
  for (const [a, b] of ranges.sort((x,y)=>x[0]-y[0])) {
    if (out.length && a <= out[out.length-1][1] + .00001) out[out.length-1][1] = Math.max(b, out[out.length-1][1]);
    else out.push([a,b]);
  }
  return out.map(r=>r.map(v=>Math.round(v*1e6)/1e6));
}
const ranges = (p: Json) => merge(video(p).clips.map((c: Json)=>[c.source_in_sec,c.source_out_sec]));
async function select(n: Navigation210, clip: Locator) {
  await clip.scrollIntoViewIfNeeded(); const b=await clip.boundingBox();
  if(!b) block210('目标字幕片段不可见，未选择其他语言代替');
  await clip.click({position:{x:b!.width/2,y:Math.max(2,b!.height-4)}});
}
async function state(n: Navigation210, id: string): Promise<Json | null> {
  const file=process.env[`CINLINK_ERYE210_DIRECT_FIXTURE_${id}`]; if(!file)return null;
  const s=JSON.parse(await readFile(file,'utf8')); expect(s.id).toBe(id);
  n.prepared[id]=s.f; await n.enterConversation(s.f.cid); await n.open(s.f.name); return s;
}
async function captions(n: Navigation210) {
  await n.choose('字幕'); await expect(n.page.locator('.ed-caption-text').first()).toBeVisible();
  return n.page.locator('.ed-caption-text').evaluateAll(es=>es.map(e=>({file:e.getAttribute('data-file-id'),block:e.getAttribute('data-block-id'),text:e.textContent})));
}
async function saveState(n: Navigation210,s: Json) {s.checks=structuredClone(n.checks);await n.record('checkpoint',s);}

export async function restore046(n: Navigation210) {
  // The published review becomes stale after reopening a prepared cleanup.
  // Exercise restoration in the same native analysis/cleanup session.
  if(existsSync(path.join(n.out,'checkpoint.json')))block210('本批次已有真实分析/清理检查点，先核对原任务与现场，不自动重做分析');
  let s: Json | null=null;
  if(!s) {
    const seed=structuredClone(await seed210(n));delete seed.content.cleanup_analysis;
    const f=await n.copy(workspace210(),'046',seed);s={id:'046',f,workspaceId:workspace210(),checks:[]};
    await n.choose('文稿');const panel=n.page.locator('.ed-inspector').getByRole('region',{name:'文稿',exact:true});
    await n.page.getByText('正在加载文稿…',{exact:true}).waitFor({state:'hidden'});
    s.analysisAttemptedAt=new Date().toISOString();await saveState(n,s);
    await panel.getByRole('button',{name:/^(重新分析|去除口水词|Remove filler words)$/}).click();
    await expect(panel.getByRole('button',{name:'口水词与停顿',exact:true})).toBeEnabled({timeout:240000});
    const toggle=panel.getByRole('button',{name:'口水词与停顿',exact:true});if(await toggle.getAttribute('aria-expanded')!=='true')await toggle.click();
    const boxes=panel.getByRole('checkbox');await boxes.nth(0).uncheck();await boxes.nth(1).check();
    const threshold=panel.getByRole('spinbutton',{name:/最短停顿/});await threshold.fill('0.8');await threshold.blur();
    s.before=await n.get(f.pid);s.candidates=await panel.locator('[data-token-id].is-pause.is-candidate').evaluateAll(es=>es.map(e=>e.getAttribute('data-token-id')));
    if(s.candidates.length<2)block210('真实分析不足两处可删除停顿，不能核验只恢复一处');
    await saveState(n,s);await panel.getByRole('button',{name:'移除',exact:true}).click();
    await expect.poll(async()=>end(await n.get(f.pid))).toBeLessThan(end(s!.before));await synced(n);
    s.cleaned=await n.get(f.pid);await saveState(n,s);
  }
  expect(s.cleaned,'必须有本例真实分析清理基线，不能复制失效分析后强制恢复').toBeTruthy();
  expect(ranges(await n.get(s.f.pid))).toEqual(ranges(s.cleaned));
  s.captionsBefore=await captions(n);expect(s.captionsBefore.length).toBeGreaterThan(1);
  await n.choose('文稿');const panel=n.page.locator('.ed-inspector').getByRole('region',{name:'文稿',exact:true});
  const show=panel.getByRole('button',{name:/显示已删除/});await expect(show).toBeEnabled();
  if(await show.getAttribute('aria-pressed')!=='true')await show.click();
  const deleted=panel.locator('[data-token-id].is-deleted');
  const ids=await deleted.evaluateAll(es=>es.map(e=>e.getAttribute('data-token-id')!));expect(ids.length).toBeGreaterThanOrEqual(2);
  const target=s.before.content.cleanup_analysis.result.candidates.find((c: Json)=>c.candidate_id===ids[0]);expect(target).toBeTruthy();
  const a=target.suggested_start_sec??target.start_sec,b=target.suggested_end_sec??target.end_sec;
  const expected=merge([...ranges(s.cleaned),[a,b]]);
  n.checks.push({stage:'restore-baseline',deletedIds:ids,selectedId:ids[0],restoreSourceRange:[a,b],beforeSeconds:end(s.cleaned),captions:s.captionsBefore});
  await saveState(n,s);await n.shot('046-before-single-pause-restore');
  const chosen=panel.locator(`[data-token-id="${ids[0]}"]`);await chosen.focus();await chosen.press('Enter');
  await panel.getByRole('toolbar',{name:'所选文稿操作',exact:true}).getByRole('button',{name:'恢复',exact:true}).click();
  await expect.poll(async()=>end(await n.get(s!.f.pid))).toBeCloseTo(end(s.cleaned)+b-a,5);await synced(n);
  const restored=await n.get(s.f.pid);s.restored=restored;expect(ranges(restored)).toEqual(expected);
  const source=restored.content.tracks.find((t: Json)=>t.type==='audio'&&t.role==='source');expect(source).toBeTruthy();
  expect(merge(source.clips.map((c: Json)=>[c.source_in_sec,c.source_out_sec]))).toEqual(expected);
  const v=video(restored);expect(source.clips.map((c: Json)=>[c.timeline_start_sec,c.source_in_sec,c.source_out_sec,c.playback_rate])).toEqual(v.clips.map((c: Json)=>[c.timeline_start_sec,c.source_in_sec,c.source_out_sec,c.playback_rate]));
  expect(new Set(v.clips.map((c: Json)=>c.file_id))).toEqual(new Set(video(s.before).clips.map((c: Json)=>c.file_id)));
  await expect(panel.locator(`[data-token-id="${ids[0]}"].is-deleted`)).toHaveCount(0);
  for(const id of ids.slice(1))await expect(panel.locator(`[data-token-id="${id}"].is-deleted`)).toHaveCount(1);
  expect(await captions(n)).toEqual(s.captionsBefore);
  // Compare each caption's displayed interval with its original retained source position.
  for(const track of restored.content.tracks.filter((t: Json)=>t.type==='subtitle'))for(const clip of track.clips)for(const binding of clip.bindings||[]) {
    const d=(clip.diff||[]).find((x: Json)=>x.identity===binding.block_id)?.properties||{};
    for(const key of ['start','end']) {
      const sourceTime=binding[`original_${key}_sec`];const c=v.clips.find((x: Json)=>sourceTime>=x.source_in_sec-.00001&&sourceTime<=x.source_out_sec+.00001);
      expect(c,`字幕${binding.source_ordinal}原画面必须保留`).toBeTruthy();
      expect(d[`${key}_sec`]??sourceTime).toBeCloseTo(c.timeline_start_sec+(sourceTime-c.source_in_sec)/c.playback_rate,5);
    }
  }
  await n.shot('046-one-pause-restored-other-deletion-kept');await reopen210(n,s.f,'文稿');
  expect(media210(await n.get(s.f.pid))).toEqual(media210(restored));
  // Reload may invalidate the review panel. Persistence is checked on the actual
  // retained video/audio/captions, without requiring a second editable review.
  expect(await captions(n)).toEqual(s.captionsBefore);
  n.checks.push({stage:'single-restore-persisted',restoredSourceRange:[a,b],otherDeletedIds:ids.slice(1),afterSeconds:end(restored),sourceVideoAudioAligned:true,captionTextAndTimingPreserved:true,reopened:true,repeatAnalysisExecuted:false});
  await saveState(n,s);await n.shot('046-restored-result-reopened');
}

export async function existingVoice048(n: Navigation210) {
  if(existsSync(path.join(n.out,'checkpoint.json')))block210('本批次已有编辑检查点，先核对同一工程，不自动覆盖或新建');
  let s=await state(n,'048');
  if(!s) {
    const pid=process.env.CINLINK_ERYE210_TRANSLATED_PROJECT_ID;
    const exported=process.env.CINLINK_ERYE210_TRANSLATED_EXPORT;
    if(!pid&&!exported)block210('缺少当前账号真实已完成翻译配音工程基线；不得用手工字幕/空音轨替代');
    const seed=exported?{content:JSON.parse(await readFile(exported,'utf8'))}:await n.get(pid!);
    const f=await n.copy(workspace210(),'048',seed);s={id:'048',f,workspaceId:workspace210(),checks:[],sourceProjectId:seed.content.project_id||pid,sourceKind:exported?'completed-real-translation-native-export':'completed-real-translation-project'};
  }
  const before=await n.get(s.f.pid);s.before=before;
  const voice=before.content.tracks.filter((t: Json)=>t.type==='audio'&&['narration','dubbing'].includes(t.role));
  expect(voice).toHaveLength(1);expect(voice[0].clips.filter((c: Json)=>c.file_id).length).toBeGreaterThanOrEqual(2);expect(voice[0].muted).toBe(false);
  const zh=before.content.tracks.find((t: Json)=>t.type==='subtitle'&&t.clips.some((c: Json)=>/^zh/.test(c.language)));
  const en=before.content.tracks.find((t: Json)=>t.type==='subtitle'&&t.clips.some((c: Json)=>c.language==='en'));expect(zh).toBeTruthy();expect(en).toBeTruthy();
  await n.choose('字幕');await select(n,n.page.locator(`.ed-track-row[data-track-id="${zh.track_id}"] .ed-timeline-clip`).first());await n.choose('字幕');
  const beforeCaptions=await captions(n);expect(beforeCaptions.length).toBeGreaterThan(1);
  const c1=zh.clips[0],target=n.page.locator(`.ed-caption-text[data-file-id="${c1.file_id}"][data-block-id="${c1.bindings[0].block_id}"]`);
  const text='字幕与译制人声独立048。';await saveState(n,s);await n.shot('048-real-translated-baseline');
  await target.click();const input=n.page.getByRole('textbox',{name:'字幕文本',exact:true});await input.fill(text);await input.blur();await synced(n);
  const edited=await n.get(s.f.pid);expect(edited.content.tracks.filter((t: Json)=>t.type!=='subtitle')).toEqual(before.content.tracks.filter((t: Json)=>t.type!=='subtitle'));
  expect(edited.content.tracks.find((t: Json)=>t.track_id===en.track_id)).toEqual(en);
  const afterCaptions=await captions(n);expect(afterCaptions).toEqual(beforeCaptions.map((c: Json)=>c.file===c1.file_id&&c.block===c1.bindings[0].block_id?{...c,text}:c));
  const voiceRow=n.page.locator(`.ed-track-row[data-track-id="${voice[0].track_id}"]`);
  const mute=voiceRow.getByRole('button',{name:/静音$/});await expect(mute).toBeEnabled();await mute.click();
  await expect.poll(async()=>(await n.get(s!.f.pid)).content.tracks.find((t: Json)=>t.track_id===voice[0].track_id).muted).toBe(true);await synced(n);
  const muted=await n.get(s.f.pid);const expected=structuredClone(edited.content.tracks);expected.find((t: Json)=>t.track_id===voice[0].track_id).muted=true;expect(muted.content.tracks).toEqual(expected);
  n.checks.push({stage:'caption-edit-and-narration-mute',voiceTrack:voice[0].track_id,existingVoices:voice[0].clips.length,captionText:text,otherCaptionsUnchanged:true,sourceAndBackgroundUnchanged:true});
  await saveState(n,s);await n.shot('048-caption-edited-narration-muted');
  for(const module of ['媒体','水印','字幕'])await n.choose(module);
  await expect(voiceRow.getByRole('button',{name:/启用$/})).toBeEnabled();await reopen210(n,s.f,'字幕');
  expect((await n.get(s.f.pid)).content.tracks).toEqual(muted.content.tracks);
  await select(n,n.page.locator(`.ed-track-row[data-track-id="${zh.track_id}"] .ed-timeline-clip`).first());await n.choose('字幕');expect(await captions(n)).toEqual(afterCaptions);
  await n.shot('048-muted-state-reopened');await voiceRow.getByRole('button',{name:/启用$/}).click();
  await expect.poll(async()=>(await n.get(s!.f.pid)).content.tracks.find((t: Json)=>t.track_id===voice[0].track_id).muted).toBe(false);await synced(n);
  const unmuted=await n.get(s.f.pid);expect(unmuted.content.tracks).toEqual(edited.content.tracks);
  await reopen210(n,s.f,'字幕');expect((await n.get(s.f.pid)).content.tracks).toEqual(edited.content.tracks);
  await select(n,n.page.locator(`.ed-track-row[data-track-id="${zh.track_id}"] .ed-timeline-clip`).first());await n.choose('字幕');expect(await captions(n)).toEqual(afterCaptions);
  expect(n.writes.filter(w=>/agent\/runs/.test(w.pathname))).toEqual([]);
  n.checks.push({stage:'existing-narration-unmuted-persisted',sameOriginalAudioFiles:true,firstChineseOnly:true,EnglishAndOtherChineseUnchanged:true,noVoiceRegeneration:true,voicePanelNotRequired:true,originalRegenerationScopeDeferred:true});
  await saveState(n,s);await n.shot('048-existing-voices-enabled-caption-preserved');
}
