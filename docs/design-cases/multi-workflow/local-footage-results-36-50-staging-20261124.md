> 编号说明：本文为调整前记录，使用旧LF编号；当前范围及编号请查[新旧编号对照](local-footage-id-map-20261124.md)。

# LF-36～50预发执行（2026-11-24）

2026-11-24 LF-36～50预发执行：已记录15/15，结果{'Failed': 2, 'Blocked': 5, 'Passed': 7, 'Not Applicable': 1}，其余0条待执行。当前66条总状态{'Passed': 34, 'Failed': 3, 'Blocked': 5, 'Not Applicable': 1, 'Not Run': 23}；固定AUTO3/PLAN63保持，本轮为ego有头，0云效/Git写入。

TaskSpace41 / p1。串行、零自动重试，受理后先回读；只测试专用项目。固定脚本全部PLAN，临时操作辅助不计可重跑脚本实现。缺少前置仅阻塞依赖分支；未请求云效提交。

| 用例 | 结果 | 实际结论 |
|---|---|---|
| LF-36 | Failed | 当前G56精确包含F5/F6，按原指令返回且实际播放正确7MB.mp4，下载SHA与原片一致；回复仍称项目ID不一致、无法确认属于当前项目，独立说明验收失败。 |
| LF-37 | Blocked | 空目录选择后创建仍禁用。另通过仅含TXT的文件夹创建项目，页面显示0可分析媒体，但真实membership含1个document，未将其冒充0素材空项目。精确空项目入口前置仍未满足，正式检索未发。 |
| LF-38 | Blocked | 已用F5原片与F6仅重新封装副本建立部分就绪项目：仅分析F5，F6明确排除。女士查询交付正确F5；男子未就绪查询0新候选并提示先分析更多视频，前两分支通过。后续页面只提供已完成结果，未找到重新纳入被排除文件的分析入口；一次自然语言准备仅完成素材列表读取，未建立F6分析，补跑分支阻塞。 |
| LF-39 | Blocked | 已建只含F5的专用项目并完成男子查询无匹配对照。项目更多操作只有重命名/归档，分析结果页无增量导入；添加素材仅形成待发附件，项目membership仍仅F5，已清理附件。未取得真实同项目增量入口，新增后分支未发。 |
| LF-40 | Blocked | 已检查本轮专用项目的项目操作菜单及分析结果页，未找到移除当前项目素材入口；分析确认里的排除仅改变本次分析范围，不等同移除项目membership，因此未执行删除或移除后的检索。 |
| LF-41 | Passed | 同一项目通过两个子目录导入同名访谈.mp4，未被合并。名称+女士描述命中正确F5；仅按名时列出两个可区分候选供选择。两候选均实际播放、下载，SHA分别精确对应F6/F5。 |
| LF-42 | Blocked | 用户确认暂无U2；U1当前项目正向可独立核验，跨账号访问/下载分支缺少不同账号，目标权限请求未发，不以同账号跨项目替代。 |
| LF-43 | Passed | 保留原无音轨夹具上传失败后，改用画面逐帧相同、加静音AAC的对照副本完成分析。原指令触发上传澄清，已按要求补同一已分析源并继续原run；最终分别列出0～6秒和12～17.999903秒机器人位置，明确排除6～12秒飞机，符合两处金标。线上实际源下载SHA与该副本一致，完整解码成功。 |
| LF-44 | Passed | 本测试页短暂离线并恢复、重开同一会话后，原请求完成，唯一用户轮次/同一原run保留；12秒F4机器人候选实际播放成功，未重新发送。回读服务器消息创建时间04:17:03.149早于断流04:17:03.711。 |
| LF-45 | Passed | 复用本日LF-34真实模型429失败作为前置，确认failed后仅点击一次页面重试。原run由resuming转done，同会话原有男子历史保留，本轮返回正确女士F5并实际播放，下载SHA与7MB.mp4原片一致；没有新增用户轮次或重复生成。 |
| LF-46 | Failed | 两种原始同义表达结果不一致：A仅文字声称找到并引用外部stock地址，0当前项目可播放候选；B实际调用项目内search_materials并返回F6三个片段，均实际播放为眼镜男子/木桌/电脑，B通过，整体A未达本例素材命中目标。 |
| LF-47 | Passed | 仅通过正常发送控件尝试双击，首击后控件切换为停止，第二次发送定位被阻断，未强行点击停止或绕过控件。最终只有1条用户消息/1个原run，完成并实际播放正确12秒火车候选，无重复提交。 |
| LF-48 | Passed | 静音AAC音轨视频已真实上传并完成分析。视觉查询返回正确6秒黄色机器人候选且实际播放；下载候选音频解码全为零。随后按旁白火车查询明确无匹配、0新增候选，没有把视觉历史当语音命中或虚构台词。 |
| LF-49 | Passed | 默认音轨的机器人句定位1.100～2.660秒并实际播放；单音轨立体声左侧机器人、右侧火车分别定位1.040～2.680及6.540～8.140秒，均播放且下载PCM与对应源对齐。双音轨第二条非默认轨的火车查询无结果，未计为全音轨通过。 |
| LF-50 | Not Applicable | 纯WAV已通过真实文件夹入口导入新项目，membership确认为audio、576078字节；分析页明确0个媒体/没有找到可分析的图片或视频，开始分析禁用。按用例条件跳过分析，纯音频查找分支不适用，未发送无法建立前置的查找。返回既有LR视频项目，原火车片段仍实际播放，源membership不变。 |

