"""Archive verified 071 defect receipts only; no browser or network writes."""
from pathlib import Path
from collections import Counter
import json,hashlib,re,copy
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
KEY='ERYE199-071-TRANSLATION-ONLY-PREVIEW-BILINGUAL-PROD-20261118'
INPUT=R/'reports/yunxiao/erye199-071-production-20261118-input';RAW=R/'reports/yunxiao'/KEY
LOCAL=R/'reports/yunxiao/erye199-071-production-20261118-local-archive'
REPORT='defects-071-production-20261118.md';SYNC='defect-sync-071-production-20261118.json'
MARKER='ERYE199-071-YUNXIAO-20261118';CLOUD=D/'evidence-069-075-production-20261118/cloud-sync-071'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def note(p,body):
 text=p.read_text(encoding='utf-8-sig');block=f'<!-- {MARKER} -->\n{body}\n<!-- /{MARKER} -->\n\n';text=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',text,flags=re.S);p.write_text(block+text,encoding='utf-8')
def field(item,key):return next(f['values'][0]['displayValue']for f in item['customFieldValues']if f['fieldId']==key)
result=read(RAW/'result.json');item=read(RAW/'verified-item.json');files=read(RAW/'verified-attachments.json');plan=read(INPUT/'plan.json');desc=(RAW/'verified-description.md').read_text(encoding='utf-8-sig')
assert result['verified']and result['key']==KEY and item['id']==result['workitemId']and item['serialNumber']==result['serialNumber']
assert item['subject']==plan['subject'] and item['description']==desc and item['space']['id']=='1e401ac99539c3999e00e40006'
assert item['status']['name']=='🤔AI提缺陷' and item['assignedTo']['name']=='牛诗晴'
assert [x['name']for x in item['labels']]==['生产环境']and (field(item,'priority'),field(item,'seriousLevel'))==('中','3-一般')
assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
assert len(plan['images'])==5 and len(files)==len(result['attachments'])==8 and '__SCREENSHOTS__'not in desc
images=[]
for f in plan['images']+plan['attachments']:
 p=INPUT/f['path'];assert sha(p)==f['sha256'];cloud=next(x for x in files if x['fileName']==p.name);assert cloud['size']==p.stat().st_size
 receipt=next(x for x in result['attachments']if x['id']==cloud['id']);assert receipt['sha256']==sha(p)and receipt['size']==p.stat().st_size
 if f in plan['images']:
  assert '!['+p.name+']'in desc and 'fileIdentifier='+cloud['id']in desc
  images.append({'name':p.name,'id':cloud['id'],'sha256':sha(p),'size':p.stat().st_size,'caption':f['caption'],'embedded':True})
receipt={'id':item['serialNumber'],'workitem_id':item['id'],'url':result['url'],'title':item['subject'],'case_id':'ERYE199-071','key':KEY,'status':item['status']['name'],'assigned_to':item['assignedTo']['name'],'sprint':item['sprint']['name'],'labels':[x['name']for x in item['labels']],'priority':field(item,'priority'),'serious_level':field(item,'seriousLevel'),'verified':True,'screenshots':3,'comparison_frames':2,'images_uploaded':5,'attachments':8,'synced_at':result['verifiedAt'],'local_report':'docs/defects/ERYE199-071-translation-only-preview-bilingual-production-20261118.md','attachment_receipts':result['attachments'],'images':images,'description_sha256':hashlib.sha256(desc.encode()).hexdigest()}
link=f'[{receipt["id"]}]({receipt["url"]})';latest={'date':'2026-11-18','created':1,'case_ids':['ERYE199-071'],'defects':[receipt['id']],'screenshots':3,'comparison_frames':2,'images':5,'attachments':8,'verified':True,'report':REPORT,'rerun_performed':False}
summary={'date':'2026-11-18','method':'official Yunxiao OpenAPI via tools/yunxiao','deduplication':False,'own_checkpoint_recovery':True,'created':1,'native_screenshots_uploaded':3,'comparison_frames_uploaded':2,'images_uploaded':5,'attachments_verified':8,'verified':True,'rerun_performed':False,'cases':{'ERYE199-071':receipt}}
write(D/SYNC,summary);write(CLOUD/'receipt.json',receipt);(CLOUD/'verified-description.md').write_text(desc,encoding='utf-8')
LOCAL.mkdir(parents=True,exist_ok=True)
paths=[D/'execution-status-20261113.json',D/'execution-status-069-075-production-20261118.json',D/'execution-status-multitrack-20261118.json']
for path in paths:
 obj=read(path);backup=LOCAL/('before-'+path.name)
 if not backup.exists():write(backup,obj)
 before=copy.deepcopy(obj);case=next(c for c in obj['cases']if c['id']=='ERYE199-071');assert case['status']=='Failed'
 case.update(defect=receipt,cloud_sync='Submitted and verified',current_failure_cloud_status='Submitted and verified',latest_defect_sync_report=REPORT)
 obj['latest_defect_sync']=latest
 if path==paths[0]:
  if not any(h.get('report')==REPORT for h in obj.get('defect_sync_history',[])):obj.setdefault('defect_sync_history',[]).append(latest)
 else:obj['subsequent_cloud_sync']=latest;obj['cloud_sync']=True
 assert Counter(c['status']for c in obj['cases'])==Counter(c['status']for c in before['cases'])
 for c in obj['cases']:
  if c['id']!='ERYE199-071':assert c==next(x for x in before['cases']if x['id']==c['id'])
 write(path,obj)
