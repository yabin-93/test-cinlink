# FWXC-541 本轮回归（2026-11-16 14:00）

原验收和两条扩散均Not Run，已冻结云效已修复候选、原描述、附件及历史，待逐项真实执行。历史结果不作为本轮通过。执行账号yabinc92，有头Chrome，同账号串行、零额外业务重试；必要前置和完整原提示词保留。原验收Passed/Failed分别设✅AI通过/❌AI未通过并回读；Blocked/待人工/未覆盖保持。定时任务不写评论、新单、Git提交推送，不改凭据权限。

证据reports/fixed-monitor-20261116-135748/cloud/FWXC-541/。


### original Passed

{
  "result": "Passed",
  "conversationId": "4116bac4-f96b-4aa6-baa9-b8f6fea88fb5",
  "sourceVersionId": "editor_image_e44cfa79b260435ca0a7d72b7cd49e7d",
  "prompt": "仅校验这条批注的正文长度；超过2000字符应明确拒绝，不生成、不修改、不截断。",
  "actual": "执行通过：原生粘贴并实际读回2001个U+6D4B测，名称长度046，恰1引用。一次原全局提交后明确每条正文最多2000字符、发送禁用，原正文及提示保留，无生成。UI原路径通过，独立后端绕过未覆盖。",
  "bodyUnicodeLength": 2001,
  "evidence": [
    "541-O-body-exact.txt",
    "541-O-before.txt",
    "541-O-before.png",
    "541-O-rejected.txt",
    "541-O-rejected.png"
  ]
}


541原回归实际Passed：精确2001个测原生粘贴读回，单正文超过2000提交明确拒绝且完整保留，未生成。云效✅AI通过已官方OpenAPI更新并GET回读。两独立扩散继续；独立后端绕过未覆盖。


### expansion1 Passed

{
  "result": "Passed",
  "conversationId": "7db470d5-acc4-43d4-ac0c-0082e8483e69",
  "sourceVersionId": "editor_image_b15d6c1207d0438d99adffa8e2533b4b",
  "resultVersionId": "editor_image_41ec671d2e774797b70ee7312f0c2c94",
  "prompt": "按这条批注添加左耳银色小耳钉，保留原尺寸和其他内容。",
  "bodyUnicodeLength": 2000,
  "bodyFile": "541-E1-body.txt",
  "actual": "执行通过：独立合法2000字符正文（明确耳钉指令+句号补齐），原生粘贴未写入后用支持的AX字段赋值；引用后重开准确2000，正式只发送一次，真实生成PNG1024×1024完整解码，左耳小银耳钉可见，人物/双耳机/TEST保留。",
  "evidence": [
    "541-E1-body.txt",
    "541-E1-body-readback.txt",
    "541-E1-before.txt",
    "541-E1-before.png",
    "541-E1-terminal.txt",
    "541-E1-terminal.png",
    "541-E1-result.png",
    "541-E1-file-audit.json"
  ]
}


### expansion2 Passed

{
  "result": "Passed",
  "conversationId": "907f45b1-83e7-4b2c-adc0-91a11ebb7298",
  "sourceVersionId": "editor_image_db8e2ccd5a1f4c23a863dd12f32b0f7b",
  "prompt": "仅校验这条批注的正文长度；超过2000字符应明确拒绝，不生成、不修改、不截断。",
  "bodyUnicodeLength": 2002,
  "actual": "执行通过：独立1批注负向2002，支持的原生AX字段输入，重开实际正文精确2002个测；一次提交后明确每条最多2000、发送禁用，输入及引用保留，无生成。引用摘要仅展示前部分未当作正文截断，已据重开字段完整核验。",
  "evidence": [
    "541-E2-body-exact.txt",
    "541-E2-before.txt",
    "541-E2-before.png",
    "541-E2-rejected.txt",
    "541-E2-rejected.png"
  ]
}


## 541三场景实际完成

原2001字Passed：原生粘贴实际2001个测、提交明确拒绝；扩散2000字Passed：明确耳钉要求+句号补齐，字段赋值并重开核实精确2000，真实生成PNG1024方图、完整解码与耳钉验收通过；扩散2002字Passed：重开字段精确2002、提交明确拒绝无生成。每场景独立会话，非复用前例。原云效✅AI通过已回读。引用摘要截短不等同正文截断，正文均直接读字段核验；独立后端绕过仍未覆盖。证据541-O/541-E1/541-E2。
