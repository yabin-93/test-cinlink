import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

export const cardDefinitions=Object.freeze({
 '069':{card:'添加字幕',prompt:'为这条视频添加原文字幕。',media:'F20',language:'不翻译',mode:'原文',expectedRows:3},
 '070':{card:'添加字幕',prompt:'为这条视频添加简体中文字幕。',media:'F20',language:'简体中文',mode:'译文',expectedRows:3},
 '071':{card:'翻译配音',prompt:'将这条视频翻译成简体中文配音，并显示简体中文字幕。',media:'F20',language:'简体中文',mode:'译文',expectedRows:5},
 '072':{card:'翻译配音',prompt:'将这条视频翻译成简体中文配音，并显示中英双语字幕。',media:'F20',language:'简体中文',mode:'双语',expectedRows:5},
 '073':{card:'画质增强',prompt:'将这条视频的画质增强2倍，保留完整时长和原音。',media:'F20',scale:'2倍'},
 '074':{card:'去口水词',prompt:'去掉这条视频中的口水词和多余停顿，保留其余内容与原音。',media:'F60'},
 '075':{card:'长视频变短',prompt:'将这条视频剪成30秒高光，保留原音。',media:'F60',duration:'30秒'},
});

export async function workflowContext(page,config){
 const statePath=path.join(config.outDir,'execution.json');
 let state;try{state=JSON.parse(await fs.readFile(statePath,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;state={date:'2026-11-18',baseURL:config.baseURL,spaceId:config.spaceId,workspaceName:'ERYE199-069-075-生产-20261118',cases:{}};}
 const media=JSON.parse(await fs.readFile(path.join(config.outDir,'media.json'),'utf8'));
 async function save(){await fs.mkdir(config.outDir,{recursive:true});await fs.writeFile(statePath,JSON.stringify(state,null,2)+'\n');}
 async function dir(id){const attempt=state.attempts?.[id]||1;const d=path.join(config.outDir,id,...(attempt>1?['attempt-'+attempt]:[]));await fs.mkdir(d,{recursive:true});return d;}
 async function write(id,name,value){await fs.writeFile(path.join(await dir(id),name+'.json'),JSON.stringify(value,null,2)+'\n');}
 async function shot(id,name){const d=await dir(id),snapshot=await page.snapshot({scope:'full_page'});await fs.writeFile(path.join(d,name+'.txt'),snapshot);await page.screenshot({path:path.join(d,name+'.png').replaceAll('\\','/')});return snapshot;}
 async function api(url){const r=await page.fetch(url,{timeout:25000,cache:'no-store'});if(!r.ok)throw Error(`${url.split('?')[0]} HTTP ${r.status}`);return typeof r.body==='string'?JSON.parse(r.body):r.body;}
 async function assertConversation(id){assert.equal(new URL(await page.url()).pathname,'/c/'+state.cases[id]?.conversationId,'当前页面并非本例独立会话，必须先resume，不能凭同名原片核验其他工程');}
 function noOtherActive(id){for(const [key,c]of Object.entries(state.cases))if(key!==id&&c.submittedAt&&!['done','failed','cancelled','canceled','terminated'].includes(c.runStatus))throw Error('另一原任务尚未结束：'+key);}
 return {state,save,shot,api,write,page,config,media,
  async open(id){
   const def=cardDefinitions[id];if(!def)throw Error('仅支持069～075');noOtherActive(id);
   if(state.cases[id])throw Error('已有本例检查点，禁止重建/重发；请resume或observe');
   await page.goto(config.baseURL+'/');await page.waitForSelector('button[aria-label="切换项目"]',{state:'visible',timeout:30000});
   await page.waitForFunction(name=>document.querySelector('button[aria-label="切换项目"]')?.innerText?.trim()===name,state.workspaceName,{timeout:30000});
   const workspace=await page.evaluate(()=>document.querySelector('button[aria-label="切换项目"]')?.innerText?.trim());
   assert.equal(workspace,state.workspaceName,'当前项目不匹配，不能写入其他项目');
   const projectId=await page.evaluate(name=>[...document.querySelectorAll('button[data-react-new-session]')].find(x=>x.parentElement?.parentElement?.innerText.includes(name))?.getAttribute('data-react-new-session'),state.workspaceName);
   if(projectId){state.workspaceId=projectId;await page.goto(config.baseURL+'/?project_id='+encodeURIComponent(projectId));await page.waitForFunction(name=>document.querySelector('button[aria-label="切换项目"]')?.innerText?.trim()===name,state.workspaceName,{timeout:30000});}
   const entry=state.cases[id]={id:'ERYE199-'+id,attemptNumber:state.attempts?.[id]||1,definition:def,startedAt:new Date().toISOString(),status:'In Progress',stage:'Opening',source:{path:media[def.media].path,name:media[def.media].name,sha256:media[def.media].sha256},screenshots:[],checks:[]};await save();
   await page.click(`button[aria-label="${def.card}"]`,{label:'打开本例原生功能卡片'});
   entry.stage='Configure';await save();return {id,stage:entry.stage,definition:def};
  },
  async upload(id){
   const e=state.cases[id];if(!e||e.uploadTriggered||e.submittedAt)throw Error('没有待上传检查点，或已触发上传/提交，禁止重放');
   e.uploadTriggered=true;e.uploadAt=new Date().toISOString();await save();
   if(await page.evaluate(()=>Boolean(document.querySelector('input[type="file"]'))))await page.setInputFiles('input[type="file"]',[e.source.path]);
   else {const chooserPromise=page.waitForFileChooser({timeout:10000});await page.click('button[aria-label="添加素材"]',{label:'附加本例唯一源视频'});const chooser=await chooserPromise;await chooser.setFiles(e.source.path);}
   await page.waitForFunction(name=>[...document.querySelectorAll('button[aria-label]')].some(x=>x.getAttribute('aria-label')==='移除 '+name),e.source.name,{timeout:30000});
   e.stage='Uploaded';await save();await shot(id,'source-attached');return {id,stage:e.stage,source:e.source.name};
  },
  async confirmUpload(id){const e=state.cases[id];if(!e?.uploadTriggered||e.submittedAt)throw Error('没有待核对的上传');const names=await page.evaluate(()=>[...document.querySelectorAll('button[aria-label^="移除 "]')].map(x=>x.getAttribute('aria-label').slice(3)).filter(x=>/\.mp4$/i.test(x)));assert.deepEqual(names,[e.source.name],'本例附件不是唯一指定源视频');e.stage='Uploaded';await save();await shot(id,'source-attached');return{id,stage:e.stage,source:e.source.name};},
  async configuration(id){
   const e=state.cases[id];if(!e||e.submittedAt)throw Error('配置阶段检查点不匹配');
   const visible=await page.evaluate(()=>[...document.querySelectorAll('button')].filter(x=>x.getBoundingClientRect().width>0).map(x=>({label:x.getAttribute('aria-label'),text:x.innerText})).filter(x=>/目标语言|字幕显示模式|翻译模式|增强|倍|秒|时长/.test((x.label||'')+' '+x.text)));
   e.configuration=visible;await save();await write(id,'configuration',visible);return visible;
  },
  async configure(id){
   const e=state.cases[id];if(!e||e.submittedAt)throw Error('不能更改已提交任务参数');const def=e.definition;
   if(def.language&&def.language!=='不翻译'){
    const selected=await page.evaluate(label=>[...document.querySelectorAll('button')].some(x=>x.getAttribute('aria-label')===label),'目标语言：'+def.language);
    if(!selected){if(!await page.evaluate(()=>Boolean(document.querySelector('[role="listbox"][aria-label="目标语言"]'))))await page.click('button[aria-label^="目标语言："]',{label:'设置本例目标语言'});await page.click('loc=role:option[name="'+def.language+'"]',{label:'选中简体中文目标'});}
   }
   if(def.mode){const selected=await page.evaluate(label=>[...document.querySelectorAll('button')].some(x=>x.getAttribute('aria-label')===label),'字幕显示模式：'+def.mode);if(!selected){await page.click('button[aria-label^="字幕显示模式："]',{label:'设置本例字幕显示模式'});await page.click('loc=role:option[name="'+def.mode+'"]',{label:'选中本例字幕模式'});}}
   if(def.duration){const selected=await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="精彩片段时长：30 秒"]')));if(!selected){if(!await page.evaluate(()=>Boolean(document.querySelector('[role="listbox"][aria-label="精彩片段时长"]'))))await page.click('button[aria-label^="精彩片段时长："]',{label:'设置本例高光时长'});await page.click('loc=role:option[name="30 秒"]',{label:'选择三十秒高光目标'});}}
   return this.configuration(id);
  },
  async submit(id){
   const e=state.cases[id];if(!e||!e.uploadTriggered||e.submittedAt)throw Error('提交前置缺失或已有提交意图，禁止重发');noOtherActive(id);
   assert.equal(e.stage,'Uploaded','上传完成前不能提交');assert.equal(new URL(await page.url()).pathname,'/','新卡片任务必须从独立首页发起');
   const names=await page.evaluate(()=>[...document.querySelectorAll('button[aria-label^="移除 "]')].map(x=>x.getAttribute('aria-label').slice(3)).filter(x=>/\.mp4$/i.test(x)));assert.deepEqual(names,[e.source.name],'提交时唯一附件必须仍是本例原片');
   await page.fill('[contenteditable="true"]',e.definition.prompt);
   for(const label of [e.definition.language?'目标语言：'+e.definition.language:null,e.definition.mode?'字幕显示模式：'+e.definition.mode:null].filter(Boolean))assert.ok(await page.evaluate(value=>[...document.querySelectorAll('button[aria-label]')].some(x=>x.getAttribute('aria-label')===value),label),'提交参数未匹配：'+label);
   if(e.definition.duration)assert.ok(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="精彩片段时长：30 秒"]'))),'高光时长未设为30秒');
   await page.waitForFunction(()=>!document.querySelector('button[aria-label="发送"]')?.disabled,undefined,{timeout:45000});
   assert.equal(await page.evaluate(()=>document.querySelector('[contenteditable="true"]')?.innerText?.trim()),e.definition.prompt);
   await shot(id,'before-submit');e.stage='Submitting';e.submittedAt=new Date().toISOString();await save();
   await page.click('button[aria-label="发送"]',{label:'一次提交用例原文指令'});
   await page.waitForFunction(()=>/\/c\/[0-9a-f-]+/.test(location.pathname),undefined,{timeout:30000});
   e.conversationId=(await page.url()).split('/c/')[1]?.split(/[?#]/)[0];e.stage='Accepted';await save();return {id,conversationId:e.conversationId};
  },
  async observe(id){
   const e=state.cases[id];if(!e?.submittedAt)throw Error('本例未提交');
   if(!e.conversationId)e.conversationId=(await page.url()).split('/c/')[1]?.split(/[?#]/)[0];
   if(!e.conversationId)throw Error('受理未知，保留页面不重发');
   const messages=await api('/runtime-api/v1/conversations/'+e.conversationId+'/messages?limit=100');await write(id,'messages',messages);
   const users=(messages.messages||messages.items||[]).filter(m=>m.role==='user'&&m.run_id);
   if(users.length>1)throw Error('独立会话存在多条用户run，需审核而不自动选择旧run');
   if(users[0]){e.runId=users[0].run_id;e.uploadedFiles=users[0].files;e.actualWorkspace=users[0].ext?.workspace_project;const input=(users[0].files||[]).find(f=>f.name===e.source.name);if(input?.content_sha256)assert.equal(input.content_sha256,e.source.sha256,'受理原片哈希与本例素材不匹配');}
   if(!e.runId){await save();return {status:'Acceptance not yet observed',id};}
   const run=await api('/runtime-api/v2/agent/runs/'+e.runId);await write(id,'run',run);
   if(run.conversation_id)assert.equal(run.conversation_id,e.conversationId,'原任务会话错配');
   e.runStatus=run.status;e.runError=run.error;e.resultFiles=run.result_files;e.stage=run.status;await save();
   const terminal=['done','failed','cancelled','canceled','terminated'].includes(run.status);
   if(terminal&&!e.terminalCaptured){await assertConversation(id);await shot(id,'task-terminal');e.terminalCaptured=true;await save();}
   return {id,status:run.status,runId:e.runId,error:run.error,clarifications:run.clarifications,files:run.result_files?.map(f=>({name:f.name,kind:f.kind})),answer:run.messages?.filter(m=>m.role==='assistant').map(m=>m.content_text)};
  },
  async resume(id){const e=state.cases[id];if(!e?.conversationId)throw Error('没有可恢复的本例会话');noOtherActive(id);await page.goto(config.baseURL+'/c/'+e.conversationId);await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});return {id,resumed:true};},
  async confirmReview(id){
   const e=state.cases[id];if(!['074','075'].includes(id)||e?.runStatus!=='waiting_for_confirmation'||e.reviewConfirmedAt)throw Error('只确认本例已观察到且未确认的剪辑审核，不重放');
   await assertConversation(id);
   if(id==='075'){const plan=await page.evaluate(()=>document.querySelector('[aria-label="确认方案"]')?.innerText);const times=[...(plan||'').matchAll(/(\d{2}):(\d{2})\.(\d{3})/g)].map(x=>60*Number(x[1])+Number(x[2])+Number(x[3])/1000);assert.ok(times.length>=2&&times.length%2===0,'高光方案没有可审核源区间');const ranges=[];for(let n=0;n<times.length;n+=2){assert.ok(times[n]>=0&&times[n+1]<=60&&times[n+1]>times[n],'方案超出本例原片或区间无效');ranges.push([times[n],times[n+1]]);}assert.ok(Math.abs(ranges.reduce((s,[a,b])=>s+b-a,0)-30)<=1/30,'方案实际区间总长不是30秒');await write(id,'review-selection',{text:plan,ranges});await shot(id,'review-selected');e.reviewConfirmedAt=new Date().toISOString();await save();await page.click('loc=role:button[name="审核确认"]',{label:'确认本轮三十秒高光方案'});return{id,reviewConfirmedAt:e.reviewConfirmedAt};}
   const review=await page.evaluate(()=>({text:document.querySelector('[aria-label="文稿"]')?.innerText,checked:[...document.querySelectorAll('[role="checkbox"]')].map(x=>x.getAttribute('aria-checked')),tokens:[...document.querySelectorAll('button')].filter(x=>/^(Um,|Uh,|\[.*s\])$/.test(x.innerText?.trim())).map(x=>({text:x.innerText,html:x.outerHTML}))}));
   assert.ok(review.text?.includes('3')&&review.text?.includes('6'),'审核内容需包含本次3口水词和6停顿');await write(id,'review-selection',review);await shot(id,'review-selected');
   e.reviewConfirmedAt=new Date().toISOString();await save();await page.click('loc=role:button[name="移除"]',{label:'确认本轮口水词与停顿清理'});return{id,reviewConfirmedAt:e.reviewConfirmedAt};
  },
  async restart(id){const e=state.cases[id];if(config.recoveryReason!=='credits-restored'||e?.runStatus!=='failed'||e?.runError?.code!=='insufficient_credits')throw Error('仅在用户已补积分后允许为已终态的积分阻塞另建新尝试');noOtherActive(id);state.caseHistory??={};state.caseHistory[id]??=[];state.caseHistory[id].push({...e,status:'Blocked',blockedReason:'insufficient_credits'});state.attempts??={};state.attempts[id]=(e.attemptNumber||1)+1;state.creditRecovery={confirmedBy:'用户回复已补充',at:new Date().toISOString()};delete state.cases[id];await save();return this.open(id);},
  async inspect(id){
   const e=state.cases[id];if(e?.runStatus!=='done')throw Error('原任务尚未完成，不核验历史产物');
   await assertConversation(id);
   if(!await page.evaluate(()=>Boolean(document.querySelector('[aria-label="编辑区"]')))){
    const resultButtons=await page.evaluate(()=>document.querySelectorAll('button[aria-label="进入编辑器"]').length);
    if(resultButtons===1)await page.click('button[aria-label="进入编辑器"]',{label:'进入本轮结果对应编辑器'});
    else if(!resultButtons)await page.click('button[aria-label="视频编辑器"]',{label:'查看本会话已交付编辑工程'});
    else throw Error('多个结果入口需先核对，不能盲选');
   }
   await page.waitForFunction(()=>document.querySelectorAll('.ed-track-row').length>0,undefined,{timeout:30000});
   const atEnd=await page.evaluate(()=>{const x=document.querySelector('input[aria-label="预览播放进度"]');return x&&Number(x.max)>0&&Number(x.value)>=Number(x.max)-.01});if(atEnd)await this.seek(id,0);
   await page.waitForFunction(expectCaptions=>{const v=document.querySelector('[aria-label="工程实时预览"] video');return v?.readyState>=2&&(!expectCaptions||[...document.querySelectorAll('.ed-track-subtitle')].every(row=>row.querySelectorAll('.ed-timeline-clip').length>0))},Boolean(e.definition.expectedRows),{timeout:45000});
   const view=await page.evaluate(()=>({projectName:document.querySelector('.ed-project-name')?.textContent||document.querySelector('.ed-project-trigger')?.textContent,rows:[...document.querySelectorAll('.ed-track-row')].map(row=>({classes:row.className,title:row.querySelector('.ed-track-heading')?.getAttribute('title'),name:row.querySelector('.ed-track-name')?.textContent,controls:[...row.querySelectorAll('.ed-track-heading button')].map(x=>({name:x.getAttribute('aria-label'),disabled:x.disabled})),clips:[...row.querySelectorAll('.ed-timeline-clip')].map(x=>({label:x.getAttribute('aria-label'),text:x.innerText}))})),preview:[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({width:v.videoWidth,height:v.videoHeight,time:v.currentTime,duration:v.duration,ready:v.readyState})),seekInput:document.querySelector('input[aria-label="预览播放进度"]')?.outerHTML}));
   await write(id,'editor-observation',view);await shot(id,'editor-tracks');e.editorView=view;e.stage='Editor observed';await save();return{id,...view};
  },
  async seek(id,time){
   await assertConversation(id);
   const selector='input[aria-label="预览播放进度"]';const type=await page.evaluate(sel=>document.querySelector(sel)?.type,selector);
   if(type==='number'){await page.fill(selector,String(time));await page.press(selector,'Tab');}
   else if(type==='range'){const r=await page.evaluate(sel=>{const x=document.querySelector(sel),r=x.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,max:Number(x.max)}} ,selector);await page.mouse.click(r.x+8+(r.width-16)*time/r.max,r.y+r.height/2,{label:'定位本例源视频核验时间'});}
   else throw Error('预览定位控件缺失');
   if(type==='range'){
    const actual=await page.evaluate(sel=>Number(document.querySelector(sel).value),selector);const ticks=Math.round((time-actual)/.01);
    if(Math.abs(ticks)>100)throw Error('定位偏差超过1秒，需观察控件而非继续盲操作');
    for(let n=0;n<Math.abs(ticks);n++)await page.press(selector,ticks>0?'ArrowRight':'ArrowLeft');
   }
   await page.waitForFunction(t=>{const x=document.querySelector('input[aria-label="预览播放进度"]');return x&&Math.abs(Number(x.value)-t)<=1/30},time,{timeout:10000});
   await shot(id,'preview-'+time);const view=await page.evaluate(()=>({playhead:document.querySelector('input[aria-label="预览播放进度"]')?.value,text:document.querySelector('.ed-preview-canvas')?.innerText,media:[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({time:v.currentTime,width:v.videoWidth,height:v.videoHeight}))}));await write(id,'preview-'+time,view);return view;
  },
  async download(id){
   const e=state.cases[id];if(e?.runStatus!=='done'||e.download)throw Error('未完成或已有下载检查点');
   await assertConversation(id);
   const files=(e.resultFiles||[]).filter(f=>f.kind==='video'||/\.mp4$/i.test(f.name||''));
   if(files.length!==1)throw Error('最终MP4并非唯一，需核对真实交付');
   const file=files[0],fileId=file.file_id||file.id;
   assert.equal(await page.evaluate(()=>document.querySelectorAll('button.workspace-media-card-download').length),1,'本轮产物下载入口不唯一');
   const downloadPromise=page.waitForEvent('download',{timeout:60000});await page.click('button.workspace-media-card-download',{label:'下载本轮实际视频产物'});const download=await downloadPromise;
   const destination=path.join(await dir(id),'native-product.mp4');await download.saveAs(destination.replaceAll('\\','/'));
   e.download={name:file.name,fileId,path:destination};await save();return{id,download:e.download};
  },
  async mapping(id){
   const e=state.cases[id];if(e?.runStatus!=='done')throw Error('本轮尚未完成');const list=await api('/cloud-tool-api/v1/editor/projects?conversation_id='+e.conversationId+'&limit=100');assert.equal(list.items?.length,1,'本例工程并非唯一，不盲选历史工程');const project=await api('/cloud-tool-api/v1/editor/projects/'+list.items[0].project_id);await write(id,'project-readonly',project);e.editorId=project.project_id;const tracks=(project.content?.tracks||[]).map(t=>({type:t.type,role:t.role,clips:(t.clips||[]).map(c=>({fileId:c.file_id,sourceIn:c.source_in_sec,sourceOut:c.source_out_sec,start:c.timeline_start_sec,rate:c.playback_rate}))}));await write(id,'source-mapping',{projectId:e.editorId,sourceFileId:e.uploadedFiles?.find(x=>x.name===e.source.name)?.file_id,tracks});await save();return{id,editorId:e.editorId,tracks};
  },
  async verify(id){
   const e=state.cases[id];if(e?.runStatus!=='done')throw Error('本例不是完成终态');
   const first=await this.inspect(id),failures=[];e.checks=[];const check=(name,pass,detail)=>{e.checks.push({name,pass,detail});if(!pass)failures.push(name+'：'+detail);};
   if(e.definition.expectedRows)check('原生轨道数量',first.rows.length===e.definition.expectedRows,`expected=${e.definition.expectedRows},actual=${first.rows.length},names=${first.rows.map(r=>r.name).join('/')}`);
   const expectedNames=[e.source.name,...(['073','074','075'].includes(id)?(e.resultFiles||[]).map(f=>f.name):[])].filter(Boolean);
   check('本轮源或产物工程对应',expectedNames.some(name=>String(first.projectName).includes(name)),`source=${e.source.name},editor=${first.projectName}`);
   const captions=first.rows.filter(r=>r.classes.includes('ed-track-subtitle'));const text=captions.flatMap(r=>r.clips.map(c=>c.text)).join(' ');
   if(id==='069'){check('原文字幕至少两句',captions.length===1&&captions[0].name.includes('原文')&&captions[0].clips.length>=2,text.slice(0,200));check('原文为英语',/sabotage|healthcare|health care/i.test(text)&&!/[\u4e00-\u9fff]/.test(text),text.slice(0,200));}
   if(['070','071','072'].includes(id))check('目标中文可编辑字幕',captions.some(r=>r.name.includes('译文'))&&/[\u4e00-\u9fff]/.test(text)&&captions.flatMap(r=>r.clips).length>=2,text.slice(0,240));
   if(['069','070'].includes(id))check('无额外配音或BGM轨',!first.rows.some(r=>/配音|译声|翻译人声|背景音乐|BGM/.test(r.name)),first.rows.map(r=>r.name).join('/'));
   if(['071','072'].includes(id))for(const [name,pattern]of [['BGM',/背景音乐|BGM/],['原声',/原声/],['译声',/配音|译声|翻译人声/]])check(name+'轨存在',first.rows.some(r=>pattern.test(r.name)),first.rows.map(r=>r.name).join('/'));
   if(['073','074','075'].includes(id))check('没有旧译文或配音轨',!first.rows.some(r=>/译文字幕|配音|译声|翻译人声/.test(r.name)),first.rows.map(r=>r.name).join('/'));
   for(const t of e.definition.media==='F20'?(id==='073'?[5,15]:[2,10]):[5,25]){const preview=await this.seek(id,t);if(id==='071')check('译文模式预览只显示中文-'+t,!/[a-zA-Z]{4,}/.test(preview.text||''),preview.text||'');if(id==='072')check('双语模式预览中英对应-'+t,/[\u4e00-\u9fff]/.test(preview.text||'')&&/[a-zA-Z]{4,}/.test(preview.text||''),preview.text||'');await this.playback(id,t);}
   const shape=view=>view.rows.map(r=>({name:r.name,clips:r.clips.map(c=>c.label),controls:r.controls}));
   e.initialShape=shape(first);await page.click('button[aria-label="收起编辑区"]',{label:'返回本轮会话结果入口'});await page.waitForSelector('button[aria-label="进入编辑器"]',{state:'visible',timeout:15000});
   const again=await this.inspect(id);check('返回结果重新进入保持',JSON.stringify(shape(again))===JSON.stringify(e.initialShape),'轨道、片段时码、声音启用一致');
   await page.reload();await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});const reopened=await this.inspect(id);check('刷新后同工程轨道保持',JSON.stringify(shape(reopened))===JSON.stringify(e.initialShape),'同会话重开轨道/字幕/声音保持');
   e.failures=failures;e.stage='UI verified';await save();await shot(id,failures.length?'failure':'ui-verified');return{id,failures,checks:e.checks};
  },
  async playback(id,time){
   await assertConversation(id);
   await page.click('button[aria-label="预览播放"]',{label:'试听本例当前位置的实际预览'});
   const samples=[],deadline=Date.now()+30000;let progressed=false;do{const current=await page.evaluate(()=>Number(document.querySelector('input[aria-label="预览播放进度"]')?.value));samples.push({elapsedMs:30000-(deadline-Date.now()),time:current});if(current>time+.5){progressed=true;break;}await new Promise(resolve=>setTimeout(resolve,1000));}while(Date.now()<deadline);await write(id,'playback-samples-'+time,samples);if(!progressed)throw Error('预览播放后30秒内未观察到播放位置推进');
   if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="预览暂停"]'))))await page.click('button[aria-label="预览暂停"]',{label:'结束本例当前片段试听'});
   const observation=await page.evaluate(()=>({time:Number(document.querySelector('input[aria-label="预览播放进度"]')?.value),paused:!!document.querySelector('button[aria-label="预览播放"]'),audioControls:[...document.querySelectorAll('.ed-track-audio .ed-track-heading button,.ed-track-dubbing .ed-track-heading button')].map(b=>b.getAttribute('aria-label'))}));
   state.cases[id].playback??=[];state.cases[id].playback.push({requested:time,...observation});await write(id,'playback-'+time,observation);await save();return observation;
  },
 };
}
