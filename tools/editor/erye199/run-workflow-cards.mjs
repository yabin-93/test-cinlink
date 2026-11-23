import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL}from'node:url';
import{spawnSync}from'node:child_process';
const args=process.argv.slice(2),options={};
for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||!args[i+1])throw Error('参数格式--key value');options[args[i].slice(2)]=args[i+1];}
if(!/^0(69|7[0-5])$/.test(options.case||''))throw Error('只接受069～075');
if(!['open','upload','confirmUpload','configuration','configure','submit','observe','resume','restart','confirmReview','inspect','download','mapping','verify','shot'].includes(options.action))throw Error('无效动作');
if(!/^\d+$/.test(options.space||'')||!options.report)throw Error('需已有TaskSpace及报告路径');
const root=fileURLToPath(new URL('../../../',import.meta.url));
const baseURL=options['base-url']||'https://app.cinlink.ai';if(!['https://app.cinlink.ai','https://staging-app.cinlink.ai'].includes(baseURL))throw Error('仅允许明确生产/预发根地址');
const config={outDir:path.resolve(options.report),baseURL,spaceId:Number(options.space),recoveryReason:options.reason};
const waitMs=Number(options['wait-ms']||0);if(waitMs<0||waitMs>40000)throw Error('单次轮询不超过40秒');
const dir=path.join(config.outDir,'browser');await fs.mkdir(dir,{recursive:true});const script=path.join(dir,'action-'+Date.now()+'.mjs');
const observeLoop=`let result;const end=Date.now()+${waitMs};do{result=await ctx.observe('${options.case}');if(!['queued','assigned','running','Acceptance not yet observed'].includes(result.status)||Date.now()>=end)break;await new Promise(r=>setTimeout(r,Math.min(5000,end-Date.now())));}while(true);`;
const action=options.action==='observe'?observeLoop:`const result=${options.action==='shot'?`await ctx.shot('${options.case}','manual-'+Date.now())`:`await ctx.${options.action}('${options.case}')`};`;
await fs.writeFile(script,`const task=await taskSpace(${config.spaceId}),page=task.page('p1');const {workflowContext}=await import('${pathToFileURL(path.join(root,'tools/editor/erye199/workflow-cards.mjs')).href}');const ctx=await workflowContext(page,${JSON.stringify(config)});${action}console.log(result);${['open','upload','configuration','resume','shot'].includes(options.action)?`console.log((await page.snapshot()).slice(-6500));`:''}`,'utf8');
const command=options.ego||process.env.EGO_BROWSER_CLI||'ego-browser';const result=spawnSync(command,['nodejs','-e',`await import('${pathToFileURL(script).href}')`],{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;process.exitCode=result.status??1;
