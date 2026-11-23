# 【ERYE237-066】AI擦除预览中撤销未清当前区域，却撤回已完成版本

云效：[FWXC-609](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e54100f92138a904015994508b)。已回读核验正文、负责人余航、生产标签/重构10-29及附件；1张原始截图，1份脱敏审计。

**现象**

AI擦除预览中撤销未清当前区域，却撤回已完成版本

**前置步骤**

1. 生产https://app.cinlink.ai/，ego-browser有头，测试账号yabinc18。
2. 同一香水瓶工程已有白底完成版d11056与后续去背景版4e5069；无本轮草稿，以原图作为当前查看源。

**提示词**

本例为UI操作，无处理提示词、无模型提交。

**复现步骤**

1. 打开主工具栏擦除，画20源像素横线（源点188.1,627至313.5,627），改为8源像素画第二横线（188.1,752.4至313.5,752.4）。
2. 右键未观察到保存意图；继续以实际画布为焦点按一次Cmd+Z，读取两笔预览及完成版本头。
3. 只读核对后按Cmd+Shift+Z重做恢复原完成头，清理本轮预览，不发送生成。

**实际结果**

两笔mask的points及20/8宽度在Cmd+Z前后完全一致；完成头却从editor_image_4e5069fcc10f41bcacea051e478aab06撤回白底editor_image_d11056e38cf5479290d3a328d9ff61df。已通过实际重做恢复4e5069。会话e34809bb-f524-4bed-9401-d4e4622f38ef。

**预期结果**

编辑当前擦除区域时撤销作用于当前编辑意图/区域，底图和已完成历史保持，不误撤其他完成版本。

**影响**

用户撤销当前mask却改变保存的完成版本，产生错误基线风险。

**补充**

同步标识：ERYE237-066-PROD-20261116-BATCH

2026-11-16生产实测，当前主分支Failed。只整理既有证据，不重发业务任务。不假定每笔必须独立撤销，不把右键无保存单独认作需求缺陷。关联FWXC-533（https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=abebbb1f6a6464746c94761fc8）及FWXC-531（https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fd73848cfad4912aa75424b7db），旧场景/撤销对象不同，未证实同根因。截图本身不能证明服务端头，头变化及两笔对照见审计。

已按当前项目412条缺陷及正文查重，确认相同项0；疑似/相关项明确保留。未覆盖内部日志/费用不补算通过。

**失败截图**

066实际Cmd+Z后两笔擦除预览仍存在；完成头变化见前后审计

![066-actual-undo-observation.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=199acadb0c6340f37922f96b86)
