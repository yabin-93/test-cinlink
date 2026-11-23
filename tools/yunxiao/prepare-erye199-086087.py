"""Prepare current-batch merged defects from completed, sanitized evidence."""
from pathlib import Path
import json, hashlib, shutil, re

R=Path(__file__).resolve().parents[2]
D=R/'docs/cases/requirements/ERYE-199'
EV=D/'evidence-086-090-production-20261119'
RUN=R/'reports/erye199-086-090-production-20261119'
OUT=R/'reports/yunxiao/erye199-086087-production-20261119-input'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
state=read(RUN/'execution.json')
assert state['stage']=='Completed' and state['browserFinishedAt']
assert not OUT.exists(), 'Inspect existing preparation instead of overwriting'
failed={k:v for k,v in state['cases'].items()if v['status']=='Failed'}
assert len(failed)==8

def prepare(group,key,title,body,keys,images,fixtures):
    assert not (R/'reports/yunxiao'/key/'checkpoint.json').exists()
    folder=OUT/group;folder.mkdir(parents=True)
    image_entries=[]
    for source,caption in images:
        dest=folder/(source.parent.name+'-'+source.name)
        shutil.copy2(source,dest)
        image_entries.append(dict(path=dest.name,caption=caption,sha256=sha(dest)))
    evidence=[]
    fields=['key','id','profile','operation','status','runId','conversationId','editorId','target','destinationTrackId','splitSelection','prompt','card','language','subtitle_mode','source_sha256','operation-before','cross-after','followup-move-before','operation-after','undo-cross','redo-cross','undo-restores-baseline','redo-restores-edit']
    for k in keys:
        v=read(EV/k/'verification.json')
        assert v['status']=='Failed'
        evidence.append({**{f:v[f]for f in fields if f in v},'failed_checks':[c for c in v['checks']if not c['passed']]})
    summary={'date':'2026-11-19','environment':'production','workspace_id':state['workspaceId'],'expected':'仅视频和原生BGM双向联动；字幕、原声、译声、普通导入音频保持独立。','variants':evidence}
    content=json.dumps(summary,ensure_ascii=False,indent=2)+'\n'
    assert not re.search(r'https?://|X-Amz-|AccessKey|Signature=|access_token|C:\\Users',content,re.I)
    (folder/'evidence-summary.json').write_text(content,encoding='utf-8')
    attachments=[]
    media=read(RUN/'media.json')
    for f in fixtures:
        src=Path(media[f]['path']);dest=folder/src.name
        assert sha(src)==media[f]['sha256']
        shutil.copy2(src,dest);attachments.append(dict(path=dest.name,sha256=sha(dest)))
    attachments.append(dict(path='evidence-summary.json',sha256=sha(folder/'evidence-summary.json')))
    (folder/'description.md').write_text(body,encoding='utf-8')
    plan=dict(key=key,subject=title,descriptionPath='description.md',fields={'labels':['4059c63d8703784388875ab6ca'],'priority':'5341ff22ce75040255752bb465','seriousLevel':'91721612f43903f6a1a438ba98'},images=image_entries,attachments=attachments)
    (folder/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(dict(group=group,images=len(image_entries),attachments=len(image_entries)+len(attachments))))

rows=[]
for profile in ['T1','T2','E','C','H','G']:
    entry=next(v for v in failed.values()if v['profile']==profile);definition=entry['definition']
    param={'T1':'配音和字幕 / 简体中文 / 译文，F20','T2':'配音和字幕 / 简体中文 / 双语，F20','E':'2倍，F20','C':'默认，F60','H':'30秒，F60','G':'5秒 / 16:9，不附加视频'}[profile]
    rows.append(f'| {profile} {definition["card"]} | {param} | {definition["prompt"]} |')

