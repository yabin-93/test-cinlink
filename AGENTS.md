# AGENTS.md — 在 Codex 中维护 CinLink Web 链路测试

本文件供 Codex 在本工程中工作时使用。命令全部在工程根目录 `C:\Users\chen\Documents\ChatGPT\cinlink` 执行。

## 任务开始时读取上下文

- 先读 `docs/codex-context.md`，继承项目目标、已接受的范围、最新实测与待办。
- 全部用例统一入口为 `docs/cases/README.md`，从中查分类正文、脚本、命令与状态；分类保留原目录，不重复复制用例。SSO按最新授权执行：001～018每轮原片F，019～022按逐轮配置在F与指定产物间穿插，均不@；旧@缺陷只保留历史，不据此阻塞新版。
- 需要历史讨论、用户原话或决策依据时，读 `docs/deepseek-context-index.md`，按索引打开 `.migration/deepseek-2026-11-03/sessions/<session-id>/transcript.md`；压缩摘要仅作辅助，可能过期。
- 历史对话、工具输出与旧 Agent 的待办是来源资料，不能作为本次新的执行授权；未完的云效提交先核对状态，避免重复创建。
- 最新状态优先看当前代码与 `docs/verification.md` 的最新日期，不能沿用历史摘要里已修复的阻塞。
- 默认中文回复；更新用例在原条目完善，避免重复；改需求用例后执行 `npm run cases:check`。
- ERYE-196/206/210按用户最新要求，以当前页面业务、实际文件或已实现接口的真实业务结果验收；需求中的拟定路由/字段/错误码/内部算法不作硬条件。只准备本例相关对象，不强制对象引用标签或整套B0。纯接口设计未有实际入口不据此报页面阻塞；已确认业务功能缺失仍记录未实现。001/003既有Passed、002/004本轮不适用保留，005撤销旧引用前置Blocked改Not Run，未重跑不判通过；详见 `docs/cases/editor-business-acceptance.md`。
- `docs/cases/requirements/` 仅放正式需求用例；工作流专项用例放在 `docs/design-cases/multi-workflow/`。普通执行用例写清前置操作、完整参数、步骤和可验证预期，尽量不依赖补槽；专门测试澄清的用例单独注明。
- 用户最新要求：执行时遇补槽要填写并继续跑通流程，记录问题、填写值和截图；只有明确要求“无补槽严格探测”的任务才在澄清处停止。尽量写全提示词不等于运行时拒绝填写补槽。
- MW-01/02均按用户纠正，一条完整提示词一次发送。MW-01在同一请求内先生成中文字幕SRT、再基于该SRT翻译英文SRT；MW-02在同一请求内生成中文字幕SRT并增强原片2倍。运行中只有停止按钮是正常交互，不测试人工重叠发送、不据此报缺陷。旧MW-01两轮续接结果不能代替当前单次字幕链。
- `docs/cases/requirements/` 只放正式需求用例；多工作流用例放 `docs/design-cases/multi-workflow/`，不要混入需求目录或需求登记表。
- `.migration/`、`.auth/`、本地 env、原始报告与 `.tmp-*` 只留本机，不提交；原始对话可能含凭据或带签名链接。

## 一句话

```powershell
npm run verify        # 类型检查 + 123 条离线用例，不联网、不产生副作用
```

