# 【生产环境】背景音乐拖入空白音频区域后松手回到原轨

已同步[FWXC-718](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=556390519ca90daa318f72da8e)，截图及正文已回读核验。

**现象**

任务自带 BGM 可拖出跨轨预览，释放鼠标后回到原轨，未建立新的音频轨。

**前置步骤**

1. 登录 CinLink 生产环境，账号具备编辑权限及准备流程所需积分。
2. 新建测试项目及独立会话，用附件 F20 完成“翻译配音 → 配音和字幕 → 简体中文”，打开本轮未编辑工程。
3. 确认字幕、视频、原声、译声和任务自带背景音乐已加载。X1/X2 另备附件 D（12 秒 WAV）。

**提示词**

- T1/X1（译文）：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`
- T2/X2（双语）：`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

以上提示词仅用于准备工程。编辑操作在时间轴完成。

**复现步骤**

1. 用 F20 生成对应模式的翻译配音工程，从本轮结果进入编辑器。X1/X2 通过“媒体 → 导入素材”登记附件 D，将其独立放到 6～18 秒，源范围 0～12 秒。
2. 保持 BGM 起点为 0 秒，从 0～20 秒 BGM 片段主体按住鼠标，沿竖直方向拖到最后一条音频轨下方的空白区域，不按修饰键。
3. 观察拖动预览进入空白区域后松手，对比放置前后的轨道、片段数量和时间。刷新并从同一轮结果重开工程。

**实际结果**

T1、X1、X2 均出现向下拖动的预览，松手后 BGM 回原轨，时间仍为 0～20 秒，重开后仍无新轨。换轨后的平移、联动及撤销重做因此未执行。

**预期结果**

释放后，BGM 在新音频轨保留同一实例、原时间和源范围，视频/BGM 关联保持，其他轨不变。

**影响**

无法将任务自带 BGM 放到独立的新音频轨整理工程。

**补充**

同步标识：ERYE199-094-BGM-CROSS-TRACK-SNAPBACK-PROD-20261119

关联 ERYE199-094 的 T1、X1、X2。拖动中的原图和重开后的原图成对提供。T2 的双语基线失败另有记录。

**失败截图**

094-T1-cross-bgm：保持时间位置，拖动预览进入音频轨下方空白处。

![094-T1-cross-bgm-cross-drag-preview.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=8c4072cb5a60adf53ad34576be)

094-X1-cross-bgm：保持时间位置，拖动预览进入音频轨下方空白处。

![094-X1-cross-bgm-cross-drag-preview.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5e284c4983b0b956986436060c)

094-X2-cross-bgm：保持时间位置，拖动预览进入音频轨下方空白处。

![094-X2-cross-bgm-cross-drag-preview.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=11c889425daf61c8efd8d5da97)

094-T1-cross-bgm：松手并重开后，BGM 仍在原轨，未新增音频轨。

![094-T1-cross-bgm-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=46d05bb376611b45f265aada7c)

094-X1-cross-bgm：松手并重开后，BGM 仍在原轨，未新增音频轨。

![094-X1-cross-bgm-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=59ac23023476f8f7008edef273)

094-X2-cross-bgm：松手并重开后，BGM 仍在原轨，未新增音频轨。

![094-X2-cross-bgm-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e08f94e98b208b764bbc0300dc)
