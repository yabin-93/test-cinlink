<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。 [同步明细](defects-071-production-20261118.md)。此前“未写云效”指原测试执行阶段。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

# ERYE199-069～075 生产执行结果（2026-11-18）

本轮7条：**6通过、1失败、0阻塞、0待执行**。当前142条：38通过、8失败、2阻塞、21不适用、73待执行。其余135条状态及云效关联保持；原测试阶段未写云效，后续已同步FWXC-693。

TaskSpace6已正常结束一次，未保留页面；全部原run均完成，后续查证读取本地记录，不重新发送旧任务。

环境：生产 app.cinlink.ai，Ego Lite 0.6.3.14有头浏览器，TaskSpace6；测试项目 `ERYE199-069-075-生产-20261118`，workspace `74794cd0-ea12-4355-9eb6-e9a039a62fc7`。每例独立新会话/原生工程，每次只附本例一个源片；069/070首页选择项目后实际会话落在未分组，已如实登记，后续使用原生项目新会话路由。没有使用旧工程替代、重新上传产物代替原生入口或API写工程。

[结构化逐例结果](execution-status-069-075-production-20261118.json) · [全量进度](execution-status-current.md) · [素材清单](evidence-069-075-production-20261118/fixture-manifest.json) · [自动化说明](automation.md)

