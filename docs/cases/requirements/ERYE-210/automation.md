# ERYE-210 Chrome自动化

<!-- ERYE210-014-V2-20261116 -->
ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。 [014本轮报告](results-014-v2-production-20261116.md) · [完整用例](case-014-v2-watermark-toggle-production-20261116.md)。下方旧“014唯一门禁”说明为历史。
<!-- /ERYE210-014-V2-20261116 -->

014 v2唯一入口为`tests/editor/erye210-watermark-toggle.spec.ts`，执行函数`tools/editor/erye210-watermark-toggle.ts`。常规回归使用新批次、当前登录账号可读的真实两类水印素材基线；脚本会新建本例项目/会话/工程，仅引用素材，不修改基线：

```powershell
$env:CINLINK_ERYE210_ORIGIN='https://app.cinlink.ai'
$env:CINLINK_ERYE210_CDP_ENDPOINT='http://127.0.0.1:9342'
$env:CINLINK_ERYE210_BATCH='prod-014-v2-新的唯一批次名'
$env:CINLINK_ERYE210_WATERMARK_PROJECT_ID='当前账号含真实视频字幕和两类水印的素材基线工程ID'
npm run test:editor:210 -- --grep 'ERYE210-014 '
```

常规回归不要设置`CINLINK_ERYE210_014_RESUME_DIR`或`CINLINK_ERYE210_DIRECT_FIXTURE_014`。本次03仅为修正观察断言后续验，明确沿01同一新工程；无生成/导出。新版归档入口为`python tools/editor/archive-erye210-014-v2.py`，仅处理本次已完成记录、不执行产品操作。旧批次归档器保留原计数/014保护断言，当前014已替换后不得用旧快照覆盖最新进度。


最后五条的唯一入口为`tests/editor/erye210-restored-five.spec.ts`，版本`v4-restored-final-five-20261116`。004/018/020默认分别从新建原生翻译配音项目准备，不使用普通字幕副本。配置生产Chrome的CDP、登录态、当前账号20秒英语字幕基线、原片及真实独立音频后，用新的唯一批次运行：

```powershell
$env:CINLINK_ERYE210_BATCH='prod-restored-five-新的唯一批次名'
npm run test:editor:210 -- --grep 'ERYE210-(004|005|018|020|041) '
```

本轮01为初次准备及005/041实跑，02为积分调整后各自新建真实译制项目，03仅沿018/020原生工程恢复观察并首次执行目标步骤，没有重新译制。恢复参数`CINLINK_ERYE210_FINAL_FIVE_RESUME_ROOT`或`CINLINK_ERYE210_FINAL_FIVE_RESUME_DIR`只用于检查点确认“前置任务完成、目标未开始”的原工程；常规新回归不设置。不要重放已开始的生成、撤销或原准备任务。缺少可下载工程文件不代表没有可编辑工程，应按原会话实际项目核验。

只归档本次已审核结果使用`python tools/editor/archive-erye210-restored-five.py`，不执行浏览器或云效写入。当前56个唯一入口、55 AUTO及014一个前置门禁；旧11条实现仅保留历史且不注册，原编号全部已恢复。

<!-- ERYE210-RESTORED5-20261116 -->
当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。 [完整定义](case-restored-final-five-production-20261116.md) · [执行/截图](results-restored-final-five-production-20261116.md)。所有原11退役条目已分批按用户要求恢复，旧退役清单仅历史；原结果卡快捷定位、旧审核入口和其他延期分支不计覆盖。
<!-- /ERYE210-RESTORED5-20261116 -->


本轮8条唯一入口：`tests/editor/erye210-restored-eight.spec.ts`；原旧实现只保留历史、不重复注册。配置当前账号的 `CINLINK_ERYE210_SEED_PROJECT_ID`（20秒视频/8条英语字幕）及 `CINLINK_ERYE210_WATERMARK_PROJECT_ID`（含两类水印），以及两个本机真实文件路径 `CINLINK_ERYE210_SOURCE_VIDEO`、`CINLINK_ERYE210_INDEPENDENT_AUDIO`。沿已有生产Chrome的CDP和登录态配置，设置新的唯一批次名后执行：

