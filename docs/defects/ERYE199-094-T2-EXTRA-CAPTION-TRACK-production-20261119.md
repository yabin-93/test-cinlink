# 【生产环境】【再次复现】新会话直接双语翻译配音后多出一条英文字幕轨

2026-11-19：[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5) 与 [FWXC-700](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=2bcaf2fdf68499e36c6bb14d74) 的触发条件及结果一致，用户确认按重复关闭，云效回读为“已关闭”。094-T2 仍为 Failed，后续跟踪 FWXC-700。

已同步[FWXC-719](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=88b4c5c5123a367fccd6eab8e5)，截图及正文已回读核验。

**现象**

独立新会话首轮选择双语翻译配音，初始化的编辑时间轴显示两个名为“译文字幕”的轨道。

**前置步骤**

1. 登录 CinLink 生产环境，账号具备编辑权限及准备流程所需积分。
2. 新建测试项目和空白会话，准备附件 F20 英语原片。

**提示词**

`将这条视频翻译成简体中文配音，并显示中英双语字幕。`

**复现步骤**

1. 选择翻译配音卡片，选择“配音和字幕 → 简体中文 → 双语”，附加 F20 并发送上述指令。
2. 任务完成后，从该轮结果进入编辑器，待字幕和声音都加载后数时间轴轨道。
3. 核对两个“译文字幕”轨道各自显示的文字语言。

**实际结果**

实际 6 轨：两条“译文字幕”（一条英文、一条中文）、视频、原声、配音和背景音乐。由于进入编辑器时组合已不符合预期，未执行 BGM 拖动。

**预期结果**

双语译配的编辑时间轴应有 5 轨：一条译文字幕、视频、背景音乐、原声和译声。

**影响**

时间轴多出一条字幕轨，无法按设计规定的轨道组合继续验证。

**补充**

同步标识：ERYE199-094-T2-EXTRA-CAPTION-TRACK-PROD-20261119

关联 ERYE199-094-T2，与 FWXC-700 为相同现象的本轮复现。附件给出本轮独立会话、工程和任务标识。

**失败截图**

094-T2-cross-bgm：提交前确认首轮为简体中文双语翻译配音。

![094-T2-cross-bgm-before-submit.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9d7eb7d97b9d15d4efdce7db5b)

094-T2-cross-bgm：首次进入编辑器实际有两条“译文字幕”，共 6 轨。

![094-T2-cross-bgm-baseline-failure.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5152a56560b9f21de95d1065a3)
