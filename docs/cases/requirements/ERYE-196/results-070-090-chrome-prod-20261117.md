# ERYE196-070～090 Chrome生产执行（2026-11-17）

<!-- E196-5-REVISED-RERUN-20261117 -->
2026-11-17优化后071/076/088/089/090 Chrome生产重跑：已登记5/5，{"Blocked": 4, "Passed": 1}；优化后5条已重跑：089 Passed，071/076/088/090 Blocked；本轮6个已受理任务已核验终态，20秒原稿content完整保持、网络恢复无限速；未写云效。脚本PLAN/空路径；未自动写云效。[本轮报告](results-revised-five-chrome-prod-20261117.md)。
<!-- /E196-5-REVISED-RERUN-20261117 -->

<!-- E196-5-BLOCKED-REV-20261117 -->
2026-11-17按用户要求优化ERYE196-071/076/088/089/090：分开上传/处理/就绪、真实源失效/恢复、取消竞争/账务、三类失败恢复、幂等创建/结算分支。已完成分支可复用，仅阻塞依赖步骤；原验收目标保留。新版5条待重跑，历史Blocked和8P/8F/5B实测不变，固定脚本PLAN/空路径；此次无生产、云效或Git写入。[分步计划](blocked-step-plan-071-076-088-089-090-20261117.md)。
<!-- /E196-5-BLOCKED-REV-20261117 -->

<!-- E196-SUBSEQUENT-SYNC -->
后续同步：2026-11-17 ERYE196-070～090失败缺陷同步：已核验8/8，073→FWXC-637，077→FWXC-638，080→FWXC-639，081→FWXC-641，083→FWXC-642，084→FWXC-643，086→FWXC-644，087→FWXC-645。448条去重后新建；截图/正文/字段通过官方OpenAPI回读，测试结论与PLAN/空脚本保持。[同步报告](../../../defects/ERYE196-070-090-sync-prod-20261117.md)。下文无云效写入指原业务实测阶段。
<!-- /E196-SUBSEQUENT-SYNC -->

环境：https://app.cinlink.ai/；独立有头系统Google Chrome，经项目已有Playwright接入。原生CUA接口本轮不可用，未将其他浏览器结果充当Chrome执行。固定脚本PLAN、script为空；临时辅助取证不计脚本已实现。070按本轮要求重跑，旧通过证据保留历史。

本轮21条均已登记：8 Passed、8 Failed、5 Blocked。阻塞项只保留已实际执行的分支，剩余步骤及前置列于文末。
当前检查点：070～090本轮全部21条已登记：8 Passed、8 Failed、5 Blocked；074已自然过期续签补测通过；所有已受理任务终态已核验，无待重发任务；固定脚本PLAN/空路径。

登记校验：`npm run cases:check` 实际通过，543条用例、issues=0。

