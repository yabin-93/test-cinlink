---
requirement: ERYE-210
case_prefix: ERYE210
automation_tag: "@ERYE-210"
acceptance_basis: "page-business-or-observed-api"
---

# 编辑器默认TAB调整 详细测试用例

更新：2026-11-05。按用户最新要求，**以页面业务表现、实际文件或已实现接口的真实业务结果验收**。需求正文/评论只追踪业务意图，不把其中拟定的接口名、字段、错误码或内部算法当通过条件。先读[三需求统一业务验收口径](../../editor-business-acceptance.md)和[本需求前置数据](test-data.md)。

本需求54条，编号、优先级和需求来源保持；本次只优化，未新增执行。全部[PLAN]/Not Run，未增加自动化或执行通过数。

每例只准备相关素材/对象，不要求不相关完整B0；使用当前已实现的目标选择或明确工程、时间和原文，不强制对象引用标签。接口专项必须先有从页面或已实现服务取得的真实请求；没有拟定字段/端点不能据此判产品失败。已确认页面业务缺失仍应记录未实现/未通过，不能用“接口不一样”掩盖。

导航仍按用户确认的最新主页面 **Media → Scripts → Captions → Voiceover → Watermark**，不增加第六入口；拟定但尚未确认的用户交互只记录适用边界，不强行套用内部锁/草稿键/逐词分配算法。

