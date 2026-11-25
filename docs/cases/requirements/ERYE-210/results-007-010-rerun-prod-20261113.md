# ERYE210-007、010 生产复测结果（2026-11-13）

云效已同步：[FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)、[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)；6张截图均已嵌入，12附件回读通过。[同步明细](defects-007-010-production-20261113.md)。

本轮仅执行007和010，使用仓库自动化脚本、有头Google Chrome、生产app.cinlink.ai，串行1 worker、retries=0。每例新建专用项目、独立会话/工程；010在新会话内准备两个独立工程。008的既有Passed及其他用例状态保持。

[当前逐例进度](execution-status-current.md) · [实际核验数据](evidence-007-010-rerun-prod-20261113/execution-evidence.json) · [自动化配置和边界](automation.md)

| 用例 | 本轮结果 | 实际情况 |
|---|---|---|
| [ERYE210-007](#erye210-007) | Failed | Failed；同一工程已选Watermark/Image，收起重开后实际水印，图片子页选中值false；刷新重开后实际字幕。等待页面就绪及恢复断言超时后仍未恢复Watermark/Image；全部保存内容及版本1→1保持。旧voice迁移及清除偏好分支无真实样本，未覆盖。 |
| [ERYE210-010](#erye210-010) | Failed | Failed；U1/D1中PA=Captions、PB=Media，页内双工程分别恢复正确；刷新打开同一PB后实际字幕，等待恢复后仍未回Media。PA/PB全部保存内容和版本均1→1保持。U2/D2无环境，跨账号/设备分支未覆盖。 |



## 执行方式与前置边界

运行：`npm run test:editor:210 -- --grep 'ERYE210-(007|010) '`。这两例是页面导航，无Agent提示词、补槽或生成任务；素材基线只读取当前账号当前环境已有真实资源，再复制到新工程。保存内容/版本是业务结果核验，不把内部实现方式作为验收门槛。

007的旧voice迁移/清除偏好分支缺真实旧样本；010的U2/D2缺第二账号、独立设备。以上分支未执行，不影响已观察到的当前工程视图恢复失败结论，也不宣称完整跨环境验证。

010初批停在脚本前置：新增PB不会替换当前选中的PA。已改用页面真实工程选择器明确进入PB，保持同页PA记忆后执行。后续批次进一步等待面板可交互，使用20秒恢复轮询后截图，不按加载瞬间的默认页判失败。前批原始输出保留在reports/editor-210，非自动重试，不因产品失败修改预期。



<a id="erye210-007"></a>

## ERYE210-007 — Failed

[本轮会话](https://app.cinlink.ai/c/bc5b573b-f459-4dad-9414-689a64898b82)；PA `65f2ca7e-e9f3-43c0-99d0-6cd8b3c23317`。

**前置操作**

1. 生产测试账号登录，新建独立会话及可写PA。
2. PA包含20秒原片、8条英语字幕、已保存文字NAV006和logo-A.png图片水印。
3. 打开Watermark/Image，核对图片子页已选中及工程版本1。

**复现步骤**

1. 选择Watermark→图片水印，保存选择前截图。
2. 点击“收起编辑区”，再从会话普通“视频编辑器”入口重开同一PA。
3. 等待面板可交互，轮询期望的Watermark/Image恢复；实际仍为文字水印，保存截图。
4. 整页刷新，再通过普通入口打开同一PA；等待页面就绪及恢复检查，实际为字幕页，保存截图。
5. 回读全部保存内容和版本，内容相同、版本1→1。

**预期结果**

普通重开和刷新重开同一工程，均恢复本设备已记忆的Watermark/Image；不改工程内容。

**实际结果**

Failed；同一工程已选Watermark/Image，收起重开后实际水印，图片子页选中值false；刷新重开后实际字幕。等待页面就绪及恢复断言超时后仍未恢复Watermark/Image；全部保存内容及版本1→1保持。旧voice迁移及清除偏好分支无真实样本，未覆盖。

**真实页面截图**



![ERYE210-007 实际页面](evidence-007-010-rerun-prod-20261113/007-before-image.png)



![ERYE210-007 实际页面](evidence-007-010-rerun-prod-20261113/007-refreshed.png)



![ERYE210-007 实际页面](evidence-007-010-rerun-prod-20261113/007-reopen.png)



![ERYE210-007 实际页面](evidence-007-010-rerun-prod-20261113/ERYE210-007-failed.png)



<a id="erye210-010"></a>

## ERYE210-010 — Failed

[本轮会话](https://app.cinlink.ai/c/23f1ee0b-7c06-48f5-bd4b-233efc07505b)；PA `3d182b89-eb08-47f3-ba5c-7d901126a54c`；PB `e63b022a-06c2-42a5-8556-116b7cb1824d`。

**前置操作**

1. 生产测试账号U1、当前Chrome设备D1，新建专用会话。
2. 会话内新建独立PA/PB，均含20秒原片及8条字幕，工程ID和标题可区分。
3. PA明确选择Captions；通过工程选择器进入PB后明确选择Media。

**复现步骤**

1. 在PA选择Captions并保存截图。
2. 创建PB后通过真实工程选择器进入PB，选择Media并保存截图。
3. 从工程选择器切回PA，恢复Captions；再切PB，恢复Media，分别截图。
4. 在PB整页刷新，再从普通“视频编辑器”入口打开；核对标题和工程ID仍为PB。
5. 等待面板可交互，轮询恢复Media；实际保持Captions，保存失败截图。
6. 回读PA/PB完整内容和版本，均未变化、版本1→1。

**预期结果**

同账号、同设备的PA/PB分别恢复各自视图；PB刷新后仍为Media，不被PA的Captions或默认位置替代；两工程内容和版本不变。

**实际结果**

Failed；U1/D1中PA=Captions、PB=Media，页内双工程分别恢复正确；刷新打开同一PB后实际字幕，等待恢复后仍未回Media。PA/PB全部保存内容和版本均1→1保持。U2/D2无环境，跨账号/设备分支未覆盖。

**真实页面截图**



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/010-PA-captions.png)



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/010-PA-restored.png)



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/010-PB-after-refresh.png)



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/010-PB-media.png)



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/010-PB-restored.png)



![ERYE210-010 实际页面](evidence-007-010-rerun-prod-20261113/ERYE210-010-failed.png)



随后已按用户要求将两条失败同步为[FWXC-488](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)、[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)，6截图/12附件及正文回读通过；[同步明细](defects-007-010-production-20261113.md)。用例保持Failed。
