<!-- ERYE199-012-116-PROD-20261126 -->
2026-11-26，按当前页面能力修订并生产复测 ERYE199-012、116。012 通过，116 通过（36/36 个有效组合通过），126 保留阻塞。合并本次结果后，120 条生产批次为 89 通过、30 失败、1 阻塞，另有 22 条版本暂缓。 [复测报告与核验数据](results-012-116-current-production-20261126.md)
<!-- /ERYE199-012-116-PROD-20261126 -->

<!-- ERYE199-051-V4-CORRECTION-20261123 -->
2026-11-23：ERYE199-051 v4 创建前的入口预期修正为「选择媒体」。原生产证据覆盖空态显示、选取媒体建成工程及刷新后入口不再显示，按新版预期复核为 Passed。当前 142 条有效用例为 47 Passed、20 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [复核记录](revision-051-select-media-20261123.md)
<!-- /ERYE199-051-V4-CORRECTION-20261123 -->

<!-- ERYE199-051-V3-EXEC-20261123 -->
2026-11-23：ERYE199-051 v3 生产实测 Failed。空白会话缺少「新建视频工程」入口，通过「选择媒体」建成工程后和刷新后两项均符合预期。当前 142 条有效用例为 46 Passed、21 Failed、1 Blocked、21 Not Applicable、53 Not Run。 [报告和截图](results-051-v3-production-20261123.md)
<!-- /ERYE199-051-V3-EXEC-20261123 -->

<!-- ERYE199-051-V3-20261123 -->
2026-11-23：ERYE199-051 v3 验证创建前显示「新建视频工程」、创建后隐藏。现为手工待执行，v2 阻塞留历史。当前 142 条为 46 Passed、20 Failed、1 Blocked、21 Not Applicable、54 Not Run。 [修订说明](revision-051-video-project-entry-20261123.md)
<!-- /ERYE199-051-V3-20261123 -->

2026-11-19：[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) 与 [FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74) 的触发条件及结果一致，用户确认按重复关闭，云效回读为“已关闭”。094-T2 仍为 Failed，后续跟踪 FWXC-700。

<!-- ERYE199-091095-YUNXIAO-20261119 -->
2026-11-19：ERYE199-091～095 的 29 个失败变体已按四种现象同步 [FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)、[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)、[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)、[FWXC-720](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fb6bb1e99bf92b757634788d1c)。36 张原始截图已上传并嵌入，48 个附件及正文回读通过。五例保持 Failed，当前 142 条为 46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run。 [同步明细](defects-091-095-production-20261119.md)。
<!-- /ERYE199-091095-YUNXIAO-20261119 -->

<!-- ERYE199-NATIVE-AUDIO-090095-20261119 -->
2026-11-19：ERYE199-090～095生产实跑1 Passed / 5 Failed；31变体2 Passed / 29 Failed，6条AUTO。当前142条46 Passed / 20 Failed / 2 Blocked / 21 Not Applicable / 53 Not Run；其他136条和既有云效关联保持，090原通过记录保留历史。失败截图已保存，测试结束后已同步云效。 [本轮报告](results-090-095-production-20261119.md)。
<!-- /ERYE199-NATIVE-AUDIO-090095-20261119 -->

<!-- ERYE199-086087-YUNXIAO-20261119 -->
2026-11-19：ERYE199-086六个跨视频轨失败变体合并为[FWXC-702](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8a33feece92eb1599144ce85b9)，087两个独立音频分割失败变体合并为[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)。13张原始截图已上传并嵌入，19附件及正文回读通过；两例保持Failed，088～090仍Passed。当前142条46P/15F/2B/21NA/58NR不变，其他140条及既有缺陷关联保持；本次未重跑或修改历史云效缺陷。 [同步明细](defects-086-087-production-20261119.md)。
<!-- /ERYE199-086087-YUNXIAO-20261119 -->

