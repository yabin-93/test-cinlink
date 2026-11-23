# FWXC-529 回归排队记录（2026-11-16 22:00）

【ERYE237-021】仅更新现有文字颜色的请求进入图片生成，未完成可编辑对象改色

本轮原回归、扩散一、扩散二均Not Run。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

前置阻塞：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-529；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发原回归准备

13:28:41官方OpenAPI回读当前精确已修复并校验创建人/项目。原021-source-canvas.png真实1024²透明保存图已找回，字节复制fixtures/529-original/birds-transparent.png并留manifest及alpha完整解码审计（896972全透明像素，alpha0～255）。实际新会话9f3188af-20cd-4d33-b1b0-140d7f482621；素材登记仅一次已受理。随后按原顺序UI创建S1红8笔迹、T1蓝RGB0/128/255的48px文字021 T1、H1绿矩形；选择T1并保留自动画笔引用发送原完整颜色修改提示词一次。固定自动化PLAN，云效仅真实原结果后按规则更新，不评论/新单/附件。


原UI准备完成：素材登记37秒；按原图顺序红8 S1（源约100/409→358/409）、蓝RGB0/128/255及48px T1“021 T1”（源约100/100）、绿RGB0/255/0及48px H1矩形（源约716/103→921/308）。字体就绪后才实际输入T1，未多建对象。选中T1、右键检查原生菜单，保留自动画笔引用；原完整指令只发一次，见acceptedTasks/original及529-O-before.txt，不改写原提示。证据529-O-source.txt、three-objects.*、T1-selected.*、style-menu.*、before.*、submitted.txt。

两扩散设计：E1独立相同UI对象，合法橙色RGB255/128/0改色，核验可编辑文字及其他对象保持；E2另独立相同对象，非法RGB256/0/0请求应拒绝且蓝色T1/其他对象不变，不新生成。尚未执行不计通过。


## 2026-11-17T05:38:54.225Z 原改色任务终态与锁屏检查点

原完整提示单次执行39秒，页面列读取编辑器视图及编辑图片，现有T1已红且仍可编辑（021 T1内容准确）。真实红PNG和一次Undo后的蓝PNG均1024×1024 RGBA完整解码；RGB及alpha差异均仅bbox(102,106,244,144)，S1/H1及源图其他区域保持。纯红/纯蓝像素审计见529-O-color-rgb-audit.json。尚未将原结论最终改为Passed：下一步Redo及取消选择后的工具默认色检查在首个操作前遭Mac锁屏中断，未执行。原任务不重发，两扩散尚未执行，云效没有写状态。

当前既有会话9f3188af-20cd-4d33-b1b0-140d7f482621，最后观察蓝T1及下载popup，用户解锁后先观察/关闭popup，再Redo并核验默认色。证据529-O-terminal.*、T1-editable.*、red-result.png、color-undo.*、blue-undo-result.png、color-rgb-audit.json及blue-undo-download-confirmed.txt。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "9f3188af-20cd-4d33-b1b0-140d7f482621",
  "sourceVersionId": "editor_image_e6d0fe3bd4174330991e025d8e1f727d",
  "prompt": "仅将当前图片草稿中左上角可编辑文字“021 T1”（T1）的颜色改为RGB(255,0,0)，保留S1红色笔迹、H1绿色矩形及其他内容。仅修改现有文字对象，不改工具默认色、不合成、不AI生成、不导出。",
  "actual": "执行通过：严格原透明源图、UI依次S1红8/T1蓝0,128,255且48px/H1绿矩形；选T1检查样式后携画笔引用原指令单次提交，39秒完成本地editor_image_edit。T1变RGB255,0,0且仍可编辑021 T1，没有AI融合版。真实红PNG/一次Undo蓝PNG均1024² RGBA完整解码，RGB与alpha差异仅T1 bbox(102,106,244,144)，S1/H1和其他区域保持。解锁后从既有现场Redo恢复红字，取消选择后工具默认色仍纯绿，与提交前默认保持。锁屏只延后检查，未重发任务。",
  "evidence": [
    "529-O-register-terminal.txt",
    "529-O-source.txt",
    "529-O-three-objects.txt",
    "529-O-three-objects.png",
    "529-O-T1-selected.txt",
    "529-O-T1-selected.png",
    "529-O-style-menu.txt",
    "529-O-style-menu.png",
    "529-O-before.txt",
    "529-O-before.png",
    "529-O-submitted.txt",
    "529-O-terminal.txt",
    "529-O-terminal.png",
    "529-O-T1-editable.txt",
    "529-O-T1-editable.png",
    "529-O-red-result.png",
    "529-O-color-undo.txt",
    "529-O-color-undo.png",
    "529-O-blue-undo-result.png",
    "529-O-color-rgb-audit.json",
    "529-O-color-redo.txt",
    "529-O-color-redo.png",
    "529-O-default-after-deselect.txt",
    "529-O-default-after-deselect.png"
  ]
}


