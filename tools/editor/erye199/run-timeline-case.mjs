// Complete case entry; browser/project/fixtures are explicit prerequisites, never guessed.
import fs from'node:fs/promises';import path from'node:path';import{spawnSync}from'node:child_process';import{fileURLToPath}from'node:url';
const opts={};for(let i=2;i<process.argv.length;i+=2)opts[process.argv[i].slice(2)]=process.argv[i+1];
if(!['081','082','083','084','085'].includes(opts.case)||!opts.report||!/^\d+$/.test(opts.space||''))throw Error('--case 081..085 --space actual-id --report batch-dir required');
const out=path.resolve(opts.report),worker=fileURLToPath(new URL('./run-timeline-operations.mjs',import.meta.url));
const read=async()=>JSON.parse(await fs.readFile(path.join(out,'execution.json'),'utf8'));
function run(script,args){const r=spawnSync(process.execPath,[script,...args],{stdio:'inherit',windowsHide:true});if(r.status!==0)throw Error('Stopped at original checkpoint; inspect before resuming');}
const common=['--space',opts.space,'--report',out];
async function summary(){const s=await read(),entries=Object.entries(s.cases).filter(([k])=>k.startsWith(opts.case+'-'));const status=entries.some(([,e])=>e.status==='Failed')?'Failed':entries.some(([,e])=>e.status==='Blocked')?'Blocked':'Passed';console.log({case:opts.case,completed:true,status,variants:entries.map(([key,e])=>({key,status:e.status}))});return status==='Passed'?0:1;}
if(['083','084','085'].includes(opts.case)){run(fileURLToPath(new URL('./run-timeline-matrix.mjs',import.meta.url)),['--case',opts.case,...common]);process.exit(await summary());}
function action(key,name,extra=[]){run(worker,['--variant',key,'--action',name,...common,...extra]);}
async function wait(key){for(let i=0;i<100;i++){const e=(await read()).cases[key];if(['done','failed','cancelled','canceled','terminated'].includes(e?.runStatus))return e;if(e?.runStatus&&!['running','queued','assigned','confirmation_approved'].includes(e.runStatus))throw Error('Continue clarification in original task: '+e.runStatus);action(key,'wait');}throw Error('Original run still active; keep checkpoint');}
if(opts.case==='081'){
 let e=(await read()).cases['081-T1'];if(e?.stage==='Executed'){const finalized=e.musicPersistVerifiedAt||(e.checks?.some(c=>c.name==='native-BGM-redo')&&e.checks?.some(c=>c.name==='failure-after-reopen'));if(!finalized)throw Error('Movement already executed; continue original finalizeMusic stage without resubmitting or moving again');console.log({case:'081',status:e.status,alreadyExecuted:true});process.exit(e.status==='Passed'?0:1);}
 if(!e)action('081-T1','start');e=await wait('081-T1');if(e.runStatus!=='done')throw Error('Native prerequisite failed; no dependent edits');
 if(!e.baseline)action('081-T1','baseline');
 for(const kind of ['D','B']){
  e=(await read()).cases['081-T1'];if(!e.audio?.[kind])action('081-T1','importAudio',['--media',kind]);e=(await read()).cases['081-T1'];
  if(!e.audio[kind].placed){if(e.audio[kind].placementIntent)throw Error('Placement already attempted, inspect rather than add twice');action('081-T1','placeAudio',['--media',kind]);}
 }
 action('081-T1','edit');action('081-T1','finalizeMusic');
}else{
 let s=await read();if(['082-S1','082-T1'].every(k=>s.cases[k]?.stage==='Executed')){console.log({case:'082',alreadyExecuted:true,statuses:['082-S1','082-T1'].map(k=>s.cases[k].status)});process.exit(await summary());}
 if(!s.cases['082-S1'])action('082-S1','start');let e=await wait('082-S1');if(e.runStatus!=='done')throw Error('S1 prerequisite failed; do not start T1');if(!e.baseline)action('082-S1','baseline');
 s=await read();if(!s.cases['082-T1'])action('082-T1','followup');e=(await read()).cases['082-T1'];
 if(!e.submittedAt){if(!e.uploadTriggered)action('082-T1','upload');e=(await read()).cases['082-T1'];if(e.stage!=='Uploaded')throw Error('Original upload unresolved; inspect rather than repeat');action('082-T1','submitFollowup');}
 e=await wait('082-T1');if(e.runStatus!=='done')throw Error('T1 prerequisite failed; preserve original run');if(!e.baseline)action('082-T1','baseline');action('082-T1','history');
}
process.exitCode=await summary();
