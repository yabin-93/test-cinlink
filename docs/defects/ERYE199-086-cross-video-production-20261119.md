# 【生产环境】视频跨轨误改原声行，换轨后平移仍连带原声

已同步[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)；截图上传、正文嵌入及附件回读通过，用例保持Failed。

**现象**

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
| T1 翻译配音 | 配音和字幕 / 简体中文 / 译文，F20 | 将这条视频翻译成简体中文配音，并显示简体中文字幕。 |
| T2 翻译配音 | 配音和字幕 / 简体中文 / 双语，F20 | 将这条视频翻译成简体中文配音，并显示中英双语字幕。 |
| E 画质增强 | 2倍，F20 | 将这条视频的画质增强2倍，保留完整时长和原音。 |
| C 去口水词 | 默认，F60 | 去掉这条视频中的口水词和多余停顿，保留其余内容与原音。 |
| H 长视频变短 | 30秒，F60 | 将这条视频剪成30秒高光，保留原音。 |
| G AI 生视频 | 5秒 / 16:9，不附加视频 | 固定镜头拍摄一只红色杯子放在木桌上，背景为浅灰色墙面。 |

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

同步标识：ERYE199-086-CROSS-VIDEO-ORIGINAL-AUDIO-COUPLING-PROD-20261119

关联ERYE199-086，合并T1/T2/E/C/H/G相同现象。S0/S1本轮通过，不归入失败。业务现象与FWXC-699原声误联动相关，本条补充跨视频轨及跨轨后关联保持场景，保留历史缺陷不修改；不推断内部根因。
所有输入和本轮结果对应已核验，无素材串用；已知译文预览显示差异不纳入本条。原始run、会话、工程标识及前后片段记录见evidence-summary.json。

**失败截图**

T1：跨轨前五轨基线，原声位于视频之后。

![086-T1-cross-video-baseline-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d37a36b89369d4a9a418811b2b)

T1：跨轨后原声行也随视频换位。

![086-T1-cross-video-cross-failure.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f9b9ffc327d8422a082d85d5c9)

086-T1-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-T1-cross-video-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=54cbf16e8dfc8331accac48497)

086-T2-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-T2-cross-video-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6952393828d95efa6c72a7c75d)

086-E-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-E-cross-video-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e92a3fe1d5712365252152236b)

086-C-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-C-cross-video-failure-preview-supplement.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9843cea92ada3b21dfb2625f36)

086-H-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-H-cross-video-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d7a9a8dea7eccff3c284225bb7)

086-G-cross-video：跨轨并右移1秒后，重开仍保留原声误联动；截图为最终状态。

![086-G-cross-video-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6b6360dc20977022445a32b85b)
