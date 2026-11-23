"""Archive this batch's verified receipts; no cloud writes or test execution."""
from pathlib import Path
import json,re,hashlib,copy
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
INPUT=R/'reports/yunxiao/erye199-014-056-unimplemented-production-20261116-input'
LOCAL=R/'reports/yunxiao/erye199-014-056-unimplemented-production-20261116-local-archive'
E=D/'evidence-unimplemented-014-056-sync-20261116'
KEYS={'014':'ERYE199-014-TRACK-EDIT-LOCK-UNIMPLEMENTED-PROD-20261116','056':'ERYE199-056-EFFECT-CAPABILITY-UNIMPLEMENTED-PROD-20261116'}
REPORT='defects-unimplemented-014-056-production-20261116.md'
SYNC='defect-sync-unimplemented-014-056-production-20261116.json'
MARKER='ERYE199-014056-YUNXIAO-063-RETIRED-20261116'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,body):
 s=p.read_text(encoding='utf-8-sig');block='<!-- '+MARKER+' -->\n'+body+'\n<!-- /'+MARKER+' -->\n'
 pattern=r'<!-- '+MARKER+r' -->[\s\S]*?<!-- /'+MARKER+r' -->\n?'
 if re.search(pattern,s):s=re.sub(pattern,lambda _:block,s,count=1)
 else:
  pos=s.index('\n---\n',4)+5 if s.startswith('---\n') else s.index('\n')+1
  s=s[:pos]+'\n'+block+'\n'+s[pos:]
 p.write_text(s,encoding='utf-8')
def issues(value):
 if isinstance(value,dict):
  own={value['id']} if isinstance(value.get('id'),str) and value['id'].startswith('FWXC-') else set()
  return own|set().union(*(issues(x) for x in value.values()))
 if isinstance(value,list):return set().union(*(issues(x) for x in value)) if value else set()
 return set()
