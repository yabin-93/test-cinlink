"""Archive verified receipts for this batch. No network writes or browser execution."""
from pathlib import Path
import hashlib,json,re,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
E=D/'evidence-restored-final-five-production-20261116';C=E/'cloud-sync-018-020'
INPUT=R/'reports/yunxiao/erye210-018-020-restored-20261116-input'
KEYS={'018':'ERYE210-018-VOICE-APPLY-CONCURRENT-WATERMARK-PROD-20261116','020':'ERYE210-020-VOICE-TEXT-UNDO-EMPTY-PROD-20261116'}
REPORT='defects-018-020-restored-production-20261116.md';SYNC='defect-sync-018-020-restored-production-20261116.json'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,text):
 marker='ERYE210-018020-YUNXIAO-20261116';s=p.read_text(encoding='utf-8');b=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if '<!-- '+marker+' -->' in s:s=re.sub(r'<!-- '+marker+r' -->.*?<!-- /'+marker+r' -->\n?',lambda _:b,s,flags=re.S)
 elif s.startswith('---\n'):
  end=s.find('\n---\n',4)+5;s=s[:end]+'\n'+b+s[end:]
 else:first,sep,rest=s.partition('\n');s=first+sep+'\n'+b+'\n'+rest
 p.write_text(s,encoding='utf-8')
