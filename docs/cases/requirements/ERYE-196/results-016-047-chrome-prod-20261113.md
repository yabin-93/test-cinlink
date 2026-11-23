# ERYE196-016～047 Chrome生产执行记录（2026-11-13）

本批归档：15 Passed / 9 Failed / 7 Blocked / 1 Not Applicable，32条主用例均有结果，未将阻塞、不适用或未覆盖分支计为通过。按用户指定在Chrome生产环境执行，串行、已受理业务不重发，每例结束立即更新报告/正文/登记表。固定脚本接入继续暂停，32例均PLAN/正式路径为空；本轮临时原生控制辅助位于reports目录，不冒称正式自动化覆盖。

| 用例 | 结果 | 脚本状态 |
|---|---|---|
| ERYE196-016 | Blocked | PLAN；暂停接入 |
| ERYE196-017 | Failed | PLAN；暂停接入 |
| ERYE196-018 | Failed | PLAN；暂停接入 |
| ERYE196-019 | Failed | PLAN；暂停接入 |
| ERYE196-020 | Failed | PLAN；暂停接入 |
| ERYE196-021 | Blocked | PLAN；暂停接入 |
| ERYE196-022 | Blocked | PLAN；暂停接入 |
| ERYE196-023 | Failed | PLAN；暂停接入 |
| ERYE196-024 | Passed | PLAN；暂停接入 |
| ERYE196-025 | Passed | PLAN；暂停接入 |
| ERYE196-026 | Passed | PLAN；暂停接入 |
| ERYE196-027 | Passed | PLAN；暂停接入 |
| ERYE196-028 | Blocked | PLAN；暂停接入 |
| ERYE196-029 | Passed | PLAN；暂停接入 |
| ERYE196-030 | Failed | PLAN；暂停接入 |
| ERYE196-031 | Passed | PLAN；暂停接入 |
| ERYE196-032 | Passed | PLAN；暂停接入 |
| ERYE196-033 | Passed | PLAN；暂停接入 |
| ERYE196-034 | Passed | PLAN；暂停接入 |
| ERYE196-035 | Passed | PLAN；暂停接入 |
| ERYE196-036 | Passed | PLAN；暂停接入 |
| ERYE196-037 | Passed | PLAN；暂停接入 |
| ERYE196-038 | Passed | PLAN；暂停接入 |
| ERYE196-039 | Failed | PLAN；暂停接入 |
| ERYE196-040 | Passed | PLAN；暂停接入 |
| ERYE196-041 | Blocked | PLAN；暂停接入 |
| ERYE196-042 | Failed | PLAN；暂停接入 |
| ERYE196-043 | Blocked | PLAN；暂停接入 |
| ERYE196-044 | Failed | PLAN；暂停接入 |
| ERYE196-045 | Passed | PLAN；暂停接入 |
| ERYE196-046 | Not Applicable | PLAN；暂停接入 |
| ERYE196-047 | Blocked | PLAN；暂停接入 |

证据目录：reports/erye196-016-047-chrome-prod-20261113/。业务执行授权覆盖本批测试及必要测试素材准备；不将前批失败或未满足的素材条件直接算本批失败。无新云效同步授权，云效写入0，无Git提交推送。

## ERYE196-016：Blocked

已查看真实播放控制并逐帧前进，30fps源显示00:00.03/00:00:01帧；已回开头，片段仍20秒。页面未公布最短可编辑片段长度m，不能据播放步长推定裁剪下限；m前一点/m/后一点三组裁剪缺已明确基准，未自拟0.08秒，范围下限专项未覆盖。

证据：016-02-next-frame.json, 016-03-observed-frame-step.png, 016-05-close-controls.json。固定自动化PLAN，暂停接入。

## ERYE196-022：Blocked

本批尚未取得“A与配音关联不可解析”的已核准真实测试工程及可恢复备份；现有受控素材不满足异常关系前置。未自行篡改云端关系或伪造接口对象，破坏性编辑及拒绝/回滚分支未执行。

证据：fixture-manifest.json, progress.json。固定自动化PLAN，暂停接入。

## ERYE196-017：Failed

补充真实轨道及片段ID后Editor clip delete已执行。视频/原声/BGM由三段变0～5、5～15秒；49条字幕和6段配音仍在原时间，中段对白未删除，后段未前移，配音仍延伸19.96秒。刷新重开结果保持。未到达正确接缝与成片验收，不能以聊天完成判通过。

正式提示词：

> 删除这个5～10秒片段，采用波纹删除，后续片段前移5秒，关联内容同步

证据：017-real-locator-submission.json, 017-after-terminal.json, 017-persist.png, 017-persist.json。固定自动化PLAN，暂停接入。

## ERYE196-018：Failed

独立BSEG基线已恢复。Agent明确当前删除会联动BGM并波纹前移，没有关闭波纹或排除BGM的参数，因此未执行非波纹删除。刷新仍三段20秒、49字幕及6配音，5～10秒未形成目标空隙；后续接缝播放未执行。

正式提示词：

> 仅删除中间5～10秒片段，不移动其他片段，保持其他片段原时间位置。此为独立ERYE196-018，前例波纹处理不适用于本例。当前project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，中段clip_id=fe104aa2-4574-4fc0-be0c-949f26244441；原声track_id=9be8b000-1e97-4c4b-b516-24f97c762a5d，配音track_id=fb5ab195-2b8c-4aa3-a3e0-3f7520e1713d，字幕track_id=subtitle:file_cloud_nfazdjfy5stxlbyp5jkxws7fu3。删除目标绑定内容，后段保持10秒起点，保留5～10秒空隙，BGM不移动；只编辑当前工程。

证据：018-outcome.png, 018-formal-latest.json, 018-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-019：Failed

