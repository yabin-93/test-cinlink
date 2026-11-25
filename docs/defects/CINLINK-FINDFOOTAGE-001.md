# 缺陷报告 · Find Local Footage 提交查询后 run done 但 0 结果（本地素材搜索工具定义缺失）

2026-11-04后续缺陷同步：本次内容相关性问题见[FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a)，片段定位问题见[FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16)；查重只读核对旧FWXC-237，状态仍待确认，本次未更新、重开或关闭。

2026-11-04状态补记：[LF-01～03已接自动化并有头执行](../design-cases/multi-workflow/local-footage-results-20261104.md)，3个任务均done并返回可播放短片，未复现旧“done＋0结果”。当前未通过原因是机器人查询混入无关片段、单镜头查询返回0～2秒而未含目标画面；规划文本仍提示旧workflow工具定义不可用，实际改用独立search_materials。本页下文保留2026-11-03原始缺陷；不直接标记Fixed/Verified，本轮未回读或修改云效。旧空FIXME不代表新专项未接脚本，LF-04～17仍未执行。

| 字段 | 内容 |
|---|---|
| 缺陷 ID | CINLINK-FINDFOOTAGE-001（本地编号，提交云效后以工作项为准） |
| 标题 | Find Local Footage 提交查询后 run 到 done 但 0 结果，助手提示 local-library search 的 tool definition 缺失 |
| 严重级别 | **高（P1）**：卡片入口功能不可用，用户会误以为“没有匹配片段”，且没有任何结果或明确错误 |
| 状态 | **已提交云效**（2026-11-03，工作项 `12b8dd2e9cc5c1e0dd5851799a`，`🤔AI提缺陷`） |
| 发现日期 | 2026-11-03 |
| 环境 | 预发 `https://staging-app.cinlink.ai`，新版工作台 `/studio/workspace`，Chrome（headless） |
| 账号 | `yabinc18` / `acct_603598179755` |
| 涉及入口 | 卡片 `local-material`（Find Local Footage / 本地素材查找） |
| 自动化用例 | `tests/staging/g3-g7-cards.spec.ts` › 本地素材查找（`test.fixme`） |
| 证据 | `reports/attachments/find-footage-result.png`、`reports/attachments/find-footage-typed.png` |

---

## 1. 摘要

在 `Find Local Footage` 卡片模式下提交查询（“找出人物正面说话的片段”），任务创建并到 `done`，但：

- 产物数 0；
- 界面没有片段/素材结果列表；
- 助手回复本地素材搜索工作流的工具定义缺失，无法生成可执行计划；
- 余额未变化（本次未扣费）。

## 2. 复现步骤

1. 登录预发，进入 `https://staging-app.cinlink.ai/studio/workspace`；
2. 新建非项目会话；
3. 上传 `7MB.mp4`（约 7.8 MB，60 秒，有音轨）；
4. 点击 **Find Local Footage** 卡片（`[data-workspace-action-id="local-material"]`）；
5. 此时 composer 进入 Find Local Footage 模式，并显示：

   ```
   0/0 media files analyzed
   该项目还没有可分析的视频
   ```

6. 在输入框输入查询：

   ```
   找出人物正面说话的片段
   ```

7. 点击发送（实际提交内容为 `Find Local Footage: 找出人物正面说话的片段`）；
8. 等待任务结束。

## 3. 实际结果

| 字段 | 值 |
|---|---|
| run_id | `run_v2_f9b97aa1e8ff484a8b35b5ab72254414` |
| 会话 ID | `28df688b-6763-4176-9367-d3491d12e68c` |
| 状态 | `done` |
| 产物 / 结果 | 0 |
| 余额 | 49854 → 49854（未扣费） |

助手原文：

> You’re looking for clips where a person faces the camera and speaks. The matching local-library search workflow is available in the catalog, but its tool definition is missing, so I can’t create an executable search plan. Restore the library-search tool configuration to proceed; no video upload or further clarification is needed.

## 4. 预期结果

- 返回匹配的片段/素材列表（含时间码、可加入时间线）；或
- 明确失败（`failed`）并提示“本地素材搜索暂不可用”，而不是 `done` + 空结果。

## 5. 影响

- 卡片入口“本地素材查找”实际不可用；
- 用户看到 done 和空结果，会误判为“素材里没有匹配片段”；
- 自动化只能保持 fixme，无法验证结果列表。

## 6. 可能原因（推测）

- 服务端工作流注册表中 local-library search 的 tool definition 缺失或未加载；
- 与 CINCLINK-CANCEL-RESUBMIT-001 中“workflow’s required tool definitions were not supplied”属于同一类工具注册问题。

## 7. 临时规避

- 暂无；需要研发恢复 local-library search 的工具配置。

## 8. 自动化

- `tests/staging/g3-g7-cards.spec.ts` 的“本地素材查找”目前是空 `test.fixme`；
- 恢复后可实现：进入 Find Local Footage → 上传/选择项目媒体 → 输入查询 → 断言结果列表出现、片段可加入时间线。


2026-11-23T20:42:38.942200+08:00 FWXC-237 production/yabinc18: 原入口Blocked / 当前附件定位分支Passed（仅定位范围）/ 已分析素材库分支Blocked。旧Find Local Footage卡片已移除，入口替代澄清未答，不能据扩散改原验收。E1从无项目模式附精确7MB.mp4，51秒完成，返回0–60.496秒一段正面讲话位置，人物描述与实际短发女士一致，源视频实际播放至47.6秒后暂停；本地原文件60.50秒、1280x720/H264/AAC、完整解码0。无新剪辑产物或下载入口。当前无项目入口不显示旧0/0计数；旧LF01项目现为4/4，未用于未分析基线。E2独立单7MB项目b37863d4-64dd-4160-a87e-5100a6a9c892，分析批次489ae4db-d2ec-4465-9b82-68cc4bf8b801于20:33单次受理，预计1800积分/实际计费未核。约8分钟仍0/1抽帧、文件出现重试而批次仍处理中，终态未确认；未提交素材库查询，不重试/取消/新建批次。仅回读原批次。原验收仍Blocked，云效不写状态。证据 reports/fixed-regression-production-20261123-161635/execution/237/checkpoint-result.json。脚本PLAN。


2026-11-23T22:00:06.349246+08:00 FWXC-237原生产分析批次 `489ae4db-d2ec-4465-9b82-68cc4bf8b801` 已只读核到明确终态：页面“视频分析失败”“分析已停止；可重试失败视频”，当前文件文字“等待处理位置分配”。没有点击任何重试、取消或新建分析。E2所需1/1前置失败，正式素材库查询未提交，因此E2结论Blocked（准备Failed）；原旧卡片验收仍Blocked、直接附件定位E1仍Passed范围不变，云效已修复只读回读不写。当前生产/yabinc18批次结束为6项原Failed、5项原Blocked，624/568保留同版既有阻塞未重跑；本轮已受理请求均已终态，无在途新业务。未覆盖原场景及入口澄清继续保留，不能宣称全部通过。七项当前Fixed修复指纹无变化，不自动重跑。证据 reports/fixed-monitor-20261123-215601/237-original-batch-readback-ui.txt、reports/fixed-monitor-20261123-215601/237-analysis-failed-ui.png；最终机器汇总 reports/fixed-regression-production-20261123-161635/final-summary.json。
