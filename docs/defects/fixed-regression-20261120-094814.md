# 2026-11-20 手动回归执行

本轮最终结果（生产环境 / Google Chrome 有头 / yabinc18）：实际处理6项，原验收通过1项661，失败2项718、720，阻塞3项662、568、484；另25项在首次业务前已被外部改为非“已修复”，未新开执行，不计本轮通过。初始29项加后入718/720，共31项。

| 缺陷 | 原验收 | 扩散一 | 扩散二 | 本轮云效处理 |
|---|---|---|---|---|
| FWXC-661 | Passed | Passed | Passed | ✅AI通过，官方更新后回读 |
| FWXC-718 | Failed | Blocked | Failed | ❌AI未通过，官方更新后回读 |
| FWXC-720 | Failed | Failed | Failed | ❌AI未通过，官方更新后回读 |
| FWXC-662 | Blocked | Failed | Blocked | 原问题未覆盖，保持已修复 |
| FWXC-568 | Blocked | Failed | Failed | 原问题未覆盖，保持已修复 |
| FWXC-484 | Blocked | Blocked | Blocked | 原问题未覆盖，保持已修复 |

阻塞边界：662原起止秒输入框当前没有呈现；568严格要求6段实际配音，本轮原生生成3段，两个独立三段配音删除分支实际失败但不冒充原场景；484三个独立会话均缺原底部审阅剪辑按钮，刷新和面板切换已执行，原点击返回未覆盖。Blocked不是通过。718/720其他原变体、带独立D音频保护仍有未覆盖分支，未声称全变体通过。

624于13:55:36首次业务门禁已为外部✅AI通过，未执行本轮业务或账号退出。用户仅授权当前yabinc18，未用单账号或匿名态冒充U1→U2原场景。

最终13:56:17官方完整分页544条（200/200/144），陈亚宾且精确已修复仅662/568/484三项，详情与12:30快照完全相同，没有新修复版本或待新开项；本轮结束并释放执行锁，定时安排不变。不能称所有严格原场景均已验收。

具体逐项状态见[生产用例矩阵](../cases/regression-results-20261120-production.md)。原始证据及最终快照位于`reports/fixed-regression-20261120-094814/`，机器汇总`final-summary.json`。各项固定脚本PLAN；不写云效评论/新单，不提交或推送Git，统一入口README只读。

以下保留本轮过程记录：


2026-11-20 09:48用户直接要求执行一遍回归，已恢复预发Chrome串行控制。官方完整分页544条，项目已修复38、陈亚宾29，修复证据与上轮未变。先续跑23未提交项；6旧Blocked本轮另核阻塞是否可解除，不能把旧结论算新实测。当前661以获准同画面30.70秒1280x720源，经原生翻译配音快捷入口、中文/双语一次提交，CID 6143816e-cf4f-4eb0-bb8d-d26b350ced5e，等原请求终态；旧生产30.63秒1920x1080差异保留。账号实际账户页核为yabinc92；专用19日项目需原文件夹重授权，20日新建项目也要求文件夹，未改权限，当前新会话页面实际显示未分组，工程归属待回读，不冒称新建项目完成。

原/两扩散分开判定；不重发已受理请求。原实测Passed/Failed才官方更新AI状态并GET，Blocked保留。沿用当前自动任务范围不写评论/新单/附件，不提交Git；README只读。


2026-11-20T10:08:23.313158+08:00 用户最新要求“要在生产环境回归”。本轮从预发改生产，账号yabinc92/Chrome；661预发准备134秒已完成，run run_v2_0bf70cefb42b43b1833acebce653a8da、CID6143816e-cf4f-4eb0-bb8d-d26b350ced5e，原清空及两扩散尚未执行。预发记录保留且不算生产通过；所有新生产场景独立干净CID，首次业务前再次官方GET精确已修复。保留仍有效工具访问限制，不访问此前已被明确禁止的生产URL。


2026-11-20T10:13:55.011358+08:00 用户确认本轮生产使用当前yabinc18。新生产清单29条均NotRun，具体用例docs/cases/regression-results-20261120-production.md，生产独立进度reports/fixed-regression-20261120-094814/production-progress.json；预发661准备保留，不混算。


2026-11-20T10:25:09.446059+08:00 Browser tool explicitly stopped this session because Computer Use is not allowed on the current URL, including user navigation. Stop browser operations; no alternative browser, tab, or tool bypass. Production661 preparation was submitted once; terminal is unknown. Resume by reading the original accepted request only after access is permitted; never resubmit. Report: docs/defects/FWXC-661-retest-20261120-production.md. Production29: no new Passed/Failed, no cloud writes.


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
