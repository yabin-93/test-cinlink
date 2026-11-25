# 本地素材查找预发缺陷同步（2026-11-24）

本轮28条有效用例为27 Passed、1 Failed，另有1项独立项目归属说明偏差。官方OpenAPI查重556条Bug记录后，按实际触发和结果整理以下两组；未新增产品请求。

| 用例/发现 | 云效处理 | 问题与范围 | 截图/附件 |
|---|---|---|---|
| LF-34 | 新建 [FWXC-745](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c7efa4b01dcd3245c7471cd75c) | 连续查询第二轮模型HTTP429，未交付女士素材；LF-34 Failed，未证明否定语义解析错误。 | 2张原图+1份脱敏审计；已回读 |
| LF-18、LF-20、LF-21、LF-28、LF-35 | 追加证据至 [FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875) | 正确原片已交付却误报项目归属；相关用例既定交付/链路范围仍Passed，LF-28复用LF-18链。 | 6张原图+1份脱敏审计；已回读 |

## 去重与边界

- 项目归属说明与FWXC-524正文、现有评论的可观察问题一致，关联原记录；其当前类型为“优化”、Bug分类，保留类型、原正文、待确认状态、负责人占晶、迭代和标签。本轮是新用例发现提交，未按严格原单步骤做修复回归。
- LF-34与FWXC-402原始资源端口无文件/近期404不符；FWXC-310只有通用429标题、空正文且无可读附件或评论，无法确认同一触发；FWXC-683发生在竖屏模糊背景补做及能力询问，触发和错误类型不同。本次单独登记LF-34，并保留这些排查线索，不推定同根因。
- 八张本轮原图逐张核对、按原字节上传，另附两份脱敏审计。已核验工作项/评论正文、截图嵌入及全部附件ID、名称和字节数。未上传原始网络日志、授权信息、原视频或签名下载链接。
- 未更改原27通过/1失败结论、未追加产品重试或业务回归。AUTO3为既有实现且新版入口待适配，本轮未验证固定脚本；其余PLAN25保持。未改统一入口README，未提交/推送Git。

## 云效回读


- FWXC-745：缺陷，🤔AI提缺陷；正文回读；reports/yunxiao/LF-STAGING-20261124-MODEL429。
- FWXC-524：优化，待确认；评论24498156回读；reports/yunxiao/lf-staging-20261124/projectwarning/association。

详细触发指令、精简前置、实际run和截图见上方云效记录及同目录LF-model429-staging-20261124.md、LF-projectwarning-staging-20261124.md。本批原始证据与去重决策仅留本机reports/yunxiao/lf-staging-20261124/。
