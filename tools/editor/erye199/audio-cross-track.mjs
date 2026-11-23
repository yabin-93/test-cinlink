import assert from 'node:assert/strict';
import {timelineContext,businessTracks} from './timeline-operations.mjs';
export const audioCrossPlan=Object.freeze([
 ...['S0','S1','T1','T2','E','C','H','G'].map(profile=>({key:`086-${profile}-cross-video`,caseId:'086',profile,operation:'cross-video'})),
 ...['087','088','089','090'].flatMap(caseId=>['T1','T2'].flatMap(profile=>(caseId==='089'?['trim-head','trim-tail']:[caseId==='087'?'split':caseId==='088'?'move':'cross-audio']).map(operation=>({key:`${caseId}-${profile}-${operation}`,caseId,profile,operation})))),
]);
const terminal=s=>['done','failed','cancelled','canceled','terminated'].includes(s);
const ranges=track=>(track?.clips||[]).map(c=>({file:c.file_id,start:c.timeline_start_sec,in:c.source_in_sec,out:c.source_out_sec,rate:c.playback_rate||1,volume:c.volume}));
const cleanClip=clip=>{const c=structuredClone(clip);delete c.clip_id;delete c.instance_id;delete c.speech_source;return c;};
const near=(a,b)=>Math.abs(a-b)<=1/30+.001;
export function sameTrackContents(before,after,beforeExclude=[],afterExclude=beforeExclude){
 const view=(doc,exclude)=>businessTracks(doc).filter(t=>!exclude.includes(t.track_id)).map(t=>{const value=structuredClone(t);delete value.track_id;delete value.linked_video_track_id;value.clips=value.clips.map(cleanClip);return JSON.stringify(value);}).sort();
 return JSON.stringify(view(before,beforeExclude))===JSON.stringify(view(after,afterExclude));
}
export async function audioCrossContext(page,config){
 const base=await timelineContext(page,{...config,variantPlan:config.variantPlan??audioCrossPlan});
 const {state,save,shot,write,check,project,waitContent}=base;
 const current=async key=>assert.equal(new URL(await page.url()).pathname,'/c/'+state.cases[key].conversationId);
 const ctx={...base,
  async prepare(key){
   const e=state.cases[key];assert.equal(e?.runStatus,'done');await current(key);
   if(!e.baseline)await base.baseline(key);
   if(e.failures.length){e.stage='Prerequisite failed';e.status='Failed';e.unexecuted=['目标时间编辑','撤销重做','编辑后保存重开'];await save();await shot(key,'failure');return{key,status:e.status,failures:e.failures};}
   if(e.operation!=='cross-video'){
    if(!e.audio?.D)await base.importAudio(key,'D');
    if(!e.audio.D.placed)await base.placeAudio(key,'D');
    const doc=await project(key);e.nativeBaseline=e.baseline;e.baseline=doc;e.targetTrackId=e.audio.D.trackId;
    check(key,'独立D只有一个真实实例',doc.content.tracks.flatMap(t=>t.clips||[]).filter(c=>c.file_id===e.audio.D.fileId).length===1,e.audio.D);
   }else e.targetTrackId=e.videoTrackId;
   await write(key,'operation-baseline',e.baseline);e.stage='Ready';await save();await shot(key,'operation-baseline');return{key,stage:e.stage,failures:e.failures};
  },
  async begin(key){
   const e=state.cases[key];assert.ok(e?.stage==='Ready'&&!e.editIntent,'已有操作意图或尚未准备，不能重放');await current(key);
   const before=await project(key),track=before.content.tracks.find(t=>t.track_id===e.targetTrackId),index=track.clips.findIndex(c=>(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1)>=4);assert.ok(index>=0,'无至少4秒目标，先补前置');
   e.beforeUI=await base.readUI(key);e.target={trackId:track.track_id,index,clip:track.clips[index],kind:track.type};e.editIntent=new Date().toISOString();await write(key,'operation-before',before);await save();return{before,track,clip:track.clips[index]};
  },
  async audioEdit(key){
   const {before,track,clip}=await this.begin(key),e=state.cases[key],s=clip.timeline_start_sec,d=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1);await base.seek(key,e.operation==='split'?12:e.operation==='trim-tail'?s+d-.6:s+1);
   const selector=await base.clipSelector(track.track_id,clip);
   if(e.operation==='split'){
    await page.keyboard.press('Escape');const r=await page.evaluate(s=>document.querySelector(s).getBoundingClientRect().toJSON(),selector);await page.mouse.click(r.x+Math.min(70,r.width*.37),r.bottom-5,{label:'仅选中独立音频D片段'});await base.seek(key,12);
    const available=await page.evaluate(()=>({disabled:document.querySelector('button[aria-label="分割所选片段"]')?.disabled,selection:[...document.querySelectorAll('.ed-timeline-clip.is-selected')].map(x=>({trackId:x.closest('.ed-track-row')?.dataset.trackId,label:x.getAttribute('aria-label')})),buttons:[...document.querySelectorAll('.ed-timeline button')].map(x=>({label:x.getAttribute('aria-label'),disabled:x.disabled}))}));e.splitSelection=available.selection;await write(key,'split-availability',available);await shot(key,'before-split-selected-D');
    if(available.disabled){await shot(key,'split-disabled');e.status='Not Applicable';e.stage='Unsupported';e.unexecuted=['独立音频分割','分割后跨切点播放','分割撤销重做及重开'];e.unsupportedReason='独立D在12秒选中时页面分割按钮禁用，未执行目标分割；不使用视频分割或内部接口代替。';await save();return{key,status:e.status,reason:e.unsupportedReason};}
    await page.click('button[aria-label="分割所选片段"]',{label:'在十二秒分割独立音频D'});
   }else if(e.operation==='move')await this.gesture(key,track.track_id,clip,{delta:1});
   else await this.gesture(key,track.track_id,clip,{edge:e.operation==='trim-head'?'start':'end',delta:e.operation==='trim-head'?.5:-.5});
   const after=await waitContent(key,before);await write(key,'operation-after',after);assert.notDeepEqual(businessTracks(after),businessTracks(before),'手势没有改变内容，观察当前命中后恢复，不重复操作或撤销前置');
   const actual=after.content.tracks.find(t=>t.track_id===track.track_id),expected=structuredClone(track.clips);const target=expected[e.target.index];
   if(e.operation==='move')target.timeline_start_sec+=1;
   else if(e.operation==='trim-head'){target.timeline_start_sec+=.5;target.source_in_sec+=.5*(target.playback_rate||1);}
   else if(e.operation==='trim-tail')target.source_out_sec-=.5*(target.playback_rate||1);
   else{const right=structuredClone(target);target.source_out_sec=target.source_in_sec+(12-s)*(target.playback_rate||1);right.source_in_sec=target.source_out_sec;right.timeline_start_sec=12;expected.splice(e.target.index+1,0,right);}
   check(key,'独立D时间和源范围正确',actual?.clips.length===expected.length&&expected.every((c,i)=>['timeline_start_sec','source_in_sec','source_out_sec'].every(k=>near(c[k],actual.clips[i][k]))&&c.file_id===actual.clips[i].file_id),{expected:expected.map(cleanClip),actual:actual?.clips.map(cleanClip)});
   check(key,'视频BGM原声译声字幕及非目标保持',sameTrackContents(before,after,[track.track_id]),{before:businessTracks(before).filter(t=>t.track_id!==track.track_id),after:businessTracks(after).filter(t=>t.track_id!==track.track_id)});
   await this.previewD(key,after,e.operation==='trim-head'?7:7.5);
   if(e.operation==='split')await base.playWindow(key,11,13);
   await this.restoreAndPersist(key,before,after);return this.finishVariant(key);
  },
  async gesture(key,trackId,clip,{delta=0,edge,cross=false}={}){
   await base.expanded();const selector=await base.clipSelector(trackId,clip),r=await page.evaluate(sel=>document.querySelector(sel).getBoundingClientRect().toJSON(),selector),duration=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1),px=r.width/duration;
   let x=r.x+Math.min(70,r.width*.37),y=r.bottom-5;
   if(edge){const h=await page.evaluate(({sel,edge})=>document.querySelector(sel).querySelector('.ed-trim-handle.is-'+edge)?.getBoundingClientRect().toJSON(),{sel:selector,edge});assert.ok(h,'当前音频无裁剪边缘');x=h.x+h.width/2;y=h.y+h.height/2;}
   const hit=await page.evaluate(({x,y,sel})=>{const t=document.elementFromPoint(x,y);return{matches:t?.closest('.ed-timeline-clip')===document.querySelector(sel),className:t?.className,aria:t?.getAttribute('aria-label')}},{x,y,sel:selector});assert.ok(hit.matches,'指针被播放头或覆盖层挡住，先核对命中，不发起手势');await write(key,'gesture-hit-test',{x,y,edge,cross,hit});
   let targetY=y;
   if(cross){const layout=await page.evaluate(()=>({scroll:document.querySelector('.ed-timeline-scroll').getBoundingClientRect().toJSON(),rows:[...document.querySelectorAll('.ed-track-row')].map(x=>x.getBoundingClientRect().toJSON())}));targetY=layout.rows.at(-1).bottom+16;assert.ok(targetY<layout.scroll.bottom-12,'先扩大可视时间轴再纵向拖动');}
   await page.keyboard.press('Escape');await page.keyboard.down('Alt');try{await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+(edge?0:10),y);await page.mouse.move(x+px*delta,targetY,{label:cross?'移到空白处新建同类型轨道':edge?'裁剪独立音频D半秒':'独立音频主体平移一秒'});await page.mouse.up();}finally{await page.keyboard.up('Alt');}
  },
  async cross(key){
   const {before,track,clip}=await this.begin(key),e=state.cases[key];await base.seek(key,clip.timeline_start_sec+Math.min(1,(clip.source_out_sec-clip.source_in_sec)/2));await this.gesture(key,track.track_id,clip,{cross:true});
   const after=await waitContent(key,before);await write(key,'cross-after',after);assert.notDeepEqual(businessTracks(after),businessTracks(before),'跨轨手势未改变内容，先观察入口/命中，不重放手势');
   const instances=after.content.tracks.flatMap(t=>t.clips.map(c=>({track:t,clip:c}))).filter(x=>x.clip.clip_id===clip.clip_id);assert.equal(instances.length,1,'目标实例不是唯一，停止避免操作其他对象');const moved=instances[0];e.destinationTrackId=moved.track.track_id;
   check(key,'目标移入新的同类型轨且仅一个实例',moved.track.track_id!==track.track_id&&moved.track.type===track.type&&moved.track.clips.length===1&&!before.content.tracks.some(t=>t.track_id===moved.track.track_id),{from:track.track_id,to:moved.track.track_id,type:moved.track.type});
   const oldClip=cleanClip(clip),crossedClip=cleanClip(moved.clip);delete oldClip.timeline_start_sec;delete crossedClip.timeline_start_sec;
   check(key,'纵向换轨保持源和时间',near(moved.clip.timeline_start_sec,clip.timeline_start_sec)&&JSON.stringify(crossedClip)===JSON.stringify(oldClip),{before:cleanClip(clip),after:cleanClip(moved.clip),startDifference:moved.clip.timeline_start_sec-clip.timeline_start_sec});
   const source=after.content.tracks.find(t=>t.track_id===track.track_id);check(key,'源轨其余片段保持且无目标残留',JSON.stringify((source?.clips||[]).map(cleanClip))===JSON.stringify(track.clips.filter(c=>c.clip_id!==clip.clip_id).map(cleanClip)),null);
   const excluded=[track.track_id,...(e.operation==='cross-video'&&e.nativeBgmTrackId?[e.nativeBgmTrackId]:[])],ui=await base.readUI(key),beforeOrder=e.beforeUI?e.beforeUI.rows.filter(r=>r.track!==track.track_id).map(r=>r.name):e.initialShape.filter(r=>r.name!=='视频').map(r=>r.name),afterOrder=ui.rows.filter(r=>r.track!==track.track_id&&r.track!==moved.track.track_id).map(r=>r.name);
   e.crossUI=ui;check(key,'跨轨保留其他轨内容时间和原有行序',sameTrackContents(before,after,excluded,[...excluded,moved.track.track_id])&&JSON.stringify(beforeOrder)===JSON.stringify(afterOrder),{beforeOrder,afterOrder,contentUnchanged:sameTrackContents(before,after,excluded,[...excluded,moved.track.track_id])});
   if(e.operation==='cross-audio'){const shown=ui.rows.find(r=>r.track===moved.track.track_id)?.name;check(key,'换轨后D身份不变为原声或译声',Boolean(shown)&&!/原声|配音|译声/.test(shown),{name:shown,fileId:moved.clip.file_id});}
   if(e.operation==='cross-video'&&e.nativeBgmTrackId){const b=before.content.tracks.find(t=>t.track_id===e.nativeBgmTrackId),a=after.content.tracks.find(t=>t.track_id===e.nativeBgmTrackId);check(key,'原生BGM留音频轨且源范围保持',a?.type==='audio'&&JSON.stringify(ranges(a))===JSON.stringify(ranges(b)),{before:ranges(b),after:ranges(a)});}
   await shot(key,e.failures.length?'cross-failure':'cross-verified');await base.historyStep(key,'撤销',before,'undo-cross');await base.historyStep(key,'重做',after,'redo-cross');await base.persist(key,after,'cross-refreshed');
   const beforeMove=await project(key),newTrack=beforeMove.content.tracks.find(t=>t.track_id===moved.track.track_id),newClip=newTrack.clips[0];await base.seek(key,newClip.timeline_start_sec+1);
   e.followupMoveIntent=new Date().toISOString();await save();await this.gesture(key,newTrack.track_id,newClip,{delta:1});const movedAgain=await waitContent(key,beforeMove);await write(key,'followup-move-before',beforeMove);await write(key,'operation-after',movedAgain);
   const got=movedAgain.content.tracks.find(t=>t.track_id===newTrack.track_id)?.clips[0];check(key,'换轨后目标仍可独立平移一秒',got&&near(got.timeline_start_sec,newClip.timeline_start_sec+1)&&near(got.source_in_sec,newClip.source_in_sec)&&near(got.source_out_sec,newClip.source_out_sec),got);
   const coupled=[newTrack.track_id];if(e.operation==='cross-video'&&e.nativeBgmTrackId){coupled.push(e.nativeBgmTrackId);const b=beforeMove.content.tracks.find(t=>t.track_id===e.nativeBgmTrackId),a=movedAgain.content.tracks.find(t=>t.track_id===e.nativeBgmTrackId);const index=b.clips.findIndex(c=>near(c.timeline_start_sec,newClip.timeline_start_sec)&&near(c.source_in_sec,newClip.source_in_sec));check(key,'视频换轨后原生BGM关联保持',index>=0&&a?.clips.some(c=>near(c.timeline_start_sec,b.clips[index].timeline_start_sec+1)&&near(c.source_in_sec,b.clips[index].source_in_sec)),{before:ranges(b),after:ranges(a)});}
   check(key,'换轨后平移不带动非目标轨',sameTrackContents(beforeMove,movedAgain,coupled),{before:businessTracks(beforeMove).filter(t=>!coupled.includes(t.track_id)),after:businessTracks(movedAgain).filter(t=>!coupled.includes(t.track_id))});
   if(e.operation==='cross-audio')await this.previewD(key,movedAgain,8);
   else{e.originalVideoTrackId=e.videoTrackId;e.videoTrackId=moved.track.track_id;await this.verifyCrossPreviewMapping(key,movedAgain,newClip.timeline_start_sec+1.5);}
   await this.restoreAndPersist(key,beforeMove,movedAgain);return this.finishVariant(key);
  },
  async verifyCrossPreviewMapping(key,doc,time){
   const e=state.cases[key],track=doc.content.tracks.find(t=>t.track_id===e.videoTrackId),clip=track.clips.find(c=>time>=c.timeline_start_sec&&time<c.timeline_start_sec+(c.source_out_sec-c.source_in_sec)/(c.playback_rate||1));assert.ok(clip,'预览点必须落在已换轨视频片段内');const expected=clip.source_in_sec+(time-clip.timeline_start_sec)*(clip.playback_rate||1);await base.seek(key,time);let ready=true;
   try{await page.waitForFunction(expected=>[...document.querySelectorAll('[aria-label="工程实时预览"] video')].some(v=>{const s=getComputedStyle(v);return s.visibility!=='hidden'&&s.display!=='none'&&v.readyState>=2&&!v.seeking&&Math.abs(v.currentTime-expected)<=.04}),expected,{timeout:15000});}catch{ready=false;}
   const actual=await page.evaluate(()=>[...document.querySelectorAll('[aria-label="工程实时预览"] video')].map(v=>({media:v.getAttribute('data-preview-media'),visibility:getComputedStyle(v).visibility,time:v.currentTime,ready:v.readyState,seeking:v.seeking,width:v.videoWidth,height:v.videoHeight})));check(key,'可见视频预览映射到编辑后源时间',ready,{playhead:time,expectedSourceTime:expected,actual});await write(key,'cross-preview-source-mapping',{playhead:time,expectedSourceTime:expected,actual});await save();return{ready,actual};
  },
  async supplementPreview(key){
   const e=state.cases[key];assert.ok(e?.stage==='Executed'&&e.operation==='cross-video'&&!e.crossPreviewSupplementedAt);const oldStage=e.stage;await base.resume(key);await base.inspect(key);const fs=await import('node:fs/promises'),path=await import('node:path'),old=JSON.parse(await fs.readFile(path.join(config.outDir,key,'preview-source-mapping.json'),'utf8'));const result=await this.verifyCrossPreviewMapping(key,await project(key),old.playhead);
   if(result.ready){const previous=e.checks.filter(c=>c.name==='预览映射到编辑后的源视频时间');e.observerAdjustments??=[];e.observerAdjustments.push({reason:'原观察读到首个隐藏的预热视频；按实际可见视频重新核验原已保存结果。',originalChecks:previous});e.checks=e.checks.filter(c=>c.name!=='预览映射到编辑后的源视频时间');e.failures=e.failures.filter(n=>n!=='预览映射到编辑后的源视频时间');}
   e.crossPreviewSupplementedAt=new Date().toISOString();e.stage=oldStage;e.status=e.failures.length?'Failed':'Passed';await save();await shot(key,e.failures.length?'failure-preview-supplement':'preview-supplement-verified');return{key,status:e.status,failures:e.failures,ready:result.ready};
  },
  async previewD(key,doc,time){
   const e=state.cases[key],dTracks=doc.content.tracks.filter(t=>t.clips.some(c=>c.file_id===e.audio.D.fileId)).map(t=>t.track_id);assert.ok(dTracks.length,'实际工程里缺少D，不能以波形或其他声音替代');const restore=[];
   try{
    for(const track of doc.content.tracks.filter(t=>t.type==='audio'&&t.clips.length&&!dTracks.includes(t.track_id)&&!t.muted)){
     const selector='.ed-track-row[data-track-id="'+track.track_id+'"] .ed-track-heading button',present=await page.evaluate(s=>{const b=document.querySelector(s);return b&&!b.disabled&&/静音$/.test(b.getAttribute('aria-label')||'')},selector);assert.ok(present,'当前原生声音缺少可用静音入口，先核对页面，不宣称D单独试听完成');
     const beforeMute=await project(key);await page.click(selector,{label:'临时静音其他声音单独试听D'});const muted=await waitContent(key,beforeMute);assert.equal(muted.content.tracks.find(t=>t.track_id===track.track_id).muted,true);restore.push(beforeMute);
    }
    await base.seek(key,time);await base.playback(key,time);
    const observation=await page.evaluate(()=>[...document.querySelectorAll('audio[data-preview-media]')].map(a=>({media:a.getAttribute('data-preview-media'),start:Number(a.getAttribute('data-preview-start')),end:Number(a.getAttribute('data-preview-end')),sourceIn:Number(a.getAttribute('data-preview-source-in')),time:a.currentTime,duration:a.duration,ready:a.readyState,paused:a.paused,muted:a.muted,volume:a.volume,decodedBytes:a.webkitAudioDecodedByteCount})));e.audioPreview={isolatedDTrackIds:dTracks,mutedOtherTracks:restore.length,playheadStart:time,media:observation};await write(key,'audio-preview-observation',e.audioPreview);
   }finally{
    for(let i=restore.length-1;i>=0;i--)await base.historyStep(key,'撤销',restore[i],'restore-preview-mute-'+i);
   }
   check(key,'试听后临时静音全部撤销，目标编辑保持',sameTrackContents(doc,await project(key)),null);await save();
  },
  async restoreAndPersist(key,before,after){await base.historyStep(key,'撤销',before,'undo-restores-baseline');await base.historyStep(key,'重做',after,'redo-restores-edit');await base.persist(key,after,'refresh-preserves-edit');},
  async finishVariant(key){const e=state.cases[key];e.stage='Executed';e.status=e.failures.length?'Failed':'Passed';e.completedAt=new Date().toISOString();await save();await shot(key,e.failures.length?'failure-after-reopen':'verified');return{key,status:e.status,failures:e.failures};},
  async drive(key){
   const e=state.cases[key];if(!e)return this.start(key);
   if(['Executed','Prerequisite failed','Unsupported'].includes(e.stage))return{key,status:e.status};
   if(!terminal(e.runStatus))return this.observe(key);
   if(e.runStatus!=='done'){e.stage='Prerequisite failed';e.status=e.runError?.code==='insufficient_credits'?'Blocked':'Failed';e.failures??=[];e.failures.push('原生准备未完成：'+e.runStatus);e.unexecuted=['原生基线','目标时间编辑及恢复'];await save();await shot(key,'failure');return{key,status:e.status,error:e.runError};}
   if(!e.editIntent){if(e.stage!=='Ready')await this.prepare(key);if(e.stage!=='Ready')return{key,status:e.status,failures:e.failures};}
   assert.ok(!e.editIntent,'已有手势意图，需核对原操作，不能重放drive');return e.operation.startsWith('cross-')?this.cross(key):this.audioEdit(key);
  },
 };
 return ctx;
}
