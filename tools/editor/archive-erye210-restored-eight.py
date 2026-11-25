"""Archive reviewed live results for the six restored points and two new checks."""
from pathlib import Path
from collections import Counter
import hashlib,json,re,shutil,yaml
ROOT=Path(__file__).resolve().parents[2];DOC=ROOT/'docs/cases/requirements/ERYE-210'
IDS=['002','007','010','013','015','040','055','056'];VERSION='v3-restored-six-and-navigation-20261116'
REPORT='results-restored-eight-production-20261116.md';EVIDENCE=DOC/'evidence-restored-eight-production-20261116'
BASE=ROOT/'reports/editor-210/prod-restored-eight-20261116-01'
CORRECTED=ROOT/'reports/editor-210/prod-restored-eight-20261116-02'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def clean(v):
 if isinstance(v,dict):return {k:clean(x) for k,x in v.items() if not re.search(r'authorization|password|cookie|signed.?url|download.?url',k,re.I)}
 if isinstance(v,list):return [clean(x) for x in v]
 if isinstance(v,str):return re.sub(r'https?://[^\s"<>]*[?][^\s"<>]*','[private URL omitted]',v)
 return v
def note(p,text):
 marker='ERYE210-RESTORED8-20261116';s=p.read_text(encoding='utf-8');block=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if '<!-- '+marker+' -->' in s:s=re.sub(r'<!-- '+marker+r' -->.*?<!-- /'+marker+r' -->\n?',lambda _:block,s,flags=re.S)
 else:first,sep,rest=s.partition('\n');s=first+sep+'\n'+block+'\n'+rest
 p.write_text(s,encoding='utf-8')
def actual(cid,r):
 checks=r['checks'];find=lambda stage:next((c for c in checks if c.get('stage')==stage),{})
 if cid=='002':
  x=find('first-import-before-navigation');return f"首次导入20秒原片后、任何手动切页前，实际选中{x.get('state',{}).get('module')}，页面错误{x.get('alerts',[])}；无自动生成结果。"
 if cid=='007':return 'Watermark/Image重开记忆：'+'；'.join(f"{c['stage']}实际{c.get('state',{}).get('module')}，Image选中={c.get('imagePressed')}" for c in checks)+'；工程保存内容保持。'
 if cid=='010':return '同账号同Chrome同会话PA=Captions、PB=Media；交替选择及分别刷新后均恢复各自入口，两工程内容保持。本轮未覆盖跨账号/设备。'
 if cid=='013':return '仅导入真实WAV的无视频工程：'+'；'.join(f"{c['stage']}控件启用={c.get('enabled')}" for c in checks if 'enabled' in c)+('；文字探测值实际保存，无画面限制未生效。' if find('actual-text-write') else '；无意外文字水印保存。')
 if cid=='015':
  x=find('no-selection');return f"未选片段时分割禁用，实际提示{x.get('explanation')}；"+('选中视频后约12秒分割并撤销恢复已完成。' if find('undo-restored') else '后续选中分割/撤销完成情况见检查点。')
 if cid=='040':
  x=find('overlapping-audio-only-deleted');return f"独立WAV位于{x.get('target',{}).get('start')}秒，删除前{x.get('beforeSeconds')}秒、删除后{x.get('afterSeconds')}秒；其他音视频保持={x.get('otherMediaUnchanged')}；"+('一次撤销恢复原媒体与音频引用。' if find('undo-restored') else '撤销结果见原检查点。')
 if cid=='055':return '连续3轮快速切换五TAB，最终Watermark/Image连续观察稳定，同一工程、图片预览和唯一选中入口一致，无内容写入或自动生成。'
 if cid=='056':
  x=find('genuine-module-error');return ('一次原生导出形成真实页面错误'+str(x.get('alerts'))+'；错误后Media/Captions/Watermark导航及原内容保持，未重复导出；仅导航隔离通过，不代表导出修复。') if find('final') else r.get('reason','报错后导航前置或分支未完成，见原记录。')
 return r.get('reason','')