## 最新主页面导航与入口定位

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-001 | P0 | P；NAV-V：已确认最新Figma主编辑页；视频工程PA可写 | 1. 打开主编辑器观察右侧入口。<br>2. 依次进入Media、Scripts、Captions、Voiceover、Watermark。<br>3. 返回原入口。 | 按确认主页面呈现五入口及顺序，每个可达；不以旧六TAB、属性/效果包装/剪辑偏好待定稿判通过条件。 | Source: Requirement + Mockup；ERYE-210 Figma 1501:27513；N01/N09；AC01 | [PLAN] | — | 业务验收；验证五入口名称顺序与可达性；Functional；Major；Not Run |
| ERYE210-002 | P0 | P；新视频/空白视频工程无本设备偏好；另有显式素材入口 | 1. 从新导入视频打开编辑器。<br>2. 退出后从显式素材入口再进。<br>3. 查看选中入口和目标素材。 | 首次定位Media；显式素材入口优先定位其对象；仅导航不转写/生成、不增内容版本。 | Source: Requirement + Mockup；ERYE-210 N03；Figma 1501:27513；AC01/02 | [PLAN] | — | 业务验收；验证默认视频与素材入口进入Media；Functional；Major；Not Run |
| ERYE210-003 | P0 | P；PA已有字幕；无视图偏好；从添加或翻译字幕结果进入 | 1. 点击明确字幕编辑入口。<br>2. 查看Captions内容页及工程。<br>3. 对照结果绑定ID。 | 进入Captions内容及正确工程，不落Voiceover/旧语音；仍可访问其他四入口。 | Source: Requirement + Mockup；ERYE-210 N03；Figma 1528:28905；AC01 | [PLAN] | — | 业务验收；验证字幕结果进入Captions内容；Functional；Major；Not Run |
| ERYE210-004 | P0 | P；PA有合法配音任务结果；当前记忆位置为Media | 1. 从明确配音/旁白结果编辑入口进入。<br>2. 核对目标和文稿。 | 显式功能入口优先于记忆，定位Voiceover；不改工程/重新生成，文稿与目标一致。 | Source: Requirement + Mockup；ERYE-210 N03；Figma 1528:29415；AC01 | [PLAN] | — | 业务验收；验证翻译配音旁白结果进入Voiceover；Functional；Major；Not Run |
| ERYE210-005 | P0 | P；PA有语音；从去口水词入口打开 | 1. 从明确清理入口进入。<br>2. 核对Scripts文稿/候选区域。<br>3. 返回主时间线。 | 按最新主页面Scripts承接清理；不把清理与Voiceover混用；有无分析结果均不因打开而自动应用。 | Source: Requirement + Mockup；ERYE-210 N03/04；Figma 1528:27906/30581；AC01/05 | [PLAN] | — | 业务验收；验证清理入口进入Scripts而非配音；Functional；Major；Not Run |
| ERYE210-006 | P0 | P；PA有画面；有已保存位置Captions | 1. 从文字水印明确入口进入。<br>2. 从图片水印入口再进入。<br>3. 切Text/Image。 | 进入Watermark对应Text/Image子页；功能入口优先；只切子页不改水印资产、参数或版本。 | Source: Requirement + Mockup；ERYE-210 N03；Figma 1528:29983/32726；AC01/02 | [PLAN] | — | 业务验收；验证显式水印入口与TextImage子页；Functional；Major；Not Run |
| ERYE210-007 | P0 | P；PA本设备已记Watermark/Image；另有旧voice状态；无显式功能入口 | 1. 关闭重开PA。<br>2. 清除新记忆仅保留旧voice再重开。<br>3. 最后移除两者以首次场景打开。 | 依次采用本设备工程记忆、有效旧映射、首次场景默认；不因任务类型永久限制入口。 | Source: Requirement；ERYE-210 N03/09/10；AC02/11 | [PLAN] | — | 业务验收；验证记忆与旧视图映射优先级；Functional；Major；Not Run |
| ERYE210-008 | P0 | P；实际产品有可复现的过期/无效导航偏好或旧链接；记录其真实页面入口 | 1. 从该无效偏好/旧链接打开PA。<br>2. 检查可用导航与工程内容。<br>3. 选择一个合法入口后重开。 | 安全回到实际默认Media或明确可用入口，无白屏和内容误改；合法位置能按当前业务记忆恢复。 | Source: Requirement；ERYE-210 N03/10；AC02/11 | [PLAN] | — | 业务验收；验证未知模块或子页安全回Media；Negative；Major；Not Run |
| ERYE210-009 | P0 | P；PA暂停在12秒，选C1，记录版本/任务/费用 | 1. 完整切五入口及可见子页。<br>2. 返回原入口。<br>3. 对照播放头、选区及云端状态。 | 工程标识/播放头/选区保留；无内容改动则无版本、生成任务或费用；不因当前入口改Agent目标。 | Source: Requirement；ERYE-210 N01；AC02 | [PLAN] | — | 业务验收；验证切换全部入口保持播放位置选区工程；Functional；Major；Not Run |
| ERYE210-010 | P0 | P；U1两工程PA/PB、两设备D1/D2；U2独立账号 | 1. D1在PA选Captions、PB选Media；D2在PA选Watermark。<br>2. 逐一重开。<br>3. 退出切U2。 | 按账户/工程/设备隔离恢复，D2不强制覆盖D1；U2不继承U1位置或草稿；不推进媒体版本。 | Source: Requirement；ERYE-210 N09；AC02 | [PLAN] | — | 业务验收；验证视图按账号工程设备隔离；Functional；Major；Not Run |
| ERYE210-011 | P0 | P；PA的Voiceover任务处理中；当前查看PB的Media；F可放行 | 1. 放行PA任务。<br>2. 观察PB视图。<br>3. 明确点PA结果卡定位。 | 完成只更新PA状态，不抢PB/Media；用户明确点卡才切到PA相关入口。 | Source: Requirement；ERYE-210 N03/08；206 AC20；AC09 | [PLAN] | — | 业务验收；验证任务完成不改变当前入口或工程；Functional；Major；Not Run |

