# 验证记录

本文件保存两次验证：2026-10-19 迁移到 `E:\proj\deepseek-cinlink`，以及 2026-10-16 在来源工程 `E:\proj\test-cinlink-web` 的接入验证。

## 一、2026-10-19 迁移到 deepseek-cinlink

目标：把 `test-cinlink-web` 的测试框架整体迁移到本工程，并确认在 DeepSeek 中可直接使用。

| 命令 | 实测结果 |
|---|---|
| `npm ci --no-audit --no-fund` | 成功，6 个包，沿用来源工程的 `package-lock.json` |
| `npm run verify` | 类型检查 0 错误；离线 116 passed / 0 failed（约 3.6 s） |
| `npm run doctor` | 1 passed；修复 `ready` 判定后输出"✓ 已就绪"（会话文件可用，见下） |
| `npm run test:staging` | 两轮均为 5 passed / 2 skipped / 0 failed，各约 1.1 分钟 |
| `npm run test:g3` | 1 passed（1.7 分钟），真实 subtitle 任务，余额 -24 分 |
| `npm run test:watermark` | 首次 1 failed（澄清，composer 丢失指令文本）；修正后 1 passed（1.3 分钟），余额未变 |
| `CINLINK_HEADLESS=0` + `test:watermark` | 有头运行：首次 G7 误报孤儿任务；加 active 回落等待后 1 passed（1.3 分钟） |

### 文件一致性

对 `src/`、`tests/`、`tools/` 逐文件 SHA-256 比对：除 `src/assertions/artifact.ts`、`src/config.ts`、`src/workspace.ts` 三处修改外与来源完全一致。`tests/staging/g3-g7-subtitle.spec.ts`、`g3-g7-image-watermark.spec.ts` 是本工程新增文件（来源没有）。工程标识、`local.env`、`README.md`、`AGENTS.md`、`docs/deepseek-usage.md`、`package.json`、`package-lock.json` 为预期差异。

### 修复的框架缺陷

首次 `npm run verify` 为 115 passed / 1 failed：`G6 产物结构与参数 › 视频时长在容差内且有音轨和哈希时通过` 误报"产物音轨数为 0，期望至少 1"。

根因在 `src/assertions/artifact.ts` 的 `metaNumber`：`Number("") === 0`，缺失的 `audio_stream_count` 被当成 0，触发 `streams < 1` 失败；同一函数也会把缺失的 `duration_sec` 误报成"时长偏差"。

在来源工程 `E:\proj\test-cinlink-web` 用同一命令复现了同样的失败（退出码 1），因此这是框架既有缺陷，不是迁移环境问题。修复方式：空字符串返回 `NaN`，缺失字段走"未提供"分支而不是"为 0"分支。修复后 116 条全绿，未改动任何断言阈值。

### 修正的配置诊断

迁移后 `npm run doctor` 在会话文件存在、预发用例实际可跑的情况下仍报"✗ 尚未就绪"，原因是 `credentialStatus().ready` 要求"邮箱/API Key 且有 storageState"。浏览器用例实际只使用 storageState，邮箱/API Key 只用于重新登录，所以该判定会误导 Agent 去重新登录。

修复：`ready` 改为只看 `storageStatePresent`，缺失项提示相应调整。修复后 doctor 输出"✓ 已就绪"，与随后 5 条预发用例通过的事实一致。doctor 仍不能证明会话未过期（页面首屏探测才是权威），这一点保留在说明文字里。

### G1（真实预发）

- `cloud_file_id`：`file_d41797f7749f4e0d`。
- 上传名：`7MB-1792391360399.mp4`，源文件 7,815,126 字节，服务端回显大小与 MIME 一致。
- 5 MiB 分片，实际 2 个分片请求，`multipart=true`。
- @ 引用按本次 `cloud_file_id` 命中并插入。
- S3 预签名 URL HTTP 200，下载字节数与源文件一致。
- 三条上传用例均在 `finally` 中删除云文件，删除成功。

### G2（真实预发）

