2026-11-18用户确认页面批注文字不支持自定义字号：FWXC-463取消36px前置，以实际默认字号、准确文字及合成前后位置/显示大小/布局保持验收。旧字号Blocked仅为历史，已不属于当前有效阻塞；本次仅修订规格，新口径未重跑，不自动改判通过。云效✅AI通过保持，0云端写入。UI用例018/019/029/031已调整，脚本PLAN。

2026-11-18 09:46官方OpenAPI确认：FWXC-463当前云效状态为✅AI通过（状态ID0937b1d9e486323590880e5450），本地云效字段已对齐，0云端写入。本轮实测仍为Blocked/Failed/Passed；其中Blocked指36px字号前置未完成、原目标未发送，与云效工作流状态分开记录。下文已修复为当时回读的历史状态。

# 持续回归最新对账（2026-11-17 21:55）

当前可执行队列已处理完，pending为空，当前预发没有在途业务。43项持续候选最新原回归：17 Passed、2 Failed、12 Blocked、12 Not Run；86条扩散：49 Passed、8 Failed、3 Blocked、26 Not Run。包含切换预发前真实完成的生产原场景，具体实际环境/账号见各单项报告；不能把累计统计都称为本次Chrome预发执行。

未执行范围：12项开始前已非精确已修复，原/两扩散各Not Run；542原生产已通过，但两历史扩散未覆盖，旧生产素材登记终态未确认，环境切换规则禁止预发重放，21:55官方测试完成，继续冻结。这构成扩散26条Not Run（24门禁＋2历史冻结）。未覆盖和阻塞均不计通过。

原失败：FWXC-530、FWXC-462。462本次F/F/P，主擦除把11567/11947涂抹像素清为透明，未补背景；无mask自然语言通过。21:53官方仍❌AI未通过，状态更新已回读。

本次收尾：463用户确认无法设36px，原Blocked；381 B/P/P，精确原底图准备完成，但guide更多设置不可达；21:53外部已推进✅AI通过，本轮0状态写入、不冒称本轮原通过。317 B/P/P，原五工程404且原素材未取得；两独立20秒字幕改文均真实保存、刷新和非目标轨道保持通过，21:53仍已修复、0写入。379/569开始前已❌AI未通过，本轮Not Run。

固定脚本均按单项记录，当前CUA执行没有冒称固定自动化；新增本机PNG读解码审计是证据核验工具，不是可重跑业务脚本。本次收尾无评论/附件/新缺陷或Git提交推送。既有监控安排未更改。

## 逐项最新结果

