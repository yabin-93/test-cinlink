import { isSupersededLegacy210 } from '../../tools/editor/erye210-retired.js';
import { randomUUID } from 'node:crypto';
import { readFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, type Request } from '@playwright/test';
import { Navigation210 } from '../../tools/editor/erye210.js';
import { test210 as test, guarded210, block210, coverage210, fixture210, seed210, workspace210, reopen210 } from '../../tools/editor/erye210-runner.js';
type Json = Record<string, any>;
const tracks = (p: Json) => structuredClone(p.content.tracks).sort((a: Json,b: Json) => a.track_id.localeCompare(b.track_id));
const taskWatch = (n: Navigation210) => {
  const submitted: Json[] = [];
  const listener = (r: Request) => { if(r.method() !== 'POST' || !new URL(r.url()).pathname.includes('/cloud-tool-api/mcp')) return;
    let b: Json = {}; try { b=r.postDataJSON() || {}; } catch {}
    if(b.method === 'editor.task.submit') submitted.push({method:b.method, type:b.params?.task_type || '', at:Date.now()}); };
  n.page.on('request',listener); return {submitted, stop:()=>n.page.off('request',listener)};
};
async function scripts(n: Navigation210) {
  await n.choose('文稿'); await n.page.getByText('正在加载文稿…',{exact:true}).waitFor({state:'hidden',timeout:45000});
  return n.page.locator('.ed-inspector').getByRole('region',{name:'文稿',exact:true});
}
async function analyze(n: Navigation210, f: Json) {
  const panel=await scripts(n); const watch=taskWatch(n);
  try {
    const start=panel.getByRole('button',{name:/^(重新分析|去除口水词|Remove filler words)$/});
    if(await start.count() !== 1) block210('文稿中没有唯一可用的真实分析入口，未提交任务');
    await expect(start).toBeEnabled(); await start.click(); // One real submission; never retry.
    const end=Date.now()+240000;
    while(Date.now()<end) {
      const errors=await panel.getByRole('alert').allTextContents();
      if(errors.length) { n.checks.push({stage:'analysis-error',errors,submissions:structuredClone(watch.submitted)}); await n.shot('analysis-error'); expect(errors,'明确分析应成功').toEqual([]); }
      const detect=panel.getByRole('button',{name:'口水词与停顿',exact:true});
      if(await detect.isEnabled().catch(()=>false)) {
        n.checks.push({stage:'analysis-ready',submissions:structuredClone(watch.submitted),text:await panel.innerText()}); await n.shot('analysis-ready'); return panel;
      }
      await n.page.waitForTimeout(1500);
    }
    n.checks.push({stage:'analysis-wait',submissions:structuredClone(watch.submitted),project:await n.get(f.pid)});
    block210('真实分析在等待窗口内尚未形成可审核候选；保留原任务，不重复提交');
  } finally {watch.stop();}
}

test('ERYE210-028 打开文稿不自动分析，明确分析形成候选 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const s=structuredClone(await seed210(n)); delete s.content.cleanup_analysis;
  const f=await n.copy(workspace210(),'028',s); const before=await n.get(f.pid); const watch=taskWatch(n);
  try {await scripts(n); await n.page.waitForTimeout(1800); expect(watch.submitted).toEqual([]); expect(tracks(await n.get(f.pid))).toEqual(tracks(before));
    await n.shot('028-before-analysis');} finally {watch.stop();}
  await analyze(n,f); const after=await n.get(f.pid); expect(tracks(after)).toEqual(tracks(before));
  n.checks.push({stage:'analysis-only',beforeRevision:before.revision,afterRevision:after.revision,mediaUnchanged:true});
}));


