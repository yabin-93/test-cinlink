# 云效同步记录：MW-21

> **最新同项目复测（2026-11-03）**：同项目 A/B 夹具已接入，19:04–19:06 实测 **1 failed（92.364 秒）**。A 的素材 F 已通过当前项目文件接口登记并回读；B 为同一项目空白草稿、零上传，但 @ 候选为空。截图同时显示 0/1 素材已分析，是否需要先完成分析/索引仍待定位；目标字幕未提交。按用户要求，已把本轮说明、脱敏 JSON 和原始截图补至现有 FWXC-247，并嵌图、回读验证通过（0 新建、1 更新、3 新附件）。下方非项目会话记录保留为历史资料，不能替代本轮范围。前置与生命周期说明见 `docs/design-cases/multi-workflow/cases.md`；完整本机证据见 `reports/mw21-same-project-20261103-190443/`。

本轮同项目截图：![MW-21 同项目候选为空](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7240a4ad29b2c046a78f7d4443)

- 2026-11-03 已按用户“本次无需去重”要求直接新建，未检索或更新已有缺陷。
- 项目：cinlink-WEB；工作项：[FWXC-247](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=e1003a20fa9a2cdff920e271e2)；ID：`e1003a20fa9a2cdff920e271e2`。
- 已回读验证：标题、完整描述、项目/类型、负责人、迭代、标签、优先级/严重程度、原两份文档/JSON附件与 2 张截图。
- 附件：`CINLINK-MW21-001.md`、`CINLINK-MW21-001-evidence.json`。
- 补充截图：`MW-21-first-mention-no-candidates.png`、`MW-21-canonical-name-recheck.png`；已上传、嵌入描述并回读验证。
- 测试状态：前置阻塞、根因待定位，目标字幕任务未提交；保留默认 FIXME。

<!-- cinlink-sync:mw-strict-20261103:CINLINK-MW21-001 -->

# [Web][多工作流][MW-21][待定位] 源会话已登记视频，新会话按服务端保存名@引用未命中候选

## 测试环境与范围

- 发现日期：2026-11-03，Asia/Shanghai。
- 应用：CinLink Web 预发 https://staging-app.cinlink.ai ，新版 /studio/workspace。
- 执行环境：Windows、系统 Chrome、Playwright headless；workers=1、retries=0。
- 用例：MW-21；本地编号：CINLINK-MW21-001；优先级建议：中；严重程度：3-一般。
- 素材：7MB.mp4：7,815,126 字节，60.5 秒，1280×720，25 fps，H.264 + AAC；同一账号、两个独立非项目会话。
- 本次同步依据已有严格复测证据，没有为提交缺陷重新运行计费任务；MW-18 已通过，不在本次提交范围。

## 前置条件与准备

1. 登录预发工作台，使用同一专用测试账号；确认素材对该账号可访问，无同账号并发测试。
2. 准备 7MB.mp4；保留源会话和云端素材，完成目标会话检查前不要删除素材。
3. 本场景属于待定位的前置阻塞：跨会话复用的产品支持范围、文件作用域、候选过滤与夹具匹配均需核对。

## 详细操作步骤

1. 打开预发工作台，新建非项目会话 A。
2. 上传 7MB.mp4，在输入区 @ 选择该文件；追加“请记录我引用的视频素材，只回复素材文件名，供后续会话处理；本条不执行编辑或生成。”并发送一次。
3. 等源 run 完成，通过会话 messages/context_files 记录服务端 file_id 与实际保存名；若被去重/重命名，以服务端名称为准，不使用本地时间戳文件名猜测。
4. 使用“新建非项目会话”创建会话 B，确认与 A 不同；保持同一账号。不要重新上传文件，也不要直接打开旧会话代替 B。
5. 在 B 的输入区输入 @ 和步骤3记录的服务端保存名，等待候选列表，尝试选择源文件；自动化此次在候选可见性上等待20秒后失败。
6. 如能选中，验证该引用的 file_id 等于 A 的源 file_id，再发送下方目标字幕提示词；如不能选中，只记录候选为空/不可见与报错，停止，不发送无素材目标指令。
7. 若目标提交成功，通过 messages/context_files 再次核对 A/B 会话不同且 file_id 相同，等待带中文字幕 MP4；不要用 B 重新上传一个新文件掩盖复用失败。

