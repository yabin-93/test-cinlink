# ERYE210 最后五条恢复：生产Chrome执行（2026-11-16）

<!-- ERYE210-018020-YUNXIAO-20261116 -->
ERYE210-018 → [FWXC-588](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6b9e807ea6785e241aae941423)；ERYE210-020 → [FWXC-589](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0dd1f5d0d3ba1d48a798f75a03)。6张本轮原图已上传并嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。018高/2-严重，020中/3-一般。两例仍Failed，当前56条49P/6F/1B；旧FWXC-506/507及其他54条结果保持。本次仅同步既有失败，未重跑产品。 [同步明细](defects-018-020-restored-production-20261116.md)。此前“未云效写入”指原执行阶段。
<!-- /ERYE210-018020-YUNXIAO-20261116 -->


当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。

[完整前置、输入及步骤](case-restored-final-five-production-20261116.md) · [当前总进度](execution-status-current.md)

生产Windows有头Google Chrome，单worker、零自动重试；本例专用项目/工程，页面操作验收，不验证内部实现协议。配音使用各自新建原生翻译配音项目，未复制普通字幕工程冒充。

| 用例 | 状态 | 实际结果 |
|---|---|---|
| ERYE210-004 | Passed | 独立新建真实英语→简体中文翻译配音项目；从Media手动进入Voiceover，选择第1/2句分别定位实际起始时间，切字幕返回稿件与声音保持；未重新生成。结果卡快捷直达仍延期。 |
| ERYE210-005 | Passed | 本例独立新工程真实分析出2个停顿候选，仅停顿/0.8秒且未移除；选择候选后切Captions→Watermark→Scripts，候选、参数和同工程审核内容保持，视频/原声/字幕仍为原结果，无自动裁剪或生成。 |
| ERYE210-018 | Failed | 真实新译制工程8句稿/声音就绪；首句生成处理中保存水印INDEPENDENT_018成功。原目标任务done并产出新WAV，但工程仍使用全部旧声音；沿同一任务重开配音页核验时出现“编辑器执行数据不符合正式v2协议”，新声未应用，水印保持。未重复生成。 |
| ERYE210-020 | Failed | 真实新译制工程8句稿/声音就绪；首句改“配音撤销验证020。”保存并切字幕返回正常。点击一次撤销后未恢复原稿，配音列表随后变为“暂无配音”；旧声音和字幕保持。重做及刷新最终新稿分支未执行，未点击创建配音或再次撤销。 |
| ERYE210-041 | Passed | 同项目两会话实际准备A/B素材，Chat/Project基线可区分；分别按完整名称搜索命中、不存在名称无候选、清空恢复各范围列表；搜索未更换工程、添加时间线素材或生成。 |

## ERYE210-004

独立新建真实英语→简体中文翻译配音项目；从Media手动进入Voiceover，选择第1/2句分别定位实际起始时间，切字幕返回稿件与声音保持；未重新生成。结果卡快捷直达仍延期。

实际执行源批次：`prod-restored-five-20261116-02`；[本轮项目/检查记录](evidence-restored-final-five-production-20261116/004/location-and-checks.json)。

![004-native-translation-configured](evidence-restored-final-five-production-20261116/004/004-native-translation-configured.png)

![004-real-translated-ready](evidence-restored-final-five-production-20261116/004/004-real-translated-ready.png)

![004-select-sentence-1](evidence-restored-final-five-production-20261116/004/004-select-sentence-1.png)

![004-select-sentence-2](evidence-restored-final-five-production-20261116/004/004-select-sentence-2.png)

![004-voice-selection-preserved](evidence-restored-final-five-production-20261116/004/004-voice-selection-preserved.png)

![ERYE210-004-passed](evidence-restored-final-five-production-20261116/004/ERYE210-004-passed.png)

## ERYE210-005

本例独立新工程真实分析出2个停顿候选，仅停顿/0.8秒且未移除；选择候选后切Captions→Watermark→Scripts，候选、参数和同工程审核内容保持，视频/原声/字幕仍为原结果，无自动裁剪或生成。

实际执行源批次：`prod-restored-five-20261116-01`；[本轮项目/检查记录](evidence-restored-final-five-production-20261116/005/location-and-checks.json)。

![005-unapplied-review-before-tabs](evidence-restored-final-five-production-20261116/005/005-unapplied-review-before-tabs.png)

![005-unapplied-review-returned](evidence-restored-final-five-production-20261116/005/005-unapplied-review-returned.png)

![ERYE210-005-passed](evidence-restored-final-five-production-20261116/005/ERYE210-005-passed.png)

## ERYE210-018

真实新译制工程8句稿/声音就绪；首句生成处理中保存水印INDEPENDENT_018成功。原目标任务done并产出新WAV，但工程仍使用全部旧声音；沿同一任务重开配音页核验时出现“编辑器执行数据不符合正式v2协议”，新声未应用，水印保持。未重复生成。

