"""Archive only verified receipts of this authorized original-prompt defect sync."""
import collections, hashlib, json, pathlib, re

ROOT=pathlib.Path(__file__).resolve().parents[2]
INPUT=ROOT/'reports/yunxiao/icp-ecommerce-original-production-20261117-input'
EXEC=ROOT/'reports/icp-ecommerce-original-20261116-1818'
DOC=ROOT/'docs/design-cases/icp-workflows'
CLOUD=DOC/'evidence/cloud-sync-production-20261117'
REPORT='defect-sync-production-20261117.md'
MARKER='ICP-EC-YUNXIAO-SYNC-20261117'
COVERAGE={'02-timeout':[1],'02-model':[5],'03-crop':[1,2],'03-cta':[1],'03-reference':[4,5],'04-localization':[1,3,5],'05-provider':[1]}
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

def write(p,value):
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf8')

def note(p,body):
 # Preserve unrelated text and its existing newline style byte for byte.
 text=p.read_bytes().decode('utf8');newline='\r\n' if '\r\n' in text else '\n'
 block=('<!-- '+MARKER+' -->\n'+body+'\n<!-- /'+MARKER+' -->\n').replace('\n',newline)
 pattern=r'<!-- '+MARKER+r' -->[\s\S]*?<!-- /'+MARKER+r' -->(?:\r?\n)?'
 if re.search(pattern,text):text=re.sub(pattern,lambda _:block,text,count=1)
 else:
  first=text.index('\n')+1;text=text[:first]+newline+block+newline+text[first:]
 p.write_bytes(text.encode('utf8'))

