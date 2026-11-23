# ERYE237优化11条＋补执行6条：生产报告（2026-11-17）

当前范围已变更：用户随后将本报告4 Failed＋10 Blocked共14条改为[图片批注UI新版](revision-fourteen-image-annotation-20261117.md)，随后去重为3条补充Not Run＋11合并索引。下方3P/4F/10B为本次旧范围的真实历史结果，不代表新版执行或产品修复。原报告正文/原始证据及SHA清单保持，当前091～110为4P/2F/3NR＋11合并索引。

本轮17条最终：10 Blocked / 4 Failed / 3 Passed。已纳入全部范围；Not Run表示尚待执行，Blocked表示只完成可执行步骤而核心分支缺控制，不能计为Passed。

生产：https://app.cinlink.ai/；ego-browser有头TaskSpace28；yabinc18；复用IMG-ANN-UI-007-20261109、portrait.png。本次用户确认两组都执行，包括六条原协议用例。按[修订计划](optimization-eleven-blocked-20261117.md)逐项取证，原技术目标保留，UI/客户端模拟不冒称服务端事务/账务通过。固定脚本PLAN/空路径。本次未提交云效或Git，原105/107及FWXC-652/653/610保留。

| 用例 | 当前整体结论 | 实际结果与未覆盖项 | 本机证据 |
|---|---|---|---|
| ERYE237-091 | Blocked | 已向真实projects/save执行3项负向：未知save_mode、额外字段、不兼容format_version均HTTP400且内容和revision316保持；正常保存对照HTTP200。保存契约子项已完成；未知Agent operation/完整结构化定位及provider审计尚未覆盖，不用save响应代替全部命令层要求。 | `091-valid-id-negative.json`、`091-valid-id-ui.png` |
| ERYE237-092 | Failed | 当前发布的image.edit使用稳定对象ID，未提供当批别名声明/引用及alias→稳定ID返回能力；本次明确请求同一原子批次，Agent终态44秒明确答复不支持，未写入、不拆批或用预置UUID冒充别名。按本例已列明的需求能力判未通过；动态跨batch负向未能触达，不声称执行过不支持的协议。 | `092-agent-terminal.png`、`092-agent-terminal-messages.json`、`published-editor.js` |
| ERYE237-093 | Passed | 已修正合法形状夹具并实际调用一次editor_image_edit，三命令在同一commands中：移动现有文字、新增合法rect、删除不存在ID；实际返回INVALID_ARGUMENT图片对象不存在。前后完整content相等且revision318不变，无残留文字位移/形状；随后一次UI撤销真实还原先前097文字，R319恢复QA237-B-REPLANNED，未插入失败批次撤销组。此前只读准备和错误夹具未产生写入，未补算通过。 | `093-contract-corrected-commands.json`、`093-final-messages.json`、`093-before-project.json`、`093-after-project.json`、`093-one-undo-settled-project.json`、`093-valid-contract-terminal.png`、`093-one-undo-settled-ui.png` |
| ERYE237-094 | Passed | 真实同文档快照R315：A保存QA237-A-R1获R316；B持R315被409 STALE_REVISION拒绝并返回current_revision316，A内容不变。B重读后保留A文字并新增QA237-B-REPLANNED，独立新操作获R317；原图和历史未覆盖。 | `094-R0-fresh-project.json`、`094-A-save.json`、`094-B-stale.json`、`094-B-replanned.json`、`094-final-project.json` |
| ERYE237-096 | Blocked | 已执行本页真实保存延迟及发送前失败两分支：held期间权威R319、view status=saving，依赖发送仅本地queued且无runId；放行后持久化R320才建立Agent run，未采用未确认短线生成。第二次保存故意未发送即失败，权威未推进，UI显示保存结果未确认并保留两短线；明确恢复同一原始保存请求后R321确认。客户端分支通过；服务端落库拒绝控制及失败后Agent依赖写入分支仍未覆盖，保留Technical整体Blocked。 | `096-held-fault.json`、`096-held-pending-network.json`、`096-agent-waits-for-save-ui.png`、`096-pending-agent-terminal-messages.json`、`096-failed-save-ui.png`、`096-failure-authority-project.json`、`096-recovered-project.json`、`096-recovery-network.json` |
| ERYE237-097 | Blocked | 已真实补测：B在主工具200%进入is-pannable并拖动得到pan(70,40)，A保存本轮本地文字后权威R318；单独视图检查前后内容完全相同且revision318保持。A内容同步后B曾恢复适应窗口，作为观察保留。双权威配置和authority审计仍缺，技术整体Blocked。 | `097-A-text-ui.png`、`097-B-before-pan.json`、`097-B-after-pan.json`、`097-pan-control-before-project.json`、`097-pan-control-after-project.json`、`097-final-ui.png` |
| ERYE237-098 | Blocked | 单次真实生成705e0d3a：合法请求base324，接收快照base325；权威R325已提交mask/intents消费、保留空草稿，固定源V1/aox与实际mask p56、蓝点prompt保持。pending→running期间R325不变，完成应用一次至R326。已完成可观测冻结/进度/应用分支；事务原子提交及独立expectedCommitRevision字段仍缺审计，不以顺序快照证明数据库原子性。产物语义另有已知擦除透明问题，不冒称此次完成蓝点。 | `098101-native-transport.json`、`098101-before-send-project.json`、`098101-accepted-project.json`、`098101-accepted-jobs.json`、`098101102106-after-probes-project.json`、`098101-progress2-project.json`、`098101-progress2-jobs.json` |
| ERYE237-099 | Passed | 已真实建立并发前置：原生80679c34冻结base329且running时，经正常projects/save将独立QA237-099-R1草稿保存至R330（HTTP200）。旧任务最终done/application_status=conflict，保留真实候选PNG文件cnnyb4及原source血缘；权威仍R330、原工作头4ebc未变，完整R1文字草稿保留。未强写数据库或以未成立冲突当通过；候选未激活，未覆盖原图。 | `103-received-response-lost.json`、`099-before-concurrent-project.json`、`099-establish-R1-request.json`、`099-establish-R1-response.json`、`099-R1-project.json`、`099-final-observation-jobs.json`、`099-final-observation-project.json`、`099-final-observation-ui.png` |
| ERYE237-100 | Blocked | 已执行真实断线/刷新恢复：同原705e0d3a终态done，刷新前后完整内容相同、R326保持，显式启用Network的恢复取样记录42个请求、原生generate POST为0，未新建任务或版本。当前原生任务通道按已发布实现轮询；eventId重复/旧进度延迟/sequence缺口未有该通道控制，保留专项Blocked。附加结果文件读取发生20秒超时，仅文件读取证据缺口，未重发生成。 | `100-before-reconnect-project.json`、`100-after-reconnect-project.json`、`100-before-reconnect-jobs.json`、`100-after-reconnect-jobs.json`、`100-reconnect-requests.json`、`100-after-reconnect-ui.png`、`100-reconnect-network-enabled.json`、`100-confirmed-after-reconnect-project.json`、`100-confirmed-after-reconnect-jobs.json` |
| ERYE237-101 | Blocked | 执行真实已受理C1同ID同完整payload两次并发重放，均202返回原task705e0d3a；三个接收响应的task_id和创建时间相同，最终仅新增该一任务和一次应用修订R326。服务端可见幂等子项通过，不以按钮禁用代替；独立provider调用次数和账本不可读，费用/实际执行去重内部专项仍Blocked。 | `098101-native-transport.json`、`101-duplicate-a-request.json`、`101-duplicate-a-response.json`、`101-duplicate-b-request.json`、`101-duplicate-b-response.json`、`098101-progress2-jobs.json`、`098101-progress2-project.json` |
| ERYE237-102 | Failed | 真实原生生成已受理C1=f8a9f921、task705e0d3a运行中；保持同operation_id仅把prompt从蓝点改为紫点，服务返回202和原task，未明确拒绝ID复用/输入变化。权威原submission仍是蓝点且未多建任务；失败点是变更请求被当作已受理，不能写成重复生成。 | `098101-native-transport.json`、`102-changed-payload-request.json`、`102-changed-payload-response.json`、`098101102106-after-probes-jobs.json`、`098101102106-probed-ui.png` |
| ERYE237-103 | Blocked | 已完成两种真实传输样本：C1=bc60d19e在发送前故障，服务查询无任务、输入/源选区保留；确认未受理后经已发布API原样恢复同C1，服务器真实202受理80679c34后只丢客户端响应。按C1查询唯一原任务；页面刷新自动恢复同一在途任务和原提示词、输入为空，151请求中generate POST=0，没有新ID重发。已受理分支的触发来自Page.fetch技术调用，原生UI重试按钮/完整回调及独立费用仍未覆盖，保留Technical整体Blocked。 | `103-unreceived-fault.json`、`103-unreceived-authority-jobs.json`、`103-unreceived-authority-project.json`、`103-unreceived-ui.png`、`103-restored-unreceived-draft-ui.png`、`103-received-response-lost.json`、`103-recover-C1-received-loss-transport-error.json`、`103108-reconnected-jobs.json`、`103108-reconnect-requests.json`、`103108-reconnected-ui.png` |
| ERYE237-104 | Failed | 已通过真实刷新卸载图像视图并关闭另一本轮页；传输记录仅workspace、project_id=null、editor_visible=false。明确要求不自动打开编辑器、向授权目标添加NO-VIEW-104，实际Agent99秒仅执行3次读取后done，intent_fully_satisfied=false、无解释；权威R326/draft=null不变，未创建文字。按该Agent文档请求未完成判Failed；未实际发缩放命令，缩放拒绝专项不计通过，不据此宣称后端文档接口不存在。 | `104-no-live-image-transport.json`、`104-agent-submission.json`、`104-final-messages.json`、`104-before-project.json`、`104-after-project.json`、`104-agent-terminal.png`、`104-reloaded-no-image-view-ui.png` |
| ERYE237-106 | Failed | 原task705e0d3a明确running、当前权威R325时，以全新operation_id和另一合法背景修改prompt提交同文档第二请求；服务返回202及原task，未给BUSY/正在执行拒绝信息，也未说明新目标未受理。未出现第二任务，但不同请求被静默映射为原任务，未满足明确拒绝语义。Agent/取消分支未补算通过；不重发原生成。 | `106-before-second-jobs.json`、`106-before-second-project.json`、`106-new-operation-busy-request.json`、`106-new-operation-busy-response.json`、`098101102106-probed-ui.png` |
| ERYE237-108 | Blocked | 复用103的真实未受理/受理后丢响应样本检查客户端映射：未受理查询无任务；受理后原C1唯一映射80679c34，刷新从权威任务重建同一来源和提示词的在途对话展示，未重提生成。当前原生消息展示由submission重建，不能仅以runtime消息列表缺对应行断言孤儿。服务端worker事务前/后中断、outbox恢复及投递日志无隔离控制，核心原子性仍Blocked；浏览器丢响应不冒称worker中断。 | `103-unreceived-authority-jobs.json`、`103-received-response-lost.json`、`103-received-authority-jobs.json`、`103108-reconnected-jobs.json`、`103108-reconnected-project.json`、`103108-reconnect-requests.json`、`103108-reconnected-ui.png` |
| ERYE237-109 | Blocked | 已执行授权原图回读及真实文件下载：V1/aox文件HTTP200、1254×1254正常；已检查发布通道和现有失败记录。没有可恢复同源的隔离preparing故障控制，不能删除共享原图或以字段/上传拒绝冒充准备失败；核心preparing失败、provider零调用及费用分支Blocked。 | `109-source-read.json`、`109-source-control.png`、`109110-jobs-39cdf63c-d593-4538-816a-5d1c29973e36.json` |
| ERYE237-110 | Blocked | 本次实际读取两会话共24条原生任务，唯一失败类型均为EXECUTION_OUTCOME_UNKNOWN（60335100/73bb814b），result=null；已明确与原105的导出阶段错误区分，未重试未知任务。无确定provider终态失败样本或隔离控制，故该核心分支、retryable/new-attempt/费用仍Blocked，不能将未知或导出失败替代PROVIDER_FAILED。 | `109110-jobs-39cdf63c-d593-4538-816a-5d1c29973e36.json`、`109110-jobs-39f4248c-0462-4978-912e-b714ad69a992.json`、`109-source-control.png` |

