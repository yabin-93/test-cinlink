# SSO-015～018五轮恢复/历史执行记录（2026-11-05）

计划4例20轮；实际受理20个目标业务任务，11轮生成MP4、9轮服务端失败、0轮受前置限制未执行。逐轮验收10轮通过、1轮媒体完成但原UI恢复受阻；整例1通过/3未通过/0受阻。未执行及UI恢复未完成均不计通过。

## 用例与逐轮结果

| 用例 | 当前结果 | 会话ID |
|---|---|---|
| SSO-015 | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次 | `204d84c1-2399-4a2b-85a9-9a46b5caaf9f` |
| SSO-016 | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次 | `25a191b8-9d3d-485d-b6e4-a192a3869dc3` |
| SSO-017 | 未通过：受理5/5轮，任务失败1轮；R2媒体/API下载恢复，重开后UI认证阻塞保留；人工重新登录后续跑已完成 | `d0fc4819-0be6-421e-b416-81fc0c94da46` |
| SSO-018 | 5轮指定验收通过 | `97cf1254-4ee6-4391-af2f-514b4237ca6a` |

| 轮次 | 验收结论 | 服务端状态 | 实际MP4 | run_id |
|---|---|---|---|---|
| SSO-015 R1 | 任务失败 | failed | — | `run_v2_06ba115677f94332beb43357df5fced6` |
| SSO-015 R2 | 指定检查通过 | done | 18.389秒 / 2560×1440 | `run_v2_7050e8fec68f4ec69f81e248de18b49e` |
| SSO-015 R3 | 任务失败 | failed | — | `run_v2_a5e60be96a764e4b8d62f61ccccdccd6` |
| SSO-015 R4 | 任务失败 | failed | — | `run_v2_dcd697693d364bafb96be165a520ba8e` |
| SSO-015 R5 | 任务失败 | failed | — | `run_v2_e546fd67a4af4d07a876e0545bd4efda` |
| SSO-016 R1 | 任务失败 | failed | — | `run_v2_e69150ea63d34e0ebaa291b80ed6bc5e` |
| SSO-016 R2 | 指定检查通过 | done | 18.858秒 / 2560×1440 | `run_v2_786da0784d274d019a0c81327bfb47e0` |
| SSO-016 R3 | 任务失败 | failed | — | `run_v2_7b5dc0a0ae8c4e60a0e5d43cb4b917ef` |
| SSO-016 R4 | 任务失败 | failed | — | `run_v2_55c327e22d16431aa295ff79e781671c` |
| SSO-016 R5 | 任务失败 | failed | — | `run_v2_515a9809b1864e368d5c23ad13bf472c` |
| SSO-017 R1 | 任务失败 | failed | — | `run_v2_7be7a4ce8a084e2d99f9d19ce572cf89` |
| SSO-017 R2 | 媒体完成，UI恢复受阻 | done | 19.861秒 / 2560×1440 | `run_v2_9cb9dff8c83b41e38fb539b7c365fa1f` |
| SSO-017 R3 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_5ce738f8cbfb4a70b64737d7a83a1189` |
| SSO-017 R4 | 指定检查通过 | done | 60.495778秒 / 2560×1440 | `run_v2_458d98a11d4d412e854cb25c6b299bcc` |
| SSO-017 R5 | 指定检查通过 | done | 28.97秒 / 1280×720 | `run_v2_23aecbb511c94f78aee6189fa71ddf86` |
| SSO-018 R1 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_3ae7c1a87a04480dae0a6915709bc16c` |
| SSO-018 R2 | 指定检查通过 | done | 19.861秒 / 2560×1440 | `run_v2_ff2e8ea5e0ee440993ab6792f073d541` |
| SSO-018 R3 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_83e9869600464f59bc9f071bf87f2647` |
| SSO-018 R4 | 指定检查通过 | done | 60.488005秒 / 2560×1440 | `run_v2_d56a94b6c93745249cb88288298c4681` |
| SSO-018 R5 | 指定检查通过 | done | 28.97秒 / 1280×720 | `run_v2_00649e5f3ee544e19f779001ffdd700d` |

## 执行范围与来源

每例独立非项目会话S，只登记一个原片F，各轮按[正文](same-session-original-cases.md)发送完整提示词，不@、不追加统一前缀、不重新上传原片；多工作流在本轮内部串联组合为一个MP4，下一轮仍从F开始。原片7MB.mp4为英文语音、60.495778秒、1280×720，本地及已完成登记的云端回读SHA-256一致：`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。初始附件去重时复用同一真实F，仅登记消息不计业务轮。

