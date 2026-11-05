# 云效同步记录：MW-12

- 2026-11-03 已按用户“本次无需去重”要求直接新建，未检索或更新已有缺陷。
- 项目：cinlink-WEB；工作项：[FWXC-245](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=655f641f1e8c9fd829f6a1502b)；ID：`655f641f1e8c9fd829f6a1502b`。
- 已回读验证：标题、完整描述、项目/类型、负责人、迭代、标签、优先级/严重程度、原两份文档/JSON附件与 1 张截图。
- 附件：`CINLINK-MW12-001.md`、`CINLINK-MW12-001-evidence.json`。
- 补充截图：`MW-12-completed-missing-english-srt.png`；已上传、嵌入描述并回读验证。
- 测试状态：未通过，待修复回归；保留默认 FIXME。

<!-- cinlink-sync:mw-strict-20261103:CINLINK-MW12-001 -->

# [Web][多工作流][MW-12正常路径] 明确要求中英文 SRT 和英文字幕成片，完成后缺少独立英文 SRT

## 测试环境与范围

- 发现日期：2026-11-03，Asia/Shanghai。
- 应用：CinLink Web 预发 https://staging-app.cinlink.ai ，新版 /studio/workspace。
- 执行环境：Windows、系统 Chrome、Playwright headless；workers=1、retries=0。
- 用例：MW-12；本地编号：CINLINK-MW12-001；优先级建议：中；严重程度：3-一般。
- 素材：7MB.mp4：7,815,126 字节，60.5 秒，1280×720，25 fps，H.264 + AAC；中文语音测试视频。
- 本次同步依据已有严格复测证据，没有为提交缺陷重新运行计费任务；MW-18 已通过，不在本次提交范围。

## 前置条件与准备

1. 登录预发工作台，使用专用测试账号，积分足够且无同账号并发测试。
2. 准备上述含音轨的 7MB.mp4，确认字幕识别、翻译和烧录工作流可用。
3. 新建空白非项目会话；本轮不注入故障、不使用断网或静音素材。

## 详细操作步骤

1. 打开预发工作台，等待输入区就绪，新建空白非项目会话。
2. 通过上传入口选择 7MB.mp4，确认输入区素材缩略图已出现。
3. 输入 @ 并在候选列表选择本次视频，确认输入框生成对应的素材引用。
4. 追加下方完整提示词，只发送一次。
5. 若出现明确执行计划，核对中文识别、英文翻译、英文烧录及三项交付物后确认；若出现缺参澄清，记录并停止。
6. 等待任务终态，查看结果区；分别核对中文 SRT、英文 SRT 和 MP4，下载两份字幕文件确认它们是两个独立文件。

## 完整提示词

```text
根据这个视频的中文语音生成简体中文字幕，再翻译成英文并烧录到 MP4 成片；交付中文 SRT、英文 SRT 和最终 MP4 视频。
```

## 实际结果

1. 281.013 秒后目标 run 为 done，error 为空；没有观察到缺参补槽或计划确认。
2. 结果只有 Simplified Chinese subtitles.srt.srt 和 Final video with English subtitles.mp4 两个文件。
3. 缺少独立英文 SRT；本次未对成片画面的字幕语言/同步进行内容层验证。

## 预期结果

1. 正常路径完成中文识别→英文翻译→英文字幕烧录，分别交付中文 SRT、英文 SRT、最终 MP4 三项可下载产物。
2. 不能因已输出视频而省略明确要求的英文字幕文件；若某步失败，明确告知失败步骤。

## 已有证据

- 目标 run：`run_v2_b35c25803af2438bb0971ee5dae1adb3`；conversation：`59b78c14-4757-496c-996b-84f9d27fc372`；状态：done；产物：Simplified Chinese subtitles.srt.srt、Final video with English subtitles.mp4。
- 初始批次：1 passed / 4 failed；本用例耗时 281.013 秒。
- 已附脱敏证据 JSON：仅含测试指令、状态、产物名与稳定 ID；不附原始 trace、登录态或带签名下载链接。

## 定位边界

最终交付清单不完整；与故障注入基础设施缺失分开，不报告“翻译服务故障恢复失败”。

## 回归检查与完成标准

1. 按正常路径重跑，结果至少包含两份不同语言 SRT 和一个 MP4，三个交付物均可下载。
2. 人工核验英文 SRT 译文、时间轴，以及成片英文字幕的烧录与同步。
3. 必须设置 CINLINK_PROMPT_PROBE=1，当前严格分支才按三项产物检查；不要仅靠原默认 expectArtifacts=1 判定修复。
4. 本缺陷只覆盖 MW-12 优化提示词的正常路径。原用例的“中间翻译失败/故障恢复”需要服务端故障注入，仍未覆盖，不能随本缺陷修复直接判为通过。

## 自动化回归命令

前提：工程依赖已安装、预发专用账号已登录，视频用例素材目录配置正确。以下命令只运行本用例；需要真实执行并可能消耗积分。

```powershell
$env:CINLINK_INCLUDE_BLOCKED='1'
$env:CINLINK_PROMPT_PROBE='1'
$env:CINLINK_AUDIT_DIR=Join-Path (Get-Location) ('reports/mw-regression-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '/audit')
npm run test:multi:compound -- --grep 'MW-12\b' --workers=1 --retries=0 --trace=on
```

若会话失效，先执行 `npm run auth` 人工登录。严格模式不自动回答缺参澄清；计划确认单独记录。

<!-- cinlink-mw-strict-20261103-screenshots -->

## 失败截图（本轮实测）

截图来自 2026-11-03 严格复测原始报告；未修改画面。MW-21 第二张仅展示复核时输入状态，完整结论结合已附审计 JSON。

### MW-12-completed-missing-english-srt.png

完成后的结果区显示中文 SRT 与视频；缺少独立英文 SRT。

![MW-12-completed-missing-english-srt.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=bf1e98e9c17ce2532facbbd76b)
