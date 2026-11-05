# CinLink 测试用例统一入口

更新：2026-11-05。从本页查找用例正文、自动化脚本、运行命令和执行状态。各分类保留一份正文，不在本页复制操作步骤；正式需求仍放在 `requirements/`，工作流专项仍放在 `../design-cases/multi-workflow/`。

## 本地素材查找P0用例

[LF-01～17完整前置、提示词、步骤与预期](../design-cases/multi-workflow/local-footage-p0-cases.md)。共17条，全部P0；使用用户指定“素材查找”文件夹4个视频。LF-01～03已接入自动化并有头实测，**0通过/3未通过**，其他14条未执行。[执行详情与失败截图](../design-cases/multi-workflow/local-footage-results-20261104.md)。

| 用例 | 场景 | 核心检查点 | 自动化与执行状态 |
|---|---|---|---|
| LF-01 | 项目导入、分析到检索 | 4/4分析成功，含无音轨视频，机器人段可命中 | [已接脚本](../../tests/local-footage/local-footage.spec.ts)；未通过：混入留声机/飞机；[FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a) |
| LF-02 | F1音乐类素材视觉检索 | 正确定位仙人掌，源ID为F1 | [已接脚本](../../tests/local-footage/local-footage.spec.ts)；未通过：0～2秒未含仙人掌；[FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16) |
| LF-03 | F2有语音素材视觉检索 | 蓝衣男孩与仙人掌，源ID为F2 | [已接脚本](../../tests/local-footage/local-footage.spec.ts)；未通过：0～2秒未含目标；[FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16) |
| LF-04 | F3无音轨素材视觉检索 | 女孩与乌龟，不依赖ASR | 未接脚本，未执行 |
| LF-05 | F4多镜头单目标定位 | 机器人90～105秒及真实预览 | 未接脚本，未执行 |
| LF-06 | 长视频首尾边界 | 飞机0～15秒、卫星285～300秒 | 未接脚本，未执行 |
| LF-07 | 多文件中唯一目标 | 火车仅命中F4的30～45秒 | 未接脚本，未执行 |
| LF-08 | 相同画面的不同原片 | F1/F2/F3来源完整、源ID不错误合并 | 未接脚本，未执行 |
| LF-09 | 无匹配 | 足球实拍查询明确0匹配，不虚构结果 | 未接脚本，未执行 |
| LF-10 | 空白查询 | 空值/空格不提交实际检索 | 未接脚本，未执行 |
| LF-11 | 项目隔离 | Q机器人可命中，P123不泄漏Q素材 | 未接脚本，未执行 |
| LF-12 | 同项目双会话复用 | B不重传/重分析，A/B结果各自保留 | 未接脚本，未执行 |
| LF-13 | 同会话连续查询 | 同一F4由机器人改查瀑布，不残留旧时间 | 未接脚本，未执行 |
| LF-14 | 结果可用性 | 正确源片预览、候选可作当前会话输入 | 未接脚本，未执行 |
| LF-15 | 刷新恢复 | 查询/候选恢复，不重复检索或分析 | 未接脚本，未执行 |
| LF-16 | 浏览器网络异常与恢复 | 明确失败，恢复后可重新检索 | 未接脚本，未执行 |
| LF-17 | 按旁白内容定位 | 听审原句后查询F2语音片段 | 未接脚本，未执行；先听审金标 |

**数量口径：17条P0设计，3条已接自动化且实测未通过，14条PLAN/未执行。** `npm run test:footage`独立有头执行LF-01～03，单worker、零重试；原卡片套件仍7条，默认预发数量不变。真实查询仅提交3次，后续回读原run完成播放/内容核验。当前版本可返回新匹配短片，按source_file_id追溯原片；旧“done＋0结果”未复现，当前失败是结果相关性和片段定位问题。

## AI生图P0用例

[完整前置、步骤与预期](../design-cases/multi-workflow/ai-image-p0-cases.md)。共8条，全部P0；覆盖3档分辨率、5种常用比例、默认参数及同会话参数切换。每条均含卡片操作、有效参数、本轮产物、下载和像素验收。

