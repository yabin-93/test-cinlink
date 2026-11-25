"""Archive genuine 014 Chrome results; no browser tasks or cloud writes."""
from pathlib import Path
import hashlib,json,re,shutil,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
VERSION='v2-watermark-toggle-navigation-20261116';REPORT='results-014-v2-production-20261116.md';DEF='case-014-v2-watermark-toggle-production-20261116.md'
BATCHES=[R/'reports/editor-210'/f'prod-014-v2-watermark-toggle-20261116-{i:02}'for i in [1,2,3]]
E=D/'evidence-014-v2-production-20261116'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def clean(v):
 if isinstance(v,dict):return {k:clean(x)for k,x in v.items()if not re.search(r'media_context|authorization|password|cookie|signed.?url|download.?url',k,re.I)}
 if isinstance(v,list):return[clean(x)for x in v]
 if isinstance(v,str):return re.sub(r'https?://[^\s"<>]*[?][^\s"<>]*','[private URL omitted]',v)
 return v
def note(p,text):
 marker='ERYE210-014-V2-20261116';s=p.read_text(encoding='utf-8');block=f'<!-- {marker} -->\n{text}\n<!-- /{marker} -->\n'
 if '<!-- '+marker+' -->'in s:s=re.sub(r'<!-- '+marker+r' -->.*?<!-- /'+marker+r' -->\n?',lambda _:block,s,flags=re.S)
 elif s.startswith('---\n'):pos=s.find('\n---\n',4)+5;s=s[:pos]+'\n'+block+s[pos:]
 else:first,sep,rest=s.partition('\n');s=first+sep+'\n'+block+'\n'+rest
 p.write_text(s,encoding='utf-8')
