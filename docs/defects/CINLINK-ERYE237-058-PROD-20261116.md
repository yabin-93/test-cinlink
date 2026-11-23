# 【ERYE237-058】Agent去背景表达在目标定位或导出阶段报EDITOR_TARGET_REQUIRED

云效：[FWXC-603](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=211e1c93bc4a0a1f168db56f70)。已回读核验正文、负责人余航、生产标签/重构10-29及附件；2张原始截图，1份脱敏审计。

**现象**

Agent去背景表达在目标定位或导出阶段报EDITOR_TARGET_REQUIRED

**前置步骤**

1. 生产https://app.cinlink.ai/，ego-browser有头，测试账号yabinc18。
2. acme-perfume-source.png：1254×1254，三分之四视角玻璃香水瓶，银盖、三角Logo/ACME及英文说明可辨；已建工程并保存原图。

**提示词**

参数1：
针对已保存原图acme-perfume-source.png，工程68df7ff0-6b9a-4b5d-a597-790b7b64aa16，源版本editor_image_86e68743792649dc94d48694396bc9f4：移除背景保留透明。只去背景，保持原视角和结构，保留玻璃瓶、银盖、金色液体、三角Logo及全部原标签文字，输出真正带alpha的透明PNG，不铺白、不重新生成另一张商品图。独立从上述原图开始，不重试任何历史请求。

参数2（独立恢复同一原图后）：
针对原图acme-perfume-source.png，工程68df7ff0-6b9a-4b5d-a597-790b7b64aa16，源版本editor_image_86e68743792649dc94d48694396bc9f4：背景抠掉，要透明PNG。只去背景保留原玻璃瓶、银盖、三角Logo、ACME及原标签文字、原视角与结构。独立使用上述原图，不用前一去背景产物作输入，不重试历史任务。直接交付透明PNG。

**复现步骤**

1. 独立恢复指定原图，普通Agent发送参数1一次，等待终态。
2. 保存已受理结果历史，清理本轮草稿，再恢复原图发送参数2一次。
3. 不重试失败请求，核对失败阶段、产物及实际打开工程。

**实际结果**

参数1 run_v2_60f15b1b488c4450a98b94d912db1ec7去背景/应用已成功，实际1254×1254带alpha PNG可读，但editor_image_export报EDITOR_TARGET_REQUIRED，整轮failed。参数2 run_v2_60f15b1b488c4450a98b94d912db1ec7在editor_image_history即同错，无输出，观察到编辑器目标切到同名带后缀工程。错误：Read editor_view_get and provide session_id: there is no unique live editor at this revision。会话e34809bb-f524-4bed-9401-d4e4622f38ef；完整run见审计。

**预期结果**

等价去背景表达均解析明确原图和当前编辑目标，正常完成并交付透明PNG；不因已有明确project/source仍无法定位导出。

**影响**

相同去背景诉求随表达产生目标定位/交付失败。

**补充**

同步标识：ERYE237-058-PROD-20261116-BATCH

2026-11-16生产实测，当前主分支Failed。只整理既有证据，不重发业务任务。第三表达“只保留商品，背景不要”独立成功；本项不称全部去背景不可用，也不把参数1实际alpha处理当失败。两失败阶段均留证。

已按当前项目412条缺陷及正文查重，确认相同项0；疑似/相关项明确保留。未覆盖内部日志/费用不补算通过。

**失败截图**

058参数1透明结果已应用，导出阶段因无唯一live editor失败

![058-1-transparent-terminal.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=cb805a66dc4ccf56ecaab9ac11)

058参数2明确原图请求在历史定位阶段失败

![058-2-cutout-terminal.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e2dd746336c1a896a956e6a2db)
