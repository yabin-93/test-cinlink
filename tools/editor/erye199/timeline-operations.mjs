import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {workflowContext,cardDefinitions} from './workflow-cards.mjs';
const profiles={S0:cardDefinitions['069'],S1:cardDefinitions['070'],T1:cardDefinitions['071'],T2:cardDefinitions['072'],E:cardDefinitions['073'],C:cardDefinitions['074'],H:cardDefinitions['075'],G:{card:'AI 生视频',prompt:'固定镜头拍摄一只红色杯子放在木桌上，背景为浅灰色墙面。',media:null}};
export const timelinePlan=Object.freeze([
 {key:'081-T1',caseId:'081',profile:'T1',operation:'music-identity'},
 {key:'082-S1',caseId:'082',profile:'S1',operation:'historical'},
 {key:'082-T1',caseId:'082',profile:'T1',operation:'historical',followup:'082-S1'},
 ...['083','084','085'].flatMap(caseId=>Object.keys(profiles).flatMap(profile=>(caseId==='085'?['trim-head','trim-tail']:[caseId==='083'?'split':'move']).map(operation=>({key:caseId+'-'+profile+'-'+operation,caseId,profile,operation})))),
]);
const done=s=>['done','failed','cancelled','canceled','terminated'].includes(s);
export function businessTracks(document){const tracks=structuredClone(document.content.tracks);for(const t of tracks)for(const c of t.clips||[])delete c.speech_source;return tracks;}
export function unchangedTracks(before,after,excluded=[]){const actual=businessTracks(after);return businessTracks(before).filter(t=>!excluded.includes(t.track_id)).every(t=>JSON.stringify(t)===JSON.stringify(actual.find(x=>x.track_id===t.track_id)));}
function changedTrackRanges(before,after,excluded=[]){const actual=businessTracks(after);return businessTracks(before).filter(t=>!excluded.includes(t.track_id)).filter(t=>JSON.stringify(t)!==JSON.stringify(actual.find(x=>x.track_id===t.track_id))).map(t=>({trackId:t.track_id,type:t.type,role:t.role,before:t.clips.map(c=>({start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec})),after:actual.find(x=>x.track_id===t.track_id)?.clips.map(c=>({start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec}))}));}
export async function timelineContext(page,config){
 const base=await workflowContext(page,config),{state,save,shot,write,api,media}=base;
 const artifactDir=key=>path.join(config.outDir,key,...((state.attempts?.[key]||1)>1?['attempt-'+state.attempts[key]]:[]));
 const definition=key=>{const item=(config.variantPlan??timelinePlan).find(x=>x.key===key);assert.ok(item&&profiles[item.profile],'未登记变体');return{...item,definition:profiles[item.profile]};};
 const project=key=>api('/cloud-tool-api/v1/editor/projects/'+state.cases[key].editorId);
 function check(key,name,passed,actual){const e=state.cases[key];e.checks??=[];e.failures??=[];e.checks.push({name,passed:!!passed,actual});if(!passed)e.failures.push(name);}
 async function current(key){assert.equal(new URL(await page.url()).pathname,'/c/'+state.cases[key]?.conversationId);}
 async function waitContent(key,before){const limit=Date.now()+15000;let after;do{after=await project(key);if(JSON.stringify(businessTracks(after))!==JSON.stringify(businessTracks(before)))return after;await new Promise(r=>setTimeout(r,400));}while(Date.now()<limit);return after;}
 async function expanded(){const pos=await page.evaluate(()=>{const s=document.querySelector('[aria-label="调整时间轴高度"]'),t=document.querySelector('.ed-timeline');return s&&t?{r:s.getBoundingClientRect().toJSON(),h:t.getBoundingClientRect().height}:null;});if(pos&&pos.h<500){await page.mouse.move(pos.r.x+180,pos.r.y+4);await page.mouse.down();await page.mouse.move(pos.r.x+180,pos.r.y-(540-pos.h),{label:'展开时间轴核对全部轨道'});await page.mouse.up();}}
 async function clipSelector(trackId,clip){const end=clip.timeline_start_sec+(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1),label=await page.evaluate(({id,start,end})=>{const parse=x=>{const m=String(x).match(/(\d+):(\d{2})\.(\d{2})[–-](\d+):(\d{2})\.(\d{2})$/);return m?[Number(m[1])*60+Number(m[2])+Number(m[3])/100,Number(m[4])*60+Number(m[5])+Number(m[6])/100]:null};return[...document.querySelectorAll('.ed-track-row[data-track-id="'+id+'"] .ed-timeline-clip')].map(x=>x.getAttribute('aria-label')).find(x=>{const p=parse(x);return p&&Math.abs(p[0]-start)<.011&&Math.abs(p[1]-end)<.011})},{id:trackId,start:clip.timeline_start_sec,end});assert.ok(label,'目标片段尚未在可视时间窗口中，先定位时间再操作');return'.ed-track-row[data-track-id="'+trackId+'"] .ed-timeline-clip[aria-label='+JSON.stringify(label)+']';}
 const ctx={...base,definition,project,check,expanded,waitContent,artifactDir,clipSelector,
  async restartCredits(key){
   const e=state.cases[key],confirmation=state.creditRecovery;
   assert.ok(config.recoveryReason==='credits-restored'&&e?.runStatus==='failed'&&e.runError?.code==='insufficient_credits'&&!e.editIntent,'只允许明确补积分后恢复未编辑的积分终态失败');
   assert.ok(confirmation?.case===key&&confirmation.failedRunId===e.runId&&confirmation.confirmedAt&&!confirmation.usedAt,'必须有用户对本次积分失败的补充确认，不能沿用旧授权');
   const latest=await api('/runtime-api/v2/agent/runs/'+e.runId);assert.ok(latest.status==='failed'&&latest.error?.code==='insufficient_credits','原任务已恢复或状态改变，请观察原任务，不新建重复准备');
   const messages=await api('/runtime-api/v1/conversations/'+e.conversationId+'/messages?limit=100');assert.ok(!(messages.messages||messages.items||[]).some(m=>m.role==='user'&&m.run_id&&m.run_id!==e.runId),'原会话已有后续请求，先核验接续而非再建会话');
   state.caseHistory??={};state.caseHistory[key]??=[];state.caseHistory[key].push(structuredClone(e));state.attempts??={};state.attempts[key]=(e.attemptNumber||state.attempts[key]||1)+1;confirmation.usedAt=new Date().toISOString();delete state.cases[key];await save();return this.open(key);
  },
  async configure(key){
   const e=state.cases[key];if(e.definition.language==='不翻译'&&!await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="目标语言：不翻译"]')))){await page.click('button[aria-label^="目标语言："]',{label:'恢复本例原文不翻译参数'});await page.click('loc=role:option[name="不翻译"]',{label:'选择原文不翻译'});}return base.configure(key);
  },
  async start(key){const spec=definition(key);assert.ok(!state.cases[key],'已有原任务，使用observe');await this.open(key);await this.configure(key);if(spec.definition.media)await base.upload(key);return this.submit(key);},
  async open(key){
   const spec=definition(key);assert.ok(!spec.followup,'同会话续轮必须followup');assert.ok(!state.cases[key],'已有检查点，不能重建');
   assert.ok(!Object.values(state.cases).some(e=>e.submittedAt&&!done(e.runStatus)),'还有原任务未结束');assert.ok(state.workspaceId);
   await page.goto(config.baseURL+'/?project_id='+state.workspaceId);await page.waitForFunction(n=>document.querySelector('button[aria-label="切换项目"]')?.innerText?.trim()===n,state.workspaceName,{timeout:30000});
   await page.click('button[aria-label="'+spec.definition.card+'"]',{label:'选择本变体的原生功能卡片'});
   state.cases[key]={id:'ERYE199-'+spec.caseId,key,attemptNumber:state.attempts?.[key]||1,profile:spec.profile,operation:spec.operation,definition:spec.definition,source:spec.definition.media?{...media[spec.definition.media]}:{name:'',generated:true},status:'In Progress',stage:'Configure',startedAt:new Date().toISOString(),checks:[],failures:[]};await save();return spec;
  },
  async submit(key){
   const e=state.cases[key];if(e.definition.media)return base.submit(key);
   assert.ok(!e.submittedAt,'无源请求也不能重发');assert.equal(new URL(await page.url()).pathname,'/');
   assert.equal(await page.evaluate(()=>[...document.querySelectorAll('button[aria-label^="移除 "]')].filter(b=>/\.(mp4|mov|png|wav|mp3)$/i.test(b.getAttribute('aria-label'))).length),0,'生视频不能附加旧素材');
   await page.fill('[contenteditable="true"]',e.definition.prompt);await shot(key,'before-submit');e.submittedAt=new Date().toISOString();await save();await page.click('button[aria-label="发送"]',{label:'一次发送本例生成视频原文'});await page.waitForFunction(()=>/^\/c\/[0-9a-f-]+/.test(location.pathname),undefined,{timeout:30000});e.conversationId=new URL(await page.url()).pathname.split('/c/')[1];await save();return{key,conversationId:e.conversationId};
  },
  async observe(key){
   const e=state.cases[key];if(!e.previousRunIds)return base.observe(key);
   await current(key);const messages=await api('/runtime-api/v1/conversations/'+e.conversationId+'/messages?limit=100');await write(key,'messages',messages);const users=(messages.messages||messages.items||[]).filter(x=>x.role==='user'&&x.run_id&&!e.previousRunIds.includes(x.run_id));assert.ok(users.length<=1,'同会话多出未知请求');if(!users.length)return{status:'Acceptance not yet observed'};
   const user=users[0];e.runId=user.run_id;e.uploadedFiles=user.files;const input=user.files?.find(f=>f.name===e.source.name);if(input?.content_sha256)assert.equal(input.content_sha256,e.source.sha256);
   const run=await api('/runtime-api/v2/agent/runs/'+e.runId);await write(key,'run',run);assert.equal(run.conversation_id,e.conversationId);Object.assign(e,{runStatus:run.status,runError:run.error,resultFiles:run.result_files,stage:run.status});await save();return{key,status:run.status,clarifications:run.clarifications,error:run.error};
  },
  async followup(key){
   const spec=definition(key),prior=state.cases[spec.followup];assert.ok(prior?.runStatus==='done'&&!state.cases[key]);await current(spec.followup);
   if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起编辑区"]')))){await page.click('button[aria-label="收起编辑区"]',{label:'返回同会话准备第二个结果'});await page.waitForSelector('[aria-label="编辑区"]',{state:'hidden',timeout:10000});}
   await page.fill('[contenteditable="true"]','/');await page.click('loc=role:option[name*="'+spec.definition.card+'"]',{label:'选择同会话翻译配音卡片'});
   state.cases[key]={id:'ERYE199-'+spec.caseId,key,profile:spec.profile,operation:spec.operation,definition:spec.definition,source:{...media.F20},conversationId:prior.conversationId,previousRunIds:[prior.runId],status:'In Progress',stage:'Configure',checks:[],failures:[]};await save();return base.configure(key);
  },
  async submitFollowup(key){
   const e=state.cases[key];assert.ok(e.previousRunIds&&e.stage==='Uploaded'&&!e.submittedAt);await current(key);await page.fill('[contenteditable="true"]',e.definition.prompt);
   for(const label of ['目标语言：'+e.definition.language,'字幕显示模式：'+e.definition.mode])assert.ok(await page.evaluate(x=>Boolean(document.querySelector('button[aria-label="'+x+'"]')),label));
   assert.ok(await page.evaluate(name=>Boolean(document.querySelector('button[aria-label="移除 '+name+'"]')),e.source.name));await shot(key,'before-submit');e.submittedAt=new Date().toISOString();await save();await page.click('button[aria-label="发送"]',{label:'同会话提交第二轮完整提示词'});return{key,conversationId:e.conversationId};
  },
  async inspect(key){
   const e=state.cases[key];assert.equal(e.runStatus,'done');await current(key);const selector='[data-agent-run-id="'+e.runId+'"] button[aria-label="进入编辑器"]';await page.waitForSelector(selector,{state:'attached',timeout:30000});
   if(!e.editorId&&await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起编辑区"]')))){await page.click('button[aria-label="收起编辑区"]',{label:'离开审核面板打开最终产物工程'});await page.waitForSelector('[aria-label="编辑区"]',{state:'hidden',timeout:10000});}
   if(!await page.evaluate(()=>Boolean(document.querySelector('[aria-label="编辑区"]'))))await page.click(selector,{label:'进入本次原生结果工程'});
   try{await page.waitForFunction(()=>document.querySelectorAll('.ed-track-row').length>0,undefined,{timeout:10000});}
   catch(error){
    const observation=await page.snapshot();await fs.writeFile(path.join(config.outDir,key,'entry-recovery-observation.txt'),observation);const stateNow=await page.evaluate(sel=>({editor:!!document.querySelector('[aria-label="编辑区"]'),button:!!document.querySelector(sel),busy:document.querySelector(sel)?.getAttribute('aria-busy')}),selector);
    if(stateNow.editor||!stateNow.button||stateNow.busy==='true')throw error;
    await page.click(selector,{label:'按当前收起状态重新打开本轮工程'});await page.waitForFunction(()=>document.querySelectorAll('.ed-track-row').length>0,undefined,{timeout:20000});
   }
   if(!e.editorId){const ids=[...new Set((e.resultFiles||[]).map(f=>f.project_id).filter(Boolean))];if(ids.length===1)e.editorId=ids[0];else{const list=await api('/cloud-tool-api/v1/editor/projects?conversation_id='+e.conversationId+'&limit=100');assert.equal(list.items.length,1);e.editorId=list.items[0].project_id;}await save();}
   const doc=await project(key);await write(key,'native-project',doc);await expanded();const view=await base.inspect(key);return{view,doc};
  },
  async baseline(key){
   const e=state.cases[key],{view,doc}=await this.inspect(key);e.baseline=doc;e.initialShape=view.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label)}));e.videoTrackId=doc.content.tracks.find(t=>t.type==='video'&&t.clips.length)?.track_id;assert.ok(e.videoTrackId,'原生交付没有可编辑视频');
   if(e.definition.expectedRows)check(key,'原生轨道组合',view.rows.length===e.definition.expectedRows,view.rows.map(x=>x.name));
   const video=doc.content.tracks.find(t=>t.track_id===e.videoTrackId);e.nativeBgmTrackId=doc.content.tracks.find(t=>t.type==='audio'&&t.role==='background')?.track_id||null;
   const profile=e.profile||definition(key).profile,input=e.uploadedFiles?.find(f=>f.name===e.source.name),resultVideo=e.resultFiles?.find(f=>f.kind==='video');
   const expectedSource=['E','G'].includes(profile)?resultVideo?.file_id:input?.file_id;
   check(key,'编辑对象为本例原片或明确生成结果',!!expectedSource&&video.clips.every(c=>c.file_id===expectedSource),{expectedSource,actual:video.clips.map(c=>c.file_id)});
   const duration=Math.max(...video.clips.map(c=>c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1)));
   if(profile==='H')check(key,'高光最终编辑基线为30秒',Math.abs(duration-30)<=1/30,duration);
   if(profile==='C')check(key,'清理最终基线与删除后的源区间对应',duration<59&&video.clips.length>1,{duration,sourceRanges:video.clips.map(c=>[c.source_in_sec,c.source_out_sec])});
   if(['T1','T2'].includes(e.profile||definition(key).profile))check(key,'原生BGM存在，关联以实际操作验收',!!e.nativeBgmTrackId,view.rows.map(r=>r.name));
   const points=video.clips.length===1?[Math.min(2,(video.clips[0].source_out_sec-video.clips[0].source_in_sec)/2)]:[video.clips[0].timeline_start_sec+.5];
   for(const t of points){const preview=await base.seek(key,t);if((e.profile||definition(key).profile)==='T1'&&/[a-zA-Z]{4,}/.test(preview.text||''))e.knownIssueObserved={id:'FWXC-693',scope:'译文模式的已知显示差异另列保留，本变体只验时间编辑/隔离，不宣称该缺陷修复。',preview:preview.text};await base.playback(key,t);}
   e.stage='Baseline verified';await save();await shot(key,e.failures.length?'baseline-failure':'baseline-verified');return{key,failures:e.failures,rows:view.rows.map(r=>r.name),video:e.videoTrackId,bgm:e.nativeBgmTrackId};
  },
  async readUI(key){await current(key);return page.evaluate(()=>({rows:[...document.querySelectorAll('.ed-track-row')].map(r=>({track:r.dataset.trackId,name:r.querySelector('.ed-track-name')?.textContent,clips:[...r.querySelectorAll('.ed-timeline-clip')].map(c=>({aria:c.getAttribute('aria-label'),id:c.dataset.clipId,rect:c.getBoundingClientRect().toJSON()}))})),buttons:[...document.querySelectorAll('.ed-timeline button')].map(b=>({name:b.getAttribute('aria-label'),title:b.title,disabled:b.disabled}))}));},
  async importAudio(key,kind){
   assert.ok(['D','B'].includes(kind));const e=state.cases[key];assert.ok(e.runStatus==='done'&&e.baseline);e.audio??={};assert.ok(!e.audio[kind],'不能重复导入同一操作');await current(key);const before=await project(key);
   const panel='[aria-label="编辑器功能"] button[data-tab="media"]';if(!await page.evaluate(s=>document.querySelector(s)?.getAttribute('aria-expanded')==='true',panel))await page.click(panel,{label:'打开媒体导入独立声音'});
   e.audio[kind]={importIntent:new Date().toISOString(),name:media[kind].name};await save();const pending=page.waitForFileChooser({timeout:10000});await page.click('button[aria-label="导入素材"]',{label:'登记本例独立声音素材'});await(await pending).setFiles(media[kind].path);
   if(await page.evaluate(()=>Boolean(document.querySelector('input[aria-label="搜索素材"]')))){await page.fill('input[aria-label="搜索素材"]',media[kind].name);await page.click('button[aria-label="搜索"]',{label:'搜索本例刚登记的独立声音'});}
   await page.waitForSelector('.ed-media-card[title="'+media[kind].name+'"]',{state:'visible',timeout:60000});const after=await project(key);await write(key,kind+'-registration-before',before);await write(key,kind+'-registration-after',after);check(key,kind+'登记不改变时间轴',JSON.stringify(businessTracks(before))===JSON.stringify(businessTracks(after)),after.content.tracks.length);e.audio[kind].registered=true;await save();await shot(key,kind+'-registered');return{key,kind,registered:true};
  },
  async placeAudio(key,kind){
   const e=state.cases[key],a=e.audio?.[kind];assert.ok(a?.registered&&!a.placementIntent,'已有放入意图或尚未登记');await current(key);const before=await project(key),ids=new Set(before.content.tracks.map(t=>t.track_id)),at=kind==='D'?6:2;
   await expanded();a.placementIntent=new Date().toISOString();await save();
   const point=await page.evaluate(at=>{const s=document.querySelector('.ed-timeline-scroll').getBoundingClientRect(),r=document.querySelector('.ed-ruler-lane').getBoundingClientRect(),v=document.querySelector('.ed-track-video .ed-timeline-clip').getBoundingClientRect();return{x:r.x+at*v.width/20-s.x,y:s.height-12}},at);
   await page.dragAndDrop('.ed-media-card[title="'+media[kind].name+'"]','.ed-timeline-scroll',{targetPosition:point,label:'放入独立声音到新的音频轨'});let after=await waitContent(key,before),added=after.content.tracks.filter(t=>!ids.has(t.track_id));assert.equal(added.length,1,'未形成唯一独立音频轨，停止避免重放');a.trackId=added[0].track_id;
   const c=added[0].clips[0];a.fileId=c.file_id;await save();await expanded();
   if(Math.abs(c.timeline_start_sec-at)>.004&&Math.abs(c.timeline_start_sec-at)<.12)await this.moveTrack(key,a.trackId,at-c.timeline_start_sec,'align-'+kind);
   after=await project(key);const actual=after.content.tracks.find(t=>t.track_id===a.trackId).clips[0];check(key,kind+'独立实例及位置',Math.abs(actual.timeline_start_sec-at)<=1/30&&Math.abs(actual.source_in_sec)<.001&&Math.abs(actual.source_out_sec-12)<.001,actual);
   check(key,kind+'放入不改原有轨',unchangedTracks(before,after),null);a.placed=true;await save();await shot(key,kind+'-placed');return{key,kind,trackId:a.trackId,start:actual.timeline_start_sec};
  },
  async moveTrack(key,trackId,delta,tag){
   const before=await project(key);const track=before.content.tracks.find(t=>t.track_id===trackId);assert.ok(track?.clips.length);const clip=track.clips[0],selector='.ed-track-row[data-track-id="'+trackId+'"] .ed-timeline-clip';
   await expanded();const r=await page.evaluate(sel=>document.querySelector(sel).getBoundingClientRect().toJSON(),selector),duration=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1),px=r.width/duration;
   await page.keyboard.press('Escape');await page.keyboard.down('Alt');try{await page.mouse.move(r.x+Math.min(r.width*.35,40),r.bottom-5);await page.mouse.down();await page.mouse.move(r.x+Math.min(r.width*.35,40)+Math.sign(delta)*10,r.bottom-5);await page.mouse.move(r.x+Math.min(r.width*.35,40)+delta*px,r.bottom-5,{label:'主体平移目标片段并核对关联'});await page.mouse.up();}finally{await page.keyboard.up('Alt');}
   const after=await waitContent(key,before);await write(key,tag+'-before',before);await write(key,tag+'-after',after);await shot(key,tag);assert.notDeepEqual(businessTracks(after),businessTracks(before),'拖动未产生内容变化，先观察指针命中，不得撤销上一操作');return{before,after};
  },
  async historyStep(key,which,expected,tag){
   await current(key);const selector='button[aria-label="'+which+'"]';assert.ok(!await page.evaluate(s=>document.querySelector(s)?.disabled,selector),which+'不可用');await page.click(selector,{label:which+'本次编辑并核对结果'});
   const wanted=JSON.stringify(businessTracks(expected)),deadline=Date.now()+15000;let after;
   do{after=await project(key);if(JSON.stringify(businessTracks(after))===wanted)break;await new Promise(r=>setTimeout(r,300));}while(Date.now()<deadline);
   const matches=JSON.stringify(businessTracks(after))===wanted;check(key,tag,matches,null);await write(key,tag,after);
   if(matches){const audio=expected.content.tracks.filter(t=>t.type==='audio'&&t.clips.length).map(t=>({id:t.track_id,muted:!!t.muted}));await page.waitForFunction(audio=>audio.every(t=>{const b=document.querySelector('.ed-track-row[data-track-id="'+t.id+'"] .ed-track-heading button');return b&&!b.disabled&&(b.getAttribute('aria-label')||'').endsWith(t.muted?'启用':'静音')}),audio,{timeout:10000});}
   return after;
  },
  async persist(key,expected,tag){
   const e=state.cases[key];await page.reload();await page.waitForSelector('[data-agent-run-id="'+e.runId+'"] button[aria-label="进入编辑器"]',{state:'visible',timeout:30000});await this.inspect(key);const after=await project(key);check(key,tag,JSON.stringify(businessTracks(after))===JSON.stringify(businessTracks(expected)),null);await this.verifyUIRanges(key,expected);await shot(key,tag);return after;
  },
  async verifyUIRanges(key,expected){
   const e=state.cases[key],end=Math.max(...expected.content.tracks.filter(t=>['video','audio'].includes(t.type)).flatMap(t=>t.clips.map(c=>c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1))));
   for(let i=0;i<7;i++){
    const layout=await page.evaluate(()=>{const parse=s=>{const m=s?.match(/(\d+):(\d{2})\.(\d{2})[–-](\d+):(\d{2})\.(\d{2})$/);return m?[Number(m[1])*60+Number(m[2])+Number(m[3])/100,Number(m[4])*60+Number(m[5])+Number(m[6])/100]:null};const clips=[...document.querySelectorAll('.ed-track-video .ed-timeline-clip')].map(x=>({r:x.getBoundingClientRect(),p:parse(x.getAttribute('aria-label'))})).filter(x=>x.p&&x.p[1]-x.p[0]>=1).sort((a,b)=>(b.p[1]-b.p[0])-(a.p[1]-a.p[0]));return{px:clips[0]?clips[0].r.width/(clips[0].p[1]-clips[0].p[0]):null,width:document.querySelector('.ed-timeline-scroll')?.clientWidth}});
    assert.ok(layout.px&&layout.width,'需要真实可见时间轴才能核验');if(end*layout.px<=layout.width-90)break;await page.click('button[aria-label="缩小时间轴"]',{label:'缩小时间轴完整核对全部片段'});
   }
   await base.seek(key,0);const ui=await page.evaluate(()=>[...document.querySelectorAll('.ed-track-row')].map(row=>({id:row.dataset.trackId,name:row.querySelector('.ed-track-name')?.textContent,labels:[...row.querySelectorAll('.ed-timeline-clip')].map(c=>c.getAttribute('aria-label'))})));
   const parse=s=>{const m=s?.match(/(\d+):(\d{2})\.(\d{2})[–-](\d+):(\d{2})\.(\d{2})$/);return m?[Number(m[1])*60+Number(m[2])+Number(m[3])/100,Number(m[4])*60+Number(m[5])+Number(m[6])/100]:null;};const comparisons=[];
   for(const track of expected.content.tracks.filter(t=>['video','audio'].includes(t.type)&&t.clips.length)){
    const row=ui.find(r=>r.id===track.track_id),actual=(row?.labels||[]).map(parse).filter(Boolean).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),ranges=track.clips.map(c=>[c.timeline_start_sec,c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1)]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const passed=actual.length===ranges.length&&actual.every((r,i)=>r.every((n,j)=>Math.abs(n-ranges[i][j])<=.015));comparisons.push({trackId:track.track_id,name:row?.name,role:track.role,passed,expected:ranges,actual});
   }
   check(key,'重开后页面全部视频音频片段时码与保存结果一致',comparisons.every(c=>c.passed),comparisons);e.uiPersistVerifiedAt=new Date().toISOString();await write(key,'saved-ui-ranges',{comparisons,ui});await save();return comparisons;
  },
  async recheckUI(key){
   const e=state.cases[key];assert.ok(['Executed','Prerequisite failed'].includes(e?.stage)&&!key.startsWith('082-')&&!e.uiPersistVerifiedAt,'只补核验尚未记录的实际重开界面');const originalStage=e.stage;await base.resume(key);await this.inspect(key);
   let expected=e.baseline;for(const name of ['operation-after','native-BGM-plus1-after']){try{expected=JSON.parse(await fs.readFile(path.join(artifactDir(key),name+'.json'),'utf8'));break;}catch(error){if(error.code!=='ENOENT')throw error;}}
   await this.verifyUIRanges(key,expected);e.stage=originalStage;e.status=e.failures.length?'Failed':'Passed';await save();await shot(key,'saved-ui-range-verified');return{key,status:e.status,failures:e.failures};
  },
  async editMusic(key){
   assert.equal(key,'081-T1');const e=state.cases[key];assert.ok(e.audio?.D?.placed&&e.audio?.B?.placed&&!e.editIntent);e.editIntent=new Date().toISOString();await save();
   const m=e.audio.B.trackId,v=e.videoTrackId,b=e.nativeBgmTrackId;assert.ok(b);const first=await this.moveTrack(key,m,1,'independent-music-plus1');
   const get=(d,id)=>d.content.tracks.find(t=>t.track_id===id).clips[0];check(key,'独立音乐移动到3～15秒',Math.abs(get(first.after,m).timeline_start_sec-3)<=1/30,get(first.after,m));check(key,'独立音乐不带动视频及所有其他轨',unchangedTracks(first.before,first.after,[m]),null);
   await this.historyStep(key,'撤销',first.before,'undo-independent-music');
   const second=await this.moveTrack(key,b,1,'native-BGM-plus1');check(key,'原生BGM从0平移到1秒',Math.abs(get(second.after,b).timeline_start_sec-get(second.before,b).timeline_start_sec-1)<=1/30,get(second.after,b));check(key,'原生BGM移动同步视频加1秒',Math.abs(get(second.after,v).timeline_start_sec-get(second.before,v).timeline_start_sec-1)<=1/30,get(second.after,v));check(key,'原生BGM移动不改变字幕原声译声独立B和D',unchangedTracks(second.before,second.after,[b,v]),changedTrackRanges(second.before,second.after,[b,v]));
   await shot(key,e.failures.length?'failure':'music-identity-verified');e.status=e.failures.length?'Failed':'Passed';e.stage='Executed';await save();return{key,status:e.status,failures:e.failures};
  },
  async finalizeMusic(key){
   assert.equal(key,'081-T1');const e=state.cases[key];assert.ok(e?.stage==='Executed'&&!e.musicPersistVerifiedAt);const before=JSON.parse(await fs.readFile(path.join(artifactDir(key),'native-BGM-plus1-before.json'),'utf8')),after=JSON.parse(await fs.readFile(path.join(artifactDir(key),'native-BGM-plus1-after.json'),'utf8'));
   await this.historyStep(key,'撤销',before,'native-BGM-undo');await this.historyStep(key,'重做',after,'native-BGM-redo');await this.persist(key,after,'failure-after-reopen');e.musicPersistVerifiedAt=new Date().toISOString();e.stage='Executed';e.status=e.failures.length?'Failed':'Passed';await save();return{key,status:e.status,failures:e.failures};
  },
  async edit(key){
   if(key==='081-T1')return this.editMusic(key);
   const e=state.cases[key],spec=definition(key);assert.ok(['split','move','trim-head','trim-tail'].includes(spec.operation));assert.ok(e.baseline&&e.stage==='Baseline verified'&&!e.editIntent,'变体已执行或前置不足');
   if(e.failures?.length){e.status='Failed';e.stage='Prerequisite failed';e.unexecuted=['时间编辑','撤销重做','保存重开'];await save();await shot(key,'failure');return{key,status:e.status,failures:e.failures,unexecuted:e.unexecuted};}
   const before=await project(key),v=before.content.tracks.find(t=>t.track_id===e.videoTrackId);let index=v.clips.findIndex((c,i)=>{const d=(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1);if(d<4)return false;if(spec.operation!=='move')return true;const s=c.timeline_start_sec+1,end=s+d;return !v.clips.some((other,j)=>j!==i&&s<other.timeline_start_sec+(other.source_out_sec-other.source_in_sec)/(other.playback_rate||1)-.001&&end>other.timeline_start_sec+.001);});
   if(index<0&&spec.operation==='move'&&!e.movePreparationIntent){await this.prepareMoveSpace(key);return this.edit(key);}
   assert.ok(index>=0,'没有至少4秒且目标无碰撞的视频片段；不能把碰撞行为冒充主体平移');const c=v.clips[index],rate=c.playback_rate||1,d=(c.source_out_sec-c.source_in_sec)/rate,s=c.timeline_start_sec,end=s+d,h=Math.floor((s+d/2)*(spec.profile==='G'?24:30))/(spec.profile==='G'?24:30);
   e.target={trackId:v.track_id,index,clip:c,splitAt:h,operation:spec.operation};e.editIntent=new Date().toISOString();await save();await write(key,'operation-before',before);
   await expanded();const sel='.ed-track-row[data-track-id="'+v.track_id+'"] .ed-timeline-clip';
   if(spec.operation==='split'){
    await base.seek(key,h);const selected=await clipSelector(v.track_id,c),r=await page.evaluate(s=>document.querySelector(s).getBoundingClientRect().toJSON(),selected);await page.mouse.click(r.x+Math.min(18,r.width/4),r.y+r.height*.5,{label:'选中本例视频片段进行分割'});await page.click('button[aria-label="分割所选片段"]',{label:'在中点分割选中视频片段'});
   }else{
    await base.seek(key,s+(spec.operation==='trim-tail'?d-.6:spec.operation==='move'?Math.min(2,d/2):Math.min(1,d/2)));
    const selected=await clipSelector(v.track_id,c),r=await page.evaluate(s=>document.querySelector(s).getBoundingClientRect().toJSON(),selected),px=r.width/d;await page.keyboard.press('Escape');await page.keyboard.down('Alt');
    try{
     if(spec.operation==='move'){const x=r.x+Math.min(40,r.width*.35),y=r.bottom-5;await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+10,y);await page.mouse.move(x+px,y,{label:'视频主体向右平移一秒'});}
     else{const head=spec.operation==='trim-head';const handles=await page.evaluate(sel=>[...document.querySelector(sel).querySelectorAll('.ed-trim-handle')].map(x=>({cls:x.className,rect:x.getBoundingClientRect().toJSON()})),selected);const handle=handles.find(x=>x.cls.includes(head?'is-start':'is-end'));assert.ok(handle,'页面没有对应裁剪边缘');const x=handle.rect.x+handle.rect.width/2,y=handle.rect.y+handle.rect.height/2;await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+(head?1:-1)*px*.5,y,{label:head?'裁剪视频左边缘半秒':'裁剪视频右边缘半秒'});}
     await page.mouse.up();
    }finally{await page.keyboard.up('Alt');}
   }
   const after=await waitContent(key,before);await write(key,'operation-after',after);
   if(JSON.stringify(businessTracks(after))===JSON.stringify(businessTracks(before))){await shot(key,'gesture-no-content-change');throw Error('操作未产生内容变化，先观察目标命中/提示，不得撤销上一项准备操作');}
   const normalize=x=>{const z=structuredClone(x);for(const t of z.content.tracks)for(const c of t.clips||[])delete c.clip_id;return z.content.tracks;};
   const expected=structuredClone(before);const targets=[v.track_id,...(e.nativeBgmTrackId?[e.nativeBgmTrackId]:[])];
   for(const tid of targets){const track=expected.content.tracks.find(t=>t.track_id===tid);const i=tid===v.track_id?index:track.clips.findIndex(c=>c.timeline_start_sec<=h&&c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1)>h);assert.ok(i>=0,'对应BGM没有覆盖目标点');const clip=track.clips[i],r=clip.playback_rate||1;
    if(spec.operation==='move')clip.timeline_start_sec+=1;
    else if(spec.operation==='trim-head'){clip.timeline_start_sec+=.5;clip.source_in_sec+=.5*r;}
    else if(spec.operation==='trim-tail')clip.source_out_sec-=.5*r;
    else{const right=structuredClone(clip),cut=clip.source_in_sec+(h-clip.timeline_start_sec)*r;clip.source_out_sec=cut;right.source_in_sec=cut;right.timeline_start_sec=h;track.clips.splice(i+1,0,right);}
   }
   const expectedTracks=normalize(expected),actualTracks=normalize(after);const targetMatches=tid=>{const a=actualTracks.find(t=>t.track_id===tid),b=expectedTracks.find(t=>t.track_id===tid);if(!a||a.clips.length!==b.clips.length)return false;return a.clips.every((clip,i)=>{const target=b.clips[i];return ['timeline_start_sec','source_in_sec','source_out_sec'].every(k=>Math.abs((clip[k]||0)-(target[k]||0))<=1/30+.001)&&clip.file_id===target.file_id&&(clip.playback_rate||1)===(target.playback_rate||1);});};
   check(key,'目标视频的时间和源范围正确',targetMatches(v.track_id),after.content.tracks.find(t=>t.track_id===v.track_id).clips.map(c=>({start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec})));
   if(e.nativeBgmTrackId)check(key,'视频操作同步对应原生BGM',targetMatches(e.nativeBgmTrackId),after.content.tracks.find(t=>t.track_id===e.nativeBgmTrackId).clips.map(c=>({start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec})));
   check(key,'字幕原声译声和同轨非目标保持',unchangedTracks(before,after,targets)&&v.clips.every((clip,i)=>i===index||JSON.stringify(clip)===JSON.stringify(after.content.tracks.find(t=>t.track_id===v.track_id).clips.find(c=>c.clip_id===clip.clip_id))),changedTrackRanges(before,after,targets));
   await this.verifyPreviewMapping(key,after,spec.operation==='trim-head'?s+.6:spec.operation==='trim-tail'?end-.6:spec.operation==='move'?s+1.5:h+.25);
   await shot(key,e.failures.length?'failure':'operation-verified');
   if(spec.operation==='split'){await this.playWindow(key,Math.max(0,h-1),h+1);}
   else{await base.seek(key,Math.min(s+1.5,end-.5));await base.playback(key,Math.min(s+1.5,end-.5));}
   await this.historyStep(key,'撤销',before,'undo-restores-baseline');await this.historyStep(key,'重做',after,'redo-restores-edit');await this.persist(key,after,'refresh-preserves-edit');
   e.status=e.failures.length?'Failed':'Passed';e.stage='Executed';await save();await shot(key,e.failures.length?'failure-after-reopen':'verified');return{key,status:e.status,failures:e.failures};
  },
  async playWindow(key,start,end){
   await base.seek(key,start);await page.click('button[aria-label="预览播放"]',{label:'连续播放跨越分割点前后各一秒'});await page.waitForFunction(t=>Number(document.querySelector('input[aria-label="预览播放进度"]')?.value)>=t,end,{timeout:30000});
   if(state.cases[key].operation==='trim-tail'){
    await page.waitForFunction(()=>Boolean(document.querySelector('button[aria-label="预览播放"]')),undefined,{timeout:30000});
   }else if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="预览暂停"]')))){
    try{await page.click('button[aria-label="预览暂停"]',{label:'结束跨切点连续预览核验'});}
    catch(error){const ended=await page.evaluate(t=>!!document.querySelector('button[aria-label="预览播放"]')&&Number(document.querySelector('input[aria-label="预览播放进度"]')?.value)>=t,end);if(!ended)throw error;}
   }
   const actual=await page.evaluate(()=>({time:Number(document.querySelector('input[aria-label="预览播放进度"]')?.value),videos:[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({time:v.currentTime,ready:v.readyState,width:v.videoWidth,height:v.videoHeight}))}));check(key,'连续预览跨越切点前后各1秒',actual.time>=end,actual);await write(key,'cross-split-playback',{start,end,actual});await shot(key,'cross-split-playback');await save();return actual;
  },
  async verifyPreviewMapping(key,doc,time){
   const e=state.cases[key],track=doc.content.tracks.find(t=>t.track_id===e.videoTrackId),clip=track.clips.find(c=>time>=c.timeline_start_sec&&time<c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1));assert.ok(clip,'核验点必须位于目标视频片段内');const expected=clip.source_in_sec+(time-clip.timeline_start_sec)*(clip.playback_rate||1);
   await base.seek(key,time);let ready=true;try{await page.waitForFunction(t=>{const v=document.querySelector('[aria-label="工程实时预览"] video');return v?.readyState>=2&&!v.seeking&&Math.abs(v.currentTime-t)<=.04},expected,{timeout:15000});}catch{ready=false;}
   const actual=await page.evaluate(()=>[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({time:v.currentTime,ready:v.readyState,seeking:v.seeking,width:v.videoWidth,height:v.videoHeight})));check(key,'预览映射到编辑后的源视频时间',ready,{playhead:time,expectedSourceTime:expected,actual});await write(key,'preview-source-mapping',{playhead:time,expectedSourceTime:expected,actual});await save();return{ready,expected,actual};
  },
  async supplement(key){
   const e=state.cases[key];assert.ok(e?.stage==='Executed'&&e.operation==='split'&&e.target,'仅补核验已经实际分割的结果');assert.ok(!e.supplementedAt,'本例补充核验已完成');
   await base.resume(key);await this.inspect(key);const doc=await project(key);await this.verifyPreviewMapping(key,doc,e.target.splitAt+.25);await this.playWindow(key,e.target.splitAt-1,e.target.splitAt+1);await this.verifyUIRanges(key,doc);
   e.supplementedAt=new Date().toISOString();e.stage='Executed';e.status=e.failures.length?'Failed':'Passed';await save();await shot(key,e.failures.length?'failure-after-reopen':'verified');return{key,status:e.status,supplemented:true};
  },
  async prepareMoveSpace(key){
   const e=state.cases[key],spec=definition(key);assert.ok(spec.operation==='move'&&!e.editIntent&&!e.movePreparationIntent);const before=await project(key),v=before.content.tracks.find(t=>t.track_id===e.videoTrackId);let lastLong=-1;for(let i=0;i<v.clips.length;i++)if((v.clips[i].source_out_sec-v.clips[i].source_in_sec)/(v.clips[i].playback_rate||1)>=4)lastLong=i;
   assert.ok(lastLong>=0&&lastLong<v.clips.length-1,'没有可以保留的长原生片段');const tails=v.clips.slice(lastLong+1);assert.ok(tails.every(c=>(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1)<1),'不能为了准备平移删除其他长片段');e.movePreparationIntent={at:new Date().toISOString(),reason:'本例独立副本移除末尾不足1秒残片，保留最后一个至少4秒的原生片段，建立+1秒无碰撞目标。',removed:tails.map(c=>({id:c.clip_id,start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec}))};await write(key,'move-preparation-before',before);await save();
   for(let i=v.clips.length-1;i>lastLong;i--){
    const previous=await project(key),tail=v.clips[i];await base.seek(key,tail.timeline_start_sec+Math.min(.05,(tail.source_out_sec-tail.source_in_sec)/2));const selector=await clipSelector(v.track_id,tail);await page.focus(selector);await page.press(selector,'Enter');await page.keyboard.press('Delete');const after=await waitContent(key,previous);assert.equal(after.content.tracks.find(t=>t.track_id===v.track_id).clips.length,i,'准备删除未完成，不能继续或重复删除');
   }
   const after=await project(key),target=after.content.tracks.find(t=>t.track_id===v.track_id);assert.deepEqual(target.clips,v.clips.slice(0,lastLong+1),'准备步骤改变了需保留的视频片段');e.nativeCardInitialShape=e.initialShape;e.nativeCardBaseline=e.baseline;e.baseline=after;const ui=await this.readUI(key);e.initialShape=ui.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.aria)}));e.movePreparationCompletedAt=new Date().toISOString();await write(key,'move-preparation-after',after);await save();await shot(key,'move-preparation-ready');return{key,removed:tails.length,targetStart:target.clips.at(-1).timeline_start_sec};
  },
  async history(){
   const keys=['082-S1','082-T1'];assert.ok(keys.every(k=>state.cases[k]?.runStatus==='done'&&state.cases[k]?.baseline),'两个本次原生工程必须完成');assert.equal(state.cases[keys[0]].conversationId,state.cases[keys[1]].conversationId);
   const results=[];for(const refresh of [false,true]){
    if(refresh){await page.reload();await page.waitForSelector('[data-agent-run-id="'+state.cases['082-T1'].runId+'"]',{state:'attached',timeout:30000});}
    for(const key of ['082-S1','082-T1','082-S1']){
     const e=state.cases[key];await current(key);if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起编辑区"]')))){await page.click('button[aria-label="收起编辑区"]',{label:'返回同会话选择指定历史产物'});await page.waitForSelector('[aria-label="编辑区"]',{state:'hidden',timeout:10000});}
     const selector='[data-agent-run-id="'+e.runId+'"] button[aria-label="进入编辑器"]';await page.waitForSelector(selector,{state:'visible',timeout:30000});await page.click(selector,{label:'打开指定轮次对应的编辑工程'});await page.waitForSelector('[aria-label="编辑区"]',{state:'visible',timeout:20000});const{view,doc}=await this.inspect(key);
     const expectedShape=e.initialShape.map(r=>({name:r.name,clips:r.clips.map(c=>typeof c==='string'?c:c.label)}));check(key,(refresh?'刷新后':'历史切换')+'轨道与本轮基线保持',JSON.stringify(view.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label)})))===JSON.stringify(expectedShape),view.rows.map(r=>r.name));check(key,'历史源工程内容保持',JSON.stringify(businessTracks(doc))===JSON.stringify(businessTracks(e.baseline)),doc.project_id);
     await base.seek(key,10);await shot(key,(refresh?'history-refreshed':'history')+'-verified');results.push({key,refresh,editorId:doc.project_id,rows:view.rows.map(r=>r.name)});
    }
   }
   for(const key of keys){const e=state.cases[key];e.status=e.failures.length?'Failed':'Passed';e.stage='Executed';await write(key,'history-verification',results);}await save();return results;
  },
  async review(key){
   const e=state.cases[key],spec=definition(key);assert.ok(['C','H'].includes(spec.profile)&&e.runStatus==='waiting_for_confirmation'&&!e.reviewConfirmedAt);await current(key);const snapshot=await page.snapshot({scope:'full_page'});await shot(key,'review-before-confirmation');
   if(spec.profile==='H'){
    await page.waitForFunction(()=>{const t=document.querySelector('[aria-label="确认方案"]')?.innerText;return t&&/\d{2}:\d{2}\.\d{3}/.test(t)},undefined,{timeout:30000});
    const text=await page.evaluate(()=>document.querySelector('[aria-label="确认方案"]')?.innerText||'');const times=[...text.matchAll(/(\d{2}):(\d{2})\.(\d{3})/g)].map(x=>60*Number(x[1])+Number(x[2])+Number(x[3])/1000);assert.ok(times.length>=2&&times.length%2===0,'没有可核验高光区间');let duration=0;for(let i=0;i<times.length;i+=2){assert.ok(times[i]>=0&&times[i+1]<=60&&times[i+1]>times[i]);duration+=times[i+1]-times[i];}await write(key,'review-selection',{text,times,duration});
    if(Math.abs(duration-30)>1/30){
     const list=await api('/cloud-tool-api/v1/editor/projects?conversation_id='+e.conversationId+'&limit=100');assert.equal(list.items.length,1,'审核工程不唯一，不能调整');const pid=list.items[0].project_id,read=()=>api('/cloud-tool-api/v1/editor/projects/'+pid),before=await read(),track=before.content.tracks.find(t=>t.type==='video');assert.ok(track);let index=0;for(let i=1;i<track.clips.length;i++)if(track.clips[i].timeline_start_sec>track.clips[index].timeline_start_sec)index=i;const clip=track.clips[index],rate=clip.playback_rate||1,d=(clip.source_out_sec-clip.source_in_sec)/rate,end=clip.timeline_start_sec+d,delta=30-end;assert.ok(!e.reviewAdjustmentIntent,'已有审核调整意图，先观察现状不能重复拖动');assert.ok(clip.source_out_sec+delta*rate<=60&&clip.source_out_sec+delta*rate>clip.source_in_sec+1,'原片余量不足以安全调整至30秒');
     await base.seek(key,end-.5);await expanded();const reviewClip=await clipSelector(track.track_id,clip),geometry=await page.evaluate(sel=>{const clip=document.querySelector(sel),r=clip.getBoundingClientRect(),h=clip.querySelector('.ed-trim-handle.is-end').getBoundingClientRect();return{width:r.width,x:h.x+h.width/2,y:h.y+h.height/2}},reviewClip);
     e.reviewAdjustmentIntent={at:new Date().toISOString(),beforeDuration:end,target:30,delta,reason:'审核原方案为约30秒；使用页面允许的时间线调整满足本例30秒前置，不增加提示词。'};await save();await write(key,'review-adjustment-before',before);
     await page.keyboard.down('Alt');try{await page.mouse.move(geometry.x,geometry.y);await page.mouse.down();await page.mouse.move(geometry.x+delta*geometry.width/d,geometry.y,{label:'审核阶段调整高光至三十秒基线'});await page.mouse.up();}finally{await page.keyboard.up('Alt');}
     let after,actual;const deadline=Date.now()+15000;do{after=await read();actual=Math.max(...after.content.tracks.filter(t=>t.type==='video').flatMap(t=>t.clips.map(c=>c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1))));if(Math.abs(actual-30)<=1/30)break;await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);assert.ok(Math.abs(actual-30)<=1/30,'审核时间线未调整到30秒，保留现场');e.reviewAdjustedTo=actual;await write(key,'review-adjustment-after',after);await save();await shot(key,'review-adjusted-30s');
    }
    e.reviewConfirmedAt=new Date().toISOString();await save();await page.click('loc=role:button[name="审核确认"]',{label:'确认本轮三十秒原片高光方案'});
   }else{
    await page.waitForFunction(()=>Boolean(document.querySelector('[aria-label="文稿"]')?.innerText?.length>10&&[...document.querySelectorAll('button')].some(b=>b.innerText.trim()==='移除'&&!b.disabled)),undefined,{timeout:30000});
    const text=await page.evaluate(()=>document.querySelector('[aria-label="文稿"]')?.innerText||'');assert.ok(text.length>10,'本次清理审核没有正文');await write(key,'review-selection',{text});e.reviewConfirmedAt=new Date().toISOString();await save();await page.click('loc=role:button[name="移除"]',{label:'确认本轮原片口水词停顿清理'});
   }return{key,reviewConfirmedAt:e.reviewConfirmedAt};
  },
  async drive(key){
   const spec=definition(key);let e=state.cases[key];if(!e){await this.start(key);return{key,stage:'Submitted'};}
   if(e.stage==='Executed'||e.stage==='Prerequisite failed')return{key,status:e.status,stage:e.stage,failures:e.failures};
   if(!e.submittedAt)throw Error('已有准备检查点，请继续对应阶段，不能重复start');
   if(!done(e.runStatus)){
    const result=await this.observe(key);if(!done(state.cases[key].runStatus))return result;
   }
   e=state.cases[key];if(e.runStatus!=='done'){
    e.status=e.runError?.code==='insufficient_credits'?'Blocked':'Failed';e.unexecuted=['原生基线','时间编辑与恢复'];e.failures??=[];e.failures.push('原生准备任务未成功：'+e.runStatus);e.stage='Prerequisite failed';await save();await shot(key,'failure');return{key,status:e.status,error:e.runError};
   }
   if(!e.baseline)await this.baseline(key);
   if(['083','084','085'].includes(spec.caseId))return this.edit(key);
   return{key,stage:e.stage,failures:e.failures};
  },
  async wait(key){let result;const deadline=Date.now()+35000;do{result=await this.observe(key);if(!['running','queued','assigned','confirmation_approved','Acceptance not yet observed'].includes(result.status)&&!(result.status==='waiting_for_confirmation'&&state.cases[key].reviewConfirmedAt))break;await new Promise(r=>setTimeout(r,Math.min(4000,Math.max(0,deadline-Date.now()))));}while(Date.now()<deadline);return result;},
 };
 return ctx;
}
