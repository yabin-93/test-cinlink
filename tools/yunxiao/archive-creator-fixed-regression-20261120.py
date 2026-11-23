"""Archive only current-batch execution evidence; never write the unified case entry."""
import json,pathlib,collections,hashlib,shutil,re,datetime
R=pathlib.Path(__file__).resolve().parents[2];B=R/'reports/creator-fixed-regression-prod-20261120';D=R/'docs/defect-regressions'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
inventory=read(B/'inventory.json');cases=[]
policy='按用户提供的生产会话0fda3e35-e0d6-4049-bd30-4fe96cb923df复用其所在项目209683e7-d372-407b-a7b7-36217fea84af；新建独立回归会话和工程，保留该现有配音工程与产物。'
for item in inventory['defects']:
 n=item['serialNumber'];folder=B/n;p=folder/'result.json';data=read(p) if p.exists() else dict(id=n,result='Not Run',actual='待执行本轮页面回归')
 pending=read(folder/'pending-account-switch.json') if not p.exists() and (folder/'pending-account-switch.json').exists() else None
 if pending:data.update(actual='U1两个标签页、真实工程/会话及未发送草稿前置已完成；主标签已退出并交还用户，等待在p1登录无本工程权限的U2。p2保持未刷新，最终账号隔离结果尚未判定。',steps=['复用本轮新建并执行完的30秒测试工程和真实会话历史，在p1/p2均打开其已保存内容','主标签填写068-U1-未发送草稿，不发送；旧标签停在U1视频及字幕','仅在主标签退出U1，未清Cookie或站点数据，退出后未操作p2','交还Ego Lite，等待用户在p1登录无本工程权限的U2后继续核验'],screenshots=['00-u1-second-tab-private-editor.png','01-u1-main-tab-unsent-draft.png'])
 receipt=read(folder/'status-update/result.json') if (folder/'status-update/result.json').exists() else None
 if receipt:assert receipt['verified'] and receipt['evidenceSha256']==hashlib.sha256(p.read_bytes()).hexdigest()
 correction=None;previous=None
 if (folder/'status-correction/result.json').exists():
  correction=read(folder/'status-correction/result.json');correctedPath=folder/'result-corrected.json';assert correction['verified'] and correction['evidenceSha256']==hashlib.sha256(correctedPath.read_bytes()).hexdigest() and correction['previousEvidenceSha256']==receipt['evidenceSha256'];previous=dict(result=data['result'],actual=data['actual'],statusReceipt=receipt,reason=read(correctedPath)['correctionReason']);data=read(correctedPath);receipt=correction
 live=read(folder/'live-status-conflict.json') if (folder/'live-status-conflict.json').exists() else None
 record=dict(id=n,title=item['subject'],url=item['url'],result=data['result'],actual=data['actual'],details=data,cloudStatus=receipt['after']['name'] if receipt else (live['status']['name']+'（回读已是此状态，本轮未写）' if live else '清单快照：已修复；尚未回写'),cloudUpdateVerified=bool(receipt),evidence=[])
 if live:record['liveStatusRead']=live
 if pending:record.update(pendingAccountSwitch=pending,displayResult='待继续（U2登录）')
 if previous:record['previousExecutionCorrected']=previous
 if receipt:record['statusReceipt']=receipt
 supplements=[read(p) for p in sorted(folder.glob('supplement-*.json'))]
 if supplements:record['supplements']=supplements
 for name in data.get('screenshots',[])+[n for s in supplements for n in s.get('screenshots',[])]:
  source=folder/name;assert source.is_file();dest=D/'evidence-creator-fixed-production-20261120'/n/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest);sha=hashlib.sha256(source.read_bytes()).hexdigest();assert sha==hashlib.sha256(dest.read_bytes()).hexdigest();record['evidence'].append(dict(path=dest.relative_to(D).as_posix(),sha256=sha))
 cases.append(record)