```powershell
$env:CINLINK_ERYE210_BATCH='prod-restored-eight-新的唯一批次名'
npm run test:editor:210 -- --grep 'ERYE210-(002|007|010|013|015|040|055|056) '
```

本次结果由`prod-restored-eight-20261116-01`及修正后的`02`合并；040在02沿01原新工程继续，未重复导入。`CINLINK_ERYE210_RESTORED_RESUME_040`仅在核对该原检查点后使用，常规独立回归不设置。056只提交一次真实导出，形成错误后验证导航；不伪造错误、不重复原任务。只归档现有结果使用 `python tools/editor/archive-erye210-restored-eight.py`，不会执行浏览器操作。

<!-- ERYE210-RESTORED8-20261116 -->
当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。 [本轮定义](case-restored-eight-production-20261116.md) · [执行/截图](results-restored-eight-production-20261116.md)。原11条退役清单及统计为历史；恢复6条保留编号和原失败/缺陷，010跨账号/设备、007旧映射和002外部素材入口仍延期。
<!-- /ERYE210-RESTORED8-20261116 -->


046/048 v3后续独立回归：设置实际已登录生产Chrome本机CDP、当前账号的20秒英语字幕基线，以及已完成真实翻译配音工程ID；在新批次执行以下唯一入口。脚本新建独立工程，不能用历史任务续验变量重放生成。048也支持用 `CINLINK_ERYE210_TRANSLATED_EXPORT` 指向当前账号真实译制交付的原始工程文件；签名链接与本机私有工程内容不入库。046不使用先清理再重开准备工程的方式，分析/移除/恢复连续在同次页面完成。

```powershell
# 沿本文件已有生产环境、登录态和CDP配置；下面两个ID用本账号实际基线替换。
$env:CINLINK_ERYE210_SEED_PROJECT_ID='<20秒原片及8句英语字幕工程ID>'
$env:CINLINK_ERYE210_TRANSLATED_PROJECT_ID='<已完成真实翻译配音工程ID>'
$env:CINLINK_ERYE210_BATCH='prod-046-048-v3-新的唯一批次名'
npm run test:editor:210 -- --grep 'ERYE210-0(46|48) '
```

本次实测源批次固定为 `prod-046-048-v3-20261116-04`；复核现有结果只运行 `python tools/editor/archive-erye210-current-two.py`，不启动页面任务。历史五例归档脚本遇到v3会停止，防止将046/048恢复成旧Blocked。

<!-- ERYE210-046048-V3-20261116 -->
当前43条：**40 Passed / 2 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run**。046/048 v3生产Chrome实跑2 Passed；014保持原Blocked，047/FWXC-579与049/FWXC-580保持Failed和云效关联。旧二次分析、配音稿修改/单句再生成仍延期，其他41条未重跑。 [完整定义](case-046-048-v3-current-controls-20261116.md) · [本轮结果](results-046-048-v3-production-20261116.md)。048使用真实译制原始工程独立副本，保留真实8句声音和中英字幕；不要求故障配音面板，不触发生成。046在同次真实分析/清理页面恢复。
<!-- /ERYE210-046048-V3-20261116 -->


## 2026-11-16 045～049当前功能v2实跑完成

本批5条：1 Passed（045）、2 Failed（047/049）、2 Blocked（046/048）。当前43条38P/2F/3B/0NA/0NR，014原Blocked保持。默认43个有效入口：42 AUTO、014唯一BLOCKED登记项；实际执行Blocked与登记门禁分开。

5条唯一注册在`tests/editor/erye210-current-five.spec.ts`，助手为`tools/editor/erye210-current-five.ts`，生产Windows有头Google Chrome、本机CDP、单worker、零自动重试。实际命令为`npm run test:editor:210 -- --grep 'ERYE210-04[5-9] '`，后续按单例检查点和真实前置续验；没有重新导出049已受理任务。

047/048必须先经页面“翻译配音”入口创建各自独立的真实工程，选择配音和字幕、简体中文、双语并完成生成。`tools/editor/erye210-translation-shortcut.mjs`负责原生配置/提交及原任务观察；实际完成的视频、工程文件和目标语言文稿是前置证据。初始化后的测试只读取既有配音，不再点击创建配音、不在捕获基线前额外刷新；普通字幕工程或跨会话复制不能替代。历史准备错误和额外创建均已单列，不计产品失败。