def main():
 history=read(DOC/'restored-six-definition-history-20261116.json');current=read(DOC/'execution-status-current.json');previous={c['id']:c for c in history['priorCurrent']['cases']}
 assert {c['id']:c for c in current['cases'] if c['id'] not in ['ERYE210-'+i for i in IDS]}==previous
 records=[];sources={};diagnostics=[]
 for cid in IDS:
  folder=CORRECTED if (CORRECTED/cid/'result.json').exists() else BASE
  r=clean(read(folder/cid/'result.json'));assert r['caseVersion']==VERSION
  r.update(actual=actual(cid,r),report=REPORT,sourceBatch=folder.name,evidence=EVIDENCE.name+'/manifest.json')
  prior=next(c for c in current['cases'] if c['id']==r['id'])
  if prior.get('historicalDefect'):r['historicalDefect']=prior['historicalDefect']
  for key in ['cloudDefect','cloudSync']:
   if key in prior:r[key]=prior[key]
  records.append(r);sources[cid]=folder.name
  for p in sorted((folder/cid).glob('*.png')):
   dest=EVIDENCE/cid/p.name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dest)
  write(EVIDENCE/cid/'result.json',r)
  private=read(folder/cid/'checkpoint.json')
  if r['workspaceId']!=private['workspaceId']:
   r['runnerWorkspaceId']=r['workspaceId'];r['workspaceId']=private['workspaceId'];r['metadataCorrection']='040续验沿原新工程及原工作区；runner复用本批工作区字段仅作诊断，不当作工程归属。'
   write(EVIDENCE/cid/'result.json',r)
  projection={k:private[k] for k in ['id','f','pb','workspaceId','target','exportTask','exportAttemptedAt','importAttemptedAt'] if k in private}
  if cid=='040':
   def media(p):return [{k:t.get(k) for k in ['type','role','offset_sec','muted']}|{'clips':[{k:c.get(k) for k in ['file_id','timeline_start_sec','source_in_sec','source_out_sec','playback_rate','volume']} for c in t.get('clips',[])]} for t in p['content']['tracks']]
   projection.update(beforeDelete=media(private['withAudio']),afterDelete=media(private['afterDelete']))
  write(EVIDENCE/cid/'location-and-checks.json',clean(projection|{'checks':r['checks']}))
  if folder==CORRECTED:
   raw=read(BASE/cid/'result.json');diagnostics.append({'case':r['id'],'batch':BASE.name,'rawStatus':raw['status'],'classification':'observer/preparation correction; not product verdict','reason':('首次原生导入只发布实际view交换，未触发旧GET监听；首次观察脚本等待工程标识超时。修正实际页面工程标识读取后在独立新工程重新执行。' if cid in ['002','013'] else '原生时间线按30fps对齐，14.06秒进度显示与14.066667秒片段位置相差不足一帧；原准备断言过严，尚未删除。按一帧容差修正后沿同一新工程继续，没有重复导入/添加。')})
   for p in (BASE/cid).glob('*.png'):
    dest=EVIDENCE/'observer-history'/cid/p.name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dest)
 write(EVIDENCE/'observer-history.json',diagnostics)
 audit=BASE/'056/original-task-terminal-audit.json'
 if audit.exists():write(EVIDENCE/'056/original-task-terminal-audit.json',read(audit))
 mapped={r['id']:r for r in records};current['cases']=[mapped.get(c['id'],c) for c in current['cases']]
 counts={s:sum(c['status']==s for c in current['cases']) for s in ['Passed','Failed','Blocked','Not Applicable','Not Run']};batchcounts={s:sum(c['status']==s for c in records) for s in counts}
 current.update(updated='2026-11-16',counts=counts,automation='51个唯一入口：50 AUTO、014唯一BLOCKED登记项；本轮恢复6条、新增2条均已接入并在生产Chrome执行，实际状态逐例记录。',definitionNote='当前51有效/5退役；恢复002/007/010/013/015/040及新增055/056；原43条结果与云效关联保持，旧延期分支继续保留。')
 write(DOC/'execution-status-current.json',current)
 from importlib.util import spec_from_file_location,module_from_spec
 spec=spec_from_file_location('definition210',ROOT/'tools/editor/define-erye210-restored-eight.py');module=module_from_spec(spec);spec.loader.exec_module(module)
 (DOC/'execution-status-current.md').write_text(module.render_current(current),encoding='utf-8')
 write(DOC/'execution-status-restored-eight-production-20261116.json',{'date':'2026-11-16','origin':'https://app.cinlink.ai','browser':'headed Google Chrome / Windows','caseVersion':VERSION,'counts':batchcounts,'cases':records,'currentCounts':counts,'cloudWrites':0})
 regpath=ROOT/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8')
 for r in records:
  pattern=r'^'+r['id']+r':\n(?:(?!^\S).*(?:\n|$))*';oldblock=re.search(pattern,reg,re.M);assert oldblock
  body=yaml.safe_load(oldblock.group(0))[r['id']];body.update(execution_status=r['status'],execution_note=r['actual'],execution_batch=r['sourceBatch'],execution_report='docs/cases/requirements/ERYE-210/'+REPORT)
  dumped=yaml.safe_dump({r['id']:body},allow_unicode=True,sort_keys=False);reg=reg[:oldblock.start()]+dumped+reg[oldblock.end():]
 for cid in ['ERYE210-014','ERYE210-047','ERYE210-049']:
  pattern=r'^'+cid+r':\n(?:(?!^\S).*(?:\n|$))*';assert yaml.safe_load(re.search(pattern,reg,re.M).group(0))==yaml.safe_load(re.search(pattern,history['priorRegistry'],re.M).group(0))
 regpath.write_text(reg,encoding='utf-8');yaml.safe_load(reg)
 meta=(DOC/'meta.yaml').read_text(encoding='utf-8');meta=re.sub(r'^automation:.*$', 'automation: {connected: 50, blocked_precondition_gates: 1, planned: 0, script: "tests/editor/erye210-*.spec.ts", definition_update: "restored-eight-20261116"}',meta,flags=re.M)
 meta=re.sub(r'^  note:.*$', '  note: "当前51有效/5退役，恢复6条原测试点并新增055/056；旧失败、云效关联与延期分支保留，不因范围调整认定修复。"',meta,count=1,flags=re.M)
 normalized=lambda d:{k.replace(' ',''):v for k,v in d.items()}
 for key,value in [('batch','restored-eight-combined-production-20261116'),('latest_batch_counts',json.dumps(normalized(batchcounts))),('current_counts',json.dumps(normalized(counts))),('report',REPORT)]:meta=re.sub(r'^  '+key+r':.*$',lambda _:f'  {key}: {value}',meta,count=1,flags=re.M)
 meta=re.sub(r'^definition_update_restored_eight_20261116:.*$',lambda _:'definition_update_restored_eight_20261116: '+json.dumps({'version':VERSION,'restored':IDS[:6],'new':IDS[6:],'status':'Executed','counts':batchcounts,'definition':'case-restored-eight-production-20261116.md','report':REPORT,'cloudWrites':0},ensure_ascii=False),meta,flags=re.M);yaml.safe_load(meta);(DOC/'meta.yaml').write_text(meta,encoding='utf-8')
 currenttext='当前有效51条：'+ ' / '.join(f'{v} {k}' for k,v in counts.items())+'；仍退役5条（004/005/018/020/041）。本轮8条：'+' / '.join(f'{v} {k}' for k,v in batchcounts.items())+'。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。'
 cases=(DOC/'cases.md').read_text(encoding='utf-8').splitlines()
 for i,line in enumerate(cases):
  for cid in IDS:
   if line.startswith('| ERYE210-'+cid+' |'):cases[i]=line.replace(VERSION+'；Not Run',VERSION+'；'+mapped['ERYE210-'+cid]['status'])
 cases='\n'.join(cases)+'\n';cases=re.sub(r'^更新：.*$', '更新：2026-11-16；六条恢复、两条新增已在生产Chrome执行；历史及延期边界保留。',cases,count=1,flags=re.M);cases=re.sub(r'^本需求当前43条：.*$',currenttext+f' [当前进度](execution-status-current.md) · [本轮执行]({REPORT})。',cases,count=1,flags=re.M);(DOC/'cases.md').write_text(cases,encoding='utf-8')
 links={'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/','docs/cases/editor-linked-196-206-210.md':'requirements/ERYE-210/'}
 for filename,prefix in links.items():note(ROOT/filename,currenttext+f' [完整用例]({prefix}case-restored-eight-production-20261116.md) · [执行及原图]({prefix}{REPORT})。本轮未云效写入、未推送Git。')
 for filename in ['analysis.md','automation.md','test-data.md','retired-failed-cases-20261113.md']:note(DOC/filename,currenttext+f' [本轮定义](case-restored-eight-production-20261116.md) · [执行/截图]({REPORT})。原11条退役清单及统计为历史；恢复6条保留编号和原失败/缺陷，010跨账号/设备、007旧映射和002外部素材入口仍延期。')
 note(ROOT/'AGENTS.md',currenttext+' 用户2026-11-16授权恢复六个原ID并新增055/056；新8条唯一注册erye210-restored-eight.spec.ts，旧实现由isSupersededLegacy210排除。后续按当前51条统计；旧退役11条是历史。勿重放056原导出；新结果仅本地，既有云效记录未改。报告docs/cases/requirements/ERYE-210/'+REPORT+'。')
 # Record exact cases and evidence without treating a definition change as a fix.
 report=['# ERYE210 六条恢复及两条新增：生产Chrome执行（2026-11-16）','',currenttext,'','本轮Windows有头Google Chrome、生产 https://app.cinlink.ai；独立新会话/工程，1 worker、零自动重试。实际代码入口 `tests/editor/erye210-restored-eight.spec.ts`，版本 `'+VERSION+'`。修改只从页面执行，回读仅辅助核对内容及媒体未串用；未以接口实现字段作验收条件。','','[完整前置、输入、步骤及预期](case-restored-eight-production-20261116.md) · [结构化结果](execution-status-restored-eight-production-20261116.json)','', '| 用例 | 状态 | 实际结果 |','|---|---|---|']
 for r in records:report.append(f"| {r['id']} | {r['status']} | {r['actual'].replace('|','／')} |")
 for r in records:
  cid=r['id'].split('-')[-1];report += ['', '## '+r['id'],'',r['actual'],'',f"实际批次：`{r['sourceBatch']}`；[工程/检查点](evidence-restored-eight-production-20261116/{cid}/location-and-checks.json)。"]
  if r['status']!='Passed':report += ['', '**本轮未通过原因**：'+r.get('reason','').replace('\n',' ')[:1200]]
  if r.get('historicalDefect',{}).get('url'):report += ['',f"既有云效历史：[ {r['historicalDefect'].get('serialNumber',r['historicalDefect'].get('identifier','原缺陷'))} ]({r['historicalDefect']['url']})；本轮未修改云效状态。"]
  for p in sorted((EVIDENCE/cid).glob('*.png')):report += ['',f'![{p.stem}](evidence-restored-eight-production-20261116/{cid}/{p.name})']
 report += ['', '## 执行边界与观察脚本修正','','002/013初次原生导入只发布实际页面工程交换信息，未触发旧GET监听，首次观察超时仅归档为脚本读取问题；修正后按独立新工程重新执行。040首次只在准备阶段因显示时间与30fps帧对齐相差0.006667秒而停止，目标删除尚未执行；按一帧容差修正后沿同一新工程删除/撤销，未重复导入或添加。原始准备失败图单列observer-history，不据此报产品缺陷。最终状态以各例上表实际批次为准。','','002、010、013、040本轮修订范围内未复现原失败，既有云效缺陷未改状态；007的一级Watermark已恢复但Image子页仍丢失，015分割/撤销通过但缺选区引导仍缺失。原外部结果入口、旧状态映射、跨账号/设备及逐字稿选区等延期范围不计新版覆盖。','','056只证明真实模块错误后的导航隔离；导出错误不因此修复。[原任务只读终态核对](evidence-restored-eight-production-20261116/056/original-task-terminal-audit.json)确认该任务done，但页面错误和未成功交付仍保留；未重新导出。本轮没有云效新建/上传/状态修改，没有Git提交或推送。','', '[原43条与本轮定义快照](restored-six-definition-history-20261116.json) · [证据清单/SHA-256](evidence-restored-eight-production-20261116/manifest.json) · [当前总进度](execution-status-current.md)。','']
 (DOC/REPORT).write_text('\n'.join(report),encoding='utf-8')
 write(DOC/'reactivated-six-20261116.json',{'date':'2026-11-16','restoredIds':IDS[:6],'newIds':IDS[6:],'stillRetired':['004','005','018','020','041'],'priorActiveCount':43,'activeCount':51,'caseVersion':VERSION,'oldRetirementHistoryUnchanged':True,'cloudWrites':0})
 files=[{'path':str(p.relative_to(EVIDENCE)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(EVIDENCE.rglob('*')) if p.is_file() and p.name!='manifest.json'];write(EVIDENCE/'manifest.json',{'date':'2026-11-16','caseVersion':VERSION,'files':files,'sources':sources,'nativeScreenshots':True})
 assert {c['id']:c for c in current['cases'] if c['id'] not in ['ERYE210-'+i for i in IDS]}==previous
 print(json.dumps({'batchCounts':batchcounts,'currentCounts':counts,'protectedOriginalCases':43,'files':len(files)},ensure_ascii=False))
if __name__=='__main__':main()
