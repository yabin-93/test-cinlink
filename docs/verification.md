# 验证记录

## 2026-11-11 远程推送前校验

按用户要求整理当前main待推送改动，包含图片编辑需求优化、图片批注/工具栏专项、本地素材查找最新结果、SSO014结论、云效OpenAPI工具和已登记生成人像测试夹具。`npm run typecheck`、543条需求用例检查（0问题）、两份ERYE237 CUA模块语法检查、云效工具22项离线契约测试（0网络请求/0云端写入）均通过；Playwright只列举ERYE237 5条占位和LF01～03，未执行线上任务。LF三份状态表28条、15 Failed/13 Passed一致；人像夹具哈希与文档一致。推送范围排除本地凭据、reports、test-results、临时夹具及原始登录快照docs/login-page-report.md；源测试素材仅包含已登记虚构生成人像，不上传本机真实视频。

## 2026-11-10 LF18～35预发执行完成

按用户授权执行11条当前活动用例，7 Passed（LF18/20/21/30/31/32/34）/4 Failed（LF22/28/33/35），0阻塞。G56专用项目3a1225cf-106d-4b61-86e8-e98158a18507仅F5/F6，分析批次34a588ac-be06-460c-a579-3510da7b22fa、2/2就绪，预计2400积分非实际扣费。8个会话、12次正式查询+1次LF20有历史上下文额外探测；该初次点击未切会话的偏差保留，随后确认空会话执行32秒正式通过。LF18两原片下载哈希一致；LF32/33前置由用户完整观看两片并确认目标不存在。LF22/28不存在名称43秒终态仅承诺核对、无实际无匹配结论；LF33同框52秒误返两独立原片；LF35补选男子60秒新结果仍混女士、未明确完成选择。无并行/重分析/自动重试/生成/删除或云效写入，根因未确认。报告docs/design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md，证据reports/lf18-35-staging-20261110/。正文、统一入口、状态MD/JSON、自动化登记及素材准备说明已更新：全部28条已执行，15 Failed/13 Passed（各例限定范围）/0 Not Run；AUTO3/PLAN25不变，7退役编号排除。

本批校验：`python3 tools/design-cases/check-cases.py`检查543条、0问题；另核验LF正文/入口/状态表均28个唯一活动编号，累计15 Failed/13 Passed，本批7 Passed/4 Failed；13次实际受理对应8个会话、12正式+1额外探测，全部有终态证据；94份证据清单及报告/素材链接有效，F5/F6下载哈希匹配，定向`git diff --check`通过。未改动自动化脚本或迁就失败预期。

## 2026-11-10 最新执行状态及新增测试素材同步

按用户要求核对并同步LF最新逐例状态：当前28条，LF01～17已执行，11 Failed/6 Passed（各例注明UI或客户端覆盖），新增11条Not Run；AUTO3/PLAN25。LF08/12/13采用优化版最新58秒/39秒/44与35秒结果，LF16客户端恢复、LF17听审后漏检均保留实际边界。正文末列明确为最新执行状态，统一入口分类索引修正旧17条/14PLAN描述；历史日志单列，不以旧源ID/时间缺失判业务失败。新增F5 7MB.mp4、F6 9s.mp4路径、规格、内容参照、哈希及关联用例在原正文登记并加入入口链接，本次再次核对原文件大小和SHA-256一致；仅本地准备，未创建G56或上传/分析/执行新用例。现有云效缺陷链接同步，无云端状态修改。

本次校验：`python3 tools/design-cases/check-cases.py`检查543条需求用例、0问题；另核对LF三份表格均28个唯一活动编号、状态计数11/6/11、AUTO3/PLAN25、P0 25/P1 3、7个退役编号不混入，报告与本地素材链接均有效。F5/F6原文件大小及SHA-256与底稿一致，定向`git diff --check`通过。未执行线上测试。

## 2026-11-10 文件名查找收敛为5条核心P0

用户要求名称查找仅主要几条：保留LF18完整名称（合并原LF19的9s参数组，覆盖F5/F6）、LF20唯一部分名称、LF21双文件、LF22不存在、LF28正→反→正串联，全部P0。LF28执行7MB→不存在→9s三轮，同时复用LF18两组/LF22证据，不重复发查询。移出原LF23～27、LF29，旧LF19合并，7个未执行编号退役不复用；取消新Q5额外项目。非名称LF30～35六条正反向保留。当前28条设计（P0 25/P1 3）、17已执行，11Failed/6Passed（UI/客户端）/11NotRun，AUTO3/PLAN25。仅整理，无线上或云效写入；正文/入口/状态表JSON同步，退役原文备份在reports/lf-real-media-design-20261110/retired-name-cases.json。

## 2026-11-10 名称用例全部P0，补充非名称正反向LF30～35

按用户最新要求，LF18～29名称/串联相关12条全部调P0；另新增LF30/31真实女士/男子视觉命中（P0）、LF32目标不存在（P0）、LF33同框组合不满足、LF34排除前轮对象再查女士、LF35宽泛描述澄清选择（后3项P1）。LF32/33执行前需完整预览确认反向金标，抽样不能自证全片无目标。新增合计18条15P0/3P1，全部PLAN/NotRun；无线上执行或云效写入。现35条设计、17已执行，11Failed/6Passed（UI/客户端）/18NotRun，AUTO3/PLAN32，P0 32/P1 3。名称基础、两片串联及非名称质量路径均在原正文续号，不复制历史用例。

## 2026-11-10 新增真实素材名称检索用例LF-18～29（仅整理）

用户指定先整理用例，不执行。目录素材查找新增7MB.mp4/F5（60.50秒1280×720，7815126字节，哈希9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96；女士旗帜前讲话）及9s.mp4/F6（9.45秒1920×1080，9259791字节，哈希897b9ef16ac9fd2c255067478f179143f1d998b4e962f391e9ede635a4bfe022；黑框眼镜男子桌前讲话/笔记本）；均完整解码0、首中尾画面核验，未听审语音。原LF01～17夹具F1～4不随目录6片污染。新增12条8P0/4P1：全名、部分名、双名、不存在、扩展名错误、名称描述冲突、排除、歧义、跨项目、正→反→正链、真实画面→名称链；统一在原LF正文，不另复制用例。未来G56只含两新片分析2/2并多会话复用，隔离例Q5仅F5；LF18/22/19同S-name证据可复用验LF28，不重复查询。未创建线上项目/上传/分析/执行/云效写入。最新29设计、17已执行，11Failed/6Passed（UI/客户端）/12NotRun，AUTO3/PLAN26，P0 25/P1 4。元数据/帧reports/lf-real-media-design-20261110/；正文、入口、状态JSON已同步。

## 2026-11-10 LF-17缺陷同步云效

按用户授权新建[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)：人工确认旁白存在、单F2项目1/1就绪但语音查询98秒无匹配。3张原始截图正文嵌图、原片0～20秒听审WAV、evidence.json共5附件，官方OpenAPI回读字段/正文/附件/3图片引用验证通过。负责人占晶、测试环境MAC-chrome、重构10-29、中/3一般；正式PRD未提供、能力边界及根因待产品研发确认，不将源ID/时间缺失算缺陷。LF17保持Failed，最新11 Failed/6 Passed/0 Not Run不变。本机docs/defects/lf17-voice-target-missing-staging-20261110.md；检查点reports/yunxiao/CINLINK-LF17-STAGING-20261110-VOICE-MISS/。无CinLink重跑，旧项未修改。

## 2026-11-10 LF-17预发执行

Failed：原F2哈希一致，用户通过0～20秒原音确认“戴帽子的深肤色访客保持平稳步伐”原句存在后，单F2项目055b5131-5f11-4e5b-80c6-9d6a40ab3834（缓存分析1/1，预算1200非实际）空会话ef638000-1d99-43c9-ae55-aaef79a279d2正式查询1次，98秒完成却明确未找到匹配、0候选。助手声称无仅语音转写筛选项，不据此推断内部根因或系统整体无语音能力；正式PRD未提供，失败/能力范围待产品研发确认，无云效写入。精确时间/源ID未核不计失败。准备阶段分析确认CUA超时后回读已有就绪，无重复分析；旧LF03项目已变为0/4故未用。最新17/17实测，11 Failed/6 Passed（UI/客户端范围）/0 Not Run，AUTO3/PLAN14。报告docs/design-cases/multi-workflow/local-footage-results-staging-17-20261110.md；证据reports/lf17-staging-20261110/。

## 2026-11-10 LF-16预发执行

