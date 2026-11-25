import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { assert, Blocked, clips, sha256 } from './core.mjs';
import { baseline, fourObjects } from './fixtures.mjs';
import { uploadAssets } from './media.mjs';
import { crashRecovery } from './crash-recovery.mjs';

export const premiereCapabilityPrompt='本轮只核对工程导入能力，不修改任何内容。请说明当前生产编辑入口能否导入Premiere .prproj，并提供“原生可编辑／近似／预渲染／未还原”四级还原报告；是否支持该类工程的离线素材按指纹、时长和尺寸重连、缺失字体及LUT分别报告；是否有可用于安全核验工程脚本、URL、压缩体积、XML深度和外部实体的导入入口。页面文件选择支持.json/.cinlink/.cinlinkproj不等于支持Premiere导入，请明确区分。仅回答当前可用能力和缺口，不执行任何脚本、外链或异常样本，不生成替代媒体、不伪造报告，保留原片和工程。';
const outcome=(status,actual,extra={})=>({status,actual,...extra});
const video=d=>clips(d)[0], sourceAudio=d=>d.content.tracks.find(t=>t.type==='audio'&&t.role==='source');
const same=(a,b)=>assert.deepEqual(a.content,b.content,'工程内容意外变化');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

export async function previewState(ctx){return ctx.page.evaluate(()=>{
  const v=document.querySelector('[aria-label="工程实时预览"] video'),range=document.querySelector('input[aria-label="预览播放进度"]');
  const nav=[...document.querySelectorAll('[aria-label="编辑器功能"] button')].map(e=>({name:e.innerText,tab:e.dataset.tab,expanded:e.getAttribute('aria-expanded'),pressed:e.getAttribute('aria-pressed'),className:e.className}));
  const box=document.querySelector('[aria-label="工程实时预览"]')?.getBoundingClientRect();
  return {time:Number(range?.value),max:Number(range?.max),mediaTime:v?.currentTime,paused:v?.paused,readyState:v?.readyState,nav,preview:box?{x:box.x,y:box.y,width:box.width,height:box.height}:null};
});}
export async function fastSeek(ctx,target){
  const selector='input[aria-label="预览播放进度"]';
  const r=await ctx.page.evaluate(()=>{const e=document.querySelector('input[aria-label="预览播放进度"]'),b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,min:Number(e.min),max:Number(e.max),type:e.type};});
  if(r.type==='range'){
    await ctx.page.mouse.click(r.x+8+(r.width-16)*(target-r.min)/(r.max-r.min),r.y+r.height/2,{label:'定位测试预览时间'});
    for(let pass=0;pass<4;pass++){
      const actual=(await previewState(ctx)).time,diff=Math.round((target-actual)*100);
      if(Math.abs(diff)>100)throw new Blocked('预览定位偏差过大，需检查实际控件，不能写入期望时间');
      if(!diff)break;
      for(let i=0;i<Math.abs(diff);i++)await ctx.page.press(selector,diff>0?'ArrowRight':'ArrowLeft');
    }
  }else{await ctx.page.fill(selector,String(target));await ctx.page.press(selector,'Tab');}
  await ctx.page.waitForFunction(t=>Math.abs(Number(document.querySelector('input[aria-label="预览播放进度"]').value)-t)<.025,target,{timeout:8000});
  await ctx.page.waitForFunction(()=>{const v=document.querySelector('[aria-label="工程实时预览"] video');return v&&v.readyState>=2&&!v.seeking;},undefined,{timeout:10000});
  return previewState(ctx);
}
async function subtitleFixture(ctx,a){const content=fourObjects(a);content.tracks=content.tracks.filter(t=>t.type!=='image');return ctx.prepare(content);}
async function selectPanel(ctx,label){const s=await previewState(ctx),entry=s.nav.find(n=>n.name.trim()===label);if(!entry)throw new Blocked('没有'+label+'入口');if(entry.expanded!=='true')await ctx.page.click('[aria-label="编辑器功能"] button[data-tab="'+entry.tab+'"]');}
export async function captionedAsset(ctx,a,media){
  if(a.captioned)return a;
  const file=path.join(ctx.config.outDir,'media','ERYE199-captioned.mp4');
  const font=(ctx.config.fontFile||'C:/Windows/Fonts/arial.ttf').replaceAll('\\','/').replaceAll(':','\\:');
  const vf=`drawtext=fontfile='${font}':text='E199 Caption A':fontsize=24:fontcolor=yellow:x=(w-tw)/2:y=h-50:enable='between(t,1,3)',drawtext=fontfile='${font}':text='E199 Caption B':fontsize=24:fontcolor=yellow:x=(w-tw)/2:y=h-50:enable='between(t,6,8)'`;
  if(!await fs.stat(file).catch(()=>null))execFileSync(ctx.config.ffmpeg||'ffmpeg',['-v','error','-nostdin','-y','-i',media.video.path,'-vf',vf,'-c:v','libx264','-preset','ultrafast','-crf','20','-c:a','copy',file],{timeout:120000,encoding:'utf8'});
  return uploadAssets(ctx,{captioned:{path:file,name:path.basename(file),kind:'video',mime:'video/mp4',sha256:sha256(await fs.readFile(file))}});
}