通过`CINLINK_ERYE210_DIRECT_FIXTURE_047` / `_048`登记本例新工程的本地位置文件（由准备脚本写出），字段含实际工程/会话/工作区和原run；047还需按正式前置准备并登记14秒独立WAV背景轨。当前实际文件分别为`reports/editor-210/prod-current-five-shortcut-20261116-04/direct047.json`及`reports/editor-210/prod-current-five-shortcut-048-20261116-09/direct048.json`，均只留本机；不能把旧工程当下次新建前置。

真实翻译配音准备使用独立批次目录，环境变量`CINLINK_ERYE210_SHORTCUT_BATCH`指定目录、`CINLINK_ERYE210_SHORTCUT_BOOTSTRAP=1`从原生快捷入口准备、`CINLINK_ERYE210_PREPARE_CASE=048`表示本例；首次会真实生成/计费，已有检查点只观察原run，缺积分或前置不满足要明确记录。`tools/editor/erye210-five-prepare.mjs`只准备20秒原片/英语字幕和水印基线，不再用手工双语字幕制造配音前置。

`CINLINK_ERYE210_FIVE_RESUME_DIR`指向原用例目录并限定单例续验。已经尝试的单句再生成、分析或导出不可重发；049保留原导出任务ID，页面报错且没有可用结果即失败，后台done不代替页面验收。只有实际完成OFF/ON两份导出时才做原始帧/文件SHA256绑定审核。

[完整定义](case-045-049-v2-current-functions-20261116.md) · [本轮执行与截图](results-045-049-current-functions-prod-20261116.md) · [当前进度](execution-status-current.md)。原迁移/旧缓存/回退目标保留[历史](case-045-049-migration-history-20261116.json)，不计新版覆盖。以下为历史时点。

## 2026-11-16 051原场景复测执行

本轮批次prod-051-rerun-20261116-01：独立新工程、生产有头Chrome、单worker零重试，051仓库脚本1 passed。补充刷新后音量线50%和原内容保持核验，没有再次提交Agent。脚本增加本批检查点防覆盖、计划确认防重复、原任务摘要本机留存和实际音量线只读核验；没有新增用例编号，默认仍43入口。当前37P/0F/6B，旧失败保留历史。命令`npm run test:editor:210 -- --grep 'ERYE210-051 '`。[本轮报告](results-051-rerun-prod-20261116.md)。

## 当前九条优化与补齐（2026-11-13）

用户确认优化011/017/019、补齐016/050～054并执行。011/017/019从旧文件移到tests/editor/erye210-completion.spec.ts，新增050～054同文件，016仍在navigation。默认43个有效入口（37 AUTO、6 BLOCKED前置门禁），无PLAN项；退役11编号仍不注册。本轮9条已执行8P/1F（051）；类型检查及43条发现已通过，真实执行状态见当前进度。

[完整前置、输入、步骤及预期](case-nine-optimized-supplement-20261113.md) · [本轮执行与截图](results-completion-nine-prod-20261113.md) · [旧定义和结果](case-nine-optimization-history-20261113.json)。后文011在fields的注册位置、38入口和早期定义均为历史时点。

本轮使用生产有头Google Chrome、本机CDP、同账号已登记只读基线，各例独立新工程；workers=1/retries=0。新场景执行命令：

```powershell
npm run test:editor:210 -- --grep 'ERYE210-(011|016|017|019|050|051|052|053|054) '
```

沿用现有origin/storageState/CDP及SEED/VOICE/WATERMARK配置。011可通过CINLINK_ERYE210_011_SOURCE_SNAPSHOT使用用户60秒原片的只读生成前快照，新场景不会修改用户原工程；默认模板仍使用已登记20秒基线。054的CINLINK_ERYE210_TRANSLATED_CASE_DIR指向本轮成功011检查点目录，引用真实完成结果，仅在独立副本测试，不使用假配音或假字幕。

051/052生成或导出受理后分别保存051-checkpoint.json和052-checkpoint.json。CINLINK_ERYE210_051_RESUME_DIR / CINLINK_ERYE210_052_RESUME_DIR指定原目录续验，禁止删除检查点后重发受理未知任务。052下载原MP4并抽帧，人工审核需生成绑定原MP4和帧SHA-256的052-visual-review.json（marker=BEFORE052、afterMarkerAbsent=true），不审核不记Passed；继续原导出无需点击第二次Export。

