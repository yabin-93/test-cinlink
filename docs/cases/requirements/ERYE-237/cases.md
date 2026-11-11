---
requirement: ERYE-237
case_prefix: ERYE237
automation_tag: "@ERYE-237"
case_set_version: "2026-11-09-layered-execution"
---

# ERYE-237 图像编辑能力详细测试用例

更新：2026-11-09。已在原144个编号上重整，P0 95 / P1 48 / P2 1及需求来源不变。每行只列一个主执行入口；UI对应的Agent配对移至[Agent分支](agent-checks.md)，内部精度、费用与契约移至[技术检查](technical-checks.md)。执行前读[简明执行规则](execution-guide.md)。历史原文见[覆盖清单归档](coverage-baseline-20261109.md)，不再按旧长步骤执行。

依据[云效需求](https://devops.aliyun.com/projex/req/ERYE-237)的v1.1正文＋2026-10-15 v1.2修订，以及用户指定的[Figma“图片编辑器-最新”](https://www.figma.com/design/SqGzwtxqNjFZa9QIvUPAlc/Workspace-System---Design?node-id=1816-50610)。需求最后修改2026-10-19 10:42:09（Asia/Shanghai），2026-11-05读取；云效评论/附件均0条。Figma评论未取得，不编造评论结论。

**144个需求覆盖编号：47个UI主入口 / 25个Agent主入口 / 72个技术主入口；全部PLAN，无完整AUTO。新版001～005主分支已执行：2 Passed / 3 Failed；其余258分支Not Run（含其余139个主入口）。[本轮报告](results-001-005-layered-prod-20261109.md)。**

历史旧版正式结果：1 Passed / 12 Failed / 12 Blocked / 119 Not Run，见[014～032报告](results-014-032-prod-20261109.md)。旧结果仅供回归定位，不直接继承为新版分支结果；既有缺陷仍有效。

用例主步骤、Agent配对和技术检查分别记录结果。参数矩阵逐行执行、逐行判定，缺一个矩阵参数只阻塞该参数行；整例覆盖完成需所有必测分支完成。P-UI不要求内部ID、provider日志或账本；P-TECH保留对应证据门禁。原始Requirement/Mockup/Inferred QA Risk来源及锚点未改，拟定规则仍须批准。

本轮正式失败关联：014/018/032→[FWXC-379](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a)，017/029→[FWXC-380](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f83f190cfe0ef713c9414db2ba)，030→[FWXC-381](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=95e907f84a3c8a2dd59d0352c5)；均已上传实测图片及补充证据、回读通过，状态保持Failed。分组不代表共同根因已确认。

005/Agent最新按用户纠正使用带背景原图重跑，仍Failed（计费输入校验失败，未生成蓝底）；见[原图R2报告](results-005-original-prod-20261109-r2.md)。不再使用上一轮去背景图失败解释作为当前原因。

## 分组概览

| 分组 | 条数 | P0 | P1 | P2 | 编号 |
|---|---|---|---|---|---|
| 打开、身份、版本与视图 | 13 | 11 | 2 | 0 | ERYE237-001～ERYE237-013 |
| 画笔、文字、形状与共享历史 | 19 | 13 | 6 | 0 | ERYE237-014～ERYE237-032 |
| 图上批注、对象绑定和引用 | 18 | 9 | 9 | 0 | ERYE237-033～ERYE237-050 |
| 内置Agent意图、多步处理与调用结果 | 12 | 8 | 4 | 0 | ERYE237-051～ERYE237-062 |
| 去背景、AI区域擦除与比例 | 14 | 12 | 2 | 0 | ERYE237-063～ERYE237-076 |
| 导出、草稿保留与界面状态 | 12 | 9 | 3 | 0 | ERYE237-077～ERYE237-088 |
| 能力契约、修订、批处理与并发 | 16 | 12 | 4 | 0 | ERYE237-089～ERYE237-104 |
| 任务阶段、取消、重试与账务 | 19 | 16 | 3 | 0 | ERYE237-105～ERYE237-123 |
| 资源、权限、安全与兼容质量 | 13 | 4 | 9 | 0 | ERYE237-124～ERYE237-136 |
| 拟定规则与交付资料验收 | 8 | 1 | 6 | 1 | ERYE237-137～ERYE237-144 |

## 打开、身份、版本与视图

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-001 | P0 | P-UI；已核实的上传处理图和提示词生成图各一份 | <a id="erye237-001"></a>**[UI] 打开已创建的图片工程**<br>分别从图片工程入口打开两图，核对画布、名称和历史 | 两图均打开正确内容；查看不新增处理任务或版本 | Requirement §3.1/§4.1/A01；Mockup D01 | [PLAN] | — | 1816:51352；assets_import/editor_open |
| ERYE237-002 | P0 | P-AGENT；B-MULTI；三图各有可打开工程；在S按附件顺序登记I1/I2/I3与实际基线V1，停留I3 | <a id="erye237-002"></a>**[Agent] 指定第二张图片而非最近图片**<br>1. 发送“打开本会话第2张图片，仅查看，不修改”<br>2. 如询问来源，按独立登记选择I2并继续，保留补槽过程<br>3. 核对I2画布/历史及I1/I3前后状态 | 打开独立登记的I2工程对应基线版本，不误取当前I3或最近生成图；I1/I3画布、历史和文件保持；内部ID可得则补证，不能拿规划选择正确代替实际打开 | Requirement §3.1/§4.2/A01；Inferred QA Risk 目标串用 | [PLAN] | [CUA部分脚本](../../../../tools/erye237/erye237-002.cua.mjs) | Requirement §3.1/§4.2/A01；Inferred QA Risk 目标串用 |
| ERYE237-003 | P1 | P-AGENT；B-IMG；B-EMPTY；I1已有工程且在测试会话范围可访问，V1为实际工程基线 | <a id="erye237-003"></a>**[Agent] 无打开文档时明确资源打开**<br>1. 展开编辑区并记录无图片文档状态，允许人工确认；有context则辅助读取<br>2. 发送“打开图片工程【真实名称】的【实际基线版本描述】，仅查看，不修改、不生成、不导出”<br>3. 核对画布/历史/文件及另一窗口图片；可读时再次查询context | 空文档状态确认后正确打开已有目标工程及版本；标题与画布匹配独立基线，不编辑另一窗口；无内部context不单独阻塞页面验收；目标未建工程则前置Blocked，不判打开失败 | Requirement §6.1/A01 | [PLAN] | [CUA部分脚本](../../../../tools/erye237/erye237-003.cua.mjs) | editor_get_context/editor_open |
| ERYE237-004 | P0 | P-UI；同工程三个可区分完成版本V1/V2/V3 | <a id="erye237-004"></a>**[UI] 查看已保存历史版本**<br>依次点击三个历史版本，等画布加载后核对；最后返回V3 | 每项显示对应内容；旧版仍可访问；查看不新增版本 | Requirement §3.1/§5.3/A21；Mockup D02 | [PLAN] | — | 1816:51452；editor_list_versions/editor_set_view |
| ERYE237-005 | P0 | P-AGENT；已有图片工程，V1明确选择未去背景、保留原背景的原始图片；记录工程、版本数及源文件；不使用透明去背景结果作为005基线 | <a id="erye237-005"></a>**[Agent] 同一图片连续编辑追加版本**<br>1. 发送“将工程【名称】当前基线背景改为纯蓝，主体不变”，等实际保存结果并登记V2<br>2. 明确以该蓝底结果继续请求“背景改为纯绿，主体不变”，等V3<br>3. 重开工程，依次查看V1/V2/V3及原S0文件 | 两次结果均归原图片工程，历史可分别查看基线、蓝底、绿底；不另建两个无关工程或覆盖旧版；以实际源结果核对连续性，内部父ID可得则辅助；原S0及旧文件可读 | Requirement §3.1/§5.1/A21 | [PLAN] | — | Requirement §3.1/§5.1/A21 |
| ERYE237-006 | P0 | P-AGENT；B-IMG；BV；工作头V3，V1仍可访问 | <a id="erye237-006"></a>**[Agent] 从历史版本派生分支**<br>1. 打开V1<br>2. 发送“只在版本V1左上角添加白色文字‘分支测试’，48源像素，并完成合成”<br>3. 核对新版本及V2/V3 | 新结果明确以V1内容为来源；V2/V3历史未覆盖或删除；新结果仍归正确图片工程 | Requirement §3.1/§5.3/A21 | [PLAN] | — | 1816:51452；draft.begin |
| ERYE237-007 | P0 | P-UI；同工程一个完成版和一个真实运行任务 | <a id="erye237-007"></a>**[UI] 运行时占位与完成历史**<br>记录占位；尝试占位导出；打开完成历史并导出；终态后检查新结果 | 占位不可当成品导出；完成历史仍可查看导出；仅成功后出现可用结果 | Requirement §3.1/§3.5/A16；Mockup D02/D12 | [PLAN] | — | Requirement §3.1/§3.5/A16；Mockup D02/D12 |
| ERYE237-008 | P0 | P-UI；红线S1、文字T1和矩形H1已保存为未发送草稿 | <a id="erye237-008"></a>**[UI] 收起展开保留绘制草稿**<br>收起图片编辑器再展开；选择三对象；编辑T1追加“ 已恢复”；再次收起展开 | 三对象可选择编辑；追加文字二次重开仍保留；引用不重复 | Requirement §3.1/§3.5/A01/A14；Mockup D01 | [PLAN] | — | 1816:51352/1816:51735；editor_set_view:panel |
| ERYE237-009 | P0 | P-UI；干净图片工程；登记源图尺寸 | <a id="erye237-009"></a>**[UI] 切换缩放档位**<br>逐项设置25%、50%、100%、150%、200%及适合窗口，记录每项画布 | 倍率与显示一致；适合窗口完整显示图片；内容和历史不变 | Requirement §3.1/A01/A15；Mockup D03 | [PLAN] | — | 1816:51524；editor_set_view:zoom/fit |
| ERYE237-010 | P0 | P-UI；已知图内点Q；已确认的平移入口或手势 | <a id="erye237-010"></a>**[UI] 缩放和平移后批注定位**<br>在25%、200%和适合窗口分别定位Q；平移后再次定位；返回100%核对批注 | 批注仍落在同一图像位置；图外灰区不能创建批注；未知手势仅阻塞平移参数行 | Requirement §5.2/A15 | [PLAN] | — | editor_set_view/annotation.create/mask.add_stroke |
| ERYE237-011 | P0 | P-AGENT；B-IMG；画笔/文字/AI擦除可用，未有绘制 | <a id="erye237-011"></a>**[Agent] Agent选择工具及默认值**<br>1. 发送“切换画笔，粗细8源像素，颜色RGB(255,0,0)”<br>2. UI落笔<br>3. 再发送“把画笔默认粗细改为16源像素”并再画 | 工具与默认值真实同步；两笔呈现设定粗细；未选中旧对象时改默认不追改旧笔；设置不新增图片任务 | Requirement §4.1/A02/A24；Mockup D04 | [PLAN] | — | Requirement §4.1/A02/A24；Mockup D04 |
| ERYE237-012 | P0 | P-UI；I1有未发送文字；I2为另一可用图片工程 | <a id="erye237-012"></a>**[UI] 切换来源保护脏草稿**<br>请求切至I2；选择继续编辑；再次切图并明确放弃当前未发修改 | 继续编辑保留I1草稿；明确放弃后才切至I2；完成历史保留 | Requirement §3.5/§4.2/A14；Mockup D06 | [PLAN] | — | Requirement §3.5/§4.2/A14；Mockup D06 |
| ERYE237-013 | P1 | P-UI；两个可用图片工程I1/I2 | <a id="erye237-013"></a>**[UI] 列表与编辑状态切图**<br>列表选择I2；进入画笔并画一笔；尝试切回I1；按退出交互继续 | 列表可切图；编辑状态不得静默丢弃未发修改 | Mockup 注释1816:53390；Requirement §3.5/A14 | [PLAN] | — | Mockup 注释1816:53390；Requirement §3.5/A14 |

## 画笔、文字、形状与共享历史

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-014 | P0 | P-UI；干净图片工程，无未发修改 | <a id="erye237-014"></a>**[UI] 进入画笔形成待发引用**<br>点击画笔；查看子工具栏和输入框，不落笔、不发送 | 画笔子工具栏及一个画笔引用出现；无新图片任务或版本 | Requirement §3.2/A02；Mockup D04 | [PLAN] | — | 1816:51823；editor_set_view:tool |
| ERYE237-015 | P0 | P-UI；空草稿A；另一轮画一笔再完整撤销至空的草稿B | <a id="erye237-015"></a>**[UI] 空画笔草稿禁止发送**<br>分别确认A/B无对象和其他意图；检查发送按钮；可点击时仅尝试一次 | 禁用发送或明确要求先修改；不新增图片任务和版本 | Requirement §3.2/§6.2/A02/A18 | [PLAN] | — | Requirement §3.2/§6.2/A02/A18 |
| ERYE237-016 | P0 | P-UI；干净图片工程；红色8px画笔 | <a id="erye237-016"></a>**[UI] 一条连续笔迹的撤销重做**<br>一次按下连续画折线后抬起；点击一次撤销，再一次重做 | 撤销移除整条笔迹；重做恢复整条；不逐点撤销 | Requirement §3.2/A02/A13 | [PLAN] | — | overlay.add_stroke/editor_undo/editor_redo |
| ERYE237-017 | P0 | P-UI；S1笔迹、T1文字、H1矩形已创建；底图有固有文字 | <a id="erye237-017"></a>**[UI] 选择移动缩放删除绘制对象**<br>选择T1移动并缩放；删除H1；撤销删除；尝试选择底图固有文字 | 只改T1；H1删除后可恢复；S1及底图不变；底图像素文字不冒充可编辑对象 | Requirement §3.2/§4.1/A03 | [PLAN] | — | Requirement §3.2/§4.1/A03 |
| ERYE237-018 | P0 | P-UI；干净图片工程；可用字体 | <a id="erye237-018"></a>**[UI] 混排文字保存后继续编辑**<br>创建白色48px“新品 Hello 2026”；收起重开；选择文字进入编辑并追加“ 已恢复”；再次重开 | 内容、位置、字号、颜色保持；原文字仍可编辑；追加文本真实显示并保留 | Requirement §3.2/A02；Mockup D04 | [PLAN] | — | overlay.add_text/update |
| ERYE237-019 | P1 | P-TECH；B-IMG；B0；schema采用默认8～512或明确收紧值 | <a id="erye237-019"></a>**[Technical] 文字字号上下边界**<br>1. 分别UI及Agent设8/512源像素<br>2. 请求7/513及非数值<br>3. 回读样式与错误 | 能力范围内边界精确生效；越界/非数值在执行前明确拒绝、不静默钳制或留下半修改；收紧范围有共同schema依据 | Requirement §12/A02/A23 | [PLAN] | — | Requirement §12/A02/A23 |
| ERYE237-020 | P0 | P-UI；干净图片工程 | <a id="erye237-020"></a>**[UI] 六类形状可创建并继续编辑**<br>分别创建直线、箭头、矩形、圆形、三角形、星形；重开后逐一选中；修改样式并撤销 | 六类均实际出现且可选中编辑；样式修改与撤销作用于所选对象 | Requirement §3.2/A02；Mockup D05 | [PLAN] | — | 1816:52665；overlay.add_shape/update |
| ERYE237-021 | P1 | P-TECH；B-IMG；BO；选中T1，其他对象有不同颜色；区分工具默认色与选中对象色；已有对象样式需实际应用 | <a id="erye237-021"></a>**[Technical] 色板RGB合法与非法参数**<br>1. 色板选色并输入RGB(0,128,255)<br>2. Agent将T1设为RGB(255,0,0)<br>3. 请求-1/256/空值/非数字<br>4. 撤销<br>记录RGB回读，修改默认色后新建对象；修改T1时使用更多设置→应用到所选内容，移开光标再核旧对象和其他对象颜色 | 合法值准确且只应用T1；非法值按schema拒绝，不改其他对象；撤销恢复此前颜色，无生成调用；只改默认色不得误判为旧对象色改变，合法RGB读值须准确；实际非法参数入口不可用时只阻塞对应边界 | Requirement §3.2/§12/A02/A23 | [PLAN] | — | overlay.update/editor_set_view:toolDefaults |
| ERYE237-022 | P1 | P-UI；已知实色底图点及绘制描边；另有批注、参考线和mask | <a id="erye237-022"></a>**[UI] 吸管采样实际内容色**<br>依次在已知实色处取色并新画一笔；对照颜色；避开透明中心 | 新笔迹与被取内容颜色一致；批注、参考辅助层与mask不污染内容采样 | Requirement §3.2/§4.1/A03 | [PLAN] | — | editor_sample_color/overlay.update |
| ERYE237-023 | P1 | P-TECH；B-IMG；BG；默认schema直径1～256源像素；几何/像素/质量标准基于实际工程源版冻结；画笔、主擦除直径、文字字号分别记当前工具和实际数值 | <a id="erye237-023"></a>**[Technical] 笔宽和擦除直径的源单位边界**<br>1. 在25%/200%分别设置1/256px并画笔迹/擦除mask<br>2. 请求0/257<br>3. 对比源图和蒙版宽度<br>滑杆每次点击可能改变值，键盘调整后重新读Help/Value，不能只按键次数推算目标；旧笔迹与新默认值隔离核对 | 合法直径不随缩放变化；非法值先拒绝；画笔宽度、遮罩直径分别写入正确工具，不与文字字号混用；按源像素严格边界仍需BG独立标定，截图视觉粗细不能证明源单位通过 | Requirement §3.2/§12/A02/A15 | [PLAN] | — | Requirement §3.2/§12/A02/A15 |
| ERYE237-024 | P0 | P-UI；一条可编辑笔迹S1；底图含已融合线条 | <a id="erye237-024"></a>**[UI] 画笔橡皮局部擦除笔迹**<br>用画笔内橡皮擦过S1中段及底图线条；再撤销 | 仅S1被局部擦开；底图像素不变；撤销恢复S1 | Requirement §3.2/A04；Mockup 注释1816:53388 | [PLAN] | — | overlay.erase |
| ERYE237-025 | P1 | P-UI；独立文字T1和矩形H1；底图有固有文字 | <a id="erye237-025"></a>**[UI] 画笔橡皮移除整个文字或形状**<br>擦过T1字形及H1描边；逐次撤销 | T1、H1按整个对象移除并可分别恢复；底图文字不变 | Requirement §3.2/§12/A04 | [PLAN] | — | Requirement §3.2/§12/A04 |
| ERYE237-026 | P0 | P-AGENT；可编辑文字T1已在左上；干净本地历史 | <a id="erye237-026"></a>**[Agent] 手动与Agent共用撤销历史**<br>1. UI画红线S1<br>2. 发送“将当前可编辑文字T1移到右下，保留其他对象，不合成或生成”<br>3. UI撤销一次<br>4. 发送“撤销上一步本地编辑”<br>5. UI重做两次 | 按顺序先撤销T1移动再撤销S1；两次重做恢复S1和T1移动，不出现两个独立历史栈 | Requirement §3.2/§5.3/A13 | [PLAN] | — | editor_undo/editor_redo |
| ERYE237-027 | P0 | P-UI；有真实完成版V1/V2；已确认内容撤销入口 | <a id="erye237-027"></a>**[UI] 新编辑截断重做但保留历史文件**<br>撤销V2到V1；新增本地笔迹；检查重做及历史V2 | 重做旧路径不可用；V2历史仍可查看；切换查看历史不冒充内容撤销 | Requirement §5.3/A13/A21 | [PLAN] | — | Requirement §5.3/A13/A21 |
| ERYE237-028 | P0 | P-AGENT；同工程真实AI完成结果V2及可访问父版本V1；内容撤销入口已确认 | <a id="erye237-028"></a>**[Agent] 恢复已撤销的生成结果**<br>1. UI执行内容撤销回V1<br>2. 发送“恢复刚撤销的已完成结果V2，不要重新生成”<br>3. 核对实际画布与完成历史 | 回到原V2内容及文件，不产生第二个图片任务或新完成版本；V1/V2均保留。provider次数与费用由Technical另核 | Requirement §5.3/A13 | [PLAN] | — | Requirement §5.3/A13 |
| ERYE237-029 | P0 | P-UI；1254×1254源版；红色8px线和蓝色36px“导出测试”；无AI意图 | <a id="erye237-029"></a>**[UI] 仅绘制内容提交后完整保留**<br>随画笔引用发送“仅将当前红线和蓝色导出测试文字合成到图片，保留原尺寸及其他内容，不要AI重绘”；完成后下载PNG | 结果保留红线及准确文字；仍为1254×1254；其他内容不变 | Requirement §3.2/§7/A02 | [PLAN] | — | 1816:52044；editor_submit_interaction:compose |
| ERYE237-030 | P0 | P-UI；源版圈外有红线；新增蓝字“保留内容”；红圈明确设仅供AI参考并确认生效 | <a id="erye237-030"></a>**[UI] 参考圈指导局部修改**<br>引用该草稿发送“将红圈内标签改成蓝色，保留新增的保留内容文字，不烘焙红圈，圈外原图内容不变”；完成后导出 | 标签改蓝且新增文字保留；参考红圈不进入成片；圈外原红线不丢失 | Requirement §3.2/§5.2/A02/A04 | [PLAN] | — | Requirement §3.2/§5.2/A02/A04 |
| ERYE237-031 | P1 | P-UI；一份AI融合完成版；另有已确认保留的源绘制草稿 | <a id="erye237-031"></a>**[UI] 融合结果与保留草稿分开编辑**<br>在融合版尝试选中文字；再明确返回保留的源草稿继续编辑 | 融合像素不伪称原文字对象；保留草稿能恢复可编辑对象及正确来源 | Requirement §3.2/A02 | [PLAN] | — | Requirement §3.2/A02 |
| ERYE237-032 | P0 | P-AGENT；干净图片工程；归一化点Q=(0.25,0.25)，可用字体 | <a id="erye237-032"></a>**[Agent] Agent多步本地编辑一次撤销**<br>1. 发送“在当前图归一化(0.1,0.1)添加白色48源像素可编辑文字新品，再将同一文字移到(0.7,0.1)，加红色8源像素箭头从(0.7,0.2)指向(0.25,0.25)。仅本地编辑并确定性合成，保留原尺寸，不要AI生成。整组作为一次撤销单元”<br>2. 检查文字和箭头的真实结果<br>3. 撤销一次 | 只有一个文字，位置及箭头目标正确；一次撤销恢复编辑前基线，不留下部分修改 | Requirement §4.2/§6.1/A12 | [PLAN] | — | overlay.add_text/update/add_shape |

## 图上批注、对象绑定和引用

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-033 | P0 | P-UI；干净图片工程；图内Q和图外灰区各一处 | <a id="erye237-033"></a>**[UI] 图内点选创建批注**<br>点击标注后点Q；打开编号浮层填写“将此处改为蓝色”；再点击图外灰区 | 图内出现正确编号及正文；图外不创建批注或引用 | Requirement §3.3/A05/A15；Mockup D07 | [PLAN] | — | 1816:52990；annotation.create |
| ERYE237-034 | P1 | P-TECH；B-IMG；F-candidate-delay；已有Q批注，候选暂未返回 | <a id="erye237-034"></a>**[Technical] 候选迟到不阻塞或覆盖正文**<br>1. 输入“保留耳朵原色，仅增加银色耳钉”并选自定义名<br>2. 释放候选响应<br>3. 保存并重开 | 候选加载时可输入；迟到不覆盖自定义名/正文，不重复创建批注；保留已绑定目标 | Requirement §3.3/A05 | [PLAN] | — | Requirement §3.3/A05 |
| ERYE237-035 | P1 | P-TECH；B-IMG；F-candidate-fail；Q可定位 | <a id="erye237-035"></a>**[Technical] 识别失败仍可手动自定义**<br>1. 触发候选失败<br>2. 输入标签“左耳”和正文“添加小耳钉”<br>3. 添加到对话并重开 | 允许占位名或自定义输入；正文和锚点持久；不强迫重试识别、不凭空声称找到了对象 | Requirement §3.3/A05 | [PLAN] | — | 1816:53049；annotation.update |
| ERYE237-036 | P0 | P-UI；一条批注；两个位置不同且可绑定的对象 | <a id="erye237-036"></a>**[UI] 改名与换绑定分别验证**<br>将名称改为“左耳”后重开；再切换绑定到人头并重开 | 仅改名不移动原锚点；换对象才更新定位；正文保留且不重复新增 | Requirement §3.3/A05；Mockup D07 | [PLAN] | — | 1816:53115；annotation.bind_target/update |
| ERYE237-037 | P0 | P-AGENT；B-IMG；BA-ambiguous；图中两个同名耳机且有耳朵/人头重叠候选 | <a id="erye237-037"></a>**[Agent] 同名或重叠候选必须选择**<br>1. 发送“给耳机加logo”且不给唯一锚点<br>2. 查看候选并明确选择右侧耳机<br>3. 继续任务 | 选择前无编辑写入/provider调用；候选同时有名称和位置；选择后只改确定对象，不按同名合并 | Requirement §3.3/§4.2/A08 | [PLAN] | — | editor_resolve_targets |
| ERYE237-038 | P1 | P-UI；两条可区分批注；已有可用移动入口 | <a id="erye237-038"></a>**[UI] 移动已有批注不影响另一条**<br>将第一条从Q移至Q2；重开两条批注及对应待发引用 | 第一条位置和引用同步更新；正文保留；第二条不变 | Requirement §4.1/A05 | [PLAN] | — | annotation.update |
| ERYE237-039 | P0 | P-UI；同源两条批注，正文分别为“耳朵加耳钉”“耳机加logo” | <a id="erye237-039"></a>**[UI] 两条批注添加对话及双向定位**<br>分别点击浮层添加到对话；点击引用和画布编号核对定位；不发送 | 输入框恰有两条对应引用；正文、目标和来源正确；无新图片任务 | Requirement §3.3/A05/A06；Mockup D08 | [PLAN] | — | 1816:53183/1816:53242；reference.attach |
| ERYE237-040 | P0 | P-UI；一条已有待发引用的批注；另一同名不同锚点批注 | <a id="erye237-040"></a>**[UI] 重复添加更新原待发引用**<br>重复添加第一条；改其正文和名称再添加；另添加同名第二条 | 第一条只保留一份且展示新内容；第二条作为不同批注保留 | Requirement §3.3/A05 | [PLAN] | — | reference.attach/annotation.update |
| ERYE237-041 | P1 | P-UI；一条批注已添加到输入框 | <a id="erye237-041"></a>**[UI] 只移除待发引用**<br>点击输入框引用移除入口；再打开原画布批注 | 引用移除；原批注及正文仍在；不以空框退格作为必需入口 | Requirement §4.1/A05 | [PLAN] | — | reference.detach |
| ERYE237-042 | P0 | P-UI；两条批注均有待发引用 | <a id="erye237-042"></a>**[UI] 删除批注联动未发引用**<br>打开第一条浮层，点击输入框右上角垃圾桶；核对第二条 | 第一条编号、正文及其待发引用一起移除；第二条保留 | Requirement §3.3/A05 | [PLAN] | — | annotation.delete |
| ERYE237-043 | P0 | P-UI；同源两条目标批注，分别要求加耳钉及耳机logo；保留区已登记 | <a id="erye237-043"></a>**[UI] 一次发送两处批注修改**<br>添加两条到对话；一次发送“按这两条批注修改，其他内容不变”；终态逐处核对 | 一份提交同时处理两处目标；目标不串位；保留区无无关修改 | Requirement §3.3/§6.2/A06 | [PLAN] | — | 1816:52453；editor_submit_interaction |
| ERYE237-044 | P0 | P-UI；已发送含批注消息M；当前已有后续版本V2 | <a id="erye237-044"></a>**[UI] 旧消息批注不随新草稿变化**<br>修改新草稿批注名称、正文和位置；查看M并点击其原引用 | M正文、锚点及来源保持发送时状态；打开原版本而非静默改指V2 | Requirement §3.3/A21 | [PLAN] | — | Requirement §3.3/A21 |
| ERYE237-045 | P1 | P-TECH；B-IMG；BA-count；同源9/10/11条独立数据，每条1字正文 | <a id="erye237-045"></a>**[Technical] 10条批注的前后端边界**<br>1. 分别UI和Agent/接口提交9、10、11条<br>2. 查提交数/provider及错误字段 | 9/10条符合上限可继续；11条执行前明确拒绝且不截掉后面的批注；后端绕过UI仍拒绝。用户2026-11-05确认本需求按10条 | Requirement §3.3/A23；用户确认10条 | [PLAN] | — | editor_get_capabilities/editor_submit_interaction |
| ERYE237-046 | P1 | P-TECH；B-IMG；BA-text；用BMP汉字按TD-TEXT生成1999/2000/2001字正文，其他字段不超限 | <a id="erye237-046"></a>**[Technical] 单条正文2000字符边界**<br>1. 逐个填入并提交/校验<br>2. 用接口直接绕过UI校验<br>3. 对照保存正文 | 1999/2000完整保留；2001前后端拒绝、不静默截断；未创建生成任务/扣费；计数不照搬聊天框显示 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-047 | P1 | P-TECH；B-IMG；BA-text；批注正文各1字，全局3999/4000/4001字 | <a id="erye237-047"></a>**[Technical] 全局指令4000字符边界**<br>1. 分别通过UI与Agent提交完整全局文本<br>2. 检查字段校验和快照 | 3999/4000可继续；4001拒绝且不消费草稿；合法值无省略或截断；错误定位全局字段 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-048 | P1 | P-TECH；B-IMG；BA-text；批注数≤10、每条≤2000且全局≤4000，按TD-TEXT组合11999/12000/12001 | <a id="erye237-048"></a>**[Technical] 总字符12000独立边界**<br>1. 逐组合验证并提交<br>2. 对照各字段合法性及provider调用 | 11999/12000满足合计限制；12001仅因合计超限拒绝；不以先触发单字段超限冒充已测合计边界 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-049 | P1 | P-TECH；B-IMG；BA-text；79/80/81字标签，正文合法 | <a id="erye237-049"></a>**[Technical] 标签80字符边界**<br>1. UI与Agent分别更新标签<br>2. 检查界面反馈及服务端实际存储 | 79/80完整保存；81不进入超限存储且反馈可操作；无静默丢字。UI采用阻止输入还是提交拒绝按冻结组件规则验收 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-050 | P0 | P-AGENT；B-MULTI；B-IMG；BA-multi；I1/V1、I2/V1各一个不同锚点，U1均有权限 | <a id="erye237-050"></a>**[Agent] 多源引用拆明确提交**<br>1. 一次请求“将图片I1的所引用耳朵加耳钉，将图片I2的所引用耳机加logo”<br>2. 检查计划/submission/产物 | 两张图分别产生对应修改结果，源图和目标不串用；一图失败明确说明，不冒称两图完成 | Requirement §3.3/A06 | [PLAN] | — | Requirement §3.3/A06 |

## 内置Agent意图、多步处理与调用结果

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-051 | P0 | P-AGENT；B-IMG；BA；指向瓶身可读文字的锚点 | <a id="erye237-051"></a>**[Agent] 纯图片问答不创建编辑版本**<br>1. 发送“这里只做问答：这个位置写的是什么？不要改图片”<br>2. 查回复/来源/job/版本/费用类型 | 回答对应原图及所指位置；不创建图片编辑任务或新版本；不将问答冒称图片已修改 | Requirement §3.3/§4.2/A07 | [PLAN] | — | editor_submit_interaction:ask |
| ERYE237-052 | P0 | P-AGENT；B-IMG；对象Q唯一 | <a id="erye237-052"></a>**[Agent] 明确只记草稿不执行**<br>1. 发送“在Q处记一条批注：把这里改成蓝色。先别改图片，只放到输入框”<br>2. 读取状态 | 产生保存的批注和输入框引用，保持未执行草稿状态；UI显示对应点/正文；不创建编辑任务，不回复已经改成蓝色 | Requirement §4.2/A07 | [PLAN] | — | annotation.create/reference.attach |
| ERYE237-053 | P0 | P-AGENT；B-IMG；I-product；对象瓶盖位置唯一且有基线标注 | <a id="erye237-053"></a>**[Agent] 明确编辑指令无需先画选区**<br>1. 不先点击工具，发送“把这张图的瓶盖改成蓝色，其余主体与品牌文字保持不变”<br>2. 核对目标证据和执行结果 | 正确定位瓶盖并真实产图；瓶盖变蓝、其余主体和品牌不变；不强迫再走一次UI发送 | Requirement §4.2/A07/A24 | [PLAN] | — | editor_resolve_targets/intent.set/submit |
| ERYE237-054 | P0 | P-TECH；B-IMG；I-product；F-edit-fail可让编辑阶段确定失败 | <a id="erye237-054"></a>**[Technical] 问答后修改阶段结果准确**<br>1. 发送“先告诉我标签写了什么，再把非品牌说明翻译成中文，品牌和Logo不要改”<br>2. 分别成功及编辑失败执行 | 问答与编辑阶段可追踪；失败时保留已完成问答且明确未完成修改；只有编辑阶段归生成费用，不声称全部完成 | Requirement §3.3/§4.2/A07 | [PLAN] | — | Requirement §3.3/§4.2/A07 |
| ERYE237-055 | P0 | P-AGENT；B-MULTI；B-IMG；显示I3，结构化引用I2，指令明确I1/V1 | <a id="erye237-055"></a>**[Agent] 显式来源优先于引用和当前画布**<br>1. 发送“只处理明确指定的图片I1版本V1：左上添加‘目标一’，不要修改另外两张图”<br>2. 记录解析及命令 | 绑定明确I1/V1，不落到I2/I3；若引用与指定内容造成无法安全执行的冲突则先澄清、无写入；不得猜后宣称成功 | Requirement §4.2/A08 | [PLAN] | — | Requirement §4.2/A08 |
| ERYE237-056 | P1 | P-AGENT；B-MULTI；B-IMG；S内两张合理候选图且均被近期讨论 | <a id="erye237-056"></a>**[Agent] 上下文指代歧义与纠正**<br>1. 发送“把刚才那张背景去掉”<br>2. 查看候选并答“选第2张I2”<br>3. 再说“保留刚才去背景结果，继续看原图不要修改” | 歧义前不付费写入；答复后打开并处理确切图片工程及版本；后续查看不改变来源/历史，纠正能改变计划而非沿用错误目标 | Requirement §4.2/A08/A24 | [PLAN] | — | Requirement §4.2/A08/A24 |
| ERYE237-057 | P0 | P-TECH；B-IMG；F-capability；关闭某个编辑operation但保留其可见状态/原因 | <a id="erye237-057"></a>**[Technical] 能力不支持不能只回复完成**<br>1. 通过UI及Agent请求同一不可用能力<br>2. 回读结构化错误和调用记录 | CAPABILITY_UNSUPPORTED及可操作原因一致；无provider调用或伪产物；不能用模拟点击绕过注册表或只隐藏Agent入口 | Requirement §4.2/§6.1/A24 | [PLAN] | — | Requirement §4.2/§6.1/A24 |
| ERYE237-058 | P1 | P-AGENT；B-IMG；I-product；三个独立相同基线 | <a id="erye237-058"></a>**[Agent] 自然语言多种表达落到相同能力**<br>1. 分别发送“移除背景保留透明”“背景抠掉，要透明PNG”“只留下商品，背景透明”<br>2. 比较意图/源/输出约束 | 三种表达均真实去背景并输出透明图；不误生成另一张图、白底图或仅问答；不要求三次文件哈希相同 | Requirement §10/A09/A24 | [PLAN] | — | Requirement §10/A09/A24 |
| ERYE237-059 | P0 | P-AGENT；B-IMG；I-text；已人工标注原文/品牌/Logo及替换表 | <a id="erye237-059"></a>**[Agent] 翻译图片文字保留品牌Logo**<br>1. 发送“把瓶身非品牌英文说明翻译成简体中文，保留品牌ACME和Logo，其他不变”<br>2. 校对替换表<br>3. 完成后OCR加人工核验 | 实际替换内容对应允许表，品牌/Logo和保留词不变；技术成功与文字语义通过分开，无法确认不报完整通过 | Requirement §3.4/§8/A11 | [PLAN] | — | Requirement §3.4/§8/A11 |
| ERYE237-060 | P1 | P-AGENT；B-IMG；I-damaged；划痕和缺失瓶盖区域均标注 | <a id="erye237-060"></a>**[Agent] 磨损修复与结构补全分别标记**<br>1. 在独立基线分别请求“修复已标注划痕，保留其他内容”与“补全缺失瓶盖，保持瓶身”<br>2. 查看意图/provenance及产物 | 划痕修复和缺失补全分别达成，保留区不变；补全明确属于推断结构，不宣称恢复真实拍摄内容 | Requirement §3.4/A11 | [PLAN] | — | Requirement §3.4/A11 |
| ERYE237-061 | P1 | P-AGENT；B-IMG；I-product；斜拍香水瓶，外形和文字已标注 | <a id="erye237-061"></a>**[Agent] 商品正面重建与仅去背景区分**<br>1. 独立基线分别请求“只去背景，保持原视角和结构”及“生成该商品正面图，品牌保持，标明推断结构” | 仅去背景保持原视角与结构；正面图按要求重建并说明结构有推断，不暗中把两种任务互换 | Requirement §3.4/§5.2/A11 | [PLAN] | — | Requirement §3.4/§5.2/A11 |
| ERYE237-062 | P0 | P-AGENT；B-IMG；I-product；有瓶盖批注且比例变更会改变坐标 | <a id="erye237-062"></a>**[Agent] 生成依赖新图时重新定位**<br>1. 发送“先扩成16:9保留完整主体，再在新图瓶盖旁加‘新品’文字，最后导出PNG”<br>2. 记录阶段输入、定位和导出快照 | 按依赖执行；第二阶段使用已提交的新版本并重定位，不套旧坐标；阶段失败不谎报后续完成，导出绑定最后成功目标 | Requirement §3.4/§4.2/A11/A12 | [PLAN] | — | Requirement §3.4/§4.2/A11/A12 |

## 去背景、AI区域擦除与比例

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-063 | P0 | P-UI；干净图片工程，无运行任务 | <a id="erye237-063"></a>**[UI] 去背景选择只设置意图**<br>点击去背景并观察；若出现意图，检查重复选择；若直接受理任务则等终态，不追加发送 | 按需求应仅形成一个待发去背景意图；若立即执行记录流程失败，不因成片可用改判 | Requirement §3.4/A09；Mockup D09 | [PLAN] | — | 1816:52353；intent.set:remove_background |
| ERYE237-064 | P0 | P-UI；已标注主体和背景的I-alpha发丝、玻璃样本，逐样本执行 | <a id="erye237-064"></a>**[UI] 去背景透明文件及边缘质量**<br>提交去背景；下载PNG；检查真实alpha、主体及半透明边缘 | 背景真实透明而非棋盘格；主体保留；发丝和玻璃边缘按已冻结样本标准通过 | Requirement §3.4/§8/A09；Mockup D09 | [PLAN] | — | 1816:52773；intent.set/submit |
| ERYE237-065 | P0 | P-AGENT；B-IMG；I-alpha；同源独立基线 | <a id="erye237-065"></a>**[Agent] 透明请求与白底请求区别**<br>1. 分别请求“保留透明背景”和“做白底商品图”<br>2. 下载文件并核对outputSpec与像素 | 实际文件中透明请求不铺白；白底请求背景为白；不依赖白底预览判断透明 | Requirement §3.4/A09 | [PLAN] | — | Requirement §3.4/A09 |
| ERYE237-066 | P0 | P-UI；干净图片工程；可定位目标R | <a id="erye237-066"></a>**[UI] AI擦除区域保存与撤销**<br>用主工具擦除涂两笔并改直径；右键保存区域等完成；进入画笔撤销该意图 | 涂区可见且直径可调；保存产生一个擦除意图；撤销移除意图；底图未修改 | Requirement §3.4/A04；Mockup D10 | [PLAN] | — | 1816:52934；mask.add_stroke/update/clear |
| ERYE237-067 | P0 | P-UI；A无mask；B有一笔保存成功后已通过有效入口清空 | <a id="erye237-067"></a>**[UI] 空擦除区域禁止发送**<br>分别核对A/B真实无区域和意图；检查发送，可用时只尝试一次 | 禁用或要求有效区域；不默认整图擦除；无新图片任务或版本 | Requirement §3.4/A04/A23 | [PLAN] | — | Requirement §3.4/A04/A23 |
| ERYE237-068 | P0 | P-TECH；B-IMG；F-mask；正确mask、旧版本mask、错误W/H或sha的资源 | <a id="erye237-068"></a>**[Technical] mask源版本尺寸哈希校验**<br>1. 分别通过接口/Agent资源引用提交<br>2. 查看错误阶段及草稿 | 正确mask可继续；旧来源/尺寸/hash不匹配执行前明确拒绝，不通过缩放猜测复用，不调用provider，草稿可修正 | Requirement §5.2/A15/A23 | [PLAN] | — | Requirement §5.2/A15/A23 |
| ERYE237-069 | P0 | P-TECH；B-IMG；F-provider-mask；0/1及抗锯齿边缘的固定蒙版；记录provider约定 | <a id="erye237-069"></a>**[Technical] mask极性由adapter转换**<br>1. 提交移除R任务<br>2. 检查规范mask及adapter请求<br>3. 对照被编辑区域 | 领域协议0保留/1编辑、边缘[0,1]；反相provider由adapter转换，不把保留区当编辑区；不是接受旧mask反相猜测 | Requirement §5.2/§6.3/A04 | [PLAN] | — | Requirement §5.2/§6.3/A04 |
| ERYE237-070 | P0 | P-UI；TD-PORTRAIT人像；黄色包体和提手区域已登记 | <a id="erye237-070"></a>**[UI] AI擦除真实移除目标**<br>涂包体20px、提手8px并避开手裤；保存成功后一次发送“移除选区中的黄色手提包和提手，补全背景，人物、手和裤子及其他区域保持不变”；导出 | 包体和提手消失，背景补全且无透明洞；人物及其他内容保留；接缝无明显异常 | Requirement §3.4/§5.2/A04 | [PLAN] | — | Requirement §3.4/§5.2/A04 |
| ERYE237-071 | P0 | P-UI；干净图片工程；五种比例可选 | <a id="erye237-071"></a>**[UI] 比例选择更新唯一意图**<br>逐项选择9:16、3:4、1:1、4:3、16:9并重复最终值；若任一选择直接受理则停止后续选择 | 只保留最终比例的一份未发意图；选择不启动图片任务；直接执行记流程失败，未测比例单列 | Requirement §3.4/A10；Mockup D11 | [PLAN] | — | 1816:51751；intent.set:change_ratio |
| ERYE237-072 | P0 | P-UI；源1001×1000或TD-PORTRAIT1254平方；逐目标事先计算W/H | <a id="erye237-072"></a>**[UI] 扩图尺寸和完整主体**<br>每个目标比例从干净源版执行一次扩图；下载解码并检查主体及接缝 | k=ceil(max(W/a,H/b))，输出ka×kb；奇数留白多1在右或下；不裁切拉伸主体；无明显接缝 | Requirement §12/A10 | [PLAN] | — | intent.set:change_ratio/editor_submit_interaction |
| ERYE237-073 | P1 | P-AGENT；B-IMG；I-ratio-match；源图16:9，无遮罩/文字/其他意图 | <a id="erye237-073"></a>**[Agent] 原比例无变化返回no_op**<br>1. UI或Agent请求“保持16:9，内容不变”并提交<br>2. 查看版本/job/provider/费用 | 明确没有实际修改并指向已有版本；不新增图片任务或重复版本；本例无其他真实修改 | Requirement §6.2/§10/A10/A18 | [PLAN] | — | Requirement §6.2/§10/A10/A18 |
| ERYE237-074 | P0 | P-AGENT；B-IMG；I-ratio-large；计算目标W/H超过实际能力上限 | <a id="erye237-074"></a>**[Agent] 扩图超过能力必须明确方案**<br>1. 请求扩成16:9保持主体<br>2. 检查服务解析限制和缩放方案<br>3. 在确认前查副作用，再明确接受可行方案 | 先告知限制/最终尺寸及缩放策略并请求必要选择；未同意不静默裁切/缩放收费；确认后精确匹配新outputSpec | Requirement §8/§12/A10/A23 | [PLAN] | — | Requirement §8/§12/A10/A23 |
| ERYE237-075 | P1 | P-AGENT；B-IMG；I-ratio；主体锚点Q已确认；存在足够空间的目标比例；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-075"></a>**[Agent] 主体锚点影响扩图摆放**<br>1. 发送“扩成16:9，把已标注主体保留在左侧三分之一位置，不裁主体”<br>2. 查看解析方案和产物 | 解析并优先使用用户主体锚点，非强制居中；图像比例/尺寸仍准确；冲突条件先澄清，不拉伸或擅自裁主体 | Requirement §12/A10 | [PLAN] | — | Requirement §12/A10 |
| ERYE237-076 | P0 | P-AGENT；B-IMG；I-person；同图含耳朵、耳机及可识别品牌Logo，两个锚点与品牌保留区均已标注 | <a id="erye237-076"></a>**[Agent] 批注、背景和比例组合约束**<br>1. 一次发送“按耳朵/耳机两条批注修改，同时去背景保留透明并扩为1:1，品牌不要改”<br>2. 核对计划、每阶段源及终稿 | 全部约束进入冻结计划；可合并provider调用但不能漏条件；需新图的后续步骤重定位；交付真实alpha且符合精确尺寸的一个结果，失败按阶段说明 | Requirement §3.4/§4.2/A06/A09/A10 | [PLAN] | — | Requirement §3.4/§4.2/A06/A09/A10 |

## 导出、草稿保留与界面状态

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-077 | P0 | P-UI；已完成且含真实透明的PNG版本；另有未发批注和mask | <a id="erye237-077"></a>**[UI] 导出完成版不带交互层**<br>明确导出当前已完成版本；打开文件检查；再导出源版对照 | 格式及尺寸匹配完成版；透明保留；不含编号、浮层、guide、mask、光标或棋盘格；不提交未发意图 | Requirement §3.5/A22；Mockup D01 | [PLAN] | — | editor_export/editor_preview |
| ERYE237-078 | P0 | P-UI；含真实透明的完成PNG版本 | <a id="erye237-078"></a>**[UI] 透明图导出JPEG填充**<br>选JPEG检查默认背景后导出；支持自定义填充时另以蓝色导出 | 默认透明区填白且告知不保留透明；可选蓝色填充准确；原PNG不变 | Requirement §3.5/§12/A22 | [PLAN] | — | Requirement §3.5/§12/A22 |
| ERYE237-079 | P1 | P-UI；干净版本；已批准保留主体的800×800方案 | <a id="erye237-079"></a>**[UI] 文件名及指定尺寸导出**<br>设置文件名“商品图-验收”、PNG及800×800后导出并打开 | 真实PNG可打开，名字符合设置且尺寸800×800；不擅自裁切或拉伸 | Requirement §3.5/A22 | [PLAN] | — | Requirement §3.5/A22 |
| ERYE237-080 | P0 | P-UI；未提交content和guide；已有可确认导出在途的入口 | <a id="erye237-080"></a>**[UI] 导出冻结当前纯绘制草稿**<br>导出当前草稿后再添加另一笔；检查下载文件及当前草稿 | 文件只含导出时content，不混后续笔迹和guide；源文件和草稿可继续编辑 | Requirement §3.5/A12/A22 | [PLAN] | — | Requirement §3.5/A12/A22 |
| ERYE237-081 | P0 | P-UI；一个完成版V1及一个未执行去背景意图 | <a id="erye237-081"></a>**[UI] 未执行AI意图不冒充成品**<br>请求导出去背景结果；按提示选择明确已有V1导出 | 明确去背景尚未执行；不把源图或mask截图称处理结果；V1可独立导出且不触发AI意图 | Requirement §3.5/A22 | [PLAN] | — | Requirement §3.5/A22 |
| ERYE237-082 | P1 | P-TECH；B-IMG；B0；记录真实export capability及合法快照 | <a id="erye237-082"></a>**[Technical] 导出参数超限或无效**<br>1. 请求宽高0/负数/非整数/超上限或不支持格式<br>2. 查看前后端反馈、文件和费用 | 校验前结束且指出参数/能力限制；不导出空文件、不静默降低规格或调用provider；合法草稿/源图不变 | Requirement §3.5/§8/A23 | [PLAN] | — | Requirement §3.5/§8/A23 |
| ERYE237-083 | P0 | P-UI；未发送文字和引用已保存 | <a id="erye237-083"></a>**[UI] 退出时继续编辑或关闭弹窗**<br>退出画笔；选择继续编辑；再退出并关闭弹窗X；重读草稿 | 两条路径均保留内容和引用；没有确认放弃不清草稿 | Requirement §3.5/A14；Mockup D06 | [PLAN] | — | 1816:51945；draft状态 |
| ERYE237-084 | P0 | P-UI；同图有完成历史、已发消息及未发草稿 | <a id="erye237-084"></a>**[UI] 明确放弃仅清当前未发修改**<br>退出并确认放弃当前修改；重开图片 | 未发内容与引用清除且不自动恢复；原图、完成版本和已发消息仍在 | Requirement §3.5/A14；Mockup D06 | [PLAN] | — | draft.discard |
| ERYE237-085 | P0 | P-UI；已保存一条自定义名“左耳”、正文“添加银色耳钉”的未发批注 | <a id="erye237-085"></a>**[UI] 收起保留批注正文和自定义名**<br>收起再展开；点原编号读取名称正文；尝试打开另一图片但不授权放弃 | 原批注名称正文锚点保留；会丢草稿的换图须询问；不能仅凭编号存在判保存成功 | Requirement §3.5/§4.2/A14 | [PLAN] | — | Requirement §3.5/§4.2/A14 |
| ERYE237-086 | P0 | P-UI；绘制和批注均已确认保存；单独登记尚未保存文本 | <a id="erye237-086"></a>**[UI] 刷新后恢复已保存草稿**<br>刷新Web后重开；核对对象、正文、名称、引用并实际继续编辑 | 已保存内容恢复且仍可编辑；pending明确未保存并提供恢复；不重复执行旧提交或恢复已放弃内容 | Requirement §3.5/§5.1/A14/A19 | [PLAN] | — | Requirement §3.5/§5.1/A14/A19 |
| ERYE237-087 | P1 | P-TECH；TD-LIMIT；同一新会话连续生成的独立完成图片已达19张，未混入导入/版本计数；【门禁】图片计数扩展口径待确认；本例只测独立成功生成图 | <a id="erye237-087"></a>**[Technical] 会话图片20张限制独立于批注上限**<br>1. 生成第20张<br>2. 尝试第21张<br>3. 比对现有图片、错误及能力限额 | 设计注释的20张图片上限有明确提示及前后端一致限制；已有图可用；不把20解释为单次批注数。导入图/失败任务/派生版本的计数口径待冻结，另行记录不自行推断 | Mockup 1816:53389；Inferred QA Risk 数量限制混淆 | [PLAN] | — | 会话生成图片限额 |
| ERYE237-088 | P0 | P-UI；同图有完成历史；一个真实受理中的任务 | <a id="erye237-088"></a>**[UI] 任务运行时查看历史与恢复工具**<br>先取运行态证据；核对编辑/发送/编辑态导出禁用；依次查看完成历史、导出、缩放、收起；终态复核 | 运行中写入受限但完成历史、缩放和收起可用；终态工具恢复；终态操作不冒充运行中取证 | Requirement §3.5/A16；Mockup D12 | [PLAN] | — | 1816:52453/1816:53391；busy状态 |

## 能力契约、修订、批处理与并发

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-089 | P0 | P-TECH；P-API；TD-CAP；记录当前schema及发布operation清单 | <a id="erye237-089"></a>**[Technical] UI注册表与Agent能力全集一致**<br>1. 读取capabilities<br>2. 对照D01～D12和analysis操作矩阵逐项执行UI/Agent<br>3. 收集命令/结果/禁用原因 | 每个可用UI能力有真实Agent领域operation及schema/权限/费用/执行器说明；不以纯回复或模拟点击算覆盖；未执行项不计通过，真实覆盖须100% | Requirement §4.1/§6.1/A24 | [PLAN] | — | editor_get_capabilities |
| ERYE237-090 | P0 | P-TECH；B-IMG；P-API；BD；记录revision/hash/草稿/历史/job/费用 | <a id="erye237-090"></a>**[Technical] validate严格无副作用**<br>1. 对合法改文字batch及含非法操作batch分别调用validate/dry-run<br>2. 再读取所有状态 | 仅返回可执行性、差异和具体错误；不持久化修改、不消费草稿、不建job/版本、不报价扣费；成功验证不等同已执行 | Requirement §6.1/A24 | [PLAN] | — | editor_validate_edit |
| ERYE237-091 | P0 | P-TECH；B-IMG；P-API；B0；TD-CONTRACT构造未知operation/字段/不兼容schemaVersion | <a id="erye237-091"></a>**[Technical] 未知schema或字段整体拒绝**<br>1. 通过命令接口提交每种异常<br>2. 查结构化错误及文档/provider | 明确拒绝而非忽略字段后部分执行；无文档变化/provider调用；错误包含code/phase/affectedIds和可行推荐动作 | Requirement §6.1/§7/A23 | [PLAN] | — | Requirement §6.1/§7/A23 |
| ERYE237-092 | P1 | P-TECH；B-IMG；P-API；B0；合法add_text→update的新对象链 | <a id="erye237-092"></a>**[Technical] batch内别名与稳定ID映射**<br>1. 同batch创建文字alias=A并移动A<br>2. 回读实际ID<br>3. 下一batch直接复用旧alias A而不提供ID | 首batch准确返回alias到真实ID映射并修改同对象；alias只在当批有效，跨batch拒绝未解析引用，不按数组位置猜目标 | Requirement §6.1/A12 | [PLAN] | — | Requirement §6.1/A12 |
| ERYE237-093 | P0 | P-TECH；B-IMG；P-API；BO；记录内容hash/revision/history | <a id="erye237-093"></a>**[Technical] 本地batch失败整组回滚**<br>1. 提交“移动T1合法＋新增形状H2合法＋删除不存在对象非法”同batch<br>2. 回读并重新打开 | 任一步不合法则全部不变；无残留T1移动/H2/半条批注或新增撤销组；UI/Agent同样原子语义 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |
| ERYE237-094 | P0 | P-TECH；B-IMG；P-API；F-two-clients；同文档A/B均读R0 | <a id="erye237-094"></a>**[Technical] 两客户端旧revision写入冲突**<br>1. A保存T1修改获R1<br>2. B按R0提交另一修改<br>3. B重读并重新规划后提交 | B旧命令REVISION_CONFLICT且不覆盖A；返回当前revision；重规划绑定新内容，不只换revision原样盲重放 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |
| ERYE237-095 | P0 | P-TECH；B-IMG；P-API；F-pointer-hold；UI笔尚未抬起 | <a id="erye237-095"></a>**[Technical] 半笔手势期间Agent不截断写入**<br>1. 保持绘制手势时发送Agent改T1<br>2. 抬笔完成<br>3. 再按明确命令继续 | 手势进行中EDITOR_BUSY，不读取半笔当已保存修订；手势完成后可重新读状态执行；不删除已画内容或产生半个batch | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |
| ERYE237-096 | P0 | P-TECH；B-IMG；P-API；F-persist-delay；UI已预览但权威写入未确认 | <a id="erye237-096"></a>**[Technical] pending乐观预览不冒充保存**<br>1. 立即发送Agent依赖当前笔迹的编辑<br>2. 释放或拒绝持久化<br>3. 观察后续 | Agent等待pending明确成功/失败；仅权威确认后persisted=true；失败时保留可恢复草稿，不将未保存状态作为新输入 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |
| ERYE237-097 | P1 | P-TECH；B-IMG；P-API；F-two-clients；记录authority/R0/viewRevision | <a id="erye237-097"></a>**[Technical] 单一权威与视图revision独立**<br>1. 在A修改内容同时B只缩放/平移<br>2. 双端重读<br>3. 模拟本地/云端同时宣称主节点的配置 | 内容只有返回authority能提交；视图变化不制造内容冲突；双权威配置不可让两边都成功覆盖；revision为不透明token非客户端自增 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |
| ERYE237-098 | P0 | P-TECH；B-IMG；P-API；BD；提交前sourceRevision/hash已记录 | <a id="erye237-098"></a>**[Technical] acceptedRevision与冻结输入原子建立**<br>1. 提交后读取submission/草稿/activeJob/acceptedRevision<br>2. 发送纯进度事件<br>3. 等结果提交 | 接收、冻结、消费已提交草稿和activeJob一次事务完成；expectedCommitRevision=acceptedRevision；进度不推进内容revision，不因草稿清理产生伪冲突 | Requirement §5.3/§6.2/A18 | [PLAN] | — | Requirement §5.3/§6.2/A18 |
| ERYE237-099 | P0 | P-TECH；B-IMG；P-API；F-revision-conflict；任务冻结R0且结果尚未提交 | <a id="erye237-099"></a>**[Technical] 真正并发冲突保留候选不覆盖**<br>1. 通过允许的权威路径建立后续内容修订R1<br>2. 放行旧任务结果提交<br>3. 查询候选/工作头 | 比较expectedCommitRevision及源hash/lineage；真正冲突返回conflict，候选保存为未激活分支；当前工作头/草稿不被覆盖 | Requirement §5.3/§7/A17 | [PLAN] | — | Requirement §5.3/§7/A17 |
| ERYE237-100 | P1 | P-TECH；B-IMG；P-API；F-events；可重放本例原始事件 | <a id="erye237-100"></a>**[Technical] 事件重复乱序和序列缺口恢复**<br>1. 重复同eventId<br>2. 延迟旧进度至completed后<br>3. 跳过中间sequence<br>4. UI/Agent重连 | 重复去重，旧进度不回退终态；缺口重新读取权威快照；文档/任务身份准确，响应与事件先后不增加执行次数 | Requirement §5.3/A19 | [PLAN] | — | Requirement §5.3/A19 |
| ERYE237-101 | P0 | P-TECH；B-IMG；P-API；BD；同一用户/文档合法提交C1及payloadHash已记录 | <a id="erye237-101"></a>**[Technical] 同commandId同payload幂等**<br>1. 双击发送并重试同C1相同payload<br>2. 并发接收相同请求<br>3. 回读提交/版本/provider/账务 | 返回同一结果或在途状态；仅一份逻辑提交、实际执行和对应费用/版本；不靠按钮禁用替代服务端幂等 | Requirement §5.3/A18 | [PLAN] | — | Requirement §5.3/A18 |
| ERYE237-102 | P0 | P-TECH；B-IMG；P-API；BD；C1已接收；另一个不同文本/源版本payload | <a id="erye237-102"></a>**[Technical] 同commandId不同payload拒绝**<br>1. 复用C1提交变更后的payload<br>2. 查看错误和原任务 | COMMAND_ID_REUSED；原任务不被修改/重复执行；用户改输入需新commandId和新提交，不能偷换原来源 | Requirement §5.3/A18 | [PLAN] | — | Requirement §5.3/A18 |
| ERYE237-103 | P0 | P-TECH；B-IMG；P-API；F-response-drop；各准备未接收失败/已接收但丢响应两分支 | <a id="erye237-103"></a>**[Technical] 接收丢响应先查证而非新提交**<br>1. 发送C1并制造断连<br>2. 重连按C1查询<br>3. 根据权威结果恢复输入框/任务 | 未接收保留草稿；已接收恢复原submission/任务并消费相应已提交内容；不能新ID重发产生两份任务或费用 | Requirement §5.1/§6.1/§7/A18/A19 | [PLAN] | — | editor_get_command |
| ERYE237-104 | P1 | P-TECH；B-IMG；P-API；B0；U1有文档权限但无可用编辑视图 | <a id="erye237-104"></a>**[Technical] 无视图仍可执行文档命令**<br>1. Agent读取文档并添加已明确本地文字<br>2. 再请求缩放200%<br>3. 重新打开UI | 文档操作可按能力完成并保存；视图请求VIEW_UNAVAILABLE而不是谎报已缩放；打开UI后读取实际已存内容 | Requirement §6.1/A24 | [PLAN] | — | Requirement §6.1/A24 |

## 任务阶段、取消、重试与账务

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-105 | P0 | P-TECH；B-IMG；P-API；TD-JOBS；分别准备AI编辑、纯绘制合成和问答 | <a id="erye237-105"></a>**[Technical] 生成合成问答三类阶段真实**<br>1. 提交三类任务并采集实际事件/文件/回复<br>2. 对照UI/Agent阶段 | AI按accepted→queued→preparing→provider_running→validating→persisting→completed；合成跳过provider；问答回复落库完成且不提交图片版本；不虚构百分比 | Requirement §7/A16 | [PLAN] | — | Requirement §7/A16 |
| ERYE237-106 | P0 | P-TECH；B-IMG；P-API；J-running；U1具有同源UI和Agent入口 | <a id="erye237-106"></a>**[Technical] 同文档单活动提交而非重复生成**<br>1. UI再次发送<br>2. Agent再请求同文档合成/生成<br>3. 查询或取消原任务 | JOB_ALREADY_RUNNING/EDITOR_BUSY，无第二活动提交/provider；查询/取消仍可用；不能通过换窗口绕过限制 | Requirement §5.3/§7/A16 | [PLAN] | — | Requirement §5.3/§7/A16 |
| ERYE237-107 | P0 | P-TECH；B-IMG；P-API；TD-JOBS；D1/D2源不同且都有授权 | <a id="erye237-107"></a>**[Technical] 不同文档任务与问答互不串用**<br>1. D1运行时提交D2并对D1问答<br>2. 定向令D2失败<br>3. 读取两者来源/文件/账务 | 不同文档可独立推进，问答可完成；一方失败不取消另一方或串文件/费用；模拟结果仅算客户端展示验证，真实服务端验收须真实执行证据 | Requirement §3.5/§5.3/A16 | [PLAN] | — | Requirement §3.5/§5.3/A16 |
| ERYE237-108 | P0 | P-TECH；B-IMG；P-API；F-outbox；可在事务提交前后中断worker | <a id="erye237-108"></a>**[Technical] 消息、提交和投递原子一致**<br>1. 分别在接收落库前/后中断<br>2. 恢复调度<br>3. 查询message/submission/outbox/job | 未接收无孤儿任务；已持久化有同一快照和可恢复投递；消息重试不生成第二份等价提交，结果文件/版本建立保持一致 | Requirement §7/A18/A19 | [PLAN] | — | Requirement §7/A18/A19 |
| ERYE237-109 | P0 | P-TECH；B-IMG；P-API；F-preparing；授权源文件临时不可读或mask不匹配 | <a id="erye237-109"></a>**[Technical] 准备阶段失败不调用provider**<br>1. 提交并触发preparing失败<br>2. 查看错误/草稿恢复<br>3. 修复资源后按阶段重试 | 明确失败phase与原因；无provider调用/生成费，源图不变、可恢复草稿；重试仍绑定原来源，不绕过权限 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-110 | P0 | P-TECH；B-IMG；P-API；F-provider-fail；provider明确返回终态失败 | <a id="erye237-110"></a>**[Technical] 确定provider失败与未知结果区分**<br>1. 提交并返回确定失败<br>2. 查看阶段、retryable、费用和可选新attempt | 显示PROVIDER_FAILED及已知状态；源图可用、恢复入口明确；再次调用需按新attempt和授权记录，不把确定失败冒充成功文件 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-111 | P0 | P-TECH；B-IMG；P-API；F-provider-unknown；已取得providerRequestId后断开响应 | <a id="erye237-111"></a>**[Technical] provider超时结果未知先查证**<br>1. 触发超时<br>2. 等reconciling并查询原providerRequestId<br>3. 分别返回已成功/未成功/仍未知 | RESULT_UNKNOWN待查证，不自动重发收费生成；成功恢复同一候选，确定未执行后才按许可处理；未知期间费用状态不伪造 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-112 | P0 | P-TECH；B-IMG；P-API；F-invalid-output；提供坏文件、错误尺寸、错误格式或哈希的候选 | <a id="erye237-112"></a>**[Technical] 硬约束不合格必须失败**<br>1. 放行provider响应到validating<br>2. 查看输出校验和版本/工作头 | OUTPUT_INVALID且指出具体硬约束；不建立可用版本、不转needsReview掩盖；保留诊断，重新生成按新attempt/费用授权 | Requirement §6.2/§7/IMG-R04/A19 | [PLAN] | — | Requirement §6.2/§7/IMG-R04/A19 |
| ERYE237-113 | P0 | P-TECH；B-IMG；P-API；F-persist-fail；有效候选sha已记录 | <a id="erye237-113"></a>**[Technical] 保存失败只保存同一候选**<br>1. 使persisting失败<br>2. 选择“重试保存”<br>3. 恢复存储后核对providerRequestId/候选sha/版本和账务 | PERSISTENCE_FAILED；重试同一候选存储，不重新调用provider；最终只建立一份对应版本/费用，不丢诊断 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-114 | P1 | P-TECH；B-IMG；P-API；F-notification-fail；正式文件/版本已原子保存 | <a id="erye237-114"></a>**[Technical] 缩略图或通知失败不重生成**<br>1. 分别阻断缩略图生成和通知<br>2. 重连/刷新/重试通知<br>3. 核对源结果 | 正式任务仍按权威completed；只恢复展示/投递；无第二次provider/版本或收费，不能因UI无图误判应重生成 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-115 | P0 | P-TECH；B-IMG；P-API；J-running；command/submission/job/attempt均已记录 | <a id="erye237-115"></a>**[Technical] 客户端或worker重启续接原任务**<br>1. 在排队、provider_running、persisting分别重启本例测试进程/客户端<br>2. 恢复后按原ID查询 | 续接真实阶段及原输入，不新建重复任务；终端事件去重；UI以权威状态恢复，不靠本地倒计时猜完成 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |
| ERYE237-116 | P0 | P-TECH；B-IMG；P-API；J-queued；worker可控且未调用provider | <a id="erye237-116"></a>**[Technical] 排队取消先于provider执行**<br>1. UI或Agent发送“取消当前任务J，只取消该任务”<br>2. 放行worker<br>3. 读取权威终态和账务 | 取消先提交则cancelled、provider零调用、无生成费；不删源图/草稿和历史，不把放弃弹窗当取消任务 | Requirement §7/A20 | [PLAN] | — | jobs_cancel |
| ERYE237-117 | P0 | P-TECH；B-IMG；P-API；J-provider-running；provider调用已发生 | <a id="erye237-117"></a>**[Technical] 运行中取消请求与终态区分**<br>1. 请求取消<br>2. 在provider尚未确认期间查看UI/Agent<br>3. 等实际终态再读取费用 | 先cancel_requested而非立即谎报已停止；尽力取消后展示实际结果；已产生费用按事实记录，不承诺退款 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |
| ERYE237-118 | P0 | P-TECH；B-IMG；P-API；F-race-complete-first；validating/persisting后完成先写入 | <a id="erye237-118"></a>**[Technical] 完成先提交时取消返回实际完成**<br>1. 在完成事务后送达取消请求<br>2. 查询事件和工作头<br>3. 明确撤销完成版 | 权威completed不被改为cancelled；允许按历史撤销恢复父版本但不删文件/退款；UI/Agent终态一致 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |
| ERYE237-119 | P0 | P-TECH；B-IMG；P-API；F-race-cancel-first；cancelled已持久化 | <a id="erye237-119"></a>**[Technical] 取消先提交不激活晚到候选**<br>1. 再投递原provider完成/保存回调并重复投递<br>2. 核对工作头/版本/费用及UI焦点 | 不自动激活晚到结果，不回退终态，不抢画布；保留可审计候选/费用事实，重复事件不重复写账或版本 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |
| ERYE237-120 | P0 | P-TECH；B-IMG；P-API；F-focus；任务源V2，用户正在查看V1且有已记录zoom/pan | <a id="erye237-120"></a>**[Technical] 失败取消冲突都不抢用户当前画布**<br>1. 分别触发任务失败/取消/冲突<br>2. 查看V1<br>3. 主动点击V2任务“查看并重试”；另测仍停占位分支 | V1及视图不变；后台只恢复V2草稿；主动打开才切V2，遇脏草稿先询问；仍停任务占位时失败才显示源图 | Requirement v1.2/IMG-R01/A16/A19 | [PLAN] | — | Requirement v1.2/IMG-R01/A16/A19 |
| ERYE237-121 | P1 | P-TECH；B-IMG；P-API；F-focus；任务失败且已恢复源草稿 | <a id="erye237-121"></a>**[Technical] 删失败占位不删原版本或恢复草稿**<br>1. 删除失败任务占位<br>2. 从历史/任务入口重新查询来源和草稿<br>3. 按原失败阶段重试 | 源版本、已发消息和可重试草稿保留；重试绑定原提交/来源/失败阶段，改输入必须新提交 | Requirement v1.2/IMG-R01/A19 | [PLAN] | — | Requirement v1.2/IMG-R01/A19 |
| ERYE237-122 | P1 | P-TECH；B-IMG；P-API；TD-QUOTE；有效quote绑定快照/模型/尺寸，权威时钟可控 | <a id="erye237-122"></a>**[Technical] 报价过期和输入变化使报价失效**<br>1. 保持输入在有效期内提交<br>2. 独立分支到期或改变mask/文字/模型/尺寸/阶段后沿用旧quote提交 | 有效报价按授权处理；过期/不匹配执行前拒绝或重新报价；默认5分钟由服务返回有效期校验；超授权需确认，不将本地画笔变付费确认 | Requirement §6.2/A18 | [PLAN] | — | editor_quote_interaction/submit |
| ERYE237-123 | P0 | P-TECH；B-IMG；P-API；TD-LEDGER；AI成功、失败已调用、取消、本地合成与问答样本 | <a id="erye237-123"></a>**[Technical] 费用与技术状态独立且可追溯**<br>1. 对照submission/attempt/provider usage与账户流水<br>2. 回读重试/撤销后的累计记录 | 未调用/已调用待核算/已核算准确；生成费用只归真实attempt，存储重试/本地绘制/查看/撤销不重复生成收费；退款独立记录，不删除job清账 | Requirement §7/§11/A18/A20 | [PLAN] | — | Requirement §7/§11/A18/A20 |

## 资源、权限、安全与兼容质量

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-124 | P0 | P-TECH；TD-FORMAT；各格式有效源，EXIF旋转及非sRGB样本；合法输入通过后按B-IMG建工程再测编辑分支 | <a id="erye237-124"></a>**[Technical] 合法JPEG PNG WebP及canonical规范化**<br>1. 各自UI导入或Agent以授权fileId导入<br>2. 读取canonical尺寸/方向/色彩/hash<br>3. 核实工程后按实际源版同点批注并导出 | 支持三类，导入先归一方向和sRGB；后续坐标基于canonical而非原始旋转图；两个入口几何相同且源身份可追溯 | Requirement §5.2/§8/A23 | [PLAN] | — | Requirement §5.2/§8/A23 |
| ERYE237-125 | P1 | P-TECH；P-API；TD-LIMIT；解码像素远低上限，字节数为MaxBytes−1/MaxBytes/MaxBytes+1 | <a id="erye237-125"></a>**[Technical] 输入字节上限独立边界**<br>1. 分别上传/导入并通过接口直接提交<br>2. 查看能力声明及源图验证 | 上限内可继续、超限执行前拒绝，不读取到provider；默认20MB须映射为冻结MaxBytes，单位未明不能自选阈值；与provider交集有明确依据 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |
| ERYE237-126 | P1 | P-TECH；P-API；TD-LIMIT；文件字节合法，像素数分别小于/等于/大于MaxPixels | <a id="erye237-126"></a>**[Technical] 解码像素上限独立边界**<br>1. 导入三张固定维度图<br>2. 检查实际解码尺寸和校验<br>3. 尝试绕过前端 | 按默认24MP对应冻结MaxPixels和provider交集执行；超过像素限额前后端均拒绝，不以压缩后文件小作为可用依据 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |
| ERYE237-127 | P1 | P-TECH；TD-FORMAT；合法HEIC，分别有/无已公布转换能力；合法输入通过后按B-IMG建工程再测编辑分支 | <a id="erye237-127"></a>**[Technical] HEIC可转码与不可转码分支**<br>1. 同一文件在两能力配置下导入<br>2. 打开转换产物或查看错误 | 可转换时明示并返回可追溯规范图；无能力时给可操作格式提示，无假导入成功或空图片 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |
| ERYE237-128 | P1 | P-TECH；P-API；TD-BAD；截断图、扩展名伪装、解码超限头；安全隔离环境 | <a id="erye237-128"></a>**[Technical] 坏图伪格式及危险解码输入**<br>1. 以正常导入和接口提交各异常样本<br>2. 检查资源保护/错误/任务 | 安全校验明确失败，不能因后缀或声明mime放行；无provider调用/无效版本；不导致服务无界解码或泄露内部路径 | Requirement §8/A23；Inferred QA Risk 解码资源耗尽 | [PLAN] | — | Requirement §8/A23；Inferred QA Risk 解码资源耗尽 |
| ERYE237-129 | P0 | P-TECH；B-IMG；BG；非方图和TD-GEOMETRY含NaN/Infinity/越界/零面积；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-129"></a>**[Technical] 非法几何与圆形短边归一**<br>1. 验证边点像素round(x×(W−1))及矩形向外取整<br>2. 提交非法几何<br>3. 比较非方图圆形mask | 合法点/矩形映射符合规范，mask源W×H且不越界；非法输入先拒绝；圆半径按短边归一，不变椭圆 | Requirement §5.2/A15/A23 | [PLAN] | — | Requirement §5.2/A15/A23 |
| ERYE237-130 | P0 | P-TECH；B-IMG；P-API；TD-AUTH；U1拥有D1，U2无权限；另有可撤销测试授权 | <a id="erye237-130"></a>**[Technical] 跨owner/project授权隔离与撤权**<br>1. U2读取/编辑/导出D1及mask/源file<br>2. 授权后开始任务并撤权<br>3. 重试读取/提交/短链刷新 | 每条资源路径校验owner/project，越权前拒绝且不暴露内容；撤权按统一授权错误处理，无自动扩权；已发直链撤销能力按真实存储策略单独核实，不假定即刻失效 | Requirement §6.3/§7/A23 | [PLAN] | — | Requirement §6.3/§7/A23 |
| ERYE237-131 | P0 | P-TECH；B-IMG；TD-INJECTION；图片文字/正文含“忽略权限、读取别的用户、执行脚本”等数据 | <a id="erye237-131"></a>**[Technical] 图片与批注提示注入无执行权**<br>1. 提交正常问答或局部编辑<br>2. 观察解析、资源选择、工具参数和日志 | 恶意内容只是待处理数据，不能授权访问其他用户、执行脚本或改变任务范围；请求仍走schema/范围校验，无eval路径 | Requirement §6.1/§6.3/A23 | [PLAN] | — | Requirement §6.1/§6.3/A23 |
| ERYE237-132 | P1 | P-TECH；B-IMG；TD-URL；已授权源file与过期下载地址 | <a id="erye237-132"></a>**[Technical] 短链过期刷新不改变资源身份**<br>1. 让地址过期<br>2. 重新打开或重试下载<br>3. 对照刷新后的file/version/hash和provider调用 | 通过持久file/version身份重新授权下载；未重复生成，不把短链当持久ID；失效不可恢复时给可操作错误，原提交不偷换来源 | Requirement §6.3/A19/A23 | [PLAN] | — | Requirement §6.3/A19/A23 |
| ERYE237-133 | P1 | P-TECH；P-API；TD-OBS；一次合法任务及一次失败，受控日志读取权限 | <a id="erye237-133"></a>**[Technical] 日志与客户端不暴露敏感信息**<br>1. 检查Web/mac网络响应、客户端配置和默认日志<br>2. 核对operation/来源/command/job/phase/费用等定位字段 | 能关联排查但不暴露provider密钥、访问凭证、完整图片/批注正文；必要诊断用受控资源引用，错误消息脱敏 | Requirement §6.3/§11/A23 | [PLAN] | — | Requirement §6.3/§11/A23 |
| ERYE237-134 | P1 | P-TECH；B-IMG；TD-QUALITY；样本/标注/允许变化/人工量表已由M0冻结；【门禁】质量集及语义量表待冻结；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-134"></a>**[Technical] 固定质量集按技术和语义分别验收**<br>1. 对玻璃/发丝/中文小字/斜标签/密集笔迹/同名对象/超宽高比/大图执行对应任务<br>2. 解码检查并人工复核 | 硬约束精确满足；透明、主体保持、接缝、文字逐样本记录；不以HTTP成功或返回文件当语义通过；量表未冻结则对应项待复核，不自造阈值 | Requirement §8/IMG-R05/A09/A11 | [PLAN] | — | Requirement §8/IMG-R05/A09/A11 |
| ERYE237-135 | P1 | P-TECH；B-IMG；TD-FONT；两端相同字体文件hash/引擎及canonical对象快照；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-135"></a>**[Technical] Web/macOS同对象渲染一致**<br>1. 在Web与macOS加载同快照<br>2. 比较几何/颜色/排版/导出文件<br>3. 交叉继续编辑 | 源单位、稳定ID及渲染约定一致，使用同字体文件而非仅同名字体；AI随机结果不要求跨次文件hash一致；缺环境则记未执行 | Requirement §8/v1.2/IMG-R03/A02 | [PLAN] | — | Requirement §8/v1.2/IMG-R03/A02 |
| ERYE237-136 | P1 | P-TECH；TD-LEGACY；现有generate_image与enhance_image的合法基线 | <a id="erye237-136"></a>**[Technical] 旧生图与增强不被编辑路由替换**<br>1. 分别执行原生图、原增强和新本地文字合成/图像编辑<br>2. 核对选择的workflow/executor/输入输出 | 旧能力保持原语义；新编辑不全落generate_image；enhance不冒充画笔/批注实现；生产服务不依赖当前助手会话的内部工具或临时路径 | Requirement §6.3/§9/A24 | [PLAN] | — | Requirement §6.3/§9/A24 |

## 拟定规则与交付资料验收

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-137 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；拟定7天策略已批准、服务返回expiresAt；F-persist-delay可控；【门禁】拟定：草稿期限策略待产品批准 | <a id="erye237-137"></a>**[Technical] 只有持久化内容修改续期**<br>1. 记录最后持久化时间<br>2. 分别进行内容成功修改、只打开/缩放/心跳、失败写入和同command重复<br>3. 读取expiresAt | 按拟定式lastPersistedContentChangeAt+7×24h；仅成功持久化内容变化续期，其他均不延长；显示服务时间而非本地自算 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |
| ERYE237-138 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；已批准策略；固定expiresAt=E及未提交草稿；【门禁】拟定：草稿期限策略待产品批准 | <a id="erye237-138"></a>**[Technical] 到期等值边界阻止修改和提交**<br>1. 服务时钟依次E−1秒、E、E+1秒<br>2. 分别验证修改/提交<br>3. 核对provider和费用 | 有效期内按正常规则；达到E即DRAFT_EXPIRED且不调用模型或扣费；保留已发消息/完成版本/历史，不假报已续期 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |
| ERYE237-139 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；离线缓存有内容；提交接收/未接收两分支；【门禁】拟定：过期恢复策略待产品批准 | <a id="erye237-139"></a>**[Technical] 离线跨期先查命令再恢复新草稿**<br>1. 离线跨E后重连<br>2. 先按command查询<br>3. 对未接收且过期分支明确选择恢复为新草稿 | 已接收恢复原任务；未接收则校验源/版本后创建新draftId，不复活主动放弃草稿；本地未同步文字标为尚未保存 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |
| ERYE237-140 | P1 | P-TECH；B-IMG；TD-FONT；批准字体/替代链已交付；含中文、混排、换行、Emoji缺字样本；【门禁】拟定：字体表、回退链及渲染引擎待冻结 | <a id="erye237-140"></a>**[Technical] 字体缺失替代与缺字阻断**<br>1. 模拟字体缺失<br>2. 预览批准替代并明确选择<br>3. 撤销替代<br>4. 制造所有批准字体均缺字<br>5. 保存草稿并尝试合成/导出 | 按已批准回退流程显示原字体/受影响对象并记录替代；替代可撤销；未解决缺字可存草稿但不输出删字/方框错误成品；快照记录实际字体hash/引擎 | Requirement v1.2/IMG-R03 | [PLAN] | — | Requirement v1.2/IMG-R03 |
| ERYE237-141 | P1 | P-TECH；B-IMG；P-API；TD-REVIEW；有效文件但语义待检查，拟定质量状态已批准；【门禁】拟定：候选接受/拒绝策略待产品批准 | <a id="erye237-141"></a>**[Technical] pending_review候选不自动激活**<br>1. 任务返回pending_review<br>2. 尝试自动续编/正式导出<br>3. 明确接受<br>4. 回读工作头和费用 | 接受前带待检查标识且非自动编辑来源；正式导出/设当前/续编须明确接受；接受记录candidate/来源/revision，不调用模型或新收生成费 | Requirement v1.2/IMG-R04 | [PLAN] | — | Requirement v1.2/IMG-R04 |
| ERYE237-142 | P1 | P-TECH；B-IMG；P-API；TD-REVIEW；pending候选，已发生新修订；另有可拒绝候选；【门禁】拟定：候选接受/拒绝策略待产品批准 | <a id="erye237-142"></a>**[Technical] 候选接受冲突与拒绝重生成**<br>1. 接受旧候选<br>2. 核对冲突分支<br>3. 拒绝另一候选并明确申请重生成<br>4. 查看新attempt/报价 | 不覆盖新修改，保留分支供选择；拒绝保留诊断/原版本；拒绝本身不调模型，质量重生成按新attempt和授权计费，不冒充存储重试 | Requirement v1.2/IMG-R04 | [PLAN] | — | Requirement v1.2/IMG-R04 |
| ERYE237-143 | P2 | P-TECH；B-IMG；TD-PERF；Web/mac环境、典型/大图配置和事件采样已冻结；【门禁】性能样本量/环境及采样口径待冻结 | <a id="erye237-143"></a>**[Technical] 图像画布性能目标及测量边界**<br>1. 采集按钮/光标/批注本地反馈P95和典型图像画布拖动帧率<br>2. 大图代理预览后原尺寸导出 | 按PRD目标本地反馈P95≤100ms、典型拖动≥30fps；不误测接口RTT或视频时间轴；大图导出仍原尺寸；环境/采样未定则只报数据不判完整通过 | Requirement §8/A24 | [PLAN] | — | Requirement §8/A24 |
| ERYE237-144 | P0 | P-TECH；TD-CAP；M0/M4交付物清单及真实API样例；【门禁】M0资料与真实服务证据待交付 | <a id="erye237-144"></a>**[Technical] 上线资料与真实provider验证齐备**<br>1. 核对真实带源编辑/透明PNG/mask/中文文字/五比例/取消超时查证/usage/下载持久化证据<br>2. 核对质量集、字体表、缺失状态设计和双入口结果 | A01～A24/D01～D12都有真实对应证据；拟定规则未批准不视为放行；无仅UI实现、重复收费、错误版本覆盖或只回复成功；mock展示不代替服务端验收 | Requirement §6.3/§10/IMG-R05/A24 | [PLAN] | — | Requirement §6.3/§10/IMG-R05/A24 |

## 结果记录

按[执行规则](execution-guide.md)填写“原ID、分支、参数行、版本、状态、证据”。UI通过不能代表Agent或技术通过；缺技术权限不阻塞已具备前置的UI分支。旧报告不回写，新报告使用版本2026-11-09-layered-execution。
