# ERYE210-011：用户新建翻译配音工程复验

2026-11-13，Windows、生产环境有头Google Chrome。**整例Blocked：后台工程隔离Passed、真实目标语言结果Passed；结果卡直达配音编辑定位分支未覆盖。** 当前有效43条仍为28 Passed / 0 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。

[011完整定义](case-011-v2-translation-dubbing-20261113.md) · [当前进度](execution-status-current.md) · [脱敏分支证据](evidence-011-user-project-prod-20261113/execution-evidence.json) · [原始截图哈希清单](evidence-011-user-project-prod-20261113/manifest.json)。

## 场景和操作

1. 打开用户指定[新建项目](https://app.cinlink.ai/?project_id=ad25bc25-b1c6-4105-84b8-1b845b4a4eb5)，进入其“翻译配音：翻译这条视频，让表达自然流畅”[会话](https://app.cinlink.ai/c/af0d5043-d30d-4a91-ba15-dea074199400)。使用用户已受理原任务，原片7MB.mp4约60.50秒、1280×720，目标简体中文、配音＋双语字幕。本轮没有重发或改成此前20秒素材。
2. 任务仍running时打开PA，准备同会话独立PB并切Media；完成后核对PB页面和完整内容。
3. 检查真实结果卡操作，再通过工程选择器明确打开PA，重开保存结果并进入Voiceover。仓库脚本沿原任务/工程检查点续验，再次核对PB及中文结果，没有新增AI提交替代用户任务。

## 分支结果

| 验证项 | 结果 | 实际证据 |
|---|---|---|
| 后台完成与PB隔离 | Passed | 原翻译配音5步骤完成，总耗时177681ms（页面约178秒）；PA版本1→2。PB建立时任务仍运行，完成后保持Media，完整内容不变、版本1→1。用户场景只记录建立及完成后的检查点，不声称全程连续轮询。 |
| 真实中文结果 | Passed（本例范围） | 重开PA可见17条中文配音文案，例如“通过正式提出”“这是关乎个人切身利益的问题。”；有zh-Hans译文字幕、英语字幕和8段生成音频，绑定用户原片。未依据某个内部配音数组为空判失败。 |
| 本次MP4 | 抽样可用 | 真实播放时间推进，无媒体错误；下载原MP4实查1280×720、60.44秒、H264视频及AAC双声道44100Hz音频。仅播放和结构抽样，不代替整片翻译准确率、逐句听辨、字幕排版及音画同步专项。 |
| 结果卡直达配音编辑 | Blocked／未覆盖 | 真实结果卡只有下载、播放、放大查看，无明确配音编辑入口；手动选择PA并重开后内容可见，此操作未记作“点击结果卡自动定位”通过。 |

初次选择PA时曾看到运行前空面板；重开保存结果后显示真实文稿和字幕。不以中途空态截图判产物丢失，也未对该短暂空态完成独立缺陷定性。

## 位置与截图

PA：bf48d731-93a2-4b50-8cb9-f5d46c4a2609（7MB.mp4）；PB：27f00126-9508-47d5-975d-1a8f8c8b1f2b。原任务run_v2_4f9b4423fb4346f3bd9048d22794268e；MP4 file_cloud_qfnmbe7hfrzczdal67hkv6twgz。

![原任务运行时PB已建立](evidence-011-user-project-prod-20261113/011-PB-established.png)

![完成后PB保持Media](evidence-011-user-project-prod-20261113/011-PB-after-completed.png)

![本次真实结果卡](evidence-011-user-project-prod-20261113/011-real-result-cards.png)

![PA真实中文配音文稿及时间线](evidence-011-user-project-prod-20261113/011-target-language-result-project.png)

![结果播放抽样及PA配音面板](evidence-011-user-project-prod-20261113/011-user-result-playback-and-Voiceover.png)

用户提供工程前，另一个20秒独立准备场景也完成英语→中文翻译配音，PB隔离60次观察无异常；只作补充，不替代用户指定项目。本轮未提交云效或更改既有缺陷。

## 自动化与归档

命令npm run test:editor:210 -- --grep 'ERYE210-011 '；批次prod-011-user-project-20261113-02，有头、单worker、零重试。Playwright输出1 skipped，对应业务Blocked，原因是结果入口分支未覆盖；实际后台隔离及中文内容断言已执行，并非全部未跑。

本机检查点/原始媒体在reports/editor-210/prod-011-user-project-20261113-01/011/及reports/editor-210/prod-011-user-project-20261113-02/011/；原始媒体与含签名链接工程仅留本机。脱敏JSON、原始PNG已另存本需求证据目录，未修改截图画面。