017的CINLINK_ERYE210_017_VERIFY_DIR仅用于原生成已完成后的实时页面复核：读取同一工程并核对两句文案、目标新声/第二句旧声和无叠音，不重新生成。原客户端提交失败步骤的截图与结果仍按原批次保留。失败场景和准备/断言修正分开记录，不能靠元数据字段为空直接断言页面丢稿。

## 2026-11-13 退役11条失败用例后的当前范围

用户确认退役002/004/005/007/010/013/015/018/020/040/041，保留现有已通过11条v2、不复用编号。当前有效43条：28P/0F/9B/0NA/6NR；默认38个脚本入口（32 AUTO、6 BLOCKED），另5 PLAN。当前0 Failed不表示原缺陷已修复。

[完整退役清单、原失败及云效链接](retired-failed-cases-20261113.md) · [当前进度](execution-status-current.md)。后文54条/49入口及旧失败为历史统计，按日期和本节区分。原证据及云效状态保持。


## 2026-11-13 当前功能11条v2实跑完成

本批11 Passed / 0 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；54条当前28 Passed / 11 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。使用生产有头Chrome，新工程串行零自动重试。正文中“未执行”指上一轮定义更新时点，当前状态以[本轮报告](results-021-035-v2-prod-20261113.md)和[当前进度](execution-status-current.md)为准；旧v1历史不覆盖新版实测。


## 2026-11-13 当前功能v2定义更新（未执行）

11条（021、025～027、029～035）改为当前功能v2，Not Run；旧Blocked快照保留。045～049仍为真实旧版迁移专项Blocked，不用普通导航替换。当前17P/11F/9B/0NA/17NR；49个脚本入口为43 AUTO、6 BLOCKED门禁，另外5 PLAN。040/041及既有云效关联保持。

[完整前置、步骤、预期及旧范围](case-021-035-v2-current-features-20261113.md) · [当前进度](execution-status-current.md)。

执行新版的定向命令：`npm run test:editor:210 -- --grep "ERYE210-(021|025|026|027|029|030|031|032|033|034|035) "`。脚本v2尚未实跑；旧版局部通过不转入新版。清理使用新工程真实分析，按实际停顿组应用；不需要CWORD/CNOWORD、第二账号或旧缓存。旧版迁移5条门禁仍存在，定向命令不包含它们。


## 021～049本轮自动化与执行（2026-11-13）

当前001～049共49个入口：37 AUTO、12 BLOCKED前置门禁，050～054共5条PLAN。新增`tests/editor/erye210-fields.spec.ts`（021～027）和`tests/editor/erye210-capabilities.spec.ts`（028～049），共享`tools/editor/erye210-runner.ts`。本批18条包含实际页面分支，030～035/045～049的11条只核前置，不称目标业务已经执行。

沿用上文生产Chrome及本账号基线变量，增加`CINLINK_ERYE210_CLEAN_PROJECT_ID`指向真实可读清理基线。复制清理分析过期时028/029/042真实分析；037/038在新工程创建旧声后执行目标。串行、零重试，真实任务可能消耗积分；任务受理未知时保留原任务，不直接重跑。

```powershell
$env:CINLINK_ERYE210_BATCH='prod-021-049-<唯一批次>'
npm run test:editor:210 -- --grep 'ERYE210-(02[1-9]|0[34][0-9]) '
```

037/039可配置`CINLINK_ERYE210_037_VERIFY_DIR`/`CINLINK_ERYE210_039_VERIFY_DIR`指向本机原场景证据目录（location及before快照），只重开原工程核验，不生成/拖动。普通完整新跑前清除这两个变量。报告引用原实际任务和拖动批次，不把只读复核当另一轮生成。

本轮：11 Passed / 2 Failed / 16 Blocked / 0 Not Applicable / 0 Not Run。[逐例结果、边界和截图](results-021-049-prod-20261113.md)。按业务结果验收，不要求存储数组、片段/轨道编号符合某种实现。以下旧批次说明保留历史，以本节和当前进度为准。