Passed（客户端网络错误/恢复）：P4分析4/4，正常对照会话7d00f206-1b4c-4db9-a304-85614bf4378b 47秒完成；新会话e330f8f4-47cd-4b61-8a84-7d8f88fb38b7用DevTools临时阻断预发POST conversations/*/turns，实际blocked:devtools/1 affected，UI明确失败Failed to fetch、非done/无匹配。删除规则并关闭开关后一次显式重试HTTP200/43秒完成，机器人预览正确；最终规则为空、关闭DevTools。正常1/阻断1/恢复重试1，无已受理重复查询；后端内部检索工具故障不在覆盖内。无重传/重分析/云效写入。最新16/17已执行，10 Failed/6 Passed（UI/客户端范围）/1 Not Run，AUTO3/PLAN14。报告docs/design-cases/multi-workflow/local-footage-results-staging-16-20261110.md；证据reports/lf16-staging-20261110/。

## 2026-11-10 LF-08缺陷同步云效

按用户授权新建[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)：优化版LF08查询漏F2/误入F4，负责人占晶、MAC预发标签、重构10-29、高/2严重。上传2张本轮UI原截图+1张标明参照的F2目标帧+1JSON；3个正文图片引用、字段及附件官方OpenAPI回读通过。源ID/时间缺失不作缺陷理由，根因未确认，状态仍Failed；其他旧项未修改，无CinLink重跑。检查点reports/yunxiao/CINLINK-LF08-STAGING-20261110-MISSING-F2-FALSE-F4/，本地docs/defects/lf08-missing-f2-false-f4-staging-20261110.md；最新用例统计10 Failed/5 Passed（UI范围）/2未执行不变。

## 2026-11-10 LF优化版重跑及全部状态同步

用户确认重跑LF08/12/13，4次查询均完成：LF08 58秒漏F2/误入F4，下载F4哈希精确匹配，最新Failed；LF12 39秒火车正确但长颈鹿混入，A历史保留，Failed；LF13 44/35秒机器人→瀑布内容切换/历史保留Passed（UI范围）。均预发同P4独立会话，无重传/重分析/重发/生成/云效写入。源ID/时间未覆盖不计失败。统一同步LF01～17逐例当前状态、报告索引和正文锚点，清理入口旧未执行统计。最新10 Failed/5 Passed（UI范围）/2 Not Run，已执行15/17；LF01～03生产，其余已执行预发，AUTO3/PLAN14不变。最新表docs/design-cases/multi-workflow/local-footage-execution-status.md及.json；本批报告docs/design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md，证据reports/lf-optimized-staging-20261110/。历史报告及证据不覆盖。

## 2026-11-10 LF-15预发执行

Passed（UI刷新恢复/预览）：复用P4的LF13会话0600b30c-8563-4c6f-8807-765bf0439aa4，刷新一次后原机器人/瀑布两查询、四候选、40/32秒完成状态及同会话URL保留，首机器人候选实际播放正常，未见新增任务/结果或跨会话混入。前后结构比对一致。本轮新查询0，无重传/重分析/生成，网络层零请求及初始手动暂存恢复未覆盖，不冒称全技术通过。无云效写入，LF15仍PLAN；最新9 Failed/6 Passed（UI范围）/2未执行，AUTO3不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-15-20261110.md；证据reports/lf15-staging-20261110/。

## 2026-11-10 LF-14预发执行

同P4项目4/4就绪，新会话3cfa7b21-5e19-4ec6-bd82-78ecdcefa13b一次火车查询39秒完成，首候选实际播放火车通过，但第二卡长颈鹿无关，Failed（与FWXC390现象一致，未新建）。未自动暂存；@按match-1-3搜索暂无相关内容，列表多个内部名未可靠映射到本轮候选，后续引用未完成，不报未确认新版功能缺失。添加素材打开本地选择框后取消，未上传/生成，最终清草稿。源ID/时间不计失败，无云效写入。最新9 Failed/5 Passed（UI范围）/3未执行，AUTO3、其余PLAN不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-14-20261110.md；证据reports/lf14-staging-20261110/。

## 2026-11-10 全部LF源ID/时间条件统一校正

用户要求更新此前使用这两点的用例：LF01～17通用前置/验收及相关条目统一以实际画面/声音、可识别来源、项目隔离和历史保留为业务条件；源ID/起止时间可取得时技术核验，不强制UI展示、不因证据缺失单独判失败。原片场景时间仅测试参照。LF08三原片哈希内容均正确，Failed改Passed（来源/内容）；LF12R2仍因长颈鹿误入Failed，LF13保持Passed（连续查询），其他实际失败不变。最新8 Failed/5 Passed（UI范围）/4未执行，AUTO3/PLAN14不变。旧执行提示词和截图保留，报告修正判定；自动化LF01～03不再用新短片ID冒充源ID，缺源ID/时间记null不触发失败，显式错误及实际内容断言保留。无线上重跑、无云效状态修改。

## 2026-11-10 LF-13验收口径校正（用户确认）

用户询问时间/源ID是否为需求后核查：无正式PRD，来自旧本地实现及QA设计，不应强制UI展示或以取证缺口判产品失败。LF13改Passed（UI连续查询和历史保留），机器人→瀑布内容已核验、未见残留；源ID/精确时间区间技术核验未覆盖。撤销上一条LF13定位缺失Failed，不提交相关产品缺陷。本次只修正LF13及通用解释，其他用例未批量改判；最新9 Failed/4 Passed（UI范围）/4未执行，AUTO3不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-13-20261110.md。本次文档修正，无线上重跑/云效写入。

## 2026-11-10 LF-13预发执行

同P4项目4/4就绪，新会话0600b30c-8563-4c6f-8807-765bf0439aa4连续机器人/瀑布两轮40/32秒完成，2查询零重发，未重传/重分析/@。首轮首候选机器人、次轮唯一候选瀑布均本轮下载解码0/1秒抽帧核验，首轮历史仍在，未见旧画面残留。匹配时间未交付、内部源ID/区间未核，完整Failed（定位交付缺失）、UI连续切换及历史保留子项通过；首轮其他两个候选未核，不冒称全部相关性通过。无云效写入，PLAN/AUTO不变，最新10 Failed/3 Passed（UI范围）/4未执行。报告docs/design-cases/multi-workflow/local-footage-results-staging-13-20261110.md；证据reports/lf13-staging-20261110/。

## 2026-11-10 LF-12预发复测R2

同P4项目4/4就绪，复用A dc658e37-b6d4-4306-a426-f5b1f6e917b3，新B b18de910-b29f-4391-9a97-3907acb19dee一次火车查询37秒完成，上轮API版本错误未复现；返回match-1-3火车正确、match-2-14长颈鹿无关，两份本轮下载解码0/1秒抽帧确认。无重传/重分析/@，回A提示词、49秒完成及三卡保留。源ID/起止未取得，UI复用/历史保留部分通过，相关性/定位整例仍Failed；不宣称跨源泄漏或API永久修复。零重发，无云效写入，PLAN/AUTO数量不变，最新9 Failed/3 Passed（UI范围）/5未执行。报告docs/design-cases/multi-workflow/local-footage-results-staging-12-20261110-r2.md；证据reports/lf12-staging-20261110-r2/；R1历史不覆盖。

## 2026-11-10 LF-12预发执行

同P4项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，无重传/重分析/@；复用A机器人会话dc658e37-b6d4-4306-a426-f5b1f6e917b3，B新会话af864aba-5960-455f-83a5-c307f101eedc一次火车查询终态Failed：model HTTP 400/BadRequest/API version not supported，request_id 01a1c4b3-47c1-7344-8027-4efd3b437fe0。无候选，不解释为无匹配或库复用失败根因；回A原提示词/49秒完成/三卡未覆盖。无重试、零已受理重发，LF12仍PLAN未接脚本；累计9 Failed/3 Passed（UI范围）/5未执行，AUTO3不变，无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-12-20261110.md；证据reports/lf12-staging-20261110/。

## 2026-11-10 LF-11预发执行

跨项目隔离Passed（UI业务范围）：新建Q仅F4，项目0fd85c52-a147-480a-9d64-4f2e0287559f、1/1就绪，43秒命中机器人，首候选下载解码0/抽帧确认；新建P123仅F1～F3，项目6593d6c2-6c19-4998-bcac-2c2e7b3e095b、3/3就绪，同句38秒明确无匹配、0新候选，无F4结果泄漏。共2查询零重发，Q部分准备人工协助/动作未记录后读回分析集合；P123预算3600非实际费。内部源ID和请求项目范围未取回，技术权限不判通过，Q其他两候选本例未核验。LF11仍PLAN，专项最新8 Failed/3 Passed（UI范围）/6未执行、AUTO3不变，无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-11-20261110.md；证据reports/lf11-staging-20261110/。

## 2026-11-10 LF-08～10预发执行

复用四素材项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，未重传/重分析。原生CUA有头：LF08一次77秒返回F2/F1/F3三个原片，下载哈希精确匹配、完整解码0、10秒帧目标正确，无F4；但无匹配时间/源区间，按通用E2/E3记Failed，不能报告错误去重，内部源ID未获取。LF09独立会话一次47秒明确无匹配、无新增候选，Passed（UI业务）。LF10新空会话空值及三个空格均禁用发送，点击/Return无新消息/任务/结果，Passed（UI校验），未抓取网络不冒称零HTTP请求。批次1 Failed/2 Passed，专项最新8 Failed/2 Passed（UI范围）/7未执行，AUTO3、其余PLAN不变；无云效写入。报告docs/design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md；证据reports/lf08-10-staging-20261110/。

## 2026-11-10 LF-04～07缺陷已同步云效

2026-11-10已按用户授权同步云效（不去重）：[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2)（LF-04目标漏检，3图+1JSON）；[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)（LF-05～07混入无关片段，5图+1JSON）。两项新建，旧项修改0；8张图片均嵌入正文，字段/附件/图片引用回读验证通过，4条用例保持Failed，根因未确认。
本机记录docs/defects/lf04-missing-target-staging-20261110.md、docs/defects/lf05-07-unrelated-results-staging-20261110.md；对应同步检查点保留，未重跑CinLink用例。

## 2026-11-10 LF-04～07预发执行

用户在本批线上变更前指定staging-app.cinlink.ai，LF04单F3项目78d7264d-0fc5-4ff5-b6be-59990d83946d分析1/1就绪；LF05～07共用四素材项目d8fdc734-ddec-4f2d-ac55-e99ff25aab08、4/4就绪，分会话执行，LF06同会话两轮。4条5次查询均终态、0 Passed/4 Failed：LF04有目标却无匹配，LF05机器人混入留声机/飞机，LF06飞机混入机器人/自行车、卫星混入宇航员/望远镜，LF07火车混入长颈鹿。11份候选下载完整解码0；未取得raw源ID/起止/run_id，不推断跨源泄漏或首尾越界。F3同哈希实测30秒女孩乌龟同框、59.5秒空背景，已修正LF04参照；预算1200/9600非实际费用。浏览器控制中断后读原状态、零查询重发，未写云效。LF04～07仍PLAN未接脚本，专项已有7条实测Failed、10条未执行，自动化3条不变。报告docs/design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md；证据reports/lf04-07-staging-20261110/。

## 2026-11-10 SSO-014生产复测

同会话c8baa441-7dc8-43a3-94cc-130cdfbedc6a，仅原片7MB.mp4上传登记一次，五轮纯文本无@、零重发，5/5完成，耗时172/117/173/130/173秒。5份MP4均1280×720、60.44/60.49秒、完整解码0，2/30/58秒水印及字幕语言抽样正常；R2/R4音频与F波形高度一致，R1/R3/R5均获用户听审正常。五轮后R1～R4远端重新下载哈希不变。原始文件ID/run_id/工具输入链路未取得，整例部分验证不判全通过；不迁移旧FWXC-282结论，无云效写入。报告docs/design-cases/multi-workflow/sso014-results-prod-20261110.md；证据reports/sso014-prod-20261110/。第四轮浏览器控制中断后读回原任务，无重发。

## 2026-11-10 LF-01～03生产复测

按用户指定在生产app.cinlink.ai新建LF-01/02/03隔离项目，原片哈希匹配，分析分别4/4、1/1、1/1缓存复用就绪；各查询一次共3次、无重发，原生CUA人工播放验收（非Playwright CLI）。0 Passed/3 Failed：LF01机器人正确但混入留声机/飞机，LF02/03返回2秒兔子片段缺目标。LF01加载会话详情卡住后刷新同会话读回，未重复查询。没有取得原始响应/run_id/源ID/源区间/远端hash，不冒用旧预发字段；LF02/03预算各1200，实际费用未核，未下载/未写云效。报告docs/design-cases/multi-workflow/local-footage-results-prod-20261110.md；本机证据reports/lf01-03-headed-20261110/。

校验：LF正文仍17条、每行9列，LF01～03实测JSON/分析就绪/终态一致，报告截图链接存在，59份实际证据已登记SHA；同一python3用例检查器543条/0问题，本次文档diff检查通过。

## 2026-11-09 005带背景原图复测R2

005/Agent已按用户纠正以11.png原始带背景历史项7cffcedd67bc40e0915021594dbb3ad7重新执行；实际画布有浅色背景及投影，非去背景图。正式蓝底请求1次，计费输入校验失败：Cannot verify editor generation inputs for billing; no task was started。无蓝底新版本，绿底未发送；原两项历史保持，无在途任务。与上一轮能力说明不同，不冒称同根因。用例前置/test-data及005新版分支报告已更新，旧报告保留。仍2 Passed/3 Failed/258 Not Run，费用未核、无云效写入。报告docs/cases/requirements/ERYE-237/results-005-original-prod-20261109-r2.md。

## 2026-11-09 分层版237的001～005生产执行

2026-11-09在生产有头执行分层版001～005主入口：001/UI、004/UI Passed；002/Agent、003/Agent、005/Agent Failed，2通过/3失败。002报Open the conversation page before opening its editor、停留第三张；003空计划未打开；005缺确定性蓝底合成解释且未执行，绿底依赖未发送。Agent3次均终态，零已受理重发、无准备生成/导出/云效写入，费用未核。新版其余258分支Not Run（139其他主入口）；旧整例历史不改。报告docs/cases/requirements/ERYE-237/results-001-005-layered-prod-20261109.md。

校验：同一python3用例检查器543条/0问题，本次文件diff检查通过；50份实际证据文件已登记SHA。原始AX核验三次请求终态、004三项历史和005刷新前后两项历史一致，新版登记2 Passed/3 Failed/258 Not Run。AX焦点页脚与真实树条目分别计数，避免重复计入历史。

## 2026-11-09 ERYE237分层重整（当前版本）

ERYE-237用例重整为2026-11-09-layered-execution：原144编号/优先级/来源/锚点及历史execution_*保留，新增分支状态Not Run；不运行生产、不修改云效。校验：python3运行同一cases检查器，543条/0问题；迁移校验确认144编号、优先级、来源、脚本与锚点不变，旧登记字段及归档断言完整、新分支均Not Run、文档链接有效；本次文件git diff --check通过。npm run cases:check因本机无python别名未启动检查器，以python3完成相同检查。

## 2026-11-09 正式014～032三组缺陷已同步云效

官方OpenAPI按用户三组分别直接新建：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)（014/018/032，Agent身份参数绑定/操作未执行）、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)（017/029，画笔引用误生成、内容丢失和缩图）、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)（030，圈外源红线误删）。未做去重，旧项修改0；共8份真实图片+3份evidence.json附件上传，8个正文图片引用及全部字段/附件回读通过。三组根因均保留未确认边界，029与FWXC-369现象关联但不冒称同根，030不把内部guide角色未核实升级根因。对应6条保持Failed，正式统计1 Passed/12 Failed/12 Blocked/119 Not Run，144 PLAN不变；本次无生产重跑。 本地记录docs/defects/erye237-agent-binding-prod-20261109.md、erye237-draw-submission-prod-20261109.md、erye237-edit-scope-prod-20261109.md。

## 2026-11-09 ERYE237-014～032正式执行

本轮登记校验：用例检查器543条、0问题；registry的144条执行统计核对为1 Passed/12 Failed/12 Blocked/119 Not Run，014～032均有结论且保持PLAN；目标文件diff检查通过。

生产同会话39cdf63c-d593-4538-816a-5d1c29973e36，本批1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。014缺会话/源版本参数；018/032明确无法绑定身份、未执行；017仅本地改对象却受理生成；029源1254²→1024²且红线/文字丢失；030新增文字/圈内改蓝/不烘焙红圈可见，但误删圈外源底图红线。阻塞分别为未完成Agent配对、精确BG/内部对象/非法参数、工作头/费用/保留草稿前置，不假报全部通过；021实际RGB仍24/24/24，输入焦点未核实，不是产品颜色失败。普通Agent4次，图片提交3次均完成（a408be41cc4a41359a04b6d9eec3ac7d/e1fdc0f3f51d44c692efbd7b2c9ff72d/4ef8ea7c45a34e30ba55d9daf347f7f5），PNG下载2份，受理零重试、无准备生成/云效写入，费用未核。结束源V1/主工具栏、14项历史保留、无未发草稿或在途。registry/meta/cases/统一入口同步，正式累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍144 PLAN。报告docs/cases/requirements/ERYE-237/results-014-032-prod-20261109.md；证据reports/erye237-014-032-prod-20261109/。

## 2026-11-09 ERYE-237正式用例纳入两组UI实测优化

校验：python3 tools/design-cases/check-cases.py检查543条、0问题；144个唯一ID/优先级/九列/全PLAN及元数据版本一致。npm脚本缺python别名，已用python3执行同一检查器。本轮目标文件diff检查通过；全工作区既有login-page-report.md尾空格未修改。

已更新正式cases.md中33条前置/步骤/验收（打开保存、画笔对象、批注引用、AI mask、比例、导出及busy），新增optimization-20261109.md专项证据映射并更新test-data/analysis/meta和统一入口。版本2026-11-09-ui-evidence-baseline；144条ID、优先级P0 95/P1 48/P2 1、来源/锚点/全PLAN及正式6 Failed/138 Not Run保持，registry执行状态不改。专项通过不代Agent/严格几何/账务/故障；确认垃圾桶入口，取消未证实快捷键推断；mask逐笔撤销/平移手势待确认；保留纯绘制尺寸、比例意图流程、真实alpha/接缝和busy历史可用要求。未新执行生产、未写云效。详见docs/cases/requirements/ERYE-237/optimization-20261109.md。

## 2026-11-09 020缺陷已同步云效

2026-11-09通过云效官方OpenAPI直接新建[FWXC-373](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=680b9622f88e0dbbd8a9741a3d)，未做去重、旧项修改0。本轮真实运行态JPEG已上传并嵌入正文，另附同期AX快照；正文、字段、附件ID/名称/字节数及图片引用回读通过。020保持Failed，工具栏累计13 Passed/6 Failed/1 Blocked；本次未重跑生产任务。 本地记录docs/defects/img-tb-ui-020-prod-20261109.md。

## 2026-11-09 IMG-TB-UI-020复测失败

同一生产共享会话、源V1，区域保存成功后完整提示词仅提交一次，真实擦除任务完成，新版本0f970d8aeb69454fbeadcdabc3cf2883，11项历史保留。运行态03快照确认内容工具/发送/导出disabled符合限制，但10项已完成历史也全部disabled，违反ERYE237§3.5查看历史仍可用，020由Blocked改Failed。尝试禁用历史后的快照已终态，不冒充运行中点击拦截；缩放菜单及收起重开实际发生于终态，运行态实操和切换后不抢占未覆盖，无重发采样。终态工具/历史/导出恢复，最终源版无待发意图。费用未核、无导出、无云效写入；累计13 Passed/6 Failed/1 Blocked/0 Not Run。报告docs/design-cases/img-tb-ui-020-results-20261109-r2.md，证据reports/img-tb-ui-020-r2-20261109/。

## 2026-11-09 IMG-TB-UI-018复测通过

同一生产共享会话、源V1重新准备红线/文字/蓝矩形。已保存后收起重开三对象恢复可选，单一画笔引用不重复；文字菜单进入编辑后直接在已聚焦输入末尾追加“ 已恢复”，AX回读完整新文字，Return确认后画布显示；再次收起重开仍保留“草稿保存 2026 已恢复”、红线和蓝框。补齐上轮焦点操作未核实缺口，018由Blocked改Passed，累计13 Passed/5 Failed/2 Blocked/0 Not Run。未提交生成/导出/云效，历史10项保留；结束放弃本轮草稿。报告docs/design-cases/img-tb-ui-018-results-20261109-r2.md，证据reports/img-tb-ui-018-r2-20261109/。

## 2026-11-09 016和017缺陷已同步云效

官方OpenAPI分别直接新建016 [FWXC-371](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c0b830eb50e111cb243f475b69)（比例选择即执行，草稿流程差异）及017 [FWXC-372](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f08ed4417846c25c3a8e038a4b)（16:9扩图左右背景明显接缝），未做去重。各2份原始图片附件上传并嵌图，正文/字段/附件及引用回读通过；共4附件、旧项修改0、无生产重跑。016正文注明交互需求确认边界，菜单JPEG是完成后回看；017使用真实结果PNG及源版PNG，未使用错对应的回看JPEG。用例状态仍Failed，详见docs/defects/img-tb-ui-016-prod-20261109.md及017对应记录。

## 2026-11-09 IMG-TB-UI-016～020生产有头执行

同一共享会话执行，1 Passed/2 Failed/2 Blocked。016首次9:16选择即直接执行，停止额外比例切换，1260×2240；017直接16:9扩图2240×1260，主体完整但左右背景明显竖向接缝，Failed。018保存重开三对象恢复、可选并进入文字编辑，但实际改写未确认，Blocked；019一次准备合成完成7900edb5adaf4e419b5fad695963a7ef，导出1024²保留红线及准确文字且排除未发批注/mask，源版1254²导出哈希一致，Passed；准备合成缩图问题另记。020两次区域保存前置均提示“当前草稿来源已变化，未应用擦除区域。”，无任务受理，运行态未覆盖，Blocked。共3个完成任务、4份PNG，未重发已受理任务；结束源版/主工具栏、测试草稿和未发正文清理、10项历史保留。累计12 Passed/5 Failed/3 Blocked/0 Not Run。早期截图助手未落盘，报告区分实际下载、回看补存和缺失现场，不补造。费用未核，未写云效。报告docs/design-cases/img-tb-ui-016-020-results-20261109.md；证据reports/img-tb-ui-016-020-20261109/。

## 2026-11-09 013和014阻塞排查

014通过：单笔mask右键保存区域→进入画笔点击撤销→返回，AI擦除意图移除、发送禁用，补齐原A空提交拒绝。013仍Blocked：未保存mask切到画笔时撤销禁用，且只切工具不撤销、再进擦除也清空选区；保存区域后作为整体意图可一次撤回。ERYE237§3.4只明确支持撤销，未明确逐笔粒度，不能用013只撤M2保留M1硬要求报产品失败。早期误把光标/遮罩混淆，在未确认空时点发送，额外受理1次无正文擦除并完成，版本9cf60e7a79714bc79dc30ea442cbaa4c已保留，已向用户说明；不是空mask门禁缺陷，费用未核，无重发、无云效写入。结束源V1/主工具栏无待发意图，历史7项。累计11 Passed/3 Failed/1 Blocked/5 Not Run。报告docs/design-cases/img-tb-ui-013-014-investigation-20261109.md，证据reports/img-tb-ui-013-014-investigation-20261109/。

## 2026-11-09 IMG-TB-UI-011～015生产有头执行

同一共享会话39cdf63c-d593-4538-816a-5d1c29973e36执行，2 Passed/1 Failed/2 Blocked。011三模式隔离通过；012直接去背景一次，新版本fd2adbbcd8f94d0baaff81b0ee3d0ec4，导出1254²真实alpha通过，PRD先引用后发送差异单记。013补涂/直径隔离可用但逐笔撤销未确认，跨画笔撤销再进擦除后空mask无法归因；014空mask点击发送明确拒绝，单笔撤销至空仍未验证，均Blocked。015细化手包20/8px遮罩，保存区域后完整正文仅发送一次，任务完成新版本1d9321ba2b5d433fbdc7e2b810527019，但手包及提手仍在/包面纹理变花，导出1254²及重开一致，Failed。正式处理2次、PNG导出2份、区域保存2次，无生成重试，费用未核，未写云效。累计10 Passed/3 Failed/2 Blocked/5 Not Run，016～020未执行。结束干净源V1/主工具栏、六项历史保留。报告docs/design-cases/img-tb-ui-011-015-results-20261109.md；证据reports/img-tb-ui-011-015-20261109/。

## 2026-11-09 IMG-TB-UI-006～010生产有头执行

在同一共享会话39cdf63c-d593-4538-816a-5d1c29973e36、源V1 editor_image_28de342515fc438aa5a0893c504fc20d执行，5 Passed（UI业务范围）：006选择/移动/缩边/菜单删除，007色板/RGB/吸管及默认色隔离，008局部笔迹/文字/形状擦除与底图保护，009三步共享撤销/重做及新分支，010继续编辑/关闭提示/放弃均符合。007空心矩形取H2实色描边内部，精确回读0/128/255，避开透明中心。每例放弃自己草稿，结束干净源版/主工具栏、四项历史保持，无新增生成或导出请求，费用/内部调用未核，未写云效。工具栏累计8 Passed/2 Failed/10 Not Run；既有002/005尺寸失败保持。报告docs/design-cases/img-tb-ui-006-010-results-20261109.md，证据reports/img-tb-ui-006-010-20261109/。

## 2026-11-09 工具栏纯绘制尺寸缺陷已同步云效

2026-11-09通过云效官方OpenAPI直接新建[FWXC-369](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e6d492be908d55a9d0b86124e6)，未做历史去重、旧项修改0。关联IMG-TB-UI-002与IMG-TB-UI-005的同一可观察现象：纯绘制合成结果导出由1254×1254缩为1024×1024；不推断共同根因、模型调用或费用。两张原始完成态JPEG、三份实际导出PNG已上传并嵌入正文，另附evidence.json，共6附件；正文、字段、附件ID/文件名/字节数和5个图片引用回读通过。002/005保持Failed，本专项3 Passed/2 Failed/15 Not Run；本次未重跑生产任务。 本地缺陷记录docs/defects/img-tb-ui-compose-size-prod-20261109.md；检查点reports/yunxiao/IMG-TB-UI-COMPOSE-SIZE-PROD-20261109/。

## 2026-11-09 IMG-TB-UI-001～005生产有头执行

最新3 Passed/2 Failed，006～020 Not Run。001空草稿明确拦截且撤销至空/退出成功；003红8px/蓝16px默认值隔离、200%返回成功；004六形状6/6保存重开可重新选择；002/005内容合成及导出/重开可用，但1254²源图均变1024²，按纯绘制同尺寸基线Failed，内部模型路径/费用未核。用户中途要求本专项一个会话执行，已更新AGENTS/用例；002～005共享39cdf63c-d593-4538-816a-5d1c29973e36，001最后在同会话补跑。旧001会话保留；准备去背景共2次，正式合成2次，零受理任务重试。结束共享会话源版/主工具栏，结果历史保留，无未发绘制草稿；空提交错误提示保留。报告docs/design-cases/img-tb-ui-001-005-results-20261109.md；证据reports/img-tb-ui-001-005-20261109/。未同步云效，既有图片批注专项/正式ERYE237状态不变。

## 2026-11-09 新增图片工具栏专项20条

按用户“针对工具栏功能新增测试用例”，新增docs/design-cases/18-image-toolbar-ui.md：IMG-TB-UI-001～020，P0 13/P1 7，全部Not Run/未接自动化。沿用授权生成人像，同项目各例独立会话/图片工程；覆盖画笔、六形状、文字/颜色、选择/橡皮擦/撤销/放弃、模式隔离、去背景、AI mask和擦除、五比例及16:9扩图、保存/导出和busy恢复。依据已取得的ERYE237原文快照，明确UI直执行去背景与PRD草稿流程差异；不把未确认快捷键当需求。现有批注用例关联复用；未运行生产操作/生成/云效写入，不改变既有专项8 Passed/1 Failed/1 Blocked或正式144条状态。统一入口与设计总览已链接。

## 2026-11-09 010平移问题已提交云效

按用户指令通过官方OpenAPI新建[FWXC-368](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7676dafe333fa5832e64c3441e)：图片放大200%后拖动和滚动未观察到画布平移（操作方式待确认）。未做去重、未重跑产品任务；3张原始JPEG上传嵌入、正文/字段/附件ID名称字节数及引用回读通过。正文明确需求§3.1/§5.2/A15支持平移，但尝试手势未被需求指定，不能断言所有方式均不支持；010保持Blocked，专项8 Passed/1 Failed/1 Blocked。记录docs/defects/img-ann-ui-010-prod-20261109.md，检查点reports/yunxiao/IMG-ANN-UI-010-PROD-20261109/。

## 2026-11-09 009缺陷已同步云效

IMG-ANN-UI-009已整理并通过官方OpenAPI新建[FWXC-367](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8c5a17dabe849b6a8a6a56ee71)：图片批注显示已保存，收起重开后正文和自定义对象名丢失。不做去重，未重跑产品任务。两张原始JPEG已上传、正文嵌入并回读核验ID/名称/字节数及字段；上传响应name与列表fileName差异已兼容，按同一检查点恢复，无重复创建或上传。同步工具22项离线检查通过。009保持Failed，专项8 Passed/1 Failed/1 Blocked。记录docs/defects/img-ann-ui-009-prod-20261109.md。

## 2026-11-09 007垃圾桶入口复测R3通过

按用户纠正入口，在007-R2已准备会话续测：关闭新增标注模式后打开批注1，确认完整正文及待发引用，点击浮层右上角删除批注；目标点/浮层/待发引用同步移除，已保存，批注3、4及两项版本保留。007 Passed，专项累计8 Passed/1 Failed/1 Blocked（009/010不变）。未新增生成、未写云效。报告：docs/design-cases/img-ann-ui-007-results-20261109-r3.md；证据：reports/img-ann-ui-007-20261109-r3/。下方待确认和原失败仅为历史。

本文件保存 Codex 执行与默认启用检查，以及源工程的提测复测、工作台适配和早期接入验证。最新进度见 [测试进度](testing-progress.md)。

## 2026-11-09 007入口与需求口径纠正

2026-11-09用户截图指出批注移除入口是批注浮层正文输入区域右上角垃圾桶（AX删除批注）。撤销007两轮Failed，改待确认：退格不是需求，“仅取消待发引用且保留批注”没有已确认依据，不能据未找到该入口报缺陷。更新007步骤使用用户指出入口，但本次仅修正文档，未点击验证删除后的点/正文/引用联动，不标Passed。专项最新7 Passed/1 Failed/1 Blocked/1待确认；009失败、010阻塞保持。

## 2026-11-09 IMG-ANN-UI-007独立会话复测

2026-11-09按用户指令独立会话复测IMG-ANN-UI-007，复用007项目，新会话59c0a2da-3354-4179-8e1b-3397a11c04ac。准备去背景1次并返回带背景V1；批注/正文/自定义名及待发引用均真实建立，空输入框退格及引用顶部检查仍不能单独移除引用，浮层仅删除批注/添加，007仍Failed；正式编辑发送0、未写云效，累计7 Passed/2 Failed/1 Blocked保持。报告docs/design-cases/img-ann-ui-007-results-20261109-r2.md，证据reports/img-ann-ui-007-20261109-r2/。

## 2026-11-09 人像批注UI专项006～010

2026-11-09生产有头执行人像UI专项006～010：006重复添加仍单引用/单狗通过；007无仅移除引用入口、删除操作不生效Failed；008删白狗批注联动删除未发引用、仅生成红球通过；009已保存正文/自定义名重开丢失，实际粘贴输入复核仍丢失Failed；010适应窗口→200%→返回→批注编辑成功，但拖动/滚动/空格拖动未确认平移，整例Blocked。2 Passed/2 Failed/1 Blocked，本专项累计7 Passed/2 Failed/1 Blocked。准备处理5次、正式生成3次，费用未核。用户中途纠正可一个项目多会话，008～010复用007项目独立会话。报告docs/design-cases/img-ann-ui-006-010-results-20261109.md，证据reports/img-ann-ui-006-010-20261109/。未写云效，ERYE237正式统计保持。

## 2026-11-09 人像批注UI专项001～005

2026-11-09使用用户生成的人像在生产有头新建5个IMG-ANN-UI-001～005专用项目，优先UI批注浮层执行，5 Passed（人像适配业务验收），006～010 Not Run。新增棕白狗、修改为白狗、T恤改蓝、移除狗、双批注左白狗右红球均真实生成并导出重开。准备去背景5次；完整编辑5次及005额外仅双批注成功编辑1次；005最终全局说明与两引用已确认发送。费用/内部事务未核，输出1024²而源1254²，不宣称像素尺寸保持。报告docs/design-cases/img-ann-ui-001-005-results-20261109.md，证据reports/img-ann-ui-20261109/。未写云效，不改变ERYE237正式144条统计及既有6 Failed。

## 2026-11-09 ERYE237-033新项目复测

2026-11-09按用户要求先新建ERYE237-033-prod-20261109项目，再执行033。UI图内创建/灰区不新增符合预期；恢复空批注后Agent图内请求失败commands.0 invalid oneOf、缺session_id/source_version_id；图外请求21s拒绝负坐标。033仍Failed，6 Failed/138 Not Run。后续页面出现蓝船新增版本、已发送标注及画笔草稿，来源未确认，保留不清理，最终隔离验证有限；BG精度/独立双图片工程未覆盖。中间截图未落盘，仅最终截图/AX和提交JSON已核验，不冒充完整证据链。未写云效。见[报告](cases/requirements/ERYE-237/results-033-prod-20261109-r2.md)。

## 2026-11-09 ERYE237-033图域批注测试

2026-11-09执行ERYE237-033，生产有头复用已处理1024²纸船，图内Q创建1条批注/浮层，图外G不新增；清理自身UI批注恢复空基线后Agent合法Q失败base_revision invalid type/commands.0 invalid oneOf，实际0条；Agent图外x<0明确拒绝且无副作用。033 Failed（业务分支）；原BG1001×1000精度与独立双工程未覆盖，不冒充完整通过。最终标注关闭、无批注、历史两项保持；2次Agent请求零重试，未写云效。6 Failed/138 Not Run。见[033报告](cases/requirements/ERYE-237/results-033-prod-20261109.md)。

## 2026-11-06 ERYE237-001～005第2批云效同步

2026-11-06按用户“不去重”通过云效OpenAPI新建5条：[FWXC-358](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f1c9be96026403c5d311c5638f)（ERYE237-001）、[FWXC-359](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=270700d41580b5ed54616b0946)（ERYE237-002）、[FWXC-360](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9c6900f0ecb8225f5219b10b66)（ERYE237-003）、[FWXC-361](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=12425c9d5df84a7481b5772de9)（ERYE237-004）、[FWXC-362](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ecf3e918eb4784dbd653d967e8)（ERYE237-005）。旧项修改0，负责人/验证人牛诗晴，生产环境标签及🤔AI提缺陷状态。12张本批原始截图作为附件上传并以永久引用嵌入正文，正文/附件回读通过，重新下载SHA与原图一致。未重跑任务；5 Failed/139 Not Run保持。

## 2026-11-06 云效OpenAPI本机配置与Mac适配

按用户提供的`Downloads/yunxiao`导入[同步工具](../tools/yunxiao/README.md)，保留原同步检查点、上传、九段描述和回读逻辑；适配Mac的curl、环境变量/local.env凭据与入口`run.sh`，Windows仍使用DPAPI。微软官方ARM64 PowerShell 7.6.9安装到当前用户目录，68,117,310字节归档SHA256与官方发布摘要一致。用户授权登录后新建专用PAT，2027-02-04到期，仅项目协作所需权限；令牌只写忽略的local.env（0600），未输出、未写报告，原令牌未修改。已忽略的config.local.json从现有FWXC-357提取生产环境、牛诗晴、重构10-29、中、3-一般；后续批次按实际环境覆盖。

验证：22项离线检查全部通过，覆盖Mac凭据文件权限/进程优先级、假服务完整同步和中断恢复；离线网络0、云效写入0。实际OpenAPI读取cinlink-WEB项目、13项字段配置（6必填）、FWXC-357和2附件均HTTP200。`run.sh check.ps1 -ReferenceWorkitemId 94f54105c3405d30c9df57b56e`实际读取成功；本次未创建/修改缺陷、未上传附件、未重新执行产品任务，真实写入链路待下一次授权同步验证。

证据：`reports/yunxiao/setup-20261106/api-check.json`及不含密钥的`token-created.png`；脚本检查结果在`reports/yunxiao/check-*/result.json`、`reports/yunxiao/offline-*/result.json`。配置任务不改变ERYE-237的5 Failed/139 Not Run统计。


## 2026-11-06 ERYE237-001～005优化后生产复测

2026-11-06按优化版在生产有头串行复测001～005：先UI各一次去背景补齐纸船/JPEG工程，刷新重开及批注可用，复用水彩生成图。001两Agent打开及002报Open the conversation page before opening its editor；003目标已确认工程但Agent缺上下文未打开；004 UI三版可看而Agent历史工具缺session_id/source_version_id；005蓝底首步计费输入校验失败，无V2所以绿底未发送。6次正式请求均终态、零重试；5 Failed/139 Not Run。账务/远端hash未核，准备任务2次单记。原始证据reports/erye237-001-005-prod-20261106-r2/，未写云效，PLAN保持。见[本轮完整报告](cases/requirements/ERYE-237/results-001-005-prod-20261106-r2.md)。

## 2026-11-06 ERYE-237全量用例优化

2026-11-06按用户授权优化ERYE-237全部144条，保留编号/优先级/来源；新版本2026-11-06-project-baseline，补B-IMG/B-MULTI/B-EMPTY/P-API、区分S0/P1/G1与V1，重写001～005并修正工具时机/样本矛盾。历史复核001生成图分支Failed保留，002目标JPEG未处理建工程改Blocked，003仍Blocked；1 Failed/2 Blocked/141 Not Run。未重跑或修改云效；部分脚本尚需适配新前置。见[优化复核记录](cases/requirements/ERYE-237/optimization-20261106.md)。

## 2026-11-06 ERYE237-003目标工程前置修正

2026-11-06用户补充：上传图片需处理一次才创建图片工程，提示词生成图自动建工程。003只确认无打开文档，未确认11.png目标工程/版本已建立，撤销Failed改Blocked（目标前置不足）；2 Failed/1 Blocked/141 Not Run。后续先准备并核实真实工程及版本，再完整执行；不将本次未打开报产品缺陷，未新增处理或重发。

## 2026-11-06 ERYE237-003人工确认后续执行

2026-11-06用户人工确认003无打开图片文档后继续正式目标一次、零重试；项目名称补槽字段误开文件框，取消后聊天补充ERYE237-001-prod-20261106。Agent仍称缺少真实目标绑定，未打开11.png，画布保持空白工程；后置查询26s完成但无实际身份回执。003由前置Blocked更新Failed；3 Failed/141 Not Run；未写云效。见[003报告](cases/requirements/ERYE-237/results-003-prod-20261106.md)。

## 2026-11-06 ERYE237-003脚本与生产前置核验

2026-11-06生成并执行003部分CUA脚本，独立生产会话128d917b-443d-484d-8c83-6d5df0c17a9b只读检查39s完成但无实际context回执，补充只读澄清21s明确无法确认文档绑定/ID/版本。空上下文前置未证明，003 Blocked；正式打开目标未发送、零重试。2 Failed/1 Blocked/141 Not Run。详见[003报告](cases/requirements/ERYE-237/results-003-prod-20261106.md)。未写云效。

## 2026-11-06 ERYE237-002云效缺陷同步（不去重）

按用户此前“不做去重”的要求直接新建[FWXC-357](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=94f54105c3405d30c9df57b56e)：生产环境Agent按“第2张图片”打开时，Editor open缺少session_id/conversation_id，仍停留第3张水彩图。新建1、旧项修改0；两张本次原始截图已在正文末尾嵌入并在附件区保存，正文图片显示、图片引用及2个附件条目回读通过。详见[本地缺陷及截图清单](defects/CINLINK-ERYE237-002-001.md)。未重跑产品任务；002仍Failed，统计保持2 Failed/142 Not Run。

## 2026-11-06 ERYE237-002脚本与生产执行

已生成并实际调用[002有头CUA脚本](../tools/erye237/erye237-002.cua.mjs)。独立会话4d81b2cf-17a2-4972-95b6-583a3948dca0三图按纸船→用户群鸟JPEG→已有水彩图登记，分别建立单历史项文档，停留I3后只提交一次“打开本会话第2张图片，仅查看，不修改”。规划识别第2张，Editor open实际缺session_id/conversation_id失败，仍显示I3，002 Failed、零重试。终态后人工回读三图历史项均保持，非Agent成功；远端文件哈希/账本未核对，无本轮新增生图。001/002共2 Failed、其余142 Not Run；002自动化仍PLAN（部分脚本），旧Playwright fixme未当执行。详见[002报告](cases/requirements/ERYE-237/results-002-prod-20261106.md)。执行阶段未写云效；后续同步见本页最新记录。

## 2026-11-06 ERYE-237直接点击工具检查

用户要求先检查工具，随后明确直接点击、不用对话。已实际验证缩放、画笔及撤销/重做、矩形、文字、批注、移除背景和PNG导出；擦除仅到mask预览、宽高比仅菜单，未提交这两类AI结果任务。直接去背景一次成功，新增1个历史项；已切回操作前水彩版本，前后实际导出SHA-256与解码像素哈希一致，测试笔迹/文字/批注已清理。去背景PNG存在真实透明像素。详见[页面工具检查](cases/requirements/ERYE-237/tool-ui-smoke-20261106.md)；001～005正式状态及云效原缺陷不因此更改，费用未核对。

## 2026-11-06 ERYE237-001云效同步（不去重）

按用户“不做去重”要求，直接新建[FWXC-351](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2887f4e45628699108c470bf84)、[FWXC-352](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1045b0ba4c36d6c1da33b22a7d)，分别记录Agent打开缺会话参数、图片卡片仅打开blob原图页。新建2、旧项修改0；标记生产环境。4张本次原始截图已通过正文图片上传入口保存并嵌入末尾，保存后回读持久图片引用及显示均通过。截图清单与SHA-256见[Agent缺陷](defects/CINLINK-ERYE237-OPEN-001.md)和[卡片缺陷](defects/CINLINK-ERYE237-CARD-001.md)。未重新执行产品任务。

静态核验：`python3 tools/design-cases/check-cases.py`检查543条、0问题；本次文档差异空白检查和缺陷/结果文档本地链接检查通过。`npm run cases:check`因本机没有`python`别名退出127，已用`python3`直接执行同一检查器通过。

## 2026-11-06 ERYE237-001生产环境有头复测

用户指定 `https://app.cinlink.ai/` 后，建立独立测试项目并在会话39f4248c-0462-4978-912e-b714ad69a992核验正式001（导入图与生成图统一打开）。I1=11.png，经“选择媒体”手动导入显示已保存及一个历史项；I2基于用户群鸟JPEG实际生成1张1024×1024水彩群鸟，下载与SHA已记录。两类卡片点击均打开blob原图页；两个正式Agent打开均因 `Editor tool arguments do not match its schema; arguments: missing session_id, conversation_id` 失败。前置探测/生成准备与正式打开分列，未自动重试、未宣称费用为零；其他用例未执行；随后按用户要求同步两条新缺陷，见本页云效记录。

