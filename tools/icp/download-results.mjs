import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
export async function downloadResults(ctx,id,index){
 const entry=ctx.state.cases[id],step=entry?.steps.find(s=>s.index===index);if(!step?.runId)throw Error('必须先核对本轮实际受理run');
 const run=await ctx.api('/runtime-api/v2/agent/runs/'+step.runId);if(run.conversation_id&&run.conversation_id!==entry.conversationId)throw Error('任务会话不匹配');
 const inputs=new Set((run.related_files||[]).map(f=>f.file_id));for(const m of run.messages||[])if(m.role==='user')for(const f of m.files||[])inputs.add(f.file_id);
 let partialExports=[];
 if(run.status!=='done'){
  const messages=await ctx.api('/runtime-api/v1/conversations/'+entry.conversationId+'/messages?limit=200');
  partialExports=(messages.messages||[]).filter(m=>m.role==='assistant'&&m.run_id===step.runId).flatMap(m=>(Array.isArray(m.plan)?m.plan:[]).filter(n=>n.status==='done'&&n.step==='editor_export').flatMap(n=>n.result_files||[]));
 }
 const candidates=[...(run.result_files||[]),...(run.messages||[]).filter(m=>m.role==='assistant').flatMap(m=>[...(m.result_files||[]),...(m.files||[])]),...partialExports];
 const unique=[...new Map(candidates.filter(f=>f.file_id&&!inputs.has(f.file_id)).map(f=>[f.file_id,f])).values()],dir=path.join(ctx.state.reportDirectory||ctx.outputDirectory,id,'step-'+index+'-results');await fs.mkdir(dir,{recursive:true});const manifest=[];
 let cached=[];try{cached=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8')).files||[];}catch(e){if(e.code!=='ENOENT')throw e;}
 for(const [i,f] of unique.entries()){
  const previous=cached.find(x=>x.fileId===f.file_id);
  if(previous&&path.dirname(path.resolve(previous.path))===path.resolve(dir)){
   try{const bytes=await fs.readFile(previous.path);if(bytes.length===previous.bytes&&crypto.createHash('sha256').update(bytes).digest('hex')===previous.sha256){manifest.push(previous);continue;}}catch(e){if(e.code!=='ENOENT')throw e;}
  }
  const signed=await ctx.api('/cloud-tool-api/v1/agent/files/'+encodeURIComponent(f.file_id)+'/url?disposition=attachment');if(signed.file_id&&signed.file_id!==f.file_id)throw Error('下载身份不一致');
  const name=String(signed.filename||f.name||f.file_id).replace(/[\\/:*?"<>|]/g,'_');const file=path.join(dir,String(i+1).padStart(2,'0')+'-'+name);
  // The signed binary URL requires no browser session. Stream it to a temporary
  // file so a transport timeout cannot be mistaken for a complete artifact.
  try{const r=await fetch(signed.url,{signal:AbortSignal.timeout(120000)});if(!r.ok)throw Error('HTTP '+r.status);if(!r.body)throw Error('响应体为空');await pipeline(Readable.fromWeb(r.body),createWriteStream(file+'.part'));await fs.rename(file+'.part',file);}catch(e){throw Error('产物下载未完成：'+(e.cause?.code||e.name)+(String(e.message).startsWith('HTTP ')?' '+e.message:''));}
  const bytes=await fs.readFile(file);if(signed.size_bytes&&bytes.length!==signed.size_bytes)throw Error('产物下载不完整');manifest.push({fileId:f.file_id,name,path:file,bytes:bytes.length,mime:signed.mime_type||f.mime_type,kind:f.kind,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
 }
 await fs.writeFile(path.join(dir,'manifest.json'),JSON.stringify({runId:step.runId,status:run.status,files:manifest},null,2));return manifest;
}
