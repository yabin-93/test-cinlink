# MW-22：B 字幕翻译定向失败断点

2026-11-03，Asia/Shanghai。服务端仅完成静态定位，未修改或部署服务、未注入真实故障。用户明确“不修改云端代码”，改用前端响应模拟，结果如下；下方服务端注入示例仅为历史方案，不执行。

## 当前执行方式：仅验证前端

```powershell
npm run test:multi:materials:ui
```

独立配置 `playwright.multi-material-ui.config.ts`，复用 MW-22 条目并调用 `src/fixtures/mw22-ui-mock.ts`。空登录态、串行、零重试；只加载预发静态页面和语言资源，业务接口在浏览器内拦截。使用本机合成的 1 秒 MP4，不上传真实素材、不提交 AI 任务、不回写登录态。

初始模拟 A 烧录 done、B 翻译 running；通过浏览器内 SSE 更新同一条助手消息，仅把 B 改为 failed，保留 A 的状态和产物。断言原生步骤状态、B 错误提示、A 视频卡片及下载按钮；点击产品下载按钮，将本地模拟媒体下载并与夹具 SHA-256 比对。附件响应使用 data URL，覆盖浏览器下载行为，不覆盖 S3、签名或真实服务端文件链路。助手中的“1 成功，1 失败”为预置响应文本，只验证其显示，不验证服务端统计生成逻辑。

2026-11-03 21:05 执行 **1 passed，7.035 秒**，页面脚本错误 0，A 下载 22,718 字节且校验一致；类型检查通过。证据：`reports/mw22-ui-mock-20261103-210517/` 下 HTML、JUnit、两阶段截图、`ui-snapshot.txt`、`MW-22-ui-mock.json` 和 trace。此前夹具适配失败记录保留，不计为服务端用例结果。

**服务端 MW-22 仍为前置阻塞 / FIXME**：未验证 B 的真实任务失败、A 的真实执行继续、服务端回滚隔离或实际计费。此模拟是同一用例的独立执行模式，不新增设计用例，不改变默认 20 条、多素材 6 条、预发 46 条的统计，也不计为服务端部分失败通过。

## 正确的源码工作区

`C:/Users/chen/.codex/worktrees/7f90/cinlink-cloud-tool-executor`，分支 `feat/postgres-langgraph-runtime`，读取时 HEAD 为 `31cd37f78142c6cf2f06c7409eb43f6bfb2d3663`。

该工作区与预发 `/cloud-tool-executor/openapi.json` 均标识 CinLink Cloud Tool Executor 2.0.0；尚未核对部署镜像提交，调试前须确认实际服务加载此实现。`E:/proj/cinlink-cloud-tool-executor` 当前 master 为 Orchestrator 1.0.0，不能混用行号。

## 主断点

新版 `app/server_tools.py:682`，函数 `_translate_subtitle()`，位于同语言直接返回判断之后、提交翻译 job 之前。

条件断点：

```python
call.get("run_id") == "<MW22_RUN_ID>" and call.get("id") == "<B_TRANSLATE_TOOL_CALL_ID>" and target.lower().split("-")[0] == "en"
```

- `call["id"]` 就是 MCP 的 tool_call_id，映射见 `app/tool_task_runner.py:112`；`call["plan_node_id"]` 可辅助核对 B 节点。
- 先从计划/调用记录核对 B 视频的转写输出 SRT，再确认它进入本次翻译调用。检查 `call["resource_inputs"]`、`call["input_media_context"]` 和 `source`；不能将字幕输入 ID 直接当作 B 原视频 file_id。
- 只匹配整个 run_id 或 target=en 不足以隔离目标。MW-22 目前尚未提交，因此这里的本轮 ID 仍需实际执行时读取，不能使用其他用例的历史 ID。

## 历史服务端注入方案（当前禁止执行）

断点只用于暂停核对。要产生真实失败，在 682 行前临时加入下列测试分支（示例，未写入服务源码）：

```python
if (
    call.get("run_id") == "<MW22_RUN_ID>"
    and call.get("id") == "<B_TRANSLATE_TOOL_CALL_ID>"
    and target.lower().split("-")[0] == "en"
):
    raise RuntimeError("MW22_INJECTED_B_TRANSLATION_FAILURE")
```

这会从真实翻译处理函数返回异常，不删除输入、不修改状态回读、不停止整个 worker，并绕开翻译提供方/内部 fallback，不产生本次翻译提供方调用。不要把调试控制台单独执行 raise 当作向暂停协程注入异常；也不要长时间暂停整个进程等待超时，以免影响 A。

## 确认失败仅写入 B

| 新工作区位置 | 核验内容 |
|---|---|
| `app/server_tools.py:692` | 正常路径在此提交翻译 job；上述注入后不应走到这里 |
| `app/tool_task_worker.py:147` | 捕获 B 异常；error_for 生成 code=TOOL_EXECUTION_FAILED、message=注入标记 |
| `app/tool_task_worker.py:150` | finish 的 task_id 必须为 B 工具任务，status=failed |
| `app/tool_task_store.py:259` | UPDATE 以 task_id、running 状态及 worker_id 限定，不批量更新同 run 的其他工具 |
| `app/tool_task_callback.py:35` | 回调带 B 的 task_id/run_id/tool_call_id、failed 和错误标记 |

执行器层的失败写入限定在 B 工具任务。Runtime 收到回调后是否继续 A 属于上层编排行为，仍需实测 A 成片可下载且不回滚、B 失败可见、汇总 1 成功 1 失败；如果 A 被连带取消，应记录为隔离问题，不能改成整项目失败后算通过。

当前测试脚本仍在 faultRequired 前置处停止。真正接入时还需提供注入前置和部分失败断言，不能只删除阻塞并沿用全部成功断言。
