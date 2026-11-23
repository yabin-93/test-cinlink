# 【生产环境】【ERYE199-064】切换“媒体→工程”报504，工程素材列表为空

<!-- ERYE199-FAILED10-RERUN-20261116 -->
## 2026-11-16新工程复测

ERYE199-064：Passed。字幕A/B加载后正常显示；媒体→工程素材列表成功加载且无504；返回字幕仍为2秒，工程内容保持，原504未复现。

本次仅更新本地回归结果，云效状态/正文/附件未改。[完整步骤及本轮原图](../cases/requirements/ERYE-199/results-failed-ten-rerun-production-20261116.md)。以下为原提交时证据及结论。
<!-- /ERYE199-FAILED10-RERUN-20261116 -->

云效：[FWXC-577](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c8a5ca57b2162f6850176c6ff1)；状态：🤔AI提缺陷；负责人：牛诗晴。

2026-11-16已上传并嵌入3张原始截图，6个附件回读核验通过。本次仅同步2026-11-13失败记录，未重测；用例仍Failed。

**现象**
切换到“媒体→工程”后报504，工程素材列表为空。

**前置步骤**
1. Windows / Ego Lite登录生产环境，账号具有视频工程编辑权限。
2. 新建测试项目及独立工程，将附件10秒原片（640×360、30fps）和关联原声放入时间线0～10秒。
3. 导入附件SRT：字幕A为1～3秒、B为6～8秒，保存工程并暂停在2秒。

**提示词**
不涉及，本例通过页面操作复现。

**复现步骤**
1. 打开“字幕”，确认A/B两条字幕正常显示，预览为字幕A、进度为2秒。
2. 点击右侧“媒体”，再点击列表上方“工程”。
3. 等待素材加载，查看页面提示及工程素材列表。
4. 切回“字幕”，核对字幕列表、画面及播放进度。

**实际结果**
第3步提示“执行服务未返回有效JSON（504）。”，工程素材列表为空。切回字幕后A/B及2秒位置保持，但顶部错误提示仍在。

**预期结果**
工程素材列表正常加载并展示已准备的素材，不出现504；切换面板时字幕、画面和播放进度保持正确。

**影响**
无法在工程素材列表中正常查看及选用素材。

**补充**

同步标识：ERYE199-064-PROJECT-MEDIA-504-PROD-20261116
原始失败发生于2026-11-13，本次2026-11-16提交既有证据，未重新执行。原工程ID：fe2c0a1e-8fd2-486f-af2a-b0dd82da21cc；会话ID：e6404cad-9ff7-44a7-83c1-ae3f42c41aa9。原片、SRT及脱敏核验摘要随附，未执行“重新加载媒体”。

**失败截图**
切换前：字幕A/B列表正常，画面与播放头均在2秒。

![064-captions-at-two.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=2c44bd130f43e4889ab22a9e1c)

失败现场：切到媒体→工程，报“执行服务未返回有效JSON（504）”，素材列表为空。

![064-media-project-504.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=95ef5c51eb39f4870ce0b1afe7)

切回字幕：A/B列表及2秒位置保持，顶部504提示仍可见。

![064-returned-captions.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6c29e9dcb27107bb87c21eade1)
