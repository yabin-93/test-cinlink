# ERYE-210 生产执行进度

本页为001～005历史批次；当前累计及008新版状态见[最新进度](execution-status-current.md)。脚本接入情况见[自动化说明](automation.md)。

2026-11-13；2 Passed、3 Failed；其他49条未执行。

[完整结果与截图](results-001-005-prod-20261113.md) · [云效同步明细](defects-production-20261113.md)

| 用例 | 状态 | 云效缺陷 | 说明 |
|---|---|---|---|
| ERYE210-001 | Passed | — | 生产中文界面五入口为媒体、文稿、字幕、配音、水印，与Media/Scripts/Captions/Voiceover/Watermark一一对应；全部可达，实际切换后返回Media。刷新解决初次创建提示后核验，工程内容及版本1均保持。仅验证本例导航，首次导入保存500另记002，不宣称保存功能通过。 |
| ERYE210-002 | Failed | [FWXC-482](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441) | 全新会话无该工程偏好，首次从选择媒体导入后默认选中Captions/字幕，预期Media，未通过。首次保存200/版本1，随后保存500并提示Snapshot request could not be completed和工程创建未完成。刷新前已回读确认真实工程存在；刷新恢复，不覆盖首次结果。后续Media素材卡能预览正确20秒源素材，但不等同于从外部显式素材入口进入工程，该分支未完整覆盖。 |
| ERYE210-003 | Passed | — | 真实字幕任务112秒完成，无补槽。结果SRT实际下载，8条英语字幕0.160～19.820秒；从该会话当前实际视频编辑器入口首次进入，选中Captions内容页。工程字幕绑定file_cloud_c7kyuocu543kpnakk5k2qdeot5，与本次结果一致；8条文字及时间一致，其他四入口均可访问。导航核验前后工程版本2和全部内容保持。 |
| ERYE210-004 | Failed | [FWXC-483](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc663b74e4bf60d0019f5c04e3) | 已通过编辑器真实创建两段合法中文短旁白，audio_state为ready，文稿分别为“欢迎使用 CinLink。”及“这是导航测试。”，首段实际播放1.346757秒无媒体错误。设Media并关闭/重开后仍为Media；选择已生成配音片段或点击配音WAV结果只保留Media/打开素材预览，未找到可从结果明确定位Voiceover的编辑入口。手动进入Voiceover能看到正确文稿，但不代替本例结果入口验收。导航前后工程版本4及全部保存内容保持，未重新生成。 |
| ERYE210-005 | Failed | [FWXC-484](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f97b390bf7704588fed0bfa706) | 首次从去口水词入口分析后，自动进入正确工程Scripts/文稿，显示原片英语文稿及2个停顿候选，首进子项通过。返回Media后点击当前真实“审阅剪辑”入口，等待30秒仍停Media，不能回到文稿审核页，本例按入口返回问题记Failed。手动切文稿可见正确内容。未点击移除/确认应用；视频及原声均为同一源文件0～20秒，实际预览播放1.099745秒且总长20秒，无媒体错误。导航前后工程版本2及全部保存内容保持，marked/deleted均0。 |
