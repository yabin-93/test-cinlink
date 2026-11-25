import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export async function downloadChunks(page,url,destination,total,expectedHash){
  if(!Number.isSafeInteger(total)||total<=0)throw Error('分块下载需要明确总长度');
  const folder=destination+'.parts';await fs.mkdir(folder,{recursive:true});
  const chunkSize=8*1024*1024,parts=[];
  for(let start=0;start<total;start+=chunkSize)parts.push({start,end:Math.min(start+chunkSize,total)-1,path:folder+'/'+String(parts.length).padStart(3,'0')+'.bin'});
  for(let i=0;i<parts.length;i+=2){
    const batch=parts.slice(i,i+2);
    const results=await Promise.allSettled(batch.map(async part=>{
      try {const stat=await fs.stat(part.path);if(stat.size===part.end-part.start+1)return;}catch(error){if(error.code!=='ENOENT')throw error;}
      const response=await page.fetch(url,{headers:{Range:`bytes=${part.start}-${part.end}`},saveAs:part.path,timeout:60000});
      if(response.status!==206)throw Error('分块请求未返回206：'+response.status);
      if((await fs.stat(part.path)).size!==part.end-part.start+1)throw Error('分块字节数不匹配');
    }));
    const errors=results.filter(x=>x.status==='rejected').map(x=>String(x.reason));
    if(errors.length)throw Error(errors.join('\n'));
    console.log({downloadedParts:Math.min(i+2,parts.length),totalParts:parts.length});
  }
  const output=await fs.open(destination,'w');
  try {for(const part of parts){const bytes=await fs.readFile(part.path);await output.write(bytes,0,bytes.length,part.start);}}finally{await output.close();}
  const bytes=await fs.readFile(destination),hash=crypto.createHash('sha256').update(bytes).digest('hex');
  if(bytes.length!==total||expectedHash&&hash!==expectedHash)throw Error('拼接文件总长度或SHA不匹配');
  return {bytes:bytes.length,sha256:hash};
}
