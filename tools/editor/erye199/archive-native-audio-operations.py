"""Archive 090 rerun and 091-095 complete native audio matrix, preserving history."""
from pathlib import Path
from collections import Counter
import argparse,json,re,shutil,copy
p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--in-progress',action='store_true');args=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(args.report).resolve();D=R/'docs/cases/requirements/ERYE-199'
REPORT='results-090-095-production-20261119.md';EV='evidence-090-095-production-20261119';MARKER='ERYE199-NATIVE-AUDIO-090095-20261119'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def note(p,text):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S);p.write_text(f'<!-- {MARKER} -->\n{text}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
fmt=lambda v:' / '.join(str(n)+' '+k for k,n in v.items())
state=read(O/'execution.json');plan=read(O/'plan.json');assert len(plan)==31
done=lambda e:e.get('stage')in ['Executed','Prerequisite failed','Unsupported']
finished={k:v for k,v in state['cases'].items()if done(v)}
if not args.in_progress:
 if(O/'followup-obligations.json').exists():assert not any(x.get('status')=='Pending'for x in read(O/'followup-obligations.json')),'Complete pending evidence/history follow-up before final archive'
 assert set(finished)=={x['key']for x in plan},'Finish every variant before final archive'
 for k,v in finished.items():
  assert v['runStatus']in ['done','failed','cancelled','canceled','terminated']
  if v['stage']=='Executed':assert v.get('uiPersistVerifiedAt'),k
  folder=O/k
  if v.get('attemptNumber',1)>1:folder=folder/('attempt-'+str(v['attemptNumber']))
  if v['stage']=='Executed':assert(folder/('failure-after-reopen.png'if v['status']=='Failed'else'verified.png')).is_file(),k+' final screenshot missing'
counts=dict(Counter(v['status']for v in finished.values()));variants={};evidence={};audit=[]
def tracks(doc):
 return[{k:t[k]for k in ['track_id','type','role','muted','visible']if k in t}|{'clips':[{k:c[k]for k in ['clip_id','file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume','opacity','transform','text']if k in c}for c in t.get('clips',[])]}for t in doc.get('content',{}).get('tracks',[])]
for item in plan:
 key=item['key'];e=state['cases'].get(key)
 if not e:continue
 source_dir=O/key
 if e.get('attemptNumber',1)>1:source_dir=source_dir/('attempt-'+str(e['attemptNumber']))
 target=D/EV/key;target.mkdir(parents=True,exist_ok=True);evidence[key]=[]
 for image in source_dir.glob('*.png'):
  if not image.name.startswith('history-supplement-')and image.name not in ['before-submit.png','baseline-verified.png','baseline-failure.png','operation-baseline.png','D-placed.png','before-split-selected-target.png','cross-verified.png','cross-failure.png','cross-refreshed.png','cross-drag-preview.png','cross-no-change.png','import-timeout.png','failure.png','operation-verified.png','failure-after-reopen.png','verified.png','split-disabled.png','missing-target.png','baseline-timeout-observation.png','playback-stall.png','wait-timeout.png','mute-stop.png','pause-race-before-recovery.png','playback-auto-end-before-recovery.png']:continue
  shutil.copy2(image,target/image.name);evidence[key].append(f'{EV}/{key}/{image.name}')
 detail={k:e.get(k)for k in ['key','id','profile','combination','targetRole','operation','status','stage','runId','conversationId','editorId','checks','failures','unexecuted','unsupportedReason','target','destinationTrackId','audio','audioPreview','playback','observerAdjustments','knownIssueObserved','beforeUI','crossUI','splitSelection','historySupplement']}
 detail['attemptNumber']=e.get('attemptNumber',1)
 detail.update(prompt=e['definition']['prompt'],card=e['definition']['card'],language=e['definition'].get('language'),subtitle_mode=e['definition'].get('mode'),source_sha256=e.get('source',{}).get('sha256'))
 for name in ['operation-baseline','operation-before','cross-after','followup-move-before','operation-after','undo-cross','redo-cross','undo-restores-baseline','redo-restores-edit','history-supplement-before','history-supplement-after','history-supplement-target-undo','history-supplement-target-redo']:
  if(source_dir/(name+'.json')).exists():detail[name]=tracks(read(source_dir/(name+'.json')))
 if state.get('caseHistory',{}).get(key):
  history=[{k:h.get(k)for k in ['status','stage','runId','conversationId','runStatus','runError','unexecuted']}for h in state['caseHistory'][key]]
  detail['preparation_history']=history;write(target/'preparation-history.json',history)
  original_failure=O/key/'failure.png'
  if original_failure.exists():historical=target/'historical-credit-failure-attempt-1.png';shutil.copy2(original_failure,historical)
 if e.get('historySupplement'):
  old=source_dir/'first-history-observation/failure-after-reopen.png'
  if old.exists():shutil.copy2(old,target/'first-history-failure-after-reopen.png')
  write(target/'first-history-observation-checks.json',{'checks':e['historySupplement'].get('originalAffectedChecks',[]),'scope':'首次临时试听恢复后下游历史核验受影响，原始记录保留；最新结果见historySupplement。'})
 text=json.dumps(detail,ensure_ascii=False);assert not re.search(r'Bearer\s+[A-Za-z0-9._-]{15,}|[?&](?:X-Amz-Signature|signature|access_token)=',text,re.I)
 write(target/'verification.json',detail);evidence[key].append(f'{EV}/{key}/verification.json');variants[key]=detail
 original=e.get('nativeBaseline')or e.get('baseline')
 if original:
  expected=next((f.get('file_id')for f in(e.get('resultFiles',[])if item['profile']=='E'else e.get('uploadedFiles',[]))if(f.get('kind')=='video'if item['profile']=='E'else f.get('name')==e['source']['name'])),None)
  video=next(t for t in original['content']['tracks']if t['type']=='video');audit.append(dict(key=key,conversation_id=e['conversationId'],run_id=e['runId'],editor_id=e['editorId'],expected_file=expected,actual_files=list(dict.fromkeys(c['file_id']for c in video['clips'])),passed=bool(expected)and all(c['file_id']==expected for c in video['clips'])))
write(D/EV/'source-audit.json',dict(checked=len(audit),mismatches=[x for x in audit if not x['passed']],variants=audit))
if not args.in_progress:
 assert all(x['passed']for x in audit)
 assert len({x['editor_id']for x in audit})==len(audit),'Do not reuse an edited native project'
summary=f'090～095生产测试'+('执行中'if args.in_progress else'已归档')+f'：31个独立卡片/组合/操作变体，已完成{len(finished)}个，当前{fmt(counts)}。'
def finding(e):
 findings=[]
 for c in e.get('checks',[]):
  if c.get('passed'):continue
  name=c['name'];actual=c.get('actual')
  if name=='非目标轨及声音保持不被误联动'and isinstance(actual,dict):
   changed=[]
   for t in actual.get('before',[]):
    other=next((x for x in actual.get('after',[])if x['track_id']==t['track_id']),{})
    def clipview(track):return [{k:v for k,v in x.items()if k not in ['clip_id','instance_id','speech_source']}for x in track.get('clips',[])]
    if clipview(t)!=clipview(other):
     independent=e.get('audio',{}).get('D',{}).get('fileId');is_d=independent and any(x.get('file_id')==independent for x in t.get('clips',[]))
     changed.append('独立D'if is_d else'视频'if t['type']=='video'else{'source':'原声','narration':'译声','background':'原生BGM'}.get(t.get('role'),t['type']))
   findings.append('误改'+'、'.join(dict.fromkeys(changed))if changed else name)
  elif name=='原生轨道组合'and isinstance(actual,list):findings.append('原生轨道组合异常（实际'+str(len(actual))+'轨：'+'、'.join(actual)+'）')
  else:findings.append(name)
 return e.get('unsupportedReason')or'、'.join(dict.fromkeys(findings))or'、'.join(dict.fromkeys(e.get('failures',[])))or('通过规定步骤'if done(e)else e.get('stage','执行中'))
lines=['# ERYE199-090～095生产测试（2026-11-19）','',summary,'',f'本轮新建项目 `{state["workspaceName"]}` / `{state["workspaceId"]}`，Ego Lite有头、TaskSpace {state["spaceId"]}。090重新执行；091～095逐一覆盖T1/T2/X1/X2及各例规定卡片，左右裁边分别使用新工程。','', '| 变体 | 结果 | 发现/未覆盖 | 证据 |','|---|---|---|---|']
for s in plan:
 k=s['key'];e=state['cases'].get(k,{})
 if not e:lines.append(f'| {k} | Not Run | 尚未开始 | — |');continue
 message=finding(e)
 if e.get('unexecuted'):message+='；未执行：'+'、'.join(e['unexecuted'])
 images=[x for x in evidence[k]if x.endswith('.png')];image=next((x for name in ['failure-after-reopen.png','failure.png','baseline-failure.png','cross-failure.png','missing-target.png','split-disabled.png','verified.png','operation-verified.png','baseline-verified.png']for x in images if x.endswith('/'+name)),images[-1]if images else'')
 lines.append(f'| {k} | {e.get("status")if done(e)else"执行中"} | {message} | [核验]({EV}/{k}/verification.json)'+(f' · [原图]({image})'if image else'')+' |')
lines+=['','各变体只操作本轮新建原生工程；普通独立D由页面导入并放入6～18秒，不用于伪造BGM或译声。BGM和视频默认双向联动；字幕、原声、译声及普通独立D保持。095只切原声，视频/BGM不得产生新切点。','','目标操作、临时静音、撤销/重做和重开均走页面；API仅只读核对。试听记录实际隔离启停、播放推进、源文件和源区间，不声称人工逐字听审；本批不额外导出。已知FWXC-693字幕显示差异单列，不以本次时间编辑通过宣称修复。','',f'[素材与工程对应核验]({EV}/source-audit.json)。本轮只执行测试，不写云效。','']
if state.get('caseHistory',{}).get('092-X1-move'):
 lines+=['092-X1首次原生准备因积分不足终止（需要200，剩余154），目标平移未执行；用户确认补充积分后另建独立会话准备，第一次记录与原图保留在该变体preparation-history.json及historical-credit-failure-attempt-1.png，不把环境阻塞截图用作后续产品失败证据。','']
if state['cases'].get('092-X2-move',{}).get('playbackRecoveryAttemptAt'):
 lines+=['092-X2首次基线播放30秒观察超时，后续页面已自行到片尾；保留原样本及观察截图，在同一未编辑工程重新定位后播放与五轨基线核验通过，再继续目标操作。未推断超时原因，未重复生成。','']
supplement=state['cases'].get('095-T1-split',{}).get('historySupplement')
if supplement and supplement.get('verified'):
 lines+=['095-T1首次临时试听恢复状态未收敛，后续目标历史检查受到影响；原始负检查及首次现场保留。已在同一恢复到原始基线的工程补核验原声分割、临时启停恢复、目标撤销/重做及重开，补核验通过；主失败“原声分割误切视频/BGM”仍复现，整例保持Failed。未重新生成任务。',f'[首次受影响检查]({EV}/095-T1-split/first-history-observation-checks.json) · [首次现场]({EV}/095-T1-split/first-history-failure-after-reopen.png) · [补核验结果]({EV}/095-T1-split/verification.json)','']
snapshot=dict(date='2026-11-19',stage='In Progress'if args.in_progress else'Completed',planned_variants=31,completed_variants=len(finished),variant_counts=counts,cases=[variants[k['key']]for k in plan if k['key']in variants],report=REPORT,cloud_writes=0)
if args.in_progress:
 table=['| 用例 | 当前状态 | 已完成变体 |','|---|---|---|']
 for cid in ['090','091','092','093','094','095']:
  keys=[x['key']for x in plan if x['caseId']==cid];completed=[finished[k]['status']for k in keys if k in finished]
  status=next((s for s in ['Failed','Blocked','Not Applicable']if s in completed),'Passed')if len(completed)==len(keys)else('执行中'if any(k in state['cases']for k in keys)else'Not Run')
  table.append(f'| ERYE199-{cid} | {status} | {len(completed)}/{len(keys)} |')
 at=lines.index('| 变体 | 结果 | 发现/未覆盖 | 证据 |');lines[at:at]=table+['']
 write(D/'execution-status-090-095-in-progress-20261119.json',snapshot);(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
 for name,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/cases/requirements/ERYE-199/execution-status-current.md','')]:note(R/name,summary+f' [实时报告]({prefix+REPORT})。主统计待整批完成更新。')
 print(json.dumps(dict(completed=len(finished),planned=31,counts=counts)));raise SystemExit(0)
entries=[]
for cid in ['090','091','092','093','094','095']:
 group=[s['key']for s in plan if s['caseId']==cid];statuses=[finished[k]['status']for k in group];status=next((s for s in ['Failed','Blocked','Not Applicable']if s in statuses),'Passed');script='tools/editor/erye199/'+('audio-cross-track.mjs'if cid=='090'else'native-audio-operations.mjs');runner='run-audio-cross-track.mjs'if cid=='090'else'run-native-audio-operations.mjs'
 entries.append(dict(id='ERYE199-'+cid,status=status,automation='AUTO',automation_status='AUTO',script=script+'#'+cid,automation_command=f'node tools/editor/erye199/{runner} --case {cid} --space {state["spaceId"]} --report reports/{O.name}',actual='；'.join(k+':'+finished[k]['status']+'（'+'、'.join(finished[k].get('failures',[]))+'）'for k in group),variant_counts=dict(Counter(statuses)),variants=[variants[k]for k in group],evidence=[x for k in group for x in evidence[k]],screenshots=[x for k in group for x in evidence[k]if x.endswith('.png')],latest_execution_report=REPORT,latest_execution_batch=O.name,environment='production',current_failure_cloud_status='Not submitted; execution only'if status=='Failed'else'No current failure',execution_in_progress=False,execution_complete=True))
snapshot['cases']=entries;snapshot['counts']=dict(Counter(c['status']for c in entries));write(D/'execution-status-090-095-production-20261119.json',snapshot)
ids={c['id']for c in entries}
for filename in ['execution-status-20261113.json','execution-status-multitrack-20261118.json']:
 path=D/filename;obj=read(path);before=copy.deepcopy(obj);backup=O/'before-final-archive'/filename;backup.parent.mkdir(exist_ok=True)
 if not backup.exists():backup.write_bytes(path.read_bytes())
 for c in entries:
  t=next(x for x in obj['cases']if x['id']==c['id']);assert not t.get('defect',{}).get('verified'),'Inspect newer cloud linkage before overwrite'
  if t.get('latest_execution_batch')!=O.name:t.setdefault('execution_history',[]).append(copy.deepcopy({k:v for k,v in t.items()if k!='execution_history'}))
  t.update(c);t.pop('ongoing_execution_report',None)
 for c in obj['cases']:
  if c['id']not in ids:assert c==next(x for x in before['cases']if x['id']==c['id'])
 obj.pop('ongoing_execution',None);obj.update(counts=dict(Counter(c['status']for c in obj['cases'])),latest_execution_report=REPORT)
 if filename.startswith('execution-status-multitrack'):obj.update(automationCounts=dict(Counter(c['automation']for c in obj['cases'])),scope='069～095已有执行记录；096～116待执行')
 else:obj.update(updated='2026-11-19',stage='090-095 production execution completed',latest_automation_execution_report=REPORT,latest_task_space=state['spaceId'])
 write(path,obj)
master=read(D/'execution-status-20261113.json');summary=f'2026-11-19：ERYE199-090～095生产实跑{fmt(snapshot["counts"])}；31变体{fmt(counts)}，6条AUTO。当前142条{fmt(master["counts"])}；其他136条和既有云效关联保持，090原通过记录保留历史。失败截图已保存，本轮未写云效。'
lines.insert(2,summary+'\n');at=lines.index('| 变体 | 结果 | 发现/未覆盖 | 证据 |');lines[at:at]=['| 用例 | 结果 | 变体结果 |','|---|---|---|']+[f'| {c["id"]} | {c["status"]} | {fmt(c["variant_counts"])} |'for c in entries]+[''];(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
for name in ['cases.md','execution-status-current.md','coverage-overview.md']:note(D/name,summary+f' [本轮报告]({REPORT})。')
for rel,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:note(R/rel,summary+f' [本轮报告]({prefix+REPORT})。')
path=D/'cases.md';text=path.read_text(encoding='utf-8')
for c in entries:
 def row(m):
  cells=[x.strip()for x in m[0].strip().strip('|').split('|')];cells[6]='[AUTO]';cells[7]='`'+c['script']+'`';cells[8]=c['status']+'；'+cells[8].split('；',1)[-1];return'| '+' | '.join(cells)+' |'
 text=re.sub(rf'(?m)^\| {c["id"]} \|.*$',row,text,count=1)
text=text.replace('069～090见各批执行报告，091～116仍待执行。','069～095见各批执行报告，096～116仍待执行。');path.write_text(text,encoding='utf-8')
registry=R/'docs/cases/registry.yaml';text=registry.read_text(encoding='utf-8')
for c in entries:
 def block(m):
  s=re.sub(r'(?m)^  (execution_status|execution_in_progress|execution_note|automation_command|execution_report):.*\n','',m[0]);s=re.sub(r'(?m)^  status:.*$', '  status: AUTO',s);s=re.sub(r'(?m)^  script:.*$',lambda _:'  script: '+json.dumps(c['script']),s);return s.rstrip()+f'\n  automation_command: '+json.dumps(c['automation_command'])+'\n  execution_report: '+json.dumps('docs/cases/requirements/ERYE-199/'+REPORT)+f'\n  execution_status: "{c["status"]}"\n  execution_in_progress: false\n  execution_note: "本批31参数变体逐项记录，含090重新执行。"\n'
 text=re.sub(rf'(?m)^{c["id"]}:\n[\s\S]*?(?=^\S|\Z)',block,text,count=1)
registry.write_text(text,encoding='utf-8')
meta=D/'meta.yaml';text=meta.read_text(encoding='utf-8')
for k,v in {'latest_execution_report':REPORT,'execution_status':'active142;'+str(master['counts']),'current_version_scope':'069-095 AUTO recorded;096-148 PLAN/Not Run;other136 preserved'}.items():text=re.sub(rf'(?m)^{k}:.*$',lambda _:k+': '+json.dumps(v,ensure_ascii=False),text)
text=re.sub(r'(?m)^updated:.*$','updated: "2026-11-19"',text);meta.write_text(text,encoding='utf-8')
coverage=D/'coverage-overview.md';text=coverage.read_text(encoding='utf-8').replace('069～090已有原生执行记录；091～148共58条待执行；','069～095已有原生执行记录；096～148共53条待执行；');coverage.write_text(text,encoding='utf-8')
interim=D/'execution-status-090-095-in-progress-20261119.json'
if interim.exists():v=read(interim);v.update(stage='Historical interim; completed',superseded_by='execution-status-090-095-production-20261119.json');write(interim,v)
write(O/'archive-verification.json',dict(batch=snapshot['counts'],variants=counts,other_cases_preserved=136,current=master['counts']));print(json.dumps(dict(batch=snapshot['counts'],variants=counts,current=master['counts'])))
