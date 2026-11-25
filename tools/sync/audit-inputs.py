from pathlib import Path
import argparse,json,sys

sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
root=Path(a.report).resolve();state=json.loads((root/'execution.json').read_text(encoding='utf-8'))
for key,e in state['cases'].items():
    journal=json.loads((root/key/'messages.json').read_text(encoding='utf-8'))
    for step in e['steps']:
        n=step['round']
        if n==0 or not step.get('runId'):continue
        run=json.loads((root/key/f'round-{n}-run.json').read_text(encoding='utf-8'))
        expected=[s['id'] for s in e['sources']] if n==1 else [e['p1']['id']]
        rawPlan=run.get('plan')
        plans=rawPlan.get('plans',[]) if isinstance(rawPlan,dict) else rawPlan if isinstance(rawPlan,list) else []
        planned=sorted({f['file_id'] for plan in plans for f in plan.get('input_media_context',{}).get('video_files',[])})
        live=next((m for m in reversed(journal['messages']) if m.get('role')=='assistant' and m.get('run_id',m.get('job_id'))==step['runId']),None)
        first=(live.get('plan') or [None])[0] if live else None
        emitted=[f.get('facts',{}).get('source_media_file_id') for f in (first or {}).get('result_files',[]) if f.get('facts',{}).get('source_media_file_id')]
        result={'case':key,'round':n,'runId':step['runId'],'expectedVideoIds':expected,'retainedPlanVideoIds':planned,'planMatches':set(planned)==set(expected) if plans else None,'firstExecutedTool':(first or {}).get('tool'),'firstExecutedToolStatus':(first or {}).get('status'),'firstToolOutputSourceMediaIds':sorted(set(emitted)),'coverage':'保留的原始计划输入及实际首工具输出来源；结合实际画面/波形比对，不能仅靠助手说明或共同祖先判断来源'}
        (root/key/f'round-{n}-input-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(json.dumps(result,ensure_ascii=False))
