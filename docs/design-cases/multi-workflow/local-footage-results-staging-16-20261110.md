# LF-16预发执行记录（2026-11-10）

**Passed（客户端请求失败反馈及恢复范围）。** DevTools阻断真实查询提交入口后页面明确失败，删除规则后同会话重试HTTP 200并完成、机器人可播放。未对服务端内部search_materials注入故障，不将客户端请求失败扩大为后台检索故障覆盖。

环境 https://staging-app.cinlink.ai/，账号yabinc18，macOS Chrome原生CUA有头。项目 `d8fdc734-ddec-4f2d-ac55-e99ff25aab08`，4/4就绪；无重传或重新分析。初始浏览器被切至其他窗口，用户确认停止操作后恢复预发，故障注入及新任务均只在预发专用标签页执行，未在生产注入。

## 正常对照

新空会话 `7d00f206-1b4c-4db9-a304-85614bf4378b` 一次发送：**找出画面里出现黄色机器人，旁边有黑板和桌子的片段。** 47秒完成，返回机器人候选及原相关性候选。通过原生DevTools Network观察本部署实际查询提交为 `POST /runtime-api/v1/conversations/{conversation_id}/turns`。当前没有旧版独立本地检索卡片，使用项目实际对话入口。

## 临时阻断

新空会话 `e330f8f4-47cd-4b61-8a84-7d8f88fb38b7`。DevTools Request conditions仅保留本轮规则：

```text
https://staging-app.cinlink.ai/runtime-api/v1/conversations/*/turns
```

规则仅匹配该浏览器目标标签页的预发会话提交请求，项目加载/素材分析状态/查询历史读取不在规则内。添加规则时DevTools默认创建通配模式，立即改为上述限定模式，修改期间未发送查询，限定规则初始0 affected。

一次发送同一机器人提示词。Network实际显示该会话turns请求 `(blocked:devtools)`、规则1 affected、0字节传输。页面明确“失败 / Failed to fetch (staging-app.cinlink.ai)”，出现“重试”，未显示done或无匹配，未产生候选。失败后发送按钮携带错误提示并禁用；这是存在待重试失败项的状态，不据此认定永久锁死。

## 解除与恢复

删除本轮规则，关闭Enable blocking and throttling；面板明确Nothing throttled or blocked。恢复联网后输入相同提示词时，普通发送仍受失败待重试项限制；清空该未发送草稿，使用页面明确的“重试”入口一次重新提交原失败请求。这是解除故障后的预期恢复动作，不是重复投递已成功任务。

Network同一会话turns新请求HTTP 200，与之前blocked行同时可核验。恢复轮43秒完成，返回match-1-7.mp4等候选；点击首候选，AX出现暂停/浏览器正在播放音频，实际画面为黄色机器人、黑板和桌子。原客户端失败占位被本次成功结果替代，未将失败伪装成无匹配。首候选目标与正常对照一致，现有其他候选相关性仍按FWXC-390等历史问题处理，本例不宣称全部召回质量通过。

最终确认规则为空、开关为0后关闭测试标签页DevTools，无遗留阻断。其他浏览器/系统网络、云端代码和已有缺陷未修改。

## 证据与边界

[4/4就绪](../../../reports/lf16-staging-20261110/ready.jpg) · [限定规则及正常对照](../../../reports/lf16-staging-20261110/blocking-rule.jpg) · [阻断和页面错误](../../../reports/lf16-staging-20261110/blocked-result.jpg) · [完整阻断状态](../../../reports/lf16-staging-20261110/blocked-result.txt) · [解除规则](../../../reports/lf16-staging-20261110/unblocked.jpg) · [恢复完成](../../../reports/lf16-staging-20261110/recovered.jpg) · [恢复预览/规则为空](../../../reports/lf16-staging-20261110/recovery-preview.jpg)。请求取证排除认证头和Cookie，不导出HAR。

本例覆盖客户端提交阶段的网络错误/恢复，没有证明服务端已启动检索后的中断处理，也未验证服务器内部工具错误。源ID/匹配时间不是本例硬条件。Chrome可见资源版本包含index-FQv5Htmc.js，无法据此确认服务端版本。实际费用未核。

总计3次提交动作：正常对照1、被阻断1、解除后显式重试1；后台成功受理两次，阻断的提交无正常HTTP响应。本轮无生成/剪辑、无云效写入。LF16仍PLAN未接脚本；专项最新10 Failed/6 Passed（UI/客户端范围）/1 Not Run，已执行16/17，AUTO3不变。
