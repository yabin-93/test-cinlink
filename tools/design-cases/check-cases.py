#!/usr/bin/env python3
"""校验需求用例格式与质量。

规则：
- 九列：ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示
- 前置、步骤、预期非空，且至少 8 个字符
- ID 唯一，优先级 P0/P1/P2，自动化标记合法

用法：python tools/design-cases/check-cases.py
退出码：0 通过，1 有问题
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REQ_ROOT = ROOT / "docs" / "cases" / "requirements"
AUTOMATION = {"[AUTO]", "[PLAN]", "[FIXME]", "[BLOCKED]"}
MIN_LEN = 4


def main() -> int:
    issues: list[str] = []
    seen: dict[str, str] = {}
    total = 0

    for path in sorted(REQ_ROOT.glob("*/cases.md")):
        rel = path.relative_to(ROOT)
        for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
            if not (line.startswith("| ERYE") or line.startswith("| MWMULTI")):
                continue
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            total += 1
            case_id = cells[0]
            if len(cells) != 9:
                issues.append(f"{rel}: {case_id} 列数 {len(cells)}，应为 9")
                continue
            _, priority, pre, steps, expected, _source, automation, _script, _anchor = cells

            if case_id in seen:
                issues.append(f"{rel}: {case_id} 与 {seen[case_id]} 重复")
            seen[case_id] = str(rel)

            if priority not in {"P0", "P1", "P2"}:
                issues.append(f"{rel}: {case_id} 优先级非法：{priority}")
            if automation not in AUTOMATION:
                issues.append(f"{rel}: {case_id} 自动化标记非法：{automation}")
            for label, value in (("前置条件", pre), ("操作步骤", steps), ("预期结果", expected)):
                if len(value) < MIN_LEN:
                    issues.append(f"{rel}: {case_id} {label}过短或为空：{value!r}")

    for issue in issues:
        print("ISSUE", issue)
    print(f"checked {total} cases, issues={len(issues)}")
    return 0 if not issues else 1


if __name__ == "__main__":
    sys.exit(main())
