# FWXC-718 生产回归

原问题：背景音乐拖入空白音频区域后松手回到原轨。

本轮生产 app.cinlink.ai、Google Chrome 有头、yabinc18。沿用当天专用项目，每个场景独立干净会话。本轮最终原Failed / 扩散一Blocked / 扩散二Failed；云效❌AI未通过已回读，固定脚本PLAN。

原场景保留T1、X1、X2三个原失败变体：F20翻译配音→配音和字幕→简体中文，T1/X1译文，X2双语；X1/X2导入原附件D并独立放6～18秒。BGM0～20秒仅竖直拖到最后音频轨下方空白，不按修饰键。核同实例/时间/源范围、新轨保存、刷新重开和其他对象隔离。不能只测T1就宣称三变体全部通过；任一原变体复现足以判原问题Failed，未执行变体单列。

扩散一：独立译文工程，先移BGM至新轨，再核原生Undo/Redo及视频与BGM关联/其他轨隔离。

扩散二：独立双语+D工程，新轨BGM与D不混同，切模块刷新核轨道、起止时间、文件和音量保持。

原文、0条评论、9份原始文件及SHA：reports/fixed-regression-20261120-094814/refresh-111920/cloud/FWXC-718。F20 20.00秒1280×720/30fps；D12.00秒48kHz单声道；均完整解码退出0，fixtures/718/source-audit.json。原失败截图已逐项回读。

原提示词：T1/X1「将这条视频翻译成简体中文配音，并显示简体中文字幕。」；X2「将这条视频翻译成简体中文配音，并显示中英双语字幕。」仅用于准备，拖动必须实际原生UI执行。

原验收实际Passed→✅AI通过，实际Failed→❌AI未通过；Blocked/未覆盖保持。官方OpenAPI更新并回读，不自动写评论、上传附件、新单、提交推送Git；README只读。


2026-11-20T11:32:56.636932+08:00 FWXC-718 originalT1 preparation accepted once, productionChrome/yabinc18, CIDbce1bc8c-600f-4479-a15f-a5f20f1a2707. Exact originalF20/shortcut/dubbing+subtitles/SimplifiedChinese/translated-only/prompt retained. Formal cross-track drag and X1/X2/E1/E2 not executed; no duplicate submission.


2026-11-20T11:49:35.751544+08:00 生产Chrome/yabinc18，原附件F20、原翻译配音快捷入口及T1完整提示词。准备126秒完成后，BGM原实例0～20秒，按原步骤仅竖直拖到最后音频轨下方空白并松手（未按修饰键）。松手后BGM仍在同一原轨，未产生新轨；官方页面实际工程GET：R3→R4但轨道数6不变，BGM轨道ID、片段ID、文件、源范围及0～20秒完全不变；刷新重开后R4/完整tracks与松手后精确一致，原问题复现，Failed。X1/X2及独立扩散待执行，不以T1断言它们已覆盖。 本次观察到另一独立变化：视频clip.source_audio新增false，原声linked_video_track_id由视频ID变null。只记录事实，关联语义不明且663已被外部改AI通过，不自动新建缺陷。BGM与视频的原关联字段保持。 继续同一合法修复轮的独立X1/X2扩散，分别新会话准备；不得重复提交原T1。 Cloud sync pending; scriptPLAN, README read-only.


2026-11-20T11:52:43.832721+08:00 FWXC-718 originalT1 Failed; official AI Not Passed updated and GET verified11:49:38. Independent E1=X1 native-F20 translated-only preparation accepted once CID916fa4fb-0c97-4df1-bc46-42ecd61c32c7; D native import at6-18 sec remains pending. E2=X2 will use a second independent bilingual+D conversation. Three independent actual runs mapT1/X1/X2; no double-counted execution.


2026-11-20T12:04:49.854493+08:00 FWXC-718 E1 Blocked: Independent X1 production preparation: nativeF20 translation completed103s, D imported/selected, native media drag did not insert. A single D6-18 preparation edit failed: matching audio tracks only3, no fourth. No D baseline, BGM-with-D core and Undo/Redo not covered; Blocked. No schema/ordinal-fixing resubmission. E2 adjusted before execution to independent bilingual-noD cross-track scenario. Original X1/X2+D not covered, originalT1 Failed unchanged and cloudAI Not Passed retained.


2026-11-20T12:07:27.742323+08:00 FWXC-718 independent E2 bilingual-noD preparation accepted once, CID5636de32-53cf-4c32-ab56-d7642114b4e8; exactF20/nativeChinese+dubbing+subtitles/bilingual/prompt retained. Formal E2 not yet executed. OriginalX2+D remains uncovered, no retry of failed X1 D preparation.


2026-11-20T12:15:44.135570+08:00 FWXC-718 completed original Failed / E1 Blocked / E2 Failed. Independent bilingual noD: preparation completed101s; BGM vertical drag into empty audio region returned to its old track. R2 toR4,6 tracks unchanged, entire BGM track exact, refresh full tracks exact. Failed; X2+D remains uncovered. Runtime additionally reported repeated dubbed segment11.98-15.18 vs8.60-11.50; separate deviation, not a new cloud issue. Original cloudAI Not Passed previously GET verified11:49; no repeat PUT. Evidence reports/fixed-regression-20261120-094814/execution/718-prod-E2-T2-cross-track-audit.json. PLAN, README read-only.