2026-11-13最新019 v2执行：Blocked。A1在22秒单删通过；删除前S1/D1引用一致，但单删S1未拒绝，未建立混合工程/执行混合删除。另见14秒A1删除影响原视频/原声的独立观察，未同步云效。当前54条6P/9F/4B/0NA/35NR，016 v2仍Not Run。[本轮完整证据](results-019-v2-prod-20261113.md)。以下定义更新/旧批次为历史。

2026-11-13当前019定义为v2：关联字幕与独立音频混合删除，必须先验证两个单删对照，再用第三个新工程检查整体拒绝及刷新内容。只更新未运行，Not Run；旧019入口探测/N/A仅为历史，不代表排除关联限制。[完整说明](case-019-v2-linked-delete-20261113.md)。当前016/019 v2均Not Run，20个入口仍19 AUTO、014仅门禁。

2026-11-13当前定义：016已替换Windows Chrome v2，脚本包含从缺图片禁用到PNG上传后恢复、参数保存与重开验证；未执行，Not Run。20个入口当前19 AUTO、014仅BLOCKED门禁，021～054仍PLAN。[016 v2完整说明](case-016-v2-windows-20261113.md)。下文016旧门禁及18 AUTO/2门禁计数仅对应历史批次。

2026-11-13：001～020接入[测试脚本](../../../../tests/editor/erye210-navigation.spec.ts)，公共页面操作见[erye210.ts](../../../../tools/editor/erye210.ts)，专用配置[playwright.erye210.config.ts](../../../../playwright.erye210.config.ts)。不并入默认staging；有头Google Chrome、单worker、零重试。008使用已替换的v2。

脚本接入与执行状态分别登记。[最新进度](execution-status-current.md)依据实际证据，脚本存在不等于通过。本次类型检查、10条发现及543条文档检查均通过；用户恢复登录后，001和006已通过仓库脚本在生产Chrome的实跑验证，[实际报告及截图](results-automation-20261113.md)。初次字体等待、登录过期和隐藏图片定位问题已修正，原始日志分批保留；零自动重试，每次修正后使用新测试工程。尚未把全部10条重新自动跑完，008新版已执行Passed，003/004/005未新增任务。

## 运行准备

1. 安装仓库依赖 `npm ci`，确认Google Chrome已安装。使用生产测试账号登录。可以连接已登录Chrome的本机CDP端口；普通未开启调试端口的Chrome不能直接接管。也可用该生产环境专用storageState启动新的Chrome窗口，登录过期须重新登录，不能把缓存文件存在当成会话有效。
2. 登记当前账号在当前环境拥有的基线：普通基线含20秒E196-A及8条真实英语字幕；水印基线另含合法文字和图片；短旁白基线含“欢迎使用 CinLink。”/“这是导航测试。”两条中文译文，时间分别4～6秒、10～12秒。只读取这些基线，目标总是新会话、新工程，禁止跨环境复用素材ID。
3. 配置本地20秒原片路径。002/003检查已登记SHA-256，避免提示词与实际素材不同。004将基线中的旧配音移除，仅在新工程真实生成两句短旁白；005新会话真实分析并只审阅，不自动移除/应用。003/004/005会调用真实服务，可能消耗积分。

```powershell
# 在test-cinlink仓库根目录执行；下列值替换为本环境已核实数据。
$env:CINLINK_BASE_URL='https://app.cinlink.ai'
$env:CINLINK_STUDIO_BASE='https://app.cinlink.ai'
$env:CINLINK_RUNTIME_BASE='https://app.cinlink.ai'
$env:CINLINK_ERYE210_ORIGIN='https://app.cinlink.ai'
$env:CINLINK_TEST_STORAGE_STATE=(Join-Path (Get-Location) '.auth/erye210-prod.json')
$env:CINLINK_ERYE210_SEED_PROJECT_ID='<本账号普通字幕基线工程ID>'
$env:CINLINK_ERYE210_WATERMARK_PROJECT_ID='<本账号文字和图片水印基线工程ID>'
$env:CINLINK_ERYE210_VOICE_PROJECT_ID='<本账号两条中文短旁白字幕基线工程ID>'
$env:CINLINK_ERYE210_SOURCE_VIDEO='<E196-A.mp4的本机完整路径>'

# 若使用已登录且开启调试端口的Chrome，则配置此项，保留原窗口和登录。
# $env:CINLINK_ERYE210_CDP_ENDPOINT='http://127.0.0.1:9222'

# 先检查条目；此命令不会打开浏览器或创建工程。
npm run test:editor:210 -- --list

# 串行执行已具备前置的条目；每次指定新的批次名，保留每次输出。
$env:CINLINK_ERYE210_BATCH='prod-本轮唯一批次名'
npm run test:editor:210

# 也可仅执行指定用例，例如008新版。
npm run test:editor:210 -- --grep 'ERYE210-008 '
```

