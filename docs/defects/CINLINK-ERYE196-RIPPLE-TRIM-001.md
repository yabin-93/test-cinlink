# CINLINK-ERYE196-RIPPLE-TRIM-001 · [FWXC-339](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5275c98586194aeef2136a8454)

2026-11-06按用户要求同步正式环境ERYE196-013缺陷，并按用户“不需要查去重”的指令直接新建1条；没有查询重复缺陷、修改其他既有缺陷或重新执行CinLink任务。

云效项目cinlink-WEB；优先级高、严重程度2-严重；负责人采用本次项目创建字段默认值，回读为牛诗晴。正文、项目/类型/负责人/迭代/标签/优先级/严重程度，以及1张PNG和1份脱敏JSON均回读通过；PNG已在正文末尾嵌入，附件ID/名称/字节数与上传副本匹配。用例仍Failed，测试结论未变。

**现象**

正式环境通过Agent执行“裁掉片头2秒，并同步字幕与配音、保持固定BGM”时任务失败，剪辑没有生效。失败步骤提示批量编辑调用缺少`commands`。

**前置步骤**

1. 使用有工程编辑及Agent任务权限的测试账号登录[正式环境会话](https://app.cinlink.ai/c/7cd3e2dc-f9d5-42f4-8947-b1fa21830c12)。本次页面账号为1020817070，会话ID：`7cd3e2dc-f9d5-42f4-8947-b1fa21830c12`。
2. 打开视频编辑器，选择已保存的独立测试工程`E196-013-20261106-prod-013`（工程ID：`f6366c0e-45a4-4d21-b406-0fb2bde18e1e`）。A视频20秒、1920×1080、30fps，源范围及时间线均为0～20秒。
3. 准备可编辑字幕Welcome（4～6秒）、Second caption（10～12秒）及对应的两份2秒真实配音；逐句关联齐备、状态ready。源控制音频前3秒依次为Intro/Remove/Keep；独立固定BGM位于0～20秒。记录原始内容及已保存版本，本轮为版本1。
4. 确认当前工程名称正确；不需要@视频，也不需要独立的“批量编辑”按钮，使用Agent聊天输入框。

**提示词**

```text
只编辑当前已保存工程“E196-013-20261106-prod-013”（工程ID：f6366c0e-45a4-4d21-b406-0fb2bde18e1e），不要新建工程或生成替代视频。当前A片段20秒，源0～20秒，原文字幕Welcome位于4～6秒，关联配音轨与A同源定位，背景音乐轨固定从0秒开始。只从A片段当前开头删除2秒，采用波纹裁剪；保留视频从时间线0秒开始，关联原声音频、字幕和配音同步前移2秒，删去已删除区间的对白；固定背景音乐保持原位置和范围。
```

**复现步骤**

1. 在上述工程的Agent输入框一次发送完整提示词。
2. 等待任务结束，查看任务步骤及错误提示。
3. 刷新并重新打开该工程，核对视频源范围、字幕/配音时间及保存版本。

**实际结果**

- `editor_project_get`、`editor_subtitle_list`成功；`editor_batch_apply`失败，错误码`INVALID_ARGUMENT`。
- 错误原文：`Editor tool arguments do not match its schema; arguments: missing commands`。
- 真实批量编辑参数仅包含`project_id`、`operation_id`、`plan_node_id`，没有具体编辑操作列表`commands`；operation_id：`e8a734c1-952b-4a09-89b1-630e659177e4`。
- run_id：`run_v2_bfff18f172f942f7a538ff8ebee99141`；trace_id：`2173a842-6b2d-4c8b-a4ca-e8957be5b06a`；任务终态`failed`。
- 视频仍为源0～20秒、时间线0～20秒；两句字幕及配音仍在4～6秒、10～12秒；完整工程内容和版本1保持，裁头及同步修改均未执行。

**预期结果**

视频保留源2～20秒并从时间线0秒开始；两句字幕及配音分别同步到2～4秒、8～10秒；已删除区间的对白不残留；固定BGM的位置及范围保持，保存后重开一致。

**影响**

正式环境该Agent组合编辑指令无法完成，用户无法得到裁头后同步的字幕和配音。

**补充**

关联用例ERYE196-013。2026-11-06正式环境一次提交即复现，无补槽、无业务重试；预发2026-11-05也出现相同缺参错误，根因待确认。尚未进入裁剪后音画同步效果验收；固定BGM仍延续20秒是允许的。附件JSON保留脱敏调用及前后对照。

定位标识：`CINLINK-ERYE196-RIPPLE-TRIM-001`。

**失败截图**

正式环境013：工程与字幕读取成功，批量编辑缺commands失败，字幕及20秒视频仍保持原状。

![ERYE196-013-production-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=8d8c6ccc5e3a3082270c5b8b35)

## 本地证据对照

| 证据 | 原始来源 | 核对 |
|---|---|---|
| 正式013失败截图 | [本轮实测原图](../cases/requirements/ERYE-196/evidence-013-prod-20261106/013-result.png) | SHA256 `857ccef1fbef711faa59323fdc58f82f61248d93c8c931c7f07e5c2874f4fe45`；上传副本哈希一致、云端名称/大小及正文引用已核验 |
| 脱敏JSON | 本机reports/erye196-013-prod-yunxiao-20261106/ERYE196-013-production-evidence.json | 仅含本轮提示词、定位ID、失败调用及前后对照；无凭据、签名URL或原始会话导出 |

## 云效附件回读

| 文件 | 附件ID | 字节数 |
|---|---|---|
| ERYE196-013-production-failed.png | `8d8c6ccc5e3a3082270c5b8b35` | 440418 |
| ERYE196-013-production-evidence.json | `337adf8b3d8898b3c65bcba2e8` | 2113 |

正式013与预发013均Failed；预发134条仍5 Passed / 2 Not Applicable / 8 Failed / 0 Blocked / 119 Not Run，同一编号的正式执行单列，不重复计算用例数。
