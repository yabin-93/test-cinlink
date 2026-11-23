# 【ERYE237-050】两源批注请求返回执行结果未知，未分别交付图片

> 最新适用性更正（2026-11-18用户确认）：图片批注单次仅允许一张图片，旧原回归/E1因“没有同时交付另一图”作出的负向依据撤销，对新版050不适用；下文为当时旧口径实测，保留事实但不再作为当前Failed。新版050为Not Run，旧E2通过不补算新版通过。11-16真实未知结果错误另存，不据此判不是问题。本次仅修订，未重跑或修改云效；最后回读的AI未通过是云效历史工作流状态。[新版说明](../cases/requirements/ERYE-237/revision-050-single-image-annotation-20261118.md)。

> 2026-11-18生产实际回归：原Failed、扩散E1 Failed、E2执行通过；旧EXECUTION_OUTCOME_UNKNOWN未复现，但携引用仍只交付当前图，另一图未说明。云效状态已为AI未通过，评论24362365及7图/2JSON回读完成。[本轮报告](FWXC-599-retest-ego-prod-20261118.md)。以下为11-16原缺陷，保留原步骤及证据。

云效：[FWXC-599](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=debe06fe7d9bbc319134bd541e)。已回读核验正文、负责人余航、生产标签/重构10-29及附件；1张原始截图，1份脱敏审计。

**现象**

两源批注请求返回执行结果未知，未分别交付图片

**前置步骤**

1. 生产https://app.cinlink.ai/，ego-browser有头，测试账号yabinc18。
2. 同会话两独立1024×1024图片工程I1/I2，源不同；I1无耳饰，I2已有银耳钉和右耳机TEST。

**提示词**

ERYE237-050：一次处理两张独立源图片，各自输出一张结果，不拼接、不混用来源。I1工程a1644d92-1840-4e2c-bc57-573e37b640b9，源版本editor_image_100906fcd2d24c4285056b1c70338561，按其已保存的I1左耳批注，仅添加蓝色星形耳钉。I2工程9c573d61-3ea5-4f49-8b72-6246a8df39ae，源版本editor_image_474d34b80dbc45968f904091e5a95ee6，按其已保存的I2左耳机批注，仅添加白色SYNC50 logo，保留原银色耳钉和右侧TEST。不要将I1耳钉要求加到I2，两图其他区域保持不变。若某图无法执行，明确说明该图失败，不声称两图完成。

**复现步骤**

1. 分别在I1左耳(.405,.39)、I2左耳机(.075,.825)创建并添加批注引用：I1只加蓝星耳钉，I2只加白SYNC50，保留原耳饰及右TEST。
2. 切I2后一次发送完整两源指令，等待原任务终态，不重发。
3. 检查实际任务源、结果及两份交付。

**实际结果**

实际仅受理I2源任务60335100-67e0-44f3-b2e0-7d84f57b19a9，failed，EXECUTION_OUTCOME_UNKNOWN、result=null；无成品，未分别交付两图。会话39cdf63c-d593-4538-816a-5d1c29973e36。

**预期结果**

两源按各自锚点处理并分别交付；单图失败时明确说明对应图及可核对状态。

**影响**

多图编辑请求中断，无法取得任何本轮结果，用户无法判断是否可安全重试。

**补充**

同步标识：ERYE237-050-PROD-20261116-BATCH

2026-11-16生产实测，当前主分支Failed。只整理既有证据，不重发业务任务。关联FWXC-546（https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6747933083e9981923015ca4ff）：旧轮已产I2但串入I1要求；本轮无图，不声称重现串图。另FWXC-581（https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=53fde222a7123c53dc605edd63）为单图擦除同错误，触发链不同，未证实同根因。

已按当前项目412条缺陷及正文查重，确认相同项0；疑似/相关项明确保留。未覆盖内部日志/费用不补算通过。

**失败截图**

050本轮两源完整指令及实际执行未知错误；画布为已有源，不是本轮产物

![050-task-state.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=aa8c99e74acd85b5588013db41)
