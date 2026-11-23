# ERYE237-091/096/103新版图片批注UI生产执行（2026-11-17）

用例版本2026-11-17-annotation-ui-dedup-v5（当前v8编号）；生产app.cinlink.ai、ego-browser有头TaskSpace30、yabinc18。复用IMG-ANN-UI-007-20261109项目和会话39cdf63c-d593-4538-816a-5d1c29973e36，图片工程bd3a8b81-3454-40aa-b634-f6a073d261f7，portrait.png原图V1/editor_image_28de342515fc438aa5a0893c504fc20d，1254×1254。

仅执行这三个新版UI用例，旧同号技术执行保持历史；不测试旧事务/响应丢失范围。每例独立清本轮批注/引用后准备；不发送主输入框、不生成图片、不用接口创建或修改批注。固定脚本PLAN/空路径；本机临时操作助手不计固定自动化。未写云效、未改旧缺陷状态、未Git提交。

| 用例 | 状态 | 实际结果 | 证据 |
|---|---|---|---|
| ERYE237-091 | Passed | 右下空正文批注已命名；添加入口禁用、待发引用0。输入完整有效正文后正常添加恰1条，引用重开正文和右下锚点正确；未发送、原图像素保持。 | 091-empty.png；091-valid-added-reopened.png |
| ERYE237-096 | Passed | 在已命名右下批注中以完成态键盘输入两段固定中文，随后直接点击添加，未额外失焦；唯一引用重开后逐字、换行和末句标点完整，仍原锚点；未发送。 | 096-ready-before-input.png；096-immediate-added.png；096-reopened.png；096-input-click-sequence.json |
| ERYE237-103 | Passed | 两处独立批注均未引用；修改左侧正文后直接点击右侧编号，右侧名称/红球正文保持；再回左侧完整新正文及名称保留，左右锚点不变、总数始终2，无串写或新引用；未发送。 | 103-two-annotations-before.png；103-right-after-left-edit.png；103-left-restored.png |

本机原始证据：reports/erye237-091-096-103-ui-ego-prod-20261117/。逐条记录后即时同步registry；完成统计与清理见下方收尾。

## 本轮收尾与边界

3条新版UI全部Passed。本轮没有发送任何主请求；before-jobs/final-jobs均24项且任务ID集合完全相同，32项完成版历史数量保持。最终revision566、draft=null，原图V1选中，0标记/0待发引用、主输入为空白。

091对象已自定义命名后检查空值禁用，不将识别加载禁用代替空值门禁；096完成两段键盘文本输入后直接点添加，没有额外失焦/截图插在两动作之间，原文与动作时序见096-input-click-sequence.json，不以毫秒为硬指标，不冒称覆盖未完成IME组合态；103左侧修改后直接切到右侧再回左侧，没有添加/发送动作替代切换保存，名称、两正文与位置保持，总数2。

像素核验使用实际原始源文件file_cloud_aoxzqghthltoow66azyhca3q2j读取后独立解码，RGBA SHA256=639cdb6d081c208c284ca52378be54e69b5894f122229ce77c83fa5a08b679f6，尺寸1254×1254。所有091/096/103操作帧及最终画布均与该源一致，见original-source-pixel-audit.json。初次baseline-V1采样发生在历史图切换重绘前，得到瞬态旧画布哈希，原始文件保留但不作为原图像素基准；未重跑用例来替换该证据。

每例结束立即同步registry，固定脚本仍PLAN/空路径；临时助手仅本机UI执行，不计固定自动化。最终垃圾桶清本轮批注，再通过画笔返回/明确放弃清理空草稿，未用写接口创建修改批注；无生成任务、云效写入或Git提交。旧同号技术事务/响应丢失结果保留历史，不因新版UI通过判旧问题修复。TaskSpace30完成状态见completion.json，原始文件校验见SHA256SUMS。
