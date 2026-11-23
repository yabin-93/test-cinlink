"""Archive reviewed 046/048 v3 results without rewriting other cases or cloud defects."""
from pathlib import Path
from collections import Counter
import hashlib,json,re,shutil
ROOT=Path(__file__).resolve().parents[2]
DOC=ROOT/'docs/cases/requirements/ERYE-210'
BATCH='prod-046-048-v3-20261116-04'
RAW=ROOT/'reports/editor-210'/BATCH
EVIDENCE=DOC/'evidence-046-048-v3-production-20261116'
REPORT='results-046-048-v3-production-20261116.md'
VERSION='v3-restore-existing-voice-20261116'
IDS=['ERYE210-046','ERYE210-048']
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,value):
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def clean(value):
 if isinstance(value,dict):return {k:clean(v) for k,v in value.items() if not re.search(r'token|cookie|authorization|password|signed.?url|download.?url',k,re.I)}
 if isinstance(value,list):return [clean(v) for v in value]
 if isinstance(value,str):return re.sub(r'https?://[^\s"<>]*[?][^\s"<>]*','[private URL omitted]',value)
 return value
def append_note(p,marker,text):
 content=p.read_text(encoding='utf-8');block=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if f'<!-- {marker} -->' in content:content=re.sub(r'<!-- '+re.escape(marker)+r' -->.*?<!-- /'+re.escape(marker)+r' -->\n?',lambda _:block,content,flags=re.S)
 else:
  first,sep,rest=content.partition('\n');content=first+sep+'\n'+block+'\n'+rest
 p.write_text(content,encoding='utf-8')
