# 2026-11-20 生产缺陷回归结果

账号yabinc18，Google Chrome有头。外部状态变更不计本轮实测；固定脚本PLAN。

| 缺陷 | 原回归 | 扩散一 | 扩散二 | 当前说明 |
|---|---|---|---|---|
| FWXC-701 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-693 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-679 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-677 | Not Run | Not Run | Not Run | 开始前云效已为❌AI未通过，本轮未新开业务，不计本轮实测。 |
| FWXC-676 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-673 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-664 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-663 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-662 | Blocked | Failed | Blocked | OriginalBlocked: legacy numeric time fields absent. E1Failed: completed28s but no fractional edit applied. E2Blocked: native edge gesture did not establish partial timing, noninteger branchuncovered. CloudFixed unchanged. |
| FWXC-661 | Passed | Passed | Passed | 生产Chrome/yabinc18，同画面源获用户授权重建。13组原文/配音文案基线，实际逐组清空第2句一次；26输入字段仅第2句译文变为空，其他12译文和13原文完整，29个时间轴对象显示未变。刷新并重新进入同一工程后仍13组、第2句为空。实际结果卡视频已下载：30.63秒1280×720 H264/AAC，完整解码退出0。原问题未复现，执行通过；两独立扩散尚未执行。 |
| FWXC-659 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-658 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-652 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-641 | Not Run | Not Run | Not Run | 开始前云效已为❌AI未通过，本轮未新开业务，不计本轮实测。 |
| FWXC-624 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-621 | Not Run | Not Run | Not Run | 开始前云效已为❌AI未通过，本轮未新开业务，不计本轮实测。 |
| FWXC-618 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-609 | Not Run | Not Run | Not Run | 开始前云效已为❌AI未通过，本轮未新开业务，不计本轮实测。 |
| FWXC-581 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-571 | Not Run | Not Run | Not Run | 开始前云效已为❌AI未通过，本轮未新开业务，不计本轮实测。 |
| FWXC-568 | Blocked | Failed | Failed | OriginalBlocked actual3realTTS not6. Independent5-10/E1 andwholecue5-8.6/E2 bothFailed: skippedfailednode, fullproject unchanged. No retry; no saved edit soUndoRedo not covered. CloudFixed GET13:32 preserved. |
| FWXC-506 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-484 | Blocked | Blocked | Blocked | 独立原片与快捷入口真实分析后刷新一次，切到字幕面板；原底部“审阅剪辑”按钮仍未呈现，返回操作未覆盖，记Blocked。原文稿和2处停顿已生成；未应用删除或导出。正常停止请求后已取消，刷新前后R2和完整content精确一致。 |
| FWXC-483 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-332 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-319 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-310 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-304 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-300 | Not Run | Not Run | Not Run | 开始前云效已为✅AI通过，本轮未新开业务，不计本轮实测。 |
| FWXC-720 | Failed | Failed | Failed | Independent bilingual-noD T2: preparation116s; only source selected at15s, native split wrongly cut video/source/BGM from1to2. Bilingual subtitles and8 narration clips not split. Refresh complete tracks exact; Failed. OriginalX2+D remains uncovered. |
| FWXC-718 | Failed | Blocked | Failed | Independent bilingual noD: preparation completed101s; BGM vertical drag into empty audio region returned to its old track. R2 toR4,6 tracks unchanged, entire BGM track exact, refresh full tracks exact. Failed; X2+D remains uncovered. Runtime additionally reported repeated dubbed segment11.98-15.18 vs8.60-11.50; separate deviation, not a new cloud issue. |


云效后续观察（2026-11-20T18:05:35.3057930+08:00）：FWXC-662由外部改为已关闭，已移出新开回归筛选；本批原Blocked及扩散结果保留，不计本执行者通过或状态写入。见[18点监控报告](../defects/fixed-monitor-20261120-180253.md)。
