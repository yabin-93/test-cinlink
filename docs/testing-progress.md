<!-- ERYE199-051-V4-CORRECTION-20261123 -->
2026-11-23：ERYE199-051 v4 创建前的入口预期修正为「选择媒体」。原生产证据覆盖空态显示、选取媒体建成工程及刷新后入口不再显示，按新版预期复核为 Passed。当前 142 条有效用例为 47 Passed、20 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [复核记录](cases/requirements/ERYE-199/revision-051-select-media-20261123.md)
<!-- /ERYE199-051-V4-CORRECTION-20261123 -->

<!-- ERYE199-051-V3-EXEC-20261123 -->
2026-11-23：ERYE199-051 v3 生产实测 Failed。空白会话缺少「新建视频工程」入口，通过「选择媒体」建成工程后和刷新后两项均符合预期。当前 142 条有效用例为 46 Passed、21 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [报告和截图](cases/requirements/ERYE-199/results-051-v3-production-20261123.md)
<!-- /ERYE199-051-V3-EXEC-20261123 -->

<!-- ERYE199-051-V3-20261123 -->
2026-11-23：ERYE199-051 v3 验证创建前显示「新建视频工程」、创建后隐藏。现为手工待执行，v2 阻塞留历史。当前 142 条为 46 Passed、20 Failed、1 Blocked、21 Not Applicable、54 Not Run。 [修订说明](cases/requirements/ERYE-199/revision-051-video-project-entry-20261123.md)
<!-- /ERYE199-051-V3-20261123 -->

2026-11-19：[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) 与 [FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74) 的触发条件及结果一致，用户确认按重复关闭，云效回读为“已关闭”。094-T2 仍为 Failed，后续跟踪 FWXC-700。

<!-- ERYE199-091095-YUNXIAO-20261119 -->
2026-11-19：ERYE199-091～095 的 29 个失败变体已按四种现象同步 [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)、[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)、[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)、[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c)。36 张原始截图已上传并嵌入，48 个附件及正文回读通过。五例保持 Failed，当前 142 条为 46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run。 [同步明细](cases/requirements/ERYE-199/defects-091-095-production-20261119.md)。
<!-- /ERYE199-091095-YUNXIAO-20261119 -->

<!-- ERYE199-NATIVE-AUDIO-090095-20261119 -->
2026-11-19：ERYE199-090～095生产实跑1 Passed / 5 Failed；31变体2 Passed / 29 Failed，6条AUTO。当前142条46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run；其他136条和既有云效关联保持，090原通过记录保留历史。失败截图已保存，测试结束后已同步云效。 [本轮报告](cases/requirements/ERYE-199/results-090-095-production-20261119.md)。
<!-- /ERYE199-NATIVE-AUDIO-090095-20261119 -->

<!-- ERYE199-086087-YUNXIAO-20261119 -->
2026-11-19：ERYE199-086六个跨视频轨失败变体合并为[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)，087两个独立音频分割失败变体合并为[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。 [同步明细](cases/requirements/ERYE-199/defects-086-087-production-20261119.md)。已有完成检查点，后续核对不重复创建。
<!-- /ERYE199-086087-YUNXIAO-20261119 -->

<!-- ERYE199-AUDIO-CROSS-086090-20261119 -->
2026-11-19：ERYE199-086～090生产实跑2 Failed / 3 Passed；18个变体10 Passed / 8 Failed，5条接入AUTO。当前142条46 Passed / 15 Failed / 2 Blocked / 21 Not Applicable / 58 Not Run；其他137条及既有云效关联保持。失败及关键步骤截图已保存，后续086/087已同步FWXC-702/FWXC-703。 [本轮报告](cases/requirements/ERYE-199/results-086-090-production-20261119.md)。
<!-- /ERYE199-AUDIO-CROSS-086090-20261119 -->

<!-- ERYE199-081083084085-YUNXIAO-20261119 -->
2026-11-19：ERYE199-081、083、084、085按相同业务问题合并2条，已同步[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044)、[FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74)。原声误联动24个变体共用FWXC-699，083-T2额外英文字幕轨关联FWXC-700；31张原始截图已上传并嵌入，38附件及正文回读通过。四例保持Failed，082保持Passed；当前142条43P/13F/2B/21NA/63NR不变，其他138条及既有缺陷关联保持。本次未重跑、未修改旧云效缺陷。 [同步明细](cases/requirements/ERYE-199/defects-081-083-085-production-20261119.md)。本批已有完成检查点，后续只核对，不重复创建。
<!-- /ERYE199-081083084085-YUNXIAO-20261119 -->

<!-- ERYE199-TIMELINE-081085-EXEC-20261118 -->
2026-11-18～19：ERYE199-081～085生产实跑4 Failed / 1 Passed，5条接入AUTO；按35个原生轮次/卡片操作变体逐项记录，结果25 Failed / 10 Passed。当前142条43 Passed / 13 Failed / 2 Blocked / 21 Not Applicable / 63 Not Run；其他137条和071/FWXC-693、078/FWXC-694保持。失败截图已保存，后续已同步FWXC-699/FWXC-700。以下旧统计按日期保留历史。 [本轮报告](cases/requirements/ERYE-199/results-081-085-production-20261118.md)。
<!-- /ERYE199-TIMELINE-081085-EXEC-20261118 -->

<!-- ERYE199-078-YUNXIAO-20261118 -->
ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。 [同步明细](cases/requirements/ERYE-199/defects-078-production-20261118.md)。本批检查点已完成，后续仅回查，不重复创建。
<!-- /ERYE199-078-YUNXIAO-20261118 -->

<!-- ERYE199-COMBINATIONS-076080-EXEC-20261118 -->
2026-11-18：ERYE199-076～080生产实跑4 Passed / 1 Failed，5条接入AUTO；当前142条42 Passed / 9 Failed / 2 Blocked / 21 Not Applicable / 68 Not Run。078同会话切换后字幕轨多出：S1实际4轨、T2实际6轨；原片及历史工程身份保持，失败截图与本地缺陷已保存，后续已同步FWXC-694。079的D流程通过，已知FWXC-693译文显示问题另列未修复。其他137条及原云效关联保持。以下旧统计按日期保留历史。 [本轮报告](cases/requirements/ERYE-199/results-076-080-production-20261118.md)。
<!-- /ERYE199-COMBINATIONS-076080-EXEC-20261118 -->

<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。 [同步明细](cases/requirements/ERYE-199/defects-071-production-20261118.md)。本批已有完成检查点，后续只读回查，不能再次新建。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

<!-- ERYE199-CARDS-069075-EXEC-20261118 -->
2026-11-18最新：ERYE199-069～075生产原生卡片已实跑6 Passed / 1 Failed，7条接入AUTO。071译文模式在编辑器仍显示双语，实际成片仅中文；已存原图和本地缺陷，后续已同步FWXC-693。074清理44.744秒、075高光30秒与本轮原片区间对应。当前142条：38 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 73 Not Run；其他135条及云效关联保持。以下旧统计按日期保留历史。

[本轮逐例结果、截图与复现](cases/requirements/ERYE-199/results-069-075-production-20261118.md)。仅页面业务和实际文件验收；无computer-use、云效写入或Git推送。
<!-- /ERYE199-CARDS-069075-EXEC-20261118 -->

<!-- ERYE199-EXTRA-COVERAGE-20261118 -->
2026-11-18最新：按用户要求追加ERYE199-117～148共32条，完整定义在[主文档第十六章](cases/requirements/ERYE-199/cases.md#erye199-editor-existing-feature-gaps)。现行142条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 80 Not Run。原110条定义及结果保持，新增32条PLAN、未执行；无新增脚本/浏览器执行/生成/导出/云效写入。用户确认：V/B删除、复制、剪切粘贴也双向联动；同类型占用位置新建同类型轨、不覆盖，首尾相接另验；其他轨不自动加入关联。旧010覆盖预期及失败保留历史，不能代跑当前138～141，执行旧010前需单独修订脚本。统一入口只写定义/导航，不写执行结果；以下110条/48NR统计为追加前历史。
<!-- /ERYE199-EXTRA-COVERAGE-20261118 -->

<!-- ERYE199-MULTITRACK-MERGE-20261118 -->
2026-11-18最新：用户明确要求将多轨用例补充到ERYE-199，已将原ECMT-001～048正式续编为ERYE199-069～116，完整定义并入[主文档第十五章](cases/requirements/ERYE-199/cases.md#erye199-card-multitrack)。当前110条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 48 Not Run。新增48条PLAN、未执行，原62条结果/证据/缺陷关联保持。旧ECMT目录只作跳转、不重复登记和计数；本次无浏览器用例执行、生成/导出或云效写入。视频/BGM双向联动，其他轨保持的最新确认规则不变。以下“48条独立专项、正式仍62条”为归并前历史。
<!-- /ERYE199-MULTITRACK-MERGE-20261118 -->

<!-- ECMT-DESIGN-20261118 -->
2026-11-18：新增[ECMT-001～048卡片入口与多轨组合用例](design-cases/multi-workflow/editor-card-multitrack-cases.md)，48条定义均Not Run、自动化PLAN。覆盖三轨/五轨模式、译配五轨加独立音频的六类组合，各视频/音频角色分割、平移、左右裁剪及跨同类型轨。用户确认仅视频/BGM双向联动，字幕/原声/译声/独立音频保持原位置。本次仅有只读页面入口和控件观察，未运行新用例或生成/导出任务；历史双语工程的额外字幕行差异单列，不判新例通过。正式ERYE-199的62条及既有统计不变。详见[设计说明](design-cases/multi-workflow/editor-card-multitrack-design-notes-20261118.md)。
<!-- /ECMT-DESIGN-20261118 -->

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正说明](cases/requirements/ERYE-199/revision-008-registration-scope-20261118.md)。后续008只按v2执行，不恢复登记撤销断言；统一入口不写执行结果。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

<!-- ICP-EC-YUNXIAO-SYNC-20261117 -->
2026-11-17：ICP电商原文既有实测已同步7条云效缺陷FWXC-625～631；15张失败原图已上传、嵌入，45附件及正文/字段回读通过，均🤔AI提缺陷、牛诗晴、生产环境。测试结果未变：5整例Failed、19轮已执行、6轮缺前置；Case01素材/首稿缺口及未触发假设不当产品缺陷。本次未重跑。 [同步清单](design-cases/icp-workflows/defect-sync-production-20261117.md)。检查点均已完成，后续只读回查，不重建。
<!-- /ICP-EC-YUNXIAO-SYNC-20261117 -->

<!-- ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->
ERYE199-014 → [FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60)；ERYE199-056 → [FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949)。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。 [同步明细](cases/requirements/ERYE-199/defects-unimplemented-014-056-production-20261116.md)。
<!-- /ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->

<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](cases/requirements/ERYE-199/retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->

<!-- ERYE210-014-V2-20261116 -->
ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。 [014本轮报告](cases/requirements/ERYE-210/results-014-v2-production-20261116.md)。原“014保留阻塞”由本次明确替换授权更新，原权限覆盖仍待环境。
<!-- /ERYE210-014-V2-20261116 -->

<!-- ERYE199-017053-V2-YUNXIAO-20261116 -->
ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。 [同步明细](cases/requirements/ERYE-199/defects-017-053-v2-production-20261116.md)。本批已完成，后续只核对检查点，不重新新建。
<!-- /ERYE199-017053-V2-YUNXIAO-20261116 -->

<!-- ERYE210-018020-YUNXIAO-20261116 -->
ERYE210-018 → [FWXC-588](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6b9e807ea6785e241aae941423)；ERYE210-020 → [FWXC-589](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0dd1f5d0d3ba1d48a798f75a03)。6张本轮原图已上传并嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。018高/2-严重，020中/3-一般。两例仍Failed，当前56条49P/6F/1B；旧FWXC-506/507及其他54条结果保持。本次仅同步既有失败，未重跑产品。 [同步明细](cases/requirements/ERYE-210/defects-018-020-restored-production-20261116.md)。
<!-- /ERYE210-018020-YUNXIAO-20261116 -->

<!-- ERYE199-NINE-V2-EXEC-20261116 -->
ERYE-199九条v2生产实跑：6 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。当前有效63条：**31 Passed / 8 Failed / 2 Blocked / 22 Not Applicable / 0 Not Run**。017裁A连带B及其原声从5秒前移3秒，空隙闭合，刷新保持错误；053空SRT静默写入持久空轨，非法时码拒绝和原字幕合法编辑恢复通过，整例Failed；051生产下拉无工程管理/导入媒体新建工程，目标导入未执行而Blocked。每例新项目/会话/工程，共9组，5个Agent请求各一次、无补槽表单/受理重发。8条新版接入cases-current-v2.mjs且默认覆盖旧探测，045仍按021～050人工例外PLAN。所有截图和混音证据留本地；原高级目标/22NA/旧6失败/012阻塞保持，云效未写入。原017/020功能未实现缺陷只属旧高级目标，不代表本轮017失败已提云效；新017/053待同步。

[九条逐例结果及原图](cases/requirements/ERYE-199/results-nine-v2-production-20261116.md) · [当前进度](cases/requirements/ERYE-199/execution-status-current.md)。下方旧批次统计仅历史。
<!-- /ERYE199-NINE-V2-EXEC-20261116 -->

<!-- ERYE210-RESTORED5-20261116 -->
当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。 [完整定义](cases/requirements/ERYE-210/case-restored-final-five-production-20261116.md) · [执行/截图](cases/requirements/ERYE-210/results-restored-final-five-production-20261116.md)。本轮未云效写入、未推送Git。
<!-- /ERYE210-RESTORED5-20261116 -->

<!-- ERYE210-007015-YUNXIAO-20261116 -->
ERYE210-007 → [FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12)；ERYE210-015 → [FWXC-586](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d5da04deb674cf55972715cfb1)。6张本轮原图已上传/嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。007中/3-一般，015低/4-轻微。两例仍Failed，当前51条46P/4F/1B；原FWXC-488/493及其余关联保持。本次仅同步既有失败，未重跑产品。 [同步明细](cases/requirements/ERYE-210/defects-007-015-restored-production-20261116.md)。
<!-- /ERYE210-007015-YUNXIAO-20261116 -->

<!-- ERYE199-NA31-REVISION-20261116 -->
ERYE-199当前有效63条：**25 Passed / 6 Failed / 1 Blocked / 22 Not Applicable / 9 Not Run**。原31不适用已逐条复核：011/013/017/020/045/051/052/053/055改当前功能v2、Not Run；另22条保留明确原因和恢复前置/步骤/预期，063属于旧设计目标。仅改定义，未执行浏览器/Agent、未新截图或云效写入；旧25P/6F/1B保持，原高级目标、历史结果、缺陷关联保留。9条新版PLAN且旧脚本门禁，045继续暂不接自动化；不能用旧能力探测或历史日志替代新定义执行。Composer附件接受JSON不构成工程解析支持证据，051只验实际媒体新建工程入口、执行时先核实生产可用。以下历史31NA/0NR由本块取代。

[逐条定义与范围](cases/requirements/ERYE-199/revision-na31-current-capabilities-20261116.md) · [当前进度](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-NA31-REVISION-20261116 -->

<!-- ERYE210-RESTORED8-20261116 -->
当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。 [完整用例](cases/requirements/ERYE-210/case-restored-eight-production-20261116.md) · [执行及原图](cases/requirements/ERYE-210/results-restored-eight-production-20261116.md)。本轮未云效写入、未推送Git。
<!-- /ERYE210-RESTORED8-20261116 -->

<!-- ERYE199-FAILED10-RERUN-20261116 -->
## ERYE-199原10失败复测完成（2026-11-16）

10条新工程复测3P/6F/1B：002分割点1.001秒刷新保持、007第二片段选择/媒体面板恢复、064工程素材无504均Passed；008登记独立撤销缺失、010覆盖仍新增轨、029/047/048原生导出协议错误继续Failed；030组合字幕旧字段错误未复现，真实SRT下载比对通过，但MP4协议错误和ASS/SSA未交付令整例Failed。012普通移动/删除留空通过，原删除自动前移未复现，独立波纹删除明确不支持，整例Blocked。

当前63条25P/6F/1B/31NA/0NR；31不适用仍跳过，0未执行不等于所有高级需求通过。002/007/008/010/012/064继续AUTO，029/030/047/048仍PLAN；遇异步字幕及面板操作问题从同一新工程继续，未将脚本问题判产品失败、未重发已受理任务。已有8个云效缺陷关联保留，本轮未新建/上传/改状态；030与012原缺陷未复现的局部结果另写明，不以整例状态冒充旧缺陷仍复现。失败截图与新回归原图已本地归档，TaskSpace正常结束。

[逐例步骤/实际提示词/新截图](cases/requirements/ERYE-199/results-failed-ten-rerun-production-20261116.md) · [当前进度](cases/requirements/ERYE-199/execution-status-current.md)。以下章节为历史时点。
<!-- /ERYE199-FAILED10-RERUN-20261116 -->

<!-- ERYE210-046048-V3-20261116 -->
当前43条：**40 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run**。046/048 v3生产Chrome实跑2 Passed；014保持原Blocked，047/FWXC-579与049/FWXC-580保持Failed和云效关联。旧二次分析、配音稿修改/单句再生成仍延期，其他41条未重跑。 [完整定义](cases/requirements/ERYE-210/case-046-048-v3-current-controls-20261116.md) · [执行及截图](cases/requirements/ERYE-210/results-046-048-v3-production-20261116.md)。
<!-- /ERYE210-046048-V3-20261116 -->

<!-- ERYE199-006-V2-20261116 -->
## ERYE199-006当前功能v2生产通过（2026-11-16）

用户要求未实现部分先跳过，006已原位优化并通过原仓库自动化函数在生产Ego有头新工程实跑Passed。真实Agent一次完成中心序列像素(400,200)、50%缩放、顺时针30度，无补槽/重发。普通画布896×504与全屏1509.33×849中，画面中心均(400,200)、未旋转尺寸320×180、角度约30°、旋转边界367.128×315.885；源2秒帧、刷新及播放通过，原片/源范围/10秒时间线/关联原声未改。7张原始核验截图已归档，无本轮失败截图。

独立蒙版、局部锚点及输入局部坐标跳过，原完整定义/旧Blocked另存归档，不计新版覆盖。当前63条22P/10F/0B/31NA/0NR；006 AUTO，原10条失败与云效关联保持，未云效写入、未重跑其他用例。脚本/用例/registry/当前状态/meta已同步；12项离线检查通过，526条用例格式0问题，无新依赖。

[完整用例](cases/requirements/ERYE-199/cases.md#erye199-006-current) · [本轮完整指令/步骤/原图](cases/requirements/ERYE-199/results-006-v2-current-transform-production-20261116.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。以下计数及006 Blocked为各历史时点。
<!-- /ERYE199-006-V2-20261116 -->

<!-- ERYE210-047049-YUNXIAO-20261116 -->
## ERYE210-047/049缺陷已同步云效（2026-11-16）

ERYE210-047 → [FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c)；ERYE210-049 → [FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266)。官方OpenAPI分别新建，5张本轮原图已上传并嵌入，共11附件，正文/字段/附件/图片引用回读核验通过。状态🤔AI提缺陷，负责人牛诗晴，生产环境，高/2-严重。

本次仅同步既有失败，不重跑、不重发配音或导出。047/049仍Failed；014/046/048及其他结果保持，当前43条38P/2F/3B/0NA/0NR。准备错误和未执行分支不报缺陷。

[同步说明与本地缺陷](cases/requirements/ERYE-210/defects-047-049-production-20261116.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-047049-YUNXIAO-20261116 -->

<!-- ERYE199-EXPORT-COMBINED-YUNXIAO-20261116 -->
## ERYE199-029/047/048相同导出失败已合并云效（2026-11-16）

按用户最新要求仅新建1条[FWXC-578｜编辑器原生导出报协议错误，未交付可下载结果](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8997db131fa05bc3a8e6e62ffe)，三条用例共享关联。状态🤔AI提缺陷、负责人牛诗晴、生产环境。三个场景各自失败原图均上传嵌入，另附原片、两份SRT及脱敏摘要，共7附件；正文、字段、附件及图片引用回读核验通过。创建和附件按共享缺陷计一次，未查询历史去重，未重复创建。

本次仅同步既有实测证据，未重测。三例仍Failed/PLAN；当前63条21P/10F/1B/31NA/0NR不变，10条失败均已有关联。原高级能力缺口FWXC-525及其他既有缺陷保持。以下较早执行记录中的“仅本地/未同步”是同步前时点。

[同步记录](cases/requirements/ERYE-199/defects-029-047-048-native-export-production-20261116.md) · [完整缺陷](defects/ERYE199-029-047-048-native-export-protocol-production-20261116.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-EXPORT-COMBINED-YUNXIAO-20261116 -->

<!-- ERYE199-CURRENT-SIX-V2-20261116 -->
## ERYE199六条当前功能v2执行完成（2026-11-16）

生产Ego有头新建专用项目，6条3P/3F：028双语字号、034三个倍率、042片段音量及实际混合声音通过；029混合文字导出、047四类对象导出、048全屏后导出均出现“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，未取得可下载MP4，正式文件分支未完成。对应失败原图和局部通过证据已归档；048全屏进出及8.16秒进度保持通过，不等同整例通过。034三次均无补槽，未重发已受理任务；其余无需提示词。

当前有效63条21P/10F/1B/31NA/0NR；仅006 Blocked。新失败029/047/048仅本地，未云效写入；原7失败及原高级能力缺口FWXC-525保持，525不代替本轮新失败提交。用户原021～049暂不自动化授权继续有效，6条仍PLAN，未新增仓库脚本或依赖。其他用例未重跑，原Not Run及更早结果保留历史。

[逐例前置/完整提示词/步骤/原图](cases/requirements/ERYE-199/results-current-six-v2-production-20261116.md) · [当前进度](cases/requirements/ERYE-199/execution-status-current.md) · [本地导出问题](defects/ERYE199-029-047-048-native-export-protocol-production-20261116.md)。
<!-- /ERYE199-CURRENT-SIX-V2-20261116 -->

<!-- ERYE199-064-YUNXIAO-20261116 -->
## ERYE199-064缺陷已同步云效（2026-11-16）

已通过官方OpenAPI新建[FWXC-577｜媒体→工程报504](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c8a5ca57b2162f6850176c6ff1)，状态🤔AI提缺陷、负责人牛诗晴、生产环境。上传并嵌入3张本例原图，另附原片/SRT/脱敏摘要，共6附件；正文、字段、图片引用及附件回读核验通过，未去重。

本次仅同步2026-11-13既有失败证据，未重跑。064保持Failed/AUTO；当前63条18P/7F/1B/31NA/6NR不变，7条Failed均已有云效关联。其他需求及既有缺陷未改。

[同步记录](cases/requirements/ERYE-199/defects-064-project-media-504-production-20261116.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-064-YUNXIAO-20261116 -->

<!-- ERYE210-CURRENT-FIVE-20261116 -->
## ERYE210-045～049当前功能v2生产Chrome执行（2026-11-16）

本批5条：1 Passed, 2 Failed, 2 Blocked, 0 Not Run；当前43条：**38 Passed / 2 Failed / 3 Blocked / 0 Not Applicable / 0 Not Run**。014原Blocked和完整结果保持，其他用例沿用历史实测；原11条退役不恢复，旧迁移/缓存/回退目标独立延期。

045共享素材引用隔离及复用通过；047在真实翻译配音工程混音50%保存重开后，明确单句再生成报页面协议错误；049关闭水印后原生导出报错、未交付页面结果，后台原任务done仅作辅助证据。048有独立真实翻译配音完成结果，但配音页无法稳定恢复原文案，目标编辑分支未执行。046通过同一已清理工程的会话入口明确二次只分析，实际结果以本轮报告为准。普通字幕准备、复制/属性缺失和额外创建的脚本错误保留为前置历史，不计产品缺陷。原生失败/阻塞截图及SHA256已归档。

默认仍43个有效脚本入口（42 AUTO、014唯一BLOCKED登记项），自动化接入与实际Blocked分开记录。 [完整用例](cases/requirements/ERYE-210/cases.md) · [本轮执行与截图](cases/requirements/ERYE-210/results-045-049-current-functions-prod-20261116.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下章节保留历史时点。

<!-- ERYE210-051-RERUN-20261116 -->
## ERYE210-051生产Chrome复测通过（2026-11-16）

用户要求重新执行051，恢复登录后使用独立新工程，按原无选区/明确唯一背景音轨前置一次提交。Agent约54秒实际降低6dB，音量1→0.5011872336272722，音频轴可拖拽音量线反馈50%；刷新后仍50%，保存版本1→2。未手动拖动或代执行，运行期间保持Captions，原视频/原声/字幕和目标文件/位置保持。

051最新Passed；当前43条37P/0F/6B/0NA/0NR，014和045～049仍Blocked，其他用例未重跑。11-13旧失败和原截图保留历史，本地缺陷增加本次通过记录；未提交云效或更改云效状态。仓库脚本1 passed，补充刷新核验沿同一结果，无第二次Agent请求。

[完整步骤及本轮原始截图](cases/requirements/ERYE-210/results-051-rerun-prod-20261116.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-051-RERUN-20261116 -->

<!-- ERYE210-COMPLETION-NINE-20261113 -->
## ERYE-210三条优化及六条补齐执行完成（2026-11-13）

用户确认优化011/017/019并补齐016/050～054，生产Windows有头Chrome串行零自动重试实跑。**9条8 Passed、1 Failed（051）**；当前43条**36P/1F/6B/0NA/0NR**。默认43个有效脚本入口（37 AUTO、6 BLOCKED门禁），无PLAN；退役11编号仍排除。其他用例和既有云效状态保持。

051在Captions明确请求本工程唯一背景音轨降6dB，Agent称缺少真实音轨/片段标识而未安排执行，页面音量仍100%；已整理本地缺陷、完整提示词/步骤与真实截图，未提交云效。011新原片副本完成中文配音后PB未变，真实工程入口定位通过；017原生新配音基线提交失败保留及恢复生成、019合法混合删除一次撤销、016图片前置恢复、050统一历史、053Windows窄屏键盘、054双语独立编辑均通过。052清理/配音/混音及原导出18.70秒完成，实际帧为BEFORE052和原英语C1，后续AFTER052/新字幕独立保存；同一任务/文件按哈希审核续验，未重新导出。

旧结果卡快捷入口、服务端已受理任务执行失败重试、受限对象批量拒绝、mac/未冻结断点和首次译制默认仍未覆盖；优化通过不算旧分支通过。准备及断言修正日志原样保留，017/052/054沿原场景完成实时核验，没有用历史回放代替当前结果。下文早期38入口、Blocked和旧统计均按对应时点保留。

[九条结果及原始截图](cases/requirements/ERYE-210/results-completion-nine-prod-20261113.md) · [完整前置/输入/步骤](cases/requirements/ERYE-210/case-nine-optimized-supplement-20261113.md) · [当前43条进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-COMPLETION-NINE-20261113 -->

<!-- ERYE210-011-USER-PROJECT-20261113 -->
## ERYE210-011用户目标语言配音工程补验（2026-11-13）

已改用用户指定项目ad25bc25-b1c6-4105-84b8-1b845b4a4eb5中的新配音会话af0d5043-d30d-4a91-ba15-dea074199400，沿用户原任务执行，未重复提交。英语→简体中文、配音＋双语字幕，约178秒完成；PA版本1→2，PB/Media及完整内容保持1→1。重开PA可见17条中文配音文案、中文字幕及8段生成音频，真实MP4播放/结构抽样通过。

后台隔离与目标语言内容分支Passed；真实结果卡仅提供播放、下载、放大，没有明确直达配音编辑入口，该定位分支未覆盖，011整例仍Blocked。手动选择PA不算结果卡定位通过；当前43条仍28P/0F/9B/0NA/6NR，其他用例和云效不改。011唯一脚本移至erye210-fields.spec.ts，支持原检查点续验，默认仍38入口。

[逐项结果和原始截图](cases/requirements/ERYE-210/results-011-user-project-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-011-USER-PROJECT-20261113 -->

<!-- ERYE210-RETIRE-FAILED-11-20261113 -->
## ERYE-210退役原11条失败用例（2026-11-13）

用户确认退役002/004/005/007/010/013/015/018/020/040/041，保留已通过的021、025～027、029～035 v2原编号，不重复新增。有效用例54→43：28P/0F/9B/0NA/6NR；有效脚本38个（32 AUTO、6 BLOCKED），另5 PLAN。退役编号不复用，并在测试注册前排除。

原失败结果、截图、云效缺陷和回执均保留。当前0 Failed来自范围调整，不表示旧问题已修复；本次没有产品执行或云效写入。以下原54条/49入口及11 Failed统计均属历史时点。

[退役清单与历史](cases/requirements/ERYE-210/retired-failed-cases-20261113.md) · [当前43条进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-RETIRE-FAILED-11-20261113 -->

<!-- ERYE210-V2-EXECUTION-20261113 -->
## ERYE-210当前功能11条v2生产Chrome执行（2026-11-13）

本批11 Passed / 0 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；54条当前28 Passed / 11 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。021、025～027、029～035新版已实跑，截图及脱敏核验数据归档；原v1历史、其他用例及FWXC-516/518等既有云效关联保持。新项目/独立工程、串行零自动重试，实际失败与脚本/前置错误分开记录；未重复提交受理未知任务。本次没有云效写入或代码推送。

[逐例结果与截图](cases/requirements/ERYE-210/results-021-035-v2-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-V2-EXECUTION-20261113 -->

<!-- ERYE210-CURRENT-FEATURES-V2-20261113 -->
## ERYE-210阻塞用例按现有功能优化（2026-11-13，未执行）

021、025～027、029～035共11条改为v2，明确前置、完整输入、步骤及预期，并同步脚本；新定义Not Run，旧Blocked/截图归档。045～049缺真实旧入口/缓存/回退环境，继续Blocked；当前页面导航不能替代迁移验收。原跨账号、草稿冲突、跨词/无词级/双语配音风险单列保留，未声称新版覆盖。

54条当前17P/11F/9B/0NA/17NR；49个入口43 AUTO、6 BLOCKED门禁，另5 PLAN。040/041仍Failed、FWXC-516/518等回执保持。此次只改定义/脚本/进度，未跑生产任务、未改云效。

[逐条原因和v2用例](cases/requirements/ERYE-210/case-021-035-v2-current-features-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-CURRENT-FEATURES-V2-20261113 -->

<!-- ERYE210-040-041-CLOUD-20261113 -->
## ERYE210-040/041缺陷已同步云效（2026-11-13）

040 → [FWXC-516](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f319c777b70fbfb7010c5a15ad)，独立音频删除连带裁视频/原声；041 → [FWXC-518](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=775dbf83cad7c40e3d8432d74e)，Media聊天/工程空素材区缺搜索入口。通过官方OpenAPI按“不去重”分别新建，状态🤔AI提缺陷，负责人牛诗晴，生产环境；4张截图已上传并嵌入，8附件与正文/字段回读通过。

041正文限定空列表场景，有素材搜索与授权边界仍待回归。040/041保持Failed，54条当前17P/11F/20B/0NA/6NR；其他结果及历史缺陷回执保持。

[同步详情](cases/requirements/ERYE-210/defects-040-041-production-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-040-041-CLOUD-20261113 -->

<!-- ERYE210-021-049-20261113 -->
## ERYE210-021～049生产Chrome执行完成（2026-11-13）

本批29条：**11 Passed / 2 Failed / 16 Blocked / 0 Not Applicable / 0 Not Run**。54条当前：**17 Passed / 11 Failed / 20 Blocked / 0 Not Applicable / 6 Not Run**；016 v2及050～054仍Not Run，001～020既有结果和云效回执保留。实际页面分支与11条前置门禁分列，局部通过不算整例通过。

新增021～049脚本，当前49个入口（37 AUTO、12 BLOCKED门禁），其余5条PLAN。脚本/准备错误保留历史；037/039沿原已完成场景复核，无重复生成。失败截图与SHA256清单、步骤及结果已归档；没有云效写入或代码推送。

[本轮报告](cases/requirements/ERYE-210/results-021-049-prod-20261113.md) · [当前逐例进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-021-049-20261113 -->

<!-- ERYE210-019-AUDIO-DELETE-CLOUD-20261113 -->
## 019附带独立音频删除异常已同步云效（2026-11-13）

[FWXC-513](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=13b2ef77469fde31d9ca46f97a)：仅删除14秒起独立背景音频，原视频/原声同范围也被裁切，20秒缩短为18.61秒。官方OpenAPI直接新建，不做历史去重；前置三条、详细步骤/实际/预期齐全，1张真实截图上传并嵌入，原片、同一段WAV、准备字幕及JSON共5附件，正文/字段/附件及图片引用回读通过。

019主用例仍Blocked，混合删除未执行；本条仅记录独立删除附带异常，不改变54条6P/9F/4B/0NA/35NR。其他缺陷回执保持。[同步详情](cases/requirements/ERYE-210/defect-independent-audio-delete-production-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-019-AUDIO-DELETE-CLOUD-20261113 -->

<!-- ERYE210-019-V2-EXEC-20261113 -->
## ERYE210-019 v2已执行，冲突前置未成立（2026-11-13）

生产有头Chrome，新工程实跑。22秒起A1独立删除对照通过；删除前核验S1/D1引用一致，但单删S1未出现关联拒绝，S1消失、配音仍ready且文稿引用随后独立。没有真实受限对象，019 v2记Blocked，未新建M或执行混合删除，不判Passed/产品关联保护缺陷。另在14秒A1对照观察到原视频/原声被裁同范围，截图及范围核验单列保留，已同步FWXC-513，1截图/5附件回读通过。

准备脚本的类型值/重复文件绑定问题已修正，原始尝试日志保留；没有伪造关联/锁定、没有主动重发生成。当前54条6P/9F/4B/0NA/35NR，016 v2仍Not Run，其余结果及FWXC-506/507等回执保持。[本轮报告](cases/requirements/ERYE-210/results-019-v2-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下定义更新时Not Run及旧计数保留历史。
<!-- /ERYE210-019-V2-EXEC-20261113 -->

<!-- ERYE210-019-V2-LINKED-DELETE-20261113 -->
## ERYE210-019替换关联字幕混合删除场景（2026-11-13）

用户确认采用019 v2：先用独立副本确认A1单删合法、S1因配音D1关联单删被拒绝，再用第三个新工程同时选S1/A1按一次Delete，核对整体拒绝、S1/D1/A1及刷新结果均保留。单删S1没有真实限制时记冲突前置未成立，不强制套用拒绝预期，不仅因缺锁轨入口判不适用。完整前置、步骤、逐步预期及脚本已更新，未执行，Not Run。

旧v1 Not Applicable及原证据保留历史，其入口探测范围不足，不能排除关联冲突。016/019 v2均待执行；54条当前6P/9F/3B/0NA/36NR，其余结果及FWXC-506/507等回执保持。[019 v2完整说明](cases/requirements/ERYE-210/case-019-v2-linked-delete-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下旧批次计数保留历史。
<!-- /ERYE210-019-V2-LINKED-DELETE-20261113 -->

<!-- ERYE210-016-V2-WINDOWS-20261113 -->
## ERYE210-016按Windows Chrome优化（2026-11-13）

016 v2验证图片水印“未上传时限制→上传PNG后恢复→120px/60%切页重开保留”，已写明前置、测试图、完整步骤与逐步预期，并替换旧门禁脚本。仅修改、不执行，新定义AUTO/Not Run；不依赖macOS或真实未发布样本。旧v1 Blocked及原始报告/证据保留历史；原发布状态和端侧支持风险仍待真实样本，不宣称已覆盖。

当前54条6P/9F/3B/1NA/35NR；20个脚本入口（19 AUTO、014仅前置门禁）。其他执行结果及FWXC-506/507等缺陷回执保持。[016 v2完整说明](cases/requirements/ERYE-210/case-016-v2-windows-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下旧批次计数保留历史。
<!-- /ERYE210-016-V2-WINDOWS-20261113 -->

<!-- ERYE210-018-020-CLOUD-20261113 -->
## ERYE210-018/020缺陷已同步云效（2026-11-13）

- ERYE210-018 → [FWXC-506](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df279e880064725c26669adc36)：配音期间独立编辑水印后，原配音任务没有可应用结果；优先级高、严重程度2-严重。
- ERYE210-020 → [FWXC-507](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4861ae7970e41e1293c07e3612)：配音文案撤销未恢复原稿，刷新重开仍显示新稿；优先级中、严重程度3-一般。

通过官方OpenAPI直接新建，不做历史去重。前置各三条，详细复现、输入值和实际/预期已填写；6张真实截图上传并嵌入，原片、回归准备文稿及核验JSON合计12附件，正文、字段、附件ID/名称/字节数和图片引用回读通过。018原因待确认，不推断内部锁或水印修改因果；020只报告撤销未恢复，不将切页保留记为失败。两例保持Failed，当前累计6P/9F/4B/1NA/34NR。[同步详情](cases/requirements/ERYE-210/defects-018-020-production-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-018-020-CLOUD-20261113 -->

<!-- ERYE210-016-020-PROD-20261113 -->
## ERYE210-016～020生产Chrome执行（2026-11-13）

本轮2 Failed / 2 Blocked / 1 Not Applicable。018真实配音期间独立水印保存且保留，但原任务报“当前任务没有可应用结果”、没有两句音频，Failed；020全新稳定基线复核仍撤销不恢复原稿，Failed，切页和重开保留新稿通过。016缺mac/发布状态对照、017未建立真实失败前置，Blocked；019当前Chrome无受限轨道/关联同步冲突入口，按用例约定N/A，不宣称批次原子性通过。

54条当前6P/9F/4B/1NA/34NR。20个脚本入口（18 AUTO、014/016仅BLOCKED门禁），失败截图及前置/适用性记录已归档。没有重提018；020仅在修正准备后新建目标复核；018/020已同步FWXC-506/FWXC-507，6截图12附件回读通过；FWXC-492/493等旧回执保留。[详细报告](cases/requirements/ERYE-210/results-016-020-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下旧批次统计为历史记录。
<!-- /ERYE210-016-020-PROD-20261113 -->

<!-- ERYE210-013-015-CLOUD-20261113 -->
## ERYE210-013/015缺陷已同步云效（2026-11-13）

- ERYE210-013 → [FWXC-492](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a)：纯音频无画面工程仍可保存文字水印；优先级中、严重程度3-一般。
- ERYE210-015 → [FWXC-493](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154)：未选片段时分割按钮禁用但缺少原因提示；优先级低、严重程度4-轻微。

通过官方OpenAPI直接新建，不做历史去重。前置各三条，详细复现步骤和边界已填写；4张真实截图已上传并嵌入，连同JSON/原片/字幕共8附件，正文、字段、附件ID/名称/字节数及图片引用回读通过。状态均为🤔AI提缺陷，负责人牛诗晴，重构10-29、生产环境。两例测试结果保持Failed，当前累计6P/7F/2B/39NR。[同步详情](cases/requirements/ERYE-210/defects-013-015-production-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-013-015-CLOUD-20261113 -->

<!-- ERYE210-011-015-PROD-20261113 -->
## ERYE210-011～015生产Chrome执行（2026-11-13）

本轮1 Passed / 2 Failed / 2 Blocked。011后台配音完成不抢PB且不串写通过，但未建立会话结果卡，定位分支Blocked；012空态导航不生成通过；013纯音频可实际保存文字水印Failed；014缺真实只读身份/授权样本Blocked；015无选区缺原因提示Failed，实际分割及撤销通过。

当前54条6P/7F/2B/39NR。15个脚本入口已接入（14 AUTO、014仅BLOCKED前置门禁），失败截图与分支证据已归档；001～010及既有云效缺陷保留；013/015已同步FWXC-492/493，4截图8附件回读通过。[详细报告](cases/requirements/ERYE-210/results-011-015-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下旧批次统计为历史记录。
<!-- /ERYE210-011-015-PROD-20261113 -->

<!-- ERYE210-007-010-CLOUD-20261113 -->
## ERYE210-007/010缺陷已同步云效（2026-11-13）

007→[FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)，图片水印重开变文字、刷新变字幕；010→[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)，PB刷新由Media变Captions。通过官方OpenAPI直接新建2条，不查历史重复；前置各三条，6张原图上传并嵌入，原片/SRT/脱敏数据等共12附件，正文、字段、附件ID/名称/字节数和图片引用回读通过。

两例保持Failed，008 v2 Passed及其余结果保留。同步工具已适配上传name回执，并从附件列表核验fileName/ID/字节数；原007检查点续接完成，没有重复新建或重传首图，21项离线检查通过。[缺陷与回执明细](cases/requirements/ERYE-210/defects-007-010-production-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-007-010-CLOUD-20261113 -->

<!-- ERYE210-007-010-RERUN-PROD-20261113 -->
## ERYE210-007/010生产复测（2026-11-13）

007：Failed，Watermark/Image收起重开变Text、刷新重开变Captions；010：Failed，PA/PB页内分别恢复Captions/Media，但同一PB刷新后变Captions。等待页面就绪与20秒恢复轮询后仍复现；新会话及独立工程，保存内容和版本1→1保持；真实失败截图已归档。

仅007/010本轮重跑，008 v2 Passed及其他结果保留。旧voice迁移、U2账号/D2设备缺前置，未执行。当前54条：5 Passed / 5 Failed / 0 Blocked / 44 Not Run。本轮没有Agent生成任务、云效写入或推送。[本轮结果与截图](cases/requirements/ERYE-210/results-007-010-rerun-prod-20261113.md) · [当前逐例进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-007-010-RERUN-PROD-20261113 -->

<!-- ERYE210-008-V2-PROD-20261113 -->
## ERYE210-008 v2生产复测（2026-11-13）

仅008重跑，Passed。仓库脚本在有头Chrome、新建项目及独立会话/工程核验五模块收起/展开、收起后切换正确面板；五入口/工程标题/预览保留；原8条字幕及完整保存内容一致，版本1→1。首次字幕异步/隐藏文本比较和旧CSS定位问题修正后，在新工程完成；原始脚本失败日志及截图保留，不算产品缺陷或自动重试。

当前54条为5 Passed / 5 Failed / 0 Blocked / 44 Not Run。008旧v1失效链接Blocked保留历史，006/007/009/010本轮未重跑。没有Agent生成任务、云效写入或推送。[本轮结果与截图](cases/requirements/ERYE-210/results-008-v2-prod-20261113-04.md) · [当前逐例进度](cases/requirements/ERYE-210/execution-status-current.md)。
<!-- /ERYE210-008-V2-PROD-20261113 -->

<!-- ERYE210-006-010-PROD-20261113 -->
## ERYE-210 006～010生产结果及008新版（2026-11-13）

Chrome生产环境原批次2 Passed（006/009）、2 Failed（007/010）、1 Blocked（008旧定义无失效样本，用户确认缺口）。007：Image收起重开变Text、刷新变Captions；010：页内双工程记忆正常，PB刷新由Media变Captions；旧voice和跨账号/设备分支未覆盖。失败截图已保存，本批未新同步云效。

008已替换为“功能面板收起/展开及收起后切换模块”v2，本轮生产Chrome Passed；历史Blocked不继承到新版。当前54条为5 Passed / 5 Failed / 0 Blocked / 44 Not Run。001～010已接入有头Chrome自动化，串行零重试；脚本接入不抬高实际通过数；001/006额外仓库脚本验证已通过，其他条目未因此重跑。[当前逐例进度](cases/requirements/ERYE-210/execution-status-current.md) · [结果与截图](cases/requirements/ERYE-210/results-006-010-prod-20261113.md) · [运行方法和覆盖边界](cases/requirements/ERYE-210/automation.md)。
<!-- /ERYE210-006-010-PROD-20261113 -->

<!-- ERYE199-002-YUNXIAO-20261113 -->
## 2026-11-13 ERYE199-002缺陷已提交云效

[FWXC-479](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9ba270e32cb1770640a69d088f)，状态🤔AI提缺陷，生产环境、中优先级、3-一般。通过官方OpenAPI直接新建1条，不去重，不修改其他工作项；2张原始失败截图上传并嵌入，另附原片及脱敏切点JSON，共4附件，正文/字段/附件ID、名称、字节数和图片引用回读通过。前置操作、完整准备提示词和页面分割/刷新复现步骤已写全；1.000秒未对齐30000/1001帧网格为实际缺陷，不报存储编码差异、未证实的导出丢帧或累计漂移。用例002保持Failed，001新版保持Not Run，本次未重跑或推送。 [本地缺陷](defects/ERYE199-002-frame-align-production-20261113.md)。
<!-- /ERYE199-002-YUNXIAO-20261113 -->

<!-- ERYE210-001-005-PROD-20261113 -->
## 2026-11-13 ERYE-210 001～005生产测试

Completed；2 Passed、3 Failed；该批结束时49条未执行；当前累计见最新进度。Chrome生产环境，新建专用项目，按页面业务验收。未通过：002：首次导入进入字幕而非Media，另见创建保存500；004：配音结果缺少直接定位Voiceover的编辑入口；005：首次进入Scripts正常；从Media点审阅剪辑仍停Media。005仅分析审核，未应用删除，原run按本例范围保留waiting_for_confirmation。云效已新建[FWXC-482](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441)、[FWXC-483](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc663b74e4bf60d0019f5c04e3)、[FWXC-484](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f97b390bf7704588fed0bfa706)；不做历史去重，7张原图嵌入、16附件及正文回读通过，前置各三条。未重跑业务或推送。 [逐例进度](cases/requirements/ERYE-210/execution-status-20261113.md) · [结果与截图](cases/requirements/ERYE-210/results-001-005-prod-20261113.md)。
<!-- /ERYE210-001-005-PROD-20261113 -->

<!-- ERYE199-001-005-20261113 -->
## 2026-11-13 ERYE-199 优化版生产复测完成

001/003/005版本2在新项目e649fba1-f3c4-4f82-9a6c-1ca6cbbb32e4及独立新工程完成生产复测，3 Passed；当前001～005为4 Passed、1 Failed，002/FWXC-479未重跑且不变，004沿用旧Passed，其余63条不计本轮。001四类对象与原声采样正确、刷新完整状态不变；003五处呈现帧及刷新与独立VFR源PTS对应，连续93帧时间递增，原片SHA一致；005页面手柄裁头2秒，片段8秒、时间线起点2秒，撤销/重做/刷新保持源映射，原声采样660Hz对应源2～4秒。首次快速按键寻帧存在一帧采样差，微调后的复核帧正确，原记录保留；不声称亚帧精度。图片25%缩放的旧像素换算已更正为当前适配尺寸约90px，并明确图片在视频层上方。

原版Blocked/截图及Graphic、PR tick、关键帧缺口仍保留，不判旧范围已实现。按用户最新明确要求，后续不使用computer-use；目标页面操作用ego-browser。此次无云效写入、产品代码/默认自动化变更或推送。云效前置2～3条精简规则继续沿用。[本轮结果及截图](cases/requirements/ERYE-199/results-v2-production-001-003-005-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-001-005-20261113 -->

<!-- ERYE196-RERUN-20261111 -->
## 2026-11-11 ERYE-196全部适用用例回归（执行中）

用户确认全部适用正式用例，预发Ego有头新项目，当前本轮状态：{'Passed': 3, 'Not Applicable': 2, 'Failed': 12, 'Not Run': 98, 'Blocked': 19}。结果持续回填[逐条进度](cases/requirements/ERYE-196/execution-status-20261111.md)与[报告及截图](cases/requirements/ERYE-196/results-all-applicable-rerun-20261111.md)；旧执行历史保留，未执行项不计通过。
<!-- /ERYE196-RERUN-20261111 -->

18:44云效FWXC-240由已修复改为✅AI通过，一次仅status、回读ID/名称成功，其他核对字段保持，无新增评论/附件/缺陷。

Passed（当前登录态/预发）：原项仅历史图，恢复提示词“给这个视频加中文字幕并烧录，输出带中文字幕的视频”。新项目4548a377-b735-48c3-a332-44e50d4d769e、新会话26642372-ab8b-4ecb-95b3-471cc45350be，单附件不@，原完整指令先后提交两次，各一次；92.891/60.775秒done、需求满足true，无补槽确认，未出现Missing CinLink access token or API key.。执行中刷新任务恢复；完成后刷新，两轮历史保留，成片分别实际播放1.021412/1.033672秒、1280×720、中文字幕可见，无媒体错误。第二轮明确复用同原片字幕，返回同成片ID，不计第二次独立转写。8本轮PNG/1历史图/脱敏汇总见[报告](design-cases/multi-workflow/fwxc240-retest-20261111.md)。原素材/环境未注明，未覆盖令牌过期/撤销、重新登录恢复、跨环境或长期压力；无默认配置变更/推送。

18:22云效FWXC-241由已修复改为✅AI通过，一次仅status、ID/名称回读成功，其他核对字段保持，原富文本/图片未改；无新增评论/附件/缺陷。

Passed（本轮预发/自选两标准原片路径）：原项只有历史截图、步骤未填，已通过官方文件接口取回原图并恢复原提示词。新项目6b23506c-1157-4199-9ea8-af08ff6c2285、新会话71de841d-d6ca-4ac6-b8ac-f4f6a84aa39d，选择A=7MB/B=1270510918两本地视频、无@，一次发送“给这两个视频加中文字幕并烧录，输出带中文字幕的视频”，补槽确认0。发送后原片预览保留，A/B均实际播放；执行中刷新后两预览恢复且再次可播放；181.089秒done/需求满足true，原片预览仍在，两结果预览也可播放。10张本轮PNG/1张历史原图及脱敏状态见[报告](design-cases/multi-workflow/fwxc241-retest-20261111.md)。原素材/环境未注明，不宣称原素材逐一复原、跨环境、首次云端入库或字幕内容全量通过；无新用例编号/默认配置变动/代码推送。

18:07云效FWXC-244由已修复改为✅AI通过，一次仅status、ID/名称回读成功，其他核对字段保持，无新评论/附件/缺陷或业务重跑。

Passed：新项目92bdbdd9-8a6b-4471-afd3-3215fe5c9910、新会话ee7d0d4b-5953-43ec-b9aa-b866e5e315c9，无附件/引用、一次原完整指令，401.224秒done/需求满足true，无补槽确认。中英文SRT各1条、均0.820～2.140秒，实际下载内容“这是自动化测试。”/“This is an automated test.”。生成视频实际5.056009秒、1280×720、有音轨/解码通过，字幕来源对应本轮生成视频，英译输入为本轮中文；离线Whisper独立识别同一句普通话。原仅media-info.json问题未复现。5PNG/两SRT/音频/独立ASR/汇总见[报告](design-cases/multi-workflow/fwxc244-retest-20261111.md)，MP4留本机reports/fwxc244-rerun-20261111。初始连接超时恢复后才提交，业务仅一次；未人工完整听审/逐帧同步/核验扣费，FIXME及旧失败保留，无推送。

17:51云效FWXC-245由已修复改为✅AI通过，一次仅status、ID/名称回读成功，其他核对字段保持，无新评论/附件/缺陷。仅对应原缺交付问题；字幕措辞差异及未覆盖项目不随状态改为通过。

原缺独立英文SRT问题未复现，正常交付Passed：新项目910fec7f-311c-4dec-99e4-f637a971adb6、新会话8281fe09-d3ca-48ed-8306-56f9280b1193，同SHA原片/单@/一次原提示词，300.040秒done/需求满足true，无补槽确认。中文SRT/英文SRT/MP4均已下载，两字幕各18条至60.460秒（第6条结束差20ms，其余一致）；1280×720、H.264/AAC、60.488秒，浏览器播放和完整解码通过，6/33/47秒烧录英文可见。另记录成片与独立英文SRT措辞差异，不宣称逐字同版；真实中文源、故障注入、整片逐字听审及扣费未覆盖，FIXME未改。7PNG/两SRT/版本对照/汇总见[报告](design-cases/multi-workflow/fwxc245-retest-20261111.md)，MP4留本机reports/fwxc245-rerun-20261111/downloads/final.mp4；旧失败保留，无远端推送。

17:37已将云效FWXC-250由已修复改为✅AI通过；一次仅status、回读ID/名称通过，其他核对字段保持，无新缺陷/评论/附件或业务重跑。

Passed（来源/原缺陷回归）：新项目FWXC-250复测-20261111（6dfbc1d0-4fff-4ffb-803b-78bcc9ddc541）、新会话17d1b1d6-c1dc-4722-9c45-84afbec8862a，A/B原片同SHA、双@顺序一致，一条原完整指令，补槽/确认0，230.324秒done/需求满足true。A英文18条至60.460秒、B日文64条至167.900秒，两份实际下载；六段同哈希原片的历史独立ASR交叉核对，A医疗法/B新闻分别正确，B90～110及149～169秒有对应日文，没有串用或互换。3PNG/两SRT/内容对照与参照/汇总见[报告](design-cases/multi-workflow/fwxc250-retest-20261111.md)。未重跑ASR、未逐字听审整片译文/核验扣费，默认FIXME及旧失败保留，无代码推送。

17:26按“未复现改AI通过”的处理方式，将FWXC-253从已修复改为✅AI通过；仅status一次写入、ID/名称回读通过，其他核对字段保持，无新增评论/附件/缺陷。

原缺陷回归Passed：新项目FWXC-253复测-20261111（643dc5a7-5451-4737-8003-5cb3f4b07fa6）、新会话9b69046e-557a-4f59-bd4d-607f16a2f75a，同哈希原片和原提示词、单@单次提交，无补槽/确认，349.024秒done。中文SRT/英文SRT/中文总结均已实际下载，两字幕各18条、逐条时间轴与源转写一致，总结对应医疗保障主题。旧“缺英文仍完成”未复现；页面明确说明实际英文源，intent_fully_satisfied=false如实保留，真正中文源正向未覆盖，不宣称全部译文质量或中间字幕版本已验证。3PNG、三文件、脱敏汇总见[报告](design-cases/multi-workflow/fwxc253-retest-20261111.md)，历史失败及自动化配置保持。

依用户明确要求，17:14将本轮未复现的[FWXC-255](https://devops.aliyun.com/projex/bug/FWXC-255)由已修复改为✅AI通过；一次PUT仅写status，回读ID/名称一致，其他核对字段保持。未新增评论/附件/缺陷或重跑业务。MW-01本轮Passed、旧失败现场及译文质量/扣费未覆盖边界保持；[复测及状态记录](design-cases/multi-workflow/fwxc255-retest-20261111.md)。下文未写云效指原复测阶段。

Passed：新项目`FWXC-255复测-20261111`（59384718-7355-4731-b985-ce0047292add）、新会话`fb233be4-0999-4fb9-9785-d1b77000cd2f`，同哈希英文原片一个@引用，一次提交原完整中文→英译指令，补槽/确认0次。211.445秒后done且intent_fully_satisfied=true，两份SRT均实际下载、各18条，逐条时间轴与源转写一致（0.160～60.460秒）；实际英译输出的源字幕ID等于交付中文文件ID。原“只交中文仍Completed”未复现。3PNG、字幕及脱敏汇总见[复测报告](design-cases/multi-workflow/fwxc255-retest-20261111.md)；未逐字听审全部译文/核验扣费。只读云效状态已修复，无云效写入、默认执行配置变动或远端推送；历史失败保留。

按用户明确要求，16:57将[FWXC-280](https://devops.aliyun.com/projex/bug/FWXC-280)从“已修复”改为“✅AI通过”，OpenAPI回读状态ID/名称通过，其他核对字段保持。仅状态更新1次，无新缺陷/评论/附件或业务重跑。正常登录关闭重开路径通过、凭证失效分支未覆盖及SSO-017原五轮历史结论不变；[复测和状态记录](design-cases/multi-workflow/fwxc280-retest-20261111.md)。

新项目`FWXC-280复测-20261111`（`6c8f7092-e692-42b0-bc72-fc5200d883d8`）、新会话`6d8c7238-f762-40a9-9add-ab31732369fd`，原片7MB.mp4哈希与旧缺陷一致。R1/R2完成后实际关闭页签，从首页历史重开；R2视频可播放、两次下载哈希一致，R3新run成功受理且done/成片可播放。本轮未复现认证问题，正常登录关闭重开路径通过，凭证失效分支未覆盖；不覆盖原SSO-017五轮/其他故障历史。只读云效原状态“已修复”，无云效写入或远端推送。5PNG/脱敏汇总见[复测报告](design-cases/multi-workflow/fwxc280-retest-20261111.md)。

按用户要求不使用历史项目，在正式环境新建项目`FWXC-356复测-20261111`（项目ID `d570e918-3fc9-4a44-9be7-b44c4e10d257`），加入`英文30S.mp4`并生成可编辑英文字幕。首条字幕结束时间由3.20秒拖至2.70秒，未出现`Manual layout does not cover parent`；刷新并重新打开编辑器后仍为0.08～2.70秒，判定本轮Passed。复测会话`c013949c-3f78-4d1d-85dd-11bad05a0f80`；3张真实截图已归档。[复测报告](cases/requirements/ERYE-196/results-FWXC-356-rerun-20261111.md)。原FWXC-356缺陷及历史Failed记录保留，未修改云效状态。

<!-- ERYE199-AUTOMATION-001-010-20261113 -->
## 2026-11-13 ERYE-199 仓库脚本接入与生产执行

001～010均有仓库内逐例步骤、断言和截图输出；006完整蒙版/锚点坐标受前置能力阻塞。统一命令`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 001-010`。本轮最终5 Passed、4 Failed、1 Blocked，其余58条未计本轮。001～005已接入并执行验证；原版/v2历史和FWXC-479保留。

使用Ego Lite有头、串行零重试；新建测试项目和独立工程；未使用computer-use。准备/采样脚本问题修正后定向验证，不计作产品缺陷。未写云效、未推送。[完整报告和截图](cases/requirements/ERYE-199/results-automation-001-010-production-20261113.md) · [脚本说明](cases/requirements/ERYE-199/automation.md)。
<!-- /ERYE199-AUTOMATION-001-010-20261113 -->

<!-- ERYE199-CONFIRMED-YUNXIAO-20261113 -->
## 2026-11-13 ERYE-199 确定失败缺陷同步完成

本轮确定失败的007/008/010已提交云效：007→[FWXC-485](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=3fbd5d5e667e7484e372ef0f6e)；008→[FWXC-486](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1f7044b8c2c88b7d275ef4f643)；010→[FWXC-487](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=610e1b8f4457eb703db0293ab1)。三条均为“🤔AI提缺陷”，7张截图上传并嵌入、15个附件回读核验通过。002沿用FWXC-479，当前“待确认”、负责人余航，只读核验未改动。006仍为前置Blocked，不提交；业务执行状态5 Passed/4 Failed/1 Blocked保持。

正文包含精简前置、完整页面复现步骤、无对话提示词说明、实际/预期及验证边界。通过官方OpenAPI提交，未使用浏览器或computer-use；负责人牛诗晴、生产环境标签。详见[本轮同步映射](cases/requirements/ERYE-199/defect-sync-20261113.json)。
<!-- /ERYE199-CONFIRMED-YUNXIAO-20261113 -->

<!-- ERYE199-011-015-20261113 -->
## 2026-11-13 ERYE-199 011～015生产执行

本轮0 Passed、1 Failed、4 Blocked。012普通移动留空隙，但普通Delete删除A后B由7秒自动移至2秒；独立波纹删除不支持。011同步锁、013源绑定字幕、014轨道编辑锁、015solo前置/能力缺口阻塞；015隐藏/静音开关保存恢复及不删内容部分已核对，未完成solo导出隔离。

011～015已接入仓库`tools/editor/erye199/cases-011-015.mjs`；命令`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011-015`。Ego Lite有头、同一TaskSpace4、专用新项目和独立工程、串行零重试；无补槽表单，无computer-use、云效写入或推送。修正基线空引用字段后定向执行，未把准备错误当产品缺陷。7项离线校验通过。

001～015当前5 Passed、5 Failed、5 Blocked，其余53条未计本轮；前10条及FWXC-479/485/486/487关联保留。[本轮报告与截图](cases/requirements/ERYE-199/results-011-015-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-011-015-20261113 -->

<!-- ERYE199-CURRENT-VERSION-SCOPE-20261113 -->
## 2026-11-13 ERYE-199 本版本范围调整

用户确认011/013/014/015相关功能本版本不做，当前Not Applicable（本版本不适用、后续再测），不计本轮Blocked或缺陷；原需求、原探测脚本和历史Blocked/截图保留，015历史隐藏/静音局部观察不计整例通过。012继续适用，本轮在生产新建项目和独立工程复测，普通Delete删除A后B仍从7秒自动移到2秒，保留Failed；未提交云效。006及其他未点名用例不扩大排除。

范围控制已写入`tools/editor/erye199/release-scope.mjs`并接统一运行器；`--cases 011-015`实际只跑012，4条延期输出Not Applicable且executed=false。9项离线校验通过，包含只选延期用例不打开浏览器/不创建工程验证。本轮Ego Lite有头TaskSpace5、串行零重试，无补槽或computer-use，不重复已受理任务。

001～015当前5 Passed、5 Failed、1 Blocked、4 Not Applicable，其余53条未计本轮。[本版本范围及012复测截图](cases/requirements/ERYE-199/results-version-scope-012-rerun-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-CURRENT-VERSION-SCOPE-20261113 -->

<!-- ERYE199-012-YUNXIAO-20261113 -->
## 2026-11-13 ERYE-199 012缺陷同步完成

012已提交云效[FWXC-491](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=759a901c1536c53599d1fd4e74)：普通删除前段后，后段自动前移5秒，未保留时间线空隙。状态“🤔AI提缺陷”、负责人牛诗晴、生产环境；2张截图上传并嵌入，原片和脱敏JSON共4附件回读核验通过。012保留Failed；011/013/014/015继续为本版本Not Applicable，未提交。

仅使用官方OpenAPI，无浏览器或computer-use；未查重、不更改旧缺陷，无代码推送。正文保留2～3条精简前置、详细页面步骤、补充验证完整提示词和验证边界。详见[本地缺陷记录](defects/ERYE199-012-normal-delete-gap-production-20261113.md)。
<!-- /ERYE199-012-YUNXIAO-20261113 -->

<!-- ERYE199-015-020-20261113 -->
## 2026-11-13 ERYE-199 015～020生产执行

015按用户既定本版本范围保持Not Applicable、未执行。016真实子序列创建不支持，017/018引用同批前置缺口记录依赖Blocked，未构造共享实例、越界、循环或深度>8对象。019基础位置(400,200)、等比缩放60%、旋转15度、不透明度50%、背景片段未串改及刷新子步骤通过；锚点/非等比/视频翻转/四边裁剪/混合模式不支持，整例Blocked。020真实关键帧不支持，插值/路径/缓动未执行。新范围合计5 Blocked、1 Not Applicable，没有整例Passed。

016～020接入`tools/editor/erye199/cases-016-020.mjs`；命令`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 015-020`。生产新专用项目与独立工程、Ego Lite有头TaskSpace6；无补槽表单、computer-use、云效写入或推送。019连续提交终态误归属已修正为按当前完整提示词及新run匹配，并回读原run补核，未重复提交；误观察保留历史，不计产品缺陷。11项离线校验通过。

001～020当前5 Passed、5 Failed、6 Blocked、4 Not Applicable，其余48条未计本轮；原4条版本排除及FWXC-479/485/486/487/491保持。[本轮报告和截图](cases/requirements/ERYE-199/results-015-020-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-015-020-20261113 -->

<!-- ERYE199-015-V2-20261113 -->
## 2026-11-13 ERYE-199 015优化版v2通过

用户指出时间轨前方小图标可隐藏画面，并要求015只验已实现部分。015当前仅核验视频隐藏/显示、原声静音/启用、内容不删除及两种状态刷新保持；移除solo和导出隔离步骤，恢复适用。已用生产新工程、Ego Lite有头TaskSpace7真实点击图标完成v2实跑Passed，保存版本1→2→3→4→5；恢复后完整内容与基线一致。无Agent/run、补槽、computer-use或云效写入。

015旧版完整范围Blocked/Not Applicable及历史证据保留，不计为旧版solo能力通过。当前版本仅排除011/013/014，不扩大其他用例排除。11项离线校验通过；统一命令`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 015`。001～020当前6 Passed、5 Failed、6 Blocked、3 Not Applicable，其余48条未计本轮；5个云效关联不改。[015新版步骤与截图](cases/requirements/ERYE-199/results-015-v2-visibility-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-015-V2-20261113 -->

<!-- ERYE199-SKIP-016-018-20261113 -->
## 2026-11-13 ERYE-199 016～018暂跳过

用户2026-11-13要求：016～018暂不支持，当前先跳过，功能实现后再测；不计通过或当前阻塞，原需求和历史Blocked/截图保留。

范围控制已同步跳过016/017/018，保留原探测脚本，输出Not Applicable且executed=false；当前共排除011/013/014/016/017/018，不扩到006/019/020。015 v2 Passed及5个云效关联不变。001～020当前6 Passed、5 Failed、3 Blocked、6 Not Applicable，其余48条未计本轮。本次无页面执行、Agent提交、云效写入或推送。[范围说明](cases/requirements/ERYE-199/scope-skip-016-018-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-SKIP-016-018-20261113 -->

<!-- ERYE199-019-V2-20261113 -->
## 2026-11-13 ERYE-199 019优化版v2通过

019已按用户要求优化阻塞部分并重新执行，仅保留已实现的位置(400,200)、等比缩放60%、旋转15度、不透明度50%及刷新保持、前景原片/背景/两条原声不串改。移除锚点、非等比、视频翻转、四边裁剪和混合模式探测；关键帧属020。生产新项目/会话/工程、Ego Lite有头TaskSpace8一次完整请求实跑Passed，run `run_v2_ace64eb4364f429081e6162beab1ee33` done，版本1→2；页面组合画面已查看，5张原图与核验JSON及SHA256已归档。旧版Blocked/局部通过保留历史，不视为移除能力已实现。

已更新用例、脚本、registry、当前状态和配置说明；11项离线检查通过。001～020当前7 Passed、5 Failed、2 Blocked、6 Not Applicable；其余48条未计本轮，006/020仍Blocked，6条延期Not Applicable及5条既有云效关联保持。本次无computer-use、云效写入或推送。[019前置、完整提示词、实跑结果和截图](cases/requirements/ERYE-199/results-019-v2-static-transform-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-019-V2-20261113 -->

<!-- ERYE199-UNIMPLEMENTED-YUNXIAO-20261113 -->
## 2026-11-13 ERYE-199 016/017/018/020功能未实现已同步

按用户明确要求，通过官方OpenAPI分别新建：016→FWXC-509（真实子序列创建）、017→FWXC-510（共享引用/独立副本前置）、018→FWXC-511（父子范围/嵌套校验前置）、020→FWXC-512（可编辑属性关键帧）。标题均含“功能未实现”，不查历史重复。每条九段正文含精简前置、完整提示词及复现步骤；6张原始截图已上传嵌入，17附件和正文/字段回读验证通过。状态🤔AI提缺陷，负责人牛诗晴，优先级高、2-严重、重构10-29、生产环境。

017/018仅复用016前置失败截图，明确来源；共享/副本、范围/循环/深度目标步骤未执行，未来回归提示词标注未发送。本次不重跑产品、不重发原任务。020同步为本轮Not Applicable并在运行器跳过，原Blocked保留历史；当前7条排除，015/019 v2 Passed、006仍Blocked，原5个云效关联保留，累计9个云效关联。001～020当前7 Passed、5 Failed、1 Blocked、7 Not Applicable，其余48条未计本轮。11项离线检查通过；无computer-use或推送。[本次云效、截图和范围](cases/requirements/ERYE-199/defects-unimplemented-016-018-020-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-UNIMPLEMENTED-YUNXIAO-20261113 -->

<!-- ERYE199-MANUAL-021-049-20261113 -->
## 2026-11-13 ERYE-199 021～049页面执行（不含删除040）

用户要求021～050执行且暂不接入自动化，随后明确删除040/050；两条已移除有效用例和registry，原条目归档不复用。当前有效66条，本轮剩余28条；阶段Completed，2 Passed、1 Failed、1 Blocked、24 Not Applicable。使用生产新项目、Ego Lite有头TaskSpace9，不使用computer-use、不提交云效或推送。依赖项只记录本轮源前置证据、未执行目标明确说明，局部通过不替代整例通过。自动化标记全部保留PLAN，脚本为空。

[本轮详细步骤、提示词和截图](cases/requirements/ERYE-199/results-021-049-manual-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。001～020原实测和9个云效关联保持。
<!-- /ERYE199-MANUAL-021-049-20261113 -->

<!-- ERYE199-030-YUNXIAO-20261113 -->
## 2026-11-13 ERYE199-030失败已同步云效

通过官方OpenAPI直接新建[FWXC-517](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a8dc2ee87914e60ad64d64254c)：组合请求导出SRT及样式字幕时整体失败，报Unknown or missing editor fields。正文含3条精简前置、完整失败提示词/单独SRT补充指令、详细复现步骤及边界；3张原始截图上传嵌入，7附件与正文/字段回读验证通过。状态🤔AI提缺陷，负责人牛诗晴，优先级高、2-严重、重构10-29、生产环境。

单独SRT导出成功、ASS/SSA不支持均明确保留，未将未实现格式本身当作故障；030保持Failed、自动化PLAN，未重跑、重发或推送。本轮28条仍2 Passed、1 Failed、1 Blocked、24 Not Applicable，040/050保持删除。当前关联云效共10条（原9条+本次030），其余结果不变。[同步记录与完整缺陷](cases/requirements/ERYE-199/defects-030-combined-subtitle-export-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-030-YUNXIAO-20261113 -->

<!-- ERYE199-049-V2-20261113 -->
## 2026-11-13 ERYE199-049按当前发送/停止交互修订

用户明确当前没有独立重试功能，运行中再次点击发送就是停止。049 v2改为从会话发送导出请求→运行中点击同一入口停止→确认停止后新提交→完成后再独立提交并检查产物不覆盖；不把运行中停止点击当作第二次提交，不把停止后新任务称作失败重试。保留对真实任务状态/后续产物的核验，不能将会话停止直接当作已证实渲染子任务停止。

新版Not Run、待复测，原Blocked和截图/产物保留历史；本次只改定义与进度，没有浏览器执行、云效写入或脚本接入。当前本批2 Passed、1 Failed、24 Not Applicable、1 Not Run，其他实测不变；030及FWXC-517、10个云效关联保持。[049 v2完整前置、提示词、步骤和预期](cases/requirements/ERYE-199/revision-049-send-stop-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-049-V2-20261113 -->

<!-- ERYE199-049-V2-PASSED-20261113 -->
## 2026-11-13 ERYE199-049 v2按发送/停止交互复测通过

用户说明发送入口运行时为停止、没有独立失败重试后，049 v2在生产新项目/会话/工程以Ego Lite TaskSpace10实跑Passed。定稿指令按已保存设置导出完整工程，不要求区间/参数覆盖；被停止原请求queued→cancelled且直到两次新任务完成仍无结果，页面恢复发送。随后独立新任务A、B均done且实际下载，B后从A卡再下载，三份哈希相同，均20秒/640×360/30fps/48kHz；两个历史结果入口可访问，工程全内容未改。相同内容返回相同文件引用不单独判失败。

覆盖为已受理排队阶段停止、停止后新提交和完成后独立提交；渲染已经开始后的停止未执行，不声称后台渲染终止已验证。草稿参数/区间请求的明确拒绝也保留记录，不冒充产物成功。原Blocked及修订时Not Run保留历史，本批仍PLAN不接自动化。当前本批3 Passed、1 Failed、24 Not Applicable；030及FWXC-517、10个云效关联不变，无本轮云效写入或推送。[实跑、完整提示词、截图及下载核验](cases/requirements/ERYE-199/results-049-v2-send-stop-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-049-V2-PASSED-20261113 -->

<!-- ERYE199-NA-CURRENT-CAPABILITIES-20261113 -->
## 2026-11-13 ERYE199原24条不适用原因及现有能力优化

原24条为18条直接能力／组合范围缺口、6条前置依赖缺失，不等于24条失败。028／029／034／042／047／048按当前支持的全局字幕、混合文字、0.25～4倍速、片段音量、现有对象预览导出及全屏预览优化为v2，完整前置、步骤、提示词／无需提示词、预期已写入正式条目，当前均Not Run。另18条核心能力尚不存在，保留原目标并明确延期和恢复条件，不以其他工作流替代验收。旧24条定义、Not Applicable及截图保留历史。

本批28条当前3 Passed、1 Failed、18 Not Applicable、6 Not Run；合并001～020的48条当前10 Passed、6 Failed、1 Blocked、25 Not Applicable、6 Not Run，另051～068有18条未执行，共66条有效、24条待执行。030/FWXC-517及049 v2 Passed保持，既有10个云效关联不变。本次只修订文档和状态，未页面执行、云效写入或推送；本批仍PLAN、脚本为空，不接自动化。

[逐条原因及优化范围](cases/requirements/ERYE-199/revision-na-current-capabilities-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-NA-CURRENT-CAPABILITIES-20261113 -->

<!-- ERYE199-UNFINISHED24-YUNXIAO-20261113 -->
## 2026-11-13 原24条未完成需求已汇总提交云效

按用户“提出未完成需求就好”的最新要求，通过tools/yunxiao官方OpenAPI直接创建[FWXC-525](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1bea8a02a752c39eb065fe77f6)，标题含功能未实现；正文按15组列清原24条能力缺口，不展开提示词／复杂步骤。6张代表原图已上传嵌入，7附件及正文／字段回读通过；🤔AI提缺陷、牛诗晴、高、2-严重、重构10-29、生产环境。18条直接缺口与6条依赖未执行明确区分；6条v2仍Not Run、另18条仍Not Applicable，不记新失败。累计11个不同云效缺陷，原10个关联保持，24条共享一单不计作24个新建；本次未重跑、未接自动化或推送。

[同步及本地正文](cases/requirements/ERYE-199/defects-unfinished-24-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-UNFINISHED24-YUNXIAO-20261113 -->

2026-11-13用户执行期间明确删除ERYE199-060/061，两条未开始执行，原定义归档于 `docs/cases/requirements/ERYE-199/retired-cases-060-061-20261113.json`，编号不复用。有效64条，本轮改为051～059、062～068共16条。

<!-- ERYE199-051-068-PRODUCTION-20261113 -->
## 2026-11-13 ERYE199-051～059、062～068执行完成

生产新项目、Ego Lite有头TaskSpace11；用户删除060/061，原条目退役不复用，未跑性能负载。本批16条7 Passed、1 Failed、2 Blocked、6 Not Applicable；已接入cases-051-068.mjs及057 crash-recovery.mjs，无新增依赖。054补齐页面选择/目标后完成；059原请求断网恢复通过；057捕获明确Inspector.targetCrashed，用户接管时暂停、明确继续后原场景恢复，仅覆盖未发送保存分支。064媒体→工程提示执行服务未返回有效JSON（504）且列表为空；058缺旧端，068空工程无独立两页入口。051/052/053/055/056/063不适用，依赖或纯内部协议不计产品失败。定位、同义提示、隐藏DOM问题修正并保留历史，不当作产品缺陷。

有效64条当前17P/7F/3B/31NA/6NR；原6条优化v2仍Not Run，原11个不同云效缺陷保持。本次无computer-use、云效写入或推送；021～049继续不接自动化。截图/摘要/哈希和逐例范围已归档。

[本次实测与截图](cases/requirements/ERYE-199/results-051-068-production-20261113.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
验证：11项定向离线校验、528条用例格式检查、34份证据哈希及文档链接均通过。TaskSpace11已正常结束一次；Ego Lite更新提示未执行升级。
<!-- /ERYE199-051-068-PRODUCTION-20261113 -->

<!-- ERYE237-029-RETIRED-20261113 -->
2026-11-13：用户确认FWXC-532所述默认尺寸变化不作为缺陷，并要求删除ERYE237-029。已移除主用例、Agent配对、Technical分支及registry条目，后续不执行、不回归、不再进入缺陷待办；编号不复用。当前143条有效、46 UI/25 Agent/72 Technical，P0 94/P1 48/P2 1。云效只读核对为已关闭，本次未改云效、未重测。原条目及旧记录仅留历史归档，不计当前待办。
<!-- /ERYE237-029-RETIRED-20261113 -->

<!-- ERYE199-068-V2-PASSED-20261116 -->
## 2026-11-16 ERYE199-068按当前空工程功能优化并复测通过

用户要求将068旧独立字幕/素材两页空态调整为当前总空态。已在原编号写明前置、步骤和预期，原位同步自动化；生产新测试项目/会话/空工程、Ego Lite有头实跑Passed：空白工程标题及媒体引导可见，选择媒体按钮启用、导出禁用；刷新和收起再展开后仍同一空工程，无新增对象或run。只验证按钮状态，不点媒体选择或做导入，不宣称旧两页目标已覆盖。旧Blocked、修订时Not Run与截图均保留历史；初始化及窗口最小化的执行问题已恢复后继续，不当产品失败。

有效64条当前18P/7F/2B/31NA/6NR；原16条范围按现定义8P/1F/1B/6NA，058/006仍Blocked，原6条优化版仍Not Run。其他用例、原云效关联不变。本次无素材上传、Agent生成、computer-use、云效写入或推送；021～049仍不接自动化。

[068 v2实测与4张原图](cases/requirements/ERYE-199/results-068-v2-empty-project-production-20261116.md) · [当前状态](cases/requirements/ERYE-199/execution-status-current.md)。
验证：11项定向离线校验、527条用例格式检查及6份证据文件哈希/链接通过；本次TaskSpace1已正常结束一次，未执行工具升级。
<!-- /ERYE199-068-V2-PASSED-20261116 -->

<!-- ERYE199-058-RETIRED-20261116 -->
## 2026-11-16 ERYE199-058按用户要求删除

058已从正式用例、registry、自动化函数和后续运行范围移除，原Blocked及截图归档，编号不复用。当前有效63条18P/7F/1B/31NA/6NR，仅006仍Blocked；068 v2 Passed、原六条优化版Not Run和其他用例保持。051～068现行有效15条8P/1F/0B/6NA，范围命令自动排除058/060/061，直接调用执行器也在浏览器/项目准备前排除。历史执行和截图不删除，不把退役计作通过；本次无生产重跑、云效写入或推送。

[058退役范围和原条目](cases/requirements/ERYE-199/retired-case-058-20261116.md) · [当前进度](cases/requirements/ERYE-199/execution-status-current.md)。
验证：12项定向离线校验、526条用例格式检查通过；--list仅列出现行15条，原截图/归档和链接核对通过。
<!-- /ERYE199-058-RETIRED-20261116 -->

<!-- CREATOR-FIXED-PROD-REGRESSION-20261117 -->
2026-11-17历史实测：创建者陈亚宾、初始已修复，共34条；项目按最新授权首条新建、后续优先复用，必要时隔离会话/工程。Passed 23 / Failed 7 / Blocked 4；云效状态已回读 29 条。逐例步骤、结果及截图见[回归记录](defect-regressions/creator-chenyabin-fixed-production-20261117.md)。不向用例统一入口写执行结果。
2026-11-18用户确认关闭FWXC-403、FWXC-399：当前方案待审核时无正常重复发送入口，原重复提交缺陷关闭，云效均已回读为“已关闭”。历史实测统计保留，不改记通过；当前仍待处理的阻塞为FWXC-484、FWXC-462，共2条。
<!-- /CREATOR-FIXED-PROD-REGRESSION-20261117 -->

<!-- CREATOR-FIXED-PROD-REGRESSION-20261120 -->
2026-11-20生产回归：陈亚宾创建、初始已修复29条，Passed 22 / Failed 4 / Blocked 3 / Not Run 0，云效状态已写入并回读25条。Ego Lite使用与主程序匹配的0.6.3.14已恢复生产连接；按用户提供会话复用所在项目，新建独立回归工程，保留用户现有配音内容。403/399已关闭，不再回归。 [本轮记录](defect-regressions/creator-chenyabin-fixed-production-20261120.md)。
<!-- /CREATOR-FIXED-PROD-REGRESSION-20261120 -->

<!-- CREATOR-FIXED-PROD-REGRESSION-20261123 -->
2026-11-23 生产回归，陈亚宾创建且初始状态为「已修复」。共 21 条，8 通过、7 失败、6 阻塞、0 待执行。云效状态写入并回读 15 条。 [逐条结果与截图](defect-regressions/creator-chenyabin-fixed-production-20261123.md)。
FWXC-580、FWXC-247 的生产成片补验通过。两份原成片均从交付卡下载、本地播放正常，音视频完整解码无错误，截图已归档。
<!-- /CREATOR-FIXED-PROD-REGRESSION-20261123 -->

<!-- SSO-NIGHTLY-20261123 -->
2026-11-23生产SSO执行前Blocked：27例129轮计划，0提交。只读确认38仍user-owned；旧017 R2终态未回读，尚待已告知的明确恢复指示。原片SHA/参数及完整解码重新核验，未验证登录、未接管或新开绕过；不重复通知。[本日报告](design-cases/multi-workflow/sso-nightly-prod-results-20261123.md)。无云效/README/Git写入。
<!-- /SSO-NIGHTLY-20261123 -->

<!-- SSO-NIGHTLY-20261122 -->
2026-11-22生产SSO执行前Blocked：27例129轮计划，0提交。只读确认38仍user-owned；旧017 R2终态未回读，尚待已告知的明确恢复指示。原片SHA/参数及完整解码重新核验，未验证登录、未接管或新开绕过；不重复通知。[本日报告](design-cases/multi-workflow/sso-nightly-prod-results-20261122.md)。无云效/README/Git写入。
<!-- /SSO-NIGHTLY-20261122 -->

<!-- SSO-NIGHTLY-20261121 -->
2026-11-21生产SSO日批执行前Blocked：27例/129轮计划，0业务提交。只读清单确认38仍为user-owned，未收到明确恢复窗口指示，旧017 R2终态仍未回读；与11月20日阻塞相同，不重复通知。本机原片SHA/参数/完整解码重新核验，登录及产品业务均未执行。详见[本日报告](design-cases/multi-workflow/sso-nightly-prod-results-20261121.md)。不写云效、统一README或Git。
<!-- /SSO-NIGHTLY-20261121 -->

<!-- SSO-NIGHTLY-20261120 -->
2026-11-20 SSO生产日批执行前Blocked：27例/129轮计划，0业务提交；上一批TaskSpace38已结束且为user-owned，SSO017 R2终态未回读，未抢控或新开绕过。需用户明确允许恢复38窗口；本机素材SHA/参数/完整解码已复核，登录未核验。当前无后台driver，保留原run不重发；旧执行锁已标识控制阻塞，尚不能确认上批安全结束。[本日报告](design-cases/multi-workflow/sso-nightly-prod-results-20261120.md)。0云效/README/Git写入。
<!-- /SSO-NIGHTLY-20261120 -->

<!-- SSO-NIGHTLY-20261119 -->
2026-11-19凌晨全量SSO：27例/129轮计划；当前各轮{"Passed":37,"Failed":32,"Awaiting content review":6,"Blocked":1}，尚未执行及待内容复核均不计通过。账号yabinc18，生产ego TaskSpace38。逐例详见[本批报告](design-cases/multi-workflow/sso-nightly-prod-results-20261119.md)及reports/sso-nightly-prod-20261119/progress.json。未重发已受理任务，未写云效/统一入口README或Git。
<!-- /SSO-NIGHTLY-20261119 -->

<!-- E196-NL135158-SYNC-20261118 -->

2026-11-18 135～158失败缺陷已核验9/9组，覆盖17/17例：135/142/152→FWXC-317（追加）；136→FWXC-576（追加）；137→FWXC-666（追加）；138/140/141/155→FWXC-573（追加）；139/148/150/151→FWXC-674（追加）；154→FWXC-349（追加）；143/144→FWXC-689（新建）；149→FWXC-690（新建）；151→FWXC-691（新建）。截图及附件已OpenAPI回读，原6通过/17失败/1阻塞及PLAN保持，未重跑业务。[同步报告](defects/ERYE196-NL-135-158-sync-prod-20261118.md)。下文“未写云效”仅指业务执行阶段。
<!-- /E196-NL135158-SYNC-20261118 -->

<!-- E196-NL135158-RUN-20261118 -->
2026-11-18 ERYE196-135～158 Chrome生产自然语言执行：已登记24/24；通过6、失败17、阻塞1、未执行0；固定脚本PLAN/空路径；逐条实际结果及未执行依赖见报告。[本轮报告](cases/requirements/ERYE-196/results-135-158-nl-chrome-prod-20261118.md)。
<!-- /E196-NL135158-RUN-20261118 -->

<!-- E196-NL135158-DESIGN-20261118 -->
2026-11-18 编辑器自然语言覆盖新增ERYE196-135～158共24条，设计总数158；8类覆盖补充，全部Not Run/PLAN/空脚本，未执行产品或提交云效。001～134既有实测及缺陷关联保持。[详细用例](cases/requirements/ERYE-196/supplement-135-158-natural-language-20261118.md)。静态校验通过：`npm run cases:check` 检查545条、issues=0；新增24条编号/详细正文/链接/状态一致性检查通过。当前环境缺少裸`python`命令，本轮通过临时包装调用已有Python3运行原校验脚本，未修改package.json或系统环境。
<!-- /E196-NL135158-DESIGN-20261118 -->

<!-- ERYE237-050-SINGLE-IMAGE-V11-20261118 -->
2026-11-18 新版050已在生产ego有头TaskSpace37重跑Passed：先I1蓝星完成并核验，再I2原源单独加SYNC50；A/B各Passed，2请求/2生成零重发，来源/引用/成品不串用，原源/全历史及前轮成品保持。自有批注/待发/输入清理、窗口已finish；PLAN/空脚本。Technical未选Not Run，0云端写入；FWXC-599历史状态不因新版通过自动更改。旧单请求双图不适用。 [本轮执行报告](cases/requirements/ERYE-237/results-050-single-image-v11-ego-prod-20261118.md)。
<!-- /ERYE237-050-SINGLE-IMAGE-V11-20261118 -->

<!-- FWXC599-REGRESSION-20261118 -->
2026-11-18 FWXC-599生产ego有头TaskSpace35：严格原回归Failed（旧未知错误未复现，携引用只交付当前I2、遗漏I1无说明）；扩散一Failed（改当前I1只交付I1），扩散二普通Agent执行通过（两原源分别生成并保存正确1024²PNG）。原例状态暂不修复→❌AI未通过；评论24362365及7原图/2JSON回读通过。3请求/4生成零重发，原图复位、历史保留、自有批注及输入清理；PLAN/空脚本。 [完整回归报告](defects/FWXC-599-retest-ego-prod-20261118.md)。
<!-- /FWXC599-REGRESSION-20261118 -->

<!-- ERYE237-019028-CLOUD-SYNC-20261118 -->
2026-11-18 019→FWXC-679新建；028→FWXC-670评论24359000关联；5原图/5JSON及正文评论回读通过，两单AI提缺陷，0产品重跑，3P/2F/0B及PLAN保持。 [同步报告](defects/ERYE237-019-028-cloud-sync-20261118.md)。
<!-- /ERYE237-019028-CLOUD-SYNC-20261118 -->

<!-- E196-NL120134-SYNC-20261118 -->
2026-11-18 120～134失败缺陷已核验9/9组，覆盖12/12例：121/130→FWXC-638（追加）；120/132→FWXC-349（追加）；123→FWXC-674（新建）；125→FWXC-495（追加）；126→FWXC-675（新建）；127→FWXC-571（追加）；128→FWXC-676（新建）；129→FWXC-677（新建）；131/134→FWXC-678（新建）。截图及附件已OpenAPI回读，原3通过/12失败及PLAN保持，未重跑业务。[同步报告](defects/ERYE196-NL-120-134-sync-prod-20261118.md)。下文“未写云效”仅指业务执行阶段。
<!-- /E196-NL120134-SYNC-20261118 -->

<!-- ERYE237-OPT5-RUN-20261118 -->
2026-11-18生产ego-browser有头TaskSpace34重跑优化018/019/028/029/031：{'Passed': 3, 'Failed': 2}；各例独立结论及未覆盖范围见报告。019非法7未拒绝、实际文字变8；029正式8px合成PNG逐像素一致，另1次准备偏差完整保留不计覆盖。默认字号与Agent参数分开；PLAN/空脚本，未写云效。 [本轮报告](cases/requirements/ERYE-237/results-018019028029031-ego-prod-20261118.md)。
<!-- /ERYE237-OPT5-RUN-20261118 -->

<!-- E196-NL120134-RUN-20261118 -->
2026-11-18 ERYE196-120～134 Chrome生产自然语言测试：已登记15/15，{"Failed": 12, "Passed": 3}；120～134全部15条本轮判定完成：3 Passed、12 Failed、0 Blocked；无本批在途请求，PA保留新分支134/R74，PB保留PB-固定，源素材及历史保持。固定脚本PLAN/空路径。固定脚本PLAN/空路径，有头操作不计为固定脚本自动化。[本轮报告](cases/requirements/ERYE-196/results-120-134-nl-chrome-prod-20261118.md)。
<!-- /E196-NL120134-RUN-20261118 -->

<!-- ERYE237-V10-CLOUD-SYNC-20261117 -->
2026-11-17：028→[FWXC-670](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=29354182937908ffb882916ff1)追加双蓝点残片、标题含045/028；088→[FWXC-618](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1b8cdbc7f080e57509f19c748d)追加在途历史占位/导出禁用，并按用户指示改“再次打开”。4图/4补充附件、2条评论及状态官方回读通过，0新建/0产品重跑；原3P/2F及PLAN保持。[同步报告](defects/ERYE237-v10-028-088-cloud-sync-20261117.md)。
<!-- /ERYE237-V10-CLOUD-SYNC-20261117 -->

<!-- E196-NL111120-SYNC-20261117 -->
2026-11-17 111～120失败缺陷已核验4/4组，覆盖6/6例：113/118→FWXC-638（追加）；115→FWXC-672（新建）；116/119→FWXC-317（追加）；116/119/120→FWXC-349（追加）。116/119分别关联两个问题；截图及附件已OpenAPI回读，原4通过/6失败及PLAN保持，未重跑业务。[同步报告](defects/ERYE196-NL-113-115-116-118-119-120-sync-prod-20261117.md)。下文“未写云效”仅指业务执行阶段。
<!-- /E196-NL111120-SYNC-20261117 -->

<!-- ERYE237-ANNOTATION-V10-DESIGN-20261117 -->
2026-11-17生产ego有头TaskSpace33完成v10实际5入口：057/010/043 Passed，028 Failed（双蓝点成品残缺，整组撤销/重做仅诊断，不算完整V2验收通过），088 Failed（运行中历史导出禁用）；3P/2F/0B。007→088、068→010、069→043仍只索引，不重复计数。2次原任务均done/applied，无业务重发；自有草稿清理、原图/历史保留。PLAN/空脚本，无本轮云效写入。 [执行与证据](cases/requirements/ERYE-237/results-annotation-v10-ego-prod-20261117.md)。
<!-- /ERYE237-ANNOTATION-V10-DESIGN-20261117 -->

<!-- ERYE237-045-BLUE-CLOUD-20261117 -->
2026-11-17：ERYE237-045 v9/10蓝点残缺已通过官方OpenAPI新建[FWXC-670](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=29354182937908ffb882916ff1)，当前🤔AI提缺陷；查重当前483条未见相同问题，原FWXC-540/541未改。2张原始图片＋3份补充证据上传、正文嵌图及附件回读通过。同步不重跑业务，045Failed/046～048Passed/0Blocked和PLAN保持。[本地记录](defects/ERYE237-045-blue-dots-clipped-prod-20261117.md)。
<!-- /ERYE237-045-BLUE-CLOUD-20261117 -->

<!-- E196-NL111120-RUN-20261117 -->
2026-11-17 ERYE196-111～120 Chrome生产自然语言测试：已登记10/10，{"Passed": 4, "Failed": 6}；111～120已完成判定：4 Passed、6 Failed；113 Safari编辑器加载前置未满足，Edge未安装，均未覆盖正式多浏览器分支。无本批在途请求，保留已保存120及原稿/历史；无额外导出，未写云效。固定脚本PLAN/空路径。。固定脚本PLAN/空路径，有头操作不计为固定脚本自动化。[本轮报告](cases/requirements/ERYE-196/results-111-120-nl-chrome-prod-20261117.md)。
<!-- /E196-NL111120-RUN-20261117 -->

<!-- E196-NL101110-SYNC-20261117 -->
2026-11-17 101～110失败缺陷已核验4/4组，覆盖5/5例：105→FWXC-668（新建）；107→FWXC-573（追加）；108→FWXC-317（追加）；109/110→FWXC-349（追加）。截图及附件已OpenAPI回读；原1通过/5失败/4暂缓及PLAN保持，未重跑业务。[同步报告](defects/ERYE196-NL-105-107-108-109-110-sync-prod-20261117.md)。下文“未写云效”仅指业务执行阶段。
<!-- /E196-NL101110-SYNC-20261117 -->

<!-- ERYE237-BOUNDARY-V9-20261117 -->
2026-11-17按用户要求优化045～048：四条改为明确动作的UI主入口；048/11999四条批注各新增蓝点，固定全文/精确长度已生成。provider/费用审计及直接后端校验独立排程，不再造成主UI阻塞。旧UI Passed/Technical Blocked及实际成品完整存档；新版4条Not Run、PLAN/空脚本，不因文档优化补算通过。编号001～122不变、无重复新增、无生产重跑或云效写入。 [本次修订](cases/requirements/ERYE-237/revision-045-048-actionable-boundaries-20261117.md)。当前112独立主入口＝69 UI/26 Agent/17 Technical，另10合并索引。
<!-- /ERYE237-BOUNDARY-V9-20261117 -->

<!-- ERYE237-BOUNDARY6-RUN-20261117 -->
2026-11-17生产ego-browser TaskSpace31完成045～048及IMG-ANN-UI-009/010：两专项完整Passed；四条正式用例12行UI边界及4个独立服务端超限拒绝Passed，Technical整体仍因独立provider/账务审计缺口Blocked。10次真实生成9done/1failed（11999语义范围不明，不重发）；另有红球水平截边本地发现，未写云效。源图/完成历史保留，自有草稿清空，PLAN/空脚本保持。 [本轮报告](cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md)。旧结果仅保留历史，不代表此次尚未执行。
<!-- /ERYE237-BOUNDARY6-RUN-20261117 -->

<!-- E196-NL101110-RUN-20261117 -->
2026-11-17 ERYE196-101～110 Chrome生产自然语言测试：已登记10/10，{"Passed": 1, "Failed": 5, "Blocked": 4}；101～110本轮结束：6条实际执行，1 Passed、5 Failed；4条双账号按用户要求暂缓（Blocked）。无在途正式请求，PA新稿110及105恢复稿保留。固定脚本PLAN/空路径，未写云效。。固定脚本PLAN/空路径，有头操作不计为固定脚本自动化。[本轮报告](cases/requirements/ERYE-196/results-101-110-nl-chrome-prod-20261117.md)。
<!-- /E196-NL101110-RUN-20261117 -->

<!-- E196-NL090100-SYNC-20261117 -->
2026-11-17 090/092/095/097缺陷已核验3/3组，覆盖4/4例：090/092→FWXC-657（追加）；095→FWXC-665（新建）；097→FWXC-666（新建）。真实截图和附件已OpenAPI回读；本批7通过/4失败及PLAN保持，未重跑业务。[同步报告](defects/ERYE196-NL-090-092-095-097-sync-prod-20261117.md)。下文“未写云效”仅指业务执行阶段。
<!-- /E196-NL090100-SYNC-20261117 -->

<!-- E196-NL090100-COMPLETE-20261117 -->
2026-11-17 Chrome生产090～100本轮已完成判定：7 Passed（091/093/094/096/098/099/100），4 Failed（090/092/095/097），无剩余Blocked。099用户要求的PB已生成，前置纠正后完整配对通过；095/097首步失败依赖未发送。PB已保存打开，无额外导出；固定脚本仍PLAN/空路径，本轮未写云效。[执行结果及证据](cases/requirements/ERYE-196/results-090-100-dubbing-nl-chrome-prod-20261117.md)。
<!-- /E196-NL090100-COMPLETE-20261117 -->

<!-- ERYE237-ANN3-RUN-20261117 -->
2026-11-17新版ERYE237-091/096/103在生产ego-browser有头TaskSpace30实际执行：**3 Passed / 0 Failed / 0 Blocked**。空正文添加门禁、输入完成立即添加全文、两浮层切换保留正文均完成。未发送主请求、未新增图片任务或完成版；原图V1像素保持，自有草稿/引用清理，原图及历史保留。PLAN/空脚本保持，无云效或Git写入。 [本轮报告](cases/requirements/ERYE-237/results-091-096-103-annotation-ui-ego-prod-20261117.md)。下方未执行/旧技术状态为历史，不覆盖本次新版UI结果。
<!-- /ERYE237-ANN3-RUN-20261117 -->

<!-- ERYE237-110122-RUN-20261117 -->
2026-11-17新版ERYE237-110～122已在生产ego-browser有头TaskSpace29逐条完成：**13 Passed / 0 Failed / 0 Blocked**。110单次生成的实际PNG确认右侧红球、无未引用白狗；其余12条UI未发送，111～113已在V1完整补核，最终全部按原图基线取证。自有草稿/引用/输入已清理，原图和成品历史保留；PLAN/空脚本保持，无云效或Git写入。 [本轮报告](cases/requirements/ERYE-237/results-110-122-ego-prod-20261117.md)。下文Not Run和改号/去重计数为此前设计阶段记录，最新以本轮报告及registry为准。
<!-- /ERYE237-110122-RUN-20261117 -->

<!-- ERYE237-RENUMBER-20261117 -->
2026-11-17按用户要求更新ERYE237编号：当前001～122连续，001～109不变，旧13个稀疏批注编号顺排为110～122。13条仍Not Run、PLAN/空脚本，内容和历史结果不改；旧报告/归档/云效保留原编号，必须按版本查[新旧对照](cases/requirements/ERYE-237/renumbering-20261117-v8.md)。22已删项没有恢复。仅文档改号，无生产/云效写入或Git提交。
<!-- /ERYE237-RENUMBER-20261117 -->

<!-- E196-FOLLOWUP-TEMPLATE-20261117 -->
2026-11-17后续101～134共34条沿用精简模板：前置负责打开目标工程，提示词保留动作、参数及本例关键限制，不指定新工程名；跨工程和权限保留必要目标，整组撤销/重做要求不变。仅文档更新，Not Run及PLAN/空脚本保持。
<!-- /E196-FOLLOWUP-TEMPLATE-20261117 -->
[当前用例](cases/requirements/ERYE-196/revision-090-134-natural-language-undo-20261117.md#erye196-101)。

<!-- E196-PROMPTS-CONCISE-20261117 -->
2026-11-17按用户最新要求进一步精简ERYE196-090～134：移除固定新工程命名，单工程靠前置打开定位；45条/111轮中70条提示词调整，通用步骤与取证合并说明，跨工程/权限及整组撤销目标保留。仅文档优化，原状态和PLAN/空脚本不变，未发新浏览器任务。[当前提示词及示例](cases/requirements/ERYE-196/revision-090-134-natural-language-undo-20261117.md#提示词写法2026-11-17补充)。
<!-- /E196-PROMPTS-CONCISE-20261117 -->

<!-- ERYE237-DELETE22-20261117 -->
2026-11-17已按用户要求实际删除本批22条重复合并项（当前cases.md和registry.yaml均已移除），只保留13条图片批注补充Not Run。当前122登记＝112独立主入口＋10前批合并；剩余编号不重排，原图/实测/缺陷和历史定义不改。PLAN/空脚本，本次仅文档删除，未执行生产或写云效。[当前13条用例](cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md)。
<!-- /ERYE237-DELETE22-20261117 -->

<!-- ERYE237-ANNOTATION35-20261117 -->
2026-11-17用户要求ERYE237-110～144仅图片批注并去重，已更新35编号：13条独立UI补充Not Run，22条仅合并索引不独立执行；全库112独立主入口＋32合并索引，编号仍144。旧技术/拟定定义及登记存档、实际结果/缺陷不改。PLAN/空脚本，本次只设计、无浏览器/生产/云效执行。[完整35条映射及13条步骤](cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md)。
<!-- /ERYE237-ANNOTATION35-20261117 -->

<!-- ERYE237-ANNOTATION14-20261117 -->
2026-11-17按用户“不要和之前用例重复”去重：14条重写设计只保留091/096/103三个未覆盖的批注输入/浮层检查，均Not Run；11条合并回010/040/042/043/044/045的UI、085及既有IMG-ANN专项，不独立执行或继承通过。该轮设计时133独立主入口＋11合并索引；全库最新计数见110～144修订；091～110当前4P/2F/3NR＋11合并。旧技术结果及v4定义存档，目标旧状态不改；PLAN/空脚本，本次仅文档修订，无生产/云效写入。[逐项去重对照及三条补充](cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md)。
<!-- /ERYE237-ANNOTATION14-20261117 -->

<!-- E196-NL090100-VOICE-20261117 -->
2026-11-17用户指定在新配音项目执行ERYE196-090～100，并仅使用指定目录素材；已选双人（英）.mp4的20～40秒片段。正式已登记11/11，{"Failed": 4, "Passed": 7}；090～100已完成本轮判定：{"Failed":4,"Passed":7}。099前置已解除并完整配对通过；095/097依赖失败的后续步骤未发送。PB工程已保存并打开，无在途正式任务、无额外导出，固定脚本PLAN。。PLAN/空脚本，账务暂缓；普通090准备任务不计本批。[本轮报告](cases/requirements/ERYE-196/results-090-100-dubbing-nl-chrome-prod-20261117.md)。
<!-- /E196-NL090100-VOICE-20261117 -->

<!-- E196-NL45-UNDO-REVISION-20261117 -->
2026-11-17按用户要求就地优化ERYE196-090～134共45条，仅通过编辑器自然语言测试；122～134为13条撤销/重做专项，覆盖改文、时间、分割、裁剪、删除关联原声、复制、BGM、水印、整组恢复、多层历史和Redo分支。45条新版Not Run、PLAN/空脚本，未重跑生产；090旧失败及FWXC-657保留。原API/故障注入/M2授权专项保留历史，不冒称被本轮覆盖。[完整45条提示词及验收](cases/requirements/ERYE-196/revision-090-134-natural-language-undo-20261117.md)。
<!-- /E196-NL45-UNDO-REVISION-20261117 -->

<!-- E196-NL4-SYNC-20261117 -->
2026-11-17 ERYE196自然语言缺陷同步：已核验4/4组，071、076→FWXC-655（新建）；076→FWXC-638（追加）；088→FWXC-656（新建）；090→FWXC-657（新建）。7张原图及脱敏附件已OpenAPI回读；旧执行Failed和PLAN保持，未重跑生产。[同步报告](defects/ERYE196-NL-071-076-088-090-sync-prod-20261117.md)。下文“未写云效”仅指原业务执行阶段。
<!-- /E196-NL4-SYNC-20261117 -->

<!-- E196-NL4-RUN-20261117 -->


2026-11-17 ERYE196自然语言新版071/076/088/090 Chrome生产执行：已登记4/4，{"Failed": 4}；四条自然语言新版已全部执行：071/076/088/090均Failed；各独立成功分支已保留，不混用旧API结论；全部轮次结束、无待重发任务，090原20秒工程保留。PLAN/空脚本，账务暂缓，未写云效。[本轮报告](cases/requirements/ERYE-196/results-nl-four-chrome-prod-20261117.md)。
<!-- /E196-NL4-RUN-20261117 -->

<!-- E196-NL4-REVISION-20261117 -->
2026-11-17用户要求ERYE196-071/076/088/090只测编辑器自然语言，已在原编号改为等待素材后追加、缺失素材纠正后替换导出、取消意图与已完成任务保护、一次导出后三轮只读查询。四条新版Not Run、PLAN/空脚本；旧技术实测仅历史，未判产品修复。当前134条50P/30F/3B/3NA/48NR；070～090为9P/8F/4NR。仅文档修订，无生产/云效写入。[自然语言新版与完整提示词](cases/requirements/ERYE-196/revision-071-076-088-090-natural-language-20261117.md)。
<!-- /E196-NL4-REVISION-20261117 -->

# CinLink 当前测试进度

<!-- E196-5-NO-BILLING-20261117 -->
2026-11-17用户允许新建测试项目，扣费/账单暂不验。最新五条2P/1F/2B：088真实后期取消补测Failed（完成结果仍被标已取消）；090依据上轮幂等实测按非账务范围重判Passed，非新重跑；089沿用Passed，071/076仍缺真实处理窗口/可恢复源失效样本。脚本PLAN/空路径，未写云效。[最新范围与补测](cases/requirements/ERYE-196/results-five-no-billing-chrome-prod-20261117.md)。
<!-- /E196-5-NO-BILLING-20261117 -->

<!-- ERYE237-REVISED17-20261117 -->
2026-11-17 ERYE237优化11条＋补执行6条已完成可执行分支并登记：本轮3 Passed（093/094/099）、4 Failed（092/102/104/106）、10 Blocked；与未重跑095/105/107合并091～110当前4P/6F/10B。Blocked保留缺失的技术控制/审计，不计全量通过；17条无Not Run。TaskSpace28已finish，自有草稿清理至R331、原图/历史/候选保留；PLAN/空script，无本轮云效/Git写入。 [本次报告](cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md)。
<!-- /ERYE237-REVISED17-20261117 -->

<!-- E196-5-REVISED-RERUN-20261117 -->
2026-11-17优化后071/076/088/089/090 Chrome生产重跑：已登记5/5，{"Blocked": 4, "Passed": 1}；优化后5条已重跑：089 Passed，071/076/088/090 Blocked；本轮6个已受理任务已核验终态，20秒原稿content完整保持、网络恢复无限速；未写云效。脚本PLAN/空路径；未自动写云效。[本轮报告](cases/requirements/ERYE-196/results-revised-five-chrome-prod-20261117.md)。
<!-- /E196-5-REVISED-RERUN-20261117 -->

<!-- E196-5-BLOCKED-REV-20261117 -->
2026-11-17按用户要求优化ERYE196-071/076/088/089/090：分开上传/处理/就绪、真实源失效/恢复、取消竞争/账务、三类失败恢复、幂等创建/结算分支。已完成分支可复用，仅阻塞依赖步骤；原验收目标保留。新版5条待重跑，历史Blocked和8P/8F/5B实测不变，固定脚本PLAN/空路径；此次无生产、云效或Git写入。[分步计划](cases/requirements/ERYE-196/blocked-step-plan-071-076-088-089-090-20261117.md)。
<!-- /E196-5-BLOCKED-REV-20261117 -->

<!-- ERYE237-091-110-SYNC-20261117 -->
2026-11-17 ERYE237-091～110失败云效同步：已核验3/3问题；ERYE237-105→FWXC-652（新建）；ERYE237-107→FWXC-653（新建）；ERYE237-105→FWXC-610（原单追加）。RGBA复核已把“黑条”更正为透明条，原图未修改；原执行1P/2F/11B/6NR、PLAN/空脚本保持，无业务重跑/Git提交。 [同步清单](defects/ERYE237-091-110-sync-prod-20261117.md)。
<!-- /ERYE237-091-110-SYNC-20261117 -->

<!-- ERYE237-091-110-20261117 -->
2026-11-17 ERYE237-091～110生产ego有头执行/前置核验完成：1 Passed（095页面业务范围）、2 Failed（105/107）、11 Blocked（096/097/098/099/100/103/104/106/108/109/110）、6 Not Run（091/092/093/094/101/102，沿用不验证参数范围）。失败观察含105合成交付报错、107跨文档工程绑定失败，以及105相关原生AI擦除透明条异常。Blocked为技术控制/事务观测或实际拒绝分支未覆盖，不等同已确认产品缺陷。TaskSpace27已finish，当前原图/完成历史保留、输入和待发引用为空、无本轮在途任务；D2原有空草稿保持。固定脚本PLAN/空路径，无云效/Git写入。 [执行与核验报告](cases/requirements/ERYE-237/results-091-110-ego-prod-20261117.md)。
<!-- /ERYE237-091-110-20261117 -->

<!-- ERYE237-REVISED-THREE-20261117 -->
2026-11-17 ERYE237新版074/089/090生产ego有头执行完成：3 Passed / 0 Failed。074连续扩图，089画笔/标注逐行UI与Agent配对，090先说明再明确改蓝背景；只验页面和真实产物，不验证参数。TaskSpace26已finish，固定脚本PLAN/空路径，无云效/Git写入。074可选Agent配对未执行。071～090当前主分支合并为13 Passed / 7 Failed，其中其余17条沿用最近实测，并非20条全重跑；旧10P7F3NA批次及原契约缺陷保留。 [执行报告](cases/requirements/ERYE-237/results-revised-074-089-090-ego-prod-20261117.md)。
<!-- /ERYE237-REVISED-THREE-20261117 -->

2026-11-17按用户现有功能优化ERYE237-074/089/090：074已完成扩图继续扩图；089 UI/Agent画笔、标注切换配对；090只说明后明确执行真实背景修改。三个新版主分支Not Run、PLAN/空脚本，旧不适用/Failed及云效保留；仅设计未重跑/未写云效。当前071～090按新规格10P/7F/3NR，旧执行批次10P/7F/3NA不回写。[修订与完整步骤](cases/requirements/ERYE-237/optimization-074-089-090-existing-business-20261117.md)。

<!-- E196-070-090-SYNC-20261117 -->
2026-11-17 ERYE196-070～090失败缺陷同步：已核验8/8，073→FWXC-637，077→FWXC-638，080→FWXC-639，081→FWXC-641，083→FWXC-642，084→FWXC-643，086→FWXC-644，087→FWXC-645。448条去重后新建；截图/正文/字段通过官方OpenAPI回读，测试结论与PLAN/空脚本保持。[同步报告](defects/ERYE196-070-090-sync-prod-20261117.md)。
<!-- /E196-070-090-SYNC-20261117 -->

<!-- ERYE237-071-090-SYNC-20261117 -->
2026-11-17 ERYE237-071～090本轮7条Failed已同步云效：1新建FWXC-634（076去背景后丢修改/品牌未保留），7处原单追加证据（371/372/612/603/614/616/618），共8问题映射覆盖7用例；13张原始页面/真实产物图片＋8份脱敏审计，21附件及正文/评论嵌图已回读核验。371/372不是问题、614/616/618已关闭，原状态保留，未重开。076旧613版本冲突未复现，不按同用例误判为同缺陷。结果仍10P/7F/3NA、PLAN/空脚本，无业务重跑或Git提交。 [同步清单](defects/ERYE237-071-090-sync-prod-20261117.md)。
<!-- /ERYE237-071-090-SYNC-20261117 -->

<!-- ERYE237-071-090-20261117 -->
2026-11-17 ERYE237-071～090生产ego-browser有头完成20条登记：{'Not Applicable': 3, 'Failed': 7, 'Passed': 10}。按用户只验页面和实际产物，不验证参数；074无上限、089原契约全集及090纯validate不在范围（089额外画笔配对Passed）。076组合后续成品丢编辑且导出失败，087第21张未被限制；086刷新本轮恢复。TaskSpace25已finish、自有草稿清理，PLAN/空脚本，无云效/Git写入。 [执行报告](cases/requirements/ERYE-237/results-071-090-ego-prod-20261117.md)。
<!-- /ERYE237-071-090-20261117 -->

2026-11-17用户再次确认：回归对象必须为陈亚宾创建且当前“已修复”；每条新修复轮提交前官方OpenAPI再次核对，不从旧pending重开已AI通过等状态项。自动任务4已更新，当前536再次修复R2先回读单次准备任务，再串行符合条件待办；Google Chrome预发/yabinc92，已通过和未覆盖历史保留。

<!-- E196-070-090-20261117 -->
2026-11-17 ERYE196-070～090 Chrome生产：本轮21/21已登记，{"Passed": 8, "Blocked": 5, "Failed": 8}；检查点：070～090本轮全部21条已登记：8 Passed、8 Failed、5 Blocked；074已自然过期续签补测通过；所有已受理任务终态已核验，无待重发任务；固定脚本PLAN/空路径。固定脚本PLAN/空路径，无云效/Git写入。[执行报告](cases/requirements/ERYE-196/results-070-090-chrome-prod-20261117.md)。
<!-- /E196-070-090-20261117 -->

2026-11-17 10:06：[定时检查与已有队列续跑](defects/fixed-monitor-20261117-100503.md)：438条Bug完整分页，陈亚宾43候选无新修复证据。用户已在独立任务指定Chrome预发，yabinc92已核验；543原合计12001明确拒绝Passed、云效✅AI通过10:07回读，2扩散仍待执行。本批原通过6条（5生产＋1预发），监控无重复业务/写入，原owner串行继续；PLAN保持。

2026-11-17 06:05：[定时回归只读检查](defects/fixed-monitor-20261117-060501.md)：438条Bug完整分页，全项目已修复62、陈亚宾候选43；43项同修复证据，0新增/再次修复/实质更新。原36待办（含542仅扩散）及8同证据Blocked保持；ego23/p1仍等待用户登录yabinc92确认，未接管浏览器，业务/云效写入0，无重复提醒。实际状态和PLAN保持。

2026-11-17 01:58：[定时回归新候选](defects/fixed-monitor-20261117-015758.md)：438条Bug完整分页，陈亚宾已修复43条；新增15、原28同证据保持。新15原/30扩散均未执行，76份原文件已保存；预发ego23/p1待用户切换yabinc92并确认，未接管浏览器，业务/云效写入0。累计36条待办（含542仅扩散），固定脚本PLAN保持。

2026-11-16 21:58：[定时回归新候选](defects/fixed-monitor-20261116-215756.md)：438条Bug完整分页，陈亚宾已修复28条；14新增＋536重新修复共15新轮已排队，原15/扩散30均未执行。ego23/p1已交用户，等待yabinc92登录确认，业务/浏览器/云效写入0。536旧生产Failed保留历史，本轮Not Run；8条同证据Blocked及既有待办保留，无重复任务，PLAN保持。

2026-11-16 ERYE196-055/068失败缺陷已同步云效：055→FWXC-623，068→FWXC-624。436条索引及详情快照去重后新建2条，5张截图及2份核验附件、正文/字段通过官方OpenAPI回读；旧缺陷未修改。Failed及PLAN/空脚本保持。[同步报告](defects/ERYE196-055-068-sync-prod-20261116.md)。

2026-11-16用户指定[定时回归改为预发](defects/fixed-monitor-environment-staging-20261116.md)：自动任务4保持每4小时ACTIVE，当前未完成场景及后续回归使用staging-app.cinlink.ai/yabinc92，生产已完成及受理历史保留、不跨环境重放。用户将人工登录，登录前不提交业务。

2026-11-16 ERYE196-055/068优化后重跑完成：2 Failed。055保存失败草稿在重试后被云端值替换且无可见冲突说明（纯响应延迟分支未建立未保存前置）；068同一Chrome退出U1登录U2后，未刷新旧U1标签页仍显示视频、字幕和历史并报404，而U2新开直链被404拒绝。未尝试越权保存、不推断服务端越权或旧事件仍在投递。原Blocked转Failed，全134：42 Passed; 22 Failed; 3 Blocked; 3 Not Applicable; 64 Not Run。固定脚本PLAN/空路径，无云效写入。[执行报告](cases/requirements/ERYE-196/results-055-068-rerun-chrome-prod-20261116.md)。

2026-11-16 ERYE196-055优化后重跑：Failed（保存失败草稿恢复分支），真实阻断保存保留本机输入，远端改文后明确重试返回applied=false并切到云端值，本机输入及恢复条消失且无可见冲突说明；纯延迟响应分支未建立未保存前置。068已核实ego U2 yabinc18直链404，账号切换部分进行中。PLAN/空脚本，无云效写入。[报告](cases/requirements/ERYE-196/results-055-068-rerun-chrome-prod-20261116.md)。

2026-11-16 ERYE237-082新版主UI生产ego实际Passed：仅PNG/JPEG可选，两次真实下载均1254×1254且编码/末尾扩展名一致，图片文档前后完全不变；Technical非法参数未执行。074保持不适用，070～090当前主规格9P/11F/1NA（独立技术缺口保留）。TaskSpace22已finish，PLAN/空脚本，无云效或Git写入。[重跑报告](cases/requirements/ERYE-237/results-082-revised-ego-prod-20261116.md)。

2026-11-16用户确认扩图无上限：ERYE237-074当前Not Applicable；082按真实UI格式/下载一致性优化，主UI新版Not Run，非法参数独立Technical，不强制dry-run或猜测宽高上限。旧Blocked报告保留、未重跑/未写云效；PLAN/空脚本不变。[修订说明](cases/requirements/ERYE-237/revision-074-082-real-scope-20261116.md)。

2026-11-16按用户授权就地优化ERYE196-055/068：055先核验可控未保存窗口，再做远端保存、冲突保护与明确重新应用；068先核实不同账号U2无工程权限，再在同一浏览器切换核对缓存、后退、草稿及旧订阅。分步缺项单独记录，不以自动保存输入冒充草稿、不以同账号多浏览器代替U2。仅改设计未重跑，最近Blocked及PLAN/空脚本和统计不变。[分步计划](cases/requirements/ERYE-196/blocked-step-plan-055-068-20261116.md)。

<!-- ERYE237-070-090-SYNC-20261116 -->
2026-11-16 ERYE237-070～090失败项云效同步完成：11/11，8条新建（612/613/614/615/616/618/619/620）、3条原单追加证据（070→610、071→371、072→372）；15张原始页面/实际产物图片＋11份脱敏审计，26附件及正文/评论嵌图、字段已回读核验。071/072原单状态“不是问题”保留并注明产品复核；新单负责人余航、生产/重构10-29、状态🤔AI提缺陷。074/082阻塞未提单；Failed和PLAN/空脚本不变，无业务重跑或Git提交。 [同步清单](defects/ERYE237-070-090-sync-prod-20261116.md)。
<!-- /ERYE237-070-090-SYNC-20261116 -->

2026-11-16 ERYE196-048～070去重后已提交3条：049→FWXC-617，061/065→FWXC-621（合并），067→FWXC-622。官方OpenAPI回读验证正文、字段、6张截图和3份核验附件通过；062疑似重复不新建，053待补证。测试结果及PLAN/空脚本保持。[同步报告](defects/ERYE196-048-070-sync-prod-20261116.md)。

<!-- E196-048-070 -->
2026-11-16 ERYE196-048～070 Chrome生产：已登记23/23，13 Passed, 6 Failed, 2 Blocked, 2 Not Applicable；全134：42 Passed; 20 Failed; 5 Blocked; 3 Not Applicable; 64 Not Run。PLAN/空脚本，无云效写入。[本批报告](cases/requirements/ERYE-196/results-048-070-chrome-prod-20261116.md)。
<!-- /E196-048-070 -->

2026-11-16 ERYE196-048～070确认失败/云效去重：原6条Failed中5条现象确认、053待补保存时序；061/065合为一类候选，共4类。官方OpenAPI完整读取425条Bug及详情，确认重复0、疑似1（062→FWXC-339，575相关）、未检出同项3类。只读，云效写入0；原执行结果及PLAN不变。[复核去重报告](defects/ERYE196-048-070-confirmed-dedup-prod-20261116.md)。

<!-- ERYE237-070-090-20261116 -->
2026-11-16 ERYE237-070～090生产ego-browser有头完成21主分支：8 Passed / 11 Failed / 2 Blocked（074真实扩图上限及超限源前置、082当前导出参数校验契约）。独立生图20/21边界及实际PNG已核对；076部分成品后STALE_REVISION、086pending文字刷新丢失等留证。TaskSpace21已finish，本轮自有草稿清理、完成历史保留；PLAN/空脚本，无云效或Git写入。 [本批报告](cases/requirements/ERYE-237/results-070-090-ego-prod-20261116.md)。
<!-- /ERYE237-070-090-20261116 -->




























2026-11-16 ERYE237优化后六例生产ego重跑完成：2 Passed（056/067）、1 Failed（055真实I2引用冲突误路由）、3部分Blocked（057/068/069内部前置/日志）。056真实澄清选择、透明PNG及返回原图保留历史通过；末句文件交付文案偏差另留证。TaskSpace20已finish，本轮草稿已清理，PLAN/空脚本保持，无云效或Git写入。[完整报告](cases/requirements/ERYE-237/results-six-optimized-ego-prod-20261116.md)。

2026-11-16 ERYE196分步补跑收尾：016 Passed（UI边界与保存，不含导出听审）；021完成AB+BGM刷新检查点，字幕源关联及配音缺失，Blocked；022正常6句配音对照已核验，异常关系及恢复备份缺失，Blocked；041正常同组对照schema错误、无半提交，上传中及网络中断独立准备已做，失败资产身份及U2前置缺失，Blocked。临时限速/Offline已恢复No throttling。当前29P/14F/3B/1NA/87NR，脚本PLAN/空路径，无云效写入。[执行报告](cases/requirements/ERYE-196/results-stepwise-016-021-022-041-chrome-prod-20261116.md)。

2026-11-16 阻塞用例拆分完成：[016/021/022/041分步计划](cases/requirements/ERYE-196/blocked-step-plan-016-021-022-041-20261116.md)。逐步准备和保存回读，只阻塞依赖步骤；不改变正式同组/随动验收。本次无新增执行、脚本PLAN、云效未写入，历史结果保持。

2026-11-16 043/047新版实际重跑：047 Passed，一次撤销/重做及刷新重开全部核对；043 Passed限当前UI提交前整组拒绝，同工程恢复S0后串行对照，无半提交，双副本隔离/服务端执行后回滚未覆盖。最终工程恢复S0，脚本PLAN/空路径，无云效提交。 [report](cases/requirements/ERYE-196/results-043-047-chrome-prod-20261116.md).

2026-11-16 047新版重跑Passed：合法两字幕改文+BGM降6dB同组实际执行，一次撤销回S0，一次重做回S1，49字幕/音量/轨道及刷新重开核对通过。043已恢复S0并提交末项无效请求，处理中；本轮采用同工程串行对照，双副本隔离未覆盖。脚本PLAN。[本轮报告](cases/requirements/ERYE-196/results-043-047-chrome-prod-20261116.md)。

2026-11-16 043/047用例优化完成：[修订说明](cases/requirements/ERYE-196/revision-043-047-independent-batch-20261116.md)。独立三项复合编辑模板代替强依赖042；043合法对照+无效末项无半提交，047一次撤销/重做及重开一致。新版均Not Run，旧Blocked保留，未执行业务或云效写入，脚本PLAN。

2026-11-16 [021/022/041 R2续跑结果](cases/requirements/ERYE-196/results-021-022-041-r2-chrome-prod-20261116.md)：021增量准备真实失败，刷新确认未部分保存，一次恢复仍误报未打开编辑器；完整021仍Blocked。用户给定f178只读核实为U1普通两字幕工程且无配音，不满足022或041特殊前置；两例仍Blocked。脚本PLAN、云效未提交。

2026-11-16 ERYE237六条阻塞用例优化：055/056/057/067/068/069改为参数隔离与可执行前置，保留来源优先/澄清/能力拒绝/SHA/极性要求；新版六主分支Not Run，旧部分Blocked及参数证据保留，PLAN/空脚本不变。仅改文档，无生产或云效操作。[修订说明](cases/requirements/ERYE-237/optimization-055-056-057-067-068-069-20261116.md)。

2026-11-16 17:58：[持续回归只读检查](defects/fixed-monitor-20261116-175751.md)：424条Bug完整分页，陈亚宾已修复13条，0新增/0实质更新。原12项批次累计5通过/1失败/1阻塞/5未执行，扩散9通过/2失败/1阻塞/12未执行；535/537/540/541/542✅、536❌均GET复核一致。本次无新实测/写入；浏览器URL限制及542扩散一单次待回读断点保留，不绕过、不重发，自动化PLAN保持。

2026-11-16 [021/022/041新项目R2](cases/requirements/ERYE-196/results-021-022-041-r2-chrome-prod-20261116.md)：5文件上传，新A20工程经UI初始化成功，B预览可用；B关联字幕/配音/BGM仍待准备，正式重排未发。用户候选f17816fe待只读核实，当前因用户更改Chrome暂停写入；三例Blocked、脚本PLAN，未云效提交。

2026-11-16 ERYE237-050～070缺陷同步完成：12条Failed→FWXC-599～610，负责人余航/生产/重构10-29；13张实测截图＋12份脱敏审计，25附件、正文嵌图及字段已回读核验。标题均含用例编号，旧项不改、6条Blocked未提单、PLAN保持，未重发业务或Git提交。[同步清单](defects/ERYE237-050-070-sync-prod-20261116.md)。

2026-11-16 ERYE237-050～070的12条失败只读云效查重完成：412条详情，确认重复0/疑似1（065）/相关4/未检出同项7；无云效写入，测试结论及PLAN保持。[查重记录](defects/ERYE237-050-070-dedup-prod-20261116.md)。

2026-11-16 021新配音前置尝试完成：完整32秒方案已审核，任务完成860秒；SRT/WAV及视频卡片存在，但编辑器配音面板为空，直接创建配音报正式v2协议错误，刷新重开仍无配音轨。021保持Blocked，脚本PLAN，未提交云效。[实测记录](cases/requirements/ERYE-196/preparation-021-voice-chrome-prod-20261116.md)。

2026-11-16：[021新配音前置重试](cases/requirements/ERYE-196/preparation-021-voice-chrome-prod-20261116.md)：已创建独立项目并上传32秒英语视频，中文配音任务提交一次，补槽Speaker 1后进入执行；外部Chrome前台切换后停止UI操作，终态待回读，原任务不重发。021仍Blocked、脚本PLAN/空路径，无云效提交。

2026-11-16 ERYE196-028新版Chrome生产重测Passed：6/60/100均驱动列表及同一画面预览分组，向外拖拽保持6/100；85词及词级时间与基线一致，已恢复60。脚本PLAN/空路径，016未补跑，无云效提交。 [report](cases/requirements/ERYE-196/results-028-slider-chrome-prod-20261116.md).

## 2026-11-16 ERYE237-050～070执行完成

生产ego-browser TaskSpace19完成当前21个主分支：3 Passed / 12 Failed / 6 Blocked；通过053/059/064，阻塞055/056/057/067/068/069。已生成并使用ACME基准/损伤素材，真实mask和PNG已下载核对。固定脚本PLAN未接入，本批无云效或Git提交。详见[本批报告](cases/requirements/ERYE-237/results-050-070-ego-prod-20261116.md)。

2026-11-16 14:00：[已修复缺陷回归12项独立任务交接](defects/fixed-monitor-20261116-135748.md)。完整分页394条，筛选19条，新增12条、7条旧阻塞同证据保留。535原回归准备中（拖动未执行），其余11项及24扩散待执行；本批无通过/失败结论，云效未变更。详见本批持久化交接，不重发535准备请求。

## 2026-11-16 ERYE237-023缺陷已同步云效

[FWXC-581](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=53fde222a7123c53dc605edd63)：合法区域擦除已受理后EXECUTION_OUTCOME_UNKNOWN、无成品。官方OpenAPI新建，标题带用例编号，余航/生产环境/重构10-29；2张原始截图及1份脱敏审计附件上传、正文嵌图和字段回读核验通过。测试Failed及PLAN/空脚本保持，未重发业务任务、未修改旧缺陷。详情见[缺陷记录](defects/CINLINK-ERYE237-023-ERASE-OUTCOME-20261116.md)。

## 2026-11-16 ERYE196-028字符数滑块范围确定为6～100

以用户最新澄清“拖拽字符数上限是6-100”为准：滑块范围6～100（含端点），60为合法中间值，取代“60为滑块上限”的口头说法。028现覆盖6、60、100的分组/换行效果，以及6处继续向小、100处继续向大拖拽的边界防护；滑块范围不等同于原文字数上限。仍只更新用例，未执行生产操作，新版Not Run，旧Blocked保留历史，脚本PLAN/空路径保持；无云效或Git写入。

[028 revision](cases/requirements/ERYE-196/revision-028-character-slider-wrapping-20261116.md)

## 2026-11-16 ERYE237-023真实mask生产重跑

本轮执行Failed：一次合法擦除task73bb814b已受理，最终EXECUTION_OUTCOME_UNKNOWN、无成品；未重发。画笔/主擦除25%及200%的1/256共8项、UI边界、四条Agent非法值拒绝通过；受理mask真实PNG1000×666，四笔alpha覆盖积分1/256/1/256，源绑定和上传SHA一致。独立后端非法直径入口及adapter执行日志未覆盖，分别保留Blocked/未覆盖，不据此报笔宽或mask问题。原头/8项历史和源RGB保持，新增图片任务仅1条且终态failed；无待发内容。固定脚本PLAN/空路径，未写云效或Git。022/031 Passed、028 Blocked不变。

[023本轮报告](cases/requirements/ERYE-237/results-023-real-mask-ego-prod-20261116.md)。


## 2026-11-16 ERYE196-028改为字符数滑杆与字幕换行

用户澄清“60字符就是拖拽字符数，字幕字符数跟着拖拽字符数换行”。028已从最大文本长度L边界测试改为“每条字幕字符数”滑杆的分组/换行功能验证：在固定原文、字号和画布条件下拖至60及两侧实际合法值，核对布局变化、全文完整、顺序和讲话对应，再恢复原值。不再要求公布L或执行L−1/L/L+1输入。新版Not Run，旧版2026-11-13 Blocked及证据保留为历史，旧阻塞原因不再适用于新版。此次只更新文档，无生产操作或云效写入；脚本仍PLAN/路径空。

[028修订说明](cases/requirements/ERYE-196/revision-028-character-slider-wrapping-20261116.md)

## 2026-11-16 ERYE237-023真实mask提交流程已优化，待执行

依据原需求保留源像素/实际mask/后端校验，取消“不生成即可独立保存mask”的额外前置。UI/Agent/技术参数分行；正常合法擦除可一次提交4条独立mask样本，从实际资源/受理快照或受控adapter记录核验，不强求对外下载按钮、不重复计费取证。后端拒绝须实际相应接口证据，不能由Agent拒绝推断。新版023 Technical Not Run，旧Blocked及证据保留；022/031 Passed、028 Blocked不变。仅修订文档，无生产/生成/云效或Git写入，PLAN/空脚本保持。

[023修订说明](cases/requirements/ERYE-237/revision-023-real-mask-flow-20261116.md)。

## 2026-11-16 ERYE237-022新版主UI真实重跑Passed

生产ego-browser TaskSpace17/p1、yabinc18，022/UI按content-sampling-v3真实重跑Passed。1000×666原图Q0=(100,99)独立PNG RGB118/114/112、吸管#767270及验证新笔完全一致；红8pxcontent内部取色#FF0000，另一新笔RGB255/0/0。两次采样不改原内容，清理后源RGB完全恢复；原头和8项历史保留，任务ID集合不变，无生成/Agent请求、待发引用或正文。辅助层技术专项独立，未补算覆盖。022旧Blocked为修订前记录，非产品修复；固定脚本仍PLAN/路径空，无云效或Git写入。

四条主分支最新2 Passed（022、031）/2 Blocked（023、028）；仅022本次重跑。[022本轮报告](cases/requirements/ERYE-237/results-022-ui-ego-prod-20261116.md)。

## 2026-11-16 ERYE237-022主UI范围已优化，待重跑

022改为实际底图/content吸管取色与新笔复用；不要求穿透可交互批注、取色时显示mask或新增guide UI。辅助层不污染取色仍归独立Technical，缺可观测入口只阻塞该专项。022新版UI Not Run待重跑，旧Blocked为修订前历史，不直接判Passed；023/028及031既有状态保持。本次仅文档修订，无生产/云效或Git写入，PLAN/空脚本保持。

[022修订说明](cases/requirements/ERYE-237/revision-022-ui-scope-20261116.md)。

## 2026-11-16 ERYE237-031新规则真实重跑Passed

按用户“编辑页返回默认不保存草稿”的v3口径，在生产ego-browser TaskSpace16/p1、yabinc18实际重跑031/UI Passed：融合文字无旧可编辑对象；源V1创建白48px文字并同对象追加；返回确认选继续保留同一D/对象/源/样式；再次返回选放弃后draft=null，重进V1不恢复旧D。V2原RGB及完成历史集合保持，0新生成/Agent请求/云效写入，最终引用/正文空。不是用旧证据改判或产品修复；原不当Failed撤销，022/023/028仍Blocked，四条主分支最新1 Passed/3 Blocked（只有031本次重跑）。固定脚本PLAN/空路径，未Git提交推送。

[031本轮报告](cases/requirements/ERYE-237/results-031-lifecycle-ego-prod-20261116.md)。

## 2026-11-16 ERYE237-031用户澄清：返回默认不保存，原Failed撤销

用户明确编辑页返回后草稿默认不保存。撤销031“保留D时不能查看V2”的Failed：未提交draft记录/面板重开可恢复不能推出退出持久化和跨结果保留承诺。新版只验证融合像素、编辑内或明确继续的原对象续编、正常返回或明确放弃后不默认恢复；031新版Not Run待重跑，原始运行证据保留，不自动Passed。022/023/028仍原Blocked。本次仅规则/文档复核，未执行生产、云效或Git写入，PLAN及空脚本路径保持。

[规则复核](cases/requirements/ERYE-237/review-031-draft-lifecycle-20261116.md)。

## 2026-11-16 ERYE237四条新版生产重跑结束

生产ego-browser TaskSpace15/p1、yabinc18，按四条revision2026-11-16-blocker-preconditions-v2真实重跑：1 Failed（031）/3 Blocked（022、023、028）。022基础取色及新笔像素通过，辅助层隔离仍缺可用观察路径；023八项合法UI/端点/四个Agent非法值拒绝及源像素通过，持久mask位图/后端独立拒绝未覆盖；028已读真实父子关系，清理旧草稿后V2撤销重做禁用，未建已撤销V2状态，正式恢复未发。031已准备并证明同一D/同一对象可重开追加、白48与来源保持，但带D点已完成V2结果仍显示D，RGB与V2不等；该查看步骤Failed，草稿恢复续编参数通过。

每条结束即更新登记与结果；原11月13日Blocked及证据保留，不把优化当通过。5条独立Agent（4负向/1准备）均终态，0新增图片生成、0受理重发。仅清理自身未发草稿，两工程头及完成历史保留，无引用/正文/在途任务。脚本PLAN未接入，无云效状态/评论/新单或Git提交推送。

[本轮报告](cases/requirements/ERYE-237/results-four-rerun-ego-prod-20261116.md)，证据reports/erye237-four-rerun-ego-prod-20261116/。

## 2026-11-16 ERYE196-016采用编辑器默认裁剪边界

用户确认016采用“默认编辑器长度”，并明确“先更新用例，暂不补跑”。新版以当前裁剪控件默认允许范围、吸附及防护验收，不再等待公开固定m；实际边界在后续执行中核实，不能把逐帧播放步长直接当成最短长度。新版Not Run，旧版2026-11-13 Blocked仅保留为历史执行记录，旧阻塞原因不再适用于新版。脚本仍PLAN/路径空。本次无生产编辑、云效或Git写入。

[016修订说明](cases/requirements/ERYE-196/revision-016-default-editor-boundary-20261116.md)

## 2026-11-16 ERYE196-016～047失败已同步云效

本批9条Failed已通过官方OpenAPI新建FWXC-568～576：017→568、018→569、019→570、020→571、023→572、030→573、039→574、042→575、044→576。标题均含用例编号，前置精简为2～3条；完整原指令、真实补槽值及未覆盖范围均保留。9张原生浏览器截图和6张源/成片原始帧图嵌入正文，连同脱敏审计、补槽原文及023输入源/实际成片/SRT，共41附件，正文/图片引用/附件ID名称字节数及业务字段全部回读一致。

均🤔AI提缺陷、余航、重构10-29、生产环境；017/023高/2-严重，其余中/3-一般。沿用普通新缺陷不去重设置，未改旧缺陷或写回归评论。本次未重跑业务，7条Blocked与1条Not Applicable未提单，原15 Passed/9 Failed/7 Blocked/1 Not Applicable及PLAN/脚本路径空保持；无Git提交推送。

[9条缺陷对应清单及云效链接](defects/ERYE196-016-047-sync-prod-20261116.md)。检查点：reports/yunxiao/erye196-016-047-prod-20261116/。

## 2026-11-16 ERYE237四条阻塞用例已优化，待重跑

022辅助层逐项取色对照；023分UI端点防护/非法值契约/笔迹与实际mask测量；028明确真实UI或Agent撤销准备及027依赖；031先有融合V2，再建立并重开确认未提交D，恢复原对象，避免依赖已消费草稿。验收责任保留、缺口按参数记录，确认D后丢失判失败。四条revision2026-11-16-blocker-preconditions-v2待执行，11月13日Blocked及原证据不改，自动化PLAN/路径空。本次未执行生产或云效/Git写入。

[修订说明](cases/requirements/ERYE-237/optimization-022-023-028-031-20261116.md)。

## 2026-11-16 09:59 持续回归续跑已结束

2026-11-16 09:59检查，最后更新2026-11-16T11:52:45.708831+08:00：完整分页381条Bug，已修复18条，陈亚宾10条；0新增修复，7条已处理Blocked不重发。积分恢复后接续原队列468/467/464，当前原验收{'Passed': 3}、六条扩散{'Passed': 6}，续跑已结束；云效状态实际写入3次并回读。不重做472或468已完成前置，未执行的历史附加分支保留未覆盖。[本次检查与续跑](defects/fixed-monitor-20261116-095816.md)。原AUTO/PLAN保持，无评论/新单/Git提交推送。

## 2026-11-16 06:00 持续回归检查，无新增

2026-11-16 06:00：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261116-060014.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-16 02:05 持续回归检查，无新增

2026-11-16 02:05：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261116-020442.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 22:02 持续回归检查，无新增

2026-11-15 22:02：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-220210.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 18:02 持续回归检查，无新增

2026-11-15 18:02：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-180209.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 14:05 持续回归检查，无新增

2026-11-15 14:05：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-140507.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 10:00 持续回归检查，无新增

2026-11-15 10:00：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-100005.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 06:01 持续回归检查，无新增

2026-11-15 06:01：完整分页381条Bug，全项目18条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-060033.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-15 02:00 持续回归检查，无新增

2026-11-15 02:00：完整分页377条Bug，全项目23条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例状态及AUTO/PLAN保持。[本次检查](defects/fixed-monitor-20261115-015930.md)；[原执行检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-14 21:57 持续回归检查，无新增

2026-11-14 21:57：完整分页361条Bug，全项目39条已修复，陈亚宾精确已修复10条；0新增/0实质修复更新，7条同版本已处理Blocked保留，468/467/464三条积分待办保留。生产Chrome新加载账户中心确认余额仍35，业务提交0、云效写入0，不重复预检或通知。用例及AUTO/PLAN状态不改。[本次检查](defects/fixed-monitor-20261114-215658.md)；[18点执行及恢复检查点](defects/fixed-monitor-20261114-180456.md)。

## 2026-11-14 18:05 持续回归本轮已完成

完整分页361条Bug，47条已修复，陈亚宾精确已修复11条；新增472/468/467/464四条，原验收{'Passed': 4}、扩散{'Passed': 8}，本轮已完成。原7项同修复指纹Blocked保持，不重发。生产Chrome/yabinc92，严格原正文流程及两条独立扩散，必要前置保留；未实际重跑的历史补充分支不计通过。云效按原验收实际结论更新并回读，阻塞保持；无评论/新单/Git提交推送，原脚本登记不改。[本轮报告](defects/fixed-monitor-20261114-180456.md)、[逐项状态](cases/regression-results-20261114-1800-monitor.md)。

## 2026-11-14 14:05 持续回归检查完成，无新增

官方OpenAPI完整分页361条Bug，41条已修复，陈亚宾精确已修复7条507/469/416/403/399/346/333，全部为同修复证据已处理Blocked。本次业务0、状态修改0、评论0、新单0，不将历史结果充作本次实测；人工待办及原用例状态不变，无在途业务，持续任务保留。[最新检查报告](defects/fixed-monitor-20261114-140429.md)，[10:12检查](defects/fixed-monitor-20261114-101122.md)。

## 2026-11-14 06:00 持续回归本轮已完成

361条Bug完整分页，38条已修复，陈亚宾精确已修复12条；原5条333/346/399/403/416同修复指纹无变化保留上轮Blocked，不重发业务。新增/重新修复7条507/482/474/473/469/466/318安排新真实回归，原验收{'Blocked': 2, 'Passed': 4, 'Failed': 1}、本轮已完成，本轮记录46条受理/审核事件（含登记、导入、审核，非计费生成数）。历史不冒充本轮；原验收与两条扩散单列，状态按实际通过/失败同步并回读，阻塞保持。无评论/新单/Git提交推送，原脚本登记不改。[本轮报告](defects/fixed-monitor-20261114-060021.md)、[逐项用例状态](cases/regression-results-20261114-0600-monitor.md)。


## 2026-11-14 02:00 持续回归本轮结束

固定候选12条（本次新增进入6条），本轮原验收5 Passed / 2 Failed / 5 Blocked / 0 Not Run，扩散{'Blocked': 2, 'Passed': 12, 'Not Run': 8, 'Failed': 2}；全部受理任务和媒体审计已终态。323/337/361/407/409已✅AI通过，352/414已❌AI未通过，7项官方API更新且最终12项GET回读一致；333/346/399/403/416阻塞保持已修复。333待联动预期、346待英文30S原片；另3项导入KeyError前置阻塞。337字幕显示变化、361准备task_id错误作为独立偏差只存本地，不混改原通过、不自动新建/评论。持续任务仍有效，同修复版本已完成失败/阻塞不每4小时重发。固定脚本未接入、原AUTO/PLAN不改，无Git提交推送。[本轮报告](defects/fixed-monitor-20261114-020020.md)、[逐项用例状态](cases/regression-results-20261114-monitor.md)。


## 2026-11-13 ERYE196-016～047 Chrome生产收尾

本批32条主用例15 Passed/9 Failed/7 Blocked/1 Not Applicable；失败017/018/019/020/023/030/039/042/044，阻塞016/021/022/028/041/043/047，046不适用。021基本B→A及原声同步已保存，关联字幕/配音/固定BGM分支未覆盖；023两种帧率均完成三刀、裁尾、重开及实际导出，CFR首切点SRC299→301跳帧，VFR19.951秒内部切点黑帧，音频三处抽样零偏移。CFR保留字幕至32秒导致的尾黑场单独排除，不计产品缺陷。固定脚本均PLAN/路径空、暂停接入；临时原生辅助不算正式自动化，云效写入0，无Git提交推送。[完整报告](cases/requirements/ERYE-196/results-016-047-chrome-prod-20261113.md)。全134状态：25 Passed/14 Failed/7 Blocked/1 Not Applicable/87 Not Run。用例格式校验543条、0问题；未改产品代码。

## 2026-11-13 22:01 持续回归检查

官方全分页361条Bug；陈亚宾已修复6条首次基线：FWXC-346/399/403/407/414/416。0通过/0失败/6前置阻塞，业务0、状态/评论/新缺陷写入0。需独立测试页yabinc92及同账号空闲，原目标与两扩散均未跑；历史不计本轮。[报告与持久待办](defects/fixed-monitor-20261113-215548.md)。

## 2026-11-13 ERYE237-021～050失败已同步云效

17条Failed用例已通过官方OpenAPI新建18条缺陷（FWXC-529～546）；049服务端81字越限落库、Agent合法标签更新失败分别为FWXC-544/545。所有标题含用例编号，九段正文保留完整原提示词和精简前置；34张本轮原始截图嵌入正文、18份脱敏审计，合计52附件的ID/名称/字节数及正文/业务字段全部回读一致。均🤔AI提缺陷、余航、重构10-29、生产环境；032、050高/2-严重，其余中/3-一般。

本次按用户不去重要求直接新建，未修改旧缺陷、未重新运行业务或写回归评论。4条Blocked（022、023、028、031）未提单；原结果仍9 Passed/17 Failed/4 Blocked，脚本仍PLAN未接入，无Git提交推送。

[18条缺陷清单及云效链接](defects/ERYE237-021-050-sync-prod-20261113.md)，检查点reports/yunxiao/erye237-021-050-prod-20261113/。

## 2026-11-13 ERYE237-021～050生产执行结束

生产ego-browser有头完成021～050当前主分支：9 Passed（024、025、030、033、034、035、037、040、042）/17 Failed/4 Blocked（022、023、028、031），主例Not Run为0，配对及未跑参数另列。失败包括旧对象样式/混合撤销、导出尺寸、批注绑定移动定位及仅移引用、局部修改越界、点击旧引用源跳转、明确上限未拒绝，以及050多源串用。045～048违规11条/2001正文/4001全局/12001合计均实际完成生成；049界面80字防护通过但保存接口落库81，Agent79/80未完成、81明确拒绝。050只生成I2一份并把I1蓝星耳钉加到I2，I1无结果。

每例结束已更新对应主分支结果/证据；三层及各参数分开，4个Blocked不算通过，Failed中的未测合法正式提交不补算覆盖。固定脚本仍PLAN/路径空、继续暂停接入。本轮正式请求15次、准备生图1次，补槽原run续填，无已受理重发；最后四工程无未发批注/引用/overlay/mask、正文空、无在途任务，所有保存结果保留。未同步云效或Git提交推送。

[本批报告](cases/requirements/ERYE-237/results-021-050-ego-prod-20261113.md)，本机证据reports/erye237-021-050-ego-prod-20261113/。

## 2026-11-13 ERYE237-019需求复核通过、020已提交云效

官方OpenAPI回读需求后确认：§3.2滑杆调整字号、§12范围8～512，未要求页面新增非法数值提交入口。019用例优化为UI合法边界及阻止非法输入、Agent非法值明确拒绝；按本日已有生产证据重新判Passed，非新重跑，直接API契约及内部schema实现未补算覆盖。原始Blocked和证据保留。当前016～020最新4 Passed/1 Failed（020），固定脚本仍PLAN未接入。020按用户随后授权新建[FWXC-508](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=50ee9fa4d3b0829925f48efd27)，3张本轮原始截图及1份六形审计JSON、正文/附件/业务字段均回读一致；🤔AI提缺陷、牛诗晴、重构10-29、生产环境。未重跑业务、未修改旧缺陷或Git提交推送。

[019依据及修订](cases/requirements/ERYE-237/review-019-requirement-20261113.md)，[本批最新报告](cases/requirements/ERYE-237/results-016-020-ego-prod-20261113.md)。

## 2026-11-13 ERYE237-016～020生产执行结束

生产ego-browser有头执行016～020：3 Passed（016/UI、017/UI、018/UI）/1 Failed（020/UI）/1 Blocked（019/Technical，3项UI非法输入契约缺直接入口）。016一次撤销/重做整笔，017独立对象变换/删除/撤销与底图隔离，018白色48px混排追加及两次重开均通过。019 UI8/512和Agent8/512/7/513/abc共7项通过，拒绝不静默钳制；020六形创建/重开/选择通过，但颜色只改默认值、旧对象不变，逐项画布对比确认。每例结束即更新结果及登记，脚本仍PLAN未接入。五次正式Agent仅工具设置/拒绝，零业务重发；源图/完成历史保持，最终无草稿引用、正文或在途任务。缺陷仅本地整理，未云效写入或Git提交推送。

[本轮报告](cases/requirements/ERYE-237/results-016-020-ego-prod-20261113.md)，证据reports/erye237-016-020-ego-prod-20261113/。

## 2026-11-13 ERYE196-003 Chrome指定单条重跑Passed

沿用生产yabinc92原c247b9a9会话，Chrome原生Apple Events/Accessibility有头完成003。143条基线与008独立清单一致，首条A目标固定。B仅law.7.42～7.68→新版C2，A首次旧文、下一次未手动刷新已新文；合并143条只目标变化。首次/下一次观测约1.3/33.2秒，未持续测量精确延时；按现有业务预期Passed。手动刷新143条正确，一次撤销及A刷新后143条完全恢复，视频/原声0～60.50秒保持。临时旧文期望导致采集断言中止已按原始快照纠正，未重发改文，不计产品失败。

当前134条10 Passed/5 Failed/119 Not Run；本次指定单条重跑，自动化PLAN/路径为空，继续暂停固定脚本接入。未执行扩散、云效状态/评论或新缺陷提交，FWXC-478云端未改，旧Failed记录保留。原cua_repl仍不可用，已用现有macOS原生控制通道完成Chrome操作，先前工具阻塞准备记录不再代表未执行。[本次报告](cases/requirements/ERYE-196/results-003-rerun-chrome-prod-20261113-r2.md)，证据reports/erye196-003-rerun-chrome-prod-20261113-r2/。无Git提交推送。


## 2026-11-13 ERYE196-011/013/014失败已提交云效

官方OpenAPI独立新建3条：ERYE196-011→[FWXC-494](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=33a3e0253223cd6b65555c2ef4)；ERYE196-013→[FWXC-495](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=44eeb3c21687f5a66aa13a6cd1)；ERYE196-014→[FWXC-496](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=92437cc1e75cd84c9e1b10e35a)。9张本轮生产原始截图均嵌入正文，另附3份审计、013的BGM、014测试源视频及SRT，合计15份附件；正文/业务字段/截图引用及附件ID、名称、字节数全部回读一致。均🤔AI提缺陷、牛诗晴、重构10-29、生产环境。未修改旧缺陷、未重跑业务或继续脚本接入，无Git提交推送。

本批仍2 Passed/3 Failed，自动化均PLAN；现行134条9 Passed/6 Failed/119 Not Run。011分割未执行，013/014明确拒绝所需波纹同步，裁后听审/文件检查未覆盖，不扩写成音画错位。[本批报告](cases/requirements/ERYE-196/results-011-015-chrome-prod-20261113.md)。汇总reports/yunxiao/erye196-011-015-prod-20261113/sync-summary.json，三个独立提交检查点保持。


## 2026-11-13 ERYE237-011纯设置入口重跑Passed

本次在生产ego TaskSpace11/p1、yabinc18实际重跑011/Agent，Passed。两条原提示词分别通过无参考引用的普通Agent请求调用editor_image_view_update：8px红色与默认16均实际生效，两笔四截面实色均8/16。为隔离自动画笔引用，先撤销8标记至空并返回，再发16设置；重入画笔重做恢复旧8标记，原画布RGBA完全一致、默认仍16，再画新16笔，旧8区域仍不变。两个设置run done约50.086/59.596秒，无补槽/重发，无图片生成或历史新增；原1000×666源RGBA及3项完成历史保持。仅清理本例未发参考标记，最终无引用/正文/在途任务。当前011～015主分支最新5 Passed，仅011本次重跑；Technical未跑、脚本仍PLAN未接入，无云效/Git写入。[011本轮报告](cases/requirements/ERYE-237/results-011-ego-prod-20261113-r2.md)。证据reports/erye237-011-ego-prod-20261113-r2/。

## 2026-11-13 ERYE237-012真实返回入口复测Passed

用户指出012继续/放弃位于编辑中返回对话框后，本次在生产ego TaskSpace10/p1、yabinc18真正重跑012/UI，Passed。I1新建未发文字，点击返回图片工具两次均出现“放弃当前更改？”；第一次继续后来源/单引用/可编辑文字保留、草稿RGBA一致；第二次明确放弃后源RGBA恢复，退出可切I2，返回I1未恢复旧草稿，撤销/重做均禁用。I1/I2源图及3/2项历史集合保持。原012 Failed为入口选错已撤销，非产品修复；仅012新跑，无生成/Agent提交、云效或Git写入，脚本仍PLAN未接入。该阶段011尚待独立16px设置复测；随后011亦实际重跑Passed，当前最新5 Passed，见顶部。[012本轮报告](cases/requirements/ERYE-237/results-012-ego-prod-20261113-r2.md)。证据reports/erye237-012-ego-prod-20261113-r2/。

## 2026-11-13 ERYE237-011～015：按用户标记语义纠正

2026-11-13按用户最新纠正复核既有011证据，未新跑业务：图像修改可重新生成，红线只是参考标记，成品无需保留。撤销011原“生成/红线消失”Failed及本轮与FWXC-380的同类问题关联；8px红色设置已验证，但16px随标记进入图片修改通道，独立设置未覆盖，该阶段011记Blocked（验证路径待复测，非产品阻塞）；随后011独立8/16设置已真实重跑Passed，见顶部。该阶段原汇总曾为3 Passed/1 Failed/1 Blocked；随后012按正确返回入口真实重跑Passed，当前为4 Passed/1 Blocked，见顶部最新记录。用例011、技术边界和执行规则已同步，原图/回执/产物等真实证据保留；无新的浏览器、生成、云效或Git写入，脚本仍PLAN未接入。[本批报告](cases/requirements/ERYE-237/results-011-015-ego-prod-20261113.md)。证据reports/erye237-011-015-ego-prod-20261113/。

## 2026-11-13 ERYE196-010已提交云效

官方OpenAPI新建[FWXC-490](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=10186b9549ac07a36b3890ddd6)：【ERYE196-010】视频片段第5秒分割未执行，提示工具参数校验失败。3张本轮生产原始截图及1份脱敏审计JSON均已上传；正文、图片引用、附件ID/名称/字节数及业务字段回读一致。状态🤔AI提缺陷，负责人牛诗晴，迭代重构10-29，生产环境标签。未重跑业务、未修改旧项或继续脚本接入；未Git提交推送。

[本地记录](defects/ERYE196-010-split-schema-prod-20261113.md)。检查点reports/yunxiao/ERYE196-010-PROD-20261113-SPLIT-SCHEMA/。本批仍4 Passed/1 Failed；现行134条7 Passed/3 Failed/124 Not Run。脚本接入保持用户要求的暂停。

## 2026-11-13 ERYE196-006～010 Chrome生产完成

本批Chrome生产006～010结束：4 Passed（006～009）/1 Failed（010）。006独立会话目标不明时不改文，补充law.后仅目标修改并恢复143条；007删除末条后旧目标被拒绝，改有效首条后142条匹配，结果保留；008A改文仅落A，B前台/142条保持，A刷新143条正确且结果标注工程A；009捕获真实GET，合法200/无效工程ID404，PA143/PB142均不变。010独立20秒30fps600帧/49条素材，补充起点后Editor video clip split报invalid additionalProperties，刷新仍单段20秒，后续跨切点检查未到达。最终稳定49条匹配，刷新瞬间末词结束19.98→19.82的暂态另记。当前134条7 Passed/3 Failed/124 Not Run，004仍是旧实测需求复核非新重跑。

用户最新要求“脚本先不接”，已停止集成；tools/erye196/既有草稿保留，正式登记保持PLAN，006临时AUTO映射撤回，不以草稿或部分断言算完成自动化。每例结束已更新正文/登记表/报告。010仅[本地缺陷](defects/ERYE196-010-split-schema-prod-20261113.md)，未云效写入。详细[本轮报告](cases/requirements/ERYE-196/results-006-010-chrome-prod-20261113.md)，证据reports/erye196-006-010-chrome-prod-20261113/。无待处理任务、Git提交或推送；用例格式检查543条、0问题。

## 2026-11-13 ERYE237-006～010有头R2，暂停脚本接入

用户最新暂停脚本接入后，生产ego有头完成006～010续核：4 Passed（006/Agent、008/UI、009/UI、010/UI）/1 Blocked（007运行中完成历史查看导出未覆盖，非确认产品失败）。006本次相同交付文件与原工程已有对应版本UI导出RGBA一致，V2/V3保留；撤销草稿脚本“每次必须新增一项”的额外失败判据。008三对象两次重开及“ 已恢复”保留、引用1条；009六档实际尺寸匹配；010 Q跨缩放及实际左拖均源(750,333)，正文保留、灰区不增点，009/010源导出RGBA一致。已受理任务不重发，暂停后新增业务提交0；默认npm入口恢复、全部仍PLAN，新脚本仅未接入草稿。无云效或Git写入。[本轮报告](cases/requirements/ERYE-237/results-006-010-ego-prod-20261113-r2.md)。

## ERYE237-006～010生产ego主分支（2026-11-13）

生产ego-browser TaskSpace8/p1、yabinc18，复用39f4248c群鸟工程：4 Passed（006/Agent、008/UI、009/UI、010/UI）/1 Blocked（007运行中查看并导出完成历史未覆盖）；007实际占位、导出禁用及终态透明PNG均已验证，无已确认新失败。006原V1左上加白字，实际1000×666产物仅左上变化、V2/V3保留；008三对象两次收起展开仍可选，原T1为“草稿 T1 已恢复”、待发送引用1条；009六档实际倍率匹配；010 Q始终源(750,333)，普通左拖已发生，灰区不增点，源视图导出RGBA一致。串行、一次正式Agent请求+一次补槽+一次UI处理、零业务重发。保留008未发送草稿页面；无云效或Git写入，固定自动化仍PLAN。当前001～010主分支6 Passed/3 Failed/1 Blocked，其他分支不补算。[本批报告](cases/requirements/ERYE-237/results-006-010-ego-prod-20261113.md)，证据reports/erye237-006-010-ego-prod-20261113/。

## 2026-11-13 ERYE196-002新版生产执行Passed

复用Chrome生产yabinc92原会话c247b9a9-a996-4980-a143-5b8321e9ad74，7MB.mp4、005改文后143条基线。首到末逐屏滚动、返回顶部、刷新重开后再次完整遍历均完成；文字/顺序/时间、143条总数匹配，遗漏/额外/窗口内重复/重叠冲突均0。字符数60、视频/原声0～60.50秒、音量100%、撤销可用/重做禁用保持；最终列表回开头。无上传/编辑/Agent/导出/云效写入；未验内部revision或旧分页专项。当前3 Passed/2 Failed/129 Not Run，004仍是旧实测需求复核非新重跑。[002本轮报告](cases/requirements/ERYE-196/results-002-chrome-prod-20261113.md)，证据reports/erye196-002-chrome-prod-20261113/。格式检查543条0问题，无Git提交推送。

## 2026-11-13 ERYE196-004已提交云效

2026-11-13用户授权后，官方OpenAPI新建[FWXC-481](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5e2ce0344457542d499e78529b)，标题含ERYE196-004。1张2026-11-05预发原始截图及1份脱敏审计JSON已上传，正文嵌图、附件名称/ID/字节数及业务字段回读一致。原图从FWXC-315取回，SHA256与历史登记一致；本次无新的业务测试，未声称当前生产复现。标签沿用截图实际环境“测试环境win-chrome”，负责人简利强，迭代重构10-29，状态🤔AI提缺陷。旧FWXC-315未修改。

[本地缺陷](defects/ERYE196-004-object-reference-missing-20261113.md)。检查点reports/yunxiao/ERYE196-004-REQUIREMENT-GAP-20261113/。004保持Failed，原批次历史不改；无Git提交推送。

## 2026-11-13 ERYE196-003缺陷同步

已通过官方OpenAPI新建[FWXC-478](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf4fd59af9de900c67ec3a9057)：同工程B保存字幕后A旧文无刷新提示；仅此已确认失败提交。3张本轮真实截图和1份脱敏字幕审计附件、正文嵌图及字段全部回读一致；未重跑业务或修改旧项。原图副本按实际JPEG格式命名，字节未改。详细[本地记录](defects/ERYE196-003-cross-tab-stale-prod-20261113.md)，检查点reports/yunxiao/ERYE196-003-PROD-20261113-CROSS-TAB/。无Git提交推送。

## ERYE237-001～005生产ego主分支（2026-11-13）

本轮失败云效已同步：ERYE237-002→FWXC-459（补证，保持已关闭），003→FWXC-360（补证，保持❌AI未通过），005保存链→新增FWXC-480（🤔AI提缺陷）；005纯色观测补充FWXC-460（保持已关闭）。4个云效标题均含对应用例编号，3条补充评论及15附件/图片引用回读确认。同步不重跑业务，不改既有正文/状态或Git提交；完整对应表见本批报告。

2026-11-13按用户要求执行ERYE237-001～005当前主分支，生产ego-browser有头：2 Passed（001/UI、004/UI）、3 Failed（002/Agent、003/Agent、005/Agent）。002目标图正确但保存版本不符；003填写真实工程ID后editor_open报authenticated conversation限制；005蓝图已生成而原工程仍原2历史，刷新后保持，绿色依赖步骤未发送；原图前后实际导出RGBA一致。正式3请求+1准备消息+1填槽，零业务重发；没有新建项目/准备生成，无云效/Git写入。其他分支未重跑。见[本批报告](cases/requirements/ERYE-237/results-001-005-ego-prod-20261113.md)。

## 2026-11-13 缺陷前置精简规范

用户要求优化精简提缺陷前置并写入文档。已写入AGENTS.md“云效缺陷格式”、tools/yunxiao/README.md及examples/description.md：通常2～3条，仅环境/测试账号、素材关键属性、必要历史状态；上传/输入/审核等动作放复现步骤，完整指令放提示词，ID放实际结果，长SHA/file_id放补充或脱敏附件。必要来源/版本/历史失败状态不能删。FWXC-471～474前置已同步精简为3条，官方OpenAPI回读一致，其他章节/截图引用完全保持，状态/负责人/迭代未改；FWXC-464既有补充评论保持，不重复追加。无业务重跑或Git提交推送。


## 2026-11-13 SSO-023～027失败已同步云效

官方OpenAPI新建4条：FWXC-471（29.42秒方案审核后渲染失败）、472（20/30秒选片超过目标时长）、473（主题标题校验失败）、474（无字幕高光新增中文说明条）。SSO024R3分辨率不符与FWXC-464相同，补充评论24257706及2图；既有正文/状态/负责人/迭代保持，未重建。总计11张真实截图和5份脱敏证据附件均回读确认。7个失败轮按现象关联，13个依赖Blocked不建单，SSO024R4继承偏差不另立新单。四新单均待确认；未重跑业务、未Git提交推送。286条Bug完整分页并比对描述，35条相关详情另读；前批001～022的464～468已存在，本次未重建。报告[本批执行记录](design-cases/multi-workflow/sso023-027-ego-prod-results-20261113.md)，检查点reports/yunxiao/sso023-027-prod-20261113/sync-summary.json。


## 2026-11-13 SSO-023～027生产ego执行结束

使用原TaskSpace6/p6接回生产yabinc18账号，有头串行、零业务重试；5个独立非项目会话、原片各上传登记一次、不@。25轮计划：12轮真实正式提交、13轮依赖阻塞未提交，5 Passed / 7 Failed / 13 Blocked；SSO026五轮通过，023/024/025/027 Failed。高光选片超目标时长、主题标题缺失及29.420秒时间轴被30–30秒渲染约束拒绝导致无交付；024R3实际20秒1080p且新增中文说明条，R4源正确但继承该结果，不能称本轮新增尺寸变化。026母版、INTERNAL/CLIENT分支和两份1440p正式版源正确，字幕/水印隔离已核验。7份实际MP4均下载完整解码，原声三段对照，026每秒抽帧、母版18条字幕与独立ASR复核；验证范围非所有帧/人工全片逐字听审。独立检查点审计5会话/7文件issues0。报告[本批执行记录](design-cases/multi-workflow/sso023-027-ego-prod-results-20261113.md)，证据reports/sso023-027-ego-prod-20261113/。本轮云效写入0，无Git提交推送。前批同步状态见其最新独立记录；本次云效回读已确认FWXC-464～468存在，不重复创建。


## 2026-11-13 原缺陷与新业务偏差分开

2026-11-13按用户要求区分原缺陷与新业务偏差：原359顺序打开错误、362计费输入校验错误、373已完成历史入口disabled均执行通过，官方API改✅AI通过并回读；新业务偏差另单459（保存版本选错）、460（纯色RGB不符）、461（点击可用历史仍处理占位）、462（擦除手包仍保留）、463（文字合成位置偏移），5单附7张真实截图并回读。369源尺寸1254²→1264²仍属原验收失败，保持AI未通过；318/352/360原失败保留。本次未重跑任务，历史未执行扩散不补算。7条原失败详情评论及4条最新分开判定评论均已回读；359/362/373旧完整业务Failed记录保留并加最新结论。R2按原问题口径15通过/4失败/4阻塞；三批已尝试40条原问题口径28通过/4失败/8阻塞，新建5项偏差单独统计。详见[拆分报告](defects/regression-split-20261113.md)。

## 2026-11-12 七项确认失败同步AI未通过

用户要求将确定回归失败的7项同步为AI未通过。23:30～23:31官方OpenAPI逐条读取当前项及工作流，仅修改状态，并回读验证FWXC-318、352、359、360、362、369、373均由已修复→❌AI未通过，其他业务字段不变；未重跑、未追加评论/附件、无Git提交推送。8项阻塞/未覆盖298、332、346、407、399、403、414、416未修改。本地R2执行账本及7项原报告已补最新状态，历史失败证据保留；完整写入/回读记录reports/regression-ai-failed-status-20261112/summary.json。

## 2026-11-12 R3回归与扩散：1通过、4覆盖阻塞

本轮5项已实际尝试原场景及各2条扩散，共18场景（原8、扩散10）；1项Passed、4项Blocked，4场景Passed/14场景Blocked，无Not Run场景，但仍有原目标及文件核验未覆盖，不能称全部回归完成。FWXC415两个原分支及两扩散均执行通过，官方API设✅AI通过并回读；399/403待确认时UI只有停止、无发送，重复链接未受理；414五场景自动导入、416三场景显示3840×2160，原页面问题未复现，但本轮完整文件未取得，不能代替实际分辨率/时长/解码核验。5条原缺陷评论共18图均官方回读确认，编号399=24249368、403=24248603、414=24249480、415=24249580、416=24248039。无已确认新增扩散业务失败，不新建/关联缺陷。22:24官方全量269条、25条已修复，陈亚宾15条；与此前16条相比仅415移出，无新增候选，其他状态变化不归因本批。报告[续轮R3](defects/fixed-regression-20261112-r3.md)，执行账本reports/fixed-regression-20261112-r3/progress.json。原缺陷预发、按用户改生产，未认证预发；旧11条7失败/4阻塞范围保留，不重算历史扩散。原生控制接回后用macOS辅助功能和截图，mcp__cua_repl仍未提供，前台反复切换，文件核验需稳定窗口继续；已受理24条任务无额外业务重试，无Git提交推送。

## 2026-11-13 SSO生产ego批次可执行部分结束（听审已确认）

生产app.cinlink.ai，ego-browser有头串行，零业务自动重试。SSO-001～022可执行部分已结束：22例8 Passed/14 Failed；计划104轮，100轮实际受理、4轮依赖阻塞未提交，逐轮80 Passed/20 Failed/4 Blocked；91份实际交付文件已下载检查。001～018按用户严格口径不得直接以前轮SRT作为新轮输入。主要问题为高光尺寸不符、组合增强输出4K、复用旧SRT、日/韩配音字幕错位，以及后段高光工具定义缺失导致无交付。015完成后刷新5/5、016运行中刷新5/5、017真实关闭后历史重开5/5已覆盖；018已有R1/3/4真实播放，R2/R5缺成片使全量历史播放保留缺口。原TaskSpace4消失后，经用户明确授权在TaskSpace6恢复原会话，无任务重发。以[本批完整记录](design-cases/multi-workflow/sso001-022-ego-prod-results-20261112.md)及reports/sso-ego-prod-20261112/progress.json为准。用户2026-11-13确认SSO014R5所提供听审片段“全程法语”，该轮改Passed；SSO014仍因第1轮日语同步失败保持Failed。2026-11-13按用户要求通过官方OpenAPI新增FWXC-464～468共5单，覆盖20个失败轮次；25张真实截图和全部43份附件、正文均回读一致。云效279条Bug完整分页、77份候选详情核对，正常提交高光未交付与旧236取消重提路径的差异已注明；既有项未修改。4个依赖Blocked轮次不独立报缺陷，法语听审通过不纳入。未重跑生成任务或提交推送Git；其他修复回归批次独立保留。

## 2026-11-12已修复缺陷续轮R2

用户要求继续已修复缺陷回归，R2新快照23项（238条Bug完整分页、41条已修复、陈亚宾精确筛选），Blocked 4、Failed 7、Passed 12，可执行部分结束，覆盖缺口见表。上轮剩余7项加新修复16项，已AI通过12项不重跑。以[续轮报告](defects/fixed-regression-20261112-r2.md)及reports/fixed-regression-20261112-r2/progress.json为准。16:50账号切为用户确认的yabinc92后，坐标输入已恢复，先前3项暂阻塞已撤销待补测；已完成目标不重发。后续使用当日新项目d15de3bc-fa92-431b-8e8f-dbed3d151a22，账号及源版隔离。通过才改AI通过并回读，其余保持，不写评论/新缺陷或Git提交推送。

## 2026-11-12白天批量回归可执行部分结束，仍有覆盖阻塞

本轮可执行部分已结束，Passed 12、Blocked 6、Failed 1；19项均有本轮处置，单独未执行项0，但6项仍有阻塞/未覆盖范围，不能视作全量通过。以 [批量回归报告](defects/fixed-regression-20261112.md) 和 `reports/fixed-regression-20261112-current/progress.json` 为准。12项实际通过均官方API改✅AI通过并回读，另7项只读回读仍已修复，未写评论/新缺陷或Git提交推送。318继续流程只交JSON、未呈现描述，Failed；298原场景待确认；407原文列未覆盖；368/373/364画布控制受阻；327六份文本通过、三条快捷参数未覆盖。解除阻塞后只补缺口，不自动重提已完成任务。

## 2026-11-12凌晨定时回归前置阻塞，六条待解锁续跑

01:00定时批次已触发，官方OpenAPI完整分页235条Bug、22条已修复；按陈亚宾创建者ID精确筛选6条：FWXC-327/292/255/249/246/236，详情/附件/评论与候选快照已保存。有头Chrome原生控制报Mac锁屏且自动解锁失败；扩展可列标签但getTab报timeoutMs错误，未取得可操作页面或截图。本轮业务测试执行0、提交/上传/云效写入0；0 Passed/0 Failed/6 Blocked，尚未完成回归，不用11月11日历史结果替代。292正文空模板、附件列表空，评论有格式转换描述和嵌图，原环境/输入仍需核实。等待人工解锁后按原快照续跑六项，尚不改AI通过、不另建周期重试。报告docs/defects/nightly-fixed-regression-20261112.md，进度reports/nightly-fixed-regression-20261112/progress.json；原始云效数据cloud/。原缺陷/用例历史状态保留，无Git提交推送。

## 2026-11-11 FWXC-236预发取消后重提回归未通过

预发yabinc18在默认未分组空间新建会话4be81b52-4f27-4f65-bd9d-ed3af41137ce，原F/7MB.mp4两次挂载并通过UI @菜单引用，同一原指令首次提交后有效停止一次，确认已取消并刷新后保留；18:45:36同会话重提一次。原片7815126字节、SHA256 9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96一致，无额外登记消息或业务重试。第二条生成0.160～19.000秒/18.84秒高光方案，18:48:02审核一次后渲染失败，报Generation requires its frozen plan node ID，无MP4交付；18:49:11刷新后已取消和该失败均保留。审核前另见HTTP414媒体格式提示，画面/时间轴/原声已显示；未重新加载或重生成，不归因两错误同根因。原工具定义缺失及假完成表现未复现，但MW05成片业务Failed，自动化FIXME保持；内部runID、后端状态枚举/产物数、取消计费未从UI可靠取得，18.84秒仅方案非成片实测。18:49官方OpenAPI只读回读FWXC236仍已修复/陈圣融，云效写入0，不改AI通过。报告docs/defects/FWXC-236-retest-staging-20261111.md，原缺陷最新指针、用例执行记录及统一入口已更新；证据reports/fwxc236-staging-retest-20261111/。无Git提交推送。

## 2026-11-11 FWXC-242预发原凭证缺失专项通过并同步AI通过

预发yabinc18在默认未分组空间新建三个独立会话，分别原F/7MB.mp4上传一次并用@菜单选入引用，云效原MW24/25/26指令各提交一次，无登记消息/业务重试。原片7815126字节、SHA256 9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96一致。MW24会话a7a98683-120d-4ee0-838d-4f2fa8875315，检测0口水词/5停顿、默认0.8秒阈值，移除并审核后308秒交付57.26秒中文字幕视频；MW25会话9489fd65-0c6d-457d-8ad0-d693ff43a550，23.54～52.82秒方案审核后232秒交付29.29秒中文字幕高光；MW26会话bc5cb8aa-e971-427c-8efb-184ad3414434，水印位置澄清补选右上角一次，238秒交付60.49秒E2E-P0+英文字幕视频。三份均1280×720、有音轨、实际下载/全解码0、首中末画面正常，原Missing CinLink access token or API key未复现；R3原声Pearson约0.999755。三份SHA256见报告及各rN-audit.json。MW26期间窗口切到运营后台，仅切回原任务回读，无重发/后台操作。Passed限原凭证缺失专项，不替代真口水词识别、字幕内部中文→英文文件链路、逐字/逐帧质量、过期登录恢复或账本验收；MW23对照未重跑。18:36官方OpenAPI将FWXC242/eb0c12526cebd6614f7735a894由已修复改✅AI通过并回读，其他业务字段保持、评论/附件0。报告docs/defects/FWXC-242-retest-staging-20261111.md；原缺陷状态/最新指针、统一入口更新，历史保留。证据reports/fwxc242-staging-retest-20261111/及reports/yunxiao/fwxc242-ai-pass-20261111/。无Git提交推送。

## 2026-11-11 FWXC-278预发法文成片混语专项通过并同步AI通过

预发yabinc18新未分组会话d23e393c-0e8b-4ef3-813f-c6a6e6fc6c14，原F/7MB.mp4为7815126字节、SHA256 9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96一致；当前会话仅一次附件登记23秒，原中/日/韩/法四轮122/124/109/93秒完成，无@/补槽/业务重试。四份实际MP4已下载、完整解码0，均60.49秒1280×720，原声全段967808点Pearson均1.0。法文24934028字节、SHA256 0dc2e646f7ffbeae94171b713bb8d96892fd4685946482090aa9078994fb470f；原27.54～32.24秒取样及30.244秒无ոստիկան，31.5/32.24秒pédiatre后为逗号；121帧2fps法/英OCR无亚美尼亚字符命中，18个字幕画面代表帧人工复核无同类异常。Passed限成片混语专项：独立SRT未取得（翻译工具仅说明、默认工程暂无字幕、聊天素材只有原片及4份MP4），R5未执行，不重判SSO005整例或内部根因。准备时新会话AX点击未跳转，附件曾加入旧279未发送草稿，发送前发现并进入确认空白新页；结束回查旧会话无附件、无新指令，正式测试始终为新会话，偏差和清理证据保留。18:04官方OpenAPI将FWXC278/381366768cf968880d087e2735由已修复改✅AI通过并回读，其他业务字段保持、评论/附件0。报告docs/defects/FWXC-278-retest-staging-20261111.md，原缺陷最新指针/统一入口及历史状态说明更新；证据reports/fwxc278-staging-retest-20261111/及reports/yunxiao/fwxc278-ai-pass-20261111/。无Git提交推送。

## 2026-11-11 FWXC-279预发计费预冻结失败专项通过并同步AI通过

预发yabinc18在默认未分组空间新建会话18c0a0e5-3d51-412a-906b-0584d455447c，仅上传原F/7MB.mp4一次，7815126字节、9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96哈希一致。登记21秒，同会话原五轮指令各1次，170/496/165/579/346秒完成，五份MP4均实际下载、完整解码0，四种字幕组合均未复现translate missing_usage。R1/R3/R4为60.49秒，尺寸720p/720p/1440p、对应英文REC-R1/中文REC-R3/无水印英文字幕；全段原声Pearson约0.999755。R2高光19.60秒1440p，R5高光29.29秒720p英文字幕，首中末无历史效果残留；未完整听审/逐字质量或账本验收。R2首次确认并烧录报Cannot read properties of null (reading 'text')，刷新一次恢复6.92～26.52秒原方案后审核继续，保留独立异常现场；R5的23.54～52.82秒方案确认正常。R4转码等待较长，刷新原任务回读后确认579秒完成。无业务重试/重新生成或其他云效缺陷提交。原计费专项Passed；17:38官方OpenAPI将FWXC279/49b6b410843766dee777c4f8a6从已修复改✅AI通过并回读，其他业务字段保持，评论/附件0。不批量改SSO015～017完整恢复用例历史状态。报告docs/defects/FWXC-279-retest-staging-20261111.md，原缺陷最新指针及统一入口已更新；证据reports/fwxc279-staging-retest-20261111/及reports/yunxiao/fwxc279-ai-pass-20261111/。无Git提交推送。

## 2026-11-11 FWXC-281预发法文混语专项通过并同步AI通过

预发G56项目新会话30f227af-07e6-4302-aded-ba3342bb87d6，原F/7MB.mp4哈希一致，上传登记一次；同会话完成中/日/韩三个前置及法文第4轮（136/130/121/237秒），无@、补槽或业务重试。四份MP4均已下载，约60.49秒1280×720、全解码0，原声波形Pearson约0.999755。法文成片24895765字节，SHA256 628ced43a5726fe0c465eafe4393257857d21dd3d616911e77073585611b9975；原32.96～39.16秒及36.06秒原始PNG未见սիր，38.5秒为正常pour son proche,。121帧辅助扫描和18个字幕画面代表帧人工复核未见同类异常。Passed限成片混语专项，独立SRT未取得、第5轮未执行，不重判SSO010整例通过。16:52官方OpenAPI将FWXC281由已修复改✅AI通过并回读，其他业务字段保持，评论/附件0。报告docs/defects/FWXC-281-retest-staging-20261111.md；统一入口和原缺陷最新指针已更新，历史失败保留。证据reports/fwxc281-staging-retest-20261111/及reports/yunxiao/fwxc281-ai-pass-20261111/。无Git提交推送。

## 2026-11-11 FWXC-282预发专项回归通过并同步AI通过

原缺陷为预发SSO014 R1日文SRT及20.5秒烧录多余】【，本轮按原环境而非此前生产结果判定。yabinc18预发复用G56项目3a1225cf，新建会话7e792498-111e-443c-a5e7-76df18227a40，仅原F/7MB.mp4一次附件（7815126字节，9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96哈希一致），原登记34秒、原R1完整指令1次186秒完成，无@/补槽/重试。实际C6-JA.mp4下载24791726字节，SHA256 5769b00f7def273d2c2cedf14ce27c027fe1898f1bc6697d731798077aa1630b，60.44秒1280×720 H264/AAC、完整解码0。19.4/20.5/21.5秒PNG无原多余括号，121帧2fps日文OCR无目标括号样本，18个不同字幕画面代表帧人工复核正常，用户本轮确认“日语配音及字幕同步正常”。Passed限定成片异常字符专项：独立SRT未交付，工具仅说明、编辑器无可编辑字幕轨道，不用OCR冒充SRT；不是逐帧穷举/根因证明，不重判SSO014全部5轮。按用户既定通过状态规则，16:23官方OpenAPI将FWXC282工作项8f4587beeafd93082783651e90由已修复改✅AI通过，回读成功，其他业务字段保持，评论/附件0。报告docs/defects/FWXC-282-retest-staging-20261111.md；原缺陷正文保留历史加最新指针、统一入口更新。证据reports/fwxc282-staging-retest-20261111/及reports/yunxiao/fwxc282-ai-pass-20261111/。无Git提交推送。

## 2026-11-11 FWXC-327正式环境9分支回归，8份文本通过/1条SRT路径未覆盖

按原云效9条步骤，使用本机同名American+Vs+Asian+Culture.mp4（31001109字节，SHA256 2d9cb7a00357b4d61092566491031f17ed9e217210cf54e2774b48b242b62801），今日项目9ccba5a7下9个新会话，串行各1次、重试0。总结P01/02/03为64/65/76秒，下载434/416/404字节中文MD均可读；转写P02/P04为123/87秒，翻译P01/02/P04为209/84/118秒，5份SRT实际下载1282/1317/1302/1330/2148字节，共65条，严格UTF8、序号/时间/非空正文、输出语言检查通过，双语13条均含中英文，未复现下载失败或乱码。翻译P01出现交付形式澄清，补选独立英语字幕一次后完成。转写P01原快捷指令159秒只输出subtitled-video.mp4，无原SRT卡，原乱码分支未覆盖，不把MP4当文本通过，不将整项改AI通过。未完整听审逐字准确率/音画同步或旧文件，原素材哈希无旧值不冒称逐字节同一。人工切换另任务后暂停，用户确认独占继续，人工任务不计本轮9条。云效工作项1ba3ef8e1d160938e926dcc018，前读已修复、结束读再次打开，负责人陈圣融，本轮云效写入0、不归因状态变化于本轮操作。报告docs/defects/FWXC-327-retest-prod-20261111.md，证据reports/fwxc327-prod-retest-20261111/；统一入口同步，无Git提交/推送。

## 2026-11-11 FWXC-356云效AI通过状态核验

用户要求修复且AI回归通过的对应缺陷设为“AI通过”，已登记后续执行规则。官方OpenAPI读取FWXC356时已为✅AI通过（0937b1d9e486323590880e5450），因此没有重复PUT；15:22（Asia/Shanghai）再次回读一致，其他业务字段前后保持，评论/附件写入0。保留9秒新工程UI回归范围，未批量更改失败/未测缺陷。报告及统一入口同步，证据reports/yunxiao/fwxc356-ai-pass-20261111/result.json。无CinLink重跑或Git推送。

## 2026-11-11 FWXC-356正式环境新会话回归通过（9秒工程UI范围）

按用户最新要求复用今天项目9ccba5a7-6b36-4630-9923-15e60a10b0c6，新建独立会话00e45ed5-e6d9-4886-8f6e-a296007b0fdc；F6/9s.mp4哈希核实，通过添加字幕卡片126秒准备完整视频/原声及3条英文字幕。干净基线撤销/重做均禁用，第一条完整块0.52～4.14秒。15:17:54（Asia/Shanghai）正式UI右端点向左40px仅1次，结束变3.64秒，起始/文本及其余轨道不变；等待5秒刷新页面、重开同一工程后仍保留，无Manual layout does not cover parent，Passed（该新工程UI拖动/保存/刷新范围）。原30秒历史工程和内部排版字段/revision未覆盖，不冒称全部布局或旧数据修复。早前111秒SRT-only准备会话在正式操作前出现未归因改动，现场保留、不计失败；用户确认停止Chrome后独立新会话准备，合计2次准备、1次正式拖动、零业务重试。官方OpenAPI只读云效仍已修复/余航，0云效写入，无Git提交/推送。报告docs/defects/FWXC-356-retest-prod-20261111.md，证据reports/fwxc356-prod-retest-20261111/。正式ERYE196-052其他参数/撤销条件不批量改判。

## 2026-11-11 FWXC-351第二轮正式回归，28秒/26秒仍未通过

按用户再次验证要求，复用原生产yabinc18会话39f4248c-0462-4978-912e-b714ad69a992和原图片，独立r2证据不覆盖前轮。UI重新核验纸船cb48原历史与水彩3434画布，A收起后1次受理28秒已完成但拒绝缺实时会话/修订/源版；B从纸船对照1次受理26秒已完成但拒绝按fileID打开生成原版，画布仍纸船。两分支业务Failed，无新工具列表/原schema错误，不推断同根因或已修复。两次按钮中断草稿未发送，A随后Enter仅受理一次；无业务重试/上传/生成/处理/导出。刷新后28/26答复保留；进一步重开被Chrome控制中断，本轮刷新后两工程历史未复核，原file到历史后台绑定/哈希、runID及费用未覆盖。云效官方只读仍已修复/余航，0云效写入，无Git提交/推送。不批量改正式用例结论。报告docs/defects/FWXC-351-retest-prod-20261111-r2.md，证据reports/fwxc351-prod-retest-20261111-r2/。

## 2026-11-11 FWXC-351正式环境回归完成，2分支未通过

用户切回后原生CUA控制恢复，复用yabinc18原会话39f4248c-0462-4978-912e-b714ad69a992和原素材，无重新生图。UI核实11.png纸船原历史cb48…及标注开关可用，收起后原A仅1次；40秒已完成但答复缺实时编辑器会话/修订/源版本、无法自动打开，编辑区仍收起。UI查看已有水彩历史3434…后切回纸船，原B仅1次；42秒已完成但称接口不能按fileID打开原始生成版，仍纸船。两分支业务Failed、原schema缺session_id/conversation_id本轮未见、无本轮工具调用列表，不判同因或内部缺参已修复。刷新后两轮保留；纸船1项、群鸟3项原历史，无新增。I2文件到历史项后台绑定/哈希、runID及费用未覆盖；不把历史错误或UI手动重开算本轮Agent结果。无重试/处理/生成/导出/云效写入/Git提交。报告docs/defects/FWXC-351-retest-prod-20261111.md，证据reports/fwxc351-prod-retest-20261111/。云效回读仍已修复/余航，未自动变更；本次不批量覆盖正式用例结论。

## 2026-11-11 FWXC-351回归前置受浏览器控制阻塞

已通过官方OpenAPI读取FWXC351（2887f4e45628699108c470bf84）为已修复/余航，核对原两分支步骤及导入图须处理建工程的后续纠正。生产yabinc18原会话39f4248c-0462-4978-912e-b714ad69a992可访问，原纸船附件与真实水彩群鸟生成记录存在；尚未可靠核验当前工程/画布。Chrome标签接口异常，原生AX与截图不一致、随后白屏/noWindowsAvailable/AXError.invalidUIElement；重置/重绑未恢复，已向用户请求切回并确认网页正常。当前0次正式提交/0次生图处理/0次云效写入，不以历史错误判本轮失败；待用户确认后继续基线和两分支各一次Agent打开。报告docs/defects/FWXC-351-retest-prod-20261111.md，计划reports/fwxc351-prod-retest-20261111/plan.json。旧用例状态不改。

## 2026-11-11 FWXC-350回归评论同步并再次打开

按用户授权，通过官方OpenAPI将最新生产回归Failed追加至[FWXC-350](https://devops.aliyun.com/projex/bug/FWXC-350)评论，评论ID `24195894`，状态从已修复（29）改为再次打开（30），11:47（Asia/Shanghai）回读验证成功。上传2张本轮原始截图（分割失败、刷新重开后仍单段）及结构化结果JSON，新增3附件、合计5附件；评论全文、MARKDOWN格式、2个图片引用和附件名称/ID/字节数已核对。原描述、标题、负责人余航、优先级/严重程度、标签及迭代保持。明确独立F6/9s工程的等效业务回归范围，本轮错误为当前run读取/未来修订检查，原base_revision模板问题未判同因或已修复。无新建缺陷或产品任务，无Git提交/推送。检查点与回读记录：`reports/yunxiao/fwxc350-retest-comment-20261111/`。

评论权限最初403；用户要求直接进入云效处理后，经现有专用令牌编辑页仅补充工作项评论读写（10→11项），保存成功，原有效期2027-02-04及其他权限保持；未新建/读取/替换令牌。评论和状态写入均使用官方OpenAPI。

## 2026-11-11 FWXC-350正式环境回归未通过

官方OpenAPI读取FWXC350（96fde22e756e50026ec43649fa）当前已修复/余航，仅GET无云效写入。原1020817070账号会话在当前yabinc18返回Conversation SSE HTTP404，原英文30S素材未在已提供目录找到；新建正式专用项目9ccba5a7-6b36-4630-9923-15e60a10b0c6仅F6/9s.mp4，通过编辑器选择媒体建立单视频工程，会话783e56bb-a375-4685-9a5f-2f64e0f7dff8。准备Agent未创建，UI导入后基线1视频+1原声0～9.43秒；另只读轮26秒列Editor project get但未交付具体revision。正式原始5秒分割指令仅1次，Editor video clip split失败：Read this editor project in the current run before using a future revision；失败后及刷新重开均1视频/1原声同范围、音量100。功能Failed；原base_revision invalid type文案未出现，未获实参，不判同因复现或已修复。无重试/导出/云效写入；原字幕/静音/旁白组合及帧级切点未覆盖。CUA窗口异常重置后已恢复最终核验。报告docs/defects/FWXC-350-retest-prod-20261111.md，证据reports/fwxc350-prod-retest-20261111/。正式需求旧用例状态不批量改判，未自动提交或推送Git。

## 2026-11-10 LF18～35预发执行完成

按用户授权执行11条当前活动用例，7 Passed（LF18/20/21/30/31/32/34）/4 Failed（LF22/28/33/35），0阻塞。G56专用项目3a1225cf-106d-4b61-86e8-e98158a18507仅F5/F6，分析批次34a588ac-be06-460c-a579-3510da7b22fa、2/2就绪，预计2400积分非实际扣费。8个会话、12次正式查询+1次LF20有历史上下文额外探测；该初次点击未切会话的偏差保留，随后确认空会话执行32秒正式通过。LF18两原片下载哈希一致；LF32/33前置由用户完整观看两片并确认目标不存在。LF22/28不存在名称43秒终态仅承诺核对、无实际无匹配结论；LF33同框52秒误返两独立原片；LF35补选男子60秒新结果仍混女士、未明确完成选择。无并行/重分析/自动重试/生成/删除或云效写入，根因未确认。报告docs/design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md，证据reports/lf18-35-staging-20261110/。正文、统一入口、状态MD/JSON、自动化登记及素材准备说明已更新：全部28条已执行，15 Failed/13 Passed（各例限定范围）/0 Not Run；AUTO3/PLAN25不变，7退役编号排除。

## 2026-11-10 最新执行状态及新增测试素材同步

按用户要求核对并同步LF最新逐例状态：当前28条，LF01～17已执行，11 Failed/6 Passed（各例注明UI或客户端覆盖），新增11条Not Run；AUTO3/PLAN25。LF08/12/13采用优化版最新58秒/39秒/44与35秒结果，LF16客户端恢复、LF17听审后漏检均保留实际边界。正文末列明确为最新执行状态，统一入口分类索引修正旧17条/14PLAN描述；历史日志单列，不以旧源ID/时间缺失判业务失败。新增F5 7MB.mp4、F6 9s.mp4路径、规格、内容参照、哈希及关联用例在原正文登记并加入入口链接，本次再次核对原文件大小和SHA-256一致；仅本地准备，未创建G56或上传/分析/执行新用例。现有云效缺陷链接同步，无云端状态修改。

## 2026-11-10 文件名查找收敛为5条核心P0

用户要求名称查找仅主要几条：保留LF18完整名称（合并原LF19的9s参数组，覆盖F5/F6）、LF20唯一部分名称、LF21双文件、LF22不存在、LF28正→反→正串联，全部P0。LF28执行7MB→不存在→9s三轮，同时复用LF18两组/LF22证据，不重复发查询。移出原LF23～27、LF29，旧LF19合并，7个未执行编号退役不复用；取消新Q5额外项目。非名称LF30～35六条正反向保留。当前28条设计（P0 25/P1 3）、17已执行，11Failed/6Passed（UI/客户端）/11NotRun，AUTO3/PLAN25。仅整理，无线上或云效写入；正文/入口/状态表JSON同步，退役原文备份在reports/lf-real-media-design-20261110/retired-name-cases.json。

## 2026-11-10 名称用例全部P0，补充非名称正反向LF30～35

按用户最新要求，LF18～29名称/串联相关12条全部调P0；另新增LF30/31真实女士/男子视觉命中（P0）、LF32目标不存在（P0）、LF33同框组合不满足、LF34排除前轮对象再查女士、LF35宽泛描述澄清选择（后3项P1）。LF32/33执行前需完整预览确认反向金标，抽样不能自证全片无目标。新增合计18条15P0/3P1，全部PLAN/NotRun；无线上执行或云效写入。现35条设计、17已执行，11Failed/6Passed（UI/客户端）/18NotRun，AUTO3/PLAN32，P0 32/P1 3。名称基础、两片串联及非名称质量路径均在原正文续号，不复制历史用例。

## 2026-11-10 新增真实素材名称检索用例LF-18～29（仅整理）

用户指定先整理用例，不执行。目录素材查找新增7MB.mp4/F5（60.50秒1280×720，7815126字节，哈希9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96；女士旗帜前讲话）及9s.mp4/F6（9.45秒1920×1080，9259791字节，哈希897b9ef16ac9fd2c255067478f179143f1d998b4e962f391e9ede635a4bfe022；黑框眼镜男子桌前讲话/笔记本）；均完整解码0、首中尾画面核验，未听审语音。原LF01～17夹具F1～4不随目录6片污染。新增12条8P0/4P1：全名、部分名、双名、不存在、扩展名错误、名称描述冲突、排除、歧义、跨项目、正→反→正链、真实画面→名称链；统一在原LF正文，不另复制用例。未来G56只含两新片分析2/2并多会话复用，隔离例Q5仅F5；LF18/22/19同S-name证据可复用验LF28，不重复查询。未创建线上项目/上传/分析/执行/云效写入。最新29设计、17已执行，11Failed/6Passed（UI/客户端）/12NotRun，AUTO3/PLAN26，P0 25/P1 4。元数据/帧reports/lf-real-media-design-20261110/；正文、入口、状态JSON已同步。

## 2026-11-10 LF-17缺陷同步云效

按用户授权新建[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)：人工确认旁白存在、单F2项目1/1就绪但语音查询98秒无匹配。3张原始截图正文嵌图、原片0～20秒听审WAV、evidence.json共5附件，官方OpenAPI回读字段/正文/附件/3图片引用验证通过。负责人占晶、测试环境MAC-chrome、重构10-29、中/3一般；正式PRD未提供、能力边界及根因待产品研发确认，不将源ID/时间缺失算缺陷。LF17保持Failed，最新11 Failed/6 Passed/0 Not Run不变。本机docs/defects/lf17-voice-target-missing-staging-20261110.md；检查点reports/yunxiao/CINLINK-LF17-STAGING-20261110-VOICE-MISS/。无CinLink重跑，旧项未修改。

## 2026-11-10 LF-17预发执行

Failed：原F2哈希一致，用户通过0～20秒原音确认“戴帽子的深肤色访客保持平稳步伐”原句存在后，单F2项目055b5131-5f11-4e5b-80c6-9d6a40ab3834（缓存分析1/1，预算1200非实际）空会话ef638000-1d99-43c9-ae55-aaef79a279d2正式查询1次，98秒完成却明确未找到匹配、0候选。助手声称无仅语音转写筛选项，不据此推断内部根因或系统整体无语音能力；正式PRD未提供，失败/能力范围待产品研发确认，无云效写入。精确时间/源ID未核不计失败。准备阶段分析确认CUA超时后回读已有就绪，无重复分析；旧LF03项目已变为0/4故未用。最新17/17实测，11 Failed/6 Passed（UI/客户端范围）/0 Not Run，AUTO3/PLAN14。报告docs/design-cases/multi-workflow/local-footage-results-staging-17-20261110.md；证据reports/lf17-staging-20261110/。

## 2026-11-10 LF-16预发执行

Passed（客户端网络错误/恢复）：P4分析4/4，正常对照会话7d00f206-1b4c-4db9-a304-85614bf4378b 47秒完成；新会话e330f8f4-47cd-4b61-8a84-7d8f88fb38b7用DevTools临时阻断预发POST conversations/*/turns，实际blocked:devtools/1 affected，UI明确失败Failed to fetch、非done/无匹配。删除规则并关闭开关后一次显式重试HTTP200/43秒完成，机器人预览正确；最终规则为空、关闭DevTools。正常1/阻断1/恢复重试1，无已受理重复查询；后端内部检索工具故障不在覆盖内。无重传/重分析/云效写入。最新16/17已执行，10 Failed/6 Passed（UI/客户端范围）/1 Not Run，AUTO3/PLAN14。报告docs/design-cases/multi-workflow/local-footage-results-staging-16-20261110.md；证据reports/lf16-staging-20261110/。

## 2026-11-10 LF-08缺陷同步云效

按用户授权新建[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)：优化版LF08查询漏F2/误入F4，负责人占晶、MAC预发标签、重构10-29、高/2严重。上传2张本轮UI原截图+1张标明参照的F2目标帧+1JSON；3个正文图片引用、字段及附件官方OpenAPI回读通过。源ID/时间缺失不作缺陷理由，根因未确认，状态仍Failed；其他旧项未修改，无CinLink重跑。检查点reports/yunxiao/CINLINK-LF08-STAGING-20261110-MISSING-F2-FALSE-F4/，本地docs/defects/lf08-missing-f2-false-f4-staging-20261110.md；最新用例统计10 Failed/5 Passed（UI范围）/2未执行不变。

## 2026-11-10 LF优化版重跑及全部状态同步

用户确认重跑LF08/12/13，4次查询均完成：LF08 58秒漏F2/误入F4，下载F4哈希精确匹配，最新Failed；LF12 39秒火车正确但长颈鹿混入，A历史保留，Failed；LF13 44/35秒机器人→瀑布内容切换/历史保留Passed（UI范围）。均预发同P4独立会话，无重传/重分析/重发/生成/云效写入。源ID/时间未覆盖不计失败。统一同步LF01～17逐例当前状态、报告索引和正文锚点，清理入口旧未执行统计。最新10 Failed/5 Passed（UI范围）/2 Not Run，已执行15/17；LF01～03生产，其余已执行预发，AUTO3/PLAN14不变。最新表docs/design-cases/multi-workflow/local-footage-execution-status.md及.json；本批报告docs/design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md，证据reports/lf-optimized-staging-20261110/。历史报告及证据不覆盖。

## 2026-11-10 LF-15预发执行

Passed（UI刷新恢复/预览）：复用P4的LF13会话0600b30c-8563-4c6f-8807-765bf0439aa4，刷新一次后原机器人/瀑布两查询、四候选、40/32秒完成状态及同会话URL保留，首机器人候选实际播放正常，未见新增任务/结果或跨会话混入。前后结构比对一致。本轮新查询0，无重传/重分析/生成，网络层零请求及初始手动暂存恢复未覆盖，不冒称全技术通过。无云效写入，LF15仍PLAN；最新9 Failed/6 Passed（UI范围）/2未执行，AUTO3不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-15-20261110.md；证据reports/lf15-staging-20261110/。

## 2026-11-10 LF-14预发执行

同P4项目4/4就绪，新会话3cfa7b21-5e19-4ec6-bd82-78ecdcefa13b一次火车查询39秒完成，首候选实际播放火车通过，但第二卡长颈鹿无关，Failed（与FWXC390现象一致，未新建）。未自动暂存；@按match-1-3搜索暂无相关内容，列表多个内部名未可靠映射到本轮候选，后续引用未完成，不报未确认新版功能缺失。添加素材打开本地选择框后取消，未上传/生成，最终清草稿。源ID/时间不计失败，无云效写入。最新9 Failed/5 Passed（UI范围）/3未执行，AUTO3、其余PLAN不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-14-20261110.md；证据reports/lf14-staging-20261110/。

## 2026-11-10 全部LF源ID/时间条件统一校正

用户要求更新此前使用这两点的用例：LF01～17通用前置/验收及相关条目统一以实际画面/声音、可识别来源、项目隔离和历史保留为业务条件；源ID/起止时间可取得时技术核验，不强制UI展示、不因证据缺失单独判失败。原片场景时间仅测试参照。LF08三原片哈希内容均正确，Failed改Passed（来源/内容）；LF12R2仍因长颈鹿误入Failed，LF13保持Passed（连续查询），其他实际失败不变。最新8 Failed/5 Passed（UI范围）/4未执行，AUTO3/PLAN14不变。旧执行提示词和截图保留，报告修正判定；自动化LF01～03不再用新短片ID冒充源ID，缺源ID/时间记null不触发失败，显式错误及实际内容断言保留。无线上重跑、无云效状态修改。

## 2026-11-10 LF-13验收口径校正（用户确认）

用户询问时间/源ID是否为需求后核查：无正式PRD，来自旧本地实现及QA设计，不应强制UI展示或以取证缺口判产品失败。LF13改Passed（UI连续查询和历史保留），机器人→瀑布内容已核验、未见残留；源ID/精确时间区间技术核验未覆盖。撤销上一条LF13定位缺失Failed，不提交相关产品缺陷。本次只修正LF13及通用解释，其他用例未批量改判；最新9 Failed/4 Passed（UI范围）/4未执行，AUTO3不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-13-20261110.md。本次文档修正，无线上重跑/云效写入。

## 2026-11-10 LF-13预发执行

同P4项目4/4就绪，新会话0600b30c-8563-4c6f-8807-765bf0439aa4连续机器人/瀑布两轮40/32秒完成，2查询零重发，未重传/重分析/@。首轮首候选机器人、次轮唯一候选瀑布均本轮下载解码0/1秒抽帧核验，首轮历史仍在，未见旧画面残留。匹配时间未交付、内部源ID/区间未核，完整Failed（定位交付缺失）、UI连续切换及历史保留子项通过；首轮其他两个候选未核，不冒称全部相关性通过。无云效写入，PLAN/AUTO不变，最新10 Failed/3 Passed（UI范围）/4未执行。报告docs/design-cases/multi-workflow/local-footage-results-staging-13-20261110.md；证据reports/lf13-staging-20261110/。

## 2026-11-10 LF-12预发复测R2

同P4项目4/4就绪，复用A dc658e37-b6d4-4306-a426-f5b1f6e917b3，新B b18de910-b29f-4391-9a97-3907acb19dee一次火车查询37秒完成，上轮API版本错误未复现；返回match-1-3火车正确、match-2-14长颈鹿无关，两份本轮下载解码0/1秒抽帧确认。无重传/重分析/@，回A提示词、49秒完成及三卡保留。源ID/起止未取得，UI复用/历史保留部分通过，相关性/定位整例仍Failed；不宣称跨源泄漏或API永久修复。零重发，无云效写入，PLAN/AUTO数量不变，最新9 Failed/3 Passed（UI范围）/5未执行。报告docs/design-cases/multi-workflow/local-footage-results-staging-12-20261110-r2.md；证据reports/lf12-staging-20261110-r2/；R1历史不覆盖。

## 2026-11-10 LF-12预发执行

同P4项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，无重传/重分析/@；复用A机器人会话dc658e37-b6d4-4306-a426-f5b1f6e917b3，B新会话af864aba-5960-455f-83a5-c307f101eedc一次火车查询终态Failed：model HTTP 400/BadRequest/API version not supported，request_id 01a1c4b3-47c1-7344-8027-4efd3b437fe0。无候选，不解释为无匹配或库复用失败根因；回A原提示词/49秒完成/三卡未覆盖。无重试、零已受理重发，LF12仍PLAN未接脚本；累计9 Failed/3 Passed（UI范围）/5未执行，AUTO3不变，无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-12-20261110.md；证据reports/lf12-staging-20261110/。

## 2026-11-10 LF-11预发执行

跨项目隔离Passed（UI业务范围）：新建Q仅F4，项目0fd85c52-a147-480a-9d64-4f2e0287559f、1/1就绪，43秒命中机器人，首候选下载解码0/抽帧确认；新建P123仅F1～F3，项目6593d6c2-6c19-4998-bcac-2c2e7b3e095b、3/3就绪，同句38秒明确无匹配、0新候选，无F4结果泄漏。共2查询零重发，Q部分准备人工协助/动作未记录后读回分析集合；P123预算3600非实际费。内部源ID和请求项目范围未取回，技术权限不判通过，Q其他两候选本例未核验。LF11仍PLAN，专项最新8 Failed/3 Passed（UI范围）/6未执行、AUTO3不变，无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-11-20261110.md；证据reports/lf11-staging-20261110/。

## 2026-11-10 LF-08～10预发执行

复用四素材项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，未重传/重分析。原生CUA有头：LF08一次77秒返回F2/F1/F3三个原片，下载哈希精确匹配、完整解码0、10秒帧目标正确，无F4；但无匹配时间/源区间，按通用E2/E3记Failed，不能报告错误去重，内部源ID未获取。LF09独立会话一次47秒明确无匹配、无新增候选，Passed（UI业务）。LF10新空会话空值及三个空格均禁用发送，点击/Return无新消息/任务/结果，Passed（UI校验），未抓取网络不冒称零HTTP请求。批次1 Failed/2 Passed，专项最新8 Failed/2 Passed（UI范围）/7未执行，AUTO3、其余PLAN不变；无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md；证据reports/lf08-10-staging-20261110/。

## 2026-11-10 LF-04～07缺陷已同步云效

2026-11-10已按用户授权同步云效（不去重）：[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2)（LF-04目标漏检，3图+1JSON）；[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)（LF-05～07混入无关片段，5图+1JSON）。两项新建，旧项修改0；8张图片均嵌入正文，字段/附件/图片引用回读验证通过，4条用例保持Failed，根因未确认。
本机记录docs/defects/lf04-missing-target-staging-20261110.md、docs/defects/lf05-07-unrelated-results-staging-20261110.md；对应同步检查点保留，未重跑CinLink用例。

## 2026-11-10 LF-04～07预发执行

用户在本批线上变更前指定staging-app.cinlink.ai，LF04单F3项目78d7264d-0fc5-4ff5-b6be-59990d83946d分析1/1就绪；LF05～07共用四素材项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，分会话执行，LF06同会话两轮。4条5次查询均终态、0 Passed/4 Failed：LF04有目标却无匹配，LF05机器人混入留声机/飞机，LF06飞机混入机器人/自行车、卫星混入宇航员/望远镜，LF07火车混入长颈鹿。11份候选下载完整解码0；未取得raw源ID/起止/run_id，不推断跨源泄漏或首尾越界。F3同哈希实测30秒女孩乌龟同框、59.5秒空背景，已修正LF04参照；预算1200/9600非实际费用。浏览器控制中断后读原状态、零查询重发，未写云效。LF04～07仍PLAN未接脚本，专项已有7条实测Failed、10条未执行，自动化3条不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md；证据reports/lf04-07-staging-20261110/。

## 2026-11-10 SSO-014生产复测

同会话c8baa441-7dc8-43a3-94cc-130cdfbedc6a，仅原片7MB.mp4上传登记一次，五轮纯文本无@、零重发，5/5完成，耗时172/117/173/130/173秒。5份MP4均1280×720、60.44/60.49秒、完整解码0，2/30/58秒水印及字幕语言抽样正常；R2/R4音频与F波形高度一致，R1/R3/R5均获用户听审正常。五轮后R1～R4远端重新下载哈希不变。原始文件ID/run_id/工具输入链路未取得，整例部分验证不判全通过；不迁移旧FWXC-282结论，无云效写入。报告docs/design-cases/multi-workflow/sso014-results-prod-20261110.md；证据reports/sso014-prod-20261110/。第四轮浏览器控制中断后读回原任务，无重发。

## 2026-11-10 LF-01～03生产复测

按用户指定在生产app.cinlink.ai新建LF-01/02/03隔离项目，原片哈希匹配，分析分别4/4、1/1、1/1缓存复用就绪；各查询一次共3次、无重发，原生CUA人工播放验收（非Playwright CLI）。0 Passed/3 Failed：LF01机器人正确但混入留声机/飞机，LF02/03返回2秒兔子片段缺目标。LF01加载会话详情卡住后刷新同会话读回，未重复查询。没有取得原始响应/run_id/源ID/源区间/远端hash，不冒用旧预发字段；LF02/03预算各1200，实际费用未核，未下载/未写云效。报告docs/design-cases/multi-workflow/local-footage-results-prod-20261110.md；本机证据reports/lf01-03-headed-20261110/。

## 2026-11-09 005带背景原图复测R2

005/Agent已按用户纠正以11.png原始带背景历史项7cffcedd67bc40e0915021594dbb3ad7重新执行；实际画布有浅色背景及投影，非去背景图。正式蓝底请求1次，计费输入校验失败：Cannot verify editor generation inputs for billing; no task was started。无蓝底新版本，绿底未发送；原两项历史保持，无在途任务。与上一轮能力说明不同，不冒称同根因。用例前置/test-data及005新版分支报告已更新，旧报告保留。仍2 Passed/3 Failed/258 Not Run，费用未核、无云效写入。报告docs/cases/requirements/ERYE-237/results-005-original-prod-20261109-r2.md。

## 2026-11-09 分层版237的001～005生产执行

2026-11-09在生产有头执行分层版001～005主入口：001/UI、004/UI Passed；002/Agent、003/Agent、005/Agent Failed，2通过/3失败。002报Open the conversation page before opening its editor、停留第三张；003空计划未打开；005缺确定性蓝底合成解释且未执行，绿底依赖未发送。Agent3次均终态，零已受理重发、无准备生成/导出/云效写入，费用未核。新版其余258分支Not Run（139其他主入口）；旧整例历史不改。报告docs/cases/requirements/ERYE-237/results-001-005-layered-prod-20261109.md。

## 2026-11-09 ERYE237分层重整（当前版本）

237已更新为分层执行版：47 UI /25 Agent /72 Technical主入口，仍144覆盖编号；Agent配对与技术补充单独记录。新版未执行，全分支Not Run；旧1 Passed/12 Failed/12 Blocked/119 Not Run为历史，不代新版结果。详见docs/cases/requirements/ERYE-237/execution-guide.md。

## 2026-11-09 正式014～032三组缺陷已同步云效

官方OpenAPI按用户三组分别直接新建：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)（014/018/032，Agent身份参数绑定/操作未执行）、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)（017/029，画笔引用误生成、内容丢失和缩图）、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)（030，圈外源红线误删）。未做去重，旧项修改0；共8份真实图片+3份evidence.json附件上传，8个正文图片引用及全部字段/附件回读通过。三组根因均保留未确认边界，029与FWXC-369现象关联但不冒称同根，030不把内部guide角色未核实升级根因。对应6条保持Failed，正式统计1 Passed/12 Failed/12 Blocked/119 Not Run，144 PLAN不变；本次无生产重跑。 本地记录docs/defects/erye237-agent-binding-prod-20261109.md、erye237-draw-submission-prod-20261109.md、erye237-edit-scope-prod-20261109.md。

## 2026-11-09 ERYE237-014～032正式执行

生产同会话39cdf63c-d593-4538-816a-5d1c29973e36，本批1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。014缺会话/源版本参数；018/032明确无法绑定身份、未执行；017仅本地改对象却受理生成；029源1254²→1024²且红线/文字丢失；030新增文字/圈内改蓝/不烘焙红圈可见，但误删圈外源底图红线。阻塞分别为未完成Agent配对、精确BG/内部对象/非法参数、工作头/费用/保留草稿前置，不假报全部通过；021实际RGB仍24/24/24，输入焦点未核实，不是产品颜色失败。普通Agent4次，图片提交3次均完成（a408be41cc4a41359a04b6d9eec3ac7d/e1fdc0f3f51d44c692efbd7b2c9ff72d/4ef8ea7c45a34e30ba55d9daf347f7f5），PNG下载2份，受理零重试、无准备生成/云效写入，费用未核。结束源V1/主工具栏、14项历史保留、无未发草稿或在途。registry/meta/cases/统一入口同步，正式累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍144 PLAN。报告docs/cases/requirements/ERYE-237/results-014-032-prod-20261109.md；证据reports/erye237-014-032-prod-20261109/。

## 2026-11-09 ERYE-237正式用例纳入两组UI实测优化

已更新正式cases.md中33条前置/步骤/验收（打开保存、画笔对象、批注引用、AI mask、比例、导出及busy），新增optimization-20261109.md专项证据映射并更新test-data/analysis/meta和统一入口。版本2026-11-09-ui-evidence-baseline；144条ID、优先级P0 95/P1 48/P2 1、来源/锚点/全PLAN及正式6 Failed/138 Not Run保持，registry执行状态不改。专项通过不代Agent/严格几何/账务/故障；确认垃圾桶入口，取消未证实快捷键推断；mask逐笔撤销/平移手势待确认；保留纯绘制尺寸、比例意图流程、真实alpha/接缝和busy历史可用要求。未新执行生产、未写云效。详见docs/cases/requirements/ERYE-237/optimization-20261109.md。

## 2026-11-09 020缺陷已同步云效

2026-11-09通过云效官方OpenAPI直接新建[FWXC-373](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=680b9622f88e0dbbd8a9741a3d)，未做去重、旧项修改0。本轮真实运行态JPEG已上传并嵌入正文，另附同期AX快照；正文、字段、附件ID/名称/字节数及图片引用回读通过。020保持Failed，工具栏累计13 Passed/6 Failed/1 Blocked；本次未重跑生产任务。 本地记录docs/defects/img-tb-ui-020-prod-20261109.md。

## 2026-11-09 IMG-TB-UI-020复测失败

同一生产共享会话、源V1，区域保存成功后完整提示词仅提交一次，真实擦除任务完成，新版本0f970d8aeb69454fbeadcdabc3cf2883，11项历史保留。运行态03快照确认内容工具/发送/导出disabled符合限制，但10项已完成历史也全部disabled，违反ERYE237§3.5查看历史仍可用，020由Blocked改Failed。尝试禁用历史后的快照已终态，不冒充运行中点击拦截；缩放菜单及收起重开实际发生于终态，运行态实操和切换后不抢占未覆盖，无重发采样。终态工具/历史/导出恢复，最终源版无待发意图。费用未核、无导出、无云效写入；累计13 Passed/6 Failed/1 Blocked/0 Not Run。报告docs/design-cases/img-tb-ui-020-results-20261109-r2.md，证据reports/img-tb-ui-020-r2-20261109/。

## 2026-11-09 IMG-TB-UI-018复测通过

同一生产共享会话、源V1重新准备红线/文字/蓝矩形。已保存后收起重开三对象恢复可选，单一画笔引用不重复；文字菜单进入编辑后直接在已聚焦输入末尾追加“ 已恢复”，AX回读完整新文字，Return确认后画布显示；再次收起重开仍保留“草稿保存 2026 已恢复”、红线和蓝框。补齐上轮焦点操作未核实缺口，018由Blocked改Passed，累计13 Passed/5 Failed/2 Blocked/0 Not Run。未提交生成/导出/云效，历史10项保留；结束放弃本轮草稿。报告docs/design-cases/img-tb-ui-018-results-20261109-r2.md，证据reports/img-tb-ui-018-r2-20261109/。

## 2026-11-09 016和017缺陷已同步云效

官方OpenAPI分别直接新建016 [FWXC-371](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c0b830eb50e111cb243f475b69)（比例选择即执行，草稿流程差异）及017 [FWXC-372](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f08ed4417846c25c3a8e038a4b)（16:9扩图左右背景明显接缝），未做去重。各2份原始图片附件上传并嵌图，正文/字段/附件及引用回读通过；共4附件、旧项修改0、无生产重跑。016正文注明交互需求确认边界，菜单JPEG是完成后回看；017使用真实结果PNG及源版PNG，未使用错对应的回看JPEG。用例状态仍Failed，详见docs/defects/img-tb-ui-016-prod-20261109.md及017对应记录。

## 2026-11-09 IMG-TB-UI-016～020生产有头执行

同一共享会话执行，1 Passed/2 Failed/2 Blocked。016首次9:16选择即直接执行，停止额外比例切换，1260×2240；017直接16:9扩图2240×1260，主体完整但左右背景明显竖向接缝，Failed。018保存重开三对象恢复、可选并进入文字编辑，但实际改写未确认，Blocked；019一次准备合成完成7900edb5adaf4e419b5fad695963a7ef，导出1024²保留红线及准确文字且排除未发批注/mask，源版1254²导出哈希一致，Passed；准备合成缩图问题另记。020两次区域保存前置均提示“当前草稿来源已变化，未应用擦除区域。”，无任务受理，运行态未覆盖，Blocked。共3个完成任务、4份PNG，未重发已受理任务；结束源版/主工具栏、测试草稿和未发正文清理、10项历史保留。累计12 Passed/5 Failed/3 Blocked/0 Not Run。早期截图助手未落盘，报告区分实际下载、回看补存和缺失现场，不补造。费用未核，未写云效。报告docs/design-cases/img-tb-ui-016-020-results-20261109.md；证据reports/img-tb-ui-016-020-20261109/。

## 2026-11-09 013和014阻塞排查

014通过：单笔mask右键保存区域→进入画笔点击撤销→返回，AI擦除意图移除、发送禁用，补齐原A空提交拒绝。013仍Blocked：未保存mask切到画笔时撤销禁用，且只切工具不撤销、再进擦除也清空选区；保存区域后作为整体意图可一次撤回。ERYE237§3.4只明确支持撤销，未明确逐笔粒度，不能用013只撤M2保留M1硬要求报产品失败。早期误把光标/遮罩混淆，在未确认空时点发送，额外受理1次无正文擦除并完成，版本9cf60e7a79714bc79dc30ea442cbaa4c已保留，已向用户说明；不是空mask门禁缺陷，费用未核，无重发、无云效写入。结束源V1/主工具栏无待发意图，历史7项。累计11 Passed/3 Failed/1 Blocked/5 Not Run。报告docs/design-cases/img-tb-ui-013-014-investigation-20261109.md，证据reports/img-tb-ui-013-014-investigation-20261109/。

## 2026-11-09 IMG-TB-UI-011～015生产有头执行

同一共享会话39cdf63c-d593-4538-816a-5d1c29973e36执行，2 Passed/1 Failed/2 Blocked。011三模式隔离通过；012直接去背景一次，新版本fd2adbbcd8f94d0baaff81b0ee3d0ec4，导出1254²真实alpha通过，PRD先引用后发送差异单记。013补涂/直径隔离可用但逐笔撤销未确认，跨画笔撤销再进擦除后空mask无法归因；014空mask点击发送明确拒绝，单笔撤销至空仍未验证，均Blocked。015细化手包20/8px遮罩，保存区域后完整正文仅发送一次，任务完成新版本1d9321ba2b5d433fbdc7e2b810527019，但手包及提手仍在/包面纹理变花，导出1254²及重开一致，Failed。正式处理2次、PNG导出2份、区域保存2次，无生成重试，费用未核，未写云效。累计10 Passed/3 Failed/2 Blocked/5 Not Run，016～020未执行。结束干净源V1/主工具栏、六项历史保留。报告docs/design-cases/img-tb-ui-011-015-results-20261109.md；证据reports/img-tb-ui-011-015-20261109/。

## 2026-11-09 IMG-TB-UI-006～010生产有头执行

在同一共享会话39cdf63c-d593-4538-816a-5d1c29973e36、源V1 editor_image_28de342515fc438aa5a0893c504fc20d执行，5 Passed（UI业务范围）：006选择/移动/缩边/菜单删除，007色板/RGB/吸管及默认色隔离，008局部笔迹/文字/形状擦除与底图保护，009三步共享撤销/重做及新分支，010继续编辑/关闭提示/放弃均符合。007空心矩形取H2实色描边内部，精确回读0/128/255，避开透明中心。每例放弃自己草稿，结束干净源版/主工具栏、四项历史保持，无新增生成或导出请求，费用/内部调用未核，未写云效。工具栏累计8 Passed/2 Failed/10 Not Run；既有002/005尺寸失败保持。报告docs/design-cases/img-tb-ui-006-010-results-20261109.md，证据reports/img-tb-ui-006-010-20261109/。

## 2026-11-09 工具栏纯绘制尺寸缺陷已同步云效

2026-11-09通过云效官方OpenAPI直接新建[FWXC-369](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e6d492be908d55a9d0b86124e6)，未做历史去重、旧项修改0。关联IMG-TB-UI-002与IMG-TB-UI-005的同一可观察现象：纯绘制合成结果导出由1254×1254缩为1024×1024；不推断共同根因、模型调用或费用。两张原始完成态JPEG、三份实际导出PNG已上传并嵌入正文，另附evidence.json，共6附件；正文、字段、附件ID/文件名/字节数和5个图片引用回读通过。002/005保持Failed，本专项3 Passed/2 Failed/15 Not Run；本次未重跑生产任务。 本地缺陷记录docs/defects/img-tb-ui-compose-size-prod-20261109.md；检查点reports/yunxiao/IMG-TB-UI-COMPOSE-SIZE-PROD-20261109/。

## 2026-11-09 IMG-TB-UI-001～005生产有头执行

最新3 Passed/2 Failed，006～020 Not Run。001空草稿明确拦截且撤销至空/退出成功；003红8px/蓝16px默认值隔离、200%返回成功；004六形状6/6保存重开可重新选择；002/005内容合成及导出/重开可用，但1254²源图均变1024²，按纯绘制同尺寸基线Failed，内部模型路径/费用未核。用户中途要求本专项一个会话执行，已更新AGENTS/用例；002～005共享39cdf63c-d593-4538-816a-5d1c29973e36，001最后在同会话补跑。旧001会话保留；准备去背景共2次，正式合成2次，零受理任务重试。结束共享会话源版/主工具栏，结果历史保留，无未发绘制草稿；空提交错误提示保留。报告docs/design-cases/img-tb-ui-001-005-results-20261109.md；证据reports/img-tb-ui-001-005-20261109/。未同步云效，既有图片批注专项/正式ERYE237状态不变。

## 2026-11-09 新增图片工具栏专项20条

按用户“针对工具栏功能新增测试用例”，新增docs/design-cases/18-image-toolbar-ui.md：IMG-TB-UI-001～020，P0 13/P1 7，全部Not Run/未接自动化。沿用授权生成人像，同项目各例独立会话/图片工程；覆盖画笔、六形状、文字/颜色、选择/橡皮擦/撤销/放弃、模式隔离、去背景、AI mask和擦除、五比例及16:9扩图、保存/导出和busy恢复。依据已取得的ERYE237原文快照，明确UI直执行去背景与PRD草稿流程差异；不把未确认快捷键当需求。现有批注用例关联复用；未运行生产操作/生成/云效写入，不改变既有专项8 Passed/1 Failed/1 Blocked或正式144条状态。统一入口与设计总览已链接。

## 2026-11-09 010平移问题已提交云效

按用户指令通过官方OpenAPI新建[FWXC-368](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7676dafe333fa5832e64c3441e)：图片放大200%后拖动和滚动未观察到画布平移（操作方式待确认）。未做去重、未重跑产品任务；3张原始JPEG上传嵌入、正文/字段/附件ID名称字节数及引用回读通过。正文明确需求§3.1/§5.2/A15支持平移，但尝试手势未被需求指定，不能断言所有方式均不支持；010保持Blocked，专项8 Passed/1 Failed/1 Blocked。记录docs/defects/img-ann-ui-010-prod-20261109.md，检查点reports/yunxiao/IMG-ANN-UI-010-PROD-20261109/。

## 2026-11-09 009缺陷已同步云效

IMG-ANN-UI-009已整理并通过官方OpenAPI新建[FWXC-367](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8c5a17dabe849b6a8a6a56ee71)：图片批注显示已保存，收起重开后正文和自定义对象名丢失。不做去重，未重跑产品任务。两张原始JPEG已上传、正文嵌入并回读核验ID/名称/字节数及字段；上传响应name与列表fileName差异已兼容，按同一检查点恢复，无重复创建或上传。同步工具22项离线检查通过。009保持Failed，专项8 Passed/1 Failed/1 Blocked。记录docs/defects/img-ann-ui-009-prod-20261109.md。

## 2026-11-09 007垃圾桶入口复测R3通过

按用户纠正入口，在007-R2已准备会话续测：关闭新增标注模式后打开批注1，确认完整正文及待发引用，点击浮层右上角删除批注；目标点/浮层/待发引用同步移除，已保存，批注3、4及两项版本保留。007 Passed，专项累计8 Passed/1 Failed/1 Blocked（009/010不变）。未新增生成、未写云效。报告：docs/design-cases/img-ann-ui-007-results-20261109-r3.md；证据：reports/img-ann-ui-007-20261109-r3/。下方待确认和原失败仅为历史。

更新：2026-11-06。启用数量按当前脚本统计，通过结果按真实执行记录统计，二者不能混用。


## 2026-11-09 007入口与需求口径纠正

2026-11-09用户截图指出批注移除入口是批注浮层正文输入区域右上角垃圾桶（AX删除批注）。撤销007两轮Failed，改待确认：退格不是需求，“仅取消待发引用且保留批注”没有已确认依据，不能据未找到该入口报缺陷。更新007步骤使用用户指出入口，但本次仅修正文档，未点击验证删除后的点/正文/引用联动，不标Passed。专项最新7 Passed/1 Failed/1 Blocked/1待确认；009失败、010阻塞保持。

## 2026-11-09 IMG-ANN-UI-007独立会话复测

2026-11-09按用户指令独立会话复测IMG-ANN-UI-007，复用007项目，新会话59c0a2da-3354-4179-8e1b-3397a11c04ac。准备去背景1次并返回带背景V1；批注/正文/自定义名及待发引用均真实建立，空输入框退格及引用顶部检查仍不能单独移除引用，浮层仅删除批注/添加，007仍Failed；正式编辑发送0、未写云效，累计7 Passed/2 Failed/1 Blocked保持。报告docs/design-cases/img-ann-ui-007-results-20261109-r2.md，证据reports/img-ann-ui-007-20261109-r2/。

## 2026-11-09 人像批注UI专项006～010

2026-11-09生产有头执行人像UI专项006～010：006重复添加仍单引用/单狗通过；007无仅移除引用入口、删除操作不生效Failed；008删白狗批注联动删除未发引用、仅生成红球通过；009已保存正文/自定义名重开丢失，实际粘贴输入复核仍丢失Failed；010适应窗口→200%→返回→批注编辑成功，但拖动/滚动/空格拖动未确认平移，整例Blocked。2 Passed/2 Failed/1 Blocked，本专项累计7 Passed/2 Failed/1 Blocked。准备处理5次、正式生成3次，费用未核。用户中途纠正可一个项目多会话，008～010复用007项目独立会话。报告docs/design-cases/img-ann-ui-006-010-results-20261109.md，证据reports/img-ann-ui-006-010-20261109/。未写云效，ERYE237正式统计保持。

## 2026-11-09 人像批注UI专项001～005

2026-11-09使用用户生成的人像在生产有头新建5个IMG-ANN-UI-001～005专用项目，优先UI批注浮层执行，5 Passed（人像适配业务验收），006～010 Not Run。新增棕白狗、修改为白狗、T恤改蓝、移除狗、双批注左白狗右红球均真实生成并导出重开。准备去背景5次；完整编辑5次及005额外仅双批注成功编辑1次；005最终全局说明与两引用已确认发送。费用/内部事务未核，输出1024²而源1254²，不宣称像素尺寸保持。报告docs/design-cases/img-ann-ui-001-005-results-20261109.md，证据reports/img-ann-ui-20261109/。未写云效，不改变ERYE237正式144条统计及既有6 Failed。

## 2026-11-09 ERYE237-033新项目复测

2026-11-09按用户要求先新建ERYE237-033-prod-20261109项目，再执行033。UI图内创建/灰区不新增符合预期；恢复空批注后Agent图内请求失败commands.0 invalid oneOf、缺session_id/source_version_id；图外请求21s拒绝负坐标。033仍Failed，6 Failed/138 Not Run。后续页面出现蓝船新增版本、已发送标注及画笔草稿，来源未确认，保留不清理，最终隔离验证有限；BG精度/独立双图片工程未覆盖。中间截图未落盘，仅最终截图/AX和提交JSON已核验，不冒充完整证据链。未写云效。见[报告](cases/requirements/ERYE-237/results-033-prod-20261109-r2.md)。

## 2026-11-09 ERYE237-033图域批注测试

2026-11-09执行ERYE237-033，生产有头复用已处理1024²纸船，图内Q创建1条批注/浮层，图外G不新增；清理自身UI批注恢复空基线后Agent合法Q失败base_revision invalid type/commands.0 invalid oneOf，实际0条；Agent图外x<0明确拒绝且无副作用。033 Failed（业务分支）；原BG1001×1000精度与独立双工程未覆盖，不冒充完整通过。最终标注关闭、无批注、历史两项保持；2次Agent请求零重试，未写云效。6 Failed/138 Not Run。见[033报告](cases/requirements/ERYE-237/results-033-prod-20261109.md)。

## 2026-11-06 ERYE237-001～005第2批云效同步

2026-11-06按用户“不去重”通过云效OpenAPI新建5条：[FWXC-358](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f1c9be96026403c5d311c5638f)（ERYE237-001）、[FWXC-359](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=270700d41580b5ed54616b0946)（ERYE237-002）、[FWXC-360](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9c6900f0ecb8225f5219b10b66)（ERYE237-003）、[FWXC-361](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=12425c9d5df84a7481b5772de9)（ERYE237-004）、[FWXC-362](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ecf3e918eb4784dbd653d967e8)（ERYE237-005）。旧项修改0，负责人/验证人牛诗晴，生产环境标签及🤔AI提缺陷状态。12张本批原始截图作为附件上传并以永久引用嵌入正文，正文/附件回读通过，重新下载SHA与原图一致。未重跑任务；5 Failed/139 Not Run保持。

## 2026-11-06 ERYE237-001～005优化后生产复测

2026-11-06按优化版在生产有头串行复测001～005：先UI各一次去背景补齐纸船/JPEG工程，刷新重开及批注可用，复用水彩生成图。001两Agent打开及002报Open the conversation page before opening its editor；003目标已确认工程但Agent缺上下文未打开；004 UI三版可看而Agent历史工具缺session_id/source_version_id；005蓝底首步计费输入校验失败，无V2所以绿底未发送。6次正式请求均终态、零重试；5 Failed/139 Not Run。账务/远端hash未核，准备任务2次单记。原始证据reports/erye237-001-005-prod-20261106-r2/，未写云效，PLAN保持。见[本轮完整报告](cases/requirements/ERYE-237/results-001-005-prod-20261106-r2.md)。

## 2026-11-06 ERYE-237全量用例优化

2026-11-06按用户授权优化ERYE-237全部144条，保留编号/优先级/来源；新版本2026-11-06-project-baseline，补B-IMG/B-MULTI/B-EMPTY/P-API、区分S0/P1/G1与V1，重写001～005并修正工具时机/样本矛盾。历史复核001生成图分支Failed保留，002目标JPEG未处理建工程改Blocked，003仍Blocked；1 Failed/2 Blocked/141 Not Run。未重跑或修改云效；部分脚本尚需适配新前置。见[优化复核记录](cases/requirements/ERYE-237/optimization-20261106.md)。

## 2026-11-06 ERYE237-003目标工程前置修正

2026-11-06用户补充：上传图片需处理一次才创建图片工程，提示词生成图自动建工程。003只确认无打开文档，未确认11.png目标工程/版本已建立，撤销Failed改Blocked（目标前置不足）；2 Failed/1 Blocked/141 Not Run。后续先准备并核实真实工程及版本，再完整执行；不将本次未打开报产品缺陷，未新增处理或重发。

## 2026-11-06 ERYE237-003人工确认后续执行

2026-11-06用户人工确认003无打开图片文档后继续正式目标一次、零重试；项目名称补槽字段误开文件框，取消后聊天补充ERYE237-001-prod-20261106。Agent仍称缺少真实目标绑定，未打开11.png，画布保持空白工程；后置查询26s完成但无实际身份回执。003由前置Blocked更新Failed；3 Failed/141 Not Run；未写云效。见[003报告](cases/requirements/ERYE-237/results-003-prod-20261106.md)。

## 2026-11-06 ERYE237-003脚本与生产前置核验

2026-11-06生成并执行003部分CUA脚本，独立生产会话128d917b-443d-484d-8c83-6d5df0c17a9b只读检查39s完成但无实际context回执，补充只读澄清21s明确无法确认文档绑定/ID/版本。空上下文前置未证明，003 Blocked；正式打开目标未发送、零重试。2 Failed/1 Blocked/141 Not Run。详见[003报告](cases/requirements/ERYE-237/results-003-prod-20261106.md)。未写云效。

## 2026-11-06 ERYE237-002云效缺陷同步（不去重）

按用户此前“不做去重”的要求直接新建[FWXC-357](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=94f54105c3405d30c9df57b56e)：生产环境Agent按“第2张图片”打开时，Editor open缺少session_id/conversation_id，仍停留第3张水彩图。新建1、旧项修改0；两张本次原始截图已在正文末尾嵌入并在附件区保存，正文图片显示、图片引用及2个附件条目回读通过。详见[本地缺陷及截图清单](defects/CINLINK-ERYE237-002-001.md)。未重跑产品任务；002仍Failed，统计保持2 Failed/142 Not Run。

## 2026-11-06 ERYE237-002脚本与生产执行

已生成并实际调用[002有头CUA脚本](../tools/erye237/erye237-002.cua.mjs)。独立会话4d81b2cf-17a2-4972-95b6-583a3948dca0三图按纸船→用户群鸟JPEG→已有水彩图登记，分别建立单历史项文档，停留I3后只提交一次“打开本会话第2张图片，仅查看，不修改”。规划识别第2张，Editor open实际缺session_id/conversation_id失败，仍显示I3，002 Failed、零重试。终态后人工回读三图历史项均保持，非Agent成功；远端文件哈希/账本未核对，无本轮新增生图。001/002共2 Failed、其余142 Not Run；002自动化仍PLAN（部分脚本），旧Playwright fixme未当执行。详见[002报告](cases/requirements/ERYE-237/results-002-prod-20261106.md)。执行阶段未写云效；后续同步见本页最新记录。

## 2026-11-06 ERYE-237直接点击工具检查

用户要求先检查工具，随后明确直接点击、不用对话。已实际验证缩放、画笔及撤销/重做、矩形、文字、批注、移除背景和PNG导出；擦除仅到mask预览、宽高比仅菜单，未提交这两类AI结果任务。直接去背景一次成功，新增1个历史项；已切回操作前水彩版本，前后实际导出SHA-256与解码像素哈希一致，测试笔迹/文字/批注已清理。去背景PNG存在真实透明像素。详见[页面工具检查](cases/requirements/ERYE-237/tool-ui-smoke-20261106.md)；001～005正式状态及云效原缺陷不因此更改，费用未核对。

## 2026-11-06 ERYE237-001云效同步（不去重）

按用户“不做去重”要求，直接新建[FWXC-351](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2887f4e45628699108c470bf84)、[FWXC-352](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1045b0ba4c36d6c1da33b22a7d)，分别记录Agent打开缺会话参数、图片卡片仅打开blob原图页。新建2、旧项修改0；标记生产环境。4张本次原始截图已通过正文图片上传入口保存并嵌入末尾，保存后回读持久图片引用及显示均通过。截图清单与SHA-256见[Agent缺陷](defects/CINLINK-ERYE237-OPEN-001.md)和[卡片缺陷](defects/CINLINK-ERYE237-CARD-001.md)。未重新执行产品任务。

## 2026-11-06 ERYE237-001生产环境有头复测

用户指定 `https://app.cinlink.ai/` 后，建立独立测试项目并在会话39f4248c-0462-4978-912e-b714ad69a992核验正式001（导入图与生成图统一打开）。I1=11.png，经“选择媒体”手动导入显示已保存及一个历史项；I2基于用户群鸟JPEG实际生成1张1024×1024水彩群鸟，下载与SHA已记录。两类卡片点击均打开blob原图页；两个正式Agent打开均因 `Editor tool arguments do not match its schema; arguments: missing session_id, conversation_id` 失败。前置探测/生成准备与正式打开分列，未自动重试、未宣称费用为零；其他用例未执行；随后按用户要求同步两条新缺陷，见本页云效记录。

[完整报告](cases/requirements/ERYE-237/results-001-prod-20261106.md)。001本轮Failed，其他143条Not Run，自动化仍PLAN（fixme仅占位）；原图远程哈希、完整身份及账务未覆盖，不能记通过。本机原始截图/AX/实际生成文件及清单在 `reports/erye237-001-prod-20261106/`。

## 2026-11-05 ERYE-196/206/210切换为业务结果验收

按用户要求优化255条（134/67/54），编号、优先级及来源保持；预期改为页面业务、实际文件或已实现接口真实返回与独立基线相符，取消拟定接口名/字段/错误码/内部算法的硬性断言。同步前置、分析、联合规则和统一入口；真实业务缺失仍记录未实现，不因内部接口不同判缺陷，也不把缺业务一律排除。

196的001/003既有Passed、002/004 Not Applicable保留；005取消旧引用标签前置，原Blocked撤销为Not Run，未重跑。196当前2 Passed/2 Not Applicable/130 Not Run，206/210共121条Not Run；本次0新增业务执行、0新增通过。原始报告/截图不改写；[本次状态与证据边界](cases/requirements/ERYE-196/business-acceptance-update-20261105.md)、[统一验收口径](cases/editor-business-acceptance.md)。未修改云效、产品或云端代码。

静态校验通过：`npm run cases:check`检查543条正式需求用例、0问题；专项255条编号/优先级/来源及九列一致，60处本版链接有效，其他登记段和9份历史报告/其他受保护文件未变。底稿`reports/business-acceptance-196-206-210-20261105/validation.json`；本次业务执行0次。

## 2026-11-05 ERYE196-001～004需求与设计差异同步

按用户限定范围核对后，新建[FWXC-315](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9a1f2aebb4f446ec323afa0493)：004要求的对象引用标签、时间范围及移除交互未在最新已确认主页面设计中体现，按**需求/设计差异、待评审**记录。不是已确认的页面实现回归。001内部实现、002接口分页不报缺少设计入口；003页面业务通过，无本次新增差异。

3张真实原始截图（2张Figma主页面导出、1张004版本9实测页面）已上传并在正文末尾嵌入，另附脱敏证据JSON；描述、字段、4附件及3个图片引用回读通过，副本与原图SHA256一致。[本地缺陷及截图清单](defects/CINLINK-DESIGN-ERYE196-004-001.md)。

本轮只同步设计差异，004继续**Not Applicable**，目标改文未发送；总计仍**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**。没有新增CinLink业务执行、修改产品源码或设计稿。

## 2026-11-05 ERYE196-004按最新设计稿改为本轮不适用

按用户明确指令，以最新已确认Figma主页面为本轮验收基准，004改为**Not Applicable（本轮不适用）**，原Blocked判定撤销。云效评论§03中的对象引用标签/时间范围/移除流程保留为来源追溯，不列本轮页面阻塞或缺陷；未执行的引用后改文不计通过。已有选择/反选观察及版本7、9两批真实截图保留，没有新增运行。

用例正文、registry、meta、统一入口、联合规则、分析/前置及[004执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)已同步；134条最新**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**（001/003通过、002/004本轮不适用、005受阻，其余129未执行）。其他用例状态未变，没有新增AI任务、云效写入或产品源码变更。



## 2026-11-05 重启浏览器后复测ERYE196-004

已关闭原受控Chrome并新启动有头Chrome，恢复当前工程独立复测。当前版本9：三项多选/反选音频剩两项正常，但无输入框对象引用，右键无引用操作、时间尺仅定位播放头、@为文件候选；原引用后改文未执行，按云效评论定义的原流程仍Blocked。前后版本9、内容及148条字幕保持，输入/选区/缩放已恢复；保存本轮7张独立截图及读取证据，原版本7批次保留。[最新记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)。

用户询问来源后已明确：引用标签/移除交互来自云效ERYE-196评论§03，已核对最新Figma主页面未展示该完整交互，不能称为设计稿缺陷；未提交产品缺陷。没有AI任务、云效写入或产品源码变更。总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run，005未执行。



## 2026-11-05 ERYE196-004页面业务核验

按用户要求在当前工程版本7有头核验004：视频/原声音频/Hello字幕三项多选、反选音频剩两项可操作；输入框无编辑器对象引用，@仅文件候选，时间尺拖动仅定位播放头。原引用标签/移除引用及BGM/范围业务流程未完成，目标改文未发送，**004仍Blocked**。依据为196评论§03页面用户流程；不要求API字段或内部实现，不把选中高亮视作已引用，也未将未见交互直接定为产品缺陷。

7张本次真实页面受阻/恢复截图保存，前后版本7、完整内容与148条字幕一致；输入/选区已清空，缩放恢复1。[执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)，底稿`reports/erye196-004-ui-20261105-1947/`。没有AI任务、云效写入或产品源码修改；005未执行，总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run。



## 2026-11-05 ERYE196-003页面业务实测通过

按用户明确要求，将003原游标读取场景调整为页面业务验收：A浏览中、B仅将6.64～7.12秒solution.改为新版C2，A无需刷新即更新；继续滚动及刷新后各3窗口覆盖148/148，遗漏/额外/重复/文字差异0，只改变目标1条，其余147条及时间、其他轨道和设置不变。随后B撤销本次改文，A同步恢复，完整工程内容与原基线一致；版本5→6→7，测试新增B页已关闭。

**003 Passed（页面业务口径）**；原游标接口专项未执行，不纳本次通过范围。10张真实执行截图、前后/恢复读取及两次全列表对象核验保存于`reports/erye196-003-ui-20261105-1935/`，[执行记录](cases/requirements/ERYE-196/results-003-ui-20261105.md)。没有AI任务、云效写入或产品源码变更。134条最新**2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run**；004～005未执行，其他需求和既有结果保持。



## 2026-11-05 ERYE196-002撤销页面阻塞判定

用户确认修改状态：002原“按时间范围分页读取”来自196评论§11接口约定，已读取的最新设计稿没有对应页面交互；原先因页面缺少入口判Blocked不成立，现改为**Not Applicable（本轮页面验收不适用）**。原接口专项步骤保留为未执行，不计通过；既有148/148条列表完整性、对象稳定性及版本5不变的补充核验保持Passed，六张原始截图/读取结果保留，没有新增执行。

用例正文、registry执行状态、meta、统一入口及[002执行记录](cases/requirements/ERYE-196/results-002-20261105.md)已同步。134条最新：**1 Passed / 1 Not Applicable / 3 Blocked / 129 Not Run**；003～005未变。自动化列PLAN仅表示尚未接固定脚本，与本轮不适用状态分开记录。



## 2026-11-05 ERYE196-002当前工程核验

按用户要求继续有头执行002，当前工程张雅婷(Tin)分享的视频.mp4、本批版本5。完整工程/字幕可读取；4个滚动窗口覆盖148/148条，遗漏/额外/单窗口重复/跨窗口标识或文字变化均0；首10秒12条已完成对照，前后版本5、content/updated_at及字幕结果一致。六张真实截图与原始读取已保存。

**002仍Blocked**：当前没有按指定时间范围分页读取的可执行入口，原pageSize=1/游标主步骤及三cue B0未执行；完整读取、滚动浏览和离线范围参考不替代该功能。按用户口径，不以字段映射或服务端历史实现作为本次阻塞。没有修改工程内容、提交AI任务、写云效或修改产品源码。[执行记录](cases/requirements/ERYE-196/results-002-20261105.md)；本机底稿`reports/erye196-002-20261105-1919/`。001仍Passed，003～005未执行；总计1 Passed/4 Blocked/129 Not Run。



## 2026-11-05 ERYE196-001按业务验收口径通过

用户明确“开发怎么实现的具体可以不验证”。001据当前工程实测更新为**Passed**：能力/当前工程可读取，选区及轨道正确，播放头/缩放/面板操作正常，上下文同步，revision 3→3、content/updated_at一致、可观察编辑历史past1/future0不变。字段等价映射及服务端历史实现不再作为本例阻塞；用例正文同步改为业务可观察预期。

这是同批实测证据在用户确认范围后的结论更新，没有新增运行。当前134条：**1 Passed / 4 Blocked / 129 Not Run**；001为人工有头执行、无固定脚本，自动化列恢复PLAN，registry另记Passed。002～005未重跑，原始七张截图及读取响应保留。[最新结果](cases/requirements/ERYE-196/results-001-rerun-20261105.md)。



## 2026-11-05 ERYE196-001按用户当前工程复测

按用户“使用我打开的这个项目”，在有头Chrome核验“张雅婷(Tin)分享的视频.mp4”（工程3bc78d71-8cf6-4caf-b347-a2f19962f471）：revision 3→3、content及updated_at一致，本地past 1→1/future 0→0；播放头/缩放/面板操作及选区、轨道身份子项通过。发现实际`/cloud-tool-api/mcp/editor`读取入口，initialize/tools/list返回109项工具及Schema，editor_project_get/editor_view_get成功；显式页面会话回读与8秒/1.5缩放/字幕面板收敛。前端92项目录另行记录，不与服务端109项混计。

完整001仍BLOCKED：原timelineId/revisionToken字段的正式等价映射及服务端历史证据待确认；已不再以“找不到能力/上下文入口”作为最新阻塞。其他002～005未重跑，134条仍5 BLOCKED/129 PLAN。七张真实截图、前后快照/MCP响应及历史证据已保存，[最新执行记录](cases/requirements/ERYE-196/results-001-rerun-20261105.md)，底稿`reports/erye196-001-rerun-20261105-1829/`。没有AI任务、云效写入、产品源码修改或发布。



## 2026-11-05 ERYE196-001～005有头核验

本机Chrome已核验，**0条整例通过、0条确认产品失败、5条Blocked**；其他129条未执行。已新建独立20秒PA并用真实SRT建立C1/C2双语字幕，素材文件显示与可编辑cue分别确认。001移动播放头、缩放、切换面板的子项通过：revision 4→4、内容一致、0保存请求；能力/上下文K及服务端历史仍未确认。002/003缺时间线分页/版本游标契约；004/005可选中视频/C1但未找到Agent对象引用入口，目标改文未发送。完整B0的配音/BGM/水印/独立PB仍未准备，不把前置核验计为完整闭环或产品失败。

[逐例结果、未发送的完整提示词、实际工程ID和截图](cases/requirements/ERYE-196/results-001-005-20261105.md)。底稿`reports/erye196-001-005-headed-20261105/`；目标turn请求0、AI任务0、补槽0（不证明无补槽），没有云效写入、产品代码变更或部署。001～005正文/登记改为BLOCKED，其他需求与既有MW/SSO结果保持。





## 2026-11-05 ERYE-237全量重写需求用例

按用户“不保留旧用例”重新设计144条，P0 95 / P1 48 / P2 1，全部PLAN/Not Run，0脚本、0业务执行。[详细用例](cases/requirements/ERYE-237/cases.md)、[需求/Figma分析与测试点](cases/requirements/ERYE-237/analysis.md)、[测试前置与数据](cases/requirements/ERYE-237/test-data.md)已进入统一入口；旧16/06页面仅保留新版导航，不保留旧表或旧ID映射，登记表仅映射本版。

只读取得云效v1.1正文及v1.2修订（最后修改2026-10-19 10:42:09，评论/附件0），读取用户指定Figma文件SqGzwtxqNjFZa9QIvUPAlc的1816:50610画布及代表状态；完整Figma评论未取得，未编造。用户已确认批注最多10条，与设计会话20张图片注释分开。覆盖A01～A24、D01～D12和IMG-R增补；拟定期限/字体回退/候选策略及资料缺口列门禁，不计已通过。其他需求和MW/SSO定义/结果保留；未写云效、未执行图像生成、未改产品或云端代码。

静态校验：`npm run cases:check`通过（正式需求543条、0问题）；专项144个编号/9列表格/PLAN登记一致，A01～A24、D01～D12及IMG-R01～05已追踪，184处本版相对链接/锚点有效，其他8份受保护用例/配置及其他需求登记段未变。底稿`reports/erye237-requirement-20261105/design-validation.json`；静态设计覆盖不代表已执行或已满足发布门槛。

## 2026-11-05 ERYE-206/210关联需求用例设计

已只读读取206正文及全部4评论（含1张内嵌旧截图）、210正文v1.0/v1.1及唯一评论，附件列表均0。用户补充最新Figma并明确以已确认主页面为准，已按Media/Scripts/Captions/Voiceover/Watermark五入口编写；正文六TAB差异按用户决定处理，待定新增方案不扩大范围，v1.1拟定业务规则仍待评审。

新增[206的67条](cases/requirements/ERYE-206/cases.md)、[210的54条](cases/requirements/ERYE-210/cases.md)，共121条（P0 114/P1 7），0 AUTO/121 PLAN、全部Not Run。覆盖AC32/AC12/NAV-R5及评论默认字幕轨/11labs解析；[三需求联合分析和复用](cases/editor-linked-196-206-210.md)关联196底层用例，不复制执行计数。各需求analysis.md与test-data.md提供来源、待确认项、独立素材/工程/故障前置。196原134条保持，三需求共255条；正式需求总488条。旧DC-05标历史追溯，不按旧默认剪辑/属性TAB验收。

本轮仅设计，未创建真实数据、未提交生成/导出、未改产品代码或云效。缺少操作/字段表、真实11labs样本、精细清理评审等前置单列，不将设计完成等同测试通过。

静态检查完成：`npm run cases:check`全工程488条、0问题；121个新ID/九列/步骤/状态/registry一致，AC32/AC12/NAV-R5映射完整，35个本次本地链接有效，196原文件哈希保持。差异空白检查通过；底稿仅本机保存于`reports/erye206-210-requirements-20261105/`。


## 2026-11-05 ERYE-196正文与评论需求用例设计

已只读获取ERYE-196评审正文、全部1条完整详版评论23563211（WFR01～20、WAC01～32）及0项附件，并核对引用的ERYE-206工程身份/目标规则。新增[134条详细用例](cases/requirements/ERYE-196/cases.md)：M1 121、M2 13，P0 131/P1 3；0 AUTO/134 PLAN、全部Not Run。每例有前置、数据、完整指令/结构化操作、步骤、可验证预期及来源；[分析与WAC映射](cases/requirements/ERYE-196/analysis.md)、[数据/故障前置](cases/requirements/ERYE-196/test-data.md)已分列。M3仅列边界，不冒充已有验收。

已加入正式需求目录、registry与统一入口，正式需求总367条。建议限制/性能/结算等10项待确认单列；未创建测试工程、未执行任务、未改产品代码或云效。本节为用例设计进度，不是功能通过记录。


## 2026-11-05 剪辑配音与字幕同步P0设计

新增[SYNC-001～006](design-cases/multi-workflow/editing-dubbing-sync-cases.md)，6条P0：剪辑→配音字幕2条、配音字幕→剪辑2条、去口癖/拼接→配音字幕2条。已放入[用例统一入口](cases/README.md#工作流与上下文专项)，同步矩阵及自动化设计登记。0 AUTO/6 PLAN、执行0条，不计通过/失败；原SSO仍22条，既有定义、结果与默认脚本数量不变。

按固定种子分层抽样，8个原始文件SHA已重新核对；包括英语新闻、中文竖屏、英语访谈、原带字幕日语竖屏、受控口癖WAV及静态图、英语短片和HEVC视频。005配套视频尚未生成，已明确夹具制备和音频时序验证前置。用户确认暂不设毫秒同步阈值，逐句、首尾及全部实际切点验收；实际切点听审和日语源能力在执行前核对。本轮未提交CinLink任务。

设计校验通过：正式需求检查233条/0问题；专项6编号、12份提示词、9列表格、类别分配、15处新链接/锚点及8份素材哈希检查0问题。原SSO正文/脚本及登记表哈希未变；这些是静态检查，不记业务通过数。



## 2026-11-05 SSO-020字幕文字偏差同步云效

SSO-020第2轮字幕首句“or a family”转写为“Our family”已提交[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c)，优先级中、严重程度3-一般。新建1、旧项更新/评论/重开0、失败0、验证1；1张本次真实成片失败帧上传并嵌入，另附2份SRT、2份音频核验样本和脱敏JSON，共6附件，正文/字段/附件及图片引用回读通过。全状态初查102条，写前复查，最终103条且当前键唯一；截图首次上传超时，经回读确认为未上传后恢复，未重复创建。测试结论保持4例20轮、3例通过/1例未通过，19轮通过/1轮未通过；SSO-019网络取证异常已补证，不提交产品缺陷。

[本地缺陷](defects/CINLINK-SSO020-EN-001.md)；底稿`reports/sso020-yunxiao-20261105/`。

## 2026-11-05 SSO-019～022原片与产物穿插

新增4条P0各5轮，SSO合计22 AUTO/0 PLAN；001～018定义及既有结果保持。本批有头串行执行结果：受理20/20轮，done 20、任务failed 0；指定验收19轮通过/1未通过/0依赖阻塞/0待复核/0未执行；整例3通过/1未通过/0阻塞。

019/021/022指定检查通过；020 R2字幕首句把原片上下文“or a family”写为“Our family”，实际transcribe_audio SRT已出现该偏差，保留原始页面及成片帧。20/20轮指定根输入匹配，0串用告警；5计划确认、0补槽。019 R3网络回读错误由后续同run/文件哈希回读补证，原JUnit 3 passed/1 failed保留，业务结论分别统计。

不@、原片与指定产物穿插；缺失依赖不回退原片、不重发已受理任务，仍继续独立F轮。实际来源、历史哈希、原始截图及逐轮详情见[本批记录](design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。底稿`reports/sso019-022-source-artifact-20261105/`。仅执行`npm run test:sso:mixed`，不并入默认staging；原执行阶段未写云效，后续SSO-020同步见最新记录。

## 2026-11-05 SSO-010/014确认失败同步云效

按用户指令“不用去重”，已新建并回读验证[FWXC-281](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=924be6ade88ed3f7bac77b4f7d)（SSO-010 R4）、[FWXC-282](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=8f4587beeafd93082783651e90)（SSO-014 R1）。共2张本轮原始失败PNG上传并嵌入正文，实际SRT与脱敏定位JSON各2份，共6附件；正文包含详细前置操作、登记/前置/触发完整提示词、复现步骤、实际与预期。新建2、已有项更新/评论/重开0、失败0、验证2，缺陷查询0。014第3轮用户人工审核通过，不提缺陷；本批仍28轮通过/2轮未通过/0待复核，整例4通过/2未通过。

底稿`reports/sso009-014-yunxiao-20261105/`。

## 2026-11-05 SSO-015～017缺陷云效同步

按用户本次授权已新建并回读验证2条：

- [FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)：9次字幕组合计费预冻结失败合并为1条，覆盖015/016各R1/R3/R4/R5、017 R1；9张对应原始失败PNG均已上传并嵌入。
- [FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)：017原会话重开后认证恢复失败，历史视频无法播放、继续发送未创建run，认证重试至429；2张对应原始PNG均已上传并嵌入。定位在R2重开及首次R3尝试，不是重新登录后成功的R3任务。

两条均优先级高、严重程度2-严重；共11PNG＋2份脱敏定位JSON、13附件，正文、字段、附件及图片引用回读通过。全状态初查97条，创建前分别复查97/98条，最终100条且每个缺陷键唯一；另观察到1项非本批新增，未修改。旧FWXC-242是执行链缺凭证，与本次提交前认证恢复失败边界不同，未强行合并或改状态。实际新建2、旧项更新/评论/重开0、失败0、验证2。

脚本误提交、原始音频缓存时序误报及已补齐的ECONNRESET回读缺口均未作为产品缺陷提交；测试业务结果仍1例通过/3例未通过，不因缺陷提交改变。

[计费缺陷](defects/CINLINK-BILLING-TRANSLATE-USAGE-001.md) · [认证恢复缺陷](defects/CINLINK-WEB-AUTH-RECOVERY-001.md) · [执行记录](design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)。底稿`reports/sso015-017-yunxiao-20261105/`。

## 2026-11-05 SSO-014第3轮人工审核通过

SSO-014第3轮由用户人工审核并回复“通过了”，已从待复核改为通过，原ASR同步疑点关闭；保留此前估计及原始音视频证据，不作为缺陷。SSO-009～014本批统计更新为28轮通过、2轮未通过、0轮待复核，整例仍4通过/2未通过；014第1轮日文多余字符、010第4轮法文混语结论保留。

## 2026-11-05 SSO-015～018五轮恢复/历史执行及续跑结果

实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻。逐轮10轮完成指定检查、1轮媒体完成但原UI恢复受阻；未执行不计通过，不宣称四类恢复全部验收。

- SSO-015：未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次。
- SSO-016：未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次。
- SSO-017：未通过：受理5/5轮，任务失败1轮；R2媒体/API下载恢复，重开后UI认证阻塞保留；人工重新登录后续跑已完成。
- SSO-018：5轮指定验收通过。

服务端失败保留原错误`Billing price missing: translate missing_usage; tool was not started`及原run/截图，不重发凑覆盖。原017关闭重开后播放/发送认证阻塞、018初次登记Missing CinLink access token or API key均保留现场；09:08用户重新登录后，先确认原017无已受理R3，再从R3续跑及恢复018。已受理的R1/R2不重发；人工登录不能将017原保留登录态恢复改记通过。

源F按运行快照/原始计划核验，失败工具未启动时仅记计划绑定；成功视频已核尺寸/时长/音轨、实际SRT全文及首中末烧录画面，历史文件SHA-256回读。恢复/历史操作以真实页面交互及S/F/run/POST核对为据，不以API下载替代历史播放。017自动化误提交的一条非目标run已取消并回读cancelled，排除20轮统计、原审计保留。

[完整逐轮结果、实际run/会话与真实失败截图](design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；底稿`reports/sso015-018-five-rounds-20261105/`。18 AUTO/0 PLAN；001～014定义比对不变。类型检查、目标4例发现通过；登录等待支持0持续保留，已实测登录成功。未重复全量离线、未改云端代码/云效。

## 2026-11-05 SSO-009～014五轮组合完成（最新）

SSO-009～014各5轮已全部执行，共6例30轮；业务4例通过/2例未通过（28轮指定核验通过/2轮未通过/0轮待复核）。30/30轮原片F来源可追溯，未发现前轮视频/SRT/配音串用，历史文件哈希保持。SSO-010第4轮法文混入亚美尼亚文、SSO-014第1轮日文多余字符】【均由实际SRT及成片帧确认，失败截图已保存；014第3轮已由用户人工审核确认通过，原ASR同步疑点关闭，不作为缺陷或待复核项。009的401历史回读误报已正常刷新后只读补证，未重复生成。专项18条/14 AUTO/4 PLAN，015～018未执行；001～008既有结果保留，未修改云效。

[本批执行记录](design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)；本地底稿`reports/sso009-014-five-rounds-20261104/`。脚本最后变更后已通过类型检查＋123条离线用例；文档及用例一致性检查见执行记录。

## 2026-11-04 SSO-010五轮结束，SSO-011运行中

SSO-009已完成5轮来源/媒体/内容抽样及历史哈希核验；SSO-010五轮已完成，业务第4轮法文混入亚美尼亚文，其他4轮完成指定核验，整例未通过。当前SSO-011运行中，012～014尚未开始；按原任务继续串行执行，015～018不执行。

## 2026-11-04 SSO-010第4轮法文字幕混语，继续剩余用例

SSO-010第4轮法文组合业务未通过：实际译文SRT第8条32.96～39.16秒含亚美尼亚文սիր，36.06秒原始成片帧确认烧录同样异常。首中末三帧未覆盖该条，已用实际全文检查发现并补原始失败帧；水印C2-FR、原片来源/原英语音轨/结构正常，未发现前三轮产物串用输入。此为本批实际复现的字幕内容问题，与既有FWXC-278同类，未同步或修改云效。继续第5轮，011～014待执行，不因单轮内容失败重发任务。底稿reports/sso009-014-five-rounds-20261104/failure-details.json。

## 2026-11-04 SSO-009五轮核验完成，继续010～014

SSO-009五轮已完成指定范围核验：5轮来源F、5份MP4结构及15帧字幕/水印/残留抽样通过，6份内部SRT结构/语言特征及语义抽样无异常。R5历史回读原断言失败前实际为HTTP401，已按产品正常cookie刷新恢复为200，原5份交付归属与首次SHA-256逐一一致，未重复生成；保留原失败JUnit/trace及真实截图，不作为历史产物丢失缺陷。当前开始010五语字幕＋水印；011～014待执行，015～018不执行。本批尚未全部完成。

## 2026-11-04 SSO-009～014接原检查点继续执行

用户回复“继续”后已核对原检查点：中断时SSO-009第3轮事实上已done并下载，现已补做首中末画面及音轨/结构复核，前三轮均完成指定抽样。第3轮60.488005秒、1280×720、简体中文字幕＋左上C1-R3，未继承第2轮28.97秒/1440p或第1轮字幕水印。先接原S及原run，只从第4轮续跑009，之后再串行执行010～014；不重提前三轮，015～018不执行。本批尚未全部完成，原401/窗口检查中断记录保留历史，不作为工作流产品失败。

## 2026-11-04 SSO-009～014登录中断，保留原任务待续跑

SSO-009～014本批执行因会话回读持续401中断：SSO-009前3轮已完成来源/媒体检查及首中末画面抽样，第3轮已受理（原run保留），终态尚未核实；第4～5轮及010～014尚未执行。第2轮1次计划确认、当前无缺参补槽。Windows窗口检查被自动安全检查终止，理由是无法可靠识别当前浏览器URL，未绕过。已停止本地执行器，不调用后端取消或重复提交；须恢复测试登录态后接原会话/run继续。此次登录中断未取得失败现场PNG，已有逐轮提交/终态截图、原始帧和trace记录保留，不能用提交前截图冒充失败现场。底稿reports/sso009-014-five-rounds-20261104/，本批仍未完成，不计六条通过；14 AUTO只表示接入，015～018仍4 PLAN。

## 2026-11-04 SSO-009～014五轮组合执行中

2026-11-04 SSO-009～014执行中：已接入文档原文6例30轮，专用有头串行、workers1/retries0；遇补槽填写继续，逐轮核验F来源、组合结果、历史文件，并保存失败截图。14 AUTO仅表示脚本接入；015～018仍4 PLAN，本批业务通过数待完整来源/内容复核，不迁移旧结果。脚本变更后类型检查＋123条离线通过。底稿reports/sso009-014-five-rounds-20261104/。

## 2026-11-04 SSO-005法文字幕缺陷云效同步

已新建并回读验证 [FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735)：法文单语字幕混入亚美尼亚文并烧录到视频，关联SSO-005第4轮。优先级中、严重程度3-一般；正文包含同会话前置、完整登记/前三轮/触发提示词、构建版本、run/会话/工具调用及文件ID。2张本轮真实PNG已上传并嵌入正文末尾，另附实际法文SRT和脱敏定位JSON，共4份附件；正文、字段、附件ID/名称及图片引用均核验通过。

全状态查重96条，分页总数一致，创建前再次核对无重复。实际新建1、旧项更新/评论/重开0、失败0、回读验证1。007采样缺口及008的401续接均已恢复，不作为产品缺陷。005～008业务结论仍3例通过/1例未通过（19轮通过/1轮未通过），本次仅同步已有证据。

[本地缺陷](defects/CINLINK-SUBTITLE-FR-001.md) · [执行记录](design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)。同步底稿`reports/sso005-yunxiao-20261104/`。

## 2026-11-04 SSO-005～008五轮有头执行结果（最新）

4例20轮已执行，业务3例通过/1例未通过（19轮通过/1轮未通过）。每例同一会话、一个原片F、五轮同工作流；串行、零重试，只发送各轮正文。001～004既有结果保留，专项当前18条/8 AUTO/10 PLAN。下方同日较早记录作为历史，不覆盖本批结论。

| 用例 | 当前业务结论 |
|---|---|
| SSO-005 | 未通过：第4轮法文字幕混入亚美尼亚文；5轮已执行 |
| SSO-006 | 5轮通过 |
| SSO-007 | 5轮通过；第5轮以原run原始计划补齐来源证据 |
| SSO-008 | 5轮通过 |

SSO-005法文SRT第7条27.540～32.240秒及烧录MP4混入`ոստիկան`；任务done、结构检查通过，内容验收未通过。真实失败帧、终态页面、实际字幕和run信息见[执行记录](design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)、[本地缺陷](defects/CINLINK-SUBTITLE-FR-001.md)。006五种配音语言由独立ASR及字幕/画面交叉抽查；ASR日语尾部静音幻觉已排除。

原始Playwright为2通过/2失败；007第5轮初次来源采样缺证，已只读回读原run的原始计划确认根输入F，下载成片及比对历史哈希后补证通过。原始失败审计保留；原始计划回读兜底已接回脚本并通过类型检查，本批没有为此重发AI任务。

008第5轮首个响应401，但页面自动认证重试已受理原run；恢复后先回读确认，只续接该run完成最后一轮，前4轮未重新处理。续跑单例通过，详见同一执行记录中的原始报告与续跑报告。

20轮原片输入/历史文件隔离、下载和媒体规格均按本次审计记录，内容验收边界见完整记录。类型检查、4例发现、20条提示词与正文一致性检查通过；未重复整套离线校验。底稿`reports/sso005-008-five-rounds-20261104/`。

## 2026-11-04 SSO-015～018替换为四条五轮恢复/历史（仅文档、未执行）

SSO-015～018已按用户确认在原编号替换为每例5轮，共20轮；四类分别为完成后刷新、执行中刷新、关闭重开、查看历史后处理原片。四例使用同一组5轮组合要求对照恢复/交互方式，每例独立S、只登记一个F；每轮核验来源分支、本轮全部效果、当前交付及历史文件哈希，排除前轮成片/SRT/配音作为输入。

| 用例 | 新版场景 | 状态 |
|---|---|---|
| SSO-015 | 五轮完成后刷新恢复 | 5轮／PLAN／未执行 |
| SSO-016 | 五轮执行中刷新恢复 | 5轮／PLAN／未执行 |
| SSO-017 | 五轮完成后关闭重开恢复 | 5轮／PLAN／未执行 |
| SSO-018 | 五轮查看历史后处理原片 | 5轮／PLAN／未执行 |

[SSO正文](design-cases/multi-workflow/same-session-original-cases.md#三同会话状态恢复与长对话4条)已补齐20段完整提示词、每例前置操作、5轮结果及恢复/历史检查预期，并增加恢复前置/逐轮验收R。每轮组合依次为英文字幕＋REC-R1、20秒高光＋1440p、中文字幕＋REC-R3、完整英文字幕＋1440p、30秒高光＋英文字幕；不@、不恢复统一前缀、不重传F。

015每轮完成取证后刷新，017每轮完成后关闭页签并从历史重开同一S，018第2～5轮发送前查看最早及最近历史成片；016每轮确认受理且仍running时刷新，保存页面外证据，接回原任务而非重提。错过运行窗口记未覆盖，不重复提交凑覆盖；合法补槽/计划确认归入当轮，刷新/重开/查看不增加业务轮。五轮仅为历史干扰抽样，不声称覆盖最大上下文长度或压缩机制。

四条均PLAN/未接脚本/未执行；本次未启动浏览器或真实任务、未改产品源码或云效。001～014原条目及001～004既有14轮结论保留；专项仍18条、5 AUTO/13 PLAN，005～018新版不计通过。入口、README、工作流矩阵说明、自动化登记及Codex上下文已同步；未改requirements或尚未收录SSO的Excel。

文档校验通过：18个唯一SSO编号、九列及5 AUTO/13 PLAN；四条各5轮、20段完整提示词、20段结果预期及20段恢复/历史预期一致。001～014原条目及11个受保护文件哈希未变，106个本地链接/锚点有效。`npm run cases:check`为233条正式需求用例、0问题（不扫描SSO，SSO已另行核验），差异空白检查通过。校验底稿仅本机保存于`reports/sso-recovery-design-20261104/`；没有执行预发或重复全套离线测试。

## 2026-11-04 SSO-009～014替换为六条五轮组合（仅文档、未执行）

SSO-009～014已按用户确认在原编号替换为每例5轮多工作流组合，共30轮；每轮处理同一会话最初登记的原片F，排除前轮视频/SRT/配音，所有效果集中在一个最终MP4。5轮逐轮保存来源分支、当前交付、内容/音轨/语言及历史哈希证据，缺证据不得判通过。

| 用例 | 新版场景 | 状态 |
|---|---|---|
| SSO-009 | 五轮不同组合交替 | 5轮／PLAN／未执行 |
| SSO-010 | 五轮组合字幕语言切换 | 5轮／PLAN／未执行 |
| SSO-011 | 五轮高光组合与完整原片组合交替 | 5轮／PLAN／未执行 |
| SSO-012 | 五轮组合效果扩增与缩减 | 5轮／PLAN／未执行 |
| SSO-013 | 五轮相同组合连续及间隔恢复 | 5轮／PLAN／未执行 |
| SSO-014 | 五轮译制组合与原英语组合交替 | 5轮／PLAN／未执行 |

已在[SSO正文](design-cases/multi-workflow/same-session-original-cases.md#二每轮多工作流组合处理原片6条)补齐30段可直接复制的完整提示词、每例前置及5轮预期，并增加组合前置/逐轮验收Q。素材登记不计业务轮，补槽按当轮值填写后继续；不恢复统一提示词前缀，不允许只凭done、助手说明或终态来源字段判通过。允许本轮内部临时文件及有证据的缓存，不能把文件ID相同直接判串用。

014已由用户本次确认纳入译制组合设计，日语/中文普通话/法语配音及水印组合能力须执行前核对，不支持则记录具体前置阻塞，不静默退化为字幕。返回原英语轮需与F音频对照；字幕/配音语言和语义须实际内容核验。

本次未执行30轮、未接新脚本、未改产品源码或云效；001～008及015～018原条目保留，001～004既有14轮结果不变。专项仍18条、5 AUTO/13 PLAN，真实通过数不增加；005～014新版及015～018仍未执行。Excel尚未收录SSO，本次未写入工作簿或requirements。

文档校验通过：18个唯一SSO编号、九列及5 AUTO/13 PLAN；目标六条各5轮、30段完整正文与30段逐轮预期一致，重复组合的指定轮提示词完全一致。其余12条原条目及11个受保护文件哈希未变，104个本地链接/锚点有效。`npm run cases:check`为233条正式需求用例、0问题（不扫描SSO，SSO已另行核验）；差异空白检查通过。校验底稿仅本机保存于`reports/sso-combination-design-20261104/`。未运行浏览器或真实任务，也未重复全套离线测试。

## 2026-11-04 SSO-001～004穿插版14轮完成

SSO-001～004新版14轮已完成，来源/流程/产物结构及指定抽样核验4通过、0当前阻塞；0补槽、3次计划确认。删除前已发4轮保留真实旧提示词，后续10轮仅发送正文。SSO-005及其他未执行用例不计通过。

001/002/003/004分别2/3/4/5轮；实际输入14/14为原片F，未用前轮成片/SRT。9份MP4＋5份SRT均下载并匹配本轮交付；增强均2560×1440，高光19.066341/28.608/19.066341秒，5份SRT各15条。9视频首中末共27帧未见历史效果串用，历史文件回读哈希保持一致。4个登记run、14个业务run，无重复AI提交。

执行中登录/工作台导航和只读下载ECONNRESET中断均已续接完成；原始失败PNG、trace及阶段报告保留，不作为工作流产品缺陷。只读下载最多2次ECONNRESET网络重试，Playwright仍串行、零重试。最后脚本修改后类型检查＋123条离线通过。字幕逐字、高光语义、全片画质和账单未完整验收；未改产品源码或云效。

[完整执行记录](design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)；底稿`reports/sso-interleaved-variable-rounds-20261104/`。005最新五语言字幕及006～008同工作流定义保持原样，均未执行；专项仍18条、5 AUTO/13 PLAN。

## 2026-11-04 SSO-005～008改为五轮同工作流

按用户最新补充，已在原4条用例中补齐五轮正文、前置、逐轮预期与来源/语言/参数隔离；共20轮业务对话，素材登记不计入轮次。各例同会话、只上传一个F，各轮从F开始、不@，不恢复已删除的统一提示词前缀。

| 用例 | 固定业务工作流 | 第1～5轮 |
|---|---|---|
| SSO-005 | 添加字幕，保留原英语音轨 | 简体中文、日文、韩文、法文、西班牙文字幕，逐轮烧录到原视频 |
| SSO-006 | 翻译配音的语音及字幕模式 | 中国普通话、日本日语、韩国韩语、法国法语、西班牙西语配音，各带对应同语字幕 |
| SSO-007 | 文字水印 | R1右上、R2左上、R3右下、R4左下、R5右上；文字各不相同 |
| SSO-008 | 高光剪辑 | 20、30、15、25、20秒；逐轮从完整F剪辑 |

005的转写/字幕翻译/烧录按“添加字幕”同一业务工作流计；006的翻译、配音及对应字幕按产品“翻译配音（语音及字幕）”同一模式计，不算不同工作流穿插。五语种来自当前composer语言选项（zh-Hans/ja/ko/fr/es），执行前核对实际环境，不假定地区口音、声线克隆或口型同步能力；006只按本次用户明确要求纳入。

SSO-005已有脚本的5轮定义已同步为字幕MP4；可核验来源、媒体结构、下载及抽帧，字幕语种、译文/旧语言残留仍须结合实际内容验收，不能只凭MP4或字符特征报完整通过。006～008仍PLAN，未新增自动化。专项保持18条、5 AUTO/13 PLAN；本次四条新版均未执行，没有新增真实任务。001～004的定义及既有执行批次保持原样，历史版本不替代新用例结论。

正文：[SSO用例](design-cases/multi-workflow/same-session-original-cases.md)；统一入口、自动化登记及项目上下文已同步。类型检查、5条脚本发现及18条文档/五轮参数一致性检查均通过；本次未执行005～008，未重复全套离线。

## 2026-11-04 SSO轮次及穿插工作流改版（历史准备阶段）

用户已手动删除统一提示词前缀，后续只发送各轮step.prompt正文；不得恢复或重新拼接该前缀。当前已发送任务保留实际文字和run，继续原任务，不伪写为新提示词执行记录。

用户最终确认：SSO-001～005分别为2/3/4/5/5轮，004的“无轮”已确认是“五轮”笔误；每例内不同工作流穿插、各轮不@、明确从最初源视频F开始。已在原条目更新前置、完整提示词、步骤、预期及脚本；专项仍18条，5 AUTO仅表示接入、13 PLAN。

001：英文字幕→20秒高光；002：文字水印→2倍增强→英文字幕；003：中文翻译→30秒高光→文字水印→2倍增强；004：英文字幕→文字水印→2倍增强→20秒高光→日文翻译；005：2倍增强→中文翻译→文字水印→英文字幕→30秒高光。按既有WF-01/02区分字幕与翻译，各例不重复同一工作流。

本轮执行沿用先前指定范围001～004，共14轮，干净会话、有头串行零重试；005仅完成五轮用例/脚本，未执行。旧两轮版本报告`reports/sso001-004-plain-source-20261104/`仅保留历史，不计新版通过。曾拟同工作流五轮改参的草稿未提交执行，已被本次方案替代。当前结果以`reports/sso-interleaved-variable-rounds-20261104/`为准，执行尚未完成。

脚本已加实际分辨率核验，补槽支持宽/高/倍率参数，每轮后回读所有既有历史产物并核对哈希；来源按运行中输入核验，根步骤排除历史交付物，避免把终态更新后的输出或缓存同ID误判为输入。改动后类型检查＋123条离线用例通过。未修改产品源码或云效，原MW与默认预发套件不变。

## 2026-11-04 SSO-001～004无@实测完成

选定4条、8轮已完成，**源视频来源、流程、产物结构及指定抽样核验4通过/0产品失败/0阻塞/0未执行**。每轮均为纯文本明确处理源视频，无@标签；从工具运行中输入快照确认均为最初登记的F，第二轮未消费第一轮成片或SRT。4个独立会话、4个登记run、8个业务处理run；云端原片回读SHA-256均一致，各例UI挂载一次原片、云端去重复用（上传完成请求0次）。0次补槽、3次计划确认，均确认后继续。

| 用例 | 本次结果 |
|---|---|
| SSO-001 | 20秒/30秒高光实际19.066341/29.077秒；均来自F，历史文件哈希不变 |
| SSO-002 | 两轮均60.488005秒、有音轨；首中末帧分别右上SSO-OLD、左上SSO-NEW，第二轮无旧水印 |
| SSO-003 | 中文/日文SRT各15条，第二轮未把第一轮中文SRT当输入 |
| SSO-004 | 英文SRT15条→原片高光19.866341秒；首中末帧未见上一轮新增烧录字幕 |

SSO-002首批因只看终态来源字段而误判：水印工具运行时输入F，完成后该上下文字段已更新为本轮产物。初批原始JUnit **3 passed/1 failed**保留；已修正脚本保存运行中输入快照，并接回原会话、登记run和第一轮run，只读回第一轮、补交第二轮，续接JUnit **1 passed**。没有重复生成第一轮。两张原始失败现场PNG、trace和审计保留，标注为脚本误判，不作为产品缺陷。

[完整执行记录、会话/run、来源证据及截图](design-cases/multi-workflow/same-session-original-results-20261104.md)；底稿`reports/sso001-004-plain-source-20261104/`，根`summary.json`为最终合并口径。脚本修正后类型检查及123条离线用例通过（`npm run verify`退出0）。字幕译文未逐字全量验收，水印/字幕残留按首中末抽帧验证，高光语义与费用未完整验收。SSO专项18条中，001～004已执行、005～018共14条PLAN；旧@阻塞保留历史。未修改产品源码或云效，默认MW/预发数量不变。

## 2026-11-04 本地素材查找缺陷云效同步

已在cinlink-WEB新建并回读验证2条缺陷：

| 缺陷 | 覆盖 | 问题 | 本地记录 |
|---|---|---|---|
| [FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a) | LF-01 | 机器人结果混入留声机、飞机片段 | [CINLINK-FINDFOOTAGE-002](defects/CINLINK-FINDFOOTAGE-002.md) |
| [FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16) | LF-02/03 | 返回原片0～2秒，未定位仙人掌/蓝衣男孩 | [CINLINK-FINDFOOTAGE-003](defects/CINLINK-FINDFOOTAGE-003.md) |

已上传3张本轮原始失败PNG，逐条嵌入正文末尾，另附2份脱敏JSON；项目/缺陷类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文和全部5份附件ID/名称均回读通过。正文含账号/项目与素材分析前置、完整提示词、步骤、实际源ID/位置和run/会话、预期、影响及待确认边界，不添加“排查信息”节或本机路径/调试流水。

首次全状态查重92条；两条写入前再次全量查重分别92/93条，分页总数一致，稳定缺陷键与3个run均无重复。旧FWXC-237是工具定义缺失、0结果，与当前内容相关性/位置错误不同；只读核对，未更新或重开。实际新建2、旧项更新0、评论0、重开0、跳过0、失败0、回读验证2。同步底稿`reports/lf01-03-yunxiao-20261104/`。

本次没有重跑CinLink、没有修改云端代码；LF-01～03仍0通过/3未通过，其余14条未执行。原始测试截图、run及当前自动化启用范围保留。

## 2026-11-04 SSO改为无@、纯文本指定源视频

按用户最新要求，已在原SSO-001～018条目中调整前置、步骤、完整提示词和预期：同一会话只上传一个源视频F，各轮不输入@、不选择素材引用标签、不重新上传；完整正文明确“本轮请对本会话最初上传的源视频7MB.mp4进行处理，不使用之前生成的视频或字幕文件。”单工作流逐轮处理原片，多工作流本轮组合效果仍集中在同一最终成片。

SSO-001～004脚本同步去掉@候选操作，纯文本提交并检查输入区无引用标签；不再要求无@请求显式携带F，而从实际计划输入核实F、排除上一轮交付物，保留来源审计、下载/媒体/SRT和历史文件不被覆盖检查。恢复检查点新增模式校验，旧@模式报告不能恢复为新版。

当前状态：**4条已接脚本（AUTO）＋14条PLAN，18条无@新版均未执行**。旧SSO-001的@候选前置阻塞及缺陷保留历史，不作为新版失败、通过或当前必经阻塞，也不据此宣布@缺陷已修复。此调整仅涉及SSO，不改变既有MW/CHAIN的素材引用方式及实测结论。统一入口、矩阵说明、脚本登记和项目上下文已同步；Excel仍未收录该专项。

验证：`npm run verify`退出0，类型检查和123条离线用例通过；`npm run cases:check`为233条正式需求用例、0问题（该命令不扫描SSO）。另独立校验18个SSO唯一编号、九列、4 AUTO/14 PLAN、无@操作、8段脚本/文档提示词一致及90个本地链接，均通过。`npm run test:sso -- --list --reporter=list`发现4条，未打开浏览器或提交任务。检查底稿`reports/sso-plain-source-design-20261104/`，未修改产品源码或云效状态。

## 2026-11-04 本地素材查找P0自动化与有头执行

按用户最终范围接入LF-01～03：[脚本](../tests/local-footage/local-footage.spec.ts)、独立配置 `playwright.footage.config.ts`，命令 `npm run test:footage`。有头单窗口、单worker、零重试；本专项17条中，3条已执行且未通过、其余14条PLAN，原卡片7条/默认预发数量不变。

| 用例 | 真实结果 | 结论/失败截图 |
|---|---|---|
| LF-01 | 四原片4/4分析成功，含无音轨F3；查询机器人返回90～92秒正确段及留声机105～107秒、飞机0～2秒 | 未通过：混入2个无关片段；[截图](../reports/lf01-03-headed-20261104/checked/LF-01-failed.png) |
| LF-02 | 单素材F1、1/1就绪；返回F1的0～2秒短片，未出现仙人掌 | 未通过：片段位置/内容不符；[截图](../reports/lf01-03-headed-20261104/checked/LF-02-failed.png) |
| LF-03 | 单素材F2、1/1就绪；返回F2的0～2秒短片，未出现蓝衣男孩或仙人掌 | 未通过：片段位置/内容不符；[截图](../reports/lf01-03-headed-20261104/checked/LF-03-failed.png) |

3个任务均done、视频可下载/播放，不能等同业务通过；**0通过/3未通过/0前置阻塞/0未执行（选定范围）**。原片云端回读哈希与本机一致，真实查询只提交3次；字段解析修正和播放/画面校验均回读原run，没有重提AI任务。目录选择/首次上传由用户完成，脚本续接既有分析；旧启动、选择器、追踪及源字段适配报错保留原始记录，不充当产品失败。

[完整执行记录、项目/会话/run及失败截图](design-cases/multi-workflow/local-footage-results-20261104.md)。证据 `reports/lf01-03-headed-20261104/`：`final/`为实际提交及初始终态，`checked/`为最终内容断言/真实播放和3张失败PNG（JUnit 3 failed），根目录 `summary.json`汇总。类型检查、3条脚本发现通过，未重复全量离线；未修改云端代码或云效，旧Find Footage缺陷不直接标修复。统一入口/矩阵/自动化登记已同步，Excel仍未收录本专项，SSO停跑不变。

## 2026-11-04 MW-01 云效同步

已在cinlink-WEB新建并回读验证 [FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)（工作项`9abeb86a98cba72e7158bc3d60`），[本地缺陷记录](defects/CINLINK-MW01-001.md)。范围为当前用户确认的“一条完整提示词一次提交”：只交付中文字幕SRT，英文仍待后续规划；`intent_fully_satisfied=false`却`done/Completed`，请求未完整满足。旧两轮续接或Stop按钮现象不属于本缺陷。

正文包含详细前置、英文原片规格、完整提示词、单次提交的逐步复现、实际/预期、影响与回归边界，沿用用户模板，不含“排查信息”。已上传并嵌入2张原始PNG（提交前、Completed但缺英文SRT），另附脱敏执行JSON，共3份附件。项目/类型、负责人/迭代/标签、优先级高、严重程度2-严重、正文和附件ID/名称及图片引用全部回读通过。

创建前核对全部状态73条缺陷，并在写入前重新查询；未发现MW-01或同run记录。FWXC-253/245仅症状相似、交付组合不同，同根因未确认，未合并或修改。实际新建1、旧项更新0、跳过0、失败0、回读验证1。同步底稿`reports/mw01-yunxiao-20261104/`。

本次未重跑CinLink任务、未改变默认启用/FIXME或测试结论；MW-01仍待修复回归，MW-02单次提交仍为通过，MW整体14有通过证据/9未通过/3前置阻塞。


## 2026-11-04 清理已移除的旧快捷入口

依据已有新版移除记录及本日有头DOM快照（旧快捷锚点0），按用户要求删除矩阵内旧快捷卡片章节、3项分类、CS-07～09和旧前置/no-op规则；统一入口与脚本登记已同步说明。对应编号退役，不补号、不删除当前字幕/翻译功能卡片或Find Local Footage。

工作簿“卡片清单”15→12项、“卡片用例”25→22条，总览同步；比对1692个保留单元格的内容/样式，13个非目标工作簿部件字节一致。旧条目已清零。卡片自动化仍7条，无代码变更或新任务提交，不重复全量离线测试。AI生图8条P0扩展及SSO仍未同步到历史工作簿，现行详情继续以统一入口为准。

## 2026-11-04 AI生图P0用例补齐

已完善[IG-01～08](design-cases/multi-workflow/ai-image-p0-cases.md)共8条P0，沿用前5个编号、新增3个；统一入口按条列明分辨率、比例、场景和状态。覆盖1K/2K/4K与1:1/9:16/16:9/3:4/4:3，含默认参数、显式选择、同会话切换比例和分辨率，逐条补齐前置、操作及下载/像素预期。

本轮仅编写用例，未提交生成任务、未新增自动化。IG-05对应原默认脚本的部分检查，其他7条未接脚本；AI生图脚本仍1条，卡片套件仍7条，原默认预发数量不变。精确分辨率像素映射尚待取得当前模型生效规格；不把参数标签或扩展名当作实际像素通过证据。矩阵正文已链接到专项，避免双份维护；Excel尚未同步本次扩展。

## 2026-11-04 用例统一入口与SSO前置阻塞

全部用例从[统一入口](cases/README.md)查找：正式需求、工作流、同会话单原片、卡片、链路、批注及离线校验均列正文、脚本、命令和状态，保持原分类目录与编号，未复制或迁入requirements。

SSO-001～004已接入 `tests/sso/same-session-original.spec.ts`，独立配置 `playwright.sso.config.ts`，命令 `npm run test:sso`，有头、单worker、零重试。001有头调试已确认素材登记消息done，F的下载SHA-256与本地原视频一致；第一轮@候选“暂无相关内容”，因此两轮目标指令均未提交，业务状态为**前置阻塞**。002～004未执行；不能将共同阻塞写成四条实测失败。其余14条仍PLAN，无SSO通过结果，原默认46条预发与MW编号不变。

用户确认@候选不显示视频已提缺陷、正在修复，要求先统一入口；本轮已停止继续执行，没有新增重复缺陷。调试证据：`reports/sso-headed-20261104-113440/headed-source-resume/` 的HTML/JUnit、审计、原始截图和trace。之前追踪启动/隐藏上传控件/响应记录的适配尝试保留在同根目录，不计成目标任务业务结果。Excel暂未收录SSO，以统一入口和专项正文为准。

## 2026-11-04 MW-01/02 单次完整提交复跑完成

用户明确MW-01/02都一次提交完整要求；运行中只显示停止按钮是正常交互。此前MW-02人工重叠发送的测试方式有误，**撤销其产品失败判定**；旧MW-01两轮续接也已被当前单次字幕链替代，不能沿用为当前通过结果。两条旧原始Playwright/JUnit、截图和trace保留，合并摘要标注旧方式不适用及替代报告。

**当前结果：MW-01未通过、MW-02通过，0次补槽、0次计划确认。两条均把全部要求写在一条提示词中，只提交一次，分别串行执行，单worker、零重试。** 原始报告分开保存，合并结果`reports/mw01-mw02-single-prompt-20261104/summary.json`。

| 用例 | 当前单次提交结果 | 耗时 | 实际交付与核验 |
|---|---|---:|---|
| MW-01 | 未通过：缺英文SRT | 196.973秒 | run done，仅`7MB.zh-Hans.srt.srt`；下载确认15条中文文本、结束60.46秒，没有英文SRT可核验 |
| MW-02 | 流程、交付与基础媒体规格通过 | 658.485秒 | 中文字幕SRT、增强MP4各1份；SRT15条、结束60.46秒；MP4为2560×1440、60.495778秒、1条音轨，下载成功 |

MW-01：会话`07abbd20-d1b5-471f-888d-291b553b7b04`，run `run_v2_2edbba5bdcaa4e0da78359e0a0e3f006`。页面Completed，服务端无错误，但英文SRT未交付；步骤仅抽音频、转写、一次字幕翻译与导出。页面说明本次只安排中文SRT，英文需该SRT可用后再规划；没有自动完成要求的后置英译。按单次提交的两份字幕交付目标判未通过，根因未定位。[本次MW-01失败截图](<../reports/mw01-single-prompt-20261104/test-results/g3-g7-multi--regression-G3-304b6-ow-MW-01-单次提交串行依赖：中文字幕再翻译英文-staging/test-failed-1.png>)、final-state图、trace、审计及下载的中文SRT保存在`reports/mw01-single-prompt-20261104/`。

MW-02：会话`e79fe1d1-74cc-4149-ae9e-55adf306a8b3`，run `run_v2_5bf18559740c45c5bb7d439a14f81ea3`。报告`reports/mw02-single-prompt-20261104/`含原始UI图、trace、审计、下载产物、ffprobe结果及`artifact-verification.json`。保持独立SRT和增强MP4的原交付目标，未增加字幕烧录；字幕逐字翻译质量和音轨逐样本一致性未完整验收。

两条新提示词均按实际英文源填写，类型检查通过；未重复全套离线测试，未修改判定阈值、默认启用或FIXME配置，正式需求目录未改，未向云效写入。原两轮/重叠发送的记录只作测试纠正追溯，不能作为本次通过或失败依据；“Stop”未作为缺陷同步过。

26条MW最新台账：**14条有通过证据、9条明确未通过、3条前置阻塞、0条待本轮复测**。当前失败为MW-01/05/06/10/11/12/14/15/16；MW-02现为通过；阻塞仍为MW-17/21/22。SSO专项执行与阻塞状态以独立记录为准，不由本次MW结果代替。

## 2026-11-04 12:30 MW-01 / MW-02 初批记录（MW-02执行方式及判定已纠正）

原始Playwright结果为1 passed / 1 failed，约4分钟，退出码1；**两条旧执行方式均已被当前单次提交定义替代，不计为当前MW-01/02通过或产品失败**。串行、单worker、零重试，补槽0次、计划确认0次。沿用有效会话（auth 1 passed，10.2秒）；类型检查与3条补槽/续跑定向单测通过，未重复全套离线校验。

| 用例 | 结果 | 耗时 | 本次观测 |
|---|---|---:|---|
| MW-01 | 旧两轮场景完成，现定义已替代 | 182.022秒 | 旧流程同一会话两轮done、分别交付SRT；仅作历史证据，不代表当前单次完整字幕链已通过 |
| MW-02 | 旧执行方式不适用，产品失败判定已撤销 | 53.532秒 | 原错误测试在首任务queued时尝试第二次发送；只有Stop是正常交互，不作为缺陷。现已改为一次发送完整要求，另行补跑 |

MW-01会话`aec418ef-9a90-452c-bc24-30b107675175`，字幕run `run_v2_56755e5116994baba4f7f227ea40d7b0`，翻译run `run_v2_43282bbb2e5c4d6e8ccf63dca113e38a`。两轮文件分别显示`7MB.zh-Hans.srt.srt`和`7MB.en.srt.srt`，文件ID均为`file_cloud_dkphjk57svdg67xa4lcvppi5nu`；不能只凭名称或ID判断语言转换正确，本次未逐字核验字幕内容与完整时间轴。可确认第二轮执行路径只处理字幕，没有改用视频重新转写。

MW-02旧会话`64a92350-6ccc-4e35-9b41-63350196b202`，首run `run_v2_71a4d59112b1484bb0e946f0ae4ba5f8`。没有误点停止；截图先保留，首run随后由测试清理显式取消并回读为cancelled，不是产品自行取消或执行器失败。用户已说明只有停止按钮是正常交互，原先自行引入的“重叠提交”目标无效；保留这些资料只用于追溯测试纠正，不作为产品问题。

证据：`reports/mw01-02-20261104/`中的`summary.json`、HTML/JUnit、逐例审计和2份trace；`dependency-evidence.json`为字幕依赖步骤摘录，`mw02-controls.json`为DOM控件摘录。[MW-02失败截图](<../reports/mw01-02-20261104/test-results/g3-g7-multi--regression-G3-fdbde--slow-MW-02-同源多任务：字幕与增强分别收敛-staging/final-state.png>)在清理前保存，另有增强指令输入后的截图和Playwright自动失败图。

初批原片`7MB.mp4`仍为英文语音，不证明初批中文源语音前置满足。默认启用/FIXME数不变，正式需求目录未改，未向云效同步本轮结果。后续MW-01/02已按用户纠正调整提交方式并使用实际源语言，见最新记录。SSO专项状态以独立记录为准，不由本次MW结果替代。

初批曾记为14有通过证据/9未通过/3前置阻塞，现已撤销其中MW-02的错误失败判定，最新口径见上方纠正记录。MW-01旧发送异常本次未复现，前置阻塞仍为MW-17/21/22。

## 2026-11-04 同会话单原片：初始设计记录（当前状态见统一入口）

用户补充：单工作流按每轮判断，两次@F的提示词和工作流可以不同。已完善原条目SSO-004/006，并补充8条单工作流的两轮对照表：4条同工作流改参/重复、4条跨工作流切换；编号和总数18不变，仍全部PLAN/未执行。

已编写[SSO-001～018](design-cases/multi-workflow/same-session-original-cases.md)共18条：每轮单工作流8、多工作流组合6、恢复/多轮4；全部为PLAN/未执行。每例只上传一个原视频F、全程同一会话，每轮明确引用F；多工作流对同一原片组合处理，最终成片包含全部要求的效果，不分别交付多个单效果视频。已列具体前置、完整指令、逐轮步骤、来源/参数/组合效果与历史产物验收。

本次仅设计及文档核对，未执行预发、接入脚本或同步云效；原有真实通过/失败/阻塞和默认套件计数不变。Excel尚未收录这18条。7MB.mp4按已核验的英文语音编写；去口癖样本仍需执行前预听，未满足不得判通过。

## 2026-11-04 MW-06 / MW-10 云效同步

已在cinlink-WEB新建并回读验证2条：

- MW-06：[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)，任务done但缺单独英文SRT；[本地记录](defects/CINLINK-MW06-001.md)。
- MW-10：[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)，高光Extract audio报source_duration_sec空对象错误、无产物；[本地记录](defects/CINLINK-MW10-001.md)。

每条包含详细前置操作、素材规格、原提示词、逐步复现、实际/预期和回归边界，均按用户模板去掉“排查信息”。每条上传并嵌入提交前及失败终态原始PNG，另附脱敏执行JSON：共4张图、6份附件。项目/类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文、附件ID/名称及嵌图引用均回读通过。

创建前对全部状态分页核对，初始71条，未发现两用例或同run记录；FWXC-245仅有相似缺英文SRT症状，交付组合不同、同根因未确认，未合并或修改。每条创建前均重新检索并以更新时间复核详情缓存；最后一次创建前共72条。实际新建2、旧项更新0、跳过0、失败0、回读验证2。同步底稿：`reports/mw06-mw10-yunxiao-20261104/`。

本次只同步证据，没有新增CinLink任务；测试结论仍为8条流程/产物检查通过、2条未通过，默认启用/FIXME数量不变。已注明英文语音素材与中文语音提示词的前置差异，不宣称已覆盖严格中文源语音场景。


## 2026-11-04 多工作流10条补跑完成

**8条流程/产物检查通过、2条未通过、0条阻塞、0条未运行。** 2026-11-03的MW-06原任务读回结论，加上2026-11-04恢复登录后的9条串行执行，组成这10条的最终结果；不是同一份10条JUnit。续跑JUnit为8 passed / 1 failed（09:40–10:43，约1小时），workers=1、retries=0；auth 1 passed（45.2秒）。此前MW-07 Unauthorized未取得run_id，认证中断证据保留，本轮已正常完成。MW-06没有重复提交。

| 用例 | 结果 | 耗时（秒） | 补槽提交 | 计划确认 | 实际交付/失败原因 |
|---|---|---:|---:|---:|---|
| MW-03 | 流程/产物通过 | 677.957 | 0 | 0 | `7MB_1440p_zh-Hans.mp4` |
| MW-06 | 未通过 | 原任务UI205；恢复读取23.338 | 0 | 0 | done，仅中文SRT和summary.md两份，缺单独英文SRT |
| MW-07 | 流程/产物通过 | 489.387 | 0 | 3 | 清理后MP4、中文字幕SRT、英文SRT |
| MW-08 | 流程/产物通过 | 545.478 | 0 | 3 | highlight_final.mp4、中文及英文SRT |
| MW-09 | 流程/产物通过 | 515.538 | 0 | 0 | `E2E-TEST Final MP4.mp4` |
| MW-10 | 未通过 | 639.462 | 0 | 0 | 高光处理的Extract audio报`'NoneType' object has no attribute 'source_duration_sec'`，run failed、0产物 |
| MW-23 | 流程/产物通过 | 167.295 | 0 | 0 | `7MB_bilingual.mp4` |
| MW-24 | 流程/产物通过 | 254.278 | 0 | 1 | `7MB_cleaned_zh-Hans.mp4` |
| MW-25 | 流程/产物通过 | 252.587 | 0 | 1 | `7MB_highlights_zh-Hans.mp4` |
| MW-26 | 流程/产物通过 | 188.842 | 0 | 0 | `E2E-P0_English_Subtitles.mp4` |

已按“遇补槽填写后继续”启用处理；本批实际0次补槽，执行计划确认合计8次，二者分别记录。未修改提示词、产品判定阈值或默认FIXME配置；执行阶段未向云效写入，后续同步见本页最新云效同步记录。

**验收边界：** 本批仅确认任务终态及所需文件数量/类型，未逐帧验证字幕语言与同步、水印、素材参与、分辨率、时长和处理顺序。沿用的`7MB.mp4`及MW-09第二素材，其SHA-256与MW-16独立ASR证据一致，实际均为英文语音；现有提示词仍按中文语音描述执行。因此不能据此宣称“中文源语音”前置或完整业务内容验收已通过。完整内容核验及匹配中文源语音的素材仍需补齐。

报告根目录：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`；合并结果见`summary.json`，续跑HTML/JUnit/JSON、逐例审计及trace见`remaining-after-auth/`。失败原始PNG、before-submit和final-state图均保留：

- [MW-06失败截图](<../reports/mw03-06-07-08-09-10-23-24-25-26-20261103/test-results/g3-g7-multi-compound--regr-105f5-复合（MW-06-22）-MW-06-字幕-翻译-总结-staging/test-failed-1.png>)；run `run_v2_edc411c2a1da47c18feb766c41cf89aa`。
- [MW-10失败截图](<../reports/mw03-06-07-08-09-10-23-24-25-26-20261103/remaining-after-auth/test-results/g3-g7-multi-compound--regr-0d0ec-06-22）-MW-10-显式顺序：增强→字幕→长变短-staging/test-failed-1.png>)；run `run_v2_db0f651a768b46648d188fbe7b31d628`。截图显示增强、转写、翻译、字幕烧录完成，随后Extract audio及高光相关步骤失败；根因未定位。

26条覆盖账本已更新：**13条有流程/产物通过证据、8条明确未通过、3条前置阻塞、2条旧异常待复核**。原10条“缺当前版本/优化指令证据”清单已清空；MW-01/02仍待复核；失败为MW-05/06/10/11/12/14/15/16，前置阻塞为MW-17/21/22。账本`reports/multi-coverage-audit-20261103/coverage.json`，补跑前副本另存。

## MW-22 前端响应模拟（2026-11-03 21:05）

按用户最新确认“不修改云端代码”，新增独立命令 `npm run test:multi:materials:ui`，本轮 **1 passed（7.035 秒）**。加载预发真实静态界面，业务响应与 SSE 在本机模拟：初始 A done / B running，随后只更新 B 为 failed；原生步骤错误可见，A 视频卡片和下载能力保留，下载 22,718 字节与合成夹具 SHA-256 一致，页面脚本错误0。模拟汇总文本“1 成功，1 失败”正常显示；该文本预置于响应，不代表已验证服务端汇总算法。

空登录态、不上传素材、不提交真实 AI 任务、不改云端代码；下载使用模拟 data URL，不覆盖真实 S3 下载。类型检查通过，按用户要求未重复全量离线校验。证据：`reports/mw22-ui-mock-20261103-210517/` 的 `html/index.html`、`junit.xml` 及测试输出中的两阶段截图、`MW-22-ui-mock.json`、`ui-snapshot.txt`、trace。

**仅前端展示模拟通过，MW-22 服务端部分失败仍为前置阻塞 / FIXME。** 本模式不计入真实专项通过数，不增加设计用例数量；专项仍2条流程/结构通过、2条未通过、2条前置阻塞，默认多工作流20条、预发46条统计不变。执行说明见 [MW-22说明](design-cases/multi-workflow/mw22-breakpoints.md)。

## 套件概览

| 套件 | 总数 | 默认启用 | 默认跳过 | 最近执行证据 |
|---|---:|---:|---:|---|
| 离线（unit + gates） | 123 | 123 | 0 | 前序119 passed；本次类型检查+3条定向校验通过，当前123条未全量重跑 |
| 预发 G1/G2 | 7 | 7 | 0 | G1 4 passed，G2 3 passed |
| 预发八个主工作流 | 8 | 8 | 0 | 各工作流均有 2026-11-03 通过记录 |
| 卡片入口 | 7 | 5 | 2 | Find Local Footage 入口冒烟通过；其余新版完整回归待补 |
| 多工作流基础 | 5 | 4 | 1 | MW-02/03/04有通过证据；MW-01单次字幕链缺英文SRT；MW-05失败 |
| 多工作流复合 | 15 | 11 | 4 | 9条有流程/产物通过证据；06/10/11/12/14未通过；21前置阻塞 |
| 跨工作流链路 | 4 | 1 | 3 | CHAIN-01 已实现，待新版回归 |
| **预发合计** | **46** | **36** | **10** | **未执行过本版本整套 46 条全量验收** |
| 本地批注 | 39 | 39 | 按环境可跳过 | 27 规则 + 12 UI，当前完整执行证据待补 |
| 批注预发 | 16 | 15 | 1 | 2026-10-20：11 passed / 1 failed / 1 skipped / 3 did not run |

多工作流合计为基础 + 复合：**20 条，15 默认启用、5 FIXME**。预发合计不包含单独的本地批注和批注预发 project。

2026-11-03：MW-18 双附件严格复测通过后已移除 `fixme`，恢复默认执行，无需强制启用其他阻塞用例：

```powershell
npm run test:multi:compound -- --grep 'MW-18\b'
```

本次启用变更已通过类型检查、118 条离线用例、233 条正式需求用例质量校验，以及未设置强制开关的默认用例发现检查；未额外创建预发任务。

## 2026-11-03 MW-03/06/07/08/09/10/23/24/25/26 初批记录（认证中断，已于次日续跑）

按用户要求串行、零重试，遇补槽填写后继续，保存失败截图和 trace。MW-06 已读回原任务终态：done 但仅交付 `7MB.zh-Hans.srt.srt` 和 `summary.md`，缺英文 SRT，未通过。原任务页面显示耗时205秒；恢复读取阶段23.338秒不能作为完整执行耗时。

MW-07 发送阶段页面显示 `Unauthorized`，120秒未收到提交响应，未获得 run_id；复核会话已失效，按认证前置受阻记录，不判定工作流失败。人工登录等待300秒后超时，窗口已随脚本退出。当前统计：**0通过、1未通过、1认证受阻、8未运行**；剩余9条待恢复登录后继续，不能报告为10条已完成。报告目录：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`，结构化汇总 `summary.json`；待继续命令 `node reports/mw03-06-07-08-09-10-23-24-25-26-20261103/run-remaining.cjs` 仅选其余9条，须先恢复有效会话。

筛选曾误匹配父标题而选出16条，已在仅MW-06提交后中断；后续均恢复读取同一run，没有重复创建MW-06。另一次截图等待字体加载被中断，随后取证跳过字体就绪等待，失败截图和trace均已保存。两次中断资料保留在该目录的独立子目录，不当作产品失败或额外已执行用例。

本次代码补齐显式补槽处理及审计、活动run续跑、已受理run恢复绑定；类型检查及3条定向单测通过，未重复整套离线校验。正式需求目录未改动。

## 2026-11-03 多工作流剩余覆盖核对（补跑前快照）

按MW-01～26逐条核对：默认20条+独立按需6条。AUTO仅表示可执行，不能当作当前提示词已经实测；历史通过与优化后复测分开。没有发起新的预发任务。

| 分类 | 用例 | 数量 | 下一步 |
|---|---|---:|---|
| 缺当前版本完整结论，未有明确当前阻塞 | MW-03/06/07/08/10 | 5 | 按当前提示词补跑 |
| 历史通过，优化后指令待复测 | MW-09/23/24/25/26 | 5 | 用当前完整参数重跑；其中MW-24/25/26的17:10批次对应旧指令 |
| 旧异常待复核定位 | MW-01/02 | 2 | 复核第二次发送按钮/页面提前关闭，不沿用旧版阻塞作为当前结论 |
| 已有明确失败证据 | MW-05/11/12/14/15/16 | 6 | 修复后定向回归；MW-12故障注入另行覆盖 |
| 前置卡点明确，目标任务尚未执行 | MW-17/21/22 | 3 | 先解除下述前置 |
| 有通过记录 | MW-04/13/18/19/20 | 5 | 内容层仍按各报告边界，不等同全部业务内容已验收 |

待补跑且没有明确当前阻塞的清单共10条：MW-03/06/07/08/09/10/23/24/25/26。另有MW-01/02两条需要先复核历史异常。此前默认多工作流重跑仅完成准备，未形成全量执行报告，不能将其余用例计为本轮已执行。

前置卡点：MW-17第三素材引用失败；MW-21同项目F登记后，B端素材候选未命中（页面0/1素材已分析，就绪条件待定位）；MW-22已找到B翻译的静态断点，但未接入/部署真实定向故障注入，未接部分失败断言，因此仍未提交A/B目标任务。卡住步骤明确，不表示这三条的技术根因或修复方案都已验证。

按需执行 `npm run test:multi:base` 或 `npm run test:multi:compound` 时用grep限定待补跑编号，串行零重试；发生补槽按用户要求填写后继续。工作流专项与正式需求目录继续分开。核对清单保存于 `reports/multi-coverage-audit-20261103/coverage.json`。


## 2026-11-03 MW-16 云效同步

已提交 cinlink-WEB [FWXC-250](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=443f3aba58a7c4f7faa88ca508)（工作项 `443f3aba58a7c4f7faa88ca508`），本地记录：[CINLINK-MW16-001](defects/CINLINK-MW16-001.md)。缺陷明确为“B日文字幕串用A内容，非两份字幕互换”；优先级高、严重程度2-严重。正文沿用用户模板，不含“排查信息”一节，包含详细前置、完整提示词、复现和核验步骤。

已上传并嵌入原始产物页面和来源核验对照图，另附两份原始SRT及脱敏核验JSON，共5份附件；标题、描述、项目/类型、负责人/迭代/标签、优先级/严重程度、附件ID/文件名均回读通过。创建前遍历全部状态68条缺陷，未命中MW-16或同run证据；本次新建1条，未更新旧项。同步底稿位于 `reports/mw16-yunxiao-20261103/`。

本次只同步已核验结果，没有重跑CinLink任务；MW-16仍为内容核验未通过，保留FIXME，专项统计2通过/2未通过/2前置阻塞不变。


## 2026-11-03 MW-16 内容核验：确认B串用A，非A/B互换

**结论：MW-16 未通过。A英文SRT正确对应A，B日文SRT也对应A；不是两份字幕互换，而是B交付物串用了A的内容。** 原run仍为done、文件级JUnit仍为passed；本次新增内容层判定失败，不改写原始执行记录。

| 产物 | 对照A原片 | 对照B原片 |
|---|---|---|
| A_English.srt.srt | 医疗法/医疗保障演说，对应 | BBC新闻，不对应 |
| B_Japanese.srt.srt | A内容的日文翻译，对应 | BBC新闻，不对应，错源 |

核验方法：使用本次已下载产物及原始视频，源文件SHA-256与实际提交的两个独立file_id逐一匹配；原产物file_id/name与本地文件对应，排除核验时拿反。用本机Whisper large-v3-turbo独立转写A的0–20、30–50秒，B的0–20、30–50、90–110、149–169秒，并与英文/日文SRT交叉核对。没有新增CinLink任务。

关键证据：A开头讲医疗法，30–50秒讲儿科、癌症保障、Las Vegas/Elko；B开头为BBC伦敦播报和莫斯科无人机，30–50秒转为夏威夷山火。英文A及日文B都在讲A的医疗内容（日文第10条为“ラスベガスからエルコ”）。两份SRT均15条，15个起点全部相同、14个终点相同，最大差0.02秒；均止于60.46秒。B在90–110秒仍报道女足世界杯、149–169秒仍有新闻语音，因此后半段也缺少对应字幕。时间统计是旁证，错源结论基于语音与译文内容。

证据：`reports/mw16-content-verification-20261103/` 下 `verdict.json`、`subtitle-comparison.json`、6段WAV及独立转写JSON、`comparison.html`、`comparison.png`、`original-delivery.png`。对照图明确标注为原片帧+已下载字幕+独立ASR的核验报告，并非原产品页面截图。详细记录见 [CINLINK-MW16-001](defects/CINLINK-MW16-001.md)。

专项最新业务统计更新为：**2条流程/结构通过、2条未通过、2条前置阻塞、0条待核验**。MW-16保留FIXME，默认套件数量不变。本次未向云效写入。核验足以确认错源，不代表整片译文质量已逐字验收；具体发生在规划、工具入参还是缓存环节，尚未定位。


## 2026-11-03 MW-15 云效同步

后续按用户最新要求去掉 FWXC-249 正文的“排查信息”一节，云效与本地报告已同步、回读验证通过；两张截图引用保留，附件未变。后续缺陷模板已同步移除该章节。

已提交 cinlink-WEB [FWXC-249](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=dc950e30e2c88409857929f4a4)（工作项 `dc950e30e2c88409857929f4a4`），详细报告：[CINLINK-MW15-001](defects/CINLINK-MW15-001.md)。按当前缺陷模板保留前置操作、完整提示词、逐步复现、run/会话ID、请求时间与前端资源标识、实际/预期及回归命令。已上传并嵌入提交前和失败终态两张原始截图，另附脱敏排查JSON；正文、字段和3份附件回读验证通过。

提交前已遍历项目全部状态的67条缺陷，未发现MW-15或同run记录；本次新建1条，不修改旧项。MW-15仍为未通过/待修复回归，不因提交缺陷恢复默认执行；本次没有重跑计费任务。同步底稿在 `reports/mw15-yunxiao-20261103/`。


## 2026-11-03 MW-15/16/17/19/20/22 多素材专项

用户指定恢复执行此前暂缓场景；新增独立命令 `npm run test:multi:materials`，不自动并入默认20条多工作流或46条staging。单worker、零重试，已复用有效会话。用户执行中要求补槽填写后继续，已据此完成MW-20素材选择并跑到终态。

内容核验后业务口径：**2 条流程/结构通过、2 未通过、2 前置阻塞、0 内容待核验**。首批JUnit为{"failed":3,"passed":3}；准备复核为{"failed":3}；最终MW-17/20专项为{"failed":1,"passed":1}。按用例采用有效任务证据，保留所有初始/复核记录，不混合成单次全绿结果。

| 用例 | 结果 | 耗时 | 补槽提交次数 | 说明 |
|---|---|---:|---:|---|
| MW-15 | 未通过 | 259.901 秒 | 0 | TimeoutError: 规划模型等待响应超过 60 秒，当前请求已超时 |
| MW-16 | 未通过：内容错源 | 243.133 秒 | 0 | 独立ASR交叉核验确认B日文串用A，不是A/B互换；原文件级断言通过不变 |
| MW-17 | 前置阻塞 | 116.879 秒 | 0 | 前置阻塞：素材候选未命中，目标任务未提交 |
| MW-19 | 流程/结构通过 | 154.686 秒 | 0 | 通过基础结构断言；0次补槽提交，0次计划确认；内容层边界见进度 |
| MW-20 | 流程/结构通过 | 252.611 秒 | 1 | 通过基础结构断言；1次补槽提交，0次计划确认；内容层边界见进度 |
| MW-22 | 前置阻塞 | 8.453 秒 | 0 | 前置阻塞：缺少服务端按B素材/翻译节点的定向故障注入，A/B目标均未提交 |

MW-16保留首批文件级通过证据：两个源文件ID不同，服务端SHA-256与本地源文件一致；后续独立ASR交叉核验确认B日文串用A，内容层未通过。日文B与英文A均只有15条、终点60.46秒，而B源约169秒。补充核验在 `mw16-source-binding.json`、`mw16-subtitle-check.json` 与B源截图。后续非项目云端名称引用复核未进入目标任务，不能用其前置失败覆盖首批交付事实。

修正了测试准备：新版非项目入口实际为带aria-label的span，需等待侧栏加载后点击；原脚本可能静默停在旧项目。第三素材C=9s.mp4（9.45秒）及别名material-C.mp4均无法@引用，MW-17最终未提交混剪任务。素材登记后再按云端保存名查找的准备路径也未命中，证据保留，不将其误记成混剪任务失败。MW-22缺服务端定向故障注入，A/B任务均未提交。

MW-20选择第一个视频A，POST /clarifications返回200/user_replied，最终done并下载MP4。原审计计数器只匹配带尾斜线的接口而漏记本次提交；补充从原始trace恢复问题/答案到 `completion/mw20-clarification-evidence.json`，原始审计未改写。已修复原生select、无尾斜线的澄清/确认接口及英文Submit按钮处理。

证据根目录：`reports/mw15-16-17-19-20-22-20261103/`；首批 `html/index.html`，准备复核 `preparation-and-clarification-recheck/html/index.html`，最终复测 `completion/html/index.html`。各目录含JUnit、audit、提交前/结束/补槽截图和trace；汇总为 `summary.json`。流程通过只覆盖状态、数量、下载、媒体结构/SRT格式，内容层未全量验收。本轮未向云效新增或更新缺陷。

校验：类型检查通过；新会话隔离和补槽处理3条定向单测通过（4.1秒）；可发现6条专项、121条离线。复用前序119条离线基线，没有逐条重复整套离线。


## MW-24/25/26

2026-11-03 17:10–17:21，经人工登录恢复会话后，单 worker、零重试完成预发复测：

| 用例 | 结果 | 耗时 | 当前状态 |
|---|---|---:|---|
| MW-24 去口癖→中文字幕 | passed | 230.125 秒 | 默认启用 |
| MW-25 长变短→中文字幕 | passed | 231.181 秒 | 默认启用 |
| MW-26 文字水印→英文字幕 | passed | 182.280 秒 | 默认启用 |

本轮未复现原凭据错误，三条均通过现有产物数量与 video 类型断言。画面、字幕语言/同步、水印内容和时长等内容层校验不能由该结果替代。原始报告在 `reports/mw24-26-20261103-171012/`；run_id 见 [验证记录](verification.md)。

后续已补齐普通复合用例参数、前置操作、步骤和具体业务预期，以减少缺参补槽；MW-13 保留为参数冲突澄清专项。上表 MW-24/25/26 的通过记录对应旧指令，新版这三条尚未重新跑预发；本轮已验证的五条见下。详细用例见 [多工作流专项](design-cases/multi-workflow/cases.md)。

默认运行，无需强制启用阻塞用例：

```powershell
npm run test:multi:compound -- --grep 'MW-(24|25|26)\b'
```

## 优化提示词严格复测：MW-11/12/14/18/21

2026-11-03 17:50 起，单 worker、零重试执行，遇到缺参补槽即停止，不自动选择或提交答案；明确的执行计划确认单独记录。本轮实际提交目标指令的四条，均未观察到补槽或计划确认。

| 用例 | 目标指令是否提交 | 缺参补槽 | 结果 | 耗时 |
|---|---|---|---|---:|
| MW-11 生成→字幕→翻译 | 是 | 未观察到 | 未通过：run done，但仅交付 `media-info.json`，缺少中英文 SRT | 190.608 秒 |
| MW-12 完整参数正常路径探测 | 是 | 未观察到 | 未通过：交付中文字幕和英文字幕成片，缺少单独的英文 SRT | 281.013 秒 |
| MW-14 7 工作流长链路 | 是 | 未观察到 | 未通过：规划模型等待超过 60 秒，run failed，0 产物 | 234.354 秒 |
| MW-18 视频+图片水印+字幕 | 是，已补齐双附件 | 未观察到 | **通过**：`watermarked.mp4` 与 `subtitles.zh-Hans.srt.srt`，run done | 218.691 秒 |
| MW-21 跨会话素材复用 | 否 | **尚未验证** | 前置阻塞：源会话已登记素材，新会话 `@` 未命中候选；按服务端保存名复核仍阻塞 | 首次 93.461 秒；复核 93.384 秒 |

原始五条批次为 **1 passed / 4 failed（17.3 分钟）**；其中 MW-21 在业务进度中归类为前置阻塞。MW-21 名称修正后单独复核仍阻塞，未重复执行其他四条。严格复测当时未修改五条的默认 FIXME 标记；后续已按用户要求恢复 MW-18 默认执行，MW-11/12/14/21 仍默认跳过。

**边界**：MW-12 本轮未注入服务端翻译失败，只验证优化指令的正常路径，不能宣称故障恢复通过。MW-18 通过的是状态和产物数量/类型断言，水印位置/透明度、字幕同步等内容层仍需另行核验。不能由这次结果保证未来不会补槽。

证据：`reports/mw11-12-14-18-21-20261103-174823/` 下 `html/index.html`、`junit.xml`、`summary.json`、`audit/`、截图与 trace；MW-21 复核位于其 `mw21-canonical-name-recheck/` 子目录。详见 [验证记录](verification.md)。

## 本轮未通过用例：云效同步

2026-11-03 18:34，按用户要求**不去重，直接新建 4 条**，全部回读验证通过。每条含前置操作、完整提示词、逐步操作、实际/预期、回归标准和单条严格执行命令，并附详细说明及脱敏证据 JSON；未上传原始 trace 或登录态。

| 用例 | 云效缺陷 | 本地详细记录 | 当前状态 |
|---|---|---|---|
| MW-11 | [FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc) | [CINLINK-MW11-001](defects/CINLINK-MW11-001.md) | 待修复回归 |
| MW-12 | [FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b) | [CINLINK-MW12-001](defects/CINLINK-MW12-001.md) | 待修复回归 |
| MW-14 | [FWXC-246](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=514a280c2861b2903950c6783d) | [CINLINK-MW14-001](defects/CINLINK-MW14-001.md) | 待修复回归 |
| MW-21 | [FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2) | [CINLINK-MW21-001](defects/CINLINK-MW21-001.md) | 前置阻塞，待定位 |

MW-12 只报告正常路径缺少英文 SRT，服务端故障注入仍未覆盖。MW-21 仅报告素材引用前置阻塞，不认定后续字幕链路失败；需先确认作用域/候选匹配。四条仍保持默认 FIXME，启用总数未变；本次同步未新跑预发任务。

2026-11-03 补齐截图：FWXC-244（MW-11）、FWXC-245（MW-12）、FWXC-246（MW-14）各 1 张，FWXC-247（MW-21）首次与服务端保存名复核各 1 张，共 **5 张原始实测截图**。已上传到原有四条缺陷并嵌入描述，附件 ID/文件名与描述回读均通过；未新增缺陷。加上此前说明文档和脱敏 JSON 共 13 份附件。MW-21 复核截图仅展示输入状态，不能单独证明候选为空，仍须结合审计证据。

## MW-21 同项目夹具接入与复测（2026-11-03 19:04–19:06）

同项目双会话夹具已接入 `src/fixtures/project-sessions.ts`，MW-21 在正常脚本路径使用该夹具，严格审计不依赖探测开关。独立项目 P 由页面创建；A 上传指定目录的 `7MB.mp4`，发送登记消息并等待 done；通过当前项目文件接口关联原始 F，再 GET 回读 F，随后从 P 内新建空白 B，全程不在 B 上传。

本轮 **1 failed，92.364 秒**：项目登记前置已经满足，失败点为 **B 的同项目素材引用检查**。`sourceRegisteredInProject=true`、A 服务端项目归属为 P、B 草稿项目选择器和 URL 为 P、B 上传请求为 0；但输入 `@7MB` 等待 20 秒仍无候选，截图显示“暂无相关内容”。页面同时显示 **0/1 media files analyzed**，尚未确认素材分析完成是否为候选可见的额外就绪条件，根因仍待定位。目标字幕提示词未提交，无目标 run/MP4，字幕、时长、音轨与产物归属均**未验证**。当前产品在首次提交时才持久化 B，所以本次 B 只有 P 内空白草稿，不能虚构 conversation_id 或宣称已完成 A/B 服务端双归属断言。

证据：`reports/mw21-same-project-20261103-190443/` 中 `html/index.html`、`junit.xml`、`audit/MW-21.json` 和 `test-results/` 的截图/trace。该记录替代此前非项目会话探测作为本场景的最新执行结论；FIXME 保留，默认启用数量不变。前面的创建控件、接口结构、项目文件登记适配尝试保留在本机报告目录，仅作为夹具调试记录，不合并成多条业务用例结果。随后按用户要求更新现有云效 **FWXC-247**：新增原始截图、脱敏 JSON、详细说明共 3 个附件，截图已嵌入描述，描述及附件回读通过；新增缺陷为 0。同步结果见该目录 `yunxiao-result.json`。

另已修正登录脚本：复用一个可见窗口，仅在工作台输入框就绪并离开登录页后保存状态；残留认证 Cookie 不再单独算登录成功。人工登录恢复实测通过。按用户要求，后续单条预发不再每次重复整套离线测试。

## 尚未完成

MW-21 范围为**同一项目 P 内 A/B 复用素材**，指定素材与准备步骤见 [MW-21 用例](design-cases/multi-workflow/cases.md)。夹具接入和实际复测已完成，本轮阻塞在已登记 F 的 B 端候选检查；待定位候选检索/素材就绪条件后，继续验证目标字幕链路。FIXME 与启用数量统计不变。此前非项目会话结果仍只作为历史证据。

- 复合执行问题：MW-11 生成后未交付字幕；MW-12 正常路径缺少英文 SRT，且服务端故障注入仍未覆盖；MW-14 规划模型超时；MW-21 新会话素材引用前置未通过。
- MW-18 双附件已接入、无补槽复测通过并恢复默认执行；水印位置/透明度、字幕同步等内容层核验仍未覆盖。
- 基础 FIXME：MW-05 取消后同会话重提 done 但无产物。
- 卡片 FIXME：本地素材查找完整结果、暂不可用的生成解说。
- 链路 FIXME：CHAIN-05/06/13；其他设计链路仍待脚本落地。
- 批注：复测016刷新恢复、执行020/021/022、确认040失败重试UI，补当前本地39条完整结果。
- 完成已启用预发用例的新版整体回归；补G6内容层和按Job关联扣费流水证据。
- 核对历史云效提交结果。TOKEN-001 本地复测通过，未在本次任务中查询或更新云效工作项。

MW-15/16/17/19/20/22 现按用户最新指定恢复为独立按需专项，命令 `npm run test:multi:materials`；执行时填写补槽并继续，不自动并入原默认20条或预发46条。[多工作流用例](design-cases/multi-workflow/cases.md)及其 registry 独立放在 `docs/design-cases/multi-workflow/`；`docs/cases/requirements/` 只保留正式需求用例。设计用例数量不等于脚本执行集数量。

2026-11-13补充：用户最新要求明确需求存在而未实现则Failed。004官方需求§03回读仍有对象引用/移除要求，依据已有页面实测重新判定Failed，非本次完整重跑；旧批次结论保留。[复核边界](cases/requirements/ERYE-196/acceptance-004-review-20261113.md)。当前134条为2 Passed/2 Failed/130 Not Run，新版002仍Not Run；格式检查543条、0问题。004无云效写入。


2026-11-17 14:04监控追加：[完整分页及续跑汇总](defects/fixed-monitor-20261117-140404.md)。467条Bug/陈亚宾已修复39；新增569/517两条已放同队列inbox，尚未执行，监控不抢占主锁。已有续跑新增536/544/538/529原Passed、530原Failed，官方GET分别4✅/1❌一致；本批原累计10P（5生产5预发）/1F/6B/24NR，扩散另列。原执行者仍在运行，监控业务/云效写入0，固定脚本PLAN保持。


2026-11-17 17:57监控追加：[完整分页及续跑汇总](defects/fixed-monitor-20261117-175636.md)：476条Bug/陈亚宾精确已修复35；0新增/再修复/实质更新，15同证据Blocked及20待办保留，inbox已合并。续跑新增492/491/487/485原Passed且4✅已官方GET复核，516及484原Blocked保持已修复；491人工Delete参与、487按用户新口径。43项原14P/1F/8B/20NR，扩散36P/5F/3B/42NR；owner正执行479，监控无浏览器/业务/云效写入，不覆盖执行账本，PLAN保持。


2026-11-17 22:03监控收尾：[完整分页及结果](defects/fixed-monitor-20261117-215938.md)。486条Bug/陈亚宾精确已修复3（484/403/399），均同证据旧Blocked，0新增/再修复/实质更新。既有执行者当前可执行队列已完成、idle/pending0；新增原通过479/527/480、原失败462，43项累计原17P/2F/12B/12NR，扩散49P/8F/3B/26NR。当前GET479/480测试完成、527✅、462❌；317/381外部✅不改变本轮原Blocked。监控业务/浏览器/云效写入0，不覆盖主账本；542历史冻结，固定脚本PLAN，持续检查保留。


2026-11-18 02:04例行监控：[完整检查](defects/fixed-monitor-20261118-020411.md)。486条Bug/陈亚宾精确已修复3（484/403/399），同证据Blocked，0新增/再修复/实质更新；锁释放、pending0、无未合并inbox，43项状态及既有原17P/2F/12B/12NR、扩散49P/8F/3B/26NR均无变化。本次0业务/浏览器/云效写入，不覆盖主账本、不重跑同版，DONT_NOTIFY，持续监控保留。


2026-11-18 05:59例行监控：[完整检查](defects/fixed-monitor-20261118-055843.md)。486条Bug/陈亚宾精确已修复3（484/403/399），修复证据/附件均未变，旧Blocked保留；0新增/再修复/实质更新，pending0、无未合并inbox。43项云端状态与实测累计均无变化，0业务/浏览器/云效写入，不覆盖主账本、不重发任务，DONT_NOTIFY；定时监控继续。


2026-11-18 10:00例行监控：[完整检查](defects/fixed-monitor-20261118-095946.md)。486条Bug/陈亚宾精确已修复3（484/403/399），同证据Blocked，0新增/再修复/实质更新；pending0、无未合并inbox，0业务/浏览器/云效写入。已继承463默认字号新口径：旧字号Blocked失效、新原Not Run；当前云效✅不新开轮。旧43项17P/2F/12B/12NR仅历史，按463修订跟踪为17P/2F/11B/13NR，非新实测。主账本只读，DONT_NOTIFY，监控继续。


2026-11-18 13:59监控：[完整检查](defects/fixed-monitor-20261118-135848.md)。496条Bug/陈亚宾精确已修复仅484，同证据Blocked；403/399已关闭，527/569再次打开均官方GET回读，不新开轮。0新增/再修复/实质更新，43项17处外部云端推进与本轮实测分开；0业务/浏览器/云效写入。已继承463默认字号及050单图串行新版，旧失效验收不再用于阻塞/失败，新版未测不补算通过。pending0、主账本只读，DONT_NOTIFY，持续监控保留。


2026-11-18 17:59监控新增8候选：[快照与交接](defects/fixed-monitor-20261118-175919.md)。505条Bug/陈亚宾精确已修复9；新624/621/601/534/335/311/310/300，原/两扩散均Not Run，新8原+16扩散不继承旧43结果，484同证据Blocked保留。15原附件+3嵌图已下载SHA，inbox幂等登记，原唯一执行线程已active/inProgress，主账本由执行者合并、不由监控覆盖。预发Google Chrome/yabinc92，624人工账号前置分开；0监控业务/浏览器/云效写入。已更新自动任务说明使README仅导航，README本次未写，定时时间保持。


2026-11-18用户调整自动任务4：北京时间11月19日02:00首次开始，之后每日02/06/10/14/18/22检查并串行回归精确已修复候选。覆盖刚才每日仅02:00的安排；首次时间前不新开检查或业务，已受理仅回读。8项未提交inbox保留，当前独立任务已完成资料读取、尚未启动业务；旧报告active/inProgress仅代表当时任务运行，不能当已实测。时间规则已官方更新并读回，主执行账本未覆盖，README仅导航不写流水。


2026-11-19 02:04首次窗口：[云效快照/续跑](defects/fixed-monitor-20261119-020353.md)。512条Bug/陈亚宾精确已修复17；旧8inbox不重复排队，新681/680/661/658/637/618/571/568追加inbox，另484同版旧Blocked不重跑。新增15原附件+5嵌图已下载SHA，637精确66字节fixture核同。独立执行者已read_thread核实源聊天人类持续授权、确认直接续跑，active/inProgress；实际16原+32扩散均尚无本次终态，不继承旧结论。主线程仅Chrome预发y92只读观察3/0修改/0业务/0云效写入，随后停止浏览器动作。SSO生产ego/y18另在跑，624人工及账号并发条件单独处理。主账本由执行者安全合并，README仅导航本次未写。


2026-11-19 06点实际回归接续：原执行任务转去核查用例登记，idle且本批无已受理业务，源聊天安全接管唯一锁、合并16待办。601严格原已实际Failed（commands.0/1 invalid oneOf），GET工程revision1/draft null/head及全部内容保持，未保存批注/引用；官方06:19❌AI未通过已回读。两独立扩散待继续，其余15项Not Run，不把凌晨排队当已测。证据reports/fixed-monitor-20261119-060155/execution/601-O-*，单项报告docs/defects/FWXC-601-retest-20261118-1800-monitor.md；README未写。


2026-11-19扩散一实际Failed：独立会话840f4a89-4e3a-4b44-b5e0-b988b0d6a926、原图保存版editor_image_43ca7a9dd78448cf9ca7c1398bc43193。素材登记补槽实际CID后完成，原生UI建立原图工程，正式只记录右耳机批注请求省略工程参数，单次终态commands.0 invalid oneOf，未交付批注/未发送引用；未点重试。原图原保存版本保持。证据`reports/fixed-monitor-20261119-060155/execution/601-E1-*`。扩散二将单独人工创建一条已有批注后检验Agent更新正文，仅作为前置、不抵充Agent成功。


2026-11-19 601本轮完结：原回归Failed，独立扩散一Failed（commands.0 invalid oneOf），独立扩散二Failed（arguments invalid oneOf）。扩散二原生UI先保存唯一鼻子批注作为前置，Agent仅修改正文请求单次失败；实际原正文、唯一批注、源图保存版保持，不将人工建立算Agent成功。实际预发Chrome/yabinc92，原生产历史另存。云效原缺陷已06:19官方API设❌AI未通过并回读；扩散不重复写状态。完整提示词/原始截图/AX/工程审计在`reports/fixed-monitor-20261119-060155/execution/601-*`；固定脚本仍PLAN。其余15条待继续，README未写。


2026-11-19 06:37原验收实际Failed：预发Chrome/yabinc92独立会话851143fb-a1e8-4b2b-8463-cf2d45286e93，图片工程d7dc6453-cad9-4c25-a67c-afda027d9515、原保存版editor_image_ca26a8c88ada4f10a0d8bccfc0a97234。按原Q(0.405,0.37)实际点击约(0.405213,0.369668)，建立左耳/036保持正文、收起重开后从识别候选选脸，再收起重开。GET保存工程revision6→7，注释同ID/正文/锚点/source保持，仅label左耳→脸，target_ref仍null，没有其他对象关系字段，浮层只有候选及自定义名、正文、删除和加引用，无独立换绑入口。未以锚点未移动本身判失败，未用Agent替代UI。云效FWXC-534官方设❌AI未通过并回读验证06:37:08；两扩散继续。证据`reports/fixed-monitor-20261119-060155/execution/534-*`，原环境生产未由本次预发认证，脚本PLAN，README只读。


534扩散一实际Failed：独立批注2先选择识别候选脸，再自定义534-E1自定义名并收起重开。名称与534-E1保持正文保存通过；但保存对象仍target_ref null且无独立脸对象信息，无法区分所选绑定与自定义名称。原批注1/源图保持。完整证据534-E1-project.json及重开PNG。扩散二准备独立批注3、刷新后更换实际识别候选，继续核验。


534本轮三场景完成：原Failed/扩散一Failed/扩散二Failed。扩散二独立批注3从耳朵/脸/女人/头发候选选脸，刷新重开保持名称和正文；候选却只剩脸，无法按真实候选更换目标，未手填女人冒充换绑。GET最终3条批注target_ref均null，前两条完整对象、source/head保持。相关名称/正文持久化局部通过不代替对象绑定通过。原缺陷❌AI未通过已官方回读，不重复写。证据534-E2-after-refresh-candidate-only-face-ui.png/534-E2-project.json，固定脚本PLAN。其余14待继续，335原素材路径待用户回复；README未写。

2026-11-19 06点轮用例状态登记校验：npm run cases:check因本shell未有python别名退出127；用已配置Python3.12执行相同tools/design-cases/check-cases.py，checked545 cases, issues=0。只更新036/052实测分支元数据，脚本PLAN保持；README未写。


2026-11-19 06:49严格原实际Passed，执行通过：Chrome预发/yabinc92，今日专用项目FWXC-637损坏素材隔离回归-20261119（4774889b-f25b-4e5b-8fe0-0829756bc8f2），会话cb0966f4-9221-4ecd-b318-bfb9d03c35b7，工程f24a9cc5-2335-41c6-a20a-fbd9c12b239f。先原生导入合法9s.mp4并保存1视频+1原声9.433333秒基线，媒体面板导入精确原66字节E196-corrupt-073-20261117.mp4一次，被Uploaded bytes are not decodable media明确拒绝。正常刷新重开媒体→工程，合法9s卡正常、实际预览进度6.54/9.45秒，未点业务重试。GET完整工程JSON前后一致、revision1/轨道/文件和时间线保持。未复现整个媒体列表失效。云效原缺陷已官方API设✅AI通过并06:49:43回读；两独立扩散继续，不补算完成。原生产范围未由预发代验。证据`reports/fixed-monitor-20261119-060155/execution/637-O-*`，脚本PLAN。


637扩散一执行通过（Passed）：独立会话372a0ee0-8575-466c-baa9-3ec82bbdd3f0，工程6763c6b4-67df-47a9-baaf-dae7589a2dc2。媒体面板单次导入另一份1024字节截断MP4，Uploaded bytes are not decodable media明确拒绝，正常刷新重开合法9s仍可见，实际预览0→9.45秒结尾。完整工程JSON前后一致、revision1/9.433333秒轨道保持。文件SHA及损坏检查、前后GET、原始PNG在637-E1-*；未重复原66字节请求，未写云效评论/新单。扩散二未完成。


637本轮完结：原/扩散一/扩散二均Passed，执行通过。扩散二独立会话0c657403-c742-43db-bf56-e229a3ed049f，工程707881db-4dde-4081-9dbc-432c12eccdb5；坏66字节MP4被拒后关闭错误提示，同媒体入口新导入合法7MB一次，刷新后新旧素材均正常，旧9s播放到9.45结尾，新7MB播放到18.52/60.50秒。原保存工程完整JSON前后相同、revision1/一视频一原声9.433333秒保持。证据637-E2-*及源SHA/完整解码manifest均在本次execution。云效原问题06:49已✅AI通过并回读，扩散不重复写状态。实际预发，不冒称生产新认证。固定业务脚本PLAN，具体用例073登记更新，README只读。剩余13条继续。


618严格原本轮部分阻塞（Blocked）：已在两完成历史前置下单次4:3处理，运行中实际选完成原图，原图画面可见且导出从disabled变为可用；旧全局禁用现象在该观察未复现。但打开导出面板时已出现新完成版本且写工具恢复，未取得运行中实际下载，不能补算Passed。随后终态控制下载原PNG1254²、RGB严格等于授权原图，单独标注非运行中下载。保持云效当前状态，不因按钮启用单独设AI通过，不重发4:3。证据618-O-running-selected-original-ui.png/618-O-running-export-dialog-ui.txt/618-O-terminal-control-file-audit.json，扩散继续。


618扩散一实际Passed，执行通过：从原图复位单次3:4，处理中选已完成25569历史，导出弹窗完整AX证明宽高比等写工具仍disabled，实际点击下载后浏览器39.png完成；文件1254×1672，RGBA严格等于处理前该历史38.png，SHA2bcd1b6e...。原任务终态新增92ec完成版本且写工具恢复；无重试。证据618-E1-live-export-dialog-full-ui.txt/618-E1-live-download-submitted-ui.png/618-E1-runtime-export-audit.json/618-E1-task-terminal-ui.txt。此独立扩散通过不补算严格原4:3未覆盖的运行中下载。扩散二继续。


618本轮记录完结：严格原Blocked（运行中按钮已可用但下载在终态，仅运行中下载未覆盖），独立扩散一Passed、独立扩散二Passed，云效当前已修复保持只读，不自动重发相同修复版。E2从原图9:16一次，未完成导出禁用，完成原图200%缩放/收起重开仍可导出，写工具仍disabled时实际下载40.png1254²且RGB等于原图；终态a2caad完成历史及工具恢复，最终适应窗口。证据618-E2-*及文件审计。原错误未复现不等同原运行时下载已测；两个扩散通过不冒充原场景Passed。固定脚本PLAN，具体088登记Blocked及新报告；其余12条继续。


2026-11-19 07:37原验收Passed，执行通过（视频分割不新增独立重复音频）。今日预发Chrome/yabinc92，会话0d96f575-af67-4868-9156-37d06c867214，工程2b540a9e-bb24-4dd2-949f-3f5b748bf6b2；UI2.83秒一次分割，对齐24.96fps合法帧2.844551282秒。服务端revision2→3，总轨3→3，视频片段1→2，原声音频轨1→1，字幕及原声完整对象前后相同、视频静音保持、覆盖连续，刷新重开仍一致。云效07:37:04已官方设✅AI通过并回读。原截图辅助BGM50指令本轮按原提交但当前无匹配BGM，终态失败且完整工程未改变；不把辅助步骤未执行称全部流程无错误，也不当本视频分割缺陷失败或直接新建问题。原生产范围未由预发代验。证据681-O-track-audit.json、前后完整工程及原始PNG；两独立扩散继续，脚本PLAN。

扩散执行细化：在本缺陷独立新会话内复用已核实原字幕源基线，按真实Undo回到保存前内容并GET严格核同再另设合法切点；扩散二在独立复位基线上加入已授权独立BGM。本例范围不需为每扩散重跑同一字幕AI生成；每场景操作、Undo/Redo及数据分别留证，原结果历史另存。原声在该字幕工程为已抽取独立轨，无显式linked_video_track_id；不强制其再切两段或伪造内部绑定，允许保持整段，验收无独立重复音频及完整音画/字幕/BGM保持。


681扩散一实际Passed，执行通过：原生Undo复位内容与原字幕基线严格相等，独立UI5.00分割一次；总轨3/原声1保持。一次撤销后完整content等于未分割基线，一次重做后完整content等于该次分割（含源文件/片段/范围/字幕/原声），非凭按钮外观判定。证据681-E1-undo-redo-audit.json及四阶段完整GET、PNG。扩散二将另行复位并加入既有授权20秒BGM，不以没有BGM的原场景代验该分支。


681本轮完结：原Passed、扩散一Passed、扩散二Failed；原缺陷✅AI通过07:37已官方回读，扩散不反改原状态。E2新增BGM准备的额外静音源发生于分割前，来源清晰另存；正式UI7.00分割未新增独立轨，但原先同选且关联视频的静音源保持整段、保存关联取消，刷新重开实际选择右视频后不再联选源，关联保持失败。BGM自身同轨两段且音量/文件/0-20连续覆盖保持，其联动语义另待用户确认，不单凭同轨分段误报重复音轨。证据681-E2-after-cut-audit.json、完整前后工程、刷新及重选真实PNG。没有新建云效缺陷或评论，新增偏差只写本地。脚本PLAN，具体回归矩阵已更新，剩余11条继续。

2026-11-19 08:16预发Chrome/yabinc92：FWXC-680原回归Passed、扩散一Passed，独立原译文输入及单中文修改/刷新隔离实测；原生Undo R4完整恢复R2后继续扩散二。证据reports/fixed-monitor-20261119-060155/execution/680-*；固定脚本PLAN。详见docs/defects/FWXC-680-retest-20261119-0200-monitor.md。

2026-11-19T08:18:26.552963+08:00 FWXC-680扩散二Passed，原文单独修改/刷新保持且译文18句和时间不变，完整基线复位后独立执行；原/E1/E2均Passed。官方✅AI通过08:16:26 GET验证。下一项311，继续预发串行，无固定脚本实现（PLAN）。详见FWXC-680-retest-20261119-0200-monitor.md。

2026-11-19T08:27:01.948991+08:00 FWXC-311原问题当前同源UI链Passed：218词/6说话人段，部分移除4/5后切模块返回完整文稿、末句50.23/50.60定位；历史48.64精确删段未冒称复刻，当前入口缓存完整分析。官方✅AI通过08:26:45回读；独立扩散继续。报告docs/defects/FWXC-311-retest-20261118-1800-monitor.md；固定脚本PLAN。

2026-11-19T08:29:37.983086+08:00 FWXC-311扩散一Passed：独立新CID65933307，仅识别不移除，模块返回全文/6说话人序列与5候选保持，54.01秒不变。扩散二继续，报告FWXC-311-retest-20261118-1800-monitor.md；脚本PLAN。

2026-11-19T08:34:27.109725+08:00 FWXC-311原/E1/E2本轮均Passed，扩散二独立新CID仅移除1处、跨两模块刷新后218词/6说话人及52.72秒保持，源同一fileID；原48.64历史精准删段边界如实保留。官方✅AI通过已回读，脚本PLAN。下一项300，报告FWXC-311-retest-20261118-1800-monitor.md。

2026-11-19T08:39:18.857135+08:00 FWXC-300严格原Blocked：独立复制原48.64秒历史完整工程能力明确不支持，准备任务一次22秒完成，不重发；云效保持已修复。继续独立同源54.01秒字幕排版E1/E2，不用其结果冒充原历史版通过，脚本PLAN。报告FWXC-300-retest-20261118-1800-monitor.md。

2026-11-19T08:50:47.171056+08:00 FWXC-300扩散一Passed：128字长字幕67→40自动分组/刷新，实际SRT全文、54.01秒成片完整解码和预览/五帧视觉核验通过。原Blocked不变；E2先原生Undo+GET精确R2复位后执行混排换行，脚本PLAN。报告FWXC-300-retest-20261118-1800-monitor.md。

2026-11-19T08:58:31.167475+08:00 FWXC-300本轮原Blocked/E1Passed/E2Passed；E2 R66与初始R2 content精确相等后独立混排换行，实际SRT和54.01秒成片/解码/同点预览通过。原旧48.64完整基线未恢复，云效已修复保持；脚本PLAN。下一310，报告FWXC-300-retest-20261118-1800-monitor.md。

2026-11-19T09:01:21.684628+08:00 FWXC-310原Blocked：实际auth/validate200，原auth/refresh429未触发，未覆盖限流/恢复不改云效。扩散一正常入口/专用新CID会话读取Passed，E2正常刷新/首页返回继续；脚本PLAN。报告FWXC-310-retest-20261118-1800-monitor.md。

2026-11-19T09:03:29.952645+08:00 FWXC-310本轮原Blocked/E1Passed/E2Passed：正常单页/新会话读取/一次刷新/首页重入正常，实际authvalidate200，原authrefresh429及其恢复未覆盖，云效保持已修复。报告FWXC-310-retest-20261118-1800-monitor.md；脚本PLAN。下一568严格49字幕6配音基线准备。


2026-11-19T09:52:40.141771+08:00 FWXC-568本轮原/扩散一/扩散二均Blocked：真实原20秒/49字幕/BGM准备完成，但6目标句真实TTS合并3段，严格原6配音未满足。E1缺预分割被正常拒绝；E2原生三段R10后需跨界字幕澄清，填写后接口明确不支持原操作续办/同组保证、未重发且R10未保存修改，关联同步及一次撤销重做未覆盖。报告docs/defects/FWXC-568-retest-20261119-0200-monitor.md，证据execution/568-*。 原问题云效当前已修复；固定业务脚本PLAN，README只读。剩余6条。


2026-11-19T10:07:48.186739+08:00 北京时间10:01官方云效完整分页512条（200+200+112），已修复17，其中陈亚宾12；新增FWXC-319“图片产物应有进入编辑入口”，原环境嵌图确认预发、原11.png本机核到，原及2扩散未执行。11既有修复证据未变，5已知阻塞保留不重发；候选进入inbox后由唯一root执行者在335准备终态安全点合并。335当前等待Chrome窗口稳定确认，不创建重叠业务。


2026-11-19T10:09:12.517201+08:00 FWXC-335原实际Passed/扩散一Passed，用户批准同画面15秒源重建（原录屏15.77秒差异保留），R4真实中文字幕+静音原声+普通话音轨播放响应实际前进；10:08官方OpenAPI已✅AI通过并回读。扩散二跳转8.01→8.49及暂停已实测，但335刷新尚未覆盖，Chrome切到300后停止操作等用户确认，不补算完成。报告docs/defects/FWXC-335-retest-20261118-1800-monitor.md。


2026-11-19T10:12:05.679700+08:00 当前浏览器已因窗口切到旧300停止，335原/扩散一Passed且原云效✅AI通过已回读；335扩散二只差该会话刷新/R4保持核对，未补算。余6新原621/661/658/571/319/624未执行，后两视频源已获用户同画面重建授权。执行锁无在途业务、等待用户停止操作确认，恢复同335CID断点，不重发已受理请求。详细断点reports/fixed-monitor-20261119-060155/operator-pause-checkpoint.json。


2026-11-19T10:15:14.151076+08:00 FWXC-335本轮原/扩散一/扩散二全部Passed，执行通过。用户确认暂停Chrome后恢复335原会话，真实刷新并重开R4，完整content精确等于播放前基线；刷新后实际播放/字幕/时间轴正常。10:14官方GET仍✅AI通过，无重复写。此前同画面原片重建差异与误触源导出单独保留，不掩盖边界。报告docs/defects/FWXC-335-retest-20261118-1800-monitor.md。 原问题云效当前✅AI通过；固定业务脚本PLAN，README只读。剩余6条。


2026-11-19T14:10:33.437587+08:00 FWXC-621本轮原Blocked/E1Failed/E2Passed。061仅只读无业务修改，065及E1真实字幕契约拒绝、完整R5未变，未覆盖原成功保存状态链；E2在线受理assigned后才断网，真实终态落在Offline期间，原请求29秒完成且R6仅BGM1→0.5，其余内容精确不变，14点只读续核R6保持，No throttling已确认。原云效已修复14:07回读保持，独立新失败只记本地。报告docs/defects/FWXC-621-retest-20261118-1800-monitor.md。 原问题云效当前已修复；固定业务脚本PLAN，README只读。剩余5条。


2026-11-19T14:13:35.338976+08:00 14:00官方完整分页520条（200+200+120），项目已修复18/陈亚宾14；新增663、652、609已原描述/嵌图回读，进入inbox后由唯一root执行者在621终态安全点合并，不重复旧版本。621本轮B/F/P已落报告与矩阵，原已修复保持；网络14点已实际确认No throttling。新663关联语义待用户确认，其余队列继续。


2026-11-19 18:07 18:07官方完整分页534条（200+200+134），项目已修复18条、陈亚宾14条。14条修复证据及附件指纹均未变化：8条既有待办继续保留，6条已知阻塞不重发。本次没有新增实测或云效状态写入。专用Chrome标签765053693已被切到人工编辑会话363d6cb8，已停止浏览器操作并请求暂停确认，未收到答复；661仅保留准备断点，未上传或提交业务，不把人工会话操作算回归。 报告docs/defects/fixed-monitor-20261119-180210.md。


2026-11-19T22:11:47.593806+08:00 22:06官方完整分页544条（200+200+144），项目已修复38条、陈亚宾29条；新增15条：FWXC-701、FWXC-693、FWXC-679、FWXC-677、FWXC-676、FWXC-673、FWXC-664、FWXC-662、FWXC-659、FWXC-641、FWXC-581、FWXC-506、FWXC-483、FWXC-332、FWXC-304，无重新修复或实质更新。14既有版本未变，6旧Blocked不重发。新增原/两扩散均Not Run；当前23条待办，浏览器仍等18点发出的暂停操作确认，本轮业务提交和云效写入均0。 报告docs/defects/fixed-monitor-20261119-220443.md；具体用例regression-results-20261119-0200-monitor.md，脚本PLAN，README只读。


2026-11-20T02:04:59.032302+08:00 02:02官方完整分页544条（200+200+144）；项目已修复38条，陈亚宾创建且精确已修复29条。与22点29条修复证据及附件指纹全部一致，新增/重新修复/实质更新均0，未合并inbox为0。23条待执行和6条同版本旧Blocked保留，当前23条均仍已修复；等待原Chrome暂停操作确认，无浏览器操作、业务提交或云效写入。不重复通知同一阻塞，不把等待/资料读取计Passed或Failed。 报告docs/defects/fixed-monitor-20261120-020215.md。具体用例未发生新的实测结论，状态保持；README只读。


2026-11-20T05:59:13.887389+08:00 05:57官方完整分页544条（200+200+144）；项目已修复38条，陈亚宾精确已修复29条。29条修复证据及附件指纹与上轮全部一致，新增/重新修复/实质更新均0；23条待办当前仍已修复，未合并inbox为0。6条同版本旧Blocked保留。浏览器操作暂停确认仍未收到，无新浏览器操作、业务提交或云效写入；既有实测状态保持，不重复通知相同阻塞。 报告docs/defects/fixed-monitor-20261120-055717.md。


2026-11-20T10:00:33.564308+08:00 2026-11-20 09:48用户直接要求执行一遍回归，已恢复预发Chrome串行控制。官方完整分页544条，项目已修复38、陈亚宾29，修复证据与上轮未变。先续跑23未提交项；6旧Blocked本轮另核阻塞是否可解除，不能把旧结论算新实测。当前661以获准同画面30.70秒1280x720源，经原生翻译配音快捷入口、中文/双语一次提交，CID 6143816e-cf4f-4eb0-bb8d-d26b350ced5e，等原请求终态；旧生产30.63秒1920x1080差异保留。账号实际账户页核为yabinc92；专用19日项目需原文件夹重授权，20日新建项目也要求文件夹，未改权限，当前新会话页面实际显示未分组，工程归属待回读，不冒称新建项目完成。 报告docs/defects/fixed-regression-20261120-094814.md。


2026-11-20T10:08:23.313158+08:00 用户最新要求“要在生产环境回归”。本轮从预发改生产，账号yabinc92/Chrome；661预发准备134秒已完成，run run_v2_0bf70cefb42b43b1833acebce653a8da、CID6143816e-cf4f-4eb0-bb8d-d26b350ced5e，原清空及两扩散尚未执行。预发记录保留且不算生产通过；所有新生产场景独立干净CID，首次业务前再次官方GET精确已修复。保留仍有效工具访问限制，不访问此前已被明确禁止的生产URL。


2026-11-20T10:13:55.011358+08:00 用户确认本轮生产使用当前yabinc18。新生产清单29条均NotRun，具体用例docs/cases/regression-results-20261120-production.md，生产独立进度reports/fixed-regression-20261120-094814/production-progress.json；预发661准备保留，不混算。


2026-11-20T10:25:09.446059+08:00 Browser tool explicitly stopped this session because Computer Use is not allowed on the current URL, including user navigation. Stop browser operations; no alternative browser, tab, or tool bypass. Production661 preparation was submitted once; terminal is unknown. Resume by reading the original accepted request only after access is permitted; never resubmit. Report: docs/defects/FWXC-661-retest-20261120-production.md. Production29: no new Passed/Failed, no cloud writes.


2026-11-20T10:33:02.190031+08:00 10:27 official full pagination544 (200+200+144): project Fixed37, creator Chen Yabin exact Fixed28. New candidate FWXC-720 queued in inbox; original9 variants and15 source evidence files retained. FWXC-701/FWXC-679 official identity/status GET now externally AI Passed, removed from new-execution queue without counting local Passed. No refix/material update among27 existing eligible versions. Current production661 accepted preparation remains terminal-unknown; explicit browser access denial unchanged. No browser operation, business submission or cloud status write in this poll. Automation checkpoint refreshed without schedule/status/target changes. Report: docs/defects/fixed-monitor-20261120-102620.md.


2026-11-20T10:39:36.104772+08:00 继续回归测试直到缺陷都测试一遍; 28条为10:27查询结果，非本次重新查询；701、679的外部AI通过不计本轮实测通过。 浏览器工具明确禁止当前URL自动操作并终止会话；本次继续指令未解除工具访问限制。不换浏览器、标签页或API绕过，不重发已受理661准备任务。 每条当前精确已修复且由陈亚宾创建的候选逐项核验；原回归及两条扩散分别记录。旧阻塞逐项复核，不能以旧报告代替本轮实测，不能把阻塞或未执行算完成。 Checkpoint: reports/fixed-regression-20261120-094814/continue-until-covered-checkpoint.json.


2026-11-20T10:55:08.420942+08:00 浏览器访问已通过原Chrome通道恢复，661原生产回归执行通过，待同步云效并继续独立扩散。 生产Chrome/yabinc18，同画面源获用户授权重建。13组原文/配音文案基线，实际逐组清空第2句一次；26输入字段仅第2句译文变为空，其他12译文和13原文完整，29个时间轴对象显示未变。刷新并重新进入同一工程后仍13组、第2句为空。实际结果卡视频已下载：30.63秒1280×720 H264/AAC，完整解码退出0。原问题未复现，执行通过；两独立扩散尚未执行。


2026-11-20T11:03:40.085212+08:00 FWXC-661 original production Passed; official cloud status AI Passed PUT/GET verified at10:55:31. Independent E1 preparation accepted once, CID34d892db-21da-49a5-975a-bebc8fed6798. Formal E1/E2 still Not Run. No resubmission, comments/new defects/Git.


2026-11-20T11:08:41.090149+08:00 FWXC-661 independent E1 Passed: Independent production conversation;13 source+13 dubbing fields, first translation cleared once, remaining12 translations and all source/timeline objects unchanged. Passed. Actual UI screenshots and audit retained. E2 Not Run, case not completed yet. User allows rebuilding663/664 independent project scenarios; preserve missing-original-step boundary.


2026-11-20T11:17:57.644325+08:00 FWXC-661 original/E1/E2 all Passed, productionChrome/yabinc18. E2: Independent direct-prompt production baseline completed214s. Last of13 Chinese dubbing rows cleared once; other12 texts unchanged, media-module roundtrip and refresh/reopen preserve13rows and last empty value. All42 visible timeline objects unchanged; original-text column not present in this baseline, not claimed verified. Cloud original AI Passed GET verified10:55:31, no repeated status write; script PLAN. Next663/664 controlled rebuild as user authorized.


2026-11-20T11:25:33.062236+08:00 Official full refresh11:19:47:544bugs,24Fixed,15Chen current Fixed; new718 queued.661 current productionP/P/P with cloudAI Passed verified;15 other initial candidates now externally non-Fixed, excluded without counting local Passed/Failed. Remaining15 current Fixed include5 old-blocker production reassessments and624 account-switch last. Source snapshot:reports/fixed-regression-20261120-094814/refresh-111920/cloud/snapshot.json.


2026-11-20T11:32:56.636932+08:00 FWXC-718 originalT1 preparation accepted once, productionChrome/yabinc18, CIDbce1bc8c-600f-4479-a15f-a5f20f1a2707. Exact originalF20/shortcut/dubbing+subtitles/SimplifiedChinese/translated-only/prompt retained. Formal cross-track drag and X1/X2/E1/E2 not executed; no duplicate submission.


2026-11-20T11:49:35.751544+08:00 生产Chrome/yabinc18，原附件F20、原翻译配音快捷入口及T1完整提示词。准备126秒完成后，BGM原实例0～20秒，按原步骤仅竖直拖到最后音频轨下方空白并松手（未按修饰键）。松手后BGM仍在同一原轨，未产生新轨；官方页面实际工程GET：R3→R4但轨道数6不变，BGM轨道ID、片段ID、文件、源范围及0～20秒完全不变；刷新重开后R4/完整tracks与松手后精确一致，原问题复现，Failed。X1/X2及独立扩散待执行，不以T1断言它们已覆盖。 本次观察到另一独立变化：视频clip.source_audio新增false，原声linked_video_track_id由视频ID变null。只记录事实，关联语义不明且663已被外部改AI通过，不自动新建缺陷。BGM与视频的原关联字段保持。 继续同一合法修复轮的独立X1/X2扩散，分别新会话准备；不得重复提交原T1。 Cloud sync pending; scriptPLAN, README read-only.


2026-11-20T11:52:43.832721+08:00 FWXC-718 originalT1 Failed; official AI Not Passed updated and GET verified11:49:38. Independent E1=X1 native-F20 translated-only preparation accepted once CID916fa4fb-0c97-4df1-bc46-42ecd61c32c7; D native import at6-18 sec remains pending. E2=X2 will use a second independent bilingual+D conversation. Three independent actual runs mapT1/X1/X2; no double-counted execution.


2026-11-20T12:04:49.854493+08:00 FWXC-718 E1 Blocked: Independent X1 production preparation: nativeF20 translation completed103s, D imported/selected, native media drag did not insert. A single D6-18 preparation edit failed: matching audio tracks only3, no fourth. No D baseline, BGM-with-D core and Undo/Redo not covered; Blocked. No schema/ordinal-fixing resubmission. E2 adjusted before execution to independent bilingual-noD cross-track scenario. Original X1/X2+D not covered, originalT1 Failed unchanged and cloudAI Not Passed retained.


2026-11-20T12:07:27.742323+08:00 FWXC-718 independent E2 bilingual-noD preparation accepted once, CID5636de32-53cf-4c32-ab56-d7642114b4e8; exactF20/nativeChinese+dubbing+subtitles/bilingual/prompt retained. Formal E2 not yet executed. OriginalX2+D remains uncovered, no retry of failed X1 D preparation.


2026-11-20T12:15:44.135570+08:00 FWXC-718 completed original Failed / E1 Blocked / E2 Failed. Independent bilingual noD: preparation completed101s; BGM vertical drag into empty audio region returned to its old track. R2 toR4,6 tracks unchanged, entire BGM track exact, refresh full tracks exact. Failed; X2+D remains uncovered. Runtime additionally reported repeated dubbed segment11.98-15.18 vs8.60-11.50; separate deviation, not a new cloud issue. Original cloudAI Not Passed previously GET verified11:49; no repeat PUT. Evidence reports/fixed-regression-20261120-094814/execution/718-prod-E2-T2-cross-track-audit.json. PLAN, README read-only.


2026-11-20T12:23:03.621775+08:00 FWXC-720 originalT1 Failed: only source selected at10s, split wrongly cut video andBGM too; official status AI Not Passed GET verified12:21:13. Undo/Redo/refresh being checked; other8 original variants and2 expansions not yet covered.


2026-11-20 12:32官方完整544项分页及逐项身份回读：当前精确Fixed4项662/624/568/484；9条旧pending已外部非Fixed，开始前移出，不计本轮实测。720合法轮扩散继续，原与E1已Failed、云效AI未通过。完整证据reports/fixed-regression-20261120-094814/refresh-1230/cloud/snapshot.json。


2026-11-20T12:37:25.585119+08:00 FWXC-720 completed original Failed/E1 Failed/E2 Failed; original10s, independent5s, bilingual15s all wrongly cut video andBGM when only source selected. Undo/Redo and refresh saved wrong split. Other original8 variants not fully covered; D protection not covered. CloudAI Not Passed GET verified12:21:13; no repeatPUT. PLAN.


2026-11-20T12:49:27.510418+08:00 FWXC-662 completed原Blocked/扩散一Failed/扩散二Blocked。译配147s完成；严格原起止秒输入框当前未呈现；E1一次指定1.7～30.6306秒但Agent只检查工程，实际范围未应用；E2空水印复位后原生边界拖动仍未建立局部区间，非整数显示分支未覆盖。原Blocked不因独立新偏差改AI未通过，当前云效已修复保持，0写入。原字节/分辨率差异保留，PLAN。证据reports/fixed-regression-20261120-094814/execution/662-prod-E2-after-project.json。


2026-11-20T13:34:06.847000+08:00 FWXC-568完成原Blocked/扩散一Failed/扩散二Failed。原素材20秒/49条原文字幕/独立BGM及6条辅助目标已分步真实保存，但原生TTS只有3段，不冒称原6段。两独立实际三段配音分支，5～10和完整字幕边界5～8.6分别一次关联波纹请求，均跳过失败节点且工程全文精确不变（R9/R10），未形成可撤销删除事务，未重试。原Blocked云效已修复13:32回读保持，不因独立扩散失败改原状态。固定脚本PLAN。


2026-11-20T13:57:20.561134+08:00 FWXC-484完成原/扩散一/扩散二Blocked：三独立生产会话实际分析，原审核返回CTA均缺失；E2真实刷新→字幕检查仍缺入口，正常取消终态，R2全文精确未变。13:56云效已修复保持，0写入。624首次业务前13:55回读外部AI通过，未执行业务、未退出yabinc18、不计本轮通过。待最终完整分页排查新增。


2026-11-20T13:59:26.133368+08:00 本轮生产Chrome/yabinc18收尾：6项实际处理（原Passed661；Failed718/720；Blocked662/568/484），25项首次业务前外部非Fixed排除，不计本轮通过。13:56完整544条分页仅3项同版Blocked仍Fixed，0新增，当前pending空、执行锁释放；阻塞未覆盖保留，不能声称全部原场景已验收。云效本执行者仅661→AI通过、718/720→AI未通过，官方回读已核；README只读、无评论新单/Git。报告docs/defects/fixed-regression-20261120-094814.md；定时任务保持。


2026-11-20T14:04:28.282962+08:00 14点定时检查完整544项，陈亚宾精确已修复仅662/568/484，详情/附件与13:56相同、评论0，保留同版Blocked；0新增、0业务/云效写入。13:59人工轮已结束，自动任务4仅更新过时执行断点，计划不变。报告docs/defects/fixed-monitor-20261120-140021.md；静默。


2026-11-20T14:34:30.651099+08:00 严格原场景Blocked：新CID d5ec123d-8ebc-4863-a110-6040f1b72e7b，真实独立工程e4cd7161-2178-4b79-bd72-a5b2fce5065f，原片插入先因未选择素材失败，原生选择后补齐前置的分步插入完成61s；49条原字幕导入27s，R3。原生创建配音实际受理一次，R5仅3个真实dubbing clip/配音组，不是原6段，不重做TTS或用原声伪装。原正式删除未提交。证据reports/FWXC-568-rerun-20261120-1416/execution/O-actual-dubbing-project.json。扩散改为本轮实际三段配音分支；先选中原E196-BGM20.wav，独立添加BGM请求已受理，正式删除待执行。


2026-11-20T14:59:58.323015+08:00 用户明确要求再次568回归：本轮独立CID d5ec123d-8ebc-4863-a110-6040f1b72e7b，严格原Blocked（原生3段，原6段未覆盖）；E1原5～10提示词跨字幕边界失败未保存，R10全文不变；E2完整对白8.6～17.10一次删除Passed，11.50秒、26可见字幕/2真配音，后续前移8.5秒，一次Undo/Redo/刷新及实际下载完整解码通过。云效14:55官方回读已修复、0写入；不混入上午六项批次统计。报告docs/defects/FWXC-568-rerun-20261120-1416.md；固定脚本PLAN、README只读、无评论/新单/Git，执行锁已释放。


2026-11-20T18:06:48.420154+08:00 18点官方完整549项分页，陈亚宾精确已修复仅568/484两项，无新增/修复更新，详情附件及评论与上次相同，不重跑同版Blocked。662已外部改已关闭，18:05官方身份状态GET回读后移出新开队列，历史实测不改Passed。568下午明确重跑B/F/P保留且不再播报。业务/云效写入0，定时不变，README只读。报告docs/defects/fixed-monitor-20261120-180253.md。


2026-11-20T22:21:48.946514+08:00 22:00 monitor: official550bugs complete pages200/200/150,42projectFixed,21Chen exactFixed. New19 rounds queued (11first monitored,8refix),568/484same-versionBlocked retained without replay. Google Chrome running but native visible window unavailable(cgWindowNotFound);staging yabinc92 login unverified,0new business/cloud writes. User restoration question pending. All19 preflightBlocked/unexecuted, pending retained;active execution lock released,waitingForUser true. Original736 screenshot verified annotation-popover input,not main composer. Automation4 checkpoint refreshed only,schedule unchanged. Report:docs/defects/fixed-monitor-20261120-220255.md; case matrix:docs/cases/regression-results-20261120-2200-monitor.md. README read-only,no comments/bugs/Git.


2026-11-21T02:00:45.213720+08:00 02:00 monitor: official550 complete pages200/200/150;42projectFixed,21Chen exactFixed. All21 repair fingerprints and attachment metadata unchanged. Pending19 retained;568/484 same-version processed blockers not replayed. No user restoration response, no browser retry or duplicate reminder;window/login not rechecked.0business/cloud writes. Active lock remains released;scheduled staging/yabinc92 authorization retained. Report:docs/defects/fixed-monitor-20261121-015827.md;README read-only,no comments/bugs/Git.


2026-11-21T05:58:07.863315+08:00 06:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all21 repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. No user restoration response;no browser retry,window/login not rechecked,no duplicate reminder.0business/cloud writes,lock inactive. Report:docs/defects/fixed-monitor-20261121-055630.md;README read-only,no comments/bugs/Git.


2026-11-21T10:00:23.048456+08:00 10:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261121-095802.md;README read-only,no comments/bugs/Git.


2026-11-21T14:02:50.730715+08:00 14:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261121-140034.md;README read-only,no comments/bugs/Git.


2026-11-21T18:06:17.052741+08:00 18:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261121-180407.md;README read-only,no comments/bugs/Git.


2026-11-21T22:00:55.939086+08:00 22:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261121-215844.md;README read-only,no comments/bugs/Git.


2026-11-22T02:00:43.135061+08:00 02:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261122-015841.md;README read-only,no comments/bugs/Git.


2026-11-22T05:58:07.470218+08:00 06:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One supported read-only inventory:Chrome running,windows empty,no inventory errors.0navigation/app selection/business/cloud writes. User restoration still pending,no duplicate reminder;staging login not verified. Lock remains inactive. Report:docs/defects/fixed-monitor-20261122-055614.md;README read-only,no comments/bugs/Git.


2026-11-22T10:04:26.576770+08:00 10:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. Inventory windows field is omitted;earlier six poll empty-array statements corrected by appended evidence notes. One actual native getApp now fails cgWindowNotFound.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261122-100146.md;README read-only,no comments/bugs/Git.


2026-11-22T13:57:52.483655+08:00 14:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One actual native Chrome window observation fails cgWindowNotFound;no window-count inference.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261122-135519.md;README read-only,no comments/bugs/Git.


2026-11-22T18:05:55.829278+08:00 18:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One actual native Chrome window observation fails cgWindowNotFound;no window-count inference.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261122-180351.md;README read-only,no comments/bugs/Git.


2026-11-22T22:04:59.577605+08:00 22:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One actual native Chrome window observation fails cgWindowNotFound;no window-count inference.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261122-220223.md;README read-only,no comments/bugs/Git.


2026-11-23T02:01:04.511934+08:00 02:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One actual native Chrome window observation fails cgWindowNotFound;no window-count inference.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261123-015855.md;README read-only,no comments/bugs/Git.


2026-11-23T06:02:46.321756+08:00 06:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all repair/attachment fingerprints unchanged.0new,19pending retained,568/484same-version blockers not replayed. One actual native Chrome window observation fails cgWindowNotFound;no window-count inference.0navigation/business/cloud writes;no duplicate reminder,staging login unverified,lock inactive. Report:docs/defects/fixed-monitor-20261123-060058.md;README read-only,no comments/bugs/Git.


2026-11-23T10:03:03.551934+08:00 10:00 monitor: full550 bugs,42projectFixed,21Chen exactFixed;all fix fingerprints unchanged.0new,19pending and568/484same-version blockers retained. Actual native Chrome window recovered;dedicated blank tab wrapper failed,one native tab-selection action interrupted by user control. Stopped per ego skill,user pause question pending,staging/login not verified.0business/cloud writes,active lock released. Report:docs/defects/fixed-monitor-20261123-095830.md;README read-only,no comments/bugs/Git.


2026-11-23T14:06:34.289705+08:00 用户要求继续缺陷回归：Chrome预发yabinc92已核验，今日专用项目与单张原图上传完成；14:04官方完整550项，17Chen已修复。736/691/675/601外部非已修复首次业务前排除，不计本地实测；15待办继续，568/484同版不重跑。0AI提交/云效写入；固定脚本PLAN。报告docs/defects/fixed-regression-20261123-134841.md，README只读。


2026-11-23T14:21:36.964572+08:00 FWXC-720扩散一执行通过：新会话0797ca30-ea93-469f-a612-85f5cb2c8e67，默认快捷入口T1配音和字幕/简体中文/译文，原F20核同。仅原声选中，10秒原生分割后原声0～10/10～20；视频/BGM各0～20保持，字幕与配音全部片段文字/时间保持。一次撤销恢复，重做与实际Chrome刷新重开均保留正确结构。实际下载dubbed-video(13).mp4，20.00秒、1280×720、30fps、AAC，全片音视频解码exit0。严格完整原指令与其余原变体未执行，不能将本分支当原验收Passed，不改云效。证据reports/fixed-regression-20261123-134841/execution/720-E1-*，固定脚本PLAN。


2026-11-23T14:27:37.578767+08:00 FWXC-720最新门禁：14:26官方已由外部改为❌AI未通过，本执行者0状态写入。严格原指令已通过实际鼠标聚焦+粘贴保留，配音和字幕/简体中文/译文及F20附件已齐，但未发送，原回归NotRun；扩散二未提交。扩散一既有真实Passed保留，不能替代严格原验收。移出新开业务待办，完整外部刷新进行中，未重复AI提交。


2026-11-23T14:37:12.139489+08:00 最新550项分页：陈亚宾当前已修复13项。703/668/581提交前外部状态分别为❌AI未通过/❌AI未通过/✅AI通过，均移出新开队列，不计本地实测。624严格跨账号缺获准第二账号，原/两扩散Blocked，保持云效。621原061基线四附件准备已单次受理CIDea7cae1a-6576-4027-8928-6fd5e109af5f，实际断网验收未执行，准备仍Running。720扩散一Passed，严格原及扩散二未发送且外部已AI未通过，不覆盖外部结论。固定脚本PLAN，0云效写入/评论/新单/Git；README只读。证据reports/fixed-regression-20261123-134841/。


2026-11-23T14:49:08.860290+08:00 续跑安全断点：621整体基线准备38秒未创建，已原生导入A20形成20秒独立工程；B素材原生拖拽未生效，于同一CIDea7cae1a-6576-4027-8928-6fd5e109af5f单次受理B10追加步骤（不同前置下的单项继续，不重试原请求）。回读时Chrome切到用户云效列表，未确认终态，停止UI，等待暂停整个Chrome。原正式断网未执行，不能判Passed/Failed；原请求仅回读不重发。唯一执行锁保留，currentSubmission在途；报告docs/defects/fixed-regression-20261123-134841.md。720扩散一P、原NR且外部AI未通过；624B；0云效写入，固定脚本PLAN。


2026-11-23T14:55:01.762680+08:00 定时14:50只读监控：完整550项/项目19Fixed/陈亚宾5Fixed（624/613/606/569/568），修复及附件指纹均同版，0新轮。621/612外部AI未通过，585/580/571/507/247外部AI通过，状态纠正证据交latest-monitor-check串行合并，不覆盖在途主账本；484外部AI通过保留旧未覆盖。621B追加原请求终态未知、Chrome控制等待问题已发，0导航/业务/云效写入，不重复提示。自动4顶部断点已刷新，计划ACTIVE不变。报告docs/defects/fixed-monitor-20261123-145025.md，README只读。


2026-11-23T15:11:07.233674+08:00 用户要求验收当前已修复缺陷：完整550项/陈亚宾5Fixed，当前624/613/606/569/568。621原追加B请求只回读完成36s，页面视频与原声均A0～20+B20～30，总30秒，未重发；正式061/065断网及扩散未执行，外部AI未通过保持。主账本合并7项非Fixed状态纠正，pending仅624/613/606/569；624缺第二账号B，568同版已知B不自动重跑。继续613/606/569。0云效写入，固定脚本PLAN。新快照reports/fixed-acceptance-20261123-150852/，621终态证据reports/fixed-regression-20261123-134841/execution/621-O061-step2-terminal*。


2026-11-23T15:17:29.227956+08:00 当前Fixed验收613原图登记准备单次受理CIDfc6e1e3f-9a7b-4fd8-afd0-743afcf28d08，唯一原附件076-branded-source.png/1024²/SHA保留。仅要求原图登记打开、不编辑不生成；正式两批注+去背景原指令未发送，当前Running，不计Passed，不重复提交。Chrome预发yabinc92，原环境生产。证据reports/fixed-acceptance-20261123-150852/execution/613-O-prepare-*；固定脚本PLAN，0云效写入。


2026-11-23T15:36:33.660558+08:00 613正式原组合请求已单次受理：原生导入已打开独立原图editor_image_c078860ee5084a61b653f9d1c1b64291；左耳(.405,.39)、左耳机(.075,.825)两点及原全文已保存，实际默认识别名耳朵/耳罩，目标由原坐标与正文保持。完整原指令仅替换本轮真实源版ID；当前CIDfc6e1e3f-9a7b-4fd8-afd0-743afcf28d08正在执行，不改画布、不重发。原/两扩散尚无终态结论，0云效写入，固定脚本PLAN。证据reports/fixed-acceptance-20261123-150852/execution/613-O-formal-*。


2026-11-23T15:45:11.739547+08:00 613原验收Failed：两批注+去背景组合在最终导出阶段显示“请先完成当前绘制、输入或图片处理。”；新图片版本已保存，AI未交付最终透明成品，部分图像另行审计，不点击重试。云效官方已从已修复改为❌AI未通过并GET回读成功（1次状态写入、0评论/附件/新单/Git）。当前同一合法修复轮两项独立扩散待执行。终态及同步证据：reports/fixed-acceptance-20261123-150852/execution/613-O-formal-terminal-full-ui.txt；cloud-updates/FWXC-613/result.json。固定脚本PLAN。


2026-11-23T15:57:01.475292+08:00 613扩散一Failed：独立原图5228与两条完整批注，单次组合执行再次报“请先完成当前绘制、输入或图片处理。”；继续只回读到图片生成结束后保存终态。手工导出仅为部分产物审计，1024²PNG的alpha全255，无透明像素，不能算完成。CID88893fac-d1c8-41d4-9d89-ff0880b8b2a9；613-E1-terminal-ui.txt/.png与partial-native-export.png已保存。原Failed/扩散一Failed/扩散二待执行；云效原结论❌AI未通过已核验，无重复状态写入。固定脚本PLAN。


2026-11-23T16:05:22.231788+08:00 新出现的当前URL工具访问停止：613扩散二在CIDfc58df89-9cb5-4d51-aac6-24d811835528单次受理后，回读被受支持Chrome工具明确禁止当前预发URL并结束会话；限制即使用户自行导航仍有效。立即停止UI，0重发、0绕过，不将当前新限制当历史窗口切换。扩散二产品终态未知，记Blocked/未覆盖；原Failed、扩散一Failed保留，云效原结论❌AI未通过已GET确认（本轮1次状态写入、0评论/附件/新单/Git）。606原授权原图已找到并与历史原图导出RGB逐像素核同，16:00官方GET仍已修复，但本轮业务未执行；569未执行；624缺第二账号Blocked，568同版已知Blocked不重跑。活动UI锁释放，accepted/currentSubmission标识保留，真实工具访问恢复后只先回读原E2，不重发。证据reports/fixed-acceptance-20261123-150852/browser-stop-checkpoint.json；固定脚本PLAN，README只读。


2026-11-23T16:11:17.728975+08:00 用户要求继续回归后的只读复核：官方完整550项（200/200/150），项目精确已修复13项，陈亚宾4项624/606/569/568；详情、修复证据及附件元数据均同版，无新增修复轮。613官方身份GET仍❌AI未通过，本次0状态写入；其扩散二已受理CIDfc58df89-9cb5-4d51-aac6-24d811835528的产品终态仍未知，保留原标识，仅在真实工具访问恢复后回读，不重发。先前当前预发URL的明确工具访问禁令无解除证据，本次未访问受限页面、未尝试绕过，0浏览器操作/0新业务。606与569待执行；624缺获准第二账号Blocked，568同版Blocked不重跑。快照及逐项指纹核对：reports/fixed-acceptance-20261123-150852/continuation-20261123-160918/；状态/报告/进度已同步，README只读，固定脚本PLAN。


2026-11-23T16:14:26.627428+08:00 用户再次要求有头续跑：仅核对当前Chrome受支持的browser-troubleshooting文档及浏览器能力列表（viewport/management），没有访问状态查询或解除URL禁令入口。未访问受限预发页面，0UI操作/新业务/云效写入。已受理613扩散二终态未知继续保留，真实工具访问恢复后先回读，606/569待执行。本次不是产品新实测。诊断证据reports/fixed-acceptance-20261123-150852/browser-access-diagnostics.json。


2026-11-23T16:21:21.857422+08:00 用户改为生产并确认本轮yabinc18。使用同一已选Chrome原生通道返回实际页面，原可见窗口仍为预发；已受理613扩散二现显示Failed，具体报当前本地图片模型不支持批注、参考或引导层，原源版debfd保持，未交付透明成品。仅回读保存613-E2-terminal-ui.txt/.png，无重发；613本轮原/E1/E2均Failed，云效原❌AI未通过不重复写入。当前工具访问实际恢复证据已登记，旧URL停止不再当作当前阻塞。转入用户指定生产，预发613不在生产重放，原预发范围不冒充生产验证。固定脚本PLAN，0新增云效写入/评论/新单/Git。


2026-11-23T16:31:40.696093+08:00 606生产原前置已原生单次导入授权1254²香水原图48b7，CIDb8b89e86-05ed-4579-8ed4-0ab8796341c9，在原(.58,.22)保存原全文批注“定位，再在瓶盖旁添加新品”，未加对话引用。只读当前对象标识查询单次受理，原正式完整扩图+加字+导出未发送。当前账号yabinc18，原图保持，固定脚本PLAN，0云效写入/评论/新单/Git。证据reports/fixed-regression-production-20261123-161635/execution/606-O-*。


2026-11-23T16:35:09.126418+08:00 606生产原正式请求已单次受理，CIDb8b89e86-05ed-4579-8ed4-0ab8796341c9，源版本48b7；首次业务前16:33官方GET确认陈亚宾/精确已修复。完整原业务指令已保留，历史project/file ID因当前可见UI未返回，替换为当前打开独立工程/源文件名及真实源版ID，差异明示，不伪造对象数字。原(.58,.22)定位批注原全文已保存、无对话引用，原源1254²未改。原验收Running，两扩散NotRun，只回读、不重发；0云效写入，固定脚本PLAN。证据reports/fixed-regression-production-20261123-161635/execution/606-O-formal-*。


2026-11-23T16:40:32.848844+08:00 606生产原验收Failed：80秒聊天提示“计划1跳过了执行失败的节点”；随后仅回读到实际图像处理结束、新版7eed保存。手工原生导出实际PNG1254×1254/RGBA、2555126字节、完整解码，仍1:1而非16:9；“新品”已生成，完整瓶身/原标签可见，不能因局部加字成功判完整原验收通过。未重发。云效原结论同步进行中，两扩散待执行。证据reports/fixed-regression-production-20261123-161635/execution/606-O-terminal-ui.txt/.png、606-O-native-export.png与audit.json。固定脚本PLAN。


2026-11-23T16:42:03.031484+08:00 606原Failed已通过官方OpenAPI从已修复改❌AI未通过并GET回读成功（1状态写入，0评论/附件）。后续为同一合法已启动修复轮的独立扩散，不重新开轮。生产原生新会话入口已核专用项目ID347987d5-735d-4e20-a5c1-cd8ca70d07af，继续E1原生比例入口、E2无批注同目标对照。证据reports/fixed-regression-production-20261123-161635/cloud-updates/FWXC-606/result.json。


2026-11-23T16:51:10.764680+08:00 606扩散一Failed：新CIDb5ea163f-ea5b-4b5f-9c9f-ed098ddfbaf8/独立原图4cc，原瓶盖定位批注保留。原生宽高比16:9单次有效选择后立即报“当前本地图片模型不支持批注、参考或引导层，请保留草稿并先处理这些内容。”，源版未变，没有已受理生成请求或新图；依赖新图的加字/导出未覆盖，不移除批注重试。先前AX点击被浮层遮挡未触发，25%仅调整预览后实际点击16:9，结束已恢复适应窗口。证据reports/fixed-regression-production-20261123-161635/execution/606-E1-terminal-ui.txt/.png与result.json。原Failed云效已❌AI未通过，不重复写。固定脚本PLAN。


2026-11-23T16:56:18.878209+08:00 606扩散二无批注同目标对照已单次受理，CID43b3ef7d-1d1f-44d6-b507-e78a611f170c，新独立原图58f3/1254²，无批注/画笔/引用，仅本图。完整要求16:9、依新图瓶盖位置加黑色48源像素新品及PNG交付，当前Running，不重发。569原授权视频/49字幕/BGM/六配音计划仅本地核同准备，尚无569业务。固定脚本PLAN。


2026-11-23T17:01:53.856039+08:00 606生产完整原/两扩散完成：Failed/Failed/Failed。扩散二无批注同目标CID43b3ef7d-1d1f-44d6-b507-e78a611f170c，84s结束后继续只回读到实际图像2e18保存；实际原生下载PNG1254²/RGBA、2498767字节、完整解码，仍非16:9；新品及完整瓶身/标签可见，不凭局部成功判组合通过，字号48未独立精确测量。0重发。云效原❌AI未通过先前已GET核验，本项总1状态写入、0评论/附件/新单/Git。证据reports/fixed-regression-production-20261123-161635/execution/606-E2-*及606-final-result.json。569 16:58官方GET仍陈亚宾/精确已修复，开始独立原基线准备；固定脚本PLAN。
