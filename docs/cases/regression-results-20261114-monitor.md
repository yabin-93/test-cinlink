# 已修复缺陷本轮执行状态（2026-11-14持续任务4）

本轮结束2026-11-14T04:14:11.538312+08:00。原验收5 Passed / 2 Failed / 5 Blocked / 0 Not Run；扩散24项{'Blocked': 2, 'Passed': 12, 'Not Run': 8, 'Failed': 2}。8项Not Run扩散因前置不满足，不能补算通过；352严格I2鼠标行为分支未覆盖，416扩散1同会话偏差保留。原流程、完整参数/提示词、实际截图/文件与云效回读见单项报告及[汇总](../defects/fixed-monitor-20261114-020020.md)。

| 对应用例/流程 | 缺陷报告 | 原验收 | 两条扩散 | 云效回读 | 固定脚本 |
|---|---|---|---|---|---|
| P1-YT-006 | [FWXC-416](../defects/FWXC-416-retest-staging-20261114-monitor.md) | Blocked | Blocked / Blocked | 已修复 | 未接入固定脚本；既有登记不改 |
| P1-YT-001、P1-YT-003 | [FWXC-414](../defects/FWXC-414-retest-staging-20261114-monitor.md) | Failed | Passed / Passed | ❌AI未通过 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-407](../defects/FWXC-407-retest-prod-20261114-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 未接入固定脚本；既有登记不改 |
| P0-YT-012 | [FWXC-403](../defects/FWXC-403-retest-staging-20261114-monitor.md) | Blocked | Not Run / Not Run | 已修复 | 未接入固定脚本；既有登记不改 |
| P0-YT-011 | [FWXC-399](../defects/FWXC-399-retest-staging-20261114-monitor.md) | Blocked | Not Run / Not Run | 已修复 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-346](../defects/FWXC-346-retest-prod-20261114-monitor.md) | Blocked | Not Run / Not Run | 已修复 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-409](../defects/FWXC-409-retest-staging-20261114-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 未接入固定脚本；既有登记不改 |
| ERYE237-004/Agent历史查看 | [FWXC-361](../defects/FWXC-361-retest-prod-20261114-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 未接入固定脚本；既有登记不改 |
| ERYE237-001/卡片入口 | [FWXC-352](../defects/FWXC-352-retest-prod-20261114-monitor.md) | Failed | Failed / Failed | ❌AI未通过 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-337](../defects/FWXC-337-retest-prod-20261114-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-333](../defects/FWXC-333-retest-prod-20261114-monitor.md) | Blocked | Not Run / Not Run | 已修复 | 未接入固定脚本；既有登记不改 |
| 原缺陷业务流程 | [FWXC-323](../defects/FWXC-323-retest-prod-20261114-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 未接入固定脚本；既有登记不改 |

原问题与独立偏差分开，337/361独立偏差仅本地记录，原验收Passed及AI通过不混改。无正式需求步骤变更，无云效评论/新单或Git提交推送。
