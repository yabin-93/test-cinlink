# ERYE237-022/023/028/031优化后生产重跑（2026-11-16）

> 最新复核：用户明确编辑页返回后草稿默认不保存，031原Failed撤销；下方1 Failed/3 Blocked为修订前运行记录。031新版待按正常退出口径重跑，不自动改判Passed。详见[规则复核](review-031-draft-lifecycle-20261116.md)。本次仅文档修正，无新生产执行。

ego-browser有头TaskSpace15/p1、生产https://app.cinlink.ai/、账号yabinc18。用例revision2026-11-16-blocker-preconditions-v2；固定脚本PLAN未接入。仅本轮实测，不继承旧通过或把优化当执行。每个参数分别记录，整体Partial/Blocked保留缺口。

统计：{'Blocked': 3, 'Failed': 1}

| 用例/分支 | 状态 | 实际 |
|---|---|---|
| ERYE237-022/UI | Blocked | 本轮基础底图/红描边取色及实际新笔RGB通过；批注覆盖处点击打开浮层而未取色，mask在取色模式隐藏，无独立guide入口，辅助层污染排除仍部分未覆盖。 |
| ERYE237-023/Technical | Blocked | 八项合法UI、两工具端点防护、画笔/擦除0及257四条Agent明确拒绝通过；原PNG跨缩放一致、旧笔与旧mask预览不追改。持久mask位图及独立后端拒绝未覆盖。 |
| ERYE237-028/Agent | Blocked | 已读取并确认真实V2父关系，清理自身旧草稿后在V2画笔中撤销/重做均禁用；Agent准备也未执行内容撤销，正式恢复请求未发送。 |
| ERYE237-031/UI | Failed | 融合像素不可选旧对象、D真实保存重开及同对象追加均通过；但保留D时点击已完成V2结果仍显示D，无法完成不丢草稿的指定完成版查看。 |

## ERYE237-022/UI

使用群鸟原始源250eb7c0、1000×666，源PNG独立解码(100,99)=RGB118/114/112，吸管#767270，实际新笔实色一致；content红线采#ff0000、新笔RGB255/0/0。各辅助层在同一1000×666源草稿上分别实际尝试，最终GET确认draft.source仍250eb7c0（保存头e430与当前草稿源分开登记）；批注编号在eyedropper可见，但点击其中心只打开正文浮层，颜色仍原红色、工具仍eyedropper，没有发生采样。主擦除先有紫mask，切画笔取色后预览DOM不存在，不能冒称覆盖层排除已验证。工具栏/浮层无独立guide与content切换入口，未把红content线当guide；未篡改DOM或用技术模拟叠层。基础项通过，三种同源可见覆盖的隔离矩阵未完成，所以主UI仍Blocked，非已确认取色错误。没有发送生成，已清理自身批注和笔迹/mask，保留保存历史。

证据：`022-source-canvas.png`, `022-base-sampled.png`, `022-content-sampled.png`, `022-pixel-audit.json`, `022-annotation-picker-visible-state.png`, `022-marker-click-observed.png`, `022-marker-sample-observation.json`, `022-mask-before-paint.png`, `022-mask-picker-visible-state.png`, `022-mask-mode-observation.json`, `022-cleanup.png`

## ERYE237-023/Technical

同一原始250eb7c0源1000×666。画笔和主擦除在25%/200%各设置1/256并实际绘制，共8项；画笔原PNG在两缩放下RGB完全相同，中段1px改变1行，256px覆盖257行包含抗锯齿，未把覆盖框冒称实色直径。mask SVG viewBox1000×666、stroke-width1/256准确。UI min1/max256，两端继续减增保持端点；默认256不追改旧1px笔迹；mask旧polyline仍stroke-width1，变化的r0.5→128仅为当前光标，不是旧mask改宽。四条普通Agent分别画笔0/257和主AI擦除0/257均done、明确范围拒绝，无实际编辑动作；后续工具实际回读仍256，没有非法值写入。本轮任务列表前后ID集合完全一致，未生成或执行AI擦除。真实保存探针GET文档masks/intents均空；当前工具只有预览/待发送引用，没有独立的不生成保存mask位图入口，因此没有拿SVG造期望文件，也没有调用拟定接口。持久mask位图阈值/测量及服务端独立非法值拒绝未覆盖，主Technical仍Blocked；已完成的UI/Agent参数保留通过，不把缺内部证据当产品失败。

证据：`023-brush-observations.json`, `023-brush-25-1.png`, `023-brush-25-256.png`, `023-brush-200-1.png`, `023-brush-200-256.png`, `023-pixel-audit.json`, `023-mask-observations.json`, `023-ui-boundaries.json`, `023-mask-retention-boundary.json`, `023-mask-persistence-probe.json`, `023-brush0-terminal.png`, `023-brush257-terminal.png`, `023-mask0-terminal.png`, `023-mask257-terminal.png`, `023-before-jobs.json`, `023-after-jobs.json`, `023-cleanup.png`

## ERYE237-028/Agent

