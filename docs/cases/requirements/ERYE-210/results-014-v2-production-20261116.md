# ERYE210-014 v2 生产Chrome执行结果（2026-11-16）

ERYE210-014 v2（水印开关/跨TAB控件限制及内容恢复）已在本例独立新项目、会话、工程的生产有头Chrome实跑Passed；OFF限制、五TAB保持、ON恢复、文字修改切页与刷新保持、图片及原音视频/字幕不串改全部通过。原真实只读身份浏览/权限拒绝保持待覆盖，旧Blocked定义和记录保留。当前56有效/0退役：50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run；其他55条及云效关联保持。56个唯一AUTO入口，旧014门禁不再注册。本轮无产品失败，调试断言修正前截图单列历史；未生成/导出、未写云效或推送Git。

## 执行对象与前置

本例新建项目：`925a6ba2-64db-45f5-8afe-08d36cdaeb39`；新会话：https://app.cinlink.ai/c/1ce95740-8ea8-40f6-a682-726153a167ab；新工程：`07600669-2f53-417f-a964-aa2e12de206a`（ERYE210-014-07600669）。只读引用真实20秒视频、原声、8条英语字幕、文字和512×512 PNG基线，在新工程进行页面目标操作，原素材工程未修改。

[完整前置、数据、步骤与预期](case-014-v2-watermark-toggle-production-20261116.md)。无Agent提示词，无生成/导出，无补槽。

| 步骤 | 实际结果 | 判定 |
|---|---|---|
| 关闭总开关 | 文字框、图片替换、宽度、透明度禁用；预览两类水印隐藏，设置保持 | Passed |
| OFF跨五TAB | 五入口可达，原工程保持，返回仍OFF及原文字/图片参数 | Passed |
| 重新ON | 文字/图片预览及参数恢复，编辑控件可用 | Passed |
| 只改文字并切页 | WM014_EDITED保存，Captions返回保持，原图片不变 | Passed |
| 刷新重开 | ON及新文字保持，图片160px/75%保持；原音视频和字幕不变；会话消息0→0 | Passed |

## 本轮页面原图

![新工程开启状态基线](evidence-014-v2-production-20261116/014-01-enabled-baseline.png)

![OFF文字控件受限](evidence-014-v2-production-20261116/014-02-off-text-disabled.png)

![OFF跨TAB后图片控件受限且参数保留](evidence-014-v2-production-20261116/014-03-off-image-after-tabs.png)

![ON恢复原水印与参数](evidence-014-v2-production-20261116/014-04-enabled-settings-restored.png)

![仅改文字后切页返回](evidence-014-v2-production-20261116/014-05-edited-returned.png)

![最终刷新重开保持](evidence-014-v2-production-20261116/014-06-final-refresh.png)

## 调试记录与覆盖边界

首批脚本对已带disabled的fieldset使用toBeDisabled断言，Playwright将其按非表单控件处理；第二批沿原工程续验，定位器仍使用“无图片”的上传按钮，已有图片实际显示“替换”。两次均属观察脚本错误，原生现场截图保留在observer-history，未归为产品失败。修正为实际输入/按钮受限断言及真实“替换”按钮后，第三批沿同一新工程完成全部步骤，没有另建工程或生成任务。

[首次观察错误截图](evidence-014-v2-production-20261116/observer-history/01/ERYE210-014-failed.png) · [第二次定位错误截图](evidence-014-v2-production-20261116/observer-history/02/ERYE210-014-failed.png)。

原只读权限测试仍待覆盖，需要真实只读授权工程和独立只读身份。未伪造权限、未以业务开关模拟只读；不宣称本轮验证服务端权限拒绝。旧Blocked及原定义见[历史](case-014-readonly-history-20261116.json)。普通子页记忆不在本例条件内，007既有失败保持。

[结构化结果](execution-status-014-v2-production-20261116.json) · [当前进度](execution-status-current.md) · [原图哈希清单](evidence-014-v2-production-20261116/manifest.json)。

本地校验：类型检查通过；539条用例格式检查0问题；全量发现56个唯一编号，014仅1个有效入口；其他55条当前记录及6条既有云效关联完全保持。归档14个证据文件、9张原生截图（含2张观察脚本修正前历史现场），哈希与原始文件一致，凭据扫描通过。
