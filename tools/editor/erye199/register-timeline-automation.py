"""Register executable 081-085 entries without claiming unfinished results passed."""
from pathlib import Path
import json,re,argparse
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(a.report).resolve();D=R/'docs/cases/requirements/ERYE-199';SCRIPT='tools/editor/erye199/timeline-operations.mjs';REPORT='results-081-085-production-20261118.md'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
state=read(O/'execution.json');assert state.get('stage')!='Completed','Completed batch must keep its final archive'
ids=['081','082','083','084','085'];registry=R/'docs/cases/registry.yaml';reg=registry.read_text(encoding='utf-8');cases_path=D/'cases.md';cases=cases_path.read_text(encoding='utf-8')
for cid in ids:
 command=f'node tools/editor/erye199/run-timeline-case.mjs --case {cid} --space 8 --report reports/{O.name}'
 pattern=rf'(?m)^ERYE199-{cid}:\n[\s\S]*?(?=^\S|\Z)'
 def change(m):
  b=m[0].replace('status: PLAN','status: AUTO').replace('script: ""',f'script: "{SCRIPT}#{cid}"');b=re.sub(r'(?m)^  (automation_command|execution_report|execution_note|execution_in_progress):.*\n','',b)
  return b+f'  automation_command: "{command}"\n  execution_report: "docs/cases/requirements/ERYE-199/{REPORT}"\n  execution_in_progress: true\n  execution_note: "本轮执行中，结果及待核验范围见实时报告；Not Run保留整批最终归档前的主状态，不代表脚本未接入。"\n'
 reg=re.sub(pattern,change,reg,count=1)
 def row(m):
  cells=[c.strip()for c in m[0].strip().strip('|').split('|')];hint=cells[8].split('；',1)[-1];cells[6]='[AUTO]';cells[7]=f'`{SCRIPT}#{cid}`';cells[8]='执行中；'+hint;return'| '+' | '.join(cells)+' |'
 cases=re.sub(rf'(?m)^\| ERYE199-{cid} \|.*$',row,cases,count=1)
for path in [D/'execution-status-20261113.json',D/'execution-status-multitrack-20261118.json']:
 obj=read(path)
 for c in obj['cases']:
  if c['id']in ['ERYE199-'+i for i in ids]:
   assert c['status']=='Not Run','Do not replace a newer finalized result with registration'
   cid=c['id'][-3:];c.update(automation='AUTO',automation_status='AUTO',script=SCRIPT+'#'+cid,automation_command=f'node tools/editor/erye199/run-timeline-case.mjs --case {cid} --space 8 --report reports/{O.name}',execution_in_progress=True,ongoing_execution_report=REPORT)
 obj['ongoing_execution']={'case_ids':['ERYE199-'+i for i in ids],'report':REPORT,'stage':state.get('stage'),'final_results_archived':False}
 if 'automationCounts'in obj:
  from collections import Counter
  obj['automationCounts']=dict(Counter(c['automation']for c in obj['cases']))
 path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
registry.write_text(reg,encoding='utf-8');cases_path.write_text(cases,encoding='utf-8')
meta=D/'meta.yaml';s=meta.read_text(encoding='utf-8');s=re.sub(r'(?m)^current_version_scope:.*$','current_version_scope: "069-080 executed;081-085 AUTO/in progress;086-148 PLAN/Not Run"',s);meta.write_text(s,encoding='utf-8')
print(json.dumps({'registered':5,'executionResultsUnchanged':True,'inProgressReport':REPORT}))
