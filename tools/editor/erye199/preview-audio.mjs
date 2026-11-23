import fs from 'node:fs/promises';
import path from 'node:path';
import { Blocked } from './core.mjs';
// Passive tee of the existing preview mix. The original destination and gains
// remain in place; no editor command or replacement media is introduced.
export const audioObserverSource="(()=>{if(window.__qaAudioObserver)return;window.__qaAudioObserver=true;const original=AudioNode.prototype.connect;const taps=new Map();window.__qaAudioTaps=[];AudioNode.prototype.connect=function(destination,...args){const result=original.call(this,destination,...args);if(destination instanceof AudioDestinationNode){let tap=taps.get(this.context);if(!tap){tap=this.context.createMediaStreamDestination();taps.set(this.context,tap);window.__qaAudioTaps.push(tap);}original.call(this,tap);}return result;};})();";
export async function capturePreviewAudio(ctx,start,end,name){
  await ctx.seek(start);
  let count=await ctx.page.evaluate(()=>window.__qaAudioTaps?.length||0);
  if(!count){
    await ctx.page.click('button[aria-label="预览播放"]');
    await ctx.page.waitForFunction(()=>window.__qaAudioTaps?.length>0,undefined,{timeout:10000});
    await ctx.page.click('button[aria-label="预览暂停"]');
    await ctx.seek(start);
  }
  const init=await ctx.page.evaluate(()=>{
    const taps=window.__qaAudioTaps||[];
    if(taps.length!==1)return{taps:taps.length,error:'混音输出流不唯一'};
    const tracks=taps[0].stream.getAudioTracks(),recorder=new MediaRecorder(new MediaStream(tracks),{mimeType:'audio/webm;codecs=opus'});
    const state=window.__qaPreviewRecording={recorder,chunks:[],stopped:false};
    recorder.ondataavailable=e=>state.chunks.push(e.data);
    recorder.onstop=()=>{state.stopped=true;};
    recorder.start();return{taps:taps.length,tracks:tracks.length};
  });
  if(init.error)throw new Blocked(init.error);
  await ctx.page.click('button[aria-label="预览播放"]');
  await ctx.page.waitForFunction(t=>Number(document.querySelector('input[aria-label="预览播放进度"]').value)>=t,end,{timeout:15000});
  await ctx.page.click('button[aria-label="预览暂停"]');
  await ctx.page.evaluate(()=>window.__qaPreviewRecording.recorder.stop());
  await ctx.page.waitForFunction(()=>window.__qaPreviewRecording.stopped,undefined,{timeout:5000});
  const data=await ctx.page.evaluate(async()=>{
    const blob=new Blob(window.__qaPreviewRecording.chunks,{type:'audio/webm'});
    return new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob);});
  });
  await fs.writeFile(path.join(ctx.config.outDir,ctx.caseId,name+'.webm'),Buffer.from(data,'base64'));
  await ctx.write(name,{start,end,method:'existing-preview-mix-passive-tee',...init});
}
