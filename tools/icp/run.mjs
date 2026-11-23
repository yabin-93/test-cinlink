import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
const args=process.argv.slice(2),options={};for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--')||!args[i+1])throw Error('参数须为 --key value');options[args[i].slice(2)]=args[i+1];}
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),id=options.case,action=options.action;
if(!/^ICP-EC-0[1-5]$/.test(id||''))throw Error('本轮仅支持电商 ICP-EC-01～05');
if(!['prepare','references','submit','observe'].includes(action))throw Error('--action 必须是 prepare / references / submit / observe');
if(!/^\d+$/.test(options.space||''))throw Error('必须指定本任务已有的 --space，不自动创建浏览器或TaskSpace');
if(!options.report)throw Error('必须提供 --report 报告目录；新批次使用新目录，续验沿原目录');
const out=path.resolve(options.report);await fs.mkdir(out,{recursive:true});
const step=Number(options.step||0);if(!Number.isInteger(step)||step<0||step>4)throw Error('电商用例步骤为0～4');
const wait=Number(options['wait-ms']||0);if(!Number.isFinite(wait)||wait<0||wait>45000)throw Error('--wait-ms 限定0～45000，每轮结束后可沿原run继续观察');
const conf={repo,out,id,action,step,wait,space:Number(options.space),attachments:options.attachments?path.resolve(options.attachments):null,extra:options['extra-file']?path.resolve(options['extra-file']):null};
const worker=path.join(out,'icp-worker-'+Date.now()+'.mjs');
const code=`const fs=await import('node:fs/promises');const c=${JSON.stringify(conf)};const {context}=await import(${JSON.stringify(pathToFileURL(path.join(repo,'tools/icp/driver.mjs')).href)});const task=await taskSpace(c.space),p=task.page('p2'),ctx=await context(p,c.repo,c.out);if(c.action==='prepare'){await ctx.prepare(c.id);console.log({prepared:c.id});}else if(c.action==='references'){if(!c.attachments||!c.extra)throw Error('公共参考准备需要attachments和extra-file');await p.waitForSelector('button[aria-label="发送"]',{state:'visible',timeout:30000});await ctx.references(c.id,JSON.parse(await fs.readFile(c.attachments,'utf8')),await fs.readFile(c.extra,'utf8'));console.log({referenceSubmitted:c.id});}else if(c.action==='submit'){if(c.attachments){await p.setInputFiles('input[type=file]',JSON.parse(await fs.readFile(c.attachments,'utf8')));}await p.waitForSelector('button[aria-label="发送"]',{state:'visible',timeout:30000});await ctx.submit(c.id,c.step,c.extra?await fs.readFile(c.extra,'utf8'):'');console.log({submitted:c.id,step:c.step});}else{const end=Date.now()+c.wait;let r;do{r=await ctx.observe(c.id);if(!['assigned','running','queued'].includes(r.status)||Date.now()>=end)break;await new Promise(resolve=>setTimeout(resolve,Math.min(5000,end-Date.now())));}while(true);console.log({case:c.id,status:r.status,runId:r.runId,error:r.error,questions:r.clarifications?.filter(q=>q.status!=='answered'),answer:r.messages?.filter(m=>m.role==='assistant').map(m=>m.content_text)});if(!['assigned','running','queued'].includes(r.status))await ctx.shot(c.id,'observation-'+Date.now());}`;
await fs.writeFile(worker,code,'utf8');
const cli=options.ego||process.env.EGO_BROWSER_CLI||'ego-browser';const r=spawnSync(cli,['nodejs','-e',`await import('${pathToFileURL(worker).href}')`],{stdio:'inherit',windowsHide:true});if(r.error)throw r.error;process.exitCode=r.status??1;
