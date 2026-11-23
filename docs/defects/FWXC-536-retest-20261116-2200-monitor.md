# FWXC-536 回归排队记录（2026-11-16 22:00）

【ERYE237-039】点击输入框批注引用不能定位对应编号或切换浮层

本轮原回归、扩散一、扩散二均Not Run。这是再次修复后的第2轮；此前生产原回归Failed和云效❌AI未通过保留为历史，不代替本轮实测。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

前置阻塞：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-536；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "3a90f599-c93f-457a-840d-1b193b377b47",
  "sourceVersionId": "editor_image_0f2d75cb65d345959c995fbb30d6f9f8",
  "actual": "执行通过：两条引用；首次点击引用A准确打开左耳039/耳朵加耳钉；画布编号B打开右耳机039/耳机加logo，再一次点击引用A准确切回A。无生成。",
  "evidence": [
    "536-R2-O-before.txt",
    "536-R2-O-before.png",
    "536-R2-O-A-first.txt",
    "536-R2-O-A-first.png",
    "536-R2-O-B-open.txt",
    "536-R2-O-A-after-B.txt",
    "536-R2-O-A-after-B.png"
  ]
}


原回归实际Passed后，官方OpenAPI已从已修复改✅AI通过并GET回读verified=true（2026-11-17 10:26:40北京时间）；评论/附件写入0。最新Chrome已核验yabinc92，旧登录待确认不再适用。两扩散继续。


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "e9f7fe84-36c8-4e3f-8cea-6e8b3e99ffca",
  "sourceVersionId": "editor_image_6a424e71ea57458298037c3b91d2e78e",
  "actual": "执行通过：独立单批注单点定位E1/E1定位正文，关闭浮层后一次点击引用，准确打开同一批注及正文，无新增编号或生成。",
  "evidence": [
    "536-R2-E1-before.txt",
    "536-R2-E1-before.png",
    "536-R2-E1-after.txt",
    "536-R2-E1-after.png"
  ]
}


扩散二断点：独立会话138dd334-16fa-4ca0-b1ac-e664067a16fb，准备登记35秒完成。加载图片时连续检测Chrome用户切换，停止输入避免冲突；最后观察export-image.png已选、原生打开按钮可用，最后点击是否执行需重新观察。尚未建立同名批注或执行正式定位，不计通过；不重发登记。


## 扩散二完成

{
  "result": "Passed",
  "environment": "staging",
  "conversationId": "138dd334-16fa-4ca0-b1ac-e664067a16fb",
  "sourceVersionId": "editor_image_33dfced73b5e4fe18f77ebe57d53e06d",
  "actual": "执行通过：两个同名耳机批注正文分别左侧E2/右侧E2；从编号B再点击引用A准确显示左侧E2，反向引用B准确显示右侧E2。工具在写截图阶段超时，重连实际A状态及已有after.txt一致，补齐截图；没有重建批注/重发。",
  "evidence": [
    "536-R2-E2-before.txt",
    "536-R2-E2-before.png",
    "536-R2-E2-after.txt",
    "536-R2-E2-after.png",
    "536-R2-E2-reverse-B.txt",
    "536-R2-E2-reverse-B.png"
  ]
}

R2三项P/P/P；云效✅AI通过已官方回读。
