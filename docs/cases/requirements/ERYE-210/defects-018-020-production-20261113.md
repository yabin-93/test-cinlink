# ERYE210-018/020 云效缺陷同步（2026-11-13）

通过官方OpenAPI直接新建2条，不做历史去重；前置各三条，详细复现、输入值及实际/预期单列。6张真实截图已上传并嵌入，连同原片、供回归准备的中文SRT和核验JSON共12附件；正文、字段、附件ID/名称/字节数及图片引用回读通过。

- ERYE210-018 → [FWXC-506](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df279e880064725c26669adc36)：配音期间独立编辑水印后，原配音任务没有可应用结果；优先级高、严重程度2-严重。
- ERYE210-020 → [FWXC-507](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4861ae7970e41e1293c07e3612)：配音文案撤销未恢复原稿，刷新重开仍显示新稿；优先级中、严重程度3-一般。

状态均为🤔AI提缺陷，负责人牛诗晴，重构10-29、生产环境。018原因未确认，不断言水印修改必然导致错误；020切页及重开保留新稿通过，仅报告撤销未恢复。两例保持Failed，016/017 Blocked、019 Not Applicable及其他结果保留，54条累计6P/9F/4B/1NA/34NR。

[018本地缺陷](../../../defects/ERYE210-018-voice-independent-edit-production-20261113.md) · [020本地缺陷](../../../defects/ERYE210-020-voice-text-undo-production-20261113.md) · [脱敏回执](evidence-016-020-prod-20261113/yunxiao-sync-018-020.json) · [执行报告](results-016-020-prod-20261113.md)。
