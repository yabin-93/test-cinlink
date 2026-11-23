# SSO全量生产夜间测试（2026-11-19）

计划：27例/129正式轮；生产 https://app.cinlink.ai/，ego有头串行，原片7MB.mp4已核实7815126字节及SHA256。初次UI账号yabinc18，积分3753。

更新：2026-11-19T02:54:44.647Z；实际已记录轮次统计：{"Passed":37,"Failed":32,"Awaiting content review":6,"Blocked":1}。未覆盖不计通过。


| 用例 | 本轮状态 | 已受理正式轮 | 轮次结论 |
|---|---|---:|---|
| SSO-001 | Passed | 2 | R1:Passed；R2:Passed |
| SSO-002 | Passed | 3 | R1:Passed；R2:Passed；R3:Passed |
| SSO-003 | Passed | 4 | R1:Passed；R2:Passed；R3:Passed；R4:Passed |
| SSO-004 | Failed | 5 | R1:Passed；R2:Passed；R3:Passed；R4:Passed；R5:Failed |
| SSO-005 | Failed | 5 | R1:Awaiting content review；R2:Failed；R3:Failed；R4:Failed；R5:Failed |
| SSO-006 | Failed | 5 | R1:Awaiting content review；R2:Failed；R3:Failed；R4:Failed；R5:Failed |
| SSO-007 | Passed | 5 | R1:Passed；R2:Passed；R3:Passed；R4:Passed；R5:Passed |
| SSO-008 | Failed | 5 | R1:Passed；R2:Passed；R3:Passed；R4:Passed；R5:Failed |
| SSO-009 | Failed | 5 | R1:Passed；R2:Passed；R3:Failed；R4:Passed；R5:Failed |
| SSO-010 | Failed | 5 | R1:Passed；R2:Failed；R3:Failed；R4:Failed；R5:Failed |
| SSO-011 | Failed | 5 | R1:Awaiting content review；R2:Passed；R3:Awaiting content review；R4:Failed；R5:Passed |
| SSO-012 | Failed | 5 | R1:Passed；R2:Failed；R3:Failed；R4:Failed；R5:Failed |
| SSO-013 | Failed | 5 | R1:Passed；R2:Failed；R3:Passed；R4:Failed；R5:Failed |
| SSO-014 | Failed | 5 | R1:Awaiting content review；R2:Failed；R3:Failed；R4:Failed；R5:Failed |
| SSO-015 | Failed | 5 | R1:Passed；R2:Passed；R3:Failed；R4:Failed；R5:Passed |
| SSO-016 | Failed | 5 | R1:Passed；R2:Passed；R3:Failed；R4:Failed；R5:Awaiting content review |
| SSO-017 | Blocked | 2 | R1:Passed；R2:Blocked |
| SSO-018 | Not Run | 0 | 尚未执行 |
| SSO-019 | Not Run | 0 | 尚未执行 |
| SSO-020 | Not Run | 0 | 尚未执行 |
| SSO-021 | Not Run | 0 | 尚未执行 |
| SSO-022 | Not Run | 0 | 尚未执行 |
| SSO-023 | Not Run | 0 | 尚未执行 |
| SSO-024 | Not Run | 0 | 尚未执行 |
| SSO-025 | Not Run | 0 | 尚未执行 |
| SSO-026 | Not Run | 0 | 尚未执行 |
| SSO-027 | Not Run | 0 | 尚未执行 |

证据保存在reports/sso-nightly-prod-20261119/；progress.json为持久检查点。固定Playwright脚本已有登记，但本轮为ego有头实测，不将执行辅助器视为新固定自动化接入。云效写入0；Git提交/推送0。内容待复核不以done判Passed。

## 当前批次与复核边界

批次状态：Blocked。用例统计：{"Passed":4,"Failed":12,"Blocked":1,"Not Run":10}；已受理正式轮76，尚未建立检查点轮53。未执行不计通过。

