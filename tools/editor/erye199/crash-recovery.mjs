import { createContext, assert } from './core.mjs';
import { baseline } from './fixtures.mjs';

// Crash only an extra Agent-owned page. The runner's original page stays usable.
export async function crashRecovery(ctx, assets) {
  const task=await taskSpace(ctx.page.spaceId),page=await task.newPage();
  ctx.activeFaultPage=page.label;
  await page.goto(ctx.config.baseURL,{timeout:60000});
  await page.waitForSelector('[contenteditable="true"]',{state:'visible',timeout:30000});
  const fault=await createContext(ctx.config,page);fault.caseId=ctx.caseId;fault.workspaceId=ctx.workspaceId;
  await fault.prepare(baseline(assets));ctx.fixture=fault.fixture;
  const initial=await fault.read();await page.click('button[aria-label="原声静音"]');const before=await fault.waitSaved(initial.revision);await fault.write('before-paused-save',before);
  await page.cdp('Inspector.enable');
  await page.cdp('Fetch.enable',{patterns:[{urlPattern:ctx.config.baseURL+'/cloud-tool-api/v1/editor/projects/save',requestStage:'Request'}]});
  await page.events();
  await page.click('button[aria-label="原声启用"]');
  let paused;
  for(let i=0;i<12&&!paused;i++){
    paused=(await page.events()).find(e=>e.method==='Fetch.requestPaused'&&e.params?.request?.url.endsWith('/editor/projects/save'));
    if(!paused)await new Promise(resolve=>setTimeout(resolve,100));
  }
  if(!paused){await page.cdp('Fetch.disable');await page.close();ctx.activeFaultPage=null;return {status:'Blocked',actual:'未捕获真实保存请求，未执行页面崩溃；不能用普通刷新代替。'};}
  const input=JSON.parse(paused.params.request.postData);assert.equal(input.project_id,fault.fixture.editorId);
  await fault.write('paused-save-proof',{project_id:input.project_id,operation_id:input.operation_id,request_stage:'Request',before_revision:before.revision,intended_muted:input.content.tracks.find(t=>t.type==='audio').muted});await fault.shot('save-paused');
  const receipt=await Promise.race([page.cdp('Page.crash').then(()=>({returned:true})).catch(error=>({error:error.message})),new Promise(resolve=>setTimeout(()=>resolve({responsePending:true}),2500))]);
  const events=await page.events(),crashes=events.filter(e=>e.method==='Inspector.targetCrashed');
  await fault.write('crash-evidence',{receipt,crashes});
  try{await page.cdp('Fetch.disable');}catch{}
  await page.goto(ctx.config.baseURL+'/c/'+fault.fixture.conversationId,{timeout:60000});await fault.open(fault.fixture);
  const after=await fault.read();await fault.write('after-reopened',after);await fault.shot('reopened');
  if(!crashes.length){await page.close();ctx.activeFaultPage=null;return {status:'Blocked',actual:'未取得明确崩溃事件，仅保存中断后重开可用；不判崩溃恢复通过。'};}
  assert.deepEqual(after.content,before.content,'发送前中断的修改被重放或旧内容丢失');assert.equal(after.revision,before.revision);
  await page.click('button[aria-label="预览播放"]');await page.waitForFunction(()=>document.querySelector('[aria-label="工程实时预览"] video')?.currentTime>.5,undefined,{timeout:6000});await page.click('button[aria-label="预览暂停"]');await fault.shot('recovered-playback');
  await fault.write('validation',{crash_confirmed:true,event:'Inspector.targetCrashed',unchanged:true,no_replay:true,playback_recovered:true});
  await page.close();ctx.activeFaultPage=null;
  return {status:'Passed',actual:'真实保存请求发送前拦截后独立页面崩溃，Inspector.targetCrashed确认；重开旧工程内容/版本保持且可播放，未落库修改未重放。仅覆盖页面崩溃的未发送请求分支。',coverage:'不验拟定内部字段，不含保存落库后回执丢失、浏览器整体或整机崩溃',crash_confirmed:true};
}
