<!-- ERYE199-051-V4-CORRECTION-20261123 -->
2026-11-23：ERYE199-051 v4 创建前的入口预期修正为「选择媒体」。原生产证据覆盖空态显示、选取媒体建成工程及刷新后入口不再显示，按新版预期复核为 Passed。当前 142 条有效用例为 47 Passed、20 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [复核记录](cases/requirements/ERYE-199/revision-051-select-media-20261123.md)
<!-- /ERYE199-051-V4-CORRECTION-20261123 -->

<!-- ERYE199-051-V3-EXEC-20261123 -->
2026-11-23：ERYE199-051 v3 生产实测 Failed。空白会话缺少「新建视频工程」入口，通过「选择媒体」建成工程后和刷新后两项均符合预期。当前 142 条有效用例为 46 Passed、21 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [报告和截图](cases/requirements/ERYE-199/results-051-v3-production-20261123.md)
<!-- /ERYE199-051-V3-EXEC-20261123 -->

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
本次同步后校验：`npm run cases:check`，618条、0问题；其他141条完整记录及状态统计保持，078仍Failed，FWXC-694回执已验证。

ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。 [同步明细](cases/requirements/ERYE-199/defects-078-production-20261118.md)。本批检查点已完成，后续仅回查，不重复创建。
<!-- /ERYE199-078-YUNXIAO-20261118 -->

<!-- ERYE199-COMBINATIONS-076080-EXEC-20261118 -->
本批仓库检查：`npm run cases:check`，618条、0问题；工作流卡片及组合脚本安全测试10/10通过，执行模块语法检查通过；115个证据文件、报告26处本地链接及其他137条结果保留校验通过。

2026-11-18：ERYE199-076～080生产实跑4 Passed / 1 Failed，5条接入AUTO；当前142条42 Passed / 9 Failed / 2 Blocked / 21 Not Applicable / 68 Not Run。078同会话切换后字幕轨多出：S1实际4轨、T2实际6轨；原片及历史工程身份保持，失败截图与本地缺陷已保存，后续已同步FWXC-694。079的D流程通过，已知FWXC-693译文显示问题另列未修复。其他137条及原云效关联保持。以下旧统计按日期保留历史。 [本轮报告](cases/requirements/ERYE-199/results-076-080-production-20261118.md)。
<!-- /ERYE199-COMBINATIONS-076080-EXEC-20261118 -->

<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。 [同步明细](cases/requirements/ERYE-199/defects-071-production-20261118.md)。本批已有完成检查点，后续只读回查，不能再次新建。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

<!-- ERYE199-CARDS-069075-EXEC-20261118 -->
本批验证：618条用例文档检查issues=0；两JS语法检查、5项提交与会话安全门禁测试、5个Python文件语法检查通过。7个实际下载文件完整解码及属性核验通过；074/075源内容比对14/11项通过，071页面业务断言失败保留。

TaskSpace6已正常finish一次，未保留页面；当前批次结束。原run均已完成，不为补看结果重新生成。

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
2026-11-18：完成[48条ECMT工作流专项设计](design-cases/multi-workflow/editor-card-multitrack-cases.md)及统一入口、编写范围说明、PLAN登记同步。当前48条Not Run，不将浏览卡片/既有工程作为执行结果。通过ego-browser只读核对七个首页卡片、字幕模式选项、分割/裁剪/音轨控件；视频/BGM双向及其他轨保持的验收来自用户确认，未实际拖拽/分割验证。没有生成、导出、云效写入或更改正式需求既有执行结果。[页面观察与限制](design-cases/multi-workflow/editor-card-multitrack-design-notes-20261118.md)。
<!-- /ECMT-DESIGN-20261118 -->

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正说明](cases/requirements/ERYE-199/revision-008-registration-scope-20261118.md)。后续008只按v2执行，不恢复登记撤销断言；统一入口不写执行结果。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

<!-- ICP-EC-YUNXIAO-SYNC-20261117 -->
2026-11-17：ICP电商原文既有实测已同步7条云效缺陷FWXC-625～631；15张失败原图已上传、嵌入，45附件及正文/字段回读通过，均🤔AI提缺陷、牛诗晴、生产环境。测试结果未变：5整例Failed、19轮已执行、6轮缺前置；Case01素材/首稿缺口及未触发假设不当产品缺陷。本次未重跑。 [同步清单](design-cases/icp-workflows/defect-sync-production-20261117.md)。检查点均已完成，后续只读回查，不重建。
<!-- /ICP-EC-YUNXIAO-SYNC-20261117 -->

<!-- ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->
ERYE199-014 → [FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60)；ERYE199-056 → [FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949)。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。 [同步明细](cases/requirements/ERYE-199/defects-unimplemented-014-056-production-20261116.md)。
本轮校验：538条用例格式检查0问题；ERYE-199运行器15项单测通过，覆盖063单独/混合范围排除和直接执行器不创建浏览器；当前62条统计、原8失败关联、两条NA缺陷、3原图哈希及8附件/图片引用核验通过。
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
本轮校验：539条用例格式检查0问题；ERYE-199运行器15项单测通过；变更脚本语法和差异检查通过。9组独立项目、5个原run及51张原图哈希/状态/登记/延期/链接核验通过。
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

本次定义校验：cases:check检查534条、0问题；ERYE-199运行器13项单测通过；63条当前状态、31条原始归档、9条待执行及22条恢复条件、子范围计数和新链接/锚点一致。上述仅为文档和脚本保护检查，不计业务执行结果。

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

<!-- ERYE210-CURRENT-FIVE-20261116 -->
## ERYE210-045～049当前功能v2生产Chrome执行（2026-11-16）

本批5条：1 Passed, 2 Failed, 2 Blocked, 0 Not Run；当前43条：**38 Passed / 2 Failed / 3 Blocked / 0 Not Applicable / 0 Not Run**。014原Blocked和完整结果保持，其他用例沿用历史实测；原11条退役不恢复，旧迁移/缓存/回退目标独立延期。

045共享素材引用隔离及复用通过；047在真实翻译配音工程混音50%保存重开后，明确单句再生成报页面协议错误；049关闭水印后原生导出报错、未交付页面结果，后台原任务done仅作辅助证据。048有独立真实翻译配音完成结果，但配音页无法稳定恢复原文案，目标编辑分支未执行。046通过同一已清理工程的会话入口明确二次只分析，实际结果以本轮报告为准。普通字幕准备、复制/属性缺失和额外创建的脚本错误保留为前置历史，不计产品缺陷。原生失败/阻塞截图及SHA256已归档。

