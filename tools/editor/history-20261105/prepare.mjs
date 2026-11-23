export async function run({page,context,fs,path}) {
 const s=globalThis.e196,crypto=await import('node:crypto');
 const sample=s.requests.findLast(x=>x.path.endsWith('/projects/save')&&x.method==='POST');if(!sample)throw Error('Missing observed UI save request');
 s.saveSample=sample;s.cases={};
 const initial=JSON.parse(sample.body);const current=await s.getProject(initial.project_id);
 for(const suffix of ['005','006','007','008A','008B']) {
  const id=suffix==='005'?initial.project_id:crypto.randomUUID();
  const content=structuredClone(s.before.content);content.project_id=id;content.name='E196-'+suffix+'-20261105';
  const payload={...initial,project_id:id,operation_id:crypto.randomUUID(),base_revision:suffix==='005'?current.body.revision:0,content};
  const headers={...sample.headers};delete headers['content-length'];delete headers.host;headers['idempotency-key']=payload.operation_id;
  const record={case:suffix,id,name:content.name,intentAt:new Date().toISOString(),operationId:payload.operation_id,setupOnly:true};
  await fs.writeFile(path.join(s.out,'setup-'+suffix+'-intent.json'),JSON.stringify(record,null,2));
  const res=await context.request.post(sample.url,{headers,data:payload});const body=await res.json();
  await fs.writeFile(path.join(s.out,'setup-'+suffix+'-response.json'),JSON.stringify({status:res.status(),body},null,2));
  if(!res.ok())throw Error('Setup save failed '+suffix+' HTTP '+res.status());
  const saved=await s.getProject(id);if(saved.status!==200||saved.body.content.name!==content.name)throw Error('Copy verification failed');
  s.cases[suffix]={...record,before:saved.body};
  await fs.writeFile(path.join(s.out,'case-'+suffix+'-before.json'),JSON.stringify(saved.body,null,2));
 }
 s.open=async(name,p=page)=>{
  if(!(await p.locator('.ed-project-name').count()))await p.getByRole('button',{name:'视频编辑器',exact:true}).click();
  await p.locator('.ed-project-name').click();
  await p.getByRole('button',{name:new RegExp('^'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).last().click();
  await p.locator('.ed-project-name').filter({hasText:name}).waitFor({timeout:25000});
 };
 await page.reload({waitUntil:'domcontentloaded'});await page.locator('#workspace-prompt').waitFor({timeout:30000});
 await s.open(s.cases['005'].name);await page.locator('button[data-tab="captions"]').click();
 return {copies:Object.values(s.cases).map(x=>({case:x.case,id:x.id,name:x.name})),originalUntouched:(await s.getProject()).body.revision===s.before.revision};
}
