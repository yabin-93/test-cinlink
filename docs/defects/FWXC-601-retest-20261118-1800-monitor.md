# FWXC-601 预发回归：2026-11-18新修复候选

原问题：【ERYE237-052】Agent只记批注及输入框引用报commands.1参数校验失败

当前原/扩散一/扩散二均Not Run，仅完成候选冻结、原描述/附件/历史回读及排程；没有实测通过/失败。原环境：production；本轮实际计划预发Google Chrome/yabinc92，保留环境及账号差异。每个新轮首次业务前官方GET创建者陈亚宾、编号及精确已修复门禁。

## 严格原场景

授权I1原图1024²，左耳Q(0.405,0.39)唯一，当前新工程及源ID用本轮真实值替换旧ID。普通Agent完整只保存批注并加未发送输入框引用一次，不改图、不生成、不导出；实际核批注正文/锚点/引用/源版保持。

旧commands.1 invalid oneOf消失不等于业务通过；原图/草稿/实际引用均需核验。原测试yabinc18，本轮按用户统一yabinc92预发，明确记录账号及环境差异。

## 独立扩散

1. 独立干净源另一个唯一锚点，仅保存批注/加入引用，验证单图未生成及正文/引用正确。
2. 独立已有本例批注修改其正文并保持未发送引用，核对象未复制/原图历史不变；不用人工补批注代替Agent成功。

必要补槽/审核填写继续、每场景独立干净会话，零额外业务重试，已受理仅回读。原问题与扩散分别判，准备失败不冒称原验收已覆盖。每项即时更新本报告及进度，Passed/Failed用官方OpenAPI设✅AI通过/❌AI未通过并回读；Blocked/待人工/未覆盖保持云效。不写评论/新单，不提交推送Git。

原始证据：reports/fixed-monitor-20261118-175919/cloud/FWXC-601/；描述workitem.json、comments.json、原附件及嵌入图均保存。文件SHA清单reports/fixed-monitor-20261118-175919/original-files-manifest.json；历史索引同目录local-history-index.json。固定业务脚本PLAN，不把本次整理当已实现自动化。统一入口README只读，不追加此报告的结果流水。


2026-11-19 06点源聊天实际接续：新建601原会话fdaab329-51c7-4553-8cfe-3e7c44cc8fb6，复用专用项目d71926f4-21b3-48bf-ac63-652a07da4d07。一次Agent准备30秒done但明确无法自动新建，没有重发；通过原生视频编辑器空白工程→选择媒体上传实际无耳饰/Logo的1024²原图，自动形成图片工程3f864b94-b879-4695-9eeb-22868c367080，GET 200 revision1/image类型/draft null，源head7e35...。严格原提示词仅替换本轮真实工程和源ID已单次提交，当前Running/未判通过。原图SHA3ca1504a...，证据reports/fixed-monitor-20261119-060155/execution/601-O-*；两扩散仍Not Run。


当前严格原场景Failed：严格原提示词（仅替换本轮真实project/source IDs）单次提交后，实际UI原任务失败：Editor tool arguments do not match its schema; commands.0: invalid oneOf; commands.1: invalid oneOf。读取编辑器视图后编辑图片节点失败，未保存要求的左耳批注/未发送引用，图片编辑器仍单一原图保存版本。未点重试、未重发。云效状态同步待官方回读，两扩散Not Run。实际会话/工程/源版及完整指令见前述与本机证据；固定脚本PLAN。


2026-11-19 06:19原失败已官方同步并GET回读❌AI未通过（状态ID256bfdc83c68c2cc552cebc5e8），只写状态1次，0评论/附件/新单。完整GET工程与基线JSON相同：revision1、draft null、原head保持，未增加图片结果；未点重试。两扩散继续独立执行，原失败不因此撤销。


2026-11-19扩散一实际Failed：独立会话840f4a89-4e3a-4b44-b5e0-b988b0d6a926、原图保存版editor_image_43ca7a9dd78448cf9ca7c1398bc43193。素材登记补槽实际CID后完成，原生UI建立原图工程，正式只记录右耳机批注请求省略工程参数，单次终态commands.0 invalid oneOf，未交付批注/未发送引用；未点重试。原图原保存版本保持。证据`reports/fixed-monitor-20261119-060155/execution/601-E1-*`。扩散二将单独人工创建一条已有批注后检验Agent更新正文，仅作为前置、不抵充Agent成功。


2026-11-19 601本轮完结：原回归Failed，独立扩散一Failed（commands.0 invalid oneOf），独立扩散二Failed（arguments invalid oneOf）。扩散二原生UI先保存唯一鼻子批注作为前置，Agent仅修改正文请求单次失败；实际原正文、唯一批注、源图保存版保持，不将人工建立算Agent成功。实际预发Chrome/yabinc92，原生产历史另存。云效原缺陷已06:19官方API设❌AI未通过并回读；扩散不重复写状态。完整提示词/原始截图/AX/工程审计在`reports/fixed-monitor-20261119-060155/execution/601-*`；固定脚本仍PLAN。其余15条待继续，README未写。
