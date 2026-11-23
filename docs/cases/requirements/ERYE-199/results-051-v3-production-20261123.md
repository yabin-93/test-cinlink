> 本文保留 v3 的定义或原判。用户将创建前入口更正为「选择媒体」后，按原证据复核为 Passed。[v4 复核记录](revision-051-select-media-20261123.md)

# ERYE199-051 v3 视频工程入口生产实测（2026-11-23）

**结果：Failed。** 无视频工程时，工程下拉仅显示「暂无工程」，空态只有「选择媒体」，缺少预期的「新建视频工程」。通过「选择媒体」在同一会话建立视频工程后，入口未显示；刷新重开仍是同一工程，入口继续不显示。

使用 Ego Lite 有头浏览器，在生产环境新建测试项目和独立会话。会话由既有测试准备接口建立，工程列表实测从 0 到 1。入口检查和实际视频工程创建均在页面完成。没有通过缺失的目标入口创建工程。

- 测试项目：ERYE199-051-v3-生产-20261123（c65ba614-d548-44f5-9e75-708c8696662b）
- 同一会话：[b415728a-1420-411f-b3c2-ff9d86abd371](https://app.cinlink.ai/c/b415728a-1420-411f-b3c2-ff9d86abd371)
- 视频工程：F20-English-source-with-BGM.mp4（4c640098-4b2d-4afb-8473-989bc67c8e70）

| 阶段 | 预期 | 实际 | 结果 | 证据 |
|---|---|---|---|---|
| 无视频工程 | 「新建视频工程」可见、可点击 | 工程菜单显示「暂无工程」，空态只有「选择媒体」。 | 失败 | [原图](evidence-051-v3-production-20261123/01-empty-entry-missing.png) |
| 建立工程后 | 入口隐藏，工程可打开 | 通过「选择媒体」建立唯一视频工程，预览已加载。同一工程菜单只列出本工程，入口不显示。 | 通过 | [原图](evidence-051-v3-production-20261123/02-created.png) |
| 刷新并打开编辑区 | 同一工程可打开，入口仍隐藏 | 会话和工程 ID 与刷新前一致，工程正常加载，菜单仍只有本工程。 | 通过 | [原图](evidence-051-v3-production-20261123/03-refreshed.png) |

[新版用例](cases.md#erye199-051-current-v3) · [执行状态](execution-status-051-v3-production-20261123.json) · [阶段核验](evidence-051-v3-production-20261123/verification.json) · [原图校验清单](evidence-051-v3-production-20261123/manifest.json)

当前 142 条有效用例为 46 Passed、21 Failed、1 Blocked、21 Not Applicable、53 Not Run。 本轮只执行 051 v3，自动化登记保持 PLAN。
