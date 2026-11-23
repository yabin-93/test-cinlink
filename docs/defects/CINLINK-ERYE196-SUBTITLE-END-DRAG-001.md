# CINLINK-ERYE196-SUBTITLE-END-DRAG-001 · [FWXC-356](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1a1873114f90458a91dff393ee)

2026-11-06按用户要求，将编辑页UI-05字幕结束时间拖动失败直接新建为1条云效缺陷。沿用不查重偏好，没有查询重复项、更新或重开其他缺陷；没有重跑编辑操作。

项目cinlink-WEB；优先级高、严重程度2-严重；负责人使用项目默认值，回读为牛诗晴。标题、正文、项目/类型、负责人、迭代、标签及优先级/严重程度均回读通过。本轮真实失败PNG嵌入正文末尾，另附脱敏JSON；2附件ID/名称/字节数和正文图片引用核验通过。

**现象**

正式环境编辑页直接拖动字幕结束手柄、缩短一条合法字幕时，页面报“Manual layout does not cover parent”，结束时间没有保存。

**前置步骤**

1. 测试账号登录[正式环境会话](https://app.cinlink.ai/c/8bd67283-c5ae-49d8-9789-78413b3bfa8c)；本次页面账号1020817070，会话ID：`8bd67283-c5ae-49d8-9789-78413b3bfa8c`。
2. 打开已保存工程“英文30S.mp4”，工程ID：`b34e8f29-25ac-4dc0-968f-76aabdd20e13`；本次失败前版本18，视频约30.63秒，已有可编辑英文字幕。
3. 确认第一条字幕时间为0.08～3.20秒，文字为“Would you believe me if I told you that my eyes are not even”，不是视频像素中的烧录字幕；该条无历史手动排版diff。

**提示词**

无。本例直接操作编辑页，不发送对话、不创建Agent任务。

**复现步骤**

1. 在字幕时间线选中第一条字幕，将播放头移开其边界，确保结束手柄可操作。
2. 向左拖动右侧结束手柄约0.5秒，使结束点从3.20秒缩短至约2.70秒。本次缩放约40像素/秒，实际拖动约20像素。
3. 松开手柄，查看页面提示、字幕时间和保存结果。
4. 刷新并重新打开同一工程，核对字幕时间。

**实际结果**

- 页面顶部出现错误原文：`Manual layout does not cover parent`。
- 字幕仍为0.08～3.20秒，结束时间未缩短；刷新后仍为原值。
- 完整工程内容未变，版本18→18；本例没有Agent run_id。
- 操作时间：2026-11-06 19:00:40（Asia/Shanghai）。字幕文件：`file_cloud_lkfnrgju55hbckpklpxbwhyfuy`；父块ID：`cue_6e51166f0b40e25b34577de6`。

**预期结果**

合法拖动应更新该字幕结束时间并保存，起点及文字保持，排版映射有效；刷新后与修改结果一致，不应因内部排版校验阻止基础时间调整。

**影响**

用户无法通过时间线缩短字幕显示时长，阻断手动校准字幕时间。

**补充**

关联编辑页基础检查UI-05。仅本次结束手柄拖动未通过；其他时间修改入口未用于替代验收。未重试、未发送对话，具体排版/父块映射原因待定位。截图顶部粉色横幅和右侧第一条字幕对应本例，左侧是历史对话，不属于本次失败。定位标识：`CINLINK-ERYE196-SUBTITLE-END-DRAG-001`。

**失败截图**

本轮页面字幕结束拖动：顶部显示排版校验错误，原结束时间仍为3.20秒；左侧历史对话不是本例。

![UI05-production-subtitle-end-drag-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=351fef7ed5f05a0876a8b82196)

## 本地证据与附件回读

[本轮真实失败截图](../cases/requirements/ERYE-196/evidence-editor-ui-20261106/UI-05-failed.png) · [页面执行报告](../cases/requirements/ERYE-196/editor-ui-basics-20261106.md)。原图未改画面，上传副本与原图SHA256一致：`8d4a987e38716133d0dc482aa7147a8dad545f60f712d9f279b3057398fb459b`。

| 文件 | 云效附件ID | 字节数 |
|---|---|---|
| UI05-production-subtitle-end-drag-failed.png | `351fef7ed5f05a0876a8b82196` | 412536 |
| UI05-production-subtitle-end-drag-evidence.json | `03ce8063bf5f0b74d78daa0bca` | 1774 |

本缺陷仅对应页面拖字幕结束时间，未创建Agent任务，不沿用历史对话run或错误。UI-05仍Failed，页面专项10P/1F、原24项3P/4F/17NR和原134条预发统计保持；本次没有修改用户工程、云端代码或其他云效缺陷。

## 后续页面分支补测（本地记录，未更新云效）

同日扩展测试UI-12改用字幕结束时间输入框，将第一条3.20秒改为2.70秒，同样显示Manual layout does not cover parent，版本22及保存内容保持。与原UI-05拖动入口分开记Failed；[新分支报告与真实截图](../cases/requirements/ERYE-196/editor-ui-expanded-20261106.md)。本批未再次执行原拖动入口，也未关闭、创建或更新云效缺陷；FWXC-356仍按原提交内容保留。
