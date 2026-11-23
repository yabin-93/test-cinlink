# ERYE-199 多轨组合用例归并说明

后续执行更新：本文保留归并时的历史统计；当前142条及069～075的生产执行结果见[当前进度](execution-status-current.md)和[七条实跑报告](results-069-075-production-20261118.md)，不再将这7条计为Not Run。

日期：2026-11-18。用户明确要求补充到ERYE-199用例，本次归属调整以此授权为准。

原48条ECMT定义已完整并入[cases.md第十五章](cases.md#erye199-card-multitrack)，续编069～116，不复用已删除编号；旧目录仅保留跳转和映射，不再计独立专项。完整提示词、三轨/五轨基线、六类组合、分割与三类拖拽、视频/BGM双向关联及其他轨保持的验收不变。

有效用例110条：原62条结果逐条保持，新增48条Not Run（34 P0/14 P1）、自动化PLAN。现行总优先级62 P0/46 P1/2 P2。未执行浏览器测试、未生成/导出、未云效写入、未接入新增执行脚本。旧结果/截图/缺陷关联保留。

## 旧编号与正式编号

| 原编号（只作历史别名） | ERYE-199正式编号 |
|---|---|
| ECMT-001 | [ERYE199-069](cases.md#erye199-card-multitrack) |
| ECMT-002 | [ERYE199-070](cases.md#erye199-card-multitrack) |
| ECMT-003 | [ERYE199-071](cases.md#erye199-card-multitrack) |
| ECMT-004 | [ERYE199-072](cases.md#erye199-card-multitrack) |
| ECMT-005 | [ERYE199-073](cases.md#erye199-card-multitrack) |
| ECMT-006 | [ERYE199-074](cases.md#erye199-card-multitrack) |
| ECMT-007 | [ERYE199-075](cases.md#erye199-card-multitrack) |
| ECMT-008 | [ERYE199-076](cases.md#erye199-card-multitrack) |
| ECMT-009 | [ERYE199-077](cases.md#erye199-card-multitrack) |
| ECMT-010 | [ERYE199-078](cases.md#erye199-card-multitrack) |
| ECMT-011 | [ERYE199-079](cases.md#erye199-card-multitrack) |
| ECMT-012 | [ERYE199-080](cases.md#erye199-card-multitrack) |
| ECMT-013 | [ERYE199-081](cases.md#erye199-card-multitrack) |
| ECMT-014 | [ERYE199-082](cases.md#erye199-card-multitrack) |
| ECMT-015 | [ERYE199-083](cases.md#erye199-card-multitrack) |
| ECMT-016 | [ERYE199-084](cases.md#erye199-card-multitrack) |
| ECMT-017 | [ERYE199-085](cases.md#erye199-card-multitrack) |
| ECMT-018 | [ERYE199-086](cases.md#erye199-card-multitrack) |
| ECMT-019 | [ERYE199-087](cases.md#erye199-card-multitrack) |
| ECMT-020 | [ERYE199-088](cases.md#erye199-card-multitrack) |
| ECMT-021 | [ERYE199-089](cases.md#erye199-card-multitrack) |
| ECMT-022 | [ERYE199-090](cases.md#erye199-card-multitrack) |
| ECMT-023 | [ERYE199-091](cases.md#erye199-card-multitrack) |
| ECMT-024 | [ERYE199-092](cases.md#erye199-card-multitrack) |
| ECMT-025 | [ERYE199-093](cases.md#erye199-card-multitrack) |
| ECMT-026 | [ERYE199-094](cases.md#erye199-card-multitrack) |
| ECMT-027 | [ERYE199-095](cases.md#erye199-card-multitrack) |
| ECMT-028 | [ERYE199-096](cases.md#erye199-card-multitrack) |
| ECMT-029 | [ERYE199-097](cases.md#erye199-card-multitrack) |
| ECMT-030 | [ERYE199-098](cases.md#erye199-card-multitrack) |
| ECMT-031 | [ERYE199-099](cases.md#erye199-card-multitrack) |
| ECMT-032 | [ERYE199-100](cases.md#erye199-card-multitrack) |
| ECMT-033 | [ERYE199-101](cases.md#erye199-card-multitrack) |
| ECMT-034 | [ERYE199-102](cases.md#erye199-card-multitrack) |
| ECMT-035 | [ERYE199-103](cases.md#erye199-card-multitrack) |
| ECMT-036 | [ERYE199-104](cases.md#erye199-card-multitrack) |
| ECMT-037 | [ERYE199-105](cases.md#erye199-card-multitrack) |
| ECMT-038 | [ERYE199-106](cases.md#erye199-card-multitrack) |
| ECMT-039 | [ERYE199-107](cases.md#erye199-card-multitrack) |
| ECMT-040 | [ERYE199-108](cases.md#erye199-card-multitrack) |
| ECMT-041 | [ERYE199-109](cases.md#erye199-card-multitrack) |
| ECMT-042 | [ERYE199-110](cases.md#erye199-card-multitrack) |
| ECMT-043 | [ERYE199-111](cases.md#erye199-card-multitrack) |
| ECMT-044 | [ERYE199-112](cases.md#erye199-card-multitrack) |
| ECMT-045 | [ERYE199-113](cases.md#erye199-card-multitrack) |
| ECMT-046 | [ERYE199-114](cases.md#erye199-card-multitrack) |
| ECMT-047 | [ERYE199-115](cases.md#erye199-card-multitrack) |
| ECMT-048 | [ERYE199-116](cases.md#erye199-card-multitrack) |

[当前进度](execution-status-current.md) · [新增逐例状态](execution-status-multitrack-20261118.json) · [页面观察说明](multitrack-design-notes-20261118.md)。历史ECMT文档校验报告只证明旧设计格式，不代表执行过正式新编号用例。
