> 最新复测：049 v2已按当前发送/停止交互实跑Passed，覆盖排队请求停止、停止后新提交及完成后独立提交，渲染开始后停止未测；见[049实跑报告](results-049-v2-send-stop-production-20261113.md)。下方Not Run为当时修订状态、Blocked为原实测历史。

> 049后续已按用户说明修订为v2：运行中再次点发送执行停止，没有独立失败重试；新版Not Run待复测，见[049 v2说明](revision-049-send-stop-20261113.md)。本文049 Blocked和批次统计保留为历史实测，不代表新定义。

> 后续同步：ERYE199-030已提交云效[FWXC-517](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a8dc2ee87914e60ad64d64254c)，3截图/7附件和正文回读通过；用例保留Failed。[同步记录](defects-030-combined-subtitle-export-production-20261113.md)。下文“无云效写入”描述的是当时执行批次。

# ERYE199-021～049 页面执行记录（不含已删除040）

日期：2026-11-13；阶段：Completed。原请求021～050；用户随后明确删除040、050，现剩28条，编号不复用。当前：**2 Passed、1 Failed、1 Blocked、24 Not Applicable**。

生产环境app.cinlink.ai，Ego Lite有头TaskSpace9；新建专用项目`71793016-cbbf-4e48-be10-b4ce958f33b5`，各独立目标使用新会话/工程。遵用户本轮要求暂不接入自动化：本批全部保持PLAN，脚本及统一运行器编号范围不新增。临时浏览器操作记录留本机忽略目录；没有computer-use、云效写入或代码推送。

以页面、实际保存内容和可用产物验收；当前功能未实现记Not Applicable，外部素材/环境不足记Blocked，已支持操作结果错误才记Failed。依赖项明确引用本轮来源证据，不伪造独立操作或run；局部观察不替代整例通过。

| 用例 | 当前状态 | 实际结果 |
|---|---|---|
| ERYE199-021 | Not Applicable | 生产新工程播放头5秒，位置动画开关、真实关键帧、关闭删通道及撤销恢复均不支持；原工程未改。 |
| ERYE199-022 | Not Applicable | 依赖本轮021确认的真实可编辑参数关键帧缺口；多个关键帧无法建立，源边界拖动和同点替换未执行；没有022独立run。 |
| ERYE199-023 | Not Applicable | 矩形/椭圆/自由路径视频蒙版及独立反选/羽化/扩展/不透明度、布尔运算均不支持，原工程未改；不以视频批注替代。 |
| ERYE199-024 | Not Applicable | 依赖本轮023的可编辑视频蒙版缺口；路径蒙版及关键帧无法建立，拓扑变化/保持插值目标未执行，没有024独立run。 |
| ERYE199-025 | Not Applicable | 高斯模糊/投影/羽化/线性擦除真实片段效果栈、单效果蒙版、启停/复制/排序/重置均不支持；原工程未改。 |
| ERYE199-026 | Not Applicable | 依赖本轮025确认的真实效果栈/排序能力缺口，两个效果无法建立；交换顺序及对应预览/导出对比未执行，没有026独立run。 |
| ERYE199-027 | Not Applicable | 独立Graphic组、组内元素/顺序/组变换及可编辑模板保存不支持；未用字幕或水印替代，原工程保持。 |
| ERYE199-028 | Not Applicable | 全项目字号在真实样式面板改为24并保存，双语基线已可见；段级/仅源轨/双语主副行独立样式不支持，未用全局样式替代通过；任务后文字/时间/配音及基线未改。 |
| ERYE199-029 | Not Applicable | 缺失字体样本已在页面显示原字体名及中英数字Emoji/长姓名，搜索Arial无匹配；专门的缺失检测、替代对照预览/确认/映射记录及字形安全区检查未实现；未跳过预览强制设置，工程未改。 |
| ERYE199-030 | Failed | 页面MP4烧录导出和下载完成，黄色字幕可见，10秒/640×360/48kHz。SRT+ASS/SSA请求失败：Unknown or missing editor fields；另一次仅SRT请求成功并下载，两条原文/时间轴准确且无样式。ASS/SSA明确不支持，保留首次失败，不以随后SRT成功覆盖。 |
| ERYE199-031 | Not Applicable | 切点两侧余量足够的两段基线已建立；当前不支持工程内可编辑转场对象，6类类型/时长/对齐核验未执行；未生成拼接视频或用淡入淡出替代。 |
| ERYE199-032 | Not Applicable | 依赖本轮031的真实可编辑转场缺口；无法建立不足余量的转场提交，提示可用时长/缩短及重复帧检查未执行，没有032独立run。 |
| ERYE199-033 | Not Applicable | 独立音轨两段相邻、原视频原声静音的基线已准备；恒定增益/恒定功率/指数可编辑音频转场、曲线/独立时长和专属删除均不支持，未生成混音替代。 |
| ERYE199-034 | Not Applicable | 本轮新工程已准备原片/原声/固定字幕；源时间绑定字幕不支持，0.1/8倍超当前工程0.25～4倍范围，保持音高/起点或时长策略及波纹冲突控制不完整。未绕过前置执行0.3178倍，原工程未改。 |
| ERYE199-035 | Not Applicable | SDR源与.cube样本已准备；本轮页面功能入口及Agent不提供LUT导入/持久化和工程内可编辑调色，文件级调色未作替代；未加载LUT/重开验证，工程未改。 |
| ERYE199-036 | Passed | 按需求允许的“明确拒绝HDR处理”分支通过：真实PQ/BT2020/10bit样本已登记并打开，应用明确拒绝调色/导出且解释无法保证正确转换；无输出、原工程未改。仅拒绝分支通过，不代表已支持或验证HDR→SDR转换质量。 |
| ERYE199-037 | Not Applicable | 当前不支持真实调整层、曝光EV/高斯模糊和视频效果蒙版，2～6秒调整层未建立，1/3/7秒对照及导出检查未执行；未用可见色块或水印替代。 |
| ERYE199-038 | Not Applicable | 本轮035同场核验：当前页面无可用调色/示波器入口，Agent明确无波形/矢量示波器打开或读取能力；未展示实时变化；复用035证据，无038独立run。 |
| ERYE199-039 | Not Applicable | 真实绿幕人物及下层不同背景已准备；当前无可编辑色度抠像、alpha输出/三视图和边缘/垃圾蒙版控制，参数调整及边缘质量目标未执行，原工程未改。 |
| ERYE199-041 | Not Applicable | 已用独立已知抖动的真实人物源准备6秒新工程；当前无工程内稳定模式、后台分析/取消/失败保留/源范围缓存失效流程，未运行稳定或注入失败，原片段未改。 |
| ERYE199-042 | Not Applicable | 对白+音乐新工程，真实拖动片段音量至58%，音乐保持30%；原声静音/恢复操作有效。独立轨级dB推子、声像、solo、真实音量关键帧及实时电平表不支持，不以片段音量/静音代替完整混音通过。 |
| ERYE199-043 | Passed | 按原前置单/立体声主场景通过：48kHz单声道与44.1kHz立体声在同一新工程导出为48kHz双声道AAC；实测前段L/R相关0.9999999，后段L440/R880分别保留，源引用/原采样信息保持。附加5.1仅查询、未放入时间线，端到端支持未验证，不计多声道通过。 |
| ERYE199-044 | Not Applicable | 当前无工程内可编辑音频效果链、排序、参数EQ/独立半音音分/真峰值限幅及处理延迟控制；效果前置无法建立，时长/同步目标未执行。未以文件级降噪或变速替代，原工程未改。 |
| ERYE199-045 | Not Applicable | 对白和独立音乐已准备；当前无侧链自动压低、可见可编辑包络/手动点保护，导出也无LUFS归一化及dBTP限幅配置。未执行固定音量或混音文件替代，原工程未改。 |
| ERYE199-046 | Not Applicable | 13秒音乐源/10秒目标/保护区间4～6秒已给齐；当前不支持结构分析后生成两个可审阅候选、保护映射校验及工程内单步可撤销替换，未以普通拼接/变速替代，原曲和工程未改。 |
| ERYE199-047 | Not Applicable | 依赖本轮025可编辑效果栈和027独立图形组缺口，无法准备“效果+字幕+图形”的完整工程；三种预览/导出同帧一致性目标未执行。030普通字幕预览/导出局部观察不替代本例通过。 |
| ERYE199-048 | Not Applicable | 已检查当前预览控件；真实代理/320×180预览质量切换及状态/未渲染效果标识未提供，代理前置无法建立，未用浏览器缩放或普通导出替代验证，工程未改。 |
| ERYE199-049 | Blocked | 页面原生20秒导出已启动并完成产物回执；运行时未见导出取消/重试入口。通用取消工具是否适用于正式导出仍未确认，未建立可取消任务前置；取消/重试/第二次重复提交及两份产物冲突检查未执行。不直接判功能不存在，也不计普通导出为整例通过。 |

<a id="erye199-021"></a>

## ERYE199-021：Not Applicable

**前置操作：**参数未启用动画，播放头在 5 秒

**目标步骤与预期：**启用动画 → 改值 → 关闭动画 → 撤销；启用时在源时间建当前值；关闭保留当前值并删通道；一次撤销恢复

**本轮实际：**生产新工程播放头5秒，位置动画开关、真实关键帧、关闭删通道及撤销恢复均不支持；原工程未改。