A20、49字幕及6配音基线已就绪。Agent明确不能凭真实轨道和片段ID完成完整关联复制，粘贴需要完整字幕块、配音对象及映射，因此未修改。刷新仍单段20秒；20～40秒副本及其独立字幕/配音未创建，改副本字幕步骤未到达。

正式提示词：

> 复制此片段并接到原片段之后，复制其关联字幕和配音，包含关联字幕和配音。独立ERYE196-019：当前A为0～20秒唯一视频，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387。字幕track_id=subtitle:file_cloud_nfazdjfy5stxlbyp5jkxws7fu3，配音track_id=fb5ab195-2b8c-4aa3-a3e0-3f7520e1713d。副本应在20～40秒、关联字幕和配音同步复制为独立实例。独立背景音乐不复制，原段和原字幕配音保持。只在当前工程编辑，不生成新视频。

证据：019-outcome.png, 019-formal-latest.json, 019-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-020：Failed

Editor timeline paste实际调用失败：parameters.clips.0.clip invalid anyOf，missing volume, opacity, transform, fade。刷新仍单段0～20秒、49字幕和6配音；20～40秒视频副本未创建。未点击重试，复制画面检查未到达。

正式提示词：

> 复制此片段并接到末尾，不复制关联字幕和配音。独立ERYE196-020：当前A为0～20秒唯一视频，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387，file_id=file_cloud_cx4k5vrzshywdkm2vjit6wh65h，源0～20秒，时间线0～20秒，速度1。仅复制视频片段接在20～40秒，不复制字幕、配音或背景音乐，原片段及其他原对象不变。只在当前工程编辑，不生成替代视频。

证据：020-tool-result.png, 020-formal-latest.json, 020-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-041：Blocked

本批未取得上传中、上传失败及U2私有图片三类可核准素材标识；现有logo-A/B均为U1有效本地素材，不能用自造ID替代无权限真实资产。复合替换水印+C1改文的三组负向场景未执行，不能据其他用例拒绝结果判通过。

证据：fixture-manifest.json, additional-fixtures.json。固定自动化PLAN，暂停接入。

## ERYE196-034：Passed

执行通过。BGM页面100%→50%（工具目标约0.501187），其他7段音频100%及静音状态保持；刷新后保持。同工程仅撤销本次降音导出0dB对照，再重做恢复；实际成片4.4～4.8秒无配音区间-28.0→-34.0dBFS，下降6.0dB。49字幕及各片段时间保持。已下载并对比成片音频；未做独立人工全片听审。

正式提示词：

> 只把背景音乐降低6 dB，其他音轨不变。独立ERYE196-034：当前project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，背景音乐track_id=6fdefde5-6725-4ceb-ac27-9ae6589742c8，唯一clip_id=489d8111-5770-461b-a746-35e9dc31e503，源和时间线0～20秒，当前volume=1即0dB。仅将这条BGM降6dB；原声/配音/视频/字幕的音量、静音、时间和内容保持。不新建工程、不生成替代视频。

证据：034-final.png, 034-persist.json, 034-audio-comparison.json, 034-export.mp4, 034-baseline-export.mp4。固定自动化PLAN，暂停接入。

## ERYE196-035：Passed

执行通过。真实工具先将BGM设-3dB，正式再降低6dB后页面71%→35%；请求处理中刷新恢复原任务，完成后重开仍35%，未到18%（约-15dB）。同工程成片4.4～4.8秒-37.0dBFS，相对0dB对照-28.0为-9.0dB。其他7音量/静音及内容保持。正式降音仅一次，覆盖实际页面刷新恢复；未人工重放接口或独立查询计费账本。

正式提示词：

> 只把背景音乐再降低6 dB。独立ERYE196-035：当前project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，BGM track_id=6fdefde5-6725-4ceb-ac27-9ae6589742c8，clip_id=489d8111-5770-461b-a746-35e9dc31e503，已准备当前-3dB基线；本次仅再降低6dB，其他轨道及内容不变。只执行一次，后续刷新仅恢复查看本次结果，不是新的降音请求。

证据：035-baseline.png, 035-restored.png, 035-final.png, 035-audio-comparison.json, 035-export.mp4。固定自动化PLAN，暂停接入。

## ERYE196-036：Passed

执行通过。BGM静音/取消静音两次真实工具完成，页面静音入口及刷新状态正确，片段音量始终50%（此前-6dB），其他7音量与原声/配音静音状态保持。实际同工程成片4.4～4.8秒：静音-91.0dBFS，解除后-34.0dBFS，与034降低6dB成片一致。字幕、视频及声音时间不变。未做独立人工全片听审。下载卡片异步出现时误取旧035文件已排除，按真正036成片验收，未重发业务或重复导出。

正式提示词：

> 只将BGM静音，保留它的音量参数。独立ERYE196-036，当前BGM已恢复-6dB基线（页面约50%），project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，track_id=6fdefde5-6725-4ceb-ac27-9ae6589742c8，clip_id=489d8111-5770-461b-a746-35e9dc31e503。只设置背景音乐静音，不把音量改成0，不改原声/配音或其他内容。；随后：取消BGM静音，音量不变。继续ERYE196-036：仅取消当前project_id=330d3e24-1ed7-40c1-a637-e6c20907beab内BGM track_id=6fdefde5-6725-4ceb-ac27-9ae6589742c8的静音，保留原先-6dB的片段音量参数（clip_id=489d8111-5770-461b-a746-35e9dc31e503），原声、配音、其他内容均不改。

证据：036-muted.png, 036-unmuted-persist.png, 036-final.png, 036-audio-audit.json, 036-muted-actual-export.mp4, 036-unmuted-export.mp4。固定自动化PLAN，暂停接入。

## ERYE196-037：Passed