证据根目录：`reports/erye237-revised-eleven-plus-six-ego-prod-20261117`（仅本机，可能含签名链接，不提交）。原[091～110批次报告](results-091-110-ego-prod-20261117.md)为历史，不被覆盖。逐条时间见results.json。TaskSpace28已finish（keep:[]），两份本轮原生任务均终态；自有草稿已清理，最终R331/draft=null、原图V1可选、输入和待发引用为空，原图/完成版/冲突候选保留。

## 统计与覆盖边界

本轮17条：**3 Passed（093/094/099）、4 Failed（092/102/104/106）、10 Blocked**。其中优化11条为1 Passed/2 Failed/8 Blocked，原未执行6条为2 Passed/2 Failed/2 Blocked；本轮Not Run为0。Blocked只代表实际完成可执行子项/前置检查、核心技术分支尚未覆盖，不等于17条均完成全部技术验收。

与未重跑的095 Passed、105/107 Failed合并后，091～110当前为**4 Passed / 6 Failed / 10 Blocked**。旧1P/2F/11B/6NR及原报告保留为历史。原105/107及其FWXC-652/653/610未重判或改云效状态。

| 仍阻塞用例 | 已执行与剩余原因 |
|---|---|
| ERYE237-091 | 已完成3个真实保存契约负向；Agent命令层未知operation、详细定位/恢复信息及provider审计未完整覆盖。 |
| ERYE237-096 | 已完成客户端延迟/传输失败/原请求恢复；缺服务端落库拒绝控制、失败草稿依赖写入分支。 |
| ERYE237-097 | 已完成内容与缩放/平移分离；缺双权威配置及authority观测。 |
| ERYE237-098 | 已完成接收冻结、输入消费、进度不增内容修订、一次应用；缺事务级原子快照及明确expectedCommitRevision审计。 |
| ERYE237-100 | 已完成真实刷新恢复且无再提交；缺重复eventId、迟到进度与sequence缺口重放。 |
| ERYE237-101 | 已完成同C1并发重放且仅一任务/应用；缺独立provider调用与账本去重审计。 |
| ERYE237-103 | 已完成同C1请求前故障、API受理后丢响应、UI重连恢复；原生UI重试/完整响应丢失回调及独立费用未覆盖。 |
| ERYE237-108 | 已完成原操作/源/任务/对话展示重建；缺worker事务前后中断和outbox恢复控制与日志。 |
| ERYE237-109 | 已完成授权源图真实回读；无安全可恢复的preparing定向失败控制，未删除共享文件。 |
| ERYE237-110 | 已区分两个实际unknown记录与导出错误；缺确定provider终态失败样本/控制和阶段/费用审计。 |