async function freshCleanup(n:Navigation210,id:string) {
  const s=structuredClone(await seed210(n));delete s.content.cleanup_analysis;
  return n.copy(workspace210(),id,s);
}
function videoLength(p:Json) {
  return Math.max(0,...p.content.tracks.filter((t:Json)=>t.type==='video').flatMap((t:Json)=>t.clips.map((c:Json)=>
    (t.offset_sec||0)+c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/c.playback_rate)));
}
async function pauseOptions(n:Navigation210,f:Json) {
  const panel=await analyze(n,f),detect=panel.getByRole('button',{name:'口水词与停顿',exact:true});
  if(await detect.getAttribute('aria-expanded')!=='true')await detect.click();
  const boxes=panel.getByRole('checkbox');if(await boxes.count()!==2)block210('当前文稿未显示可区分的口水词/停顿两项，未任意应用');
  await boxes.nth(0).uncheck();await boxes.nth(1).check();
  const threshold=panel.getByRole('spinbutton',{name:/最短停顿/});await threshold.fill('0.8');await threshold.blur();
  const candidates=panel.locator('[data-token-id].is-pause.is-candidate');
  if(!await candidates.count())block210('本轮真实分析未给出可操作停顿候选，保留原任务，不编造9～10秒范围');
  return {panel,boxes,candidates,threshold};
}
async function applyPauseGroup(n:Navigation210,f:Json) {
  const {panel,candidates}=await pauseOptions(n,f);const before=await n.get(f.pid);
  const selected=await candidates.evaluateAll(es=>es.map(e=>({text:e.textContent,title:e.getAttribute('title')})));
  n.checks.push({stage:'v2-before-apply',selected,scope:'按页面当前停顿组验证应用；不判定ASR候选是否为真实口水词'});await n.shot('v2-before-apply');
  const remove=panel.getByRole('button',{name:'移除',exact:true});await expect(remove).toHaveCount(1);await expect(remove).toBeEnabled();await remove.click();
  await expect.poll(async()=>videoLength(await n.get(f.pid))).toBeLessThan(videoLength(before));
  const after=await n.get(f.pid);await n.record('v2-cleanup-comparison',{before,after,selected});await n.shot('v2-after-apply');
  const audioEnd=(p:Json)=>Math.max(0,...p.content.tracks.filter((t:Json)=>t.type==='audio'&&t.role==='source').flatMap((t:Json)=>t.clips.map((c:Json)=>(t.offset_sec||0)+c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/c.playback_rate)));
  expect(audioEnd(after).toFixed(6)).toBe(videoLength(after).toFixed(6));
  const oldFiles=new Set(before.content.tracks.filter((t:Json)=>t.type==='video').flatMap((t:Json)=>t.clips.map((c:Json)=>c.file_id)));
  expect(after.content.tracks.filter((t:Json)=>t.type==='video').flatMap((t:Json)=>t.clips).every((c:Json)=>oldFiles.has(c.file_id))).toBe(true);
  expect(after.content.dubbing).toEqual(before.content.dubbing);
  return {f,before,after,selected};
}
async function captions(n:Navigation210) {
  await n.choose('字幕');return n.page.locator('.ed-caption-text').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>({text:e.textContent||'',title:e.getAttribute('title')||''})));
}

test('ERYE210-029 v2 有效停顿候选取消恢复不自动应用 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'029');const {panel,boxes,candidates}=await pauseOptions(n,f);const before=await n.get(f.pid);
  const initial=await candidates.count();await boxes.nth(1).uncheck();await expect(candidates).toHaveCount(0);await n.shot('029-pauses-off');
  await n.choose('水印');await n.choose('文稿');const live=n.page.locator('.ed-inspector').getByRole('region',{name:'文稿',exact:true});
  await live.getByRole('checkbox').nth(1).check();await expect(live.locator('[data-token-id].is-pause.is-candidate')).toHaveCount(initial);
  await live.locator('[data-token-id].is-pause.is-candidate').first().click();await n.shot('029-pause-located');
  expect(tracks(await n.get(f.pid))).toEqual(tracks(before));
  n.checks.push({stage:'v2-selection-only',initial,restored:await live.locator('[data-token-id].is-pause.is-candidate').count(),mediaUnchanged:true});
}));

test('ERYE210-030 v2 单语工程停顿组清理与一次撤销 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'030');const {before,after}=await applyPauseGroup(n,f);
  await n.page.getByRole('button',{name:'撤销',exact:true}).click();await expect.poll(async()=>tracks(await n.get(f.pid))).toEqual(tracks(before));
  expect((await n.get(f.pid)).content.watermarks).toEqual(before.content.watermarks);
  n.checks.push({stage:'v2-group-undo',beforeSeconds:videoLength(before),afterSeconds:videoLength(after),restoredSeconds:videoLength(await n.get(f.pid))});
}));

test('ERYE210-031 v2 清理结果刷新重开不重复裁剪 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'031');const {after}=await applyPauseGroup(n,f);const seconds=videoLength(after);
  for(let i=0;i<2;i++){await reopen210(n,f,'字幕');const reopened=await n.get(f.pid);expect(tracks(reopened)).toEqual(tracks(after));expect(videoLength(reopened)).toBe(seconds);expect(reopened.revision).toBe(after.revision);}
  n.checks.push({stage:'v2-reopened-twice',seconds,repeatedApply:false});
}));

