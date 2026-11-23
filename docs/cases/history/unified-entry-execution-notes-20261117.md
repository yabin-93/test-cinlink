# 统一入口移出的执行记录（2026-11-17）

本文件保留整理前的执行统计、回归摘要、缺陷同步及相关索引上下文，仅供历史追溯。最新结果以[测试进度](../../testing-progress.md)、各专项执行报告为准；用例正文仍由[统一入口](../README.md)导航。

## 整理前的入口记录

<!-- ICP-EC-UNIFIED-ENTRY-20261117 -->
本批完整用例：[ICP-EC-01～05 电商场景](../README.md#icp-ecommerce-cases)（含25轮原文提示词、前置操作、预期结果、当前状态及云效缺陷）。
<!-- /ICP-EC-UNIFIED-ENTRY-20261117 -->

<!-- ICP-EC-YUNXIAO-SYNC-20261117 -->
2026-11-17：ICP电商原文既有实测已同步7条云效缺陷FWXC-625～631；15张失败原图已上传、嵌入，45附件及正文/字段回读通过，均🤔AI提缺陷、牛诗晴、生产环境。测试结果未变：5整例Failed、19轮已执行、6轮缺前置；Case01素材/首稿缺口及未触发假设不当产品缺陷。本次未重跑。 [同步清单](../../design-cases/icp-workflows/defect-sync-production-20261117.md)。检查点均已完成，后续只读回查，不重建。
<!-- /ICP-EC-YUNXIAO-SYNC-20261117 -->


<!-- ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->
ERYE199-014 → [FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60)；ERYE199-056 → [FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949)。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。 [同步明细](../requirements/ERYE-199/defects-unimplemented-014-056-production-20261116.md)。
<!-- /ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->


<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](../requirements/ERYE-199/retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->


<!-- ERYE210-014-V2-20261116 -->
ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。 [014本轮报告](../requirements/ERYE-210/results-014-v2-production-20261116.md)。原“014保留阻塞”由本次明确替换授权更新，原权限覆盖仍待环境。
<!-- /ERYE210-014-V2-20261116 -->


<!-- ERYE199-017053-V2-YUNXIAO-20261116 -->
ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。 [同步明细](../requirements/ERYE-199/defects-017-053-v2-production-20261116.md)。本批已完成，后续只核对检查点，不重新新建。
<!-- /ERYE199-017053-V2-YUNXIAO-20261116 -->


<!-- ERYE210-018020-YUNXIAO-20261116 -->
ERYE210-018 → [FWXC-588](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6b9e807ea6785e241aae941423)；ERYE210-020 → [FWXC-589](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0dd1f5d0d3ba1d48a798f75a03)。6张本轮原图已上传并嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。018高/2-严重，020中/3-一般。两例仍Failed，当前56条49P/6F/1B；旧FWXC-506/507及其他54条结果保持。本次仅同步既有失败，未重跑产品。 [同步明细](../requirements/ERYE-210/defects-018-020-restored-production-20261116.md)。
<!-- /ERYE210-018020-YUNXIAO-20261116 -->


<!-- ERYE210-RESTORED5-20261116 -->
当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。 [完整定义](../requirements/ERYE-210/case-restored-final-five-production-20261116.md) · [执行/截图](../requirements/ERYE-210/results-restored-final-five-production-20261116.md)。本轮未云效写入、未推送Git。
<!-- /ERYE210-RESTORED5-20261116 -->


<!-- ERYE210-007015-YUNXIAO-20261116 -->
ERYE210-007 → [FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12)；ERYE210-015 → [FWXC-586](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d5da04deb674cf55972715cfb1)。6张本轮原图已上传/嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。007中/3-一般，015低/4-轻微。两例仍Failed，当前51条46P/4F/1B；原FWXC-488/493及其余关联保持。本次仅同步既有失败，未重跑产品。 [同步明细](../requirements/ERYE-210/defects-007-015-restored-production-20261116.md)。
<!-- /ERYE210-007015-YUNXIAO-20261116 -->


<!-- ERYE210-RESTORED8-20261116 -->
当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。 [完整用例](../requirements/ERYE-210/case-restored-eight-production-20261116.md) · [执行及原图](../requirements/ERYE-210/results-restored-eight-production-20261116.md)。本轮未云效写入、未推送Git。
<!-- /ERYE210-RESTORED8-20261116 -->


<!-- ERYE210-046048-V3-20261116 -->
当前43条：**40 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run**。046/048 v3生产Chrome实跑2 Passed；014保持原Blocked，047/FWXC-579与049/FWXC-580保持Failed和云效关联。旧二次分析、配音稿修改/单句再生成仍延期，其他41条未重跑。 [完整定义](../requirements/ERYE-210/case-046-048-v3-current-controls-20261116.md) · [执行及截图](../requirements/ERYE-210/results-046-048-v3-production-20261116.md)。
<!-- /ERYE210-046048-V3-20261116 -->


<!-- ERYE210-047049-YUNXIAO-20261116 -->
## ERYE210-047/049缺陷已同步云效（2026-11-16）

ERYE210-047 → [FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c)；ERYE210-049 → [FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266)。官方OpenAPI分别新建，5张本轮原图已上传并嵌入，共11附件，正文/字段/附件/图片引用回读核验通过。状态🤔AI提缺陷，负责人牛诗晴，生产环境，高/2-严重。

本次仅同步既有失败，不重跑、不重发配音或导出。047/049仍Failed；014/046/048及其他结果保持，当前43条38P/2F/3B/0NA/0NR。准备错误和未执行分支不报缺陷。

[同步说明与本地缺陷](../requirements/ERYE-210/defects-047-049-production-20261116.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-047049-YUNXIAO-20261116 -->


<!-- ERYE210-CURRENT-FIVE-20261116 -->
## ERYE210-045～049当前功能v2生产Chrome执行（2026-11-16）

本批5条：1 Passed, 2 Failed, 2 Blocked, 0 Not Run；当前43条：**38 Passed / 2 Failed / 3 Blocked / 0 Not Applicable / 0 Not Run**。014原Blocked和完整结果保持，其他用例沿用历史实测；原11条退役不恢复，旧迁移/缓存/回退目标独立延期。

045共享素材引用隔离及复用通过；047在真实翻译配音工程混音50%保存重开后，明确单句再生成报页面协议错误；049关闭水印后原生导出报错、未交付页面结果，后台原任务done仅作辅助证据。048有独立真实翻译配音完成结果，但配音页无法稳定恢复原文案，目标编辑分支未执行。046通过同一已清理工程的会话入口明确二次只分析，实际结果以本轮报告为准。普通字幕准备、复制/属性缺失和额外创建的脚本错误保留为前置历史，不计产品缺陷。原生失败/阻塞截图及SHA256已归档。

默认仍43个有效脚本入口（42 AUTO、014唯一BLOCKED登记项），自动化接入与实际Blocked分开记录。 [完整用例](../requirements/ERYE-210/cases.md) · [本轮执行与截图](../requirements/ERYE-210/results-045-049-current-functions-prod-20261116.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下章节保留历史时点。

<!-- ERYE210-051-RERUN-20261116 -->
## ERYE210-051生产Chrome复测通过（2026-11-16）

用户要求重新执行051，恢复登录后使用独立新工程，按原无选区/明确唯一背景音轨前置一次提交。Agent约54秒实际降低6dB，音量1→0.5011872336272722，音频轴可拖拽音量线反馈50%；刷新后仍50%，保存版本1→2。未手动拖动或代执行，运行期间保持Captions，原视频/原声/字幕和目标文件/位置保持。

051最新Passed；当前43条37P/0F/6B/0NA/0NR，014和045～049仍Blocked，其他用例未重跑。11-13旧失败和原截图保留历史，本地缺陷增加本次通过记录；未提交云效或更改云效状态。仓库脚本1 passed，补充刷新核验沿同一结果，无第二次Agent请求。

[完整步骤及本轮原始截图](../requirements/ERYE-210/results-051-rerun-prod-20261116.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-051-RERUN-20261116 -->

<!-- ERYE210-COMPLETION-NINE-20261113 -->
## ERYE-210三条优化及六条补齐执行完成（2026-11-13）

用户确认优化011/017/019并补齐016/050～054，生产Windows有头Chrome串行零自动重试实跑。**9条8 Passed、1 Failed（051）**；当前43条**36P/1F/6B/0NA/0NR**。默认43个有效脚本入口（37 AUTO、6 BLOCKED门禁），无PLAN；退役11编号仍排除。其他用例和既有云效状态保持。

051在Captions明确请求本工程唯一背景音轨降6dB，Agent称缺少真实音轨/片段标识而未安排执行，页面音量仍100%；已整理本地缺陷、完整提示词/步骤与真实截图，未提交云效。011新原片副本完成中文配音后PB未变，真实工程入口定位通过；017原生新配音基线提交失败保留及恢复生成、019合法混合删除一次撤销、016图片前置恢复、050统一历史、053Windows窄屏键盘、054双语独立编辑均通过。052清理/配音/混音及原导出18.70秒完成，实际帧为BEFORE052和原英语C1，后续AFTER052/新字幕独立保存；同一任务/文件按哈希审核续验，未重新导出。

旧结果卡快捷入口、服务端已受理任务执行失败重试、受限对象批量拒绝、mac/未冻结断点和首次译制默认仍未覆盖；优化通过不算旧分支通过。准备及断言修正日志原样保留，017/052/054沿原场景完成实时核验，没有用历史回放代替当前结果。下文早期38入口、Blocked和旧统计均按对应时点保留。

[九条结果及原始截图](../requirements/ERYE-210/results-completion-nine-prod-20261113.md) · [完整前置/输入/步骤](../requirements/ERYE-210/case-nine-optimized-supplement-20261113.md) · [当前43条进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-COMPLETION-NINE-20261113 -->

<!-- ERYE210-011-USER-PROJECT-20261113 -->
## ERYE210-011用户目标语言配音工程补验（2026-11-13）

已改用用户指定项目ad25bc25-b1c6-4105-84b8-1b845b4a4eb5中的新配音会话af0d5043-d30d-4a91-ba15-dea074199400，沿用户原任务执行，未重复提交。英语→简体中文、配音＋双语字幕，约178秒完成；PA版本1→2，PB/Media及完整内容保持1→1。重开PA可见17条中文配音文案、中文字幕及8段生成音频，真实MP4播放/结构抽样通过。

后台隔离与目标语言内容分支Passed；真实结果卡仅提供播放、下载、放大，没有明确直达配音编辑入口，该定位分支未覆盖，011整例仍Blocked。手动选择PA不算结果卡定位通过；当前43条仍28P/0F/9B/0NA/6NR，其他用例和云效不改。011唯一脚本移至erye210-fields.spec.ts，支持原检查点续验，默认仍38入口。

[逐项结果和原始截图](../requirements/ERYE-210/results-011-user-project-prod-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-011-USER-PROJECT-20261113 -->

<!-- ERYE210-RETIRE-FAILED-11-20261113 -->
## ERYE-210退役原11条失败用例（2026-11-13）

用户确认退役002/004/005/007/010/013/015/018/020/040/041，保留已通过的021、025～027、029～035 v2原编号，不重复新增。有效用例54→43：28P/0F/9B/0NA/6NR；有效脚本38个（32 AUTO、6 BLOCKED），另5 PLAN。退役编号不复用，并在测试注册前排除。

原失败结果、截图、云效缺陷和回执均保留。当前0 Failed来自范围调整，不表示旧问题已修复；本次没有产品执行或云效写入。以下原54条/49入口及11 Failed统计均属历史时点。

[退役清单与历史](../requirements/ERYE-210/retired-failed-cases-20261113.md) · [当前43条进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-RETIRE-FAILED-11-20261113 -->

<!-- ERYE210-V2-EXECUTION-20261113 -->
## ERYE-210当前功能11条v2生产Chrome执行（2026-11-13）

本批11 Passed / 0 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；54条当前28 Passed / 11 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。021、025～027、029～035新版已实跑，截图及脱敏核验数据归档；原v1历史、其他用例及FWXC-516/518等既有云效关联保持。新项目/独立工程、串行零自动重试，实际失败与脚本/前置错误分开记录；未重复提交受理未知任务。本次没有云效写入或代码推送。

[逐例结果与截图](../requirements/ERYE-210/results-021-035-v2-prod-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-V2-EXECUTION-20261113 -->

<!-- ERYE210-CURRENT-FEATURES-V2-20261113 -->
## ERYE-210阻塞用例按现有功能优化（2026-11-13，未执行）

021、025～027、029～035共11条改为v2，明确前置、完整输入、步骤及预期，并同步脚本；新定义Not Run，旧Blocked/截图归档。045～049缺真实旧入口/缓存/回退环境，继续Blocked；当前页面导航不能替代迁移验收。原跨账号、草稿冲突、跨词/无词级/双语配音风险单列保留，未声称新版覆盖。

54条当前17P/11F/9B/0NA/17NR；49个入口43 AUTO、6 BLOCKED门禁，另5 PLAN。040/041仍Failed、FWXC-516/518等回执保持。此次只改定义/脚本/进度，未跑生产任务、未改云效。

[逐条原因和v2用例](../requirements/ERYE-210/case-021-035-v2-current-features-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-CURRENT-FEATURES-V2-20261113 -->

<!-- ERYE210-040-041-CLOUD-20261113 -->
## ERYE210-040/041缺陷已同步云效（2026-11-13）

040 → [FWXC-516](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f319c777b70fbfb7010c5a15ad)，独立音频删除连带裁视频/原声；041 → [FWXC-518](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=775dbf83cad7c40e3d8432d74e)，Media聊天/工程空素材区缺搜索入口。通过官方OpenAPI按“不去重”分别新建，状态🤔AI提缺陷，负责人牛诗晴，生产环境；4张截图已上传并嵌入，8附件与正文/字段回读通过。

041正文限定空列表场景，有素材搜索与授权边界仍待回归。040/041保持Failed，54条当前17P/11F/20B/0NA/6NR；其他结果及历史缺陷回执保持。

[同步详情](../requirements/ERYE-210/defects-040-041-production-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-040-041-CLOUD-20261113 -->

<!-- ERYE210-021-049-20261113 -->
## ERYE210-021～049生产Chrome执行完成（2026-11-13）

本批29条：**11 Passed / 2 Failed / 16 Blocked / 0 Not Applicable / 0 Not Run**。54条当前：**17 Passed / 11 Failed / 20 Blocked / 0 Not Applicable / 6 Not Run**；016 v2及050～054仍Not Run，001～020既有结果和云效回执保留。实际页面分支与11条前置门禁分列，局部通过不算整例通过。

新增021～049脚本，当前49个入口（37 AUTO、12 BLOCKED门禁），其余5条PLAN。脚本/准备错误保留历史；037/039沿原已完成场景复核，无重复生成。失败截图与SHA256清单、步骤及结果已归档；没有云效写入或代码推送。

[本轮报告](../requirements/ERYE-210/results-021-049-prod-20261113.md) · [当前逐例进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-021-049-20261113 -->

<!-- ERYE210-019-AUDIO-DELETE-CLOUD-20261113 -->
## 019附带独立音频删除异常已同步云效（2026-11-13）

[FWXC-513](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=13b2ef77469fde31d9ca46f97a)：仅删除14秒起独立背景音频，原视频/原声同范围也被裁切，20秒缩短为18.61秒。官方OpenAPI直接新建，不做历史去重；前置三条、详细步骤/实际/预期齐全，1张真实截图上传并嵌入，原片、同一段WAV、准备字幕及JSON共5附件，正文/字段/附件及图片引用回读通过。

019主用例仍Blocked，混合删除未执行；本条仅记录独立删除附带异常，不改变54条6P/9F/4B/0NA/35NR。其他缺陷回执保持。[同步详情](../requirements/ERYE-210/defect-independent-audio-delete-production-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-019-AUDIO-DELETE-CLOUD-20261113 -->

<!-- ERYE210-019-V2-EXEC-20261113 -->
## ERYE210-019 v2已执行，冲突前置未成立（2026-11-13）

生产有头Chrome，新工程实跑。22秒起A1独立删除对照通过；删除前核验S1/D1引用一致，但单删S1未出现关联拒绝，S1消失、配音仍ready且文稿引用随后独立。没有真实受限对象，019 v2记Blocked，未新建M或执行混合删除，不判Passed/产品关联保护缺陷。另在14秒A1对照观察到原视频/原声被裁同范围，截图及范围核验单列保留，已同步FWXC-513，1截图/5附件回读通过。

准备脚本的类型值/重复文件绑定问题已修正，原始尝试日志保留；没有伪造关联/锁定、没有主动重发生成。当前54条6P/9F/4B/0NA/35NR，016 v2仍Not Run，其余结果及FWXC-506/507等回执保持。[本轮报告](../requirements/ERYE-210/results-019-v2-prod-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下定义更新时Not Run及旧计数保留历史。
<!-- /ERYE210-019-V2-EXEC-20261113 -->

<!-- ERYE210-019-V2-LINKED-DELETE-20261113 -->
## ERYE210-019替换关联字幕混合删除场景（2026-11-13）

用户确认采用019 v2：先用独立副本确认A1单删合法、S1因配音D1关联单删被拒绝，再用第三个新工程同时选S1/A1按一次Delete，核对整体拒绝、S1/D1/A1及刷新结果均保留。单删S1没有真实限制时记冲突前置未成立，不强制套用拒绝预期，不仅因缺锁轨入口判不适用。完整前置、步骤、逐步预期及脚本已更新，未执行，Not Run。

旧v1 Not Applicable及原证据保留历史，其入口探测范围不足，不能排除关联冲突。016/019 v2均待执行；54条当前6P/9F/3B/0NA/36NR，其余结果及FWXC-506/507等回执保持。[019 v2完整说明](../requirements/ERYE-210/case-019-v2-linked-delete-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下旧批次计数保留历史。
<!-- /ERYE210-019-V2-LINKED-DELETE-20261113 -->

<!-- ERYE210-016-V2-WINDOWS-20261113 -->
## ERYE210-016按Windows Chrome优化（2026-11-13）

016 v2验证图片水印“未上传时限制→上传PNG后恢复→120px/60%切页重开保留”，已写明前置、测试图、完整步骤与逐步预期，并替换旧门禁脚本。仅修改、不执行，新定义AUTO/Not Run；不依赖macOS或真实未发布样本。旧v1 Blocked及原始报告/证据保留历史；原发布状态和端侧支持风险仍待真实样本，不宣称已覆盖。

当前54条6P/9F/3B/1NA/35NR；20个脚本入口（19 AUTO、014仅前置门禁）。其他执行结果及FWXC-506/507等缺陷回执保持。[016 v2完整说明](../requirements/ERYE-210/case-016-v2-windows-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下旧批次计数保留历史。
<!-- /ERYE210-016-V2-WINDOWS-20261113 -->

<!-- ERYE210-018-020-CLOUD-20261113 -->
## ERYE210-018/020缺陷已同步云效（2026-11-13）

- ERYE210-018 → [FWXC-506](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df279e880064725c26669adc36)：配音期间独立编辑水印后，原配音任务没有可应用结果；优先级高、严重程度2-严重。
- ERYE210-020 → [FWXC-507](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4861ae7970e41e1293c07e3612)：配音文案撤销未恢复原稿，刷新重开仍显示新稿；优先级中、严重程度3-一般。

通过官方OpenAPI直接新建，不做历史去重。前置各三条，详细复现、输入值和实际/预期已填写；6张真实截图上传并嵌入，原片、回归准备文稿及核验JSON合计12附件，正文、字段、附件ID/名称/字节数和图片引用回读通过。018原因待确认，不推断内部锁或水印修改因果；020只报告撤销未恢复，不将切页保留记为失败。两例保持Failed，当前累计6P/9F/4B/1NA/34NR。[同步详情](../requirements/ERYE-210/defects-018-020-production-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-018-020-CLOUD-20261113 -->

<!-- ERYE210-016-020-PROD-20261113 -->
## ERYE210-016～020生产Chrome执行（2026-11-13）

本轮2 Failed / 2 Blocked / 1 Not Applicable。018真实配音期间独立水印保存且保留，但原任务报“当前任务没有可应用结果”、没有两句音频，Failed；020全新稳定基线复核仍撤销不恢复原稿，Failed，切页和重开保留新稿通过。016缺mac/发布状态对照、017未建立真实失败前置，Blocked；019当前Chrome无受限轨道/关联同步冲突入口，按用例约定N/A，不宣称批次原子性通过。

54条当前6P/9F/4B/1NA/34NR。20个脚本入口（18 AUTO、014/016仅BLOCKED门禁），失败截图及前置/适用性记录已归档。没有重提018；020仅在修正准备后新建目标复核；018/020已同步FWXC-506/FWXC-507，6截图12附件回读通过；FWXC-492/493等旧回执保留。[详细报告](../requirements/ERYE-210/results-016-020-prod-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下旧批次统计为历史记录。
<!-- /ERYE210-016-020-PROD-20261113 -->

<!-- ERYE210-013-015-CLOUD-20261113 -->
## ERYE210-013/015缺陷已同步云效（2026-11-13）

- ERYE210-013 → [FWXC-492](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a)：纯音频无画面工程仍可保存文字水印；优先级中、严重程度3-一般。
- ERYE210-015 → [FWXC-493](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154)：未选片段时分割按钮禁用但缺少原因提示；优先级低、严重程度4-轻微。

通过官方OpenAPI直接新建，不做历史去重。前置各三条，详细复现步骤和边界已填写；4张真实截图已上传并嵌入，连同JSON/原片/字幕共8附件，正文、字段、附件ID/名称/字节数及图片引用回读通过。状态均为🤔AI提缺陷，负责人牛诗晴，重构10-29、生产环境。两例测试结果保持Failed，当前累计6P/7F/2B/39NR。[同步详情](../requirements/ERYE-210/defects-013-015-production-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-013-015-CLOUD-20261113 -->

<!-- ERYE210-011-015-PROD-20261113 -->
## ERYE210-011～015生产Chrome执行（2026-11-13）

本轮1 Passed / 2 Failed / 2 Blocked。011后台配音完成不抢PB且不串写通过，但未建立会话结果卡，定位分支Blocked；012空态导航不生成通过；013纯音频可实际保存文字水印Failed；014缺真实只读身份/授权样本Blocked；015无选区缺原因提示Failed，实际分割及撤销通过。

当前54条6P/7F/2B/39NR。15个脚本入口已接入（14 AUTO、014仅BLOCKED前置门禁），失败截图与分支证据已归档；001～010及既有云效缺陷保留；013/015已同步FWXC-492/493，4截图8附件回读通过。[详细报告](../requirements/ERYE-210/results-011-015-prod-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。以下旧批次统计为历史记录。
<!-- /ERYE210-011-015-PROD-20261113 -->

<!-- ERYE210-007-010-CLOUD-20261113 -->
## ERYE210-007/010缺陷已同步云效（2026-11-13）

007→[FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)，图片水印重开变文字、刷新变字幕；010→[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)，PB刷新由Media变Captions。通过官方OpenAPI直接新建2条，不查历史重复；前置各三条，6张原图上传并嵌入，原片/SRT/脱敏数据等共12附件，正文、字段、附件ID/名称/字节数和图片引用回读通过。

两例保持Failed，008 v2 Passed及其余结果保留。同步工具已适配上传name回执，并从附件列表核验fileName/ID/字节数；原007检查点续接完成，没有重复新建或重传首图，21项离线检查通过。[缺陷与回执明细](../requirements/ERYE-210/defects-007-010-production-20261113.md) · [当前进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-007-010-CLOUD-20261113 -->

<!-- ERYE210-007-010-RERUN-PROD-20261113 -->
## ERYE210-007/010生产复测（2026-11-13）

007：Failed，Watermark/Image收起重开变Text、刷新重开变Captions；010：Failed，PA/PB页内分别恢复Captions/Media，但同一PB刷新后变Captions。等待页面就绪与20秒恢复轮询后仍复现；新会话及独立工程，保存内容和版本1→1保持；真实失败截图已归档。

仅007/010本轮重跑，008 v2 Passed及其他结果保留。旧voice迁移、U2账号/D2设备缺前置，未执行。当前54条：5 Passed / 5 Failed / 0 Blocked / 44 Not Run。本轮没有Agent生成任务、云效写入或推送。[本轮结果与截图](../requirements/ERYE-210/results-007-010-rerun-prod-20261113.md) · [当前逐例进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-007-010-RERUN-PROD-20261113 -->

<!-- ERYE210-008-V2-PROD-20261113 -->
## ERYE210-008 v2生产复测（2026-11-13）

仅008重跑，Passed。仓库脚本在有头Chrome、新建项目及独立会话/工程核验五模块收起/展开、收起后切换正确面板；五入口/工程标题/预览保留；原8条字幕及完整保存内容一致，版本1→1。首次字幕异步/隐藏文本比较和旧CSS定位问题修正后，在新工程完成；原始脚本失败日志及截图保留，不算产品缺陷或自动重试。

当前54条为5 Passed / 5 Failed / 0 Blocked / 44 Not Run。008旧v1失效链接Blocked保留历史，006/007/009/010本轮未重跑。没有Agent生成任务、云效写入或推送。[本轮结果与截图](../requirements/ERYE-210/results-008-v2-prod-20261113-04.md) · [当前逐例进度](../requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-008-V2-PROD-20261113 -->

<!-- ERYE210-006-010-PROD-20261113 -->
## ERYE-210 006～010生产结果及008新版（2026-11-13）

Chrome生产环境原批次2 Passed（006/009）、2 Failed（007/010）、1 Blocked（008旧定义无失效样本，用户确认缺口）。007：Image收起重开变Text、刷新变Captions；010：页内双工程记忆正常，PB刷新由Media变Captions；旧voice和跨账号/设备分支未覆盖。失败截图已保存，本批未新同步云效。

008已替换为“功能面板收起/展开及收起后切换模块”v2，本轮生产Chrome Passed；历史Blocked不继承到新版。当前54条为5 Passed / 5 Failed / 0 Blocked / 44 Not Run。001～010已接入有头Chrome自动化，串行零重试；脚本接入不抬高实际通过数；001/006额外仓库脚本验证已通过，其他条目未因此重跑。[当前逐例进度](../requirements/ERYE-210/execution-status-current.md) · [结果与截图](../requirements/ERYE-210/results-006-010-prod-20261113.md) · [运行方法和覆盖边界](../requirements/ERYE-210/automation.md)。
<!-- /ERYE210-006-010-PROD-20261113 -->

<!-- ERYE210-001-005-PROD-20261113 -->
## 2026-11-13 ERYE-210 001～005生产测试

Completed；2 Passed、3 Failed；该批结束时49条未执行；当前累计见最新进度。Chrome生产环境，新建专用项目，按页面业务验收。未通过：002：首次导入进入字幕而非Media，另见创建保存500；004：配音结果缺少直接定位Voiceover的编辑入口；005：首次进入Scripts正常；从Media点审阅剪辑仍停Media。005仅分析审核，未应用删除，原run按本例范围保留waiting_for_confirmation。云效已新建[FWXC-482](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441)、[FWXC-483](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc663b74e4bf60d0019f5c04e3)、[FWXC-484](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f97b390bf7704588fed0bfa706)；不做历史去重，7张原图嵌入、16附件及正文回读通过，前置各三条。未重跑业务或推送。 [逐例进度](../requirements/ERYE-210/execution-status-20261113.md) · [结果与截图](../requirements/ERYE-210/results-001-005-prod-20261113.md)。
<!-- /ERYE210-001-005-PROD-20261113 -->

更新：2026-11-10。从本页查找用例正文、自动化脚本、运行命令和执行状态。各分类保留一份正文，不在本页复制操作步骤；正式需求仍放在 `requirements/`，工作流专项仍放在 `../design-cases/multi-workflow/`。

## 本地素材查找P0用例

**最新状态（2026-11-10）：当前28条设计均已执行，15 Failed、13 Passed（各例限定UI/客户端/内容验证范围）、0 Not Run。** 名称查找5条P0（LF18/20/21/22/28），非名称扩展6条（LF30～35，3 P0/3 P1）。总计P0 25/P1 3，AUTO3、PLAN25；7个退役编号不计当前集合、不复用。

[最新逐例状态与报告索引](../../design-cases/multi-workflow/local-footage-execution-status.md) · [完整用例步骤](../../design-cases/multi-workflow/local-footage-p0-cases.md) · [本批LF18～35报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) · [历史优化版重跑](../../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) · [新增测试素材F5/F6](../../design-cases/multi-workflow/local-footage-p0-cases.md#lf-real-media)。

新增素材：F5 `7MB.mp4`（60.50秒，1280×720，女士在旗帜前讲话）；F6 `9s.mp4`（9.45秒，1920×1080，戴黑框眼镜男子坐木桌前讲话）。路径、大小、音轨、SHA-256及用例关联见上方素材登记；关联新增11条已执行，7 Passed/4 Failed；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)。

| 用例 | 场景 | 核心检查点 | 自动化与执行状态 |
|---|---|---|---|
| LF-01 | 项目导入、分析到检索 | 4/4分析成功，含无音轨视频，机器人段可命中 | 2026-11-10 Failed；production；机器人混入留声机/飞机；[最新报告](../../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-02 | F1音乐类素材视觉检索 | 正确定位仙人掌，来源对应F1（ID可选） | 2026-11-10 Failed；production；两秒兔子片段缺仙人掌/男孩；[最新报告](../../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-03 | F2有语音素材视觉检索 | 蓝衣男孩与仙人掌，来源对应F2（ID可选） | 2026-11-10 Failed；production；两秒兔子片段缺蓝衣男孩/仙人掌；[最新报告](../../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-04 | F3无音轨素材视觉检索 | 女孩与乌龟，不依赖ASR | 2026-11-10 Failed；staging；女孩与乌龟目标漏检；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2)；PLAN |
| LF-05 | F4多镜头单目标定位 | 机器人90～105秒及真实预览 | 2026-11-10 Failed；staging；机器人混入留声机/飞机；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-06 | 长视频首尾边界 | 飞机0～15秒、卫星285～300秒 | 2026-11-10 Failed；staging；飞机/卫星两轮混入无关候选；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-07 | 多文件中唯一目标 | 火车仅命中F4的30～45秒 | 2026-11-10 Failed；staging；火车混入长颈鹿；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-08 | 相同画面的不同原片 | F1/F2/F3来源完整、原片不错误合并 | 2026-11-10 Failed；staging；58秒，漏F2/误入F4；本轮F4哈希确认；[最新报告](../../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；云效[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)；PLAN |
| LF-09 | 无匹配 | 足球实拍查询明确0匹配，不虚构结果 | 2026-11-10 Passed；staging；47秒明确无匹配、0新增候选（UI）；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)；PLAN |
| LF-10 | 空白查询 | 空值/空格不提交实际检索 | 2026-11-10 Passed；staging；空值/空格禁用发送；网络未抓取（UI）；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)；PLAN |
| LF-11 | 项目隔离 | Q机器人可命中，P123不泄漏Q素材 | 2026-11-10 Passed；staging；Q命中机器人，P123明确无匹配（UI隔离）；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-11-20261110.md)；PLAN |
| LF-12 | 同项目双会话复用 | B不重传/重分析，A/B结果各自保留 | 2026-11-10 Failed；staging；39秒，火车正确但混入长颈鹿；A历史保留；[最新报告](../../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-13 | 同会话连续查询 | 同一F4由机器人改查瀑布，不残留旧内容 | 2026-11-10 Passed；staging；44/35秒，机器人→瀑布切换及历史保留通过（UI范围）；[最新报告](../../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；PLAN |
| LF-14 | 结果可用性 | 正确源片预览、候选可作当前会话输入 | 2026-11-10 Failed；staging；火车可预览但混入长颈鹿；后续引用未完成确认；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-14-20261110.md)；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-15 | 刷新恢复 | 查询/候选恢复，不重复检索或分析 | 2026-11-10 Passed；staging；刷新后历史/候选保留，机器人可播放；网络及手动暂存未覆盖；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-15-20261110.md)；PLAN |
| LF-16 | 浏览器网络异常与恢复 | 明确失败，恢复后可重新检索 | 2026-11-10 Passed；staging；客户端提交被阻断后明确失败，解除后重试200/43秒完成、机器人可播放；规则已清理；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-16-20261110.md)；PLAN |
| LF-17 | 按旁白内容定位 | 听审原句后查询F2语音片段 | 2026-11-10 Failed；staging；人工确认目标原句存在，单F2分析1/1，98秒明确无匹配；能力范围待确认；[最新报告](../../design-cases/multi-workflow/local-footage-results-staging-17-20261110.md)；云效[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)；PLAN |
| LF-18 | 完整文件名（两素材） | 7MB.mp4→F5、9s.mp4→F6，名称不误作处理参数 | 2026-11-10 Passed；staging；两组各36秒，F5/F6名称及播放画面正确，下载哈希均与原片一致。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-20 | 正向：唯一名称片段 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Passed；staging；正式空会话部分名称7MB一次命中F5，播放为女士及旗帜，无须澄清，无生成。另一次有历史上下文的28秒探测不计正式结论。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-21 | 正向：同时按两个名称查找 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Passed；staging；两原片分别返回，各自播放为女士及男子，未漏项、误合并或混入其他素材。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-22 | 反向：不存在的精确文件名 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Failed；staging；终态已完成，但仅回复将核对、若不存在将告知，未给出文件不存在/未找到的实际结论；无新增候选，前轮F5保留。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-28 | 串联：名称查询→无结果→另一素材 | S-name F5→不存在→F6，复用LF18两组/LF22证据 | 2026-11-10 Failed；staging；36/43/36秒三轮完成，F5到F6切换及历史保留正常，但中间不存在名称仅回复将核对，未给无匹配结论；复用LF18及LF22证据。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-30 | 正向：真实女士画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；不使用文件名，唯一候选7MB.mp4，实际播放为黑外套蓝上衣女士及旗帜，未混入男子。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-31 | 正向：真实男子画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；不使用文件名，唯一候选9s.mp4，播放确认为黑框眼镜男子、木桌与电脑，无女士混入。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-32 | 反向：两真实素材均无目标 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；已由用户完整预览确认目标不存在；终态显示素材搜索未找到匹配片段，0候选，无生成。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-33 | 反向：组合条件不能拆开命中 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Failed；staging；明确要求女士及男子同一画面，却返回7MB.mp4与9s.mp4两个独立候选；逐一播放只有各自人物，未说明不满足同框条件。根因未确认。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-34 | 串联反向：排除前轮对象后改查 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；复用LF31前轮F6，排除男子后唯一返回F5，实际播放女士正确，男子历史仍保留；之后项目分析仍2/2，无删除或生成任务。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-35 | 反向边界：宽泛内容描述需选择 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Failed；staging；首轮仅列F5；补充选择男子后，本轮新返回F6及不符合条件的F5，均实际播放核验，回复仍称暂不能选、将重新检索，未收敛到明确男子选择。不是仅因旧历史保留而失败。；[本批报告](../../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |

`npm run test:footage`已接LF01～03；本轮实际执行使用原生CUA有头操作，不冒称已运行Playwright。历史云效FWXC274/275不等同本次生产重跑提交；预发LF04/05～07已分别提交FWXC389/390，最新报告内保留链接。

## AI生图P0用例

[完整前置、步骤与预期](../../design-cases/multi-workflow/ai-image-p0-cases.md)。共8条，全部P0；覆盖3档分辨率、5种常用比例、默认参数及同会话参数切换。每条均含卡片操作、有效参数、本轮产物、下载和像素验收。

| 用例 | 分辨率 | 图片比例 | 场景 | 自动化与执行状态 |
|---|---|---|---|---|
| IG-01 | 显式1K | 显式1:1 | 手动选择基础参数生成 | 未接脚本，本轮未执行 |
| IG-02 | 2K | 9:16 | 中档竖图生成 | 未接脚本，本轮未执行 |
| IG-03 | 4K | 16:9 | 高档横图生成 | 未接脚本，本轮未执行 |
| IG-04 | 2K不变 | 9:16 → 3:4 | 同会话切换比例 | 未接脚本，本轮未执行 |
| IG-05 | 默认1K | 默认1:1 | 不手动修改参数直接生成 | [已有脚本部分覆盖](../../../tests/staging/g3-g7-cards.spec.ts)，完整验收未执行 |
| IG-06 | 1K | 4:3 | 低档横图生成 | 未接脚本，本轮未执行 |
| IG-07 | 4K | 1:1 | 高档正方形生成 | 未接脚本，本轮未执行 |
| IG-08 | 1K → 4K | 1:1不变 | 同会话切换分辨率 | 未接脚本，本轮未执行 |

**数量口径：8条文字用例，AI生图自动化仍只有1条；全部卡片自动化仍为7条。** 精确像素按当前模型规格表验收，该映射尚待补齐，不能仅凭分辨率标签判通过。本轮只补写用例，没有提交生图任务。

## 同会话单原片 SSO

[001～004本次14轮执行记录](../../design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)：0补槽、3计划确认；10轮仅正文、4轮删除前已发。

完整前置、逐轮提示词及验收标准：[SSO-001～018](../../design-cases/multi-workflow/same-session-original-cases.md)。每轮不@视频，纯文本明确处理最初上传的源视频F。001～004按既有顺序穿插工作流；005～008各5轮且每例固定同一工作流。009～014各5轮组合、共30轮；015～018各5轮恢复/历史交互、共20轮，四例使用同一组组合要求对照恢复方式。每轮最终一个MP4体现全部要求的效果，核验各处理分支来自F、不使用前轮产物。

| 用例 | 场景 | 脚本状态 | 当前执行状态 |
|---|---|---|---|
| SSO-001 | 2轮：英文字幕→20秒高光 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 2轮来源/流程/结构及抽样通过；两轮为删除前已发记录 |
| SSO-002 | 3轮：水印→增强→英文字幕 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 3轮来源/流程/结构及抽样通过；前2轮删除前已发，第3轮仅正文 |
| SSO-003 | 4轮：中文翻译→30秒高光→水印→增强 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 4轮来源/流程/结构及抽样通过；仅发送正文 |
| SSO-004 | 5轮：英文字幕→水印→增强→20秒高光→日文翻译 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮来源/流程/结构及抽样通过；仅发送正文 |
| SSO-005 | 5轮添加字幕：中文→日文→韩文→法文→西班牙文；保留原英语音轨 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 未通过：第4轮法文字幕混入亚美尼亚文；5轮已执行；[记录](../../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)；[FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735) |
| SSO-006 | 5轮翻译配音：中文普通话→日语→韩语→法语→西班牙语；烧录对应同语字幕 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮通过；[记录](../../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-007 | 5轮同工作流：文字水印R1～R5及四角位置切换 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮通过；第5轮以原run原始计划补齐来源证据；[记录](../../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-008 | 5轮同工作流：高光20→30→15→25→20秒 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮通过；[记录](../../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-009 | 五轮不同组合交替 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-010 | 五轮组合字幕语言切换 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮完成，业务未通过：R4；5/5来源F、无串用告警；[记录](../../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)；[FWXC-281](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=924be6ade88ed3f7bac77b4f7d) |
| SSO-011 | 五轮高光组合与完整原片组合交替 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-012 | 五轮组合效果扩增与缩减 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-013 | 五轮相同组合连续及间隔恢复 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-014 | 五轮译制组合与原英语组合交替 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 2026-11-10生产复测5/5轮完成、5份MP4已下载解码；R1/R3/R5人工听审正常，内部来源链路待核，整例部分验证；[本轮记录](../../design-cases/multi-workflow/sso014-results-prod-20261110.md)。旧批次记录及FWXC-282保留历史，不迁移结论 |
| SSO-015 | 五轮完成后刷新恢复 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次；[本批记录](../../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6) |
| SSO-016 | 五轮执行中刷新恢复 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次；[本批记录](../../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6) |
| SSO-017 | 五轮完成后关闭重开恢复 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，任务失败1轮；R2媒体/API下载恢复，重开后UI认证阻塞保留；人工重新登录后续跑已完成；[本批记录](../../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)；[FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a) |
| SSO-018 | 五轮查看历史后处理原片 | [已接入](../../../tests/sso/same-session-original.spec.ts) | 5轮指定验收通过；[本批记录](../../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md) |

**001～018原片子集：18 AUTO/0 PLAN；015～018本批有头执行已结束，实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻。已接入不等同通过；017原UI认证阻塞及人工续跑分别保留。新增019～022见下节，SSO合计22条。**

- 查看全部22条脚本定义（不打开浏览器、不提交任务）：`npm run test:sso -- --list`；仅原18条加`--grep "SSO-0(0[1-9]|1[0-8])"`。
- 有头执行（会真实处理并可能计费）：`npm run test:sso`；独立配置 [playwright.sso.config.ts](../../../playwright.sso.config.ts)，单worker、零重试，不并入原默认46条预发。 仅执行005～008：`npm run test:sso -- --grep 'SSO-00[5-8]'`。
 仅执行009～014：`npm run test:sso -- --grep "SSO-0(09|1[0-4])"`。 仅执行015～018：`npm run test:sso -- --grep "SSO-01[5-8]"`。
- 调试过程、证据及后续状态：[测试进度](../../testing-progress.md)、[验证记录](../../verification.md)。

## 同会话原片与产物穿插 SSO-019～022

[完整前置、20轮提示词与验收标准](../../design-cases/multi-workflow/same-session-source-artifact-cases.md)。每例5轮均不@，按原片F与指定产物穿插处理；与001～018每轮回到F的范围分别统计。

| 用例 | 场景 | 自动化与执行状态 |
|---|---|---|
| SSO-019 | 不同工作流在原片与最近产物间切换 | [已接入](../../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |
| SSO-020 | 指定历史产物，避免误用最新视频 | [已接入](../../../tests/sso/same-session-original.spec.ts)；未通过，4轮通过/1未通过/0阻塞；[记录](../../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)；[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c) |
| SSO-021 | 同一水印工作流重复执行，验证叠加与分支隔离 | [已接入](../../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |
| SSO-022 | 自然指代最近成功产物，穿插显式返回原片 | [已接入](../../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |

SSO合计22条设计、22 AUTO/0 PLAN；新增4条共20轮。[本批执行结果与失败截图](../../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。仅执行这4条：`npm run test:sso:mixed`；有头、串行、零重试，不并入默认staging。001～018定义与既有结果保留。


## 剪辑配音与字幕同步P0

[完整前置、素材哈希、两轮提示词及同步验收标准](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md)。新增6条P0，按素材类别固定抽样；使用会话任务和下载成片验收，不依赖编辑页。

| 用例 | 场景 | 素材 | 自动化与执行状态 |
|---|---|---|---|
| [SYNC-001](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-001) | 30秒剪辑→中文配音及字幕 | 英语新闻、多镜头 | AUTO，Needs Review |
| [SYNC-002](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-002) | 20秒剪辑→英语配音及字幕 | 中文竖屏产品口播 | AUTO，Needs Review |
| [SYNC-003](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-003) | 中文配音及字幕→30秒剪辑 | 英语访谈、多镜头 | AUTO，Failed |
| [SYNC-004](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-004) | 中文配音及字幕→20秒剪辑 | 日语竖屏、原带字幕 | AUTO，Failed |
| [SYNC-005](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-005) | 去口癖→英语配音及字幕 | 3处金标的受控中文人声 | AUTO，Failed；R2依赖阻塞（未提交） |
| [SYNC-006](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-006) | 双素材18秒混剪→中文配音及字幕 | 9.45秒英语短片＋HEVC视频 | AUTO，Blocked；R2依赖阻塞（未提交） |

**本专项6 AUTO / 0 PLAN**；逐例业务结果见上表，AUTO不等于Passed。[2026-11-16执行记录、成片及截图](../../design-cases/multi-workflow/sync001006-staging-results-20261116.md) · [执行命令](../../../tools/sync/README.md)。完整听审缺口明确记Needs Review；原SSO仍22条，默认预发套件保持。

## 正式需求用例

| 需求 | 用例正文 | 自动化映射与状态 |
|---|---|---|
| ERYE-160 计费逻辑 | [计费用例](../requirements/ERYE-160/cases.md) | [正式需求登记表](../registry.yaml)；按具体用例查看脚本 |
| ERYE-196 编辑器能力接入(web) | [详细用例](../requirements/ERYE-196/cases.md) · [需求及评论分析](../requirements/ERYE-196/analysis.md) · [前置与数据](../requirements/ERYE-196/test-data.md) | **2026-11-11全适用回归执行中**：[本轮逐条结果](../requirements/ERYE-196/execution-status-20261111.md)；{'Passed': 3, 'Not Applicable': 2, 'Failed': 12, 'Not Run': 98, 'Blocked': 19}。以下为历史范围记录：134条：M1 121/M2 13；001/003按用户确认的页面业务口径Passed（有头执行）；002/004本轮Not Applicable；005取消旧引用前置改Not Run；合计2 Passed/2 Not Applicable/130 Not Run；[本次口径与状态](../requirements/ERYE-196/business-acceptance-update-20261105.md)；[首批记录](../requirements/ERYE-196/results-001-005-20261105.md) · [001当前工程复测](../requirements/ERYE-196/results-001-rerun-20261105.md) · [002当前工程核验](../requirements/ERYE-196/results-002-20261105.md) · [003页面业务执行](../requirements/ERYE-196/results-003-ui-20261105.md) · [004最新设计范围及执行证据](../requirements/ERYE-196/results-004-ui-20261105.md) · [004需求/设计差异FWXC-315](../../defects/CINLINK-DESIGN-ERYE196-004-001.md) · [登记表](../registry.yaml) |
| ERYE-206 会话与视频工程协作 | [67条详细用例](../requirements/ERYE-206/cases.md) · [正文/评论分析](../requirements/ERYE-206/analysis.md) · [数据前置](../requirements/ERYE-206/test-data.md) | 页面业务/真实接口结果验收；全部PLAN/Not Run；复用196底层用例，新增多工程/路由/字幕评论覆盖 |
| ERYE-210 编辑器默认TAB调整 | [43条当前用例](../requirements/ERYE-210/cases.md) · [分析](../requirements/ERYE-210/analysis.md) · [数据前置](../requirements/ERYE-210/test-data.md) | 28通过/0失败/9阻塞/6未执行；原11条失败已退役、旧缺陷保持；[当前进度](../requirements/ERYE-210/execution-status-current.md) · [退役历史](../requirements/ERYE-210/retired-failed-cases-20261113.md) |
| ERYE-199 编辑器能力 | [有效62条](../requirements/ERYE-199/cases.md) | 31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run；[九条v2实测/原图](../requirements/ERYE-199/results-nine-v2-production-20261116.md)；017/053已同步FWXC-590/591，6原图嵌入、13附件核验；051原生导入入口Blocked；21NA和012阻塞保持；014/056已同步FWXC-595/596；8条新版AUTO、045人工PLAN；[063已删除](../requirements/ERYE-199/retired-case-063-20261116.md) |
| ERYE-237 图像编辑 | [143条有效主用例](../requirements/ERYE-237/cases.md) · [执行规则](../requirements/ERYE-237/execution-guide.md) · [Agent配对](../requirements/ERYE-237/agent-checks.md) · [技术专项](../requirements/ERYE-237/technical-checks.md) | 当前46 UI /25 Agent /72 Technical主入口，P0 94/P1 48/P2 1；原029及三分支已删除、编号不复用，后续不执行不提缺陷；原始报告保留历史；[退役记录](../requirements/ERYE-237/retired-case-029-20261113.json) · [登记表](../registry.yaml) |

[196/206/210联合规则与复用](../editor-linked-196-206-210.md) · [统一业务验收口径](../editor-business-acceptance.md)。三需求255条，按页面/实际文件或真实接口业务结果验收；本次只优化，未新增执行。196为2 Passed/2 Not Applicable/130 Not Run；206/210共121条Not Run。全工程正式需求543条。

正式需求采用“一需求一目录”，各目录的 `meta.yaml` 保存来源与元数据。工作流用例不加入正式需求目录或本目录的 `registry.yaml`。

## 工作流与上下文专项

| 范围 | 用例入口 | 脚本 | 命令与范围 |
|---|---|---|---|
| 单工作流、素材方式、发送方式 | [工作流矩阵](../../design-cases/14-workflow-material-paths.md) | [字幕](../../../tests/staging/g3-g7-subtitle.spec.ts)、[图片水印](../../../tests/staging/g3-g7-image-watermark.spec.ts)、[其他工作流](../../../tests/staging/g3-g7-workflows.spec.ts) | `test:g3` / `test:watermark` / `test:flows`；矩阵设计组合不等于脚本数量 |
| 多工作流基础 MW-01～05 | [基础场景正文](../../design-cases/multi-workflow/cases.md#基础场景的前置操作步骤与预期) | [基础脚本](../../../tests/staging/g3-g7-multi.spec.ts) | `npm run test:multi:base`，5条 |
| 一句话多工作流 MW-06～14/18/21/23～26 | [多工作流正文](../../design-cases/multi-workflow/cases.md) | [复合脚本](../../../tests/staging/g3-g7-multi-compound.spec.ts) | `npm run test:multi:compound`，15条；与基础合计20条 |
| 多素材 MW-15/16/17/19/20/22 | [原编号正文](../../design-cases/multi-workflow/cases.md) | [多素材脚本](../../../tests/multi-material/multi-material.spec.ts) | `npm run test:multi:materials`，6条独立按需执行 |
| 同会话单原片 SSO-001～018 | [SSO正文](../../design-cases/multi-workflow/same-session-original-cases.md) | [SSO脚本](../../../tests/sso/same-session-original.spec.ts) | 18 AUTO/0 PLAN；015～018结果见[恢复执行记录](../../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)，其余既有结论保留 |
| 剪辑配音与字幕同步P0 | [SYNC-001～006正文](../../design-cases/multi-workflow/editing-dubbing-sync-cases.md) | `tools/sync/run.mjs` | 6条P0，6 AUTO/0 PLAN；本轮状态见专项表，完整听审待补 |
| AI生图P0专项 | [IG-01～08正文](../../design-cases/multi-workflow/ai-image-p0-cases.md) | [IG-05默认脚本部分覆盖](../../../tests/staging/g3-g7-cards.spec.ts)；其余7条未接入 | 8条P0文字用例，AI生图脚本仍1条 |
| 本地素材查找专项 | [当前28条正文及素材](../../design-cases/multi-workflow/local-footage-p0-cases.md) | [LF-01～03脚本](../../../tests/local-footage/local-footage.spec.ts)，其余25条PLAN | `npm run test:footage`仅3条；[最新逐例状态](../../design-cases/multi-workflow/local-footage-execution-status.md)：已执行28条，15 Failed/13 Passed（各例限定范围）；新增11条本批7 Passed/4 Failed |
| 卡片入口 | [矩阵卡片章节](../../design-cases/14-workflow-material-paths.md)、[脚本登记](../../design-cases/15-automation-registry.md) | [卡片脚本](../../../tests/staging/g3-g7-cards.spec.ts) | `npm run test:cards`，仍7条脚本，包含上述1条AI生图 |
| 跨工作流链路 | [矩阵链路章节](../../design-cases/14-workflow-material-paths.md#十八链路用例跨工作流plan) | [链路脚本](../../../tests/staging/g3-g7-chains.spec.ts) | `npm run test:chains`；设计链路与已接脚本分开统计 |
| CTX上下文与媒体专项 | [矩阵上下文章节](../../design-cases/14-workflow-material-paths.md#十七上下文用例横向维度) | [自动化登记](../../design-cases/15-automation-registry.md) | 按条目状态选取，未落地的不能当已执行 |
| MW-22前端模拟 | [模式与覆盖边界](../../design-cases/multi-workflow/mw22-breakpoints.md) | [本机响应夹具](../../../src/fixtures/mw22-ui-mock.ts) | `npm run test:multi:materials:ui`；不计为真实服务端部分失败通过 |

除明确的本机模拟外，预发命令可能上传真实素材、创建AI任务并消耗积分；按任务选取范围，串行执行。

旧版“转写字幕／导出字幕／查找片段”快捷入口已移除，相关旧条目已从矩阵清理；字幕及Find Local Footage的现有功能卡片继续按上表入口维护。

## 设计稿、批注与框架校验

| 范围 | 用例/规则入口 | 脚本入口 | 命令 |
|---|---|---|---|
| 首页、预览、项目、移动端、个人中心等设计稿用例 | [设计用例覆盖地图](../../design-cases/00-overview.md) | [自动化登记](../../design-cases/15-automation-registry.md) | 按具体模块选择，未自动化条目人工执行 |
| 视频批注 | [批注用例](../../design-cases/07-video-annotation.md)、[批注脚本映射](../../design-cases/07-annotation-automation.md) | [批注脚本目录](../../../tests/annotation) | `npm run test:annotation` / `npm run test:annotation:staging` |
| 上传、提交及取消 G1/G2 | [脚本登记](../../design-cases/15-automation-registry.md) | [G1](../../../tests/staging/g1-upload.spec.ts)、[G2](../../../tests/staging/g2-submit.spec.ts) | `npm run test:g1` / `npm run test:g2` |
| 离线断言与关卡 | [单元测试](../../../tests/unit)、[关卡测试](../../../tests/gates) | 同左 | `npm run verify`；单条调试按影响选定向检查，不每次重复全套 |

## 查状态与报告

| 内容 | 入口 | 使用口径 |
|---|---|---|
| 最新真实执行与待办 | [测试进度](../../testing-progress.md) | 通过、失败、前置阻塞、未执行分开报告 |
| 历次验证与证据批次 | [验证记录](../../verification.md) | 取对应批次的截图、trace、审计和下载产物 |
| 工作流脚本映射 | [自动化登记](../../design-cases/15-automation-registry.md)、[MW登记](../../design-cases/multi-workflow/registry.yaml) | “已接脚本”不等同“已实测通过” |
| 已有缺陷 | [本地缺陷目录](../../defects) | 提交前核对状态；@缺陷本轮不重复提交 |
| Excel辅助资料 | [工作流矩阵](../../design-cases/workflow-material-matrix.xlsx) | 历史汇总；SSO、AI生图P0扩展及本地素材查找P0尚未同步，以本页和各专项正文为准 |

本页统一导航与当前状态，详细步骤只在分类正文维护；执行报告保留原始批次记录。

## 约定

- ID：`<REQ前缀>-<三位序号>`，如 `ERYE237-001`；
- 一需求一目录、一前缀、一 Playwright 标签（`@ERYE-237`）；
- 用例表列：ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示；
- `自动化` 取值：`[AUTO]` / `[PLAN]` / `[FIXME]` / `[BLOCKED]`；
- 脚本落地后同步更新 `registry.yaml` 与 `cases.md` 的「脚本」列；
- `reports/design-cases.xlsx` 由 `tools/design-cases/build-xlsx.py` 汇总其支持的正文；当前尚未读取SSO独立文件，不应宣称已包含SSO。

总表分别读取正式需求、设计稿和 `docs/design-cases/multi-workflow/cases.md`，将后者标为“工作流”来源；无需为了汇总而把工作流文件放入 requirements。

## 图片批注工具优先专项

[IMG-ANN-UI-001～010完整用例](../../design-cases/17-image-annotation-ui.md)：使用授权生成人像，优先通过批注浮层填写提示词、添加引用及页面编辑。可在同一专用项目中使用多个独立会话，各例核对独立图片工程及源版本。以下为2026-11-09生产有头UI实测结果：**8 Passed / 1 Failed / 1 Blocked**。本专项未接入独立自动化，不计入正式543条或ERYE237的144条统计。

| 用例 | 场景 | 最新执行状态 | 报告及缺陷 |
|---|---|---|---|
| IMG-ANN-UI-001 | 单批注新增棕白小狗 | Passed | [001～005报告](../../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-002 | 提交前将黑狗提示词改为白狗 | Passed | [001～005报告](../../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-003 | 人物红色上衣改为蓝色 | Passed | [001～005报告](../../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-004 | 移除小狗并补齐地面 | Passed | [001～005报告](../../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-005 | 双批注左侧白狗、右侧红球 | Passed | [001～005报告](../../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-006 | 同一批注重复添加引用 | Passed | [006～010报告](../../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-007 | 浮层右上角垃圾桶移除批注及待发引用 | Passed（R3复测，旧失败撤销） | [007最新报告](../../design-cases/img-ann-ui-007-results-20261109-r3.md) |
| IMG-ANN-UI-008 | 删除一条草稿批注，保留另一条并执行 | Passed | [006～010报告](../../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-009 | 未发送批注保存后收起重开 | Failed：正文及自定义对象名丢失 | [缺陷记录](../../defects/img-ann-ui-009-prod-20261109.md)；[FWXC-367](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8c5a17dabe849b6a8a6a56ee71) |
| IMG-ANN-UI-010 | 缩放、平移后的批注定位与编辑 | Blocked：缩放及编辑成功，平移操作待确认 | [缺陷记录](../../defects/img-ann-ui-010-prod-20261109.md)；[FWXC-368](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7676dafe333fa5832e64c3441e) |

007按垃圾桶入口验收，不要求空输入框退格移除。010有ERYE-237 §3.1、§5.2及A15的平移需求依据；现有证据仅显示尝试的拖动、滚动、空格拖动未观察到平移，提交待排查缺陷不改变Blocked判定。009、010均已通过云效官方API新建，分别附2张及3张原始截图并完成正文和附件回读。

## 质量要求

每条用例必须写清楚三件事，否则不算完成：

1. **前置条件**：账号/权限、数据状态、页面位置、依赖任务；
2. **操作步骤**：用 `→` 分隔动作，至少两步；含关键参数值；
3. **预期结果**：可观察、可验证；涉及金额/数量/状态时写具体值。

反例：

```text
前置：无
步骤：测试生成
预期：正常
```

正例：

```text
前置：已登录；余额 ≥ 70 积分；图片生成服务可用
步骤：打开 AI 生图 → 选 Medium/1K → 生成 1 张 → 查看结算
预期：实扣 32 积分；账本记录 operation=generate_image、pricing_version、计量=1 张
```

检查命令：

```powershell
npm run cases:check
```

会校验列数、ID 唯一、优先级、自动化标记，以及前置/步骤/预期是否为空或过短。

生成 Excel 前会自动跑一次；不通过会直接阻断 `build-xlsx.py`，不会产出半成品。

- [图片工具栏专项：IMG-TB-UI-001～020](../../design-cases/18-image-toolbar-ui.md)：新增20条UI文字用例（P0 13/P1 7），覆盖画笔、六类形状、文字/颜色、绘制橡皮擦、撤销/放弃、模式隔离、去背景、AI擦除、宽高比、保存/导出及处理中限制；最新13 Passed/6 Failed/1 Blocked/0 Not Run；002/005关联[FWXC-369](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e6d492be908d55a9d0b86124e6)；001～005见[报告](../../design-cases/img-tb-ui-001-005-results-20261109.md)，006～010均Passed见[报告](../../design-cases/img-tb-ui-006-010-results-20261109.md)，011～015见[报告](../../design-cases/img-tb-ui-011-015-results-20261109.md)（最新3通过/1失败/1阻塞；[013/014排查](../../design-cases/img-tb-ui-013-014-investigation-20261109.md)），016～020见[报告](../../design-cases/img-tb-ui-016-020-results-20261109.md)（1通过/2失败/2阻塞）；未接自动化，不计入正式543条。 016/017已同步[FWXC-371](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c0b830eb50e111cb243f475b69)、[FWXC-372](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f08ed4417846c25c3a8e038a4b)。 018[复测通过](../../design-cases/img-tb-ui-018-results-20261109-r2.md)，原批报告保留历史。 020[复测失败](../../design-cases/img-tb-ui-020-results-20261109-r2.md)：运行中历史入口禁用，终态恢复。 020已同步[FWXC-373](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=680b9622f88e0dbbd8a9741a3d)，截图/AX附件及正文回读通过。

### ERYE-237 2026-11-09专项反馈优化

[237正式144条用例](../requirements/ERYE-237/cases.md)已结合两组UI实测更新33条操作和验收，版本2026-11-09-ui-evidence-baseline；[变更及证据映射](../requirements/ERYE-237/optimization-20261109.md)。新增人像数据和实际入口规范，保留精确尺寸、双入口、平移及运行中历史可用等需求；正式6 Failed/138 Not Run不从专项状态继承，仍全PLAN。

### ERYE-237 正式014～032本轮执行

[生产有头报告](../requirements/ERYE-237/results-014-032-prod-20261109.md)：1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。正式144条累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍全PLAN；3个图片任务完成、4次普通Agent请求、2份PNG、零已受理重发；未同步云效。阻塞项覆盖和操作偏差见逐例表，不将UI部分成功升级双入口或精度通过。

正式014～032三组缺陷已同步：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)。共8图+3补充附件回读通过，原失败状态不变，详见[本轮执行报告](../requirements/ERYE-237/results-014-032-prod-20261109.md)。

ERYE237-005/Agent已按用户纠正以未去背景原图重跑，最新Failed为计费输入校验失败，绿底依赖未发送；[005原图R2报告](../requirements/ERYE-237/results-005-original-prod-20261109-r2.md)。001/004 UI及002/003 Agent原结果保持。

2026-11-10 LF-08～10预发：[执行报告](../../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)。1 Failed/2 Passed（UI范围），复用项目4/4就绪；LF08三个原片哈希一致但未交付匹配时间，LF09明确无匹配，LF10空值/空格禁用发送。专项最新累计8 Failed/2 Passed（UI范围）/7未执行，AUTO仍3。

2026-11-10 LF-11预发：[隔离执行报告](../../design-cases/multi-workflow/local-footage-results-staging-11-20261110.md)。Q仅F4、1/1就绪，43秒命中机器人；P123仅F1～F3、3/3就绪，38秒无匹配，Passed（UI业务隔离），请求范围及内部源ID未获取。最新累计8 Failed/3 Passed（UI范围）/6未执行，AUTO3不变。

2026-11-10 LF-12预发：[执行报告](../../design-cases/multi-workflow/local-footage-results-staging-12-20261110.md)。同P4新会话B一次火车查询报model HTTP 400/API version not supported，Failed；A原机器人查询及三卡未覆盖。累计9 Failed/3 Passed（UI范围）/5未执行，AUTO3不变。

2026-11-10 LF-12复测R2：[报告](../../design-cases/multi-workflow/local-footage-results-staging-12-20261110-r2.md)。新B37秒完成，上次API错误未复现；火车首候选正确但混入长颈鹿，源ID/区间未取得，仍Failed；A原机器人历史保留。

2026-11-10 LF-13预发：[报告](../../design-cases/multi-workflow/local-footage-results-staging-13-20261110.md)。同会话机器人40秒/瀑布32秒完成，首候选内容正确且历史保留，未见旧画面残留；匹配时间未提供、源ID未核，完整Failed，累计10 Failed/3 Passed（UI范围）/4未执行，AUTO3不变。

2026-11-10验收校正：用户确认源ID/匹配时间未证实为正式UI需求，撤销LF13仅因字段缺失的Failed，改Passed（UI连续查询及历史保留）；技术追溯未覆盖。最新累计9 Failed/4 Passed（UI范围）/4未执行，AUTO3不变。[校正报告](../../design-cases/multi-workflow/local-footage-results-staging-13-20261110.md)。

2026-11-10统一校正源ID/时间验收：全部LF条目取消内部ID/时间展示硬前置，仅可选技术取证；目标实际画面/声音、来源正确性及隔离检查保留。LF08改Passed（三原片哈希及目标正确），LF12仍因长颈鹿误入Failed，LF13 Passed（连续查询）。最新8 Failed/5 Passed（UI范围）/4未执行、AUTO3不变；历史统计以上述最新口径为准。

2026-11-10 LF14预发：[报告](../../design-cases/multi-workflow/local-footage-results-staging-14-20261110.md)。39秒完成，火车播放通过、混入长颈鹿Failed；@按结果名无匹配且内部名列表未可靠对应，引用未确认，不冒称功能缺失。最新9 Failed/5 Passed（UI范围）/3未执行，AUTO3不变。

2026-11-10 LF15预发：[报告](../../design-cases/multi-workflow/local-footage-results-staging-15-20261110.md)。原会话刷新一次，两轮查询/四候选/40与32秒终态保留，机器人可播放，Passed（UI范围）；无新查询，网络及手动暂存未覆盖。累计9 Failed/6 Passed（UI范围）/2未执行，AUTO3不变。

名称检索已精简为5条P0：完整名称、部分名称、双文件、不存在、连续切换。原LF19合并LF18，LF23～27及LF29移出核心、均未执行，编号不复用。非名称LF30～35保持。



## ICP电商原执行索引

| 编号 | 原表 | 场景 | 自动化 | 当前执行结果 | 云效缺陷 |
|---|---|---|---|---|---|
| [ICP-EC-01](../README.md#icp-ec-01) | 电商Case 01 | DTC 电动自行车广告投手 | AUTO | Failed | 素材/首稿缺口，暂未提缺陷 |
| [ICP-EC-02](../README.md#icp-ec-02) | 电商Case 02 | 女装 shopify独立站运营 | AUTO | Failed | [FWXC-625](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c87a29cd1d5996c0fa46eb4adf)、[FWXC-626](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ddeb25492d57ba95d8e4dc2d2d) |
| [ICP-EC-03](../README.md#icp-ec-03) | 电商Case 03 | 品牌的社媒运营岗 | AUTO | Failed | [FWXC-627](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=734bcbf473a246b0fe65b85187)、[FWXC-628](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=25f4dfa4e583d270cbf389c7c9)、[FWXC-629](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8014ebc4b36863fc090d9a5ad8) |
| [ICP-EC-04](../README.md#icp-ec-04) | 电商Case 04 | 准备进军墨西哥市场的自行车DTC品牌运营 | AUTO | Failed | [FWXC-630](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4c5033724b50514e1eee69c3c) |
| [ICP-EC-05](../README.md#icp-ec-05) | 电商Case 05 | Amazon 美国站手持吸尘器小家电drop shipping 卖家 | AUTO | Failed | [FWXC-631](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fc2731f00849917dfea1868f89) |
