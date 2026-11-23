# ERYE-210 原11条失败用例退役记录

<!-- ERYE210-RESTORED5-20261116 -->
当前56条有效、0退役：49 Passed / 6 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run。本轮最后5条：3 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。004/018/020分别新建原生翻译配音项目，初次积分不足仅保留历史；用户调积分后在新批次补跑，实际结果逐例记录。原51条及007/FWXC-585、015/FWXC-586、047/FWXC-579、049/FWXC-580关联保持。 [完整定义](case-restored-final-five-production-20261116.md) · [执行/截图](results-restored-final-five-production-20261116.md)。所有原11退役条目已分批按用户要求恢复，旧退役清单仅历史；原结果卡快捷定位、旧审核入口和其他延期分支不计覆盖。
<!-- /ERYE210-RESTORED5-20261116 -->


<!-- ERYE210-RESTORED8-20261116 -->
当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。 [本轮定义](case-restored-eight-production-20261116.md) · [执行/截图](results-restored-eight-production-20261116.md)。原11条退役清单及统计为历史；恢复6条保留编号和原失败/缺陷，010跨账号/设备、007旧映射和002外部素材入口仍延期。
<!-- /ERYE210-RESTORED8-20261116 -->


2026-11-13；用户明确确认“是，退役这11条失败用例，用v2替换”。

本次按集合替换处理：原失败11条从有效用例、当前状态和有效registry移出；已存在且真实通过的11条v2保持编号，不复制、不重编号。有效用例54→43，保留编号空缺。没有将旧失败记录标通过，也没有修改或关闭云效缺陷。

**当前：28 Passed / 0 Failed / 9 Blocked / 0 Not Applicable / 6 Not Run。** 当前0 Failed来自统计范围调整，原缺陷未在本次回归或判修复。

[原始定义/registry/失败结果快照](retired-failed-cases-20261113.json) · [43条当前用例](cases.md) · [当前进度](execution-status-current.md) · [v2实跑报告](results-021-035-v2-prod-20261113.md)

## 原失败用例及云效记录

