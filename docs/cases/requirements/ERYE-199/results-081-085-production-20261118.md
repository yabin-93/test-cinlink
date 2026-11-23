<!-- ERYE199-081083084085-YUNXIAO-20261119 -->
2026-11-19：ERYE199-081、083、084、085按相同业务问题合并2条，已同步[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044)、[FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74)。原声误联动24个变体共用FWXC-699，083-T2额外英文字幕轨关联FWXC-700；31张原始截图已上传并嵌入，38附件及正文回读通过。四例保持Failed，082保持Passed；当前142条43P/13F/2B/21NA/63NR不变，其他138条及既有缺陷关联保持。本次未重跑、未修改旧云效缺陷。 [同步明细](defects-081-083-085-production-20261119.md)。
<!-- /ERYE199-081083084085-YUNXIAO-20261119 -->

# ERYE199-081～085生产执行结果（2026-11-18～19）

2026-11-18～19：ERYE199-081～085生产实跑4 Failed / 1 Passed，5条接入AUTO；按35个原生轮次/卡片操作变体逐项记录，结果25 Failed / 10 Passed。当前142条43 Passed / 13 Failed / 2 Blocked / 21 Not Applicable / 63 Not Run；其他137条和071/FWXC-693、078/FWXC-694保持。失败截图已保存，后续已同步FWXC-699/FWXC-700。以下旧统计按日期保留历史。

专用项目 `ERYE199-081-085-生产-20261118` / `4a9de95b-0d6e-47f7-b436-b829da3ad241`；生产Ego Lite有头，TaskSpace8。用户已选择测试目录，本批显式选用对应夹具，不分析整个目录。083～085每个卡片/裁剪边缘分别新会话准备原生工程，082两轮按要求同会话。未通过API写工程，不重发已受理任务。

[当前进度](execution-status-current.md) · [结构化结果](execution-status-081-085-production-20261118.json) · [自动化说明](automation.md)

| 用例 | 结果 | 变体结果 |
|---|---|---|
| ERYE199-081 | Failed | 1 Failed |
| ERYE199-082 | Passed | 2 Passed |
| ERYE199-083 | Failed | 2 Passed / 6 Failed |
| ERYE199-084 | Failed | 2 Passed / 6 Failed |
| ERYE199-085 | Failed | 4 Passed / 12 Failed |

## 实际执行步骤及证据

前置、完整提示词与预期沿用[第十五章](cases.md#erye199-card-multitrack)。每变体记录独立原生会话/run/工程和输入哈希；中点分割、主体＋1秒、裁头/尾0.5秒分别核验目标、原生BGM和非目标隔离，再核验撤销、重做及刷新。未完成准备的依赖步骤明确列出，不以其他基线代跑。

本批于11月18日开始，11月19日收到补积分确认后续跑，共35个逻辑变体、36个已受理准备请求。085-T2裁尾首次准备因积分不足终态失败，确认原会话没有后续重试后才重新准备；旧失败及截图保留，重试证据单列attempt-2，已完成变体没有重新生成。

[35个变体素材对应核验](evidence-081-085-production-20261118/source-audit.json)：均对应本轮上传原片或明确的本轮生成产物，没有串用旧产物。

## ERYE199-081

| 变体 | 结果 | 失败/未执行 | 证据 |
|---|---|---|---|
| 081-T1 | Failed | 原生BGM移动1秒时原声也从0秒移到1秒，其他独立声音保持 | [核验记录](evidence-081-085-production-20261118/081-T1/verification.json) · [原图](evidence-081-085-production-20261118/081-T1/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |

## ERYE199-082

| 变体 | 结果 | 失败/未执行 | 证据 |
|---|---|---|---|
| 082-S1 | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/082-S1/verification.json) · [原图](evidence-081-085-production-20261118/082-S1/history-refreshed-verified.png) |
| 082-T1 | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/082-T1/verification.json) · [原图](evidence-081-085-production-20261118/082-T1/history-refreshed-verified.png) |

## ERYE199-083

