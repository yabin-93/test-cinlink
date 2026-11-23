# FWXC-485 Chrome预发回归结果（2026-11-17）

【生产环境】【ERYE199-007】刷新重开工程后片段选择清空，媒体面板回到字幕

2026-11-17最新实测：原回归、扩散一、扩散二均执行通过（P/P/P）。实际使用Google Chrome原生CUA、预发staging-app.cinlink.ai、账号yabinc92；原环境为生产，本轮不冒称生产通过。

原回归已于17:18:31通过官方OpenAPI更新并回读✅AI通过；三场景结束后17:34:45官方GET仍为✅AI通过，未重复写入。旧ego登录等待已解除；本轮串行独立准备，已受理任务不重发。仅写状态，无云效评论、新单、附件或Git提交推送。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-485；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "f0fde40c-1b48-4c2e-920b-b83a271b3441",
  "projectId": "12580f3c-122a-4fc3-966a-67579bb6ad3b",
  "coverage": "执行通过：原附件/同轨A0-5 B5-10均源0-5，原生选B及媒体后同CID刷新一次，必要重开同一编辑器，不重新选择/切面板",
  "actual": "刷新前视频B和关联原声B选中，A未选，媒体激活。刷新后编辑区收起，仅点击视频编辑器重开原工程，不重选片段或重开媒体；加载完成B/原声B仍选中，A未选，媒体仍激活。前后均同工程/版本3，同CID仅一个工程，两原video clip ID保持，完整content的规范化SHA256相同ad8c46452bd8682169841fb93eb3000acdcbf64358717825b6087059a7776e2d。",
  "preparationNote": "复制粘贴保存成功；额外恢复视图节点STALE_REVISION、其命令回读NOT_FOUND，均未重试。目标前置由GET版本3和实际UI独立确认满足，138秒前置非全节点通过。媒体入口可折叠，一次误收起已在刷新前恢复，原目标刷新只执行一次。",
  "evidence": [
    "485-O-double-baseline-api.txt",
    "485-O-selected-B-media-before.txt",
    "485-O-selected-B-media-before.png",
    "485-O-before-refresh-final-ui.txt",
    "485-O-before-refresh-audit.json",
    "485-O-reopen-existing-editor.txt",
    "485-O-after-refresh-restored-ui.txt",
    "485-O-after-refresh-restored.png",
    "485-O-after-refresh-api.txt",
    "485-O-final-audit.json"
  ]
}


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "6876f680-8a5f-40f2-8aef-bc91fb538230",
  "projectId": "5e6ab493-55db-4635-b2b1-b8ff8f697a3f",
  "coverage": "独立原片原生5秒分割，A源0-5/B源5-10变体，选前段A及水印面板刷新重开",
  "actual": "一次CmdR后仅重开现有编辑器，A及关联原声仍选中、B未选，水印仍激活。前后版本2、唯一工程、clip IDs和完整content规范化SHA256 c96c9653a00e02690dd9f179cf3d908e1dc76c30f26df24c410abbbac72df33c全部相同。",
  "evidence": [
    "485-E1-before-split5.txt",
    "485-E1-split5-ui.txt",
    "485-E1-before-refresh-final-ui.txt",
    "485-E1-before-refresh-ui.png",
    "485-E1-after-refresh-restored-ui.txt",
    "485-E1-after-refresh-restored-ui.png",
    "485-E1-after-refresh-api.txt",
    "485-E1-final-audit.json"
  ]
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "d17bd6a9-9779-44f3-87f8-f86a3aec86b2",
  "projectId": "79723c61-3600-4d80-afdb-20f92dd489ab",
  "coverage": "独立原片原生4秒分割，A源0-4/B源4-10，选后段B及字幕面板，收起一次并重开同一编辑器",
  "actual": "执行通过：不重选片段或面板，重开后B及关联原声仍选中、A未选，字幕面板保持。前后版本2、唯一工程、clip IDs和完整content规范化SHA256 eaf3268e49243ed9675f97eb2a28d5da6b8d272b081221fecb55b241f6d9a7ba全部相同。",
  "evidence": [
    "485-E2-register-submitted.txt",
    "485-E2-register-terminal.txt",
    "485-E2-split4-ui.txt",
    "485-E2-before-reopen-ui.png",
    "485-E2-before-reopen-final-ui.txt",
    "485-E2-collapsed-ui.txt",
    "485-E2-after-reopen-restored-ui.txt",
    "485-E2-after-reopen-restored-ui.png",
    "485-E2-final-audit.json"
  ]
}


## 本轮验收范围

原回归严格使用原附件和同轨双源0-5片段A/B，选择B与媒体面板后刷新并重开现有编辑器；两个独立扩散分别改变所选片段、功能面板、分割源范围和重开入口。三场景保存工程与片段标识、版本和完整content规范化摘要均前后一致。未验证浏览器重启、跨设备恢复、字幕实际生成、删除或导出；固定可重跑脚本仍PLAN，路径为空。原缺陷生产环境保持历史标注，本轮仅证明Chrome预发范围。

用例登记校验：npm run cases:check 在本机因 python 别名不存在未启动；使用同一检查器 python3 tools/design-cases/check-cases.py 完成，checked 521 cases, issues=0。无产品代码或脚本实现变更。