| 退役编号 | 最后实际结果 | 原失败现象 | 保留的云效缺陷 |
|---|---|---|---|
| ERYE210-002 | Failed（历史） | 全新会话无该工程偏好，首次从选择媒体导入后默认选中Captions/字幕，预期Media，未通过。首次保存200/版本1，随后保存500并提示Snapshot request could not be completed和工程创建未完成。刷新前已回读确认真实工程存在；刷新恢复，不覆盖首次结果。后续Media素材卡能预览正确20秒源素材，但不等同于从外部显式素材入口进入工程，该分支未完整覆盖。 | [FWXC-482](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441) |
| ERYE210-004 | Failed（历史） | 已通过编辑器真实创建两段合法中文短旁白，audio_state为ready，文稿分别为“欢迎使用 CinLink。”及“这是导航测试。”，首段实际播放1.346757秒无媒体错误。设Media并关闭/重开后仍为Media；选择已生成配音片段或点击配音WAV结果只保留Media/打开素材预览，未找到可从结果明确定位Voiceover的编辑入口。手动进入Voiceover能看到正确文稿，但不代替本例结果入口验收。导航前后工程版本4及全部保存内容保持，未重新生成。 | [FWXC-483](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc663b74e4bf60d0019f5c04e3) |
| ERYE210-005 | Failed（历史） | 首次从去口水词入口分析后，自动进入正确工程Scripts/文稿，显示原片英语文稿及2个停顿候选，首进子项通过。返回Media后点击当前真实“审阅剪辑”入口，等待30秒仍停Media，不能回到文稿审核页，本例按入口返回问题记Failed。手动切文稿可见正确内容。未点击移除/确认应用；视频及原声均为同一源文件0～20秒，实际预览播放1.099745秒且总长20秒，无媒体错误。导航前后工程版本2及全部保存内容保持，marked/deleted均0。 | [FWXC-484](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f97b390bf7704588fed0bfa706) |
| ERYE210-007 | Failed（历史） | Failed；同一工程已选Watermark/Image，收起重开后实际水印，图片子页选中值false；刷新重开后实际字幕。等待页面就绪及恢复断言超时后仍未恢复Watermark/Image；全部保存内容及版本1→1保持。旧voice迁移及清除偏好分支无真实样本，未覆盖。 | [FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b) |
| ERYE210-010 | Failed（历史） | Failed；U1/D1中PA=Captions、PB=Media，页内双工程分别恢复正确；刷新打开同一PB后实际字幕，等待恢复后仍未回Media。PA/PB全部保存内容和版本均1→1保持。U2/D2无环境，跨账号/设备分支未覆盖。 | [FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2) |
| ERYE210-013 | Failed（历史） | 仅1.346757秒真实WAV音频、无画面工程仍可填写AUDIO_ONLY_013并实际保存文字水印，版本1→2，无无画面限制说明；图片上传入口也可用，但未上传图片，不宣称图片写入通过。 | [FWXC-492](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a) |
| ERYE210-015 | Failed（历史） | 文稿页实际时间线分割控件在未选片段时正确禁用，但仅提示“分割所选片段”，未说明请先选择片段。选视频后可在12秒正确分割为0～12/12～20秒，撤销恢复完整原内容。失败仅为缺少选区引导，未验证逐字稿选区清理。 | [FWXC-493](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154) |
| ERYE210-018 | Failed（历史） | Failed：只提交一次真实PA配音任务，在尚无ready音频时独立保存文字水印INDEPENDENT_018，五入口仍可浏览；原任务最终提示“当前任务没有可应用结果”，等待后仍0句配音。水印保留、版本3。失败原因未确认，不推断内部锁或必然由水印修改导致；受限对象编辑分支未覆盖。 | [FWXC-506](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df279e880064725c26669adc36) |
| ERYE210-020 | Failed（历史） | Failed：全新工程建立自身配音稿并刷新后，将第1句“欢迎使用 CinLink。”改为“新稿未提交”，切字幕再回配音、收起重开均保留；点击一次撤销并等待20秒仍为新稿，随后只读刷新重开也未恢复原文。第2句和两段旧音频保持，无配音任务提交。 | [FWXC-507](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4861ae7970e41e1293c07e3612) |
| ERYE210-040 | Failed（历史） | 仅删除14～15.393197秒独立A1，原视频和原声被一同裁去该范围，20秒缩为18.606803秒（页面18.61）；字幕未改。一次撤销恢复完整轨道。与FWXC-513同现象，已同步FWXC-516。 | [FWXC-516](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f319c777b70fbfb7010c5a15ad) |
| ERYE210-041 | Failed（历史） | 已实际切换Media的聊天/工程两页，轨道和任务未变；两页未找到用例要求的素材搜索入口，当前搜索框数量0，记Failed。不同授权素材组的搜索/清空及候选完整分支未执行。 | [FWXC-518](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=775dbf83cad7c40e3d8432d74e) |

## 保留的11条v2

`ERYE210-021`、`ERYE210-025`、`ERYE210-026`、`ERYE210-027`、`ERYE210-029`、`ERYE210-030`、`ERYE210-031`、`ERYE210-032`、`ERYE210-033`、`ERYE210-034`、`ERYE210-035`。

全部沿用2026-11-13生产Chrome真实执行的Passed结果及30张截图、核验JSON；没有用这些结果宣称旧失败场景也通过。集合替换不建立旧失败场景与新v2的一对一等价关系；旧需求覆盖点和缺陷仍可从历史中追溯。

## 自动化及历史

默认发现38条有效脚本入口（32 AUTO、6 BLOCKED门禁），另5条PLAN。退役控制位于`tools/editor/erye210-retired.ts`；原测试实现代码保留，注册测试前排除。显式grep退役编号也不注册测试，不创建浏览器、工程或任务。

原执行报告、截图目录、哈希清单、缺陷正文及同步回执保持；完整原用例表格行和registry条目见JSON快照。此次没有重新执行产品、云效写入或代码推送。


## 校验结果

统一用例校验530条、0问题，类型检查通过。默认发现38个有效脚本，显式仅选退役编号发现0个，不执行fixtures。43个当前编号、registry及状态一致，11条v2真实Passed及11条原失败/缺陷链接均保留；原证据哈希、报告链接及相关差异空白检查通过。本次未运行生产测试。
