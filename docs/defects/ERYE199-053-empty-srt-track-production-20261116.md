# 【生产环境】【ERYE199-053】导入空SRT未提示无有效字幕，新增空字幕轨并持久化

云效：[FWXC-591](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=cf695e0a8ad4e178279e339726)；状态🤔AI提缺陷，负责人牛诗晴，生产环境，中 / 3-一般。3张本轮原图已上传嵌入，8附件及正文/字段/图片引用回读通过；本次只同步既有失败，未重新执行。

**现象**

将0字节empty.srt通过原生媒体入口登记并拖入字幕轨后，没有“无有效字幕”或格式拒绝提示，工程反而新增一条没有字幕内容的空轨。该空轨会保存并在刷新后继续存在。

**前置步骤**

1. Windows / Ego Lite登录生产环境，账号具备视频工程编辑权限，并新建专用项目、独立会话和工程。
2. 使用附件V.mp4及fixed.srt，准备10秒视频/关联原声和两条合法字幕：Fixed A为1～3秒、Fixed B为6～8秒，20px白字，已保存。
3. 准备empty.srt（0字节、无BOM，重建方式见附件说明）；broken.srt为非法时码对照，内容为三行1、not-a-timestamp、BAD053。

**提示词**

无Agent提示词，使用编辑器原生页面操作。本次未发送会话任务。

**复现步骤**

1. 打开新工程，在2秒确认Fixed A，在7秒确认Fixed B，记录只有一条合法字幕轨和10秒工程基线。
2. 打开“媒体→导入素材”，选择empty.srt，等待素材库显示该文件。此时仅登记文件，不以登记成功判字幕已有效导入。
3. 从素材库将empty.srt拖入工程的已有字幕轨，触发实际字幕解析/放入；观察页面提示和时间线上是否出现新的空字幕轨。若后续版本出现绑定表单，按原文及本例已有字幕选择填写后继续。
4. 刷新重开工程，检查新增空轨是否仍在，核对原Fixed A/Fixed B文字、时码、样式和视频/原声。
5. 对照操作：同样登记并拖入broken.srt，检查非法时码的拒绝提示和原工程是否保持。
6. 将原Fixed A改为RECOVER053，正常结束编辑并刷新；确认2秒新文字已保存、7秒仍为Fixed B，检查异常空轨是否依然存在。

**实际结果**

- empty.srt放入后没有拒绝或“无有效字幕”提示，新增一条无字幕内容的轨道；该轨字幕绑定列表为空，并保存到工程。
- 刷新及后续合法编辑后空轨仍在；原A/B字幕、视频和原声保持，RECOVER053能够正常保存。
- 非法时码对照broken.srt被正确拒绝，页面原文提示“Subtitle block has no timing”，没有因为该对照改变原工程。
- 本缺陷只针对空SRT的无提示空轨写入，不把素材库保存原始文件或正常的非法时码拒绝误报为失败。

**预期结果**

文件可以仅登记为素材，但实际应用到字幕轨时，空SRT应明确提示没有有效字幕并停止写入，不新增空轨或清空/部分覆盖原字幕。原工程、合法字幕和后续正常编辑应保持可用，刷新后也不能留下本次无效导入对象。

**影响**

用户无法知道字幕导入没有有效内容，工程中留下持久化空字幕轨，增加无效对象和后续编辑混淆。

**补充**

同步标识：ERYE199-053-V2-EMPTY-SRT-PERSISTED-PROD-20261116

- 关联用例：ERYE199-053当前功能v2，批次nine-v2-20261116。测试日期2026-11-16；本次提交仅同步既有实测，不重新执行。
- 项目：d889faa2-3d40-4f68-bf15-f1fd32a72d51；会话：6ea151c6-f7fd-4d9c-a733-b942544cf0d5；工程：208baf88-772e-45b0-9cab-bba430908980。纯页面操作，无run_id。
- 附件V.mp4、fixed.srt、broken.srt及empty-srt-preparation.txt可重建基线和两种异常输入；case-evidence.json包含前后工程与空轨对照。
- 0字节样本通过说明按原哈希重建；未把说明文件当作empty.srt提交。没有运行脚本、外链、XML或Premiere工程样本，相关旧高级安全目标仍延期。
- 原字幕保留和合法编辑恢复已通过，本例不是工程原有字幕丢失或数据全部损坏。

**失败截图**

操作前：原Fixed A1～3秒、Fixed B6～8秒及视频/原声均已保存，只有一条合法字幕轨。

![053-before.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1a732babde2623c2f84919eaab)

失败现场：空SRT登记并放入工程后，时间线上新增空字幕轨，页面未提示没有有效字幕。

![053-empty-srt-added-empty-track.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ba5a6654132999467b13be217b)

刷新及编辑恢复对照：原A可改为RECOVER053并保存，Fixed B保持；新增的无字幕内容轨仍持久存在。

![053-empty-track-after-refresh.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6a3eb805c1703fa8c3bf4e5d0d)
