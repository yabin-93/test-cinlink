# 图片编辑Agent无法绑定当前会话及源版本参数，切换画笔、文字草稿和复合编辑均未执行 — FWXC-379

2026-11-09通过云效官方OpenAPI直接新建[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)，关联ERYE237-014、ERYE237-018、ERYE237-032。未做去重，旧项修改0；3份真实图片已上传并嵌入正文，另附evidence.json；正文、字段、附件ID/名称/字节数及图片引用回读通过。按用户要求分组，不代表已证实共同根因。对应正式用例保持Failed，本次未重跑生产任务。

本机同步计划：reports/yunxiao/erye237-agent-binding-20261109/；官方API检查点：reports/yunxiao/ERYE237-AGENT-BINDING-PROD-20261109/。图片与补充附件：014-agent-terminal.jpg, 018-agent-terminal.jpg, 032-terminal.jpg, evidence.json。

**现象**

已打开且UI可编辑的图片工程，通过内置Agent切换画笔、创建文字草稿或执行本地复合编辑时，出现缺少会话/源版本参数的错误或明确返回尚未执行，实际操作没有完成。

**前置步骤**

生产 https://app.cinlink.ai/ ，macOS Google Chrome有头，已登录yabinc18（Creator）。项目IMG-ANN-UI-007-20261109；会话 https://app.cinlink.ai/c/39cdf63c-d593-4538-816a-5d1c29973e36 。授权生成人像portrait.png：1254×1254，红T恤、蓝裤、白鞋、黄色手包、浅灰背景。既有素材登记后通过一次移除背景建立图片工程，再从历史恢复带背景源V1 editor_image_28de342515fc438aa5a0893c504fc20d；UI可实际打开编辑器和进入画笔。各场景先核对所选源版、清理本轮未发草稿，保留完成历史；不以上一结果默认为原源版。

**提示词**

014：ERYE237-014：针对当前已打开的portrait.png源版本，进入画笔模式，先不要画或生成。仅切换编辑器工具并建立空画笔草稿引用，不修改图片，不生成或导出。

018：ERYE237-018：仅在当前已打开portrait.png的干净源版本创建一个可继续编辑的文字草稿，不提交合成、不生成或导出图片。文字为“新品 Hello 2026”，源图位置x=0.10,y=0.16，字号48源像素，RGB(255,255,255)。保存后保持编辑器打开，读取实际对象及样式回执。请从当前编辑器解析真实会话/源版本，不使用历史图片代替当前图。

032：ERYE237-032：针对当前打开的portrait.png源版，按顺序完成一组本地编辑并仅做确定性合成：在源图左上x=0.10,y=0.10添加文字“新品”，白色RGB(255,255,255)，48源像素；将同一个文字对象移动到右上x=0.70,y=0.10；再添加一条红色RGB(255,0,0)、8源像素箭头，从x=0.70,y=0.20指向已登记点Q=(0.25,0.25)。完整保留人像、黄色手包、背景和1254×1254画幅，不调用AI重绘。以上本地复合编辑必须属于同一可撤销组，完成后保留实际对象及一次撤销能力；读取当前编辑器真实身份和参数，不用历史图替换当前源版。

**复现步骤**

1. 打开并确认portrait.png源V1，UI进入画笔确认工具可用后退出，保持干净基线。
2. 不携带待发画笔引用，在普通聊天输入区发送014完整指令一次；查看工具调用回执及实际编辑器工具。
3. 等014终态，不点击重试。复位源V1，从无引用干净基线发送018指令一次；核对是否创建可编辑文字对象。
4. 再复位干净源V1，发送032完整复合指令一次；核对文字/箭头、实际结果及同组撤销能力。

**实际结果**

014计划调用editor_view_get→editor_image_view_update→editor_view_command_get，但后两步失败，错误原文：Editor tool arguments do not match its schema; arguments: missing session_id, source_version_id; arguments: missing session_id, source_version_id。画布仍为主工具栏，未进入画笔。
018在96s终态返回“尚未创建文字草稿”，说明缺真实session_id、revision、source_version_id，并称计划接口未声明如何绑定读取结果到后续编辑参数，未创建对象。
032在74s终态返回“目前无法安全提交这组编辑，尚未修改图片”，给出相同参数绑定障碍；无复合编辑及可验证单组撤销结果。
三次均已到终态，未收到可填写的用户澄清槽。缺失参数是产品当前状态传递问题，不是要求用户猜测内部ID；各次请求未重发。run_id未取得。

**预期结果**

根据当前已打开文档读取真实会话、修订和源版本，正确传入后续工具并执行指定本地操作；未要求生成时只修改工具/对象草稿，复合操作按同一对象及同组撤销语义完成。不应把已有上下文转嫁为用户补充内部ID，也不能只返回规划或未执行说明代替实际操作。

**影响**

UI可操作的基础图片编辑无法通过内置Agent完成，影响工具切换、文字新增和多操作编辑，并阻断后续Agent配对回归。

**补充**

同步标识：ERYE237-AGENT-BINDING-PROD-20261109

关联ERYE237-014/018/032，三例保持Failed。按用户要求归为一组同类参数传递/绑定现象；014有实际schema错误，018/032为Agent明确未执行回执。共同代码根因未由服务端日志证实，不声称已定位具体模块。未把018的UI颜色准备偏差计入本缺陷。费用/provider未核；本次同步不重跑任务。

**失败截图**

014：实际schema错误及未切换工具

![014-agent-terminal.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4aa1768e95767bd6a9c72c7d81)

018：明确尚未创建文字草稿及参数绑定说明

![018-agent-terminal.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=be93aa3a08c03a9d59bc851790)

032：完整复合编辑未执行，返回参数绑定障碍

![032-terminal.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=31ba755061d9005f9723cab00d)
