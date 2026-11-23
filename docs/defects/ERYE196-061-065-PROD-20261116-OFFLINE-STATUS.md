# 【ERYE196-061、ERYE196-065】离线提交提示失败，恢复后未点击重试却实际保存

云效：[FWXC-621](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=42f88e1a0ddfc7ff6f1daf5b4c)；官方OpenAPI正文、字段及附件回读通过。

**现象**

两次独立离线提交均显示“失败 / Failed to fetch”，恢复网络并刷新后，没有点击重试或重新发送，编辑却继续完成并保存。

**前置步骤**

1. Chrome 登录生产环境测试账号 U1，打开30秒视频工程（A20秒+B10秒，字幕和原声接续），固定背景音乐0～20秒、100%。
2. 061基线C1为“056首请求已保存”（4～6秒），C2为“054手动保留”（10～12秒）；065分支另从C1为“064重连期间新文”（4～6秒）的30秒基线开始。

**提示词**

061分支完整指令：
执行ERYE196-061发送前断网分支：当前30秒基线，请一次同组裁A头2秒并让B及字幕原声接续，C1由056首请求已保存改为061断网前，最终2～4秒；C2前移到8～10秒；固定BGM0～20秒仅降低6dB。三项同组，可一次撤销，不新建或生成视频，不自动重试。

065分支完整指令：
把当前4～6秒原文C1“064重连期间新文”改为“离线草稿”，其他字幕、时间、样式、视频及声音不改。不新建工程或生成视频。

**复现步骤**

1. 在061基线，将 DevTools Network 设置为 Offline，再发送061指令。
2. 观察失败和重试按钮，不点击重试、不重新发送；恢复 No throttling 并刷新原会话。
3. 等待同步，检查任务和工程真实值。
4. 在065独立基线重复上述离线发送、恢复和刷新过程，使用065指令并核对字幕。

**实际结果**

061：离线发送立即提示失败，输入框清空；恢复后任务完成（99秒，Editor batch apply + Editor project get），A/B总长28秒，C1“061断网前”2～4秒，C2 8～10秒，BGM仍0～20秒且约50%。
065：同样先失败，恢复后任务完成（64秒，Editor subtitle text update），C1实际成为“离线草稿”（4～6秒）。两分支均未点击重试。
会话：a9a99d8f-02fa-4889-9bb9-30a752a925a2。

**预期结果**

提交状态应与实际受理和保存状态一致。未确认受理时保留可恢复输入并明确状态；恢复后先核对原请求，避免把后续会执行的请求直接呈现为终态失败并引导重试。

**影响**

用户误以为修改未提交，可能点击重试或继续其他编辑，无法准确判断工程状态。

**补充**

同步标识：ERYE196-061-065-PROD-20261116-OFFLINE-STATUS

按同入口、同触发链、同可观察偏差合并061和065；不推断共同代码根因。现有证据未证明新建重复任务、客户端自动重试或重复扣费。061关闭标签页分支通过，不属于本缺陷。已完成425条云效缺陷去重，未发现确认相同项。

**失败截图**

061：Offline发送后立即显示失败和重试

![061-A-offline.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=209e035f6072561b794c500150)

061：恢复后未点击重试，任务完成且工程变为28秒

![061-A-final.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ae7e03ea23222e5d6059c73704)

065：Offline发送后立即显示失败和重试

![065-offline.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e868ff768405fec468f8f2251a)

065：恢复后任务完成，字幕实际保存为离线草稿

![065-final.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=97fe20fde883108ccf72b23183)