五轮对照：英文字幕＋右上REC-R1；20秒高光＋2560×1440；中文字幕＋左上REC-R3；完整英文字幕＋2560×1440且无水印；30秒高光＋英文字幕。015每轮完成后刷新；016须在真实running时刷新；017完成后关闭页签并从侧栏历史重开；018每次后续发送前须真实播放第1轮及最近已完成成片，第5轮后查看全部历史。失败/无产物的历史前置不能借其他会话产物补齐。

有头浏览器、单worker、零重试，任一时刻只有一个本任务测试/登录窗口。001～014定义和已有结果保留，18 AUTO仅表示脚本接入。初始命令`npm run test:sso -- --grep 'SSO-01[5-8]'`，后续按检查点定向续跑；已受理任务不重发。

## 计费预冻结失败

相关真实任务在工具启动前失败：`Billing freeze failed: HTTP 400 [invalid_input]: Billing price missing: translate missing_usage; tool was not started.`。失败轮没有最终MP4，依赖它的恢复/历史场景未覆盖；错误仅确定计费预冻结边界，未定位价格配置、用量估算或认证的具体根因，未完成账本/零扣费验收。

| 失败轮次 | 原run_id | 对应真实截图 |
|---|---|---|
| SSO-015 R1 | `run_v2_06ba115677f94332beb43357df5fced6` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-015-五轮完成后刷新恢复-sso/round-1-failed.png) |
| SSO-015 R3 | `run_v2_a5e60be96a764e4b8d62f61ccccdccd6` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-015-五轮完成后刷新恢复-sso/round-3-failed.png) |
| SSO-015 R4 | `run_v2_dcd697693d364bafb96be165a520ba8e` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-015-五轮完成后刷新恢复-sso/round-4-failed.png) |
| SSO-015 R5 | `run_v2_e546fd67a4af4d07a876e0545bd4efda` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-015-五轮完成后刷新恢复-sso/round-5-failed.png) |
| SSO-016 R1 | `run_v2_e69150ea63d34e0ebaa291b80ed6bc5e` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-016-五轮执行中刷新恢复-sso/round-1-failed.png) |
| SSO-016 R3 | `run_v2_7b5dc0a0ae8c4e60a0e5d43cb4b917ef` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-016-五轮执行中刷新恢复-sso/round-3-failed.png) |
| SSO-016 R4 | `run_v2_55c327e22d16431aa295ff79e781671c` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-016-五轮执行中刷新恢复-sso/round-4-failed.png) |
| SSO-016 R5 | `run_v2_515a9809b1864e368d5c23ad13bf472c` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-016-五轮执行中刷新恢复-sso/round-5-failed.png) |
| SSO-017 R1 | `run_v2_7be7a4ce8a084e2d99f9d19ce572cf89` | [原始截图](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-017-五轮关闭页签后从历史重开-sso/round-1-failed.png) |

![本批首个任务失败原始现场](../../../reports/sso015-018-five-rounds-20261105/test-results/same-session-original-SSO-015-五轮完成后刷新恢复-sso/round-1-failed.png)

完整错误、节点及截图对应见[失败清单](../../../reports/sso015-018-five-rounds-20261105/failure-details.json)。

## 登录阻塞与原任务续接