## 空态、能力、权限与处理中

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-012 | P0 | P；PA无字幕cue/配音，但有可用视频语音；实际页面入口O已登记 | 1. 打开Captions及Voiceover。<br>2. 查看生成/导入/添加引导。<br>3. 不点击执行，观察任务与版本。 | 模块可开，提供对应已发布入口；未点击不转写/翻译/生成；无内容不会隐藏整个模块。 | Source: Requirement；ERYE-210 N01/02；AC03 | [PLAN] | — | 业务验收；验证无字幕配音的引导不自动生成；Functional；Major；Not Run |
| ERYE210-013 | P0 | P；仅音频工程P_AUDIO，无可视画面 | 1. 打开五入口和Watermark。<br>2. 尝试添加/修改文字或图片水印。 | Watermark可浏览，具体写操作因无画面禁用并说明；不提交无效命令；不因入口隐藏误判无功能。 | Source: Requirement；ERYE-210 N01/02；AC04 | [PLAN] | — | 业务验收；验证音频工程水印操作不可用；Functional；Major；Not Run |
| ERYE210-014 | P0 | P；PA只读授权；存在字幕、配音和水印 | 1. 切五入口查看内容。<br>2. 尝试修改，并以请求作服务端对照。 | 可读内容及导航可用，写按钮明确受限；服务端也独立拒绝，不只靠UI禁用。 | Source: Requirement；ERYE-210 N02；AC04；196 WAC31 | [PLAN] | — | 业务验收；验证只读工程各入口可浏览但写受限；Permission；Critical；Not Run |
| ERYE210-015 | P0 | P；PA可写，未选片段；O列片段编辑前提 | 1. 在Scripts相关剪辑操作尝试作用于选区的命令。<br>2. 选明确片段后重试。 | 缺选区显示请先选择片段，不猜全片；选中有效对象后按能力恢复可用；其他浏览不受阻。 | Source: Requirement；ERYE-210 N02；v1.1第一节；AC04 | [PLAN] | — | 业务验收；验证缺选区禁用具体片段编辑；Functional；Major；Not Run；操作表O/入口位置待交付 |
| ERYE210-016 | P0 | P；O：同一操作分别未发布、已发布但当前端不支持 | 1. Web/mac分别打开对应入口。<br>2. 核对可见操作及限制说明。 | 未发布不显示操作入口；已发布但端不支持明确端限制；不因起始任务类型永久隐藏模块。 | Source: Requirement；ERYE-210 N02/N09；AC01/04；NAV-R05 | [PLAN] | — | 业务验收；验证未发布与端侧不支持反馈区分；Functional；Major；Not Run |
| ERYE210-017 | P0 | P；PA已有字幕和旧配音；F使新配音生成失败 | 1. 发起明确新配音生成并等待失败。<br>2. 切入口查看原内容、原因与重试。<br>3. 修复后重试。 | 旧内容/文稿保留，错误可见；重试仍PA，不重复建结果或错误工程；不会清空旧音频。 | Source: Requirement；ERYE-210 N02/05；AC06/09 | [PLAN] | — | 业务验收；验证失败保留旧内容且重试原工程；Functional；Major；Not Run |
| ERYE210-018 | P0 | P；实际页面已有任务处理中可/不可编辑范围说明；有目标C1和独立C2；未确认细分规则则仅记录观察 | 1. C1生成期间尝试页面允许的C2修改。<br>2. 对不可编辑目标尝试一次修改。<br>3. 浏览五入口并等任务结束，核对两条内容。 | 可用/禁用状态和实际结果一致，不覆盖新改文、不留下半组修改；浏览保持可用；不将拟定对象锁、依赖锁或版本检查机制作为验收。 | Source: Requirement；ERYE-210 v1.1第一节；NAV-R03；N08 | [PLAN] | — | 业务验收；任务处理中允许和受限操作结果一致；Integration；Major；Not Run |
| ERYE210-019 | P0 | P；真实页面有受限轨道或不能完成关联同步的测试场景；无该业务入口则不适用 | 1. 提交含冲突对象和合法对象的批次。<br>2. 查看拒绝与原内容。 | 实际受限操作有明确反馈，不能无提示跳过一项留下半成品；五入口仍可浏览。 | Source: Requirement；ERYE-210 v1.1第一节；NAV-R03 | [PLAN] | — | 业务验收；受限轨道或同步异常不留半成品；Negative；Major；Not Run |

