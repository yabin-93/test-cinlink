# ERYE210-040/041 云效缺陷同步（2026-11-13）

通过官方OpenAPI分别新建两条，不做历史去重；每条正文包含精简三条前置、详细复现、输入/参数、实际/预期及影响。4张本轮原始截图已上传并嵌入，040另附原片和真实WAV；共8附件与正文、字段、图片引用回读核验通过。

- ERYE210-040 → [FWXC-516](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f319c777b70fbfb7010c5a15ad)：【生产环境】【ERYE210-040】删除独立背景音频时，原视频和原声同一范围也被裁剪；高 / 2-严重，2截图/5附件。
- ERYE210-041 → [FWXC-518](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=775dbf83cad7c40e3d8432d74e)：【生产环境】【ERYE210-041】Media聊天/工程空素材区域缺少素材名称搜索入口；中 / 3-一般，2截图/3附件。

状态均🤔AI提缺陷，负责人牛诗晴，迭代重构10-29，生产环境。两例保持Failed，54条当前17 Passed / 11 Failed / 20 Blocked / 0 Not Applicable / 6 Not Run。

040为本批新工程独立复现，按“不去重”授权单独新建；既有FWXC-513附带发现记录保持。041仅记录空素材列表已加载后的入口缺失；有素材时的搜索结果、清空及授权边界仍未覆盖，缺陷正文明确说明。

[040本地缺陷](../../../defects/ERYE210-040-independent-audio-delete-production-20261113.md) · [041本地缺陷](../../../defects/ERYE210-041-media-search-missing-production-20261113.md) · [脱敏回执](evidence-021-049-prod-20261113/yunxiao-sync-040-041.json) · [当前进度](execution-status-current.md)。
