# 云效同步记录：MW-11

- 2026-11-03 已按用户“本次无需去重”要求直接新建，未检索或更新已有缺陷。
- 项目：cinlink-WEB；工作项：[FWXC-244](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=274ec0171a739fdb11dc7390bc)；ID：`274ec0171a739fdb11dc7390bc`。
- 已回读验证：标题、完整描述、项目/类型、负责人、迭代、标签、优先级/严重程度、原两份文档/JSON附件与 1 张截图。
- 附件：`CINLINK-MW11-001.md`、`CINLINK-MW11-001-evidence.json`。
- 补充截图：`MW-11-completed-only-media-info.png`；已上传、嵌入描述并回读验证。
- 测试状态：未通过，待修复回归；保留默认 FIXME。

<!-- cinlink-sync:mw-strict-20261103:CINLINK-MW11-001 -->

# [Web][多工作流][MW-11] 生成视频后生成中英文字幕，run done 但仅交付 media-info.json

## 测试环境与范围

- 发现日期：2026-11-03，Asia/Shanghai。
- 应用：CinLink Web 预发 https://staging-app.cinlink.ai ，新版 /studio/workspace。
- 执行环境：Windows、系统 Chrome、Playwright headless；workers=1、retries=0。
- 用例：MW-11；本地编号：CINLINK-MW11-001；优先级建议：高；严重程度：2-严重。
- 素材：无需上传素材；使用提示词生成 5 秒、720P、16:9、普通话人物视频。
- 本次同步依据已有严格复测证据，没有为提交缺陷重新运行计费任务；MW-18 已通过，不在本次提交范围。

## 前置条件与准备

1. 登录预发工作台，使用专用测试账号，确认积分足够且无同账号并发测试。
2. 确认 AI 生视频、字幕识别和字幕翻译服务可用。
3. 新建空白非项目会话；不上传或引用任何外部素材，排除旧素材干扰。

## 详细操作步骤

1. 打开 https://staging-app.cinlink.ai/studio/workspace ，等待工作台输入区就绪。
2. 点击新建非项目会话，确认当前会话为空、没有附件或 @ 引用。
3. 在输入区粘贴下方完整提示词，只发送一次。
4. 观察任务状态；若出现明确的执行计划，核对生成参数和字幕语言后确认。若出现缺参澄清，记录内容并停止，不自动填写。
5. 等待任务进入终态，检查结果区并逐个记录结果文件名、类型和下载入口。
6. 检查是否有独立的中文 SRT 和英文 SRT，不能用 media-info.json 替代字幕；必要时通过会话 messages 接口核对 result_files。

## 完整提示词

```text
先生成一个 5 秒、720P、16:9 的视频，内容为人物用普通话说“这是自动化测试”；再只针对生成的视频生成简体中文字幕并翻译成英文，交付中文和英文 SRT 文件。
```

## 实际结果

1. 190.608 秒后目标 run 为 done，error 为空。
2. 仅回传 media-info.json；没有交付中文 SRT 或英文 SRT。
3. 本次没有观察到缺参补槽或执行计划确认。
4. 是否曾在内部成功生成视频尚未单独核验；本缺陷仅确认字幕交付缺失。

## 预期结果

1. 按完整提示词执行生成视频→中文字幕→英文字幕，字幕输入必须来自本轮生成的视频。
2. 结果区交付两份可下载、非空且格式有效的中文/英文 SRT，时间轴对应生成视频；不能只返回媒体信息文件。
3. 不能在约定交付物缺失时仅显示完成而不说明失败步骤和原因。

## 已有证据

- 目标 run：`run_v2_7a94f4a082e44da7b84624ae997045ee`；conversation：`8d0ab542-88a0-4362-b6b6-acecd3a036ab`；状态：done；产物：media-info.json。
- 初始批次：1 passed / 4 failed；本用例耗时 190.608 秒。
- 已附脱敏证据 JSON：仅含测试指令、状态、产物名与稳定 ID；不附原始 trace、登录态或带签名下载链接。

## 定位边界

生成后衔接字幕/翻译与最终产物交付边界；未定位具体后端节点，不把缺少交付等同于生成模型失败。

## 回归检查与完成标准

1. 重新执行以上步骤，确认中英文 SRT 均可下载且含对应语言字幕，时间轴不超出生成视频。
2. 确认字幕确实对应本轮生成视频中的普通话内容，没有误用其他会话素材。
3. 当前自动断言覆盖 done、产物数量及 SRT 类型；语言、内容和时间轴仍需人工核验。

## 自动化回归命令

前提：工程依赖已安装、预发专用账号已登录，视频用例素材目录配置正确。以下命令只运行本用例；需要真实执行并可能消耗积分。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
$env:CINLINK_PROMPT_PROBE='1'
$env:CINLINK_AUDIT_DIR=Join-Path (Get-Location) ('reports/mw-regression-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '/audit')
npm run test:multi:compound -- --grep 'MW-11\b' --workers=1 --retries=0 --trace=on
```

若会话失效，先执行 `npm run auth` 人工登录。严格模式不自动回答缺参澄清；计划确认单独记录。

<!-- cinlink-mw-strict-20261103-screenshots -->

## 失败截图（本轮实测）

截图来自 2026-11-03 严格复测原始报告；未修改画面。MW-21 第二张仅展示复核时输入状态，完整结论结合已附审计 JSON。

### MW-11-completed-only-media-info.png

完成后结果区仅显示 media-info.json，未见两份 SRT。

![MW-11-completed-only-media-info.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1636cfb6802e5c2a5ee5ee9ddc)
