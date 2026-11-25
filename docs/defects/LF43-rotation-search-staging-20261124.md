# FWXC-747 · 当前LF-43（原LF-53）

云效：[FWXC-747](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=79a89820864146921dae2f27c1)；动作：新建；2026-11-24官方OpenAPI回读已验证。

编号版本LF-20261124-R1。3张原始截图已上传并嵌入；附件共6份（包括截图、脱敏审计及新单对应受控源片）。

**现象**

带90°显示旋转信息的视频，原片正常显示为上红圆、下蓝方块，分析完成页却显示蓝方块在左、红圆在右；按原片正确上下布局查询，返回无匹配。普通竖屏对照可正确检索和播放。

**前置步骤**

1. 登录预发 https://staging-app.cinlink.ai/ 的测试账号U1。
2. 准备附件M-ROTATE.mp4与M-PORTRAIT.mp4：均6秒，正确显示为320×576、上红圆/下蓝方块。前者编码576×320并带有效90°显示矩阵；后者为普通竖屏。两片均已完整解码核验。

**提示词**

> 找出上方是红色圆形、下方是蓝色方块的画面，只查找。

**复现步骤**

1. 为两片分别建立单素材项目，导入对应附件并完成素材分析，核对五阶段全部完成。
2. 查看M-ROTATE.mp4的分析完成封面，与原片正常显示方向对照。
3. 在两组项目各新建会话，各发送上述同一提示词一次，等待终态；核对候选，能返回时实际播放。

**实际结果**

- 旋转样本分析封面为蓝方块在左、红圆在右，与正常显示方向不符。
- 旋转组任务done，显示“素材搜索：未找到匹配片段。请换一种说法，或先分析此项目中的更多视频。”，0候选。
- 普通竖屏对照返回正确0～6秒片段，实际播放320×576、上红圆/下蓝方块，左右黑边是正常适配。
- 失败会话：https://staging-app.cinlink.ai/c/fb9f7c25-ddbd-4159-bdb2-aa0329ce7b41 ；run_v2_4eecfd482cec4f0dbb7b079b5dc4dcef。
- 对照会话：https://staging-app.cinlink.ai/c/f49ec16b-6842-419b-86c7-822a43152393 ；run_v2_de470daa129c473bb2f14f650e937b3a。

**预期结果**

按视频有效显示旋转信息呈现正确方向；分析后可按正常显示的空间关系检索到实际存在的红圆在上、蓝方块在下的片段，且来源正确。

**影响**

携带旋转信息的素材可能被错误呈现或无法按其实际画面布局找到，影响手机竖屏等视频检索。

**补充**

同步标识：LF-R1-43-ROTATION-20261124

当前LF-43，原LF-53。2026-11-24预发实测；macOS、ego Chromium有头浏览器，沿用项目现有“测试环境MAC-chrome”分类。当前编号版本LF-20261124-R1；历史编号只用于追溯。仅本例正文步骤，无额外扩散；固定脚本仍PLAN。

与FWXC-256“主动旋转视频编辑不支持”、FWXC-389“普通无音轨目标漏检”不同，本项有有效旋转矩阵及普通竖屏对照，明确观察到分析封面方向异常。未确定抽帧、索引或检索哪层根因；旋转组无候选，未执行结果播放，不能声称返回视频播放侧倒。附件包含两份未改动测试源及脱敏审计。

**失败截图**

失败：M-ROTATE分析五阶段完成，但封面错误显示为蓝左红右。

![LF-R1-43-ROTATION-20261124-ROTATE-analysis.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5fba95fe7e863565e06f64527d)

失败：按上红下蓝查询，终态完成却无匹配、0候选。

![LF-R1-43-ROTATION-20261124-LF43-rotate-result.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=3fc70d4018a6935da4b4fe0413)

正向对照：普通竖屏同提示词命中，实际播放上红下蓝。

![LF-R1-43-ROTATION-20261124-LF43-portrait-play-1.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=62ec803f92b99caf72ef5c7f98)


本机同步回执：`reports/yunxiao/LF-R1-43-ROTATION-20261124/result.json`。产品测试结果及固定PLAN状态不因提交改变。
