# ERYE-237 图像编辑能力需求分析与测试点

更新：2026-11-05，Asia/Shanghai。按用户最新要求**不保留旧用例，重新设计本版用例集**。本轮只读云效与Figma并编写本地文档，未修改需求/评论/设计稿/产品代码，未执行真实图像任务。

## Requirement Summary 需求摘要

产品目标是完整图像编辑器：会话与画布并列，支持画笔、文字、六种形状、批注和引用、去背景、AI区域擦除、比例调整、版本、导出及草稿恢复。**每项业务及视图能力都必须同时支持UI和内置Agent**，并复用同一状态、校验、执行服务、修订与历史；Agent不能靠模拟鼠标点击实现正式接口。

核心规则：

1. 打开/引用/修改绑定明确的conversation、document、asset和version；源文件与已完成版本不可变，历史编辑产生正确分支。
2. 视图操作、草稿修改、确定性合成、图片问答、AI生成分别处理；只点工具/添加到对话不执行生成；纯绘制合成不调用付费模型。
3. 批注、对象引用、content、guide和AI mask分离。单次提交一个源版本；多源需求拆独立submission；提交冻结快照，历史消息不随草稿变化。
4. 主工具栏“擦除”是AI填补；画笔子工具橡皮只擦当前草稿绘制内容。去背景产出真实alpha，不能伪棋盘格；比例默认扩图保持主体，不静默裁剪或拉伸。
5. 服务端权威revision、原子batch、幂等command、冻结生成输入及阶段恢复保护内容和费用；取消与完成竞争服从真实终态。
6. v1.2强调结束不抢画布；草稿7天/过期恢复、字体回退、pending_review部分流程标为拟定，须批准再放行。

范围包括Web、macOS、内置Agent和云端图像服务。本工程主要执行Web，跨端用同快照另记结果。外部第三方Agent/MCP授权部署属于总体PRD后续阶段；多人评论、@他人、协作光标、审批、专业图层/滤镜面板、iOS完整编辑器不在本期。不自动把图片结果替换到视频时间线。

### 实际读取的来源

