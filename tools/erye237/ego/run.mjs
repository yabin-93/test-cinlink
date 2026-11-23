#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const args=process.argv.slice(2),get=(k,d)=>args.includes(k)?args[args.indexOf(k)+1]:d;
if(args.includes('--help')||!get('--config')){console.log('npm run test:erye237 -- --config /absolute/config.json [--prepare | --case 001 | --all]\nUses ego-browser existing logged-in TaskSpace. No browser launch, no task retry. Resume using the same config/output directory.');process.exit(args.includes('--help')?0:2);}
const config=path.resolve(get('--config')),cfg=JSON.parse(await fs.readFile(config,'utf8'));if(!Number.isInteger(cfg.taskSpace)||!path.isAbsolute(cfg.outputDir)||cfg.baseURL!=='https://app.cinlink.ai/')throw Error('Explicit production URL, absolute outputDir and existing numeric TaskSpace required');
const moduleFile=path.join(root,'tools/erye237/ego/suite.mjs');
async function invoke(id){const code=`const t=await taskSpace(${cfg.taskSpace});const mod=await import(${JSON.stringify(moduleFile)});await mod.run(t,${JSON.stringify(config)},${JSON.stringify(id)});`;
 return await new Promise((resolve,reject)=>{const p=spawn(cfg.egoBinary??'ego-browser',['nodejs'],{stdio:['pipe','inherit','inherit']});p.stdin.end(code);p.on('error',reject);p.on('exit',code=>resolve(code));});}
if(args.includes('--prepare'))process.exit(await invoke('prepare'));
const ids=args.includes('--all')?['001','002','003','004','005','006','007','009','010','008']:[get('--case','001').replace(/^ERYE(?:-)?237-?/,'').padStart(3,'0')];
let unsuccessful=false;
for(const id of ids){let attempts=0;
 while(true){const code=await invoke(id);if(code!==0){console.error('Browser runner stopped; do not create another space or resend a task.');process.exit(code??2);}
 const s=JSON.parse(await fs.readFile(path.join(cfg.outputDir,id+'-state.json'),'utf8'));
 if(s.status==='Pending'){if(++attempts>40){console.error(id+' still pending; resume later with same config.');process.exit(2);}continue;}
 console.log(`ERYE237-${id}: ${s.status} — ${s.message??''}`);if(s.status!=='Passed')unsuccessful=true;
 if(s.inFlight){console.error('In-flight task retained; resolve it before proceeding.');process.exit(2);}break;
 }}
process.exit(unsuccessful?1:0);