默认仍43个有效脚本入口（42 AUTO、014唯一BLOCKED登记项），自动化接入与实际Blocked分开记录。 [完整用例](cases/requirements/ERYE-210/cases.md) · [本轮执行与截图](cases/requirements/ERYE-210/results-045-049-current-functions-prod-20261116.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。以下章节保留历史时点。

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
530条用例校验0问题、类型检查、38个有效入口及退役编号0入口验证通过；当前43条/registry一致，11条v2结果、原11条失败和缺陷链接、原始证据哈希均保留。

<!-- /ERYE210-RETIRE-FAILED-11-20261113 -->

<!-- ERYE210-V2-EXECUTION-20261113 -->
## ERYE-210当前功能11条v2生产Chrome执行（2026-11-13）

本批11 Passed / 0 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；54条当前28 Passed / 11 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。021、025～027、029～035新版已实跑，截图及脱敏核验数据归档；原v1历史、其他用例及FWXC-516/518等既有云效关联保持。新项目/独立工程、串行零自动重试，实际失败与脚本/前置错误分开记录；未重复提交受理未知任务。本次没有云效写入或代码推送。

[逐例结果与截图](cases/requirements/ERYE-210/results-021-035-v2-prod-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
原始Playwright报告11 passed/0 unexpected；30 PNG、8 JSON共38个文件哈希核验通过。541条用例校验0问题、类型检查、当前状态/registry/版本/既有缺陷关联、差异空白及报告链接均通过。

<!-- /ERYE210-V2-EXECUTION-20261113 -->

<!-- ERYE210-CURRENT-FEATURES-V2-20261113 -->
## ERYE-210阻塞用例按现有功能优化（2026-11-13，未执行）

021、025～027、029～035共11条改为v2，明确前置、完整输入、步骤及预期，并同步脚本；新定义Not Run，旧Blocked/截图归档。045～049缺真实旧入口/缓存/回退环境，继续Blocked；当前页面导航不能替代迁移验收。原跨账号、草稿冲突、跨词/无词级/双语配音风险单列保留，未声称新版覆盖。

54条当前17P/11F/9B/0NA/17NR；49个入口43 AUTO、6 BLOCKED门禁，另5 PLAN。040/041仍Failed、FWXC-516/518等回执保持。此次只改定义/脚本/进度，未跑生产任务、未改云效。

[逐条原因和v2用例](cases/requirements/ERYE-210/case-021-035-v2-current-features-20261113.md) · [当前进度](cases/requirements/ERYE-210/execution-status-current.md)。
类型检查、541条用例一致性（0问题）、49条总入口/11条v2入口发现、状态及云效关联一致性、差异空白和报告链接检查通过。未执行生产业务。

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
类型检查、541条用例一致性（0问题）、49条入口发现及相关差异空白检查均通过；51个归档文件哈希和相对链接有效。

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

用户确认执行全部适用正式用例，并确认无第二测试账号/M2授权客户端/macOS Safari等环境。已在预发新建专用项目b5895bb2-a050-4551-8072-fe6d6e2dbc3b，Ego TaskSpace 12（erye196-rerun-20261111）。本轮已实际执行15条：3 Passed（001/009/015）、12 Failed（003/005/006/007/008/010/011/013/014/017/018/020）；002/004沿用用户确认Not Applicable，19条缺环境Blocked，98条尚未执行，不计通过。015超范围21秒请求先拦截，按负向意图填“取消、不修改”后同一run结束，刷新完整状态/版本1及撤销按钮保持。003跨标签未主动更新，手动刷新可恢复；其余多为原编辑目标未完成。014首次夹具时间不匹配先修正源SRT/绑定时间，正常加载后才提交业务，不把准备失败当产品失败。

020原任务run_v2_b8a4ea07f9ca43a1842adb3fdb5d8337已done但需求满足false，视频仍1段；窗口最小化导致终态PNG未取得，原消息/前后工程/页面文本已保存，须恢复窗口补图，不能重发。已确认空间agent控制，Browser窗口CDP恢复不成功，Page.bringToFront不恢复最小化，computer-use node_repl初始化在重置后仍报failed to write kernel assets/OS error 3。已请求用户恢复窗口，本轮尚未完成，不结束任务空间；用户恢复后须续用空间12，不新建空间。

本地结果已同步到[逐条进度](cases/requirements/ERYE-196/execution-status-20261111.md)、[完整提示词/步骤/截图](cases/requirements/ERYE-196/results-all-applicable-rerun-20261111.md)、用例行、meta.yaml及registry.yaml执行字段；原结果保留previous_execution字段或历史报告，自动化PLAN/脚本字段保持。资料目录test-cinlink，不是空壳cinlink-test。未写云效、未改产品代码/默认脚本、未推送。

18:44云效FWXC-240由已修复改为✅AI通过，一次仅status、回读ID/名称成功，其他核对字段保持，无新增评论/附件/缺陷。

Passed（当前登录态/预发）：原项仅历史图，恢复提示词“给这个视频加中文字幕并烧录，输出带中文字幕的视频”。新项目4548a377-b735-48c3-a332-44e50d4d769e、新会话26642372-ab8b-4ecb-95b3-471cc45350be，单附件不@，原完整指令先后提交两次，各一次；92.891/60.775秒done、需求满足true，无补槽确认，未出现Missing CinLink access token or API key.。执行中刷新任务恢复；完成后刷新，两轮历史保留，成片分别实际播放1.021412/1.033672秒、1280×720、中文字幕可见，无媒体错误。第二轮明确复用同原片字幕，返回同成片ID，不计第二次独立转写。8本轮PNG/1历史图/脱敏汇总见[报告](design-cases/multi-workflow/fwxc240-retest-20261111.md)。原素材/环境未注明，未覆盖令牌过期/撤销、重新登录恢复、跨环境或长期压力；无默认配置变更/推送。

18:22状态写后验证：FWXC-241身份/项目/类型与实际工作流核对通过，一次仅status由已修复/29写为✅AI通过/0937b1d9e486323590880e5450；回读ID/名称一致，标题、原富文本描述、负责人、迭代、标签、自定义字段等核对保持。底稿reports/fwxc241-rerun-20261111/status-update/result.json，无新评论/附件/缺陷。

原项42114a92508fea2d46c3bdd85b，正文仅历史原图（文件d8590493df4fe8773dc274ab25），官方GetWorkitemFile只读取回后恢复提示词。Ego预发新项目6b23506c-1157-4199-9ea8-af08ff6c2285、新会话71de841d-d6ca-4ac6-b8ac-f4f6a84aa39d，两本地视频SHA/独立输入ID核对，双附件无@一次提交。原片A/B分别播放至0.850048/0.865888秒；执行中刷新一次后恢复并分别至0.839190/0.825754秒，1280×720、ready4、无媒体错误。run_v2_0eda8738017643249050f0b713bd9828在18:15:21～18:18:22完成，181089ms，done/需求满足true，无补槽确认；终态原片两预览非零尺寸保留，两个成片预览分别播放至1.140984/1.099348秒、无媒体错误。Passed，限本轮材料/预发显示和播放，不扩展到原素材完全复原或全量字幕验收。10本轮PNG/1历史图/状态JSON及[报告](design-cases/multi-workflow/fwxc241-retest-20261111.md)已归档，未下载成片、未改配置或推送。

18:07状态写后验证：FWXC-244身份/项目/类型及实际工作流匹配，一次仅status由已修复/29更新为✅AI通过/0937b1d9e486323590880e5450；回读ID/名称成功，其他核对字段保持。底稿reports/fwxc244-rerun-20261111/status-update/result.json，无新增评论/附件/缺陷。

Ego预发新项目92bdbdd9-8a6b-4471-afd3-3215fe5c9910、新会话ee7d0d4b-5953-43ec-b9aa-b866e5e315c9，附件/@/输入files均0；一次原完整指令。run_v2_69f75be6600d463caa13bccb400b236e在17:56:54～18:03:35完成，401224ms，done/需求满足true，无补槽/确认。两SRT页面下载57/59字节，SHA与产物内容SHA一致、格式/语言/内容/同时间轴核验通过，均0.820～2.140秒。实际生成源下载2591249字节、SHA对应独立ASR输入，ffprobe H264/AAC/1280×720/5.056009秒，ffmpeg全解码0，1/3秒人物帧核验；本机large-v3-turbo自动识别zh“这是自动化测试”（无源文本提示词）。转写source_media_file_id等于本run生成视频ID，英译source_subtitle_file_id等于交付中文ID，排除旧素材/交付拿错。Passed，未人工完整听审/逐帧同步/测扣费。初始页面/API读取超时发生提交前并恢复，不计产品失败；5PNG/两SRT/WAV/ASR/汇总及[报告](design-cases/multi-workflow/fwxc244-retest-20261111.md)已归档，FIXME配置未改。

17:51状态写后核验：FWXC-245身份、项目/类型及实际工作流匹配，一次仅status由已修复/29变更为✅AI通过/0937b1d9e486323590880e5450；回读ID/名称一致，其他核对字段保持。底稿reports/fwxc245-rerun-20261111/status-update/result.json，无新缺陷/评论/附件；原缺交付范围、字幕差异和未覆盖范围保持。

新项目910fec7f-311c-4dec-99e4-f637a971adb6、新会话8281fe09-d3ca-48ed-8306-56f9280b1193，单@一次原提示词，同哈希英文原片，未故障注入。run_v2_5da3ee7eea404f97a458af534691150d在17:41:30～17:46:30完成，300040ms，done/需求满足true，补槽确认0。中文1424字节、英文1441字节、MP4 24877163字节实际UI下载，SRT内容SHA与产物记录一致，各18条/0.160～60.460秒，第6条结束差20ms其余起止一致。MP4浏览器时间推进0.822648秒、无媒体错误，ffmpeg全解码0，ffprobe H264/AAC/1280×720/60.488005秒；原片60.495778秒。6/33/47秒直接抽帧确认英语已烧录、语义与源对应；成片和独立英文SRT实际文件/哈希不同，6/33秒措辞有差异，47秒文字相同，不计逐字同版通过。原缺交付正常回归Passed，差异及真实中文源/故障注入/逐字听审/扣费未覆盖如实保留。[报告](design-cases/multi-workflow/fwxc245-retest-20261111.md)及7PNG/两SRT/对照JSON已归档；MP4留reports，无配置变更或推送。

17:37状态验证：身份/项目/类型与实际工作流匹配，一次仅status从已修复/29写为✅AI通过/0937b1d9e486323590880e5450；回读ID/名称一致，其他核对字段保持。底稿reports/fwxc250-rerun-20261111/status-update/result.json，无新评论/附件/缺陷。

Ego预发新项目6dfbc1d0-4fff-4ffb-803b-78bcc9ddc541、新会话17d1b1d6-c1dc-4722-9c45-84afbec8862a；两原片及6段历史独立ASR音频哈希核对一致，两个源ID和双@顺序A→B。run_v2_33eff7c3a3b94ef3bf14bd672fc12868在17:29:47～17:33:38完成，230324ms，done/需求满足true，无补槽/确认。A_en.srt实际1462字节/18条/0.160～60.460秒，B_ja.srt5742字节/64条/1.780～167.900秒；SHA与产物内容SHA一致、结构和每条语言脚本通过、逐条时间轴与各自源转写一致（毫秒精度）。实际翻译输出源媒体A/B分别正确；六段语义交叉核对A医疗法、B的BBC/莫斯科/山火/女足/离婚连线，排除互换及B复用A，来源专项Passed。复用同哈希独立ASR未重转，不冒称整片逐字听审/译文可读性/扣费通过；FIXME配置未变。[报告](design-cases/multi-workflow/fwxc250-retest-20261111.md)，证据本机reports/fwxc250-rerun-20261111及文档归档。

17:26状态写后验证：FWXC-253身份/项目/类型及目标工作流核对通过，一次仅status由已修复/29更新至✅AI通过/0937b1d9e486323590880e5450；回读ID/名称正确，其他核对字段保持。底稿reports/fwxc253-rerun-20261111/status-update/result.json，无新缺陷/评论/附件或业务重跑。

Ego预发新项目643dc5a7-5451-4737-8003-5cb3f4b07fa6、新会话9b69046e-557a-4f59-bd4d-607f16a2f75a，原片SHA与旧缺陷一致、单@一条原完整指令。run_v2_cdb33226bd44441e81ba89fcbf44b3b4在17:17:21～17:23:10完成，349024ms，无补槽/确认。三份UI下载：中文1415字节、英文1406字节、总结452字节；SRT内容SHA与产物记录一致，18条结构/文字脚本/每条时间轴核验通过，与源转写同为0.160～60.460秒；总结阅读核对医疗保障主题正确。原缺交付回归Passed。实际done且intent_fully_satisfied=false，页面明确反馈英文源与原提示词中文不符；不改写标志，也不冒称真正中文正向通过。英文翻译源字幕ID不同于交付中文ID，中间版本未进一步下载验证；译文逐字听审/扣费未覆盖。3PNG/三文件/汇总已归档，[报告](design-cases/multi-workflow/fwxc253-retest-20261111.md)。

用户明确要求本轮未复现则改AI通过。回读FWXC-255真实身份、cinlink-WEB项目/缺陷类型及项目工作流，目标✅AI通过状态ID0937b1d9e486323590880e5450；一次PUT仅写status，17:14:50回读已由已修复/29变为目标ID/名称。标题、描述/格式、负责人、项目/类型、迭代、标签、版本、自定义字段、父项等核对一致；无新增评论/附件/缺陷，无业务重跑。底稿reports/fwxc255-rerun-20261111/status-update/result.json；[复测报告](design-cases/multi-workflow/fwxc255-retest-20261111.md)及脱敏汇总已同步。下文无云效写入指先前复测阶段。

预发Ego新项目59384718-7355-4731-b985-ce0047292add、新会话fb233be4-0999-4fb9-9785-d1b77000cd2f；原片7815126字节及SHA与原缺陷一致，单@、单用户消息、补槽/确认0。run_v2_8759cd371fd9427a8c02831d24a95447在17:05:47～17:09:18完成，211445ms，done/需求满足true。实际UI下载中文1403字节/英文1435字节，分别核验SHA与产物内容SHA一致；各18条，序号/非空/时间有效/无重叠/文字脚本检查通过，逐条时间轴与彼此及源转写一致。英文翻译输出source_subtitle_file_id精确匹配交付中文ID，英文哈希不同于原英文转写。Passed，未逐字听审全部译文或核验扣费。3张真实截图/两SRT/脱敏汇总已归档，[报告](design-cases/multi-workflow/fwxc255-retest-20261111.md)；原始消息与运行详情留本机reports/fwxc255-rerun-20261111，不将静态节点状态当开发实现验收。仅本地文档与证据更新，未写云效或推送。

用户明确要求AI通过后，核对FWXC-280所属项目/类型及项目工作流的真实“✅AI通过”状态（0937b1d9e486323590880e5450），一次PUT仅写status，16:57回读验证由“已修复”→“✅AI通过”。标题、描述/格式、负责人、迭代、标签、自定义字段、项目/类型与写前一致；没有新增缺陷/评论/附件、改其他工作项或重跑业务。状态更新底稿`reports/fwxc280-rerun-20261111/status-update/result.json`；[复测边界与截图](design-cases/multi-workflow/fwxc280-retest-20261111.md)保持。下文未写云效指原复测阶段。

新项目`6c8f7092-e692-42b0-bc72-fc5200d883d8`、新会话`6d8c7238-f762-40a9-9add-ab31732369fd`，原片与旧缺陷SHA一致；登记、R1、R2、重开后R3均独立一次受理并done，R2审阅确认一次。实际关闭原页签，从首页侧栏历史重开同一会话；R2播放时间0→1.177352秒，关闭前后下载同为6,940,351字节、SHA256一致。R3 POST200、新run创建并done，成片播放0→1.105008秒。重开观察窗口fetch凭证交换86次200及一次R3 turns200，未见401/429、页面alert为空；该观测不涵盖首页加载前及所有传输类型。5PNG及副本哈希、消息/媒体脱敏记录在[复测报告](design-cases/multi-workflow/fwxc280-retest-20261111.md)。

本轮未复现，正常登录关闭重开路径通过；原凭证失效条件未知，失效恢复/限流分支不判通过。新项目、yabinc92/Ego及R1成功与旧非项目/yabinc18/Chrome/R1计费失败分别记录；没有人工改认证状态、业务重试、R4/R5或云效写入。原SSO-017整例结果保持。

新建项目`FWXC-356复测-20261111`（项目ID `d570e918-3fc9-4a44-9be7-b44c4e10d257`、会话`c013949c-3f78-4d1d-85dd-11bad05a0f80`）后，使用新项目内的`英文30S.mp4`生成可编辑字幕并进入编辑器。首条字幕原为0.08～3.20秒，按FWXC-356原步骤将结束点左拖约0.5秒，实际保存为0.08～2.70秒；页面无`Manual layout does not cover parent`。刷新、重新打开编辑器后仍为0.08～2.70秒，错误提示为空，本轮Passed。证据与哈希见[复测报告](cases/requirements/ERYE-196/results-FWXC-356-rerun-20261111.md)。本轮不修改云效缺陷状态，不把历史项目或历史Failed改写为本轮结果。

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
2026-11-19 SSO生产日批补积分后续跑中：用户已补积分，UI5137；014 R1原入口恢复同一run_id，无新增用户提示词；001～013结果保持。最新统计与未覆盖见[实时报告](design-cases/multi-workflow/sso-nightly-prod-results-20261119.md)。原积分中断报告已留本机快照，非最终全量结论。
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

# 验证记录

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

<!-- E196-070-090-20261117 -->
2026-11-17 ERYE196-070～090 Chrome生产：本轮21/21已登记，{"Passed": 8, "Blocked": 5, "Failed": 8}；检查点：070～090本轮全部21条已登记：8 Passed、8 Failed、5 Blocked；074已自然过期续签补测通过；所有已受理任务终态已核验，无待重发任务；固定脚本PLAN/空路径。固定脚本PLAN/空路径，无云效/Git写入。[执行报告](cases/requirements/ERYE-196/results-070-090-chrome-prod-20261117.md)。
<!-- /E196-070-090-20261117 -->

2026-11-16 ERYE196-055/068失败缺陷已同步云效：055→FWXC-623，068→FWXC-624。436条索引及详情快照去重后新建2条，5张截图及2份核验附件、正文/字段通过官方OpenAPI回读；旧缺陷未修改。Failed及PLAN/空脚本保持。[同步报告](defects/ERYE196-055-068-sync-prod-20261116.md)。

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

2026-11-16 ERYE196分步补跑收尾：016 Passed；021/022/041 Blocked，分别保留AB+BGM、正常6句配音、正常水印基线及上传状态准备证据。041正常同组对照schema错误，刷新无半提交，不能替代正式异常回滚验收。Chrome网络恢复No throttling，工程基线保持。全134条29P/14F/3B/1NA/87NR；脚本PLAN/空路径、无云效写入，用例检查543条0问题。[执行报告](cases/requirements/ERYE-196/results-stepwise-016-021-022-041-chrome-prod-20261116.md)。

2026-11-16 016/021/022/041阻塞步骤细化：逐项准备、独立分支及保存回读，增加明确检查点与下一步；正式验收目标不降级。[执行计划](cases/requirements/ERYE-196/blocked-step-plan-016-021-022-041-20261116.md)。仅文档更新，不计新增生产执行或通过，PLAN保持。

2026-11-16 043/047新版实际重跑：047 Passed，一次撤销/重做及刷新重开全部核对；043 Passed限当前UI提交前整组拒绝，同工程恢复S0后串行对照，无半提交，双副本隔离/服务端执行后回滚未覆盖。最终工程恢复S0，脚本PLAN/空路径，无云效提交。 [report](cases/requirements/ERYE-196/results-043-047-chrome-prod-20261116.md).

2026-11-16 ERYE196-043/047文档优化：独立同组编辑前置，不再依赖042裁头成功；明确正常对照、基线副本、历史头、一次撤销/重做及未覆盖判定。[完整修订](cases/requirements/ERYE-196/revision-043-047-independent-batch-20261116.md)。仅文档更新，新版Not Run、PLAN/空路径；无生产或云效操作。

2026-11-16 ERYE196-021/022/041 R2续跑：新A20工程正常，追加B/BGM的Editor media insert先报交互未结束，清交互刷新后确认无部分写入，一次准备步骤恢复改报未打开编辑器（右侧实际打开）。原始截图/AX已保存，021正式重排未覆盖。f178候选只读核实为U1、10秒、两字幕、无配音，不满足022异常关系/041私有素材。三例仍Blocked、PLAN；[完整报告](cases/requirements/ERYE-196/results-021-022-041-r2-chrome-prod-20261116.md)。

2026-11-16 ERYE237六条阻塞用例优化：055/056/057/067/068/069改为参数隔离与可执行前置，保留来源优先/澄清/能力拒绝/SHA/极性要求；新版六主分支Not Run，旧部分Blocked及参数证据保留，PLAN/空脚本不变。仅改文档，无生产或云效操作。[修订说明](cases/requirements/ERYE-237/optimization-055-056-057-067-068-069-20261116.md)。

2026-11-16 ERYE237-050～070缺陷同步完成：12条Failed→FWXC-599～610，负责人余航/生产/重构10-29；13张实测截图＋12份脱敏审计，25附件、正文嵌图及字段已回读核验。标题均含用例编号，旧项不改、6条Blocked未提单、PLAN保持，未重发业务或Git提交。[同步清单](defects/ERYE237-050-070-sync-prod-20261116.md)。

2026-11-16 ERYE237-050～070的12条失败只读云效查重完成：412条详情，确认重复0/疑似1（065）/相关4/未检出同项7；无云效写入，测试结论及PLAN保持。[查重记录](defects/ERYE237-050-070-dedup-prod-20261116.md)。

2026-11-16 ERYE196-021新配音项目前置实测：新项目及完整32秒字幕/音频产物已建立；编辑器无配音轨，创建配音报正式v2协议错误，刷新重开仍为空，021完整链路Blocked。真实截图和AX已保存，脚本PLAN/空路径，云效未写入。[结果](cases/requirements/ERYE-196/preparation-021-voice-chrome-prod-20261116.md)。

2026-11-16 ERYE196-028新版Chrome生产重测Passed：6/60/100均驱动列表及同一画面预览分组，向外拖拽保持6/100；85词及词级时间与基线一致，已恢复60。脚本PLAN/空路径，016未补跑，无云效提交。 [report](cases/requirements/ERYE-196/results-028-slider-chrome-prod-20261116.md).

## 2026-11-16 ERYE237-050～070执行完成

生产ego-browser TaskSpace19完成当前21个主分支：3 Passed / 12 Failed / 6 Blocked；通过053/059/064，阻塞055/056/057/067/068/069。已生成并使用ACME基准/损伤素材，真实mask和PNG已下载核对。固定脚本PLAN未接入，本批无云效或Git提交。详见[本批报告](cases/requirements/ERYE-237/results-050-070-ego-prod-20261116.md)。

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

校验543条、0问题；022登记及所有证据路径核对通过，023/028/031登记未改；最终源RGB恢复、8项历史和任务集合保持，TaskSpace17已关闭。

生产ego-browser TaskSpace17/p1、yabinc18，022/UI按content-sampling-v3真实重跑Passed。1000×666原图Q0=(100,99)独立PNG RGB118/114/112、吸管#767270及验证新笔完全一致；红8pxcontent内部取色#FF0000，另一新笔RGB255/0/0。两次采样不改原内容，清理后源RGB完全恢复；原头和8项历史保留，任务ID集合不变，无生成/Agent请求、待发引用或正文。辅助层技术专项独立，未补算覆盖。022旧Blocked为修订前记录，非产品修复；固定脚本仍PLAN/路径空，无云效或Git写入。

四条主分支最新2 Passed（022、031）/2 Blocked（023、028）；仅022本次重跑。[022本轮报告](cases/requirements/ERYE-237/results-022-ui-ego-prod-20261116.md)。

## 2026-11-16 ERYE237-022主UI范围已优化，待重跑

022改为实际底图/content吸管取色与新笔复用；不要求穿透可交互批注、取色时显示mask或新增guide UI。辅助层不污染取色仍归独立Technical，缺可观测入口只阻塞该专项。022新版UI Not Run待重跑，旧Blocked为修订前历史，不直接判Passed；023/028及031既有状态保持。本次仅文档修订，无生产/云效或Git写入，PLAN/空脚本保持。

[022修订说明](cases/requirements/ERYE-237/revision-022-ui-scope-20261116.md)。

## 2026-11-16 ERYE237-031新规则真实重跑Passed

最终检查543条、0问题；031 v3登记与证据路径、空脚本/PLAN一致，TaskSpace16已关闭，16项完成历史及V2 RGB保持。

按用户“编辑页返回默认不保存草稿”的v3口径，在生产ego-browser TaskSpace16/p1、yabinc18实际重跑031/UI Passed：融合文字无旧可编辑对象；源V1创建白48px文字并同对象追加；返回确认选继续保留同一D/对象/源/样式；再次返回选放弃后draft=null，重进V1不恢复旧D。V2原RGB及完成历史集合保持，0新生成/Agent请求/云效写入，最终引用/正文空。不是用旧证据改判或产品修复；原不当Failed撤销，022/023/028仍Blocked，四条主分支最新1 Passed/3 Blocked（只有031本次重跑）。固定脚本PLAN/空路径，未Git提交推送。

[031本轮报告](cases/requirements/ERYE-237/results-031-lifecycle-ego-prod-20261116.md)。

## 2026-11-16 ERYE237-031用户澄清：返回默认不保存，原Failed撤销

用户明确编辑页返回后草稿默认不保存。撤销031“保留D时不能查看V2”的Failed：未提交draft记录/面板重开可恢复不能推出退出持久化和跨结果保留承诺。新版只验证融合像素、编辑内或明确继续的原对象续编、正常返回或明确放弃后不默认恢复；031新版Not Run待重跑，原始运行证据保留，不自动Passed。022/023/028仍原Blocked。本次仅规则/文档复核，未执行生产、云效或Git写入，PLAN及空脚本路径保持。

[规则复核](cases/requirements/ERYE-237/review-031-draft-lifecycle-20261116.md)。

## 2026-11-16 ERYE237四条新版生产重跑结束

校验：543条用例、0问题；四个revision状态与主分支报告一致、证据文件齐全，最终清理审计通过，TaskSpace15已关闭。原始证据附SHA256清单；固定脚本仍PLAN。

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

## 2026-11-13 ERYE196-016～047 Chrome生产收尾

本批32条主用例15 Passed/9 Failed/7 Blocked/1 Not Applicable；失败017/018/019/020/023/030/039/042/044，阻塞016/021/022/028/041/043/047，046不适用。021基本B→A及原声同步已保存，关联字幕/配音/固定BGM分支未覆盖；023两种帧率均完成三刀、裁尾、重开及实际导出，CFR首切点SRC299→301跳帧，VFR19.951秒内部切点黑帧，音频三处抽样零偏移。CFR保留字幕至32秒导致的尾黑场单独排除，不计产品缺陷。固定脚本均PLAN/路径空、暂停接入；临时原生辅助不算正式自动化，云效写入0，无Git提交推送。[完整报告](cases/requirements/ERYE-196/results-016-047-chrome-prod-20261113.md)。全134状态：25 Passed/14 Failed/7 Blocked/1 Not Applicable/87 Not Run。用例格式校验543条、0问题；未改产品代码。

## 2026-11-13 ERYE237-021～050失败已同步云效

最终校验：543条用例、0问题；18个云效链接已写入17条失败用例对应主分支，4条Blocked未提单，原9/17/4结果和PLAN/脚本空路径保持。34原图哈希及52附件核对通过，18份本地缺陷文档与云效编号一致。

17条Failed用例已通过官方OpenAPI新建18条缺陷（FWXC-529～546）；049服务端81字越限落库、Agent合法标签更新失败分别为FWXC-544/545。所有标题含用例编号，九段正文保留完整原提示词和精简前置；34张本轮原始截图嵌入正文、18份脱敏审计，合计52附件的ID/名称/字节数及正文/业务字段全部回读一致。均🤔AI提缺陷、余航、重构10-29、生产环境；032、050高/2-严重，其余中/3-一般。

本次按用户不去重要求直接新建，未修改旧缺陷、未重新运行业务或写回归评论。4条Blocked（022、023、028、031）未提单；原结果仍9 Passed/17 Failed/4 Blocked，脚本仍PLAN未接入，无Git提交推送。

[18条缺陷清单及云效链接](defects/ERYE237-021-050-sync-prod-20261113.md)，检查点reports/yunxiao/erye237-021-050-prod-20261113/。

## 2026-11-13 ERYE237-021～050生产执行结束

验证：543条用例、0问题；30条分支状态/报告路径/PLAN及全部引用证据检查通过，4工程未发草稿清零、无在途任务，TaskSpace13已finish keep=[]。仅文档及实测证据变更，未重跑整套离线verify。

生产ego-browser有头完成021～050当前主分支：9 Passed（024、025、030、033、034、035、037、040、042）/17 Failed/4 Blocked（022、023、028、031），主例Not Run为0，配对及未跑参数另列。失败包括旧对象样式/混合撤销、导出尺寸、批注绑定移动定位及仅移引用、局部修改越界、点击旧引用源跳转、明确上限未拒绝，以及050多源串用。045～048违规11条/2001正文/4001全局/12001合计均实际完成生成；049界面80字防护通过但保存接口落库81，Agent79/80未完成、81明确拒绝。050只生成I2一份并把I1蓝星耳钉加到I2，I1无结果。

每例结束已更新对应主分支结果/证据；三层及各参数分开，4个Blocked不算通过，Failed中的未测合法正式提交不补算覆盖。固定脚本仍PLAN/路径空、继续暂停接入。本轮正式请求15次、准备生图1次，补槽原run续填，无已受理重发；最后四工程无未发批注/引用/overlay/mask、正文空、无在途任务，所有保存结果保留。未同步云效或Git提交推送。

[本批报告](cases/requirements/ERYE-237/results-021-050-ego-prod-20261113.md)，本机证据reports/erye237-021-050-ego-prod-20261113/。

## 2026-11-13 ERYE237-019需求复核通过、020已提交云效

用例格式检查543条、0问题；019登记及脚本PLAN核验通过，FWXC-508正文3图片引用/4附件及AI状态均回读确认。

官方OpenAPI回读需求后确认：§3.2滑杆调整字号、§12范围8～512，未要求页面新增非法数值提交入口。019用例优化为UI合法边界及阻止非法输入、Agent非法值明确拒绝；按本日已有生产证据重新判Passed，非新重跑，直接API契约及内部schema实现未补算覆盖。原始Blocked和证据保留。当前016～020最新4 Passed/1 Failed（020），固定脚本仍PLAN未接入。020按用户随后授权新建[FWXC-508](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=50ee9fa4d3b0829925f48efd27)，3张本轮原始截图及1份六形审计JSON、正文/附件/业务字段均回读一致；🤔AI提缺陷、牛诗晴、重构10-29、生产环境。未重跑业务、未修改旧缺陷或Git提交推送。

[019依据及修订](cases/requirements/ERYE-237/review-019-requirement-20261113.md)，[本批最新报告](cases/requirements/ERYE-237/results-016-020-ego-prod-20261113.md)。

## 2026-11-13 ERYE237-016～020生产执行结束

用例格式检查：543条、0问题；五例分支状态/PLAN登记与全部所列证据路径核验一致，最终源RGBA/历史/任务清理审计通过。

生产ego-browser有头执行016～020：3 Passed（016/UI、017/UI、018/UI）/1 Failed（020/UI）/1 Blocked（019/Technical，3项UI非法输入契约缺直接入口）。016一次撤销/重做整笔，017独立对象变换/删除/撤销与底图隔离，018白色48px混排追加及两次重开均通过。019 UI8/512和Agent8/512/7/513/abc共7项通过，拒绝不静默钳制；020六形创建/重开/选择通过，但颜色只改默认值、旧对象不变，逐项画布对比确认。每例结束即更新结果及登记，脚本仍PLAN未接入。五次正式Agent仅工具设置/拒绝，零业务重发；源图/完成历史保持，最终无草稿引用、正文或在途任务。缺陷仅本地整理，未云效写入或Git提交推送。

[本轮报告](cases/requirements/ERYE-237/results-016-020-ego-prod-20261113.md)，证据reports/erye237-016-020-ego-prod-20261113/。

## 2026-11-13 ERYE196-003 Chrome指定单条重跑Passed

沿用生产yabinc92原c247b9a9会话，Chrome原生Apple Events/Accessibility有头完成003。143条基线与008独立清单一致，首条A目标固定。B仅law.7.42～7.68→新版C2，A首次旧文、下一次未手动刷新已新文；合并143条只目标变化。首次/下一次观测约1.3/33.2秒，未持续测量精确延时；按现有业务预期Passed。手动刷新143条正确，一次撤销及A刷新后143条完全恢复，视频/原声0～60.50秒保持。临时旧文期望导致采集断言中止已按原始快照纠正，未重发改文，不计产品失败。

当前134条10 Passed/5 Failed/119 Not Run；本次指定单条重跑，自动化PLAN/路径为空，继续暂停固定脚本接入。未执行扩散、云效状态/评论或新缺陷提交，FWXC-478云端未改，旧Failed记录保留。原cua_repl仍不可用，已用现有macOS原生控制通道完成Chrome操作，先前工具阻塞准备记录不再代表未执行。[本次报告](cases/requirements/ERYE-196/results-003-rerun-chrome-prod-20261113-r2.md)，证据reports/erye196-003-rerun-chrome-prod-20261113-r2/。无Git提交推送。


## 2026-11-13 ERYE196-011/013/014失败已提交云效

官方OpenAPI独立新建3条：ERYE196-011→[FWXC-494](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=33a3e0253223cd6b65555c2ef4)；ERYE196-013→[FWXC-495](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=44eeb3c21687f5a66aa13a6cd1)；ERYE196-014→[FWXC-496](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=92437cc1e75cd84c9e1b10e35a)。9张本轮生产原始截图均嵌入正文，另附3份审计、013的BGM、014测试源视频及SRT，合计15份附件；正文/业务字段/截图引用及附件ID、名称、字节数全部回读一致。均🤔AI提缺陷、牛诗晴、重构10-29、生产环境。未修改旧缺陷、未重跑业务或继续脚本接入，无Git提交推送。

本批仍2 Passed/3 Failed，自动化均PLAN；现行134条9 Passed/6 Failed/119 Not Run。011分割未执行，013/014明确拒绝所需波纹同步，裁后听审/文件检查未覆盖，不扩写成音画错位。[本批报告](cases/requirements/ERYE-196/results-011-015-chrome-prod-20261113.md)。汇总reports/yunxiao/erye196-011-015-prod-20261113/sync-summary.json，三个独立提交检查点保持。


## 2026-11-13 ERYE196-011～015 Chrome生产完成

本批2 Passed（012、015）/3 Failed（011、013、014）：011已建立A20+B10基线，B内部4秒分割报invalid additionalProperties，刷新仍两段30秒；012选中A在0/20秒分割禁用，内部按钮可用，刷新49条及单段20秒保持；015删21秒明确要求大于0且小于20，未改工程，结束澄清并刷新49条不变。013已准备49字幕/6段配音/固定BGM，Agent明确无法完整波纹与关联同步且排除BGM；014独立受控语音及两句SRT，Agent明确不能保证跨界保留词同步，均未执行裁剪。失败后的播放/文件步骤未到达，不补算通过；014受控金标不冒称人工听审已完成。

每例结果/证据与脚本状态已逐条更新，五例均PLAN、脚本路径为空，按用户保持暂停集成。正式Agent4次、准备4次、UI012，无失败重发；全部任务已结束，云效写入0、Git提交推送0。当前134条9 Passed/6 Failed/119 Not Run，004仍是旧实测需求复核非新重跑。[本轮报告](cases/requirements/ERYE-196/results-011-015-chrome-prod-20261113.md)，证据reports/erye196-011-015-chrome-prod-20261113/。207f1460当前已含013准备的6段配音和BGM，不能沿用旧010两轨清单。


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

本次同步收尾：4标题的用例编号、正文/评论、15附件回读及本地链接核对通过；直接运行相同用例格式脚本检查543条、issues=0，无新增业务任务。

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

本批收尾检查：22会话/91份本地文件哈希独立审计issues=0；001～018共84轮字幕消费链回查仅004R5既知违规；driver/recovery Node语法检查通过；用例格式脚本检查543条、issues=0。npm run cases:check入口因系统无python命令退出127，已用bundled python3直接执行相同tools/design-cases/check-cases.py并通过，不把npm入口冒称成功。

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

## 2026-11-11 远程推送前校验

按用户要求整理当前main待推送改动，包含图片编辑需求优化、图片批注/工具栏专项、本地素材查找最新结果、SSO014结论、云效OpenAPI工具和已登记生成人像测试夹具。`npm run typecheck`、543条需求用例检查（0问题）、两份ERYE237 CUA模块语法检查、云效工具22项离线契约测试（0网络请求/0云端写入）均通过；Playwright只列举ERYE237 5条占位和LF01～03，未执行线上任务。LF三份状态表28条、15 Failed/13 Passed一致；人像夹具哈希与文档一致。推送范围排除本地凭据、reports、test-results、临时夹具及原始登录快照docs/login-page-report.md；源测试素材仅包含已登记虚构生成人像，不上传本机真实视频。

## 2026-11-10 LF18～35预发执行完成

按用户授权执行11条当前活动用例，7 Passed（LF18/20/21/30/31/32/34）/4 Failed（LF22/28/33/35），0阻塞。G56专用项目3a1225cf-106d-4b61-86e8-e98158a18507仅F5/F6，分析批次34a588ac-be06-460c-a579-3510da7b22fa、2/2就绪，预计2400积分非实际扣费。8个会话、12次正式查询+1次LF20有历史上下文额外探测；该初次点击未切会话的偏差保留，随后确认空会话执行32秒正式通过。LF18两原片下载哈希一致；LF32/33前置由用户完整观看两片并确认目标不存在。LF22/28不存在名称43秒终态仅承诺核对、无实际无匹配结论；LF33同框52秒误返两独立原片；LF35补选男子60秒新结果仍混女士、未明确完成选择。无并行/重分析/自动重试/生成/删除或云效写入，根因未确认。报告docs/design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md，证据reports/lf18-35-staging-20261110/。正文、统一入口、状态MD/JSON、自动化登记及素材准备说明已更新：全部28条已执行，15 Failed/13 Passed（各例限定范围）/0 Not Run；AUTO3/PLAN25不变，7退役编号排除。

本批校验：`python3 tools/design-cases/check-cases.py`检查543条、0问题；另核验LF正文/入口/状态表均28个唯一活动编号，累计15 Failed/13 Passed，本批7 Passed/4 Failed；13次实际受理对应8个会话、12正式+1额外探测，全部有终态证据；94份证据清单及报告/素材链接有效，F5/F6下载哈希匹配，定向`git diff --check`通过。未改动自动化脚本或迁就失败预期。

## 2026-11-10 最新执行状态及新增测试素材同步

按用户要求核对并同步LF最新逐例状态：当前28条，LF01～17已执行，11 Failed/6 Passed（各例注明UI或客户端覆盖），新增11条Not Run；AUTO3/PLAN25。LF08/12/13采用优化版最新58秒/39秒/44与35秒结果，LF16客户端恢复、LF17听审后漏检均保留实际边界。正文末列明确为最新执行状态，统一入口分类索引修正旧17条/14PLAN描述；历史日志单列，不以旧源ID/时间缺失判业务失败。新增F5 7MB.mp4、F6 9s.mp4路径、规格、内容参照、哈希及关联用例在原正文登记并加入入口链接，本次再次核对原文件大小和SHA-256一致；仅本地准备，未创建G56或上传/分析/执行新用例。现有云效缺陷链接同步，无云端状态修改。

本次校验：`python3 tools/design-cases/check-cases.py`检查543条需求用例、0问题；另核对LF三份表格均28个唯一活动编号、状态计数11/6/11、AUTO3/PLAN25、P0 25/P1 3、7个退役编号不混入，报告与本地素材链接均有效。F5/F6原文件大小及SHA-256与底稿一致，定向`git diff --check`通过。未执行线上测试。

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

校验：LF正文仍17条、每行9列，LF01～03实测JSON/分析就绪/终态一致，报告截图链接存在，59份实际证据已登记SHA；同一python3用例检查器543条/0问题，本次文档diff检查通过。

## 2026-11-09 005带背景原图复测R2

005/Agent已按用户纠正以11.png原始带背景历史项7cffcedd67bc40e0915021594dbb3ad7重新执行；实际画布有浅色背景及投影，非去背景图。正式蓝底请求1次，计费输入校验失败：Cannot verify editor generation inputs for billing; no task was started。无蓝底新版本，绿底未发送；原两项历史保持，无在途任务。与上一轮能力说明不同，不冒称同根因。用例前置/test-data及005新版分支报告已更新，旧报告保留。仍2 Passed/3 Failed/258 Not Run，费用未核、无云效写入。报告docs/cases/requirements/ERYE-237/results-005-original-prod-20261109-r2.md。

## 2026-11-09 分层版237的001～005生产执行

2026-11-09在生产有头执行分层版001～005主入口：001/UI、004/UI Passed；002/Agent、003/Agent、005/Agent Failed，2通过/3失败。002报Open the conversation page before opening its editor、停留第三张；003空计划未打开；005缺确定性蓝底合成解释且未执行，绿底依赖未发送。Agent3次均终态，零已受理重发、无准备生成/导出/云效写入，费用未核。新版其余258分支Not Run（139其他主入口）；旧整例历史不改。报告docs/cases/requirements/ERYE-237/results-001-005-layered-prod-20261109.md。

校验：同一python3用例检查器543条/0问题，本次文件diff检查通过；50份实际证据文件已登记SHA。原始AX核验三次请求终态、004三项历史和005刷新前后两项历史一致，新版登记2 Passed/3 Failed/258 Not Run。AX焦点页脚与真实树条目分别计数，避免重复计入历史。

## 2026-11-09 ERYE237分层重整（当前版本）

ERYE-237用例重整为2026-11-09-layered-execution：原144编号/优先级/来源/锚点及历史execution_*保留，新增分支状态Not Run；不运行生产、不修改云效。校验：python3运行同一cases检查器，543条/0问题；迁移校验确认144编号、优先级、来源、脚本与锚点不变，旧登记字段及归档断言完整、新分支均Not Run、文档链接有效；本次文件git diff --check通过。npm run cases:check因本机无python别名未启动检查器，以python3完成相同检查。

## 2026-11-09 正式014～032三组缺陷已同步云效

官方OpenAPI按用户三组分别直接新建：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)（014/018/032，Agent身份参数绑定/操作未执行）、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)（017/029，画笔引用误生成、内容丢失和缩图）、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)（030，圈外源红线误删）。未做去重，旧项修改0；共8份真实图片+3份evidence.json附件上传，8个正文图片引用及全部字段/附件回读通过。三组根因均保留未确认边界，029与FWXC-369现象关联但不冒称同根，030不把内部guide角色未核实升级根因。对应6条保持Failed，正式统计1 Passed/12 Failed/12 Blocked/119 Not Run，144 PLAN不变；本次无生产重跑。 本地记录docs/defects/erye237-agent-binding-prod-20261109.md、erye237-draw-submission-prod-20261109.md、erye237-edit-scope-prod-20261109.md。

