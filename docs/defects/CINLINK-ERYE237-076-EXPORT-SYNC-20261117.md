# 【ERYE237-076】【ERYE237-058】Agent去背景表达在目标定位或导出阶段报EDITOR_TARGET_REQUIRED

[FWXC-603](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=211e1c93bc4a0a1f168db56f70)；原单追加本轮证据评论，保留原状态；当前待确认。附件及正文/评论已回读核验。

**现象**

组合去背景应用后，最终导出报EDITOR_TARGET_REQUIRED

**前置步骤**

1. 登录生产https://app.cinlink.ai/，测试账号具备图片编辑权限。
2. 076-branded-source.png原图1024×1024，人像及双耳机；本轮组合指令生成、去背景、应用阶段已完成，等待实际导出交付。

**提示词**

仅使用当前076-branded-source.png带背景原图，按已保存画面左耳(.405,.39)及左耳机(.075,.825)两条批注同时修改：画面左耳一只蓝色星形耳钉，左耳机白色SYNC76；另一耳保持。然后去背景得到真实alpha透明PNG，保持1:1且1024×1024，完整保留人物和两侧耳机。品牌保留区中的右上ACME及右耳机TEST不要改。一次完成组合约束并交付一个结果；每阶段使用本轮正确来源，失败明确说明，不重试历史任务。

**复现步骤**

1. 保存两处修改及品牌保留批注。
2. 发送组合修改和透明PNG交付指令一次。
3. 沿同一任务等终态，观察最后导出步骤的实际错误；不点击重试。

**实际结果**

run_v2_6832cc9193754167a52fb218f5dbd10f中生成/去背景/应用阶段均done，editor_image_export失败：EDITOR_TARGET_REQUIRED，Read editor_view_get and provide session_id: there is no unique live editor at this revision。整体failed，未完成最终导出交付。去背景文件本身已存在，不将导出失败写为完全没有文件；画面丢修改另立本轮新单。

**预期结果**

Agent应定位本轮已应用的结果，正常导出并交付；不得因已有编辑器上下文仍无法定位交付。

**影响**

用户无法按现行用例规定完成对应编辑或交付流程，需要核对产品范围或修复实际行为。

**补充**

同步标识：ERYE237-076-076-EXPORT-PROD-20261117-SYNC

2026-11-17生产ego-browser有头TaskSpace25，账号yabinc18。同步既有页面和实际文件证据，不重跑业务，不做接口参数校验。已只读检索项目446条Bug及详情。测试仍Failed、自动化PLAN/空脚本。只上传脱敏审计，不上传原始签名URL、凭据或网络响应。

与FWXC-603验收点和表现相同，追加本轮证据，不重复新建；当前状态待确认保留，未改原正文、负责人或迭代。

会话9d949a3d-6bfa-46ff-bbc1-c3ebcc508dcc；原素材工程e217c968-576b-4224-b8f5-702971f2be61，原图editor_image_ea440b94f38d4cf2bb807b0ebd2b7114；本轮中间工程164d7b73-fcf5-4d80-9f21-8ba322f9b6e8。旧FWXC-613为STALE_REVISION，本轮未复现该错误，不能因同用例Failed就当作原问题未修复或重复缺陷。

**失败截图**

ERYE237-076：本轮原始页面截图

![237-076-export-20261117-01.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=384c7a6345c38f605b7af07d2a)