<!-- ERYE199-AUDIO-CROSS-086090-20261119 -->
2026-11-19：ERYE199-086～090生产实跑2 Failed / 3 Passed；18个变体10 Passed / 8 Failed，5条接入AUTO。当前142条46 Passed / 15 Failed / 2 Blocked / 21 Not Applicable / 58 Not Run；其他137条及既有云效关联保持。失败及关键步骤截图已保存，后续已同步FWXC-702/FWXC-703。 [本轮报告](results-086-090-production-20261119.md)。
<!-- /ERYE199-AUDIO-CROSS-086090-20261119 -->

<!-- ERYE199-081083084085-YUNXIAO-20261119 -->
2026-11-19：ERYE199-081、083、084、085按相同业务问题合并2条，已同步[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044)、[FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74)。原声误联动24个变体共用FWXC-699，083-T2额外英文字幕轨关联FWXC-700；31张原始截图已上传并嵌入，38附件及正文回读通过。四例保持Failed，082保持Passed；当前142条43P/13F/2B/21NA/63NR不变，其他138条及既有缺陷关联保持。本次未重跑、未修改旧云效缺陷。 [同步明细](defects-081-083-085-production-20261119.md)。
<!-- /ERYE199-081083084085-YUNXIAO-20261119 -->

<!-- ERYE199-TIMELINE-081085-EXEC-20261118 -->
2026-11-18～19：ERYE199-081～085生产实跑4 Failed / 1 Passed，5条接入AUTO；按35个原生轮次/卡片操作变体逐项记录，结果25 Failed / 10 Passed。当前142条43 Passed / 13 Failed / 2 Blocked / 21 Not Applicable / 63 Not Run；其他137条和071/FWXC-693、078/FWXC-694保持。失败截图已保存，后续已同步FWXC-699/FWXC-700。以下旧统计按日期保留历史。 [逐项结果和截图](results-081-085-production-20261118.md)。
<!-- /ERYE199-TIMELINE-081085-EXEC-20261118 -->

<!-- ERYE199-078-YUNXIAO-20261118 -->
ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。 [同步明细](defects-078-production-20261118.md)。原“未写云效”指测试执行阶段。
<!-- /ERYE199-078-YUNXIAO-20261118 -->

<!-- ERYE199-COMBINATIONS-076080-EXEC-20261118 -->
2026-11-18：ERYE199-076～080生产实跑4 Passed / 1 Failed，5条接入AUTO；当前142条42 Passed / 9 Failed / 2 Blocked / 21 Not Applicable / 68 Not Run。078同会话切换后字幕轨多出：S1实际4轨、T2实际6轨；原片及历史工程身份保持，失败截图与本地缺陷已保存，后续已同步FWXC-694。079的D流程通过，已知FWXC-693译文显示问题另列未修复。其他137条及原云效关联保持。以下旧统计按日期保留历史。 [逐例结果和截图](results-076-080-production-20261118.md)。
<!-- /ERYE199-COMBINATIONS-076080-EXEC-20261118 -->

<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。 [同步明细](defects-071-production-20261118.md)。此前“未写云效”指原测试执行阶段。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

<!-- ERYE199-CARDS-069075-EXEC-20261118 -->
2026-11-18最新：ERYE199-069～075生产原生卡片已实跑6 Passed / 1 Failed，7条接入AUTO。071译文模式在编辑器仍显示双语，实际成片仅中文；已存原图和本地缺陷，后续已同步FWXC-693。074清理44.744秒、075高光30秒与本轮原片区间对应。当前142条：38 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 73 Not Run；其他135条及云效关联保持。以下旧统计按日期保留历史。

[本轮报告](results-069-075-production-20261118.md) · [七条结构化结果](execution-status-069-075-production-20261118.json)。
<!-- /ERYE199-CARDS-069075-EXEC-20261118 -->

# ERYE-199 当前用例状态