## 2026-11-09 ERYE237-014～032正式执行

本轮登记校验：用例检查器543条、0问题；registry的144条执行统计核对为1 Passed/12 Failed/12 Blocked/119 Not Run，014～032均有结论且保持PLAN；目标文件diff检查通过。

生产同会话39cdf63c-d593-4538-816a-5d1c29973e36，本批1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。014缺会话/源版本参数；018/032明确无法绑定身份、未执行；017仅本地改对象却受理生成；029源1254²→1024²且红线/文字丢失；030新增文字/圈内改蓝/不烘焙红圈可见，但误删圈外源底图红线。阻塞分别为未完成Agent配对、精确BG/内部对象/非法参数、工作头/费用/保留草稿前置，不假报全部通过；021实际RGB仍24/24/24，输入焦点未核实，不是产品颜色失败。普通Agent4次，图片提交3次均完成（a408be41cc4a41359a04b6d9eec3ac7d/e1fdc0f3f51d44c692efbd7b2c9ff72d/4ef8ea7c45a34e30ba55d9daf347f7f5），PNG下载2份，受理零重试、无准备生成/云效写入，费用未核。结束源V1/主工具栏、14项历史保留、无未发草稿或在途。registry/meta/cases/统一入口同步，正式累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍144 PLAN。报告docs/cases/requirements/ERYE-237/results-014-032-prod-20261109.md；证据reports/erye237-014-032-prod-20261109/。

