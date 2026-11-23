import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
export async function context(page,root,out){
 const cases=JSON.parse(await fs.readFile(path.join(root,'docs/design-cases/icp-workflows/cases.json'),'utf8'));
 const file=path.join(out,'execution.json'); let state;
 try{state=JSON.parse(await fs.readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;state={date:'2026-11-16',environment:'production',promptPolicy:'document-verbatim',cases:{}};}
 const save=async()=>fs.writeFile(file,JSON.stringify(state,null,2)+'\n');
 const api=async(url,data,method)=>{const r=await page.fetch(url,{method:method||(data?'POST':'GET'),...(data?{headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:{}),timeout:30000});if(!r.ok)throw Error(`${url.split('?')[0]} HTTP ${r.status}`);return typeof r.body==='string'?JSON.parse(r.body):r.body;};
 const shot=async(id,name)=>{const dir=path.join(out,id);await fs.mkdir(dir,{recursive:true});await page.screenshot({path:path.join(dir,name+'.png').replaceAll('\\','/')});await fs.writeFile(path.join(dir,name+'.txt'),await page.snapshot({scope:'full_page'}));return path.join(dir,name+'.png');};
 return {state,save,api,shot,cases,page,outputDirectory:out,
 async prepare(id){
  if(state.supersededByUser)throw Error('旧批次已被用户替换，只允许观察历史');
  if(state.cases[id])throw Error('已有检查点，禁止重复新建/发送：'+id);
  if(!state.workspaceId){state.workspaceId=crypto.randomUUID();await save();await api('/runtime-api/v1/projects/'+state.workspaceId,{project_id:state.workspaceId,display_name:state.workspaceName||'ICP工作流模拟-20261116'},'PUT');}
  const c=cases.find(c=>c.id===id);if(!c)throw Error('unknown case');
  const entry=state.cases[id]={conversationId:crypto.randomUUID(),status:'In Progress',steps:[],source:c.sheet+'!'+c.sourceRange};await save();
  await api('/runtime-api/v1/conversations/'+entry.conversationId,{conversation_id:entry.conversationId,project_id:state.workspaceId,title:id+'-'+c.role.slice(0,30),messages_partial:true,response_message_limit:30,response_include_project_json:true,response_include_editor_project:true},'PUT');
  await page.goto('https://app.cinlink.ai/c/'+entry.conversationId,{timeout:60000});await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
  await page.waitForFunction(id=>document.querySelector('button[aria-label="视频编辑器"]')?.parentElement?.innerText.includes(id)&&!!document.querySelector('button[aria-label="发送"]'),id,{timeout:30000});return entry;
 },
 async references(id,files,text){
  if(state.supersededByUser)throw Error('旧批次已被用户替换，只允许观察历史');
  const entry=state.cases[id];if(!entry)throw Error('先建立本例独立会话');
  if(entry.preparations?.length||entry.steps.length)throw Error('已有提交检查点，先沿原任务观察，禁止重放资料准备');
  if(!files.length||files.length>20)throw Error('参考资料单次1～20个素材');
  const prompt=state.promptPolicy==='document-verbatim'?'参考资料，暂不制作。':'这是下一轮制作的公共参考资料。请只接收并保留这些素材，暂时不要生成图片、视频或新工程，等待我下一条完整制作要求。资料完整正文如下：\n'+text;
  entry.preparations=[{index:0,prompt,reason:'单次最多20份素材，先载入公共参考',status:'Submitting',submittedAt:new Date().toISOString()}];entry.activePreparation=true;await save();
  await page.setInputFiles('input[type=file]',files);await page.fill('[contenteditable="true"]',prompt);await shot(id,'references-before-submit');await page.click('button[aria-label="发送"]',{label:'载入本例公共参考资料'});
 },
 async submit(id,index,extra=''){
  if(state.supersededByUser)throw Error('旧批次已被用户替换，只允许观察历史');
  const c=cases.find(c=>c.id===id),entry=state.cases[id];if(entry.steps.some(s=>s.index===index))throw Error('步骤已提交或状态不确定，禁止重发');
  if(state.promptPolicy==='document-verbatim'&&extra.trim())throw Error('本批按文档原文发送；必要资料仅通过附件或实际补槽提供，禁止追加提示词');
  if(entry.activePreparation&&entry.preparations.at(-1)?.status==='done'){entry.activePreparation=false;await save();}
  if(entry.steps.some(s=>!['done','failed','cancelled'].includes(s.status))||entry.activePreparation)throw Error('先观察原任务终态或完成补槽，不能重叠提交');
  const prompt=c.steps[index].value+(extra?'\n\n测试素材说明：'+extra:'');
  entry.steps.push({index,prompt,documentVerbatim:prompt===c.steps[index].value,status:'Submitting',submittedAt:new Date().toISOString()});await save();
  await page.fill('[contenteditable="true"]',prompt);await shot(id,'step-'+index+'-before');await page.click('button[aria-label="发送"]',{label:'提交当前用例完整提示词'});await save();
 },
 async observe(id){
  const entry=state.cases[id],step=entry.activePreparation?entry.preparations.at(-1):entry.steps.at(-1),messages=await api('/runtime-api/v1/conversations/'+entry.conversationId+'/messages?limit=200');
  const dir=path.join(out,id);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'messages.json'),JSON.stringify(messages,null,2));
  const normalized=s=>String(s).replace(/\s+/g,' ').trim();
  const accepted=[...(messages.messages||[])].reverse().find(m=>m.role==='user'&&normalized(m.text??m.content_text??'')===normalized(step.prompt)&&m.run_id);
  if(accepted)step.runId=accepted.run_id;
  if(!step.runId){await save();return {status:'Acceptance not yet observed'};}
  const run=await api('/runtime-api/v2/agent/runs/'+step.runId);if(run.conversation_id&&run.conversation_id!==entry.conversationId)throw Error('会话不匹配');
  await fs.writeFile(path.join(dir,(entry.activePreparation?'preparation-':'step-')+step.index+'-run.json'),JSON.stringify(run,null,2));step.status=run.status;await save();
  return {status:run.status,runId:step.runId,error:run.error,clarifications:run.clarifications,messages:run.messages,plan:run.plan};
 }
 };
}