| 用例 | 本轮状态 | 实际结果 |
|---|---|---|
| ERYE196-070 | Passed | 登记不改时间线；显式页面拖放后仅追加30～50秒视频及原声，刷新保持。 |
| ERYE196-071 | Blocked | 上传未完成时素材未进入可放置列表；服务端处理中分支缺可控暂停窗口，未覆盖。 |
| ERYE196-072 | Passed | 约11%断网并关页，重开重选相同文件后仅一个完成素材，规格20秒/1280×720。 |
| ERYE196-073 | Failed | 损坏文件被提示拒绝，但刷新后整个媒体列表无法加载；元数据批量读取持续报损坏字节错误。 |
| ERYE196-074 | Passed | 真实签名链接自然过期403；重新鉴权两次定位均还原同一原文件，素材列表不增。 |
| ERYE196-075 | Passed | 移除当前时间线视频后，历史导出仍可下载且SHA256一致，已撤销恢复。 |
| ERYE196-076 | Blocked | 缺真实失效且已有可恢复文档备份的源资产，未执行云端缺轨导出。 |
| ERYE196-077 | Failed | 原完成结果仅列读取步骤，未形成三项修改及对应结果摘要/定位。 |
| ERYE196-078 | Passed | 历史成片与当前预览文字/水印分别正确；字体配置切换生效。 |
| ERYE196-079 | Passed | 实际AAC对照测得BGM降低6.027dB，原声增益比0.9977。 |
| ERYE196-080 | Failed | 预览资源失败后文档保留并可刷新恢复，但仅显示无法加载媒体，无原因/重试与保存状态说明。 |
| ERYE196-081 | Failed | ProRes导入后重开编辑器出现页面错误；云端同源代理可生成播放，未回填工程。 |
| ERYE196-082 | Passed | 实际交付1080p H.264/AAC MP4可完整解码，页面说明720p导出后放大。 |
| ERYE196-083 | Failed | 独立混音WAV与当前原文SRT正确交付，译文通道未绑定且未交付。 |
| ERYE196-084 | Failed | 导出期间可改文且旧/新成片隔离正确；列表缺“较早版本”标识。 |
| ERYE196-085 | Passed | 已受理导出在关页后完成，返回原会话自动恢复结果卡并可下载。 |
| ERYE196-086 | Failed | 账户菜单及工程界面未提供任务中心和按工程过滤的任务列表入口。 |
| ERYE196-087 | Failed | 实际导出处理期间没有取消入口；排队取消分支未覆盖。 |
| ERYE196-088 | Blocked | 缺导出取消入口及可控近完成窗口，取消竞争终态/账务分支未执行。 |
| ERYE196-089 | Blocked | 已验证发送前网络失败后显式导出成功；服务端failed/cancelled重试缺真实前置。 |
| ERYE196-090 | Blocked | 相同幂等键重放3次均返回同一任务；预留与扣费流水缺入口。 |

## ERYE196-070：Passed

新20秒视频经媒体导入登记完成，未自动放置，原工程30秒不变。Agent追加尝试报无唯一live editor（另留证据，不据此否认后续页面业务结果）；随后从新素材卡明确拖放到视频轨末尾，初次立即快照尚未反映，后续真实状态为视频及原声各新增30～50秒一个实例，原A/B、两字幕和BGM范围不变。刷新重开后仍50秒、仅3段视频/3段原声。满足070页面登记/放置分离目标；不把Agent路径算通过。

证据：070-registered-no-placement.png；070-agent-no-live-editor.png/.txt；070-reloaded-50sec.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-071：Blocked

本轮真实40MB上传在慢速网络下停留约10%～11%，工程50秒与原片段保持，未完成素材未出现在媒体卡列表，不能把已保存旧工程仍可导出误判为待传素材可导出。随后按072中断并关页。当前入口未提供暂停服务端媒体处理功能，尚未建立实际processing窗口；未提交含未就绪素材的有效导出，整例保留Blocked，非产品失败。

证据：upload-control-recovery.png；072-interrupted.png；072-offline-error.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-072：Passed

40MB有效MP4经真实慢速上传约11%切Offline并报Failed to fetch，关原上传页后新开同会话，重选相同文件恢复。完成媒体卡同名仅1张，视频元数据20秒/1280×720；工程仍50秒，没有自动放置。没有观测分片ID，不声称验证分片复用或服务端哈希。

证据：072-interrupted.png；072-offline-error.png/.txt；072-recovered.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-073：Failed

66字节损坏MP4上传后提示Media type could not be verified from the uploaded bytes.，当时无完成素材卡、时间线未改；此初步负向观察通过。随后正常刷新重开，同项目媒体面板显示无法加载媒体/重试，原有正常素材也不再呈现。实际editor/media仍返回file_id列表，而后续files/metadata返回file_service_unavailable及相同损坏字节提示，多次真实请求均同错。已关闭媒体面板，停止反复读取，不推断损坏资产ID或修改后端数据。最终按错误后未能正常恢复素材使用记Failed；没有把损坏文件成功导出或伪造空白成片。

