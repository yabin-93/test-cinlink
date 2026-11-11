# CinLink 测试用例统一入口

更新：2026-11-10。从本页查找用例正文、自动化脚本、运行命令和执行状态。各分类保留一份正文，不在本页复制操作步骤；正式需求仍放在 `requirements/`，工作流专项仍放在 `../design-cases/multi-workflow/`。

## 本地素材查找P0用例

**最新状态（2026-11-10）：当前28条设计均已执行，15 Failed、13 Passed（各例限定UI/客户端/内容验证范围）、0 Not Run。** 名称查找5条P0（LF18/20/21/22/28），非名称扩展6条（LF30～35，3 P0/3 P1）。总计P0 25/P1 3，AUTO3、PLAN25；7个退役编号不计当前集合、不复用。

[最新逐例状态与报告索引](../design-cases/multi-workflow/local-footage-execution-status.md) · [完整用例步骤](../design-cases/multi-workflow/local-footage-p0-cases.md) · [本批LF18～35报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) · [历史优化版重跑](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) · [新增测试素材F5/F6](../design-cases/multi-workflow/local-footage-p0-cases.md#lf-real-media)。

新增素材：F5 `7MB.mp4`（60.50秒，1280×720，女士在旗帜前讲话）；F6 `9s.mp4`（9.45秒，1920×1080，戴黑框眼镜男子坐木桌前讲话）。路径、大小、音轨、SHA-256及用例关联见上方素材登记；关联新增11条已执行，7 Passed/4 Failed；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)。

