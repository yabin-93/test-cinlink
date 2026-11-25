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

> 2026-11-16最新：8条v2已接入tools/editor/erye199/cases-current-v2.mjs，默认执行011/013/017/020/051/052/053/055新版；045按原021～050例外保持人工PLAN，CLI仍拒绝021～050。6 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。旧pending9门禁及旧能力探测仅历史；当前22条核心/设计延期仍门禁。[本轮实测](../../../docs/cases/requirements/ERYE-199/results-nine-v2-production-20261116.md)。

<!-- ERYE199-063-RETIRED-20261116 -->
063已按用户要求删除，编号不复用，历史证据保留；默认及直接执行器均排除。当前有效62条：**31 Passed / 8 Failed / 2 Blocked / 21 Not Applicable / 0 Not Run**；051～068当前14条。其余业务结果保持，014/056仍不适用，未重跑；后续云效补提独立记录。[退役说明](../../../docs/cases/requirements/ERYE-199/retired-case-063-20261116.md)。以下63条/22NA仅历史。
<!-- /ERYE199-063-RETIRED-20261116 -->


> 历史说明：定义更新时9条待执行及门禁描述已由上方本轮结果取代；旧探测只保留历史。

> 当前范围已删除058，051～068现行15条。旧日期段落中的16条/058 Blocked是历史，见[退役说明](../../../docs/cases/requirements/ERYE-199/retired-case-058-20261116.md)。

# ERYE-199 自动化（001～020、051～057、059、062、064～068）

