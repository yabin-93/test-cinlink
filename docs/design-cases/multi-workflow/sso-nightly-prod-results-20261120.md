# SSO全量生产夜间测试（2026-11-20）

状态：**Blocked（执行前）**。生产环境 https://app.cinlink.ai/；27例、129正式轮配置已重新从最新tests/sso定义提取，未混入MW或其他回归。

本日实际业务提交0、正式生成执行0；计划用例统计：Passed 0 / Failed 0 / Blocked 27 / 待复核0。计划轮次：Passed 0 / Failed 0 / Blocked 129 / 待复核0。这里Blocked仅为前置控制阻塞，不是129轮均已执行失败。

## 阻塞与需要的操作

ego执行器在上一批2026-11-19 10:54:58北京时间报告TaskSpace38已结束并不再归Agent控制。今天仅调用只读窗口清单核实：38仍存在，ownership=user；没有接管、操作该窗口、另开窗口绕过或重发原run。原SSO017 R2已受理，最后观测为running，当前终态未知，因此上批尚不能确认安全结束，今日新批未启动。

请回复“继续使用38测试窗口”，允许接回原窗口；先只回读旧SSO017 R2的run_v2_1c115e95a5a04f3c8b577d69303997b8，再按原检查点处理。不得跨日重发该已受理任务。

依据[ego-browser技能](/Users/edy/.agents/skills/ego-browser/SKILL.md)：
> Claim a user-owned or inactive space only when the user explicitly asks

该要求适用于已结束并归用户控制的38窗口；当前定时执行授权不替代工具要求的明确恢复该窗口指示。登录态因此未实际核验，不推测登录失效。

## 本机素材预检

7MB.mp4真实存在：7815126字节、1280×720、60.50秒、AAC 44100Hz立体声；本次完整解码退出0。SHA256：`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。证据：reports/sso-nightly-prod-20261120/source-check.json及source-metadata.txt。

## 逐例状态

| 用例 | 计划轮数 | 本日提交轮数 | 状态 |
|---|---:|---:|---|
| SSO-001 | 2 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-002 | 3 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-003 | 4 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-004 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-005 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-006 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-007 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-008 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-009 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-010 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-011 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-012 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-013 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-014 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-015 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-016 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-017 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-018 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-019 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-020 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-021 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-022 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-023 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-024 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-025 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-026 | 5 | 0 | Blocked：浏览器控制前置未满足 |
| SSO-027 | 5 | 0 | Blocked：浏览器控制前置未满足 |

## 保留的上一批状态

[2026-11-19报告](sso-nightly-prod-results-20261119.md)：当前本机检查点为37轮Passed、32轮Failed、6轮待内容复核、1轮终态回读Blocked，另53轮未提交。016 R5仍待内容复核；017 R1完成实际历史重开并通过，017 R2终态未确认。不以这些旧结果替代本日实测。

固定Playwright脚本登记不因本次预检改变；本机辅助器也不冒称固定自动化接入。云效写入0、Git提交/推送0、统一导航README写入0。每日02:00任务保留；Ego提示可更新，本次未升级。