def main():
 batch=read(INPUT/'batch.json');state=read(EXEC/'execution.json')
 expected={'Failed':5};assert dict(collections.Counter(c['status'] for c in state['cases'].values()))==expected
 assert sum(len(c['steps']) for c in state['cases'].values())==19
 assert sum(len(c.get('unexecutedRounds',[])) for c in state['cases'].values())==6
 before=EXEC/'before-defect-sync-20261117.json'
 if not before.exists():write(before,state)
 receipts=[];screenshots=0;attachments=0
 for info in batch['plans']:
  name,key,case=info['name'],info['key'],info['case'];folder=INPUT/name;cloud=ROOT/'reports/yunxiao'/key
  result=read(cloud/'result.json');item=read(cloud/'verified-item.json');files=read(cloud/'verified-attachments.json');plan=read(folder/'plan.json')
  description=(cloud/'verified-description.md').read_text(encoding='utf-8-sig')
  assert result['verified'] and result['key']==key and result['workitemId']==item['id']
  assert item['subject']==plan['subject']==info['title'] and item['description']==description
  assert item['space']['id']=='1e401ac99539c3999e00e40006' and item['workitemType']['id']=='37da3a07df4d08aef2e3b393'
  assert item['status']['name']=='🤔AI提缺陷' and item['assignedTo']['name']=='牛诗晴'
  assert [v['name'] for v in item['labels']]==['生产环境']
  assert re.findall(r'^\*\*(.+?)\*\*$',description,re.M)==['现象','前置步骤','提示词','复现步骤','实际结果','预期结果','影响','补充','失败截图']
  assert '**排查信息**' not in description and '__SCREENSHOTS__' not in description and key in description
  assert len(files)==len(plan['images'])+len(plan['attachments'])==len(result['attachments'])
  assert result['screenshots']==len(plan['images'])
  images=[]
  for evidence in plan['images']+plan['attachments']:
   original=folder/evidence['path'];assert sha(original)==evidence['sha256']
   attached=next(f for f in files if f['fileName']==original.name)
   receipt=next(f for f in result['attachments'] if f['id']==attached['id'])
   assert attached['size']==original.stat().st_size==receipt['size'] and receipt['sha256']==sha(original)
   if evidence in plan['images']:
    raw=EXEC/case/original.name;assert sha(raw)==sha(original)
    assert '!['+original.name+']' in description and 'fileIdentifier='+attached['id'] in description
    images.append(dict(name=original.name,attachmentId=attached['id'],bytes=attached['size'],sha256=evidence['sha256'],embedded=True,caption=evidence['caption']))
  fields={f['fieldId']:f['values'][0]['displayValue'] for f in item['customFieldValues']}
  assert (fields['priority'],fields['seriousLevel'])==(('中','3-一般') if name=='03-cta' else ('高','2-严重'))
  local_name=key.lower()+'.md'
  r=dict(id=item['serialNumber'],workitemId=item['id'],key=key,case=case,coveredRounds=COVERAGE[name],title=item['subject'],url=result['url'],status=item['status']['name'],assignedTo=item['assignedTo']['name'],sprint=item['sprint']['name'],labels=['生产环境'],priority=fields['priority'],seriousLevel=fields['seriousLevel'],verified=True,syncedAt=result['verifiedAt'],screenshots=len(images),attachments=len(files),images=images,attachmentReceipts=result['attachments'],descriptionSha256=hashlib.sha256(description.encode()).hexdigest(),localReport='docs/defects/'+local_name)
  receipts.append(r);screenshots+=len(images);attachments+=len(files)
  write(CLOUD/name/'receipt.json',r)
  (CLOUD/name/'verified-description.md').write_text(description,encoding='utf8')
  (ROOT/r['localReport']).write_text('# '+r['title']+'\n\n云效：['+r['id']+']('+r['url']+')；'+r['status']+'，'+r['assignedTo']+'，生产环境。'+str(len(images))+'张失败原图已上传并嵌入，'+str(len(files))+'份附件及正文回读通过。本次只同步2026-11-16既有实测，未重跑产品。\n\n'+description,encoding='utf8')
 assert len(receipts)==7 and len({r['id'] for r in receipts})==7 and screenshots==15 and attachments==45
 summary=dict(date='2026-11-17',testDate='2026-11-16',method='official Yunxiao OpenAPI via tools/yunxiao',created=7,deduplication=False,mergeWithinCurrentBatch=True,ownCheckpointRecovery=True,screenshotsUploaded=screenshots,attachmentsVerified=attachments,verified=True,rerunPerformed=False,report=REPORT,cases=receipts,notSubmittedAsDefects=batch['notSubmittedAsDefects'],executionCountsUnchanged=dict(cases=expected,submitted=19,notRunForPrerequisites=6,businessCounts=dict(collections.Counter(s['businessStatus'] for c in state['cases'].values() for s in c['steps']))))
 write(DOC/'defect-sync-production-20261117.json',summary);write(CLOUD/'summary.json',summary)
 for case,e in state['cases'].items():
  linked=[{k:r[k] for k in ['id','url','title','key','coveredRounds','verified','status','screenshots','attachments','localReport']} for r in receipts if r['case']==case]
  if linked:e['cloudDefects']=linked
  if case=='ICP-EC-01':e['defectTriage']='源素材缺普通自行车收纳对比与参考，后续依赖A首稿，暂不能明确归为产品缺陷，本次未提交；保留原Failed及未覆盖说明'
 state['defectSync']={k:v for k,v in summary.items() if k!='cases'}
 write(EXEC/'execution.json',state)
 lines=['# ICP 电商原文用例缺陷同步（2026-11-17）','', '仅同步2026-11-16原文批次的既有实测，未重新执行产品。按同一可观察问题合并，共新建7条；不查询历史重复、不修改旧缺陷。15张真实失败PNG已上传、嵌入正文并回读，45份附件核验通过。','', '状态均为🤔AI提缺陷，负责人牛诗晴，生产环境，迭代重构10-29；缺CTA为中/3-一般，其余高/2-严重。','', '| 用例/轮次 | 云效 | 问题 | 截图/附件 |','|---|---|---|---|']
 for r in receipts:lines.append('| '+r['case']+' / '+str(r['coveredRounds'])+' | ['+r['id']+']('+r['url']+') | '+r['title']+' | '+str(r['screenshots'])+' / '+str(r['attachments'])+' |')
 lines += ['', '未提为缺陷：','']+['- '+s for s in batch['notSubmittedAsDefects']]
 lines += ['', '测试进度保持：5个整例Failed；19轮已执行，2 Passed / 12 Failed / 1 Blocked / 4 Not Applicable；6轮缺首稿前置未提交。本次7条缺陷覆盖其中10条Failed轮次的明确问题；Case01另外2条Failed保留业务未达标和素材/前置限制，不能视为已提产品缺陷。','', '[逐轮进度和原图](execution-status-current.md) · [脱敏回执](defect-sync-production-20261117.json)。完整缺陷正文及截图引用：','']
 for r in receipts:lines.append('- ['+r['id']+'](../../../defects/'+pathlib.Path(r['localReport']).name+')')
 lines += ['', '输入资料、原文指令、回归前置及补槽回答已随各缺陷附上。大型原始素材可从关联历史会话附件按清单哈希取回；回归须新建测试项目，不能直接在历史工程点击重试。Case04的35秒输入原片、SKU10的2秒正面视频已另附对应缺陷。','', '保留各同步key的检查点；本批已完成，后续只读核对，不重新创建。未提交或推送Git。','']
 (DOC/REPORT).write_text('\n'.join(lines),encoding='utf8')
 brief='2026-11-17：ICP电商原文既有实测已同步7条云效缺陷FWXC-625～631；15张失败原图已上传、嵌入，45附件及正文/字段回读通过，均🤔AI提缺陷、牛诗晴、生产环境。测试结果未变：5整例Failed、19轮已执行、6轮缺前置；Case01素材/首稿缺口及未触发假设不当产品缺陷。本次未重跑。'
 for rel,prefix in [('docs/testing-progress.md','design-cases/icp-workflows/'),('docs/verification.md','design-cases/icp-workflows/'),('docs/codex-context.md','design-cases/icp-workflows/'),]:
  note(ROOT/rel,brief+' [同步清单]('+prefix+REPORT+')。检查点均已完成，后续只读回查，不重建。')
 for filename in ['cases.md']:
  note(DOC/filename,brief+' [同步清单]('+REPORT+')。')
 # Correct only this task's earlier context statement; other task history is untouched.
 context=ROOT/'docs/codex-context.md';text=context.read_bytes().decode('utf8')
 pattern=r'<!-- ICP-EC-ORIGINAL-PROMPT-RERUN-20261116 -->[\s\S]*?<!-- /ICP-EC-ORIGINAL-PROMPT-RERUN-20261116 -->'
 def fix(m):return m.group(0).replace('未computer-use、未云效写入、未Git提交/推送、未改requirements依赖。','未computer-use、未Git提交/推送、未改requirements依赖；原执行阶段未云效写入，2026-11-17已按后续授权同步FWXC-625～631。')
 text,count=re.subn(pattern,fix,text);assert count==1;context.write_bytes(text.encode('utf8'))
 # Compare the full original business fields, excluding the newly added cloud metadata.
 original=read(before)
 for case,e in state['cases'].items():
  assert {k:v for k,v in e.items() if k not in ['cloudDefects','defectTriage']}=={k:v for k,v in original['cases'][case].items() if k not in ['cloudDefects','defectTriage']}
 print(json.dumps(dict(verified=True,defects=[r['id'] for r in receipts],screenshots=screenshots,attachments=attachments,businessResultsUnchanged=True),ensure_ascii=False))

if __name__=='__main__':main()