## 文字草稿和控件操作

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-020 | P0 | P；PA有已保存配音稿“原稿”及旧音频；无其他草稿 | 1. 在Voiceover输入“新稿未提交”，不保存。<br>2. 切Captions再回Voiceover。<br>3. 明确保存，再撤销一次。 | 按实际已确认的保存方式保留输入或给明确未保存处理，不在切页时无提示丢稿/生成声音；明确保存后重开一致，可用撤销恢复原文。 | Source: Requirement；ERYE-210 v1.1第二节；NAV-R01；AC10 | [PLAN] | — | 业务验收；验证配音文稿切页保留未提交草稿；Functional；Major；Not Run |
| ERYE210-021 | P0 | P；PA C1和W_TEXT已保存；字段可输入 | 1. 独立场景对C1原文和W_TEXT输入未提交新文。<br>2. 每次切其他入口再返回。<br>3. 放弃该字段草稿。 | 切页不无提示丢失文字，必要时提供保存/放弃选择；回到正确对象，放弃只处理当前未保存内容；其他草稿和已保存内容不被误改。 | Source: Requirement；ERYE-210 v1.1第二节；AC10 | [PLAN] | — | 业务验收；验证字幕及水印文字草稿独立保留；Functional；Major；Not Run |
| ERYE210-022 | P0 | P；PA有合法音量/水印数值；实际页面O已公布输入范围 | 1. 分别输入abc、空值、超界值，不确认。<br>2. 切页再回。<br>3. 修正为合法值并Enter或明确应用。 | 非法输入不能自动变0/其他有效值并保存；有可理解提示，切页如需处理会明确询问；修正后保存为用户明确值，旧值在提交前不被错误覆盖。 | Source: Requirement；ERYE-210 v1.1第二节；NAV-R02；AC10 | [PLAN] | — | 业务验收；验证数值非法草稿切页不转0或截断；Validation；Major；Not Run |
| ERYE210-023 | P0 | P；PA有可拖动水印透明度；实际页面明确手势行为 | 1. 拖动滑杆经过多个值后松开。<br>2. 撤销一次。<br>3. 再拖动期间Esc取消。 | 最终值、预览和保存一致；一次可观察撤销能恢复拖动前值；若页面支持Esc取消则正确取消，否则不虚构快捷键门槛；切页不重复应用。 | Source: Requirement；ERYE-210 v1.1第二节；AC10 | [PLAN] | — | 业务验收；验证滑杆拖动结束一次提交Esc取消；Functional；Major；Not Run |
| ERYE210-024 | P0 | P；PA有已支持水印开关或字幕可见性菜单；实际页面已确认提交方式 | 1. 切换开关或选择一个菜单值。<br>2. 立即切其他入口再回。<br>3. 回读历史并撤销一次。 | 一次开关/菜单选择的实际效果正确，切页重回不再反复应用或重生任务；撤销按当前可用历史恢复。 | Source: Requirement；ERYE-210 v1.1第二节；AC10 | [PLAN] | — | 业务验收；验证开关菜单离散提交不因切页再提交；Functional；Major；Not Run |
| ERYE210-025 | P0 | P；PA有未发送Agent文本和未应用清理候选 | 1. 切五入口并返回。<br>2. 再切目标PB。<br>3. 查看输入/候选绑定并明确取消。 | 切页不会自动发送输入或应用未选候选；切工程时不把原稿/候选当成PB内容，用户可明确处理未保存项。 | Source: Requirement；ERYE-210 v1.1第二节；AC10 | [PLAN] | — | 业务验收；验证未发送Agent输入及候选不随切页执行；Functional；Critical；Not Run |
| ERYE210-026 | P0 | P；PA有C1未提交草稿，T2可改云端C1；本地恢复可用 | 1. 刷新/异常重开查看草稿。<br>2. 在另一独立场景T2保存新文后重开。<br>3. 比较并选择重新应用或放弃。 | 按已确认页面恢复规则保留/提示未保存内容；另一页新保存内容不被旧草稿无提示覆盖；用户能明确选择保留或放弃。 | Source: Requirement；ERYE-210 v1.1第二节；AC10；206 AC25 | [PLAN] | — | 业务验收；验证刷新异常重开恢复原字段且冲突不覆盖；Data Persistence；Critical；Not Run |
| ERYE210-027 | P0 | P；PA/PB均有同名C1或水印字段；U1/U2、两对象可区分 | 1. PA输入草稿A、PB输入草稿B并切换。<br>2. 切账号及重开。<br>3. 分别回原字段。 | 不同工程/账户/对象的未保存文字不串用或泄漏，返回时对应正确输入。 | Source: Requirement；ERYE-210 v1.1第二节；AC10 | [PLAN] | — | 业务验收；验证不同工程同名字段草稿不串；Data Persistence；Critical；Not Run |

