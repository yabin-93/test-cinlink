# CinLink 当前测试进度

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

237已更新为分层执行版：47 UI /25 Agent /72 Technical主入口，仍144覆盖编号；Agent配对与技术补充单独记录。新版未执行，全分支Not Run；旧1 Passed/12 Failed/12 Blocked/119 Not Run为历史，不代新版结果。详见docs/cases/requirements/ERYE-237/execution-guide.md。

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

更新：2026-11-06。启用数量按当前脚本统计，通过结果按真实执行记录统计，二者不能混用。


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

按用户明确指令，以最新已确认Figma主页面为本轮验收基准，004改为**Not Applicable（本轮不适用）**，原Blocked判定撤销。云效评论§03中的对象引用标签/时间范围/移除流程保留为来源追溯，不列本轮页面阻塞或缺陷；未执行的引用后改文不计通过。已有选择/反选观察及版本7、9两批真实截图保留，没有新增运行。

用例正文、registry、meta、统一入口、联合规则、分析/前置及[004执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)已同步；134条最新**2 Passed / 2 Not Applicable / 1 Blocked / 129 Not Run**（001/003通过、002/004本轮不适用、005受阻，其余129未执行）。其他用例状态未变，没有新增AI任务、云效写入或产品源码变更。



## 2026-11-05 重启浏览器后复测ERYE196-004

已关闭原受控Chrome并新启动有头Chrome，恢复当前工程独立复测。当前版本9：三项多选/反选音频剩两项正常，但无输入框对象引用，右键无引用操作、时间尺仅定位播放头、@为文件候选；原引用后改文未执行，按云效评论定义的原流程仍Blocked。前后版本9、内容及148条字幕保持，输入/选区/缩放已恢复；保存本轮7张独立截图及读取证据，原版本7批次保留。[最新记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)。

用户询问来源后已明确：引用标签/移除交互来自云效ERYE-196评论§03，已核对最新Figma主页面未展示该完整交互，不能称为设计稿缺陷；未提交产品缺陷。没有AI任务、云效写入或产品源码变更。总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run，005未执行。



## 2026-11-05 ERYE196-004页面业务核验

按用户要求在当前工程版本7有头核验004：视频/原声音频/Hello字幕三项多选、反选音频剩两项可操作；输入框无编辑器对象引用，@仅文件候选，时间尺拖动仅定位播放头。原引用标签/移除引用及BGM/范围业务流程未完成，目标改文未发送，**004仍Blocked**。依据为196评论§03页面用户流程；不要求API字段或内部实现，不把选中高亮视作已引用，也未将未见交互直接定为产品缺陷。

7张本次真实页面受阻/恢复截图保存，前后版本7、完整内容与148条字幕一致；输入/选区已清空，缩放恢复1。[执行记录](cases/requirements/ERYE-196/results-004-ui-20261105.md)，底稿`reports/erye196-004-ui-20261105-1947/`。没有AI任务、云效写入或产品源码修改；005未执行，总计仍2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run。



## 2026-11-05 ERYE196-003页面业务实测通过

按用户明确要求，将003原游标读取场景调整为页面业务验收：A浏览中、B仅将6.64～7.12秒solution.改为新版C2，A无需刷新即更新；继续滚动及刷新后各3窗口覆盖148/148，遗漏/额外/重复/文字差异0，只改变目标1条，其余147条及时间、其他轨道和设置不变。随后B撤销本次改文，A同步恢复，完整工程内容与原基线一致；版本5→6→7，测试新增B页已关闭。

**003 Passed（页面业务口径）**；原游标接口专项未执行，不纳本次通过范围。10张真实执行截图、前后/恢复读取及两次全列表对象核验保存于`reports/erye196-003-ui-20261105-1935/`，[执行记录](cases/requirements/ERYE-196/results-003-ui-20261105.md)。没有AI任务、云效写入或产品源码变更。134条最新**2 Passed / 1 Not Applicable / 2 Blocked / 129 Not Run**；004～005未执行，其他需求和既有结果保持。



## 2026-11-05 ERYE196-002撤销页面阻塞判定

用户确认修改状态：002原“按时间范围分页读取”来自196评论§11接口约定，已读取的最新设计稿没有对应页面交互；原先因页面缺少入口判Blocked不成立，现改为**Not Applicable（本轮页面验收不适用）**。原接口专项步骤保留为未执行，不计通过；既有148/148条列表完整性、对象稳定性及版本5不变的补充核验保持Passed，六张原始截图/读取结果保留，没有新增执行。

用例正文、registry执行状态、meta、统一入口及[002执行记录](cases/requirements/ERYE-196/results-002-20261105.md)已同步。134条最新：**1 Passed / 1 Not Applicable / 3 Blocked / 129 Not Run**；003～005未变。自动化列PLAN仅表示尚未接固定脚本，与本轮不适用状态分开记录。



## 2026-11-05 ERYE196-002当前工程核验

按用户要求继续有头执行002，当前工程张雅婷(Tin)分享的视频.mp4、本批版本5。完整工程/字幕可读取；4个滚动窗口覆盖148/148条，遗漏/额外/单窗口重复/跨窗口标识或文字变化均0；首10秒12条已完成对照，前后版本5、content/updated_at及字幕结果一致。六张真实截图与原始读取已保存。

**002仍Blocked**：当前没有按指定时间范围分页读取的可执行入口，原pageSize=1/游标主步骤及三cue B0未执行；完整读取、滚动浏览和离线范围参考不替代该功能。按用户口径，不以字段映射或服务端历史实现作为本次阻塞。没有修改工程内容、提交AI任务、写云效或修改产品源码。[执行记录](cases/requirements/ERYE-196/results-002-20261105.md)；本机底稿`reports/erye196-002-20261105-1919/`。001仍Passed，003～005未执行；总计1 Passed/4 Blocked/129 Not Run。



## 2026-11-05 ERYE196-001按业务验收口径通过

用户明确“开发怎么实现的具体可以不验证”。001据当前工程实测更新为**Passed**：能力/当前工程可读取，选区及轨道正确，播放头/缩放/面板操作正常，上下文同步，revision 3→3、content/updated_at一致、可观察编辑历史past1/future0不变。字段等价映射及服务端历史实现不再作为本例阻塞；用例正文同步改为业务可观察预期。

这是同批实测证据在用户确认范围后的结论更新，没有新增运行。当前134条：**1 Passed / 4 Blocked / 129 Not Run**；001为人工有头执行、无固定脚本，自动化列恢复PLAN，registry另记Passed。002～005未重跑，原始七张截图及读取响应保留。[最新结果](cases/requirements/ERYE-196/results-001-rerun-20261105.md)。



