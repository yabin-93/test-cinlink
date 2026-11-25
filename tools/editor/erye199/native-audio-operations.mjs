import assert from 'node:assert/strict';
import {audioCrossContext,sameTrackContents}from'./audio-cross-track.mjs';
import {businessTracks}from'./timeline-operations.mjs';

const combinations=['T1','T2','X1','X2'];
export const nativeAudioPlan=Object.freeze([
 ...['091','092','093','094'].flatMap(caseId=>combinations.flatMap(combination=>(caseId==='093'?['trim-head','trim-tail']:[caseId==='091'?'split':caseId==='092'?'move':'cross-bgm']).map(operation=>({key:`${caseId}-${combination}-${operation}`,caseId,profile:combination==='X1'?'T1':combination==='X2'?'T2':combination,combination,addD:combination.startsWith('X'),operation,role:'background'})))),
 ...['S0','S1','T1','T2','X1','X2','E','C','H'].map(combination=>({key:`095-${combination}-split`,caseId:'095',profile:combination==='X1'?'T1':combination==='X2'?'T2':combination,combination,addD:combination.startsWith('X'),operation:'split',role:'source'})),
]);
const near=(a,b)=>Math.abs(a-b)<=1/30+.001;
const clean=c=>{const v=structuredClone(c);delete v.clip_id;delete v.instance_id;delete v.speech_source;return v;};
const terminal=s=>['done','failed','cancelled','canceled','terminated'].includes(s);
const changedRanges=(clip,operation,h)=>{
 const out=[structuredClone(clip)],rate=clip.playback_rate||1;
 if(operation==='move')out[0].timeline_start_sec+=1;
 else if(operation==='trim-head'){out[0].timeline_start_sec+=.5;out[0].source_in_sec+=.5*rate;}
 else if(operation==='trim-tail')out[0].source_out_sec-=.5*rate;
 else{out[0].source_out_sec=clip.source_in_sec+(h-clip.timeline_start_sec)*rate;out.push({...structuredClone(clip),timeline_start_sec:h,source_in_sec:out[0].source_out_sec});}
 return out;
};
const matchClips=(expected,actual)=>expected.length===actual?.length&&expected.every((c,i)=>c.file_id===actual[i].file_id&&['timeline_start_sec','source_in_sec','source_out_sec'].every(k=>near(c[k],actual[i][k]))&&(c.playback_rate||1)===(actual[i].playback_rate||1));

