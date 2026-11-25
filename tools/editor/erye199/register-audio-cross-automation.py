"""Register 086-090 automation while preserving unfinished final outcomes."""
from pathlib import Path
from collections import Counter
import argparse,json,re
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
R=Path(__file__).resolve().parents[3];O=Path(a.report).resolve();D=R/'docs/cases/requirements/ERYE-199'
SCRIPT='tools/editor/erye199/audio-cross-track.mjs';REPORT='results-086-090-production-20261119.md';ids=['086','087','088','089','090']
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
state=read(O/'execution.json');assert state['stage']!='Completed';space=read(O/'task.json')['spaceId']
registry=R/'docs/cases/registry.yaml';reg=registry.read_text(encoding='utf-8');cases_path=D/'cases.md';cases=cases_path.read_text(encoding='utf-8')
for cid in ids:
 command=f'node tools/editor/erye199/run-audio-cross-track.mjs --case {cid} --space {space} --report reports/{O.name}'
 def block(m):
  text=m[0].replace('status: PLAN','status: AUTO').replace('script: ""',f'script: "{SCRIPT}#{cid}"');text=re.sub(r'(?m)^  (automation_command|execution_report|execution_note|execution_in_progress):.*\n','',text)
  return text+f'  automation_command: "{command}"\n  execution_report: "docs/cases/requirements/ERYE-199/{REPORT}"\n  execution_in_progress: true\n  execution_note: "已接脚本，执行中；最终结果待全部对应变体归档。"\n'
 reg=re.sub(rf'(?m)^ERYE199-{cid}:\n[\s\S]*?(?=^\S|\Z)',block,reg,count=1)
 def row(m):
  cells=[c.strip()for c in m[0].strip().strip('|').split('|')];cells[6]='[AUTO]';cells[7]=f'`{SCRIPT}#{cid}`';cells[8]='执行中；'+cells[8].split('；',1)[-1];return'| '+' | '.join(cells)+' |'
 cases=re.sub(rf'(?m)^\| ERYE199-{cid} \|.*$',row,cases,count=1)
for f in [D/'execution-status-20261113.json',D/'execution-status-multitrack-20261118.json']:
 obj=read(f)
 backup=O/'before-registration'/f.name;backup.parent.mkdir(exist_ok=True)
 if not backup.exists():backup.write_bytes(f.read_bytes())
 for c in obj['cases']:
  if c['id']in ['ERYE199-'+i for i in ids]:
   assert c['status']=='Not Run','Do not replace finalized execution'
   cid=c['id'][-3:];c.update(automation='AUTO',automation_status='AUTO',script=SCRIPT+'#'+cid,automation_command=f'node tools/editor/erye199/run-audio-cross-track.mjs --case {cid} --space {space} --report reports/{O.name}',execution_in_progress=True,ongoing_execution_report=REPORT)
 obj['ongoing_execution']={'case_ids':['ERYE199-'+i for i in ids],'report':REPORT,'final_results_archived':False}
 if 'automationCounts'in obj:obj['automationCounts']=dict(Counter(c['automation']for c in obj['cases']))
 f.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
registry.write_text(reg,encoding='utf-8');cases_path.write_text(cases,encoding='utf-8')
print(json.dumps({'registered':5,'finalResultsUnchanged':True}))
