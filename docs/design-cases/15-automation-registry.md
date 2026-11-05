# 自动化状态登记（用例 ↔ 脚本）

用于区分：**设计用例**、**已加入自动化脚本**、**计划中**、**被缺陷阻塞**。

## 标记规则

| 标记 | 含义 |
|---|---|
| `[AUTO]` | 已有可执行脚本，能在对应环境跑 |
| `[FIXME]` | 脚本已存在但默认跳过（缺陷/UI 待确认） |
| `[PLAN]` | 设计完成，尚未写脚本 |
| `[BLOCKED]` | 被已知缺陷阻塞，暂不写或已 fixme |
| `[N/A]` | 人工/内容层，不做自动化 |

## 一、脚本层总览

| 套件 | 位置 | 数量 | 状态 | 命令 |
|---|---|---|---|---|
| 离线断言器 | `tests/unit` | 97 | `[AUTO]` | `npm test` |
| 关卡演练 | `tests/gates` | 24 | `[AUTO]` | `npm run test:gates` |
| G1 上传 | `tests/staging/g1-upload.spec.ts` | 4 | `[AUTO]` | `npm run test:g1` |
| G2 提交 | `tests/staging/g2-submit.spec.ts` | 3 | `[AUTO]`（Job 唯一性/计费请求替代口径） | `npm run test:g2` |
| 字幕 | `tests/staging/g3-g7-subtitle.spec.ts` | 1 | `[AUTO]` | `npm run test:g3` |
| 图片水印 | `tests/staging/g3-g7-image-watermark.spec.ts` | 1 | `[AUTO]` | `npm run test:watermark` |
| 主工作流（表驱动） | `tests/staging/g3-g7-workflows.spec.ts` | 6 | `[AUTO]`（translation/clean-cut/enhance/text-watermark/long-to-short/mix） | `npm run test:flows` |
| 卡片入口 | `tests/staging/g3-g7-cards.spec.ts` | 7 | 5 `[AUTO]` + 2 `[FIXME]`（本地素材查找旧结果空占位、生成解说不可用） | `npm run test:cards` |
| 本地素材查找P0 | `tests/local-footage/local-footage.spec.ts`，独立配置 `playwright.footage.config.ts` | 3 | LF-01～03 `[AUTO]`，有头实测0通过/3未通过；其余14条PLAN，旧卡片空占位不重复计数 | `npm run test:footage` |
| 多工作流基础 | `tests/staging/g3-g7-multi.spec.ts` | 5 | 4 `[AUTO]` + 1 `[FIXME]` | `npm run test:multi:base` |
| 多工作流复合 | `tests/staging/g3-g7-multi-compound.spec.ts` | 15 | 11 `[AUTO]` + 4 `[FIXME]`（MW-18/24/25/26 复测通过并默认启用） | `npm run test:multi:compound` |
| 多工作流全量 | 上述两个 spec | 20 | 15 `[AUTO]` + 5 `[FIXME]` | `npm run test:multi` |
| 多素材专项（独立按需） | `tests/multi-material/multi-material.spec.ts`，独立配置 `playwright.multi-material.config.ts` | 6 | MW-15/16/17/19/20/22；已接入，结果见测试进度；允许补槽后继续，MW-22 需服务端定向故障注入 | `npm run test:multi:materials` |
| MW-22 前端模拟（独立模式） | 上述 MW-22 + `src/fixtures/mw22-ui-mock.ts`、`playwright.multi-material-ui.config.ts` | 1 个现有用例的模拟模式 | 2026-11-03：1 passed；仅展示/模拟下载，真实服务端场景仍 FIXME，不增加用例数或真实通过数 | `npm run test:multi:materials:ui` |
| 同会话单原片 SSO-001～018 | `tests/sso/same-session-original.spec.ts`，`playwright.sso.config.ts`；`src/fixtures/sso-session-recovery.ts` | 18 | 015～018实际受理20/20轮，11轮产出MP4、9轮任务失败、0轮前置受阻未执行；整例1通过/3未通过/0受阻；[记录](multi-workflow/sso015-018-recovery-results-20261105.md)；001～014既有结论保留 | `npm run test:sso`；仅本批加`-- --grep "SSO-01[5-8]"` |
| 同会话原片与产物 SSO-019～022 | `tests/sso/same-session-original.spec.ts`，数据`tests/sso/cases/source-artifact.ts`，`src/fixtures/sso-round-input.ts` | 4 | 本批结束：受理20/20轮；19轮通过/1未通过/0阻塞；[正文](multi-workflow/same-session-source-artifact-cases.md)、[结果](multi-workflow/sso019-022-source-artifact-results-20261105.md) | `npm run test:sso:mixed` |
| 链路 | `tests/staging/g3-g7-chains.spec.ts` | 4 | 1 `[AUTO]` + 3 `[FIXME]` | `npm run test:chains` |
| 批注规则 | `tests/annotation/annotation-rules.spec.ts` | 27 | `[AUTO]` | `npm run test:annotation` |
| 批注本地 UI | `tests/annotation/video-annotation-ui.spec.ts` | 12 | `[AUTO]` | `npm run test:annotation` |
| 批注预发 | `tests/annotation/video-annotation-staging.spec.ts` | 16 | 15 `[AUTO]` + 1 `[FIXME]` | `npm run test:annotation:staging` |

