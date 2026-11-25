# 【生产环境】【再次复现】从背景音乐发起分割、平移或裁边时误改原声及独立音频

已同步[FWXC-717](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=dfda496f8e8460955bf5f689d1)，截图及正文已回读核验。

**现象**

从任务自带 BGM 发起分割、平移或裁边时，视频按规则联动，但原声也被修改，部分分割场景还会切开独立音频。

**前置步骤**

1. 登录 CinLink 生产环境，账号具备编辑权限及准备流程所需积分。
2. 新建测试项目及独立会话，用附件 F20 完成“翻译配音 → 配音和字幕 → 简体中文”，打开本轮未编辑工程。
3. 确认字幕、视频、原声、译声和任务自带背景音乐已加载。X1/X2 另备附件 D（12 秒 WAV）。

**提示词**

- T1/X1（译文）：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`
- T2/X2（双语）：`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

以上提示词仅用于准备工程。编辑操作在时间轴完成。

**复现步骤**

1. 在独立新会话选择译文或双语模式，附加 F20 并提交对应指令。生成后从本轮结果进入编辑器，展开时间轴。记录视频、BGM、原声均为 0～20 秒。
2. X1/X2 通过“媒体 → 导入素材”登记附件 D，将其独立放到 6～18 秒，源范围 0～12 秒。 每次编辑使用相同参数重新准备独立未编辑工程。
3. 091：单击 BGM 主体，在 10 秒点击“分割所选片段”。确认分割发生在哪些轨道。
4. 092：从 BGM 主体向右水平拖动 1 秒，核对 BGM、视频及原声起止时间。
5. 093：从 BGM 左边缘向右裁 0.5 秒。换独立工程，从右边缘向左裁 0.5 秒。核对视频对应边缘和原声是否变化。
6. 分别撤销、重做及刷新重开，对照编辑前后片段数量、边界与源范围。

**实际结果**

- 分割：BGM 和视频在 10 秒产生切点，原声也在同处被分割。X1/X2 的 D 从 6～18 秒错误拆为 6～10、10～18 秒。
- 平移：BGM 和视频移到 1～21 秒，原声也移到 1～21 秒。D 保持。
- 裁边：BGM 和视频同侧裁 0.5 秒，原声也被裁。字幕、译声及 D 保持。重开工程可看到错误仍存在。

**预期结果**

由 BGM 发起的编辑只联动视频。原声、译声、字幕和独立 D 的片段、时间及源范围保持。

**影响**

精剪 BGM 会意外改变其他音轨，错误可保存至工程。

**补充**

同步标识：ERYE199-091093-BGM-NONTARGET-AUDIO-PROD-20261119

覆盖 ERYE199-091/092/093 的译文、双语及各自加入 D 的场景。本次复现与已关闭的 FWXC-699 关联，补充由 BGM 发起的分割、左右裁边和独立 D 分割证据。逐工程标识及片段数据见附件。

**失败截图**

091-X1-split：分割前在 10 秒处选中 BGM 及其关联视频，原声与独立 D 尚为完整片段。

![091-X1-split-before-split-selected-target.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=aebefea31bd830520840f0ef03)

091-T1-split：10 秒分割后，原声也出现切点。

![091-T1-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=cdd7e6629a3ad8242ae6368b69)

091-T2-split：10 秒分割后，原声也出现切点。

![091-T2-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4804622a47a6ceb85bfaa3a6b3)

091-X1-split：10 秒分割后，原声也出现切点。独立音频 D 也被分割。

![091-X1-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=628b4f2e69006577d4c4be6914)

091-X2-split：10 秒分割后，原声也出现切点。独立音频 D 也被分割。

![091-X2-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1e4ef2d16e3447c9796b88e4f2)

092-T1-move：BGM 右移 1 秒后，原声也从 0～20 秒移动到 1～21 秒。

![092-T1-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=bc2b940194ebef06555bb0f1ad)

092-T2-move：BGM 右移 1 秒后，原声也从 0～20 秒移动到 1～21 秒。

![092-T2-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=c8e57286e6f9bb3ec4bf30eb04)

092-X1-move：BGM 右移 1 秒后，原声也从 0～20 秒移动到 1～21 秒。

![092-X1-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=25e69dbb93a8b86da704e4905c)

092-X2-move：BGM 右移 1 秒后，原声也从 0～20 秒移动到 1～21 秒。

![092-X2-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6bd0c156e3491df73c59de1a9c)

093-T1-trim-head：裁头后原声也从 0.5 秒开始。

![093-T1-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=977cfe4e5553288ce0e9c2faa1)

093-T1-trim-tail：裁尾后原声也缩短到 19.5 秒。

![093-T1-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9b4b1f8b66403cb5b13f5cc2ce)

093-T2-trim-head：裁头后原声也从 0.5 秒开始。

![093-T2-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=cad2ce16c35e22a41b3d7405aa)

093-T2-trim-tail：裁尾后原声也缩短到 19.5 秒。

![093-T2-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d341f01dd5805fb86f76ea2e81)

093-X1-trim-head：裁头后原声也从 0.5 秒开始。

![093-X1-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=28c0773970f146b397846767a3)

093-X1-trim-tail：裁尾后原声也缩短到 19.5 秒。

![093-X1-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=153c70acc86a41919d2469b210)

093-X2-trim-head：裁头后原声也从 0.5 秒开始。

![093-X2-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=990c729e4c23f7e1a44001d397)

093-X2-trim-tail：裁尾后原声也缩短到 19.5 秒。

![093-X2-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=a210fe3e4314628de1b052761f)
