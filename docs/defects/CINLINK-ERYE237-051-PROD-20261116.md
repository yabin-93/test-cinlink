# 【ERYE237-051】携批注的纯文字问答误进入图片生成，未回答所指文字

云效：[FWXC-600](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b4d33b83b62accbda4aa0db43c)。已回读核验正文、负责人余航、生产标签/重构10-29及附件；1张原始截图，1份脱敏审计。

**现象**

携批注的纯文字问答误进入图片生成，未回答所指文字

**前置步骤**

1. 生产https://app.cinlink.ai/，ego-browser有头，测试账号yabinc18。
2. acme-perfume-source.png：1254×1254，三分之四视角玻璃香水瓶，银盖、三角Logo/ACME及英文说明可辨；已建工程并保存原图。

**提示词**

这里只做问答：这个位置写的是什么？不要改图片，不生成、不导出。

**复现步骤**

1. 恢复香水瓶原图，在FRESH CITRUS行锚点(.475,.58)添加批注“只识别此行文字，不修改图片”，并添加到对话。
2. 发送完整纯问答指令一次。
3. 等待并核对回复、实际图片任务和结果。

**实际结果**

受理图片生成任务7aec8683-54b2-4f33-8515-1fba12313a5f，终态failed，ANNOTATION_REGION_UNCLEAR，页面提示批注1修改范围不明确；没有回答文字，没有新成品。会话e34809bb-f524-4bed-9401-d4e4622f38ef。

**预期结果**

回答对应原图位置的FRESH CITRUS；明确不改图时不创建图片编辑任务，不要求补充修改范围。

**影响**

纯图片问答被错误路由，用户得不到已有可读文字。

**补充**

同步标识：ERYE237-051-PROD-20261116-BATCH

2026-11-16生产实测，当前主分支Failed。只整理既有证据，不重发业务任务。截图上方Project name already exists是素材准备历史，与本轮错误分开。本项只报当前问答误入编辑；不据此声称已扣生成费用。

已按当前项目412条缺陷及正文查重，确认相同项0；疑似/相关项明确保留。未覆盖内部日志/费用不补算通过。

**失败截图**

051实际只问答指令、文字引用及错误；上方素材准备旧错误不是本缺陷

![051-task-state.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=48fc5aae02e653ecac028585f3)
