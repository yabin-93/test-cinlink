# ERYE237六条优化后生产重跑（2026-11-16）

版本2026-11-16-blocker-parameter-isolation-v2，ego-browser TaskSpace20/p1，生产app.cinlink.ai，yabinc18/Free。固定脚本PLAN未接入。参数独立记录，已受理任务不重发，本轮已结束：2 Passed / 1 Failed / 3 Blocked。TaskSpace20已finish，工程历史保留，本轮临时草稿已清理。

| 用例 | 状态 | 实际参数结果 | 证据 |
|---|---|---|---|
| ERYE237-055 | Failed | A通过：画布I2无引用，Agent正确在I1原版建立白色48px目标一文字，I2未改；已明确放弃自己的A草稿后独立准备B。B真实I2批注引用与明确I1指令冲突，却路由I2图片生成2955a6c6，终态ANNOTATION_REGION_UNCLEAR，没有先就来源冲突澄清，也未执行明确I1目标。I1/I2源均1254²且像素基线正确；不把未产图当串图，B来源路由错误导致Failed。 | 055-A-final.png、055-A-I1/I2-after.json、055-B-ready.png、055-B-final.png、055-B-jobs-latest.json |
| ERYE237-056 | Passed | 干净会话原句触发真实I1/I2澄清，选择前图片任务0；点击实际I2香水瓶选项后，同一run6b53727b从I2原版去背景并应用，新历史54a415b3，实际1254²RGBA PNG已下载且四角alpha0，I1未改。随后只看原图rune3a31694完成，画布RGB与授权原图完全一致、选择原版71，去背景完成头/历史保留，草稿/引用空，未重生成。主Agent业务Passed；末句错误称无可交付文件另作已知交付文案观察，不判该文案通过，内部费用/调用未覆盖。 | 056-clarification-before-choice.png、056-ambiguous-output-0.png、056-alpha-audit.json、056-final-original.png、056-final-source-audit.json |
| ERYE237-057 | Blocked | 本轮实际只读Agent查询run8db3884d done，editor_view_get仅声明image.edit/view.update/history/document/export/mask/prepare_task等supported_actions，无逐operation可用性/禁用原因/解除条件，无法选定真实不可用能力。未修改生产开关，未用062旧错误代替；A/B缺operation状态夹具，C缺provider/费用日志。 | 057-capability-query-terminal.png、057-capability-query-terminal-messages.json |
| ERYE237-067 | Passed | A初始无区域一次发送后明确拒绝；B先清理A错误状态，独立画20px有效笔并留证，实际Escape清空后复核空态，再一次发送也明确拒绝。任务集合保持7条、完成头未变。早期B被A错误禁用影响仅作准备记录，不算独立通过；以B2真实空态拒绝为准。主UI A/B Passed，Technical-C持久mask清空未覆盖。 | 067-A-*.png、067-B-independent-*.png、067-B2-*.json |
| ERYE237-068 | Blocked | A重新回读旧070合法受理任务及实际mask（非新生成）；B本轮同尺寸旧源mask保存409 REFERENCE_CONFLICT，C本轮真实1000×666对1254²保存409明确尺寸不符，均在generate前拒绝、草稿保持空。D无受支持可篡改校验和入口，E完整provider/费用日志缺失，整例部分Blocked，B/C Passed。 | 068-B/C-*-observation.json、068-A-069-A-reused-positive-job.json |
| ERYE237-069 | Blocked | A本轮重新下载旧070真实mask，1254²RGBA、SHA与已受理快照一致；alpha0/255端点及562个抗锯齿像素存在，源版本28绑定正确。未新增生成。B/C缺实际provider极性契约及序列化请求/隔离adapter夹具，规范检查不能替代转换通过，仍部分Blocked；不从070透明洞猜反相。 | 069-A-real-mask.png、069-A-audit.json、068-A-069-A-reused-positive-job.json |

证据本机reports/erye237-six-optimized-rerun-20261116/。旧批次结果保留，引用旧资源/快照须明确不是本轮新任务；缺内部日志不推定零调用/零费用，无云效写入。


