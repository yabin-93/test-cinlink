# FWXC-533 回归排队记录（2026-11-16 22:00）

【ERYE237-032】本地编辑批次一次撤销后切到其他保存版，未恢复编辑前源图

本轮原回归、扩散一、扩散二均Not Run。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

前置阻塞：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-533；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发回归已启动

12:29:36官方OpenAPI核验当前精确已修复且创建人匹配。严格原来源032-source-canvas.png已字节复制portrait.png；1024×1024红色T1新品、红斜线及蓝色导出测试，独立会话9a51585f-4b36-4b4b-bb4e-6ae5f2ad5c1f。只提交一次素材登记准备，当前等待终态，不重发。计划同一工程创建真实可区分B保存版，切回A且清空草稿/引用后发送原完整本地批次指令；导出撤销后PNG按RGB与A/B核验。两扩散为独立单源三步批次撤销、独立双版本单箭头撤销，分别记录不继承结果。

素材登记：`FWXC-533原回归素材登记：仅保留本会话上传的portrait.png原文件，不修改、不生成、不导出，不添加任何批注或草稿。`

证据目录reports/fixed-monitor-20261116-135748，当前533-O-register-before/submitted/progress.txt。固定脚本PLAN，无云效评论/新单/附件。


前置进展：素材登记35秒完成；原图真实保存A=editor_image_552e735ce8c547eaa5675e7a1abac548。同一工程仅一次提交B版准备生成：点批注位于原红T1区域，正文“将画面左侧原有红色‘T1 新品’文字改为蓝色，并在人物右侧空白处添加蓝色文字‘保留内容’。保留原有红斜线、蓝色‘导出测试’、人物、衣服、手包和背景；尺寸保持1024×1024。”；全局“FWXC-533前置准备：按此批注生成并保存可区分的B版图片，保留原A版历史。该请求仅用于准备B版，不是后续本地编辑撤销测试。”当前生成中，未发送正式本地批次。准备允许AI，正式验收仍禁止AI生成，不混淆两阶段。证据533-O-A-open.*、533-O-B-preparation-before.*、533-O-B-preparation-submitted.txt。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Blocked",
  "conversationId": "9a51585f-4b36-4b4b-bb4e-6ae5f2ad5c1f",
  "sourceVersionId": "editor_image_552e735ce8c547eaa5675e7a1abac548",
  "preparationVersionId": "editor_image_29848842d3bc4c1387b4402132073730",
  "formalPromptSubmitted": false,
  "actual": "原始A图恢复且保存，但一次B版准备任务把应为蓝色“T1 新品”误写为蓝色“B版准备”，另有“保留内容”；实际PNG已下载核验。严格原B前置未满足，原完整指令尚未发送，不以等效B冒称原回归通过。保留该次准备偏差、不重复生成；当前真实A/B将作为扩散一独立验证。云效保持已修复。",
  "evidence": [
    "533-O-register-terminal.txt",
    "533-O-A-open.txt",
    "533-O-A-open.png",
    "533-O-B-preparation-before.txt",
    "533-O-B-preparation-before.png",
    "533-O-B-preparation-submitted.txt",
    "533-O-B-terminal.txt",
    "533-O-B-terminal.png",
    "533-O-B.png"
  ]
}


准备偏差及范围调整：B实际1024² PNG把T1新品写成B版准备（蓝色），另有保留内容；见533-O-B.png。因此严格原场景Blocked，云效保持已修复，不重复B生成。当前A/B可区分，切回真实A，进入空画笔确认撤销/重做均禁用，再返回图片工具去除自动画笔引用；无草稿/引用后以原完整三步提示词单次执行扩散一，验证B标识变化下的同一撤销目标。扩散二调整为独立单保存源版相同三步批次一次撤销。533-E1-before.*及submitted.txt已存，当前Agent任务受理，不重发。


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "9a51585f-4b36-4b4b-bb4e-6ae5f2ad5c1f",
  "sourceVersionId": "editor_image_552e735ce8c547eaa5675e7a1abac548",
  "otherVersionId": "editor_image_29848842d3bc4c1387b4402132073730",
  "scope": "B为蓝色B版准备和保留内容的相邻场景，非严格原B",
  "actual": "执行通过：A/B同工程，查看红字A并确认空画笔、清空引用后，原三步本地批次一次提交95秒完成，无新AI结果版；一份新品文字可选且内容输入可编辑，红箭头位置正确。UI撤销仅点击一次后整组移除、撤销禁用/重做可用。实际导出PNG完整解码1024²，RGB与A完全一致（0差异像素），与B不同（14143差异像素）；文件SHA亦与A相同。",
  "prompt": "在当前图归一化(0.1,0.1)添加白色48源像素可编辑文字“新品”，再将同一文字移到(0.7,0.1)，加红色8源像素箭头从(0.7,0.2)指向(0.25,0.25)。仅本地编辑并确定性合成，保留原尺寸，不要AI生成。整组作为一次撤销单元。",
  "evidence": [
    "533-E1-empty-draft.txt",
    "533-E1-before.txt",
    "533-E1-before.png",
    "533-E1-submitted.txt",
    "533-E1-terminal.txt",
    "533-E1-terminal.png",
    "533-E1-text-object.txt",
    "533-E1-text-object.png",
    "533-E1-one-undo.txt",
    "533-E1-one-undo.png",
    "533-E1-undo-download.txt",
    "533-E1-one-undo-result.png",
    "533-E1-rgb-audit.json"
  ]
}


扩散二：独立会话85c05895-25fe-4b78-8983-5b68689892c4，登记31秒完成，仅一份A保存版且无引用/草稿；相同三步本地批次指令只发送一次，当前等待终态。证据533-E2-register-*、source-before.*、before.txt及submitted.txt。


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "85c05895-25fe-4b78-8983-5b68689892c4",
  "sourceVersionId": "editor_image_4b252d8c3b7e431aaf157e786ad47900",
  "scope": "独立单保存源版相同三步本地批次一次撤销",
  "prompt": "在当前图归一化(0.1,0.1)添加白色48源像素可编辑文字“新品”，再将同一文字移到(0.7,0.1)，加红色8源像素箭头从(0.7,0.2)指向(0.25,0.25)。仅本地编辑并确定性合成，保留原尺寸，不要AI生成。整组作为一次撤销单元。",
  "actual": "执行通过：独立单保存A源，三步本地批次单次提交83秒完成，仅原历史版无新增AI保存版。唯一新品文字可选择、内容可编辑，红箭头达成；UI撤销一次同时移除两对象，撤销禁用/重做可用。实际下载PNG完整解码1024×1024 RGBA，RGB与源A完全相同0差异像素，SHA亦相同。",
  "evidence": [
    "533-E2-register-terminal.txt",
    "533-E2-source-before.txt",
    "533-E2-source-before.png",
    "533-E2-before.txt",
    "533-E2-submitted.txt",
    "533-E2-terminal.txt",
    "533-E2-terminal.png",
    "533-E2-text-object.txt",
    "533-E2-text-object.png",
    "533-E2-one-undo.txt",
    "533-E2-one-undo.png",
    "533-E2-undo-download.txt",
    "533-E2-one-undo-result.png",
    "533-E2-rgb-audit.json"
  ]
}


本轮完成：原Blocked / 扩散一Passed / 扩散二Passed。12:44:42官方GET云效仍精确已修复，状态写入0；原严格B前置缺口不以扩散通过抹除。原生产失败保持历史，本轮不是生产重跑。固定自动化PLAN，未接固定脚本。