执行通过。本例目标绑定实际D3 8.60～12.48秒，真实Editor clip place后为9.10～12.98秒；原位置不再有该片段，其他5配音及视频/原声/BGM时间和音量保持。目标被放到独立配音轨，未整体移动原配音轨。刷新保持；实际成片目标声音以+0.5秒偏移与原成片对照，PCM相关系数超过0.97，声音内容保持。未做独立人工全片听审。

正式提示词：

> 将此配音向后移动0.5秒，使用时间线坐标，其他音轨不动。独立ERYE196-037：目标为当前工程配音第三段，现时间线8.60～12.48秒（本例D3实际绑定这个真实片段），应改到9.10～12.98秒。project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，配音track_id=fb5ab195-2b8c-4aa3-a3e0-3f7520e1713d，clip_id=883c91a2-3752-4719-8d10-4c6025d39d44，源范围0～3.900952380952381秒，速度1.005400098183603。仅移动这一个配音片段的时间线起点，不裁源、不移动整条配音轨或其他5段；视频、字幕、原声、BGM及所有音量保持。只在当前工程编辑。

证据：037-outcome.png, 037-persist.png, 037-final.png, 037-audio-audit.json, 037-export.mp4。固定自动化PLAN，暂停接入。

## ERYE196-042：Failed

已补充49条真实字幕绑定、C1 block_id、6个dubbing_id与音频片段及两组voiceover_sources关联。最终明确ID输入已齐，但当前editor_batch_apply缺完整源绑定、跨裁头边界音频源裁切及关联同步能力，不能满足同组保存/一次撤销，整组未写入。刷新A20/49字幕/6配音/BGM0dB保持。未到达三项正确结果、撤销/成片/PB复核。长JSON草稿未发送，实际补槽分两条提交，非重发已完成业务。

正式提示词：

> 删掉这段前两秒，把这条字幕改成欢迎使用 CinLink，背景音乐降低 6 dB。独立ERYE196-042：当前project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，A唯一视频0～20秒，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387。仅删除A开头2秒，保留源2～20秒从时间线0秒起并同步关联字幕和配音；C1绑定原文strike、当前4.64～4.94秒，改为欢迎使用 CinLink，随裁头移到2.64～2.94秒；字幕track_id=subtitle:file_cloud_nfazdjfy5stxlbyp5jkxws7fu3。BGM track_id=6fdefde5-6725-4ceb-ac27-9ae6589742c8，clip_id=489d8111-5770-461b-a746-35e9dc31e503，当前0dB，仅降低6dB且固定时间位置不动。三项作为同组编辑一次提交，可一次撤销；其他内容不变，不生成替代视频或新工程。

证据：042-baseline.png, 042-outcome.png, 042-observed-association-slots.json, 042-dubbing-slots-latest.png, 042-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-043：Blocked

前置要求真实入口已支持一条完整复合修改。042补齐真实关联后仍明确不能完成裁头/字幕/配音联动的完整批次，未获得成功对照；本例末项无效音乐的整批回滚未执行，不能把042的能力拒绝当作043通过。

证据：042-dubbing-slots-latest.json, 042-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-047：Blocked

依赖已完成核心三项批次且为全局历史头；042未提交任何三项批次，本例没有可验证的完整业务组。未用三次手动编辑或034单音量组替代，整组一次撤销/重做及保存重开未执行。

证据：042-dubbing-slots-latest.json, 042-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-046：Not Applicable

按当前入口条件分支不适用。Chrome编辑器的“预览”用于播放现有时间线，未发现待修改方案的只读预览/再确认入口；本轮实际取得的是工程读取/view交换和直接编辑工具，没有已实现的待修改只读校验入口。未编造dry-run路由或把普通工作流审核当作工程编辑预览，T2更新后的确认分支未执行；结论限本轮可用页面/实测入口，不宣称枚举全部内部服务。

证据：042-persist.png, 042-persist.json, observed-project-responses.json。固定自动化PLAN，暂停接入。

## ERYE196-028：Blocked

页面仅显示“每条字幕字符数”排版合并设置60，不能当作单条文本最大长度L；当前可用入口/实际读取未公布L或计数单位。L−1/L/L+1边界缺核准依据，未自拟上限或制造超限失败，三组输入未执行。记录口径待确认，非已确认产品故障。

证据：034-persist.png, 042-persist.json, actual-timeline-locators.json。固定自动化PLAN，暂停接入。

## ERYE196-044：Failed

Agent明确当前批量工具没有在事务内引用本次新分割右段的能力，不能预填未生成clip_id；拆开调用无法保证失败无半成品，因此未先分割或提交修改。刷新仍单段视频20秒、49字幕及6配音/BGM基线；目标源0～5接6～20、19秒及整组撤销未达到。并非缺少可由用户补充的既有ID。

正式提示词：

> 先在A片段内部5秒处分割，再把新右段开头1秒删除并前移拼接，其他内容不变。独立ERYE196-044：当前A唯一视频时间线0～20秒、源0～20秒，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387。内部5秒即绝对5秒；目标保留源0～5与6～20，后段从时间线5秒接上，总长19秒。第二步必须针对本次新右段，同组处理、失败不留半成品；不生成替代视频或新工程。

证据：044-outcome.png, 044-formal-latest.json, 044-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-045：Passed

执行通过。Agent明确识别同一C1先删除再改文的冲突并拒绝整组写入，未擅自改成只改文或修改C2。刷新完整49条文字/时间与提交前一致，视频、原声、6配音及BGM片段清单相同；无半删除、无误改。未将负向请求改成合法业务后补算通过。

正式提示词：

