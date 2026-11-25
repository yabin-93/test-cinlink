<!-- LF3940-V31-RECHECK-20261124 -->
LF-39、40 V3.1本轮实际完成预发适用性复核：均Not Applicable，当前未支持对应增量导入/素材移除；按条件跳过业务步骤，0查询/分析/素材变更，PLAN/空脚本。 [报告](local-footage-results-39-40-v31-recheck-staging-20261124.md)。
<!-- /LF3940-V31-RECHECK-20261124 -->

<!-- LF3940-CAPABILITY-20261124 -->
用户确认当前应用没有同项目增量导入、项目素材移除入口。LF-39、LF-40已调整为能力条件适用，当前结果由Blocked重评为Not Applicable，取消对应补跑待办；旧实测及已通过对照保留，不补算整体通过、不视为缺陷。文档重评，未重跑，固定PLAN/空脚本不变。 [范围修订](local-footage-revision-39-40-capability-20261124.md)。下方原Blocked为当时实测历史，不作为当前待补跑状态。
<!-- /LF3940-CAPABILITY-20261124 -->

<!-- LF3940-V3-RUN-20261124 -->
LF-39、LF-40 V3预发均Blocked：新增前无匹配、移除前原片查询/播放/哈希对照已通过；当前页面分别缺同项目增量导入、移除素材入口，后续依赖查询未发送。共2次查询/2个独立run且均终态，0增删素材/新分析/额外扩散；固定PLAN/空脚本不变。 [汇总报告](local-footage-results-39-40-v3-staging-20261124.md)。
<!-- /LF3940-V3-RUN-20261124 -->

<!-- LF38-V3-CLOUD-SYNC-20261124 -->
LF-38本轮已确认的项目归属误报已去重追加至[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)：评论24511776，标题含LF-38，2张原图+1份脱敏审计及嵌图已官方OpenAPI回读。原单类型/状态/正文保持；F6时长读取仍为前置阻塞，未作为确认缺陷提交。LF-38整体Blocked、PLAN/空脚本及执行计数不变，未重跑产品。 [本地记录](../../defects/LF38-project-ownership-staging-20261124.md)。原执行报告中的“无云效写入”仅指产品测试执行阶段，不包含本次用户授权同步。
<!-- /LF38-V3-CLOUD-SYNC-20261124 -->

<!-- LF38-V3-RUN-20261124 -->
LF-38 V3预发已执行：F5已分析查询命中并真实播放/下载哈希一致，F6未就绪查询提示先分析更多视频、0新增候选；补F6分析仍因时长读取失败、确认禁用而阻塞，第三查询未发。整体Blocked；2次查询均终态、0新分析受理、无扩散，固定PLAN/空脚本。 [报告](local-footage-LF38-v3-staging-20261124.md)。
<!-- /LF38-V3-RUN-20261124 -->

<!-- LF37-V32-SCOPE-20261124 -->
LF-37已精简为V3.2：仅验证有素材、未分析时创建项目并跳过分析；移除空素材准备、分析拦截及空素材查询分支。根据本日V3.1已执行通过的A组证据重评当前范围为Passed，非新重跑、非产品修复；旧Blocked及未覆盖事实保留，PLAN/空脚本不变。 [范围与重评](local-footage-LF37-v32-scope-20261124.md)。
<!-- /LF37-V32-SCOPE-20261124 -->

<!-- LF37-V31-RUN-20261124 -->
LF-37 V3.1预发重跑：未分析新建项目Passed，真实0素材分析/查询分支前置Blocked；整体Blocked，无确认产品失败。独立项目已创建并保留，未提交分析或检索；固定脚本PLAN/空路径。 [报告](local-footage-LF37-v31-staging-20261124.md)。
<!-- /LF37-V31-RUN-20261124 -->

<!-- LF3640V2-RUN-20261124 -->
2026-11-24 LF-36～40 V2预发：已记录5/5，{'Failed': 1, 'Blocked': 4}；仅正文无扩散，PLAN未接固定脚本。执行记录只在独立报告/状态/进度维护，用例正文及统一README未改；0云效/Git写入。 [报告](local-footage-results-36-40-v2-staging-20261124-145413.md)。
<!-- /LF3640V2-RUN-20261124 -->

