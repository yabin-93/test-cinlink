<!-- ERYE199-078-YUNXIAO-20261118 -->
ERYE199-078已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)：同会话切换后多出前轮英文字幕轨，第2/3轮实际4/6轨、预期3/5轨。4张提交参数及失败原图已上传并嵌入，另附原片、精简证据，共6附件及正文回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条42P/9F/2B/21NA/68NR不变。本次仅同步既有失败，未重跑。 [同步明细](defects-078-production-20261118.md)。原“未写云效”指测试执行阶段。
<!-- /ERYE199-078-YUNXIAO-20261118 -->

# ERYE199-076～080生产执行结果（2026-11-18）

本轮5条：**4 Passed / 1 Failed**。当前142条：42 Passed / 9 Failed / 2 Blocked / 21 Not Applicable / 68 Not Run。7个原生任务均已完成，没有补槽或重发。原测试阶段未写云效，后续已同步FWXC-694。

生产有头Ego Lite 0.6.3.14，TaskSpace7；本批项目 `ERYE199-076-080-生产-20261118` / `79fe2155-cd79-42b1-b048-1ec636ede0bd`。用户选择其他测试目录后，本批只为当前用例显式上传所需F20/D，未分析整个目录。076/077/079/080为独立新会话；078三轮同一会话、每轮重新选择源片。所有业务修改通过原生页面执行，没有API写工程。

[结构化结果](execution-status-076-080-production-20261118.json) · [当前进度](execution-status-current.md) · [自动化说明](automation.md) · [原片及D素材清单](evidence-076-080-production-20261118/fixtures/manifest.json)

| 用例 | 结果 | 业务核验 |
|---|---|---|
| ERYE199-076 | Passed | 无参考生成红杯视频，5秒/1280×720；本轮独立工程的视频与原生音频对应生成结果，预览播放、重入及刷新通过，无旧F20/字幕/译配混入。 |
| ERYE199-077 | Passed | 无参考生成白底蓝杯图片1024×1024；打开本次图片画布及版本，重入/刷新保持；未混入视频时间轴，原图下载有效。 |
| ERYE199-078 | Failed | 同一会话三轮均重新附加原F20，源视频身份及原音/译声对应；历史三个独立工程内容未被覆盖。但S1出现2条字幕/视频/原声共4轨，T2出现2条字幕/视频/原声/配音/BGM共6轨，均多出前轮英文字幕。整例Failed。 |
| ERYE199-079 | Passed | T1五类原生内容加独立D，登记不自动放入；D唯一实例6～18秒、源0～12秒且无视频关联，四种声音分别播放并恢复，原生内容/绑定/位置/启用及刷新重入保持。D页面也标“背景音乐”，按源及无视频关联识别；译文双语预览已知FWXC-693单列，未宣称已修复。 |
| ERYE199-080 | Passed | T2原生五类内容加独立D形成六类组合；D唯一实例位于6～18秒、源0～12秒且无视频关联；四种声音分别播放，双语和原生五类绑定/位置/启用保持，保存重入/刷新通过。D页面名称同为“背景音乐”，按源文件和范围区分。 |

## 078逐轮原文与失败证据

三轮会话 `64d9764b-cada-4af0-a633-20392af3ecbd`。每轮附件F20的受理哈希一致，时间轴视频源仍为原F20；不是拿前轮成片继续处理。三个工程ID不同，历史重开后的内容与各轮基线相同。

| 轮次 | 完整提示词 | 实际/预期可见轨数 | 原图与身份 |
|---|---|---|---|
| 078-S0 | 为这条视频添加原文字幕。 | 3 / 3 | [10秒预览](evidence-076-080-production-20261118/078-S0/preview-10.png) · [历史重开](evidence-076-080-production-20261118/078-S0/historical-verified.png) · [源映射](evidence-076-080-production-20261118/078-S0/source-mapping.json) |
| 078-S1 | 为这条视频添加简体中文字幕。 | 4 / 3 | [10秒预览](evidence-076-080-production-20261118/078-S1/preview-10.png) · [历史重开](evidence-076-080-production-20261118/078-S1/historical-verified.png) · [源映射](evidence-076-080-production-20261118/078-S1/source-mapping.json) |
| 078-T2 | 将这条视频翻译成简体中文配音，并显示中英双语字幕。 | 6 / 5 | [10秒预览](evidence-076-080-production-20261118/078-T2/preview-10.png) · [历史重开](evidence-076-080-production-20261118/078-T2/historical-verified.png) · [源映射](evidence-076-080-production-20261118/078-T2/source-mapping.json) |

