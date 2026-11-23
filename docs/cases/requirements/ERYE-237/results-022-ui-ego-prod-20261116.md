# ERYE237-022新版主UI生产重跑（2026-11-16）

**Passed / UI主分支**。用例revision2026-11-16-ui-content-sampling-v3，按实际底图/content取色入口重新执行，不使用旧基础结果补算通过。辅助层隔离归独立Technical，本次不要求穿透批注、mask与取色同时显示或新增guide入口。

生产https://app.cinlink.ai/，macOS、ego-browser有头TaskSpace17/p1，账号yabinc18。复用群鸟JPEG工程a289c6e4-917b-46d0-a850-30987d286f13，正式源250eb7c0为1000×666原图。开跑确认原有草稿各对象/引用均空；切到原图时通过真实保护提示放弃该空草稿，未删除已有内容或完成历史。

| 参数/步骤 | 实际结果 | 判定 |
|---|---|---|
| 底图Q0 | 页面坐标(643,152)映射实际源(100,99)；独立PNG RGB(118,114,112)，吸管回读#767270 | Passed |
| 底图色复用 | 用取到的色画8px笔迹；实际源(200,533)实色RGB(118,114,112)，撤销该笔后源RGB恢复 | Passed |
| content Q1 | 创建红色8pxcontent笔迹，在归一化(0.3,0.4)描边内部取色，回读#FF0000 | Passed |
| content色复用 | 在独立区域新画8px验证笔，实际源(600,533)为RGB(255,0,0) | Passed |
| 取色只读 | 两次取色前后原尺寸PNG RGB分别完全一致，不改变采样内容 | Passed |
| 清理和副作用 | 撤销两条红笔后，原源RGB完全恢复；原完成头及历史集合保持，无新增图片任务，无待发引用/正文 | Passed |

仅现有颜色面板“从图片中取色”与真实画笔操作；没有直接设置期望RGB冒充吸管。红色RGB仅用于准备content本身，复用笔的颜色来自实际取色。所有采样点避开UI覆盖、透明和抗锯齿边缘；没有调用生成、Agent或拟定采样接口。

原保存头e43002eb保持，原8项完成历史保留。末尾工程content/mask/批注/引用均空，图片任务列表ID集合前后一致且无在途任务。原辅助层混入主UI的Blocked只保留为旧版历史，本次不推断辅助层Technical已通过，也不是产品修复。

证据根目录reports/erye237-022-ui-ego-prod-20261116/：

- `initial-history.png`
- `source-canvas.png`
- `sampling-observations.json`
- `base-sampled.png`
- `base-color-reused.png`
- `red-content-sampled.png`
- `red-color-reused.png`
- `pixel-audit.json`
- `clean-source-canvas.png`
- `final-clean.png`
- `final-project.json`
- `before-jobs.json`
- `after-jobs.json`

固定脚本仍PLAN、路径为空；只完成当前主UI，Agent/Technical配对未执行。不更改原云效状态/评论或创建缺陷，无Git提交推送。

最终校验：543条用例、0问题；022/UI v3 Passed的登记/日期/报告及PLAN/空脚本一致，其他三条登记未变。清理时即时GET曾落后一个撤销保存，稳定回读已确认overlays为空，未将保存队列中间态当残留。TaskSpace17已finish keep=[]，关闭后无页面操作。证据SHA256见evidence-manifest.json；ego-browser提示新版可用，本轮未升级。
