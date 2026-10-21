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

HEADERS = ["模块", "用例ID", "优先级", "类型", "用例标题", "前置条件", "操作步骤", "预期结果", "设计来源", "可自动化", "设计页面"]


def split_row(line: str) -> list[str]:
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    return [cell.replace("<br>", "\n") for cell in cells]


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
        elif len(cells) >= 5 and cells[0].startswith("IE-"):
            # ERYE-237 文档使用「编号/优先级/步骤/预期/来源」五列，这里补齐标准列
            case_id, priority, steps, expected, source = cells[:5]
            rows.append([
                case_id, priority, "功能", steps[:60], "", steps, expected, source, "待评估",
            ])
    return title, page, rows


def main() -> None:
    modules = []
    for path in sorted(CASE_DIR.glob("[0-9][0-9]-*.md")):
        if path.name.startswith("00-"):
            continue
        modules.append(parse_module(path))

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
    for title, page, rows in modules:
        for cells in rows:
            values = [title] + cells[:9] + [page]
            sheet.append(values)
            for column in range(1, len(HEADERS) + 1):
                cell = sheet.cell(row=row_index, column=column)
                cell.alignment = wrap
                cell.border = border
            priority = cells[1] if len(cells) > 1 else ""
            if priority in priority_fill:
                sheet.cell(row=row_index, column=3).fill = priority_fill[priority]
            row_index += 1

    widths = [26, 12, 8, 8, 34, 30, 40, 44, 38, 16, 28]
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
    for title, page, rows in modules:
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