新窗口登录文件可通过仓库已有`npm run auth`按生产地址准备。CDP模式要求恰有一个目标环境测试标签；使用该页面串行创建测试会话，不操作之前的用户工程。执行后不会关闭外部Chrome。

## 覆盖及前置缺口

| 用例 | 自动步骤 | 边界 |
|---|---|---|
| 001 | 五入口名称顺序、逐页可达、返回Media、完整保存内容不变 | 新建可写工程；不将初次导入异常混入纯导航通过 |
| 002 | 新会话首次UI导入，未手动切页前断言Media，保留首次现场 | 独立外部显式素材入口尚无真实样本；素材预览不替代此分支 |
| 003 | 一次提交真实字幕准备指令，从当前会话首次进入字幕工程，核对独立SRT金标和本次结果绑定，再检查五入口 | 准备任务失败/补槽缺少可确定输入记Blocked，不能手动切Captions掩盖默认入口问题 |
| 004 | 新工程中文短旁白真实生成，先建立Media记忆，从明确结果入口检查Voiceover | 缺少结果编辑入口时Failed；手动切配音不算结果入口通过。只验证已登记两句短旁白导航，不替代完整原片译制 |
| 005 | 新会话真实分析，只审阅，核对首入Scripts，再从Media点击审阅剪辑 | 不点击移除/应用；人工确认状态不是缺参数补槽，不自动确认删除 |
| 006 | 从Captions进入Watermark→文字/图片，检查子页切换及保存内容不变 | 当前真实两级控件；不把时间线片段选择当独立快捷结果入口 |
| 007 | Watermark/Image收起重开、刷新重开，检查记忆及内容 | 旧voice迁移/清除旧新版偏好无真实样本，annotation明确未覆盖，不伪造缓存 |
| 008 v2 | 五模块各自收起/展开，再在收起状态切另一模块，检查正确面板及内容不变 | 与007编辑区关闭、010工程记忆不同；不再依赖失效链接。旧Blocked保留历史，新版Passed |
| 009 | 五入口/可见子页14检查点，12秒、同C1、暂停、内容/版本、消息/导航写请求及前后积分 | 后续刷新只用于获取积分新读数；不扩大为Agent目标写入或账本专项验证 |
| 010 | U1/D1的PA=Captions、PB=Media，工程切换及PB刷新恢复，完整内容不变 | U2/D2没有环境；该部分用coverage annotation登记，不以第二标签冒充第二设备 |

`AUTO`表示已有可运行测试入口，覆盖边界以上表为准，不表示全部分支已自动化或通过。014仅有BLOCKED前置门禁，016已替换为Windows Chrome v2，017～020已有范围限定入口，021～054仍为PLAN。旧版008的异常回退风险留作待准备项，未用新版正向场景声称覆盖。

## 证据、补槽及结果

输出在`reports/editor-210/<批次>/`：每例`result.json`、定位ID、准备提示词/run、过程截图，汇总`execution-status.json`，以及Playwright JSON/HTML。失败自动附真实页面截图，Blocked有具体前置原因，不通过重试改变结果。截图捕获当前页面，不等待可能长期挂起的非业务字体请求；不修改页面或图片。

003/005的完整准备提示词在公共操作文件及每次执行的`*-preparation-prompt.json`。出现可确定补槽，可用`CINLINK_ERYE210_CLARIFICATION_ANSWERS`配置“页面标签→明确值”的JSON映射，脚本填写、截图并继续原任务；没有可确定值会保留原任务与前置缺口，不任意选第一素材或重复发送。实际运行时由执行者在同一有头窗口核对填写后续跑，不把补槽当用例通过。

