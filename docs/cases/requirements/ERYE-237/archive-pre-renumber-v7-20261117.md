# v7到v8编号调整前的13条当前定义（2026-11-17）

仅历史，不是当前待执行入口。这里只保存删除22条重复项之后仍有效的13条旧编号及其登记，不恢复已删项。当前编号见[renumbering-20261117-v8.md](renumbering-20261117-v8.md)；001～109原样保留。

<a id="old-111"></a>
## 旧ERYE237-111

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-111 | P0 | P-UI；TD-ANN35/A；原图左右地面无狗无球 | <a id="erye237-111"></a>**[UI] 仅执行已引用批注，不执行未引用批注**<br>1. 在R右建立批注A“右侧地面”，正文“在这块空白地面添加一个红色小球，保留人物和黄色手包及其他区域不变”，添加到对话。<br>2. 在R左另建批注B“左侧地面”，正文“在这块空白地面添加一只白色小狗，保留人物和黄色手包”，保留图上批注但不点击其添加入口。<br>3. 核对输入框只有A引用；输入全局说明“只按已引用的批注修改，其他内容保持不变”，正式发送一次。<br>4. 等待同一请求终态，查看并下载实际结果，对照原图右侧、左侧及人物/黄包。 | 成品右侧新增一个红球，左侧没有执行未引用B而新增小狗；已发消息只携A的修改要求，原图和主体保持。B后续是否仍为草稿另行记录，不自行增加保留规则。只有待发引用/助手回复正确而实际成品错误仍Failed。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-111)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-111-previous) |

```yaml
ERYE237-111:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-113"></a>
## 旧ERYE237-113

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-113 | P0 | P-UI；TD-ANN35/A；两个已引用批注A和B，名称/正文各不相同 | <a id="erye237-113"></a>**[UI] 删除后原位重建不复活旧引用**<br>1. 记录A所在位置、名称“旧标记”、正文“旧内容，仅记录不执行”；B为另一位置“保留标记/保留内容”。<br>2. 用A浮层右上垃圾桶删除A，确认A引用消失；在A原图位置重新创建C，名称“新标记”、正文“新内容，仅记录不执行”。<br>3. 仅将C添加到对话，分别打开C和B的引用核对位置及全文；不发送。 | 待发内容仅有新的C与原B，不复活A旧正文/旧引用，不把B错指到C。新编号是否连续或复用旧号按实际设计记录，不把编号策略本身判失败。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-113)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-113-previous) |

```yaml
ERYE237-113:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-114"></a>
## 旧ERYE237-114

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-114 | P1 | P-UI；TD-ANN35/A；标注模式下仅一条批注，浮层覆盖可创建批注的图像区域 | <a id="erye237-114"></a>**[UI] 批注浮层点击不穿透成画布点击**<br>1. 打开该编号浮层，记录图上批注数量及浮层下方图像区域。<br>2. 在浮层正文输入“点击隔离检查，仅记录不执行”，打开并收起对象名称设置，再点添加到对话。<br>3. 每步核对图上仍只有原批注；最后点该浮层垃圾桶，检查只删除原批注，浮层下方不新建编号；不发送。 | 正文、设置、添加和删除点击只触发浮层自己的操作，没有穿透在底图新建批注；非删除步骤数量保持1，删除后为0，源图不变。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-114)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-114-previous) |

```yaml
ERYE237-114:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-115"></a>
## 旧ERYE237-115

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-115 | P0 | P-UI；TD-ANN35/A；在当前正常布局下图像四角均可见 | <a id="erye237-115"></a>**[UI] 图像四角的批注浮层控件可达**<br>1. 分别使用左上(0.02,0.02)、右上(0.98,0.02)、左下(0.02,0.98)、右下(0.98,0.98)四个独立位置，每行只保留一个本轮批注。<br>2. 每行打开浮层，填写对应“左上/右上/左下/右下角点，仅记录不执行”，通过现有名称入口编辑标签，添加到对话后再用垃圾桶清理该行。<br>3. 逐行记录正文、名称、添加和删除入口是否可见或能通过本区域滚动到达；不发送。 | 四角的浮层都可完成输入、添加、删除，不被屏幕或编辑区边缘截成无法操作；操作仍对应本角点。允许自动翻转朝向和正常滚动，不规定弹层方向、像素阈值或所有控件必须同屏。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-115)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-115-previous) |

```yaml
ERYE237-115:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-116"></a>
## 旧ERYE237-116

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-116 | P0 | P-UI；TD-ANN35/A；一条批注；使用远低于正文上限的TD-ANN35八段文本 | <a id="erye237-116"></a>**[UI] 长正文滚动后替换中段不丢首尾**<br>1. 在批注正文输入TD-ANN35八段全文，记录首段、第4段和末段。<br>2. 在正文自身滚动到第4段，仅选中第4段全文，替换为“第4段：本段已修改，其余七段保持原文。”。<br>3. 滚动核对首尾，添加到对话后重新打开该引用，逐段对照；不发送。 | 仅第4段改变，其他七段与换行后的内容完整保留，没有把局部替换变成整段覆盖、丢首尾或残留旧段。此处不测2000字符边界或字符计数规则。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-116)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-116-previous) |

