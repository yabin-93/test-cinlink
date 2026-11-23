"""Archive actual 069-075 native-card execution, preserving all unrelated cases."""
from pathlib import Path
from collections import Counter
from datetime import datetime,timezone
import argparse,json,re,shutil,copy
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
root=Path(__file__).resolve().parents[3];out=Path(a.report).resolve();req=root/'docs/cases/requirements/ERYE-199';state=json.loads((out/'execution.json').read_text(encoding='utf-8'))
if (req/'defect-sync-071-production-20261118.json').exists():raise SystemExit('本批已有后续云效同步记录，禁止旧执行归档覆盖新记录；请只读核对或运行云效归档器。未写入任何文件。')
ids=[f'{i:03}'for i in range(69,76)];report='results-069-075-production-20261118.md';ev='evidence-069-075-production-20261118';script='tools/editor/erye199/workflow-cards.mjs';runner='tools/editor/erye199/run-workflow-cards.mjs';marker='ERYE199-CARDS-069075-EXEC-20261118'
def load(p):return json.loads(p.read_text(encoding='utf-8'))
def dump(p,value):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def command(cid,action='observe'):return f'node {runner} --case {cid} --action {action} --space 6 --report reports/erye199-069-075-production-20261118'
details={
 '069':'原文字幕/视频/原声3轨、8句英文；原英语声音保持；20秒1280×720；两处原生预览播放、重入与刷新通过。',
 '070':'译文字幕/视频/原声3轨、中文可编辑字幕；实际声音仍英语；20秒1280×720；预览、重入与刷新通过，无额外译声/BGM轨。',
 '071':'译文模式仍在编辑器2秒和10秒处显示中文+英文，重入/刷新保持；下载成片对应帧只有中文。五类轨、中文译声及20秒成片正常；整例Failed。',
 '072':'双语模式保留译文字幕/视频/原声/配音/背景音乐5轨；两处预览中英对应、实际声音中文；20秒1280×720，重入与刷新通过。',
 '073':'画质增强交付20秒2560×1440；视频/原声2轨、源标记和原英语语音保持，重入刷新通过。当前卡片无独立2倍选项，按原完整提示词指定2倍并核验实际输出。',
 '074':'默认审核3口水词+6停顿后点击移除；实际44.744秒，视频/原声各10段（末段在时间轴视口外）；三段正文独立ASR完整保持，画面/原声与保留源区间对照通过，接缝播放、重入刷新通过。',
 '075':'原生时长选30秒；审核确认源20.400～35.250、39.750～54.900两段，实际输出30秒1280×720；编辑器视频/原声各2段与方案/成片对应，首中尾源标记、接缝播放和重入刷新通过。',
}
entries=[]
for cid in ids:
 e=state['cases'][cid];assert e['runStatus']=='done'and e['stage']=='UI verified',f'{cid} not UI verified';assert len(e.get('playback',[]))>=2,f'{cid} missing native playback'
 if not e.get('editorId'):e['editorId']=next((f.get('project_id')for f in e.get('resultFiles',[])if f.get('project_id')),None)
 d=Path(e['download']['path']).parent;prod=load(d/'product-verification.json');assert not prod['failures'],f'{cid} product audit unresolved'
 if cid in ['074','075']:assert not load(d/'source-content-verification.json')['failures'],f'{cid} source comparison unresolved'
 status='Failed'if e.get('failures')else'Passed';e['status']=status;e['finalizedAt']=datetime.now(timezone.utc).isoformat();e['latestReport']=report
 dest=req/ev/cid;dest.mkdir(parents=True,exist_ok=True);evidence=[]
 for f in sorted(d.glob('*')):
  allowed=(f.suffix=='.png' or f.name in ['configuration.json','editor-observation.json','product-verification.json','source-mapping.json','source-content-verification.json','review-selection.json'] or re.fullmatch(r'(preview|playback|playback-samples)-[\d.]+\.json',f.name))
  if allowed:shutil.copy2(f,dest/f.name);evidence.append(f'{ev}/{cid}/{f.name}')
 entry={'id':e['id'],'status':status,'automation':'AUTO','automation_status':'AUTO','script':script+'#'+cid,'automation_command':command(cid),'actual':details[cid],'evidence':evidence,'screenshots':[x for x in evidence if x.endswith('.png')],'definition':'cases.md#erye199-card-multitrack','caseVersion':'v1-merged-erye199-20261118','legacyId':f'ECMT-{int(cid)-68:03}','environment':'production','conversation_id':e['conversationId'],'run_id':e['runId'],'editor_id':e.get('editorId'),'workspace':e.get('actualWorkspace'),'source_sha256':e['source']['sha256'],'prompt':e['definition']['prompt'],'checks':e['checks'],'failures':e.get('failures',[]),'latest_execution_report':report,'latest_execution_batch':out.name,'product':{k:prod[k]for k in ['duration','width','height','language']},'local_directory':str(d.relative_to(root)).replace('\\','/')}
 if cid=='071':entry['credit_history']={'prior_status':'Blocked','reason':'insufficient_credits: required200/available90','user_confirmed_topup':True,'new_independent_attempt':2,'previous_conversation_id':state['caseHistory']['071'][0]['conversationId']};entry['local_defect']='../../../defects/ERYE199-071-translation-only-preview-bilingual-production-20261118.md';entry['cloud_sync']='Not requested; not submitted'
 entries.append(entry)
