# 已修复缺陷新轮执行状态（2026-11-14 06:00）

本轮7条新修复项，本轮已完成；原验收{'Blocked': 2, 'Passed': 4, 'Failed': 1}，未运行及阻塞不算通过。5条无变化已知阻塞保留[上轮状态](regression-results-20261114-monitor.md)，不重复消耗业务。详情[本轮报告](../defects/fixed-monitor-20261114-060021.md)。

| 对应流程 | 缺陷报告 | 原验收 | 两条扩散 | 云效状态 | 固定脚本 |
|---|---|---|---|---|---|
| ERYE210-020 | [FWXC-507](../defects/FWXC-507-retest-prod-20261114-0600-monitor.md) | Blocked | Blocked / Blocked | 已修复 | 本轮未新集成固定脚本，既有登记不改 |
| ERYE210-002 | [FWXC-482](../defects/FWXC-482-retest-prod-20261114-0600-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 本轮未新集成固定脚本，既有登记不改 |
| SSO-024/R3 | [FWXC-474](../defects/FWXC-474-retest-prod-20261114-0600-monitor.md) | Passed | Passed / Passed | ✅AI通过 | 本轮未新集成固定脚本，既有登记不改 |
| SSO-025/R1 | [FWXC-473](../defects/FWXC-473-retest-prod-20261114-0600-monitor.md) | Passed | Passed / Failed | ✅AI通过 | 本轮未新集成固定脚本，既有登记不改 |
| 导出/去口水词 | [FWXC-469](../defects/FWXC-469-retest-prod-20261114-0600-monitor.md) | Blocked | Passed / Passed | 已修复 | 本轮未新集成固定脚本，既有登记不改 |
| SSO-006/R2/R3、SSO-014/R1 | [FWXC-466](../defects/FWXC-466-retest-prod-20261114-0600-monitor.md) | Failed | Blocked / Passed | ❌AI未通过 | 本轮未新集成固定脚本，既有登记不改 |
| 图片无提示分析 | [FWXC-318](../defects/FWXC-318-retest-prod-20261114-0600-monitor.md) | Passed | Passed / Failed | ✅AI通过 | 本轮未新集成固定脚本，既有登记不改 |

本轮扩散汇总9 Passed / 2 Failed / 3 Blocked；466扩散1待试听新产物27～29秒、38～39秒，507两条扩散因原配音基线失败阻塞。未覆盖步骤和未重跑的SSO其余轮次不算通过。云效实际变更5项，均已回读；持续检查保留，同一修复证据不重复提交业务。用例检查器543条、0问题，现有AUTO/PLAN标签不改。
