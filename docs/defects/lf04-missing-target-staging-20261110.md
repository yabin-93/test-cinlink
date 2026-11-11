# FWXC-389 LF-04目标漏检

云效：[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2)。2026-11-10按用户授权直接新建，不去重、不修改旧项；官方OpenAPI回读正文/字段/全部附件通过。图片3份、补充JSON 1份。

**现象**

已分析完成的无音轨视频中实际包含紫衣女孩与绿色乌龟，按画面描述检索却返回未找到匹配片段。

**前置步骤**

1. 在macOS Chrome登录预发 https://staging-app.cinlink.ai/ ，账号yabinc18。
2. 新建项目LF-04-staging-20261110，仅导入 `03_60秒_单镜头_无音轨.mp4`（60秒、1280×720、0音轨），等待项目素材同步与1/1分析就绪。
3. 在项目内空会话查询；不通过聊天附件上传、不@素材。原片SHA256：`7f60c019bf4622896af1385925aa63cb1ecc78e2cfe714840336088d067f5811`，30秒抽帧可见目标。

**提示词**

找出绿色乌龟出现在穿紫色衣服女孩旁边的画面。

**复现步骤**

1. 确认工作台显示项目已分析1/1个媒体文件。
2. 输入上述完整查询并发送一次，等待Search materials终态。
3. 查看检索结果，与原片30秒女孩与乌龟同框画面对照。

**实际结果**

任务40秒显示已完成，但返回：素材搜索：未找到匹配片段。请换一种说法，或先分析此项目中的更多视频。未返回目标短片。
项目ID：`78d7264d-0fc5-4ff5-b6be-59990d83946d`；分析批次：`831fc7aa-58ef-4627-ba2a-a0805f275a8a`（复用已有分析）。
会话：https://staging-app.cinlink.ai/c/5740102b-6736-4b0e-95a7-27fc635a52a2 。未取得原始run_id及服务端源文件ID。

**预期结果**

无音轨视频可按视觉内容检索；返回包含紫衣女孩和绿色乌龟的真实片段，来源为该唯一原片，时间位于0～60秒内且预览与目标一致。

**影响**

用户无法通过已分析素材库找到实际存在的视觉目标，可能误以为素材不包含目标或分析未完成。

**补充**

同步标识：CINLINK-LF04-STAGING-20261110-MISS

覆盖LF-04，执行日期2026-11-10。仅确认漏检现象，未证明与无音轨、ASR或缓存直接相关。旧用例59.5秒参照为空背景，已按同哈希原片30秒实证修正；查询对象未改变。没有重发已受理查询，预算不代表实际扣费。

**失败截图**

LF-04：唯一F3项目已分析1/1就绪

![04-ready.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=68ed6b69972ee3ea98098dc153)

LF-04：查询女孩与乌龟，返回未找到匹配片段

![04-result.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=bba9da6b693b00d8cc34d6c2b7)

同哈希F3原片30秒直接抽帧：紫衣女孩与绿色乌龟同框，未加工画面

![F3-check-30.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=22640b2e922e6e92cebbd7bb60)
