# 本地素材查找最新执行状态

**最新状态（2026-11-10）：当前28条设计均已执行，15 Failed、13 Passed（各例限定UI/客户端/内容验证范围）、0 Not Run。** 名称查找5条P0（LF18/20/21/22/28），非名称扩展6条（LF30～35，3 P0/3 P1）。总计P0 25/P1 3，AUTO3、PLAN25；7个退役编号不计当前集合、不复用。

用例步骤保留在[原正文](local-footage-p0-cases.md)，本页只维护最新状态及报告索引；旧报告为历史，不将旧累计数字当当前状态。

| 用例 | 最新结果 | 环境 | 自动化 | 实际结论及验证范围 | 报告 |
|---|---|---|---|---|---|
| LF-01 | Failed | production | AUTO | 机器人混入留声机/飞机 | [最新报告](local-footage-results-prod-20261110.md) |
| LF-02 | Failed | production | AUTO | 两秒兔子片段缺仙人掌/男孩 | [最新报告](local-footage-results-prod-20261110.md) |
| LF-03 | Failed | production | AUTO | 两秒兔子片段缺蓝衣男孩/仙人掌 | [最新报告](local-footage-results-prod-20261110.md) |
| LF-04 | Failed | staging | PLAN | 女孩与乌龟目标漏检；云效[FWXC-389](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ef24914cd54923896d77ba80c2) | [最新报告](local-footage-results-staging-04-07-20261110.md) |
| LF-05 | Failed | staging | PLAN | 机器人混入留声机/飞机；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073) | [最新报告](local-footage-results-staging-04-07-20261110.md) |
| LF-06 | Failed | staging | PLAN | 飞机/卫星两轮混入无关候选；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073) | [最新报告](local-footage-results-staging-04-07-20261110.md) |
| LF-07 | Failed | staging | PLAN | 火车混入长颈鹿；云效[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073) | [最新报告](local-footage-results-staging-04-07-20261110.md) |
| LF-08 | Failed | staging | PLAN | 58秒，漏F2/误入F4；本轮F4哈希确认；云效[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8) | [最新报告](local-footage-results-optimized-staging-20261110.md) |
| LF-09 | Passed | staging | PLAN | 47秒明确无匹配、0新增候选（UI） | [最新报告](local-footage-results-staging-08-10-20261110.md) |
| LF-10 | Passed | staging | PLAN | 空值/空格禁用发送；网络未抓取（UI） | [最新报告](local-footage-results-staging-08-10-20261110.md) |
| LF-11 | Passed | staging | PLAN | Q命中机器人，P123明确无匹配（UI隔离） | [最新报告](local-footage-results-staging-11-20261110.md) |
| LF-12 | Failed | staging | PLAN | 39秒，火车正确但混入长颈鹿；A历史保留；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073) | [最新报告](local-footage-results-optimized-staging-20261110.md) |
| LF-13 | Passed | staging | PLAN | 44/35秒，机器人→瀑布切换及历史保留通过（UI范围） | [最新报告](local-footage-results-optimized-staging-20261110.md) |
| LF-14 | Failed | staging | PLAN | 火车可预览但混入长颈鹿；后续引用未完成确认；关联[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073) | [最新报告](local-footage-results-staging-14-20261110.md) |
| LF-15 | Passed | staging | PLAN | 刷新后历史/候选保留，机器人可播放；网络及手动暂存未覆盖 | [最新报告](local-footage-results-staging-15-20261110.md) |
| LF-16 | Passed | staging | PLAN | 客户端提交被阻断后明确失败，解除后重试200/43秒完成、机器人可播放；规则已清理 | [最新报告](local-footage-results-staging-16-20261110.md) |
| LF-17 | Failed | staging | PLAN | 人工确认目标原句存在，单F2分析1/1，98秒明确无匹配；能力范围待确认；云效[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b) | [最新报告](local-footage-results-staging-17-20261110.md) |
| LF-18 | Passed | staging | PLAN | 两组各36秒，F5/F6名称及播放画面正确，下载哈希均与原片一致。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-20 | Passed | staging | PLAN | 正式空会话部分名称7MB一次命中F5，播放为女士及旗帜，无须澄清，无生成。另一次有历史上下文的28秒探测不计正式结论。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-21 | Passed | staging | PLAN | 两原片分别返回，各自播放为女士及男子，未漏项、误合并或混入其他素材。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-22 | Failed | staging | PLAN | 终态已完成，但仅回复将核对、若不存在将告知，未给出文件不存在/未找到的实际结论；无新增候选，前轮F5保留。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-28 | Failed | staging | PLAN | 36/43/36秒三轮完成，F5到F6切换及历史保留正常，但中间不存在名称仅回复将核对，未给无匹配结论；复用LF18及LF22证据。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-30 | Passed | staging | PLAN | 不使用文件名，唯一候选7MB.mp4，实际播放为黑外套蓝上衣女士及旗帜，未混入男子。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-31 | Passed | staging | PLAN | 不使用文件名，唯一候选9s.mp4，播放确认为黑框眼镜男子、木桌与电脑，无女士混入。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-32 | Passed | staging | PLAN | 已由用户完整预览确认目标不存在；终态显示素材搜索未找到匹配片段，0候选，无生成。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-33 | Failed | staging | PLAN | 明确要求女士及男子同一画面，却返回7MB.mp4与9s.mp4两个独立候选；逐一播放只有各自人物，未说明不满足同框条件。根因未确认。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-34 | Passed | staging | PLAN | 复用LF31前轮F6，排除男子后唯一返回F5，实际播放女士正确，男子历史仍保留；之后项目分析仍2/2，无删除或生成任务。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |
| LF-35 | Failed | staging | PLAN | 首轮仅列F5；补充选择男子后，本轮新返回F6及不符合条件的F5，均实际播放核验，回复仍称暂不能选、将重新检索，未收敛到明确男子选择。不是仅因旧历史保留而失败。 | [本批报告](local-footage-results-staging-18-35-20261110.md) |

LF08此前按口径校正为Passed，本轮真实重跑漏F2/误入F4，最新改Failed；LF12采用优化版最新39秒结果，R1 API错误和R2记录保留；LF13采用本次44/35秒实际重跑的Passed。LF14引用未完成、LF15网络层未覆盖均明确保留，不冒充全技术通过。本次仅同步本地文档；已提交FWXC389/390/395/398不因文档同步自动修改状态。

2026-11-10 LF08已同步云效：[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)（漏F2/误入F4）。3图+1JSON及正文图片引用回读通过，最新状态仍Failed；本次无CinLink重跑。

2026-11-10 LF17已同步云效：[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)，3图+试听WAV+JSON共5附件及正文3个图片引用回读验证通过；保持Failed、语音检索能力范围待确认，无新查询。

名称检索已精简为5条P0：完整名称、部分名称、双文件、不存在、连续切换。原LF19合并LF18，LF23～27及LF29移出核心、均未执行，编号不复用。非名称LF30～35保持。

素材同步：新增[F5 / 7MB.mp4、F6 / 9s.mp4登记及用例关联](local-footage-p0-cases.md#lf-real-media)已核对。两片已在本轮G56上传、分析2/2并完成关联新增11条，7 Passed/4 Failed。LF01～03最新环境为生产，LF04～17为预发，不能作为单一环境批次统计通过率。

2026-11-10 [LF18～35本批报告](local-footage-results-staging-18-35-20261110.md)：11条活动用例7 Passed/4 Failed，当前全部28条已执行。新增失败未同步云效；旧缺陷链接保持原记录。