[完整报告](cases/requirements/ERYE-237/results-001-prod-20261106.md)。001本轮Failed，其他143条Not Run，自动化仍PLAN（fixme仅占位）；原图远程哈希、完整身份及账务未覆盖，不能记通过。本机原始截图/AX/实际生成文件及清单在 `reports/erye237-001-prod-20261106/`。

## 2026-11-05 ERYE-196/206/210切换为业务结果验收

按用户要求优化255条（134/67/54），编号、优先级及来源保持；预期改为页面业务、实际文件或已实现接口真实返回与独立基线相符，取消拟定接口名/字段/错误码/内部算法的硬性断言。同步前置、分析、联合规则和统一入口；真实业务缺失仍记录未实现，不因内部接口不同判缺陷，也不把缺业务一律排除。

196的001/003既有Passed、002/004 Not Applicable保留；005取消旧引用标签前置，原Blocked撤销为Not Run，未重跑。196当前2 Passed/2 Not Applicable/130 Not Run，206/210共121条Not Run；本次0新增业务执行、0新增通过。原始报告/截图不改写；[本次状态与证据边界](cases/requirements/ERYE-196/business-acceptance-update-20261105.md)、[统一验收口径](cases/editor-business-acceptance.md)。未修改云效、产品或云端代码。

静态校验通过：`npm run cases:check`检查543条正式需求用例、0问题；专项255条编号/优先级/来源及九列一致，60处本版链接有效，其他登记段和9份历史报告/其他受保护文件未变。底稿`reports/business-acceptance-196-206-210-20261105/validation.json`；本次业务执行0次。

## 2026-11-05 ERYE196-001～004需求与设计差异同步

按用户限定范围核对后，新建[FWXC-315](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9a1f2aebb4f446ec323afa0493)：004要求的对象引用标签、时间范围及移除交互未在最新已确认主页面设计中体现，按**需求/设计差异、待评审**记录。不是已确认的页面实现回归。001内部实现、002接口分页不报缺少设计入口；003页面业务通过，无本次新增差异。

3张真实原始截图（2张Figma主页面导出、1张004版本9实测页面）已上传并在正文末尾嵌入，另附脱敏证据JSON；描述、字段、4附件及3个图片引用回读通过，副本与原图SHA256一致。[本地缺陷及截图清单](defects/CINLINK-DESIGN-ERYE196-004-001.md)。

本轮只同步设计差异，004继续**Not Applicable**，目标改文未发送；总计仍**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**。没有新增CinLink业务执行、修改产品源码或设计稿。

## 2026-11-05 ERYE196-004按最新设计稿改为本轮不适用

更新后校验通过：`npm run cases:check`检查543条、0问题；196状态数量及004登记/摘要/报告链接一致，两批共14张原始截图哈希保持不变，目标文档差异空白检查通过。本次没有新增业务执行。

按用户明确指令，以最新已确认Figma主页面为本轮验收基准，004改为**Not Applicable（本轮不适用）**，原Blocked判定撤销。云效评论§03中的对象引用标签/时间范围/移除流程保留为来源追溯，不列本轮页面阻塞或缺陷；未执行的引用后改文不计通过。已有选择/反选观察及版本7、9两批真实截图保留，没有新增运行。

用例正文、registry、meta、统一入口、联合规则、分析/前置及[004执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)已同步；134条最新**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**（001/003通过、002/004本轮不适用、005受阻，其余129未执行）。其他用例状态未变，没有新增AI任务、云效写入或产品源码变更。



## 2026-11-05 重启浏览器后复测ERYE196-004

文档更新后校验：`npm run cases:check`通过（543条、0问题），134条状态数量、最新报告链接及本轮7张原始PNG哈希核对通过，目标文档差异空白检查通过。

已关闭原受控Chrome并新启动有头Chrome，恢复当前工程独立复测。当前版本9：三项多选/反选音频剩两项正常，但无输入框对象引用，右键无引用操作、时间尺仅定位播放头、@为文件候选；原引用后改文未执行，按云效评论定义的原流程仍Blocked。前后版本9、内容及148条字幕保持，输入/选区/缩放已恢复；保存本轮7张独立截图及读取证据，原版本7批次保留。[最新记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)。

用户询问来源后已明确：引用标签/移除交互来自云效ERYE-196评论§03，已核对最新Figma主页面未展示该完整交互，不能称为设计稿缺陷；未提交产品缺陷。没有AI任务、云效写入或产品源码变更。总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run，005未执行。



## 2026-11-05 ERYE196-004页面业务核验

更新后`npm run cases:check`通过（543条、0问题）；196状态数量、004摘要及报告链接一致，前后版本/内容保持及7张原始PNG哈希核验通过，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户要求在当前工程版本7有头核验004：视频/原声音频/Hello字幕三项多选、反选音频剩两项可操作；输入框无编辑器对象引用，@仅文件候选，时间尺拖动仅定位播放头。原引用标签/移除引用及BGM/范围业务流程未完成，目标改文未发送，**004仍Blocked**。依据为196评论§03页面用户流程；不要求API字段或内部实现，不把选中高亮视作已引用，也未将未见交互直接定为产品缺陷。

7张本次真实页面受阻/恢复截图保存，前后版本7、完整内容与148条字幕一致；输入/选区已清空，缩放恢复1。[执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)，底稿`reports/erye196-004-ui-20261105-1947/`。没有AI任务、云效写入或产品源码修改；005未执行，总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run。



## 2026-11-05 ERYE196-003页面业务实测通过

更新后`npm run cases:check`通过（543条、0问题）；196的134条状态、registry、执行摘要和报告链接一致，10张原始PNG哈希核对通过，恢复后的完整工程内容与基线一致，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户明确要求，将003原游标读取场景调整为页面业务验收：A浏览中、B仅将6.64～7.12秒solution.改为新版C2，A无需刷新即更新；继续滚动及刷新后各3窗口覆盖148/148，遗漏/额外/重复/文字差异0，只改变目标1条，其余147条及时间、其他轨道和设置不变。随后B撤销本次改文，A同步恢复，完整工程内容与原基线一致；版本5→6→7，测试新增B页已关闭。

**003 Passed（页面业务口径）**；原游标接口专项未执行，不纳本次通过范围。10张真实执行截图、前后/恢复读取及两次全列表对象核验保存于`reports/erye196-003-ui-20261105-1935/`，[执行记录](cases/requirements/ERYE-196/results-003-ui-20261105.md)。没有AI任务、云效写入或产品源码变更。134条最新**2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run**；004～005未执行，其他需求和既有结果保持。



## 2026-11-05 ERYE196-002撤销页面阻塞判定

更新后校验通过：`npm run cases:check`检查543条、0问题；196的134条状态与registry/摘要/报告一致，报告链接有效，六张原始截图SHA-256保持不变，目标文档差异空白检查通过。

用户确认修改状态：002原“按时间范围分页读取”来自196评论§11接口约定，已读取的最新设计稿没有对应页面交互；原先因页面缺少入口判Blocked不成立，现改为**Not Applicable（本轮页面验收不适用）**。原接口专项步骤保留为未执行，不计通过；既有148/148条列表完整性、对象稳定性及版本5不变的补充核验保持Passed，六张原始截图/读取结果保留，没有新增执行。

用例正文、registry执行状态、meta、统一入口及[002执行记录](cases/requirements/ERYE-196/results-002-20261105.md)已同步。134条最新：**1 Passed / 1 Not Applicable / 3 Blocked / 129 Not Run**；003～005未变。自动化列PLAN仅表示尚未接固定脚本，与本轮不适用状态分开记录。



