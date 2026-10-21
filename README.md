# DeepSeek × CinLink Web 链路测试

CinLink Web 的自动化测试工程：离线断言器 + 本地批注 + 预发真实链路（G1–G7），用于在 DeepSeek Harness 或任意可执行命令的 Agent 中运行。

- 离线 116 条、本地批注 39 条、预发 29 条、批注真实链路 16 条
- 工作流覆盖 34 个：8 个主工作流 + 6 个生成类 + 3 个快捷卡片 + 5 个多工作流场景 + 12 条链路
- 用例矩阵、自动化状态、脚本清单统一在 [workflow-material-matrix.xlsx](docs/design-cases/workflow-material-matrix.xlsx)

## 快速开始

```powershell
cd E:\proj\deepseek-cinlink
npm ci
npm run verify          # tsc + 116 条离线，约 9 秒
npm run auth            # 预发会话失效时先登录
npm run test:smoke      # 预发冒烟 3 条：字幕 / clean-cut / AI 生图
```

`npm run verify` 退出码为 0 即框架可用；改完测试代码必须重跑。

## 环境

| 依赖 | 要求 |
|---|---|
| Node.js | >= 20 |
| 系统 Chrome | 预发用例 `channel: chrome` |
| ffmpeg / ffprobe | 仅媒体断言器单测需要 |
| 本地批注 | worktree + `127.0.0.1:4210` dev server |

三种运行环境：

| 环境 | 用途 | 是否联网 |
|---|---|---|
| 离线 | 断言器、关卡演练 | 否 |
| 本地 preview | 批注 UI、规则层 | 否 |
| 预发 staging | G1/G2、工作流、卡片、批注真实链路 | 是，消耗积分 |

## 命令

### 离线 / 本地

| 命令 | 内容 |
|---|---|
| `npm run verify` | 类型检查 + 116 条离线 |
| `npm test` | unit + gates（116） |
| `npm run test:gates` | G1–G7 关卡演练（24） |
| `npm run test:annotation` | 批注规则 27 + 本地 UI 12 |
| `npm run test:annotation:staging` | 批注真实链路 16 |

### 预发

| 命令 | 内容 | 条数 |
|---|---|---|
| `npm run test:g1` | 上传、分片、`@` 引用、S3 | 4 |
| `npm run test:g2` | 提交受理、回读、取消 | 3（2 fixme） |
| `npm run test:g3` | 字幕 | 1 |
| `npm run test:watermark` | 图片水印 | 1 |
| `npm run test:flows` | 主工作流（translation / clean-cut / enhance / text-watermark / long-to-short / mix） | 6（mix fixme） |
| `npm run test:cards` | 卡片入口（AI 生图/生视频/总结/生成解说/长视频变短/本地素材查找） | 6（1 fixme） |
| `npm run test:quick` | 快捷卡片（转写/导出/查找片段） | 3（1 fixme） |
| `npm run test:multi` | 多工作流（MW-01~05） | 5（1 fixme） |
| `npm run test:staging` | 全部预发 | 29 |

### 分层执行

| 层级 | 命令 | 条数 |
|---|---|---|
| L0 离线 | `npm run verify` | 116 |
| L1 冒烟 | `npm run test:smoke` | 3 |
| L2 回归 | `npm run test:regression` | 29 |
| L3 全量 | `npm run test:full` | 29 |

全量与回归共用同一份脚本，靠 `@smoke` / `@regression` 标签筛选。

### 有头与工具

```powershell
$env:CINLINK_HEADLESS='0'; npm run test:flows
npm run auth            # 人工登录（有头）
npm run auth:profile    # 批注持久 profile 登录
npm run doctor          # 配置诊断（不代表会话有效）
npm run report          # 打开 HTML 报告
```

## 工作流覆盖

| 类别 | 数量 | 已自动化 |
|---|---|---|
| 主工作流 | 8 | 7（混剪 fixme） |
| 生成类 | 6 | 5（本地素材查找 fixme） |
| 快捷卡片 | 3 | 2（查找片段 fixme） |
| 多工作流 | 5 | 4（MW-04 fixme） |
| 跨工作流链路 | 12 | 0（`[PLAN]`） |

