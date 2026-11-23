# 【ERYE237-046/047/048】图片批注新增红球的实际成品出现水平截边

状态：本地实测发现，尚未提交云效，根因未确认。

**现象**：部分合法长度请求已完成，实际PNG中的红球仅保留上部，底部为清晰水平截边。

**前置步骤**：生产yabinc18；1254×1254红衣女性、黄包人像原图V1；右下空白锚点约(0.8,0.84)。

**提示词**：046要求“在该锚点的空白地面添加一个小红球，保留人物和黄色手包，其他保持不变。”，后续测字填充到2000字，明确不绘制填充字。047全局明确右下新增小红球并填充3999/4000字；048明确一个红球及三个蓝点，合计12000。完整可还原原文、锚点、工程/版本和任务信息保存在本轮对应prepared.json及terminal-job.json。

**复现步骤**：通过真实标注入口创建、填写并添加引用；输入本轮完整全局说明；只发送一次；等待原任务终态，下载实际PNG。

**实际结果**：046-2000/task59a68f8a、047-3999/task566d43ff、047-4000/task985b802a、048-12000/task3318c799均done/applied，但实际红球底部被水平截断。人物/黄包保持，048的三个蓝点正确。046-1999对照红球完整。

**预期结果**：完整小球自然落在对应地面，无无故裁掉下半部；主体及其他区域保持。

**影响**：合法图片批注编辑虽然返回完成，实际局部新增物体不完整。字符上限拒绝本身已通过，与此效果问题分开。

**补充**：046-2000解码全图alpha0计数0，不称透明洞，不猜测为mask极性或provider根因。11999行的范围不明确失败为另一语义前置问题，不归入本单。此处仅本地记录，没有新建云效缺陷。

**失败截图/实际文件**：

- [046页面截图](/Users/edy/Documents/cinlink-test/test-cinlink/reports/erye237-045-048-ann009010-ego-prod-20261117/046-2000-terminal.png)
- [046实际PNG](/Users/edy/Documents/cinlink-test/test-cinlink/reports/erye237-045-048-ann009010-ego-prod-20261117/046-2000-result-0.png)
- [047实际PNG](/Users/edy/Documents/cinlink-test/test-cinlink/reports/erye237-045-048-ann009010-ego-prod-20261117/047-3999-result-0.png)
- [048实际PNG](/Users/edy/Documents/cinlink-test/test-cinlink/reports/erye237-045-048-ann009010-ego-prod-20261117/048-12000-actionable-result-0.png)

## 2026-11-17云效查重结果

通过官方OpenAPI完整分页读取cinlink-WEB当前481条Bug，并读回481条标题及正文，失败0。未找到同样“在图片批注中新增球体后仅保留上部、底部水平截边”的记录；未新建、追加评论或修改云效。仅说明当前检索范围未找到同一现象，不确认内部同根因。

| 相近项 | 当前状态 | 区别 |
|---|---|---|
| [FWXC-610](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4c1ebc0fcc10da216335cec832) | 待确认 | 旧目标擦除后留下透明洞；本次新增红球截边，046样本alpha0计数为0。 |
| [FWXC-372](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f08ed4417846c25c3a8e038a4b) | 不是问题 | 16:9扩图背景出现竖向接缝；本次方形原图内新增物体水平截断。 |
| [FWXC-627](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=734bcbf473a246b0fe65b85187) | 待确认 | 视频横转竖裁掉已有产品/字幕；本次静态图片批注新增球体不完整。 |

完整只读快照保留本机reports/yunxiao/erye237-redball-duplicate-check-20261117/，结论与比较见dedup-result.json。此处为查重记录，仍未提交云效。
