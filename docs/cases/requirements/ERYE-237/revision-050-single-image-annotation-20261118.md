# ERYE237-050 单次单图批注用例修订（2026-11-18）

版本：2026-11-18-single-image-annotation-v11。用户明确图片批注不允许一次同时处理两张及以上图片。修订阶段仅更新文档和验收；随后用户要求重跑，最新执行见下方。

## 最新执行

2026-11-18新版050已在生产有头执行Passed，A/B两次独立单图请求均正确完成，来源/引用/成品隔离及历史保持通过；2请求零重发，自有草稿已清理，PLAN保持。0云端写入，未自动改变FWXC-599历史状态。[执行报告](results-050-single-image-v11-ego-prod-20261118.md)。下文Not Run为修订当时状态，不再代表本次最新执行。

## 当前业务边界

- 每个图片批注请求只有一个当前图片源；同一张图片可以包含多条批注，沿用既有上限。
- 需要处理不同图片时，逐张准备、逐张发起独立请求，前一轮终态后再开始下一轮。
- 不把单次多图编辑、后台拆成两个任务、一次交付两张结果或跨图保留两套待发引用当正常需求；也不凭本次确认发明必须弹出某个错误提示的要求。
- 只使用已授权源、当前图引用和自有测试草稿，不访问其他用户图片，不删除原图或完成历史；不要求固定工程名称或在提示词中硬编码内部ID。

## 新版050：逐图独立提交批注与跨图隔离

编号050、P0和Agent主分类保持，不新增正式用例或改变编号。图片批注从现有工具创建并添加到对话，主输入框每轮只描述当前图；验收真实图片结果，不要求特定内部工具路径。

前置：复用同一会话内两个有权限的独立图片工程及其原V1。I1无耳饰；I2已有银色耳钉和右耳机TEST。两图都是1024×1024；各自源/保留区已登记，无本例在途任务或混入的待发引用。

1. 打开I1原V1，确认待发内容只属于I1。在左耳归一化(0.405,0.39)创建一条批注并添加到对话。
2. 填入A轮完整说明，仅发送一次，等原任务终态；打开实际结果，核对蓝色星形耳钉、人物/耳机/背景及I2保持，记录I1完成版。
3. 再切I2原V1，确认当前图及待发引用属于I2，按现有入口移除可能残留的上一轮待发内容；不依赖跨图草稿自动保留或恢复。在左耳机(0.075,0.825)创建B轮批注并添加到对话。
4. 填入B轮完整说明，另发送一次，等原任务终态；核对左侧白色SYNC50、原银耳钉和右TEST保留，I1完成版及两图原源/历史保持。
5. A、B分别记录结果；任一合法单图请求处理错误图、混入另一图批注或产物不符才判对应轮失败。A失败且不影响I2独立准备时继续B，不能用B通过抵消A失败。

### 可复制参数

| 轮次 | 批注正文 | 主输入框说明 |
|---|---|---|
| A，当前仅I1 | 只在画面左侧耳朵的耳垂添加一枚蓝色星形耳钉，保留人物、两侧耳机及背景，其他内容保持不变。 | 仅按当前图片已引用的批注修改，添加蓝色星形耳钉，其他内容保持不变。 |
| B，当前仅I2 | 只在画面左侧耳机外侧耳罩添加白色大写SYNC50文字Logo，保留原银色耳钉、右侧TEST、人物及背景。 | 仅按当前图片已引用的批注修改，左侧耳机添加白色SYNC50，保留已有耳钉和右侧TEST，其他内容保持不变。 |

内部ID只在执行证据中登记，不要求使用者在提示词中填写。任务受理后只回读；一轮结束再切下一图，不同时运行两张图片批注。

## 与既有用例的区别

043验证同一张图一次两处修改；110验证同图已引用/未引用的执行范围；002只验证打开第二张图。050只保留跨两个独立单图请求的来源、引用和前轮成品隔离，不重复上述检查，也不新增多图正常用例。

## 状态及FWXC-599说明

