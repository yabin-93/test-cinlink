# 【ERYE196-010】视频片段第5秒分割未执行，提示工具参数校验失败

**现象**

对唯一20秒视频片段内部第5秒请求分割，补充片段起点和绝对位置后仍失败；刷新后保持单段20秒。ERYE196-010 Failed，已提交云效[FWXC-490](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=10186b9549ac07a36b3890ddd6)。

**前置步骤**

1. 生产环境https://app.cinlink.ai/，Chrome有头，测试账号已登录。
2. 独立工程ERYE196-A20-30fps-marked.mp4：20秒、30fps、600帧；唯一视频及原声均从0秒开始，49条原文字幕已保存。

**提示词**

首次指令：

> 在当前片段内部第5秒处分割，保留全部内容，不移动任何片段

按页面缺起点反馈补充：

> 补充定位：当前工程为ERYE196-A20-30fps-marked.mp4，只有一个视频片段，时间线起点0.00秒、结束20.00秒，源范围0.00～20.00秒。因此片段内部第5秒就是工程绝对5.00秒。请在此位置分割，保留全部内容，不移动任何片段；字幕、原声音频及总时长保持不变，不新建工程、不生成替代视频、不导出。

**复现步骤**

1. 打开该工程，选中唯一0～20秒视频片段，发送首次指令。
2. 页面拒绝相对位置后，补齐起止和绝对5秒位置，发送上述完整补充。
3. 查看实际工具结果、视频片段数及时间范围。
4. 刷新重开同一工程核对保存状态。

**实际结果**

首次52秒后拒绝执行分割；补充定位后Editor video clip split报错“Editor tool arguments do not match its schema; arguments: invalid additionalProperties”。时间线仍一个视频片段0～20秒，刷新重开保持；稳定回读49条字幕匹配基线。会话207f1460-389a-4734-b8ac-2fff97f590d5，未可靠取得本例run_id。

**预期结果**

在5秒处分割为0～5秒及5～20秒两个连续片段，完整保留原内容、顺序及20秒总时长，声音和字幕不串用，刷新保存一致。

**影响**

明确目标的工程内精确分割无法完成，后续源映射、跨切点声音/字幕及帧连续性检查无法进行。

**补充**

素材由用户7MB.mp4前20秒转制并加入帧标记，600帧独立解码核验；参数及哈希见本批fixture-marked-manifest.json。仅1条原指令+1条定位补充，没有盲目重发或UI代替分割，未导出。刷新初次末词结束时间19.98秒、后续稳定19.82秒的暂态另有记录，不推断其与分割报错同因。已按用户授权提交[FWXC-490](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=10186b9549ac07a36b3890ddd6)；未确认与历史分割缺陷同根因。

**失败截图**

![首次拒绝](../../reports/erye196-006-010-chrome-prod-20261113/010-07-first-refusal.jpg)

![补充后分割报错](../../reports/erye196-006-010-chrome-prod-20261113/010-11-split-failed.jpg)

![刷新仍单段20秒](../../reports/erye196-006-010-chrome-prod-20261113/010-14-final-stable-top.jpg)

## 云效同步记录（2026-11-13）

官方OpenAPI新建[FWXC-490](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=10186b9549ac07a36b3890ddd6)：【ERYE196-010】视频片段第5秒分割未执行，提示工具参数校验失败。3张本轮生产原始截图及1份脱敏审计JSON均已上传；正文、图片引用、附件ID/名称/字节数及业务字段回读一致。状态🤔AI提缺陷，负责人牛诗晴，迭代重构10-29，生产环境标签。未重跑业务、未修改旧项或继续脚本接入；未Git提交推送。

检查点：reports/yunxiao/ERYE196-010-PROD-20261113-SPLIT-SCHEMA/result.json。原图SHA256与源文件一致，未加工画面。
