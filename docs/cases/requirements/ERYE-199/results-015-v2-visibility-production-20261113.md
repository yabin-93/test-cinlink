# ERYE199-015 优化版v2：轨道图标隐藏/显示与静音/启用

日期：2026-11-13。用户指出“点击时间轨前面的小图标可以隐藏”，并明确“优化015用例，没实现的部分就不要验证”。本次保留015编号，将当前用例范围限定为已实现的轨道隐藏/显示、原声静音/启用、恢复与刷新保持；移除当前步骤中的solo及正式导出隔离。

**结果：新版015 Passed。** 原[Blocked/局部观察](results-011-015-production-20261113.md#erye199-015)和[完整旧版Not Applicable记录](results-version-scope-012-rerun-production-20261113.md)保留；新版通过不代表旧版solo或导出隔离已实现。011/013/014仍为本版本Not Applicable，其他用例不扩大排除。

**前置操作**

生产环境新建专用测试项目、独立会话和工程；1段带原声的原片，视频及关联原声均为0～10秒、1倍速；视频可见、原声启用，已保存并加载，播放头位于非边界2秒。

生产环境app.cinlink.ai，Ego Lite有头TaskSpace7。本次使用全新工程`10642fdb-9a11-4b5b-992c-f183042bb365`、会话`f20665ba-92fc-4022-bab2-3981f5ef5489`，未复用用户旧工程；原始本机批次`erye199-auto-2026-11-13T09-20-46-570Z`。无对话提示词、无Agent/run、无补槽，无computer-use或云效写入。基线保存接口只用于准备，目标步骤均点击真实页面图标。

**逐步操作与预期/实际结果**

| 步骤 | 操作 | 预期与实际 |
|---|---|---|
| 1 | 打开新工程，定位2秒，确认视频/原声轨 | 可见原片，视频可见、原声启用；视频及原声片段0～10秒；基线版本1 |
| 2 | 点击视频时间轨最前方的小图标（视频隐藏） | 预览画面隐藏，按钮变为显示入口，片段仍在；保存版本2，visible=false，视频片段完整内容未改 |
| 3 | 点击原声音轨最前方图标（原声静音） | 静音开关生效并保存，出现启用入口；版本3，muted=true，音频片段完整内容未改 |
| 4 | 刷新重开同一工程 | 隐藏/静音状态保持，时间线片段仍在，完整内容与版本3一致 |
| 5 | 点击同位置的视频显示、原声启用图标 | 恢复可见与启用，保存版本4→5；完整工程内容与初始基线一致 |
| 6 | 再次刷新并定位2秒 | 恢复后的状态保持，可见同一原片画面；内容与初始基线一致 |

本例验证开关、画面隐藏/恢复、保存及恢复，不扩展为音质、导出、solo或帧级定位精度验收。

基线：

![视频可见及原声启用](evidence-015-v2-visibility-production-20261113/visible-audible-baseline.png)

隐藏并静音、刷新后：

![隐藏/静音保持](evidence-015-v2-visibility-production-20261113/hidden-muted-refreshed.png)

恢复显示及启用、刷新后：

![恢复后保持](evidence-015-v2-visibility-production-20261113/restored-refreshed.png)

完整截图：[hidden-muted-refreshed.png](evidence-015-v2-visibility-production-20261113/hidden-muted-refreshed.png) · [hidden-muted.png](evidence-015-v2-visibility-production-20261113/hidden-muted.png) · [hidden.png](evidence-015-v2-visibility-production-20261113/hidden.png) · [restored-refreshed.png](evidence-015-v2-visibility-production-20261113/restored-refreshed.png) · [restored.png](evidence-015-v2-visibility-production-20261113/restored.png) · [visible-audible-baseline.png](evidence-015-v2-visibility-production-20261113/visible-audible-baseline.png)。

[证据SHA256清单](evidence-015-v2-visibility-production-20261113/manifest.json)。脚本已恢复当前015默认执行，仅跑上述已实现步骤：

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 015
```

11项离线检查通过；当前版本范围控制仅排除011/013/014。本次未更改其他用例或既有云效缺陷。