## 二、工作流链路：哪些已进脚本

| 工作流 | 设计编号 | 脚本 | 状态 |
|---|---|---|---|
| 字幕 | WF-01 | `g3-g7-subtitle` | `[AUTO]` |
| 翻译 | WF-02 | `g3-g7-workflows` | `[AUTO]` |
| 增强 | WF-03 | `g3-g7-workflows` | `[AUTO]` |
| 文字水印 | WF-04 | `g3-g7-workflows` | `[AUTO]` |
| 图片水印 | WF-05 | `g3-g7-image-watermark` | `[AUTO]` |
| 长变短 | WF-06 | `g3-g7-workflows` | `[AUTO]` |
| 混剪 | WF-07 | `g3-g7-workflows`（mix）+ `g3-g7-multi`（MW-04） | `[AUTO]`（2026-11-03 两条路径均通过） |
| 去口水词 | WF-08 | `g3-g7-workflows` | `[AUTO]`（已并入表驱动） |
| AI 生图 | CS-01（IG） | `g3-g7-cards` | `[AUTO]`（待跑） |
| AI 生视频 | CS-02（IV） | `g3-g7-cards` | `[AUTO]`（待跑） |
| 总结视频 | CS-06 | `g3-g7-cards` | `[AUTO]`（待跑） |
| 生成解说 | CS-04 | `g3-g7-cards` | `[UNAVAILABLE]`（2026-11-02 起功能暂不可用，fixme） |
| 长视频变短 | CS-03 | `g3-g7-cards` | `[AUTO]`（待跑） |
| 本地素材查找 | CS-06；LF-01～17 | `tests/local-footage/local-footage.spec.ts`接LF-01～03；旧卡片脚本仅入口冒烟＋空结果FIXME | 3条`[AUTO]`且有头实测未通过：无关结果混入、0～2秒短片缺目标；其余14条`[PLAN]`；[结果与截图](multi-workflow/local-footage-results-20261104.md) |
| 多工作流复合 | MW-06~14/18/21/23~26 | `g3-g7-multi-compound` | 11 `[AUTO]` + 4 `[FIXME]` |

2026-11-03：MW-24/25/26 在 Codex 预发复测 3 passed 后移除 `fixme`，不再需要 `CINLINK_INCLUDE_BLOCKED=1`。MW-18 严格复测通过后也已移除 `fixme`。预发合计 46 条，36 条默认启用、10 条默认跳过；已启用数量不等于整套实测通过数量。当前进度见 [测试进度](../testing-progress.md)，历史结果见 [验证记录](../verification.md)。

最新严格复测（2026-11-03）：MW-18 双附件无补槽通过；MW-11/12 无补槽但交付不全，MW-14 仍规划超时；MW-21 同项目 A/B 夹具已接入，源 F 登记及回读通过，B @ 无候选，目标指令未提交；页面 0/1 素材已分析，就绪条件待定位，本轮证据已更新 FWXC-247。MW-18 现已恢复默认执行，其余 MW-11/12/14/21 四条保留 FIXME，详见 [测试进度](../testing-progress.md)。

## 三、还没进脚本的设计用例

2026-11-05：196/206/210共255条按[页面业务/真实接口结果](../cases/editor-business-acceptance.md)优化，不新增脚本/执行；005撤销旧引用前置Blocked改PLAN/Not Run，001/003 Passed、002/004 NA保留。其他用例编号/优先级/来源不变。


2026-11-05 ERYE-237已按用户要求全量重写为144条：P0 95 / P1 48 / P2 1，全部PLAN/Not Run、0脚本/0执行；旧用例表及旧映射已移除。[详细用例](../cases/requirements/ERYE-237/cases.md)、[需求与指定Figma测试点](../cases/requirements/ERYE-237/analysis.md)、[数据前置](../cases/requirements/ERYE-237/test-data.md)。批注上限10条与会话生成图片20张分开；未新增执行命令。


