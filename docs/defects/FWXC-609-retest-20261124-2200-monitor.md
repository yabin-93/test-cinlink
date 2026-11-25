# FWXC-609 · 当前新修复轮回归

最新实测记录：2026-11-25T13:29:08.270688+08:00。

原环境：production；本轮实测预发staging-app.cinlink.ai、Google Chrome有头、yabinc92。原问题与两条扩散独立判定，历史结果不计本轮实测。

专用项目：3bb7e789-f86b-48ac-aa69-d1fc7a5c8a4b。实际源文件：reports/fixed-acceptance-20261125-104653/fixtures/609/acme-perfume-source.png；SHA256：d1b71df57f25bea7d6a495e9935bc10e06b3f1320ee4ea99b0d870c885b467ba。

当前云效：✅AI通过；本轮状态同步已回读：True。

## original · Passed

严格1254²香水原源独立工程，准备白底81fd及后续透明9ff1完成版（实际导出全解码），查看原版8c27无草稿。实际渲染SVG核定20/8px及(188.1,627)→(313.5,627)/(188.1,752.4)→(313.5,752.4)精确原两笔；画布tabindex0焦点CmdZ一次只撤掉8px第二笔，20px第一笔保持，符合当前意图撤销。CmdShiftZ恢复两笔；关闭重开清理本轮预览后原/白底/透明三完成历史均在，实际重导9ff1与准备时SHA逐字节相同。原问题未复现且当前区域撤销实际通过。预览期间UI隐藏历史面板，未声称直接审计服务端head；已核复原后三历史与透明文件保持。正式UI步骤0模型提交。

conversationId：e4447e85-3032-4eed-9625-fed71b422153
sourceVersionId：editor_image_8c27c9f2cf0e49af99c1cea509017c07
promptFile：reports/fixed-acceptance-20261125-104653/execution/609/O-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/609/O-undo-audit.json
screenshot：reports/fixed-acceptance-20261125-104653/execution/609/O-after-undo.png

## expansion1 · Passed

独立新会话/独立1254²原图，无生成或完成旧历史。主擦除32px/12px两笔，画布CmdZ实际只撤第二笔，CmdShiftZ恢复；渲染SVG路径2→1→2。关闭重开清理两笔与待发送引用后，唯一原源8311历史保持，无模型编辑/导出提交。覆盖不同宽度的当前意图作用域，非严格原两完成历史替代。

conversationId：f82e4348-de6a-40c4-b6d4-d0e9a1a853e3
sourceVersionId：editor_image_83116637e7164db682b5c5a35c97f9ff
promptFile：reports/fixed-acceptance-20261125-104653/execution/609/E1-session-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/609/E1-undo-audit.json
screenshot：reports/fixed-acceptance-20261125-104653/execution/609/E1-after-undo.png

## expansion2 · Passed

独立新会话单1254²原图，主擦除16源像素单笔；画布CmdZ后实际SVG无polyline（仅光标circle），CmdShiftZ恢复同一笔，路径1→0→1。关闭重开编辑器清理mask和待发送引用，唯一原版8eb8保持。正式UI0生成/修改请求，不继承其他会话完成历史。

conversationId：55f4fe51-fce8-4de2-ae8c-1521033c3c81
sourceVersionId：editor_image_8eb839fc3dbc4a059c808d0e42caef85
promptFile：reports/fixed-acceptance-20261125-104653/execution/609/E2-session-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/609/E2-undo-audit.json
screenshot：reports/fixed-acceptance-20261125-104653/execution/609/E2-after-undo.png

固定可重跑脚本状态PLAN；本轮CUA执行不算脚本已实现。受理请求仅回读，不重发；无评论、新单、附件或Git提交。用例正文及README只读。

原描述、附件及历史索引见监控快照；本轮前置历史已保存至reports/fixed-acceptance-20261125-104653/execution/609/prior-preflight-report.md，未覆盖事实保留。


2026-11-25T13:29:19.539061+08:00 FWXC-609本轮结束：original:Passed / expansion1:Passed / expansion2:Passed。预发/yabinc92、Chrome原生有头。云效同步证据见本例状态记录。本轮受理全部终态，无重试、评论、新单、附件或Git；固定脚本PLAN。完整证据reports/fixed-acceptance-20261125-104653/execution/609/final-result.json。
original：严格1254²香水原源独立工程，准备白底81fd及后续透明9ff1完成版（实际导出全解码），查看原版8c27无草稿。实际渲染SVG核定20/8px及(188.1,627)→(313.5,627)/(188.1,752.4)→(313.5,752.4)精确原两笔；画布tabindex0焦点CmdZ一次只撤掉8px第二笔，20px第一笔保持，符合当前意图撤销。CmdShiftZ恢复两笔；关闭重开清理本轮预览后原/白底/透明三完成历史均在，实际重导9ff1与准备时SHA逐字节相同。原问题未复现且当前区域撤销实际通过。预览期间UI隐藏历史面板，未声称直接审计服务端head；已核复原后三历史与透明文件保持。正式UI步骤0模型提交。
expansion1：独立新会话/独立1254²原图，无生成或完成旧历史。主擦除32px/12px两笔，画布CmdZ实际只撤第二笔，CmdShiftZ恢复；渲染SVG路径2→1→2。关闭重开清理两笔与待发送引用后，唯一原源8311历史保持，无模型编辑/导出提交。覆盖不同宽度的当前意图作用域，非严格原两完成历史替代。
expansion2：独立新会话单1254²原图，主擦除16源像素单笔；画布CmdZ后实际SVG无polyline（仅光标circle），CmdShiftZ恢复同一笔，路径1→0→1。关闭重开编辑器清理mask和待发送引用，唯一原版8eb8保持。正式UI0生成/修改请求，不继承其他会话完成历史。
