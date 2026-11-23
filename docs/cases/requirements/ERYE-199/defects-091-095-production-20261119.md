# ERYE199-091～095 缺陷同步（2026-11-19）

2026-11-19：[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) 与 [FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74) 的触发条件及结果一致，用户确认按重复关闭，云效回读为“已关闭”。094-T2 仍为 Failed，后续跟踪 FWXC-700。

2026-11-19：ERYE199-091～095 的 29 个失败变体已按四种现象同步 [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)、[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)、[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)、[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c)。36 张原始截图已上传并嵌入，48 个附件及正文回读通过。五例保持 Failed，当前 142 条为 46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run。

| 云效缺陷 | 复现范围 | 原图 / 附件 |
|---|---|---|
| [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) | 091～093：BGM 分割、平移或裁边误改原声，部分分割误切独立音频 D（16 变体，关联 FWXC-699）。 | 17 / 20 |
| [FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e) | 094-T1/X1/X2：BGM 跨轨松手后返回原轨（3 变体）。 | 6 / 9 |
| [FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) | 094-T2：独立双语译配工程多出英文字幕轨（1 变体，关联 FWXC-700）。 | 2 / 4 |
| [FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) | 095：原声分割误切视频、BGM 或独立音频 D（9 变体，关联 FWXC-703）。 | 11 / 15 |

FWXC-699 和 FWXC-700 对应已记录现象，新工作项标注为再次复现，便于区分证据批次。按触发对象区分 095 与 FWXC-703。094-T2 在初始轨道检查失败后停止，未执行跨轨。

[云效回执](defect-sync-091-095-production-20261119.json) · [原始执行报告](results-090-095-production-20261119.md)

- [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1) · [正文和截图](evidence-090-095-production-20261119/cloud-sync/bgm-coupling/verified-description.md)
- [FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e) · [正文和截图](evidence-090-095-production-20261119/cloud-sync/bgm-cross-track/verified-description.md)
- [FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) · [正文和截图](evidence-090-095-production-20261119/cloud-sync/double-caption/verified-description.md)
- [FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c) · [正文和截图](evidence-090-095-production-20261119/cloud-sync/source-split/verified-description.md)
