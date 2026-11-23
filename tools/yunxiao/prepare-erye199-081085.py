"""Prepare two merged, evidence-backed defects from the completed native batch."""
from pathlib import Path
import json,hashlib,shutil
R=Path(__file__).resolve().parents[2];D=R/'docs/cases/requirements/ERYE-199'
EV=D/'evidence-081-085-production-20261118';RUN=R/'reports/erye199-081-085-production-20261118'
O=R/'reports/yunxiao/erye199-081083084085-production-20261119-input'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
write=lambda p,d:p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
state=read(RUN/'execution.json');batch=read(D/'execution-status-081-085-production-20261118.json')
assert state['stage']=='Completed' and state.get('browserFinishedAt')
selected={c['id']for c in batch['cases']if c['status']=='Failed'}
assert selected=={'ERYE199-081','ERYE199-083','ERYE199-084','ERYE199-085'}
variants=[v for c in batch['cases']for v in c['variants']if v['status']=='Failed']
audio=[v for v in variants if v['key']!='083-T2-split'];assert len(audio)==24
assert not O.exists(),'Existing preparation/checkpoints must be inspected rather than overwritten'
O.mkdir(parents=True)
media=read(RUN/'media.json')
op_names={'music-identity':'原生BGM右移1秒','split':'视频分割','move':'视频主体右移1秒','trim-head':'视频裁头0.5秒','trim-tail':'视频裁尾0.5秒'}
def prepare(name,key,subject,description,entries,baseline,fixtures,fields):
 out=O/name;out.mkdir();assert not(R/'reports/yunxiao'/key/'checkpoint.json').exists()
 images=[]
 for variant,filename,caption in baseline+[(v['key'],'failure-after-reopen.png',v['key']+'：'+op_names[state['cases'][v['key']]['operation']]+'后，原声被误联动；重开后错误保留。')for v in entries if v['key']!='083-T2-split']:
  source=EV/variant/filename;dest=out/(variant+'-'+filename);shutil.copy2(source,dest)
  images.append({'path':dest.name,'caption':caption,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
 evidence={'date':'2026-11-18~19','environment':'production','case_ids':sorted({state['cases'][v['key']]['id']for v in entries}),'business_expected':'视频与原生BGM双向联动；字幕、原声、译声及普通导入音频保持，不加入关联组。','variants':entries,'source_mapping_audit':read(EV/'source-audit.json')}
 write(out/'evidence-summary.json',evidence)
 attachments=[]
 for fixture in fixtures:
  source=Path(media[fixture]['path']);dest=out/source.name;shutil.copy2(source,dest)
  attachments.append({'path':dest.name,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
 attachments.append({'path':'evidence-summary.json','sha256':hashlib.sha256((out/'evidence-summary.json').read_bytes()).hexdigest()})
 (out/'description.md').write_text(description,encoding='utf-8')
 write(out/'plan.json',{'key':key,'subject':subject,'descriptionPath':'description.md','fields':{'labels':['4059c63d8703784388875ab6ca'],**fields},'images':images,'attachments':attachments})
 print(json.dumps({'key':key,'images':len(images),'attachments':len(images)+len(attachments),'plan':str(out/'plan.json')}))

prompt_rows=[]
for profile in ['T1','T2','E','C','H','G']:
 e=next(e for e in state['cases'].values()if e['profile']==profile);d=e['definition']
 params=' / '.join(x for x in [d.get('language'),d.get('mode'),'2倍'if profile=='E'else'30秒'if profile=='H'else'5秒、16:9'if profile=='G'else'']if x)
 prompt_rows.append(f'| {profile} {d["card"]} | {params or "默认"} | {d["prompt"]} |')
audio_description='''**现象**

编辑器仅操作视频或原生BGM时，原声也被连带平移、分割或裁剪；刷新重开后仍保留错误。将ERYE199-081、083、084、085中的同类失败合为本缺陷。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限且测试积分充足。
2. 新建专用项目；每个操作使用独立会话和未编辑的原生工程，选附件F20原片（20秒、1280×720、30fps）完成“翻译配音 / 配音和字幕 / 简体中文 / 译文”，确认有字幕、视频、原声、配音和原生背景音乐。
3. 081另备附件12秒独立音频D及音乐B；通过“媒体→导入素材”登记后分别放入新音频轨6～18秒和2～14秒，与任务原生BGM区分。

**提示词**

四条用例的最短准备路径均可用T1：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`

本批实际复现的其他卡片准备指令如下；E使用F20，C/H使用附件60秒F60，G不附加视频。完整提示词一次发送，不引用旧产物。

| 场景/卡片 | 页面参数 | 完整提示词 |
|---|---|---|
'''+ '\n'.join(prompt_rows)+'''

正式平移、分割和裁剪均为页面操作，无额外Agent提示词。

**复现步骤**

1. 在新会话选择上述卡片和参数，附加对应原片并发送一次完整提示词，等待完成，从本轮结果点击“进入编辑器”，展开时间轴。C/H出现方案审核时核对并确认；H基线不足30秒时在审核页调整末段至30秒再确认。本批未出现需填写的补槽。
2. 081：导入并放入D、B，先将普通音乐B由2～14秒移到3～15秒，核对其他轨不动，再撤销；随后将任务自带BGM由0～20秒右移到1～21秒，核对视频、原声、译声、字幕及B/D位置。
3. 083：用另一未编辑工程，选中0～20秒视频，把播放头放在10秒，点击“分割所选片段”，核对视频、原生BGM和原声各有几段。
4. 084：用另一未编辑工程，抓视频主体向右平移1秒，核对视频、原生BGM和原声的起止时间，避免抓到边缘或制造同轨重叠。
5. 085：分别用未编辑工程将视频左边缘向右裁0.5秒、右边缘向左裁0.5秒，核对原声是否被同时裁减；左、右边缘分开核验，不连续叠加操作。
6. 各操作后检查非目标轨；点击撤销应回到该操作前，重做再现编辑，再刷新并从该轮结果重开，核对错误是否仍存在。其他卡片按同法分别验证，不在有错误基线的工程继续做依赖操作。

**实际结果**

| 用例/操作 | T1代表性实测结果 |
|---|---|
| 081，移动原生BGM | BGM和视频从0～20变1～21秒时，原声也变1～21秒；独立B/D及字幕、译声保持。 |
| 083，在10秒分割视频 | 视频、BGM拆成0～10和10～20秒，原声也被错误拆成相同两段。 |
| 084，视频主体右移1秒 | 视频、BGM变1～21秒，原声也从0～20变1～21秒。 |
| 085，视频左右裁边 | 裁头时原声入点和开始位置也增加约0.5秒；裁尾时原声出点也减少约0.5秒。 |

对应24个失败变体均有操作后及重开证据。撤销可恢复，重做及刷新保留错误。不同工程的具体分段、时码及run/会话/工程标识在附件evidence-summary.json；仅把原声的错误联动判失败。

**预期结果**

视频仅与原生BGM按已确认规则双向联动；对任一方的移动、分割和裁边不改变原声、译声、字幕和普通导入B/D。无原生BGM的工程仅修改目标视频；非目标片段的时间、源范围保持。保存重开应保留正确结果。

**影响**

常用视频编辑会误改原声时间及源范围，破坏用户已安排的声音位置；影响译配、增强、去口水词、高光及生成视频的后续精剪。

**补充**

对应081的1个、083的5个、084的6个、085的12个失败变体，按同一业务现象合并，不推断内部代码根因。083-T2因额外字幕轨导致基线不符，未执行分割，单列另一缺陷。
原片/本轮产物对应核验均正确。071已知译文预览问题FWXC-693保留，不纳入本条；原声轨是否静音不改变其应保持原位置的预期。

**失败截图**

__SCREENSHOTS__
'''
prepare('audio-coupling','ERYE199-081083084085-ORIGINAL-AUDIO-COUPLING-PROD-20261119',
 '【生产环境】视频或原生BGM平移、分割及裁边误带原声，刷新后保留错误',audio_description,audio,
 [('081-T1','B-placed.png','081：普通导入音乐B和独立音频D放入后的基线。'),('083-T1-split','baseline-verified.png','083：分割前原生五轨及完整原声基线。'),('084-T1-move','baseline-verified.png','084：视频主体平移前基线。'),('085-T1-trim-head','baseline-verified.png','085：裁头前基线。'),('085-T1-trim-tail','baseline-verified.png','085：裁尾前基线。')],
 ['F20','F60','D','B'],{'priority':'5341ff22ce75040255752bb465','seriousLevel':'91721612f43903f6a1a438ba98'})

t2=next(v for v in variants if v['key']=='083-T2-split')
extra_description=f'''**现象**

新会话直接完成双语翻译配音后，编辑器出现中文和英文两条字幕轨，总计6轨，未按约定以一条译文字幕轨的双语模式显示；ERYE199-083在原生基线核验阶段失败。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限且积分充足。
2. 新建专用项目及独立新会话，使用附件20秒英语F20原片（1280×720、30fps，无烧录字幕）。
3. 本会话此前未生成字幕或配音；选择“翻译配音 / 配音和字幕 / 简体中文 / 双语”，仅附加原片，不选择历史产物。

**提示词**

`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

**复现步骤**

1. 首页进入翻译配音卡片，按前置设置参数，上传附件F20原片，一次发送上述完整提示词。
2. 等待任务完成；本轮无补槽、未发送第二轮任务。
3. 从本轮结果点击“进入编辑器”，展开时间轴，逐一核对轨道名称和字幕内容。
4. 查看两条“译文字幕”中的文字，确认一条中文、一条英文，连同视频、原声、配音和背景音乐共6轨。
5. 返回并重开本轮工程，确认显示结构。本次因原生基线已不符合预期，未执行后续分割、对应撤销重做及编辑后保存步骤。

**实际结果**

任务已完成；原生编辑页有两条“译文字幕”（中文和英文）、视频、原声、配音及背景音乐，共6轨。两个字幕轨已在失败原图中显示。原视频来源正确，不将其判为视频串用。

**预期结果**

双语模式为译文字幕、视频、BGM、原声、译声共5类轨道，中英通过同一字幕轨的双语模式展示；不另建或残留一条英文字幕轨。

**影响**

生成后轨道结构不符合字幕模式，增加字幕编辑和显隐歧义，并使后续分割场景无法按五轨前置继续验收。

**补充**

关联ERYE199-083/T2，实测2026-11-18。会话：{t2['conversation_id']}；run：{t2['run_id']}；工程：{t2['editor_id']}。
FWXC-694记录同会话多轮切换后多出英文字幕轨；本条为独立新会话首轮直接双语译配的复现，旧缺陷保持。原始参数截图、失败截图及精简证据随附；不声称所有双语任务均复现，也不把后续未执行的分割记为失败。

**失败截图**

__SCREENSHOTS__
'''
prepare('extra-subtitle','ERYE199-083-BILINGUAL-EXTRA-SUBTITLE-TRACK-PROD-20261119',
 '【生产环境】新会话直接双语翻译配音后多出英文字幕轨，编辑器实际6轨',extra_description,[t2],
 [('083-T2-split','before-submit.png','083-T2：首轮仅附加F20原片，目标简体中文、字幕模式双语的提交参数。'),('083-T2-split','failure.png','083-T2：中文和英文各占一条字幕轨，连同视频和三类声音共6轨，预期5类轨道。')],
 ['F20'],{'priority':'0302d601f492838ff405113d00','seriousLevel':'b68befd018ae163c4165329608'})