master=read(paths[0]);assert master['counts']=={'Passed':38,'Failed':8,'Blocked':2,'Not Applicable':21,'Not Run':73}
aggregate_path=D/'defect-sync-20261113.json';aggregate=read(aggregate_path)
if not (LOCAL/'before-defect-sync-20261113.json').exists():write(LOCAL/'before-defect-sync-20261113.json',aggregate)
if not any(h.get('report')==REPORT for h in aggregate.get('history',[])):
 aggregate['created']+=1;aggregate['screenshots_uploaded']+=5;aggregate['attachments_verified']+=8
 aggregate.setdefault('history',[]).append(latest)
aggregate['cases']['ERYE199-071']=receipt;aggregate['updated']='2026-11-18';aggregate['latest_batch']=latest
aggregate['count_scope']='累计记录按工作项身份计数；既有共享/历史缺陷保留。2026-11-18新增071一条，5张图片为3张原生截图及2张抽帧对照，8附件回读通过。'
write(aggregate_path,aggregate)
execution=R/'reports/erye199-069-075-production-20261118/execution.json';obj=read(execution);obj['cases']['071'].update(defect=receipt,cloud_sync='Submitted and verified');obj['latest_defect_sync']=latest;write(execution,obj)
reg_path=R/'docs/cases/registry.yaml';reg=reg_path.read_text(encoding='utf-8');pattern=r'(?m)^ERYE199-071:\n[\s\S]*?(?=^\S|\Z)';block=re.search(pattern,reg).group(0)
block=re.sub(r'(?m)^  (defect_id|defect_url|defect_status|defect_sync_verified|defect_screenshots|defect_comparison_frames|defect_attachments):.*\n','',block)
block=block.rstrip()+f'\n  defect_id: "{receipt["id"]}"\n  defect_url: "{receipt["url"]}"\n  defect_status: "{receipt["status"]}"\n  defect_sync_verified: true\n  defect_screenshots: 3\n  defect_comparison_frames: 2\n  defect_attachments: 8\n';reg_path.write_text(re.sub(pattern,lambda _:block,reg,count=1),encoding='utf-8')
text=f'ERYE199-071已同步{link}：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。'
for name in ['cases.md','execution-status-current.md','results-069-075-production-20261118.md']:
 path=D/name;s=path.read_text(encoding='utf-8')
 if name=='cases.md':
  s=re.sub(r'(?m)^\| ERYE199-071 \|.*$',lambda m:m[0].rstrip().removesuffix('|').rstrip()+f'；[云效{receipt["id"]}]({receipt["url"]}) |'if receipt['id']not in m[0]else m[0],s)
 s=s.replace('已存原图和本地缺陷，未提交云效。',f'已存原图和本地缺陷，后续已同步{receipt["id"]}。')
 if name=='results-069-075-production-20261118.md':s=s.replace('本轮未写云效。',f'原测试阶段未写云效，后续已同步{receipt["id"]}。').replace('本轮未提交云效。',f'后续已同步{link}。')
 path.write_text(s,encoding='utf-8');note(path,text+f' [同步明细]({REPORT})。此前“未写云效”指原测试执行阶段。')
for rel,prefix in [('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/'),('AGENTS.md','docs/cases/requirements/ERYE-199/')]:
 path=R/rel;s=path.read_text(encoding='utf-8').replace('已存原图和本地缺陷，未提交云效。',f'已存原图和本地缺陷，后续已同步{receipt["id"]}。');path.write_text(s,encoding='utf-8');note(path,text+f' [同步明细]({prefix+REPORT})。本批已有完成检查点，后续只读回查，不能再次新建。')
local=R/receipt['local_report'];s=local.read_text(encoding='utf-8').replace('本地确认失败，尚未提交云效。',f'本地确认失败，已同步云效{link}。');local.write_text(s,encoding='utf-8');note(local,text)
meta_path=D/'meta.yaml';s=meta_path.read_text(encoding='utf-8');value=f'2026-11-18 ERYE199-071->{receipt["id"]};3 original screenshots+2 comparison frames embedded;8 attachments verified;Failed unchanged;no rerun';s=re.sub(r'(?m)^latest_defect_sync:.*$',lambda _:'latest_defect_sync: '+json.dumps(value,ensure_ascii=False),s);meta_path.write_text(s,encoding='utf-8')
(D/REPORT).write_text('# ERYE199-071失败同步云效（2026-11-18）\n\n'+text+'\n\n包含精简3项前置、完整提示词及上传/参数/两处预览/重入/刷新/下载对照的复现步骤。5张图片逐一核对原图SHA256、云效附件ID/文件名/字节数及正文稳定引用；原片、实际成片、精简JSON也已上传，未上传原始run、凭据或带签名URL。\n\n[脱敏回执]('+SYNC+') · [完整本地缺陷](../../../defects/ERYE199-071-translation-only-preview-bilingual-production-20261118.md) · [云效正文回读](evidence-069-075-production-20261118/cloud-sync-071/verified-description.md) · [当前进度](execution-status-current.md)。\n\n按既定不去重方式新建1条；本批自身key检查点用于防重复创建。其余141条状态及既有缺陷关联保持，原测试报告中“未云效写入”为测试阶段历史。统一入口不写执行或缺陷同步流水。\n',encoding='utf-8')
print(json.dumps({'verified':True,'defect':receipt['id'],'nativeScreenshots':3,'comparisonFrames':2,'attachments':8,'unchangedOtherCases':141,'counts':master['counts']},ensure_ascii=True))