export async function nativeAudioContext(page,config){
 const base=await audioCrossContext(page,{...config,variantPlan:nativeAudioPlan});
 const {state,save,shot,write,project,check,waitContent}=base;
 const spec=key=>{const s=nativeAudioPlan.find(x=>x.key===key);assert.ok(s);return s;};
 const ctx={...base,
  async confirmImportedAudio(key){
   const e=state.cases[key],a=e?.audio?.D;assert.ok(e?.runStatus==='done'&&e.baseline&&a?.importIntent&&!a.registered&&!a.placementIntent&&!e.editIntent,'Only the already-dispatched D registration may be confirmed');
   assert.ok(await page.evaluate(name=>!!document.querySelector('.ed-media-card[title="'+name+'"]'),base.media.D.name),'Imported D must actually be visible in native media results');
   const after=await project(key);assert.deepEqual(businessTracks(after),businessTracks(e.baseline),'Registration changed the timeline; inspect instead of proceeding');
   await write(key,'D-registration-before',e.baseline);await write(key,'D-registration-after',after);check(key,'D登记不改变时间轴',true,after.content.tracks.length);a.registered=true;a.registrationConfirmedAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'素材分页首屏只有30项；填入搜索并点击搜索后定位已登记的D，时间轴与导入前一致，未重复导入。'});await save();await shot(key,'D-registered');return{key,registered:true};
  },
  async recoverBaselinePlayback(key){
   const e=state.cases[key];assert.ok(e?.runStatus==='done'&&e.editorId&&!e.editIntent&&!e.audio&&!e.playbackRecoveryAttemptAt&&e.stage==='Editor observed','Only an unedited preparation can recheck baseline playback once');
   const fs=await import('node:fs/promises'),path=await import('node:path'),folder=base.artifactDir(key);
   const original=JSON.parse(await fs.readFile(path.join(folder,'native-project.json'),'utf8'));assert.deepEqual(businessTracks(await project(key)),businessTracks(original),'Preparation changed, inspect before continuing');
   await fs.copyFile(path.join(folder,'playback-samples-2.json'),path.join(folder,'first-baseline-playback-timeout-samples.json'));
   e.playbackRecoveryAttemptAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'首轮基线播放30秒观察未推进；暂停后页面已自行到20秒片尾且在线，未编辑目标。保留原始样本并在同一工程重新核验基线播放，不推断原因。'});await save();return base.baseline(key);
  },
  async recoverAfterPlayback(key){
   const e=state.cases[key],s=spec(key);assert.ok(e?.operationDispatchedAt&&e.target&&!e.audioPreview&&!e.postEditPlaybackRecoveryAt&&e.stage==='Ready'&&s.operation==='trim-tail','Only a confirmed post-trim playback pause may resume');
   const fs=await import('node:fs/promises'),path=await import('node:path'),folder=base.artifactDir(key),before=JSON.parse(await fs.readFile(path.join(folder,'operation-before.json'),'utf8')),after=JSON.parse(await fs.readFile(path.join(folder,'operation-after.json'),'utf8'));
   assert.deepEqual(businessTracks(await project(key)),businessTracks(after),'Saved target edit changed; inspect instead of replaying');
   await shot(key,'playback-auto-end-before-recovery');
   e.postEditPlaybackRecoveryAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'裁尾后预览到片尾自动停止，暂停按钮在观察和点击间变为播放。原裁剪和临时声音恢复均保持，仅续接播放及保存核验，不重复裁剪。'});await save();
   const track=before.content.tracks.find(t=>t.track_id===e.target.trackId),clip=track.clips[e.target.index],expected=structuredClone(before),targets=[track.track_id,...(s.role==='background'?[e.videoTrackId]:[])],start=clip.timeline_start_sec,d=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1);
   for(const id of targets){const t=expected.content.tracks.find(t=>t.track_id===id),index=id===track.track_id?e.target.index:t.clips.findIndex(c=>near(c.timeline_start_sec,start)&&near((c.source_out_sec-c.source_in_sec)/(c.playback_rate||1),d));assert.ok(index>=0);t.clips.splice(index,1,...changedRanges(t.clips[index],s.operation,e.target.splitAt));check(key,id===track.track_id?'目标声音时间和源区间正确':'BGM操作反向联动对应视频',matchClips(t.clips,after.content.tracks.find(t=>t.track_id===id)?.clips),{expected:t.clips.map(clean),actual:after.content.tracks.find(t=>t.track_id===id)?.clips.map(clean)});}
   check(key,'非目标轨及声音保持不被误联动',sameTrackContents(before,after,targets),{before:businessTracks(before).filter(t=>!targets.includes(t.track_id)),after:businessTracks(after).filter(t=>!targets.includes(t.track_id))});
   const rest=track.clips.filter((_,i)=>i!==e.target.index).map(clean),actual=after.content.tracks.find(t=>t.track_id===track.track_id);check(key,'目标同轨其余片段保持',rest.every(c=>actual.clips.some(a=>JSON.stringify(clean(a))===JSON.stringify(c))),rest);await save();
   await this.isolatePlayback(key,after,track.track_id,start+d-2,start+d-.8);await base.verifyCrossPreviewMapping(key,after,start+.7);await base.restoreAndPersist(key,before,after);return base.finishVariant(key);
  },
  async recoverTailSeek(key){
   const e=state.cases[key],s=spec(key);assert.ok(e?.operationDispatchedAt&&e.audioPreview&&e.stage==='Ready'&&s.operation==='trim-tail'&&!e.tailSeekRecoveryAt,'Only an observed tail playback control race may resume once');
   const fs=await import('node:fs/promises'),path=await import('node:path'),folder=base.artifactDir(key),before=JSON.parse(await fs.readFile(path.join(folder,'operation-before.json'),'utf8')),after=JSON.parse(await fs.readFile(path.join(folder,'operation-after.json'),'utf8'));assert.deepEqual(businessTracks(await project(key)),businessTracks(after),'Original target edit changed; do not replay');
   await fs.copyFile(path.join(folder,'cross-split-playback.json'),path.join(folder,'first-pause-race-playback.json'));await shot(key,'pause-race-before-recovery');
   const oldChecks=e.checks.filter(c=>c.name==='连续预览跨越切点前后各1秒'&&!c.passed);e.tailSeekRecoveryAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'片尾暂停点击与自动停止发生竞争，原播放核验读到重新开始后的0.02秒；目标裁剪未重复。改为等待自然停播后在同一工程复核，并保留原检查与样本。',originalChecks:oldChecks});await save();
   const clip=e.target.clip,start=clip.timeline_start_sec,d=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1);await this.isolatePlayback(key,after,e.target.trackId,start+d-1.5,start+d-.5);
   assert.ok(e.checks.some(c=>c.name==='连续预览跨越切点前后各1秒'&&c.passed),'Corrected native playback must actually cross the required end');
   e.checks=e.checks.filter(c=>!oldChecks.includes(c));e.failures=e.failures.filter(n=>n!=='连续预览跨越切点前后各1秒');await save();await base.verifyCrossPreviewMapping(key,after,start+.7);await base.restoreAndPersist(key,before,after);return base.finishVariant(key);
  },
  async recoverMutePreparation(key){
   const e=state.cases[key],s=spec(key);assert.ok(e?.operationDispatchedAt&&e.operationResultVerifiedAt&&!e.audioPreview&&!e.muteRecoveryAt&&e.stage==='Ready'&&s.operation==='trim-tail','Only a verified trim with interrupted temporary mute may resume');
   const fs=await import('node:fs/promises'),path=await import('node:path'),folder=base.artifactDir(key),before=JSON.parse(await fs.readFile(path.join(folder,'operation-before.json'),'utf8')),after=JSON.parse(await fs.readFile(path.join(folder,'operation-after.json'),'utf8')),current=await project(key),normalized=structuredClone(current);
   const muted=after.content.tracks.filter(t=>t.type==='audio'&&!t.muted&&current.content.tracks.find(x=>x.track_id===t.track_id)?.muted===true);assert.equal(muted.length,1,'Confirm exactly one interrupted temporary mute before undo');
   normalized.content.tracks.find(t=>t.track_id===muted[0].track_id).muted=muted[0].muted;assert.deepEqual(businessTracks(normalized),businessTracks(after),'Changes beyond the confirmed temporary mute require inspection');
   e.muteRecoveryAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'临时静音的首次回读未反映切换，后续页面与回读确认已静音。先撤销该次临时静音恢复已保存的裁剪，再隔离播放核验；不重复裁剪。',trackId:muted[0].track_id});await save();await base.historyStep(key,'撤销',after,'restore-interrupted-preview-mute');
   const clip=e.target.clip,start=clip.timeline_start_sec,d=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1);await this.isolatePlayback(key,after,e.target.trackId,start+d-1.5,start+d-.5);await base.verifyCrossPreviewMapping(key,after,start+.7);await base.restoreAndPersist(key,before,after);return base.finishVariant(key);
  },
  async resumeSourcePlayback(key){
   const e=state.cases[key],s=spec(key);assert.ok(e?.operationDispatchedAt&&e.operationResultVerifiedAt&&!e.audioPreview&&!e.sourcePlaybackResumedAt&&e.stage==='Ready'&&s.operation==='split'&&s.role==='source','Only an interrupted source preview with preserved target edit may resume');
   const fs=await import('node:fs/promises'),path=await import('node:path'),folder=base.artifactDir(key),before=JSON.parse(await fs.readFile(path.join(folder,'operation-before.json'),'utf8')),after=JSON.parse(await fs.readFile(path.join(folder,'operation-after.json'),'utf8'));assert.ok(sameTrackContents(await project(key),after),'Temporary state must first be natively restored to the recorded target edit');
   e.sourcePlaybackResumedAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'临时静音状态首次回读未收敛；页面及新鲜回读确认后仅撤销该次临时静音恢复原剪辑，再续接原声试听与目标恢复核验，不重复分割。'});await save();await this.isolatePlayback(key,after,e.target.trackId,e.target.splitAt-1,e.target.splitAt+1);await base.verifyCrossPreviewMapping(key,after,e.target.clip.timeline_start_sec+.7);await base.restoreAndPersist(key,before,after);return base.finishVariant(key);
  },
  async prepare(key){
   const e=state.cases[key],s=spec(key);assert.equal(e.runStatus,'done');
   if(!e.baseline)await base.baseline(key);
   if(e.failures.length){e.stage='Prerequisite failed';e.status='Failed';e.unexecuted=['目标声音编辑','撤销重做','保存重开'];await save();await shot(key,'baseline-failure');return{key,status:e.status,failures:e.failures};}
   if(s.addD){if(!e.audio?.D)await base.importAudio(key,'D');if(!e.audio.D.placed)await base.placeAudio(key,'D');e.nativeBaseline=e.baseline;e.baseline=await project(key);}
   const doc=await project(key),track=doc.content.tracks.find(t=>t.type==='audio'&&t.role===s.role&&t.clips.length);
   if(!track){e.status='Blocked';e.stage='Prerequisite failed';e.unsupportedReason='本轮原生工程没有可操作的'+s.role+'声音轨';e.unexecuted=['目标声音编辑及恢复'];await save();await shot(key,'missing-target');return{key,status:e.status};}
   e.targetTrackId=track.track_id;e.combination=s.combination;e.targetRole=s.role;e.stage='Ready';await write(key,'operation-baseline',doc);await save();await shot(key,'operation-baseline');return{key,stage:e.stage,role:s.role,combination:s.combination};
  },
  async isolatePlayback(key,doc,trackId,start,end){
   const previous=[];
   const waitMuted=async(id,wanted)=>{const deadline=Date.now()+15000;do{const observed=await project(key);if(observed.content.tracks.find(t=>t.track_id===id)?.muted===wanted)return observed;await new Promise(r=>setTimeout(r,200));}while(Date.now()<deadline);throw Error('Native audio mute state did not converge; inspect original preparation before retry');};
   try{
    for(const t of doc.content.tracks.filter(t=>t.type==='audio'&&t.clips.length&&t.track_id!==trackId&&!t.muted)){
     const before=await project(key),selector='.ed-track-row[data-track-id="'+t.track_id+'"] .ed-track-heading button';
     const eligible=await page.evaluate(s=>{const b=document.querySelector(s);return b&&!b.disabled&&/静音$/.test(b.getAttribute('aria-label')||'')},selector);assert.ok(eligible,'独立试听需有可用静音入口');
     await page.click(selector,{label:'临时静音非目标声音核对接缝'});await page.waitForFunction(id=>(document.querySelector('.ed-track-row[data-track-id="'+id+'"] .ed-track-heading button')?.getAttribute('aria-label')||'').endsWith('启用'),t.track_id,{timeout:10000});await waitMuted(t.track_id,true);previous.push(before);
    }
    let current=await project(key);const target=current.content.tracks.find(t=>t.track_id===trackId);
    if(target.muted){const before=current;await page.click('.ed-track-row[data-track-id="'+trackId+'"] .ed-track-heading button',{label:'临时启用本轮目标音频试听'});await page.waitForFunction(id=>(document.querySelector('.ed-track-row[data-track-id="'+id+'"] .ed-track-heading button')?.getAttribute('aria-label')||'').endsWith('静音'),trackId,{timeout:10000});current=await waitMuted(trackId,false);previous.push(before);}
    await base.playWindow(key,start,end);
    state.cases[key].audioPreview={targetTrackId:trackId,role:spec(key).role,start,end,otherEnabledAudioMuted:true,sourceRanges:target.clips.map(clean),scope:'原生播放推进、声音隔离和源区间核验；不宣称人工逐字听审。'};await write(key,'isolated-audio-preview',state.cases[key].audioPreview);
   }finally{for(let i=previous.length-1;i>=0;i--)await base.historyStep(key,'撤销',previous[i],'restore-preview-'+i);}
   const restored=sameTrackContents(doc,await project(key));check(key,'试听后临时启停全部撤销且目标编辑保持',restored,null);await save();assert.ok(restored,'Temporary playback state did not restore; inspect before testing target history');
  },
  async resumeSelected(key){
   const e=state.cases[key];assert.ok(e?.editIntent&&!e.operationDispatchedAt&&e.target?.splitAt&&!e.selectionOnlyRecoveryAt,'Only a confirmed selection-only pause may resume');
   e.selectionOnlyRecoveryAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'BGM单击会自动选中视频/BGM关联组；旧单选计数保护在分割前停止，原工程未编辑。允许仅关联视频与目标BGM选中。'});await save();return this.audioOperation(key,true);
  },
  async audioOperation(key,resumeSelection=false){
   const s=spec(key),e=state.cases[key];
   let before,track,clip;
   if(resumeSelection){const fs=await import('node:fs/promises'),path=await import('node:path');before=JSON.parse(await fs.readFile(path.join(config.outDir,key,'operation-before.json'),'utf8'));assert.deepEqual(businessTracks(await project(key)),businessTracks(before),'Original selection-only project changed; inspect before resuming');track=before.content.tracks.find(t=>t.track_id===e.target.trackId);clip=track.clips[e.target.index];}
   else({before,track,clip}=await base.begin(key));
   const start=clip.timeline_start_sec,d=(clip.source_out_sec-clip.source_in_sec)/(clip.playback_rate||1),h=Math.floor((start+d/2)*30+1e-6)/30;
   e.target.splitAt=h;await save();
   await base.seek(key,s.operation==='split'?h:start+Math.min(1,d/2));
   if(s.operation==='split'){
    const selector=await base.clipSelector(track.track_id,clip);await page.keyboard.press('Escape');const rect=await page.evaluate(sel=>document.querySelector(sel).getBoundingClientRect().toJSON(),selector);
    const x=rect.x+Math.min(70,rect.width*.37),y=rect.bottom-5;
    const hit=await page.evaluate(({x,y,sel})=>document.elementFromPoint(x,y)?.closest('.ed-timeline-clip')===document.querySelector(sel),{x,y,sel:selector});assert.ok(hit,'播放头遮挡选中点，先观察，不点击');
    await page.mouse.click(x,y,{label:'仅选中目标原生音频片段'});await base.seek(key,h);
    const selection=await page.evaluate(()=>({disabled:document.querySelector('button[aria-label="分割所选片段"]')?.disabled,selected:[...document.querySelectorAll('.ed-timeline-clip.is-selected')].map(c=>({trackId:c.closest('.ed-track-row')?.dataset.trackId,label:c.getAttribute('aria-label')}))}));e.splitSelection=selection.selected;await write(key,'split-selection',selection);await shot(key,'before-split-selected-target');
    const allowed=s.role==='background'?[track.track_id,e.videoTrackId]:[track.track_id];
    assert.ok(selection.selected.some(x=>x.trackId===track.track_id),'The directly clicked target sound must be selected');
    check(key,'单击目标声音后选中范围未扩大到非关联轨',selection.selected.every(x=>allowed.includes(x.trackId))&&selection.selected.length<=allowed.length,selection.selected);
    if(selection.disabled){e.status='Not Applicable';e.stage='Unsupported';e.unsupportedReason='本轮选中'+s.role+'后原生分割按钮禁用';e.unexecuted=['目标分割','分割恢复及重开'];await save();await shot(key,'split-disabled');return{key,status:e.status};}
    assert.ok(!e.operationDispatchedAt);e.operationDispatchedAt=new Date().toISOString();await save();await page.click('button[aria-label="分割所选片段"]',{label:'从目标声音发起原生分割'});
   }else{assert.ok(!e.operationDispatchedAt);e.operationDispatchedAt=new Date().toISOString();await save();await base.gesture(key,track.track_id,clip,{delta:s.operation==='move'?1:s.operation==='trim-head'?.5:-.5,...(s.operation.startsWith('trim-')?{edge:s.operation==='trim-head'?'start':'end'}:{})});}
   const after=await waitContent(key,before);await write(key,'operation-after',after);assert.notDeepEqual(businessTracks(after),businessTracks(before),'没有内容变化，先观察原手势，不重放或撤销前置');
   const expected=structuredClone(before),targets=[track.track_id];
   if(s.role==='background')targets.push(e.videoTrackId);
   for(const id of targets){const t=expected.content.tracks.find(t=>t.track_id===id);const index=id===track.track_id?e.target.index:t.clips.findIndex(c=>near(c.timeline_start_sec,start)&&near((c.source_out_sec-c.source_in_sec)/(c.playback_rate||1),d));assert.ok(index>=0,'原生视频/BGM对应片段不明确');t.clips.splice(index,1,...changedRanges(t.clips[index],s.operation,h));
    const actual=after.content.tracks.find(t=>t.track_id===id);check(key,id===track.track_id?'目标声音时间和源区间正确':'BGM操作反向联动对应视频',matchClips(t.clips,actual?.clips),{expected:t.clips.map(clean),actual:actual?.clips.map(clean)});}
   check(key,'非目标轨及声音保持不被误联动',sameTrackContents(before,after,targets),{before:businessTracks(before).filter(t=>!targets.includes(t.track_id)),after:businessTracks(after).filter(t=>!targets.includes(t.track_id))});
   const targetBefore=track.clips.filter((_,i)=>i!==e.target.index).map(clean),actual=after.content.tracks.find(t=>t.track_id===track.track_id);
   check(key,'目标同轨其余片段保持',targetBefore.every(c=>actual.clips.some(a=>JSON.stringify(clean(a))===JSON.stringify(c))),targetBefore);
   await shot(key,e.failures.length?'failure':'operation-verified');e.operationResultVerifiedAt=new Date().toISOString();await save();
   const playStart=s.operation==='split'?Math.max(start,h-1):s.operation==='move'?start+1.2:s.operation==='trim-head'?start+.7:Math.max(start+.2,start+d-1.5);
   await this.isolatePlayback(key,after,track.track_id,playStart,s.operation==='split'?h+1:Math.min(playStart+1.2,start+d-(s.operation==='trim-tail'?.5:0)));
   await base.verifyCrossPreviewMapping(key,after,Math.max(start+.7,s.operation==='move'?start+1.5:start+.7));
   await base.restoreAndPersist(key,before,after);return base.finishVariant(key);
  },
  async recoverCrossNoChange(key){
   const e=state.cases[key];assert.ok(e?.editIntent&&e.target&&!e.crossNoChangeRecoveryAt&&!e.destinationTrackId&&spec(key).operation==='cross-bgm','Only an observed unchanged cross gesture may be rechecked once');
   const fs=await import('node:fs/promises'),path=await import('node:path'),before=JSON.parse(await fs.readFile(path.join(base.artifactDir(key),'operation-before.json'),'utf8'));assert.deepEqual(businessTracks(await project(key)),businessTracks(before),'First gesture changed the project; inspect instead of repeating');
   e.crossNoChangeRecoveryAt=new Date().toISOString();e.observerAdjustments??=[];e.observerAdjustments.push({reason:'首个跨轨手势未改变工程，命中为BGM主体；保留原观察后用无修饰键、纯纵向移到更深空白区域复核，横向位置保持。'});await save();return this.crossBgm(key,before);
  },
  async crossBgm(key,observedBefore){
   const e=state.cases[key];let before,track,clip;
   if(observedBefore){before=observedBefore;track=before.content.tracks.find(t=>t.track_id===e.target.trackId);clip=track.clips[e.target.index];}
   else({before,track,clip}=await base.begin(key));
   await base.seek(key,clip.timeline_start_sec+1);await base.expanded();const selector=await base.clipSelector(track.track_id,clip),layout=await page.evaluate(sel=>({clip:document.querySelector(sel).getBoundingClientRect().toJSON(),last:[...document.querySelectorAll('.ed-track-row')].at(-1).getBoundingClientRect().toJSON(),scroll:document.querySelector('.ed-timeline-scroll').getBoundingClientRect().toJSON()}),selector),x=layout.clip.x+Math.min(70,layout.clip.width*.37),y=layout.clip.bottom-5,toY=layout.last.bottom+60;
   assert.ok(toY<layout.scroll.bottom-15,'Need visible blank audio drop area');const hit=await page.evaluate(({x,y,sel})=>document.elementFromPoint(x,y)?.closest('.ed-timeline-clip')===document.querySelector(sel),{x,y,sel:selector});assert.ok(hit,'Pointer must hit actual BGM body');
   e.verticalCrossIntent=new Date().toISOString();await write(key,'vertical-cross-pointer',{x,y,toY,modifier:'none',hit});await save();await page.keyboard.press('Escape');await page.mouse.move(x,y);await page.mouse.down();try{await page.mouse.move(x,y+9);await page.mouse.move(x,toY,{label:'将原生BGM纯纵向移入空音频区域'});await shot(key,'cross-drag-preview');}finally{await page.mouse.up();}
   const cross=await waitContent(key,before);await write(key,'cross-after',cross);
   if(JSON.stringify(businessTracks(cross))===JSON.stringify(businessTracks(before))){
    check(key,'BGM跨轨形成新的音频轨',false,{beforeRows:before.content.tracks.length,afterRows:cross.content.tracks.length,pointer:{x,y,toY}});e.unexecuted=['换轨后平移及视频关联核验','跨轨撤销重做（实际未发生编辑）'];await write(key,'operation-after',cross);await save();await shot(key,'cross-failure');await base.persist(key,cross,'cross-not-applied-reopened');return base.finishVariant(key);
   }
   const matches=cross.content.tracks.flatMap(t=>t.clips.map(c=>({track:t,clip:c}))).filter(x=>x.clip.clip_id===clip.clip_id||(x.clip.file_id===clip.file_id&&near(x.clip.timeline_start_sec,clip.timeline_start_sec)&&near(x.clip.source_in_sec,clip.source_in_sec)&&near(x.clip.source_out_sec,clip.source_out_sec)));assert.equal(matches.length,1,'Identify one actual BGM instance by source and range, allowing rebuilt IDs');const moved=matches[0];e.destinationTrackId=moved.track.track_id;
   const crossUI=await base.readUI(key);e.crossUI=crossUI;const destinationName=crossUI.rows.find(r=>r.track===moved.track.track_id)?.name;
   const beforeOrder=e.beforeUI.rows.filter(r=>r.track!==track.track_id).map(r=>r.name),afterOrder=crossUI.rows.filter(r=>r.track!==track.track_id&&r.track!==moved.track.track_id).map(r=>r.name);
   check(key,'BGM换轨保持其他行顺序',JSON.stringify(beforeOrder)===JSON.stringify(afterOrder),{beforeOrder,afterOrder});
   check(key,'BGM移入新音频轨且角色保持',moved.track.type==='audio'&&/背景音乐|BGM/i.test(destinationName||'')&&moved.track.track_id!==track.track_id&&!before.content.tracks.some(t=>t.track_id===moved.track.track_id),{type:moved.track.type,visibleName:destinationName});
   check(key,'跨轨BGM源范围和时间保持',JSON.stringify(clean(clip))===JSON.stringify(clean(moved.clip)),{before:clean(clip),after:clean(moved.clip)});
   check(key,'BGM换轨不改变视频和其他声音',sameTrackContents(before,cross,[track.track_id],[track.track_id,moved.track.track_id]),null);
   const left=cross.content.tracks.find(t=>t.track_id===track.track_id);check(key,'源轨其余片段保留且目标无重复',JSON.stringify((left?.clips||[]).map(clean))===JSON.stringify(track.clips.filter(c=>c.clip_id!==clip.clip_id).map(clean)),null);
   await save();await shot(key,e.failures.length?'cross-failure':'cross-verified');await base.historyStep(key,'撤销',before,'undo-cross');await base.historyStep(key,'重做',cross,'redo-cross');await base.persist(key,cross,'cross-refreshed');
   const beforeMove=await project(key),destination=beforeMove.content.tracks.find(t=>t.track_id===moved.track.track_id),newClip=destination.clips[0];
   const currentVideo=beforeMove.content.tracks.filter(t=>t.type==='video'&&t.clips.length);assert.equal(currentVideo.length,1,'BGM cross-track fixture must still have one unambiguous source video');e.videoTrackId=currentVideo[0].track_id;
   e.followupMoveIntent=new Date().toISOString();await write(key,'followup-move-before',beforeMove);await save();await base.seek(key,newClip.timeline_start_sec+1);await base.gesture(key,destination.track_id,newClip,{delta:1});
   const after=await waitContent(key,beforeMove);await write(key,'operation-after',after);assert.notDeepEqual(businessTracks(beforeMove),businessTracks(after),'换轨后平移未发生内容变化');
   for(const id of [destination.track_id,e.videoTrackId]){const original=beforeMove.content.tracks.find(t=>t.track_id===id),result=after.content.tracks.find(t=>t.track_id===id),expect=original.clips.map(c=>({...c,timeline_start_sec:c.timeline_start_sec+1}));check(key,id===destination.track_id?'换轨BGM继续平移一秒':'BGM换轨后仍反向带动视频',matchClips(expect,result?.clips),{expected:expect.map(clean),actual:result?.clips.map(clean)});}
   check(key,'换轨后BGM平移不改变非关联轨',sameTrackContents(beforeMove,after,[destination.track_id,e.videoTrackId]),null);e.operationResultVerifiedAt=new Date().toISOString();await save();
   await this.isolatePlayback(key,after,destination.track_id,newClip.timeline_start_sec+1.5,newClip.timeline_start_sec+2.7);await base.verifyCrossPreviewMapping(key,after,newClip.timeline_start_sec+1.5);
   await base.restoreAndPersist(key,beforeMove,after);return base.finishVariant(key);
  },
  async drive(key){
   const e=state.cases[key];if(!e)return this.start(key);
   if(['Executed','Prerequisite failed','Unsupported'].includes(e.stage))return{key,status:e.status};
   if(!terminal(e.runStatus))return this.observe(key);
   if(e.runStatus!=='done'){e.stage='Prerequisite failed';e.status=e.runError?.code==='insufficient_credits'?'Blocked':'Failed';e.unexecuted=['原生准备及目标编辑'];e.failures.push('原生准备未完成：'+e.runStatus);await save();await shot(key,'failure');return{key,status:e.status,error:e.runError};}
   if(e.stage!=='Ready'&&!e.editIntent)await this.prepare(key);
   if(e.stage!=='Ready')return{key,status:e.status};assert.ok(!e.editIntent,'已有目标操作意图，先观察原结果，不重放');
   return spec(key).operation==='cross-bgm'?this.crossBgm(key):this.audioOperation(key);
  },
 };
 return ctx;
}