| 用例 | 结果 | 实际核验 |
|---|---|---|
| [ERYE199-069](#erye199-069) | Passed | 原文字幕/视频/原声3轨、8句英文；原英语声音保持；20秒1280×720；两处原生预览播放、重入与刷新通过。 |
| [ERYE199-070](#erye199-070) | Passed | 译文字幕/视频/原声3轨、中文可编辑字幕；实际声音仍英语；20秒1280×720；预览、重入与刷新通过，无额外译声/BGM轨。 |
| [ERYE199-071](#erye199-071) | Failed | 译文模式仍在编辑器2秒和10秒处显示中文+英文，重入/刷新保持；下载成片对应帧只有中文。五类轨、中文译声及20秒成片正常；整例Failed。 |
| [ERYE199-072](#erye199-072) | Passed | 双语模式保留译文字幕/视频/原声/配音/背景音乐5轨；两处预览中英对应、实际声音中文；20秒1280×720，重入与刷新通过。 |
| [ERYE199-073](#erye199-073) | Passed | 画质增强交付20秒2560×1440；视频/原声2轨、源标记和原英语语音保持，重入刷新通过。当前卡片无独立2倍选项，按原完整提示词指定2倍并核验实际输出。 |
| [ERYE199-074](#erye199-074) | Passed | 默认审核3口水词+6停顿后点击移除；实际44.744秒，视频/原声各10段（末段在时间轴视口外）；三段正文独立ASR完整保持，画面/原声与保留源区间对照通过，接缝播放、重入刷新通过。 |
| [ERYE199-075](#erye199-075) | Passed | 原生时长选30秒；审核确认源20.400～35.250、39.750～54.900两段，实际输出30秒1280×720；编辑器视频/原声各2段与方案/成片对应，首中尾源标记、接缝播放和重入刷新通过。 |

F20：20秒英语原声、1280×720/30fps/48kHz，源画面带时钟，另混低音量可分离背景乐；F60：60秒三话题的Microsoft Zira合成QA口播，标注Um/Uh及停顿、带源时钟。两份夹具均完整解码并独立转写。F60不是自然口播的全面质量样本；本批只验本例输入、轨道和结果对应。

所有实际产物均经原生下载、完整解码、时长/尺寸核验。069/070/073的英语正文与F20独立转写一致；071/072实际中文音轨存在；074去掉口水词后的全文与F60一致；074/075逐段登记源映射，以实际解码画面及高能量语音窗口与原片比对。低能量停顿中AAC噪声相关度不作语音错位判断，辅助程序已改为先按源能量选语音窗。页面真实播放并记录推进，未声称已人工逐句听审。

<a id="erye199-069"></a>
## ERYE199-069：Passed

前置：添加字幕卡片，独立新会话，唯一源片 `F20-English-source-with-BGM.mp4`。参数、原文提示词与前置截图一并留存。

> 为这条视频添加原文字幕。

原文字幕/视频/原声3轨、8句英文；原英语声音保持；20秒1280×720；两处原生预览播放、重入与刷新通过。

会话：[打开本轮](https://app.cinlink.ai/c/b5e68552-af60-4e4b-a46e-d77fcceab2ac)；原run `run_v2_ad5e87c0898f4d9aac97ea4efcf674a4`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/069`。

[原生时间轴](evidence-069-075-production-20261118/069/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/069/product-verification.json)
[2秒预览](evidence-069-075-production-20261118/069/preview-2.png) · [10秒预览](evidence-069-075-production-20261118/069/preview-10.png)

<a id="erye199-070"></a>
## ERYE199-070：Passed

前置：添加字幕卡片，独立新会话，唯一源片 `F20-English-source-with-BGM.mp4`。参数、原文提示词与前置截图一并留存。

> 为这条视频添加简体中文字幕。

译文字幕/视频/原声3轨、中文可编辑字幕；实际声音仍英语；20秒1280×720；预览、重入与刷新通过，无额外译声/BGM轨。

会话：[打开本轮](https://app.cinlink.ai/c/4f263141-61c1-4eb6-be06-1ec866b2de28)；原run `run_v2_cf45a6df9e4e4d5b998b7a1f8a61563d`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/070`。

[原生时间轴](evidence-069-075-production-20261118/070/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/070/product-verification.json)
[2秒预览](evidence-069-075-production-20261118/070/preview-2.png) · [10秒预览](evidence-069-075-production-20261118/070/preview-10.png)

<a id="erye199-071"></a>
## ERYE199-071：Failed

前置：翻译配音卡片，独立新会话，唯一源片 `F20-English-source-with-BGM.mp4`。参数、原文提示词与前置截图一并留存。

> 将这条视频翻译成简体中文配音，并显示简体中文字幕。

译文模式仍在编辑器2秒和10秒处显示中文+英文，重入/刷新保持；下载成片对应帧只有中文。五类轨、中文译声及20秒成片正常；整例Failed。

会话：[打开本轮](https://app.cinlink.ai/c/c932beb9-ad5e-4548-a21c-270fff012bcd)；原run `run_v2_3f61e36d877a4447b54acdf966f7542c`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/071/attempt-2`。

[原生时间轴](evidence-069-075-production-20261118/071/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/071/product-verification.json)
[2秒预览](evidence-069-075-production-20261118/071/preview-2.png) · [10秒预览](evidence-069-075-production-20261118/071/preview-10.png)

初次积分不足（需要200/余额90）未生成；用户回复“已补充”后保留旧记录、另建独立新尝试，未重发旧任务。新尝试五轨与中文音轨成立，但选择译文时编辑器两句均双语，重入和刷新保持，判Failed；不把积分或此前观察脚本超时当产品缺陷。

![提交前选择译文](evidence-069-075-production-20261118/071/before-submit.png)
![编辑器额外英文](evidence-069-075-production-20261118/071/preview-2.png)
![实际成片只显示中文，ffmpeg抽帧辅助证据](evidence-069-075-production-20261118/071/product-frame-2.png)

[本地缺陷及详细复现](../../../defects/ERYE199-071-translation-only-preview-bilingual-production-20261118.md)。后续已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)。

<a id="erye199-072"></a>
## ERYE199-072：Passed

前置：翻译配音卡片，独立新会话，唯一源片 `F20-English-source-with-BGM.mp4`。参数、原文提示词与前置截图一并留存。

> 将这条视频翻译成简体中文配音，并显示中英双语字幕。

双语模式保留译文字幕/视频/原声/配音/背景音乐5轨；两处预览中英对应、实际声音中文；20秒1280×720，重入与刷新通过。

会话：[打开本轮](https://app.cinlink.ai/c/f875ad42-3449-44de-907b-7a9e5416e44a)；原run `run_v2_8c1fbe39b38f4936872e6f7a45266f5e`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/072`。

[原生时间轴](evidence-069-075-production-20261118/072/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/072/product-verification.json)
[2秒预览](evidence-069-075-production-20261118/072/preview-2.png) · [10秒预览](evidence-069-075-production-20261118/072/preview-10.png)

<a id="erye199-073"></a>
## ERYE199-073：Passed

前置：画质增强卡片，独立新会话，唯一源片 `F20-English-source-with-BGM.mp4`。参数、原文提示词与前置截图一并留存。

> 将这条视频的画质增强2倍，保留完整时长和原音。

画质增强交付20秒2560×1440；视频/原声2轨、源标记和原英语语音保持，重入刷新通过。当前卡片无独立2倍选项，按原完整提示词指定2倍并核验实际输出。

会话：[打开本轮](https://app.cinlink.ai/c/6e992607-a173-4ccd-98d1-1e882fe7df8f)；原run `run_v2_02207dc277324d3f9b25b5f1644da048`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/073`。

[原生时间轴](evidence-069-075-production-20261118/073/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/073/product-verification.json)

<a id="erye199-074"></a>
## ERYE199-074：Passed

前置：去口水词卡片，独立新会话，唯一源片 `F60-English-fillers-three-topics.mp4`。参数、原文提示词与前置截图一并留存。

> 去掉这条视频中的口水词和多余停顿，保留其余内容与原音。

默认审核3口水词+6停顿后点击移除；实际44.744秒，视频/原声各10段（末段在时间轴视口外）；三段正文独立ASR完整保持，画面/原声与保留源区间对照通过，接缝播放、重入刷新通过。

会话：[打开本轮](https://app.cinlink.ai/c/50d2252f-e031-4713-8ec2-fb2e3c980f6c)；原run `run_v2_89b3f3c1251a48a3ae22c48ef55ed31d`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/074`。

[原生时间轴](evidence-069-075-production-20261118/074/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/074/product-verification.json)
[审核截图](evidence-069-075-production-20261118/074/review-before-confirm.png) · [源区间登记](evidence-069-075-production-20261118/074/source-mapping.json) · [逐段内容核验](evidence-069-075-production-20261118/074/source-content-verification.json)

<a id="erye199-075"></a>
## ERYE199-075：Passed

前置：长视频变短卡片，独立新会话，唯一源片 `F60-English-fillers-three-topics.mp4`。参数、原文提示词与前置截图一并留存。

> 将这条视频剪成30秒高光，保留原音。

原生时长选30秒；审核确认源20.400～35.250、39.750～54.900两段，实际输出30秒1280×720；编辑器视频/原声各2段与方案/成片对应，首中尾源标记、接缝播放和重入刷新通过。

会话：[打开本轮](https://app.cinlink.ai/c/c04dd357-35c2-4662-911d-f4a928c13609)；原run `run_v2_799a1c7128bb425f8ebf367fbceb9e57`。本地原始产物及私有检查点：`reports/erye199-069-075-production-20261118/075`。

[原生时间轴](evidence-069-075-production-20261118/075/editor-tracks.png) · [实际文件核验](evidence-069-075-production-20261118/075/product-verification.json)
[审核截图](evidence-069-075-production-20261118/075/review-before-confirm.png) · [源区间登记](evidence-069-075-production-20261118/075/source-mapping.json) · [逐段内容核验](evidence-069-075-production-20261118/075/source-content-verification.json)

## 核验边界与运行说明

073卡片没有独立2倍选择器，直接使用原提示词并以实际2560×1440结果验收；并未声称点击不存在选项。074默认0.8秒停顿阈值；点击“移除”后继续同一原run。075确认方案两段总计30秒，摘要曾写约30.4秒，实际区间/时间轴/下载成片均30秒；本批按实际业务结果验收。时间轴末段超出视口时不按可见块数量推算总片段。

初期文件上传等待误把aria-label当正文、20秒结束点无视频黑屏、range控件像素点击偏差、预览首次冷启动等待、原下载候选API404均属观察/脚本适配记录；已在原任务上修正核验，没有因此重复发送原请求。原生seek现用键盘小步校正至1帧，预览播放用Node有界轮询。

唯一069～075实现 `tools/editor/erye199/workflow-cards.mjs`；分阶段入口 `tools/editor/erye199/run-workflow-cards.mjs`。已有检查点用observe/resume/verify续验，禁止再次open/upload/submit。新批次按自动化说明准备新的报告目录，不能复用此批新建任务。

本轮离线验证：两JS入口语法检查、5项重复提交/活动任务/积分恢复/跨会话防误验门禁测试及Python语法检查通过；npm run cases:check检查618条，issues=0。原始run/messages、带签名链接及完整MP4只留reports，不复制进公共文档。