## 2026-11-05 ERYE196-002当前工程核验

记录更新后`npm run cases:check`通过（543条、0问题）；196状态、002摘要及报告链接核对一致，六张原始PNG已登记尺寸/哈希，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户要求继续有头执行002，当前工程张雅婷(Tin)分享的视频.mp4、本批版本5。完整工程/字幕可读取；4个滚动窗口覆盖148/148条，遗漏/额外/单窗口重复/跨窗口标识或文字变化均0；首10秒12条已完成对照，前后版本5、content/updated_at及字幕结果一致。六张真实截图与原始读取已保存。

**002仍Blocked**：当前没有按指定时间范围分页读取的可执行入口，原pageSize=1/游标主步骤及三cue B0未执行；完整读取、滚动浏览和离线范围参考不替代该功能。按用户口径，不以字段映射或服务端历史实现作为本次阻塞。没有修改工程内容、提交AI任务、写云效或修改产品源码。[执行记录](cases/requirements/ERYE-196/results-002-20261105.md)；本机底稿`reports/erye196-002-20261105-1919/`。001仍Passed，003～005未执行；总计1 Passed/4 Blocked/129 Not Run。



## 2026-11-05 ERYE196-001按业务验收口径通过

更新后校验：`npm run cases:check`通过（543条、0问题），196逐条状态/人工执行登记/摘要及报告链接一致，目标文档差异空白检查通过；未新增业务执行。

用户明确“开发怎么实现的具体可以不验证”。001据当前工程实测更新为**Passed**：能力/当前工程可读取，选区及轨道正确，播放头/缩放/面板操作正常，上下文同步，revision 3→3、content/updated_at一致、可观察编辑历史past1/future0不变。字段等价映射及服务端历史实现不再作为本例阻塞；用例正文同步改为业务可观察预期。

这是同批实测证据在用户确认范围后的结论更新，没有新增运行。当前134条：**1 Passed / 4 Blocked / 129 Not Run**；001为人工有头执行、无固定脚本，自动化列恢复PLAN，registry另记Passed。002～005未重跑，原始七张截图及读取响应保留。[最新结果](cases/requirements/ERYE-196/results-001-rerun-20261105.md)。



## 2026-11-05 ERYE196-001按用户当前工程复测

文档校验通过：`npm run cases:check`检查543条、0问题；196仍134条（5 BLOCKED/129 PLAN），九列及最新报告链接有效，七张原始PNG清单已核对，目标文档差异空白检查通过。未修改测试框架，未重复全套离线测试。

按用户“使用我打开的这个项目”，在有头Chrome核验“张雅婷(Tin)分享的视频.mp4”（工程3bc78d71-8cf6-4caf-b347-a2f19962f471）：revision 3→3、content及updated_at一致，本地past 1→1/future 0→0；播放头/缩放/面板操作及选区、轨道身份子项通过。发现实际`/cloud-tool-api/mcp/editor`读取入口，initialize/tools/list返回109项工具及Schema，editor_project_get/editor_view_get成功；显式页面会话回读与8秒/1.5缩放/字幕面板收敛。前端92项目录另行记录，不与服务端109项混计。

完整001仍BLOCKED：原timelineId/revisionToken字段的正式等价映射及服务端历史证据待确认；已不再以“找不到能力/上下文入口”作为最新阻塞。其他002～005未重跑，134条仍5 BLOCKED/129 PLAN。七张真实截图、前后快照/MCP响应及历史证据已保存，[最新执行记录](cases/requirements/ERYE-196/results-001-rerun-20261105.md)，底稿`reports/erye196-001-rerun-20261105-1829/`。没有AI任务、云效写入、产品源码修改或发布。



## 2026-11-05 ERYE196-001～005有头核验

本机Chrome已核验，**0条整例通过、0条确认产品失败、5条Blocked**；其他129条未执行。已新建独立20秒PA并用真实SRT建立C1/C2双语字幕，素材文件显示与可编辑cue分别确认。001移动播放头、缩放、切换面板的子项通过：revision 4→4、内容一致、0保存请求；能力/上下文K及服务端历史仍未确认。002/003缺时间线分页/版本游标契约；004/005可选中视频/C1但未找到Agent对象引用入口，目标改文未发送。完整B0的配音/BGM/水印/独立PB仍未准备，不把前置核验计为完整闭环或产品失败。

[逐例结果、未发送的完整提示词、实际工程ID和截图](cases/requirements/ERYE-196/results-001-005-20261105.md)。底稿`reports/erye196-001-005-headed-20261105/`；目标turn请求0、AI任务0、补槽0（不证明无补槽），没有云效写入、产品代码变更或部署。001～005正文/登记改为BLOCKED，其他需求与既有MW/SSO结果保持。

文档更新后`npm run cases:check`通过（当前正式需求543条、0问题）；196仍134条，5 BLOCKED/129 PLAN与registry一致，执行报告截图链接全部有效；9张原始PNG头部/尺寸/哈希已登记。前后快照内容相同、revision均4。目标文档差异空白检查通过；未修改测试框架，因此未重复全套离线测试。



## 2026-11-05 ERYE-237全量重写需求用例

按用户“不保留旧用例”重新设计144条，P0 95 / P1 48 / P2 1，全部PLAN/Not Run，0脚本、0业务执行。[详细用例](cases/requirements/ERYE-237/cases.md)、[需求/Figma分析与测试点](cases/requirements/ERYE-237/analysis.md)、[测试前置与数据](cases/requirements/ERYE-237/test-data.md)已进入统一入口；旧16/06页面仅保留新版导航，不保留旧表或旧ID映射，登记表仅映射本版。

只读取得云效v1.1正文及v1.2修订（最后修改2026-10-19 10:42:09，评论/附件0），读取用户指定Figma文件SqGzwtxqNjFZa9QIvUPAlc的1816:50610画布及代表状态；完整Figma评论未取得，未编造。用户已确认批注最多10条，与设计会话20张图片注释分开。覆盖A01～A24、D01～D12和IMG-R增补；拟定期限/字体回退/候选策略及资料缺口列门禁，不计已通过。其他需求和MW/SSO定义/结果保留；未写云效、未执行图像生成、未改产品或云端代码。

静态校验：`npm run cases:check`通过（正式需求543条、0问题）；专项144个编号/9列表格/PLAN登记一致，A01～A24、D01～D12及IMG-R01～05已追踪，184处本版相对链接/锚点有效，其他8份受保护用例/配置及其他需求登记段未变。底稿`reports/erye237-requirement-20261105/design-validation.json`；静态设计覆盖不代表已执行或已满足发布门槛。

## 2026-11-05 ERYE-206/210正文评论与最新设计用例检查

新增[206 67条](cases/requirements/ERYE-206/cases.md)、[210 54条](cases/requirements/ERYE-210/cases.md)，全部PLAN/Not Run；[联合规则与复用](cases/editor-linked-196-206-210.md)连接196。用户确认最新Figma已确认主页面优先，采用五入口，旧DC-05仅历史追溯；拟定字段/锁/清理规则保持DRAFT门禁。需求正文、206四评论含内嵌图、210一评论与最新Figma结构及9张目标截图均已只读核对，未执行产品操作。

`npm run cases:check`通过：488条、0问题。独立检查121个唯一ID、九列、编号步骤、状态/登记一致、语义目的去重、206 AC32/CP16、210 AC12/NAV-R5覆盖映射和35个本地链接，均通过；196原134条及配套4个文件SHA-256未变。差异空白检查通过。本机底稿`reports/erye206-210-requirements-20261105/design-validation.json`。覆盖是设计覆盖；没有执行业务、没有云效写入或产品代码变更。

## 2026-11-05 ERYE-196正文及评论用例静态检查

新增[134条正式需求用例](cases/requirements/ERYE-196/cases.md)，M1 121条/M2 13条，全部PLAN/Not Run；完整读取需求正文及评论23563211的18节详版，WAC01～32逐项建立设计映射。配套[需求分析](cases/requirements/ERYE-196/analysis.md)与[前置数据](cases/requirements/ERYE-196/test-data.md)已关联统一入口和登记表。

`npm run cases:check`通过：全工程367条、0问题。独立校验134个唯一ID、九列、编号步骤、分期、状态、registry逐项一致，WAC32项及WFR01～18设计来源完整，9个本次本地链接可用；针对同模块/前置/动作/预期去重检查及人工场景复核通过。差异空白检查通过。检查底稿仅本机`reports/erye196-requirement-20261105/design-validation.json`。10项待冻结规则、数据制备和故障环境均明确前置；未执行任何业务任务，不把静态设计覆盖记为产品通过。

## 2026-11-05 剪辑配音与字幕同步用例设计

新增[SYNC-001～006](design-cases/multi-workflow/editing-dubbing-sync-cases.md)，6条P0、0 AUTO/6 PLAN、业务未执行；统一入口、工作流矩阵、设计状态登记及进度已关联。素材按固定种子分层抽样，8个原始文件重新计算SHA与盘点一致；005配套视频仍待准备。验收采用用户确认的可观察问题标准，不新增毫秒阈值。

本节只记录用例设计和静态检查，不代表字幕/配音真实任务通过；原SSO定义、脚本及历史结果保留。`npm run cases:check`通过（正式需求233条、0问题；该命令不扫描本专项）；另做本专项静态核对：6个唯一编号、6条P0/PLAN、9列表格、12份提示词、三类各2条、15处新专项链接/锚点及8个源文件SHA均通过。7份受保护文件（原SSO正文/脚本、登记表、Excel）哈希未变；本轮涉及的受跟踪文档`git diff --check`无空白错误。底稿`reports/editing-sync-design-20261105/validation.json`，业务任务提交0次。



## 2026-11-05 SSO-020字幕文字偏差同步云效

SSO-020第2轮字幕首句“or a family”转写为“Our family”已提交[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c)，优先级中、严重程度3-一般。新建1、旧项更新/评论/重开0、失败0、验证1；1张本次真实成片失败帧上传并嵌入，另附2份SRT、2份音频核验样本和脱敏JSON，共6附件，正文/字段/附件及图片引用回读通过。全状态初查102条，写前复查，最终103条且当前键唯一；截图首次上传超时，经回读确认为未上传后恢复，未重复创建。测试结论保持4例20轮、3例通过/1例未通过，19轮通过/1轮未通过；SSO-019网络取证异常已补证，不提交产品缺陷。

[本地缺陷](defects/CINLINK-SSO020-EN-001.md)；底稿`reports/sso020-yunxiao-20261105/`。

## 2026-11-05 SSO-019～022原片与产物穿插

新增4条P0各5轮，SSO合计22 AUTO/0 PLAN；001～018定义及既有结果保持。本批有头串行执行结果：受理20/20轮，done 20、任务failed 0；指定验收19轮通过/1未通过/0依赖阻塞/0待复核/0未执行；整例3通过/1未通过/0阻塞。

019/021/022指定检查通过；020 R2字幕首句把原片上下文“or a family”写为“Our family”，实际transcribe_audio SRT已出现该偏差，保留原始页面及成片帧。20/20轮指定根输入匹配，0串用告警；5计划确认、0补槽。019 R3网络回读错误由后续同run/文件哈希回读补证，原JUnit 3 passed/1 failed保留，业务结论分别统计。

