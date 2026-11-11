export async function prepare008({page,context,fs,path}) {
 const s=globalThis.e196,crypto=await import('node:crypto'),b=s.cases['008B'];
 const content=structuredClone(b.before.content),target=content.tracks.find(x=>x.type==='subtitle').clips[0];
 const observedDelete=s.cases['007'].deleted.content.tracks.find(x=>x.type==='subtitle').clips[0].diff.find(x=>x.start_sec===6.64);
 target.diff=[{...observedDelete,text:'B工程保留字幕'}];
 const sample=s.saveSample,payload={...JSON.parse(sample.body),project_id:b.id,operation_id:crypto.randomUUID(),base_revision:b.before.revision,content};
 const headers={...sample.headers,...s.read.headers};delete headers['content-length'];delete headers.host;headers['idempotency-key']=payload.operation_id;
 await fs.writeFile(path.join(s.out,'case-008B-distinct-baseline-intent.json'),JSON.stringify({projectId:b.id,text:'B工程保留字幕',operationId:payload.operation_id,setupOnly:true},null,2));
 const res=await context.request.post(sample.url,{headers,data:payload});const raw=await res.json();if(!res.ok())throw Error('PB distinct setup failed HTTP '+res.status());
 b.before=(await s.getProject(b.id)).body;await fs.writeFile(path.join(s.out,'case-008B-before.json'),JSON.stringify(b.before,null,2));
 await s.open(b.name);if(await page.locator('button[data-tab="captions"]').getAttribute('aria-expanded')!=='true')await page.locator('button[data-tab="captions"]').click();
 await page.getByRole('button',{name:'B工程保留字幕',exact:true}).waitFor();await s.shot('case-008B-distinct-baseline');
 await s.open(s.cases['008A'].name);await page.keyboard.press('Escape');await s.shot('case-008A-before-request');
 const submitted=await s.submit('008','只把当前工程“E196-008A-20261105”中6.64～7.12秒、原文为“solution.”的这一条字幕原文改为“A目标固定”，译文、其他字幕、声音和视频不改。发送后即使我切换到另一个工程，也只能修改本次明确指定的工程A。');
 await s.open(b.name);await s.shot('case-008B-switched-while-running');
 s.switched={at:new Date().toISOString(),selectedName:await page.locator('.ed-project-name').innerText(),runId:submitted.body.run_id};
 await fs.writeFile(path.join(s.out,'case-008-switch.json'),JSON.stringify(s.switched,null,2));
 return {submission:submitted,switch:s.switched};
}
export async function run009({page,context,fs,path}) {
 const s=globalThis.e196,crypto=await import('node:crypto');const ids=[crypto.randomUUID(),'bb4f1a9a-c3fb-4de0-aa25-f48f15621303'];
 const beforeA=await s.getProject(s.cases['008A'].id),beforeB=await s.getProject(s.cases['008B'].id),invalid=[];
 if(beforeA.status!==200||beforeB.status!==200)throw Error('Missing valid read controls');
 for(const id of ids){const r=await s.getProject(id);invalid.push({target:id,...r});}
 const afterA=await s.getProject(s.cases['008A'].id),afterB=await s.getProject(s.cases['008B'].id);
 const result={caseId:'ERYE196-009',method:s.read.method,observedPath:s.read.path,validControls:[{projectId:s.cases['008A'].id,status:beforeA.status},{projectId:s.cases['008B'].id,status:beforeB.status}],invalid,unchangedA:JSON.stringify(beforeA.body)===JSON.stringify(afterA.body),unchangedB:JSON.stringify(beforeB.body)===JSON.stringify(afterB.body),boundary:'只覆盖页面真实GET读取请求，无效UUID及真实会话ID不能作为工程ID使用；未重放写请求。'};
 await fs.writeFile(path.join(s.out,'case-009-result.json'),JSON.stringify(result,null,2));
 await fs.writeFile(path.join(s.out,'case-009-valid-before-after.json'),JSON.stringify({beforeA,beforeB,afterA,afterB},null,2));
 await s.shot('case-009-current-project-unchanged');
 return result;
}
