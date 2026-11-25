# SYNC-004：剪辑后重复叠加中文字幕

2026-11-16预发实测，**Failed**。两轮均done，P1/P2及SRT均下载。失败由实际MP4画面直接确认。

## 前置与复现

1. 预发账号登录，在独立项目和会话上传指定日语竖屏原片，保留原画面日文标题和日文字幕。
2. 第一轮按[原用例](editing-dubbing-sync-cases.md#sync-004)将完整原片译制为普通话并烧录简体中文字幕，取得真实P1，53.96秒。新增中文位于底部蓝色区域，原日文仍在中部/顶部。
3. 第二轮显式指定P1文件ID，要求把已有画面、普通话配音和新增中文字幕一起剪成20秒、最多3段，不重新翻译/配音，不抹除原日文。确认源段24.000–29.920、12.920–21.960、29.920–34.960秒，合计20秒。
4. 本轮原run结束后，下载最终MP4和SRT，与P1相应时间逐帧对照。完整已发送提示词与确认截图见[本轮报告](sync001006-staging-results-20261116.md#sync-004)。

## 预期与实际

预期保留已有中文字幕并随画面裁切移动，不另叠一层同语字幕。原有日文标题/字幕属于画面基线。

实际最终20秒MP4仍保留底部原来的中文烧录文字，又在中部新闻标识区域新增一层带背景及高亮的中文字幕。5/5条字幕中心抽帧均见两层中文，新增层遮挡新闻标识。第一条新层及交付SRT还多出“呃”，与P1已有文字不同。该重复是**两层中文**，没有把原有日文当作重复字幕。

P2为20.000秒、640×1138，可完整解码；P1哈希复读不变。三段音轨与P1相应区间相关系数0.9990～0.9993，支持已有普通话音轨保留；完整人工听审未进行，不扩大为已证实的配音重新生成或全部声音错位。

## 实际文件画面

P1源25.70秒：只有底部已有中文，中部为原日文及新闻标识。

![P1 25.70秒](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-reference-25.7.png)

P2成片1.70秒（对应P1源25.70秒）：底部中文仍在，中部又叠一层中文。

![P2 1.70秒重复中文](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-duplicate-chinese-1.7.png)

[整轮完成页面原图](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-completed.png) · [5条字幕中心实际帧](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-cue-frames-1.png) · [最终MP4](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-product.mp4) · [最终SRT](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-highlights.srt) · [源段/波形比对](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-lineage-comparison.json)

## 证据索引

- 会话：`153d0cb6-31cc-4142-a335-e1fca67b9dcf`；项目：`d3978d52-df4a-4ce3-afcf-7e1dff05b6b6`。
- R1 run：`run_v2_bfe7403611c24d1c900f3a0f2422dfb7`；R2 run：`run_v2_32070335f0f343f696d151697954e514`。
- P1：`file_cloud_lhw2g73rt42rdlpzqp77zertlt`，SHA `1b970466d5f31734a5c7cffab9906e90270ce510f86c058daa41d02f28342f6c`。
- P2：`file_cloud_lkxnp5ez2i7yf6kia6wrclescs`，SHA `feafe0172731383edd30b445b2c44d35d8093be05c6bd58b592b321880ceac11`。
- SRT：`file_cloud_vyhwur3ntwlgnycgwhzsyh5oj4`，SHA `500cb628e8e8d399a2476d28059b5f042bbfa6e8eeb04eabf3bca7740a22bf65`。
- 原始计划的editor_prepare_highlights使用include_subtitles=true，并未在MP4导出前关闭新字幕轨；最终画面确认新轨与已有烧录字幕同时可见。

本页为本地实测失败记录，云效用例定义为WLAX-306；定义同步不代表执行通过。
