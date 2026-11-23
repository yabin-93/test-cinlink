# 云效已修复缺陷批量回归（2026-11-12）

> 最新续轮见[2026-11-12 R2报告](fixed-regression-20261112-r2.md)。下方保留首轮固定快照及当时结果，已续补项目以R2逐项报告为准。

本轮可执行部分已结束，仍有覆盖阻塞：Passed 12、Blocked 6、Failed 1。执行开始时完整分页查询 236 条 Bug，38 条状态为已修复；精确筛选创建者陈亚宾后为 19 项。候选快照固定，不因执行中状态变更增删。

19项均已有本轮处置记录，Not Run为0；6个Blocked项均包含未覆盖验收范围（与Blocked重合，不另加总）。其中FWXC-327为6分支通过、3分支未覆盖。不是19项全部回归通过。结束时官方OpenAPI只读回读原19项：12项✅AI通过、7项已修复，见final-checkpoint/statuses.json。

逐项按原环境、新会话串行验证，实际文件下载审计。通过后官方 OpenAPI 改为 ✅AI通过并回读；失败、阻塞、未覆盖保持原状态。本轮未提交评论、新缺陷或 Git 提交/推送。凌晨因锁屏阻塞的 6 条历史不代替本轮。

| 编号 | 环境 | 本轮状态 | 云效状态 | 结论或当前进度 |
|---|---|---|---|---|
| [FWXC-410](FWXC-410-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 选中文字即出现浮动“编辑文字”按钮，直接追加test123→test123 追加；收起重开后回读完整，原多层菜单已简化。 |
| [FWXC-407](FWXC-407-retest-prod-20261112.md) | production | Blocked | 已修复 | 中文配音双语成片60.44秒解码正常，原16.16秒及首中尾样本无英文重复；编辑器暂无字幕，原文列未覆盖且入口有差异，保持云效已修复。 |
| [FWXC-388](FWXC-388-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 先询问本地/YouTube来源，明确选择后仅导入；99.97秒4K AV1/Opus原素材实际播放推进并下载，全解码0。 |
| [FWXC-386](FWXC-386-retest-prod-20261112.md) | production | Passed | ✅AI通过 | 原链接单次导入45秒，完成后主动询问后续处理；视频播放推进并下载89.09秒4K WebM，全解码0，未额外提交目标。 |
| [FWXC-373](FWXC-373-retest-prod-20261112.md) | production | Blocked | 已修复 | 已建独立原图/去背景两项历史；擦除手包拖动报noWindowsAvailable，目标运行态未触发。准备去背景时历史未标disabled但点击仍处理占位，不能代替擦除验收。 |
| [FWXC-368](FWXC-368-retest-prod-20261112.md) | production | Blocked | 已修复 | 新原图工程200%切换正常；原生画布滚动报noWindowsAvailable，拖动工具同类故障，平移和右下批注前置未覆盖，保留已修复。 |
| [FWXC-367](FWXC-367-retest-prod-20261112.md) | production | Passed | ✅AI通过 | 已保存后收起重开，同一批注完整正文与自定义名均保留；本轮为画布中心点，未生成小狗，持久性专项通过。 |
| [FWXC-364](FWXC-364-retest-prod-20261112.md) | production | Blocked | 已修复 | 原透明PNG已导出并核验Alpha，新会话载入成功；透明区点击报noWindowsAvailable，批注添加入口未覆盖，保留已修复。 |
| [FWXC-363](FWXC-363-retest-prod-20261112.md) | production | Passed | ✅AI通过 | 原纸船小狗新会话创建绿色草稿，画笔X弹窗无竖线穿透，显示专项通过；已清理草稿。 |
| [FWXC-327](FWXC-327-retest-prod-20261112.md) | production | Blocked | 已修复 | 本轮6条受理分支交付3份SRT/3份MD，下载与编码、结构、可读性均通过；另3条快捷参数受控制故障未覆盖，整项不改AI通过。 |
| [FWXC-318](FWXC-318-retest-staging-20261112.md) | staging | Failed | 已修复 | 仅发图先询问需求，原直接返回JSON未复现；填写中文描述需求后仍只交JSON，正文未呈现描述，继续流程未通过，保持云效已修复。 |
| [FWXC-298](FWXC-298-retest-staging-20261112.md) | staging | Blocked | 已修复 | 新日文清理预览/成片均49.33秒，12.16秒同点画面一致，下载解码正常；原会话404且旧水印/48.64秒差异未明确，原缺陷验收待确认，不改AI通过。 |
| [FWXC-295](FWXC-295-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 本轮原片480×270和结果960×540卡片均16:9、完整显示；成片1280×720/60.49秒解码正常，原音轨一致；未覆盖所有窗口尺寸。 |
| [FWXC-292](FWXC-292-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 时间轴报错及MKV问题未复现；MP4 120.44秒544×960，解码正常，画面流与源相同；降噪听感未人工验收。 |
| [FWXC-255](FWXC-255-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 下载中文/英文SRT各18条，UTF8/结构正常、时间轴一致；有第二翻译步骤，内部唯一输入绑定未暴露。 |
| [FWXC-254](FWXC-254-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 完整增强→中文字幕烧录→高光链通过，18.84秒2560×1440 MP4解码正常；短片SRT7条0.04～18.80秒，原空对象错误未复现。 |
| [FWXC-249](FWXC-249-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 双视频交付4文件；A60.49秒中文字幕、B169.04秒英文字幕，解码正常、来源区分正确、原音轨一致。 |
| [FWXC-246](FWXC-246-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 七工作流交付4文件；29.48秒2560×1440 MP4解码正常，3帧有英文字幕及右上E2E-TEST；SRT保留原片时间轴。 |
| [FWXC-236](FWXC-236-retest-staging-20261112.md) | staging | Passed | ✅AI通过 | 首条取消并刷新后保留；同会话重提审核后交付18.84秒MP4，解码正常，昨天节点ID错误未复现。 |

候选快照：`reports/fixed-regression-20261112-current/cloud/snapshot.json`；逐项进度 `progress.json`；原始截图/AX、实际产物与文件审计均在同一批次目录；云效写入及回读在 `cloud-updates/`。阻塞或未覆盖的条目不沿用旧结果判通过。
