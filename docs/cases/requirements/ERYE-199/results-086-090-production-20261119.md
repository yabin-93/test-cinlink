<!-- ERYE199-086087-YUNXIAO-20261119 -->
2026-11-19：ERYE199-086六个跨视频轨失败变体合并为[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)，087两个独立音频分割失败变体合并为[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。 [同步明细](defects-086-087-production-20261119.md)。
<!-- /ERYE199-086087-YUNXIAO-20261119 -->

# ERYE199-086～090生产执行结果（2026-11-19）

2026-11-19：ERYE199-086～090生产实跑2 Failed / 3 Passed；18个变体10 Passed / 8 Failed，5条接入AUTO。当前142条46 Passed / 15 Failed / 2 Blocked / 21 Not Applicable / 58 Not Run；其他137条及既有云效关联保持。失败及关键步骤截图已保存，后续已同步FWXC-702/FWXC-703。

086～090生产测试已归档：18个卡片/操作变体，已完成18个，当前10 Passed / 8 Failed。

本轮专用项目 `ERYE199-086-090-生产-20261119` / `f2a117e9-f8be-483e-8faf-cb20185f9732`，Ego Lite有头，TaskSpace 9。每个变体使用本轮独立原生工程；按当前页面业务结果验收，API只读辅助。不使用旧生产工程代跑。

[用例定义](cases.md#erye199-card-multitrack) · [自动化说明](automation.md)

| 用例 | 结果 | 变体结果 |
|---|---|---|
| ERYE199-086 | Failed | 2 Passed / 6 Failed |
| ERYE199-087 | Failed | 2 Failed |
| ERYE199-088 | Passed | 2 Passed |
| ERYE199-089 | Passed | 4 Passed |
| ERYE199-090 | Passed | 2 Passed |

| 变体 | 结果 | 发现/未覆盖 | 证据 |
|---|---|---|---|
| 086-S0-cross-video | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/086-S0-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-S0-cross-video/verified.png) |
| 086-S1-cross-video | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/086-S1-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-S1-cross-video/verified.png) |
| 086-T1-cross-video | Failed | 原声行/非目标轨随视频换轨而变化、视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-T1-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-T1-cross-video/failure-after-reopen.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 086-T2-cross-video | Failed | 原声行/非目标轨随视频换轨而变化、视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-T2-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-T2-cross-video/failure-after-reopen.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 086-E-cross-video | Failed | 视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-E-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-E-cross-video/failure-after-reopen.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 086-C-cross-video | Failed | 原声行/非目标轨随视频换轨而变化、视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-C-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-C-cross-video/failure-preview-supplement.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 086-H-cross-video | Failed | 原声行/非目标轨随视频换轨而变化、视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-H-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-H-cross-video/failure-after-reopen.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 086-G-cross-video | Failed | 视频换轨后平移误改原声 | [核验](evidence-086-090-production-20261119/086-G-cross-video/verification.json) · [原图](evidence-086-090-production-20261119/086-G-cross-video/failure-after-reopen.png) · 云效[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) |
| 087-T1-split | Failed | 分割D误改视频、原声、BGM | [核验](evidence-086-090-production-20261119/087-T1-split/verification.json) · [原图](evidence-086-090-production-20261119/087-T1-split/failure-after-reopen.png) · 云效[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4) |
| 087-T2-split | Failed | 分割D误改视频、原声、BGM | [核验](evidence-086-090-production-20261119/087-T2-split/verification.json) · [原图](evidence-086-090-production-20261119/087-T2-split/failure-after-reopen.png) · 云效[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4) |
| 088-T1-move | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/088-T1-move/verification.json) · [原图](evidence-086-090-production-20261119/088-T1-move/verified-after-observer-correction.png) |
| 088-T2-move | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/088-T2-move/verification.json) · [原图](evidence-086-090-production-20261119/088-T2-move/verified.png) |
| 089-T1-trim-head | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/089-T1-trim-head/verification.json) · [原图](evidence-086-090-production-20261119/089-T1-trim-head/verified.png) |
| 089-T1-trim-tail | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/089-T1-trim-tail/verification.json) · [原图](evidence-086-090-production-20261119/089-T1-trim-tail/verified.png) |
| 089-T2-trim-head | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/089-T2-trim-head/verification.json) · [原图](evidence-086-090-production-20261119/089-T2-trim-head/verified.png) |
| 089-T2-trim-tail | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/089-T2-trim-tail/verification.json) · [原图](evidence-086-090-production-20261119/089-T2-trim-tail/verified.png) |
| 090-T1-cross-audio | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/090-T1-cross-audio/verification.json) · [原图](evidence-086-090-production-20261119/090-T1-cross-audio/verified.png) |
| 090-T2-cross-audio | Passed | 通过指定步骤 | [核验](evidence-086-090-production-20261119/090-T2-cross-audio/verification.json) · [原图](evidence-086-090-production-20261119/090-T2-cross-audio/verified.png) |

视频跨轨适用S0/S1/T1/T2/E/C/H/G；独立D适用X1/X2，分别记录分割、主体平移、左右裁剪及跨轨。D由页面登记并放入6～18秒，源0～12秒；不伪造原生译声或BGM。跨轨在空白处建立同类型新轨，核对唯一实例和源轨其余片段，再移动1秒检查关联/隔离。每个实际编辑核验撤销、重做、刷新后的页面时码。

缺少目标入口时保留选中对象、播放头和按钮状态截图，明确未执行步骤，不以内部接口或视频分割替代独立音频操作。声音核验记录原生播放推进及可读媒体状态、真实文件绑定和源区间；不宣称人工逐字听审或额外导出已覆盖。

[本轮素材对应核验](evidence-086-090-production-20261119/source-audit.json)。已知FWXC-693译文显示差异单列保留；FWXC-699/700只作既有问题参考，执行阶段未写云效，后续086/087已同步FWXC-702/FWXC-703。

观察校正：首个S0手势命中播放头，经确认工程内容未变后在原结果恢复；C约12毫秒起点量化按既定一帧容差记录，可见预览补核通过。088-T1仅辅助语音索引重建，实际声音文件、时码与编辑结果未变，已校正通过；原始观察保留在核验记录。

本批18个目标操作均已执行，无阻塞或不适用；未出现补槽表单，C/H方案审核已确认。18个会话、任务及编辑工程均各自独立，素材对应核验无串用。

本地检查：618条用例格式检查0问题；13项定向安全测试通过；122个证据文件、39处报告链接及其他137条用例原记录核验通过。
