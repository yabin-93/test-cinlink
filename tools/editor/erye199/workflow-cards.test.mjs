import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {workflowContext,cardDefinitions}from'./workflow-cards.mjs';
async function fixture(cases,overrides={}){
 const outDir=await fs.mkdtemp(path.join(os.tmpdir(),'cinlink-card-safety-'));
 await fs.writeFile(path.join(outDir,'media.json'),JSON.stringify({F20:{name:'F20.mp4',path:'F20.mp4',sha256:'A'},F60:{name:'F60.mp4',path:'F60.mp4',sha256:'B'}}));
 await fs.writeFile(path.join(outDir,'execution.json'),JSON.stringify({cases,workspaceName:'QA'}));
 const calls=[];const page=new Proxy({}, {get:(target,name)=>target[name]??(async(...args)=>{calls.push({name,args});if(name==='evaluate')return false;throw Error('Unexpected browser action '+String(name));})});
 return {ctx:await workflowContext(page,{outDir,baseURL:'https://app.cinlink.ai',spaceId:1,...overrides}),calls,outDir};
}
test('accepted/submission-uncertain card requests cannot be submitted or uploaded again',async()=>{
 const {ctx,calls}=await fixture({'069':{submittedAt:'now',uploadTriggered:true,definition:cardDefinitions['069']}});
 await assert.rejects(()=>ctx.submit('069'),/禁止重发/);await assert.rejects(()=>ctx.upload('069'),/禁止重放/);assert.equal(calls.length,0);
});
test('another running native task prevents starting a new case before navigation',async()=>{
 const {ctx,calls}=await fixture({'071':{submittedAt:'now',runStatus:'running'}});
 await assert.rejects(()=>ctx.open('073'),/另一原任务尚未结束/);assert.equal(calls.length,0);
});
test('credit failure restart needs explicit recovery reason and cannot overwrite active work',async()=>{
 const before={'071':{submittedAt:'now',runStatus:'failed',runError:{code:'insufficient_credits'}}};
 const a=await fixture(before);await assert.rejects(()=>a.ctx.restart('071'),/仅在用户已补积分后/);assert.deepEqual(a.ctx.state.cases,before);assert.equal(a.calls.length,0);
 const b=await fixture({...before,'073':{submittedAt:'now',runStatus:'running'}},{recoveryReason:'credits-restored'});await assert.rejects(()=>b.ctx.restart('071'),/另一原任务尚未结束/);assert.ok(b.ctx.state.cases['071']);assert.equal(b.calls.length,0);
});
test('a non-credit product failure cannot be auto-retried after credit recovery',async()=>{
 const {ctx,calls}=await fixture({'071':{runStatus:'failed',runError:{code:'render_failed'}}},{recoveryReason:'credits-restored'});
 await assert.rejects(()=>ctx.restart('071'),/仅在用户已补积分后/);assert.equal(calls.length,0);
});

test('same-name source in another conversation cannot be verified as this case',async()=>{
 const {ctx}=await fixture({'071':{runStatus:'done',conversationId:'case-071',definition:cardDefinitions['071']}});
 ctx.page.url=async()=>'https://app.cinlink.ai/c/case-072';
 await assert.rejects(()=>ctx.inspect('071'),/当前页面并非本例独立会话/);
});
