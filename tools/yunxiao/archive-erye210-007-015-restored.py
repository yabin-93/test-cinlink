"""Archive verified Yunxiao receipts only. Never submits or reruns browser tasks."""
from pathlib import Path
from importlib.util import spec_from_file_location,module_from_spec
import hashlib,json,re,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
E=D/'evidence-restored-eight-production-20261116';C=E/'cloud-sync-007-015'
INPUT=R/'reports/yunxiao/erye210-007-015-restored-20261116-input'
KEYS={'007':'ERYE210-007-IMAGE-SUBTAB-MEMORY-PROD-20261116','015':'ERYE210-015-SELECTION-GUIDANCE-PROD-20261116'}
REPORT='defects-007-015-restored-production-20261116.md';SYNC='defect-sync-007-015-restored-production-20261116.json'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,text):
 marker='ERYE210-007015-YUNXIAO-20261116';s=p.read_text(encoding='utf-8');b=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if '<!-- '+marker+' -->' in s:s=re.sub(r'<!-- '+marker+r' -->.*?<!-- /'+marker+r' -->\n?',lambda _:b,s,flags=re.S)
 elif s.startswith('---\n'):
  end=s.find('\n---\n',4)+5;s=s[:end]+'\n'+b+s[end:]
 else:first,sep,rest=s.partition('\n');s=first+sep+'\n'+b+'\n'+rest
 p.write_text(s,encoding='utf-8')
