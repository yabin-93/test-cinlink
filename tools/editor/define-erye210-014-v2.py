"""Replace 014 once; preserve its genuine readonly scope and all other current results."""
from pathlib import Path
import json,re,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
VERSION='v2-watermark-toggle-navigation-20261116';DEF='case-014-v2-watermark-toggle-production-20261116.md';REPORT='results-014-v2-production-20261116.md';HISTORY='case-014-readonly-history-20261116.json'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def main():
 history=D/HISTORY;assert not history.exists(),'Already replaced; do not reset execution.'
 current=read(D/'execution-status-current.json');prior=next(c for c in current['cases']if c['id']=='ERYE210-014')
 casepath=D/'cases.md';cases=casepath.read_text(encoding='utf-8');oldrow=re.search(r'^\| ERYE210-014 \|.*$',cases,re.M).group()
 regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8');match=re.search(r'^ERYE210-014:\n(?:(?!^\S).*(?:\n|$))*',reg,re.M);body=yaml.safe_load(match.group())['ERYE210-014']
 oldtest=(R/'tests/editor/erye210-navigation.spec.ts').read_text(encoding='utf-8');testblock=re.search(r"(?:if \(!isSupersededLegacy210\('ERYE210-014'\)\) )?test\('ERYE210-014.*?\n\}\);",oldtest,re.S).group()
 write(history,{'date':'2026-11-16','authorization':'用户确认用水印总开关跨TAB限制/恢复替换014并生产Chrome执行，保留原真实只读权限为待覆盖。','priorCurrent':current,'prior014':prior,'priorRow':oldrow,'priorRegistry':body,'legacyScript':testblock,'readonlyCoverage':{'status':'Pending prerequisites / 未覆盖','required':['真实只读授权工程','具有该授权的独立只读身份'],'points':['只读身份可浏览五个模块及原内容','所有修改入口受真实权限限制','实际写入遭权限拒绝，不仅UI禁用'],'restoreWhen':'获得真实只读身份及对应授权工程后补测；不得使用DOM禁用或水印开关模拟权限。'}})
 pre='1. 生产Windows Chrome已登录，有工程编辑权限。<br>2. 本例新建独立项目/会话/工程，引用真实20秒E196-A、关联原声和8条英语字幕，保存文字及图片水印。<br>3. 两种水印预览正常、总开关开启，已同步且无运行任务。'
 steps=['关闭水印总开关，检查两种预览消失、文字及图片替换/宽度/透明度控件禁用，已有设置保留。','依次切Media→Scripts→Captions→Voiceover→Watermark，核对仍为本工程，水印关闭且相关控件仍受限。','重新开启水印，检查文字/图片预览、原参数和编辑控件恢复。','仅将文字WM014_BASE改为WM014_EDITED并保存，切Captions再返回，检查新文字及原图片设置。','刷新重开同一工程，显式进入Watermark，核对开启状态、新文字、原图片参数/预览和原视频、字幕、音频保持；不验子页记忆。']
 expected='关闭只隐藏水印并限制其编辑控件，不删除设置；跨TAB不误开启。重新开启恢复原文字/图片及参数，修改文字只作用文字水印；切页及刷新保持最终状态，原视频/字幕/音频不串改、不自动生成或导出。原只读权限仍待覆盖。'
 row='| ERYE210-014 | P0 | '+pre+' | 输入：WM014_BASE→WM014_EDITED；既有PNG宽160px、透明度75%。<br>'+'<br>'.join(f'{i}. {s}'for i,s in enumerate(steps,1))+' | '+expected+' | Source: Requirement + Inferred QA Risk；ERYE-210 N01/N02/N05、AC02/04；用户确认现有功能替换，不代表只读权限验收 | [AUTO] | [tests/editor/erye210-watermark-toggle.spec.ts](../../../../tests/editor/erye210-watermark-toggle.spec.ts) | '+VERSION+'；Not Run；[完整用例]('+DEF+')；[原只读待覆盖]('+HISTORY+') |'
 cases=cases.replace(oldrow,row);casepath.write_text(cases,encoding='utf-8')
 prior.clear();prior.update(id='ERYE210-014',status='Not Run',caseVersion=VERSION,actual='新版定义已替换并接入唯一自动化入口，待生产Chrome执行。原只读权限仍待覆盖。',report=REPORT,deferredCoverage={'status':'待覆盖','scope':'真实只读身份浏览及写入拒绝','reason':'缺少真实只读身份与授权工程','history':HISTORY})
 current['counts']={s:sum(c['status']==s for c in current['cases'])for s in ['Passed','Failed','Blocked','Not Applicable','Not Run']};current['updated']='2026-11-16';current['automation']='56个唯一AUTO入口；014已替换为水印开关跨TAB恢复，原只读权限单列待覆盖。';write(D/'execution-status-current.json',current)
 body.update(status='AUTO',script='tests/editor/erye210-watermark-toggle.spec.ts',definition_version=VERSION,execution_status='Not Run',execution_note=prior['actual'],execution_report='docs/cases/requirements/ERYE-210/'+REPORT,deferred_readonly_coverage='待覆盖；真实只读身份及授权工程缺失；见'+HISTORY)
 reg=reg[:match.start()]+yaml.safe_dump({'ERYE210-014':body},allow_unicode=True,sort_keys=False)+reg[match.end():];regpath.write_text(reg,encoding='utf-8')
 meta=(D/'meta.yaml').read_text(encoding='utf-8');meta=re.sub(r'^automation:.*$', 'automation: {connected: 56, blocked_precondition_gates: 0, planned: 0, script: "tests/editor/erye210-*.spec.ts", definition_update: "014-v2-watermark-toggle-20261116"}',meta,flags=re.M);meta+='\ndefinition_update_014_v2: '+json.dumps({'date':'2026-11-16','version':VERSION,'status':'Not Run','definition':DEF,'report':REPORT,'readonlyCoverage':'待覆盖','history':HISTORY},ensure_ascii=False)+'\n';yaml.safe_load(meta);(D/'meta.yaml').write_text(meta,encoding='utf-8')
 text=['# ERYE210-014 v2：水印开关与跨TAB控件限制及内容恢复','','更新：2026-11-16；初始Not Run；生产环境Windows Google Chrome。以当前页面业务结果验收。','','## 前置操作','','1. 登录生产环境，有工程编辑权限；为本例新建独立项目、会话和工程，不修改已有用户工程。','2. 引用已上传的真实20秒E196-A.mp4、关联原声、8条英语字幕及有效PNG，保存文字水印WM014_BASE和图片水印（160px、75%、右上24px），作用全片。自动化只读取真实素材基线并在本例新工程保存，原基线保持。','3. 总开关开启，两种水印可预览；已同步，无运行任务。无配音生成前置，不新建译制任务。','','## 输入与提示词','','无Agent提示词；仅通过页面操作。文字WM014_BASE→WM014_EDITED，图片及其他参数不修改；不生成、不导出。','','## 执行步骤与逐步预期','']
 for i,s in enumerate(steps,1):text += [f'{i}. {s}']
 text += ['',expected,'','## 覆盖边界','','验证总开关关闭后的真实控件限制、切TAB状态保持、重新开启恢复和保存/刷新。与013无画面限制、016图片上传前置、049导出开关结果分别覆盖不同场景。普通子页记忆另由007覆盖，不将其已知失败加入014条件。','','原014只读权限检查保持待覆盖：真实只读身份下浏览五个模块、修改入口受限、实际写入拒绝。恢复前置为具有只读授权的独立身份与工程；水印关闭属于业务状态，不替代权限证据。原Blocked、旧定义、门禁实现见['+HISTORY+']('+HISTORY+')及[原报告](results-011-015-prod-20261113.md#erye210-014)。','','## 自动化与归档','','唯一入口`tests/editor/erye210-watermark-toggle.spec.ts`，执行函数`tools/editor/erye210-watermark-toggle.ts`；旧014权限门禁在注册前排除，原56个编号不增加。单worker、零重试，新批次检查点防止自动重放。','','运行命令：`npm run test:editor:210 -- --grep "ERYE210-014 "`，设置生产origin、已登录Chrome本机CDP、唯一批次及真实WATERMARK素材基线。','','[执行结果与本轮原图]('+REPORT+') · [当前进度](execution-status-current.md)。','']
 (D/DEF).write_text('\n'.join(text),encoding='utf-8');(D/REPORT).write_text('# ERYE210-014 v2 本轮执行\n\n新版已接入，当前Not Run；待生产Chrome执行，不将旧Blocked移作新结果。\n',encoding='utf-8')
 md=D/'execution-status-current.md';v=md.read_text(encoding='utf-8');v=re.sub(r'49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run','49 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 1 Not Run',v);v=re.sub(r'^\| ERYE210-014 \|.*$',lambda _:'| ERYE210-014 | Not Run | '+prior['actual']+' [记录]('+REPORT+') |',v,flags=re.M);md.write_text(v,encoding='utf-8')
 print(json.dumps({'replaced':'ERYE210-014','newStatus':'Not Run','originalReadonly':'待覆盖','counts':current['counts']},ensure_ascii=False))
if __name__=='__main__':main()
