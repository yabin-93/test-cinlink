# ERYE237-011 生产有头复测R2（2026-11-13）

**Passed，执行通过。** 本次实际重跑8px与16px两个纯工具设置请求；通过撤销到空、返回主工具栏隔离自动画笔引用，再重做恢复原标记完成比较。没有再次把携参考标记的图片修改提交当成默认设置请求。

## 环境与基线

生产[CinLink](https://app.cinlink.ai/)，macOS、ego-browser有头，TaskSpace11/p1，账号yabinc18。复用专用项目FWXC350-prod-retest-20261111的[原会话](https://app.cinlink.ai/c/4d81b2cf-17a2-4972-95b6-583a3948dca0)，无新增项目、上传或准备生成。

本例源为群鸟JPEG原始照片1000×666，源历史`editor_image_d78411edba904bceadc9d6923dc1876c`；现有3项完成历史（含原轮生成版b12a7809和去背景dad518）均保留。开始时正文、待发引用和未发草稿为空，无在途任务。源画布先独立取证，不沿用上轮通过或旧默认值作为本轮结果。

## 第1条：设置8px并落笔

原指令，一次发送，无参考标记引用：

> 切换画笔，粗细8源像素，颜色RGB(255,0,0)

当前run `run_v2_cc29d23da5534883b16cf541a555957e`，done，约50.086秒，实际工具`editor_image_view_update`，changes为tool=brush、size_px=8、color=#FF0000。

真实UI为tool-stroke、大小8、颜色#ff0000，未选中旧对象。通过UI在源x150～400、y约133画水平参考线。实际PNG四处截面x200/250/300/350的实心红色均为8行（y129～136），验证8px实际落笔。

## 隔离参考引用

绘制后输入框自动形成1个“画笔”引用。实际悬停/查看该引用，当前没有显示单独移除引用的按钮；没有擅自用键盘快捷键或修改前端状态绕过。

为让下一句走纯设置入口：对本条参考线执行一次撤销至空，画布RGBA严格恢复独立源图，重做仍可用；点击“返回图片工具”，空草稿退出到主工具栏，输入框参考引用为空。此步没有选择“放弃”原8px标记，因此撤销记录仍可恢复。保存完整过程，未将该隔离过程声称为图片修改提交。

## 第2条：纯设置16px、恢复旧8px并再落笔

确认正文/参考引用为空、没有在途任务后，原指令一次发送：

> 把画笔默认粗细改为16源像素

当前run `run_v2_f59b4ccb764f45998a4e344efce5be1d`，done，约59.596秒，实际工具仍为`editor_image_view_update`，changes仅size_px=16，未进入图片生成。

UI重新进入画笔，实际默认为16、颜色仍#ff0000，无对象选中，原笔的重做可用。点击重做恢复第1条8px标记后，默认仍16；恢复的整张画布RGBA与第1笔最初PNG完全一致，证明旧标记保存的样式没有随新默认值追改。这里明确采用撤销/重做恢复路径，不声称测试了携参考标记直接提交设置的路由。

保持16默认不手动修改，再于源x150～400、y约180画第2条水平参考线。四个截面实心红色均16行（y172～187），含边缘抗锯齿的变更范围为17行；按原背景绿色通道估算的覆盖宽度约15.999～16.001像素。第1条8px区域在画第2条线后仍逐像素一致。截图可见同一草稿上两条不同粗细的红色参考线。

## 当前主分支判定

| 检查项 | 结果 |
|---|---|
| Agent切换画笔、红色、默认8 | Passed，实际控件与工具回执一致 |
| 第1笔实际8px | Passed，四截面均8实色行 |
| 独立纯设置默认16 | Passed，无参考引用提交，控件16、颜色保持 |
| 原8px标记未被新默认追改 | Passed，经重做恢复后RGBA完全一致 |
| 第2笔实际16px | Passed，四截面均16实色行 |
| 原图与完成历史不变 | Passed，源1000×666 RGBA一致，原3项历史集合保持 |

本次两条正式请求均为工具设置更新，无补槽、无自动重发、无图片生成或新版本。只验当前主Agent业务分支；Technical、账本/provider费用未另核，不用页面证据推断零服务端费用。参考红线仅为引导标记，生成场景不要求成品保留该标记；本次没有提交带标记的图片修改请求。

## 收尾与证据

取证后只明确放弃本例两条未发送标记，恢复原始源和主工具栏；正文、引用及在途任务为空，原3项完成历史保留。本次没有生成或导出新成品，PNG是实际canvas取证。

证据根目录`reports/erye237-011-ego-prod-20261113-r2/`：

- 基线/提交：`clean-source`、`source-canvas.png`、`8-before-state.json`、`default8-before/submitted`、`default8-submission.json`。
- 8px：`8-terminal-messages.json`、`8-settings.json`、`8-stroke-ui`、`8-stroke-canvas.png`、`8-stroke-width-audit.json`。
- 隔离：`8-before-isolating-reference`、`8-undone-to-empty`、`8-undone-canvas.png`、`after-empty-return`、`16-before-state.json`。
- 16px：`default16-before/submitted`、`default16-submission.json`、`16-terminal-messages.json`、`16-settings-complete-main`、`16-brush-opened`、`16-settings.json`。
- 旧笔/双笔：`8-restored-under-default16`及对应canvas、`restored-old-guide-settings.json`、`old-guide-preservation-audit.json`、`two-guides-8-and-16-ui`及对应canvas、`two-width-pixel-audit.json`。
- 收尾：`cleanup-own-guides-confirm`、`final-source-history`、`final-source-canvas.png`、`final-state.json`、`final-audit.json`、`result.json`、`evidence-manifest.json`。

原011 Failed及后续待复测判断保留为历史，当前以本次真实重跑Passed为准。当前011～015主分支最新为5 Passed，只有011在本次重跑，不将其他用例说成本次重新执行。脚本仍PLAN未接入，无云效写入、无Git提交推送。