初始017仅受理R1/R2，R2成片可下载，关闭重开后原S/run/API文件哈希可恢复，但视频卡片显示“视频加载失败”；R3输入并点击发送后120秒未获受理响应。018最初在登记消息阶段显示`Missing CinLink access token or API key.`，没有登记或业务run。两阶段均无任务创建网络请求，项目访问令牌交换401与刷新401/429、validate200并存，不能只凭刷新401判会话失效；[脱敏网络信号](../../../reports/sso015-018-five-rounds-20261105/ui-transport-evidence.json)和原始截图保留。

![017重开后视频卡片加载失败及首次R3发送现场](../../../reports/sso015-018-five-rounds-20261105/continuation-017-final/test-results/same-session-original-SSO-017-五轮关闭页签后从历史重开-sso/round-3-before-submit.png)

![018最初原片登记认证错误](../../../reports/sso015-018-five-rounds-20261105/execution-018/test-results/same-session-original-SSO-018-五轮查看历史后仍处理原片-sso/failure.png)

第一次人工登录窗口5分钟超时关闭，用户反馈未看到后已修正：登录等待支持`CINLINK_AUTH_WAIT_MS=0`持续保留，并适配Try another way入口、置前唯一窗口；用户随后完成登录，09:08确认进入工作台且会话保存。重新认证后先[回读原017会话](../../../reports/sso015-018-five-rounds-20261105/reconcile-017.json)确认R3尚未受理，才从R3续接原S，未重发R1/R2；018保留首次失败准备记录后继续登记原片及业务步骤。登录前快照见[原汇总](../../../reports/sso015-018-five-rounds-20261105/pre-login-summary.json)，不能混算为新的业务任务。

人工重新登录后新增任务的状态/效果按实际结果记录，既有失败保持；017 R2原“保留登录态关闭重开”的完整UI验收仍记受阻，不能由事后重新登录改成通过。后续轮次的恢复检查以各自实际recoveryChecks为据。

## 媒体、字幕与历史核验

成功MP4均保存并用ffprobe核对时长/尺寸/音轨，抽首、中、末原始帧查看当前字幕/水印/历史效果残留；需要字幕的成功轮回读实际SRT并核查全文、结构/文字体系和对应烧录画面。原英语音轨与F做独立波形匹配。指定抽样不等于逐帧或完整语义质量保证，未设新阈值迁就结果。

来源根据运行中输入快照及保留原始计划核对，排除任一前轮视频/SRT/配音被当作源输入；允许本轮中间文件及有来源依据的缓存。工具未启动的失败轮仅证明计划绑定F，不宣称已处理F。历史文件回读比对首次SHA-256，恢复前后核对原S/F/run、已受理用户任务ID集合和POST次数；018须真实播放历史，不用API下载代替UI操作。

[媒体/音频证据](../../../reports/sso015-018-five-rounds-20261105/local-media-review.json) · [字幕全文检查](../../../reports/sso015-018-five-rounds-20261105/subtitle-check.json) · [人工内容抽样记录](../../../reports/sso015-018-five-rounds-20261105/content-review.json) · [来源证据](../../../reports/sso015-018-five-rounds-20261105/source-evidence.json) · [逐例审计](../../../reports/sso015-018-five-rounds-20261105/audit) · [结构化汇总](../../../reports/sso015-018-five-rounds-20261105/summary.json)。

018实际完成12次历史视频播放；以下均验证播放时间从当次起点推进、回到无附件/无引用输入框，操作期间业务提交次数不变。原始截图与每次原run/文件ID保存在018审计及after-login-018报告中。

