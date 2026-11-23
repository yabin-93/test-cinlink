"""Archive verified OpenAPI receipts for the authorized 017/053 v2 batch.

No browser execution or network writes. Paths are relative to this checkout.
"""
from pathlib import Path
from collections import Counter
import copy,hashlib,json,re

R=Path(__file__).resolve().parents[2]
D=R/'docs/cases/requirements/ERYE-199'
INPUT=R/'reports/yunxiao/erye199-017-053-v2-production-20261116-input'
LOCAL=R/'reports/yunxiao/erye199-017-053-v2-production-20261116-local-archive'
E=D/'evidence-nine-v2-production-20261116'
CLOUD=E/'cloud-sync-017-053'
KEYS={'017':'ERYE199-017-V2-TRIM-MOVES-B-PROD-20261116','053':'ERYE199-053-V2-EMPTY-SRT-PERSISTED-PROD-20261116'}
REPORT='defects-017-053-v2-production-20261116.md'
SYNC='defect-sync-017-053-v2-production-20261116.json'
MARKER='ERYE199-017053-V2-YUNXIAO-20261116'
LOCAL_NAMES={'017':'ERYE199-017-trim-moves-B-production-20261116.md','053':'ERYE199-053-empty-srt-track-production-20261116.md'}

def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,body):
 text=p.read_text(encoding='utf-8-sig')
 block='<!-- '+MARKER+' -->\n'+body+'\n<!-- /'+MARKER+' -->\n'
 pattern=r'<!-- '+MARKER+r' -->[\s\S]*?<!-- /'+MARKER+r' -->\n?'
 if re.search(pattern,text):text=re.sub(pattern,lambda _:block,text,count=1)
 elif text.startswith('---\n'):
  end=text.index('\n---\n',4)+5;text=text[:end]+'\n'+block+'\n'+text[end:]
 else:
  pos=text.index('\n')+1;text=text[:pos]+'\n'+block+'\n'+text[pos:]
 p.write_text(text,encoding='utf-8')
def field(item,key):return next(f['values'][0]['displayValue'] for f in item['customFieldValues'] if f['fieldId']==key)
def unique_issue_ids(value):
 found=set()
 if isinstance(value,dict):
  if isinstance(value.get('id'),str) and value['id'].startswith('FWXC-'):found.add(value['id'])
  for v in value.values():found|=unique_issue_ids(v)
 elif isinstance(value,list):
  for v in value:found|=unique_issue_ids(v)
 return found

