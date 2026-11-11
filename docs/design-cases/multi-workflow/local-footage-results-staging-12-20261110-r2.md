# LF-12预发复测R2（2026-11-10）

> 本页为此前执行/口径修订记录；已按优化版真实重跑，当前结果见[最新报告](local-footage-results-optimized-staging-20261110.md)和[状态总表](local-footage-execution-status.md)，不删除本页历史证据。

**Failed：查询本次成功完成，但火车结果混入长颈鹿。** 上轮API版本错误本轮未复现，不能据一次成功确认永久修复。A机器人历史保留及新会话直接查询部分通过。

环境：https://staging-app.cinlink.ai/；账号yabinc18；原生Chrome有头串行执行。复用P4项目 `d8fdc734-ddec-4f2d-ac55-e99ff25aab08`，B查询前4/4就绪。没有新建项目、重新上传、重新分析或@候选。部署版本/实际费用未取得。

A会话 `dc658e37-b6d4-4306-a426-f5b1f6e917b3`：先回读原机器人提示词、49秒完成及三卡 `match-1-7.mp4`、`match-2-8.mp4`、`match-3-1.mp4`，保存基线。新建同项目B会话 `b18de910-b29f-4391-9a97-3907acb19dee`，一次发送：**找出绿色蒸汽火车在铁轨上的卡通片段。** 本轮37秒完成，无API错误、无补槽、无重发。

| B候选 | 实际画面（下载后1秒抽帧） | 结论 |
|---|---|---|
| match-1-3.mp4 | 绿色火车、铁轨 | 目标正确 |
| match-2-14.mp4 | 长颈鹿、树，无火车 | 无关候选 |

两份本轮新下载分别为 `match-1-3 (1).mp4`、`match-2-14 (1).mp4`，完整解码退出码均0；大小/哈希见[downloads.json](../../../reports/lf12-staging-20261110-r2/downloads.json)。当前返回卡片无原始source_file_id及起止时间，不能只凭卡片数字推断F4源区间30～45秒，也不将新产物哈希冒充原片身份。内容与F4目标画面一致，但同一F4源ID及精确定位核验未覆盖。

查询后回A，原提示词、49秒终态及上述三卡保持，未变成火车结果。此项仅证明可见历史保留，不重新判A原先相关性通过。B独立会话可直接搜索，UI复用及历史隔离部分通过；按实际无关候选混入，整例仍Failed；源ID/时间缺失不计失败原因。没有证据证明跨项目泄漏，具体相关性根因未确认。

证据：[B查询前4/4](../../../reports/lf12-staging-20261110-r2/B-ready.jpg) · [B完成结果](../../../reports/lf12-staging-20261110-r2/B-result.jpg) · [结果文字](../../../reports/lf12-staging-20261110-r2/B-result.txt) · [火车帧](../../../reports/lf12-staging-20261110-r2/match-1-3%20(1).mp4.jpg) · [长颈鹿帧](../../../reports/lf12-staging-20261110-r2/match-2-14%20(1).mp4.jpg) · [A之前](../../../reports/lf12-staging-20261110-r2/A-before.jpg) · [A之后](../../../reports/lf12-staging-20261110-r2/A-after.jpg)。抽帧仅用于媒体内容核验，不是失败UI截图。

本轮1次新查询、零重发。上轮报告及错误证据保留为历史，不覆盖；当前状态仍Failed，失败现象更新为无关候选混入。未写云效，LF12仍PLAN未接脚本；专项最新9 Failed/3 Passed（UI范围）/5未执行，AUTO3不变。
