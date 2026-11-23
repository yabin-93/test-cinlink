# 夜间SSO：多轮指定来源被历史字幕或视频替代

**现象**

本批严格来源检查发现如下轮次使用前轮SRT直接作为媒体工具输入；同片可追溯性或内容正确不替代每轮原片F要求。

**前置步骤**

1. 生产环境 https://app.cinlink.ai/，专用账号yabinc18。
2. 原片7MB.mp4已登记一次，60.5秒、1280×720、英文原声。
3. 同会话已按对应SSO正文执行此前正式轮次。

**复现步骤**

1. 从独立干净会话登记F，顺序执行对应用例前轮完整指令。
2. 纯文本发送下列失败轮原提示词一次，不@、不重挂素材。
3. 等待实际交付，核对当前工具输入、当前轮生产节点及历史SRT ID。

**预期结果**

SSO001～018每轮从指定原片F开始，不直接以前轮SRT作为新轮媒体输入；SSO019～027按各轮F或指定历史产物配置执行。

**实际结果与提示词**

更新2026-11-19T02:54:44.647Z；当前证实28个来源失败轮。

### SSO-004 R5

识别源视频中的英文语音并翻译成日文，只交付日文SRT文件，保留原片完整时间轴，不烧录视频。

会话：da3109ca-34a6-461a-8a96-b8bf395ecf38；run：run_v2_6637297d92bf43d3b4d131a7543fb96c。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际18条日文SRT已全文对照当日原片ASR，语义、语言及完整时间轴可追溯F；但本轮直接用前轮英文SRT作首个媒体输入，按用户严格来源规则Failed，不误报内容语言异常。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-004/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-004/r5-complete.png)。

### SSO-005 R2

根据源视频中的英文语音生成日文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带日文字幕的MP4，不更改配音、不增加水印或画面增强。

会话：249448b6-bbcc-45df-8beb-c85b2ef902e5；run：run_v2_a234fcfd7f4e440f937bc7ece8c8e4c8。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-005/r2-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-005/r2-complete.png)。

### SSO-005 R3

根据源视频中的英文语音生成韩文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带韩文字幕的MP4，不更改配音、不增加水印或画面增强。

会话：249448b6-bbcc-45df-8beb-c85b2ef902e5；run：run_v2_b10abb2b7107436f95d746cdbfd45bfb。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-005/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-005/r3-complete.png)。

### SSO-005 R4

根据源视频中的英文语音生成法文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带法文字幕的MP4，不更改配音、不增加水印或画面增强。

会话：249448b6-bbcc-45df-8beb-c85b2ef902e5；run：run_v2_6e8a30e96d0841809c960206d50d10fc。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-005/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-005/r4-complete.png)。

### SSO-005 R5

根据源视频中的英文语音生成西班牙文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带西班牙文字幕的MP4，不更改配音、不增加水印或画面增强。

会话：249448b6-bbcc-45df-8beb-c85b2ef902e5；run：run_v2_97c2e3d2dc4b42acb7d9fb794cc687c3。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-005/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-005/r5-complete.png)。

### SSO-006 R2

将源视频中的英文人声翻译并配音为日语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的日文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个日语配音且带日文字幕的MP4，不做口型同步或添加水印。

会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7；run：run_v2_989a82720fc446b0b0a6171e7d418ed0。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-006/r2-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-006/r2-complete.png)。

### SSO-006 R3

将源视频中的英文人声翻译并配音为韩语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的韩文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个韩语配音且带韩文字幕的MP4，不做口型同步或添加水印。

会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7；run：run_v2_33e7fae456634e95a55c95bbc123f678。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-006/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-006/r3-complete.png)。

### SSO-006 R4

将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的法文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个法语配音且带法文字幕的MP4，不做口型同步或添加水印。

会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7；run：run_v2_0cd7897a43f2457cb70942446251edee。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-006/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-006/r4-complete.png)。

### SSO-006 R5

将源视频中的英文人声翻译并配音为西班牙语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的西班牙文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个西班牙语配音且带西班牙文字幕的MP4，不做口型同步或添加水印。

会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7；run：run_v2_e389001dd96a4d5b962f71362e69b802。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-006/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-006/r5-complete.png)。

### SSO-009 R3

根据源视频中的英文语音生成简体中文单语字幕并烧录，添加左上角全程可见的文字水印C1-R3，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：d75b5b0c-385c-4507-ab35-194a058e884e；run：run_v2_c53f3bdc31244269aff53f44b8705762。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-009/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-009/r3-complete.png)。

### SSO-009 R5

根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C1-R5，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：d75b5b0c-385c-4507-ab35-194a058e884e；run：run_v2_e08d9c2f47854ea4b016c6e4f07b331c。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-009/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-009/r5-complete.png)。

### SSO-010 R2

