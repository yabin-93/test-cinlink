"""Archive reviewed final-five execution; preserve all previous 51 cases and cloud links."""
from pathlib import Path
from importlib.util import spec_from_file_location,module_from_spec
import hashlib,json,re,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
BASE=R/'reports/editor-210/prod-restored-five-20261116-01'
ADJUSTED=R/'reports/editor-210/prod-restored-five-20261116-02'
CONTINUED=R/'reports/editor-210/prod-restored-five-20261116-03'
E=D/'evidence-restored-final-five-production-20261116'
IDS=['004','005','018','020','041'];VERSION='v4-restored-final-five-20261116'
REPORT='results-restored-final-five-production-20261116.md';DEF='case-restored-final-five-production-20261116.md'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def clean(v):
 if isinstance(v,dict):return {k:clean(x)for k,x in v.items()if not re.search(r'authorization|password|cookie|signed.?url|download.?url',k,re.I)}
 if isinstance(v,list):return [clean(x)for x in v]
 if isinstance(v,str):return re.sub(r'https?://[^\s"<>]*[?][^\s"<>]*','[private URL omitted]',v)
 return v
def note(p,text):
 marker='ERYE210-RESTORED5-20261116';s=p.read_text(encoding='utf-8');b=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if '<!-- '+marker+' -->'in s:s=re.sub(r'<!-- '+marker+r' -->.*?<!-- /'+marker+r' -->\n?',lambda _:b,s,flags=re.S)
 elif s.startswith('---\n'):end=s.find('\n---\n',4)+5;s=s[:end]+'\n'+b+s[end:]
 else:first,sep,rest=s.partition('\n');s=first+sep+'\n'+b+'\n'+rest
 p.write_text(s,encoding='utf-8')
