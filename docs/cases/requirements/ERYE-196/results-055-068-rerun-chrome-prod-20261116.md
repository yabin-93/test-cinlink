# ERYE196-055、068 优化后重跑

后续缺陷提交：2026-11-16 ERYE196-055/068失败缺陷已同步云效：055→FWXC-623，068→FWXC-624。436条索引及详情快照去重后新建2条，5张截图及2份核验附件、正文/字段通过官方OpenAPI回读；旧缺陷未修改。Failed及PLAN/空脚本保持。[同步报告](../../../defects/ERYE196-055-068-sync-prod-20261116.md)。下文“无云效写入”指实测阶段，提交阶段以本记录为准。

2026-11-16，生产环境。Chrome原生有头执行，Safari U1独立保存对照，ego yabinc18为U2权限前置对照。未接固定脚本，仍PLAN/空路径；本轮未写云效。

| 用例 | 当前结果 | 覆盖 |
|---|---|---|
| ERYE196-055 | Failed（保存失败草稿恢复分支） | 阻断真实保存请求建立未保存输入；远端更新后本机输入保留；明确重试后本机文字被服务器值替换，无可见冲突说明/继续保留入口。纯延迟响应未建立未保存前置，不计该分支通过。 |
| ERYE196-068 | Failed（旧标签页内容残留） | 同一Chrome从U1退出再登录U2，旧U1工程页仍显示视频、字幕、历史和U1身份，并报404；U2新打开同址被404拒绝。无服务器越权读写结论。 |

## 055 实际步骤与判定

工程会话a9a99d8f-02fa-4889-9bb9-30a752a925a2，实际工程3c731ad9-018d-4784-ae38-7e78db2f5b55。开始为Welcome4～6秒、Second caption10～12秒、A20+B10、原声及固定BGM0～20秒/100%。本轮无Agent提示词，均手动编辑。

1. 先保存“055准备基线”，通过真实页面Network定位POST `/cloud-tool-api/v1/editor/projects/save`。只对该地址配置自定义限速（延迟600000ms、上传1kbit/s），全局No throttling。输入“本机草稿未提交”后请求pending，但Safari独立读取已为同文；因此延迟只是未确认响应，不能认定未落库，未执行基于该前置的冲突断言。
2. 追加保存失败恢复观察：只阻断上述真实保存地址，其他同步/查询通道保持；输入“055本机待保存”并Return。实际请求blocked:devtools，1 affected，编辑器只读并显示“已保留你的原始提交。请再次确认以继续编辑。”，含重试原始提交/导出更改/加载当前服务器状态。
3. Safari刷新重开仍为“本机草稿未提交”，证明“055本机待保存”尚未进入服务器。在Safari将C1保存为“055云端新文”。Chrome本机仍保留“055本机待保存”，未被远端事件抹除，该观察通过。
4. 取消阻断，尝试“加载当前服务器状态”未见页面状态变化，不单凭该无变化推断根因。明确点击“重试原始提交”后出现新保存请求，返回200、applied=false、replayed=false、current.revision=43，current内C1为“055云端新文”。随后Chrome恢复可编辑，输入显示云端新文，原本机文字及原始提交恢复条均不再显示，没有可见差异说明或继续保留/重新应用本机文本入口。
5. 因需求要求差异时可保留/比较并选择处理，保存失败草稿在明确重试后被无说明地替换，记录Failed。没有称为远端新文被覆盖、服务器保存成功或全分支通过；原优化的“纯延迟未保存窗口”仍未覆盖，保存阻断是本轮追加的真实故障恢复分支。
6. 本轮自有字幕已手动恢复Welcome；网络阻断取消、全局No throttling，DevTools已关闭。独立刷新清理核对及068后续见下续记。