凌晨SSO014 R1曾因需要200/可用137积分预检中断，原记录及69轮未提交占位已归档。用户随后明确“已补积分”，刷新UI核实5137积分，在原会话点击一次充值后重试，原run_id与用户消息数量不变；未重发原提示词或已完成任务。之后按原计划继续，原有失败和待人工复核保持。

执行控制阻塞：TaskSpace38 ended at 2026-11-19T02:54:58Z and is now user-owned; explicit user continue in this space required.

本批来源失败及无新交付缺陷仅本机草稿，不自动云效写入。当前轮次详细输入/产物ID、SHA、解码与历史回读见progress.json。恢复/播放专项未得到对应证据前不计通过。

人工复核仍待：005 R1中文短句排版、006 R1中文配音可懂度、011 R1/R3高光末句是否完整。实际音视频片段见各例证据目录；未获人工结论不计通过。

## 本轮失败与待复核明细

### SSO-004 R5 — Failed

识别源视频中的英文语音并翻译成日文，只交付日文SRT文件，保留原片完整时间轴，不烧录视频。

run_id：run_v2_6637297d92bf43d3b4d131a7543fb96c；会话：da3109ca-34a6-461a-8a96-b8bf395ecf38。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际18条日文SRT已全文对照当日原片ASR，语义、语言及完整时间轴可追溯F；但本轮直接用前轮英文SRT作首个媒体输入，按用户严格来源规则Failed，不误报内容语言异常。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-004/r5-complete.png)

### SSO-005 R1 — Awaiting content review

根据源视频中的英文语音生成简体中文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带简体中文字幕的MP4，不更改配音、不增加水印或画面增强。

run_id：run_v2_83d50879ef3648a6afea95f252d7aef2；会话：249448b6-bbcc-45df-8beb-c85b2ef902e5。

MP4实际60.49秒720p完整解码，首中末简体中文烧录及原英语音轨样本正常，18条译文整体语义对应源片。前三条跨cue重排：前两条较短，第3条0.76秒显示“医疗保健法的请求，企图破坏我们的医疗保障。”，可读性/局部语义呈现仍待复核；没有给定字速门槛，不凭自设阈值报Failed，也不以结构正确冒记完整Passed。额外SRT显示按正文E4记录观察，不单判缺陷。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-005/r1-complete.png)

### SSO-005 R2 — Failed

根据源视频中的英文语音生成日文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带日文字幕的MP4，不更改配音、不增加水印或画面增强。

run_id：run_v2_a234fcfd7f4e440f937bc7ece8c8e4c8；会话：249448b6-bbcc-45df-8beb-c85b2ef902e5。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-005/r2-complete.png)

### SSO-005 R3 — Failed

根据源视频中的英文语音生成韩文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带韩文字幕的MP4，不更改配音、不增加水印或画面增强。

run_id：run_v2_b10abb2b7107436f95d746cdbfd45bfb；会话：249448b6-bbcc-45df-8beb-c85b2ef902e5。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-005/r3-complete.png)

### SSO-005 R4 — Failed

根据源视频中的英文语音生成法文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带法文字幕的MP4，不更改配音、不增加水印或画面增强。

run_id：run_v2_6e8a30e96d0841809c960206d50d10fc；会话：249448b6-bbcc-45df-8beb-c85b2ef902e5。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-005/r4-complete.png)

### SSO-005 R5 — Failed

根据源视频中的英文语音生成西班牙文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带西班牙文字幕的MP4，不更改配音、不增加水印或画面增强。

run_id：run_v2_97c2e3d2dc4b42acb7d9fb794cc687c3；会话：249448b6-bbcc-45df-8beb-c85b2ef902e5。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

实际MP4完整解码，60.49秒720p有音轨；目标语言SRT全文与当日原片英文ASR整体语义对应，中段画面为本轮指定语言，原声样本匹配F；但直接消费前轮英文SRT而非本轮F，按严格来源规则Failed。未将全片逐帧字幕显示及字速质量未穷举范围算通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-005/r5-complete.png)

