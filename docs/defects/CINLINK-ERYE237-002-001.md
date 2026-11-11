# CINLINK-ERYE237-002-001

2026-11-06用例前置复核：002目标JPEG未确认处理建工程，整例由Failed改Blocked；FWXC-357原始证据保留，须正确前置复测，云效未修改。

【正式环境】【ERYE237-002】Agent按“第2张图片”打开失败，提示缺少会话参数

云效：[FWXC-357](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=94f54105c3405d30c9df57b56e)。2026-11-06按用户要求不去重直接新建1条，旧项修改0。

字段：cinlink-WEB；状态🤔AI提缺陷；负责人/验证者牛诗晴；优先级中；严重程度3-一般；迭代重构10-29；标签生产环境。

截图：2张本次原始PNG已上传至正文图片及附件区；正文显示、持久图片引用与2个附件文件名均回读通过。原图未修改。

| 截图 | SHA-256 | 正文图片引用 | 附件引用 |
|---|---|---|---|
| 01-I2-document-baseline.png | `241fc126e65fa32be733f4e1963f83700ecd14345e923e1a7cfa0d68b0dda79c` | `/url?fileIdentifier=edc96e77d3bf1e6c991c1dc630` | `/url?fileIdentifier=6a347cdb916a063bd6e85cbaeb` |
| 03-failure-visible.png | `c1dadcce1b7257dee89efbd03b9000d823fa9bc6263922e140184119d64804c0` | `/url?fileIdentifier=990e08751f2e6bfd5e445b7484` | `/url?fileIdentifier=1642fbac1b99eb037bd367a630` |

同步底稿：`reports/erye237-002-yunxiao-20261106/`。本次只同步缺陷，未重新执行CinLink任务或生成图片。

**现象**

按会话图片顺序要求打开第2张图片时，Agent任务失败，提示Editor工具缺少session_id和conversation_id。右侧编辑器仍停留在第3张水彩图，没有打开应选的第2张群鸟JPEG。

**前置步骤**

2026-11-06；生产环境 https://app.cinlink.ai/ ；macOS / 有头Chrome；账号yabinc18（Creator）。项目ERYE237-001-prod-20261106，project_id=732cb4c0-4231-4253-8477-0668ba247e11。
本例独立conversation_id=4d81b2cf-17a2-4972-95b6-583a3948dca0。
按附件顺序逐张上传并登记：第1张11.png（1024×1024红色纸船）；第2张f9f29aac319d6a2a6924f0c0b67db056.jpeg（1000×666水边群鸟照片，正确目标）；第3张为已真实生成的1024×1024水彩群鸟PNG，页面名“以提供的参考图片-f9f29aac319d6a2a6924f0c0b67db056-jpeg-中-20261106-103743.png”。第3张复用已有生成文件，本轮不重新生图。
通过“视频编辑器→选择媒体”手动导入第2张，再通过图片素材库分别打开第1/第3张，确认各自画布、已保存和单个历史项。第2张历史项editor_image_d78411edba904bceadc9d6923dc1876c。目标提交前保持右侧为第3张水彩图；无未保存草稿。

**提示词**

素材登记准备指令（已执行，18秒完成）：
ERYE237-002测试素材登记：本条消息的三张图片按附件顺序登记为第1张、第2张、第3张。仅登记素材，不打开、不编辑、不生成、不导出，也不要把这条准备指令当作正式打开测试。

正式目标指令（只执行1次）：
打开本会话第2张图片，仅查看，不修改

正式目标不携带文件名、ID或@引用。

**复现步骤**

1. 按前置顺序完成三张图片登记，并建立可打开的图片文档。
2. 在编辑器打开第3张水彩图，确认当前画布与第2张JPEG照片可区分。
3. 发送正式目标指令，等待任务终态。
4. 核对实际工具结果、右侧标题/画布及目标图片；保存终态后再查看其他图片的历史。

**实际结果**

规划描述依据已登记顺序选择第2张对应工程，排除当前第3张；但这不等于已实际打开。
页面Editor view get、Editor project get显示完成；Editor open及Editor view command get显示失败。错误原文：
Editor tool arguments do not match its schema; arguments: missing session_id, conversation_id; arguments: missing session_id, conversation_id
终态右侧标题与画布仍为第3张水彩图，历史项editor_image_ae11e8a6f7ea494795375c804dc921d9；没有进入第2张JPEG照片。run_id未从页面取得；正式任务未重试。

**预期结果**

Agent应按独立登记的会话附件顺序，在图片编辑器打开第2张JPEG照片的对应版本，标题和实际画布一致；不沿用当前/最近的第3张，不因内部必填参数缺失中断。第1/第3张内容和版本保持。

**影响**

自然顺序指代打开图片的流程无法完成，用户无法通过“第2张图片”切换到指定图片，ERYE237-002未通过。

**补充**

关联需求ERYE-237、用例ERYE237-002；本地缺陷标识CINLINK-ERYE237-002-001。目标图片已手动导入成功，不能把本次失败归因为未准备图片文档。
失败后手动回读三图均仍各一个相同历史项、显示已保存，画布与基线一致；事后人工切到第2张不计Agent成功。远端不可变文件哈希、服务端完整修订及账本未核对，不作零扣费结论。根据实际业务失败报缺陷，不据schema报错断言最终根因。

**失败截图**

图1：正式目标前，第2张JPEG已在编辑器正确打开并完成素材顺序登记。
图2：正式目标失败，显示缺少会话参数，右侧仍为第3张水彩图。

![01-I2-document-baseline.png](../../reports/erye237-002-prod-20261106/01-I2-document-baseline.png)

![03-failure-visible.png](../../reports/erye237-002-prod-20261106/03-failure-visible.png)
