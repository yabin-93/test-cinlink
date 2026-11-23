# 【ERYE237-049】页面限制80字但保存接口接受81字标签并完整落库

状态：已提交[FWXC-544](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fc44b577d13de4576f35a4073e)，🤔AI提缺陷、余航、重构10-29、生产环境。2张本轮真实截图及1份审计附件，正文/字段/图片引用/附件ID、名称、字节数均回读一致。

**现象**

页面限制80字但保存接口接受81字标签并完整落库

**前置步骤**

1. 生产环境 https://app.cinlink.ai/，测试账号yabinc18已登录，ego-browser有头。
2. export-image.png当前保存版，1024×1024；只有一条正文“测”的自身测试批注，当前标签80字。

**提示词**

本例纯UI/接口操作，未发送新的对话提示词。

**复现步骤**

1. 以原生输入核对79/80完整保存，81粘贴被页面maxlength限制为80。
2. GET当前工程，克隆返回的完整content，仅将该批注label改为81个“测”；使用当前base_revision及新operation_id调用实际projects/save入口。
3. 独立GET同工程，核对标签长度及保存修订。

**实际结果**

POST /cloud-tool-api/v1/editor/projects/save HTTP200，applied=true，revision171→172；独立GET标签长度81且原文完整。随后只恢复自身合法80字（revision173）。

实测会话：39cdf63c-d593-4538-816a-5d1c29973e36。

**预期结果**

按需求§3.3标签最多80字符；服务端统一拒绝81并保持原值，不能只依赖页面maxlength。

**影响**

可绕过前端写入越限标签，各入口校验不一致。

**补充**

2026-11-13生产实测。无对话提示词或图片生成。本缺陷仅服务端存储上限；049合法Agent更新失败另单。请求必须保留实际工程其他字段，不能用缺字段的伪造对象代替；完整投影和精确81字原值在附件。

本次仅整理既有证据，不重新发起业务任务；未覆盖项不据此判通过。

**失败截图**

![页面原生81字粘贴被限制到80](../../reports/erye237-021-050-ego-prod-20261113/049-ui-label81.png)

![真实GET响应显示81字标签已保存](../../reports/erye237-021-050-ego-prod-20261113/049-backend81-browser-response.png)

原执行为Failed；固定自动化仍PLAN未接入。本次同步不重新执行业务。