证据：073-corrupt-completed.png/.txt；073-after-reload-media-failed.png/.txt；media-observed-local.json（本机原始，不外传签名URL）。固定脚本PLAN、路径为空。

## ERYE196-074：Passed

最初因没有已过期定位记Blocked；随后本轮已取得的真实600秒定位自然到期（Expires 2026-11-17 03:05:40Z），原URL实际HTTP403/AccessDenied/Request has expired，Chrome真实错误页截图留存，未改系统时间或篡改链接。重新使用当前登录鉴权，针对原file_cloud_ykd4yo3wcu4twh5twvgyt36oz2申请定位两次，均HTTP200，分别实际读取2,892,809字节，SHA256均441a54e0634901844b32cbc1df28611d12e271ef0bce6f32f6f0df5de73d0ed1，与本地E196-A20-controlled.mp4一致。前后项目files列表完全相同；返回原会话打开编辑器，1280×720原源预览正常，未新建素材或发送生成/编辑批次。此补测消除074原阻塞。

证据：074-expired-request-status.json；074-naturally-expired-link.png/.txt；074-renewal-content-summary.json；074-project-files-before/after-local.json；074-preview-restored-after-renewal.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-075：Passed

只在本批专用会话的20秒工程选择视频片段并Delete，确认视频从时间线移除；未删除项目素材或其他工程。历史5张导出卡仍保留，实际重新下载最早R0成片075-history-after-remove.mp4，与原082-baseline-export.mp4逐字节SHA256一致，文件未被回收或改写。随后通过真实撤销按钮恢复20秒视频及关联原声，字幕、水印、BGM保留。当前无必要执行永久素材删除/清理，未把未执行的永久清理算通过。

证据：075-removed-timeline-video.png/.txt；075-restored-video.png/.txt；075-history-after-remove.mp4；082-baseline-export.mp4。固定脚本PLAN、路径为空。

## ERYE196-076：Blocked

已检查正常20秒工程及可用源，073损坏上传被拒绝且未进入有效时间线，不能充当本例已经使用后失效的资产。浏览器断网只影响本机，不证明云端源不可用；不删除生产共享素材或伪造失效ID。没有真实失效源/重关联恢复夹具，预览和导出负向分支未覆盖。

证据：074-076-preconditions.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-077：Failed

原合法批次请求137秒显示已完成，展开只有读取编辑器视图和检查编辑项目，没有三项编辑步骤或结果；同步前已只读回看同一原完成卡并补图。原077-completed-no-edits截图记录当时空字幕、仅视频及原声的工程现场，不单独作为137秒终态证据。后续独立手动拖放SRT和BGM、填写水印及单项字幕准备不算原批次成功；当前用于后续用例的手动基线另存077-manual-baseline。没有把这些单独写入合并成一次批次的通过证据。

证据：077-prompt.txt；077-completed-no-edits.png/.txt（初始/当时空字幕现场，不单独证明完成终态）；077-sync-review-completed137-readonly.png/.txt（只读补核原137秒完成卡）；077-manual-baseline.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-078：Passed

保存R0=Welcome+E196-R0（Geist28）并导出，实际5秒帧正确；随后C1改为084新版字幕、水印E196-R1并保存，新成片同一时间显示新版。进一步在水印控件将字号28改32、字体Geist改Noto Mono，时间轴定位5.20秒，预览显示084新版字幕及E196-R1，字体/字号控件与画面同步。历史成片仍为原文字和水印，没有新旧混用。按可见保存内容及历史成片验收，不宣称内部缓存键/配置版本字段已核验；声音专项另见079。

证据：082-frame-5s.png；084-old-5s.png；084-new-5s.png；078-current-font-preview-5s.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-079：Passed