工程`1306d31c-8b17-4fd6-9870-b30cd5a21e49`；会话`3e83a493-7900-4338-a077-8a4b74eedb60`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-021-manual-2026-11-13T10-37-48-153Z”（工程ID：1306d31c-8b17-4fd6-9870-b30cd5a21e49），不新建工程、不生成替代视频。仅对当前视频片段验证真实可编辑参数动画：当前播放头为5秒，位置初始中心(320,180)且未启用动画。请启用位置动画，在源5秒建立当前值关键帧，再将该点位置改为(400,200)，关闭位置动画时保留播放头当前值并删除整条动画通道，最后一次撤销恢复该动画通道和原关键帧。需要真实关键帧和动画开关，不用静态变换、水印、生成成片或淡入淡出替代。若当前不支持，明确指出未执行的步骤，保留原工程、原片和原声、0～10秒源范围及速度，不添加假字段。
```

原任务`run_v2_47942d0077374095af1c8ad63b51e3b0`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/021-probe-summary.json)。

**截图**

[021-agent-terminal.png](evidence-021-049-manual-production-20261113/021-agent-terminal.png) · [021-baseline.png](evidence-021-049-manual-production-20261113/021-baseline.png) · [021-before-submit.png](evidence-021-049-manual-production-20261113/021-before-submit.png) · [021-selection-observation.png](evidence-021-049-manual-production-20261113/021-selection-observation.png)

![ERYE199-021 实际页面](evidence-021-049-manual-production-20261113/021-agent-terminal.png)

<a id="erye199-022"></a>

## ERYE199-022：Not Applicable

**前置操作：**已有多个关键帧

**目标步骤与预期：**拖动越过源边界 → 在同一时间点再建关键帧；不越界；重复时间点替换而非叠加

**本轮实际：**依赖本轮021确认的真实可编辑参数关键帧缺口；多个关键帧无法建立，源边界拖动和同点替换未执行；没有022独立run。

工程`1306d31c-8b17-4fd6-9870-b30cd5a21e49`；会话`3e83a493-7900-4338-a077-8a4b74eedb60`。

本例未独立提交目标任务，复用本轮ERYE199-021前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-021-manual-2026-11-13T10-37-48-153Z”（工程ID：1306d31c-8b17-4fd6-9870-b30cd5a21e49），不新建工程、不生成替代视频。仅对当前视频片段验证真实可编辑参数动画：当前播放头为5秒，位置初始中心(320,180)且未启用动画。请启用位置动画，在源5秒建立当前值关键帧，再将该点位置改为(400,200)，关闭位置动画时保留播放头当前值并删除整条动画通道，最后一次撤销恢复该动画通道和原关键帧。需要真实关键帧和动画开关，不用静态变换、水印、生成成片或淡入淡出替代。若当前不支持，明确指出未执行的步骤，保留原工程、原片和原声、0～10秒源范围及速度，不添加假字段。
```

原任务`run_v2_47942d0077374095af1c8ad63b51e3b0`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/021-probe-summary.json)。

**截图**

[021-agent-terminal.png](evidence-021-049-manual-production-20261113/021-agent-terminal.png) · [021-baseline.png](evidence-021-049-manual-production-20261113/021-baseline.png) · [021-before-submit.png](evidence-021-049-manual-production-20261113/021-before-submit.png) · [021-selection-observation.png](evidence-021-049-manual-production-20261113/021-selection-observation.png)

![ERYE199-022 前置来源021](evidence-021-049-manual-production-20261113/021-agent-terminal.png)

<a id="erye199-023"></a>

## ERYE199-023：Not Applicable

**前置操作：**片段已加矩形/椭圆/自由路径蒙版

**目标步骤与预期：**调位置/反选/羽化/扩展/不透明度 → 多蒙版做加/减/交；参数生效；布尔顺序固定且可见

**本轮实际：**矩形/椭圆/自由路径视频蒙版及独立反选/羽化/扩展/不透明度、布尔运算均不支持，原工程未改；不以视频批注替代。

工程`d337368f-3b92-4385-9135-ff5003791ddf`；会话`c7c646fb-150f-4237-8ed7-35435f5c3d40`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-023-manual-2026-11-13T10-37-48-153Z”（工程ID：d337368f-3b92-4385-9135-ff5003791ddf），不新建工程、不生成替代视频。仅在当前原视频片段上执行真实可继续编辑的局部蒙版测试：先建立矩形蒙版范围x80/y60/宽320/高180、椭圆蒙版中心(320,180)/半径(120,80)和闭合自由路径三角形(100,100)-(400,100)-(250,280)，坐标按原视频局部像素。先记录初始显示，再把矩形向右移20像素、开启反选、羽化10像素、扩展5像素、不透明度70%；将多个蒙版依次执行加、减、交并展示固定布尔顺序和画面。保留原片引用、0～10秒、1倍速及关联原声，不生成抠像视频、水印或图片替代，不伪造字段。如当前无法建立真实可编辑蒙版，说明具体不支持项并保留工程，不执行替代方案。
```

原任务`run_v2_ff51539d2d9040ecb0b4501d49aafc89`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/023-probe-summary.json)。

**截图**

[023-agent-terminal.png](evidence-021-049-manual-production-20261113/023-agent-terminal.png) · [023-baseline.png](evidence-021-049-manual-production-20261113/023-baseline.png) · [023-before-submit.png](evidence-021-049-manual-production-20261113/023-before-submit.png)

![ERYE199-023 实际页面](evidence-021-049-manual-production-20261113/023-agent-terminal.png)

<a id="erye199-024"></a>

## ERYE199-024：Not Applicable

**前置操作：**蒙版路径有关键帧

**目标步骤与预期：**改路径拓扑；拓扑变化不直接插值；提示改保持或新建蒙版；路径关键帧可播放

**本轮实际：**依赖本轮023的可编辑视频蒙版缺口；路径蒙版及关键帧无法建立，拓扑变化/保持插值目标未执行，没有024独立run。

工程`d337368f-3b92-4385-9135-ff5003791ddf`；会话`c7c646fb-150f-4237-8ed7-35435f5c3d40`。

本例未独立提交目标任务，复用本轮ERYE199-023前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-023-manual-2026-11-13T10-37-48-153Z”（工程ID：d337368f-3b92-4385-9135-ff5003791ddf），不新建工程、不生成替代视频。仅在当前原视频片段上执行真实可继续编辑的局部蒙版测试：先建立矩形蒙版范围x80/y60/宽320/高180、椭圆蒙版中心(320,180)/半径(120,80)和闭合自由路径三角形(100,100)-(400,100)-(250,280)，坐标按原视频局部像素。先记录初始显示，再把矩形向右移20像素、开启反选、羽化10像素、扩展5像素、不透明度70%；将多个蒙版依次执行加、减、交并展示固定布尔顺序和画面。保留原片引用、0～10秒、1倍速及关联原声，不生成抠像视频、水印或图片替代，不伪造字段。如当前无法建立真实可编辑蒙版，说明具体不支持项并保留工程，不执行替代方案。
```

原任务`run_v2_ff51539d2d9040ecb0b4501d49aafc89`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/023-probe-summary.json)。

**截图**

[023-agent-terminal.png](evidence-021-049-manual-production-20261113/023-agent-terminal.png) · [023-baseline.png](evidence-021-049-manual-production-20261113/023-baseline.png) · [023-before-submit.png](evidence-021-049-manual-production-20261113/023-before-submit.png)

![ERYE199-024 前置来源023](evidence-021-049-manual-production-20261113/023-agent-terminal.png)

<a id="erye199-025"></a>

## ERYE199-025：Not Applicable

**前置操作：**片段可加效果

**目标步骤与预期：**加高斯模糊/投影/羽化边缘/线性擦除 → 加局部蒙版 → 启用/旁路/复制/排序/重置；参数正确；蒙版只作用于该效果；顺序与开关可保存

**本轮实际：**高斯模糊/投影/羽化/线性擦除真实片段效果栈、单效果蒙版、启停/复制/排序/重置均不支持；原工程未改。