> 删除C1，再把刚删除的同一条C1原文改为测试文字。独立ERYE196-045：C1指当前工程原文strike、时间线4.64～4.94秒，真实block_id=block_4d81f064e49fedd5d0156f11，字幕file_id=file_cloud_nfazdjfy5stxlbyp5jkxws7fu3，track_id=subtitle:file_cloud_nfazdjfy5stxlbyp5jkxws7fu3，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab。这是同一请求内依次操作刚删除的同一条C1，不是删除其他字幕；不得误改C2或留下只删除未改文的部分结果。其他字幕、视频和声音均不改。

证据：045-outcome.png, 045-final.png, 045-baseline-audit.json。固定自动化PLAN，暂停接入。

## ERYE196-019：Failed

续补完整49字幕绑定、6个dubbing_id、音频关联及原文/脚本父块定位后，Agent明确这些ID已齐。现有paste需完整展开对象，不能从源clip读取克隆整套关联且重建独立实例；即使读取字幕正文也不能补齐全部复制属性。仍未写入，刷新单视频20秒、49字幕及6配音保持；副本及改副本文字步骤未到达。为前次未执行操作补槽，未重发已执行业务。

正式提示词：

> 复制此片段并接到原片段之后，复制其关联字幕和配音，包含关联字幕和配音。独立ERYE196-019：当前A为0～20秒唯一视频，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387。字幕track_id=subtitle:file_cloud_nfazdjfy5stxlbyp5jkxws7fu3，配音track_id=fb5ab195-2b8c-4aa3-a3e0-3f7520e1713d。副本应在20～40秒、关联字幕和配音同步复制为独立实例。独立背景音乐不复制，原段和原字幕配音保持。只在当前工程编辑，不生成新视频。

证据：019-followup-reconnected.png, 019-complete-association-slots-submission.json, 042-observed-association-slots.json。固定自动化PLAN，暂停接入。

## ERYE196-024：Passed

执行通过。主原文Welcome 4～6秒精确改为Welcome to CinLink，中文欢迎及中英C2、时间和视频/原声保持；刷新及4.6秒预览均正确。正式时准备阶段额外挂载的独立英文SRT也保持原值，形成第三行旧Welcome，已按完整字幕列表识别而未误报产品失败。随后一次撤销正式改文、一次撤销多余英文轨，恢复原文Welcome/译文欢迎及两条C2的干净基线供025；未重发正式请求。

正式提示词：

> 仅把原文字幕原文改为Welcome to CinLink，译文字幕不变。正式ERYE196-024：当前E196-A20-controlled.mp4工程已核准双轨；目标为英文原文Welcome、时间线4～6秒。只改这一条英文原文为Welcome to CinLink；中文译文欢迎（4～6秒）、中文第二条字幕（10～12秒）和英文Second caption（10～12秒）均不改，时间、样式、原声、视频不变。不重新翻译、不生成配音或替代视频。

证据：024-bilingual-baseline.png, 024-final-audited.png, 024-caption-audit.json, 024-preview-4.6.png, 025-clean-bilingual-baseline.png。固定自动化PLAN，暂停接入。

## ERYE196-025：Passed

执行通过。仅C1中文译文欢迎→欢迎使用 CinLink，英文Welcome、中英C2及各起止时间保持；刷新及4.6秒预览正确。视频/原声仍0～20秒，无配音或新翻译任务。验收使用干净两组双语基线，无前例额外英文轨。

正式提示词：

> 只把C1的译文字幕译文改为欢迎使用 CinLink，原文字幕保持Welcome。正式ERYE196-025：当前E196-A20-controlled.mp4工程已有干净双语基线，C1为4～6秒，英文原文Welcome、中文译文欢迎；C2为10～12秒，英文Second caption、中文第二条字幕。仅把C1中文译文欢迎改为欢迎使用 CinLink，原文、两条C2、时间、样式、视频和原声不变，不生成配音或重新翻译整份字幕。

证据：025-clean-bilingual-baseline.png, 025-outcome.png, 025-persist-ready-0.json, 025-preview-4.6.png。固定自动化PLAN，暂停接入。

## ERYE196-026：Passed

执行通过。补齐实际原文file/block定位后，C1 Welcome 4～6→4.5～6.5秒；中文译文保持4～6秒，中英C2及视频/原声不变，刷新保持。4.4仅中文、4.6中英、6.4仅英文、6.6均无，符合独立原文时段。另一步只读导出实际editor-export.srt，核实仅两条原文、C1为04,500～06,500、C2为10～12，无已删除Middle或中文。边界检查期间有执行服务504提示，后续交付成功，保留为辅助观察，未独立归因。

正式提示词：

> 把C1原文字幕时间改为时间线4.5秒至6.5秒，文字和样式保持不变。正式ERYE196-026：当前E196-A20-controlled.mp4工程C1原文为Welcome、原时间4～6秒，对应中文译文欢迎；C2为10～12秒的Second caption/第二条字幕。只改目标C1时间，不改文案、样式、C2、视频或声音，关联按当前工程实际规则保持。修改保存后请提供当前已保存原文字幕的SRT以便核对本次实际时间，不使用修改前的旧SRT代替。

证据：026-real-locator-submission.json, 026-actual-project.json, 026-boundary-4.4.png, 026-boundary-4.6.png, 026-boundary-6.4.png, 026-boundary-6.6.png, 026-current-source.srt, 026-final.png。固定自动化PLAN，暂停接入。

## ERYE196-027：Passed

执行通过。三组从4～6秒独立基线分别请求(-1,2)/(5,4)/(3,3)，均在写入前明确拒绝并要求0≤开始<结束；反向未交换、负数未截0，零长按页面本轮明示规则拒绝。记录后取消待澄清，未替换成合法数据。刷新4条中英字幕文字/时间和视频/原声片段与基线一致。

证据：027-negative-submission.json, 027-negative-outcome.png, 027-reverse-submission.json, 027-reverse-outcome.png, 027-zero-submission.json, 027-zero-outcome.png, 027-validation-audit.json, 027-final.png。固定自动化PLAN，暂停接入。