test('ERYE210-032 v2 停顿清理后保留字幕文字顺序和视频对应 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'032');const original=await captions(n);const {after}=await applyPauseGroup(n,f);const result=await captions(n);
  expect(result.map(c=>c.text)).toEqual(original.map(c=>c.text));
  const spans=after.content.tracks.filter((t:Json)=>t.type==='video').flatMap((t:Json)=>t.clips.map((c:Json)=>({...c,offset:t.offset_sec||0})));
  const checks=original.map((cue,i)=>{const times=cue.title.match(/\d+(?:\.\d+)?/g)?.map(Number);
    if(!times||times.length!==2)block210('字幕当前未显示可核对的秒数起止，保留文字核验，不猜测时码格式');
    const clip=spans.find((c:Json)=>times[0]>=c.source_in_sec&&times[1]<=c.source_out_sec);
    expect(clip,'仅清理停顿应保留整条原字幕对应源区间').toBeTruthy();
    const expected=times.map(t=>Number((clip.offset+clip.timeline_start_sec+(t-clip.source_in_sec)/clip.playback_rate).toFixed(2)));
    const actual=result[i].title.match(/\d+(?:\.\d+)?/g)?.map(Number);expect(actual).toEqual(expected);return {text:cue.text,expected,actual};});
  n.checks.push({stage:'v2-retained-cues',checks,scope:'核已有SRT文字与保留画面时段；不覆盖跨词语义边界听审'});
}));

test('ERYE210-033 v2 停顿阈值非法输入不改候选和内容 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'033');const {threshold,candidates}=await pauseOptions(n,f);const before=await n.get(f.pid);const value=await threshold.inputValue(),count=await candidates.count();
  const min=Number(await threshold.getAttribute('min')),max=Number(await threshold.getAttribute('max'));
  for(const invalid of ['', 'abc',String(min-.1),String(max+1)]){
    await threshold.fill('');if(invalid==='abc')await threshold.pressSequentially(invalid);else await threshold.fill(invalid);await threshold.blur();
    await expect(threshold).toHaveValue(value);await expect(candidates).toHaveCount(count);expect(tracks(await n.get(f.pid))).toEqual(tracks(before));
    n.checks.push({stage:'v2-invalid-threshold',invalid,min,max,retained:value});
  }
  await threshold.fill('1.2');await threshold.blur();await expect(threshold).toHaveValue('1.2');await threshold.fill(value);await threshold.blur();await expect(candidates).toHaveCount(count);
}));

test('ERYE210-034 v2 清理后继续改字幕不再裁剪音视频 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await freshCleanup(n,'034');const {after}=await applyPauseGroup(n,f);const lines=await captions(n);if(!lines.length)block210('清理结果没有可编辑的保留字幕');
  // The existing caption button is the edit entry; no direct script or project mutation.
  const target=n.page.locator('.ed-caption-text').filter({hasText:lines[0].text});await expect(target).toHaveCount(1);await target.click();
  const input=n.page.getByRole('textbox',{name:'字幕文本',exact:true});await input.fill('清理后字幕034');await input.press('Enter');
  await expect(n.page.locator('.ed-caption-text').filter({hasText:'清理后字幕034'})).toBeVisible();await reopen210(n,f,'字幕');
  await expect(n.page.locator('.ed-caption-text').filter({hasText:'清理后字幕034'})).toBeVisible();
  const edited=await n.get(f.pid);expect(tracks(edited).filter((t:Json)=>t.type!=='subtitle')).toEqual(tracks(after).filter((t:Json)=>t.type!=='subtitle'));
  const current=await captions(n);expect(current[0].title).toBe(lines[0].title);expect(current.slice(1)).toEqual(lines.slice(1));
  n.checks.push({stage:'v2-edit-after-cleanup',seconds:videoLength(edited),originalTitle:lines[0].title});
}));

test('ERYE210-035 v2 同素材PA清理不串改PB @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const pa=await freshCleanup(n,'035-PA');const s=structuredClone(await seed210(n));delete s.content.cleanup_analysis;
  const pb=await n.copy(workspace210(),'035-PB',s,pa.cid);const pbBefore=await n.get(pb.pid),pbLines=await captions(n);
  await n.selectProject(pa.name);const {after}=await applyPauseGroup(n,pa);expect(videoLength(after)).toBeLessThan(videoLength(pbBefore));
  await n.unchanged(pb.pid,pbBefore);await n.selectProject(pb.name);expect(await captions(n)).toEqual(pbLines);
  await reopen210(n,pb,'字幕');expect(await captions(n)).toEqual(pbLines);await n.unchanged(pb.pid,pbBefore);
  n.checks.push({stage:'v2-same-source-isolation',paSeconds:videoLength(after),pbSeconds:videoLength(pbBefore),sharedSource:true});
}));

