import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export class Blocked extends Error {}
export class Failure extends Error {}
export function check(value,message){if(!value)throw new Failure(message);}
export const sha=b=>createHash('sha256').update(b).digest('hex');
export async function read(file,fallback){try{return JSON.parse(await fs.readFile(file,'utf8'));}catch(e){if(e.code==='ENOENT')return fallback;throw e;}}
export async function write(file,value){await fs.mkdir(path.dirname(file),{recursive:true});const tmp=file+'.tmp';await fs.writeFile(tmp,JSON.stringify(value,null,2)+'\n');await fs.rename(tmp,file);}
export async function exclusive(file,value){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(value,null,2)+'\n',{flag:'wx'});}
export const histSelector=id=>`button[aria-label="查看版本历史 ${id}"]`;
export async function state(p){return p.evaluate(async()=>{
 const c=document.querySelector('canvas[aria-label="图片编辑画布"]'),r=c?.getBoundingClientRect();
 let pixels=null;if(c&&c.width){const a=c.getContext('2d').getImageData(0,0,c.width,c.height).data;pixels=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',a))).map(x=>x.toString(16).padStart(2,'0')).join('');}
 const rect=r?{x:r.x,y:r.y,width:r.width,height:r.height}:null;
 return {url:location.href,title:document.querySelector('.ipe-header .ed-project-name')?.getAttribute('title'),width:c?.width,height:c?.height,pixels,rect,zoom:document.querySelector('button[aria-label="图片缩放"]')?.innerText,
 history:[...document.querySelectorAll('button[aria-label^="查看版本历史"]')].map(n=>({id:n.getAttribute('aria-label').replace('查看版本历史 ',''),selected:n.classList.contains('is-selected'),disabled:n.disabled})),
 running:!![...document.querySelectorAll('[role="status"]')].find(n=>/正在生成图片/.test((n.getAttribute('aria-label')??'')+n.textContent)),exportDisabled:document.querySelector('.ipe-export')?.disabled,
 pending:[...document.querySelectorAll('[aria-label="待发送的图片标注"] [role="listitem"],[aria-label="待发送的图片标注"] li')].map(n=>n.textContent),
 markers:[...document.querySelectorAll('.ipe-marker')].map(n=>{const a=n.getBoundingClientRect();return{label:n.getAttribute('aria-label'),left:n.style.left,top:n.style.top,x:a.x,bottom:a.bottom}}),body:document.querySelector('textarea[placeholder="添加批注…"]')?.value??null,
 selection:document.querySelector('.ipe-selection')?.getAttribute('style'),textValue:document.querySelector('input[aria-label="图片文字内容"]')?.value??null};
 });}
export async function capture(ctx,name){const s=await state(ctx.p);await write(path.join(ctx.out,name+'.json'),s);await fs.writeFile(path.join(ctx.out,name+'.txt'),await ctx.p.snapshot({scope:'full_page'}));await ctx.p.screenshot({path:path.join(ctx.out,name+'.png')});return s;}
export async function canvasFile(p,file){const data=await p.evaluate(()=>document.querySelector('canvas[aria-label="图片编辑画布"]').toDataURL());await fs.writeFile(file,Buffer.from(data.split(',')[1],'base64'));return file;}
export async function goto(ctx,cid){const {p,cfg}=ctx;const url=cfg.baseURL+'c/'+cid;if(await p.url()!==url)await p.goto(url);await p.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
 if(await p.evaluate(()=>!!document.querySelector('button[aria-label="视频编辑器"]')))await p.click('button[aria-label="视频编辑器"]');
 // Do not discard another run's draft or stop a running task.
 if(await p.evaluate(()=>!!document.querySelector('button[aria-label="停止任务"]')))throw new Blocked('Conversation has an in-flight task; resume its checkpoint first');
}
export async function project(ctx,f){await goto(ctx,f.cid);const {p}=ctx;
 await p.waitForSelector('.ed-project-trigger',{state:'visible',timeout:20000});await p.waitForFunction(()=>{const b=document.querySelector('.ed-project-trigger');return b&&!b.disabled;},undefined,{timeout:20000});
 const title=await p.evaluate(()=>document.querySelector('.ipe-header .ed-project-name')?.title);
 if(title!==f.name){await p.click('.ed-project-trigger');await p.waitForFunction(name=>[...document.querySelectorAll('.ed-project-option .ed-project-name')].some(n=>n.title===name),f.name,{timeout:20000});
 // The real observed picker has truncated names. Select by full DOM title, never by model text.
 await p.evaluate(name=>{const nodes=[...document.querySelectorAll('.ed-project-option .ed-project-name')].filter(n=>n.title===name);if(nodes.length!==1)throw Error('Project name ambiguous');nodes[0].closest('button').click();},f.name);}
 if(await p.evaluate(()=>document.querySelector('.ed-project-trigger')?.getAttribute('aria-expanded')==='true'))await p.click('.ed-project-trigger');
 await p.waitForSelector(histSelector(f.version),{state:'visible',timeout:20000});await version(ctx,f.version);
}
export async function version(ctx,id){const {p}=ctx;await p.click(histSelector(id));await p.waitForFunction(id=>{const n=document.querySelector('button[aria-label="查看版本历史 '+id+'"]');return n?.classList.contains('is-selected')&&!document.querySelector('.ipe-stage.is-loading');},id,{timeout:20000});
 // Wait for two animation frames after the selected image paints, rather than a fixed sleep.
 await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
}
export function sameHistory(a,b){return JSON.stringify(a.history.map(x=>x.id).sort())===JSON.stringify(b.history.map(x=>x.id).sort());}
export async function oracle(ctx,key){const all=await read(path.join(ctx.out,'oracles.json'),{});if(!all[key])throw new Blocked('Missing independent fixture oracle '+key);return all[key];}
export function matches(s,o,label){check(s.title===o.title&&s.width===o.width&&s.height===o.height&&s.pixels===o.pixels,label+' canvas differs from registered baseline');}
export async function zoom(ctx,label){await ctx.p.click('button[aria-label="图片缩放"]');await ctx.p.click(`loc=role:menuitemradio[name="${label}"]`);await ctx.p.waitForFunction(l=>document.querySelector('button[aria-label="图片缩放"]')?.innerText.trim()===(l==='缩放以适应'?'适应窗口':l),label,{timeout:5000});await ctx.p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
export async function messages(ctx){const cid=(await ctx.p.url()).split('/c/')[1]?.split('?')[0];const r=await ctx.p.fetch(`/runtime-api/v1/conversations/${cid}/messages?limit=200`,{timeout:20000});if(!r.ok)throw new Blocked('Cannot read actual run messages: '+r.status);return JSON.parse(r.body).messages;}
export async function submit(ctx,key,prompt){const file=path.join(ctx.out,key+'-submission.json');let c=await read(file,null);if(c)return c;
 const ms=await messages(ctx);c={prompt,attemptedAt:new Date().toISOString(),priorRunIds:ms.filter(x=>x.role==='assistant').map(x=>x.job_id),runId:null};
 if(await ctx.p.evaluate(()=>!!document.querySelector('button[aria-label="停止任务"]')))throw new Blocked('Task already in flight');
 await ctx.p.fill('[contenteditable="true"]',prompt);check(await ctx.p.evaluate(()=>document.querySelector('[contenteditable="true"]').innerText)===prompt,'Prompt input mismatch');await capture(ctx,key+'-before');
 await exclusive(file,c); // Durable guard before click: ambiguous click never triggers automatic resubmission.
 await ctx.p.click('button[aria-label="发送"]');await capture(ctx,key+'-submitted');return c;
}
export async function clarify(ctx,key,policy){const {p}=ctx;const form=await p.evaluate(()=>document.querySelector('form[aria-label="待澄清的问题"]')?.innerText??null);if(!form)return false;
 const log=path.join(ctx.out,key+'-clarifications.json');const done=await read(log,[]);const sig=sha(form);if(done.some(x=>x.sig===sig))throw new Blocked('Previously answered clarification still visible; inspect without resubmission');
 await capture(ctx,key+'-clarification-'+done.length);
 if(/工程.*ID|工程 ID/.test(form)&&policy.projectId){await p.fill('form[aria-label="待澄清的问题"] input[placeholder="自定义"]',policy.projectId);await write(log,[...done,{sig,question:form,value:policy.projectId}]);await p.click('form[aria-label="待澄清的问题"] button:text-is("提交")');return true;}
 const options=await p.evaluate(()=>[...document.querySelectorAll('form[aria-label="待澄清的问题"] [role="radio"],form[aria-label="待澄清的问题"] input[type="radio"]')].map(n=>({text:n.parentElement.textContent.trim(),id:n.id,value:n.value,html:n.outerHTML})));
 const option=options.find(x=>policy.choiceContains&&x.text.includes(policy.choiceContains));
 if(option){await write(log,[...done,{sig,question:form,value:option.text}]);
 const index=options.indexOf(option);await p.click(`form[aria-label="待澄清的问题"] [role="radio"],form[aria-label="待澄清的问题"] input[type="radio"] >> nth=${index}`);return true;}
 throw new Blocked('Unmapped clarification; explicit answer required. Saved question: '+key+'-clarification-'+done.length);
}
export async function turn(ctx,key,prompt,policy={}){const file=path.join(ctx.out,key+'-submission.json');let c=await submit(ctx,key,prompt);
 for(let n=0;n<1;n++){
 const ms=await messages(ctx);const a=ms.filter(x=>x.role==='assistant'&&x.job_id&&!c.priorRunIds.includes(x.job_id)).at(-1);
 if(a){c.runId=a.job_id;await write(file,c);await write(path.join(ctx.out,key+'-run.json'),a);
 if(['done','failed','cancelled'].includes(a.status)){await capture(ctx,key+'-terminal');return a;}}
 if(await clarify(ctx,key,policy))continue;
 try{await ctx.p.waitForFunction(id=>{const n=id?document.querySelector('[data-agent-run-id="'+id+'"]'):null;return !!document.querySelector('form[aria-label="待澄清的问题"]')||(n&&['done','failed','cancelled'].includes(n.getAttribute('data-task-status')));},c.runId,{timeout:35000});}catch{}
 }
 return null;
}
export async function downloadResults(ctx,key,a){const files=(a.result_files??a.files??[]).filter(x=>x.kind==='image');const result=[];
 for(let i=0;i<files.length;i++){const f=files[i],id=f.file_id??f.facts?.file_id;if(!id)continue;
 // Read-only documented file URL exposed by the actual result anchor.
 const r=await ctx.p.fetch(`/cloud-tool-api/v1/agent/files/${id}/url?disposition=inline`,{timeout:20000});if(!r.ok)throw new Blocked('File URL HTTP '+r.status);
 const j=JSON.parse(r.body);const url=j.url??j.download_url??j.data?.url;if(!url)throw new Blocked('Actual file response contains no download URL');
 const dest=path.join(ctx.out,key+'-result-'+i+'.png');const b=await ctx.p.fetch(url,{saveAs:dest,timeout:30000});if(!b.ok)throw new Blocked('Artifact download HTTP '+b.status);
 const bytes=await fs.readFile(dest);check(bytes.subarray(1,4).toString()==='PNG','Expected actual PNG result');result.push({fileId:id,name:f.name,path:dest,bytes:bytes.length,sha256:sha(bytes)});
 }await write(path.join(ctx.out,key+'-files.json'),result);return result;}
export async function exportUI(ctx,name){await ctx.p.click('.ipe-export');await ctx.p.waitForSelector('select[aria-label="图片导出格式"]',{state:'visible',timeout:5000});await ctx.p.selectOption('select[aria-label="图片导出格式"]',{label:'PNG · 保留透明背景'});const promise=ctx.p.waitForEvent('download',{timeout:10000});await ctx.p.click('button:text-is("下载图片")');const d=await promise;const dest=path.join(ctx.out,name+'.png');await d.saveAs(dest);return{name:d.suggestedFilename(),path:dest,bytes:(await fs.stat(dest)).size};}

export async function drag(ctx,points){const m=await state(ctx.p);const q=points.map(([x,y])=>[m.rect.x+m.rect.width*x,m.rect.y+m.rect.height*y]);await ctx.p.mouse.move(...q[0]);await ctx.p.mouse.down();for(const xy of q.slice(1))await ctx.p.mouse.move(...xy);await ctx.p.mouse.up();await ctx.p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
export async function selectPoint(ctx,x,y){const m=await state(ctx.p);await ctx.p.mouse.click(m.rect.x+m.rect.width*x,m.rect.y+m.rect.height*y);await ctx.p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