## LF-36：Failed

当前G56精确包含F5/F6，按原指令返回且实际播放正确7MB.mp4，下载SHA与原片一致；回复仍称项目ID不一致、无法确认属于当前项目，独立说明验收失败。

验证边界：已确认当前项目归属误报；扩展到另一合法复用项目尚待准备，不将本例冒称FWXC-524严格原回归，不自动修改云效。

实际提示词：

> 在当前项目中查找7MB.mp4，只返回原始素材供预览。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-36-membership.json, LF-36-final-state.json, LF-36-result.png, LF-36-preview-1.png, LF-36-source-hashes.json

会话：f599d563-4ba0-4561-9a6b-90fe9525e877

## LF-37：Blocked

空目录选择后创建仍禁用。另通过仅含TXT的文件夹创建项目，页面显示0可分析媒体，但真实membership含1个document，未将其冒充0素材空项目。精确空项目入口前置仍未满足，正式检索未发。

验证边界：保留两种真实准备尝试；不降低0素材前置，也不通过接口伪造空项目，不据此报检索失败。

实际提示词：

目标请求未发或仅页面前置检查，见实际说明。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-37-empty-project-entry.png, LF-37-empty-folder-not-created.png, LF-37-empty-media-created.png, LF-37-document-only-membership.json

## LF-38：Blocked

已用F5原片与F6仅重新封装副本建立部分就绪项目：仅分析F5，F6明确排除。女士查询交付正确F5；男子未就绪查询0新候选并提示先分析更多视频，前两分支通过。后续页面只提供已完成结果，未找到重新纳入被排除文件的分析入口；一次自然语言准备仅完成素材列表读取，未建立F6分析，补跑分支阻塞。

验证边界：9s-fresh.mp4为流复制副本，逐帧MD5与F6一致但容器SHA不同，未冒称原始同哈希。项目仍含两个文件；不把分析排除当移除。未就绪反馈正常，整体不补算完整Passed。女士项目归属说明误报独立归LF-36。

实际提示词：

> 查找当前项目中旗帜前穿黑外套、蓝上衣的女士视频，只查找。

> 查找当前项目里戴眼镜、坐在木桌前且旁边有电脑的男子视频，只查找。

> 仅分析当前项目中尚未分析的9s-fresh.mp4，供本地素材查找使用；保留7MB.mp4的已有分析，不生成或剪辑视频。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-38-fresh-fixture.json, fixture-content-verification.json, LF-38-membership.json, LF-38-exclude-fresh-from-analysis.png, LF-38-F5-ready-F6-excluded.png, LF-38-woman-final-state.json, LF-38-woman-preview-1.png, LF-38-man-unready-final-state.json, LF-38-unready-man-result.png, LF-38-excluded-cannot-restart-ui.png, LF-38-index-prepare-state-conversation.json

会话：06895f2d-d4c4-4df8-9747-2bf58258df6d

## LF-39：Blocked

已建只含F5的专用项目并完成男子查询无匹配对照。项目更多操作只有重命名/归档，分析结果页无增量导入；添加素材仅形成待发附件，项目membership仍仅F5，已清理附件。未取得真实同项目增量入口，新增后分支未发。

验证边界：不把聊天附件当项目素材同步，也不通过接口强行关联来冒充UI增量；已完成前置与反向对照，缺增量入口的依赖分支阻塞。

实际提示词：

> 找出戴眼镜、坐在木桌前讲话，右侧有笔记本电脑的男子视频。