执行记录已从用例正文分离；原执行列和流水完整保留在[迁移归档](local-footage-execution-history-migrated-20261124.md)。本状态表和JSON继续维护最近实测与执行版本，不回写正文。

<!-- LF3673-NO-DIFFUSION-20261124 -->
用户2026-11-24最新确认：LF-36～73只执行各用例正文，不额外设计、生成或执行扩散用例；本范围优先于通用“两条扩散”规则。正文原有步骤、参数组、多轮及必要前置/恢复检查仍按原要求执行。已执行的扩散结果和证据仅作历史额外测试保留，不计入本组必执行项，不影响原用例独立判定；不因取消后续扩散改写已观察事实。 本次仅更新范围规则，未重跑或改变主用例通过/失败状态，AUTO3/PLAN63保持，无云效/Git写入。
<!-- /LF3673-NO-DIFFUSION-20261124 -->

<!-- LF36-USER-PROJECT-20261124 -->
2026-11-24 LF-36在用户指定“查找素材”6文件项目执行：发送前逐文件确认分析完成。原提示词Passed（正确F5原片、播放及SHA一致）；扩散E1/E2均Failed（正确原片但误报归属）。新项目结果不覆盖旧G56失败，不判FWXC-524修复。PLAN未接固定脚本，0云效/Git写入。[报告](local-footage-LF36-user-project-143056-staging-20261124.md)。
<!-- /LF36-USER-PROJECT-20261124 -->

<!-- LF36-ANALYZED-RERUN-20261124 -->
2026-11-24 LF-36逐文件确认分析后重跑：本轮发送前逐文件确认7MB.mp4与9s.mp4已有分析五阶段（含检索准备）完成，G56真实包含两原片；原提示词仍返回未找到匹配片段、0原片预览，Failed。 PLAN未接固定脚本；0云效/Git写入。[报告](local-footage-LF36-analyzed-rerun-140936-staging-20261124.md)。
<!-- /LF36-ANALYZED-RERUN-20261124 -->

<!-- LF36-RERUN-20261124 -->
2026-11-24 LF-36预发重跑：原指令Failed，当前含目标原片且分析2/2，却返回0匹配/0预览；旧命中后归属误报历史保留。PLAN未接固定脚本，非FWXC-524严格原回归，未写云效或Git。 [报告](local-footage-LF36-rerun-135743-staging-20261124.md)。
<!-- /LF36-RERUN-20261124 -->

<!-- LF3650-RUN-20261124 -->
2026-11-24 LF-36～50预发执行：已记录15/15，结果{'Failed': 2, 'Blocked': 5, 'Passed': 7, 'Not Applicable': 1}，其余0条待执行。当前66条总状态{'Passed': 34, 'Failed': 3, 'Blocked': 5, 'Not Applicable': 1, 'Not Run': 23}；固定AUTO3/PLAN63保持，本轮为ego有头，0云效/Git写入。 [本轮报告](local-footage-results-36-50-staging-20261124.md)。
<!-- /LF3650-RUN-20261124 -->

<!-- LF-CATALOG-EXPANDED-20261124 -->
本次设计更新后共66条活动用例：原28条27 Passed/1 Failed；新增38条Not Run。AUTO3/PLAN63，P0 39/P1 27。下方“28/28、0待执行、AUTO3/PLAN25”的旧批次记录保留历史，不含本次新增。新增特殊素材夹具待准备，F7长视频已做本地规格核验，未线上执行。
<!-- /LF-CATALOG-EXPANDED-20261124 -->

