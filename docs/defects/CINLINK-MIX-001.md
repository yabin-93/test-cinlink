# 缺陷报告 · 混剪澄清后续跑丢失任务语义，任务以“无可用工作流”结束

| 字段 | 内容 |
|---|---|
| 缺陷 ID | CINLINK-MIX-001 |
| 标题 | 双素材混剪回答 max_clips 澄清后，续跑 Run 被判定为 unsupported，done 但 0 产物 |
| 严重级别 | **高（P1）**：用户按产品提示回答后任务无法完成，且无任何产物或明确错误 |
| 状态 | Open（2026-10-19 复现中） |
| 发现日期 | 2026-10-19 |
| 环境 | 预发 `https://staging-app.cinlink.ai`，Chrome（系统安装版），headless |
| 账号 | `acct_4e73d97f04f5` |
| 涉及工作流 | `multi_video_montage`（双素材高光混剪） |
| 复现命令 | `CINLINK_INCLUDE_BLOCKED=1 npm run test:flows -- -g mix` |
| 证据目录 | `reports/artifacts/defect-mix/` |

## 1. 一句话描述

双素材混剪会先追问「最多用几个高光片段」，用户回答后产品**新开一个 Run**，prompt 只有回答文本；该 Run 的意图识别返回 `decision: "unsupported"`（confidence 1.0），助手回复「该请求目前没有可执行的 CinLink 工作流程」，状态 `done`、产物 0，任务实际未执行。

## 2. 复现步骤

1. 打开工作台，新建非项目会话。
2. 上传并 `@` 引用两个视频：
   - `7MB.mp4`（7,815,126 字节，60.5 秒）
   - `1270510918-1-12.mp4`（37,942,081 字节，169 秒）
3. 输入提示词并发送：

   ```
   @7MB-<时间戳>.mp4 @1270510918-1-12-<时间戳>.mp4  把这两个视频的高光混剪成 18 秒
   ```

4. 等待助手追问：「18 秒混剪最多选取几个高光片段（2～10 个）？」
5. 在澄清输入框回答：`最多用 4 个高光片段`，点击发送。

## 3. 预期 / 实际

| | 内容 |
|---|---|
| **预期** | 产品把回答当作 `max_clips = 4` 补进同一任务，进入高光方案 → 自动渲染 → 产出约 18 秒的混剪视频 |
| **实际** | 新 Run 的意图识别返回 `unsupported`，助手回复「该请求目前没有可执行的 CinLink 工作流程」，Run 状态 `done`，产物 0，页面没有报错、没有重试入口 |

## 4. 关键证据

### 4.1 两次 Run

| | 父 Run（初始提交） | 子 Run（回答澄清后） |
|---|---|---|
| run_id | `run_6c0b61730c58c25ca2f4d29c` | `run_8b844f189f263a7a3b9d1d1b` |
| prompt | `@7MB-….mp4 @1270510918-1-12-….mp4  把这两个视频的高光混剪成 18 秒` | `最多用 4 个高光片段` |
| 状态 | `requires_user_input` | `done` |
| 产物 | — | **0** |

### 4.2 子 Run 的意图识别结果

摘自 `reports/artifacts/defect-mix/child-run-detail.json`：

```json
{
  "decision": "unsupported",
  "candidates": [],
  "confidence": 1.0,
  "intent_kind": "unsupported",
  "workflow_id": null,
  "user_message": "该请求目前没有可执行的 CinLink 工作流程。",
  "relation_to_current_plan": "none"
}
```

### 4.3 续跑请求其实带了上下文，但没被用上

从 trace 中提取的第二次 `POST /v1/agent/runs` 请求体（脱敏见 `submit-2-summary.json`）：

| 字段 | 值 |
|---|---|
| prompt | `最多用 4 个高光片段` |
| context_files | 2 个（两个源视频都在） |
| resource_mentions | 2 |
| recent_messages | 3 条（含原始混剪指令） |
| `conversation_state.last_agent_task_frame_json` | **有值**，且包含：`intent_resolution.status = "resolving"`、`asked_fields = ["max_clips"]`、`clarification_round = 1`、`resolved_parameters = {highlight_selection:"true", target_duration_sec:"18"}`、`candidate_workflows = ["multi_video_montage"]`、`available_resources` 两个 video |

