# 【生产环境】【ERYE237-003】无打开文档时Agent无法打开已有图片工程

2026-11-13生产实测，ERYE237-003/Agent Failed。云效：[FWXC-360](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9c6900f0ecb8225f5219b10b66)，关联既有项并追加本轮证据；回读状态“❌AI未通过”。标题包含用例编号，正文或补充评论、图片和附件均已回读验证。

本轮补充评论ID：24260848。既有正文、状态、负责人和迭代保持。

**现象**

ERYE237-003/Agent本轮失败：空白图片编辑区请求打开同项目已有工程，补充真实图片工程ID后仍未打开，Editor open报authenticated conversation限制。

**前置步骤**

1. 生产环境，ego-browser有头，测试账号yabinc18；同一专用项目中，目标11.png为已保存、可重开的透明红纸船版本。
2. 当前独立测试会话展开编辑区为“空白工程/选择媒体”，没有打开图片；另一窗口保留水彩图对照。

**提示词**

准备消息（仅建空会话，已发送）：

ERYE237-003前置准备：仅建立本条空白测试会话，不打开任何图片或视频文档，不生成、不编辑、不导出，不添加素材。后续将单独验证打开本项目已有图片工程。

正式目标（一次）：

打开本项目“FWXC350-prod-retest-20261111”中已有图片工程“11.png”的已保存去背景红色纸船版本（透明背景）。该目标位于本项目会话6255bb97-8790-4927-ac81-8f7ea97d7151，已从工程入口确认可以打开。仅查看，不修改、不生成、不导出；不重新上传、不创建替代工程，不打开原始白底版本或其他图片。

**复现步骤**

1. 从源工程入口实际重开目标透明纸船，确认画布与两项保存历史。
2. 在同项目建立独立空会话，展开编辑区确认无图片文档，发送正式目标一次。
3. 出现“目标图片编辑工程 ID”澄清时，填写e23320a2-8b84-4025-8650-c44a9d6e49a2并提交一次；值来自目标真实成功打开回执。
4. 等原任务终态，检查空文档窗口及另一窗口，不手动打开目标代替Agent结果。

**实际结果**

目标会话6255bb97-8790-4927-ac81-8f7ea97d7151；当前会话b3898c6c-f2bb-4610-be32-3263dc306156，run_v2_745ff14002c14ebfad2f3aefc1f3d1f5。填槽后editor_open最终failed，错误为“Implicit page resolution is limited to this authenticated conversation”；画布仍空白。总时长323.795秒含填槽核对等待，不能全算服务端耗时。另一窗口画布及单历史保持。

**预期结果**

无当前图片文档时，可打开同项目已有且有权限的指定图片工程及保存版本；补全有效来源后应完成实际打开，不持续停在空白工程。

**影响**

新会话通过Agent打开已有图片的流程不可用，影响跨会话继续查看和编辑。

**补充**

同步标识：ERYE237-PROD-20261113-003-empty-open

关联FWXC-360：均为目标已建且可访问、当前空文档、跨会话打开未完成；错误文案变化不代表原业务验收通过。既有❌AI未通过状态保留，补充当前填槽及真实失败证据。旧128d会话停止按钮异常不纳入本单本轮失败原因。

**失败截图**

本轮已确认目标透明红纸船工程可打开

![ERYE237-003-20261113-003-source-project-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=3ad4680d54ecca8d1c462323e5)

空白工程中已填写真实目标工程ID

![ERYE237-003-20261113-003-clarification-filled.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ff6e514ff0a940c74d1c6556cb)

填槽后的原任务失败，右侧仍为空白工程

![ERYE237-003-20261113-003-after-clarification.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=3875824e49db6e7f1c7df863b9)