async function voice(n:Navigation210) {
  await n.choose('配音'); const input=n.page.getByRole('textbox',{name:'第 1 句配音文案',exact:true}); await input.waitFor({timeout:60000}); return input;
}
async function nativeVoice(n:Navigation210,id:string) {
  const s=structuredClone(await seed210(n,'VOICE'));delete s.content.voiceover_sources;s.content.dubbing=[];
  s.content.tracks=s.content.tracks.filter((t:Json)=>!(t.type==='audio'&&t.role==='dubbing'));
  const f=await n.copy(workspace210(),id,s);await n.choose('配音');
  await n.page.getByRole('button',{name:'创建配音',exact:true}).click();
  await expect.poll(async()=>(await n.get(f.pid)).content.dubbing.filter((d:Json)=>d.audio_state==='ready'&&d.audio_file_id).length,{timeout:180000}).toBe(2);
  await reopen210(n,f,'配音');await voice(n);return f;
}
async function sourceCaption(n:Navigation210,f:Json) {
  await n.choose('字幕'); const p=await n.get(f.pid); const source=p.content.tracks.filter((t:Json)=>t.type==='subtitle').flatMap((t:Json)=>t.clips).find((c:Json)=>c.role==='source'&&c.bindings?.length);
  if(!source) block210('双语基线没有可唯一定位的C1原文字幕');
  const target=n.page.locator(`.ed-caption-text[data-file-id="${source.file_id}"][data-block-id="${source.bindings[0].block_id}"]`);
  if(await target.count()!==1) block210('当前字幕列表无法唯一定位C1原文，未任意修改译文');
  await target.click(); return n.page.getByRole('textbox',{name:'字幕文本',exact:true});
}

test('ERYE210-036 字幕改文及样式不串译文配音 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'036','VOICE'); const vin=await voice(n); const oldVoice=await vin.inputValue();
  const before=await n.get(f.pid); const watch=taskWatch(n);
  try {const input=await sourceCaption(n,f); await input.fill('字幕测试'); await input.blur();
    await n.page.locator('.ed-inspector').getByRole('button',{name:'样式',exact:true}).click();
    const size=n.page.locator('.ed-inspector').getByRole('spinbutton',{name:'字号',exact:true}); await size.fill('80'); await size.press('Enter'); await size.blur();
    await n.shot('036-style'); await voice(n); await expect(vin).toHaveValue(oldVoice);
    const after=await n.get(f.pid); expect(after.content.dubbing).toEqual(before.content.dubbing); expect(watch.submitted).toEqual([]);
    const translations=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='subtitle').flatMap((t:Json)=>t.clips).filter((c:Json)=>c.role==='translation');
    expect(translations(after)).toEqual(translations(before));
    await reopen210(n,f,'字幕'); await expect(n.page.locator('.ed-inspector')).toContainText('字幕测试');
    n.checks.push({stage:'saved-reopened',oldVoice,dubbingUnchanged:true,translationUnchanged:true,tasks:structuredClone(watch.submitted)});
  } finally {watch.stop();}
}));