export async function writeRecord(ctx,id,value){
  const record={id:'ERYE199-'+id,completed:new Date().toISOString(),fixture:ctx.fixture,automation:'tools/editor/erye199/cases-051-068.mjs#'+id,...value};
  await ctx.write('result',record);
  const file=path.join(ctx.config.outDir,'results.json');let results=[];try{results=JSON.parse(await fs.readFile(file,'utf8'));}catch{}
  if(results.some(r=>r.id===record.id))throw Error('本批该用例已有结果，不自动重跑或覆盖');
  results.push(record);await fs.writeFile(file,JSON.stringify(results,null,2)+'\n');return record;
}

async function premierePrerequisite(ctx,a){
  try{const result=JSON.parse(await fs.readFile(path.join(ctx.config.outDir,'051/result.json'),'utf8'));
    if(result.status==='Not Applicable'&&result.capability==='Premiere import unavailable'){ctx.fixture=result.fixture;return result;}}
  catch{}
  await ctx.prepare(baseline(a));await ctx.panel('Media');await ctx.shot('media-import-controls');
  const before=await ctx.read(),answer=await ctx.agent(premiereCapabilityPrompt),after=await ctx.read();same(before,after);
  await ctx.write('capability-observation',{run_id:answer.run_state?.run_id,status:answer.status,text:answer.text,content_unchanged:true});
  if(/未声明|没有声明|不支持|未提供/.test(answer.text)&&/Premiere|prproj/i.test(answer.text))return {fixture:ctx.fixture,run_id:answer.run_state?.run_id,source_case:ctx.caseId};
  throw new Blocked('尚未确认Premiere导入能力，需要真实四级还原及离线/异常工程样本；不伪造样本和还原报告');
}