证据（本机reports/local-footage-36-50-staging-20261124/）：ONLY5-uploaded.png, ONLY5-analysis-ready.png, LF-39-before-final-state.json, LF-39-before-result.png, LF-39-existing-project-analysis-ui.png, LF-39-chat-only-attachment.png, LF-39-chat-attachment-not-membership.json

会话：9340be8d-f9b5-4f1f-bdfb-8ad0853e9c39

## LF-40：Blocked

已检查本轮专用项目的项目操作菜单及分析结果页，未找到移除当前项目素材入口；分析确认里的排除仅改变本次分析范围，不等同移除项目membership，因此未执行删除或移除后的检索。

验证边界：真实移除入口前置缺失，目标依赖步骤未发；不以排除分析或清理聊天附件冒充移除项目源，也不调用后台接口删除。

实际提示词：

目标请求未发或仅页面前置检查，见实际说明。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-39-existing-project-analysis-ui.png, LF-38-exclude-fresh-from-analysis.png, LF-38-membership.json

## LF-41：Passed

同一项目通过两个子目录导入同名访谈.mp4，未被合并。名称+女士描述命中正确F5；仅按名时列出两个可区分候选供选择。两候选均实际播放、下载，SHA分别精确对应F6/F5。

验证边界：本例通过为同名导入/内容消歧及列候选范围；两组回复仍有项目归属误报，独立归LF-36，不据此声称全部说明正确。原素材未更改，副本同名、目录路径不同。

实际提示词：

> 找出当前项目里名为访谈.mp4、画面是旗帜前女士的视频。

> 查找当前项目的访谈.mp4，先列出候选让我选择。

证据（本机reports/local-footage-36-50-staging-20261124/）：DUP-uploaded.png, DUP-analysis-ready.png, LF-41-specific-final-state.json, LF-41-specific-preview-1.png, LF-41-ambiguous-final-state.json, LF-41-ambiguous-preview-1.png, LF-41-ambiguous-preview-2.png, LF-41-ambiguous-original-hashes.json

会话：4dfc9301-54b1-450a-be23-6c191c4930bb

## LF-42：Blocked

用户确认暂无U2；U1当前项目正向可独立核验，跨账号访问/下载分支缺少不同账号，目标权限请求未发，不以同账号跨项目替代。

验证边界：仅缺U2前置；不是产品权限失败，未更换或退出当前账号。

实际提示词：

目标请求未发或仅页面前置检查，见实际说明。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-42-user-precondition.json

## LF-43：Passed

保留原无音轨夹具上传失败后，改用画面逐帧相同、加静音AAC的对照副本完成分析。原指令触发上传澄清，已按要求补同一已分析源并继续原run；最终分别列出0～6秒和12～17.999903秒机器人位置，明确排除6～12秒飞机，符合两处金标。线上实际源下载SHA与该副本一致，完整解码成功。

验证边界：通过为补槽后的位置/内容查找范围；原无音轨上传恢复仍未通过，单独保留。实际执行analyze_video而非库检索直达；回复只有文字位置、未嵌新预览卡，不声称验证自动定位控件、逐帧精度或无附件直达。未生成剪辑；源可访问性及位置内容以实际线上源核验。 对照副本同时增加静音AAC并重新封装/faststart，不能据此单独归因音轨、容器或句柄问题；原素材未改。

实际提示词：

> 找出这份视频中黄色机器人每次出现的位置，分别列出，不要把中间无关画面算进去；只查找，不剪辑。

> 补槽：请上传需要查找的视频。已选择同一项目已分析的REPEAT2/M-REPEAT.mp4继续原任务。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-43-before-authorization-resume-result.json, LF-43-after-user-authorization.png, LF-43-after-reauth-files.json, LF-43-transport-variant.json, REPEAT2-uploaded.png, REPEAT2-budget.png, REPEAT2-analysis-ready.png, LF-43-multi-position-final-state.json, LF-43-clarification-file-filled.png, LF-43-clarification-upload.json, LF-43-after-clarification-final-state.json, LF-43-after-clarification-result.png, LF-43-source-readback.json, LF-43-position-content-audit.json, LF-43-source-readback-1s.png, LF-43-source-readback-7s.png, LF-43-source-readback-13s.png

会话：454dda91-448a-4b8b-a015-4142131bc06b

## LF-44：Passed

本测试页短暂离线并恢复、重开同一会话后，原请求完成，唯一用户轮次/同一原run保留；12秒F4机器人候选实际播放成功，未重新发送。回读服务器消息创建时间04:17:03.149早于断流04:17:03.711。

