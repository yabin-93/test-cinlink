<!-- ERYE199-071-YUNXIAO-20261118 -->
ERYE199-071已同步[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)：译文模式编辑器仍显示双语，与中文成片不一致。3张页面原图及2张实际文件抽帧已上传并嵌入，另附原片、成片及精简证据，共8附件回读通过。状态🤔AI提缺陷，牛诗晴，生产环境，中/3-一般。用例保持Failed；当前142条38P/8F/2B/21NA/73NR不变。本次仅同步既有失败，未重跑。
<!-- /ERYE199-071-YUNXIAO-20261118 -->

# 翻译配音选择“译文”后编辑器仍显示双语，与生成成片不一致

关联用例：ERYE199-071；环境：生产 `app.cinlink.ai`，2026-11-18，Ego Lite 0.6.3.14。本地确认失败，已同步云效[FWXC-693](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ff5598f33938a383abd2f7590c)。

前置：新会话，上传本批20秒英语原片 `F20-English-source-with-BGM.mp4`（1280×720/30fps，原画面无字幕，带源时钟和低音量背景乐）。测试项目为 `ERYE199-069-075-生产-20261118`；确认测试积分充足。

1. 点击“翻译配音”卡片，选择“配音和字幕”、目标语言“简体中文”、字幕显示模式“译文”。
2. 仅附加上述原片，一次发送完整提示词：**将这条视频翻译成简体中文配音，并显示简体中文字幕。**
3. 等待完成，从本轮结果进入编辑器。
4. 定位约2秒、10秒处查看预览；返回会话再次进入、刷新后复查。
5. 下载同一结果的MP4，对照相同时刻。

预期：译文模式在编辑器中只显示中文字幕，与该模式生成的成片一致。保留译文字幕、视频、原声、配音和背景音乐五类可编辑轨。

实际：五类轨道成立，中文译声及20秒成片存在；但编辑器约2秒处同时显示“试图通过正式提交”和英文 `efforts to sabotage our healthcare by filing a formal`，10秒处也显示中英两行。重入和刷新后保持。下载MP4对应帧只有中文；源片没有烧录英文。这是编辑器显示模式与成片不一致，未发现素材被换成另一原片。

证据：

- [提交前参数：译文](../cases/requirements/ERYE-199/evidence-069-075-production-20261118/071/before-submit.png)
- [编辑器2秒双语原图](../cases/requirements/ERYE-199/evidence-069-075-production-20261118/071/preview-2.png)
- [编辑器10秒双语原图](../cases/requirements/ERYE-199/evidence-069-075-production-20261118/071/preview-10.png)
- [同一成片2秒抽帧，仅中文（辅助证据）](../cases/requirements/ERYE-199/evidence-069-075-production-20261118/071/product-frame-2.png)
- [源片2秒抽帧，无烧录字幕（辅助证据）](../cases/requirements/ERYE-199/evidence-069-075-production-20261118/source-support/F20-source-2.png)

[本轮会话](https://app.cinlink.ai/c/c932beb9-ad5e-4548-a21c-270fff012bcd)，run `run_v2_3f61e36d877a4447b54acdf966f7542c`。原始结果及MP4在本机 `reports/erye199-069-075-production-20261118/071/attempt-2/`。初次积分不足只是已解决的历史前置，不属于本缺陷；没有重复提交其旧任务。
