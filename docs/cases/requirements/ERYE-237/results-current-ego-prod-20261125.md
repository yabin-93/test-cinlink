# ERYE237 生产环境执行 2026年11月25日

范围为当前122编号、109条独立用例及13合并索引。ego-browser有头TaskSpace61，生产https://app.cinlink.ai/，前27条结果账号Torvalds；重新登录后账号yabinc18，原工程不可访问，后续使用当前账号独立准备的基线，逐条标明账号。按每例当前主分支及参数执行；配对/技术补充未覆盖不继承通过。固定脚本接入暂停，原PLAN/脚本映射保留；结果不写用例正文或统一导航。

当前统计：{"Passed":42,"Not Run":61,"Failed":4,"Merged Reference":13,"Blocked":2}。本轮未结束，Not Run表示尚未执行。

## 前置处理

专用会话项目dce4b541-b15f-455c-9711-4213a33d2841导入5份授权素材，跳过分析；0/0分析不代表没有素材。会话9c5fdb8e-ffc0-4f29-91df-79b8a6f382e9。Agent首次去背景准备run_v2_6e3d2019acdf4d0ca5b4fc103fb4927f实际Failed：EDITOR_TARGET_REQUIRED及后续INVALID_ARGUMENT，未产出；原失败保留且未点重试。打开原图后独立使用UI移除背景，已返回1254²真实透明PNG并保存完成版，源图完整RGBA与授权本地素材一致。短暂恢复提示随后页面自行恢复，未重复生成。准备不计正式用例通过。

yabinc18续测项目9134f655-ed37-4956-941e-d4e8f993eebd、会话efe78fda-94dc-4210-87bd-1e9258ff9575，5授权素材跳过分析。Agent准备run_v2_0cb7f2829fac4cea9d0f38505c89b576因参数不匹配失败，原请求未重发；独立UI移除背景已完成，图片工程3cb22754-ae25-48f1-9da0-decb0528d39a原图5395b054与透明结果6acc997f均保存。原图1254平方及RGBA与授权原文件一致，详见resume-portrait-fixture.json。

## 逐条实际结果