验证边界：通过范围为已持久化请求的客户端断流恢复。断流前即时GET消息为空，runId由恢复后服务器记录后验补录，未声称提前捕获runId回包；无服务端故障注入、后台调用次数全量断言。Network离线已恢复并disable。

实际提示词：

> 找出画面里出现黄色机器人，旁边有黑板和桌子的片段。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-44-submit.json, LF-44-accepted-state.json, LF-44-network-control.json, LF-44-network-control-reconciled.json, LF-44-offline-after-accepted.png, LF-44-final-state.json, LF-44-A-final-conversation.json, LF-44-recovered-preview-1.png

会话：ee97783d-9639-4597-8765-57ed796d09ca

## LF-45：Passed

复用本日LF-34真实模型429失败作为前置，确认failed后仅点击一次页面重试。原run由resuming转done，同会话原有男子历史保留，本轮返回正确女士F5并实际播放，下载SHA与7MB.mp4原片一致；没有新增用户轮次或重复生成。

验证边界：通过为一次真实限流后的显式恢复分支，不证明不会再次限流或覆盖全部超时。产品复用同一runId恢复，不强求新ID。候选显示名变为另一测试项目导入的访谈.mp4，内容/哈希正确，命名变化另记观察；不自动改写LF-34历史Failed或云效状态。

实际提示词：

> 这次不要刚才那位男子的素材，只找穿黑色外套、蓝色上衣、站在旗帜前讲话的女士视频；只查找，不删除或生成。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-45-before-recovery-state.json, LF-45-existing-429.png, LF-45-recovery-click.json, LF-45-recovery-initial-state.json, LF-45-final-state.json, LF-45-recovery-result.png, LF-45-recovered-preview-1.png, LF-45-recovered-hash.json, LF-45-verified-state.json

会话：e0742011-fd56-486d-87a9-21255f132994

## LF-46：Failed

两种原始同义表达结果不一致：A仅文字声称找到并引用外部stock地址，0当前项目可播放候选；B实际调用项目内search_materials并返回F6三个片段，均实际播放为眼镜男子/木桌/电脑，B通过，整体A未达本例素材命中目标。

验证边界：A原词未显式写当前项目，存在范围表达歧义，应先确认默认检索范围口径，不自动当作已确认PRD缺陷；无证据证明实际调用网页搜索，也未验证外部引用真实。未通过改写原词重跑来覆盖首次结果。F6显示名受同名副本测试影响为访谈.mp4，内容正确。

实际提示词：

> 找出一个男人坐在桌前讲话、旁边放着笔记本电脑的视频。

> 找出戴眼镜的男性在木桌前面对镜头说话，电脑在他身旁的画面。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-46-A-final-state.json, LF-46-A-final-conversation.json, LF-46-A-result.png, LF-46-B-final-state.json, LF-46-B-final-conversation.json, LF-46-B-result.png, LF-46-B-preview-1.png, LF-46-B-preview-2.png, LF-46-B-preview-3.png, LF-46-B-verified-state.json

会话：19663836-f7d7-4879-918f-4ddb1bea3a77

## LF-47：Passed

仅通过正常发送控件尝试双击，首击后控件切换为停止，第二次发送定位被阻断，未强行点击停止或绕过控件。最终只有1条用户消息/1个原run，完成并实际播放正确12秒火车候选，无重复提交。

验证边界：通过范围为本次普通选择器双击尝试下的控件切换保护及无重复结果；工具第二步报发送控件不再存在，不宣称完整物理点位双击或接口幂等均已验证。未重试发送。

实际提示词：

> 找出绿色蒸汽火车在铁轨上的卡通片段。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-47-doubleclick-attempt.json, LF-47-initial-state.json, LF-47-final-state.json, LF-47-result.png, LF-47-preview-1.png, LF-47-verified-state.json

会话：950b0111-cc50-4fc0-ad88-387ac659de76

## LF-48：Passed

静音AAC音轨视频已真实上传并完成分析。视觉查询返回正确6秒黄色机器人候选且实际播放；下载候选音频解码全为零。随后按旁白火车查询明确无匹配、0新增候选，没有把视觉历史当语音命中或虚构台词。

验证边界：有音轨但静音参数通过，与无音轨LF-04分开。助手对颜色保留不确定，实际画面核验黄色正确；未把done单独作为通过，也不据本例证明其他编码/所有静音媒体均支持。

实际提示词：

> 找出画面里黄色机器人的片段，只按画面查找。

