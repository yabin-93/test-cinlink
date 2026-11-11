# CinLink 项目上下文（Codex）

## 2026-11-10 LF18～35预发执行完成

按用户授权执行11条当前活动用例，7 Passed（LF18/20/21/30/31/32/34）/4 Failed（LF22/28/33/35），0阻塞。G56专用项目3a1225cf-106d-4b61-86e8-e98158a18507仅F5/F6，分析批次34a588ac-be06-460c-a579-3510da7b22fa、2/2就绪，预计2400积分非实际扣费。8个会话、12次正式查询+1次LF20有历史上下文额外探测；该初次点击未切会话的偏差保留，随后确认空会话执行32秒正式通过。LF18两原片下载哈希一致；LF32/33前置由用户完整观看两片并确认目标不存在。LF22/28不存在名称43秒终态仅承诺核对、无实际无匹配结论；LF33同框52秒误返两独立原片；LF35补选男子60秒新结果仍混女士、未明确完成选择。无并行/重分析/自动重试/生成/删除或云效写入，根因未确认。报告docs/design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md，证据reports/lf18-35-staging-20261110/。正文、统一入口、状态MD/JSON、自动化登记及素材准备说明已更新：全部28条已执行，15 Failed/13 Passed（各例限定范围）/0 Not Run；AUTO3/PLAN25不变，7退役编号排除。

## 2026-11-10 最新执行状态及新增测试素材同步

按用户要求核对并同步LF最新逐例状态：当前28条，LF01～17已执行，11 Failed/6 Passed（各例注明UI或客户端覆盖），新增11条Not Run；AUTO3/PLAN25。LF08/12/13采用优化版最新58秒/39秒/44与35秒结果，LF16客户端恢复、LF17听审后漏检均保留实际边界。正文末列明确为最新执行状态，统一入口分类索引修正旧17条/14PLAN描述；历史日志单列，不以旧源ID/时间缺失判业务失败。新增F5 7MB.mp4、F6 9s.mp4路径、规格、内容参照、哈希及关联用例在原正文登记并加入入口链接，本次再次核对原文件大小和SHA-256一致；仅本地准备，未创建G56或上传/分析/执行新用例。现有云效缺陷链接同步，无云端状态修改。

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

## 2026-11-10 LF-17准备完成，待人工听审

用户要求执行LF17。原F2哈希78001c5c4eeb24fbe3eb15f4e0510a95eea924af8a5458c71dde14ca6f445234已核验，提取原片0～20秒WAV供用户听审，不能ASR自证；用户问在哪里试听，已提供本机可点击链接并询问11～15秒目标原句确认，目前未收到确认。旧LF03预发项目d70f98ad-ab9f-4207-ba4c-e561944a459f当前0/4，不复用；新建LF17-F2-staging-20261110项目055b5131-5f11-4e5b-80c6-9d6a40ab3834仅F2、1/1分析就绪，批次b87faffb-c429-4e52-96ac-d01d03ba0f32复用缓存；预算1200非实际费用。确认分析时控制超时后回读已有就绪状态，无重复分析。正式LF17提示词尚未发送，仍Not Run，统计10 Failed/6 Passed/1 Not Run不变。证据reports/lf17-staging-20261110/。CUA已重置，当前lf17App/lf17FS/lf17Out有效；旧lf8App不存在。待原句确认后提交一次查询，并要求用户听审实际返回音频再定结论。

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

## 2026-11-09 005带背景原图复测R2

005/Agent已按用户纠正以11.png原始带背景历史项7cffcedd67bc40e0915021594dbb3ad7重新执行；实际画布有浅色背景及投影，非去背景图。正式蓝底请求1次，计费输入校验失败：Cannot verify editor generation inputs for billing; no task was started。无蓝底新版本，绿底未发送；原两项历史保持，无在途任务。与上一轮能力说明不同，不冒称同根因。用例前置/test-data及005新版分支报告已更新，旧报告保留。仍2 Passed/3 Failed/258 Not Run，费用未核、无云效写入。报告docs/cases/requirements/ERYE-237/results-005-original-prod-20261109-r2.md。

## 2026-11-09 分层版237的001～005生产执行

2026-11-09在生产有头执行分层版001～005主入口：001/UI、004/UI Passed；002/Agent、003/Agent、005/Agent Failed，2通过/3失败。002报Open the conversation page before opening its editor、停留第三张；003空计划未打开；005缺确定性蓝底合成解释且未执行，绿底依赖未发送。Agent3次均终态，零已受理重发、无准备生成/导出/云效写入，费用未核。新版其余258分支Not Run（139其他主入口）；旧整例历史不改。报告docs/cases/requirements/ERYE-237/results-001-005-layered-prod-20261109.md。

## 2026-11-09 ERYE237分层重整（当前版本）

已按用户授权直接重整旧144条用例：47 UI主入口、25 Agent主入口、72 Technical主入口；UI的47条Agent配对及72个业务编号的技术补充分开。新版版本2026-11-09-layered-execution，registry新增分支全部Not Run；旧execution_*明确历史，旧报告/缺陷不改、不继承通过。执行默认先主入口，完整验收需全部分支和参数。入口docs/cases/requirements/ERYE-237/execution-guide.md。本次仅文档，无生产执行或云效写入。

## 2026-11-09 正式014～032三组缺陷已同步云效

官方OpenAPI按用户三组分别直接新建：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)（014/018/032，Agent身份参数绑定/操作未执行）、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)（017/029，画笔引用误生成、内容丢失和缩图）、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)（030，圈外源红线误删）。未做去重，旧项修改0；共8份真实图片+3份evidence.json附件上传，8个正文图片引用及全部字段/附件回读通过。三组根因均保留未确认边界，029与FWXC-369现象关联但不冒称同根，030不把内部guide角色未核实升级根因。对应6条保持Failed，正式统计1 Passed/12 Failed/12 Blocked/119 Not Run，144 PLAN不变；本次无生产重跑。 本地记录docs/defects/erye237-agent-binding-prod-20261109.md、erye237-draw-submission-prod-20261109.md、erye237-edit-scope-prod-20261109.md。

## 2026-11-09 ERYE237-014～032正式执行

生产同会话39cdf63c-d593-4538-816a-5d1c29973e36，本批1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。014缺会话/源版本参数；018/032明确无法绑定身份、未执行；017仅本地改对象却受理生成；029源1254²→1024²且红线/文字丢失；030新增文字/圈内改蓝/不烘焙红圈可见，但误删圈外源底图红线。阻塞分别为未完成Agent配对、精确BG/内部对象/非法参数、工作头/费用/保留草稿前置，不假报全部通过；021实际RGB仍24/24/24，输入焦点未核实，不是产品颜色失败。普通Agent4次，图片提交3次均完成（a408be41cc4a41359a04b6d9eec3ac7d/e1fdc0f3f51d44c692efbd7b2c9ff72d/4ef8ea7c45a34e30ba55d9daf347f7f5），PNG下载2份，受理零重试、无准备生成/云效写入，费用未核。结束源V1/主工具栏、14项历史保留、无未发草稿或在途。registry/meta/cases/统一入口同步，正式累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍144 PLAN。报告docs/cases/requirements/ERYE-237/results-014-032-prod-20261109.md；证据reports/erye237-014-032-prod-20261109/。

## 2026-11-09 ERYE-237正式用例纳入两组UI实测优化

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

更新：2026-11-06，Asia/Shanghai。本文整理自迁入代码、最新验证记录和 DeepSeek 历史对话。历史对话是背景资料；当前任务以用户在 Codex 中的新指令为准。

## 2026-11-09 007入口与需求口径纠正

2026-11-09用户截图指出批注移除入口是批注浮层正文输入区域右上角垃圾桶（AX删除批注）。撤销007两轮Failed，改待确认：退格不是需求，“仅取消待发引用且保留批注”没有已确认依据，不能据未找到该入口报缺陷。更新007步骤使用用户指出入口，但本次仅修正文档，未点击验证删除后的点/正文/引用联动，不标Passed。专项最新7 Passed/1 Failed/1 Blocked/1待确认；009失败、010阻塞保持。

## 项目与当前目录

- 当前根目录：`C:\Users\chen\Documents\ChatGPT\cinlink`。
- 产品源码目录：用户于2026-11-04确认，后续需要核对CinLink实现时，到 `E:\proj\cinlink` 读取。当前包含 `cinlink-web-studio`、`cinlink-cloud-tool-executor`、`cinlink-media-hub` 三个仓库；按问题涉及的模块选择源码，引用结论时核对实际分支与提交。
- 来源：`E:\proj\deepseek-cinlink`，保留来源目录；更早来源为 `cinlink-web-tests` → `test-cinlink-web`。
- 用途：CinLink Web 自动化测试、G1–G7 工作流验收、设计/需求用例与缺陷证据管理；不是产品业务代码仓库。
- 技术：TypeScript ESM、Playwright、Node.js >= 20；媒体验证依赖 ffmpeg/ffprobe。
- 迁入包含源目录未提交修改。Git 基线为 `729d9622af4a02a6b318b20fff42d25991dcd498`；当前分支 `codex/deepseek-migration`。
- 长期执行规则见根目录 `AGENTS.md`；历史对话入口见 [会话索引](deepseek-context-index.md)。



## 已接受的需求与维护习惯

- 2026-11-09按用户指令独立会话复测IMG-ANN-UI-007，复用007项目，新会话59c0a2da-3354-4179-8e1b-3397a11c04ac。准备去背景1次并返回带背景V1；批注/正文/自定义名及待发引用均真实建立，空输入框退格及引用顶部检查仍不能单独移除引用，浮层仅删除批注/添加，007仍Failed；正式编辑发送0、未写云效，累计7 Passed/2 Failed/1 Blocked保持。报告docs/design-cases/img-ann-ui-007-results-20261109-r2.md，证据reports/img-ann-ui-007-20261109-r2/。