| 用例、分支及账号 | 状态 | 实际结果 | 本批证据文件 |
|---|---|---|---|
| ERYE237-001 / UI / Torvalds | Passed | 上传图已完成UI处理并返回产物；新提示词图已实际生成并建独立工程。经工程入口分别打开登记基线，名称/尺寸/画布RGBA及历史正确，纯打开未新增处理或完成版。 | 001-independent-oracles.json、001-projects.json、001-portrait.png、001-generated.png、generated-png-audit.json |
| ERYE237-004 / UI / Torvalds | Passed | 已建立同工程三版后，实际依次打开V1灰底、V2蓝底、V3绿底并停留V3；每版画布匹配各自独立PNG，旧版完整可读，查看未新增版本。与005收尾版本检查共享同组真实操作证据。 | 004-005-version-states.json、004-005-final-history.json、004-005-V1-original.png、004-005-V2-blue.png、004-005-V3-green.png |
| ERYE237-005 / Agent / Torvalds | Passed | 灰底原版→蓝底→以蓝底继续绿底，两次原任务done/applied；两份实际1024²PNG人物/红衣/双耳机保留；同工程3版及原源保存，V1/V2/V3实际画布与独立文件RGBA一致。 | 005-blue-terminal-job.json、005-green-image-job.json、005-blue-result.png、005-green-result.png、004-005-version-states.json、004-005-final-history.json |
| ERYE237-006 / Agent / Torvalds | Failed | 原V1灰底实际选中后仅发一次48px白字分支指令；任务报Editor did not confirm the action，48px分支测试已写入V1草稿，但未完成合成/未新增完成版；原蓝/绿历史保持。未点击重试；底层确认回执未单独取得。 | 006-observation.json、006-terminal-messages.json、006-after-project.json、006-after-history.json、006-failure-final.png |
| ERYE237-008 / UI / Torvalds | Passed | 红线/文字/矩形两次收起展开均可分别选择，六次选择边界准确且各不同；原T1追加已恢复后再次重开仍可编辑，3对象ID及原位置保持，待发画笔引用仅1份。 | 008-before-project.json、008-after-project.json、008-selection-matrix.json、008-three-objects.png、008-cycle2-T1.png |
| ERYE237-009 / UI / Torvalds | Passed | 25/50/100/150/200%和适应窗口六档均实际核验；显示尺寸准确，源RGBA及两项历史保持；未新增生成。 | 009-rows.json、portrait-baseline-state.json |
| ERYE237-010 / UI / yabinc18 | Passed | 登记Q=(.50,.55)，25%/200%/适应窗口及返回100%均定位同一正文/锚点/引用；确认tool-view可平移后在无遮挡画布实际左100上50拖动，Q随图移动源坐标不变；图外灰区未新增批注，源像素/历史保持。先前拖到浮层无画布作用的操作不计平移证据。 | 010-25%-state.json、010-200%-state.json、010-fit-state.json、010-real-pan.json、010-after-pan-locate.png、010-grey-no-new.png、010-return100.png、010-final-check.json |
| ERYE237-012 / UI / Torvalds | Passed | 编辑中返回先继续，原对象/来源/唯一引用保留；再明确放弃后实际切I2并回I1，已放弃草稿不恢复，原源和完成历史保持。与083/084共享实际确认分支取证。 | 012-083-continued.png、084-discard-dialog.png、012-switched-I2.png、012-084-final.json |
| ERYE237-013 / UI / yabinc18 | Passed | 列表实际从I2商品图绘制态切I1人像，未弹退出确认，但I2草稿持久化保留；切回I2自动恢复同一笔像素且可再次选中，未静默丢失或串到I1。最后仅明确放弃自有测试笔迹，完成历史保持。 | 013-I2-unsent-draft-state.json、013-switch-attempt.png、013-after-switch-I2-project.json、013-I2-reopened-project.json、013-isolation.json、013-I2-restored-selectable.png |
| ERYE237-014 / UI / Torvalds | Passed | 进入画笔显示完整子工具栏及唯一画笔引用，未落笔时源图和两项完成历史保持，无新图片任务。 | 014-entered.png、014-history.json |
| ERYE237-015 / UI / Torvalds | Passed | A初始空画笔点击发送明确要求先添加修改；B绘制后撤销至空发送禁用、未派发点击。两组均无新图片任务/版本，两历史保持。 | 015-A-after-click.png、015-B-empty.png、015-B-project.json、015-B-dispatch-outcome.json、015-history-after.json |
| ERYE237-016 / UI / Torvalds | Passed | 8px红色连续折线一次手势绘制；一次撤销恢复原基线RGBA，一次重做完整恢复笔迹RGBA，未逐点撤销。 | 016-states.json、016-drawn.png、016-undo.png、016-redo.png |
| ERYE237-017 / UI / yabinc18 | Passed | 实际选择手柄移动并缩放T1新品，只有T1几何变化；删除H1后单次撤销完整恢复，S1保持。点击底图ACME固有文字无编辑对象/文字输入；清理本例后原图RGBA和2完成历史保持。S1实际18px，本条无固定笔宽门禁。 | 017-assertions.json、017-before-project.json、017-after-move-resize-project.json、017-after-delete-project.json、017-final-project.json、017-intrinsic-text-attempt.png、017-clean-source-state.json |
| ERYE237-018 / UI / Torvalds | Passed | 白色默认字号新品 Hello 2026创建后收起重开，选中原对象追加已恢复；再次重开可编辑同一对象，全文/位置/默认显示字号/颜色保持，无生成。 | 018-created-project.json、018-after-project.json、018-created.png、018-edited.png、018-reopened-editable.png |
| ERYE237-020 / UI / yabinc18 | Failed | 六类形状均创建、收起重开及逐一选中；合法红/绿样式修改仅改变工具默认色，六对象仍蓝且画布不变，当前UI未见应用到所选入口。每行撤销作用于上一绘制，已重做恢复后测下一行；稳定回读6对象与原矩阵逐字一致，未把重做保存前5对象快照当最终态。自有草稿已清理。 | 020-style-fixture.json、020-style-rows.json、020-object-audit.json、020-six-reopened-rect-selected.png、020-直线-style.png、020-圆形-style.png、020-final-stable-project.json |
| ERYE237-022 / UI / yabinc18 | Passed | 100%下Q0真实点击映射源像素(355,662)，独立PNG为RGB209/199/194，吸管回读及新8px笔实色一致，撤销恢复源RGBA。Q1在红色content描边内部取到255/0/0，另一处新8px验证笔实色同为红，源/完成历史保持，未生成。 | 022-Q0-actual-sample.json、022-rgb-assertions.json、022-Q0-sampled.png、022-Q0-verification-canvas.png、022-Q1-red-content.png、022-Q1-sampled.png、022-Q1-verification-canvas.png |
| ERYE237-024 / UI / yabinc18 | Passed | 画笔内橡皮同一纵向手势穿过红色S1中段和底图ACME三角线条，S1局部擦开，底图线条区域像素哈希与原源一致；单次撤销恢复整条S1原RGBA，未使用AI擦除。 | 024-before-project.json、024-after-project.json、024-pixel-comparison.json、024-S1-before.png、024-erased.png、024-undo-restored.png |
| ERYE237-025 / UI / yabinc18 | Passed | 画笔内橡皮分别擦过T1字形和H1描边，每次对应对象整体移除；两次分别撤销按原像素恢复H1及T1。两对象移除后画布RGBA等于独立原源，底图固有ACME文字未被擦除。 | 025-eraser-check.json、025-both-before.png、025-T1-erased.png、025-H1-erased.png、025-H1-undo.png、025-T1-undo.png |
| ERYE237-029 / UI / yabinc18 | Failed | 单次原请求Agent终态Failed：EDITOR_ACTION_NOT_APPLIED且无result_files；随后未重发却迟到落库融合版c570f394，任务失败与实际完成不一致。独立UI下载真实PNG1254平方，RGBA与提交前含红8px线和蓝色导出测试文字的整幅画布逐像素完全一致，内容合成本身通过；交付终态/文件结果失败。原图/完成历史保留，无重复生成；签名链接读取超时另记取证问题，UI下载成功。 | 029-current-messages.json、029-final-messages.json、029-terminal-failure.png、029-after-history.json、029-late-history.json、029-late-file-audit.json、029-late-ui-result.png、029-late-completed-version.png |
| ERYE237-031 / UI / yabinc18 | Passed | 真实融合版的蓝字像素点击无旧编辑对象。原V1创建白色当前默认8px的031源草稿，续编同一ID追加已恢复，明确继续分支保留可编辑正文；再次返回明确放弃后重入不恢复旧D，原源RGBA及3完成版本保持。 | 031-fused-pixel-not-object.png、031-before-edit-project.json、031-after-edit-project.json、031-same-object-edited.png、031-continue-kept.png、031-reentered-no-old-draft-state.json、031-after-return-project.json、031-final-history.json |
| ERYE237-033 / UI / Torvalds | Passed | 图内Q创建唯一批注及准确正文；点击图外灰区未新增批注或引用，源图保持；未发送生成。 | 033-point-created.png、033-grey-fields.json、033-final.png |
| ERYE237-034 / Technical / Torvalds | Blocked | 缺F-candidate-delay隔离延迟及释放控制；自然识别耗时不能代替可控迟到响应，正式故障步骤未执行；其他UI继续。 | fault-control-preflight.json |
| ERYE237-035 / Technical / Torvalds | Blocked | 缺F-candidate-fail定向识别失败控制；未识别到物体与识别接口失败不同，不能冒称故障分支通过；自定义输入可用仅作观察。 | fault-control-preflight.json |
| ERYE237-040 / UI / yabinc18 | Passed | 第一条重复添加仍1份；修改同一批注名称及正文后重添更新原引用。另建同名不同锚点第二条后恰2份，逐条重开各自全文正确，未按同名合并或串用。 | 040-dedup-same-name.json、040-updated-single.png、040-A.png、040-B.png |
| ERYE237-041 / UI / yabinc18 | Passed | 使用引用按钮已声明的Delete移除操作（聚焦引用后按Delete，非空输入框退格），待发引用归零；原画布批注及完整正文/锚点保留，重开正确。 | 041-before.png、041-reference-only-removed.png、041-fields.json |
| ERYE237-042 / UI / yabinc18 | Passed | 两批注均引用后，通过第一条浮层右上垃圾桶删除，第一条标记及引用一起消失；第二条名称/全文/锚点和唯一引用保持。 | 042-before-delete.png、042-second-preserved.png、042-delete-linkage.json |
| ERYE237-057 / UI / yabinc18 | Passed | 按固定G1/G2，仅全选非空G1并退格一次清空，立即停止删除；两引用各自重开全文/锚点保持，再输入G2仍各一份，源像素/历史无改动，未发送。 | 057-global-isolation.json、057-before.png、057-empty.png、057-restored.png |
| ERYE237-078 / UI / Torvalds | Passed | 真实透明完成PNG导出JPEG，设置明确白色填充；实际1254²JPEG解码及主体核验通过，原透明区域采样全白，导出前后原PNG字节SHA一致；无自定义蓝色填充入口，该可选分支NA。随后额外工程回读遇401，未宣称该回读通过。 | 078-jpeg-settings.png、078-download.json、078-file-audit.json、078-transparent-to-jpeg.jpg、078-original-png-after.png |
| ERYE237-079 / UI / Torvalds | Failed | 当前导出弹窗只有格式选择，未提供文件名和输出尺寸入口，无法设置商品图-验收及800×800，未伪造字段或另行缩放文件。需求支持指定尺寸及通用导出容器，按功能缺失记Failed。 | 079-missing-controls.png、079-controls.json |
| ERYE237-082 / UI / Torvalds | Passed | 导出仅提供PNG/JPEG，TIFF不可选；两格式各一次实际下载并完整解码，签名/编码/扩展名正确且均1254²，源工程完整回读前后不变；仅当前格式与文件范围。 | 082-options.png、082-downloads.json、082-file-audit.json、082-before-project.json、082-after-project.json |
| ERYE237-083 / UI / Torvalds | Passed | 编辑中返回的继续编辑及X关闭两分支均留在原I1编辑状态，3个草稿对象及已追加文字保留，画笔引用保持1份，来源不变。 | 012-083-continue-dialog.png、012-083-continued-project.json、083-closed-project.json、083-closed.png |
| ERYE237-084 / UI / Torvalds | Passed | 明确放弃仅清本轮3个未发草稿及引用，切其他工程再重开原图未恢复旧草稿，原图RGBA、完成历史及已发消息保持。 | 084-discard-dialog.png、012-084-final.json、012-084-returned-I1.png |
| ERYE237-085 / UI / yabinc18 | Passed | 自定义左耳/添加银色耳钉及引用已保存，收起再展开全文/名称/锚点保持；实际切另一图片未询问但未丢草稿，返回原图同一批注及唯一引用仍在，未授权放弃亦未静默丢失。 | 085-saved-before-project.json、085-reopened.png、085-switch-attempt.png、085-returned-preserved.png、085-after-project.json、085-final-fields.json |
| ERYE237-091 / UI / Torvalds | Passed | 无识别候选时先自定义对象名；同一有效标签下空正文添加禁用，填合法正文后仅新增一条引用；未发送。 | 091-empty-valid-label.png、091-valid.png、091-final-fields.json |
| ERYE237-096 / UI / Torvalds | Passed | 有效对象名准备后，完整中文含换行输入后立即添加；引用重开逐字一致，首尾/换行不丢失，仅一条引用；未发送。 | 096-fields.json、096-final.png |
| ERYE237-103 / UI / yabinc18 | Passed | 两处未发送批注依次输入狗/球要求，左侧替换完整正文后切右再切左，右侧原文与左侧最新全文/名称均保持，编号总数仍2；未新增或发送。 | 103-isolation.json、103-right-preserved.png、103-left-preserved.png |
| ERYE237-111 / UI / yabinc18 | Passed | A旧标记删除后旧引用同步消失，在原位新建C并引用；仅新C与原B两份，分别重开正文/名称正确，旧内容未复活；实际编号按页面记录，不要求重用策略。 | 111-after-A-delete.png、111-新标记.png、111-保留标记.png、111-identity-lifecycle.json |
| ERYE237-112 / UI / Torvalds | Passed | 浮层正文、设置展开收起、添加操作均仅保留原1条批注；垃圾桶后0条，未穿透新建，源图保持。 | 112-added.png、112-deleted.png |
| ERYE237-113 / UI / yabinc18 | Passed | 四角(.02,.02)/(.98,.02)/(.02,.98)/(.98,.98)独立实际输入、自定义名、添加、引用重开及垃圾桶清理均可达，各角正文/锚点正确；首次重开读取早于浮层就绪，等待后全文正确，不计产品失败；未发送。 | 113-parameters.json、113-左上.png、113-右上.png、113-左下.png、113-右下.png |
| ERYE237-114 / UI / yabinc18 | Passed | TD-ANN35八段原文经正文滚动，仅选择第4段并通过键盘输入替换；添加后重开全文逐段一致，其他七段及首尾换行完整保留，未发送。 | 114-native-selection.json、114-text-comparison.json、114-before.png、114-after-replacement.png、114-reopened.png |
| ERYE237-115 / UI / Torvalds | Passed | 同一已引用批注清空时添加禁用，恢复合法正文并更新后仅一份引用，重开为完整新正文，无拼接或重复；未发送。 | 115-empty.png、115-fields.json、115-final.png |
| ERYE237-116 / UI / Torvalds | Passed | 仅展开再收起对象设置未选择候选；名称、正文、锚点及批注身份保持，添加仍为原批注；未发送。 | 116-settings-open.png、116-projects.json、116-final.png |
| ERYE237-117 / UI / yabinc18 | Passed | 右侧A已引用，左侧B始终未引用；通过B垃圾桶删除后，仅剩原A一份引用，重开名称/正文/原锚点一致，未误清或错指。 | 117-before-delete.png、117-A-preserved.png、117-isolation.json |
| ERYE237-118 / UI / Torvalds | Passed | 正文区域普通滚轮上下各三次，正文完整、缩放档及图像内锚点/数量保持，未新增笔迹或选区；未发送。 | 118-fields.json、118-final.png |
| ERYE237-119 / UI / Torvalds | Passed | 尖括号、HTML样式字面字符串、引号和&完整保存显示，未解析为新增b元素；引用重开全文一致，未发送。 | 119-fields.json、119-final.png |
| ERYE237-120 / UI / yabinc18 | Passed | 当前编辑器原已达允许最大宽度872，先建立较宽聊天列基线再实际拖动使其变窄；5条指定长名称引用均可逐条打开自身名称/正文及位置，输入框和发送入口可达；未发送，分栏恢复。 | 120-layout-checks.json、120-before-narrow.png、120-narrow.png、120-all-accessible.png |
| ERYE237-121 / UI / yabinc18 | Passed | 依次创建左下A、右下B、右上C，按C→A→B添加，逐引用重开正文/名称及原锚点正确；实际显示顺序留档，源像素/历史保持，未发送。 | 121-order-binding.json、121-左下.png、121-右下.png、121-右上.png |
| ERYE237-122 / UI / Torvalds | Passed | 主输入G1及末尾追加保持，批注P2与唯一引用准确，两控件不串值。首次键盘End未将光标移到末尾属于操作准备偏差，原图留档；用全选后右键光标折叠至末尾完成追加。未发送。 | 122-fields.json、122-final.png、122-input-position-invalid-fields.json |

## 证据和边界

原始目录reports/erye237-current-ego-prod-20261125/；plan.json保存本轮完整设计及正文哈希，execution-state.json保存逐条状态/参数/时间，checkpoint.json保存原窗口和任务。当前任务若已受理只追踪，不自动重发。未通过与技术前置缺口分别记载；未修改云效或Git提交。