## 实际参数与证据边界

- 055 A当前I2无引用，明确I1：真实本地文字对象“目标一”、白色48源像素、(0.10,0.10)仅落I1，I2 image_document不变。通过实际画笔返回/放弃清理A后，B在I2创建并添加真实结构化引用，同一明确I1指令被路由到I2任务2955a6c6-12c1-45e5-8542-6b88d3a94f23，ANNOTATION_REGION_UNCLEAR，未先澄清冲突，未处理I1。因此A Passed/B Failed；没有产图，不声称本轮串改成品。两个源画布RGB都与授权输入一致。
- 056 准备两候选、核可打开原图后收起编辑器，正式原句“把刚才那张背景去掉”实际进入waiting_for_clarification，按名称选择实际I2选项；没有按第二行盲选。选择前图片任务为0；后续真实remove_background/submit/apply完成，input为I2文件2aq…。实际资源PNG已下载，1254²RGBA/四角透明，I1保持。末句“最终步骤未产生可交付文件”与真实文件不符，作为交付文案观察，与既有FWXC-602类似但未云效查重或新写入；不把这句判通过。本例主验收为歧义、选定源及原图/历史切换，均完成。最后只看原图的画布RGB与输入完全一致，I2完成头54a415b3及新历史保留，未创建新图任务。
- 057 本轮实际只读查询回执仅提供supported_actions，不提供operation逐项可用状态、原因及解除条件，无法安全选择真实不可用operation；无隔离能力关闭夹具，未改共享生产开关。A/B缺该前置，C仍缺关联provider/费用日志；不将历史报错替代当前能力拒绝。
- 067 A无区域实际一次发送明确拒绝。B最初观察受A残留错误状态禁用干扰，仅作为准备记录；已移除自己的A错误状态后独立画一笔20px、确认非空、Escape真正取消并复核空态，再一次发送得到同样明确拒绝。A/B任务ID集合均不增加，完成头不变。初次禁用工具调用不是受理，不声称反复发送任务；没有图片任务重发。主UI两行通过，Technical-C已保存资源clear及内部调用/费用未覆盖。
- 068 A引用旧070合法受理快照，本轮重新读取并下载mask，而非新增合法生成。B旧来源、C错误真实尺寸本轮各一次save_state，均409明确拒绝，未调用generate；草稿保持空。D缺受支持哈希错误资源入口，E完整调用/费用日志缺失；B/C通过不扩成整例通过。
- 069 A旧070真实mask本轮重新下载，SHA b586643b…与旧受理记录一致，1254²RGBA、0/255端点及562个抗锯齿alpha像素，source_version绑定原28正确。B/C缺真实provider极性契约及序列化请求/隔离adapter测试夹具；未用本地自写反相公式代替产品适配，也不从070透明洞反推provider错误。

## 准备与清理

复用同一专用项目IMG-ANN-UI-007-20261109，新建055会话96ce64d4-6074-44b7-8c1c-c917b099aa1b和056会话4867bd31-b87f-4872-b210-9fd1d0acbe21。人像/香水瓶均使用已有授权素材，没有再调用image_gen。素材登记的Agent工程创建步骤报告同名冲突，但实际工程/原图已存在；随后通过真实UI打开各图、下载画布并与本地源逐像素核对后才开始正式请求，未把准备计划摘要当工程不存在或主例通过。

旧素材卡片入口出现Snapshot request could not be completed；同会话顶部入口打开既有工程后完成067。仅作为准备异常，不将其混入055等正式失败原因。所有受理任务均等待自身终态，不重发。055 A自己的草稿通过实际放弃清理，B失败后的自有空草稿通过受支持save_state清理，保留原完成头；056无遗留草稿或待发引用，原图与去背景历史都保留。

旧050～070批次及6条部分Blocked原始证据不改。当前六个优化主分支更新为本轮结果，配对/Technical未覆盖项不继承Passed；固定脚本继续PLAN、路径空。没有云效新建、评论、状态更新或附件写入，没有Git提交推送。055本轮新失败尚未同步云效。