cross='''**现象**

视频跨到新视频轨后，原声行也被移动或重排；随后将视频右移1秒，原声也被错误右移。刷新重开后仍保留错误。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限和充足测试积分。
2. 新建测试项目和独立会话，准备附件F20英文原片（20秒，1280×720，30fps）；走翻译配音、配音和字幕、简体中文、译文生成并打开本轮结果工程。
3. 确认时间轴字幕、视频、原声、译声和原生BGM已加载，视频、原声和BGM均为0～20秒，未做编辑。

**提示词**

主复现指令：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`

其他实际复现入口如下，各自在独立新会话一次提交完整指令，不引用前轮产物：

| 入口 | 页面参数与素材 | 完整提示词 |
|---|---|---|
'''+ '\n'.join(rows)+'''

跨轨和平移均为页面操作，无额外Agent提示词。

**复现步骤**

1. 创建新会话，选择翻译配音卡片及上述T1参数，附加F20并发送完整指令，完成后点击该轮“进入编辑器”，展开时间轴。
2. 记录原声、译声、字幕和原生BGM的行位置及片段起止时间；仅抓住视频片段主体，保持横向位置，将它拖到轨道下方空白处，自动建立新视频轨，避免拖边缘或播放头。
3. 核对视频仅有一个实例、新轨仍为视频轨；检查原声行是否也跟随换位，原生BGM是否仍在音频轨，字幕与译声是否保持。
4. 撤销跨轨，确认回到基线；重做并刷新重开，检查行位置保存结果。
5. 在新视频轨抓住视频主体向右平移1秒，核对视频、BGM及原声起止时间；撤销应恢复平移前，重做并刷新重开核对保存结果。
6. T2/E/C/H/G分别使用独立未编辑工程按同法核验；C/H选择不少于4秒的实际片段，保持该片段原起点跨轨，再右移1秒。C/H方案审核时确认执行，H目标在审核页调整至30秒；无需添加额外提示词。

**实际结果**

- T1/T2/C/H：跨轨后原声行随视频换位或重排；T1原行序“字幕、视频、原声、译声、BGM”变成“字幕、译声、BGM、视频、原声”，跨轨时原声时段仍为0～20秒。
- 六个入口跨轨后再平移视频，原声都被连带平移；T1中视频/BGM由0～20变为1～21秒，原声也错误变为1～21秒。E/G仅在这一步观察到错误，跨轨本身未误改原声。
- 撤销可恢复，重做和刷新重开保留错误；字幕、译声未随视频平移。C/H具体分段及源入出点见附件，不按整段0～20秒推定。

**预期结果**

视频跨轨仅改变目标视频所在轨，原生BGM保持音频类型及其关联关系；原声行、字幕、译声等非目标轨的行序、内容和时间保持。换轨后平移视频仅按规则联动原生BGM，原声不得移动。撤销、重做和重开应保持正确结果。

**影响**

跨轨整理视频会打乱非目标原声行，后续精剪还会改变原声时间位置，破坏用户声音安排并将错误保存至工程。

**补充**

关联ERYE199-086，合并T1/T2/E/C/H/G相同现象。S0/S1本轮通过，不归入失败。业务现象与FWXC-699原声误联动相关，本条补充跨视频轨及跨轨后关联保持场景，保留历史缺陷不修改；不推断内部根因。
所有输入和本轮结果对应已核验，无素材串用；已知译文预览显示差异不纳入本条。原始run、会话、工程标识及前后片段记录见evidence-summary.json。

**失败截图**

__SCREENSHOTS__
'''
cross_keys=[k for k in failed if k.startswith('086-')]
cross_images=[(EV/'086-T1-cross-video'/'baseline-verified.png','T1：跨轨前五轨基线，原声位于视频之后。'),(EV/'086-T1-cross-video'/'cross-failure.png','T1：跨轨后原声行也随视频换位。')]
cross_images += [(EV/k/('failure-preview-supplement.png'if '-C-'in k else'failure-after-reopen.png'),k+'：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。')for k in cross_keys]
prepare('cross-video','ERYE199-086-CROSS-VIDEO-ORIGINAL-AUDIO-COUPLING-PROD-20261119','【生产环境】视频跨轨误改原声行，换轨后平移仍连带原声',cross,cross_keys,cross_images,['F20','F60'])