复用原工程a289c6e4的V2=e43002eb（026 T1右下）、父V1=336cb21（固有分支测试），没有准备新生成。初次UI撤销仅作用于原始250eb7c0草稿的本地操作，不能算V2→V1；普通Agent准备run_v2_e81b0d89e1734a62be65aceb74268f1d完成实际读取，确认父关系但明确当前草稿绑定原始JPEG、can_undo/can_redo不足以证明恢复V2，未发撤销。随后通过实际历史编辑保护明确放弃本例已清空旧草稿，回到1008×672 V2，服务端head仍e430、draft=null，UI撤销与重做均禁用。两份保存历史仍在，但未建立真实已撤销V2状态；按新版依赖规则本例Blocked，不把只查看V1、恢复为工程头或新生成相似图冒充撤销。未重发Agent准备、未发送正式恢复请求、不据本例修改原027云效状态；已清理本例待发引用。

证据：`028-project-before.json`, `028-ui-undo-observation.json`, `028-prepare-content-undo-submission.json`, `028-prepare-content-undo-terminal.png`, `028-prepare-content-undo-terminal-messages.json`, `028-v2-correct-source-project.json`, `028-v2-correct-source-controls.png`, `028-v2-correct-source-controls-audit.json`, `028-cleanup.png`

## ERYE237-031/UI

使用同一portrait工程bd3a8b81，完成V2=068dbd、源V1=a408；初始draft=null，V2保留内容像素点击无旧对象框/文字输入，先完成融合像素检查。随后在V1独立创建未提交D，白48px“031源草稿”、位置(.1,.1)；已实际保存且收起重开可选中。服务端draft_id=image_bca34618-a7de-43ec-8f80-3fc10b2ff2af，text对象id4788e863-c2d5-4dff-b58c-574624d9838f，明确不是已消费草稿。尝试切其他既有工程再返回，D保留但仍画笔模式，历史栏隐藏；Esc亦不能进入历史查看。点击真实030已完成消息中对应V2的打开图片编辑器按钮，D仍保留，但画布RGB严格等于创建后的D、与独立V2基线不等，未打开所选完成版。此为已确认D之后的查看/切换业务未完成，不再归测试准备不足。随后选择原文字、编辑为“031源草稿 已恢复”，再次收起重开并GET确认仍同一D/同一对象/源a408/白48位置保持，V2头不变，无重复对象。主UI因保留D时指定V2查看未达成记Failed；源草稿持久及续编参数Passed，不夸称草稿丢失或恢复失败。实际返回提示选择“继续编辑原始草稿”亦保留原D；无本例Agent或生成请求，最后只清理本例D。

证据：`031-initial-project.json`, `031-fused-before.png`, `031-fused-pixel-not-object.png`, `031-fused-selection-audit.json`, `031-created-draft.png`, `031-confirmed-saved-draft.json`, `031-draft-reopened-selected.png`, `031-open-fused-result-message.png`, `031-D-after-result-open.json`, `031-after-open-result-canvas.png`, `031-original-object-appended.png`, `031-appended-reopened-selected.png`, `031-final-draft.json`, `031-identity-and-view-audit.json`, `031-continue-original-D.png`

证据根目录reports/erye237-four-rerun-ego-prod-20261116/。旧11月13日报告和云效状态未据此自动改写；本次不是原缺陷修复回归，不默认执行云效状态/评论或扩散。无业务受理重发；仅清理自身未发草稿，保留完成历史。

## 本轮参数汇总

| 用例 | 已验证 | 剩余或失败 |
|---|---|---|
| 022 | 底图/红content取色与新笔像素正确；分别尝试批注、mask入口 | 编号点击拦截而不采样，mask切取色后隐藏，guide无独立可用入口；不能宣称辅助层隔离全通过 |
| 023 | 8个合法UI参数；两工具端点防护；0/257四个Agent明确拒绝；跨缩放源PNG一致；旧笔/旧mask预览不追改 | 实际持久mask位图与后端独立非法值校验缺证，仅该技术范围Blocked |
| 028 | 真实父子版本读取；清理自身旧草稿后核V2原头及撤销控件 | 未建立V2内容撤销至V1且可恢复的状态，正式恢复未发送；不是恢复失败结论 |
| 031 | 融合文字不伪称对象；D保存/重开、原对象追加及继续编辑保持来源/样式 | D确认后点V2完成消息未切到V2，画布RGB仍是D；该查看能力未通过，不能继续说“D前置未准备” |

只有当前主分支重跑，其他Agent配对/Technical配对未补算完成。Agent共5条独立请求：023非法值4条、028读取/撤销准备1条；均终态、无已受理重发，正式028恢复0次，031纯UI。生成任务0新增，未宣称provider/费用内部审计已完成。初始及最终工程头相同，portrait原16条完成历史保留；自身草稿/引用/蒙版/内容对象均已清空，输入框空，无在途图片任务。旧11月13日9/17/4批次作为历史保留，不重写为本轮统计。

本轮证据：reports/erye237-four-rerun-ego-prod-20261116/；最终清理final-cleanup-audit.json，031身份/画布核验031-identity-and-view-audit.json。本次未新建云效缺陷、未更改原云效状态/评论或接入固定脚本，无Git提交推送。031为本轮新观察到的保留D查看问题，并非原“草稿丢失”或未经执行的恢复失败。

最终检查：543条用例、0问题；四条新版分支/日期/报告链接及PLAN/空脚本路径一致，所列证据全部存在。TaskSpace15已finish keep=[]，关闭后未再操作页面。证据SHA256清单见evidence-manifest.json。ego-browser提示新版可用，本轮未升级。