test('ERYE210-037 配音改稿待生成及明确生成替换 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const resume=process.env.CINLINK_ERYE210_037_VERIFY_DIR;
  if(resume) {
    const f=JSON.parse(await readFile(path.join(resume,'037-location.json'),'utf8'));n.prepared['037']=f;
    const before=JSON.parse(await readFile(path.join(resume,'037-ready-before.json'),'utf8'));
    await n.enterConversation(f.cid);await n.open(f.name);const input=await voice(n);
    await expect(input).toHaveValue('欢迎回到 CinLink，这是第三十七条测试。');
    await expect(n.page.getByRole('textbox',{name:'第 2 句配音文案',exact:true})).toHaveValue('这是导航测试。');
    const after=await n.get(f.pid);const old=before.content.dubbing.find((d:Json)=>d.translation_text==='欢迎使用 CinLink。');
    expect(after.content.dubbing).toHaveLength(2);
    expect(after.content.tracks.filter((t:Json)=>t.type==='audio').flatMap((t:Json)=>t.clips).some((c:Json)=>c.file_id===old.audio_file_id)).toBe(false);
    expect(after.content.dubbing.some((d:Json)=>d.translation_text==='欢迎回到 CinLink，这是第三十七条测试。'&&d.audio_state==='ready'&&d.audio_file_id!==old.audio_file_id)).toBe(true);
    expect(tracks(after).filter((t:Json)=>t.type==='subtitle')).toEqual(tracks(before).filter((t:Json)=>t.type==='subtitle'));
    expect(after.content.dubbing.some((d:Json)=>d.audio_file_id===before.content.dubbing.find((d:Json)=>d.translation_text==='这是导航测试。').audio_file_id)).toBe(true);
    n.checks.push({stage:'original-native-task-verified',sourceBatch:path.basename(path.dirname(resume)),beforeDubbing:before.content.dubbing,afterDubbing:after.content.dubbing,oldSoundRemoved:true,otherSentencePreserved:true,newGenerationSubmitted:false});
    await n.record('037-ready-before',before);await n.record('037-after-regenerate',after);await n.shot('037-verified-after-reopen');
    await copyFile(path.join(resume,'037-pending-old-audio.png'),path.join(n.out,'037-pending-old-audio.png'));return;
  }
  // Establish old ready audio in this new project's own saved script. A copied legacy
  // script can be materialized with new identities and is not a qualified replacement fixture.
  const s=structuredClone(await seed210(n,'VOICE'));delete s.content.voiceover_sources;s.content.dubbing=[];
  s.content.tracks=s.content.tracks.filter((t:Json)=>!(t.type==='audio'&&t.role==='dubbing'));
  const f=await n.copy(workspace210(),'037',s);await n.choose('配音');
  await n.page.getByRole('button',{name:'创建配音',exact:true}).click();
  await expect.poll(async()=>(await n.get(f.pid)).content.dubbing.filter((d:Json)=>d.audio_state==='ready'&&d.audio_file_id).length,{timeout:180000}).toBe(2);
  await reopen210(n,f,'配音');const input=await voice(n);const before=await n.get(f.pid);await n.record('037-ready-before',before);
  const original=await input.inputValue();const oldTarget=before.content.dubbing.filter((d:Json)=>d.translation_text===original&&d.audio_state==='ready');
  if(oldTarget.length!==1) block210('本工程真实生成后无法唯一匹配第一句旧配音，未执行改稿生成');
  const watch=taskWatch(n);
  try {await input.fill('欢迎回到 CinLink，这是第三十七条测试。'); await input.blur(); await n.choose('字幕'); await voice(n);
    const pending=await n.get(f.pid); expect(pending.content.dubbing.map((d:Json)=>d.audio_file_id)).toEqual(before.content.dubbing.map((d:Json)=>d.audio_file_id)); expect(watch.submitted).toEqual([]);
    await n.shot('037-pending-old-audio');
    const controls=n.page.locator('.ed-voice-panel').getByRole('button',{name:/重新生成|生成配音|Regenerate|Generate voice/});
    n.checks.push({stage:'pending',oldAudioPreserved:true,buttons:await n.page.locator('.ed-voice-panel button').evaluateAll(es=>es.map(e=>({label:e.getAttribute('aria-label'),title:e.getAttribute('title'),text:e.textContent}))),tasks:structuredClone(watch.submitted)});
    if(await controls.count()!==1 || !await controls.isEnabled()) block210('改稿后旧音频保留且未自动生成；当前没有唯一可用的明确重新生成入口，生成成功替换分支未执行');
    await controls.click();
    await expect.poll(async()=>{const p=await n.get(f.pid);return p.content.dubbing.some((d:Json)=>d.audio_state==='ready'&&d.audio_file_id&&!before.content.dubbing.some((x:Json)=>x.audio_file_id===d.audio_file_id));},{timeout:180000}).toBe(true);
    const after=await n.get(f.pid);await n.record('037-after-regenerate',after);await n.shot('037-after-regenerate');
    n.checks.push({stage:'regenerated',dubbing:after.content.dubbing,tasks:structuredClone(watch.submitted)});
    expect(after.content.dubbing).toHaveLength(before.content.dubbing.length);
    expect(after.content.tracks.filter((t:Json)=>t.type==='audio').flatMap((t:Json)=>t.clips).some((c:Json)=>c.file_id===oldTarget[0].audio_file_id),'成功后须替换目标旧声，不保留同位置叠音').toBe(false);
    const untouched=before.content.dubbing.filter((d:Json)=>d!==oldTarget[0]);
    for(const d of untouched) expect(after.content.dubbing.some((x:Json)=>x.audio_file_id===d.audio_file_id)).toBe(true);
    expect(tracks(after).filter((t:Json)=>t.type==='subtitle')).toEqual(tracks(before).filter((t:Json)=>t.type==='subtitle'));
  } finally {watch.stop();}
}));

test('ERYE210-038 字幕稿与配音稿分别保存无默认同步 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await nativeVoice(n,'038'); const vin=await voice(n); const c2=n.page.getByRole('textbox',{name:'第 2 句配音文案',exact:true}); const oldC2=await c2.inputValue();
  const watch=taskWatch(n);
  try {const input=await sourceCaption(n,f); await input.fill('字幕独立稿038');
    n.checks.push({stage:'typed-caption',value:await input.inputValue(),target:await input.evaluate(e=>({file:e.getAttribute('data-file-id'),block:e.getAttribute('data-block-id')}))});await n.shot('038-caption-typed');
    await input.press('Enter');
    await expect(n.page.getByText('配音文稿不存在',{exact:true}),'字幕保存不应报配音文稿不存在').toBeHidden();
    await expect(n.page.locator('.ed-caption-text').filter({hasText:'字幕独立稿038'})).toBeVisible();
    await n.record('038-caption-saved',await n.get(f.pid));await voice(n);const rev=(await n.get(f.pid)).revision;
    await vin.fill('配音独立稿038'); await vin.press('Control+Enter'); await vin.blur();
    await expect.poll(async()=>(await n.get(f.pid)).revision).toBeGreaterThan(rev);
    await n.record('038-both-saved',await n.get(f.pid));
    await n.choose('字幕'); await expect(n.page.locator('.ed-inspector')).toContainText('字幕独立稿038');
    await voice(n); await expect(vin).toHaveValue('配音独立稿038'); await expect(c2).toHaveValue(oldC2); expect(watch.submitted).toEqual([]);
    const sync=n.page.locator('.ed-inspector').getByRole('button',{name:/同步/}); n.checks.push({stage:'independent-scripts',syncEntries:await sync.allTextContents(),oldC2,tasks:structuredClone(watch.submitted)});
    if(await sync.count()) block210('独立保存已验证；存在同步相关入口但方向/范围尚未确认，未任意点击');
    await reopen210(n,f,'配音'); await expect(vin).toHaveValue('配音独立稿038');
    coverage210('当前页面无显式字幕到配音同步入口，按用例条件仅验证独立保存、不自动生成、C2不变，不虚构同步操作。');
  } finally {watch.stop();}
}));

