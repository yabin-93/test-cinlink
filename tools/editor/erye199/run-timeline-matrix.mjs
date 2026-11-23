// Serial native execution only. Stops on an automation/ownership error; never retries requests.
import fs from'node:fs/promises';import path from'node:path';import{spawnSync}from'node:child_process';import{fileURLToPath}from'node:url';import{timelinePlan}from'./timeline-operations.mjs';
const opts={};for(let i=2;i<process.argv.length;i+=2)opts[process.argv[i].slice(2)]=process.argv[i+1];
if(!opts.report||!/^\d+$/.test(opts.space||''))throw Error('--report and existing --space required');
const report=path.resolve(opts.report),worker=fileURLToPath(new URL('./run-timeline-operations.mjs',import.meta.url));
if(opts.case&&!['083','084','085'].includes(opts.case))throw Error('--case supports 083/084/085');
const allKeys=timelinePlan.filter(x=>['083','084','085'].includes(x.caseId)&&(!opts.case||x.caseId===opts.case)).map(x=>x.key),start=opts.from?allKeys.indexOf(opts.from):0;if(start<0)throw Error('Unknown --from variant');const keys=allKeys.slice(start);
async function entry(key){return JSON.parse(await fs.readFile(path.join(report,'execution.json'),'utf8')).cases[key];}
function action(key,name){const result=spawnSync(process.execPath,[worker,'--variant',key,'--action',name,'--space',opts.space,'--report',report],{stdio:'inherit',windowsHide:true});if(result.status!==0)throw Error('Stopped; inspect original checkpoint before continuing: '+key+'/'+name);}
for(const key of keys){
 let e=await entry(key);if(['Executed','Prerequisite failed'].includes(e?.stage)){console.log('ALREADY '+key+' '+e.status);continue;}
 if(!e)action(key,'start');
 for(let polls=0;polls<100;polls++){
  e=await entry(key);if(['done','failed','cancelled','canceled','terminated'].includes(e?.runStatus))break;
  if(e?.runStatus==='waiting_for_confirmation'&&['C','H'].includes(key.split('-')[1])){if(!e.reviewConfirmedAt)action(key,'review');}
  else if(e?.runStatus&&!['running','queued','assigned','confirmation_approved'].includes(e.runStatus))throw Error('Needs inspection/clarification in original task: '+key+' '+e.runStatus);
  action(key,'wait');
 }
 action(key,'drive');e=await entry(key);
 if(!['Executed','Prerequisite failed'].includes(e.stage))throw Error('Variant not complete: '+key+' '+e.stage);
 console.log('COMPLETED '+key+' '+e.status+' '+JSON.stringify(e.failures||[]));
 if(e.status==='Blocked')throw Error('Environment prerequisite blocked; stop generation rather than consume more tasks');
}
console.log('MATRIX COMPLETED; archive real results separately.');
