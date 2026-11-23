# CinLink 测试用例统一入口

本页维护用例目录、用例正文、前置操作、步骤、预期结果、脚本和运行命令。执行结果、通过/失败统计、截图及缺陷同步明细请查看[测试进度](../testing-progress.md)、[验证记录](../verification.md)和各专项报告。

[ICP-EC-01～05电商完整用例](#icp-ecommerce-cases)（25轮原文提示词、前置和预期）。

<a id="editor-card-multitrack"></a>
## 编辑器能力补充：卡片入口与多轨组合（ERYE-199）

[ERYE199-069～116完整前置、提示词、步骤和预期](requirements/ERYE-199/cases.md#erye199-card-multitrack)。已正式归入ERYE-199，原ECMT编号仅作历史别名，不重复计数。

| 编号 | 范围 |
|---|---|
| ERYE199-069～082 | 卡片入口、原文/译文/双语模式、完整六类组合、产物与工程对应 |
| ERYE199-083～102 | 视频、独立音频、BGM、原声、译声分别分割、平移、左右裁剪及跨同类型轨移动 |
| ERYE199-103～108 | 字幕/音量隔离、视频与BGM双向联动、其他轨位置保持 |
| ERYE199-109～116 | 类型防误放、多轨选择、撤销重做、重开、项目隔离、试听导出及边界 |

视频默认仅与BGM双向强关联；其他声音和字幕不随其移动、裁剪、分割。069～075使用[原生卡片分阶段脚本](../../tools/editor/erye199/workflow-cards.mjs)，命令和检查点续跑见[自动化说明](requirements/ERYE-199/automation.md)；076～080使用[组合及六轨脚本](../../tools/editor/erye199/workflow-combinations.mjs)，081～085使用[时间轴专项脚本](../../tools/editor/erye199/run-timeline-case.mjs)，086～090使用[跨轨与独立音频脚本](../../tools/editor/erye199/run-audio-cross-track.mjs)，091～116保持PLAN，映射见[需求登记](registry.yaml)。[旧编号映射](requirements/ERYE-199/revision-multitrack-merge-20261118.md)。

<a id="editor-existing-feature-gaps"></a>
## 编辑器现有功能补充（ERYE199-117～148）

[完整前置、测试数据、步骤和预期](requirements/ERYE-199/cases.md#erye199-editor-existing-feature-gaps)。32条定义，自动化PLAN，无自动化执行命令。

| 编号 | 范围 |
|---|---|
| ERYE199-117～123 | 多选、复制、剪切粘贴、关联去重及空剪贴板 |
| ERYE199-124～128 | 快捷键焦点、文字编辑和中文输入法 |
| ERYE199-129～132 | 首尾吸附、缩放、Alt及关联组 |
| ERYE199-133～137 | 双向删除、混合删除、删除最后片段及空时间轴 |
| ERYE199-138～141 | 视频/音频占用轨、首尾相接、完全重叠及关联组 |
| ERYE199-142～145 | 普通图片片段时长、平移、叠放及副本恢复 |
| ERYE199-146～148 | 隐藏上层视频、各声音单独启用及全部静音后导出 |

用户确认：视频/BGM删除、复制、剪切粘贴也双向联动；占用位置新建同类型轨、不覆盖。旧010覆盖场景按历史保留，当前放置规则见138～141。定义和脚本登记见[需求登记表](registry.yaml)。

## 本地素材查找P0用例

当前设计28条：本地素材查找、名称检索及组合条件；自动化映射见下表。

[最新逐例状态与报告索引](../design-cases/multi-workflow/local-footage-execution-status.md) · [完整用例步骤](../design-cases/multi-workflow/local-footage-p0-cases.md) · [本批LF18～35报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) · [历史优化版重跑](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) · [新增测试素材F5/F6](../design-cases/multi-workflow/local-footage-p0-cases.md#lf-real-media)。

新增素材：F5 `7MB.mp4`（60.50秒，1280×720，女士在旗帜前讲话）；F6 `9s.mp4`（9.45秒，1920×1080，戴黑框眼镜男子坐木桌前讲话）。路径、大小、音轨、SHA-256及用例关联见上方素材登记。

| 用例 | 场景 | 核心检查点 | 自动化 / 报告入口 |
| --- | --- | --- | --- |
| LF-01 | 项目导入、分析到检索 | 4/4分析成功，含无音轨视频，机器人段可命中 | AUTO；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md) |
| LF-02 | F1音乐类素材视觉检索 | 正确定位仙人掌，来源对应F1（ID可选） | AUTO；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md) |
| LF-03 | F2有语音素材视觉检索 | 蓝衣男孩与仙人掌，来源对应F2（ID可选） | AUTO；[最新报告](../design-cases/multi-workflow/local-footage-results-prod-20261110.md) |
| LF-04 | F3无音轨素材视觉检索 | 女孩与乌龟，不依赖ASR | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md) |
| LF-05 | F4多镜头单目标定位 | 机器人90～105秒及真实预览 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md) |
| LF-06 | 长视频首尾边界 | 飞机0～15秒、卫星285～300秒 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md) |
| LF-07 | 多文件中唯一目标 | 火车仅命中F4的30～45秒 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-04-07-20261110.md) |
| LF-08 | 相同画面的不同原片 | F1/F2/F3来源完整、原片不错误合并 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) |
| LF-09 | 无匹配 | 足球实拍查询明确0匹配，不虚构结果 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md) |
| LF-10 | 空白查询 | 空值/空格不提交实际检索 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-08-10-20261110.md) |
| LF-11 | 项目隔离 | Q机器人可命中，P123不泄漏Q素材 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-11-20261110.md) |
| LF-12 | 同项目双会话复用 | B不重传/重分析，A/B结果各自保留 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) |
| LF-13 | 同会话连续查询 | 同一F4由机器人改查瀑布，不残留旧内容 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-optimized-staging-20261110.md) |
| LF-14 | 结果可用性 | 正确源片预览、候选可作当前会话输入 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-14-20261110.md) |
| LF-15 | 刷新恢复 | 查询/候选恢复，不重复检索或分析 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-15-20261110.md) |
| LF-16 | 浏览器网络异常与恢复 | 明确失败，恢复后可重新检索 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-16-20261110.md) |
| LF-17 | 按旁白内容定位 | 听审原句后查询F2语音片段 | PLAN；[最新报告](../design-cases/multi-workflow/local-footage-results-staging-17-20261110.md) |
| LF-18 | 完整文件名（两素材） | 7MB.mp4→F5、9s.mp4→F6，名称不误作处理参数 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-20 | 正向：唯一名称片段 | 真实F5/F6；名称、内容及项目范围核对 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-21 | 正向：同时按两个名称查找 | 真实F5/F6；名称、内容及项目范围核对 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-22 | 反向：不存在的精确文件名 | 真实F5/F6；名称、内容及项目范围核对 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-28 | 串联：名称查询→无结果→另一素材 | S-name F5→不存在→F6，复用LF18两组/LF22证据 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-30 | 正向：真实女士画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-31 | 正向：真实男子画面检索 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-32 | 反向：两真实素材均无目标 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-33 | 反向：组合条件不能拆开命中 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-34 | 串联反向：排除前轮对象后改查 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |
| LF-35 | 反向边界：宽泛内容描述需选择 | 不用文件名，按真实画面/组合/否定条件验收 | PLAN；[本批报告](../design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md) |