工程`7c80a8e2-44a5-49cf-8a04-9a5b8d42d942`；会话`24035a58-e86f-472f-b604-33cec7c7d259`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-025-manual-2026-11-13T10-37-48-153Z”（工程ID：7c80a8e2-44a5-49cf-8a04-9a5b8d42d942），不新建工程、不生成替代视频。仅在当前原视频片段建立真实可继续编辑的片段效果栈：高斯模糊半径10像素、投影黑色/不透明度50%/偏移(8,8)/模糊5像素、羽化边缘10像素、线性擦除从左到右进度50%/边缘羽化5像素。给高斯模糊加局部矩形蒙版(80,60,320,180)，蒙版仅作用于该效果。先按以上顺序应用，再依次旁路/启用高斯模糊、复制高斯模糊、将复制项移到栈末尾、重置复制项；每步保留可见效果与可编辑参数。不要用生成视频、烘焙成片、水印、转场或图像编辑替代真实效果栈，保留原片/原声/0～10秒/1倍速。如当前不支持，请逐项说明并保留工程，不创建假字段或替代任务。
```

原任务`run_v2_cbf7281971e64c68b83a08d3f685c74a`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/025-probe-summary.json)。

**截图**

[025-agent-terminal.png](evidence-021-049-manual-production-20261113/025-agent-terminal.png) · [025-baseline.png](evidence-021-049-manual-production-20261113/025-baseline.png) · [025-before-submit.png](evidence-021-049-manual-production-20261113/025-before-submit.png)

![ERYE199-025 实际页面](evidence-021-049-manual-production-20261113/025-agent-terminal.png)

<a id="erye199-026"></a>

## ERYE199-026：Not Applicable

**前置操作：**两个效果顺序可调

**目标步骤与预期：**交换顺序 → 预览 → 导出；结果随顺序变化并即时预览；预览/导出一致；字幕图形按 z-order 合成

**本轮实际：**依赖本轮025确认的真实效果栈/排序能力缺口，两个效果无法建立；交换顺序及对应预览/导出对比未执行，没有026独立run。

工程`7c80a8e2-44a5-49cf-8a04-9a5b8d42d942`；会话`24035a58-e86f-472f-b604-33cec7c7d259`。

本例未独立提交目标任务，复用本轮ERYE199-025前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-025-manual-2026-11-13T10-37-48-153Z”（工程ID：7c80a8e2-44a5-49cf-8a04-9a5b8d42d942），不新建工程、不生成替代视频。仅在当前原视频片段建立真实可继续编辑的片段效果栈：高斯模糊半径10像素、投影黑色/不透明度50%/偏移(8,8)/模糊5像素、羽化边缘10像素、线性擦除从左到右进度50%/边缘羽化5像素。给高斯模糊加局部矩形蒙版(80,60,320,180)，蒙版仅作用于该效果。先按以上顺序应用，再依次旁路/启用高斯模糊、复制高斯模糊、将复制项移到栈末尾、重置复制项；每步保留可见效果与可编辑参数。不要用生成视频、烘焙成片、水印、转场或图像编辑替代真实效果栈，保留原片/原声/0～10秒/1倍速。如当前不支持，请逐项说明并保留工程，不创建假字段或替代任务。
```

原任务`run_v2_cbf7281971e64c68b83a08d3f685c74a`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/025-probe-summary.json)。

**截图**

[025-agent-terminal.png](evidence-021-049-manual-production-20261113/025-agent-terminal.png) · [025-baseline.png](evidence-021-049-manual-production-20261113/025-baseline.png) · [025-before-submit.png](evidence-021-049-manual-production-20261113/025-before-submit.png)

![ERYE199-026 前置来源025](evidence-021-049-manual-production-20261113/025-agent-terminal.png)

<a id="erye199-027"></a>

## ERYE199-027：Not Applicable

**前置操作：**图形工具可用

**目标步骤与预期：**创建含多文字/矩形/椭圆/图片的图形 → 改字体/字号/行距/对齐/填充/描边/阴影/顺序/组变换；元素独立可编辑；组级变换生效；三类模板可复用且为可编辑对象

**本轮实际：**独立Graphic组、组内元素/顺序/组变换及可编辑模板保存不支持；未用字幕或水印替代，原工程保持。

工程`7b8394f0-bb0c-480c-8c02-aaf341fc0db8`；会话`d01a1586-b3a1-468e-b187-dcb023e4f029`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-027-manual-2026-11-13T10-37-48-153Z”（工程ID：7b8394f0-bb0c-480c-8c02-aaf341fc0db8），不新建工程、不生成替代视频。仅在当前工程建立一个可继续编辑的独立图形Graphic组，时间线1～4秒，包含两个文字元素“E199 Title”和“Subtitle line”、一个蓝色矩形、一个黄色椭圆及当前已登记图片。文字用Arial，标题字号32、副标题20、行距1.2、居中对齐、白色填充/黑色2像素描边/黑色50%阴影偏移(2,2)。调整内部顺序使文字在形状上方，图片在矩形上方，再把组中心设(320,180)、等比缩放80%、旋转10度。保存为可复用且各元素独立可编辑的标题条/姓名条/标注卡三类模板。不要用文字水印、图片水印、SRT字幕或烘焙图片/生成视频替代独立图形组。原视频、原声、源0～10秒和速度保持。如当前不支持，明确说明，保留工程，不执行替代生成任务。
```

原任务`run_v2_2d6fea6a620a4f3693599679f7ce6851`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/027-probe-summary.json)。

**截图**

[027-agent-terminal.png](evidence-021-049-manual-production-20261113/027-agent-terminal.png) · [027-baseline.png](evidence-021-049-manual-production-20261113/027-baseline.png) · [027-before-submit.png](evidence-021-049-manual-production-20261113/027-before-submit.png)

![ERYE199-027 实际页面](evidence-021-049-manual-production-20261113/027-agent-terminal.png)

<a id="erye199-028"></a>

## ERYE199-028：Not Applicable

**前置操作：**已有转写字幕与双语字幕

**目标步骤与预期：**改段级样式 → 应用到整轨/全项目 → 改主副行样式；作用范围正确；双语可分别配置；不修改配音文案、不重新生成音频

**本轮实际：**全项目字号在真实样式面板改为24并保存，双语基线已可见；段级/仅源轨/双语主副行独立样式不支持，未用全局样式替代通过；任务后文字/时间/配音及基线未改。

工程`890b60bb-04f0-4877-a316-271da07a53d0`；会话`f115e94b-35f4-4c0e-828f-220e1addd0d8`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-028-manual-2026-11-13T10-37-48-153Z”（工程ID：890b60bb-04f0-4877-a316-271da07a53d0），不新建工程、不生成替代视频。当前已准备源英语和中文译文两条字幕轨，各有A(1～3秒)和B(6～8秒)，页面全项目字号已改24。请先仅把源字幕A设为字号26/黄色，确保源字幕B和译文A/B仍字号24且保持原色；再将这一段样式应用到整条源字幕轨，译文不跟随；最后为双语主行设字号26/黄色、副行设字号20/青色，分别保存并提供当前作用范围。原字幕文字与起止时间、原片和原声、配音文案均保持，不重新生成音频。需要真实段级/轨道级和主副行独立样式，不以全项目统一样式冒充；如不支持这些作用范围，请明确列出并保留刚才已保存的全项目24号基线，不改为统一26号。
```

原任务`run_v2_3133b58fc6fa4a74a2fcc946332b8603`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/028-probe-summary.json)。

**截图**

[028-agent-terminal.png](evidence-021-049-manual-production-20261113/028-agent-terminal.png) · [028-baseline.png](evidence-021-049-manual-production-20261113/028-baseline.png) · [028-before-submit.png](evidence-021-049-manual-production-20261113/028-before-submit.png) · [028-bilingual-baseline.png](evidence-021-049-manual-production-20261113/028-bilingual-baseline.png) · [028-global-font24.png](evidence-021-049-manual-production-20261113/028-global-font24.png) · [028-style-entry-observation.png](evidence-021-049-manual-production-20261113/028-style-entry-observation.png) · [028-style-panel-visible.png](evidence-021-049-manual-production-20261113/028-style-panel-visible.png)

![ERYE199-028 实际页面](evidence-021-049-manual-production-20261113/028-agent-terminal.png)

<a id="erye199-029"></a>

## ERYE199-029：Not Applicable

**前置操作：**字幕使用缺失字体，含中文/英文/数字/Emoji/长姓名

**目标步骤与预期：**打开字幕 → 选择替代字体；显示原字体名与替代预览；替代需用户选择并记录；换行/超安全区/缺字可见

**本轮实际：**缺失字体样本已在页面显示原字体名及中英数字Emoji/长姓名，搜索Arial无匹配；专门的缺失检测、替代对照预览/确认/映射记录及字形安全区检查未实现；未跳过预览强制设置，工程未改。

工程`cb9d357c-53eb-40a5-907f-961c568ac197`；会话`b88abc41-60fa-4617-ac17-88503894b6aa`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-029-manual-2026-11-13T10-37-48-153Z”（工程ID：cb9d357c-53eb-40a5-907f-961c568ac197），不新建工程、不生成替代视频。本工程字幕原字体为缺失的“E199 Missing Font 20261113”，包含中文、English、数字123、Emoji😀与长姓名。页面字体列表搜索Arial无匹配；我现在明确选择Arial作为替代。请按缺失字体替代流程先展示原字体和Arial替代预览，再确认使用Arial，保留原字体→替代字体的用户选择记录，并检查换行、超安全区和缺字是否可见。仅改字体，不改原字幕文字/起止时间/原片/原声，不重新生成音频或视频；如果当前只有全局字体设置而没有缺失字体检测、替代预览或映射记录，请明确说明哪些步骤实际可执行，不能把浏览器自动回退字体或无记录设置声称为完整替代流程。
```

原任务`run_v2_004e1c2084334f29b36680e97a5ac277`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/029-probe-summary.json)。

**截图**

[029-agent-terminal.png](evidence-021-049-manual-production-20261113/029-agent-terminal.png) · [029-baseline.png](evidence-021-049-manual-production-20261113/029-baseline.png) · [029-before-submit.png](evidence-021-049-manual-production-20261113/029-before-submit.png) · [029-missing-font-baseline.png](evidence-021-049-manual-production-20261113/029-missing-font-baseline.png) · [029-missing-font-search-arial.png](evidence-021-049-manual-production-20261113/029-missing-font-search-arial.png)

![ERYE199-029 实际页面](evidence-021-049-manual-production-20261113/029-agent-terminal.png)

<a id="erye199-030"></a>

## ERYE199-030：Failed

**前置操作：**字幕含样式

**目标步骤与预期：**分别烧录导出 → 导出 SRT → 导出支持的样式字幕；三者独立；SRT 不携带完整图形样式；烧录结果与预览一致

**本轮实际：**页面MP4烧录导出和下载完成，黄色字幕可见，10秒/640×360/48kHz。SRT+ASS/SSA请求失败：Unknown or missing editor fields；另一次仅SRT请求成功并下载，两条原文/时间轴准确且无样式。ASS/SSA明确不支持，保留首次失败，不以随后SRT成功覆盖。

工程`d327db38-aeb7-4cf6-8368-931eda479500`；会话`52eba378-bc0c-4631-a044-fe7fa94efaf1`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-030-manual-2026-11-13T10-37-48-153Z”（工程ID：d327db38-aeb7-4cf6-8368-931eda479500），不新建工程、不生成替代视频。当前工程有已保存黄色24号样式的英语字幕A(1～3秒)和B(6～8秒)，MP4烧录版已通过页面导出并下载。本轮仅导出这两条现有字幕：请另交付一个UTF-8 SRT，保持原文/时间轴且不携带字体颜色等图形样式；再交付应用当前字号24、黄色和描边样式的ASS或SSA字幕文件。两个字幕导出与已完成的MP4独立，不重新转写/翻译、不重新烧录或生成视频、不修改工程/原片/原声。如果当前只支持SRT而不支持ASS/SSA，仍先导出真实SRT，再明确说明样式字幕格式未实现，不把SRT改扩展名冒充样式字幕。
```