证据目录：`reports/erye196-055-068-rerun-chrome-prod-20261116/`。重点：055-save-blocked.ax.txt/.jpg、055-server-before-remote.ax.txt、055-remote-save.ax.txt、055-T1-remote-arrived.ax.txt/.jpg、055-retry-original.ax.txt、055-retry-result.ax.txt、055-retry-response.ax.txt、055-retry-lost-local.jpg。原始诊断文件仅本机；对外引用去除鉴权头和签名链接。

## 068 检查点

用户指定ego浏览器U2，页面实际账号yabinc18；Chrome与Safari为yabinc92（U1）。在ego同一TaskSpace6新建p2直接打开U1会话，显示Conversation SSE HTTP 404，无U1工程内容，证据068-U2-no-access.txt/.png。只完成不同账号/权限前置，未把U2登录在独立浏览器当成Chrome切换隔离通过。

068步骤B完成：Chrome U1工程已恢复Welcome，输入“068-U1-未发送草稿”但未发送；已截图。步骤C已通过页面退出U1到生产登录页，等待用户在原Chrome登录U2。Safari U1继续保留作订阅对照，不清理Chrome站点数据。

收尾补充：Safari独立刷新重开已确认Welcome4～6秒、Second caption10～12秒、总长30秒保持。ego TaskSpace6保留U2无权限对照页并handOff；等待Chrome U2登录后按检查点续跑，不重发055。

## 068 登录U2后续测（2026-11-16）

1. 用户确认Chrome已登录，页面实际账号yabinc18 Free，workspace仅显示U2项目，输入框为空，无068-U1-未发送草稿。账号前置成立。
2. 本轮主标签页后退实际返回原Gmail页，未复活U1编辑页。该分支只记录真实导航结果，不冒称测到不存在的编辑页历史项。
3. 切至本轮055准备的同Chrome、未刷新的第二标签页（a9a99d8f会话），仍看到yabinc92 Creator、原U1项目列表和会话聊天、视频画面、Welcome4～6秒和Second caption10～12秒、A20+B10/原声/BGM30秒工程；底部已报Conversation SSE HTTP 404。截图与完整AX均留存。旧页面在退出并切换账号后没有清理已加载的U1内容，按068缓存隔离目标判Failed。未点击编辑、发送、导出或下载，不测试能否用旧凭据保存。
4. 返回实际已登录U2的主标签页，直接打开相同会话链接；当前身份yabinc18 Free，新建会话空页面及Conversation SSE HTTP 404，不显示U1工程和未发送草稿。这是权限拒绝对照；不将旧页残留扩大为服务器越权读取。
5. 因步骤D已发现隔离失败，遵循分步计划停止进一步生产写入：不再从Safari发新订阅标记，不重试旧页保存。旧订阅是否彻底停止、缓存是否从存储物理删除及U2保存权限均未验证。未强制恢复U1已退出草稿。

关键证据：068-Chrome-U2-workspace.ax.txt/.jpg、068-existing-U1-tab-after-U2.ax.txt/.jpg、068-Chrome-U2-direct-read.ax.txt/.jpg；U2 ego独立对照068-U2-no-access.txt/.png。

## 最终状态与清理

两例均Failed，保留细分覆盖边界，不再阻塞于U2账号缺失。原048～070批次报告仍保留当时13P/6F/2B/2NA的历史；按最新重跑覆盖后该范围为13P/8F/0B/2NA，全134条为42P/22F/3B/3NA/64NR。

068残留页手动刷新后显示U2空会话与404，不再显示旧U1内容，说明当前确认问题为旧页需刷新才清理。已关闭本轮自建Chrome对照标签页；Chrome留在U2工作台、输入框为空，未重新登录U1。Safari U1工程在055收尾已独立刷新确认Welcome/Second caption及30秒基线；068未向工程发送任何新任务或修改。ego临时p2已关闭、原用户p1已release保留，TaskSpace6已finish。无Cookie/站点存储清理，无新生成或导出，不提交或推送Git；没有自动创建云效缺陷。

固定自动化仍为PLAN、script为空。报告/取证辅助脚本不算用例脚本实现。
