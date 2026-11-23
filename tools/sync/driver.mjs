import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {downloadChunks} from './download-chunks.mjs';

export async function context(page, root, out) {
  const doc = (await fs.readFile(path.join(root,'docs/design-cases/multi-workflow/editing-dubbing-sync-cases.md'),'utf8')).replace(/\r\n/g,'\n');
  const prompts = {};
  for (let n=1;n<=6;n++) {
    const id=`SYNC-${String(n).padStart(3,'0')}`;
    const section=doc.split(`## ${id}\n`)[1]?.split('\n## ')[0];
    const blocks=[...(section||'').matchAll(/```text\s*\n([\s\S]*?)\n```/g)].map(x=>x[1].trim());
    if(blocks.length!==2) throw Error(`${id} 必须有两条原始提示词`);
    prompts[id]=blocks;
  }
  const stateFile=path.join(out,'execution.json');
  let state;
  try { state=JSON.parse(await fs.readFile(stateFile,'utf8')); }
  catch(e) { if(e.code!=='ENOENT')throw e; state={date:'2026-11-16',environment:'staging',baseUrl:'https://staging-app.cinlink.ai',taskSpaceId:9,page:'p1',sourceSha256:crypto.createHash('sha256').update(doc).digest('hex'),cases:{}}; }
  const save=async()=>fs.writeFile(stateFile,JSON.stringify(state,null,2)+'\n');
  const noOtherActive=id=>{
    if(Object.entries(state.cases).some(([key,value])=>key!==id&&value.steps.some(s=>!['done','failed','cancelled','canceled','terminated','blocked'].includes(s.status))))throw Error('其他用例存在未终态请求，禁止并发');
  };
  const api=async(url,data,method)=>{
    const response=await page.fetch(url,{method:method||(data?'POST':'GET'),...(data?{headers:{'content-type':'application/json'},body:JSON.stringify(data)}:{}),timeout:30000});
    if(!response.ok)throw Error(`${url.split('?')[0]} HTTP ${response.status}`);
    return typeof response.body==='string'?JSON.parse(response.body):response.body;
  };
  const directory=async id=>{const dest=path.join(out,id);await fs.mkdir(dest,{recursive:true});return dest;};
  const shot=async(id,name)=>{
    const dest=await directory(id);
    const snapshot=await page.snapshot({scope:'full_page'});
    await fs.writeFile(path.join(dest,name+'.txt'),snapshot);
    await page.screenshot({path:path.join(dest,name+'.png').replaceAll('\\','/')});
    return snapshot;
  };
  const mediaRoot='E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道';
  const sourceNames={ 'SYNC-001':['1270510918-1-12.mp4'],'SYNC-002':['纯中文.mp4'],'SYNC-003':['双人（英）.mp4'],'SYNC-004':['日文.mp4'],'SYNC-005':['SYNC-005-controlled.mp4'],'SYNC-006':['9s.mp4','x.mp4'] };
  const collectUploads=async id=>{
    const entry=state.cases[id];
    const events=await page.events();
    const captures=[];
    for(const event of events){
      const method=event.method??event.type;
      const params=event.params??event;
      if(method==='Network.responseReceived' && /\/agent\/files\/(multipart\/)?complete(?:\?|$)/.test(params.response?.url||'')) {
        try { const raw=await page.cdp('Network.getResponseBody',{requestId:params.requestId});const text=raw.base64Encoded?Buffer.from(raw.body,'base64').toString('utf8'):raw.body;captures.push({status:params.response.status,body:JSON.parse(text)}); }
        catch(error){captures.push({status:params.response.status,captureError:String(error)});}
      }
    }
    if(captures.length){
      entry.uploadResponses??=[];
      entry.uploadResponses.push(...captures);
      const find=(value,key)=>{if(!value||typeof value!=='object')return null;if(typeof value[key]==='string')return value[key];for(const child of Object.values(value)){const result=find(child,key);if(result)return result;}return null;};
      entry.sources=entry.uploadResponses.filter(x=>x.status>=200&&x.status<300).map(x=>({id:find(x.body,'cloud_file_id')||find(x.body,'file_id'),name:find(x.body,'name')||find(x.body,'filename'),raw:x.body})).filter(x=>x.id);
      await save();
    }
    return {captured:captures.length,sources:entry.sources?.map(x=>({id:x.id,name:x.name}))??[],eventCount:events.length,eventKinds:[...new Set(events.map(x=>x.method??x.type))]};
  };
  return {state,save,api,shot,prompts,page,
    async resume(id){
      const entry=state.cases[id];if(!entry)throw Error('本例没有检查点');
      noOtherActive(id);
      await page.goto(state.baseUrl+'/c/'+entry.conversationId,{timeout:60000});
      await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
      if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起项目侧边栏"]'))))await page.click('button[aria-label="收起项目侧边栏"]');
      return {resumed:id};
    },
    async confirm(id){
      const step=state.cases[id]?.steps.at(-1);
      if(step?.status!=='waiting_for_confirmation'||step.confirmationTriggered)throw Error('本轮未等待确认，或已触发确认，禁止重放');
      const snapshot=await shot(id,'round-'+step.round+'-before-render-confirm');
      if(!snapshot.includes('审核确认'))throw Error('当前页面未显示剪辑审核确认入口');
      step.confirmationTriggered=true;step.confirmedAt=new Date().toISOString();await save();
      await page.click('button:text-is("审核确认")',{label:'确认已核对的本轮剪辑方案'});
      return {confirmed:id,round:step.round};
    },
    async artifacts(id,round){
      const run=JSON.parse(await fs.readFile(path.join(await directory(id),'round-'+round+'-run.json'),'utf8'));
      const result=[];
      for(const file of (run.result_files||[]).filter(x=>/\.(srt|json|txt)$/i.test(x.name||''))){
        const signed=await api('/studio-api/v1/agent/files/'+encodeURIComponent(file.file_id)+'/url?disposition=attachment');
        const destination=path.join(await directory(id),`round-${round}-${path.basename(file.name)}`);
        const response=await page.fetch(signed.url,{saveAs:destination.replaceAll('\\','/'),timeout:45000});
        if(!response.ok)throw Error('辅助产物下载失败 '+response.status);
        const bytes=await fs.readFile(destination);result.push({id:file.file_id,name:file.name,path:destination,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
      }
      await fs.writeFile(path.join(await directory(id),`round-${round}-artifacts.json`),JSON.stringify(result,null,2));
      return result;
    },
    async prepare(id){
      if(state.cases[id])throw Error('已有检查点，禁止重复建立：'+id);
      noOtherActive(id);
      const entry=state.cases[id]={projectId:crypto.randomUUID(),conversationId:crypto.randomUUID(),status:'In Progress',steps:[],sources:[],sourceNames:sourceNames[id]};await save();
      await api('/runtime-api/v1/projects/'+entry.projectId,{project_id:entry.projectId,display_name:id+'-20261116'},'PUT');
      await api('/runtime-api/v1/conversations/'+entry.conversationId,{conversation_id:entry.conversationId,project_id:entry.projectId,title:id+'-剪辑配音字幕同步',messages_partial:true,response_message_limit:30,response_include_project_json:true,response_include_editor_project:true},'PUT');
      await page.goto(state.baseUrl+'/c/'+entry.conversationId,{timeout:60000});
      await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
      if(await page.evaluate(()=>Boolean(document.querySelector('button[aria-label="收起项目侧边栏"]'))))await page.click('button[aria-label="收起项目侧边栏"]');
      await shot(id,'prepared');
      return {id,projectId:entry.projectId,conversationId:entry.conversationId};
    },
    async upload(id){
      const entry=state.cases[id];if(!entry||entry.uploadTriggered)throw Error('未准备或已触发上传，先沿检查点观察');
      if(!String(await page.url()).includes(entry.conversationId))throw Error('当前会话不是本例');
      await page.cdp('Network.enable');await page.events();
      entry.uploadTriggered=true;await save();
      const files=entry.sourceNames.map(name=>id==='SYNC-005'?path.join(out,'fixtures',name):path.join(mediaRoot,name));
      await page.setInputFiles('input[type="file"]',files);
      return await collectUploads(id);
    },
    collectUploads,
    async download(id,round){
      const entry=state.cases[id],step=entry.steps.find(x=>x.round===round);
      if(step?.status!=='done')throw Error('该轮还没有成功终态');
      if(entry[round===1?'p1':'p2'])throw Error('已有下载产物，保留原检查点，不覆盖媒体核验');
      const run=JSON.parse(await fs.readFile(path.join(await directory(id),'round-'+round+'-run.json'),'utf8'));
      const files=(run.result_files||[]).filter(x=>x.kind==='video'&&/\.mp4$/i.test(x.name||''));
      if(files.length!==1)throw Error('该轮没有唯一最终MP4');
      const file=files[0];
      const signed=await api('/studio-api/v1/agent/files/'+encodeURIComponent(file.file_id)+'/url?disposition=attachment');
      if(!signed.url)throw Error('没有取得产物下载地址');
      const destination=path.join(await directory(id),`round-${round}-product.mp4`);
      const objectHash=file.facts?.object_key?.split('/').at(-1);
      const expectedHash=file.facts?.content_sha256||(/^[0-9a-f]{64}$/i.test(objectHash||'')?objectHash:undefined);
      if(Number(file.facts?.size_bytes)>50*1024*1024)await downloadChunks(page,signed.url,destination.replaceAll('\\','/'),Number(file.facts.size_bytes),expectedHash);
      else {
        const response=await page.fetch(signed.url,{saveAs:destination.replaceAll('\\','/'),timeout:120000});
        if(!response.ok)throw Error('产物下载 HTTP '+response.status);
      }
      const bytes=await fs.readFile(destination);
      const sha256=crypto.createHash('sha256').update(bytes).digest('hex');
      if(expectedHash&&sha256!==expectedHash)throw Error('下载产物哈希与云端不一致');
      entry[round===1?'p1':'p2']={id:file.file_id,name:file.name,sha256,bytes:bytes.length,path:destination,facts:file.facts,mediaPrecheckPassed:false};
      await save();await shot(id,'round-'+round+'-completed');
      return {id:file.file_id,name:file.name,sha256,bytes:bytes.length,path:destination};
    },
    async register(id){
      const entry=state.cases[id];if(!entry?.uploadTriggered||entry.steps.length)throw Error('没有待登记附件或已有提交，禁止重发登记');
      const prompt='仅接收并登记本次上传的原始素材，不执行剪辑、配音、字幕或生成处理。请列出附件的实际文件名和文件ID，等待我下一条完整处理指令。';
      await page.fill('[contenteditable="true"]',prompt);
      await shot(id,'registration-before');
      entry.steps.push({round:0,preparation:true,prompt,status:'Submitting',submittedAt:new Date().toISOString()});await save();
      await page.click('button[aria-label="发送"]',{label:'登记本例原片等待处理'});
      return {registrationSubmitted:id};
    },
    async submit(id,round){
      const entry=state.cases[id];if(!entry||entry.steps.some(x=>x.round===round))throw Error('未准备或该轮已提交/受理未知，禁止重发');
      noOtherActive(id);
      if(entry.steps.some(x=>!['done','failed','cancelled','canceled','terminated'].includes(x.status)))throw Error('上一轮尚未结束');
      let prompt=prompts[id][round-1];
      if(round===1){
        if(entry.sources.length!==entry.sourceNames.length)throw Error('尚未取得本轮全部实际素材ID');
        const ids=entry.sourceNames.map(name=>entry.sources.find(s=>s.name===name||s.name?.endsWith(name))?.id);
        if(ids.some(x=>!x))throw Error('原片名称与已上传ID对应不明');
        prompt=prompt.replaceAll('{F文件ID}',ids[0]).replaceAll('{A文件ID}',ids[0]).replaceAll('{B文件ID}',ids[1]||'');
      }else{
        if(!entry.p1?.id||!entry.p1?.name||!entry.p1.mediaPrecheckPassed||entry.p1.semanticReviewFailed)throw Error('P1尚未通过媒体前置，或语义核验已失败');
        prompt=prompt.replaceAll('{P1文件名}',entry.p1.name).replaceAll('{P1文件ID}',entry.p1.id);
      }
      if(/\{[^}]+\}/.test(prompt))throw Error('提示词还有未替换变量');
      if(!String(await page.url()).includes(entry.conversationId))throw Error('会话不匹配');
      await page.waitForSelector('button[aria-label="发送"]',{state:'visible',timeout:20000});
      await page.fill('[contenteditable="true"]',prompt);
      const actual=await page.evaluate(()=>document.querySelector('[contenteditable="true"]')?.innerText?.trim());
      if(actual!==prompt)throw Error('输入框与完整原始提示词不一致');
      await shot(id,'round-'+round+'-before');
      entry.steps.push({round,prompt,status:'Submitting',submittedAt:new Date().toISOString()});await save();
      await page.click('button[aria-label="发送"]',{label:'提交本轮完整用例指令'});
      return {submitted:id,round};
    },
    async observe(id){
      const entry=state.cases[id],step=entry.steps.at(-1);if(!step)throw Error('没有已提交轮次');
      const messages=await api('/runtime-api/v1/conversations/'+entry.conversationId+'/messages?limit=200');
      await fs.writeFile(path.join(await directory(id),'messages.json'),JSON.stringify(messages,null,2));
      const normalize=x=>String(x).replace(/\s+/g,' ').trim();
      const accepted=[...(messages.messages||[])].reverse().find(m=>m.role==='user'&&normalize(m.text??m.content_text??'')===normalize(step.prompt)&&m.run_id);
      if(accepted)step.runId=accepted.run_id;
      if(accepted&&step.preparation&&Array.isArray(accepted.files)){
        entry.sources=accepted.files.map(file=>({id:file.file_id||file.cloud_file_id||file.id,name:file.name||file.filename,sha256:file.content_sha256,raw:file}));
        const manifest=JSON.parse(await fs.readFile(path.join(out,'media-manifest.json'),'utf8'));
        for(const source of entry.sources){
          const local=id==='SYNC-005'?manifest.controlledFixture:manifest.sourceFiles.find(x=>path.basename(x.path)===source.name);
          if(!local||source.sha256!==local.sha256)throw Error('云端上传原片与本例本地哈希不一致：'+source.name);
        }
      }
      if(!step.runId){await save();return {status:'Acceptance not yet observed'};}
      const run=await api('/runtime-api/v2/agent/runs/'+step.runId);
      if(run.conversation_id&&run.conversation_id!==entry.conversationId)throw Error('run与本例会话不一致');
      await fs.writeFile(path.join(await directory(id),'round-'+step.round+'-run.json'),JSON.stringify(run,null,2));
      step.status=run.status;await save();
      const live=[...(messages.messages||[])].reverse().find(m=>m.role==='assistant'&&(m.run_id===step.runId||m.job_id===step.runId));
      const activeTools=(live?.plan||[]).filter(n=>n.status==='running').map(n=>({tool:n.tool,format:n.arguments?.format}));
      return {status:run.status,progress:run.progress,runId:step.runId,activeTools,error:run.error,clarifications:run.clarifications,answer:run.messages?.filter(m=>m.role==='assistant').map(m=>m.content_text),plan:run.plan};
    }
  };
}