原任务`run_v2_ca708304203e46b9bf5ac958ea3267a8`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/030-probe-summary.json)。

**分格式补充核验提示词（独立请求，不覆盖前次失败）**

```text
只编辑当前工程“ERYE199-030-manual-2026-11-13T10-37-48-153Z”（工程ID：d327db38-aeb7-4cf6-8368-931eda479500），不新建工程、不生成替代视频。上一条SRT加ASS/SSA的请求已失败，本次仅独立导出现有字幕文件file_cloud_vi74nj4kgiqhyobktpehnxq6ig为UTF-8 SRT，源角色英语，A为1～3秒“E199 Source Caption A”，B为6～8秒“E199 Source Caption B”。请只执行已有字幕导出，不创建字幕、不翻译、不烧录、不生成视频或音频、不修改工程。SRT仅保留原文和时间轴，不带样式。不要执行ASS/SSA导出；如果该样式格式不支持，单独明确说明即可。
```

补充原任务`run_v2_cb6a4f09cdfa4f5ebb401dd7c9bbf127`。

[实际下载产物 burned-subtitles.mp4](evidence-021-049-manual-production-20261113/030-burned-subtitles.mp4)。

[实际下载产物 exported-source.srt](evidence-021-049-manual-production-20261113/030-exported-source.srt)。

**页面操作记录：**

1. 准备黄色24号字幕A1～3秒/B6～8秒的新工程，2秒保存预览

2. 点击页面导出，等待已完成后下载视频

3. 请求独立SRT及ASS/SSA，原任务failed并保留Unknown or missing editor fields截图

4. 另发仅SRT的分格式验证请求，任务done，滚动到结果卡后点击文件名下载

5. 解码MP4及检查SRT原文/时间轴；ASS/SSA未实现，不重复原失败请求

**截图**

[030-agent-terminal.png](evidence-021-049-manual-production-20261113/030-agent-terminal.png) · [030-baseline.png](evidence-021-049-manual-production-20261113/030-baseline.png) · [030-before-submit.png](evidence-021-049-manual-production-20261113/030-before-submit.png) · [030-export-frame2.png](evidence-021-049-manual-production-20261113/030-export-frame2.png) · [030-export-observation.png](evidence-021-049-manual-production-20261113/030-export-observation.png) · [030-export-options.png](evidence-021-049-manual-production-20261113/030-export-options.png) · [030-formats-request-failure.png](evidence-021-049-manual-production-20261113/030-formats-request-failure.png) · [030-srt-download-outcome.png](evidence-021-049-manual-production-20261113/030-srt-download-outcome.png) · [030-srt-result-observation.png](evidence-021-049-manual-production-20261113/030-srt-result-observation.png) · [030-srt-visible-position.png](evidence-021-049-manual-production-20261113/030-srt-visible-position.png) · [030-styled-preview.png](evidence-021-049-manual-production-20261113/030-styled-preview.png)

![ERYE199-030 实际页面](evidence-021-049-manual-production-20261113/030-srt-result-observation.png)

<a id="erye199-031"></a>

## ERYE199-031：Not Applicable

**前置操作：**两片段相邻

**目标步骤与预期：**加交叉溶解/黑场/白场/左右擦除/线性擦除 → 调时长与对齐；类型与时长生效；对齐切点/首尾正确；两侧余量足够

**本轮实际：**切点两侧余量足够的两段基线已建立；当前不支持工程内可编辑转场对象，6类类型/时长/对齐核验未执行；未生成拼接视频或用淡入淡出替代。

工程`1ab50323-f5ec-4682-80b0-9c867c3e3abe`；会话`49d49b13-c09d-40b8-8517-7b8cced98650`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-031-manual-2026-11-13T10-37-48-153Z”（工程ID：1ab50323-f5ec-4682-80b0-9c867c3e3abe），不新建工程、不生成替代视频。当前同视频轨两段相邻：A源1～6秒/时间线0～5秒，B源1～6秒/时间线5～10秒，原片均10秒、切点两侧余量足够，关联原声同时间。请在5秒切点先添加1秒交叉溶解且以切点居中，再依次换为黑场、白场、向左擦除、向右擦除、线性擦除，各设0.5秒并分别核验切点居中/从切点开始/到切点结束的对齐方式。要求为当前工程真实可继续编辑的转场对象，类型/时长/对齐可读、预览可见，不能以片段淡入淡出、生成拼接视频或烘焙结果替代。每种替换前记录上一步结果，原片/原声/范围/时长保持；如当前不支持真实可编辑转场，明确说明并保留工程，不提交替代生成任务。
```

原任务`run_v2_5791a43f7bfd41f185fcc25b5848ffe8`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/031-probe-summary.json)。

**截图**

[031-agent-terminal.png](evidence-021-049-manual-production-20261113/031-agent-terminal.png) · [031-baseline.png](evidence-021-049-manual-production-20261113/031-baseline.png) · [031-before-submit.png](evidence-021-049-manual-production-20261113/031-before-submit.png)

![ERYE199-031 实际页面](evidence-021-049-manual-production-20261113/031-agent-terminal.png)

<a id="erye199-032"></a>

## ERYE199-032：Not Applicable

**前置操作：**转场两侧余量不足

**目标步骤与预期：**在余量不足处添加转场 → 查看提示与可用时长；提示可用时长并提供缩短；不自动重复帧掩盖

**本轮实际：**依赖本轮031的真实可编辑转场缺口；无法建立不足余量的转场提交，提示可用时长/缩短及重复帧检查未执行，没有032独立run。

工程`1ab50323-f5ec-4682-80b0-9c867c3e3abe`；会话`49d49b13-c09d-40b8-8517-7b8cced98650`。

本例未独立提交目标任务，复用本轮ERYE199-031前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-031-manual-2026-11-13T10-37-48-153Z”（工程ID：1ab50323-f5ec-4682-80b0-9c867c3e3abe），不新建工程、不生成替代视频。当前同视频轨两段相邻：A源1～6秒/时间线0～5秒，B源1～6秒/时间线5～10秒，原片均10秒、切点两侧余量足够，关联原声同时间。请在5秒切点先添加1秒交叉溶解且以切点居中，再依次换为黑场、白场、向左擦除、向右擦除、线性擦除，各设0.5秒并分别核验切点居中/从切点开始/到切点结束的对齐方式。要求为当前工程真实可继续编辑的转场对象，类型/时长/对齐可读、预览可见，不能以片段淡入淡出、生成拼接视频或烘焙结果替代。每种替换前记录上一步结果，原片/原声/范围/时长保持；如当前不支持真实可编辑转场，明确说明并保留工程，不提交替代生成任务。
```

原任务`run_v2_5791a43f7bfd41f185fcc25b5848ffe8`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/031-probe-summary.json)。

**截图**

[031-agent-terminal.png](evidence-021-049-manual-production-20261113/031-agent-terminal.png) · [031-baseline.png](evidence-021-049-manual-production-20261113/031-baseline.png) · [031-before-submit.png](evidence-021-049-manual-production-20261113/031-before-submit.png)

![ERYE199-032 前置来源031](evidence-021-049-manual-production-20261113/031-agent-terminal.png)

<a id="erye199-033"></a>

## ERYE199-033：Not Applicable

**前置操作：**音频转场可用

**目标步骤与预期：**设恒定增益/恒定功率/指数淡化；恒定功率按 sin/cos 曲线，中点可验证；视频/音频转场可独立删除或改时长

**本轮实际：**独立音轨两段相邻、原视频原声静音的基线已准备；恒定增益/恒定功率/指数可编辑音频转场、曲线/独立时长和专属删除均不支持，未生成混音替代。

