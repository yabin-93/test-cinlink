# FWXC-540 本轮回归（2026-11-16 14:00）

原验收和两条扩散均Not Run，已冻结云效已修复候选、原描述、附件及历史，待逐项真实执行。历史结果不作为本轮通过。执行账号yabinc92，有头Chrome，同账号串行、零额外业务重试；必要前置和完整原提示词保留。原验收Passed/Failed分别设✅AI通过/❌AI未通过并回读；Blocked/待人工/未覆盖保持。定时任务不写评论、新单、Git提交推送，不改凭据权限。

证据reports/fixed-monitor-20261116-135748/cloud/FWXC-540/。


### original Passed

{
  "result": "Passed",
  "conversationId": "a80acb06-97fa-416f-8208-3684a18566a9",
  "sourceVersionId": "editor_image_86096a86837e4661899214375cfc7a91",
  "prompt": "仅按当前这11条批注进行上限校验；超过10条则明确拒绝，不拆分、不截断，不执行图片编辑或生成。",
  "actual": "执行通过：本轮独立干净源图实际11独立锚点/数量1至数量11/每条测/11引用，一次原指令提交后每次最多发送10条批注明确拒绝、发送禁用，11条引用及完整原文保留；无生成任务/新结果。原页面提交路径通过；独立后端绕过未覆盖。",
  "evidence": [
    "540-O-before.txt",
    "540-O-before.png",
    "540-O-rejected.txt",
    "540-O-rejected.png"
  ]
}


540原页面验收执行通过：11条引用一次提交后明确最多10条、全部输入保留、发送禁用，无生成。云效✅AI通过官方OpenAPI已更新并GET回读verified=true；独立服务端绕过未覆盖。两扩散继续。


### expansion1 Blocked

{
  "result": "Blocked",
  "conversationId": "65b6c195-6920-4ff1-a57c-4eb7f28e8d11",
  "sourceVersionId": "editor_image_53a20d8b76574ca4b593a1ec56b3e931",
  "prompt": "按当前这10条批注处理图片，保持1024×1024和人物、耳机主体，不拆分、不截断批注。",
  "actual": "恰10条实际提交进入正在生成图片，数量门禁接受；随后批注1的修改范围不明确，请补充描述后重试，未产物。正文测无法表达实际编辑，扩散完整业务因语义前置Blocked，不算通过、不重发。",
  "countGateResult": "Passed",
  "evidence": [
    "540-E1-before.txt",
    "540-E1-before.png",
    "540-E1-terminal.txt",
    "540-E1-terminal.png"
  ]
}


### expansion2 Passed

{
  "result": "Passed",
  "conversationId": "0c9461e2-a68d-4ebc-bce9-d6956aa66b64",
  "sourceVersionId": "editor_image_f6bc75dd54154352a2a98a94c8aa9520",
  "prompt": "仅按当前这12条批注进行上限校验；超过10条则明确拒绝，不拆分、不截断，不执行图片编辑或生成。",
  "actual": "执行通过：独立12条不同锚点/超量1至12/每条测/12引用，一次提交后明确每次最多发送10条、发送禁用，12条完整引用和全局输入保留，无生成。",
  "evidence": [
    "540-E2-before.txt",
    "540-E2-before.png",
    "540-E2-rejected.txt",
    "540-E2-rejected.png"
  ]
}


## 540本轮结束

原11条Passed：明确最多10条，完整保留引用/提示，无生成；扩散10条Blocked：数量门禁接受进入处理，正文测的修改范围不明确、无成品，不重发；扩散12条Passed：相同明确拒绝及完整保留。原云效✅AI通过已回读。原页面路径覆盖，独立后端绕过未覆盖。证据540-O-*、540-E1-*、540-E2-*。