## ERYE196-029：Passed

执行通过。按用例表格呈现后的实际字符提交中英日、一个真实换行及&和<测试>。保存刷新后编辑框值与独立输入全文完全一致，4.6秒预览三行（两行原文+独立中文译文）字符正常，无标签执行。实际当前SRT两条原文，C1文本/换行/特殊字符逐字匹配、C2和时间不变，已删除Middle及译文未混入。列表无障碍名称把换行展示为空格，已通过编辑框和文件核验，不误报数据丢失。

正式提示词：

> 请将当前C1原文完整改为下面JSON字符串text的实际值：{"text": "欢迎 CinLink 日本語 123\n第二行 & <测试>"}。正式ERYE196-029：\n表示一个真实换行，不是反斜杠加n；&、<、>是普通文本字符，不作HTML或标签执行，也不要替换为可见实体文字。目标当前4～6秒、原文Welcome，project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，原文file_id=file_cloud_wmb2ycdnyp2buwvkq7icgbuwcb，block_id=80c24d5c-c7cb-4086-89c5-73fed3058d23。只保存这条原文，中文译文欢迎、两条C2、时间、样式、视频和原声保持；本步不导出、不翻译、不生成视频。

证据：029-input-text.txt, 029-raw-text-editor.json, 029-preview-4.6.png, 029-current-source.srt, 029-final.png。固定自动化PLAN，暂停接入。

## ERYE196-030：Failed

实际页面已建立40号/白色共享样式并刷新确认。正式请求明确只改C1为48/#FFFF00，Agent说明当前工具仅支持工程共享样式，不能按单条字幕独立修改，未用全局修改替代，目标效果未达到。刷新后4条中英字幕、时间及共享40/白色保持。提交前输入同步故障经刷新/原生清空粘贴恢复，正式请求仅受理一次。

正式提示词：

> 仅将C1原文字号设为48，颜色#FFFF00，其余字幕及译文样式保持不变。正式ERYE196-030：当前E196-A20-controlled.mp4的字幕已通过页面准备为Arial、40号、白色。C1原文Welcome 4～6秒，project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，原文file_id=file_cloud_wmb2ycdnyp2buwvkq7icgbuwcb，block_id=80c24d5c-c7cb-4086-89c5-73fed3058d23。只此C1原文变48/黄色；中文译文欢迎及中英C2（Second caption/第二条字幕，10～12秒）保持40/白色，不改变文字、时间、视频或声音，不用整份全局样式修改替代单条范围，不生成替代视频。

证据：030-baseline-40-white.png, 030-outcome.png, 030-saved-style-proof.png, 030-saved-style-proof.json。固定自动化PLAN，暂停接入。

## ERYE196-031：Passed

执行通过。新增7～9秒原文新增测试，刷新仅1条新对象，其他4条中英字幕保持。删除触发真实block_id澄清，从实际工程GET读取caption_d38f1e2948bd3a48e93357246f7b7d73，按页面JSON填写file_id/block_ids及reject_if_linked后继续原任务，成功只删新增对象。刷新4条字幕文字/时间、视频/原声清单与独立基线完全一致；未删除原始素材。

正式提示词：

> 在原文字幕新增7～9秒字幕，文字为新增测试，不改变其他字幕。正式ERYE196-031：当前project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，原文file_id=file_cloud_wmb2ycdnyp2buwvkq7icgbuwcb，原文track_id=ab2ae7a6-fa5f-432a-afc9-56b35f49c9a8，clip_id=f9ddd7f7-2e91-49ba-9ca8-547952cca6e3。当前有效原文只有Welcome 4～6秒、Second caption 10～12秒，7～9秒无有效字幕。只新增这一条原文，不新增中文译文，不改已有中英C1/C2、视频、原声、样式。本步骤只新增，完成后请给出可定位新增字幕的信息以便后续删除，不生成视频或新工程。；随后：删除刚新增的那一条原文字幕“新增测试”，时间线7～9秒。继续ERYE196-031：当前project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，原文file_id=file_cloud_wmb2ycdnyp2buwvkq7icgbuwcb，刚才新增已刷新确认仅此一条匹配。只删除这个新增对象，保留原有中英C1（4～6秒Welcome/欢迎）和中英C2（10～12秒Second caption/第二条字幕）、视频、原声和样式，不删除原始素材，不生成视频或新工程。

证据：031-add-outcome.png, 031-added-persist.png, 031-current-object-project.json, 031-delete-clarification-args.json, 031-clarification-filled.json, 031-delete-final-status.png, 031-deleted-persist.png。固定自动化PLAN，暂停接入。

## ERYE196-038：Passed

已保存并刷新：仅文字水印内容由E196-A改为“CinLink 回归 #196”。实际工程完整content深比较仅text.text一项变化；文字仍右上75%不透明度，独立图片水印仍左上100%，共享全片时段不变。实际导出MP4首帧可读中文文字且原图片水印保留。

正式提示词：

> 只把此文字水印改成CinLink 回归 #196，其位置、时间及透明度保持不变。正式ERYE196-038：当前project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，文字watermark_id=2b8f3abd-90c4-4ba6-91cb-fcbc1d470c48，现文字E196-A、右上、边距24px、不透明度75%、Geist 28px半粗、颜色#F6BBD3、全片0～20秒。仅替换文字内容；图片watermark_id=erye196-wimg-a-20261113（logo-A，左上24px、宽120px、不透明度100%）及所有其他属性、字幕、视频、声音均保持。在当前既有工程完成并保存，原始素材保持可用。

证据：038-content-audit.json, 038-after-project.json, 038-after-persist.png, 038-export.mp4, 038-export-frame0.png。固定自动化PLAN，暂停接入。

## ERYE196-039：Failed

