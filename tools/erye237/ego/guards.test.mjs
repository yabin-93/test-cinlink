import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {submit,read,exclusive,Failure,matches,sameHistory} from './core.mjs';
// Safety regression: an ambiguous dispatch must remain attempted after process restart.
test('ambiguous send cannot dispatch a second business request on resume',async()=>{
 const out=await fs.mkdtemp(path.join(os.tmpdir(),'erye237-guard-'));let clicks=0,value='';const p={url:async()=> 'https://app.cinlink.ai/c/test',fetch:async()=>({ok:true,body:JSON.stringify({messages:[{role:'assistant',job_id:'old-run'}]})}),fill:async(_,v)=>{value=v;},evaluate:async fn=>fn.toString().includes('editors')?{}:fn.toString().includes('innerText')?value:false,snapshot:async()=>'',screenshot:async()=>{},click:async()=>{clicks++;throw Error('Connection lost after dispatch');}};
 try{const ctx={out,p};await assert.rejects(submit(ctx,'002','actual prompt'),/Connection lost/);const saved=await read(path.join(out,'002-submission.json'));assert.deepEqual(saved.priorRunIds,['old-run']);assert.equal(saved.prompt,'actual prompt');await submit({...ctx},'002','actual prompt');assert.equal(clicks,1);}finally{await fs.rm(out,{recursive:true,force:true});}
});
test('atomic attempt reservation permits one writer',async()=>{const out=await fs.mkdtemp(path.join(os.tmpdir(),'erye237-exclusive-'));try{const results=await Promise.allSettled([exclusive(path.join(out,'send.json'),{n:1}),exclusive(path.join(out,'send.json'),{n:2})]);assert.equal(results.filter(x=>x.status==='fulfilled').length,1);assert.equal(results.find(x=>x.status==='rejected').reason.code,'EEXIST');}finally{await fs.rm(out,{recursive:true,force:true});}});
test('right document with wrong saved image fails the business oracle',()=>{assert.throws(()=>matches({title:'I2',width:1000,height:666,pixels:'original'},{title:'I2',width:1000,height:666,pixels:'processed'},'I2'),Failure);});
test('history comparison detects replacement at unchanged count',()=>{assert.equal(sameHistory({history:[{id:'v1'},{id:'v2'}]},{history:[{id:'v1'},{id:'other'}]}),false);});
