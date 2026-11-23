# 用例登记与导航核查

核查日期：2026-11-18。核对当前用例正文、正式需求登记表、多工作流登记表、统一入口、设计覆盖地图及带编号的业务测试脚本。结果报告、历史快照、已归档或明确合并的条目不当作新增用例。

## 2026-11-19复核

重新读取当前正文、登记表及测试脚本后，未发现尚未登记的用例，也未发现相较上次核查新增但遗漏的编号。

- 545条正式需求用例与登记表一致，无缺项、多余项或重复ID；用例格式检查为545条、0问题。
- 21条MWMULTI用例与专项登记表一致，无缺项或多余项。
- 26份当前用例正文均可从统一入口直接到达；入口72个链接的本地目标均存在。
- tests目录中的85个业务用例编号均有对应正文；SSO-001～027仍完整登记。
- 上次补齐的CHAIN-13、9个设计模块导航及图像编辑001～005占位映射仍保留；已退役、合并和归档编号不恢复。

本次机器明细为`reports/case-registration-audit-20261119/summary.json`。这是文档登记核查，不代表新增产品执行或业务通过；统一入口未加入核查流水或结果摘要。

## 已修正的遗漏

| 问题 | 修正 |
|---|---|
| CHAIN-13有脚本骨架但链路正文缺少条目 | 在工作流矩阵补登记参数、步骤边界、辅助断言和脚本来源；保留FIXME，素材及具体修改意图定稿前不执行 |
| 九个设计模块缺少直接导航 | 在统一入口补首页输入、产物预览、项目分离、iOS登录、视频理解引导、移动端、积分阻碍、素材重链及个人设置的正文链接；在覆盖地图补模块链接 |
| 图像编辑001～005的脚本占位映射遗漏 | 在自动化登记中补脚本路径和命令，明确五条都是空fixme，固定业务实现仍为PLAN |
| 五处链接仍使用清理前的统一入口锚点 | 更新为现有工作流分类或对应正文，未恢复执行流水 |
| 覆盖地图沿用已删除用例的旧计数 | 正式需求按现有正文校正为545条；地图既定范围含历史DC-05和21条MWMULTI，共719条，优先级485/188/46；其他专项单独列示 |

核查期间ERYE-196新增135～158共24条且登记表同步，因此最终正式需求范围为545条；不沿用最初521条快照。

## 正式需求登记

| 需求 | 当前正文条数 | 登记表对照 |
|---|---:|---|
| ERYE-160 | 76 | 一致 |
| ERYE-196 | 158 | 一致 |
| ERYE-199 | 68 | 一致 |
| ERYE-206 | 67 | 一致 |
| ERYE-210 | 54 | 一致 |
| ERYE-237 | 122 | 一致 |
| 合计 | 545 | 无漏登记、无多余顶层登记、无重复顶层ID |

登记表：[registry.yaml](registry.yaml)。自动化实现与业务执行记录保持各自原有含义，此次核查没有将脚本占位标为已实现。

## 专项编号范围

| 范围 | 当前登记 | 正文 |
|---|---|---|
| 设计稿现行DC模块 | 145个ID；历史DC-05另8条 | [覆盖地图](../design-cases/00-overview.md) |
| 多工作流 | MWMULTI-001～021；与MW-06～26对应，不重复计为新增业务场景 | [正文](../design-cases/multi-workflow/cases.md) · [登记表](../design-cases/multi-workflow/registry.yaml) |
| 同会话专项 | SSO-001～027连续 | [001～018](../design-cases/multi-workflow/same-session-original-cases.md) · [019～022](../design-cases/multi-workflow/same-session-source-artifact-cases.md) · [023～027](../design-cases/multi-workflow/editor-operation-cases.md) |
| 本地素材查找 | 当前28个LF编号 | [正文](../design-cases/multi-workflow/local-footage-p0-cases.md) |
| AI生图 | IG-01～08 | [正文](../design-cases/multi-workflow/ai-image-p0-cases.md) |
| 配音字幕同步 | SYNC-001～006 | [正文](../design-cases/multi-workflow/editing-dubbing-sync-cases.md) |
| 图片批注 | IMG-ANN-UI-001～010 | [正文](../design-cases/17-image-annotation-ui.md) |
| 图片工具栏 | IMG-TB-UI-001～020 | [正文](../design-cases/18-image-toolbar-ui.md) |
| 链路 | CHAIN-01～13 | [矩阵正文](../design-cases/14-workflow-material-paths.md) |

不把这些分组简单相加为全库独立业务数量：矩阵含工作流分类、参数表及同一MW编号的重复展示，MWMULTI与MW也有映射关系。

## 脚本编号核对

对tests/staging、tests/sso、tests/local-footage、tests/erye237、tests/multi-material、tests/annotation的TypeScript文件中出现的85个业务用例编号，逐一核对当前正文的表格定义。补齐CHAIN-13后没有找不到正文的编号。无编号的框架单元测试和关卡测试通过tests/unit、tests/gates分类入口维护，未混计为业务用例。

## 不属于漏项的编号

- ERYE237当前001～122连续；已删除的22条旧重复项不恢复。
- LF-19、23～27、29为已合并或退役编号，不按当前缺号补造用例。
- DC-03映射ERYE-199，DC-06映射ERYE-237，DC-05按既有规则仅保留历史追溯。
- SSO正文中的MW-05、MW-22是跨专题参考，不另登记成新的SSO用例。

机器核对结果存于reports/case-registration-audit-20261118/summary.json。统一入口仅补稳定导航，不加入本核查的日期流水或结果摘要。
