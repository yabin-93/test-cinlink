import fs from'node:fs/promises';import path from'node:path';import{pathToFileURL}from'node:url';import{spawnSync}from'node:child_process';
import{nativeAudioPlan}from'./native-audio-operations.mjs';
const opts={};for(let i=2;i<process.argv.length;i+=2){if(!process.argv[i].startsWith('--')||!process.argv[i+1])throw Error('--key value required');opts[process.argv[i].slice(2)]=process.argv[i+1];}
if(opts.list){console.log(JSON.stringify(nativeAudioPlan,null,2));process.exit(0);}
if(!opts.report||!/^\d+$/.test(opts.space||''))throw Error('Need existing report and TaskSpace');
const report=path.resolve(opts.report),receipt=JSON.parse(await fs.readFile(path.join(report,'task.json'),'utf8'));if(receipt.spaceId!==Number(opts.space)||!/^p\d+$/.test(receipt.page))throw Error('Task receipt mismatch');
const allowed=['start','open','configure','upload','submit','observe','wait','review','resume','inspect','prepare','drive','readUI','resumeSelected','restartCredits','recoverBaselinePlayback','recoverAfterPlayback','recoverTailSeek','recoverMutePreparation','confirmImportedAudio','recoverCrossNoChange','resumeSourcePlayback'];
async function action(key,method){
 if(!nativeAudioPlan.some(x=>x.key===key)||!allowed.includes(method))throw Error('Unknown action or variant');
 const dir=path.join(report,'browser');await fs.mkdir(dir,{recursive:true});const filename=path.join(dir,'native-audio-action-'+Date.now()+'.mjs');
 await fs.writeFile(filename,`const task=await taskSpace(${Number(opts.space)}),page=task.page(${JSON.stringify(receipt.page)});const{nativeAudioContext}=await import('${new URL('./native-audio-operations.mjs',import.meta.url).href}');const ctx=await nativeAudioContext(page,${JSON.stringify({outDir:report,baseURL:'https://app.cinlink.ai',spaceId:Number(opts.space),...(opts.reason?{recoveryReason:opts.reason}:{})})});console.log(await ctx.${method}(${JSON.stringify(key)}));`,'utf8');
 const r=spawnSync('ego-browser',['nodejs','-e',`await import('${pathToFileURL(filename).href}')`],{stdio:'inherit',windowsHide:true});if(r.error)throw r.error;if(r.status!==0)throw Error('Inspect original checkpoint before continuing: '+key+'/'+method);
}
if(opts.variant)await action(opts.variant,opts.action);
else{
 const all=nativeAudioPlan.filter(s=>!opts.case||s.caseId===opts.case);if(!all.length)throw Error('Unknown case');const start=opts.from?all.findIndex(s=>s.key===opts.from):0;if(start<0)throw Error('Unknown from');
 const entry=async k=>JSON.parse(await fs.readFile(path.join(report,'execution.json'),'utf8')).cases[k];
 for(const {key}of all.slice(start)){
  let e=await entry(key);if(['Executed','Prerequisite failed','Unsupported'].includes(e?.stage)){console.log('ALREADY',key,e.status);continue;}
  if(!e)await action(key,'start');
  for(let p=0;p<100;p++){
   e=await entry(key);if(['done','failed','cancelled','canceled','terminated'].includes(e.runStatus))break;
   if(e.runStatus==='waiting_for_confirmation'&&['C','H'].includes(e.profile)){if(!e.reviewConfirmedAt)await action(key,'review');}
   else if(e.runStatus&&!['running','queued','assigned','confirmation_approved'].includes(e.runStatus))throw Error('Original task needs clarification: '+key+' '+e.runStatus);
   await action(key,'wait');
  }
  await action(key,'drive');e=await entry(key);if(!['Executed','Prerequisite failed','Unsupported'].includes(e.stage))throw Error('Incomplete variant '+key+' '+e.stage);console.log('COMPLETED',key,e.status,JSON.stringify(e.failures));if(e.status==='Blocked')throw Error('Prerequisite blocked; stop further paid preparations');
 }
 console.log('Requested native audio matrix completed; archive separately.');
}
