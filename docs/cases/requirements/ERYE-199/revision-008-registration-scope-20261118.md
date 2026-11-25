# ERYE199-008 素材登记与放入：验收口径校正（2026-11-18）

用户要求去掉“素材登记后必须可撤销”的预期。PE02明确登记与放入时间线为两个动作，并列举复制、分割、修剪、换轨、替换素材可撤销；未明确素材库登记必须进入撤销历史。

008 v2保留三类素材的登记、放入和撤销放入检查；自动化入口仍为`tools/editor/erye199/cases.mjs#008`。不读取或点击登记阶段的撤销/重做作为验收步骤。

| 前置/操作 | 预期 |
|---|---|
| 视频、音频、图片分别新建独立空白工程，准备正常素材 | 每种素材均在独立空白时间线开始 |
| 通过页面上传登记，等待素材卡片可见 | 登记成功，时间线仍为空 |
| 将已登记卡片拖入时间线 | 进入对应轨道，素材类型和内容对应 |
| 点击一次撤销 | 仅撤回本次放入，时间线恢复为空 |

当前Passed为**基于2026-11-16既有实测证据的验收校正，2026-11-18未重新执行**。原observations中视频/音频/图片的inserted、placementUndone均为true，原三项失败全部是本次移除的登记撤销断言。旧Failed、原始日志、截图与云效提交正文保留，不将本次校正写成开发已修复。

[原观察数据](evidence-008-scope-correction-20261118/original-observations-20261116.json) · [范围判定](evidence-008-scope-correction-20261118/assessment.json) · [原用例及判定摘要](revision-008-original-20261118.json) · [原实测截图](results-failed-ten-rerun-production-20261116.md#erye199-008)。

云效[FWXC-486](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=1f7044b8c2c88b7d275ef4f643)已由“待确认”更新为“不是问题”，正文已补充验收校正原因；原截图引用及7份附件保持，状态/正文/其他关键字段/附件均已回读。