| 用例 | 分辨率 | 图片比例 | 场景 | 自动化与执行状态 |
|---|---|---|---|---|
| IG-01 | 显式1K | 显式1:1 | 手动选择基础参数生成 | 未接脚本，本轮未执行 |
| IG-02 | 2K | 9:16 | 中档竖图生成 | 未接脚本，本轮未执行 |
| IG-03 | 4K | 16:9 | 高档横图生成 | 未接脚本，本轮未执行 |
| IG-04 | 2K不变 | 9:16 → 3:4 | 同会话切换比例 | 未接脚本，本轮未执行 |
| IG-05 | 默认1K | 默认1:1 | 不手动修改参数直接生成 | [已有脚本部分覆盖](../../tests/staging/g3-g7-cards.spec.ts)，完整验收未执行 |
| IG-06 | 1K | 4:3 | 低档横图生成 | 未接脚本，本轮未执行 |
| IG-07 | 4K | 1:1 | 高档正方形生成 | 未接脚本，本轮未执行 |
| IG-08 | 1K → 4K | 1:1不变 | 同会话切换分辨率 | 未接脚本，本轮未执行 |

**数量口径：8条文字用例，AI生图自动化仍只有1条；全部卡片自动化仍为7条。** 精确像素按当前模型规格表验收，该映射尚待补齐，不能仅凭分辨率标签判通过。本轮只补写用例，没有提交生图任务。

## 同会话单原片 SSO

[001～004本次14轮执行记录](../design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)：0补槽、3计划确认；10轮仅正文、4轮删除前已发。

完整前置、逐轮提示词及验收标准：[SSO-001～018](../design-cases/multi-workflow/same-session-original-cases.md)。每轮不@视频，纯文本明确处理最初上传的源视频F。001～004按既有顺序穿插工作流；005～008各5轮且每例固定同一工作流。009～014各5轮组合、共30轮；015～018各5轮恢复/历史交互、共20轮，四例使用同一组组合要求对照恢复方式。每轮最终一个MP4体现全部要求的效果，核验各处理分支来自F、不使用前轮产物。

| 用例 | 场景 | 脚本状态 | 当前执行状态 |
|---|---|---|---|
| SSO-001 | 2轮：英文字幕→20秒高光 | [已接入](../../tests/sso/same-session-original.spec.ts) | 2轮来源/流程/结构及抽样通过；两轮为删除前已发记录 |
| SSO-002 | 3轮：水印→增强→英文字幕 | [已接入](../../tests/sso/same-session-original.spec.ts) | 3轮来源/流程/结构及抽样通过；前2轮删除前已发，第3轮仅正文 |
| SSO-003 | 4轮：中文翻译→30秒高光→水印→增强 | [已接入](../../tests/sso/same-session-original.spec.ts) | 4轮来源/流程/结构及抽样通过；仅发送正文 |
| SSO-004 | 5轮：英文字幕→水印→增强→20秒高光→日文翻译 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮来源/流程/结构及抽样通过；仅发送正文 |
| SSO-005 | 5轮添加字幕：中文→日文→韩文→法文→西班牙文；保留原英语音轨 | [已接入](../../tests/sso/same-session-original.spec.ts) | 未通过：第4轮法文字幕混入亚美尼亚文；5轮已执行；[记录](../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)；[FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735) |
| SSO-006 | 5轮翻译配音：中文普通话→日语→韩语→法语→西班牙语；烧录对应同语字幕 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮通过；[记录](../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-007 | 5轮同工作流：文字水印R1～R5及四角位置切换 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮通过；第5轮以原run原始计划补齐来源证据；[记录](../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-008 | 5轮同工作流：高光20→30→15→25→20秒 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮通过；[记录](../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md) |
| SSO-009 | 五轮不同组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-010 | 五轮组合字幕语言切换 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，业务未通过：R4；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)；[FWXC-281](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=924be6ade88ed3f7bac77b4f7d) |
| SSO-011 | 五轮高光组合与完整原片组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-012 | 五轮组合效果扩增与缩减 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-013 | 五轮相同组合连续及间隔恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，指定范围通过；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md) |
| SSO-014 | 五轮译制组合与原英语组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮完成，业务未通过：R1；R3用户人工审核通过；5/5来源F、无串用告警；[记录](../design-cases/multi-workflow/sso009-014-five-round-results-20261104.md)；[FWXC-282](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=8f4587beeafd93082783651e90) |
| SSO-015 | 五轮完成后刷新恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次；[本批记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6) |
| SSO-016 | 五轮执行中刷新恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，服务端失败4轮，指定操作覆盖1次；[本批记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6) |
| SSO-017 | 五轮完成后关闭重开恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) | 未通过：受理5/5轮，任务失败1轮；R2媒体/API下载恢复，重开后UI认证阻塞保留；人工重新登录后续跑已完成；[本批记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)；[FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)；[FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a) |
| SSO-018 | 五轮查看历史后处理原片 | [已接入](../../tests/sso/same-session-original.spec.ts) | 5轮指定验收通过；[本批记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md) |