def main():
 history=read(DOC/'case-046-048-v2-blocked-history-20261116.json')
 current=read(DOC/'execution-status-current.json')
 if len(current['cases'])!=43:raise SystemExit('当前已恢复/新增用例，历史046/048归档器不覆盖新范围；请使用最新批次归档器。')
 protected={c['id']:c for c in history['protectedOtherCases']}
 assert {c['id']:c for c in current['cases'] if c['id'] not in IDS}==protected
 actuals={
 '046':'v3生产Chrome通过：本轮独立新工程真实分析/清理后，同页仅恢复7.800～8.480秒停顿，18.695896→19.375896秒；另一处17.200～17.824104秒仍删除。视频/原声源区间及时间线一致，8条字幕文字顺序和原画面时码对应，刷新重开保持。只分析保留片段的二次分析仍延期。',
 '048':'v3生产Chrome通过：独立新工程引用真实已完成译制的原始工程，8句既有中文声音；仅中文C1改“字幕与译制人声独立048。”，时间线配音静音→切模块/刷新保持→配音启用→刷新保持。同一批声音文件不替换/重复，英文、其他中文、视频、原声和BGM保持。未进入配音页或生成声音，原改配音稿并单句生成仍延期。'}
 records=[]
 for cid in ['046','048']:
  record=clean(read(RAW/cid/'result.json'));assert record['caseVersion']==VERSION
  assert record['status']=='Passed','Review nonpassing run before changing this archive narrative'
  record.update(actual=actuals[cid],report=REPORT,sourceBatch=BATCH,evidence=EVIDENCE.name+'/manifest.json',deferredScope='只对保留片段二次分析' if cid=='046' else '配音文稿改稿并单句重新生成',priorBlockedHistory='case-046-048-v2-blocked-history-20261116.json')
  records.append(record)
  for p in sorted((RAW/cid).glob('*.png')):
   dest=EVIDENCE/cid/p.name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dest)
  write(EVIDENCE/cid/'result.json',record)
  s=read(RAW/cid/'checkpoint.json')
  def media(p):return [{'type':t['type'],'role':t.get('role'),'muted':t.get('muted'),'offset_sec':t.get('offset_sec'),'clips':[{k:c.get(k) for k in ['file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume','language']} for c in t.get('clips',[])]} for t in p['content']['tracks']]
  write(EVIDENCE/cid/'media-reference-checks.json',{'project':s['f'],'sourceProjectId':s.get('sourceProjectId'),'sourceKind':s.get('sourceKind'),'before':media(s['before']),'cleaned':media(s['cleaned']) if s.get('cleaned') else None,'restored':media(s['restored']) if s.get('restored') else None,'checks':record['checks']})
 # Preserve raw preparation/locator failures as diagnostics, not new product defects.
 diagnostics=[{'case':'046','rawBatch':'prod-046-048-v3-20261116-03','rawStatus':'Failed','classification':'precondition correction','reason':'原准备工程重开后审核失效，显示删除按钮禁用；未点击恢复。改在新独立工程同次分析/清理页面连续操作。'}, {'case':'048','rawBatch':'prod-046-048-v3-20261116-03','rawStatus':'Failed','classification':'observer correction','reason':'中英共用句子标识；页面只改中文，脚本仅按句子标识误期望英文也改变。修正联合字幕文件+句子定位，再以独立原始译制基线执行。'}]
 write(EVIDENCE/'preparation-observer-history.json',diagnostics)
 for cid in ['046','048']:
  source=ROOT/'reports/editor-210/prod-046-048-v3-20261116-03'/cid/f'ERYE210-{cid}-failed.png'
  dest=EVIDENCE/'preparation-observer-history'/cid/source.name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,dest)
 mapping={r['id']:r for r in records}
 current['cases']=[mapping.get(c['id'],c) for c in current['cases']]
 counts={s:sum(c['status']==s for c in current['cases']) for s in ['Passed','Failed','Blocked','Not Applicable','Not Run']}
 current.update(updated='2026-11-16',counts=counts,definitionNote='046/048按当前可操作恢复/静音功能优化为v3并实跑；原二次分析和单句配音更新延期，历史Blocked保留。原11条失败保持退役，014及047/049云效关联保持。',automation='当前43个唯一脚本入口：42 AUTO、014唯一BLOCKED登记项。046/048 v3在生产有头Chrome实际执行2 Passed。')
 write(DOC/'execution-status-current.json',current)
 regpath=ROOT/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8')
 for cid in ['046','048']:
  reg=re.sub(r'(^ERYE210-'+cid+r':\n)(?:(?!^\S).*(?:\n|$))*',lambda m:m.group(1)+f'  status: AUTO\n  script: "tests/editor/erye210-current-five.spec.ts"\n  definition_version: "{VERSION}"\n  execution_status: "Passed"\n  execution_note: '+json.dumps(actuals[cid]+'；'+REPORT,ensure_ascii=False)+'\n',reg,flags=re.M)
 for cid in ['014','047','049']:
  assert re.search(r'^ERYE210-'+cid+r':\n(?:(?!^\S).*(?:\n|$))*',reg,re.M).group(0)==history['registry'][cid]
 regpath.write_text(reg,encoding='utf-8')
 cases=(DOC/'cases.md').read_text(encoding='utf-8').splitlines()
 for index,row in enumerate(cases):
  for cid in ['046','048']:
   if row.startswith('| ERYE210-'+cid+' |'):
    row=row.replace('可沿本轮准备检查点继续，不重复分析。','分析/移除/恢复在同次打开页面连续完成，重开失效审核不作恢复前置。')
    cols=row.split('|');cols[-2]=f' {VERSION}；Passed；[完整前置/输入/步骤/预期](case-046-048-v3-current-controls-20261116.md#erye210-{cid})；[本轮结果]({REPORT}) ';cases[index]='|'.join(cols)
 (DOC/'cases.md').write_text('\n'.join(cases)+'\n',encoding='utf-8')
 summary='当前43条：**40 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run**。046/048 v3生产Chrome实跑2 Passed；014保持原Blocked，047/FWXC-579与049/FWXC-580保持Failed和云效关联。旧二次分析、配音稿修改/单句再生成仍延期，其他41条未重跑。'
 lines=['# ERYE-210 当前测试进度','','2026-11-16；'+summary,'',f'[046/048本轮步骤、结果及截图]({REPORT}) · [全部用例](cases.md)','','| 用例 | 当前状态 | 说明 |','|---|---|---|']
 for c in current['cases']:lines.append(f"| {c['id']} | {c['status']} | {c.get('actual',c.get('reason','')).replace('|','／').replace(chr(10),' ')} [记录]({c.get('report','')}) |")
 (DOC/'execution-status-current.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
 # Repair the existing cloud_sync_047_049 indentation, retaining its exact payload.
 meta=(DOC/'meta.yaml').read_text(encoding='utf-8');cloud=re.search(r'^  cloud_sync_047_049:.*\n?',meta,re.M)
 if cloud:
  line=cloud.group(0);meta=meta[:cloud.start()]+meta[cloud.end():];pos=meta.index('\ndefinition_update_016:');meta=meta[:pos]+'\n'+line+meta[pos:]
 import yaml
 parsed=yaml.safe_load(meta);es=parsed['execution_status'];es.update(batch=BATCH,latest_batch_counts={'Passed':2,'Failed':0,'Blocked':0,'NotApplicable':0,'NotRun':0},current_counts={'Passed':40,'Failed':2,'Blocked':1,'NotApplicable':0,'NotRun':0},report=REPORT)
 # Preserve human-readable legacy sections; only replace current execution values.
 for key,value in [('batch',BATCH),('latest_batch_counts','{Passed: 2, Failed: 0, Blocked: 0, NotApplicable: 0, NotRun: 0}'),('current_counts','{Passed: 40, Failed: 2, Blocked: 1, NotApplicable: 0, NotRun: 0}'),('report',REPORT)]:
  meta=re.sub(r'^  '+key+r':.*$',f'  {key}: {value}',meta,count=1,flags=re.M)
 definition_line='definition_update_046_048_v3: '+json.dumps({'date':'2026-11-16','version':VERSION,'ids':IDS,'executed':True,'counts':{'Passed':2},'definition':'case-046-048-v3-current-controls-20261116.md','report':REPORT,'oldScopesDeferred':True,'cloudWrites':0},ensure_ascii=False)
 if re.search(r'^definition_update_046_048_v3:.*$',meta,re.M):meta=re.sub(r'^definition_update_046_048_v3:.*$',lambda _:definition_line,meta,flags=re.M)
 else:meta+='\n'+definition_line+'\n'
 assert yaml.safe_load(meta)['execution_status']['cloud_sync_047_049']['defects']==['FWXC-579','FWXC-580']
 (DOC/'meta.yaml').write_text(meta,encoding='utf-8')
 write(DOC/'execution-status-046-048-v3-production-20261116.json',{'date':'2026-11-16','origin':'https://app.cinlink.ai','browser':'headed Google Chrome / Windows','caseVersion':VERSION,'batch':BATCH,'counts':{'Passed':2,'Failed':0,'Blocked':0},'cases':records,'currentCounts':counts,'cloudWrites':0})
 for p in [DOC/'case-045-049-v2-current-functions-20261116.md',DOC/'results-045-049-current-functions-prod-20261116.md']:
  append_note(p,'ERYE210-046048-SUPERSEDED-20261116',f'以下046/048定义和Blocked是v2历史，当前已由[v3定义](case-046-048-v3-current-controls-20261116.md)替换并[实跑通过]({REPORT})；旧目标继续延期。045/047/049本轮未重跑。')
 for name in ['analysis.md','automation.md','test-data.md']:
  append_note(DOC/name,'ERYE210-046048-V3-20261116',summary+f' [完整定义](case-046-048-v3-current-controls-20261116.md) · [本轮结果]({REPORT})。048使用真实译制原始工程独立副本，保留真实8句声音和中英字幕；不要求故障配音面板，不触发生成。046在同次真实分析/清理页面恢复。')
 links={'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/','docs/cases/editor-linked-196-206-210.md':'requirements/ERYE-210/'}
 for name,prefix in links.items():append_note(ROOT/name,'ERYE210-046048-V3-20261116',summary+f' [完整定义]({prefix}case-046-048-v3-current-controls-20261116.md) · [执行及截图]({prefix}{REPORT})。')
 append_note(ROOT/'AGENTS.md','ERYE210-046048-V3-20261116','2026-11-16最新范围：'+summary+' 046/048唯一入口仍current-five.spec.ts，实际执行函数为erye210-current-two.ts；旧current-five.ts内046/048函数仅历史，不再注册。047仍必须独立真实翻译配音并保留完整配音绑定；048新版仅对已有译制音轨/字幕操作，允许在新独立工程引用真实译制原始工程及其声音，不进入故障Voiceover面板。二次分析及配音再生成未修复。旧五例归档器遇v3会停止，避免覆盖新结果。报告docs/cases/requirements/ERYE-210/'+REPORT+'。')
 assert {c['id']:c for c in current['cases'] if c['id'] not in IDS}==protected
 files=[{'path':str(p.relative_to(EVIDENCE)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(EVIDENCE.rglob('*')) if p.is_file() and p.name!='manifest.json']
 write(EVIDENCE/'manifest.json',{'date':'2026-11-16','batch':BATCH,'caseVersion':VERSION,'screenshots':'native production Chrome; diagnostic failures separately labelled','files':files})
 print(json.dumps({'counts':counts,'protectedOtherCases':len(protected),'newPassed':2},ensure_ascii=False))
if __name__=='__main__':main()