工程`2b487769-352e-4548-a766-6c47ca2274e4`；会话`3aae6e7e-45ab-437e-847f-8bbf106101ee`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-033-manual-2026-11-13T10-37-48-153Z”（工程ID：2b487769-352e-4548-a766-6c47ca2274e4），不新建工程、不生成替代视频。仅对当前独立音轨相邻的A(0～5秒)与B(5～10秒)建立真实可编辑音频转场：先在5秒切点设1秒恒定增益交叉淡化，再切为恒定功率（sin/cos曲线）检查中点，再切为指数淡化；每种保留类型、时长和可读曲线。最后只删除音频转场并确认视频和其原声、切点布局不变；音频转场时长可独立修改。当前视频原声已静音作为对照。不要用生成混音文件、整体音量、普通淡入淡出或视频转场冒充此音频转场对象；不生成或替换媒体，保留原片段和源范围。如当前不支持，请明确逐项说明并保留工程，不执行替代任务。
```

原任务`run_v2_cd3a968d12ee4b7b9b60fd18dd80a089`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/033-probe-summary.json)。

**截图**

[033-agent-terminal.png](evidence-021-049-manual-production-20261113/033-agent-terminal.png) · [033-baseline.png](evidence-021-049-manual-production-20261113/033-baseline.png) · [033-before-submit.png](evidence-021-049-manual-production-20261113/033-before-submit.png)

![ERYE199-033 实际页面](evidence-021-049-manual-production-20261113/033-agent-terminal.png)

<a id="erye199-034"></a>

## ERYE199-034：Not Applicable

**前置操作：**片段已关联音频与 source-bound 字幕

**目标步骤与预期：**设 0.1/0.3178/8 倍速并保持音高 → 保持起点/保持时长 → 与后续片段冲突；变速正确；音高保持生效；选择波纹推移或取消，不静默覆盖；导入曲线变速报告未还原

**本轮实际：**本轮新工程已准备原片/原声/固定字幕；源时间绑定字幕不支持，0.1/8倍超当前工程0.25～4倍范围，保持音高/起点或时长策略及波纹冲突控制不完整。未绕过前置执行0.3178倍，原工程未改。

工程`99b28767-ba22-414b-b219-ed2839554d2b`；会话`af09b9f5-86d9-4282-9260-bb37bc74dd9b`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-034-manual-2026-11-13T10-37-48-153Z”（工程ID：99b28767-ba22-414b-b219-ed2839554d2b），不新建工程、不生成替代视频。对当前原视频0～10秒及其关联原声、英语字幕A1～3秒/B6～8秒验证变速。先将字幕建立为随该视频源时间关联的字幕，保证源位置不因绝对时间固定字幕而串用；如当前不支持这种源绑定字幕，明确说明并保留工程，不以固定时间字幕代替后续验证。前置满足后，依次设0.1倍、0.3178倍、8倍速且保持音高，逐项核验源范围仍0～10秒、时间线时长分别100秒/约31.466331秒/1.25秒、原声及字幕随源映射；再比较保持起点/保持时长两种策略，在其后有相邻片段时给出波纹推移或取消选择，不静默覆盖。若遇曲线变速只报告未还原，不能冒充已执行。不要生成替代视频或修改原文件。
```

原任务`run_v2_673f0a1932bc4d2e98b05ac261d08c74`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/034-probe-summary.json)。

**截图**

[034-agent-terminal.png](evidence-021-049-manual-production-20261113/034-agent-terminal.png) · [034-baseline.png](evidence-021-049-manual-production-20261113/034-baseline.png) · [034-before-submit.png](evidence-021-049-manual-production-20261113/034-before-submit.png)

![ERYE199-034 实际页面](evidence-021-049-manual-production-20261113/034-agent-terminal.png)

<a id="erye199-035"></a>

## ERYE199-035：Not Applicable

**前置操作：**片段为 SDR Rec.709，准备 .cube LUT

**目标步骤与预期：**加载 LUT → 调白平衡/曝光/对比度/高光/阴影/白场/黑场/饱和度 → 重开；参数与 LUT 生效；保存文件引用与指纹；色彩空间解释正确

**本轮实际：**SDR源与.cube样本已准备；本轮页面功能入口及Agent不提供LUT导入/持久化和工程内可编辑调色，文件级调色未作替代；未加载LUT/重开验证，工程未改。

工程`ec4bb012-0d7c-4559-ae5c-64aae4d19d35`；会话`57c232f1-5ae5-4ce7-b592-21a2e8213953`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-035-manual-2026-11-13T10-37-48-153Z”（工程ID：ec4bb012-0d7c-4559-ae5c-64aae4d19d35），不新建工程、不生成替代视频。当前是SDR Rec.709的10秒原片工程。本轮已准备2×2×2 .cube LUT（红蓝互换），请先提供并使用真实LUT导入/加载入口；再在当前原片上执行可继续编辑的白平衡色温+500、曝光+0.5EV、对比度+10、高光-10、阴影+10、白场+5、黑场-5、饱和度110%，保存LUT引用并重开保持，不能只烘焙成新视频。另检查当前调色面板是否有波形/矢量示波器入口，若有请打开并在曝光调整前后展示实时变化。逐项说明真实支持和未执行项；如没有LUT、真实调色或示波器能力，请明确说明、保留原工程，不以图像编辑、画质增强或新生成视频替代，不写虚构字段。原片、原声、0～10秒和速度不变。
```

原任务`run_v2_d4a20d8d623e460bbcf1a45459a95975`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/035-probe-summary.json)。

**截图**

[035-agent-terminal.png](evidence-021-049-manual-production-20261113/035-agent-terminal.png) · [035-baseline.png](evidence-021-049-manual-production-20261113/035-baseline.png) · [035-before-submit.png](evidence-021-049-manual-production-20261113/035-before-submit.png)

![ERYE199-035 实际页面](evidence-021-049-manual-production-20261113/035-agent-terminal.png)

<a id="erye199-036"></a>

## ERYE199-036：Passed

**前置操作：**片段为 HDR 素材

**目标步骤与预期：**应用调色并导出；显式转换到 SDR 或拒绝处理；不无提示错误解释

**本轮实际：**按需求允许的“明确拒绝HDR处理”分支通过：真实PQ/BT2020/10bit样本已登记并打开，应用明确拒绝调色/导出且解释无法保证正确转换；无输出、原工程未改。仅拒绝分支通过，不代表已支持或验证HDR→SDR转换质量。

工程`7de068e9-387e-4530-985b-83c046ef15c9`；会话`2c99cd69-1b43-432f-ae10-26ba6e85336c`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-036-manual-2026-11-13T10-37-48-153Z”（工程ID：7de068e9-387e-4530-985b-83c046ef15c9），不新建工程、不生成替代视频。当前原片文件file_cloud_gzm7swa4md65c5qlfeslo2l2uf为本轮已独立核验的4秒HEVC 10bit PQ（SMPTE2084）/BT2020灰阶测试源。请按当前应用能力处理HDR调色及正式导出：如果支持，应明确将HDR转换为SDR Rec.709，并报告转换选择和输出色彩信息；如果当前不支持HDR或无法保证正确转换，应明确拒绝此素材的调色/导出并保留工程，不能静默按SDR解释，不能只修改标签声称已转换。原始HDR文件不能覆盖或重写；不需要补传相同视频。请报告本次实际处理或拒绝结果，不把计划说明当已转换/导出。
```

原任务`run_v2_734c9f40bbb14c038038cea058a93f02`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/036-probe-summary.json)。

**页面操作记录：**

1. 生成并独立ffprobe核验4秒HEVC 10bit PQ/BT2020灰阶文件，登记后放入新工程

2. 打开真实原片，页面媒体readyState4、时长4秒

3. 一次提交按能力明确转换或拒绝的完整指令

4. 核对明确拒绝、没有转换/导出产物及前后工程完全一致；不以拒绝分支声称HDR转换已实现

**截图**

[036-agent-terminal.png](evidence-021-049-manual-production-20261113/036-agent-terminal.png) · [036-baseline.png](evidence-021-049-manual-production-20261113/036-baseline.png) · [036-before-submit.png](evidence-021-049-manual-production-20261113/036-before-submit.png) · [036-hdr-source.png](evidence-021-049-manual-production-20261113/036-hdr-source.png)

![ERYE199-036 实际页面](evidence-021-049-manual-production-20261113/036-agent-terminal.png)

<a id="erye199-037"></a>

## ERYE199-037：Not Applicable

**前置操作：**已建调整层并设时间范围/效果/蒙版

**目标步骤与预期：**添加调整层 → 导出成片 → 检查画面；调整层作用于下方画面；不作为可见实色画面导出

**本轮实际：**当前不支持真实调整层、曝光EV/高斯模糊和视频效果蒙版，2～6秒调整层未建立，1/3/7秒对照及导出检查未执行；未用可见色块或水印替代。

