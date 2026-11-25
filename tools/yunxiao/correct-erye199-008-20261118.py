"""Reassess only 008 from preserved evidence; no product run or implicit cloud write."""
import argparse,collections,copy,hashlib,json,pathlib,re,shutil
R=pathlib.Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
OUT=R/'reports/yunxiao/ERYE199-008-SCOPE-CORRECTION-20261118'
REPORT='revision-008-registration-scope-20261118.md';MARKER='ERYE199-008-SCOPE-CORRECTION-20261118'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
def note(p,text):
 raw=p.read_bytes().decode('utf8');block='<!-- '+MARKER+' -->\n'+text+'\n<!-- /'+MARKER+' -->\n'
 pattern=r'<!-- '+MARKER+r' -->[\s\S]*?<!-- /'+MARKER+r' -->(?:\r?\n)?'
 if re.search(pattern,raw):raw=re.sub(pattern,lambda _:block,raw,count=1)
 else:
  pos=raw.index('\n')+1;raw=raw[:pos]+'\n'+block+raw[pos:]
 p.write_bytes(raw.encode('utf8'))
def prepare():
 if (OUT/'result.json').exists():raise RuntimeError('本批云效校正已完成；保留原计划和证据，只允许回读或finalize，不重新准备')
 master=read(D/'execution-status-20261113.json');case=next(c for c in master['cases'] if c['id']=='ERYE199-008')
 old=OUT/'before-local.json'
 if not old.exists():write(old,master)
 proof=read(R/'reports/erye199-failed-ten-rerun-20261116/008/observations.json')
 assert {o['kind'] for o in proof['observations']}=={'video','audio','image'}
 assert all(o['inserted'] and o['placementUndone'] for o in proof['observations'])
 assert set(proof['failures'])=={k+'登记没有独立撤销入口' for k in ['video','audio','image']}
 E=D/'evidence-008-scope-correction-20261118';E.mkdir(exist_ok=True)
 shutil.copy2(R/'reports/erye199-failed-ten-rerun-20261116/008/observations.json',E/'original-observations-20261116.json')
 assessment={'date':'2026-11-18','case_id':'ERYE199-008','version':'008-registration-placement-v2-20261118','status':'Passed','method':'Acceptance scope correction based on existing production observations; no new product execution','evidenceDate':'2026-11-16','removedExpectation':'素材仅登记到素材库后必须可独立撤销','retainedChecks':['登记成功且时间线仍空','视频/音频/图片均可放入对应轨道','撤销放入后时间线恢复为空'],'observations':proof['observations'],'originalFailures':proof['failures'],'defect':'FWXC-486','targetResolution':'不是问题'}
 write(E/'assessment.json',assessment)
 write(D/'revision-008-original-20261118.json',{'previousStatus':case['status'],'previousActual':case['actual'],'previousExpected':'登记与放入是两个动作；三种素材均可放入；步骤可分别撤销','previousEvidenceReport':case['latest_execution_report'],'screenshots':case['screenshots'],'defect':case['defect']})
 text='''# ERYE199-008 素材登记与放入：验收口径校正（2026-11-18）

用户要求去掉“素材登记后必须可撤销”的预期。PE02明确登记与放入时间线为两个动作，并列举复制、分割、修剪、换轨、替换素材可撤销；未明确素材库登记必须进入撤销历史。

008 v2保留三类素材的登记、放入和撤销放入检查；自动化入口仍为`tools/editor/erye199/cases.mjs#008`。不读取或点击登记阶段的撤销/重做作为验收步骤。

| 前置/操作 | 预期 |
|---|---|
| 视频、音频、图片分别新建独立空白工程，准备正常素材 | 每种素材均在独立空白时间线开始 |
| 通过页面上传登记，等待素材卡片可见 | 登记成功，时间线仍为空 |
| 将已登记卡片拖入时间线 | 进入对应轨道，素材类型和内容对应 |
| 点击一次撤销 | 仅撤回本次放入，时间线恢复为空 |

当前Passed为**基于2026-11-16既有实测证据的验收校正，2026-11-18未重新执行**。原observations中视频/音频/图片的inserted、placementUndone均为true，原三项失败全部是本次移除的登记撤销断言。旧Failed、原始日志、截图与云效提交正文保留，不将本次校正写成开发已修复。

[原观察数据](evidence-008-scope-correction-20261118/original-observations-20261116.json) · [范围判定](evidence-008-scope-correction-20261118/assessment.json) · [原用例及判定摘要](revision-008-original-20261118.json) · [原实测截图](results-failed-ten-rerun-production-20261116.md#erye199-008)。

云效FWXC-486拟更新为“不是问题”，原因是原缺陷依赖的登记撤销预期缺少明确需求依据；原截图及附件保持。
'''
 (D/REPORT).write_text(text,encoding='utf8')
 cloud_note='''## 2026-11-18 验收口径校正：不是问题

经核对ERYE-199 PE02，需求明确“素材登记与放入时间线为两个动作”，并列举复制、分割、修剪、换轨、替换素材可撤销；没有明确“素材仅登记后，撤销按钮必须可用”。原用例把“两个动作”扩展为“均可独立撤销”，依据不足，现按用户要求移除该预期。

ERYE199-008 v2保留视频、音频、图片的登记与放入分离、对应轨道放入及撤销放入。2026-11-16原实测中三类inserted与placementUndone均为true，原失败仅来自登记撤销断言，因此按新口径校正为Passed；2026-11-18未重新执行。

本缺陷撤回为“不是问题”，不表示登记撤销功能已由开发修复。原现象仍可能存在，但不再作为该用例的失败依据。原提交正文、截图和7份附件保留供追溯。

同步标识：ERYE199-008-SCOPE-CORRECTION-20261118

---

以下为原提交记录，原预期及影响中的登记撤销要求已由以上校正取代。

'''
 before=read(OUT/'before.json');assert before['formatType']=='MARKDOWN'
 (OUT/'corrected-description.md').write_bytes((cloud_note+before['description']).encode('utf8'))
 print(json.dumps({'prepared':True,'newStatus':'Passed','basedOn':'2026-11-16 observations','cloudTarget':'不是问题','rerun':False},ensure_ascii=False))
