# ERYE-199 仓库自动化接入与生产执行（001～010）

日期：2026-11-13。按用户要求001～005也接入，当前001～010均有仓库内入口；006完整蒙版/锚点验收仍受能力前置阻塞。使用Ego Lite有头浏览器、单TaskSpace 3，新建专用测试项目及逐例独立工程，串行、零重试，不使用computer-use。

本轮最终状态：**5 Passed、4 Failed、1 Blocked**；其余58条不计本轮执行。[脚本和命令](automation.md)。离线安全/时间/夹具检查5项通过。失败不因接入改绿，FWXC-479不更改，未写云效或推送。

| 用例 | 自动化 | 本轮状态 | 实际结果 |
|---|---|---|---|
| [ERYE199-001](#erye199-001) | AUTO | Passed | 四类对象、四个画面点、原声及刷新恢复断言通过 |
| [ERYE199-002](#erye199-002) | AUTO | Failed | 新工程在1秒分割仍保存1.000秒，未按30000/1001帧边界对齐；FWXC-479保留。 |
| [ERYE199-003](#erye199-003) | AUTO | Passed | VFR独立PTS、跨帧率区间连续播放及刷新恢复通过 |
| [ERYE199-004](#erye199-004) | AUTO | Passed | 10秒源片2倍速时间线5秒，2秒映射源4秒 |
| [ERYE199-005](#erye199-005) | AUTO | Passed | 页面裁头、撤销、重做及刷新后的源范围/原声正确 |
| [ERYE199-006](#erye199-006) | BLOCKED（前置探测已接入） | Blocked | 当前明确不支持独立可编辑蒙版和局部锚点；旋转缩放已准备，完整坐标前置不足。 |
| [ERYE199-007](#erye199-007) | AUTO | Failed | 重开后第二片段选择被清空，媒体面板回到字幕，选择/面板状态均未恢复。 |
| [ERYE199-008](#erye199-008) | AUTO | Failed | 三类素材登记与时间线放入分离，放入均可撤销；视频/音频/图片的登记均没有独立撤销入口。 |
| [ERYE199-009](#erye199-009) | AUTO | Passed | 同源两实例效果隔离且刷新保持 |
| [ERYE199-010](#erye199-010) | AUTO | Failed | 将B拖到原视频轨5秒后新增视频轨；A仍0～10秒，B在新轨5～15秒，未同轨覆盖保留A0～5秒。 |

执行期间修正了三类脚本/输入准备问题：空工程需从“选择媒体”进入、Ego二进制stdout需改为落盘解码、VFR连续观察需使用页面播放按钮并等待真实呈现帧。009首次未给轨道ID时Agent没有执行修改，已补全唯一目标信息在新工程继续验证。原始尝试均留在本机reports，不据这些准备或采样问题判产品失败；本报告用最终有效执行结果。未出现需要填写的补槽表单；已受理任务没有重复发送。

旧版001/003/005的Graphic、PR tick、源时间关键帧缺口及历史Blocked继续保留；本轮采用优化版。组合截图仍用于显示质量人工复核；脚本的对象、源帧、音频和保存断言按各例执行。

003最终采样21个呈现回调，源PTS均有效、递增并跨过5秒，五点定位及刷新比对均通过。浏览器回调采样频率受窗口呈现影响，不以回调数反推源帧率，也不据此声明逐帧播放无掉帧。001/003原声解码有Opus末包警告，但均取得足量有效PCM并通过440Hz频率检查；这是测试采样的边界，不将其记为产品音频缺陷。

定位精度边界保留：005在时间线3秒处实际媒体时间2.99秒、呈现源帧PTS 2.966667秒（早一帧），8秒处为8.000秒；001部分定位同样读到前一帧。本轮001/005按组合对象、源范围、撤销/重做和原声等业务范围核验，不声明帧级精准定位通过。002仍独立记录帧对齐失败；原始读帧JSON完整保留，没有把误差改写为0。

## 逐例证据

<a id="erye199-001"></a>

### ERYE199-001：Passed

**前置及操作：**新工程准备四类对象→2/4/7/9秒核对帧及图文出现→刷新再核对→实际预览原声采样。

**实际结果：**四类对象、四个画面点、原声及刷新恢复断言通过

实际批次：`erye199-auto-2026-11-13T08-03-53-949Z`；工程：`ef5511c7-0b57-4021-acb4-7a66813e3cac`；会话：`32257c22-d42e-4f91-9815-8a2258954036`。

**截图：** [001-initial-2.png](evidence-automation-20261113/001-initial-2.png) · [001-initial-4.png](evidence-automation-20261113/001-initial-4.png) · [001-initial-7.png](evidence-automation-20261113/001-initial-7.png) · [001-initial-9.png](evidence-automation-20261113/001-initial-9.png) · [001-reopened-2.png](evidence-automation-20261113/001-reopened-2.png) · [001-reopened-4.png](evidence-automation-20261113/001-reopened-4.png) · [001-reopened-7.png](evidence-automation-20261113/001-reopened-7.png) · [001-reopened-9.png](evidence-automation-20261113/001-reopened-9.png)

<a id="erye199-002"></a>

### ERYE199-002：Failed

**前置及操作：**新建29.97fps工程→选择视频→键盘定位1秒→页面分割→回读帧边界→刷新。

**实际结果：**新工程在1秒分割仍保存1.000秒，未按30000/1001帧边界对齐；FWXC-479保留。

实际批次：`erye199-auto-2026-11-13T07-52-54-814Z`；工程：`4ff84599-c72c-46aa-b07b-0dfbe451a2e2`；会话：`89d4912c-b432-4d9f-8148-7f3cb897f84a`。

**截图：** [002-after-split.png](evidence-automation-20261113/002-after-split.png) · [002-failure.png](evidence-automation-20261113/002-failure.png) · [002-reopened.png](evidence-automation-20261113/002-reopened.png)

![ERYE199-002 本轮真实失败/阻塞截图](evidence-automation-20261113/002-failure.png)

<a id="erye199-003"></a>

### ERYE199-003：Passed

**前置及操作：**独立VFR原片及ffprobe PTS→五点定位→刷新再定位→页面连续播放跨5秒→原声采样。

**实际结果：**VFR独立PTS、跨帧率区间连续播放及刷新恢复通过

实际批次：`erye199-auto-2026-11-13T08-03-53-949Z`；工程：`339350c5-8be4-4eed-885b-321d684d6def`；会话：`8467876e-be30-4406-9800-8ad15b0bd718`。

**截图：** [003-initial-2.png](evidence-automation-20261113/003-initial-2.png) · [003-initial-4.9.png](evidence-automation-20261113/003-initial-4.9.png) · [003-initial-5.1.png](evidence-automation-20261113/003-initial-5.1.png) · [003-initial-8.png](evidence-automation-20261113/003-initial-8.png) · [003-initial-9.8.png](evidence-automation-20261113/003-initial-9.8.png) · [003-reopened-2.png](evidence-automation-20261113/003-reopened-2.png) · [003-reopened-4.9.png](evidence-automation-20261113/003-reopened-4.9.png) · [003-reopened-5.1.png](evidence-automation-20261113/003-reopened-5.1.png) · [003-reopened-8.png](evidence-automation-20261113/003-reopened-8.png) · [003-reopened-9.8.png](evidence-automation-20261113/003-reopened-9.8.png)

<a id="erye199-004"></a>

### ERYE199-004：Passed

**前置及操作：**新工程源0～10秒、2倍速→时间线时长5秒→时间线2秒对应源4秒→刷新。

**实际结果：**10秒源片2倍速时间线5秒，2秒映射源4秒

实际批次：`erye199-auto-2026-11-13T07-52-54-814Z`；工程：`94bebb2b-d106-4601-a0ba-67318559c505`；会话：`0cdf1798-ce46-4444-a009-0041eab41359`。

**截图：** [004-rate2.png](evidence-automation-20261113/004-rate2.png)

<a id="erye199-005"></a>

### ERYE199-005：Passed

**前置及操作：**新工程原片及原声→可见手柄裁头2秒→检查源2～10秒→撤销→重做→刷新及原声核对。

**实际结果：**页面裁头、撤销、重做及刷新后的源范围/原声正确

实际批次：`erye199-auto-2026-11-13T07-52-54-814Z`；工程：`c69c5c5a-26c2-4d13-a70a-fe5ec6da7094`；会话：`bf965b50-22af-4622-b976-b4632bab05b7`。

**截图：** [005-redo.png](evidence-automation-20261113/005-redo.png) · [005-reopened.png](evidence-automation-20261113/005-reopened.png) · [005-trimmed.png](evidence-automation-20261113/005-trimmed.png) · [005-undo.png](evidence-automation-20261113/005-undo.png)

<a id="erye199-006"></a>

### ERYE199-006：Blocked

**前置及操作：**新工程准备旋转30度、缩放75%、中心(320,180)→请求独立100×60矩形蒙版/局部锚点→回读回复及工程。

**实际结果：**当前明确不支持独立可编辑蒙版和局部锚点；旋转缩放已准备，完整坐标前置不足。

实际批次：`erye199-auto-2026-11-13T07-47-31-582Z`；工程：`c0fa872a-d4fb-43c3-aa87-8280b1e21af7`；会话：`82929bcd-90d2-44e1-8a2e-9f72c4c6257c`。

**完整提示词：**

```text
只编辑当前工程“ERYE199-006-2026-11-13T07-47-31-582Z”（工程ID：c0fa872a-d4fb-43c3-aa87-8280b1e21af7），不新建工程、不生成替代视频。测试准备：保留当前片段中心位置(320,180)、旋转30度、缩放75%，为该视频片段添加独立可编辑矩形蒙版，宽100、高60，位于输入局部坐标中心。不得用图片、水印、字幕、裁剪或生成成片替代。如当前不支持蒙版或锚点，请明确说明并保留原工程。
```

**原任务结果：**done；`run_v2_f51a054019c34396a92781665eff6a99`。

当前提供的接口不支持为视频片段添加独立可编辑矩形蒙版，也没有可编辑的输入局部坐标锚点参数，因此无法创建你要求的居中100×60蒙版。视频矩形批注不是蒙版，不能替代。

本次不安排任何修改，保留工程“ERYE199-006-2026-11-13T07-47-31-582Z”（c0fa872a-d4fb-43c3-aa87-8280b1e21af7）；不会改动片段位置、旋转或缩放，不新建工程，也不使用图片、水印、字幕、裁剪或生成视频替代。

现有相关工作流包括视频内容分析、镜头拆解、具体视频剪辑、画质增强和精华剪辑，但均不具备本次所需的蒙版能力。需要具备视频片段蒙版及局部坐标锚点编辑能力的接口才能继续。

**截图：** [006-agent-terminal.png](evidence-automation-20261113/006-agent-terminal.png) · [006-before-submit.png](evidence-automation-20261113/006-before-submit.png) · [006-failure.png](evidence-automation-20261113/006-failure.png) · [006-transformed.png](evidence-automation-20261113/006-transformed.png)

![ERYE199-006 本轮真实失败/阻塞截图](evidence-automation-20261113/006-failure.png)

<a id="erye199-007"></a>

### ERYE199-007：Failed

**前置及操作：**新工程同源两个实例→选择第二片段→切换媒体面板→截图→刷新重开→比对选择和面板。

**实际结果：**重开后第二片段选择被清空，媒体面板回到字幕，选择/面板状态均未恢复。

实际批次：`erye199-auto-2026-11-13T07-47-31-582Z`；工程：`95e7732b-e8b1-4b4b-9b64-7aa0b483aa5b`；会话：`48ceb312-380a-43fc-9762-9158814fcbb2`。

**截图：** [007-failure.png](evidence-automation-20261113/007-failure.png) · [007-reopened.png](evidence-automation-20261113/007-reopened.png) · [007-selected-before.png](evidence-automation-20261113/007-selected-before.png)

![ERYE199-007 本轮真实失败/阻塞截图](evidence-automation-20261113/007-failure.png)

<a id="erye199-008"></a>

### ERYE199-008：Failed

**前置及操作：**视频/音频/图片各建空工程→选择媒体上传登记→核对时间线仍空与撤销入口→拖入→核对轨道→撤销放入。

**实际结果：**三类素材登记与时间线放入分离，放入均可撤销；视频/音频/图片的登记均没有独立撤销入口。

实际批次：`erye199-auto-2026-11-13T07-52-54-814Z`；工程：`0b3e4359-d7bc-4fa9-b70a-2610cad1c015`；会话：`33421029-ed7c-4290-9903-221213a74ca0`。

**截图：** [008-audio-placed.png](evidence-automation-20261113/008-audio-placed.png) · [008-audio-registered.png](evidence-automation-20261113/008-audio-registered.png) · [008-failure.png](evidence-automation-20261113/008-failure.png) · [008-image-placed.png](evidence-automation-20261113/008-image-placed.png) · [008-image-registered.png](evidence-automation-20261113/008-image-registered.png) · [008-video-placed.png](evidence-automation-20261113/008-video-placed.png) · [008-video-registered.png](evidence-automation-20261113/008-video-registered.png)

![ERYE199-008 本轮真实失败/阻塞截图](evidence-automation-20261113/008-failure.png)

<a id="erye199-009"></a>

### ERYE199-009：Passed

**前置及操作：**新工程同源A/B两实例→提供工程/轨道/片段唯一标识→只改A不透明度50%、B保持100%→回读、预览及刷新。

**实际结果：**同源两实例效果隔离且刷新保持

实际批次：`erye199-auto-2026-11-13T07-58-52-369Z`；工程：`752d9b16-8856-4c39-8ab2-b26d01b935bd`；会话：`ded3cc88-e8eb-4ce9-9d7c-bb4d9e5f6dd9`。

**完整提示词：**

```text
只编辑当前工程“ERYE199-009-2026-11-13T07-58-52-369Z”（工程ID：752d9b16-8856-4c39-8ab2-b26d01b935bd），不新建工程、不生成替代视频。当前视频轨道ID为838a4196-07a6-4d09-a7cf-a97b12365bec。仅将该轨道视频实例A（片段ID e62e41de-a261-437c-ab59-72335c163af0，时间线0～5秒）的不透明度设为50%；同轨实例B（片段ID 303a213d-bbf8-4e01-bb80-1e5c066a2e0c，时间线5～10秒）保持100%。两个实例使用同一源文件，只修改A，不改变B、源范围、位置、速度或其他属性。无需再确认。
```

**原任务结果：**done；`run_v2_9ca768e26730452ab45880d12b77044d`。

将仅在指定现有工程中把实例 A 的不透明度设为 50%，保持实例 B 的 100% 不透明度及其他属性不变。不新建工程，不生成替代视频，也不导出。

**截图：** [009-agent-terminal.png](evidence-automation-20261113/009-agent-terminal.png) · [009-before-submit.png](evidence-automation-20261113/009-before-submit.png) · [009-effect-2.png](evidence-automation-20261113/009-effect-2.png) · [009-effect-7.png](evidence-automation-20261113/009-effect-7.png) · [009-effect-result.png](evidence-automation-20261113/009-effect-result.png)

<a id="erye199-010"></a>

### ERYE199-010：Failed

**前置及操作：**新工程A0～10秒→登记另一原片B→将B拖到同视频轨5秒位置→检查轨道和源范围。

**实际结果：**将B拖到原视频轨5秒后新增视频轨；A仍0～10秒，B在新轨5～15秒，未同轨覆盖保留A0～5秒。

实际批次：`erye199-auto-2026-11-13T07-47-31-582Z`；工程：`0959275d-2032-4a4a-baca-6ba1f929aee7`；会话：`13a8af9e-2037-4ca4-979a-f85f4a0cd6d2`。

**截图：** [010-failure.png](evidence-automation-20261113/010-failure.png) · [010-overwrite.png](evidence-automation-20261113/010-overwrite.png)

![ERYE199-010 本轮真实失败/阻塞截图](evidence-automation-20261113/010-failure.png)

[证据SHA256清单](evidence-automation-20261113/manifest.json)。完整原片、音频和原始日志在对应reports目录，仅留本机；公开证据不含签名URL和登录态。

<!-- ERYE199-CONFIRMED-YUNXIAO-20261113 -->
本轮确定失败的007/008/010已提交云效：007→[FWXC-485](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=3fbd5d5e667e7484e372ef0f6e)；008→[FWXC-486](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1f7044b8c2c88b7d275ef4f643)；010→[FWXC-487](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=610e1b8f4457eb703db0293ab1)。三条均为“🤔AI提缺陷”，7张截图上传并嵌入、15个附件回读核验通过。002沿用FWXC-479，当前“待确认”、负责人余航，只读核验未改动。006仍为前置Blocked，不提交；业务执行状态5 Passed/4 Failed/1 Blocked保持。
<!-- /ERYE199-CONFIRMED-YUNXIAO-20261113 -->