## 完整目标字幕提示词

```text
根据我在本会话中明确 @ 引用的视频生成简体中文字幕并烧录，保留原音轨，交付一个带中文字幕的 MP4 视频。
```

## 实际结果

1. 首次测试93.461秒，在新会话引用前置阶段阻塞；改为服务端实际保存名后复核93.384秒仍阻塞。
2. 复核源 run 为 done，源 context_files 已有 file_id；当次服务端保存名为“7MB  -.mp4”。
3. 新会话中按该保存名过滤的候选不可见，locator.waitFor 在20秒后超时。该超时只能证明自动化未命中候选，不能单凭此认定产品全局不支持跨会话。
4. 目标字幕提示词没有提交，无目标 run；本缺陷不报告后续字幕工作流失败，也不能得出目标提示词无补槽的结论。

## 预期结果

1. 若非项目会话支持跨会话复用，应能在同账号的新会话 B 查到并选择有权限的源素材，引用保持相同 file_id。
2. 如按产品设计不允许此作用域复用，应明确展示范围限制，并据此修订测试用例；若是候选名称/DOM匹配问题，应修夹具后再评价产品。
3. 前置通过后，目标指令才应直接执行并交付带中文字幕 MP4；本轮未覆盖该阶段。

## 已有证据

- 源准备 run：`run_v2_0aa5cca5a5524564b6a8bea34f176a83`；conversation：`35aaa260-8646-4b30-b9f6-6c5a309dd2e4`；状态：done；产物：无。
- 源准备 run：`run_v2_e12abfe617f7458894cbea1520cb401f`；conversation：`91be4f5d-c5d7-4110-afc6-853f1297b604`；状态：done；产物：无。
- 复核源 file_id：`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`（仅用于排查；回归应记录当次新 ID）。
- 初始批次：1 passed / 4 failed；本用例按前置阻塞管理，不是后续目标任务失败。
- 已附脱敏证据 JSON：仅含测试指令、状态、产物名与稳定 ID；不附原始 trace、登录态或带签名下载链接。

## 定位边界

素材发现/作用域或自动化候选匹配边界，根因待定位；不是已证实的字幕处理失败。

## 回归检查与完成标准

1. 先人工确认 B 的 @ 候选、素材库可见性、非项目会话作用域和去重后名称，再定位产品或夹具。
2. 重新完整建立 A，不依赖历史会话已清理的素材；记录本轮新的 file_id 和服务端名称。
3. 先验收跨会话相同 file_id 引用，再执行目标字幕步骤，保存 B 的 context_files 和终态产物。
4. 只有前置与目标两阶段均通过，才考虑移除 MW-21 FIXME；仍需单独记录目标是否补槽。

## 自动化回归命令

前提：工程依赖已安装、预发专用账号已登录，视频用例素材目录配置正确。以下命令只运行本用例；需要真实执行并可能消耗积分。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
$env:CINLINK_PROMPT_PROBE='1'
$env:CINLINK_AUDIT_DIR=Join-Path (Get-Location) ('reports/mw-regression-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '/audit')
npm run test:multi:compound -- --grep 'MW-21\b' --workers=1 --retries=0 --trace=on
```

若会话失效，先执行 `npm run auth` 人工登录。严格模式不自动回答缺参澄清；计划确认单独记录。

<!-- cinlink-mw-strict-20261103-screenshots -->

## 失败截图（本轮实测）

截图来自 2026-11-03 严格复测原始报告；未修改画面。MW-21 第二张仅展示复核时输入状态，完整结论结合已附审计 JSON。

### MW-21-first-mention-no-candidates.png

首次引用前置失败时，候选浮层显示“暂无相关内容”；此次仍按临时文件名查询。

![MW-21-first-mention-no-candidates.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=fbba12511d13cab298a9189974)

### MW-21-canonical-name-recheck.png

按服务端保存名复核后停留在新会话引用输入阶段；截图本身不单独证明候选为空，须结合已附审计超时证据。

![MW-21-canonical-name-recheck.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=998e8499540e8fbe7c32cf35ae)
