# CINLINK-DESIGN-ERYE196-004-001 · [FWXC-315](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9a1f2aebb4f446ec323afa0493)

2026-11-05，按用户限定的ERYE196-001～004范围整理并同步。新建1条需求/设计差异缺陷，既有缺陷未更新或评论。优先级中、严重程度3-一般，使用项目默认负责人牛诗晴及现有迭代。3张原始截图全部上传、嵌入并回读核验，另附1份脱敏证据JSON，共4个附件。004保持本轮Not Applicable，未改为产品失败；目标提示词未发送，无本次AI运行。

**现象**

ERYE-196评论第03节要求将编辑器中选中的片段、字幕、轨道或时间范围“引用到 Agent”，在输入框显示对象名称与时间范围，并允许移除引用。最新已确认的主编辑页面未展示这组对象引用的入口、添加后标签和移除后的状态，需求与设计的验收范围不一致。

本项记录为需求与设计表达差异，待产品/设计评审；不据此认定当前页面违反已确认设计或确认Agent执行错误。

**前置步骤**

1. 使用有权限查看资料的项目成员账号，打开[ERYE-196《编辑器能力接入(web)》](https://devops.aliyun.com/projex/req/ERYE-196)，阅读评论23563211第03节“用户流程与编辑器交互”。对应原用例ERYE196-004，WFR01/13、WAC01。
2. 打开[最新已确认主页面](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc/Workspace-System---Design?node-id=1501-27245)，重点对照[Captions主页面](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc/Workspace-System---Design?node-id=1528-28905)和[Media主页面](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc/Workspace-System---Design?node-id=1501-27513)。本轮验收基准由用户确认为最新设计稿。
3. 如核对实测补充截图：staging有头Chrome，账号yabinc18，当前会话bb4f1a9a-c3fb-4de0-aa25-f48f15621303，工程3bc78d71-8cf6-4caf-b347-a2f19962f471；素材为“张雅婷(Tin)分享的视频.mp4”。工程已存在视频、原声音频及148条原文字幕，独立复测基线为版本9。选择对象时无需重新上传或使用文件级@。
4. 实测没有准备原004完整B0的独立BGM；原声音频选择不等同于BGM引用移除。当前设计差异可直接通过资料对照复核，不依赖发送Agent任务。

**提示词**

原004目标指令，未发送，仅供设计补齐后的回归使用：

> 仅把已引用的C1原文改为欢迎使用 CinLink，其他内容不变

发送前必须按用例基线建立C1等对象并完成有效引用，不能在引用未建立时直接发送。

**复现步骤**

1. 阅读评论第03节：选中片段/字幕/轨道/时间范围，通过“引用到 Agent”加入输入框；引用标签显示对象名称和时间范围，允许移除。
2. 在已确认主页面核对时间线与Agent输入框，查找对象选择后进入引用的交互说明，以及引用后的标签样式/内容。
3. 对照原004组合流程：引用A片段、C1原文、BGM和4～6秒范围；移除BGM引用后保留其他对象。核对设计是否给出可辨识的引用标签、时间范围和单独移除状态。
4. 对照实际补充观察：在上述版本9工程中选择视频，按页面提示Shift多选原声音频和Hello字幕（2.02～2.22秒），再Shift反选音频，检查Agent输入框；检查字幕右键、时间尺操作及文件级@候选，随后恢复选区和输入框。该步骤已在004复测执行，截图保留。

**实际结果**

- 评论明确要求对象引用及可移除标签；当前核对的已确认主页面未展示对应入口、引用完成及移除后的完整状态，无法据此确定原004的页面验收路径。
- 实测补充：三项可多选，反选原声音频后剩视频与字幕两项；输入框未观察到对象引用标签。时间尺操作只观察到播放头定位，@是文件级候选，不能替代对象/范围引用。
- 原004目标指令未发送，无对应run_id；未验证Agent改文结果。工程版本9及148条字幕保持，不将页面历史聊天中已完成的翻译任务视作004结果。
- 结论限定为已确认主页面的设计表达及已有页面观察，未穷举整个Figma文件的其他页面、隐藏状态或完整交互原型。

**预期结果**

需求与已确认设计应给出一致的本轮范围。若保留对象引用流程，请补齐对象/范围的引用入口、标签名称及时间范围、逐项移除和移除后有效引用状态；能据此执行原004并核对只修改C1、其他对象保持。若本版本不包含此流程，请同步修订需求与验收范围。评审确认并更新设计前，004继续保持本轮Not Applicable，不自动改为失败或受阻。

**影响**

需求与设计基准不一致，原004缺少明确可执行的验收路径，增加开发、设计和回归对有效引用对象及改动范围理解不一致的风险。

**补充**

- 关联标识：CINLINK-DESIGN-ERYE196-004-001。
- 本次整理范围仅ERYE196-001～004；001内部字段/历史实现不纳页面验收，002时间范围分页属于接口约定，003页面业务核验通过，这些未另报缺少设计入口。
- “测试环境win-chrome”标签用于标识补充页面证据环境；本项性质仍为需求/设计差异，待评审，不是已确认的页面实现回归。

**失败截图**

以下包含原始设计稿导出与既有实测页面截图，分别标注来源，未修改画面。设计截图用于资料对照，实测截图仅支持选择/反选后输入框状态的补充观察。

设计稿截图1：Captions主页面，节点1528:28905；核对时间线、Agent输入框及对象引用状态表达。

![ERYE196-004-figma-captions.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=688578d4cbe4fb5b5cd015a004)

设计稿截图2：Media主页面，节点1501:27513；历史文件级@与编辑器对象引用需要区分。

![ERYE196-004-figma-media.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=304a2448567607312331ee6f70)

实测补充截图3：版本9工程，反选音频后视频与字幕仍选中，Agent输入框未出现对象引用标签。左侧是历史翻译任务，004目标指令未发送。

![ERYE196-004-runtime-audio-deselected.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=8c1ca5d80fdde3844e57c56af8)


## 本机证据及同步核验

底稿：reports/erye196-001-004-design-gap-yunxiao-20261105/，含result.json、verified-description.md、verified-item.json、verified-attachments.json与同步检查点。原始来源/运输资料仅本机保存。

| 截图 | 来源 | SHA256 |
|---|---|---|
| ERYE196-004-figma-captions.png | reports/erye196-001-004-design-gap-yunxiao-20261105/figma-captions-1528-28905.png | 58ca0a7f136e6bd6e6454f768127c32d82c8ec111093dcf69b0a28bc505984e4 |
| ERYE196-004-figma-media.png | reports/erye196-001-004-design-gap-yunxiao-20261105/figma-media-1501-27513.png | 0b6046113944438481bed4dc3b0bc4b289126c0c487d090b036dfd27892e2b3b |
| ERYE196-004-runtime-audio-deselected.png | reports/erye196-004-rerun-20261105-after-restart/03-audio-deselected.png | 1be911a49795e6fff1349dce872ea7d7b3988496e4b471aa150676a215cec580 |

三个PNG附件ID及正文中的fileIdentifier逐一对应；本机副本SHA256与源文件一致，未加工画面。云效正文按九段模板记录来源、前置、未发送提示词、资料对照/已有实测步骤、实际/预期及验证边界，没有排查信息节或本机路径。同步未修改产品源码、需求正文或Figma。