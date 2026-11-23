# 【ERYE196-055】字幕原始提交重试未应用后清除本机草稿，缺少冲突说明

云效：[FWXC-623](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=17bea9bb01b2494a50b6b79a4a)，官方OpenAPI回读通过。

**现象**

字幕保存失败后，远端已保存不同文字。点击“重试原始提交”返回未应用结果，页面却移除本机待保存文字及恢复入口，没有说明差异或提供后续选择。

**前置步骤**

1. Chrome与Safari以同一测试账号U1登录生产环境，打开同一已有视频工程。
2. 原文C1为“本机草稿未提交”（4～6秒，已保存），C2为“Second caption”（10～12秒）；两页可独立读取和编辑C1。

**提示词**

无Agent提示词。Chrome手动输入“055本机待保存”；Safari手动输入“055云端新文”。

**复现步骤**

1. Chrome DevTools仅阻断实际保存地址 `/cloud-tool-api/v1/editor/projects/save`，其他网络保持正常；将C1改为“055本机待保存”并按Return。确认请求为blocked:devtools、页面提示保留原始提交。
2. Safari刷新重开，确认C1仍为已保存旧文；将其改为“055云端新文”并保存。
3. Chrome仍显示“055本机待保存”。取消保存请求阻断，点击“加载当前服务器状态”（本轮未见可见状态变化），再点击“重试原始提交”。
4. 检查本机文字、冲突说明及后续恢复入口。

**实际结果**

重试产生的真实保存请求返回HTTP 200，applied=false、replayed=false，current.revision=43，current内C1为“055云端新文”。Chrome恢复可编辑并显示云端新文，“055本机待保存”及原始提交恢复条不再显示；没有可见冲突说明、差异比较或继续保留/重新应用入口。
会话a9a99d8f-02fa-4889-9bb9-30a752a925a2；工程3c731ad9-018d-4784-ae38-7e78db2f5b55。

**预期结果**

原始提交因远端新版本未应用时，应说明冲突并保留本机输入，允许复制、比较或经明确选择重新应用；不能在无说明的情况下移除待保存文字及恢复入口。

**影响**

用户重试以恢复未保存内容，当前页面却不再提供该文字及后续处理入口，可能丢失本机输入。

**补充**

同步标识：ERYE196-055-PROD-20261116-DRAFT-RETRY

2026-11-16 Chrome生产实测，Safari为独立保存对照。完整保留“加载当前服务器状态→重试原始提交”的实际操作顺序，不把本轮结论扩大到未执行的纯重试路径。初始响应延迟实验中独立页面已读到输入，不能作为未保存前置；本缺陷仅基于实际阻断保存后的恢复分支。没有认定远端新文被覆盖、重复扣费或共同代码根因。结束已恢复Welcome，取消阻断并关闭DevTools。需求来源：ERYE-196 WFR07/09，§05/06，WAC11/16。

**失败截图**

保存请求被阻断，本机文字与原始提交恢复入口仍保留

![055-save-blocked.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d12b0c8090458fd38b3c8973ab)

明确重试后显示云端新文，本机文字及恢复条不再显示

![055-retry-lost-local.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=06894e503b36f676288517630e)
