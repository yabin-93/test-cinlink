# ERYE199-051 v4 「选择媒体」入口预期更正

用户确认无视频工程时应显示「选择媒体」。已有工程后和刷新后继续检查该空态入口不再显示。新版用例按原生产页面记录复核为 **Passed**，本次未重新执行。

| 阶段 | 复核证据 | 结果 |
|---|---|---|
| 创建前 | 空态可见且启用「选择媒体」。 [原图](evidence-051-v3-production-20261123/01-empty-entry-missing.png) | Passed |
| 创建后 | 点击入口选择 MP4 后成功创建唯一视频工程，预览正常，原空态入口消失。 [原图](evidence-051-v3-production-20261123/02-created.png) | Passed |
| 刷新后 | 会话和工程标识与刷新前一致，预览正常，原空态入口仍未显示。 [原图](evidence-051-v3-production-20261123/03-refreshed.png) | Passed |

当前 142 条有效用例为 47 Passed、20 Failed、1 Blocked、21 Not Applicable、53 Not Run。

[v4 用例](cases.md#erye199-051-current-v4) · [原生产报告](results-051-v3-production-20261123.md) · [页面核验记录](evidence-051-v3-production-20261123/verification.json)
