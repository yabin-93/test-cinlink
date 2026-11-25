# ERYE-199 本版本范围调整与012复测

日期：2026-11-13。用户确认011/013/014/015相关功能本版本不做，后续再测；当前标**Not Applicable（本版本不适用）**，不计本轮Blocked或缺陷，也不记通过。原需求、原探测脚本和[此前真实Blocked结果](results-011-015-production-20261113.md)保留。

## 本轮结果

| 用例 | 当前状态 | 说明 |
|---|---|---|
| ERYE199-011 | Not Applicable | 同步锁本版本不做，后续再测 |
| ERYE199-012 | Failed | 新工程复测仍复现：普通删除A后，B从7秒自动前移到2秒，未保留空隙 |
| ERYE199-013 | Not Applicable | 源绑定字幕及关联联动本版本不做，后续再测 |
| ERYE199-014 | Not Applicable | 轨道编辑锁及锁定批量操作本版本不做，后续再测 |
| ERYE199-015 | Not Applicable | solo及正式导出隔离本版本不做；此前隐藏/静音局部观察保留，不提升为整例通过 |

本次实际执行仅012，其余4条输出`executed=false`，未创建对应工程或发送任务。006及其他未点名用例不扩大排除。[版本范围控制](../../../../tools/editor/erye199/release-scope.mjs)已接入统一运行器，9项离线检查通过，包括“只选延期用例时不打开浏览器/不准备工程”。

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011-015
# 当前版本实际仅运行012；也可明确使用 --cases 012
```

## 012复测步骤与实际结果

生产环境app.cinlink.ai，Ego Lite有头、TaskSpace5，新建专用测试项目、独立会话和工程；未使用旧用户工程或computer-use，串行零重试。

1. 准备同一视频轨A在0～5秒、B在5～10秒，两段均取同一原片的源0～5秒，1倍速，确认已保存和加载。
2. 真实拖动B向右2秒：A保持0～5秒，B变为7～12秒，5～7秒留空；本步符合预期。
3. 选A按Delete普通删除：A被删除，B自动从7秒移至2秒，变为2～7秒；预期B保持7～12秒，普通删除不自动闭合间隙，本步失败。
4. 请求独立波纹删除B前的0～2秒空隙，应用明确回复不支持，未用普通移动替代；任务后B仍为2～7秒。本例未因该子功能缺失改为通过，普通删除差异保留Failed。

工程：`64a62954-134e-4b57-803a-517d4b422e3f`；会话：`2c3191ef-1505-468d-aa4c-402f40329ce1`；原始本机批次：`erye199-auto-2026-11-13T08-43-24-066Z`。

目标提示词（普通移动/删除为页面操作，无对话提示词；下列仅用于独立波纹步骤）：

```text
只编辑当前工程“ERYE199-012-2026-11-13T08-43-24-066Z”（工程ID：64a62954-134e-4b57-803a-517d4b422e3f），不新建工程、不生成替代视频。执行一次独立的“波纹删除空隙”：仅闭合当前唯一视频片段B（轨道384e990e-709a-4d4d-9e0c-d85ae993cd61，片段9de43eec-7833-4c88-8afa-22286ec4b62a）前方0～2秒的空隙，使B从0秒开始；保留源范围0～5秒、原片ID和片段ID。不用普通移动、普通删除、拼接或生成成片替代波纹删除；如不支持明确说明并保留工程。
```

原run：`run_v2_b08ab3be91f1497fa2b5ca8274358f9c`；状态：done。本轮没有补槽表单，未重发已受理任务。

当前工具接口不支持独立的“波纹删除空隙”，因此无法按你指定的操作闭合B前方0～2秒的空隙。

本次不会提交任何工程修改：不会普通移动或删除B，不会拼接、新建工程或生成替代视频，也不会改动原片ID、片段ID及源范围0～5秒。

现有工作流支持常规视频编辑、口头禅与停顿清理、精彩片段剪辑、按内容推断顺序拼接、烧录已有字幕，但均不能替代本次指定操作，不会执行。

若编辑器界面提供独立的“波纹删除空隙”命令，可在该工程内手动执行；当前接口无法代办。

移动后：

![B7～12秒](evidence-012-rerun-production-20261113/after-move.png)

普通删除后：

![B自动变为2～7秒](evidence-012-rerun-production-20261113/after-delete.png)

其余截图：[after-delete.png](evidence-012-rerun-production-20261113/after-delete.png) · [after-move.png](evidence-012-rerun-production-20261113/after-move.png) · [after-ripple.png](evidence-012-rerun-production-20261113/after-ripple.png) · [agent-terminal.png](evidence-012-rerun-production-20261113/agent-terminal.png) · [before-submit.png](evidence-012-rerun-production-20261113/before-submit.png) · [failure.png](evidence-012-rerun-production-20261113/failure.png) · [ripple-agent-terminal.png](evidence-012-rerun-production-20261113/ripple-agent-terminal.png) · [ripple-before-submit.png](evidence-012-rerun-production-20261113/ripple-before-submit.png)。

[截图及证据SHA256清单](evidence-012-rerun-production-20261113/manifest.json)。本轮未写云效、未推送；012仍未提交云效，既有FWXC-479/485/486/487不改。

<!-- ERYE199-012-YUNXIAO-20261113 -->
012已提交云效[FWXC-491](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=759a901c1536c53599d1fd4e74)：普通删除前段后，后段自动前移5秒，未保留时间线空隙。状态“🤔AI提缺陷”、负责人牛诗晴、生产环境；2张截图上传并嵌入，原片和脱敏JSON共4附件回读核验通过。012保留Failed；011/013/014/015继续为本版本Not Applicable，未提交。
<!-- /ERYE199-012-YUNXIAO-20261113 -->