## 2026-11-09 ERYE-237正式用例纳入两组UI实测优化

校验：python3 tools/design-cases/check-cases.py检查543条、0问题；144个唯一ID/优先级/九列/全PLAN及元数据版本一致。npm脚本缺python别名，已用python3执行同一检查器。本轮目标文件diff检查通过；全工作区既有login-page-report.md尾空格未修改。

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

本文件保存 Codex 执行与默认启用检查，以及源工程的提测复测、工作台适配和早期接入验证。最新进度见 [测试进度](testing-progress.md)。

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

## 2026-11-06 云效OpenAPI本机配置与Mac适配

按用户提供的`Downloads/yunxiao`导入[同步工具](../tools/yunxiao/README.md)，保留原同步检查点、上传、九段描述和回读逻辑；适配Mac的curl、环境变量/local.env凭据与入口`run.sh`，Windows仍使用DPAPI。微软官方ARM64 PowerShell 7.6.9安装到当前用户目录，68,117,310字节归档SHA256与官方发布摘要一致。用户授权登录后新建专用PAT，2027-02-04到期，仅项目协作所需权限；令牌只写忽略的local.env（0600），未输出、未写报告，原令牌未修改。已忽略的config.local.json从现有FWXC-357提取生产环境、牛诗晴、重构10-29、中、3-一般；后续批次按实际环境覆盖。

验证：22项离线检查全部通过，覆盖Mac凭据文件权限/进程优先级、假服务完整同步和中断恢复；离线网络0、云效写入0。实际OpenAPI读取cinlink-WEB项目、13项字段配置（6必填）、FWXC-357和2附件均HTTP200。`run.sh check.ps1 -ReferenceWorkitemId 94f54105c3405d30c9df57b56e`实际读取成功；本次未创建/修改缺陷、未上传附件、未重新执行产品任务，真实写入链路待下一次授权同步验证。

证据：`reports/yunxiao/setup-20261106/api-check.json`及不含密钥的`token-created.png`；脚本检查结果在`reports/yunxiao/check-*/result.json`、`reports/yunxiao/offline-*/result.json`。配置任务不改变ERYE-237的5 Failed/139 Not Run统计。


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

静态核验：`python3 tools/design-cases/check-cases.py`检查543条、0问题；本次文档差异空白检查和缺陷/结果文档本地链接检查通过。`npm run cases:check`因本机没有`python`别名退出127，已用`python3`直接执行同一检查器通过。

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

更新后校验通过：`npm run cases:check`检查543条、0问题；196状态数量及004登记/摘要/报告链接一致，两批共14张原始截图哈希保持不变，目标文档差异空白检查通过。本次没有新增业务执行。

按用户明确指令，以最新已确认Figma主页面为本轮验收基准，004改为**Not Applicable（本轮不适用）**，原Blocked判定撤销。云效评论§03中的对象引用标签/时间范围/移除流程保留为来源追溯，不列本轮页面阻塞或缺陷；未执行的引用后改文不计通过。已有选择/反选观察及版本7、9两批真实截图保留，没有新增运行。

用例正文、registry、meta、统一入口、联合规则、分析/前置及[004执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)已同步；134条最新**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**（001/003通过、002/004本轮不适用、005受阻，其余129未执行）。其他用例状态未变，没有新增AI任务、云效写入或产品源码变更。



## 2026-11-05 重启浏览器后复测ERYE196-004

文档更新后校验：`npm run cases:check`通过（543条、0问题），134条状态数量、最新报告链接及本轮7张原始PNG哈希核对通过，目标文档差异空白检查通过。

已关闭原受控Chrome并新启动有头Chrome，恢复当前工程独立复测。当前版本9：三项多选/反选音频剩两项正常，但无输入框对象引用，右键无引用操作、时间尺仅定位播放头、@为文件候选；原引用后改文未执行，按云效评论定义的原流程仍Blocked。前后版本9、内容及148条字幕保持，输入/选区/缩放已恢复；保存本轮7张独立截图及读取证据，原版本7批次保留。[最新记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)。

用户询问来源后已明确：引用标签/移除交互来自云效ERYE-196评论§03，已核对最新Figma主页面未展示该完整交互，不能称为设计稿缺陷；未提交产品缺陷。没有AI任务、云效写入或产品源码变更。总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run，005未执行。



## 2026-11-05 ERYE196-004页面业务核验

更新后`npm run cases:check`通过（543条、0问题）；196状态数量、004摘要及报告链接一致，前后版本/内容保持及7张原始PNG哈希核验通过，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户要求在当前工程版本7有头核验004：视频/原声音频/Hello字幕三项多选、反选音频剩两项可操作；输入框无编辑器对象引用，@仅文件候选，时间尺拖动仅定位播放头。原引用标签/移除引用及BGM/范围业务流程未完成，目标改文未发送，**004仍Blocked**。依据为196评论§03页面用户流程；不要求API字段或内部实现，不把选中高亮视作已引用，也未将未见交互直接定为产品缺陷。

7张本次真实页面受阻/恢复截图保存，前后版本7、完整内容与148条字幕一致；输入/选区已清空，缩放恢复1。[执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)，底稿`reports/erye196-004-ui-20261105-1947/`。没有AI任务、云效写入或产品源码修改；005未执行，总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run。



## 2026-11-05 ERYE196-003页面业务实测通过

更新后`npm run cases:check`通过（543条、0问题）；196的134条状态、registry、执行摘要和报告链接一致，10张原始PNG哈希核对通过，恢复后的完整工程内容与基线一致，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户明确要求，将003原游标读取场景调整为页面业务验收：A浏览中、B仅将6.64～7.12秒solution.改为新版C2，A无需刷新即更新；继续滚动及刷新后各3窗口覆盖148/148，遗漏/额外/重复/文字差异0，只改变目标1条，其余147条及时间、其他轨道和设置不变。随后B撤销本次改文，A同步恢复，完整工程内容与原基线一致；版本5→6→7，测试新增B页已关闭。

**003 Passed（页面业务口径）**；原游标接口专项未执行，不纳本次通过范围。10张真实执行截图、前后/恢复读取及两次全列表对象核验保存于`reports/erye196-003-ui-20261105-1935/`，[执行记录](cases/requirements/ERYE-196/results-003-ui-20261105.md)。没有AI任务、云效写入或产品源码变更。134条最新**2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run**；004～005未执行，其他需求和既有结果保持。



## 2026-11-05 ERYE196-002撤销页面阻塞判定

更新后校验通过：`npm run cases:check`检查543条、0问题；196的134条状态与registry/摘要/报告一致，报告链接有效，六张原始截图SHA-256保持不变，目标文档差异空白检查通过。

用户确认修改状态：002原“按时间范围分页读取”来自196评论§11接口约定，已读取的最新设计稿没有对应页面交互；原先因页面缺少入口判Blocked不成立，现改为**Not Applicable（本轮页面验收不适用）**。原接口专项步骤保留为未执行，不计通过；既有148/148条列表完整性、对象稳定性及版本5不变的补充核验保持Passed，六张原始截图/读取结果保留，没有新增执行。

用例正文、registry执行状态、meta、统一入口及[002执行记录](cases/requirements/ERYE-196/results-002-20261105.md)已同步。134条最新：**1 Passed / 1 Not Applicable / 3 Blocked / 129 Not Run**；003～005未变。自动化列PLAN仅表示尚未接固定脚本，与本轮不适用状态分开记录。



## 2026-11-05 ERYE196-002当前工程核验

记录更新后`npm run cases:check`通过（543条、0问题）；196状态、002摘要及报告链接核对一致，六张原始PNG已登记尺寸/哈希，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户要求继续有头执行002，当前工程张雅婷(Tin)分享的视频.mp4、本批版本5。完整工程/字幕可读取；4个滚动窗口覆盖148/148条，遗漏/额外/单窗口重复/跨窗口标识或文字变化均0；首10秒12条已完成对照，前后版本5、content/updated_at及字幕结果一致。六张真实截图与原始读取已保存。

**002仍Blocked**：当前没有按指定时间范围分页读取的可执行入口，原pageSize=1/游标主步骤及三cue B0未执行；完整读取、滚动浏览和离线范围参考不替代该功能。按用户口径，不以字段映射或服务端历史实现作为本次阻塞。没有修改工程内容、提交AI任务、写云效或修改产品源码。[执行记录](cases/requirements/ERYE-196/results-002-20261105.md)；本机底稿`reports/erye196-002-20261105-1919/`。001仍Passed，003～005未执行；总计1 Passed/4 Blocked/129 Not Run。



## 2026-11-05 ERYE196-001按业务验收口径通过

更新后校验：`npm run cases:check`通过（543条、0问题），196逐条状态/人工执行登记/摘要及报告链接一致，目标文档差异空白检查通过；未新增业务执行。

用户明确“开发怎么实现的具体可以不验证”。001据当前工程实测更新为**Passed**：能力/当前工程可读取，选区及轨道正确，播放头/缩放/面板操作正常，上下文同步，revision 3→3、content/updated_at一致、可观察编辑历史past1/future0不变。字段等价映射及服务端历史实现不再作为本例阻塞；用例正文同步改为业务可观察预期。

这是同批实测证据在用户确认范围后的结论更新，没有新增运行。当前134条：**1 Passed / 4 Blocked / 129 Not Run**；001为人工有头执行、无固定脚本，自动化列恢复PLAN，registry另记Passed。002～005未重跑，原始七张截图及读取响应保留。[最新结果](cases/requirements/ERYE-196/results-001-rerun-20261105.md)。



## 2026-11-05 ERYE196-001按用户当前工程复测

文档校验通过：`npm run cases:check`检查543条、0问题；196仍134条（5 BLOCKED/129 PLAN），九列及最新报告链接有效，七张原始PNG清单已核对，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户“使用我打开的这个项目”，在有头Chrome核验“张雅婷(Tin)分享的视频.mp4”（工程3bc78d71-8cf6-4caf-b347-a2f19962f471）：revision 3→3、content及updated_at一致，本地past 1→1/future 0→0；播放头/缩放/面板操作及选区、轨道身份子项通过。发现实际`/cloud-tool-api/mcp/editor`读取入口，initialize/tools/list返回109项工具及Schema，editor_project_get/editor_view_get成功；显式页面会话回读与8秒/1.5缩放/字幕面板收敛。前端92项目录另行记录，不与服务端109项混计。

