# FWXC-642 · 新修复轮待回归（预发窗口阻塞）

【ERYE196-083】独立混音及字幕导出任务完成，但未绑定或交付所要求的译文SRT

本轮官方OpenAPI完整分页569项，候选身份为项目cinlink-WEB、创建者陈亚宾、状态精确已修复。上一17:55快照状态为“处理中”，当前Fixed迁入时间字段为1795523215000，属于真实状态迁入；不是仅按无关updatedAt重跑。修复指纹：`7c4aca1d387662e83b91c4054324f9834d62e4c658dc42a4fe6166d023b231b9`。旧实测只作历史。

原环境：production。计划在预发staging-app.cinlink.ai、Google Chrome有头、yabinc92执行；本轮预发页面及登录态尚未核验，不能声称已实测预发或生产。

原回归 / 扩散一 / 扩散二：均Blocked（共享有头窗口前置），业务执行0、覆盖0。Chrome在运行且库存可见，但当前原生控制返回cgWindowNotFound；标签语义包装器另有timeoutMs读取错误。这是窗口可用性阻塞，不推定权限或登录失效。不修改权限、不切生产、不用后台接口替代、不重放旧请求。已请求用户恢复可见Chrome/必要时解锁并回复。当前无新受理请求。

原描述完整保存于本轮original-context.txt；附件元数据、原截图文件标识及历史报告索引已保存。实际执行前仍须逐项核对原截图、素材及必要前置，不用历史结论冒充本轮实测。

窗口恢复后：先按主账本最新队列和执行锁核验独占执行，确认预发yabinc92及专用素材；每项首次提交前官方GET再次核对身份/创建者/精确Fixed，已非Fixed则移出。本轮独立干净会话及原源基线，首次按完整原步骤/参数/提示词；原与两条适用独立扩散分别判定，补槽填写继续，已受理只回读、零额外业务重试。需要源文件/人工听审/原前置时逐项记录，不能用近似素材静默替代。

当前回归固定脚本PLAN，未因文件整理或CUA前置标记已实现。0云效状态/评论/附件写入、0新缺陷、0Git提交/推送。结果只写独立报告、状态JSON和进度；用例正文、统一README只读。

证据：`reports/fixed-monitor-20261124-220015/cloud/FWXC-642/workitem.json`、`original-context.txt`、`attachment-summary.json`、`reports/fixed-monitor-20261124-220015/attachment-index.json`、`local-history-index.json`、`queue.json`、`browser-preflight-checkpoint.json`。无可用现场截图，不以历史截图冒充本轮现场。

历史报告索引（不等于本轮已执行）：

- `docs/defects/ERYE196-070-090-sync-prod-20261117.md`
- `docs/defects/ERYE196-NL-090-092-095-097-sync-prod-20261117.md`
- `docs/defects/ERYE196-083-PROD-20261117-TRANSLATED-SRT-MISSING.md`
- `docs/defects/E196-NL090100-PROD-20261117-SRT-IMPORT-NOT-APPLIED.md`
