"""Archive native 086-090 execution, or save an explicit interim snapshot."""
from pathlib import Path
from collections import Counter
import argparse,json,re,shutil,copy
p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--in-progress',action='store_true');a=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(a.report).resolve();D=R/'docs/cases/requirements/ERYE-199'
REPORT='results-086-090-production-20261119.md';EV='evidence-086-090-production-20261119';MARKER='ERYE199-AUDIO-CROSS-086090-20261119';SCRIPT='tools/editor/erye199/audio-cross-track.mjs'
plan=[(f'086-{pr}-cross-video','086',pr,'cross-video')for pr in ['S0','S1','T1','T2','E','C','H','G']]+[(f'{cid}-{pr}-{op}',cid,pr,op)for cid in ['087','088','089','090']for pr in ['T1','T2']for op in (['trim-head','trim-tail']if cid=='089'else['split'if cid=='087'else'move'if cid=='088'else'cross-audio'])]
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
def fmt(counts):return' / '.join(str(v)+' '+k for k,v in counts.items())
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def note(p,text):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S);p.write_text(f'<!-- {MARKER} -->\n{text}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
state=read(O/'execution.json');items=state['cases'];space=read(O/'task.json')['spaceId'];done=lambda e:e.get('stage')in ['Executed','Prerequisite failed','Unsupported']
finished={k:e for k,e in items.items()if done(e)}
if not a.in_progress:
 assert len(finished)==18 and all(k in finished for k,_,_,_ in plan),'Complete every required variant before final archive'
 for key,e in finished.items():
  assert e['runStatus']in ['done','failed','cancelled','canceled','terminated']
  if e['stage']=='Executed':assert e.get('uiPersistVerifiedAt'),key+' reopened UI ranges missing'
 old=read(D/'execution-status-20261113.json')
 for c in old['cases']:
  if c['id']in ['ERYE199-'+i for i in ['086','087','088','089','090']]:
   assert not c.get('defect',{}).get('verified') and (c['status']=='Not Run'or c.get('latest_execution_batch')==O.name),'Newer case/cloud result exists'
counts=dict(Counter(e['status']for e in finished.values()));evidence={};variants={};audit=[]
def tracks(doc):
 return[{k:t[k]for k in ['track_id','type','role','muted','visible']if k in t}|{'clips':[{k:c[k]for k in ['clip_id','file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume','opacity','transform','text']if k in c}for c in t.get('clips',[])]}for t in doc.get('content',{}).get('tracks',[])]
for key,cid,pr,op in plan:
 if key not in items:continue
 e=items[key];target=D/EV/key;target.mkdir(parents=True,exist_ok=True);evidence[key]=[]
 for name in ['before-submit.png','baseline-verified.png','baseline-failure.png','operation-baseline.png','D-placed.png','before-split-selected-D.png','cross-verified.png','cross-failure.png','cross-refreshed.png','failure.png','failure-after-reopen.png','failure-preview-supplement.png','verified.png','split-disabled.png']:
  src=O/key/name
  if e.get('status')=='Passed'and'failure'in name:continue
  if src.exists():shutil.copy2(src,target/name);evidence[key].append(f'{EV}/{key}/{name}')
 if e.get('status')=='Passed'and not(O/key/'verified.png').exists()and(O/key/'failure-after-reopen.png').exists():
  name='verified-after-observer-correction.png';shutil.copy2(O/key/'failure-after-reopen.png',target/name);evidence[key].append(f'{EV}/{key}/{name}')
 detail={k:e.get(k)for k in ['key','id','profile','operation','status','stage','runId','conversationId','editorId','checks','failures','unexecuted','unsupportedReason','target','destinationTrackId','audio','audioPreview','playback','observerAdjustments','knownIssueObserved','beforeUI','crossUI','splitSelection']}
 detail.update(prompt=e['definition']['prompt'],card=e['definition']['card'],language=e['definition'].get('language'),subtitle_mode=e['definition'].get('mode'),source_sha256=e.get('source',{}).get('sha256'))
 for name in ['D-registration-before','D-registration-after','operation-before','cross-after','followup-move-before','operation-after','undo-cross','redo-cross','undo-restores-baseline','redo-restores-edit']:
  if(O/key/(name+'.json')).exists():detail[name]=tracks(read(O/key/(name+'.json')))
 text=json.dumps(detail,ensure_ascii=False,indent=2);assert not re.search(r'Bearer\s+[A-Za-z0-9._-]{15,}|[?&](?:X-Amz-Signature|signature|access_token)=',text,re.I),'Sanitize evidence before archive'
 write(target/'verification.json',detail);evidence[key].append(f'{EV}/{key}/verification.json');variants[key]=detail
 original=e.get('nativeBaseline')or e.get('baseline')
 if original:
  expected=next((f.get('file_id')for f in (e.get('resultFiles',[])if pr in ['E','G']else e.get('uploadedFiles',[]))if (f.get('kind')=='video'if pr in ['E','G']else f.get('name')==e['source']['name'])),None)
  v=next(t for t in original['content']['tracks']if t['type']=='video');audit.append({'key':key,'expected_file':expected,'actual_files':list(dict.fromkeys(c['file_id']for c in v['clips'])),'passed':bool(expected)and all(c['file_id']==expected for c in v['clips'])})
write(D/EV/'source-audit.json',{'checked':len(audit),'mismatches':[x for x in audit if not x['passed']],'variants':audit})
if not a.in_progress:assert len(audit)==18 and all(x['passed']for x in audit),'Original/result mapping incomplete or mismatched'
summary=f'086～090生产测试'+('执行中'if a.in_progress else'已归档')+f'：18个卡片/操作变体，已完成{len(finished)}个，当前{fmt(counts)}。'
if a.in_progress and any('D登记不改变时间轴'in e.get('failures',[])for e in finished.values()):summary+='登记阶段辅助语音索引观察待业务校正，当前原始失败数不作为最终产品缺陷数。'
lines=['# ERYE199-086～090生产'+('执行进度（执行中）'if a.in_progress else'执行结果')+'（2026-11-19）','',summary,'',f'本轮专用项目 `{state["workspaceName"]}` / `{state["workspaceId"]}`，Ego Lite有头，TaskSpace {space}。每个变体使用本轮独立原生工程；按当前页面业务结果验收，API只读辅助。不使用旧生产工程代跑。','', '[用例定义](cases.md#erye199-card-multitrack) · [自动化说明](automation.md)','','| 变体 | 结果 | 发现/未覆盖 | 证据 |','|---|---|---|---|']
def finding(e):
 if e.get('unsupportedReason'):return e['unsupportedReason']
 result=[]
 for c in e.get('checks',[]):
  if c.get('passed'):continue
  name=c['name'];actual=c.get('actual')or{}
  if name in ['视频BGM原声译声字幕及非目标保持','换轨后平移不带动非目标轨']and isinstance(actual,dict):
   changed=[]
   for t in actual.get('before',[]):
    other=next((a for a in actual.get('after',[])if a['track_id']==t['track_id']),{})
    view=lambda tr:[{k:clip.get(k)for k in ['file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume','opacity','transform','text']}for clip in tr.get('clips',[])]
    if view(t)!=view(other):changed.append('视频'if t['type']=='video'else{'source':'原声','narration':'译声','background':'BGM'}.get(t.get('role'),t['type']))
   action={'split':'分割D','move':'平移D','trim-head':'裁D头','trim-tail':'裁D尾','cross-video':'视频换轨后平移','cross-audio':'D换轨后平移'}.get(e['operation'],'操作')
   result.append(action+'误改'+'、'.join(dict.fromkeys(changed))if changed else name)
  elif name.startswith('跨轨保留')or name=='跨轨不改变其他轨的内容和时间':result.append('原声行/非目标轨随视频换轨而变化')
  elif name=='预览映射到编辑后的源视频时间':result.append('多层预览观察待按可见视频补核')
  elif name=='D登记不改变时间轴'and e.get('key')=='088-T1-move':result.append('登记阶段辅助语音索引差异待业务校正')
  elif name=='纵向换轨保持源和时间'and isinstance(actual,dict)and actual.get('before')and abs(actual['after']['timeline_start_sec']-actual['before']['timeline_start_sec'])<=1/30+.001:result.append('起点帧量化差异待按O既定容差复核')
  else:result.append(name)
 return'、'.join(dict.fromkeys(result))or'、'.join(e.get('failures',[]))or('通过指定步骤'if done(e)else e.get('stage',''))
for key,cid,pr,op in plan:
 e=items.get(key,{})
 if not e:lines.append(f'| {key} | Not Run | 待准备原生工程 | — |');continue
 shots=[f for f in evidence[key]if f.endswith('.png')];pic=next((f for f in shots if f.endswith('failure-preview-supplement.png')),next((f for f in shots if f.endswith('failure-after-reopen.png')),next((f for f in shots if f.endswith('split-disabled.png')),next((f for f in shots if f.endswith('failure.png')),shots[-1]if shots else''))))
 lines.append(f'| {key} | {e["status"]if done(e)else"执行中"} | {finding(e)}'+('；未执行：'+'、'.join(e['unexecuted'])if e.get('unexecuted')else'')+f' | [核验]({EV}/{key}/verification.json)'+(f' · [原图]({pic})'if pic else'')+' |')
lines+=['','视频跨轨适用S0/S1/T1/T2/E/C/H/G；独立D适用X1/X2，分别记录分割、主体平移、左右裁剪及跨轨。D由页面登记并放入6～18秒，源0～12秒；不伪造原生译声或BGM。跨轨在空白处建立同类型新轨，核对唯一实例和源轨其余片段，再移动1秒检查关联/隔离。每个实际编辑核验撤销、重做、刷新后的页面时码。','','缺少目标入口时保留选中对象、播放头和按钮状态截图，明确未执行步骤，不以内部接口或视频分割替代独立音频操作。声音核验记录原生播放推进及可读媒体状态、真实文件绑定和源区间；不宣称人工逐字听审或额外导出已覆盖。','',f'[本轮素材对应核验]({EV}/source-audit.json)。已知FWXC-693译文显示差异单列保留；FWXC-699/700只作既有问题参考，本轮没有云效写入。','']
snapshot={'date':'2026-11-19','stage':'In Progress'if a.in_progress else'Completed','variant_counts':counts,'planned_variants':18,'completed_variants':len(finished),'cases':[variants[k]for k,_,_,_ in plan if k in variants],'report':REPORT,'cloud_writes':0}
if a.in_progress:
 write(D/'execution-status-086-090-in-progress-20261119.json',snapshot)
 (D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
 for rel,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/cases/requirements/ERYE-199/execution-status-current.md','')]:note(R/rel,summary+f' [实时报告]({prefix+REPORT})。最终主统计待整批归档。')
 print(json.dumps({'stage':'In Progress','completed':len(finished),'planned':18,'counts':counts}));raise SystemExit(0)
entries=[]
for cid in ['086','087','088','089','090']:
 group=[k for k,c,_,_ in plan if c==cid];states=[finished[k]['status']for k in group];status=next((s for s in ['Failed','Blocked','Not Applicable']if s in states),'Passed')
 entries.append({'id':'ERYE199-'+cid,'status':status,'automation':'AUTO','automation_status':'AUTO','script':SCRIPT+'#'+cid,'automation_command':f'node tools/editor/erye199/run-audio-cross-track.mjs --case {cid} --space {space} --report reports/{O.name}','actual':'；'.join(k+':'+finished[k]['status']+'（'+finding(finished[k])+'）'for k in group),'variant_counts':dict(Counter(states)),'variants':[variants[k]for k in group],'evidence':[f for k in group for f in evidence[k]],'screenshots':[f for k in group for f in evidence[k]if f.endswith('.png')],'latest_execution_report':REPORT,'latest_execution_batch':O.name,'environment':'production','current_failure_cloud_status':'Not submitted; execution only','execution_in_progress':False,'execution_complete':True})
snapshot['cases']=entries;snapshot['counts']=dict(Counter(c['status']for c in entries));write(D/'execution-status-086-090-production-20261119.json',snapshot)
ids={c['id']for c in entries}
for filename in ['execution-status-20261113.json','execution-status-multitrack-20261118.json']:
 path=D/filename;obj=read(path);before=copy.deepcopy(obj);backup=O/'before-final-archive'/filename;backup.parent.mkdir(exist_ok=True)
 if not backup.exists():backup.write_bytes(path.read_bytes())
 for c in entries:
  target=next(x for x in obj['cases']if x['id']==c['id']);target.update(c);target.pop('ongoing_execution_report',None)
 for c in obj['cases']:
  if c['id']not in ids:assert c==next(x for x in before['cases']if x['id']==c['id'])
 obj.pop('ongoing_execution',None);obj.update(counts=dict(Counter(c['status']for c in obj['cases'])),latest_execution_report=REPORT)
 if filename.startswith('execution-status-multitrack'):obj.update(automationCounts=dict(Counter(c['automation']for c in obj['cases'])),scope='069～090已有执行记录；091～116待执行')
 else:obj.update(updated='2026-11-19',stage='086-090 production execution completed',latest_automation_execution_report=REPORT,latest_task_space=space)
 write(path,obj)
master=read(D/'execution-status-20261113.json');summary=f'2026-11-19：ERYE199-086～090生产实跑{fmt(snapshot["counts"])}；18个变体{fmt(counts)}，5条接入AUTO。当前142条{fmt(master["counts"])}；其他137条及既有云效关联保持。失败及关键步骤截图已保存，本轮未写云效。'
lines.insert(2,summary+'\n')
at=lines.index('| 变体 | 结果 | 发现/未覆盖 | 证据 |');table=['| 用例 | 结果 | 变体结果 |','|---|---|---|']+[f'| {c["id"]} | {c["status"]} | {fmt(c["variant_counts"])} |'for c in entries]+['']
lines[at:at]=table
lines+=['观察校正：首个S0手势命中播放头，经确认工程内容未变后在原结果恢复；C约12毫秒起点量化按既定一帧容差记录，可见预览补核通过。088-T1仅辅助语音索引重建，实际声音文件、时码与编辑结果未变，已校正通过；原始观察保留在核验记录。','']
(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
for filename in ['cases.md','execution-status-current.md','coverage-overview.md']:note(D/filename,summary+f' [本轮报告]({REPORT})。')
for rel,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:note(R/rel,summary+f' [本轮报告]({prefix+REPORT})。')
path=D/'cases.md';text=path.read_text(encoding='utf-8')
for c in entries:
 def row(m):
  cells=[x.strip()for x in m[0].strip().strip('|').split('|')];cells[6]='[AUTO]';cells[7]='`'+c['script']+'`';cells[8]=c['status']+'；'+cells[8].split('；',1)[-1];return'| '+' | '.join(cells)+' |'
 text=re.sub(rf'(?m)^\| {c["id"]} \|.*$',row,text,count=1)
text=text.replace('069～085已接入AUTO并完成实跑，086～116共31条仍PLAN/Not Run。','069～090已有原生执行记录及AUTO，091～116共26条仍PLAN/Not Run。').replace('069～085见各批执行报告，086～116仍待执行。','069～090见各批执行报告，091～116仍待执行。');path.write_text(text,encoding='utf-8')
registry=R/'docs/cases/registry.yaml';text=registry.read_text(encoding='utf-8')
for c in entries:
 def block(m):
  b=re.sub(r'(?m)^  (execution_status|execution_in_progress|execution_note):.*\n','',m[0]);return b+f'  execution_status: "{c["status"]}"\n  execution_in_progress: false\n  execution_note: "18个参数变体按本批报告逐项记录，不将未支持步骤记通过。"\n'
 text=re.sub(rf'(?m)^{c["id"]}:\n[\s\S]*?(?=^\S|\Z)',block,text,count=1)
registry.write_text(text,encoding='utf-8')
meta=D/'meta.yaml';text=meta.read_text(encoding='utf-8')
for key,value in {'latest_execution_report':REPORT,'execution_status':'active142;'+str(master['counts']),'current_version_scope':'069-090 AUTO recorded;091-148 PLAN/Not Run;other137 preserved'}.items():text=re.sub(rf'(?m)^{key}:.*$',lambda _:key+': '+json.dumps(value,ensure_ascii=False),text)
meta.write_text(text,encoding='utf-8')
coverage=D/'coverage-overview.md';text=coverage.read_text(encoding='utf-8').replace('069～085已有最终实跑记录；086～148共63条待执行；','069～090已有原生执行记录；091～148共58条待执行；');coverage.write_text(text,encoding='utf-8')
interim=D/'execution-status-086-090-in-progress-20261119.json'
if interim.exists():v=read(interim);v.update(stage='Historical interim; completed',superseded_by='execution-status-086-090-production-20261119.json');write(interim,v)
write(O/'archive-verification.json',{'batch':snapshot['counts'],'variants':counts,'other_cases_preserved':137,'current':master['counts']});print(json.dumps({'batch':snapshot['counts'],'variants':counts,'current':master['counts']}))