完整001仍BLOCKED：原timelineId/revisionToken字段的正式等价映射及服务端历史证据待确认；已不再以“找不到能力/上下文入口”作为最新阻塞。其他002～005未重跑，134条仍5 BLOCKED/129 PLAN。七张真实截图、前后快照/MCP响应及历史证据已保存，[最新执行记录](cases/requirements/ERYE-196/results-001-rerun-20261105.md)，底稿`reports/erye196-001-rerun-20261105-1829/`。没有AI任务、云效写入、产品源码修改或发布。



## 2026-11-05 ERYE196-001～005有头核验

本机Chrome已核验，**0条整例通过、0条确认产品失败、5条Blocked**；其他129条未执行。已新建独立20秒PA并用真实SRT建立C1/C2双语字幕，素材文件显示与可编辑cue分别确认。001移动播放头、缩放、切换面板的子项通过：revision 4→4、内容一致、0保存请求；能力/上下文K及服务端历史仍未确认。002/003缺时间线分页/版本游标契约；004/005可选中视频/C1但未找到Agent对象引用入口，目标改文未发送。完整B0的配音/BGM/水印/独立PB仍未准备，不把前置核验计为完整闭环或产品失败。

[逐例结果、未发送的完整提示词、实际工程ID和截图](cases/requirements/ERYE-196/results-001-005-20261105.md)。底稿`reports/erye196-001-005-headed-20261105/`；目标turn请求0、AI任务0、补槽0（不证明无补槽），没有云效写入、产品代码变更或部署。001～005正文/登记改为BLOCKED，其他需求与既有MW/SSO结果保持。

文档更新后`npm run cases:check`通过（当前正式需求543条、0问题）；196仍134条，5 BLOCKED/129 PLAN与registry一致，执行报告截图链接全部有效；9张原始PNG头部/尺寸/哈希已登记。前后快照内容相同、revision均4。目标文档差异空白检查通过；未修改测试框架，因此未重复全套离线测试。



## 2026-11-05 ERYE-237全量重写需求用例

按用户“不保留旧用例”重新设计144条，P0 95 / P1 48 / P2 1，全部PLAN/Not Run，0脚本、0业务执行。[详细用例](cases/requirements/ERYE-237/cases.md)、[需求/Figma分析与测试点](cases/requirements/ERYE-237/analysis.md)、[测试前置与数据](cases/requirements/ERYE-237/test-data.md)已进入统一入口；旧16/06页面仅保留新版导航，不保留旧表或旧ID映射，登记表仅映射本版。

只读取得云效v1.1正文及v1.2修订（最后修改2026-10-19 10:42:09，评论/附件0），读取用户指定Figma文件SqGzwtxqNjFZa9QIvUPAlc的1816:50610画布及代表状态；完整Figma评论未取得，未编造。用户已确认批注最多10条，与设计会话20张图片注释分开。覆盖A01～A24、D01～D12和IMG-R增补；拟定期限/字体回退/候选策略及资料缺口列门禁，不计已通过。其他需求和MW/SSO定义/结果保留；未写云效、未执行图像生成、未改产品或云端代码。

静态校验：`npm run cases:check`通过（正式需求543条、0问题）；专项144个编号/9列表格/PLAN登记一致，A01～A24、D01～D12及IMG-R01～05已追踪，184处本版相对链接/锚点有效，其他8份受保护用例/配置及其他需求登记段未变。底稿`reports/erye237-requirement-20261105/design-validation.json`；静态设计覆盖不代表已执行或已满足发布门槛。

## 2026-11-05 ERYE-206/210正文评论与最新设计用例检查

新增[206 67条](cases/requirements/ERYE-206/cases.md)、[210 54条](cases/requirements/ERYE-210/cases.md)，全部PLAN/Not Run；[联合规则与复用](cases/editor-linked-196-206-210.md)连接196。用户确认最新Figma已确认主页面优先，采用五入口，旧DC-05仅历史追溯；拟定字段/锁/清理规则保持DRAFT门禁。需求正文、206四评论含内嵌图、210一评论与最新Figma结构及9张目标截图均已只读核对，未执行产品操作。

`npm run cases:check`通过：488条、0问题。独立检查121个唯一ID、九列、编号步骤、状态/登记一致、语义目的去重、206 AC32/CP16、210 AC12/NAV-R5覆盖映射和35个本地链接，均通过；196原134条及配套4个文件SHA-256未变。差异空白检查通过。本机底稿`reports/erye206-210-requirements-20261105/design-validation.json`。覆盖是设计覆盖；没有执行业务、没有云效写入或产品代码变更。

## 2026-11-05 ERYE-196正文及评论用例静态检查

新增[134条正式需求用例](cases/requirements/ERYE-196/cases.md)，M1 121条/M2 13条，全部PLAN/Not Run；完整读取需求正文及评论23563211的18节详版，WAC01～32逐项建立设计映射。配套[需求分析](cases/requirements/ERYE-196/analysis.md)与[前置数据](cases/requirements/ERYE-196/test-data.md)已关联统一入口和登记表。

`npm run cases:check`通过：全工程367条、0问题。独立校验134个唯一ID、九列、编号步骤、分期、状态、registry逐项一致，WAC32项及WFR01～18设计来源完整，9个本次本地链接可用；针对同模块/前置/动作/预期去重检查及人工场景复核通过。差异空白检查通过。检查底稿仅本机`reports/erye196-requirement-20261105/design-validation.json`。10项待冻结规则、数据制备和故障环境均明确前置；未执行任何业务任务，不把静态设计覆盖记为产品通过。

## 2026-11-05 剪辑配音与字幕同步用例设计

新增[SYNC-001～006](design-cases/multi-workflow/editing-dubbing-sync-cases.md)，6条P0、0 AUTO/6 PLAN、业务未执行；统一入口、工作流矩阵、设计状态登记及进度已关联。素材按固定种子分层抽样，8个原始文件重新计算SHA与盘点一致；005配套视频仍待准备。验收采用用户确认的可观察问题标准，不新增毫秒阈值。

本节只记录用例设计和静态检查，不代表字幕/配音真实任务通过；原SSO定义、脚本及历史结果保留。`npm run cases:check`通过（正式需求233条、0问题；该命令不扫描本专项）；另做本专项静态核对：6个唯一编号、6条P0/PLAN、9列表格、12份提示词、三类各2条、15处新专项链接/锚点及8个源文件SHA均通过。7份受保护文件（原SSO正文/脚本、登记表、Excel）哈希未变；本轮涉及的受跟踪文档`git diff --check`无空白错误。底稿`reports/editing-sync-design-20261105/validation.json`，业务任务提交0次。



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

## 2026-11-04 LF-01～03自动化与真实有头执行

已接独立 `npm run test:footage`，仅LF-01～03，有头单窗口、单worker、零重试；其余14条PLAN，默认卡片/预发套件不增减。实际只创建3个检索run，任务均done，**业务0通过/3未通过/0阻塞/0未执行（选定范围）**：LF-01机器人90～92秒正确，但混入105～107秒留声机及0～2秒飞机；LF-02/03均返回0～2秒短片，画面不含目标仙人掌/男孩。原片及其云端回读SHA-256全部一致，4/4及两套1/1分析就绪有证据，无音轨原片亦分析成功。

原生目录选择/首次上传由用户完成，现有分析续接。实际预发走Agent `search_materials` 的segment/project模式，输出短片来源/时间在facts中；旧专用检索接口与新短片ID不能硬套原片。脚本字段适配后的核验均回读原3个run，没有重新提交AI查询。初期代理连接、重复trace、选择器/字段适配报错仅为脚本调试，不作为产品失败。

证据 `reports/lf01-03-headed-20261104/`：原任务在 `final/`，最终播放/内容断言在 `checked/`，JUnit为3 failed，3张原始失败PNG及5个短片可回读，含逐帧对照、源片哈希、审计、trace及批次汇总。已逐张查看3条实际失败页；正/负源帧对照与固定RGB模板校验能区分查询对象，未放宽阈值。详情与嵌图见[执行记录](design-cases/multi-workflow/local-footage-results-20261104.md)。类型检查与脚本发现完成，未重复全套离线；新辅助依赖为当前机器已有OpenCV/Python/ffmpeg，未安装软件或修改云端代码/云效。统一入口、用例行状态、自动化登记及进度已同步，Excel尚未收录本专项。

## 2026-11-04 SSO改为无@、纯文本指定源视频

按用户最新要求，已在原SSO-001～018条目中调整前置、步骤、完整提示词和预期：同一会话只上传一个源视频F，各轮不输入@、不选择素材引用标签、不重新上传；完整正文明确“本轮请对本会话最初上传的源视频7MB.mp4进行处理，不使用之前生成的视频或字幕文件。”单工作流逐轮处理原片，多工作流本轮组合效果仍集中在同一最终成片。

SSO-001～004脚本同步去掉@候选操作，纯文本提交并检查输入区无引用标签；不再要求无@请求显式携带F，而从实际计划输入核实F、排除上一轮交付物，保留来源审计、下载/媒体/SRT和历史文件不被覆盖检查。恢复检查点新增模式校验，旧@模式报告不能恢复为新版。

当前状态：**4条已接脚本（AUTO）＋14条PLAN，18条无@新版均未执行**。旧SSO-001的@候选前置阻塞及缺陷保留历史，不作为新版失败、通过或当前必经阻塞，也不据此宣布@缺陷已修复。此调整仅涉及SSO，不改变既有MW/CHAIN的素材引用方式及实测结论。统一入口、矩阵说明、脚本登记和项目上下文已同步；Excel仍未收录该专项。

验证：`npm run verify`退出0，类型检查和123条离线用例通过；`npm run cases:check`为233条正式需求用例、0问题（该命令不扫描SSO）。另独立校验18个SSO唯一编号、九列、4 AUTO/14 PLAN、无@操作、8段脚本/文档提示词一致及90个本地链接，均通过。`npm run test:sso -- --list --reporter=list`发现4条，未打开浏览器或提交任务。检查底稿`reports/sso-plain-source-design-20261104/`，未修改产品源码或云效状态。

## 2026-11-04 本地素材查找P0用例与夹具核验

已编写[LF-01～17](design-cases/multi-workflow/local-footage-p0-cases.md)共17条P0，统一入口、矩阵CS-06、自动化登记、当前进度及上下文已同步。历史Find Footage缺陷保留原始证据，补记用户确认开发完成、待回归；未修改云效状态，未删除空结果FIXME。

指定目录4个视频经ffprobe、SHA-256和抽帧核验：前三片60秒、音轨数1/1/0，第四片300秒、20镜头；19个切点为15～285秒、间隔15秒。独立本地Whisper抽查F2的0～20秒、F4的90～105秒，提供语音查询线索，LF-17仍须执行前人工听审。原片未修改、未上传，底稿 `reports/footage-p0-design-20261104/`。

定向文档检查通过：17个连续唯一ID、全部P0/PLAN、逐行9列、完整前置/编号步骤/预期、统一入口17行一致、8处相关本地链接存在、4个源文件大小/哈希一致、F4切点及语音线索对应；结果 `design-check.json`。目标受跟踪文档 `git diff --check` 通过。没有需求用例或代码变更，未重复全套离线校验；这些是设计及本地夹具检查，不是线上17条通过。未提交真实分析/检索、未新增自动化，Excel尚未同步本专项。

## 2026-11-04 MW-01 云效同步

已在cinlink-WEB新建并回读验证 [FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)（工作项`9abeb86a98cba72e7158bc3d60`），[本地缺陷记录](defects/CINLINK-MW01-001.md)。范围为当前用户确认的“一条完整提示词一次提交”：只交付中文字幕SRT，英文仍待后续规划；`intent_fully_satisfied=false`却`done/Completed`，请求未完整满足。旧两轮续接或Stop按钮现象不属于本缺陷。

正文包含详细前置、英文原片规格、完整提示词、单次提交的逐步复现、实际/预期、影响与回归边界，沿用用户模板，不含“排查信息”。已上传并嵌入2张原始PNG（提交前、Completed但缺英文SRT），另附脱敏执行JSON，共3份附件。项目/类型、负责人/迭代/标签、优先级高、严重程度2-严重、正文和附件ID/名称及图片引用全部回读通过。

创建前核对全部状态73条缺陷，并在写入前重新查询；未发现MW-01或同run记录。FWXC-253/245仅症状相似、交付组合不同，同根因未确认，未合并或修改。实际新建1、旧项更新0、跳过0、失败0、回读验证1。同步底稿`reports/mw01-yunxiao-20261104/`。

本次未重跑CinLink任务、未改变默认启用/FIXME或测试结论；MW-01仍待修复回归，MW-02单次提交仍为通过，MW整体14有通过证据/9未通过/3前置阻塞。


## 2026-11-04 旧快捷入口清理

按用户要求删除矩阵旧快捷卡片整节、分类表3项、CS-07～09及相关前置/no-op规则；本日已有DOM快照中旧快捷锚点为0。现有功能卡片和7条自动化脚本不变，未新建任务或缺陷。

工作簿使用Artifact工具生成目标修改，并保留原工作簿的字体charset等原生样式。目标页清理后为卡片清单12项、卡片用例22条，总览同步；1692个保留单元格的内容/样式、冻结窗格、合并和列宽核对通过，13个非目标包部件字节不变，已移除条目为0；已检查修改前后视图。备份、预览、修改及核验底稿在 `reports/cleanup-quick-prompts-20261104/`，没有覆盖历史测试证据。此次仅文档/工作簿清理，不重复执行离线或预发测试。

## 2026-11-04 AI生图P0设计检查

AI生图正文统一到 `docs/design-cases/multi-workflow/ai-image-p0-cases.md`，沿用IG-01～05并补IG-06～08，共8条、全部P0；统一入口逐条展示分辨率/比例及状态，旧矩阵的重复正文已改为链接。覆盖1K/2K/4K、5种常用比例、默认参数及同会话比例/分辨率切换。当前模型精确像素映射尚待补齐，不以产物自身尺寸反推预期。

定向文档检查通过：8个唯一连续编号、九列必填、P0标记、未执行说明、7 PLAN/1已有脚本部分覆盖（IG-05）；69个本地链接有效，原矩阵无重复IG正文。仅修改文档，没有新增或运行生图脚本、没有创建真实生成任务；卡片套件仍7条，AI生图仍1条，未重复离线全量测试。Excel尚未同步此次参数扩展。

## 2026-11-04 SSO有头前置调试与统一入口

SSO-001～004脚本已接入，独立有头配置、单worker、零重试。SSO-001调试中原片登记run `run_v2_ac077d4ceff64e19b368e44aa815f911` done，会话 `e6ac20f8-8f53-406c-9c24-d083eb44df6b`，F=`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`；源文件下载SHA-256与本地一致。随后第一轮@候选未命中，页面“暂无相关内容”，目标20秒/30秒任务均未提交。原始JUnit为1 failed（27.7秒），业务判为前置阻塞；SSO-002～004未执行。

证据：`reports/sso-headed-20261104-113440/headed-source-resume/` 中HTML/JUnit、审计、截图、trace。前序仅登记/夹具适配资料保留，不当作目标工作流失败。用户确认@缺陷已提、修复中，本轮停止执行，不新增缺陷。