### SSO-006 R1 — Awaiting content review

将源视频中的英文人声翻译并配音为中文普通话，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的简体中文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个中文普通话配音且带简体中文字幕的MP4，不做口型同步或添加水印。

run_id：run_v2_ece72e59b6f34d8591075487a07c0f28；会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7。

本轮60.44秒720p完整解码，顶层F正确，实际配音独立base ASR识别为中文（0.9984），中段中文字幕正确。第3条长句被安排在6.92～7.68秒，base全片与small固定5.5～8.5秒窗口均无法还原“医疗保健法的申请，破坏我们的医疗保障”；第13条短窗亦存在可懂度疑点。没有人工听审，不以ASR错字直接报翻译错误，保留短句配音清晰度待听审，不能判全轮Passed。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-006/r1-complete.png)

### SSO-006 R2 — Failed

将源视频中的英文人声翻译并配音为日语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的日文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个日语配音且带日文字幕的MP4，不做口型同步或添加水印。

run_id：run_v2_989a82720fc446b0b0a6171e7d418ed0；会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-006/r2-complete.png)

### SSO-006 R3 — Failed

将源视频中的英文人声翻译并配音为韩语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的韩文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个韩语配音且带韩文字幕的MP4，不做口型同步或添加水印。

run_id：run_v2_33e7fae456634e95a55c95bbc123f678；会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-006/r3-complete.png)

### SSO-006 R4 — Failed

将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的法文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个法语配音且带法文字幕的MP4，不做口型同步或添加水印。

run_id：run_v2_0cd7897a43f2457cb70942446251edee；会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-006/r4-complete.png)

### SSO-006 R5 — Failed

将源视频中的英文人声翻译并配音为西班牙语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的西班牙文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个西班牙语配音且带西班牙文字幕的MP4，不做口型同步或添加水印。

run_id：run_v2_e389001dd96a4d5b962f71362e69b802；会话：5dd9cdbf-1a89-40ea-85e3-f3707765c1f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

本轮实际配音视频60.44秒720p可完整解码，但新轮翻译/配音直接使用前轮英文SRT而非本轮原片F，严格来源Failed。已取得独立ASR/字幕画面证据的语言项另行保留；未将ASR近音误识、所有短cue清晰度与全片人工听审未覆盖范围当通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-006/r5-complete.png)

### SSO-008 R5 — Failed

把源视频剪成20秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。

run_id：run_v2_356d4c6b920c4da29e2cf0500ec6f483；会话：fa033a2e-1b62-444d-9ef2-0ea93ff9d6a4。

Expected exactly one mp4 artifact, got 0

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-008/r5-complete.png)

### SSO-009 R3 — Failed

根据源视频中的英文语音生成简体中文单语字幕并烧录，添加左上角全程可见的文字水印C1-R3，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_c53f3bdc31244269aff53f44b8705762；会话：d75b5b0c-385c-4507-ab35-194a058e884e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-009/r3-complete.png)

### SSO-009 R5 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C1-R5，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_e08d9c2f47854ea4b016c6e4f07b331c；会话：d75b5b0c-385c-4507-ab35-194a058e884e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-009/r5-complete.png)

### SSO-010 R2 — Failed

根据源视频中的英文语音生成日文单语字幕并烧录，添加左上角全程可见的文字水印C2-JA，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_e1f38f05a16c4a7dbaedf7808e55693e；会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-010/r2-complete.png)

### SSO-010 R3 — Failed

根据源视频中的英文语音生成韩文单语字幕并烧录，添加右下角全程可见的文字水印C2-KO，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_1b2314a20a2345abbaea23c873987db1；会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-010/r3-complete.png)

### SSO-010 R4 — Failed

根据源视频中的英文语音生成法文单语字幕并烧录，添加左下角全程可见的文字水印C2-FR，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_2defe151ceec40be9866506a74cc69c8；会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-010/r4-complete.png)