不@、原片与指定产物穿插；缺失依赖不回退原片、不重发已受理任务，仍继续独立F轮。实际来源、历史哈希、原始截图及逐轮详情见[本批记录](design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。底稿`reports/sso019-022-source-artifact-20261105/`。仅执行`npm run test:sso:mixed`，不并入默认staging；原执行阶段未写云效，后续SSO-020同步见最新记录。

## 2026-11-05 SSO-010/014确认失败同步云效

按用户指令“不用去重”，已新建并回读验证[FWXC-281](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=924be6ade88ed3f7bac77b4f7d)（SSO-010 R4）、[FWXC-282](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=8f4587beeafd93082783651e90)（SSO-014 R1）。共2张本轮原始失败PNG上传并嵌入正文，实际SRT与脱敏定位JSON各2份，共6附件；正文包含详细前置操作、登记/前置/触发完整提示词、复现步骤、实际与预期。新建2、已有项更新/评论/重开0、失败0、验证2，缺陷查询0。014第3轮用户人工审核通过，不提缺陷；本批仍28轮通过/2轮未通过/0待复核，整例4通过/2未通过。

底稿`reports/sso009-014-yunxiao-20261105/`。

## 2026-11-05 SSO-015～017缺陷云效同步

按用户本次授权已新建并回读验证2条：

- [FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)：9次字幕组合计费预冻结失败合并为1条，覆盖015/016各R1/R3/R4/R5、017 R1；9张对应原始失败PNG均已上传并嵌入。
- [FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)：017原会话重开后认证恢复失败，历史视频无法播放、继续发送未创建run，认证重试至429；2张对应原始PNG均已上传并嵌入。定位在R2重开及首次R3尝试，不是重新登录后成功的R3任务。

两条均优先级高、严重程度2-严重；共11PNG＋2份脱敏定位JSON、13附件，正文、字段、附件及图片引用回读通过。全状态初查97条，创建前分别复查97/98条，最终100条且每个缺陷键唯一；另观察到1项非本批新增，未修改。旧FWXC-242是执行链缺凭证，与本次提交前认证恢复失败边界不同，未强行合并或改状态。实际新建2、旧项更新/评论/重开0、失败0、验证2。

脚本误提交、原始音频缓存时序误报及已补齐的ECONNRESET回读缺口均未作为产品缺陷提交；测试业务结果仍1例通过/3例未通过，不因缺陷提交改变。

[计费缺陷](defects/CINLINK-BILLING-TRANSLATE-USAGE-001.md) · [认证恢复缺陷](defects/CINLINK-WEB-AUTH-RECOVERY-001.md) · [执行记录](design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)。底稿`reports/sso015-017-yunxiao-20261105/`。

## 2026-11-05 SSO-014第3轮人工审核通过

SSO-014第3轮由用户人工审核并回复“通过了”，已从待复核改为通过，原ASR同步疑点关闭；保留此前估计及原始音视频证据，不作为缺陷。SSO-009～014本批统计更新为28轮通过、2轮未通过、0轮待复核，整例仍4通过/2未通过；014第1轮日文多余字符、010第4轮法文混语结论保留。

## 2026-11-05 SSO-015～018五轮恢复/历史执行及续跑结果

实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻。逐轮10轮完成指定检查、1轮媒体完成但原UI恢复受阻；未执行不计通过，不宣称四类恢复全部验收。

- SSO-015：未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次。
- SSO-016：未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次。
- SSO-017：未通过：受理5/5轮，任务失败1轮；R2媒体/API下载恢复，重开后UI认证阻塞保留；人工重新登录后续跑已完成。
- SSO-018：5轮指定验收通过。

服务端失败保留原错误`Billing price missing: translate missing_usage; tool was not started`及原run/截图，不重发凑覆盖。原017关闭重开后播放/发送认证阻塞、018初次登记Missing CinLink access token or API key均保留现场；09:08用户重新登录后，先确认原017无已受理R3，再从R3续跑及恢复018。已受理的R1/R2不重发；人工登录不能将017原保留登录态恢复改记通过。

源F按运行快照/原始计划核验，失败工具未启动时仅记计划绑定；成功视频已核尺寸/时长/音轨、实际SRT全文及首中末烧录画面，历史文件SHA-256回读。恢复/历史操作以真实页面交互及S/F/run/POST核对为据，不以API下载替代历史播放。017自动化误提交的一条非目标run已取消并回读cancelled，排除20轮统计、原审计保留。

[完整逐轮结果、实际run/会话与真实失败截图](design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；底稿`reports/sso015-018-five-rounds-20261105/`。18 AUTO/0 PLAN；001～014定义比对不变。类型检查、目标4例发现通过；登录等待支持0持续保留，已实测登录成功。未重复全量离线、未改云端代码/云效。

## 2026-11-05 SSO-009～014五轮组合完成（最新）

SSO-009～014各5轮已全部执行，共6例30轮；业务4例通过/2例未通过（28轮指定核验通过/2轮未通过/0轮待复核）。30/30轮原片F来源可追溯，未发现前轮视频/SRT/配音串用，历史文件哈希保持。SSO-010第4轮法文混入亚美尼亚文、SSO-014第1轮日文多余字符】【均由实际SRT及成片帧确认，失败截图已保存；014第3轮已由用户人工审核确认通过，原ASR同步疑点关闭，不作为缺陷或待复核项。009的401历史回读误报已正常刷新后只读补证，未重复生成。专项18条/14 AUTO/4 PLAN，015～018未执行；001～008既有结果保留，未修改云效。

[本批执行记录](design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)；本地底稿`reports/sso009-014-five-rounds-20261104/`。脚本最后变更后已通过类型检查＋123条离线用例；文档及用例一致性检查见执行记录。

## 2026-11-04 SSO-010五轮结束，SSO-011运行中

SSO-009已完成5轮来源/媒体/内容抽样及历史哈希核验；SSO-010五轮已完成，业务第4轮法文混入亚美尼亚文，其他4轮完成指定核验，整例未通过。当前SSO-011运行中，012～014尚未开始；按原任务继续串行执行，015～018不执行。

## 2026-11-04 SSO-010第4轮法文字幕混语，继续剩余用例

SSO-010第4轮法文组合业务未通过：实际译文SRT第8条32.96～39.16秒含亚美尼亚文սիր，36.06秒原始成片帧确认烧录同样异常。首中末三帧未覆盖该条，已用实际全文检查发现并补原始失败帧；水印C2-FR、原片来源/原英语音轨/结构正常，未发现前三轮产物串用输入。此为本批实际复现的字幕内容问题，与既有FWXC-278同类，未同步或修改云效。继续第5轮，011～014待执行，不因单轮内容失败重发任务。底稿reports/sso009-014-five-rounds-20261104/failure-details.json。

## 2026-11-04 SSO-009五轮核验完成，继续010～014

SSO-009五轮已完成指定范围核验：5轮来源F、5份MP4结构及15帧字幕/水印/残留抽样通过，6份内部SRT结构/语言特征及语义抽样无异常。R5历史回读原断言失败前实际为HTTP401，已按产品正常cookie刷新恢复为200，原5份交付归属与首次SHA-256逐一一致，未重复生成；保留原失败JUnit/trace及真实截图，不作为历史产物丢失缺陷。当前开始010五语字幕＋水印；011～014待执行，015～018不执行。本批尚未全部完成。

## 2026-11-04 SSO-009～014接原检查点继续执行

用户回复“继续”后已核对原检查点：中断时SSO-009第3轮事实上已done并下载，现已补做首中末画面及音轨/结构复核，前三轮均完成指定抽样。第3轮60.488005秒、1280×720、简体中文字幕＋左上C1-R3，未继承第2轮28.97秒/1440p或第1轮字幕水印。先接原S及原run，只从第4轮续跑009，之后再串行执行010～014；不重提前三轮，015～018不执行。本批尚未全部完成，原401/窗口检查中断记录保留历史，不作为工作流产品失败。

## 2026-11-04 SSO-009～014登录中断，保留原任务待续跑

SSO-009～014本批执行因会话回读持续401中断：SSO-009前3轮已完成来源/媒体检查及首中末画面抽样，第3轮已受理（原run保留），终态尚未核实；第4～5轮及010～014尚未执行。第2轮1次计划确认、当前无缺参补槽。Windows窗口检查被自动安全检查终止，理由是无法可靠识别当前浏览器URL，未绕过。已停止本地执行器，不调用后端取消或重复提交；须恢复测试登录态后接原会话/run继续。此次登录中断未取得失败现场PNG，已有逐轮提交/终态截图、原始帧和trace记录保留，不能用提交前截图冒充失败现场。底稿reports/sso009-014-five-rounds-20261104/，本批仍未完成，不计六条通过；14 AUTO只表示接入，015～018仍4 PLAN。

## 2026-11-04 SSO-009～014五轮组合执行中

2026-11-04 SSO-009～014执行中：已接入文档原文6例30轮，专用有头串行、workers1/retries0；遇补槽填写继续，逐轮核验F来源、组合结果、历史文件，并保存失败截图。14 AUTO仅表示脚本接入；015～018仍4 PLAN，本批业务通过数待完整来源/内容复核，不迁移旧结果。脚本变更后类型检查＋123条离线通过。底稿reports/sso009-014-five-rounds-20261104/。

## 2026-11-04 SSO-005法文字幕缺陷云效同步

已新建并回读验证 [FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735)：法文单语字幕混入亚美尼亚文并烧录到视频，关联SSO-005第4轮。优先级中、严重程度3-一般；正文包含同会话前置、完整登记/前三轮/触发提示词、构建版本、run/会话/工具调用及文件ID。2张本轮真实PNG已上传并嵌入正文末尾，另附实际法文SRT和脱敏定位JSON，共4份附件；正文、字段、附件ID/名称及图片引用均核验通过。

全状态查重96条，分页总数一致，创建前再次核对无重复。实际新建1、旧项更新/评论/重开0、失败0、回读验证1。007采样缺口及008的401续接均已恢复，不作为产品缺陷。005～008业务结论仍3例通过/1例未通过（19轮通过/1轮未通过），本次仅同步已有证据。

[本地缺陷](defects/CINLINK-SUBTITLE-FR-001.md) · [执行记录](design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)。同步底稿`reports/sso005-yunxiao-20261104/`。

## 2026-11-04 SSO-005～008五轮有头执行结果（最新）

4例20轮已执行，业务3例通过/1例未通过（19轮通过/1轮未通过）。每例同一会话、一个原片F、五轮同工作流；串行、零重试，只发送各轮正文。001～004既有结果保留，专项当前18条/8 AUTO/10 PLAN。下方同日较早记录作为历史，不覆盖本批结论。

| 用例 | 当前业务结论 |
|---|---|
| SSO-005 | 未通过：第4轮法文字幕混入亚美尼亚文；5轮已执行 |
| SSO-006 | 5轮通过 |
| SSO-007 | 5轮通过；第5轮以原run原始计划补齐来源证据 |
| SSO-008 | 5轮通过 |

SSO-005法文SRT第7条27.540～32.240秒及烧录MP4混入`ոստիկան`；任务done、结构检查通过，内容验收未通过。真实失败帧、终态页面、实际字幕和run信息见[执行记录](design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)、[本地缺陷](defects/CINLINK-SUBTITLE-FR-001.md)。006五种配音语言由独立ASR及字幕/画面交叉抽查；ASR日语尾部静音幻觉已排除。

原始Playwright为2通过/2失败；007第5轮初次来源采样缺证，已只读回读原run的原始计划确认根输入F，下载成片及比对历史哈希后补证通过。原始失败审计保留；原始计划回读兜底已接回脚本并通过类型检查，本批没有为此重发AI任务。

008第5轮首个响应401，但页面自动认证重试已受理原run；恢复后先回读确认，只续接该run完成最后一轮，前4轮未重新处理。续跑单例通过，详见同一执行记录中的原始报告与续跑报告。

20轮原片输入/历史文件隔离、下载和媒体规格均按本次审计记录，内容验收边界见完整记录。类型检查、4例发现、20条提示词与正文一致性检查通过；未重复整套离线校验。底稿`reports/sso005-008-five-rounds-20261104/`。

## 2026-11-04 SSO-015～018替换为四条五轮恢复/历史（仅文档、未执行）

SSO-015～018已按用户确认在原编号替换为每例5轮，共20轮；四类分别为完成后刷新、执行中刷新、关闭重开、查看历史后处理原片。四例使用同一组5轮组合要求对照恢复/交互方式，每例独立S、只登记一个F；每轮核验来源分支、本轮全部效果、当前交付及历史文件哈希，排除前轮成片/SRT/配音作为输入。

| 用例 | 新版场景 | 状态 |
|---|---|---|
| SSO-015 | 五轮完成后刷新恢复 | 5轮／PLAN／未执行 |
| SSO-016 | 五轮执行中刷新恢复 | 5轮／PLAN／未执行 |
| SSO-017 | 五轮完成后关闭重开恢复 | 5轮／PLAN／未执行 |
| SSO-018 | 五轮查看历史后处理原片 | 5轮／PLAN／未执行 |

[SSO正文](design-cases/multi-workflow/same-session-original-cases.md#三同会话状态恢复与长对话4条)已补齐20段完整提示词、每例前置操作、5轮结果及恢复/历史检查预期，并增加恢复前置/逐轮验收R。每轮组合依次为英文字幕＋REC-R1、20秒高光＋1440p、中文字幕＋REC-R3、完整英文字幕＋1440p、30秒高光＋英文字幕；不@、不恢复统一前缀、不重传F。

015每轮完成取证后刷新，017每轮完成后关闭页签并从历史重开同一S，018第2～5轮发送前查看最早及最近历史成片；016每轮确认受理且仍running时刷新，保存页面外证据，接回原任务而非重提。错过运行窗口记未覆盖，不重复提交凑覆盖；合法补槽/计划确认归入当轮，刷新/重开/查看不增加业务轮。五轮仅为历史干扰抽样，不声称覆盖最大上下文长度或压缩机制。

四条均PLAN/未接脚本/未执行；本次未启动浏览器或真实任务、未改产品源码或云效。001～014原条目及001～004既有14轮结论保留；专项仍18条、5 AUTO/13 PLAN，005～018新版不计通过。入口、README、工作流矩阵说明、自动化登记及Codex上下文已同步；未改requirements或尚未收录SSO的Excel。

文档校验通过：18个唯一SSO编号、九列及5 AUTO/13 PLAN；四条各5轮、20段完整提示词、20段结果预期及20段恢复/历史预期一致。001～014原条目及11个受保护文件哈希未变，106个本地链接/锚点有效。`npm run cases:check`为233条正式需求用例、0问题（不扫描SSO，SSO已另行核验），差异空白检查通过。校验底稿仅本机保存于`reports/sso-recovery-design-20261104/`；没有执行预发或重复全套离线测试。

## 2026-11-04 SSO-009～014替换为六条五轮组合（仅文档、未执行）

SSO-009～014已按用户确认在原编号替换为每例5轮多工作流组合，共30轮；每轮处理同一会话最初登记的原片F，排除前轮视频/SRT/配音，所有效果集中在一个最终MP4。5轮逐轮保存来源分支、当前交付、内容/音轨/语言及历史哈希证据，缺证据不得判通过。

| 用例 | 新版场景 | 状态 |
|---|---|---|
| SSO-009 | 五轮不同组合交替 | 5轮／PLAN／未执行 |
| SSO-010 | 五轮组合字幕语言切换 | 5轮／PLAN／未执行 |
| SSO-011 | 五轮高光组合与完整原片组合交替 | 5轮／PLAN／未执行 |
| SSO-012 | 五轮组合效果扩增与缩减 | 5轮／PLAN／未执行 |
| SSO-013 | 五轮相同组合连续及间隔恢复 | 5轮／PLAN／未执行 |
| SSO-014 | 五轮译制组合与原英语组合交替 | 5轮／PLAN／未执行 |

已在[SSO正文](design-cases/multi-workflow/same-session-original-cases.md#二每轮多工作流组合处理原片6条)补齐30段可直接复制的完整提示词、每例前置及5轮预期，并增加组合前置/逐轮验收Q。素材登记不计业务轮，补槽按当轮值填写后继续；不恢复统一提示词前缀，不允许只凭done、助手说明或终态来源字段判通过。允许本轮内部临时文件及有证据的缓存，不能把文件ID相同直接判串用。

014已由用户本次确认纳入译制组合设计，日语/中文普通话/法语配音及水印组合能力须执行前核对，不支持则记录具体前置阻塞，不静默退化为字幕。返回原英语轮需与F音频对照；字幕/配音语言和语义须实际内容核验。

本次未执行30轮、未接新脚本、未改产品源码或云效；001～008及015～018原条目保留，001～004既有14轮结果不变。专项仍18条、5 AUTO/13 PLAN，真实通过数不增加；005～014新版及015～018仍未执行。Excel尚未收录SSO，本次未写入工作簿或requirements。

文档校验通过：18个唯一SSO编号、九列及5 AUTO/13 PLAN；目标六条各5轮、30段完整正文与30段逐轮预期一致，重复组合的指定轮提示词完全一致。其余12条原条目及11个受保护文件哈希未变，104个本地链接/锚点有效。`npm run cases:check`为233条正式需求用例、0问题（不扫描SSO，SSO已另行核验）；差异空白检查通过。校验底稿仅本机保存于`reports/sso-combination-design-20261104/`。未运行浏览器或真实任务，也未重复全套离线测试。

## 2026-11-04 SSO-001～004穿插版14轮完成

SSO-001～004新版14轮已完成，来源/流程/产物结构及指定抽样核验4通过、0当前阻塞；0补槽、3次计划确认。删除前已发4轮保留真实旧提示词，后续10轮仅发送正文。SSO-005及其他未执行用例不计通过。

001/002/003/004分别2/3/4/5轮；实际输入14/14为原片F，未用前轮成片/SRT。9份MP4＋5份SRT均下载并匹配本轮交付；增强均2560×1440，高光19.066341/28.608/19.066341秒，5份SRT各15条。9视频首中末共27帧未见历史效果串用，历史文件回读哈希保持一致。4个登记run、14个业务run，无重复AI提交。

执行中登录/工作台导航和只读下载ECONNRESET中断均已续接完成；原始失败PNG、trace及阶段报告保留，不作为工作流产品缺陷。只读下载最多2次ECONNRESET网络重试，Playwright仍串行、零重试。最后脚本修改后类型检查＋123条离线通过。字幕逐字、高光语义、全片画质和账单未完整验收；未改产品源码或云效。

[完整执行记录](design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)；底稿`reports/sso-interleaved-variable-rounds-20261104/`。005最新五语言字幕及006～008同工作流定义保持原样，均未执行；专项仍18条、5 AUTO/13 PLAN。

## 2026-11-04 SSO-005～008改为五轮同工作流

按用户最新补充，已在原4条用例中补齐五轮正文、前置、逐轮预期与来源/语言/参数隔离；共20轮业务对话，素材登记不计入轮次。各例同会话、只上传一个F，各轮从F开始、不@，不恢复已删除的统一提示词前缀。

| 用例 | 固定业务工作流 | 第1～5轮 |
|---|---|---|
| SSO-005 | 添加字幕，保留原英语音轨 | 简体中文、日文、韩文、法文、西班牙文字幕，逐轮烧录到原视频 |
| SSO-006 | 翻译配音的语音及字幕模式 | 中国普通话、日本日语、韩国韩语、法国法语、西班牙西语配音，各带对应同语字幕 |
| SSO-007 | 文字水印 | R1右上、R2左上、R3右下、R4左下、R5右上；文字各不相同 |
| SSO-008 | 高光剪辑 | 20、30、15、25、20秒；逐轮从完整F剪辑 |

005的转写/字幕翻译/烧录按“添加字幕”同一业务工作流计；006的翻译、配音及对应字幕按产品“翻译配音（语音及字幕）”同一模式计，不算不同工作流穿插。五语种来自当前composer语言选项（zh-Hans/ja/ko/fr/es），执行前核对实际环境，不假定地区口音、声线克隆或口型同步能力；006只按本次用户明确要求纳入。

SSO-005已有脚本的5轮定义已同步为字幕MP4；可核验来源、媒体结构、下载及抽帧，字幕语种、译文/旧语言残留仍须结合实际内容验收，不能只凭MP4或字符特征报完整通过。006～008仍PLAN，未新增自动化。专项保持18条、5 AUTO/13 PLAN；本次四条新版均未执行，没有新增真实任务。001～004的定义及既有执行批次保持原样，历史版本不替代新用例结论。

正文：[SSO用例](design-cases/multi-workflow/same-session-original-cases.md)；统一入口、自动化登记及项目上下文已同步。类型检查、5条脚本发现及18条文档/五轮参数一致性检查均通过；本次未执行005～008，未重复全套离线。

## 2026-11-04 SSO轮次及穿插工作流改版（历史准备阶段）

用户已手动删除统一提示词前缀，后续只发送各轮step.prompt正文；不得恢复或重新拼接该前缀。当前已发送任务保留实际文字和run，继续原任务，不伪写为新提示词执行记录。

用户最终确认：SSO-001～005分别为2/3/4/5/5轮，004的“无轮”已确认是“五轮”笔误；每例内不同工作流穿插、各轮不@、明确从最初源视频F开始。已在原条目更新前置、完整提示词、步骤、预期及脚本；专项仍18条，5 AUTO仅表示接入、13 PLAN。

001：英文字幕→20秒高光；002：文字水印→2倍增强→英文字幕；003：中文翻译→30秒高光→文字水印→2倍增强；004：英文字幕→文字水印→2倍增强→20秒高光→日文翻译；005：2倍增强→中文翻译→文字水印→英文字幕→30秒高光。按既有WF-01/02区分字幕与翻译，各例不重复同一工作流。

本轮执行沿用先前指定范围001～004，共14轮，干净会话、有头串行零重试；005仅完成五轮用例/脚本，未执行。旧两轮版本报告`reports/sso001-004-plain-source-20261104/`仅保留历史，不计新版通过。曾拟同工作流五轮改参的草稿未提交执行，已被本次方案替代。当前结果以`reports/sso-interleaved-variable-rounds-20261104/`为准，执行尚未完成。

脚本已加实际分辨率核验，补槽支持宽/高/倍率参数，每轮后回读所有既有历史产物并核对哈希；来源按运行中输入核验，根步骤排除历史交付物，避免把终态更新后的输出或缓存同ID误判为输入。改动后类型检查＋123条离线用例通过。未修改产品源码或云效，原MW与默认预发套件不变。

## 2026-11-04 SSO-001～004无@实测完成

选定4条、8轮已完成，**源视频来源、流程、产物结构及指定抽样核验4通过/0产品失败/0阻塞/0未执行**。每轮均为纯文本明确处理源视频，无@标签；从工具运行中输入快照确认均为最初登记的F，第二轮未消费第一轮成片或SRT。4个独立会话、4个登记run、8个业务处理run；云端原片回读SHA-256均一致，各例UI挂载一次原片、云端去重复用（上传完成请求0次）。0次补槽、3次计划确认，均确认后继续。

| 用例 | 本次结果 |
|---|---|
| SSO-001 | 20秒/30秒高光实际19.066341/29.077秒；均来自F，历史文件哈希不变 |
| SSO-002 | 两轮均60.488005秒、有音轨；首中末帧分别右上SSO-OLD、左上SSO-NEW，第二轮无旧水印 |
| SSO-003 | 中文/日文SRT各15条，第二轮未把第一轮中文SRT当输入 |
| SSO-004 | 英文SRT15条→原片高光19.866341秒；首中末帧未见上一轮新增烧录字幕 |

SSO-002首批因只看终态来源字段而误判：水印工具运行时输入F，完成后该上下文字段已更新为本轮产物。初批原始JUnit **3 passed/1 failed**保留；已修正脚本保存运行中输入快照，并接回原会话、登记run和第一轮run，只读回第一轮、补交第二轮，续接JUnit **1 passed**。没有重复生成第一轮。两张原始失败现场PNG、trace和审计保留，标注为脚本误判，不作为产品缺陷。

[完整执行记录、会话/run、来源证据及截图](design-cases/multi-workflow/same-session-original-results-20261104.md)；底稿`reports/sso001-004-plain-source-20261104/`，根`summary.json`为最终合并口径。脚本修正后类型检查及123条离线用例通过（`npm run verify`退出0）。字幕译文未逐字全量验收，水印/字幕残留按首中末抽帧验证，高光语义与费用未完整验收。SSO专项18条中，001～004已执行、005～018共14条PLAN；旧@阻塞保留历史。未修改产品源码或云效，默认MW/预发数量不变。

## 2026-11-04 本地素材查找缺陷云效同步

已在cinlink-WEB新建并回读验证2条缺陷：

| 缺陷 | 覆盖 | 问题 | 本地记录 |
|---|---|---|---|
| [FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a) | LF-01 | 机器人结果混入留声机、飞机片段 | [CINLINK-FINDFOOTAGE-002](defects/CINLINK-FINDFOOTAGE-002.md) |
| [FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16) | LF-02/03 | 返回原片0～2秒，未定位仙人掌/蓝衣男孩 | [CINLINK-FINDFOOTAGE-003](defects/CINLINK-FINDFOOTAGE-003.md) |

已上传3张本轮原始失败PNG，逐条嵌入正文末尾，另附2份脱敏JSON；项目/缺陷类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文和全部5份附件ID/名称均回读通过。正文含账号/项目与素材分析前置、完整提示词、步骤、实际源ID/位置和run/会话、预期、影响及待确认边界，不添加“排查信息”节或本机路径/调试流水。

首次全状态查重92条；两条写入前再次全量查重分别92/93条，分页总数一致，稳定缺陷键与3个run均无重复。旧FWXC-237是工具定义缺失、0结果，与当前内容相关性/位置错误不同；只读核对，未更新或重开。实际新建2、旧项更新0、评论0、重开0、跳过0、失败0、回读验证2。同步底稿`reports/lf01-03-yunxiao-20261104/`。

本次没有重跑CinLink、没有修改云端代码；LF-01～03仍0通过/3未通过，其余14条未执行。原始测试截图、run及当前自动化启用范围保留。

## 2026-11-04 LF-01～03自动化与真实有头执行

已接独立 `npm run test:footage`，仅LF-01～03，有头单窗口、单worker、零重试；其余14条PLAN，默认卡片/预发套件不增减。实际只创建3个检索run，任务均done，**业务0通过/3未通过/0阻塞/0未执行（选定范围）**：LF-01机器人90～92秒正确，但混入105～107秒留声机及0～2秒飞机；LF-02/03均返回0～2秒短片，画面不含目标仙人掌/男孩。原片及其云端回读SHA-256全部一致，4/4及两套1/1分析就绪有证据，无音轨原片亦分析成功。

原生目录选择/首次上传由用户完成，现有分析续接。实际预发走Agent `search_materials` 的segment/project模式，输出短片来源/时间在facts中；旧专用检索接口与新短片ID不能硬套原片。脚本字段适配后的核验均回读原3个run，没有重新提交AI查询。初期代理连接、重复trace、选择器/字段适配报错仅为脚本调试，不作为产品失败。

证据 `reports/lf01-03-headed-20261104/`：原任务在 `final/`，最终播放/内容断言在 `checked/`，JUnit为3 failed，3张原始失败PNG及5个短片可回读，含逐帧对照、源片哈希、审计、trace及批次汇总。已逐张查看3条实际失败页；正/负源帧对照与固定RGB模板校验能区分查询对象，未放宽阈值。详情与嵌图见[执行记录](design-cases/multi-workflow/local-footage-results-20261104.md)。类型检查与脚本发现完成，未重复全套离线；新辅助依赖为当前机器已有OpenCV/Python/ffmpeg，未安装软件或修改云端代码/云效。统一入口、用例行状态、自动化登记及进度已同步，Excel尚未收录本专项。

## 2026-11-04 SSO改为无@、纯文本指定源视频

按用户最新要求，已在原SSO-001～018条目中调整前置、步骤、完整提示词和预期：同一会话只上传一个源视频F，各轮不输入@、不选择素材引用标签、不重新上传；完整正文明确“本轮请对本会话最初上传的源视频7MB.mp4进行处理，不使用之前生成的视频或字幕文件。”单工作流逐轮处理原片，多工作流本轮组合效果仍集中在同一最终成片。

SSO-001～004脚本同步去掉@候选操作，纯文本提交并检查输入区无引用标签；不再要求无@请求显式携带F，而从实际计划输入核实F、排除上一轮交付物，保留来源审计、下载/媒体/SRT和历史文件不被覆盖检查。恢复检查点新增模式校验，旧@模式报告不能恢复为新版。

当前状态：**4条已接脚本（AUTO）＋14条PLAN，18条无@新版均未执行**。旧SSO-001的@候选前置阻塞及缺陷保留历史，不作为新版失败、通过或当前必经阻塞，也不据此宣布@缺陷已修复。此调整仅涉及SSO，不改变既有MW/CHAIN的素材引用方式及实测结论。统一入口、矩阵说明、脚本登记和项目上下文已同步；Excel仍未收录该专项。

验证：`npm run verify`退出0，类型检查和123条离线用例通过；`npm run cases:check`为233条正式需求用例、0问题（该命令不扫描SSO）。另独立校验18个SSO唯一编号、九列、4 AUTO/14 PLAN、无@操作、8段脚本/文档提示词一致及90个本地链接，均通过。`npm run test:sso -- --list --reporter=list`发现4条，未打开浏览器或提交任务。检查底稿`reports/sso-plain-source-design-20261104/`，未修改产品源码或云效状态。

## 2026-11-04 本地素材查找P0用例与夹具核验

已编写[LF-01～17](design-cases/multi-workflow/local-footage-p0-cases.md)共17条P0，统一入口、矩阵CS-06、自动化登记、当前进度及上下文已同步。历史Find Footage缺陷保留原始证据，补记用户确认开发完成、待回归；未修改云效状态，未删除空结果FIXME。

指定目录4个视频经ffprobe、SHA-256和抽帧核验：前三片60秒、音轨数1/1/0，第四片300秒、20镜头；19个切点为15～285秒、间隔15秒。独立本地Whisper抽查F2的0～20秒、F4的90～105秒，提供语音查询线索，LF-17仍须执行前人工听审。原片未修改、未上传，底稿 `reports/footage-p0-design-20261104/`。

定向文档检查通过：17个连续唯一ID、全部P0/PLAN、逐行9列、完整前置/编号步骤/预期、统一入口17行一致、8处相关本地链接存在、4个源文件大小/哈希一致、F4切点及语音线索对应；结果 `design-check.json`。目标受跟踪文档 `git diff --check` 通过。没有需求用例或代码变更，未重复全套离线校验；这些是设计及本地夹具检查，不是线上17条通过。未提交真实分析/检索、未新增自动化，Excel尚未同步本专项。

## 2026-11-04 MW-01 云效同步

已在cinlink-WEB新建并回读验证 [FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)（工作项`9abeb86a98cba72e7158bc3d60`），[本地缺陷记录](defects/CINLINK-MW01-001.md)。范围为当前用户确认的“一条完整提示词一次提交”：只交付中文字幕SRT，英文仍待后续规划；`intent_fully_satisfied=false`却`done/Completed`，请求未完整满足。旧两轮续接或Stop按钮现象不属于本缺陷。

正文包含详细前置、英文原片规格、完整提示词、单次提交的逐步复现、实际/预期、影响与回归边界，沿用用户模板，不含“排查信息”。已上传并嵌入2张原始PNG（提交前、Completed但缺英文SRT），另附脱敏执行JSON，共3份附件。项目/类型、负责人/迭代/标签、优先级高、严重程度2-严重、正文和附件ID/名称及图片引用全部回读通过。

创建前核对全部状态73条缺陷，并在写入前重新查询；未发现MW-01或同run记录。FWXC-253/245仅症状相似、交付组合不同，同根因未确认，未合并或修改。实际新建1、旧项更新0、跳过0、失败0、回读验证1。同步底稿`reports/mw01-yunxiao-20261104/`。

本次未重跑CinLink任务、未改变默认启用/FIXME或测试结论；MW-01仍待修复回归，MW-02单次提交仍为通过，MW整体14有通过证据/9未通过/3前置阻塞。


## 2026-11-04 旧快捷入口清理

按用户要求删除矩阵旧快捷卡片整节、分类表3项、CS-07～09及相关前置/no-op规则；本日已有DOM快照中旧快捷锚点为0。现有功能卡片和7条自动化脚本不变，未新建任务或缺陷。

工作簿使用Artifact工具生成目标修改，并保留原工作簿的字体charset等原生样式。目标页清理后为卡片清单12项、卡片用例22条，总览同步；1692个保留单元格的内容/样式、冻结窗格、合并和列宽核对通过，13个非目标包部件字节不变，已移除条目为0；已检查修改前后视图。备份、预览、修改及核验底稿在 `reports/cleanup-quick-prompts-20261104/`，没有覆盖历史测试证据。此次仅文档/工作簿清理，不重复执行离线或预发测试。

## 2026-11-04 AI生图P0设计检查

AI生图正文统一到 `docs/design-cases/multi-workflow/ai-image-p0-cases.md`，沿用IG-01～05并补IG-06～08，共8条、全部P0；统一入口逐条展示分辨率/比例及状态，旧矩阵的重复正文已改为链接。覆盖1K/2K/4K、5种常用比例、默认参数及同会话比例/分辨率切换。当前模型精确像素映射尚待补齐，不以产物自身尺寸反推预期。

定向文档检查通过：8个唯一连续编号、九列必填、P0标记、未执行说明、7 PLAN/1已有脚本部分覆盖（IG-05）；69个本地链接有效，原矩阵无重复IG正文。仅修改文档，没有新增或运行生图脚本、没有创建真实生成任务；卡片套件仍7条，AI生图仍1条，未重复离线全量测试。Excel尚未同步此次参数扩展。

## 2026-11-04 SSO有头前置调试与统一入口

SSO-001～004脚本已接入，独立有头配置、单worker、零重试。SSO-001调试中原片登记run `run_v2_ac077d4ceff64e19b368e44aa815f911` done，会话 `e6ac20f8-8f53-406c-9c24-d083eb44df6b`，F=`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`；源文件下载SHA-256与本地一致。随后第一轮@候选未命中，页面“暂无相关内容”，目标20秒/30秒任务均未提交。原始JUnit为1 failed（27.7秒），业务判为前置阻塞；SSO-002～004未执行。

证据：`reports/sso-headed-20261104-113440/headed-source-resume/` 中HTML/JUnit、审计、截图、trace。前序仅登记/夹具适配资料保留，不当作目标工作流失败。用户确认@缺陷已提、修复中，本轮停止执行，不新增缺陷。

统一导航已调整为[全部用例入口](cases/README.md)，原分类正文和编号保留；已同步SSO脚本状态与阻塞信息，不把已接脚本当作通过。

本轮收尾：类型检查通过；`npm run test:sso -- --list`发现同一文件4条脚本；统一入口、根README及SSO正文的66个本地链接均有效；SSO正文18个唯一编号、九列和状态校验通过（4 BLOCKED / 14 PLAN）。以上检查不打开浏览器、不提交任务，未重复全量离线测试。

## 2026-11-04 MW-01/02 单次完整提交复跑完成

用户明确两条都一次发送全部提示词；已在原条目和脚本调整并各执行一次，串行、单worker、零重试，0补槽、0计划确认。**MW-01未通过、MW-02通过**；分别有单例HTML/JUnit/trace，合并摘要`reports/mw01-mw02-single-prompt-20261104/summary.json`，不伪造同一份两条JUnit。

MW-01：196.973秒，run `run_v2_2edbba5bdcaa4e0da78359e0a0e3f006`（会话`07abbd20-d1b5-471f-888d-291b553b7b04`）done且无错误，仅交付一份中文字幕SRT，缺英文SRT，交付断言失败。下载字幕15条、中文文本、结束60.46秒。UI说明仅先安排中文，英文待该SRT可用后再规划；步骤为抽音频、转写、一次翻译、导出，未自动完成后置英译。失败PNG、final-state、trace与审计保存在`reports/mw01-single-prompt-20261104/`；不推测根因。

MW-02：658.485秒，run `run_v2_5bf18559740c45c5bb7d439a14f81ea3`（会话`e79fe1d1-74cc-4149-ae9e-55adf306a8b3`）done，交付中文SRT和增强MP4。已下载核验：中文SRT15条、结束60.46秒；MP4约21.24MB、2560×1440、60.495778秒、1音轨。`reports/mw02-single-prompt-20261104/artifact-verification.json`保留ffprobe与字幕基础核验；未逐字验证翻译或逐样本比较音轨。

两条均按实际英文原片写提示词，类型检查通过；没有重复全套离线或修改判定阈值，默认启用/FIXME不变，未向云效写入。执行源码快照与各自run-state哈希一致。26条台账更新为14有通过证据/9未通过/3前置阻塞/0待复测，MW-01为当前缺英文SRT失败，MW-02为通过。SSO专项状态以独立执行与阻塞记录为准，不由本次MW结果替代。

## 2026-11-04 旧执行方式纠正记录

运行时只有停止按钮为正常交互。原MW-02“重叠发送失败”的产品失败判定撤销，原始Playwright/JUnit和截图不改写；旧摘要标记执行方式不适用。用户进一步明确MW-01也一次提交全部要求，旧两轮MW-01仅作为历史场景记录，不替代当前单次字幕链。后续执行及结果见本页最新记录。

## 2026-11-04 12:30 MW-01 / MW-02 初批记录（MW-02执行方式不适用）

真实执行 **1 passed / 1 failed**（约4分钟），单worker、零重试，补槽0次、计划确认0次。Playwright JSON统计expected=1、unexpected=1、全局错误0；JUnit共2项，MW-02记为error项（errors=1、failures=0），不改写原报告。auth沿用有效会话1 passed（10.2秒）；类型检查、3条定向单测通过；未重复全套离线。

MW-01：182.022秒，同会话先字幕SRT、再上一轮SRT翻译，两run均done。第二次发送按钮为Send；服务端第二轮仅translate_subtitle/export_subtitles，各步骤上下文只含1份字幕，无视频/音频，没有重新抽音频或转写。两份产物名称不同但file_id相同，本次不据此判定语言正确或错误，未逐字验收字幕和完整时间轴。

MW-02旧执行：53.532秒，第一条字幕run queued时输入第二条增强指令，DOM只有workspace-stop（Stop task），没有workspace-send，未产生增强run。未点击停止；测试清理取消首run。用户现已确认这是正常交互，应一次提交全部要求；旧人工重叠发送测试不适用，不计为产品失败，已由单次完整提交复跑替代。

`reports/mw01-02-20261104/`保存原始HTML/JUnit、两份trace、审计、截图、字幕步骤和DOM控件摘录；摘要另注明MW-02设计纠正。初批14通过/9失败/3阻塞口径已因MW-02纠正而过期，以最新记录为准。正式需求目录、默认FIXME配置未改，未向云效写入，SSO设计仍未执行。

## 2026-11-04 MW-06 / MW-10 云效同步

已在cinlink-WEB新建并回读验证2条：

- MW-06：[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)，任务done但缺单独英文SRT；[本地记录](defects/CINLINK-MW06-001.md)。
- MW-10：[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)，高光Extract audio报source_duration_sec空对象错误、无产物；[本地记录](defects/CINLINK-MW10-001.md)。

每条包含详细前置操作、素材规格、原提示词、逐步复现、实际/预期和回归边界，均按用户模板去掉“排查信息”。每条上传并嵌入提交前及失败终态原始PNG，另附脱敏执行JSON：共4张图、6份附件。项目/类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文、附件ID/名称及嵌图引用均回读通过。

创建前对全部状态分页核对，初始71条，未发现两用例或同run记录；FWXC-245仅有相似缺英文SRT症状，交付组合不同、同根因未确认，未合并或修改。每条创建前均重新检索并以更新时间复核详情缓存；最后一次创建前共72条。实际新建2、旧项更新0、跳过0、失败0、回读验证2。同步底稿：`reports/mw06-mw10-yunxiao-20261104/`。

本次只同步证据，没有新增CinLink任务；测试结论仍为8条流程/产物检查通过、2条未通过，默认启用/FIXME数量不变。已注明英文语音素材与中文语音提示词的前置差异，不宣称已覆盖严格中文源语音场景。


## 2026-11-04 10:43 多工作流10条补跑完成

汇总2026-11-03已提交MW-06原run与本日续跑9条：**8流程/产物检查通过、2未通过、0阻塞、0未运行**。通过MW-03/07/08/09/23/24/25/26；MW-06 done但中文SRT+总结仅2份，缺单独英文SRT；MW-10 failed、0产物，错误`'NoneType' object has no attribute 'source_duration_sec'`，原始画面位于高光Extract audio步骤。失败PNG及trace均已保存并检查。

续跑09:40–10:43，JUnit **8 passed / 1 failed**、退出码1；单worker、零重试，没有重跑MW-06。auth 1 passed（45.2秒）。实际0次补槽提交、8次计划确认；配置允许补槽填写继续。类型检查与3条定向单测沿用前次有效结果，本日仅执行目标预发任务，未重复全套离线；当前离线发现123条，不等同全部已执行。

验收边界：仅检查任务完成及产物数量/类型，未完整验收字幕、水印、剪辑顺序和媒体规格。源文件SHA-256与MW-16独立ASR证据一致，实际英文语音；提示词未改，仍按中文语音描述，严格中文源语音前置未覆盖。原有素材下的流程证据与完整业务验收分开报告。

已更新测试进度、上下文、原多工作流用例备注、覆盖账本与离线发现数量文档；默认启用/FIXME数量不变，正式需求目录未改，未向云效写入。合并报告：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/summary.json`；续跑HTML/JUnit/审计/trace位于`remaining-after-auth/`。26条最新覆盖：13有通过证据、8失败、3前置阻塞、2旧异常待复核。

## 2026-11-03 21:13 多工作流初批记录（认证中断，已于次日续跑）

用户指定MW-03/06/07/08/09/10/23/24/25/26；已按串行、零重试启动，设置补槽填写继续，并留存失败截图与trace。MW-06原任务done、交付中文SRT和总结2份，缺英文SRT，未通过；恢复读取23.338秒，页面原任务耗时205秒，二者分开记录。MW-07发送页Unauthorized、120秒无提交响应，未取得run_id；会话核验失效，属于认证前置受阻，已停批次、打开人工登录，剩余9条待继续。

人工登录等待300秒超时，窗口已退出。当前0通过、1未通过、1认证受阻、8未运行，不是10条完整执行结果。恢复登录后运行该报告目录内`run-remaining.cjs`，仅补其余9条。认证失败截图另存`auth-expired/`，结构化状态见`summary.json`。

筛选已用编号后空白限定并核对10条发现结果；最初误匹配父级标题的批次仅提交MW-06即中断，未执行额外用例；截图等待字体被中断后跳过字体就绪等待，继续读回同一run，无重复提交。中断资料和正式取证分别保存在 `reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`，未合并成一次完整JUnit结论。

类型检查通过；完整参数补槽、原生select补槽后继续确认、原run恢复绑定3条定向单测通过；离线发现123条，未重复全量校验。改动不涉及正式需求用例或产品判定阈值，未向云效写入。

## 2026-11-03 21:05 MW-22 前端模拟

执行 `npm run test:multi:materials:ui`：**1 passed，7.035秒**（总计8.593秒），类型检查通过。只加载预发静态资源，空登录态，业务接口与 SSE 本地模拟。验证 A done / B running 后仅将 B 更新为 failed，原生步骤错误可见，A 卡片保留，产品下载按钮可下载合成 MP4，22,718字节及SHA-256均一致，页面脚本错误0。模拟汇总文字可见，但不覆盖服务端统计生成；下载为本地 data URL，不验证 S3。

未改云端代码、未提交真实AI任务、未注入真实服务端故障。MW-22真实场景仍前置阻塞 / FIXME，真实专项通过数和默认套件计数不变。此前模拟夹具适配过程的失败报告保留，不当作服务端任务失败。本次未重复全量离线测试。

证据：`reports/mw22-ui-mock-20261103-210517/`（HTML、JUnit、两阶段截图、审计JSON、UI快照、trace）；详细实现及边界见 [MW-22说明](design-cases/multi-workflow/mw22-breakpoints.md)。

## 2026-11-03 MW-16 云效同步

已提交 cinlink-WEB [FWXC-250](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=443f3aba58a7c4f7faa88ca508)（工作项 `443f3aba58a7c4f7faa88ca508`），本地记录：[CINLINK-MW16-001](defects/CINLINK-MW16-001.md)。缺陷明确为“B日文字幕串用A内容，非两份字幕互换”；优先级高、严重程度2-严重。正文沿用用户模板，不含“排查信息”一节，包含详细前置、完整提示词、复现和核验步骤。

已上传并嵌入原始产物页面和来源核验对照图，另附两份原始SRT及脱敏核验JSON，共5份附件；标题、描述、项目/类型、负责人/迭代/标签、优先级/严重程度、附件ID/文件名均回读通过。创建前遍历全部状态68条缺陷，未命中MW-16或同run证据；本次新建1条，未更新旧项。同步底稿位于 `reports/mw16-yunxiao-20261103/`。

本次只同步已核验结果，没有重跑CinLink任务；MW-16仍为内容核验未通过，保留FIXME，专项统计2通过/2未通过/2前置阻塞不变。


## 2026-11-03 MW-16 内容核验：确认B串用A，非A/B互换

**结论：MW-16 未通过。A英文SRT正确对应A，B日文SRT也对应A；不是两份字幕互换，而是B交付物串用了A的内容。** 原run仍为done、文件级JUnit仍为passed；本次新增内容层判定失败，不改写原始执行记录。

| 产物 | 对照A原片 | 对照B原片 |
|---|---|---|
| A_English.srt.srt | 医疗法/医疗保障演说，对应 | BBC新闻，不对应 |
| B_Japanese.srt.srt | A内容的日文翻译，对应 | BBC新闻，不对应，错源 |

核验方法：使用本次已下载产物及原始视频，源文件SHA-256与实际提交的两个独立file_id逐一匹配；原产物file_id/name与本地文件对应，排除核验时拿反。用本机Whisper large-v3-turbo独立转写A的0–20、30–50秒，B的0–20、30–50、90–110、149–169秒，并与英文/日文SRT交叉核对。没有新增CinLink任务。

关键证据：A开头讲医疗法，30–50秒讲儿科、癌症保障、Las Vegas/Elko；B开头为BBC伦敦播报和莫斯科无人机，30–50秒转为夏威夷山火。英文A及日文B都在讲A的医疗内容（日文第10条为“ラスベガスからエルコ”）。两份SRT均15条，15个起点全部相同、14个终点相同，最大差0.02秒；均止于60.46秒。B在90–110秒仍报道女足世界杯、149–169秒仍有新闻语音，因此后半段也缺少对应字幕。时间统计是旁证，错源结论基于语音与译文内容。

证据：`reports/mw16-content-verification-20261103/` 下 `verdict.json`、`subtitle-comparison.json`、6段WAV及独立转写JSON、`comparison.html`、`comparison.png`、`original-delivery.png`。对照图明确标注为原片帧+已下载字幕+独立ASR的核验报告，并非原产品页面截图。详细记录见 [CINLINK-MW16-001](defects/CINLINK-MW16-001.md)。

专项最新业务统计更新为：**2条流程/结构通过、2条未通过、2条前置阻塞、0条待核验**。MW-16保留FIXME，默认套件数量不变。本次未向云效写入。核验足以确认错源，不代表整片译文质量已逐字验收；具体发生在规划、工具入参还是缓存环节，尚未定位。


## 2026-11-03 MW-15 云效同步

后续按用户最新要求去掉 FWXC-249 正文的“排查信息”一节，云效与本地报告已同步、回读验证通过；两张截图引用保留，附件未变。后续缺陷模板已同步移除该章节。

已提交 cinlink-WEB [FWXC-249](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=dc950e30e2c88409857929f4a4)（工作项 `dc950e30e2c88409857929f4a4`），详细报告：[CINLINK-MW15-001](defects/CINLINK-MW15-001.md)。按当前缺陷模板保留前置操作、完整提示词、逐步复现、run/会话ID、请求时间与前端资源标识、实际/预期及回归命令。已上传并嵌入提交前和失败终态两张原始截图，另附脱敏排查JSON；正文、字段和3份附件回读验证通过。

提交前已遍历项目全部状态的67条缺陷，未发现MW-15或同run记录；本次新建1条，不修改旧项。MW-15仍为未通过/待修复回归，不因提交缺陷恢复默认执行；本次没有重跑计费任务。同步底稿在 `reports/mw15-yunxiao-20261103/`。


## 2026-11-03 MW-15/16/17/19/20/22 多素材专项

用户指定恢复执行此前暂缓场景；新增独立命令 `npm run test:multi:materials`，不自动并入默认20条多工作流或46条staging。单worker、零重试，已复用有效会话。用户执行中要求补槽填写后继续，已据此完成MW-20素材选择并跑到终态。

内容核验后业务口径：**2 条流程/结构通过、2 未通过、2 前置阻塞、0 内容待核验**。首批JUnit为{"failed":3,"passed":3}；准备复核为{"failed":3}；最终MW-17/20专项为{"failed":1,"passed":1}。按用例采用有效任务证据，保留所有初始/复核记录，不混合成单次全绿结果。

| 用例 | 结果 | 耗时 | 补槽提交次数 | 说明 |
|---|---|---:|---:|---|
| MW-15 | 未通过 | 259.901 秒 | 0 | TimeoutError: 规划模型等待响应超过 60 秒，当前请求已超时 |
| MW-16 | 未通过：内容错源 | 243.133 秒 | 0 | 独立ASR交叉核验确认B日文串用A，不是A/B互换；原文件级断言通过不变 |
| MW-17 | 前置阻塞 | 116.879 秒 | 0 | 前置阻塞：素材候选未命中，目标任务未提交 |
| MW-19 | 流程/结构通过 | 154.686 秒 | 0 | 通过基础结构断言；0次补槽提交，0次计划确认；内容层边界见进度 |
| MW-20 | 流程/结构通过 | 252.611 秒 | 1 | 通过基础结构断言；1次补槽提交，0次计划确认；内容层边界见进度 |
| MW-22 | 前置阻塞 | 8.453 秒 | 0 | 前置阻塞：缺少服务端按B素材/翻译节点的定向故障注入，A/B目标均未提交 |

MW-16保留首批文件级通过证据：两个源文件ID不同，服务端SHA-256与本地源文件一致；后续独立ASR交叉核验确认B日文串用A，内容层未通过。日文B与英文A均只有15条、终点60.46秒，而B源约169秒。补充核验在 `mw16-source-binding.json`、`mw16-subtitle-check.json` 与B源截图。后续非项目云端名称引用复核未进入目标任务，不能用其前置失败覆盖首批交付事实。

修正了测试准备：新版非项目入口实际为带aria-label的span，需等待侧栏加载后点击；原脚本可能静默停在旧项目。第三素材C=9s.mp4（9.45秒）及别名material-C.mp4均无法@引用，MW-17最终未提交混剪任务。素材登记后再按云端保存名查找的准备路径也未命中，证据保留，不将其误记成混剪任务失败。MW-22缺服务端定向故障注入，A/B任务均未提交。

MW-20选择第一个视频A，POST /clarifications返回200/user_replied，最终done并下载MP4。原审计计数器只匹配带尾斜线的接口而漏记本次提交；补充从原始trace恢复问题/答案到 `completion/mw20-clarification-evidence.json`，原始审计未改写。已修复原生select、无尾斜线的澄清/确认接口及英文Submit按钮处理。

证据根目录：`reports/mw15-16-17-19-20-22-20261103/`；首批 `html/index.html`，准备复核 `preparation-and-clarification-recheck/html/index.html`，最终复测 `completion/html/index.html`。各目录含JUnit、audit、提交前/结束/补槽截图和trace；汇总为 `summary.json`。流程通过只覆盖状态、数量、下载、媒体结构/SRT格式，内容层未全量验收。本轮未向云效新增或更新缺陷。

校验：类型检查通过；新会话隔离和补槽处理3条定向单测通过（4.1秒）；可发现6条专项、121条离线。复用前序119条离线基线，没有逐条重复整套离线。


## Codex：2026-11-03 云效缺陷格式精简

用户要求补充开发排查信息后，已从对应原始 trace 提取并写入 FWXC-244～247：UTC+8 的提交/终态观测时间、请求 UA 与前端资源标识、关联素材/项目 ID、提交及状态回读接口和 HTTP 状态。MW-21 额外记录项目登记 HTTP 200/registered=1、文件清单含 F、分析接口 task=null/items=[] 及 @ 查询时刻；仅说明本次 trace 未观察到搜索请求，不据此断定服务端未执行检索。未采集到的业务发布版本、完整浏览器版本、request_id/trace_id 已注明。每条新增一份脱敏排查 JSON，4/4 正文、附件与原截图引用回读通过；未重新运行测试，未上传原始 trace 或登录态。新增“排查信息”位于“实际结果”之后，证据见 `reports/yunxiao-debug-20261103/`。

用户随后要求单列前置步骤和提示词，已补充至 FWXC-244～247：顺序为 **现象 → 前置步骤 → 提示词 → 复现步骤 → 实际结果 → 预期结果 → 影响 → 补充 → 失败截图**。MW-21 区分 A 的准备指令与 B 的目标指令，并注明目标未发送；四条原有实际结果及截图均保留，4/4 回读通过。此次仅补充缺陷说明，未重跑测试。最新正文与回读结果见 `reports/yunxiao-preconditions-20261103/`，后续使用该模板。

按用户要求统一整理 FWXC-244～247 的标题和正文，随后按用户提供的示例调整为 **现象 → 复现步骤 → 实际结果 → 预期结果 → 影响 → 补充 → 失败截图**，末尾直接嵌入原始截图。保留完整触发指令、已知任务/会话 ID 和关键错误；移除重复历史、提交流水和脚本调试说明。MW-12 未注入故障、MW-21 素材分析条件未确认等边界写入“补充”。最终 4/4 正文及截图引用回读通过，原附件、状态和负责人未变；未新增缺陷或附件，未重跑测试。前次格式记录在 `reports/yunxiao-format-20261103/`，最终模板及回读记录在 `reports/yunxiao-template-20261103/`，后续沿用用户模板。

## Codex：2026-11-03 MW-21 同项目夹具复测及云效更新

同项目夹具已接入：页面创建 P，A 上传指定素材并保存源消息，通过当前项目文件接口登记同一个 F 后回读；P 内 B 草稿不再上传，只尝试 @ 引用。项目及会话 API 按当前预发适配，project_id 从 Runtime 顶层字段核验。

最终执行 **1 failed，92.364 秒**，失败点在 B 的 @ 候选检查：A 的项目归属、源任务 done、P 文件清单含 F 均有证据，B 草稿属于 P 且上传数为 0，但候选为空并显示“暂无相关内容”。页面同时为 0/1 素材已分析，分析/索引就绪是否是额外条件尚未确认，不能把本轮定性为已查明根因的产品能力缺陷。B 首次提交才持久化，本轮未提交目标指令，没有 B conversation_id、目标 run 或 MP4；后续字幕与媒体断言未执行，FIXME 保留。

离线曾完成类型检查及 119 条通过（新增同项目隔离回归）；按用户随后要求，不在后续每次单条预发前重复整套离线。登录脚本已改为单窗口、工作台就绪才保存会话，人工恢复登录实测通过。最初控件、接口字段和登记接口适配尝试单独保留为夹具调试记录，不混入最终业务统计。

按用户“提交到云效中”要求，核对现有 **FWXC-247** 的项目/编号/标题后更新该工作项，保留历史描述、状态和附件；补充 1 张原始截图、1 份脱敏 JSON、1 份详细 Markdown，截图嵌入描述，**1/1 描述与附件回读通过，0 新建**。未上传登录态、原始 trace 或签名链接。

本机证据：`reports/mw21-same-project-20261103-190443/` 的 `html/index.html`、`junit.xml`、`audit/MW-21.json`、截图与 trace，以及 `yunxiao-plan.json`、`yunxiao-result.json`。

## Codex：2026-11-03 补传缺陷截图

2026-11-03 补齐截图：FWXC-244（MW-11）、FWXC-245（MW-12）、FWXC-246（MW-14）各 1 张，FWXC-247（MW-21）首次与服务端保存名复核各 1 张，共 **5 张原始实测截图**。已上传到原有四条缺陷并嵌入描述，附件 ID/文件名与描述回读均通过；未新增缺陷。加上此前说明文档和脱敏 JSON 共 13 份附件。MW-21 复核截图仅展示输入状态，不能单独证明候选为空，仍须结合审计证据。

证据：`reports/mw-failures-yunxiao-20261103/screenshot-plan.json` 保存来源与 SHA-256，`screenshot-result.json` 保存附件 ID 和描述引用验证结果；5 张截图与原始报告逐字节一致。截图中无凭据、预签名 URL 或个人邮箱；仅包含专用测试账号、测试会话与测试素材。此次只更新原工作项的附件与描述，未重跑计费任务，未改变 FIXME 或执行数量。项目 AGENTS 和 Codex 上下文已加入“同步缺陷必须上传对应截图”的维护约定。

## Codex：2026-11-03 未通过用例同步云效（不去重）

用户明确要求将本轮未通过场景同步云效，随后要求“本次无需去重”。本次未做云效缺陷搜索；只读取 cinlink-WEB 项目与字段元数据，直接新建 4 条，更新/重开均为 0；不代表历史不存在相似项。

| 用例 | 云效缺陷 | 本地详细记录 | 当前状态 |
|---|---|---|---|
| MW-11 | [FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc) | [CINLINK-MW11-001](defects/CINLINK-MW11-001.md) | 待修复回归 |
| MW-12 | [FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b) | [CINLINK-MW12-001](defects/CINLINK-MW12-001.md) | 待修复回归 |
| MW-14 | [FWXC-246](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=514a280c2861b2903950c6783d) | [CINLINK-MW14-001](defects/CINLINK-MW14-001.md) | 待修复回归 |
| MW-21 | [FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2) | [CINLINK-MW21-001](defects/CINLINK-MW21-001.md) | 前置阻塞，待定位 |

提交前 DryRun 为 4 create、0 update/reopen，审计校验通过；提交后 4/4 回读验证标题、完整描述、项目/类型、负责人/迭代/标签、优先级/严重程度，8 份脱敏附件均存在。证据保存在 `reports/mw-failures-yunxiao-20261103/` 的 `audit.json`、`create-plan.json`、`write-checkpoint.json`、`result.json`。

审计区分后端 failed（MW-14）、done 但交付不足（MW-11/12）和无目标提交的前置阻塞（MW-21）。MW-21 包含首次与按服务端保存名复核的源会话证据；没有把候选未命中认定为已确认的产品跨会话能力缺陷。未上传原始 trace、凭据或带签名链接，未重跑计费任务，未修改测试代码或启用数量。

## Codex：2026-11-03 恢复 MW-18 默认执行

基于下方严格复测的真实通过记录（218.691 秒、无补槽或计划确认），移除 MW-18 的 `fixme` 字段，保留视频与水印图双附件及原有断言。复合套件现为 **15 条：11 默认启用 + 4 FIXME**（MW-11/12/14/21）；多工作流合计 **20 条：15 默认启用 + 5 FIXME**；预发共 **46 条：36 默认启用 + 10 默认跳过**。

默认单条执行命令：

```powershell
npm run test:multi:compound -- --grep 'MW-18\b'
```

无需 `CINLINK_INCLUDE_BLOCKED=1`。已同步用例正文与登记表、工作流设计、README、AGENTS、Codex 上下文、测试进度和工作流矩阵；需求目录未新增用例。下方“保留五条 FIXME”是严格复测当时的历史状态。

验证：`npm run verify` 类型检查通过、**118 passed（4.9 秒）**；`npm run cases:check` **233 条，issues=0**；清除强制开关后，源码状态与 Playwright `--list` 确认 MW-18 默认启用，其他四条复合 FIXME 保留。证据在 `reports/mw18-default-enable-20261103/`。矩阵仅更新 4 个相关单元格，其他内容和格式保持原样。本次未额外创建预发任务；水印位置、透明度、字幕同步等内容层核验仍待补。

## Codex：2026-11-03 优化提示词严格复测 MW-11/12/14/18/21

会话探测通过；先通过类型检查与 118 条离线用例，再以 `workers=1`、`retries=0` 执行。严格模式不自动回答缺参补槽，仅允许明确的计划确认；每条保存服务端状态、产物名、源/目标会话引用证据、截图与完整 trace。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
$env:CINLINK_PROMPT_PROBE='1'
$env:CINLINK_AUDIT_DIR='<本次 reports 目录>/audit'
node node_modules/@playwright/test/cli.js test --project=staging tests/staging/g3-g7-multi-compound.spec.ts --grep 'MW-(11|12|14|18|21)\b' --workers=1 --retries=0 --trace=on
```

| 用例 | 结果与证据边界 | 补槽 / 计划确认 | 耗时 | 目标 run_id |
|---|---|---|---:|---|
| MW-11 | run done，但仅 `media-info.json`；未交付两份 SRT，断言失败 | 未观察到 / 无 | 190.608 秒 | `run_v2_7a94f4a082e44da7b84624ae997045ee` |
| MW-12 | 仅正常路径探测：中文字幕 + 英文字幕成片，缺少单独英文 SRT；未覆盖故障注入 | 未观察到 / 无 | 281.013 秒 | `run_v2_b35c25803af2438bb0971ee5dae1adb3` |
| MW-14 | 规划模型 60 秒超时，run failed，0 产物 | 未观察到 / 无 | 234.354 秒 | `run_v2_0b3376e0e8b44bccbe731e59c5fe66ca` |
| MW-18 | passed：视频与图片双附件引用后得到水印视频、中文字幕 SRT；内容层未验 | 未观察到 / 无 | 218.691 秒 | `run_v2_58df70a487e74fcb9775ac50aeec28fa` |
| MW-21 | 新会话素材引用前置失败，目标提示词未提交 | 尚未验证 | 93.461 秒 | 无目标 run；源会话登记成功 |

初始批次 **1 passed / 4 failed（17.3 分钟）**，业务分类为 1 通过、3 交付/执行未通过、1 前置阻塞。MW-21 发现服务端去重后的保存名与临时名不同，修正为服务端保存名后单独复核 **1 failed（93.384 秒）**；仍未命中新会话候选，目标指令没有提交。不能据此认定产品不支持跨会话，也不能认定优化指令不会补槽。

本轮保留五条默认 FIXME 标记，更新原因而不放宽断言。MW-18 夹具已补双附件；MW-21 源文件身份与会话已记录。已知运行任务结束后回读状态；本轮均已终态，无需再取消。

本机证据：`reports/mw11-12-14-18-21-20261103-174823/`：主报告 `html/index.html`、`junit.xml`、`run.log`、`summary.json`、`audit/`，以及 `test-results/` 截图/trace。MW-21 修正复核在子目录 `mw21-canonical-name-recheck/`。记录与原始 trace 均 gitignore。

## Codex：2026-11-03 恢复 MW-24/25/26 默认执行

基于下方 3 passed 的真实预发结果，移除三条用例的 `fixme` 字段。复合套件现为 **15 条：10 默认启用 + 5 FIXME**；多工作流合计 **20 条：14 默认启用 + 6 FIXME**；预发共 **46 条：35 默认启用 + 11 默认跳过**。

默认执行命令：

```powershell
npm run test:multi:compound -- --grep 'MW-(24|25|26)\b'
```

无需 `CINLINK_INCLUDE_BLOCKED=1`。启用状态检查和离线验证记录在 `reports/mw24-26-default-enable-20261103/`；本次修改不额外创建预发任务。下面的“未修改 FIXME”是当时强制复测的历史状态，已由本节后续启用动作更新。

后续补齐普通复合指令的参数、前置操作、执行步骤和业务预期，MW-13 单独保留参数冲突澄清。工作流用例位于 `docs/design-cases/multi-workflow/`，需求目录仅放正式需求。旧指令通过不等同新版完整指令已复测，此次只运行离线校验和用例发现。

验证：`npm run verify` 类型检查通过、118 passed（6.3 秒）；`npm run cases:check` 校验 233 条正式需求，issues=0；清除强制开关后，通过源码状态检查与 Playwright `--list` 确认 MW-24/25/26 均默认启用。多工作流用例与登记表按用户要求独立放在 `docs/design-cases/multi-workflow/`，不再放入 requirements。工作流矩阵同步 4 个相关单元格，其余内容与格式保持原样。

## Codex：2026-11-03 17:10–17:21 MW-24/25/26 复测

用户指定执行三条用例。迁入的会话已失效，首轮在登录页被拦，尚未提交工作流；停止该轮后，经人工登录保存新会话，再执行以下复测。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
node node_modules/@playwright/test/cli.js test --project=staging tests/staging/g3-g7-multi-compound.spec.ts --grep 'MW-(24|25|26)\b' --workers=1 --retries=0
```

| 用例 | 结果 | 耗时 | 本轮 run_id |
|---|---|---|---|
| MW-24 去口癖→中文字幕 | passed | 230.125 秒 | `run_v2_b1b56eb272ab4e20afeccf31505837b1` |
| MW-25 长变短→中文字幕 | passed | 231.181 秒 | `run_v2_08bd3e669626458a8c7738a7556baaef` |
| MW-26 文字水印→英文字幕 | passed | 182.280 秒 | `run_v2_549eafd4d7214aefa8181b81f0a2f73c` |

合计 **3 passed（10.8 分钟），退出码 0**，单 worker、零重试。本轮未复现 `Missing CinLink access token or API key.`；三条均通过现有产物数量和 video 类型断言。此次未新增画面内容或音画同步校验。

本次使用 `CINLINK_INCLUDE_BLOCKED=1` 强制执行，测试代码和默认 FIXME 标记未修改；云效提交/工作项状态未查询或更新。历史失败记录保留在下方。

本机证据（均 gitignore）：

- HTML：`reports/mw24-26-20261103-171012/html/index.html`
- JUnit：`reports/mw24-26-20261103-171012/junit.xml`
- 日志：`reports/mw24-26-20261103-171012/run.log`
- 结果摘要：`reports/mw24-26-20261103-171012/results.json`
- 首轮登录阻塞与登录恢复日志：`reports/mw24-26-20261103-170524/`

## 零之一、2026-11-03 提测构建复测

新构建提测后，重新登录并跑核心验收集（会话需重新登录，之前的状态已过期）：

| 命令 / 用例 | 结果 | 关键数据 |
|---|---|---|
| `npm run test:g1` | 4 passed（3.0 分钟） | 上传接口恢复；multipart 2 分片、S3 字节一致 |
| `npm run test:g3`（subtitle） | 1 passed（2.7 分钟） | 121.3s 收敛，15 条字幕，-31 分 |
| `npm run test:watermark` | 1 passed（2.1 分钟） | 39.9s 收敛，0 分 |
| `npm run test:flows -g translation` | 1 passed（2.5 分钟） | 101.9s 收敛，`subtitles.srt` 15 条，-31 分 |
| `npm run test:flows -g text-watermark` | 1 passed（1.6 分钟） | 50.2s 收敛，0 分 |
| `npm run test:flows -g enhance` | 1 passed（7.5 分钟） | 401.9s 收敛，0 分 |
| `npm run test:multi:base -g MW-04` | 1 passed（2.6 分钟） | 双素材混剪，0 分 |
| `npm run test:flows -g clean-cut` | 1 passed（3.0 分钟） | 充值后复测：计划确认（提取音频→转写→分析→渲染）后自动渲染，成片 59.05s，-31 分 |
| `npm run test:flows -g long-to-short` | 1 passed（4.1 分钟） | 计划确认后自动渲染，成片 19.07s，-11 分 |
| `npm run test:flows -g mix` | 1 passed（2.7 分钟） | 双素材混剪，成片 18.12s，-11 分 |
| `npm run test:g2` | 3 passed（30.8s） | 两条原 fixme 改为：会话内 job_id 唯一、提交最多 1 次计费请求；无按 Job 流水接口，已在用例注明证据边界 |
| `npm run test:multi:base -g "MW-05"` | failed（1.5m） | 取消端点 `/runtime-api/v2/agent/runs/{id}/cancel` 已验证可用（状态变 cancelled）；但同会话重提 done 且 0 产物，助手回复 “workflow’s required tool definitions were not supplied”，属产品问题，MW-05 保持 fixme |
| `npm run test:cards -g "Find Local Footage 模式"` | 1 passed（11.2s） | 零费用冒烟：卡片存在、面板有 Analyze、显示 media files analyzed |
| `npm run test:multi:compound -g "MW-09"` | 1 passed（7.8m） | 6 合 1：澄清水印类型→计划确认→1 个成片（watermarked-video.mp4） |
| `npm run test:multi:compound -g "MW-13"` | 1 passed（2.7m） | 澄清“确认最终时长”提交 30→生成计划→确认计划→1 个成片 |
| `npm run test:multi:compound -g "MW-20"` | 1 passed（2.9m） | 多素材歧义：自动选用第一个素材，1 个成片 |
| `npm run test:multi:compound -g "MW-14"` | failed（4.1m） | 产品规划超时：`TimeoutError: 规划模型等待响应超过 60 秒`，0 产物；保持 fixme |
| `npm run test:flows -g clean-cut` | 1 passed（2.5m） | 计划确认逻辑改动后的回归：requires_user_input → confirmation_approved → done，-31 分 |
| `npm run test:multi:compound -g "MW-23"` | 1 passed（3.1m） | 新增 P0 字幕链：中文→英文→烧录，1 个 video 产物 |
| `npm run test:multi:compound -g "MW-24/25/26"` | 3 failed（2.6/3.8/2.6m） | 产品报 `Missing CinLink access token or API key.`，run failed；三条 P0 暂标 fixme，待产品修复 |

本轮全部通过（含 clean-cut、long-to-short、mix 三条此前 blocked 的工作流）；flows 6 条全部启用。

## 零、2026-11-02 新版工作台适配与验证

预发前端切到 `/studio/workspace` 新版工作台后，旧锚点与上传/提交链路全部失效。本轮完成适配并实测：

| 命令 / 用例 | 结果 |
|---|---|
| `npm run verify` | 118 passed（含 2 条 `file_cloud_*` ID 契约） |
| `npm run test:g1` | 4 passed；multipart 2 分片、7,815,126 字节、S3 字节一致 |
| `npm run test:g3`（subtitle） | 1 passed；`run_v2_7b279…`，90.6 秒，`subtitles.srt` 15 条 |
| `npm run test:watermark` | 1 passed；`run_v2_e7edc…`，62.1 秒，1280x720/25fps |
| `npm run test:flows -g translation` | 1 passed；`translated.srt` 15 条 |
| `npm run test:flows -g text-watermark` | 1 passed；34.3 秒 |
| `npm run test:flows -g enhance` | 1 passed；389.4 秒，2560x1440 |
| `npm run test:multi -g "MW-04"`（有头） | 1 passed；2.5 分钟，MIX-001 修复复测 |

适配要点：

- 就绪锚点改为 `#workspace-prompt`；新建会话改为 `button[aria-label="New no-project session"]`；
- 附件改为先挂载（`.workspace-media-thumb`）、发送时才上传；G1 拆成“上传合同（API）+ UI 挂载”；
- 提交改为 `POST /runtime-api/v1/conversations/{id}/turns`，返回 `run_v2_*`；
- 状态与产物改为从 `GET /runtime-api/v1/conversations/{id}/messages` 按 `job_id` 读取；
- `result_files` 只有 `file_id` + `facts`，统一归一化并补预签名 URL；
- 澄清/确认态（`waiting_for_clarification` / `waiting_for_confirmation`）归一为 `requires_user_input`，不再空转到超时。

仍阻塞：clean-cut（预发已知问题，研发修复中）、long-to-short（确认菜单续跑未接稳）、MW-01/02 第二次发送、MW-05 取消接口。生成类与快捷卡片仍按旧版上传流程编写，待迁移。

多工作流转为 22 条：`test:multi`（MW-01~22）、`test:multi:base`（01~05）、`test:multi:compound`（06~22）；预发项目总数 50。

## 一、2026-10-19 迁移到 deepseek-cinlink

目标：把 `test-cinlink-web` 的测试框架整体迁移到本工程，并确认在 DeepSeek 中可直接使用。

| 命令 | 实测结果 |
|---|---|
| `npm ci --no-audit --no-fund` | 成功，6 个包，沿用来源工程的 `package-lock.json` |
| `npm run verify` | 类型检查 0 错误；离线 116 passed / 0 failed（约 3.6 s） |
| `npm run doctor` | 1 passed；修复 `ready` 判定后输出"✓ 已就绪"（会话文件可用，见下） |
| `npm run test:staging` | 两轮均为 5 passed / 2 skipped / 0 failed，各约 1.1 分钟 |
| `npm run test:g3` | 1 passed（1.7 分钟），真实 subtitle 任务，余额 -24 分 |
| `npm run test:watermark` | 首次 1 failed（澄清，composer 丢失指令文本）；修正后 1 passed（1.3 分钟），余额未变 |
| `CINLINK_HEADLESS=0` + `test:watermark` | 有头运行：首次 G7 误报孤儿任务；加 active 回落等待后 1 passed（1.3 分钟） |

### 文件一致性

对 `src/`、`tests/`、`tools/` 逐文件 SHA-256 比对：除 `src/assertions/artifact.ts`、`src/config.ts`、`src/workspace.ts` 三处修改外与来源完全一致。`tests/staging/g3-g7-subtitle.spec.ts`、`g3-g7-image-watermark.spec.ts` 是本工程新增文件（来源没有）。工程标识、`local.env`、`README.md`、`AGENTS.md`、`docs/deepseek-usage.md`、`package.json`、`package-lock.json` 为预期差异。

### 修复的框架缺陷

首次 `npm run verify` 为 115 passed / 1 failed：`G6 产物结构与参数 › 视频时长在容差内且有音轨和哈希时通过` 误报"产物音轨数为 0，期望至少 1"。

根因在 `src/assertions/artifact.ts` 的 `metaNumber`：`Number("") === 0`，缺失的 `audio_stream_count` 被当成 0，触发 `streams < 1` 失败；同一函数也会把缺失的 `duration_sec` 误报成"时长偏差"。

在来源工程 `E:\proj\test-cinlink-web` 用同一命令复现了同样的失败（退出码 1），因此这是框架既有缺陷，不是迁移环境问题。修复方式：空字符串返回 `NaN`，缺失字段走"未提供"分支而不是"为 0"分支。修复后 116 条全绿，未改动任何断言阈值。

### 修正的配置诊断

迁移后 `npm run doctor` 在会话文件存在、预发用例实际可跑的情况下仍报"✗ 尚未就绪"，原因是 `credentialStatus().ready` 要求"邮箱/API Key 且有 storageState"。浏览器用例实际只使用 storageState，邮箱/API Key 只用于重新登录，所以该判定会误导 Agent 去重新登录。

修复：`ready` 改为只看 `storageStatePresent`，缺失项提示相应调整。修复后 doctor 输出"✓ 已就绪"，与随后 5 条预发用例通过的事实一致。doctor 仍不能证明会话未过期（页面首屏探测才是权威），这一点保留在说明文字里。

### G1（真实预发）

- `cloud_file_id`：`file_d41797f7749f4e0d`。
- 上传名：`7MB-1792391360399.mp4`，源文件 7,815,126 字节，服务端回显大小与 MIME 一致。
- 5 MiB 分片，实际 2 个分片请求，`multipart=true`。
- @ 引用按本次 `cloud_file_id` 命中并插入。
- S3 预签名 URL HTTP 200，下载字节数与源文件一致。
- 三条上传用例均在 `finally` 中删除云文件，删除成功。

### G2（真实预发）

- 提交返回 `run_62601a316fd2d1d51edcbe82`，初始状态 `queued`。
- 只观察到 1 个创建请求；按 ID 可回读服务端 Run。
- 余额 11,795 → 11,795（分为单位，未变化；该事实不能证明预扣次数正确）。
- 任务在 `finally` 中取消成功。
- 未覆盖（fixme，报告显示 2 skipped）：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣流水次数。

### G3–G7（subtitle 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-subtitle.spec.ts`（`npm run test:g3`）：上传 7.8MB 素材 → `@` 引用 → 提交固定提示词「给这个视频生成中文字幕」→ 每 5 秒轮询状态 → 下载并校验产物 → 余额与 worker 池前后快照。

- `run_id`：`run_cb73662564836ef3e16e2120`。
- 状态时间线：`queued ×5 → waiting_for_local → running → waiting_for_local ×6 → done`，无状态倒退。
- 收敛耗时 72.6 秒（轮询上限 15 分钟）。
- 产物 9 个；交付三要素（id / name / url / cloud_file_id）齐全。
- `subtitle.srt` 1,360 字节、15 条字幕；序号连续、时间戳单调、无 U+FFFD。
- `subtitled-video.mp4` 可解码，60.49 秒（源 60.5 秒）、1 条音轨。
- 余额 11,795 → 11,771（-24 分）：真实计费已发生；**扣减次数**仍无法证明（见 G2/G7 待接入项）。
- 任务在 `finally` 中取消（已完成任务取消接口仍返回成功），素材删除成功。
- G6 只做结构层；字幕与语音是否同步属于内容层，按要求留人工复核，产物留在 `reports/artifacts/g3-g7-subtitle/`。
- 仍未覆盖：G6 内容层、G7 的预扣流水次数；其余主干的实测见下文「其余五条主干」。

### G3–G7（image-watermark 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-image-watermark.spec.ts`（`npm run test:watermark`）：上传 `7MB.mp4` 与水印图 `cinlink-smoke-watermark.png`，依次 `@` 引用两个素材，提交固定提示词「给这个视频添加图片水印，水印图片用我引用的这张图片」，轮询状态并校验产物。

- `run_id`：`run_6e0daf7653efa2cd0d94c191`。
- 状态时间线：`queued ×3 → waiting_for_local ×7 → done`，无状态倒退。
- 收敛耗时 53.3 秒（轮询上限 15 分钟）。
- 产物 1 个：`watermarked-video.mp4`，6,449,847 字节。
- ffprobe：60.49 秒（源 60.5 秒）、1280x720、25.00 fps、h264、1 条音轨。
- 余额 11,771 → 11,771（本次未扣减）。余额不变不能证明水印工作流不计费，只能记录事实。
- 水印是否真的叠加：自动断言只覆盖结构层，另抽帧 `reports/artifacts/g3-g7-image-watermark/frame-top-right.png` 人工确认——右上角可见半透明水印图片（四色方块 + CinLink 底纹），说明图片水印确实生效。
- 任务在 `finally` 中取消，两个素材删除成功。

#### 首次失败与修正

首次运行在 G4 失败：`终态为 requires_user_input，期望 done`。页面快照与请求体显示提交的 prompt 只有两段 `@` 引用，指令文本丢失，AI 因此反问「你想如何处理这段视频和这张图片？」。

根因：两个引用 chip 占满一行后，`editor.click()` + `End` 可能把光标落在 chip 上而不是文本末尾，`insertText` 被丢弃。修正分两处：

1. `src/workspace.ts` 的 `referenceAssetInPrompt` 增加 `{ clear: false }`，否则第二次调用会把第一个引用 `fill("")` 掉；
2. 用例中把选区显式折叠到编辑器内容末尾再插入指令，并在提交前断言 composer 文本包含指令——避免只提交引用而浪费一次真实任务。

修正后一次通过。该失败属于用例组装代码问题，不是产品缺陷。

#### 有头运行与 G7 抖动
有头模式（`CINLINK_HEADLESS=0`）可以直接跑同一条工作流，浏览器窗口可见。首次有头运行在 G7 失败：`任务结束后 active 增加了 1，疑似留下孤儿任务`。

原因有两层：

- 任务状态变成 `done` 后，worker 释放 `active` 有几秒延迟，立刻读 `/v1/health` 会看到 +1；
- `active` 是 Runtime 全局指标，共享预发上其他人的任务也会干扰（与 G2 的 `submitted` 同类问题，设计文档已声明这类全局指标只能作证据）。

修正：在 `src/workspace.ts` 新增 `waitForActiveDrain`，done 之后在 45 秒窗口内轮询 health，等 `active` 回落到提交前基线再判定；subtitle 与水印两条用例都改用它。有头重跑通过：`run_f027fe0ab00cf8f82fc42b8a`，时间线相同、53.3 秒收敛、产物 6,449,847 字节、余额未变。

有头与 headless 的断言、等待逻辑完全一致，差别只是浏览器是否可见。

### G3–G7（其余五条主干）

2026-10-19 新增 `tests/staging/g3-g7-workflows.spec.ts`（`npm run test:flows`），表驱动覆盖 translation / enhance / text-watermark / long-to-short / mix，每条都是真实任务。

| 工作流 | 结果 | 收敛 | 产物 | 余额 |
|---|---|---|---|---|
| translation | passed（`run_fa92ccc08a22ee5a20f9ab91`） | 29.7 s | 7 个；`subtitle.srt` 1,360 B / 15 条，结构合法 | -20 |
| enhance | passed（`run_94d1357dc97fa4a2a35a5e47`） | 382.0 s | 1 个；`enhanced-video.mp4` 60.50 s / 2560x1440 / 24.96 fps / 1 音轨 | 0 |
| text-watermark | passed（`run_030fc0949fb581accc14a72f`） | 41.5 s | 1 个；`watermarked-video.mp4` 60.49 s / 1280x720 / 25 fps / 1 音轨 | 0 |
| long-to-short | passed（`run_acfa5e9a863c808662878b30`） | 152.0 s | 6 个；`rendered-clips.mp4` 20.00 s / 1280x720 / 30 fps / 1 音轨 | -55 |
| mix | **blocked**（见下） | — | — | — |

#### long-to-short 的两阶段流程

首次运行停在 `requires_user_input`：产品先给出「第 1 版高光方案」，带 `auto_render_at`（1 分钟后自动渲染），确认后才出片。

这不能当成终态。修正：在 `src/workspace.ts` 新增 `pollRunUntilSettled`——遇到 `requires_user_input` 时检查 `clarifications[].metadata.auto_render_at`，有待自动渲染项就继续轮询，只有真正的澄清（没有该字段）才停下。修正后时间线为 `… running → requires_user_input ×8 → waiting_for_local ×3 → done`，52 秒自动续跑并出片。

#### mix 的产品缺陷（默认 fixme）

双素材混剪共尝试 7 次，均未跑通，归为产品缺陷而非用例问题：

| 现象 | 次数 | 证据 |
|---|---|---|
| `intent_recognition_invalid_output`（云端模型步骤 `__plan_agent_run__` 失败） | 3 | 首轮、第三轮、以及回答澄清后的续跑（prompt 只有 "4"） |
| 停在 max_clips 澄清（「最多用几个高光片段（2～10个）？」） | 2 | 属正常两阶段流程，用例已实现自动回答 |
| done 但 0 产物，助手回复「该请求目前没有可执行的 CinLink 工作流程」 | 2 | 原始提交与回答澄清后的续跑各一次 |

关键证据：回答澄清后，产品用**回答文本本身**作为续跑 Run 的 prompt（截图与 Run 详情都是 `prompt: 4`），原任务上下文没有带上，因此续跑被判成「没有可执行的工作流程」；即使回答改成「最多用 4 个高光片段」也一样。

用例保留在 `g3-g7-workflows.spec.ts` 中并标记 fixme（`CINLINK_INCLUDE_BLOCKED=1` 可强制运行），不通过放宽 G4/G5 断言来掩盖。该缺陷需要产品侧修复澄清续跑的上下文传递，完整复现、请求体证据与修复建议见 [defects/CINLINK-MIX-001.md](defects/CINLINK-MIX-001.md)。

### 证据位置

- 预发 HTML：`reports/staging-html/index.html`；JUnit：`reports/staging-junit.xml`；运行日志：`reports/staging-run.log`、`reports/staging-run-2.log`。
- G3–G7 运行日志：`reports/g3-g7-run.log`（subtitle）、`reports/g3-g7-watermark-run*.log`（水印）、`reports/flow-*.log`（五条主干）；产物：`reports/artifacts/g3-g7-subtitle/`、`reports/artifacts/g3-g7-image-watermark/`、`reports/artifacts/g3-g7-workflows/`。
- 有头运行日志：`reports/g3-g7-watermark-headed*.log`。
- 离线 HTML：`reports/html/index.html`；JUnit：`reports/junit.xml`。
- 修复前的失败 trace：`test-results/artifact-G6-产物结构与参数-视频时长在容差内且有音轨和哈希时通过-unit/`。

报告、trace、会话均只留本地（见 `.gitignore`）。G3–G7 的断言器均已接入；七条主干中六条有真实用例并通过，mix 被产品缺陷阻塞，不能据此宣称七个工作流已全部验收。

> 产物落盘路径已从 `test-results/` 改为 `reports/artifacts/`：前者每次 Playwright 运行都会被清空，首次六条工作流的产物因此被后续离线运行清掉；改到 `reports/` 后可跨运行保留。水印用例随后重跑一次（1.4 分钟）恢复了视频与抽帧证据。

## 二、2026-10-16 来源工程接入验证（历史）

目标：复用 `E:\proj\cinlink-web-tests` 的既有实现，在 `test-cinlink-web` 接入 G1/G2。

| 命令 | 实测结果 |
|---|---|
| `npm ci --ignore-scripts --no-audit --no-fund` | 成功，沿用原依赖锁文件 |
| `npm test` | 102 passed（当时代码库的用例数；本工程复制时该目录已有 116 条） |
| `npm run typecheck` | 成功，0 个类型错误，包含 tools |
| `npm run test:staging` | 5 passed / 2 skipped / 0 failed，约 1.2 分钟 |

### G1

- 源视频实际大小 7,815,126 字节。
- 本轮登记响应返回非空 `cloud_file_id`，名称、大小、MIME 均匹配。
- 按 5,242,880 字节分片，实际观察到 2 个分片请求。
- 上传后可通过 @ 候选按本次 `cloud_file_id` 选中素材并插入引用。
- S3 对象 HTTP 200，下载体大小与源视频一致。
- 本次三个上传用例的云文件均执行清理。

### G2

- 提交返回 `run_bdd5e20042ff61a1c7c2c8ec`，初始状态 `queued`。
- 观察到 1 个创建请求，响应成功，按 Run ID 可回读服务端对象。
- 取消接口返回成功；清理位于 finally，断言失败也执行。
- 本次余额前后相等。此事实不能证明预扣次数正确。
- 未覆盖：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣次数。这两项在用例中标为 fixme，运行报告显示 2 skipped。

### 调试与修正

账户直接读取起初返回 401，但浏览器通过产品自身的 refresh 请求成功恢复会话，因此未要求重新人工登录。

首次 G1 上传及云文件登记成功，但 @ 验收失败。trace 显示助手选择了第一个历史项目，后续项目素材登记返回 409：`project root name does not match the existing library`。
新增隔离回归先复现失败，再将入口改为 `[data-workspace-new-session="non-project"]`；修正后的回归和预发 G1 均通过。没有修改业务代码或历史项目配置。

另外两个回归检查分别验证：零字节/非法源文件大小不能通过分片校验；取消、SSE、GET、查询参数中的路径不能误计为创建 Run。

### 证据位置（历史工程）

`reports/staging-html/index.html`、`reports/staging-junit.xml`、`reports/staging-results/`、`reports/g1-initial-failure/`、`reports/offline-verification.log` 均在 `E:\proj\test-cinlink-web`。