| 变体 | 结果 | 失败/未执行 | 证据 |
|---|---|---|---|
| 083-S0-split | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/083-S0-split/verification.json) · [原图](evidence-081-085-production-20261118/083-S0-split/cross-split-playback.png) |
| 083-S1-split | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/083-S1-split/verification.json) · [原图](evidence-081-085-production-20261118/083-S1-split/cross-split-playback.png) |
| 083-T1-split | Failed | 原声被连带分割 | [核验记录](evidence-081-085-production-20261118/083-T1-split/verification.json) · [原图](evidence-081-085-production-20261118/083-T1-split/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 083-T2-split | Failed | 原生轨道实际6条，预期5条；未执行：时间编辑、撤销重做、保存重开 | [核验记录](evidence-081-085-production-20261118/083-T2-split/verification.json) · [原图](evidence-081-085-production-20261118/083-T2-split/failure.png) · 云效[FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74) |
| 083-E-split | Failed | 原声被连带分割 | [核验记录](evidence-081-085-production-20261118/083-E-split/verification.json) · [原图](evidence-081-085-production-20261118/083-E-split/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 083-C-split | Failed | 原声被连带分割 | [核验记录](evidence-081-085-production-20261118/083-C-split/verification.json) · [原图](evidence-081-085-production-20261118/083-C-split/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 083-H-split | Failed | 原声被连带分割 | [核验记录](evidence-081-085-production-20261118/083-H-split/verification.json) · [原图](evidence-081-085-production-20261118/083-H-split/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 083-G-split | Failed | 原声被连带分割 | [核验记录](evidence-081-085-production-20261118/083-G-split/verification.json) · [原图](evidence-081-085-production-20261118/083-G-split/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |

## ERYE199-084

| 变体 | 结果 | 失败/未执行 | 证据 |
|---|---|---|---|
| 084-S0-move | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/084-S0-move/verification.json) · [原图](evidence-081-085-production-20261118/084-S0-move/saved-ui-range-verified.png) |
| 084-S1-move | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/084-S1-move/verification.json) · [原图](evidence-081-085-production-20261118/084-S1-move/saved-ui-range-verified.png) |
| 084-T1-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-T1-move/verification.json) · [原图](evidence-081-085-production-20261118/084-T1-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 084-T2-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-T2-move/verification.json) · [原图](evidence-081-085-production-20261118/084-T2-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 084-E-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-E-move/verification.json) · [原图](evidence-081-085-production-20261118/084-E-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 084-C-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-C-move/verification.json) · [原图](evidence-081-085-production-20261118/084-C-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 084-H-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-H-move/verification.json) · [原图](evidence-081-085-production-20261118/084-H-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 084-G-move | Failed | 原声被连带平移 | [核验记录](evidence-081-085-production-20261118/084-G-move/verification.json) · [原图](evidence-081-085-production-20261118/084-G-move/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |

## ERYE199-085

| 变体 | 结果 | 失败/未执行 | 证据 |
|---|---|---|---|
| 085-S0-trim-head | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/085-S0-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-S0-trim-head/saved-ui-range-verified.png) |
| 085-S0-trim-tail | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/085-S0-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-S0-trim-tail/saved-ui-range-verified.png) |
| 085-S1-trim-head | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/085-S1-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-S1-trim-head/saved-ui-range-verified.png) |
| 085-S1-trim-tail | Passed | 通过全部指定步骤 | [核验记录](evidence-081-085-production-20261118/085-S1-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-S1-trim-tail/operation-verified.png) |
| 085-T1-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-T1-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-T1-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-T1-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-T1-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-T1-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-T2-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-T2-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-T2-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-T2-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-T2-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-T2-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-E-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-E-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-E-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-E-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-E-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-E-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-C-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-C-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-C-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-C-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-C-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-C-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-H-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-H-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-H-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-H-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-H-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-H-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-G-trim-head | Failed | 原声被连带裁头 | [核验记录](evidence-081-085-production-20261118/085-G-trim-head/verification.json) · [原图](evidence-081-085-production-20261118/085-G-trim-head/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |
| 085-G-trim-tail | Failed | 原声被连带裁尾 | [核验记录](evidence-081-085-production-20261118/085-G-trim-tail/verification.json) · [原图](evidence-081-085-production-20261118/085-G-trim-tail/failure-after-reopen.png) · 云效[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044) |

## 验收及观察边界

以页面业务结果验收：原生声音角色由本次产物、真实源文件和实际操作区分，不要求开发采用特定关联字段。辅助语音稿索引在重入时从cue变voice但声音文件、时码及显示均未变化，不据此判失败。画布/缩略图占位及编辑区恢复的观察时序修正保留原始记录，不冒充产品缺陷。081首次音乐行位于裁切区，修正时间轴可见范围后在原任务中恢复并重验；正式证据使用修正后的业务结果。

已知FWXC-693译文预览差异另列保留，本批时间编辑与隔离结果不表示该缺陷修复。播放依据真实预览位置推进、声音源与时间范围保存；不冒充人工逐句听审。操作变体不要求额外导出，不把任务原成片当编辑后导出。统一入口仅维护定义、脚本、命令导航，不写执行统计。