- 2026-11-09生产有头执行人像UI专项006～010：006重复添加仍单引用/单狗通过；007无仅移除引用入口、删除操作不生效Failed；008删白狗批注联动删除未发引用、仅生成红球通过；009已保存正文/自定义名重开丢失，实际粘贴输入复核仍丢失Failed；010适应窗口→200%→返回→批注编辑成功，但拖动/滚动/空格拖动未确认平移，整例Blocked。2 Passed/2 Failed/1 Blocked，本专项累计7 Passed/2 Failed/1 Blocked。准备处理5次、正式生成3次，费用未核。用户中途纠正可一个项目多会话，008～010复用007项目独立会话。报告docs/design-cases/img-ann-ui-006-010-results-20261109.md，证据reports/img-ann-ui-006-010-20261109/。未写云效，ERYE237正式统计保持。

- 2026-11-09执行006～010期间用户纠正：不需要每例新建项目，可在一个项目创建多个独立会话。此规则覆盖此前每例新项目偏好；独立图片基线与会话仍须核对。006/007已创建的项目保留，008～010将复用007项目的新会话。

- 2026-11-09按用户“同步更新测试用例”，已将IMG-ANN-UI-001～010正文统一为生成人像，001～005写入实测完整提示词、对象候选/自定义命名、全局说明发送核验及5 Passed；006～010保持Not Run。记录源1254²/输出1024²、005额外提交及费用未核边界，不再以纸船正文挂人像通过状态。入口docs/design-cases/17-image-annotation-ui.md。

- 2026-11-09使用用户生成的人像在生产有头新建5个IMG-ANN-UI-001～005专用项目，优先UI批注浮层执行，5 Passed（人像适配业务验收），006～010 Not Run。新增棕白狗、修改为白狗、T恤改蓝、移除狗、双批注左白狗右红球均真实生成并导出重开。准备去背景5次；完整编辑5次及005额外仅双批注成功编辑1次；005最终全局说明与两引用已确认发送。费用/内部事务未核，输出1024²而源1254²，不宣称像素尺寸保持。报告docs/design-cases/img-ann-ui-001-005-results-20261109.md，证据reports/img-ann-ui-20261109/。未写云效，不改变ERYE237正式144条统计及既有6 Failed。

- 2026-11-09用户要求优先使用批注内工具测试：点击批注、填写区域编辑提示词（例如添加小狗），先整理10条。已保存docs/design-cases/17-image-annotation-ui.md，全部Not Run，暂未执行；后续优先UI批注闭环，不用聊天创建批注替代此入口。

- 用户2026-11-09要求：执行测试前先新建专用项目并准备本例工程，不默认复用历史项目。
- 2026-11-09按用户要求先新建ERYE237-033-prod-20261109项目，再执行033。UI图内创建/灰区不新增符合预期；恢复空批注后Agent图内请求失败commands.0 invalid oneOf、缺session_id/source_version_id；图外请求21s拒绝负坐标。033仍Failed，6 Failed/138 Not Run。后续页面出现蓝船新增版本、已发送标注及画笔草稿，来源未确认，保留不清理，最终隔离验证有限；BG精度/独立双图片工程未覆盖。中间截图未落盘，仅最终截图/AX和提交JSON已核验，不冒充完整证据链。未写云效。报告docs/cases/requirements/ERYE-237/results-033-prod-20261109-r2.md。

- 2026-11-09执行ERYE237-033，生产有头复用已处理1024²纸船，图内Q创建1条批注/浮层，图外G不新增；清理自身UI批注恢复空基线后Agent合法Q失败base_revision invalid type/commands.0 invalid oneOf，实际0条；Agent图外x<0明确拒绝且无副作用。033 Failed（业务分支）；原BG1001×1000精度与独立双工程未覆盖，不冒充完整通过。最终标注关闭、无批注、历史两项保持；2次Agent请求零重试，未写云效。6 Failed/138 Not Run。完整报告docs/cases/requirements/ERYE-237/results-033-prod-20261109.md。

- 2026-11-06按用户“不去重”通过云效OpenAPI新建5条：[FWXC-358](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f1c9be96026403c5d311c5638f)（ERYE237-001）、[FWXC-359](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=270700d41580b5ed54616b0946)（ERYE237-002）、[FWXC-360](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9c6900f0ecb8225f5219b10b66)（ERYE237-003）、[FWXC-361](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=12425c9d5df84a7481b5772de9)（ERYE237-004）、[FWXC-362](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ecf3e918eb4784dbd653d967e8)（ERYE237-005）。旧项修改0，负责人/验证人牛诗晴，生产环境标签及🤔AI提缺陷状态。12张本批原始截图作为附件上传并以永久引用嵌入正文，正文/附件回读通过，重新下载SHA与原图一致。未重跑任务；5 Failed/139 Not Run保持。

- 2026-11-06用户提供Downloads/yunxiao并要求配置，随后授权打开内置浏览器登录及获取PAT。已新建cinlink-openapi-mac-20261106专用令牌（2027-02-04到期），仅项目协作相关权限，保存忽略的local.env并限制0600；不输出密钥，原令牌保留。导入tools/yunxiao并适配Mac curl/local.env，微软官方ARM64 PowerShell 7.6.9安装在用户目录、归档SHA256核对通过；入口run.sh。config.local.json从FWXC-357取生产环境/牛诗晴/重构10-29/中/3-一般，后续按批次覆盖。项目/字段/FWXC-357/2附件只读API核验HTTP200，22项离线检查通过；未创建或修改缺陷、未执行产品任务。下次同步继续OpenAPI、不去重、真实截图上传嵌入及回读；云效实际写入链路尚待下一次授权同步验证。记录reports/yunxiao/setup-20261106/及docs/verification.md。

- 2026-11-06按优化版在生产有头串行复测001～005：先UI各一次去背景补齐纸船/JPEG工程，刷新重开及批注可用，复用水彩生成图。001两Agent打开及002报Open the conversation page before opening its editor；003目标已确认工程但Agent缺上下文未打开；004 UI三版可看而Agent历史工具缺session_id/source_version_id；005蓝底首步计费输入校验失败，无V2所以绿底未发送。6次正式请求均终态、零重试；5 Failed/139 Not Run。账务/远端hash未核，准备任务2次单记。原始证据reports/erye237-001-005-prod-20261106-r2/，未写云效，PLAN保持。完整报告docs/cases/requirements/ERYE-237/results-001-005-prod-20261106-r2.md。

- 2026-11-06按用户授权优化ERYE-237全部144条，保留编号/优先级/来源；新版本2026-11-06-project-baseline，补B-IMG/B-MULTI/B-EMPTY/P-API、区分S0/P1/G1与V1，重写001～005并修正工具时机/样本矛盾。历史复核001生成图分支Failed保留，002目标JPEG未处理建工程改Blocked，003仍Blocked；1 Failed/2 Blocked/141 Not Run。未重跑或修改云效；部分脚本尚需适配新前置。

- 2026-11-06用户补充：上传图片需处理一次才创建图片工程，提示词生成图自动建工程。003只确认无打开文档，未确认11.png目标工程/版本已建立，撤销Failed改Blocked（目标前置不足）；2 Failed/1 Blocked/141 Not Run。后续先准备并核实真实工程及版本，再完整执行；不将本次未打开报产品缺陷，未新增处理或重发。

- 2026-11-06用户人工确认003无打开图片文档后继续正式目标一次、零重试；项目名称补槽字段误开文件框，取消后聊天补充ERYE237-001-prod-20261106。Agent仍称缺少真实目标绑定，未打开11.png，画布保持空白工程；后置查询26s完成但无实际身份回执。003由前置Blocked更新Failed；3 Failed/141 Not Run；未写云效。

- 2026-11-06用户指定后续云效同步使用OpenAPI，不打开页面；用户将在本机配置key。官方创建工作项接口使用个人访问令牌PAT（x-yunxiao-token）。本机local.env已准备ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN等配置位，组织与cinlink-WEB项目默认值由已确认页面信息填入；凭据不输出、不提交。后续同步在用户指令范围内直接API创建、上传截图并回读，继续不去重；接口受阻不自行改用浏览器，已创建FWXC-351/352/357不重复提交。尚未取得令牌或完成API连通性验证。

- 2026-11-06生成并执行003部分CUA脚本，独立生产会话128d917b-443d-484d-8c83-6d5df0c17a9b只读检查39s完成但无实际context回执，补充只读澄清21s明确无法确认文档绑定/ID/版本。空上下文前置未证明，003 Blocked；正式打开目标未发送、零重试。2 Failed/1 Blocked/141 Not Run。详见docs/cases/requirements/ERYE-237/results-003-prod-20261106.md；未写云效。

- 2026-11-06用户要求同步002缺陷，沿用“不做去重”新建[FWXC-357](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=94f54105c3405d30c9df57b56e)，旧项修改0；2张原始截图同时保存正文图片与附件区，正文显示/持久引用及2个附件文件名回读通过。本地docs/defects/CINLINK-ERYE237-002-001.md及reports/erye237-002-yunxiao-20261106/；未重跑任务，002 Failed和2 Failed/142 Not Run保持。

- 2026-11-06用户要求生成并执行002。已生成tools/erye237/erye237-002.cua.mjs并通过CUA执行核心步骤，独立会话三图固定顺序，第二张为用户群鸟JPEG，第三张停留基线；正式目标一次、零重试，Editor open缺session_id/conversation_id失败仍显示I3。回读三图单历史项保持；002 Failed、001 Failed，共2 Failed/142 Not Run。脚本为部分CUA自动化（PLAN），不是Playwright fixme执行；完整报告docs/cases/requirements/ERYE-237/results-002-prod-20261106.md。未新增生图或云效写入。

