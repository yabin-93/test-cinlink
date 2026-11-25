"""Publish local per-defect regression progress without writing the unified case entry."""
import json,pathlib,shutil,collections,hashlib,re
R=pathlib.Path(__file__).resolve().parents[2]
B=R/'reports/creator-fixed-regression-prod-20261117'
D=R/'docs/defect-regressions'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
inventory=read(B/'inventory.json');D.mkdir(parents=True,exist_ok=True)
cases=[]
for item in inventory['defects']:
 n=item['serialNumber'];folder=B/n;data=read(folder/'result.json') if (folder/'result.json').exists() else dict(id=n,result='Not Run',actual='尚未执行页面回归')
 receipt=read(folder/'status-update/result.json') if (folder/'status-update/result.json').exists() else None
 observation=read(folder/'cloud-status-observation.json') if (folder/'cloud-status-observation.json').exists() else None
 closure_paths=sorted(folder.glob('user-closure-*/result.json'))
 closure=read(closure_paths[-1]) if closure_paths else None
 record=dict(id=n,title=item['subject'],url=item['url'],result=data['result'],actual=data['actual'],cloudStatus=receipt['after']['name'] if receipt and receipt['verified'] else '清单快照：已修复；本批尚未完成状态回写',cloudUpdateVerified=bool(receipt and receipt['verified']),details=data)
 if receipt:record['statusReceipt']=receipt
 if observation and observation.get('officialReadVerified') and not receipt:
  record['cloudStatus']=observation['status']['name']+'（只读核对；本批未修改）'
  record['cloudStatusObservation']=observation
 if closure:
  assert closure['id']==n and closure['verified'] and closure['userConfirmedClosure'] and closure['after']['name']=='已关闭'
  record['cloudStatus']='已关闭（'+closure['decisionDate']+'用户确认）'
  record['currentDisposition']='Closed'
  record['userClosureReceipt']=closure
 record['evidence']=[]
 for name in data.get('screenshots',[]):
  source=folder/name;assert source.exists();dest=D/'evidence-creator-fixed-production-20261117'/n/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest);digest=hashlib.sha256(source.read_bytes()).hexdigest();assert digest==hashlib.sha256(dest.read_bytes()).hexdigest();record['evidence'].append(dict(path=str(dest.relative_to(D)).replace('\\','/'),sha256=digest))
 cases.append(record)
counts=dict(collections.Counter(x['result'] for x in cases));summary=dict(date='2026-11-17',environment='production',browser='ego-browser',creator='陈亚宾',initialCloudStatus='已修复',scopeFrozen=True,total=34,projectPolicy=inventory['projectPolicy'],counts=counts,statusUpdatesVerified=sum(x['cloudUpdateVerified'] for x in cases),cases=cases)
closed=[x['id'] for x in cases if x.get('currentDisposition')=='Closed']
remaining_blocked=[x['id'] for x in cases if x['result']=='Blocked' and x.get('currentDisposition')!='Closed']
summary.update(userClosuresVerified=len(closed),userClosedCases=closed,currentBlockedCases=remaining_blocked,currentBlockedCount=len(remaining_blocked))
assert len(cases)==34
(D/'creator-chenyabin-fixed-production-20261117.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
lines=['# 陈亚宾创建的已修复缺陷：生产回归（2026-11-17）','', '本批筛选cinlink-WEB中创建者陈亚宾、初始状态“已修复”的34条缺陷；逐条以Ego浏览器真实页面结果验收。清单冻结后不扩大范围；回写前再次核对创建者与当前状态。', '',inventory['projectPolicy'],'', '状态：'+ ' / '.join(k+' '+str(v) for k,v in counts.items())+'；云效状态回读通过 '+str(summary['statusUpdatesVerified'])+' 条。','', '| 缺陷 | 标题 | 本轮结果 | 云效状态 |','|---|---|---|---|']
closure_note=''
if closed:
 closure_note='2026-11-18用户确认关闭'+ '、'.join(closed)+'：当前方案待审核时无正常重复发送入口，原重复提交缺陷关闭，云效均已回读为“已关闭”。历史实测统计保留，不改记通过；当前仍待处理的阻塞为'+ '、'.join(remaining_blocked)+'，共'+str(len(remaining_blocked))+'条。'
 lines.insert(8,closure_note+'\n')
for c in cases:lines.append('| ['+c['id']+']('+c['url']+') | '+c['title'].replace('|','／')+' | '+c['result']+('（历史；用户已确认关闭）' if c.get('currentDisposition')=='Closed' else '')+' | '+c['cloudStatus']+' |')
for c in cases:
 if c['result']=='Not Run':continue
 lines+=['','## '+c['id'],'',c['actual'],'','操作步骤：','']+['1. '+s for s in c['details'].get('steps',[])]+['','检查结果：'+json.dumps(c['details'].get('checks',{}),ensure_ascii=False),'']
 if c.get('currentDisposition')=='Closed':
  position=lines.index('## '+c['id'])+2
  lines[position:position]=['**2026-11-18关闭结论：** '+c['userClosureReceipt']['reason']+' 云效已关闭且回读通过；不再作为当前阻塞。下方为2026-11-17历史实测记录，未重新执行。','']
 if c['details'].get('limitations'):
  lines+=['核验边界：','']+['- '+s for s in c['details']['limitations']]+['']
 for image in c['evidence']:
  lines.append(('![' if c['result']=='Failed' else '[')+c['id']+' '+pathlib.Path(image['path']).name+']('+image['path']+')')
(D/'creator-chenyabin-fixed-production-20261117.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
note='<!-- CREATOR-FIXED-PROD-REGRESSION-20261117 -->\n本轮生产回归：创建者陈亚宾、初始已修复，共34条；项目按最新授权首条新建、后续优先复用，必要时隔离会话/工程。'+ ' / '.join(k+' '+str(v) for k,v in counts.items())+'；云效状态已回读 '+str(summary['statusUpdatesVerified'])+' 条。逐例步骤、结果及截图见[回归记录](defect-regressions/creator-chenyabin-fixed-production-20261117.md)。不向用例统一入口写执行结果。\n<!-- /CREATOR-FIXED-PROD-REGRESSION-20261117 -->\n'
if closure_note:note=note.replace('本轮生产回归：','2026-11-17历史实测：',1).replace('\n<!-- /CREATOR-', '\n'+closure_note+'\n<!-- /CREATOR-',1)
for filename in ['docs/testing-progress.md','docs/codex-context.md']:
 p=R/filename;t=p.read_bytes().decode('utf8');pattern=r'<!-- CREATOR-FIXED-PROD-REGRESSION-20261117 -->[\s\S]*?<!-- /CREATOR-FIXED-PROD-REGRESSION-20261117 -->(?:\r?\n)?'
 if re.search(pattern,t):t=re.sub(pattern,lambda _:note,t,count=1)
 else:t=t.rstrip()+'\n\n'+note
 p.write_bytes(t.encode('utf8'))
print(json.dumps({'historicalCounts':counts,'cloudUpdatesVerified':summary['statusUpdatesVerified'],'userClosuresVerified':len(closed),'currentBlockedCases':remaining_blocked,'total':34},ensure_ascii=False))