<!-- LF-CLOUD-SYNC-20261124 -->
2026-11-24本地素材查找预发缺陷已同步：LF-34→[FWXC-745](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c7efa4b01dcd3245c7471cd75c)（新建）；LF-18、LF-20、LF-21、LF-28、LF-35→[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（追加证据）。本轮27 Passed/1 Failed及独立项目归属偏差分开保留，8原图/2脱敏审计已官方OpenAPI回读；固定AUTO3/PLAN25保持，本次无产品重跑。 [同步报告](../../defects/LF-STAGING-20261124-sync.md)。原执行阶段“0云效写入”保留为历史事实。
<!-- /LF-CLOUD-SYNC-20261124 -->

<!-- LF-FULL-RUN-20261124 -->
2026-11-24预发全量本轮已判定28/28：{'Passed': 27, 'Failed': 1}，其余0待执行；旧条目历史保留，当前结果见[本轮报告](local-footage-results-staging-20261124.md)。固定AUTO3/PLAN25保持。
<!-- /LF-FULL-RUN-20261124 -->

# 本地素材查找最新执行状态（2026-11-24）

**当前活动用例66条。V2当前执行范围与结果见本页最新批次标记；未执行的V2不由旧实测替代。最近实测汇总：{'Passed': 34, 'Failed': 3, 'Blocked': 5, 'Not Applicable': 1, 'Not Run': 23}。固定AUTO3/PLAN63，旧AUTO入口仍待适配。** 新增分组：一般补强12、特殊素材16、长视频10；7个退役编号不计集合、不复用。旧例新增参数和修订范围见正文，不将历史通过扩大到新断言。

用例步骤保留在[原正文](local-footage-p0-cases.md)，本页只维护最新状态及报告索引；旧报告为历史，不将旧累计数字当当前状态。

| 用例 | 最近实测结果 | 环境 | 自动化 | 当前版本与实测范围 | 报告 |
|---|---|---|---|---|---|
| LF-01 | Passed | staging | AUTO | 执行通过：正式P4四原片上传与缓存分析完成，含无音轨F3；返回唯一12秒机器人候选，原片90.083～102.083秒。已实际播放并下载，黄色机器人、深色板面及桌子可见，无留声机/飞机混入；助手文字对黑板/桌子保留不确定说明。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-02 | Passed | staging | AUTO | 执行通过：P1仅F1且分析完成，唯一候选9秒（原片0.083～9.083秒）。实际播放并检查8.3秒画面，绿色盆栽仙人掌、橙色兔子和蓝衣深裤男孩均可见，无其他源混入；助手对颜色/身份的文字不确定未替代实图验收。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-03 | Passed | staging | AUTO | 执行通过：P2仅F2且分析完成，返回唯一9秒候选（原片0.083～9.083秒）。实际播放并核对8.3秒画面，蓝色上衣、深色裤子的卡通男孩和绿色盆栽仙人掌同时可见，来源为F2，无其他原片混入。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-04 | Passed | staging | PLAN | 执行通过：P3仅无音轨F3，上传和缓存分析完成；唯一候选12秒、原片30.083～42.083秒，实际播放看见穿紫衣女孩与绿色乌龟，无转写或有声视频前置错误。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-05 | Passed | staging | PLAN | 执行通过：已分析P4的独立空会话查询仅返回F4机器人候选，原片90.083～102.083秒；实际播放12秒视频，机器人、深色板面及桌子可见，未混入望远镜、留声机或其他源。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-06 | Passed | staging | PLAN | 执行通过：同会话两轮分别命中F4首镜头0.083～14.833秒飞机和尾镜头285.083～300.000秒卫星。两候选均实际播放，飞机浅蓝背景、卫星星空及月亮圆体与源片金标相符；尾段未超300秒，未漏最后镜头，前轮历史保留。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-07 | Passed | staging | PLAN | 执行通过：P4四文件独立会话只返回F4火车候选，原片30.083～42.083秒、12秒1280×720。实际播放为绿色蒸汽火车与铁轨，无F1～F3或长颈鹿候选混入。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-08 | Passed | staging | PLAN | 执行通过：分别交付F1/F2/F3三个60秒原片，均实际播放并下载；三份下载字节数及SHA-256与原片逐一精确一致，没有漏F2、错误合并、重复冒充或F4混入。实际候选画面含仙人掌与兔子。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-09 | Passed | staging | PLAN | 执行通过：已分析P4中不存在真实足球比赛目标，28秒完成后页面明确显示“素材搜索：未找到匹配片段”，0候选、无伪匹配或服务错误；未将仅有done判为成功。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-10 | Passed | staging | PLAN | 执行通过（页面必填范围）：输入为空及三个空格时发送按钮均禁用；恢复空值后前后消息仍为原四条，没有新增用户消息/run/候选。 | [本轮报告](local-footage-results-staging-20261124.md)；本次新增参数/新版原指令未重跑 |
| LF-11 | Passed | staging | PLAN | 执行通过：仅F4的Q项目返回并实际播放机器人正向候选；仅F1～F3的P123项目相同查询明确无匹配、0候选，没有泄漏Q的F4文件名、缩略图或片段。两真实项目素材集合分别精确1个和3个，均完成缓存分析，未通过@或导入F4改变P123范围。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-12 | Passed | staging | PLAN | 执行通过：复用本轮P4已分析库，A会话机器人结果保留；同项目新B会话不上传、不重新分析、不@即命中唯一F4火车。返回A后机器人仍可实际播放，B保留自身火车候选及后续只读信息，未串改或覆盖A历史。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-13 | Passed | staging | PLAN | 执行通过：同一会话机器人→瀑布连续两轮，第二轮唯一F4瀑布候选15秒、原片270.083～285.083秒；实际播放看见岩壁、瀑布和水潭，第一轮机器人视频及文字历史仍保留。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-14 | Passed | staging | PLAN | 执行通过（当前候选与会话引用范围）：复用本轮LF07火车查询，候选可实际播放；追加只读引用后准确读出同一match文件名、12秒时长及绿色火车/铁轨画面，未混用完整300秒原片，未新增生成视频或修改工程。 | [本轮报告](local-footage-results-staging-20261124.md)；本次新增参数/新版原指令未重跑 |
| LF-15 | Passed | staging | PLAN | 执行通过（当前页面范围）：刷新同一会话后，原查询、唯一机器人候选、来源文件及90.083～102.083秒区间保持；再次实际播放成功，12秒1280×720。刷新前后仅同一原run，未新增用户查询或分析。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-16 | Passed | staging | PLAN | 执行通过（客户端提交异常及恢复）：只在本测试页阻断真实turns提交后，页面显示“发送待确认”，保留原消息、提供“核对并重试原消息”，未伪装done或无匹配；服务端会话当时0消息。解除全部阻断后点击该入口一次，最终仅1条用户消息/1个run，返回并实际播放正确12秒机器人候选，输入恢复正常。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-17 | Passed | staging | PLAN | 执行通过：仅F2项目按目标旁白返回11.600～14.460秒候选，实际播放并下载约2.874秒视频。候选解码音频与未改原片11.600秒起音频相关度0.9981，确认取自用户此前听审含目标原句的同哈希原音区间，未用视觉命中或助手转述代替声音核验。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-18 | Passed | staging | PLAN | 执行通过（既定名称与原片交付验收）：完整文件名分别返回7MB.mp4和9s.mp4，均实际播放，女士/旗帜与男子/木桌/电脑不互换；两份下载字节数及SHA-256与原片精确一致，没有按7MB处理体积或将9s裁成9秒。另有项目归属误报，独立发现LF-NAME-PROJECT-WARNING。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（独立说明偏差） |
| LF-20 | Passed | staging | PLAN | 执行通过（部分名称匹配与候选交付）：空会话省略扩展名7MB一次返回唯一F5，实际播放为旗帜前黑外套蓝上衣女士，未触发体积处理或生成，无须补充完整名称。项目归属误报同样出现，关联独立发现LF-NAME-PROJECT-WARNING。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（独立说明偏差） |
| LF-21 | Passed | staging | PLAN | 执行通过（双文件分别交付）：同轮分别返回F5/F6两份原始视频，均已实际播放，女士旗帜与男子木桌电脑对应正确；没有漏项、重复冒充、合并或新成片。名称查询的项目归属误报在本轮复现，归入同一独立发现。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（独立说明偏差） |
| LF-22 | Passed | staging | PLAN | 执行通过：不存在的完整名称查询19秒结束，页面明确显示未找到匹配片段，0新增候选；前轮7MB历史保留但未被当作本轮命中，没有用其他视频替代或生成。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-28 | Passed | staging | PLAN | 执行通过（既定三轮链路验收）：同一会话三轮依次交付正确F5、明确无匹配、正确F6；中间未新增伪候选，最后一轮未锁死，两个原片和三轮历史均保留，无重新上传/分析或重复查询。项目归属误报随两次正向出现，另记独立发现。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（独立说明偏差） |
| LF-30 | Passed | staging | PLAN | 执行通过：空会话仅按画面描述查找，未输入文件名，唯一候选为F5；实际播放为旗帜前穿黑外套、蓝上衣的女士，未混入F6男子。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-31 | Passed | staging | PLAN | 执行通过：未输入文件名，空会话内容查询唯一返回F6，实际播放可见黑框眼镜、深色T恤男子坐在木桌前，右侧有电脑；没有混入F5女士。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-32 | Passed | staging | PLAN | 执行通过：G56两片没有宇航员月球场景，38秒完成后明确显示素材搜索未找到匹配片段，0候选；未拿女士/男子谈话冒充，没有模型429或服务异常。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-33 | Passed | staging | PLAN | 执行通过：明确要求两人在同一画面，22秒完成后显示无匹配，0候选；没有把分别出现女士和男子的F5/F6两片当作同框命中，也没有自动拼接/生成。 | [本轮报告](local-footage-results-staging-20261124.md) |
| LF-34 | Failed | staging | PLAN | Failed：已在同会话完成F6男子正向查询后，第二轮排除男子、查找女士请求实际受理，但run失败，页面报RuntimeError: model HTTP 429 / rate_limit_error / request is limited；没有交付本轮女士候选。前轮男子历史保留，不把它误计为本轮命中，也不把服务错误当正常无匹配。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-745](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c7efa4b01dcd3245c7471cd75c) |
| LF-35 | Passed | staging | PLAN | 执行通过（候选选择收敛）：首轮列出F6男子、F5女士两个候选供选择，分别实际播放；补充男子的唯一描述后明确选中候选1即9s.mp4，未继续将F5作为最终选择，也未生成或处理视频。最终再次播放所选男子原片成功。首轮项目归属提示误报另记独立发现。 | [本轮报告](local-footage-results-staging-20261124.md)；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)（独立说明偏差） |

