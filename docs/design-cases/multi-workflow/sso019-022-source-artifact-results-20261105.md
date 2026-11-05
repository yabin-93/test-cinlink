# SSO-019～022 原片与产物穿插处理执行记录

2026-11-05，Asia/Shanghai。本批执行结果。计划4例20轮；实际受理20轮，服务端done 20轮、failed 0轮。逐轮指定验收19通过/1未通过/0依赖阻塞/0内容待复核/0未执行。整例3通过/1未通过/0阻塞。

[用例正文](same-session-source-artifact-cases.md) · [统一入口](../../cases/README.md) · [结构化汇总](../../../reports/sso019-022-source-artifact-20261105/summary.json) · [原始审计](../../../reports/sso019-022-source-artifact-20261105/audit)。

原始Playwright结果为3 passed / 1 failed：SSO-019 R3历史回读ECONNRESET保留在原报告，后续同run/文件哈希回读已补证，019业务指定检查通过。SSO-020的程序结构检查通过，但R2实际字幕文字复核未通过。两类结论分别记录，未改写原始JUnit，也未重提AI任务。

## 用例与会话

| 用例 | 场景 | 结果 | 会话ID |
|---|---|---|---|
| SSO-019 | 不同工作流在原片与最近产物间切换 | 指定检查通过；5轮通过/0未通过/0阻塞 | `a68d9fa3-5252-44da-aee4-e89bdd84b03e` |
| SSO-020 | 指定历史产物，避免误用最新视频 | 未通过；4轮通过/1未通过/0阻塞 | `de33ee82-d620-4b1a-b5ef-6ffed45ff1f5` |
| SSO-021 | 同一水印工作流重复执行，验证叠加与分支隔离 | 指定检查通过；5轮通过/0未通过/0阻塞 | `05a1747d-7c4a-4fd6-9301-5940985010e1` |
| SSO-022 | 自然指代最近成功产物，穿插显式返回原片 | 指定检查通过；5轮通过/0未通过/0阻塞 | `8af8a70a-d732-4b9b-a50d-1f2e36c4293e` |

## 逐轮结果

