# ERYE196优化后5条 Chrome生产重跑（2026-11-17）

<!-- E196-5-NO-BILLING-20261117 -->
2026-11-17用户允许新建测试项目，扣费/账单暂不验。最新五条2P/1F/2B：088真实后期取消补测Failed（完成结果仍被标已取消）；090依据上轮幂等实测按非账务范围重判Passed，非新重跑；089沿用Passed，071/076仍缺真实处理窗口/可恢复源失效样本。脚本PLAN/空路径，未写云效。[最新范围与补测](results-five-no-billing-chrome-prod-20261117.md)。
<!-- /E196-5-NO-BILLING-20261117 -->

范围：071、076、088、089、090；Google Chrome有头，生产https://app.cinlink.ai/，测试账号U1。按[分步计划](blocked-step-plan-071-076-088-089-090-20261117.md)执行。本轮新做的分支与旧证据明确区分；固定脚本PLAN、路径为空。

当前已登记5/5：{"Blocked": 4, "Passed": 1}。
检查点：优化后5条已重跑：089 Passed，071/076/088/090 Blocked；本轮6个已受理任务已核验终态，20秒原稿content完整保持、网络恢复无限速；未写云效。

| 用例 | 本轮结论 | 已做与未覆盖 |
|---|---|---|
| ERYE196-071 | Blocked | 新轮上传门禁、就绪后一次追加及刷新恢复通过；真实服务端处理中窗口未建立。 |
| ERYE196-076 | Blocked | 本轮正常源、保存稿及实际成片对照通过；仍缺曾有效且当前云端不可读的可恢复源。 |
| ERYE196-088 | Blocked | 本轮公开取消工具已成功取消运行中导出，重开后终态稳定；近完成窗口及账务仍未覆盖。 |
| ERYE196-089 | Passed | 本轮提交前失败恢复、真实服务端失败恢复及已取消后重发三分支均通过，三份成片与原稿一致。 |
| ERYE196-090 | Blocked | 新轮1次创建+3次同键重放仅一个任务，实际文件正确；账务明细仍缺可关联入口。 |

## ERYE196-071：Blocked

A/B：新60秒1280×720合法MP4（34,290,013字节）真实限速上传至2%，素材卡不存在且保存稿content未变。完成后同名卡仅1张，登记未自动放置。D：解除限速，就绪后仅拖放一次，视频及原声各新增20～80秒一个实例，原字幕/BGM及其他配置保持；保存revision14，刷新后仍80秒、2段视频/2段原声。全片水印显示范围随总时长扩展属于原全片属性，配置未变化。E：只删除本次追加，revision15完整content恢复为原20秒基线，网络限速已解除。C：未取得可证明仍未就绪的服务端处理阶段，不能用上传100%或已就绪卡代替该门禁，C仍Blocked；整例不计通过。全部为本轮新操作，未复用旧072当此次上传结果。

证据：071-upload-gate-no-card.png/.txt；071-ready-not-placed.png/.txt；071-appended-once-80sec.png/.txt；071-reloaded-80sec-two-clips.png/.txt；071-restored-20sec.png/.txt；071-branch-checks.json。脚本PLAN/空路径。

## ERYE196-076：Blocked

A：本轮重新读取并备份原20秒保存稿，原视频/原声、SRT和BGM均能取得权威素材元数据；原源通过本轮090正常导出完整生成并实际下载076-normal-control.mp4，完整解码通过，未用旧文件充当新对照。B：另只读检查用户此前提供的f17816fe会话，实际为ERYE199-030-failed-ten-rerun-20261116工程，其same.mp4及SRT元数据可读，不能作为已证失效源。公开工具目录有视频源替换入口，但尚无经过确认的真实失效S及可恢复条件；未删除共享文件或伪造ID。C/D/E依赖真实失效源未执行，整例Blocked；签名过期、损坏上传和本机断网均未拿来替代。

证据：00-baseline-doc-local.json；076-normal-saved-control.png/.txt；076-normal-control.mp4；076-recovery-fixture-reads-local.json；076-provided-conversation-assets-local.json。脚本PLAN/空路径。

## ERYE196-088：Blocked

A：页面仍无取消按钮，但实际MCP编辑器工具目录发布editor_task_cancel与task_get/list。B：本轮独立导出2b286368-5632-4352-a160-8f88cc46c245受理pending，取消前真实running；通过发布工具取消一次返回HTTP200、status=failed/application_status=cancelled、EDITOR_TASK_CANCELLED、result=null，业务结论为已取消。D：Chrome收到Editor task was cancelled，等待超过正常导出8.554秒处理窗口后及重开页面再次只读查询，仍相同取消终态、无成功结果；原稿revision15/content保持，历史成片未删除。C：公开任务记录无可用的渲染进度/近完成阶段，只有任务状态及资源利用率；未把GPU/CPU指标或估计时间当近完成证据，未盲目新建T晚碰时机。E：仍缺按该任务关联的实际结算/释放流水，C/E保留Blocked。后端取消分支通过不代表页面取消入口已修复；087既有缺陷未更新云效状态。

