# 2026-11-23 已修复缺陷续跑

实际环境：预发staging-app.cinlink.ai；Google Chrome有头；yabinc92。原缺陷生产环境范围保留，不代验生产。固定脚本PLAN，0云效状态写入/评论/新单/Git提交推送。统一入口README只读。

当前未完成：621的B10追加步骤已单次受理，终态未确认；用户切换Chrome到云效，按浏览器技能停止并等待用户暂停整个Chrome操作。保留唯一执行锁与CIDea7cae1a-6576-4027-8928-6fd5e109af5f，不重发。30秒基线及正式断网提交尚未验证。

本轮真实完成：720扩散一Passed（默认入口T1，仅原声10秒分割，Undo/Redo/刷新保持，其他轨道文字和时间保持；实际20秒MP4完整解码exit0）。720严格原完整提示词未发送，随后外部改AI未通过，原结论NotRun，不以扩散代替原通过。

624原/两扩散Blocked：无获准第二账号；不进行匿名或单账号替代。568/484是此前同版已知阻塞，本轮不重复执行。

13:49完整550项/陈亚宾已修复21；14:04为17；14:27为13。7项首次提交前被外部改成非已修复，720仅扩散一完成后外部非已修复；外部状态不计本地实测。62114:42仍精确已修复。

专用项目`定时缺陷预发回归-20261123`：6f680a05-8301-4756-9034-7800cbb4e6dc。共单次受理3次准备请求，其中720译配完成99秒，621整体创建拒绝38秒，621现有A20工程追加B步骤在途未知。正式621断网请求0。

|缺陷|原回归|扩散一|扩散二|当前情况|
|---|---|---|---|---|
|FWXC-736|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-720|NotRun|Passed|NotRun|partial_complete_external_nonfixed_no_new_original|
|FWXC-703|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-691|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-675|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-668|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-624|Blocked|Blocked|Blocked|blocked_second_account_not_authorized|
|FWXC-621|Running|Blocked|Blocked|waiting_for_browser_control_with_accepted_task|
|FWXC-613|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-612|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-606|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-601|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-585|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-581|NotRun|NotRun|NotRun|excluded_before_first_business_non_fixed|
|FWXC-580|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-571|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-569|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-507|NotRun|NotRun|NotRun|queued_waiting_browser_control|
|FWXC-247|NotRun|NotRun|NotRun|queued_waiting_browser_control|

证据：`reports/fixed-regression-20261123-134841/browser-stop-checkpoint.json`，`execution/720-E1-*`，`execution/621-O061-*`。

![720刷新后分割结果](../../reports/fixed-regression-20261123-134841/execution/720-E1-reopened.png)

![621原生A20基线](../../reports/fixed-regression-20261123-134841/execution/621-O061-native-A20.png)


2026-11-23T15:11:07.233674+08:00 用户要求验收当前已修复缺陷：完整550项/陈亚宾5Fixed，当前624/613/606/569/568。621原追加B请求只回读完成36s，页面视频与原声均A0～20+B20～30，总30秒，未重发；正式061/065断网及扩散未执行，外部AI未通过保持。主账本合并7项非Fixed状态纠正，pending仅624/613/606/569；624缺第二账号B，568同版已知B不自动重跑。继续613/606/569。0云效写入，固定脚本PLAN。新快照reports/fixed-acceptance-20261123-150852/，621终态证据reports/fixed-regression-20261123-134841/execution/621-O061-step2-terminal*。
