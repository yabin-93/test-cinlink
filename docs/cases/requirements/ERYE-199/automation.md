<!-- ERYE199-COMBINATIONS-AUTOMATION-20261118 -->
076～080使用独立原生组合执行器 `tools/editor/erye199/run-workflow-combinations.mjs`，实现 `workflow-combinations.mjs`。069～075仍使用原分阶段执行器；001～068的旧run.mjs不接受新编号。081～085另用时间轴专项执行器，086～148仍PLAN，不会被本批组合命令代跑。

新批次先读取ego-browser技能、建立唯一TaskSpace并新建专用项目；使用 `prepare-combination-media.ps1 -OutputDirectory <新报告目录> -F20Source <20秒原片>` 准备F20/D（Windows、PowerShell7、System.Speech、ffmpeg）。把实际TaskSpace、项目ID/名与空cases写入新报告execution.json，不复用已完成批次检查点。

- 076/077：open→确认页面5秒16:9/1K1:1默认参数→submit一次→observe→verifyGeneratedVideo/verifyGeneratedImage；图片走独立画布，不走视频轨检查。
- 078：用078-S0的open/configure/upload/submit开始；完成后verifyBaseline、mapping和download。续轮078-S1、078-T2只能prepareFollowup→selectFollowupCard→upload→submitFollowup→observe→verifyBaseline/mapping/download；三轮全部结束后verifyHistory。依照原run对应结果按钮进入，不按同名文件盲选，不在续轮新开会话。
- 079/080：open/configure/upload/submit→observe→verifyBaseline→registerD→placeD→alignD→verifyD。只有原生五类基线成立才放入D；空白处原生拖入，微调避开音量线，四声音隔离播放后恢复，刷新后可从原结果重开。D的界面名可能也是“背景音乐”，必须看源和无视频关联。

每个浏览器命令进程结束后再下一个；observe单次不超过40秒，必要补槽按用例原值填写继续原run，不能重发。实际文件由 `audit-combination-artifacts.py` 解码/辅助ASR，`archive-workflow-combinations.py` 只在本批7个原run及UI核验完成后归档5条主用例。归档保留其他137条和FWXC-693关联，078后续已有云效关联时拒绝旧归档覆盖。

```powershell
# 本批真实命令示例；space7结束后不可照搬，需要新TaskSpace/新报告目录。
node tools/editor/erye199/run-workflow-combinations.mjs --case 078-T2 --action verifyHistory --space 7 --report reports/erye199-076-080-production-20261118
node --test tools/editor/erye199/workflow-combinations.test.mjs tools/editor/erye199/workflow-cards.test.mjs
```

本批完整结果见需求目录 `results-076-080-production-20261118.md`。脚本接入、实际业务结果与已知缺陷分别记录；079独立D流程通过不表示FWXC-693译文显示问题已修复。

<!-- /ERYE199-COMBINATIONS-AUTOMATION-20261118 -->

<!-- ERYE199-CARDS-069075-EXEC-20261118 -->
069～075已接入独立分阶段原生卡片执行器 `tools/editor/erye199/run-workflow-cards.mjs` / `tools/editor/erye199/workflow-cards.mjs`。001～068的旧run.mjs不接受这些编号，不要套用旧命令。076～080已有组合执行器（见上方）；081～085另用时间轴专项执行器，086～148保持PLAN。新批次按prepare-workflow-media.py准备F20/F60/media.json，读技能后在同一已有TaskSpace内依次open→configure→upload→submit（只一次）→observe；074/075等待确认时先核对方案，再confirmReview→observe→verify→download，074/075再mapping。实际产物用audit-workflow-product.py核验，074/075另用audit-card-source-mapping.py核验。最后用archive-workflow-cards.py归档，保留其他135条结果。

已有本批检查点只可observe/resume/verify；每次等待上一浏览器命令进程结束再下一动作。071仅在用户已补充积分且原run为insufficient_credits终态时用restart --reason credits-restored另建独立新尝试，禁止重发旧任务。

```powershell
node tools/editor/erye199/run-workflow-cards.mjs --case 074 --action observe --space 6 --report reports/erye199-069-075-production-20261118
node tools/editor/erye199/run-workflow-cards.mjs --case 074 --action resume --space 6 --report reports/erye199-069-075-production-20261118
node tools/editor/erye199/run-workflow-cards.mjs --case 074 --action verify --space 6 --report reports/erye199-069-075-production-20261118
node --test tools/editor/erye199/workflow-cards.test.mjs
```

上述space6属于本批检查点，换电脑/新批次必须使用真实新TaskSpace和报告目录；不能复制旧报告伪装重跑。完整本轮结果见需求目录的results-069-075-production-20261118.md。
<!-- /ERYE199-CARDS-069075-EXEC-20261118 -->