- 提交返回 `run_62601a316fd2d1d51edcbe82`，初始状态 `queued`。
- 只观察到 1 个创建请求；按 ID 可回读服务端 Run。
- 余额 11,795 → 11,795（分为单位，未变化；该事实不能证明预扣次数正确）。
- 任务在 `finally` 中取消成功。
- 未覆盖（fixme，报告显示 2 skipped）：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣流水次数。

### G3–G7（subtitle 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-subtitle.spec.ts`（`npm run test:g3`）：上传 7.8MB 素材 → `@` 引用 → 提交固定提示词「给这个视频生成中文字幕」→ 每 5 秒轮询状态 → 下载并校验产物 → 余额与 worker 池前后快照。

- `run_id`：`run_cb73662564836ef3e16e2120`。
- 状态时间线：`queued ×5 → waiting_for_local → running → waiting_for_local ×6 → done`，无状态倒退。
- 收敛耗时 72.6 秒（轮询上限 15 分钟）。
- 产物 9 个；交付三要素（id / name / url / cloud_file_id）齐全。
- `subtitle.srt` 1,360 字节、15 条字幕；序号连续、时间戳单调、无 U+FFFD。
- `subtitled-video.mp4` 可解码，60.49 秒（源 60.5 秒）、1 条音轨。
- 余额 11,795 → 11,771（-24 分）：真实计费已发生；**扣减次数**仍无法证明（见 G2/G7 待接入项）。
- 任务在 `finally` 中取消（已完成任务取消接口仍返回成功），素材删除成功。
- G6 只做结构层；字幕与语音是否同步属于内容层，按要求留人工复核，产物留在 `reports/artifacts/g3-g7-subtitle/`。
- 仍未覆盖：G6 内容层、G7 的预扣流水次数；其余主干的实测见下文「其余五条主干」。

### G3–G7（image-watermark 真实任务）

2026-10-19 新增 `tests/staging/g3-g7-image-watermark.spec.ts`（`npm run test:watermark`）：上传 `7MB.mp4` 与水印图 `cinlink-smoke-watermark.png`，依次 `@` 引用两个素材，提交固定提示词「给这个视频添加图片水印，水印图片用我引用的这张图片」，轮询状态并校验产物。

- `run_id`：`run_6e0daf7653efa2cd0d94c191`。
- 状态时间线：`queued ×3 → waiting_for_local ×7 → done`，无状态倒退。
- 收敛耗时 53.3 秒（轮询上限 15 分钟）。
- 产物 1 个：`watermarked-video.mp4`，6,449,847 字节。
- ffprobe：60.49 秒（源 60.5 秒）、1280x720、25.00 fps、h264、1 条音轨。
- 余额 11,771 → 11,771（本次未扣减）。余额不变不能证明水印工作流不计费，只能记录事实。
- 水印是否真的叠加：自动断言只覆盖结构层，另抽帧 `reports/artifacts/g3-g7-image-watermark/frame-top-right.png` 人工确认——右上角可见半透明水印图片（四色方块 + CinLink 底纹），说明图片水印确实生效。
- 任务在 `finally` 中取消，两个素材删除成功。

#### 首次失败与修正

首次运行在 G4 失败：`终态为 requires_user_input，期望 done`。页面快照与请求体显示提交的 prompt 只有两段 `@` 引用，指令文本丢失，AI 因此反问「你想如何处理这段视频和这张图片？」。

根因：两个引用 chip 占满一行后，`editor.click()` + `End` 可能把光标落在 chip 上而不是文本末尾，`insertText` 被丢弃。修正分两处：

1. `src/workspace.ts` 的 `referenceAssetInPrompt` 增加 `{ clear: false }`，否则第二次调用会把第一个引用 `fill("")` 掉；
2. 用例中把选区显式折叠到编辑器内容末尾再插入指令，并在提交前断言 composer 文本包含指令——避免只提交引用而浪费一次真实任务。

修正后一次通过。该失败属于用例组装代码问题，不是产品缺陷。

#### 有头运行与 G7 抖动
有头模式（`CINLINK_HEADLESS=0`）可以直接跑同一条工作流，浏览器窗口可见。首次有头运行在 G7 失败：`任务结束后 active 增加了 1，疑似留下孤儿任务`。

