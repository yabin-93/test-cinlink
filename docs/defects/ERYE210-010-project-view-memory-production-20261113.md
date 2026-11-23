# 【生产环境】【ERYE210-010】双工程分别记忆位置后，PB刷新由Media回到Captions

云效：[FWXC-489](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)；2026-11-13通过官方OpenAPI直接新建，不做历史去重。状态🤔AI提缺陷，负责人牛诗晴，重构10-29，生产环境，优先级高、严重程度2-严重。

前置步骤精简为三条，完整复现步骤及测试边界单列。3张真实对照/失败截图已上传并嵌入，另附原片、字幕、脱敏核验数据，共6个附件。原图SHA-256本地一致；云效正文、字段、附件ID/文件名/字节数及图片引用回读通过。

用例ERYE210-010保持Failed。[本轮复测报告](../cases/requirements/ERYE-210/results-007-010-rerun-prod-20261113.md#erye210-010)。

**现象**

同一账号、同一Chrome设备中，PA停留在 Captions，PB停留在 Media。页内工程切换能分别恢复，但整页刷新当前PB并重开后，PB视图变为 Captions，未恢复其 Media 位置。

**前置步骤**

1. Windows / Google Chrome 登录生产环境 https://app.cinlink.ai，使用同一有编辑权限的测试账号和同一设备。
2. 新建专用项目及独立会话，在该会话内新建两个名称可区分的视频工程PA、PB，均准备附件20秒原片和8条英语字幕并保存。
3. 将PA明确设置为 Captions/字幕、PB明确设置为 Media/媒体，没有待提交编辑或生成任务。

**提示词**

无 Agent 提示词；本例仅切换工程和编辑器入口，不提交生成、清理或剪辑任务，无补槽、无目标run。

**复现步骤**

1. 在新会话打开视频编辑器，通过顶部工程选择器明确选择PA，点击右侧 Captions/字幕。
2. 在同一会话准备PB后，通过真实工程选择器明确选中PB，核对标题为PB，再点击 Media/媒体；不要将“创建了PB”当成“已切到PB”。
3. 打开工程选择器切回PA，确认PA仍选中 Captions/字幕。
4. 再切回PB，确认标题为PB且正确恢复 Media/媒体；保留刷新前截图。
5. 保持PB为当前工程，使用浏览器刷新整页，然后从会话普通“视频编辑器”入口进入。
6. 确认仍打开同一PB，等待面板可交互并观察恢复至少20秒；实际选中 Captions/字幕，而非PB刷新前的Media。
7. 分别核对PA、PB原视频、字幕及保存版本；两工程完整内容均保持，未触发新的内容编辑。

**实际结果**

页内切回PA恢复Captions、切回PB恢复Media，前置对照通过。PB整页刷新重开后，工程标题及ID仍对应PB，但入口为Captions；20秒恢复检查后仍未回Media。

PA/PB完整保存内容均未变化，版本分别保持1→1。未将PA当成PB，也未把切错工程或加载瞬间状态作为失败依据。

**预期结果**

同账号、同设备的不同工程应分别恢复自身已保存的视图位置；PB刷新重开后仍为Media，PA保持Captions，不被另一个工程或默认入口覆盖。恢复视图不应修改媒体内容或推进版本。

**影响**

工程的视图记忆只在当前页面内生效，刷新后失去PB位置；用户无法稳定返回上次编辑模块，多工程操作需要反复手动定位。

**补充**

同步标识：ERYE210-010-PROJECT-VIEW-MEMORY-PROD-20261113-RERUN03

关联需求 ERYE-210 N09、AC02，用例 ERYE210-010。2026-11-13生产Chrome复测，账号1020817070。

会话：https://app.cinlink.ai/c/23f1ee0b-7c06-48f5-bd4b-233efc07505b
PA：3d182b89-eb08-47f3-ba5c-7d901126a54c（ERYE210-010-PA-3d182b89）。
PB：e63b022a-06c2-42a5-8556-116b7cb1824d（ERYE210-010-PB-e63b022a）。

附件包含原片、8条字幕和两工程脱敏核验记录。回归须新建独立会话及两个工程，按步骤分别建立位置，再刷新当前PB。

本条只覆盖同账号U1、同设备D1的双工程刷新恢复；第二账号U2和第二独立设备D2无测试环境，未执行，不据此推断跨账号泄漏或跨设备串用。

**失败截图**

对照一：同账号、同设备页内切回PA，正确恢复Captions/字幕。

![010-PA-captions-restored.png](../cases/requirements/ERYE-210/evidence-007-010-rerun-prod-20261113/010-PA-restored.png)

刷新前对照：再切回PB，已恢复Media/媒体。素材仍在加载，本图仅用于核对工程标题及选中入口，不作为预览质量失败证据。

![010-PB-media-before-refresh.png](../cases/requirements/ERYE-210/evidence-007-010-rerun-prod-20261113/010-PB-restored.png)

失败现场：同一PB刷新重开后变成Captions/字幕，等待20秒仍未恢复Media。

![010-PB-captions-after-refresh.png](../cases/requirements/ERYE-210/evidence-007-010-rerun-prod-20261113/010-PB-after-refresh.png)


## 云效附件清单

| 附件 | 字节数 | 云效附件ID | 本地SHA-256 |
|---|---|---|---|
| 010-PA-captions-restored.png | 146641 | fd92ab0087f15a2761bd6bc34f | `3d98f3754ed4d94fe4ea12f64558b86f4148931a66649be9e697608c95d61884` |
| 010-PB-media-before-refresh.png | 111717 | 69ea373ed55db2e7e7b9e1726d | `918b3cdb93d66986eddfdc9f2b0a095a4d78f4801f7c22bd3743ccb537117d00` |
| 010-PB-captions-after-refresh.png | 508977 | a3beac5206d186a2489858ccdb | `dfaf13702634daa6568a2510bd725e23a6a9fd8334ff16be6681dfcb74c8c70e` |
| E196-A.mp4 | 10274419 | 1bda697c6d1097c9fa248b63f6 | `c453166c6396fe1c427c8a045ad2f84a8f5d4e4ff0f905b47d79114172829d15` |
| E196-source-en.srt | 573 | 77adb6a3515e1c463aa5c7bfc2 | `4d52152ac06ca6be6667e3be97f0f3e3e654d03d4b92f7c97cde5189dff371d4` |
| case-evidence.json | 3715 | e60891b2f619495090e4650ec7 | `30e07f07964807cc87b9aa1823adc52894d8ffa2a204ec3833bc4b4e30b8ad68` |
