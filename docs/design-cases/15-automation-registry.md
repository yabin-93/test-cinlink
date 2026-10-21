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
| 离线断言器 | `tests/unit` | 92 | `[AUTO]` | `npm test` |
| 关卡演练 | `tests/gates` | 24 | `[AUTO]` | `npm run test:gates` |
| G1 上传 | `tests/staging/g1-upload.spec.ts` | 4 | `[AUTO]` | `npm run test:g1` |
| G2 提交 | `tests/staging/g2-submit.spec.ts` | 3 | 1 `[AUTO]` + 2 `[FIXME]` | `npm run test:g2` |
| 字幕 | `tests/staging/g3-g7-subtitle.spec.ts` | 1 | `[AUTO]` | `npm run test:g3` |
| 图片水印 | `tests/staging/g3-g7-image-watermark.spec.ts` | 1 | `[AUTO]` | `npm run test:watermark` |
| 主工作流（表驱动） | `tests/staging/g3-g7-workflows.spec.ts` | 6 | 5 `[AUTO]` + 1 `[FIXME]` | `npm run test:flows` |
| 卡片入口 | `tests/staging/g3-g7-cards.spec.ts` | 4 | `[AUTO]`（待跑） | `npm run test:cards` |
| 批注规则 | `tests/annotation/annotation-rules.spec.ts` | 18 | `[AUTO]` | `npm run test:annotation` |
| 批注本地 UI | `tests/annotation/video-annotation-ui.spec.ts` | 6 | `[AUTO]` | `npm run test:annotation` |
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
| 混剪 | WF-07 | `g3-g7-workflows` | `[FIXME]`（CINLINK-MIX-001） |
| 去口水词 | WF-08 | `g3-g7-workflows` | `[AUTO]`（已并入表驱动） |
| AI 生图 | CS-01（IG） | `g3-g7-cards` | `[AUTO]`（待跑） |
| AI 生视频 | CS-02（IV） | `g3-g7-cards` | `[AUTO]`（待跑） |
| 总结视频 | CS-06 | `g3-g7-cards` | `[AUTO]`（待跑） |
| 生成解说 | CS-04 | `g3-g7-cards` | `[AUTO]`（待跑） |

## 三、还没进脚本的设计用例

| 范围 | 数量 | 状态 | 说明 |
|---|---|---|---|
| 工作流用例（单/多） | 78 | `[PLAN]` | 矩阵已设计，未写参数化脚本 |
| 精简执行集 | 36 | `[PLAN]` | 已合并为工作流用例的「回归」列 |
| 卡片用例 | 36 | 部分 `[PLAN]` | 其中卡片 4 条已进 `test:cards`、clean-cut 已并入 `test:flows`，其余待补 |
| 上下文用例 | 11 | `[PLAN]` | CTX-01~11（已并入专项用例页） |
| 视频专项 | 8（建议） | `[PLAN]` | 时长/编码/比例/无音轨等 |
| 链路用例 | 12 | `[PLAN]` | CHAIN-01~12（已并入专项用例页） |

## 四、维护约定

1. 新增脚本时，在本文件对应行把 `[PLAN]` 改成 `[AUTO]`，并补脚本路径与命令；
2. 修完缺陷、启用 fixme 时，把 `[FIXME]` 改成 `[AUTO]`；
3. 设计用例变更时，同步 `14-workflow-material-paths.md` 与本表；
4. Excel `自动化状态` 页与本文件保持一致。
