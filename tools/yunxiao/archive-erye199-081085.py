"""Archive two verified merged defects without changing test outcomes."""
from pathlib import Path
from collections import Counter
import copy,json,re,hashlib
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
INPUT=R/'reports/yunxiao/erye199-081083084085-production-20261119-input'
BACKUP=R/'reports/yunxiao/erye199-081083084085-production-20261119-local-archive'
REPORT='defects-081-083-085-production-20261119.md';SYNC='defect-sync-081-083-085-production-20261119.json'
MARKER='ERYE199-081083084085-YUNXIAO-20261119';CLOUD=D/'evidence-081-085-production-20261118/cloud-sync'
GROUPS=[('audio-coupling','ERYE199-081083084085-ORIGINAL-AUDIO-COUPLING-PROD-20261119','ERYE199-081-083-085-original-audio-coupling-production-20261119.md'),('extra-subtitle','ERYE199-083-BILINGUAL-EXTRA-SUBTITLE-TRACK-PROD-20261119','ERYE199-083-extra-subtitle-track-production-20261119.md')]
IDS={'ERYE199-081','ERYE199-083','ERYE199-084','ERYE199-085'}
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,d):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def backup(p):
 target=BACKUP/p.relative_to(R)
 if not target.exists():target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(p.read_bytes())