<!-- ERYE199-EXTRA-COVERAGE-20261118 -->
2026-11-18最新：现行142条；069～148共80条仅PLAN/Not Run，117～148为本次新增32条，没有执行器/自动化命令。原001～068脚本未改；010旧覆盖断言与用户新确认的“占用轨新建同类型轨”不一致，不能代跑138～141，后续需单独修订。[本批定义](cases.md#erye199-editor-existing-feature-gaps) · [范围说明](revision-extra-coverage-20261118.md)。
<!-- /ERYE199-EXTRA-COVERAGE-20261118 -->

> 2026-11-16最新：8条v2已接入tools/editor/erye199/cases-current-v2.mjs，默认执行011/013/017/020/051/052/053/055新版；045按原021～050例外保持人工PLAN，CLI仍拒绝021～050。6 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。旧pending9门禁及旧能力探测仅历史；当前22条核心/设计延期仍门禁。[本轮实测](results-nine-v2-production-20261116.md)。

<!-- ERYE199-MULTITRACK-MERGE-20261118 -->
2026-11-18：用例总数已增至110条。新增ERYE199-069～116共48条仅为定义/PLAN、Not Run，尚未接入执行脚本或CLI；不得套用001～068命令运行新增编号。原脚本及其真实执行结果不变。详见[补充正文](cases.md#erye199-card-multitrack)及[归并说明](revision-multitrack-merge-20261118.md)。
<!-- /ERYE199-MULTITRACK-MERGE-20261118 -->

<!-- ERYE199-008-SCOPE-CORRECTION-20261118 -->
2026-11-18：ERYE199-008已按用户要求移除素材登记后必须可撤销的预期及自动化分支；保留三类素材登记/放入分离、对应轨道放入与撤销放入。基于2026-11-16原始观察校正Passed，本次未重跑；旧Failed、日志和截图保留。FWXC-486已改为“不是问题”，原正文、7附件及截图引用保留并回读。当前62条：32 Passed / 7 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run，其他61条不变。 [校正依据与证据](revision-008-registration-scope-20261118.md)。以下旧批次统计为历史。
<!-- /ERYE199-008-SCOPE-CORRECTION-20261118 -->

<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->


> 历史说明：定义更新时9条待执行及门禁描述已由上方本轮结果取代；旧探测只保留历史。

> 2026-11-16：原10失败已复测3P/6F/1B，详见[结果](results-failed-ten-rerun-production-20261116.md)；002/007/064通过，012普通删除通过但独立波纹未实现而Blocked。6条原AUTO复用仓库函数，4条PLAN按用户原约定仍不接自动化。适配数字型播放进度、面板幂等打开、字幕加载等待，未放宽预期。

> 2026-11-16：006原位更新为当前功能v2，生产新工程Passed。序列像素位置/等比缩放/旋转、普通/全屏/刷新核验均已接脚本；蒙版/局部锚点/输入局部坐标跳过。详见[报告](results-006-v2-current-transform-production-20261116.md)及[范围修订](revision-006-current-transform-20261116.md)。

> 2026-11-16：028/029/034/042/047/048 v2已通过Ego有头页面实测3P/3F，详见[结果](results-current-six-v2-production-20261116.md)。仍PLAN，未新增仓库测试入口、依赖或运行器编号；下文六条Not Run属于执行前历史。

> 当前范围已删除058，051～068现行15条。旧日期段落中的16条/058 Blocked是历史，见[退役说明](retired-case-058-20261116.md)。

# ERYE-199 脚本接入

当前执行范围：011/013/017/020/052/053/055 使用 cases-current-v2.mjs。045 和 051 v4 为手工用例，见[051 v4 用例](cases.md#erye199-051-current-v4)。自动化选中 051 时返回本次脚本未执行，业务结果见当前测试进度。

001～020保留仓库统一入口：`npm run test:editor:199`，按上方本版本范围决定是否执行。具体环境配置、参数和副作用见[使用说明](../../../../tools/editor/erye199/README.md)。实现为[001～010步骤与断言](../../../../tools/editor/erye199/cases.mjs)、[011～015步骤（含015 v2）](../../../../tools/editor/erye199/cases-011-015.mjs)、[016～020前置探测及变换步骤](../../../../tools/editor/erye199/cases-016-020.mjs)、[运行入口](../../../../tools/editor/erye199/run.mjs)、[结果及截图记录](../../../../tools/editor/erye199/worker.mjs)。适用范围内缺少必要能力且尚未优化范围的用例保留BLOCKED；当前延期22条Not Applicable、新9条Not Run；015 v2按新定义实际执行验收，不把旧版范围记通过。

```powershell
npm run test:editor:199 -- --list --cases 001-010
npm run test:editor:199:unit
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 001-005
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 006-010
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011-015
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 015-020
```

采用Ego Lite有头浏览器，串行、零重试；新建专用测试项目和逐例独立工程；不使用computer-use。保存/登记接口仅用于准备及回读，分割、裁剪、撤销、重做、面板选择和拖入均走页面操作。006/009通过完整提示词驱动真实Agent编辑。既有已受理任务不会自动重发，未知补槽保留原run及表单继续处理。

`cases.md`的“自动化/脚本”与“锚点提示”分别表示接入情况与业务实测。接入不清除失败，不将历史结果改成自动化本轮结果；001/003/005按优化版范围，旧Graphic/PR tick/关键帧缺口保留。006已按用户2026-11-16要求优化为v2并实跑Passed，完整蒙版/锚点范围延期，旧Blocked留历史，见[本轮记录](results-006-v2-current-transform-production-20261116.md)。

原始输出在本机 `reports/erye199-auto-<批次>/`，包含各例result.json、整批results.json、真实截图、前后工程、原任务回复及独立源PTS。发布到用例目录的截图/证据以本轮报告索引为准。原始报告可能含账号信息，仅留本机；不得复制签名URL或凭据。

离线校验覆盖编号范围约束、目标域限制、分数帧率对齐、Blocked/Failed区分与同源实例夹具独立性；通过离线校验不等于生产通过。

011/013/014原步骤保留供后续版本复测，当前均不执行。012继续按原适用范围执行。015 v2点击视频轨前方图标隐藏、原声轨图标静音，刷新核对，再点击同处图标恢复显示/启用并刷新；完整内容与基线一致。不发送solo探测或执行导出隔离。[015 v2生产实跑Passed及截图](results-015-v2-visibility-production-20261113.md)。运行默认范围仍为001～010，015需明确传`--cases 015`或包含015的范围。

016～018当前在运行器中直接跳过，不发送目标任务；原真实子序列探测脚本、依赖阻塞及证据保留历史，功能实现后再测。019已优化为v2：新工程一次完整指令设置位置(400,200)、等比缩放60%、旋转15度、不透明度50%，验证保存/刷新、A原片引用/源范围/速度、背景整轨和两条原声不串改；移除锚点、非等比、视频翻转、四边裁剪、混合模式等未实现步骤，不再探测。新版已实跑Passed，[步骤和截图](results-019-v2-static-transform-production-20261113.md)；旧版Blocked/局部通过保留历史。020当前按功能未实现跳过，保留原关键帧探测、插值/路径/缓动要求及历史Blocked证据。015/019均按优化后的v2范围实跑Passed；016～018及020当前不适用。传`--cases 015-020`仅执行015/019，其余输出Not Applicable且executed=false。

016/017/018/020功能未实现已按用户要求分别同步云效FWXC-509～512；6截图及17附件回读通过，017/018明确为016依赖证据，详见[本次同步与范围](defects-unimplemented-016-018-020-production-20261113.md)。当前7条范围排除；006不扩大排除。

本次原24条不适用优化仅涉及用例定义：028/029/034/042/047/048 v2为Not Run；其余18条延期。全部仍PLAN、脚本为空，不扩展001～020运行器范围，未用历史日志代替新执行。详见[原因及范围修订](revision-na-current-capabilities-20261113.md)。

## 2026-11-13 051～059、062～068接入与实跑

新增 `tools/editor/erye199/cases-051-068.mjs`，057故障恢复在 `crash-recovery.mjs`；复用现有素材/工程准备、原run核验与截图封装，无新增依赖。060/061按用户执行中要求删除，不执行性能负载。运行器接受001～020及当前16条，拒绝021～050；`--cases 051-068`自动排除退役项。

```powershell
npm run test:editor:199 -- --list --cases 051-068
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 051-068
```

051～053检查Premiere导入能力及依赖；055不要求内部协议字段；056核对注册表能力；054验证页面手动与Agent复合意图、一次撤销/重做及非法意图拒绝。057仅对额外独立Agent页面拦截真实保存并崩溃，必须取得Inspector.targetCrashed，不以命令超时判通过，恢复后核对内容/版本/播放；未覆盖落库后回执丢失或整机崩溃。058/068明确前置缺口。059仅本页断网并用真实“重试原始提交”恢复，未测磁盘满。062/064/067按已确认最新五入口；063旧Speech不适用。065真实拖动时间轴播放头；066真实横向滚动；隐藏DOM不等于可见面板。

本批实际7P/1F/2B/6NA；064工程素材返回504保留失败，不通过重复加载刷绿。脚本状态AUTO/BLOCKED与业务状态分开；能力检查或环境不足不算目标通过。浏览器接管立即停，用户明确继续后在原TaskSpace恢复。021～049继续暂不接自动化，不变更既有范围。

[本次结果及截图](results-051-068-production-20261113.md)。

## 2026-11-16 068 v2空工程复测

068已原位优化为总空态与媒体引导、选择媒体按钮启用、空工程导出禁用、刷新以及收起再展开恢复；不要求当前没有的独立字幕/素材页。只检查按钮状态，不点击媒体选择，也不验证导入。单独运行068不依赖ffmpeg，不生成或上传任何媒体夹具；混合运行其他用例时原素材流程保持。新版生产新工程Passed，旧Blocked留历史；本次不重跑其他用例。

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 068
```

[本轮步骤及截图](results-068-v2-empty-project-production-20261116.md)。

## 2026-11-16 058移出执行范围

058已按用户要求删除，自动化函数及registry同步移除。当前可执行编号为001～020、051～057、059、062～068；021～050仍暂不接入。`--cases 051-068`自动排除058/060/061，列出15条；`--cases 058`拒绝执行。直接调用执行器只含退役项时也不启动浏览器或创建项目。058原结果/截图仅留历史，068 v2 Passed及其余结果保持。
<!-- ERYE199-TIMELINE-AUTOMATION-20261118 -->
081～085 的分阶段原生入口为 [run-timeline-operations.mjs](../../../../tools/editor/erye199/run-timeline-operations.mjs)，实现 [timeline-operations.mjs](../../../../tools/editor/erye199/timeline-operations.mjs)，完整阶段和命令见 [脚本说明](../../../../tools/editor/erye199/README.md)。083～085分别按8个卡片基线执行，裁剪左右边缘独立复位；共35个轮次/操作变体。已有本批检查点不得重建/重发；082明确同会话S1→T1。旧001～068入口不接受081～085。

自动化接入与真实执行分别登记；本批未结束前不把剩余变体计通过。未来新批次使用真实新TaskSpace/专用项目及新报告目录，不照搬本批编号；正式归档只修改081～085，保留既有结果和缺陷回执。086～148仍待执行。
<!-- /ERYE199-TIMELINE-AUTOMATION-20261118 -->


<!-- ERYE199-AUDIO-CROSS-AUTOMATION-20261119 -->
086～090使用 `tools/editor/erye199/run-audio-cross-track.mjs` / `audio-cross-track.mjs`。086分别执行S0/S1/T1/T2/E/C/H/G视频跨轨；087/088/090分别执行X1/X2的独立D分割、平移和跨轨；089分别执行两种组合的左右裁边，共18个变体。每变体使用新原生工程，D由页面导入并放入6～18秒。

```powershell
node tools/editor/erye199/run-audio-cross-track.mjs --case 090 --space <本轮实际编号> --report <新批次目录>
node tools/editor/erye199/run-audio-cross-track.mjs --variant 090-T1-cross-audio --action observe --space <实际编号> --report <本批目录>
```

读取本批task.json绑定的Space/Page；沿用原生卡片准备、C/H审核和只读观察，提交或编辑意图不明确时停止，不重发。跨轨拖到空白区创建同类型轨；先核对实际指针命中，避免抓到播放头。音频分割仅使用当前页面实际入口；选中D且定位12秒后按钮禁用时记录不支持及未执行分支。所有真实编辑均核对源范围、非目标隔离、撤销、重做和刷新后页面时码。

`archive-audio-cross-track.py --report <本批目录> --in-progress`保存实时进度；去掉该参数只在18个实际变体全部有明确结果后归档5例，保留其他137条和既有云效关联。本节记录086～090批次；091～095后续已执行，096～148待执行，见090～095批次说明。

### 090重跑及091～095原生声音编辑（2026-11-19）

090沿用原入口；091～095接入 `tools/editor/erye199/native-audio-operations.mjs`，入口 `run-native-audio-operations.mjs --case 091/092/093/094/095 --space <实际编号> --report <本批目录>`。本批包含31变体：090两种D跨轨；091/092/094各T1/T2/X1/X2四种；093四种组合各左右裁边，共八种；095 S0/S1/T1/T2/X1/X2/E/C/H九种原声分割。

原生BGM操作只联动视频，其他声音和字幕保持；原声操作只改原声。各实际编辑核验目标与非目标、隔离播放、撤销重做、刷新及可见页面时码。复用原生卡片准备与C/H审核，仅允许只读接口辅助，无内部字段写入。全批终态后运行 `archive-native-audio-operations.py --report <本批目录>`，保留090原执行历史及其他136条；执行中加 `--in-progress`，当前结果以专项报告为准。
<!-- /ERYE199-AUDIO-CROSS-AUTOMATION-20261119 -->
