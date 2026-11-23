# 14条技术主用例转图片批注前的定义与登记（2026-11-17）

本文件仅存历史，不是当前待执行步骤。用户明确将4条Failed和10条Blocked共14条改为只测图片批注；新主入口见[修订说明](revision-fourteen-image-annotation-20261117.md)和[cases.md](cases.md)。旧Failed/Blocked没有判为修复或通过，旧报告及缺陷候选保留，未改云效。

<a id="erye237-091-technical-history"></a>
## ERYE237-091

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-091 | P0 | P-TECH；B-IMG；P-API；B0；TD-CONTRACT构造未知operation/字段/不兼容schemaVersion | <a id="erye237-091"></a>**[Technical] 未知schema或字段整体拒绝**<br>1. 通过命令接口提交每种异常<br>2. 查结构化错误及文档/provider | 明确拒绝而非忽略字段后部分执行；无文档变化/provider调用；错误包含code/phase/affectedIds和可行推荐动作 | Requirement §6.1/§7/A23 | [PLAN] | — | Requirement §6.1/§7/A23 |

原登记完整内容：

```yaml
ERYE237-091:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
```

<a id="erye237-092-technical-history"></a>
## ERYE237-092

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-092 | P1 | P-TECH；B-IMG；P-API；B0；合法add_text→update的新对象链 | <a id="erye237-092"></a>**[Technical] batch内别名与稳定ID映射**<br>1. 同batch创建文字alias=A并移动A<br>2. 回读实际ID<br>3. 下一batch直接复用旧alias A而不提供ID | 首batch准确返回alias到真实ID映射并修改同对象；alias只在当批有效，跨batch拒绝未解析引用，不按数组位置猜目标 | Requirement §6.1/A12 | [PLAN] | — | Requirement §6.1/A12 |

原登记完整内容：

```yaml
ERYE237-092:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Failed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
```

<a id="erye237-096-technical-history"></a>
## ERYE237-096

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-096 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-096"></a>**[Technical] 保存未确认与失败恢复**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | Agent等待pending明确成功/失败；仅权威确认后persisted=true；失败时保留可恢复草稿，不将未保存状态作为新输入 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |

原登记完整内容：

```yaml
ERYE237-096:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-097-technical-history"></a>
## ERYE237-097

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-097 | P1 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-097"></a>**[Technical] 内容保存与缩放平移分离**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 内容只有返回authority能提交；视图变化不制造内容冲突；双权威配置不可让两边都成功覆盖；revision为不透明token非客户端自增 | Requirement §5.3/A17 | [PLAN] | — | Requirement §5.3/A17 |

原登记完整内容：

```yaml
ERYE237-097:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-098-technical-history"></a>
## ERYE237-098

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-098 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-098"></a>**[Technical] 接收冻结、消费与进度检查点**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 接收、冻结、消费已提交草稿和activeJob一次事务完成；expectedCommitRevision=acceptedRevision；进度不推进内容revision，不因草稿清理产生伪冲突 | Requirement §5.3/§6.2/A18 | [PLAN] | — | Requirement §5.3/§6.2/A18 |

原登记完整内容：

```yaml
ERYE237-098:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-100-technical-history"></a>
## ERYE237-100

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-100 | P1 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-100"></a>**[Technical] 重复乱序与断线恢复分开执行**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 重复去重，旧进度不回退终态；缺口重新读取权威快照；文档/任务身份准确，响应与事件先后不增加执行次数 | Requirement §5.3/A19 | [PLAN] | — | Requirement §5.3/A19 |

原登记完整内容：

```yaml
ERYE237-100:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-101-technical-history"></a>
## ERYE237-101

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-101 | P0 | P-TECH；B-IMG；P-API；BD；同一用户/文档合法提交C1及payloadHash已记录 | <a id="erye237-101"></a>**[Technical] 同commandId同payload幂等**<br>1. 双击发送并重试同C1相同payload<br>2. 并发接收相同请求<br>3. 回读提交/版本/provider/账务 | 返回同一结果或在途状态；仅一份逻辑提交、实际执行和对应费用/版本；不靠按钮禁用替代服务端幂等 | Requirement §5.3/A18 | [PLAN] | — | Requirement §5.3/A18 |

原登记完整内容：

```yaml
ERYE237-101:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
```

<a id="erye237-102-technical-history"></a>
## ERYE237-102

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-102 | P0 | P-TECH；B-IMG；P-API；BD；C1已接收；另一个不同文本/源版本payload | <a id="erye237-102"></a>**[Technical] 同commandId不同payload拒绝**<br>1. 复用C1提交变更后的payload<br>2. 查看错误和原任务 | COMMAND_ID_REUSED；原任务不被修改/重复执行；用户改输入需新commandId和新提交，不能偷换原来源 | Requirement §5.3/A18 | [PLAN] | — | Requirement §5.3/A18 |

