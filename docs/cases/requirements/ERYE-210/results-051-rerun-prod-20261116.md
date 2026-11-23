# ERYE210-051生产Chrome复测（2026-11-16）

**本轮Passed。** Agent实际将背景音量从100%降低约6dB，音频轴上的音量线显示50%，刷新后仍保持。当前43条：37 Passed / 0 Failed / 6 Blocked / 0 Not Applicable / 0 Not Run；其他用例未重跑，原11-13失败记录保留历史。

[当前进度](execution-status-current.md) · [原失败报告](results-completion-nine-prod-20261113.md) · [复测前历史快照](case-051-rerun-history-20261116.json) · [本轮证据及哈希清单](evidence-051-rerun-prod-20261116/manifest.json)。

## 前置操作

1. Windows生产环境有头Google Chrome已登录，使用有工程编辑权限的测试账号。
2. 新建专用项目和独立工程，使用真实20秒E196-A.mp4、8条英语字幕和一段本账号真实WAV；WAV作为唯一独立背景音轨，起点0秒、音量100%，保存完成。
3. 停在Captions，不预选音频对象；明确通过指令指定本工程唯一背景音轨，不手动改动音量。

## 完整实际提示词

> 只把当前工程“ERYE210-051-46170ca2”中唯一独立背景音轨（目前音量100%，起点0秒）降低6dB，音量线性值约0.501187。保留音轨位置、原视频、原声、字幕和配音，不裁剪、不替换素材、不导出、不新建工程，也不修改其他工程。

## 执行及结果

| 步骤 | 实际结果 |
|---|---|
| 仓库脚本一次提交完整指令 | HTTP200受理，初始提交1次；原任务约54秒完成，无需补槽或手动代执行。 |
| 保持Captions等待原任务 | 22次观察均保持同一工程/字幕页，没有自动抢占到其他功能。 |
| 核对目标及内容 | 仅唯一背景音轨音量1→0.5011872336272722；文件、起点、时长、播放速率和静音状态保持，原视频、原声与字幕轨道内容保持。 |
| 明确定位目标音频片段 | 悬停音频轴上可上下拖拽的音量线，页面反馈50%（页面取整显示），与降低6dB相符。未拖动音量线。 |
| 刷新后再次只读核验 | 同一工程音量线仍显示50%，保存版本1→2；目标保存值及其他音视频/字幕仍保持，无新任务或第二次提交。 |

![完整请求及Agent执行完成](evidence-051-rerun-prod-20261116/051-after-agent.png)

![实际音量线核验](evidence-051-rerun-prod-20261116/051-real-volume-control.png)

![刷新后音量线仍显示50%](evidence-051-rerun-prod-20261116/051-volume-line-after-refresh.png)

## 场景位置与证据

- [本轮会话](https://app.cinlink.ai/c/609d5889-3fb0-4074-97a0-8ac7b709ce73)；独立工程`46170ca2-51b2-4f8a-b2a0-9011c2035d6d`，名称`ERYE210-051-46170ca2`。
- 原任务`run_v2_3d7ebc6967124d3a805ce1f87892f0ed`，完成耗时54479ms；实际执行记录与保存结果均表明已完成目标音量调整。
- [请求、任务摘要、观察及前后目标数据](evidence-051-rerun-prod-20261116/execution-evidence.json) · [刷新后的实时核验](evidence-051-rerun-prod-20261116/051-refresh-verification.json)。
- 脚本`tests/editor/erye210-completion.spec.ts`调用`tools/editor/erye210-completion.ts`的case051；命令`npm run test:editor:210 -- --grep 'ERYE210-051 '`；生产有头Chrome、本机CDP、单worker、零自动重试。
- 原始运行在`reports/editor-210/prod-051-rerun-20261116-01/`；主脚本1 passed。后续刷新核验只读取同一已保存结果，没有重复Agent请求。

## 判定边界

本次在同一业务前置下未再复现11-13的“缺少对象标识而不执行”，051最新状态更新为Passed。原失败、截图和本地缺陷保留历史，未改写原批次结论。本例验证Agent调音并通过实际音量线核对，不将手动拖拽代执行当作通过，也不把本次结果外推为手动拖拽、听感质量或所有账号环境均已验证。

本轮未提交云效、未更改云效状态、未提交或推送代码。
