# 【ERYE196-068】同一Chrome切换账号后旧标签页仍显示前账号视频、字幕和会话历史

云效：[FWXC-624](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=a9140d40f25aafa8ba15573518)，官方OpenAPI回读通过。

**现象**

同一Chrome从U1退出并登录U2后，未刷新的另一U1工程标签页仍显示前账号的视频画面、字幕、会话历史和账号身份，直至手动刷新才清除。

**前置步骤**

1. Chrome生产环境有两个同账号U1的标签页，均打开同一已保存的视频工程；另有获准测试账号U2，无该工程访问权限。
2. 工程C1为Welcome（4～6秒）、C2为Second caption（10～12秒），有可辨识的视频画面及会话历史。

**提示词**

无Agent提示词。U1主标签页输入“068-U1-未发送草稿”但不发送。

**复现步骤**

1. U1在Chrome主标签页输入上述未发送草稿，保留另一已打开工程的标签页。
2. 在主标签页通过账户设置退出U1，再由用户登录U2；确认主页面账号为yabinc18 Free，工作台显示U2项目。全程不清Cookie或站点数据。
3. 切到未刷新的旧U1工程标签页，检查账号、视频、字幕与会话历史。
4. 回到实际登录U2的主标签页，直接打开同一工程会话链接作只读对照。
5. 手动刷新旧工程标签页，再检查内容是否清除。

**实际结果**

步骤3：旧页仍显示yabinc92 Creator、U1项目及会话聊天、视频画面、Welcome与Second caption字幕、A20+B10和原声/BGM轨道，底部同时报Conversation SSE HTTP 404。
步骤4：U2主页面身份为yabinc18 Free，新打开同址返回Conversation SSE HTTP 404，不显示U1工程。
步骤5：旧页刷新后才切为U2空会话及404，原U1内容不再显示。主页面U2输入框为空，未看到U1未发送草稿。
会话a9a99d8f-02fa-4889-9bb9-30a752a925a2；工程3c731ad9-018d-4784-ae38-7e78db2f5b55。

**预期结果**

退出或切换账号时，同一Chrome下已打开的旧账号页面应及时清除敏感内容及旧身份，不能在新账号登录后继续显示旧账号的视频、字幕和历史；无权直链继续拒绝。

**影响**

新账号使用者可从同一浏览器的旧标签页看到前账号已加载的非公开工程内容。

**补充**

同步标识：ERYE196-068-PROD-20261116-ACCOUNT-STALE-PAGE

2026-11-16生产实测，U1=yabinc92、U2=yabinc18，均为用户指定测试账号。U2在独立ego浏览器及Chrome新开直链均获404拒绝。本项只确认旧页面可见内容未清理，不认定服务器越权读取/保存、旧事件仍在投递或底层缓存未物理删除；未在残留页编辑、发送、导出或下载。发现隔离失败后停止新增工程写入，未执行后续订阅标记及Chrome切回U1分支。已刷新清除残留并关闭本轮临时页，Chrome留U2工作台；U1工程基线保持。需求来源：ERYE-196 WFR09/17，§06，WAC16/31。

**失败截图**

主标签页已登录U2 yabinc18，显示U2工作台

![068-Chrome-U2-workspace.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=87a656f622e088abd74bd7c936)

同一Chrome未刷新旧页仍显示U1 yabinc92及工程内容，同时报404

![068-existing-U1-tab-after-U2.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9dc9a8d413cf0b24625ff6362c)

U2新打开同一会话被404拒绝，作为权限对照

![068-Chrome-U2-direct-read.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=b4efbe9402d2ff598511eaf413)