**001～018原片子集：18 AUTO/0 PLAN；015～018本批有头执行已结束，实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻。已接入不等同通过；017原UI认证阻塞及人工续跑分别保留。新增019～022见下节，SSO合计22条。**

- 查看全部22条脚本定义（不打开浏览器、不提交任务）：`npm run test:sso -- --list`；仅原18条加`--grep "SSO-0(0[1-9]|1[0-8])"`。
- 有头执行（会真实处理并可能计费）：`npm run test:sso`；独立配置 [playwright.sso.config.ts](../../playwright.sso.config.ts)，单worker、零重试，不并入原默认46条预发。 仅执行005～008：`npm run test:sso -- --grep 'SSO-00[5-8]'`。
 仅执行009～014：`npm run test:sso -- --grep "SSO-0(09|1[0-4])"`。 仅执行015～018：`npm run test:sso -- --grep "SSO-01[5-8]"`。
- 调试过程、证据及后续状态：[测试进度](../testing-progress.md)、[验证记录](../verification.md)。

## 同会话原片与产物穿插 SSO-019～022

[完整前置、20轮提示词与验收标准](../design-cases/multi-workflow/same-session-source-artifact-cases.md)。每例5轮均不@，按原片F与指定产物穿插处理；与001～018每轮回到F的范围分别统计。

