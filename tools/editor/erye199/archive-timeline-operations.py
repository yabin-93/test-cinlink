"""Archive 081-085 only after all required native variants have real results."""
from pathlib import Path
from collections import Counter
import argparse,json,copy,re,shutil
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(a.report).resolve();D=R/'docs/cases/requirements/ERYE-199'
REPORT='results-081-085-production-20261118.md';EV='evidence-081-085-production-20261118';MARKER='ERYE199-TIMELINE-081085-EXEC-20261118'
SCRIPT='tools/editor/erye199/timeline-operations.mjs';RUNNER='tools/editor/erye199/run-timeline-operations.mjs'
profiles=['S0','S1','T1','T2','E','C','H','G'];keys=['081-T1','082-S1','082-T1']+[f'{cid}-{pr}-{op}'for cid in ['083','084','085']for pr in profiles for op in (['trim-head','trim-tail']if cid=='085'else['split'if cid=='083'else'move'])]
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def note(p,body):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S);p.write_text(f'<!-- {MARKER} -->\n{body}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
def fmt(c):return' / '.join(f'{v} {k}'for k,v in c.items())
def raw_dir(key):
 attempt=state.get('attempts',{}).get(key,1)
 return O/key/f'attempt-{attempt}'if attempt>1 else O/key
def findings(key,e):
 if not e.get('failures'):return'通过全部指定步骤'
 result=[]
 for c in e.get('checks',[]):
  if c.get('passed',True):continue
  if c['name']=='原生轨道组合':result.append(f'原生轨道实际{len(c["actual"])}条，预期{e["definition"]["expectedRows"]}条')
  elif c['name']=='字幕原声译声和同轨非目标保持':
   affected=c.get('actual')if isinstance(c.get('actual'),list)else[]
   if not affected and (raw_dir(key)/'operation-before.json').exists()and (raw_dir(key)/'operation-after.json').exists():
    original=read(raw_dir(key)/'operation-before.json')['content']['tracks'];edited=read(raw_dir(key)/'operation-after.json')['content']['tracks'];excluded={e.get('videoTrackId'),e.get('nativeBgmTrackId')}
    def audible_ranges(t):return[{k:v for k,v in clip.items()if k!='speech_source'}for clip in t.get('clips',[])]
    affected=[t for t in original if t['track_id']not in excluded and audible_ranges(t)!=audible_ranges(next((a for a in edited if a['track_id']==t['track_id']),{}))]
   for t in affected:
    role={'source':'原声','narration':'译声','background':'BGM/独立音频'}.get(t.get('role'),t.get('type','其他轨'))
    op={'split':'分割','move':'平移','trim-head':'裁头','trim-tail':'裁尾'}.get(e.get('operation'),'修改');result.append(role+'被连带'+op)
   if not affected:result.append(c['name'])
  elif key=='081-T1'and c['name'].startswith('原生BGM移动不改变'):result.append('原生BGM移动1秒时原声也从0秒移到1秒，其他独立声音保持')
  else:result.append(c['name'])
 before_file=raw_dir(key)/'operation-before.json';after_file=raw_dir(key)/'operation-after.json'
 if e.get('target')and before_file.exists()and after_file.exists():
  before=read(before_file);after=read(after_file);v=next(t for t in before['content']['tracks']if t['track_id']==e['videoTrackId']);actual=next(t for t in after['content']['tracks']if t['track_id']==e['videoTrackId'])
  for i,c in enumerate(v['clips']):
   if i==e['target']['index']:continue
   other=next((x for x in actual['clips']if x['clip_id']==c['clip_id']),None)
   if other and abs(other['timeline_start_sec']-c['timeline_start_sec'])>.001:result.append('同轨非目标视频片段也发生位移');break
 return'、'.join(dict.fromkeys(result))
state=read(O/'execution.json');assert set(keys)<=set(state['cases']),'Required native variant missing'
for key in keys:
 e=state['cases'][key];assert e['stage']in ['Executed','Prerequisite failed']and e['status']in ['Passed','Failed','Blocked'],key+' not finished'
 assert e.get('runStatus')in ['done','failed','cancelled','canceled','terminated'],key+' original task not terminal'
 if e['stage']=='Executed'and not key.startswith('082-'):assert e.get('uiPersistVerifiedAt'),key+' actual reopened UI ranges not verified'
 if key.startswith('083-')and e['stage']=='Executed':assert any(c['name']=='连续预览跨越切点前后各1秒'for c in e.get('checks',[])),key+' full cross-cut playback incomplete'
assert any(c['name']=='native-BGM-redo'for c in state['cases']['081-T1']['checks']),'081 restore/redo verification incomplete'
source_audit=read(O/'completed-source-audit.json');assert source_audit['checked']==35 and not source_audit['mismatches'],'Complete original-material audit first'
write(D/EV/'source-audit.json',source_audit)
old=read(D/'execution-status-20261113.json')
assert not any(c.get('defect',{}).get('verified')for c in old['cases']if c['id']in ['ERYE199-'+i for i in ['081','082','083','084','085']]),'Later cloud receipt exists; do not overwrite'
assert all(c['status']=='Not Run'or c.get('latest_execution_batch')==O.name for c in old['cases']if c['id']in ['ERYE199-'+i for i in ['081','082','083','084','085']]),'A different execution batch has newer results; do not overwrite'
evidence={};rounds={}
def business_tracks(doc):
 tracks=[]
 for t in doc.get('content',{}).get('tracks',[]):
  tracks.append({k:t[k]for k in ['track_id','type','role','muted','visible','linked_video_track_id']if k in t}|{'clips':[{k:c[k]for k in ['clip_id','file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume','opacity','transform','text']if k in c}for c in t.get('clips',[])]})
 return tracks
for key in keys:
 e=state['cases'][key];target=D/EV/key;target.mkdir(parents=True,exist_ok=True);evidence[key]=[]
 wanted=['before-submit.png','baseline-verified.png','verified.png','operation-verified.png','failure.png','failure-after-reopen.png','saved-ui-range-verified.png','history-verified.png','history-refreshed-verified.png','cross-split-playback.png','review-adjusted-30s.png','move-preparation-ready.png']
 if key=='081-T1':wanted+=['D-placed.png','B-placed.png','independent-music-plus1.png','native-BGM-plus1.png']
 for name in wanted:
  src=raw_dir(key)/name
  if src.is_file():shutil.copy2(src,target/name);evidence[key].append(f'{EV}/{key}/{name}')
 if e.get('stage')=='Prerequisite failed'and (raw_dir(key)/'baseline-failure.png').is_file():
  shutil.copy2(raw_dir(key)/'baseline-failure.png',target/'baseline-failure.png');evidence[key].append(f'{EV}/{key}/baseline-failure.png')
 detail={'key':key,'status':e['status'],'stage':e['stage'],'prompt':e['definition']['prompt'],'card':e['definition']['card'],'language':e['definition'].get('language'),'subtitle_mode':e['definition'].get('mode'),'conversation_id':e.get('conversationId'),'run_id':e.get('runId'),'editor_id':e.get('editorId'),'source_sha256':e.get('source',{}).get('sha256'),'checks':e.get('checks',[]),'failures':e.get('failures',[]),'unexecuted':e.get('unexecuted',[]),'target':e.get('target'),'audio':e.get('audio'),'observer_adjustments':e.get('observerAdjustments',[]),'known_issue_observed':e.get('knownIssueObserved')}
 for name in ['operation-before','operation-after','undo-restores-baseline','redo-restores-edit','native-BGM-plus1-before','native-BGM-plus1-after','independent-music-plus1-before','independent-music-plus1-after','move-preparation-before','move-preparation-after','review-adjustment-before','review-adjustment-after']:
  f=raw_dir(key)/(name+'.json')
  if f.exists():detail[name]=business_tracks(read(f))
 detail['native_visible_tracks']=e.get('initialShape',[])
 detail['native_preparation_adjustment']={'intent':e.get('reviewAdjustmentIntent'),'actual_duration':e.get('reviewAdjustedTo')}
 detail['move_space_preparation']={'intent':e.get('movePreparationIntent'),'completed_at':e.get('movePreparationCompletedAt')}
 detail['attempt_number']=e.get('attemptNumber',state.get('attempts',{}).get(key,1))
 detail['preparation_history']=[{'run_id':h.get('runId'),'conversation_id':h.get('conversationId'),'status':h.get('status'),'error':h.get('runError')}for h in state.get('caseHistory',{}).get(key,[])]
 for i,h in enumerate(detail['preparation_history'],1):
  historical=O/key/('environment-credits-blocked.png'if i==1 else f'attempt-{i}/environment-credits-blocked.png')
  if historical.exists():
   archived=target/'history'/f'attempt-{i}-credits-blocked.png';archived.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(historical,archived)
   h['screenshot']=f'{EV}/{key}/history/{archived.name}';evidence[key].append(h['screenshot'])
 write(target/'verification.json',detail);evidence[key].append(f'{EV}/{key}/verification.json');rounds[key]=detail
entries=[]
for cid in ['081','082','083','084','085']:
 group=[k for k in keys if k.startswith(cid)];variants=[state['cases'][k]for k in group];counts=dict(Counter(e['status']for e in variants));status='Failed'if counts.get('Failed')else'Blocked'if counts.get('Blocked')else'Passed'
 actual='；'.join(f'{k}:{state["cases"][k]["status"]}（{findings(k,state["cases"][k])}）'for k in group)
 entries.append({'id':'ERYE199-'+cid,'status':status,'automation':'AUTO','automation_status':'AUTO','script':SCRIPT+'#'+cid,'automation_command':f'node tools/editor/erye199/run-timeline-case.mjs --case {cid} --space 8 --report reports/{O.name}','actual':actual,'variant_counts':counts,'variants':[rounds[k]for k in group],'evidence':[x for k in group for x in evidence[k]],'screenshots':[x for k in group for x in evidence[k]if x.endswith('.png')],'environment':'production','latest_execution_report':REPORT,'latest_execution_batch':O.name,'current_failure_cloud_status':'Not submitted; execution only'})
request_count=len({e.get('runId')for e in state['cases'].values()if e.get('runId')}|{e.get('runId')for history in state.get('caseHistory',{}).values()for e in history if e.get('runId')})
batchcounts=dict(Counter(e['status']for e in entries));batch={'date':'2026-11-18','resumed_at':state.get('resumedAt'),'environment':'production','counts':batchcounts,'variant_counts':dict(Counter(state['cases'][k]['status']for k in keys)),'native_variant_count':35,'native_preparation_request_count':request_count,'cases':entries,'report':REPORT,'cloud_writes':0}
write(D/'execution-status-081-085-production-20261118.json',batch)
interim=D/'execution-status-081-085-in-progress-20261118.json'
if interim.exists():
 snapshot=read(interim);snapshot.update(stage='Historical interim snapshot; batch completed',superseded_by='execution-status-081-085-production-20261118.json');write(interim,snapshot)
master=copy.deepcopy(old);ids={e['id']for e in entries}
if not(O/'before-master-status.json').exists():write(O/'before-master-status.json',old)
for e in entries:next(c for c in master['cases']if c['id']==e['id']).update(e)
for c in master['cases']:
 if c['id']in ids:c.pop('ongoing_execution_report',None);c['execution_in_progress']=False;c['execution_complete']=True
master.pop('ongoing_execution',None)
for c in master['cases']:
 if c['id']not in ids:assert c==next(x for x in old['cases']if x['id']==c['id'])
assert next(c for c in master['cases']if c['id']=='ERYE199-078')['defect']['id']=='FWXC-694'
assert next(c for c in master['cases']if c['id']=='ERYE199-071')['defect']['id']=='FWXC-693'
master.update(counts=dict(Counter(c['status']for c in master['cases'])),updated='2026-11-19',latest_execution_report=REPORT,latest_automation_execution_report=REPORT,latest_task_space=8,stage='081-085 production execution completed',note='081～085本轮按卡片和操作分别记录；其他137条及既有缺陷关联保持。086～148共63条待执行。')
write(D/'execution-status-20261113.json',master)
multi=read(D/'execution-status-multitrack-20261118.json')
for e in entries:next(c for c in multi['cases']if c['id']==e['id']).update(e)
for c in multi['cases']:
 if c['id']in ids:c.pop('ongoing_execution_report',None);c['execution_in_progress']=False;c['execution_complete']=True
multi.pop('ongoing_execution',None)
multi.update(scope='069～085已执行；086～116待执行',counts=dict(Counter(c['status']for c in multi['cases'])),automationCounts=dict(Counter(c['automation']for c in multi['cases'])),latest_execution_report=REPORT,fixtureReadiness='F20/F60/D及独立B已准备，逐例原生卡片准备。');write(D/'execution-status-multitrack-20261118.json',multi)
summary=f'2026-11-18～19：ERYE199-081～085生产实跑{fmt(batchcounts)}，5条接入AUTO；按35个原生轮次/卡片操作变体逐项记录，结果{fmt(batch["variant_counts"])}。当前142条{fmt(master["counts"])}；其他137条和071/FWXC-693、078/FWXC-694保持。失败截图已保存，本批未提交云效。以下旧统计按日期保留历史。'
lines=['# ERYE199-081～085生产执行结果（2026-11-18～19）','',summary,'',f'专用项目 `{state["workspaceName"]}` / `{state["workspaceId"]}`；生产Ego Lite有头，TaskSpace8。用户已选择测试目录，本批显式选用对应夹具，不分析整个目录。083～085每个卡片/裁剪边缘分别新会话准备原生工程，082两轮按要求同会话。未通过API写工程，不重发已受理任务。','', '[当前进度](execution-status-current.md) · [结构化结果](execution-status-081-085-production-20261118.json) · [自动化说明](automation.md)','','| 用例 | 结果 | 变体结果 |','|---|---|---|']
for e in entries:lines.append(f'| {e["id"]} | {e["status"]} | {fmt(e["variant_counts"])} |')
lines+=['','## 实际执行步骤及证据','','前置、完整提示词与预期沿用[第十五章](cases.md#erye199-card-multitrack)。每变体记录独立原生会话/run/工程和输入哈希；中点分割、主体＋1秒、裁头/尾0.5秒分别核验目标、原生BGM和非目标隔离，再核验撤销、重做及刷新。未完成准备的依赖步骤明确列出，不以其他基线代跑。','',f'本批于11月18日开始，11月19日收到补积分确认后续跑，共35个逻辑变体、{request_count}个已受理准备请求。085-T2裁尾首次准备因积分不足终态失败，确认原会话没有后续重试后才重新准备；旧失败及截图保留，重试证据单列attempt-2，已完成变体没有重新生成。','',f'[35个变体素材对应核验]({EV}/source-audit.json)：均对应本轮上传原片或明确的本轮生成产物，没有串用旧产物。','']
for cid in ['081','082','083','084','085']:
 lines +=[f'## ERYE199-{cid}','','| 变体 | 结果 | 失败/未执行 | 证据 |','|---|---|---|---|']
 for key in [k for k in keys if k.startswith(cid)]:
  e=state['cases'][key];screens=[x for x in evidence[key]if x.endswith('.png')];primary=next((x for x in screens if x.endswith('failure-after-reopen.png')),next((x for x in screens if x.endswith('failure.png')),screens[-1]if screens else''));lines.append(f'| {key} | {e["status"]} | '+findings(key,e)+('；未执行：'+'、'.join(e['unexecuted'])if e.get('unexecuted')else'')+f' | [核验记录]({EV}/{key}/verification.json)'+(f' · [原图]({primary})'if primary else'')+' |')
 lines +=['']
lines+=['## 验收及观察边界','','以页面业务结果验收：原生声音角色由本次产物、真实源文件和实际操作区分，不要求开发采用特定关联字段。辅助语音稿索引在重入时从cue变voice但声音文件、时码及显示均未变化，不据此判失败。画布/缩略图占位及编辑区恢复的观察时序修正保留原始记录，不冒充产品缺陷。081首次音乐行位于裁切区，修正时间轴可见范围后在原任务中恢复并重验；正式证据使用修正后的业务结果。','','已知FWXC-693译文预览差异另列保留，本批时间编辑与隔离结果不表示该缺陷修复。播放依据真实预览位置推进、声音源与时间范围保存；不冒充人工逐句听审。操作变体不要求额外导出，不把任务原成片当编辑后导出。统一入口仅维护定义、脚本、命令导航，不写执行统计。']
(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
for name in ['cases.md','execution-status-current.md','coverage-overview.md']:note(D/name,summary+f' [逐项结果和截图]({REPORT})。')
for rel,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:note(R/rel,summary+f' [本轮报告]({prefix+REPORT})。')
path=D/'cases.md';s=path.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:]
 def change_case(m):
  cells=[c.strip()for c in m[0].strip().strip('|').split('|')];hint=cells[8].split('；',1)[-1];cells[6]='[AUTO]';cells[7]=f'`{SCRIPT}#{cid}`';cells[8]=e['status']+'；'+hint;return'| '+' | '.join(cells)+' |'
 s=re.sub(rf'(?m)^\| {e["id"]} \|.*$',change_case,s)
s=s.replace('069～080已接入AUTO并完成实跑，081～116共36条仍PLAN/Not Run。','069～085已接入AUTO并完成实跑，086～116共31条仍PLAN/Not Run。').replace('069～080见各批执行报告，081～116仍待执行。','069～085见各批执行报告，086～116仍待执行。');path.write_text(s,encoding='utf-8')
text=path.read_text(encoding='utf-8').replace('069～080已完成实跑；081～085已接入AUTO、当前执行中；086～116共31条仍PLAN/Not Run。','069～085已接入AUTO并完成实跑，086～116共31条仍PLAN/Not Run。').replace('069～080见各批执行报告；081～085见本轮执行中报告；086～116仍待执行。','069～085见各批执行报告，086～116仍待执行。');path.write_text(text,encoding='utf-8')
path=D/'coverage-overview.md';s=path.read_text(encoding='utf-8').replace('069～080已有最终实跑记录；081～085执行中，086～148共63条待执行；','069～085已有最终实跑记录；086～148共63条待执行；');path.write_text(s,encoding='utf-8')
path=R/'docs/cases/registry.yaml';s=path.read_text(encoding='utf-8')
for e in entries:
 cid=e['id'][-3:];pattern=rf'(?m)^{e["id"]}:\n[\s\S]*?(?=^\S|\Z)'
 def change(m):
  block=m[0].replace('status: PLAN','status: AUTO').replace('script: ""',f'script: "{SCRIPT}#{cid}"').replace('execution_status: "Not Run"',f'execution_status: "{e["status"]}"');block=re.sub(r'(?m)^  (automation_command|execution_report|execution_note|execution_in_progress):.*\n','',block)
  return block+f'  automation_command: "{e["automation_command"]}"\n  execution_report: "docs/cases/requirements/ERYE-199/{REPORT}"\n  execution_note: "按本轮完整参数矩阵记录，{fmt(e["variant_counts"])}；查看报告及实际截图，不代表其他变体或旧缺陷已修复。"\n'
 s=re.sub(pattern,change,s,count=1)
path.write_text(s,encoding='utf-8')
path=D/'meta.yaml';s=path.read_text(encoding='utf-8')
for k,v in {'latest_execution_report':REPORT,'execution_status':'active142;'+fmt(master['counts']),'current_version_scope':'069-085 AUTO executed;086-148 PLAN/Not Run;other137 preserved','case_revision_note':'081-085 production native matrix completed;existing defect links preserved'}.items():s=re.sub(rf'(?m)^{k}:.*$',lambda _:k+': '+json.dumps(v,ensure_ascii=False),s)
path.write_text(s,encoding='utf-8')
write(O/'archive-verification.json',{'batch':batchcounts,'variants':batch['variant_counts'],'preservedOtherCases':137,'counts':master['counts'],'report':REPORT});print(json.dumps({'batch':batchcounts,'variants':batch['variant_counts'],'current':master['counts'],'preservedOtherCases':137}))