counts={k:sum(c['result']==k for c in cases) for k in ['Passed','Failed','Blocked','Not Run']};writes=sum(c['cloudUpdateVerified'] for c in cases)
summary=dict(date='2026-11-20',environment='production',browser='ego-browser 0.6.3.14',scope=inventory['scope'],total=len(cases),counts=counts,cloudStatusWritesVerified=writes,projectPolicy=policy,cases=cases)
D.mkdir(parents=True,exist_ok=True);(D/'creator-chenyabin-fixed-production-20261120.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
lines=['# 陈亚宾已修复缺陷：生产回归（2026-11-20）','','范围：cinlink-WEB，创建者陈亚宾，读取时状态已修复；完整分页读取544条，冻结本轮29条。403/399已按用户确认关闭、532原用例退役，不重新安排。','',policy,'','当前：'+' / '.join(k+' '+str(v) for k,v in counts.items())+'；云效状态写入及回读通过'+str(writes)+'条。','','连接说明：最初调用0.6.3.17连续bootstrap失败，发现主程序仍为0.6.3.14、0.6.3.17待安装，已改用匹配0.6.3.14命令恢复连接并确认生产已登录。本轮未执行升级。原始缺陷截图仅作依据；下方执行截图均来自本轮。','','| 缺陷 | 标题 | 本轮结果 | 云效状态 |','|---|---|---|---|']
for c in cases:lines.append('| ['+c['id']+']('+c['url']+') | '+c['title'].replace('|','／')+' | '+c.get('displayResult',c['result'])+' | '+c['cloudStatus']+' |')
for c in cases:
 if c['result']=='Not Run' and not c.get('pendingAccountSwitch'):continue
 lines+=['','## '+c['id'],'',c['actual'],'','操作步骤：','']+['1. '+x for x in c['details'].get('steps',[])]+['','核验边界：','']+['- '+x for x in c['details'].get('limitations',[])]+['']
 if c.get('previousExecutionCorrected'):lines+=['前置修正：'+c['previousExecutionCorrected']['reason']+'。原始记录及状态回执保留，当前统计按修正后结果。','']
 for s in c.get('supplements',[]):lines+=['补充核验：'+s['actual'],'']
 for image in c['evidence']:lines.append(('![' if c['result']=='Failed' else '[')+c['id']+' '+pathlib.Path(image['path']).name+']('+image['path']+')')
(D/'creator-chenyabin-fixed-production-20261120.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
note='<!-- CREATOR-FIXED-PROD-REGRESSION-20261120 -->\n2026-11-20生产回归：陈亚宾创建、初始已修复29条，'+' / '.join(k+' '+str(v) for k,v in counts.items())+'，云效状态已写入并回读'+str(writes)+'条。Ego Lite使用与主程序匹配的0.6.3.14已恢复生产连接；按用户提供会话复用所在项目，新建独立回归工程，保留用户现有配音内容。403/399已关闭，不再回归。 [本轮记录](defect-regressions/creator-chenyabin-fixed-production-20261120.md)。\n<!-- /CREATOR-FIXED-PROD-REGRESSION-20261120 -->\n'
for name in ['docs/testing-progress.md','docs/codex-context.md']:
 p=R/name;t=p.read_text(encoding='utf8');pattern=r'<!-- CREATOR-FIXED-PROD-REGRESSION-20261120 -->[\s\S]*?<!-- /CREATOR-FIXED-PROD-REGRESSION-20261120 -->(?:\r?\n)?';t=re.sub(pattern,lambda _:note,t,count=1) if re.search(pattern,t) else t.rstrip()+'\n\n'+note;p.write_text(t,encoding='utf8')
state=read(B/'resume-state.json');state.update(workspaceId='209683e7-d372-407b-a7b7-36217fea84af',results=counts,cloudStatusWrites=writes,updatedAt=datetime.datetime.now(datetime.timezone.utc).isoformat());ownership=state.get('browser',{}).get('ownership','agent');state['browser']=dict(read(B/'browser.json'),connection='connected',ownership=ownership)
pendingCases=[c for c in cases if c.get('pendingAccountSwitch')]
if pendingCases:state.update(currentCase=pendingCases[0]['id'],currentRun=None,currentStep=pendingCases[0]['actual'],waitingForUser=pendingCases[0]['pendingAccountSwitch']['userAction'])
elif counts['Not Run']==0:state.update(currentCase=None,currentRun=None,currentStep='本批29条已逐项处理：22通过、4失败、3阻塞；状态与云效最终回读一致，阻塞保留已修复。浏览器保留第二账号生产首页。',waitingForUser=None)
else:state.update(currentStep='按本轮已保存结果继续剩余回归；不得重放已受理请求。',waitingForUser=None)
(B/'resume-state.json').write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(dict(counts=counts,cloudUpdatesVerified=writes,total=len(cases)),ensure_ascii=False))
