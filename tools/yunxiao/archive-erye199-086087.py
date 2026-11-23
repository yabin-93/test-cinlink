"""Archive verified cloud receipts while preserving every unrelated case."""
from pathlib import Path
from collections import Counter
import copy,json,re,hashlib

R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
INPUT=R/'reports/yunxiao/erye199-086087-production-20261119-input'
BACKUP=R/'reports/yunxiao/erye199-086087-production-20261119-local-archive'
EV=D/'evidence-086-090-production-20261119'
REPORT='defects-086-087-production-20261119.md';SYNC='defect-sync-086-087-production-20261119.json'
MARKER='ERYE199-086087-YUNXIAO-20261119'
GROUPS=[('cross-video','ERYE199-086-CROSS-VIDEO-ORIGINAL-AUDIO-COUPLING-PROD-20261119','ERYE199-086'),('audio-split','ERYE199-087-INDEPENDENT-AUDIO-SPLIT-CROSSTRACK-PROD-20261119','ERYE199-087')]
IDS={x[2]for x in GROUPS}
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,o):
    p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def backup(p):
    dest=BACKUP/p.relative_to(R)
    if not dest.exists():dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(p.read_bytes())
def note(p,message):
    backup(p);s=p.read_text(encoding='utf-8-sig')
    s=re.sub(rf'<!-- {MARKER} -->.*?<!-- /{MARKER} -->\s*','',s,flags=re.S)
    p.write_text(f'<!-- {MARKER} -->\n{message}\n<!-- /{MARKER} -->\n\n'+s,encoding='utf-8')
