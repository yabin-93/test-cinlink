2026-11-18范围修订：关联029的页面自定义36px字号前置已取消，按默认字号验收；017菜单和红线8px等独立步骤仍按原证据记录。本次未重跑，不据此自动改判整项通过。详见docs/cases/requirements/ERYE-237/revision-ui-text-size-20261118.md。

# FWXC-380 Chrome预发回归（2026-11-17）

本轮 **原回归 Blocked / 扩散一 Failed / 扩散二 Passed**。账号yabinc92，Google Chrome原生有头，预发staging-app.cinlink.ai。官方OpenAPI 19:27:57回读仍为**已修复**，0状态写入；原阻塞不由扩散结果代判。固定可重跑脚本仍PLAN，本轮为CUA执行与一次性文件核验。无云效评论、附件、新单或Git提交推送。

## 原回归：Blocked

原缺陷包含017“仅本地修改对象”和029“纯内容合成”两个分支。原017精确底图为历史实际导出 `reports/img-tb-ui-016-020-20261109/019-result-export.png`，1024×1024、1721358字节、SHA256 `03731f31ca47c8487bb22bfa2a521fc0b278f2a4bb5b1d08ec47a3f776a564a4`，对应完成版editor_image_7900edb5adaf4e419b5fad695963a7ef。固有红线和蓝字“导出测试”为底图像素。恢复到预发后实际导出与原文件字节相同。

页面建立了新红线S1、红色“T1 新品”、左侧红色空心矩形H1，并完成T1移动和缩边。原右键/Control点击均未打开H1菜单删除入口；键盘BackSpace实际删除、一次Undo恢复，转作扩散一的准备差异。原029要求1254²干净源、红色8px线、蓝色36px文字，精确对象字号/8px条件未完成；用户亦已确认无法设置字号，不把共用滑杆或默认字号当作对象36px。严格原目标未完整执行，保持Blocked。

项目717802a9-9d87-4653-8bf4-51c72f58f8ae。登记run_v2_412b159a999b4b1fac88f8e737bde80b为30秒完成；打开原017底图run_v2_2bfd05aa1f20448d95b955136cec39d8为95秒完成。准备中的editor_image_project_create报invalid JSON for conversation_id，后续editor_open成功，错误保留，不重发。未把准备节点失败当成本例目标已执行。

## 扩散一：Failed

原017相同底图和完整指令，H1删除预操作改为键盘BackSpace+Undo；新S1放右上空白便于与底图固有红线区分。未使用扩散二的图或结果。会话92931eff-6c28-47e8-b15a-f3a4d972b5be，工程9a514b20-e80b-43bd-b0df-4b74675f8bd9，源版editor_image_be24b8f4bf9043869137a8bc03510927；目标请求时1024²、revision9。

携画笔引用仅发送一次：

> ERYE237-017：仅做当前图片画笔草稿的结构化对象编辑，不提交合成、不生成图片：将文字“T1 新品”移回源图左上区域原位置（归一化x=0.083,y=0.36），删除当前草稿左侧红色空心矩形H1，保留当前红线S1及底图固有蓝字“导出测试”。如需要对象身份请从当前编辑器读取并解析，不把像素文字当对象。

run_v2_7c60c858c99849fabd036861b59ca07b，60秒done，intent_fully_satisfied=false；实际计划仅editor_view_get done，0结果文件。终态画布T1仍在下方、H1仍在，未执行要求的移动和删除。原误生成未复现，但本地对象编辑业务未完成，不能仅凭未生成判通过。费用/provider未核。

证据：380-O017-three-objects-ui.png、380-O017-move-resize-ui.png、380-E1-H1-key-delete-ui.png、380-E1-before-submit-ui.png、380-E1-terminal-ui.png、380-E1-target-api.txt。

## 扩散二：Passed

独立会话941b97e4-ad5a-4e4b-b778-e71baa1f3e50、工程8b589bcd-f5e5-47c4-8199-63adfd38b0a9，源版editor_image_8c30d1febe924e92bd92be4e22dae008。原029干净底图为source-before-text.png，1254²、2615339字节、SHA256 `79eb642da31688e5ccc91f11a1be96dbb61677f6f61d08434b8433a604dd73db`；当前实际源导出字节一致。独立打开准备91秒完成，同样create节点参数报错后进入编辑器成功。

页面建立红线#FF1818及蓝字#2008F8“导出测试”，字号和线宽采用页面实际默认值；此变体不代替原8px/36px条件。合成前实际下载PNG已解码查看，红线和文字准确可见。只发送一次：

> ERYE237-029：仅将当前红线和文字‘导出测试’作为图片内容合成，保留人像、黄色手包、背景及1254×1254画幅，不调用AI重绘。

run_v2_057940be75c946338e2d8b45ecaf5a0f，63秒done、intent_fully_satisfied=true。实际editor_view_get + editor_image_document mode=publish。合成前后实际下载PNG均1254×1254、2614181字节、SHA256 `d9b49938a8e782d914dd2fe2502cbbf92ba29fbdaeec418874d42482978b8931`，**字节完全相同**，红线/准确文字、位置/颜色及其余像素保持。未从完成文案推断内部provider或费用。

证据：380-E2-source-export.png、380-E2-redline-blue-text-ui.png、380-E2-before-compose.png、380-E2-before-submit-ui.png、380-E2-terminal-ui.png、380-E2-result.png、380-E2-result-file-audit.json、380-E2-target-api.txt。完整原始证据在reports/fixed-monitor-20261116-135748/，素材溯源见fixtures/380-original/manifest.json。

## 状态同步

state.json和progress.json已同步，本项从待办移除。43项最新轮原15P/1F/10B/17NR，扩散40P/7F/3B/36NR；剩余17项，继续FWXC-578。旧23项和归档536R1不计入。没有改变原失败的正式需求结论；只记录本轮实际覆盖范围。
