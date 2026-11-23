# FWXC-516 预发Chrome回归结果（2026-11-17）

【生产环境】【ERYE210-040】删除独立背景音频时，原视频和原声同一范围也被裁剪

最新本轮结果：原回归Blocked、扩散一Passed、扩散二Passed；未覆盖同时段视频保持这一原验收点。历史排队时三项均Not Run。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

历史登录阻塞（现已由Chrome预发yabinc92接续）：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-516；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发原回归前置准备

14:06:41官方OpenAPI确认当前精确已修复且身份匹配。专用工作区项目FWXC-516预发独立音频删除-20261117（project_id=9e0f8371-fb65-4673-b337-780e8c183a0c）原生UI仅创建一次，目录仅4个本例媒体，4文件上传完成并跳过额外分析。原20秒E196-A.mp4与A1-independent.wav均原附件字节副本；两组字幕按原截图/时间恢复，英中SRT的SHA均与原记录精确一致。原WAV头声明流式长度，按实际PCM EOF核得61440帧/44100Hz=1.3931972789秒，文件未改写。完整manifest在fixtures/516-original/manifest.json。

附件case-evidence.json的beforeTracks漏列14秒A1，本轮依原描述及040-before.png中14秒独立BGM准备，再对新工程保存回读；不沿用缺行JSON。按只准备本例相关对象规则，本轮准备视频/原声0～20秒、两组字幕对照及14秒独立A1；正式Delete尚未执行。证据516-project-dialog.txt、project-ready.txt、project-create-submitted.txt、project-created.txt/png。固定脚本PLAN，无云效写入。

前置补充：Agent首次55秒仅定位素材，未导入工程；随后原生UI上传E196-A.mp4一次，真实视频/原声0～20秒，GET工程335ac915-e2e8-450c-a0cb-75e86a0b70d6 revision1验证。尝试save_state补齐A1/字幕前置返回400 INVALID_ARGUMENT（Snapshot input is invalid），GET仍revision1且两轨不变，无副作用；此请求未重发。已在同CID dd7124b7-2488-4e6b-8aa8-78bf8e098bc1提交一次Agent补齐字幕和14秒独立A1的前置续接，当前只回读。目标Delete尚未执行。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Blocked",
  "targetDeleteExecuted": false,
  "conversationId": "dd7124b7-2488-4e6b-8aa8-78bf8e098bc1",
  "projectId": "335ac915-e2e8-450c-a0cb-75e86a0b70d6",
  "actual": "完整20秒视频/原声已导入；两组字幕绑定成功revision2，时间4-6/10-12且源哈希一致。A1独立背景音频插入NOT_FOUND: Target timeline row not found，前置未满足，未按Delete/未验证原修复；无重发。",
  "evidence": [
    "516-O-controls-continuation-terminal-api.txt",
    "516-O-blocked-final-ui.txt",
    "516-O-blocked-final-ui.png"
  ],
  "cloudStatus": "已修复"
}


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "coverage": "执行通过：独立纯音频工程单次Delete及单次Undo；不覆盖同时段视频保持",
  "conversationId": "e18ce6ec-f16f-43d5-a33d-5a88198e087f",
  "projectId": "458637cc-492f-4bb5-970d-6f360b76c59f",
  "actual": "唯一独立背景音频0-1.3931972789115645秒，Delete一次revision1→2仅移除该轨，时长0；Undo一次恢复原片段/轨道/时长。最终API内容精确恢复核验见516-E1-final-audit.txt。源素材metadata回读200。",
  "evidence": [
    "516-E1-before-api.txt",
    "516-E1-after-api.txt",
    "516-E1-after-undo-ui.txt",
    "516-E1-final-audit.txt"
  ]
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "coverage": "执行通过：前置空隙独立背景音频删除/撤销和共享原资产、另一工程隔离；不覆盖同时段视频保持",
  "conversationId": "6c76b16a-de48-4924-ba91-99e90dedea6f",
  "projectId": "b6a900d4-d9c7-430c-b6b9-fb9c1440467e",
  "actual": "A1纯音频独立新工程，原生拖动主体到4秒保存revision2；Delete一次revision3轨道为空/时长0；保护工程458637cc...revision3整份回读完全不变，共享源file_cloud_b42...metadata200且ID存在。Undo一次revision4，内容精确恢复删除前，A1仍4秒起、源0-1.3931972789115645、总5.393197秒。",
  "evidence": [
    "516-E2-before-api.txt",
    "516-E2-after-api.txt",
    "516-E2-after-undo-ui.txt",
    "516-E2-final-audit.txt"
  ]
}


## 最新结论与执行范围

| 场景 | 结果 | 实际覆盖 |
|---|---|---|
| 原回归 | Blocked | 视频/原声0～20秒、英中字幕对照均已保存；独立A1插入报Target timeline row not found，未执行Delete或Undo，不证明原修复 |
| 扩散一 | Passed | 独立纯音频0～1.393197秒，单次Delete版本1→2空轨/0秒，一次Undo版本3完整content与前置精确一致，源metadata200 |
| 扩散二 | Passed | 另一独立纯音频工程，原生拖至4秒；Delete版本2→3空轨，保护工程整份回读未变且源ID仍存在；一次Undo版本4完整content恢复，仍4秒起/总5.393197秒 |

两扩散仅验证独立音频删除、撤销、前置空隙和共享原资产隔离，不替代原例的视频保留验收。14:42:42官方回读FWXC-516仍已修复，未PUT；无评论、新单、附件写入、Git提交推送。原Agent90秒只读阶段intent_fully_satisfied=false，157秒续接为同一前置分阶段执行；失败插入未重发。

证据：[本轮目录](../../reports/fixed-monitor-20261116-135748/)，关键审计516-O-controls-continuation-terminal-api.txt、516-E1-final-audit.txt（undoContentExact=true）、516-E2-after-api.txt（protectedExact=true）、516-E2-final-audit.txt（undoContentExact=true）。固定可重跑脚本仍PLAN；正式ERYE210-040不标完整Passed。