### SSO-010 R5 — Failed

根据源视频中的英文语音生成西班牙文单语字幕并烧录，添加右上角全程可见的文字水印C2-ES，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_d13eb343c1a240f195fe7297824dfdb6；会话：b7b007b9-c28d-4c6d-a174-b4f6149ac0f7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-010/r5-complete.png)

### SSO-011 R1 — Awaiting content review

先把源视频剪成20秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。

run_id：run_v2_3604e211f928489bb247811333785457；会话：806b1798-8dc7-4fe6-a7dd-ac4119d8457a。

F起始3段8.55～17.16、19.35～26.6、40.05～44.19依序成片20秒；每段原声独立匹配，6条英文SRT全文与所选原声/方案对齐，时间轴0.049～20.000。实际720p完整解码，中帧英文字幕正常，20逐秒样本无水印/历史中文，原声及历史SHA保持。 补充实际高光独立ASR：末句识别为must be critical，与字幕must be protected有分歧；切点44.19秒是否截断protected需人工听审，撤销此前仅字幕/原声样本足够的Passed。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-011/r1-complete.png)

### SSO-011 R3 — Awaiting content review

先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。

run_id：run_v2_3d085e287c8e40e49c09aaedf3dc29bf；会话：806b1798-8dc7-4fe6-a7dd-ac4119d8457a。

实际30.01秒720p，F切片方案每段匹配，10条英文SRT全读及中帧正常、逐秒无水印。最后源段止42.70秒，成片独立ASR只识别Access to care is critical，而字幕最后显示完整must be protected；疑似末句被截断/字幕包含未说完尾句，需人工听审确认，不单凭ASR判新缺陷。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-011/r3-complete.png)

### SSO-011 R4 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C3-FULL4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_eb117c20beab4b3c9dda74c54037481e；会话：806b1798-8dc7-4fe6-a7dd-ac4119d8457a。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_5jun7dmnp3gccf7ee5trw7d7ek

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-011/r4-complete.png)

### SSO-012 R2 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C4-R2，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_0b14e5a5c0fa4d03a9de7257d35c4c09；会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-012/r2-complete.png)

### SSO-012 R3 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不添加水印、不更改配音或剪短视频。

run_id：run_v2_b0119cfe4af542c2aaeb489e0a9f8965；会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe；Explicit first video input differs from expected source: file_cloud_j34fuofvgcdwkhq3ws4om44cbq

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-012/r3-complete.png)

### SSO-012 R4 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C4-R4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_5e34c886bf474fbc9583ca0267e7cbf5；会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-012/r4-complete.png)

### SSO-012 R5 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C4-R5，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_c7682718d6e946af8dd098af5c35b22f；会话：7ce533f9-7a5c-4b9b-9383-6a3d3644e058。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe；Explicit first video input differs from expected source: file_cloud_j34fuofvgcdwkhq3ws4om44cbq

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-012/r5-complete.png)

### SSO-013 R2 — Failed

给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。

run_id：run_v2_214a42aab09446f98eaa20af3c825053；会话：97e8521a-6cde-409c-a981-f1858c9022cd。

Expected exactly one mp4 artifact, got 0

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-013/r2-complete.png)

### SSO-013 R4 — Failed

给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。

run_id：run_v2_a37af3dfa9e440638c9f47465497d968；会话：97e8521a-6cde-409c-a981-f1858c9022cd。

Expected exactly one mp4 artifact, got 0

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-013/r4-complete.png)

### SSO-013 R5 — Failed

给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。

run_id：run_v2_2e9fed0c4faf4325adf7f34c25412b2d；会话：97e8521a-6cde-409c-a981-f1858c9022cd。

Expected exactly one mp4 artifact, got 0

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-013/r5-complete.png)

### SSO-014 R1 — Awaiting content review