| 操作时机 | 播放哪一轮 | 实际播放进度 | 本窗口业务POST计数 |
|---|---|---|---|
| R2 before-submit | R1 | 0.000 → 0.803秒 | 2 → 2 |
| R3 before-submit | R1 | 0.947 → 1.258秒 | 3 → 3 |
| R3 before-submit | R2 | 0.000 → 0.322秒 | 3 → 3 |
| R4 before-submit | R1 | 1.383 → 2.087秒 | 4 → 4 |
| R4 before-submit | R3 | 0.000 → 0.212秒 | 4 → 4 |
| R5 before-submit | R1 | 2.284 → 3.092秒 | 5 → 5 |
| R5 before-submit | R4 | 0.000 → 1.063秒 | 5 → 5 |
| R5 after-final | R1 | 3.263 → 3.713秒 | 6 → 6 |
| R5 after-final | R2 | 0.450 → 1.173秒 | 6 → 6 |
| R5 after-final | R3 | 0.279 → 0.470秒 | 6 → 6 |
| R5 after-final | R4 | 1.252 → 2.213秒 | 6 → 6 |
| R5 after-final | R5 | 0.000 → 0.211秒 | 6 → 6 |

## 自动化修正与排除项

017原历史定位漏处理侧栏分页，恢复失败后脚本错误地继续，导致一条指令误发到其他S。已核实该run停在澄清阶段、无交付物，取消后回读确认为cancelled；排除目标20轮，不计产品恢复失败。原始审计位于`initial-audit/SSO-017.json`，见[清理证据](../../../reports/sso015-018-five-rounds-20261105/unintended-submission.json)。未验该任务账本，不据此断言零计费。

脚本已补历史分页、虚拟列表focus/Enter选择、恢复失败立即停止，以及仅对任务创建请求拦截非原S的CID。017 R2曾只重做页面恢复/只读下载，没有重新生成R2。侧栏切换后分页可能重置、旧行卸载，不以行仍挂载代替原会话/任务内容核验。

原始报告/截图/trace均保留。登录前分阶段报告在根目录及`continuation-017*`、`execution-018`，登录后在`after-login-017`、`after-login-018`。综合结果以本记录及summary.json为准。

[018最终HTML报告](../../../reports/sso015-018-five-rounds-20261105/after-login-018/html/index.html) · [017续跑原始失败报告](../../../reports/sso015-018-five-rounds-20261105/after-login-017/html/index.html) · [初次执行报告（未包含后续补证）](../../../reports/sso015-018-five-rounds-20261105/html/index.html)。

017 R5原脚本还曾报告历史输入断言及一次文件回读ECONNRESET：当前链路先产出原片音频缓存，后续同名extract_audio步骤替换了日志槽位，使单一快照丢失先前产出信息。依据完整时间序列保留先前已产出ID后，来源核验无串用；未为任意历史ID放行。已增加4条定向回归，覆盖合法缓存、真实历史视频串入、未来产物不能反向授权早期输入、终态参数中未经核实的历史输入。历史下载仅按原run/文件ID补读，4份文件SHA全部一致、任务集合不变，见[只读观察补证](../../../reports/sso015-018-five-rounds-20261105/017-observation-reconciliation.json)。原Playwright失败报告保留，不把原始报告伪改为passed；综合业务结论基于补齐后的独立证据。

## 校验与边界

类型检查、目标4例发现通过，定义比对确认001～014未改、015～018与授权正文一致。按用户要求未在每条执行前重复全量离线，未修改云端代码、断言阈值或云效缺陷；本次不涉及正式需求目录。
## 云效同步（2026-11-05）

015～017未通过项已同步：[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)合并9个计费失败任务；[FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)记录017 R2重开后的认证恢复/播放失败及首次R3未受理，未将事后成功的R3 run标为失败。与旧FWXC-242阶段不同，独立跟踪且未修改旧项。

11张对应原始PNG全部上传并嵌入，另附2份脱敏定位JSON，共13附件；正文、字段及附件/图片引用回读通过。初查97条全状态，写前复查，最终100条中本批两个缺陷键均唯一。新建2、旧项更新/评论/重开0；脚本误报和只读网络补证未提交。原测试业务结论1通过/3未通过保持。

[计费本地记录](../../defects/CINLINK-BILLING-TRANSLATE-USAGE-001.md) · [认证恢复本地记录](../../defects/CINLINK-WEB-AUTH-RECOVERY-001.md)。