也就是说：**待回答的槽位、已解析的参数、候选工作流、两个素材引用都在请求里**，但子 Run 仍然从头做意图识别，得出 `unsupported`。

### 4.4 另一种失败形态

同一操作在不同尝试中还会出现（共 3 次）：

```json
{
  "code": "intent_recognition_invalid_output",
  "message": "Intent recognition returned an invalid result. Please retry."
}
```

失败节点 `__plan_agent_run__`（server executor），Run 状态 `failed`。说明意图识别对「简短回答 + 上一轮任务帧」这条输入路径本身就不稳定。

### 4.5 页面表现

`reports/artifacts/defect-mix/ui-clarification-continuation.png`：澄清问答卡片下方直接是「该请求目前没有可执行的 CinLink 工作流程」，用户侧没有任何可继续的入口。

## 5. 根因分析（待服务端确认）

现有证据指向**澄清续跑被当成一条全新的自由文本请求**：

1. 客户端在回答文本型澄清时，走的是 `executeWorkspaceAgent(answer)`，即新建一个 Run，prompt 就是回答原文；
2. 服务端对该 Run 重新做意图识别，没有消费 `last_agent_task_frame_json.intent_resolution` 里的 `status: "resolving"` / `asked_fields: ["max_clips"]`；
3. `max_clips` 是数值槽位，回答文本「最多用 4 个高光片段」没有被解析成 `max_clips = 4`；
4. 重新识别失败时，服务端返回 `unsupported`（而不是回到澄清或报可重试错误），前端又把 `unsupported` 当成正常回复展示，于是表现为“完成了却没有产物”。

## 6. 影响范围

- 所有**需要槽位澄清**的工作流都会受影响，不限于混剪：只要用户回答后走“新 Run + 回答原文”路径，就可能被判 unsupported / invalid output。
- 用户侧表现高度误导：任务显示“已完成”，实际没有任何产物，也没有失败原因。
- 预发上无法通过自然交互完成双素材混剪；只有一次性在提示词里写全参数才可能绕过（未验证）。

## 7. 建议修复

按优先级：

1. **续跑优先消费任务帧**：当请求带 `last_agent_task_frame_json` 且 `intent_resolution.status = "resolving"` 时，把新 prompt 当作 `asked_fields` 的回答，合并进已有参数（`target_duration_sec=18`、`highlight_selection=true`、`max_clips=4`），跳过完整重新分类。
2. **数值槽位校验**：`max_clips` 限定 2–10 的整数；解析不出时**再次澄清或报可重试错误**，不要落到 `unsupported`。
3. **一致性保护**：存在未解决澄清时，不应返回 `decision: "unsupported"`，这属于自相矛盾状态；应保留澄清或返回明确错误。
4. **客户端可选加固**：回答澄清时附带 `{slot_key, value}` 结构化字段，服务端不必依赖 NLU 从自然语言里抽参数。
5. 对 `intent_recognition_invalid_output` 做技术重试或降级（同一次操作里 3/7 次出现）。

## 8. 修复后的回归方式

自动化用例已就绪（当前因该缺陷默认 fixme）：

```powershell
cd E:\proj\deepseek-cinlink
$env:CINLINK_INCLUDE_BLOCKED='1'
npm run test:flows -- -g mix
```

期望：Run 收敛 `done`，产物为 5–40 秒的视频，G3–G7 全绿。人工复测按第 2 节步骤操作即可。

## 9. 附件

| 文件 | 内容 |
|---|---|
| `reports/artifacts/defect-mix/repro-run.log` | 复现运行日志（含两次 run_id 与失败断言） |
| `reports/artifacts/defect-mix/child-run-detail.json` | 子 Run 完整详情（intent_result = unsupported） |
| `reports/artifacts/defect-mix/submit-1-summary.json` | 初始提交请求摘要 |
| `reports/artifacts/defect-mix/submit-2-summary.json` | 续跑请求摘要（带 context_files / recent_messages / task frame） |
| `reports/artifacts/defect-mix/ui-clarification-continuation.png` | 页面截图：澄清问答 + “无可用工作流”回复 |
| `reports/artifacts/defect-mix/page-snapshot.md` | 失败时的页面结构快照 |

> 证据中不含会话 cookie、token 或预签名 URL；原始 trace 只留本地 `test-results/`，未随报告提交。