| 用例 | 场景 | 核心检查点 | 自动化与执行状态 |
|---|---|---|---|
| LF-01 | 项目导入、分析到检索 | 4/4分析成功，含无音轨视频，机器人段可命中 | 2026-11-10 Failed；production；机器人混入留声机/飞机；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-02 | F1音乐类素材视觉检索 | 正确定位仙人掌，来源对应F1（ID可选） | 2026-11-10 Failed；production；两秒兔子片段缺仙人掌/男孩；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-03 | F2有语音素材视觉检索 | 蓝衣男孩与仙人掌，来源对应F2（ID可选） | 2026-11-10 Failed；production；两秒兔子片段缺蓝衣男孩/仙人掌；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md)；AUTO |
| LF-04 | F3无音轨素材视觉检索 | 女孩与乌龟，不依赖ASR | 2026-11-10 Failed；staging；女孩与乌龟目标漏检；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2)；PLAN |
| LF-05 | F4多镜头单目标定位 | 机器人90～105秒及真实预览 | 2026-11-10 Failed；staging；机器人混入留声机/飞机；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-06 | 长视频首尾边界 | 飞机0～15秒、卫星285～300秒 | 2026-11-10 Failed；staging；飞机/卫星两轮混入无关候选；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-07 | 多文件中唯一目标 | 火车仅命中F4的30～45秒 | 2026-11-10 Failed；staging；火车混入长颈鹿；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md)；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-08 | 相同画面的不同原片 | F1/F2/F3来源完整、原片不错误合并 | 2026-11-10 Failed；staging；58秒，漏F2/误入F4；本轮F4哈希确认；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；云效[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)；PLAN |
| LF-09 | 无匹配 | 足球实拍查询明确0匹配，不虚构结果 | 2026-11-10 Passed；staging；47秒明确无匹配、0新增候选（UI）；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)；PLAN |
| LF-10 | 空白查询 | 空值/空格不提交实际检索 | 2026-11-10 Passed；staging；空值/空格禁用发送；网络未抓取（UI）；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)；PLAN |
| LF-11 | 项目隔离 | Q机器人可命中，P123不泄漏Q素材 | 2026-11-10 Passed；staging；Q命中机器人，P123明确无匹配（UI隔离）；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-11-20261110.md)；PLAN |
| LF-12 | 同项目双会话复用 | B不重传/重分析，A/B结果各自保留 | 2026-11-10 Failed；staging；39秒，火车正确但混入长颈鹿；A历史保留；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-13 | 同会话连续查询 | 同一F4由机器人改查瀑布，不残留旧内容 | 2026-11-10 Passed；staging；44/35秒，机器人→瀑布切换及历史保留通过（UI范围）；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md)；PLAN |
| LF-14 | 结果可用性 | 正确源片预览、候选可作当前会话输入 | 2026-11-10 Failed；staging；火车可预览但混入长颈鹿；后续引用未完成确认；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-14-20261110.md)；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)；PLAN |
| LF-15 | 刷新恢复 | 查询/候选恢复，不重复检索或分析 | 2026-11-10 Passed；staging；刷新后历史/候选保留，机器人可播放；网络及手动暂存未覆盖；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-15-20261110.md)；PLAN |
| LF-16 | 浏览器网络异常与恢复 | 明确失败，恢复后可重新检索 | 2026-11-10 Passed；staging；客户端提交被阻断后明确失败，解除后重试200/43秒完成、机器人可播放；规则已清理；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-16-20261110.md)；PLAN |
| LF-17 | 按旁白内容定位 | 听审原句后查询F2语音片段 | 2026-11-10 Failed；staging；人工确认目标原句存在，单F2分析1/1，98秒明确无匹配；能力范围待确认；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-17-20261110.md)；云效[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)；PLAN |
| LF-18 | 完整文件名（两素材） | 7MB.mp4→F5、9s.mp4→F6，名称不误作处理参数 | 2026-11-10 Passed；staging；两组各36秒，F5/F6名称及播放画面正确，下载哈希均与原片一致。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-20 | 正向：唯一名称片段 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Passed；staging；正式空会话部分名称7MB一次命中F5，播放为女士及旗帜，无须澄清，无生成。另一次有历史上下文的28秒探测不计正式结论。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-21 | 正向：同时按两个名称查找 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Passed；staging；两原片分别返回，各自播放为女士及男子，未漏项、误合并或混入其他素材。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-22 | 反向：不存在的精确文件名 | 真实F5/F6；名称、内容及项目范围核对 | 2026-11-10 Failed；staging；终态已完成，但仅回复将核对、若不存在将告知，未给出文件不存在/未找到的实际结论；无新增候选，前轮F5保留。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-28 | 串联：名称查询→无结果→另一素材 | S-name F5→不存在→F6，复用LF18两组/LF22证据 | 2026-11-10 Failed；staging；36/43/36秒三轮完成，F5到F6切换及历史保留正常，但中间不存在名称仅回复将核对，未给无匹配结论；复用LF18及LF22证据。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-30 | 正向：真实女士画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；不使用文件名，唯一候选7MB.mp4，实际播放为黑外套蓝上衣女士及旗帜，未混入男子。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-31 | 正向：真实男子画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；不使用文件名，唯一候选9s.mp4，播放确认为黑框眼镜男子、木桌与电脑，无女士混入。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-32 | 反向：两真实素材均无目标 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；已由用户完整预览确认目标不存在；终态显示素材搜索未找到匹配片段，0候选，无生成。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-33 | 反向：组合条件不能拆开命中 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Failed；staging；明确要求女士及男子同一画面，却返回7MB.mp4与9s.mp4两个独立候选；逐一播放只有各自人物，未说明不满足同框条件。根因未确认。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-34 | 串联反向：排除前轮对象后改查 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Passed；staging；复用LF31前轮F6，排除男子后唯一返回F5，实际播放女士正确，男子历史仍保留；之后项目分析仍2/2，无删除或生成任务。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |
| LF-35 | 反向边界：宽泛内容描述需选择 | 不用文件名，按真实画面/组合/否定条件验收 | 2026-11-10 Failed；staging；首轮仅列F5；补充选择男子后，本轮新返回F6及不符合条件的F5，均实际播放核验，回复仍称暂不能选、将重新检索，未收敛到明确男子选择。不是仅因旧历史保留而失败。；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)；PLAN |

`npm run test:footage`已接LF01～03；本轮实际执行使用原生CUA有头操作，不冒称已运行Playwright。历史云效FWXC274/275不等同本次生产重跑提交；预发LF04/05～07已分别提交FWXC389/390，最新报告内保留链接。

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
| SSO-014 | 五轮译制组合与原英语组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) | 2026-11-10生产复测5/5轮完成、5份MP4已下载解码；R1/R3/R5人工听审正常，内部来源链路待核，整例部分验证；[本轮记录](../design-cases/multi-workflow/sso014-results-prod-20261110.md)。旧批次记录及FWXC-282保留历史，不迁移结论 |
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
| ERYE-237 图像编辑 | [144条主用例](requirements/ERYE-237/cases.md) · [执行规则](requirements/ERYE-237/execution-guide.md) · [Agent配对](requirements/ERYE-237/agent-checks.md) · [技术专项](requirements/ERYE-237/technical-checks.md) | 当前分层版：47 UI /25 Agent /72 Technical主入口，P0 95/P1 48/P2 1；新版主分支001/UI及004/UI Passed，002/003/005 Agent Failed；其余258分支Not Run、全部PLAN；[本轮报告](requirements/ERYE-237/results-001-005-layered-prod-20261109.md)。旧1 Passed/12 Failed/12 Blocked/119 Not Run仅为历史；[历史报告](requirements/ERYE-237/results-014-032-prod-20261109.md)；[登记表](registry.yaml) |

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
| 本地素材查找专项 | [当前28条正文及素材](../design-cases/multi-workflow/local-footage-p0-cases.md) | [LF-01～03脚本](../../tests/local-footage/local-footage.spec.ts)，其余25条PLAN | `npm run test:footage`仅3条；[最新逐例状态](../design-cases/multi-workflow/local-footage-execution-status.md)：已执行28条，15 Failed/13 Passed（各例限定范围）；新增11条本批7 Passed/4 Failed |
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

