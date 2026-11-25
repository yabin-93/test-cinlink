"""Archive only observed ICP outcomes; unexecuted rounds stay unexecuted."""
import argparse,pathlib,json,shutil,collections
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args();root=pathlib.Path(__file__).resolve().parents[2];out=pathlib.Path(a.report).resolve();target=root/'docs/design-cases/icp-workflows';state=json.loads((out/'execution.json').read_text(encoding='utf8'));cases=json.loads((target/'cases.json').read_text(encoding='utf8'))
summary=[];detail=['# ICP 电商场景测试进度','', '生产环境，2026-11-16；仅电商Case 01～05。原始钉钉文档未修改。每例使用本批独立会话，素材来自公开商品页或真实测评；本地预制输入不计为CinLink产物。','',f"当前批次：`{out.name}`。",'']
if state.get('promptPolicy')=='document-verbatim':detail+=['本轮按用户最新要求新建项目重跑，已发送的制作/修改指令均使用原表原文，不追加执行建议、限制或重复要求；必要信息通过事实资料或实际补槽提供。前置不满足而未发送的轮次单列；素材准备及已撤销准备尝试不计入业务轮次。上一批额外提示词的结果仅保留历史，不计入本轮。','']
if state.get('observationPaused'):detail +=['当前观察暂停：'+state['observationPaused']['reason']+'；最后确认的运行状态以逐轮记录为准，运行中任务未取消，未观察到的后续结果不推断。','']
if state.get('recordValidation'):
 v=state['recordValidation'];detail +=[f"记录核对：{v['sourceDefinitionsExact']}条原文定义与源表快照一致；{v['acceptedPromptsExact']}条实际受理提示词与原文一致；{v['failureScreenshotsCopiedWithoutChanges']}张失败原图已逐字节核对归档。",'']
if state.get('defectSync'):
 v=state['defectSync'];detail +=[f"后续缺陷同步（{v['date']}）：{v['created']}条已提交并回读通过，{v['screenshotsUploaded']}张失败原图已上传、嵌入正文，{v['attachmentsVerified']}份附件核验通过；[缺陷清单及未提范围]({v['report']})。测试结果保持原实测，本次没有重新执行产品。",'']
detail+=['| 用例 | 场景 | 当前状态 | 实际结果 |','|---|---|---|---|']
for c in cases:
 e=state['cases'].get(c['id'],{});status=e.get('status','Not Run');c['status']=status;actual=e.get('actual','尚未完成执行与业务验收。');brief=e.get('summary',actual);row={'id':c['id'],'status':status,'summary':brief,'actual':actual,'conversationId':e.get('conversationId')}
 if e.get('cloudDefects'):row['cloudDefects']=e['cloudDefects'];c['cloudDefects']=e['cloudDefects']
 if e.get('defectTriage'):row['defectTriage']=e['defectTriage'];c['defectTriage']=e['defectTriage']
 summary.append(row);links='；'.join('['+d['id']+']('+d['url']+')' for d in e.get('cloudDefects',[]));detail.append(f"| {c['id']} | {c['role']} | {status} | {brief.replace(chr(10),' ')}"+('；云效：'+links if links else '')+' |')
