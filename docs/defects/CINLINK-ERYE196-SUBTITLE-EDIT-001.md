# CINLINK-ERYE196-SUBTITLE-EDIT-001 · [FWXC-317](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e8fa399eb441823ee3171cd4b8)

2026-11-05按用户“整理成缺陷同步到云效”提交。按共同业务现象合并1条，覆盖ERYE196-005～008的5个实际run。优先级中、严重程度3-一般；负责人采用项目创建默认值，回读为牛诗晴。其他既有缺陷未修改、未评论。正文、字段、8张PNG截图和1份脱敏JSON（共9附件）均回读核验；截图ID与正文fileIdentifier逐一对应，文件字节数与本机原文件一致。

**现象**

在Web预发通过Agent修改已保存工程的字幕原文，任务受理后最终失败，显示`Run failed before execution.`，目标字幕未按指令更新。明确目标、填写工程澄清、重新选择现存字幕以及发送后切换工程四种场景均出现此现象。关联ERYE196-005～008，共5个实际run；按共同业务现象合并跟踪，根因尚未确认。

**前置步骤**

1. 使用有工程编辑及Agent任务权限的测试账号yabinc18登录[Web预发会话](https://staging-app.cinlink.ai/c/bb4f1a9a-c3fb-4de0-aa25-f48f15621303)。会话ID为`bb4f1a9a-c3fb-4de0-aa25-f48f15621303`。在同一会话执行以下各场景；场景B需保留场景A明确指定005工程的会话历史。
2. 打开“视频编辑器”，通过工程名称下拉/工程管理进入下表对应独立测试工程。本批使用当前工程媒体准备独立副本；原始素材为“张雅婷(Tin)分享的视频.mp4”，约120.33秒，有视频、原声音轨及148条原文字幕。没有独立译文轨，不要求额外准备配音、BGM或水印。
3. 核对可编辑字幕：目标C1为6.64～7.12秒、原文solution.；另一个现存目标C2为2.02～2.22秒、原文Hello。使用原文角色；不要把画面上已有的烧录文字当可编辑字幕。
4. 各场景均不@视频、不重新上传素材；发送前确认当前工程名称、目标原文/时间及已保存状态，并记录非目标字幕、视频和声音。场景A/B不依赖前一任务修改成功。
5. 场景C完整双页删除回归需要C1存在的独立基线；本次保留的007工程已处于删除后的版本2（时间槽保留为空），可从旧目标请求或重选C2步骤开始复核。完整重走删除过程前应先恢复/重新准备C1，核对原文和时间后再操作。
6. 场景D准备两个可辨识工程：A的目标为solution.；B在相同时段为B工程保留字幕。先分别确认保存及各自基线，再回到A发送指令。

| 场景工程 | 实际工程ID | 本次保存状态 |
|---|---|---|
| E196-005-20261105 | `cd187dfd-9893-4f63-adf2-9a09e818c982` | 目标为solution.；版本2 |
| E196-006-20261105 | `4639a4b7-6f7e-4d30-88d6-efe152216bd8` | 目标为solution.；版本1 |
| E196-007-20261105 | `80866f2a-0015-40ba-b127-b0f42511f9bc` | C1已按Delete清空，保留空槽；版本2 |
| E196-008A-20261105 | `47cc5521-d3a2-4f68-9618-5ddf864cd7e8` | 目标为solution.；版本1 |
| E196-008B-20261105 | `3c982cfc-1e0a-4dfa-b8b8-4e952ee2073d` | 目标为B工程保留字幕；版本2 |

**提示词**

场景A：明确目标，一次完整发送：

```text
只把当前工程“E196-005-20261105”中6.64～7.12秒、原文为“solution.”的这一条字幕原文改为“欢迎使用 CinLink”，译文、其他字幕、声音和视频不改。
```

场景B：原始模糊指令，提交后按实际澄清填写：

```text
把这条字幕原文改成欢迎使用 CinLink
```

场景C第一阶段：旧目标指令：

```text
只修改当前工程“E196-007-20261105”中6.64～7.12秒、刚才原文为“solution.”的那条字幕，将原文改为“欢迎使用 CinLink”。如果该条字幕已删除或不存在，请明确提示目标失效，不要新建字幕，也不要修改其他字幕；译文、声音和视频不改。
```

场景C第二阶段：重新选择现存目标：

```text
重新选择当前工程“E196-007-20261105”中仍存在的2.02～2.22秒、原文为“Hello”的这一条字幕，只把它的原文改为“引用修复测试”。不要恢复已删除的6.64～7.12秒字幕，不修改其他字幕、译文、声音或视频。
```

场景D：固定A目标后切换工程：

```text
只把当前工程“E196-008A-20261105”中6.64～7.12秒、原文为“solution.”的这一条字幕原文改为“A目标固定”，译文、其他字幕、声音和视频不改。发送后即使我切换到另一个工程，也只能修改本次明确指定的工程A。
```

场景B实际澄清填写：问题为“选择目标工程：此前的 E196-005 或当前的 E196-006”，选择“E196-006-20261105（本次当前时间线所在工程）”，值`4639a4b7-6f7e-4d30-88d6-efe152216bd8`，点击提交；本次提交返回200，继续同一run，未点击失败重试。

**复现步骤**

场景A / ERYE196-005：
1. 打开005工程，在字幕面板核对solution.及6.64～7.12秒，记录视频/声音及其他字幕基线。
2. 一次发送场景A完整提示词，等待任务终态。
3. 检查任务卡片和目标字幕，再刷新页面、重新进入同工程，核对实际保存内容。

场景B / ERYE196-006：
1. 在同一会话保留场景A明确指定005工程的历史，切换到006工程，取消字幕选择。当前存在多条字幕，不预先指定“这条”的目标。
2. 发送场景B原始指令。出现工程选择澄清后，先核对工程尚未被修改。
3. 按上方实际填写值选择当前006工程并点击提交，继续等待同一任务完成；若回归出现新的目标澄清，再明确给出6.64～7.12秒及原文solution.继续。
4. 核对字幕文字、非目标内容及刷新后的保存结果。本批只有工程选择这一待填项。

场景C / ERYE196-007：
1. T1打开007工程并记录C1时间/原文；T2打开同一工程，在时间线上选择solution.，按Delete并等待保存。核对C1文字消失（页面保留空时间槽）、C2的Hello仍存在。使用本次已保存版本2时，可直接从下一步开始。
2. 回T1，发送场景C第一阶段旧目标指令，检查是否明确提示失效/重新选择，核对C2及其他内容是否被误改。
3. 刷新T1，明确选择现存Hello（2.02～2.22秒），发送场景C第二阶段完整指令。此为不同目标的后续用例步骤。
4. 等待终态并核对Hello是否变为引用修复测试；检查删除的solution.没有恢复、其他内容没有变化，刷新后再次确认。

场景D / ERYE196-008：
1. 核对A的solution.与B的B工程保留字幕后，打开A，发送场景D完整指令。
2. 任务受理并仍在运行/思考期间，通过工程名称下拉切到B。本次为受理约4秒后切换。
3. 保持B页面等待原任务终态，记录是否被抢回A以及B字幕是否改变。
4. 返回A，核对指定字幕是否变为A目标固定，再核对A/B保存内容。不能以A/B都没有变化认定修改成功。

**实际结果**

- 5个任务均已受理，最终状态failed，错误原文均为`Run failed before execution.`；截图中字幕更新步骤失败，目标改文未完成。该文字是实际返回，不据其推断所有读取步骤都未运行。
- 005：目标仍为solution.，刷新后内容及版本2保持。006：回答前未改，填写并提交工程澄清后仍失败；目标未更新，内容及版本1保持。
- 007：旧目标请求仅返回通用失败，没有明确失效/重选反馈；重新选择现存Hello后仍失败，Hello未变为引用修复测试。版本2及删除后内容保持，未观察到其他字幕误改。
- 008：最终仍停留B，B字幕保持B工程保留字幕；A字幕仍为solution.，没有完成A目标固定。A版本1、B版本2及各自内容保持。

| 场景 | 实际run_id | 最终状态 |
|---|---|---|
| 005 | `run_v2_2e17cd5b18ed4c158ea695a02a01d7ab` | failed |
| 006 | `run_v2_0348525dda7447e599e70097ce88ccf4` | failed |
| 007-stale | `run_v2_1272701c2d844381a769a17383d33822` | failed |
| 007-reselect | `run_v2_065d0ed5686849828950e6b951a51df6` | failed |
| 008 | `run_v2_3ce7c47bdec64f509ea3de78497552fe` | failed |

**预期结果**

1. 目标已通过工程、原文和时间唯一明确时，应完成指定单条原文修改，保存后刷新仍一致；译文、其他字幕、声音和视频保持。
2. 真实歧义可以先澄清；回答前不修改，填写后应继续校验并完成明确目标，不能只停留在通用执行失败。
3. 删除/失效目标应明确提示并避免误改其他字幕；重新选择现存目标后，应完成新的指定改文。
4. 发送后切换到B，任务仍只修改发送时明确的A，B内容不变，后台完成不抢走B视图。

**影响**

用户无法通过Agent完成单条字幕原文修改；补充明确参数、填写澄清及重新选择目标均未跑通，相关重选恢复和跨工程修改场景不能完成验收。

**补充**

- 关联标识：CINLINK-ERYE196-SUBTITLE-EDIT-001；需求[ERYE-196《编辑器能力接入(web)》](https://devops.aliyun.com/projex/req/ERYE-196)，关联用例ERYE196-005～008。
- 按共同的改文失败现象合并跟踪，根因待确认；不依据PRD拟定接口名或字段差异报错。没有把“未误改B”当作A实际写入成功的证明。
- 007页面Delete后文字消失但空时间槽保留，未验证底层对象物理删除；旧目标精确失效分支仍有该边界。原用户工程版本9及完整内容保持，测试独立副本保留供回归。
- 009真实读取请求的无效目标校验已通过，本次不报缺陷。费用/积分未独立核验；无新增成片可判声画效果。

**失败截图**

以下均为本批真实浏览器原始截图，按场景标注；日志与脱敏JSON作为补充，未加工画面。

005：工程005中已明确时间和原文，字幕更新步骤失败，solution.仍未改变。

![ERYE196-005-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=60fedf89c52c0a00da1cfed5e4)

006：系统要求在005与006中选择目标工程；本次回答前工程内容未修改。

![ERYE196-006-clarification.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0a61e442460c34220cf19fd350)

006：实际选中当前E196-006-20261105工程，随后点击提交继续同一任务。

![ERYE196-006-clarification-filled.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=28f6dea704d23515d54996748a)

006：填写并提交工程澄清后，字幕更新仍失败；solution.未改变。

![ERYE196-006-after-answer-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6f21b0ca748ac28e6d2c2dc8e1)

007阶段一：solution.经页面Delete后文字消失、时间槽保留；旧目标请求返回通用失败。

![ERYE196-007-stale-target-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d84db091e46afa25f06de09ee3)

007阶段二：重新选择现存Hello并发出完整指令后仍失败，未更新为引用修复测试。

![ERYE196-007-reselected-target-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=172491d453c0d25adc17d6412d)

008：在A发起修改并切B，最终仍显示B工程，B工程保留字幕未变；任务失败。

![ERYE196-008-failed-project-B.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=a84fe795a0a170021563d7b77c)

008：失败后回A检查，solution.未变为A目标固定；A预期修改未完成。

![ERYE196-008A-target-unchanged.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4a3a36b22e785f0b408312053b)


## 本机证据及截图清单

同步底稿：`reports/erye196-005-008-yunxiao-20261105/`；原始测试底稿：`reports/erye196-005-009-20261105/`。原始日志和传输响应仅本机保存。

| 场景/文件 | 原始测试截图 | SHA256 |
|---|---|---|
| 005：工程005中已明确时间和原文，字幕更新步骤失败，solution.仍未改变。 | [ERYE196-005-failed.png](../../reports/erye196-005-009-20261105/case-005-failed.png) | `1f50e7593806f501fbb07d39ac619966b483b3e0210c22b444e6fb6d3a14c33e` |
| 006：系统要求在005与006中选择目标工程；本次回答前工程内容未修改。 | [ERYE196-006-clarification.png](../../reports/erye196-005-009-20261105/case-006-clarification-before-answer.png) | `f0c7ba009eb16c39b89a1d049fb3f980ae575d631a69682382cfc1625c8076ea` |
| 006：实际选中当前E196-006-20261105工程，随后点击提交继续同一任务。 | [ERYE196-006-clarification-filled.png](../../reports/erye196-005-009-20261105/case-006-clarification-filled.png) | `eaead1bc4ab7fa062e901741ec3699e82d6104518c2a81aa5403498056e862c5` |
| 006：填写并提交工程澄清后，字幕更新仍失败；solution.未改变。 | [ERYE196-006-after-answer-failed.png](../../reports/erye196-005-009-20261105/case-006-failed-after-clarification.png) | `5f8bf5eef549bc4f79b3738c83057787f8d6cd07da384668fa73b62aef9f49aa` |
| 007阶段一：solution.经页面Delete后文字消失、时间槽保留；旧目标请求返回通用失败。 | [ERYE196-007-stale-target-failed.png](../../reports/erye196-005-009-20261105/case-007-stale-target-failed.png) | `6775ce358d52aca352b670691e2c3f64d11c816db4045eaccdda19d2f9400649` |
| 007阶段二：重新选择现存Hello并发出完整指令后仍失败，未更新为引用修复测试。 | [ERYE196-007-reselected-target-failed.png](../../reports/erye196-005-009-20261105/case-007-reselected-target-failed.png) | `5c889cf6e24d49e23204699aef34166aabf26633a4ca3c7bc503dab68236d14a` |
| 008：在A发起修改并切B，最终仍显示B工程，B工程保留字幕未变；任务失败。 | [ERYE196-008-failed-project-B.png](../../reports/erye196-005-009-20261105/case-008-failed-still-project-B.png) | `209922f3caa4631aadb90167794b87d3fa62905e5a4eae25c0daddb3b6a1be82` |
| 008：失败后回A检查，solution.未变为A目标固定；A预期修改未完成。 | [ERYE196-008A-target-unchanged.png](../../reports/erye196-005-009-20261105/case-008A-target-unchanged-after-failure.png) | `b1ec1ca41fb1e1f0e86eb672ba43932967a01dea22081f31f5094440e8d227e7` |

所有副本与原截图哈希一致，未加工画面。8张PNG已上传并嵌入云效正文末尾；脱敏JSON保留5条完整指令、run/会话/工程定位及验证边界，不含凭据或签名链接。

本次只同步缺陷，没有新业务执行；005～008仍Failed、009仍Passed，196合计3 Passed / 2 Not Applicable / 4 Failed / 125 Not Run。007空槽及008未写入A的边界按原报告保留，未变更验收结果。
