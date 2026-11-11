export async function run({page,context,fs,path}) {
 const out=path.join(process.cwd(),'reports','erye196-005-009-20261105');await fs.mkdir(out,{recursive:true});
 const state=globalThis.e196={out,projectId:'3bc78d71-8cf6-4caf-b347-a2f19962f471',requests:[],responses:[],prompts:[]};
 page.on('request',r=>{const u=new URL(r.url());if(u.pathname.startsWith('/cloud-tool-api/v1/editor/projects/')){state.requests.push({method:r.method(),path:u.pathname,body:r.postData(),headers:r.headers(),url:r.url()});}});
 page.on('response',async r=>{const u=new URL(r.url());if(/\/editor\/projects\/[a-f0-9-]+$/.test(u.pathname)&&r.request().method()==='GET'){try{state.responses.push({path:u.pathname,status:r.status(),body:await r.json()});}catch{}}});
 await page.reload({waitUntil:'domcontentloaded'});await page.locator('#workspace-prompt').waitFor({timeout:30000});
 await page.getByRole('button',{name:'字幕',exact:true}).click();
 await page.waitForFunction(()=>document.body.innerText.includes('solution.'),{},{timeout:25000});
 const r=state.responses.filter(x=>x.path.endsWith(state.projectId)).at(-1);if(!r)throw Error('No actual project read captured');
 state.before=r.body;await fs.writeFile(path.join(out,'baseline-original-project.json'),JSON.stringify(r.body,null,2));
 const read=state.requests.find(x=>x.method==='GET'&&x.path.endsWith(state.projectId));state.read=read;
 state.getProject=async(id=state.projectId)=>{const res=await context.request.get(read.url.replace(state.projectId,id),{headers:read.headers});return {status:res.status(),body:await res.json()};};
 const ui=await page.evaluate(()=>({buttons:[...document.querySelectorAll('button')].map(x=>({text:x.innerText,title:x.title,aria:x.getAttribute('aria-label')})).filter(x=>x.text||x.title||x.aria).slice(0,27)}));
 return {baselineStatus:r.status,projectKeys:Object.keys(r.body),ui};
}
