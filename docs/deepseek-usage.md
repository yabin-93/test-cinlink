> 历史 DeepSeek 使用说明。2026-11-03 已迁入 Codex；当前根目录为 `C:\Users\chen\Documents\ChatGPT\cinlink`。后续请先读 [Codex 上下文](codex-context.md)，本文中的源工程路径仅作历史参考。

# 在 DeepSeek 中使用本测试框架

本文面向在 DeepSeek Harness（Web GUI / CLI）里调用本工程的 Agent 或人。工程根目录固定为 `E:\proj\deepseek-cinlink`，所有命令都在该目录执行。

## 1. 最短路径

```powershell
cd E:\proj\deepseek-cinlink
npm ci          # 首次或依赖变更后
npm run verify  # 类型检查 + 118 条离线用例
```

`verify` 是给 Agent 用的单一入口：不联网、不写 `reports/` 之外的文件、不产生业务副作用，可反复执行。

## 2. 为什么默认入口是离线的

`npm test` 只跑 `unit` 和 `gates` 两个 project：

- `unit`：上传分片数、素材登记、Job 状态机、媒体/SRT/产物断言器的纯函数单测；
- `gates`：用 mock 观测快照演练 G1–G7 的判定，包括澄清流程、状态倒退、悬挂、重复提交、孤儿任务等反例。

这些用例证明"判定逻辑本身正确"，不需要靶场、账号或网络。Agent 每次改完代码都应先跑它。

## 3. 预发链路（真实环境）

预发用例会打开 `https://staging-app.cinlink.ai`，使用 `local.env` 指向的会话。

```powershell
npm run doctor      # 先看配置：靶场地址、凭据文件、storageState 是否存在
npm run test:g1     # 上传 7.8MB 视频 → 分片 → @ 引用 → S3 下载，末尾删除素材
npm run test:g2     # 真实提交一个探针任务 → 回读 Run → 取消（可能计费）
npm run test:g3     # subtitle 真实任务：G3 状态时间线 → G4 收敛 → G5 产物 → G6 SRT/视频结构 → G7 账本
npm run test:watermark  # image-watermark 真实任务：视频 + 水印图 → 带水印视频
npm run test:flows      # 其余主干：translation / enhance / text-watermark / long-to-short / mix
npm run test:staging
```

运行前必须确认：

1. `.auth/storage-state.json` 存在且未被其他工程轮转；
2. 使用的是专用测试账号（G2 与六条工作流都会真实提交；实测字幕 -24、翻译 -20、长变短 -55）；
3. 没有另一个终端在跑同一份会话的预发用例。

`test:g1` 约 50 秒；`test:g2` 约 12 秒；`test:g3` 约 1.7 分钟；`test:watermark` 约 1.3 分钟；`test:flows` 约 12 分钟（enhance 单条约 7 分钟，long-to-short 含自动渲染约 3 分钟）；`test:staging` 约 15 分钟。报告在 `reports/html/`，失败证据在 `test-results/`，产物落盘在 `reports/artifacts/g3-g7-*/`。

### 有头运行

想在屏幕上看着工作流跑：把 `CINLINK_HEADLESS` 设为 `0` 再执行同一套命令。

```powershell
$env:CINLINK_HEADLESS='0'
npm run test:watermark
```

- 配置：`playwright.config.ts` 的 `use.headless = process.env.CINLINK_HEADLESS !== "0"`；`npm run auth` 本来就是有头。
- 需要交互式桌面会话；在无桌面的 CI / 服务里会启动失败或不可见。
- 有头模式**不改变断言与等待逻辑**（等待仍是具体条件 + 轮询上限），实测 headless 与 headed 结果一致。
- 建议只对单条工作流用有头：`test:staging` 有头会连续弹两次浏览器窗口。

### 失败调试流程

1. 先看失败信息属于哪一关（G3/G4/G5/G6/G7）；它已经写明是状态、收敛、产物还是账本。
2. 用有头单条重放，盯着浏览器看卡在哪一步：

   ```powershell
   $env:CINLINK_HEADLESS='0'
   npx playwright test --project=staging tests/staging/g3-g7-image-watermark.spec.ts -g "提交图片水印任务"
   ```

3. 需要逐步执行时用 Playwright Inspector：`npx playwright test --project=staging --debug`（或 `$env:PWDEBUG='1'`）。
4. 失败会自动留 trace：`npx playwright show-trace "test-results\<用例目录>\trace.zip"`，可看每一步 DOM 快照与网络请求。
5. HTML 报告：`npm run report`（`reports/html/index.html`）。
6. 调试同样会轮转会话，不要和其他预发运行并发；有头只影响可见性，不影响判定。

## 4. 会话失效怎么办

`npm run auth` 会启动**有头** Chrome 并停在登录页，需要人工完成邮箱验证码登录；登录状态保存到 `local.env` 指定的 `CINLINK_TEST_STORAGE_STATE`。这一步不能由 Agent 无人值守完成。

