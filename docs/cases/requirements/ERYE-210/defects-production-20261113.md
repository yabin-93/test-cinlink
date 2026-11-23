# ERYE-210 生产缺陷同步记录

<!-- ERYE210-007-010-CLOUD-20261113 -->
本次新增007/010两条：[FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)、[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)；6截图/12附件及正文回读通过。[新增明细](defects-007-010-production-20261113.md)。本页下方001～005原批次3条记录保留；2026-11-13累计5条、13截图、28附件。
<!-- /ERYE210-007-010-CLOUD-20261113 -->

2026-11-13：通过官方OpenAPI直接新建3条，未查历史重复；前置步骤均精简为三条，保留完整提示词和复现步骤。7张真实截图均上传并嵌入，合计16个附件，正文/字段/附件ID、名称、字节数及图片引用回读通过。

| 用例 | 云效缺陷 | 状态 | 截图/附件 | 本地缺陷 |
|---|---|---|---|---|
| ERYE210-002 | [FWXC-482](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441) | 🤔AI提缺陷 | 1/3 | [详细复现步骤](../../../defects/ERYE210-002-default-tab-production-20261113.md) |
| ERYE210-004 | [FWXC-483](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc663b74e4bf60d0019f5c04e3) | 🤔AI提缺陷 | 3/8 | [详细复现步骤](../../../defects/ERYE210-004-voice-result-entry-production-20261113.md) |
| ERYE210-005 | [FWXC-484](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f97b390bf7704588fed0bfa706) | 🤔AI提缺陷 | 3/5 | [详细复现步骤](../../../defects/ERYE210-005-review-return-production-20261113.md) |

三条均保持Failed；本次不重跑、不改变005审核结果、不修改其他工作项或推送代码。004导航缺陷使用后续真实生成的受控配音，不把更早翻译配音失败或夹具编码错误混入导航判定。002的保存500为伴随观察，不推定与默认入口同因。

[完整测试报告](results-001-005-prod-20261113.md) · [逐例进度](execution-status-20261113.md) · [脱敏云效回执与原图哈希](evidence-001-005-prod-20261113/yunxiao-sync.json)。