当前执行范围：011/013/017/020/052/053/055 使用 cases-current-v2.mjs。045 和 051 v4 为手工用例，见[051 v4 用例](../../../docs/cases/requirements/ERYE-199/cases.md#erye199-051-current-v4)。自动化选中 051 时返回本次脚本未执行，业务结果见当前测试进度。

采用 Ego Lite 的有头浏览器和已有登录态，不使用 computer-use。入口为 `run.mjs`，001～010在 `cases.mjs`，011～015在 `cases-011-015.mjs`，016～020在 `cases-016-020.mjs`；各模块分别登记可执行子步骤及前置/能力缺口，媒体、独立工程准备及证据分别封装。Node >=20，无新增依赖。

在仓库根目录执行：

```powershell
npm run test:editor:199 -- --list --cases 001-010
npm run test:editor:199:unit
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 001-005
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 006-010
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011-015
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 015-020
```

必须明确目标根地址；支持生产或预发。真实执行会创建专用测试项目、独立会话/工程，上传合成素材，006/009/019/020等向Agent提交编辑请求，可能消耗积分。串行、零重试，不操作旧用户工程，不自动写云效或推送代码。

环境变量 `EGO_BROWSER` 指向本机 ego-browser 可执行文件；Windows 默认已安装的0.6.2.7位置。`CINLINK_FFMPEG`、`CINLINK_FFPROBE` 指向对应可执行文件，未配置时从PATH查找。亦可用 `--ego`、`--ffmpeg`、`--ffprobe`、`--font-file` 覆盖；素材字体默认Windows Arial。这些工具不加入requirements。

续接本任务已打开且归Agent管理的浏览器可加 `--space-id 3 --keep-space`，数字必须取自当前真实TaskSpace，不沿用其他电脑的编号。默认创建独立TaskSpace，整批完成后关闭；需要登录、补槽或原任务未完成时保留现场。登录/系统授权由用户完成，不绕过权限。遇补槽应按原提示词填写并继续原任务，不能通过重新运行命令重发；未知补槽不会猜值。当前自动补槽不能覆盖的表单会记录Blocked及截图，须在原窗口处理后读取原run继续验收。

每次输出到已gitignore的 `reports/erye199-auto-<UTC批次>/`：独立原片及ffprobe PTS、SHA256、云端文件标识、准备意图、前后工程内容、任务回复、真实PNG/页面快照、各例result.json和整批results.json。不得把带凭据的原始响应、签名URL或登录态复制到文档。准备有排他锁，异常后不盲目重放同批准备。

退出码：0全部适用项Passed或仅范围跳过，1存在Failed，2存在Blocked/Not Run/环境异常/整批未完成。失败截图采集异常单独记captureError，不能伪造截图。脚本接入状态和业务执行状态分别维护；`--list`或离线检查通过不等于生产用例通过。

| 编号 | 执行与断言 |
|---|---|
| 001 | 四对象独立基线；2/4/7/9秒原片帧、图片/字幕出现、原声采样与刷新恢复 |
| 002 | 真实页面在1秒分割；核验30000/1001帧边界和刷新保持；不以内部字段命名判失败 |
| 003 | 独立VFR PTS；五处实际呈现帧、跨5秒连续播放、原声及刷新 |
| 004 | 源10秒2倍速；时间线5秒、源帧映射及刷新 |
| 005 | 真实拖动裁头2秒；源范围、关联原声、撤销/重做、映射及刷新 |
| 006 | v2：序列像素中心(400,200)、50%等比缩放、顺时针30度；核验普通/全屏/刷新实际画面及原片/原声保持；蒙版/局部锚点/输入局部坐标跳过，旧完整范围不计通过 |
| 007 | 选中第二片段并切到媒体面板；重开后分别比对选择与面板状态 |
| 008 | 视频/音频/图片逐类登记、拖入、独立撤销；逐项保留观察与失败截图 |
| 009 | 同源两实例；Agent只改A不透明度50%，B完整内容保持；刷新核验 |
| 010 | 另一原片拖入同视频轨5秒；保留A0～5秒、B5～15秒，不默认叠轨；刷新核验 |
| 011 | v2：视频及已有关联原声整体右移2秒，独立M8～10秒/30%不变；空档、原片映射与刷新 |
| 012 | 真实页面移动B到7秒、普通Delete删除A，再独立请求波纹删除；逐步核对是否留空隙 |
| 013 | v2：视频/原声0.5倍速20秒，固定SRT时码/原文/样式不变，2/4/7/14秒及刷新核对 |
| 014 | 先建立真实轨道编辑锁；批量移动/删除包含该轨对象，核对整批拒绝及无部分写入 |
| 015 | v2：点击轨道前方图标隐藏/显示画面、静音/启用原声；两种状态刷新保持，片段/源范围/引用不变；不验证solo或导出隔离 |
| 016 | 当前暂跳过；保留真实子序列创建的原探测脚本和历史证据 |
| 017 | v2：普通同源A/关联原声裁尾至3秒，B/原声B仍5～10秒、保留空隙；失败时留实际源帧和刷新证据 |
| 018 | 当前暂跳过；父子范围/循环/深度步骤保留，功能实现后再测 |
| 019 | v2：新工程中前景A静态位置(400,200)、等比缩放60%、旋转15度、不透明度50%；刷新保持，A原片引用/源范围/速度、背景B及两条原声不串改；不再探测未实现属性 |
| 020 | v2：播放头5秒设置整段50%静态透明度，1/5/9秒和4～6秒播放/刷新保持；背景/原声隔离 |

源参考与实际帧时间、音频采样是自动断言；保存的组合画面截图仍须检查显示质量。VFR连续播放比对浏览器实际呈现回调的源PTS、单调性和跨5秒区间，不用回调数量反推原片帧率，也不据此声称逐帧性能无掉帧。原生进度输入遇重绘丢失0.01秒键步时，读取当前值后用真实键盘补足同次定位，记录seek日志，不写入期望媒体时间。006完整坐标功能需要真实可编辑蒙版/锚点样本，不能由代码硬造字段解阻。001/003/005采用2026-11-13优化版，旧Graphic/PR tick/关键帧阻塞范围不因接入而宣称通过。

001/004/005的源时间定位使用0.04秒观察容差（约30fps一帧）；003按所在VFR区段的相邻帧间隔0.067/0.034秒核对独立PTS。所有实际值均落盘，不能用这些业务观察替代帧精度验收。002对30000/1001帧边界单独断言，不套用上述观察容差。

019当前v2仅验已实现的四项静态变换、保存/刷新和素材隔离。锚点、非等比缩放、视频翻转、四边裁剪、混合模式移出当前019步骤，不发送其能力探测；旧版Blocked保留历史。新工程实跑Passed，见[019报告及截图](../../../docs/cases/requirements/ERYE-199/results-019-v2-static-transform-production-20261113.md)。单独复跑：`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 019`。

历史范围（已由上方2026-11-16定义更新替代）：当时020和016～018为Not Applicable；`--cases 015-020`仅执行015/019。4条功能未实现分别同步FWXC-509～512，截图及附件回读通过。[同步记录](../../../docs/cases/requirements/ERYE-199/defects-unimplemented-016-018-020-production-20261113.md)。

## 2026-11-13 051～059、062～068接入与实跑

新增 `tools/editor/erye199/cases-051-068.mjs`，057故障恢复在 `crash-recovery.mjs`；复用现有素材/工程准备、原run核验与截图封装，无新增依赖。060/061按用户执行中要求删除，不执行性能负载。运行器接受001～020及当前16条，拒绝021～050；`--cases 051-068`自动排除退役项。

```powershell
npm run test:editor:199 -- --list --cases 051-068
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 051-068
```

051～053检查Premiere导入能力及依赖；055不要求内部协议字段；056核对注册表能力；054验证页面手动与Agent复合意图、一次撤销/重做及非法意图拒绝。057仅对额外独立Agent页面拦截真实保存并崩溃，必须取得Inspector.targetCrashed，不以命令超时判通过，恢复后核对内容/版本/播放；未覆盖落库后回执丢失或整机崩溃。058/068明确前置缺口。059仅本页断网并用真实“重试原始提交”恢复，未测磁盘满。062/064/067按已确认最新五入口；063旧Speech不适用。065真实拖动时间轴播放头；066真实横向滚动；隐藏DOM不等于可见面板。

本批实际7P/1F/2B/6NA；064工程素材返回504保留失败，不通过重复加载刷绿。脚本状态AUTO/BLOCKED与业务状态分开；能力检查或环境不足不算目标通过。浏览器接管立即停，用户明确继续后在原TaskSpace恢复。021～049继续暂不接自动化，不变更既有范围。

[本次结果及截图](../../../docs/cases/requirements/ERYE-199/results-051-068-production-20261113.md)。

## 2026-11-16 068 v2空工程复测

068已原位优化为总空态与媒体引导、选择媒体按钮启用、空工程导出禁用、刷新以及收起再展开恢复；不要求当前没有的独立字幕/素材页。只检查按钮状态，不点击媒体选择，也不验证导入。单独运行068不依赖ffmpeg，不生成或上传任何媒体夹具；混合运行其他用例时原素材流程保持。新版生产新工程Passed，旧Blocked留历史；本次不重跑其他用例。

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 068
```

[本轮步骤及截图](../../../docs/cases/requirements/ERYE-199/results-068-v2-empty-project-production-20261116.md)。

## 2026-11-16 058移出执行范围

058已按用户要求删除，自动化函数及registry同步移除。当前可执行编号为001～020、051～057、059、062～068；021～050仍暂不接入。`--cases 051-068`自动排除058/060/061，列出15条；`--cases 058`拒绝执行。直接调用执行器只含退役项时也不启动浏览器或创建项目。058原结果/截图仅留历史，068 v2 Passed及其余结果保持。
<!-- ERYE199-TIMELINE-AUTOMATION-20261118 -->
081～085 使用独立入口 `run-timeline-operations.mjs` / `timeline-operations.mjs`；001～068 旧入口不接受这些编号。35 个明确变体分别为：081-T1，082-S1/T1（必须同会话续轮），083 的 S0/S1/T1/T2/E/C/H/G 分割，084 同八种基线平移，085 同八种基线的 trim-head/trim-tail。每个时间编辑变体新建原生工程；不能复制旧日志冒充新执行。

先按 ego-browser 技能建立本轮唯一 TaskSpace、让用户选择目录完成新项目，再写本轮 execution.json 的实际项目 ID/名称和空 cases，并在 task.json 写实际 `spaceId` 与 `page`。运行器读取该回执；断网后按工具要求在同一TaskSpace恢复新页时更新page，不沿用失效标签。`prepare-timeline-media.py` 用显式 F20/F60/D 路径准备本批夹具并合成不同旋律的独立音乐 B；它不调用产品接口，不新增依赖。

```powershell
node tools/editor/erye199/run-timeline-case.mjs --case 085 --space <实际编号> --report <本批目录>
node tools/editor/erye199/run-timeline-operations.mjs --variant 083-S0-split --action start --space <实际编号> --report <本批目录>
node tools/editor/erye199/run-timeline-operations.mjs --variant 083-S0-split --action wait --space <实际编号> --report <本批目录>
node tools/editor/erye199/run-timeline-operations.mjs --variant 083-S0-split --action drive --space <实际编号> --report <本批目录>
node tools/editor/erye199/run-timeline-matrix.mjs --from 083-S1-split --space <实际编号> --report <本批目录>
```

`run-timeline-case.mjs --case 081/082/083/084/085` 是单条主用例完整入口；083/084分别执行本例8种基线，085执行16个左右边缘变体，081/082按下述原生准备与续轮阶段推进。已完成检查点只输出原结果；未决上传、编辑或确认意图停止供原地核对，不自动再发。单个 `--variant ... --action ...` 是调试/续接阶段命令，不代表整条参数化主用例已完成。

081 先 start/wait/baseline，再按 D、B 分别 importAudio/placeAudio，最后 edit；独立 D 为6～18秒，独立 B 为2～14秒。082 先完成 S1 基线，再在原会话 followup/upload/submitFollowup T1，完成基线后 history；不可把082-T1作为新会话start。`run-timeline-matrix.mjs` 只串行推进083～085，执行/所有权异常立即停止；`--from` 是登记顺序中的恢复起点，已完成项不重放。任务等待确认时，C/H 的 review 先核验当前方案；未知补槽须按实际表单继续原run，不能重新发送。

原生页面承担所有修改，API仅只读辅助核对。视频/BGM的实际操作结果决定联动，不以特定关联字段验收；字幕、原声、译声及独立声音保持。裁剪两侧独立新工程，移动先检查同轨目标不碰撞。每次记录真实时码/源范围和非目标轨，再撤销、重做及保存重开；没有内容变化的拖动先观察，不撤销上一项。语音稿辅助索引重建不作为声音串用；实际音频源及时间仍须保持。

归档 `archive-timeline-operations.py` 要求35个实际变体全部终态并有结果，才写五条主用例进度；保留其他137条及071/FWXC-693、078/FWXC-694。当前仍在执行时，以本批报告检查点为准，不从脚本存在推导通过。
<!-- /ERYE199-TIMELINE-AUTOMATION-20261118 -->


<!-- ERYE199-AUDIO-CROSS-AUTOMATION-20261119 -->
086～090使用 `tools/editor/erye199/run-audio-cross-track.mjs` / `audio-cross-track.mjs`。086分别执行S0/S1/T1/T2/E/C/H/G视频跨轨；087/088/090分别执行X1/X2的独立D分割、平移和跨轨；089分别执行两种组合的左右裁边，共18个变体。每变体使用新原生工程，D由页面导入并放入6～18秒。

```powershell
node tools/editor/erye199/run-audio-cross-track.mjs --case 090 --space <本轮实际编号> --report <新批次目录>
node tools/editor/erye199/run-audio-cross-track.mjs --variant 090-T1-cross-audio --action observe --space <实际编号> --report <本批目录>
```

读取本批task.json绑定的Space/Page；沿用原生卡片准备、C/H审核和只读观察，提交或编辑意图不明确时停止，不重发。跨轨拖到空白区创建同类型轨；先核对实际指针命中，避免抓到播放头。音频分割仅使用当前页面实际入口；选中D且定位12秒后按钮禁用时记录不支持及未执行分支。所有真实编辑均核对源范围、非目标隔离、撤销、重做和刷新后页面时码。

`archive-audio-cross-track.py --report <本批目录> --in-progress`保存实时进度；去掉该参数只在18个实际变体全部有明确结果后归档5例，保留其他137条和既有云效关联。本节记录086～090批次；091～095后续已执行，096～148待执行，见090～095批次说明。
<!-- /ERYE199-AUDIO-CROSS-AUTOMATION-20261119 -->

## 090重跑及091～095原生声音编辑

090仍使用 `run-audio-cross-track.mjs --case 090`；091～095使用 `run-native-audio-operations.mjs --case <编号>`，共享本批真实task.json和execution.json检查点。每个变体新建原生会话/工程，T1/T2与额外导入D的X1/X2分别执行；093左右裁边各自独立，095另含S0/S1/E/C/H。合计31个变体，不复用上一批090结果。

```powershell
node tools/editor/erye199/run-native-audio-operations.mjs --case 091 --space <实际编号> --report <本批目录>
python tools/editor/erye199/archive-native-audio-operations.py --report <本批目录> --in-progress
```

091原生BGM发起分割；092平移；093左右裁边；094跨音频轨后再平移，核验反向联动视频及其他轨隔离。095只分割原声。声音先临时隔离实际播放，再撤销临时启停恢复目标编辑的历史栈；不以波形代替声音，不宣称人工逐字听审。提交/编辑已有意图时停止供原地核对，不重复发起任务或编辑。最终归档须31变体终态，保存090旧结果、其他136条及全部既有缺陷关联；执行中只写专项报告及实时进度，不将未执行分支计通过。