已执行完整指令。应用明确文字与图片共享显示时段，无法仅把文字改为5～10秒且图片仍全片；因此未提交任何修改。刷新后的实际工程content与038后基线完全一致，文字仍右上75%且全片；独立水印时段需求未实现。未产生符合要求的版本，边界预览及该版本导出分支未覆盖。

正式提示词：

> ERYE196-039：当前工程79784c8a-b5f7-4497-9929-1ea23b39d838，只调整文字水印watermark_id=2b8f3abd-90c4-4ba6-91cb-fcbc1d470c48（CinLink 回归 #196）：把此水印设为右下角，显示在时间线5～10秒，不透明度50%。保留文字内容、颜色、字体字号及其他属性。其他水印不变：图片水印erye196-wimg-a-20261113继续左上角margin24、宽120、不透明度100%，仍全片0～20秒显示；不得把图片水印的时段一起改为5～10秒。视频、音频、字幕均不变。请实际执行并保存当前工程。

证据：039-outcome.png, 039-formal-latest.json, 039-after-project.json, 039-saved-no-change.png。固定自动化PLAN，暂停接入。

## ERYE196-040：Passed

已按实际稳定file_id替换为logo-B.jpeg鸟群照片。刷新后完整content深比较仅image.file_id一项变化，图片ID、左上24px/宽120/100%不透明度及全片时段，文字水印与字幕、视频、音频均保持。实际导出MP4首帧可见鸟群图片及原文字。原logo-A仍在页面实际GET素材列表；未独立下载原资产做字节校验。

正式提示词：

> ERYE196-040：当前既有工程79784c8a-b5f7-4497-9929-1ea23b39d838，只将图片水印watermark_id=erye196-wimg-a-20261113替换成已登记的logo-B.jpeg，稳定file_id=file_cloud_wvmacro6uwci2xqdhqxwle6lpc（鸟群照片）；原图片为logo-A.png，file_cloud_3f35z6rzcmkprtduwrvioqeopg。只改图片素材引用，保留图片位置左上角、margin_px24、宽120、不透明度1及全片0～20秒时段，保留其watermark_id。文字水印2b8f3abd-90c4-4ba6-91cb-fcbc1d470c48“CinLink 回归 #196”仍右上、75%、全片，所有字幕、视频、音频均不变。不得删除logo-A资产、不新建工程、不生成替代视频。请实际执行并保存。

证据：040-outcome.png, 040-content-audit.json, 040-after-project.json, 040-original-asset-retained.json, 040-after-persist.png, 040-export.mp4, 040-export-frame0.png。固定自动化PLAN，暂停接入。

## ERYE196-033：Passed

已核当前独立烧录素材工程只有20秒视频和关联原声、无可编辑字幕轨。改第一句请求明确说明无法定位可编辑字幕、烧录文字不能直接替换，未冒称修改成功，也未启动转写/生成或覆盖源视频。刷新实际工程content与基线完全一致；4.6秒仍保留原画面烧录Welcome。未接受后续转写建议。

正式提示词：

> 将片中字幕第一句改为欢迎使用 CinLink。ERYE196-033：只处理当前E196-BBURN20.mp4既有工程的第一句，不改其他工程，不覆盖原始视频资产。

证据：033-fixture-no-cues.png, 033-before-project.json, 033-outcome.png, 033-after-project.json, 033-preservation-audit.json, 033-burned-preview.png。固定自动化PLAN，暂停接入。

## ERYE196-032：Passed

独立受控合成语音基线：Welcome约4.1～4.622秒，CinLink约5.1秒开始，5秒为词间静音；这是已知合成安排，未冒称人工听审。原文C1已分成“Welcome ”4～5与“CinLink”5～6，拼接与原文字完全一致无丢重；译文“欢迎”仍4～6，两通道C2及视频/原声保持。刷新保存及4.6/5.4秒实际预览均正确。实际工程仅原文分段布局发生业务变化；新增的冗余clip.track_id与父轨ID一致，非误改译文。

正式提示词：

> 在时间线5秒处分割这条原文字幕，保留对应文本内容，译文通道不改。ERYE196-032：当前既有工程ce937560-85f3-4ac0-89f7-928e0ab530e3，原文file_id=file_cloud_vjueb372vpunby6rqopmkvqklx，track_id及clip_id均subtitle:file_cloud_vjueb372vpunby6rqopmkvqklx，C1 block_id=block_425b390dc79fd020fdff07d8，原文Welcome CinLink，时间线4～6秒；在5.0秒形成4～5和5～6两条原文。独立受控合成语音时间安排为Welcome从4.1秒开始并在约4.622秒结束，CinLink从5.1秒开始，5秒切点处为静音间隔；可据此分配Welcome到左段、CinLink到右段，不丢失或重复文字。该金标是已知合成时间安排，不冒称人工听审。译文轨/片段subtitle:file_cloud_3pwp3ol7v7epzzslp2vuoktovw、C1 block_ad9abc74102790a1c00fc848仍“欢迎”4～6一条，不分割或改文。两通道C2、视频及原声均保持，不新建工程、不生成替代视频。请实际执行并保存。

证据：032-fixture-manifest.json, 032-speech-boundaries.json, 032-before-project.json, 032-outcome.png, 032-after-project.json, 032-split-audit.json, 032-preview-4.6-clear.png, 032-preview-5.4-clear.png。固定自动化PLAN，暂停接入。

## ERYE196-021：Blocked

基本串行重排已实际完成并保存：B源0～10移至时间线0～10，A源0～20移至10～30；原声同样随动，完整content与仅四个timeline_start_sec变更的独立期望完全一致，30秒总长及源入出点、速度、音量保持。0秒/10.5秒预览核对B→A。完整用例仍受阻：准备请求明确无法建立B关联字幕/配音及固定BGM；单独BGM准备未写入，页面导入后素材库持续加载，也未添加音乐轨。故关联随动、固定BGM保持及同版成片/声音分支未覆盖，不把基本重排局部结果计为整例Passed。