## 图片批注工具优先专项

[IMG-ANN-UI-001～010完整用例](../design-cases/17-image-annotation-ui.md)：使用授权生成人像，优先通过批注浮层填写提示词、添加引用及页面编辑。可在同一专用项目中使用多个独立会话，各例核对独立图片工程及源版本。以下为2026-11-09生产有头UI实测结果：**8 Passed / 1 Failed / 1 Blocked**。本专项未接入独立自动化，不计入正式543条或ERYE237的144条统计。

| 用例 | 场景 | 最新执行状态 | 报告及缺陷 |
|---|---|---|---|
| IMG-ANN-UI-001 | 单批注新增棕白小狗 | Passed | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-002 | 提交前将黑狗提示词改为白狗 | Passed | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-003 | 人物红色上衣改为蓝色 | Passed | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-004 | 移除小狗并补齐地面 | Passed | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-005 | 双批注左侧白狗、右侧红球 | Passed | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-006 | 同一批注重复添加引用 | Passed | [006～010报告](../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-007 | 浮层右上角垃圾桶移除批注及待发引用 | Passed（R3复测，旧失败撤销） | [007最新报告](../design-cases/img-ann-ui-007-results-20261109-r3.md) |
| IMG-ANN-UI-008 | 删除一条草稿批注，保留另一条并执行 | Passed | [006～010报告](../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-009 | 未发送批注保存后收起重开 | Failed：正文及自定义对象名丢失 | [缺陷记录](../defects/img-ann-ui-009-prod-20261109.md)；[FWXC-367](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8c5a17dabe849b6a8a6a56ee71) |
| IMG-ANN-UI-010 | 缩放、平移后的批注定位与编辑 | Blocked：缩放及编辑成功，平移操作待确认 | [缺陷记录](../defects/img-ann-ui-010-prod-20261109.md)；[FWXC-368](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7676dafe333fa5832e64c3441e) |

007按垃圾桶入口验收，不要求空输入框退格移除。010有ERYE-237 §3.1、§5.2及A15的平移需求依据；现有证据仅显示尝试的拖动、滚动、空格拖动未观察到平移，提交待排查缺陷不改变Blocked判定。009、010均已通过云效官方API新建，分别附2张及3张原始截图并完成正文和附件回读。

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

- [图片工具栏专项：IMG-TB-UI-001～020](../design-cases/18-image-toolbar-ui.md)：新增20条UI文字用例（P0 13/P1 7），覆盖画笔、六类形状、文字/颜色、绘制橡皮擦、撤销/放弃、模式隔离、去背景、AI擦除、宽高比、保存/导出及处理中限制；最新13 Passed/6 Failed/1 Blocked/0 Not Run；002/005关联[FWXC-369](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e6d492be908d55a9d0b86124e6)；001～005见[报告](../design-cases/img-tb-ui-001-005-results-20261109.md)，006～010均Passed见[报告](../design-cases/img-tb-ui-006-010-results-20261109.md)，011～015见[报告](../design-cases/img-tb-ui-011-015-results-20261109.md)（最新3通过/1失败/1阻塞；[013/014排查](../design-cases/img-tb-ui-013-014-investigation-20261109.md)），016～020见[报告](../design-cases/img-tb-ui-016-020-results-20261109.md)（1通过/2失败/2阻塞）；未接自动化，不计入正式543条。 016/017已同步[FWXC-371](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c0b830eb50e111cb243f475b69)、[FWXC-372](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f08ed4417846c25c3a8e038a4b)。 018[复测通过](../design-cases/img-tb-ui-018-results-20261109-r2.md)，原批报告保留历史。 020[复测失败](../design-cases/img-tb-ui-020-results-20261109-r2.md)：运行中历史入口禁用，终态恢复。 020已同步[FWXC-373](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=680b9622f88e0dbbd8a9741a3d)，截图/AX附件及正文回读通过。

### ERYE-237 2026-11-09专项反馈优化

[237正式144条用例](requirements/ERYE-237/cases.md)已结合两组UI实测更新33条操作和验收，版本2026-11-09-ui-evidence-baseline；[变更及证据映射](requirements/ERYE-237/optimization-20261109.md)。新增人像数据和实际入口规范，保留精确尺寸、双入口、平移及运行中历史可用等需求；正式6 Failed/138 Not Run不从专项状态继承，仍全PLAN。

### ERYE-237 正式014～032本轮执行

[生产有头报告](requirements/ERYE-237/results-014-032-prod-20261109.md)：1 Passed（025 UI业务）/6 Failed（014、017、018、029、030、032）/12 Blocked。正式144条累计1 Passed/12 Failed/12 Blocked/119 Not Run，仍全PLAN；3个图片任务完成、4次普通Agent请求、2份PNG、零已受理重发；未同步云效。阻塞项覆盖和操作偏差见逐例表，不将UI部分成功升级双入口或精度通过。

正式014～032三组缺陷已同步：[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)、[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)、[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)。共8图+3补充附件回读通过，原失败状态不变，详见[本轮执行报告](requirements/ERYE-237/results-014-032-prod-20261109.md)。

ERYE237-005/Agent已按用户纠正以未去背景原图重跑，最新Failed为计费输入校验失败，绿底依赖未发送；[005原图R2报告](requirements/ERYE-237/results-005-original-prod-20261109-r2.md)。001/004 UI及002/003 Agent原结果保持。

2026-11-10 LF-08～10预发：[执行报告](../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md)。1 Failed/2 Passed（UI范围），复用项目4/4就绪；LF08三个原片哈希一致但未交付匹配时间，LF09明确无匹配，LF10空值/空格禁用发送。专项最新累计8 Failed/2 Passed（UI范围）/7未执行，AUTO仍3。

2026-11-10 LF-11预发：[隔离执行报告](../design-cases/multi-workflow/local-footage-results-staging-11-20261110.md)。Q仅F4、1/1就绪，43秒命中机器人；P123仅F1～F3、3/3就绪，38秒无匹配，Passed（UI业务隔离），请求范围及内部源ID未获取。最新累计8 Failed/3 Passed（UI范围）/6未执行，AUTO3不变。

2026-11-10 LF-12预发：[执行报告](../design-cases/multi-workflow/local-footage-results-staging-12-20261110.md)。同P4新会话B一次火车查询报model HTTP 400/API version not supported，Failed；A原机器人查询及三卡未覆盖。累计9 Failed/3 Passed（UI范围）/5未执行，AUTO3不变。

2026-11-10 LF-12复测R2：[报告](../design-cases/multi-workflow/local-footage-results-staging-12-20261110-r2.md)。新B37秒完成，上次API错误未复现；火车首候选正确但混入长颈鹿，源ID/区间未取得，仍Failed；A原机器人历史保留。

2026-11-10 LF-13预发：[报告](../design-cases/multi-workflow/local-footage-results-staging-13-20261110.md)。同会话机器人40秒/瀑布32秒完成，首候选内容正确且历史保留，未见旧画面残留；匹配时间未提供、源ID未核，完整Failed，累计10 Failed/3 Passed（UI范围）/4未执行，AUTO3不变。

2026-11-10验收校正：用户确认源ID/匹配时间未证实为正式UI需求，撤销LF13仅因字段缺失的Failed，改Passed（UI连续查询及历史保留）；技术追溯未覆盖。最新累计9 Failed/4 Passed（UI范围）/4未执行，AUTO3不变。[校正报告](../design-cases/multi-workflow/local-footage-results-staging-13-20261110.md)。

2026-11-10统一校正源ID/时间验收：全部LF条目取消内部ID/时间展示硬前置，仅可选技术取证；目标实际画面/声音、来源正确性及隔离检查保留。LF08改Passed（三原片哈希及目标正确），LF12仍因长颈鹿误入Failed，LF13 Passed（连续查询）。最新8 Failed/5 Passed（UI范围）/4未执行、AUTO3不变；历史统计以上述最新口径为准。

2026-11-10 LF14预发：[报告](../design-cases/multi-workflow/local-footage-results-staging-14-20261110.md)。39秒完成，火车播放通过、混入长颈鹿Failed；@按结果名无匹配且内部名列表未可靠对应，引用未确认，不冒称功能缺失。最新9 Failed/5 Passed（UI范围）/3未执行，AUTO3不变。

2026-11-10 LF15预发：[报告](../design-cases/multi-workflow/local-footage-results-staging-15-20261110.md)。原会话刷新一次，两轮查询/四候选/40与32秒终态保留，机器人可播放，Passed（UI范围）；无新查询，网络及手动暂存未覆盖。累计9 Failed/6 Passed（UI范围）/2未执行，AUTO3不变。

名称检索已精简为5条P0：完整名称、部分名称、双文件、不存在、连续切换。原LF19合并LF18，LF23～27及LF29移出核心、均未执行，编号不复用。非名称LF30～35保持。
