# ICP 电商原文用例缺陷同步（2026-11-17）

仅同步2026-11-16原文批次的既有实测，未重新执行产品。按同一可观察问题合并，共新建7条；不查询历史重复、不修改旧缺陷。15张真实失败PNG已上传、嵌入正文并回读，45份附件核验通过。

状态均为🤔AI提缺陷，负责人牛诗晴，生产环境，迭代重构10-29；缺CTA为中/3-一般，其余高/2-严重。

| 用例/轮次 | 云效 | 问题 | 截图/附件 |
|---|---|---|---|
| ICP-EC-02 / [1] | [FWXC-625](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c87a29cd1d5996c0fa46eb4adf) | 【生产环境】【电商Case02】10款女装批量制作在规划阶段1200秒超时，未交付图片或视频 | 1 / 5 |
| ICP-EC-02 / [5] | [FWXC-626](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ddeb25492d57ba95d8e4dc2d2d) | 【生产环境】【电商Case02】SKU10上身图生成报model_reference_file_id参数校验错误，图片及视频未交付 | 1 / 6 |
| ICP-EC-03 / [1, 2] | [FWXC-627](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=734bcbf473a246b0fe65b85187) | 【生产环境】【电商Case03】横版转竖版裁掉产品及原字幕，Reels局部修复后仍有主体缺失 | 3 / 7 |
| ICP-EC-03 / [1] | [FWXC-628](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=25f4dfa4e583d270cbf389c7c9) | 【生产环境】【电商Case03】TikTok成片结尾只有品牌标识，未添加要求的Shop Now CTA | 1 / 5 |
| ICP-EC-03 / [4, 5] | [FWXC-629](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8014ebc4b36863fc090d9a5ad8) | 【生产环境】【电商Case03】连续修改TikTok时工程或素材引用冲突，15秒改版和安全区修正版未交付 | 3 / 7 |
| ICP-EC-04 / [1, 3, 5] | [FWXC-630](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4c5033724b50514e1eee69c3c) | 【生产环境】【电商Case04】西语广告残留英文卖点和CTA，后续文字修改仅返回分析未生成修正版 | 5 / 10 |
| ICP-EC-05 / [1] | [FWXC-631](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fc2731f00849917dfea1868f89) | 【生产环境】【电商Case05】根据吸尘器图片制作20秒广告时供应商视频处理失败，未交付成片 | 1 / 5 |

未提为缺陷：

- Case01缺A及其依赖修改存在源素材/首稿缺口，不能全归因产品缺陷。
- Case02/05第2～4轮6条缺前置未提交。
- 4轮假设错误未触发，未计缺陷。
- Case05独立末轮已通过，首次补槽网络失败已恢复，不另报稳定缺陷。

测试进度保持：5个整例Failed；19轮已执行，2 Passed / 12 Failed / 1 Blocked / 4 Not Applicable；6轮缺首稿前置未提交。本次7条缺陷覆盖其中10条Failed轮次的明确问题；Case01另外2条Failed保留业务未达标和素材/前置限制，不能视为已提产品缺陷。

[逐轮进度和原图](execution-status-current.md) · [脱敏回执](defect-sync-production-20261117.json)。完整缺陷正文及截图引用：

- [FWXC-625](../../../defects/icp-ec02-batch-planning-timeout-prod-20261117.md)
- [FWXC-626](../../../defects/icp-ec02-sku10-model-reference-invalid-prod-20261117.md)
- [FWXC-627](../../../defects/icp-ec03-vertical-crop-subtitle-layout-prod-20261117.md)
- [FWXC-628](../../../defects/icp-ec03-tiktok-missing-cta-prod-20261117.md)
- [FWXC-629](../../../defects/icp-ec03-tiktok-revision-reference-conflict-prod-20261117.md)
- [FWXC-630](../../../defects/icp-ec04-spanish-onscreen-text-not-replaced-prod-20261117.md)
- [FWXC-631](../../../defects/icp-ec05-amazon-ad-provider-failed-prod-20261117.md)

输入资料、原文指令、回归前置及补槽回答已随各缺陷附上。大型原始素材可从关联历史会话附件按清单哈希取回；回归须新建测试项目，不能直接在历史工程点击重试。Case04的35秒输入原片、SKU10的2秒正面视频已另附对应缺陷。

保留各同步key的检查点；本批已完成，后续只读核对，不重新创建。未提交或推送Git。