| LF-36 | Failed | staging | PLAN | V2本轮：V2原提示词返回正确7MB.mp4完整原片，实际播放、下载SHA与源一致；当前“查找素材”项目含同一源且发送前已确认逐文件分析完成，回复仍误报项目ID不一致、无法确认归属，归属说明失败。；云效[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)已补充本轮截图/审计，评论24509985回读 | [本轮报告](local-footage-results-36-40-v2-staging-20261124-145413.md) |
| LF-37 | Passed | staging | PLAN | V3.2仅保留未分析创建；依据V3.1 A组已通过证据重评，非新重跑。空素材B组移出范围，旧Blocked保留历史。 | [范围与重评](local-footage-LF37-v32-scope-20261124.md) |
| LF-38 | Blocked | staging | PLAN | V3已执行：F5查询/播放/哈希及F6未就绪反馈Passed；补F6分析仍无法读取时长、确认禁用，第三查询未发。 | [本轮报告](local-footage-LF38-v3-staging-20261124.md) |
| LF-39 | Not Applicable | staging | PLAN | V3.1本轮有头适用性复核：不支持同项目增量导入，业务步骤按条件跳过；0查询/分析/素材变更。 | [本轮复核](local-footage-results-39-40-v31-recheck-staging-20261124.md) |
| LF-40 | Not Applicable | staging | PLAN | V3.1本轮有头适用性复核：不支持移除当前项目素材，业务步骤按条件跳过；0查询/分析/素材变更。 | [本轮复核](local-footage-results-39-40-v31-recheck-staging-20261124.md) |
| LF-41 | Passed | staging | PLAN | V3精简正文未执行；最近实测：同一项目通过两个子目录导入同名访谈.mp4，未被合并。名称+女士描述命中正确F5；仅按名时列出两个可区分候选供选择。两候选均实际播放、下载，SHA分别精确对应F6/F5。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-42 | Blocked | staging | PLAN | V3精简正文未执行；最近实测：用户确认暂无U2；U1当前项目正向可独立核验，跨账号访问/下载分支缺少不同账号，目标权限请求未发，不以同账号跨项目替代。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-43 | Passed | staging | PLAN | V3精简正文未执行；最近实测：保留原无音轨夹具上传失败后，改用画面逐帧相同、加静音AAC的对照副本完成分析。原指令触发上传澄清，已按要求补同一已分析源并继续原run；最终分别列出0～6秒和12～17.999903秒机器人位置，明确排除6～12秒飞机，符合两处金标。线上实际源下载SHA与该副本一致，完整解码成功。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-44 | Passed | staging | PLAN | V3精简正文未执行；最近实测：本测试页短暂离线并恢复、重开同一会话后，原请求完成，唯一用户轮次/同一原run保留；12秒F4机器人候选实际播放成功，未重新发送。回读服务器消息创建时间04:17:03.149早于断流04:17:03.711。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-45 | Passed | staging | PLAN | V3精简正文未执行；最近实测：复用本日LF-34真实模型429失败作为前置，确认failed后仅点击一次页面重试。原run由resuming转done，同会话原有男子历史保留，本轮返回正确女士F5并实际播放，下载SHA与7MB.mp4原片一致；没有新增用户轮次或重复生成。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-46 | Failed | staging | PLAN | V3精简正文未执行；最近实测：两种原始同义表达结果不一致：A仅文字声称找到并引用外部stock地址，0当前项目可播放候选；B实际调用项目内search_materials并返回F6三个片段，均实际播放为眼镜男子/木桌/电脑，B通过，整体A未达本例素材命中目标。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-47 | Passed | staging | PLAN | V3精简正文未执行；最近实测：仅通过正常发送控件尝试双击，首击后控件切换为停止，第二次发送定位被阻断，未强行点击停止或绕过控件。最终只有1条用户消息/1个原run，完成并实际播放正确12秒火车候选，无重复提交。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-48 | Passed | staging | PLAN | V3精简正文未执行；最近实测：静音AAC音轨视频已真实上传并完成分析。视觉查询返回正确6秒黄色机器人候选且实际播放；下载候选音频解码全为零。随后按旁白火车查询明确无匹配、0新增候选，没有把视觉历史当语音命中或虚构台词。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-49 | Passed | staging | PLAN | V3精简正文未执行；最近实测：默认音轨的机器人句定位1.100～2.660秒并实际播放；单音轨立体声左侧机器人、右侧火车分别定位1.040～2.680及6.540～8.140秒，均播放且下载PCM与对应源对齐。双音轨第二条非默认轨的火车查询无结果，未计为全音轨通过。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-50 | Not Applicable | staging | PLAN | V3精简正文未执行；最近实测：纯WAV已通过真实文件夹入口导入新项目，membership确认为audio、576078字节；分析页明确0个媒体/没有找到可分析的图片或视频，开始分析禁用。按用例条件跳过分析，纯音频查找分支不适用，未发送无法建立前置的查找。返回既有LR视频项目，原火车片段仍实际播放，源membership不变。 | [本轮报告](local-footage-results-36-50-staging-20261124.md) |
| LF-51 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：声画描述冲突的通道区分；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-51) |
| LF-52 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：极短视频和瞬时首尾目标；条件：支持时长范围；逐帧金标 | [用例正文](local-footage-p0-cases.md#lf-52) |
| LF-53 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：竖屏及旋转元数据的视觉查找；条件：需准备方向明确的副本金标 | [用例正文](local-footage-p0-cases.md#lf-53) |
| LF-54 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：可变帧率和非零起始时间定位；条件：合法时间基样本与播放金标 | [用例正文](local-footage-p0-cases.md#lf-54) |
| LF-55 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：特殊封装及编码的分析预览；条件：先确认支持容器、编码与代理流程 | [用例正文](local-footage-p0-cases.md#lf-55) |
| LF-56 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：黑屏有声与低清模糊画面；条件：完整声画金标 | [用例正文](local-footage-p0-cases.md#lf-56) |
| LF-57 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：特殊文件名完整名称查找；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-57) |
| LF-58 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：损坏文件混入正常批次的隔离；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-58) |
| LF-59 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：语音多语言及相近话题的查找；条件：听审金标及支持语言/语义范围 | [用例正文](local-footage-p0-cases.md#lf-59) |
| LF-60 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：仅画面可读文字的OCR查找；条件：确认OCR能力；人工读审金标 | [用例正文](local-footage-p0-cases.md#lf-60) |
| LF-61 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：较多素材及候选续取完整性；条件：允许库规模与结果限制确认 | [用例正文](local-footage-p0-cases.md#lf-61) |
| LF-62 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：支持范围内时长体积和分辨率边界；条件：实际媒体上限和可控样本 | [用例正文](local-footage-p0-cases.md#lf-62) |
| LF-63 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：支持浏览器中的结果恢复一致性；条件：第二个受支持浏览器的同账号登录 | [用例正文](local-footage-p0-cases.md#lf-63) |
| LF-64 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频导入与首次分析完整性；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-64) |
| LF-65 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频完整名称和原源身份；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-65) |
| LF-66 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频开头内容定位；条件：开场独立声画确认 | [用例正文](local-footage-p0-cases.md#lf-66) |
| LF-67 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频中后段话题语义定位；条件：独立听审话题区间；元数据不作金标 | [用例正文](local-footage-p0-cases.md#lf-67) |
| LF-68 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频接近结束的位置检索；条件：尾部独立听审金标 | [用例正文](local-footage-p0-cases.md#lf-68) |
| LF-69 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频一次请求分别定位远隔内容；条件：开场和结尾两处金标 | [用例正文](local-footage-p0-cases.md#lf-69) |
| LF-70 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频同会话跨位置连续查询；条件：三处金标与同会话链要求 | [用例正文](local-footage-p0-cases.md#lf-70) |
| LF-71 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频不存在目标的反向查询；条件：全片反向画面确认 | [用例正文](local-footage-p0-cases.md#lf-71) |
| LF-72 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长视频分析受理后刷新及续查；条件：已受理且进行中的真实长视频分析任务 | [用例正文](local-footage-p0-cases.md#lf-72) |
| LF-73 | Not Run | 待执行：staging | PLAN | V3精简正文未执行；最近实测：长短相似人物素材混库查找；尚未执行，夹具按正文准备 | [用例正文](local-footage-p0-cases.md#lf-73) |

## 历史执行与口径调整（2026-11-10）

LF08此前按口径校正为Passed，本轮真实重跑漏F2/误入F4，最新改Failed；LF12采用优化版最新39秒结果，R1 API错误和R2记录保留；LF13采用本次44/35秒实际重跑的Passed。LF14引用未完成、LF15网络层未覆盖均明确保留，不冒充全技术通过。本次仅同步本地文档；已提交FWXC389/390/395/398不因文档同步自动修改状态。

2026-11-10 LF08已同步云效：[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)（漏F2/误入F4）。3图+1JSON及正文图片引用回读通过，最新状态仍Failed；本次无CinLink重跑。

2026-11-10 LF17已同步云效：[FWXC-398](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f5f458852040ec3afba11cac2b)，3图+试听WAV+JSON共5附件及正文3个图片引用回读验证通过；保持Failed、语音检索能力范围待确认，无新查询。

名称检索已精简为5条P0：完整名称、部分名称、双文件、不存在、连续切换。原LF19合并LF18，LF23～27及LF29移出核心、均未执行，编号不复用。非名称LF30～35保持。

素材同步：新增[F5 / 7MB.mp4、F6 / 9s.mp4登记及用例关联](local-footage-p0-cases.md#lf-real-media)已核对。两片已在本轮G56上传、分析2/2并完成关联新增11条，7 Passed/4 Failed。LF01～03最新环境为生产，LF04～17为预发，不能作为单一环境批次统计通过率。

2026-11-10 [LF18～35本批报告](local-footage-results-staging-18-35-20261110.md)：11条活动用例7 Passed/4 Failed，当前全部28条已执行。新增失败未同步云效；旧缺陷链接保持原记录。

## 2026-11-24收尾

本轮全量预发已完成：27 Passed、1 Failed、0 Blocked/0 Not Run；失败原因及独立提示异常分开记录，详见[本轮报告](local-footage-results-staging-20261124.md)。固定脚本实现状态AUTO3/PLAN25，本轮不计固定自动化验证通过。