根据源视频中的英文语音生成日文单语字幕并烧录，添加左上角全程可见的文字水印C2-JA，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7；run：run_v2_e1f38f05a16c4a7dbaedf7808e55693e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-010/r2-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-010/r2-complete.png)。

### SSO-010 R3

根据源视频中的英文语音生成韩文单语字幕并烧录，添加右下角全程可见的文字水印C2-KO，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7；run：run_v2_1b2314a20a2345abbaea23c873987db1。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-010/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-010/r3-complete.png)。

### SSO-010 R4

根据源视频中的英文语音生成法文单语字幕并烧录，添加左下角全程可见的文字水印C2-FR，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7；run：run_v2_2defe151ceec40be9866506a74cc69c8。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-010/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-010/r4-complete.png)。

### SSO-010 R5

根据源视频中的英文语音生成西班牙文单语字幕并烧录，添加右上角全程可见的文字水印C2-ES，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7；run：run_v2_d13eb343c1a240f195fe7297824dfdb6。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-010/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-010/r5-complete.png)。

### SSO-011 R4

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C3-FULL4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：806b1798-8dc7-4fe6-a7dd-ac4119d8457a；run：run_v2_eb117c20beab4b3c9dda74c54037481e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_5jun7dmnp3gccf7ee5trw7d7ek

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-011/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-011/r4-complete.png)。

### SSO-012 R2

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C4-R2，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058；run：run_v2_0b14e5a5c0fa4d03a9de7257d35c4c09。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-012/r2-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-012/r2-complete.png)。

### SSO-012 R3

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不添加水印、不更改配音或剪短视频。

会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058；run：run_v2_b0119cfe4af542c2aaeb489e0a9f8965。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe
Explicit first video input differs from expected source: file_cloud_j34fuofvgcdwkhq3ws4om44cbq

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-012/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-012/r3-complete.png)。

### SSO-012 R4

根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C4-R4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058；run：run_v2_5e34c886bf474fbc9583ca0267e7cbf5。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-012/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-012/r4-complete.png)。

### SSO-012 R5

根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C4-R5，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058；run：run_v2_c7682718d6e946af8dd098af5c35b22f。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe
Explicit first video input differs from expected source: file_cloud_j34fuofvgcdwkhq3ws4om44cbq

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-012/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-012/r5-complete.png)。

### SSO-014 R2

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C6-EN2，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：0381db38-349c-42ba-be16-4f2a82c3a156；run：run_v2_5fe9bac871244fdf9f16445b11620e17。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-014/r2-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-014/r2-complete.png)。

### SSO-014 R3

将源视频中的英文人声翻译并配音为中文普通话，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的简体中文单语字幕，并添加右下角全程可见的文字水印C6-ZH；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。

会话：0381db38-349c-42ba-be16-4f2a82c3a156；run：run_v2_c69cd7bf758e405596ee57cf5f5b2c67。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-014/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-014/r3-complete.png)。

### SSO-014 R4

根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C6-EN4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

会话：0381db38-349c-42ba-be16-4f2a82c3a156；run：run_v2_f666fecda0164589bdea87d117ff8ff3。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-014/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-014/r4-complete.png)。

### SSO-014 R5

将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的法文单语字幕，并添加右上角全程可见的文字水印C6-FR；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。

会话：0381db38-349c-42ba-be16-4f2a82c3a156；run：run_v2_27a255e792d64f96a2e1f0881af254c1。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-014/r5-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-014/r5-complete.png)。

### SSO-015 R3

根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。

会话：2cb59d84-067a-4dc3-bf0f-818650fc5e7e；run：run_v2_1f3005393d904b9b94149b47da5cc320。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-015/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-015/r3-complete.png)。

### SSO-015 R4

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。

会话：2cb59d84-067a-4dc3-bf0f-818650fc5e7e；run：run_v2_492ff1d47ea6469ab9be00411e70c8b6。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-015/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-015/r4-complete.png)。

### SSO-016 R3

根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。

会话：2a7a2f8c-f5ad-4bd2-8992-2b2cf62699e7；run：run_v2_1f4680f5944c4bb1b703bc346cec3078。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-016/r3-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-016/r3-complete.png)。

### SSO-016 R4

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。

会话：2a7a2f8c-f5ad-4bd2-8992-2b2cf62699e7；run：run_v2_2486a52545c14b219d0c37bc290de136。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际文件参数已核验；字幕/配音内容的完整人工质量结论不据此自动通过。

[完整消息](../../reports/sso-nightly-prod-20261119/SSO-016/r4-current-messages.json)；[终态截图](../../reports/sso-nightly-prod-20261119/SSO-016/r4-complete.png)。

**影响**

多轮工作流来源约束被历史产物替代。

**补充**

均为2026-11-19本批实际新执行，零业务自动重试；未写云效、未提交Git。详细当前输入/产物ID、SHA、解码参数及前轮完整提示词见持久progress.json。未将其他轮次、历史结果或仅内容相似误计为当日通过。
