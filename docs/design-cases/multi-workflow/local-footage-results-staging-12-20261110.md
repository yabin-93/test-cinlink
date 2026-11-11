# LF-12预发执行记录（2026-11-10）

**Failed：B会话查询报模型HTTP 400，未得到火车结果；A原机器人历史仍保留。**

环境 https://staging-app.cinlink.ai/，账号yabinc18，原生Chrome有头串行执行。复用P4项目 `d8fdc734-ddec-4f2d-ac55-e99ff25aab08`（LF-05-07-staging-20261110），B查询前页面4/4已分析。未新建项目、重传、重分析或@素材。部署版本及实际费用未核。

| 会话 | ID | 本轮操作/观察 |
|---|---|---|
| A | dc658e37-b6d4-4306-a426-f5b1f6e917b3 | 复用本日LF-05机器人查询；本轮仅前后回读，均49秒完成，保留match-1-7.mp4、match-2-8.mp4、match-3-1.mp4三卡及机器人提示词 |
| B | af864aba-5960-455f-83a5-c307f101eedc | 同项目新空会话，一次发送火车查询；终态失败，无候选 |

B提示词：**找出绿色蒸汽火车在铁轨上的卡通片段。**

执行步骤：先保存A原结果；通过同项目新会话首页进入B，确认4/4就绪及无已选素材；发送一次提示词；等待终态并保存失败页；回A核对提示词及原三卡未覆盖；返回B。没有点击重试、没有重复发送。

实际错误：

```text
RuntimeError: model HTTP 400
code: BadRequest
message: API version not supported
request id: 2026111009040715557245SWu4oBaf
request_id: 01a1c4b3-47c1-7344-8027-4efd3b437fe0
```

这是页面展示的错误及请求标识，不能冒充检索run_id或原始网络响应。页面未出现Search materials执行结果及火车候选；不将此次请求失败解释为“无匹配”或“素材库未复用”。当前只能确认部署链路报API版本不支持，具体模型/网关配置根因尚未核实。

预期：B直接复用已分析项目库，命中F4的火车段，且A机器人结果不被覆盖。实际A历史保留部分通过；B查询失败，跨会话成功复用及F4源身份/30～45秒定位均未完成。A原有相关性问题维持LF-05历史结论，本轮仅比较其保存状态，不重新判A内容通过。内部源ID、时间区间和请求范围本轮未获取，不臆造。

证据：[B的4/4就绪](../../../reports/lf12-staging-20261110/B-ready.jpg) · [B失败截图](../../../reports/lf12-staging-20261110/B-failed.jpg) · [完整错误文字](../../../reports/lf12-staging-20261110/B-failed.txt) · [A执行前](../../../reports/lf12-staging-20261110/A-before.jpg) · [A执行后](../../../reports/lf12-staging-20261110/A-after.jpg)。提示词/提交时间记录在B-submit.json，全部证据SHA见manifest.json。

本轮仅1次新查询、零重发，无云效写入。LF-12仍PLAN未接脚本；17条专项最新累计9 Failed/3 Passed（UI范围）/5未执行，AUTO仍3。
