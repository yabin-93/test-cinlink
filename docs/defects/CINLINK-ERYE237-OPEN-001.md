# CINLINK-ERYE237-OPEN-001

2026-11-06用例前置复核：001生成图分支失败证据保留；上传11.png分支缺少处理建工程证据，需补前置复测。云效FWXC-351未修改。

【正式环境】Agent打开导入图和生成图失败，提示缺少session_id、conversation_id

云效：[FWXC-351](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2887f4e45628699108c470bf84)；2026-11-06按用户要求不去重，直接新建；旧项修改0。

字段：cinlink-WEB；状态🤔AI提缺陷；负责人/验证者牛诗晴；优先级中；严重程度3-一般；迭代重构10-29；标签生产环境。

截图上传与回读：两张原始PNG已通过云效正文图片上传入口保存，回读到持久fileIdentifier，且正文末尾图片可正常显示。下表记录正文内嵌文件；未额外声称侧栏独立附件数量。

| 原始截图 | SHA-256 | 云效图片引用 |
|---|---|---|
| 07-I1-agent-schema-failure.png | `b5b280e984f1e1235d7873260e1e75cb7cb9229f4a8645dbc032f44b843dad7e` | `/url?fileIdentifier=37ed2453a0b7e99dbb59832709` |
| 11-I2-agent-schema-failure.png | `24ceb6402bb63d726d49deb497d9fc9c9d252d0578c9ecfb76bf372970471513` | `/url?fileIdentifier=898fe8d0b2e35e4a127b5f17c5` |

同步底稿：`reports/erye237-001-yunxiao-20261106/`，保存创建后AX与图片显示核验截图。没有重新执行CinLink任务。

**现象**

图片已导入或已真实生成完成后，通过Agent明确要求在图片编辑器中只读打开，任务均失败。页面提示Editor工具参数不匹配schema，缺少session_id和conversation_id，未完成目标图片打开。

**前置步骤**

2026-11-06，正式环境 https://app.cinlink.ai/，macOS / 有头 Chrome；账号 yabinc18（Creator）。独立项目 ERYE237-001-prod-20261106；project_id：732cb4c0-4231-4253-8477-0668ba247e11；conversation_id：39f4248c-0462-4978-912e-b714ad69a992。
I1：11.png，1024×1024 PNG（红色纸船）。I2：本会话真实生成完成的1024×1024水彩群鸟PNG，file_id=file_cloud_a43oczwenqjikdfkuqkzoj72ds；生成参考素材为用户JPEG f9f29aac319d6a2a6924f0c0b67db056.jpeg（1000×666），参考JPEG本身不计作生成图。
通过“视频编辑器→选择媒体→11.png”手动导入I1，确认图片编辑器标题11.png、已保存，历史项editor_image_cb48f75cb45f4d22bad14875595c6733；随后收起编辑器。I2按下面准备指令生成一次并等完成，页面显示总耗时85秒；原文件可下载。不使用@引用，不把前置未建立文档时的拒绝回复当作本缺陷。

**提示词**

准备I2（已执行，仅准备基线）：
为图片打开测试准备一张真实生成图：以本会话附件 f9f29aac319d6a2a6924f0c0b67db056.jpeg 的水边群鸟为参考，生成一张水彩风格的群鸟图片，1:1，1K，只生成1张。作为独立的新图片，不修改11.png和原始JPEG，也不要生成视频。

目标指令A，I1（已执行）：
打开本会话图片“11.png”的原始版本。该图片已手动导入，历史版本项标识为 editor_image_cb48f75cb45f4d22bad14875595c6733。请在图片编辑器中打开这一版本，仅查看，不修改、不生成、不导出。

目标指令B，I2（已执行）：
在图片编辑器中打开本会话刚完成的水彩群鸟生成图片的原始生成版本，仅查看，不修改、不重新生成、不导出。目标文件名：以提供的参考图片-f9f29aac319d6a2a6924f0c0b67db056-jpeg-中-20261106-103743.png；文件ID：file_cloud_a43oczwenqjikdfkuqkzoj72ds。不要打开原始JPEG或11.png。

**复现步骤**

1. 完成上述I1导入基线，收起图片编辑器。
2. 发送目标指令A，等待任务结束，观察工具步骤、错误及编辑器是否打开。
3. 完成I2生成基线，按真实文件名和file_id发送目标指令B，等待任务结束。
4. 分别检查两次任务终态及目标图片是否进入编辑器。

**实际结果**

I1：Editor project get和首个Editor view get显示成功，Editor open及后续回执/视图/历史步骤失败。I2：按指定生成文件安排读取工程、视图、打开及历史查看后，也显示失败，未成功打开目标图片编辑器。
两次错误原文相同：
Editor tool arguments do not match its schema; arguments: missing session_id, conversation_id; arguments: missing session_id, conversation_id
会话ID见前置，run_id未从页面取得。正式失败任务未重试。

**预期结果**

Agent应使用当前有效会话和目标图片文档/版本完成只读打开，图片编辑器显示指定源图或生成图；不因内部必填参数缺失中断，也不切错文件、修改内容、重新生成或导出。

**影响**

导入图和真实生成图均无法通过Agent进入指定图片/版本的编辑器，阻断图像编辑的查看及后续操作入口，ERYE237-001不能通过。

**补充**

关联需求ERYE-237；用例ERYE237-001；本地缺陷标识CINLINK-ERYE237-OPEN-001。缺陷依据为真实业务打开失败，不根据报错断言最终根因。I1曾手动导入成功，I2曾真实生成并下载成功，可与纯上传/生成失败区分；生成基线费用与只读打开费用尚未核对，不作零扣费结论。

**失败截图**

截图1：I1导入文档已存在后的Agent打开失败。
截图2：I2真实生成图的Agent打开失败。
以下嵌入本次生产原始截图。
![07-I1-agent-schema-failure.png](../../reports/erye237-001-prod-20261106/07-I1-agent-schema-failure.png)

![11-I2-agent-schema-failure.png](../../reports/erye237-001-prod-20261106/11-I2-agent-schema-failure.png)
