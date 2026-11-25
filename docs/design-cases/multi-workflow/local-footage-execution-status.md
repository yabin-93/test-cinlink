<!-- LF-TESTHUB-EXECUTION-STATUS-20261125 -->
2026-11-25已将当前LF-01～62最新执行状态同步云效原计划目录，并刷新逐条回读62/62一致：50已通过、9未通过、3暂缓（本地1阻塞+2不适用）。未通过为LF-27/29/36/43/44/50/51/59/61；未更改缺陷处理状态、设计正文或实测结论，无产品重跑，AUTO3/PLAN59保持。 [同步报告](local-footage-testhub-status-sync-20261125.md)。
<!-- /LF-TESTHUB-EXECUTION-STATUS-20261125 -->

<!-- LF01-V11-RUN-20261125 -->
2026-11-25按更新后的步骤真实重跑当前LF-01：缓存复用场景Passed。新P4项目仅4原片，逐文件五阶段完成、4/4；无音轨03就绪，原提示词仅发一次，唯一F4候选90.083～102.083秒已实际播放并完整解码288帧、画面与机器人/黑板/桌子金标一致。首次分析未覆盖，助手文字未确认同框单列观察。固定脚本未运行/未适配，AUTO3/PLAN59及其他61条结论保持；全62条仍50 Passed/9 Failed/1 Blocked/2 Not Applicable。云效计划执行结果未同步。TaskSpace59已完成，保留实际结果页。 [执行报告](local-footage-results-01-v11-staging-20261125.md)。
<!-- /LF01-V11-RUN-20261125 -->

<!-- LF42-SHORT-SCOPE-20261125 -->
2026-11-25当前LF-42（原LF-52）V3.1仅测试约2秒短片，移除FLASH首尾闪现分组。按2026-11-24原SHORT项目已分析、真实播放及48帧核对证据重评Passed，非新重跑；旧Blocked/上传失败/闪现查询未执行保留历史，取消闪现补验。全62条50 Passed/9 Failed/1 Blocked/2 Not Applicable，AUTO3/PLAN59。未操作浏览器、云效或Git。
<!-- /LF42-SHORT-SCOPE-20261125 -->

<!-- LF61-R1-CLOUD-SYNC-20261124 -->
当前LF-61（原LF-72）“按完整文件名查找已分析长视频无匹配”已查重新建[FWXC-756](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a6d1763e57348aefb5c83d423d)；2张原始截图已嵌入、3附件均官方OpenAPI回读验证。只提交续查失败，运行中刷新仍未覆盖；参数改写为观察，未断言唯一根因。568条实时索引/14条明细新GET/554条gmtModified不变缓存比对，未确认同场景重复；相关旧单未改。实测Failed及48 Passed/9 Failed/1 Blocked/2 Not Applicable/2 Not Run、AUTO3/PLAN59保持。无产品重跑、额外扩散、浏览器操作或Git提交；原报告“未同步云效”仅指执行阶段，不包含本次授权同步。 [缺陷记录](../../defects/LF61-full-filename-search-miss-staging-20261124.md)。
<!-- /LF61-R1-CLOUD-SYNC-20261124 -->

<!-- LF5059-R1-CLOUD-SYNC-20261124 -->
当前R1编号两项确认失败已查重新建：LF-50→[FWXC-750](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ae53738ca23f2e201b76521be0)；LF-59→[FWXC-751](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0bd8a803b33f6a80a066fdb251)。7张原始截图嵌入及13个附件均官方OpenAPI回读验证；旧FWXC-402未改，LF-48/49通过未提交。实测结果及41 Passed/8 Failed/1 Blocked/1 Not Applicable/11 Not Run、AUTO3/PLAN59保持。无产品重跑、额外扩散、浏览器操作或Git提交；原报告未同步云效仅指产品执行阶段，不含本次授权同步。[同步详情](../../defects/LF-R1-50-59-sync-20261124.md)。
<!-- /LF5059-R1-CLOUD-SYNC-20261124 -->

