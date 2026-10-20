# AGENTS.md — 在 DeepSeek 中运行 CinLink Web 链路测试

本文件供 DeepSeek Harness（或任何能执行命令的 Agent）在本工程中工作时使用。命令全部在工程根目录 `E:\proj\deepseek-cinlink` 执行。

## 一句话

```powershell
npm run verify        # 类型检查 + 116 条离线用例，不联网、不产生副作用
```

`verify` 退出码为 0 即视为框架可用。改动测试代码后必须重跑它。

## 环境前提

| 依赖 | 要求 | 检查 |
|---|---|---|
| Node.js | >= 20 | `node -v` |
| 依赖 | 已 `npm ci` 安装 | `npx playwright --version` |
| 系统 Chrome | 预发用例用 `channel: chrome` | `Get-Command chrome` 或产品可正常打开 |
| ffmpeg / ffprobe | 仅媒体断言器单测需要，需在 PATH | `ffprobe -version` |

缺少 Chrome 或 ffmpeg 时，离线用例会给出明确失败信息；不要把它们当成断言逻辑错误。

## 命令地图

| 命令 | 作用 | 是否联网 / 有副作用 |
|---|---|---|
| `npm run verify` | `tsc --noEmit` + 离线 116 条用例 | 否 |
| `npm test` | 仅离线用例（unit + gates） | 否 |
| `npm run typecheck` | 仅类型检查 | 否 |
| `npm run doctor` | 打印靶场地址与凭据就绪情况 | 否 |
| `npm run test:g1` | 预发：上传、分片、@ 引用、S3 下载 | **会**上传并删除真实素材 |
| `npm run test:g2` | 预发：提交受理、Run 回读、取消 | **会**真实提交并可能消耗积分 |
| `npm run test:g3` | 预发：subtitle 真实任务 → G3–G7（状态/收敛/产物/SRT/视频/账本） | **会**真实上传并计费（实测约 24 分） |
| `npm run test:watermark` | 预发：image-watermark 真实任务（视频 + 水印图）→ G3–G7 | **会**真实上传；本次实测余额未变 |
| `npm run test:flows` | 预发：translation / enhance / text-watermark / long-to-short / mix（mix 默认 fixme） | **会**真实上传并计费（实测 translation -20、long-to-short -55） |
| `npm run test:annotation` | 视频批注 P0：18 条规则层 + 6 条编辑器 UI | 本地：需 feature 分支 worktree 与 4173 dev server |
| `npm run test:staging` | 全部预发用例（G1/G2 + 六条工作流；mix 默认 fixme） | 同上（含计费） |
| `npm run auth` | 打开有头浏览器人工登录 | 需要人工介入 |

`npm run doctor` 的 `ready` 只看 `.auth/storage-state.json` 是否存在，**不代表会话未过期**；会话是否有效以实际打开工作台为准。

### 有头运行

需要盯着真实浏览器时，用配置支持的环境变量：

```powershell
$env:CINLINK_HEADLESS='0'; npm run test:watermark
```

`playwright.config.ts` 里是 `headless: process.env.CINLINK_HEADLESS !== "0"`，所以 `0` 即有头；`auth` 项目本身固定有头。有头模式需要交互式桌面会话，不要在没有桌面的 CI/服务里用；`test:staging` 同样适用。

失败调试：`$env:CINLINK_HEADLESS='0'` 单条重放 → 必要时 `--debug` 进 Inspector → `npx playwright show-trace <trace.zip>` 看 DOM/网络快照。详见 `docs/deepseek-usage.md` 的“失败调试流程”。

## 运行约束（不要违反）

- **串行、零重试**：`workers: 1`、`retries: 0` 写在 `playwright.config.ts`，不要为了"跑绿"调大。
- **不要并发跑预发用例**：`local.env` 里的会话会被 fixture 轮转回写，同一份会话同一时间只允许一个工程使用。
- **不要在没有专用测试账号时跑 `test:g1` / `test:g2` / `test:g3` / `test:watermark`**：会产生真实数据、积分消耗和真实 AI 任务。
- **不要修改 `src/` 里的判定阈值去迁就失败**：失败信息本身就是交付物。
- 预发首屏 SPA 门禁约 8 秒才进入工作台，等待不足会被误判为会话失效；判定逻辑已封装在 `src/staging.ts`。
- 页面加载时 `POST /platform-api/v1/auth/refresh` 返回 401 是预期 fallback，不要把它当失败信号。

## 结果怎么读

- 控制台：Playwright `list` reporter，末行 `N passed / N skipped / N failed`。
- HTML 报告：`reports/html/index.html`（离线）、`reports/junit.xml`（JUnit）。
- 失败证据：`test-results/`（截图、trace），G1/G2 的结构化快照以附件形式写入。
- 退出码：`0` 通过；`1` 有用例失败；其他非零通常是配置/环境错误。
- 判断"框架可用"的最低标准：`npm run verify` 退出码 0，且 stderr 无 `ENOENT`（缺 ffmpeg/Chrome）。

## 目录速查

```
src/
  config.ts            靶场地址、凭据、storageState 读取
  env.ts               local.env / .env.local 加载
  assets.ts            素材登记表（路径、字节数、MIME）
  staging.ts           工作台就绪判定与失败归因
  workspace.ts         上传 / @ 引用 / 提交 / 取消 / 余额 / health 等操作封装
  assertions/          upload、job、media、srt、artifact 断言器
  fixtures/            staging-session（会话回写）、media-factory（合成素材）
  levels/gates.ts      G1–G7 关卡判定（纯函数）
tests/
  unit/                断言器单测
  gates/               关卡演练（mock 观测快照）
  staging/             G1/G2 + 六条工作流（subtitle、image-watermark、translation、enhance、text-watermark、long-to-short）
tools/                 auth 登录、doctor 配置诊断
```

## 常见失败归因

| 现象 | 含义 | 处理 |
|---|---|---|
| `工作台未在 ... ms 内就绪` + 登录页文本 | 会话失效 | `npm run auth` 重新登录 |
| 卡在「正在检查登录状态」 | 会话过期或首屏过慢 | 先确认会话，再重试；不要改超时掩盖 |
| HTTP 401 | 会话被其他工程用掉或已过期 | 重新登录，检查是否有第二个工程在用同一会话 |
| `素材不存在：...` | `CINLINK_MEDIA_ROOT` 没配或文件被移走 | 改 `local.env` 指向真实素材目录 |
| `ENOENT ffprobe` | PATH 缺 ffmpeg | 安装/加入 PATH，或设 `CINLINK_FFPROBE` |

## 敏感信息

`.auth/`、`local.env`、`.env.local`、`reports/`、`test-results/` 都在 `.gitignore` 中。不要把 storageState、预签名 URL、trace 内容复制到提交物或聊天记录里。