dump(out/'execution.json',state)
batchcounts=dict(Counter(e['status']for e in entries));batch={'date':'2026-11-18','environment':'production','base_url':'https://app.cinlink.ai','task_space':6,'counts':batchcounts,'scope':'ERYE199-069～075；7条原生卡片生产实跑','report':report,'cases':entries,'cloud_sync':False,'notes':['071初次积分阻塞保留历史，用户补充后独立新尝试已完成，不计最终Blocked','原生页面操作执行；只读任务/工程身份和本地实际文件比对辅助验收；无工程API写入','独立ASR辅助内容核验，不冒充人工逐句听审；F60为标注的合成QA素材']};dump(req/'execution-status-069-075-production-20261118.json',batch)
masterpath=req/'execution-status-20261113.json';master=load(masterpath);others={x['id']:copy.deepcopy(x)for x in master['cases']if x['id']not in {e['id']for e in entries}}
for entry in entries:
 c=next(x for x in master['cases']if x['id']==entry['id']);c.update(entry)
assert all(x==next(c for c in master['cases']if c['id']==k)for k,x in others.items())
master['counts']=dict(Counter(c['status']for c in master['cases']));assert len(master['cases'])==142
master.update(updated='2026-11-18',latest_execution_report=report,latest_automation_execution_report=report,latest_task_space=6,stage='069-075 production execution completed',note='069～075已完成实跑；其余135条定义、结果与缺陷关联保持；076～148共73条待执行。')
master['latest_card_execution_report']=report;dump(masterpath,master)
mp=req/'execution-status-multitrack-20261118.json';multi=load(mp)
for e in entries:next(c for c in multi['cases']if c['id']==e['id']).update(e)
multi.update(scope='ERYE199-069～075已实跑；076～116待执行',executionStarted=True,counts=dict(Counter(c['status']for c in multi['cases'])),automationCounts=dict(Counter(c['automation']for c in multi['cases'])),fixtureReadiness='F20/F60已准备并登记；D/B未为后续用例准备',latest_execution_report=report);dump(mp,multi)
media=load(out/'media.json');manifest={k:{'name':v['name'],'sha256':v['sha256'],'bytes':v['bytes'],'duration':v['probe']['format']['duration'],'source':{key:value for key,value in v['source'].items()if key not in ['path','pcmPath','addedMusic']}}for k,v in media.items()};dump(req/ev/'fixture-manifest.json',manifest)
support=req/ev/'source-support';support.mkdir(exist_ok=True)
shutil.copy2(out/'fixture-support/F20-source-2.png',support/'F20-source-2.png')
paragraphs=['# ERYE199-069～075 生产执行结果（2026-11-18）','','本轮7条：**6通过、1失败、0阻塞、0待执行**。当前142条：38通过、8失败、2阻塞、21不适用、73待执行。其余135条状态及云效关联保持；本轮未写云效。','',f'环境：生产 app.cinlink.ai，Ego Lite 0.6.3.14有头浏览器，TaskSpace6；测试项目 `{state["workspaceName"]}`，workspace `{state["workspaceId"]}`。每例独立新会话/原生工程，每次只附本例一个源片；069/070首页选择项目后实际会话落在未分组，已如实登记，后续使用原生项目新会话路由。没有使用旧工程替代、重新上传产物代替原生入口或API写工程。','',f'[结构化逐例结果](execution-status-069-075-production-20261118.json) · [全量进度](execution-status-current.md) · [素材清单]({ev}/fixture-manifest.json) · [自动化说明](automation.md)','', '| 用例 | 结果 | 实际核验 |','|---|---|---|']
for e in entries:paragraphs.append(f'| [{e["id"]}](#{e["id"].lower()}) | {e["status"]} | {e["actual"]} |')
paragraphs+=['','F20：20秒英语原声、1280×720/30fps/48kHz，源画面带时钟，另混低音量可分离背景乐；F60：60秒三话题的Microsoft Zira合成QA口播，标注Um/Uh及停顿、带源时钟。两份夹具均完整解码并独立转写。F60不是自然口播的全面质量样本；本批只验本例输入、轨道和结果对应。','', '所有实际产物均经原生下载、完整解码、时长/尺寸核验。069/070/073的英语正文与F20独立转写一致；071/072实际中文音轨存在；074去掉口水词后的全文与F60一致；074/075逐段登记源映射，以实际解码画面及高能量语音窗口与原片比对。低能量停顿中AAC噪声相关度不作语音错位判断，辅助程序已改为先按源能量选语音窗。页面真实播放并记录推进，未声称已人工逐句听审。','']
for e in entries:
 cid=e['id'][-3:];base=f'{ev}/{cid}';paragraphs +=[f'<a id="{e["id"].lower()}"></a>',f'## {e["id"]}：{e["status"]}','',f'前置：{state["cases"][cid]["definition"]["card"]}卡片，独立新会话，唯一源片 `{state["cases"][cid]["source"]["name"]}`。参数、原文提示词与前置截图一并留存。','',f'> {e["prompt"]}','',e['actual'],'',f'会话：[打开本轮](https://app.cinlink.ai/c/{e["conversation_id"]})；原run `{e["run_id"]}`。本地原始产物及私有检查点：`{e["local_directory"]}`。','',f'[原生时间轴]({base}/editor-tracks.png) · [实际文件核验]({base}/product-verification.json)']
 if cid in ['069','070','071','072']:paragraphs +=[f'[2秒预览]({base}/preview-2.png) · [10秒预览]({base}/preview-10.png)']
 if cid in ['074','075']:paragraphs +=[f'[审核截图]({base}/review-before-confirm.png) · [源区间登记]({base}/source-mapping.json) · [逐段内容核验]({base}/source-content-verification.json)']
 if cid=='071':paragraphs +=['','初次积分不足（需要200/余额90）未生成；用户回复“已补充”后保留旧记录、另建独立新尝试，未重发旧任务。新尝试五轨与中文音轨成立，但选择译文时编辑器两句均双语，重入和刷新保持，判Failed；不把积分或此前观察脚本超时当产品缺陷。','',f'![提交前选择译文]({base}/before-submit.png)',f'![编辑器额外英文]({base}/preview-2.png)',f'![实际成片只显示中文，ffmpeg抽帧辅助证据]({base}/product-frame-2.png)','', '[本地缺陷及详细复现](../../../defects/ERYE199-071-translation-only-preview-bilingual-production-20261118.md)。本轮未提交云效。']
 paragraphs+=['']