def main():
 h=read(D/'restored-final-five-definition-history-20261116.json');cur=read(D/'execution-status-current.json');previous={c['id']:c for c in h['priorCurrent']['cases']};fullids=['ERYE210-'+i for i in IDS]
 assert {c['id']:c for c in cur['cases']if c['id']not in fullids}==previous
 records=[]
 for cid in IDS:
  batch=CONTINUED if(CONTINUED/cid/'result.json').exists()else ADJUSTED if(ADJUSTED/cid/'result.json').exists()else BASE
  source=batch/cid;r=clean(read(source/'result.json'));assert r['caseVersion']==VERSION;s=read(source/'checkpoint.json');prior=next(c for c in cur['cases']if c['id']==r['id'])
  for key in ['historicalDefect','cloudDefect','cloudSync']:
   if key in prior:r[key]=prior[key]
  if r['workspaceId']!=s['workspaceId']:r['runnerWorkspaceId']=r['workspaceId'];r['workspaceId']=s['workspaceId'];r['metadataCorrection']='原生翻译配音使用本例独立工作区；runner公共工作区仅为执行器环境，不是工程归属。'
  actual=r.get('reason','')
  if cid=='005'and r['status']=='Passed':actual='本例独立新工程真实分析出2个停顿候选，仅停顿/0.8秒且未移除；选择候选后切Captions→Watermark→Scripts，候选、参数和同工程审核内容保持，视频/原声/字幕仍为原结果，无自动裁剪或生成。'
  if cid=='041'and r['status']=='Passed':actual='同项目两会话实际准备A/B素材，Chat/Project基线可区分；分别按完整名称搜索命中、不存在名称无候选、清空恢复各范围列表；搜索未更换工程、添加时间线素材或生成。'
  if cid in ['004','018','020']and r['status']=='Blocked':actual='本例已独立新建原生翻译配音项目；'+r.get('reason','')
  if cid=='004'and r['status']=='Passed':actual='独立新建真实英语→简体中文翻译配音项目；从Media手动进入Voiceover，选择第1/2句分别定位实际起始时间，切字幕返回稿件与声音保持；未重新生成。结果卡快捷直达仍延期。'
  if cid=='020'and r['status']=='Passed':actual='独立真实翻译配音项目就绪后，首句改“配音撤销验证020。”并保存，切字幕返回保持；同页撤销恢复原文、重做恢复新文，最后刷新保存，第二句/字幕及旧声音不变，未自动生成。'
  if cid=='018'and r['status']=='Passed':actual='独立真实翻译配音项目中，明确提交一次首句生成并捕获运行窗口；独立水印INDEPENDENT_018保存、切TAB及任务完成后保持，按实际新声音和其他素材核验，未重复生成。'
  if cid=='018'and r['status']=='Failed':actual='真实新译制工程8句稿/声音就绪；首句生成处理中保存水印INDEPENDENT_018成功。原目标任务done并产出新WAV，但工程仍使用全部旧声音；沿同一任务重开配音页核验时出现“编辑器执行数据不符合正式v2协议”，新声未应用，水印保持。未重复生成。'
  if cid=='020'and r['status']=='Failed':actual='真实新译制工程8句稿/声音就绪；首句改“配音撤销验证020。”保存并切字幕返回正常。点击一次撤销后未恢复原稿，配音列表随后变为“暂无配音”；旧声音和字幕保持。重做及刷新最终新稿分支未执行，未点击创建配音或再次撤销。'
  r.update(actual=actual,report=REPORT,sourceBatch=source.parent.name,evidence=E.name+'/manifest.json');records.append(r)
  dest=E/cid;dest.mkdir(parents=True,exist_ok=True)
  for p in source.glob('*.png'):(dest/p.name).write_bytes(p.read_bytes())
  for p in source.glob('*audit.json'):(dest/p.name).write_bytes(p.read_bytes())
  for name in ['018-original-page-review.json','018-original-selected-actions.json','018-original-task-apply-page-error.json']:
   if(source/name).exists():write(dest/name,clean(read(source/name)))
  write(dest/'result.json',r)
  projected={k:s[k]for k in ['id','workspaceId','f','pb','phase','balanceBefore','parameters','prompt','submissionAttemptedAt','runId','preparationFailure','resourceBlock','analysisAttemptedAt','searchBaseline']if k in s and k!='searchBaseline'}
  projected['checks']=r['checks'];write(dest/'location-and-checks.json',clean(projected))
 proof=BASE/'native-translation-resource-block.json'
 if proof.exists():write(E/'native-translation-resource-block-history.json',read(proof))
 for cid in ['004','018','020']:
  if (ADJUSTED/cid/'result.json').exists():
   old=BASE/cid;dest=E/'precondition-history'/cid;dest.mkdir(parents=True,exist_ok=True);write(dest/'result.json',clean(read(old/'result.json')))
   for p in old.glob('*.png'):(dest/p.name).write_bytes(p.read_bytes())
 for cid in ['018','020']:
  if(CONTINUED/cid/'result.json').exists():
   old=ADJUSTED/cid;dest=E/'observer-history'/cid;dest.mkdir(parents=True,exist_ok=True);r=clean(read(old/'result.json'));r['classification']='已创建可编辑工程；缺少下载文件不构成前置缺失，沿原项目继续后的结果为当前结果';write(dest/'result.json',r)
   for p in old.glob('*.png'):(dest/p.name).write_bytes(p.read_bytes())
 mapping={r['id']:r for r in records};cur['cases']=[mapping.get(c['id'],c)for c in cur['cases']]
 counts={s:sum(c['status']==s for c in cur['cases'])for s in ['Passed','Failed','Blocked','Not Applicable','Not Run']};batch={s:sum(c['status']==s for c in records)for s in counts}
 cur.update(updated='2026-11-16',counts=counts,definitionNote='最后五条按用户方案恢复并实跑/核验前置，56有效/0退役。004/018/020只能用各自新建原生翻译配音项目；资源不足及未形成分支明确记录，原失败和延期目标保留。',automation='56个唯一入口：55 AUTO、014唯一BLOCKED登记项；本轮5条已接入并在生产Chrome执行，执行前置阻塞与自动化登记分开。');write(D/'execution-status-current.json',cur)
 lines=['# ERYE-210 当前测试进度','','2026-11-16；当前56条有效、0退役：**'+' / '.join(f'{v} {k}'for k,v in counts.items())+'**。','',f'004/005/018/020/041已按确认方案恢复，原失败、云效及延期分支保留。[本轮前置/结果/原图]({REPORT})。原51条结果未重跑。','','| 用例 | 当前状态 | 说明 |','|---|---|---|']
 for c in cur['cases']:
  cloud=c.get('cloudDefect',{});link=f"；[云效{cloud['identifier']}]({cloud['url']})"if cloud.get('verified')else''
  lines.append(f"| {c['id']} | {c['status']} | {c.get('actual',c.get('reason','')).replace('|','／').replace(chr(10),' ')} [记录]({c.get('report','')}){link} |")
 (D/'execution-status-current.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
 write(D/'execution-status-restored-final-five-production-20261116.json',{'date':'2026-11-16','origin':'https://app.cinlink.ai','browser':'headed Google Chrome / Windows','caseVersion':VERSION,'counts':batch,'cases':records,'currentCounts':counts,'cloudWrites':0})
 regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8')
 for r in records:
  pattern=r'^'+r['id']+r':\n(?:(?!^\S).*(?:\n|$))*';m=re.search(pattern,reg,re.M);body=yaml.safe_load(m.group())[r['id']];body.update(execution_status=r['status'],execution_note=r['actual'],execution_batch=BASE.name,execution_report='docs/cases/requirements/ERYE-210/'+REPORT);reg=reg[:m.start()]+yaml.safe_dump({r['id']:body},allow_unicode=True,sort_keys=False)+reg[m.end():]
 for cid in previous:
  pattern=r'^'+cid+r':\n(?:(?!^\S).*(?:\n|$))*';assert yaml.safe_load(re.search(pattern,reg,re.M).group())==yaml.safe_load(re.search(pattern,h['priorRegistry'],re.M).group())
 regpath.write_text(reg,encoding='utf-8')
 meta=(D/'meta.yaml').read_text(encoding='utf-8');meta=re.sub(r'^automation:.*$','automation: {connected: 55, blocked_precondition_gates: 1, planned: 0, script: "tests/editor/erye210-*.spec.ts", definition_update: "restored-final-five-20261116"}',meta,flags=re.M)
 for key,value in [('batch','restored-final-five-combined-production-20261116'),('latest_batch_counts',json.dumps({k.replace(' ',''):v for k,v in batch.items()})),('current_counts',json.dumps({k.replace(' ',''):v for k,v in counts.items()})),('report',REPORT),('note','"当前56有效/0退役，旧结果和云效保留；积分调整后原生译制前置已建立，018/020目标步骤实际失败，初次资源不足仅历史。"')]:meta=re.sub(r'^  '+key+r':.*$',lambda _:f'  {key}: {value}',meta,count=1,flags=re.M)
 meta=re.sub(r'^definition_update_restored_final_five_20261116:.*$',lambda _:'definition_update_restored_final_five_20261116: '+json.dumps({'version':VERSION,'ids':IDS,'status':'Executed','counts':batch,'definition':DEF,'report':REPORT,'nativeTranslationRequired':['004','018','020'],'cloudWrites':0},ensure_ascii=False),meta,flags=re.M);yaml.safe_load(meta);(D/'meta.yaml').write_text(meta,encoding='utf-8')
 text='当前56条有效、0退役：'+' / '.join(f'{v} {k}'for k,v in counts.items())+'。本轮最后5条：'+' / '.join(f'{v} {k}'for k,v in batch.items())+'。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。'
 cases=(D/'cases.md').read_text(encoding='utf-8').splitlines()
 for i,line in enumerate(cases):
  for cid in IDS:
   if line.startswith('| ERYE210-'+cid+' |'):cases[i]=line.replace(VERSION+'；Not Run',VERSION+'；'+mapping['ERYE210-'+cid]['status'])
 cases='\n'.join(cases)+'\n';cases=re.sub(r'^本需求当前.*$',text+f' [当前进度](execution-status-current.md) · [本轮结果]({REPORT})。',cases,count=1,flags=re.M);(D/'cases.md').write_text(cases,encoding='utf-8')
 links={'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/','docs/cases/editor-linked-196-206-210.md':'requirements/ERYE-210/'}
 for filename,prefix in links.items():note(R/filename,text+f' [完整定义]({prefix}{DEF}) · [执行/截图]({prefix}{REPORT})。本轮未云效写入、未推送Git。')
 for filename in ['analysis.md','automation.md','test-data.md','retired-failed-cases-20261113.md']:note(D/filename,text+f' [完整定义]({DEF}) · [执行/截图]({REPORT})。所有原11退役条目已分批按用户要求恢复，旧退役清单仅历史；原结果卡快捷定位、旧审核入口和其他延期分支不计覆盖。')
 note(R/'AGENTS.md',text+' 最后5条唯一注册erye210-restored-five.spec.ts，旧实现继续排除。原生译制准备run_v2_62f81e3a8dd542b18f65b77e2dfbc757已终态积分不足；用户已调积分，补跑用新的原生翻译配音项目/任务，不能重发任何已有任务。报告docs/cases/requirements/ERYE-210/'+REPORT+'。')
 report=['# ERYE210 最后五条恢复：生产Chrome执行（2026-11-16）','',text,'',f'[完整前置、输入及步骤]({DEF}) · [当前总进度](execution-status-current.md)','','生产Windows有头Google Chrome，单worker、零自动重试；本例专用项目/工程，页面操作验收，不验证内部实现协议。配音使用各自新建原生翻译配音项目，未复制普通字幕工程冒充。','','| 用例 | 状态 | 实际结果 |','|---|---|---|']
 for r in records:report.append(f"| {r['id']} | {r['status']} | {r['actual'].replace('|','／')} |")
 for r in records:
  cid=r['id'][-3:];report+=['','## '+r['id'],'',r['actual'],'',f"实际执行源批次：`{r['sourceBatch']}`；[本轮项目/检查记录]({E.name}/{cid}/location-and-checks.json)。"]
  if cid=='018':report+=['','原首句生成任务`098712db-e7f8-475c-85fc-93ffafd16e76`已done并产出新WAV；独立水印保持，但随后只读核验仍为8个旧声音引用，新文件没有进入工程。重开原配音页核对原任务应用时出现页面原文“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，没有再次点击生成。不是仅凭首次断言或后台done判断，见[原任务回读]('+E.name+'/018/original-target-readonly-audit.json)与[原任务页面错误]('+E.name+'/018/018-original-task-apply-page-error.json)。后续刷新水印最终结果分支未完成。']
  if cid=='020':report+=['','已保存新稿并切页返回；一次撤销后先仍见新文、等待后文稿列表变“暂无配音”，没有恢复原文。没有重复撤销、点击创建配音或执行重做；旧音频/字幕只读回看保持，见[原撤销结果核验]('+E.name+'/020/020-original-undo-readonly-audit.json)。不推断内部历史实现原因。']
  for p in sorted((E/cid).glob('*.png')):report+=['',f'![{p.stem}]({E.name}/{cid}/{p.name})']
 report+=['','## 配音准备历史及验收边界','','初次准备时，004原生译制任务run_v2_62f81e3a8dd542b18f65b77e2dfbc757明确返回“Insufficient credits. Required 200 points, available 100 points.”，终态failed。018/020各自已配置独立原生项目，未重复提交同类不足资源任务。该三条初次Blocked保存在precondition-history，不覆盖用户调整积分后的新批次。','','用户随后调整积分，页面核对为5,100；在prod-restored-five-20261116-02为004/018/020分别新建新的真实翻译配音项目，并提交新的准备任务。004通过；018/020虽然未提供工程下载文件，但原生可编辑工程已创建。首次观察脚本只从下载文件找工程，原Blocked放入observer-history；修正后在03沿同一原生工程继续，已确认各8句文稿和声音就绪，未重新译制。目标操作后的实际失败不归为前置缺失。','','任何配音前置须至少两句文稿及声音就绪。列表/声音不可用则明确记录当前前置缺口；目标开始后生成或编辑报错则Failed。不能用普通工程、手工字幕或时间线静音操作替代；018必须捕获真实处理中窗口，不重复生成抢窗口。','','[初次资源不足回执（历史）]('+E.name+'/native-translation-resource-block-history.json) · [原51条及定义快照](restored-final-five-definition-history-20261116.json) · [结构化结果](execution-status-restored-final-five-production-20261116.json) · [原图及哈希清单]('+E.name+'/manifest.json)。本轮未新建/修改云效缺陷，未提交或推送Git。','']
 (D/REPORT).write_text('\n'.join(report),encoding='utf-8')
 write(D/'reactivated-final-five-20261116.json',{'date':'2026-11-16','restoredIds':IDS,'priorActiveCount':51,'activeCount':56,'retiredCount':0,'caseVersion':VERSION,'oldHistoryRetained':True,'counts':batch,'cloudWrites':0})
 files=[{'path':str(p.relative_to(E)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}for p in sorted(E.rglob('*'))if p.is_file()and p.name!='manifest.json'];write(E/'manifest.json',{'date':'2026-11-16','batch':'restored-final-five-combined-production-20261116','sourceBatches':[BASE.name,ADJUSTED.name,CONTINUED.name],'cases':{r['id']:r['sourceBatch']for r in records},'caseVersion':VERSION,'nativeScreenshots':True,'files':files})
 assert {c['id']:c for c in cur['cases']if c['id']not in fullids}==previous
 print(json.dumps({'batchCounts':batch,'currentCounts':counts,'protectedPreviousCases':51,'evidenceFiles':len(files)},ensure_ascii=False))
if __name__=='__main__':main()
