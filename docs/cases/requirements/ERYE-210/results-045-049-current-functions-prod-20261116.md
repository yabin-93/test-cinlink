# ERYE-210 045～049 当前功能 v2 生产Chrome执行记录

<!-- ERYE210-046048-SUPERSEDED-20261116 -->
以下046/048定义和Blocked是v2历史，当前已由[v3定义](case-046-048-v3-current-controls-20261116.md)替换并[实跑通过](results-046-048-v3-production-20261116.md)；旧目标继续延期。045/047/049本轮未重跑。
<!-- /ERYE210-046048-SUPERSEDED-20261116 -->


日期：2026-11-16。生产环境，Windows有头Google Chrome，仓库自动化，单worker、零自动重试。当前43条：**38 Passed / 2 Failed / 3 Blocked / 0 Not Applicable / 0 Not Run**。

045～049按用户授权替换；014原Blocked完整保留。新定义和[迁移历史](case-045-049-migration-history-20261116.json)分开，旧入口/缓存迁移与版本回退不算新版覆盖。其他用例本轮未重跑。

| 用例 | 当前结果 | 实际结果与未覆盖范围 |
|---|---|---|
| ERYE210-045 | Passed | PA/PB共享真实WAV；PA单删不改PB与原片/字幕，PB音频区间可播放；原素材卡仍在，PA复用同一file_id并刷新保持。 |
| ERYE210-046 | Blocked | 首次清理20→18.695896秒成功；会话明确只重分析保留三段后，Agent说明当前工具仍以20秒原片为源，无法限定保留片段，因此没有提交二次分析。旧候选不算新结果；音视频、字幕及旧分析均保持，二次分析范围记阻塞。 |
| ERYE210-047 | Failed | 真实翻译配音工程8句中文声音可用；独立WAV背景音量100%→50%，保存及刷新保持；首句改“混音后重新生成047。”并明确重新生成后，页面报“编辑器执行数据不符合正式v2协议”，新声音未成功交付。未将此前无效准备判产品失败。 [云效 FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c) |
| ERYE210-048 | Blocked | 已完成真实独立英语→中文翻译配音并交付视频/工程文件，配音曾显示8句；当前工程的配音页持续报协议错误，既有文案无法稳定恢复。最终核验只回读、不再点击创建或生成；字幕改稿和后续单句更新目标步骤尚未执行，记阻塞。 |
| ERYE210-049 | Failed | 双水印关闭状态保存及刷新重开保持；第一次原生导出报页面协议错误且未交付可用结果，原任务后台done仅作辅助证据。沿同一受理任务复核，未再次导出；开启后的第二次导出和视频画面核验未执行。 [云效 FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266) |

## 前置纠正与可复现步骤

登录后，上次登记的源工程在当前账号返回404；已用本地真实20秒E196-A.mp4、8条英文SRT、真实WAV、PNG重新准备当前账号可读工程。所有目标操作在生产Chrome执行，原源工程不作目标修改。

047/048按用户纠正，必须先完成真实英语→中文翻译配音，确认目标语言、可编辑中英字幕及至少两句就绪声音。普通视频加手工字幕的初次准备无效，原脚本Failed与截图保留于precondition-history，不计产品缺陷。实际完成的原生前置见证据translation-shortcut-prerequisite.json和translation-shortcut-048-completed-project.json；translation-prerequisite.json仅是早期自由文本失败的准备历史。

本轮已通过页面“翻译配音”快捷入口选择“配音和字幕”、目标“简体中文”和“双语”，先后完成两个独立真实工程。047直接使用本轮新生成的工程，目标步骤前为8句可见配音；048另有独立完成的工程。早期复制上下文、前置属性缺失和脚本额外点击创建配音的结果单列为准备历史，作废其产品失败结论。补建前置的另一任务因积分不足（需要200、可用100）结束，没有据此认定字幕/配音隔离失败。

逐例完整操作和输入见[正式用例](case-045-049-v2-current-functions-20261116.md)。045在PA媒体聊天库导入唯一WAV、添加到20秒，准备同素材PB，PA单删后核对PB播放，再回PA复用原卡并刷新。046明确分析一次、只选停顿/0.8秒并移除；当前文稿页无二次分析按钮，因此通过现有会话发送明确只分析指令，列出实际18.695896秒及保留源区间，保留原任务核验。047先混音至50%再明确更新首句；048的目标为先改中文C1确认不自动更新声音，再明确改对应配音稿并生成，当前因配音页不可用而未执行该分支。

049在含WM049文字和真实PNG的工程关闭总开关，保存并刷新重开；点击一次右上导出，记录原任务及页面错误/结果。后台状态只用于辅助定位，不代替页面交付验收；没有为恢复结果重复导出。未实际完成的ON导出和画面审核不记通过。

## 证据与自动化

[原生截图、逐项检查和SHA256清单](evidence-045-049-current-functions-prod-20261116/manifest.json) · [本批脱敏记录](evidence-045-049-current-functions-prod-20261116/execution-evidence.json) · [当前进度](execution-status-current.md)。原始报告、受理检查点、完整工程和含签名地址的响应仅本机留存；公开证据不复制凭据或签名URL。截图原样复制，未绘制、替换或借用其他轮次失败画面。

047单句再生成失败现场：

![047 真实翻译配音工程单句再生成报错](evidence-045-049-current-functions-prod-20261116/047/prod-current-five-final-20261116-08--ERYE210-047-failed.png)

049第一次OFF导出失败现场：

![049 原生导出报错且未交付页面结果](evidence-045-049-current-functions-prod-20261116/049/prod-current-five-20261116-01--049-OFF-original-export-error.png)

[046阻塞现场](evidence-045-049-current-functions-prod-20261116/046/prod-current-five-review-20261116-03--ERYE210-046-blocked.png) · [048阻塞现场](evidence-045-049-current-functions-prod-20261116/048/prod-current-five-final-20261116-12--ERYE210-048-blocked.png)。未执行的二次范围分析、048目标编辑以及049第二次ON导出不计通过。

5条唯一注册于tests/editor/erye210-current-five.spec.ts；默认仍43个有效入口（42 AUTO、014唯一BLOCKED前置门禁）。typecheck及用例格式检查通过；脚本接入和静态检查不作为产品Passed依据。执行失败047/049已于2026-11-16按用户授权通过云效OpenAPI同步：ERYE210-047 [云效 FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c)；ERYE210-049 [云效 FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266)。对应截图已上传并嵌入、回读核验通过；本地执行状态保持。 本轮未提交或推送Git。