| 缺陷 | 原回归 | 扩散一 | 扩散二 | 最近记录云效状态 | 报告 |
|---|---|---|---|---|---|
| FWXC-545 | Blocked | Failed | Failed | 已修复 | [明细](FWXC-545-retest-20261116-1400-monitor.md) |
| FWXC-544 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-544-retest-20261116-1400-monitor.md) |
| FWXC-543 | Passed | Failed | Passed | ✅AI通过 | [明细](FWXC-543-retest-20261116-1400-monitor.md) |
| FWXC-542 | Passed | Not Run | Not Run | 测试完成 | [明细](FWXC-542-retest-20261116-1400-monitor.md) |
| FWXC-541 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-541-retest-20261116-1400-monitor.md) |
| FWXC-540 | Passed | Blocked | Passed | ✅AI通过 | [明细](FWXC-540-retest-20261116-1400-monitor.md) |
| FWXC-539 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-539-retest-20261116-1400-monitor.md) |
| FWXC-537 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-537-retest-20261116-1400-monitor.md) |
| FWXC-536 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-536-retest-20261116-2200-monitor.md) |
| FWXC-535 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-535-retest-20261116-1400-monitor.md) |
| FWXC-518 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-518-retest-20261116-1400-monitor.md) |
| FWXC-470 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-470-retest-20261116-1400-monitor.md) |
| FWXC-538 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-538-retest-20261116-2200-monitor.md) |
| FWXC-533 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-533-retest-20261116-2200-monitor.md) |
| FWXC-531 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-531-retest-20261116-2200-monitor.md) |
| FWXC-530 | Failed | Failed | Failed | ❌AI未通过 | [明细](FWXC-530-retest-20261116-2200-monitor.md) |
| FWXC-529 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-529-retest-20261116-2200-monitor.md) |
| FWXC-516 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-516-retest-20261116-2200-monitor.md) |
| FWXC-492 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-492-retest-20261116-2200-monitor.md) |
| FWXC-491 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-491-retest-20261116-2200-monitor.md) |
| FWXC-487 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-487-retest-20261116-2200-monitor.md) |
| FWXC-485 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-485-retest-20261116-2200-monitor.md) |
| FWXC-484 | Blocked | Blocked | Blocked | 已修复 | [明细](FWXC-484-retest-20261116-2200-monitor.md) |
| FWXC-479 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-479-retest-20261116-2200-monitor.md) |
| FWXC-463 | Blocked | Failed | Passed | ✅AI通过（11-18 09:46回读） | [明细](FWXC-463-retest-20261116-2200-monitor.md) |
| FWXC-380 | Blocked | Failed | Passed | 已修复 | [明细](FWXC-380-retest-20261116-2200-monitor.md) |
| FWXC-578 | Not Run | Not Run | Not Run | 测试完成 | [明细](FWXC-578-retest-20261117-0200-monitor.md) |
| FWXC-577 | Not Run | Not Run | Not Run | 测试完成 | [明细](FWXC-577-retest-20261117-0200-monitor.md) |
| FWXC-572 | Not Run | Not Run | Not Run | 测试完成 | [明细](FWXC-572-retest-20261117-0200-monitor.md) |
| FWXC-528 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-528-retest-20261117-0200-monitor.md) |
| FWXC-527 | Passed | Passed | Passed | ✅AI通过 | [明细](FWXC-527-retest-20261117-0200-monitor.md) |
| FWXC-494 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-494-retest-20261117-0200-monitor.md) |
| FWXC-490 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-490-retest-20261117-0200-monitor.md) |
| FWXC-489 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-489-retest-20261117-0200-monitor.md) |
| FWXC-488 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-488-retest-20261117-0200-monitor.md) |
| FWXC-480 | Passed | Passed | Passed | 测试完成 | [明细](FWXC-480-retest-20261117-0200-monitor.md) |
| FWXC-462 | Failed | Failed | Passed | ❌AI未通过 | [明细](FWXC-462-retest-20261117-0200-monitor.md) |
| FWXC-461 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-461-retest-20261117-0200-monitor.md) |
| FWXC-381 | Blocked | Passed | Passed | ✅AI通过 | [明细](FWXC-381-retest-20261117-0200-monitor.md) |
| FWXC-379 | Not Run | Not Run | Not Run | ❌AI未通过 | [明细](FWXC-379-retest-20261117-0200-monitor.md) |
| FWXC-317 | Blocked | Passed | Passed | 已修复 | [明细](FWXC-317-retest-20261117-0200-monitor.md) |
| FWXC-569 | Not Run | Not Run | Not Run | ❌AI未通过 | [明细](FWXC-569-retest-20261117-1400-monitor.md) |
| FWXC-517 | Not Run | Not Run | Not Run | ✅AI通过 | [明细](FWXC-517-retest-20261117-1400-monitor.md) |

## 当前阻塞范围