paragraphs+=['## 核验边界与运行说明','','073卡片没有独立2倍选择器，直接使用原提示词并以实际2560×1440结果验收；并未声称点击不存在选项。074默认0.8秒停顿阈值；点击“移除”后继续同一原run。075确认方案两段总计30秒，摘要曾写约30.4秒，实际区间/时间轴/下载成片均30秒；本批按实际业务结果验收。时间轴末段超出视口时不按可见块数量推算总片段。','', '初期文件上传等待误把aria-label当正文、20秒结束点无视频黑屏、range控件像素点击偏差、预览首次冷启动等待、原下载候选API404均属观察/脚本适配记录；已在原任务上修正核验，没有因此重复发送原请求。原生seek现用键盘小步校正至1帧，预览播放用Node有界轮询。','',f'唯一069～075实现 `{script}`；分阶段入口 `{runner}`。已有检查点用observe/resume/verify续验，禁止再次open/upload/submit。新批次按自动化说明准备新的报告目录，不能复用此批新建任务。','', '本轮离线验证：两JS入口语法检查、5项重复提交/活动任务/积分恢复/跨会话防误验门禁测试及Python语法检查通过；npm run cases:check检查618条，issues=0。原始run/messages、带签名链接及完整MP4只留reports，不复制进公共文档。']
(req/report).write_text('\n'.join(paragraphs)+'\n',encoding='utf-8')
summary=f'2026-11-18最新：ERYE199-069～075生产原生卡片已实跑6 Passed / 1 Failed，7条接入AUTO。071译文模式在编辑器仍显示双语，实际成片仅中文；已存原图和本地缺陷，未提交云效。074清理44.744秒、075高光30秒与本轮原片区间对应。当前142条：38 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 73 Not Run；其他135条及云效关联保持。以下旧统计按日期保留历史。'
def prepend(path,body):
 text=path.read_text(encoding='utf-8');block=f'<!-- {marker} -->\n{body}\n<!-- /{marker} -->\n\n'
 pattern=rf'<!-- {marker} -->.*?<!-- /{marker} -->\s*';text=re.sub(pattern,'',text,flags=re.S);path.write_text(block+text,encoding='utf-8')