正式提示词：

> ERYE196-021主分支：将B片段放到A之前，使用按串行顺序重排；原声跟随对应画面，保持各自完整源内容和总长30秒。当前工程911357d1-f77d-42d4-800e-83665875ab14；视频track_id=2caedb6f-7e33-4e68-b436-5476ee08e552，A clip_id=8a3ca444-8bc9-4a3f-bf2b-e7ac2b88f540，file_cloud_cx4k5vrzshywdkm2vjit6wh65h，源0～20现时间线0～20；B clip_id=5508cfe6-5c9b-4d44-83eb-a53a1d4ba0ea，file_cloud_iuawwsaf37bq35uvr3wjvg5oof，源0～10现时间线20～30。原声track_id=a4cc654d-9916-4976-bbb7-46e6155d7ece；A原声86c094a5-35f5-42fd-8628-1c95c7842407，B原声0d3f35f4-6a07-4008-8b51-8183144c6edb。目标B在0～10，A在10～30，原声同步，不改变源入出点、速度、音量或素材。此前B关联字幕/配音及固定BGM准备未成功，这些分支未覆盖且不虚构已存在；现在先实际完成可独立执行的基本串行重排，不因缺少这些前置而跳过基本顺序验证。不新建工程或生成替代视频，请保存当前工程。

证据：021-initial-project.json, 021-preparation-outcome.png, 021-prepare-fixed-BGM-latest.json, 021-BGM-library-loaded.json, 021-core-outcome.png, 021-after-project.json, 021-core-reorder-audit.json, 021-preview-B-head.png, 021-preview-A-10.5.png。固定自动化PLAN，暂停接入。

## ERYE196-023：Failed

CFR29.97样本已完成三刀、裁尾、保存重开和实际导出。实际导出第299帧显示SRC299，第300帧显示SRC301，源SRC300被跳过；首刀后约1帧固定画面前移，后两刀未继续累加，音频首中末零偏移。以分割后源内容丢失判Failed，不自行设同步毫秒阈值。CFR最后黑场由本轮明确保持末条字幕至32秒、视频裁至31.9653秒的测试参数引入，排除为产品缺陷。此处为CFR阶段结论；VFR完整终态见下方最新023章节。

正式提示词：

> ERYE196-023的CFR29.97样本，先执行第一刀：在时间线10.01秒附近的合法帧边界分割当前唯一视频，原声同步，保留完整源内容和全部85条逐词字幕。项目72334178-7e96-4d12-b2a5-40a6243138cc，实际项目fps=29.97，视频track_id=21cb8bde-a279-4958-90a5-e8ae295987bb，clip_id=a8b30cc7-31df-4f48-b029-da68a571eb2a，file_id=file_cloud_j4cknpzljr6jmnut4xbcsposqi，源0～31.998634、时间线0起、速度1；原声track_id=8f22c4ca-f415-4d3e-89e7-f2d8b014812f，clip_id=ab851366-f0e1-4765-9905-162b9bd132b9同源同时间。源帧时间戳有10.01秒，若需按项目帧对齐，用第300帧约10.01001秒并记录实际切点，允许正常源帧/项目帧映射，不自行发明同步阈值。本轮仅做第一刀并保存，暂不做20/30秒下一刀或裁剪；不要求多刀原子事务，不新建工程或生成视频。请实际执行，不只描述计划。

证据：023-source-pts-gold.json, 023-cfr-before-project.json, 023-cfr-final-project.json, 023-cfr-project-audit.json, 023-cfr-file-audit.json, 023-cfr-export.mp4, 023-cfr-exact-export-frame-299.png, 023-cfr-exact-export-frame-300.png。固定自动化PLAN，暂停接入。

## ERYE196-023：Failed

两种样本均实际完成三次分割、裁尾、保存重开和同版本导出。CFR：源30000/1001、项目29.97fps，切点10.01001001/20.02002002/30.03003003秒，尾端31.96529863；实际导出帧299=SRC299、帧300=SRC301，切点跳过源SRC300。VFR：源PTS间隔0.03337/0.06673秒、项目21.001fps，切点9.99952383/19.99904766/29.99857150秒，尾端31.95085948，末cue已同步截尾、其他84cue不变；导出帧419（19.951431秒，第二切点之前）为黑画面仅留字幕，独立源同期有人像，帧420恢复。两版首中末PCM对照均零偏移，相关系数0.9989～0.9999。基于源画面丢失/内部切点黑帧判Failed，不用未冻结毫秒容差定性。CFR最后黑场由本轮明确保持末字幕至32秒的测试参数引入，已排除；VFR中段黑帧与该尾端参数无关。未做人工全片听审。

正式提示词：

> ERYE196-023的CFR29.97样本，先执行第一刀：在时间线10.01秒附近的合法帧边界分割当前唯一视频，原声同步，保留完整源内容和全部85条逐词字幕。项目72334178-7e96-4d12-b2a5-40a6243138cc，实际项目fps=29.97，视频track_id=21cb8bde-a279-4958-90a5-e8ae295987bb，clip_id=a8b30cc7-31df-4f48-b029-da68a571eb2a，file_id=file_cloud_j4cknpzljr6jmnut4xbcsposqi，源0～31.998634、时间线0起、速度1；原声track_id=8f22c4ca-f415-4d3e-89e7-f2d8b014812f，clip_id=ab851366-f0e1-4765-9905-162b9bd132b9同源同时间。源帧时间戳有10.01秒，若需按项目帧对齐，用第300帧约10.01001秒并记录实际切点，允许正常源帧/项目帧映射，不自行发明同步阈值。本轮仅做第一刀并保存，暂不做20/30秒下一刀或裁剪；不要求多刀原子事务，不新建工程或生成视频。请实际执行，不只描述计划。