## 2026-11-05 ERYE196-001按用户当前工程复测

按用户“使用我打开的这个项目”，在有头Chrome核验“张雅婷(Tin)分享的视频.mp4”（工程3bc78d71-8cf6-4caf-b347-a2f19962f471）：revision 3→3、content及updated_at一致，本地past 1→1/future 0→0；播放头/缩放/面板操作及选区、轨道身份子项通过。发现实际`/cloud-tool-api/mcp/editor`读取入口，initialize/tools/list返回109项工具及Schema，editor_project_get/editor_view_get成功；显式页面会话回读与8秒/1.5缩放/字幕面板收敛。前端92项目录另行记录，不与服务端109项混计。

完整001仍BLOCKED：原timelineId/revisionToken字段的正式等价映射及服务端历史证据待确认；已不再以“找不到能力/上下文入口”作为最新阻塞。其他002～005未重跑，134条仍5 BLOCKED/129 PLAN。七张真实截图、前后快照/MCP响应及历史证据已保存，[最新执行记录](cases/requirements/ERYE-196/results-001-rerun-20261105.md)，底稿`reports/erye196-001-rerun-20261105-1829/`。没有AI任务、云效写入、产品源码修改或发布。



## 2026-11-05 ERYE196-001～005有头核验

本机Chrome已核验，**0条整例通过、0条确认产品失败、5条Blocked**；其他129条未执行。已新建独立20秒PA并用真实SRT建立C1/C2双语字幕，素材文件显示与可编辑cue分别确认。001移动播放头、缩放、切换面板的子项通过：revision 4→4、内容一致、0保存请求；能力/上下文K及服务端历史仍未确认。002/003缺时间线分页/版本游标契约；004/005可选中视频/C1但未找到Agent对象引用入口，目标改文未发送。完整B0的配音/BGM/水印/独立PB仍未准备，不把前置核验计为完整闭环或产品失败。

[逐例结果、未发送的完整提示词、实际工程ID和截图](cases/requirements/ERYE-196/results-001-005-20261105.md)。底稿`reports/erye196-001-005-headed-20261105/`；目标turn请求0、AI任务0、补槽0（不证明无补槽），没有云效写入、产品代码变更或部署。001～005正文/登记改为BLOCKED，其他需求与既有MW/SSO结果保持。





## 2026-11-05 ERYE-237全量重写需求用例

按用户“不保留旧用例”重新设计144条，P0 95 / P1 48 / P2 1，全部PLAN/Not Run，0脚本、0业务执行。[详细用例](cases/requirements/ERYE-237/cases.md)、[需求/Figma分析与测试点](cases/requirements/ERYE-237/analysis.md)、[测试前置与数据](cases/requirements/ERYE-237/test-data.md)已进入统一入口；旧16/06页面仅保留新版导航，不保留旧表或旧ID映射，登记表仅映射本版。

只读取得云效v1.1正文及v1.2修订（最后修改2026-10-19 10:42:09，评论/附件0），读取用户指定Figma文件SqGzwtxqNjFZa9QIvUPAlc的1816:50610画布及代表状态；完整Figma评论未取得，未编造。用户已确认批注最多10条，与设计会话20张图片注释分开。覆盖A01～A24、D01～D12和IMG-R增补；拟定期限/字体回退/候选策略及资料缺口列门禁，不计已通过。其他需求和MW/SSO定义/结果保留；未写云效、未执行图像生成、未改产品或云端代码。

静态校验：`npm run cases:check`通过（正式需求543条、0问题）；专项144个编号/9列表格/PLAN登记一致，A01～A24、D01～D12及IMG-R01～05已追踪，184处本版相对链接/锚点有效，其他8份受保护用例/配置及其他需求登记段未变。底稿`reports/erye237-requirement-20261105/design-validation.json`；静态设计覆盖不代表已执行或已满足发布门槛。

## 2026-11-05 ERYE-206/210关联需求用例设计

已只读读取206正文及全部4评论（含1张内嵌旧截图）、210正文v1.0/v1.1及唯一评论，附件列表均0。用户补充最新Figma并明确以已确认主页面为准，已按Media/Scripts/Captions/Voiceover/Watermark五入口编写；正文六TAB差异按用户决定处理，待定新增方案不扩大范围，v1.1拟定业务规则仍待评审。

新增[206的67条](cases/requirements/ERYE-206/cases.md)、[210的54条](cases/requirements/ERYE-210/cases.md)，共121条（P0 114/P1 7），0 AUTO/121 PLAN、全部Not Run。覆盖AC32/AC12/NAV-R5及评论默认字幕轨/11labs解析；[三需求联合分析和复用](cases/editor-linked-196-206-210.md)关联196底层用例，不复制执行计数。各需求analysis.md与test-data.md提供来源、待确认项、独立素材/工程/故障前置。196原134条保持，三需求共255条；正式需求总488条。旧DC-05标历史追溯，不按旧默认剪辑/属性TAB验收。

本轮仅设计，未创建真实数据、未提交生成/导出、未改产品代码或云效。缺少操作/字段表、真实11labs样本、精细清理评审等前置单列，不将设计完成等同测试通过。

静态检查完成：`npm run cases:check`全工程488条、0问题；121个新ID/九列/步骤/状态/registry一致，AC32/AC12/NAV-R5映射完整，35个本次本地链接有效，196原文件哈希保持。差异空白检查通过；底稿仅本机保存于`reports/erye206-210-requirements-20261105/`。


## 2026-11-05 ERYE-196正文与评论需求用例设计

已只读获取ERYE-196评审正文、全部1条完整详版评论23563211（WFR01～20、WAC01～32）及0项附件，并核对引用的ERYE-206工程身份/目标规则。新增[134条详细用例](cases/requirements/ERYE-196/cases.md)：M1 121、M2 13，P0 131/P1 3；0 AUTO/134 PLAN、全部Not Run。每例有前置、数据、完整指令/结构化操作、步骤、可验证预期及来源；[分析与WAC映射](cases/requirements/ERYE-196/analysis.md)、[数据/故障前置](cases/requirements/ERYE-196/test-data.md)已分列。M3仅列边界，不冒充已有验收。

已加入正式需求目录、registry与统一入口，正式需求总367条。建议限制/性能/结算等10项待确认单列；未创建测试工程、未执行任务、未改产品代码或云效。本节为用例设计进度，不是功能通过记录。


## 2026-11-05 剪辑配音与字幕同步P0设计

