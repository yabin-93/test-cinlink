"""Archive actual native 076-080 execution; preserve all other results/defects."""
from pathlib import Path
from collections import Counter
import argparse,json,copy,re,shutil,hashlib
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(a.report).resolve();D=R/'docs/cases/requirements/ERYE-199'
REPORT='results-076-080-production-20261118.md';EV='evidence-076-080-production-20261118';MARKER='ERYE199-COMBINATIONS-076080-EXEC-20261118'
SCRIPT='tools/editor/erye199/workflow-combinations.mjs';RUNNER='tools/editor/erye199/run-workflow-combinations.mjs'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def note(p,body):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S);p.write_text(f'<!-- {MARKER} -->\n{body}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
state=read(O/'execution.json');keys=['076','077','078-S0','078-S1','078-T2','079','080']
prior=read(D/'execution-status-20261113.json');prior078=next(c for c in prior['cases']if c['id']=='ERYE199-078')
if prior078.get('defect',{}).get('verified'):raise SystemExit('078已有后续云效关联，禁止旧执行归档覆盖；未写任何文件。')
def fmt(counts):return ' / '.join(f'{v} {k}'for k,v in counts.items())
for key in keys:
 e=state['cases'][key];assert e['runStatus']=='done',key+' original run not completed'
 assert e['stage']==('Historical verified'if key.startswith('078-')else'Six tracks verified'if key in ['079','080']else'UI verified'),key+' UI verification incomplete'
 product=read(O/key/'product-verification.json');assert not product['failures'],key+' actual file check unresolved'
evidence={}
for key in keys:
 e=state['cases'][key];target=D/EV/key;target.mkdir(parents=True,exist_ok=True);evidence[key]=[]
 for f in sorted((O/key).iterdir()):
  selected=(f.name in ['before-submit.png','ui-verified.png','image-editor-verified.png','baseline-verified.png','six-tracks-verified.png','historical-verified.png','D-registered-no-placement.png','image-editor-observation.json','editor-observation.json','configuration.json','source-mapping.json','historical-verification.json','D-registration.json','D-verification.json','D-position-adjustment.json','product-verification.json']or re.fullmatch(r'(preview|product-frame|isolated)-[\w.]+\.(png|json)',f.name))
  if e.get('failures')and f.name in ['baseline-failure.png','failure.png','historical-failure.png','failure-all-tracks.png']:selected=True
  if selected:shutil.copy2(f,target/f.name);evidence[key].append(f'{EV}/{key}/{f.name}')
 e['status']='Failed'if e.get('failures')else'Passed';e['latestReport']=REPORT
write(O/'execution.json',state)
descriptions={
 '076':'无参考生成红杯视频，5秒/1280×720；本轮独立工程的视频与原生音频对应生成结果，预览播放、重入及刷新通过，无旧F20/字幕/译配混入。',
 '077':'无参考生成白底蓝杯图片1024×1024；打开本次图片画布及版本，重入/刷新保持；未混入视频时间轴，原图下载有效。',
 '078':'同一会话三轮均重新附加原F20，源视频身份及原音/译声对应；历史三个独立工程内容未被覆盖。但S1出现2条字幕/视频/原声共4轨，T2出现2条字幕/视频/原声/配音/BGM共6轨，均多出前轮英文字幕。整例Failed。',
 '079':'T1五类原生内容加独立D，登记不自动放入；D唯一实例6～18秒、源0～12秒且无视频关联，四种声音分别播放并恢复，原生内容/绑定/位置/启用及刷新重入保持。D页面也标“背景音乐”，按源及无视频关联识别；译文双语预览已知FWXC-693单列，未宣称已修复。',
 '080':'T2原生五类内容加独立D形成六类组合；D唯一实例位于6～18秒、源0～12秒且无视频关联；四种声音分别播放，双语和原生五类绑定/位置/启用保持，保存重入/刷新通过。D页面名称同为“背景音乐”，按源文件和范围区分。',
}
entries=[]
for cid in ['076','077','078','079','080']:
 group=[k for k in keys if k.startswith(cid)];runs=[state['cases'][k]for k in group];status='Failed'if any(e.get('failures')for e in runs)else'Passed';ev=[x for k in group for x in evidence[k]]
 cmd=f'node {RUNNER} --case {"078-T2"if cid=="078"else cid} --action {"verifyHistory"if cid=="078"else"resume"} --space 7 --report reports/erye199-076-080-production-20261118'
 entry={'id':'ERYE199-'+cid,'status':status,'automation':'AUTO','automation_status':'AUTO','script':SCRIPT+'#'+cid,'automation_command':cmd,'actual':descriptions[cid],'evidence':ev,'screenshots':[x for x in ev if x.endswith('.png')],'latest_execution_report':REPORT,'latest_execution_batch':O.name,'environment':'production','rounds':[{'key':k,'prompt':state['cases'][k]['definition']['prompt'],'conversation_id':state['cases'][k]['conversationId'],'run_id':state['cases'][k]['runId'],'editor_id':state['cases'][k].get('editorId'),'source_sha256':state['cases'][k]['source'].get('sha256'),'checks':state['cases'][k]['checks'],'failures':state['cases'][k].get('failures',[]),'history':state['cases'][k].get('history'),'D_verification':state['cases'][k].get('DVerification')}for k in group]}
 if cid=='078':entry.update(local_defect='../../../defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md',current_failure_cloud_status='Not submitted; this execution did not request cloud sync')
 if cid=='079':entry['known_issue_observed']={'id':'FWXC-693','scope':'已有译文显示问题仍存在；本例只将独立D的注册、放入、六类隔离和持久化判Passed，不表示该缺陷已修复。','observations':runs[0].get('knownDisplayDifference',[])}
 entries.append(entry)
counts=dict(Counter(x['status']for x in entries));batch={'date':'2026-11-18','environment':'production','base_url':state['baseURL'],'task_space':7,'counts':counts,'cases':entries,'original_runs':7,'clarifications':'本批七个请求均未出现补槽；无重发','cloud_writes':0,'report':REPORT};write(D/'execution-status-076-080-production-20261118.json',batch)
master_path=D/'execution-status-20261113.json';master=read(master_path);old=copy.deepcopy(master);ids={e['id']for e in entries}
backup=O/'before-master-status.json'
if not backup.exists():write(backup,master)
for e in entries:next(c for c in master['cases']if c['id']==e['id']).update(e)
for c in master['cases']:
 if c['id']not in ids:assert c==next(x for x in old['cases']if x['id']==c['id'])
assert next(c for c in master['cases']if c['id']=='ERYE199-071')['defect']['id']=='FWXC-693'
master['counts']=dict(Counter(c['status']for c in master['cases']));assert len(master['cases'])==142
master.update(updated='2026-11-18',latest_execution_report=REPORT,latest_automation_execution_report=REPORT,latest_task_space=7,stage='076-080 production execution completed',note='076～080本轮完成；其他137条结果、071/FWXC-693及既有缺陷关联保持。081～148共68条待执行。');write(master_path,master)
multi=read(D/'execution-status-multitrack-20261118.json')
for e in entries:next(c for c in multi['cases']if c['id']==e['id']).update(e)
multi.update(scope='069～080已实跑；081～116待执行',counts=dict(Counter(c['status']for c in multi['cases'])),automationCounts=dict(Counter(c['automation']for c in multi['cases'])),latest_execution_report=REPORT,fixtureReadiness='F20/D已准备；F60沿用上一批，B未为后续用例准备');write(D/'execution-status-multitrack-20261118.json',multi)
fixture_dir=D/EV/'fixtures';fixture_dir.mkdir(parents=True,exist_ok=True);media=read(O/'media.json');manifest={}
for key in ['F20','D']:
 f=Path(media[key]['path']);assert hashlib.sha256(f.read_bytes()).hexdigest()==media[key]['sha256'];shutil.copy2(f,fixture_dir/f.name);manifest[key]={'name':f.name,'sha256':media[key]['sha256'],'duration':media[key]['probe']['format']['duration'],'note':'D为Microsoft Huihui合成QA语音，非真实人物声音'if key=='D'else'英语原片、低音量乐床和源时钟'}
write(fixture_dir/'manifest.json',manifest)
summary=f'2026-11-18：ERYE199-076～080生产实跑{fmt(counts)}，5条接入AUTO；当前142条{fmt(master["counts"])}。078同会话切换后字幕轨多出：S1实际4轨、T2实际6轨；原片及历史工程身份保持，失败截图与本地缺陷已保存，未提交云效。079的D流程通过，已知FWXC-693译文显示问题另列未修复。其他137条及原云效关联保持。以下旧统计按日期保留历史。'
lines=['# ERYE199-076～080生产执行结果（2026-11-18）','',f'本轮5条：**{fmt(counts)}**。当前142条：{fmt(master["counts"])}。7个原生任务均已完成，没有补槽或重发。未写云效。','',f'生产有头Ego Lite 0.6.3.14，TaskSpace7；本批项目 `{state["workspaceName"]}` / `{state["workspaceId"]}`。用户选择其他测试目录后，本批只为当前用例显式上传所需F20/D，未分析整个目录。076/077/079/080为独立新会话；078三轮同一会话、每轮重新选择源片。所有业务修改通过原生页面执行，没有API写工程。','',f'[结构化结果](execution-status-076-080-production-20261118.json) · [当前进度](execution-status-current.md) · [自动化说明](automation.md) · [原片及D素材清单]({EV}/fixtures/manifest.json)','', '| 用例 | 结果 | 业务核验 |','|---|---|---|']
for e in entries:lines.append(f'| {e["id"]} | {e["status"]} | {e["actual"]} |')
lines+=['','## 078逐轮原文与失败证据','','三轮会话 `'+state['cases']['078-S0']['conversationId']+'`。每轮附件F20的受理哈希一致，时间轴视频源仍为原F20；不是拿前轮成片继续处理。三个工程ID不同，历史重开后的内容与各轮基线相同。','', '| 轮次 | 完整提示词 | 实际/预期可见轨数 | 原图与身份 |','|---|---|---|---|']
for key,expected in [('078-S0',3),('078-S1',3),('078-T2',5)]:
 e=state['cases'][key];lines.append(f'| {key} | {e["definition"]["prompt"]} | {len(e["initialShape"])} / {expected} | [10秒预览]({EV}/{key}/preview-10.png) · [历史重开]({EV}/{key}/historical-verified.png) · [源映射]({EV}/{key}/source-mapping.json) |')
lines+=['',f'![S1多出英文字幕轨]({EV}/078-S1/failure-all-tracks.png)',f'![T2六轨]({EV}/078-T2/failure-all-tracks.png)','','[详细缺陷与可复现步骤](../../../defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md)。本轮仅本地记录，未提交云效。','','## 076/077生成入口','','076无参考输入，页面5秒/16:9/720P原文生成红杯；实际下载5.000秒1280×720、有原生音频；编辑器打开本轮结果并可播放、重入、刷新。077无参考输入，1K/1:1原文生成白底蓝杯，独立图片编辑器1024×1024画布及历史版本保持，不要求视频六轨。两者都经过下载、完整解码和实际画面查看。','',f'[076预览]({EV}/076/preview-0.5.png) · [076实际文件核验]({EV}/076/product-verification.json) · [077图片编辑器]({EV}/077/ui-verified.png) · [077文件核验]({EV}/077/product-verification.json)','','## 079/080独立音频及六类内容','','D为12秒、48kHz单声道PCM，Microsoft Huihui合成测试语音，以“独立音频D”开头，本地独立ASR确认可辨。通过原生媒体导入登记后，原时间轴保持；在时间轴空白区域拖入独立新轨，主体微调至6秒，源0～12秒。位置核验允许一帧舍入，实际最终起止逐例列于下方。原生五类内容保持，没有以D替换译声或原生BGM。','']
for key in ['079','080']:
 e=state['cases'][key];v=e['DVerification'];lines +=[f'### {key}',f'提示词：{e["definition"]["prompt"]}',f'原生五轨任务完成后手工导入D，不追加Agent请求。D实际{v["start"]:.3f}～{v["end"]:.3f}秒，源{v["sourceIn"]}～{v["sourceOut"]}秒，视频关联为空；原生内容保持={v["originalPreserved"]}。分别隔离播放D、原声、译声、BGM后，全部启用/静音恢复到原状态，重入与刷新通过。',f'[登记不放入]({EV}/{key}/D-registered-no-placement.png) · [最终六轨]({EV}/{key}/six-tracks-verified.png) · [声音角色和源范围]({EV}/{key}/D-verification.json)','']
lines+=['D界面也标“背景音乐”，以原片源、12秒独立语音、无视频关联和独立控制区分；没有因显示名称相同把D误计作原生BGM。079“译文”预览仍出现英文，属于已经确认的FWXC-693；本例独立音频流程Passed不表示该问题修复。080两处中英字幕及原生五类内容在D导入后保持。','', '本批声音依据源文件/实际译配成片的独立解码与ASR，以及原生预览隔离播放和保存状态核验；不冒充人工逐句听审。079/080下载文件是原任务的译配基线成片，不是加入D后的混音导出；本用例没有要求新导出。','','## 观察和脚本边界','','原生轨数以页面可见轨道和角色验收，不把内部未显示的源字幕资料算作页面额外轨道。生成工程允许通用名称，以本轮结果绑定及实际画面核对；缩略图占位文本、图片画布加载占位及同会话详情恢复时序均已在原任务上修正观察，不作为产品失败。D微调避开音量线拖拽，最终原片与非目标内容保持。所有原始调试截图留reports，正式证据不把观察脚本失败当产品失败。','',f'5条唯一自动化实现 `{SCRIPT}`，分阶段入口 `{RUNNER}`；078必须分S0/S1/T2串行，按原run定位历史结果。不以旧run日志回放当新执行。原始run/messages和完整MP4只留本机reports；正式证据为原生截图及脱敏业务结果。']
(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
for name in ['cases.md','execution-status-current.md','coverage-overview.md']:note(D/name,summary+f' [逐例结果和截图]({REPORT})。')
for rel,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:note(R/rel,summary+f' [本轮报告]({prefix+REPORT})。')
path=D/'cases.md';s=path.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:];s=re.sub(rf'(?m)^\| {e["id"]} \|.*$',lambda m:m[0].replace('| [PLAN] | — | Not Run；',f'| [AUTO] | `{SCRIPT}#{cid}` | {e["status"]}；'),s)
s=s.replace('069～075已接入AUTO并完成本轮实跑，076～116共41条仍PLAN/Not Run。','069～080已接入AUTO并完成实跑，081～116共36条仍PLAN/Not Run。').replace('069～075见本轮执行报告，076～116仍待授权执行。','069～080见各批执行报告，081～116仍待执行。').replace('E/C/H已在本批069～075中通过原生任务核验，G/I仅入口观察，未生成其结果；不把未核验的轨道结构写成强制三轨或五轨。','E/C/H已在069～075中通过原生任务核验；G/I已在076/077完成生成及原生编辑入口核验：G为本轮生成视频和原生音频，I为独立图片画布，不强制三轨或五轨。');path.write_text(s,encoding='utf-8')
path=R/'docs/cases/registry.yaml';s=path.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:];pattern=rf'(?m)^{e["id"]}:\n[\s\S]*?(?=^\S|\Z)'
 def change(m):
  block=m[0].replace('status: PLAN','status: AUTO').replace('script: ""',f'script: "{SCRIPT}#{cid}"').replace('execution_status: "Not Run"',f'execution_status: "{e["status"]}"');block=re.sub(r'(?m)^  (automation_command|execution_report|execution_note):.*\n','',block)
  return block+f'  automation_command: "{e["automation_command"]}"\n  execution_report: "docs/cases/requirements/ERYE-199/{REPORT}"\n  execution_note: "{e["actual"]}"\n'
 s=re.sub(pattern,change,s,count=1)
