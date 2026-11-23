# FWXC-472：【生产环境】正常提交20秒或30秒高光，选片报超过目标时长后任务失败

2026-11-13：[云效缺陷](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7df1d9ef75e2fc03ebbb7ce59a)。前置已按用户要求压缩为3条；正文及原截图引用通过官方OpenAPI回读确认，其他章节保持。

**现象**

原片明确要求20秒或30秒高光，Select highlights直接失败，报 Correct the previous selection: Selection exceeds the requested duration.，无MP4。

**前置步骤**

1. 生产环境 https://app.cinlink.ai/，测试账号yabinc18，独立非项目会话。
2. 原片7MB.mp4已登记：约60.5秒、1280×720、英文原声。
3. SSO-024第1轮、SSO-027第1轮从登记原片开始；SSO-027第2轮保留上一轮20秒提案失败状态。

**提示词**

登记消息：

保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。

SSO-024 第1轮：

把最初上传的7MB.mp4原片剪成30秒高光，保留1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

SSO-027 第1轮：

从最初上传的7MB.mp4原片剪一个20秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

SSO-027 第2轮：

客户想多保留信息，请重新从最初上传的7MB.mp4原片剪一个30秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

**复现步骤**

1. 按前置建立SSO-024空白会话、登记原片，发送30秒第1轮原提示词并等终态。
2. 另建SSO-027空白会话、登记同一原片，发送20秒第1轮并等终态。
3. 在SSO-027同会话发送独立从原片制作30秒提案的第2轮并等终态。
4. 分别检查Select highlights节点、终态及交付。

**实际结果**

SSO-024 R1：会话 d6ec9e34-4cda-46e6-af47-082da0d59e1f；run_id run_v2_cce374c518e04a07a50cd260e030f1cb；终态 failed。

SSO-027 R1：会话 c25f1704-5a97-44a9-8439-277b6dc8721c；run_id run_v2_03a7bbb25d1b4250a41fb5653242d806；终态 failed。

SSO-027 R2：会话 c25f1704-5a97-44a9-8439-277b6dc8721c；run_id run_v2_c1362fe4afec4c46ba05b889f3833a0d；终态 failed。

三条实际任务均failed，错误文本完全相同；选片失败后的工程准备、审阅和渲染未成功执行，result_files均为空。未到可确认的剪辑方案，也没有可填写的业务补槽。

**预期结果**

在源片约60.5秒、目标20/30秒的正常参数下，自动选取符合目标的高光，提供可审核方案并交付MP4；不应直接暴露内部选片校验纠正语句并结束任务。

**影响**

正常高光提案不可交付，依赖其视频的字幕及历史分支处理无法继续。

**补充**

同步标识：sso023-027-prod-20261113-selection-duration

2026-11-13生产实测。FWXC-189/190为快捷入口提示词或时长边界问题；FWXC-227为已交付视频时长偏差；FWXC-468为缺选段工具定义、done空计划。当前已有工具执行且failed，错误指纹及触发不同，不直接归并。

详细实际任务输入、产物信息和完整原提示词见脱敏evidence.json。没有重跑用例，不把依赖阻塞轮或内容未覆盖项报为独立失败。

**失败截图**

SSO-024第1轮30秒高光：选片校验失败

![SSO-024-r1-complete.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=753286274e7d7cd6416ce63180)

SSO-027第1轮20秒高光：相同错误

![SSO-027-r1-complete.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9dff0af23a01c948a9cc7a59d6)

SSO-027第2轮独立30秒提案：相同错误

![SSO-027-r2-complete.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=2d8486cf683339fc3a554d428a)


2026-11-14 18点新修复版本真实回归：原30秒/20秒/同会话30秒三场景通过，FWXC-472已改✅AI通过并回读；失败后续接条件未产生、其他轮次未覆盖及两条扩散进度见[本轮报告](FWXC-472-retest-prod-20261114-1800-monitor.md)。历史失败证据保留，不作为新轮实测。
