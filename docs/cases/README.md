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

## 质量要求

每条用例必须写清楚三件事，否则不算完成：

1. **前置条件**：账号/权限、数据状态、页面位置、依赖任务；
2. **操作步骤**：用 `→` 分隔动作，至少两步；含关键参数值；
3. **预期结果**：可观察、可验证；涉及金额/数量/状态时写具体值。

反例：

```text
前置：无
步骤：测试生成
预期：正常
```

正例：

```text
前置：已登录；余额 ≥ 70 积分；图片生成服务可用
步骤：打开 AI 生图 → 选 Medium/1K → 生成 1 张 → 查看结算
预期：实扣 32 积分；账本记录 operation=generate_image、pricing_version、计量=1 张
```

检查命令：

```powershell
npm run cases:check
```

会校验列数、ID 唯一、优先级、自动化标记，以及前置/步骤/预期是否为空或过短。

生成 Excel 前会自动跑一次；不通过会直接阻断 `build-xlsx.py`，不会产出半成品。
