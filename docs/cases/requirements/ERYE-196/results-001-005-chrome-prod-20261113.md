# ERYE196-001～005 Chrome生产执行报告（2026-11-13）

后续更新：新版002已单独重新执行Passed，见[002最新报告](results-002-chrome-prod-20261113.md)；004按最新需求口径重新判为Failed，见[复核](acceptance-004-review-20261113.md)。下方表格保留原批次当时结果，当前汇总为3 Passed/2 Failed。[当前用例总表](cases.md)。

生产 https://app.cinlink.ai/，Google Chrome有头原生界面，测试账号yabinc92。使用独立未分组会话[测试工程](https://app.cinlink.ai/c/c247b9a9-a996-4980-a143-5b8321e9ad74)，未创建新的顶层项目。用户确认暂停其他Chrome操作后完成续跑。按页面业务结果验收，历史2026-11-05报告保留。

| 用例 | 本轮结果 | 实际核验 |
|---|---|---|
| ERYE196-001 | Passed | 工程/轨道可辨；播放头0→5秒、时间轴缩放1→1.5、媒体/字幕切换正常；143条字幕文字与时间无变化；撤销/重做禁用状态保持 |
| ERYE196-002 | Not Applicable | 沿用已确认Web验收范围；未执行拟定范围分页接口，不以列表扫描冒充该专项通过 |
| ERYE196-003 | Failed | B保存新版C2后，A继续浏览仍为旧文且无刷新提示；手动刷新后正确显示新文。仅目标1条改文、其他142条及时间不变；撤销并刷新后143条全部恢复 |
| ERYE196-004 | Not Applicable | 沿用最新设计范围，旧对象/范围引用标签及移除交互不纳本轮；未用@文件或批注替代 |
| ERYE196-005 | Passed | Agent完成一次定点字幕更新，目标及预览正确；刷新后仍为欢迎使用 CinLink，143条中仅目标文字变化、全部时间不变 |

本批2 Passed / 1 Failed / 2 Not Applicable，无剩余测试控制阻塞。需求134条当前累计2 Passed / 1 Failed / 2 Not Applicable / 129 Not Run。003历史通过不覆盖本轮生产失败。

## 素材与准备

原片7MB.mp4，约60.50秒，1280×720，英文原声。通过素材登记及编辑器选择原片，生成143条可编辑英文逐词原文字幕；无译文轨、配音、BGM或水印，未额外构造无关对象。C1为Efforts（0.16～0.50秒）；C2为law.（7.42～7.68秒）。

准备阶段原生中文输入曾丢字，实际初始消息为“ERYE196-001～005：7MB.mp4，。、、、。”，真实澄清回答“仅登记原始视频用于编辑器测试，不剪辑、不增强、不配音、不烧录、不导出。”后完成登记。该工具输入问题未作为产品失败。Chrome连接不可用时使用原生界面，窗口竞争在用户确认暂停其他操作后解除。

## 003跨标签过程

A保留原工程，B打开同一会话并进入同一7MB.mp4工程。B将唯一law.改为新版C2并保存。返回A继续浏览，字幕和预览仍为law.，没有应用内更新或刷新提示。手动刷新A并重开编辑器后，新文正确；全列表143条，唯一差异为C2，时间保持7.42～7.68秒。B撤销一次，关闭B，刷新A重开后143条文字/时间全部与基线一致。结论仅针对可观察同步/提示缺失，不推断内部缓存或版本根因。

## 005完整指令与结果

> 只把当前工程中0.16～0.50秒、原文为Efforts的这一条字幕原文改为欢迎使用 CinLink，译文、其他字幕、声音和视频不改

一次发送，实际受理消息已核对完整；无需补槽。页面显示Editor subtitle text update，45秒完成。并非只依据回复判通过：字幕对象实际为欢迎使用 CinLink，起止时间0.16～0.50秒；定位后预览正确；完成后及刷新重开后各143条，唯一文字差异均为C1，其余142条和全部时间相同。视频/原声轨仍为原片0～60.50秒、原声音量100%，无新增译文、声音或视频处理。最终保留005结果供查看，未撤销此条修改。

验证边界：本轮为编辑器页面业务核验；未导出成片、未独立全片听审或验证音频文件哈希，未读取内部revision、服务器历史或费用账本；不声称这些额外范围通过。001仅核对界面可观察历史。

## 证据

证据目录：reports/erye196-001-005-chrome-prod-20261113/。caption-baseline.json为143条独立编辑前基线；001-ui-audit.json、003-caption-audit.json、003-restoration-audit.json、005-caption-audit.json保留逐条比较结果。

- [001视图操作](../../../../reports/erye196-001-005-chrome-prod-20261113/12-001-subtitles-after.png)
- [003 B已保存新文](../../../../reports/erye196-001-005-chrome-prod-20261113/18-003-b-saved.png) · [A仍旧文](../../../../reports/erye196-001-005-chrome-prod-20261113/19-003-a-auto-update.png) · [A刷新后新文](../../../../reports/erye196-001-005-chrome-prod-20261113/22-003-a-refreshed-top.png) · [恢复后刷新](../../../../reports/erye196-001-005-chrome-prod-20261113/27-003-restored-refreshed-top.png)
- [005受理](../../../../reports/erye196-001-005-chrome-prod-20261113/30-005-submitted.png) · [完成后目标](../../../../reports/erye196-001-005-chrome-prod-20261113/34-005-completed-top.png) · [刷新后预览](../../../../reports/erye196-001-005-chrome-prod-20261113/38-005-final-preview.png)

003已整理[本地缺陷](../../../defects/ERYE196-003-cross-tab-stale-prod-20261113.md)。003现已通过官方OpenAPI提交[FWXC-478](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf4fd59af9de900c67ec3a9057)，3图及1份脱敏审计附件回读通过；未Git提交或推送。用例格式检查通过：543条，0问题。

补充观察：003的A旧页截图同时出现“Cloud file bytes are unavailable in object storage.”及重新加载媒体入口；仍有画面和字幕预览。该媒体告警与跨标签字幕陈旧的因果关系未确认，未单独定性；后续刷新及005最终预览中未见该告警。
