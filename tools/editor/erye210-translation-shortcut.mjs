// Continue the native translation shortcut with explicit target language and subtitle mode.
// The preceding free-text preparation is terminal-failed and retained separately.
import { chromium, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('reports/editor-210',process.env.CINLINK_ERYE210_SHORTCUT_BATCH||'prod-current-five-shortcut-20261116-04');await mkdir(out,{recursive:true});
const checkpoint=path.join(out,'translation-shortcut-private.json');
const b=await chromium.connectOverCDP('http://127.0.0.1:9342');const ps=b.contexts().flatMap(c=>c.pages().filter(p=>p.url().startsWith('https://app.cinlink.ai/')));
if(ps.length!==1)throw Error('Exactly one production test tab is required');const p=ps[0];p.setDefaultTimeout(30000);process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const save=async()=>writeFile(checkpoint,JSON.stringify(s,null,2));
const find=(v,key)=>{if(!v||typeof v!=='object')return '';if(typeof v[key]==='string')return v[key];for(const x of Object.values(v)){if(Array.isArray(x)){for(const y of x){const r=find(y,key);if(r)return r;}}else{const r=find(x,key);if(r)return r;}}return '';};
let s=existsSync(checkpoint)?JSON.parse(await readFile(checkpoint,'utf8')):{};
if(!s.attemptedAt && process.env.CINLINK_ERYE210_SHORTCUT_BOOTSTRAP==='1') {
  if(!s.workspaceId){
    s.workspaceId=crypto.randomUUID();s.workspaceName='ERYE210-048-真实翻译配音-'+Date.now();await save();
    const status=await p.evaluate(async({id,name})=>{const r=await fetch('/runtime-api/v1/projects/'+id,{method:'PUT',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({project_id:id,display_name:name})});return r.status;},{id:s.workspaceId,name:s.workspaceName});
    if(status<200||status>=300)throw Error('Owned workspace preparation HTTP '+status);s.workspaceReady=true;await save();
  }
  if(!s.workspaceReady)throw Error('Inspect original workspace create before repeating');
  await p.goto('https://app.cinlink.ai/?project_id='+s.workspaceId,{waitUntil:'domcontentloaded'});await p.locator('#workspace-prompt').waitFor();
  await expect(p.getByRole('button',{name:'切换项目',exact:true})).toHaveText(s.workspaceName);
  await p.getByRole('button',{name:'翻译配音',exact:true}).click();await p.getByRole('button',{name:'目标语言：English',exact:true}).first().click();await p.getByRole('option',{name:'简体中文',exact:true}).click();
  await p.getByRole('button',{name:'字幕显示模式：译文',exact:true}).first().click();await p.getByRole('option',{name:'双语',exact:true}).click();
  await p.locator('.workspace-composer-shell input[type=file]').setInputFiles(path.resolve('reports/yunxiao/ERYE210-019-INDEPENDENT-AUDIO-DELETE-PROD-20261113-input/E196-A.mp4'));
}
if(!s.attemptedAt){
  await expect(p.getByRole('button',{name:'翻译模式：配音和字幕',exact:true}).first()).toBeVisible();
  await expect(p.getByRole('button',{name:'目标语言：简体中文',exact:true}).first()).toBeVisible();
  await expect(p.getByRole('button',{name:'字幕显示模式：双语',exact:true}).first()).toBeVisible();
  await expect(p.getByRole('listitem',{name:'E196-A.mp4 00:20',exact:true})).toHaveCount(1);
  s.prompt='将本次唯一上传的20秒英语原片 E196-A.mp4 翻译成简体中文普通话配音。使用系统默认音色，不使用音色克隆、不做口型同步；保留英语原文与简体中文双语字幕、完整画面、原时长及1920×1080分辨率，保留背景声音且替换原英语人声，不剪辑、不添加水印。请生成可继续编辑的翻译配音工程，目标语言为简体中文，并交付MP4。';
  await p.locator('#workspace-prompt').fill(s.prompt);await p.screenshot({path:path.join(out,'shortcut-complete-settings-before-submit.png')});
  s.attemptedAt=new Date().toISOString();s.parameters={translationMode:'配音和字幕',targetLanguage:'简体中文',subtitleDisplayMode:'双语',voice:'系统默认音色，非克隆'};await save();
  const response=p.waitForResponse(r=>r.request().method()==='POST'&&(/\/agent\/runs$/.test(new URL(r.url()).pathname)||/\/conversations\/[^/]+\/turns$/.test(new URL(r.url()).pathname)),{timeout:45000});
  await p.getByRole('button',{name:'发送',exact:true}).click();const r=await response;const body=await r.json();s.receipt={httpStatus:r.status(),body};s.submissionBody=r.request().postDataJSON();s.runId=find(body,'run_id')||find(body,'job_id');await save();
  await expect.poll(()=>p.url()).toMatch(/\/c\//);s.cid=new URL(p.url()).pathname.split('/c/')[1];await save();
}
if(!s.runId||!s.cid)throw Error('Original submission uncertain; inspect it before any new attempt');
if(new URL(p.url()).pathname!=='/c/'+s.cid)await p.goto('https://app.cinlink.ai/c/'+s.cid,{waitUntil:'domcontentloaded'});
const until=Date.now()+600000;let last='';
async function materializeNativeProject(message){
  const caseId=process.env.CINLINK_ERYE210_PREPARE_CASE;if(!caseId)return;
  if(!['047','048'].includes(caseId))throw Error('Only 047/048 are voice fixtures');
  const projectId=message.result_files?.find(f=>f.facts?.editor_project_id)?.facts.editor_project_id;
  if(!projectId)throw Error('Completed workflow has no real editable project receipt');
  const project=await p.evaluate(async id=>(await fetch('/cloud-tool-api/v1/editor/projects/'+id,{credentials:'include'})).json(),projectId);
  const name=project.content.name;
  if(!await p.locator('.ed-project-trigger').isVisible())await p.locator('.workspace-progress-artifacts').getByRole('button',{name:'进入编辑器',exact:true}).click();
  await expect(p.locator('.ed-project-name')).toBeVisible();
  if(await p.locator('.ed-project-name').innerText()!==name){await p.locator('.ed-project-trigger').click();await p.getByRole('dialog').getByRole('button',{name,exact:true}).click();}
  const voice=p.getByRole('navigation',{name:'编辑器功能',exact:true}).getByRole('button',{name:'配音',exact:true});if(await voice.getAttribute('aria-pressed')!=='true')await voice.click();
  const texts=p.locator('.ed-voice-panel textarea[aria-label$="配音文案"]'),create=p.getByRole('button',{name:'创建配音',exact:true});
  await expect.poll(async()=>await texts.count()>=2||await create.isVisible()).toBe(true);
  if(await texts.count()<2){
    if(s.displayInitializationAttempted)throw Error('Original display initialization has already been attempted; inspect its result, never resubmit');
    s.displayInitializationAttempted=true;await save();await create.click();
  }
  await expect.poll(()=>texts.count(),{timeout:90000}).toBeGreaterThanOrEqual(2);
  await expect(p.locator('.ed-save-status')).toHaveText('已同步');
  s.editableProject={pid:projectId,cid:s.cid,name};s.voiceTexts=await texts.evaluateAll(es=>es.map(e=>e.value));await save();
  const ready=await p.evaluate(async id=>(await fetch('/cloud-tool-api/v1/editor/projects/'+id,{credentials:'include'})).json(),projectId);
  await writeFile(path.join(out,'ready-native-project-private.json'),JSON.stringify(ready,null,2));
  await p.screenshot({path:path.join(out,'real-native-translated-voice-project.png')});
  const direct={id:caseId,f:s.editableProject,workspaceId:s.workspaceId||'d6788b2d-63bc-4ed4-b812-38a1dc8ccc4a',runId:s.runId,checks:[]};
  await writeFile(path.join(out,'direct'+caseId+'.json'),JSON.stringify(direct,null,2));
  console.log(JSON.stringify({directFixture:path.join(out,'direct'+caseId+'.json'),projectId,voiceSentences:s.voiceTexts.length}));
}
while(Date.now()<until){
  const body=await p.evaluate(async cid=>(await fetch('/runtime-api/v1/conversations/'+cid+'/messages?limit=200',{credentials:'include'})).json(),s.cid);
  const m=body.messages?.filter(m=>m.role==='assistant'&&(m.run_id===s.runId||m.job_id===s.runId)).at(-1);const status=String(m?.status||'');
  if(status!==last){console.log(JSON.stringify({runId:s.runId,status,text:m?.text?.slice(0,500)}));last=status;}
  s.lastStatus=status;s.lastObservedAt=new Date().toISOString();await save();
  const form=p.locator('.node-clarification:visible,.clarification-card:visible').first();
  if(await form.count()){await writeFile(path.join(out,'pending-clarification.json'),JSON.stringify({text:await form.innerText(),controls:await form.locator('input,select,button,textarea').evaluateAll(es=>es.map(e=>({tag:e.tagName,label:e.getAttribute('aria-label'),text:e.textContent,value:e.value})))},null,2));await p.screenshot({path:path.join(out,'pending-clarification.png')});}
  const plans=p.locator('.node-plan-review__actions button').filter({hasText:/^(提交|Submit)$/});
  if(await plans.count()===1&&await plans.isVisible()&&await plans.isEnabled()){
    const text=await plans.locator('xpath=../..').innerText();s.confirmations||=[];
    if(!s.confirmations.includes(text)){s.confirmations.push(text);await save();await p.screenshot({path:path.join(out,'translation-plan-before-confirm.png')});await plans.click();}
  }
  if(/completed|succeeded|^done$|failed|error|cancelled/i.test(status)){s.terminal={status,text:m?.text,errorCode:m?.error_code,errorMessage:m?.error_msg};await writeFile(path.join(out,'terminal-private.json'),JSON.stringify(m,null,2));await save();await p.screenshot({path:path.join(out,'translation-terminal.png')});console.log(JSON.stringify({terminal:s.terminal,cid:s.cid}));if(/completed|succeeded|^done$/i.test(status))await materializeNativeProject(m);process.exit(0);}
  await p.waitForTimeout(2000);
}
await p.screenshot({path:path.join(out,'original-task-pending.png')});console.log('Original translation still pending; do not resend');process.exit(0);
