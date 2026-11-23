# SYNC-003：剪辑后SRT与已有烧录字幕不一致

2026-11-16预发实际执行，**Failed**。两轮均done，最终MP4与SRT均下载；失败由实际交付文件对照确定，不依赖助手自述或听审推测。

## 前置

1. 预发账号登录，独立项目和会话，上传指定英语访谈原片。
2. 第一轮将完整原片译制为普通话配音和烧录中文字幕，取得真实P1 `dubbed-video.mp4`。

## 复现

1. 第一轮按[原用例](editing-dubbing-sync-cases.md#sync-003)生成完整P1，实测193.32秒。
2. 第二轮显式指定P1文件ID `file_cloud_gk7atg2mtmoagizqigwqlz4izi`，要求剪30秒、最多4段，已有普通话声音和中文字幕一起裁切重排，不重译、不重配音；可另附从成片0点计时的SRT。
3. 确认页面实际方案：P1 125.200–133.100、39.100–53.700、111.200–113.020、186.080–191.760秒，顺次合计30秒。等待本轮原run结束，下载实际MP4及SRT并对照。

完整已发送提示词、页面确认截图及来源范围见[本轮执行记录](sync001006-staging-results-20261116.md#sync-003)。没有重新提交本轮业务任务。

## 预期与实际

已有中文字幕原文应保留；交付SRT应与最终MP4烧录字幕一致，不漏句、不擅自重新转写。

| 最终MP4时间 | MP4实际烧录文字 | 同轮最终SRT |
|---|---|---|
| 11.15秒 | 就在洛杉矶地下。 | 无对应条目；09.639秒后直到12.439秒才有下一条 |
| 16.00秒 | 一个有望建成的三维 | 14.939–17.079秒写成“一个勇往直前的三维隧” |

MP4为30.000秒、1920×1080，可完整解码；P1文件SHA重新读取保持不变。四段音轨与P1对应源段波形相关系数0.9984～0.9996，画面/已有烧录文字抽样也对应；这些支持已有声音和烧录字幕随剪辑保留。**本次明确失败范围是交付SRT的错字和漏句，不把它扩大为已证实的全部配音错位。** 完整人工听审仍待补。

## 实际成片证据

![P2 11.15秒：成片有字幕，SRT漏句](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-missing-srt-cue-11.15.png)

![P2 16.00秒：成片“有望建成”，SRT“勇往直前”](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-wrong-srt-text-16.0.png)

[页面原始截图](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-export-subtitle-track-observation.png) · [实际最终SRT](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-editor-export.srt) · [实际最终MP4](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-product.mp4) · [来源与波形比对](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-lineage-comparison.json)

## 证据索引

- 会话：`e745e866-dc28-4935-9b1b-bf1fd2f36fc9`；R1 run：`run_v2_610f6439543d4b03bc0dfeb8cf783d99`；R2 run：`run_v2_441b8c38ad014f32acf3aa46bdda9b21`。
- P1：`file_cloud_gk7atg2mtmoagizqigwqlz4izi`，SHA `514b615c8021d57001483810fdb44332f44286ac71fa0f1356ac62b9ea312a82`。
- P2：`file_cloud_kg5vvztlnuiiyrndv5ym6lwfyu`，SHA `0c54ee40d560a8a6df23262aba721f4fc4d706b9b777f216e733d620dd54783b`。
- SRT：`file_cloud_lkjkfqoa3rxhfiw66hp7py4rde`，767字节，SHA `e28cba38e945f12ecdfdcb8076e0f0614ff84305149e61c88817619f2a9d2119`。导出步骤完成时和整轮完成后两次只读下载哈希一致。
- 原始运行计划明确要求复用P1已用于烧录的 `translated.srt` 原文；实际选择结果及编辑器字幕轨出现新转写文字。此链路证据支持错误发生在新字幕生成/重计时路径，具体代码根因未定位。

本页为本地实测失败记录；云效用例定义为WLAX-305，六条定义的同步不代表执行通过。
