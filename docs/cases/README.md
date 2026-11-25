# CinLink 测试用例统一入口

本页仅提供用例分类、正文、脚本和运行命令的导航。详细步骤在分类正文维护；执行结果、缺陷状态及证据在各自报告和进度文档维护。

## 正式需求用例

| 需求 | 用例正文 | 配套资料 |
|---|---|---|
| ERYE-160 计费逻辑 | [计费用例](requirements/ERYE-160/cases.md) | [正式需求登记表](registry.yaml) |
| ERYE-196 编辑器能力接入 | [详细用例](requirements/ERYE-196/cases.md) | [需求分析](requirements/ERYE-196/analysis.md) · [前置与数据](requirements/ERYE-196/test-data.md) |
| ERYE-199 编辑器能力 | [编辑器用例](requirements/ERYE-199/cases.md) | [正式需求登记表](registry.yaml) |
| ERYE-206 会话与视频工程协作 | [详细用例](requirements/ERYE-206/cases.md) | [需求分析](requirements/ERYE-206/analysis.md) · [前置与数据](requirements/ERYE-206/test-data.md) |
| ERYE-210 编辑器默认页签 | [详细用例](requirements/ERYE-210/cases.md) | [需求分析](requirements/ERYE-210/analysis.md) · [前置与数据](requirements/ERYE-210/test-data.md) |
| ERYE-237 图像编辑 | [详细用例](requirements/ERYE-237/cases.md) | [执行规则](requirements/ERYE-237/execution-guide.md) · [前置与数据](requirements/ERYE-237/test-data.md) · [脚本](../../tests/erye237/erye237-001-005.spec.ts) |

[编辑器需求复用规则](editor-linked-196-206-210.md) · [业务验收口径](editor-business-acceptance.md)

正式需求按一需求一目录维护，来源及元数据见各目录的 `meta.yaml`。工作流专项保留在 `docs/design-cases/multi-workflow/`，不重复加入正式需求目录或登记表。

## 工作流与上下文专项