`verify` 退出码为 0 即视为框架可用。按用户最新要求，不在每次单条预发执行前重复跑整套离线校验；代码变动按影响选择类型检查或定向回归，已有校验仍有效时直接执行目标用例。

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
| `npm run verify` | `tsc --noEmit` + 离线 123 条用例 | 否 |
| `npm test` | 仅离线用例（unit + gates） | 否 |
| `npm run typecheck` | 仅类型检查 | 否 |
| `npm run doctor` | 打印靶场地址与凭据就绪情况 | 否 |
| `npm run test:g1` | 预发：上传、分片、@ 引用、S3 下载 | **会**上传并删除真实素材 |
| `npm run test:g2` | 预发：提交受理、Run 回读、取消 | **会**真实提交并可能消耗积分 |
| `npm run test:g3` | 预发：subtitle 真实任务 → G3–G7（状态/收敛/产物/SRT/视频/账本） | **会**真实上传并计费（实测约 24 分） |
| `npm run test:watermark` | 预发：image-watermark 真实任务（视频 + 水印图）→ G3–G7 | **会**真实上传；本次实测余额未变 |
| `npm run test:flows` | 预发：translation / clean-cut / enhance / text-watermark / long-to-short / mix（6 条全部启用） | **会**真实上传并计费（实测 translation -20、long-to-short -55） |
| `npm run test:cards` | 预发：卡片入口 7 条（AI 生图 / AI 生视频 / 总结视频 / 生成解说 / 长视频变短 / 本地素材查找；含 Find Local Footage 冒烟；生成解说与本地素材查找 fixme） | **会**真实生成并计费 |
| `npm run test:sso` | 同会话SSO-001～022；001～018每轮F，019～022穿插F/指定产物 | **会**真实上传/生成并可能计费，有头、串行、零重试 |
| `npm run test:sso:mixed` | 仅SSO-019～022，4例各5轮；来源配置见 `tests/sso/cases/source-artifact.ts`，结果从统一入口查询 | 同上；依赖缺失轮记阻塞、不替换来源、不重发已受理任务 |
| `npm run test:footage` | 本地素材查找P0 LF-01～03，独立配置、有头、单worker零重试；LF-04～17未接脚本。原生目录首次需选择，支持本轮源项目/原run回读；见 `tools/local-footage/README.md` | **会**真实导入/分析/检索；可能计费，回读模式不重提任务 |
| `npm run test:multi` | 预发：多工作流 **20 条**（15 启用 + 5 fixme；含 MW-23~26） | **会**真实执行多次任务 |
| `npm run test:multi:base` | 预发：多工作流基础 5 条（MW-01~05） | **会**真实执行多次任务 |
| `npm run test:multi:compound` | 预发：一句话多工作流 15 条（MW-06~14/18/21/23~26，11 启用 + 4 fixme；MW-18/24/25/26 默认执行） | **会**真实执行多次任务 |
| `npm run test:multi:materials` | 独立按需多素材专项：MW-15/16/17/19/20/22；按用户要求填写补槽继续，不并入默认 staging；MW-22 缺定向故障注入时记前置阻塞 | **会**真实执行多次任务 |
| `npm run test:chains` | 预发：跨工作流链路（CHAIN-01 启用，其余 fixme） | **会**真实执行多次任务 |
| `npm run test:annotation` | 视频批注 P0：27 条规则层 + 12 条编辑器 UI | 本地：需 feature 分支 worktree 与 4210 dev server |
| `npm run test:staging` | 全部预发用例（46 条；部分待确认项默认 fixme） | 同上（含计费） |
| `npm run test:smoke` | 预发冒烟 3 条：字幕、clean-cut、AI 生图（标签 @smoke） | **会**真实上传/生成并计费 |
| `npm run test:regression` | 预发回归 46 条：G1/G2 + 工作流 + 卡片 + 多工作流（标签 @regression） | 同上 |
| `npm run test:full` | 预发全量（当前 46 条，等同于 test:staging） | 同上 |
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
  staging/             G1/G2 + 工作流（subtitle、image-watermark、workflows 表驱动、cards 卡片入口）
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

## 缺陷同步

- 同步到云效的缺陷必须上传与本次失败场景对应的真实截图，并在描述中嵌入，方便研发和回归人员直接查看；日志、JSON 不能代替截图。
- 上传前核对截图与用例、运行批次的对应关系，检查敏感信息；保留原始证据，不生成或修改画面来替代实测截图。
- 提交后回读核验截图附件及描述中的图片引用；本地缺陷记录、测试进度同步截图清单。若缺图，明确记录缺口并补齐后再报告截图证据完整。

## 敏感信息

`.auth/`、`local.env`、`.env.local`、`reports/`、`test-results/` 都在 `.gitignore` 中。不要把 storageState、预签名 URL、trace 内容复制到提交物或聊天记录里。

## 云效缺陷格式

- 标题写“功能/场景 + 可观察的问题”。正文按用户模板依次写：**现象、前置步骤、提示词、复现步骤、实际结果、预期结果、影响、补充、失败截图**；标签单独加粗，失败截图放在正文末尾直接嵌入。不再设置“排查信息”一节。
- “前置步骤”单列账号与会话范围、素材、上传/@引用及必要登记；“提示词”单列可复制的完整指令，准备指令与目标指令区分标注，尚未发送的目标指令注明未执行。实际结果保留已知 run_id、会话 ID、状态、关键错误原文，缺失信息不编造。待确认条件写在“补充”。
- 保留触发指令、关键参数及影响结论的验证边界；删除重复历史、提交过程、脚本调试流水及无关说明。
- 不在缺陷正文堆放本机路径、完整自动化命令、批次统计或长篇回归清单；详细证据放附件，截图须嵌入并回读验证。
