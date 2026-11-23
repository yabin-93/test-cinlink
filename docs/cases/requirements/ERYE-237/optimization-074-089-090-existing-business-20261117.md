# ERYE237-074/089/090按当前功能优化（2026-11-17）

<!-- LATEST-EXECUTION-20261117 -->
新版执行结果已更新至[生产执行报告](results-revised-074-089-090-ego-prod-20261117.md)：{'Passed': 3}。下文Not Run为本次设计完成时的历史状态；当前主分支以registry及执行报告为准，074可选Agent配对仍未执行。

用户要求基于现有功能优化三条，并沿用“不验证参数”的范围。本次仅设计更新，没有打开浏览器、执行生产任务或写云效。三个新版主分支均Not Run；2026-11-17已完成批次的10 Passed / 7 Failed / 3 Not Applicable作为历史保留。按当前规格，原三条范围排除改为三个待执行用例，未重跑不计通过。

| 用例 | 原问题 | 新业务目标 | 当前主入口 |
|---|---|---|---|
| 074 | 扩图无上限，无法成立超限降级前置 | 从已有3:4扩图成品继续扩为4:3，保留上一轮画面及历史 | UI |
| 089 | 依赖当前未公开的注册表/schema全集 | 对照UI与Agent实际切换画笔、标注两种现有工具 | Agent，逐行配对 |
| 090 | 依赖validate/dry-run和非法批次 | 普通对话先只说明，之后明确执行真实背景修改 | Agent，两轮不同目标 |

## 074：在扩图结果上继续扩图

前置：同一授权测试工程中有原图V1及其真实3:4扩图完成版V2，V2的上一轮新增区域清楚可辨；没有未发草稿或运行任务。可以复用已完成的测试版本，不必新建项目或为了前置再次生成。复用前必须在当前页面重新核对它确是V2，不能直接拿本机文件冒充页面已选来源。

1. 打开V2，下载并保存独立源基线，同时记录V1/V2缩略图及V2完整画面。
2. 保持V2被选中，点击现有宽高比入口选择4:3。若页面直接受理，等待同一请求；若只形成待发意图，才明确发送一次。直接执行不作为本例失败，也不追加第二次发送。
3. 完成后下载V3，核对真实文件可打开、4:3比例及可见内容：必须保留V2的人物、黄包和上一轮扩出的顶部/底部区域，左右新增区域按实际结果记录，本例不重复判定072的接缝质量。若恢复为V1后扩图、裁掉V2新增区，属于本例失败。不能只凭比例或助手描述判通过。
4. 从历史分别查看V1/V2/V3，确认原图和上一轮成品保留。只清理本轮自有草稿，不删除历史。

072始终独立从原图测五比例；074验证连续两次扩图的来源与内容保留，两者分开记录。无尺寸上限、降级确认、超大图夹具或内部能力参数测试。

## 089：UI与Agent常用工具切换

前置：portrait.png原图V1已打开、工具栏可用，未发输入/草稿及运行任务为空。A/B各从主工具栏独立开始，禁止用A成功推断B通过。

| 行 | UI对照 | 完整Agent指令 | 可见预期 |
|---|---|---|---|
| A画笔 | UI点击画笔，记录画笔工具栏，再返回主工具 | 把当前portrait.png图片编辑器切换到画笔工具，仅切换，不绘制、不修改、不生成、不导出。 | 出现与UI相同的画笔工具栏，保留当前画面，无新增内容 |
| B标注 | UI点击标注，记录实际模式，再复位主工具 | 把当前portrait.png图片编辑器切换到标注工具，仅切换，不新建批注、不修改、不生成、不导出。 | 进入与UI相同的标注模式，无新增编号、正文或图片 |

每行先确认UI入口实际可用，再发送一次Agent指令，等待终态，查看真实模式/工具栏。仅回复“已完成”不算成功；Agent动作后图片、历史及未发内容保持。复位如出现继续/放弃提示，仅处理本轮自有空草稿，不能清理用户或他例内容。真实UI能力可用而Agent无法完成切换，按该行业务Failed；不要求提供内部会话字段、注册表或schema来解除阻塞。

这两种工具是本例固定范围，不是D01～D12全集验收。11月17日的额外画笔冒烟只覆盖A的部分证据，不能作为新版A/B均已通过。

## 090：先说明、后明确执行

前置：当前打开portrait.png有背景原图V1，红衣人像和黄色手包清晰可辨；保存原图、可见历史及未发内容的基线，无运行任务。使用普通Agent对话，不预设额外方案弹窗或确认按钮。