工程`89ecf904-5068-4f43-9152-781c991cf9af`；会话`dd61e646-b07a-4a6e-8b31-607b8864a373`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-037-manual-2026-11-13T10-37-48-153Z”（工程ID：89ecf904-5068-4f43-9152-781c991cf9af），不新建工程、不生成替代视频。请在当前原片上方添加真实可继续编辑的调整层，范围2～6秒，设置曝光+0.5EV和高斯模糊5像素，并添加矩形蒙版覆盖画布左半边。调整层只影响它下方的原片，在1秒/3秒/7秒对照；作为调整对象不能变成可见实色图层。成功后通过当前工程正式导出确认调整效果与预览一致且没有多出实色画面。保留原片/原声/10秒时长，不用文字水印、图片水印、叠放色块或生成视频替代调整层。如当前没有调整层、效果或蒙版能力，明确列出未执行项并保留工程，不写虚构图层。
```

原任务`run_v2_cbf03ee5f19c4e41991115226e62814f`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/037-probe-summary.json)。

**截图**

[037-agent-terminal.png](evidence-021-049-manual-production-20261113/037-agent-terminal.png) · [037-baseline.png](evidence-021-049-manual-production-20261113/037-baseline.png) · [037-before-submit.png](evidence-021-049-manual-production-20261113/037-before-submit.png)

![ERYE199-037 实际页面](evidence-021-049-manual-production-20261113/037-agent-terminal.png)

<a id="erye199-038"></a>

## ERYE199-038：Not Applicable

**前置操作：**调色面板可用

**目标步骤与预期：**打开波形/矢量示波器；示波器显示正确；调整后实时更新

**本轮实际：**本轮035同场核验：当前页面无可用调色/示波器入口，Agent明确无波形/矢量示波器打开或读取能力；未展示实时变化；复用035证据，无038独立run。

工程`ec4bb012-0d7c-4559-ae5c-64aae4d19d35`；会话`57c232f1-5ae5-4ce7-b592-21a2e8213953`。

本例未独立提交目标任务，复用本轮ERYE199-035前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-035-manual-2026-11-13T10-37-48-153Z”（工程ID：ec4bb012-0d7c-4559-ae5c-64aae4d19d35），不新建工程、不生成替代视频。当前是SDR Rec.709的10秒原片工程。本轮已准备2×2×2 .cube LUT（红蓝互换），请先提供并使用真实LUT导入/加载入口；再在当前原片上执行可继续编辑的白平衡色温+500、曝光+0.5EV、对比度+10、高光-10、阴影+10、白场+5、黑场-5、饱和度110%，保存LUT引用并重开保持，不能只烘焙成新视频。另检查当前调色面板是否有波形/矢量示波器入口，若有请打开并在曝光调整前后展示实时变化。逐项说明真实支持和未执行项；如没有LUT、真实调色或示波器能力，请明确说明、保留原工程，不以图像编辑、画质增强或新生成视频替代，不写虚构字段。原片、原声、0～10秒和速度不变。
```

原任务`run_v2_d4a20d8d623e460bbcf1a45459a95975`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/035-probe-summary.json)。

**截图**

[035-agent-terminal.png](evidence-021-049-manual-production-20261113/035-agent-terminal.png) · [035-baseline.png](evidence-021-049-manual-production-20261113/035-baseline.png) · [035-before-submit.png](evidence-021-049-manual-production-20261113/035-before-submit.png)

![ERYE199-038 前置来源035](evidence-021-049-manual-production-20261113/035-agent-terminal.png)

<a id="erye199-039"></a>

## ERYE199-039：Not Applicable

**前置操作：**绿幕素材，含发丝/阴影/运动模糊

**目标步骤与预期：**取色 → 调容差/黑白点/边缘收缩柔化/去溢色 → 加垃圾蒙版；输出真实 alpha；可看原图/合成/alpha；边缘缺陷可通过控制修正

**本轮实际：**真实绿幕人物及下层不同背景已准备；当前无可编辑色度抠像、alpha输出/三视图和边缘/垃圾蒙版控制，参数调整及边缘质量目标未执行，原工程未改。

工程`4e2be456-12bb-4ba2-9272-b1538e89192d`；会话`dbdc1025-97fc-4a0c-b5a6-98a777d84ca0`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-039-manual-2026-11-13T10-37-48-153Z”（工程ID：4e2be456-12bb-4ba2-9272-b1538e89192d），不新建工程、不生成替代视频。当前前景是8秒真实绿幕人物视频，下层是不同的彩条背景。请对前景取背景绿色，建立真实可继续编辑的色度抠像并输出真实alpha：容差20%、黑点0.05/白点0.95、边缘收缩1像素/柔化2像素、去溢色40%，再加垃圾矩形蒙版范围(90,90,540,240)，坐标按640×360原片局部像素。分别显示原图/下层背景合成/alpha三个视图，检查发丝、阴影和运动模糊边缘，并验证这些参数可调整修正。保留源视频/原声及8秒范围，不用视频批注、图片擦除蒙版、AI重绘或无alpha烘焙图替代。如果当前不支持真实可编辑抠像、alpha视图或边缘/蒙版控制，明确列出未执行项并保留工程，不启动替代生成任务。
```

原任务`run_v2_70e199330b0d457b8e249a5e63f4583b`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/039-probe-summary.json)。

**截图**

[039-agent-terminal.png](evidence-021-049-manual-production-20261113/039-agent-terminal.png) · [039-baseline.png](evidence-021-049-manual-production-20261113/039-baseline.png) · [039-before-submit.png](evidence-021-049-manual-production-20261113/039-before-submit.png) · [039-green-screen-source.png](evidence-021-049-manual-production-20261113/039-green-screen-source.png)

![ERYE199-039 实际页面](evidence-021-049-manual-production-20261113/039-agent-terminal.png)

<a id="erye199-041"></a>

## ERYE199-041：Not Applicable

**前置操作：**抖动素材

**目标步骤与预期：**启动稳定（平滑/无运动）→ 后台分析 → 取消/失败 → 改源范围；边缘/裁切/残余抖动可控；取消失败保留原片段；缓存随指纹失效；不覆盖新修改

**本轮实际：**已用独立已知抖动的真实人物源准备6秒新工程；当前无工程内稳定模式、后台分析/取消/失败保留/源范围缓存失效流程，未运行稳定或注入失败，原片段未改。

工程`96763e92-771e-4544-b2fc-f24602ff383f`；会话`a160090a-975a-4697-9c79-4df272f45a8d`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-041-manual-2026-11-13T10-37-48-153Z”（工程ID：96763e92-771e-4544-b2fc-f24602ff383f），不新建工程、不生成替代视频。当前6秒视频为带有明确摄像抖动的测试片，原声关联且1倍速。请在现有片段上开启可继续编辑的稳定处理，分别检查平滑/无运动两种模式及后台分析进度、边缘缩放裁切和残余抖动；先发起平滑分析并在分析中取消，确认保留原片段；再开始分析，若任务失败保留原片段并显示失败；最后改源范围到1～5秒，确认旧分析缓存失效、不会覆盖新范围。不得用生成新视频或替换原片冒充工程内稳定效果，不能声称已注入实际没有发生的失败。如当前不支持这套稳定与后台分析/取消/缓存失效流程，请明确说明并保留原工程，不启动替代视频处理任务。
```

原任务`run_v2_a955e3361afe4f439f1cb0ede1863a30`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/041-probe-summary.json)。

**截图**

[041-agent-terminal.png](evidence-021-049-manual-production-20261113/041-agent-terminal.png) · [041-baseline.png](evidence-021-049-manual-production-20261113/041-baseline.png) · [041-before-submit.png](evidence-021-049-manual-production-20261113/041-before-submit.png)

![ERYE199-041 实际页面](evidence-021-049-manual-production-20261113/041-agent-terminal.png)

<a id="erye199-042"></a>

## ERYE199-042：Not Applicable

**前置操作：**音轨有对白与音乐

**目标步骤与预期：**调片段增益/轨道推子/声像/静音/独听/音量关键帧 → 看电平表；参数生效；电平表正确；关键帧可播放

**本轮实际：**对白+音乐新工程，真实拖动片段音量至58%，音乐保持30%；原声静音/恢复操作有效。独立轨级dB推子、声像、solo、真实音量关键帧及实时电平表不支持，不以片段音量/静音代替完整混音通过。

工程`167525dd-7645-4995-8993-ac9a91925f78`；会话`a66ae911-9d81-4526-bbb1-9e541037c5d3`。

