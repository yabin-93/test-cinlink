# FWXC-527 Chrome预发回归（2026-11-17）

**原回归 Passed / 扩散一 Passed / 扩散二 Passed，执行通过。** 账号yabinc92，Google Chrome原生有头，预发staging-app.cinlink.ai。配音面板同时展示原文和目标语言配音文案，原/中文20秒/日文20秒分别18/8/8组。官方状态已设为**✅AI通过**，19:53:56最终GET确认，无重复状态写入。固定可重跑脚本仍PLAN，本轮为CUA执行和只读核验；无云效评论、附件、新单或Git提交推送。

## 原回归

原证据描述为空模板，实际按保存的原截图恢复：首页翻译配音卡片，7MB.mp4、60.50秒、1280×720，英文女士演讲，目标中文、配音和字幕、双语显示。当前卡片chip为“翻译视频”，实际发送正文自动加前缀，与原截图完全相同：

> 翻译配音：翻译这条视频，让表达自然流畅

本机7MB.mp4为7815126字节、SHA256 9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96，文件名、时长、规格及实际画面与原截图匹配。原证据无源文件hash，不声称历史cloud file_id相同；本轮源file_cloud_zquu6agl4hjy5eyplmfrfxv4ji。素材溯源见fixtures/527-original/manifest.json。

提交前19:34:51官方GET确认已修复，creator/project校验通过。项目939901a0-a4bd-4180-877b-30ddcdd195b4，会话918a109c-83a8-40bb-a530-6d49aea0449b，工程bb6a9218-12b6-4d25-8eb7-468892ce55ad。仅受理一次run_v2_27721403073b4f5bbf2e58a758db2ac9，179014ms done/intent_fully_satisfied=true；音频提取、转写、翻译、配音、合成五节点均done。

实际打开编辑器并点击配音面板：18组英文原文与中文配音文案逐句双列显示。首句英文“Efforts to sabotage our healthcare by filing a formal”与对应中文同时可见，不再只有中文单列；所有18组均保存全文回读。原声轨和配音轨保留。原验收点为显示原文/译文，未修改文本、音量，未扩大为全音频或导出质量验收。

保存revision3，完整content SHA256 f71f5d162215b59b4c2feb8ef4923b37d2f0e6d151b9b7250de1ccebb65b1432。两扩散后仍完全相同。证据527-O-before-submit-ui.png、527-O-dubbing-panel-ui.png/txt、527-O-dubbing-pairs-audit.json、527-O-final-api.txt、527-O-project-baseline-api.txt。

19:40状态写入前，云端状态已由别处变成❌AI未通过。本轮从已修复合法启动，按本轮预发实际Passed写为✅AI通过并GET核验；19:53:56最终GET仍为✅AI通过。此次只记录预发结果，不继承或解释其他执行结论。

## 扩散一：独立20秒中文双语及刷新

完整提示词：

> FWXC-527扩散一：仅将本条附件20秒英文 E196-A.mp4 翻译配音为简体中文，表达自然流畅，采用“配音和字幕”并显示双语字幕。保留英文原文与中文译文逐句对应，完成后供我在编辑器配音面板检查原文和译文。只使用本条原文件，不使用其他会话素材，不裁剪、不改画幅。

完整自然语言入口，独立会话8cad4f7a-0ad0-4ca8-813c-529737eb77b1、工程54d1eb46-91f2-42a6-98dc-c00517dd8ba1。E196-A.mp4为20秒英文片段、10274419字节、SHA256 c453166c6396fe1c427c8a045ad2f84a8f5d4e4ff0f905b47d79114172829d15；未复用原合成结果，源溯源见fixtures/527-expansions/manifest.json。

run_v2_66a39df5b1b8475cb0333aba99ad1383仅受理一次，152275ms done。配音面板8组英文原文/中文译文准确双列显示。实际CmdR刷新、重开同一工程后，8组全文完全相同；实际performance navigationType=reload，timeOrigin晚于刷新检查点。revision3及content SHA256 279d5fad3b5d3bf236ff883f8e7608dac3f23b2446a816d30214dad451348210前后完全一致，原7MB工程保持原revision/hash。未再次执行翻译或合成。

证据527-E1-before-refresh-ui.png、527-E1-after-refresh-ui.png、527-E1-pairs-before-refresh.json/after-refresh.json、527-E1-baseline-api.txt、527-E1-after-refresh-api.txt。只读审计途中一次控制台未取得预期回包，恢复后重新GET成功；未重发业务请求。

## 扩散二：独立20秒日文双语及面板切换

首页翻译配音卡片，配音和字幕/日本語/双语；独立会话c00c0564-3fd3-45be-9cdb-e2452d83cd80、工程f9684eb4-154c-4e95-947b-9d04b1ec2519，同一原始20秒素材重新附加，未复用中文结果。正文：

> FWXC-527扩散二：将本条20秒英文 E196-A.mp4 翻译配音为日语，表达自然流畅。采用配音和字幕、双语显示，保留英文原文与日文译文逐句对应；只使用本条原文件，不裁剪、不改画幅。完成后由我检查编辑器配音面板，切换水印面板再返回配音，核验原文与译文保持。

run_v2_2c4f0a4f72de45b4a61c5a1430edff49仅受理一次，163662ms done/intent_fully_satisfied=true。8组英文原文+日文译文双列显示；实际配音→水印Value1→配音Value1切换后，8组全文完全一致。revision3，content SHA256 73259d6103ed86d987bca9a71840ffd97be781bb8cafe30cf325fbab63d31cd2。最终原7MB和扩散一仍为各自revision3及完整原hash，未串改其他工程。

证据527-E2-before-submit-ui.png、527-E2-dubbing-before-switch-ui.png、527-E2-watermark-panel-ui.png、527-E2-dubbing-after-switch-ui.png、527-E2-pairs-before-switch.json/after-switch.json、527-E2-final-protected-api.txt。全部原始证据在reports/fixed-monitor-20261116-135748/。

## 进度

两账本及云端状态回读已同步。43项最新轮原16P/1F/10B/16NR，扩散42P/7F/3B/34NR。NR中8项因当前状态已离开已修复而移出可执行队列；剩余8项：480/462/461/381/379/317/569/517。继续480。固定脚本PLAN，未将CUA实测标为脚本实现。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“✅AI通过”（回读时间2026-11-17T22:04:05.5032680+08:00），本轮原判定仍Passed；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-527/。
