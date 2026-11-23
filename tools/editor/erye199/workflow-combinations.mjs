import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {workflowContext} from './workflow-cards.mjs';

const S0={card:'添加字幕',prompt:'为这条视频添加原文字幕。',media:'F20',language:'不翻译',mode:'原文',expectedRows:3};
const S1={card:'添加字幕',prompt:'为这条视频添加简体中文字幕。',media:'F20',language:'简体中文',mode:'译文',expectedRows:3};
const T1={card:'翻译配音',prompt:'将这条视频翻译成简体中文配音，并显示简体中文字幕。',media:'F20',language:'简体中文',mode:'译文',expectedRows:5};
const T2={card:'翻译配音',prompt:'将这条视频翻译成简体中文配音，并显示中英双语字幕。',media:'F20',language:'简体中文',mode:'双语',expectedRows:5};
export const combinationDefinitions=Object.freeze({
 '076':{card:'AI 生视频',prompt:'固定镜头拍摄一只红色杯子放在木桌上，背景为浅灰色墙面。',media:null},
 '077':{card:'AI 生图',prompt:'白色背景上放置一只蓝色马克杯，正面视角。',media:null},
 '078-S0':S0,'078-S1':S1,'078-T2':T2,'079':T1,'080':T2,
});
const terminal=s=>['done','failed','cancelled','canceled','terminated'].includes(s);
export async function combinationContext(page,config){
 const base=await workflowContext(page,config),{state,media,save,write,shot,api}=base;
 function noOtherActive(key){for(const [id,e]of Object.entries(state.cases))if(id!==key&&e.submittedAt&&!terminal(e.runStatus))throw Error('另一原任务尚未终态：'+id);}
 async function current(key){assert.equal(new URL(await page.url()).pathname,'/c/'+state.cases[key]?.conversationId,'当前不是本例会话，先resume');}
 return {...base,
  async open(key){
   assert.ok(combinationDefinitions[key]);assert.ok(!['078-S1','078-T2'].includes(key),'078续轮必须prepareFollowup沿用原会话，不能open新会话');assert.ok(!state.cases[key],'已有检查点，不能重建或重发');noOtherActive(key);
   assert.ok(state.workspaceId,'必须先完成本轮专用测试项目');
   await page.goto(config.baseURL+'/?project_id='+encodeURIComponent(state.workspaceId));
   await page.waitForFunction(name=>document.querySelector('button[aria-label="切换项目"]')?.innerText?.trim()===name,state.workspaceName,{timeout:30000});
   const def=combinationDefinitions[key];await page.click(`button[aria-label="${def.card}"]`,{label:'选择本例原生功能卡片'});
   state.cases[key]={id:'ERYE199-'+key.slice(0,3),key,definition:def,startedAt:new Date().toISOString(),status:'In Progress',stage:'Configure',source:def.media?{...media[def.media]}:{name:'',generated:true},checks:[]};await save();return {key,stage:'Configure',definition:def};
  },
  async submit(key){
   const e=state.cases[key];assert.ok(e&&!e.submittedAt,'已有提交意图，不能重发');noOtherActive(key);
   if(e.definition.media)return base.submit(key);
   assert.equal(new URL(await page.url()).pathname,'/','无源生成必须从独立新会话首页发起');
   assert.equal(await page.evaluate(()=>[...document.querySelectorAll('button[aria-label^="移除 "]')].filter(x=>/\.(mp4|mov|png|jpg|jpeg|wav|mp3)$/i.test(x.getAttribute('aria-label'))).length),0,'无源任务不能附旧素材');
   await page.fill('[contenteditable="true"]',e.definition.prompt);await page.waitForFunction(()=>!document.querySelector('button[aria-label="发送"]')?.disabled,undefined,{timeout:30000});
   await shot(key,'before-submit');e.submittedAt=new Date().toISOString();e.stage='Submitting';await save();await page.click('button[aria-label="发送"]',{label:'仅提交本例生成原文一次'});
   await page.waitForFunction(()=>/\/c\/[0-9a-f-]+/.test(location.pathname),undefined,{timeout:30000});e.conversationId=new URL(await page.url()).pathname.split('/c/')[1];e.stage='Accepted';await save();return{key,conversationId:e.conversationId};
  },
  async prepareFollowup(key){
   assert.ok(['078-S1','078-T2'].includes(key));assert.ok(!state.cases[key],'本轮已有检查点，不能再次准备');noOtherActive(key);const previous=key==='078-S1'?'078-S0':'078-S1';const prior=state.cases[previous];assert.equal(prior?.runStatus,'done','上一轮未完成');
   await base.resume(previous);await page.waitForSelector('[data-agent-run-id="'+prior.runId+'"]',{state:'attached',timeout:30000});if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起编辑区"]'))))await page.click('button[aria-label="收起编辑区"]',{label:'返回同会话继续下一轮'});
   const def=combinationDefinitions[key];state.cases[key]={id:'ERYE199-078',key,definition:def,startedAt:new Date().toISOString(),status:'In Progress',stage:'Preparing followup',conversationId:prior.conversationId,previousRunIds:Object.values(state.cases).filter(x=>x.conversationId===prior.conversationId).map(x=>x.runId).filter(Boolean),source:{...media.F20},checks:[]};await save();
   await page.fill('[contenteditable="true"]','/');return {key,conversationId:prior.conversationId,needs:'choose native slash action'};
  },
  async submitFollowup(key){
   const e=state.cases[key];assert.ok(['078-S1','078-T2'].includes(key)&&e&&!e.submittedAt,'不重复提交本轮');assert.equal(e.stage,'Uploaded');noOtherActive(key);await current(key);
   const names=await page.evaluate(()=>[...document.querySelectorAll('button[aria-label^="移除 "]')].map(x=>x.getAttribute('aria-label').slice(3)).filter(x=>/\.mp4$/i.test(x)));assert.deepEqual(names,[e.source.name],'续轮唯一附件应为原F20');
   for(const label of ['目标语言：'+e.definition.language,'字幕显示模式：'+e.definition.mode])assert.ok(await page.evaluate(s=>Boolean(document.querySelector('button[aria-label="'+s+'"]')),label),'续轮模式没有选对');
   await page.fill('[contenteditable="true"]',e.definition.prompt);await page.waitForFunction(()=>{const b=document.querySelector('button[aria-label="发送"]');return b&&!b.disabled&&!document.querySelector('button[aria-label="停止任务"]')},undefined,{timeout:30000});
   await shot(key,'before-submit');e.submittedAt=new Date().toISOString();e.stage='Submitting';await save();await page.click('button[aria-label="发送"]',{label:'同会话一次提交下一轮原文'});return{key,conversationId:e.conversationId};
  },
  async selectFollowupCard(key){
   const e=state.cases[key];assert.ok(['078-S1','078-T2'].includes(key)&&e&&!e.submittedAt);await current(key);
   await page.waitForSelector('[data-agent-run-id="'+e.previousRunIds.at(-1)+'"]',{state:'attached',timeout:30000});await page.fill('[contenteditable="true"]','/');await page.click('loc=role:option[name*="'+e.definition.card+'"]',{label:'选择续轮原生功能卡片'});e.stage='Configure';await save();return base.configure(key);
  },
  async inspect(key){
   if(!key.startsWith('078-'))return base.inspect(key);
   const e=state.cases[key];assert.equal(e.runStatus,'done');await current(key);
   const selector='[data-agent-run-id="'+e.runId+'"] button[aria-label="进入编辑器"]';await page.waitForSelector(selector,{state:'visible',timeout:30000});
   if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起编辑区"]')))){await page.click('button[aria-label="收起编辑区"]',{label:'切回会话选择本轮历史结果'});await page.waitForSelector('[aria-label="编辑区"]',{state:'hidden',timeout:10000});}
   await page.click(selector,{label:'只打开本轮结果的编辑工程'});await page.waitForSelector('[aria-label="编辑区"]',{state:'visible',timeout:15000});
   await page.waitForFunction(()=>document.querySelectorAll('.ed-track-row').length>0&&document.querySelector('.ed-editor')?.getAttribute('aria-busy')!=='true',undefined,{timeout:30000});return base.inspect(key);
  },
  async mapping(key){
   if(!key.startsWith('078-'))return base.mapping(key);
   const e=state.cases[key];assert.equal(e.runStatus,'done');const ids=[...new Set(e.resultFiles.map(x=>x.project_id).filter(Boolean))];assert.equal(ids.length,1,'本轮产物工程身份不唯一');const project=await api('/cloud-tool-api/v1/editor/projects/'+ids[0]);e.editorId=project.project_id;await write(key,'project-readonly',project);
   const tracks=(project.content?.tracks||[]).map(t=>({type:t.type,role:t.role,clips:(t.clips||[]).map(c=>({fileId:c.file_id,sourceIn:c.source_in_sec,sourceOut:c.source_out_sec,start:c.timeline_start_sec,rate:c.playback_rate}))}));await write(key,'source-mapping',{projectId:e.editorId,sourceFileId:e.uploadedFiles.find(x=>x.name===e.source.name)?.file_id,tracks});await save();return{key,editorId:e.editorId,tracks};
  },
  async download(key){
   if(!key.startsWith('078-'))return base.download(key);const e=state.cases[key];assert.equal(e.runStatus,'done');assert.ok(!e.download,'已有下载，不重放');await current(key);const videos=e.resultFiles.filter(x=>x.kind==='video');assert.equal(videos.length,1);const selector='[data-agent-run-id="'+e.runId+'"] button.workspace-media-card-download';assert.equal(await page.evaluate(sel=>document.querySelectorAll(sel).length,selector),1,'本轮下载入口不唯一');const pending=page.waitForEvent('download',{timeout:60000});await page.click(selector,{label:'下载同会话这一轮独立成片'});const download=await pending,destination=path.join(config.outDir,key,'native-product.mp4');await download.saveAs(destination.replaceAll('\\','/'));e.download={name:videos[0].name,fileId:videos[0].file_id,path:destination};await save();return{key,download:e.download};
  },
  async observe(key){
   const e=state.cases[key];assert.ok(e?.submittedAt,'本例未提交');
   if(!e.conversationId)e.conversationId=new URL(await page.url()).pathname.split('/c/')[1];assert.ok(e.conversationId,'受理未知，保留原页，禁止重发');
   const messages=await api('/runtime-api/v1/conversations/'+e.conversationId+'/messages?limit=100');await write(key,'messages',messages);
   const users=(messages.messages||messages.items||[]).filter(m=>m.role==='user'&&m.run_id&&!(e.previousRunIds||[]).includes(m.run_id));assert.ok(users.length<=1,'同会话有多个未登记的新run，不能盲选');
   if(users[0]){e.runId=users[0].run_id;e.uploadedFiles=users[0].files;e.actualWorkspace=users[0].ext?.workspace_project;if(e.definition.media){const input=e.uploadedFiles.find(x=>x.name===e.source.name);assert.ok(input,'受理源片不是本例F20');assert.equal(input.content_sha256,e.source.sha256,'本例原片哈希不匹配');}else assert.equal(e.uploadedFiles?.length||0,0,'无参考生成却受理了附件');}
   if(!e.runId){await save();return{key,status:'Acceptance not yet observed'};}
   const run=await api('/runtime-api/v2/agent/runs/'+e.runId);await write(key,'run',run);assert.equal(run.conversation_id,e.conversationId);
   e.runStatus=run.status;e.runError=run.error;e.resultFiles=run.result_files;e.stage=run.status;await save();
   if(terminal(run.status)&&!e.terminalCaptured){await current(key);await shot(key,'task-terminal');e.terminalCaptured=true;await save();}
   return{key,status:run.status,error:run.error,runId:e.runId,clarifications:run.clarifications,files:run.result_files?.map(f=>({name:f.name,kind:f.kind,projectId:f.project_id}))};
  },
  async verifyBaseline(key){
   const e=state.cases[key];assert.equal(e.runStatus,'done');await current(key);const first=await this.inspect(key);const failures=[];e.checks=[];
   const check=(name,passed,actual)=>{e.checks.push({name,passed:!!passed,actual});if(!passed)failures.push(name);};
   const names=first.rows.map(r=>r.name),captions=first.rows.filter(r=>r.classes.includes('subtitle')),text=captions.flatMap(r=>r.clips.map(x=>x.text)).join(' ');
   check('本例源片工程对应',first.projectName?.includes(e.source.name),first.projectName);
   if(e.definition.expectedRows)check('原生轨数',first.rows.length===e.definition.expectedRows,names);
   if(e.definition.mode==='原文')check('原文字幕及英语内容',captions.length===1&&captions[0].name.includes('原文')&&/healthcare|health care|sabotage/i.test(text),text);
   else check('译文可编辑字幕',captions.length===1&&captions[0].name.includes('译文')&&/[\u4e00-\u9fff]/.test(text),text);
   if(e.definition.expectedRows===5)for(const [name,p]of [['BGM',/背景音乐|BGM/],['原声',/原声/],['译声',/配音|译声/]])check(name+'来源轨存在',names.some(x=>p.test(x)),names);
   const shape=v=>v.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label),controls:r.controls}));e.initialShape=shape(first);
   for(const t of [2,10]){const preview=await base.seek(key,t);if(e.definition.mode==='双语')check('双语对应显示-'+t,/[\u4e00-\u9fff]/.test(preview.text)&&/[a-zA-Z]{4,}/.test(preview.text),preview.text);else if(e.definition.mode==='译文'&&/[a-zA-Z]{4,}/.test(preview.text||'')){e.knownDisplayDifference??=[];e.knownDisplayDifference.push({time:t,text:preview.text,existingDefect:'FWXC-693'});}await base.playback(key,t);}
   e.failures=failures;e.stage='Baseline verified';await save();await shot(key,failures.length?'baseline-failure':'baseline-verified');return{key,failures,names,knownDisplayDifference:e.knownDisplayDifference};
  },
  async verifyGeneratedVideo(key){
   assert.equal(key,'076');const e=state.cases[key];assert.equal(e.runStatus,'done');await current(key);const oldChecks=e.checks;const view=await base.inspect(key),map=await base.mapping(key);const failures=[];if(oldChecks?.some(c=>!c.passed)){e.observerAdjustments??=[];e.observerAdjustments.push({reason:'生成工程允许通用名称；轨道保持按片段时码和控制状态核对，不按缩略图加载占位文字。非产品失败。',checks:oldChecks});}e.checks=[];
   const check=(name,passed,actual)=>{e.checks.push({name,passed:!!passed,actual});if(!passed)failures.push(name);};const video=(e.resultFiles||[]).find(f=>f.kind==='video');
   check('工程对应本次生成视频',e.editorId===video.project_id&&map.tracks.filter(t=>t.type==='video').every(t=>t.clips.every(c=>c.fileId===video.file_id)),{name:view.projectName,projectId:e.editorId,tracks:map.tracks});
   check('没有原片字幕或旧译配内容',!view.rows.some(r=>/字幕|配音|译声|背景音乐/.test(r.name)),view.rows.map(r=>r.name));
   check('实际预览5秒16比9',view.preview.some(v=>Math.abs(v.duration-5)<.05&&v.width===1280&&v.height===720),view.preview);
   for(const t of [.5,3]){await base.seek(key,t);await base.playback(key,t);}
   const shape=v=>v.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label),controls:r.controls}));e.initialShape=shape(view);
   await page.click('button[aria-label="收起编辑区"]',{label:'返回本轮生成结果'});const again=await base.inspect(key);check('重入同一生成工程',JSON.stringify(shape(again))===JSON.stringify(e.initialShape),again.projectName);
   await page.reload();await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});const refreshed=await base.inspect(key);check('刷新恢复本例工程',JSON.stringify(shape(refreshed))===JSON.stringify(e.initialShape),refreshed.projectName);
   e.failures=failures;e.stage='UI verified';await save();await shot(key,failures.length?'failure':'ui-verified');return{key,failures,checks:e.checks};
  },
  async verifyGeneratedImage(key){
   assert.equal(key,'077');const e=state.cases[key];assert.equal(e.runStatus,'done');await current(key);const image=e.resultFiles.find(f=>f.kind==='image');
   async function view(){await page.waitForFunction(id=>document.querySelector('canvas[aria-label="图片编辑画布"]')?.width>=512&&document.querySelector('[aria-label="编辑区"]')?.innerText?.includes(id)&&!document.querySelector('[aria-label="编辑区"]')?.innerText?.includes('此工程尚未导入图片'),image.project_id,{timeout:30000});return page.evaluate(()=>({title:document.querySelector('[aria-label="编辑区"] .ed-project-trigger')?.innerText,canvas:[...document.querySelectorAll('canvas[aria-label="图片编辑画布"]')].map(c=>({width:c.width,height:c.height})),text:document.querySelector('[aria-label="编辑区"]')?.innerText,videoTracks:document.querySelectorAll('.ed-track-row').length,videos:document.querySelectorAll('[aria-label="工程实时预览"] video').length}));}
   if(!await page.evaluate(()=>Boolean(document.querySelector('canvas[aria-label="图片编辑画布"]'))))await page.click('button[aria-label="进入编辑器"]',{label:'进入本轮生成图片编辑器'});
   const first=await view();await write(key,'image-editor-observation',first);await shot(key,'image-editor-verified');
   const failures=[];e.checks=[];const check=(name,passed,actual)=>{e.checks.push({name,passed:!!passed,actual});if(!passed)failures.push(name);};
   check('本例图片工程及画布',first.text.includes(image.project_id)&&first.canvas.length===1,first);check('图片没有混入旧视频时间轴',first.videoTracks===0&&first.videos===0,first);
   await page.click('button[aria-label="收起图片编辑器"]',{label:'返回本例蓝杯图片结果'});await page.click('button[aria-label="进入编辑器"]',{label:'重新进入本例图片工程'});const again=await view();check('返回重入图片保持',again.text.includes(image.project_id)&&JSON.stringify(again.canvas)===JSON.stringify(first.canvas),again);
   await page.reload();await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});if(!await page.evaluate(()=>Boolean(document.querySelector('canvas[aria-label="图片编辑画布"]'))))await page.click('button[aria-label="进入编辑器"]',{label:'刷新后重开本例图片工程'});const refreshed=await view();check('刷新图片工程保持',refreshed.text.includes(image.project_id)&&refreshed.videoTracks===0&&JSON.stringify(refreshed.canvas)===JSON.stringify(first.canvas),refreshed);
   e.editorId=image.project_id;e.imageView=refreshed;e.failures=failures;e.stage='UI verified';await save();await shot(key,failures.length?'failure':'ui-verified');
   if(!e.download){const pending=page.waitForEvent('download',{timeout:60000});await page.click('button[aria-label="下载"]',{label:'下载本轮实际蓝杯图片'});const download=await pending;const destination=path.join(config.outDir,key,'native-product.png');await download.saveAs(destination.replaceAll('\\','/'));e.download={name:image.name,fileId:image.file_id,path:destination};await save();}
   return{key,failures,checks:e.checks};
  },
  async verifyHistory(){
   for(const key of ['078-S0','078-S1','078-T2'])assert.equal(state.cases[key]?.runStatus,'done','三轮原任务未全部结束');
   await current('078-T2');for(const key of ['078-S0','078-S1','078-T2'])await page.waitForSelector('[data-agent-run-id="'+state.cases[key].runId+'"]',{state:'attached',timeout:30000});
   const results=[];
   for(const key of ['078-S0','078-S1','078-T2']){
    const e=state.cases[key],before=JSON.parse(await fs.readFile(path.join(config.outDir,key,'project-readonly.json'),'utf8'));
    const view=await this.inspect(key);const after=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);let same=true;try{assert.deepEqual(after.content,before.content);}catch{same=false;}
    const shape=view.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label),controls:r.controls}));const shapeSame=JSON.stringify(shape)===JSON.stringify(e.initialShape);const preview=await base.seek(key,10);await base.playback(key,10);
    e.history={projectId:e.editorId,contentUnchanged:same,visibleTracksUnchanged:shapeSame,names:view.rows.map(r=>r.name),preview};e.checks.push({name:'三轮后重开历史工程未被覆盖',passed:same&&shapeSame,actual:e.history});if(!same||!shapeSame)e.failures.push('三轮后历史工程被覆盖或显示其他工程');await write(key,'historical-verification',e.history);await shot(key,'historical-'+(same&&shapeSame?'verified':'failure'));e.stage='Historical verified';await save();results.push({key,...e.history});
   }
   return results;
  },
  async registerD(key){
   const e=state.cases[key];assert.ok(['079','080'].includes(key)&&e?.runStatus==='done'&&!e.DRegistrationTriggered,'本例不能重复导入D');await current(key);
   await base.mapping(key);const before=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);assert.equal(e.editorView?.rows.length,5,'先满足页面原生五轨，不能伪造补齐；不把内部未显示字幕源算作页面轨道');await write(key,'before-D-project',before);
   const panel='[aria-label="编辑器功能"] button[data-tab="media"]';if(!await page.evaluate(sel=>document.querySelector(sel)?.getAttribute('aria-expanded')==='true',panel))await page.click(panel,{label:'打开媒体素材面板'});
   e.DRegistrationTriggered=true;await save();const card='.ed-media-card[title="'+media.D.name+'"]';
   e.DPreviouslyRegistered=await page.evaluate(sel=>Boolean(document.querySelector(sel)),card);
   const pending=page.waitForFileChooser({timeout:10000});await page.click('button[aria-label="导入素材"]',{label:'登记独立音频D但不放入时间轴'});await(await pending).setFiles(media.D.path);
   await page.waitForSelector(card,{state:'visible',timeout:60000});const after=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);let unchanged=true;try{assert.deepEqual(after.content.tracks,before.content.tracks);}catch{unchanged=false;}
   e.DRegisteredWithoutPlacement=unchanged;e.checks.push({name:'登记D不自动放入或改变原五轨',passed:unchanged,actual:{before:before.content.tracks.length,after:after.content.tracks.length,previouslyRegistered:e.DPreviouslyRegistered}});if(!unchanged)e.failures.push('登记D后原五轨被改动');e.stage='D registered';await write(key,'D-registration',{unchanged,sourceName:media.D.name,sourceSha256:media.D.sha256,previouslyRegistered:e.DPreviouslyRegistered});await save();await shot(key,unchanged?'D-registered-no-placement':'D-registration-failure');return{key,unchanged,previouslyRegistered:e.DPreviouslyRegistered};
  },
  async placeD(key){
   const e=state.cases[key];assert.ok(['079','080'].includes(key)&&e.stage==='D registered'&&!e.DPlacementTriggered,'未登记或已经执行D放入，不能重放');await current(key);assert.ok(e.DRegisteredWithoutPlacement,'登记已改动时间轴，不能继续依赖步骤');const before=JSON.parse(await fs.readFile(path.join(config.outDir,key,'before-D-project.json'),'utf8')),ids=new Set(before.content.tracks.map(t=>t.track_id));
   const add='button[aria-label="将 '+media.D.name+' 添加到时间轴"]';const hasAdd=await page.evaluate(sel=>Boolean(document.querySelector(sel)),add);await base.seek(key,6);e.DPlacementTriggered=true;e.DPlacementMethod=hasAdd?'native-add-at-playhead':'native-drag-into-empty-timeline';await save();
   if(hasAdd)await page.click(add,{label:'在六秒位置添加独立音频D'});
   else {const point=await page.evaluate(()=>{const s=document.querySelector('.ed-timeline-scroll').getBoundingClientRect(),r=document.querySelector('.ed-ruler-lane').getBoundingClientRect(),v=document.querySelector('.ed-track-video .ed-timeline-clip').getBoundingClientRect();return{x:r.x+6*v.width/20-s.x,y:s.height-12}});await page.dragAndDrop('.ed-media-card[title="'+media.D.name+'"]','.ed-timeline-scroll',{targetPosition:point,label:'将D放入六秒处的独立音频新轨'});}
   let after,newTracks=[];const deadline=Date.now()+30000;do{after=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);newTracks=after.content.tracks.filter(t=>!ids.has(t.track_id));if(newTracks.length)break;await new Promise(r=>setTimeout(r,750));}while(Date.now()<deadline);
   await write(key,'after-D-project',after);e.DNewTracks=newTracks;e.stage='D placed';await save();await shot(key,newTracks.length?'D-placed':'D-placement-failure');return{key,method:e.DPlacementMethod,newTracks};
  },
  async alignD(key){
   const e=state.cases[key];await current(key);assert.equal(e.DNewTracks?.length,1);const id=e.DNewTracks[0].track_id;const doc=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);const c=doc.content.tracks.find(t=>t.track_id===id).clips[0];if(Math.abs(c.timeline_start_sec-6)<.005)return{key,start:c.timeline_start_sec,alreadyAligned:true};
   const layout=await page.evaluate(trackId=>{const clip=document.querySelector('.ed-track-row[data-track-id="'+trackId+'"] .ed-timeline-clip').getBoundingClientRect(),scroll=document.querySelector('.ed-timeline-scroll').getBoundingClientRect(),split=document.querySelector('[aria-label="调整时间轴高度"]').getBoundingClientRect();return{clipped:clip.bottom>scroll.bottom-12,split:split.toJSON()}},id);if(layout.clipped){await page.mouse.move(layout.split.x+200,layout.split.y+4);await page.mouse.down();await page.mouse.move(layout.split.x+200,layout.split.y-100,{label:'展开时间轴显示独立D完整片段'});await page.mouse.up();}
   assert.ok(Math.abs(c.timeline_start_sec-6)<.1,'仅微调拖入时的一帧像素误差');const sel='.ed-track-row[data-track-id="'+id+'"] .ed-timeline-clip';const r=await page.evaluate(s=>document.querySelector(s).getBoundingClientRect().toJSON(),sel),delta=(6-c.timeline_start_sec)*r.width/12;await page.keyboard.press('Escape');await page.keyboard.down('Alt');try{await page.mouse.move(r.x+r.width*.35,r.y+r.height-5,{label:'定位独立D片段主体'});await page.mouse.down();await page.mouse.move(r.x+r.width*.35+20,r.y+r.height-5);await page.mouse.move(r.x+r.width*.35+delta,r.y+r.height-5,{label:'微调D起点到六秒一帧内'});await page.mouse.up();}finally{await page.keyboard.up('Alt');}let after;const end=Date.now()+15000;do{after=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);if(Math.abs(after.content.tracks.find(t=>t.track_id===id).clips[0].timeline_start_sec-6)<=1/30)break;await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);const actual=after.content.tracks.find(t=>t.track_id===id).clips[0];e.DPositionAdjustment={from:c.timeline_start_sec,to:actual.timeline_start_sec};await write(key,'D-position-adjustment',e.DPositionAdjustment);await save();return{key,...e.DPositionAdjustment};
  },
  async verifyD(key){
   const e=state.cases[key];await current(key);assert.equal(e.DNewTracks?.length,1);await base.inspect(key);const before=JSON.parse(await fs.readFile(path.join(config.outDir,key,'before-D-project.json'),'utf8'));const originalIds=new Set(before.content.tracks.map(t=>t.track_id));const dId=e.DNewTracks[0].track_id;const check=(name,passed,actual)=>{e.checks.push({name,passed:!!passed,actual});if(!passed)e.failures.push(name);};
   let currentProject=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);const d=currentProject.content.tracks.find(t=>t.track_id===dId),c=d.clips[0];check('D唯一实例与6～18秒源0～12秒（1帧内）',d.type==='audio'&&d.clips.length===1&&Math.abs(c.timeline_start_sec-6)<=1/30&&c.source_in_sec===0&&Math.abs(c.source_out_sec-12)<.005&&c.playback_rate===1&&currentProject.content.tracks.flatMap(t=>t.clips||[]).filter(x=>x.file_id===c.file_id).length===1,c);check('独立D不与视频关联',!d.linked_video_track_id,d.linked_video_track_id);
   const roles={O:before.content.tracks.find(t=>t.type==='audio'&&t.role==='source'),T:before.content.tracks.find(t=>t.type==='audio'&&t.role==='narration'),B:before.content.tracks.find(t=>t.type==='audio'&&t.role==='background'),D:d};
   const selectors={O:'.ed-track-heading button[aria-label^="原声"]',T:'.ed-track-heading button[aria-label^="配音"]',B:'.ed-track-row:not([data-track-id="'+dId+'"]) .ed-track-heading button[aria-label^="背景音乐"]',D:'.ed-track-row[data-track-id="'+dId+'"] .ed-track-heading button'};
   async function mute(role,want){const sel=selectors[role],label=await page.evaluate(s=>document.querySelector(s)?.getAttribute('aria-label'),sel);assert.ok(label?.endsWith('启用')||label?.endsWith('静音'),'声音控制不明确：'+role);if(label.endsWith('启用')===want)return;await page.click(sel,{label:'切换本例声音用于分别试听'});const end=Date.now()+15000;let saved=false;do{const p=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);if(Boolean(p.content.tracks.find(t=>t.track_id===roles[role].track_id).muted)===want){saved=true;break;}await new Promise(r=>setTimeout(r,350));}while(Date.now()<end);assert.ok(saved,'声音启用状态未保存：'+role);}
   const alreadyPlayed=e.isolatedPlayback?.length===4;e.isolatedPlayback??=[];
   try{if(!alreadyPlayed)for(const role of ['D','O','T','B']){for(const other of Object.keys(roles))await mute(other,other!==role);const t=role==='D'?6.2:role==='B'?5:2;await base.seek(key,t);await shot(key,'isolated-'+role);const playback=await base.playback(key,t);e.isolatedPlayback.push({role,trackId:roles[role].track_id,sourceFiles:roles[role].clips.map(x=>x.file_id),...playback});}}
   finally{for(const role of Object.keys(roles))await mute(role,Boolean(roles[role].muted));}
   currentProject=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);let preserved=true;try{assert.deepEqual(currentProject.content.tracks.filter(t=>originalIds.has(t.track_id)),before.content.tracks);}catch{preserved=false;}check('原生五类内容、绑定、位置和启用保持',preserved,'内部未显示的源字幕资料也保持；UI按原生五类验收');
   const view=await base.inspect(key);check('页面六类组合',view.rows.length===6,view.rows.map(r=>r.name));const finalContent=currentProject.content;
   await page.click('button[aria-label="收起编辑区"]',{label:'返回本会话核对六轨恢复'});await page.waitForSelector('[aria-label="编辑区"]',{state:'hidden',timeout:10000});const reopened=await base.inspect(key);check('重入六类内容保持',reopened.rows.length===6,reopened.rows.map(r=>r.name));
   await page.reload();await page.waitForSelector('[data-agent-run-id="'+e.runId+'"] button[aria-label="进入编辑器"]',{state:'visible',timeout:30000});const refreshed=await base.inspect(key),saved=await api('/cloud-tool-api/v1/editor/projects/'+e.editorId);let same=true;try{assert.deepEqual(saved.content,finalContent);}catch{same=false;}check('刷新后六轨及独立D保持',same&&refreshed.rows.length===6,{rows:refreshed.rows.map(r=>r.name),same});
   if(key==='080')for(const t of [2,10]){const preview=await base.seek(key,t);check('D加入后双语对应-'+t,/[\u4e00-\u9fff]/.test(preview.text)&&/[a-zA-Z]{4,}/.test(preview.text),preview.text);}
   e.DVerification={trackId:dId,fileId:c.file_id,sourceName:media.D.name,sourceSha256:media.D.sha256,start:c.timeline_start_sec,end:c.timeline_start_sec+12,sourceIn:c.source_in_sec,sourceOut:c.source_out_sec,linkedVideo:d.linked_video_track_id,originalPreserved:preserved,displayName:refreshed.rows.at(-1)?.name,isolatedPlayback:e.isolatedPlayback};await write(key,'D-verification',e.DVerification);await save();await shot(key,e.failures.length?'failure':'six-tracks-verified');e.stage='Six tracks verified';await save();return{key,failures:e.failures,verification:e.DVerification};
  },
 };
}