默认登录等待5分钟。人工恢复时可设 `$env:CINLINK_AUTH_WAIT_MS='0'` 后执行 `npm run auth`，窗口持续保留到登录成功或手动关闭；只打开一个窗口，完成后用 `Remove-Item Env:CINLINK_AUTH_WAIT_MS` 恢复默认等待。

判定会话失效的可靠信号（不要误判成产品缺陷）：

- 错误信息含 `停在登录页` 或 `卡在「正在检查登录状态」`；
- API 返回 401 且页面最终落在登录页。

首屏加载时 `POST /platform-api/v1/auth/refresh` 返回 401 是产品预期的 fallback，不代表会话失效。

## 5. 在 DeepSeek Harness 里的建议流程

1. 读取本文件与 `AGENTS.md`（工程根目录会自动注入）。
2. 需要"确认框架可用"时：`npm run verify`，检查退出码与末尾 `passed` 数。
3. 需要真实链路证据时：`npm run doctor` → `npm run test:staging`，把 `reports/junit.xml` 的统计和失败附件的路径带回结论。
4. 改动断言器或操作封装后：先 `npm run verify`，再按需跑单条预发用例定位。
5. 报告结果时区分三类：**离线通过**（逻辑正确）、**预发通过**（真实链路可跑）、**显式待接入/未覆盖**（G2 的两个 fixme、mix 的产品缺陷、G6 内容层，不能算通过）。

## 6. 结果与证据位置

| 位置 | 内容 |
|---|---|
| 控制台 | `N passed`、`N skipped`、`N failed` |
| `reports/html/index.html` | 最近一次运行的 HTML 报告 |
| `reports/junit.xml` | 最近一次运行的 JUnit 结果 |
| `test-results/` | 失败截图、trace、G1/G2 结构化附件 |
| `reports/artifacts/g3-g7-subtitle/` | G3 下载的字幕与视频产物，供人工复核 G6 内容层 |
| `reports/artifacts/g3-g7-image-watermark/` | 水印产物视频与抽帧截图，供人工复核水印位置/不透明度 |
| `reports/artifacts/g3-g7-workflows/` | 五条主干（translation/enhance/text-watermark/long-to-short/mix）的产物与证据 |

`reports/` 与 `test-results/` 每次运行会被覆盖；需要留档时复制成 `reports/run-<日期>/`。

## 7. 扩展用例

- 新增纯函数断言：放 `src/assertions/`，在 `tests/unit/` 补正反例。
- 新增关卡判定：放 `src/levels/gates.ts`，在 `tests/gates/` 补演练。
- 新增预发用例：放 `tests/staging/`，复用 `src/workspace.ts` 的操作封装与 `src/fixtures/staging-session.ts` 的会话回写；清理逻辑必须放 `finally`。

## 8. 迁移来源与差异

本工程由 `E:\proj\test-cinlink-web` 整体复制而来（不含 `node_modules/`、`reports/`、`test-results/`）。差异共十处：

1. `package.json` / `package-lock.json` 的工程名改为 `deepseek-cinlink-tests`；
2. `local.env` 指向本工程自己的 `.auth/storage-state.json`；
3. 新增 `AGENTS.md`、本文件与 `npm run verify`；
4. `README.md` 更新路径与 DeepSeek 用法；
5. 修复 `src/assertions/artifact.ts` 的 `metaNumber`：空字符串不再被 `Number("")` 转成 `0`。原实现把缺失的 `audio_stream_count` 当成 0，误报"音轨数为 0"；该用例在来源工程同样失败（已复现），属于框架缺陷而非环境差异。
6. 修正 `src/config.ts` 的 `credentialStatus().ready`：改为只看 `storageState`。原实现要求"邮箱/API Key + storageState"，有会话但没填邮箱时会误报未就绪，doctor 因此建议去重新登录。
7. 扩展 `src/workspace.ts` 三处：`referenceAssetInPrompt` 新增 `{ clear: false }`，允许同一个 composer 依次引用多个素材（原实现每次都 `fill("")`，第二个引用会抹掉第一个）；新增 `waitForActiveDrain`，任务 done 后等 worker 释放 `active`，避免把释放延迟误判成孤儿任务；新增 `pollRunUntilSettled`，遇到带 `auto_render_at` 的渲染确认时继续等待自动渲染，而不是把 `requires_user_input` 当终态。
8. 新增 `tests/staging/g3-g7-subtitle.spec.ts` 与 `npm run test:g3`：来源工程只有 G1/G2 真实用例，G3–G7 的断言器从未被真实任务串起来过。
9. 新增 `tests/staging/g3-g7-image-watermark.spec.ts` 与 `npm run test:watermark`：视频 + 水印图片两个素材的真实水印任务。
10. 新增 `tests/staging/g3-g7-workflows.spec.ts` 与 `npm run test:flows`：translation / enhance / text-watermark / long-to-short / mix 五条主干表驱动；mix 有产品缺陷证据，默认标 fixme（`CINLINK_INCLUDE_BLOCKED=1` 可强制运行）。

除第 5、6、7 点外，`src/`、`tests/`、`tools/` 与来源逐字节一致；靶场地址、断言阈值、超时、worker/retry 配置均未改动。
