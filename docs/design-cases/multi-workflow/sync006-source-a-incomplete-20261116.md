# SYNC-006：A源片讲话不完整，混剪前置阻塞

2026-11-16预发实测：**Blocked；R2依赖Blocked，未提交**。R1由服务主动terminated，error=null，没有生成混剪P1；不是用户点击停止，也不计作产品运行错误。

## 实际执行

1. 独立项目/会话上传固定素材A“9s.mp4”和B“x.mp4”，分别核对云端文件ID及SHA与原片一致。
2. 发送[SYNC-006原定义](editing-dubbing-sync-cases.md#sync-006)的18秒混剪完整指令，明确A/B均贡献完整英语讲话，B须选女性讲话后的内容，最多4段，保留原声及比例。
3. 原run完成提取音频、转写和视频分析后，服务主动停止，说明A英语讲话在9.42秒中断，现有时间证据无法确认完整句子，不能满足两份素材均贡献完整讲话的要求。没有MP4/P1，第二轮没有提交。

## 原始服务说明

> A（9s.mp4，file_cloud_mwe3qjluv6ld2dwrtkg2dr2zsf）的英语讲话在9.42秒处中断，现有时间证据无法确认完整句子，因此无法满足两份素材均贡献完整英语讲话的要求。

独立本地Whisper对A的辅助转写为：

```text
Whether you're a framer newbie or a seasoned pro, mastering the mechanics and tricks of interacting with layers and navigating the canvas will speed up.
```

A视频实测9.45秒，独立转写结束于9.42秒，内容在“will speed up”后结束。这与服务对输入约束的判断相符；没有将独立ASR当作人工听审，未验证后续混剪和配音字幕同步。

## 实际页面与证据

![R1主动终止及素材约束说明](../../../reports/sync001006-staging-20261116/SYNC-006/round-1-source-blocked.png)

[原始run](../../../reports/sync001006-staging-20261116/SYNC-006/round-1-run.json) · [A独立转写辅助](../../../reports/sync001006-staging-20261116/baselines/M6a-independent-asr.json) · [本轮总报告](sync001006-staging-results-20261116.md#sync-006)

## 索引与恢复条件

- 项目：`2cd8ff65-bd38-4c1b-94ef-9be68164df80`；会话：`21bf040f-47c2-43cc-9594-8cd848c81ce6`；run：`run_v2_2be1a046fcce42f2a761cef98bc046c9`。
- A：`file_cloud_mwe3qjluv6ld2dwrtkg2dr2zsf`，SHA `897b9ef16ac9fd2c255067478f179143f1d998b4e962f391e9ede635a4bfe022`。
- B：`file_cloud_yqa6bpdhkh6gts5c5hsxaql34j`，SHA `a0c47d8a7cf9b01bd611046ef471e0b41e1b84ed1248cacab4321f54305a7f89`。
- 原定义固定了源文件及哈希。本次保留该定义，没有换片、降低完整句子要求或重发原run。后续若补跑，需先确认一份含完整英语句子的短片A并更新素材版本，或另行确认调整用例约束；本轮Blocked保留历史。

云效用例定义为WLAX-308；本次定义同步不表示混剪链路通过，源片约束阻塞不计产品缺陷。