| 范围 | 用例入口 | 脚本入口 |
|---|---|---|
| 单工作流、素材与发送方式 | [工作流矩阵](../design-cases/14-workflow-material-paths.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 多工作流 MW | [场景正文](../design-cases/multi-workflow/cases.md) · [工作流登记](../design-cases/multi-workflow/registry.yaml) | [基础脚本](../../tests/staging/g3-g7-multi.spec.ts) · [复合脚本](../../tests/staging/g3-g7-multi-compound.spec.ts) · [多素材脚本](../../tests/multi-material/multi-material.spec.ts) |
| 同会话单原片 SSO-001～018 | [用例正文](../design-cases/multi-workflow/same-session-original-cases.md) | [SSO脚本](../../tests/sso/same-session-original.spec.ts) |
| 同会话原片与产物穿插 SSO-019～022 | [用例正文](../design-cases/multi-workflow/same-session-source-artifact-cases.md) | [SSO脚本](../../tests/sso/same-session-original.spec.ts) |
| 剪辑师多轮对话 SSO-023～027 | [用例正文](../design-cases/multi-workflow/editor-operation-cases.md) | [SSO脚本](../../tests/sso/same-session-original.spec.ts) |
| 剪辑、配音与字幕同步 | [SYNC用例](../design-cases/multi-workflow/editing-dubbing-sync-cases.md) | 按正文及登记表查映射 |
| AI生图 | [IG用例](../design-cases/multi-workflow/ai-image-p0-cases.md) | [卡片脚本](../../tests/staging/g3-g7-cards.spec.ts) |
| 本地素材查找 | [LF用例及素材](../design-cases/multi-workflow/local-footage-p0-cases.md) | [素材查找脚本](../../tests/local-footage/local-footage.spec.ts) · [运行说明](../../tools/local-footage/README.md) |
| 跨工作流链路与上下文 | [工作流矩阵](../design-cases/14-workflow-material-paths.md) | [链路脚本](../../tests/staging/g3-g7-chains.spec.ts) |

## 设计稿与界面专项

| 范围 | 用例入口 | 脚本或映射 |
|---|---|---|
| 设计稿覆盖索引 | [模块覆盖地图](../design-cases/00-overview.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 首页输入与产物预览 | [预置场景与输入框](../design-cases/01-preset-scenes.md) · [产物实时预览](../design-cases/02-artifact-preview.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 项目与会话 | [项目分离](../design-cases/04-project-separation.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 登录与引导 | [iOS邮箱登录](../design-cases/08-ios-login.md) · [视频理解引导](../design-cases/09-video-onboarding.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 移动端 | [移动端页面](../design-cases/10-mobile.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 积分与素材重链 | [积分阻碍](../design-cases/11-credit-upsell.md) · [素材重链](../design-cases/12-relink.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 个人设置 | [个人中心设置](../design-cases/13-profile-settings.md) | [自动化登记](../design-cases/15-automation-registry.md) |
| 视频批注 | [批注用例](../design-cases/07-video-annotation.md) | [脚本映射](../design-cases/07-annotation-automation.md) · [脚本目录](../../tests/annotation) |
| 图片批注工具 | [IMG-ANN-UI用例](../design-cases/17-image-annotation-ui.md) | 按专项正文查映射 |
| 图片工具栏 | [IMG-TB-UI用例](../design-cases/18-image-toolbar-ui.md) | 按专项正文查映射 |
| 上传、提交与取消 | [自动化登记](../design-cases/15-automation-registry.md) | [上传脚本](../../tests/staging/g1-upload.spec.ts) · [提交脚本](../../tests/staging/g2-submit.spec.ts) |
| 离线断言与关卡 | [单元测试](../../tests/unit) · [关卡测试](../../tests/gates) | [框架验证说明](../verification.md) |

## 常用运行命令

| 范围 | 命令 |
|---|---|
| 离线框架校验 | `npm run verify` |
| 用例格式检查 | `npm run cases:check`；没有 `python` 别名时用 `python3 tools/design-cases/check-cases.py` |
| 字幕、图片水印及其他工作流 | `npm run test:g3` / `npm run test:watermark` / `npm run test:flows` |
| 卡片入口 | `npm run test:cards` |
| 多工作流基础与复合 | `npm run test:multi:base` / `npm run test:multi:compound` |
| 多素材专项 | `npm run test:multi:materials` |
| 同会话单原片及产物穿插 | `npm run test:sso` / `npm run test:sso:mixed` |
| 剪辑师多轮对话 | `npm run test:sso:editor` |
| 本地素材查找 | `npm run test:footage` |
| 视频批注 | `npm run test:annotation` / `npm run test:annotation:staging` |
| 图像编辑专项 | `npm run test:erye237` |
| 跨工作流链路 | `npm run test:chains` |

线上命令可能上传素材、创建任务及消耗积分。执行范围、账号、环境和串行要求按当前任务授权及[回归规范](../regression-policy.md)处理；脚本实际覆盖范围以对应正文和登记表为准。

## 维护与资料位置

- 后续新增及优化用例统一遵循[用例编写规范](authoring-guide.md)，正式需求可从[九列模板](_template.md)开始填写。
- 用例正文写清前置条件、含关键参数的操作步骤和可观察的预期结果。
- 用例标识、自动化实现状态及脚本路径在分类正文和对应登记表维护。
- 执行结果及待办见[测试进度](../testing-progress.md)，验证批次与证据见[验证记录](../verification.md)，缺陷及回归报告保留在[缺陷目录](../defects)。
- 本页不追加日期流水、逐项缺陷回归记录、结果统计、云效状态或执行断点；只在分类、路径、脚本入口和通用说明变化时维护导航。

## 合并保留的专项导航

- [ICP电商工作流](../design-cases/icp-workflows/cases.md)
- [功能卡片与多轨组合、现有功能补充](requirements/ERYE-199/cases.md)
- [编辑器默认TAB调整](requirements/ERYE-210/cases.md)