<!-- LF44-R1-CLOUD-SYNC-20261124 -->
当前LF-44（原LF-54）非零起点视频返回0～3秒纯蓝候选已查重新建[FWXC-749](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4ecf0572d02dfff28d124a7545)；3张原始UI截图+1张源金标嵌图、2原片+1错误短片+1脱敏审计，共8附件均官方OpenAPI回读核验。相关FWXC-275原状态/正文未改。LF-45、LF-47当前Passed及emoji历史观察未提交；状态仍39 Passed/6 Failed/1 Blocked/1 Not Applicable/15 Not Run、AUTO3/PLAN59。无产品重跑、无额外扩散、无Git操作；原记录“无云效写入”仅指各自产品执行/范围重评阶段。[缺陷记录](../../defects/LF44-nonzero-start-search-staging-20261124.md)。
<!-- /LF44-R1-CLOUD-SYNC-20261124 -->

<!-- LF47-V31-SCOPE-20261124 -->
用户授权LF-47优化为V3.1，仅保留空格/中文括号及大写扩展名两组；依据本轮真实播放/下载哈希一致证据重评Passed，非新重跑、非产品修复。emoji组原无匹配及原三组Failed保留历史；不计其通过。当前本批LF-44 Failed，LF-45、LF-47 Passed；全62条39 Passed/6 Failed/1 Blocked/1 Not Applicable/15 Not Run，AUTO3/PLAN59不变。原表及下文LF-47 Failed仅表示旧三组范围的实测。[范围与重评说明](local-footage-LF47-v31-scope-20261124.md)。无浏览器/分析/查询/云效/Git操作。
<!-- /LF47-V31-SCOPE-20261124 -->

<!-- LF-R1-43-51-CLOUD-SYNC-20261124 -->
当前R1编号LF-43、LF-51确认失败已去重新建LF-43→[FWXC-747](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=79a89820864146921dae2f27c1)；LF-51→[FWXC-748](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=369a210a415bd6f3d8099c58a1)；项目归属误报另追加[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)评论24516469。8张原图嵌入、3份脱敏审计、12份受控源片，23份附件均官方OpenAPI回读验证。FWXC-524原类型/状态/正文保持；实测结论及AUTO3/PLAN59保持。未重跑、无扩散、未写用例正文或Git。[同步详情](../../defects/LF-R1-43-51-sync-20261124.md)。原报告“无云效写入”仅指产品测试阶段，不包含本次授权同步。
<!-- /LF-R1-43-51-CLOUD-SYNC-20261124 -->

# 本地素材查找当前执行状态

当前62条，编号版本LF-20261124-R1。[新旧编号对照](local-footage-id-map-20261124.md)。历史报告沿用原编号，本批报告按当前编号。

当前状态：{"Passed": 50, "Failed": 9, "Blocked": 1, "Not Applicable": 2}；固定AUTO3/PLAN59。

