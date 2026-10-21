"""把 docs/design-cases/*.md 的用例表汇总成 Excel。

用法：python tools/design-cases/build-xlsx.py
输出：reports/design-cases.xlsx
"""

from __future__ import annotations

import re
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[2]
CASE_DIR = ROOT / "docs" / "design-cases"
OUT = ROOT / "reports" / "design-cases.xlsx"

HEADERS = ["模块", "用例ID", "优先级", "类型", "用例标题", "前置条件", "操作步骤", "预期结果", "设计来源", "可自动化", "设计页面", "来源类型"]


def split_row(line: str) -> list[str]:
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    return [cell.replace("<br>", "\n") for cell in cells]



IE_PRECONDITIONS = {
    # 3.1 打开与版本
    "IE-001": "已登录；会话中存在至少一张图片",
    "IE-002": "已通过 Agent 生成或引用一张图片，图片卡片可见",
    "IE-003": "已从图片卡片或 Agent 打开图像编辑器",
    "IE-004": "同一文档存在 2 个以上版本",
    "IE-005": "已打开图片并完成一次生成，当前有新结果",
    "IE-006": "文档存在历史版本，且其后还有更新版本",
    "IE-007": "已提交一次生成，任务处于处理中",
    "IE-008": "已打开图片，画布与缩放控件可用",
    "IE-009": "窗口宽度较小（如 < 1024px），项目导航可见",
    # 3.2 画笔/文字/形状
    "IE-010": "已打开图片；未处于其他工具模式",
    "IE-011": "已进入画笔模式，未做任何绘制",
    "IE-012": "已进入画笔模式，画布无实际修改",
    "IE-013": "已进入画笔模式，画布上存在可选中对象",
    "IE-014": "已进入画笔模式并选择自由画笔",
    "IE-015": "已进入画笔模式并选择自由画笔，画布有笔迹",
    "IE-016": "已进入画笔模式并选择文字工具",
    "IE-017": "已创建一段中文文字对象",
    "IE-018": "已进入画笔模式并选择形状工具",
    "IE-019": "画笔模式，已选中可上色对象",
    "IE-020": "画笔模式，颜色面板与吸管可用",
    "IE-021": "画笔模式，已选中对象",
    "IE-022": "画笔模式，画布上有自由笔迹",
    "IE-023": "画笔模式，画布上有文字或形状对象",
    "IE-024": "画笔模式，存在可撤销的操作",
    "IE-025": "画笔模式，存在尚未发送的修改",
    "IE-026": "画笔模式，已完成至少一笔绘制",
    "IE-027": "画笔模式，已圈选或框选一个区域",
    "IE-028": "画笔模式，画布上存在对象",
    "IE-029": "已完成一次 AI 生成，结果版本已加载",
    # 3.3 批注与引用
    "IE-030": "已打开图片并进入批注模式",
    "IE-031": "已打开图片并进入批注模式",
    "IE-032": "已创建批注草稿，对象候选尚未返回",
    "IE-033": "已创建批注草稿，对象识别失败",
    "IE-034": "已创建批注草稿并输入评论",
    "IE-035": "已创建至少一个批注草稿",
    "IE-036": "同一批注已存在草稿或已添加到对话",
    "IE-037": "已有草稿批注及其引用标签",
    "IE-038": "已有完整批注草稿（点、评论、对象）",
    "IE-039": "已发送一次批注提交",
    "IE-040": "已发送过批注消息，历史消息存在",
    "IE-041": "已有 10 条批注草稿，准备添加第 11 条",
    "IE-042": "已创建批注草稿，输入框可编辑",
    "IE-043": "已创建批注草稿，对象标签可编辑",
    "IE-044": "会话中存在两张以上图片，且均打开过编辑器",
    "IE-045": "已打开图片，输入框可用",
    "IE-046": "已打开图片，输入框可用",
    "IE-047": "已打开图片，输入框可用",
    "IE-048": "已打开图片，输入框可用",
    "IE-049": "已创建编号点与选区，导出入口可用",
    "IE-050": "已完成一次生成，存在历史批注消息",
    # 3.4 去背景/擦除/比例
    "IE-051": "已打开图片，工具入口可见",
    "IE-052": "已提交一次移除背景任务",
    "IE-053": "移除背景结果已生成，预览为透明",
    "IE-054": "已打开图片并进入擦除工具",
    "IE-055": "已进入擦除工具，未涂抹有效区域",
    "IE-056": "已进入擦除工具并涂抹有效 mask",
    "IE-057": "已打开图片并进入比例调整",
    "IE-058": "已选择过一次目标比例",
    "IE-059": "已选择目标比例，输出尺寸已展示",
    "IE-060": "已有批注草稿与全局意图",
    "IE-061": "图片中包含文字或品牌信息",
    "IE-062": "图片中包含商品主体",
    "IE-063": "图片中存在遮挡、缺失或非正面结构",
    # 3.5 状态/导出
    "IE-064": "已提交一次图像编辑任务",
    "IE-065": "任务处于处理中",
    "IE-066": "任务已完成",
    "IE-067": "任务已失败",
    "IE-068": "任务处于处理中",
    "IE-069": "已有可导出的成品版本",
    "IE-070": "任务处理中，编辑器面板可收起",
}