新增[SYNC-001～006](design-cases/multi-workflow/editing-dubbing-sync-cases.md)，6条P0：剪辑→配音字幕2条、配音字幕→剪辑2条、去口癖/拼接→配音字幕2条。已放入[用例统一入口](cases/README.md#剪辑配音与字幕同步p0)，同步矩阵及自动化设计登记。0 AUTO/6 PLAN、执行0条，不计通过/失败；原SSO仍22条，既有定义、结果与默认脚本数量不变。

按固定种子分层抽样，8个原始文件SHA已重新核对；包括英语新闻、中文竖屏、英语访谈、原带字幕日语竖屏、受控口癖WAV及静态图、英语短片和HEVC视频。005配套视频尚未生成，已明确夹具制备和音频时序验证前置。用户确认暂不设毫秒同步阈值，逐句、首尾及全部实际切点验收；实际切点听审和日语源能力在执行前核对。本轮未提交CinLink任务。

设计校验通过：正式需求检查233条/0问题；专项6编号、12份提示词、9列表格、类别分配、15处新链接/锚点及8份素材哈希检查0问题。原SSO正文/脚本及登记表哈希未变；这些是静态检查，不记业务通过数。



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

## 2026-11-04 SSO改为无@、纯文本指定源视频

按用户最新要求，已在原SSO-001～018条目中调整前置、步骤、完整提示词和预期：同一会话只上传一个源视频F，各轮不输入@、不选择素材引用标签、不重新上传；完整正文明确“本轮请对本会话最初上传的源视频7MB.mp4进行处理，不使用之前生成的视频或字幕文件。”单工作流逐轮处理原片，多工作流本轮组合效果仍集中在同一最终成片。

SSO-001～004脚本同步去掉@候选操作，纯文本提交并检查输入区无引用标签；不再要求无@请求显式携带F，而从实际计划输入核实F、排除上一轮交付物，保留来源审计、下载/媒体/SRT和历史文件不被覆盖检查。恢复检查点新增模式校验，旧@模式报告不能恢复为新版。

当前状态：**4条已接脚本（AUTO）＋14条PLAN，18条无@新版均未执行**。旧SSO-001的@候选前置阻塞及缺陷保留历史，不作为新版失败、通过或当前必经阻塞，也不据此宣布@缺陷已修复。此调整仅涉及SSO，不改变既有MW/CHAIN的素材引用方式及实测结论。统一入口、矩阵说明、脚本登记和项目上下文已同步；Excel仍未收录该专项。

验证：`npm run verify`退出0，类型检查和123条离线用例通过；`npm run cases:check`为233条正式需求用例、0问题（该命令不扫描SSO）。另独立校验18个SSO唯一编号、九列、4 AUTO/14 PLAN、无@操作、8段脚本/文档提示词一致及90个本地链接，均通过。`npm run test:sso -- --list --reporter=list`发现4条，未打开浏览器或提交任务。检查底稿`reports/sso-plain-source-design-20261104/`，未修改产品源码或云效状态。

## 2026-11-04 本地素材查找P0自动化与有头执行

按用户最终范围接入LF-01～03：[脚本](../tests/local-footage/local-footage.spec.ts)、独立配置 `playwright.footage.config.ts`，命令 `npm run test:footage`。有头单窗口、单worker、零重试；本专项17条中，3条已执行且未通过、其余14条PLAN，原卡片7条/默认预发数量不变。

| 用例 | 真实结果 | 结论/失败截图 |
|---|---|---|
| LF-01 | 四原片4/4分析成功，含无音轨F3；查询机器人返回90～92秒正确段及留声机105～107秒、飞机0～2秒 | 未通过：混入2个无关片段；[截图](../reports/lf01-03-headed-20261104/checked/LF-01-failed.png) |
| LF-02 | 单素材F1、1/1就绪；返回F1的0～2秒短片，未出现仙人掌 | 未通过：片段位置/内容不符；[截图](../reports/lf01-03-headed-20261104/checked/LF-02-failed.png) |
| LF-03 | 单素材F2、1/1就绪；返回F2的0～2秒短片，未出现蓝衣男孩或仙人掌 | 未通过：片段位置/内容不符；[截图](../reports/lf01-03-headed-20261104/checked/LF-03-failed.png) |

3个任务均done、视频可下载/播放，不能等同业务通过；**0通过/3未通过/0前置阻塞/0未执行（选定范围）**。原片云端回读哈希与本机一致，真实查询只提交3次；字段解析修正和播放/画面校验均回读原run，没有重提AI任务。目录选择/首次上传由用户完成，脚本续接既有分析；旧启动、选择器、追踪及源字段适配报错保留原始记录，不充当产品失败。

[完整执行记录、项目/会话/run及失败截图](design-cases/multi-workflow/local-footage-results-20261104.md)。证据 `reports/lf01-03-headed-20261104/`：`final/`为实际提交及初始终态，`checked/`为最终内容断言/真实播放和3张失败PNG（JUnit 3 failed），根目录 `summary.json`汇总。类型检查、3条脚本发现通过，未重复全量离线；未修改云端代码或云效，旧Find Footage缺陷不直接标修复。统一入口/矩阵/自动化登记已同步，Excel仍未收录本专项，SSO停跑不变。

## 2026-11-04 MW-01 云效同步

已在cinlink-WEB新建并回读验证 [FWXC-255](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=9abeb86a98cba72e7158bc3d60)（工作项`9abeb86a98cba72e7158bc3d60`），[本地缺陷记录](defects/CINLINK-MW01-001.md)。范围为当前用户确认的“一条完整提示词一次提交”：只交付中文字幕SRT，英文仍待后续规划；`intent_fully_satisfied=false`却`done/Completed`，请求未完整满足。旧两轮续接或Stop按钮现象不属于本缺陷。

正文包含详细前置、英文原片规格、完整提示词、单次提交的逐步复现、实际/预期、影响与回归边界，沿用用户模板，不含“排查信息”。已上传并嵌入2张原始PNG（提交前、Completed但缺英文SRT），另附脱敏执行JSON，共3份附件。项目/类型、负责人/迭代/标签、优先级高、严重程度2-严重、正文和附件ID/名称及图片引用全部回读通过。

创建前核对全部状态73条缺陷，并在写入前重新查询；未发现MW-01或同run记录。FWXC-253/245仅症状相似、交付组合不同，同根因未确认，未合并或修改。实际新建1、旧项更新0、跳过0、失败0、回读验证1。同步底稿`reports/mw01-yunxiao-20261104/`。

本次未重跑CinLink任务、未改变默认启用/FIXME或测试结论；MW-01仍待修复回归，MW-02单次提交仍为通过，MW整体14有通过证据/9未通过/3前置阻塞。


## 2026-11-04 清理已移除的旧快捷入口

依据已有新版移除记录及本日有头DOM快照（旧快捷锚点0），按用户要求删除矩阵内旧快捷卡片章节、3项分类、CS-07～09和旧前置/no-op规则；统一入口与脚本登记已同步说明。对应编号退役，不补号、不删除当前字幕/翻译功能卡片或Find Local Footage。

工作簿“卡片清单”15→12项、“卡片用例”25→22条，总览同步；比对1692个保留单元格的内容/样式，13个非目标工作簿部件字节一致。旧条目已清零。卡片自动化仍7条，无代码变更或新任务提交，不重复全量离线测试。AI生图8条P0扩展及SSO仍未同步到历史工作簿，现行详情继续以统一入口为准。

## 2026-11-04 AI生图P0用例补齐

已完善[IG-01～08](design-cases/multi-workflow/ai-image-p0-cases.md)共8条P0，沿用前5个编号、新增3个；统一入口按条列明分辨率、比例、场景和状态。覆盖1K/2K/4K与1:1/9:16/16:9/3:4/4:3，含默认参数、显式选择、同会话切换比例和分辨率，逐条补齐前置、操作及下载/像素预期。

本轮仅编写用例，未提交生成任务、未新增自动化。IG-05对应原默认脚本的部分检查，其他7条未接脚本；AI生图脚本仍1条，卡片套件仍7条，原默认预发数量不变。精确分辨率像素映射尚待取得当前模型生效规格；不把参数标签或扩展名当作实际像素通过证据。矩阵正文已链接到专项，避免双份维护；Excel尚未同步本次扩展。

## 2026-11-04 用例统一入口与SSO前置阻塞

全部用例从[统一入口](cases/README.md)查找：正式需求、工作流、同会话单原片、卡片、链路、批注及离线校验均列正文、脚本、命令和状态，保持原分类目录与编号，未复制或迁入requirements。

SSO-001～004已接入 `tests/sso/same-session-original.spec.ts`，独立配置 `playwright.sso.config.ts`，命令 `npm run test:sso`，有头、单worker、零重试。001有头调试已确认素材登记消息done，F的下载SHA-256与本地原视频一致；第一轮@候选“暂无相关内容”，因此两轮目标指令均未提交，业务状态为**前置阻塞**。002～004未执行；不能将共同阻塞写成四条实测失败。其余14条仍PLAN，无SSO通过结果，原默认46条预发与MW编号不变。

用户确认@候选不显示视频已提缺陷、正在修复，要求先统一入口；本轮已停止继续执行，没有新增重复缺陷。调试证据：`reports/sso-headed-20261104-113440/headed-source-resume/` 的HTML/JUnit、审计、原始截图和trace。之前追踪启动/隐藏上传控件/响应记录的适配尝试保留在同根目录，不计成目标任务业务结果。Excel暂未收录SSO，以统一入口和专项正文为准。

## 2026-11-04 MW-01/02 单次完整提交复跑完成

用户明确MW-01/02都一次提交完整要求；运行中只显示停止按钮是正常交互。此前MW-02人工重叠发送的测试方式有误，**撤销其产品失败判定**；旧MW-01两轮续接也已被当前单次字幕链替代，不能沿用为当前通过结果。两条旧原始Playwright/JUnit、截图和trace保留，合并摘要标注旧方式不适用及替代报告。

**当前结果：MW-01未通过、MW-02通过，0次补槽、0次计划确认。两条均把全部要求写在一条提示词中，只提交一次，分别串行执行，单worker、零重试。** 原始报告分开保存，合并结果`reports/mw01-mw02-single-prompt-20261104/summary.json`。

| 用例 | 当前单次提交结果 | 耗时 | 实际交付与核验 |
|---|---|---:|---|
| MW-01 | 未通过：缺英文SRT | 196.973秒 | run done，仅`7MB.zh-Hans.srt.srt`；下载确认15条中文文本、结束60.46秒，没有英文SRT可核验 |
| MW-02 | 流程、交付与基础媒体规格通过 | 658.485秒 | 中文字幕SRT、增强MP4各1份；SRT15条、结束60.46秒；MP4为2560×1440、60.495778秒、1条音轨，下载成功 |

MW-01：会话`07abbd20-d1b5-471f-888d-291b553b7b04`，run `run_v2_2edbba5bdcaa4e0da78359e0a0e3f006`。页面Completed，服务端无错误，但英文SRT未交付；步骤仅抽音频、转写、一次字幕翻译与导出。页面说明本次只安排中文SRT，英文需该SRT可用后再规划；没有自动完成要求的后置英译。按单次提交的两份字幕交付目标判未通过，根因未定位。[本次MW-01失败截图](<../reports/mw01-single-prompt-20261104/test-results/g3-g7-multi--regression-G3-304b6-ow-MW-01-单次提交串行依赖：中文字幕再翻译英文-staging/test-failed-1.png>)、final-state图、trace、审计及下载的中文SRT保存在`reports/mw01-single-prompt-20261104/`。

MW-02：会话`e79fe1d1-74cc-4149-ae9e-55adf306a8b3`，run `run_v2_5bf18559740c45c5bb7d439a14f81ea3`。报告`reports/mw02-single-prompt-20261104/`含原始UI图、trace、审计、下载产物、ffprobe结果及`artifact-verification.json`。保持独立SRT和增强MP4的原交付目标，未增加字幕烧录；字幕逐字翻译质量和音轨逐样本一致性未完整验收。

两条新提示词均按实际英文源填写，类型检查通过；未重复全套离线测试，未修改判定阈值、默认启用或FIXME配置，正式需求目录未改，未向云效写入。原两轮/重叠发送的记录只作测试纠正追溯，不能作为本次通过或失败依据；“Stop”未作为缺陷同步过。

26条MW最新台账：**14条有通过证据、9条明确未通过、3条前置阻塞、0条待本轮复测**。当前失败为MW-01/05/06/10/11/12/14/15/16；MW-02现为通过；阻塞仍为MW-17/21/22。SSO专项执行与阻塞状态以独立记录为准，不由本次MW结果代替。

## 2026-11-04 12:30 MW-01 / MW-02 初批记录（MW-02执行方式及判定已纠正）

原始Playwright结果为1 passed / 1 failed，约4分钟，退出码1；**两条旧执行方式均已被当前单次提交定义替代，不计为当前MW-01/02通过或产品失败**。串行、单worker、零重试，补槽0次、计划确认0次。沿用有效会话（auth 1 passed，10.2秒）；类型检查与3条补槽/续跑定向单测通过，未重复全套离线校验。

| 用例 | 结果 | 耗时 | 本次观测 |
|---|---|---:|---|
| MW-01 | 旧两轮场景完成，现定义已替代 | 182.022秒 | 旧流程同一会话两轮done、分别交付SRT；仅作历史证据，不代表当前单次完整字幕链已通过 |
| MW-02 | 旧执行方式不适用，产品失败判定已撤销 | 53.532秒 | 原错误测试在首任务queued时尝试第二次发送；只有Stop是正常交互，不作为缺陷。现已改为一次发送完整要求，另行补跑 |

MW-01会话`aec418ef-9a90-452c-bc24-30b107675175`，字幕run `run_v2_56755e5116994baba4f7f227ea40d7b0`，翻译run `run_v2_43282bbb2e5c4d6e8ccf63dca113e38a`。两轮文件分别显示`7MB.zh-Hans.srt.srt`和`7MB.en.srt.srt`，文件ID均为`file_cloud_dkphjk57svdg67xa4lcvppi5nu`；不能只凭名称或ID判断语言转换正确，本次未逐字核验字幕内容与完整时间轴。可确认第二轮执行路径只处理字幕，没有改用视频重新转写。

MW-02旧会话`64a92350-6ccc-4e35-9b41-63350196b202`，首run `run_v2_71a4d59112b1484bb0e946f0ae4ba5f8`。没有误点停止；截图先保留，首run随后由测试清理显式取消并回读为cancelled，不是产品自行取消或执行器失败。用户已说明只有停止按钮是正常交互，原先自行引入的“重叠提交”目标无效；保留这些资料只用于追溯测试纠正，不作为产品问题。

证据：`reports/mw01-02-20261104/`中的`summary.json`、HTML/JUnit、逐例审计和2份trace；`dependency-evidence.json`为字幕依赖步骤摘录，`mw02-controls.json`为DOM控件摘录。[MW-02失败截图](<../reports/mw01-02-20261104/test-results/g3-g7-multi--regression-G3-fdbde--slow-MW-02-同源多任务：字幕与增强分别收敛-staging/final-state.png>)在清理前保存，另有增强指令输入后的截图和Playwright自动失败图。

初批原片`7MB.mp4`仍为英文语音，不证明初批中文源语音前置满足。默认启用/FIXME数不变，正式需求目录未改，未向云效同步本轮结果。后续MW-01/02已按用户纠正调整提交方式并使用实际源语言，见最新记录。SSO专项状态以独立记录为准，不由本次MW结果替代。

初批曾记为14有通过证据/9未通过/3前置阻塞，现已撤销其中MW-02的错误失败判定，最新口径见上方纠正记录。MW-01旧发送异常本次未复现，前置阻塞仍为MW-17/21/22。

## 2026-11-04 同会话单原片：初始设计记录（当前状态见统一入口）

用户补充：单工作流按每轮判断，两次@F的提示词和工作流可以不同。已完善原条目SSO-004/006，并补充8条单工作流的两轮对照表：4条同工作流改参/重复、4条跨工作流切换；编号和总数18不变，仍全部PLAN/未执行。

已编写[SSO-001～018](design-cases/multi-workflow/same-session-original-cases.md)共18条：每轮单工作流8、多工作流组合6、恢复/多轮4；全部为PLAN/未执行。每例只上传一个原视频F、全程同一会话，每轮明确引用F；多工作流对同一原片组合处理，最终成片包含全部要求的效果，不分别交付多个单效果视频。已列具体前置、完整指令、逐轮步骤、来源/参数/组合效果与历史产物验收。

本次仅设计及文档核对，未执行预发、接入脚本或同步云效；原有真实通过/失败/阻塞和默认套件计数不变。Excel尚未收录这18条。7MB.mp4按已核验的英文语音编写；去口癖样本仍需执行前预听，未满足不得判通过。

## 2026-11-04 MW-06 / MW-10 云效同步

已在cinlink-WEB新建并回读验证2条：

- MW-06：[FWXC-253](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2fad2ef9c90b10b44c456b0bf4)，任务done但缺单独英文SRT；[本地记录](defects/CINLINK-MW06-001.md)。
- MW-10：[FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)，高光Extract audio报source_duration_sec空对象错误、无产物；[本地记录](defects/CINLINK-MW10-001.md)。

每条包含详细前置操作、素材规格、原提示词、逐步复现、实际/预期和回归边界，均按用户模板去掉“排查信息”。每条上传并嵌入提交前及失败终态原始PNG，另附脱敏执行JSON：共4张图、6份附件。项目/类型、负责人、迭代、标签、优先级高、严重程度2-严重、正文、附件ID/名称及嵌图引用均回读通过。

创建前对全部状态分页核对，初始71条，未发现两用例或同run记录；FWXC-245仅有相似缺英文SRT症状，交付组合不同、同根因未确认，未合并或修改。每条创建前均重新检索并以更新时间复核详情缓存；最后一次创建前共72条。实际新建2、旧项更新0、跳过0、失败0、回读验证2。同步底稿：`reports/mw06-mw10-yunxiao-20261104/`。

本次只同步证据，没有新增CinLink任务；测试结论仍为8条流程/产物检查通过、2条未通过，默认启用/FIXME数量不变。已注明英文语音素材与中文语音提示词的前置差异，不宣称已覆盖严格中文源语音场景。


## 2026-11-04 多工作流10条补跑完成

**8条流程/产物检查通过、2条未通过、0条阻塞、0条未运行。** 2026-11-03的MW-06原任务读回结论，加上2026-11-04恢复登录后的9条串行执行，组成这10条的最终结果；不是同一份10条JUnit。续跑JUnit为8 passed / 1 failed（09:40–10:43，约1小时），workers=1、retries=0；auth 1 passed（45.2秒）。此前MW-07 Unauthorized未取得run_id，认证中断证据保留，本轮已正常完成。MW-06没有重复提交。

| 用例 | 结果 | 耗时（秒） | 补槽提交 | 计划确认 | 实际交付/失败原因 |
|---|---|---:|---:|---:|---|
| MW-03 | 流程/产物通过 | 677.957 | 0 | 0 | `7MB_1440p_zh-Hans.mp4` |
| MW-06 | 未通过 | 原任务UI205；恢复读取23.338 | 0 | 0 | done，仅中文SRT和summary.md两份，缺单独英文SRT |
| MW-07 | 流程/产物通过 | 489.387 | 0 | 3 | 清理后MP4、中文字幕SRT、英文SRT |
| MW-08 | 流程/产物通过 | 545.478 | 0 | 3 | highlight_final.mp4、中文及英文SRT |
| MW-09 | 流程/产物通过 | 515.538 | 0 | 0 | `E2E-TEST Final MP4.mp4` |
| MW-10 | 未通过 | 639.462 | 0 | 0 | 高光处理的Extract audio报`'NoneType' object has no attribute 'source_duration_sec'`，run failed、0产物 |
| MW-23 | 流程/产物通过 | 167.295 | 0 | 0 | `7MB_bilingual.mp4` |
| MW-24 | 流程/产物通过 | 254.278 | 0 | 1 | `7MB_cleaned_zh-Hans.mp4` |
| MW-25 | 流程/产物通过 | 252.587 | 0 | 1 | `7MB_highlights_zh-Hans.mp4` |
| MW-26 | 流程/产物通过 | 188.842 | 0 | 0 | `E2E-P0_English_Subtitles.mp4` |

已按“遇补槽填写后继续”启用处理；本批实际0次补槽，执行计划确认合计8次，二者分别记录。未修改提示词、产品判定阈值或默认FIXME配置；执行阶段未向云效写入，后续同步见本页最新云效同步记录。

**验收边界：** 本批仅确认任务终态及所需文件数量/类型，未逐帧验证字幕语言与同步、水印、素材参与、分辨率、时长和处理顺序。沿用的`7MB.mp4`及MW-09第二素材，其SHA-256与MW-16独立ASR证据一致，实际均为英文语音；现有提示词仍按中文语音描述执行。因此不能据此宣称“中文源语音”前置或完整业务内容验收已通过。完整内容核验及匹配中文源语音的素材仍需补齐。

报告根目录：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`；合并结果见`summary.json`，续跑HTML/JUnit/JSON、逐例审计及trace见`remaining-after-auth/`。失败原始PNG、before-submit和final-state图均保留：

- [MW-06失败截图](<../reports/mw03-06-07-08-09-10-23-24-25-26-20261103/test-results/g3-g7-multi-compound--regr-105f5-复合（MW-06-22）-MW-06-字幕-翻译-总结-staging/test-failed-1.png>)；run `run_v2_edc411c2a1da47c18feb766c41cf89aa`。
- [MW-10失败截图](<../reports/mw03-06-07-08-09-10-23-24-25-26-20261103/remaining-after-auth/test-results/g3-g7-multi-compound--regr-0d0ec-06-22）-MW-10-显式顺序：增强→字幕→长变短-staging/test-failed-1.png>)；run `run_v2_db0f651a768b46648d188fbe7b31d628`。截图显示增强、转写、翻译、字幕烧录完成，随后Extract audio及高光相关步骤失败；根因未定位。

26条覆盖账本已更新：**13条有流程/产物通过证据、8条明确未通过、3条前置阻塞、2条旧异常待复核**。原10条“缺当前版本/优化指令证据”清单已清空；MW-01/02仍待复核；失败为MW-05/06/10/11/12/14/15/16，前置阻塞为MW-17/21/22。账本`reports/multi-coverage-audit-20261103/coverage.json`，补跑前副本另存。

## MW-22 前端响应模拟（2026-11-03 21:05）

按用户最新确认“不修改云端代码”，新增独立命令 `npm run test:multi:materials:ui`，本轮 **1 passed（7.035 秒）**。加载预发真实静态界面，业务响应与 SSE 在本机模拟：初始 A done / B running，随后只更新 B 为 failed；原生步骤错误可见，A 视频卡片和下载能力保留，下载 22,718 字节与合成夹具 SHA-256 一致，页面脚本错误0。模拟汇总文本“1 成功，1 失败”正常显示；该文本预置于响应，不代表已验证服务端汇总算法。

空登录态、不上传素材、不提交真实 AI 任务、不改云端代码；下载使用模拟 data URL，不覆盖真实 S3 下载。类型检查通过，按用户要求未重复全量离线校验。证据：`reports/mw22-ui-mock-20261103-210517/` 的 `html/index.html`、`junit.xml` 及测试输出中的两阶段截图、`MW-22-ui-mock.json`、`ui-snapshot.txt`、trace。

**仅前端展示模拟通过，MW-22 服务端部分失败仍为前置阻塞 / FIXME。** 本模式不计入真实专项通过数，不增加设计用例数量；专项仍2条流程/结构通过、2条未通过、2条前置阻塞，默认多工作流20条、预发46条统计不变。执行说明见 [MW-22说明](design-cases/multi-workflow/mw22-breakpoints.md)。

## 套件概览

| 套件 | 总数 | 默认启用 | 默认跳过 | 最近执行证据 |
|---|---:|---:|---:|---|
| 离线（unit + gates） | 123 | 123 | 0 | 前序119 passed；本次类型检查+3条定向校验通过，当前123条未全量重跑 |
| 预发 G1/G2 | 7 | 7 | 0 | G1 4 passed，G2 3 passed |
| 预发八个主工作流 | 8 | 8 | 0 | 各工作流均有 2026-11-03 通过记录 |
| 卡片入口 | 7 | 5 | 2 | Find Local Footage 入口冒烟通过；其余新版完整回归待补 |
| 多工作流基础 | 5 | 4 | 1 | MW-02/03/04有通过证据；MW-01单次字幕链缺英文SRT；MW-05失败 |
| 多工作流复合 | 15 | 11 | 4 | 9条有流程/产物通过证据；06/10/11/12/14未通过；21前置阻塞 |
| 跨工作流链路 | 4 | 1 | 3 | CHAIN-01 已实现，待新版回归 |
| **预发合计** | **46** | **36** | **10** | **未执行过本版本整套 46 条全量验收** |
| 本地批注 | 39 | 39 | 按环境可跳过 | 27 规则 + 12 UI，当前完整执行证据待补 |
| 批注预发 | 16 | 15 | 1 | 2026-10-20：11 passed / 1 failed / 1 skipped / 3 did not run |

多工作流合计为基础 + 复合：**20 条，15 默认启用、5 FIXME**。预发合计不包含单独的本地批注和批注预发 project。

2026-11-03：MW-18 双附件严格复测通过后已移除 `fixme`，恢复默认执行，无需强制启用其他阻塞用例：

```powershell
npm run test:multi:compound -- --grep 'MW-18\b'
```

本次启用变更已通过类型检查、118 条离线用例、233 条正式需求用例质量校验，以及未设置强制开关的默认用例发现检查；未额外创建预发任务。

## 2026-11-03 MW-03/06/07/08/09/10/23/24/25/26 初批记录（认证中断，已于次日续跑）

按用户要求串行、零重试，遇补槽填写后继续，保存失败截图和 trace。MW-06 已读回原任务终态：done 但仅交付 `7MB.zh-Hans.srt.srt` 和 `summary.md`，缺英文 SRT，未通过。原任务页面显示耗时205秒；恢复读取阶段23.338秒不能作为完整执行耗时。

MW-07 发送阶段页面显示 `Unauthorized`，120秒未收到提交响应，未获得 run_id；复核会话已失效，按认证前置受阻记录，不判定工作流失败。人工登录等待300秒后超时，窗口已随脚本退出。当前统计：**0通过、1未通过、1认证受阻、8未运行**；剩余9条待恢复登录后继续，不能报告为10条已完成。报告目录：`reports/mw03-06-07-08-09-10-23-24-25-26-20261103/`，结构化汇总 `summary.json`；待继续命令 `node reports/mw03-06-07-08-09-10-23-24-25-26-20261103/run-remaining.cjs` 仅选其余9条，须先恢复有效会话。

筛选曾误匹配父标题而选出16条，已在仅MW-06提交后中断；后续均恢复读取同一run，没有重复创建MW-06。另一次截图等待字体加载被中断，随后取证跳过字体就绪等待，失败截图和trace均已保存。两次中断资料保留在该目录的独立子目录，不当作产品失败或额外已执行用例。

本次代码补齐显式补槽处理及审计、活动run续跑、已受理run恢复绑定；类型检查及3条定向单测通过，未重复整套离线校验。正式需求目录未改动。

## 2026-11-03 多工作流剩余覆盖核对（补跑前快照）

按MW-01～26逐条核对：默认20条+独立按需6条。AUTO仅表示可执行，不能当作当前提示词已经实测；历史通过与优化后复测分开。没有发起新的预发任务。

| 分类 | 用例 | 数量 | 下一步 |
|---|---|---:|---|
| 缺当前版本完整结论，未有明确当前阻塞 | MW-03/06/07/08/10 | 5 | 按当前提示词补跑 |
| 历史通过，优化后指令待复测 | MW-09/23/24/25/26 | 5 | 用当前完整参数重跑；其中MW-24/25/26的17:10批次对应旧指令 |
| 旧异常待复核定位 | MW-01/02 | 2 | 复核第二次发送按钮/页面提前关闭，不沿用旧版阻塞作为当前结论 |
| 已有明确失败证据 | MW-05/11/12/14/15/16 | 6 | 修复后定向回归；MW-12故障注入另行覆盖 |
| 前置卡点明确，目标任务尚未执行 | MW-17/21/22 | 3 | 先解除下述前置 |
| 有通过记录 | MW-04/13/18/19/20 | 5 | 内容层仍按各报告边界，不等同全部业务内容已验收 |

待补跑且没有明确当前阻塞的清单共10条：MW-03/06/07/08/09/10/23/24/25/26。另有MW-01/02两条需要先复核历史异常。此前默认多工作流重跑仅完成准备，未形成全量执行报告，不能将其余用例计为本轮已执行。

前置卡点：MW-17第三素材引用失败；MW-21同项目F登记后，B端素材候选未命中（页面0/1素材已分析，就绪条件待定位）；MW-22已找到B翻译的静态断点，但未接入/部署真实定向故障注入，未接部分失败断言，因此仍未提交A/B目标任务。卡住步骤明确，不表示这三条的技术根因或修复方案都已验证。

按需执行 `npm run test:multi:base` 或 `npm run test:multi:compound` 时用grep限定待补跑编号，串行零重试；发生补槽按用户要求填写后继续。工作流专项与正式需求目录继续分开。核对清单保存于 `reports/multi-coverage-audit-20261103/coverage.json`。


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


## MW-24/25/26

2026-11-03 17:10–17:21，经人工登录恢复会话后，单 worker、零重试完成预发复测：

| 用例 | 结果 | 耗时 | 当前状态 |
|---|---|---:|---|
| MW-24 去口癖→中文字幕 | passed | 230.125 秒 | 默认启用 |
| MW-25 长变短→中文字幕 | passed | 231.181 秒 | 默认启用 |
| MW-26 文字水印→英文字幕 | passed | 182.280 秒 | 默认启用 |

本轮未复现原凭据错误，三条均通过现有产物数量与 video 类型断言。画面、字幕语言/同步、水印内容和时长等内容层校验不能由该结果替代。原始报告在 `reports/mw24-26-20261103-171012/`；run_id 见 [验证记录](verification.md)。

后续已补齐普通复合用例参数、前置操作、步骤和具体业务预期，以减少缺参补槽；MW-13 保留为参数冲突澄清专项。上表 MW-24/25/26 的通过记录对应旧指令，新版这三条尚未重新跑预发；本轮已验证的五条见下。详细用例见 [多工作流专项](design-cases/multi-workflow/cases.md)。

默认运行，无需强制启用阻塞用例：

```powershell
npm run test:multi:compound -- --grep 'MW-(24|25|26)\b'
```

## 优化提示词严格复测：MW-11/12/14/18/21

2026-11-03 17:50 起，单 worker、零重试执行，遇到缺参补槽即停止，不自动选择或提交答案；明确的执行计划确认单独记录。本轮实际提交目标指令的四条，均未观察到补槽或计划确认。

| 用例 | 目标指令是否提交 | 缺参补槽 | 结果 | 耗时 |
|---|---|---|---|---:|
| MW-11 生成→字幕→翻译 | 是 | 未观察到 | 未通过：run done，但仅交付 `media-info.json`，缺少中英文 SRT | 190.608 秒 |
| MW-12 完整参数正常路径探测 | 是 | 未观察到 | 未通过：交付中文字幕和英文字幕成片，缺少单独的英文 SRT | 281.013 秒 |
| MW-14 7 工作流长链路 | 是 | 未观察到 | 未通过：规划模型等待超过 60 秒，run failed，0 产物 | 234.354 秒 |
| MW-18 视频+图片水印+字幕 | 是，已补齐双附件 | 未观察到 | **通过**：`watermarked.mp4` 与 `subtitles.zh-Hans.srt.srt`，run done | 218.691 秒 |
| MW-21 跨会话素材复用 | 否 | **尚未验证** | 前置阻塞：源会话已登记素材，新会话 `@` 未命中候选；按服务端保存名复核仍阻塞 | 首次 93.461 秒；复核 93.384 秒 |

原始五条批次为 **1 passed / 4 failed（17.3 分钟）**；其中 MW-21 在业务进度中归类为前置阻塞。MW-21 名称修正后单独复核仍阻塞，未重复执行其他四条。严格复测当时未修改五条的默认 FIXME 标记；后续已按用户要求恢复 MW-18 默认执行，MW-11/12/14/21 仍默认跳过。

**边界**：MW-12 本轮未注入服务端翻译失败，只验证优化指令的正常路径，不能宣称故障恢复通过。MW-18 通过的是状态和产物数量/类型断言，水印位置/透明度、字幕同步等内容层仍需另行核验。不能由这次结果保证未来不会补槽。

证据：`reports/mw11-12-14-18-21-20261103-174823/` 下 `html/index.html`、`junit.xml`、`summary.json`、`audit/`、截图与 trace；MW-21 复核位于其 `mw21-canonical-name-recheck/` 子目录。详见 [验证记录](verification.md)。

## 本轮未通过用例：云效同步

2026-11-03 18:34，按用户要求**不去重，直接新建 4 条**，全部回读验证通过。每条含前置操作、完整提示词、逐步操作、实际/预期、回归标准和单条严格执行命令，并附详细说明及脱敏证据 JSON；未上传原始 trace 或登录态。

| 用例 | 云效缺陷 | 本地详细记录 | 当前状态 |
|---|---|---|---|
| MW-11 | [FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc) | [CINLINK-MW11-001](defects/CINLINK-MW11-001.md) | 待修复回归 |
| MW-12 | [FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b) | [CINLINK-MW12-001](defects/CINLINK-MW12-001.md) | 待修复回归 |
| MW-14 | [FWXC-246](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=514a280c2861b2903950c6783d) | [CINLINK-MW14-001](defects/CINLINK-MW14-001.md) | 待修复回归 |
| MW-21 | [FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2) | [CINLINK-MW21-001](defects/CINLINK-MW21-001.md) | 前置阻塞，待定位 |

MW-12 只报告正常路径缺少英文 SRT，服务端故障注入仍未覆盖。MW-21 仅报告素材引用前置阻塞，不认定后续字幕链路失败；需先确认作用域/候选匹配。四条仍保持默认 FIXME，启用总数未变；本次同步未新跑预发任务。

2026-11-03 补齐截图：FWXC-244（MW-11）、FWXC-245（MW-12）、FWXC-246（MW-14）各 1 张，FWXC-247（MW-21）首次与服务端保存名复核各 1 张，共 **5 张原始实测截图**。已上传到原有四条缺陷并嵌入描述，附件 ID/文件名与描述回读均通过；未新增缺陷。加上此前说明文档和脱敏 JSON 共 13 份附件。MW-21 复核截图仅展示输入状态，不能单独证明候选为空，仍须结合审计证据。

## MW-21 同项目夹具接入与复测（2026-11-03 19:04–19:06）

同项目双会话夹具已接入 `src/fixtures/project-sessions.ts`，MW-21 在正常脚本路径使用该夹具，严格审计不依赖探测开关。独立项目 P 由页面创建；A 上传指定目录的 `7MB.mp4`，发送登记消息并等待 done；通过当前项目文件接口关联原始 F，再 GET 回读 F，随后从 P 内新建空白 B，全程不在 B 上传。

本轮 **1 failed，92.364 秒**：项目登记前置已经满足，失败点为 **B 的同项目素材引用检查**。`sourceRegisteredInProject=true`、A 服务端项目归属为 P、B 草稿项目选择器和 URL 为 P、B 上传请求为 0；但输入 `@7MB` 等待 20 秒仍无候选，截图显示“暂无相关内容”。页面同时显示 **0/1 media files analyzed**，尚未确认素材分析完成是否为候选可见的额外就绪条件，根因仍待定位。目标字幕提示词未提交，无目标 run/MP4，字幕、时长、音轨与产物归属均**未验证**。当前产品在首次提交时才持久化 B，所以本次 B 只有 P 内空白草稿，不能虚构 conversation_id 或宣称已完成 A/B 服务端双归属断言。

证据：`reports/mw21-same-project-20261103-190443/` 中 `html/index.html`、`junit.xml`、`audit/MW-21.json` 和 `test-results/` 的截图/trace。该记录替代此前非项目会话探测作为本场景的最新执行结论；FIXME 保留，默认启用数量不变。前面的创建控件、接口结构、项目文件登记适配尝试保留在本机报告目录，仅作为夹具调试记录，不合并成多条业务用例结果。随后按用户要求更新现有云效 **FWXC-247**：新增原始截图、脱敏 JSON、详细说明共 3 个附件，截图已嵌入描述，描述及附件回读通过；新增缺陷为 0。同步结果见该目录 `yunxiao-result.json`。

另已修正登录脚本：复用一个可见窗口，仅在工作台输入框就绪并离开登录页后保存状态；残留认证 Cookie 不再单独算登录成功。人工登录恢复实测通过。按用户要求，后续单条预发不再每次重复整套离线测试。

## 尚未完成

MW-21 范围为**同一项目 P 内 A/B 复用素材**，指定素材与准备步骤见 [MW-21 用例](design-cases/multi-workflow/cases.md)。夹具接入和实际复测已完成，本轮阻塞在已登记 F 的 B 端候选检查；待定位候选检索/素材就绪条件后，继续验证目标字幕链路。FIXME 与启用数量统计不变。此前非项目会话结果仍只作为历史证据。

- 复合执行问题：MW-11 生成后未交付字幕；MW-12 正常路径缺少英文 SRT，且服务端故障注入仍未覆盖；MW-14 规划模型超时；MW-21 新会话素材引用前置未通过。
- MW-18 双附件已接入、无补槽复测通过并恢复默认执行；水印位置/透明度、字幕同步等内容层核验仍未覆盖。
- 基础 FIXME：MW-05 取消后同会话重提 done 但无产物。
- 卡片 FIXME：本地素材查找完整结果、暂不可用的生成解说。
- 链路 FIXME：CHAIN-05/06/13；其他设计链路仍待脚本落地。
- 批注：复测016刷新恢复、执行020/021/022、确认040失败重试UI，补当前本地39条完整结果。
- 完成已启用预发用例的新版整体回归；补G6内容层和按Job关联扣费流水证据。
- 核对历史云效提交结果。TOKEN-001 本地复测通过，未在本次任务中查询或更新云效工作项。

MW-15/16/17/19/20/22 现按用户最新指定恢复为独立按需专项，命令 `npm run test:multi:materials`；执行时填写补槽并继续，不自动并入原默认20条或预发46条。[多工作流用例](design-cases/multi-workflow/cases.md)及其 registry 独立放在 `docs/design-cases/multi-workflow/`；`docs/cases/requirements/` 只保留正式需求用例。设计用例数量不等于脚本执行集数量。
