# ERYE-199 九条当前功能v2生产执行结果

<!-- ERYE199-017053-V2-YUNXIAO-20261116 -->
ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。 [同步明细](defects-017-053-v2-production-20261116.md)。此前未云效写入指测试执行阶段。
<!-- /ERYE199-017053-V2-YUNXIAO-20261116 -->


2026-11-16。使用Ego Lite有头浏览器、生产环境，逐例新建9个独立项目/会话/工程；复用原始测试文件，不复用已编辑工程。5条Agent指令各提交一次，无补槽表单、无已受理重发；051/052/053/045均为原生页面操作。无computer-use或云效写入。
本批：{"Passed": 6, "Failed": 2, "Blocked": 1, "Not Applicable": 0, "Not Run": 0}。当前63条：{"Passed": 31, "Failed": 8, "Blocked": 2, "Not Applicable": 22, "Not Run": 0}。

| 用例 | 当前目标 | 结果 | 实际结果 |
|---|---|---|---|
| [ERYE199-011](#erye199-011) | 关联音视频整体移动与独立配乐隔离 | Passed | A及已有关联原声从0～10移至2～12秒；M源0～2秒/时间线8～10秒/30%不变，空档与原片映射、实际播放和刷新正确。 |
| [ERYE199-013](#erye199-013) | 固定时间字幕在视频慢放后的时间与内容隔离 | Passed | 视频/关联原声0.5倍速20秒，Fixed A1～3秒和Fixed B6～8秒未拉伸；2/7秒字幕及源画面正确、4/14秒空字幕，刷新保持。 |
| [ERYE199-017](#erye199-017) | 同源普通实例裁剪隔离与间隙保留 | Failed | 仅裁短A后，B和关联原声B被自动从5秒移到3秒，3～5秒空隙被闭合；4秒已播放B源1秒，7秒为B源4秒，刷新后仍错误。A/B源引用未串换，失败点是B被连带移动。 |
| [ERYE199-020](#erye199-020) | 非零播放位置设置静态参数后整段一致 | Passed | 播放头5秒提交静态50%后，1/5/9秒均同一作用范围，跨4～6秒无额外动画；源/背景/原声未改、刷新保持。 |
| [ERYE199-045](#erye199-045) | 手动分段压低配乐及对白/前后段隔离 | Passed | 页面仅将M2（3～7秒）从50%调至15%，M1/M3仍50%、独立对白100%，源范围与片段边界未改；实际混音采样、刷新保持及恢复50%通过。 |
| [ERYE199-051](#erye199-051) | 导入受支持媒体新建工程并隔离旧工程 | Blocked | 工程下拉加载完成后没有“工程管理／导入媒体新建工程”入口；PA已准备，B导入及PA/PB隔离未执行，按新版明确前置记Blocked。 |
| [ERYE199-052](#erye199-052) | 同名不同内容素材导入后的引用隔离 | Passed | 同名same.mp4的A/B为不同源引用；B独立新轨0～10秒、原声静音，显示B/隐藏后A的画面对照及刷新保持，A未被同名导入重绑定。 |
| [ERYE199-053](#erye199-053) | 异常SRT原生导入失败保护与编辑恢复 | Failed | 空SRT登记后放入字幕轨，未给出无有效字幕提示并持久化一条bindings为空的字幕轨；非法时码SRT被“Subtitle block has no timing”正确拒绝。原A/B字幕保留，后续RECOVER053编辑和刷新通过；整例因空SRT分支Failed。 |
| [ERYE199-055](#erye199-055) | 相对编辑完成后导航和刷新不重复应用 | Passed | 一次相对降6dB后约50.12%，切面板/两次刷新/离开重开仍约50%而非重复降为25%；原片/原声/位置与源范围保持。 |

失败017是A裁剪引发B及其原声的位置连带变化，源文件引用未串换；053仅空SRT分支失败，非法时码拒绝和后续合法编辑恢复通过。051按定义规定的生产入口前置缺口记Blocked，不判聊天上传或API新建可代替。原25P/6F/1B和22NA未重跑。

## 自动化与执行边界

8条（011/013/017/020/051/052/053/055）接入tools/editor/erye199/cases-current-v2.mjs，默认运行新版，旧能力探测不再作为这些ID的实现。045仍遵循021～050暂不接自动化的原授权，以页面手动拖动音量线及播放采样执行。源码中存在的导入入口与本次生产是否发布分别记录，不以源代码推断通过。
```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011,013,017,020,051-053,055
```
执行中修正了脚本的两处操作：020在5秒播放头遮挡处改为点击片段可见位置；052隐藏顶层后改读实际可见视频的呈现帧。053明确区分“文件登记到素材库”和“拖入字幕轨触发解析”，并继续同一工程完成两种输入与恢复编辑。这些准备/操作问题未记产品失败，未重新发送Agent或重复新建工程。
<a id="erye199-011"></a>

## ERYE199-011 关联音视频整体移动与独立配乐隔离

**结果：Passed。** A及已有关联原声从0～10移至2～12秒；M源0～2秒/时间线8～10秒/30%不变，空档与原片映射、实际播放和刷新正确。
新项目：721f24d3-ccc9-4958-8b4b-a218e920e73c；会话：90d0a878-adfc-414f-b06a-500c663ade24；工程：007fcb59-6b71-416b-9c6a-bfbda2035fa0。

**前置操作**

1. 生产环境新建独立工程，画布640×360/30fps；视频A及其真实关联原声均为源/时间线0～10秒、1倍速。
2. 另放入独立音乐M，源0～2秒、时间线8～10秒、音量30%；M未关联视频A，记录A视频/关联原声/M的真实轨道和片段标识。
3. 保存并确认0～10秒可播放，页面选中A；本例无字幕、无其他视频。

**实际提示词 / 页面入口**
```text
只编辑当前工程“ERYE199-011-nine-v2-20261116”（工程ID：007fcb59-6b71-416b-9c6a-bfbda2035fa0），不新建工程、不生成替代视频。将视频A（轨道2a5a5ce7-7dc2-4a1c-8b36-9600d7635869、片段1809c4d0-8e94-4b6b-a119-0aefebd2b2ef）及它已有的关联原声（轨道4953daed-ec7e-43d9-a204-16e63a443436、片段d344a3bf-7983-44c1-b560-f158b7bcef88）整体向右移动2秒，从时间线0～10秒改为2～12秒；保持二者源0～10秒、1倍速和原文件引用。独立音乐M（轨道3d645dc2-88c0-4292-8642-a8edf012f89d、片段883fdba2-6b9c-4a00-80a5-0a275113bbfd）保持时间线8～10秒、源0～2秒、30%音量。不要移动M，不开启同步锁，不新增/删除片段，请执行当前已支持的关联音视频移动。
```

**执行步骤及预期**

1. 记录A/原声0～10秒、M8～10秒基线与三条轨道；一次提交上述完整指令。
2. 沿原任务等待，遇补槽填A及已有关联原声、右移2秒、M保持8秒；不要另发相同任务。
3. 在1秒查看视频空档，在3秒核对为A源1秒；确认A和关联原声均2～12秒，M仍8～10秒。
4. 刷新同一工程，再核对三者起止时间、原片/音乐引用和音量。
预期：A及关联原声只移动2秒，源范围和速度不变；前方0～2秒是视频空档，3秒画面对应该源1秒。；M的源范围、8秒起点及30%音量不变，不因A移动自动推移；刷新保持，片段不重复、不生成替代文件。

**保留延期范围**：真正的轨道同步锁、插入时自动推移及锁定策略；普通关联移动不等于同步锁。
[脱敏业务回读](evidence-nine-v2-production-20261116/011/business-summary.json)。

**页面原图**

![011 v2-baseline](evidence-nine-v2-production-20261116/011/v2-baseline.png)

![011 gap-at-1](evidence-nine-v2-production-20261116/011/gap-at-1.png)

![011 source-at-3](evidence-nine-v2-production-20261116/011/source-at-3.png)

![011 source-at-9](evidence-nine-v2-production-20261116/011/source-at-9.png)

![011 reopened-source-at-3](evidence-nine-v2-production-20261116/011/reopened-source-at-3.png)
<a id="erye199-013"></a>

## ERYE199-013 固定时间字幕在视频慢放后的时间与内容隔离

**结果：Passed。** 视频/关联原声0.5倍速20秒，Fixed A1～3秒和Fixed B6～8秒未拉伸；2/7秒字幕及源画面正确、4/14秒空字幕，刷新保持。
新项目：bdabebe7-1615-4b19-8b2f-14b8e95f4b27；会话：5ffbc5f2-aa5d-4a35-8053-feaa8a1b01e0；工程：023b79d0-9afc-44f5-8a7b-a67690ec6f6a。

**前置操作**

1. 新建独立640×360/30fps工程，A及关联原声源/时间线0～10秒、1倍速，原片有帧内时间标记。
2. 通过当前SRT导入/工程准备入口准备固定字幕：1～3秒Fixed A、6～8秒Fixed B，20px白字，仅这两条固定字幕，无其他字幕。
3. 保存并确认2秒Fixed A、7秒Fixed B；记录视频/原声及字幕原文、时码和源引用。

**实际提示词 / 页面入口**
```text
只编辑当前工程“ERYE199-013-nine-v2-20261116”（工程ID：023b79d0-9afc-44f5-8a7b-a67690ec6f6a），不新建工程、不生成替代视频。唯一视频A（轨道1ffee570-6001-4a00-877d-764c18f9be7e、片段ae8ce1d6-f575-4ad9-bda4-32b2b559dba2）及已有的关联原声（轨道d060cc12-75d9-464b-b551-02204b14ec31）工程内速度设为0.5倍；保持同一原片、源0～10秒和时间线起点0，视频及原声时长应为20秒。现有字幕是固定时间SRT，请保留Fixed A的1～3秒、Fixed B的6～8秒、原文和20px样式，不建立源绑定，不拉伸或重生成字幕，不生成替代视频。
```

**执行步骤及预期**

1. 保存原1倍速工程和两条固定字幕；一次提交0.5倍速指令。
2. 完成后确认视频/原声为20秒；2秒显示Fixed A并对应原片1秒，7秒显示Fixed B并对应原片3.5秒。
3. 定位4秒和14秒，确认固定字幕空档，不因慢放把Fixed B延长到12～16秒。
4. 刷新，逐条核对字幕原文/1～3和6～8时码、20px样式与0.5倍速保存结果。
预期：视频和原声按0.5倍速，字幕仍为原固定时间；内容、顺序、样式不改，不把固定字幕误按源时间缩放。；2/7秒分别出现A/B，4/14秒无字幕；刷新后源引用、字幕时码与20秒视频/原声保持。

**保留延期范围**：source-bound源时间绑定、跨分割字幕映射/切分与显式解除绑定。
[脱敏业务回读](evidence-nine-v2-production-20261116/013/business-summary.json)。

**页面原图**

![013 v2-baseline](evidence-nine-v2-production-20261116/013/v2-baseline.png)

![013 initial-at-2](evidence-nine-v2-production-20261116/013/initial-at-2.png)

![013 initial-at-7](evidence-nine-v2-production-20261116/013/initial-at-7.png)

![013 initial-at-4](evidence-nine-v2-production-20261116/013/initial-at-4.png)

![013 initial-at-14](evidence-nine-v2-production-20261116/013/initial-at-14.png)

![013 reopened-at-7](evidence-nine-v2-production-20261116/013/reopened-at-7.png)

![013 reopened-at-14](evidence-nine-v2-production-20261116/013/reopened-at-14.png)
<a id="erye199-017"></a>

## ERYE199-017 同源普通实例裁剪隔离与间隙保留

**结果：Failed。** 仅裁短A后，B和关联原声B被自动从5秒移到3秒，3～5秒空隙被闭合；4秒已播放B源1秒，7秒为B源4秒，刷新后仍错误。A/B源引用未串换，失败点是B被连带移动。
新项目：f64dcc1a-c34f-44b4-8040-b64a1750429a；会话：0085322c-24f5-4d92-813b-85522622bdf6；工程：5dcd023f-ae45-4af2-b038-0d3df7b5229f。

**前置操作**

1. 新工程同一视频轨放入两个独立片段A/B，引用同一10秒原片：A源0～5秒放0～5秒，B源0～5秒放5～10秒。
2. 为A/B准备已有的对应关联原声片段，分别0～5和5～10秒；记录视频A、视频B及两个原声片段的不同标识。
3. 均1倍速，保存并核对2秒和7秒原片画面；无字幕、图片或其他音轨。

**实际提示词 / 页面入口**
```text
只编辑当前工程“ERYE199-017-nine-v2-20261116”（工程ID：5dcd023f-ae45-4af2-b038-0d3df7b5229f），不新建工程、不生成替代视频。仅将视频实例A（轨道acc457b7-cdf7-41c5-aeac-abb83c5ef56a、片段0d12d392-8c8e-48c7-b411-badc44cbbeb6）及对应关联原声A（片段b0ccd491-516d-458a-b4c5-7423b3e337a5）的源结束从5秒裁为3秒，保留源开始0和时间线起点0，A应为0～3秒。实例B（片段232f9bab-2cb2-4c81-a3f1-d7516696694e）及关联原声B（片段205b36ac-c4bc-4921-8f68-e3b1fd421852）仍为源0～5秒、时间线5～10秒、1倍速。不要移动B或闭合3～5秒空隙，不改写共同原文件，不新建子序列或生成视频。
```

**执行步骤及预期**

1. 记录两个独立实例及原声范围，选中A，一次发送只裁A尾部的完整指令。
2. 完成后核对A/原声A为0～3秒，B/原声B仍5～10秒；3～5秒留空。
3. 定位2秒、4秒、7秒：分别为A源2秒、视频空档、B源2秒；确认B没有继承A的新结束时间。
4. 刷新同一工程，复核片段身份、各自源范围及间隙，原文件引用不变。
预期：只改变A及其关联原声的结束范围；B仍保留完整5秒独立实例，源范围和位置未串改。；不自动闭合间隙、不缩短B、不覆盖共用原片；刷新后A3秒+B5秒及中间2秒空隙保持。

**保留延期范围**：子序列共享引用、父实例同步、独立子序列副本及引用撤销；两个普通片段不是子序列。
[脱敏业务回读](evidence-nine-v2-production-20261116/017/business-summary.json)。

**页面原图**

![017 v2-baseline](evidence-nine-v2-production-20261116/017/v2-baseline.png)

![017 failure](evidence-nine-v2-production-20261116/017/failure.png)

![017 failure-gap-at-4](evidence-nine-v2-production-20261116/017/failure-gap-at-4.png)

![017 failure-B-at-7](evidence-nine-v2-production-20261116/017/failure-B-at-7.png)

![017 failure-refreshed](evidence-nine-v2-production-20261116/017/failure-refreshed.png)
<a id="erye199-020"></a>

## ERYE199-020 非零播放位置设置静态参数后整段一致

**结果：Passed。** 播放头5秒提交静态50%后，1/5/9秒均同一作用范围，跨4～6秒无额外动画；源/背景/原声未改、刷新保持。
新项目：1b2cd34f-015f-4fb1-9041-bd56e79d302b；会话：45efeac1-7d60-4054-bdcc-b40835881e8a；工程：84255065-4a4f-4524-8e6c-acfb0ee4e446。

**前置操作**

1. 新工程画布640×360，前景A和不同背景B均源/时间线0～10秒、1倍速；A不透明度100%，B100%。
2. A原声启用、B原声静音；无字幕/水印/关键帧/淡入淡出，A/B位置和尺寸相同。
3. 保存后在1、5、9秒记录100%前景基线，播放头停5秒并选中A。

**实际提示词 / 页面入口**
```text
只编辑当前工程“ERYE199-020-nine-v2-20261116”（工程ID：84255065-4a4f-4524-8e6c-acfb0ee4e446），不新建工程、不生成替代视频。前景A（轨道91bb9a98-1630-4611-b12b-a9a12dc60b9f、片段2af8c0de-da82-4606-9eee-a1371529861a）的不透明度设为50%，作用于A整个0～10秒片段。这是整段静态值，当前播放头5秒不代表从5秒开始生效；不要创建关键帧、渐入渐出或新片段。背景B（轨道eb322288-f212-46fd-9b1e-512b50b9587e）、所有源范围/位置/速度和原声音轨保持不变，不生成视频。
```

**执行步骤及预期**

1. 在5秒选A，一次提交整段50%静态不透明度请求。
2. 完成后分别定位1、5、9秒，对照原前景/背景确认均为相同50%混合，不出现5秒前后突变。
3. 实际从4秒播放至6秒，确认经过提交时播放位置时没有额外渐变或跳变。
4. 刷新再查1/5/9秒；核对A仍整段50%，B、原声和片段数量/范围不改。
预期：A全片统一50%，不会只在5秒后或仅当前帧生效；没有生成动画、分段或额外素材。；刷新/跨5秒播放保持相同静态作用范围，背景和声音不受影响。

**保留延期范围**：真实关键帧、保持/线性/贝塞尔插值、空间路径与时间缓动；静态设置不计为关键帧通过。
[脱敏业务回读](evidence-nine-v2-production-20261116/020/business-summary.json)。

**页面原图**

![020 v2-baseline](evidence-nine-v2-production-20261116/020/v2-baseline.png)

![020 initial-opacity-at-1](evidence-nine-v2-production-20261116/020/initial-opacity-at-1.png)

![020 initial-opacity-at-5](evidence-nine-v2-production-20261116/020/initial-opacity-at-5.png)

![020 initial-opacity-at-9](evidence-nine-v2-production-20261116/020/initial-opacity-at-9.png)

![020 reopened-opacity-at-5](evidence-nine-v2-production-20261116/020/reopened-opacity-at-5.png)

![020 cross-submit-time-playback](evidence-nine-v2-production-20261116/020/cross-submit-time-playback.png)
<a id="erye199-045"></a>

## ERYE199-045 手动分段压低配乐及对白/前后段隔离

**结果：Passed。** 页面仅将M2（3～7秒）从50%调至15%，M1/M3仍50%、独立对白100%，源范围与片段边界未改；实际混音采样、刷新保持及恢复50%通过。
新项目：1220287d-dc09-4876-a490-fbc07398c23b；会话：88b0103c-9c2c-4a25-a3bf-eebcb05aa33b；工程：e705e8f2-f728-4895-b6a0-cc5311f61c86。

**前置操作**

1. 新建10秒工程，保留V画面并静音V原声；独立对白D源0～4秒放时间线3～7秒、音量100%。
2. 同一13秒音乐源准备三个相邻独立片段：M1源/时间线0～3秒、M2为3～7秒、M3为7～10秒；三者初始均50%，不使用交叉淡化。
3. 保存并记录三段音乐和对白的源引用、边界、音量；试听1/5/9秒作为基线。

**实际提示词 / 页面入口**
```text
不涉及，使用页面音量线手动拖动。
```

**执行步骤及预期**

1. 在M2（3～7秒）片段的音量线上真实拖到15%，读取页面百分比；M1/M3保持50%，D保持100%。
2. 播放1秒、5秒、9秒对应区间，确认只有对白所在中段的配乐减弱，前后配乐不变，D未静音或换源。
3. 刷新重开，核对M1/M2/M3为50%/15%/50%、D100%，各片段边界及顺序保持。
4. 仅把M2恢复50%再刷新，复查三段音乐均50%、D100%，没有重生成音频或移动边界。
预期：只有M2被调低并独立保存，前后段和对白不串改；中段配乐相对基线减弱，恢复后对应声音恢复。；分段百分比/源范围/时间位置刷新保持，不产生自动包络或额外混音文件。
对白使用独立4秒真实合成语音，音乐为13秒220Hz测试音并拆成0～3/3～7/7～10秒三段；对照1/5/9秒实际混音，检查中段降低、对白与前后段保持，再刷新并恢复中段50%。录音为实际预览输出，不以单个原片音轨capture代替混音。220Hz配乐成分相对基线：前段0.999、中段0.274、后段0.998，刷新后中段0.316；约为目标15%/50%=0.3。短录音和语音叠加会带来测量差异，这些值补充页面音量与实际保存结果，不作为精密声学校准。[混音分析](evidence-nine-v2-production-20261116/045/audio-analysis.json)。

**保留延期范围**：自动侧链压低、可编辑包络/手动点保护、LUFS归一化和dBTP限幅；固定片段音量不是自动压低或包络。
[脱敏业务回读](evidence-nine-v2-production-20261116/045/business-summary.json)。

**页面原图**

![045 manual-baseline](evidence-nine-v2-production-20261116/045/manual-baseline.png)

![045 middle-lowered-15](evidence-nine-v2-production-20261116/045/middle-lowered-15.png)

![045 after-music-1](evidence-nine-v2-production-20261116/045/after-music-1.png)

![045 after-dialogue-music-5](evidence-nine-v2-production-20261116/045/after-dialogue-music-5.png)

![045 after-music-9](evidence-nine-v2-production-20261116/045/after-music-9.png)

![045 middle-15-refreshed](evidence-nine-v2-production-20261116/045/middle-15-refreshed.png)

![045 middle-restored-50-refreshed](evidence-nine-v2-production-20261116/045/middle-restored-50-refreshed.png)
<a id="erye199-051"></a>

## ERYE199-051 导入受支持媒体新建工程并隔离旧工程

**结果：Blocked。** 工程下拉加载完成后没有“工程管理／导入媒体新建工程”入口；PA已准备，B导入及PA/PB隔离未执行，按新版明确前置记Blocked。
新项目：97ad2219-3ccc-4ee7-a35b-fc4ada15133a；会话：dd64a502-6776-4b56-a0ad-517a539257d6；工程：d03b1bb3-cc8e-40aa-93b3-2576e2e52a5e。

**前置操作**

1. 生产新建测试项目，先准备已有工程PA，仅有10秒视频A/原声；保存名称、2秒画面及时间线基线。
2. 另备受支持MP4视频B，640×360/30fps/10秒/48kHz，颜色和帧内标记明显不同于A；不得把已渲染PA输出当B。
3. 执行前确认编辑器工程下拉的工程管理中存在“导入媒体新建工程”；看不到则记前置Blocked，不用聊天加文件的accept冒充该入口。

**实际提示词 / 页面入口**
```text
不涉及，页面导入媒体新建工程。
```

**执行步骤及预期**

1. 从工程名下拉→工程管理→导入媒体新建工程选择本地B.mp4，等待新工程加载。
2. 记录新工程PB名称/身份，确认它与PA不同，2秒预览为B独立参考帧，时间线时长10秒且有B原声。
3. 刷新重开PB，确认仍为B；从工程列表切回PA，核对A的原画面/时间线/原声和保存内容未被覆盖。
4. 再次选PB，确认两个工程均可分别打开，导入只产生本次明确的新工程，不修改A原文件。
预期：受支持视频创建独立PB并可保存重开，画面/音频均来自B；PA和A原片保持原状。；导入失败应有可理解提示且PA仍可用；不得仅因Composer允许选择json/cinlink而声称工程导入成功。
实际仅完成PA准备和下拉入口核验；未发现入口后停止本例目标导入，后续隔离步骤未执行。

**保留延期范围**：Premiere .prproj解析、四级还原报告及效果/关键帧映射；媒体新建工程不等于工程文档解析。
[脱敏业务回读](evidence-nine-v2-production-20261116/051/business-summary.json)。

**页面原图**

![051 v2-baseline](evidence-nine-v2-production-20261116/051/v2-baseline.png)

![051 project-dropdown-loaded](evidence-nine-v2-production-20261116/051/project-dropdown-loaded.png)
<a id="erye199-052"></a>

## ERYE199-052 同名不同内容素材导入后的引用隔离

**结果：Passed。** 同名same.mp4的A/B为不同源引用；B独立新轨0～10秒、原声静音，显示B/隐藏后A的画面对照及刷新保持，A未被同名导入重绑定。
新项目：e0255787-ec66-41db-a388-dd3be22781bd；会话：7e52560a-fcc2-4d6c-b7f4-2ab83722bfa4；工程：3693ed5a-f855-4664-bc00-db9b6cb5a9d0。

**前置操作**

1. 在两个本地目录分别准备同名same.mp4，A与B均10秒640×360/30fps但颜色/帧内标记明显不同，记录各自文件哈希和2秒参考帧。
2. 新工程PA只有A及关联原声0～10秒、1倍速，保存；A原声启用。
3. 当前页面可通过媒体→导入素材登记B并将素材放入新视频轨，图片/字幕无关对象不准备。

**实际提示词 / 页面入口**
```text
不涉及，原生素材导入和轨道显示操作。
```

**执行步骤及预期**

1. 在PA通过媒体→导入素材选择另一个目录的B/same.mp4；核对导入后A画面/时间线不变。
2. 通过不同缩略图/预览确认B，将B明确放入新视频轨0～10秒并静音B原声；不要拖到A轨测试覆盖。
3. 定位2秒检查B参考画面；隐藏B检查底层仍为A参考画面，再显示B。
4. 刷新重开，重复B显示/隐藏对照，确认两个同名素材各自引用、源范围及音轨状态保持。
预期：同名不同内容不被按文件名合并或替换；导入B不会让A实例自动变为B。；各自预览与独立参考帧匹配，刷新后仍可区分；不产生所谓重连成功报告，也不把正常导入当离线恢复。

**保留延期范围**：离线素材按指纹/时长/尺寸重连、缺失字体/LUT诊断；普通上传不算依赖重连通过。
[脱敏业务回读](evidence-nine-v2-production-20261116/052/business-summary.json)。

**页面原图**

![052 v2-baseline](evidence-nine-v2-production-20261116/052/v2-baseline.png)

![052 same-name-B-registered](evidence-nine-v2-production-20261116/052/same-name-B-registered.png)

![052 same-name-B-placed](evidence-nine-v2-production-20261116/052/same-name-B-placed.png)

![052 initial-same-name-B-visible](evidence-nine-v2-production-20261116/052/initial-same-name-B-visible.png)

![052 initial-B-hidden-A-visible](evidence-nine-v2-production-20261116/052/initial-B-hidden-A-visible.png)

![052 reopened-same-name-B-visible](evidence-nine-v2-production-20261116/052/reopened-same-name-B-visible.png)

![052 reopened-B-hidden-A-visible](evidence-nine-v2-production-20261116/052/reopened-B-hidden-A-visible.png)
<a id="erye199-053"></a>

## ERYE199-053 异常SRT原生导入失败保护与编辑恢复

**结果：Failed。** 空SRT登记后放入字幕轨，未给出无有效字幕提示并持久化一条bindings为空的字幕轨；非法时码SRT被“Subtitle block has no timing”正确拒绝。原A/B字幕保留，后续RECOVER053编辑和刷新通过；整例因空SRT分支Failed。
新项目：d889faa2-3d40-4f68-bf15-f1fd32a72d51；会话：6ea151c6-f7fd-4d9c-a733-b942544cf0d5；工程：208baf88-772e-45b0-9cab-bba430908980。

**前置操作**

1. 新工程已有10秒V/原声及两条合法字幕A1～3秒、B6～8秒，保存并记录文字/时码/样式。
2. 准备本地empty.srt（0字节）及broken.srt（内容为三行：1、not-a-timestamp、BAD053）；均不含脚本、URL、压缩内容或外部引用。
3. 确认媒体→导入素材可选择.srt；本例不准备或运行恶意工程文件，不依赖.prproj样本。

**实际提示词 / 页面入口**
```text
不涉及，原生SRT导入及原字幕文字编辑。
```

**执行步骤及预期**

1. 通过媒体→导入素材选择empty.srt，保存提示及原字幕列表；如果选择阶段即拒绝，记录该真实拒绝，不绕过入口。
2. 选择broken.srt，等待格式处理，检查可理解的错误/无有效字幕提示；不得反复提交同一文件。
3. 刷新同一工程，核对原A/B文字、时间、样式、原片及原声仍与基线一致，不能被空文件或BAD053覆盖。
4. 将原A文字改为RECOVER053并正常结束编辑，刷新后确认新文保存，原时码与B不变，证明失败后编辑仍可用。
预期：空文件和非法时间行不能冒充成功有效字幕；有可理解的拒绝/无有效字幕反馈，原工程不被清空或部分覆盖。；重新打开仍保有原A/B及媒体；后续合法文字编辑能保存，无持续加载或崩溃。
实际补充动作：媒体登记后拖入原字幕轨触发解析。空SRT静默生成空轨，非法时码显示原文错误而不改工程；随后编辑Fixed A为RECOVER053并刷新，7秒仍为Fixed B。未通过登记成功来判断字幕有效。

**保留延期范围**：Premiere工程脚本/外链防护、解压限额、XML深度及外部实体；SRT输入验证不计为这些安全项通过。
[脱敏业务回读](evidence-nine-v2-production-20261116/053/business-summary.json)。

**页面原图**

![053 v2-baseline](evidence-nine-v2-production-20261116/053/v2-baseline.png)

![053 empty.srt-no-valid-cues](evidence-nine-v2-production-20261116/053/empty.srt-no-valid-cues.png)

![053 broken-explicit-subtitle-drop](evidence-nine-v2-production-20261116/053/broken-explicit-subtitle-drop.png)

![053 broken.srt-rejected](evidence-nine-v2-production-20261116/053/broken.srt-rejected.png)

![053 recovery-refreshed](evidence-nine-v2-production-20261116/053/recovery-refreshed.png)

![053 original-B-preserved](evidence-nine-v2-production-20261116/053/original-B-preserved.png)

![053 failure](evidence-nine-v2-production-20261116/053/failure.png)
<a id="erye199-055"></a>

## ERYE199-055 相对编辑完成后导航和刷新不重复应用

**结果：Passed。** 一次相对降6dB后约50.12%，切面板/两次刷新/离开重开仍约50%而非重复降为25%；原片/原声/位置与源范围保持。
新项目：2e39c06e-4526-4ab1-bff3-89af5e46b113；会话：aef1b7f1-a91d-46a0-a0ba-82d63fc2171b；工程：28e5707e-7f82-41c4-bbe3-894435de085e。

**前置操作**

1. 新工程只有10秒V及关联原声，另有唯一独立背景音轨M，源/时间线0～10秒、音量100%；记录M真实轨道/片段标识。
2. 保存并确认M来源明确，原声音量及字幕无未保存修改，无在途Agent任务。
3. 后续只发送一次相对降低6dB请求；页面运行中发送位置是停止，不在任务中重发。

**实际提示词 / 页面入口**
```text
只编辑当前工程“ERYE199-055-nine-v2-20261116”（工程ID：28e5707e-7f82-41c4-bbe3-894435de085e），不新建工程、不生成替代视频。唯一独立背景音轨M（轨道648efea1-67bf-4235-aa3c-a778fcd790ec、片段7be77448-0309-4f9d-9499-61a6fb282294），在当前100%音量基础上降低6dB一次，线性音量约为50.12%，保持原片/关联原声、M源范围及时间线位置不变。不要将同一降低动作应用多次，不导出、不生成替代音频，也不要修改其他轨道。
```

**执行步骤及预期**

1. 保存100%基线，一次发送完整指令；等待同一run完成，补槽按唯一M及降低6dB填写后继续。
2. 只悬停音量线读取反馈，不手动拖动：确认约50%，记录原请求和完成结果。
3. 切到字幕/水印再回媒体，然后刷新同一标签两次；每次读取M音量和源/位置。
4. 从项目会话重新打开同一工程，确认仍约50%，没有变成约25%，会话没有自动新增相同编辑请求或新处理任务。
预期：相对编辑只应用一次，导航/刷新/重开不再次降低，不把原请求完成结果当新请求提交。；M约50%保持，原声音量、原片和所有时间范围不变；不要求页面暴露commandId/payload/expectedRevision。

**保留延期范围**：受控同commandId重放、不同payload冲突及expectedRevision内部协议；完成后刷新不等于验证服务端幂等协议。
[脱敏业务回读](evidence-nine-v2-production-20261116/055/business-summary.json)。

**页面原图**

![055 v2-baseline](evidence-nine-v2-production-20261116/055/v2-baseline.png)

![055 gain-after-once](evidence-nine-v2-production-20261116/055/gain-after-once.png)

![055 gain-refresh-1](evidence-nine-v2-production-20261116/055/gain-refresh-1.png)

![055 gain-refresh-2](evidence-nine-v2-production-20261116/055/gain-refresh-2.png)

![055 gain-reopen](evidence-nine-v2-production-20261116/055/gain-reopen.png)

## 证据与缺陷状态

原始报告仅留本机reports/erye199-nine-v2-production-20261116；公开证据已去除URL/鉴权及无关会话数据，截图保持原样，[原图哈希清单](evidence-nine-v2-production-20261116/manifest.json)。017/053当前失败已同步FWXC-590/591，原高级缺口缺陷只保留历史关联，未新建或修改旧状态。

## 本地检查

用例格式校验：539条、0问题（含其他需求的既有并行改动，本需求仍63条）；运行器15项单测通过；新增/变更脚本语法及定向差异空白检查通过。另核对9组独立工程、5个唯一原run、51张原图哈希、状态/登记/延期范围及链接一致性；未新增依赖。
