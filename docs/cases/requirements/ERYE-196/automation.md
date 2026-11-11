# ERYE-196 已执行脚本与自动化入口

最新[基础补齐33项](editor-ui-fill-gaps-20261106.md)使用[ui-fill-gap-basics.mjs](../../../../tools/editor/ui-fill-gap-basics.mjs)，复用当前有头窗口和显式target/新报告目录，逐项guard/保存/刷新/页面撤销。图片/BGM/字幕及音频文件来自报告中明确夹具，不默认开浏览器或并发；图片选择开始一步按交互式文件选择留证，定位错误及任务负向验收复核分开记录。单句生成内部多次保存按本轮真实128/129/130内容逐次匹配撤销；本机历史仅读，不写IndexedDB或API旧JSON。33项为本轮执行分支，不是新增33条独立固定Playwright，也不增加正式需求编号。原24项及4对话固定脚本保持；未默认运行复杂/对话。

页面扩展单项见[最新覆盖及实测](editor-ui-expanded-20261106.md)，操作模块为[ui-expanded-basics.mjs](../../../../tools/editor/ui-expanded-basics.mjs)，基于[ui-basics.mjs](../../../../tools/editor/ui-basics.mjs)已有窗口驱动。`begin`必须传实际选中的工程/会话ID、名称及新报告目录，逐项核对版本与内容；`timeInputChecks`、`basicStyles`、`captionChecks`、`mediaChecks`、`viewChecks`、`styleBoundaries`、`addCaptionAndEditCheck`、`watermarkChecks`、`exportVideoTaskCheck`按单项串行调用，不默认开新浏览器，不并发、不自动重试、不直接写工程JSON。已有批次不可直接复用目录或覆盖证据。视频导出模块只核对任务/产物，真实下载与解码另验；SRT当前缺页面入口。结果归档模块[汇总脚本](../../../../tools/editor/summarize-expanded-ui.mjs)仅处理本地原始证据与明确的验收复核，校验恢复、刷新和截图哈希后生成脱敏清单，不写云效。这些是浏览器内操作模块，不计新增40条独立Playwright测试；原对话固定脚本数量保持。

B01缺陷已于2026-11-06同步为[FWXC-349](../../../defects/CINLINK-ERYE196-READ-SUMMARY-001.md)，本轮真实失败截图嵌入正文、脱敏JSON附件及云效正文/字段均已回读核验；未重跑用例，B01仍Failed。

更新：2026-11-06。历史有头执行、固定自动化和业务通过分别统计，不互相替代。

页面字幕结束拖动失败UI-05已于2026-11-06提交[FWXC-356](../../../defects/CINLINK-ERYE196-SUBTITLE-END-DRAG-001.md)，真实截图嵌入正文、脱敏JSON及附件/字段回读通过；本次不重跑，页面专项10P/1F和固定对话脚本条数保持。

**当前优先级已改为编辑页直接操作**。[本轮11项](editor-ui-basics-20261106.md)10通过/1未通过，使用[ui-basics.mjs](../../../../tools/editor/ui-basics.mjs)通用驱动，通过原窗口真实控件执行；没有发送对话或新开浏览器。B20/B21/B22页面入口回填Passed后，原24项为3P/4F/17NR，原4项固定对话脚本及对话失败保持。通用UI驱动不是新增11条独立固定Playwright用例，原134条统计保持；下述B04等批次结果按其当时范围保留。

B02缺陷已于2026-11-06同步为[FWXC-350](../../../defects/CINLINK-ERYE196-VIDEO-SPLIT-001.md)，本轮主失败截图嵌入正文、脱敏调用JSON及云效正文/字段均回读核验；本次未重跑，B02仍Failed，2项基础自动化接入数不变。

用户最新要求先验证基础能力，[24项单动作清单](single-action-basics.md)中的B01～B04已接入[single-action-basics.mjs](../../../../tools/editor/single-action-basics.mjs)。B04必须传入当前已核对target/expectedRevision，匹配页面实际工程ID，复用原窗口，一次裁尾短指令，核对真实源范围/保存/刷新/截图；最新工程b34e8f29…版本8任务done但intent false/无工具、未裁尾，内容及版本8保持，[最新结果](results-B04-prod-20261106.md)。B01～B03历史及原134条保持；基础清单0 Passed / 4 Failed / 20 Not Run，4项固定自动化/20项未接，不并入010～015套件，不新开窗口/克隆或覆盖JSON。