| 当前编号 | 原编号 | 最近实测结果 | 环境 | 自动化 | 实测范围 | 报告 |
|---|---|---|---|---|---|---|
| LF-01 | LF-01 | Passed | staging | AUTO | V1.1预发重跑通过（缓存复用场景）：4原片均就绪、五阶段完成且已分析4/4，含无音轨03；唯一F4候选90.083～102.083秒，实际播放12秒并核对机器人、黑板和桌子同框。首次分析未覆盖；助手文字不确定单列观察。 | [报告](local-footage-results-01-v11-staging-20261125.md) |
| LF-02 | LF-02 | Passed | staging | AUTO | 执行通过：P1仅F1且分析完成，唯一候选9秒（原片0.083～9.083秒）。实际播放并检查8.3秒画面，绿色盆栽仙人掌、橙色兔子和蓝衣深裤男孩均可见，无其他源混入；助手对颜色/身份的文字不确定未替代实图验收。 | [报告](local-footage-results-staging-20261124.md) |
| LF-03 | LF-03 | Passed | staging | AUTO | 执行通过：P2仅F2且分析完成，返回唯一9秒候选（原片0.083～9.083秒）。实际播放并核对8.3秒画面，蓝色上衣、深色裤子的卡通男孩和绿色盆栽仙人掌同时可见，来源为F2，无其他原片混入。 | [报告](local-footage-results-staging-20261124.md) |
| LF-04 | LF-04 | Passed | staging | PLAN | 执行通过：P3仅无音轨F3，上传和缓存分析完成；唯一候选12秒、原片30.083～42.083秒，实际播放看见穿紫衣女孩与绿色乌龟，无转写或有声视频前置错误。 | [报告](local-footage-results-staging-20261124.md) |
| LF-05 | LF-05 | Passed | staging | PLAN | 执行通过：已分析P4的独立空会话查询仅返回F4机器人候选，原片90.083～102.083秒；实际播放12秒视频，机器人、深色板面及桌子可见，未混入望远镜、留声机或其他源。 | [报告](local-footage-results-staging-20261124.md) |
| LF-06 | LF-06 | Passed | staging | PLAN | 执行通过：同会话两轮分别命中F4首镜头0.083～14.833秒飞机和尾镜头285.083～300.000秒卫星。两候选均实际播放，飞机浅蓝背景、卫星星空及月亮圆体与源片金标相符；尾段未超300秒，未漏最后镜头，前轮历史保留。 | [报告](local-footage-results-staging-20261124.md) |
| LF-07 | LF-07 | Passed | staging | PLAN | 执行通过：P4四文件独立会话只返回F4火车候选，原片30.083～42.083秒、12秒1280×720。实际播放为绿色蒸汽火车与铁轨，无F1～F3或长颈鹿候选混入。 | [报告](local-footage-results-staging-20261124.md) |
| LF-08 | LF-08 | Passed | staging | PLAN | 执行通过：分别交付F1/F2/F3三个60秒原片，均实际播放并下载；三份下载字节数及SHA-256与原片逐一精确一致，没有漏F2、错误合并、重复冒充或F4混入。实际候选画面含仙人掌与兔子。 | [报告](local-footage-results-staging-20261124.md) |
| LF-09 | LF-09 | Passed | staging | PLAN | 执行通过：已分析P4中不存在真实足球比赛目标，28秒完成后页面明确显示“素材搜索：未找到匹配片段”，0候选、无伪匹配或服务错误；未将仅有done判为成功。 | [报告](local-footage-results-staging-20261124.md) |
| LF-10 | LF-10 | Passed | staging | PLAN | 执行通过（页面必填范围）：输入为空及三个空格时发送按钮均禁用；恢复空值后前后消息仍为原四条，没有新增用户消息/run/候选。 | [报告](local-footage-results-staging-20261124.md) |
| LF-11 | LF-11 | Passed | staging | PLAN | 执行通过：仅F4的Q项目返回并实际播放机器人正向候选；仅F1～F3的P123项目相同查询明确无匹配、0候选，没有泄漏Q的F4文件名、缩略图或片段。两真实项目素材集合分别精确1个和3个，均完成缓存分析，未通过@或导入F4改变P123范围。 | [报告](local-footage-results-staging-20261124.md) |
| LF-12 | LF-12 | Passed | staging | PLAN | 执行通过：复用本轮P4已分析库，A会话机器人结果保留；同项目新B会话不上传、不重新分析、不@即命中唯一F4火车。返回A后机器人仍可实际播放，B保留自身火车候选及后续只读信息，未串改或覆盖A历史。 | [报告](local-footage-results-staging-20261124.md) |
| LF-13 | LF-13 | Passed | staging | PLAN | 执行通过：同一会话机器人→瀑布连续两轮，第二轮唯一F4瀑布候选15秒、原片270.083～285.083秒；实际播放看见岩壁、瀑布和水潭，第一轮机器人视频及文字历史仍保留。 | [报告](local-footage-results-staging-20261124.md) |
| LF-14 | LF-14 | Passed | staging | PLAN | 执行通过（当前候选与会话引用范围）：复用本轮LF07火车查询，候选可实际播放；追加只读引用后准确读出同一match文件名、12秒时长及绿色火车/铁轨画面，未混用完整300秒原片，未新增生成视频或修改工程。 | [报告](local-footage-results-staging-20261124.md) |
| LF-15 | LF-15 | Passed | staging | PLAN | 执行通过（当前页面范围）：刷新同一会话后，原查询、唯一机器人候选、来源文件及90.083～102.083秒区间保持；再次实际播放成功，12秒1280×720。刷新前后仅同一原run，未新增用户查询或分析。 | [报告](local-footage-results-staging-20261124.md) |
| LF-16 | LF-16 | Passed | staging | PLAN | 执行通过（客户端提交异常及恢复）：只在本测试页阻断真实turns提交后，页面显示“发送待确认”，保留原消息、提供“核对并重试原消息”，未伪装done或无匹配；服务端会话当时0消息。解除全部阻断后点击该入口一次，最终仅1条用户消息/1个run，返回并实际播放正确12秒机器人候选，输入恢复正常。 | [报告](local-footage-results-staging-20261124.md) |
| LF-17 | LF-17 | Passed | staging | PLAN | 执行通过：仅F2项目按目标旁白返回11.600～14.460秒候选，实际播放并下载约2.874秒视频。候选解码音频与未改原片11.600秒起音频相关度0.9981，确认取自用户此前听审含目标原句的同哈希原音区间，未用视觉命中或助手转述代替声音核验。 | [报告](local-footage-results-staging-20261124.md) |
| LF-18 | LF-18 | Passed | staging | PLAN | 执行通过（既定名称与原片交付验收）：完整文件名分别返回7MB.mp4和9s.mp4，均实际播放，女士/旗帜与男子/木桌/电脑不互换；两份下载字节数及SHA-256与原片精确一致，没有按7MB处理体积或将9s裁成9秒。另有项目归属误报，独立发现LF-NAME-PROJECT-WARNING。 | [报告](local-footage-results-staging-20261124.md) |
| LF-19 | LF-20 | Passed | staging | PLAN | 执行通过（部分名称匹配与候选交付）：空会话省略扩展名7MB一次返回唯一F5，实际播放为旗帜前黑外套蓝上衣女士，未触发体积处理或生成，无须补充完整名称。项目归属误报同样出现，关联独立发现LF-NAME-PROJECT-WARNING。 | [报告](local-footage-results-staging-20261124.md) |
| LF-20 | LF-21 | Passed | staging | PLAN | 执行通过（双文件分别交付）：同轮分别返回F5/F6两份原始视频，均已实际播放，女士旗帜与男子木桌电脑对应正确；没有漏项、重复冒充、合并或新成片。名称查询的项目归属误报在本轮复现，归入同一独立发现。 | [报告](local-footage-results-staging-20261124.md) |
| LF-21 | LF-22 | Passed | staging | PLAN | 执行通过：不存在的完整名称查询19秒结束，页面明确显示未找到匹配片段，0新增候选；前轮7MB历史保留但未被当作本轮命中，没有用其他视频替代或生成。 | [报告](local-footage-results-staging-20261124.md) |
| LF-22 | LF-28 | Passed | staging | PLAN | 执行通过（既定三轮链路验收）：同一会话三轮依次交付正确F5、明确无匹配、正确F6；中间未新增伪候选，最后一轮未锁死，两个原片和三轮历史均保留，无重新上传/分析或重复查询。项目归属误报随两次正向出现，另记独立发现。 | [报告](local-footage-results-staging-20261124.md) |
| LF-23 | LF-30 | Passed | staging | PLAN | 执行通过：空会话仅按画面描述查找，未输入文件名，唯一候选为F5；实际播放为旗帜前穿黑外套、蓝上衣的女士，未混入F6男子。 | [报告](local-footage-results-staging-20261124.md) |
| LF-24 | LF-31 | Passed | staging | PLAN | 执行通过：未输入文件名，空会话内容查询唯一返回F6，实际播放可见黑框眼镜、深色T恤男子坐在木桌前，右侧有电脑；没有混入F5女士。 | [报告](local-footage-results-staging-20261124.md) |
| LF-25 | LF-32 | Passed | staging | PLAN | 执行通过：G56两片没有宇航员月球场景，38秒完成后明确显示素材搜索未找到匹配片段，0候选；未拿女士/男子谈话冒充，没有模型429或服务异常。 | [报告](local-footage-results-staging-20261124.md) |
| LF-26 | LF-33 | Passed | staging | PLAN | 执行通过：明确要求两人在同一画面，22秒完成后显示无匹配，0候选；没有把分别出现女士和男子的F5/F6两片当作同框命中，也没有自动拼接/生成。 | [报告](local-footage-results-staging-20261124.md) |
| LF-27 | LF-34 | Failed | staging | PLAN | Failed：已在同会话完成F6男子正向查询后，第二轮排除男子、查找女士请求实际受理，但run失败，页面报RuntimeError: model HTTP 429 / rate_limit_error / request is limited；没有交付本轮女士候选。前轮男子历史保留，不把它误计为本轮命中，也不把服务错误当正常无匹配。 | [报告](local-footage-results-staging-20261124.md) |
| LF-28 | LF-35 | Passed | staging | PLAN | 执行通过（候选选择收敛）：首轮列出F6男子、F5女士两个候选供选择，分别实际播放；补充男子的唯一描述后明确选中候选1即9s.mp4，未继续将F5作为最终选择，也未生成或处理视频。最终再次播放所选男子原片成功。首轮项目归属提示误报另记独立发现。 | [报告](local-footage-results-staging-20261124.md) |
| LF-29 | LF-36 | Failed | staging | PLAN | V2原提示词返回正确7MB.mp4完整原片，实际播放、下载SHA与源一致；当前“查找素材”项目含同一源且发送前已确认逐文件分析完成，回复仍误报项目ID不一致、无法确认归属，归属说明失败。 | [报告](local-footage-results-36-40-v2-staging-20261124-145413.md) |
| LF-30 | LF-37 | Passed | staging | PLAN | V3.2仅保留未分析创建项目：依据V3.1 A组既有实测Passed重评，真实1素材创建、跳过分析后0/1；本次未重跑。原空素材B组移出范围，旧Blocked及未覆盖事实保留，不补算通过。 | [报告](local-footage-LF37-v32-scope-20261124.md) |
| LF-31 | LF-38 | Blocked | staging | PLAN | V3：F5已分析命中、播放及原片哈希通过；F6未就绪查询提示先分析更多视频，0新增候选。补F6分析时重试读取后仍无时长、确认禁用，0分析受理；第三查询未发，仅就绪后分支阻塞。第一轮归属误报单独关联LF36既有观察。 | [报告](local-footage-LF38-v3-staging-20261124.md) |
| LF-32 | LF-41 | Passed | staging | PLAN | 同一项目通过两个子目录导入同名访谈.mp4，未被合并。名称+女士描述命中正确F5；仅按名时列出两个可区分候选供选择。两候选均实际播放、下载，SHA分别精确对应F6/F5。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-33 | LF-43 | Passed | staging | PLAN | 保留原无音轨夹具上传失败后，改用画面逐帧相同、加静音AAC的对照副本完成分析。原指令触发上传澄清，已按要求补同一已分析源并继续原run；最终分别列出0～6秒和12～17.999903秒机器人位置，明确排除6～12秒飞机，符合两处金标。线上实际源下载SHA与该副本一致，完整解码成功。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-34 | LF-44 | Passed | staging | PLAN | 本测试页短暂离线并恢复、重开同一会话后，原请求完成，唯一用户轮次/同一原run保留；12秒F4机器人候选实际播放成功，未重新发送。回读服务器消息创建时间04:17:03.149早于断流04:17:03.711。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-35 | LF-45 | Passed | staging | PLAN | 复用本日LF-34真实模型429失败作为前置，确认failed后仅点击一次页面重试。原run由resuming转done，同会话原有男子历史保留，本轮返回正确女士F5并实际播放，下载SHA与7MB.mp4原片一致；没有新增用户轮次或重复生成。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-36 | LF-46 | Failed | staging | PLAN | 两种原始同义表达结果不一致：A仅文字声称找到并引用外部stock地址，0当前项目可播放候选；B实际调用项目内search_materials并返回F6三个片段，均实际播放为眼镜男子/木桌/电脑，B通过，整体A未达本例素材命中目标。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-37 | LF-47 | Passed | staging | PLAN | 仅通过正常发送控件尝试双击，首击后控件切换为停止，第二次发送定位被阻断，未强行点击停止或绕过控件。最终只有1条用户消息/1个原run，完成并实际播放正确12秒火车候选，无重复提交。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-38 | LF-48 | Passed | staging | PLAN | 静音AAC音轨视频已真实上传并完成分析。视觉查询返回正确6秒黄色机器人候选且实际播放；下载候选音频解码全为零。随后按旁白火车查询明确无匹配、0新增候选，没有把视觉历史当语音命中或虚构台词。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-39 | LF-49 | Passed | staging | PLAN | 默认音轨的机器人句定位1.100～2.660秒并实际播放；单音轨立体声左侧机器人、右侧火车分别定位1.040～2.680及6.540～8.140秒，均播放且下载PCM与对应源对齐。双音轨第二条非默认轨的火车查询无结果，未计为全音轨通过。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-40 | LF-50 | Not Applicable | staging | PLAN | 纯WAV已通过真实文件夹入口导入新项目，membership确认为audio、576078字节；分析页明确0个媒体/没有找到可分析的图片或视频，开始分析禁用。按用例条件跳过分析，纯音频查找分支不适用，未发送无法建立前置的查找。返回既有LR视频项目，原火车片段仍实际播放，源membership不变。 | [报告](local-footage-results-36-50-staging-20261124.md) |
| LF-41 | LF-51 | Passed | 待执行：staging | PLAN | R1本轮执行通过：画面找火车0候选；声音查询命中真实台词片段并播放，下载音频与人工确认源对应（起点约1.06秒），未以声音冒充画面。 | [报告](local-footage-results-41-43-46-51-r1-staging-20261124.md) |
| LF-42 | LF-52 | Passed | staging | PLAN | V3.1仅短片：依据2026-11-24原SHORT项目实测重评Passed；约2秒短片五阶段完成、返回0～2秒且实际播放/48帧核对通过。非新重跑；原FLASH上传失败及未检索事实保留历史，移出当前范围。 | [范围重评](local-footage-results-42-60-r1-staging-20261124.md#lf-42-v31-仅短片范围重评2026-11-25) |
| LF-43 | LF-53 | Failed | 待执行：staging | PLAN | R1本轮：普通竖屏命中且播放方向正确；旋转样本分析封面显示蓝方块在左/红圆在右，与源有效显示矩阵的上下布局不一致，同原指令无匹配。 | [报告](local-footage-results-41-43-46-51-r1-staging-20261124.md) |
| LF-44 | LF-54 | Failed | staging | PLAN | VFR组通过：6～10秒候选实际包含8～10秒机器人；非零起点组失败：原片实际8～10秒有机器人，却返回0～3秒纯蓝候选，目标未交付。 | [报告](local-footage-results-44-45-47-r1-staging-20261124.md) |
| LF-45 | LF-55 | Passed | staging | PLAN | MOV/H.264、MP4/HEVC、WebM/VP9三组首次分析及检索播放通过；WebM自动服务端回退成功，三原源哈希保留。颜色/坐标文字保留不确定不替代实际画面验收。 | [报告](local-footage-results-44-45-47-r1-staging-20261124.md) |
| LF-46 | LF-56 | Passed | 待执行：staging | PLAN | R1本轮执行通过：黑屏视觉查询0候选，声音查询返回真实台词并播放/波形核验；低清机器人两段候选实际播放匹配。回复颜色不确定按本例允许范围保留观察。 | [报告](local-footage-results-41-43-46-51-r1-staging-20261124.md) |
| LF-47 | LF-57 | Passed | staging | PLAN | V3.1范围重评Passed：仅保留空格/中文括号和大写.MP4两组；本日既有实测均返回正确完整F5，实际播放及下载哈希一致。非新重跑；原emoji无匹配及三组整体Failed保留历史，不改判emoji通过。 | [重评说明](local-footage-LF47-v31-scope-20261124.md) |
| LF-48 | LF-58 | Passed | staging | PLAN | 零字节、截断及伪扩展名三组均明确拒绝坏项；仅排除本次分析后，正常F6均分析就绪、真实查找/播放且SHA与原片一致，无坏片伪候选。无移除入口的条件步骤跳过；归属误报单独观察。 | [报告](local-footage-results-48-49-50-59-r1-staging-20261124.md) |
| LF-49 | LF-59 | Passed | staging | PLAN | 中文、英文及语义三组均找到真实声音短片并实际播放；源音频相关系数0.996～0.999，用户确认三段返回台词完整清楚，未以红球画面冒充机器人/火车。 | [报告](local-footage-results-48-49-50-59-r1-staging-20261124.md) |
| LF-50 | LF-60 | Failed | staging | PLAN | OCR支持已由用户确认，清晰静态“测试入口甲”无音轨样本五阶段就绪；正向查询却无匹配/0候选，Failed。反向“入口乙”明确无匹配/0候选，Passed。 | [报告](local-footage-results-48-49-50-59-r1-staging-20261124.md) |
| LF-51 | LF-61 | Failed | 待执行：staging | PLAN | R1本轮：N10全部分析就绪、K6；首次5个原片播放/哈希通过，但续取及补充已展示5份清单后仍只重复这5份，遗漏M-SCALE-04，完整性/续取Failed。另有归属误报。 | [报告](local-footage-results-41-43-46-51-r1-staging-20261124.md) |
| LF-52 | LF-62 | Not Applicable | staging | PLAN | 用户确认没有明确上限，边界/超限分支不适用；正常6秒/640x360/29711字节对照已分析、命中并播放通过，仅记支持观察。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
| LF-53 | LF-64 | Passed | staging | PLAN | 完整F7原片已分析并按名命中，2357.568秒主视频实际播放；本轮复用既有分析，首次导入/分析引用原批次真实证据，不冒称新首次分析。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
| LF-54 | LF-65 | Passed | staging | PLAN | 完整名称命中F7主视频，首中尾均实际播放；下载246228833字节，SHA256与原片一致。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
| LF-55 | LF-66 | Passed | staging | PLAN | 新空会话定位F7开场0～40秒，实际播放；原音对照相关系数0.999302，匹配起点0秒。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
| LF-56 | LF-67 | Passed | staging | PLAN | 中后段语义定位返回三处F7真实片段，均实际播放；原音匹配系数0.9985～0.9993，用户确认三段均相关且可辨认。本轮无504。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
| LF-57 | LF-68 | Passed | staging | PLAN | 末尾定位2336～2357.320秒并实际播放，覆盖最后约17秒寄语；原音匹配起点2336秒、相关系数0.999397，未越界。 | [报告](local-footage-results-57-58-61-r1-staging-20261124.md) |
| LF-58 | LF-69 | Passed | staging | PLAN | 补槽后同一请求分别列出开场与尾部位置，并返回完整原片；两处实际跳转播放，下载SHA等于F7。首轮额外要求指定源单独保留。 | [报告](local-footage-results-57-58-61-r1-staging-20261124.md) |
| LF-59 | LF-70 | Failed | staging | PLAN | 同一会话三轮完整执行：开场0～40秒与尾部38:56～39:17.320正确返回/播放且原音匹配；中段话题查询HTTP504失败、0新增候选。历史及F7原片保留，整体Failed。 | [报告](local-footage-results-48-49-50-59-r1-staging-20261124.md) |
| LF-60 | LF-71 | Passed | staging | PLAN | 用户已完整观看确认全片无宇航员月球行走；F7就绪后空会话原指令一次，明确无匹配、0新增候选、搜索done无服务错误。 | [报告](local-footage-results-42-60-r1-staging-20261124.md) |
| LF-61 | LF-72 | Failed | staging | PLAN | 完成后重开/刷新同一分析批次保持，但续查已就绪F7返回无匹配/0候选；执行参数将完整文件名缩为“刘强东演讲.mp4”精确匹配。运行中刷新另记未覆盖。 | [报告](local-footage-results-57-58-61-r1-staging-20261124.md) · [FWXC-756](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a6d1763e57348aefb5c83d423d) |
| LF-62 | LF-73 | Passed | staging | PLAN | 独立F7/F5/F6混库两轮同会话分别返回F7与F6，均实际播放、下载SHA等于对应原片；未混F5，历史保留。 | [报告](local-footage-results-52-56-62-r1-staging-20261124.md) |