## Scripts清理及字幕音频联动

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-028 | P0 | P；PA有语音但无停顿/口水词分析结果 | 1. 打开Scripts清理区域。<br>2. 不点分析，检查任务和时间线。<br>3. 明确点击分析，再等候选出现。 | 仅打开不分析/不改时间线；明确分析产生候选，仍须选择并应用才修改工程。 | Source: Requirement + Mockup；ERYE-210 N04；Figma 1528:27906/30581；AC05 | [PLAN] | — | 业务验收；验证无分析结果仅显示分析入口；Functional；Major；Not Run |
| ERYE210-029 | P0 | P；PCLEAN含已核验候选/停顿金标；分析已完成 | 1. 试听候选，取消一项并恢复一项。<br>2. 查看最终所选区间及预计缩短量。<br>3. 不应用时检查原内容。 | 选择/恢复及试听可理解，范围与金标一致；未应用不改时间线/字幕/配音，不把候选操作当内容历史。 | Source: Requirement；ERYE-210 N04；AC05 | [PLAN] | — | 业务验收；验证试听选择恢复候选及应用预览；Functional；Major；Not Run |
| ERYE210-030 | P0 | P；PCLEAN含可靠源/原译文/配音时间映射，锁定范围无冲突 | 1. 选明确候选并点击应用清理。<br>2. 核对画面、原声、关联字幕/配音和缩短量。<br>3. 撤销一次并核源文件。 | 一组一次提交；实际缩短与选区一致，关联同步无已删对白；一次撤销恢复整组；不删原素材。 | Source: Requirement；ERYE-210 N04；AC05；196 WAC04/08 | [PLAN] | — | 业务验收；验证一次清理一次提交并整组撤销；Functional；Major；Not Run |
| ERYE210-031 | P0 | P；CWORD有独立人工词句和声音金标；在本轮清理业务范围内明确删除9～10秒；未确认边界规则仅记录相应分支 | 1. 明确删除源9～10秒并应用。<br>2. 对照人工金标逐句看字幕、听声音并核对时长。<br>3. 重开原结果，再撤销本次修改。 | 目标1秒正确删除，保留词句和画面/声音对应，无丢重、残留或漂移；原结果恢复不再删一次，撤销能恢复原内容。 | Source: Requirement；ERYE-210 v1.1第三节；NAV-R04；N04 | [PLAN] | — | 业务验收；清理后词句音画与人工金标对应；Boundary；Major；Not Run |
| ERYE210-032 | P0 | P；CWORD包含跨删除边界词语及独立声音金标；该清理能力实际可用；语义边界结果已由人工确认 | 1. 明确删除9～10秒。<br>2. 对照实际音频边界、字幕文字和可读时段。 | 已删讲话不残留、保留讲话不漏词/重复，字幕对应实际声音；无法确定时先提示/澄清；不以词中点或固定半开区间归属算法作为通过条件。 | Source: Requirement；ERYE-210 v1.1第三节；NAV-R04 | [PLAN] | — | 业务验收；删除边界词句与实际声音对应；Boundary；Major；Not Run |
| ERYE210-033 | P0 | P；CNOWORD：8～12秒字幕中申请删9～10秒；实际输入没有可用逐词结果 | 1. 选择该清理候选并应用。<br>2. 查看定位错误和原工程。<br>3. 用户明确拆分文字/时码后重新选择应用。 | 正确完成声字同步，或明确说明需先拆分/确认后再继续；不能猜错文字却报成功或留下半成品。 | Source: Requirement；ERYE-210 v1.1第三节；NAV-R04 | [PLAN] | — | 业务验收；无法确定词句时明确处理不误删；Negative；Major；Not Run |
| ERYE210-034 | P0 | P；CNOWORD两字幕8～9、10～12秒，无逐字时间；待删9～10为空隙 | 1. 明确删除源9～10秒。<br>2. 比对两cue及音画映射。 | 删除无对白的9～10秒后，后字幕及声音前移1秒且文字保持完整；没有实际能力时记适用范围，不造字段阻塞。 | Source: Requirement；ERYE-210 v1.1第三节；NAV-R04 | [PLAN] | — | 业务验收；验证仅在字幕边界剪切不要求猜文字；Boundary；Major；Not Run |
| ERYE210-035 | P0 | P；CWORD含两语言及配音，独立听审发现其中一个关联无法明确对齐的测试输入 | 1. 分别应用删除9～10秒。<br>2. 比对两语言、音频、视频及历史。 | 两种语言和配音必须与最终实际声音/画面相符；不能只改一语或残留已删声音；不能可靠完成时明确反馈并保留原内容。 | Source: Requirement；ERYE-210 v1.1第三节；NAV-R04 | [PLAN] | — | 业务验收；清理后两语言与配音同步或明确失败；Negative；Critical；Not Run |