split='''**现象**

只选中普通导入的独立音频D进行分割，视频、原声和任务自带BGM也被一起分割；译文与双语两种翻译配音工程均复现。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限和充足测试积分。
2. 新建测试项目、独立会话，用附件F20原片（20秒，1280×720，30fps）完成翻译配音、配音和字幕、简体中文、译文，打开未编辑的原生五轨工程。
3. 准备附件D-independent-audio-12s.wav（12秒、48kHz），作为普通独立音频导入，不替代任务原生BGM、原声或译声。

**提示词**

T1译文：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`

T2双语：在另一个新会话选择“简体中文 / 双语”，一次发送：`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

导入和分割均为页面操作，无额外Agent提示词。

**复现步骤**

1. 在独立新会话选择翻译配音卡片、T1参数并附加F20，发送完整指令，完成后从该轮结果进入编辑器，确认字幕、视频、原声、译声、BGM五轨加载完毕。
2. 通过“媒体→导入素材”登记附件D，放入独立音频轨，设置时间轴6～18秒（源0～12秒），确认只放入一个实例，原有五轨不变。
3. 将播放头定位到12秒，单击D片段主体，只选中D；确认视频、原声和原生BGM均未被选中，“分割所选片段”可用。
4. 点击“分割所选片段”，逐一核对D、视频、原声、BGM的片段数量和起止时间。
5. 撤销分割确认恢复，再重做；刷新并从该轮结果重开工程，核对分割结果是否保留。
6. 另建独立会话用T2双语参数重复以上步骤，不复用已编辑工程。

**实际结果**

- T1/T2均只选中独立D，D正确分成时间轴6～12和12～18秒，对应源0～6和6～12秒。
- 原本各一段0～20秒的视频、原声、原生BGM也错误地在12秒拆成0～12、12～20秒两段；字幕和译声保持。
- 撤销恢复，重做及刷新重开保留误分割。D源绑定及分割点两侧播放推进核验通过，并非D替换成原声或BGM。

**预期结果**

只分割选中的普通独立音频D，其他所有轨道保持原片段数量、时间和源范围；视频与原生BGM的双向联动组不能被独立D操作触发。保存重开结果应一致。

**影响**

用户编辑额外配音或独立音频时，未选中的视频及声音被意外切碎，污染工程剪辑结构。

**补充**

关联ERYE199-087，T1译文和T2双语合并本条。两种模式均有选中D的原图；T2还记录了仅一个选中对象且对应D轨，不是多选分割。只按页面业务结果验收，不推断内部实现。真实run、会话、工程标识、独立D源绑定和前后片段信息见evidence-summary.json。

**失败截图**

__SCREENSHOTS__
'''
split_keys=[k for k in failed if k.startswith('087-')]
split_images=[(EV/'087-T1-split'/'D-placed.png','T1：D作为独立音频放入6～18秒，原五轨未分割。'),(RUN/'087-T1-split'/'preview-12.png','T1：12秒处仅独立D有选中边框，分割前状态。'),(EV/'087-T2-split'/'before-split-selected-D.png','T2：12秒处仅独立D选中，视频与原生BGM未选中。')]
split_images += [(EV/k/'failure-after-reopen.png',k+'：分割D后，视频、原声及原生BGM也被分割，重开仍保留。')for k in split_keys]
prepare('audio-split','ERYE199-087-INDEPENDENT-AUDIO-SPLIT-CROSSTRACK-PROD-20261119','【生产环境】仅分割独立音频却同时拆分未选中的视频、原声和BGM',split,split_keys,split_images,['F20','D'])
