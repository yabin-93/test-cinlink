# ERYE-196 编辑器业务自动化

统一入口：[用例与脚本登记](../../docs/cases/requirements/ERYE-196/automation.md)。

```powershell
# 首次准备013/014离线语音与固定BGM，只需生成一次
powershell -NoProfile -ExecutionPolicy Bypass -File tools/editor/prepare-speech.ps1 -OutDir reports/editor-196/fixtures

# 登录过期时人工登录；0表示持续等待，真正进入工作台才保存
$env:CINLINK_AUTH_WAIT_MS='0'; npm run auth

# 独立有头执行010～015；会真实创建工程、上传音频、提交Agent任务
npm run test:editor:196

# 仅指定编号；012包含0秒/20秒两份独立基线
npm run test:editor:196 -- --grep 'ERYE196-010'
```

- 配置 `playwright.editor.config.ts`，单worker、零重试，默认不并入全量staging。禁止与其他预发脚本同时跑。
- 固定源基线读取真实A20工程；新建测试副本，不编辑用户原工程。基线不存在/变化则前置失败，不能伪造通过。后续换源请同步独立金标。
- 011的B取现有不同视频的源0～10秒追加，不把120秒源文件称为完整10秒视频。
- 013/014的本地英语离线语音是真实WAV，Intro 0～1、Remove 1～2、Keep 2～3、Welcome 4～6、Second caption 10～12秒，另有20秒固定BGM。A复用已登记的20秒视频，原声音轨静音，独立配音用于核对时间和词句；不能代表自然口播音质或口型验收。
- 夹具保存使用页面已观察到的真实保存入口；待测修改必须从Agent输入框发送。断言核对真实保存后的片段源区间、位置、字幕和声音，不以需求拟定接口/字段作为能力标准。
- 012/015必须收到与端点/范围相关的明确反馈并保持原内容；`Run failed before execution.`不算正确拒绝。
- 失败页由脚本直接截图；原始请求、前后工程、完整提示词、run与会话、澄清填写值留在本机 `reports/editor-196/<批次>/`，不提交凭据或原始证据。每次调用分别保留时间戳命名的JSON/HTML；可用`CINLINK_EDITOR_BATCH`指定批次。
- 任务失败后不点重试。初始化失败和夹具失败独立记为前置阻塞，不能冒充目标业务已执行。

历史005～009脚本已归档到[history-20261105](history-20261105/README.md)，与可独立执行的Playwright测试区分登记。

## 正式环境仅执行013

正式环境与预发分别登记结果。先准备本机A20视频和离线语音；源视频默认沿用既有本机夹具，也可通过`CINLINK_EDITOR_SOURCE_VIDEO`指定同规格20秒视频。两份字幕及不含云端素材ID的工程模板在本目录`fixtures/`。首次使用正式环境时：

```powershell
$env:CINLINK_BASE_URL='https://app.cinlink.ai'
$env:CINLINK_STUDIO_BASE='https://app.cinlink.ai'
$env:CINLINK_RUNTIME_BASE='https://app.cinlink.ai'
$env:CINLINK_FILES_API_BASE='/cloud-tool-api/v1/agent/files'
$env:CINLINK_TEST_STORAGE_STATE=(Join-Path (Get-Location) '.auth/storage-state-prod-editor.json')
$env:CINLINK_AUTH_WAIT_MS='0'
npm run auth

$env:CINLINK_EDITOR_BOOTSTRAP='1'
$env:CINLINK_EDITOR_BATCH='prod-013-本轮编号'
npm run test:editor:196 -- --grep 'ERYE196-013'
```

这会在正式环境真实上传视频、字幕和控制音频，创建专用会话/控制工程及013测试副本，仅对副本提交一次Agent编辑。当前非预发环境必须重新准备基线或显式提供该环境的工程、会话ID，禁止默认套用预发ID；实际登录态单独保存。相同内容的文件可能由服务端去重返回相同ID，以本环境上传响应为准。

需要复用已经准备的正式环境基线时，关闭`CINLINK_EDITOR_BOOTSTRAP`，按该批次本机`environment.json`配置`CINLINK_EDITOR_BASELINE_ID`、`CINLINK_EDITOR_ORIGINAL_ID`（独立控制工程）、`CINLINK_EDITOR_CONVERSATION_ID`。上传入口与正式页面实际部署包一致；编辑器按钮使用稳定选择器，兼容中英文界面。执行后切回预发时须恢复相应环境变量和预发登录文件。

## 用户指定的当前正式测试项目

用户最新顺序：先验证编辑页直接按钮/输入/拖动，再验证对话。页面基础驱动见[ui-basics.mjs](ui-basics.mjs)，[本轮11项操作与结果](../../docs/cases/requirements/ERYE-196/editor-ui-basics-20261106.md)。该模块只通过传入的现有page/context操作真实控件，API仅做GET回读；同批次启动锁、项目身份检查及恢复前置保护用户工程，不提供默认发Agent指令入口。原single-action-basics.mjs为后续对话专项，需用户明确选择范围才执行。