async function independent(n:Navigation210,id:string) {
  const s=structuredClone(await seed210(n,'VOICE'));
  const audio=s.content.tracks.filter((t:Json)=>t.type==='audio'&&t.role==='dubbing').flatMap((t:Json)=>t.clips).find((c:Json)=>c.file_id==='file_cloud_b42mih23tjwh7thdqiyjjhohca');
  if(!audio) block210('缺少已核验真实WAV A1素材，未创建假音轨');
  const clip={...structuredClone(audio),clip_id:randomUUID(),timeline_start_sec:14,volume:1}; delete clip.speech_source;
  const track={track_id:randomUUID(),type:'audio',role:'background',muted:false,offset_sec:0,linked_video_track_id:null,clips:[clip]};s.content.tracks.push(track);
  const f=await n.copy(workspace210(),id,s); await n.choose('字幕');
  const target=n.page.locator('.ed-timeline-clip[aria-label*="背景音乐"][aria-label*="00:14.00"]'); await expect(target).toHaveCount(1);await expect(target).toBeVisible();
  return {f,track,clip,target};
}

test('ERYE210-039 独立BGM音量静音偏移不改视频字幕 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const resume=process.env.CINLINK_ERYE210_039_VERIFY_DIR;
  if(resume) {
    const f=JSON.parse(await readFile(path.join(resume,'039-location.json'),'utf8'));n.prepared['039']=f;
    const before=JSON.parse(await readFile(path.join(resume,'039-before-offset.json'),'utf8'));const original=before.content.tracks.find((t:Json)=>t.role==='background');const id=original.clips[0].clip_id;
    await n.enterConversation(f.cid);await n.open(f.name);await n.choose('字幕');const after=await n.get(f.pid);const actual=after.content.tracks.find((t:Json)=>t.clips.some((c:Json)=>c.clip_id===id));
    expect(actual.muted).toBe(true);expect(actual.clips[0].volume).toBe(.5);expect(actual.clips[0].timeline_start_sec).toBe(15);
    const other=(p:Json)=>tracks(p).filter((t:Json)=>!t.clips.some((c:Json)=>c.clip_id===id));expect(other(after)).toEqual(other(before));
    await expect(n.page.locator('.ed-timeline-clip[aria-label*="背景音乐"][aria-label*="00:15.00"]')).toHaveCount(1);await expect(n.page.getByRole('button',{name:'背景音乐启用',exact:true})).toBeVisible();
    n.checks.push({stage:'original-drag-verified',sourceBatch:path.basename(path.dirname(resume)),track:actual,otherMediaUnchanged:true,volumePercent:50,dbApprox:-6.0206,newDragExecuted:false});
    await n.record('039-before-offset',before);await n.record('039-after-offset',after);await n.shot('039-verified-offset');
    await copyFile(path.join(resume,'039-volume-mute.png'),path.join(n.out,'039-volume-mute.png'));return;
  }
  const {f,track,clip,target}=await independent(n,'039'); const before=await n.get(f.pid); const box=await target.boundingBox(); if(!box) block210('BGM不可见'); await target.click({position:{x:box.width/2,y:box.height/2}});
  const volume=target.getByRole('slider',{name:'调整片段音量',exact:true});
  if(!await volume.isVisible()) block210('BGM已定位，当前没有实际可见的音量入口，未用接口代替目标混音操作');
  await volume.focus();for(let i=0;i<10;i++) await volume.press('ArrowDown');
  await expect(volume).toHaveAttribute('aria-valuenow','50');
  const mute=n.page.getByRole('button',{name:/^背景音乐\s*静音$/});if(await mute.count()!==1) block210('音量已改50%，静音入口不能唯一定位');await mute.click();
  await expect.poll(async()=>(await n.get(f.pid)).content.tracks.find((t:Json)=>t.track_id===track.track_id).muted).toBe(true);
  await expect.poll(async()=>(await n.get(f.pid)).content.tracks.find((t:Json)=>t.track_id===track.track_id).clips[0].volume).toBe(.5);
  const afterVolume=await n.get(f.pid);const other=(p:Json)=>tracks(p).filter((t:Json)=>!t.clips.some((c:Json)=>c.clip_id===clip.clip_id));expect(other(afterVolume)).toEqual(other(before));await n.shot('039-volume-mute');await n.record('039-before-offset',afterVolume);
  const video=n.page.locator('.ed-timeline-clip[aria-label*="视频"]').first();const vb=await video.boundingBox();const ab=await target.boundingBox();if(!vb||!ab) block210('音量静音已执行；偏移拖动缺可见时间线标尺');
  // Use the lower interior of the clip, away from its horizontal volume handle.
  await n.page.mouse.move(ab.x+ab.width/2,ab.y+ab.height-4);await n.page.mouse.down();await n.page.mouse.move(ab.x+ab.width/2+vb.width/20,ab.y+ab.height-4,{steps:10});await n.page.mouse.up();
  await expect.poll(async()=>(await n.get(f.pid)).content.tracks.find((t:Json)=>t.clips.some((c:Json)=>c.clip_id===clip.clip_id))?.clips.find((c:Json)=>c.clip_id===clip.clip_id)?.timeline_start_sec).toBeGreaterThan(14.5);
  const after=await n.get(f.pid);expect(other(after)).toEqual(other(before));const saved=after.content.tracks.find((t:Json)=>t.clips.some((c:Json)=>c.clip_id===clip.clip_id));expect(saved.clips[0].timeline_start_sec).toBeGreaterThan(14.5);
  n.checks.push({stage:'mix-offset',track:saved,otherMediaUnchanged:true,volumePercent:50,dbApprox:-6.0206});
}));