def parse_module(path: Path) -> tuple[str, str, list[list[str]]]:
    text = path.read_text(encoding="utf-8")
    title_match = re.search(r"^#\s+(.+)$", text, re.M)
    title = title_match.group(1).strip() if title_match else path.stem
    page_match = re.search(r"设计页面：`([^`]+)`", text)
    page = page_match.group(1).strip() if page_match else ""

    rows: list[list[str]] = []
    lines = text.splitlines()
    in_table = False
    for line in lines:
        if line.startswith("| ID |") or line.startswith("| 编号 |"):
            in_table = True
            continue
        if not in_table:
            continue
        if not line.startswith("|"):
            # 一个文件里可能有多张表（按 PRD 章节分组），遇到非表格行只退出当前表
            in_table = False
            continue
        if set(line.replace("|", "").strip()) <= {"-"}:
            continue
        cells = split_row(line)
        if len(cells) >= 8 and cells[0].startswith("DC-"):
            rows.append(cells)
        elif len(cells) >= 6 and cells[0].startswith("IE-"):
            # ERYE-237 文档使用「编号/优先级/前置/步骤/预期/来源」六列
            case_id, priority, precondition, steps, expected, source = cells[:6]
            rows.append([
                case_id, priority, "功能", steps[:60],
                precondition, steps, expected, source, "待评估",
            ])
    return title, page, rows



def parse_req_cases(path: Path) -> tuple[str, str, list[list[str]], str]:
    """解析 docs/cases/requirements/<REQ>/cases.md（九列，含自动化/脚本/锚点）。"""
    text = path.read_text(encoding="utf-8")
    title_match = re.search(r"^#\s+(.+)$", text, re.M)
    title = title_match.group(1).strip() if title_match else path.parent.name
    rows: list[list[str]] = []
    in_table = False
    for line in text.splitlines():
        if line.startswith("| ID |"):
            in_table = True
            continue
        if not in_table:
            continue
        if not line.startswith("|"):
            in_table = False
            continue
        if set(line.replace("|", "").strip()) <= {"-"}:
            continue
        cells = split_row(line)
        if len(cells) >= 9 and cells[0].startswith("ERYE"):
            case_id, priority, pre, steps, expected, source, automation = cells[:7]
            rows.append([
                case_id, priority, "功能", steps[:60], pre, steps, expected, source, automation,
            ])
    return title, path.parent.name, rows, "需求"


def main() -> None:
    modules = []
    for path in sorted(CASE_DIR.glob("[0-9][0-9]-*.md")):
        if path.name.startswith("00-") or path.name.startswith("16-"):
            continue
        modules.append((*parse_module(path), "设计稿"))

    req_root = ROOT / "docs" / "cases" / "requirements"
    for path in sorted(req_root.glob("*/cases.md")):
        modules.append(parse_req_cases(path))

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "全部用例"

    header_fill = PatternFill("solid", fgColor="1F2937")
    header_font = Font(color="FFFFFF", bold=True)
    thin = Side(style="thin", color="D1D5DB")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    wrap = Alignment(wrap_text=True, vertical="top")

    sheet.append(HEADERS)
    for column, _ in enumerate(HEADERS, start=1):
        cell = sheet.cell(row=1, column=column)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(vertical="center")
        cell.border = border

    priority_fill = {
        "P0": PatternFill("solid", fgColor="FEE2E2"),
        "P1": PatternFill("solid", fgColor="FEF3C7"),
        "P2": PatternFill("solid", fgColor="E0F2FE"),
    }

    row_index = 2
    for title, page, rows, source_type in modules:
        for cells in rows:
            values = [title] + cells[:9] + [page, source_type]
            sheet.append(values)
            for column in range(1, len(HEADERS) + 1):
                cell = sheet.cell(row=row_index, column=column)
                cell.alignment = wrap
                cell.border = border
            priority = cells[1] if len(cells) > 1 else ""
            if priority in priority_fill:
                sheet.cell(row=row_index, column=3).fill = priority_fill[priority]
            row_index += 1

    widths = [26, 14, 8, 8, 34, 30, 40, 44, 38, 12, 28, 10]
    for index, width in enumerate(widths, start=1):
        sheet.column_dimensions[get_column_letter(index)].width = width
    sheet.freeze_panes = "A2"
    sheet.auto_filter.ref = f"A1:{get_column_letter(len(HEADERS))}{row_index - 1}"

    summary = workbook.create_sheet("覆盖地图")
    summary.append(["模块", "设计页面", "用例数", "P0", "P1", "P2"])
    for column in range(1, 7):
        cell = summary.cell(row=1, column=column)
        cell.fill = header_fill
        cell.font = header_font
    total = {"count": 0, "P0": 0, "P1": 0, "P2": 0}
    for title, page, rows, source_type in modules:
        counts = {key: sum(1 for row in rows if len(row) > 1 and row[1] == key) for key in ("P0", "P1", "P2")}
        summary.append([title, page, len(rows), counts["P0"], counts["P1"], counts["P2"]])
        total["count"] += len(rows)
        for key in ("P0", "P1", "P2"):
            total[key] += counts[key]
    summary.append(["合计", "", total["count"], total["P0"], total["P1"], total["P2"]])
    for index, width in enumerate([30, 46, 10, 6, 6, 6], start=1):
        summary.column_dimensions[get_column_letter(index)].width = width
    summary.freeze_panes = "A2"

    OUT.parent.mkdir(parents=True, exist_ok=True)
    workbook.save(OUT)
    print(f"written {OUT} · {total['count']} cases · P0={total['P0']} P1={total['P1']} P2={total['P2']}")


if __name__ == "__main__":
    main()
