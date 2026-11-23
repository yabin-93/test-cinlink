> 后续更新：001～010已接入仓库脚本并执行；最新状态见[自动化生产报告](results-automation-001-010-production-20261113.md)。本文保留当时批次的真实结果。

# ERYE-199 001～005生产执行记录

> 历史报告：下方统计及Blocked保留原定义执行结果；优化后的001/003/005已在新工程完成生产复测，均Passed。当前001～005为4 Passed、1 Failed，002/FWXC-479不变，见[当前状态](execution-status-current.md)和[v2复测证据](results-v2-production-001-003-005-20261113.md)。原Graphic/PR tick/关键帧要求仍未验收。

日期：2026-11-13。环境：生产 https://app.cinlink.ai。

当前：CompletedWithBlocks。本轮生产测试收敛：1 Passed、1 Failed、3 Blocked。001/005为前置能力缺口，003缺可信PR tick工程夹具；阻塞不计通过。未同步云效、未修改默认自动化或产品代码、未推送。

统计：{'Blocked': 3, 'Failed': 1, 'Passed': 1}。准备素材不计执行通过；登录页截图不计产品失败证据。

| 用例 | 状态 | 实际结果 |
|---|---|---|
| [ERYE199-001](#erye199-001) | Blocked | 视频、原声、图片、字幕四类对象已加载；独立可编辑Graphic无法建立，完整对象模型前置不满足 |
| [ERYE199-002](#erye199-002) | Failed | 29.97fps/48kHz原片已入时间线；1秒分割保存为1.000秒，未按30000/1001帧率对齐，刷新仍保留 |
| [ERYE199-003](#erye199-003) | Blocked | 缺少可信的含VFR及PR tick工程样本和tick映射基准；不能验证工程解析及累积漂移 |
| [ERYE199-004](#erye199-004) | Passed | 源范围0～10秒、rate=2时页面时间线5秒；播放头1秒映射原片2秒，刷新后范围和倍速保留 |
| [ERYE199-005](#erye199-005) | Blocked | 当前UI/Agent没有可用的源时间关键帧操作；无法准备3个关键帧，裁头/拉回/分割保持曲线未执行 |

## ERYE199-001

前置条件：已创建含视频、音频、图片、字幕、图形的项目。

操作步骤：打开项目 → 读取 Project/Asset/Sequence/Track/Item/Effect/Caption/Graphic 字段。

预期结果：必要字段齐全；Item 的 assetId 与 nestedSequenceId 二选一；选择/面板状态独立保存。

本轮状态：**Blocked**。视频、原声、图片、字幕四类对象已加载；独立可编辑Graphic无法建立，完整对象模型前置不满足。

前置操作：在专用生产项目内新建独立会话31df96e3-e766-44a7-b211-787fc3df5d8b、工程aaaf844b-df9b-43c7-92ec-f15c79737c05；沿用本轮生产上传的29.97fps/48kHz原片，另外通过真实页面上传E199-source.srt和cinlink-smoke-watermark.png（512×512）。先一次请求创建0～5秒、100×60、中心320,180的独立蓝色矩形Graphic，禁止用水印/图片/字幕替代；任务run_v2_ca6632e3f5e64bbf9400c1ff2a30c62d实际done、intent_fully_satisfied=false、无计划工具和补槽，明确当前工具不支持Graphic。该任务前后完整工程内容和版本一致。随后仅为检查现有四类对象，用实际保存接口准备图片0～5秒、字幕A1～3秒/B6～8秒；刷新后页面四类对象均出现，ID及文件关联可读。夹具初次多填image轨visible导致‘图片轨道属性无效’，已删去错误夹具字段，正常加载后才记录观察；准备错误不作为产品缺陷。未创建Graphic，不宣称Project/Sequence/Item/Effect/Caption/Graphic模型、二选一引用、选择/面板独立保存均已通过。解阻需提供生产可用的独立Graphic创建/导入入口及真实样本。

实际提交提示词：

> 当前工程“ERYE199-001-生产-20261113”（工程ID：aaaf844b-df9b-43c7-92ec-f15c79737c05）的项目对象模型测试准备：登记本条附件 E199-source.srt 和 cinlink-smoke-watermark.png 供本工程使用，不分析其他目录素材。在本工程时间线0～5秒新增一个独立可编辑蓝色矩形图形，宽100像素、高60像素，中心位置320,180，作为Graphic对象；不要用图片、水印、字幕或烧录视频替代。保留原视频和原声音轨，不新建工程、不生成替代视频。如不支持独立可编辑矩形，请明确说明，保留当前原视频和原声不变。

![ERYE199-001证据](evidence-production-001-005-20261113/001-graphic-terminal.png)

![ERYE199-001证据](evidence-production-001-005-20261113/001-four-object-baseline.png)

## ERYE199-002

2026-11-13缺陷同步：[FWXC-479](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9ba270e32cb1770640a69d088f)，状态🤔AI提缺陷。两张本次失败截图已上传并嵌入，另附原片和切点JSON，共4附件；正文/字段/附件回读通过。该例仍为Failed，本次未重跑。

前置条件：已有 29.97fps、48kHz 项目。

操作步骤：放置片段 → 检查时间值、区间与帧对齐。

预期结果：时间为整数 value+timescale；帧率 numerator/denominator；区间左闭右开；按项目帧对齐。

本轮状态：**Failed**。29.97fps/48kHz原片已入时间线；1秒分割保存为1.000秒，未按30000/1001帧率对齐，刷新仍保留。

实际步骤：上传独立生成的E199-CFR2997-48k.mp4（ffprobe：300帧、30000/1001fps、48kHz）→编辑区选择该文件→选视频片段→预览进度Home后100次ArrowRight到1.00秒→分割→读取实际保存内容→刷新重开。工程5c2129e5-34bf-481b-baa2-53981b875315，版本1→2。视频/关联原声均保存source_out_sec=1、下一段source_in_sec=1、timeline_start_sec=1。1×30000/1001=29.97002997帧，不是整数；临近30帧边界为1.001秒。另观察到当前保存格式为秒数及fps=29.97，未使用用例描述的value/timescale和分数帧率；字段编码差异单独记录，不作为页面业务失败的唯一依据。两段无时间空隙/重叠；未验证全部边界帧内容是否重复、丢失或长时累积漂移。

![ERYE199-002证据](evidence-production-001-005-20261113/002-split.png)

![ERYE199-002证据](evidence-production-001-005-20261113/002-refreshed.png)

## ERYE199-003

前置条件：导入含 VFR 与 PR tick 的工程。

操作步骤：解析时间 → 与源 PTS 对照。

预期结果：PR tick 按有理数转换；VFR 用真实 PTS 或经验证代理映射；不出现累积漂移。

本轮状态：**Blocked**。缺少可信的含VFR及PR tick工程样本和tick映射基准；不能验证工程解析及累积漂移。

已在工作资料目录C:/Users/chen/Documents/ChatGPT及E:/proj检索.prproj（包含隐藏和被忽略文件，排除node_modules/.git/vendor/target），未找到可用样本。已生成独立VFR+48kHz媒体基准：10秒、225帧，前5秒间隔约66.667ms，后5秒约33.333ms，转折帧源PTS为5.000秒；全部PTS来自本机ffprobe，非待测工程自证。VFR视频本身不含Premiere工程tick，普通MP4上传不能等同PR工程导入。解阻需真实PR工程、关联VFR原片和已知PR时间点/源PTS对照；当前不填写虚构PR tick、不声称全程无累积漂移。 补充观察：真实页面上传VFR素材后点击媒体卡进入素材预览，重新从0开始播放至0.794285秒后暂停，640×360、10秒、readyState=4、无媒体错误；从真实预览下载的文件SHA256与本轮独立VFR原片相同。当前时间线仍为空，仅素材预览，不是工程解析或时间映射通过。

![ERYE199-003证据](evidence-production-001-005-20261113/003-project-picker.png)

![ERYE199-003证据](evidence-production-001-005-20261113/003-vfr-preview.png)

## ERYE199-004

前置条件：片段 rate=2，sourceRange 10s。

操作步骤：放到 timelineRange 并读取时长。

预期结果：源时长=时间线时长×rate；sourceRange 与 timelineRange 分别可读。

本轮状态：**Passed**。源范围0～10秒、rate=2时页面时间线5秒；播放头1秒映射原片2秒，刷新后范围和倍速保留。

前置准备使用已观测的工程保存接口，仅在新建独立工程5f630668-42c6-469f-a675-ee1ee02b485f写入固定夹具：视频及关联原声source_in_sec=0、source_out_sec=10、playback_rate=2、timeline_start_sec=0；不是把接口写入成功当成测试通过。随后从生产页面打开工程，实际读取片段与预览总时长5.00秒；键盘将时间线播放头移到1.00秒，真实video.currentTime=2、playbackRate=2、readyState=4；源文件10.01秒、采用源范围10秒。刷新重新打开，总时长仍5秒，保存源范围/倍速保留。源视频实际下载SHA256与本轮本地输入完全相同。限定本例源/时间线时长和预览映射，不包含导出成片或保持音高验证。

![ERYE199-004证据](evidence-production-001-005-20261113/004-rate2-initial.png)

![ERYE199-004证据](evidence-production-001-005-20261113/004-map-at-1.png)

![ERYE199-004证据](evidence-production-001-005-20261113/004-refreshed.png)

## ERYE199-005

前置条件：片段带 3 个关键帧，已裁头。

操作步骤：裁头 → 读取关键帧时间 → 拉回。

预期结果：关键帧默认锚定源内容时间；裁掉的关键帧保留；分割保留边界值与曲线。

本轮状态：**Blocked**。当前UI/Agent没有可用的源时间关键帧操作；无法准备3个关键帧，裁头/拉回/分割保持曲线未执行。

前置操作：独立新会话590b856a-6d84-48dd-ae02-1e40f719e691、工程1c6230d6-ed37-48e1-a83c-4f5b80acf015，单个原视频0～10.01秒及关联原声，初始版本1。一次请求在源1/4/8秒分别创建20%/60%/100%不透明度线性关键帧，然后裁头到源2秒，禁止静态值或淡入淡出替代。任务run_v2_f5e0815398ba4b148dd7ad5428652c36为done、intent_fully_satisfied=false、plan=[]，明确接口只支持静态不透明度及淡入淡出，不支持这些关键帧或保留裁剪范围外关键帧。无补槽可填。任务后完整工程/版本/更新时间与任务前一致；未裁头、未拉回、未分割，未把正确拒绝当作原正向用例通过。解阻需可创建或导入三个源时间关键帧的生产入口及有效工程夹具。

实际提交提示词：

> 只处理当前工程“ERYE199-005-生产-20261113”（工程ID：1c6230d6-ed37-48e1-a83c-4f5b80acf015）中唯一的原视频片段，不新建工程、不生成替代视频。先给该片段的不透明度添加三个线性关键帧，分别锚定源视频时间1秒=20%、4秒=60%、8秒=100%；保留原音轨，不改变片段总时长。关键帧创建成功后将片段源入点从0秒裁到2秒，保留出点10.01秒，且不删除被裁掉的1秒关键帧。若当前编辑器不支持关键帧，请明确说明，不要用淡入淡出或静态不透明度替代，也不要宣称完成。

![ERYE199-005证据](evidence-production-001-005-20261113/005-before-submit.png)

![ERYE199-005证据](evidence-production-001-005-20261113/005-terminal.png)

## 证据索引与验证边界

[本轮结构化结果](execution-status-20261113.json) · [证据文件SHA256清单](evidence-production-001-005-20261113/manifest.json)。

001：四类对象保存内容与图片/字幕标识；002：分割前后及刷新回读；003：独立VFR帧PTS基准和生产素材预览观察；004：固定倍速前置、真实播放映射和刷新回读；005：任务前后未变的工程。以上脱敏JSON与截图在同一证据目录；原始消息和运行底稿仅留本机reports目录。未验证开发内部实现，未将字段名称差异单独判为业务失败。未生成导出成片、未做全长累计漂移/音高/计费验收；无云效写入、产品代码或默认自动化修改、远程推送。