def main():
 master=read(D/'execution-status-20261113.json')
 expected={'Passed':31,'Failed':8,'Blocked':2,'Not Applicable':22,'Not Run':0}
 assert master['counts']==expected
 LOCAL.mkdir(parents=True,exist_ok=True)
 before_file=LOCAL/'before-current.json'
 if not before_file.exists():write(before_file,master)
 before=read(before_file)
 receipts=[];defects={}
 for n,key in KEYS.items():
  raw=R/'reports/yunxiao'/key
  result=read(raw/'result.json');item=read(raw/'verified-item.json')
  files=read(raw/'verified-attachments.json');plan=read(INPUT/n/'plan.json')
  desc=(raw/'verified-description.md').read_text(encoding='utf-8-sig')
  assert result['verified'] and result['key']==key
  assert item['id']==result['workitemId'] and item['subject']==plan['subject'] and item['description']==desc
  assert item['space']['id']=='1e401ac99539c3999e00e40006'
  assert item['status']['name']=='🤔AI提缺陷' and item['assignedTo']['name']=='牛诗晴'
  assert [x['name'] for x in item['labels']]==['生产环境']
  assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
  assert '**排查信息**' not in desc and '__SCREENSHOTS__' not in desc
  assert len(plan['images'])==3 and len(files)==len(result['attachments'])==(5 if n=='017' else 8)
  embeds=[]
  for image in plan['images']:
   f=INPUT/n/image['path'];assert sha(f)==image['sha256']
   attached=next(x for x in files if x['fileName']==f.name)
   assert attached['size']==f.stat().st_size
   assert 'fileIdentifier='+attached['id'] in desc and '!['+f.name+']' in desc
   embeds.append({**image,'id':attached['id'],'size':attached['size'],'embedded':True})
  for f in result['attachments']:
   actual=next(x for x in files if x['id']==f['id'])
   source=INPUT/n/f['name'];assert actual['fileName']==f['name'] and actual['size']==source.stat().st_size==f['size']
   assert sha(source)==f['sha256']
  receipt={'id':item['serialNumber'],'workitem_id':item['id'],'url':result['url'],'title':item['subject'],
    'case_id':'ERYE199-'+n,'key':key,'status':item['status']['name'],'assigned_to':item['assignedTo']['name'],
    'sprint':item['sprint']['name'],'labels':[x['name'] for x in item['labels']],
    'priority':field(item,'priority'),'serious_level':field(item,'seriousLevel'),
    'verified':True,'screenshots':3,'attachments':len(files),'synced_at':result['verifiedAt'],
    'local_report':'docs/defects/'+LOCAL_NAMES[n],'attachment_receipts':result['attachments'],
    'images':embeds,'description_sha256':hashlib.sha256(desc.encode()).hexdigest()}
  assert (receipt['priority'],receipt['serious_level'])==(('高','2-严重') if n=='017' else ('中','3-一般'))
  receipts.append(receipt);defects['ERYE199-'+n]=receipt
  write(CLOUD/n/'receipt.json',receipt)
  (CLOUD/n/'verified-description.md').write_text(desc,encoding='utf-8')
  local=R/receipt['local_report']
  local.write_text('# '+item['subject']+'\n\n云效：['+receipt['id']+']('+receipt['url']+')；状态'+receipt['status']+
    '，负责人'+receipt['assigned_to']+'，生产环境，'+receipt['priority']+' / '+receipt['serious_level']+
    '。3张本轮原图已上传嵌入，'+str(receipt['attachments'])+'附件及正文/字段/图片引用回读通过；本次只同步既有失败，未重新执行。\n\n'+desc,encoding='utf-8')
  for file in [D/'execution-status-20261113.json',D/'execution-status-nine-v2-production-20261116.json']:
   obj=read(file);c=next(c for c in obj['cases'] if c['id']=='ERYE199-'+n);assert c['status']=='Failed'
   c['defect']=receipt;c['current_failure_cloud_status']='Submitted and verified'
   c['latest_defect_sync_report']=REPORT
   c['defect_link_scope']='当前功能v2实测失败对应'+receipt['id']+'；原高级目标缺陷仅历史，未修改旧缺陷状态'
   if n=='017':
    oldcase=next(x for x in before['cases'] if x['id']=='ERYE199-017')
    c['original_requirement_gap_defect']=copy.deepcopy(oldcase['original_requirement_gap_defect'])
    assert c['original_requirement_gap_defect']['id']=='FWXC-510'
   write(file,obj)
  reg_path=R/'docs/cases/registry.yaml';reg=reg_path.read_text(encoding='utf-8-sig')
  pattern=r'(?m)^ERYE199-'+n+r':\n[\s\S]*?(?=^\S|\Z)'
  old=re.search(pattern,reg).group(0)
  block=re.sub(r'(?m)^  (?:defect_id|defect_url|defect_status|defect_sync_verified|defect_screenshots|defect_attachments|historical_defect_id):.*\n','',old)
  block=block.rstrip()+'\n  defect_id: "'+receipt['id']+'"\n  defect_url: "'+receipt['url']+'"\n  defect_status: "'+receipt['status']+'"\n  defect_sync_verified: true\n  defect_screenshots: 3\n  defect_attachments: '+str(receipt['attachments'])+'\n'
  if n=='017':block+='  historical_defect_id: "FWXC-510"\n'
  reg_path.write_text(reg.replace(old,block+'\n',1),encoding='utf-8')

 summary={'date':'2026-11-16','method':'official Yunxiao OpenAPI via tools/yunxiao','created':2,
  'deduplication':False,'own_checkpoint_recovery':True,'screenshots_uploaded':6,'attachments_verified':13,
  'verified':True,'cases':defects,'rerun_performed':False,'execution_counts_unchanged':expected}
 write(D/SYNC,summary);write(CLOUD/'summary.json',summary)
 aggregate_file=D/'defect-sync-20261113.json';aggregate=read(aggregate_file)
 if not (LOCAL/'before-defect-sync.json').exists():write(LOCAL/'before-defect-sync.json',aggregate)
 if not any(x.get('report')==REPORT for x in aggregate.get('history',[])):
  old17=aggregate['cases'].get('ERYE199-017')
  if old17 and old17['id']!='FWXC-590':
   aggregate.setdefault('historical_case_defects',{}).setdefault('ERYE199-017',[]).append(old17)
  aggregate['created']+=2;aggregate['screenshots_uploaded']+=6;aggregate['attachments_verified']+=13
  aggregate.setdefault('history',[]).append({'date':'2026-11-16','created':2,'screenshots':6,'attachments':13,'case_ids':list(defects),'report':REPORT,'verified':True})
 aggregate['cases'].update(defects);aggregate['updated']='2026-11-16'
 aggregate['latest_batch']={'created':2,'case_ids':list(defects),'defects':[c['id'] for c in receipts],
   'screenshots':6,'attachments':13,'verified':True,'report':REPORT,'rerun_performed':False}
 lifetime=unique_issue_ids(aggregate)
 assert len(lifetime)==15,(len(lifetime),sorted(lifetime))
 aggregate['count_scope']='累计新建14条，加002既有共15个不同云效缺陷；旧017/FWXC-510保留历史，新017/FWXC-590与053/FWXC-591分别计新建。029/047/048共享FWXC-578和原24条需求缺口FWXC-525各只计一次；当前8条Failed均已有关联。'
 write(aggregate_file,aggregate)
 master=read(D/'execution-status-20261113.json')
 latest={'created':2,'case_ids':list(defects),'defects':[c['id'] for c in receipts],'screenshots':6,'attachments':13,'verified':True,'report':REPORT,'rerun_performed':False,'date':'2026-11-16'}
 master['latest_defect_sync']=latest
 if not any(x.get('report')==REPORT for x in master.get('defect_sync_history',[])):master.setdefault('defect_sync_history',[]).append(latest)
 # Remove obsolete cross-case cloud notes, preserving every business result.
 for c in master['cases']:
  if c['id'] not in defects and '本轮新017/053失败未同步云效' in c.get('defect_link_scope',''):
   c['defect_link_scope']='本例仅保留原高级目标/旧定义关联；017/053的当前v2失败已另行同步，见最新同步报告，不改变本例结果'
 assert master['counts']==expected
 for c in master['cases']:
  old=next(x for x in before['cases'] if x['id']==c['id'])
  if c['id']not in defects:
   assert {k:v for k,v in c.items() if k!='defect_link_scope'}=={k:v for k,v in old.items() if k!='defect_link_scope'},c['id']
 write(D/'execution-status-20261113.json',master)
 batch=read(D/'execution-status-nine-v2-production-20261116.json');batch['subsequent_cloud_sync']=latest
 write(D/'execution-status-nine-v2-production-20261116.json',batch)
 failed=[c['id'] for c in master['cases'] if c['status']=='Failed']
 assert len(failed)==8 and all(aggregate['cases'].get(cid,{}).get('verified') for cid in failed)
 links='；'.join(c['case_id']+' → ['+c['id']+']('+c['url']+')' for c in receipts)
 text=(links+'。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。'
  '017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。'
  '本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。')
 report=('# ERYE199-017/053 v2失败同步云效（2026-11-16）\n\n'+text+
  '\n\n按既定不去重方式分别新建两条；本批自身同步key保留检查点，后续只读回查，不能重放为新提交。'
  '每条前置3项，正文包含完整提示词或原生操作入口、详细复现/刷新步骤、实际与预期及验证边界。'
  '017附原片及前后业务范围；053附原片、合法/非法时码SRT和0字节样本重建说明，不把空样本说明冒充上传的SRT。\n\n'
  '| 用例 | 云效 | 失败范围 | 原图/附件 |\n|---|---|---|---|\n'
  '| ERYE199-017 | ['+receipts[0]['id']+']('+receipts[0]['url']+') | A裁短连带B和原声从5秒移到3秒，空隙闭合，刷新保持 | 3 / 5 |\n'
  '| ERYE199-053 | ['+receipts[1]['id']+']('+receipts[1]['url']+') | 空SRT无提示并写入持久空轨；非法时码拒绝及原字幕恢复正常 | 3 / 8 |\n\n'
  '[脱敏回执]('+SYNC+') · [017完整缺陷](../../../defects/'+LOCAL_NAMES['017']+') · [053完整缺陷](../../../defects/'+LOCAL_NAMES['053']+') · '
  '[当前状态](execution-status-current.md)。原执行报告的“未云效写入”指原测试阶段，本次为后续同步。\n')
 (D/REPORT).write_text(report,encoding='utf-8')
 for filename in ['cases.md','results-nine-v2-production-20261116.md','execution-status-current.md']:
  file=D/filename;content=file.read_text(encoding='utf-8-sig')
  if filename=='cases.md':
   for n,c in zip(KEYS,receipts):
    pattern=r'(?m)^\| ERYE199-'+n+r' \|.*$'
    def append_link(m,c=c):
     line=re.sub(r'；\[云效FWXC-\d+\]\([^)]+\)','',m.group(0))
     return line.rstrip().removesuffix('|').rstrip()+'；[云效'+c['id']+']('+c['url']+') |'
    content=re.sub(pattern,append_link,content)
  if filename=='execution-status-current.md':
   for n,c in zip(KEYS,receipts):
    pattern=r'(?m)^\| ERYE199-'+n+r' \|.*$'
    content=re.sub(pattern,lambda m,c=c:re.sub(r'；\[云效FWXC-\d+\]\([^)]+\)','',m.group(0)).rstrip().removesuffix('|').rstrip()+'；[云效'+c['id']+']('+c['url']+') |',content)
  content=content.replace('新017/053失败尚未同步云效','017/053当前失败已同步FWXC-590/591')
  content=content.replace('新失败017/053尚未同步云效','017/053当前失败已同步FWXC-590/591')
  content=content.replace('017/053新失败未云效同步','017/053新失败已同步FWXC-590/591')
  file.write_text(content,encoding='utf-8')
  note(file,text+' [同步明细]('+REPORT+')。此前未云效写入指测试执行阶段。')
 for rel,prefix in [
  ('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),
  ('docs/codex-context.md','cases/requirements/ERYE-199/'),
  ('AGENTS.md','docs/cases/requirements/ERYE-199/')]:
  note(R/rel,text+' [同步明细]('+prefix+REPORT+')。本批已完成，后续只核对检查点，不重新新建。')
 meta_path=D/'meta.yaml';meta=meta_path.read_text(encoding='utf-8-sig')
 value='2026-11-16 ERYE199-017->FWXC-590;053->FWXC-591;2 created;6 original screenshots embedded;13 attachments verified;8 current Failed all linked;no rerun'
 meta=re.sub(r'(?m)^latest_defect_sync:.*$',lambda m:'latest_defect_sync: '+json.dumps(value,ensure_ascii=False),meta)
 meta_path.write_text(meta,encoding='utf-8')
 files=[{'file':str(p.relative_to(CLOUD)).replace('\\','/'),'sha256':sha(p),'bytes':p.stat().st_size} for p in sorted(CLOUD.rglob('*')) if p.is_file() and p.name!='manifest.json']
 write(CLOUD/'manifest.json',files)
 print(json.dumps({'verified':True,'defects':[c['id'] for c in receipts],'screenshots':6,'attachments':13,
  'counts':master['counts'],'current_failed_cases_linked':8,'lifetime_unique_defects':len(lifetime),'other_business_results_unchanged':61},ensure_ascii=False))

if __name__=='__main__':main()
