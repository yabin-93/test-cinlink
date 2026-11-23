# FWXC-543 本轮回归（2026-11-16 14:00）

原验收和两条扩散均Not Run，已冻结云效已修复候选、原描述、附件及历史，待逐项真实执行。历史结果不作为本轮通过。执行账号yabinc92，有头Chrome，同账号串行、零额外业务重试；必要前置和完整原提示词保留。原验收Passed/Failed分别设✅AI通过/❌AI未通过并回读；Blocked/待人工/未覆盖保持。定时任务不写评论、新单、Git提交推送，不改凭据权限。

证据reports/fixed-monitor-20261116-135748/cloud/FWXC-543/。


## 2026-11-17 Chrome预发原回归

{
  "result": "Passed",
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "conversationId": "8570b3e7-3217-4b04-8955-d59676bb9551",
  "bodyLengths": [
    2000,
    2000,
    2000,
    2000,
    1
  ],
  "globalUnicodeLength": 4000,
  "totalLength": 12001,
  "actual": "执行通过：5条引用、正文及全局精确核对，合计12001；只发送一次，明确拒绝“批注正文与全局提示合计最多12000个字符”，发送禁用，无生成。独立后端绕过未覆盖。",
  "evidence": [
    "543-O-staging-before.txt",
    "543-O-staging-before.png",
    "543-O-staging-after.txt",
    "543-O-staging-after.png"
  ]
}

两条扩散未执行，固定脚本PLAN保持。


### 扩散一：12000合法边界（执行中）

Chrome预发/yabinc92，独立会话dd616260-1cf7-465c-aa52-e3d194461a6e，独立源版editor_image_c08f3f7516fc405285e452bb26d26b54。5条边界1～5正文长度[2000,2000,2000,1999,1]，全局4000，合计12000；正文明确在各位置添加小蓝点，末尾重复句号只作字符填充。所有实际字段逐项读回，完整原文543-E1-staging-fields.json；一次提交已受理，5条已发送、正在生成图片。等待原任务终态与实际下载，不重发、不计通过。原回归云效✅AI通过已回读；本扩散未改状态。


### 扩散一终态

{
  "result": "Failed",
  "environment": "staging",
  "conversationId": "dd616260-1cf7-465c-aa52-e3d194461a6e",
  "sourceVersionId": "editor_image_c08f3f7516fc405285e452bb26d26b54",
  "resultVersionId": "editor_image_4aaf3067f90a4cffa1a8e84fb5ab4759",
  "totalLength": 12000,
  "countGatePassed": true,
  "actual": "合法12000合计成功受理并生成实际1024×1024 RGBA PNG，完整解码通过；但要求5处蓝点，成品仅3个蓝点可见，扩散按编辑效果Failed。原总长拒绝验收Passed保持，不改云效。",
  "fieldsFile": "543-E1-staging-fields.json",
  "evidence": [
    "543-E1-staging-before.txt",
    "543-E1-staging-before.png",
    "543-E1-staging-terminal.txt",
    "543-E1-staging-terminal.png",
    "543-E1-staging-result.png",
    "543-E1-staging-result.audit.json"
  ]
}


扩散二准备偏差：新建会话点击未实际导航，素材登记误留E1会话并30秒完成，无正式E2测试。该登记排除独立场景，证据543-E2-preparation-isolation-deviation.txt。随后地址栏回到预发未分组首页，核验你好yabinc92及空白后才创建独立扩散二登记；不是重发未知任务，不改写已有E1来源。


### 扩散二终态

{
  "result": "Passed",
  "environment": "staging",
  "conversationId": "b9977847-b0d9-4414-ad73-d3dbedfaf63e",
  "sourceVersionId": "editor_image_9cffde1a4b714563b0d2bb0b2072aa74",
  "bodyLengths": [
    2000,
    2000,
    2000,
    2000,
    2
  ],
  "globalUnicodeLength": 4000,
  "totalLength": 12002,
  "actual": "执行通过：5条引用及各字段合法，合计12002；一次发送后明确合计最多12000、发送禁用，输入引用保留，无生成。",
  "evidence": [
    "543-E2-staging-before.txt",
    "543-E2-staging-before.png",
    "543-E2-staging-after.txt",
    "543-E2-staging-after.png"
  ]
}

三项完成：P/F/P。原云效✅AI通过保持；E1编辑效果独立偏差仅记录，按本批限制不评论、不建单。
