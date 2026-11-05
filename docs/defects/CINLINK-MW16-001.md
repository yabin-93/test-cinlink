# MW-16：B日文字幕串用A内容 · [FWXC-250](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=443f3aba58a7c4f7faa88ca508)

**现象**

双视频分别翻译后，A英文字幕对应A；标为B的日文字幕也翻译了A的医疗法演说，没有对应B的BBC新闻内容。

**前置步骤**

1. 使用专用预发账号进入测试项目内的空白会话，准备A=7MB.mp4（60.496秒）、B=1270510918-1-12.mp4（169.041秒）。
2. 依次上传并分别@引用A、B，核对两个独立file_id。现有证据的源SHA-256已与提交内容匹配。

**提示词**

```text
按引用顺序，第一个视频为 A、第二个为 B。分别识别各自视频中的语音并生成字幕，再将 A 的字幕翻译为英文、B 的字幕翻译为日文；只交付 A 的英文 SRT 和 B 的日文 SRT 两个独立文件，分别标明 A/B，保留各自源视频时间轴，不互换素材。
```

**复现步骤**

1. 完成两素材上传与引用，发送完整提示词。若有补槽，按A英文/B日文要求填写后继续。
2. 等待done，下载A_English.srt.srt及B_Japanese.srt.srt，保持原产物ID/名称映射。
3. 独立核对A/B原音频的开头和30–50秒，再分别与两份字幕交叉对照。
4. 检查B在90–110秒、149–169秒的语音是否有对应日文字幕。

**实际结果**

- run_id：`run_v2_170052a9826b4c648963ea5a091ad9b5`；会话ID：`efe1622c-693f-4d91-9514-07a7c8530670`；run done，原文件级JUnit passed，本次内容层核验failed。
- A英文SRT内容对应A；B日文SRT内容也对应A。不是两份互换，而是B交付物串用A。
- A原片讲医疗法、儿科、癌症、Las Vegas/Elko；B原片讲BBC开场、莫斯科无人机、夏威夷山火等新闻。日文B字幕出现“医療費負担適正化法”“小児科医”“ラスベガスからエルコ”，与A对应，与B不符。
- 两份SRT均15条，全部起点相同、14个终点相同，最大差0.02秒，均止于60.46秒。B在90秒和149秒后仍有新闻语音，但无对应日文字幕。

| 已交付字幕 | 对照A原片 | 对照B原片 |
|---|---|---|
| A英文SRT | 内容对应 | 不对应 |
| B日文SRT | 对应A的日文翻译 | 不对应，错源 |

**预期结果**

A英文SRT只对应A语音；B日文SRT只对应B语音，保留各自时间轴并覆盖有语音内容，不能互换或复用另一份素材的字幕。

**影响**

结果标记完成、文件名和语言均看似正确，但B交付内容来自错误素材，用户无法直接使用。

**补充**

已核对源文件SHA-256及原产物ID/名称，排除本次核验拿反A/B。使用本机离线Whisper独立转写6段原音频，没有新增CinLink任务；语音内容与日文译文人工语义交叉核对，足以确认错源，不代表整片逐字译文质量审校。具体规划、工具入参或缓存根因尚未定位。FIXME保留。详细交叉核验记录、源文件SHA-256及独立语音转写见附件MW-16-content-evidence.json；另附本次两份原始SRT。

**失败截图**

原始产物页面：任务Completed，交付A_English与B_Japanese两份字幕。

![MW-16-original-delivery.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7bf55ef3af79bab69abfe89d1a)

核验对照图：原片帧、已下载SRT及独立ASR的交叉对照；此图是核验报告，不是原产品页面截图。

![MW-16-source-comparison.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=215361db4ef92826edd9c3f162)
