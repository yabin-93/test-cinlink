import {existsSync} from 'node:fs';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {expect,type Locator} from '@playwright/test';
import {Navigation210} from './erye210.js';
import {block210,seed210,workspace210} from './erye210-runner.js';
import {media210} from './erye210-completion.js';
import {submitCurrentPrompt,findStringField} from '../../src/workspace.js';
type Json=Record<string,any>;
export const restoredFiveVersion210='v4-restored-final-five-20261116';
const synced=async(n:Navigation210)=>expect(n.page.locator('.ed-save-status')).toHaveText('已同步');
const voiceInputs=(n:Navigation210)=>n.page.locator('.ed-voice-panel textarea[aria-label$="配音文案"],.ed-voice-panel textarea[aria-label$="配音文字"]');
const audio=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='audio');
const captions=(p:Json)=>p.content.tracks.filter((t:Json)=>t.type==='subtitle');
function guard(n:Navigation210){if(existsSync(path.join(n.out,'checkpoint.json')))block210('本批已有准备/任务检查点，先核对原任务与工程，不自动重新提交');}
async function checkpoint(n:Navigation210,s:Json){s.checks=structuredClone(n.checks);await n.record('checkpoint',s);}
async function fresh(n:Navigation210,id:string){guard(n);const seed=structuredClone(await seed210(n));delete seed.content.cleanup_analysis;const f=await n.copy(workspace210(),id,seed);const s:Json={id,f,workspaceId:workspace210(),before:await n.get(f.pid)};await checkpoint(n,s);return s;}
function preparedProjectId(message:Json|undefined){
 const direct=message?.result_files?.find((f:Json)=>f.facts?.editor_project_id)?.facts.editor_project_id;
 const initialized=message?.ext?.editor_project_initialization;
 return direct||(Array.isArray(initialized)?initialized:[]).find((p:Json)=>p.status==='ready'&&p.project_type==='video')?.project_id;
}
async function voicePreparation(n:Navigation210,id:string):Promise<Json>{
 const resume=process.env.CINLINK_ERYE210_FINAL_FIVE_RESUME_DIR||(process.env.CINLINK_ERYE210_FINAL_FIVE_RESUME_ROOT?path.join(process.env.CINLINK_ERYE210_FINAL_FIVE_RESUME_ROOT,id):undefined);
 if(resume){
  guard(n);const s:Json=JSON.parse(await readFile(path.join(resume,'checkpoint.json'),'utf8'));expect(s.id).toBe(id);
  if(s.phase!=='native-translation-prerequisite'||s.generationAttemptedAt)block210('此续验入口仅恢复已完成原生译制的工程观察，不重复已开始的目标编辑/生成');
  const body=await n.messages(s.f.cid),message=body.messages?.filter((m:Json)=>m.role==='assistant'&&(m.run_id===s.runId||m.job_id===s.runId)).at(-1);const pid=preparedProjectId(message);
  if(!pid)block210('原译制仍未建立可编辑工程，保留原run，不重新提交');
  s.observerContinuation={sourceBatch:path.basename(path.dirname(resume)),samePreparationRun:s.runId,newTranslationSubmitted:false,downloadableProjectRequired:false};n.prepared[id]=s.f;await checkpoint(n,s);
  await n.enterConversation(s.f.cid);const project=await n.get(pid);s.f={pid,cid:s.f.cid,name:project.content.name};n.prepared[id]=s.f;await checkpoint(n,s);await n.open();if(await n.page.locator('.ed-project-name').innerText()!==s.f.name)await n.selectProject(s.f.name);
  return captureVoiceReady(n,s,id);
 }
 guard(n);const source=process.env.CINLINK_ERYE210_SOURCE_VIDEO;if(!source||!existsSync(source))block210('缺少真实20秒英语原片，不能准备翻译配音项目');
 const wid=await n.createWorkspace();const s:Json={id,workspaceId:wid,f:{cid:'',pid:'',name:`ERYE210-${id}-原生翻译配音准备`},phase:'native-translation-prerequisite'};n.prepared[id]=s.f;await checkpoint(n,s);
 await n.page.goto(n.origin+'/?project_id='+wid,{waitUntil:'domcontentloaded'});await n.page.locator('#workspace-prompt').waitFor();s.balanceBefore=await n.credits();
 await n.page.getByRole('button',{name:'翻译配音',exact:true}).click();
 const target=n.page.getByRole('button',{name:'目标语言：English',exact:true}).first();await target.click();await n.page.getByRole('option',{name:'简体中文',exact:true}).click();
 await n.page.getByRole('button',{name:'字幕显示模式：译文',exact:true}).first().click();await n.page.getByRole('option',{name:'双语',exact:true}).click();
 await n.page.locator('.workspace-composer-shell input[type=file]').setInputFiles(source!);
 await expect(n.page.getByRole('listitem',{name:'E196-A.mp4 00:20',exact:true})).toHaveCount(1,{timeout:60000});
 s.parameters={mode:'配音和字幕',targetLanguage:'简体中文',captions:'双语',source:'E196-A.mp4 / 20秒',newNativeTranslationProject:true};
 s.prompt='将本次唯一上传的20秒英语原片 E196-A.mp4 翻译成简体中文普通话配音。使用系统默认音色，不使用音色克隆、不做口型同步；保留英语原文与简体中文双语字幕、完整画面、原时长及1920×1080分辨率，保留背景声音且替换原英语人声，不剪辑、不添加水印。请生成可继续编辑的翻译配音工程，目标语言为简体中文，并交付MP4。';
 await n.page.locator('#workspace-prompt').fill(s.prompt);await checkpoint(n,s);await n.shot(id+'-native-translation-configured');
 const resourceFile=path.join(path.dirname(n.out),'native-translation-resource-block.json');
 if(existsSync(resourceFile)){
  const proof=JSON.parse(await readFile(resourceFile,'utf8'));
  if(proof.balanceBefore===s.balanceBefore){s.resourceBlock=proof;await checkpoint(n,s);n.checks.push({stage:'native-translation-prerequisite-blocked',parameters:s.parameters,balance:s.balanceBefore,reason:proof.reason,proofRunId:proof.runId,duplicatePreparationSubmitted:false});await checkpoint(n,s);await n.shot(id+'-blocked-native-translation-resource');block210('已为本例新建并配置原生翻译配音项目；当前积分与本轮真实准备失败时相同：'+proof.reason+'。未重复提交，不用普通字幕工程替代。');}
 }
 s.submissionAttemptedAt=new Date().toISOString();await checkpoint(n,s);const submission=await submitCurrentPrompt(n.page);s.runId=submission.runId;await checkpoint(n,s);
 await expect.poll(()=>new URL(n.page.url()).pathname,{timeout:45000}).toMatch(/^\/c\//);s.f.cid=new URL(n.page.url()).pathname.slice(3);n.prepared[id]=s.f;await checkpoint(n,s);
 const deadline=Date.now()+600000;let message:Json|undefined;const answered=new Set<string>();
 while(Date.now()<deadline){
  const body=await n.messages(s.f.cid);message=body.messages?.filter((m:Json)=>m.role==='assistant'&&(m.run_id===s.runId||m.job_id===s.runId)).at(-1);
  const status=String(message?.status||'').toLowerCase();
  if(/failed|error|cancelled/.test(status)){
   const text=String(message?.text||message?.error_msg||message?.error_message||'准备任务失败');s.preparationFailure={runId:s.runId,status,text};await n.record(id+'-translation-terminal-private',message);n.checks.push({stage:'native-translation-prerequisite-failed',runId:s.runId,status,text,balance:s.balanceBefore,targetStepsExecuted:false});await checkpoint(n,s);await n.shot(id+'-native-translation-prerequisite-failed');
   if(/Insufficient credits|积分不足|余额不足/i.test(JSON.stringify(message)))await writeFile(resourceFile,JSON.stringify({reason:text,runId:s.runId,status,balanceBefore:s.balanceBefore,sourceCase:id,at:new Date().toISOString()},null,2));
   block210('本例原生翻译配音准备任务'+s.runId+' '+status+'：'+text+'；尚无稳定配音基线，目标步骤未执行，未重发。');
  }
  if(/completed|succeeded|^done$/.test(status))break;
  const form=n.page.locator('.node-clarification:visible,.clarification-card:visible').first();
  if(await form.count()){
   const text=await form.innerText(),key=text.trim();if(answered.has(key))block210('本轮原准备任务补槽尚未解决，保留同一run，不重复发送');
   const labels:Record<string,string>={'目标语言':'简体中文','配音语言':'简体中文','字幕语言':'简体中文','字幕显示模式':'双语','配音模式':'配音和字幕'};let count=0;
   for(const [label,value]of Object.entries(labels)){const input=form.getByLabel(label,{exact:true});if(await input.count()){if(await input.evaluate(e=>e.tagName==='SELECT'))await input.selectOption({label:value});else await input.fill(value);count++;}}
   await n.record(id+'-clarification-observation',{text,configuredAnswers:labels,filled:count});await n.shot(id+'-clarification');
   if(!count)block210('原生译制准备出现未匹配的补槽，须沿原表单核对填写，不重发准备任务：'+text);
   await form.getByRole('button',{name:/^(提交|Submit)$/}).click();answered.add(key);
  }
  const plan=n.page.locator('.node-plan-review__actions button').filter({hasText:/^(提交|Submit)$/});if(await plan.count()===1&&await plan.isVisible()&&await plan.isEnabled()&&!answered.has('plan')){await n.shot(id+'-translation-plan');await plan.click();answered.add('plan');}
  await n.page.waitForTimeout(1500);
 }
 const pid=preparedProjectId(message);
 if(!pid)block210('原生译制准备尚未交付可编辑工程，保留原run '+s.runId+'，不重复提交');
 const project=await n.get(pid);s.f={pid,cid:s.f.cid,name:project.content.name};n.prepared[id]=s.f;await checkpoint(n,s);await n.open();if(await n.page.locator('.ed-project-name').innerText()!==s.f.name)await n.selectProject(s.f.name);
 return captureVoiceReady(n,s,id);
}
async function captureVoiceReady(n:Navigation210,s:Json,id:string){
 await n.choose('配音');const until=Date.now()+30000;
 while(await voiceInputs(n).count()<2&&Date.now()<until){const alerts=await n.page.getByRole('alert').allTextContents();if(alerts.length){s.voicePageError=alerts;break;}await n.page.waitForTimeout(1000);}
 const count=await voiceInputs(n).count();if(count<2){n.checks.push({stage:'voice-list-prerequisite-unavailable',runId:s.runId,visibleVoiceSentences:count,alerts:s.voicePageError||[],extraCreateClicked:false});await checkpoint(n,s);await n.shot(id+'-native-voice-list-unavailable');block210('真实译制已准备但既有配音文稿不足两句或页面报错；未额外点击创建配音/生成，不以字幕列表替代');}
 await synced(n);s.before=await n.get(s.f.pid);s.originalTexts=await voiceInputs(n).evaluateAll(es=>es.map(e=>(e as HTMLTextAreaElement).value));
 const voices=audio(s.before).filter((t:Json)=>['narration','dubbing'].includes(t.role)).flatMap((t:Json)=>t.clips);
 if(voices.filter((c:Json)=>c.file_id).length<2)block210('本例真实翻译工程未具备至少两句就绪配音声音，目标未开始');s.voices=voices;s.phase='target-ready';n.checks.push({stage:'native-translation-prerequisite-ready',runId:s.runId,voiceSentences:count,realAudioFiles:voices.length,targetLanguage:'简体中文'});await checkpoint(n,s);await n.shot(id+'-real-translated-ready');return s;
}
export async function restored004(n:Navigation210){
 const s=await voicePreparation(n,'004');await n.choose('媒体');await n.choose('配音');
 for(let i=0;i<2;i++){
  const input=voiceInputs(n).nth(i),row=input.locator('xpath=ancestor::*[contains(@class,"ed-voice-sentence")][1]');await expect(input).toHaveValue(s.originalTexts[i]);
  const expected=s.voices[i].timeline_start_sec;if(i===1&&expected===s.voices[0].timeline_start_sec)block210('两句起始时间无法区分，不能验证句子定位');
  await row.click({position:{x:8,y:8}});await expect.poll(async()=>Number(await n.page.getByRole('slider',{name:'预览播放进度',exact:true}).inputValue())).toBeCloseTo(expected,1);n.checks.push({stage:'voice-sentence-seek',sentence:i+1,expectedStart:expected,text:s.originalTexts[i]});await n.shot('004-select-sentence-'+(i+1));
 }
 await n.choose('字幕');await n.choose('配音');expect(await voiceInputs(n).evaluateAll(es=>es.map(e=>(e as HTMLTextAreaElement).value))).toEqual(s.originalTexts);const after=await n.get(s.f.pid);expect(audio(after)).toEqual(audio(s.before));expect(captions(after)).toEqual(captions(s.before));await checkpoint(n,s);await n.shot('004-voice-selection-preserved');
}
export async function restored005(n:Navigation210){
 const s=await fresh(n,'005');await n.choose('文稿');const panel=n.page.locator('.ed-inspector').getByRole('region',{name:'文稿',exact:true});await n.page.getByText('正在加载文稿…',{exact:true}).waitFor({state:'hidden'});
 s.analysisAttemptedAt=new Date().toISOString();await checkpoint(n,s);await panel.getByRole('button',{name:/^(重新分析|去除口水词|Remove filler words)$/}).click();
 await expect(panel.getByRole('button',{name:'口水词与停顿',exact:true})).toBeEnabled({timeout:240000});const toggle=panel.getByRole('button',{name:'口水词与停顿',exact:true});if(await toggle.getAttribute('aria-expanded')!=='true')await toggle.click();
 const boxes=panel.getByRole('checkbox');await boxes.nth(0).uncheck();await boxes.nth(1).check();const threshold=panel.getByRole('spinbutton',{name:/最短停顿/});await threshold.fill('0.8');await threshold.blur();
 const candidates=panel.locator('[data-token-id].is-pause.is-candidate');const before=await candidates.evaluateAll(es=>es.map(e=>({id:e.getAttribute('data-token-id'),text:e.textContent})));if(!before.length)block210('本轮真实分析没有可操作停顿候选，审核保持前置未形成');
 await candidates.first().focus();await candidates.first().press('Enter');const beforeState=await n.state();n.checks.push({stage:'unapplied-cleanup-review-before-tabs',candidates:before,state:beforeState});await checkpoint(n,s);await n.shot('005-unapplied-review-before-tabs');
 await n.choose('字幕');await n.choose('水印');await n.choose('文稿');await expect(toggle).toBeEnabled();if(await toggle.getAttribute('aria-expanded')!=='true')await toggle.click();await expect(threshold).toHaveValue('0.8');await expect(boxes.nth(0)).not.toBeChecked();await expect(boxes.nth(1)).toBeChecked();
 const after=await candidates.evaluateAll(es=>es.map(e=>({id:e.getAttribute('data-token-id'),text:e.textContent})));expect(after).toEqual(before);expect(media210(await n.get(s.f.pid))).toEqual(media210(s.before));expect(captions(await n.get(s.f.pid))).toEqual(captions(s.before));
 n.checks.push({stage:'unapplied-review-returned',candidates:after,state:await n.state(),sameThreshold:true,automaticCut:false});await checkpoint(n,s);await n.shot('005-unapplied-review-returned');
}
export async function restored020(n:Navigation210){
 const s=await voicePreparation(n,'020');const first=voiceInputs(n).first(),text='配音撤销验证020。';await first.fill(text);await first.blur();await synced(n);await n.choose('字幕');await n.choose('配音');await expect(first).toHaveValue(text);await n.shot('020-edited-returned');
 await n.page.getByRole('button',{name:'撤销',exact:true}).click();await expect(first).toHaveValue(s.originalTexts[0]);await synced(n);await n.shot('020-undo-original-text');
 await n.page.getByRole('button',{name:'重做',exact:true}).click();await expect(first).toHaveValue(text);await synced(n);await n.shot('020-redo-new-text');
 await n.page.reload({waitUntil:'domcontentloaded'});await n.page.locator('#workspace-prompt').waitFor();await n.open(s.f.name);await n.choose('配音');await expect(first).toHaveValue(text);await expect(voiceInputs(n).nth(1)).toHaveValue(s.originalTexts[1]);const after=await n.get(s.f.pid);expect(audio(after)).toEqual(audio(s.before));expect(captions(after)).toEqual(captions(s.before));n.checks.push({stage:'voice-text-undo-redo-persisted',original:s.originalTexts[0],changed:text,secondUnchanged:true,noNewAudio:true});await checkpoint(n,s);await n.shot('020-final-saved');
}
async function task(n:Navigation210,pid:string,id:string){const r=await n.json('/cloud-tool-api/mcp',{jsonrpc:'2.0',id:crypto.randomUUID(),method:'editor.task.get',params:{project_id:pid,task_id:id}},'post');return r.result?.structuredContent||{};}
export async function restored018(n:Navigation210){
 const s=await voicePreparation(n,'018');const first=voiceInputs(n).first();await first.fill('配音生成十八。');await first.blur();await synced(n);s.generationAttemptedAt=new Date().toISOString();await checkpoint(n,s);
 const response=n.page.waitForResponse(r=>r.request().method()==='POST'&&new URL(r.url()).pathname.includes('/cloud-tool-api/mcp')&&/dubbing.generate/.test(r.request().postData()||''),{timeout:45000}).catch(()=>null);
 const generate=n.page.locator('.ed-voice-panel').getByRole('button',{name:/重新生成|生成配音|Generate voice|Regenerate/});await expect(generate).toHaveCount(1);await generate.click();const receipt=await response;
 if(!receipt){const alerts=await n.page.getByRole('alert').allTextContents();n.checks.push({stage:'target-generation-no-receipt',alerts});await checkpoint(n,s);await n.shot('018-target-generation-no-receipt');expect(alerts,'明确生成后不应报错').toEqual([]);block210('目标生成已尝试但受理未知，保留原工程，不重新点击生成');}
 const body=await receipt!.json();await n.record('018-generation-receipt-private',body);s.targetTaskId=findStringField(body,'task_id');await checkpoint(n,s);if(!s.targetTaskId)block210('本次生成未取得原任务标识，先核对受理状态，不重发');
 let t=await task(n,s.f.pid,s.targetTaskId);if(/failed|error|cancel/.test(t.status))expect(t.status,'目标生成失败，不归为前置缺失').not.toMatch(/failed|error|cancel/);if(/done|completed|succeeded/.test(t.status))block210('任务在独立修改前已完成，处理中场景未形成；未重复生成抢窗口');
 await n.choose('水印');await n.sub('文字水印');const input=n.page.locator('.ed-watermark-panel textarea');if(!await input.isEnabled())block210('真实配音处理中独立水印控件不可用，未强制编辑；可用范围分支阻塞');
 t=await task(n,s.f.pid,s.targetTaskId);expect(t.status,'目标生成失败不能记为未形成窗口').not.toMatch(/failed|error|cancel/);if(/done|completed|succeeded/.test(t.status))block210('水印输入前原任务已结束，未建立真实处理中编辑窗口');
 n.checks.push({stage:'genuine-running-before-independent-edit',taskId:s.targetTaskId,status:t.status});await input.fill('INDEPENDENT_018');await input.blur();await synced(n);await n.shot('018-running-independent-watermark');await n.choose('字幕');await n.choose('媒体');
 const until=Date.now()+240000;while(Date.now()<until){t=await task(n,s.f.pid,s.targetTaskId);if(/done|completed|succeeded|failed|error|cancel/.test(t.status))break;await n.page.waitForTimeout(1500);}
 expect(t.status,'明确生成必须成功完成').toMatch(/done|completed|succeeded/);
 expect(await n.page.getByRole('alert').allTextContents(),'后台done不代替页面成功，目标生成不应留下页面错误').toEqual([]);
 await n.choose('水印');await n.sub('文字水印');await expect(input).toHaveValue('INDEPENDENT_018');
 const voiceFiles=(p:Json)=>audio(p).filter((a:Json)=>['narration','dubbing'].includes(a.role)).flatMap((a:Json)=>a.clips.map((c:Json)=>c.file_id));const oldFiles=voiceFiles(s.before);
 await expect.poll(async()=>{const alerts=await n.page.getByRole('alert').allTextContents();if(alerts.length)throw new Error('原目标配音结果应用出现页面错误：'+alerts.join('; '));return voiceFiles(await n.get(s.f.pid)).filter((f:string)=>!oldFiles.includes(f)).length;},{timeout:60000,message:'等待原任务新声音实际应用，不重复生成'}).toBe(1);
 const after=await n.get(s.f.pid);s.afterGeneration=after;await checkpoint(n,s);const newFiles=voiceFiles(after);
 expect(newFiles,'目标旧声音不能叠留').not.toContain(oldFiles[0]);for(const f of oldFiles.slice(1))expect(newFiles,'其他句声音保持').toContain(f);
 expect(after.content.tracks.filter((x:Json)=>x.type==='video')).toEqual(s.before.content.tracks.filter((x:Json)=>x.type==='video'));
 expect(after.content.watermarks.text?.text).toBe('INDEPENDENT_018');expect(captions(after)).toEqual(captions(s.before));
 await n.page.reload({waitUntil:'domcontentloaded'});await n.open(s.f.name);await n.choose('水印');await n.sub('文字水印');await expect(input).toHaveValue('INDEPENDENT_018');n.checks.push({stage:'generation-independent-edit-preserved',taskId:s.targetTaskId,status:t.status,watermark:'INDEPENDENT_018'});await checkpoint(n,s);await n.shot('018-final-independent-edit');
}
async function mediaScope(n:Navigation210,scope:'聊天'|'工程'){await n.choose('媒体');await n.page.locator('.ed-inspector').getByRole('button',{name:scope,exact:true}).click();await waitMedia(n);}
async function waitMedia(n:Navigation210){await n.page.locator('.ed-inspector').getByText(/^(加载中…|加载中\.\.\.|加载素材…)$/).waitFor({state:'hidden',timeout:45000});}
const grid=(n:Navigation210)=>n.page.locator('.ed-media-grid');
async function importLibrary(n:Navigation210,file:string){if(!existsSync(file))block210('素材库缺少真实准备文件');const chooser=n.page.waitForEvent('filechooser');await n.page.locator('.ed-inspector').getByRole('button',{name:'导入素材',exact:true}).click();await(await chooser).setFiles(file);await expect(grid(n)).toContainText(path.basename(file),{timeout:60000});await waitMedia(n);}
export async function restored041(n:Navigation210){
 const s=await fresh(n,'041');const A=process.env.CINLINK_ERYE210_SOURCE_VIDEO,B=process.env.CINLINK_ERYE210_INDEPENDENT_AUDIO;if(!A||!B)block210('未配置真实A/B素材');
 await mediaScope(n,'聊天');await importLibrary(n,A!);const pb=await n.copy(workspace210(),'041-C2',s.before);s.pb=pb;await mediaScope(n,'聊天');await importLibrary(n,B!);
 await n.enterConversation(s.f.cid);await n.open(s.f.name);await mediaScope(n,'聊天');const chatBaseline=await grid(n).innerText();await mediaScope(n,'工程');
 await expect.poll(()=>grid(n).innerText(),{timeout:30000}).toContain(path.basename(B!)).catch(()=>{});const projectBaseline=await grid(n).innerText();
 if(!chatBaseline.includes(path.basename(A!))||chatBaseline.includes(path.basename(B!))||!projectBaseline.includes(path.basename(B!))){n.checks.push({stage:'library-scope-prerequisite-missing',chatBaseline,projectBaseline});await checkpoint(n,s);await n.shot('041-library-scope-prerequisite');block210('两组实际素材未形成可区分的Chat/Project基线，未以空列表或搜索框存在判通过');}
 s.searchBaseline=await n.get(s.f.pid);n.checks.push({stage:'real-library-scope-baselines',chatBaseline,projectBaseline,A:path.basename(A!),B:path.basename(B!)});await checkpoint(n,s);const search=n.page.locator('.ed-media-search input');await expect(search).toBeEnabled();
 for(const [scope,positive]of [['聊天',path.basename(A!)],['工程',path.basename(B!)]] as const){
  await mediaScope(n,scope);await search.fill('');await search.press('Enter');await waitMedia(n);const baseline=await grid(n).innerText();
  await search.fill(positive);await search.press('Enter');await expect(grid(n)).toContainText(positive);await waitMedia(n);await n.shot('041-'+scope+'-positive');
  await search.fill('NO_MATCH_041_'+s.f.pid);await search.press('Enter');await expect.poll(()=>grid(n).innerText()).toBe('');await n.shot('041-'+scope+'-no-match');
  await search.fill('');await search.press('Enter');await expect.poll(()=>grid(n).innerText()).toBe(baseline);n.checks.push({stage:'media-search-and-clear',scope,positive,noMatchEmpty:true,baselineRestored:true});
 }
 expect((await n.get(s.f.pid)).content.tracks).toEqual(s.searchBaseline.content.tracks);n.checks.push({stage:'library-search-no-timeline-change',sameProject:true,noAssetAddedBySearch:true});await checkpoint(n,s);await n.shot('041-final-library-baseline');
}