def main():
 state_path=D/'execution-status-20261113.json';master=read(state_path)
 expected={'Passed':31,'Failed':8,'Blocked':2,'Not Applicable':21,'Not Run':0}
 assert master['counts']==expected and len(master['cases'])==62
 assert 'ERYE199-063' not in [c['id'] for c in master['cases']]
 LOCAL.mkdir(parents=True,exist_ok=True)
 if not (LOCAL/'before-current.json').exists():write(LOCAL/'before-current.json',master)
 before=read(LOCAL/'before-current.json');defects={}
 for n,key in KEYS.items():
  raw=R/'reports/yunxiao'/key;result=read(raw/'result.json');item=read(raw/'verified-item.json');files=read(raw/'verified-attachments.json');plan=read(INPUT/n/'plan.json')
  desc=(raw/'verified-description.md').read_text(encoding='utf-8-sig')
  assert result['verified'] and result['key']==key and item['id']==result['workitemId']
  assert item['subject']==plan['subject'] and item['description']==desc
  assert item['space']['id']=='1e401ac99539c3999e00e40006'
  assert item['status']['name']=='🤔AI提缺陷' and item['assignedTo']['name']=='牛诗晴'
  assert [l['name'] for l in item['labels']]==['生产环境']
  assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
  assert '__SCREENSHOTS__'not in desc and '**排查信息**'not in desc
  assert len(files)==len(result['attachments'])==(5 if n=='014' else 3)
  embeds=[]
  for image in plan['images']:
   p=INPUT/n/image['path'];f=next(x for x in files if x['fileName']==p.name)
   assert sha(p)==image['sha256'] and f['size']==p.stat().st_size and 'fileIdentifier='+f['id'] in desc
   assert '!['+p.name+']'in desc
   (E/n).mkdir(parents=True,exist_ok=True);(E/n/p.name).write_bytes(p.read_bytes())
   embeds.append({**image,'id':f['id'],'size':f['size'],'embedded':True})
  for f in result['attachments']:
   source=INPUT/n/f['name'];remote=next(x for x in files if x['id']==f['id'])
   assert source.stat().st_size==f['size']==remote['size'] and remote['fileName']==f['name'] and sha(source)==f['sha256']
  priority=lambda k:next(f['values'][0]['displayValue'] for f in item['customFieldValues'] if f['fieldId']==k)
  assert priority('priority')=='中' and priority('seriousLevel')=='3-一般'
  local_name='ERYE199-'+n+'-'+('track-edit-lock' if n=='014' else 'effect-capability')+'-unimplemented-production-20261116.md'
  receipt={'id':item['serialNumber'],'workitem_id':item['id'],'url':result['url'],'title':item['subject'],'case_id':'ERYE199-'+n,
   'key':key,'status':item['status']['name'],'assigned_to':item['assignedTo']['name'],'sprint':item['sprint']['name'],
   'labels':['生产环境'],'priority':'中','serious_level':'3-一般','verified':True,'screenshots':len(plan['images']),
   'attachments':len(files),'images':embeds,'attachment_receipts':result['attachments'],'synced_at':result['verifiedAt'],
   'local_report':'docs/defects/'+local_name,'scope':'未实现功能；证据实测2026-11-13，本次仅补提','rerun_performed':False}
  defects['ERYE199-'+n]=receipt;write(E/n/'receipt.json',receipt)
  (E/n/'verified-description.md').write_text(desc,encoding='utf-8')
  write(E/n/'case-evidence.json',read(INPUT/n/'case-evidence.json'))
  (R/receipt['local_report']).write_text('# '+item['subject']+'\n\n云效：['+receipt['id']+']('+receipt['url']+')；状态'+receipt['status']+'，牛诗晴，生产环境，中 / 3-一般。'
   +str(receipt['screenshots'])+'张历史实测原图已上传嵌入，'+str(receipt['attachments'])+'附件及正文回读通过；未重新执行，用例仍Not Applicable。\n\n'+desc,encoding='utf-8')
  c=next(c for c in master['cases'] if c['id']=='ERYE199-'+n);assert c['status']=='Not Applicable'
  c.update({'defect':receipt,'requirement_gap_defect':receipt,'requirement_gap_sync_status':'Submitted and verified',
   'latest_defect_sync_report':REPORT,'defect_link_scope':'未实现功能缺口；原历史实测截图，不代表本轮实际重测或后续验收通过'})
  reg_path=R/'docs/cases/registry.yaml';s=reg_path.read_text(encoding='utf-8-sig');pattern=r'(?m)^ERYE199-'+n+r':\n[\s\S]*?(?=^\S|\Z)';block=re.search(pattern,s).group(0)
  updated=re.sub(r'(?m)^  (?:defect_id|defect_url|defect_status|defect_sync_verified|defect_screenshots|defect_attachments):.*\n','',block).rstrip()
  updated+='\n  defect_id: "'+receipt['id']+'"\n  defect_url: "'+receipt['url']+'"\n  defect_status: "'+receipt['status']+'"\n  defect_sync_verified: true\n  defect_screenshots: '+str(receipt['screenshots'])+'\n  defect_attachments: '+str(receipt['attachments'])+'\n\n'
  reg_path.write_text(s.replace(block,updated,1),encoding='utf-8')
 summary={'date':'2026-11-16','method':'official Yunxiao OpenAPI via tools/yunxiao','created':2,'deduplication':False,'own_checkpoint_recovery':True,
  'screenshots_uploaded':3,'attachments_verified':8,'verified':True,'cases':defects,'observation_date':'2026-11-13','rerun_performed':False,
  'execution_status':'Not Applicable','retired_case':'ERYE199-063','current_counts':expected}
 write(D/SYNC,summary);write(E/'summary.json',summary)
 aggregate_path=D/'defect-sync-20261113.json';aggregate=read(aggregate_path)
 if not (LOCAL/'before-defect-sync.json').exists():write(LOCAL/'before-defect-sync.json',aggregate)
 if not any(x.get('report')==REPORT for x in aggregate.get('history',[])):
  aggregate['created']+=2;aggregate['screenshots_uploaded']+=3;aggregate['attachments_verified']+=8
  aggregate.setdefault('history',[]).append({'date':'2026-11-16','created':2,'screenshots':3,'attachments':8,'case_ids':list(defects),'report':REPORT,'verified':True,'scope':'未实现能力补提'})
 aggregate['cases'].update(defects);aggregate['updated']='2026-11-16'
 latest={'date':'2026-11-16','created':2,'case_ids':list(defects),'defects':[x['id'] for x in defects.values()],'screenshots':3,'attachments':8,
  'verified':True,'report':REPORT,'rerun_performed':False,'scope':'未实现功能；014/056保持Not Applicable，063已删除'}
 aggregate['latest_batch']=latest
 lifetime=issues(aggregate);assert len(lifetime)==17,(len(lifetime),sorted(lifetime))
 aggregate['count_scope']='累计新建16条，加002既有共17个不同云效缺陷；当前014/056分别补提未实现能力，仍Not Applicable；063已删除未提缺陷。共享FWXC-578、FWXC-525及旧017历史关联均按缺陷计一次。'
 write(aggregate_path,aggregate)
 master['latest_defect_sync']=latest
 master['note']='014/056未实现能力已补提并核验，仍Not Applicable；063按用户要求删除，当前62条31P/8F/2B/21NA/0NR；原业务结果及失败关联保持，本轮未重跑'
 if not any(x.get('report')==REPORT for x in master.get('defect_sync_history',[])):master.setdefault('defect_sync_history',[]).append(latest)
 assert master['counts']==expected
 for c in master['cases']:
  if c['id'] not in defects:assert c==next(x for x in before['cases'] if x['id']==c['id']),c['id']
 write(state_path,master)
 links='；'.join(cid+' → ['+x['id']+']('+x['url']+')' for cid,x in defects.items())
 text=(links+'。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。'
  '两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。'
  '本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。')
 (D/REPORT).write_text('# ERYE199-014/056未实现功能补提及063删除（2026-11-16）\n\n'+text+
  '\n\n分别新建，未查历史去重；014锁定前置未建立，未执行后续批量移动/删除。056缺少实际效果能力查询入口，未把未知后端状态写成已确认缺失，后续参数一致性/缺后端分支未执行。'
  '\n\n[脱敏回执]('+SYNC+') · [063退役说明](retired-case-063-20261116.md) · [当前状态](execution-status-current.md)。\n',encoding='utf-8')
 for name in ['cases.md','execution-status-current.md']:
  f=D/name;s=f.read_text(encoding='utf-8-sig')
  for cid,x in defects.items():
   pattern=r'(?m)^\| '+cid+r' \|.*$'
   s=re.sub(pattern,lambda m,x=x:re.sub(r'；\[云效FWXC-\d+\]\([^)]+\)','',m.group(0)).rstrip().removesuffix('|').rstrip()+'；[云效'+x['id']+']('+x['url']+') |',s)
  f.write_text(s,encoding='utf-8');note(f,text+' [同步明细]('+REPORT+')。')
 for rel,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),
  ('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/'),('AGENTS.md','docs/cases/requirements/ERYE-199/')]:
  note(R/rel,text+' [同步明细]('+prefix+REPORT+')。')
 meta_path=D/'meta.yaml';s=meta_path.read_text(encoding='utf-8-sig')
 s=re.sub(r'(?m)^latest_defect_sync:.*$',lambda _:'latest_defect_sync: '+json.dumps('2026-11-16 ERYE199-014->FWXC-595;056->FWXC-596;unimplemented features;3 original historical screenshots embedded;8 attachments verified;both Not Applicable;063 retired;no rerun'),s)
 meta_path.write_text(s,encoding='utf-8')
 write(E/'manifest.json',[{'file':str(p.relative_to(E)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':sha(p)} for p in sorted(E.rglob('*')) if p.is_file() and p.name!='manifest.json'])
 print(json.dumps({'verified':True,'defects':[x['id'] for x in defects.values()],'screenshots':3,'attachments':8,'counts':master['counts'],
  'retired':'ERYE199-063','lifetime_unique_defects':len(lifetime),'other_cases_unchanged':60},ensure_ascii=False))
if __name__=='__main__':main()
