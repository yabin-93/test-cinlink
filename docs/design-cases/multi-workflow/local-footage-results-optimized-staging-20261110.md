# 优化版LF-08、12、13预发重跑（2026-11-10）

按用户确认范围真实重跑，不仅修改旧结论。结果：**LF08 Failed、LF12 Failed、LF13 Passed（UI连续查询/历史保留）**。均复用P4项目 `d8fdc734-ddec-4f2d-ac55-e99ff25aab08`，各新会话4/4已分析，不重传/重分析，不@候选，原生Chrome有头串行；预发 https://staging-app.cinlink.ai/，账号yabinc18。共4次新查询，零已受理重发、零生成，无云效写入。部署版本/实际费用未核。

## LF-08：Failed

会话 `50e15d02-94c6-4eaa-b32b-4677ba8992dd`，一次发送新版提示词：**找出所有包含绿色盆栽仙人掌、旁边有橙色兔子的原始视频，分别列出源文件。** 58秒完成。

实际返回F1 `01_60秒_单镜头_仅背景音乐.mp4`、F3 `03_60秒_单镜头_无音轨.mp4`、F4 `04_300秒_20镜头_有人声.mp4`。应命中的F2缺失，F4误入。F4本轮下载8,432,031字节，SHA-256 `4cb12ed3abb9129e7f6da2dad6bb72497ba2e08c8220524b3b3a528c12c759a1` 精确匹配已登记原F4，排除仅卡片名称误标的猜测。原F4场景金标20镜头不含仙人掌/橙兔；F2已核验同画面有目标。当前项目仅4原片，不涉及回复声称的50条上限。没有凭source ID或时间缺失判失败，失败是实际素材集合不正确。F1/F3本轮未重新下载，不冒称三文件均重新哈希核验。

旧LF08三原片哈希正确的Passed是上一批事实，仍保留；本次最新Failed覆盖当前状态，不能把先前仅修订口径当成本次执行。

[4/4就绪](../../../reports/lf-optimized-staging-20261110/08-ready.jpg) · [实际结果](../../../reports/lf-optimized-staging-20261110/08-result.jpg) · [结果文字](../../../reports/lf-optimized-staging-20261110/08-result.txt) · [F4下载哈希](../../../reports/lf-optimized-staging-20261110/08-F4-download.json)。

## LF-12：Failed

A沿用机器人会话 `dc658e37-b6d4-4306-a426-f5b1f6e917b3`，本轮前后均保留机器人原提示词、49秒终态及match-1-7/match-2-8/match-3-1三卡。B新会话 `06681f70-fd9c-49e8-9293-623a59684295`，一次发送：**找出绿色蒸汽火车在铁轨上的卡通片段。** 39秒完成，返回match-1-3和match-2-14。首候选播放为绿色火车/铁轨，第二候选实际为长颈鹿/树，无关结果混入，与FWXC-390现象一致，根因未确认。

新会话直接查询与A历史保留子项通过，相关性失败；本轮未发生旧API版本错误，不宣称永久修复。不因内部源ID/匹配时间未取得判失败。

[就绪](../../../reports/lf-optimized-staging-20261110/12-ready.jpg) · [结果](../../../reports/lf-optimized-staging-20261110/12-result.jpg) · [火车/长颈鹿画面](../../../reports/lf-optimized-staging-20261110/12-preview.jpg) · [A之前](../../../reports/lf-optimized-staging-20261110/12-A-before.txt) · [A之后](../../../reports/lf-optimized-staging-20261110/12-A-after.txt)。本轮以实际UI播放核验，未下载B短片或发编辑任务。

## LF-13：Passed（UI连续查询及历史保留）

新会话 `fc604669-a2fd-4918-99c2-e3931e85e170`，连续两轮：

1. **找出画面里出现黄色机器人，旁边有黑板和桌子的片段。** 44秒完成，首候选match-1-7实际播放为黄色机器人、黑板和桌子。
2. 不清空对话，发送 **找出瀑布从岩壁流下、底部形成水潭的片段。** 35秒完成，唯一候选match-1-19实际播放为瀑布及水潭。

后轮没有沿用机器人画面或旧查询摘要，前轮提示词、44秒终态及原三卡仍保留。按优化后LF13的连续查询/历史保留目标通过。第一轮另有match-2-8及match-3-1，本例不宣称全部候选相关性通过，已知相关性另由LF05覆盖。内部源身份及精确区间未覆盖，不作为页面失败项。

[第一轮](../../../reports/lf-optimized-staging-20261110/13-R1-result.jpg) · [机器人预览](../../../reports/lf-optimized-staging-20261110/13-R1-preview.jpg) · [第二轮](../../../reports/lf-optimized-staging-20261110/13-R2-result.jpg) · [瀑布预览](../../../reports/lf-optimized-staging-20261110/13-R2-preview.jpg) · [完整两轮历史](../../../reports/lf-optimized-staging-20261110/13-final.txt)。

最新全专项状态见[统一状态汇总](local-footage-execution-status.md)。原始证据及manifest保存在 `reports/lf-optimized-staging-20261110/`；前次报告不覆盖。

2026-11-10 LF08已同步云效：[FWXC-395](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bea27b77acf70304e5b948f1b8)（漏F2/误入F4）。3图+1JSON及正文图片引用回读通过，最新状态仍Failed；本次无CinLink重跑。
