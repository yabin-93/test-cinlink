# ERYE-199 六条当前功能v2生产执行（2026-11-16）

> 后续同步：三条相同导出失败已合并FWXC-578，见[同步记录](defects-029-047-048-native-export-production-20261116.md)。本次未重测，不改变以下实测结果。

本轮：**3 Passed、3 Failed、0 Blocked**。使用Windows / Ego Lite生产环境app.cinlink.ai，新建专用项目和8个独立工程（034分三个倍率）；其他用例未重跑。未接入仓库自动化，仍PLAN；浏览器调试文件仅保存在本轮本地reports目录。TaskSpace已正常结束。

| 用例 | 结果 | 实际结果 |
|---|---|---|
| [ERYE199-028](#erye199-028) | Passed | 双语Source A/译文甲、Source B/译文乙全局字号20→24→20生效并刷新保持；2/7秒匹配、4秒空档；原文/时间/原声引用及其他工程内容保持。 |
| [ERYE199-029](#erye199-029) | Failed | Arial/20px下混合中英数字、Emoji及长姓名页面显示/换行正常，刷新保留；点击原生导出后提示“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，未产生可下载MP4，导出与页面一致性未完成。 |
| [ERYE199-034](#erye199-034) | Passed | 三个独立新工程分别以0.25/0.3178/4倍执行，时长40/31.466331/2.5秒；5/5/1秒对应源约1.25/1.589/4秒，相邻源帧范围内；实际播放与刷新保持，视频及关联原声同倍率、同源范围，无字幕或替代片段。 |
| [ERYE199-042](#erye199-042) | Passed | 对白D100→58→0→58%、音乐M30→15→30%原生拖动及刷新保存通过，双片段互不串改。实际混合预览录音核验：D/M约0.581/0.300→对白约0→0.579/0.149，额外V原声静音；源/范围/时长保持。 |
| [ERYE199-047](#erye199-047) | Failed | 四类对象已准备，2秒I+A、4秒I无字幕、7秒B无I、9秒仅V的页面预览及刷新可核对；原生导出提示“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，未在结果区取得可下载MP4，四时间点正式文件及音频一致性未完成。 |
| [ERYE199-048](#erye199-048) | Failed | 2秒进入真实全屏，播放到8.16秒暂停并退出后仍8.16秒，刷新后原片及10秒时间线保持；原生导出提示“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，未取得可下载结果，MP4实际640×360/时长/2秒8秒画面及原声未完成核验。 |

**当前全量：63条，21 Passed、10 Failed、1 Blocked、31 Not Applicable、0 Not Run。** 原7条失败的云效关联保持；029/047/048页面导出失败随后按用户要求合并提交[FWXC-578](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8997db131fa05bc3a8e6e62ffe)，3张截图已嵌入、7附件回读通过。FWXC-525仍为原高级能力缺口汇总，与本轮失败分开关联。

本轮034三次请求均直接受理并完成，没有出现补槽；其余五例为页面操作，无需发送提示词。没有以手动修改替代Agent变速，没有重复提交已受理任务或再次点击导出。

准备与验收边界：通过现有工程保存入口准备夹具，之后字号、变速、音量拖动、全屏和导出均真实从页面执行。028准备阶段缺字体字段已补齐后再开始验收；042确认V自动补齐的原声已静音、仅D/M发声后再执行，之前的预置/试录不计结果；未将这些准备问题判为产品缺陷。

三个导出场景均从“正在导出”恢复按钮并显示“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”；本轮没有取得可下载MP4，因此未验收文件参数或图像/音频一致性。媒体列表随后可见同名editor-export.mp4缩略项，仅凭缩略项不能完成下载核验，也不据此判断服务端未生成文件或推断根因。

[本轮结构化结果](execution-status-current-six-v2-production-20261116.json) · [原图及哈希](evidence-current-six-v2-production-20261116/manifest.json) · [当前全量状态](execution-status-current.md) · [本地导出问题记录](../../../defects/ERYE199-029-047-048-native-export-protocol-production-20261116.md)

<a id="erye199-028"></a>
## ERYE199-028：Passed

**前置：**原片/关联原声0～10秒，Source A/译文甲1～3秒、Source B/译文乙6～8秒；Arial，20px。

**实际步骤：**2/7秒保存基线；页面“字幕→样式”改24px；查2/7/4秒；刷新查24px，再改回20px并刷新，播放原声；工程内容回读与基线逐项对比。

**提示词：**不涉及，页面操作。

工程：`ERYE199-028-current-six-20261116`；ID：`ae53b0d6-054d-4e3f-82c7-80e7d868192c`；会话：`f9fa3db0-1403-45a3-b1e6-adbcf008a4bf`。

![028 font24-time-2](evidence-current-six-v2-production-20261116/028-font24-time-2.png)

![028 font24-time-7](evidence-current-six-v2-production-20261116/028-font24-time-7.png)

![028 font24-time-4](evidence-current-six-v2-production-20261116/028-font24-time-4.png)

![028 font20-refreshed](evidence-current-six-v2-production-20261116/028-font20-refreshed.png)

**未覆盖：**原定义中已明确延期的高级能力，不因当前v2通过计作覆盖。

<a id="erye199-029"></a>
## ERYE199-029：Failed

**前置：**原片/原声0～10秒；1～4秒：`中文 English 123 😀 亚美历山大·克里斯托弗·超长姓名 AlexanderChristopherLongName`；6～8秒：`第二段 Font 456`。Arial / 20px / 白字黑描边。

**实际步骤：**核对加载完成后的2/7/4.5秒；刷新后核对文字及字体；点击右上原生导出。长文本在英文长姓名前换为第二行，文字顺序、Emoji和两条时间正常；导出出现协议错误，未取得可下载结果。

**提示词：**不涉及，页面操作。

工程：`ERYE199-029-current-six-20261116`；ID：`2614ae89-2f1d-483b-b3cb-abfa95b9562a`；会话：`f0b89427-d01e-4b93-aefe-4ce8102ff73a`。

![029 refreshed-font](evidence-current-six-v2-production-20261116/029-refreshed-font.png)

![029 loaded-preview-7](evidence-current-six-v2-production-20261116/029-loaded-preview-7.png)

![029 loaded-preview-4.5](evidence-current-six-v2-production-20261116/029-loaded-preview-4.5.png)

![029 failure-export-protocol](evidence-current-six-v2-production-20261116/029-failure-export-protocol.png)

**未覆盖：**MP4文字/空档一致性

<a id="erye199-034"></a>
## ERYE199-034：Passed

每个独立工程仅一段原片V及关联原声，源0～10秒、时间线0秒开始、初始1倍；无字幕、无后续片段。每个工程只发送下列请求一次，无补槽。

| 倍率 | 时间线时长 | 映射点 | 原run |
|---|---|---|---|
| 0.25 | 40秒 | 时间线5秒→源约1.25秒（相邻源帧内） | `run_v2_a1e61636688b4af2bd92ff5ceedcdb15` |
| 0.3178 | 31.466331秒 | 时间线5秒→源约1.589秒（相邻源帧内） | `run_v2_2cf0528ddfe34b449dd41f222f34f7c6` |
| 4 | 2.5秒 | 时间线1秒→源约4秒（相邻源帧内） | `run_v2_2ed851d0ea0f47b3810767bbda900bcf` |

三个场景分别实际播放后暂停、刷新再定位，原声与视频倍率一致；源引用/源0～10秒/起点不变，无新增或替代片段。画面源时间以原片帧内标注核验，不把时间线时钟当作源帧时间。

工程：`ERYE199-034-025-current-six-20261116`；ID：`3b879063-a14c-4f42-91fc-9c6c4825163f`。

> 请只编辑当前视频工程“ERYE199-034-025-current-six-20261116”（工程ID：3b879063-a14c-4f42-91fc-9c6c4825163f）唯一的视频片段及其关联原声，将工程内播放速度设为0.25倍。保留同一原片、源0～10秒和时间线起点0秒，按倍率改变片段及关联原声的时间线时长；不增加字幕、不生成替代视频、不替换或改写原文件，不新增其他片段。不要求保持音高。

![034-025 rate025-time5](evidence-current-six-v2-production-20261116/034-025-rate025-time5.png)

工程：`ERYE199-034-03178-current-six-20261116`；ID：`d9598a3b-89aa-40c7-8084-301915ff714f`。

> 请只编辑当前视频工程“ERYE199-034-03178-current-six-20261116”（工程ID：d9598a3b-89aa-40c7-8084-301915ff714f）唯一的视频片段及其关联原声，将工程内播放速度设为0.3178倍。保留同一原片、源0～10秒和时间线起点0秒，按倍率改变片段及关联原声的时间线时长；不增加字幕、不生成替代视频、不替换或改写原文件，不新增其他片段。不要求保持音高。

![034-03178 rate03178-time5](evidence-current-six-v2-production-20261116/034-03178-rate03178-time5.png)

工程：`ERYE199-034-4-current-six-20261116`；ID：`c6eb3505-30db-433a-9ad2-ac7cba84395f`。

> 请只编辑当前视频工程“ERYE199-034-4-current-six-20261116”（工程ID：c6eb3505-30db-433a-9ad2-ac7cba84395f）唯一的视频片段及其关联原声，将工程内播放速度设为4倍。保留同一原片、源0～10秒和时间线起点0秒，按倍率改变片段及关联原声的时间线时长；不增加字幕、不生成替代视频、不替换或改写原文件，不新增其他片段。不要求保持音高。

![034-4 rate4-time1](evidence-current-six-v2-production-20261116/034-4-rate4-time1.png)

**未覆盖：**原定义中已明确延期的高级能力，不因当前v2通过计作覆盖。

<a id="erye199-042"></a>
## ERYE199-042：Passed

**前置：**V画面0～10秒；真实对白D（10秒MP4中的音频）及13秒音乐M的源0～10秒均从0开始，D100%、M30%；V的关联原声保持静音，避免额外原声叠加。

**实际步骤：**真实拖动音量线：D100→58→0→58%，M保持30%；再仅M30→15%，刷新查D58/M15%；恢复M30%，刷新查D58/M30%；记录实际预览混合音频并与独立素材对照。

**提示词：**不涉及，页面操作。

工程：`ERYE199-042-current-six-20261116`；ID：`84133cd2-7a71-42e6-b27e-325aef37b8ec`；会话：`735e93f9-032e-4cd3-8d95-ff6f6ea4e166`。

混合输出估计：D/M约0.581/0.300及0.579/0.149；D0%时对白分量约−0.0002，V原声贡献近0；音乐半量时对白保持。编码/对齐存在误差，仅辅助确认实际声音变化；页面百分比及刷新结果为58/15和58/30。[音频核验摘要](evidence-current-six-v2-production-20261116/audio-output-analysis.json)。早期仅录主video的captureStream不代表混合输出，已排除。

![042 valid-D58-attempt](evidence-current-six-v2-production-20261116/042-valid-D58-attempt.png)

![042 valid-D0-M30](evidence-current-six-v2-production-20261116/042-valid-D0-M30.png)

![042 valid-D58-M15-refreshed](evidence-current-six-v2-production-20261116/042-valid-D58-M15-refreshed.png)

![042 final-refreshed](evidence-current-six-v2-production-20261116/042-final-refreshed.png)

**未覆盖：**原定义中已明确延期的高级能力，不因当前v2通过计作覆盖。

<a id="erye199-047"></a>
## ERYE199-047：Failed

**前置：**V及关联原声0～10秒；I源文件96×96、中心(64,64)、范围0～5秒；字幕Export A1～3秒、Export B6～8秒，24px黄色；V未预先烧录覆盖物。

**实际步骤：**核对2秒I+A、4秒I无字幕、7秒B无I、9秒仅V；刷新同工程后点击原生导出。页面四点已留证，导出出现协议错误，未取得可下载文件，正式文件比较未完成。

**提示词：**不涉及，页面操作。

工程：`ERYE199-047-current-six-20261116`；ID：`d5866640-1eac-44bf-99df-04de830cfa2f`；会话：`85fe277c-2515-4beb-83e0-27e1803ab951`。

![047 preview-2](evidence-current-six-v2-production-20261116/047-preview-2.png)

![047 preview-4](evidence-current-six-v2-production-20261116/047-preview-4.png)

![047 preview-7](evidence-current-six-v2-production-20261116/047-preview-7.png)

![047 preview-9](evidence-current-six-v2-production-20261116/047-preview-9.png)

![047 failure-export-protocol](evidence-current-six-v2-production-20261116/047-failure-export-protocol.png)

**未覆盖：**MP4四点画面/原声一致性

<a id="erye199-048"></a>
## ERYE199-048：Failed

**前置：**仅V及关联原声0～10秒，640×360、30fps，无代理；2秒普通预览。

**实际步骤：**点击“放大预览”进入真实fullscreen，2秒画面保持；播放至8.16秒暂停，点击“退出放大预览”后仍8.16秒；刷新并查原片/10秒时间线，再点击导出。全屏部分通过，正式导出出现协议错误。

**提示词：**不涉及，页面操作。

工程：`ERYE199-048-current-six-20261116`；ID：`079f63a8-ca46-432c-b680-bb9a39ea7934`；会话：`58ae8192-e775-4f1b-b7df-f0da05a18ecc`。

![048 normal-two](evidence-current-six-v2-production-20261116/048-normal-two.png)

![048 fullscreen-two](evidence-current-six-v2-production-20261116/048-fullscreen-two.png)

![048 fullscreen-paused-eight](evidence-current-six-v2-production-20261116/048-fullscreen-paused-eight.png)

![048 normal-after-fullscreen](evidence-current-six-v2-production-20261116/048-normal-after-fullscreen.png)

![048 failure-export-protocol](evidence-current-six-v2-production-20261116/048-failure-export-protocol.png)

**未覆盖：**正式MP4分辨率/时长/画面及原声
