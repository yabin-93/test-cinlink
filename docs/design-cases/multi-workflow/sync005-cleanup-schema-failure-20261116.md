# SYNC-005：去口癖链路参数校验失败，未交付P1

2026-11-16预发实测：**整例Failed；R2依赖Blocked，未提交**。R1原run已failed，没有重试或用原片替代P1。

## 前置

1. 预发账号登录，独立项目/会话，上传已制备的受控中文视频SYNC-005-controlled.mp4。
2. 夹具640×360、25fps、H.264/ALAC、40.68秒；完整解码，解码PCM与原WAV逐字节相同、起点偏移0。源WAV三处“嗯、啊、呃”有标注，独立ASR也识别到三处，人工听审仍待补。

## 已发送提示词

```text
请只处理视频“SYNC-005-controlled.mp4”（文件ID：file_cloud_rkwmbxy4tcknzt2vqk23gpbxln），删除讲话中仅作口癖的“嗯”“啊”“呃”，并同步删除对应的视频时间；保留所有非口癖句子及原有先后顺序，不额外压缩停顿、不加字幕、不配音、不加音乐或转场。保持画面比例，交付一个清理后的MP4，并说明实际删除的位置。
```

## 复现步骤

1. 上传登记上述夹具，等待素材可用。
2. 一次性发送R1完整指令，等待该次run执行；页面先完成“分析口头语与停顿”。
3. 随后Editor script review update步骤报参数校验失败，整轮failed，页面显示错误及重试入口。未点击重试，保留原run取证。

## 预期与实际

预期仅删除标注的口癖及对应视频时间，保留非口癖语句和其他停顿，交付可下载清理MP4/P1，并说明实际删除位置。

实际页面/接口错误一致：

```text
Editor tool arguments do not match its schema; arguments: missing operation_id, task_id; arguments: missing operation_id, task_id
```

服务端status=failed，error.code=run_failed，没有清理后的MP4/P1。第二轮要求输入P1，因此依赖阻塞，未提交。**本次失败是链路参数校验错误；三处口癖实际删除、删后译配音和累计时间线同步均未覆盖，不据此宣称算法漏删。**

## 真实失败截图

![R1页面失败及原始错误](../../../reports/sync001006-staging-20261116/SYNC-005/round-1-failed.png)

[服务端原始run](../../../reports/sync001006-staging-20261116/SYNC-005/round-1-run.json) · [会话及步骤记录](../../../reports/sync001006-staging-20261116/SYNC-005/messages.json) · [夹具/原片核验](../../../reports/sync001006-staging-20261116/media-manifest.json) · [本轮总报告](sync001006-staging-results-20261116.md#sync-005)

## 证据索引

- 项目：`09c27f69-a2ee-4408-97a7-b8450bba0607`；会话：`df7bdeb0-bc3f-454c-8940-937e0e902223`。
- R1 run：`run_v2_6195584f56d24dfbae911ff609ed924d`；上传文件：`file_cloud_rkwmbxy4tcknzt2vqk23gpbxln`。
- 视频夹具SHA：`5abf98b044549123eef52cd0fc607921586068981ab0b73ad89e72b2cc6289c3`。
- 原WAV口癖金标：嗯8.5738–8.8432、啊19.6125–19.7722、呃29.2844–29.4739秒。这些是输入定位数据，不是实际删除结果。

本页为本地失败记录，云效用例定义WLAX-307；定义同步不代表执行通过。