2026-11-04 本地素材查找P0：[LF-01～17正文](multi-workflow/local-footage-p0-cases.md)，LF-01～03已接脚本且有头实测未通过，LF-04～17共14条仍PLAN/未执行。真实分析与3次查询已完成，回读相同run核验短片内容；旧入口冒烟/空FIXME不重复计数。LF-17仍需执行前听审；Excel尚未同步专项，详情见[执行记录](multi-workflow/local-footage-results-20261104.md)。

2026-11-04 AI生图P0专项：[IG-01～08正文](multi-workflow/ai-image-p0-cases.md)，8条均为P0设计，仅IG-05对应已有默认AI生图脚本的部分检查，其余7条PLAN。已在[统一入口](../cases/README.md#ai生图p0用例)逐条列出分辨率/比例与状态。没有新增或执行脚本，卡片套件仍7条、其中AI生图1条；Excel尚未同步本次参数扩展。

2026-11-05：[同会话单原片专项](multi-workflow/same-session-original-cases.md)共18条、14 AUTO/4 PLAN。009～014本批6例30轮完成，4例通过/2例未通过（28轮指定核验通过/2轮未通过/0轮待复核）；来源30/30可追溯，未发现串用；010 R4法文混语、014 R1日文多余字符；014 R3用户人工审核通过。详见[本批记录](multi-workflow/sso009-014-five-round-results-20261104.md)。001～008既有结果保留，015～018未执行；默认预发数量不变。

| 范围 | 数量 | 状态 | 说明 |
|---|---|---|---|
| 工作流用例（单/多） | 78 | `[PLAN]` | 矩阵已设计，未写参数化脚本 |
| 剪辑配音与字幕同步P0 | 6 | 0 `[AUTO]` / 6 `[PLAN]` | [SYNC-001～006正文](multi-workflow/editing-dubbing-sync-cases.md)；三类各2条，全部未执行，005配套视频夹具待准备；无执行命令，Excel尚未收录专项 |
| 精简执行集 | 36 | `[PLAN]` | 已合并为工作流用例的「回归」列 |
| 卡片用例 | 见矩阵现行条目 | 部分 `[PLAN]` | 旧快捷入口3项已移除；卡片脚本仍7条（5启用、2fixme），clean-cut另在test:flows；其余参数设计见专项 |
| 上下文用例 | 11 | `[PLAN]` | CTX-01~11（已并入专项用例页） |
| 视频专项 | 8（建议） | `[PLAN]` | 时长/编码/比例/无音轨等 |
| 链路用例 | 13 | 1 `[AUTO]` + 3 `[FIXME]` + 9 `[PLAN]` | CHAIN-01~13 |

## 四、维护约定

1. 新增脚本时，在本文件对应行把 `[PLAN]` 改成 `[AUTO]`，并补脚本路径与命令；
2. 修完缺陷、启用 fixme 时，把 `[FIXME]` 改成 `[AUTO]`；
3. 设计用例变更时，同步 `14-workflow-material-paths.md` 与本表；
4. Excel `自动化状态` 页与本文件保持一致。
5. 修改 `package.json` 的测试命令、套件数量或跳过状态时，同时核对 Excel `脚本清单` 页的命令、作用、脚本定义与备注；该页是推荐执行清单，不是所有 npm 别名的枚举。

2026-11-03 已补同步 `脚本清单` 的 14 条推荐命令：删除失效的 `test:quick`、补入 `test:multi:compound`，校正离线 118、批注 27+12、卡片 7、多工作流 20（15 启用 + 5 跳过）。`test:multi` 已包含复合专项，二者按任务范围选择，避免重复计费。命令定义逐条与 `package.json` 核对；其他工作表保持原样。

## 五、执行层级与标签

| 层级 | 标签 | 命令 | 内容 | 当前条数 |
|---|---|---|---|---|
| L0 离线 | 无 | `npm run verify` | tsc + unit + gates（新增4条来源时序回归） | 127 |
| L1 冒烟 | `@smoke` | `npm run test:smoke` | 字幕、clean-cut、AI 生图 | 3 |
| L2 回归 | `@regression` | `npm run test:regression` | G1/G2 + 工作流 + 卡片 + 多工作流 + 链路 | 46 |
| L3 全量 | 无过滤 | `npm run test:full` | 预发全部脚本 | 46 |

批注预发用例统一带 `@regression`，单独用 `npm run test:annotation:staging` 执行。

> 标签写在测试标题里；`--grep @smoke` 只跑冒烟。全量与回归共用同一份脚本，避免两套用例漂移。
