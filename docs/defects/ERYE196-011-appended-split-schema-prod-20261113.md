# 【ERYE196-011】追加B片段分割时报参数校验错误，未生成切点

云效：[FWXC-494](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=33a3e0253223cd6b65555c2ef4)；2026-11-13官方OpenAPI创建并回读通过，3张原图和1份审计附件完整。

**现象**

已选中追加的B片段后，请求在B内部第4秒分割，Editor video clip split返回工具参数校验错误，B未被分割。

**前置步骤**

1. Chrome登录生产环境https://app.cinlink.ai/，使用测试账号yabinc92。
2. 同一视频工程含A：ERYE196-A20-30fps-marked.mp4（20秒、30fps）和B：ERYE196-B10-30fps-blue.mp4（10秒、30fps）；A在0～20秒，B在20～30秒，总长30秒，两段保留各自原声。

**提示词**

准备追加指令（已成功）：
> 仅准备ERYE196-011基线：在当前ERYE196-A20-30fps-marked.mp4视频工程中，将本会话附件ERYE196-B10-30fps-blue.mp4作为第二个独立视频片段追加到20～30秒。A保持0～20秒，B使用其源0～10秒，总长30秒；两片段保留各自原声。不分割、不渲染合并文件、不导出、不新建工程。

正式指令：
> 在B片段内部第4秒分割，不修改A

**复现步骤**

1. 登记并导入A/B，用准备指令在现有工程追加B，确认存在两个独立视频片段。
2. 在时间线选中B，确认选中边框，向Agent发送正式指令一次。
3. 查看执行反馈、片段数量及切点；刷新重开同一工程，再核对A/B范围及总时长。

**实际结果**

正式请求没有要求补槽，Editor video clip split直接失败：`Editor tool arguments do not match its schema; arguments: invalid additionalProperties`。刷新后仍为A0～20、B20～30秒两段，B未拆成20～24与24～30秒，总长仍30秒。

会话：777f9a39-f632-4aa3-b7c8-8eae188b1194；工程ERYE196-A20-30fps-marked.mp4。本次页面执行未单独提取run_id，未编造。

**预期结果**

将B内部第4秒换算为工程24秒并完成分割：B源0～4与4～10秒分别对应时间线20～24与24～30秒，保留B的画面和原声。A及其源映射不变，总长30秒，新片段仍归属B资产。

**影响**

Agent无法对已追加素材执行精确分割，阻断追加素材后继续编辑的流程。

**补充**

2026-11-13 Chrome生产实测；ERYE196-011 Failed，来源ERYE-196 WFR02/§04/WAC03。正式请求1次、无重发。失败点为未执行分割，成功分割后的源归属、23～25秒连续性未到达，不声称已有丢帧或声音错误。与既有010错误文案相同，但本条针对追加B的独立场景，按本次授权单独提交，不修改既有缺陷。审计附件保留前后范围和真实错误。

**失败截图**

![正式请求前：A0～20秒后接B20～30秒，B已选中，工程总长30秒。](../../reports/yunxiao/erye196-011-015-prod-20261113/011/011-04-selected-B.jpg)

![正式分割返回invalid additionalProperties，未执行分割。](../../reports/yunxiao/erye196-011-015-prod-20261113/011/011-07-split-schema-failed.jpg)

![刷新重开同一工程：仍为A/B两段，原切点未生成；可见部分时间线，完整范围见审计附件。](../../reports/yunxiao/erye196-011-015-prod-20261113/011/011-08-reopened-two-clips.jpg)

同步回读：状态🤔AI提缺陷，负责人牛诗晴，迭代重构10-29，生产环境标签；正文及全部4份附件的ID、名称、字节数与截图引用均一致。检查点：reports/yunxiao/ERYE196-011-PROD-20261113-APPENDED-SPLIT/。
