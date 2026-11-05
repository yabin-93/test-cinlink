# CINLINK-SSO020-EN-001 · [FWXC-284](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=5d97cd56033b5f4caee04d8a6c)

2026-11-05按用户指令提交，正文、字段和6份附件已回读核验。优先级中，严重程度3-一般；1张本批真实成片失败帧已嵌入，另附实际SRT、原片对照SRT、2份核验音频及脱敏JSON。

**现象**

对同会话上一轮生成的英文高光视频添加英文字幕，首句将原片上下文中的“or a family”识别为“Our family”，并烧录到成片；任务状态为done。

**前置步骤**

1. 使用有字幕生成权限及足够积分的测试账号登录[Web预发](https://staging-app.cinlink.ai)，新建独立非项目会话。
2. 上传一次`7MB.mp4`（英文语音，60.495778秒，1280×720，有音轨），发送登记指令，等待登记完成。
3. 在同一会话执行第1轮20秒高光，等待完成。本次产物为19.866341秒、1280×720；确认保留“or a family facing a cancer diagnosis”对应语音后执行第2轮。全程不@、不重新上传。

**提示词**

登记：

```text
保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。
```

前置第1轮：

```text
将本会话最初上传的7MB.mp4原始视频剪成20秒高光，保留选中片段的原英语音轨和1280×720分辨率。只输出一个MP4，不添加字幕、水印或画质增强。
```

触发第2轮：

```text
根据上一轮生成的20秒高光视频中的英文语音，生成英文单语字幕并烧录。保留该高光视频的全部片段、时长、分辨率和音轨，只输出一个MP4，不重新剪辑、不添加水印。
```

**复现步骤**

1. 完成上述登记和第1轮高光，在同一会话发送第2轮完整提示词，等待成片。
2. 查看成片0.040～6.220秒的首条字幕，在0.5秒暂停；对照原片对应上下文及附件音频。
3. 核对附件实际SRT首条，确认文本与烧录画面一致。

**实际结果**

- 实测：2026-11-05，Web预发，Chrome有头；任务done，内容验收未通过。
- 会话ID：`de33ee82-d620-4b1a-b5ef-6ffed45ff1f5`；第2轮run_id：`run_v2_95a99363685c4b878f395118f592e884`。
- 实际输入高光ID：`file_cloud_jhgoacnlkmohhh3lgd2svxqael`；转写及英文字幕ID：`file_cloud_pdwl5zddr5hhoymscvbtaydscd`；输出MP4 ID：`file_cloud_tasq4cadzh2r3ccsok2vwox467`。
- 首条实际SRT：

```srt
1
00:00:00,040 --> 00:00:06,220
Our family facing a cancer diagnosis is able to depend on coverage protections for their loved one.
```

- `transcribe_audio`返回的SRT已含“Our family”，`translate_subtitle`英文SRT与烧录成片沿用该文本。
- 实际处理来源为第1轮高光，成片19.866341秒、1280×720；来源与音轨保留核验通过，未发现跨轮字幕串用。

**预期结果**

英文字幕应准确表达原始语音上下文，保留“or a family”的原意，避免改成“Our family”；SRT与烧录视频中的文字应一致且准确。

**影响**

字幕将泛指家庭的衔接表达改为“我们的家庭”，影响信息准确性，需人工修正并重新烧录；SSO-020第2轮内容验收未通过。

**补充**

稳定定位键：`CINLINK-SSO020-EN-001`。前置run_id：`run_v2_90762edb921e4768860a29659cff52a5`；原片ID：`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`。完整原片同句SRT及原片语音上下文为“or a family”，本次高光转写与独立高光音频转写均为“Our family”。差异已在转写阶段出现；片段边界/上下文是否影响识别及复现概率待确认，未定位算法根因。高光选段可能变化，复测须保留同一句语音，或复用本次输入高光。附件含实际SRT、原片对照SRT、核验音频及脱敏定位JSON；音频为解码后的16kHz单声道核验样本，并非服务端原始ASR请求文件。

**失败截图**

本次实际成片0.5秒原始解码帧，首句显示“Our family”；与原片对应上下文“or a family”不一致。

![SSO-020-R2-original-failure.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7b745a4bda933920965fc132dc)