def field(item,name):return next(x['values'][0]['displayValue']for x in item['customFieldValues']if x['fieldId']==name)
receipts=[]
entry_hash=sha(R/'docs/cases/README.md')
for group,key,cid in GROUPS:
    raw=R/'reports/yunxiao'/key;folder=INPUT/group
    plan=read(folder/'plan.json');result=read(raw/'result.json');item=read(raw/'verified-item.json');files=read(raw/'verified-attachments.json');desc=(raw/'verified-description.md').read_text(encoding='utf-8-sig')
    assert result['verified']and result['key']==key and result['workitemId']==item['id']and result['serialNumber']==item['serialNumber']
    assert item['description']==desc and item['subject']==plan['subject']and item['space']['id']=='1e401ac99539c3999e00e40006'
    assert item['status']['name']=='🤔AI提缺陷'and item['assignedTo']['name']=='牛诗晴'
    assert [x['name']for x in item['labels']]==['生产环境']
    assert (field(item,'priority'),field(item,'seriousLevel'))==('高','2-严重')
    assert re.findall(r'^\*\*(.+?)\*\*$',desc,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']and '__SCREENSHOTS__'not in desc
    assert len(files)==len(result['attachments'])==len(plan['images'])+len(plan['attachments'])
    images=[]
    for f in plan['images']+plan['attachments']:
        p=folder/f['path'];assert sha(p)==f['sha256'];stored=next(x for x in files if x['fileName']==p.name);rr=next(x for x in result['attachments']if x['id']==stored['id'])
        assert stored['size']==rr['size']==p.stat().st_size and rr['sha256']==sha(p)
        if f in plan['images']:
            assert '!['+p.name+']'in desc and 'fileIdentifier='+stored['id']in desc
            images.append(dict(name=p.name,id=stored['id'],size=p.stat().st_size,sha256=sha(p),caption=f['caption'],embedded=True))
    local=f'{cid}-{group}-production-20261119.md'
    rec=dict(id=item['serialNumber'],workitem_id=item['id'],url=result['url'],title=item['subject'],key=key,status=item['status']['name'],assigned_to=item['assignedTo']['name'],sprint=item['sprint']['name'],labels=[x['name']for x in item['labels']],priority=field(item,'priority'),serious_level=field(item,'seriousLevel'),verified=True,screenshots=len(images),attachments=len(files),synced_at=result['verifiedAt'],local_report='docs/defects/'+local,attachment_receipts=result['attachments'],images=images,description_sha256=hashlib.sha256(desc.encode()).hexdigest(),case_ids=[cid],variant_keys=[v['key']for v in read(folder/'evidence-summary.json')['variants']])
    receipts.append(rec);cloud=EV/'cloud-sync'/group;write(cloud/'receipt.json',rec);(cloud/'verified-description.md').write_text(desc,encoding='utf-8')
    (R/rec['local_report']).write_text('# '+rec['title']+'\n\n'+f'已同步[{rec["id"]}]({rec["url"]})；截图上传、正文嵌入及附件回读通过，用例保持Failed。\n\n'+desc,encoding='utf-8')

case_map={cid:rec for (_,_,cid),rec in zip(GROUPS,receipts)}
refs=lambda r:[{k:r[k]for k in ['id','workitem_id','url','verified']}]
links=lambda rs:'、'.join(f'[{r["id"]}]({r["url"]})'for r in rs)
image_count=sum(r['screenshots']for r in receipts);attachment_count=sum(r['attachments']for r in receipts)
assert (image_count,attachment_count)==(13,19)
latest=dict(date='2026-11-19',created=2,case_ids=sorted(IDS),defects=[r['id']for r in receipts],screenshots=image_count,attachments=attachment_count,verified=True,report=REPORT,rerun_performed=False,merged_within_batch=True)
write(D/SYNC,dict(date='2026-11-19',method='official Yunxiao OpenAPI via tools/yunxiao',created=2,merged_within_batch=True,historical_defects_modified=False,verified=True,rerun_performed=False,screenshots_uploaded=image_count,attachments_verified=attachment_count,defects=receipts,cases={cid:refs(rec)for cid,rec in case_map.items()}))
def variant_sync(v):
    if v.get('status')=='Failed':
        rec=case_map['ERYE199-'+v['key'][:3]]
        assert v['key']in rec['variant_keys']
        v.update(defect_refs=refs(rec),cloud_sync='Submitted and verified')

paths=[D/'execution-status-20261113.json',D/'execution-status-086-090-production-20261119.json',D/'execution-status-multitrack-20261118.json']
for p in paths:
    obj=read(p);backup(p);before=copy.deepcopy(obj)
    for c in obj['cases']:
        if c['id']not in IDS:continue
        rec=case_map[c['id']];assert c['status']=='Failed'
        if c.get('defect',{}).get('verified'):assert c['defect']['workitem_id']==rec['workitem_id']
        c.update(defect=rec,defects=[rec],cloud_sync='Submitted and verified',current_failure_cloud_status='Submitted and verified',latest_defect_sync_report=REPORT)
        for v in c.get('variants',[]):variant_sync(v)
    obj.update(latest_defect_sync=latest,subsequent_cloud_sync=latest)
    if not any(h.get('report')==REPORT for h in obj.get('defect_sync_history',[])):obj.setdefault('defect_sync_history',[]).append(latest)
    assert Counter(c['status']for c in before['cases'])==Counter(c['status']for c in obj['cases'])
    for c in obj['cases']:
        if c['id']not in IDS:assert c==next(x for x in before['cases']if x['id']==c['id'])
    write(p,obj)

p=D/'defect-sync-20261113.json';a=read(p);backup(p)
if not any(h.get('report')==REPORT for h in a.get('history',[])):
    a['created']+=2;a['screenshots_uploaded']+=image_count;a['attachments_verified']+=attachment_count;a.setdefault('history',[]).append(latest)
for cid,rec in case_map.items():a['cases'][cid]={**rec,'defects':[rec]}
a.setdefault('case_defects',{}).update({cid:refs(rec)for cid,rec in case_map.items()})
if not any(g.get('report')==REPORT for g in a.get('shared_defect_groups',[])):a.setdefault('shared_defect_groups',[]).append(dict(case_ids=sorted(IDS),defects=receipts,created=2,report=REPORT,scope='086六变体合并一条；087两变体合并一条'))
a.update(updated='2026-11-19',latest_batch=latest,count_scope='按唯一云效工作项累计；086/087本批八个失败变体合并新建2项，13张原图/19附件，历史缺陷不修改。');write(p,a)
runpath=R/'reports/erye199-086-090-production-20261119/execution.json';run=read(runpath);backup(runpath)
for key,v in run['cases'].items():
    if v.get('status')=='Failed':
        variant_sync(v);p=EV/key/'verification.json';proof=read(p);backup(p);variant_sync(proof);write(p,proof)
run['latest_defect_sync']=latest;write(runpath,run)

p=R/'docs/cases/registry.yaml';backup(p);s=p.read_text(encoding='utf-8')
for cid,rec in case_map.items():
    pat=rf'(?m)^{cid}:\n[\s\S]*?(?=^\S|\Z)';block=re.search(pat,s).group(0)
    block=re.sub(r'(?m)^  (defect_id|defect_ids|defect_url|defect_urls|defect_status|defect_sync_verified|defect_sync_report|defect_screenshots|defect_attachments):.*\n','',block)
    values=dict(defect_id=rec['id'],defect_ids=[rec['id']],defect_url=rec['url'],defect_urls=[rec['url']],defect_status=rec['status'],defect_sync_verified=True,defect_sync_report='docs/cases/requirements/ERYE-199/'+REPORT,defect_screenshots=rec['screenshots'],defect_attachments=rec['attachments'])
    block=block.rstrip()+'\n'+''.join('  '+k+': '+json.dumps(v,ensure_ascii=False)+'\n'for k,v in values.items())
    s=re.sub(pat,lambda _:block,s,count=1)
p.write_text(s,encoding='utf-8')
master=read(paths[0]);assert master['counts']=={'Passed':46,'Failed':15,'Blocked':2,'Not Applicable':21,'Not Run':58}
message=f'2026-11-19：ERYE199-086六个跨视频轨失败变体合并为{links(receipts[:1])}，087两个独立音频分割失败变体合并为{links(receipts[1:])}。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。'
for name in ['cases.md','execution-status-current.md','coverage-overview.md','results-086-090-production-20261119.md']:
    p=D/name;backup(p);s=p.read_text(encoding='utf-8')
    s=s.replace('失败及关键步骤截图已保存，本轮未写云效。',f'失败及关键步骤截图已保存，后续已同步{receipts[0]["id"]}/{receipts[1]["id"]}。')
    s=s.replace('本轮没有云效写入。',f'执行阶段未写云效，后续086/087已同步{receipts[0]["id"]}/{receipts[1]["id"]}。')
    if name=='cases.md':
        for cid,rec in case_map.items():
            s=re.sub(rf'(?m)^\| {cid} \|.*$',lambda m:m[0]if rec['id']in m[0]else m[0].rstrip().removesuffix('|').rstrip()+'；云效'+links([rec])+' |',s)
    if name.startswith('results-'):
        def add(m):
            cols=[x.strip()for x in m[0].strip().strip('|').split('|')];key=cols[0];rec=case_map['ERYE199-'+key[:3]]
            if cols[1]!='Failed'or rec['id']in m[0]:return m[0]
            cols[-1]+=' · 云效'+links([rec]);return '| '+' | '.join(cols)+' |'
        s=re.sub(r'(?m)^\| 08[67]-[^|]+\|.*$',add,s)
    p.write_text(s,encoding='utf-8');note(p,message+f' [同步明细]({REPORT})。')
for name,prefix in [('AGENTS.md','docs/cases/requirements/ERYE-199/'),('docs/testing-progress.md','cases/requirements/ERYE-199/'),('docs/verification.md','cases/requirements/ERYE-199/'),('docs/codex-context.md','cases/requirements/ERYE-199/')]:
    p=R/name;backup(p);s=p.read_text(encoding='utf-8').replace('失败及关键步骤截图已保存，本轮未写云效。',f'失败及关键步骤截图已保存，后续086/087已同步{receipts[0]["id"]}/{receipts[1]["id"]}。');p.write_text(s,encoding='utf-8');note(p,message+f' [同步明细]({prefix+REPORT})。已有完成检查点，后续核对不重复创建。')
p=D/'meta.yaml';backup(p);s=p.read_text(encoding='utf-8');s=re.sub(r'(?m)^latest_defect_sync:.*$',lambda _:'latest_defect_sync: '+json.dumps(f'2026-11-19 086->{receipts[0]["id"]};087->{receipts[1]["id"]};13 images/19 attachments verified;results unchanged',ensure_ascii=False),s);p.write_text(s,encoding='utf-8')
lines=['# ERYE199-086、087合并缺陷同步（2026-11-19）','',message,'','| 云效缺陷 | 合并范围 | 证据 |','|---|---|---|',f'| {links(receipts[:1])} | 086：T1/T2/E/C/H/G跨轨后原声误联动；T1/T2/C/H同时观察到原声行重排 | 8张原图，F20/F60及精简证据，共11附件 |',f'| {links(receipts[1:])} | 087：T1/T2只选独立D分割却连带视频、原声和原生BGM | 5张原图，F20/D及精简证据，共8附件 |','','按本批相同业务现象合并，不推断代码根因；历史FWXC-699保留为相关问题参考，不修改旧项。所有八个失败变体有对应失败原图，另附基线、跨轨及分割前选中D的截图。截图哈希、附件ID/名称/字节数及正文稳定引用均已回读核验。','','正文含精简前置、可复制的完整提示词、逐步复现、实际和预期；不将观察误差、正确的D分割结果或071已知预览显示差异单独提缺陷。','',f'[脱敏回执]({SYNC}) · [本轮执行结果](results-086-090-production-20261119.md)','']
for (group,_,_),rec in zip(GROUPS,receipts):lines.append(f'- {links([rec])}：[完整本地缺陷](../../../defects/{Path(rec["local_report"]).name}) · [云效正文回读](evidence-086-090-production-20261119/cloud-sync/{group}/verified-description.md)')
(D/REPORT).write_text('\n'.join(lines)+'\n',encoding='utf-8')
assert sha(R/'docs/cases/README.md')==entry_hash
result=dict(verified=True,created=2,defects=[r['id']for r in receipts],images=image_count,attachments=attachment_count,preservedOtherCases=140,counts=master['counts'],unified_entry_unchanged=True)
write(BACKUP/'archive-verification.json',result);print(json.dumps(result))
