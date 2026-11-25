# FWXC-668 · 当前新修复轮回归

最新实测记录：2026-11-25T12:35:06.900176+08:00。

原环境：production；本轮实测预发staging-app.cinlink.ai、Google Chrome有头、yabinc92。原问题与两条扩散独立判定，历史结果不计本轮实测。

专用项目：3bb7e789-f86b-48ac-aa69-d1fc7a5c8a4b。实际源文件：reports/fixed-acceptance-20261125-104653/fixtures/668/E196-双人英文-20s-配音源.mp4；SHA256：906d0aef3bc85872e3d6b11e4a187eb419b1be8437960f2b6a0a8c01e2b640c2。

当前云效：✅AI通过；本轮状态同步已回读：True。

## original · Passed

执行通过：原P1删除后空时间线/源文件保留已核；原P2在30s以已停止终态明确说明原视频和关联原声已不在当前时间线，无法调音量或导出，可先撤销删除再操作。空工程保持，无新/恢复片段或替代输出，正确拒绝不当作失败。P3实际调用撤销29s恢复原视频及原声0-20，刷新前原生Redo可用；刷新重开仍单视频+原声0-20、20秒，实际1280x720预览播放至13.184秒后暂停。未做声音质量听审或声称新导出。

conversationId：b1e4c36b-8d69-4c1c-a7e2-7a29f88591c0
promptFile：reports/fixed-acceptance-20261125-104653/execution/668/O-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/668/O-result-ui.txt
screenshot：reports/fixed-acceptance-20261125-104653/execution/668/O-result.png

## expansion1 · Passed

执行通过：独立新会话/新视频工程0-20视频原声基线；删除70s后核空。条件表达仅目标仍存在才设25%并导出，41s明确说明原视频和关联原声已不在当前时间线上，无法调整或导出，可先撤销删除再操作。空时间线保持，无恢复/重建/新增片段或替代输出。后续真实撤销50s恢复视频及原声各0-20，原生Redo可用，拒绝未污染成功编辑历史。原Passed/云效AI通过保持，不以正确拒绝终态已停止判失败。

conversationId：94fd0dda-48ad-415d-9c1c-d20b3ef997f4
promptFile：reports/fixed-acceptance-20261125-104653/execution/668/E1-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/668/E1-result-ui.txt
screenshot：reports/fixed-acceptance-20261125-104653/execution/668/E1-result.png

## expansion2 · Passed

执行通过：第二独立新会话/新工程原20秒视频及原声，删除49s后空时间线确认。已删除目标降低6dB并保存导出请求29s明确说明原视频和关联原声不在时间线上，无法调整或导出，提示先撤销删除；空工程保持，无重导素材、恢复/新增片段或替代成片。后续真实Undo28s恢复原视频及原声0-20，原生Redo可用，未污染编辑历史。正确拒绝终态已停止按预期Passed，不做无效业务重试。

conversationId：6b54f6a2-6aaa-4fa3-8055-32e3e48cef3e
promptFile：reports/fixed-acceptance-20261125-104653/execution/668/E2-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/668/E2-result-ui.txt
screenshot：reports/fixed-acceptance-20261125-104653/execution/668/E2-result.png

固定可重跑脚本状态PLAN；本轮CUA执行不算脚本已实现。受理请求仅回读，不重发；无评论、新单、附件或Git提交。用例正文及README只读。

原描述、附件及历史索引见监控快照；本轮前置历史已保存至reports/fixed-acceptance-20261125-104653/execution/668/prior-preflight-report.md，未覆盖事实保留。