- 2026-11-06用户要求当前编辑页先验证工具，再明确直接点击、先不用对话。已完成UI工具冒烟与一次直接去背景，恢复查看原水彩版，导出前后SHA和像素一致；擦除仅mask预览，宽高比仅菜单。记录docs/cases/requirements/ERYE-237/tool-ui-smoke-20261106.md；不得据此把001～005整例记通过或关闭原Agent/卡片缺陷。

- 2026-11-06用户指定生产app.cinlink.ai复测ERYE237-001，已按正式导入图/真实生成图双入口执行，001 Failed；两次Agent打开均缺session_id/conversation_id，卡片进入blob原图页。已建立独立项目并生成1张水彩群鸟作为I2，完整报告docs/cases/requirements/ERYE-237/results-001-prod-20261106.md，证据仅本机reports/erye237-001-prod-20261106/；未自动重试，其余143条未执行。随后按用户“不做去重”新建FWXC-351/FWXC-352，旧项修改0；4张原始截图上传嵌入并回读显示通过，本地docs/defects/CINLINK-ERYE237-OPEN-001.md和CINLINK-ERYE237-CARD-001.md。历史“打开第二张图片”属于002，不能作为001结果；自动化fixme只是占位。

- 2026-11-05用户明确ERYE-196/206/210按页面业务或真实接口结果验收，不再根据需求中的接口设计验收。已逐条优化255条（134/67/54），保留编号/优先级/来源，去除拟定路由/字段/错误码/数据库/事件/锁及算法硬断言，改核对实际业务、刷新保存、文件/声音与独立基线；不等待内部契约/完整无关B0、不强制引用标签。统一口径docs/cases/editor-business-acceptance.md；前置/分析/联合页/入口及进度同步。001/003既有Passed、002/004本轮NA保持；005取消旧引用前置由Blocked改Not Run，未重跑，196现2 Passed/2 NA/130 Not Run，206/210共121 Not Run。原始报告截图保留，历史Blocked不可沿用。未新增业务/通过，未改云端代码/云效；真实业务缺失仍须记录，不能一律NA。

- 2026-11-05用户要求将001～004内‘需求中有、设计稿中没有’同步云效，已新建[FWXC-315](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9a1f2aebb4f446ec323afa0493)（CINLINK-DESIGN-ERYE196-004-001）：对象引用标签/时间范围/移除交互的需求与设计表达差异，待评审，不按页面实现回归定性。001实现细节、002接口分页不另报，003通过。2张原始Figma导出＋1张004版本9实测截图上传嵌入并回读通过，另附脱敏JSON共4附件；本地记录docs/defects/CINLINK-DESIGN-ERYE196-004-001.md。004继续NotApplicable，原目标提示词未发送；134条仍2 Passed/2 NA/1 Blocked/129 Not Run。无新增业务任务、产品源码或Figma修改。

- 2026-11-05用户明确“以最新设计稿为准，把004改为本轮不适用，并同步更新测试进度”。已将004改为Not Applicable，撤销原Blocked，不再将云效评论§03原对象引用标签/移除流程作为本轮页面阻塞或设计缺陷；未执行的引用后改文不计通过。原用例/来源、版本7和9两批截图及多选/反选观察保留，状态/报告/联合规则/进度同步。最新134条2 Passed/2 Not Applicable/1 Blocked/129 Not Run：001/003通过、002/004不适用、005受阻；其他状态不自动调整。没有新增执行或AI/云效/产品代码变更。


- 2026-11-05用户要求重启调试浏览器并重新执行004，已真实关闭原受控Chrome/启动新有头Chrome并恢复同工程，独立基线版本9。复测选择3项/反选音频剩2项正常，输入框无对象引用；@文件候选/时间尺定位不能替代对象及范围引用，原引用后改文未执行，按云效评论原流程仍Blocked，内容/148字幕/版本9保持。用户追问来源，已明确来自云效ERYE-196评论§03页面用户流程，最新Figma主页面未展示完整引用交互，不认定设计稿缺陷、不提缺陷。最新7张截图及底稿reports/erye196-004-rerun-20261105-after-restart/，报告docs/cases/requirements/ERYE-196/results-004-ui-20261105.md顶部；原7版本批次保留。总2 Passed/1 NA/2 Blocked/129 Not Run，005未执行，无AI/云效/产品源码变更。


- 2026-11-05 ERYE196-004按用户页面业务口径有头核验：当前工程版本7，视频/原声/字幕三项多选、反选原声剩两项可操作；输入框未形成编辑器对象引用，@仅文件候选、尺上拖动只定位播放头。004仍Blocked，原因是原§03引用/移除引用页面流程未完成，不是API字段/内部实现；原BGM及独立范围引用未完整执行，目标改文指令未发。内容/148条字幕及版本7保持，已恢复输入/选区/缩放；7张真实截图保存docs/cases/requirements/ERYE-196/results-004-ui-20261105.md及reports/erye196-004-ui-20261105-1947/。不据未展示交互直接定产品缺陷；001/003 Passed、002 NA、005状态保持，总2 Passed/1 NA/2 Blocked/129 Not Run；无AI/云效/产品源码修改。


- 2026-11-05用户明确执行003按页面业务结果验收、不验证实现；已将原条目改为跨标签页改文后的列表更新/刷新一致性并实测Passed。当前用户工程3bc78d71-8cf6-4caf-b347-a2f19962f471：B将solution.(6.64～7.12秒)暂改新版C2，A自动更新，刷新前后各148/148列表一致，只目标一条变、其余147及时间不变；B撤销后原文/完整内容恢复，版本5→6→7，测试B页已关闭。原游标接口未执行，不作为本次通过结论。10张真实截图及底稿reports/erye196-003-ui-20261105-1935/，正文docs/cases/requirements/ERYE-196/results-003-ui-20261105.md；最新2 Passed/1 Not Applicable/2 Blocked/129 Not Run，004～005未执行，无AI/云效/产品源码变更。


- 2026-11-05用户确认更正002状态：范围分页来自196评论§11接口约定，非最新设计稿页面交互，撤销“缺少UI入口”的Blocked判定；002为本轮页面验收Not Applicable，原接口专项未执行，原定义保留，不算分页通过。148/148字幕列表完整性等补充核验Passed、六张证据保留。当前1 Passed/1 Not Applicable/3 Blocked/129 Not Run；003～005不变。正文/registry/meta/统一入口/报告与进度均同步，无新增运行。后续不要沿用002旧页面阻塞结论。


- 2026-11-05 ERYE196-002当前用户工程版本5有头核验：4滚动窗口与完整字幕读取148/148逐ID/文字一致，0～10秒12条参考匹配，版本/content/updated_at不变；002仍Blocked，原因是范围分页功能无可执行入口，原pageSize=1/游标及三cue基线未执行，不是实现字段或服务端历史待确认。六张真实截图保存，详见docs/cases/requirements/ERYE-196/results-002-20261105.md；001 Passed保持，003～005未执行，总1 Passed/4 Blocked/129 Not Run。无工程内容写入、AI任务、云效写入或产品源码变更。


- 2026-11-05用户明确“开发怎么实现的具体可以不验证”；001按可观察业务结果验收，同批当前工程实测已满足，更新Passed。工程/选区/轨道匹配，视图及上下文正常，revision3/内容/可观察本地历史不变；字段等价映射和服务端历史实现不再作为001阻塞，不再追问这些实现确认。134条最新1 Passed/4 Blocked/129 Not Run；001人工执行无固定脚本（PLAN），002～005未重跑，其他用例不自动通过。用例正文/registry/进度/复测报告同步，原七张截图及证据保留，无新增业务任务。


- 2026-11-05 ERYE196-001再次按用户当前工程张雅婷(Tin)分享的视频.mp4（3bc78d71-8cf6-4caf-b347-a2f19962f471）实测：revision 3→3、内容/updated_at一致，本地历史past1/future0保持；实际MCP目录109项及工程/页面读取已成功，不能沿用“能力/上下文入口不存在”的旧判断。显式页面会话与UI变化同步；原timelineId/revisionToken等价映射、服务端历史证据尚待确认，001仍Blocked，其他用例未重跑。最新记录docs/cases/requirements/ERYE-196/results-001-rerun-20261105.md；七张原始截图及正式MCP响应保存本机，无AI/云效/产品代码变更。


- 2026-11-05 ERYE196-001～005按用户要求在本机有头Chrome核验：0整例通过/0确认产品失败/5 Blocked；001视图子项revision 4→4、内容一致、0保存请求。独立PA 95bac85e-de3f-43d1-adfa-7e1f1e87054c已绑定两条原文/译文，完整B0仍缺配音/BGM/水印/PB；实际为完整快照协议，旧能力/分页契约K未冻结，004/005未找到对象引用入口，目标指令未发送。其他129条未运行。详见docs/cases/requirements/ERYE-196/results-001-005-20261105.md及reports/erye196-001-005-headed-20261105/；先确认部署/等价接口与引用交互、补齐基线再续跑，不手动改文替代Agent或按缺失引用盲发“这条”。本轮无AI目标任务、云效写入或产品代码变更。