| 用例/轮次 | 目标输入 | 结果 | 服务端状态 | 实际视频 | run_id |
|---|---|---|---|---|---|
| SSO-019 R1 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_4a0ae97bb7f04cf08c5d325590f36494` |
| SSO-019 R2 | V1 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_a68477e1788b4927853b7261e9b4ce35` |
| SSO-019 R3 | F | 指定检查通过 | done | 19.866341秒 / 1280×720 | `run_v2_ccf7c6fd88cf4ee2b1c3d1d623d5ac5b` |
| SSO-019 R4 | V3 | 指定检查通过 | done | 19.861秒 / 2560×1440 | `run_v2_0d52602d9b49441b974958c127cf544f` |
| SSO-019 R5 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_baaa17f7ae264f5195e5a4a6e93642db` |
| SSO-020 R1 | F | 指定检查通过 | done | 19.866341秒 / 1280×720 | `run_v2_90762edb921e4768860a29659cff52a5` |
| SSO-020 R2 | V1 | 未通过 | done | 19.866341秒 / 1280×720 | `run_v2_95a99363685c4b878f395118f592e884` |
| SSO-020 R3 | F | 指定检查通过 | done | 28.97秒 / 1280×720 | `run_v2_310ffbe839b848f68ef01dcb8440fa45` |
| SSO-020 R4 | V2 | 指定检查通过 | done | 19.861秒 / 2560×1440 | `run_v2_c85aa0c517204e638f5cc609608b4bab` |
| SSO-020 R5 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_471edc733a624626aed5daa42a39e49b` |
| SSO-021 R1 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_fc75d88ce83646eda54746b4dd576a30` |
| SSO-021 R2 | V1 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_b80e5d1bebb44f359d49be5bd120695a` |
| SSO-021 R3 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_332a2f07a9e047c485cff486a2a3b314` |
| SSO-021 R4 | V2 | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_c4b67ace2e1f4b3a8ae4abe67b2a3e02` |
| SSO-021 R5 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_75883a6244a74f6091dc2e017914f823` |
| SSO-022 R1 | F | 指定检查通过 | done | 18.866341秒 / 1280×720 | `run_v2_6118548f977d48ed8f225081c3190c27` |
| SSO-022 R2 | V1 | 指定检查通过 | done | 18.866341秒 / 1280×720 | `run_v2_d3b6bb736b19417c9676caceb01491b8` |
| SSO-022 R3 | F | 指定检查通过 | done | 60.488005秒 / 1280×720 | `run_v2_65cabffebaf741918a10b746516c3b8c` |
| SSO-022 R4 | V3 | 指定检查通过 | done | 60.488005秒 / 2560×1440 | `run_v2_5fac856882524158a5eaeb845a878ce6` |
| SSO-022 R5 | F | 指定检查通过 | done | 28.97秒 / 1280×720 | `run_v2_a5191fcf29d04719a7ce36f2723819a5` |

## 未通过、阻塞与真实截图

### SSO-020 R2

首句烧录为Our family facing a cancer diagnosis，原片对应上下文为or a family facing a cancer diagnosis。实际transcribe_audio SRT已出现Our family，translate_subtitle英文SRT与成片沿用；本批完整原片SRT及独立音频上下文对照确认差异，具体识别算法原因未定位。来源V1、19.866341秒、720p及音轨保留检查通过，未见跨轮字幕串用。

![SSO-020 R2 原始失败页面](../../../reports/sso019-022-source-artifact-20261105/test-results/same-session-original-SSO-020-指定历史产物，避免误用最新视频-sso/round-2-final.png)

![SSO-020 R2 对应原始成片帧](../../../reports/sso019-022-source-artifact-20261105/test-results/same-session-original-SSO-020-指定历史产物，避免误用最新视频-sso/round-2-start.png)

![SSO-020 R2 对应原始成片帧](../../../reports/sso019-022-source-artifact-20261105/test-results/same-session-original-SSO-020-指定历史产物，避免误用最新视频-sso/round-2-middle.png)

![SSO-020 R2 对应原始成片帧](../../../reports/sso019-022-source-artifact-20261105/test-results/same-session-original-SSO-020-指定历史产物，避免误用最新视频-sso/round-2-end.png)

## 云效同步（2026-11-05）

SSO-020第2轮字幕首句“or a family”转写为“Our family”已提交[FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c)，优先级中、严重程度3-一般。新建1、旧项更新/评论/重开0、失败0、验证1；1张本次真实成片失败帧上传并嵌入，另附2份SRT、2份音频核验样本和脱敏JSON，共6附件，正文/字段/附件及图片引用回读通过。全状态初查102条，写前复查，最终103条且当前键唯一；截图首次上传超时，经回读确认为未上传后恢复，未重复创建。测试结论保持4例20轮、3例通过/1例未通过，19轮通过/1轮未通过；SSO-019网络取证异常已补证，不提交产品缺陷。

[本地缺陷](../../defects/CINLINK-SSO020-EN-001.md) · [提交及核验结果](../../../reports/sso020-yunxiao-20261105/result.json)。

## 已补齐的取证异常

SSO-019 R3：历史回读出现ECONNRESET，原始审计及Playwright失败保留。后续轮次回读同一历史run/file_id，全部历史文件与首次SHA-256一致，已补齐证据，不重发业务任务。[补证详情](../../../reports/sso019-022-source-artifact-20261105/observation-reconciliation.json)。

[SSO-019 R3 原始取证异常截图](../../../reports/sso019-022-source-artifact-20261105/test-results/same-session-original-SSO-019-不同工作流在原片与最近产物间切换-sso/round-3-failure.png)

## 证据索引

- [逐轮根工具输入与分支来源](../../../reports/sso019-022-source-artifact-20261105/source-evidence.json)
- [原始帧与独立音轨匹配](../../../reports/sso019-022-source-artifact-20261105/local-media-review.json)
- [逐轮画面及语义抽样记录](../../../reports/sso019-022-source-artifact-20261105/content-review.json)
- [字幕文字偏差：原run/SRT/原始帧及证据哈希](../../../reports/sso019-022-source-artifact-20261105/failure-details.json)
- [本轮实际SRT及关联工具](../../../reports/sso019-022-source-artifact-20261105/subtitle-evidence.json)
- [字幕全文结构、文字体系与时间轴检查](../../../reports/sso019-022-source-artifact-20261105/subtitle-check.json)
- [原片27～45秒与高光前10秒独立ASR对照](../../../reports/sso019-022-source-artifact-20261105/subtitle-language-spot.json)
- [原会话/原run/产物关联及最终文件哈希回读](../../../reports/sso019-022-source-artifact-20261105/final-readback.json)
- [20轮文档/脚本/实发提示词和旧18条定义一致性](../../../reports/sso019-022-source-artifact-20261105/delivery-check.json)
- [原始Playwright执行结果](../../../reports/sso019-022-source-artifact-20261105/runner-result.json)
- [20轮/4会话/5确认/0补槽等实际证据计数](../../../reports/sso019-022-source-artifact-20261105/evidence-counts.json)

## 范围与证据说明

每例独立非项目会话，只登记一个原片F。5轮不@、不增加附件，只发送完整正文；原片轮回到F，产物轮按指定轮次选择，不插入产物ID提示。登记不计5轮；依赖缺失轮未提交，不能计服务端失败或通过；后续独立原片轮仍执行。单worker、零重试、有头浏览器；未修改云端代码；原执行阶段未写云效，用户随后已授权提交SSO-020 R2，见云效同步节。

原片及已下载历史文件校验SHA-256，记录根步骤输入和运行分支，区分原始计划与实时快照。产物ID须匹配指定视频，不能仅凭共同原片祖先判来源正确。视频检查解码/时长/尺寸/音轨及首中末原始帧；有字幕轮另核语义、文字体系和对应音频，抽样不代表逐帧逐字或完整账单验收。

本轮启动前额外trace与配置trace重复，首次bootstrap在提交前退出，未上传/创建业务任务；已修正，原始记录保留在底稿bootstrap目录，不计产品失败。脚本与文档接入核验：类型检查、7条来源相关定向测试、目标4例发现和20条提示词一致性通过；未重复跑整套离线。

底稿：`reports/sso019-022-source-artifact-20261105/`；SSO总计22 AUTO/0 PLAN，001～018定义及既有结果不变。
