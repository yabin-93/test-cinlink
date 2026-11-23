# FWXC-327正式环境回归（2026-11-11）

> 最新独立批次见[2026-11-12回归报告](FWXC-327-retest-prod-20261112.md)。本轮已实际取得TRANSCRIBE-P01的独立中文字幕SRT，旧MP4交付缺口不自动沿用；其余分支以当天报告和进度为准，下方保留11月11日历史。

**结论：原下载失败/乱码现象在本轮8份文本产物中未复现，8个分支的下载、编码和基本内容格式检查通过；另1个分支改为MP4交付，原SRT文件卡路径未覆盖，整项暂不标为AI通过。**

[原缺陷FWXC-327](https://devops.aliyun.com/projex/bug/FWXC-327)，工作项`1ba3ef8e1d160938e926dcc018`。官方OpenAPI执行前为“已修复”，结束后回读为“再次打开”，负责人陈圣融。本轮云效写入0，状态变化不是本轮自动操作；未提交评论或附件。

**现象**

原描述包含9条SRT/summary.md文件卡不能下载，以及TRANSCRIBE-P01的subtitle.srt打开乱码。本轮在9个新会话逐项执行原指令：3条总结均交付可下载、非空、中文可读的summary.md；5条明确独立字幕交付的路径均得到可下载SRT，UTF-8解码、结构及语言检查通过。TRANSCRIBE-P01按原快捷参数执行后只交付subtitled-video.mp4，没有独立SRT卡，无法核验该条原始SRT乱码现象，不计为文本文件通过。

**前置步骤**

1. 正式环境`https://app.cinlink.ai/`，账号yabinc18 Creator，macOS有头Chrome，通过原生CUA串行操作，业务重试0。
2. 复用今天项目`FWXC350-prod-retest-20261111`（`9ccba5a7-6b36-4630-9923-15e60a10b0c6`），每条新建空会话，直接附加指定原片；仅SUMMARY-P03另从真实@候选选择该视频。不沿用上一条的输出。
3. 原描述同名素材在本机找到：`/Users/edy/Desktop/测试素材/新/American+Vs+Asian+Culture.mp4`，31,001,109字节，SHA-256 `2d9cb7a00357b4d61092566491031f17ed9e217210cf54e2774b48b242b62801`；文件选择器显示1080×1920、约49秒。旧缺陷没有原素材哈希，因此仅确认同名及本轮素材记录，不声称已与原上传文件逐字节比对。
4. 原缺陷项目“正向用例-44”的历史9个会话未作覆盖更新；当前项目中还包含其他人工素材，均不作为本轮输入，不额外执行项目全量分析。

**提示词**

以下编号统一加前缀`WEB-WF2-`。保留原指令文本；快捷入口会自动添加“添加字幕：”“翻译配音：”或“总结视频：”前缀。

| 编号 | 入口及参数 | 原提示词 |
|---|---|---|
| TRANSCRIBE-P01 | /添加字幕；不翻译、原文 | 把中文语音转成字幕 |
| TRANSCRIBE-P02 | 手输，无快捷入口 | 把视频里的中文语音转成中文 SRT 字幕文件，不烧录进视频 |
| TRANSCRIBE-P04 | /添加字幕；English、译文 | 把这段中文讲话转成英文字幕，只要独立字幕文件，不烧录视频 |
| TRANSLATE-P01 | /翻译配音；翻译字幕、English、译文 | 把中文讲话翻译成英语字幕 |
| TRANSLATE-P02 | 手输，无快捷入口 | 将这段中文视频翻译成英文字幕文件，保留原声，不生成配音 |
| TRANSLATE-P04 | /翻译配音；翻译字幕、English、双语 | 把中文讲话翻成英文，输出独立的中英双语字幕文件，不要配音、不改动视频 |
| SUMMARY-P01 | /总结视频 | 总结这段视频的主要观点 |
| SUMMARY-P02 | 手输，无快捷入口 | 用中文分三点总结这段关于中西文化差异的视频，不要生成新视频 |
| SUMMARY-P03 | 手输并选择真实@素材候选 | 看看 @American+Vs+Asian+Culture.mp4 主要讲了啥 |

TRANSLATE-P01出现交付形式澄清时，按当前执行规则点击“独立英语字幕文件”一次后继续；不是重试或改写原指令。其余8条无补槽。

**复现步骤**

1. 每条在新会话附加同一原片，按上表选择参数及提示词，发送一次，等待终态；实际执行顺序为总结P01/P02/P03、转写P01/P02/P04、翻译P01/P02/P04。
2. 在每条终态点击SRT或summary.md文件卡下载；不以“已完成”或文件卡出现代替实际下载成功。
3. 读取本机实际下载字节、存档原文件并计算SHA-256；严格UTF-8解码，检查非空、无替换字符U+FFFD或NUL，人工阅读文本内容。
4. 对SRT解析全部字幕块：序号连续1～13、时间格式正确、开始小于结束、时间单调且无重叠、正文非空；中文路径含中文，英文路径为英文，双语路径每条均包含中英文。对总结核对中文可读及三点要点。

**实际结果**

| 分支 | 新会话 | UI耗时 | 产物/实际下载 | 本轮结论 |
|---|---|---:|---|---|
| TRANSCRIBE-P01 | [124231e8](https://app.cinlink.ai/c/124231e8-e39e-4c98-98c9-1ec82f7afa73) | 159秒 | subtitled-video.mp4；未出现SRT卡 | 原SRT路径未覆盖 |
| TRANSCRIBE-P02 | [e81f6b4e](https://app.cinlink.ai/c/e81f6b4e-40cf-49dd-aae8-ce25f0faa14a) | 123秒 | subtitles.srt，1,282字节，13条中文 | Passed（文件范围） |
| TRANSCRIBE-P04 | [a95c1470](https://app.cinlink.ai/c/a95c1470-411c-441a-a984-32f60b918925) | 87秒 | subtitles.srt，1,317字节，13条英文 | Passed（文件范围） |
| TRANSLATE-P01 | [f85e82be](https://app.cinlink.ai/c/f85e82be-d82a-4e39-8dea-321108ecd6df) | 209秒 | subtitles.srt，1,302字节，13条英文；补选一次 | Passed（文件范围） |
| TRANSLATE-P02 | [cc7bdaa7](https://app.cinlink.ai/c/cc7bdaa7-0818-42dc-b86e-ceb1108bae03) | 84秒 | 英文字幕.srt，1,330字节，13条英文 | Passed（文件范围） |
| TRANSLATE-P04 | [7629f2b3](https://app.cinlink.ai/c/7629f2b3-a1e0-4fb4-bf9e-fb14eccc5e78) | 118秒 | 中英双语字幕.srt，2,148字节，13条均双语 | Passed（文件范围） |
| SUMMARY-P01 | [7c0770df](https://app.cinlink.ai/c/7c0770df-dae9-46fc-8340-2d83d753ae26) | 64秒 | summary.md，434字节 | Passed（文件范围） |
| SUMMARY-P02 | [312bd87e](https://app.cinlink.ai/c/312bd87e-0abd-4f19-97a6-830943578c05) | 65秒 | summary.md，416字节，三点总结 | Passed（文件范围） |
| SUMMARY-P03 | [db7dc637](https://app.cinlink.ai/c/db7dc637-2cd5-410c-be76-5da17435df22) | 76秒 | summary.md，404字节，真实@引用 | Passed（文件范围） |

8份文本均严格UTF-8解码成功，无替换字符/NUL。5份SRT共65条、0结构错误，范围0.34～47.16秒。总结均围绕当面拆礼物、握手及碰杯的礼仪文化背景，内容可读；这只是视频中讲者观点的概括，不对历史说法真实性作外部验证。

**预期结果**

总结及独立字幕文件应能直接下载，非空且文本可读，SRT结构可解析，符合所选语言/单语或双语形式。本轮8份实际文本满足这些检查。TRANSCRIBE-P01的独立SRT交付预期与当前MP4结果存在差异，须另行确认现产品交付约定；不能用MP4的可播放性代替SRT文件验收。

**影响**

本轮未复现总结或已交付SRT的下载失败、乱码问题。由于原最明确的TRANSCRIBE-P01 SRT乱码分支未出现相同文件入口，保留整项覆盖缺口，暂不执行“✅AI通过”状态更新。未据此新提下载/编码缺陷，也不把流程交付差异直接归因为编码问题。

本轮未完整人工听审原片逐字转写、翻译准确率或逐帧同步；可读的用词/翻译偏差不等同字符编码乱码。旧账号/旧历史文件、不同系统默认播放器打开行为、后台MIME/下载响应头及内部根因未覆盖。未额外重导出、重新发生成任务以补齐缺口。

**补充**

9次正式初始提交、1次澄清选项、业务重试0。其他人工字幕任务`8f9601bc-1ec5-483a-b02d-6ea2d5b2a537`及其素材非本轮提交；窗口切换后暂停，用户确认停止操作后继续，不计入9条结果。下载目录另有summary(3).md及双语重复下载，前者与已核P02总结哈希相同、双语两副本哈希相同；不将重复下载当新增生成或用例。

原始证据目录`reports/fwxc327-prod-retest-20261111/`：每例draft/submitted/terminal/result/download截图及AX、8份原始文本、解析JSON、`plan.json`、`validation.json`、原缺陷及结束时回读、`manifest.json`。同名下载由浏览器追加编号，报告列产物原名；本地证据加用例编号避免混淆。原始文件/凭据/接口快照留本机，不提交Git；本轮无Git提交推送。

**失败截图**

本轮没有乱码失败截图。以下为实际结果和覆盖缺口证据：

- [SUMMARY-P01文件下载完成](../../reports/fwxc327-prod-retest-20261111/SUMMARY-P01-download-complete.jpg)
- [SUMMARY-P03真实@引用结果](../../reports/fwxc327-prod-retest-20261111/SUMMARY-P03-result.jpg)
- [TRANSCRIBE-P01只交付MP4](../../reports/fwxc327-prod-retest-20261111/TRANSCRIBE-P01-terminal.jpg)
- [TRANSCRIBE-P02独立中文字幕](../../reports/fwxc327-prod-retest-20261111/TRANSCRIBE-P02-terminal.jpg)
- [TRANSLATE-P01交付形式澄清](../../reports/fwxc327-prod-retest-20261111/TRANSLATE-P01-clarification.jpg)
- [TRANSLATE-P04双语文件下载完成](../../reports/fwxc327-prod-retest-20261111/TRANSLATE-P04-download-complete.jpg)