原登记完整内容：

```yaml
ERYE237-102:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Failed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
```

<a id="erye237-103-technical-history"></a>
## ERYE237-103

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-103 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-103"></a>**[Technical] 接收前失败与接收后丢响应分离**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 未接收保留草稿；已接收恢复原submission/任务并消费相应已提交内容；不能新ID重发产生两份任务或费用 | Requirement §5.1/§6.1/§7/A18/A19 | [PLAN] | — | editor_get_command |

原登记完整内容：

```yaml
ERYE237-103:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-104-technical-history"></a>
## ERYE237-104

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-104 | P1 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-104"></a>**[Technical] 关闭编辑视图后的文档与视图命令**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 文档操作可按能力完成并保存；视图请求VIEW_UNAVAILABLE而不是谎报已缩放；打开UI后读取实际已存内容 | Requirement §6.1/A24 | [PLAN] | — | Requirement §6.1/A24 |

原登记完整内容：

```yaml
ERYE237-104:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Failed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-106-technical-history"></a>
## ERYE237-106

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-106 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-106"></a>**[Technical] 同文档第二提交实际拒绝**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | JOB_ALREADY_RUNNING/EDITOR_BUSY，无第二活动提交/provider；查询/取消仍可用；不能通过换窗口绕过限制 | Requirement §5.3/§7/A16 | [PLAN] | — | Requirement §5.3/§7/A16 |

原登记完整内容：

```yaml
ERYE237-106:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Failed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-108-technical-history"></a>
## ERYE237-108

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-108 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-108"></a>**[Technical] 消息任务映射与worker事务分层**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 未接收无孤儿任务；已持久化有同一快照和可恢复投递；消息重试不生成第二份等价提交，结果文件/版本建立保持一致 | Requirement §7/A18/A19 | [PLAN] | — | Requirement §7/A18/A19 |

原登记完整内容：

```yaml
ERYE237-108:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-109-technical-history"></a>
## ERYE237-109

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-109 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-109"></a>**[Technical] 准备阶段资源失败与重试来源**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 明确失败phase与原因；无provider调用/生成费，源图不变、可恢复草稿；重试仍绑定原来源，不绕过权限 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

原登记完整内容：

```yaml
ERYE237-109:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```

<a id="erye237-110-technical-history"></a>
## ERYE237-110

原正式条目：

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-110 | P0 | P-TECH；已授权portrait.png源版；分支分别检查控制条件，缺项不阻塞独立步骤 | <a id="erye237-110"></a>**[Technical] 确定失败与未知结果分类**<br>按[分步修订](optimization-eleven-blocked-20261117.md)先实际执行独立分支，再核故障/并发条件；逐项记录已执行与待控 | 显示PROVIDER_FAILED及已知状态；源图可用、恢复入口明确；再次调用需按新attempt和授权记录，不把确定失败冒充成功文件 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

原登记完整内容：

```yaml
ERYE237-110:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-split-checkpoints-v2"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; published UI and protocol checkpoints
      execution_scope: user explicitly requested both groups; real parameter and fault branches separately recorded
      execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
      previous_execution_record: reports/erye237-revised-eleven-plus-six-ego-prod-20261117/previous-registry.json
      revision_document: docs/cases/requirements/ERYE-237/optimization-eleven-blocked-20261117.md
```


## v4批注重写设计存档（未执行）