def main():
 current=read(D/'execution-status-current.json');assert current['counts']=={'Passed':46,'Failed':4,'Blocked':1,'Not Applicable':0,'Not Run':0}
 out=R/'reports/yunxiao/erye210-007-015-restored-20261116-local-archive';out.mkdir(parents=True,exist_ok=True)
 before=out/'before-current.json'
 if not before.exists():write(before,current)
 protected={c['id']:c for c in read(before)['cases'] if c['id'] not in ['ERYE210-007','ERYE210-015']}
 cases=[]
 for cid,key in KEYS.items():
  state=R/'reports/yunxiao'/key;result=read(state/'result.json');item=read(state/'verified-item.json');files=read(state/'verified-attachments.json');plan=read(INPUT/cid/'plan.json');desc=(state/'verified-description.md').read_text(encoding='utf-8')
  assert result['verified'] and result['key']==key and item['id']==result['workitemId'] and item['subject']==plan['subject']
  assert item['description']==desc and '__SCREENSHOTS__' not in desc
  assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
  embedded=[]
  for image in plan['images']:
   p=INPUT/cid/image['path'];assert sha(p)==image['sha256']
   f=next(f for f in files if f['fileName']==p.name);assert f['size']==p.stat().st_size
   assert f"fileIdentifier={f['id']}" in desc and f'![{p.name}]' in desc
   embedded.append({'name':p.name,'id':f['id'],'sha256':sha(p),'size':p.stat().st_size,'embedded':True,'caption':image['caption']})
  assert len(embedded)==3 and len(result['attachments'])==6
  for f in result['attachments']:
   persisted=next(x for x in files if x['id']==f['id']);assert persisted['fileName']==f['name'] and persisted['size']==f['size']
  field=lambda name:next(f['values'][0]['displayValue'] for f in item['customFieldValues'] if f['fieldId']==name)
  receipt={'caseId':'ERYE210-'+cid,'key':key,'identifier':item['serialNumber'],'workitemId':item['id'],'url':result['url'],'subject':item['subject'],'verified':True,'verifiedAt':result['verifiedAt'],'status':item['status']['name'],'assignedTo':item['assignedTo']['name'],'sprint':item['sprint']['name'],'labels':[x['name'] for x in item['labels']],'priority':field('priority'),'seriousLevel':field('seriousLevel'),'screenshots':3,'attachmentCount':6,'images':embedded,'attachments':result['attachments'],'descriptionSha256':hashlib.sha256(desc.encode()).hexdigest()}
  cases.append(receipt);folder=C/cid;folder.mkdir(parents=True,exist_ok=True);write(folder/'receipt.json',receipt);(folder/'verified-description.md').write_text(desc,encoding='utf-8')
  cloud={k:receipt[k] for k in ['identifier','workitemId','url','status','verified','verifiedAt','screenshots','attachmentCount']};cloud['syncReport']=REPORT
  for file in [D/'execution-status-current.json',D/'execution-status-restored-eight-production-20261116.json']:
   obj=read(file);c=next(c for c in obj['cases'] if c['id']==receipt['caseId']);assert c['status']=='Failed';c['cloudDefect']=cloud;write(file,obj)
  obj=read(E/cid/'result.json');obj['cloudDefect']=cloud;write(E/cid/'result.json',obj)
  local=R/'docs/defects'/('ERYE210-007-image-subtab-memory-production-20261116.md' if cid=='007' else 'ERYE210-015-selection-guidance-production-20261116.md')
  local.write_text('# '+item['subject']+'\n\n云效：['+item['serialNumber']+']('+result['url']+')；官方OpenAPI新建，状态'+receipt['status']+'，负责人'+receipt['assignedTo']+'，'+receipt['priority']+' / '+receipt['seriousLevel']+'。3张本轮原图上传并嵌入，6附件及正文/字段/图片引用回读通过。\n\n'+desc,encoding='utf-8')
  regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8');pattern=r'^'+receipt['caseId']+r':\n(?:(?!^\S).*(?:\n|$))*';match=re.search(pattern,reg,re.M);body=yaml.safe_load(match.group())[receipt['caseId']]
  if 'historical_defect_id' not in body:body['historical_defect_id']=body.get('defect_id');body['historical_defect_url']=body.get('defect_url')
  body.update(defect_id=receipt['identifier'],defect_url=receipt['url'],defect_status=receipt['status'],defect_sync_verified=True,defect_screenshots=3,defect_attachments=6)
  reg=reg[:match.start()]+yaml.safe_dump({receipt['caseId']:body},allow_unicode=True,sort_keys=False)+reg[match.end():];regpath.write_text(reg,encoding='utf-8')
 summary={'date':'2026-11-16','method':'official Yunxiao OpenAPI','project':'cinlink-WEB','created':2,'historicalDeduplication':False,'ownCheckpointRecoveryEnabled':True,'screenshots':6,'attachments':12,'verified':True,'cases':cases};write(D/SYNC,summary);write(C/'summary.json',summary)
 current=read(D/'execution-status-current.json');assert {c['id']:c for c in current['cases'] if c['id'] not in ['ERYE210-007','ERYE210-015']}==protected
 spec=spec_from_file_location('definitions',R/'tools/editor/define-erye210-restored-eight.py');module=module_from_spec(spec);spec.loader.exec_module(module);(D/'execution-status-current.md').write_text(module.render_current(current),encoding='utf-8')
 links='；'.join(f"ERYE210-{c['caseId'][-3:]} → [{c['identifier']}]({c['url']})" for c in cases)
 text=links+'。6张本轮原图已上传/嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。007中/3-一般，015低/4-轻微。两例仍Failed，当前51条46P/4F/1B；原FWXC-488/493及其余关联保持。本次仅同步既有失败，未重跑产品。'
 report='# ERYE210-007/015 本轮云效同步（2026-11-16）\n\n'+text+'\n\n按既定不去重方式分别新建，旧项保留。每条前置3条，详细准备与复现顺序单列，正文采用九段模板；不增加排查信息。007仅报告Watermark保持、Image变Text，015只报告无选区原因提示缺失，正常分割与撤销作为对照。\n\n[脱敏回执]('+SYNC+') · [本轮完整步骤/原图](results-restored-eight-production-20261116.md) · [当前进度](execution-status-current.md)。\n'
 (D/REPORT).write_text(report,encoding='utf-8')
 for filename in ['cases.md','results-restored-eight-production-20261116.md']:note(D/filename,text+f' [同步明细]({REPORT})。此前“未云效写入”指原执行阶段。')
 for filename,prefix in {'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/',}.items():note(R/filename,text+f' [同步明细]({prefix}{REPORT})。')
 note(R/'AGENTS.md',text+' 同步key已有检查点和回读回执，接管时只读核对，不重放新建。archive-erye210-restored-eight.py已保留cloudDefect关联。说明docs/cases/requirements/ERYE-210/'+REPORT+'。')
 meta=(D/'meta.yaml').read_text(encoding='utf-8');line='  cloud_sync_007_015_restored: '+json.dumps({'date':'2026-11-16','created':2,'defects':[c['identifier'] for c in cases],'screenshots':6,'attachments':12,'verified':True,'historicalDeduplication':False,'report':REPORT},ensure_ascii=False)
 if re.search(r'^  cloud_sync_007_015_restored:.*$',meta,re.M):meta=re.sub(r'^  cloud_sync_007_015_restored:.*$',lambda _:line,meta,flags=re.M)
 else:pos=meta.index('\ndefinition_update_016:');meta=meta[:pos]+'\n'+line+'\n'+meta[pos:]
 yaml.safe_load(meta);(D/'meta.yaml').write_text(meta,encoding='utf-8')
 files=[{'path':str(p.relative_to(E)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':sha(p)} for p in sorted(E.rglob('*')) if p.is_file() and p.name!='manifest.json'];manifest=read(E/'manifest.json');manifest['files']=files;write(E/'manifest.json',manifest)
 print(json.dumps({'verified':True,'defects':[c['identifier'] for c in cases],'screenshots':6,'attachments':12,'counts':current['counts'],'otherCasesUnchanged':49},ensure_ascii=False))
if __name__=='__main__':main()
