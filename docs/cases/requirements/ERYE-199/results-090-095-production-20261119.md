<!-- ERYE199-091095-YUNXIAO-20261119 -->
2026-11-19：ERYE199-091～095 的 29 个失败变体已按四种现象同步 [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)、[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)、[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)、[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c)。36 张原始截图已上传并嵌入，48 个附件及正文回读通过。五例保持 Failed，当前 142 条为 46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run。 [同步明细](defects-091-095-production-20261119.md)。
<!-- /ERYE199-091095-YUNXIAO-20261119 -->

# ERYE199-090～095生产测试（2026-11-19）

2026-11-19：ERYE199-090～095生产实跑1 Passed / 5 Failed；31变体2 Passed / 29 Failed，6条AUTO。当前142条46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run；其他136条和既有云效关联保持，090原通过记录保留历史。失败截图已保存，测试结束后已同步云效。

090～095生产测试已归档：31个独立卡片/组合/操作变体，已完成31个，当前2 Passed / 29 Failed。

归档核验：31个源素材映射及独立工程已核对，198张原始PNG的哈希及可解码性检查通过；27项脚本安全检查通过，用例格式检查618条、0问题。其他136条主用例记录保持不变。

本轮新建项目 `ERYE199-090-095-生产-20261119` / `ee31c2a7-8ee0-4513-ab3c-394e41aa6bfd`，Ego Lite有头、TaskSpace 10。090重新执行；091～095逐一覆盖T1/T2/X1/X2及各例规定卡片，左右裁边分别使用新工程。

| 用例 | 结果 | 变体结果 |
|---|---|---|
| ERYE199-090 | Passed | 2 Passed |
| ERYE199-091 | Failed | 4 Failed |
| ERYE199-092 | Failed | 4 Failed |
| ERYE199-093 | Failed | 8 Failed |
| ERYE199-094 | Failed | 4 Failed |
| ERYE199-095 | Failed | 9 Failed |

