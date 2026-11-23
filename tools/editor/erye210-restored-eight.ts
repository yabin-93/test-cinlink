import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, type Locator } from '@playwright/test';
import { Navigation210, rails210 } from './erye210.js';
import { block210, seed210, workspace210 } from './erye210-runner.js';
import { media210 } from './erye210-completion.js';
import { findStringField } from '../../src/workspace.js';
type Json=Record<string,any>;
export const restoredEightVersion210='v3-restored-six-and-navigation-20261116';
const synced=async(n:Navigation210)=>expect(n.page.locator('.ed-save-status')).toHaveText('已同步');
const videos=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='video');
const audios=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='audio');
const captions=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='subtitle');
const duration=(p:Json)=>Math.max(0,...videos(p).flatMap((t:Json)=>t.clips.map((c:Json)=>(t.offset_sec||0)+c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1))));
function guard(n:Navigation210){if(existsSync(path.join(n.out,'checkpoint.json')))block210('本批次已有工程/提交检查点；先核对同一现场，不自动新建或重发');}
async function checkpoint(n:Navigation210,s:Json){s.checks=structuredClone(n.checks);await n.record('checkpoint',s);}
async function fresh(n:Navigation210,id:string,kind='SEED'){
 guard(n);const f=await n.copy(workspace210(),id,await seed210(n,kind));const s:Json={id,f,workspaceId:workspace210(),before:await n.get(f.pid)};await checkpoint(n,s);return s;
}
async function openAgain(n:Navigation210,f:Json,reload=false){
 if(reload){await n.page.reload({waitUntil:'domcontentloaded'});await n.page.locator('#workspace-prompt').waitFor();}
 else await n.page.getByRole('button',{name:'收起编辑区',exact:true}).click();
 await n.open(f.name);await expect(n.page.locator('.ed-inspector')).toBeVisible();
}
async function selectClip(n:Navigation210,clip:Locator){await expect(clip).toHaveCount(1);await clip.scrollIntoViewIfNeeded();const b=await clip.boundingBox();if(!b)block210('目标片段不可见，未选择其他对象');await clip.click({position:{x:b!.width/2,y:Math.max(2,b!.height-4)}});}
async function seek(n:Navigation210,time:number){
 const slider=n.page.getByRole('slider',{name:'预览播放进度',exact:true});const max=Number(await slider.getAttribute('max'));const b=await slider.boundingBox();
 if(!b||max<time)block210('预览进度不可定位目标时间，未写DOM伪造播放头');
 await slider.click({position:{x:Math.min(b!.width-2,Math.max(2,b!.width*time/max)),y:b!.height/2}});const value=Number(await slider.inputValue());expect(Math.abs(value-time)).toBeLessThan(.2);return value;
}
async function importFirst(n:Navigation210,id:string,file:string){
 guard(n);if(!existsSync(file))block210('缺少本例真实输入文件');
 const c=await n.createConversation(workspace210(),id);const s:Json={id,f:{cid:c.cid,pid:'',name:''},workspaceId:workspace210()};n.prepared[id]=s.f;await checkpoint(n,s);
 await n.enterConversation(c.cid);n.latestProjectId='';await n.open();
 const choose=n.page.getByRole('button',{name:'选择媒体',exact:true});await expect(choose).toBeVisible();
 s.importAttemptedAt=new Date().toISOString();await checkpoint(n,s);const chooser=n.page.waitForEvent('filechooser');await choose.click();await(await chooser).setFiles(file);
 // Native first-import publishes its active project through the observed view
 // exchange; it does not necessarily issue the legacy project GET listener uses.
 if(!n.latestProjectId){
  const request=await n.page.waitForRequest(r=>{
   if(!new URL(r.url()).pathname.endsWith('/editor/projects/view/exchange'))return false;
   const body=r.postDataJSON();return body?.state?.conversation_id===c.cid&&!!body.state.project_id&&body.state.name===path.basename(file);
  },{timeout:15000});n.latestProjectId=request.postDataJSON().state.project_id;
 }
 await expect(n.page.getByRole('slider',{name:'预览播放进度',exact:true})).toBeVisible({timeout:90000});
 const p=await n.get(n.latestProjectId);s.f={cid:c.cid,pid:p.project_id,name:p.content.name};n.prepared[id]=s.f;s.imported=p;await checkpoint(n,s);return s;
}
export async function restored002(n:Navigation210){
 const file=process.env.CINLINK_ERYE210_SOURCE_VIDEO;if(!file)block210('未配置20秒原片CINLINK_ERYE210_SOURCE_VIDEO');
 const s=await importFirst(n,'002',file!);const first=await n.state();n.checks.push({stage:'first-import-before-navigation',state:first,alerts:await n.page.getByRole('alert').allTextContents(),seconds:duration(s.imported)});await n.shot('002-first-import-default');
 expect(duration(s.imported)).toBeCloseTo(20,1);expect.soft(await n.rail('媒体').getAttribute('aria-pressed'),'首次导入应默认Media，不能手动切页后补判通过').toBe('true');
 expect.soft(await n.page.getByRole('alert').allTextContents(),'首次导入不应出现保存/工程创建错误').toEqual([]);
 const messages=await n.messages(s.f.cid);n.checks.push({stage:'no-automatic-generation',messageCount:messages.messages?.length||0,hasGeneratedResults:messages.messages?.some((m:Json)=>m.result_files?.length)||false});
 expect(messages.messages?.some((m:Json)=>m.result_files?.length)||false).toBe(false);await checkpoint(n,s);
}
export async function restored007(n:Navigation210){
 const s=await fresh(n,'007','WATERMARK');await n.choose('水印');await n.sub('图片水印');await n.shot('007-image-before-close');
 for(const reload of [false,true]){
  await openAgain(n,s.f,reload);const image=n.page.getByRole('button',{name:'图片水印',exact:true});
  const observed={stage:reload?'after-refresh':'after-close-reopen',state:await n.state(),imagePressed:await image.count()?await image.getAttribute('aria-pressed'):null};n.checks.push(observed);await n.shot('007-'+observed.stage);
  expect.soft(await n.rail('水印').getAttribute('aria-pressed'),'重开应恢复Watermark').toBe('true');expect.soft(observed.imagePressed,'重开应恢复Image子页').toBe('true');
  expect((await n.get(s.f.pid)).content).toEqual(s.before.content);
 }
 await checkpoint(n,s);
}
export async function restored010(n:Navigation210){
 const s=await fresh(n,'010');const a=s.f;await n.choose('字幕');const b=await n.copy(workspace210(),'010-PB',s.before,a.cid);s.pb=b;await n.choose('媒体');const beforeB=await n.get(b.pid);
 for(const [f,module] of [[a,'字幕'],[b,'媒体']] as const){await n.selectProject(f.name);const actual=await n.state();n.checks.push({stage:'in-page-project-memory',project:f.name,expectedModule:module,state:actual});expect.soft(await n.rail(module).getAttribute('aria-pressed')).toBe('true');await n.shot('010-switch-'+module);}
 for(const [f,module] of [[b,'媒体'],[a,'字幕']] as const){if((await n.page.locator('.ed-project-name').innerText())!==f.name)await n.selectProject(f.name);await openAgain(n,f,true);n.checks.push({stage:'refreshed-project-memory',project:f.name,expectedModule:module,state:await n.state()});expect.soft(await n.rail(module).getAttribute('aria-pressed'),'刷新应恢复本工程自己的导航位置').toBe('true');await n.shot('010-refresh-'+module);}
 expect((await n.get(a.pid)).content).toEqual(s.before.content);expect((await n.get(b.pid)).content).toEqual(beforeB.content);await checkpoint(n,s);
}
export async function restored013(n:Navigation210){
 const file=process.env.CINLINK_ERYE210_INDEPENDENT_AUDIO;if(!file)block210('未配置真实独立WAV');const s=await importFirst(n,'013',file!);
 expect(videos(s.imported)).toHaveLength(0);expect(audios(s.imported).flatMap((t:Json)=>t.clips).length).toBeGreaterThan(0);
 for(const module of rails210)await n.choose(module);
 await n.sub('文字水印');const input=n.page.locator('.ed-watermark-panel textarea');await expect(input).toHaveCount(1);
 const enabled=await input.isEnabled();n.checks.push({stage:'audio-only-text',enabled,panel:await n.page.locator('.ed-inspector').innerText()});expect.soft(enabled,'无画面时文字水印写入应受限').toBe(false);await n.shot('013-audio-only-text-controls');
 if(enabled){await input.fill('AUDIO_ONLY_013_V3');await input.blur();await synced(n);s.afterText=await n.get(s.f.pid);n.checks.push({stage:'actual-text-write',saved:s.afterText.content.watermarks});await n.shot('013-unexpected-text-write-saved');}
 await n.sub('图片水印');const image=n.page.getByRole('button',{name:/^(水印图片选择与预览|选择并预览水印图片)$/});const imageEnabled=await image.isEnabled();
 n.checks.push({stage:'audio-only-image',enabled:imageEnabled,panel:await n.page.locator('.ed-inspector').innerText()});expect.soft(imageEnabled,'无画面时图片水印写入入口应受限').toBe(false);
 expect.soft(await n.page.locator('.ed-inspector').getByText(/无.*画面|仅音频|纯音频|audio.only|no video/i).count(),'应解释无画面限制').toBeGreaterThan(0);await n.shot('013-audio-only-image-controls');
 const after=await n.get(s.f.pid);expect.soft(after.content.watermarks.text).toBeNull();expect.soft(after.content.watermarks.image).toBeNull();expect(audios(after)).toEqual(audios(s.imported));await checkpoint(n,s);
}
export async function restored015(n:Navigation210){
 const s=await fresh(n,'015');await n.choose('文稿');await n.page.getByText('正在加载文稿…',{exact:true}).waitFor({state:'hidden'});await n.page.keyboard.press('Escape');
 await expect(n.page.locator('.ed-timeline-clip.is-selected')).toHaveCount(0);const split=n.page.getByRole('button',{name:'分割所选片段',exact:true});await expect(split).toBeDisabled();await split.hover();
 const explanation=[await split.getAttribute('title')||'',...await n.page.getByRole('tooltip').allTextContents(),...await n.page.getByText(/请先选择.*片段|先选.*片段|select a clip/i).allTextContents()];n.checks.push({stage:'no-selection',disabled:true,explanation});await n.shot('015-no-selection-guidance');
 expect.soft(explanation.some(x=>/请先选择.*片段|先选.*片段|select a clip/i.test(x)),'缺选区应明确提示先选择片段').toBe(true);
 const track=videos(s.before)[0];await selectClip(n,n.page.locator(`.ed-track-row[data-track-id="${track.track_id}"] .ed-timeline-clip`));const at=await seek(n,12);await expect(split).toBeEnabled();await split.click();
 await expect.poll(async()=>videos(await n.get(s.f.pid))[0].clips.length).toBe(2);await synced(n);const after=await n.get(s.f.pid);const clips=videos(after)[0].clips;
 expect(clips[0].source_out_sec).toBeCloseTo(at,2);expect(clips[1].source_in_sec).toBeCloseTo(at,2);expect(duration(after)).toBeCloseTo(20,3);expect(clips.every((c:Json)=>c.file_id===track.clips[0].file_id)).toBe(true);
 n.checks.push({stage:'valid-selection-split',at,seconds:duration(after),parts:clips.map((c:Json)=>[c.source_in_sec,c.source_out_sec,c.timeline_start_sec])});await n.shot('015-selected-split-completed');
 await n.page.getByRole('button',{name:'撤销',exact:true}).click();await expect.poll(async()=>media210(await n.get(s.f.pid))).toEqual(media210(s.before));n.checks.push({stage:'undo-restored',restored:true});await checkpoint(n,s);await n.shot('015-undo-restored');
}
export async function restored040(n:Navigation210){
 const resume=process.env.CINLINK_ERYE210_RESTORED_RESUME_040;
 const s:Json=resume?JSON.parse(await readFile(resume,'utf8')):await fresh(n,'040');
 if(resume){guard(n);expect(s.id).toBe('040');n.prepared['040']=s.f;await n.enterConversation(s.f.cid);await n.open(s.f.name);await checkpoint(n,s);}
 const file=process.env.CINLINK_ERYE210_INDEPENDENT_AUDIO;if(!file||!existsSync(file))block210('缺少真实独立音频文件');await n.choose('媒体');let actualStart=14;
 if(!resume){
  await n.page.locator('.ed-inspector').getByRole('button',{name:'聊天',exact:true}).click();
  const chooser=n.page.waitForEvent('filechooser');await n.page.locator('.ed-inspector').getByRole('button',{name:'导入素材',exact:true}).click();await(await chooser).setFiles(file!);
  const add=n.page.getByRole('button',{name:`将 ${path.basename(file!)} 添加到时间轴`,exact:true});await expect(add).toBeVisible({timeout:60000});actualStart=await seek(n,14);await add.focus();await add.press('Enter');
 }
 const originalFiles=new Set(audios(s.before).flatMap((t:Json)=>t.clips.map((c:Json)=>c.file_id)));
 await expect.poll(async()=>audios(await n.get(s.f.pid)).flatMap((t:Json)=>t.clips).filter((c:Json)=>!originalFiles.has(c.file_id)).length).toBe(1);await synced(n);
 const before=await n.get(s.f.pid);const track=audios(before).find((t:Json)=>t.clips.some((c:Json)=>!originalFiles.has(c.file_id)))!;expect(track.clips).toHaveLength(1);const c=track.clips[0];
 // The 30fps timeline snaps pointer time to a video frame. The overlap, not
 // sub-frame agreement with the rounded preview display, is the test premise.
 expect(Math.abs(c.timeline_start_sec-actualStart)).toBeLessThan(resume ? .2 : 1/30+.001);expect(c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/c.playback_rate).toBeLessThan(20);
 s.withAudio=before;s.target={track:track.track_id,file:c.file_id,clip:c.clip_id,start:c.timeline_start_sec};await checkpoint(n,s);await n.shot('040-overlap-before-delete');await selectClip(n,n.page.locator(`.ed-track-row[data-track-id="${track.track_id}"] .ed-timeline-clip`));await n.page.locator('.ed-timeline').press('Delete');
 await expect.poll(async()=>audios(await n.get(s.f.pid)).flatMap((t:Json)=>t.clips).some((x:Json)=>x.clip_id===c.clip_id)).toBe(false);await synced(n);const after=await n.get(s.f.pid);s.afterDelete=after;
 const other=(p:Json)=>({content:{tracks:p.content.tracks.filter((t:Json)=>t.track_id!==track.track_id)}});
 n.checks.push({stage:'overlapping-audio-only-deleted',target:s.target,beforeSeconds:duration(before),afterSeconds:duration(after),otherMediaUnchanged:JSON.stringify(media210(other(after)))===JSON.stringify(media210(other(before)))});await checkpoint(n,s);await n.shot('040-overlap-after-delete');
 expect.soft(media210(other(after)),'删除重叠独立音频不能裁剪原视频/原声').toEqual(media210(other(before)));expect.soft(captions(after)).toEqual(captions(before));expect.soft(duration(after)).toBeCloseTo(20,3);
 await n.page.getByRole('button',{name:'撤销',exact:true}).click();await expect.poll(async()=>media210(await n.get(s.f.pid))).toEqual(media210(before));await synced(n);await n.shot('040-overlap-undo-restored');n.checks.push({stage:'undo-restored',sameMediaReferences:true,seconds:duration(await n.get(s.f.pid))});await checkpoint(n,s);
}
export async function rapid055(n:Navigation210){
 const s=await fresh(n,'055','WATERMARK');await n.choose('字幕');const start=n.writes.length;
 for(let round=0;round<3;round++)for(const module of ['文稿','字幕','配音','媒体','水印'])await n.rail(module).click();
 await expect(n.rail('水印')).toHaveAttribute('aria-pressed','true');await n.sub('图片水印');await expect(n.page.getByRole('img',{name:'图片水印预览',exact:true})).toBeVisible();
 const observations=[];for(let i=0;i<6;i++){observations.push(await n.state());await expect(n.rail('水印')).toHaveAttribute('aria-pressed','true');await expect(n.page.getByRole('button',{name:'图片水印',exact:true})).toHaveAttribute('aria-pressed','true');await n.page.waitForTimeout(400);}
 expect((await n.get(s.f.pid)).content).toEqual(s.before.content);expect(n.writes.slice(start)).toEqual([]);n.checks.push({stage:'rapid-tabs-settled',rounds:3,finalModule:'水印/图片水印',observations,noContentWrites:true});await checkpoint(n,s);await n.shot('055-final-image-panel-stable');
}
export async function errorNavigation056(n:Navigation210){
 const s=await fresh(n,'056','WATERMARK');await n.choose('水印');s.exportAttemptedAt=new Date().toISOString();await checkpoint(n,s);
 const response=n.page.waitForResponse(r=>r.request().method()==='POST'&&new URL(r.url()).pathname.includes('/cloud-tool-api/mcp')&&/editor_export|export\.video/.test(r.request().postData()||''),{timeout:45000});
 await n.page.getByRole('button',{name:/^(导出|Export)$/}).click();const receipt=await response;const body=await receipt.json();s.exportTask={taskId:findStringField(body,'task_id'),httpStatus:receipt.status()};await n.record('056-export-accepted-private',body);await checkpoint(n,s);
 const deadline=Date.now()+90000;let alerts:string[]=[];while(Date.now()<deadline){alerts=await n.page.getByRole('alert').allTextContents();if(alerts.length)break;await n.page.waitForTimeout(1000);}
 if(!alerts.length)block210('本次真实导出未出现模块错误，报错后导航前置未形成；保留原导出，不重复提交或伪造错误');
 n.checks.push({stage:'genuine-module-error',alerts,originalTask:s.exportTask,errorInjected:false});await n.shot('056-genuine-export-error-before-navigation');
 for(const module of ['媒体','字幕','水印']){
  await n.choose(module);await expect(n.page.locator('.ed-project-trigger .ed-project-name')).toHaveText(s.f.name);
  if(module==='字幕')await expect(n.page.locator('.ed-caption-text').first()).toBeVisible();
  if(module==='水印'){await n.sub('文字水印');await expect(n.page.locator('.ed-watermark-panel textarea')).toBeEnabled();}
  expect((await n.get(s.f.pid)).content.tracks).toEqual(s.before.content.tracks);expect((await n.get(s.f.pid)).content.watermarks).toEqual(s.before.content.watermarks);
  n.checks.push({stage:'navigation-after-genuine-error',module,state:await n.state(),contentPreserved:true});await checkpoint(n,s);await n.shot('056-error-then-'+module);
 }
 n.checks.push({stage:'final',navigationPassed:true,exportResubmissions:0,exportSuccessNotClaimed:true});await checkpoint(n,s);
}