**观察边界：**probe前后2→3的差异仅是刚点击的原声恢复异步落盘：muted true→false，非Agent改写；后续真实拖动音量单独留证。键盘试调未改增益、只移动播放头，不计产品缺陷。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-042-manual-2026-11-13T10-37-48-153Z”（工程ID：167525dd-7645-4995-8993-ac9a91925f78），不新建工程、不生成替代视频。当前工程包含对白原声和独立背景音乐，已在真实页面操作片段音量滑杆及原声静音/恢复。请继续验证当前可编辑混音能力：对白轨推子-6dB、声像偏左50%，对背景音乐单独solo后恢复；再给对白音量加源1秒100%/8秒50%的真实关键帧并播放查看实时电平表。需要轨级推子、声像、独听和可播放的音量关键帧，不以片段音量或静音冒充。请先逐项核对是否支持，不支持项明确说明，不改为生成混音/降噪新文件；保留片段、原片引用、原声及当前已恢复的非静音状态。
```

原任务`run_v2_df416cd61b8c48e2bbf62f6ab271f404`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/042-probe-summary.json)。

[实际产物/保存核验 gain-drag-result.json](evidence-021-049-manual-production-20261113/042-gain-drag-result.json)。

[实际产物/保存核验 mixing-refreshed.json](evidence-021-049-manual-production-20261113/042-mixing-refreshed.json)。

**页面操作记录：**

1. 准备10秒真实对白原片及独立音乐，音乐音量30%

2. 点击原声静音再启用，核对恢复非静音

3. 请求轨级推子/声像/solo/关键帧/电平表，明确不支持

4. 实际拖动对白音量线降低至58%，核对音乐仍30%、两轨均非静音

5. 刷新同一工程核对音量及静音状态保持

**截图**

[042-agent-terminal.png](evidence-021-049-manual-production-20261113/042-agent-terminal.png) · [042-audio-slider-observation.png](evidence-021-049-manual-production-20261113/042-audio-slider-observation.png) · [042-baseline.png](evidence-021-049-manual-production-20261113/042-baseline.png) · [042-before-submit.png](evidence-021-049-manual-production-20261113/042-before-submit.png) · [042-dialogue-muted.png](evidence-021-049-manual-production-20261113/042-dialogue-muted.png) · [042-dialogue-restored.png](evidence-021-049-manual-production-20261113/042-dialogue-restored.png) · [042-gain-drag-baseline.png](evidence-021-049-manual-production-20261113/042-gain-drag-baseline.png) · [042-gain-drag-result.png](evidence-021-049-manual-production-20261113/042-gain-drag-result.png) · [042-gain-ui-result.png](evidence-021-049-manual-production-20261113/042-gain-ui-result.png) · [042-mixing-controls.png](evidence-021-049-manual-production-20261113/042-mixing-controls.png) · [042-mixing-refreshed.png](evidence-021-049-manual-production-20261113/042-mixing-refreshed.png)

![ERYE199-042 实际页面](evidence-021-049-manual-production-20261113/042-agent-terminal.png)

<a id="erye199-043"></a>

## ERYE199-043：Passed

**前置操作：**单声道与立体声素材

**目标步骤与预期：**检查声道映射与导出；首发支持单/立体声；多声道未支持时明确报告；导出 48kHz，保存原采样信息

**本轮实际：**按原前置单/立体声主场景通过：48kHz单声道与44.1kHz立体声在同一新工程导出为48kHz双声道AAC；实测前段L/R相关0.9999999，后段L440/R880分别保留，源引用/原采样信息保持。附加5.1仅查询、未放入时间线，端到端支持未验证，不计多声道通过。

工程`49de19df-c5ff-42cc-98f8-c5ce3d63de1c`；会话`b400c215-0ef3-44ad-816c-65f7fbdd09ae`。

**观察边界：**此Passed覆盖原用例前置中的单声道/立体声及其导出，不代表附加六声道已支持或被明确拒绝。5.1样本仅登记后查询，当前回复不能确认其端到端能力，不将这一未执行分支计通过。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-043-manual-2026-11-13T10-37-48-153Z”（工程ID：49de19df-c5ff-42cc-98f8-c5ce3d63de1c），不新建工程、不生成替代视频。本轮新工程前5秒使用48kHz单声道WAV文件file_cloud_hav2dnqw7fym6x4jxn4nmfq6dp，后5秒使用44.1kHz立体声WAV文件file_cloud_zqq3ajrlgca4okrrsptvpkgvx6（L=440Hz/R=880Hz），已通过页面完成正式导出。另有已登记但未加入时间线的5.1六声道文件file_cloud_eb7u63scbilhvxfncd2c6sftot（E199-5point1-six-tones.wav，48kHz/4秒）。现在仅检查当前应用对原采样率/声道布局的实际识别与保留，并明确说明六声道是否支持；若多声道不支持，应清楚报告，不能默默当成立体声处理或声称已验证多声道。不要改工程、重新导出或替换任何原文件，不用文件名猜测已转换成功；请提供实际可确认信息及能力边界。
```

原任务`run_v2_5203b37cbb07477993fa7922d9210ac7`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/043-probe-summary.json)。

[实际产物/保存核验 channel-export.mp4](evidence-021-049-manual-production-20261113/043-channel-export.mp4)。

[实际产物/保存核验 channel-validation.json](evidence-021-049-manual-production-20261113/043-channel-validation.json)。

**页面操作记录：**

1. 准备前5秒48kHz单声道、后5秒44.1kHz立体声L440/R880的独立音轨，原视频自带音轨静音

2. 通过页面正式导出，完成后下载真实MP4

3. ffprobe核对48kHz/2声道/AAC/10秒；分别解码1秒和6秒附近音频核对单声道复制及立体声L/R频率保持

4. 查询原素材信息与附加5.1识别边界，工程和原文件不改；5.1未放入时间线，不声称验证其完整支持

**截图**

[043-agent-terminal.png](evidence-021-049-manual-production-20261113/043-agent-terminal.png) · [043-baseline.png](evidence-021-049-manual-production-20261113/043-baseline.png) · [043-before-submit.png](evidence-021-049-manual-production-20261113/043-before-submit.png) · [043-channel-export-completed.png](evidence-021-049-manual-production-20261113/043-channel-export-completed.png) · [043-export-started.png](evidence-021-049-manual-production-20261113/043-export-started.png) · [043-mono-stereo-baseline.png](evidence-021-049-manual-production-20261113/043-mono-stereo-baseline.png)

![ERYE199-043 实际页面](evidence-021-049-manual-production-20261113/043-channel-export-completed.png)

<a id="erye199-044"></a>

## ERYE199-044：Not Applicable

**前置操作：**音轨已加降噪/去混响/EQ/变调/限幅

**目标步骤与预期：**调整效果顺序 → 查看时长与延迟；顺序可调；降噪/去混响不改节目时长；变调以半音/音分暴露；声明并补偿延迟

**本轮实际：**当前无工程内可编辑音频效果链、排序、参数EQ/独立半音音分/真峰值限幅及处理延迟控制；效果前置无法建立，时长/同步目标未执行。未以文件级降噪或变速替代，原工程未改。

工程`4ecf6805-3077-45dc-b5cc-2b743ceaea22`；会话`8b920bec-61aa-4227-b51d-15ec4b2f3860`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-044-manual-2026-11-13T10-37-48-153Z”（工程ID：4ecf6805-3077-45dc-b5cc-2b743ceaea22），不新建工程、不生成替代视频。仅在当前对白原声音轨建立真实可继续编辑的音频效果链：降噪6dB、去混响30%、EQ在1kHz增益+3dB/Q=1、变调+2半音并额外+25音分、限幅峰值-1dBTP。先按该顺序保存，再将EQ移到降噪之前，比较顺序可调、节目仍10秒、降噪/去混响不改变时长，并核对声明的处理延迟得到补偿，音画不逐渐漂移。需要可读可调的工程内效果，不用生成降噪文件、整体变速、片段音量或离线成片替代效果链；如当前不支持链、顺序、变调单位或延迟控制，逐项明确说明，保留原片、原声、源0～10秒和速度，不启动替代媒体处理。
```

原任务`run_v2_5aad996d6afd4cdc98d3d226098a88c4`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/044-probe-summary.json)。

**截图**

[044-agent-terminal.png](evidence-021-049-manual-production-20261113/044-agent-terminal.png) · [044-baseline.png](evidence-021-049-manual-production-20261113/044-baseline.png) · [044-before-submit.png](evidence-021-049-manual-production-20261113/044-before-submit.png)

![ERYE199-044 实际页面](evidence-021-049-manual-production-20261113/044-agent-terminal.png)

<a id="erye199-045"></a>

## ERYE199-045：Not Applicable

**前置操作：**已启用配乐压低

**目标步骤与预期：**改阈值/衰减/起落时间 → 手动改包络；包络可见；手动修改不被自动重算覆盖；响度归一化与限幅在导出设置可见

**本轮实际：**对白和独立音乐已准备；当前无侧链自动压低、可见可编辑包络/手动点保护，导出也无LUFS归一化及dBTP限幅配置。未执行固定音量或混音文件替代，原工程未改。

工程`50896804-d823-41a7-beb1-5d094bb95723`；会话`a513d3c8-6430-409f-ab75-558fdc98ecad`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-045-manual-2026-11-13T10-37-48-153Z”（工程ID：50896804-d823-41a7-beb1-5d094bb95723），不新建工程、不生成替代视频。当前工程有10秒对白和独立音乐。请启用真实可编辑的配乐自动压低：对白触发阈值-25dBFS、衰减-12dB、起落时间50ms/250ms，生成可见可编辑的音乐音量包络；再手动把音乐时间线2秒包络点改为50%，重新分析对白时保留该手动点，不让自动重算覆盖。最后查看正式导出设置中响度归一化-14LUFS及限幅-1dBTP的可见配置。需要侧链压低和包络控制，不以静音、固定音量或烘焙的新混音文件替代。如当前不支持，逐项明确说明，保留原工程和两条原音轨，不执行替代混音/生成任务。
```

原任务`run_v2_14227a1cc5d0408da6e43bbb25f27b58`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/045-probe-summary.json)。

**截图**

[045-agent-terminal.png](evidence-021-049-manual-production-20261113/045-agent-terminal.png) · [045-baseline.png](evidence-021-049-manual-production-20261113/045-baseline.png) · [045-before-submit.png](evidence-021-049-manual-production-20261113/045-before-submit.png)

![ERYE199-045 实际页面](evidence-021-049-manual-production-20261113/045-agent-terminal.png)

<a id="erye199-046"></a>

## ERYE199-046：Not Applicable

**前置操作：**音乐、目标时长与保护区间已给

**目标步骤与预期：**分析 → 生成候选 → 试听接缝/首尾 → 应用 → 替换旧结果；目标 ±0.5 秒；保护区间保留；接缝交叉淡化；替换为一个可撤销动作；失败保留原曲并解释

**本轮实际：**13秒音乐源/10秒目标/保护区间4～6秒已给齐；当前不支持结构分析后生成两个可审阅候选、保护映射校验及工程内单步可撤销替换，未以普通拼接/变速替代，原曲和工程未改。

