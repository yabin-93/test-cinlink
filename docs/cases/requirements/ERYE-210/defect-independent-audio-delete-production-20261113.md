# 019附带异常：独立音频删除缺陷同步（2026-11-13）

已通过官方OpenAPI直接新建[FWXC-513](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=13b2ef77469fde31d9ca46f97a)：仅删除14秒起的独立背景音频，原视频和原声14～15.393197秒也被裁掉，20秒原片缩短为约18.61秒。不做历史去重，状态🤔AI提缺陷，负责人牛诗晴，重构10-29、生产环境，优先级高、严重程度2-严重。

前置三条，详细复现及实际/预期已填写；1张真实截图上传并嵌入，原视频、同一段WAV（1.393197秒、44100Hz/单声道PCM）、回归准备SRT和核验JSON共5附件。正文、字段、附件ID/名称/字节数与图片引用回读通过。

019混合删除主用例保持Blocked，受限字幕前置未成立，混合步骤未执行；本缺陷只关联独立音频删除观察，未改测试统计。当前54条6P/9F/4B/0NA/35NR。

[本地完整缺陷](../../../defects/ERYE210-019-independent-audio-delete-production-20261113.md) · [脱敏回执](evidence-019-v2-prod-20261113/yunxiao-sync-independent-audio-delete.json) · [本轮执行报告](results-019-v2-prod-20261113.md) · [回归WAV](evidence-019-v2-prod-20261113/A1-independent.wav)。
