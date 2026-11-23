# 电商旧批次执行历史

用户已要求新建项目、按文档原文重跑。本文件仅保留旧批次，不计入当前结果。

| 用例 | 旧批状态 | 说明 |
|---|---|---|
| ICP-EC-01 | Not Run | 旧批未执行。 |
| ICP-EC-02 | Superseded | 用户要求原文提示词、新建项目重跑；旧批次停止并保留历史，不计入新轮结果。 |
| ICP-EC-03 | Not Run | 旧批未执行。 |
| ICP-EC-04 | Not Run | 旧批未执行。 |
| ICP-EC-05 | Failed | 补齐产品正文和PNG Logo后，首轮生成视频报Tencent VOD video processing failed at the provider，无成片；后续4轮缺少可修改成片，未执行。 |

旧批原始记录：`reports/dingtalk-cases-93NwLY-20261116/`；旧Case05失败截图和任务记录保留。新轮见[当前进度](execution-status-current.md)。