def main():
 current=read(D/'execution-status-current.json');expected={'Passed':49,'Failed':6,'Blocked':1,'Not Applicable':0,'Not Run':0};assert current['counts']==expected
 out=R/'reports/yunxiao/erye210-018-020-restored-20261116-local-archive';out.mkdir(parents=True,exist_ok=True)
 before=out/'before-current.json'
 if not before.exists():write(before,current)
 excluded=['ERYE210-'+x for x in KEYS];protected={c['id']:c for c in read(before)['cases'] if c['id']not in excluded}
 cases=[]
 for cid,key in KEYS.items():
  state=R/'reports/yunxiao'/key;result=read(state/'result.json');item=read(state/'verified-item.json');files=read(state/'verified-attachments.json');plan=read(INPUT/cid/'plan.json');desc=(state/'verified-description.md').read_text(encoding='utf-8')
  assert result['verified']and result['key']==key and item['id']==result['workitemId']and item['subject']==plan['subject']and item['description']==desc
  assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
  assert '__SCREENSHOTS__'not in desc and '**排查信息**'not in desc
  embedded=[]
  for image in plan['images']:
   p=INPUT/cid/image['path'];assert sha(p)==image['sha256']==sha(E/cid/p.name)
   f=next(f for f in files if f['fileName']==p.name);assert f['size']==p.stat().st_size
   assert f"fileIdentifier={f['id']}"in desc and f'![{p.name}]'in desc
   embedded.append({'name':p.name,'id':f['id'],'sha256':sha(p),'size':p.stat().st_size,'embedded':True,'caption':image['caption']})
  assert len(embedded)==3 and len(result['attachments'])==len(files)==6
  for f in result['attachments']:
   persisted=next(x for x in files if x['id']==f['id']);assert persisted['fileName']==f['name']and persisted['size']==f['size']
  field=lambda name:next(f['values'][0]['displayValue']for f in item['customFieldValues']if f['fieldId']==name)
  receipt={'caseId':'ERYE210-'+cid,'key':key,'identifier':item['serialNumber'],'workitemId':item['id'],'url':result['url'],'subject':item['subject'],'verified':True,'verifiedAt':result['verifiedAt'],'status':item['status']['name'],'assignedTo':item['assignedTo']['name'],'sprint':item['sprint']['name'],'labels':[x['name']for x in item['labels']],'priority':field('priority'),'seriousLevel':field('seriousLevel'),'screenshots':3,'attachmentCount':6,'images':embedded,'attachments':result['attachments'],'descriptionSha256':hashlib.sha256(desc.encode()).hexdigest()}
  assert receipt['assignedTo']=='牛诗晴'and receipt['labels']==['生产环境']
  cases.append(receipt);folder=C/cid;folder.mkdir(parents=True,exist_ok=True);write(folder/'receipt.json',receipt);(folder/'verified-description.md').write_text(desc,encoding='utf-8')
  cloud={k:receipt[k]for k in ['identifier','workitemId','url','status','verified','verifiedAt','screenshots','attachmentCount']};cloud['syncReport']=REPORT
  for file in [D/'execution-status-current.json',D/'execution-status-restored-final-five-production-20261116.json']:
   obj=read(file);c=next(c for c in obj['cases']if c['id']==receipt['caseId']);assert c['status']=='Failed';c['cloudDefect']=cloud;write(file,obj)
  obj=read(E/cid/'result.json');obj['cloudDefect']=cloud;write(E/cid/'result.json',obj)
  local=R/'docs/defects'/('ERYE210-018-voice-apply-concurrent-watermark-production-20261116.md'if cid=='018'else'ERYE210-020-voice-text-undo-empty-production-20261116.md')
  local.write_text('# '+item['subject']+'\n\n云效：['+item['serialNumber']+']('+result['url']+')；官方OpenAPI新建，状态'+receipt['status']+'，负责人'+receipt['assignedTo']+'，'+receipt['priority']+' / '+receipt['seriousLevel']+'。3张本轮原图上传并嵌入，6附件及正文/字段/图片引用回读通过。\n\n'+desc,encoding='utf-8')
  regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8');match=re.search(r'^'+receipt['caseId']+r':\n(?:(?!^\S).*(?:\n|$))*',reg,re.M);body=yaml.safe_load(match.group())[receipt['caseId']]
  if'historical_defect_id'not in body:body['historical_defect_id']=body.get('defect_id');body['historical_defect_url']=body.get('defect_url')
  body.update(defect_id=receipt['identifier'],defect_url=receipt['url'],defect_status=receipt['status'],defect_sync_verified=True,defect_screenshots=3,defect_attachments=6)
  reg=reg[:match.start()]+yaml.safe_dump({receipt['caseId']:body},allow_unicode=True,sort_keys=False)+reg[match.end():];regpath.write_text(reg,encoding='utf-8')
 summary={'date':'2026-11-16','method':'official Yunxiao OpenAPI','project':'cinlink-WEB','created':2,'historicalDeduplication':False,'ownCheckpointRecoveryEnabled':True,'screenshots':6,'attachments':12,'verified':True,'cases':cases};write(D/SYNC,summary);write(C/'summary.json',summary)
 current=read(D/'execution-status-current.json');assert current['counts']==expected and{c['id']:c for c in current['cases']if c['id']not in excluded}==protected
 mdpath=D/'execution-status-current.md';md=mdpath.read_text(encoding='utf-8')
 for c in cases:
  pattern=r'^\| '+c['caseId']+r' \|.*$';line=re.search(pattern,md,re.M).group();line=re.sub(r'；\[云效FWXC-\d+\]\([^)]+\)','',line);new=line.rstrip().removesuffix('|').rstrip()+f"；[云效{c['identifier']}]({c['url']}) |";md=re.sub(pattern,lambda _:new,md,flags=re.M)
 mdpath.write_text(md,encoding='utf-8')
 links='；'.join(f"{c['caseId']} → [{c['identifier']}]({c['url']})"for c in cases)
 text=links+'。6张本轮原图已上传并嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。018高/2-严重，020中/3-一般。两例仍Failed，当前56条49P/6F/1B；旧FWXC-506/507及其他54条结果保持。本次仅同步既有失败，未重跑产品。'
 report='# ERYE210-018/020 本轮云效同步（2026-11-16）\n\n'+text+'\n\n按既定不去重方式分别新建，旧缺陷保留。前置各3条，正文九段，完整原生翻译配音准备提示词及详细目标复现顺序已写明。018同时附真实处理中水印对照、最终错误原图；020同时附保存切页对照、一次撤销空态原图。018水印保持及020声音/字幕保持均如实记录；未执行的后续分支未判通过，未断言内部根因或服务端数据删除。\n\n[脱敏回执]('+SYNC+') · [本轮完整结果/原图](results-restored-final-five-production-20261116.md) · [当前进度](execution-status-current.md)。\n'
 (D/REPORT).write_text(report,encoding='utf-8')
 for filename in ['cases.md','results-restored-final-five-production-20261116.md']:note(D/filename,text+f' [同步明细]({REPORT})。此前“未云效写入”指原执行阶段。')
 for filename,prefix in {'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/','docs/cases/editor-linked-196-206-210.md':'requirements/ERYE-210/'}.items():note(R/filename,text+f' [同步明细]({prefix}{REPORT})。')
 note(R/'AGENTS.md',text+' 同步key已有检查点和回读回执，后续只读核对，不重放新建。archive-erye210-restored-five.py已保留cloudDefect关联。说明docs/cases/requirements/ERYE-210/'+REPORT+'。')
 meta=(D/'meta.yaml').read_text(encoding='utf-8');line='  cloud_sync_018_020_restored: '+json.dumps({'date':'2026-11-16','created':2,'defects':[c['identifier']for c in cases],'screenshots':6,'attachments':12,'verified':True,'historicalDeduplication':False,'report':REPORT},ensure_ascii=False)
 if re.search(r'^  cloud_sync_018_020_restored:.*$',meta,re.M):meta=re.sub(r'^  cloud_sync_018_020_restored:.*$',lambda _:line,meta,flags=re.M)
 else:pos=meta.index('\ndefinition_update_016:');meta=meta[:pos]+'\n'+line+'\n'+meta[pos:]
 yaml.safe_load(meta);(D/'meta.yaml').write_text(meta,encoding='utf-8')
 files=[{'path':str(p.relative_to(E)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':sha(p)}for p in sorted(E.rglob('*'))if p.is_file()and p.name!='manifest.json'];manifest=read(E/'manifest.json');manifest['files']=files;write(E/'manifest.json',manifest)
 print(json.dumps({'verified':True,'defects':[c['identifier']for c in cases],'screenshots':6,'attachments':12,'counts':current['counts'],'otherCasesUnchanged':54},ensure_ascii=False))
if __name__=='__main__':main()