工程`36cdd912-677d-4c72-80e1-8e43ad7a8499`；会话`1982e064-f51c-4c88-95d8-41c1cee2bf83`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-046-manual-2026-11-13T10-37-48-153Z”（工程ID：36cdd912-677d-4c72-80e1-8e43ad7a8499），不新建工程、不生成替代视频。当前音乐源13秒，请做音乐重组Remix，目标10.0秒（允许±0.5秒），保护原曲源4～6秒连续内容且不得变速，首尾各保留至少1秒。先分析音乐结构并生成两个可审阅候选，接缝使用交叉淡化；提供每个候选的实际时长、来源片段和保护区间映射，并可试听首尾/接缝。选取满足保护区间且最接近10秒的候选应用，再用另一个合格候选替换旧结果，替换应为一个可撤销动作，原曲保留。若分析或应用失败，明确解释并保留原曲。不能用截取前10秒、整曲变速、无保护区间的拼接或新生成音乐冒充Remix。如当前没有该候选分析/保护区间/可撤销替换功能，明确说明并保留工程，不执行替代生成任务。
```

原任务`run_v2_2529349a1c5a482dbc55a1ac4954efa0`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/046-probe-summary.json)。

**截图**

[046-agent-terminal.png](evidence-021-049-manual-production-20261113/046-agent-terminal.png) · [046-baseline.png](evidence-021-049-manual-production-20261113/046-baseline.png) · [046-before-submit.png](evidence-021-049-manual-production-20261113/046-before-submit.png)

![ERYE199-046 实际页面](evidence-021-049-manual-production-20261113/046-agent-terminal.png)

<a id="erye199-047"></a>

## ERYE199-047：Not Applicable

**前置操作：**项目已含效果、字幕、图形

**目标步骤与预期：**比较界面预览、Agent 预览、正式导出的同一帧；三者读取同一 ProjectSnapshot；时间映射/效果顺序/字幕布局/色彩/音频规则一致

**本轮实际：**依赖本轮025可编辑效果栈和027独立图形组缺口，无法准备“效果+字幕+图形”的完整工程；三种预览/导出同帧一致性目标未执行。030普通字幕预览/导出局部观察不替代本例通过。

工程`7c80a8e2-44a5-49cf-8a04-9a5b8d42d942`；会话`24035a58-e86f-472f-b604-33cec7c7d259`。

关联前置：[ERYE199-025](#erye199-025) · [ERYE199-027](#erye199-027)。

本例未独立提交目标任务，复用本轮ERYE199-025前置缺口证据，截图属于该源用例，不表示本例后续目标步骤已执行。

**依赖前置实际提示词（本例未重复发送）**

```text
只编辑当前工程“ERYE199-025-manual-2026-11-13T10-37-48-153Z”（工程ID：7c80a8e2-44a5-49cf-8a04-9a5b8d42d942），不新建工程、不生成替代视频。仅在当前原视频片段建立真实可继续编辑的片段效果栈：高斯模糊半径10像素、投影黑色/不透明度50%/偏移(8,8)/模糊5像素、羽化边缘10像素、线性擦除从左到右进度50%/边缘羽化5像素。给高斯模糊加局部矩形蒙版(80,60,320,180)，蒙版仅作用于该效果。先按以上顺序应用，再依次旁路/启用高斯模糊、复制高斯模糊、将复制项移到栈末尾、重置复制项；每步保留可见效果与可编辑参数。不要用生成视频、烘焙成片、水印、转场或图像编辑替代真实效果栈，保留原片/原声/0～10秒/1倍速。如当前不支持，请逐项说明并保留工程，不创建假字段或替代任务。
```

原任务`run_v2_cbf7281971e64c68b83a08d3f685c74a`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/025-probe-summary.json)。

**截图**

[025-agent-terminal.png](evidence-021-049-manual-production-20261113/025-agent-terminal.png) · [025-baseline.png](evidence-021-049-manual-production-20261113/025-baseline.png) · [025-before-submit.png](evidence-021-049-manual-production-20261113/025-before-submit.png)

![ERYE199-047 前置来源025](evidence-021-049-manual-production-20261113/025-agent-terminal.png)

<a id="erye199-048"></a>

## ERYE199-048：Not Applicable

**前置操作：**使用代理或低质量预览

**目标步骤与预期：**查看界面标识 → 导出；明确显示代理/低质量/未渲染效果；正式导出默认原素材

**本轮实际：**已检查当前预览控件；真实代理/320×180预览质量切换及状态/未渲染效果标识未提供，代理前置无法建立，未用浏览器缩放或普通导出替代验证，工程未改。

工程`e42e974a-7d31-42ce-9734-de31b2f435d3`；会话`45e07233-a033-4f31-ba7e-99c4756a816a`。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-048-manual-2026-11-13T10-37-48-153Z”（工程ID：e42e974a-7d31-42ce-9734-de31b2f435d3），不新建工程、不生成替代视频。仅核验当前工程的代理/低质量预览能力：请启用真实代理或320×180低质量预览，在界面明确标注正在使用代理/低质量以及任何未渲染效果，再正式导出并确认默认使用原640×360素材而非代理。不要把缩小浏览器画面、时间轴缩放或另生成一段低分辨率视频当成代理预览；不得覆盖原片。如果当前没有代理/预览质量切换与标识，请明确说明并保留工程，原画质预览和一般导出不能代替本例通过，不启动替代生成任务。
```

原任务`run_v2_27fc84e481f84c0c8981140009ea465a`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/048-probe-summary.json)。

**截图**

[048-agent-terminal.png](evidence-021-049-manual-production-20261113/048-agent-terminal.png) · [048-baseline.png](evidence-021-049-manual-production-20261113/048-baseline.png) · [048-before-submit.png](evidence-021-049-manual-production-20261113/048-before-submit.png) · [048-preview-quality-controls.png](evidence-021-049-manual-production-20261113/048-preview-quality-controls.png)

![ERYE199-048 实际页面](evidence-021-049-manual-production-20261113/048-agent-terminal.png)

<a id="erye199-049"></a>

## ERYE199-049：Blocked

**前置操作：**导出任务可取消

**目标步骤与预期：**导出 → 取消 → 重试 → 重复提交；冻结项目版本/序列/范围；失败先写临时文件不覆盖；成功后原子发布；重复任务不冲突

**本轮实际：**页面原生20秒导出已启动并完成产物回执；运行时未见导出取消/重试入口。通用取消工具是否适用于正式导出仍未确认，未建立可取消任务前置；取消/重试/第二次重复提交及两份产物冲突检查未执行。不直接判功能不存在，也不计普通导出为整例通过。

工程`19fbf89e-ec5c-49f6-9705-021e9f626a9f`；会话`6dcb024d-1d9b-4f7a-b295-4a644674992c`。

**观察边界：**不以任务已经结束推断不支持取消；已知有通用取消能力但正式导出适用性未核验。本轮按页面状态和产物验收，不验证内部冻结字段、临时文件或原子发布实现。没有重发原Agent请求或制造额外重复导出。

**实际提交的完整提示词**

```text
只编辑当前工程“ERYE199-049-manual-2026-11-13T10-37-48-153Z”（工程ID：19fbf89e-ec5c-49f6-9705-021e9f626a9f），不新建工程、不生成替代视频。刚从当前20秒工程页面启动正式MP4导出，运行中页面显示“正在导出…”且按钮禁用，没有可用的导出取消/重试入口。请核验真实导出任务控制：如果原导出仍运行且有真实取消功能，取消这一次；取消成功后才按相同工程、序列0～20秒、640×360/30fps/48kHz原配置重试一次，完成后再独立按相同配置提交第二次，核对两次产物可分别打开、不冲突、不覆盖原文件。若原任务已完成，请先说明现有取消/重试入口是否真实可用，不能仅凭任务已结束认定不支持；如当前缺少这些功能，请明确未执行项，保留已有导出结果，不再创建重复任务。不用停止Agent对话冒充取消导出，不虚构失败、临时文件或原子发布实现；本轮只按页面任务状态和实际文件是否保留/冲突验收。
```

原任务`run_v2_92061bee8b86413ca198aec789a66cdb`；原终态和不改动标记见[核验摘要](evidence-021-049-manual-production-20261113/049-probe-summary.json)。

[页面导出控制/回执 export-running-controls.json](evidence-021-049-manual-production-20261113/049-export-running-controls.json)。

[页面导出控制/回执 final-export-receipt.json](evidence-021-049-manual-production-20261113/049-final-export-receipt.json)。

**页面操作记录：**

1. 在新工程准备两段同源连续视频及原声，时间线总长20秒

2. 点击页面正式导出，保存运行中按钮禁用及未见取消入口的真实截图

3. 通过原任务核验取消/重试能力，得到适用性尚未确认的结果

4. 保留原导出产物；未尝试猜测接口或把停止Agent对话当作取消导出；后续重试/重复提交未执行

**截图**

[049-agent-terminal.png](evidence-021-049-manual-production-20261113/049-agent-terminal.png) · [049-baseline.png](evidence-021-049-manual-production-20261113/049-baseline.png) · [049-before-submit.png](evidence-021-049-manual-production-20261113/049-before-submit.png) · [049-export-control-result.png](evidence-021-049-manual-production-20261113/049-export-control-result.png) · [049-export-controls-baseline.png](evidence-021-049-manual-production-20261113/049-export-controls-baseline.png) · [049-export-running.png](evidence-021-049-manual-production-20261113/049-export-running.png) · [049-final-export-control-observation.png](evidence-021-049-manual-production-20261113/049-final-export-control-observation.png)

![ERYE199-049 实际页面](evidence-021-049-manual-production-20261113/049-agent-terminal.png)

[040/050删除记录及原条目](retired-cases-040-050-20261113.json) · [当前进度](execution-status-current.md) · [证据哈希清单](evidence-021-049-manual-production-20261113/manifest.json)。