证据：023-source-pts-gold.json, 023-cfr-project-audit.json, 023-cfr-file-audit.json, 023-cfr-export.mp4, 023-cfr-independent-source-frame-300.png, 023-cfr-exact-export-frame-299.png, 023-cfr-exact-export-frame-300.png, 023-vfr-final-project.json, 023-vfr-project-audit.json, 023-vfr-file-audit.json, 023-vfr-export.mp4, 023-vfr-exact-source-frame-419.png, 023-vfr-frame-19.95.png, 023-vfr-exact-export-frame-420.png。固定自动化PLAN，暂停接入。

## 本批结果范围

失败：017、018、019、020、023、030、039、042、044。阻塞：016（最短片段m未明确）、021（基本B→A已保存，但B关联字幕/配音及固定BGM前置未完成）、022（真实异常关联样本未取得）、028（字幕最大长度L未明确）、041（三类异常/无权限图片前置未取得）、043/047（完整复合正向基线未成立）。046未取得当前可用的独立只读变更预览/确认入口，记Not Applicable。

023的CFR/VFR参数分支均已完成编辑、重开和实际文件核验；两类故障分别保留证据，普通VFR转帧产生的源帧采样变化未套用CFR一一对应标准。全部固定自动化仍PLAN、正式脚本路径为空。临时原生控制/文件分析辅助只保存在忽略的reports目录。云效写入0，无Git提交推送。

<!-- ERYE196-016-047-SYNC-20261116 -->

## 2026-11-16 ERYE196-016～047失败用例云效同步

本批9条失败用例已提交并回读验证 9/9。证据来自2026-11-13 Chrome生产实测，本次只整理和同步，没有重跑业务。

| 用例 | 云效缺陷 | 证据图片 | 附件总数 | 回读 |
|---|---|---:|---:|---|
| ERYE196-017 | [FWXC-568](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=24d6c75a4ae0f4515e048c03f6) | 1 | 2 | 通过 |
| ERYE196-018 | [FWXC-569](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=3277b0dd0d3c2757e9b8ca2433) | 1 | 2 | 通过 |
| ERYE196-019 | [FWXC-570](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=be00a6e5339d212047f51effa0) | 1 | 4 | 通过 |
| ERYE196-020 | [FWXC-571](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0b999d9b0e437d38a831abdf4d) | 1 | 2 | 通过 |
| ERYE196-023 | [FWXC-572](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=610b6e5c26545cf72f39c59305) | 6 | 17 | 通过 |
| ERYE196-030 | [FWXC-573](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8d1b8540c0cf21b590f2227d55) | 2 | 4 | 通过 |
| ERYE196-039 | [FWXC-574](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=195cd4ac7bc54c6f328dd09357) | 1 | 4 | 通过 |
| ERYE196-042 | [FWXC-575](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a9bc07c8eb8dc0d94121ace240) | 1 | 4 | 通过 |
| ERYE196-044 | [FWXC-576](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b61c78db4565d570e8309f1897) | 1 | 2 | 通过 |

每个标题包含用例编号，前置步骤已精简，完整原指令及必要补槽值保留。9条原生浏览器截图及6张源/成片原始帧图按实际场景选择；另附脱敏审计、补槽原文和023复现视频/SRT。状态为🤔AI提缺陷，负责人余航，迭代重构10-29，生产环境；017、023高/2-严重，其余中/3-一般。沿用本项目普通新缺陷不去重设置，旧缺陷未修改；7条Blocked及1条Not Applicable未提单。原15 Passed/9 Failed/7 Blocked/1 Not Applicable不变，固定脚本仍PLAN/路径空，暂停接入；未提交或推送Git。

<!-- END-ERYE196-016-047-SYNC-20261116 -->

## 2026-11-16 ERYE196-016采用编辑器默认裁剪边界

用户确认016采用“默认编辑器长度”，并明确“先更新用例，暂不补跑”。新版以当前裁剪控件默认允许范围、吸附及防护验收，不再等待公开固定m；实际边界在后续执行中核实，不能把逐帧播放步长直接当成最短长度。新版Not Run，旧版2026-11-13 Blocked仅保留为历史执行记录，旧阻塞原因不再适用于新版。脚本仍PLAN/路径空。本次无生产编辑、云效或Git写入。

[016 revision](revision-016-default-editor-boundary-20261116.md)

## 2026-11-16 ERYE196-028改为字符数滑杆与字幕换行

用户澄清“60字符就是拖拽字符数，字幕字符数跟着拖拽字符数换行”。028已从最大文本长度L边界测试改为“每条字幕字符数”滑杆的分组/换行功能验证：在固定原文、字号和画布条件下拖至60及两侧实际合法值，核对布局变化、全文完整、顺序和讲话对应，再恢复原值。不再要求公布L或执行L−1/L/L+1输入。新版Not Run，旧版2026-11-13 Blocked及证据保留为历史，旧阻塞原因不再适用于新版。此次只更新文档，无生产操作或云效写入；脚本仍PLAN/路径空。

[028 revision](revision-028-character-slider-wrapping-20261116.md)

## 2026-11-16 ERYE196-028字符数滑块范围确定为6～100

以用户最新澄清“拖拽字符数上限是6-100”为准：滑块范围6～100（含端点），60为合法中间值，取代“60为滑块上限”的口头说法。028现覆盖6、60、100的分组/换行效果，以及6处继续向小、100处继续向大拖拽的边界防护；滑块范围不等同于原文字数上限。仍只更新用例，未执行生产操作，新版Not Run，旧Blocked保留历史，脚本PLAN/空路径保持；无云效或Git写入。

[028 revision](revision-028-character-slider-wrapping-20261116.md)