- 2026-11-05 用户要求按ERYE-237与指定Figma分析测试点、给详细用例，并明确“不保留旧用例”；已全量重写144条（P0 95/P1 48/P2 1），全部PLAN/Not Run、0脚本/0执行。正文docs/cases/requirements/ERYE-237/cases.md，analysis.md含新Figma D01～D12/A01～A24追踪、11项资料/语义边界，test-data.md含独立基线与故障前置。需求v1.1＋v1.2，最后修改2026-10-19 10:42:09，云效评论/附件0；新Figma SqGzwtxqNjFZa9QIvUPAlc/1816:50610，不把PRD旧链接节点或未读取的Figma评论当结论。用户确认批注最多10条，独立于会话生成图片20张；期限/字体回退/候选策略拟定门禁保留。旧16/06页清为导航，旧用例表和旧ID映射不保留；统一入口/registry/覆盖地图及状态同步。其他需求与MW/SSO不变，未改云端代码/云效/设计。

- 2026-11-05 用户要求分析ERYE-206/210正文与评论并关联196；已只读取得206四评论含旧图、210一评论与v1.1正文。用户补最新Figma SqGzwtxqNjFZa9QIvUPAlc/1501:27245并明确以最新已确认主页面为准，五入口Media/Scripts/Captions/Voiceover/Watermark覆盖旧六TAB导航；待定Properties/效果包装/剪辑偏好不纳本轮，v1.1拟定业务规则仍需评审。新增206 67条/210 54条，全部PLAN/Not Run；正文各自docs/cases/requirements/ERYE-206、ERYE-210/，含analysis/test-data；联合规则及复用docs/cases/editor-linked-196-206-210.md。196原134条保持，三需求255条，正式总488条；旧DC-05仅历史追溯。评论两字幕轨原文关译文开及11labs解析已覆盖，真实样本/操作表/字段/清理映射等门禁明确。未执行业务、未写云效、未改产品代码。

- 2026-11-05 用户授权分析ERYE-196《编辑器能力接入(web)》，并明确包含评论需求。已读取正文、唯一完整详版评论23563211（WFR01～20/WAC01～32）、0附件及引用的ERYE-206边界；编写134条正式需求用例，M1 121/M2 13，全部PLAN/Not Run；正文docs/cases/requirements/ERYE-196/cases.md，analysis.md含评论差异与覆盖、test-data.md含独立基线与故障前置。10项技术冻结问题单列；M2按阶段独立，不把M3路线当M1验收。统一入口/registry已关联，正式需求总367；未执行业务/未写云效/未改产品代码。历史MW/SSO结果不替代本需求验收。

- 2026-11-05 用户确认新增同步用例，已编写[SYNC-001～006](design-cases/multi-workflow/editing-dubbing-sync-cases.md)：6条P0、0 AUTO/6 PLAN，三类各2条（剪辑→配音字幕 / 配音字幕→剪辑 / 去口癖或拼接→配音字幕），全部未执行；每例两轮显式接P1，不依赖编辑页。统一入口、矩阵、设计状态与进度已同步；SSO仍22条，既有定义/脚本/结果保留。固定种子cinlink-sync-20261105-v1分层抽样，8个原始文件SHA复核一致，记录reports/editing-sync-design-20261105/selection.json。005需用受控口癖WAV及静态图制备视频并验证时序，当前未生成；日语源配音能力执行前核对。用户确认“先按可观察问题验收，暂不设毫秒阈值”；逐句/首尾/全部实际切点复核，无声画截断、字声漂移或已删内容回流。本轮未接脚本、未提交CinLink业务任务。

- 2026-11-05 素材盘点：26文件、15视频按SHA去重为14份；自动补充7MB为重复。周董歌曲.mov实际双音轨且HEVC Main10/HDR，首apac轨本机不可解码、次AAC可读；日文与英+中原画面已有字幕；x约2.68秒有画面切换；9s实际9.45秒。七语与中英混说已抽样确认，未逐句标注。受控口癖WAV有3处金标但无配套视频，两份测试SRT不是原视频转写金标。分析报告见reports/media-inventory-20261105/素材分类分析.md；不把歌曲/无音轨混作普通人声正例。

- 2026-11-05 SSO-020第2轮字幕首句“or a family”转写为“Our family”已提交[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c)，优先级中、严重程度3-一般。新建1、旧项更新/评论/重开0、失败0、验证1；1张本次真实成片失败帧上传并嵌入，另附2份SRT、2份音频核验样本和脱敏JSON，共6附件，正文/字段/附件及图片引用回读通过。全状态初查102条，写前复查，最终103条且当前键唯一；截图首次上传超时，经回读确认为未上传后恢复，未重复创建。测试结论保持4例20轮、3例通过/1例未通过，19轮通过/1轮未通过；SSO-019网络取证异常已补证，不提交产品缺陷。