| 来源 | 读取结果 | 使用边界 |
|---|---|---|
| [ERYE-237 云效需求](https://devops.aliyun.com/projex/req/ERYE-237) | 2026-11-05只读接口获取；最后修改2026-10-19 10:42:09；v1.1研发评审正文（2026-10-14）及置顶v1.2审查修订（2026-10-15）完整读取 | 章节1～12、A01～A24、IMG-R01～05；拟定规则不冒充已冻结 |
| 云效评论/附件 | 两列表均返回0条 | 未额外推测评论约定；历史旧用例不是本次规则来源 |
| [用户指定Figma](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc/Workspace-System---Design?node-id=1816-50610) | 页面“图片编辑器-最新”；读取1615个节点、36个顶层frame，并观察总览、画笔及9份局部状态截图 | 静态设计观察，不等同原型交互或真实产品测试 |
| 用户本次确认 | 2026-11-05回复“按当前需求：最多10条批注” | 批注9/10/11边界按10；与设计图“会话20张图片”分开 |

PRD内链接的是旧Figma文件`aViEDnEJu4EJUmsLtIXmm8`，本次UI证据使用用户指定的新文件`SqGzwtxqNjFZa9QIvUPAlc`，按下表建立新节点映射，不沿用旧节点编号。Figma工具未提供评论/回复读取结果，不能宣称已核对完整Figma评论。原始API快照、元数据、设计截图和校验只留本机 `reports/erye237-requirement-20261105/`；临时下载地址不写入用例。

## Live Mockup Observation Summary 设计观察

本次观察到会话/编辑区并列、标题文件名、Export、左侧版本缩略图、主工具栏、缩放菜单、画笔子工具及滑杆、六类形状、批注浮层/候选下拉/引用标签、半透明擦除选区、去背景棋盘格预览、比例菜单、放弃弹窗及波点加载。无法从静态画板验证持久化、费用、API、Agent、并发或取消时序。

| 设计点 | 本次节点/可见内容 | 关联测试点 |
|---|---|---|
| D01 展开/收起 | [1816:51352](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51352)、[1816:51735](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51735)；文件名、Export、布局 | 身份正确，收起不丢草稿，自适应不改变源坐标 |
| D02 多版本 | [1816:51452](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51452)；纵向缩略图与选中态 | 真实版本/占位区分、正确分支、历史导出与来源 |
| D03 缩放 | [1816:51524](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51524)；25/50/100/150/200%和适合窗口 | 逻辑像素、fit/平移/DPR逆变换、内容不变 |
| D04 画笔 | [1816:51823](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51823)、1816:52557/52593/52629；选择/笔迹/文字/颜色/橡皮/撤销/重做/关闭、滑杆 | 对象结构、源单位、内容层擦除、共享历史、无生成费 |
| D05 形状/调色 | [1816:52665](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52665)；六种形状子菜单；颜色入口可见 | 六形状及RGB/吸管按PRD；新画布未见完整RGB面板状态，需补设计 |
| D06 放弃弹窗 | [1816:51945](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51945)；放弃当前更改、继续编辑、关闭X | 放弃仅当前未发内容，继续/X保留，任务取消不套弹窗 |
| D07 批注浮层/对象 | [1816:52990](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52990)、1816:53049/53115；编号、耳朵/人头、输入自定义、删除 | 改名与换绑区分，候选延迟/失败不阻输入，同名歧义 |
| D08 引用/发送 | [1816:53183](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-53183)、1816:53242/52453；输入引用、消息引用、占位 | 幂等附加、双向定位、发送冻结、接收后消费、多源拆分 |
| D09 去背景 | [1816:52353](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52353)、[1816:52773](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52773)；引用和棋盘格结果 | 发送前不生成；文件真实alpha，交互背景不烘焙 |
| D10 AI擦除 | [1816:52880](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52880)、[1816:52934](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52934)；圆形光标/紫色mask/滑杆 | 非破坏草稿、mask校验、adapter极性、填补与区域外保护 |
| D11 比例 | [1816:51751](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-51751)、1816:52250；9:16/3:4/1:1/4:3/16:9 | 重选只更新，默认扩图算法、精确输出、超限方案 |
| D12 处理状态 | [1816:52044](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc?node-id=1816-52044)、1816:52453；波点加载及编辑不可用注释1816:53391 | 同文档busy、其他能力可用、真实阶段/终态、焦点保护 |

## Requirement vs Mockup Gap Analysis 需求与设计差异

| 差异/风险 | 处理方式 |
|---|---|
| 设计注释20张图片，PRD批注10条 | 用户已确认批注按10；图片独立20张测试不映射为批注20条；导入/版本/失败计数待定 |
| 有的比例/背景画板写“标注”，主画板写“批注” | PRD明确本期文案统一“批注”；不因旧文字另外增加一个功能 |
| 新文件与PRD链接文件不同 | 本次按用户指定文件建立D映射，语义/异常/参数以当前PRD及确认优先；不沿用旧用例映射 |
| Export只有按钮，无完整设置和异常容器 | 依据PRD测试PNG/JPEG、尺寸、背景、文件名、限制/快照；不臆造弹窗布局或分享发布功能 |
| RGB面板/吸管完整状态未在新画布确认 | 功能依据§3.2/§12测试；需补对应组件/异常状态，不把形状图标当颜色面板证据 |
| 成功/加载画板较多，失败/取消/冲突/过期/字体/pending_review状态不足 | 按PRD领域状态定义测试，并列设计交付缺口；不以旧占位文案代替冻结组件 |
| 波点加载注释概括“编辑功能不可用” | 按§3.5细化：当前文档内容/再次提交/编辑态导出禁用；查看历史、历史导出、问答、缩放、收起、取消、其他文档仍可用 |
| 静态图不能证明草稿保存、命令幂等或Agent支持 | 需权威快照、命令/任务/文件/费用证据；不能以截图或助手“完成”作为通过依据 |

## Assumptions 测试假设与执行边界

- 采用PRD工程默认：普通绘制为content、本地确定性合成；仅明确指示才是guide；AI比例默认扩图。未调整的明确默认可验收，拟定规则须独立批准。
- 用例优先级是测试风险排序；PRD“P0功能范围”表示必须交付的能力，不表示所有边界/异常数据都必须标P0用例。
- 设计条数、双入口执行次数、脚本数、技术成功、语义通过分别统计。全部用例初始为PLAN/Not Run，本次未接自动化。
- 故障夹具及Mac环境由提测方提供合法隔离控制；不修改云端代码。客户端模拟只验证展示，不能计真实服务端部分失败/取消/费用通过。
- 所有数据别名、固定图/金标、scope、当前schema和实际产物身份按[前置数据](test-data.md)准备，不能根据被测结果反推金标。

## Clarifications Needed 待冻结事项

| 编号 | 待确认/交付内容 | 对验收的影响 |
|---|---|---|
| Q01 | 20张图片是否计导入、派生版本、失败/取消及并发占额 | 图片限制目前只设计独立成功生成图边界，不扩推其他计数 |
| Q02 | 标签超80字的UI处理、空白批注、Emoji/组合字符计数规则 | 基础长度用BMP汉字确定；补充输入体验按冻结规则 |
| Q03 | guide-only且无内容/AI意图如何提交；全透明吸管取色语义 | 不自行要求付费产图或猜透明色值，需单列规则后补用例 |
| Q04 | 字体清单/hash/分发依据、替代链、渲染引擎及缺字回退批准 | 字体一致性与拟定回退流程不能凭系统同名字体放行 |
| Q05 | 草稿7天续期、等值过期和新草稿恢复是否批准 | 对应拟定用例带前置门禁，不把v1.2“拟定”转为上线硬规则 |
| Q06 | pending_review查看/接受/拒绝/冲突策略是否批准 | 硬失败仍明确失败；候选激活和质量重生成按批准流程验证 |
| Q07 | Export/RGB及失败、取消、冲突、过期、缺字、候选状态设计 | 需求断言已设计，具体UI文案/布局/组件版本仍待交付 |
| Q08 | 产品MaxBytes单位、MaxPixels、provider交集、尺寸及模型限制 | 独立边界样本按公布契约制备，不能硬编码未经验证的模型别名/价格 |
| Q09 | 透明/主体/接缝/文字的固定质量集与允许变化/人工量表 | 硬约束精确测；语义量表未冻则待复核，不伪造分数或通过率 |
| Q10 | 性能环境、样本数、采样方法以及原图大图夹具 | P95测本地反馈、fps测图像画布，不把API耗时或视频时间轴作为标准 |
| Q11 | 全部Figma评论/回复及交付修订依据 | 当前只证明已读画板/文字注释，不能声明设计评论已覆盖 |

批注最大10条已于本次由用户确认，不再列为待确认。正常执行遇补槽仍填写并继续，按项目约定留证，不因“提示词完整”拒绝补充。

## Coverage Areas 测试策略

以源图片→文档/草稿→统一提交→任务/候选→真实文件→历史/费用为主线；按双入口、坐标/版本、合法/非法/边界、生命周期、并发、故障阶段及质量集划分独立风险。仅参数取值不同的场景在一条中列矩阵，不用语言改写凑用例数。

完整表为[144条详细用例](cases.md)：10组，P0 95 / P1 48 / P2 1；全部PLAN/Not Run。其中10条显式带拟定规则/资料门禁，其他用例仍须具备通用数据和环境前置，并不代表当前已就绪。

### UI与Agent操作测试点

下表指令中的别名先换成真实ID/参数；“仅设置/先别执行”与“直接执行”按意图区分。查看、采样、定位、导入不产生图像生成费；视觉识别等其他费用按实际类型单独核对。

| 能力 | UI路径与Agent等价提示词 | operation/判定重点 |
|---|---|---|
| 导入/打开 | 图片卡片；“打开图片I1的版本V1” | assets_import/editor_open；确切源身份，不取最近图猜目标 |
| 收起/展开 | 布局按钮；“收起右侧编辑器，保留修改”“展开编辑器” | editor_set_view:panel；不放弃、不改内容revision |
| 版本与分支 | 点历史缩略图；“查看V2”“从V1继续修改” | editor_list_versions、set_view:version、draft.begin；查看与派生分开 |
| 缩放/适配/平移 | 缩放菜单/拖动画布；“缩放200%，再适合窗口，平移到Q” | editor_set_view:zoom/fit/pan；DPR及源图不变 |
| 工具/尺寸默认 | 子工具与滑杆；“切画笔，粗细8源像素” | set_view:tool/toolDefaults；默认不改既有对象 |
| 选中/移动/边界/删对象 | 选择工具；“选T1，移到Q，改边界R，再删除H1” | set_view:selection、overlay.update/delete；稳定objectId |
| 笔迹 | 自由画笔；“用8px红线圈出R，仅作指示” | overlay.add_stroke；结构点列、guide/content、单笔历史 |
| 文字 | 文本工具；“左上加‘新品’，白色48px” | overlay.add_text/update；字体/边界及确定性渲染 |
| 六类形状 | 形状子菜单；“加指向瓶盖的红箭头，几何为R” | overlay.add_shape/update；全部形状独立矩阵 |
| 色板/RGB/吸管 | 调色/取色；“取Q的颜色给T1，用RGB(255,0,0)改H1” | editor_sample_color、overlay.update；采样只读、应用可撤销 |
| 画笔橡皮 | 子工具橡皮；“只擦掉S1中段，不动底图” | overlay.erase；不误进AI擦除 |
| 撤销/重做 | 历史按钮；“撤销上一步，再重做” | editor_undo/redo；共享栈，生成结果不重调模型 |
| 放弃 | D06；“放弃当前未发送修改，保留原图历史” | draft.discard；匹配明确丢弃意图 |
| 定位/读对象与批注 | 浮层/对象下拉；“找出右侧耳机，列出当前批注” | editor_resolve_targets/editor_inspect_items；同名/重叠候选不能猜 |
| 批注增改移删/换绑 | 点/浮层；“Q加批注X，先别执行”“改标签”“绑定另一个objectRef” | annotation.create/update/delete/bind_target；稳定身份、改名不移位 |
| 引用添加/移除 | 添加到对话/标签删除；“把两条批注放输入框”“只移除第一条引用” | reference.attach/detach；未发送不执行、不删历史 |
| 问答/草稿/编辑提交 | 一次发送；“这里只问是什么”“记下先别改”“按两条批注一起改” | editor_submit_interaction ask/edit/compose；冻结快照及真实结果 |
| 去背景 | 移除背景后发送；“移除背景，保留透明和发丝” | intent.set:remove_background＋submit；真实alpha |
| AI区域擦除 | 涂抹/撤销/滑杆；“形成R的mask，先别执行”“移除R中的耳机” | mask.add_stroke/update/clear、erase_region＋submit；源与mask校验 |
| 比例 | 比例菜单；“只设16:9”“执行扩成16:9，完整保留主体” | change_ratio＋submit；策略/尺寸提前解析 |
| 其他自然语言编辑 | 会话；“翻译标签，保留ACME”“修复划痕”“补全瓶盖”“生成正面图” | instruction_edit＋submit；保留约束/重建标记、阶段来源 |
| 预览/导出 | Export；“预览当前版本，然后按原尺寸导出透明PNG” | editor_preview/export；同快照/渲染器及实际文件 |
| 查询/取消/重试 | 任务入口；“查询任务J”“取消J”“只重试J失败的保存” | jobs_get/cancel/retry、editor_get_command；按实际阶段，不自动重生成 |

## Test Cases Table 详细用例及需求追踪

[用例正文](cases.md)提供每条前置、编号步骤、完整指令/参数、可验证预期、规则/设计来源、PLAN状态及设计节点/operation锚点。下面追踪表由本版ID和来源生成，不沿用旧表映射。

| 需求验收编号 | 本版用例 |
|---|---|
| A01 | [ERYE237-001](cases.md#erye237-001)、[ERYE237-002](cases.md#erye237-002)、[ERYE237-003](cases.md#erye237-003)、[ERYE237-008](cases.md#erye237-008)、[ERYE237-009](cases.md#erye237-009) |
| A02 | [ERYE237-011](cases.md#erye237-011)、[ERYE237-014](cases.md#erye237-014)、[ERYE237-015](cases.md#erye237-015)、[ERYE237-016](cases.md#erye237-016)、[ERYE237-018](cases.md#erye237-018)、[ERYE237-019](cases.md#erye237-019)、[ERYE237-020](cases.md#erye237-020)、[ERYE237-021](cases.md#erye237-021)、[ERYE237-023](cases.md#erye237-023)、[ERYE237-029](cases.md#erye237-029)、[ERYE237-030](cases.md#erye237-030)、[ERYE237-031](cases.md#erye237-031)、[ERYE237-135](cases.md#erye237-135) |
| A03 | [ERYE237-017](cases.md#erye237-017)、[ERYE237-022](cases.md#erye237-022) |
| A04 | [ERYE237-024](cases.md#erye237-024)、[ERYE237-025](cases.md#erye237-025)、[ERYE237-030](cases.md#erye237-030)、[ERYE237-066](cases.md#erye237-066)、[ERYE237-067](cases.md#erye237-067)、[ERYE237-069](cases.md#erye237-069)、[ERYE237-070](cases.md#erye237-070) |
| A05 | [ERYE237-033](cases.md#erye237-033)、[ERYE237-034](cases.md#erye237-034)、[ERYE237-035](cases.md#erye237-035)、[ERYE237-036](cases.md#erye237-036)、[ERYE237-038](cases.md#erye237-038)、[ERYE237-039](cases.md#erye237-039)、[ERYE237-040](cases.md#erye237-040)、[ERYE237-041](cases.md#erye237-041)、[ERYE237-042](cases.md#erye237-042) |
| A06 | [ERYE237-039](cases.md#erye237-039)、[ERYE237-043](cases.md#erye237-043)、[ERYE237-050](cases.md#erye237-050)、[ERYE237-076](cases.md#erye237-076) |
| A07 | [ERYE237-051](cases.md#erye237-051)、[ERYE237-052](cases.md#erye237-052)、[ERYE237-053](cases.md#erye237-053)、[ERYE237-054](cases.md#erye237-054) |
| A08 | [ERYE237-037](cases.md#erye237-037)、[ERYE237-055](cases.md#erye237-055)、[ERYE237-056](cases.md#erye237-056) |
| A09 | [ERYE237-058](cases.md#erye237-058)、[ERYE237-063](cases.md#erye237-063)、[ERYE237-064](cases.md#erye237-064)、[ERYE237-065](cases.md#erye237-065)、[ERYE237-076](cases.md#erye237-076)、[ERYE237-134](cases.md#erye237-134) |
| A10 | [ERYE237-071](cases.md#erye237-071)、[ERYE237-072](cases.md#erye237-072)、[ERYE237-073](cases.md#erye237-073)、[ERYE237-074](cases.md#erye237-074)、[ERYE237-075](cases.md#erye237-075)、[ERYE237-076](cases.md#erye237-076) |
| A11 | [ERYE237-059](cases.md#erye237-059)、[ERYE237-060](cases.md#erye237-060)、[ERYE237-061](cases.md#erye237-061)、[ERYE237-062](cases.md#erye237-062)、[ERYE237-134](cases.md#erye237-134) |
| A12 | [ERYE237-032](cases.md#erye237-032)、[ERYE237-062](cases.md#erye237-062)、[ERYE237-080](cases.md#erye237-080)、[ERYE237-092](cases.md#erye237-092) |
| A13 | [ERYE237-016](cases.md#erye237-016)、[ERYE237-026](cases.md#erye237-026)、[ERYE237-027](cases.md#erye237-027)、[ERYE237-028](cases.md#erye237-028) |
| A14 | [ERYE237-008](cases.md#erye237-008)、[ERYE237-012](cases.md#erye237-012)、[ERYE237-013](cases.md#erye237-013)、[ERYE237-083](cases.md#erye237-083)、[ERYE237-084](cases.md#erye237-084)、[ERYE237-085](cases.md#erye237-085)、[ERYE237-086](cases.md#erye237-086) |
| A15 | [ERYE237-009](cases.md#erye237-009)、[ERYE237-010](cases.md#erye237-010)、[ERYE237-023](cases.md#erye237-023)、[ERYE237-033](cases.md#erye237-033)、[ERYE237-068](cases.md#erye237-068)、[ERYE237-129](cases.md#erye237-129) |
| A16 | [ERYE237-007](cases.md#erye237-007)、[ERYE237-088](cases.md#erye237-088)、[ERYE237-105](cases.md#erye237-105)、[ERYE237-106](cases.md#erye237-106)、[ERYE237-107](cases.md#erye237-107)、[ERYE237-120](cases.md#erye237-120) |
| A17 | [ERYE237-093](cases.md#erye237-093)、[ERYE237-094](cases.md#erye237-094)、[ERYE237-095](cases.md#erye237-095)、[ERYE237-096](cases.md#erye237-096)、[ERYE237-097](cases.md#erye237-097)、[ERYE237-099](cases.md#erye237-099) |
| A18 | [ERYE237-015](cases.md#erye237-015)、[ERYE237-073](cases.md#erye237-073)、[ERYE237-098](cases.md#erye237-098)、[ERYE237-101](cases.md#erye237-101)、[ERYE237-102](cases.md#erye237-102)、[ERYE237-103](cases.md#erye237-103)、[ERYE237-108](cases.md#erye237-108)、[ERYE237-122](cases.md#erye237-122)、[ERYE237-123](cases.md#erye237-123) |
| A19 | [ERYE237-086](cases.md#erye237-086)、[ERYE237-100](cases.md#erye237-100)、[ERYE237-103](cases.md#erye237-103)、[ERYE237-108](cases.md#erye237-108)、[ERYE237-109](cases.md#erye237-109)、[ERYE237-110](cases.md#erye237-110)、[ERYE237-111](cases.md#erye237-111)、[ERYE237-112](cases.md#erye237-112)、[ERYE237-113](cases.md#erye237-113)、[ERYE237-114](cases.md#erye237-114)、[ERYE237-115](cases.md#erye237-115)、[ERYE237-120](cases.md#erye237-120)、[ERYE237-121](cases.md#erye237-121)、[ERYE237-132](cases.md#erye237-132) |
| A20 | [ERYE237-116](cases.md#erye237-116)、[ERYE237-117](cases.md#erye237-117)、[ERYE237-118](cases.md#erye237-118)、[ERYE237-119](cases.md#erye237-119)、[ERYE237-123](cases.md#erye237-123) |
| A21 | [ERYE237-004](cases.md#erye237-004)、[ERYE237-005](cases.md#erye237-005)、[ERYE237-006](cases.md#erye237-006)、[ERYE237-027](cases.md#erye237-027)、[ERYE237-044](cases.md#erye237-044) |
| A22 | [ERYE237-077](cases.md#erye237-077)、[ERYE237-078](cases.md#erye237-078)、[ERYE237-079](cases.md#erye237-079)、[ERYE237-080](cases.md#erye237-080)、[ERYE237-081](cases.md#erye237-081) |
| A23 | [ERYE237-019](cases.md#erye237-019)、[ERYE237-021](cases.md#erye237-021)、[ERYE237-045](cases.md#erye237-045)、[ERYE237-046](cases.md#erye237-046)、[ERYE237-047](cases.md#erye237-047)、[ERYE237-048](cases.md#erye237-048)、[ERYE237-049](cases.md#erye237-049)、[ERYE237-067](cases.md#erye237-067)、[ERYE237-068](cases.md#erye237-068)、[ERYE237-074](cases.md#erye237-074)、[ERYE237-082](cases.md#erye237-082)、[ERYE237-091](cases.md#erye237-091)、[ERYE237-124](cases.md#erye237-124)、[ERYE237-125](cases.md#erye237-125)、[ERYE237-126](cases.md#erye237-126)、[ERYE237-127](cases.md#erye237-127)、[ERYE237-128](cases.md#erye237-128)、[ERYE237-129](cases.md#erye237-129)、[ERYE237-130](cases.md#erye237-130)、[ERYE237-131](cases.md#erye237-131)、[ERYE237-132](cases.md#erye237-132)、[ERYE237-133](cases.md#erye237-133) |
| A24 | [ERYE237-011](cases.md#erye237-011)、[ERYE237-053](cases.md#erye237-053)、[ERYE237-056](cases.md#erye237-056)、[ERYE237-057](cases.md#erye237-057)、[ERYE237-058](cases.md#erye237-058)、[ERYE237-089](cases.md#erye237-089)、[ERYE237-090](cases.md#erye237-090)、[ERYE237-104](cases.md#erye237-104)、[ERYE237-136](cases.md#erye237-136)、[ERYE237-143](cases.md#erye237-143)、[ERYE237-144](cases.md#erye237-144) |

## Missing/Unclear Requirements 资料缺口

Q01～Q11是当前仍需冻结/交付的边界；未发现应凭空追加为首期的分享、专业图层、框选评论、第三方MCP或多人协作规则。Figma静态成功图不证明错误与并发路径已设计完整。批注数、扩图默认及输入限制等已明确规则照常可设计，不因未决项搁置全部用例。

## Suggested Improvements 后续验收建议

以A01～A24、D01～D12及IMG-R增补逐项收集真实证据；先在M0冻结schema、数据/字体/质量和异常组件，再按本地编辑、AI任务、跨端集成推进。持续维护同一能力注册表和UI/Agent配对结果，禁止只有UI可用、原始文件被覆盖、重复付费生成及仅回复成功。技术阶段完成和人工语义通过单列，缺资料不报完整覆盖或发布通过。