原始文件留在已忽略的`reports/`、`.auth/`。归档到正式文档前仅复制经过核对的实际截图及脱敏业务数据，不能提交storageState、签名URL或令牌。云效同步仍须按用户明确要求单独执行。


008 v2本轮已通过仓库脚本完成，五模块收起/展开及收起后切页、原8字幕、完整保存内容和版本1→1保持；补查视频帧就绪后原片画面正确恢复；[实际结果与截图](results-008-v2-prod-20261113-04.md)。仅008重跑，其他用例状态保留。


## 007/010生产复测（2026-11-13）

007：Failed，Image重开变Text、刷新变Captions；010：Failed，页内双工程视图分别恢复正确，但PB刷新变Captions。等待页面就绪和恢复轮询后仍复现，工程保存内容/版本不变。旧voice、U2/D2分支仍缺前置，未执行。[本轮结果与截图](results-007-010-rerun-prod-20261113.md)。

## 011～015生产执行与覆盖（2026-11-13）

15个用例入口可发现；14条AUTO、014只读前置门禁BLOCKED。当前真实执行1P/2F/2B，[本轮报告](results-011-015-prod-20261113.md)；不把缺前置记通过。前文10条发现和首次接入验证是历史记录。

| 用例 | 自动步骤 | 边界 |
|---|---|---|
| 011 | PA点击真实创建配音，暂缓一次原请求，切PB/Media再放行，核对PA两句ready和PB内容/视图保持 | 后台隔离通过；编辑器内生成没有建立Agent结果卡，最后卡片定位记Blocked，不按按钮缺失直接报产品失败。修正分类后未再次生成 |
| 012 | 无字幕/配音空态引导，仅浏览，核对完整内容/版本/消息/导航写请求不变 | 不点击生成按钮 |
| 013 | 真实1.346757秒纯音频工程浏览五入口，检查文字/图片水印控件，文字填写并核对持久化 | 文字实际保存Failed；未上传图片，不宣称图片写入已测 |
| 014 | 明确记录真实只读账号与授权样本缺失并skip | 仅前置门禁；只读业务自动化和真实执行均待环境 |
| 015 | Scripts页实际时间线分割：无选择禁用及解释、选中后12秒分割、一次撤销对照 | 缺解释Failed，实际分割和撤销Passed；不覆盖逐字稿选区清理 |

CDP模式请求通过同源页面fetch并携带当前会话；不从外部复制Cookie/令牌，不以独立API客户端401误判浏览器登录失效。011只延迟原请求，未模拟成功响应。现有基线配置沿用，011/013还需要当前账号VOICE工程含两句已核实文稿和真实配音素材。运行本批可使用`--grep 'ERYE210-01[1-5] '`，批次名应唯一；每次会建立新的测试目标，生成可能计费。

## 016～020生产执行与覆盖（2026-11-13）

001～020共20个脚本入口：18 AUTO，014/016仅BLOCKED前置门禁；021～054共34条PLAN。 [本轮报告](results-016-020-prod-20261113.md)按最终证据合并2 Failed / 2 Blocked / 1 Not Applicable，脚本存在不代表所有业务分支已运行。

| 用例 | 脚本步骤 | 已执行边界 |
|---|---|---|
| 016 | 记录mac环境和同一具体操作发布状态对照前置 | 仅门禁，Blocked；无真实对照，不伪造开关 |
| 017 | 新工程旧音频/文稿前置，检查当前生成/重试控件；具备真实控件时才执行一次本浏览器提交网络中断及恢复 | 本轮仅可读及入口检查，缺生成控件Blocked；网络失败/修复重试分支未运行 |
| 018 | 一次真实创建配音，生成期间独立编辑文字水印、五入口浏览，等待音频和检查覆盖 | 独立水印保留，原任务无可应用结果Failed；未确认受限对象细则，不声称锁机制验证 |
| 019 | 当前五入口、时间线及右键操作适用性检查；无相关业务入口时明确not-applicable | 本轮N/A；未提交冲突批次，不声称原子性验证 |
| 020 | 本工程文稿准备并刷新建立基线，改第1句、切页/收起重开、一次撤销，监测不自动提交生成 | 切页/重开保留通过，撤销不恢复Failed；修正复制基线准备后只复核020，未重提018 |