新版050为Not Run，固定脚本PLAN/空路径。先前原回归和E1的“只处理当前图片、未同时交付另一图片”不再是本业务范围内的失败依据，旧多图场景对新版标为Not Applicable；旧E2双图普通Agent实测仅作历史观察，不能证明图片批注允许单次多图，也不计新版通过。

11-16的EXECUTION_OUTCOME_UNKNOWN是真实旧任务结果，保留事实，不因业务范围更正就判定所有未知结果错误都不是缺陷。11-18未复现该错误，不能继续用另一图未交付来判599未通过。FWXC-599最近官方回读为AI未通过、评论24362365；本次不写云效，不将修订当作产品修复或自动改为AI通过。

原任务、原始PNG、日志、云效评论和当时结果均保留；旧报告增加本次适用性说明，当前登记清除对旧Failed的继承。

## 修订前记录（仅历史，不再按此排程）

### 原正式条目

```text
| ERYE237-050 | P0 | P-AGENT；B-MULTI；B-IMG；BA-multi；I1/V1、I2/V1各一个不同锚点，U1均有权限 | <a id="erye237-050"></a>**[Agent] 多源引用拆明确提交**<br>1. 一次请求“将图片I1的所引用耳朵加耳钉，将图片I2的所引用耳机加logo”<br>2. 检查计划/submission/产物 | 两张图分别产生对应修改结果，源图和目标不串用；一图失败明确说明，不冒称两图完成 | Requirement §3.3/A06 | [PLAN] | — | Requirement §3.3/A06 ；[11-18 FWXC-599回归](../../../defects/FWXC-599-retest-ego-prod-20261118.md)：原Failed/E1Failed/E2Passed，云效AI未通过及评论已回读 |
```

### 原登记

```yaml
ERYE237-050:
  status: PLAN
  script: ""
  current_case_version: "2026-11-09-layered-execution"
  execution_branches:
    Agent:
      execution_status: Failed
      specification: docs/cases/requirements/ERYE-237/cases.md
      execution_date: 2026-11-18
      execution_environment: production
      execution_method: ego-browser headed;strict FWXC-599 original regression
      execution_scope: strict originalFailed;E1Failed/E2Passed separately;PLAN
      execution_report: docs/defects/FWXC-599-retest-ego-prod-20261118.md
      cloud_defects:
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6747933083e9981923015ca4ff
        - https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=debe06fe7d9bbc319134bd541e
      execution_evidence: reports/FWXC-599-retest-ego-prod-20261118/
    Technical:
      execution_status: Not Run
      specification: docs/cases/requirements/ERYE-237/technical-checks.md
  latest_cloud_status: "❌AI未通过"
  latest_cloud_defect: "https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=debe06fe7d9bbc319134bd541e"
  latest_regression_report: "docs/defects/FWXC-599-retest-ego-prod-20261118.md"
  latest_cloud_comment_id: "24362365"
  latest_cloud_sync_verified: true
  latest_regression_date: "2026-11-18"
  latest_regression_original_status: "Failed"
  latest_regression_expansion_summary: "E1 Failed;E2 Passed;business only;I2 freeze contract not independently verified"

```

### 原技术补充及夹具

```text
| `ERYE237-050/Technical` | 原专项数据：P；B-MULTI；B-IMG；BA-multi；I1/V1、I2/V1各一个不同锚点，U1均有权限。技术责任（仅核内部、精度、文件、调用及费用部分）：拆成按源版本明确的独立submission；每份快照仅含对应图锚点；不复制同批注到另一张图，费用和失败归属清楚 | [完整原断言](coverage-baseline-20261109.md#erye237-050) |
| BA-multi | 两个授权源版本各自有独立锚点、正文和引用；记录提交应归属的源，不把一个目标复制给两图 |
```

旧报告：[FWXC-599原回归](../../../defects/FWXC-599-retest-ego-prod-20261118.md)。本地完整修订前快照：reports/erye237-050-single-image-revision-20261118/before-revision.json。