- FWXC-545：原80字label/正文测且无待发引用基线已建立。通过产品Agent一次只读准备请求读取真实project_id、annotation_id及revision，42秒完成，UI仅显示读取编辑器视图/检查编辑项目任务而无实际标识返回。精确原79/80指令尚未提交，不能猜造标识或用旧会话IDs；原验收Blocked，云效保持已修复。独立扩散按唯一批注语义执行另判。
- FWXC-539：原两批注完整名称/正文及原全局指令一次提交；B锚点校准后页面返回请先结束当前绘制操作，未创建AI生成任务/无V2。M显示本地错误且引用/正文保留；不重发。原旧引用版本回溯尚未覆盖，保持云效状态。
- FWXC-518：20秒视频/原声可写工程已建立。原Agent字幕导入前置99秒完成但跳过失败节点，实际仍暂无字幕；本次Chat有Search-A20、Project有A20和SRT，不能严格复刻原两空列表且含可编辑英语字幕前置。独立可覆盖步骤已执行：Chat/Project现均有名称搜索入口，Chat输入Search并搜索、清空可用；目标工程及20秒时间线未改变。原完整场景Blocked、云效保持已修复；不以非空列表入口存在代替原空列表全部通过。
- FWXC-470：原单只有截图/空模板，无完整步骤和宽度参数；原日文新闻素材未提供，本次用已有SSO014日语测试视频替代。已尝试的当前已有会话入口未能还原旧截图字幕配置卡片：字幕页生成字幕按钮直接启动原生生成，主页添加字幕会展开卡片但切回会话重置，未严格复现原窄聊天卡片状态。一次原生字幕生成已结束并保存日语字幕，属于准备入口偏差，未重发；原布局验收未覆盖Blocked，云效保持已修复。独立当前主页卡片窄宽度分支继续另判。
- FWXC-533：原始A图恢复且保存，但一次B版准备任务把应为蓝色“T1 新品”误写为蓝色“B版准备”，另有“保留内容”；实际PNG已下载核验。严格原B前置未满足，原完整指令尚未发送，不以等效B冒称原回归通过。保留该次准备偏差、不重复生成；当前真实A/B将作为扩散一独立验证。云效保持已修复。
- FWXC-531：严格原027前置要求沿026新完成AI版本V2，完成后尚未切历史。本轮026严格原移动请求只读取视图后done，T1未移动且没有生成AI版V2，故原内容撤销至父版/分支截断目标未到达；不将历史图片另开工程或手动Undo替代该依赖。原Blocked保持云效已修复。两扩散将分别准备正常AI修改结果，在新结果上核验内容撤销及分支，不继承原全范围。
- FWXC-516：完整20秒视频/原声已导入；两组字幕绑定成功revision2，时间4-6/10-12且源哈希一致。A1独立背景音频插入NOT_FOUND: Target timeline row not found，前置未满足，未按Delete/未验证原修复；无重发。
- FWXC-484：分析完成后run waiting_for_confirmation，英语原文正确、0口水词/2停顿；原生页面仅有流程节点等待确认剪辑方案和停止任务，底部审阅剪辑按钮未显示，切Media及等待后仍缺失，无法按原点击入口验收，故Blocked而非通过。未点击移除或应用，未导出。版本2、原视频/原声0-20秒及完整content摘要前后一致。
- FWXC-463（11-17旧口径；11-18已取消字号前置，不属于当前有效字号阻塞）：用户明确回复无法设置字号大小。自动右键/Control点击未打开绘制设置；共用画笔大小滑杆显示36但无法核实已应用至现有文字，不能以该值或视觉大小冒称36px满足。原合成指令未发送，故原回归Blocked，云效保持当前。原源实际导出与原报告SHA79eb642d完全一致，现有红字/位置保留，可另作未限定字号的位置合成变体，不代替原通过。
- FWXC-380：严格原017上下文菜单删除入口未打开；已完成原底图恢复、S1/T1/H1、T1移动缩边，键盘删除/撤销作为扩散一变体。原029蓝色36px字对象前置仍无法完成（用户亦确认无法设置字号），未用默认字号替代。原目标未严格执行，不据准备/变体判原通过。
- FWXC-381：已恢复精确a408历史1024²底图，导出字节与c269915e源完全相同。实际进入画笔并创建右侧保留内容，准备中颜色应用未可靠完成，右键未打开对象更多设置，无法勾仅供AI参考并核验。严格原目标未发送，不以变体代替原通过；保留已完成工程/源图/草稿，后续独立入口扩散。用户已确认463无法设字号，不重复要求手动设置。
- FWXC-317：已读完整原005/006/007/008场景与提示词。当前yabinc92预发认证下，原005/006/007/008A/008B五工程官方产品GET均404；本机指定素材目录/Downloads/Documents未找到原张雅婷(Tin)分享的视频.mp4 120.33s，不能复刻148字幕及6.64–7.12 solution./2.02–2.22 Hello基线。未向生产重放、未替换原素材或原提示词提交；严格原五run范围未执行，保留已修复。独立20s受控素材扩散不冒称原通过。

机器账本与全部现场证据：reports/fixed-monitor-20261116-135748/progress.json、final-queue-audit-20261117-2155.json；维护状态reports/fixed-regression-monitor/state.json。4项更早轮次待人工确认属于原有单独清单，未因当前队列完成被清除。
