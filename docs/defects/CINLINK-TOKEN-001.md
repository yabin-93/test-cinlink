# 缺陷报告 · 部分多工作流任务报 “Missing CinLink access token or API key.”

| 字段 | 内容 |
|---|---|
| 缺陷 ID | CINLINK-TOKEN-001（本地编号，提交云效后以工作项为准） |
| 标题 | 多工作流任务（去口癖/长变短/文字水印）提交后 agent 直接 Failed：Missing CinLink access token or API key |
| 严重级别 | **高（P1）**：任务无法执行，用户只看到 Failed 与凭证错误，无产物 |
| 状态 | **本地复测通过，本轮未复现**（2026-11-03 17:10–17:21，MW-24/25/26 3 passed）；已核对云效[FWXC-242](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=eb0c12526cebd6614f7735a894)仍待确认，本次未改云效状态 |
| 自动化状态 | 复测后已移除 MW-24/25/26 的 `fixme`，三条均恢复默认执行，无需强制开关 |
| 发现日期 | 2026-11-03 |
| 环境 | 预发 `https://staging-app.cinlink.ai`，新版工作台 `/studio/workspace` |
| 账号 | `yabinc18` / `acct_603598179755` |
| 涉及用例 | MW-24 去口癖→中文字幕、MW-25 长变短→中文字幕、MW-26 文字水印→英文字幕 |
| 对照用例 | MW-23 字幕链（中文→英文→烧录）同一批次 **通过**，说明不是全站不可用 |
| 证据 | `reports/attachments/mw24-token-fail.png`、`reports/mw23-26-20261103b.log` |

---

## 最新复测：2026-11-03 Codex

恢复人工登录后，使用 `CINLINK_INCLUDE_BLOCKED=1`，单 worker、零重试执行原三条用例：

| 用例 | 结果 | 耗时 |
|---|---|---|
| MW-24 | passed | 230.125 秒 |
| MW-25 | passed | 231.181 秒 |
| MW-26 | passed | 182.280 秒 |

三条现有产物断言均通过，原凭据缺失错误本轮未复现。此次结论为本地复测结果，未核对或修改云效状态。复测阶段曾保留默认 FIXME，随后已按用户要求移除，三条现已默认执行。原失败现象与证据保留在下方。

报告：`reports/mw24-26-20261103-171012/html/index.html`；机器结果：同目录 `junit.xml`、`results.json`。完整 run_id 与命令见 `docs/verification.md` 的 Codex 复测记录。

## 1. 现象

三条多工作流 P0 用例提交后，会话中出现：

```
agent
Failed
Missing CinLink access token or API key.
[Retry]
```

底部同时出现红色提示：`Missing CinLink access token or API key.`，run 直接失败，0 产物。

同一批次的 MW-23（字幕链：中文→英文→烧录）正常通过（3.1 分钟），说明不是整体服务不可用，而是**特定工作流调用链缺少 CinLink 访问凭证**。

## 2. 复现步骤

1. 登录预发，新建非项目会话；
2. 上传 `7MB.mp4` 并 `@` 引用；
3. 分别发送以下指令之一：

   ```
   去掉这个视频里的口水词和重复语气词，然后加中文字幕并烧录，输出清理后的带字幕视频
   ```

   ```
   把这个视频剪成 30 秒的高光短视频，并加中文字幕烧录，输出成片视频
   ```

   ```
   给这个视频加文字水印（文字内容 E2E-P0），再把中文字幕翻译成英文并烧录，输出成片视频
   ```

4. 等待任务执行。

## 3. 实际结果

| 用例 | 耗时 | 结果 |
|---|---|---|
| MW-24 去口癖→中文字幕 | 2.6m | Failed：Missing CinLink access token or API key |
| MW-25 长变短→中文字幕 | 3.8m | Failed：同上 |
| MW-26 文字水印→英文字幕 | 2.6m | Failed：同上 |
| MW-23 字幕链 | 3.1m | ✅ 通过，1 个 video 产物 |

## 4. 预期结果

任务正常执行并产出视频；若凭证缺失，应在提交前返回明确错误，而不是创建 run 后 Failed。

## 5. 影响

- 去口癖、长变短、文字水印三类工作流当前不可用；
- 用户看到 Failed 与英文凭证错误，无法自助恢复；
- 新增的 P0 多工作流用例只能保持 fixme。

## 6. 可能原因（推测）

- 工作流执行器访问 CinLink 服务时未带 access token / API key；
- 预发环境缺少对应凭证配置；
- 仅部分工作流（clean-cut / shorten / watermark）走该凭证通道，因此 MW-23 不受影响。

## 7. 自动化

- `tests/staging/g3-g7-multi-compound.spec.ts`：MW-24/25/26 标 `[FIXME]`，原因写为本次报错；
- 恢复后去掉 fixme 直接复测三条。


## 2026-11-05 关联问题核对

已核对原云效FWXC-242仍待确认，旧项未修改。SSO-017本次发生于提交前认证恢复阶段，无新run，伴随重复刷新401/429及视频播放失败；已单独提交[FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)，尚无同根因证据，不将其强行并为旧工作流凭证缺失。
