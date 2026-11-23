# FWXC-492 Chrome预发回归结果（2026-11-17）

【生产环境】【ERYE210-013】纯音频无画面工程仍可保存文字水印，缺少能力限制说明

最新本轮结果：原回归、扩散一、扩散二均Passed。以下排队段为历史，当时三项均Not Run。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

历史登录阻塞（现已由Chrome预发yabinc92接续）：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-492；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "coverage": "执行通过：原纯音频水印能力限制；采用原描述允许另备的真实1.393197秒WAV，未覆盖原1.346757秒那一源文件",
  "conversationId": "680e9aa9-8bed-4d16-8698-61ab85dfef86",
  "projectId": "4a960cf2-7a75-4854-acba-12d7006ea07f",
  "actual": "按原顺序媒体/文稿/字幕/配音/水印可浏览；文字输入和全部写设置禁用，提示请先添加视频或图片画面，再编辑水印；图片选择与写设置同样禁用。原文字AUDIO_ONLY_013因控件禁用无法输入，没有绕过。最终GET200 revision1仅一条独立背景音频，无视频/图片/字幕，watermarks.text和image均null。",
  "evidence": [
    "492-O-media.txt",
    "492-O-module-文稿.txt",
    "492-O-module-字幕.txt",
    "492-O-module-配音.txt",
    "492-O-text-disabled.txt",
    "492-O-text-disabled.png",
    "492-O-image-disabled.txt",
    "492-O-image-disabled.png",
    "492-O-save-audit.txt"
  ]
}


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "d50f56a5-1c3c-4a8f-ae6e-43f576c26ad1",
  "projectId": "a7fad391-eaec-4c57-a1bd-0806e3cb7da8",
  "coverage": "执行通过：独立纯音频工程刷新恢复后文字/图片写禁用保持",
  "actual": "独立工程仅一条A1背景音频1.393197秒。打开图片水印页后同CID刷新一次，再重开编辑器恢复原工程。图片上传入口、文字输入和相关设置均禁用，提示请先添加视频或图片画面，再编辑水印。GET200仍revision1，text/image均null，只有audio轨；没有绕过禁用写入。",
  "evidence": [
    "492-E1-before-refresh-ui.txt",
    "492-E1-before-refresh-api.txt",
    "492-E1-after-refresh-image.txt",
    "492-E1-after-refresh-image.png",
    "492-E1-after-refresh-text.txt",
    "492-E1-after-refresh-api.txt"
  ]
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "78031fe4-7788-43a8-996f-8b01d52a373a",
  "projectId": "b0bd121a-973e-49f0-9c95-0c6f085ff2f5",
  "coverage": "执行通过：独立有视频画面的正常文字水印写入和纯音频工程隔离；未执行同一纯音频工程加画面的连续转换",
  "actual": "原20秒视频/原声独立工程中水印输入及设置可用、无无画面限制。仅原生填写VIDEO_ONLY_013后失焦，预览右上角和0-20秒水印轨正确显示；GET revision1→2，文字精确持久化，视频/原声tracks完整不变。原回归与扩散一两纯音频工程均仍revision1、text/image null，未因同工作区新增视频素材被写水印。",
  "evidence": [
    "492-E2-before-api.txt",
    "492-E2-watermark-enabled.txt",
    "492-E2-text-entered.txt",
    "492-E2-text-saved-ui.txt",
    "492-E2-text-saved.png",
    "492-E2-after-api.txt"
  ],
  "preparationNote": "首次文件选择器在media路径中打开禁用，未提交；取消后从相同SHA原文件副本选择，打开可用，实际视频导入仅提交一次。"
}


## 本轮范围与证据

专用工作区a33076f9-5513-4fd6-bd2a-5b2964ce0686。原缺陷明确允许另备真实WAV，本轮采用原FWXC516附件的未改字节1.393197秒真实WAV（SHA717f9c28...），未声称使用原1.346757秒WAV。fixture manifest保留完整SHA及原描述允许替代的依据，未用视频冒充纯音频。三独立会话/工程无复用前一业务结果。

| 场景 | 步骤与预期 | 实际结果 |
|---|---|---|
| 原回归 | 纯音频，媒体→文稿→字幕→配音→水印；无画面时文字/图片写禁用并说明，不保存AUDIO_ONLY_013 | Passed，模块可浏览，明确提示请先添加视频或图片画面，再编辑水印；两类写均禁用，GET版本1/仅audio/text及image null |
| 扩散一 | 独立纯音频，打开图片水印页后同CID刷新，重开工程核两类写入口与持久化 | Passed，原1.39秒工程恢复，两类写禁用和说明保持；GET仍版本1/仅audio/无水印 |
| 扩散二 | 独立完整20秒视频有画面对照，原生文字水印VIDEO_ONLY_013失焦保存，核原音视频不变 | Passed，预览右上和0～20秒水印轨显示正确；GET版本1→2/文字精确保存/tracksExact=true；前两纯音频工程仍版本1/null水印 |

扩散二首次选择器在media路径中打开按钮禁用，未提交上传；取消后从相同SHA原副本目录选中，打开可用，实际视频导入仅提交一次。此为测试准备，不把选择器状态记成水印失败。独立有画面对照不等于同一纯音频工程添加画面的连续转换；本轮未验证后者，也未验证视频中的图片水印上传、导出或像素级水印渲染。

14:56:01官方OpenAPI仅更新原缺陷状态✅AI通过并回读，15:08:16再次GET确认；评论/附件/新单写入0，无Git提交推送。核心证据目录reports/fixed-monitor-20261116-135748/，492-O-text-disabled.txt/png、492-O-image-disabled.txt/png、492-O-save-audit.txt、492-E1-after-refresh-image.txt/png、492-E1-after-refresh-text.txt、492-E1-after-refresh-api.txt、492-E2-text-saved.png、492-E2-after-api.txt。固定可重跑脚本PLAN。

素材登记完整提示词（目标验证均为原生页面操作）：

```text
FWXC-492原回归前置：只登记本会话上传的A1-independent.wav原文件，不转写、不生成、不导出，不修改其他工程。后续由页面独立检查纯音频工程水印限制。
```

```text
FWXC-492扩散一前置：只登记本会话上传的A1-independent.wav原文件，不转写、不生成、不导出，不改其他工程。本独立会话用于刷新后纯音频水印限制检查。
```

```text
FWXC-492扩散二有画面对照前置：仅登记本会话上传的E196-A.mp4原20秒视频，不转写、不生成、不导出，不改其他会话或工程。本会话后续由页面验证存在视频画面时水印正常编辑和保存。
```