```yaml
ERYE237-116:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-117"></a>
## 旧ERYE237-117

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-117 | P0 | P-UI；TD-ANN35/A；一条已引用批注，原正文“旧内容，仅记录不执行” | <a id="erye237-117"></a>**[UI] 已引用批注清空再填写后恢复有效状态**<br>1. 从原编号打开浮层，将正文全选删除至空字符串。<br>2. 检查添加入口：禁用或明确拒绝均可；若可点，仅点一次。记录已存在引用的显示，不点击主发送。<br>3. 重新填入“新内容，本轮只记录不执行”，明确点击添加入口更新原引用，再打开引用核对。 | 空值不能被当成新的有效添加；恢复合法正文后只留同一条有效引用且全文是新内容，没有空值覆盖后无法恢复、旧新文字拼接或重复引用。空值期间可保留旧显示或显示无效态，不强制立即删除原引用。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-117)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-117-previous) |

```yaml
ERYE237-117:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-123"></a>
## 旧ERYE237-123

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-123 | P0 | P-UI；TD-ANN35/A；一条已有明确对象名称的批注，例如上衣处“上衣” | <a id="erye237-123"></a>**[UI] 打开再收起对象候选不自动改目标**<br>1. 记录该批注的编号、当前对象名称、图像锚点和正文“仅记录当前目标，不修改图片”。<br>2. 展开实际对象候选设置，仅查看，不点击任何候选、不提交自定义名称；用同一设置入口收起。<br>3. 重新打开编号浮层并添加到对话，核对原名称、正文和位置；不发送。 | 仅展开/收起不自动选择第一候选或更换名称/定位，正文完整，添加后仍是原批注。只验可见名称和定位，不要求内部对象ID、迟到/失败注入或特定键盘快捷键。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-123)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-123-previous) |

```yaml
ERYE237-123:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-128"></a>
## 旧ERYE237-128

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-128 | P1 | P-UI；TD-ANN35/A；批注A已引用，批注B存在但从未添加到对话 | <a id="erye237-128"></a>**[UI] 删除未引用批注不移除另一条已引用内容**<br>1. 在R右创建A“保留的引用/仅记录A”，添加到对话；R左创建B“未引用的批注/仅记录B”，不添加。<br>2. 从B编号浮层点击垃圾桶删除B；检查图上标记和主输入框引用。<br>3. 从A引用重新打开，核对A的名称、正文和位置；不发送。 | 只删除B，A引用仍为一份且仍准确指向原A；不会误清全部引用或把A关联到已删除的B。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-128)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-128-previous) |

```yaml
ERYE237-128:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-129"></a>
## 旧ERYE237-129

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-129 | P0 | P-UI；TD-ANN35/A；一条批注含TD-ANN35八段正文 | <a id="erye237-129"></a>**[UI] 滚动批注正文不移动或缩放画布标记**<br>1. 记录源图、当前缩放档、编号相对图像的位置与正文全文。<br>2. 光标置于正文内部，不按Ctrl/Command等修饰键，仅用普通滚轮上下滚动三次，记录正文或正常外层区域的实际滚动。<br>3. 再点击原编号核对正文、位置和数量，检查是否意外生成笔迹/选区或切换工具；不发送。 | 正文区域的滚轮输入不被误当画布缩放、拖动标记或绘制，正文和批注身份保持。允许正常外层滚动，不要求额外的浮层缩放/滚动条能力；对照图像内相对位置而非滚动后的屏幕绝对坐标。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-129)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-129-previous) |

