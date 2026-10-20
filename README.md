# DeepSeek × CinLink Web 链路测试

本工程是 `E:\proj\test-cinlink-web` 测试框架的迁移副本，用于在 DeepSeek（DeepSeek Harness / 任意支持命令执行的 Agent）中运行 CinLink Web 的离线断言器与预发链路用例（G1–G7）。原工程未被修改，除两处缺陷修复外两边的 `src/`、`tests/`、`tools/` 内容一致，差异仅在工程名、路径、会话文件位置和使用入口。

原始来源链：`E:\proj\cinlink-web-tests` → `E:\proj\test-cinlink-web` → 本工程。

## 在 DeepSeek 中使用

- Agent 执行约定见 [AGENTS.md](AGENTS.md)；命令、环境变量、结果读取方式见 [docs/deepseek-usage.md](docs/deepseek-usage.md)。
- 一条命令完成离线自检：`npm run verify`（类型检查 + 116 条离线用例）。
- 默认入口 `npm test` 只跑离线断言器与关卡演练，不联网、不提交真实任务，适合让 Agent 反复执行。
- 预发用例需要有效会话，先 `npm run doctor` 看配置，再按需 `npm run test:g1` / `npm run test:g2` / `npm run test:g3`。

## 运行

要求 Node >= 20、系统 Chrome。复用的媒体断言器单测还需要 PATH 中有 ffmpeg、ffprobe。

```powershell
cd E:\proj\deepseek-cinlink
npm ci
npm run verify            # typecheck + 离线断言器与关卡演练
npm run doctor            # 配置诊断，不能证明会话仍然有效
npm run test:g1           # 预发上传、分片、@ 引用、对象下载
npm run test:g2           # 预发提交入口；有两个显式待接入项
npm run test:g3           # 预发 subtitle 真实任务：G3 可观测、G4 收敛、G5 产物、G6 结构、G7 账本
npm run test:watermark    # 预发 image-watermark 真实任务：视频 + 水印图片 → 带水印视频
npm run test:flows        # 其余主干：translation / enhance / text-watermark / long-to-short / mix
npm run test:staging      # 全部预发用例
npm run report
```

有头运行（看真实浏览器）：先执行 `$env:CINLINK_HEADLESS='0'`，再跑上面任一 `test:*`；`npm run auth` 本身固定有头。

保持一个 worker、零重试。G1/G2/G3/水印不用重跑掩盖失败；浏览器等待具体条件，上传与提交数据从响应获取。

## 迁移内容

- `src/`：上传、Job、媒体、SRT 断言器，关卡判定、操作封装、素材配置、会话 fixture。
- `tests/unit/`、`tests/gates/`：116 条离线测试（unit 92 条、gates 24 条）。
- `tests/staging/g1-upload.spec.ts`、`g2-submit.spec.ts`：迁移的预发用例。
- `tests/staging/g3-g7-subtitle.spec.ts`：**本工程新增**的 subtitle 真实链路用例，把 G3–G7 串起来（来源工程没有）。
- `tests/staging/g3-g7-image-watermark.spec.ts`：**本工程新增**的 image-watermark 真实链路用例，两个素材引用 + 带水印视频产物。
- `tests/staging/g3-g7-workflows.spec.ts`：**本工程新增**的表驱动用例，覆盖 translation / enhance / text-watermark / long-to-short / mix 五条主干。
- `tools/`：登录和配置诊断工具；`assets/`：水印图片。
- `package-lock.json`：迁移时沿用的依赖锁，本工程独立安装依赖。

迁移只改了工程标识、使用入口、两处框架缺陷（见下），并新增一条 subtitle 真实链路用例。测试逻辑、断言阈值、靶场地址默认值保持原样。`src/`、`tests/`、`tools/` 与来源工程的差异仅两处：`src/assertions/artifact.ts` 的 `metaNumber` 让空字符串返回 `NaN`（原实现会把缺失的 `audio_stream_count` 误报成"音轨数为 0"，来源工程同样失败）；`src/config.ts` 的 `credentialStatus().ready` 改为只看 `storageState`（原实现有会话但没填邮箱时会误报未就绪）。逐文件哈希对比记录见 [docs/verification.md](docs/verification.md)。

## 当前验收范围