## 模块职责与设计可见控件

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-036 | P0 | P；PA双语字幕、配音稿均可区分；最新Captions稿 | 1. 在Captions内容明确改C1原文为“字幕测试”。<br>2. 切Style只改其受支持样式。<br>3. 查看译文及配音稿/任务。 | 字幕改文/样式不自动改译文或配音稿、不生成声音；内容与Style子页定位清楚，保存后重开正确。 | Source: Requirement + Mockup；ERYE-210 N05；Figma 1528:28905；AC06 | [PLAN] | — | 业务验收；验证字幕内容样式页及语言不串稿；Functional；Major；Not Run |
| ERYE210-037 | P0 | P；PA有旧配音及明确文稿/音色；当前端支持相应选择 | 1. Voiceover明确保存新文稿或选择合法音色。<br>2. 检查待生成标记和旧音频。<br>3. 明确生成成功后再核对替换。 | 变化不自动生成或改字幕；待生成保留旧声；只有明确生成成功应用后替换，失败不清空稿件。 | Source: Requirement + Mockup；ERYE-210 N05；Figma 1528:29415/32279；AC06 | [PLAN] | — | 业务验收；验证配音稿音色改变待生成并保留旧音频；Functional；Major；Not Run |
| ERYE210-038 | P0 | P；PA字幕稿与配音稿不同；实际页面明确是否有同步能力 | 1. 没明确同步时分别保存两稿。<br>2. 若O支持，显式选“仅C1字幕原文同步到配音稿”。<br>3. 反查原字幕和C2。 | 默认互不覆盖；支持同步时仅指定方向/范围，不自动生成；不支持时无该操作入口，不虚构可用。 | Source: Requirement；ERYE-210 N05；AC06 | [PLAN] | — | 业务验收；验证文稿同步必须明确方向范围；Functional；Major；Not Run |
| ERYE210-039 | P0 | P；PA原声/配音/BGM独立；O已登记真实最新五入口下混音控件位置 | 1. 通过当前真实入口选择BGM并设绝对-6dB/静音。<br>2. 调独立音轨合法偏移。<br>3. 核对视频范围、时长、字幕及声音。 | 只写选中音轨；视频剪辑和字幕不变；生成新声音仍在Voiceover。 | Source: Requirement；ERYE-210 N06；AC07；196 WAC06 | [PLAN] | — | 业务验收；验证已有声音混音不改视频剪辑；Functional；Major；Not Run |
| ERYE210-040 | P0 | P；PA有独立音频片段及同范围视频；O登记的真实移除入口 | 1. 选该音频片段执行移除。<br>2. 查看视频/字幕及源资产。<br>3. 撤销一次。 | 只移除目标音频片段；视频保留、时长不变；不删共享原资产；统一撤销可恢复。 | Source: Requirement；ERYE-210 N06；AC07 | [PLAN] | — | 业务验收；验证移除音频片段不删同时段视频；Functional；Major；Not Run |
| ERYE210-041 | P1 | P；PA/C1会话素材组与项目素材组不同；Figma当前Media页 | 1. 切Chat/Project并按素材名搜索已知A。<br>2. 清空搜索，查看候选。<br>3. 不执行添加，回读时间线。 | 筛选/搜索不切目标视频工程、不自动放置或生成；候选按授权来源显示；精确匹配规则待确认，不把样例文件名作固定数据。 | Source: Requirement + Mockup；ERYE-210 Figma 1501:27513/1528:36196；N01；206身份规则 | [PLAN] | — | 业务验收；验证Media的ChatProject筛选只切素材范围；Functional；Major；Not Run |
| ERYE210-042 | P1 | P；PCLEAN；O公布最小停顿阈值范围/步长；Scripts稿有搜索/候选数量/Remove | 1. 搜索已知逐字稿词并查看对应对象。<br>2. 改合法停顿阈值/候选选择。<br>3. 未点应用前回读时间线。 | 控件影响候选展示/选择范围可解释，未明确应用不改工程；图中0.8秒是样例，不作为算法硬阈值。 | Source: Requirement + Mockup；ERYE-210 Figma 1528:30581；N04 | [PLAN] | — | 业务验收；验证清理搜索与候选阈值控件不擅自应用；Functional；Major；Not Run |
| ERYE210-043 | P1 | P；实际页面已有Characters per cue控件，已确认它的用户可见作用和合法取值范围；长句有独立文字金标 | 1. 在Captions修改为合法字符数。<br>2. 查看预览及保存/重开。<br>3. 撤销并比对文字/时间/配音。 | 按当前已确认作用调整分句/排版且重开保持，不丢词改语言或自动生成配音；图中50不当默认或硬上限。 | Source: Mockup；ERYE-210 Figma 1528:28905；N05 | [PLAN] | — | 业务验收；验证字幕每条字符数控件范围与作用可核验；Functional；Major；Not Run |
| ERYE210-044 | P0 | P；PA已有文字W1/图片W2；可用的logo-B；按O支持规格 | 1. Watermark切Text/Image并检查当前内容。<br>2. 对W2明确Replace为logo-B，再执行已支持移除。<br>3. 回看W1/原资产及历史。 | 两子页不串对象；替换只改W2；移除水印不删源视频/共享资产；若规格未冻结，不把图中10MB/PNG/JPG/SVG当已确认支持全集。 | Source: Requirement + Mockup；ERYE-210 Figma 1528:29983/32726；N01/05；196 WAC06 | [PLAN] | — | 业务验收；验证水印TextImage及替换删除绑定当前对象；Functional；Major；Not Run |