原因有两层：

- 任务状态变成 `done` 后，worker 释放 `active` 有几秒延迟，立刻读 `/v1/health` 会看到 +1；
- `active` 是 Runtime 全局指标，共享预发上其他人的任务也会干扰（与 G2 的 `submitted` 同类问题，设计文档已声明这类全局指标只能作证据）。

修正：在 `src/workspace.ts` 新增 `waitForActiveDrain`，done 之后在 45 秒窗口内轮询 health，等 `active` 回落到提交前基线再判定；subtitle 与水印两条用例都改用它。有头重跑通过：`run_f027fe0ab00cf8f82fc42b8a`，时间线相同、53.3 秒收敛、产物 6,449,847 字节、余额未变。

有头与 headless 的断言、等待逻辑完全一致，差别只是浏览器是否可见。

### G3–G7（其余五条主干）

2026-10-19 新增 `tests/staging/g3-g7-workflows.spec.ts`（`npm run test:flows`），表驱动覆盖 translation / enhance / text-watermark / long-to-short / mix，每条都是真实任务。

| 工作流 | 结果 | 收敛 | 产物 | 余额 |
|---|---|---|---|---|
| translation | passed（`run_fa92ccc08a22ee5a20f9ab91`） | 29.7 s | 7 个；`subtitle.srt` 1,360 B / 15 条，结构合法 | -20 |
| enhance | passed（`run_94d1357dc97fa4a2a35a5e47`） | 382.0 s | 1 个；`enhanced-video.mp4` 60.50 s / 2560x1440 / 24.96 fps / 1 音轨 | 0 |
| text-watermark | passed（`run_030fc0949fb581accc14a72f`） | 41.5 s | 1 个；`watermarked-video.mp4` 60.49 s / 1280x720 / 25 fps / 1 音轨 | 0 |
| long-to-short | passed（`run_acfa5e9a863c808662878b30`） | 152.0 s | 6 个；`rendered-clips.mp4` 20.00 s / 1280x720 / 30 fps / 1 音轨 | -55 |
| mix | **blocked**（见下） | — | — | — |

#### long-to-short 的两阶段流程

首次运行停在 `requires_user_input`：产品先给出「第 1 版高光方案」，带 `auto_render_at`（1 分钟后自动渲染），确认后才出片。

这不能当成终态。修正：在 `src/workspace.ts` 新增 `pollRunUntilSettled`——遇到 `requires_user_input` 时检查 `clarifications[].metadata.auto_render_at`，有待自动渲染项就继续轮询，只有真正的澄清（没有该字段）才停下。修正后时间线为 `… running → requires_user_input ×8 → waiting_for_local ×3 → done`，52 秒自动续跑并出片。

#### mix 的产品缺陷（默认 fixme）

双素材混剪共尝试 7 次，均未跑通，归为产品缺陷而非用例问题：

| 现象 | 次数 | 证据 |
|---|---|---|
| `intent_recognition_invalid_output`（云端模型步骤 `__plan_agent_run__` 失败） | 3 | 首轮、第三轮、以及回答澄清后的续跑（prompt 只有 "4"） |
| 停在 max_clips 澄清（「最多用几个高光片段（2～10个）？」） | 2 | 属正常两阶段流程，用例已实现自动回答 |
| done 但 0 产物，助手回复「该请求目前没有可执行的 CinLink 工作流程」 | 2 | 原始提交与回答澄清后的续跑各一次 |

关键证据：回答澄清后，产品用**回答文本本身**作为续跑 Run 的 prompt（截图与 Run 详情都是 `prompt: 4`），原任务上下文没有带上，因此续跑被判成「没有可执行的工作流程」；即使回答改成「最多用 4 个高光片段」也一样。

用例保留在 `g3-g7-workflows.spec.ts` 中并标记 fixme（`CINLINK_INCLUDE_BLOCKED=1` 可强制运行），不通过放宽 G4/G5 断言来掩盖。该缺陷需要产品侧修复澄清续跑的上下文传递，完整复现、请求体证据与修复建议见 [defects/CINLINK-MIX-001.md](defects/CINLINK-MIX-001.md)。