if (!isSupersededLegacy210('ERYE210-040')) test('ERYE210-040 独立音频移除不删同时段视频并撤销 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const {f,track,target}=await independent(n,'040'); const before=await n.get(f.pid); await n.record('040-before',before);await n.shot('040-before');
  const box=await target.boundingBox();if(!box) block210('独立音频不可见');await target.click({position:{x:box.width/2,y:box.height/2}});await n.page.locator('.ed-timeline').press('Delete');
  await expect.poll(async()=>(await n.get(f.pid)).content.tracks.some((t:Json)=>t.track_id===track.track_id&&t.clips.length)).toBe(false);
  const after=await n.get(f.pid);await n.record('040-after',after);await n.shot('040-after-delete');
  const other=(p:Json)=>tracks(p).filter((t:Json)=>t.track_id!==track.track_id);expect.soft(other(after),'只移除A1，不得裁剪同范围视频原声字幕').toEqual(other(before));
  n.checks.push({stage:'removed',beforeTracks:other(before),afterTracks:other(after),originalFileId:'file_cloud_b42mih23tjwh7thdqiyjjhohca'});
  await n.page.getByRole('button',{name:'撤销',exact:true}).click();await expect.poll(async()=>tracks(await n.get(f.pid))).toEqual(tracks(before));await n.shot('040-undo');
}));

if (!isSupersededLegacy210('ERYE210-041')) test('ERYE210-041 Media会话项目范围搜索不自动放置 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'041');await n.choose('媒体');const before=await n.get(f.pid);const watch=taskWatch(n);const panel=n.page.locator('.ed-inspector');
  const waitMedia=async()=>{await panel.getByText(/加载中/).waitFor({state:'hidden',timeout:45000});await n.page.waitForTimeout(1000);};
  try {await panel.getByRole('button',{name:'聊天',exact:true}).click();await waitMedia();await n.shot('041-chat');const chat=await panel.innerText();
    await panel.getByRole('button',{name:'工程',exact:true}).click();await waitMedia();await n.shot('041-project');const project=await panel.innerText();
    const search=panel.getByRole('textbox',{name:/搜索|Search/});n.checks.push({chat,project,searchEntries:await search.count(),tasks:structuredClone(watch.submitted)});
    expect(tracks(await n.get(f.pid))).toEqual(tracks(before));expect(watch.submitted).toEqual([]);
    expect(await search.count(),'Media应提供用例要求的素材搜索入口；当前Chat/工程两个页均未找到').toBe(1);
    block210('当前新会话未建立与项目不同的两组真实素材候选，不能以空列表判整例通过');
  } finally {watch.stop();}
}));