![S1多出英文字幕轨](evidence-076-080-production-20261118/078-S1/failure-all-tracks.png)
![T2六轨](evidence-076-080-production-20261118/078-T2/failure-all-tracks.png)

[详细缺陷与可复现步骤](../../../defects/ERYE199-078-extra-source-subtitle-tracks-production-20261118.md)。后续已同步[FWXC-694](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c6fcf26c6c51304682eec70a9b)，4张原始截图上传并嵌入，6附件回读通过。

## 076/077生成入口

076无参考输入，页面5秒/16:9/720P原文生成红杯；实际下载5.000秒1280×720、有原生音频；编辑器打开本轮结果并可播放、重入、刷新。077无参考输入，1K/1:1原文生成白底蓝杯，独立图片编辑器1024×1024画布及历史版本保持，不要求视频六轨。两者都经过下载、完整解码和实际画面查看。

[076预览](evidence-076-080-production-20261118/076/preview-0.5.png) · [076实际文件核验](evidence-076-080-production-20261118/076/product-verification.json) · [077图片编辑器](evidence-076-080-production-20261118/077/ui-verified.png) · [077文件核验](evidence-076-080-production-20261118/077/product-verification.json)

## 079/080独立音频及六类内容

D为12秒、48kHz单声道PCM，Microsoft Huihui合成测试语音，以“独立音频D”开头，本地独立ASR确认可辨。通过原生媒体导入登记后，原时间轴保持；在时间轴空白区域拖入独立新轨，主体微调至6秒，源0～12秒。位置核验允许一帧舍入，实际最终起止逐例列于下方。原生五类内容保持，没有以D替换译声或原生BGM。

### 079
提示词：将这条视频翻译成简体中文配音，并显示简体中文字幕。
原生五轨任务完成后手工导入D，不追加Agent请求。D实际6.000～18.000秒，源0～12秒，视频关联为空；原生内容保持=True。分别隔离播放D、原声、译声、BGM后，全部启用/静音恢复到原状态，重入与刷新通过。
[登记不放入](evidence-076-080-production-20261118/079/D-registered-no-placement.png) · [最终六轨](evidence-076-080-production-20261118/079/six-tracks-verified.png) · [声音角色和源范围](evidence-076-080-production-20261118/079/D-verification.json)

### 080
提示词：将这条视频翻译成简体中文配音，并显示中英双语字幕。
原生五轨任务完成后手工导入D，不追加Agent请求。D实际6.000～18.000秒，源0～12秒，视频关联为空；原生内容保持=True。分别隔离播放D、原声、译声、BGM后，全部启用/静音恢复到原状态，重入与刷新通过。
[登记不放入](evidence-076-080-production-20261118/080/D-registered-no-placement.png) · [最终六轨](evidence-076-080-production-20261118/080/six-tracks-verified.png) · [声音角色和源范围](evidence-076-080-production-20261118/080/D-verification.json)

D界面也标“背景音乐”，以原片源、12秒独立语音、无视频关联和独立控制区分；没有因显示名称相同把D误计作原生BGM。079“译文”预览仍出现英文，属于已经确认的FWXC-693；本例独立音频流程Passed不表示该问题修复。080两处中英字幕及原生五类内容在D导入后保持。

本批声音依据源文件/实际译配成片的独立解码与ASR，以及原生预览隔离播放和保存状态核验；不冒充人工逐句听审。079/080下载文件是原任务的译配基线成片，不是加入D后的混音导出；本用例没有要求新导出。

## 观察和脚本边界

原生轨数以页面可见轨道和角色验收，不把内部未显示的源字幕资料算作页面额外轨道。生成工程允许通用名称，以本轮结果绑定及实际画面核对；缩略图占位文本、图片画布加载占位及同会话详情恢复时序均已在原任务上修正观察，不作为产品失败。D微调避开音量线拖拽，最终原片与非目标内容保持。所有原始调试截图留reports，正式证据不把观察脚本失败当产品失败。

5条唯一自动化实现 `tools/editor/erye199/workflow-combinations.mjs`，分阶段入口 `tools/editor/erye199/run-workflow-combinations.mjs`；078必须分S0/S1/T2串行，按原run定位历史结果。不以旧run日志回放当新执行。原始run/messages和完整MP4只留本机reports；正式证据为原生截图及脱敏业务结果。

仓库验证：`npm run cases:check` 检查618条、0问题；两组工作流脚本安全测试共10项通过，两个执行模块语法检查通过。115个证据文件、报告26处本地链接均存在，其他137条完整结果与归档前一致，071/FWXC-693关联保持。