用户现已手动创建并指定“英文30S.mp4”作为后续适用用例的主工程，详见[当前实际基线](../../docs/cases/requirements/ERYE-196/user-project-baseline-20261106.md)。此模式复用已打开的[持续窗口](interactive.cjs)，通过[user-project.mjs](user-project.mjs)在当前选中工程提交、回读原任务及截图；不调用`Editor196.fixture`自动克隆，不再次引导到旧控制工程。

提交前核对会话、工程名称、已保存版本及空白输入框，保留实际前置。模块只从Agent发送授权指令，不直接写编辑器保存接口。原run受理后，仅回读该run；未知结果不能重提。窗口继续保留供用户观察和后续用例使用。不同用例仍需核对真实前置，不把独立narration轨当逐句dubbing条目，缺少的BGM等分支明确记为未覆盖。

## B01单动作读取自动化（复用已打开窗口）

[single-action-basics.mjs](single-action-basics.mjs)已接入基础清单B01。使用`interactive.cjs`现有的`page/context`执行，不调用Playwright默认浏览器fixture；不新开窗口、不新建/克隆工程、不直接保存工程内容。固定目标是用户创建的英文30S.mp4，提交前核对会话、名称、保存版本2、独立旁白、13条字幕及空白输入框；变化时停止，不能覆盖新内容或直接改预期版本绕过检查。

通过现有持续窗口的`action: run`调用：

```js
const module = await import('file:///C:/Users/chen/Documents/ChatGPT/cinlink/tools/editor/single-action-basics.mjs');
const result = await module.runB01({
  page, context, fs, path,
  report: path.resolve('reports/editor-196/本轮独立批次'),
}, { onProgress: value => console.log(JSON.stringify(value)) });
return result;
```

真实发送完整提示词“查看当前工程的素材、音轨、字幕和时长。”仅一次，回读原run，检查真实读取工具、回复中的视频时长/旁白/原声静音/13条英文字幕及前后内容和版本。随后刷新同一标签页，核对当前工程、内容/版本及没有重复提交。字幕列表使用虚拟化渲染，不能把当前DOM行数当字幕总数。结果、逐项检查、原始任务、前后工程及页面截图留在本机批次目录；Passed/Failed由断言汇总，不以done直接判通过。

同批次创建排他启动标记，即使受理响应未捕获也不重发；先核对原任务。需要补槽时返回原run及截图，由现有窗口填写真实字段并继续，随后只`observe(ctx, 'B01')`回读，终态后调用`finishB01(ctx)`验收，不能重新调用`runB01`提交。浏览器始终保留；本入口不执行B02～B24，也不并入原010～015套件。

## B02单动作视频分割自动化（复用已打开窗口）

同一[single-action-basics.mjs](single-action-basics.mjs)导出`runB02`、`finishB02`，通过持续窗口已有`page/context`执行。只发送“只把当前工程中唯一的视频片段在时间线5秒处分成两段，保留全部视频内容，不移动片段。”一次。使用用户当前工程，不套用旧A20夹具、不新建浏览器或项目，也不自动跑B01或原010联动测试。

先核对当前视频仍为源0开始、时间线起点0、速度1且时长大于5秒的唯一片段，记录完整工程实际内容和当前保存版本。`expectedRevision`必须传入本轮已核对且保存稳定的版本；用户工程若再次变化，提交前停止。不能直接套用历史版本2，也不能清除用户后续字幕修改来“恢复夹具”。

```js
const module = await import('file:///C:/Users/chen/Documents/ChatGPT/cinlink/tools/editor/single-action-basics.mjs');
return await module.runB02({
  page, context, fs, path,
  report: path.resolve('reports/editor-196/本轮B02独立批次'),
}, { expectedRevision: 已核对的当前保存版本, onProgress: value => console.log(JSON.stringify(value)) });
```

断言实际保存结果：原视频变为两段，两段引用同一原素材，源范围在5秒连续、时间线起点0和5秒，播放速度与总内容时长保持。记录字幕/旁白的自然关联变化，不能用独立补改掩盖分割结果。结构通过后，从切点前实际播放到切点后，留两侧真实截图和播放读数；分割失败则记录该抽检未执行，不用原片播放冒充切点通过。仅使用浮点运算精度比较，不设未确认的视听毫秒阈值；帧取整差异须明确记录再按实际规则判断。

终态后回读原工程、刷新原标签页、等待实际工程加载，核对保存结果及没有重提任务。原始任务/前后内容/逐项断言及真实结果截图保存在本机批次目录；任务失败不点重试，补槽沿原run填写后继续，仅`observe(ctx, 'B02')`及`finishB02(ctx)`收尾。

本轮若没有改工程，不执行撤销；若有本例改动，先留证据，再确认未混入后续用户编辑，通过页面撤销一次并回读恢复。检测到其他修改或单次撤销未恢复时停止，不连续撤销、不直接覆盖JSON。恢复作为本例清理记录，不将B20/完整联动用例自动计为通过。窗口保留供用户继续使用。

## B04单动作裁视频片尾（使用当前最新项目）