for rel in ['AGENTS.md','docs/testing-progress.md','docs/verification.md','docs/codex-context.md']:
 link=('docs/'if rel=='AGENTS.md'else'')+'cases/requirements/ERYE-199/'+report
 prepend(root/rel,summary+f'\n\n[本轮逐例结果、截图与复现]({link})。仅页面业务和实际文件验收；无computer-use、云效写入或Git推送。')
for name in ['cases.md','execution-status-current.md','coverage-overview.md']:
 prepend(req/name,summary+f'\n\n[本轮报告]({report}) · [七条结构化结果](execution-status-069-075-production-20261118.json)。')
# Update actual case table registration only, not expectations of unrelated cases.
cp=req/'cases.md';text=cp.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:];pattern=rf'^\| {e["id"]} \|.*$'
 text=re.sub(pattern,lambda m:m[0].replace('| [PLAN] | — | Not Run；',f'| [AUTO] | `{script}#{cid}` | {e["status"]}；'),text,flags=re.M)
text=text.replace('48条均Not Run、自动化PLAN，未执行。完整前置P','069～075已接入AUTO并完成本轮实跑，076～116共41条仍PLAN/Not Run。完整前置P').replace('所有条目继承P、O；表中步骤为未来获授权后执行，当前均Not Run。手工用例脚本为“—”，不得因为只读浏览器观察将自动化改AUTO。','所有条目继承P、O；069～075见本轮执行报告，076～116仍待授权执行。手工用例脚本为“—”，不得因为只读浏览器观察将自动化改AUTO。')
text=text.replace('选择页面支持的2倍档；其他默认','页面支持时选择2倍档，否则用下列完整指令指定2倍；其他默认').replace('P；F20；E参数；当前卡片支持2倍档','P；F20；E参数；页面提供2倍档时选择，否则由完整提示词指定').replace('1. 进入画质增强卡片并选择2倍。','1. 进入画质增强卡片；有2倍档则选择，无独立档位则保留下列完整2倍提示词。')
text=text.replace('E/C/H/G/I的入口存在已观察；本次未生成它们的结果，故不把未核验的轨道结构写成强制三轨或五轨。','E/C/H已在本批069～075中通过原生任务核验，G/I仅入口观察，未生成其结果；不把未核验的轨道结构写成强制三轨或五轨。')
cp.write_text(text,encoding='utf-8')
rp=root/'docs/cases/registry.yaml';text=rp.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:];pattern=rf'(?m)^{e["id"]}:\n.*?(?=^\S|\Z)'
 def repl(m):
  block=m[0].replace('status: PLAN','status: AUTO').replace('script: ""',f'script: "{script}#{cid}"').replace('execution_status: "Not Run"',f'execution_status: "{e["status"]}"')
  block=re.sub(r'(?m)^  (automation_command|execution_report|execution_note):.*\n','',block)
  return block+f'  automation_command: "{command(cid)}"\n  execution_report: "docs/cases/requirements/ERYE-199/{report}"\n  execution_note: "{e["actual"]}"\n'
 text=re.sub(pattern,repl,text,flags=re.S)
