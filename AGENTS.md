<!-- ERYE199-051-V4-CORRECTION-20261123 -->
2026-11-23：ERYE199-051 v4 创建前的入口预期修正为「选择媒体」。原生产证据覆盖空态显示、选取媒体建成工程及刷新后入口不再显示，按新版预期复核为 Passed。当前 142 条有效用例为 47 Passed、20 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [复核记录](docs/cases/requirements/ERYE-199/revision-051-select-media-20261123.md)
<!-- /ERYE199-051-V4-CORRECTION-20261123 -->

<!-- ERYE199-051-V3-EXEC-20261123 -->
2026-11-23：ERYE199-051 v3 生产实测 Failed。空白会话缺少「新建视频工程」入口，通过「选择媒体」建成工程后和刷新后两项均符合预期。当前 142 条有效用例为 46 Passed、21 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [报告和截图](docs/cases/requirements/ERYE-199/results-051-v3-production-20261123.md)
<!-- /ERYE199-051-V3-EXEC-20261123 -->

<!-- ERYE199-051-V3-20261123 -->
2026-11-23：ERYE199-051 v3 验证创建前显示「新建视频工程」、创建后隐藏。现为手工待执行，v2 阻塞留历史。当前 142 条为 46 Passed、20 Failed、1 Blocked、21 Not Applicable、54 Not Run。 [修订说明](docs/cases/requirements/ERYE-199/revision-051-video-project-entry-20261123.md)
<!-- /ERYE199-051-V3-20261123 -->

<!-- ERYE199-091095-YUNXIAO-20261119 -->
2026-11-19：ERYE199-091～095 的 29 个失败变体已按四种现象同步 [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)、[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)、[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)、[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c)。36 张原始截图已上传并嵌入，48 个附件及正文回读通过。五例保持 Failed，当前 142 条为 46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run。 [同步明细](docs/cases/requirements/ERYE-199/defects-091-095-production-20261119.md)。
<!-- /ERYE199-091095-YUNXIAO-20261119 -->

<!-- ERYE199-NATIVE-AUDIO-090095-20261119 -->
2026-11-19：ERYE199-090～095生产实跑1 Passed / 5 Failed；31变体2 Passed / 29 Failed，6条AUTO。当前142条46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run；其他136条和既有云效关联保持，090原通过记录保留历史。失败截图已保存，测试结束后已同步云效。 [本轮报告](docs/cases/requirements/ERYE-199/results-090-095-production-20261119.md)。
<!-- /ERYE199-NATIVE-AUDIO-090095-20261119 -->

