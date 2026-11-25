import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { assert, Blocked, clips, range, json } from './core.mjs';
import { baseline } from './fixtures.mjs';
import { transformFixture } from './cases-016-020.mjs';

const videoSelector='.ed-timeline-clip[aria-label^="视频"]';
const uuid=()=>crypto.randomUUID();
export const currentV2Ids=Object.freeze(['011','013','017','020','052','053','055']);
export function musicTrack(asset,{start=0,end=10,at=0,volume=1,role='background'}={}){
  return {type:'audio',role,track_id:uuid(),offset_sec:0,muted:false,linked_video_track_id:null,
    clips:[{clip_id:uuid(),file_id:asset.fileId,timeline_start_sec:at,source_in_sec:start,source_out_sec:end,playback_rate:1,volume}]};
}
export function currentFixture(id,a){
  let c=baseline(a);
  if(id==='011') c.tracks.push(musicTrack(a.music,{end:2,at:8,volume:.3}));
  if(id==='013'||id==='053'){
    const track=uuid();
    c.tracks.unshift({type:'subtitle',track_id:track,clips:[{track_id:track,clip_id:uuid(),file_id:a.fixed.fileId,
      role:'source',language:'en',content_sha256:a.fixed.sha256,visible:true,characters_per_cue:60,segmenter_version:'parent-layout-v2',diff:[],
      bindings:[[1,3],[6,8]].map(([s,e],i)=>({block_id:uuid(),source_ordinal:i+1,original_start_sec:s,original_end_sec:e,speaker_id:null}))}]});
  }
  if(id==='017'){
    c=baseline(a,{duration:5});
    for(const track of c.tracks){
      const second=structuredClone(track.clips[0]);second.clip_id=uuid();second.timeline_start_sec=5;track.clips.push(second);
    }
  }
  if(id==='020')c=transformFixture(a);
  if(id==='052'){
    if(!a.sameA)throw new Blocked('缺少同名A素材的真实登记，不能用不同名视频替代前置');
    c=baseline({...a,video:a.sameA});
  }
  if(id==='055')c.tracks.push(musicTrack(a.music));
  return c;
}
export async function prepareCurrent(ctx,id,a){
  ctx.caseId=id;
  const setupFile=path.join(ctx.config.outDir,id,'fixture','setup.json');
  try{
    ctx.fixture=JSON.parse(await fs.readFile(setupFile,'utf8'));
    const meta=JSON.parse(await fs.readFile(path.join(ctx.config.outDir,id,'case-meta.json'),'utf8'));
    ctx.workspaceId=meta.workspace_id;
    return ctx.fixture;
  }catch(e){if(e.code!=='ENOENT')throw e;}
  const metaFile=path.join(ctx.config.outDir,id,'case-meta.json');
  if(await fs.stat(metaFile).catch(()=>null))throw new Blocked('本例准备已开始但尚无完成检查点；核对原现场，不重复新建');
  ctx.workspaceId=uuid();
  await json(metaFile,{workspace_id:ctx.workspaceId,id:'ERYE199-'+id,definition_revision:2,started:new Date().toISOString()});
  await ctx.api('/runtime-api/v1/projects/'+ctx.workspaceId,{project_id:ctx.workspaceId,display_name:'ERYE199-'+id+'-v2-'+ctx.config.batch},'PUT');
  await ctx.prepare(currentFixture(id,a));
  await ctx.seek(id==='020'?5:2);
  if(id==='013'||id==='053')await ctx.page.waitForFunction(()=>document.querySelector('.ed-preview-canvas')?.textContent.includes('Fixed A'),undefined,{timeout:30000});
  await ctx.shot('v2-baseline');
  return ctx.fixture;
}
export async function once(ctx,instruction){
  const dir=path.join(ctx.config.outDir,ctx.caseId);
  let cursor;
  try{cursor=JSON.parse(await fs.readFile(path.join(dir,'agent-cursor.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
  const answer=cursor?await ctx.observeAgent(cursor):await ctx.agent(instruction);
  await ctx.write('v2-terminal-answer',{status:answer.status,text:answer.text,intent_fully_satisfied:answer.intent_fully_satisfied,run_id:answer.run_state?.run_id||answer.run_id});
  return answer;
}
async function initial(ctx){return JSON.parse(await fs.readFile(path.join(ctx.config.outDir,ctx.caseId,'before.json'),'utf8'));}
function find(doc,clipId){return doc.content.tracks.flatMap(t=>t.clips).find(c=>c.clip_id===clipId);}
async function present(ctx,time,sourceTime,name,{caption}={}){
  await ctx.seek(time);
  const frame=await ctx.page.evaluate(()=>new Promise((resolve,reject)=>{
    const v=[...document.querySelectorAll('[aria-label="工程实时预览"] video')].find(e=>e.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}));
    if(!v){reject(Error('目标位置没有实际可见视频'));return;}
    const before=v.currentTime,timer=setTimeout(()=>reject(Error('可见视频呈现帧读取超时')),5000);
    v.requestVideoFrameCallback((now,m)=>{clearTimeout(timer);resolve({mediaTime:m.mediaTime,before,currentTime:v.currentTime,rate:v.playbackRate});});
    v.currentTime=v.currentTime;
  }));
  const state=await ctx.page.evaluate(()=>{
    const root=document.querySelector('[aria-label="工程实时预览"]'),v=[...root.querySelectorAll('video')].find(e=>e.checkVisibility({checkOpacity:true,checkVisibilityCSS:true})),input=document.querySelector('input[aria-label="预览播放进度"]');
    return {timeline:Number(input?.value),duration:Number(input?.max),caption:document.querySelector('.ed-preview-canvas')?.textContent||'',
      mediaTime:v?.currentTime,rate:v?.playbackRate,videos:[...root.querySelectorAll('video')].map(e=>({time:e.currentTime,opacity:getComputedStyle(e).opacity,display:getComputedStyle(e).display,visibility:getComputedStyle(e).visibility,rate:e.playbackRate})),
      audio:[...document.querySelectorAll('audio')].map(e=>({time:e.currentTime,rate:e.playbackRate,volume:e.volume,muted:e.muted,paused:e.paused,ready:e.readyState}))};
  });
  await ctx.write(name,{frame,state,sourceTime});
  await ctx.shot(name);
  assert.ok(Math.abs(frame.mediaTime-sourceTime)<.05,'实际源画面时间'+frame.mediaTime+'不对应预期'+sourceTime);
  if(caption!==undefined){
    assert.equal(state.caption.includes('Fixed A'),caption==='Fixed A');
    assert.equal(state.caption.includes('Fixed B'),caption==='Fixed B');
  }
  return state;
}
async function gap(ctx,time,name){
  await ctx.seek(time);await ctx.shot(name);
  await ctx.write(name,await ctx.page.evaluate(()=>({text:document.querySelector('[aria-label="工程实时预览"]')?.innerText,
    videos:[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({display:getComputedStyle(v).display,visibility:getComputedStyle(v).visibility,opacity:getComputedStyle(v).opacity,hasSource:!!v.getAttribute('src')}))})));
}
async function reopened(ctx,after){
  await ctx.open(ctx.fixture);
  const doc=await ctx.read();assert.deepEqual(doc.content,after.content,'刷新后工程内容不保持');
  await ctx.shot('v2-refreshed');
}
async function play(ctx,start,end,name){
  await ctx.seek(start);
  await ctx.page.click('button[aria-label="预览播放"]');
  await ctx.page.waitForFunction(t=>Number(document.querySelector('input[aria-label="预览播放进度"]').value)>=t,end,{timeout:15000});
  await ctx.page.click('button[aria-label="预览暂停"]');
  await ctx.shot(name);
}
async function selectVideoAwayFromPlayhead(ctx,index=0){
  const r=await ctx.page.evaluate(i=>{
    const e=document.querySelectorAll('.ed-timeline-clip[aria-label^="视频"]')[i],b=e.getBoundingClientRect();
    return {x:b.x+Math.min(18,b.width/4),y:b.y+b.height/2};
  },index);
  await ctx.page.mouse.click(r.x,r.y,{label:'选中目标视频避开播放头'});
}
export async function importMediaUI(ctx,file){
  await ctx.panel('Media');
  const chooser=ctx.page.waitForFileChooser({timeout:10000});
  await ctx.page.click('button[aria-label="导入素材"]');
  await(await chooser).setFiles(file);
}
export const cases={
  async '011'(ctx,a){
    await prepareCurrent(ctx,'011',a);const before=await initial(ctx),v=before.content.tracks[0],s=before.content.tracks[1],m=before.content.tracks[2];
    await ctx.page.click(videoSelector);
    await once(ctx,`在当前工程，将视频A（轨道${v.track_id}、片段${v.clips[0].clip_id}）和关联原声（轨道${s.track_id}、片段${s.clips[0].clip_id}）从0～10秒整体移到2～12秒，保留原文件、源0～10秒和1倍速。独立音乐M（轨道${m.track_id}、片段${m.clips[0].clip_id}）保持时间线8～10秒、源0～2秒、音量30%。保持同步锁状态，不增删片段。`);
    const after=await ctx.read();await ctx.write('v2-after',after);
    for(const track of [v,s]){const target=find(after,track.clips[0].clip_id);range(target,0,10,2);assert.equal(target.file_id,track.clips[0].file_id);assert.equal(target.playback_rate,1);}
    assert.deepEqual(after.content.tracks.find(t=>t.track_id===m.track_id),m,'独立音乐随关联视频串移');
    assert.equal(after.content.tracks.length,3);
    await gap(ctx,1,'gap-at-1');await present(ctx,3,1,'source-at-3');await present(ctx,9,7,'source-at-9');await play(ctx,2.5,3.5,'linked-playback');
    await reopened(ctx,after);await present(ctx,3,1,'reopened-source-at-3');
    return 'A及已有关联原声从0～10移至2～12秒；M源0～2秒/时间线8～10秒/30%不变，空档与原片映射、实际播放和刷新正确。';
  },
  async '013'(ctx,a){
    await prepareCurrent(ctx,'013',a);const before=await initial(ctx),v=before.content.tracks.find(t=>t.type==='video'),s=before.content.tracks.find(t=>t.type==='audio'),captions=before.content.tracks.find(t=>t.type==='subtitle');
    await ctx.page.click(videoSelector);
    await once(ctx,`将当前工程的视频A（轨道${v.track_id}、片段${v.clips[0].clip_id}）及其关联原声（轨道${s.track_id}）设为0.5倍速，保留原片、源0～10秒及时间线起点0秒，时长变为20秒。固定字幕Fixed A保持1～3秒，Fixed B保持6～8秒，保留原文和20px样式，不建立源绑定或重新生成字幕。`);
    const after=await ctx.read();await ctx.write('v2-after',after);
    for(const track of [v,s]){const target=find(after,track.clips[0].clip_id);range(target,0,10,0);assert.equal(target.playback_rate,.5);assert.equal(target.file_id,track.clips[0].file_id);}
    assert.deepEqual(after.content.tracks.find(t=>t.track_id===captions.track_id),captions,'固定字幕被当源字幕缩放或重建');
    assert.deepEqual(after.content.subtitle_style,before.content.subtitle_style);
    for(const stage of ['initial','reopened']){
      if(stage==='reopened')await reopened(ctx,after);
      for(const [time,sourceTime,caption]of [[2,1,'Fixed A'],[7,3.5,'Fixed B'],[4,2,''],[14,7,'']]){
        const seen=await present(ctx,time,sourceTime,stage+'-at-'+time,{caption});assert.equal(seen.duration,20);
      }
    }
    await play(ctx,4,5,'slow-playback');
    return '视频/关联原声0.5倍速20秒，Fixed A1～3秒和Fixed B6～8秒未拉伸；2/7秒字幕及源画面正确、4/14秒空字幕，刷新保持。';
  },
  async '017'(ctx,a){
    await prepareCurrent(ctx,'017',a);const before=await initial(ctx),[v,s]=before.content.tracks,[A,B]=v.clips,[SA,SB]=s.clips;
    await ctx.page.click(videoSelector+' >> nth=0');
    await once(ctx,`把当前工程的视频A（轨道${v.track_id}、片段${A.clip_id}）及关联原声A（片段${SA.clip_id}）的源出点从5秒裁到3秒，源入点和时间线起点仍为0秒。B（片段${B.clip_id}）及其原声（片段${SB.clip_id}）保留源0～5秒、时间线5～10秒、1倍速，并保留3～5秒空隙。保持原文件，不新建子序列或生成视频。`);
    const after=await ctx.read();await ctx.write('v2-after',after);
    for(const target of [A,SA]){const actual=find(after,target.clip_id);range(actual,0,3,0);assert.equal(actual.file_id,target.file_id);assert.equal(actual.playback_rate,1);}
    for(const target of [B,SB])assert.deepEqual(find(after,target.clip_id),target,'同源独立B被裁剪A串改');
    assert.equal(clips(after).length,2);assert.equal(clips(after,'audio').length,2);
    for(const stage of ['initial','reopened']){
      if(stage==='reopened')await reopened(ctx,after);
      await present(ctx,2,2,stage+'-A');await gap(ctx,4,stage+'-gap');await present(ctx,7,2,stage+'-B');
    }
    await play(ctx,5.5,6.5,'B-playback');
    return '仅A及关联原声裁为0～3秒，同源B/原声B仍源0～5秒、时间线5～10秒；3～5秒间隙、两实例源画面/播放及刷新保持。';
  },
  async '020'(ctx,a){
    await prepareCurrent(ctx,'020',a);const before=await initial(ctx),[front,back]=before.content.tracks.filter(t=>t.type==='video');
    await ctx.seek(5);await selectVideoAwayFromPlayhead(ctx);
    await once(ctx,`在当前工程，将前景A（轨道${front.track_id}、片段${front.clips[0].clip_id}）整段0～10秒的不透明度设为50%。播放头停在5秒，仍应从片段起点生效。保持背景B（轨道${back.track_id}）、原声、源范围、位置和速度，不加关键帧或渐变，不生成成片。`);
    const after=await ctx.read();await ctx.write('v2-after',after);
    const target=find(after,front.clips[0].clip_id),expected=structuredClone(front.clips[0]);expected.opacity=.5;assert.deepEqual(target,expected);
    for(const t of before.content.tracks.filter(t=>t.track_id!==front.track_id))assert.deepEqual(after.content.tracks.find(x=>x.track_id===t.track_id),t);
    for(const stage of ['initial','reopened']){
      if(stage==='reopened')await reopened(ctx,after);
      for(const time of [1,5,9])await present(ctx,time,time,stage+'-opacity-at-'+time);
    }
    await play(ctx,4,6,'cross-submit-time-playback');
    return '播放头5秒提交静态50%后，1/5/9秒均同一作用范围，跨4～6秒无额外动画；源/背景/原声未改、刷新保持。';
  },
  async '055'(ctx,a){
    await prepareCurrent(ctx,'055',a);const before=await initial(ctx),m=before.content.tracks.at(-1);
    await once(ctx,`将当前工程唯一独立背景音轨M（轨道${m.track_id}、片段${m.clips[0].clip_id}）的音量从100%降低6dB一次，约为50.12%。保持M的源范围、时间线位置及其他轨道，只调整工程音量。`);
    const after=await ctx.read();await ctx.write('v2-after',after);
    const gain=find(after,m.clips[0].clip_id).volume;assert.ok(Math.abs(gain-Math.pow(10,-6/20))<.011,'降6dB后音量'+gain+'不符约50.12%');
    const exp=structuredClone(before.content),em=exp.tracks.find(t=>t.track_id===m.track_id);em.clips[0].volume=gain;assert.deepEqual(after.content,exp);
    async function gainLine(name){
      const seen=await ctx.page.evaluate(()=>[...document.querySelectorAll('[aria-label="调整片段音量"]')].map(e=>({value:Number(e.getAttribute('aria-valuenow')),label:e.closest('.ed-timeline-clip')?.getAttribute('aria-label')})));
      await ctx.write(name,seen);await ctx.shot(name);
      assert.ok(seen.some(e=>Math.abs(e.value-gain*100)<1),'页面音量线未反馈约50%');
    }
    await gainLine('gain-after-once');await ctx.panel('Captions');await ctx.panel('Media');assert.deepEqual((await ctx.read()).content,after.content);
    for(let i=1;i<=2;i++){await reopened(ctx,after);await gainLine('gain-refresh-'+i);}
    await ctx.page.goto(ctx.config.baseURL,{timeout:60000});await ctx.open(ctx.fixture);assert.deepEqual((await ctx.read()).content,after.content);await gainLine('gain-reopen');
    await play(ctx,1,2,'gain-playback');
    return '一次相对降6dB后约50.12%，切面板/两次刷新/离开重开仍约50%而非重复降为25%；原片/原声/位置与源范围保持。';
  },
  async '052'(ctx,a,media){
    await prepareCurrent(ctx,'052',a);const before=await initial(ctx),A=before.content.tracks.find(t=>t.type==='video');
    const card='.ed-media-card[title="same.mp4"]',checkpoint=path.join(ctx.config.outDir,'052','native-register-started.json');
    if(!await fs.stat(checkpoint).catch(()=>null)){
      await json(checkpoint,{file:media.sameB.path});
      await importMediaUI(ctx,media.sameB.path);
    }
    await ctx.page.waitForSelector(card,{state:'visible',timeout:60000});
    let doc=await ctx.read(),B=doc.content.tracks.find(t=>t.type==='video'&&t.track_id!==A.track_id);
    if(!B){
      assert.deepEqual(doc.content,before.content,'登记同名B即改写了A工程');
      await ctx.shot('same-name-B-registered');
      await ctx.page.dragAndDrop(card,'.ed-track-row[data-track-id="'+A.track_id+'"] .ed-track-lane',
        {targetPosition:{x:1,y:1},label:'将同名B放入独立新视频轨'});
      doc=await ctx.waitSaved(doc.revision);await ctx.write('same-name-B-placed',doc);await ctx.shot('same-name-B-placed');
      B=doc.content.tracks.find(t=>t.type==='video'&&t.track_id!==A.track_id);
    }
    assert.ok(B,'B未进入独立新视频轨');
    assert.notEqual(B.clips[0].file_id,A.clips[0].file_id,'同名不同内容被按文件名合并');
    range(B.clips[0],0,10,0);
    const BA=doc.content.tracks.find(t=>t.type==='audio'&&t.linked_video_track_id===B.track_id);
    assert.ok(BA,'新增B的原声音轨缺失');
    if(!BA.muted){
      await ctx.page.click('.ed-track-row[data-track-id="'+BA.track_id+'"] button[aria-label$="静音"]');
      doc=await ctx.waitSaved(doc.revision);
    }
    for(const original of before.content.tracks)assert.deepEqual(doc.content.tracks.find(t=>t.track_id===original.track_id),original,'A原引用/原声被导入B串改');
    const toggle='.ed-track-row[data-track-id="'+B.track_id+'"] button[aria-label^="视频"]';
    if(doc.content.tracks.find(t=>t.track_id===B.track_id).visible===false){
      await ctx.page.click(toggle);doc=await ctx.waitSaved(doc.revision);
    }
    for(const stage of ['initial','reopened']){
      if(stage==='reopened')await reopened(ctx,doc);
      await present(ctx,2,2,stage+'-same-name-B-visible');
      let current=await ctx.read();await ctx.page.click(toggle);const hidden=await ctx.waitSaved(current.revision);
      assert.equal(hidden.content.tracks.find(t=>t.track_id===B.track_id).visible,false);
      await present(ctx,2,2,stage+'-B-hidden-A-visible');
      await ctx.page.click(toggle);const shown=await ctx.waitSaved(hidden.revision);
      assert.equal(shown.content.tracks.find(t=>t.track_id===B.track_id).visible,true);
      for(const original of before.content.tracks)assert.deepEqual(shown.content.tracks.find(t=>t.track_id===original.track_id),original);
      assert.equal(shown.content.tracks.find(t=>t.track_id===BA.track_id).muted,true);
      doc=shown;
    }
    await ctx.write('v2-after',doc);
    return '同名same.mp4的A/B为不同源引用；B独立新轨0～10秒、原声静音，显示B/隐藏后A的画面对照及刷新保持，A未被同名导入重绑定。';
  },
  async '053'(ctx,a,media){
    await prepareCurrent(ctx,'053',a);const before=await initial(ctx),subtitle=before.content.tracks.find(t=>t.type==='subtitle');
    const errors=[],failures=[];
    for(const name of ['empty.srt','broken.srt']){
      const doneFile=path.join(ctx.config.outDir,'053',name+'-checked.json');
      if(await fs.stat(doneFile).catch(()=>null)){errors.push(JSON.parse(await fs.readFile(doneFile,'utf8')));continue;}
      const iterationBaseline=await ctx.read();
      const card='.ed-media-card[title="'+name+'"]',started=path.join(ctx.config.outDir,'053',name+'-started.json');
      if(!await fs.stat(started).catch(()=>null)){
        await json(started,{file:name,method:'native-media-import-then-explicit-subtitle-bind'});
        await importMediaUI(ctx,path.join(path.dirname(media.fixed.path),name));
      }
      await ctx.page.waitForFunction(name=>!!document.querySelector('.ed-error[role="alert"]')||
        [...document.querySelectorAll('.ed-media-card')].some(e=>e.title===name),name,{timeout:60000});
      if(!await ctx.page.evaluate(()=>!!document.querySelector('.ed-error[role="alert"]'))){
        // Media registration stores the raw file. Actual subtitle import only
        // happens after the user places/binds it; do not confuse the two stages.
        await ctx.shot(name+'-registered');
        const bound=await ctx.page.evaluate(()=>!!document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]'));
        if(!bound){
          const prior=await ctx.read();
          const count=await ctx.page.evaluate(()=>document.querySelectorAll('.ed-track-subtitle').length);
          await ctx.page.dragAndDrop(card,'.ed-track-row[data-track-id="'+subtitle.track_id+'"] .ed-track-lane',{targetPosition:{x:10,y:10},label:'将异常字幕放入工程触发解析'});
          await ctx.page.waitForFunction(n=>!!document.querySelector('.ed-error[role="alert"]')||
            !!document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]')||
            document.querySelectorAll('.ed-track-subtitle').length>n,count,{timeout:10000});
          if(!await ctx.page.evaluate(()=>!!document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]'))&&
            !await ctx.page.evaluate(()=>!!document.querySelector('.ed-error[role="alert"]')))await ctx.waitSaved(prior.revision);
        }
        if(await ctx.page.evaluate(()=>!!document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]'))){
          await ctx.page.selectOption('select[aria-label="字幕用途"]','source');
          await ctx.page.selectOption('select[aria-label="替换已有字幕"]',subtitle.clips[0].file_id);
          await ctx.shot(name+'-bind-precondition');
          await ctx.page.click('loc=role:button[name="绑定"]');
          await ctx.page.waitForFunction(()=>!!document.querySelector('.ed-error[role="alert"]')||
            !document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]'),undefined,{timeout:30000});
        }
      }
      const error=await ctx.page.evaluate(()=>document.querySelector('.ed-error[role="alert"]')?.innerText||'');
      const after=await ctx.read();await ctx.write(name+'-after',after);await ctx.shot(name+'-rejected');
      const unchanged=JSON.stringify(after.content)===JSON.stringify(iterationBaseline.content);
      const entry={file:name,error,original_content_unchanged:unchanged,
        empty_subtitle_tracks:after.content.tracks.filter(t=>t.type==='subtitle'&&t.clips.some(c=>!c.bindings?.length)).length};
      await json(doneFile,entry);errors.push(entry);
      if(await ctx.page.evaluate(()=>!!document.querySelector('[role="dialog"][aria-label="绑定字幕文件"]')))
        await ctx.page.click('[role="dialog"][aria-label="绑定字幕文件"] button:text-is("取消")');
      if(await ctx.page.evaluate(()=>!!document.querySelector('button[aria-label="关闭错误提示"]')))
        await ctx.page.click('button[aria-label="关闭错误提示"]');
    }
    const afterInvalid=await ctx.read();await ctx.write('after-invalid-imports',afterInvalid);
    for(const entry of errors){
      if(!entry.error.trim())failures.push(entry.file+'未给出拒绝/无有效字幕提示');
      if(!entry.original_content_unchanged)failures.push(entry.file+'写入了空字幕轨或改变了工程');
    }
    await reopened(ctx,afterInvalid);await ctx.panel('Captions');await ctx.seek(2);
    await ctx.page.waitForSelector('.ed-caption-text:has-text("Fixed A")',{state:'visible',timeout:30000});
    const saved=await ctx.read();await ctx.page.click('.ed-caption-text:has-text("Fixed A")');
    await ctx.page.waitForSelector('.ed-caption-row input, .ed-caption-row textarea',{state:'visible',timeout:10000});
    const field=await ctx.page.evaluate(()=>document.querySelector('.ed-caption-row textarea')?'textarea':'input');
    await ctx.page.fill('.ed-caption-row '+field,'RECOVER053');await ctx.page.press('.ed-caption-row '+field,'Tab');
    const recovered=await ctx.waitSaved(saved.revision);await ctx.write('v2-after',recovered);
    await ctx.shot('recovery-edited');await reopened(ctx,recovered);await ctx.panel('Captions');await ctx.seek(2);
    await ctx.page.waitForFunction(()=>document.querySelector('.ed-preview-canvas')?.textContent.includes('RECOVER053'),undefined,{timeout:30000});
    await ctx.shot('recovery-refreshed');await ctx.write('invalid-input-errors',errors);
    await ctx.seek(7);await ctx.page.waitForFunction(()=>document.querySelector('.ed-preview-canvas')?.textContent.includes('Fixed B'),undefined,{timeout:10000});await ctx.shot('original-B-preserved');
    for(const original of before.content.tracks.filter(t=>t.type!=='subtitle'))assert.deepEqual(recovered.content.tracks.find(t=>t.track_id===original.track_id),original);
    await ctx.write('failure-summary',{failures,recovery_edit_saved:true,original_B_preserved:true});
    assert.deepEqual(failures,[],'异常字幕导入没有拒绝，产生持久化空字幕轨；原字幕和后续合法编辑结果见证据');
    return '空SRT和非法时码SRT通过原生登记/绑定触发实际导入拒绝，原工程/Fixed A和Fixed B保持；随后合法编辑RECOVER053可保存及刷新恢复。';
  },
};
