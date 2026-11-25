# ERYE199-086、087合并缺陷同步（2026-11-19）

2026-11-19：ERYE199-086六个跨视频轨失败变体合并为[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)，087两个独立音频分割失败变体合并为[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。

| 云效缺陷 | 合并范围 | 证据 |
|---|---|---|
| [FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9) | 086：T1/T2/E/C/H/G跨轨后原声误联动；T1/T2/C/H同时观察到原声行重排 | 8张原图，F20/F60及精简证据，共11附件 |
| [FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4) | 087：T1/T2只选独立D分割却连带视频、原声和原生BGM | 5张原图，F20/D及精简证据，共8附件 |

按本批相同业务现象合并，不推断代码根因；历史FWXC-699保留为相关问题参考，不修改旧项。所有八个失败变体有对应失败原图，另附基线、跨轨及分割前选中D的截图。截图哈希、附件ID/名称/字节数及正文稳定引用均已回读核验。

正文含精简前置、可复制的完整提示词、逐步复现、实际和预期；不将观察误差、正确的D分割结果或071已知预览显示差异单独提缺陷。

[脱敏回执](defect-sync-086-087-production-20261119.json) · [本轮执行结果](results-086-090-production-20261119.md)

- [FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)：[完整本地缺陷](../../../defects/ERYE199-086-cross-video-production-20261119.md) · [云效正文回读](evidence-086-090-production-20261119/cloud-sync/cross-video/verified-description.md)
- [FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)：[完整本地缺陷](../../../defects/ERYE199-087-audio-split-production-20261119.md) · [云效正文回读](evidence-086-090-production-20261119/cloud-sync/audio-split/verified-description.md)
