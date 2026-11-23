# ERYE237本轮失败候选（2026-11-17）

历史范围说明：用户随后将这4条失败及10条阻塞改为图片批注UI；[新版](../cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md)已进一步去重为3条补充待执行＋11合并索引。本文件仅保留旧范围候选，不作为新版缺陷结论，也未验证原问题修复、未修改云效。

生产：https://app.cinlink.ai/；ego-browser有头。17条本轮3P/4F/10B。以下4条Failed整理为3类本地候选；**未查重、未提交云效、无新云效编号**。原105/107及FWXC-652/653/610不变。完整步骤、原提示词、请求及证据见[执行报告](../cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md)。

## 【ERYE237-092】已发布图片编辑命令不支持同批别名映射

**现象**：要求同批创建文字别名A、再引用A移动，并返回alias→稳定ID时，Agent明确回复契约不支持，未执行。

**前置步骤**：生产授权portrait.png工程及原图已打开；有可读绘制草稿。

**提示词**：见本机092-agent-submission.json，明确不拆批、不以预置稳定UUID替代别名。

**复现步骤**：发送当前用例同批别名指令；等待终态；核对实际工具、回复和文档。

**实际结果**：44秒done；明确当前editor_image_edit未提供别名声明、同批引用和ID映射返回，本轮不调用工具。

**预期结果**：当前用例所列别名链能够在单批完成并返回稳定ID映射，跨批旧别名另作负向。

**影响**：当前契约不能执行该对象创建后引用链。

**补充**：未调用不存在协议，也未声称动态跨批负向已执行；依据当前用例§6.1/A12及发布客户端契约。最新需求原文未在本轮另行回读，提交前可按现行需求复核映射。

**失败截图**：本机`reports/erye237-revised-eleven-plus-six-ego-prod-20261117/092-agent-terminal.png`。

## 【ERYE237-102】【ERYE237-106】在途图片任务将不同输入/新请求静默复用为原任务

**现象**：同ID变更prompt和新ID另一目标都返回202原task，未明确告知新目标未受理。

**前置步骤**：生产portrait.png原版；一个本轮原生生成正在运行。

**提示词**：原任务“选区添加小蓝色圆点”；102变为紫点，106为浅紫色背景。完整请求见本机102-changed-payload-request.json、106-new-operation-busy-request.json。

**复现步骤**：从UI单次提交原任务；运行中以同operation_id仅改prompt提交102；再读取当前revision，以新operation_id和新合法prompt提交106；回读任务及冻结submission。

**实际结果**：两次均HTTP202、task_id705e0d3a；原submission仍是蓝点。**未多建任务，未证实重复生成或额外扣费**。

**预期结果**：同ID异payload明确拒绝复用；同文档第二目标明确BUSY或说明未受理，不能让调用方按新请求成功处理。

**影响**：调用方可能误认为新目标已受理，丢失用户意图或把新操作ID关联到旧任务。

**补充**：102/106是不同验收点，当前现象疑似同一在途任务复用分支；不推断服务端根因。独立provider/账本未覆盖。

**失败截图**：真实页面`098101102106-probed-ui.png`；页面不显示API状态码，接口请求/响应必须同时看对应本机JSON。

## 【ERYE237-104】无图像视图的文档新增文字请求结束但没有执行

**现象**：明确要求对有权限的现有图片文档新增NO-VIEW-104，Agent只做读取后结束，无解释且目标未保存文字。

**前置步骤**：目标portrait.png已存在且可读；刷新卸载图像编辑器并关闭另一测试页，仅workspace通道、editor_visible=false。

**提示词**：见104-agent-submission.json，明确不打开/恢复图像视图、只新增本地文字，不生成或导出。

**复现步骤**：验证当前没有可用图像视图；发送无视图文档指令；等终态；回读文档并重新打开原版。

**实际结果**：99秒done，仅editor_view_get→editor_project_get→editor_view_get；intent_fully_satisfied=false，回复为空；R326和draft=null保持，没有NO-VIEW-104。

**预期结果**：按当前用例要求，无视图仍能在授权文档中保存指定本地文字；视图缩放应单独说明不可用。

**影响**：该Agent文档请求未完成，用户没有得到限制说明。

**补充**：不据此断言后端接口不存在；未实际发缩放命令，缩放拒绝专项不计通过。

**失败截图**：`104-agent-terminal.png`、`104-reopened-original-ui.png`；需结合104-final-messages.json和前后project JSON核对。