export const cases={
  async '051'(ctx,a){const source=await premierePrerequisite(ctx,a);return outcome('Not Applicable','当前生产入口仅有通用工程文档导入，未声明Premiere .prproj解析和四级逐对象还原报告；未导入PR样本，不把未核验标为未还原。',{capability:'Premiere import unavailable',source_case:'051',run_id:source.run_id,target_steps_executed:false});},
  async '052'(ctx,a){const source=await premierePrerequisite(ctx,a);await ctx.shot('dependency-import-unavailable');return outcome('Not Applicable','依赖051的Premiere工程导入能力缺口；离线素材重连及字体/LUT分别诊断未执行，不把普通媒体上传/替换当作依赖重连。',{source_case:source.source_case||'051',target_steps_executed:false});},
  async '053'(ctx,a){const source=await premierePrerequisite(ctx,a);await ctx.shot('dependency-import-unavailable');return outcome('Not Applicable','依赖051的Premiere导入前置，未运行脚本、URL、解压或XML异常样本；没有安全防护通过结论。',{source_case:source.source_case||'051',target_steps_executed:false});},
  async '054'(ctx,a){
    await ctx.prepare(baseline(a));const before=await ctx.read();await ctx.shot('baseline');
    await ctx.page.click('button[aria-label="原声静音"]');const manual=await ctx.waitSaved(before.revision);assert.equal(sourceAudio(manual).muted,true);await ctx.write('after-manual',manual);
    await ctx.page.click('.ed-timeline-clip[aria-label^="视频"]');
    const target=manual.content.tracks.find(t=>t.type==='video');
    const answer=await ctx.agent(`请一次完成已选中的唯一视频片段（轨道${target.track_id}，片段${target.clips[0].clip_id}，源文件${target.clips[0].file_id}）的位置中心改为(400,200)和不透明度改为50%，这是一个完整编辑意图。保留同一原片、源0～10秒、速度及当前原声静音状态，不新增或删除素材。`);
    const edited=await ctx.read();assert.equal(answer.status,'done');assert.equal(video(edited).transform.position.x,400);assert.equal(video(edited).transform.position.y,200);assert.equal(video(edited).opacity,.5);assert.equal(sourceAudio(edited).muted,true);
    await ctx.page.click('button[aria-label="撤销"]');const undone=await ctx.waitSaved(edited.revision);await ctx.write('after-one-undo',undone);await ctx.shot('one-undo');
    same(undone,manual);
    await ctx.page.click('button[aria-label="重做"]');const redone=await ctx.waitSaved(undone.revision);same(redone,edited);await ctx.write('after-one-redo',redone);
    const rejected=await ctx.agent('原工程保持不变的前提下验证整批拒绝：将唯一视频的位置改为(500,200)，同时把不透明度设为150%。150%超过合法范围，不允许纠正为100%或分步提交；任一操作不合法时必须拒绝整个编辑意图，位置和不透明度都不能留下部分修改。不要生成新文件或改原声。');
    const afterRejected=await ctx.read();same(afterRejected,redone);await ctx.write('rejected-intent',{status:rejected.status,text:rejected.text,unchanged:true});
    await ctx.open(ctx.fixture);same(await ctx.read(),redone);await ctx.shot('reopened');
    return outcome('Passed','手动静音后Agent复合改位置/透明度；一次撤销恢复整个Agent意图而保留手动编辑，一次重做恢复；非法组合整批拒绝且刷新保持。',{coverage:'业务级撤销/重做和非法意图无部分写入；不验historyGroupId字段，不声称已注入运行中服务故障'});
  },
  async '055'(ctx,a){await ctx.prepare(baseline(a));await ctx.shot('request-replay-prerequisite');return outcome('Not Applicable','原条目要求控制同一commandId/payload及expectedRevision，属于内部协议验收；当前页面无同一编辑请求的受控重放入口。本轮不按拟定字段验收，也不把两次独立发送当作同一请求重放。',{target_steps_executed:false,coverage:'同一请求幂等/版本冲突分支未覆盖'});},
  async '056'(ctx,a){await ctx.prepare(baseline(a));const before=await ctx.read();const answer=await ctx.agent('仅核对当前可用的可编辑效果注册表读取能力：是否能够读取实际效果参数类型、单位、上下限、默认值、可动画性、支持后端、成本及精确程度，并在缺少后端时明确报告不能执行。请只说明已提供的入口和实际可读信息，不修改工程、不生成替代视频，不将字幕模板、淡入淡出或文件级增强等同于工程可编辑效果注册表。');same(await ctx.read(),before);await ctx.write('capability-observation',{text:answer.text,status:answer.status,run_id:answer.run_state?.run_id,content_unchanged:true});if(/没有|未提供|不支持|未暴露|未声明/.test(answer.text))return outcome('Not Applicable','当前未提供工程可编辑效果注册表及完整元数据，未执行界面/规划器同源或缺后端失败分支；工程保持。',{target_steps_executed:false});throw new Blocked('需核对实际可读取的效果注册表入口及参数，不能用能力说明代替目标验证');},
  async '057'(ctx,a){return crashRecovery(ctx,a);},
  async '059'(ctx,a){
    await ctx.prepare(baseline(a));const before=await ctx.read();await ctx.shot('before-offline');
    let offline;
    await ctx.page.cdp('Network.enable');
    try{
      await ctx.page.cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:-1,uploadThroughput:-1});
      await ctx.page.click('button[aria-label="原声静音"]');
      try{await ctx.page.waitForFunction(()=>/保存失败|Failed to fetch|未保存|网络|Network|结果待确认|结果未知|已保留.*提交/i.test(document.body.innerText),undefined,{timeout:10000});}catch{}
      offline=await ctx.page.evaluate(()=>({text:document.body.innerText,status:[...document.querySelectorAll('[role="status"],[role="alert"]')].map(e=>e.innerText),muteButton:!!document.querySelector('button[aria-label="原声启用"]'),retryButtons:[...document.querySelectorAll('button')].filter(e=>/重试|恢复/.test(e.innerText)).map(e=>e.innerText)}));
      await ctx.write('offline-observation',offline);await ctx.shot('offline-save-failure');
    }finally{await ctx.page.cdp('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});await ctx.page.cdp('Network.disable');}
    const afterNetwork=await ctx.read();await ctx.write('after-network-restored',afterNetwork);
    const retry=await ctx.page.evaluate(()=>[...document.querySelectorAll('button')].filter(e=>/^(重试原提交|重试原始提交|重试保存|重试恢复)$/.test(e.innerText.trim())).map(e=>e.innerText.trim()));
    if(retry.length===1){await ctx.page.click('button:text-is("'+retry[0]+'")');await ctx.waitSaved(before.revision);}
    const after=await ctx.read();await ctx.write('after-recovery',after);await ctx.shot('network-restored');
    assert.ok(offline.muteButton,'保存失败后本页静音草稿未保留');assert.ok(/保存失败|Failed to fetch|未保存|网络|Network|结果待确认|结果未知|已保留.*提交/i.test(offline.text),'断网保存未显示失败或未保存状态');
    assert.equal(sourceAudio(after).muted,true,'恢复网络后缺少可用的原草稿重试/恢复保存结果');
    await ctx.open(ctx.fixture);assert.equal(sourceAudio(await ctx.read()).muted,true);await ctx.shot('reopened-recovered');
    return outcome('Passed','本页断网保存正确提示并保留静音草稿；恢复网络后保存成功，重开保持；仅网络断开分支，未模拟磁盘满。');
  },
  async '062'(ctx,a,media){
    const assets=await captionedAsset(ctx,a,media);await ctx.prepare(baseline(assets,{file:'captioned'}));const before=await ctx.read();
    await fastSeek(ctx,2);await ctx.shot('captioned-editor-open');
    await ctx.page.click('button[aria-label="收起编辑区"]');
    await ctx.page.waitForFunction(()=>!document.querySelector('[aria-label="工程实时预览"]'),undefined,{timeout:8000});await ctx.shot('editor-collapsed');
    await ctx.page.click('button[aria-label="视频编辑器"]');
    await ctx.page.waitForSelector('[aria-label="工程实时预览"] video',{state:'visible',timeout:20000});
    await ctx.page.waitForFunction(()=>document.querySelector('[aria-label="工程实时预览"] video')?.readyState>=2,undefined,{timeout:20000});
    const state=await previewState(ctx);assert.equal(state.max,10);assert.equal(state.nav.length,5);
    assert.ok(await ctx.page.evaluate(()=>!!document.querySelector('[aria-label="编辑时间轴"]')&&[...document.querySelectorAll('button')].some(e=>e.innerText.trim()==='导出')));
    same(await ctx.read(),before);await ctx.write('opened-observation',state);await ctx.shot('editor-reopened');
    return outcome('Passed','带烧录字幕的测试视频从收起状态重新展开，现行五入口、预览、时间轴和导出均显示，工程内容保持；按用户确认最新页面验收，不要求旧Speech布局。');
  },
  async '064'(ctx,a){
    await subtitleFixture(ctx,a);const before=await ctx.read();await fastSeek(ctx,2);const start=await previewState(ctx);
    await selectPanel(ctx,'字幕');await ctx.page.waitForFunction(()=>{const text=document.querySelector('[aria-label="字幕列表"]')?.innerText||'';return text.includes('Caption A')&&text.includes('Caption B');},undefined,{timeout:15000});
    const captions=await ctx.page.evaluate(()=>document.querySelector('[aria-label="字幕列表"]')?.innerText);assert.ok(captions.includes('Caption A')&&captions.includes('Caption B'));await ctx.shot('captions-at-two');
    await selectPanel(ctx,'媒体');
    await ctx.page.waitForFunction(()=>!!document.querySelector('button[aria-label="导入素材"]'),undefined,{timeout:10000});
    const scope=await ctx.page.evaluate(()=>[...document.querySelectorAll('[aria-label="编辑区"] button')].some(e=>e.innerText.trim()==='工程'));
    if(scope)await ctx.page.click('button:text-is("工程")');
    await ctx.page.waitForFunction(()=>!!document.querySelector('.ed-media-card')||!!document.querySelector('[aria-label="编辑区"] [role="alert"]')?.innerText.trim(),undefined,{timeout:25000});
    const loadError=await ctx.page.evaluate(()=>document.querySelector('[aria-label="编辑区"] [role="alert"]')?.innerText||'');await ctx.write('media-load-observation',{error:loadError});await ctx.shot('media-loaded-or-error');assert.equal(loadError,'','工程素材列表加载错误：'+loadError);
    await ctx.shot('media-at-two');const mediaState=await previewState(ctx);assert.ok(Math.abs(mediaState.time-start.time)<.02);assert.ok(Math.abs(mediaState.mediaTime-start.mediaTime)<.04);
    await selectPanel(ctx,'字幕');const back=await previewState(ctx);assert.ok(Math.abs(back.time-start.time)<.02);same(await ctx.read(),before);await ctx.write('panel-switch-observation',{start,media:mediaState,back,captions});await ctx.shot('returned-captions');
    return outcome('Passed','按最新入口字幕→媒体(工程素材)→字幕切换，字幕A/B及工程素材可见，2秒播放头与源画面未重置，工程未改。');
  },
  async '065'(ctx,a){
    await ctx.prepare(baseline(a));const before=await ctx.read();await fastSeek(ctx,1);
    await ctx.page.click('button[aria-label="预览播放"]');await ctx.page.waitForFunction(()=>Number(document.querySelector('input[aria-label="预览播放进度"]').value)>2,undefined,{timeout:6000});
    await ctx.page.click('button[aria-label="预览暂停"]');const paused=await previewState(ctx);await wait(250);const still=await previewState(ctx);assert.ok(paused.paused&&Math.abs(still.time-paused.time)<.02);await ctx.shot('paused');
    const r=await ctx.page.evaluate(()=>{const head=document.querySelector('.ed-playhead'),lane=document.querySelector('.ed-ruler-lane');if(!head||!lane)return null;const h=head.getBoundingClientRect(),l=lane.getBoundingClientRect();return {x:h.x+h.width/2,y:h.y+4,targetX:l.x+l.width*.7};});
    if(!r)throw new Blocked('缺少真实时间轴播放头，未使用普通预览滑块替代');
    await ctx.page.mouse.move(r.x,r.y);await ctx.page.mouse.down();await ctx.page.mouse.move(r.targetX,r.y);await ctx.page.mouse.up();
    await ctx.page.waitForFunction(()=>Math.abs(document.querySelector('[aria-label="工程实时预览"] video').currentTime-Number(document.querySelector('input[aria-label="预览播放进度"]').value))<.05,undefined,{timeout:10000});
    const dragged=await previewState(ctx);assert.ok(dragged.time>6.8&&dragged.time<7.2);assert.ok(dragged.paused);assert.ok(Math.abs(dragged.mediaTime-dragged.time)<.05);await ctx.write('play-pause-drag',{paused,still,dragged});await ctx.shot('dragged-to-seven');same(await ctx.read(),before);
    return outcome('Passed','真实播放、暂停及时间轴播放头拖动到约7秒，画面媒体时间和页面进度一致且停住；工程内容未改。');
  },
  async '066'(ctx,a){
    const c=baseline(a),vt=c.tracks.find(t=>t.type==='video'),at=c.tracks.find(t=>t.type==='audio');
    for(let i=1;i<6;i++){vt.clips.push({...structuredClone(vt.clips[0]),clip_id:crypto.randomUUID(),timeline_start_sec:i*10});at.clips.push({...structuredClone(at.clips[0]),clip_id:crypto.randomUUID(),timeline_start_sec:i*10});}
    if(!ctx.fixture)await ctx.prepare(c);const before=await ctx.read();await fastSeek(ctx,5);
    const geometry=()=>ctx.page.evaluate(()=>({zoom:document.querySelector('input[aria-label="时间轴缩放"]')?.value,ruler:[...document.querySelectorAll('.ed-ruler-lane span')].map(e=>({text:e.textContent,left:e.style.left})),scrollers:[...document.querySelectorAll('[aria-label="编辑时间轴"] *')].filter(e=>e.scrollWidth>e.clientWidth+30&&getComputedStyle(e).overflowX!=='visible').map(e=>{const r=e.getBoundingClientRect();return {className:e.className,left:e.scrollLeft,scrollWidth:e.scrollWidth,width:e.clientWidth,rect:{x:r.x,y:r.y,width:r.width,height:r.height}};}),clip:[...document.querySelectorAll('.ed-timeline-clip')].slice(0,2).map(e=>({left:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width})),playheads:[...document.querySelectorAll('[class*="playhead"]')].map(e=>({className:e.className,x:e.getBoundingClientRect().x}))}));
    const initial=await geometry();for(let i=0;i<4;i++)await ctx.page.click('button[aria-label="放大时间轴"]');const zoomed=await geometry();assert.notEqual(zoomed.zoom,initial.zoom);assert.ok(zoomed.clip[0].width>initial.clip[0].width);assert.notDeepEqual(zoomed.ruler,initial.ruler);assert.ok(zoomed.playheads.length&&Math.abs((zoomed.playheads[0].x-zoomed.clip[0].left)/zoomed.clip[0].width-.5)<.02,'放大后5秒播放头与首段10秒的比例不正确');await ctx.shot('zoomed-timeline');
    const scroller=zoomed.scrollers.find(s=>s.rect.width>300);if(!scroller)throw new Blocked('时间轴未形成可观测横向滚动区，需核对布局');
    await ctx.page.mouse.move(scroller.rect.x+scroller.rect.width/2,scroller.rect.y+scroller.rect.height/2);await ctx.page.mouse.wheel(600,0,{label:'横向滚动测试时间轴'});const scrolled=await geometry();assert.ok(scrolled.scrollers.some(s=>s.left>0),'横向滚轮未移动时间轴');
    const time=await previewState(ctx);assert.ok(Math.abs(time.time-5)<.03);same(await ctx.read(),before);await ctx.write('zoom-scroll-observation',{initial,zoomed,scrolled,time});await ctx.shot('horizontally-scrolled');
    return outcome('Passed','60秒多片段时间线放大后刻度/片段像素宽度变化，真实横向滚动有效，5秒播放位置及工程内容保持。');
  },
  async '067'(ctx,a){
    if(!ctx.fixture)await subtitleFixture(ctx,a);const before=await ctx.read();await fastSeek(ctx,2);await selectPanel(ctx,'字幕');const opened=await previewState(ctx);await ctx.shot('panel-expanded');
    await ctx.page.click('[aria-label="编辑器功能"] button[data-tab="captions"]');await ctx.page.waitForFunction(()=>document.querySelector('[aria-label="编辑器功能"] button[data-tab="captions"]')?.getAttribute('aria-expanded')==='false',undefined,{timeout:8000});
    await ctx.page.waitForFunction(()=>document.querySelector('[aria-label="工程实时预览"] video')?.readyState>=2,undefined,{timeout:10000});const collapsed=await previewState(ctx);await ctx.shot('panel-collapsed');
    assert.ok(collapsed.preview.width>opened.preview.width,'收起功能面板后预览未自适应扩大');assert.ok(Math.abs(collapsed.time-opened.time)<.02);
    await ctx.page.click('[aria-label="编辑器功能"] button[data-tab="captions"]');await ctx.page.waitForSelector('[aria-label="字幕列表"]',{state:'visible',timeout:10000});const restored=await previewState(ctx);assert.ok(Math.abs(restored.preview.width-opened.preview.width)<2);assert.ok(Math.abs(restored.time-opened.time)<.02);assert.equal(restored.paused,opened.paused);same(await ctx.read(),before);await ctx.write('collapse-observation',{opened,collapsed,restored});await ctx.shot('panel-restored');
    return outcome('Passed','按最新布局收起/展开字幕功能面板，预览宽度自适应且恢复，当前字幕面板、2秒进度及暂停状态保持；不将项目列表栏当旧Speech功能栏。');
  },
  async '068'(ctx,a){
    if(!ctx.fixture)await ctx.prepare(baseline({}, {empty:true}));const before=await ctx.read();
    assert.equal(before.content.tracks.length,0);assert.equal(before.content.dubbing.length,0);assert.equal(before.content.watermarks.text,null);assert.equal(before.content.watermarks.image,null);
    const inspect=async name=>{
      const state=await ctx.page.evaluate(()=>{
        const region=document.querySelector('[aria-label="编辑区"]');
        const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';};
        const buttons=[...region.querySelectorAll('button')].filter(visible).map(e=>({text:e.innerText.trim(),aria:e.getAttribute('aria-label'),disabled:e.disabled||e.getAttribute('aria-disabled')==='true'}));
        return {text:region.innerText,headings:[...region.querySelectorAll('h1,h2,h3,[role="heading"]')].filter(visible).map(e=>e.innerText.trim()),buttons,errors:[...region.querySelectorAll('[role="alert"]')].filter(visible).map(e=>e.innerText.trim()).filter(Boolean)};
      });
      await ctx.write(name,state);await ctx.shot(name);
      assert.ok(/空白工程|空工程|Empty project/i.test(state.headings.join(' ')),'空工程没有明确标题');
      assert.ok(/上传|选择媒体|upload|select media|choose media/i.test(state.text),'空工程没有媒体操作引导');
      const choose=state.buttons.find(b=>/^(选择媒体|Select media|Choose media)$/i.test(b.text));assert.ok(choose&&!choose.disabled,'选择媒体入口不可见或被禁用');
      const exp=state.buttons.find(b=>/^(导出|Export)$/i.test(b.text));assert.ok(exp&&exp.disabled,'没有内容时导出未禁用');assert.deepEqual(state.errors,[],'空工程出现错误提示');
      same(await ctx.read(),before);return state;
    };
    const initial=await inspect('068-initial-empty');
    await ctx.page.reload({timeout:60000});await ctx.page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
    if(!await ctx.page.evaluate(()=>!!document.querySelector('.ed-project-trigger')))await ctx.page.click('button[aria-label="视频编辑器"]');
    await ctx.page.waitForFunction(name=>document.querySelector('.ed-project-name')?.textContent===name,ctx.fixture.name,{timeout:30000});
    const refreshed=await inspect('068-refreshed-empty');
    await ctx.page.click('button[aria-label="收起编辑区"]');await ctx.page.waitForSelector('button[aria-label="视频编辑器"]',{state:'visible',timeout:10000});await ctx.shot('068-editor-collapsed');
    await ctx.page.click('button[aria-label="视频编辑器"]');await ctx.page.waitForFunction(name=>document.querySelector('.ed-project-name')?.textContent===name,ctx.fixture.name,{timeout:10000});
    const reopened=await inspect('068-reopened-empty');
    const messages=await ctx.api('/runtime-api/v1/conversations/'+ctx.fixture.conversationId+'/messages?limit=200');
    assert.equal((messages.messages||[]).filter(m=>m.run_id).length,0,'查看空态却产生了业务任务');
    await ctx.write('068-empty-validation',{initial,refreshed,reopened,content_unchanged:true,no_task:true,definition_revision:2});
    return outcome('Passed','068 v2：空白工程标题和媒体操作引导显示，选择媒体按钮可见启用、无内容时导出禁用；刷新及收起再展开后同一空工程保持，未新增对象或任务。',{definition_revision:2,coverage:'仅空工程总空态、按钮可见/禁用状态及恢复；不点击选择媒体，不验证文件选择/导入或无入口的独立字幕/素材空态'});
  },
};
