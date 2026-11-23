# ERYE199-078失败同步云效（2026-11-18）

ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。

前置保留生产环境、新建专用项目/会话和附件原片，完整列出三轮提示词及串行操作；明确原片及历史工程隔离通过，后两轮额外英文字幕轨失败。按用户既定不去重方式新建1条，不修改FWXC-693等旧缺陷。

4张原图SHA256、云效附件ID/文件名/字节数与正文稳定图片引用已逐一核对；原片和精简证据一并上传。未上传原始run响应、凭据或带签名URL。

[脱敏回执](defect-sync-078-production-20261118.json) · [云效正文回读](evidence-076-080-production-20261118/cloud-sync-078/verified-description.md) · [完整本地缺陷](../../../defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md) · [测试结果](results-076-080-production-20261118.md)。

其余141条测试结果及既有缺陷关联保持。统一入口不写执行结果或同步流水；本批检查点已完成，后续不重复新建。

本地校验：`npm run cases:check` 检查618条、0问题；主进度中078保持Failed且关联已验证的FWXC-694，其余141条与同步前完整记录一致，全部状态统计不变。
