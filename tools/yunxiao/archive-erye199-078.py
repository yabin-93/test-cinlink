"""Archive verified 078 OpenAPI sync receipts; preserve execution outcomes."""
from pathlib import Path
from collections import Counter
import json,re,hashlib,copy
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
KEY='ERYE199-078-EXTRA-SOURCE-SUBTITLE-TRACKS-PROD-20261118'
INPUT=R/'reports/yunxiao/erye199-078-production-20261118-input';RAW=R/'reports/yunxiao'/KEY
LOCAL=R/'reports/yunxiao/erye199-078-production-20261118-local-archive'
REPORT='defects-078-production-20261118.md';SYNC='defect-sync-078-production-20261118.json'
MARKER='ERYE199-078-YUNXIAO-20261118';CLOUD=D/'evidence-076-080-production-20261118/cloud-sync-078'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,body):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S)
 p.write_text(f'<!-- {MARKER} -->\n{body}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
def backup(p):
 target=LOCAL/p.relative_to(R)
 if not target.exists():write(target,read(p))
def field(item,k):return next(x['values'][0]['displayValue']for x in item['customFieldValues']if x['fieldId']==k)
result=read(RAW/'result.json');item=read(RAW/'verified-item.json');files=read(RAW/'verified-attachments.json');plan=read(INPUT/'plan.json');desc=(RAW/'verified-description.md').read_text(encoding='utf-8-sig')
assert result['verified'] and result['key']==KEY and result['workitemId']==item['id'] and result['serialNumber']==item['serialNumber']
assert item['subject']==plan['subject'] and item['description']==desc and item['space']['id']=='1e401ac99539c3999e00e40006'
assert item['status']['name']=='🤔AI提缺陷' and item['assignedTo']['name']=='牛诗晴'
assert [x['name']for x in item['labels']]==['生产环境'] and (field(item,'priority'),field(item,'seriousLevel'))==('中','3-一般')
assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
assert len(plan['images'])==4 and len(files)==len(result['attachments'])==6 and '__SCREENSHOTS__'not in desc
images=[]
for f in plan['images']+plan['attachments']:
 p=INPUT/f['path'];assert sha(p)==f['sha256'];cloud=next(x for x in files if x['fileName']==p.name)
 receipt=next(x for x in result['attachments']if x['id']==cloud['id']);assert cloud['size']==p.stat().st_size==receipt['size'] and receipt['sha256']==sha(p)
 if f in plan['images']:
  assert '!['+p.name+']'in desc and 'fileIdentifier='+cloud['id']in desc
  images.append({'name':p.name,'id':cloud['id'],'sha256':sha(p),'size':p.stat().st_size,'caption':f['caption'],'embedded':True})
receipt={'id':item['serialNumber'],'workitem_id':item['id'],'url':result['url'],'title':item['subject'],'case_id':'ERYE199-078','key':KEY,'status':item['status']['name'],'assigned_to':item['assignedTo']['name'],'sprint':item['sprint']['name'],'labels':[x['name']for x in item['labels']],'priority':field(item,'priority'),'serious_level':field(item,'seriousLevel'),'verified':True,'screenshots':4,'attachments':6,'synced_at':result['verifiedAt'],'local_report':'docs/defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md','attachment_receipts':result['attachments'],'images':images,'description_sha256':hashlib.sha256(desc.encode()).hexdigest()}
link=f'[{receipt["id"]}]({receipt["url"]})'
latest={'date':'2026-11-18','created':1,'case_ids':['ERYE199-078'],'defects':[receipt['id']],'screenshots':4,'images':4,'attachments':6,'verified':True,'report':REPORT,'rerun_performed':False}
summary={'date':'2026-11-18','method':'official Yunxiao OpenAPI via tools/yunxiao','deduplication':False,'own_checkpoint_recovery':True,'created':1,'native_screenshots_uploaded':4,'images_uploaded':4,'attachments_verified':6,'verified':True,'rerun_performed':False,'cases':{'ERYE199-078':receipt}}
write(D/SYNC,summary);write(CLOUD/'receipt.json',receipt);(CLOUD/'verified-description.md').write_text(desc,encoding='utf-8')
paths=[D/'execution-status-20261113.json',D/'execution-status-076-080-production-20261118.json',D/'execution-status-multitrack-20261118.json']
for path in paths:
 obj=read(path);backup(path);before=copy.deepcopy(obj);case=next(c for c in obj['cases']if c['id']=='ERYE199-078')
 assert case['status']=='Failed';assert not case.get('defect',{}).get('verified') or case['defect']['workitem_id']==item['id']
 case.update(defect=receipt,cloud_sync='Submitted and verified',current_failure_cloud_status='Submitted and verified',latest_defect_sync_report=REPORT)
 obj['latest_defect_sync']=latest
 if path==paths[0]:
  if not any(h.get('report')==REPORT for h in obj.get('defect_sync_history',[])):obj.setdefault('defect_sync_history',[]).append(latest)
 else:obj['subsequent_cloud_sync']=latest;obj['cloud_sync']=True
 assert Counter(c['status']for c in obj['cases'])==Counter(c['status']for c in before['cases'])
 for c in obj['cases']:
  if c['id']!='ERYE199-078':assert c==next(x for x in before['cases']if x['id']==c['id'])
 write(path,obj)
master=read(paths[0]);counts=master['counts'];assert counts=={'Passed':42,'Failed':9,'Blocked':2,'Not Applicable':21,'Not Run':68}
aggregate_path=D/'defect-sync-20261113.json';backup(aggregate_path);aggregate=read(aggregate_path)
if not any(h.get('report')==REPORT for h in aggregate.get('history',[])):
 aggregate['created']+=1;aggregate['screenshots_uploaded']+=4;aggregate['attachments_verified']+=6;aggregate.setdefault('history',[]).append(latest)
aggregate['cases']['ERYE199-078']=receipt;aggregate['updated']='2026-11-18';aggregate['latest_batch']=latest
aggregate['count_scope']='累计按工作项身份计数，既有共享/历史缺陷保留；2026-11-18新增078一条，4张原始截图嵌入，原片及精简证据共6附件回读通过。'
write(aggregate_path,aggregate)
execution=R/'reports/erye199-076-080-production-20261118/execution.json';backup(execution);obj=read(execution)
for key in ['078-S0','078-S1','078-T2']:obj['cases'][key].update(defect=receipt,cloud_sync='Submitted and verified')
obj['latest_defect_sync']=latest;write(execution,obj)
reg_path=R/'docs/cases/registry.yaml';reg=reg_path.read_text(encoding='utf-8');pattern=r'(?m)^ERYE199-078:\n[\s\S]*?(?=^\S|\Z)';block=re.search(pattern,reg).group(0)
block=re.sub(r'(?m)^  (defect_id|defect_url|defect_status|defect_sync_verified|defect_screenshots|defect_attachments):.*\n','',block)
block=block.rstrip()+f'\n  defect_id: "{receipt["id"]}"\n  defect_url: "{receipt["url"]}"\n  defect_status: "{receipt["status"]}"\n  defect_sync_verified: true\n  defect_screenshots: 4\n  defect_attachments: 6\n'
reg_path.write_text(re.sub(pattern,lambda _:block,reg,count=1),encoding='utf-8')
text=f'ERYE199-078已同步{link}：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。'
for name in ['cases.md','execution-status-current.md','coverage-overview.md','results-076-080-production-20261118.md']:
 path=D/name;s=path.read_text(encoding='utf-8')
 s=s.replace('失败截图与本地缺陷已保存，未提交云效。',f'失败截图与本地缺陷已保存，后续已同步{receipt["id"]}。')
 if name=='cases.md':s=re.sub(r'(?m)^\| ERYE199-078 \|.*$',lambda m:m[0].rstrip().removesuffix('|').rstrip()+f'；[云效{receipt["id"]}]({receipt["url"]}) |'if receipt['id']not in m[0]else m[0],s)
 if name=='results-076-080-production-20261118.md':
  s=s.replace('未写云效。',f'原测试阶段未写云效，后续已同步{receipt["id"]}。').replace('本轮仅本地记录，未提交云效。',f'后续已同步{link}，4张原始截图上传并嵌入，6附件回读通过。')
 path.write_text(s,encoding='utf-8');note(path,text+f' [同步明细]({REPORT})。原“未写云效”指测试执行阶段。')
for rel,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/'),('AGENTS.md','docs/cases/requirements/ERYE-199/')]:
 path=R/rel;s=path.read_text(encoding='utf-8').replace('失败截图与本地缺陷已保存，未提交云效。',f'失败截图与本地缺陷已保存，后续已同步{receipt["id"]}。');path.write_text(s,encoding='utf-8')
 note(path,text+f' [同步明细]({prefix+REPORT})。本批检查点已完成，后续仅回查，不重复创建。')
local=R/receipt['local_report'];s=local.read_text(encoding='utf-8').replace('当前为本地缺陷，未提交云效。',f'已同步云效{link}，对应4张截图已上传并嵌入，6附件回读通过。');local.write_text(s,encoding='utf-8');note(local,text)
meta_path=D/'meta.yaml';s=meta_path.read_text(encoding='utf-8');s=re.sub(r'(?m)^latest_defect_sync:.*$',lambda _:'latest_defect_sync: '+json.dumps(f'2026-11-18 ERYE199-078->{receipt["id"]};4 screenshots embedded;6 attachments verified;Failed unchanged;no rerun',ensure_ascii=False),s);meta_path.write_text(s,encoding='utf-8')
(D/REPORT).write_text('# ERYE199-078失败同步云效（2026-11-18）\n\n'+text+'\n\n前置保留生产环境、新建专用项目/会话和附件原片，完整列出三轮提示词及串行操作；明确原片及历史工程隔离通过，后两轮额外英文字幕轨失败。按用户既定不去重方式新建1条，不修改FWXC-693等旧缺陷。\n\n4张原图SHA256、云效附件ID/文件名/字节数与正文稳定图片引用已逐一核对；原片和精简证据一并上传。未上传原始run响应、凭据或带签名URL。\n\n[脱敏回执]('+SYNC+') · [云效正文回读](evidence-076-080-production-20261118/cloud-sync-078/verified-description.md) · [完整本地缺陷](../../../defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md) · [测试结果](results-076-080-production-20261118.md)。\n\n其余141条测试结果及既有缺陷关联保持。统一入口不写执行结果或同步流水；本批检查点已完成，后续不重复新建。\n',encoding='utf-8')
print(json.dumps({'verified':True,'defect':receipt['id'],'screenshots':4,'attachments':6,'unchangedOtherCases':141,'counts':counts},ensure_ascii=True))
