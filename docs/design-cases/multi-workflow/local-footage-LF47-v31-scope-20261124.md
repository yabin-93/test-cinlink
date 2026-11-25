# 当前LF-47 V3.1范围优化与结果重评 · 2026-11-24

编号版本LF-20261124-R1，当前LF-47对应原LF-57。用户要求“LF-47 优化这条用例判定为通过”，本次将必验范围收敛为**空格/中文括号、大写扩展名两组**，移除emoji名称必验分支，不追加替代用例。

**当前范围Passed。** 依据同日既有真实执行证据重评，未重新执行、未重新创建项目或分析/查询，不代表产品修复。原三组范围整体Failed及emoji无匹配事实完整保留，不将emoji改判通过，也不据范围移除宣称应用明确不支持emoji。

|保留参数组|原完整提示词|实际证据|判定|
|---|---|---|---|
|空格/中文括号|按完整文件名查找采访 素材（甲）.mp4，只返回原始素材供预览。|NAME-CN五阶段缓存就绪；返回同名完整原片，实际播放女士/旗帜，下载7815126字节且SHA与F5一致|Passed|
|大写扩展名|按完整文件名查找采访.MP4，只返回原始素材供预览。|NAME-UPPER五阶段缓存就绪；返回同名完整原片，实际播放女士/旗帜，下载7815126字节且SHA与F5一致|Passed|

两组源/返回均为F5：60.495778秒、1280×720；SHA-256 `9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。合法复用内容分析缓存及同一file_id，各项目保留自己的完整登记名，不要求重新分析或大小写模糊查找。

空格/括号组：项目6d0711ca-7b53-4784-8802-218858341566；[原会话](https://staging-app.cinlink.ai/c/a0c1650a-8078-4d27-ae42-12db19459314)，run_v2_a47b49d639a44d7781b016469a612ade。

大写扩展名组：项目55099d08-eb0c-4552-bd5b-0ce451328752；[原会话](https://staging-app.cinlink.ai/c/233719e5-85cc-4511-b205-a4d5cfc44cef)，run_v2_3691109550d04945bf9756f1cdc735bf。

移出的emoji组：`采访_😀.mp4`已分析就绪，run_v2_7370b27458864cf4b2bc0a5472e17ea7完成却无匹配、0候选。原[三例实际执行报告](local-footage-results-44-45-47-r1-staging-20261124.md)及原始`reports/lf-44-45-47-r1-staging-20261124/LF-47-result.json`保留Failed；原截图、项目、会话和状态历史不改写。此观察移出当前必验范围，不自动提交云效或关闭任何缺陷。

证据目录：`reports/lf-44-45-47-r1-staging-20261124/`。有效通过证据为`LF47-cn-play-1.png`、`LF47-upper-play-1.png`及两份`source-verification.json`；重评回执`LF47-V31-reassessment.json`，分析及成员审计继续保留。

已更新[LF-47定义](local-footage-p0-cases.md#lf-47)、独立状态JSON/表与进度。用例正文仅存V3.1前置/步骤/预期及设计版本，不放本执行结论。固定PLAN/空脚本保持；当前62条39 Passed / 6 Failed / 1 Blocked / 1 Not Applicable / 15 Not Run，AUTO3/PLAN59。LF-44仍Failed、LF-45仍Passed。本次优化无浏览器、云效或Git写入。

文档校验：`npm run cases:check`通过，checked 545 cases，issues=0。该检查仅校验用例定义，不是新的产品执行。