[single-action-basics.mjs](single-action-basics.mjs)提供`runB04/finishB04`。与B01的历史固定工程分开，B04必须传入本轮已核对的`target: { projectId, conversationId, projectName }`及`expectedRevision`；从当前页面`editor-inspector-<id>`确认实际工程ID，不能只按同名“英文30S.mp4”选工程。复用持续窗口的page/context，不新开浏览器、不创建/克隆项目、不回写旧工程内容。

```js
const module = await import('file:///C:/Users/chen/Documents/ChatGPT/cinlink/tools/editor/single-action-basics.mjs');
return await module.runB04({ page, context, fs, path,
  report: path.resolve('reports/editor-196/本轮B04独立批次'),
}, { target: 本轮已核对的当前工程身份, expectedRevision: 本轮已保存版本,
  onProgress: value => console.log(JSON.stringify(value)),
});
```

前置仅要求当前唯一完整视频源起点0、时间线起点0、速度1且长于3秒；用户已有字幕/音轨保持作为本轮基线，不要求不相关B0。先保留真实片头、保留区及被裁尾段参考画面，恢复播放头并再次核对保存内容/版本后，只发送一次“只裁掉当前工程中唯一视频片段的最后3秒，不另做其他编辑。”。

验收实际源终点减少3秒、源起点/速度/位置保持、仍引用同一素材，记录自然关联变化，回读保存并刷新同一工程。结构通过才核对片头和保留区原视频帧像素及真实截图；画面未能读取需人工复核，不能自动当通过。分割/裁剪失败不拿原片画面冒充裁后效果。比较仅用浮点计算精度，不擅设视听毫秒容差。

启动锁和原run受理记录防止重复提交；收到补槽时沿原任务填写，随后仅observe/finishB04。版本冲突不自动重试。没有内容修改不撤销；若确认仅有本轮单次写入且没有用户后续改动，允许通过页面撤销一次并回读恢复，续接不会再次点击。保留窗口，其他用例不随此入口执行。

## B03单动作视频裁头自动化（复用已打开窗口）

[single-action-basics.mjs](single-action-basics.mjs)导出`b03Spec`、`runB03`和`finishB03`。只使用持续窗口已有的`page/context`及用户创建的英文30S.mp4，不启动浏览器、不克隆工程、不直接保存编辑器JSON，也不执行B04或014组合。

提交前回读当前工程、核对本轮`expectedRevision`及稳定保存内容。默认使用已登记工程；用户另行指定当前打开项目时，传入本轮明确授权的`target`，并通过页面实际工程ID核对，不能把同名工程视为同一工程。要求唯一视频仍为源0起点、时间线起点0、速度1且长于4秒；保留当前字幕手动修改。输入框或编辑器存在用户草稿、保存仍变化、工程/会话不符时停止。不会回写早期版本2或旧夹具。

```js
const module = await import('file:///C:/Users/chen/Documents/ChatGPT/cinlink/tools/editor/single-action-basics.mjs?case=B03');
return await module.runB03({
  page, context, fs, path,
  report: path.resolve('reports/editor-196/本轮B03独立批次'),
}, { expectedRevision: 已核对的当前保存版本,
     target: { projectId: 本轮已授权的实际工程ID,
               conversationId: 当前会话ID, projectName: 当前工程名 },
     onProgress: value => console.log(JSON.stringify(value)) });
```

本轮唯一提示词：

> 先只做一步：在当前工程“英文30S.mp4”中裁掉视频片段开头4秒，暂时不移动片段，也不调整字幕和旁白。

发送前通过真实预览进度条取得原视频4秒参考帧，并恢复原播放头位置。使用实际指针/键盘和控件公布的步长定位，不仅修改DOM值；核对媒体实际时间、就绪状态及原始截图。浏览器允许像素读取时保存视频帧SHA256作裁后首帧对照，不使用AI生成图或改图替代证据。

只发送一次，沿原run等待与回读。检查视频仍来自原素材、源入点变为4秒、源终点/速度保持、片段不额外移动、剩余内容约26.6306秒；保存字幕/旁白等关联变化，不额外发送同步指令补救。只有裁头实际成功才验证裁后首帧与参考帧；未完成则记首帧Not Run，不拿原片播放判通过。边界仅按实际值及浮点运算精度比较，不加入未确认的视听容差；若帧不一致或像素不可读，留原始截图复核，不直接判通过。

终态后记录真实失败步骤、参数及截图，核对保存内容；确认没有用户草稿/后续修改后刷新同一标签页、通过原入口展开编辑器，验证实际工程、保存结果及无重复提交。结果和原始证据仅留本机批次目录，脱敏摘要与必要截图可归档到本需求的独立证据目录。

补槽时记录原run及真实问题/选择值，在已有窗口填写后继续，只用`observe(ctx, 'B03')`及`finishB03(ctx)`收尾，不能再次调用`runB03`发送。排他启动标记在受理未知时也保留，须先回读原任务。无内容改动则不撤销；有改动且能确认仅本次成功写入、未夹入用户修改时只尝试一次页面撤销，恢复不全即停止，不覆盖JSON或连续撤销。此清理不替代B20/B21验收。
