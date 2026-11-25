> 编号说明：本文为调整前记录，使用旧LF编号；当前范围及编号请查[新旧编号对照](local-footage-id-map-20261124.md)。

# LF-37 V3.2范围调整与结果重评

用户要求阻塞部分不再验证。LF-37当前仅保留“有素材、未分析时创建项目”，删除原B组真实0素材准备、无素材分析拦截及空素材查询，不追加替代用例。

**当前范围：Passed。** 此结论依据2026-11-24 V3.1实际执行的A组证据重评，**不是重新执行，也不代表产品修复**。保留原V3.1整体Blocked、B组阻塞及查询未发送的历史，不将移除分支改判为通过。

| 当前步骤 | 既有实测证据 | 结果 |
|---|---|---|
| 选择1个合法媒体并创建项目 | A-folder-selected.png/.txt：ONLY5，1文件；A-created-unanalysed.png/.txt：已创建且显示7MB.mp4，尚未开始分析 | Passed |
| 跳过分析进入项目 | A-workspace-stable.png/.txt：对应新项目工作台 | Passed |
| 核对素材与分析计数 | A-members.json：唯一7MB.mp4；工作台稳定0/1，0为已分析数、1为媒体总数；本轮未提交分析请求 | Passed |

项目：LF37-V31-未分析创建-20261124，ID c4eaa5f6-a43e-40a2-8b12-75e99a3d1e81。项目名沿用实测对象，不为文档版本升级重新创建。

[原实测报告](local-footage-LF37-v31-staging-20261124.md)及本机证据目录 `reports/local-footage-LF37-v31-staging-20261124/` 保持不变。依据A组证据覆盖当前全部步骤，不以旧空目录创建失败证明无素材禁止分析。

本次仅文档范围调整和结果重评，无浏览器/分析/检索/云效/Git操作。固定脚本PLAN，路径为空；有头执行不等同于已实现自动化。全部66条当前状态为35 Passed、3 Failed、4 Blocked、1 Not Applicable、23 Not Run，AUTO3/PLAN63不变。
