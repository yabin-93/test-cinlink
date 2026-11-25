# ERYE-199 原10条失败用例复测（2026-11-16）

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正依据与证据](revision-008-registration-scope-20261118.md)。以下旧批次统计为历史。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

**本轮10条已全部复测：3 Passed、6 Failed、1 Blocked。** 新建专用项目及独立工程，008按三种素材使用三个空工程；002/007/008/010/012/064使用仓库现有自动化，029/030/047/048继续PLAN页面执行。用户中途询问进度时保留原导出/任务，未重复发送。

**当前全量63条：25 Passed、6 Failed、1 Blocked、31 Not Applicable、0 Not Run。** 当前1条Blocked为012独立波纹删除不支持，31条不适用继续跳过；不能将“0未执行”理解成所有需求已端到端通过。原10条失败均已有云效关联，共8个缺陷，其中029/047/048共享FWXC-578；本轮没有新建、上传或修改云效状态。

| 用例 | 本轮 | 实际结果 | 原云效关联 |
|---|---|---|---|
| [ERYE199-002](#erye199-002) | Passed | 29.97fps新工程在页面1秒处分割，实际边界1.0010000000000001秒，等于30个30000/1001帧；关联范围及刷新保持，原帧对齐错误未复现。 | [FWXC-479](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9ba270e32cb1770640a69d088f) |
| [ERYE199-007](#erye199-007) | Passed | 同一新工程选中第二视频片段并打开媒体，重开后第二片段选择和媒体面板均恢复；原状态丢失未复现。 | [FWXC-485](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=3fbd5d5e667e7484e372ef0f6e) |
| [ERYE199-008](#erye199-008) | Failed | 视频/音频/图片的素材登记仍没有独立撤销入口；登记与放入分离、三种素材放入及放入撤销均通过。 | [FWXC-486](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1f7044b8c2c88b7d275ef4f643) |
| [ERYE199-010](#erye199-010) | Failed | B拖到原视频轨5秒仍新增第二视频轨，A保留0～10秒、B位于新轨5～15秒，未同轨覆盖。 | [FWXC-487](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=610e1b8f4457eb703db0293ab1) |
| [ERYE199-012](#erye199-012) | Blocked | 普通移动B到7秒正确，Delete删除A后B仍7～12秒，原自动前移缺陷未复现；应用明确不支持独立波纹删除空隙，后半步骤未完成，整例Blocked。 | [FWXC-491](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=759a901c1536c53599d1fd4e74) |
| [ERYE199-029](#erye199-029) | Failed | 混合文字/Emoji/换行及刷新可见；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。 | [FWXC-578](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8997db131fa05bc3a8e6e62ffe) |
| [ERYE199-030](#erye199-030) | Failed | 原生MP4导出仍报“编辑器执行数据不符合正式 v2 协议”；组合SRT+ASS/SSA请求本轮done，真实SRT已下载，两条原文/时间与源SRT一致且无样式；未交付ASS/SSA，应用未明确说明支持情况。旧Unknown or missing editor fields本轮未复现，整例因MP4及样式字幕分支未通过。 | [FWXC-517](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a8dc2ee87914e60ad64d64254c) |
| [ERYE199-047](#erye199-047) | Failed | 2秒图片+A、4秒图片、7秒B、9秒仅原片及刷新预览已核对；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。 | [FWXC-578](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8997db131fa05bc3a8e6e62ffe) |
| [ERYE199-048](#erye199-048) | Failed | 全屏进出及9.17秒→9.17秒位置保持，刷新后原片/10秒时间线正常；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。 | [FWXC-578](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8997db131fa05bc3a8e6e62ffe) |
| [ERYE199-064](#erye199-064) | Passed | 字幕A/B加载后正常显示；媒体→工程素材列表成功加载且无504；返回字幕仍为2秒，工程内容保持，原504未复现。 | [FWXC-577](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c8a5ca57b2162f6850176c6ff1) |

002/007/064原失败本轮未复现；012原普通删除缺陷本轮未复现，但完整用例仍被波纹删除能力阻塞。030旧Unknown or missing editor fields本轮未复现且SRT成功，整例仍有MP4协议错误和ASS/SSA缺口，不能当作整例通过。

[本轮结构化结果](execution-status-failed-ten-rerun-production-20261116.json) · [原图及哈希](evidence-failed-ten-rerun-production-20261116/manifest.json) · [当前全量状态](execution-status-current.md)

脚本适配仅修正现有数字型播放进度操作、面板重复点击和字幕异步加载等待；没有改变用例预期、放宽业务断言或把未实现能力记通过。007/064首次脚本问题只保留本机调试记录，不作为产品失败截图发布。

<a id="erye199-002"></a>
## ERYE199-002：Passed

新工程放入30000/1001fps源片及关联原声；页面定位1秒、选视频、点击分割；核对真实两段源边界并刷新。实际边界1.0010000000000001秒，刷新后仍保持。

新工程：`ERYE199-002-failed-ten-rerun-20261116`；工程ID：`db20af2a-ebba-47aa-9da0-0f96a83172d7`；会话：`b420703b-c825-43e9-857d-12b3ef867b20`。

提示词：不涉及，页面操作。

![002 after-split](evidence-failed-ten-rerun-production-20261116/002-after-split.png)

![002 reopened](evidence-failed-ten-rerun-production-20261116/002-reopened.png)

<a id="erye199-007"></a>
## ERYE199-007：Passed

新工程同轨A0～5秒、B5～10秒；选B，确认媒体面板展开，保存观察后重开同一工程；B选中状态与媒体面板均恢复。首次脚本把已打开面板切成收起，修正后从同一工程继续，不计作产品失败。

新工程：`ERYE199-007-failed-ten-rerun-20261116`；工程ID：`cb5e6cfa-d7e4-45d0-a789-dbb4adcb1da7`；会话：`bd28a944-7712-47d1-983f-9ee35e3e19bc`。

提示词：不涉及，页面操作。

![007 selected-before](evidence-failed-ten-rerun-production-20261116/007-selected-before.png)

![007 reopened](evidence-failed-ten-rerun-production-20261116/007-reopened.png)

<a id="erye199-008"></a>
## ERYE199-008：Failed

视频/音频/图片分别新建独立空工程；通过页面上传登记，检查时间线仍空及撤销入口；再真实拖入时间线并撤销。三类登记撤销均不可用，三类放入和放入撤销通过。

新工程：`ERYE199-008-image-failed-ten-rerun-20261116`；工程ID：`31a9fe51-9e96-44a8-bead-23cd50cc6200`；会话：`d972a183-1854-47e6-b825-f11dee4a38c2`。

子场景：`ERYE199-008-audio-failed-ten-rerun-20261116`；工程`d4f5fd72-0965-4e8c-bff3-e31bdb24fc0b`，会话`5bdeb622-9b81-4a10-a031-4ccd34c1d779`。

子场景：`ERYE199-008-image-failed-ten-rerun-20261116`；工程`31a9fe51-9e96-44a8-bead-23cd50cc6200`，会话`d972a183-1854-47e6-b825-f11dee4a38c2`。

子场景：`ERYE199-008-video-failed-ten-rerun-20261116`；工程`c5621297-5040-496b-b728-663e37aae914`，会话`46bc5a4b-ff4e-4f7d-b3a9-f840306acd4b`。

提示词：不涉及，页面操作。

![008 video-registered](evidence-failed-ten-rerun-production-20261116/008-video-registered.png)

![008 video-placed](evidence-failed-ten-rerun-production-20261116/008-video-placed.png)

![008 audio-registered](evidence-failed-ten-rerun-production-20261116/008-audio-registered.png)

![008 audio-placed](evidence-failed-ten-rerun-production-20261116/008-audio-placed.png)

![008 image-registered](evidence-failed-ten-rerun-production-20261116/008-image-registered.png)

![008 image-placed](evidence-failed-ten-rerun-production-20261116/008-image-placed.png)

<a id="erye199-010"></a>
## ERYE199-010：Failed

新工程A为源0～10秒、时间线0～10秒；页面导入B，将B拖到原视频轨5秒。结果为两条视频轨，A未裁去5～10秒，B从新轨5秒开始；保持失败现场。

新工程：`ERYE199-010-failed-ten-rerun-20261116`；工程ID：`4c20607b-4fea-4dce-b324-894dcb883fcd`；会话：`65040b4a-3531-447e-974f-21be7ca85d67`。

提示词：不涉及，页面操作。

![010 overwrite](evidence-failed-ten-rerun-production-20261116/010-overwrite.png)

![010 failure](evidence-failed-ten-rerun-production-20261116/010-failure.png)

<a id="erye199-012"></a>
## ERYE199-012：Blocked

新工程同轨A0～5秒、B5～10秒；将B拖至7秒，A不动；选A按Delete，B仍7～12秒，源0～5秒保持；随后一次提交显式波纹删除请求。应用明确没有该独立动作，原工程未写入，不以普通移动代替。

新工程：`ERYE199-012-failed-ten-rerun-20261116`；工程ID：`66074c4c-4647-4816-87ff-54c49a497ad4`；会话：`facd97da-45a2-4f9c-83dd-1047ea8d46cc`。

原run：`run_v2_ecb9df321b934556b74fde0d83aabb31`，done；无补槽。实际完整提示词：

> 只编辑当前工程“ERYE199-012-failed-ten-rerun-20261116”（工程ID：66074c4c-4647-4816-87ff-54c49a497ad4），不新建工程、不生成替代视频。执行一次独立的“波纹删除空隙”：仅闭合当前唯一视频片段B（轨道591379bd-bc20-4dc8-80fb-e18b12eb38af，片段e54a478c-a44f-4bd2-9ebd-8bed29ba038c）前方0～7秒的空隙，使B从0秒开始；保留源范围0～5秒、原片ID和片段ID。不用普通移动、普通删除、拼接或生成成片替代波纹删除；如不支持明确说明并保留工程。

![012 after-move](evidence-failed-ten-rerun-production-20261116/012-after-move.png)

![012 after-delete](evidence-failed-ten-rerun-production-20261116/012-after-delete.png)

![012 after-ripple](evidence-failed-ten-rerun-production-20261116/012-after-ripple.png)

![012 ripple-agent-terminal](evidence-failed-ten-rerun-production-20261116/012-ripple-agent-terminal.png)

<a id="erye199-029"></a>
## ERYE199-029：Failed

独立10秒原片/原声，mixed.srt两段，Arial/20px；检查2/7秒及4.5秒空档，刷新，再点击原生导出一次。出现协议错误，未取得可下载MP4。

新工程：`ERYE199-029-failed-ten-rerun-20261116`；工程ID：`072c440d-1fdb-452f-b607-60919a81f045`；会话：`98f76f5a-0f31-42e3-9c3d-0020ac5cc210`。

提示词：不涉及，页面操作。

![029 refreshed](evidence-failed-ten-rerun-production-20261116/029-refreshed.png)

![029 preview-7](evidence-failed-ten-rerun-production-20261116/029-preview-7.png)

![029 failure-export](evidence-failed-ten-rerun-production-20261116/029-failure-export.png)

<a id="erye199-030"></a>
## ERYE199-030：Failed

独立原片/原声及字幕A1～3秒、B6～8秒，24px黄色描边；先点原生MP4导出，出现协议错误；随后一次提交独立SRT+ASS/SSA请求。任务done，真实SRT下载并逐字/时间检查通过；没有ASS/SSA，且未明确说明格式能力。

新工程：`ERYE199-030-failed-ten-rerun-20261116`；工程ID：`def848bd-55d3-41b2-accd-9d529a6b589a`；会话：`f17816fe-07b8-4dd6-89a5-ce3388617011`。

原run：`run_v2_9222fb7e0bfc498092e48e72628f9a5e`，done；无补槽。实际完整提示词：

> 只编辑当前工程“ERYE199-030-failed-ten-rerun-20261116”（工程ID：def848bd-55d3-41b2-accd-9d529a6b589a），不新建工程、不生成替代视频。当前工程已保存24px黄色、黑描边的英语字幕E199 Source Caption A（1～3秒）与E199 Source Caption B（6～8秒）。本轮仅导出这两条现有字幕：先交付一个UTF-8 SRT，保持原文和时间轴且不携带字体颜色等图形样式；再交付应用当前字号24、黄色和描边样式的ASS或SSA字幕文件。这两个字幕导出独立于MP4，请不要重新转写/翻译、重新烧录、生成视频或修改工程/原片/原声。如果当前只支持SRT而不支持ASS/SSA，仍先导出真实可下载SRT，再明确说明样式字幕格式未实现，不把SRT改扩展名冒充样式字幕。

[实际下载的UTF-8 SRT](evidence-failed-ten-rerun-production-20261116/030-exported-subtitles.srt)：两条原文/时间与源SRT一致、不携带样式。无ASS/SSA输出；未以MP4缩略项代替真实下载。

![030 preview-2](evidence-failed-ten-rerun-production-20261116/030-preview-2.png)

![030 failure-export](evidence-failed-ten-rerun-production-20261116/030-failure-export.png)

![030 agent-terminal](evidence-failed-ten-rerun-production-20261116/030-agent-terminal.png)

![030 srt-downloaded](evidence-failed-ten-rerun-production-20261116/030-srt-downloaded.png)

<a id="erye199-047"></a>
## ERYE199-047：Failed

独立10秒V/原声；图片源96×96、中心(64,64)、0～5秒；Export A1～3秒、B6～8秒，24px黄色。查看2/4/7/9秒并刷新后原生导出；出现协议错误，正式文件分支未完成。

新工程：`ERYE199-047-failed-ten-rerun-20261116`；工程ID：`dc6e2a04-08bc-487e-9025-b6f14d05d4ec`；会话：`acd6116e-8c92-43b5-901b-1f3a0d651d38`。

提示词：不涉及，页面操作。

![047 preview-2](evidence-failed-ten-rerun-production-20261116/047-preview-2.png)

![047 preview-4](evidence-failed-ten-rerun-production-20261116/047-preview-4.png)

![047 preview-7](evidence-failed-ten-rerun-production-20261116/047-preview-7.png)

![047 preview-9](evidence-failed-ten-rerun-production-20261116/047-preview-9.png)

![047 failure-export](evidence-failed-ten-rerun-production-20261116/047-failure-export.png)

<a id="erye199-048"></a>
## ERYE199-048：Failed

独立V/原声10秒、640×360/30fps；2秒进入全屏，播放后暂停，退出保持实际9.17秒；刷新并重新定位8秒，原片/时间线保持；原生导出报协议错误，分辨率及正式文件分支未完成。

新工程：`ERYE199-048-failed-ten-rerun-20261116`；工程ID：`f9d30e10-996f-4e04-a4ab-935dbf0ff2ed`；会话：`037c6d34-b66b-44a2-9d0f-fe11b8e72e6e`。

提示词：不涉及，页面操作。

![048 fullscreen-two](evidence-failed-ten-rerun-production-20261116/048-fullscreen-two.png)

![048 fullscreen-eight](evidence-failed-ten-rerun-production-20261116/048-fullscreen-eight.png)

![048 normal-after-fullscreen](evidence-failed-ten-rerun-production-20261116/048-normal-after-fullscreen.png)

![048 refreshed-eight](evidence-failed-ten-rerun-production-20261116/048-refreshed-eight.png)

![048 failure-export](evidence-failed-ten-rerun-production-20261116/048-failure-export.png)

<a id="erye199-064"></a>
## ERYE199-064：Passed

独立原片/原声及字幕A/B；等待A/B内容加载并定位2秒；字幕→媒体→工程→字幕。工程素材成功加载，无504，返回字幕2秒/源画面保持。首次空列表读取太早，仅修正等待，未另建工程。

新工程：`ERYE199-064-failed-ten-rerun-20261116`；工程ID：`5413ad2e-dfee-4399-885f-e9cf2cb600d4`；会话：`508c1ce1-a6e8-4e8b-aca0-03455e3a6c3c`。

提示词：不涉及，页面操作。

![064 captions-at-two](evidence-failed-ten-rerun-production-20261116/064-captions-at-two.png)

![064 media-at-two](evidence-failed-ten-rerun-production-20261116/064-media-at-two.png)

![064 returned-captions](evidence-failed-ten-rerun-production-20261116/064-returned-captions.png)

## 校验与边界

单个已受理任务未重发，原生导出每个场景只点一次；无补槽、无computer-use、无新依赖。媒体/工程接口仅做夹具准备与结果回读，目标操作由页面执行。原失败、截图及云效同步回执保留历史；本轮失败原图仅本地归档，没有上传覆盖云效旧证据。
