# 03 专业编辑功能（设计追溯）

> 已合并至需求 `ERYE-199`，本文件不再维护重复用例，只保留 Figma 画板到 `ERYE199-*` 的映射。
> 用例正文：[docs/cases/requirements/ERYE-199/cases.md](../cases/requirements/ERYE-199/cases.md)；Excel 构建已排除本模块，避免重复计数。

设计页面：`新增CinLink 专业编辑功能`

画板：`Frame 2117132088`（编辑器全貌）、`Frame 2117132076`、`LeftSidebar`

## 映射表

| 原设计用例 | 画板 | 合并到 | 说明 |
|---|---|---|---|
| DC-03-001 | Frame 2117132088 | `ERYE199-062` | 打开专业编辑器三栏布局 |
| DC-03-002 | LeftSidebar | `ERYE199-063` | 默认 Speech 面板 |
| DC-03-003 | LeftSidebar | `ERYE199-064` | 切换 Subtitles |
| DC-03-004 | LeftSidebar | `ERYE199-064` | 切换 Assets |
| DC-03-005 | Frame 2117132088 | `ERYE199-065` | 播放控制与播放头 |
| DC-03-006 | Frame 2117132088 | `ERYE199-066` | 时间轴缩放/横向滚动 |
| DC-03-007 | Export | `ERYE199-049` | 导出（已由 ERYE-199 覆盖） |
| DC-03-008 | LeftSidebar | `ERYE199-067` | 侧栏收起/展开 |
| DC-03-009 | Frame 2117132088 | `ERYE199-068` | 无字幕/无素材空态 |

## 维护约定

- 新增/修改编辑器 UI 用例，只改 `docs/cases/requirements/ERYE-199/cases.md`；
- 设计稿新增画板时，在本表补一行映射，不复制用例；
- 本文件不参与 `build-xlsx.py` 与 `cases:check` 的计数。
