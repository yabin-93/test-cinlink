# ERYE-237 用例优化与全量复核（2026-11-06）

后续执行：已按新版工程前置重新执行001～005，最新为5 Failed/139 Not Run，见[2026-11-06第2批报告](results-001-005-prod-20261106-r2.md)。以下内容是本文件对应的历史批次/优化时点记录。

本次只修改本地用例和证据口径，不新增产品任务、不改云效、产品代码或Figma。依据用户对图片工程创建方式的补充，以及已保存的001～003报告与工具冒烟；没有重新获取外部需求。

保留144个ID、P0 95/P1 48/P2 1、来源和需求覆盖。版本更新为2026-11-06-project-baseline，全部PLAN，002/003仍仅部分CUA脚本。主要调整：素材/会话项目/图片工程分离；上传后处理与生成后自动建工程；S0/P1/G1与V1映射；页面业务和P-API专项分层；人工空文档确认；准备与正式任务费用分账。

## 逐组审查

| 范围 | 主题 | 前置处理 | 验收处理 |
|---|---|---|---|
| 001～013 | 打开/视图 | 已有目标工程；多图逐张验证；003人工确认空状态 | 画布/标题/实际版本；收起不等于关闭，查看不重复处理 |
| 014～032 | 绘制/历史 | 已有工程及本例真实对象；几何标准以实际源版重建 | 笔迹/文字/形状、撤销和重新打开保存；内部对象专项另证 |
| 033～050 | 批注/引用 | 可进入批注的工程；按实际源图重标锚点 | 点位、正文、来源及引用联动；边界/后端绕过分支单独取证 |
| 051～062 | Agent任务 | 工程来源和保留区明确；多源分别绑定 | 真实问答/产图与任务阶段；不以规划或纯回复替代执行 |
| 063～076 | AI工具/比例 | 已建工程，实际源版冻结质量/像素标准 | 直接执行和草稿模式分支；真实alpha、mask、尺寸及结果 |
| 077～088 | 导出/草稿 | 已有工程和适用草稿；087为生成数量专项例外 | 实际文件、保存、历史及未执行意图区别；不要求先改异常输入 |
| 089～104 | 契约/并发 | P-API实际接口和隔离夹具；相关操作另准备真实工程 | 保留schema/修订/原子性/幂等内部语义；无证据不以UI代验 |
| 105～123 | 阶段/费用 | P-API本例任务阶段、故障控制和账务读权限 | 保留查证、取消、重复收费和恢复断言；准备费用与正式任务分账 |
| 124～136 | 输入/权限/质量 | 合法输入后再建工程；坏图/越权拒绝不强制处理 | 格式/安全及实际质量；固定图基于实际源版；兼容专项独立 |
| 137～144 | 拟定策略/资料 | P-API及相应批准策略/质量集/环境 | 保留门禁和指标；不以当前实现反推标准或放宽发布验收 |

001～005重写可执行步骤与预期；全部条目复核并按需加入B-IMG/B-MULTI/P-API，格式拒绝/限额生成/交付资料不强制先建编辑工程。修正032网格图却指瓶盖、033网格图却指耳钉、076香水瓶却要求耳朵耳机等样本不一致；几何/质量样本均须以实际工程源版冻结，不把前置处理后的图套用原S0金标。063按当前直接去背景与草稿意图分开，保留需求差异观察。

## 历史结果复核

| 用例 | 最新判定 | 依据与边界 |
|---|---|---|
| 001 | Failed（生成图分支） | I2真实提示词生成、按用户规则自动建工程，Agent实际打开失败仍成立；I1上传后未确认处理建工程，分支Blocked，原图预览与工程入口分开复测 |
| 002 | Blocked | 正确目标I2仅上传/手动导入，未确认处理后建图片工程；旧schema错误与画布停留保留为观察，不足以判整例Failed |
| 003 | Blocked | 无打开文档已人工确认，但11.png目标工程/实际版本未确认；正式指令和补槽过程保留，不算有效前置下失败 |
| 004～144 | Not Run | 本次用例优化不产生新执行结果 |