counts=collections.Counter(x['status'] for x in summary);rounds=[s for e in state['cases'].values() for s in e.get('steps',[])];round_counts=collections.Counter(s.get('businessStatus','待验收') for s in rounds);not_run=sum(len(e.get('unexecutedRounds',[])) for e in state['cases'].values());total_rounds=sum(len(c['steps']) for c in cases);pending=max(0,total_rounds-len(rounds)-not_run);detail+=['','场景状态：'+ ' / '.join(f'{k} {v}' for k,v in counts.items())+'。','',f'原文制作/修改轮次：已提交并观察 {len(rounds)}/{total_rounds}；明确前置失败未提交 {not_run}；待提交的适用轮次 {pending}。已提交轮次业务验收：'+' / '.join(f'{k} {v}' for k,v in round_counts.items())+'。任务done只表示任务结束，不能替代业务验收通过。','', '## 逐例记录','']
for c in cases:
 e=state['cases'].get(c['id'],{});detail+=[f"### {c['id']}",'',f"状态：{c['status']}。",'',e.get('actual','尚未执行。'),'']
 if e.get('conversationId'):detail +=[f"[本例会话](https://app.cinlink.ai/c/{e['conversationId']})",'']
 if e.get('cloudDefects'):detail +=['已提交云效：'+'；'.join('['+d['id']+']('+d['url']+')（第'+str(d['coveredRounds'])+'轮）' for d in e['cloudDefects'])+'。','']
 if e.get('defectTriage'):detail +=['缺陷判定：'+e['defectTriage']+'。','']
 if e.get('preparationRejectedAttempts'):detail +=['准备记录：最初一次附25份素材的请求被20素材上限拒绝；未发现已受理run后，改为先载入5份公共参考，再提交20份商品素材。完整输入保留，不削减SKU。初次准备提示与恢复记录单列，不代替制片业务结论。','']
 for s in e.get('steps',[]):
  detail +=[f"- 第{s['index']+1}轮：任务状态 `{s['status']}`"+(f"；run `{s['runId']}`。" if s.get('runId') else '；尚未取得受理run。')]
  if s.get('businessStatus'):detail +=['  业务验收：`'+s['businessStatus']+'`。']
  if s.get('precondition'):detail +=['  前置调整：'+s['precondition']]
  if s.get('actual'):detail +=['  业务结果：'+s['actual']]
  if s.get('clarification'):detail +=['  补槽：'+json.dumps(s['clarification'],ensure_ascii=False)]
 if e.get('unexecutedRounds'):detail+=['','未执行轮次：'+str(e['unexecutedRounds'])+'；原因：'+e.get('remainingReason','前置未满足')+'。','']
 for source in sorted((out/c['id']).glob('failed-*.png')):
  folder=target/'evidence'/out.name;folder.mkdir(parents=True,exist_ok=True);dest=folder/(c['id']+'-'+source.name);shutil.copy2(source,dest);detail +=['',f"![{c['id']}本轮失败原图](evidence/{out.name}/{dest.name})",'']
cloud_note='缺陷同步见上方后续记录；未提交或推送Git。' if state.get('defectSync') else '本轮未同步云效、未提交或推送Git。'
detail+=['','## 验收与未覆盖','', '依据原表首稿和最终Output核验，不验证内部拟定字段/实现算法。后续假设错误未实际发生时，不能伪称已复现；任务未交付成片时，其依赖修改、语义/画面/音画准确性及导出均未覆盖。','', 'Case01提供真实测评及同型号产品素材，但普通自行车收纳对比与参考爆款片的素材覆盖不完整；原测评约264～278秒可见真实折叠操作，必要补槽已提供同源演示片段。素材覆盖限制与实际未交付分别记录，不将全部未交付直接归因为产品缺陷。','', 'Case 03/04使用本地预制的5分钟横版介绍和35秒竖版英语广告；它们基于同一真实产品测评制作，保留原声、来源及英语文字，分别用于比例改版与本地化测试。它们属于测试输入，不是CinLink生成结果。完整测评保存副本约605秒，拼接重叠边界画面已对照，最终文件完整解码无错误；底层分辨率变化已规范化，输入哈希和探测记录留本机。','', '实际成片音轨已用本机离线识别辅助核验主要语言和词句；不凭ASR错字或不确定尾词判缺陷。配音自然度、墨西哥区域口音未作人工试听验收，未触发的折叠演示音画错位修复也不计通过。','',f"自动化入口：`tools/icp/run.mjs`；完整原提示词和前置操作见[统一入口中的电商用例](../../cases/README.md#icp-ecommerce-cases)，逐步检查点和原始截图位于本批 `reports/{out.name}/`。"+cloud_note,'']
(target/'cases.json').write_text(json.dumps(cases,ensure_ascii=False,indent=2)+'\n',encoding='utf8');(target/'execution-status-current.json').write_text(json.dumps({'date':'2026-11-16','environment':'production','counts':dict(counts),'rounds':{'submitted':len(rounds),'total':total_rounds,'notRunForPrerequisites':not_run,'pendingApplicable':pending,'businessCounts':dict(round_counts)},'recordCheck':state.get('recordValidation'),'defectSync':state.get('defectSync'),'cases':summary},ensure_ascii=False,indent=2)+'\n',encoding='utf8');(target/'execution-status-current.md').write_text('\n'.join(detail),encoding='utf8');print(json.dumps({'cases':dict(counts),'submittedRounds':len(rounds),'notRunRounds':not_run,'pendingApplicableRounds':pending},ensure_ascii=False))