证据：088-editor-tool-catalog-local.json；088-early-task-before-cancel.png/.txt；088-early-cancel-local.json；088-early-after-local.json；088-after-early-cancel.png/.txt；088-reopened-original-document.png/.txt；088-after-reopen-cancelled-local.json。脚本PLAN/空路径。

## ERYE196-089：Passed

A：明确重新导出当前已保存20秒稿，revision15/content保持。B：在Chrome发送前阻断一次真实导出创建，确认未到服务端；页面提示结果未知/勿重复发起，解除拦截后显式新导出4b544e19-93cf-4a02-8110-42233523840c完成并下载。C：按已发布导出约束，以16:9工程请求9:16建立真实受理任务2391f982-16e7-421a-ae7f-c9de3c76fc6b，终态failed、EXPORT_CONSTRAINT_VIOLATION、无文件；明确纠正约束为16:9，独立新任务be8e0e35-d137-4feb-abf3-4a94ca01b3a5完成，通过Chrome实际读取交付MP4。此为真实服务端导出规格校验失败恢复，不宣称覆盖worker崩溃或中途渲染故障。D：从本轮已真实取消的2b286368任务恢复，显式发起aaf8ca5c-0333-44f1-aa0d-ae9404d97337完成并下载。E：旧失败仍failed、旧取消仍cancelled且无成功结果；B/C/D各实际文件8,167,772字节，SHA256均与本轮已完整解码的20秒正常成片一致，原文/水印/BGM保持，工程content未变，没有重复执行编辑或静默换源/换版。全部使用本轮新样本；请求ID是否复用未作硬条件。 附加界面观察：B的新任务及下载已成功，原网络请求的“结果未知”横幅仍保留（final-original-20sec-preserved.png）；它未证明新任务失败，本轮未验证该提示的自动清理策略或自动提单。

证据：089-B-network-rejected-before-send.png/.txt；089-B-explicit-retry-running.png/.txt；089-B-explicit-retry-completed.png/.txt；089-failure-fixture-response-local.json；089-server-failed-task-local.json；089-server-failure-retry-final-local.json；089-cancelled-retry-completed.png/.txt；089-B-explicit-retry.mp4；089-C-recovered.mp4；089-D-after-cancel.mp4；089-branch-checks.json；final-original-20sec-preserved.png/.txt。脚本PLAN/空路径。

## ERYE196-090：Blocked

本轮新建导出d4e39b0c-3591-4be7-9a35-99fea7f5fe30，随后保持真实幂等键及业务请求体串行额外重放3次，均HTTP200返回同一任务running，最终done、冻结revision15。实际任务列表只出现该task一次；本轮成片8,167,772字节、20秒、H.264/AAC，完整解码通过，SHA256与同内容旧对照一致，工程content未变。没有把历史三次重放算作此次新测。另实际打开账户设置，只有个人信息/剪辑偏好/关于我们及会员、积分/充值，没有任务关联账单；公开编辑工具目录无账务工具，任务返回也无billing/预留/结算记录。现有余额3,280及同task_id不足以证明不重复收费，D/E保留Blocked，A/B/C通过。

证据：090-new-task-pending.png/.txt；090-new-round-export.mp4；090-summary.json；090-creation-local.json；090-replay-1/2/3-local.json；090-account-settings-no-ledger.png/.txt；090-final-task-local.json。脚本PLAN/空路径。

## 执行边界

本轮不自动同步云效，不重复提交既有缺陷，不写云端代码或删除生产共享源。浏览器发送失败不作为服务端failed，签名过期不作为源失效，余额不变不证明账务正确。已受理任务只查询原结果；090的同幂等创建重放属于本例明确步骤，不能与额外自动重试混淆。

原始证据目录：[本轮reports](../../../../reports/erye196-revised-five-chrome-prod-20261117/)。带local的网络原文仅本机保留，不外传凭据或临时签名定位。

收尾：已确认本轮6个任务均终态（4个done、1个主动取消、1个预期规格校验failed），原工程content保持；网络恢复无限速，已在取证后关闭旧错误提示，Chrome保留原20秒工程。071新素材保留为项目已登记测试资产，未删除共享素材。
