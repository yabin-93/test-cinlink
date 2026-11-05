# DeepSeek → Codex 迁移记录

日期：2026-11-03（Asia/Shanghai）。

来源：`E:\proj\deepseek-cinlink`。目标：`C:\Users\chen\Documents\ChatGPT\cinlink`。

## 已迁移内容

- 工程工作区 3,087 个文件，776,709,521 字节，包含源码、配置、需求/设计用例、矩阵、素材、未提交修改、未跟踪文件、本地报告、失败证据和项目登录态。
- 来源 HEAD `729d9622af4a02a6b318b20fff42d25991dcd498` 及其可达的 69 次 Git 提交。目标原为空仓库，现位于 `codex/deepseek-migration`；没有创建远端推送。
- DeepSeek 对该工程登记的 4 个会话：用例编写 (1)、用例编写、工作流测试流程，以及 1 个空会话。包含种子会话继承的重复历史，轮次数不应相加作为独立对话数量。
- 保留 4 份原始 `.jsonl.zstd` 事件日志和投影缓存，并生成可读对话、轮次索引、历史压缩摘要。
- 对话引用的 16 个唯一图片附件全部找到、复制并通过 SHA-256 校验，可从可读对话直接查看。
- 历史讨论中引用的 `yunxiao-defect-sync` 技能保留为本地参考副本，未全局安装或执行。

源工程、DeepSeek 的原始会话目录和全局凭据未被修改。目标保留原工程未提交变更，所以 Git 中会显示原有修改、删除和未跟踪文件，不能把这些全部归为本次迁移新增的代码改动。

## Codex 接入

- 根目录 `AGENTS.md` 改为当前 Codex 工程入口，要求任务开始时读取 `docs/codex-context.md`。
- `docs/codex-context.md` 汇总目标、约定、需求边界、最新实测、已知缺陷、待办与本机依赖。
- `docs/deepseek-context-index.md` 链接历史对话、摘要和轮次索引，供后续按需检索。
- README 快速开始使用新目录；DeepSeek 使用说明保留并标为历史资料。
- `local.env` 中 `CINLINK_TEST_STORAGE_STATE` 已改为目标目录自己的 `.auth/storage-state.json`。
- `.migration/` 与 `.tmp-*` 加入 Git 忽略规则，原有 `.auth/`、env、reports、test-results 忽略规则保留。

历史上下文以项目资料形式在 Codex 中使用；没有写入或改造 Codex 内部聊天数据库，旧聊天不会在侧栏变成新的原生聊天。AGENTS 是项目指令入口，完整历史根据任务需要读取，不会把所有对话一次塞入每次请求。机制参考：[官方 AGENTS.md 文档](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。

## 验证结果

| 检查 | 结果 |
|---|---|
| `npm ci --no-audit --no-fund` | 成功，重新安装锁定的 6 个包 |
| `npm run verify` | 类型检查通过，118 passed / 0 failed（测试阶段 6.4 秒） |
| `npm run cases:check` | checked 250 cases, issues=0 |
| `npx playwright test --project=staging --list` | 成功发现 9 个文件中的 46 条测试；未执行真实预发任务 |
| 47 个运行相关原始文件 SHA-256 | 全部与迁移快照一致，包含 src、tests、tools、assets 和关键项目配置 |
| 4 份原始会话 SHA-256 | 全部通过 |
| 16 个对话图片附件 SHA-256 | 全部通过 |
| 本地依赖 | ffmpeg、ffprobe 可用；批注 worktree、规则模块、原素材目录和迁入的 storageState 存在 |

迁移只验证离线可运行性和用例发现；预发会话是否仍有效、产品工作流是否仍通过，需在后续真实测试任务中判断。本次没有产生预发任务或消耗测试积分。

## 归档与证据

本机归档：`.migration/deepseek-2026-11-03/`，已被 Git 忽略。

- `manifest.json`：迁移时间、来源、文件路径、字节数、SHA-256、会话元数据与附件清单。
- `verification.json`：运行文件、原始会话、附件及本机依赖检查结果。
- `source-git-status.nul`、`source-branches.txt`：源工程当时的 Git 工作区状态和分支名。
- `originals/`：源 AGENTS、README、gitignore、local.env 的原始副本。
- `sessions/<id>/`：原始日志、投影、可读对话、轮次索引、压缩摘要。
- `attachments/`：会话引用图片；文件名为内容 SHA-256。
- `original-test-results/`、`original-html/`、`original-junit.xml`：离线验证前的源测试结果备份，避免被验证报告覆盖。
- `reference-skills/`：原技能参考。

本次验证日志：`reports/migration-2026-11-03/verify.log`、`reports/migration-2026-11-03/staging-list.log`；离线 HTML 报告仍在 `reports/html/index.html`。

## 范围与后续使用

- `node_modules` 未从源复制，已通过锁文件重新安装；`.git` 目录未直接覆盖，历史通过本地 Git fetch 引入。
- `.chrome-link` 是源工程浏览器资料链接，未复制。标准 Playwright 用例使用系统 Chrome。
- 原始媒体库、批注业务仓库/worktree 仍使用现有 `E:` 盘目录；这些外部资源已确认存在，未重复拷贝。
- DeepSeek 新消息、源工程后续文件修改不会自动同步。这是迁移时快照，后续开发以当前 Codex 工程为工作目录。
- 登录态虽然分成两个文件副本，账号的刷新令牌仍可能轮转；避免源工程与新工程同时运行预发。
- 两份源会话最后涉及云效缺陷提交，但没有最终答复。缺陷文档与新建工作项的实际状态需后续核对；本次仅迁移，没有继续提交，避免重复创建。

后续在当前项目提出任务即可。开始新任务时先读项目上下文，追溯用户原话或旧方案时使用会话索引。