| 变体 | 结果 | 发现/未覆盖 | 证据 |
|---|---|---|---|
| 090-T1-cross-audio | Passed | 通过规定步骤 | [核验](evidence-090-095-production-20261119/090-T1-cross-audio/verification.json) · [原图](evidence-090-095-production-20261119/090-T1-cross-audio/verified.png) |
| 090-T2-cross-audio | Passed | 通过规定步骤 | [核验](evidence-090-095-production-20261119/090-T2-cross-audio/verification.json) · [原图](evidence-090-095-production-20261119/090-T2-cross-audio/verified.png) |
| 091-T1-split | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/091-T1-split/verification.json) · [原图](evidence-090-095-production-20261119/091-T1-split/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 091-T2-split | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/091-T2-split/verification.json) · [原图](evidence-090-095-production-20261119/091-T2-split/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 091-X1-split | Failed | 误改原声、独立D | [核验](evidence-090-095-production-20261119/091-X1-split/verification.json) · [原图](evidence-090-095-production-20261119/091-X1-split/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 091-X2-split | Failed | 误改原声、独立D | [核验](evidence-090-095-production-20261119/091-X2-split/verification.json) · [原图](evidence-090-095-production-20261119/091-X2-split/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 092-T1-move | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/092-T1-move/verification.json) · [原图](evidence-090-095-production-20261119/092-T1-move/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 092-T2-move | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/092-T2-move/verification.json) · [原图](evidence-090-095-production-20261119/092-T2-move/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 092-X1-move | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/092-X1-move/verification.json) · [原图](evidence-090-095-production-20261119/092-X1-move/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 092-X2-move | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/092-X2-move/verification.json) · [原图](evidence-090-095-production-20261119/092-X2-move/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-T1-trim-head | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-T1-trim-head/verification.json) · [原图](evidence-090-095-production-20261119/093-T1-trim-head/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-T1-trim-tail | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-T1-trim-tail/verification.json) · [原图](evidence-090-095-production-20261119/093-T1-trim-tail/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-T2-trim-head | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-T2-trim-head/verification.json) · [原图](evidence-090-095-production-20261119/093-T2-trim-head/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-T2-trim-tail | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-T2-trim-tail/verification.json) · [原图](evidence-090-095-production-20261119/093-T2-trim-tail/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-X1-trim-head | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-X1-trim-head/verification.json) · [原图](evidence-090-095-production-20261119/093-X1-trim-head/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-X1-trim-tail | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-X1-trim-tail/verification.json) · [原图](evidence-090-095-production-20261119/093-X1-trim-tail/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-X2-trim-head | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-X2-trim-head/verification.json) · [原图](evidence-090-095-production-20261119/093-X2-trim-head/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 093-X2-trim-tail | Failed | 误改原声 | [核验](evidence-090-095-production-20261119/093-X2-trim-tail/verification.json) · [原图](evidence-090-095-production-20261119/093-X2-trim-tail/failure-after-reopen.png) · 云效[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) |
| 094-T1-cross-bgm | Failed | BGM跨轨形成新的音频轨；未执行：换轨后平移及视频关联核验、跨轨撤销重做（实际未发生编辑） | [核验](evidence-090-095-production-20261119/094-T1-cross-bgm/verification.json) · [原图](evidence-090-095-production-20261119/094-T1-cross-bgm/failure-after-reopen.png) · 云效[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e) |
| 094-T2-cross-bgm | Failed | 原生轨道组合异常（实际6轨：译文字幕、译文字幕、视频、原声、配音、背景音乐）；未执行：目标声音编辑、撤销重做、保存重开 | [核验](evidence-090-095-production-20261119/094-T2-cross-bgm/verification.json) · [原图](evidence-090-095-production-20261119/094-T2-cross-bgm/baseline-failure.png) · 云效[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) |
| 094-X1-cross-bgm | Failed | BGM跨轨形成新的音频轨；未执行：换轨后平移及视频关联核验、跨轨撤销重做（实际未发生编辑） | [核验](evidence-090-095-production-20261119/094-X1-cross-bgm/verification.json) · [原图](evidence-090-095-production-20261119/094-X1-cross-bgm/failure-after-reopen.png) · 云效[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e) |
| 094-X2-cross-bgm | Failed | BGM跨轨形成新的音频轨；未执行：换轨后平移及视频关联核验、跨轨撤销重做（实际未发生编辑） | [核验](evidence-090-095-production-20261119/094-X2-cross-bgm/verification.json) · [原图](evidence-090-095-production-20261119/094-X2-cross-bgm/failure-after-reopen.png) · 云效[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e) |
| 095-S0-split | Failed | 误改视频 | [核验](evidence-090-095-production-20261119/095-S0-split/verification.json) · [原图](evidence-090-095-production-20261119/095-S0-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-S1-split | Failed | 误改视频 | [核验](evidence-090-095-production-20261119/095-S1-split/verification.json) · [原图](evidence-090-095-production-20261119/095-S1-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-T1-split | Failed | 误改视频、原生BGM | [核验](evidence-090-095-production-20261119/095-T1-split/verification.json) · [原图](evidence-090-095-production-20261119/095-T1-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-T2-split | Failed | 误改视频、原生BGM | [核验](evidence-090-095-production-20261119/095-T2-split/verification.json) · [原图](evidence-090-095-production-20261119/095-T2-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-X1-split | Failed | 误改视频、原生BGM、独立D | [核验](evidence-090-095-production-20261119/095-X1-split/verification.json) · [原图](evidence-090-095-production-20261119/095-X1-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-X2-split | Failed | 误改视频、原生BGM、独立D | [核验](evidence-090-095-production-20261119/095-X2-split/verification.json) · [原图](evidence-090-095-production-20261119/095-X2-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-E-split | Failed | 单击目标声音后选中范围未扩大到非关联轨、误改视频 | [核验](evidence-090-095-production-20261119/095-E-split/verification.json) · [原图](evidence-090-095-production-20261119/095-E-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-C-split | Failed | 单击目标声音后选中范围未扩大到非关联轨、误改视频 | [核验](evidence-090-095-production-20261119/095-C-split/verification.json) · [原图](evidence-090-095-production-20261119/095-C-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |
| 095-H-split | Failed | 单击目标声音后选中范围未扩大到非关联轨、误改视频 | [核验](evidence-090-095-production-20261119/095-H-split/verification.json) · [原图](evidence-090-095-production-20261119/095-H-split/failure-after-reopen.png) · 云效[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) |

各变体只操作本轮新建原生工程；普通独立D由页面导入并放入6～18秒，不用于伪造BGM或译声。BGM和视频默认双向联动；字幕、原声、译声及普通独立D保持。095只切原声，视频/BGM不得产生新切点。

目标操作、临时静音、撤销/重做和重开均走页面；API仅只读核对。试听记录实际隔离启停、播放推进、源文件和源区间，不声称人工逐字听审；本批不额外导出。已知FWXC-693字幕显示差异单列，不以本次时间编辑通过宣称修复。

[素材与工程对应核验](evidence-090-095-production-20261119/source-audit.json)。测试结束后按四种现象同步云效。

092-X1首次原生准备因积分不足终止（需要200，剩余154），目标平移未执行；用户确认补充积分后另建独立会话准备，第一次记录与原图保留在该变体preparation-history.json及historical-credit-failure-attempt-1.png，不把环境阻塞截图用作后续产品失败证据。

092-X2首次基线播放30秒观察超时，后续页面已自行到片尾；保留原样本及观察截图，在同一未编辑工程重新定位后播放与五轨基线核验通过，再继续目标操作。未推断超时原因，未重复生成。

095-T1首次临时试听恢复状态未收敛，后续目标历史检查受到影响；原始负检查及首次现场保留。已在同一恢复到原始基线的工程补核验原声分割、临时启停恢复、目标撤销/重做及重开，补核验通过；主失败“原声分割误切视频/BGM”仍复现，整例保持Failed。未重新生成任务。
[首次受影响检查](evidence-090-095-production-20261119/095-T1-split/first-history-observation-checks.json) · [首次现场](evidence-090-095-production-20261119/095-T1-split/first-history-failure-after-reopen.png) · [补核验结果](evidence-090-095-production-20261119/095-T1-split/verification.json)