用户随后要求不与之前用例重复。下列为上一版14条设计和登记，均未执行；当前只保留3条补充、11条合并索引，不按下表重复跑。

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-091 | P0 | P-UI；TD-ANN14/A；一条右下批注，正文为空，待发引用为空 | <a id="erye237-091"></a>**[UI] 空正文不能添加到对话**<br>1. 点击标注并在R右创建批注，保留空正文；打开浮层检查添加按钮。<br>2. 正文仍为空时，若按钮可点则点击一次；核对输入框引用和画布。<br>3. 输入“在这里添加一只白色小狗”，再次通过浮层添加到对话；不点击发送。 | 空正文没有形成可执行待发批注，页面有禁用或明确反馈；输入有效正文后正常添加且只新增一份引用。源图不变，不产生图片任务。仅测空字符串，不把未冻结的纯空白字符规则当硬条件。 | User scope 2026-11-17；Requirement §3.3/A05；Mockup D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-091)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-091-technical-history) |
| ERYE237-092 | P1 | P-UI；TD-ANN14/A；R左和R右都可点击 | <a id="erye237-092"></a>**[UI] 同名批注依靠位置和编号区分**<br>1. 在R左和R右分别创建批注，自定义名称均设为“地面”。<br>2. 左侧正文填“在左侧空白地面添加一只白色小狗”；右侧正文填“在右侧空白地面添加一个红色小球”。<br>3. 分别添加到对话；交替点击两个编号及两条引用，核对打开位置、名称和各自正文；不发送。 | 两个独立编号和两份引用同时存在，同名不被合并；左狗/右球正文不互换，点击分别定位到原批注。没有新图片任务。 | User scope 2026-11-17；Requirement §3.3/A05/A06；Mockup D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-092)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-092-technical-history) |
| ERYE237-096 | P0 | P-UI；TD-ANN14/A；R右批注，待发引用为空 | <a id="erye237-096"></a>**[UI] 输入完成后立即添加保留完整正文**<br>1. 在浮层输入以下含中文、换行和句末标点的完整正文：<br>在画面右下这块空白地面添加一只白色小狗。<br>保持人物面貌、红色上衣、牛仔裤、白鞋和黄色手包不变。请仅执行本条批注的修改。<br>2. 完成输入法选词后，不额外点击其他区域，直接点击浮层“添加到对话”。<br>3. 从待发引用重新打开对应批注，对照输入前记录逐行核对；不点击发送。 | 首句、换行后的正文及末句完整保留，没有只保存旧值、丢末尾文字或乱码；只添加一条对应引用，编号和位置仍为R右。检查完成的输入，不把中文组合输入尚未确认的状态当成已完成正文。 | User scope 2026-11-17；Requirement §3.3/A05/A06；Mockup D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-096)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-096-technical-history) |
| ERYE237-097 | P1 | P-UI；TD-ANN14/A；R右批注正文“在右侧空白地面添加一只白色小狗”，已添加到对话 | <a id="erye237-097"></a>**[UI] 缩放后批注仍定位同一图像区域**<br>1. 在适应窗口下记录R右批注落点、编号、名称和正文。<br>2. 经现有缩放菜单设为200%，点击原批注编号及对应引用核对；再恢复适应窗口，重复核对。<br>3. 不平移、不拖动批注，不发送图片任务。 | 两档显示均对应同一源图右下区域，正文、名称和引用关联保持；不会新增编号或把点移到人物/手包处。只按可见图像区域验收，不要求内部revision、坐标精度日志或平移手势。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05；Mockup D03/D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-097)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-097-technical-history) |
| ERYE237-098 | P0 | P-UI；TD-ANN14/A；原图R右无狗，人物和黄包清晰 | <a id="erye237-098"></a>**[UI] 通过单条批注在指定区域新增小狗**<br>1. 在R右创建批注，自定义名称“右侧空白地面”，正文完整填写：在画面右下这块空白地面添加一只小型棕白色小狗，坐姿自然，高度不超过人物的三分之一，不遮挡人物或黄色手包；保持人物面貌、红色上衣、牛仔裤、白鞋、黄色手包、背景和方形画幅不变，仅允许小狗附近合理阴影变化。<br>2. 点击浮层添加到对话，核对唯一引用中的名称、正文和位置；正式发送一次。<br>3. 等待同一请求终态；打开并下载实际结果，逐项对照原图。再从原图历史查看V1。 | 结果在画面右下新增一只棕白色小狗，位置和数量正确、结构无明显畸形、不遮挡人物/黄包；人物面貌、身体、服装、手包和方形构图保留；结果可打开，原图仍可访问。添加引用阶段不生成，只有助手文字或“完成”不算通过。 | User scope 2026-11-17；Requirement §3.3/§6.2/A06；Mockup D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-098)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-098-technical-history) |
| ERYE237-100 | P1 | P-UI；TD-ANN14/A；R右批注名“右侧空白地面”、正文“在这里添加一只白色小狗”，已添加但未发送 | <a id="erye237-100"></a>**[UI] 收起再展开保留未发送批注**<br>1. 记录当前源版、批注编号、名称、正文和待发引用。<br>2. 仅点击“收起图片编辑器”，再通过页面入口展开同一图片编辑器。<br>3. 点击原编号及其待发引用，核对完整内容和图像位置；不正常退出、不放弃、不刷新、不发送。 | 同一源版中原批注、正文、名称和未发引用保持，不重复新增或误消费；无图片任务。本例只验证同页收起/展开，不要求正常返回退出后默认保存未发草稿。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05；Mockup D01/D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-100)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-100-technical-history) |
| ERYE237-101 | P0 | P-UI；TD-ANN14/A；仅有一条R右批注，正文“在右侧空白地面添加一只白色小狗” | <a id="erye237-101"></a>**[UI] 重复添加同一批注不重复引用**<br>1. 点击浮层“添加到对话”，记录引用数量。<br>2. 若按钮仍可用，再点击同一批注的添加入口两次；若已禁用，记录实际防重复状态，不绕过禁用。<br>3. 点击现有引用核对位置和正文；不点击发送。 | 输入框始终只存在一份该批注的有效引用，正文和定位正确，图上不产生额外编号；不因重复点击启动生成。本例仅验UI添加去重，不推断服务端任务、provider或费用幂等。 | User scope 2026-11-17；Requirement §3.3/A05；Mockup D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-101)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-101-technical-history) |
| ERYE237-102 | P0 | P-UI；TD-ANN14/A；原图R右无狗，待发内容为空 | <a id="erye237-102"></a>**[UI] 修改已添加批注后按最新正文执行**<br>1. 在R右创建批注，名称“右侧空白地面”，先填写“在画面右下这块空白地面添加一只小型黑色小狗，坐姿自然，不遮挡人物或黄色手包；保持人物、服装、手包、背景和方形画幅不变，仅允许小狗附近合理阴影变化。”，添加到对话但不发送。<br>2. 重新打开同一编号，将正文全量替换为“在画面右下这块空白地面添加一只小型白色小狗，坐姿自然，高度不超过人物的三分之一，不遮挡人物或黄色手包；保持人物面貌、红色上衣、牛仔裤、白鞋、黄色手包、背景和方形画幅不变，仅允许小狗附近合理阴影变化。”；明确再次点击该批注的添加入口，同步更新待发引用。<br>3. 确认仍只有一份引用且展示白狗新正文；正式发送一次，核对已发消息，再等待并下载实际结果。 | 同一批注/引用更新为白狗正文，不保留旧黑狗指令或增加重复引用；已发消息为最新要求；结果右下一只白狗，没有旧要求的黑狗，人物和黄包保留。本例不要求编辑后无需点击就自动同步。 | User scope 2026-11-17；Requirement §3.3/A05/A06；Mockup D07/D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-102)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-102-technical-history) |
| ERYE237-103 | P0 | P-UI；TD-ANN14/A；两条不同位置批注，均未发送 | <a id="erye237-103"></a>**[UI] 切换批注浮层不丢正文**<br>1. R左批注名称“左侧地面”、正文“在左侧添加白色小狗”；R右批注名称“右侧地面”、正文“在右侧添加红色小球”。<br>2. 将左侧正文改为“只在左侧地面添加一只白色小狗，保留人物和黄色手包”，随后点击已有右侧编号。<br>3. 核对右侧仍为红球要求，再点击已有左侧编号，核对修改后的完整正文与名称；不新建批注、不发送。 | 切换浮层后两条正文与名称各自保持，左侧最新输入不丢，右侧不被覆盖，编号总数不增加。本例不模拟断网、丢响应或服务端保存失败。 | User scope 2026-11-17；Requirement §3.3/A05；Mockup D07 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-103)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-103-technical-history) |
| ERYE237-104 | P1 | P-UI；TD-ANN14/S1；已发送含真正批注的终态消息，原图源版可访问 | <a id="erye237-104"></a>**[UI] 从已发批注打开对应源图位置**<br>1. 先记录S1的原图、源版、原编号、名称、正文和图像位置；若编辑器已打开则仅收起，原本已收起时直接进行下一步，不创建新内容。<br>2. 从会话中点击S1实际提供的已发批注引用/查看入口，进入图片编辑器。<br>3. 对照S1记录核对打开的源图、位置和只读批注内容；不修改、不发送。 | 打开S1真实对应源版和区域，名称/正文与发送时一致，不误用最近生成图或另一条批注；查看不新增生成任务。使用正常打开视图入口，不再测试无视图写文档或内部session字段。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06/A21；Mockup D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-104)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-104-technical-history) |
| ERYE237-106 | P0 | P-UI；TD-ANN14/A；原图左右地面无狗无球 | <a id="erye237-106"></a>**[UI] 两条批注一次提交分别落到两个区域**<br>1. R左创建名称“左侧空白地面”的批注，完整正文：在画面左下这块空白地面添加一只小型白色小狗，坐姿自然，高度不超过人物的三分之一，不遮挡人物；保持人物面貌、身体、服装、黄色手包、背景和方形画幅不变，仅允许小狗附近合理阴影变化。<br>2. R右创建名称“右侧空白地面”的批注，完整正文：在画面右下这块空白地面添加一个红色小球，直径约为人物鞋长的一半，不遮挡人物或黄色手包；保持人物面貌、身体、服装、手包、背景和方形画幅不变，仅允许小球附近合理阴影变化。<br>3. 分别添加到对话，核对两个编号/正文/位置；在主输入框填写完整全局说明“按这两条批注一起修改：画面左下添加一只白色小狗，画面右下添加一个红色小球；保留人物面貌、身体、服装、黄色手包、背景和方形画幅，其他区域保持不变。”，确认文字实际进入输入框后发送一次。<br>4. 等待同一请求终态，下载实际结果，逐处核对左侧、右侧和保留主体。 | 已发消息含两条正确批注及全局说明；成品左下一只白狗、右下一个红球，不串位、不漏项、不重复；人物、服装、黄包和方形构图保留。未明确要求的区域无明显无关修改，不以“已完成”替代实际文件。 | User scope 2026-11-17；Requirement §3.3/§6.2/A06；Mockup D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-106)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-106-technical-history) |
| ERYE237-108 | P0 | P-UI；TD-ANN14/S1；原图可访问，无在途任务 | <a id="erye237-108"></a>**[UI] 新批注不改写旧消息中的批注记录**<br>1. 记录S1发送时的名称、正文、位置和源版。<br>2. 在同一工程当前允许编辑的源版中新建本轮批注，名称“新地面”、正文“在左侧地面添加红色小球”，位置选R左；添加到对话但不发送。<br>3. 回看S1已发消息并通过其批注入口查看原记录，对照步骤1；若打开原记录需要处理本轮自有未发内容，先留证再按实际提示处理。 | S1的原名称、正文、位置和源图关系保持，不被新批注同编号/新正文覆盖；查看不重复生成。本例检验页面可见已发记录，不推断消息落库、outbox或worker事务。 | User scope 2026-11-17；Requirement §3.3/A21；Mockup D08 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-108)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-108-technical-history) |
| ERYE237-109 | P0 | P-UI；TD-ANN14/A；R左白狗、R右红球两条批注均已添加且未发送 | <a id="erye237-109"></a>**[UI] 删除一条批注同步移除对应待发引用**<br>1. 分别记录两条编号、正文和待发引用。<br>2. 点开左侧白狗批注，点击批注输入浮层右上角垃圾桶。<br>3. 核对画布编号、待发引用，再打开剩余红球批注；不发送。 | 白狗批注点、正文浮层及其待发引用一起移除，红球的点/正文/引用保留；源图和完成历史保持，无图片任务。不以空输入框退格代替垃圾桶，不测试文件不可读或preparing故障。 | User scope 2026-11-17；Requirement §3.3/A05；Mockup D07/D08；用户确认垃圾桶入口 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-109)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-109-technical-history) |
| ERYE237-110 | P0 | P-UI；TD-ANN14/A；当前源版零批注、零引用；用户确认上限10条 | <a id="erye237-110"></a>**[UI] 页面批注数量9、10、11条边界**<br>1. 在同一源版按TD-ANN14的点位逐条创建9条批注，名称“位置1”至“位置9”，正文分别为“仅记录位置1”至“仅记录位置9”，逐条添加到对话但不发送。<br>2. 新增并添加第10条“位置10/仅记录位置10”，核对10条及已有内容完整。<br>3. 在预留点尝试第11条“位置11/仅记录位置11”：创建、添加或发送前若任一实际UI门禁已拒绝，记录后停止；如全部允许，点击发送一次检查超限拒绝。合法9/10分支不发送。 | 9条、10条可完整创建/引用且不漏正文；第11条在生成受理前明确拒绝或阻止，原10条保持，不静默截掉某条，不产生超限图片任务。不强制特定报错文案/错误码；如超限已实际受理则Failed并等原任务，不重发。 | User scope 2026-11-17；Requirement §3.3/A23；用户2026-11-05确认10条 | [PLAN] | — | [批注新版](revision-fourteen-image-annotation-20261117.md#erye237-110)；[旧技术历史](archive-fourteen-technical-before-annotation-20261117.md#erye237-110-technical-history) |

```yaml
ERYE237-091:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-092:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-096:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-097:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-098:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-100:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-101:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-102:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-103:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-104:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-106:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-108:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-109:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

```yaml
ERYE237-110:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-v4"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-ui-v4
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: image annotation UI and actual image results only; current revision not executed
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

