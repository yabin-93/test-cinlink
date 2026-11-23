# ERYE210-013/015 云效缺陷同步（2026-11-13）

通过官方OpenAPI直接新建2条，不查历史重复；前置各三条，详细步骤、实际/预期及边界已填写。共4张真实截图上传并嵌入，含脱敏核验JSON和015原片/字幕共8附件；正文、字段、附件ID/名称/大小及图片引用回读通过。

- ERYE210-013 → [FWXC-492](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a)：纯音频无画面工程仍可保存文字水印；优先级中、严重程度3-一般。
- ERYE210-015 → [FWXC-493](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154)：未选片段时分割按钮禁用但缺少原因提示；优先级低、严重程度4-轻微。

两条状态均为🤔AI提缺陷，负责人牛诗晴，重构10-29，生产环境。015仅报告缺少提示，分割和撤销正常；013图片水印仅观察入口，不声称图片保存已验证。013/015测试状态仍Failed；011/014 Blocked、012 Passed保持，54条累计6P/7F/2B/39NR。

[013本地缺陷](../../../defects/ERYE210-013-audio-watermark-production-20261113.md) · [015本地缺陷](../../../defects/ERYE210-015-selection-guidance-production-20261113.md) · [脱敏回执](evidence-011-015-prod-20261113/yunxiao-sync-013-015.json) · [执行报告](results-011-015-prod-20261113.md)。
