# 【ERYE237-076】组合编辑后去背景结果丢失已完成的批注修改，品牌未完整保留

[FWXC-634](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=bc4e59330d61c0927da96ef1f5)；本次新建；当前🤔AI提缺陷。附件及正文/评论已回读核验。

**现象**

组合编辑后去背景结果丢失已完成的批注修改，品牌未完整保留

**前置步骤**

1. 登录生产https://app.cinlink.ai/，测试账号具备图片编辑权限。
2. 076-branded-source.png为1024×1024人像及双耳机；原图无蓝星/SYNC76，右上ACME与右耳机TEST可辨。已保存画面左耳、左耳机和品牌保留区批注。

**提示词**

仅使用当前076-branded-source.png带背景原图，按已保存画面左耳(.405,.39)及左耳机(.075,.825)两条批注同时修改：画面左耳一只蓝色星形耳钉，左耳机白色SYNC76；另一耳保持。然后去背景得到真实alpha透明PNG，保持1:1且1024×1024，完整保留人物和两侧耳机。品牌保留区中的右上ACME及右耳机TEST不要改。一次完成组合约束并交付一个结果；每阶段使用本轮正确来源，失败明确说明，不重试历史任务。

**复现步骤**

1. 画面左耳(.405,.39)批注要求一只蓝色星形耳钉；左耳机(.075,.825)要求白色SYNC76；另一耳、ACME和TEST保持。
2. 一次发送组合编辑、去背景及透明PNG交付指令。
3. 等待原run终态，保存第一阶段及去背景阶段的实际文件。
4. 比较两阶段可见修改及品牌透明度；不重发。

**实际结果**

本轮第一阶段1024×1024 PNG真实包含画面左耳蓝星及左耳机SYNC76。后续去背景文件为1024×1024 RGBA，alpha0像素732452；其RGB逐像素等于原始未修改素材，蓝星及SYNC76消失。ACME区域1553个黑字像素中1335个alpha0（仅218仍可见），品牌未完整保留。新图阶段与去背景阶段文件均已实际下载。最后导出另报EDITOR_TARGET_REQUIRED，单独关联FWXC-603。

**预期结果**

去背景必须保留本轮已完成修改及明确保护的品牌/双耳机，交付同一条编辑链的完整成品。

**影响**

组合修改结果不能可靠交付，已完成的编辑与品牌保护要求被破坏。

**补充**

同步标识：ERYE237-076-076-CONTENT-PROD-20261117-SYNC

2026-11-17生产ego-browser有头TaskSpace25，账号yabinc18。同步既有页面和实际文件证据，不重跑业务，不做接口参数校验。已只读检索项目446条Bug及详情。测试仍Failed、自动化PLAN/空脚本。只上传脱敏审计，不上传原始签名URL、凭据或网络响应。

会话9d949a3d-6bfa-46ff-bbc1-c3ebcc508dcc；原素材工程e217c968-576b-4224-b8f5-702971f2be61，原图editor_image_ea440b94f38d4cf2bb807b0ebd2b7114；本轮中间工程164d7b73-fcf5-4d80-9f21-8ba322f9b6e8。旧FWXC-613为STALE_REVISION，本轮未复现该错误，不能因同用例Failed就当作原问题未修复或重复缺陷。本项聚焦实际成品未保留编辑及品牌，不根据错误码推测代码根因。原图RGB一致与alpha量化只用作实际文件对照，不是接口参数验证。

**失败截图**

ERYE237-076：本轮原始页面截图

![237-076-content-20261117-01.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=2dace47291d6a9b0fb70192fcc)

ERYE237-076：本轮原始页面截图

![237-076-content-20261117-02.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=fbe5f75edb8c2074e5821052d8)

ERYE237-076：本轮实际下载PNG产物，不是页面模拟图

![237-076-content-20261117-03.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=07a1f4647bda9302853890f02b)

ERYE237-076：本轮实际下载PNG产物，不是页面模拟图

![237-076-content-20261117-04.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=600a65159703b2aed6d1a87604)