1. 发送：**先说明把当前portrait.png背景改为蓝色时如何保留人物和黄色手包；只说明，暂时不要修改、生成或导出图片。**
2. 等回复终态，确认它说明保留人物、手包和构图的方案；没有实际改图、新图片产物或新增完成历史，原画面及未发内容保留。自然语言说明不称为服务端validate结果。若已提前改图，说明阶段Failed；记录后停止正式第二轮，避免把被修改的图串作原图。
3. 第一阶段保持原图时发送：**现在执行：只把当前portrait.png原图背景改为蓝色，人物、黄色手包及原构图保持，交付一张实际结果图片。** 两条消息目标不同，不是重发同一受理任务。
4. 等该请求终态，按已知信息填写业务澄清并继续，不猜内部字段。下载实际结果，核对背景明显为蓝色、人物/黄色手包及原构图保留；只有说明或原图不算完成。原图仍能从历史查看，记录实际文件格式和尺寸；不另设RGB精确值或未知尺寸阈值。
5. 阶段失败据真实错误和已完成产物记录，不点击重试来跑绿；说明阶段通过不抵消执行阶段失败。

这与051直接问答、052保存批注草稿、054同一消息问答加编辑不同：090明确分成“只说明”与“现在执行”两轮，检查执行边界及用户意图切换。没有capabilities、validate、dry-run、非法操作、schema、权限费用或provider计数要求。

## 状态与历史

新版不复用旧状态：074/UI、074/Agent配对、089/Agent、090/Agent均Not Run；原Technical约束及上限场景放历史，不作为新版前置。旧FWXC-619/620是原注册表/validate范围的历史缺陷，不以新版通过或失败改变其状态或自动关联同一问题。074旧Not Applicable及089/090旧Not Applicable/Failed均保留在下方存档与既有执行报告。固定脚本PLAN/空路径，不冒称已实现自动化。


## 修订前定义与登记存档

下面仅用于追溯，不作为新版待执行步骤。

### ERYE237-074

| ERYE237-074 | P0 | P-AGENT；用户2026-11-16确认扩图无尺寸上限，旧超限前置不适用 | <a id="erye237-074"></a>**[Agent] 扩图超限分支不适用**<br>本例保留原编号及历史；不构造超大图、不猜测provider/export硬上限；正常扩图尺寸/主体和锚点分别见072/075 | 当前Not Applicable，不把无上限当失败或通过；仅在后续产品明确引入实际限制时重新设计超限场景 | User clarification 2026-11-16；原Requirement §8/§12/A10/A23条件分支 | [PLAN] | — | 无上限口径；旧Blocked保留历史 |

```yaml
ERYE237-074:
  status: PLAN
  script: ""
  current_case_version: "2026-11-16-real-export-scope-v2"
  revision_document: docs/cases/requirements/ERYE-237/revision-074-082-real-scope-20261116.md
  execution_branches:
    Agent:
      execution_status: Not Applicable
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed
      execution_scope: user scope page and actual artifacts; no parameter validation
      execution_report: docs/cases/requirements/ERYE-237/results-071-090-ego-prod-20261117.md
      previous_execution_record: reports/erye237-071-090-ego-prod-20261117/ERYE237-074-previous-branch.txt
    Technical:
      execution_status: Not Applicable
      applicability_basis: user confirms no outpaint size limit
      specification: docs/cases/requirements/ERYE-237/technical-checks.md
```

### ERYE237-089

| ERYE237-089 | P0 | P-TECH；P-API；TD-CAP；记录当前schema及发布operation清单 | <a id="erye237-089"></a>**[Technical] UI注册表与Agent能力全集一致**<br>1. 读取capabilities<br>2. 对照D01～D12和analysis操作矩阵逐项执行UI/Agent<br>3. 收集命令/结果/禁用原因 | 每个可用UI能力有真实Agent领域operation及schema/权限/费用/执行器说明；不以纯回复或模拟点击算覆盖；未执行项不计通过，真实覆盖须100% | Requirement §4.1/§6.1/A24 | [PLAN] | — | editor_get_capabilities；[FWXC-619](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f83c259b9ccaa3fcd6a49d95f)（2026-11-16同步） |

```yaml
ERYE237-089:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Applicable
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed
      execution_scope: user scope page and actual artifacts; no parameter validation
      execution_report: docs/cases/requirements/ERYE-237/results-071-090-ego-prod-20261117.md
      previous_execution_record: reports/erye237-071-090-ego-prod-20261117/ERYE237-089-previous-branch.txt
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f83c259b9ccaa3fcd6a49d95f
```

### ERYE237-090

| ERYE237-090 | P0 | P-TECH；B-IMG；P-API；BD；记录revision/hash/草稿/历史/job/费用 | <a id="erye237-090"></a>**[Technical] validate严格无副作用**<br>1. 对合法改文字batch及含非法操作batch分别调用validate/dry-run<br>2. 再读取所有状态 | 仅返回可执行性、差异和具体错误；不持久化修改、不消费草稿、不建job/版本、不报价扣费；成功验证不等同已执行 | Requirement §6.1/A24 | [PLAN] | — | editor_validate_edit；[FWXC-620](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=900a0306295e258e0222a09589)（2026-11-16同步） |

```yaml
ERYE237-090:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Applicable
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed
      execution_scope: user scope page and actual artifacts; no parameter validation
      execution_report: docs/cases/requirements/ERYE-237/results-071-090-ego-prod-20261117.md
      previous_execution_record: reports/erye237-071-090-ego-prod-20261117/ERYE237-090-previous-branch.txt
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=900a0306295e258e0222a09589
```