> 找出旁白说到火车的片段，没有就明确说明。

证据（本机reports/local-footage-36-50-staging-20261124/）：fixture-audit.json, fixture-content-verification.json, M-SILENT-audio-check.txt, SILENT-uploaded.png, SILENT-budget.png, SILENT-analysis-ready.png, LF-48-visual-final-state.json, LF-48-visual-preview-1.png, LF-48-visual-result.mp4, LF-48-returned-audio-audit.json, LF-48-speech-negative-final-state.json, LF-48-speech-negative-result.png

会话：97c4906a-0347-4ba8-afbc-1a9620ddeb3f

## LF-49：Passed

默认音轨的机器人句定位1.100～2.660秒并实际播放；单音轨立体声左侧机器人、右侧火车分别定位1.040～2.680及6.540～8.140秒，均播放且下载PCM与对应源对齐。双音轨第二条非默认轨的火车查询无结果，未计为全音轨通过。

验证边界：通过仅覆盖实际默认轨及单轨立体声左右声道；未发现选轨入口，非默认轨索引/切换支持范围仍待确认。无结果回复未明示分轨限制，该说明能力未获验证，不据此认定全轨支持或已确认需求缺陷。PCM对齐依赖此前人工确认的金标，不冒称本轮新增人工听审。

实际提示词：

> A2和LR分别执行：找出声音中说到‘你好，机器人’的片段。

> A2和LR分别执行：找出声音中说到‘欢迎乘坐火车’的片段。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-49-50-source-stream-audit.json, LF-49-A2-parameter.json, A2-analysis-ready.png, LF-49-A2-robot-final-state.json, LF-49-A2-robot-audio-audit.json, LF-49-A2-train-final-state.json, LR-analysis-ready.png, LF-49-LR-robot-final-state.json, LF-49-LR-robot-audio-audit.json, LF-49-LR-train-final-state.json, LF-49-LR-train-audio-audit.json, LF-49-LR-verified-state.json

会话：0d564a79-9a9b-417d-8d91-6ef3e02adc9e

## LF-50：Not Applicable

纯WAV已通过真实文件夹入口导入新项目，membership确认为audio、576078字节；分析页明确0个媒体/没有找到可分析的图片或视频，开始分析禁用。按用例条件跳过分析，纯音频查找分支不适用，未发送无法建立前置的查找。返回既有LR视频项目，原火车片段仍实际播放，源membership不变。

验证边界：仅确认当前项目文件夹分析入口不接收纯音频，不能推广为整个应用不支持音频。没有把音频伪装成视频、强行建立索引或返回无关视频；视频对照仅回读播放已有结果，无新检索或生成。

实际提示词：

目标请求未发或仅页面前置检查，见实际说明。

证据（本机reports/local-footage-36-50-staging-20261124/）：LF-49-50-source-stream-audit.json, LF-50-pure-audio-analysis-entry.png, LF-50-audio-entry-state.json, LF-50-audio-membership.json, LF-50-audio-skipped-workbench.png, LF-50-normal-project-control-preview-1.png, LF-50-normal-project-control.json

## 收尾与验证边界

15条均已记录：通过7、失败2、阻塞5、不适用1。阻塞为LF-37空项目、38补分析入口、39增量导入、40移除项目源、42缺U2；可独立分支已执行。LF-36命中正确素材但归属说明误报；LF-46第一种描述无本地可播候选，第二种通过，默认搜索范围契约仍待确认。

LF-49通过仅限默认轨及单轨立体声左右声道，非默认第二轨无结果且选轨范围未确认；没有把全部音轨支持计为通过。LF-50当前文件夹分析入口排除纯音频，查找分支不适用；正常视频项目对照仍可播放。LF-43以加静音AAC并重新封装的同画面对照完成，原无音轨上传失败另留，未证明单一根因。

原用例、状态表/JSON及进度已逐项更新。固定脚本仍AUTO3/PLAN63，本批15条为PLAN，临时辅助不算固定自动化实现。545条正式用例格式检查0问题；LF另查66条九列、唯一编号、状态一致、全部引用证据存在。LF-51～73仍23条未执行；历史LF-34 Failed保持。统一入口README未改，无云效或Git写入。

TaskSpace41已finish，最终无停止按钮、视频已暂停，未额外重发查询。原REPEAT失败/取消上传记录保留，不称所有上传记录已清空。Ego Lite提示可更新，本轮未升级。详细本机审计：reports/local-footage-36-50-staging-20261124/final-audit.json。
