# 【LF-34】本地素材连续查询第二轮报模型HTTP429，未交付指定女士素材

云效：[FWXC-745](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c7efa4b01dcd3245c7471cd75c)；本次新建。

**现象**

同一会话已成功找到男子原片，继续要求排除该男子、改找女士时，页面直接报模型 HTTP 429，未交付本轮女士素材。

**前置步骤**

1. 预发环境 https://staging-app.cinlink.ai/ ，测试账号 U1 已登录（macOS、ego Chromium 有头浏览器）。
2. 当前测试项目通过页面目录上传包含 7MB.mp4（约60.5秒，旗帜前黑外套/蓝上衣女士）和 9s.mp4（9.45秒，黑框眼镜男子坐木桌前，右侧电脑），两片分析完成。

**提示词**

第一轮（已成功）：
> 找出戴黑框眼镜、穿深色T恤的男子坐在木桌前对镜头讲话，右侧有笔记本电脑的真实视频。

第二轮（失败）：
> 这次不要刚才那位男子的素材，只找穿黑色外套、蓝色上衣、站在旗帜前讲话的女士视频；只查找，不删除或生成。

**复现步骤**

1. 在该项目同一空会话发送第一轮提示词，等待完成，预览确认返回男子 9s.mp4。
2. 发送第二轮提示词，等待本次请求终态。
3. 核对页面错误、本轮新候选及前轮历史，检查原片是否仍在项目。

**实际结果**

- 第一轮成功交付男子原片；第二轮已受理后状态 failed，0个本轮结果文件，没有女士候选。
- 页面错误：`RuntimeError: model HTTP 429: {"error":{"code":"limited","message":"request is limited","param":"system","type":"rate_limit_error"},"request_id":"01a20b7e-4177-785f-9761-d8bf5947c31f"}`。
- 会话：e0742011-fd56-486d-87a9-21255f132994；项目：eae9c93e-e9ac-471c-884c-24cf60399d22。
- 成功 run：run_v2_14063d7d6ebd4411a06850703d82101a；失败 run：run_v2_3a908c7d4ffc462a88421f3ffb147bfd。
- 前轮男子历史及项目两份原片保留；未点击重试。

**预期结果**

第二轮正常完成并交付当前项目内匹配女士的原片/候选，不沿用男子作为本轮命中，不删除原片或生成新片；发生服务限流时给出清晰、可继续处理的业务提示。

**影响**

连续查找链路中断，用户无法取得已经分析的指定素材。

**补充**

同步标识：LF-STAGING-20261124-MODEL429

2026-11-24实测。LF-34判定Failed；本轮只观察到该次模型限流，不证明否定语义解析错误。稍后独立LF-32正常完成无匹配，不推定全站持续不可用。服务错误不按正常无匹配验收。附件为两张未经加工原图和脱敏审计；未新增重跑或重发请求。新单使用现有“测试环境MAC-chrome”环境分类，实际客户端为ego Chromium，非声称Chrome固定脚本执行。

**失败截图**

LF-34前置：第一轮已交付且播放正确男子原片；不是失败轮的新结果。

![LF20261124-LF-31-preview-1.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=65e911377ca71b9f9e447f629c)

LF-34正式第二轮：排除男子、查找女士的完整指令下显示失败及原始模型HTTP429。

![LF20261124-LF-34-model-429.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=aad766b58db395c592c7630916)
