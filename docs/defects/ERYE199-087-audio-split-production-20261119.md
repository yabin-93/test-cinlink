# 【生产环境】仅分割独立音频却同时拆分未选中的视频、原声和BGM

已同步[FWXC-703](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4141c1deac59c5f123ee27bfb4)；截图上传、正文嵌入及附件回读通过，用例保持Failed。

**现象**

只选中普通导入的独立音频D进行分割，视频、原声和任务自带BGM也被一起分割；译文与双语两种翻译配音工程均复现。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限和充足测试积分。
2. 新建测试项目、独立会话，用附件F20原片（20秒，1280×720，30fps）完成翻译配音、配音和字幕、简体中文、译文，打开未编辑的原生五轨工程。
3. 准备附件D-independent-audio-12s.wav（12秒、48kHz），作为普通独立音频导入，不替代任务原生BGM、原声或译声。

**提示词**

T1译文：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`

T2双语：在另一个新会话选择“简体中文 / 双语”，一次发送：`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

导入和分割均为页面操作，无额外Agent提示词。

**复现步骤**

1. 在独立新会话选择翻译配音卡片、T1参数并附加F20，发送完整指令，完成后从该轮结果进入编辑器，确认字幕、视频、原声、译声、BGM五轨加载完毕。
2. 通过“媒体→导入素材”登记附件D，放入独立音频轨，设置时间轴6～18秒（源0～12秒），确认只放入一个实例，原有五轨不变。
3. 将播放头定位到12秒，单击D片段主体，只选中D；确认视频、原声和原生BGM均未被选中，“分割所选片段”可用。
4. 点击“分割所选片段”，逐一核对D、视频、原声、BGM的片段数量和起止时间。
5. 撤销分割确认恢复，再重做；刷新并从该轮结果重开工程，核对分割结果是否保留。
6. 另建独立会话用T2双语参数重复以上步骤，不复用已编辑工程。

**实际结果**

- T1/T2均只选中独立D，D正确分成时间轴6～12和12～18秒，对应源0～6和6～12秒。
- 原本各一段0～20秒的视频、原声、原生BGM也错误地在12秒拆成0～12、12～20秒两段；字幕和译声保持。
- 撤销恢复，重做及刷新重开保留误分割。D源绑定及分割点两侧播放推进核验通过，并非D替换成原声或BGM。

**预期结果**

只分割选中的普通独立音频D，其他所有轨道保持原片段数量、时间和源范围；视频与原生BGM的双向联动组不能被独立D操作触发。保存重开结果应一致。

**影响**

用户编辑额外配音或独立音频时，未选中的视频及声音被意外切碎，污染工程剪辑结构。

**补充**

同步标识：ERYE199-087-INDEPENDENT-AUDIO-SPLIT-CROSSTRACK-PROD-20261119

关联ERYE199-087，T1译文和T2双语合并本条。两种模式均有选中D的原图；T2还记录了仅一个选中对象且对应D轨，不是多选分割。只按页面业务结果验收，不推断内部实现。真实run、会话、工程标识、独立D源绑定和前后片段信息见evidence-summary.json。

**失败截图**

T1：D作为独立音频放入6～18秒，原五轨未分割。

![087-T1-split-D-placed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f78bbf940c91466fa73b0d5ae9)

T1：12秒处仅独立D有选中边框，分割前状态。

![087-T1-split-preview-12.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=20976dfd484ae22c983bcf596a)

T2：12秒处仅独立D选中，视频与原生BGM未选中。

![087-T2-split-before-split-selected-D.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=a149bb067f5ff3228372f5699f)

087-T1-split：分割D后，视频、原声及原生BGM也被分割，重开仍保留。

![087-T1-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0d81249e3e4df9549ba64013be)

087-T2-split：分割D后，视频、原声及原生BGM也被分割，重开仍保留。

![087-T2-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=2cf0730da65041fd2de1b01783)