`npm run test:footage`对应LF-01～03；其余条目的操作和自动化映射见专项正文。

## AI生图P0用例

[完整前置、步骤与预期](../design-cases/multi-workflow/ai-image-p0-cases.md)。共8条，全部P0；覆盖3档分辨率、5种常用比例、默认参数及同会话参数切换。每条均含卡片操作、有效参数、本轮产物、下载和像素验收。

| 用例 | 分辨率 | 图片比例 | 场景 | 自动化 |
| --- | --- | --- | --- | --- |
| IG-01 | 显式1K | 显式1:1 | 手动选择基础参数生成 | PLAN |
| IG-02 | 2K | 9:16 | 中档竖图生成 | PLAN |
| IG-03 | 4K | 16:9 | 高档横图生成 | PLAN |
| IG-04 | 2K不变 | 9:16 → 3:4 | 同会话切换比例 | PLAN |
| IG-05 | 默认1K | 默认1:1 | 不手动修改参数直接生成 | [已有脚本部分覆盖](../../tests/staging/g3-g7-cards.spec.ts) |
| IG-06 | 1K | 4:3 | 低档横图生成 | PLAN |
| IG-07 | 4K | 1:1 | 高档正方形生成 | PLAN |
| IG-08 | 1K → 4K | 1:1不变 | 同会话切换分辨率 | PLAN |

8条文字用例；精确像素按当前模型规格表验收，不能仅凭分辨率标签代替尺寸检查。

## 同会话单原片 SSO

[001～004本次14轮执行记录](../design-cases/multi-workflow/same-session-original-interleaved-results-20261104.md)。

完整前置、逐轮提示词及验收标准：[SSO-001～018](../design-cases/multi-workflow/same-session-original-cases.md)。每轮不@视频，纯文本明确处理最初上传的源视频F。001～004按既有顺序穿插工作流；005～008各5轮且每例固定同一工作流。009～014各5轮组合、共30轮；015～018各5轮恢复/历史交互、共20轮，四例使用同一组组合要求对照恢复方式。每轮最终一个MP4体现全部要求的效果，核验各处理分支来自F、不使用前轮产物。

| 用例 | 场景 | 脚本状态 |
| --- | --- | --- |
| SSO-001 | 2轮：英文字幕→20秒高光 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-002 | 3轮：水印→增强→英文字幕 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-003 | 4轮：中文翻译→30秒高光→水印→增强 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-004 | 5轮：英文字幕→水印→增强→20秒高光→日文翻译 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-005 | 5轮添加字幕：中文→日文→韩文→法文→西班牙文；保留原英语音轨 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-006 | 5轮翻译配音：中文普通话→日语→韩语→法语→西班牙语；烧录对应同语字幕 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-007 | 5轮同工作流：文字水印R1～R5及四角位置切换 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-008 | 5轮同工作流：高光20→30→15→25→20秒 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-009 | 五轮不同组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-010 | 五轮组合字幕语言切换 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-011 | 五轮高光组合与完整原片组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-012 | 五轮组合效果扩增与缩减 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-013 | 五轮相同组合连续及间隔恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-014 | 五轮译制组合与原英语组合交替 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-015 | 五轮完成后刷新恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-016 | 五轮执行中刷新恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-017 | 五轮完成后关闭重开恢复 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-018 | 五轮查看历史后处理原片 | [已接入](../../tests/sso/same-session-original.spec.ts) |

001～018为原片子集，019～022为原片与产物穿插子集；脚本登记和执行记录分别维护。

- 查看全部22条脚本定义（不打开浏览器、不提交任务）：`npm run test:sso -- --list`；仅原18条加`--grep "SSO-0(0[1-9]|1[0-8])"`。
- 有头执行（会真实处理并可能计费）：`npm run test:sso`；独立配置 [playwright.sso.config.ts](../../playwright.sso.config.ts)，单worker、零重试，不并入原默认46条预发。 仅执行005～008：`npm run test:sso -- --grep 'SSO-00[5-8]'`。
 仅执行009～014：`npm run test:sso -- --grep "SSO-0(09|1[0-4])"`。 仅执行015～018：`npm run test:sso -- --grep "SSO-01[5-8]"`。
- 调试过程、证据及后续状态：[测试进度](../testing-progress.md)、[验证记录](../verification.md)。

## 同会话原片与产物穿插 SSO-019～022

[完整前置、20轮提示词与验收标准](../design-cases/multi-workflow/same-session-source-artifact-cases.md)。每例5轮均不@，按原片F与指定产物穿插处理；与001～018每轮回到F的范围分别统计。

| 用例 | 场景 | 自动化 |
| --- | --- | --- |
| SSO-019 | 不同工作流在原片与最近产物间切换 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-020 | 指定历史产物，避免误用最新视频 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-021 | 同一水印工作流重复执行，验证叠加与分支隔离 | [已接入](../../tests/sso/same-session-original.spec.ts) |
| SSO-022 | 自然指代最近成功产物，穿插显式返回原片 | [已接入](../../tests/sso/same-session-original.spec.ts) |

SSO-019～022共4条、每例5轮。执行命令：`npm run test:sso:mixed`；有头、串行、零重试。结果查看[专项报告](../design-cases/multi-workflow/sso019-022-source-artifact-results-20261105.md)。


## 剪辑配音与字幕同步P0

[完整前置、素材哈希、两轮提示词及同步验收标准](../design-cases/multi-workflow/editing-dubbing-sync-cases.md)。新增6条P0，按素材类别固定抽样；使用会话任务和下载成片验收，不依赖编辑页。

