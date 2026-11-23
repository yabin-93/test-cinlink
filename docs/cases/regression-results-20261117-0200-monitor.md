2026-11-17 21:55当前队列完成，累计范围与未覆盖说明见[最终对账](../defects/fixed-regression-latest-summary-20261117-2155.md)。

# 新进入已修复缺陷的回归排队状态（2026-11-17 02:00）

15原回归、30扩散均Not Run，预发人工登录前置未完成，本次未提交任务。固定脚本PLAN/空路径，不用历史结果代替本轮。

| 缺陷 | 原标题 | 原回归 | 扩散一 | 扩散二 | 云效状态 |
|---|---|---|---|---|---|
| FWXC-578 | 【生产环境】【ERYE199-029/047/048】编辑器原生导出报协议错误，未交付可下载结果 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-577 | 【生产环境】【ERYE199-064】切换“媒体→工程”报504，工程素材列表为空 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-572 | 【ERYE196-023】多次分割导出后出现源帧跳过和中段黑帧 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-528 | 应只显示一行字幕 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-527 | 翻译配音有目标语言双语 配音要显示原声和译声 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-494 | 【ERYE196-011】追加B片段分割时报参数校验错误，未生成切点 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-490 | 【ERYE196-010】视频片段第5秒分割未执行，提示工具参数校验失败 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-489 | 【生产环境】【ERYE210-010】双工程分别记忆位置后，PB刷新由Media回到Captions | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-488 | 【生产环境】【ERYE210-007】图片水印页收起重开变成文字页，刷新后视图回到字幕 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-480 | 【ERYE237-005】【生产环境】蓝底图片生成完成后未追加到原图片工程历史 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-462 | 【生产环境】AI擦除黄色手包完成后手包仍存在并出现表面纹理 | Failed | Failed | Passed | ❌AI未通过，21:18官方回读；[报告](../defects/FWXC-462-retest-20261117-0200-monitor.md) |
| FWXC-461 | 【生产环境】图片生成中点击可用的已完成历史版本仍只显示处理占位 | Not Run | Not Run | Not Run | 已修复，未写入 |
| FWXC-381 | 图片按参考红圈修改标签时误删圈外原图红线，未保护非目标内容 | Blocked | Passed | Passed | ✅AI通过；[本轮报告](../defects/FWXC-381-retest-20261117-0200-monitor.md) |
| FWXC-379 | 图片编辑Agent无法绑定当前会话及源版本参数，切换画笔、文字草稿和复合编辑均未执行 | Not Run | Not Run | Not Run | ❌AI未通过；[最新报告](../defects/FWXC-379-retest-20261117-0200-monitor.md) |
| FWXC-317 | 编辑器Agent修改字幕原文失败，明确目标、澄清、重选及切换工程后均未更新 | Blocked | Passed | Passed | 已修复；[本轮报告](../defects/FWXC-317-retest-20261117-0200-monitor.md) |

[完整候选及证据](../defects/fixed-monitor-20261117-015758.md)。