统一导航已调整为[全部用例入口](cases/README.md)，原分类正文和编号保留；已同步SSO脚本状态与阻塞信息，不把已接脚本当作通过。

本轮收尾：类型检查通过；`npm run test:sso -- --list`发现同一文件4条脚本；统一入口、根README及SSO正文的66个本地链接均有效；SSO正文18个唯一编号、九列和状态校验通过（4 BLOCKED / 14 PLAN）。以上检查不打开浏览器、不提交任务，未重复全量离线测试。

## 2026-11-04 MW-01/02 单次完整提交复跑完成

用户明确两条都一次发送全部提示词；已在原条目和脚本调整并各执行一次，串行、单worker、零重试，0补槽、0计划确认。**MW-01未通过、MW-02通过**；分别有单例HTML/JUnit/trace，合并摘要`reports/mw01-mw02-single-prompt-20261104/summary.json`，不伪造同一份两条JUnit。

MW-01：196.973秒，run `run_v2_2edbba5bdcaa4e0da78359e0a0e3f006`（会话`07abbd20-d1b5-471f-888d-291b553b7b04`）done且无错误，仅交付一份中文字幕SRT，缺英文SRT，交付断言失败。下载字幕15条、中文文本、结束60.46秒。UI说明仅先安排中文，英文待该SRT可用后再规划；步骤为抽音频、转写、一次翻译、导出，未自动完成后置英译。失败PNG、final-state、trace与审计保存在`reports/mw01-single-prompt-20261104/`；不推测根因。

MW-02：658.485秒，run `run_v2_5bf18559740c45c5bb7d439a14f81ea3`（会话`e79fe1d1-74cc-4149-ae9e-55adf306a8b3`）done，交付中文SRT和增强MP4。已下载核验：中文SRT15条、结束60.46秒；MP4约21.24MB、2560×1440、60.495778秒、1音轨。`reports/mw02-single-prompt-20261104/artifact-verification.json`保留ffprobe与字幕基础核验；未逐字验证翻译或逐样本比较音轨。

两条均按实际英文原片写提示词，类型检查通过；没有重复全套离线或修改判定阈值，默认启用/FIXME不变，未向云效写入。执行源码快照与各自run-state哈希一致。26条台账更新为14有通过证据/9未通过/3前置阻塞/0待复测，MW-01为当前缺英文SRT失败，MW-02为通过。SSO专项状态以独立执行与阻塞记录为准，不由本次MW结果替代。

## 2026-11-04 旧执行方式纠正记录

运行时只有停止按钮为正常交互。原MW-02“重叠发送失败”的产品失败判定撤销，原始Playwright/JUnit和截图不改写；旧摘要标记执行方式不适用。用户进一步明确MW-01也一次提交全部要求，旧两轮MW-01仅作为历史场景记录，不替代当前单次字幕链。后续执行及结果见本页最新记录。

## 2026-11-04 12:30 MW-01 / MW-02 初批记录（MW-02执行方式不适用）

真实执行 **1 passed / 1 failed**（约4分钟），单worker、零重试，补槽0次、计划确认0次。Playwright JSON统计expected=1、unexpected=1、全局错误0；JUnit共2项，MW-02记为error项（errors=1、failures=0），不改写原报告。auth沿用有效会话1 passed（10.2秒）；类型检查、3条定向单测通过；未重复全套离线。

MW-01：182.022秒，同会话先字幕SRT、再上一轮SRT翻译，两run均done。第二次发送按钮为Send；服务端第二轮仅translate_subtitle/export_subtitles，各步骤上下文只含1份字幕，无视频/音频，没有重新抽音频或转写。两份产物名称不同但file_id相同，本次不据此判定语言正确或错误，未逐字验收字幕和完整时间轴。

MW-02旧执行：53.532秒，第一条字幕run queued时输入第二条增强指令，DOM只有workspace-stop（Stop task），没有workspace-send，未产生增强run。未点击停止；测试清理取消首run。用户现已确认这是正常交互，应一次提交全部要求；旧人工重叠发送测试不适用，不计为产品失败，已由单次完整提交复跑替代。

`reports/mw01-02-20261104/`保存原始HTML/JUnit、两份trace、审计、截图、字幕步骤和DOM控件摘录；摘要另注明MW-02设计纠正。初批14通过/9失败/3阻塞口径已因MW-02纠正而过期，以最新记录为准。正式需求目录、默认FIXME配置未改，未向云效写入，SSO设计仍未执行。

## 2026-11-04 MW-06 / MW-10 云效同步

已在cinlink-WEB新建并回读验证2条：

- MW-06：[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)，任务done但缺单独英文SRT；[本地记录](defects/CINLINK-MW06-001.md)。
- MW-10：[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)，高光Extract audio报source_duration_sec空对象错误、无产物；[本地记录](defects/CINLINK-MW10-001.md)。

每条包含详细前置操作、素材规格、原提示词、逐步复现、实际/预期和回归边界，均按用户模板去掉“排查信息”。每条上传并嵌入提交前及失败终态原始PNG，另附脱敏执行JSON：共4张图、6份附件。项目/类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文、附件ID/名称及嵌图引用均回读通过。

创建前对全部状态分页核对，初始71条，未发现两用例或同run记录；FWXC-245仅有相似缺英文SRT症状，交付组合不同、同根因未确认，未合并或修改。每条创建前均重新检索并以更新时间复核详情缓存；最后一次创建前共72条。实际新建2、旧项更新0、跳过0、失败0、回读验证2。同步底稿：`reports/mw06-mw10-yunxiao-20261104/`。

本次只同步证据，没有新增CinLink任务；测试结论仍为8条流程/产物检查通过、2条未通过，默认启用/FIXME数量不变。已注明英文语音素材与中文语音提示词的前置差异，不宣称已覆盖严格中文源语音场景。


## 2026-11-04 10:43 多工作流10条补跑完成

汇总2026-11-03已提交MW-06原run与本日续跑9条：**8流程/产物检查通过、2未通过、0阻塞、0未运行**。通过MW-03/07/08/09/23/24/25/26；MW-06 done但中文SRT+总结仅2份，缺单独英文SRT；MW-10 failed、0产物，错误`'NoneType' object has no attribute 'source_duration_sec'`，原始画面位于高光Extract audio步骤。失败PNG及trace均已保存并检查。

续跑09:40–10:43，JUnit **8 passed / 1 failed**、退出码1；单worker、零重试，没有重跑MW-06。auth 1 passed（45.2秒）。实际0次补槽提交、8次计划确认；配置允许补槽填写继续。类型检查与3条定向单测沿用前次有效结果，本日仅执行目标预发任务，未重复全套离线；当前离线发现123条，不等同全部已执行。

验收边界：仅检查任务完成及产物数量/类型，未完整验收字幕、水印、剪辑顺序和媒体规格。源文件SHA-256与MW-16独立ASR证据一致，实际英文语音；提示词未改，仍按中文语音描述，严格中文源语音前置未覆盖。原有素材下的流程证据与完整业务验收分开报告。

已更新测试进度、上下文、原多工作流用例备注、覆盖账本与离线发现数量文档；默认启用/FIXME数量不变，正式需求目录未改，未向云效写入。合并报告：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/summary.json`；续跑HTML/JUnit/审计/trace位于`remaining-after-auth/`。26条最新覆盖：13有通过证据、8失败、3前置阻塞、2旧异常待复核。

## 2026-11-03 21:13 多工作流初批记录（认证中断，已于次日续跑）

用户指定MW-03/06/07/08/09/10/23/24/25/26；已按串行、零重试启动，设置补槽填写继续，并留存失败截图与trace。MW-06原任务done、交付中文SRT和总结2份，缺英文SRT，未通过；恢复读取23.338秒，页面原任务耗时205秒，二者分开记录。MW-07发送页Unauthorized、120秒无提交响应，未取得run_id；会话核验失效，属于认证前置受阻，已停批次、打开人工登录，剩余9条待继续。

人工登录等待300秒超时，窗口已退出。当前0通过、1未通过、1认证受阻、8未运行，不是10条完整执行结果。恢复登录后运行该报告目录内`run-remaining.cjs`，仅补其余9条。认证失败截图另存`auth-expired/`，结构化状态见`summary.json`。

筛选已用编号后空白限定并核对10条发现结果；最初误匹配父级标题的批次仅提交MW-06即中断，未执行额外用例；截图等待字体被中断后跳过字体就绪等待，继续读回同一run，无重复提交。中断资料和正式取证分别保存在 `reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`，未合并成一次完整JUnit结论。

类型检查通过；完整参数补槽、原生select补槽后继续确认、原run恢复绑定3条定向单测通过；离线发现123条，未重复全量校验。改动不涉及正式需求用例或产品判定阈值，未向云效写入。

## 2026-11-03 21:05 MW-22 前端模拟

执行 `npm run test:multi:materials:ui`：**1 passed，7.035秒**（总计8.593秒），类型检查通过。只加载预发静态资源，空登录态，业务接口与 SSE 本地模拟。验证 A done / B running 后仅将 B 更新为 failed，原生步骤错误可见，A 卡片保留，产品下载按钮可下载合成 MP4，22,718字节及SHA-256均一致，页面脚本错误0。模拟汇总文字可见，但不覆盖服务端统计生成；下载为本地 data URL，不验证 S3。

未改云端代码、未提交真实AI任务、未注入真实服务端故障。MW-22真实场景仍前置阻塞 / FIXME，真实专项通过数和默认套件计数不变。此前模拟夹具适配过程的失败报告保留，不当作服务端任务失败。本次未重复全量离线测试。

证据：`reports/mw22-ui-mock-20261103-210517/`（HTML、JUnit、两阶段截图、审计JSON、UI快照、trace）；详细实现及边界见 [MW-22说明](design-cases/multi-workflow/mw22-breakpoints.md)。

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


## Codex：2026-11-03 云效缺陷格式精简

用户要求补充开发排查信息后，已从对应原始 trace 提取并写入 FWXC-244～247：UTC+8 的提交/终态观测时间、请求 UA 与前端资源标识、关联素材/项目 ID、提交及状态回读接口和 HTTP 状态。MW-21 额外记录项目登记 HTTP 200/registered=1、文件清单含 F、分析接口 task=null/items=[] 及 @ 查询时刻；仅说明本次 trace 未观察到搜索请求，不据此断定服务端未执行检索。未采集到的业务发布版本、完整浏览器版本、request_id/trace_id 已注明。每条新增一份脱敏排查 JSON，4/4 正文、附件与原截图引用回读通过；未重新运行测试，未上传原始 trace 或登录态。新增“排查信息”位于“实际结果”之后，证据见 `reports/yunxiao-debug-20261103/`。

用户随后要求单列前置步骤和提示词，已补充至 FWXC-244～247：顺序为 **现象 → 前置步骤 → 提示词 → 复现步骤 → 实际结果 → 预期结果 → 影响 → 补充 → 失败截图**。MW-21 区分 A 的准备指令与 B 的目标指令，并注明目标未发送；四条原有实际结果及截图均保留，4/4 回读通过。此次仅补充缺陷说明，未重跑测试。最新正文与回读结果见 `reports/yunxiao-preconditions-20261103/`，后续使用该模板。

按用户要求统一整理 FWXC-244～247 的标题和正文，随后按用户提供的示例调整为 **现象 → 复现步骤 → 实际结果 → 预期结果 → 影响 → 补充 → 失败截图**，末尾直接嵌入原始截图。保留完整触发指令、已知任务/会话 ID 和关键错误；移除重复历史、提交流水和脚本调试说明。MW-12 未注入故障、MW-21 素材分析条件未确认等边界写入“补充”。最终 4/4 正文及截图引用回读通过，原附件、状态和负责人未变；未新增缺陷或附件，未重跑测试。前次格式记录在 `reports/yunxiao-format-20261103/`，最终模板及回读记录在 `reports/yunxiao-template-20261103/`，后续沿用用户模板。

## Codex：2026-11-03 MW-21 同项目夹具复测及云效更新

同项目夹具已接入：页面创建 P，A 上传指定素材并保存源消息，通过当前项目文件接口登记同一个 F 后回读；P 内 B 草稿不再上传，只尝试 @ 引用。项目及会话 API 按当前预发适配，project_id 从 Runtime 顶层字段核验。

最终执行 **1 failed，92.364 秒**，失败点在 B 的 @ 候选检查：A 的项目归属、源任务 done、P 文件清单含 F 均有证据，B 草稿属于 P 且上传数为 0，但候选为空并显示“暂无相关内容”。页面同时为 0/1 素材已分析，分析/索引就绪是否是额外条件尚未确认，不能把本轮定性为已查明根因的产品能力缺陷。B 首次提交才持久化，本轮未提交目标指令，没有 B conversation_id、目标 run 或 MP4；后续字幕与媒体断言未执行，FIXME 保留。

离线曾完成类型检查及 119 条通过（新增同项目隔离回归）；按用户随后要求，不在后续每次单条预发前重复整套离线。登录脚本已改为单窗口、工作台就绪才保存会话，人工恢复登录实测通过。最初控件、接口字段和登记接口适配尝试单独保留为夹具调试记录，不混入最终业务统计。

按用户“提交到云效中”要求，核对现有 **FWXC-247** 的项目/编号/标题后更新该工作项，保留历史描述、状态和附件；补充 1 张原始截图、1 份脱敏 JSON、1 份详细 Markdown，截图嵌入描述，**1/1 描述与附件回读通过，0 新建**。未上传登录态、原始 trace 或签名链接。

本机证据：`reports/mw21-same-project-20261103-190443/` 的 `html/index.html`、`junit.xml`、`audit/MW-21.json`、截图与 trace，以及 `yunxiao-plan.json`、`yunxiao-result.json`。

## Codex：2026-11-03 补传缺陷截图

2026-11-03 补齐截图：FWXC-244（MW-11）、FWXC-245（MW-12）、FWXC-246（MW-14）各 1 张，FWXC-247（MW-21）首次与服务端保存名复核各 1 张，共 **5 张原始实测截图**。已上传到原有四条缺陷并嵌入描述，附件 ID/文件名与描述回读均通过；未新增缺陷。加上此前说明文档和脱敏 JSON 共 13 份附件。MW-21 复核截图仅展示输入状态，不能单独证明候选为空，仍须结合审计证据。

证据：`reports/mw-failures-yunxiao-20261103/screenshot-plan.json` 保存来源与 SHA-256，`screenshot-result.json` 保存附件 ID 和描述引用验证结果；5 张截图与原始报告逐字节一致。截图中无凭据、预签名 URL 或个人邮箱；仅包含专用测试账号、测试会话与测试素材。此次只更新原工作项的附件与描述，未重跑计费任务，未改变 FIXME 或执行数量。项目 AGENTS 和 Codex 上下文已加入“同步缺陷必须上传对应截图”的维护约定。

## Codex：2026-11-03 未通过用例同步云效（不去重）

用户明确要求将本轮未通过场景同步云效，随后要求“本次无需去重”。本次未做云效缺陷搜索；只读取 cinlink-WEB 项目与字段元数据，直接新建 4 条，更新/重开均为 0；不代表历史不存在相似项。

| 用例 | 云效缺陷 | 本地详细记录 | 当前状态 |
|---|---|---|---|
| MW-11 | [FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc) | [CINLINK-MW11-001](defects/CINLINK-MW11-001.md) | 待修复回归 |
| MW-12 | [FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b) | [CINLINK-MW12-001](defects/CINLINK-MW12-001.md) | 待修复回归 |
| MW-14 | [FWXC-246](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=514a280c2861b2903950c6783d) | [CINLINK-MW14-001](defects/CINLINK-MW14-001.md) | 待修复回归 |
| MW-21 | [FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2) | [CINLINK-MW21-001](defects/CINLINK-MW21-001.md) | 前置阻塞，待定位 |

提交前 DryRun 为 4 create、0 update/reopen，审计校验通过；提交后 4/4 回读验证标题、完整描述、项目/类型、负责人/迭代/标签、优先级/严重程度，8 份脱敏附件均存在。证据保存在 `reports/mw-failures-yunxiao-20261103/` 的 `audit.json`、`create-plan.json`、`write-checkpoint.json`、`result.json`。

审计区分后端 failed（MW-14）、done 但交付不足（MW-11/12）和无目标提交的前置阻塞（MW-21）。MW-21 包含首次与按服务端保存名复核的源会话证据；没有把候选未命中认定为已确认的产品跨会话能力缺陷。未上传原始 trace、凭据或带签名链接，未重跑计费任务，未修改测试代码或启用数量。

## Codex：2026-11-03 恢复 MW-18 默认执行

基于下方严格复测的真实通过记录（218.691 秒、无补槽或计划确认），移除 MW-18 的 `fixme` 字段，保留视频与水印图双附件及原有断言。复合套件现为 **15 条：11 默认启用 + 4 FIXME**（MW-11/12/14/21）；多工作流合计 **20 条：15 默认启用 + 5 FIXME**；预发共 **46 条：36 默认启用 + 10 默认跳过**。

默认单条执行命令：

```powershell
npm run test:multi:compound -- --grep 'MW-18\b'
```

无需 `CINLINK_INCLUDE_BLOCKED=1`。已同步用例正文与登记表、工作流设计、README、AGENTS、Codex 上下文、测试进度和工作流矩阵；需求目录未新增用例。下方“保留五条 FIXME”是严格复测当时的历史状态。

验证：`npm run verify` 类型检查通过、**118 passed（4.9 秒）**；`npm run cases:check` **233 条，issues=0**；清除强制开关后，源码状态与 Playwright `--list` 确认 MW-18 默认启用，其他四条复合 FIXME 保留。证据在 `reports/mw18-default-enable-20261103/`。矩阵仅更新 4 个相关单元格，其他内容和格式保持原样。本次未额外创建预发任务；水印位置、透明度、字幕同步等内容层核验仍待补。

## Codex：2026-11-03 优化提示词严格复测 MW-11/12/14/18/21

会话探测通过；先通过类型检查与 118 条离线用例，再以 `workers=1`、`retries=0` 执行。严格模式不自动回答缺参补槽，仅允许明确的计划确认；每条保存服务端状态、产物名、源/目标会话引用证据、截图与完整 trace。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
$env:CINLINK_PROMPT_PROBE='1'
$env:CINLINK_AUDIT_DIR='<本次 reports 目录>/audit'
node node_modules/@playwright/test/cli.js test --project=staging tests/staging/g3-g7-multi-compound.spec.ts --grep 'MW-(11|12|14|18|21)\b' --workers=1 --retries=0 --trace=on
```