## 旧入口迁移与五入口适配

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-045 | P0 | P；旧视图media/资产/工程文件各独立缓存；PA已保存 | 1. 用新版分别打开。<br>2. 重复刷新。<br>3. 核对旧缓存备份与工程内容。 | 旧入口可进入正确Media且业务内容不变；打开/刷新不会重新生成或多出工程。 | Source: Requirement；ERYE-210 N10；AC11；Figma主页面 | [PLAN] | — | 业务验收；验证旧media与工程文件映射Media；Functional；Major；Not Run |
| ERYE210-046 | P0 | P；旧cleanup及shorten视图；实际页面已确认Scripts承接清理与精简入口 | 1. 分别打开旧清理/精简链接。<br>2. 检查对应操作/候选与项目。 | 在已确认Scripts一级入口下定位对应清理/精简功能；不存在的子入口明确降级不借待定剪辑偏好稿代替。 | Source: Requirement；ERYE-210 N03/10；AC11 | [PLAN] | — | 业务验收；验证旧cleanupshorten映射Scripts对应功能；Functional；Major；Not Run |
| ERYE210-047 | P0 | P；旧voice有清理、音量、配音及无子页四种记录；实际页面已确认混音入口 | 1. 分别打开四类旧视图。<br>2. 核对清理/混音/配音定位及默认。 | 按语义映射：清理Scripts、配音Voiceover、音量去已冻结混音入口；无子页voice默认Voiceover；不能重新生成或增工程。 | Source: Requirement；ERYE-210 N10；AC11 | [PLAN] | — | 业务验收；验证旧voice按具体语义区分而非一律映配音；Functional；Major；Not Run |
| ERYE210-048 | P0 | P；旧translate来源分别是字幕翻译与配音语音子页 | 1. 从两类旧链接打开。<br>2. 回读目标/内容。 | 字幕翻译进Captions，明确配音翻译进Voiceover；不因同叫translate改错通道或触发新任务。 | Source: Requirement；ERYE-210 N10；AC11 | [PLAN] | — | 业务验收；验证旧字幕翻译与配音翻译入口区分；Functional；Major；Not Run |
| ERYE210-049 | P0 | P；PA旧watermark text/image缓存；有历史任务；可回退视图版本 | 1. 分别迁移并重开两次。<br>2. 回退视图开关，再恢复新版。<br>3. 比对媒体/任务/历史。 | 旧水印入口能定位Text/Image正确内容，重复打开及真实版本切换后不丢媒体/历史/任务或多出工程。 | Source: Requirement；ERYE-210 N10；AC11 | [PLAN] | — | 业务验收；验证旧watermark子页恢复及重复迁移回退；Functional；Major；Not Run |