实际执行源批次：`prod-restored-five-20261116-03`；[本轮项目/检查记录](evidence-restored-final-five-production-20261116/018/location-and-checks.json)。

原首句生成任务`098712db-e7f8-475c-85fc-93ffafd16e76`已done并产出新WAV；独立水印保持，但随后只读核验仍为8个旧声音引用，新文件没有进入工程。重开原配音页核对原任务应用时出现页面原文“编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。”，没有再次点击生成。不是仅凭首次断言或后台done判断，见[原任务回读](evidence-restored-final-five-production-20261116/018/original-target-readonly-audit.json)与[原任务页面错误](evidence-restored-final-five-production-20261116/018/018-original-task-apply-page-error.json)。后续刷新水印最终结果分支未完成。

![018-original-task-apply-page-error](evidence-restored-final-five-production-20261116/018/018-original-task-apply-page-error.png)

![018-original-task-voice-page-review](evidence-restored-final-five-production-20261116/018/018-original-task-voice-page-review.png)

![018-real-translated-ready](evidence-restored-final-five-production-20261116/018/018-real-translated-ready.png)

![018-running-independent-watermark](evidence-restored-final-five-production-20261116/018/018-running-independent-watermark.png)

![ERYE210-018-failed](evidence-restored-final-five-production-20261116/018/ERYE210-018-failed.png)

## ERYE210-020

真实新译制工程8句稿/声音就绪；首句改“配音撤销验证020。”保存并切字幕返回正常。点击一次撤销后未恢复原稿，配音列表随后变为“暂无配音”；旧声音和字幕保持。重做及刷新最终新稿分支未执行，未点击创建配音或再次撤销。

实际执行源批次：`prod-restored-five-20261116-03`；[本轮项目/检查记录](evidence-restored-final-five-production-20261116/020/location-and-checks.json)。

已保存新稿并切页返回；一次撤销后先仍见新文、等待后文稿列表变“暂无配音”，没有恢复原文。没有重复撤销、点击创建配音或执行重做；旧音频/字幕只读回看保持，见[原撤销结果核验](evidence-restored-final-five-production-20261116/020/020-original-undo-readonly-audit.json)。不推断内部历史实现原因。

![020-edited-returned](evidence-restored-final-five-production-20261116/020/020-edited-returned.png)

![020-real-translated-ready](evidence-restored-final-five-production-20261116/020/020-real-translated-ready.png)

![ERYE210-020-failed](evidence-restored-final-five-production-20261116/020/ERYE210-020-failed.png)

## ERYE210-041

同项目两会话实际准备A/B素材，Chat/Project基线可区分；分别按完整名称搜索命中、不存在名称无候选、清空恢复各范围列表；搜索未更换工程、添加时间线素材或生成。

实际执行源批次：`prod-restored-five-20261116-01`；[本轮项目/检查记录](evidence-restored-final-five-production-20261116/041/location-and-checks.json)。

![041-final-library-baseline](evidence-restored-final-five-production-20261116/041/041-final-library-baseline.png)

![041-工程-no-match](evidence-restored-final-five-production-20261116/041/041-工程-no-match.png)

![041-工程-positive](evidence-restored-final-five-production-20261116/041/041-工程-positive.png)

![041-聊天-no-match](evidence-restored-final-five-production-20261116/041/041-聊天-no-match.png)

![041-聊天-positive](evidence-restored-final-five-production-20261116/041/041-聊天-positive.png)

![ERYE210-041-passed](evidence-restored-final-five-production-20261116/041/ERYE210-041-passed.png)

## 配音准备历史及验收边界

初次准备时，004原生译制任务run_v2_62f81e3a8dd542b18f65b77e2dfbc757明确返回“Insufficient credits. Required 200 points, available 100 points.”，终态failed。018/020各自已配置独立原生项目，未重复提交同类不足资源任务。该三条初次Blocked保存在precondition-history，不覆盖用户调整积分后的新批次。

用户随后调整积分，页面核对为5,100；在prod-restored-five-20261116-02为004/018/020分别新建新的真实翻译配音项目，并提交新的准备任务。004通过；018/020虽然未提供工程下载文件，但原生可编辑工程已创建。首次观察脚本只从下载文件找工程，原Blocked放入observer-history；修正后在03沿同一原生工程继续，已确认各8句文稿和声音就绪，未重新译制。目标操作后的实际失败不归为前置缺失。

任何配音前置须至少两句文稿及声音就绪。列表/声音不可用则明确记录当前前置缺口；目标开始后生成或编辑报错则Failed。不能用普通工程、手工字幕或时间线静音操作替代；018必须捕获真实处理中窗口，不重复生成抢窗口。

[初次资源不足回执（历史）](evidence-restored-final-five-production-20261116/native-translation-resource-block-history.json) · [原51条及定义快照](restored-final-five-definition-history-20261116.json) · [结构化结果](execution-status-restored-final-five-production-20261116.json) · [原图及哈希清单](evidence-restored-final-five-production-20261116/manifest.json)。本轮未新建/修改云效缺陷，未提交或推送Git。