<!-- ERYE199-EXTRA-COVERAGE-20261118 -->
2026-11-18最新：追加ERYE199-117～148共32条，覆盖七组现有功能缺口，完整前置、数据、步骤和预期见[第十六章](cases.md#erye199-editor-existing-feature-gaps)。当前142条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 80 Not Run；本批32条PLAN且未执行，原110条定义和结果保持。用户确认V/B删除、复制、剪切粘贴双向联动；占用轨新建同类型轨、不覆盖。旧010覆盖预期仅历史，待单独修订，不用旧断言代跑本批。下方旧统计按日期保留历史。

[本批32条状态](execution-status-extra-coverage-20261118.json) · [全量结构化进度](execution-status-20261113.json)。
<!-- /ERYE199-EXTRA-COVERAGE-20261118 -->


<!-- ERYE199-MULTITRACK-MERGE-20261118 -->
2026-11-18：按用户要求将原ECMT-001～048正式并入本需求，续编ERYE199-069～116，完整定义见[多轨组合章节](cases.md#erye199-card-multitrack)。当前110条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 48 Not Run；新增48条PLAN且未执行，原62条结果及缺陷关联保持。下方旧统计按日期保留历史。

[新增48条逐例状态](execution-status-multitrack-20261118.json) · [全量结构化进度](execution-status-20261113.json)。
<!-- /ERYE199-MULTITRACK-MERGE-20261118 -->

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正依据与证据](revision-008-registration-scope-20261118.md)。以下旧批次统计为历史。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

<!-- ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->
ERYE199-014 → [FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60)；ERYE199-056 → [FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949)。3张2026-11-13历史实测原图已上传并嵌入，8附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。两例仍Not Applicable；063已按用户要求删除，编号不复用，历史证据保留。当前有效62条：31P/8F/2B/21NA/0NR。本次未重跑、不改旧缺陷，其他60条结果及原8失败云效关联保持；后续只核对本批检查点，不重建。 [同步明细](defects-unimplemented-014-056-production-20261116.md)。
<!-- /ERYE199-014056-YUNXIAO-063-RETIRED-20261116 -->


<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->


<!-- ERYE199-017053-V2-YUNXIAO-20261116 -->
ERYE199-017 → [FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627)；ERYE199-053 → [FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)。6张本轮原图已上传并嵌入，13附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。017高/2-严重，053中/3-一般。两例仍Failed，当前63条31P/8F/2B/22NA/0NR，当前8条失败均已有云效关联。本次仅同步既有失败，未重跑；旧FWXC-510子序列缺口保留历史，未改旧缺陷状态。 [同步明细](defects-017-053-v2-production-20261116.md)。此前未云效写入指测试执行阶段。
<!-- /ERYE199-017053-V2-YUNXIAO-20261116 -->


最新：[九条v2实跑](results-nine-v2-production-20261116.md)：6 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。当前有效63条：**31 Passed / 8 Failed / 2 Blocked / 22 Not Applicable / 0 Not Run**。017/053新失败已同步FWXC-590/591；051入口阻塞，012原阻塞保持。以下“9待执行”是执行前历史。

2026-11-16最新：[31条不适用逐条优化](revision-na31-current-capabilities-20261116.md)，9条改当前功能v2 Not Run（011/013/017/020/045/051/052/053/055），22条保留不适用及恢复条件。本轮只改定义，原25P/6F/1B保持，云效未改。当前63条25P/6F/1B/22NA/9NR；以下旧日期批次的31NA/0NR仅历史。


2026-11-16：[原10失败全部复测3P/6F/1B](results-failed-ten-rerun-production-20261116.md)；002/007/064 Passed，012因独立波纹删除不支持Blocked（普通删除旧缺陷未复现）；其余6例Failed。031等31条不适用保持，当前0未执行；本轮未改云效状态。

2026-11-16：[006优化版已生产Passed](results-006-v2-current-transform-production-20261116.md)，已实现的静态位置/缩放/旋转及普通/全屏/刷新一致性通过；未实现部分跳过，旧Blocked保留，该轮无Blocked和Not Run；最新012阻塞见本轮复测。

2026-11-16：[029/047/048相同导出失败已合并FWXC-578](defects-029-047-048-native-export-production-20261116.md)；创建1条、3张原图嵌入、7附件回读核验通过，当前10条Failed均有云效关联。测试结果和统计不变。

2026-11-16：[六条当前功能v2已执行](results-current-six-v2-production-20261116.md)，028/034/042 Passed；029/047/048 Failed（原生导出协议错误），三条失败已合并FWXC-578并核验原图，失败原图已归档；当前无Not Run。

2026-11-16：[064已提交FWXC-577](defects-064-project-media-504-production-20261116.md)，对应截图已上传嵌入并核验；当时原7条Failed均已有云效关联，064保持Failed。本次仅同步既有证据，测试统计不变。

更新：2026-11-18。有效62条；040/050/058/060/061/063已删除、编号不复用。全量当前：**32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**。

058已按用户要求删除，[退役记录](retired-case-058-20261116.md)；006 v2 Passed保持。该批次历史阻塞项为 012 波纹删除和 051 v2 导入入口，现行结果见顶部更新。9条v2已执行，051～068现行14条（063已删除）：{'Passed': 11, 'Failed': 1, 'Blocked': 1, 'Not Applicable': 1, 'Not Run': 0}；原蒙版/锚点Blocked仅历史。

2026-11-13历史批次16条（051～059、062～068）：**7 Passed、1 Failed、2 Blocked、6 Not Applicable**。[实际步骤及截图](results-051-068-production-20261113.md)；该历史批次057仅页面崩溃未发送保存分支，058缺旧客户端，068当时缺独立空态页入口；068现已按用户要求改v2并通过；064媒体→工程报504。六条优化v2已于2026-11-16执行3P/3F，见[本轮报告](results-current-six-v2-production-20261116.md)，不由旧批次结果代替。

021～049仍暂不接自动化，原需求汇总FWXC-525、030/FWXC-517和其他云效关联保持；本次仅将029/047/048合并新建FWXC-578，未重跑。

| 用例 | 自动化 | 当前状态 | 说明 |
|---|---|---|---|
| ERYE199-001 | AUTO | Passed | 四类对象、四个画面点、原声及刷新恢复断言通过 |
| ERYE199-002 | AUTO | Passed | 29.97fps新工程在页面1秒处分割，实际边界1.0010000000000001秒，等于30个30000/1001帧；关联范围及刷新保持，原帧对齐错误未复现。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-002)；云效FWXC-479关联保持 |
| ERYE199-003 | AUTO | Passed | VFR独立PTS、跨帧率区间连续播放及刷新恢复通过 |
| ERYE199-004 | AUTO | Passed | 10秒源片2倍速时间线5秒，2秒映射源4秒 |
| ERYE199-005 | AUTO | Passed | 页面裁头、撤销、重做及刷新后的源范围/原声正确 |
| ERYE199-006 | AUTO | Passed | 006 v2：中心序列像素(400,200)、50%等比缩放、顺时针30度在普通预览/全屏/刷新后均正确；实际播放正常，原片/源范围/10秒时间线/关联原声未改。独立蒙版、局部锚点及输入局部坐标跳过。；[本轮步骤及原图](results-006-v2-current-transform-production-20261116.md) |
| ERYE199-007 | AUTO | Passed | 同一新工程选中第二视频片段并打开媒体，重开后第二片段选择和媒体面板均恢复；原状态丢失未复现。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-007)；云效FWXC-485关联保持 |
| ERYE199-008 | AUTO | Passed | 按2026-11-18 v2口径，三类素材登记与放入分离、对应轨道放入及撤销放入通过；基于2026-11-16既有证据校正，未重跑。素材登记阶段撤销可用性不作判定；FWXC-486已撤回为不是问题。；[校正依据](revision-008-registration-scope-20261118.md) |
| ERYE199-009 | AUTO | Passed | 同源两实例效果隔离且刷新保持 |
| ERYE199-010 | AUTO | Failed | B拖到原视频轨5秒仍新增第二视频轨，A保留0～10秒、B位于新轨5～15秒，未同轨覆盖。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-010)；云效FWXC-487关联保持 |
| ERYE199-011 | AUTO | Passed | A及已有关联原声从0～10移至2～12秒；M源0～2秒/时间线8～10秒/30%不变，空档与原片映射、实际播放和刷新正确。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-011) |
| ERYE199-012 | AUTO | Passed | B移到7～12秒，6秒预览为空。删除A并刷新后，B仍为7～12秒，来源和源范围保持。 [复测报告](results-012-116-current-production-20261126.md#erye199-012)；云效FWXC-491关联保持 |
| ERYE199-013 | AUTO | Passed | 视频/关联原声0.5倍速20秒，Fixed A1～3秒和Fixed B6～8秒未拉伸；2/7秒字幕及源画面正确、4/14秒空字幕，刷新保持。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-013) |
| ERYE199-014 | PLAN | Not Applicable | 没有真实轨道编辑锁，隐藏/静音不构成编辑锁。[最新定义](revision-na31-current-capabilities-20261116.md)；[云效FWXC-595](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=da802459f8a291e0c713adde60) |
| ERYE199-015 | AUTO | Passed | 015 v2 Passed：点击时间轨前方图标，隐藏/显示画面、原声静音/启用均正确；隐藏静音及恢复后刷新保持；片段、原片引用和源范围未删除或串改。不包含solo、导出隔离。 |
| ERYE199-016 | PLAN | Not Applicable | 没有真实可编辑子序列及父实例入口，不能用普通新工程或成片替代。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-017 | AUTO | Failed | 仅裁短A后，B和关联原声B被自动从5秒移到3秒，3～5秒空隙被闭合；4秒已播放B源1秒，7秒为B源4秒，刷新后仍错误。A/B源引用未串换，失败点是B被连带移动。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-017)；[云效FWXC-590](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df4df4dc44a01c0fa27b75c627) |
| ERYE199-018 | PLAN | Not Applicable | 真实子序列及嵌套引用前置缺失，参数校验错误不能替代真实引用验证。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-019 | AUTO | Passed | 019 v2 Passed：中心(400,200)、等比缩放60%、旋转15度、不透明度50%生效并刷新保持；A原片引用/源范围/速度、背景B及两条原声均未串改。未实现属性已移出当前步骤。 |
| ERYE199-020 | AUTO | Passed | 播放头5秒提交静态50%后，1/5/9秒均同一作用范围，跨4～6秒无额外动画；源/背景/原声未改、刷新保持。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-020) |
| ERYE199-021 | PLAN | Not Applicable | 没有位置动画开关及真实关键帧，不能把静态设置当通道。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-022 | PLAN | Not Applicable | 依赖真实关键帧和源绑定时间轴，当前不能建立目标对象。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-023 | PLAN | Not Applicable | 没有工程内可编辑视频蒙版，视频批注/图片/裁剪不等同蒙版。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-024 | PLAN | Not Applicable | 依赖023的真实路径蒙版与路径关键帧。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-025 | PLAN | Not Applicable | 没有可编辑效果栈及效果实例，不以字幕样式或水印代替。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-026 | PLAN | Not Applicable | 依赖025中两个真实可排序效果，普通轨道顺序不是效果栈顺序。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-027 | PLAN | Not Applicable | 没有独立Graphic组、组内元素及模板保存；水印不是Graphic组。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-028 | PLAN | Passed | 双语Source A/译文甲、Source B/译文乙全局字号20→24→20生效并刷新保持；2/7秒匹配、4秒空档；原文/时间/原声引用及其他工程内容保持。；[本轮截图](results-current-six-v2-production-20261116.md#erye199-028) |
| ERYE199-029 | PLAN | Failed | 混合文字/Emoji/换行及刷新可见；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-029)；云效FWXC-578关联保持 |
| ERYE199-030 | PLAN | Failed | 原生MP4导出仍报“编辑器执行数据不符合正式 v2 协议”；组合SRT+ASS/SSA请求本轮done，真实SRT已下载，两条原文/时间与源SRT一致且无样式；未交付ASS/SSA，应用未明确说明支持情况。旧Unknown or missing editor fields本轮未复现，整例因MP4及样式字幕分支未通过。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-030)；云效FWXC-517关联保持 |
| ERYE199-031 | PLAN | Not Applicable | 没有工程内可编辑转场对象，普通切点或渐入渐出不替代转场。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-032 | PLAN | Not Applicable | 依赖031真实转场，当前无法建立余量不足的有效提交。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-033 | PLAN | Not Applicable | 没有恒定增益/恒定功率/指数的工程音频转场对象。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-034 | PLAN | Passed | 三个独立新工程分别以0.25/0.3178/4倍执行，时长40/31.466331/2.5秒；5/5/1秒对应源约1.25/1.589/4秒，相邻源帧范围内；实际播放与刷新保持，视频及关联原声同倍率、同源范围，无字幕或替代片段。；[本轮截图](results-current-six-v2-production-20261116.md#erye199-034) |
| ERYE199-035 | PLAN | Not Applicable | 没有工程LUT及可编辑调色入口，文件级滤镜不算工程LUT。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-036 | PLAN | Passed | 按需求允许的“明确拒绝HDR处理”分支通过：真实PQ/BT2020/10bit样本已登记并打开，应用明确拒绝调色/导出且解释无法保证正确转换；无输出、原工程未改。仅拒绝分支通过，不代表已支持或验证HDR→SDR转换质量。 |
| ERYE199-037 | PLAN | Not Applicable | 没有真实调整层及可编辑曝光/模糊和效果蒙版。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-038 | PLAN | Not Applicable | 没有视频波形/矢量示波器入口，音频波形不替代视频示波器。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-039 | PLAN | Not Applicable | 没有工程色度抠像、alpha/三视图及边缘蒙版控制。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-041 | PLAN | Not Applicable | 没有工程稳定器及后台分析/取消/失败保留流程。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-042 | PLAN | Passed | 对白D100→58→0→58%、音乐M30→15→30%原生拖动及刷新保存通过，双片段互不串改。实际混合预览录音核验：D/M约0.581/0.300→对白约0→0.579/0.149，额外V原声静音；源/范围/时长保持。；[本轮截图](results-current-six-v2-production-20261116.md#erye199-042) |
| ERYE199-043 | PLAN | Passed | 按原前置单/立体声主场景通过：48kHz单声道与44.1kHz立体声在同一新工程导出为48kHz双声道AAC；实测前段L/R相关0.9999999，后段L440/R880分别保留，源引用/原采样信息保持。附加5.1仅查询、未放入时间线，端到端支持未验证，不计多声道通过。 |
| ERYE199-044 | PLAN | Not Applicable | 没有工程音频效果链、参数EQ、半音/音分及限幅控制。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-045 | PLAN | Passed | 页面仅将M2（3～7秒）从50%调至15%，M1/M3仍50%、独立对白100%，源范围与片段边界未改；实际混音采样、刷新保持及恢复50%通过。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-045) |
| ERYE199-046 | PLAN | Not Applicable | 没有结构分析候选、保护映射与原子可撤销替换，普通拼接不算音乐重组。[最新定义](revision-na31-current-capabilities-20261116.md) |
| ERYE199-047 | PLAN | Failed | 2秒图片+A、4秒图片、7秒B、9秒仅原片及刷新预览已核对；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-047)；云效FWXC-578关联保持 |
| ERYE199-048 | PLAN | Failed | 全屏进出及9.17秒→9.17秒位置保持，刷新后原片/10秒时间线正常；原生导出报错：编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。；未从结果区取得可下载MP4，文件结果未完成核验。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-048)；云效FWXC-578关联保持 |
| ERYE199-049 | PLAN | Passed | 049 v2 Passed：会话发送位置出现停止任务，已受理排队请求queued→cancelled且无产物；停止后新任务A及完成后独立提交B均完成并可下载，B后重下A内容未变；20秒/640×360/30fps/48kHz，工程未改。仅覆盖排队停止，不含渲染开始后停止或失败重试。 |
| ERYE199-051 | PLAN | Passed | 无视频工程时空态的「选择媒体」可用，选择 MP4 在同一会话创建视频工程后入口消失，刷新重开同一工程后仍不显示。按用户修正的预期复核原生产证据为 Passed。 [复核记录和截图](revision-051-select-media-20261123.md) |
| ERYE199-052 | AUTO | Passed | 同名same.mp4的A/B为不同源引用；B独立新轨0～10秒、原声静音，显示B/隐藏后A的画面对照及刷新保持，A未被同名导入重绑定。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-052) |
| ERYE199-053 | AUTO | Failed | 空SRT登记后放入字幕轨，未给出无有效字幕提示并持久化一条bindings为空的字幕轨；非法时码SRT被“Subtitle block has no timing”正确拒绝。原A/B字幕保留，后续RECOVER053编辑和刷新通过；整例因空SRT分支Failed。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-053)；[云效FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726) |
| ERYE199-054 | AUTO | Passed | 补齐页面选择与真实目标后，Agent一次改位置/透明度；一次撤销恢复二者并保留手动静音，一次重做恢复；非法组合拒绝无部分写入，刷新保持。 |
| ERYE199-055 | AUTO | Passed | 一次相对降6dB后约50.12%，切面板/两次刷新/离开重开仍约50%而非重复降为25%；原片/原声/位置与源范围保持。；[步骤/原图](results-nine-v2-production-20261116.md#erye199-055) |
| ERYE199-056 | AUTO | Not Applicable | 没有实际效果注册表读取入口，不能把源码/静态工具定义当在线能力注册表。[最新定义](revision-na31-current-capabilities-20261116.md)；[云效FWXC-596](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5345dc4d3fcf3d04cf27456949) |
| ERYE199-057 | AUTO | Passed | 独立测试页在真实保存请求发送前暂停，已捕获Inspector.targetCrashed及Target crashed；用户接管后授权继续，重开原工程内容/版本保持且可播放，未落库修改未重放。仅覆盖页面崩溃、未发送保存分支，未覆盖落库后回执丢失或整机崩溃。 |
| ERYE199-059 | AUTO | Passed | 真实断网后提示执行请求结果未知并保留原始提交和静音草稿；恢复网络点击“重试原始提交”成功，刷新保持。首次脚本未识别同义提示/按钮已修正，不是产品失败；未覆盖磁盘满。 |
| ERYE199-062 | AUTO | Passed | 带烧录字幕的测试视频从收起状态重新展开，现行五入口、预览、时间轴和导出均显示，工程内容保持；按用户确认最新页面验收，不要求旧Speech布局。 |
| ERYE199-064 | AUTO | Passed | 字幕A/B加载后正常显示；媒体→工程素材列表成功加载且无504；返回字幕仍为2秒，工程内容保持，原504未复现。；[最新截图](results-failed-ten-rerun-production-20261116.md#erye199-064)；云效FWXC-577关联保持 |
| ERYE199-065 | AUTO | Passed | 真实播放、暂停及时间轴播放头拖动到约7秒，画面媒体时间和页面进度一致且停住；工程内容未改。 |
| ERYE199-066 | AUTO | Passed | 60秒多片段时间线放大后刻度/片段像素宽度变化，真实横向滚动有效，5秒播放位置及工程内容保持。 |
| ERYE199-067 | AUTO | Passed | 按最新布局收起/展开字幕功能面板，预览宽度自适应且恢复，当前字幕面板、2秒进度及暂停状态保持；不将项目列表栏当旧Speech功能栏。 |
| ERYE199-068 | AUTO | Passed | v2生产新工程通过：空工程总空态、按钮状态、刷新和收起再展开保持；旧Blocked仅历史，不要求两页入口。 |

历史051～068执行报告保留每条范围、补齐过程、前置未满足及未覆盖分支；脚本接入不代表完整需求已通过。六条v2定义及原24条缺口见[修订说明](revision-na-current-capabilities-20261113.md)，[云效需求汇总](defects-unfinished-24-production-20261113.md)。

068 v2已生产复测Passed，[本轮步骤和4张原图](results-068-v2-empty-project-production-20261116.md)；其后058已删除，现行15条8P/1F/0B/6NA；旧批次统计不重写。
