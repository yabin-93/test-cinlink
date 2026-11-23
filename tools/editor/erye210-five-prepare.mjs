// Prepare owned, real media baselines when the signed-in account cannot read old fixtures.
// Native uploads only; stop on a partial preparation and continue its checkpoint, never rerun blindly.
import { chromium, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const out = path.resolve('reports/editor-210/prod-current-five-20261116-prepare');
await mkdir(out, { recursive: true }); process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const b = await chromium.connectOverCDP('http://127.0.0.1:9342');
const pages = b.contexts().flatMap(c => c.pages().filter(p => p.url().startsWith('https://app.cinlink.ai/')));
if (pages.length !== 1) throw Error('Must have exactly one production test page');
const p = pages[0]; p.setDefaultTimeout(30000);
const file = path.join(out, 'checkpoint-private.json');
let s = existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : {};
p.on('response', async r => { const m = new URL(r.url()).pathname.match(/^\/cloud-tool-api\/v1\/editor\/projects\/([a-f0-9-]+)$/); if (m && r.request().method() === 'GET' && r.ok()) { s.pid = m[1]; } });
const save = async () => writeFile(file, JSON.stringify(s, null, 2));
const json = async (route, data, method = 'GET') => p.evaluate(async ({route,data,method}) => {
  const r = await fetch(route, { method, credentials:'include', ...(data ? {headers:{'Content-Type':'application/json'},body:JSON.stringify(data)} : {}) });
  if (!r.ok) throw Error('HTTP '+r.status+' '+route); return r.json();
}, {route,data,method});
if (!s.wid) { s.wid = randomUUID(); await save(); await json('/runtime-api/v1/projects/'+s.wid,{project_id:s.wid,display_name:'ERYE210-045049-素材准备-20261116'},'PUT'); s.workspaceReady=true; await save(); }
if (!s.workspaceReady) throw Error('Verify original workspace create before continuing');
if (!s.cid) { s.cid = randomUUID(); await save(); await json('/runtime-api/v1/conversations/'+s.cid,{conversation_id:s.cid,project_id:s.wid,title:'ERYE210-045049-真实源素材准备',messages_partial:true,response_message_limit:30,response_include_editor_project:true},'PUT'); s.conversationReady=true; await save(); }
if (!s.conversationReady) throw Error('Verify original conversation create before continuing');
await p.goto('https://app.cinlink.ai/c/'+s.cid,{waitUntil:'domcontentloaded'}); await p.locator('#workspace-prompt').waitFor();
if (!await p.locator('.ed-project-trigger').isVisible()) await p.getByRole('button',{name:'视频编辑器',exact:true}).click();
if (!s.videoAttempted) {
  s.videoAttempted=true; await save(); const chooser=p.waitForEvent('filechooser'); await p.getByRole('button',{name:'选择媒体',exact:true}).click();
  await (await chooser).setFiles(path.resolve('reports/yunxiao/ERYE210-019-INDEPENDENT-AUDIO-DELETE-PROD-20261113-input/E196-A.mp4'));
  await expect(p.getByRole('slider',{name:'预览播放进度',exact:true})).toBeVisible({timeout:120000});
}
await p.screenshot({path:path.join(out,'native-source-prepared.png')});
await save();
const nav=p.getByRole('navigation',{name:'编辑器功能',exact:true});
async function choose(name){const rail=nav.getByRole('button',{name,exact:true});if(await rail.getAttribute('aria-pressed')!=='true')await rail.click();}
async function libraryImport(key, local, name, role='source', language='en'){
  if(s[key])return;
  await choose('媒体'); await p.locator('.ed-inspector').getByRole('button',{name:'聊天',exact:true}).click();
  const add=p.getByRole('button',{name:`将 ${name} 添加到时间轴`,exact:true});
  if(!await add.count()){const chooser=p.waitForEvent('filechooser');await p.locator('.ed-inspector').getByRole('button',{name:'导入素材',exact:true}).click(); await (await chooser).setFiles(path.resolve(local));}
  await expect(add).toHaveCount(1,{timeout:60000});
  await p.getByRole('slider',{name:'预览播放进度',exact:true}).press('Home'); await add.focus(); await add.press('Enter');
  await expect.poll(async()=>await p.getByRole('dialog',{name:'绑定字幕文件',exact:true}).isVisible() || (await json('/cloud-tool-api/v1/editor/projects/'+s.pid)).content.tracks.some(t=>t.type==='subtitle'&&t.clips.length)).toBe(true);
  const dialog=p.getByRole('dialog',{name:'绑定字幕文件',exact:true});
  if(await dialog.isVisible()) {await dialog.getByLabel('字幕用途',{exact:true}).selectOption(role);const lang=dialog.getByLabel('字幕语言（可留空）',{exact:true});await lang.fill(language);await lang.blur();await dialog.getByRole('button',{name:'绑定',exact:true}).click();await expect(dialog).toBeHidden();}
  await expect(p.locator('.ed-save-status')).toHaveText('已同步');s[key]=true;await save();
}
if(!s.seedPid)await libraryImport('englishImported','reports/yunxiao/ERYE210-015-SELECTION-GUIDANCE-PROD-20261113-input/E196-source-en.srt','E196-source-en.srt');
if(!s.pid)throw Error('Native saved project ID not observed');
s.seedPid ||= s.pid;s.seed=await json('/cloud-tool-api/v1/editor/projects/'+s.seedPid);
await expect.poll(async()=>(await json('/cloud-tool-api/v1/editor/projects/'+s.seedPid)).content.tracks.filter(t=>t.type==='subtitle').flatMap(t=>t.clips).flatMap(c=>c.bindings||[]).length).toBe(8);await save();
await writeFile(path.join(out,'seed-private.json'),JSON.stringify(s.seed,null,2));
async function copyProject(key,seed){
  if(!s[key]){
    const pid=randomUUID(),cid=randomUUID(),content=structuredClone(seed.content);delete content.media_context;content.project_id=pid;content.name='ERYE210-FIVE-'+key+'-'+pid.slice(0,8);
    await json('/runtime-api/v1/conversations/'+cid,{conversation_id:cid,project_id:s.wid,title:content.name,messages_partial:true,response_message_limit:30,response_include_editor_project:true},'PUT');
    await json('/cloud-tool-api/v1/editor/projects/save',{project_id:pid,conversation_id:cid,operation_id:randomUUID(),base_revision:0,content},'POST');s[key]={pid,cid,name:content.name};await save();
  }
  const f=s[key];await p.goto('https://app.cinlink.ai/c/'+f.cid,{waitUntil:'domcontentloaded'});await p.locator('#workspace-prompt').waitFor();
  if(!await p.locator('.ed-project-trigger').isVisible())await p.getByRole('button',{name:'视频编辑器',exact:true}).click();await expect(p.locator('.ed-project-name')).toHaveText(f.name);s.pid=f.pid;return f;
}
const watermark=await copyProject('watermark',s.seed);await choose('水印');
const sub=async name=>{const btn=p.getByRole('button',{name,exact:true});if(await btn.getAttribute('aria-pressed')!=='true')await btn.click();};
if(!s.textMark){await sub('文字水印');const input=p.locator('.ed-watermark-panel textarea');await input.fill('NAV006');await input.blur();await expect(p.locator('.ed-save-status')).toHaveText('已同步');s.textMark=true;await save();}
if(!s.imageMark){await sub('图片水印');const chooser=p.waitForEvent('filechooser');await p.getByRole('button',{name:/^(选择并预览水印图片|水印图片选择与预览)$/}).click();await(await chooser).setFiles(path.resolve('assets/cinlink-smoke-watermark.png'));await expect(p.getByRole('img',{name:'图片水印预览',exact:true})).toBeVisible({timeout:60000});await expect(p.locator('.ed-save-status')).toHaveText('已同步');s.imageMark=true;await save();}
await writeFile(path.join(out,'watermark-private.json'),JSON.stringify(await json('/cloud-tool-api/v1/editor/projects/'+watermark.pid),null,2));
await p.screenshot({path:path.join(out,'all-baselines-prepared.png')});
console.log(JSON.stringify({phase:'owned-seed-watermark-ready',seed:s.seedPid,watermark:watermark.pid}));await save();
process.exit(0);
