import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL}from'node:url';import{spawnSync}from'node:child_process';
import{audioCrossPlan}from'./audio-cross-track.mjs';
const opts={};for(let i=2;i<process.argv.length;i+=2){if(!process.argv[i].startsWith('--')||!process.argv[i+1])throw Error('--key value required');opts[process.argv[i].slice(2)]=process.argv[i+1];}
if(!opts.report||!/^\d+$/.test(opts.space||''))throw Error('Need report and existing space');
const report=path.resolve(opts.report),receipt=JSON.parse(await fs.readFile(path.join(report,'task.json'),'utf8'));if(receipt.spaceId!==Number(opts.space)||!/^p\d+$/.test(receipt.page))throw Error('Task receipt mismatch');
const actions=['start','open','configure','upload','submit','observe','wait','review','resume','inspect','prepare','drive','audioEdit','cross','readUI','supplementPreview'];
async function runAction(key,action){
 if(!audioCrossPlan.some(x=>x.key===key)||!actions.includes(action))throw Error('Unknown variant/action');
 const dir=path.join(report,'browser');await fs.mkdir(dir,{recursive:true});const f=path.join(dir,'action-'+Date.now()+'.mjs');
 await fs.writeFile(f,`const task=await taskSpace(${Number(opts.space)}),page=task.page(${JSON.stringify(receipt.page)});const{audioCrossContext}=await import('${new URL('./audio-cross-track.mjs',import.meta.url).href}');const ctx=await audioCrossContext(page,${JSON.stringify({outDir:report,baseURL:'https://app.cinlink.ai',spaceId:Number(opts.space)})});console.log(await ctx.${action}(${JSON.stringify(key)}));`,'utf8');
 const r=spawnSync('ego-browser',['nodejs','-e',`await import('${pathToFileURL(f).href}')`],{stdio:'inherit',windowsHide:true});if(r.error)throw r.error;if(r.status!==0)throw Error('Inspect original checkpoint: '+key+'/'+action);
}
if(opts.variant)await runAction(opts.variant,opts.action);
else{
 if(opts.case&&!['086','087','088','089','090'].includes(opts.case))throw Error('Unknown case');
 const all=audioCrossPlan.filter(x=>!opts.case||x.caseId===opts.case),start=opts.from?all.findIndex(x=>x.key===opts.from):0;if(start<0)throw Error('Unknown --from');
 const entry=async key=>JSON.parse(await fs.readFile(path.join(report,'execution.json'),'utf8')).cases[key];
 for(const {key}of all.slice(start)){
  let e=await entry(key);if(['Executed','Prerequisite failed','Unsupported'].includes(e?.stage)){console.log('ALREADY',key,e.status);continue;}
  if(!e)await runAction(key,'start');
  for(let poll=0;poll<100;poll++){
   e=await entry(key);if(['done','failed','cancelled','canceled','terminated'].includes(e.runStatus))break;
   if(e.runStatus==='waiting_for_confirmation'&&['C','H'].includes(e.profile)){if(!e.reviewConfirmedAt)await runAction(key,'review');}
   else if(e.runStatus&&!['running','queued','assigned','confirmation_approved'].includes(e.runStatus))throw Error('Original task needs clarification/inspection: '+key+' '+e.runStatus);
   await runAction(key,'wait');
  }
  await runAction(key,'drive');e=await entry(key);if(!['Executed','Prerequisite failed','Unsupported'].includes(e.stage))throw Error('Incomplete variant: '+key+' '+e.stage);console.log('COMPLETED',key,e.status,JSON.stringify(e.failures||[]));if(e.status==='Blocked')throw Error('Environment blocked; stop consuming native preparations');
 }
 console.log('Requested native matrix completed; archive results separately.');
}
