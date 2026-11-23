# ERYE199-017/053 v2失败同步云效（2026-11-16）

ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。

按既定不去重方式分别新建两条；本批自身同步key保留检查点，后续只读回查，不能重放为新提交。每条前置3项，正文包含完整提示词或原生操作入口、详细复现/刷新步骤、实际与预期及验证边界。017附原片及前后业务范围；053附原片、合法/非法时码SRT和0字节样本重建说明，不把空样本说明冒充上传的SRT。

| 用例 | 云效 | 失败范围 | 原图/附件 |
|---|---|---|---|
| ERYE199-017 | [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627) | A裁短连带B和原声从5秒移到3秒，空隙闭合，刷新保持 | 3 / 5 |
| ERYE199-053 | [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726) | 空SRT无提示并写入持久空轨；非法时码拒绝及原字幕恢复正常 | 3 / 8 |

[脱敏回执](defect-sync-017-053-v2-production-20261116.json) · [017完整缺陷](../../../defects/ERYE199-017-trim-moves-B-production-20261116.md) · [053完整缺陷](../../../defects/ERYE199-053-empty-srt-track-production-20261116.md) · [当前状态](execution-status-current.md)。原执行报告的“未云效写入”指原测试阶段，本次为后续同步。