path.write_text(s.replace('# ERYE-199 多轨补充；069～075有独立分阶段Ego执行器，076～116保持PLAN','# ERYE-199 多轨补充；069～080有独立分阶段Ego执行器，081～116保持PLAN'),encoding='utf-8')
path=D/'meta.yaml';s=path.read_text(encoding='utf-8');updates={'latest_execution_report':REPORT,'execution_status':'active142;'+fmt(master['counts']),'current_version_scope':'069-080 AUTO executed;081-148 PLAN/Not Run;other137 results preserved','case_revision_note':'076-080 native production batch completed;078 extra subtitle tracks failed;071/FWXC-693 preserved'}
for k,v in updates.items():s=re.sub(rf'(?m)^{k}:.*$',lambda _:k+': '+json.dumps(v,ensure_ascii=False),s)
path.write_text(s,encoding='utf-8')
path=R/'docs/cases/README.md';s=path.read_text(encoding='utf-8').replace('076～116保持PLAN，映射见','076～080使用[组合及六轨脚本](../../tools/editor/erye199/workflow-combinations.mjs)，081～116保持PLAN，映射见');path.write_text(s,encoding='utf-8')
print(json.dumps({'batch':counts,'current':master['counts'],'preservedOtherCases':137,'report':str(D/REPORT)},ensure_ascii=True))