| 用例 | 脚本/操作来源 | 执行与覆盖边界 |
|---|---|---|
| 001 | 历史有头浏览器交互，无独立测试文件；[执行报告](results-001-rerun-20261105.md) | Passed；按用户确认的读取/视图业务口径 |
| 002 | 原接口分页分支；无当前页面自动化 | Not Applicable；补充列表读取不等于分页用例通过 |
| 003 | 历史双标签页交互；[执行报告](results-003-ui-20261105.md) | Passed；实际改文同步、刷新及恢复，不计独立自动化 |
| 004 | 历史设计/页面核对；无当前适用自动化 | Not Applicable；FWXC-315保留 |
| 005 | [提交及检查模块](../../../../tools/editor/history-20261105/agent.mjs) | 已实际执行Failed；依赖历史桥接环境 |
| 006 | 同上`submit`交互调用，页面填写006工程澄清 | 已实际执行Failed；没有独立006模块 |
| 007 | [失效目标/重选模块](../../../../tools/editor/history-20261105/007.mjs) | 旧目标及重选两个run均失败 |
| 008 | [切换工程模块](../../../../tools/editor/history-20261105/008-009.mjs) | Failed；B保持但A未完成，不计完整隔离通过 |
| 009 | 同上`run009` | Passed；合法/无效工程GET读取，不覆盖异常目标写入 |
| 010～015 | [Playwright测试](../../../../tests/editor/erye196-editing.spec.ts)、[操作及夹具](../../../../tools/editor/erye196.ts) | 新增6条固定自动化；012含两个独立端点分支；012/015 Passed，010/011/013/014 Failed；[最新013～015复跑](results-013-015-rerun-20261105.md) · [首轮结果](results-010-015-ui-20261105.md) |

历史005～009的[准备、提交与最终证据模块清单](../../../../tools/editor/history-20261105/README.md)，[原执行报告及真实截图](results-005-009-ui-20261105.md)。这些模块不提供一键重跑，原用例仍按实际自动化成熟度登记，不能因归档把001～009全部标AUTO。

当前命令：`npm run test:editor:196`，默认有头、单worker、零重试；准备素材与单例命令见[脚本说明](../../../../tools/editor/README.md)。不修改云端产品代码，不向云效自动新建缺陷。

正式环境013于2026-11-06执行Failed，缺少commands，独立环境结果及截图见[正式报告](results-013-prod-20261106.md)；上传、基线和登录参数见[正式运行说明](../../../../tools/editor/README.md#正式环境仅执行013)。

正式013缺陷已于2026-11-06同步为[FWXC-339](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5275c98586194aeef2136a8454)，1张真实失败截图嵌入及1份脱敏JSON附件回读通过；按用户要求未去重。[本地缺陷](../../../defects/CINLINK-ERYE196-RIPPLE-TRIM-001.md)。

正式014于2026-11-06有头执行：用例Failed、任务done，助手说明无法完成完整配音源裁切，intent_fully_satisfied=false、无计划/工具调用，内容及版本1保持；[本轮结果与截图](results-014-prod-20261106.md)，未同步云效缺陷。

用户自建英文30S.mp4已作为后续适用编辑器用例默认工程；通过持续有头窗口及user-project.mjs直接测试，不再走自动造夹具入口。014自然素材变体缺commands、S1单视频裁头缺track_id/clip_id，均Failed、版本2保持；[记录与截图](results-014-user-project-20261106.md) · [单步诊断说明](014-stepwise-diagnosis.md)。不增加正式需求用例编号或固定套件通过数。

用户工程S1单视频裁头失败已于2026-11-06提交[FWXC-347](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=83eea6f9c327d3ab2a909205f7)，真实截图嵌入、脱敏JSON附件及字段/正文均回读通过；本次未重跑或更改用例状态。[本地缺陷](../../../defects/CINLINK-ERYE196-VIDEO-TRIM-001.md)。