| 用例 | 结果与证据边界 | 补槽 / 计划确认 | 耗时 | 目标 run_id |
|---|---|---|---:|---|
| MW-11 | run done，但仅 `media-info.json`；未交付两份 SRT，断言失败 | 未观察到 / 无 | 190.608 秒 | `run_v2_7a94f4a082e44da7b84624ae997045ee` |
| MW-12 | 仅正常路径探测：中文字幕 + 英文字幕成片，缺少单独英文 SRT；未覆盖故障注入 | 未观察到 / 无 | 281.013 秒 | `run_v2_b35c25803af2438bb0971ee5dae1adb3` |
| MW-14 | 规划模型 60 秒超时，run failed，0 产物 | 未观察到 / 无 | 234.354 秒 | `run_v2_0b3376e0e8b44bccbe731e59c5fe66ca` |
| MW-18 | passed：视频与图片双附件引用后得到水印视频、中文字幕 SRT；内容层未验 | 未观察到 / 无 | 218.691 秒 | `run_v2_58df70a487e74fcb9775ac50aeec28fa` |
| MW-21 | 新会话素材引用前置失败，目标提示词未提交 | 尚未验证 | 93.461 秒 | 无目标 run；源会话登记成功 |

初始批次 **1 passed / 4 failed（17.3 分钟）**，业务分类为 1 通过、3 交付/执行未通过、1 前置阻塞。MW-21 发现服务端去重后的保存名与临时名不同，修正为服务端保存名后单独复核 **1 failed（93.384 秒）**；仍未命中新会话候选，目标指令没有提交。不能据此认定产品不支持跨会话，也不能认定优化指令不会补槽。

本轮保留五条默认 FIXME 标记，更新原因而不放宽断言。MW-18 夹具已补双附件；MW-21 源文件身份与会话已记录。已知运行任务结束后回读状态；本轮均已终态，无需再取消。

本机证据：`reports/mw11-12-14-18-21-20261103-174823/`：主报告 `html/index.html`、`junit.xml`、`run.log`、`summary.json`、`audit/`，以及 `test-results/` 截图/trace。MW-21 修正复核在子目录 `mw21-canonical-name-recheck/`。记录与原始 trace 均 gitignore。

## Codex：2026-11-03 恢复 MW-24/25/26 默认执行

基于下方 3 passed 的真实预发结果，移除三条用例的 `fixme` 字段。复合套件现为 **15 条：10 默认启用 + 5 FIXME**；多工作流合计 **20 条：14 默认启用 + 6 FIXME**；预发共 **46 条：35 默认启用 + 11 默认跳过**。

默认执行命令：

```powershell
npm run test:multi:compound -- --grep 'MW-(24|25|26)\b'
```

无需 `CINLINK_INCLUDE_BLOCKED=1`。启用状态检查和离线验证记录在 `reports/mw24-26-default-enable-20261103/`；本次修改不额外创建预发任务。下面的“未修改 FIXME”是当时强制复测的历史状态，已由本节后续启用动作更新。

后续补齐普通复合指令的参数、前置操作、执行步骤和业务预期，MW-13 单独保留参数冲突澄清。工作流用例位于 `docs/design-cases/multi-workflow/`，需求目录仅放正式需求。旧指令通过不等同新版完整指令已复测，此次只运行离线校验和用例发现。

验证：`npm run verify` 类型检查通过、118 passed（6.3 秒）；`npm run cases:check` 校验 233 条正式需求，issues=0；清除强制开关后，通过源码状态检查与 Playwright `--list` 确认 MW-24/25/26 均默认启用。多工作流用例与登记表按用户要求独立放在 `docs/design-cases/multi-workflow/`，不再放入 requirements。工作流矩阵同步 4 个相关单元格，其余内容与格式保持原样。

## Codex：2026-11-03 17:10–17:21 MW-24/25/26 复测

用户指定执行三条用例。迁入的会话已失效，首轮在登录页被拦，尚未提交工作流；停止该轮后，经人工登录保存新会话，再执行以下复测。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
node node_modules/@playwright/test/cli.js test --project=staging tests/staging/g3-g7-multi-compound.spec.ts --grep 'MW-(24|25|26)\b' --workers=1 --retries=0
```

| 用例 | 结果 | 耗时 | 本轮 run_id |
|---|---|---|---|
| MW-24 去口癖→中文字幕 | passed | 230.125 秒 | `run_v2_b1b56eb272ab4e20afeccf31505837b1` |
| MW-25 长变短→中文字幕 | passed | 231.181 秒 | `run_v2_08bd3e669626458a8c7738a7556baaef` |
| MW-26 文字水印→英文字幕 | passed | 182.280 秒 | `run_v2_549eafd4d7214aefa8181b81f0a2f73c` |

合计 **3 passed（10.8 分钟），退出码 0**，单 worker、零重试。本轮未复现 `Missing CinLink access token or API key.`；三条均通过现有产物数量和 video 类型断言。此次未新增画面内容或音画同步校验。

本次使用 `CINLINK_INCLUDE_BLOCKED=1` 强制执行，测试代码和默认 FIXME 标记未修改；云效提交/工作项状态未查询或更新。历史失败记录保留在下方。

本机证据（均 gitignore）：

- HTML：`reports/mw24-26-20261103-171012/html/index.html`
- JUnit：`reports/mw24-26-20261103-171012/junit.xml`
- 日志：`reports/mw24-26-20261103-171012/run.log`
- 结果摘要：`reports/mw24-26-20261103-171012/results.json`
- 首轮登录阻塞与登录恢复日志：`reports/mw24-26-20261103-170524/`

## 零之一、2026-11-03 提测构建复测

新构建提测后，重新登录并跑核心验收集（会话需重新登录，之前的状态已过期）：

| 命令 / 用例 | 结果 | 关键数据 |
|---|---|---|
| `npm run test:g1` | 4 passed（3.0 分钟） | 上传接口恢复；multipart 2 分片、S3 字节一致 |
| `npm run test:g3`（subtitle） | 1 passed（2.7 分钟） | 121.3s 收敛，15 条字幕，-31 分 |
| `npm run test:watermark` | 1 passed（2.1 分钟） | 39.9s 收敛，0 分 |
| `npm run test:flows -g translation` | 1 passed（2.5 分钟） | 101.9s 收敛，`subtitles.srt` 15 条，-31 分 |
| `npm run test:flows -g text-watermark` | 1 passed（1.6 分钟） | 50.2s 收敛，0 分 |
| `npm run test:flows -g enhance` | 1 passed（7.5 分钟） | 401.9s 收敛，0 分 |
| `npm run test:multi:base -g MW-04` | 1 passed（2.6 分钟） | 双素材混剪，0 分 |
| `npm run test:flows -g clean-cut` | 1 passed（3.0 分钟） | 充值后复测：计划确认（提取音频→转写→分析→渲染）后自动渲染，成片 59.05s，-31 分 |
| `npm run test:flows -g long-to-short` | 1 passed（4.1 分钟） | 计划确认后自动渲染，成片 19.07s，-11 分 |
| `npm run test:flows -g mix` | 1 passed（2.7 分钟） | 双素材混剪，成片 18.12s，-11 分 |
| `npm run test:g2` | 3 passed（30.8s） | 两条原 fixme 改为：会话内 job_id 唯一、提交最多 1 次计费请求；无按 Job 流水接口，已在用例注明证据边界 |
| `npm run test:multi:base -g "MW-05"` | failed（1.5m） | 取消端点 `/runtime-api/v2/agent/runs/{id}/cancel` 已验证可用（状态变 cancelled）；但同会话重提 done 且 0 产物，助手回复 “workflow’s required tool definitions were not supplied”，属产品问题，MW-05 保持 fixme |
| `npm run test:cards -g "Find Local Footage 模式"` | 1 passed（11.2s） | 零费用冒烟：卡片存在、面板有 Analyze、显示 media files analyzed |
| `npm run test:multi:compound -g "MW-09"` | 1 passed（7.8m） | 6 合 1：澄清水印类型→计划确认→1 个成片（watermarked-video.mp4） |
| `npm run test:multi:compound -g "MW-13"` | 1 passed（2.7m） | 澄清“确认最终时长”提交 30→生成计划→确认计划→1 个成片 |
| `npm run test:multi:compound -g "MW-20"` | 1 passed（2.9m） | 多素材歧义：自动选用第一个素材，1 个成片 |
| `npm run test:multi:compound -g "MW-14"` | failed（4.1m） | 产品规划超时：`TimeoutError: 规划模型等待响应超过 60 秒`，0 产物；保持 fixme |
| `npm run test:flows -g clean-cut` | 1 passed（2.5m） | 计划确认逻辑改动后的回归：requires_user_input → confirmation_approved → done，-31 分 |
| `npm run test:multi:compound -g "MW-23"` | 1 passed（3.1m） | 新增 P0 字幕链：中文→英文→烧录，1 个 video 产物 |
| `npm run test:multi:compound -g "MW-24/25/26"` | 3 failed（2.6/3.8/2.6m） | 产品报 `Missing CinLink access token or API key.`，run failed；三条 P0 暂标 fixme，待产品修复 |

本轮全部通过（含 clean-cut、long-to-short、mix 三条此前 blocked 的工作流）；flows 6 条全部启用。

## 零、2026-11-02 新版工作台适配与验证

预发前端切到 `/studio/workspace` 新版工作台后，旧锚点与上传/提交链路全部失效。本轮完成适配并实测：

| 命令 / 用例 | 结果 |
|---|---|
| `npm run verify` | 118 passed（含 2 条 `file_cloud_*` ID 契约） |
| `npm run test:g1` | 4 passed；multipart 2 分片、7,815,126 字节、S3 字节一致 |
| `npm run test:g3`（subtitle） | 1 passed；`run_v2_7b279…`，90.6 秒，`subtitles.srt` 15 条 |
| `npm run test:watermark` | 1 passed；`run_v2_e7edc…`，62.1 秒，1280x720/25fps |
| `npm run test:flows -g translation` | 1 passed；`translated.srt` 15 条 |
| `npm run test:flows -g text-watermark` | 1 passed；34.3 秒 |
| `npm run test:flows -g enhance` | 1 passed；389.4 秒，2560x1440 |
| `npm run test:multi -g "MW-04"`（有头） | 1 passed；2.5 分钟，MIX-001 修复复测 |

适配要点：

- 就绪锚点改为 `#workspace-prompt`；新建会话改为 `button[aria-label="New no-project session"]`；
- 附件改为先挂载（`.workspace-media-thumb`）、发送时才上传；G1 拆成“上传合同（API）+ UI 挂载”；
- 提交改为 `POST /runtime-api/v1/conversations/{id}/turns`，返回 `run_v2_*`；
- 状态与产物改为从 `GET /runtime-api/v1/conversations/{id}/messages` 按 `job_id` 读取；
- `result_files` 只有 `file_id` + `facts`，统一归一化并补预签名 URL；
- 澄清/确认态（`waiting_for_clarification` / `waiting_for_confirmation`）归一为 `requires_user_input`，不再空转到超时。

仍阻塞：clean-cut（预发已知问题，研发修复中）、long-to-short（确认菜单续跑未接稳）、MW-01/02 第二次发送、MW-05 取消接口。生成类与快捷卡片仍按旧版上传流程编写，待迁移。

多工作流转为 22 条：`test:multi`（MW-01~22）、`test:multi:base`（01~05）、`test:multi:compound`（06~22）；预发项目总数 50。

## 一、2026-10-19 迁移到 deepseek-cinlink

目标：把 `test-cinlink-web` 的测试框架整体迁移到本工程，并确认在 DeepSeek 中可直接使用。

| 命令 | 实测结果 |
|---|---|
| `npm ci --no-audit --no-fund` | 成功，6 个包，沿用来源工程的 `package-lock.json` |
| `npm run verify` | 类型检查 0 错误；离线 116 passed / 0 failed（约 3.6 s） |
| `npm run doctor` | 1 passed；修复 `ready` 判定后输出"✓ 已就绪"（会话文件可用，见下） |
| `npm run test:staging` | 两轮均为 5 passed / 2 skipped / 0 failed，各约 1.1 分钟 |
| `npm run test:g3` | 1 passed（1.7 分钟），真实 subtitle 任务，余额 -24 分 |
| `npm run test:watermark` | 首次 1 failed（澄清，composer 丢失指令文本）；修正后 1 passed（1.3 分钟），余额未变 |
| `CINLINK_HEADLESS=0` + `test:watermark` | 有头运行：首次 G7 误报孤儿任务；加 active 回落等待后 1 passed（1.3 分钟） |

