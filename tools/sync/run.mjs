import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const args=process.argv.slice(2),options={};
for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||!args[i+1])throw Error('参数格式为--key value');options[args[i].slice(2)]=args[i+1];}
const id=options.case,action=options.action;
if(!/^SYNC-00[1-6]$/.test(id||''))throw Error('仅支持SYNC-001～006');
if(!['prepare','upload','uploads','register','submit','observe','download','artifacts','shot','resume','confirm'].includes(action))throw Error('不支持的action');
if(!/^\d+$/.test(options.space||'')||!options.report)throw Error('必须指定已有space与report目录');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.resolve(options.report);await fs.mkdir(out,{recursive:true});
const conf={id,action,root,out,space:Number(options.space),round:Number(options.round||1),wait:Number(options['wait-ms']||0)};
if(![1,2].includes(conf.round)||conf.wait<0||conf.wait>45000)throw Error('round为1或2，wait-ms不超过45000');
const worker=path.join(out,'browser',`action-${Date.now()}.mjs`);await fs.mkdir(path.dirname(worker),{recursive:true});
await fs.writeFile(worker,`const c=${JSON.stringify(conf)};const task=await taskSpace(c.space),page=task.page('p1');const {context}=await import(${JSON.stringify(pathToFileURL(path.join(root,'tools/sync/driver.mjs')).href)});const ctx=await context(page,c.root,c.out);let result;if(c.action==='prepare')result=await ctx.prepare(c.id);if(c.action==='resume')result=await ctx.resume(c.id);if(c.action==='confirm')result=await ctx.confirm(c.id);if(c.action==='upload')result=await ctx.upload(c.id);if(c.action==='uploads')result=await ctx.collectUploads(c.id);if(c.action==='register')result=await ctx.register(c.id);if(c.action==='submit')result=await ctx.submit(c.id,c.round);if(c.action==='download')result=await ctx.download(c.id,c.round);if(c.action==='artifacts')result=await ctx.artifacts(c.id,c.round);if(c.action==='shot')result={snapshot:(await ctx.shot(c.id,'manual-observation-'+Date.now())).slice(-10000)};if(c.action==='observe'){const end=Date.now()+c.wait;do{result=await ctx.observe(c.id);if(!['assigned','running','queued','Acceptance not yet observed'].includes(result.status)||Date.now()>=end)break;await new Promise(r=>setTimeout(r,Math.min(5000,end-Date.now())));}while(true);}if(result?.plan)result={...result,plan:undefined};console.log(result);console.log((await page.snapshot({scope:'full_page'})).split('container \"编辑区\"')[0].slice(-12000));`,'utf8');
const cli=options.ego||process.env.EGO_BROWSER_CLI||'ego-browser';
const result=spawnSync(cli,['nodejs','-e',`await import('${pathToFileURL(worker).href}')`],{stdio:'inherit',windowsHide:true});
if(result.error)throw result.error;process.exitCode=result.status??1;