将源视频中的英文人声翻译并配音为日语，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的日文单语字幕，并添加右上角全程可见的文字水印C6-JA；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。

run_id：run_v2_7734bc8121d148daa69de5aa8a56716f；会话：0381db38-349c-42ba-be16-4f2a82c3a156。

补积分后同一run恢复，当前轮从F新提取/转写并翻译，60.44秒720p完整解码；18条日文全文语义与原片一致，独立成片ASR为日语0.9953。中帧右上C6-JA正常，ROI60帧均读作同形西里尔С6-JА，不把OCR字符集误识别记产品错误。6.92～7.68秒长日文短cue在独立ASR中未完整还原，配音可懂度需人工听审；不以ASR转错字冒记翻译失败，也不判全轮Passed。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-014/r1-complete-reread-1795052839984.png)

### SSO-014 R2 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C6-EN2，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_5fe9bac871244fdf9f16445b11620e17；会话：0381db38-349c-42ba-be16-4f2a82c3a156。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-014/r2-complete.png)

### SSO-014 R3 — Failed

将源视频中的英文人声翻译并配音为中文普通话，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的简体中文单语字幕，并添加右下角全程可见的文字水印C6-ZH；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。

run_id：run_v2_c69cd7bf758e405596ee57cf5f5b2c67；会话：0381db38-349c-42ba-be16-4f2a82c3a156。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-014/r3-complete.png)

### SSO-014 R4 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C6-EN4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。

run_id：run_v2_f666fecda0164589bdea87d117ff8ff3；会话：0381db38-349c-42ba-be16-4f2a82c3a156。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-014/r4-complete.png)

### SSO-014 R5 — Failed

将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的法文单语字幕，并添加右上角全程可见的文字水印C6-FR；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。

run_id：run_v2_27a255e792d64f96a2e1f0881af254c1；会话：0381db38-349c-42ba-be16-4f2a82c3a156。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_or2z2iskvk55is7fhev5itswbe

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-014/r5-complete.png)

### SSO-015 R3 — Failed

根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。

run_id：run_v2_1f3005393d904b9b94149b47da5cc320；会话：2cb59d84-067a-4dc3-bf0f-818650fc5e7e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-015/r3-complete.png)

### SSO-015 R4 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。

run_id：run_v2_492ff1d47ea6469ab9be00411e70c8b6；会话：2cb59d84-067a-4dc3-bf0f-818650fc5e7e。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-015/r4-complete.png)

### SSO-016 R3 — Failed

根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。

run_id：run_v2_1f4680f5944c4bb1b703bc346cec3078；会话：2a7a2f8c-f5ad-4bd2-8992-2b2cf62699e7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-016/r3-complete.png)

### SSO-016 R4 — Failed

根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。

run_id：run_v2_2486a52545c14b219d0c37bc290de136；会话：2a7a2f8c-f5ad-4bd2-8992-2b2cf62699e7。

Strict source rule: first media tool directly reused previous-round SRT file_cloud_d665zc6otky5w3upjfrs5hueau

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-016/r4-complete.png)

### SSO-016 R5 — Awaiting content review

先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。

run_id：run_v2_7639bcee8272498ea38d1528b23a3f64；会话：2a7a2f8c-f5ad-4bd2-8992-2b2cf62699e7。

内容证据尚未复核，未计通过。

[实际终态截图](../../../reports/sso-nightly-prod-20261119/SSO-016/r5-complete.png)

### SSO-017 R2 — Blocked

先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。

run_id：run_v2_1c115e95a5a04f3c8b577d69303997b8；会话：ad0d6d73-f320-4a4e-8fe3-828a1bcaf15f。

内容证据尚未复核，未计通过。

SSO-005 R1原观察器曾把额外SRT显示单独记Failed；按当前正文E4与原提示词核对后已纠正，仅记录观察，MP4参数/内容与来源检查保留。原观察保存在事件及observerCorrections中，不重跑、不改产品断言。