通过背景音乐片段音量线将100%拖至50%（UI以整数百分比显示，约-6.02dB），独立原声保持100%。下载实际0dB基线082-baseline-export.mp4和50%版079-bgm50-export.mp4，各20秒；完整解码音频，按原声对齐后以原声和独立BGM双源最小二乘分析，BGM增益0.99943→0.49935，比0.49963即-6.02697dB，原声增益比0.99769，未误降。残差RMS约0.0014，记录AAC有损影响；本工程无配音，未冒称验证配音音轨。

证据：079-gain50-original100.png/.txt；079-gain-state.json；079-bgm50-export.mp4；082-baseline-export.mp4；079-audio-analysis.json。固定脚本PLAN、路径为空。

## ERYE196-080：Failed

在隔离Chrome标签页回读已保存工程后，仅撤销当前预览blob URL并重新加载媒体，真实浏览器返回MEDIA_ELEMENT_ERROR/Format error（code4）。编辑器显示无法加载媒体，当前字幕、水印、时间轴仍在，但没有解释编辑已保存/预览失败原因或局部重试入口。刷新该标签页后媒体重新加载成功，字幕/音量/水印保留，未重发编辑批次。此为本机预览资源失效注入，不是云端合成故障，不宣称服务器故障分支通过。前后真实文档快照留存；同期083导出任务独立执行且未重发。

证据：080-saved-before-preview-failure.png/.txt；080-preview-resource-failed.png/.txt；080-preview-restored-after-reload.png/.txt；080-saved-doc-before-local.json；080-saved-doc-after-local.json。固定脚本PLAN、路径为空。

## ERYE196-081：Failed

同项目独立会话0ef56036使用4秒1280×720 ProRes MOV。原生canPlayType为空，原附件显式播放仅时间推进、视频宽高0且解码帧0，未自动播放，不把自动播放限制误判。通过视频编辑器选择该源后，再打开编辑器实际显示页面暂时无法显示/重新加载。恢复会话后只对同一file_cloud_5zpuh3t3eknegcuyvf6jg4gjgz请求云端代理，93秒完成，实际下载081-cloud-proxy.mp4为4秒1280×720 H.264/AAC、120帧完整解码；Chrome显式播放16帧以上、1280×720，证明云端可处理。页面明确代理预览未回填当前工程。原源仍以同一file_id/文件名/26,861,020字节提供访问，登记SHA256与本地ProRes一致；末次定位HTTP200，未把代理替换为原源。末次全文件下载超时，未声称重新测得全文件哈希。整体因编辑器错误且代理未回填恢复预览Failed；云端代理分支通过。

证据：081-registration-prompt.txt；081-original-prores-open.png/.txt；081-explicit-play-original.png/.txt；081-editor-after-prores-import.png/.txt；081-cloud-proxy-prompt.txt；081-cloud-proxy-completed.png/.txt；081-cloud-proxy-playing.png；081-cloud-proxy.mp4；081-source-preservation.json。固定脚本PLAN、路径为空。

## ERYE196-082：Passed

Chrome原生“导出”直接提交当前20秒工程，不提供分辨率菜单，原生成片1280×720/H.264/AAC。随后经页面Agent明确请求1920×1080，实际工具链导出→调整尺寸→转码→探测，126秒完成，页面如实说明先720p再放大及20.01秒时长。下载082-1080-upscaled.mp4，实际1920×1080、30fps、H.264 Main/AAC 48kHz双声道，完整解码成功。5.2秒实际帧含084新版字幕和E196-R1，未混旧版。按已支持真实业务结果通过，不宣称原生1080渲染或无损提升，音频增益专项另见079。

证据：082-agent-completed.png/.txt；082-baseline-export.mp4；082-1080-upscaled.mp4；084-new-5s.png。固定脚本PLAN、路径为空。

## ERYE196-083：Failed

