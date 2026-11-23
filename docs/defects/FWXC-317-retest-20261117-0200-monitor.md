# FWXC-317 Chrome预发回归（2026-11-17）

严格原Blocked；扩散一Passed，扩散二Passed（均执行通过）。原五工程当前404且原120.33秒素材/148字幕基线未取得，严格原五个请求未发；两个20秒受控场景不替代原环境/原分支。21:35新轮门禁精确已修复及creator/project验证通过，21:53官方GET仍已修复；本轮0状态写入、0评论/附件/新单，无Git写入。固定脚本PLAN/空路径。

实际环境staging-app.cinlink.ai，Google Chrome原生CUA，yabinc92。专用项目b18ce93b-e7d1-4193-a0ea-887ba9d12055。原描述/提示词按reports/fixed-monitor-20261117-015758/cloud/FWXC-317/description-safe.txt只读复核；原005/006/007/008A/008B五PID均返回404，未回放生产、未在不可用工程上盲发命令。本机指定素材范围/Downloads/Documents未找到张雅婷(Tin)分享的视频.mp4；缺原6.64–7.12 solution.、2.02–2.22 Hello及完整148字幕基线。

扩散素材为已登记受控E196-A20-controlled.mp4（20秒/2892809字节/SHA441a54e0634901844b32cbc1df28611d12e271ef0bce6f32f6f0df5de73d0ed1）及E196-original.srt（88字节/SHA696f515a060a885e438e6e1ecc850d73fb2369026214751f7185bc897e50f49e），SRT两条4–6 Welcome、10–12 Second caption。不是原Tin视频或历史业务结果。两个独立会话/工程分别实际核验原文字幕。

扩散一准备打开后又自动插入媒体，实际rev3为同源2视频/2原声重叠，已如实保存基线；不冒称单轨，不额外修改准备结果。仅字幕单点改文，全部非字幕轨完整比较保持。扩散二准备open返回图片类型错误，但工程和字幕已建立；只通过页面视频编辑器打开现存工程，即实际核验rev2的1视频/1原声及两cue，未重建、重传或重导字幕。

扩散一完整目标提示词：

> 只把当前工程“317-E1明确字幕-20261117”中4.00～6.00秒、原文为“Welcome”的这一条字幕原文改为“欢迎使用 CinLink”，译文、其他字幕、声音和视频不改。

扩散二：页面选中Second caption10–12（AX Value1），完整简短提示词：

> 把这条字幕原文改成引用修复测试

两目标各仅发送一次，runtime终态done，实际保存diff只对应预期block。Chrome真实刷新重开后全文/时间保持；所有非字幕轨、其余属性精确相同，E2结束后E1整个content也保持。E2无需补槽，无clarifications；原006工程澄清分支、原旧目标失效/跨工程A-B分支仍未覆盖，不以短指令成功冒称覆盖。没有新成片导出，验收依据实际页面和保存工程。

### original — Blocked

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Blocked",
  "actual": "已读完整原005/006/007/008场景与提示词。当前yabinc92预发认证下，原005/006/007/008A/008B五工程官方产品GET均404；本机指定素材目录/Downloads/Documents未找到原张雅婷(Tin)分享的视频.mp4 120.33s，不能复刻148字幕及6.64–7.12 solution./2.02–2.22 Hello基线。未向生产重放、未替换原素材或原提示词提交；严格原五run范围未执行，保留已修复。独立20s受控素材扩散不冒称原通过。",
  "evidence": [
    "317-original-project-availability-api.txt",
    "fixtures/317-expansions/manifest.json",
    "317-original-rest-project-availability-api.txt"
  ]
}

### expansion1 — Passed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "806ff286-ccc1-447b-a4ca-19b9e5e36fff",
  "projectId": "26720b5e-8c70-4b50-9f31-a8ba2bd27e61",
  "runId": "run_v2_2435ca1c5a3943d9945bcd15d921c60e",
  "actual": "执行通过。独立20s两cue基线rev3，完整明确目标提示词一次，50406ms done/intenttrue，editor_project_get/editor_subtitle_text_update完成。目标4–6 Welcome改欢迎使用 CinLink，diff仅第一绑定block一条；Second caption10–12及其绑定保持。全部非字幕2视频/2原声轨数据精确相同，canvas/dubbing/watermark/style等其余属性均相同。rev4实际Chrome刷新重开，两目标全文/时间保持。准备实际2V/2A重叠已记录，不冒称单轨或原Tin148字幕覆盖。",
  "evidence": [
    "317-E1-baseline-ui.png",
    "317-E1-baseline-api.txt",
    "317-E1-before-submit-ui.txt",
    "317-E1-terminal-ui.png",
    "317-E1-after-api.txt",
    "317-E1-change-audit.json",
    "317-E1-reloaded-ui.png"
  ]
}

### expansion2 — Passed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "2cdc4361-c6e5-4443-a414-4059bc769965",
  "projectId": "742b8fe4-9573-426a-a537-2c1b41bdc8bf",
  "runId": "run_v2_4c74d1cd233542548786d11d86b1441b",
  "actual": "执行通过。独立20s/1V1原声/两原文cue基线rev2，页面选中Second caption10–12（Value1），简短原文改文请求一次。59165ms done intenttrue，view_get/project_get/subtitle_text_update完成，无clarifications。diff仅第二绑定block一条引用修复测试，第一Welcome4–6及全部非字幕轨和其余工程属性精确保持。rev3实际刷新重开两条全文及时间一致；E1整个content仍与E1完成时精确相同。准备editor_open类型错误后仅页面打开已有工程，保留已导入字幕未重复准备。无补槽出现，不冒称已覆盖原006工程澄清或原C/D分支。",
  "evidence": [
    "317-E2-prepare-runtime-api.txt",
    "317-E2-selected-baseline-ui.png",
    "317-E2-baseline-api.txt",
    "317-E2-before-submit-ui.txt",
    "317-E2-terminal-ui.png",
    "317-E2-after-api.txt",
    "317-E2-change-audit.json",
    "317-E2-reloaded-ui.png"
  ]
}

准备完整请求、逐节点回执、源文件和逐轨差异见reports/fixed-monitor-20261116-135748/317-*以及fixtures/317-expansions/manifest.json。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“✅AI通过”（回读时间2026-11-17T22:04:06.5630350+08:00），本轮原判定仍Blocked；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-317/。