汇总：**1 Failed / 2 Blocked / 141 Not Run**。云效FWXC-351/352/357未修改或关闭，本地缺陷只补复核边界；后续正确前置重跑后再同步结论，不抹除原始证据。

## 后续执行清单

1. 分析并选用用户授权素材；优先复用已生成且可验证的真实图片工程。导入分支如需新处理，单独记录授权范围内的明确处理指令与费用。
2. 核对工程可进入图片编辑/批注，记录实际基线版本、画布、历史和文件。处理图不能充当不变原图或另一版本。
3. 对002逐张建好工程，再固定三图顺序；对003先验证目标工程可访问，再进入空文档会话并留另一窗口对照。
4. 将部分脚本的旧目标、版本描述和前置校验适配本例，再执行一次正式目标；补槽继续，受理后不自动重发。
5. 分别记录页面业务、内部专项和费用覆盖，前置不足Blocked；不能仅凭缺内部ID判失败，也不能凭“已完成”判成功。

## 逐例复核索引

| ID | 适用准备规则 |
|---|---|
| ERYE237-001 | B-MULTI |
| ERYE237-002 | B-MULTI |
| ERYE237-003 | B-IMG、B-EMPTY |
| ERYE237-004 | BV |
| ERYE237-005 | B0 |
| ERYE237-006 | B-IMG、BV |
| ERYE237-007 | B-IMG |
| ERYE237-008 | B-IMG |
| ERYE237-009 | B-IMG |
| ERYE237-010 | B-IMG |
| ERYE237-011 | B-IMG、B0 |
| ERYE237-012 | B-IMG、B-MULTI |
| ERYE237-013 | B-IMG、B-MULTI、B0 |
| ERYE237-014 | B-IMG、B0 |
| ERYE237-015 | B-IMG、B0 |
| ERYE237-016 | B-IMG |
| ERYE237-017 | B-IMG |
| ERYE237-018 | B-IMG、B0 |
| ERYE237-019 | B-IMG、B0 |
| ERYE237-020 | B-IMG、B0 |
| ERYE237-021 | B-IMG |
| ERYE237-022 | B-IMG |
| ERYE237-023 | B-IMG |
| ERYE237-024 | B-IMG |
| ERYE237-025 | B-IMG |
| ERYE237-026 | B-IMG |
| ERYE237-027 | B-IMG、BV |
| ERYE237-028 | B-IMG、BV |
| ERYE237-029 | B-IMG |
| ERYE237-030 | B-IMG |
| ERYE237-031 | B-IMG、BV |
| ERYE237-032 | B-IMG、B0 |
| ERYE237-033 | B-IMG |
| ERYE237-034 | B-IMG |
| ERYE237-035 | B-IMG |
| ERYE237-036 | B-IMG |
| ERYE237-037 | B-IMG |
| ERYE237-038 | B-IMG |
| ERYE237-039 | B-IMG |
| ERYE237-040 | B-IMG |
| ERYE237-041 | B-IMG |
| ERYE237-042 | B-IMG |
| ERYE237-043 | B-IMG |
| ERYE237-044 | B-IMG |
| ERYE237-045 | B-IMG |
| ERYE237-046 | B-IMG |
| ERYE237-047 | B-IMG |
| ERYE237-048 | B-IMG |
| ERYE237-049 | B-IMG |
| ERYE237-050 | B-IMG、B-MULTI |
| ERYE237-051 | B-IMG |
| ERYE237-052 | B-IMG、B0 |
| ERYE237-053 | B-IMG |
| ERYE237-054 | B-IMG |
| ERYE237-055 | B-IMG、B-MULTI、B0 |
| ERYE237-056 | B-IMG、B-MULTI、B0 |
| ERYE237-057 | B-IMG |
| ERYE237-058 | B-IMG |
| ERYE237-059 | B-IMG |
| ERYE237-060 | B-IMG |
| ERYE237-061 | B-IMG |
| ERYE237-062 | B-IMG |
| ERYE237-063 | B0 |
| ERYE237-064 | B-IMG |
| ERYE237-065 | B-IMG |
| ERYE237-066 | B-IMG |
| ERYE237-067 | B-IMG、B0 |
| ERYE237-068 | B-IMG |
| ERYE237-069 | B-IMG |
| ERYE237-070 | B-IMG |
| ERYE237-071 | B-IMG、B0 |
| ERYE237-072 | B-IMG |
| ERYE237-073 | B-IMG |
| ERYE237-074 | B-IMG |
| ERYE237-075 | B-IMG |
| ERYE237-076 | B-IMG |
| ERYE237-077 | B-IMG |
| ERYE237-078 | B-IMG |
| ERYE237-079 | B-IMG、B0 |
| ERYE237-080 | B-IMG |
| ERYE237-081 | B-IMG |
| ERYE237-082 | B-IMG、B0 |
| ERYE237-083 | B-IMG |
| ERYE237-084 | B-IMG |
| ERYE237-085 | B-IMG |
| ERYE237-086 | B-IMG |
| ERYE237-087 | P及本例专用数据；不统一强制图片工程 |
| ERYE237-088 | B-IMG、B-MULTI |
| ERYE237-089 | P-API |
| ERYE237-090 | B-IMG、P-API |
| ERYE237-091 | B-IMG、B0、P-API |
| ERYE237-092 | B-IMG、B0、P-API |
| ERYE237-093 | B-IMG、P-API |
| ERYE237-094 | B-IMG、P-API |
| ERYE237-095 | B-IMG、P-API |
| ERYE237-096 | B-IMG、P-API |
| ERYE237-097 | B-IMG、P-API |
| ERYE237-098 | B-IMG、P-API |
| ERYE237-099 | B-IMG、P-API |
| ERYE237-100 | B-IMG、P-API |
| ERYE237-101 | B-IMG、P-API |
| ERYE237-102 | B-IMG、P-API |
| ERYE237-103 | B-IMG、P-API |
| ERYE237-104 | B-IMG、B0、P-API |
| ERYE237-105 | B-IMG、P-API |
| ERYE237-106 | B-IMG、P-API |
| ERYE237-107 | B-IMG、P-API |
| ERYE237-108 | B-IMG、P-API |
| ERYE237-109 | B-IMG、P-API |
| ERYE237-110 | B-IMG、P-API |
| ERYE237-111 | B-IMG、P-API |
| ERYE237-112 | B-IMG、P-API |
| ERYE237-113 | B-IMG、P-API |
| ERYE237-114 | B-IMG、P-API |
| ERYE237-115 | B-IMG、P-API |
| ERYE237-116 | B-IMG、P-API |
| ERYE237-117 | B-IMG、P-API |
| ERYE237-118 | B-IMG、P-API |
| ERYE237-119 | B-IMG、P-API |
| ERYE237-120 | B-IMG、P-API |
| ERYE237-121 | B-IMG、P-API |
| ERYE237-122 | B-IMG、P-API |
| ERYE237-123 | B-IMG、P-API |
| ERYE237-124 | B-IMG |
| ERYE237-125 | P-API |
| ERYE237-126 | P-API |
| ERYE237-127 | B-IMG |
| ERYE237-128 | P-API |
| ERYE237-129 | B-IMG |
| ERYE237-130 | B-IMG、P-API |
| ERYE237-131 | B-IMG |
| ERYE237-132 | B-IMG |
| ERYE237-133 | P-API |
| ERYE237-134 | B-IMG |
| ERYE237-135 | B-IMG |
| ERYE237-136 | P及本例专用数据；不统一强制图片工程 |
| ERYE237-137 | B-IMG、P-API |
| ERYE237-138 | B-IMG、P-API |
| ERYE237-139 | B-IMG、P-API |
| ERYE237-140 | B-IMG |
| ERYE237-141 | B-IMG、P-API |
| ERYE237-142 | B-IMG、P-API |
| ERYE237-143 | B-IMG |
| ERYE237-144 | P及本例专用数据；不统一强制图片工程 |

校验：144个ID、优先级分布、来源列与锚点列均与仓库原版逐项一致；用例检查器543条、0问题。正文步骤和前置按本次业务口径优化。