13:40:53北京时间，官方OpenAPI仅将原缺陷已修复→✅AI通过，GET回读verified=true。评论/附件0，两扩散继续；原通过不代表完整-1/256/空/非数字技术矩阵已覆盖。


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "8bafa774-5331-4d53-8acd-01071c49bc1e",
  "prompt": "请只把当前草稿中既有的可编辑文字“021 T1”改成橙色RGB(255,128,0)。保持同一文字对象的内容、位置和48源像素字号不变，原S1红色笔迹、H1绿色矩形及工具默认色均保持。只做本地对象改色，不合成、不AI生成、不导出。",
  "actual": "执行通过：独立同源UI三对象蓝48T1/红8S1/绿H1，41秒完成本地编辑，选中T1回读RGB255/128/0，021 T1仍可编辑。实际橙PNG/一次Undo蓝PNG均1024² RGBA完整解码，RGB与alpha变化仅bbox(102,106,244,144)的T1区域，其他对象和源图保持。Redo恢复橙字，取消选择后的工具默认仍纯绿；无图片生成或融合版。",
  "evidence": [
    "529-E1-register-terminal.txt",
    "529-E1-source.txt",
    "529-E1-three-objects.txt",
    "529-E1-three-objects.png",
    "529-E1-T1-selected.txt",
    "529-E1-T1-selected.png",
    "529-E1-before.txt",
    "529-E1-before.png",
    "529-E1-submitted.txt",
    "529-E1-terminal.txt",
    "529-E1-terminal.png",
    "529-E1-T1-editable.txt",
    "529-E1-orange-result.png",
    "529-E1-color-undo.txt",
    "529-E1-color-undo.png",
    "529-E1-blue-undo-result.png",
    "529-E1-color-rgb-audit.json",
    "529-E1-color-redo.txt",
    "529-E1-color-redo.png",
    "529-E1-default-after-deselect.txt",
    "529-E1-default-after-deselect.png"
  ]
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "7f3749cf-4dbc-4581-8d16-73e6ff508af2",
  "sourceVersionId": "editor_image_340b9d4174d9470fa9f145235af6ebf9",
  "prompt": "仅将当前草稿里现有的可编辑文字“021 T1”颜色改为RGB(256,0,0)。保持文字内容、位置、字号及S1红笔迹、H1绿矩形不变；仅更新原文字对象，不更改工具默认色，不合成、不AI生成、不导出。",
  "scope": "Agent入口非法RGB256负向拒绝；不代表原始API及-1/空/非数字矩阵覆盖",
  "actual": "执行通过：独立同源UI蓝48T1/红8S1/绿H1，RGB256请求一次发送。页面明确指出RGB各分量须0～255整数，256无效，并将推荐#FF0000留待确认；未提交推荐合法值。T1仍蓝、其他对象保持；真实请求前后PNG均1024² RGBA完整解码，RGB/alpha均完全相同，文件字节和SHA也一致。取消选择默认色仍纯绿。负向拒绝及不变证据完成后只点击一次停止，页面已取消，清理本例等待澄清状态；不把取消本身当拒绝证据。",
  "evidence": [
    "529-E2-register-terminal.txt",
    "529-E2-register-api-progress.txt",
    "529-E2-source.txt",
    "529-E2-three-objects.txt",
    "529-E2-three-objects.png",
    "529-E2-T1-selected.txt",
    "529-E2-T1-selected.png",
    "529-E2-before.txt",
    "529-E2-before.png",
    "529-E2-before-result.png",
    "529-E2-submitted.txt",
    "529-E2-invalid-rejected.txt",
    "529-E2-invalid-rejected.png",
    "529-E2-after-result.png",
    "529-E2-unchanged-audit.json",
    "529-E2-default-after-reject.txt",
    "529-E2-default-after-reject.png",
    "529-E2-negative-cleanup-submitted.txt",
    "529-E2-negative-cleanup-terminal.txt"
  ]
}


本轮完成原/扩散一/扩散二P/P/P。13:59:38官方GET仍✅AI通过，未重复PUT。扩散二只验证Agent入口RGB256越界拒绝、对象与文件字节不变；原始API及-1/空/非数字仍未覆盖。原拒绝证据完成后清理待澄清请求已取消，无重发。固定脚本PLAN，无评论/新单/附件/Git提交推送。
