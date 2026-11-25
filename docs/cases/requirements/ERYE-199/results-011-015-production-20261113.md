> 后续范围调整：用户确认011/013/014/015本版本不做，当前标Not Applicable，后续再测；本报告的Blocked保留为历史实测。[当前范围与012复测](results-version-scope-012-rerun-production-20261113.md)。

# ERYE-199 011～015生产执行结果

日期：2026-11-13。使用Ego Lite有头浏览器、同一TaskSpace 4；新建专用测试项目及逐例独立会话/工程，串行、零重试，不使用computer-use。先修正非关联音轨基线必填空引用，再定向重新准备011/014/015；第一次准备异常只留历史，不计产品缺陷。

本轮：**0 Passed、1 Failed、4 Blocked**。012普通删除出现确定差异，其余受必要能力缺口阻塞；未将局部观察计整例通过。没有出现需要填写的补槽表单，已受理原任务没有重复提交。本轮未向云效写入。

已接入[仓库脚本](../../../../tools/editor/erye199/cases-011-015.mjs)，命令：

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 011-015
```

7项离线校验通过；[运行说明](automation.md)。完整字幕源映射/解除关联、锁定批量拒绝、同步锁插入与solo正式导出分支尚未通过，需真实能力前置后续跑。

| 用例 | 状态 | 实际结果 |
|---|---|---|
| [ERYE199-011](#erye199-011) | Blocked | 同步锁前置未建立：应用明确不支持独立背景音轨同步锁；没有插片或验证推移，不以原声关联替代。 |
| [ERYE199-012](#erye199-012) | Failed | 移动B到7秒正确；普通删除A后B自动从7秒前移至2秒，未保留空隙；独立波纹删除空隙也明确不支持。 |
| [ERYE199-013](#erye199-013) | Blocked | 应用明确不支持现有视频片段与字幕的真实source-bound源时间绑定；原片/字幕/原声及版本未变，联动目标步骤未执行。 |
| [ERYE199-014](#erye199-014) | Blocked | 应用明确不支持轨道编辑锁，未能建立锁定轨前置；批量移动/删除冲突拒绝及原子性步骤未执行。 |
| [ERYE199-015](#erye199-015) | Blocked | 隐藏画面、原声静音的开关保存与恢复已验证，轨道片段未删除；无法建立solo独听，solo与正式导出隔离未执行。 |

<a id="erye199-011"></a>

## ERYE199-011：Blocked

**前置操作：**新建工程：主视频0～10秒及原声；独立音轨L源0～2秒放6秒，音轨U源2～4秒放8秒；L开启同步锁、U关闭

**目标步骤：**1. 核对L/U独立轨及起点；2. 开启L同步锁并保持U关闭；3. 在主视频5秒插入原片B源0～2秒；4. 比较L/U位置并刷新核对

**预期结果：**仅同步锁L从6秒推至8秒；未锁U保持8秒；不把静音、编辑锁或原声关联当同步锁

**实际结果：**同步锁前置未建立：应用明确不支持独立背景音轨同步锁；没有插片或验证推移，不以原声关联替代。

独立工程：`b092736a-79ba-4668-b717-2e7ef2b70c6e`；会话：`04042153-f7f2-4d53-aa23-6fc9ab11d320`；原始本机批次：`erye199-auto-2026-11-13T08-29-39-866Z`。

**同步锁完整提示词**

```text
只编辑当前工程“ERYE199-011-2026-11-13T08-29-39-866Z”（工程ID：b092736a-79ba-4668-b717-2e7ef2b70c6e），不新建工程、不生成替代视频。仅为独立背景音频轨道8385be41-61f5-4fd6-811d-df6d021bec7a开启“同步锁”，使其在视频中间插入片段时跟随推移；保持背景音频轨道72d19ac9-2e34-449b-9789-965a1b210159同步锁关闭且位置不动。不要把同步锁替换成编辑锁、静音或原声关联。先只设置同步锁，不插入片段。这是测试前置准备；如当前接口或页面不支持，请明确说明并保留工程，不用其他操作替代，不添加假字段。
```

原run：`run_v2_224a3c9141114b038750365dc8f375b8`；状态：done。

当前工具目录没有独立背景音轨“同步锁”的操作或字段，所提供的页面能力列表也未包含该控制。因此，无法为轨道 8385be41-61f5-4fd6-811d-df6d021bec7a 开启同步锁，也无法核验轨道 72d19ac9-2e34-449b-9789-965a1b210159 当前是否关闭同步锁。

本次不安排任何修改：不新建工程、不生成替代视频、不插入片段、不移动轨道，也不以编辑锁、静音或原声关联替代。

现有的视频分析、视频摘要、赘词与停顿清理、精彩片段剪辑、视频音频降噪工作流均不能设置同步锁，本次均不调用。需提供正式的轨道同步锁控制能力后，才能在指定工程内完成这项测试准备。

**本轮截图：** [011-agent-terminal.png](evidence-011-015-production-20261113/011-agent-terminal.png) · [011-before-submit.png](evidence-011-015-production-20261113/011-before-submit.png) · [011-failure.png](evidence-011-015-production-20261113/011-failure.png) · [011-同步锁-agent-terminal.png](evidence-011-015-production-20261113/011-同步锁-agent-terminal.png) · [011-同步锁-before-submit.png](evidence-011-015-production-20261113/011-同步锁-before-submit.png) · [011-同步锁-before.png](evidence-011-015-production-20261113/011-同步锁-before.png)

![ERYE199-011原始阻塞截图](evidence-011-015-production-20261113/011-failure.png)


<a id="erye199-012"></a>

## ERYE199-012：Failed

**前置操作：**新建独立工程；同一视频轨A在0～5秒、B在5～10秒，均取同一原片源0～5秒，1倍速，已保存

**目标步骤：**1. 把B右移2秒至7秒；2. 核对A不动、5～7秒留空；3. 选A按Delete普通删除；4. 核对B仍为7～12秒；5. 独立波纹删除B之前空隙，核对B移至0～5秒

**预期结果：**普通移动/删除默认保留空隙且不改其他片段的源范围；只有独立波纹删除动作闭合间隙

**实际结果：**移动B到7秒正确；普通删除A后B自动从7秒前移至2秒，未保留空隙；独立波纹删除空隙也明确不支持。

独立工程：`6818f306-7401-4942-b570-004158692dc5`；会话：`049caf5c-4bef-4174-b2cb-9e9280761766`；原始本机批次：`erye199-auto-2026-11-13T08-24-43-271Z`。

**ripple完整提示词**

```text
只编辑当前工程“ERYE199-012-2026-11-13T08-24-43-271Z”（工程ID：6818f306-7401-4942-b570-004158692dc5），不新建工程、不生成替代视频。执行一次独立的“波纹删除空隙”：仅闭合当前唯一视频片段B（轨道15d4371e-1483-432c-9206-f66d28426ae7，片段98c84846-09ad-4e87-88d0-c9500f775bf2）前方0～2秒的空隙，使B从0秒开始；保留源范围0～5秒、原片ID和片段ID。不用普通移动、普通删除、拼接或生成成片替代波纹删除；如不支持明确说明并保留工程。
```

原run：`run_v2_241d084619d743578a328001312d6bd4`；状态：done。

当前工具不支持独立的“波纹删除空隙”，因此无法按要求仅闭合片段B前方0～2秒的空隙。

本次不执行任何修改，不会用普通移动、普通删除、拼接或生成成片替代，也不会新建工程。指定工程及片段B的原片ID、片段ID和源范围均不会被本次操作改动。

现有相关工作流包括：去除口头禅与长停顿、高光剪辑、常规裁剪与转码、按内容排序拼接、识别并烧录字幕。这些均不支持所要求的独立操作，本次不会使用。

**本轮截图：** [012-after-delete.png](evidence-011-015-production-20261113/012-after-delete.png) · [012-after-move.png](evidence-011-015-production-20261113/012-after-move.png) · [012-after-ripple.png](evidence-011-015-production-20261113/012-after-ripple.png) · [012-agent-terminal.png](evidence-011-015-production-20261113/012-agent-terminal.png) · [012-before-submit.png](evidence-011-015-production-20261113/012-before-submit.png) · [012-failure.png](evidence-011-015-production-20261113/012-failure.png) · [012-ripple-agent-terminal.png](evidence-011-015-production-20261113/012-ripple-agent-terminal.png) · [012-ripple-before-submit.png](evidence-011-015-production-20261113/012-ripple-before-submit.png)

普通移动后（B7～12秒）：

![移动后](evidence-011-015-production-20261113/012-after-move.png)

普通Delete后（B变为2～7秒）：

![删除后](evidence-011-015-production-20261113/012-after-delete.png)


<a id="erye199-013"></a>

## ERYE199-013：Blocked

**前置操作：**新建独立工程；视频及关联原声源0～10秒，字幕A源1～3秒/B源6～8秒；须建立到该视频片段的真实source-bound关系

**目标步骤：**1. 核实真实源绑定及音视频关联；2. 裁头2秒；3. 在剩余片段相对0.5秒处分割；4. 右半段设2倍速；5. 检查音视频/字幕映射及跨界字幕条目标识，并验证显式解除关联

**预期结果：**关联音视频默认联动且能显式解除；source-bound字幕按源时间映射，跨界按明确策略切分并可识别新条目；固定时间SRT不替代源绑定

**实际结果：**应用明确不支持现有视频片段与字幕的真实source-bound源时间绑定；原片/字幕/原声及版本未变，联动目标步骤未执行。

独立工程：`02454d58-1328-4b72-b705-85e43ec99726`；会话：`be232138-500d-4691-bf53-2fd96b9f9d0d`；原始本机批次：`erye199-auto-2026-11-13T08-24-43-271Z`。

**源绑定字幕完整提示词**

```text
只编辑当前工程“ERYE199-013-2026-11-13T08-24-43-271Z”（工程ID：02454d58-1328-4b72-b705-85e43ec99726），不新建工程、不生成替代视频。为现有视频片段e453b981-9c49-409f-9280-4bd5082197db（轨道3c10f39f-d1ab-457d-a1e6-dad3696d2755，原片文件file_cloud_tr5tonp5hfsyofxcplvjf6skis）及字幕文件file_cloud_vi74nj4kgiqhyobktpehnxq6ig建立真实source-bound源时间绑定；字幕A源1～3秒、字幕B源6～8秒。保留原声轨f6ea09f5-a5cd-46e3-a4df-87306919c5c9与视频关联。字幕必须能随该片段的裁剪/分割/变速映射，不把普通固定时间字幕称为源绑定字幕；先只准备关联，不裁剪、不分割、不变速。这是测试前置准备；如当前接口或页面不支持，请明确说明并保留工程，不用其他操作替代，不添加假字段。
```

原run：`run_v2_432a84666fab46ebac84de3c27b83d3a`；状态：done。

当前提供的接口没有可为该现有片段建立真实 source-bound 字幕源时间绑定的已声明操作；页面公布的能力也未包含此操作。普通字幕文件绑定或固定时间修改，不能等同于您要求的、随片段裁剪／分割／变速映射的源绑定。

因此，本次不会写入字幕A源1～3秒、字幕B源6～8秒的伪绑定，也不会改动工程 02454d58-1328-4b72-b705-85e43ec99726、现有片段、字幕或原声轨关联；不新建工程、不生成替代视频、不执行裁剪、分割或变速。

继续这项准备需要接口明确支持将现有字幕块、视频片段实例及源时间区间关联，并提供后续剪辑映射能力；补传素材不能解决当前接口缺口。

**本轮截图：** [013-agent-terminal.png](evidence-011-015-production-20261113/013-agent-terminal.png) · [013-before-submit.png](evidence-011-015-production-20261113/013-before-submit.png) · [013-failure.png](evidence-011-015-production-20261113/013-failure.png) · [013-源绑定字幕-agent-terminal.png](evidence-011-015-production-20261113/013-源绑定字幕-agent-terminal.png) · [013-源绑定字幕-before-submit.png](evidence-011-015-production-20261113/013-源绑定字幕-before-submit.png) · [013-源绑定字幕-before.png](evidence-011-015-production-20261113/013-源绑定字幕-before.png)

![ERYE199-013原始阻塞截图](evidence-011-015-production-20261113/013-failure.png)


<a id="erye199-014"></a>

## ERYE199-014：Blocked

**前置操作：**新建独立工程；视频轨源0～10秒，另有可编辑独立音轨源0～2秒；视频轨已开启真实编辑锁

**目标步骤：**1. 核实视频轨锁定、音轨未锁；2. 一次批量将两轨对象右移1秒；3. 核对整批拒绝并指出锁定冲突、两轨内容均不变；4. 对同一组合执行批量删除并重复核对

**预期结果：**含锁定轨对象的批量移动/删除均整批拒绝并定位冲突；锁定轨与未锁对象均不发生部分写入

**实际结果：**应用明确不支持轨道编辑锁，未能建立锁定轨前置；批量移动/删除冲突拒绝及原子性步骤未执行。

独立工程：`e1698679-5a94-4187-970c-e9702be0a0fa`；会话：`cdf0ae00-e6ab-4608-ad99-247576994a45`；原始本机批次：`erye199-auto-2026-11-13T08-29-39-866Z`。

**轨道编辑锁完整提示词**

```text
只编辑当前工程“ERYE199-014-2026-11-13T08-29-39-866Z”（工程ID：e1698679-5a94-4187-970c-e9702be0a0fa），不新建工程、不生成替代视频。仅锁定视频轨道2a451ba5-4424-4b4b-90ce-4b9c4cb6347d，禁止其片段512f0797-7967-487d-88e3-be31ca2a9807被移动或删除；保持独立音频轨6e741e51-5897-4083-8dcb-ccda3b7736ba可编辑。这是轨道编辑锁，不是同步锁、隐藏、静音或锁定执行事务。先只设锁，不移动和删除。这是测试前置准备；如当前接口或页面不支持，请明确说明并保留工程，不用其他操作替代，不添加假字段。
```

原run：`run_v2_84b354ca42f24e9aa7ceda8cd53b57ce`；状态：done。

当前提供的接口没有“轨道编辑锁”操作或参数，页面声明的支持能力也未包含该功能，因此无法设置指定视频轨道的禁止移动／删除锁。

本次不执行任何工程修改：保留工程“ERYE199-014-2026-11-13T08-29-39-866Z”，不移动或删除指定片段，不改动独立音频轨，不新建工程、不生成替代视频，也不以同步锁、隐藏、静音或事务锁代替。

现有工作流支持视频剪辑、精彩片段剪辑、填充词与停顿清理、视频降噪和水印添加，但均不能设置轨道编辑锁，本次不会调用。若后续页面或接口提供真正的轨道锁定功能，才能完成这项测试前置准备。

**本轮截图：** [014-agent-terminal.png](evidence-011-015-production-20261113/014-agent-terminal.png) · [014-before-submit.png](evidence-011-015-production-20261113/014-before-submit.png) · [014-failure.png](evidence-011-015-production-20261113/014-failure.png) · [014-轨道编辑锁-agent-terminal.png](evidence-011-015-production-20261113/014-轨道编辑锁-agent-terminal.png) · [014-轨道编辑锁-before-submit.png](evidence-011-015-production-20261113/014-轨道编辑锁-before-submit.png) · [014-轨道编辑锁-before.png](evidence-011-015-production-20261113/014-轨道编辑锁-before.png)

![ERYE199-014原始阻塞截图](evidence-011-015-production-20261113/014-failure.png)


<a id="erye199-015"></a>

## ERYE199-015：Blocked

**前置操作：**新建独立工程；视频/原声源0～10秒，另有不同源区间的独立背景音轨；已保存且加载完成

**目标步骤：**1. 隐藏视频轨并核对内容仍在；2. 静音原声并核对内容仍在；3. 恢复视频可见、原声启用；4. 对原声开启solo监听，保留背景轨保存状态；5. 正式导出并比对成片不继承solo监听排他状态

**预期结果：**隐藏/静音不删除片段且能恢复；solo只影响预览/监听，正式导出按已保存轨道状态处理，不继承solo

**实际结果：**隐藏画面、原声静音的开关保存与恢复已验证，轨道片段未删除；无法建立solo独听，solo与正式导出隔离未执行。

独立工程：`7c0686f2-eaf4-4e35-acc7-b7f4db0fd92f`；会话：`22772d07-462e-48d3-98a2-3bebadd4ba2b`；原始本机批次：`erye199-auto-2026-11-13T08-29-39-866Z`。

**solo完整提示词**

```text
只编辑当前工程“ERYE199-015-2026-11-13T08-29-39-866Z”（工程ID：7c0686f2-eaf4-4e35-acc7-b7f4db0fd92f），不新建工程、不生成替代视频。仅在当前编辑器预览/监听中为原声音轨b4bc784e-b07d-40ca-989f-28fcc18d3e13开启solo独听；不要修改保存的轨道静音/可见性、删除其他轨道或改源文件。solo是仅监听状态，正式导出不能继承。先开启solo并指出可用的页面控制；如当前不支持solo，明确说明并保留工程。
```

原run：`run_v2_ba0212cdf56648a5bf9489e419494646`；状态：done。

当前声明的页面能力和工具接口不包含“仅预览/监听生效”的音轨 Solo，因此无法为原声音轨 b4bc784e-b07d-40ca-989f-28fcc18d3e13 开启独听。

可用的页面控制包括：素材预览、片段移动、片段边缘裁剪、视频批注（含批量）及口头禅/停顿分析。其中，素材预览不等同于时间线音轨 Solo。

本次不安排任何修改：不会改变保存的静音或可见性、删除轨道、改动源文件、新建工程或生成替代视频。指定工程 7c0686f2-eaf4-4e35-acc7-b7f4db0fd92f 保持原状。要执行此操作，需要提供明确不写入工程、也不被正式导出继承的 Solo 监听控制。

**本轮截图：** [015-agent-terminal.png](evidence-011-015-production-20261113/015-agent-terminal.png) · [015-before-submit.png](evidence-011-015-production-20261113/015-before-submit.png) · [015-failure.png](evidence-011-015-production-20261113/015-failure.png) · [015-hidden-muted.png](evidence-011-015-production-20261113/015-hidden-muted.png) · [015-hidden.png](evidence-011-015-production-20261113/015-hidden.png) · [015-restored-before-solo.png](evidence-011-015-production-20261113/015-restored-before-solo.png) · [015-solo-agent-terminal.png](evidence-011-015-production-20261113/015-solo-agent-terminal.png) · [015-solo-before-submit.png](evidence-011-015-production-20261113/015-solo-before-submit.png) · [015-solo-result.png](evidence-011-015-production-20261113/015-solo-result.png) · [015-visible-audible-baseline.png](evidence-011-015-production-20261113/015-visible-audible-baseline.png)

![ERYE199-015原始阻塞截图](evidence-011-015-production-20261113/015-failure.png)

[证据SHA256清单](evidence-011-015-production-20261113/manifest.json)。原片及原始响应仅留本机reports，公开仅包含对应截图、脱敏阶段回复及工程结果；未上传凭据或签名URL。

<!-- ERYE199-012-YUNXIAO-20261113 -->
012已提交云效[FWXC-491](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=759a901c1536c53599d1fd4e74)：普通删除前段后，后段自动前移5秒，未保留时间线空隙。状态“🤔AI提缺陷”、负责人牛诗晴、生产环境；2张截图上传并嵌入，原片和脱敏JSON共4附件回读核验通过。012保留Failed；011/013/014/015继续为本版本Not Applicable，未提交。
<!-- /ERYE199-012-YUNXIAO-20261113 -->