128秒完成任务，仅交付ERYE196-083-当前时间线混合音频.wav和当前原文字幕.srt，页面明确说明未见独立译文通道绑定/导出结果，未交付译文SRT。实际音频48kHz PCM16双声道、20秒、完整解码，双源分析原声增益0.99934、BGM0.50001，符合当前50%混音；WAV由可见音频卡真实blob读取，卡片无单独下载按钮，未把点击文件名当下载成功。原文SRT已实际下载，084新版字幕4.267～6.267、Second caption10.267～12.267正确。请求已提供项目译文文件和允许只绑定独立通道的完整步骤，未补造译文或拿原始附件替代。保存工程revision13前后完全一致，无原文覆盖。三项交付缺译文，整体Failed，已通过分支单列。

证据：083-prompt.txt；083-completed-missing-translation.png/.txt；083-mixed.wav；083-current-original.srt；079-audio-analysis.json；083-messages-local.json。固定脚本PLAN、路径为空。

## ERYE196-084：Failed

在Welcome+E196-R1已保存时点击导出，显示正在导出期间将C1改为084新版字幕并保存，编辑未被锁。原任务1dcc5a3a-e56c-4061-8c88-5beee778a4fb的实际下载084-old-export.mp4在5.2秒仍为Welcome+E196-R1；随后新导出/放大成片082-1080-upscaled.mp4同时间为084新版字幕+E196-R1。旧任务内容冻结分支通过，但页面旧导出卡片仅显示export/已完成/1280×720，没有较早版本提示或与当前稿差异标识，按完整预期Failed。未用最终任务回填HTTP200冒称服务端创建受理时间，实际导出中的截图和两份文件作为证据。

证据：084-before-export.png/.txt；084-edit-during-export.png/.txt；084-old-export.mp4；084-old-5s.png；084-new-5s.png；082-agent-completed.png。固定脚本PLAN、路径为空。

## ERYE196-085：Passed

导出创建HTTP200返回pending及任务3fb4ef3c-dc85-4c9c-8ffa-7d8745873bf1；页面仍显示正在导出时截图并立即关闭，保留另一会话a9a99d8f。后台只读任务查询done，project_id仍为原编辑工程a2efb5d2，PB未被覆盖、未被抢焦点。返回原会话520159ef并等加载完成后，由4张视频卡增为5张，自动出现该导出已完成卡；实际下载085-after-close-export.mp4成功。原工程20秒、新字幕/水印/NotoMono32和BGM50%保留。按真实会话恢复入口通过；独立账户任务中心入口缺失另记086，未伪称已存在。首次079任务在关闭前已完成，不计本例关页分支；本例另建明确pending任务且未重发。

证据：085-running-before-close.png/.txt；085-PB-during-PA-export.png/.txt；085-return-loaded.png/.txt；085-create-response-local.txt；085-recovered-task-local.json；085-after-close-export.mp4。固定脚本PLAN、路径为空。

## ERYE196-086：Failed

已实际检查Chrome生产工作台/会话工程及账户菜单，账户菜单只有升级、积分、语言、设置、联系我们、退出登录；会话只有各自的执行/产物卡，没有账户级任务中心或工程任务过滤入口。已有原PA完成导出和当前PB任务作对照；本项仅就需求明确的可见入口缺失判Failed，未声称已验证所有等待/处理导出状态或服务器任务查询。

证据：086-sync-review-account-menu.png/.txt（同步前只读补核；原086-account-menu.png场景不符，未采用）。固定脚本PLAN、路径为空。

## ERYE196-087：Failed

两次真实页面导出（原30秒及独立20秒工程）均观察到正在导出…状态。检查工具栏、当前会话导出卡及账户入口，没有针对该导出的取消操作；不能用无关Agent停止任务按钮代替。仅就处理中导出的可见取消功能缺失判Failed；未构造服务端排队任务，不声明排队取消或正在取消终态已验证。

证据：082-export-pending.png/.txt；084-edit-during-export.png/.txt；086-sync-review-account-menu.png/.txt（同步前只读菜单补核）。固定脚本PLAN、路径为空。

## ERYE196-088：Blocked

已观察真实导出处理和完成产物，但087中没有该导出的可见取消入口，也未取得真实近完成百分比或已发布收费流水对照。未重放取消请求、不构造假成功/取消终态；待真实取消能力/可控任务前置再核验。