| 关卡 | 已接入 | 待接入 |
|---|---|---|
| G1 | 非空 cloud_file_id、5 MiB 分片数、@ 引用、S3 下载与源文件字节数 | 无 |
| G2 | HTTP 受理、一次创建请求、非空 Run ID、按 ID 回读、余额快照 | 账户/请求范围新增 Job 恰好为 1；按 Job 关联的预扣流水次数 |
| G3–G7 | subtitle / image-watermark / translation / enhance / text-watermark / long-to-short 六条真实任务，G3–G7 全绿 | mix 双素材混剪被产品缺陷阻塞（[缺陷报告](docs/defects/CINLINK-MIX-001.md)）；G6 内容层；G7 预扣流水次数 |

G2 的两个缺口在报告中标为 fixme/跳过。共享环境全局 worker 指标只作证据，余额差只能说明金额变化；它们不能证明 Job 创建次数或预扣次数。七个工作流中六条主干已跑通，mix 有明确的缺陷证据、默认跳过。

## 设计用例（功能流程）

基于 Figma `Cinlink 改版` 的 13 个功能页面，整理出 **175 条功能流程用例**（P0 62 / P1 79 / P2 34），每条都标注了设计来源画板。其中「07 视频批注」已按 PRD `ERYE-131` 对齐 MVP 边界、状态机（draft/submitted/running/completed/failed/cancelled/unavailable）、剪辑变更映射与异常表，扩充到 59 条：设计稿优先（点选/圈选/框选、物体识别、默认 5 秒/最长 30 秒、多批注重叠），PRD 只补充未冲突的状态机与异常规则。

- 入口：[docs/design-cases/00-overview.md](docs/design-cases/00-overview.md)（覆盖地图、约定、已知限制）
- 分模块：`docs/design-cases/01-*.md` ~ `13-*.md`
- 汇总表：[reports/design-cases.xlsx](reports/design-cases.xlsx)（含「全部用例」「覆盖地图」两个 sheet）
- 设计截图：`reports/figma-exports/<页面>/`，文件名即状态名

重新生成 Excel：

```powershell
python tools/design-cases/build-xlsx.py
```

其中 07 视频批注的 P0 已落成 **24 条可执行用例**（规则层 18 + 编辑器 UI 6）：

```powershell
npm run test:annotation
```

依赖产品分支 `feature/web-editor-video-annotation` 的 worktree 与本地 `127.0.0.1:4173` dev server，准备步骤见 [docs/design-cases/07-annotation-automation.md](docs/design-cases/07-annotation-automation.md)。

## 本机配置与会话

`local.env` 指向本工程自己的 `.auth/storage-state.json`（迁移时从原会话复制），并配置实际素材目录；两者都已 gitignore，不入库。fixture 会把轮转后的会话写回该文件，因此同一时间只能有一个工程使用这份会话；跑过本工程后，原 `test-cinlink-web` 需要重新登录或改用自己的会话文件。

需要独立账号时从 `.env.local.example` 复制配置，填入测试邮箱，设置自己的 `CINLINK_TEST_STORAGE_STATE`，然后运行 `npm run auth` 在打开的浏览器中完成验证码登录。API Key 配置不等于浏览器已经登录。

真实 G1 会上传并删除本次素材；真实 G2 会提交并取消任务；subtitle、image-watermark、translation、enhance、text-watermark、long-to-short 会跑完整真实任务，其中已观测到的扣费为 subtitle 24 分、translation 20 分、long-to-short 55 分，enhance 与两个水印本次未扣。所有素材与任务都在 `finally` 中清理。HTTP 401 或登录页表示需要恢复会话，不能当成产品缺陷。

失败证据默认在 `test-results/`，包含截图、trace；结构化 G1/G2 快照作为附件。`reports/` 保存 HTML 与 JUnit。预签名 URL、网络 trace 和会话文件均只留本地，不提交。

原始设计：[CinLink-Web-AI工作流链路测试设计.md](CinLink-Web-AI工作流链路测试设计.md)。原工程复用记录：[docs/reuse-plan.md](docs/reuse-plan.md)。

本工程迁移验证（2026-10-19）：`npm run verify` 116 条通过、类型检查通过；预发 G1/G2 两轮均为 5 条通过 + 2 条显式待接入。同日跑通七条主干中的六条：subtitle、image-watermark、translation、enhance、text-watermark、long-to-short；mix 双素材混剪复现产品缺陷（澄清续跑丢失上下文 / 意图识别失败），默认标为 fixme。证据在 `reports/` 与 `reports/artifacts/g3-g7-*/`。历史验证（来源工程，2026-10-16）：`npm test` 102 条通过。完整记录见 [docs/verification.md](docs/verification.md)。