运行本批使用`npm run test:editor:210 -- --grep 'ERYE210-0(1[6-9]|20) '`，原普通/VOICE素材基线配置沿用；批次名必须唯一，真实018可能消耗积分。016使用原用户确认的缺环境事实；014/016脚本门禁不等于完整业务自动化。017只有真实生成控件可用才触发网络失败，不修改服务端或合成成功响应。

最新脚本对018在原任务错误出现时采集错误并结束等待，未因此再次生成；020为防复制工程脚本准备写入干扰撤销，移除旧工程脚本派生配置，保留真实旧音频，等本工程可编辑稿保存后刷新建立基线。脚本将skip按blocked/not-applicable annotation区分，三条skipped不混为同一种业务状态。

## 016 v2使用说明

仅需普通SEED视频工程和生产Chrome登录；图片固定使用仓库`assets/cinlink-smoke-watermark.png`，脚本校验已登记哈希。先从无水印副本检查上传入口及依赖控件，再通过真实文件选择器上传，设置宽度120px/不透明度60%，切页和收起重开核对。运行命令`npm run test:editor:210 -- --grep 'ERYE210-016 '`。本次没有运行目标业务；原发布状态/端侧支持对照留作待准备风险，不以本用例覆盖。

## 019 v2执行入口

沿用`CINLINK_ERYE210_VOICE_PROJECT_ID`指向本账号真实配音字幕基线；脚本只保留已有实际关联，独立A1使用真实WAV准备，不提交新配音任务。准备L/R/M三个新会话及工程：A1单删对照→S1受限单删对照→新工程混合删除。没有真实拒绝或无法唯一定位则Blocked，不能直接因缺锁轨按钮记N/A。运行`npm run test:editor:210 -- --grep 'ERYE210-019 '`；本次未执行，选择器与生产关联规则仍须首轮确认。


## 011 目标语言工程续验（2026-11-13）

011由tests/editor/erye210-fields.spec.ts唯一注册，tools/editor/erye210-011-agent.ts处理真实翻译配音；原navigation中的011入口已移除，默认仍38个有效脚本入口。runner记录明确case-version。已受理原任务只能沿检查点续验，不重发。

本轮使用用户指定项目ad25bc25-b1c6-4105-84b8-1b845b4a4eb5、会话af0d5043-d30d-4a91-ba15-dea074199400的60秒原片，未换素材。PB在原任务running时已建立，检查点保留PA/PB基线、目标语言和原run；脚本续验未再创建工作区、AI任务或改动原提示词。当前2项业务分支通过、结果卡直达定位未覆盖，整例Blocked，不把手动选择工程或播放/下载当作结果编辑入口。

仅本机检查点有效且生产Chrome已登录、CDP地址和账号匹配时，使用如下续验命令。检查点缺失或身份不匹配先核对原任务，不通过移除RESUME变量重发来恢复；原始工程和带签名链接资料不迁入正式文档。

```powershell
$env:CINLINK_BASE_URL='https://app.cinlink.ai'
$env:CINLINK_STUDIO_BASE='https://app.cinlink.ai'
$env:CINLINK_RUNTIME_BASE='https://app.cinlink.ai'
$env:CINLINK_ERYE210_ORIGIN='https://app.cinlink.ai'
$env:CINLINK_TEST_STORAGE_STATE=Join-Path (Get-Location) '.auth/erye210-prod.json'
$env:CINLINK_ERYE210_CDP_ENDPOINT='http://127.0.0.1:9342'
$env:CINLINK_ERYE210_011_RESUME_DIR=Join-Path (Get-Location) 'reports/editor-210/prod-011-user-project-20261113-01/011'
$env:CINLINK_ERYE210_BATCH='prod-011-user-project-续验批次'
npm run test:editor:210 -- --grep 'ERYE210-011 '
```

[完整步骤及提示词](case-011-v2-translation-dubbing-20261113.md) · [本轮结果及截图](results-011-user-project-prod-20261113.md)。


054可设置CINLINK_ERYE210_054_RESUME_DIR指向原054目录，等待页面已同步后再刷新，并明确选择中文通道实时核验；不新建工程或生成任务。017/052/054续验按原result.json工作区归属记录，避免新建无关空壳工作区。