主工作流：字幕、翻译、增强、文字水印、图片水印、长变短、混剪、去口水词。

固定锚点：

- 卡片：`[data-workspace-action-id]`、`[data-workspace-category]`
- 快捷卡片：`[data-workspace-quick-prompt]`
- 参数：`[data-workspace-parameter-toggle]`
- 提交：`#workspace-send`；输入框：`#workspace-prompt`

## 用例与自动化状态

| 文档 | 用途 |
|---|---|
| [workflow-material-matrix.xlsx](docs/design-cases/workflow-material-matrix.xlsx) | 7 页：总览 / 自动化状态 / 工作流用例 78 / 卡片清单 15 / 卡片用例 36 / 专项 23 / 脚本清单 25 |
| [14-workflow-material-paths.md](docs/design-cases/14-workflow-material-paths.md) | 工作流 × 素材 × 发送矩阵、卡片参数、上下文与链路 |
| [15-automation-registry.md](docs/design-cases/15-automation-registry.md) | 用例 ↔ 脚本映射、执行层级、维护约定 |
| [CinLink-Web-AI工作流链路测试设计.md](CinLink-Web-AI工作流链路测试设计.md) | G1–G7 设计与当前落地状态 |

标记约定：

| 标记 | 含义 |
|---|---|
| `[AUTO]` | 已有脚本 |
| `[FIXME]` | 脚本存在但默认跳过 |
| `[PLAN]` | 仅设计 |
| `[BLOCKED]` | 被缺陷阻塞 |

## 设计用例库

基于 Figma `Cinlink 改版` 整理 175 条功能流程用例（P0 62 / P1 79 / P2 34），其中视频批注 07 扩充到 59 条（设计稿优先）。

- 入口：[docs/design-cases/00-overview.md](docs/design-cases/00-overview.md)
- 分模块：`docs/design-cases/01-*.md` ~ `13-*.md`
- 汇总表：`reports/design-cases.xlsx`

重新生成：

```powershell
python tools/design-cases/build-xlsx.py
```

## 预发当前状态（2026-10-21）

预发重构期间实测：

| 项 | 现象 | 状态 |
|---|---|---|
| 新建会话按钮 | 新版侧栏 `opacity: 0`，`:visible` 点不到 | 已加 DOM click 回退 |
| 上传完成 | 缩略图红色「!」，页面 `Not Found` | 待开发修复 |
| 提交 Run | AI 生图在 `Understand request` 失败，`Not Found` | 待开发修复 |
| 会话 | 连续失败后回登录页 | 跑前 `npm run auth` |

**环境恢复前不要跑 cards / multi / flows**，先 `npm run verify` + `npm run test:smoke` 判断是否恢复。

## 目录

```text
src/
  config.ts / env.ts / assets.ts   靶场、环境变量、素材登记
  staging.ts                       工作台就绪判定
  workspace.ts                     上传 / @ / 提交 / 取消 / 余额
  assertions/                      upload、job、media、srt、artifact
  levels/gates.ts                  G1–G7 判定
tests/
  unit/ (92)  gates/ (24)          离线
  staging/                         g1、g2、subtitle、image-watermark、workflows、cards、quick、multi
  annotation/                      规则、本地 UI、预发真实链路
tools/                             auth、doctor、批注 setup、设计用例构建
docs/design-cases/                 设计用例与矩阵
```

## 会话与安全

- 会话：`.auth/storage-state.json`（工作流）、`.auth/chrome-profile`（批注）；均 gitignore。
- 同一时间只允许一个工程使用同一会话，fixture 会轮转写回。
- `reports/`、`test-results/`、`local.env` 不入库；预签名 URL、trace、storageState 不要外传。
- 失败证据：`test-results/`（截图、trace）、`reports/junit.xml`、`reports/artifacts/`（工作流产物）。

## 历史

- 来源链：`E:\proj\cinlink-web-tests` → `E:\proj\test-cinlink-web` → 本工程。
- 2026-10-19 迁移验证：`npm run verify` 116 条通过。
- 2026-10-21：新增 cards / quick / multi 套件，预发 19 → 29 条；补 `@smoke` / `@regression` 分层。
- 完整记录见 [docs/verification.md](docs/verification.md)。