### 文件一致性

对 `src/`、`tests/`、`tools/` 逐文件 SHA-256 比对：除 `src/assertions/artifact.ts`、`src/config.ts`、`src/workspace.ts` 三处修改外与来源完全一致。`tests/staging/g3-g7-subtitle.spec.ts`、`g3-g7-image-watermark.spec.ts` 是本工程新增文件（来源没有）。工程标识、`local.env`、`README.md`、`AGENTS.md`、`docs/deepseek-usage.md`、`package.json`、`package-lock.json` 为预期差异。

### 修复的框架缺陷

首次 `npm run verify` 为 115 passed / 1 failed：`G6 产物结构与参数 › 视频时长在容差内且有音轨和哈希时通过` 误报"产物音轨数为 0，期望至少 1"。

根因在 `src/assertions/artifact.ts` 的 `metaNumber`：`Number("") === 0`，缺失的 `audio_stream_count` 被当成 0，触发 `streams < 1` 失败；同一函数也会把缺失的 `duration_sec` 误报成"时长偏差"。

在来源工程 `E:\proj\test-cinlink-web` 用同一命令复现了同样的失败（退出码 1），因此这是框架既有缺陷，不是迁移环境问题。修复方式：空字符串返回 `NaN`，缺失字段走"未提供"分支而不是"为 0"分支。修复后 116 条全绿，未改动任何断言阈值。

### 修正的配置诊断

迁移后 `npm run doctor` 在会话文件存在、预发用例实际可跑的情况下仍报"✗ 尚未就绪"，原因是 `credentialStatus().ready` 要求"邮箱/API Key 且有 storageState"。浏览器用例实际只使用 storageState，邮箱/API Key 只用于重新登录，所以该判定会误导 Agent 去重新登录。

修复：`ready` 改为只看 `storageStatePresent`，缺失项提示相应调整。修复后 doctor 输出"✓ 已就绪"，与随后 5 条预发用例通过的事实一致。doctor 仍不能证明会话未过期（页面首屏探测才是权威），这一点保留在说明文字里。

### G1（真实预发）

- `cloud_file_id`：`file_d41797f7749f4e0d`。
- 上传名：`7MB-1792391360399.mp4`，源文件 7,815,126 字节，服务端回显大小与 MIME 一致。
- 5 MiB 分片，实际 2 个分片请求，`multipart=true`。
- @ 引用按本次 `cloud_file_id` 命中并插入。
- S3 预签名 URL HTTP 200，下载字节数与源文件一致。
- 三条上传用例均在 `finally` 中删除云文件，删除成功。

### G2（真实预发）

- 提交返回 `run_62601a316fd2d1d51edcbe82`，初始状态 `queued`。
- 只观察到 1 个创建请求；按 ID 可回读服务端 Run。
- 余额 11,795 → 11,795（分为单位，未变化；该事实不能证明预扣次数正确）。
- 任务在 `finally` 中取消成功。
- 未覆盖（fixme，报告显示 2 skipped）：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣流水次数。

### G3–G7（subtitle 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-subtitle.spec.ts`（`npm run test:g3`）：上传 7.8MB 素材 → `@` 引用 → 提交固定提示词「给这个视频生成中文字幕」→ 每 5 秒轮询状态 → 下载并校验产物 → 余额与 worker 池前后快照。

- `run_id`：`run_cb73662564836ef3e16e2120`。
- 状态时间线：`queued ×5 → waiting_for_local → running → waiting_for_local ×6 → done`，无状态倒退。
- 收敛耗时 72.6 秒（轮询上限 15 分钟）。
- 产物 9 个；交付三要素（id / name / url / cloud_file_id）齐全。
- `subtitle.srt` 1,360 字节、15 条字幕；序号连续、时间戳单调、无 U+FFFD。
- `subtitled-video.mp4` 可解码，60.49 秒（源 60.5 秒）、1 条音轨。
- 余额 11,795 → 11,771（-24 分）：真实计费已发生；**扣减次数**仍无法证明（见 G2/G7 待接入项）。
- 任务在 `finally` 中取消（已完成任务取消接口仍返回成功），素材删除成功。
- G6 只做结构层；字幕与语音是否同步属于内容层，按要求留人工复核，产物留在 `reports/artifacts/g3-g7-subtitle/`。
- 仍未覆盖：G6 内容层、G7 的预扣流水次数；其余主干的实测见下文「其余五条主干」。

### G3–G7（image-watermark 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-image-watermark.spec.ts`（`npm run test:watermark`）：上传 `7MB.mp4` 与水印图 `cinlink-smoke-watermark.png`，依次 `@` 引用两个素材，提交固定提示词「给这个视频添加图片水印，水印图片用我引用的这张图片」，轮询状态并校验产物。

- `run_id`：`run_6e0daf7653efa2cd0d94c191`。
- 状态时间线：`queued ×3 → waiting_for_local ×7 → done`，无状态倒退。
- 收敛耗时 53.3 秒（轮询上限 15 分钟）。
- 产物 1 个：`watermarked-video.mp4`，6,449,847 字节。
- ffprobe：60.49 秒（源 60.5 秒）、1280x720、25.00 fps、h264、1 条音轨。
- 余额 11,771 → 11,771（本次未扣减）。余额不变不能证明水印工作流不计费，只能记录事实。
- 水印是否真的叠加：自动断言只覆盖结构层，另抽帧 `reports/artifacts/g3-g7-image-watermark/frame-top-right.png` 人工确认——右上角可见半透明水印图片（四色方块 + CinLink 底纹），说明图片水印确实生效。
- 任务在 `finally` 中取消，两个素材删除成功。

#### 首次失败与修正

首次运行在 G4 失败：`终态为 requires_user_input，期望 done`。页面快照与请求体显示提交的 prompt 只有两段 `@` 引用，指令文本丢失，AI 因此反问「你想如何处理这段视频和这张图片？」。

根因：两个引用 chip 占满一行后，`editor.click()` + `End` 可能把光标落在 chip 上而不是文本末尾，`insertText` 被丢弃。修正分两处：

1. `src/workspace.ts` 的 `referenceAssetInPrompt` 增加 `{ clear: false }`，否则第二次调用会把第一个引用 `fill("")` 掉；
2. 用例中把选区显式折叠到编辑器内容末尾再插入指令，并在提交前断言 composer 文本包含指令——避免只提交引用而浪费一次真实任务。

修正后一次通过。该失败属于用例组装代码问题，不是产品缺陷。

#### 有头运行与 G7 抖动
有头模式（`CINLINK_HEADLESS=0`）可以直接跑同一条工作流，浏览器窗口可见。首次有头运行在 G7 失败：`任务结束后 active 增加了 1，疑似留下孤儿任务`。

原因有两层：

- 任务状态变成 `done` 后，worker 释放 `active` 有几秒延迟，立刻读 `/v1/health` 会看到 +1；
- `active` 是 Runtime 全局指标，共享预发上其他人的任务也会干扰（与 G2 的 `submitted` 同类问题，设计文档已声明这类全局指标只能作证据）。

修正：在 `src/workspace.ts` 新增 `waitForActiveDrain`，done 之后在 45 秒窗口内轮询 health，等 `active` 回落到提交前基线再判定；subtitle 与水印两条用例都改用它。有头重跑通过：`run_f027fe0ab00cf8f82fc42b8a`，时间线相同、53.3 秒收敛、产物 6,449,847 字节、余额未变。

有头与 headless 的断言、等待逻辑完全一致，差别只是浏览器是否可见。

### G3–G7（其余五条主干）

2026-10-19 新增 `tests/staging/g3-g7-workflows.spec.ts`（`npm run test:flows`），表驱动覆盖 translation / enhance / text-watermark / long-to-short / mix，每条都是真实任务。

| 工作流 | 结果 | 收敛 | 产物 | 余额 |
|---|---|---|---|---|
| translation | passed（`run_fa92ccc08a22ee5a20f9ab91`） | 29.7 s | 7 个；`subtitle.srt` 1,360 B / 15 条，结构合法 | -20 |
| enhance | passed（`run_94d1357dc97fa4a2a35a5e47`） | 382.0 s | 1 个；`enhanced-video.mp4` 60.50 s / 2560x1440 / 24.96 fps / 1 音轨 | 0 |
| text-watermark | passed（`run_030fc0949fb581accc14a72f`） | 41.5 s | 1 个；`watermarked-video.mp4` 60.49 s / 1280x720 / 25 fps / 1 音轨 | 0 |
| long-to-short | passed（`run_acfa5e9a863c808662878b30`） | 152.0 s | 6 个；`rendered-clips.mp4` 20.00 s / 1280x720 / 30 fps / 1 音轨 | -55 |
| mix | **blocked**（见下） | — | — | — |

#### long-to-short 的两阶段流程

首次运行停在 `requires_user_input`：产品先给出「第 1 版高光方案」，带 `auto_render_at`（1 分钟后自动渲染），确认后才出片。

这不能当成终态。修正：在 `src/workspace.ts` 新增 `pollRunUntilSettled`——遇到 `requires_user_input` 时检查 `clarifications[].metadata.auto_render_at`，有待自动渲染项就继续轮询，只有真正的澄清（没有该字段）才停下。修正后时间线为 `… running → requires_user_input ×8 → waiting_for_local ×3 → done`，52 秒自动续跑并出片。

#### mix 的产品缺陷（默认 fixme）

双素材混剪共尝试 7 次，均未跑通，归为产品缺陷而非用例问题：

| 现象 | 次数 | 证据 |
|---|---|---|
| `intent_recognition_invalid_output`（云端模型步骤 `__plan_agent_run__` 失败） | 3 | 首轮、第三轮、以及回答澄清后的续跑（prompt 只有 "4"） |
| 停在 max_clips 澄清（「最多用几个高光片段（2～10个）？」） | 2 | 属正常两阶段流程，用例已实现自动回答 |
| done 但 0 产物，助手回复「该请求目前没有可执行的 CinLink 工作流程」 | 2 | 原始提交与回答澄清后的续跑各一次 |

关键证据：回答澄清后，产品用**回答文本本身**作为续跑 Run 的 prompt（截图与 Run 详情都是 `prompt: 4`），原任务上下文没有带上，因此续跑被判成「没有可执行的工作流程」；即使回答改成「最多用 4 个高光片段」也一样。

用例保留在 `g3-g7-workflows.spec.ts` 中并标记 fixme（`CINLINK_INCLUDE_BLOCKED=1` 可强制运行），不通过放宽 G4/G5 断言来掩盖。该缺陷需要产品侧修复澄清续跑的上下文传递，完整复现、请求体证据与修复建议见 [defects/CINLINK-MIX-001.md](defects/CINLINK-MIX-001.md)。

### 证据位置

- 预发 HTML：`reports/staging-html/index.html`；JUnit：`reports/staging-junit.xml`；运行日志：`reports/staging-run.log`、`reports/staging-run-2.log`。
- G3–G7 运行日志：`reports/g3-g7-run.log`（subtitle）、`reports/g3-g7-watermark-run*.log`（水印）、`reports/flow-*.log`（五条主干）；产物：`reports/artifacts/g3-g7-subtitle/`、`reports/artifacts/g3-g7-image-watermark/`、`reports/artifacts/g3-g7-workflows/`。
- 有头运行日志：`reports/g3-g7-watermark-headed*.log`。
- 离线 HTML：`reports/html/index.html`；JUnit：`reports/junit.xml`。
- 修复前的失败 trace：`test-results/artifact-G6-产物结构与参数-视频时长在容差内且有音轨和哈希时通过-unit/`。

报告、trace、会话均只留本地（见 `.gitignore`）。G3–G7 的断言器均已接入；七条主干中六条有真实用例并通过，mix 被产品缺陷阻塞，不能据此宣称七个工作流已全部验收。

> 产物落盘路径已从 `test-results/` 改为 `reports/artifacts/`：前者每次 Playwright 运行都会被清空，首次六条工作流的产物因此被后续离线运行清掉；改到 `reports/` 后可跨运行保留。水印用例随后重跑一次（1.4 分钟）恢复了视频与抽帧证据。

## 二、2026-10-16 来源工程接入验证（历史）

目标：复用 `E:\proj\cinlink-web-tests` 的既有实现，在 `test-cinlink-web` 接入 G1/G2。

| 命令 | 实测结果 |
|---|---|
| `npm ci --ignore-scripts --no-audit --no-fund` | 成功，沿用原依赖锁文件 |
| `npm test` | 102 passed（当时代码库的用例数；本工程复制时该目录已有 116 条） |
| `npm run typecheck` | 成功，0 个类型错误，包含 tools |
| `npm run test:staging` | 5 passed / 2 skipped / 0 failed，约 1.2 分钟 |

### G1

- 源视频实际大小 7,815,126 字节。
- 本轮登记响应返回非空 `cloud_file_id`，名称、大小、MIME 均匹配。
- 按 5,242,880 字节分片，实际观察到 2 个分片请求。
- 上传后可通过 @ 候选按本次 `cloud_file_id` 选中素材并插入引用。
- S3 对象 HTTP 200，下载体大小与源视频一致。
- 本次三个上传用例的云文件均执行清理。

### G2

- 提交返回 `run_bdd5e20042ff61a1c7c2c8ec`，初始状态 `queued`。
- 观察到 1 个创建请求，响应成功，按 Run ID 可回读服务端对象。
- 取消接口返回成功；清理位于 finally，断言失败也执行。
- 本次余额前后相等。此事实不能证明预扣次数正确。
- 未覆盖：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣次数。这两项在用例中标为 fixme，运行报告显示 2 skipped。

### 调试与修正

账户直接读取起初返回 401，但浏览器通过产品自身的 refresh 请求成功恢复会话，因此未要求重新人工登录。

首次 G1 上传及云文件登记成功，但 @ 验收失败。trace 显示助手选择了第一个历史项目，后续项目素材登记返回 409：`project root name does not match the existing library`。
新增隔离回归先复现失败，再将入口改为 `[data-workspace-new-session="non-project"]`；修正后的回归和预发 G1 均通过。没有修改业务代码或历史项目配置。

另外两个回归检查分别验证：零字节/非法源文件大小不能通过分片校验；取消、SSE、GET、查询参数中的路径不能误计为创建 Run。

### 证据位置（历史工程）

`reports/staging-html/index.html`、`reports/staging-junit.xml`、`reports/staging-results/`、`reports/g1-initial-failure/`、`reports/offline-verification.log` 均在 `E:\proj\test-cinlink-web`。

2026-11-13补充：用户最新要求明确需求存在而未实现则Failed。004官方需求§03回读仍有对象引用/移除要求，依据已有页面实测重新判定Failed，非本次完整重跑；旧批次结论保留。[复核边界](cases/requirements/ERYE-196/acceptance-004-review-20261113.md)。当前134条为2 Passed/2 Failed/130 Not Run，新版002仍Not Run；格式检查543条、0问题。004无云效写入。

本次校验：543条用例、0问题；144条ERYE237中仅022/023/028/031正文变化，四条历史登记字段保持，revision待重跑、PLAN及空脚本路径保持。npm包装命令因本机无python可执行名未启动，已用同一检查器及捆绑Python3执行通过，未修改环境或脚本。