## 全局控件、键盘与跨需求联动

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE210-050 | P0 | P；PA有可撤销编辑和任务；主页面全局区 | 1. 每个入口查看工程切换、保存、撤销重做、任务及Export入口。<br>2. 在两个模块分别提交一项修改，再连续撤销。 | 全局功能可达；统一历史依顺序撤销各批，不按TAB独立；导出/保存不局限某一模块。 | Source: Requirement + Mockup；ERYE-210 N01/07；AC10/12；196 WAC08 | [PLAN] | — | 业务验收；验证全局保存历史任务导出不随入口隐藏；Functional；Major；Not Run |
| ERYE210-051 | P0 | P；PA当前Captions；明确BGM稳定ID及gain=0 | 1. 明确指定PA的BGM，一次发送“只把工程A的BGM降低6dB，字幕与视频不改”。<br>2. 查看完成不跳入口。<br>3. 明确点结果定位。 | Agent按工程/对象改BGM=-6，不因Captions改字幕；后台不跳转；显式定位到O登记的真实混音控件，不假定Audio一级TAB。 | Source: Requirement；ERYE-210 N08；AC08；206 CP04；196 WAC06 | [PLAN] | — | 业务验收；验证字幕页Agent降低BGM与结果定位；Functional；Major；Not Run |
| ERYE210-052 | P0 | P；PA有可靠清理候选、配音能力和混音入口；PCLEAN | 1. 从PA字幕结果进入Captions；切Scripts，按PCLEAN金标分析并仅选择候选K1，查看缩短量后应用。<br>2. 在Voiceover选择D1配音稿“Welcome to CinLink”，语言英语、音色为O登记的默认英语音色，明确点击生成并等待成功应用。<br>3. 在O登记的实际混音控件只把BGM设为-6dB。<br>4. Export选择1080p H.264/AAC MP4；受理后仅将C1原文改为导出后的新文，关页重开并下载原任务。 | 始终PA；关联映射正确、文稿互不误改；原任务冻结版本且关页继续；不抢TAB，完成返回正确工程。 | Source: Requirement；ERYE-210 N07/08；AC05～09/12；206 CP10/12；196 WAC21 | [PLAN] | — | 业务验收；验证单工程跨清理配音混音导出持续编辑；Functional；Critical；Not Run；只用已发布能力 |
| ERYE210-053 | P0 | P；最新主页面五入口基准；Q210-08响应断点/键盘规范已确认；桌面Web和mac环境 | 1. 缩到已冻结窄屏条件。<br>2. 键盘遍历选择五入口、子页及全局Export。<br>3. 放大窗口并回到原入口。 | 五入口名称/顺序和可达性保留；有可见焦点、无焦点丢失；不隐藏当前工程/目标。具体键位、断点未定仅记Needs validation。 | Source: Requirement；ERYE-210 N01/N11；AC12；NAV-R05 | [PLAN] | — | 业务验收；验证窄屏模块选择器及键盘焦点；Usability；Major；Not Run |
| ERYE210-054 | P0 | P；PT首次译制按206评论原文关译文开；最新主稿双语同显为展示状态 | 1. 用户显式打开两语言字幕。<br>2. 切五入口再回Captions。<br>3. 查看两语言和选中对象。 | 显式两开不因TAB切换强制恢复首次默认；不把Figma双语样例当覆盖206首次译制默认；通道可独立编辑。 | Source: Requirement + Mockup；ERYE-210 N05；206评论23600668；Figma 1528:28905；AC02/06 | [PLAN] | — | 业务验收；验证双语显示默认差异与用户选择不被导航重置；Functional；Major；Not Run |
