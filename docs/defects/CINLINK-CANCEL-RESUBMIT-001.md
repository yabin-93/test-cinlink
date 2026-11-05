# 缺陷报告 · 取消任务后在同一会话重新提交，Run 显示 done 但 0 产物

| 字段 | 内容 |
|---|---|
| 缺陷 ID | CINLINK-CANCEL-RESUBMIT-001（本地编号；云效工作项 `b6b809cfd596d4f47862fc68ed`） |
| 标题 | 取消任务后在同一会话重新提交，run 到 done 但无任何产物，助手回复“workflow’s required tool definitions were not supplied” |
| 严重级别 | **高（P1）**：用户取消后重试无法完成，且 UI 显示成功（done），没有任何产物或明确错误提示 |
| 状态 | **已提交云效**（2026-11-03，工作项 `b6b809cfd596d4f47862fc68ed`，`🤔AI提缺陷`；严重程度 2-严重） |
| 发现日期 | 2026-11-03 |
| 环境 | 预发 `https://staging-app.cinlink.ai`，新版工作台 `/studio/workspace`，Chrome（headless），Windows |
| 账号 | `yabinc18` / `acct_603598179755` |
| 涉及工作流 | 长变短（`shorten`，长高光短视频）；推测所有“取消后同会话重提”场景 |
| 自动化用例 | `tests/staging/g3-g7-multi.spec.ts` › MW-05（已 `test.fixme`） |
| 证据目录 | `reports/mw05-20261103e.log`、`test-results/g3-g7-multi--regression-G3–G7-多工作流-slow-MW-05-中断恢复：取消后重新提交-staging/` |

---

## 1. 摘要

在同一会话中：

1. 提交一个长变短任务；
2. 任务执行中调用新版取消接口；
3. 取消成功（状态 `cancelled`）；
4. 刷新页面后重新提交同一任务；
5. 第二条 run 状态到 `done`，但**产物数为 0**；
6. 助手消息称工作流缺少工具定义，但界面仍显示完成。

这不是取消失败，而是**取消后同会话的再次提交无法恢复工作流工具上下文**。

## 2. 复现步骤（UI）

前置：已登录预发；准备 `7MB.mp4`（约 7.8 MB，60 秒，有音轨）。

1. 打开 `https://staging-app.cinlink.ai/studio/workspace`；
2. 新建一个非项目会话；
3. 上传 `7MB.mp4`；
4. 在输入框 `@` 选择该视频；
5. 输入指令并发送：

   ```
   把这个视频剪成 20 秒左右的高光短视频，输出剪辑后的视频
   ```

6. 任务进入 `queued/running` 后，立刻点界面上的**停止**按钮（或调用取消接口，见下）；
7. 确认任务卡片状态变为**已取消 / cancelled**；
8. 刷新页面（`F5`），等待输入区恢复；
9. 重新上传同一个 `7MB.mp4`，再次 `@` 选择该视频；
10. 再次发送同一条指令：

    ```
    把这个视频剪成 20 秒左右的高光短视频，输出剪辑后的视频
    ```

## 3. 复现步骤（API，自动化使用）

```http
POST /runtime-api/v2/agent/runs/{runId}/cancel
```

- 取消后轮询会话消息，状态应为 `cancelled`；
- 随后重新提交，创建新的 `run_v2_*`；
- 新 run 最终状态为 `done`，`result_files` 为空。

## 4. 实际结果

第二条 run：

| 字段 | 值 |
|---|---|
| run_id | `run_v2_6ffc8fc403af4482ab60806c12fcb216` |
| 状态 | `done` |
| 产物数 | **0** |
| error_code / error_msg | `null` / `null` |

助手原文（完整）：

> You want an approximately 20-second highlight video from 7MB-1793679328104.mp4, delivered as an edited video. I can’t schedule the edit because the workflow’s required tool definitions were not supplied. Your video is already referenced; no re-upload is needed.
>
> The listed workflows cover speech-based highlights, trimming/cropping, multi-video montages, video enhancement, and source-language subtitle burn-in. To proceed with your requested highlights, the highlight tools and a source-inspection capability must be made available.

第一条被取消的 run：`run_v2_29684e84d91243a08df5584da8214b69`，状态 `cancelled`。

会话 ID：`0224094b-3da0-4c82-9d2e-3568a9d6775a`。

## 5. 预期结果

任选其一，但不能是“done + 0 产物 + 无错误”：

1. 第二条 run 正常执行并产出约 20 秒的视频；
2. 或明确失败（`failed`）并提示原因，例如“取消后需要新建会话”；
3. 或阻止在同一会话重提，提示用户新建会话。

## 6. 影响

- **用户无法恢复**：取消后想重试，看起来成功（done），实际没有任何产物；
- **信任成本**：状态显示 done，用户不会意识到任务没执行；
- **可能重复扣费**：取消的任务与重提任务是否都已计费待确认（本次未记录余额变化）；
- **自动化阻塞**：MW-05（中断恢复）只能保持 fixme。

## 7. 可能原因（推测，供研发参考）

- 取消操作清掉/悬挂了会话级的工作流工具注册，重提时没有重新加载；
- 重提复用了被取消 run 的上下文，导致工具定义列表为空；
- 前端 `done` 状态与后端“工作流未调度”不一致，缺少失败态映射。

## 8. 临时规避

- 取消后**新建会话**再提交（本次未验证是否可绕过）；
- 或刷新后等待更久再重提（本次已刷新，仍复现）。

## 9. 自动化与证据

| 项 | 位置 |
|---|---|
| 用例 | `tests/staging/g3-g7-multi.spec.ts` › MW-05（`test.fixme`，原因已写明） |
| 运行日志 | `reports/mw05-20261103e.log` |
| Trace / 截图 | `test-results/g3-g7-multi--regression-G3–G7-多工作流-slow-MW-05-中断恢复：取消后重新提交-staging/` |
| 取消接口验证 | G2 清理步骤：`清理：取消任务 成功`，状态 `cancelled` |

## 10. 云效记录

| 项 | 值 |
|---|---|
| 项目 | cinlink-WEB |
| 工作项 ID | `b6b809cfd596d4f47862fc68ed` |
| 严重程度 | 2-严重 |
| 标签 | 测试环境win-chrome |
| 状态 | 🤔AI提缺陷 |
| 链接 | https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b6b809cfd596d4f47862fc68ed |
| 附件 | 失败截图 `cancel-resubmit-001.png`、日志 `mw05-20261103e.log`、本报告 |

## 11. 待确认

- [x] 是否提交到云效（已提交，见第 10 节）
- [ ] 缺陷等级是否维持 P1（云效当前严重程度 2-严重）
- [ ] 第二条 run 是否产生扣费（需要账单/流水确认）
- [ ] 研发修复后，MW-05 取消 fixme 并回归