```yaml
ERYE237-129:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-131"></a>
## 旧ERYE237-131

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-131 | P0 | P-UI；TD-ANN35/A；一条空批注 | <a id="erye237-131"></a>**[UI] 批注特殊符号按正文原样显示**<br>1. 在正文输入：`记录 <b>ANNO-131</b> & "原样文本" <位置>，本轮只记录，不执行图片修改。`<br>2. 添加到对话，从引用再次打开正文；对照输入全文和页面展示。<br>3. 检查没有因标签字符串生成额外页面控件或改成HTML样式内容；不发送。 | 括号、尖括号、引号和&均作为普通正文保存/显示，不丢字、不双重转义成可见实体，也不把`<b>`解析成新增页面元素。此例仅用无害文本，不执行脚本，不据此证明原权限/工具注入专项通过。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-131)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-131-previous) |

```yaml
ERYE237-131:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-133"></a>
## 旧ERYE237-133

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-133 | P1 | P-UI；TD-ANN35/A；同源5条批注，每条名称“批注一/二/三/四/五用于检查待发引用布局”，正文“仅记录本条，本轮不执行” | <a id="erye237-133"></a>**[UI] 窄聊天列中多条待发引用仍可操作**<br>1. 分别添加5条到对话，记录各编号和位置，不测试9/10/11上限。<br>2. 记录原分栏宽度，使用现有编辑区分隔条，在页面允许范围内拉宽图片区，使聊天列变窄。<br>3. 通过可见引用或本区域正常滚动，逐条打开5条引用核对编号/正文；检查主输入框和发送入口可访问但不点击发送；最后恢复原分栏。 | 引用的换行/滚动不会截掉无法访问的标签或让点击错指其他批注，主输入框和发送入口仍可达。允许滚动，不强制5条同屏或特定宽度。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-133)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-133-previous) |

```yaml
ERYE237-133:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-141"></a>
## 旧ERYE237-141

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-141 | P1 | P-UI；TD-ANN35/A；三处不同位置可见，名称与正文可区分 | <a id="erye237-141"></a>**[UI] 逆创建顺序添加引用仍绑定正确批注**<br>1. 依次创建A“左下/仅记录A”、B“右下/仅记录B”、C“右上/仅记录C”，记录各自编号和位置。<br>2. 按C→A→B次序分别添加到对话，记录页面实际展示顺序。<br>3. 按引用名称逐一打开，核对各自实际编号、正文和位置；不发送。 | 每条引用都绑定自身对象，不按创建数组下标或展示序号错配。页面自动排序或保留添加顺序均可，不把顺序策略当硬规则。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-141)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-141-previous) |

```yaml
ERYE237-141:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

<a id="old-143"></a>
## 旧ERYE237-143

| ID | 优先级 | 前置条件 | 操作步骤 | 预期结果 | 来源 | 自动化 | 脚本 | 锚点提示 |
|---|---|---|---|---|---|---|---|---|
| ERYE237-143 | P2 | P-UI；TD-ANN35/A；一条已引用批注，正文P1为“批注记录甲” | <a id="erye237-143"></a>**[UI] 批注正文与主输入框交替编辑不串值**<br>1. 在主输入框输入G1“全局记录：此轮不执行图片修改。”。<br>2. 从图上原编号将批注正文替换为P2“批注记录乙，保持原图不变。”，明确点击添加入口更新；回看主输入框G1。<br>3. 在主输入框G1末尾追加“检查结束。”，再打开批注核对P2及唯一引用；不发送。 | 主输入框保持G1及追加内容，批注保持P2；两处编辑不会互相覆盖、清空或把正文当全局文字，引用仍只有原批注一条。 | User scope 2026-11-17；Requirement §3.3/§4.1/A05/A06；Inferred QA Risk 批注交互与数据隔离 | [PLAN] | — | [完整步骤与去重依据](revision-110-144-image-annotation-20261117.md#erye237-143)；[旧定义](archive-110-144-before-annotation-20261117.md#erye237-143-previous) |

```yaml
ERYE237-143:
  status: PLAN
  script: ""
  current_case_version: "2026-11-17-annotation-110-144-v6"
  primary_branch: UI
  revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
  previous_case_record: docs/cases/requirements/ERYE-237/archive-110-144-before-annotation-20261117.md
  execution_branches:
    UI:
      execution_status: Not Run
      execution_revision: 2026-11-17-annotation-110-144-v6
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_scope: annotation UI only; this revision not executed; no backend/fault/billing gates
      revision_document: docs/cases/requirements/ERYE-237/revision-110-144-image-annotation-20261117.md
```