def finalize():
 receipt=read(OUT/'result.json');after=read(OUT/'after.json');assert receipt['verified'] and after['status']['name']=='不是问题'
 master=read(D/'execution-status-20261113.json');previous=read(OUT/'before-local.json');case=next(c for c in master['cases'] if c['id']=='ERYE199-008');old=next(c for c in previous['cases'] if c['id']=='ERYE199-008')
 expected={'Passed':32,'Failed':7,'Blocked':2,'Not Applicable':21,'Not Run':0}
 actual='按2026-11-18 v2口径，三类素材登记与放入分离、对应轨道放入及撤销放入通过；基于2026-11-16既有证据校正，未重跑。素材登记阶段撤销可用性不作判定；FWXC-486已撤回为不是问题。'
 if not any(h.get('scope_correction_key')==MARKER for h in case.get('execution_history',[])):
  case.setdefault('execution_history',[]).append({'scope_correction_key':MARKER,'previous_status':old['status'],'previous_actual':old['actual'],'previous_errorType':old.get('errorType'),'previous_raw_actual':old.get('raw_actual'),'report':old['latest_execution_report'],'meaning':'旧验收下的实际执行，保留历史；非本次新执行'})
 case.update(status='Passed',actual=actual,acceptance_revision='008-registration-placement-v2-20261118',latest_scope_correction_report=REPORT,assessment_date='2026-11-18',assessment_method='Existing evidence reassessment, no rerun',legacy_defect_reproduced=False)
 case.pop('errorType',None);case.pop('raw_actual',None)
 case['defect'].update(status='不是问题',verified=True,resolution='验收口径校正，原登记撤销断言无明确需求依据',scope_correction_report=REPORT,status_verified_at=receipt['verifiedAt'])
 counts=collections.Counter(c['status'] for c in master['cases']);assert dict(counts)=={k:v for k,v in expected.items() if v}
 master['counts']=expected;master['updated']='2026-11-18';master['latest_scope_correction_report']=REPORT;master['latest_case_revision_report']=REPORT
 master['latest_scope_correction']={'key':MARKER,'case':'ERYE199-008','previous':'Failed','current':'Passed','rerun':False,'evidenceDate':'2026-11-16','defect':'FWXC-486','defectStatus':'不是问题','report':REPORT}
 for c in master['cases']:
  if c['id']!='ERYE199-008':assert c==next(v for v in previous['cases'] if v['id']==c['id']),c['id']
 write(D/'execution-status-20261113.json',master)
 sync=read(D/'defect-sync-20261113.json');record=sync['cases']['ERYE199-008'];record.update(status='不是问题',verified=True,resolution=case['defect']['resolution'],scope_correction_report=REPORT)
 record['latest_scope_correction']=master['latest_scope_correction'];sync['updated']='2026-11-18';sync['latest_scope_correction']=master['latest_scope_correction'];write(D/'defect-sync-20261113.json',sync)
 meta=D/'meta.yaml';t=meta.read_text(encoding='utf8');t=re.sub(r'(?m)^execution_status:.*$','execution_status: "active62;32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run"',t);t=re.sub(r'(?m)^updated:.*$','updated: "2026-11-18"',t)
 t=re.sub(r'(?m)^latest_case_revision_report:.*$','latest_case_revision_report: "'+REPORT+'"',t)
 t=t.replace('8 current failed linked','7 current failed linked')
 if 'latest_008_scope_correction_report:' not in t:t+='\nlatest_008_scope_correction_report: "'+REPORT+'"\n'
 meta.write_text(t,encoding='utf8')
 reg=R/'docs/cases/registry.yaml';t=reg.read_text(encoding='utf8');m=re.search(r'(?m)^ERYE199-008:\n[\s\S]*?(?=^\S|\Z)',t);block=m[0]
 for key,value in {'execution_status':'Passed','execution_note':actual,'defect_status':'不是问题','execution_report':'docs/cases/requirements/ERYE-199/'+REPORT,'execution_batch':'erye199-failed-ten-rerun-20261116'}.items():block=re.sub(r'(?m)^  '+key+r':.*$',lambda _: '  '+key+': '+json.dumps(value,ensure_ascii=False),block)
 block=re.sub(r'(?m)^  reported_defect_reproduced:.*$','  reported_defect_reproduced: false',block);block=block.rstrip()+'\n  acceptance_revision: "008-registration-placement-v2-20261118"\n  execution_reassessed_without_rerun: true\n  evidence_execution_date: "2026-11-16"\n\n';reg.write_text(t[:m.start()]+block+t[m.end():],encoding='utf8')
 text='2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。'
 for f in ['cases.md','automation.md','execution-status-current.md','results-failed-ten-rerun-production-20261116.md']:
  note(D/f,text+' [校正依据与证据]('+REPORT+')。以下旧批次统计为历史。')
 current=D/'execution-status-current.md';t=current.read_text(encoding='utf8');t=re.sub(r'(?m)^更新：2026-11-16。有效62条；.*$', '更新：2026-11-18。有效62条；040/050/058/060/061/063已删除、编号不复用。全量当前：**32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**。',t)
 t=re.sub(r'(?m)^\| ERYE199-008 \|.*$','| ERYE199-008 | AUTO | Passed | '+actual+'；[校正依据]('+REPORT+') |',t);current.write_text(t,encoding='utf8')
 local=R/'docs/defects/ERYE199-008-asset-registration-undo-production-20261113.md';note(local,text+' [校正依据](../cases/requirements/ERYE-199/'+REPORT+')。以下为原提交时记录，不再作为当前缺陷判定。')
 for rel,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/'),('AGENTS.md','docs/cases/requirements/ERYE-199/')]:note(R/rel,text+' [校正说明]('+prefix+REPORT+')。后续008只按v2执行，不恢复登记撤销断言；统一入口不写执行结果。')
 report=D/REPORT;t=report.read_text(encoding='utf8');t=t.replace('云效FWXC-486拟更新为“不是问题”，原因是原缺陷依赖的登记撤销预期缺少明确需求依据；原截图及附件保持。','云效[FWXC-486]('+receipt['url']+')已由“'+receipt['beforeStatus']+'”更新为“不是问题”，正文已补充验收校正原因；原截图引用及7份附件保持，状态/正文/其他关键字段/附件均已回读。');report.write_text(t,encoding='utf8')
 public={k:v for k,v in receipt.items() if k not in ['request','response']};write(D/'evidence-008-scope-correction-20261118/cloud-receipt.json',public)
 print(json.dumps({'status':'Passed','counts':expected,'cloudStatus':'不是问题','otherCasesUnchanged':61,'rerun':False},ensure_ascii=False))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--finalize',action='store_true');args=p.parse_args();finalize() if args.finalize else prepare()
