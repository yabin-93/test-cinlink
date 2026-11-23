export async function run({page,context,fs,path}) {
 const s=globalThis.e196,crypto=await import('node:crypto');
 const messages=await s.messages();await fs.writeFile(path.join(s.out,'messages-final.json'),JSON.stringify(messages,null,2));
 const runs=[];
 for(const p of s.prompts){
  const runId=p.response.body.run_id,m=messages.messages.findLast(x=>x.job_id===runId&&x.role==='assistant');
  if(!m||['running','queued'].includes(m.status))throw Error('Run not terminal '+p.caseId);
  await fs.writeFile(path.join(s.out,'case-'+p.caseId+'-run-message.json'),JSON.stringify(m,null,2));
  runs.push({caseId:p.caseId,runId,status:m.status,error:m.error_msg,text:m.text,durationMs:m.total_duration_ms,prompt:p.prompt,at:p.at});
 }
 const projects=[];
 for(const [key,c] of Object.entries(s.cases)){
  const r=await s.getProject(c.id);if(r.status!==200||r.body.project_id!==c.id)throw Error('Wrong target read '+key);
  await fs.writeFile(path.join(s.out,'case-'+key+'-final-project.json'),JSON.stringify(r,null,2));
  const expected=key==='007'?c.deleted.content:c.before.content;
  projects.push({case:key,id:c.id,name:c.name,beforeRevision:c.before.revision,finalRevision:r.body.revision,contentMatchesExpected:JSON.stringify(r.body.content)===JSON.stringify(expected)});
 }
 const original=await s.getProject();await fs.writeFile(path.join(s.out,'original-project-final.json'),JSON.stringify(original,null,2));
 const originalPreserved=original.status===200&&original.body.project_id===s.projectId&&original.body.revision===s.before.revision&&JSON.stringify(original.body.content)===JSON.stringify(s.before.content);
 // The browser was already refreshed during evidence recovery; open each project
 // through its actual UI to verify the persisted state without another reload.
 await page.locator('#workspace-prompt').waitFor({timeout:30000});
 await s.open(s.cases['006'].name);if(await page.locator('button[data-tab="captions"]').getAttribute('aria-expanded')!=='true')await page.locator('button[data-tab="captions"]').click();
 await s.shot('case-006-refreshed-unchanged');
 await s.open(s.cases['007'].name);await s.shot('case-007-refreshed-unchanged');
 await s.open(s.before.content.name);await page.keyboard.press('Escape');await page.locator('#workspace-prompt').fill('');await s.shot('original-project-restored-view');
 const images=[];for(const name of (await fs.readdir(s.out)).filter(x=>x.endsWith('.png')).sort()){
  const bytes=await fs.readFile(path.join(s.out,name));if(bytes.toString('hex',0,8)!=='89504e470d0a1a0a')throw Error('Invalid PNG');
  images.push({name,bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
 }
 const result={date:'2026-11-05',timezone:'Asia/Shanghai',headed:true,serial:true,retries:0,conversationId:'bb4f1a9a-c3fb-4de0-aa25-f48f15621303',runs,projects,originalProjectPreserved:originalPreserved,originalRevision:s.before.revision,screenshotCount:images.length,clarification:{caseId:'006',question:'选择目标工程：此前的 E196-005 或当前的 E196-006',answer:s.cases['006'].id,label:s.cases['006'].name,beforeAnswerUnchanged:true},aiRunsSubmitted:s.prompts.length,yunxiaoWrites:0};
 await fs.writeFile(path.join(s.out,'evidence-manifest.json'),JSON.stringify(images,null,2));await fs.writeFile(path.join(s.out,'execution-summary.json'),JSON.stringify(result,null,2));
 return {runs:runs.map(x=>({caseId:x.caseId,runId:x.runId,status:x.status,error:x.error})),projects,originalProjectPreserved:originalPreserved,screenshots:images.length};
}
