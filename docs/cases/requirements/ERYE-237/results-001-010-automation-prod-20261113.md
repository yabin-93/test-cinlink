# ERYE237-001～010 生产自动化执行（2026-11-13）

用户最新已暂停脚本接入，当前转有头006～010；本页保留暂停前实际任务及校准记录。默认npm入口已恢复，登记均PLAN；新脚本仅未接入草稿。不得将本页调试异常直接作为产品失败。

本报告由固定ego-browser脚本逐例更新。当前版本2026-11-09-layered-execution，仅001～010主分支，不包含配对Agent或Technical。

环境：https://app.cinlink.ai/；ego-browser有头；TaskSpace8；串行、零自动业务重试。复用已登记工程和保存版本，独立fixture/oracles在目标请求前登记；未同步云效。

当前统计：4 Passed / 4 Failed / 1 Blocked / 1 Not Run。

| 编号 | 主分支 | 自动化执行状态 | 实际结果 |
|---|---|---|---|
| ERYE237-001 | UI | Passed | Processed import and original generated engineering canvases match independent oracles; history unchanged |
| ERYE237-002 | Agent | Failed | 请保持当前对话页面打开；同一对话有多个页面时，请先关闭重复页面。 |
| ERYE237-003 | Agent | Failed | Project does not belong to this conversation |
| ERYE237-004 | UI | Passed | V1/V2/V3 actual canvases matched registered saved versions; returned to V3 |
| ERYE237-005 | Agent | Failed | 请先添加批注、画笔内容或擦除区域。 |
| ERYE237-006 | Agent | Failed | Expected exactly one appended branch history version |
| ERYE237-007 | UI | Blocked | UI task completed; running sampling not fully covered; no repeat generation |
| ERYE237-008 | UI | Not Run | 尚未执行 |
| ERYE237-009 | UI | Passed | All six zoom values checked against real canvas dimensions; pixels/history unchanged |
| ERYE237-010 | UI | Passed | Q source(750,333), body and count stable across zoom/ordinary left-drag; gray outside did not create annotation |

## 固定脚本与执行命令

脚本：[suite.mjs](../../../../tools/erye237/ego/suite.mjs)，入口：[run.mjs](../../../../tools/erye237/ego/run.mjs)。不是旧Playwright fixme跑过的结果。

```sh
npm run test:erye237 -- --config /Users/edy/Documents/cinlink-test/test-cinlink/reports/erye237-001-010-automation-prod-20261113/config.json --all
```

恢复必须使用同一config/outputDir。提交前持久写attempted/runId；已受理只回读，不自动重发。Pending/Blocked均不计通过；自动化异常单独保存，不冒充产品缺陷。007运行采样错过不重复生成；005蓝底未归原工程时不发送依赖绿底。

## 逐例实际记录

### ERYE237-001 / Passed

Processed import and original generated engineering canvases match independent oracles; history unchanged

本地证据：`reports/erye237-001-010-automation-prod-20261113/001-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-002 / Failed

请保持当前对话页面打开；同一对话有多个页面时，请先关闭重复页面。

本地证据：`reports/erye237-001-010-automation-prod-20261113/002-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

实际运行：`run_v2_6022840fa8914a1883f5c883295c1ee1`。

### ERYE237-003 / Failed

Project does not belong to this conversation

本地证据：`reports/erye237-001-010-automation-prod-20261113/003-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

实际运行：`run_v2_f4b4966e6d3341eb819b55cbb8e083c5`。

### ERYE237-004 / Passed

V1/V2/V3 actual canvases matched registered saved versions; returned to V3

本地证据：`reports/erye237-001-010-automation-prod-20261113/004-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-005 / Failed

请先添加批注、画笔内容或擦除区域。

本地证据：`reports/erye237-001-010-automation-prod-20261113/005-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-006 / Failed

Expected exactly one appended branch history version

本地证据：`reports/erye237-001-010-automation-prod-20261113/006-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

实际运行：`run_v2_2c8ac7f6b91f423282aa1af2a1453a87`。

### ERYE237-007 / Blocked

UI task completed; running sampling not fully covered; no repeat generation

本地证据：`reports/erye237-001-010-automation-prod-20261113/007-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-008 / Not Run

Not Run

本地证据：`reports/erye237-001-010-automation-prod-20261113/008-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-009 / Passed

All six zoom values checked against real canvas dimensions; pixels/history unchanged

本地证据：`reports/erye237-001-010-automation-prod-20261113/009-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

### ERYE237-010 / Passed

Q source(750,333), body and count stable across zoom/ordinary left-drag; gray outside did not create annotation

本地证据：`reports/erye237-001-010-automation-prod-20261113/010-state.json`及对应截图/快照、提交检查点、run回读、实际文件；原始消息/签名地址仅本地。

## 边界

自动化实现状态按实际断言覆盖更新到registry；有人工补充或未实现断言仍保持PLAN。生成成功文字/终态不能代替实际画布、保存历史或文件验证。历史手工/ego轮次报告保留，不补算本次。未提交推送Git，未更新云效。


## 暂停后006人工复核纠正

原草稿脚本要求“每次恰好新增一项历史”超出现行006业务预期。当前run交付与原工程既有对应版本实际UI导出RGBA一致，V1来源及V2/V3保留已核验；006当前主分支Passed，以[最新有头R2报告](results-006-010-ego-prod-20261113-r2.md)为准。上表保留草稿诊断历史，不能据此提交产品缺陷。
