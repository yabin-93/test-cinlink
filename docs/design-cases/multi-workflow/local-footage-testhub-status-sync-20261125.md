# 本地素材查找云效执行状态同步（2026-11-25）

已按本地当前LF-20261124-R1编号的62条最新执行结果，更新云效“用例批量回归”计划中“本地素材查找测试用例”目录的执行状态。逐条按标题编号与WLAX编号对应，并刷新后遍历全部62条，回读全部一致。

[打开云效测试计划](https://devops.aliyun.com/testhub/plan/da591274a8987f63baa23a9100/case#selectedTreeIdentifier=6c55dbaab748aefe6d1a26f8bc)

| 本地状态 | 云效执行状态 | 数量 |
|---|---|---|
| Passed | 已通过 | 50 |
| Failed | 未通过 | 9 |
| Blocked | 暂缓 | 1 |
| Not Applicable | 暂缓 | 2 |

云效菜单提供“待测试、暂缓、已通过、未通过”，没有独立阻塞/不适用状态，因此两类均对应“暂缓”；本地仍保留原分类。未通过用例为LF-27、29、36、43、44、50、51、59、61；暂缓用例为LF-31（阻塞）、LF-40与LF-52（不适用）。

本次只同步用例执行状态，不是产品重跑；没有修改用例设计或关联缺陷的处理状态，也未将执行报告写入用例正文。LF-01通过仅指缓存复用及画面检索场景，首次分析仍未覆盖。固定自动化仍AUTO3/PLAN59，本轮未运行固定脚本。

## 逐条回读结果

| 当前编号 | 云效编号 | 本地最新结果 | 云效已保存状态 |
|---|---|---|---|
| LF-01 | WLAX-662 | Passed | 已通过 |
| LF-02 | WLAX-663 | Passed | 已通过 |
| LF-03 | WLAX-664 | Passed | 已通过 |
| LF-04 | WLAX-665 | Passed | 已通过 |
| LF-05 | WLAX-666 | Passed | 已通过 |
| LF-06 | WLAX-667 | Passed | 已通过 |
| LF-07 | WLAX-668 | Passed | 已通过 |
| LF-08 | WLAX-669 | Passed | 已通过 |
| LF-09 | WLAX-670 | Passed | 已通过 |
| LF-10 | WLAX-671 | Passed | 已通过 |
| LF-11 | WLAX-672 | Passed | 已通过 |
| LF-12 | WLAX-673 | Passed | 已通过 |
| LF-13 | WLAX-674 | Passed | 已通过 |
| LF-14 | WLAX-675 | Passed | 已通过 |
| LF-15 | WLAX-676 | Passed | 已通过 |
| LF-16 | WLAX-677 | Passed | 已通过 |
| LF-17 | WLAX-678 | Passed | 已通过 |
| LF-18 | WLAX-679 | Passed | 已通过 |
| LF-19 | WLAX-680 | Passed | 已通过 |
| LF-20 | WLAX-681 | Passed | 已通过 |
| LF-21 | WLAX-682 | Passed | 已通过 |
| LF-22 | WLAX-683 | Passed | 已通过 |
| LF-23 | WLAX-684 | Passed | 已通过 |
| LF-24 | WLAX-685 | Passed | 已通过 |
| LF-25 | WLAX-686 | Passed | 已通过 |
| LF-26 | WLAX-687 | Passed | 已通过 |
| LF-27 | WLAX-688 | Failed | 未通过 |
| LF-28 | WLAX-689 | Passed | 已通过 |
| LF-29 | WLAX-690 | Failed | 未通过 |
| LF-30 | WLAX-691 | Passed | 已通过 |
| LF-31 | WLAX-692 | Blocked | 暂缓 |
| LF-32 | WLAX-693 | Passed | 已通过 |
| LF-33 | WLAX-694 | Passed | 已通过 |
| LF-34 | WLAX-695 | Passed | 已通过 |
| LF-35 | WLAX-696 | Passed | 已通过 |
| LF-36 | WLAX-697 | Failed | 未通过 |
| LF-37 | WLAX-698 | Passed | 已通过 |
| LF-38 | WLAX-699 | Passed | 已通过 |
| LF-39 | WLAX-700 | Passed | 已通过 |
| LF-40 | WLAX-701 | Not Applicable | 暂缓 |
| LF-41 | WLAX-702 | Passed | 已通过 |
| LF-42 | WLAX-703 | Passed | 已通过 |
| LF-43 | WLAX-704 | Failed | 未通过 |
| LF-44 | WLAX-705 | Failed | 未通过 |
| LF-45 | WLAX-706 | Passed | 已通过 |
| LF-46 | WLAX-707 | Passed | 已通过 |
| LF-47 | WLAX-708 | Passed | 已通过 |
| LF-48 | WLAX-709 | Passed | 已通过 |
| LF-49 | WLAX-710 | Passed | 已通过 |
| LF-50 | WLAX-711 | Failed | 未通过 |
| LF-51 | WLAX-712 | Failed | 未通过 |
| LF-52 | WLAX-713 | Not Applicable | 暂缓 |
| LF-53 | WLAX-714 | Passed | 已通过 |
| LF-54 | WLAX-715 | Passed | 已通过 |
| LF-55 | WLAX-716 | Passed | 已通过 |
| LF-56 | WLAX-717 | Passed | 已通过 |
| LF-57 | WLAX-718 | Passed | 已通过 |
| LF-58 | WLAX-719 | Passed | 已通过 |
| LF-59 | WLAX-720 | Failed | 未通过 |
| LF-60 | WLAX-721 | Passed | 已通过 |
| LF-61 | WLAX-722 | Failed | 未通过 |
| LF-62 | WLAX-723 | Passed | 已通过 |

## 证据

本机原始回执目录：`reports/testhub-local-footage-status-sync-20261125/`。

- `local-status-before.json`：同步前本地执行状态。
- `receipt.json`：62条逐项更新及刷新回读结果。
- `persisted-all-62.json`：刷新后全部62条实际DOM状态。
- `LF61-failed-persisted.png`、`LF61-failed-persisted.txt`：LF-61“未通过”详情页面截图与快照。

本地独立状态JSON增加云效同步字段，原Passed/Failed/Blocked/Not Applicable、实测报告及脚本状态保持。