def note(p,body):
 s=p.read_text(encoding='utf-8-sig');s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S)
 p.write_text(f'<!-- {MARKER} -->\n{body}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
def field(item,name):return next(x['values'][0]['displayValue']for x in item['customFieldValues']if x['fieldId']==name)
receipts=[]
for name,key,local in GROUPS:
 raw=R/'reports/yunxiao'/key;source=INPUT/name;plan=read(source/'plan.json');result=read(raw/'result.json');item=read(raw/'verified-item.json');files=read(raw/'verified-attachments.json');desc=(raw/'verified-description.md').read_text(encoding='utf-8-sig')
 assert result['verified']and result['workitemId']==item['id']and result['serialNumber']==item['serialNumber']and result['key']==key
 assert item['description']==desc and item['subject']==plan['subject']and item['space']['id']=='1e401ac99539c3999e00e40006'
 assert item['status']['name']=='🤔AI提缺陷'and item['assignedTo']['name']=='牛诗晴'
 assert [v['name']for v in item['labels']]==['生产环境']
 assert (field(item,'priority'),field(item,'seriousLevel'))==(('高','2-严重')if name=='audio-coupling'else('中','3-一般'))
 assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']and '__SCREENSHOTS__'not in desc
 assert len(files)==len(result['attachments'])==len(plan['images'])+len(plan['attachments'])
 images=[]
 for f in plan['images']+plan['attachments']:
  p=source/f['path'];assert sha(p)==f['sha256'];stored=next(x for x in files if x['fileName']==p.name);receipt=next(x for x in result['attachments']if x['id']==stored['id'])
  assert stored['size']==p.stat().st_size==receipt['size']and receipt['sha256']==sha(p)
  if f in plan['images']:
   assert '!['+p.name+']'in desc and 'fileIdentifier='+stored['id']in desc
   images.append({'name':p.name,'id':stored['id'],'size':p.stat().st_size,'sha256':sha(p),'caption':f['caption'],'embedded':True})
 entry={'id':item['serialNumber'],'workitem_id':item['id'],'url':result['url'],'title':item['subject'],'key':key,'status':item['status']['name'],'assigned_to':item['assignedTo']['name'],'sprint':item['sprint']['name'],'labels':[x['name']for x in item['labels']],'priority':field(item,'priority'),'serious_level':field(item,'seriousLevel'),'verified':True,'screenshots':len(images),'attachments':len(files),'synced_at':result['verifiedAt'],'local_report':'docs/defects/'+local,'attachment_receipts':result['attachments'],'images':images,'description_sha256':hashlib.sha256(desc.encode()).hexdigest(),'shared':name=='audio-coupling','case_ids':sorted(IDS)if name=='audio-coupling'else['ERYE199-083']}
 receipts.append(entry);write(CLOUD/name/'receipt.json',entry);(CLOUD/name/'verified-description.md').write_text(desc,encoding='utf-8')
 localpath=R/entry['local_report'];localpath.parent.mkdir(parents=True,exist_ok=True);localpath.write_text('# '+entry['title']+'\n\n'+f'已同步[{entry["id"]}]({entry["url"]})，截图上传及正文嵌图回读通过；用例保持Failed。\n\n'+desc,encoding='utf-8')
audio,subtitle=receipts;links=lambda rows:'、'.join(f'[{x["id"]}]({x["url"]})'for x in rows)
refs=lambda rows:[{k:r[k]for k in ['id','workitem_id','url','verified']}for r in rows]
case_map={cid:([audio,subtitle]if cid=='ERYE199-083'else[audio])for cid in IDS}
latest={'date':'2026-11-19','created':2,'case_ids':sorted(IDS),'defects':[r['id']for r in receipts],'screenshots':31,'attachments':38,'verified':True,'report':REPORT,'rerun_performed':False,'merged_within_batch':True}
summary={'date':'2026-11-19','method':'official Yunxiao OpenAPI via tools/yunxiao','created':2,'merged_within_batch':True,'historical_defects_modified':False,'verified':True,'rerun_performed':False,'screenshots_uploaded':31,'attachments_verified':38,'defects':receipts,'cases':{cid:refs(rs)for cid,rs in case_map.items()}}
write(D/SYNC,summary)
def variant_sync(v):
 if v.get('status')!='Failed':return
 rows=[subtitle]if v['key']=='083-T2-split'else[audio]
 v.update(defect_refs=refs(rows),cloud_sync='Submitted and verified')
paths=[D/'execution-status-20261113.json',D/'execution-status-081-085-production-20261118.json',D/'execution-status-multitrack-20261118.json']
for path in paths:
 obj=read(path);backup(path);before=copy.deepcopy(obj)
 for c in obj['cases']:
  if c['id']not in IDS:continue
  assert c['status']=='Failed';rs=case_map[c['id']]
  if c.get('defect',{}).get('verified'):assert c['defect']['workitem_id']==audio['workitem_id'],'Different verified sync exists; inspect before overwrite'
  c.update(defect=rs[0],defects=rs,cloud_sync='Submitted and verified',current_failure_cloud_status='Submitted and verified',latest_defect_sync_report=REPORT)
  for v in c.get('variants',[]):variant_sync(v)
 obj.update(latest_defect_sync=latest,subsequent_cloud_sync=latest)
 if not any(h.get('report')==REPORT for h in obj.get('defect_sync_history',[])):obj.setdefault('defect_sync_history',[]).append(latest)
 assert Counter(c['status']for c in obj['cases'])==Counter(c['status']for c in before['cases'])
 for c in obj['cases']:
  if c['id']not in IDS:assert c==next(x for x in before['cases']if x['id']==c['id'])
 write(path,obj)
aggregate_path=D/'defect-sync-20261113.json';aggregate=read(aggregate_path);backup(aggregate_path)
if not any(h.get('report')==REPORT for h in aggregate.get('history',[])):
 aggregate['created']+=2;aggregate['screenshots_uploaded']+=31;aggregate['attachments_verified']+=38;aggregate.setdefault('history',[]).append(latest)
for cid,rs in case_map.items():aggregate['cases'][cid]={**rs[0],'defects':rs}
aggregate['case_defects']={**aggregate.get('case_defects',{}),**{cid:refs(rs)for cid,rs in case_map.items()}}
if not any(g.get('report')==REPORT for g in aggregate.get('shared_defect_groups',[])):aggregate.setdefault('shared_defect_groups',[]).append({'case_ids':sorted(IDS),'defect':audio,'created':1,'report':REPORT})
aggregate.update(updated='2026-11-19',latest_batch=latest,count_scope='按唯一云效工作项累计；本批四条失败合并两类，新建2项，共31张原图/38附件，083关联两个缺陷，其他三例共用原声联动缺陷。')
write(aggregate_path,aggregate)
run_path=R/'reports/erye199-081-085-production-20261118/execution.json';run=read(run_path);backup(run_path)
for key,e in run['cases'].items():
 if e.get('status')=='Failed':e.update(defect_refs=refs([subtitle]if key=='083-T2-split'else[audio]),cloud_sync='Submitted and verified')
run['latest_defect_sync']=latest;write(run_path,run)
for key,e in run['cases'].items():
 if e.get('status')!='Failed':continue
 p=D/'evidence-081-085-production-20261118'/key/'verification.json';v=read(p);backup(p);variant_sync(v);write(p,v)
registry=R/'docs/cases/registry.yaml';backup(registry);text=registry.read_text(encoding='utf-8')
for cid,rs in case_map.items():
 pattern=rf'(?m)^{cid}:\n[\s\S]*?(?=^\S|\Z)';block=re.search(pattern,text).group(0)
 block=re.sub(r'(?m)^  (defect_id|defect_ids|defect_url|defect_urls|defect_status|defect_sync_verified|defect_sync_report|defect_screenshots|defect_attachments):.*\n','',block)
 block=block.rstrip()+f'\n  defect_id: "{rs[0]["id"]}"\n  defect_ids: '+json.dumps([r['id']for r in rs])+f'\n  defect_url: "{rs[0]["url"]}"\n  defect_urls: '+json.dumps([r['url']for r in rs])+f'\n  defect_status: "{rs[0]["status"]}"\n  defect_sync_verified: true\n  defect_sync_report: "docs/cases/requirements/ERYE-199/{REPORT}"\n  defect_screenshots: '+str(sum(r['screenshots']for r in rs))+'\n  defect_attachments: '+str(sum(r['attachments']for r in rs))+'\n'
 text=re.sub(pattern,lambda _:block,text,count=1)
registry.write_text(text,encoding='utf-8')
master=read(paths[0]);assert master['counts']=={'Passed':43,'Failed':13,'Blocked':2,'Not Applicable':21,'Not Run':63}
message=f'2026-11-19：ERYE199-081、083、084、085按相同业务问题合并2条，已同步{links(receipts)}。原声误联动24个变体共用{audio["id"]}，083-T2额外英文字幕轨关联{subtitle["id"]}；31张原始截图已上传并嵌入，38附件及正文回读通过。四例保持Failed，082保持Passed；当前142条43P/13F/2B/21NA/63NR不变，其他138条及既有缺陷关联保持。本次未重跑、未修改旧云效缺陷。'
for name in ['cases.md','execution-status-current.md','coverage-overview.md','results-081-085-production-20261118.md']:
 p=D/name;backup(p);s=p.read_text(encoding='utf-8')
 s=s.replace('失败截图已保存，本批未提交云效。',f'失败截图已保存，后续已同步{audio["id"]}/{subtitle["id"]}。')
 if name=='cases.md':
  for cid,rs in case_map.items():
   s=re.sub(rf'(?m)^\| {cid} \|.*$',lambda m:m[0].rstrip().removesuffix('|').rstrip()+'；云效'+links(rs)+' |'if audio['id']not in m[0]else m[0],s)
 if name.startswith('results-'):
  def add_variant(m):
   parts=[c.strip()for c in m[0].strip().strip('|').split('|')];key=parts[0]
   if parts[1]!='Failed'or audio['id']in m[0]or subtitle['id']in m[0]:return m[0]
   rs=[subtitle]if key=='083-T2-split'else[audio];parts[-1]+=' · 云效'+links(rs);return'| '+' | '.join(parts)+' |'
  s=re.sub(r'(?m)^\| 08[1345]-[^|]+\|.*$',add_variant,s)
 p.write_text(s,encoding='utf-8');note(p,message+f' [同步明细]({REPORT})。')
for rel,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:
 p=R/rel;backup(p);s=p.read_text(encoding='utf-8').replace('失败截图已保存，本批未提交云效。',f'失败截图已保存，后续已同步{audio["id"]}/{subtitle["id"]}。');p.write_text(s,encoding='utf-8');note(p,message+f' [同步明细]({prefix+REPORT})。本批已有完成检查点，后续只核对，不重复创建。')
meta=D/'meta.yaml';backup(meta);s=meta.read_text(encoding='utf-8');s=re.sub(r'(?m)^latest_defect_sync:.*$',lambda _:'latest_defect_sync: '+json.dumps(f'2026-11-19 081/083/084/085->{audio["id"]};083-T2->{subtitle["id"]};31 images/38 attachments verified;results unchanged',ensure_ascii=False),s);meta.write_text(s,encoding='utf-8')
lines=['# ERYE199-081、083、084、085合并缺陷同步（2026-11-19）','',message,'','| 云效缺陷 | 合并范围 | 证据 |','|---|---|---|',f'| {links([audio])} | 081原生BGM移动、083视频分割、084主体平移、085左右裁边误带原声，共24个失败变体 | 29张原图，原片F20/F60、独立D/B和精简证据，共34附件 |',f'| {links([subtitle])} | 083-T2独立新会话首轮双语译配多出英文字幕轨；未继续分割 | 2张参数/失败原图、F20和精简证据，共4附件 |','','两条正文均包含精简前置、完整提示词、操作步骤、实际与预期；29张联动证据包括24个失败变体及5张基线。所有原图哈希、附件ID/名称/字节数和正文稳定图片引用已核验。按业务现象合并，不推断代码根因。','','仅合并本批同类失败，不修改历史缺陷。FWXC-694同会话多轮字幕串轨保留为参考；本批额外字幕为独立新会话首轮触发，FWXC-693译文显示差异不纳入联动缺陷。','',f'[脱敏回执]({SYNC}) · [本轮执行结果](results-081-085-production-20261118.md)','']
for (name,_,local),rec in zip(GROUPS,receipts):lines.append(f'- {links([rec])}：[完整本地缺陷](../../../defects/{local}) · [云效正文回读](evidence-081-085-production-20261118/cloud-sync/{name}/verified-description.md)')
lines+=['','同一云效缺陷由多用例共享，累计按2个工作项计数，不按用例关联数累加。统一入口仅保留用例和导航，本次不写执行流水。']
(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
write(BACKUP/'archive-verification.json',{'verified':True,'created':2,'defects':[r['id']for r in receipts],'images':31,'attachments':38,'preservedOtherCases':138,'counts':master['counts']})
print(json.dumps({'verified':True,'defects':[r['id']for r in receipts],'images':31,'attachments':38,'preservedOtherCases':138,'counts':master['counts']}))