当前失败的本地候选记录见[缺陷整理](../../../defects/ERYE237-revised-eleven-plus-six-findings-prod-20261117.md)。102/106为两个验收点、疑似同一在途任务复用问题，合为一类候选；未在本轮查询、去重或提交云效，不能声称已有新云效编号。092能力缺失依据当前用例/发布契约与实际Agent拒绝；104依据实际请求未完成，不推断后端接口不存在。

## 取证说明

- 103第一次原生恢复发送按钮禁用，没有发第二次原生生成；恢复按钮因当前保留mask提示先处理选区。先确认C1未受理和revision仍328后，经已发布接口原样恢复同C1一次，真实受理后丢响应。该触发与原生UI回调明确区分。
- 100最初一次未显式启用Network的网络列表不用于证明零请求；后续已启用Network重新取样42请求、原生generate POST为0。103重连另有151请求、原生generate POST为0。没有为重复采样重发生成。
- 098/101结果文件详情已回读，但后续文件URL/图片读取发生20秒超时，未以旧PNG冒充本次新下载。任务结果复用已有file_id36pac（与前批相同），文件质量不在本例事务验收范围；已有AI擦除透明异常保留，未声称蓝点修改成功。
- 099真实正常save_state建立R330后，旧任务329最终conflict，候选file_cnnyb保留；R1草稿完整相等。验证完仅删除本轮draft e483，最终R331。
- 本机辅助取证脚本不等同已接入固定自动化。全部17条仍PLAN/空script。无本轮云效写入、Git提交或推送；不改其他并行测试任务。

校验：`npm run cases:check`（本机通过临时python3启动包装，543条/0问题）及范围内`git diff --check`通过。实际审计见本机final-verification.json；原图SHA256仍与登记一致。
