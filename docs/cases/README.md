# 需求用例目录

按需求一个目录，避免和其他需求混在一起。

## 结构

```text
docs/cases/
  README.md
  _template.md
  registry.yaml                 # 用例 ↔ 脚本映射
  requirements/
    ERYE-237/
      meta.yaml                 # 需求元数据
      cases.md                  # 用例正文
```

## 约定

- ID：`<REQ前缀>-<三位序号>`，如 `ERYE237-001`；
- 一需求一目录、一前缀、一 Playwright 标签（`@ERYE-237`）；
- 用例表列：ID / 优先级 / 前置条件 / 操作步骤 / 预期结果 / 来源 / 自动化 / 脚本 / 锚点提示；
- `自动化` 取值：`[AUTO]` / `[PLAN]` / `[FIXME]` / `[BLOCKED]`；
- 脚本落地后同步更新 `registry.yaml` 与 `cases.md` 的「脚本」列；
- Excel 由 `tools/design-cases/build-xlsx.py` 统一生成，不手工维护总表。
