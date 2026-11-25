# ERYE199-030 云效缺陷同步

2026-11-13通过官方OpenAPI直接新建[FWXC-517](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a8dc2ee87914e60ad64d64254c)，未查历史重复，未修改既有缺陷。

标题：【生产环境】【ERYE199-030】组合请求导出SRT及样式字幕时整体失败，报Unknown or missing editor fields。

状态🤔AI提缺陷，负责人牛诗晴，优先级高、严重程度2-严重，迭代重构10-29，生产环境。

正文包含精简前置、原始完整组合请求及单独SRT对照指令、详细复现步骤、实际与预期。3张原始截图上传并嵌入；原视频、原SRT、实际导出SRT及脱敏证据共7附件，正文/字段/附件ID、文件名、字节数及图片引用均回读验证通过。

缺陷限定为明确允许降级的组合字幕导出整体失败（Unknown or missing editor fields）。单独SRT导出成功，ASS/SSA未实现已明确说明；不据此声称所有SRT导出失败。

本次未重跑产品任务、未重发失败请求、未接入自动化或推送代码。030继续Failed，自动化PLAN；本轮28条统计仍2 Passed、1 Failed、1 Blocked、24 Not Applicable；040/050保持已删除。

[本地完整缺陷](../../../defects/ERYE199-030-combined-subtitle-export-production-20261113.md) · [回执和附件哈希](defect-sync-030-production-20261113.json) · [当前状态](execution-status-current.md)。
