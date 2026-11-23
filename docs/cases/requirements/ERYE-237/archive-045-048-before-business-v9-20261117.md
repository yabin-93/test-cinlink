# ERYE237-045～048优化前定义和登记快照（2026-11-17）

历史资料，不作v9当前排程。保留UI已测Passed、Technical审计缺口Blocked及云效关联。优化没有重新执行或宣称旧图像效果缺陷修复。

| ID | 优先级 | 前置 | 步骤 | 预期 | 来源 | 自动化 | 脚本 | 锚点 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-045 | P1 | P-TECH；B-IMG；BA-count；同源9/10/11条独立数据，每条1字正文 | <a id="erye237-045"></a>**2026-11-16 original UI repro Passed; E1 Blocked, E2 Passed; backend bypass uncovered. [Report](../../../defects/FWXC-540-retest-20261116-1400-monitor.md).** [Technical] 10条批注的前后端边界**<br>1. 分别UI和Agent/接口提交9、10、11条<br>2. 查提交数/provider及错误字段 | 9/10条符合上限可继续；11条执行前明确拒绝且不截掉后面的批注；后端绕过UI仍拒绝。用户2026-11-05确认本需求按10条 | Requirement §3.3/A23；用户确认10条 | [PLAN] | — | editor_get_capabilities/editor_submit_interaction |
| ERYE237-046 | P1 | P-TECH；B-IMG；BA-text；用BMP汉字按TD-TEXT生成1999/2000/2001字正文，其他字段不超限 | <a id="erye237-046"></a>**2026-11-16 original/E1/E2 UI Passed; backend bypass uncovered. [Report](../../../defects/FWXC-541-retest-20261116-1400-monitor.md).** [Technical] 单条正文2000字符边界**<br>1. 逐个填入并提交/校验<br>2. 用接口直接绕过UI校验<br>3. 对照保存正文 | 1999/2000完整保留；2001前后端拒绝、不静默截断；未创建生成任务/扣费；计数不照搬聊天框显示 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-047 | P1 | P-TECH；B-IMG；BA-text；批注正文各1字，全局3999/4000/4001字 | <a id="erye237-047"></a>**2026-11-16 original UI Passed; E1/E2 running; backend bypass uncovered. [Report](../../../defects/FWXC-542-retest-20261116-1400-monitor.md).** [Technical] 全局指令4000字符边界**<br>1. 分别通过UI与Agent提交完整全局文本<br>2. 检查字段校验和快照 | 3999/4000可继续；4001拒绝且不消费草稿；合法值无省略或截断；错误定位全局字段 | Requirement §3.3/A23 | [PLAN] | — | Requirement §3.3/A23 |
| ERYE237-048 | P1 | P-TECH；B-IMG；BA-text；批注数≤10、每条≤2000且全局≤4000，按TD-TEXT组合11999/12000/12001 | <a id="erye237-048"></a>**[Technical] 总字符12000独立边界**<br>1. 逐组合验证并提交<br>2. 对照各字段合法性及provider调用 | 11999/12000满足合计限制；12001仅因合计超限拒绝；不以先触发单字段超限冒充已测合计边界 | Requirement §3.3/A23 | [PLAN] | 2026-11-17 Chrome预发：FWXC-543原12001页面拒绝Passed；11999/12000及后端独立路径未覆盖，整例不计全通过。[报告](../../../defects/FWXC-543-retest-20261116-1400-monitor.md) | Requirement §3.3/A23 |

## 原完整登记

```yaml
ERYE237-045:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_scope: "Current9/10/11 count boundary and direct backend11 rejection passed; no new task/revision after rejected request. Internal provider/ledger evidence unavailable; this branch not declared fully Passed; old Failed evidence retained in prior report."
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5baf8e4eeb42b7443afed9e04d
    UI:
      execution_status: Passed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: "UI9/10 both accepted and actual PNG complete;11 UI rejected. Native direct11 count limit413 verified separately. No fee/provider audit inference; source of9 is saved redball V32,10/11 original V1."
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
ERYE237-046:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_scope: "1999/2000 input preservation and native backend2001 rejection passed. Internal provider/ledger evidence not independently available; cannot mark entire technical branch Passed. Output quality observation separate from limits."
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c896c3783fda5e3aaecaf15a8e
    UI:
      execution_status: Passed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: "1999/2000 full field preserved and accepted;2001 UI rejected after clearing prior error. Native backend2001 rejected413. Semantic output2000 redball bottom clipped separately Failed; no fee/provider audit inference."
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
ERYE237-047:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_scope: "All global field UI/native backend boundaries executed successfully; internal provider/ledger audit absent and separate image output quality issue recorded. Do not mark entire Technical branch Passed."
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7dee871435bff050031753f6ee
    UI:
      execution_status: Passed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      execution_scope: "3999/4000 full text preserved and accepted/done;4001 UI rejected; direct backend4001 rejected413. Separate redball horizontal clipping in real3999/4000 images observed Failed. Internal billing/provider not covered."
ERYE237-048:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Blocked
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_scope: "Exact total-length gate and native direct negative probe all executed; internal provider/fee audit unavailable.11999 later semantic task failed,12000 generated clipped-ball artifact; no blanket complete Passed."
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ea10d77d388798e29158811b35
    UI:
      execution_status: Passed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-17
      execution_environment: production
      execution_method: ego-browser headed; UI and actual published API probes
      execution_report: docs/cases/requirements/ERYE-237/results-045-048-ann009010-ego-prod-20261117.md
      execution_scope: "11999 and12000 exact totals accepted;12000 produced actual file,12001 UI rejected. Native backend12001 rejected413, all individual fields valid.11999 generation failed ambiguous no-action annotation fixture; no resubmit. Redball clipping extra finding."
```
