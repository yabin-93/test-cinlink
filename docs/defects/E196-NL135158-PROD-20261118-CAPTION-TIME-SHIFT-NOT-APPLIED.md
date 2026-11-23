# 【ERYE196-139、ERYE196-148、ERYE196-150、ERYE196-151】【ERYE196-123】字幕整体后移1秒显示完成，实际时间未修改

云效：[FWXC-674](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4c2a8e06fb83f48ace92ed419f)；官方OpenAPI回读通过。本文件为追加评论；原主体正文、状态、负责人、迭代及标签保持。

**现象**

时间参数明确后字幕仍未移位，澄清后、两种单位表达、裁后当前时间线及0.5秒偏移均仅完成读取。

**前置步骤**

1. Chrome登录CinLink生产环境，使用获准测试账号U1，打开本例已保存的可编辑工程。
2. 139/151为20秒工程，Welcome4～6秒；148为两份独立70秒工程，也只有Welcome4～6秒。
3. 150已用页面裁头并移至零点：原20秒源保留2～20秒，视频及关联原声当前0～18秒；Welcome当前6～8秒，原始绑定8～10秒，保存已核实。

**提示词**

139-P1：

把Welcome字幕改到5～7秒，同时保持它原来的4～6秒时间不变。

139-P2：

[澄清卡选择] 把原字幕移到5～7秒，不再保留4～6秒

148-A-P1：

把4～6秒Welcome字幕移到1分2秒至1分4秒，只改时间，保存。

148-B-P1：

把4～6秒Welcome字幕移到62秒至64秒，只改时间，保存。

150-P1：

只把当前时间线6～8秒的Welcome字幕移到7～9秒，按当前工程时间线计算，不按原素材时间，文字不变，保存。

151-P1：

把4～6秒Welcome字幕往后挪一格，文字不改。

151-P2：

一格指0.5秒，向后移动开始和结束时间，保存。

**复现步骤**

139：发送矛盾时间，真实澄清卡出现后选择“把原字幕移到5～7秒，不再保留4～6秒”，等待原任务续跑。
148：在两份独立70秒工程中分别发送分钟秒和纯秒表达。
150：在真实18秒裁后工程发送当前6～8秒到7～9秒的指令。
151：先发送“一格”，再明确一格为0.5秒。
各分支结束后刷新，核对字幕实际开始/结束时间及非目标对象。

**实际结果**

139真实澄清已填写并续跑，但仍4～6秒，未到5～7秒。148两个独立分支均仍4～6秒，未到62～64秒。150仍当前6～8秒，未到7～9秒，18秒视频/原声保持。151补充0.5秒后仍4～6秒，未到4.5～6.5秒。各分支只有检查/字幕轨读取，刷新稿无对应移位。

139-P1：https://app.cinlink.ai/c/6ff8b324-4066-4ee4-a5d8-369cc567a8e1；提交时间2026-11-18 14:53:38（Asia/Shanghai）
139-P2：https://app.cinlink.ai/c/6ff8b324-4066-4ee4-a5d8-369cc567a8e1；提交时间2026-11-18 14:57:18（Asia/Shanghai）
148-A-P1：https://app.cinlink.ai/c/8832b4e6-fde5-436f-ac0d-3410a6f9b4d5；提交时间2026-11-18 16:41:26（Asia/Shanghai）
148-B-P1：https://app.cinlink.ai/c/86490c06-de1b-4378-a6d0-ac1fa892d69d；提交时间2026-11-18 16:42:56（Asia/Shanghai）
150-P1：https://app.cinlink.ai/c/eca37dce-aa1a-49c0-bc91-476b340841ce；提交时间2026-11-18 17:07:53（Asia/Shanghai）
151-P1：https://app.cinlink.ai/c/66d15dcc-eeaa-4de3-b1fb-21186aff2bf3；提交时间2026-11-18 15:21:38（Asia/Shanghai）
151-P2：https://app.cinlink.ai/c/66d15dcc-eeaa-4de3-b1fb-21186aff2bf3；提交时间2026-11-18 15:22:57（Asia/Shanghai）

**预期结果**

139为5～7秒；148两份都为62～64秒；150按裁后当前工程坐标为7～9秒且保留18秒裁头；151明确后为4.5～6.5秒。仅目标时间变化，文字及其他内容保持。

**影响**

无法通过自然语言执行已明确的字幕时间调整，后续时间撤销不能验收。

**补充**

同步标识：E196-NL135158-PROD-20261118-CAPTION-TIME-SHIFT-NOT-APPLIED
只报告明确参数后的时间操作未应用，不声称发生单位换算错误、错误坐标移位或误改声音。依赖成功移位的撤销均未发送。151第一轮缺少单位澄清另建独立问题，避免与已明确参数后的移位失败混淆。
本次仅同步2026-11-18已完成的新用例实测，未重发业务任务，不作为旧素材/旧提示词严格修复回归；已有缺陷状态、原正文和业务字段保持。会话中的工程可能经历后续测试，复现前须按本条前置恢复保存稿。
查重：关联FWXC-674：原单为完整明确的字幕整体平移指令仅完成读取、实际时间未变；本批四例增加澄清后、单位等价、裁后坐标及小数秒变体，共同失败点仍是时间修改未应用，不按参数变化重复建单。

**失败截图**

139真实澄清卡：之后实际选择移动到5～7秒续跑，终态仍4～6秒见139-P2截图。

![E196-NL135158-139-before-answer.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=c6ed6c54eed5559dfc74419e93)

139-P2-ended：本轮真实失败证据，原始截图未加工，验收范围见正文。

![E196-NL135158-139-P2-ended.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d215164b4b43e0ff967bdf5a6d)

148-A-P1-ended：本轮真实失败证据，原始截图未加工，验收范围见正文。

![E196-NL135158-148-A-P1-ended.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7a9078e42f3c3417b3befc25b1)

148-B-P1-ended：本轮真实失败证据，原始截图未加工，验收范围见正文。

![E196-NL135158-148-B-P1-ended.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1566b957da47b4aed3a4a4561f)

150-P1-ended：本轮真实失败证据，原始截图未加工，验收范围见正文。

![E196-NL135158-150-P1-ended.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=b8e9ed176c5ddd43299b6b16ca)

151-P2-ended：本轮真实失败证据，原始截图未加工，验收范围见正文。

![E196-NL135158-151-P2-ended.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=3f6a4ca6d9679c58994f35c54d)
