# ERYE237-012 生产有头复测R2（2026-11-13）

**Passed，执行通过。原Failed撤销。** 本次按用户指出的真实入口重新操作，不是依据旧截图补算通过；前次从工程列表直接切图，错误地要求该入口重复出现退出编辑确认，属于测试入口选错。本次没有产品修复声明，也未向云效提交过012。

## 入口与前置

用户说明：“继续/放弃在编辑中返回对话框出现”。实际入口为画笔子工具栏的**返回图片工具**，不是工程选择列表。

- 生产[CinLink](https://app.cinlink.ai/)，macOS、ego-browser有头，TaskSpace10/p1，测试账号yabinc18。
- 复用专用项目FWXC350-prod-retest-20261111的[同一会话](https://app.cinlink.ai/c/4d81b2cf-17a2-4972-95b6-583a3948dca0)，无在途任务，无其他未发内容。
- I1：群鸟原始照片1000×666，源历史`editor_image_d78411edba904bceadc9d6923dc1876c`，共3个完成历史；I2：11.png红纸船原图1024×1024，源历史`editor_image_7cffcedd67bc40e0915021594dbb3ad7`，共2个完成历史。两者执行前均实际打开并保存独立源画布基线。

## 实际操作与结果

1. 回I1源版，进入画笔→文字，创建未发送文字：`ERYE237-012 R2 继续/放弃验证`。真实画布与源图不同，文字可见，输入框有1个画笔引用；未发送提示词或图像修改。
2. 在编辑中点击**返回图片工具**，实际出现“放弃当前更改？”对话框，正文“你的修改不会被保存”，有“放弃更改”和“继续编辑”两按钮。
3. 选择**继续编辑**：对话框关闭，仍留在I1及编辑状态，待发引用仍1项。画布RGBA与点击返回前的文字草稿逐像素一致；通过“编辑文字”真实聚焦输入框，完整回读`ERYE237-012 R2 继续/放弃验证`，证明保留可编辑对象，而非仅预览残影。
4. 不修改文字，再次点击**返回图片工具**，同一确认框再次出现，选择**放弃更改**。退出至I1主工具栏，引用清除；当前源画布RGBA与独立原图基线完全一致，完成历史仍原3项，只清理本次未发送草稿。
5. 此时从工程列表切到I2“11.png”，实际画布与I2基线RGBA一致，原2项完成历史保持。
6. 返回I1并再次进入画笔：原未发送文字没有恢复，画布RGBA等于I1源基线；撤销/重做均禁用，没有选择对象，证明已放弃内容不再作为草稿保留。退出新建的空画笔，恢复干净主工具栏。

## 独立核验

| 检查项 | 实际结果 |
|---|---|
| 返回时出现继续/放弃确认框 | 两次实际出现 |
| 继续编辑保持I1及文字可编辑 | Passed，完整文字回读一致 |
| 继续前后草稿内容 | PNG解码RGBA完全一致 |
| 明确放弃清除本次草稿 | Passed，RGBA恢复I1独立源图 |
| 放弃后可切I2 | Passed，I2实际画布匹配独立基线 |
| 返回I1不恢复已放弃文字 | Passed，空草稿、撤销/重做均禁用 |
| I1/I2完成历史与源内容 | 3/2项ID集合不变，两份源RGBA不变 |

因此012当前主UI分支执行通过。只验证本例真实用户路径，不扩成Agent配对、内部NEEDS_USER_CHOICE错误码或Technical完整通过；这些仍未执行。源图及其他历史未删除。

## 证据

证据根目录：`reports/erye237-012-ego-prod-20261113-r2/`。

- 基线：`I1-baseline`、`I2-baseline`及各自`-canvas.png`。
- 草稿与首次弹窗：`draft-before-return`、`draft-before-return-canvas.png`、`first-return-dialog`。
- 继续：`continue-draft-preserved`、`continue-draft-canvas.png`、`continue-text-editable`、`continue-audit.json`。
- 放弃：`second-return-dialog`、`discard-I1-source-restored`、`discard-I1-source-canvas.png`。
- 切图及不复原：`after-discard-switch-I2`、`after-switch-I2-canvas.png`、`return-I1-after-discard`、`reopen-I1-draft-empty`、`reopen-I1-empty-canvas.png`、`discard-reopen-audit.json`、`final-clean-I1`。
- 独立审计：`final-audit.json`、`continue-discard-pixel-audit.json`、`result.json`、`evidence-manifest.json`。

本次没有提交Agent消息、图片修改或生成任务，没有上传/导出成品；PNG均为实际canvas取证。无云效写入、无Git提交推送；固定脚本继续保持PLAN未接入。当前011～015最新汇总为4 Passed（012～015）/1 Blocked（011独立16px设置待复测），0 Failed；只有012在本次重新执行。


## 后续011更新

012本报告结束时011尚待复测；随后011已在同日按无引用纯设置入口真实重跑Passed，当前011～015最新5 Passed，见[011 R2报告](results-011-ego-prod-20261113-r2.md)。本012结果及原实测范围保持。
