import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { sha256 } from './core.mjs';
export async function extendCurrentMedia(config,items){
  const selected=new Set(config.cases||[]),dir=path.join(config.outDir,'media');
  async function item(key,file,kind,mime,{upload=true}={}){
    items[key]={path:file,name:path.basename(file),kind,mime,sha256:sha256(await fs.readFile(file)),upload};
  }
  if(selected.has('013')||selected.has('053')){
    const file=path.join(dir,'fixed.srt');
    await fs.writeFile(file,'1\n00:00:01,000 --> 00:00:03,000\nFixed A\n\n2\n00:00:06,000 --> 00:00:08,000\nFixed B\n');
    await item('fixed',file,'subtitle','application/x-subrip');
    if(selected.has('053')){
      await fs.writeFile(path.join(dir,'empty.srt'),'');
      await fs.writeFile(path.join(dir,'broken.srt'),'1\nnot-a-timestamp\nBAD053\n');
    }
  }
  if(selected.has('011')||selected.has('055')){
    const file=path.join(dir,'music13.wav');
    execFileSync(config.ffmpeg||'ffmpeg',['-v','error','-nostdin','-y','-f','lavfi','-i','sine=frequency=220:sample_rate=48000:duration=13','-c:a','pcm_s16le',file],{encoding:'utf8',timeout:30000});
    await item('music',file,'audio','audio/wav');
  }
  if(selected.has('052')){
    for(const [key,source,folder]of [['sameA','video','same-A'],['sameB','videoB','same-B']]){
      const file=path.join(dir,folder,'same.mp4');await fs.mkdir(path.dirname(file),{recursive:true});await fs.copyFile(items[source].path,file);
      await item(key,file,'video','video/mp4',{upload:key==='sameA'});
    }
  }
  return items;
}