text=text.replace('# ERYE-199 多轨补充069～116；未执行，不提供自动化命令','# ERYE-199 多轨补充；069～075有独立分阶段Ego执行器，076～116保持PLAN')
rp.write_text(text,encoding='utf-8')
meta=req/'meta.yaml';text=meta.read_text(encoding='utf-8');values={'status':'testing','latest_execution_report':f'"{report}"','execution_status':'"active142;38 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 73 Not Run"','case_revision_note':'"069～075原生卡片实跑6P/1F；073按当前卡片以完整指令指定2倍，原始参数选择目标留历史"','current_version_scope':'"active142;069-075 AUTO executed;076-148 PLAN/Not Run;other135 unchanged"'}
for key,value in values.items():text=re.sub(rf'(?m)^{key}:.*$',f'{key}: {value}',text)
meta.write_text(text,encoding='utf-8')
# Keep the unified entry limited to definitions and commands, no results or counts.
entry=root/'docs/cases/README.md';text=entry.read_text(encoding='utf-8');text=text.replace('新增定义自动化PLAN，映射见[需求登记](registry.yaml)，无自动化执行命令。','069～075使用[原生卡片分阶段脚本](../../tools/editor/erye199/workflow-cards.mjs)，命令和检查点续跑见[自动化说明](requirements/ERYE-199/automation.md)；076～116保持PLAN，映射见[需求登记](registry.yaml)。');entry.write_text(text,encoding='utf-8')
for path in [req/'automation.md',root/'tools/editor/erye199/README.md']:
 prefix='../../../../'if path.parent==req else''
 body=f'069～075已接入独立分阶段原生卡片执行器 `{runner}` / `{script}`。001～068的旧run.mjs不接受这些编号，不要套用旧命令。076～148保持PLAN，无执行器。新批次按prepare-workflow-media.py准备F20/F60/media.json，读技能后在同一已有TaskSpace内依次open→configure→upload→submit（只一次）→observe；074/075等待确认时先核对方案，再confirmReview→observe→verify→download，074/075再mapping。实际产物用audit-workflow-product.py核验，074/075另用audit-card-source-mapping.py核验。最后用archive-workflow-cards.py归档，保留其他135条结果。\n\n已有本批检查点只可observe/resume/verify；每次等待上一浏览器命令进程结束再下一动作。071仅在用户已补充积分且原run为insufficient_credits终态时用restart --reason credits-restored另建独立新尝试，禁止重发旧任务。\n\n```powershell\n{command("074")}\n{command("074","resume")}\n{command("074","verify")}\nnode --test tools/editor/erye199/workflow-cards.test.mjs\n```\n\n上述space6属于本批检查点，换电脑/新批次必须使用真实新TaskSpace和报告目录；不能复制旧报告伪装重跑。完整本轮结果见需求目录的'+report+'。'
 prepend(path,body)
co=req/'coverage-overview.md';text=co.read_text(encoding='utf-8').replace('069～116的48条及本次117～148的32条均待执行，原已执行结果保持。','069～075已接入执行器，076～148共73条待执行；具体结果见当前进度，原已执行结果保持。');co.write_text(text,encoding='utf-8')
print(json.dumps({'batch':batchcounts,'current':master['counts'],'preservedOtherCases':len(others),'report':str(req/report)},ensure_ascii=True))