- 2026-11-05 SSO-019～022：用户已授权新增4条五轮原片/产物穿插、不@，SSO总22 AUTO/0 PLAN；001～018的每轮F规则仅限原18条，定义/历史结果不变。本批执行结束，受理20/20，done 20/failed 0；指定检查19通过/1未通过/0依赖阻塞/0待复核；019/021/022通过，020 R2转写SRT及烧录首句Our family与原片or a family有偏差，20/20根输入匹配；019 R3网络取证错误已只读补齐，保留原JUnit。缺依赖不替代来源、不重发已受理任务。[执行记录](design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。正文same-session-source-artifact-cases.md，数据tests/sso/cases/source-artifact.ts，命令npm run test:sso:mixed。未改云端代码/云效。

- 2026-11-05 按用户指令“不用去重”，已新建并回读验证[FWXC-281](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=924be6ade88ed3f7bac77b4f7d)（SSO-010 R4）、[FWXC-282](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=8f4587beeafd93082783651e90)（SSO-014 R1）。共2张本轮原始失败PNG上传并嵌入正文，实际SRT与脱敏定位JSON各2份，共6附件；正文包含详细前置操作、登记/前置/触发完整提示词、复现步骤、实际与预期。新建2、已有项更新/评论/重开0、失败0、验证2，缺陷查询0。014第3轮用户人工审核通过，不提缺陷；本批仍28轮通过/2轮未通过/0待复核，整例4通过/2未通过。

- 2026-11-05 用户本次授权的SSO-015～017云效同步已完成：[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)合并9个计费预冻结失败run；[FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)单独记录017 R2重开及首次R3未受理的认证恢复/连续重试限流，未将重新登录后成功的R3 run标为失败。与FWXC-242执行链缺凭证边界不同，未强行合并或更改旧项。全状态初查97条、写前复查、最终100条中两个键均唯一；新建2、旧项更新/评论/重开0、失败0、验证2。11张本次原始PNG均上传并嵌入，另附2份脱敏定位JSON共13附件，正文/字段/附件/图片引用回读通过。脚本误提交、原片音频缓存时序误报及已补齐的ECONNRESET不提交产品缺陷。测试仍1通过/3未通过；底稿reports/sso015-017-yunxiao-20261105/，本次云效动作已结束，不作为未来批次授权。

- 2026-11-05 SSO-014第3轮由用户人工审核并回复“通过了”，已从待复核改为通过，原ASR同步疑点关闭；保留此前估计及原始音视频证据，不作为缺陷。SSO-009～014本批统计更新为28轮通过、2轮未通过、0轮待复核，整例仍4通过/2未通过；014第1轮日文多余字符、010第4轮法文混语结论保留。


- 2026-11-05 最新SSO-015～018执行结果：实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻；逐轮10轮指定检查通过、1轮原UI恢复受阻。18 AUTO/0 PLAN，001～014定义及既有结果不变。015/016早期字幕组合计费预冻结failed（translate missing_usage，工具未启动）保持原run；017 R2媒体/API下载恢复但关闭重开后UI播放/发送认证受阻，018最初登记Missing CinLink access token or API key，原截图保留。09:08用户人工重新登录，回读确认017 R3未受理后从R3续跑，再恢复018；已受理任务不重发，不因重新登录将017原保持登录态恢复判通过。目标任务均已确认终态，前置受阻轮不借其他会话产物/额外AI补齐。017自动化误发到其他S的一条run已取消并回读cancelled、排除目标20轮且原始审计保留；已补历史分页/虚拟行选择、恢复失败停止和非原CID拦截。登录窗口现支持CINLINK_AUTH_WAIT_MS=0持续等待、Try another way入口，实际登录成功后保存会话并关闭窗口；不再有待登录窗口。未改云端代码/云效。[本批记录](design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；底稿reports/sso015-018-five-rounds-20261105/。

- 2026-11-05 最新SSO-009～014实际状态：SSO-009～014各5轮已全部执行，共6例30轮；业务4例通过/2例未通过（28轮指定核验通过/2轮未通过/0轮待复核）。30/30轮原片F来源可追溯，未发现前轮视频/SRT/配音串用，历史文件哈希保持。SSO-010第4轮法文混入亚美尼亚文、SSO-014第1轮日文多余字符】【均由实际SRT及成片帧确认，失败截图已保存；014第3轮已由用户人工审核确认通过，原ASR同步疑点关闭，不作为缺陷或待复核项。009的401历史回读误报已正常刷新后只读补证，未重复生成。专项18条/14 AUTO/4 PLAN，015～018未执行；001～008既有结果保留，未修改云效。 [记录](design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)。

- 2026-11-04 用户新授权后，已将SSO-005第4轮法文字幕混入亚美尼亚文同步云效：[FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735)（本地`CINLINK-SUBTITLE-FR-001`）。全状态96条查重无重复，新建1、旧项更新/评论/重开0；2张真实PNG上传并嵌入，实际法文SRT＋脱敏定位JSON共4附件，正文/字段/附件和图片引用回读通过。优先级中、严重程度3-一般。007来源采样缺口及008的401续接已恢复，不另提产品缺陷；本批仍3例通过/1例未通过。底稿`reports/sso005-yunxiao-20261104/`。

- 2026-11-04 最新实测：按用户指令有头执行SSO-005～008各5轮，共20轮；4例20轮已执行，业务3例通过/1例未通过（19轮通过/1轮未通过）。005第4轮法文实际SRT及烧录视频混入亚美尼亚文，记录为业务失败；006五语配音及同语字幕完成独立ASR/画面抽查，007/008结论见[本批记录](design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)。脚本已覆盖001～008，专项18条/8 AUTO/10 PLAN；001～004既有14轮结果保持。原片F、无@正文、无统一前缀规则保持；不把Playwright结构通过等同完整内容通过。证据`reports/sso005-008-five-rounds-20261104/`，本地缺陷`CINLINK-SUBTITLE-FR-001`。

- 2026-11-04 用户已确认替换原SSO-015～018，分别为五轮完成后刷新、执行中刷新、关闭重开、查看历史后处理原片，共20轮。四例采用相同5轮组合（英文字幕＋REC-R1；20秒高光＋1440p；中文字幕＋REC-R3；完整英文字幕＋1440p；30秒高光＋英文字幕）对照恢复/交互方式；每例独立S、只登记一次F，逐轮不@、只发完整正文、不拼统一前缀。保存来源分支/当前交付/全部效果/历史哈希及触发前后证据，排除前轮视频/SRT/配音作为输入，允许本轮内部临时文件及有依据缓存。016必须受理且仍running时刷新，接回原任务，错过窗口记未覆盖，不重提凑覆盖；合法补槽/确认不计新业务轮。015/017每轮包括第5轮后均核验恢复，018查看历史不得带引用/继续加工。四条仍PLAN/未接脚本/未执行；001～014原条目保持，专项18条/5 AUTO/13 PLAN。此前009～014维护记录中“保留015～018”是当时范围，现以本次替换为准。

- 2026-11-04 用户已确认把原SSO-009～014替换为上一版六条五轮组合，共30轮；009不同组合交替，010组合字幕五语切换，011高光/完整原片组合交替，012组合扩增缩减，013连续及间隔重复恢复，014译制/原英语组合交替。每轮只发完整正文、不@、不拼统一前缀；各分支追溯同会话最初F，不串用前轮视频/SRT/配音，当前交付一个组合MP4，历史文件哈希不变。允许本轮内部中间产物/有来源依据的缓存，不以文件ID相同判串用。014译制组合本次已获设计授权，执行前核对日语/中文普通话/法语＋水印支持；不支持记录前置阻塞，不换语种。按用户要求本次只改文档，30轮均PLAN/未执行，未接脚本、不启动任务。001～008及015～018原条目保留，专项仍18条/5 AUTO/13 PLAN。

- 2026-11-04 用户最新修改SSO-005～008：每例5轮同工作流、共20轮业务对话。005为添加字幕（简体中文→日文→韩文→法文→西班牙文，烧录到F，保留原英语音轨）；006为翻译配音（中文普通话→日语→韩语→法语→西班牙语，替换原英语人声并烧录对应同语字幕，采用产品默认目标语音色、不验口型同步）；007为文字水印R1右上/R2左上/R3右下/R4左下/R5右上；008为高光20/30/15/25/20秒。各例固定同一会话和原片F，每轮不@、只发正文，不恢复已删除的统一提示词前缀。005～008均已接脚本并执行，专项18条/8 AUTO/10 PLAN；结论以上方最新实测为准。005字幕翻译/烧录、006语音及字幕译制均按用户指定的单一业务工作流计；006属于用户对原暂停范围的本次明确新增，只影响本例，执行前核对实际服务/5种目标语支持。001～004的定义、2/3/4/5轮穿插及已完成结果均不改变；旧005穿插定义及本次中间拟稿“005增强/006去口癖”已被替代。


- 2026-11-04 用户已手动删除统一提示词前缀，后续只发送各轮step.prompt正文；不得恢复或重新拼接该前缀。当前已发送任务保留实际文字和run，继续原任务，不伪写为新提示词执行记录。


- 2026-11-04 先前确认（005定义已被最新要求替代）：SSO-001～005轮次2/3/4/5/5（004“无轮”为“五轮”笔误），每例内不同工作流穿插，各轮不@、纯文本明确处理源视频。001～005已接脚本，006～018共13条PLAN；本轮按先前范围执行001～004共14轮，005仅设计/接入未执行。旧两轮版本结果不代表新版通过；实际执行中，底稿`reports/sso-interleaved-variable-rounds-20261104/`。


- 2026-11-04 用户最新确认：同一会话、单个原始视频SSO专项全部不@视频；每轮完整纯文本明确处理最初上传的源视频7MB.mp4，不使用先前成片/字幕，实际输入须核验F。已更新原18条及001～004脚本，4 AUTO已完成本次来源/流程/结构及指定抽样核验、14 PLAN未执行；旧@前置阻塞只保留历史。此规则限定SSO，不批量改动既有MW/CHAIN。


- 2026-11-04 本地素材查找P0共17条。用户最终限定执行LF-01～03，已接独立 `tests/local-footage/local-footage.spec.ts` / `playwright.footage.config.ts`，命令 `npm run test:footage`，有头单窗口、单worker、零重试，不并入默认预发/卡片套件。实测0通过/3未通过，其他14条PLAN。LF-01四原片4/4分析成功（含无音轨F3），机器人90～92秒正确，但混入105～107秒留声机及0～2秒飞机；LF-02/03为独立单素材项目，仅关联本轮真实F1/F2原片，均1/1分析就绪，却返回0～2秒缺仙人掌/蓝衣男孩。4原片云端回读SHA-256一致；3个真实查询任务均done、共3次turn提交，后续只回读相同run，播放/下载并用固定素材正负对照核验画面，未重复提交AI任务。原生目录首次由用户选取，分析续接现有请求；旧bootstrap/字段解析报错不作为产品失败。真实失败截图、JSON、trace和短片在 `reports/lf01-03-headed-20261104/checked/`，汇总根目录 `summary.json`；正文/执行记录从统一入口查找。当前预发走Agent的search_materials（segment/project），返回新短片，按facts.source_file_id/source_file_name/start_ms/end_ms追溯原片/位置，不能将新短片ID等同原片ID或强制旧专用检索接口。旧done＋0结果未复现，但旧workflow工具定义仍有降级提示，不标历史缺陷已验证修复；未修改云端代码或云效。Excel未同步专项，SSO停跑安排不变。

- 2026-11-04 按用户要求清理已移除的旧快捷入口：删除矩阵中的“字幕与翻译下的快捷卡片”整节、分类表3行、CS-07～09及旧前置/no-op规则；对应编号退役、不复用。工作簿同步清理“卡片清单”3项和“卡片用例”3条，总览相应更新为12项/22条，其他工作表与原样式保留。现有transcribe/translate及Find Local Footage功能入口保留，原7条卡片自动化脚本未变；历史验证/迁移记录不改写。

- 2026-11-04 用户要求补全AI生图的不同分辨率/比例用例，只要P0并放统一入口。已沿用IG-01～05、补IG-06～08，共8条P0，正文 `docs/design-cases/multi-workflow/ai-image-p0-cases.md`；入口 `docs/cases/README.md` 逐条列分辨率、比例与状态。覆盖1K/2K/4K，1:1/9:16/16:9/3:4/4:3，默认与同会话切换比例/分辨率。当前模型精确像素映射尚未登记，必须先取得生效规格，不能假定K档代表长边/短边，也不能用产物尺寸自证期望。默认IG-05仅有原脚本部分覆盖，其余7条未接脚本；本轮未执行生图，卡片脚本仍7条、AI生图仍1条。SSO的@缺陷停跑安排不变。

- 2026-11-04 最新安排：用户确认“@不出视频”已提缺陷、正在修复，要求先统一入口。全工程用例导航现为 `docs/cases/README.md`，汇集正式需求、工作流、SSO、卡片、链路、批注、离线校验的正文/脚本/命令/状态，保留原分类目录，不把专项混入requirements。历史SSO-001旧@调试在候选检查受阻、两轮目标指令未提交，002～004未执行。现用户已改为无@、纯文本明确处理源视频，001～004脚本已适配并执行，8轮来源核验通过，005～018未执行；旧@缺陷及调试仅保留历史，不重复提交或据此判新版阻塞。未修改云端代码。

- 2026-11-04 用户明确MW-01/02都一次提交全部要求。MW-01单条指令内先生成中文字幕SRT，再以上一步SRT翻译英文SRT，分别交付两份字幕；MW-02单条指令内处理同一原片，交付中文字幕SRT与2倍增强MP4。运行中只有停止按钮是正常交互；旧人工重叠发送MW-02的失败判定撤销，旧MW-01两轮续接也不能代替当前单次字幕链。两条新提示词均按实际英文源视频填写。

- 2026-11-04 补充：SSO中的“单工作流”按每轮指令判断，第一轮和第二轮明确处理源视频F时，工作流/提示词允许不同。已在原8条中调整为4条同工作流改参/重复、4条不同工作流切换（SSO-004字幕→剪短、006去口癖→字幕、007字幕→水印、008剪短→增强），两轮都指向原片F；编号及专项总数18不变，全部仍未执行。

- 2026-11-04 同会话单原片专项：用户最后明确“多工作流对原片处理，不是分别处理”。按**每轮以同一原片F为输入，多工作流组合处理，最终成片包含本轮全部效果；下一轮仍从F开始**编写，不能理解为多个工作流各输出一份单效果视频。用户最新调整：本专项18条均不@，每轮用完整纯文本明确处理本会话最初上传的源视频7MB.mp4，不使用先前产物；通过实际计划/工具输入核验F。只有未指定来源的“继续处理这个视频”沿用既有产物续加工口径。详见 `docs/design-cases/multi-workflow/same-session-original-cases.md`，SSO-001～018共18条设计；现001～004已适配无@脚本并执行，8轮来源/流程/结构及指定抽样核验通过，其余14条PLAN未执行。7MB.mp4实际为英文语音，新提示词已按英文源填写；SSO-006口癖前置需预听核实。既有WF/MW/CTX/CHAIN只引用映射，不将旧通过记录迁移为SSO通过。Excel尚未收录此专项，原脚本及真实执行计数不变。

- 使用中文，给出可核验的结果、失败原因和证据位置；离线通过、真实链路通过、跳过/未覆盖分别报告。
- 云效缺陷采用用户给定模板，顺序固定为 **现象 → 前置步骤 → 提示词 → 复现步骤 → 实际结果 → 预期结果 → 影响 → 补充 → 失败截图**；各标签单独加粗，末尾直接嵌入对应原始截图。用户最新要求去掉“排查信息”一节，后续不再添加；MW-15/FWXC-249 已从云效正文和本地报告移除并回读通过。“前置步骤”单列账号/会话范围、素材上传和引用、必要登记等准备；“提示词”单列可复制的完整指令，有准备/目标指令时分别标明，未执行的目标指令须注明。实际结果保留已知 run_id、会话 ID、状态及关键错误原文。删除重复历史、提交流水、脚本调试过程和无关说明；影响结论的未验证条件放“补充”，不把推测写成根因。
- 用户最新要求：单条预发复测不要每次重复整套离线校验；按改动影响做必要定向检查，并复用已通过的校验结果。人工登录复用一个窗口，必须等工作台就绪才保存登录态。
- 用户要求：同步云效缺陷时必须上传对应失败截图，并在描述中嵌入、回读验证；日志/JSON 不能替代截图。本轮 FWXC-244/245/246 各补 1 张，FWXC-247 补 2 张，共 5 张；均已验证附件和图片引用。
- 更新已有用例时完善原条目，避免复制相同场景；前置条件、操作步骤、预期结果必须具体，包含参数和可观察的断言。
- 需求用例按 `docs/cases/requirements/<REQ>/` 组织，九列固定为 ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示；ID 保持稳定。
- `requirements/` 仅放正式需求用例；多工作流专项用例与状态映射放在 `docs/design-cases/multi-workflow/`。
- 普通执行用例预先写全素材、顺序、语言、时长、倍率、水印及交付物，减少补槽，并明确前置操作、步骤与具体预期。MW-13 专测参数冲突澄清，作为例外；执行计划确认不等同缺参补槽。
- 最新执行要求：遇补槽要填写并继续跑通流程，记录问题、答案、确认与截图；仅用户明确要求“无补槽严格探测”时才在澄清处停止。MW-20 的素材歧义也要明确选择具体视频后继续。
- 用户明确：`requirements/` 只放正式需求用例。MW 工作流用例与状态映射位于 `docs/design-cases/multi-workflow/`，不混入需求目录和需求登记表。
- 设计与 PRD 冲突时，此工程历史上采用设计稿优先，保留来源与待确认项。新任务出现冲突时明确指出。
- 当前默认套件仍优先单视频、多工作流；用户现明确指定执行 MW-15/16/17/19/20/22，已恢复为独立按需多素材专项（`npm run test:multi:materials`），不自动并入默认20条/预发46条。基础多工作流保留一种 M3·S1 路径（上传后 @ 引用 + 提示词）。
- 用户明确 MW-21 是**同一项目 P 内会话 A/B 复用原始素材**，不测试两个非项目会话；使用 `E:\图片视频素材\talecast测试素材\不同的内容\单音频轨道` 的素材，本例选 `7MB.mp4`。同项目夹具已接入；A 上传后通过项目文件接口关联并回读相同 F，B 不重新上传。最新实测在 B 的 @ 候选检查失败，页面 0/1 素材已分析，额外就绪条件待定位，目标字幕未提交；按用户要求已更新原云效 FWXC-247，补 3 份附件及嵌图并回读通过；非项目会话历史结果不代替本场景证据。详细准备见多工作流用例的 MW-21 专节。
- 翻译配音曾因编辑页未完成而撤回；用户已明确在SSO-006加入5轮目标语配音及对应字幕，并于本次确认在SSO-014加入译制/原英语＋水印组合交替设计；其余既有入口不批量恢复，部署及组合能力待执行前核对。本次未执行。
- 生成解说目前标注功能暂不可用；不要把 FIXME 当作通过。
- 工作流提示词写清动作、交付物、参数，历史上要求去掉“不要询问参数”等规避产品澄清的措辞。

## 两套用例资料

| 资料 | 维护方式 |
|---|---|
| `docs/design-cases/14-workflow-material-paths.md` | 工作流 × 素材 × 发送方式、卡片、上下文与链路设计 |
| `docs/design-cases/15-automation-registry.md` | 脚本映射、自动化状态与执行层级 |
| `docs/design-cases/workflow-material-matrix.xlsx` | 上述工作流资料的同步汇总；现有构建脚本不自动生成此表 |
| `docs/cases/requirements/*/cases.md` | 需求用例正文，需求独立目录 |
| `reports/design-cases.xlsx` | `python tools/design-cases/build-xlsx.py` 从设计/需求 Markdown 生成，先执行用例质量校验 |

设计稿 03 专业编辑器已并入 ERYE-199，06 图片编辑已并入 ERYE-237；旧文件保留映射以追溯，生成时避免重复计数。ERYE-160 为计费需求。编辑需求用例后运行 `npm run cases:check`。矩阵改为自动生成只是历史建议，尚未作为本次迁移任务实施。

## 最新实际状态

2026-11-05 SSO-009～014各5轮已全部执行，共6例30轮；业务4例通过/2例未通过（28轮指定核验通过/2轮未通过/0轮待复核）。30/30轮原片F来源可追溯，未发现前轮视频/SRT/配音串用，历史文件哈希保持。SSO-010第4轮法文混入亚美尼亚文、SSO-014第1轮日文多余字符】【均由实际SRT及成片帧确认，失败截图已保存；014第3轮已由用户人工审核确认通过，原ASR同步疑点关闭，不作为缺陷或待复核项。009的401历史回读误报已正常刷新后只读补证，未重复生成。专项18条/14 AUTO/4 PLAN，015～018未执行；001～008既有结果保留，未修改云效。 [记录](design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)。

2026-11-04 SSO-009已完成5轮来源/媒体/内容抽样及历史哈希核验；SSO-010五轮已完成，业务第4轮法文混入亚美尼亚文，其他4轮完成指定核验，整例未通过。当前SSO-011运行中，012～014尚未开始；按原任务继续串行执行，015～018不执行。

2026-11-04 SSO-010第4轮法文组合业务未通过：实际译文SRT第8条32.96～39.16秒含亚美尼亚文սիր，36.06秒原始成片帧确认烧录同样异常。首中末三帧未覆盖该条，已用实际全文检查发现并补原始失败帧；水印C2-FR、原片来源/原英语音轨/结构正常，未发现前三轮产物串用输入。此为本批实际复现的字幕内容问题，与既有FWXC-278同类，未同步或修改云效。继续第5轮，011～014待执行，不因单轮内容失败重发任务。底稿reports/sso009-014-five-rounds-20261104/failure-details.json。

2026-11-04 SSO-009五轮已完成指定范围核验：5轮来源F、5份MP4结构及15帧字幕/水印/残留抽样通过，6份内部SRT结构/语言特征及语义抽样无异常。R5历史回读原断言失败前实际为HTTP401，已按产品正常cookie刷新恢复为200，原5份交付归属与首次SHA-256逐一一致，未重复生成；保留原失败JUnit/trace及真实截图，不作为历史产物丢失缺陷。当前开始010五语字幕＋水印；011～014待执行，015～018不执行。本批尚未全部完成。

2026-11-04 用户回复“继续”后已核对原检查点：中断时SSO-009第3轮事实上已done并下载，现已补做首中末画面及音轨/结构复核，前三轮均完成指定抽样。第3轮60.488005秒、1280×720、简体中文字幕＋左上C1-R3，未继承第2轮28.97秒/1440p或第1轮字幕水印。先接原S及原run，只从第4轮续跑009，之后再串行执行010～014；不重提前三轮，015～018不执行。本批尚未全部完成，原401/窗口检查中断记录保留历史，不作为工作流产品失败。

2026-11-04 SSO-009～014本批执行因会话回读持续401中断：SSO-009前3轮已完成来源/媒体检查及首中末画面抽样，第3轮已受理（原run保留），终态尚未核实；第4～5轮及010～014尚未执行。第2轮1次计划确认、当前无缺参补槽。Windows窗口检查被自动安全检查终止，理由是无法可靠识别当前浏览器URL，未绕过。已停止本地执行器，不调用后端取消或重复提交；须恢复测试登录态后接原会话/run继续。此次登录中断未取得失败现场PNG，已有逐轮提交/终态截图、原始帧和trace记录保留，不能用提交前截图冒充失败现场。底稿reports/sso009-014-five-rounds-20261104/，本批仍未完成，不计六条通过；14 AUTO只表示接入，015～018仍4 PLAN。

2026-11-04 SSO-009～014执行中：已接入文档原文6例30轮，专用有头串行、workers1/retries0；遇补槽填写继续，逐轮核验F来源、组合结果、历史文件，并保存失败截图。14 AUTO仅表示脚本接入；015～018仍4 PLAN，本批业务通过数待完整来源/内容复核，不迁移旧结果。脚本变更后类型检查＋123条离线通过。底稿reports/sso009-014-five-rounds-20261104/。

2026-11-04 SSO-015～018已按用户确认在原编号替换为每例5轮，共20轮；四类分别为完成后刷新、执行中刷新、关闭重开、查看历史后处理原片。四例使用同一组5轮组合要求对照恢复/交互方式，每例独立S、只登记一个F；每轮核验来源分支、本轮全部效果、当前交付及历史文件哈希，排除前轮成片/SRT/配音作为输入。正文20段完整指令及R前置/逐轮预期、导航和相关状态文档已同步；016实际运行中刷新才算触发，错过记未覆盖；本次不接脚本、不执行20轮。001～014原条目及001～004既有14轮通过范围保持，专项仍5 AUTO/13 PLAN；005～018未执行，不增加真实通过数。

2026-11-04 SSO-009～014已按用户确认在原编号替换为每例5轮多工作流组合，共30轮；每轮处理同一会话最初登记的原片F，排除前轮视频/SRT/配音，所有效果集中在一个最终MP4。5轮逐轮保存来源分支、当前交付、内容/音轨/语言及历史哈希证据，缺证据不得判通过。正文30段提示词及前置/预期、用例入口、矩阵说明、自动化登记、进度及验证记录已同步；仍6条PLAN/未执行，不增加通过数或脚本数。014配音组合按本次确认写入设计，能力待执行前核对。本次未启动真实任务或修改001～008、015～018条目；001～004既有14轮通过范围保持原样，005及006～018未执行。

2026-11-04 SSO-001～004新版14轮已完成，来源/流程/产物结构及指定抽样核验4通过、0当前阻塞；0补槽、3次计划确认。删除前已发4轮保留真实旧提示词，后续10轮仅发送正文。SSO-005及其他未执行用例不计通过。001/002/003/004分别2/3/4/5轮，9视频＋5SRT交付对应与下载核验通过；9视频首中末27帧未见历史新增效果残留，历史文件哈希不变。4登记run＋14业务run，没有重复AI提交。导航/会话及只读下载连接中断已接原run恢复；阶段原始失败证据保留，不标作工作流产品缺陷。脚本只读GET对ECONNRESET最多2次网络重试，workers1/retries0不变；123条离线＋类型检查通过。005～008最新五轮同工作流定义保持原样，均未执行；专项5 AUTO/13 PLAN。字幕逐字、高光语义、全片质量和费用未完整验收。详见[本次执行记录](design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)及`reports/sso-interleaved-variable-rounds-20261104/summary.json`。下方同日“执行中”文字是已结束阶段的原始记录。

SSO执行中用户移除统一前缀，脚本已改为直接使用step.prompt，后续新提交不加前缀。已发的SSO-001两轮及SSO-002前两轮保留真实原提示词；已接回SSO-002原增强run，未重提。后续批次在`reports/sso-interleaved-variable-rounds-20261104/without-prefix/`，不能把这些已发任务声称为无前缀新提示词验证。


当前SSO已按用户最终2/3/4/5/5轮、不同工作流穿插改版；001～004新版14轮执行中，005未执行，旧两轮结果仅作历史。详见测试进度最新章节及`reports/sso-interleaved-variable-rounds-20261104/`。


2026-11-04 SSO-001～004无@实测完成：4例8轮来源/流程/结构及指定抽样核验通过，0补槽、3计划确认，运行中输入证据均指向原F，未使用上一轮交付物。001高光19.066341/29.077秒；002旧/新水印均60.488005秒、首中末帧无旧水印残留；003中/日SRT各15条；004英文SRT15条→19.866341秒高光，无新增字幕残留。首批JUnit3通过/1失败是002终态来源字段被输出替换导致脚本误判；已保存运行中输入快照、接原run回读第一轮并仅补第二轮，续接1通过，无重复生成。2张原始失败PNG及trace保留，123条离线＋类型检查通过。正文`docs/design-cases/multi-workflow/same-session-original-results-20261104.md`，底稿`reports/sso001-004-plain-source-20261104/`及summary.json。005～018仍14条PLAN；字幕逐字/全片质量及费用未完整验收，未改产品源码或云效。


2026-11-04 本地素材查找LF-01～03缺陷已同步云效：[FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a)（机器人结果混入无关片段）、[FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16)（LF-02/03返回0～2秒缺目标）。新建2、旧项更新/评论/重开0，3张原始失败PNG上传并嵌入，2份脱敏JSON，字段/正文/附件全部回读通过；查重初始92条、每次写入前重新全量核对。旧FWXC-237未改，LF-01～03仍0通过/3未通过，其余14条未执行；没有新增CinLink任务或修改云端代码。底稿`reports/lf01-03-yunxiao-20261104/`。


2026-11-04 SSO-001～018已改为无@、纯文本明确处理本会话最初上传的源视频；001～004脚本已适配。新版18条均待执行，旧@阻塞不作新版结论。类型检查＋123条离线通过，SSO表格/提示词一致性和90个链接校验通过；只列出4条脚本定义，未执行预发任务。详见`docs/testing-progress.md`最新SSO条目。


2026-11-04 MW-01当前单次字幕链缺陷已同步云效[FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)：缺英文SRT，`intent_fully_satisfied=false`但`done/Completed`。新建1、旧项更新0；2张原始PNG上传并嵌入、脱敏JSON及字段/正文/附件全部回读通过。没有重跑CinLink；旧两轮或Stop判定不作为缺陷依据；MW-01仍待修复、MW-02仍通过，总数14通过证据/9未通过/3前置阻塞不变。底稿`reports/mw01-yunxiao-20261104/`。


2026-11-04 已将MW-01/02都改为一条完整提示词一次提交并完成补跑：**MW-01未通过、MW-02通过，均0补槽/0计划确认**。MW-01 run done但只交付中文SRT，缺英文SRT（196.973秒）；页面明示只先安排中文SRT、英文仍待后续规划，没有自动完成要求的字幕链。新失败是交付不完整，与旧错误的“Stop”判定不同。报告`reports/mw01-single-prompt-20261104/`含本次原始失败PNG、trace及中文SRT。

MW-02单次字幕+增强通过（658.485秒）：SRT与增强MP4均下载，中文字幕15条、结束60.46秒；ffprobe为2560×1440、60.495778秒、1条音轨。报告`reports/mw02-single-prompt-20261104/`。合并结果`reports/mw01-mw02-single-prompt-20261104/summary.json`。两个任务分别串行、单worker零重试，执行脚本快照及哈希保留；类型检查通过，未重复全套离线或向云效写入。逐字翻译质量未完整验收。

12:30初批MW-01是旧两轮续接场景（182.022秒、原始JUnit passed），已被用户要求的单次字幕链替代，不计当前MW-01通过。旧MW-02人工重叠发送也不适用，其产品失败判定已撤销。两条原始JUnit/截图/trace保留，合并摘要已标注纠正和各自替代报告。

初批报告`reports/mw01-02-20261104/`原始JUnit/审计不改写，业务摘要中两条均标记旧执行方式不适用。新提示词均按实际英文源填写。最新MW账本14有通过证据/9未通过/3前置阻塞/0待复测；失败中MW-01替换原错误MW-02，默认配置不变。SSO专项状态以独立执行与阻塞记录为准，不由本次MW结果替代。

2026-11-04 已将MW-06、MW-10同步云效：[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)、[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)。新建2、旧项更新0，4张原始PNG上传并嵌入，另附2份脱敏JSON，字段/正文/附件全部回读通过。两条仍未通过，测试统计8通过/2未通过和默认配置不变；本次未新增CinLink任务。同步底稿`reports/mw06-mw10-yunxiao-20261104/`。


2026-11-04 十条补跑已完成：MW-03/07/08/09/23/24/25/26共8条流程/产物检查通过；MW-06缺单独英文SRT、MW-10在高光Extract audio报`'NoneType' object has no attribute 'source_duration_sec'`且0产物，共2条未通过；0阻塞、0未运行。本批0次补槽、8次计划确认。MW-06为前一日已提交原run的读回结果，无重复提交；续跑9条JUnit为8 passed/1 failed，09:40–10:43，auth 1 passed。失败PNG/trace、所有审计和合并`summary.json`保存在 `reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`，续跑输出在`remaining-after-auth/`。旧MW-07 Unauthorized和两次工具中断资料保留，不作为本轮产品失败。执行阶段未新增FIXME；后续两条缺陷云效同步见上文。

边界：仅任务终态与产物数量/类型通过，未做完整内容验收。两份源视频SHA-256已与MW-16独立ASR证据匹配，实际均英文语音，现有提示词仍描述中文语音；本批不证明严格中文源语音前置满足，需匹配素材补测。十条批次结束时账本为13条有通过证据、8条明确失败、3条前置阻塞、2条旧异常待复核；原10条缺复测证据清单已清空。其后MW-01/02已完成上述复核，最新总数见本节首段及`docs/testing-progress.md`。

本次补槽/续跑/恢复绑定改动已做类型检查及3条定向单测，通过；离线当前可发现123条，未重复全量校验。

以下来自 `docs/verification.md` 的 2026-11-03 记录，属于来源工程实测；本次迁移验证单独记录在 [迁移记录](codex-migration.md)。旧摘要中的“预发全坏”“mix 仍阻塞”“G2 两条 fixme”均已过期。

- MW-15/16/17/19/20/22 专项更新：2流程/结构通过、2未通过、2前置阻塞、0待核验。MW-16已用原片与独立离线ASR交叉核验：A英文对应A，B日文也对应A，确认B串用A，非两份互换；B后60.46秒仍有语音但无对应字幕。原文件级JUnit passed保留，业务内容层failed，FIXME保留。证据见 `docs/defects/CINLINK-MW16-001.md` 和 `reports/mw16-content-verification-20261103/`。MW-20补槽后done，MW-17/22阻塞未变，核验阶段未增加CinLink任务；后续已同步云效FWXC-250并回读通过。
- 离线可发现123条（新增补槽参数填写、原run恢复绑定回归）；本次类型检查与3条定向单测通过；前序离线基线119条通过，当前123条未全量重跑。
- 历史离线基线：119 条（新增同项目夹具隔离回归）；预发共 46 条（36 默认启用、10 默认跳过）；多工作流 20 条（15 启用、5 fixme），其中基础 5 条（4+1）、复合 15 条（11 启用、4 fixme）。本地批注与批注预发是独立 project。持续进度见 `docs/testing-progress.md`。
- G1 4 条通过，G2 3 条通过；字幕、图片水印、translation、text-watermark、enhance、clean-cut、long-to-short、mix 已有新版实测通过记录。
- MW-04 混剪已验证；MW-09 完成澄清/计划确认后产出最终视频；MW-13 参数冲突先澄清最终时长再确认计划，已通过。
- MW-23 中文字幕 → 英文 → 烧录，已通过。MW-24/25/26 在 Codex 2026-11-03 17:10–17:21 复测 **3 passed**（230.125 / 231.181 / 182.280 秒），未复现原凭据错误；现已移除三条 `fixme`、恢复默认执行。无需设置 `CINLINK_INCLUDE_BLOCKED=1`，也不要为运行这三条而启用其余被阻塞场景。
- 上述 MW-24/25/26 通过记录对应旧指令。其余选定五条优化指令已于本日严格复测：MW-18 通过且无补槽；MW-11/12 无补槽但交付不完整；MW-14 无补槽但仍超时；MW-21 因新会话素材候选未命中，目标指令未提交，补槽结论未验证。详见 `docs/testing-progress.md`。
- MW-14 长链路在规划模型等待超过 60 秒后失败；保持 fixme，不应放宽断言。
- MW-05 取消端点可用，但同会话取消后重提 done 且 0 产物，工具定义缺失；仍 fixme。
- MW-18 已补齐视频+水印图双附件并实测通过；现已移除 FIXME、恢复默认执行；内容层核验仍待补。MW-21 已增加源会话登记、服务端 file_id/保存名和目标会话引用核验，但目标素材候选未命中。MW-12 仍缺服务端故障注入，本轮只测正常路径；客户端断网不能替代中间步骤故障注入。
- `Find Local Footage` 有低费用/零费用入口冒烟通过记录，不能等同于完整检索任务通过。
- G2 的替代证据是一次提交、会话内 job 唯一、计费请求观测；缺少账户级 Job 列表和按 Job 关联的预扣流水，因此不能宣称证明了服务端扣费次数。

## 已知缺陷与恢复位置

MW-22 最新范围：用户明确不修改云端代码，已批准改做前端响应模拟，仅验证 A/B 结果展示，不计为服务端部分失败通过。新增 `npm run test:multi:materials:ui`，2026-11-03 21:05 **1 passed（7.035秒）**：A done / B running → 浏览器内 SSE 更新 B failed，A 卡片保留并可下载，合成文件 SHA-256 一致，页面错误0；空登录态，业务接口全拦截，真实AI提交0。证据 `reports/mw22-ui-mock-20261103-210517/`。类型检查通过；未重复全量离线。真实 MW-22 仍前置阻塞 / FIXME，不改默认套件统计；模拟汇总文本和媒体均由夹具提供，不证明服务端隔离或真实产物生成。

MW-22：B 翻译断点已静态定位到同仓库新工作区 `C:/Users/chen/.codex/worktrees/7f90/cinlink-cloud-tool-executor`（feat/postgres-langgraph-runtime）的 `app/server_tools.py:682`，以本轮 run_id+B 翻译 tool_call_id 限定。worker 按单 task_id 记录失败。E: 目录 master 为旧 Orchestrator，不能混用断点。详见 `docs/design-cases/multi-workflow/mw22-breakpoints.md`；本轮未注入、未部署、未复测，Runtime 是否继续 A 仍待实测。

| 本地记录 | 迁移时文档状态 |
|---|---|
| `docs/defects/CINLINK-MIX-001.md` | Fixed / Verified，MW-04 已复测 |
| `docs/defects/CINLINK-ANNOTATION-001.md` | 测试定位与重渲染冲突，已撤回；云效实际状态需另查 |
| `docs/defects/CINLINK-CANCEL-RESUBMIT-001.md` | 已提交云效，工作项 `b6b809cfd596d4f47862fc68ed` |
| `docs/defects/CINLINK-FINDFOOTAGE-001.md` | 已提交云效，工作项 `12b8dd2e9cc5c1e0dd5851799a` |
| `docs/defects/CINLINK-TOKEN-001.md` | MW-24/25/26 本地复测 3/3 通过，本轮未复现；云效提交状态待核对 |
| `docs/defects/CINLINK-MW01-001.md` | 已提交云效[FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)；单次字幕链缺英文SRT且显示完成；2张PNG嵌入、JSON和字段/正文/附件回读通过；待修复回归 |
| `docs/defects/CINLINK-MW06-001.md` | 已提交云效[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)；2张PNG嵌入、执行JSON、字段和正文回读通过；待修复回归 |
| `docs/defects/CINLINK-MW10-001.md` | 已提交云效[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)；2张PNG嵌入、执行JSON、字段和正文回读通过；待修复回归 |
| `docs/defects/CINLINK-MW11-001.md` | 已提交云效 [FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc)；待修复回归 |
| `docs/defects/CINLINK-MW12-001.md` | 已提交云效 [FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b)；待修复回归 |
| `docs/defects/CINLINK-MW14-001.md` | 已提交云效 [FWXC-246](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=514a280c2861b2903950c6783d)；待修复回归 |
| `docs/defects/CINLINK-MW15-001.md` | 已提交云效 [FWXC-249](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=dc950e30e2c88409857929f4a4)；双视频分别字幕规划超时，待修复回归；2张截图+脱敏JSON已回读验证 |
| `docs/defects/CINLINK-MW16-001.md` | 已提交云效 [FWXC-250](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=443f3aba58a7c4f7faa88ca508)；B日文串用A，非互换；2张图片+2份原始SRT+核验JSON回读通过 |
| `docs/defects/CINLINK-MW21-001.md` | 已提交云效 [FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2)；前置阻塞、根因待定位 |

“工作流测试流程”和“用例编写”两份会话最后都有未收到最终答复的云效提交请求。后续若继续这些任务，先检查云效是否已有工作项，避免重复创建；本次迁移未向云效提交任何内容。

2026-11-03 本次用户明确要求将 MW-11/12/14/21 未通过结果同步云效，并补充“本次无需去重”。已在 cinlink-WEB 直接新建上述 4 条，全部描述/字段/附件回读验证通过；未检索或更新旧缺陷。四条保留 FIXME，MW-18 已通过。详细前置、提示词、操作步骤与回归边界见对应本地缺陷报告和 `docs/testing-progress.md`。此授权仅适用于本次批次。

## 新版工作台实现要点

- 路径 `/studio/workspace`；输入框 `#workspace-prompt`，发送按钮 `#workspace-send`；新建会话 `button[aria-label="New no-project session"]`。
- 新版素材先挂载到 `.workspace-media-thumb`，发送时上传；`@` 引用通过 `.workspace-mention` 与候选项处理，优先复用 `src/workspace.ts` 封装。
- 提交：`POST /runtime-api/v1/conversations/{id}/turns`，返回 `run_v2_*`。
- 状态与产物：`GET /runtime-api/v1/conversations/{id}/messages`，按 `job_id` 读取；`result_files` 归一化并补下载 URL。
- `waiting_for_clarification` / `waiting_for_confirmation` 归一为 `requires_user_input`。澄清卡与计划卡分别处理，确认后可能续跑原 run，也可能产生新 run。
- `file_cloud_*` 是有效新文件 ID；上传分片接口、单次提交识别、确认/续跑逻辑均已有实现，不能用旧接口覆盖新封装。
- 批注卡片重绘会使定位器点击挂起。历史修复采用几何位置与鼠标点击，不应恢复已撤回的产品缺陷结论。

## 运行与本机依赖

```powershell
cd C:\Users\chen\Documents\ChatGPT\cinlink
npm run verify
npm run cases:check
```

- 单条预发复测直接执行目标用例；有框架改动时按影响选择必要校验，不每次重复整套离线测试。真实预发会上传数据、创建任务并可能扣积分，按后续具体测试任务范围运行。
- `workers: 1`、`retries: 0` 保持不变；同一账户/会话只能有一个工程运行预发。迁入的登录态是快照，仍可能失效；`doctor` 只说明文件存在。
- `local.env` 已将 storageState 指向新目录 `.auth/storage-state.json`；不要回写源工程的会话。原工程也在使用同一账户时，令牌轮转仍可能互相影响。
- 媒体素材仍使用本机 `E:` 盘原始目录；本地批注依赖外部 `E:\proj\cinlink-annotation-wt` 和端口 4210，未把该业务仓库和素材库重复复制。
- `.chrome-link` 是指向浏览器资料的原始链接，未迁移；标准 Playwright 配置使用系统 Chrome，不依赖它。
- `.migration/` 保存原始对话、迁移清单与旧报告备份；可能有凭据/签名链接，已 gitignore。不要把会话、env、trace 原文贴入聊天或提交物。

官方机制参考：[AGENTS.md 项目指令](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。本工程通过 AGENTS 入口提示后续 Codex 读取本文件，再按需检索历史对话。