### 证据位置

- 预发 HTML：`reports/staging-html/index.html`；JUnit：`reports/staging-junit.xml`；运行日志：`reports/staging-run.log`、`reports/staging-run-2.log`。
- G3–G7 运行日志：`reports/g3-g7-run.log`（subtitle）、`reports/g3-g7-watermark-run*.log`（水印）、`reports/flow-*.log`（五条主干）；产物：`reports/artifacts/g3-g7-subtitle/`、`reports/artifacts/g3-g7-image-watermark/`、`reports/artifacts/g3-g7-workflows/`。
- 有头运行日志：`reports/g3-g7-watermark-headed*.log`。
- 离线 HTML：`reports/html/index.html`；JUnit：`reports/junit.xml`。
- 修复前的失败 trace：`test-results/artifact-G6-产物结构与参数-视频时长在容差内且有音轨和哈希时通过-unit/`。

报告、trace、会话均只留本地（见 `.gitignore`）。G3–G7 的断言器均已接入；七条主干中六条有真实用例并通过，mix 被产品缺陷阻塞，不能据此宣称七个工作流已全部验收。

> 产物落盘路径已从 `test-results/` 改为 `reports/artifacts/`：前者每次 Playwright 运行都会被清空，首次六条工作流的产物因此被后续离线运行清掉；改到 `reports/` 后可跨运行保留。水印用例随后重跑一次（1.4 分钟）恢复了视频与抽帧证据。

## 二、2026-10-16 来源工程接入验证（历史）

目标：复用 `E:\proj\cinlink-web-tests` 的既有实现，在 `test-cinlink-web` 接入 G1/G2。

| 命令 | 实测结果 |
|---|---|
| `npm ci --ignore-scripts --no-audit --no-fund` | 成功，沿用原依赖锁文件 |
| `npm test` | 102 passed（当时代码库的用例数；本工程复制时该目录已有 116 条） |
| `npm run typecheck` | 成功，0 个类型错误，包含 tools |
| `npm run test:staging` | 5 passed / 2 skipped / 0 failed，约 1.2 分钟 |

### G1

- 源视频实际大小 7,815,126 字节。
- 本轮登记响应返回非空 `cloud_file_id`，名称、大小、MIME 均匹配。
- 按 5,242,880 字节分片，实际观察到 2 个分片请求。
- 上传后可通过 @ 候选按本次 `cloud_file_id` 选中素材并插入引用。
- S3 对象 HTTP 200，下载体大小与源视频一致。
- 本次三个上传用例的云文件均执行清理。

### G2

- 提交返回 `run_bdd5e20042ff61a1c7c2c8ec`，初始状态 `queued`。
- 观察到 1 个创建请求，响应成功，按 Run ID 可回读服务端对象。
- 取消接口返回成功；清理位于 finally，断言失败也执行。
- 本次余额前后相等。此事实不能证明预扣次数正确。
- 未覆盖：账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣次数。这两项在用例中标为 fixme，运行报告显示 2 skipped。

### 调试与修正

账户直接读取起初返回 401，但浏览器通过产品自身的 refresh 请求成功恢复会话，因此未要求重新人工登录。

首次 G1 上传及云文件登记成功，但 @ 验收失败。trace 显示助手选择了第一个历史项目，后续项目素材登记返回 409：`project root name does not match the existing library`。
新增隔离回归先复现失败，再将入口改为 `[data-workspace-new-session="non-project"]`；修正后的回归和预发 G1 均通过。没有修改业务代码或历史项目配置。

另外两个回归检查分别验证：零字节/非法源文件大小不能通过分片校验；取消、SSE、GET、查询参数中的路径不能误计为创建 Run。

### 证据位置（历史工程）

`reports/staging-html/index.html`、`reports/staging-junit.xml`、`reports/staging-results/`、`reports/g1-initial-failure/`、`reports/offline-verification.log` 均在 `E:\proj\test-cinlink-web`。