def main():
 h=read(D/'case-014-readonly-history-20261116.json');current=read(D/'execution-status-current.json');protected={c['id']:c for c in h['priorCurrent']['cases']if c['id']!='ERYE210-014'}
 assert{c['id']:c for c in current['cases']if c['id']!='ERYE210-014'}==protected
 source=BATCHES[-1]/'014';result=clean(read(source/'result.json'));s=clean(read(source/'checkpoint.json'));assert result['caseVersion']==VERSION and result['status']=='Passed'and s['phase']=='completed'
 assert{read(b/'014/checkpoint.json')['f']['pid']for b in BATCHES}=={s['f']['pid']}
 stages={x['stage']for x in result['checks']};assert stages=={'disabled-controls-and-hidden-overlays','off-after-five-tabs','enabled-again','edited-refresh-persisted'}
 E.mkdir(parents=True,exist_ok=True)
 native={}
 for b in [BATCHES[0],BATCHES[-1]]:
  for p in(b/'014').glob('*.png'):
   if b==BATCHES[0]and p.name!='014-01-enabled-baseline.png':continue
   shutil.copyfile(p,E/p.name);native[p.name]=str(p.relative_to(R)).replace('\\','/')
 for i,b in enumerate(BATCHES[:2],1):
  folder=E/'observer-history'/f'{i:02}';folder.mkdir(parents=True,exist_ok=True)
  old=clean(read(b/'014/result.json'));old['classification']='脚本观察方式修正前历史，不判产品失败；沿同一新工程继续后的当前结果见主记录。'
  write(folder/'result.json',old)
  for p in(b/'014').glob('*failed.png'):
   shutil.copyfile(p,folder/p.name);native[str((folder/p.name).relative_to(E)).replace('\\','/')]=str(p.relative_to(R)).replace('\\','/')
 actual='本例独立新工程水印OFF时文字/图片替换/宽度/透明度控件受限、两种预览隐藏；跨五TAB保持OFF及原设置；ON恢复控件、原文字和图片；文字改WM014_EDITED切页及刷新保持，图片参数及原视频/字幕/音频不串改，无Agent/导出。原只读权限继续待覆盖。'
 result.update(actual=actual,report=REPORT,evidence=E.name+'/manifest.json',sourceBatch=source.parent.name,deferredCoverage={'status':'待覆盖','scope':'真实只读身份浏览及写入拒绝','reason':'缺少真实只读身份及对应授权工程','history':'case-014-readonly-history-20261116.json'})
 write(E/'result.json',result);write(E/'location-and-checks.json',{'caseVersion':VERSION,'f':s['f'],'workspaceId':s['workspaceId'],'phase':s['phase'],'checks':result['checks'],'sourceBatches':[b.name for b in BATCHES],'sameNewProjectThroughout':True})
 write(E/'saved-business-baseline-and-final.json',{'before':s['before'],'after':s['after'],'newText':'WM014_EDITED','oldText':'WM014_BASE','imageWidth':s['imageWidth'],'imageOpacity':s['imageOpacity']})
 current['cases']=[result if c['id']=='ERYE210-014'else c for c in current['cases']];counts={k:sum(c['status']==k for c in current['cases'])for k in ['Passed','Failed','Blocked','Not Applicable','Not Run']};assert counts=={'Passed':50,'Failed':6,'Blocked':0,'Not Applicable':0,'Not Run':0}
 current.update(updated='2026-11-16',counts=counts,automation='56个唯一AUTO入口，无BLOCKED登记门禁；014 v2生产ChromePassed，原只读权限单列待覆盖，不计为已验收。',definitionNote='56有效/0退役；014已按用户确认以水印总开关跨TAB恢复替换并实跑，原只读定义及Blocked保留历史、权限待覆盖。其他55条结果和全部云效关联保持。');write(D/'execution-status-current.json',current)
 write(D/'execution-status-014-v2-production-20261116.json',{'date':'2026-11-16','origin':'https://app.cinlink.ai','browser':'headed Google Chrome / Windows','caseVersion':VERSION,'counts':{'Passed':1,'Failed':0,'Blocked':0,'Not Applicable':0,'Not Run':0},'currentCounts':counts,'cases':[result],'cloudWrites':0,'readonlyCoverage':'待覆盖'})
 lines=['# ERYE-210 当前测试进度','','2026-11-16；当前56条有效、0退役：**'+' / '.join(f'{v} {k}'for k,v in counts.items())+'**。','','014已替换为水印开关跨TAB恢复并生产Chrome通过；原只读身份浏览及权限拒绝仍待覆盖，不因新版通过视为已验收。[本轮报告]('+REPORT+')。其他55条结果保持。','','| 用例 | 当前状态 | 说明 |','|---|---|---|']
 for c in current['cases']:
  cloud=c.get('cloudDefect',{});link=f"；[云效{cloud['identifier']}]({cloud['url']})"if cloud.get('verified')else''
  lines.append(f"| {c['id']} | {c['status']} | {c.get('actual',c.get('reason','')).replace('|','／').replace(chr(10),' ')} [记录]({c.get('report','')}){link} |")
 (D/'execution-status-current.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
 regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8');m=re.search(r'^ERYE210-014:\n(?:(?!^\S).*(?:\n|$))*',reg,re.M);body=yaml.safe_load(m.group())['ERYE210-014'];body.update(status='AUTO',execution_status='Passed',execution_note=actual,execution_batch=source.parent.name,execution_report='docs/cases/requirements/ERYE-210/'+REPORT)
 reg=reg[:m.start()]+yaml.safe_dump({'ERYE210-014':body},allow_unicode=True,sort_keys=False)+reg[m.end():];regpath.write_text(reg,encoding='utf-8')
 casepath=D/'cases.md';cases=casepath.read_text(encoding='utf-8');oldrow=re.search(r'^\| ERYE210-014 \|.*$',cases,re.M).group();newrow=oldrow.replace('；Not Run；','；Passed；').replace('图片上传/宽度','图片替换/宽度');link='[本轮执行/截图]('+REPORT+')';newrow=newrow if link in newrow else newrow.removesuffix('|').rstrip()+'；'+link+' |';cases=cases.replace(oldrow,newrow);casepath.write_text(cases,encoding='utf-8')
 text='ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。'
 report=['# ERYE210-014 v2 生产Chrome执行结果（2026-11-16）','',text,'','## 执行对象与前置','','本例新建项目：`'+s['workspaceId']+'`；新会话：https://app.cinlink.ai/c/'+s['f']['cid']+'；新工程：`'+s['f']['pid']+'`（'+s['f']['name']+'）。只读引用真实20秒视频、原声、8条英语字幕、文字和512×512 PNG基线，在新工程进行页面目标操作，原素材工程未修改。','', '[完整前置、数据、步骤与预期]('+DEF+')。无Agent提示词，无生成/导出，无补槽。','', '| 步骤 | 实际结果 | 判定 |','|---|---|---|','| 关闭总开关 | 文字框、图片替换、宽度、透明度禁用；预览两类水印隐藏，设置保持 | Passed |','| OFF跨五TAB | 五入口可达，原工程保持，返回仍OFF及原文字/图片参数 | Passed |','| 重新ON | 文字/图片预览及参数恢复，编辑控件可用 | Passed |','| 只改文字并切页 | WM014_EDITED保存，Captions返回保持，原图片不变 | Passed |','| 刷新重开 | ON及新文字保持，图片160px/75%保持；原音视频和字幕不变；会话消息0→0 | Passed |','','## 本轮页面原图','']
 for filename,caption in [('014-01-enabled-baseline.png','新工程开启状态基线'),('014-02-off-text-disabled.png','OFF文字控件受限'),('014-03-off-image-after-tabs.png','OFF跨TAB后图片控件受限且参数保留'),('014-04-enabled-settings-restored.png','ON恢复原水印与参数'),('014-05-edited-returned.png','仅改文字后切页返回'),('014-06-final-refresh.png','最终刷新重开保持')]:report += [f'![{caption}]({E.name}/{filename})','']
 report += ['## 调试记录与覆盖边界','','首批脚本对已带disabled的fieldset使用toBeDisabled断言，Playwright将其按非表单控件处理；第二批沿原工程续验，定位器仍使用“无图片”的上传按钮，已有图片实际显示“替换”。两次均属观察脚本错误，原生现场截图保留在observer-history，未归为产品失败。修正为实际输入/按钮受限断言及真实“替换”按钮后，第三批沿同一新工程完成全部步骤，没有另建工程或生成任务。','','[首次观察错误截图]('+E.name+'/observer-history/01/ERYE210-014-failed.png) · [第二次定位错误截图]('+E.name+'/observer-history/02/ERYE210-014-failed.png)。','','原只读权限测试仍待覆盖，需要真实只读授权工程和独立只读身份。未伪造权限、未以业务开关模拟只读；不宣称本轮验证服务端权限拒绝。旧Blocked及原定义见[历史](case-014-readonly-history-20261116.json)。普通子页记忆不在本例条件内，007既有失败保持。','','[结构化结果](execution-status-014-v2-production-20261116.json) · [当前进度](execution-status-current.md) · [原图哈希清单]('+E.name+'/manifest.json)。','']
 (D/REPORT).write_text('\n'.join(report),encoding='utf-8')
 for filename in ['cases.md','automation.md','analysis.md','test-data.md']:note(D/filename,text+' [014本轮报告]('+REPORT+') · [完整用例]('+DEF+')。下方旧“014唯一门禁”说明为历史。')
 definition=(D/DEF).read_text(encoding='utf-8').replace('图片上传/宽度','图片替换/宽度').replace('初始Not Run；','当前Passed；初始Not Run已由本轮实跑更新；');(D/DEF).write_text(definition,encoding='utf-8')
 for filename,prefix in {'docs/testing-progress.md':'cases/requirements/ERYE-210/','docs/verification.md':'cases/requirements/ERYE-210/','docs/codex-context.md':'cases/requirements/ERYE-210/','docs/cases/editor-linked-196-206-210.md':'requirements/ERYE-210/','AGENTS.md':'docs/cases/requirements/ERYE-210/'}.items():note(R/filename,text+' [014本轮报告]('+prefix+REPORT+')。原“014保留阻塞”由本次明确替换授权更新，原权限覆盖仍待环境。')
 meta=(D/'meta.yaml').read_text(encoding='utf-8');start=meta.index('execution_status:');end=meta.index('\ndefinition_update_016:');part=meta[start:end];part=re.sub(r'^  batch:.*$','  batch: prod-014-v2-watermark-toggle-20261116-03',part,flags=re.M);part=re.sub(r'^  latest_batch_counts:.*$','  latest_batch_counts: {Passed: 1, Failed: 0, Blocked: 0, NotApplicable: 0, NotRun: 0}',part,flags=re.M);part=re.sub(r'^  current_counts:.*$','  current_counts: {Passed: 50, Failed: 6, Blocked: 0, NotApplicable: 0, NotRun: 0}',part,flags=re.M);part=re.sub(r'^  report:.*$','  report: '+REPORT,part,flags=re.M);part=re.sub(r'^  note:.*$','  note: "014 v2生产Chrome通过，原只读权限待覆盖；其他55条及所有云效保持。"',part,flags=re.M);meta=meta[:start]+part+meta[end:]
 meta=re.sub(r'^definition_update_014_v2:.*$',lambda _:'definition_update_014_v2: '+json.dumps({'date':'2026-11-16','version':VERSION,'status':'Passed','definition':DEF,'report':REPORT,'readonlyCoverage':'待覆盖','history':'case-014-readonly-history-20261116.json'},ensure_ascii=False),meta,flags=re.M);yaml.safe_load(meta);(D/'meta.yaml').write_text(meta,encoding='utf-8')
 files=[{'path':str(p.relative_to(E)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),**({'nativeSource':native[str(p.relative_to(E)).replace('\\','/')]}if p.suffix=='.png'else{})}for p in sorted(E.rglob('*'))if p.is_file()and p.name!='manifest.json'];write(E/'manifest.json',{'date':'2026-11-16','caseVersion':VERSION,'case':'ERYE210-014','nativeScreenshots':True,'files':files})
 assert{c['id']:c for c in read(D/'execution-status-current.json')['cases']if c['id']!='ERYE210-014'}==protected
 print(json.dumps({'status':'Passed','counts':counts,'other55CasesUnchanged':True,'readonlyCoverage':'待覆盖','evidenceFiles':len(files),'nativeScreenshots':len(native)},ensure_ascii=False))
if __name__=='__main__':main()
