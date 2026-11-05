# CINLINK-SUBTITLE-FR-001 · [FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735)

已于2026-11-04同步云效，正文、字段及4份附件回读通过。优先级中，严重程度3-一般。原始证据与测试结果见[执行记录](../design-cases/multi-workflow/sso005-008-five-round-results-20261104.md)。

**现象**

要求生成法文单语字幕，实际译文第7条混入亚美尼亚文`ոստիկան`，并烧录到成片；任务仍显示Completed。

**前置步骤**

1. 专用测试账号yabinc18登录预发 https://staging-app.cinlink.ai ，新建非项目会话。
2. 仅上传`7MB.mp4`（英文语音，60.496秒，1280×720，含音轨），发送下方登记指令。
3. 在同一会话依次完成中文、日文、韩文三轮字幕烧录，再执行法文。各轮均不@、不重新上传，明确处理原片，等待上轮结束后再发下一轮。

**提示词**

登记：保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。

前置第1～3轮：

1. 根据源视频中的英文语音生成简体中文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带简体中文字幕的MP4，不更改配音、不增加水印或画面增强。
2. 根据源视频中的英文语音生成日文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带日文字幕的MP4，不更改配音、不增加水印或画面增强。
3. 根据源视频中的英文语音生成韩文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带韩文字幕的MP4，不更改配音、不增加水印或画面增强。

触发第4轮：

```text
根据源视频中的英文语音生成法文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带法文字幕的MP4，不更改配音、不增加水印或画面增强。
```

**复现步骤**

1. 发送第4轮指令，等待任务结束。
2. 下载本轮MP4及实际生成的法文SRT，查看第7条（27.540～32.240秒）及成片约30.244秒画面。

**实际结果**

- 2026-11-04 18:31:33～18:33:30（北京时间），Web预发，Chrome有头；前端构建`index-Ddv9Zeor.js`。
- 会话ID：`96b4a3ae-1d2f-4224-ba15-3ffae6a26b68`；run_id：`run_v2_d647e150cce84aad84a7b32b62a5961e`；状态`done`。
- 参数`source_language=en`、`target_language=fr`、`subtitle_mode=single`。原片ID：`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`。
- 译文文件ID：`file_cloud_zcpa3662marmcr3pryvsvey5oe`；`translate_subtitle`调用ID：`call_b79451f941b94d11991a1411bb74c902`。
- SRT第7条：`Qu'il s'agisse de permettre à un parent d'emmener son bébé souffrant d'une otite chez le pédiatre ոստիկան,`。成片对应位置同样包含该亚美尼亚词。
- MP4：`7MB_fr.mp4`，文件ID`file_cloud_rvd3un6gruiu5mujxu4sugtf5n`，60.488秒、1280×720，可下载播放。

**预期结果**

交付符合原意的法文单语字幕及烧录MP4，不混入无关语种文字；保留原英语音轨、时长和分辨率。

**影响**

成片字幕语言不符合明确指令，交付质量不合格，SSO-005第4轮验收未通过。

**补充**

缺陷键`CINLINK-SUBTITLE-FR-001`。实际SRT与成片均已确认异常；译文事实标注`engine=openai-fallback`，仅作排查线索。其他中/日/韩/西字幕及另一份法文配音字幕抽查未见此混字，发生概率和根因待确认。实际SRT及脱敏定位信息见附件。

**失败截图**

实际交付视频30.244秒原始解码帧：法文句末混入亚美尼亚文。

![SSO-005-R4-french-mixed-language.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0e3235a81ef3ccce6bd2370f30)

本轮原始页面：完整法文单语字幕指令，任务显示Completed并交付MP4。

![SSO-005-R4-completed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ad662c11662636c0901c067444)