证据：082-export-pending.png/.txt；084-edit-during-export.png/.txt。固定脚本PLAN、路径为空。

## ERYE196-089：Blocked

拆分执行：在原20秒工程对一次真实editor_export网络请求于浏览器发送前abort(connectionfailed)，确定未到服务端。页面显示执行请求结果未知，请使用原请求确认，勿重复发起，未伪造服务端failed。解除拦截并人工明确点击导出，新任务970fba67-ae83-4a14-82c7-eeedcf4cdeae受理pending，随后完成，下载089-explicit-retry-export.mp4；前后工程revision13及content完全一致，无重执行编辑或换源。此独立发送失败恢复分支通过。已取消任务因087缺取消入口未取得，且没有可恢复的服务端渲染failed任务/故障注入，原用例两种终态重试分支Blocked，不以浏览器断网冒充后端失败。

证据：089-submission-network-error.png/.txt；089-explicit-retry-running.png/.txt；089-explicit-retry-completed.png/.txt；089-explicit-retry-result-local.json；089-explicit-retry-export.mp4。固定脚本PLAN、路径为空。

## ERYE196-090：Blocked

已从真实Chrome导出创建抓取/cloud-tool-api/mcp/editor的editor_export请求，保留原idempotency-key、请求体及工程revision，额外重放3次，均HTTP200返回相同任务3fb4ef3c-dc85-4c9c-8ffa-7d8745873bf1、done，无新task_id，幂等返回分支通过。实际积分入口仅进入价格/充值弹层，未提供按任务的预留/扣费账本；不能以余额或同task_id证明只预留/扣费一次。余下账本核验Blocked；不重放/runtime会话卡登记接口替代创建，不推测免费额度。

证据：090-replay-summary.json；090-replay-1/2/3-local.json；090-credit-modal-no-ledger.png/.txt；085-create-request-local.json（含凭据，仅本机）。固定脚本PLAN、路径为空。

## 证据与续跑

本批原始证据目录：[reports/erye196-070-090-chrome-prod-20261117](../../../../reports/erye196-070-090-chrome-prod-20261117/)。上文文件名均相对此目录。带local的网络原文可能含临时定位或凭据，仅本机保留，不直接作为公开缺陷附件。截图为真实现场，视频/音频为实际产品交付。

| 阻塞用例 | 已完成独立步骤 | 待满足的前置与下一步 |
|---|---|---|
| 071 | 真实上传中不可放置、时间线未改；072中已恢复完成 | 提供可控服务端处理中素材；在处理中验证放置/导出防护，可用后只添加一次。 |
| 076 | 正常源与保存稿已备份；损坏上传未冒充有效工程源 | 提供可恢复的真实失效源；分别验证预览、阻止缺轨导出，再重关联并重试。 |
| 088 | 处理中导出与实际完成产物已取得；087缺取消入口已单列失败 | 有效取消入口、可控近完成任务及其账务查询；再测取消/完成竞争和最终计费。 |
| 089 | 发送前网络失败→解除故障→明确点击导出完成；原稿完全一致 | 真实服务端failed、cancelled任务各一份；在对应原任务明确重试并核对版本/归属。 |
| 090 | 原幂等键额外重放3次，均同一task_id | 提供按该task_id查询的预留/扣费流水；核对只有一项预留与实际扣费。 |

## 前置与边界

首次保存的旧storageState已失效，用户在独立Chrome完成登录yabinc92。初次控制等待超时导致临时窗口关闭，070上传是否成功未知，未登记产品终态；已切换可重连的独立持久化Chrome，登录后先核对上传记录，避免重发。没有因此判产品失败。

资产失效、服务器处理暂停、历史版本或幂等标识等须先有真实入口/真实请求。缺前置按分支记录，不能伪造不可用资产或收费结果。已确认需求功能缺失则Failed。当前不自动提交云效或Git。
