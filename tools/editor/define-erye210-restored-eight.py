"""One-time, user-authorized restoration of six ERYE-210 points plus two new checks."""
from pathlib import Path
from collections import Counter
import json,re,yaml
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-210'
VERSION='v3-restored-six-and-navigation-20261116'
IDS=['002','007','010','013','015','040','055','056']
REPORT='results-restored-eight-production-20261116.md'
DEFINITION='case-restored-eight-production-20261116.md'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def render_current(s):
 counts=' / '.join(f"{v} {k}" for k,v in s['counts'].items())
 lines=[]
 for c in s['cases']:
  cloud=c.get('cloudDefect',{});link=f"；[云效{cloud['identifier']}]({cloud['url']})" if cloud.get('verified') else ''
  lines.append(f"| {c['id']} | {c['status']} | {c.get('actual',c.get('reason','')).replace('|','／').replace(chr(10),' ')} [记录]({c.get('report','')}){link} |")
 return '# ERYE-210 当前测试进度\n\n2026-11-16；当前有效'+str(len(s['cases']))+'条：**'+counts+'**。\n\n六条原测试点按用户要求恢复为本轮修订版，新增055/056。旧结果及云效关联保留；004/005/018/020/041仍退役。\n\n| 用例 | 当前状态 | 说明 |\n|---|---|---|\n'+'\n'.join(lines)+'\n'