<!-- ERYE199-086087-YUNXIAO-20261119 -->
2026-11-19：ERYE199-086六个跨视频轨失败变体合并为[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)，087两个独立音频分割失败变体合并为[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。 [同步明细](docs/cases/requirements/ERYE-199/defects-086-087-production-20261119.md)。已有完成检查点，后续核对不重复创建。
<!-- /ERYE199-086087-YUNXIAO-20261119 -->

<!-- ERYE199-AUDIO-CROSS-086090-20261119 -->
2026-11-19：ERYE199-086～090生产实跑2 Failed / 3 Passed；18个变体10 Passed / 8 Failed，5条接入AUTO。当前142条46 Passed / 15 Failed / 2 Blocked / 21 Not Applicable / 58 Not Run；其他137条及既有云效关联保持。失败及关键步骤截图已保存，后续086/087已同步FWXC-702/FWXC-703。 [本轮报告](docs/cases/requirements/ERYE-199/results-086-090-production-20261119.md)。
<!-- /ERYE199-AUDIO-CROSS-086090-20261119 -->

<!-- ERYE199-081083084085-YUNXIAO-20261119 -->
2026-11-19：ERYE199-081、083、084、085按相同业务问题合并2条，已同步[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044)、[FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74)。原声误联动24个变体共用FWXC-699，083-T2额外英文字幕轨关联FWXC-700；31张原始截图已上传并嵌入，38附件及正文回读通过。四例保持Failed，082保持Passed；当前142条43P/13F/2B/21NA/63NR不变，其他138条及既有缺陷关联保持。本次未重跑、未修改旧云效缺陷。 [同步明细](docs/cases/requirements/ERYE-199/defects-081-083-085-production-20261119.md)。本批已有完成检查点，后续只核对，不重复创建。
<!-- /ERYE199-081083084085-YUNXIAO-20261119 -->

<!-- ERYE199-TIMELINE-081085-EXEC-20261118 -->
2026-11-18～19：ERYE199-081～085生产实跑4 Failed / 1 Passed，5条接入AUTO；按35个原生轮次/卡片操作变体逐项记录，结果25 Failed / 10 Passed。当前142条43 Passed / 13 Failed / 2 Blocked / 21 Not Applicable / 63 Not Run；其他137条和071/FWXC-693、078/FWXC-694保持。失败截图已保存，后续已同步FWXC-699/FWXC-700。以下旧统计按日期保留历史。 [本轮报告](docs/cases/requirements/ERYE-199/results-081-085-production-20261118.md)。
<!-- /ERYE199-TIMELINE-081085-EXEC-20261118 -->

<!-- ERYE199-078-YUNXIAO-20261118 -->
ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。 [同步明细](docs/cases/requirements/ERYE-199/defects-078-production-20261118.md)。本批检查点已完成，后续仅回查，不重复创建。
<!-- /ERYE199-078-YUNXIAO-20261118 -->

<!-- ERYE199-COMBINATIONS-076080-EXEC-20261118 -->
2026-11-18：ERYE199-076～080生产实跑4 Passed / 1 Failed，5条接入AUTO；当前142条42 Passed / 9 Failed / 2 Blocked / 21 Not Applicable / 68 Not Run。078同会话切换后字幕轨多出：S1实际4轨、T2实际6轨；原片及历史工程身份保持，失败截图与本地缺陷已保存，后续已同步FWXC-694。079的D流程通过，已知FWXC-693译文显示问题另列未修复。其他137条及原云效关联保持。以下旧统计按日期保留历史。 [本轮报告](docs/cases/requirements/ERYE-199/results-076-080-production-20261118.md)。
<!-- /ERYE199-COMBINATIONS-076080-EXEC-20261118 -->

<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。 [同步明细](docs/cases/requirements/ERYE-199/defects-071-production-20261118.md)。本批已有完成检查点，后续只读回查，不能再次新建。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

<!-- ERYE199-CARDS-069075-EXEC-20261118 -->
2026-11-18最新：ERYE199-069～075生产原生卡片已实跑6 Passed / 1 Failed，7条接入AUTO。071译文模式在编辑器仍显示双语，实际成片仅中文；已存原图和本地缺陷，后续已同步FWXC-693。074清理44.744秒、075高光30秒与本轮原片区间对应。当前142条：38 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 73 Not Run；其他135条及云效关联保持。以下旧统计按日期保留历史。

[本轮逐例结果、截图与复现](docs/cases/requirements/ERYE-199/results-069-075-production-20261118.md)。仅页面业务和实际文件验收；无computer-use、云效写入或Git推送。
<!-- /ERYE199-CARDS-069075-EXEC-20261118 -->

# AGENTS.md — 在 Codex 中维护 CinLink Web 链路测试

- 编辑器用例先打开并核对本轮目标工程，再在提示词中用「当前工程」指代。工程名、ID 和历史名称放在定位或执行记录中。测试同名区分、名称展示、重命名、工程切换或隔离时，保留足以区分工程的名称或 A/B 标记。

<!-- ERYE199-EXTRA-COVERAGE-20261118 -->
2026-11-18最新：按用户要求追加ERYE199-117～148共32条，完整定义在[主文档第十六章](docs/cases/requirements/ERYE-199/cases.md#erye199-editor-existing-feature-gaps)。现行142条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 80 Not Run。原110条定义及结果保持，新增32条PLAN、未执行；无新增脚本/浏览器执行/生成/导出/云效写入。用户确认：V/B删除、复制、剪切粘贴也双向联动；同类型占用位置新建同类型轨、不覆盖，首尾相接另验；其他轨不自动加入关联。旧010覆盖预期及失败保留历史，不能代跑当前138～141，执行旧010前需单独修订脚本。统一入口只写定义/导航，不写执行结果；以下110条/48NR统计为追加前历史。
<!-- /ERYE199-EXTRA-COVERAGE-20261118 -->


<!-- ERYE199-MULTITRACK-MERGE-20261118 -->
2026-11-18最新：用户明确要求将多轨用例补充到ERYE-199，已将原ECMT-001～048正式续编为ERYE199-069～116，完整定义并入[主文档第十五章](docs/cases/requirements/ERYE-199/cases.md#erye199-card-multitrack)。当前110条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 48 Not Run。新增48条PLAN、未执行，原62条结果/证据/缺陷关联保持。旧ECMT目录只作跳转、不重复登记和计数；本次无浏览器用例执行、生成/导出或云效写入。视频/BGM双向联动，其他轨保持的最新确认规则不变。以下“48条独立专项、正式仍62条”为归并前历史。
<!-- /ERYE199-MULTITRACK-MERGE-20261118 -->

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正说明](docs/cases/requirements/ERYE-199/revision-008-registration-scope-20261118.md)。后续008只按v2执行，不恢复登记撤销断言；统一入口不写执行结果。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

<!-- CASE-ENTRY-NO-EXECUTION-RESULTS-20261117 -->
用户2026-11-17明确：docs/cases/README.md只维护用例定义、前置/步骤/预期、自动化登记、命令和报告导航；不得写执行结果、通过/失败统计、执行流水或云效缺陷同步明细，包括各用例的实际结果列。执行结果写docs/testing-progress.md、docs/verification.md及各专项执行/缺陷报告。入口旧记录已移至docs/cases/history/unified-entry-execution-notes-20261117.md。归档脚本不得向统一入口回填执行结果；ICP电商25轮原文正文仍在统一入口。
<!-- /CASE-ENTRY-NO-EXECUTION-RESULTS-20261117 -->

<!-- ICP-EC-CANONICAL-ENTRY-20261117 -->
用户2026-11-17要求：ICP-EC-01～05的完整用例正文统一放在docs/cases/README.md#icp-ecommerce-cases，含25轮原文提示词、前置和预期；后续修改该正文，不在原cases.md重复维护。docs/design-cases/icp-workflows/cases.md仅为兼容跳转，cases.json仍是自动化定义；执行结果、原图及缺陷回执保留原专项目录。此要求仅调整本批电商正文位置，其他分类结构保持。
<!-- /ICP-EC-CANONICAL-ENTRY-20261117 -->

<!-- ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->
ERYE199-014 → [FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60)；ERYE199-056 → [FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949)。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。 [同步明细](docs/cases/requirements/ERYE-199/defects-unimplemented-014-056-production-20261116.md)。
<!-- /ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->


<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](docs/cases/requirements/ERYE-199/retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->


<!-- ERYE210-014-V2-20261116 -->
ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。 [014本轮报告](docs/cases/requirements/ERYE-210/results-014-v2-production-20261116.md)。原“014保留阻塞”由本次明确替换授权更新，原权限覆盖仍待环境。
<!-- /ERYE210-014-V2-20261116 -->


<!-- ERYE199-017053-V2-YUNXIAO-20261116 -->
ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。 [同步明细](docs/cases/requirements/ERYE-199/defects-017-053-v2-production-20261116.md)。本批已完成，后续只核对检查点，不重新新建。
<!-- /ERYE199-017053-V2-YUNXIAO-20261116 -->


<!-- ERYE210-018020-YUNXIAO-20261116 -->
ERYE210-018 → [FWXC-588](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6b9e807ea6785e241aae941423)；ERYE210-020 → [FWXC-589](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0dd1f5d0d3ba1d48a798f75a03)。6张本轮原图已上传并嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。018高/2-严重，020中/3-一般。两例仍Failed，当前56条49P/6F/1B；旧FWXC-506/507及其他54条结果保持。本次仅同步既有失败，未重跑产品。 同步key已有检查点和回读回执，后续只读核对，不重放新建。archive-erye210-restored-five.py已保留cloudDefect关联。说明docs/cases/requirements/ERYE-210/defects-018-020-restored-production-20261116.md。
<!-- /ERYE210-018020-YUNXIAO-20261116 -->


<!-- ERYE199-NINE-V2-EXEC-20261116 -->
ERYE-199九条v2生产实跑：6 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。当前有效63条：**31 Passed / 8 Failed / 2 Blocked / 22 Not Applicable / 0 Not Run**。017裁A连带B及其原声从5秒前移3秒，空隙闭合，刷新保持错误；053空SRT静默写入持久空轨，非法时码拒绝和原字幕合法编辑恢复通过，整例Failed；051生产下拉无工程管理/导入媒体新建工程，目标导入未执行而Blocked。每例新项目/会话/工程，共9组，5个Agent请求各一次、无补槽表单/受理重发。8条新版接入cases-current-v2.mjs且默认覆盖旧探测，045仍按021～050人工例外PLAN。所有截图和混音证据留本地；原高级目标/22NA/旧6失败/012阻塞保持，云效未写入。原017/020功能未实现缺陷只属旧高级目标，不代表本轮017失败已提云效；新017/053待同步。

[九条逐例结果及原图](docs/cases/requirements/ERYE-199/results-nine-v2-production-20261116.md) · [当前进度](docs/cases/requirements/ERYE-199/execution-status-current.md)。下方旧批次统计仅历史。
<!-- /ERYE199-NINE-V2-EXEC-20261116 -->

<!-- ERYE210-RESTORED5-20261116 -->
当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。 最后5条唯一注册erye210-restored-five.spec.ts，旧实现继续排除。原生译制准备run_v2_62f81e3a8dd542b18f65b77e2dfbc757已终态积分不足；用户已调积分，补跑用新的原生翻译配音项目/任务，不能重发任何已有任务。报告docs/cases/requirements/ERYE-210/results-restored-final-five-production-20261116.md。
<!-- /ERYE210-RESTORED5-20261116 -->


<!-- ERYE210-007015-YUNXIAO-20261116 -->
ERYE210-007 → [FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12)；ERYE210-015 → [FWXC-586](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d5da04deb674cf55972715cfb1)。6张本轮原图已上传/嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。007中/3-一般，015低/4-轻微。两例仍Failed，当前51条46P/4F/1B；原FWXC-488/493及其余关联保持。本次仅同步既有失败，未重跑产品。 同步key已有检查点和回读回执，接管时只读核对，不重放新建。archive-erye210-restored-eight.py已保留cloudDefect关联。说明docs/cases/requirements/ERYE-210/defects-007-015-restored-production-20261116.md。
<!-- /ERYE210-007015-YUNXIAO-20261116 -->


<!-- ERYE199-NA31-REVISION-20261116 -->
ERYE-199当前有效63条：**25 Passed / 6 Failed / 1 Blocked / 22 Not Applicable / 9 Not Run**。原31不适用已逐条复核：011/013/017/020/045/051/052/053/055改当前功能v2、Not Run；另22条保留明确原因和恢复前置/步骤/预期，063属于旧设计目标。仅改定义，未执行浏览器/Agent、未新截图或云效写入；旧25P/6F/1B保持，原高级目标、历史结果、缺陷关联保留。9条新版PLAN且旧脚本门禁，045继续暂不接自动化；不能用旧能力探测或历史日志替代新定义执行。Composer附件接受JSON不构成工程解析支持证据，051只验实际媒体新建工程入口、执行时先核实生产可用。以下历史31NA/0NR由本块取代。

[逐条定义与范围](docs/cases/requirements/ERYE-199/revision-na31-current-capabilities-20261116.md) · [当前进度](docs/cases/requirements/ERYE-199/execution-status-current.md)。
<!-- /ERYE199-NA31-REVISION-20261116 -->


<!-- ERYE210-RESTORED8-20261116 -->
当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。 用户2026-11-16授权恢复六个原ID并新增055/056；新8条唯一注册erye210-restored-eight.spec.ts，旧实现由isSupersededLegacy210排除。后续按当前51条统计；旧退役11条是历史。勿重放056原导出；新结果仅本地，既有云效记录未改。报告docs/cases/requirements/ERYE-210/results-restored-eight-production-20261116.md。
<!-- /ERYE210-RESTORED8-20261116 -->


<!-- ERYE210-046048-V3-20261116 -->
2026-11-16最新范围：当前43条：**40 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run**。046/048 v3生产Chrome实跑2 Passed；014保持原Blocked，047/FWXC-579与049/FWXC-580保持Failed和云效关联。旧二次分析、配音稿修改/单句再生成仍延期，其他41条未重跑。 046/048唯一入口仍current-five.spec.ts，实际执行函数为erye210-current-two.ts；旧current-five.ts内046/048函数仅历史，不再注册。047仍必须独立真实翻译配音并保留完整配音绑定；048新版仅对已有译制音轨/字幕操作，允许在新独立工程引用真实译制原始工程及其声音，不进入故障Voiceover面板。二次分析及配音再生成未修复。旧五例归档器遇v3会停止，避免覆盖新结果。报告docs/cases/requirements/ERYE-210/results-046-048-v3-production-20261116.md。
<!-- /ERYE210-046048-V3-20261116 -->


本文件供 Codex 在本工程中工作时使用。命令全部在工程根目录 `C:\Users\chen\Documents\ChatGPT\cinlink` 执行。

## 任务开始时读取上下文

- 用户2026-11-25确认工程创建规则：视频和图片均须执行处理任务并返回产物后才会创建工程。上传、登记素材、打开素材预览或空编辑器不算创建工程；执行编辑器用例前先完成相关处理，确认产物对应工程已保存且可编辑，再登记测试基线。项目/会话创建与媒体工程创建分开记录。

- 用户2026-11-25要求：后续新增及优化用例，默认遵循 `docs/cases/authoring-guide.md` 和 `docs/cases/_template.md`。采用简短标题、必要且明确的前置、含完整提示词及参数的编号步骤、可观察的预期；沿用原九列，标题写在操作步骤首行。简单用例可写3～4步，复杂场景保留全部轮次、参数组、对照及恢复检查，不以精简降低验收范围。保留编号、优先级、来源、自动化/脚本映射、原执行状态及证据；执行记录只放独立文档。正文不反复附加面向执行人员的版本名称，设计修订需追溯时在配套修订记录维护。

- 用户明确要求：`docs/cases/README.md`（CinLink 测试用例统一入口）仅保留分类、正文、脚本、命令和稳定说明的导航；严禁添加或恢复日期流水、缺陷回归条目、通过/失败/阻塞摘要、云效状态、任务断点、执行统计和监控播报，正文及表格中都不放。每项执行结果继续及时更新到独立状态文档、执行报告与进度文档，不写用例正文。此规则同样适用于人工、CUA、脚本和定时监控，覆盖旧的向统一入口同步结果或保留最新指针约定。

- 用户2026-11-24最新要求：执行报告不要写到用例里。用例正文只维护设计（编号、优先级、前置、步骤、提示词、预期、来源、自动化实现/脚本和设计版本）；不写执行结果、报告链接、日期流水、云效状态、批次统计或任务断点。每例结束将实际结果、证据、执行版本及自动化状态更新到独立执行报告、状态表/JSON和进度文档。此规则覆盖旧“向具体用例正文同步执行结果”的约定；原正文已有记录移到独立历史归档，不能丢失。

- 用户2026-11-24要求LF用例沿用原九列表格格式：前置条件、操作步骤、预期结果分别填写；操作步骤统一按“1.、2.、3.”编号并以<br>分行，保留完整提示词和参数组，不使用未编号的紧凑长句替代步骤。执行记录仍只写独立文档。

- 用户2026-11-24明确项目创建/分析规则：无素材时不允许启动分析；项目创建不以已完成分析为前提。有素材但未分析与真正0素材是不同状态，不能用“已分析0个”推断项目无素材；也不据此推定无素材项目必须允许创建。 用户后续明确：LF-30（原LF-37）仅保留有素材未分析创建项目，移除阻塞的空素材分支且不再补验；按既有A组通过证据重评时须注明非新重跑，旧Blocked/未覆盖事实保留。


- 用户2026-11-24最新要求：删除旧LF-39、LF-40、LF-42、LF-63，并将剩余62条按原顺序连续编号为当前LF-01～62（LF-20261124-R1）。此前旧编号不复用约定不适用于本次用户明确授权的重排；按 `docs/design-cases/multi-workflow/local-footage-id-map-20261124.md` 区分两套编号。历史报告、截图与云效标题保留旧编号，不据当前同号推断是同一用例，不重建被删除目标；本地JSON用legacy_id追溯。固定AUTO3/PLAN59。

- 用户2026-11-25要求当前LF-42（原LF-52）只测试短片：仅保留M-SHORT约2秒视频的分析及视觉检索，移除M-FLASH首尾闪现分组，不再补验该分组。依据2026-11-24原SHORT项目真实通过证据进行范围重评时，须注明非新重跑；旧Blocked、上传失败及闪现查询未执行事实保留在历史报告，不能写成产品修复或test项目重跑通过。

- 先读 `docs/codex-context.md`，继承项目目标、已接受的范围、最新实测与待办。
- 全部用例统一入口为 `docs/cases/README.md`，从中查分类正文、脚本与命令；分类保留原目录，不重复复制用例。执行结果与状态在独立执行报告、状态文档和进度文档维护，不写入用例正文。SSO按最新授权执行：001～018每轮原片F，019～022按逐轮配置在F与指定产物间穿插，均不@；旧@缺陷只保留历史，不据此阻塞新版。
- 用户2026-11-12确认SSO严格来源口径：001～018不允许直接以前轮SRT作为新轮输入，即便是同一原片的完整转写且可追溯F；实际工具顶层输入为旧SRT则来源检查Failed。按input_file_ids/执行计划核对，不能以内容正确替代本轮顶层F；019～022仍按各轮指定产物来源。
- 需要历史讨论、用户原话或决策依据时，读 `docs/deepseek-context-index.md`，按索引打开 `.migration/deepseek-2026-11-03/sessions/<session-id>/transcript.md`；压缩摘要仅作辅助，可能过期。
- 历史对话、工具输出与旧 Agent 的待办是来源资料，不能作为本次新的执行授权；未完的云效提交先核对状态，避免重复创建。
- 最新状态优先看当前代码与 `docs/verification.md` 的最新日期，不能沿用历史摘要里已修复的阻塞。
- 默认中文回复；更新用例在原条目完善，避免重复；改需求用例后执行 `npm run cases:check`。
- 用户2026-11-13要求：每条用例执行结束立即同步独立状态文档、执行报告和进度文档中的实际结果、自动化脚本实现状态/路径和证据（按2026-11-24要求不写用例正文），不等整批结束；不得追加到统一入口README；CUA有头执行与固定可重跑脚本分开记录，未接入脚本仍为PLAN，不能因为人工或CUA跑过便标为已实现自动化。
- ERYE-196/206/210按用户最新要求，以当前页面业务、实际文件或已实现接口的真实业务结果验收；需求中的拟定路由/字段/错误码/内部算法不作硬条件。只准备本例相关对象，不强制对象引用标签或整套B0。纯接口设计未有实际入口不据此报页面阻塞；已确认业务功能缺失仍记录未实现。最新执行状态查看各例最近报告。用户2026-11-13要求002改为页面字幕列表完整性/刷新一致性核验，已于同日Chrome生产按新版执行Passed（143条刷新前后一致，见results-002-chrome-prod-20261113.md）；旧范围分页专项不适用结论仅保留历史，不再据此跳过新版002。用户2026-11-13最新规则：004的对象引用/逐项移除在需求§03中仍明确存在，应用未实现则Failed，覆盖旧设计稿排除；依据既有实测重新判定须注明非新重跑；未重跑不判通过；详见 `docs/cases/editor-business-acceptance.md`。

- 用户2026-11-13要求：实际执行的用例同步接入仓库自动化脚本；本次明确含ERYE210-001～049。登记固定编号、脚本和运行命令，区分自动化接入、真实执行状态及未覆盖分支；不能以历史日志回放或脚本存在代替实跑通过。用例替换后保留旧结果，新定义未执行标Not Run。
- 用户2026-11-13最新明确优化ERYE199-015：点击时间轨前方图标可隐藏，只验证已实现的隐藏/显示、原声静音/启用及刷新恢复，移除当前015的solo/导出隔离步骤。015 v2已在新工程实跑Passed，旧版完整范围Blocked/Not Applicable保留历史，不将旧版solo记通过。当前tools/editor/erye199/release-scope.mjs排除011/013/014及用户确认功能未实现先跳过的016/017/018/020，功能实现后再测；012及015 v2继续适用。019已按用户要求优化为v2，仅验已实现静态位置/等比缩放/旋转/不透明度及刷新、素材隔离，新工程实跑Passed；不再探测锚点/非等比/翻转/四边裁剪/混合模式，旧Blocked保留历史。020按用户确认本轮不适用并在运行器跳过；016/017/018/020已分别同步功能未实现缺陷FWXC-509/510/511/512。017/018只具备016前置依赖截图，后续目标步骤未执行。006未被扩大排除，不删除旧证据，不将延期记通过。
- ERYE-196/206/210按用户最新要求，以当前页面业务、实际文件或已实现接口的真实业务结果验收；需求中的拟定路由/字段/错误码/内部算法不作硬条件。只准备本例相关对象，不强制对象引用标签或整套B0。纯接口设计未有实际入口不据此报页面阻塞；已确认业务功能缺失仍记录未实现。001/003既有Passed、002/004本轮不适用保留，005撤销旧引用前置Blocked改Not Run，未重跑不判通过；详见 `docs/cases/editor-business-acceptance.md`。
- `docs/cases/requirements/` 仅放正式需求用例；工作流专项用例放在 `docs/design-cases/multi-workflow/`。普通执行用例写清前置操作、完整参数、步骤和可验证预期，尽量不依赖补槽；专门测试澄清的用例单独注明。
- 用户2026-11-13纠正图像编辑语义：红线只是供AI参考的标记，提交图片修改后重新生成是正常流程；成品无需保留参考红线，不因生成或标记消失本身判失败。纯工具默认设置须与携标记提交图片修改分开验证；011原失败撤销后已按无引用纯设置入口重跑Passed：8/16实测，通过撤销至空并返回隔离引用、设置16后重做恢复原8标记核验样式保持；不把设置和图片修改混测。源图固有内容及明确要求写入成品的文字另按原指令验收。
- 用户2026-11-13纠正ERYE237-012入口：继续/放弃出现在编辑中点击“返回图片工具”后的对话框；按该真实入口验收继续保留、明确放弃清理后可切其他工程。不要因工程列表直接导航未重复弹出退出确认误报该流程失败。012按此入口已真实重跑Passed，旧Failed撤销；纯界面修正不冒称产品修复。
- 用户最新要求：执行时遇补槽要填写并继续跑通流程，记录问题、填写值和截图；只有明确要求“无补槽严格探测”的任务才在澄清处停止。尽量写全提示词不等于运行时拒绝填写补槽。
- 用户2026-11-12最新回归规则（以后默认执行，含当前批次）：先读 `docs/regression-policy.md`。首次严格复刻原步骤/截图入口、参数和原提示词；每个问题另外设计并执行2条相关扩散。原回归/扩散分别判定，步骤、提示词、证据与结果通过官方OpenAPI写对应缺陷评论，通过明确写“执行通过”。扩散失败先记录，本批结束统一查重，已有项关联、无相同项才新建；优先于旧“不去重／不写评论／不新建”约束。历史未执行的扩散不补算通过。
- 用户2026-11-24最新确认：当前LF-29～62（原LF-36～73保留项）只执行各用例正文，不额外设计、生成或执行扩散用例；本范围优先于通用“两条扩散”规则。正文原有步骤、参数组、多轮及必要前置/恢复检查仍按原要求执行。已执行的扩散结果和证据仅作历史额外测试保留，不计入本组必执行项，不影响原用例独立判定；不因取消后续扩散改写已观察事实。
- MW-01/02均按用户纠正，一条完整提示词一次发送。MW-01在同一请求内先生成中文字幕SRT、再基于该SRT翻译英文SRT；MW-02在同一请求内生成中文字幕SRT并增强原片2倍。运行中只有停止按钮是正常交互，不测试人工重叠发送、不据此报缺陷。旧MW-01两轮续接结果不能代替当前单次字幕链。
- `docs/cases/requirements/` 只放正式需求用例；多工作流用例放 `docs/design-cases/multi-workflow/`，不要混入需求目录或需求登记表。
- `.migration/`、`.auth/`、本地 env、原始报告与 `.tmp-*` 只留本机，不提交；原始对话可能含凭据或带签名链接。

- 用户2026-11-13本轮明确：ERYE199-021～050暂不接入自动化脚本；随后删除040/050，原条目保留于退役记录、编号不复用，本轮执行剩余28条；以Ego Lite有头页面操作执行并归档结果/截图，自动化仍PLAN，不新增测试入口或运行器编号范围。此授权覆盖本批旧“执行即接脚本”惯例。

- 用户2026-11-13确认049 v2：当前无独立失败重试；会话运行中再次点击发送为停止。用例通过会话发起导出，停止后重新发送属于新任务，完成后才测独立重复提交；需实测停止是否也覆盖渲染子任务，不等同于右上原生导出。049 v2已在新工程实跑Passed，覆盖排队停止及其后两次完整工程新提交，渲染开始后停止未测；定稿按已有工程设置导出完整工程，不要求区间/参数覆盖。原Blocked历史保留；本批仍不接自动化。

- 用户2026-11-13确认退役ERYE210-002/004/005/007/010/013/015/018/020/040/041，保留已通过的021、025～027、029～035 v2原编号。当前有效43条，不复用退役编号；旧失败/截图/云效保持，退役不等于修复。`tools/editor/erye210-retired.ts`在测试注册前排除原11条，默认38个有效脚本入口。详见`docs/cases/requirements/ERYE-210/retired-failed-cases-20261113.md`。

- 用户2026-11-13要求按现有功能优化原24条不适用：028/029/034/042/047/048改v2 Not Run，分别为全局字幕、混合文字、支持范围变速、片段音量、现有对象预览导出及全屏预览；原高级目标另列延期，不把局部历史判整例通过；另18条核心能力/依赖缺失保留Not Applicable及恢复条件。六条仅改定义未执行，本批仍PLAN不接自动化；030/FWXC-517与049 v2 Passed保留。原因及版本见 `docs/cases/requirements/ERYE-199/revision-na-current-capabilities-20261113.md`。

- 用户2026-11-13指定ERYE210-011使用新建项目ad25bc25-b1c6-4105-84b8-1b845b4a4eb5测试。已沿其原run_v2_4f9b4423fb4346f3bd9048d22794268e完成复验，不重发；PA为bf48d731-93a2-4b50-8cb9-f5d46c4a2609（7MB.mp4，60秒原片），中文配音文案/字幕/生成音频真实可见，PB不被抢占及串改分支通过。结果卡仅播放/下载/放大，直达配音定位分支未覆盖，整例仍Blocked；手动选PA不计快捷定位通过。011唯一注册在erye210-fields.spec.ts，脚本支持原检查点续验，不能因查看时任务已完成而重新发送；当前43条统计保持。详见docs/cases/requirements/ERYE-210/results-011-user-project-prod-20261113.md。

- 用户2026-11-13最新确认优化ERYE210-011/017/019、补齐016/050～054并执行，已完成9条8P/1F（051），当前43条36P/1F/6B/0NA/0NR。默认43个有效脚本入口（37 AUTO、6 BLOCKED门禁），无PLAN；011/017/019/050～054唯一注册在erye210-completion.spec.ts，016仍navigation。051明确唯一背景音轨降6dB时Agent缺对象标识而未执行，音量100%，仅本地缺陷、未云效写入。017/052/054原任务/场景续验通过，052原导出BEFORE052与后续编辑分离已按真实帧和哈希审核，禁止重新生成/导出原已完成任务。旧快捷定位、远端执行失败重试、受限混合拒绝及mac等目标继续单列延期，不因优化通过视作覆盖。正文此前38入口及011 Blocked是本轮优化前历史；最新见docs/cases/requirements/ERYE-210/results-completion-nine-prod-20261113.md及execution-status-current.md。

- 用户2026-11-16重新执行ERYE210-051已完成Passed：生产有头Chrome、独立新工程，Agent约54秒实际降低背景音量6dB，音量线50%、刷新保持，版本1→2；未手动拖动代执行。原视频/原声/字幕保持，Captions未被抢占。当前43条37P/0F/6B/0NA/0NR，其他用例未重跑；原051失败和截图保留历史，本地缺陷补复测通过，未云效写入。原run_v2_3d7ebc6967124d3a805ce1f87892f0ed已完成，不重复提交；最新见docs/cases/requirements/ERYE-210/results-051-rerun-prod-20261116.md及execution-status-current.md。

- 用户2026-11-16明确删除ERYE199-058：已从用例、registry和脚本函数表移除；不再执行，不将旧Blocked作为当前待办，编号不复用。051～068当前15条，运行器及直接调用执行器均排除058/060/061；全量63条18P/7F/1B/31NA/6NR，仅006 Blocked，068 v2 Passed及其他结果保持。见 `docs/cases/requirements/ERYE-199/retired-case-058-20261116.md`。

- 用户2026-11-16最新要求替换并执行ERYE210-045～049，014保留原Blocked。当前5条1P/2F/2B：045通过，047真实翻译配音工程混音50%保存后单句再生成报页面协议错误，049OFF原生导出报错且无页面交付；046工具拒绝对保留三段重新分析、未提交二次分析，048真实独立翻译工程已有完成结果但配音页无法恢复。当前43条38P/2F/3B/0NA/0NR，默认43入口（42 AUTO、014唯一BLOCKED登记项）。新5条唯一注册erye210-current-five.spec.ts；047/048必须先用页面翻译配音入口完成独立真实工程，测试开始只读取既有配音，不额外点击创建/生成，不用普通字幕或跨会话复制替代。早期准备错误单列，原迁移目标延期。047原单句任务、049原导出均已尝试，不为恢复结果重发；最新报告docs/cases/requirements/ERYE-210/results-045-049-current-functions-prod-20261116.md。原051及11-13统计为历史，本轮未云效写入或Git推送。

- 用户2026-11-16已授权并完成ERYE210-047/049云效同步：047→FWXC-579、049→FWXC-580，官方OpenAPI新建，5原图上传/嵌入、11附件及正文/字段回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，高/2-严重。两例仍Failed，43条38P/2F/3B；014/046/048不变。仅既有失败同步、没有重跑。再次接管只读核对原key/云效记录，不能重放新建；详见docs/cases/requirements/ERYE-210/defects-047-049-production-20261116.md。归档脚本已保留cloudDefect关联，不能再把最新状态写回“未提交云效”。

- 用户2026-11-16确认ERYE196-016按当前编辑器默认裁剪边界验收，不再以未公布最短长度m为阻塞条件；实际默认边界待执行时核实，不从逐帧播放步长直接推定m。新修订与旧Blocked历史分开记录，未重跑不计通过。

- 用户2026-11-16确认ERYE196-028的“每条字幕字符数”为拖拽后控制字幕分组/换行的排版设置，用户最新确认滑块范围为6～100（含端点），60为合法中间值，不代表文本输入上限；验证6/60/100及两端继续拖拽的防护。本条按实际滑杆值与换行效果验收，核对文字完整及讲话对应，不再要求先公布最大长度L；显示组数可随排版改变，新修订未执行不计通过。

## 一句话

```powershell
npm run verify        # 类型检查 + 123 条离线用例，不联网、不产生副作用
```

`verify` 退出码为 0 即视为框架可用。按用户最新要求，不在每次单条预发执行前重复跑整套离线校验；代码变动按影响选择类型检查或定向回归，已有校验仍有效时直接执行目标用例。

## 环境前提

| 依赖 | 要求 | 检查 |
|---|---|---|
| Node.js | >= 20 | `node -v` |
| 依赖 | 已 `npm ci` 安装 | `npx playwright --version` |
| 系统 Chrome | 预发用例用 `channel: chrome` | `Get-Command chrome` 或产品可正常打开 |
| ffmpeg / ffprobe | 仅媒体断言器单测需要，需在 PATH | `ffprobe -version` |

缺少 Chrome 或 ffmpeg 时，离线用例会给出明确失败信息；不要把它们当成断言逻辑错误。

## 命令地图

| 命令 | 作用 | 是否联网 / 有副作用 |
|---|---|---|
| `npm run verify` | `tsc --noEmit` + 离线 123 条用例 | 否 |
| `npm test` | 仅离线用例（unit + gates） | 否 |
| `npm run typecheck` | 仅类型检查 | 否 |
| `npm run doctor` | 打印靶场地址与凭据就绪情况 | 否 |
| `npm run test:g1` | 预发：上传、分片、@ 引用、S3 下载 | **会**上传并删除真实素材 |
| `npm run test:g2` | 预发：提交受理、Run 回读、取消 | **会**真实提交并可能消耗积分 |
| `npm run test:g3` | 预发：subtitle 真实任务 → G3–G7（状态/收敛/产物/SRT/视频/账本） | **会**真实上传并计费（实测约 24 分） |
| `npm run test:watermark` | 预发：image-watermark 真实任务（视频 + 水印图）→ G3–G7 | **会**真实上传；本次实测余额未变 |
| `npm run test:flows` | 预发：translation / clean-cut / enhance / text-watermark / long-to-short / mix（6 条全部启用） | **会**真实上传并计费（实测 translation -20、long-to-short -55） |
| `npm run test:cards` | 预发：卡片入口 7 条（AI 生图 / AI 生视频 / 总结视频 / 生成解说 / 长视频变短 / 本地素材查找；含 Find Local Footage 冒烟；生成解说与本地素材查找 fixme） | **会**真实生成并计费 |
| `npm run test:sso` | 同会话SSO-001～022；001～018每轮F，019～022穿插F/指定产物 | **会**真实上传/生成并可能计费，有头、串行、零重试 |
| `npm run test:sso:mixed` | 仅SSO-019～022，4例各5轮；来源配置见 `tests/sso/cases/source-artifact.ts`，结果从统一入口查询 | 同上；依赖缺失轮记阻塞、不替换来源、不重发已受理任务 |
| `npm run test:footage` | 本地素材查找P0 LF-01～03，独立配置、有头、单worker零重试；LF-04～17未接脚本。原生目录首次需选择，支持本轮源项目/原run回读；见 `tools/local-footage/README.md` | **会**真实导入/分析/检索；可能计费，回读模式不重提任务 |
| `npm run test:multi` | 预发：多工作流 **20 条**（15 启用 + 5 fixme；含 MW-23~26） | **会**真实执行多次任务 |
| `npm run test:multi:base` | 预发：多工作流基础 5 条（MW-01~05） | **会**真实执行多次任务 |
| `npm run test:multi:compound` | 预发：一句话多工作流 15 条（MW-06~14/18/21/23~26，11 启用 + 4 fixme；MW-18/24/25/26 默认执行） | **会**真实执行多次任务 |
| `npm run test:multi:materials` | 独立按需多素材专项：MW-15/16/17/19/20/22；按用户要求填写补槽继续，不并入默认 staging；MW-22 缺定向故障注入时记前置阻塞 | **会**真实执行多次任务 |
| `npm run test:chains` | 预发：跨工作流链路（CHAIN-01 启用，其余 fixme） | **会**真实执行多次任务 |
| `npm run test:annotation` | 视频批注 P0：27 条规则层 + 12 条编辑器 UI | 本地：需 feature 分支 worktree 与 4210 dev server |
| `npm run test:staging` | 全部预发用例（46 条；部分待确认项默认 fixme） | 同上（含计费） |
| `npm run test:smoke` | 预发冒烟 3 条：字幕、clean-cut、AI 生图（标签 @smoke） | **会**真实上传/生成并计费 |
| `npm run test:regression` | 预发回归 46 条：G1/G2 + 工作流 + 卡片 + 多工作流（标签 @regression） | 同上 |
| `npm run test:full` | 预发全量（当前 46 条，等同于 test:staging） | 同上 |
| `npm run auth` | 打开有头浏览器人工登录 | 需要人工介入 |

`npm run doctor` 的 `ready` 只看 `.auth/storage-state.json` 是否存在，**不代表会话未过期**；会话是否有效以实际打开工作台为准。

### 有头运行

需要盯着真实浏览器时，用配置支持的环境变量：

```powershell
$env:CINLINK_HEADLESS='0'; npm run test:watermark
```

`playwright.config.ts` 里是 `headless: process.env.CINLINK_HEADLESS !== "0"`，所以 `0` 即有头；`auth` 项目本身固定有头。有头模式需要交互式桌面会话，不要在没有桌面的 CI/服务里用；`test:staging` 同样适用。

失败调试：`$env:CINLINK_HEADLESS='0'` 单条重放 → 必要时 `--debug` 进 Inspector → `npx playwright show-trace <trace.zip>` 看 DOM/网络快照。详见 `docs/deepseek-usage.md` 的“失败调试流程”。

## 运行约束（不要违反）

- 用户2026-11-16要求：用例遇到阻塞时拆分为多步骤操作，先做单项准备、保存回读和可独立执行的分支，保留检查点，仅阻塞有依赖的步骤，不反复创建项目或重发已受理任务。涉及关联随动、同组拒绝/回滚、一次撤销的正式验收仍保留原目标，不能通过拆成独立修改降低标准。016/021/022/041的分步计划见`docs/cases/requirements/ERYE-196/blocked-step-plan-016-021-022-041-20261116.md`。

- 用户2026-11-13最新指示：当前暂停001～010脚本接入，优先在Chrome浏览器执行ERYE196-006～010。已有tools/erye196/草稿保留，不继续集成，不将未覆盖步骤标为自动化通过；实际执行结果与脚本草稿状态分别更新。

- 用户2026-11-09最新补充：IMG-TB-UI系列在一个会话执行，不再每例新建会话；每例复位到已登记源版并隔离草稿/引用、保留结果历史。该要求仅覆盖本工具栏专项的旧独立会话安排。

- 用户2026-11-09最新纠正：同一轮测试可在一个专用测试项目中新建多个独立会话，不必每例新建项目；各例仍须准备并核实独立图片工程/源版本，不能串用上一例编辑结果。

- **串行、零重试**：`workers: 1`、`retries: 0` 写在 `playwright.config.ts`，不要为了"跑绿"调大。
- **不要并发跑预发用例**：`local.env` 里的会话会被 fixture 轮转回写，同一份会话同一时间只允许一个工程使用。
- **不要在没有专用测试账号时跑 `test:g1` / `test:g2` / `test:g3` / `test:watermark`**：会产生真实数据、积分消耗和真实 AI 任务。
- **不要修改 `src/` 里的判定阈值去迁就失败**：失败信息本身就是交付物。
- 预发首屏 SPA 门禁约 8 秒才进入工作台，等待不足会被误判为会话失效；判定逻辑已封装在 `src/staging.ts`。
- 页面加载时 `POST /platform-api/v1/auth/refresh` 返回 401 是预期 fallback，不要把它当失败信号。

## 结果怎么读

- 控制台：Playwright `list` reporter，末行 `N passed / N skipped / N failed`。
- HTML 报告：`reports/html/index.html`（离线）、`reports/junit.xml`（JUnit）。
- 失败证据：`test-results/`（截图、trace），G1/G2 的结构化快照以附件形式写入。
- 退出码：`0` 通过；`1` 有用例失败；其他非零通常是配置/环境错误。
- 判断"框架可用"的最低标准：`npm run verify` 退出码 0，且 stderr 无 `ENOENT`（缺 ffmpeg/Chrome）。

## 目录速查

```
src/
  config.ts            靶场地址、凭据、storageState 读取
  env.ts               local.env / .env.local 加载
  assets.ts            素材登记表（路径、字节数、MIME）
  staging.ts           工作台就绪判定与失败归因
  workspace.ts         上传 / @ 引用 / 提交 / 取消 / 余额 / health 等操作封装
  assertions/          upload、job、media、srt、artifact 断言器
  fixtures/            staging-session（会话回写）、media-factory（合成素材）
  levels/gates.ts      G1–G7 关卡判定（纯函数）
tests/
  unit/                断言器单测
  gates/               关卡演练（mock 观测快照）
  staging/             G1/G2 + 工作流（subtitle、image-watermark、workflows 表驱动、cards 卡片入口）
tools/                 auth 登录、doctor 配置诊断
```

## 常见失败归因

| 现象 | 含义 | 处理 |
|---|---|---|
| `工作台未在 ... ms 内就绪` + 登录页文本 | 会话失效 | `npm run auth` 重新登录 |
| 卡在「正在检查登录状态」 | 会话过期或首屏过慢 | 先确认会话，再重试；不要改超时掩盖 |
| HTTP 401 | 会话被其他工程用掉或已过期 | 重新登录，检查是否有第二个工程在用同一会话 |
| `素材不存在：...` | `CINLINK_MEDIA_ROOT` 没配或文件被移走 | 改 `local.env` 指向真实素材目录 |
| `ENOENT ffprobe` | PATH 缺 ffmpeg | 安装/加入 PATH，或设 `CINLINK_FFPROBE` |

## 缺陷同步

- 用户2026-11-13再次明确：原缺陷实际回归不通过（Failed）时，通过官方OpenAPI设“❌AI未通过”并回读；通过设“✅AI通过”，阻塞/待人工确认/未覆盖保持当前状态。每项结束立即把结论、证据和状态同步结果写入独立执行/状态文档，适用于定时回归；优先于旧“失败保持已修复”规则。详见`docs/regression-policy.md`状态表。

- 用户2026-11-13要求：原问题执行通过而出现独立新业务偏差时，原缺陷设✅AI通过，新偏差查重后另提，评论关联编号；同一原验收点仍失败则保留❌AI未通过，不能只因错误文案或数值变化判修复。见`docs/regression-policy.md`最新分开判定规则。

- 用户2026-11-11要求：缺陷修复且AI实际回归通过后，将对应云效缺陷状态设为“✅AI通过”，使用官方OpenAPI并回读验证；已处于该状态时不重复写入。未通过或未覆盖的缺陷不批量改为通过，保留报告中的验证范围。

- 用户于2026-11-06明确：后续云效同步仅使用官方OpenAPI，不打开云效页面操作；使用用户在本机配置的个人访问令牌。未配置、权限不足或接口失败时报告具体阻塞，不自动退回浏览器。
- 云效凭据从环境变量/已gitignore的`local.env`读取：`ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN`、`ALIBABA_CLOUD_YUNXIAO_API_BASE_URL`、`ALIBABA_CLOUD_YUNXIAO_ORGANIZATION_ID`，项目使用`YUNXIAO_PROJECT_ID`。不得输出令牌、写入报告/代码或通过命令行参数传明文令牌。
- 当前Mac同步入口为`tools/yunxiao/run.sh`，详见`tools/yunxiao/README.md`。已导入用户提供的同步工具并适配Mac凭据/curl；check/sync优先使用已忽略的`tools/yunxiao/config.local.json`，目标组织/项目/字段由该配置提供。2026-11-06已新建本机专用PAT并完成只读API验证，2027-02-04到期；Windows保留原DPAPI支持。运行前按本次实际环境核对标签/迭代/严重程度，不沿用原包Windows测试环境默认值。
- 后续已授权的缺陷同步由OpenAPI读取字段、上传对应截图、创建缺陷及回读验证正文/附件；沿用用户“不去重”要求直接新建，不更改旧项。当前已同步缺陷不因切换接入方式再次创建。

- 同步到云效的缺陷必须上传与本次失败场景对应的真实截图，并在描述中嵌入，方便研发和回归人员直接查看；日志、JSON 不能代替截图。
- 上传前核对截图与用例、运行批次的对应关系，检查敏感信息；保留原始证据，不生成或修改画面来替代实测截图。
- 提交后回读核验截图附件及描述中的图片引用；本地缺陷记录、测试进度同步截图清单。若缺图，明确记录缺口并补齐后再报告截图证据完整。

## 敏感信息

`.auth/`、`local.env`、`.env.local`、`reports/`、`test-results/` 都在 `.gitignore` 中。不要把 storageState、预签名 URL、trace 内容复制到提交物或聊天记录里。

## 云效缺陷格式

- 标题写“功能/场景 + 可观察的问题”。正文按用户模板依次写：**现象、前置步骤、提示词、复现步骤、实际结果、预期结果、影响、补充、失败截图**；标签单独加粗，失败截图放在正文末尾直接嵌入。不再设置“排查信息”一节。
- “前置步骤”单列账号与会话范围、素材、上传/@引用及必要登记；“提示词”单列可复制的完整指令，准备指令与目标指令区分标注，尚未发送的目标指令注明未执行。实际结果保留已知 run_id、会话 ID、状态、关键错误原文，缺失信息不编造。待确认条件写在“补充”。
- 用户2026-11-13要求精简云效缺陷的“前置步骤”：默认2～3条，每条一句，仅保留环境/必要账号权限、新建测试项目与独立工程、必要素材及触发前状态；复杂场景可补充必要条件，不以精简为由删除复现关键参数。完整提示词放“提示词”，点击/上传/补槽/刷新过程放“复现步骤”，历史工程/会话/run标识和哈希等证据索引放“补充”或附件。前置中不堆本机路径、接口调用、脚本流水或整批测试记录。参照 `tools/yunxiao/README.md` 的“前置步骤精简规则”及示例模板；不因此追改已提交缺陷。
- 保留触发指令、关键参数及影响结论的验证边界；删除重复历史、提交过程、脚本调试流水及无关说明。
- 不在缺陷正文堆放本机路径、完整自动化命令、批次统计或长篇回归清单；详细证据放附件，截图须嵌入并回读验证。


2026-11-13用户执行期间明确删除ERYE199-060/061，两条未开始执行，原定义归档于 `docs/cases/requirements/ERYE-199/retired-cases-060-061-20261113.json`，编号不复用。有效64条，本轮改为051～059、062～068共16条。

- ERYE199-051～059、062～068共16条已接脚本并生产实跑7P/1F/2B/6NA；060/061已删除。057仅独立页面保存发送前崩溃，有Inspector.targetCrashed证据；接管必须停止、用户继续后恢复。064工程素材504 Failed，058旧客户端与068独立空态页前置Blocked。062/064/067按最新五入口，063旧Speech不适用；055不查内部命令字段。原6条v2仍Not Run，021～049仍暂不接自动化；当前有效64条17P/7F/3B/31NA/6NR，详见最新实测报告。

<!-- ERYE237-029-RETIRED-20261113 -->
2026-11-13：用户确认FWXC-532所述默认尺寸变化不作为缺陷，并要求删除ERYE237-029。已移除主用例、Agent配对、Technical分支及registry条目，后续不执行、不回归、不再进入缺陷待办；编号不复用。当前143条有效、46 UI/25 Agent/72 Technical，P0 94/P1 48/P2 1。云效只读核对为已关闭，本次未改云效、未重测。原条目及旧记录仅留历史归档，不计当前待办。
<!-- /ERYE237-029-RETIRED-20261113 -->

- 用户2026-11-16要求按当前功能优化068并重跑，068 v2已生产新空工程Passed：总空态/媒体引导、选择媒体启用和导出禁用、刷新及收起再展开保持；不点击选择媒体，不验独立字幕/素材页或导入。原Blocked留历史；单独068不准备/上传素材或依赖ffmpeg，脚本原位维护。当前有效64条18P/7F/2B/31NA/6NR；058/006仍Blocked、其他六条v2 Not Run不变，详见results-068-v2-empty-project-production-20261116.md。

- 用户2026-11-16确认006按当前应用功能优化并重跑：006 v2已生产新工程Passed，现仅验序列像素位置/等比缩放/旋转、普通/全屏/刷新及素材隔离；独立蒙版、局部锚点、输入局部坐标跳过。006仍AUTO且默认执行新版，旧完整Blocked仅历史，不将延期能力计通过。当前ERYE-199有效63条22P/10F/0B/31NA/0NR，原10失败及云效保持，详见results-006-v2-current-transform-production-20261116.md。

- 2026-11-16原ERYE199十条失败已复测3P/6F/1B：002/007/064 Passed；012原普通删除缺陷未复现，但独立波纹删除不支持而Blocked；030旧组合字段错误未复现且SRT下载正确，MP4/ASS分支仍Failed。当前63条25P/6F/1B/31NA/0NR；云效未改。数字型进度用原生fill+Tab，ctx.panel幂等打开，字幕等内容加载后核验；不将这些脚本操作问题判产品失败。详见results-failed-ten-rerun-production-20261116.md。

- 标题写“【用例编号】功能/场景 + 可观察的问题”；用户2026-11-13明确要求缺陷标题包含用例编号，多用例共因可列相关编号或编号范围。正文按用户模板依次写：**现象、前置步骤、提示词、复现步骤、实际结果、预期结果、影响、补充、失败截图**；标签单独加粗，失败截图放在正文末尾直接嵌入。不再设置“排查信息”一节。
- 用户2026-11-13要求精简缺陷前置：“前置步骤”通常2～3条，只写复现必需的环境/账号、素材及必要历史状态；简单场景可合并。上传、输入、审核、刷新等操作移到“复现步骤”，不重复抄写；不默认堆积分、无并发、平台依赖等通用条件，除非影响复现。保留能区分来源、版本、分支的关键状态。
- 前置中素材只保留文件名与影响复现的类型/尺寸/时长/语言；长SHA、file_id、本机路径和详细编码放“补充”或脱敏附件。会话ID/run_id放“实际结果”；账号使用测试别名，不放登录凭据。
- “提示词”保留可复制的完整原指令，准备指令与目标指令分开，未发送则注明。精简前置不能删除必要的历史失败/已有产物状态，不能改写首次复现指令或真实操作顺序。待确认条件写在“补充”。
- 保留触发指令、关键参数及影响结论的验证边界；删除重复历史、提交过程、脚本调试流水及无关说明。
- 不在缺陷正文堆放本机路径、完整自动化命令、批次统计或长篇回归清单；详细证据放附件，截图须嵌入并回读验证。

- 用户2026-11-18确认：页面批注文字输入不支持自定义字号，UI文字创建/保存/合成按当前默认字号和实际显示大小保持验收；不要求手工设36px/48px，不以画笔大小滑杆代替文字字号，不据此阻塞。FWXC-463取消36px前置，旧Blocked只保留历史，新口径未重跑不补算通过；Agent显式样式参数技术分支独立记录。详见`docs/cases/requirements/ERYE-237/revision-ui-text-size-20261118.md`。

- 用户2026-11-18确认：图片批注每个请求仅允许一张图片，同图多批注仍允许；不同图片需逐张独立提交，不把单请求两张及以上图片、后台自动拆单或一次双图交付作为正常验收要求。050已改为串行单图的跨请求隔离，新版未执行为Not Run。FWXC-599旧原回归/E1的“未同时交付另一图”不再作为当前失败依据，原始实测与旧未知错误另存；旧E2双图Agent结果不补算新版通过。云效实际历史状态与新版测试状态分开，文档修订本身不代表产品修复。见docs/cases/requirements/ERYE-237/revision-050-single-image-annotation-20261118.md。