| 用例 | 场景 | 素材 | 自动化 |
| --- | --- | --- | --- |
| [SYNC-001](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-001) | 30秒剪辑→中文配音及字幕 | 英语新闻、多镜头 | AUTO |
| [SYNC-002](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-002) | 20秒剪辑→英语配音及字幕 | 中文竖屏产品口播 | AUTO |
| [SYNC-003](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-003) | 中文配音及字幕→30秒剪辑 | 英语访谈、多镜头 | AUTO |
| [SYNC-004](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-004) | 中文配音及字幕→20秒剪辑 | 日语竖屏、原带字幕 | AUTO |
| [SYNC-005](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-005) | 去口癖→英语配音及字幕 | 3处金标的受控中文人声 | AUTO |
| [SYNC-006](../design-cases/multi-workflow/editing-dubbing-sync-cases.md#sync-006) | 双素材18秒混剪→中文配音及字幕 | 9.45秒英语短片＋HEVC视频 | AUTO |

[执行命令](../../tools/sync/README.md) · [专项报告](../design-cases/multi-workflow/sync001006-staging-results-20261116.md)。

## 正式需求用例

| 需求 | 用例正文 | 登记 / 报告入口 |
| --- | --- | --- |
| ERYE-160 计费逻辑 | [计费用例](requirements/ERYE-160/cases.md) | [需求登记表](registry.yaml) |
| ERYE-196 编辑器能力接入(web) | [详细用例](requirements/ERYE-196/cases.md) · [需求及评论分析](requirements/ERYE-196/analysis.md) · [前置与数据](requirements/ERYE-196/test-data.md) | [执行记录](requirements/ERYE-196/execution-status-20261111.md) |
| ERYE-206 会话与视频工程协作 | [67条详细用例](requirements/ERYE-206/cases.md) · [正文/评论分析](requirements/ERYE-206/analysis.md) · [数据前置](requirements/ERYE-206/test-data.md) | [需求登记表](registry.yaml) |
| ERYE-210 编辑器默认TAB调整 | [详细用例](requirements/ERYE-210/cases.md) · [分析](requirements/ERYE-210/analysis.md) · [数据前置](requirements/ERYE-210/test-data.md) | [执行记录](requirements/ERYE-210/execution-status-current.md) |
| ERYE-199 编辑器能力 | [142条详细用例](requirements/ERYE-199/cases.md) · [多轨补充069～116](requirements/ERYE-199/cases.md#erye199-card-multitrack) · [编写范围简要说明](requirements/ERYE-199/coverage-overview.md) | [执行记录](requirements/ERYE-199/execution-status-current.md) |
| ERYE-237 图像编辑 | [详细用例](requirements/ERYE-237/cases.md) · [执行规则](requirements/ERYE-237/execution-guide.md) · [Agent配对](requirements/ERYE-237/agent-checks.md) · [技术专项](requirements/ERYE-237/technical-checks.md) | [执行规则](requirements/ERYE-237/execution-guide.md) |

[196/206/210联合规则与复用](editor-linked-196-206-210.md) · [统一业务验收口径](editor-business-acceptance.md)。按页面、实际文件或真实接口的业务结果验收。

正式需求采用“一需求一目录”，各目录的 `meta.yaml` 保存来源与元数据。工作流用例不加入正式需求目录或本目录的 `registry.yaml`。

## 工作流与上下文专项

| 范围 | 用例入口 | 脚本 | 命令与范围 |
| --- | --- | --- | --- |
| 单工作流、素材方式、发送方式 | [工作流矩阵](../design-cases/14-workflow-material-paths.md) | [字幕](../../tests/staging/g3-g7-subtitle.spec.ts)、[图片水印](../../tests/staging/g3-g7-image-watermark.spec.ts)、[其他工作流](../../tests/staging/g3-g7-workflows.spec.ts) | `test:g3` / `test:watermark` / `test:flows`；矩阵设计组合不等于脚本数量 |
| 多工作流基础 MW-01～05 | [基础场景正文](../design-cases/multi-workflow/cases.md#基础场景的前置操作步骤与预期) | [基础脚本](../../tests/staging/g3-g7-multi.spec.ts) | `npm run test:multi:base`，5条 |
| 一句话多工作流 MW-06～14/18/21/23～26 | [多工作流正文](../design-cases/multi-workflow/cases.md) | [复合脚本](../../tests/staging/g3-g7-multi-compound.spec.ts) | `npm run test:multi:compound`，15条；与基础合计20条 |
| 多素材 MW-15/16/17/19/20/22 | [原编号正文](../design-cases/multi-workflow/cases.md) | [多素材脚本](../../tests/multi-material/multi-material.spec.ts) | `npm run test:multi:materials`，6条独立按需执行 |
| 同会话单原片 SSO-001～018 | [SSO正文](../design-cases/multi-workflow/same-session-original-cases.md) | [SSO脚本](../../tests/sso/same-session-original.spec.ts) | `npm run test:sso`；[执行记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md) |
| 剪辑配音与字幕同步P0 | [SYNC-001～006正文](../design-cases/multi-workflow/editing-dubbing-sync-cases.md) | `tools/sync/run.mjs` | 6条P0；[执行命令](../../tools/sync/README.md) |
| AI生图P0专项 | [IG-01～08正文](../design-cases/multi-workflow/ai-image-p0-cases.md) | [IG-05默认脚本部分覆盖](../../tests/staging/g3-g7-cards.spec.ts)；其余7条未接入 | 8条P0文字用例，AI生图脚本仍1条 |
| 本地素材查找专项 | [当前28条正文及素材](../design-cases/multi-workflow/local-footage-p0-cases.md) | [LF-01～03脚本](../../tests/local-footage/local-footage.spec.ts)，其余25条PLAN | `npm run test:footage`；[报告入口](../design-cases/multi-workflow/local-footage-execution-status.md) |
| 卡片入口 | [矩阵卡片章节](../design-cases/14-workflow-material-paths.md)、[脚本登记](../design-cases/15-automation-registry.md) | [卡片脚本](../../tests/staging/g3-g7-cards.spec.ts) | `npm run test:cards`，仍7条脚本，包含上述1条AI生图 |
| 跨工作流链路 | [矩阵链路章节](../design-cases/14-workflow-material-paths.md#十八链路用例跨工作流plan) | [链路脚本](../../tests/staging/g3-g7-chains.spec.ts) | `npm run test:chains`；设计链路与已接脚本分开统计 |
| CTX上下文与媒体专项 | [矩阵上下文章节](../design-cases/14-workflow-material-paths.md#十七上下文用例横向维度) | [自动化登记](../design-cases/15-automation-registry.md) | 按条目状态选取，未落地的不能当已执行 |
| MW-22前端模拟 | [模式与覆盖边界](../design-cases/multi-workflow/mw22-breakpoints.md) | [本机响应夹具](../../src/fixtures/mw22-ui-mock.ts) | `npm run test:multi:materials:ui`；不计为真实服务端部分失败通过 |

除明确的本机模拟外，预发命令可能上传真实素材、创建AI任务并消耗积分；按任务选取范围，串行执行。

旧版“转写字幕／导出字幕／查找片段”快捷入口已移除，相关旧条目已从矩阵清理；字幕及Find Local Footage的现有功能卡片继续按上表入口维护。

## 设计稿、批注与框架校验

| 范围 | 用例/规则入口 | 脚本入口 | 命令 |
| --- | --- | --- | --- |
| 首页、预览、项目、移动端、个人中心等设计稿用例 | [设计用例覆盖地图](../design-cases/00-overview.md) | [自动化登记](../design-cases/15-automation-registry.md) | 按具体模块选择，未自动化条目人工执行 |
| 视频批注 | [批注用例](../design-cases/07-video-annotation.md)、[批注脚本映射](../design-cases/07-annotation-automation.md) | [批注脚本目录](../../tests/annotation) | `npm run test:annotation` / `npm run test:annotation:staging` |
| 上传、提交及取消 G1/G2 | [脚本登记](../design-cases/15-automation-registry.md) | [G1](../../tests/staging/g1-upload.spec.ts)、[G2](../../tests/staging/g2-submit.spec.ts) | `npm run test:g1` / `npm run test:g2` |
| 离线断言与关卡 | [单元测试](../../tests/unit)、[关卡测试](../../tests/gates) | 同左 | `npm run verify`；单条调试按影响选定向检查，不每次重复全套 |

## 查状态与报告

[从统一入口移出的历史执行记录](history/unified-entry-execution-notes-20261117.md)。

| 内容 | 入口 | 使用口径 |
| --- | --- | --- |
| 最新真实执行与待办 | [测试进度](../testing-progress.md) | 通过、失败、前置阻塞、未执行分开报告 |
| 历次验证与证据批次 | [验证记录](../verification.md) | 取对应批次的截图、trace、审计和下载产物 |
| 工作流脚本映射 | [自动化登记](../design-cases/15-automation-registry.md)、[MW登记](../design-cases/multi-workflow/registry.yaml) | “已接脚本”不等同“已实测通过” |
| 已有缺陷 | [本地缺陷目录](../defects) | 提交前核对状态；@缺陷本轮不重复提交 |
| Excel辅助资料 | [工作流矩阵](../design-cases/workflow-material-matrix.xlsx) | 历史汇总；SSO、AI生图P0扩展及本地素材查找P0尚未同步，以本页和各专项正文为准 |

本页维护用例定义与导航；执行结果、统计和缺陷同步记录在对应报告中维护。

## 约定

- ID：`<REQ前缀>-<三位序号>`，如 `ERYE237-001`；
- 一需求一目录、一前缀、一 Playwright 标签（`@ERYE-237`）；
- 用例表列：ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示；
- `自动化` 取值：`[AUTO]` / `[PLAN]` / `[FIXME]` / `[BLOCKED]`；
- 脚本落地后同步更新 `registry.yaml` 与 `cases.md` 的「脚本」列；
- `reports/design-cases.xlsx` 由 `tools/design-cases/build-xlsx.py` 汇总其支持的正文；当前尚未读取SSO独立文件，不应宣称已包含SSO。

总表分别读取正式需求、设计稿和 `docs/design-cases/multi-workflow/cases.md`，将后者标为“工作流”来源；无需为了汇总而把工作流文件放入 requirements。

## 图片批注工具优先专项

[IMG-ANN-UI-001～010完整用例](../design-cases/17-image-annotation-ui.md)：使用授权生成人像，优先通过批注浮层填写提示词、添加引用及页面编辑。可在同一专用项目中使用多个独立会话，各例核对独立图片工程及源版本。

| 用例 | 场景 | 报告入口 |
| --- | --- | --- |
| IMG-ANN-UI-001 | 单批注新增棕白小狗 | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-002 | 提交前将黑狗提示词改为白狗 | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-003 | 人物红色上衣改为蓝色 | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-004 | 移除小狗并补齐地面 | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-005 | 双批注左侧白狗、右侧红球 | [001～005报告](../design-cases/img-ann-ui-001-005-results-20261109.md) |
| IMG-ANN-UI-006 | 同一批注重复添加引用 | [006～010报告](../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-007 | 浮层右上角垃圾桶移除批注及待发引用 | [007最新报告](../design-cases/img-ann-ui-007-results-20261109-r3.md) |
| IMG-ANN-UI-008 | 删除一条草稿批注，保留另一条并执行 | [006～010报告](../design-cases/img-ann-ui-006-010-results-20261109.md) |
| IMG-ANN-UI-009 | 未发送批注保存后收起重开 | [缺陷记录](../defects/img-ann-ui-009-prod-20261109.md) |
| IMG-ANN-UI-010 | 缩放、平移后的批注定位与编辑 | [缺陷记录](../defects/img-ann-ui-010-prod-20261109.md) |

007按垃圾桶入口验收，不要求空输入框退格移除；010平移验收依据见ERYE-237 §3.1、§5.2及A15。

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

## 图片工具栏专项

[IMG-TB-UI-001～020完整用例](../design-cases/18-image-toolbar-ui.md)：覆盖画笔、形状、文字和颜色、擦除、撤销、模式隔离、去背景、宽高比及保存导出；前置、步骤与预期在专项正文维护。

## 需求补充与变更资料

[ERYE-237优化定义及证据映射](requirements/ERYE-237/optimization-20261109.md) · [本地素材查找完整定义](../design-cases/multi-workflow/local-footage-p0-cases.md)。编号调整和退役规则见对应正文，历史执行记录见报告入口。

<!-- ICP-EC-DINGTALK-20261116 -->
<a id="icp-ecommerce-cases"></a>

## ICP 电商工作流用例（Case 01～05）

来源：钉钉《ICP工作流模拟》“电商场景”工作表，Case 01～05。用户已限定本轮仅此5例；其他工作表不纳入执行。

[当前测试进度与失败原图](../design-cases/icp-workflows/execution-status-current.md)

每例在本批专用测试项目中新建独立会话，源素材可以复用，编辑结果不能串用。每例包括一次完整首次制片指令和四轮原表后续修改，原始提示词保留如下。前置资料接收不计制片轮次。

验收以页面交付、实际图片/视频、正确来源与未指定内容不变为准。遇补槽填写后沿原任务继续；遇明确失败先保存原图。后续提示词中的错误属于原表假设，先核对是否实际触发；未发生的错误不直接记缺陷。没有首稿时，依赖首稿的后续步骤记未执行，不能用无关产物代替。

自动化：`tools/icp/run.mjs`、`tools/icp/driver.mjs`；真实结果独立记录在本目录执行报告，不以脚本存在或准备素材成功代替通过。

| 编号 | 原表 | 场景 | 自动化 |
| --- | --- | --- | --- |
| [ICP-EC-01](#icp-ec-01) | 电商Case 01 | DTC 电动自行车广告投手 | AUTO |
| [ICP-EC-02](#icp-ec-02) | 电商Case 02 | 女装 shopify独立站运营 | AUTO |
| [ICP-EC-03](#icp-ec-03) | 电商Case 03 | 品牌的社媒运营岗 | AUTO |
| [ICP-EC-04](#icp-ec-04) | 电商Case 04 | 准备进军墨西哥市场的自行车DTC品牌运营 | AUTO |
| [ICP-EC-05](#icp-ec-05) | 电商Case 05 | Amazon 美国站手持吸尘器小家电drop shipping 卖家 | AUTO |

<a id="icp-ec-01"></a>

### ICP-EC-01：DTC 电动自行车广告投手

原表定位：电商场景!A2:B16；首次提示词 B5。

前置操作：

1. 登录生产环境，在本批专用项目中新建本例独立会话。
2. 准备约10分钟ADO Air 20 Ultra 2025真实测评、副片段/产品图3张、已确认卖点、官方Logo、CTA Shop Now。完整测评保存副本和原网址必须对应同一型号；核验时长、画面、声音及来源。
3. 上传后核对文件名、SKU/型号、图片及视频预览；在本例填写完整提示词，一次发送首次制片要求。

**Input（B4）**

10 分钟达人 UGC 测评视频，包含产品介绍、骑行体验、真实评价等。
3–5 段产品补充图片视频：产品全景、折叠过程、骑行展示等。（我自己在条件有限下拍摄的）
产品卖点资料：折叠功能、重量、续航里程等真实参数。
品牌 Logo、CTA、1–2 条参考爆款视频。

**首次 Prompt（B5）**

```text
我是一名 DTC 电动自行车品牌的广告投手。请分析上传的达人测评视频和产品素材，帮我制作 3 条 20–30 秒的 9:16 竖屏广告，每条使用不同的开头：
A：便携性卖点。突出普通自行车在日常收纳、携带时的不方便，再展示这款电动自行车的折叠功能。
B：续航卖点。突出用户担心电动自行车电量不够的问题，再展示产品的续航能力和实际骑行画面。
C：真实体验。直接使用达人在视频中的真实评价作为开头，展示他的实际骑行体验。
请尽量使用原视频中的真实画面，找到适合的片段进行剪辑，并添加英语字幕、背景音乐和结尾 CTA。
要求三条广告的开头明显不同，产品展示清楚，节奏紧凑。不要编造用户评价、产品功能、续航数据或优惠信息。
```

**首稿预期（B6）**

三条 20–30 秒、9:16 的广告初稿，分别突出便携性、续航和达人真实体验，包含英语字幕、产品展示和结尾 CTA

**人工干预假设 1：素材调整（B7）**

```text
第一条广告的开头不够吸引人，请重新查看已有素材，找一个更能展示电动自行车折叠功能的镜头，替换前 3 秒。后面的内容不要改动
```

**人工干预假设 2：精准修改（B8）**

```text
第二条广告结尾的 CTA 不合适，请只把结尾文字改成“Shop Now”，其他画面、字幕和音乐保持不变
```

**人工干预假设 3：语义纠正（B9）**

```text
第三条广告把达人的评价剪得有歧义，和他原本表达的意思不一样。请重新查看原视频，调整这部分剪辑，保留达人完整的真实意思，不要改变其他已经完成的内容。
```

**人工干预假设 4：AI补充镜头（B10）**

```text
第一条广告如果找不到合适的折叠展示镜头，请尝试用 AI 生成一段 3 秒的电动自行车折叠画面，并替换原来的开头。
要求生成的自行车外观、颜色和折叠结构与真实产品一致，不能生成实际产品做不到的动作。
```

**Output（B11）**

三条完整的 20–30 秒、9:16 竖屏广告，可用于 Meta / TikTok 广告素材测试。
三条视频具有不同开头，产品信息、达人评价和英语字幕准确，包含品牌 Logo 和 CTA，经过修改后能够正常导出

执行与预期核验：

1. 首次任务结束后，逐一核验原表首稿数量、时长、比例、产品/人物/字幕/声音和可编辑交付；下载或实际播放核验，不能只看完成状态。
2. 对四轮修改，先确认目标版本与原表假设是否匹配，再一次提交该轮完整原提示词；补槽记录问题和填写值，沿该轮原任务继续。
3. 每轮核验指定修改真实生效，其余版本、其他SKU、非目标镜头/字幕/音乐保持；对照源素材检查无串料、无编造。
4. 按Output核验最终交付和可导出性；失败截图保存本批目录，依赖前置失败导致未执行的轮次单列。


<a id="icp-ec-02"></a>

### ICP-EC-02：女装 shopify独立站运营

原表定位：电商场景!A17:B31；首次提示词 B20。

前置操作：

1. 登录生产环境，在本批专用项目中新建本例独立会话。
2. 准备10个不同商品SKU的正面图、对应实拍视频、SKU03补充视角、SKU对照表、虚构AI女模参考和Logo。SKU10只给正面图及2秒正面视频。单次最多20素材：先在本例会话载入5份公共参考并要求暂不生成，确认接收后，再在首次制片指令中附10图+10视频；仍使用全部25份素材，不减少SKU。商品名/颜色/对应视频须按真实商品ID核对，未知材质不推测。
3. 上传后核对文件名、SKU/型号、图片及视频预览；在本例填写完整提示词，一次发送首次制片要求。

**Input（B19）**

10 款新品的零散视频素材：包含商品正面、背面、细节等拍摄内容，不同款式的素材完整程度可能不同。
10 款商品图片：每款至少一张清晰正面图，部分提供侧面、背面和细节图。
10 款产品 SKU 对照表：商品名称、颜色、版型、长度、材质、设计特点和对应素材文件名。
品牌 Logo、品牌视觉风格参考、1–2 张参考成品图或视频。
AI 女模形象参考图。
目标渠道：Shopify 店铺商品详情页。

**首次 Prompt（B20）**

```text
我是一家 Shopify 女装独立站的运营，最近有 10 款女装新品需要上架，但目前只有一些零散的商品图片和拍摄视频，没有完整的真人模特展示素材。
我希望你根据上传的商品素材，帮我一次性制作 10 款女装的 AI 模特上身展示图，以及每款对应的一条 5–10 秒商品展示视频，用于 Shopify 商品详情页。
具体要求：
1. 先整理商品和素材
请先查看我上传的全部素材，根据 SKU 对照表，将图片、视频和商品信息正确匹配到对应的 10 款服装，确保不会把不同款式的素材混在一起。

2. 制作 AI 模特上身图
根据提供的 AI 女模参考图，让同一位 AI 女模分别穿上这 10 款服装，每款生成一张清晰的全身展示图。
要求：
服装的颜色、版型、长度、领口、袖子、印花等尽量与原商品一致。
不要随意改变服装设计，也不要添加原商品没有的细节。
模特形象、背景、光线和整体拍摄风格保持统一。
图片要清晰、自然，重点展示服装本身。
图片优先使用 4:5 比例。

3. 制作商品展示视频
基于每款服装的 AI 模特上身图和已有商品素材，分别制作一条 5–10 秒的展示视频。
要求：
模特先正面展示服装，再通过自然的站姿变化、侧身或转身动作展示服装。
尽量展示服装整体版型、穿着效果和重要设计细节。
模特动作自然，不要出现手脚变形、衣服扭曲等明显问题。
10 款视频的模特、背景、光线和整体风格保持一致。
每条视频中的服装必须与对应的商品图片一致。
视频优先使用适合店铺商品页的 4:5 比例。

4. 其他要求
每款商品单独生成图片和视频，不要把 10 款混成一条视频。
如果某款商品素材不足，请告诉我缺少什么，不要自行编造服装设计。
如果某项要求无法完成，请明确说明，不要直接跳过。
最终按 SKU01–SKU10 分别整理好对应的图片和视频，方便我上传到店铺。

请尽可能完成整个制作流程。
```

**首稿预期（B21）**

10 款新品各生成一张 AI 女模上身图和一条 5–10 秒展示视频，共 20 个成品。
要求商品不混淆、服装外观准确、模特及画面风格统一、图片和视频能够一一对应

**人工干预假设 1：素材调整（B22）**

```text
SKU03 生成的模特上身图和展示视频没有正确还原服装细节，部分镜头与实际产品不符。请重新检索 SKU03 对应的正面、侧面和背面素材，优先使用能够清晰展示服装整体版型和细节的素材，重新生成这款产品的上身图及视频。其他 9 款商品保持不变。
```

**人工干预假设 2：精准修改（B23）**

```text
SKU05 的展示视频中模特动作太快，无法看清服装整体版型。请仅将这条视频调整为 8 秒，前 3 秒展示正面全身，中间 3 秒缓慢转身展示侧面，最后 2 秒突出服装细节。保持原有模特形象、服装和背景风格不变，其他 SKU 的图片和视频不要修改。
```

**人工干预假设 3：风格统一（B24）**

```text
目前生成的 10 款商品图片和视频，模特长相、背景、光线和画面风格不太一致，放在同一个店铺里看起来不够统一。
请以 SKU01 的模特形象和画面风格为参考，将其他 9 款商品统一成相同的模特、背景和拍摄风格。
不要改变各款服装本身的设计，并确保每款商品的图片和视频看起来是同一套风格。
```

**人工干预假设 4：AI补充镜头（B25）**

```text
SKU10 目前只有正面服装图片和正面拍摄视频，但我希望 AI 模特能够完成一个转身动作，展示服装背面效果。请判断现有素材是否足以准确生成背面设计。如果无法确认，请明确告诉我还需要补充哪些素材，不要自行编造服装背面的结构和细节。同时尽可能基于现有素材完成可用的上身图和展示视频。
```

**Output（B26）**

10 款 SKU 分别交付：
10 张 AI 女模上身展示图。
10 条对应的 5–10 秒商品展示视频。
商品款式、颜色、版型和主要设计细节准确。
全部图片与视频的模特形象、背景、光线和整体风格统一。
每款商品的图片和视频一致，不混淆、不遗漏。
支持在 CinLink 内继续修改，最终能够分别导出并用于 Shopify 商品详情页。

执行与预期核验：

1. 首次任务结束后，逐一核验原表首稿数量、时长、比例、产品/人物/字幕/声音和可编辑交付；下载或实际播放核验，不能只看完成状态。
2. 对四轮修改，先确认目标版本与原表假设是否匹配，再一次提交该轮完整原提示词；补槽记录问题和填写值，沿该轮原任务继续。
3. 每轮核验指定修改真实生效，其余版本、其他SKU、非目标镜头/字幕/音乐保持；对照源素材检查无串料、无编造。
4. 按Output核验最终交付和可导出性；失败截图保存本批目录，依赖前置失败导致未执行的轮次单列。


<a id="icp-ec-03"></a>

### ICP-EC-03：品牌的社媒运营岗

原表定位：电商场景!A32:B46；首次提示词 B35。

前置操作：

1. 登录生产环境，在本批专用项目中新建本例独立会话。
2. 准备300秒、16:9的产品介绍测试输入，含真实产品展示/讲解、英语字幕与品牌结尾；保留ADO Logo和产品事实。该输入是在本机从真实公开素材预制，不能计为CinLink生成成果。
3. 上传后核对文件名、SKU/型号、图片及视频预览；在本例填写完整提示词，一次发送首次制片要求。

**Input（B34）**

一条 5分钟、16:9 的横版产品介绍视频，包含产品展示、功能演示、字幕和品牌结尾。
产品基本信息和品牌 Logo（如原视频中没有）
目标渠道：Instagram Reels、TikTok、Shopify 商品详情页

**首次 Prompt（B35）**

```text
我是一名品牌社媒运营，现在有一条已经制作好的 5分钟的横版产品视频，希望你帮我改成适合不同平台的三个版本：
A：Instagram Reels 版本
调整成 9:16 竖屏，时长控制在 20–30 秒。
保留原视频中最好的产品展示镜头和主要卖点。
保持品牌原有的画面风格，整体看起来简洁、精致。
调整字幕和产品位置，确保竖屏下都能完整看到。

B：TikTok 版本
调整成 9:16 竖屏，时长控制在 15–20 秒。
开头 2–3 秒直接展示产品最吸引人的功能或使用效果。
适当加快剪辑节奏，删掉不重要的内容。
添加清晰的英语字幕和结尾 CTA。

C：Shopify 商品详情页版本

保留 16:9 横屏，时长控制在 25–30 秒。
重点展示产品外观、主要功能和实际使用过程。
保留必要的产品介绍和品牌信息。
即使静音播放，也能通过画面和文字看懂产品的主要特点。

其他要求：
请优先使用原视频中的真实画面，不要随意改变产品外观和功能。
横屏转竖屏时，尽量保证产品主体完整，不要把产品的重要部分裁掉。
如果原画面不适合直接裁成竖屏，可以尝试用 AI 补充缺失的背景，让画面看起来自然，但不要改变产品本身。
三个版本分别制作，保留各自适合的平台风格，并支持后续单独修改和导出。
```

**首稿预期（B36）**

三条适合不同渠道的视频初稿：

A：一条 20–30 秒的 9:16 Instagram Reels 视频。
B：一条 15–20 秒的 9:16 TikTok 视频。
C：一条 25–30 秒的 16:9 Shopify 商品详情页视频。
三个版本的画面比例正确、产品展示完整、字幕清晰，并且内容符合各自平台的使用场景。

**人工干预假设 1：画面调整（B37）**

```text
Reels 版本里有几个产品展示镜头被裁掉了一部分，导致产品看起来不完整。请重新调整这些镜头的画面位置和大小，让产品能够完整显示。如果竖屏空间不够，可以尝试用 AI 补充周围的背景。保持产品本身不变，其他已经正常的镜头不要修改。
```

**人工干预假设 2：AI 补充画面纠错（B38）**

```text
TikTok 版本有一个镜头使用 AI 补充了背景，但生成的画面出现了原视频中没有的产品配件，产品外观也和真实商品不太一样。请重新对照原视频，修正这部分画面。AI 只能补充周围环境，不能随意改变产品的颜色、外观和配件。如果无法准确补全，请使用原画面搭配模糊背景等方式，保证产品本身真实。
```

**人工干预假设 3：精准修改（B39）**

```text
TikTok 版本的开头不够吸引人，而且整体节奏有点慢。请把原视频中最能体现产品使用效果的镜头放到前 3 秒，并删除部分不重要的介绍，将视频控制在 15 秒左右。Reels 和 Shopify 两个版本保持不变。
```

**人工干预假设 4：字幕和画面位置调整（B40）**

```text
Reels 和 TikTok 版本的部分字幕太靠下，发布后可能会被平台的按钮和文字挡住。另外，部分镜头的产品主体也比较靠边。
请分别调整这两个版本的字幕和产品位置，让重要内容完整显示在画面中间的安全区域。不要改变视频原本的内容和剪辑顺序，Shopify 版本保持不变。
```

**Output（B41）**

三条可分别用于 Instagram Reels、TikTok 和 Shopify 商品详情页的视频：

Reels：20–30 秒、9:16，画面完整，品牌风格统一。
TikTok：15–20 秒、9:16，开头吸引人，节奏紧凑。
Shopify：25–30 秒、16:9，清楚展示产品及主要功能。
三条视频的产品外观和信息准确，没有明显的画面裁切、AI 生成错误或字幕遮挡问题。
所有版本可以在 CinLink 内单独修改并正常导出。

执行与预期核验：

1. 首次任务结束后，逐一核验原表首稿数量、时长、比例、产品/人物/字幕/声音和可编辑交付；下载或实际播放核验，不能只看完成状态。
2. 对四轮修改，先确认目标版本与原表假设是否匹配，再一次提交该轮完整原提示词；补槽记录问题和填写值，沿该轮原任务继续。
3. 每轮核验指定修改真实生效，其余版本、其他SKU、非目标镜头/字幕/音乐保持；对照源素材检查无串料、无编造。
4. 按Output核验最终交付和可导出性；失败截图保存本批目录，依赖前置失败导致未执行的轮次单列。


<a id="icp-ec-04"></a>

### ICP-EC-04：准备进军墨西哥市场的自行车DTC品牌运营

原表定位：电商场景!A47:B61；首次提示词 B50。

前置操作：

1. 登录生产环境，在本批专用项目中新建本例独立会话。
2. 准备35秒、9:16的英语产品广告测试输入，包含英语原声、烧录英语字幕、独立英语卖点字样和Shop Now CTA、背景音乐。品牌及型号ADO/Air 20 Ultra不翻译；输入是本机从真实公开素材预制，保留音乐署名和来源。
3. 上传后核对文件名、SKU/型号、图片及视频预览；在本例填写完整提示词，一次发送首次制片要求。

**Input（B49）**

一条 30–40 秒、9:16 的英语产品广告，包含英语配音、英语字幕（原视频中部分英语文字已经直接加在画面上，不能简单关闭，用来测试 AI 能否替换）、产品展示、背景音乐和品牌结尾。
原视频英语文案及产品 Selling Points，方便检查翻译是否准确（如有，没有也行）
告知AI 品牌 Logo、产品名称及不能翻译的品牌词汇。
告知AI 目标市场：墨西哥，使用当地习惯的西班牙语

**首次 Prompt（B50）**

```text
我是一名 DTC 电动自行车品牌的海外营销运营，现在需要把上传的英语产品广告制作成适合墨西哥市场的西班牙语版本。
请直接使用原视频的画面，帮我完成以下工作：
将视频中的英语配音翻译成自然、符合墨西哥用户表达习惯的西班牙语，并替换成西语配音。声音自然，语速不要太快，不需要模仿原配音者的声音。
将原来的英语字幕全部替换成西班牙语字幕，确保翻译准确，字幕出现的时间和配音一致。
将画面中的除字幕以外的英语卖点文字、标题和结尾 CTA 一并替换成西班牙语，例如将“Shop Now”改成“Compra ahora”。
尽量保留原来的产品镜头、剪辑顺序、背景音乐和品牌风格，不要随意改变产品画面。
如果西班牙语句子比英语长，可以适当调整字幕显示时间或配音速度，但要保证听起来自然，也不要让字幕挡住产品。
产品名称、品牌名称保持原样，不要编造产品功能、续航数据、价格或促销活动。
把背景音乐更换为符合西语市场的音乐

请制作一条完整的西班牙语广告视频，时长尽量与原视频一致。
```

**首稿预期（B51）**

一条 30–40 秒、9:16 的西班牙语广告视频，包含完整的西语配音、西语字幕和西语画面文字。

保留原视频的产品画面、品牌风格，配音自然，字幕与声音同步，没有残留的英语文字。更换为符合西语市场的背景音乐

**人工干预假设 1：翻译纠正（B52）**

```text
视频中有一处产品功能翻译错误。原视频说的是“Foldable Electric Bike”，意思是可折叠电动自行车，但西语版本翻译得不准确，让用户误以为自行车可以拆卸。请重新检查这一段的原文，将产品功能正确翻译成西班牙语，并同步修改对应的配音和字幕。其他内容不要改变。（这里如果西语看不懂，让这个任务变成翻译中文也行）
```

**人工干预假设 2：精准修改（B53）**

```text
视频结尾的西语 CTA 不太符合我们想要的表达方式。请只将结尾的“Compra ahora”修改为“Descubre más”，并同步修改结尾配音和画面文字，其他镜头、字幕、音乐和配音内容保持不变。
```

**人工干预假设 3：配音与画面同步（B54）**

```text
西语版本中有几段配音和产品展示画面对不上。例如视频已经切换到折叠功能展示，但配音还在介绍上一段内容。请调整这几段西语配音的时间，让语音介绍和对应的产品画面保持一致。不要为了赶时间把语速加得太快，也不要修改其他正常的内容。
```

**人工干预假设 4：画面英语文字替换（B55）**

```text
视频中还有几处原本就加在画面里的英语文字没有替换，例如“Long Battery Life”和“Easy to Fold”。
请把这些英语文字替换成对应的西班牙语，并尽量保持原来的字体风格、位置和动画效果。不要让新文字挡住产品，也不要破坏文字后面的画面。
如果无法直接替换，请告诉我，并尝试使用自然的文字遮盖等方式完成修改。
```

**Output（B56）**

一条完整的 30–40 秒、9:16 西班牙语广告视频：

英语配音已经替换成自然的墨西哥西班牙语配音。
所有字幕和画面中的英语卖点文字已经替换成西语。
西语配音、字幕与产品展示画面同步。
品牌名称、产品信息及实际功能准确，没有错误翻译。
保留原有产品镜头和品牌风格。
背景音乐替换成符合西语市场风格的音乐
可以在 CinLink 内继续修改并正常导出，用于墨西哥市场的 TikTok / Meta 广告素材测试

执行与预期核验：

1. 首次任务结束后，逐一核验原表首稿数量、时长、比例、产品/人物/字幕/声音和可编辑交付；下载或实际播放核验，不能只看完成状态。
2. 对四轮修改，先确认目标版本与原表假设是否匹配，再一次提交该轮完整原提示词；补槽记录问题和填写值，沿该轮原任务继续。
3. 每轮核验指定修改真实生效，其余版本、其他SKU、非目标镜头/字幕/音乐保持；对照源素材检查无串料、无编造。
4. 按Output核验最终交付和可导出性；失败截图保存本批目录，依赖前置失败导致未执行的轮次单列。


<a id="icp-ec-05"></a>

### ICP-EC-05：Amazon 美国站手持吸尘器小家电drop shipping 卖家

原表定位：电商场景!A62:B74；首次提示词 B65。

前置操作：

1. 登录生产环境，在本批专用项目中新建本例独立会话。
2. 准备BLACK+DECKER HHVK515JP07的5张官方同款图片（整体/侧面、配件、吸头、集尘盒、手持使用）、已确认卖点和兼容图片格式Logo；不提供任何现成视频及背面/底部图。正文明确禁止编造吸力、续航和折扣。
3. 上传后核对文件名、SKU/型号、图片及视频预览；在本例填写完整提示词，一次发送首次制片要求。

**Input（B64）**

5 张产品图片：产品正面、侧面、吸头特写、集尘盒特写、手持展示图。
商品卖点资料：产品功能、尺寸、配件、使用方式等已确认的信息。
品牌 Logo、1–2 条参考广告。
目标渠道：Amazon 美国站 Sponsored Brands Video 广告，16:9 横屏。
特别设置：没有任何现成视频，也没有产品背面和底部的照片，用来测试 AI 在素材不够时会怎么处理。

**首次 Prompt（B65）**

```text
我是一名 Amazon 美国站的手持吸尘器卖家，现在只有几张商品图片和产品介绍，没有拍摄好的产品视频。

我希望你根据现有素材，帮我制作一条 20 秒、16:9 的产品广告视频。

具体要求：
先查看上传的商品图片和产品介绍，了解产品的真实外观、配件和主要功能。
视频开头展示产品整体外观，可以让静态图片中的产品产生自然的镜头运动，让用户看清产品。
根据现有图片，尝试用 AI 生成模特（或手部模特）手持产品在桌面清洁碎屑、手持使用等场景。如果素材无法确认实际使用方式，请先告诉我，不要随意生成不符合产品真实功能的画面。
中间重点展示产品吸头、集尘盒等已经提供素材的部分，让用户了解产品的特点。
添加简短的英语卖点文字，最后展示品牌 Logo。
整体风格简洁、真实，适合 Amazon 商品广告。即使没有声音，用户也能看懂视频内容。
生成画面中的产品外观、颜色、按钮、吸头和配件必须与真实商品一致，不要添加不存在的结构。
不要编造吸力数据、续航时间或其他未经证实的产品效果。
请尽量使用现有图片生成需要的动态画面，并完成整条广告。如果某些镜头无法准确生成，请告诉我原因，并尝试其他不改变真实产品的展示方式。
```

**首稿预期（B66）**

一条 20 秒、16:9 的产品广告视频。

包含产品整体展示、AI 生成的动态镜头、AI生成的模特手持产品展示的动态镜头、产品细节展示和品牌收尾。画面中的产品外观与真实商品一致，不能出现明显变形、错误配件或虚假的功能展示。

**人工干预假设 1：产品外观修正（B67）**

```text
视频中 AI 生成的吸尘器和原始图片不太一样，产品手柄形状发生了变化，侧面的按钮也不见了。
请重新对照上传的产品图片，修正这几个画面，确保吸尘器外观和真实产品一致。已经正确的其他镜头不要修改。
```

**人工干预假设 2：AI使用场景修正（B68）**

```text
目前生成的桌面清洁画面不太自然，吸尘器的移动方式有问题，而且使用过程中吸头形状发生了变化。
请重新生成这段使用画面，让产品移动更自然，同时确保吸头和机身外观保持不变。其他产品展示镜头不要修改。
如果无法准确生成清洁过程，可以改成手持产品展示或产品细节镜头，不要生成不真实的使用效果。
```

**人工干预假设 3：商品信息纠正（B69）**

```text
视频里出现了“Up to 60 Minutes Runtime”的卖点，但我提供的商品资料里没有确认这个续航数据。
请删除这个说法，改成商品资料中已经确认的卖点，例如“Detachable Dust Cup”
只修改相关的文字和画面，不要改变其他镜头。
```

**人工干预假设 4：素材不足时的AI补充（B70）**

```text
我希望增加一个吸尘器背面和底部的旋转展示镜头，但目前上传的素材里没有这两个角度的照片。
请先判断能不能根据现有素材准确生成这些画面。如果无法确定背面结构和底部设计，请告诉我还需要补充什么图片，不要自己编造接口、按钮或其他结构。
如果无法准确生成完整旋转镜头，请尝试只用已有的正面和侧面图片制作自然的动态展示效果。
```

**Output（B71）**

一条完整的 20 秒、16:9 Amazon 产品广告视频：
使用商品图片生成动态展示画面以及AI生成模特手持产品展示使用的动态画面
包含产品外观、细节及能够真实还原的使用场景。
商品外观、结构、配件和卖点准确，没有明显的 AI 生成错误。
视频节奏自然，英语文字清楚，没有编造商品功能。
即使静音播放，也能看懂产品特点。
可以在 CinLink 内修改并正常导出，用于 Amazon 广告素材审核。

执行与预期核验：

1. 首次任务结束后，逐一核验原表首稿数量、时长、比例、产品/人物/字幕/声音和可编辑交付；下载或实际播放核验，不能只看完成状态。
2. 对四轮修改，先确认目标版本与原表假设是否匹配，再一次提交该轮完整原提示词；补槽记录问题和填写值，沿该轮原任务继续。
3. 每轮核验指定修改真实生效，其余版本、其他SKU、非目标镜头/字幕/音乐保持；对照源素材检查无串料、无编造。
4. 按Output核验最终交付和可导出性；失败截图保存本批目录，依赖前置失败导致未执行的轮次单列。
<!-- /ICP-EC-DINGTALK-20261116 -->