def main():
 h=D/'restored-six-definition-history-20261116.json';assert not h.exists(),'Already restored: do not replay definition reset'
 cur=read(D/'execution-status-current.json');assert len(cur['cases'])==43
 old=read(D/'retired-failed-cases-20261113.json');regpath=R/'docs/cases/registry.yaml';reg=regpath.read_text(encoding='utf-8')
 write(h,{'date':'2026-11-16','authorization':'补回002/007/010/013/015/040，新增快速切TAB及模块报错后导航；生产Chrome执行并归档','priorCurrent':cur,'priorRegistry':reg,'oldRetirementSnapshot':'retired-failed-cases-20261113.json','restoredIds':IDS[:6],'newIds':IDS[6:]})
 defs={
 '002':('首次视频导入默认Media','P0','新建本轮专用项目/空会话，无该工程导航记忆；使用20秒E196-A.mp4，导入前不选任何TAB。','选择媒体导入E196-A.mp4；不发会话提示词。',['从空工程选择媒体并上传原片，等待导入完成。','在任何手动切TAB或刷新之前记录当前选中TAB、面板、目标素材及错误提示。','核对原片20秒、原声及会话结果，确认未自动转写或生成。'],'首次定位Media且显示本次原片，不出现工程创建/保存错误，不自动生成字幕或配音。手动切到Media后的结果不能覆盖首次失败。','N01/03；AC02','旧002的外部显式素材入口仍无独立样本，本轮不计覆盖。'),
 '007':('Watermark/Image关闭与刷新记忆','P0','本轮独立新工程含20秒视频、文字水印NAV006及真实图片水印，无生成任务，内容已保存。','选择水印→图片水印；不修改水印参数。',['选择Watermark→Image，记录图片预览和工程。','收起编辑区再打开同一工程，不手动切回水印，核对TAB和子页。','刷新同一标签并重开，核对Watermark、Image及图片预览。','对照工程内容和水印设置保持。'],'关闭重开及刷新均恢复Watermark/Image；内容和水印参数不变，不生成任务。','N03/09；AC02','旧voice映射及清除两种旧缓存不纳入本轮，继续延期。'),
 '010':('同账号同Chrome双工程导航隔离','P0','同账号同一Chrome同一会话准备独立PA/PB，各有20秒视频和字幕，均保存完成。','PA选择Captions，PB选择Media。',['PA选择Captions，PB选择Media。','交替选择PA/PB，核对各自导航位置。','分别选PB、PA并刷新重开，不手动修正TAB，核对各自位置。','核对两工程字幕/音视频不串改。'],'PA恢复Captions、PB恢复Media，位置各自独立；导航不改变两工程内容。','N09；AC02','仅同账号同设备；跨账号、跨设备和未提交草稿隔离继续延期。'),
 '013':('纯音频工程水印写入限制','P0','新建空工程，只导入真实A1-independent.wav，无视频画面和水印，不以静音视频代替。','文字探测值AUDIO_ONLY_013_V3；图片只检查选择入口，不无故上传。',['导入WAV后核对时间线上只有音频，依次查看五入口。','进入Watermark→Text，核对写控件禁用及无画面说明；若意外启用，在本例工程输入探测值并保存现场。','切Image核对图片选择入口受限及原因。','核对未保存文字/图片水印，原音频保持。'],'五入口及水印页可浏览；无画面时水印写操作受限且有说明，不保存无效水印，音频不被修改。','N01/02；AC04','按原需求业务限制验收；若产品改变纯音频适用规则需另行确认，不将当前写入成功自动判通过。'),
 '015':('空选区引导及选中后恢复操作','P0','本轮独立20秒视频/原声/字幕工程，无运行任务、未选择片段；只用文稿页可见的时间线分割控件，不发起分析。','分割位置约12秒，以原生进度条实际选中值为准（误差小于0.2秒）。',['进入Scripts，未选片段时查看分割按钮及提示。','确认按钮禁用且明确提示先选择片段，工程保持不变。','选中唯一视频片段，将播放头定位约12秒，核对按钮恢复可用并分割一次。','核对两段仍来自原片、总长20秒，撤销一次恢复。'],'空选区不默认处理全片，明确引导选择；选中后可分割，原声与画面保持，总长不变；一次撤销恢复。','N02；AC04','不把时间线分割当作逐字稿文字选区清理已覆盖。'),
 '040':('删除重叠独立音频不裁原视频','P0','本轮独立20秒视频/关联原声/8条英语字幕；原生导入真实A1-independent.wav，并加在约14秒处，整个音频落在视频范围内。','仅选择独立WAV片段，一次Delete；随后一次撤销。',['记录重叠音频、原视频/原声/字幕及20秒总长。','仅选独立WAV片段，Delete一次并等待已同步。','核对目标音频消失，视频/原声/字幕及20秒总长保持；保存删除后原生现场。','点击一次撤销，核对同一音频文件/位置恢复，其他内容不变。'],'只删除独立音频引用，不裁同时间范围原视频/原声，不改字幕和总时长；一次撤销恢复原音频。','N06；AC07','与019音频放在22秒、045音频放在20秒之后不同，本例必须与原视频时间重叠。'),
 '055':('快速切换TAB后的最终面板一致','P1','本轮独立新工程有20秒视频、字幕、文字及图片水印，无运行任务和未保存修改。','连续3轮Scripts→Captions→Voiceover→Media→Watermark，最后选Image；不发提示词/生成。',['从Captions开始，连续执行3轮TAB切换，过程中不逐页等待业务内容加载。','最后选Watermark→Image，等待正常加载。','连续观察最终入口、图片面板及工程标识，确认没有被之前加载的旧面板覆盖。','核对全部内容及导航期间写操作。'],'最终始终是同一工程Watermark/Image，只有一个TAB选中，无旧面板覆盖或白屏；不自动生成、保存修改或串改内容。','N01；AC01/02；Inferred QA Risk','与001普通逐页可达、008收起展开区分，只验证快速切换后的异步界面一致性。'),
 '056':('真实模块错误后其他TAB导航可用','P0','本轮独立新工程含原片、字幕及两类水印；以当前已知原生导出错误准备真实报错现场。只能提交一次原导出，不能伪造错误或拦截响应制造页面错误。','点击一次原生Export；随后依次进入Media、Captions、Watermark。',['记录工程基线和提交前检查点，点击一次Export，记录原任务及真实错误。','错误形成后保存现场，直接切Media，核对同一工程及媒体面板可用。','切Captions查看原字幕，切Watermark确认原文字可操作、两类设置保持。','核对没有新建工程、重复导出或丢失已保存内容。'],'真实模块错误不阻断其他TAB；原工程/字幕/音视频/水印保持。只验错误后的导航隔离，不把原导出错误判为已修复。','N01/02/08；AC02/09；Inferred QA Risk','若本次未形成真实错误，记前置未形成并保留原任务，不重复导出、不伪造错误。')}
 rows=[];details=['# ERYE210 六条恢复及两条导航补充用例（2026-11-16）','','用户授权恢复六个原测试点，保留原编号和失败/云效历史；新增055/056。全部按生产Windows Google Chrome、页面业务结果验收。定义时初始Not Run，实际状态见执行报告；不因新范围通过覆盖旧延期分支。','','当前有效51条（原43+恢复6+新增2），历史仍退役004/005/018/020/041共5条。','']
 for cid,(title,priority,pre,inputs,steps,expected,source,boundary) in defs.items():
  steps_text='<br>'.join(f'{i}. {s}' for i,s in enumerate(steps,1))
  rows.append(f'| ERYE210-{cid} | {priority} | {pre} | 输入：{inputs}<br>{steps_text} | {expected} | Source: Requirement'+(' + Inferred QA Risk' if cid in ['055','056'] else '')+f'；ERYE-210 {source} | [AUTO] | [tests/editor/erye210-restored-eight.spec.ts](../../../../tests/editor/erye210-restored-eight.spec.ts) | {VERSION}；Not Run；{boundary}；[完整用例]({DEFINITION}#erye210-{cid}) |')
  details += [f'## ERYE210-{cid}', '',f'**{title}**', '',f'**前置操作**：{pre}', '',f'**输入**：{inputs}', '',*['%s. %s'%(i,s) for i,s in enumerate(steps,1)],'',f'**预期**：{expected}', '',f'**覆盖边界**：{boundary}', '']
  record={'id':'ERYE210-'+cid,'status':'Not Run','caseVersion':VERSION,'actual':'本轮定义已恢复/新增，待生产Chrome真实执行。','report':REPORT}
  if cid in IDS[:6]:
   prior=next(c for c in old['original_execution'] if c['id']==record['id']);record['historicalDefect']=prior.get('defect',{})
   block=yaml.safe_load(old['original_registry'][record['id']])[record['id']]
  else:block={}
  block.update(status='AUTO',script='tests/editor/erye210-restored-eight.spec.ts',definition_version=VERSION,execution_status='Not Run',execution_note='本轮恢复/新增，待生产Chrome执行。',execution_report='docs/cases/requirements/ERYE-210/'+REPORT)
  reg+='\n'+record['id']+':\n'+yaml.safe_dump(block,allow_unicode=True,sort_keys=False,default_flow_style=False).replace('\n','\n  ').rstrip()+'\n'
  # Indent the first field as well as subsequent fields.
  reg=reg.replace('\n'+record['id']+':\nstatus:', '\n'+record['id']+':\n  status:')
  cur['cases'].append(record)
 details += ['## 自动化','','唯一入口：`tests/editor/erye210-restored-eight.spec.ts`，执行函数：`tools/editor/erye210-restored-eight.ts`。串行、零重试，原生截图；目标操作全部从页面完成。原始工程/带签名地址保留本机reports，正式证据脱敏。','',f'[执行结果与失败截图]({REPORT}) · [当前进度](execution-status-current.md)。','']
 (D/DEFINITION).write_text('\n'.join(details),encoding='utf-8')
 cases=(D/'cases.md').read_text(encoding='utf-8');cases+='\n## 2026-11-16 补回测试点与新增导航检查\n\n| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |\n|---|---|---|---|---|---|---|---|---|\n'+'\n'.join(rows)+'\n';(D/'cases.md').write_text(cases,encoding='utf-8')
 assert len(yaml.safe_load(reg))>=51;regpath.write_text(reg,encoding='utf-8')
 cur['cases'].sort(key=lambda c:c['id']);cur['counts']={s:sum(c['status']==s for c in cur['cases']) for s in ['Passed','Failed','Blocked','Not Applicable','Not Run']};cur['updated']='2026-11-16';cur['definitionNote']='恢复002/007/010/013/015/040并新增055/056，51条；仅另外5条仍退役，旧失败/缺陷及延期分支保留。';cur['automation']='51个唯一脚本入口：50 AUTO、014 BLOCKED；本轮8条定义已接入，待生产Chrome执行。';write(D/'execution-status-current.json',cur);(D/'execution-status-current.md').write_text(render_current(cur),encoding='utf-8')
 meta=(D/'meta.yaml').read_text(encoding='utf-8').replace('active_case_count: 43','active_case_count: 51').replace('retired_case_count: 11','retired_case_count: 5');meta+='\ndefinition_update_restored_eight_20261116: '+json.dumps({'version':VERSION,'restored':IDS[:6],'new':IDS[6:],'status':'Not Run','definition':DEFINITION,'report':REPORT},ensure_ascii=False)+'\n';(D/'meta.yaml').write_text(meta,encoding='utf-8')
 agent=R/'AGENTS.md';text=agent.read_text(encoding='utf-8');first,sep,rest=text.partition('\n');agent.write_text(first+sep+'\n<!-- ERYE210-RESTORED8-20261116 -->\n2026-11-16用户最新授权补回002/007/010/013/015/040，新增055/056，独立新工程生产Chrome执行。当前51有效、5退役；原11条退役是历史，不能据旧条款排除本轮6条。新8条唯一注册restored-eight.spec.ts；旧实现由isSupersededLegacy210排除，不重复注册。旧失败/云效关联保留；010仅同账号同Chrome，007旧映射和002外部入口仍延期，014保持原Blocked。\n<!-- /ERYE210-RESTORED8-20261116 -->\n\n'+rest,encoding='utf-8')
 print(json.dumps({'active':len(cur['cases']),'counts':cur['counts'],'newDefinition':DEFINITION},ensure_ascii=False))
if __name__=='__main__':main()