| 用例 | 场景 | 自动化与执行状态 |
|---|---|---|
| SSO-019 | 不同工作流在原片与最近产物间切换 | [已接入](../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |
| SSO-020 | 指定历史产物，避免误用最新视频 | [已接入](../../tests/sso/same-session-original.spec.ts)；未通过，4轮通过/1未通过/0阻塞；[记录](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)；[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c) |
| SSO-021 | 同一水印工作流重复执行，验证叠加与分支隔离 | [已接入](../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |
| SSO-022 | 自然指代最近成功产物，穿插显式返回原片 | [已接入](../../tests/sso/same-session-original.spec.ts)；指定检查通过，5轮通过/0未通过/0阻塞；[记录](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md) |

SSO合计22条设计、22 AUTO/0 PLAN；新增4条共20轮。[本批执行结果与失败截图](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。仅执行这4条：`npm run test:sso:mixed`；有头、串行、零重试，不并入默认staging。001～018定义与既有结果保留。


## 剪辑配音与字幕同步P0

[完整前置、素材哈希、两轮提示词及同步验收标准](../design-cases/multi-workflow/editing-dubbing-sync-cases.md)。新增6条P0，按素材类别固定抽样；使用会话任务和下载成片验收，不依赖编辑页。

| 用例 | 场景 | 素材 | 自动化与执行状态 |
|---|---|---|---|
| [SYNC-001](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-001) | 30秒剪辑→中文配音及字幕 | 英语新闻、多镜头 | PLAN，未执行 |
| [SYNC-002](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-002) | 20秒剪辑→英语配音及字幕 | 中文竖屏产品口播 | PLAN，未执行 |
| [SYNC-003](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-003) | 中文配音及字幕→30秒剪辑 | 英语访谈、多镜头 | PLAN，未执行 |
| [SYNC-004](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-004) | 中文配音及字幕→20秒剪辑 | 日语竖屏、原带字幕 | PLAN，未执行；源语言能力执行前核对 |
| [SYNC-005](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-005) | 去口癖→英语配音及字幕 | 3处金标的受控中文人声 | PLAN，未执行；配套视频夹具待准备 |
| [SYNC-006](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-006) | 双素材18秒混剪→中文配音及字幕 | 9.45秒英语短片＋HEVC视频 | PLAN，未执行 |

**本专项0 AUTO / 6 PLAN，业务执行0条**。按用户确认的“逐句对应、无持续漂移、无截断或已删内容回流”验收，暂不设毫秒阈值。单列专项计数；原SSO仍22条，默认预发脚本数量不变。

## 正式需求用例

| 需求 | 用例正文 | 自动化映射与状态 |
|---|---|---|
| ERYE-160 计费逻辑 | [计费用例](requirements/ERYE-160/cases.md) | [正式需求登记表](registry.yaml)；按具体用例查看脚本 |
| ERYE-196 编辑器能力接入(web) | [详细用例](requirements/ERYE-196/cases.md) · [需求及评论分析](requirements/ERYE-196/analysis.md) · [前置与数据](requirements/ERYE-196/test-data.md) | 134条：M1 121/M2 13；001/003按用户确认的页面业务口径Passed（有头执行）；002/004本轮Not Applicable；005取消旧引用前置改Not Run；合计2 Passed/2 Not Applicable/130 Not Run；[本次口径与状态](requirements/ERYE-196/business-acceptance-update-20261105.md)；[首批记录](requirements/ERYE-196/results-001-005-20261105.md) · [001当前工程复测](requirements/ERYE-196/results-001-rerun-20261105.md) · [002当前工程核验](requirements/ERYE-196/results-002-20261105.md) · [003页面业务执行](requirements/ERYE-196/results-003-ui-20261105.md) · [004最新设计范围及执行证据](requirements/ERYE-196/results-004-ui-20261105.md) · [004需求/设计差异FWXC-315](../defects/CINLINK-DESIGN-ERYE196-004-001.md) · [登记表](registry.yaml) |
| ERYE-206 会话与视频工程协作 | [67条详细用例](requirements/ERYE-206/cases.md) · [正文/评论分析](requirements/ERYE-206/analysis.md) · [数据前置](requirements/ERYE-206/test-data.md) | 页面业务/真实接口结果验收；全部PLAN/Not Run；复用196底层用例，新增多工程/路由/字幕评论覆盖 |
| ERYE-210 编辑器默认TAB调整 | [54条详细用例](requirements/ERYE-210/cases.md) · [需求/最新Figma分析](requirements/ERYE-210/analysis.md) · [数据前置](requirements/ERYE-210/test-data.md) | 用户确认五入口为准；页面业务/真实接口结果验收；全部PLAN/Not Run；未确认业务边界单列 |
| ERYE-199 编辑器能力 | [编辑器用例](requirements/ERYE-199/cases.md) | [正式需求登记表](registry.yaml)；按具体用例查看脚本 |
| ERYE-237 图像编辑 | [本版144条详细用例](requirements/ERYE-237/cases.md) · [需求/指定Figma分析及测试点](requirements/ERYE-237/analysis.md) · [前置与数据](requirements/ERYE-237/test-data.md) | 全量重写，P0 95/P1 48/P2 1；全部PLAN/Not Run；批注最多10条；[登记表](registry.yaml) |

[196/206/210联合规则与复用](editor-linked-196-206-210.md) · [统一业务验收口径](editor-business-acceptance.md)。三需求255条，按页面/实际文件或真实接口业务结果验收；本次只优化，未新增执行。196为2 Passed/2 Not Applicable/130 Not Run；206/210共121条Not Run。全工程正式需求543条。

正式需求采用“一需求一目录”，各目录的 `meta.yaml` 保存来源与元数据。工作流用例不加入正式需求目录或本目录的 `registry.yaml`。

## 工作流与上下文专项

| 范围 | 用例入口 | 脚本 | 命令与范围 |
|---|---|---|---|
| 单工作流、素材方式、发送方式 | [工作流矩阵](../design-cases/14-workflow-material-paths.md) | [字幕](../../tests/staging/g3-g7-subtitle.spec.ts)、[图片水印](../../tests/staging/g3-g7-image-watermark.spec.ts)、[其他工作流](../../tests/staging/g3-g7-workflows.spec.ts) | `test:g3` / `test:watermark` / `test:flows`；矩阵设计组合不等于脚本数量 |
| 多工作流基础 MW-01～05 | [基础场景正文](../design-cases/multi-workflow/cases.md#基础场景的前置操作步骤与预期) | [基础脚本](../../tests/staging/g3-g7-multi.spec.ts) | `npm run test:multi:base`，5条 |
| 一句话多工作流 MW-06～14/18/21/23～26 | [多工作流正文](../design-cases/multi-workflow/cases.md) | [复合脚本](../../tests/staging/g3-g7-multi-compound.spec.ts) | `npm run test:multi:compound`，15条；与基础合计20条 |
| 多素材 MW-15/16/17/19/20/22 | [原编号正文](../design-cases/multi-workflow/cases.md) | [多素材脚本](../../tests/multi-material/multi-material.spec.ts) | `npm run test:multi:materials`，6条独立按需执行 |
| 同会话单原片 SSO-001～018 | [SSO正文](../design-cases/multi-workflow/same-session-original-cases.md) | [SSO脚本](../../tests/sso/same-session-original.spec.ts) | 18 AUTO/0 PLAN；015～018结果见[恢复执行记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)，其余既有结论保留 |
| 剪辑配音与字幕同步P0 | [SYNC-001～006正文](../design-cases/multi-workflow/editing-dubbing-sync-cases.md) | 未接入 | 6条P0，0 AUTO/6 PLAN，全部未执行；005视频夹具待准备 |
| AI生图P0专项 | [IG-01～08正文](../design-cases/multi-workflow/ai-image-p0-cases.md) | [IG-05默认脚本部分覆盖](../../tests/staging/g3-g7-cards.spec.ts)；其余7条未接入 | 8条P0文字用例，AI生图脚本仍1条 |
| 本地素材查找P0专项 | [LF-01～17正文](../design-cases/multi-workflow/local-footage-p0-cases.md) | [LF-01～03脚本](../../tests/local-footage/local-footage.spec.ts)，其余14条PLAN | `npm run test:footage`；独立有头3条，0通过/3未通过；[失败截图](../design-cases/multi-workflow/local-footage-results-20261104.md#失败截图) |
| 卡片入口 | [矩阵卡片章节](../design-cases/14-workflow-material-paths.md)、[脚本登记](../design-cases/15-automation-registry.md) | [卡片脚本](../../tests/staging/g3-g7-cards.spec.ts) | `npm run test:cards`，仍7条脚本，包含上述1条AI生图 |
| 跨工作流链路 | [矩阵链路章节](../design-cases/14-workflow-material-paths.md#十八链路用例跨工作流plan) | [链路脚本](../../tests/staging/g3-g7-chains.spec.ts) | `npm run test:chains`；设计链路与已接脚本分开统计 |
| CTX上下文与媒体专项 | [矩阵上下文章节](../design-cases/14-workflow-material-paths.md#十七上下文用例横向维度) | [自动化登记](../design-cases/15-automation-registry.md) | 按条目状态选取，未落地的不能当已执行 |
| MW-22前端模拟 | [模式与覆盖边界](../design-cases/multi-workflow/mw22-breakpoints.md) | [本机响应夹具](../../src/fixtures/mw22-ui-mock.ts) | `npm run test:multi:materials:ui`；不计为真实服务端部分失败通过 |

除明确的本机模拟外，预发命令可能上传真实素材、创建AI任务并消耗积分；按任务选取范围，串行执行。

旧版“转写字幕／导出字幕／查找片段”快捷入口已移除，相关旧条目已从矩阵清理；字幕及Find Local Footage的现有功能卡片继续按上表入口维护。

## 设计稿、批注与框架校验

| 范围 | 用例/规则入口 | 脚本入口 | 命令 |
|---|---|---|---|
| 首页、预览、项目、移动端、个人中心等设计稿用例 | [设计用例覆盖地图](../design-cases/00-overview.md) | [自动化登记](../design-cases/15-automation-registry.md) | 按具体模块选择，未自动化条目人工执行 |
| 视频批注 | [批注用例](../design-cases/07-video-annotation.md)、[批注脚本映射](../design-cases/07-annotation-automation.md) | [批注脚本目录](../../tests/annotation) | `npm run test:annotation` / `npm run test:annotation:staging` |
| 上传、提交及取消 G1/G2 | [脚本登记](../design-cases/15-automation-registry.md) | [G1](../../tests/staging/g1-upload.spec.ts)、[G2](../../tests/staging/g2-submit.spec.ts) | `npm run test:g1` / `npm run test:g2` |
| 离线断言与关卡 | [单元测试](../../tests/unit)、[关卡测试](../../tests/gates) | 同左 | `npm run verify`；单条调试按影响选定向检查，不每次重复全套 |

## 查状态与报告

| 内容 | 入口 | 使用口径 |
|---|---|---|
| 最新真实执行与待办 | [测试进度](../testing-progress.md) | 通过、失败、前置阻塞、未执行分开报告 |
| 历次验证与证据批次 | [验证记录](../verification.md) | 取对应批次的截图、trace、审计和下载产物 |
| 工作流脚本映射 | [自动化登记](../design-cases/15-automation-registry.md)、[MW登记](../design-cases/multi-workflow/registry.yaml) | “已接脚本”不等同“已实测通过” |
| 已有缺陷 | [本地缺陷目录](../defects) | 提交前核对状态；@缺陷本轮不重复提交 |
| Excel辅助资料 | [工作流矩阵](../design-cases/workflow-material-matrix.xlsx) | 历史汇总；SSO、AI生图P0扩展及本地素材查找P0尚未同步，以本页和各专项正文为准 |

本页统一导航与当前状态，详细步骤只在分类正文维护；执行报告保留原始批次记录。

## 约定

- ID：`<REQ前缀>-<三位序号>`，如 `ERYE237-001`；
- 一需求一目录、一前缀、一 Playwright 标签（`@ERYE-237`）；
- 用例表列：ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示；
- `自动化` 取值：`[AUTO]` / `[PLAN]` / `[FIXME]` / `[BLOCKED]`；
- 脚本落地后同步更新 `registry.yaml` 与 `cases.md` 的「脚本」列；
- `reports/design-cases.xlsx` 由 `tools/design-cases/build-xlsx.py` 汇总其支持的正文；当前尚未读取SSO独立文件，不应宣称已包含SSO。

总表分别读取正式需求、设计稿和 `docs/design-cases/multi-workflow/cases.md`，将后者标为“工作流”来源；无需为了汇总而把工作流文件放入 requirements。

## 质量要求

每条用例必须写清楚三件事，否则不算完成：

1. **前置条件**：账号/权限、数据状态、页面位置、依赖任务；
2. **操作步骤**：用 `→` 分隔动作，至少两步；含关键参数值；
3. **预期结果**：可观察、可验证；涉及金额/数量/状态时写具体值。

反例：

```text
前置：无
步骤：测试生成
预期：正常
```

正例：

```text
前置：已登录；余额 ≥ 70 积分；图片生成服务可用
步骤：打开 AI 生图 → 选 Medium/1K → 生成 1 张 → 查看结算
预期：实扣 32 积分；账本记录 operation=generate_image、pricing_version、计量=1 张
```

检查命令：

```powershell
npm run cases:check
```

会校验列数、ID 唯一、优先级、自动化标记，以及前置/步骤/预期是否为空或过短。

生成 Excel 前会自动跑一次；不通过会直接阻断 `build-xlsx.py`，不会产出半成品。
