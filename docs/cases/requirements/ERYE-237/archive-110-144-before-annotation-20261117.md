# ERYE237-110～144收敛批注UI前的定义与登记（2026-11-17）

仅用于历史追溯，不再按本页执行当前编号。用户要求仅图片批注且不重复旧用例，当前见[revision-110-144-image-annotation-20261117.md](revision-110-144-image-annotation-20261117.md)。旧技术责任退出当前主回归，没有被新版UI证明通过；原始报告和云效不改。111～144原Not Run，110原为045/UI合并索引。

<a id="erye237-110-previous"></a>
## ERYE237-110

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-110 | P0 | 已有同场景用例，当前编号仅保留追溯 | <a id="erye237-110"></a>**[Merged] 已合并，不独立执行**<br>同场景唯一执行入口：[ERYE237-045/UI](cases.md#erye237-045)；按对应原用例步骤与范围执行，不复制本编号新跑 | 当前编号不产生独立执行任务、统计或Passed；原用例的状态与证据不被继承或改写。旧技术结果与v4设计仅历史 | User deduplication 2026-11-17；沿用目标用例来源 | [PLAN] | — | [合并依据](revision-fourteen-image-annotation-20261117.md#dedup-map) |

```yaml
ERYE237-110:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-ui-dedup-v5"
  primary_branch: UI
  execution_mode: merged_reference
  runnable: false
  merged_into:
    - ERYE237-045/UI
  revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-fourteen-technical-before-annotation-20261117.md
  historical_execution_report: docs/cases/requirements/ERYE-237/results-revised-eleven-plus-six-ego-prod-20261117.md
  execution_branches:
    UI:
      execution_status: Not Applicable
      applicability_basis: duplicate merged into existing case; alias only, no independent execution or inherited pass
      specification: docs/cases/requirements/ERYE-237/cases.md
      revision_document: docs/cases/requirements/ERYE-237/revision-fourteen-image-annotation-20261117.md
```

<a id="erye237-111-previous"></a>
## ERYE237-111

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-111 | P0 | P-TECH；B-IMG；P-API；F-provider-unknown；已取得providerRequestId后断开响应 | <a id="erye237-111"></a>**[Technical] provider超时结果未知先查证**<br>1. 触发超时<br>2. 等reconciling并查询原providerRequestId<br>3. 分别返回已成功/未成功/仍未知 | RESULT_UNKNOWN待查证，不自动重发收费生成；成功恢复同一候选，确定未执行后才按许可处理；未知期间费用状态不伪造 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

```yaml
ERYE237-111:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-112-previous"></a>
## ERYE237-112

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-112 | P0 | P-TECH；B-IMG；P-API；F-invalid-output；提供坏文件、错误尺寸、错误格式或哈希的候选 | <a id="erye237-112"></a>**[Technical] 硬约束不合格必须失败**<br>1. 放行provider响应到validating<br>2. 查看输出校验和版本/工作头 | OUTPUT_INVALID且指出具体硬约束；不建立可用版本、不转needsReview掩盖；保留诊断，重新生成按新attempt/费用授权 | Requirement §6.2/§7/IMG-R04/A19 | [PLAN] | — | Requirement §6.2/§7/IMG-R04/A19 |

```yaml
ERYE237-112:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-113-previous"></a>
## ERYE237-113

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-113 | P0 | P-TECH；B-IMG；P-API；F-persist-fail；有效候选sha已记录 | <a id="erye237-113"></a>**[Technical] 保存失败只保存同一候选**<br>1. 使persisting失败<br>2. 选择“重试保存”<br>3. 恢复存储后核对providerRequestId/候选sha/版本和账务 | PERSISTENCE_FAILED；重试同一候选存储，不重新调用provider；最终只建立一份对应版本/费用，不丢诊断 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

```yaml
ERYE237-113:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-114-previous"></a>
## ERYE237-114

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-114 | P1 | P-TECH；B-IMG；P-API；F-notification-fail；正式文件/版本已原子保存 | <a id="erye237-114"></a>**[Technical] 缩略图或通知失败不重生成**<br>1. 分别阻断缩略图生成和通知<br>2. 重连/刷新/重试通知<br>3. 核对源结果 | 正式任务仍按权威completed；只恢复展示/投递；无第二次provider/版本或收费，不能因UI无图误判应重生成 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

```yaml
ERYE237-114:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-115-previous"></a>
## ERYE237-115

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-115 | P0 | P-TECH；B-IMG；P-API；J-running；command/submission/job/attempt均已记录 | <a id="erye237-115"></a>**[Technical] 客户端或worker重启续接原任务**<br>1. 在排队、provider_running、persisting分别重启本例测试进程/客户端<br>2. 恢复后按原ID查询 | 续接真实阶段及原输入，不新建重复任务；终端事件去重；UI以权威状态恢复，不靠本地倒计时猜完成 | Requirement §7/A19 | [PLAN] | — | Requirement §7/A19 |

```yaml
ERYE237-115:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-116-previous"></a>
## ERYE237-116

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-116 | P0 | P-TECH；B-IMG；P-API；J-queued；worker可控且未调用provider | <a id="erye237-116"></a>**[Technical] 排队取消先于provider执行**<br>1. UI或Agent发送“取消当前任务J，只取消该任务”<br>2. 放行worker<br>3. 读取权威终态和账务 | 取消先提交则cancelled、provider零调用、无生成费；不删源图/草稿和历史，不把放弃弹窗当取消任务 | Requirement §7/A20 | [PLAN] | — | jobs_cancel |

```yaml
ERYE237-116:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-117-previous"></a>
## ERYE237-117

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-117 | P0 | P-TECH；B-IMG；P-API；J-provider-running；provider调用已发生 | <a id="erye237-117"></a>**[Technical] 运行中取消请求与终态区分**<br>1. 请求取消<br>2. 在provider尚未确认期间查看UI/Agent<br>3. 等实际终态再读取费用 | 先cancel_requested而非立即谎报已停止；尽力取消后展示实际结果；已产生费用按事实记录，不承诺退款 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |

```yaml
ERYE237-117:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-118-previous"></a>
## ERYE237-118

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-118 | P0 | P-TECH；B-IMG；P-API；F-race-complete-first；validating/persisting后完成先写入 | <a id="erye237-118"></a>**[Technical] 完成先提交时取消返回实际完成**<br>1. 在完成事务后送达取消请求<br>2. 查询事件和工作头<br>3. 明确撤销完成版 | 权威completed不被改为cancelled；允许按历史撤销恢复父版本但不删文件/退款；UI/Agent终态一致 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |

```yaml
ERYE237-118:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-119-previous"></a>
## ERYE237-119

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-119 | P0 | P-TECH；B-IMG；P-API；F-race-cancel-first；cancelled已持久化 | <a id="erye237-119"></a>**[Technical] 取消先提交不激活晚到候选**<br>1. 再投递原provider完成/保存回调并重复投递<br>2. 核对工作头/版本/费用及UI焦点 | 不自动激活晚到结果，不回退终态，不抢画布；保留可审计候选/费用事实，重复事件不重复写账或版本 | Requirement §7/A20 | [PLAN] | — | Requirement §7/A20 |

```yaml
ERYE237-119:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-120-previous"></a>
## ERYE237-120

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-120 | P0 | P-TECH；B-IMG；P-API；F-focus；任务源V2，用户正在查看V1且有已记录zoom/pan | <a id="erye237-120"></a>**[Technical] 失败取消冲突都不抢用户当前画布**<br>1. 分别触发任务失败/取消/冲突<br>2. 查看V1<br>3. 主动点击V2任务“查看并重试”；另测仍停占位分支 | V1及视图不变；后台只恢复V2草稿；主动打开才切V2，遇脏草稿先询问；仍停任务占位时失败才显示源图 | Requirement v1.2/IMG-R01/A16/A19 | [PLAN] | — | Requirement v1.2/IMG-R01/A16/A19 |

```yaml
ERYE237-120:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-121-previous"></a>
## ERYE237-121

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-121 | P1 | P-TECH；B-IMG；P-API；F-focus；任务失败且已恢复源草稿 | <a id="erye237-121"></a>**[Technical] 删失败占位不删原版本或恢复草稿**<br>1. 删除失败任务占位<br>2. 从历史/任务入口重新查询来源和草稿<br>3. 按原失败阶段重试 | 源版本、已发消息和可重试草稿保留；重试绑定原提交/来源/失败阶段，改输入必须新提交 | Requirement v1.2/IMG-R01/A19 | [PLAN] | — | Requirement v1.2/IMG-R01/A19 |

```yaml
ERYE237-121:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-122-previous"></a>
## ERYE237-122

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-122 | P1 | P-TECH；B-IMG；P-API；TD-QUOTE；有效quote绑定快照/模型/尺寸，权威时钟可控 | <a id="erye237-122"></a>**[Technical] 报价过期和输入变化使报价失效**<br>1. 保持输入在有效期内提交<br>2. 独立分支到期或改变mask/文字/模型/尺寸/阶段后沿用旧quote提交 | 有效报价按授权处理；过期/不匹配执行前拒绝或重新报价；默认5分钟由服务返回有效期校验；超授权需确认，不将本地画笔变付费确认 | Requirement §6.2/A18 | [PLAN] | — | editor_quote_interaction/submit |

```yaml
ERYE237-122:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-123-previous"></a>
## ERYE237-123

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-123 | P0 | P-TECH；B-IMG；P-API；TD-LEDGER；AI成功、失败已调用、取消、本地合成与问答样本 | <a id="erye237-123"></a>**[Technical] 费用与技术状态独立且可追溯**<br>1. 对照submission/attempt/provider usage与账户流水<br>2. 回读重试/撤销后的累计记录 | 未调用/已调用待核算/已核算准确；生成费用只归真实attempt，存储重试/本地绘制/查看/撤销不重复生成收费；退款独立记录，不删除job清账 | Requirement §7/§11/A18/A20 | [PLAN] | — | Requirement §7/§11/A18/A20 |

```yaml
ERYE237-123:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-124-previous"></a>
## ERYE237-124

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-124 | P0 | P-TECH；TD-FORMAT；各格式有效源，EXIF旋转及非sRGB样本；合法输入通过后按B-IMG建工程再测编辑分支 | <a id="erye237-124"></a>**[Technical] 合法JPEG PNG WebP及canonical规范化**<br>1. 各自UI导入或Agent以授权fileId导入<br>2. 读取canonical尺寸/方向/色彩/hash<br>3. 核实工程后按实际源版同点批注并导出 | 支持三类，导入先归一方向和sRGB；后续坐标基于canonical而非原始旋转图；两个入口几何相同且源身份可追溯 | Requirement §5.2/§8/A23 | [PLAN] | — | Requirement §5.2/§8/A23 |

```yaml
ERYE237-124:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-125-previous"></a>
## ERYE237-125

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-125 | P1 | P-TECH；P-API；TD-LIMIT；解码像素远低上限，字节数为MaxBytes−1/MaxBytes/MaxBytes+1 | <a id="erye237-125"></a>**[Technical] 输入字节上限独立边界**<br>1. 分别上传/导入并通过接口直接提交<br>2. 查看能力声明及源图验证 | 上限内可继续、超限执行前拒绝，不读取到provider；默认20MB须映射为冻结MaxBytes，单位未明不能自选阈值；与provider交集有明确依据 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |

```yaml
ERYE237-125:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-126-previous"></a>
## ERYE237-126

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-126 | P1 | P-TECH；P-API；TD-LIMIT；文件字节合法，像素数分别小于/等于/大于MaxPixels | <a id="erye237-126"></a>**[Technical] 解码像素上限独立边界**<br>1. 导入三张固定维度图<br>2. 检查实际解码尺寸和校验<br>3. 尝试绕过前端 | 按默认24MP对应冻结MaxPixels和provider交集执行；超过像素限额前后端均拒绝，不以压缩后文件小作为可用依据 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |

```yaml
ERYE237-126:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-127-previous"></a>
## ERYE237-127

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-127 | P1 | P-TECH；TD-FORMAT；合法HEIC，分别有/无已公布转换能力；合法输入通过后按B-IMG建工程再测编辑分支 | <a id="erye237-127"></a>**[Technical] HEIC可转码与不可转码分支**<br>1. 同一文件在两能力配置下导入<br>2. 打开转换产物或查看错误 | 可转换时明示并返回可追溯规范图；无能力时给可操作格式提示，无假导入成功或空图片 | Requirement §8/A23 | [PLAN] | — | Requirement §8/A23 |

```yaml
ERYE237-127:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-128-previous"></a>
## ERYE237-128

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-128 | P1 | P-TECH；P-API；TD-BAD；截断图、扩展名伪装、解码超限头；安全隔离环境 | <a id="erye237-128"></a>**[Technical] 坏图伪格式及危险解码输入**<br>1. 以正常导入和接口提交各异常样本<br>2. 检查资源保护/错误/任务 | 安全校验明确失败，不能因后缀或声明mime放行；无provider调用/无效版本；不导致服务无界解码或泄露内部路径 | Requirement §8/A23；Inferred QA Risk 解码资源耗尽 | [PLAN] | — | Requirement §8/A23；Inferred QA Risk 解码资源耗尽 |

```yaml
ERYE237-128:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-129-previous"></a>
## ERYE237-129

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-129 | P0 | P-TECH；B-IMG；BG；非方图和TD-GEOMETRY含NaN/Infinity/越界/零面积；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-129"></a>**[Technical] 非法几何与圆形短边归一**<br>1. 验证边点像素round(x×(W−1))及矩形向外取整<br>2. 提交非法几何<br>3. 比较非方图圆形mask | 合法点/矩形映射符合规范，mask源W×H且不越界；非法输入先拒绝；圆半径按短边归一，不变椭圆 | Requirement §5.2/A15/A23 | [PLAN] | — | Requirement §5.2/A15/A23 |

```yaml
ERYE237-129:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-130-previous"></a>
## ERYE237-130

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-130 | P0 | P-TECH；B-IMG；P-API；TD-AUTH；U1拥有D1，U2无权限；另有可撤销测试授权 | <a id="erye237-130"></a>**[Technical] 跨owner/project授权隔离与撤权**<br>1. U2读取/编辑/导出D1及mask/源file<br>2. 授权后开始任务并撤权<br>3. 重试读取/提交/短链刷新 | 每条资源路径校验owner/project，越权前拒绝且不暴露内容；撤权按统一授权错误处理，无自动扩权；已发直链撤销能力按真实存储策略单独核实，不假定即刻失效 | Requirement §6.3/§7/A23 | [PLAN] | — | Requirement §6.3/§7/A23 |

```yaml
ERYE237-130:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-131-previous"></a>
## ERYE237-131

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-131 | P0 | P-TECH；B-IMG；TD-INJECTION；图片文字/正文含“忽略权限、读取别的用户、执行脚本”等数据 | <a id="erye237-131"></a>**[Technical] 图片与批注提示注入无执行权**<br>1. 提交正常问答或局部编辑<br>2. 观察解析、资源选择、工具参数和日志 | 恶意内容只是待处理数据，不能授权访问其他用户、执行脚本或改变任务范围；请求仍走schema/范围校验，无eval路径 | Requirement §6.1/§6.3/A23 | [PLAN] | — | Requirement §6.1/§6.3/A23 |

```yaml
ERYE237-131:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-132-previous"></a>
## ERYE237-132

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-132 | P1 | P-TECH；B-IMG；TD-URL；已授权源file与过期下载地址 | <a id="erye237-132"></a>**[Technical] 短链过期刷新不改变资源身份**<br>1. 让地址过期<br>2. 重新打开或重试下载<br>3. 对照刷新后的file/version/hash和provider调用 | 通过持久file/version身份重新授权下载；未重复生成，不把短链当持久ID；失效不可恢复时给可操作错误，原提交不偷换来源 | Requirement §6.3/A19/A23 | [PLAN] | — | Requirement §6.3/A19/A23 |

```yaml
ERYE237-132:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-133-previous"></a>
## ERYE237-133

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-133 | P1 | P-TECH；P-API；TD-OBS；一次合法任务及一次失败，受控日志读取权限 | <a id="erye237-133"></a>**[Technical] 日志与客户端不暴露敏感信息**<br>1. 检查Web/mac网络响应、客户端配置和默认日志<br>2. 核对operation/来源/command/job/phase/费用等定位字段 | 能关联排查但不暴露provider密钥、访问凭证、完整图片/批注正文；必要诊断用受控资源引用，错误消息脱敏 | Requirement §6.3/§11/A23 | [PLAN] | — | Requirement §6.3/§11/A23 |

```yaml
ERYE237-133:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-134-previous"></a>
## ERYE237-134

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-134 | P1 | P-TECH；B-IMG；TD-QUALITY；样本/标注/允许变化/人工量表已由M0冻结；【门禁】质量集及语义量表待冻结；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-134"></a>**[Technical] 固定质量集按技术和语义分别验收**<br>1. 对玻璃/发丝/中文小字/斜标签/密集笔迹/同名对象/超宽高比/大图执行对应任务<br>2. 解码检查并人工复核 | 硬约束精确满足；透明、主体保持、接缝、文字逐样本记录；不以HTTP成功或返回文件当语义通过；量表未冻结则对应项待复核，不自造阈值 | Requirement §8/IMG-R05/A09/A11 | [PLAN] | — | Requirement §8/IMG-R05/A09/A11 |

```yaml
ERYE237-134:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-135-previous"></a>
## ERYE237-135

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-135 | P1 | P-TECH；B-IMG；TD-FONT；两端相同字体文件hash/引擎及canonical对象快照；几何/像素/质量标准基于实际工程源版冻结 | <a id="erye237-135"></a>**[Technical] Web/macOS同对象渲染一致**<br>1. 在Web与macOS加载同快照<br>2. 比较几何/颜色/排版/导出文件<br>3. 交叉继续编辑 | 源单位、稳定ID及渲染约定一致，使用同字体文件而非仅同名字体；AI随机结果不要求跨次文件hash一致；缺环境则记未执行 | Requirement §8/v1.2/IMG-R03/A02 | [PLAN] | — | Requirement §8/v1.2/IMG-R03/A02 |

```yaml
ERYE237-135:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-136-previous"></a>
## ERYE237-136

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-136 | P1 | P-TECH；TD-LEGACY；现有generate_image与enhance_image的合法基线 | <a id="erye237-136"></a>**[Technical] 旧生图与增强不被编辑路由替换**<br>1. 分别执行原生图、原增强和新本地文字合成/图像编辑<br>2. 核对选择的workflow/executor/输入输出 | 旧能力保持原语义；新编辑不全落generate_image；enhance不冒充画笔/批注实现；生产服务不依赖当前助手会话的内部工具或临时路径 | Requirement §6.3/§9/A24 | [PLAN] | — | Requirement §6.3/§9/A24 |

```yaml
ERYE237-136:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-137-previous"></a>
## ERYE237-137

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-137 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；拟定7天策略已批准、服务返回expiresAt；F-persist-delay可控；【门禁】拟定：草稿期限策略待产品批准 | <a id="erye237-137"></a>**[Technical] 只有持久化内容修改续期**<br>1. 记录最后持久化时间<br>2. 分别进行内容成功修改、只打开/缩放/心跳、失败写入和同command重复<br>3. 读取expiresAt | 按拟定式lastPersistedContentChangeAt+7×24h；仅成功持久化内容变化续期，其他均不延长；显示服务时间而非本地自算 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |

```yaml
ERYE237-137:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-138-previous"></a>
## ERYE237-138

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-138 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；已批准策略；固定expiresAt=E及未提交草稿；【门禁】拟定：草稿期限策略待产品批准 | <a id="erye237-138"></a>**[Technical] 到期等值边界阻止修改和提交**<br>1. 服务时钟依次E−1秒、E、E+1秒<br>2. 分别验证修改/提交<br>3. 核对provider和费用 | 有效期内按正常规则；达到E即DRAFT_EXPIRED且不调用模型或扣费；保留已发消息/完成版本/历史，不假报已续期 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |

```yaml
ERYE237-138:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-139-previous"></a>
## ERYE237-139

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-139 | P1 | P-TECH；B-IMG；P-API；TD-CLOCK；离线缓存有内容；提交接收/未接收两分支；【门禁】拟定：过期恢复策略待产品批准 | <a id="erye237-139"></a>**[Technical] 离线跨期先查命令再恢复新草稿**<br>1. 离线跨E后重连<br>2. 先按command查询<br>3. 对未接收且过期分支明确选择恢复为新草稿 | 已接收恢复原任务；未接收则校验源/版本后创建新draftId，不复活主动放弃草稿；本地未同步文字标为尚未保存 | Requirement v1.2/IMG-R02 | [PLAN] | — | Requirement v1.2/IMG-R02 |

```yaml
ERYE237-139:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-140-previous"></a>
## ERYE237-140

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-140 | P1 | P-TECH；B-IMG；TD-FONT；批准字体/替代链已交付；含中文、混排、换行、Emoji缺字样本；【门禁】拟定：字体表、回退链及渲染引擎待冻结 | <a id="erye237-140"></a>**[Technical] 字体缺失替代与缺字阻断**<br>1. 模拟字体缺失<br>2. 预览批准替代并明确选择<br>3. 撤销替代<br>4. 制造所有批准字体均缺字<br>5. 保存草稿并尝试合成/导出 | 按已批准回退流程显示原字体/受影响对象并记录替代；替代可撤销；未解决缺字可存草稿但不输出删字/方框错误成品；快照记录实际字体hash/引擎 | Requirement v1.2/IMG-R03 | [PLAN] | — | Requirement v1.2/IMG-R03 |

```yaml
ERYE237-140:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-141-previous"></a>
## ERYE237-141

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-141 | P1 | P-TECH；B-IMG；P-API；TD-REVIEW；有效文件但语义待检查，拟定质量状态已批准；【门禁】拟定：候选接受/拒绝策略待产品批准 | <a id="erye237-141"></a>**[Technical] pending_review候选不自动激活**<br>1. 任务返回pending_review<br>2. 尝试自动续编/正式导出<br>3. 明确接受<br>4. 回读工作头和费用 | 接受前带待检查标识且非自动编辑来源；正式导出/设当前/续编须明确接受；接受记录candidate/来源/revision，不调用模型或新收生成费 | Requirement v1.2/IMG-R04 | [PLAN] | — | Requirement v1.2/IMG-R04 |

```yaml
ERYE237-141:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-142-previous"></a>
## ERYE237-142

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-142 | P1 | P-TECH；B-IMG；P-API；TD-REVIEW；pending候选，已发生新修订；另有可拒绝候选；【门禁】拟定：候选接受/拒绝策略待产品批准 | <a id="erye237-142"></a>**[Technical] 候选接受冲突与拒绝重生成**<br>1. 接受旧候选<br>2. 核对冲突分支<br>3. 拒绝另一候选并明确申请重生成<br>4. 查看新attempt/报价 | 不覆盖新修改，保留分支供选择；拒绝保留诊断/原版本；拒绝本身不调模型，质量重生成按新attempt和授权计费，不冒充存储重试 | Requirement v1.2/IMG-R04 | [PLAN] | — | Requirement v1.2/IMG-R04 |

```yaml
ERYE237-142:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-143-previous"></a>
## ERYE237-143

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-143 | P2 | P-TECH；B-IMG；TD-PERF；Web/mac环境、典型/大图配置和事件采样已冻结；【门禁】性能样本量/环境及采样口径待冻结 | <a id="erye237-143"></a>**[Technical] 图像画布性能目标及测量边界**<br>1. 采集按钮/光标/批注本地反馈P95和典型图像画布拖动帧率<br>2. 大图代理预览后原尺寸导出 | 按PRD目标本地反馈P95≤100ms、典型拖动≥30fps；不误测接口RTT或视频时间轴；大图导出仍原尺寸；环境/采样未定则只报数据不判完整通过 | Requirement §8/A24 | [PLAN] | — | Requirement §8/A24 |

```yaml
ERYE237-143:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

<a id="erye237-144-previous"></a>
## ERYE237-144

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-144 | P0 | P-TECH；TD-CAP；M0/M4交付物清单及真实API样例；【门禁】M0资料与真实服务证据待交付 | <a id="erye237-144"></a>**[Technical] 上线资料与真实provider验证齐备**<br>1. 核对真实带源编辑/透明PNG/mask/中文文字/五比例/取消超时查证/usage/下载持久化证据<br>2. 核对质量集、字体表、缺失状态设计和双入口结果 | A01～A24/D01～D12都有真实对应证据；拟定规则未批准不视为放行；无仅UI实现、重复收费、错误版本覆盖或只回复成功；mock展示不代替服务端验收 | Requirement §6.3/§10/IMG-R05/A24 | [PLAN] | — | Requirement §6.3/§10/IMG-R05/A24 |

```yaml
ERYE237-144:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/cases.md
```