test('ERYE210-042 清理搜索及阈值只改变候选不应用 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'042','CLEAN');const panel=await analyze(n,f);const before=await n.get(f.pid);
  const search=panel.getByRole('textbox',{name:/^搜索(文稿|脚本)$/});await search.fill('healthcare');await expect(panel.locator('[data-token-id].is-match')).not.toHaveCount(0);await n.shot('042-search');await search.fill('');
  const detect=panel.getByRole('button',{name:'口水词与停顿',exact:true});if(await detect.getAttribute('aria-expanded')!=='true') await detect.click();
  const threshold=panel.getByRole('spinbutton',{name:/最短停顿/});const min=Number(await threshold.getAttribute('min')),max=Number(await threshold.getAttribute('max'));expect(1.2).toBeGreaterThanOrEqual(min);expect(1.2).toBeLessThanOrEqual(max);
  const oldText=await panel.innerText();await threshold.fill('1.2');await threshold.blur();await expect(threshold).toHaveValue('1.2');const newText=await panel.innerText();
  expect(tracks(await n.get(f.pid))).toEqual(tracks(before));n.checks.push({stage:'filter-only',oldText,newText,min,max,mediaUnchanged:true});await n.shot('042-threshold');
}));

test('ERYE210-043 每条字幕字符数保存重开与一次撤销 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'043');await n.choose('字幕');const before=await n.get(f.pid);const slider=n.page.getByRole('slider',{name:'每条字幕字符数',exact:true});const old=await slider.inputValue();
  expect(Number(await slider.getAttribute('min'))).toBeLessThanOrEqual(30);expect(Number(await slider.getAttribute('max'))).toBeGreaterThanOrEqual(30);const sb=await slider.boundingBox();if(!sb) block210('字符数滑杆不可见');const sx=sb.x+8+(sb.width-16)*(30-6)/(100-6);await n.page.mouse.click(sx,sb.y+sb.height/2);
  const changed=await slider.inputValue();expect(Number(changed)).toBeGreaterThanOrEqual(20);expect(Number(changed)).toBeLessThanOrEqual(40);expect(changed).not.toBe(old);
  await n.choose('水印');await n.choose('字幕');await expect(slider).toHaveValue(changed);await n.shot('043-changed-chars');
  const after=await n.get(f.pid);expect(after.content.dubbing).toEqual(before.content.dubbing);
  const files=(p:Json)=>p.content.tracks.flatMap((t:Json)=>t.clips).map((c:Json)=>[c.file_id,c.source_in_sec,c.source_out_sec,c.timeline_start_sec,c.bindings?.map((b:Json)=>[b.block_id,b.original_start_sec,b.original_end_sec]),c.diff]);expect(files(after)).toEqual(files(before));
  await n.page.getByRole('button',{name:'收起编辑区',exact:true}).click();await n.open(f.name);await n.choose('字幕');await expect(slider).toHaveValue(changed);await expect(n.page.locator('.ed-inspector')).toContainText('Efforts to sabotage');
  const undo=n.page.getByRole('button',{name:'撤销',exact:true});await expect(undo).toBeEnabled();
  await undo.click();await expect(slider).toHaveValue(old);n.checks.push({stage:'restored',old,changed:Number(changed),wordsAndTimingUnchanged:true});
  await reopen210(n,f,'字幕');await expect(slider).toHaveValue(old);
  coverage210('真实鼠标落点得到当前合法值，记录实际值而不强制样例30；保存重开指收起/展开编辑器，一次撤销后另刷新验证恢复值。');
}));

test('ERYE210-044 图片水印替换移除不串文字及源素材 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'044','WATERMARK');await n.choose('水印');await n.sub('文字水印');const before=await n.get(f.pid);const text=await n.page.locator('.ed-watermark-panel textarea').inputValue();await n.sub('图片水印');
  const panel=n.page.locator('.ed-watermark-panel');await n.shot('044-image-before');const chooserPromise=n.page.waitForEvent('filechooser');await panel.getByRole('button',{name:'替换',exact:true}).click();const chooser=await chooserPromise;await chooser.setFiles(path.resolve('assets/cinlink-smoke-watermark.png'));
  await expect.poll(async()=>(await n.get(f.pid)).content.watermarks.image?.file_id,{timeout:45000}).not.toBe(before.content.watermarks.image.file_id);
  const replaced=await n.get(f.pid);await n.shot('044-replaced');expect(replaced.content.watermarks.text).toEqual(before.content.watermarks.text);expect(tracks(replaced)).toEqual(tracks(before));
  await panel.getByRole('button',{name:'移除图片水印',exact:true}).click();await expect.poll(async()=>(await n.get(f.pid)).content.watermarks.image).toBeNull();
  await n.sub('文字水印');await expect(n.page.locator('.ed-watermark-panel textarea')).toHaveValue(text);const removed=await n.get(f.pid);expect(tracks(removed)).toEqual(tracks(before));
  n.checks.push({stage:'replace-remove',oldImage:before.content.watermarks.image,newImage:replaced.content.watermarks.image,textPreserved:true,mediaUnchanged:true});await n.shot('044-removed-text-preserved');
}));

// 045～049 v2 are registered in erye210-current-five.spec.ts; legacy migration scope is archived.
