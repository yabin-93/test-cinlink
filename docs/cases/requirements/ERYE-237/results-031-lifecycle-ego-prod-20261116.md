# ERYE237-031草稿生命周期生产重跑（2026-11-16）

**Passed / UI主分支**。用例revision2026-11-16-explicit-draft-lifecycle-v3，按用户“编辑页返回后草稿默认不保存”的最新规则实际重跑；不是依旧证据改判，也不是产品修复。此前错误前提下的Failed仍按规则复核撤销，原证据保留。

环境：生产https://app.cinlink.ai/，macOS、ego-browser有头TaskSpace16/p1、yabinc18。同一portrait.png工程，完成V2与源V1分别核对，初始draft=null。纯UI，无对话提示词，无Agent或新图片生成。

| 参数/步骤 | 实际结果 | 判定 |
|---|---|---|
| 融合V2文字 | 在选择工具点击“保留内容”像素文字，无旧对象框或文字输入，不伪称原文字可编辑 | Passed |
| 源V1编辑 | 新建白色48源像素“031源草稿”，位置(0.1,0.1)，选中原对象追加“ 已恢复”；实际文本为“031源草稿 已恢复” | Passed |
| 明确继续 | 返回图片工具出现确认，选择“继续编辑原始草稿”，同一D/对象/源版、文本及位置样式保留 | Passed |
| 返回退出 | 再从同一真实返回入口选择“放弃更改”，按页面确认完成默认不保存的退出流程，GET draft=null | Passed |
| 重进源V1 | 无旧测试文字、无原对象选择框/输入，GET仍draft=null，没有自动恢复未保存D | Passed |
| 完成图及副作用 | V2头保持、前后画布RGB严格一致，初始可见完成历史集合保留；任务ID集合不变，无在途图片任务、引用或正文 | Passed |

本次未把收起面板当返回退出，也未要求默认保存/跨结果带D导航。退出路径有确认对话框，本轮实际采用明确“放弃更改”，不声称另测了无确认静默退出。

工程bd3a8b81-3454-40aa-b634-f6a073d261f7；V1=editor_image_a408be41cc4a41359a04b6d9eec3ac7d，V2=editor_image_068dbd02551144fb85e813546234e21d。真实草稿和对象身份、逐步回读及RGB/任务核验见本机lifecycle-audit.json。首次创建后的即时GET尚处保存队列，其空overlays不作结果；采用选择阶段的稳定回读与继续后的回读核验身份。一次定位“编辑文字”按钮时，实际已进入行内输入，依据当前输入框继续编辑；未新建第二对象或重复发任务。

证据根目录reports/erye237-031-lifecycle-ego-prod-20261116/：

- `initial-history.png`
- `fused-text-not-object.png`
- `draft-created.png`
- `draft-after-selection-project.json`
- `same-object-appended.png`
- `return-confirmation-continue.png`
- `continued-editing.png`
- `continued-project.json`
- `return-confirmation-discard.png`
- `returned-no-draft.png`
- `after-return-project.json`
- `reentered-V1-no-old-object.png`
- `reentered-V1-project.json`
- `final-V2-preserved.png`
- `lifecycle-audit.json`

固定自动化仍PLAN、脚本路径空，配对Agent/Technical未补算通过。仅本例新跑，022/023/028仍沿用各自Blocked。没有云效状态、评论或新缺陷写入，没有Git提交推送；最终仅本例未保存D已按正式步骤放弃。

最终校验：543条用例、0问题；031 v3主分支Passed/日期/报告与PLAN/空脚本路径一致，全部所列证据存在。TaskSpace16已finish keep=[]，关闭后未再操作页面。原始证据附evidence-manifest.json的SHA256清单。ego-browser提示新版可用，本次未升级。
