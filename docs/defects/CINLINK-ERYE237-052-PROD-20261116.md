# 【ERYE237-052】Agent只记批注及输入框引用报commands.1参数校验失败

云效：[FWXC-601](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=132dabf13767eb17061f657234)。已回读核验正文、负责人余航、生产标签/重构10-29及附件；1张原始截图，1份脱敏审计。

**现象**

Agent只记批注及输入框引用报commands.1参数校验失败

**前置步骤**

1. 生产https://app.cinlink.ai/，ego-browser有头，测试账号yabinc18。
2. 已打开I1工程的1024×1024原图，左耳Q唯一，无本轮待发引用。

**提示词**

ERYE237-052：当前图片工程a1644d92-1840-4e2c-bc57-573e37b640b9，源版本editor_image_100906fcd2d24c4285056b1c70338561。Q为图中左耳，源归一化坐标x=0.405,y=0.39。在Q处记一条批注：把这里改成蓝色。先别改图片，只保存这条批注并添加到输入框引用，保留未发送草稿；不要生成、不要导出，不要说已经改成蓝色。

**复现步骤**

1. 从干净I1原图普通Agent输入区发送完整只保存批注/输入框引用指令一次。
2. 等待原run终态，检查画布批注和待发引用，不点击重试。

**实际结果**

run_v2_d8c2ff9885094cac9db650c254e6af24终态failed；Editor tool arguments do not match its schema; commands.1: invalid oneOf。未保存要求的批注与引用；未产生编辑图片。会话39cdf63c-d593-4538-816a-5d1c29973e36。

**预期结果**

在Q保存“把这里改成蓝色”批注并加入未发送输入框引用，保持图片不变，不生成/导出。

**影响**

Agent无法完成不改图的批注草稿操作。

**补充**

同步标识：ERYE237-052-PROD-20261116-BATCH

2026-11-16生产实测，当前主分支Failed。只整理既有证据，不重发业务任务。关联FWXC-379（https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=208c359a4550c1e3d299e5dc5a），旧项是其他动作缺session/source绑定；本轮commands.1 invalid oneOf且仅记批注，未证实同根因。

已按当前项目412条缺陷及正文查重，确认相同项0；疑似/相关项明确保留。未覆盖内部日志/费用不补算通过。

**失败截图**

052完整只记批注请求及commands.1 invalid oneOf实际终态

![052-draft-only-terminal.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=fd0811bfd4d927fd7df7363ede)


2026-11-19最新修复回归（实际预发Chrome/yabinc92，非生产新验证）：严格原验收Failed、扩散一Failed，commands.0/1参数校验错误仍阻止批注和未发送引用。云效FWXC-601已官方API回读❌AI未通过；扩散二仍在执行。新报告[本轮详情](FWXC-601-retest-20261118-1800-monitor.md)，原生产证据保留。固定脚本仍PLAN。
