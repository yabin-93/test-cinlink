# FWXC-749 · 当前LF-44（原LF-54）非零起点视频查找偏移

云效：[FWXC-749](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4ecf0572d02dfff28d124a7545)；2026-11-24官方OpenAPI提交并回读验证。编号版本LF-20261124-R1。

仅提交本批当前仍确认Failed的LF-44。LF-45 Passed、LF-47 V3.1范围重评Passed及移出的emoji历史观察均不纳入本次缺陷。

查重：读取cinlink-WEB完整实时索引561条，4条明细新读取、557条仅在实时gmtModified相同的情况下复用。与FWXC-275普通单镜头定位问题相关，但该单当前已修复，未覆盖本次非零起点样本与VFR对照；本次新建且在正文注明关联，未改旧单状态/正文。与FWXC-747旋转方向异常不同，不预设内部同根因。

3张原始页面截图、1张独立源金标图已嵌入；另附2份受控原片、1份错误返回短片、1份脱敏审计，共8个附件。原证据SHA保持，云效附件名称/ID/字节数与4处图片引用均已回读核验；金标图明确不冒充产品失败截图。优先级/严重程度及负责人/迭代/测试环境标签均由同步工具回读验证。

**现象**

含非零起点的视频实际播放第8～10秒有黄色机器人，分析完成后查找却返回0～3秒纯蓝短片；回复称短片随后出现机器人，实际交付内容未包含目标。

**前置步骤**

1. 登录预发 https://staging-app.cinlink.ai/ 的测试账号U1，使用macOS、ego Chromium有头浏览器。
2. 准备附件M-START.mp4：640×360，含5秒非零起点。原片有效且全流解码通过，按浏览器实际播放时间核验8～10秒有黄色机器人，7秒及11秒为蓝背景。

**提示词**

> 找出黄色机器人出现的位置，只查找，不剪辑。

**复现步骤**

1. 新建仅含M-START.mp4的项目，通过目录导入后完成分析，核对该文件五阶段全部完成、可检索。
2. 在项目空会话发送上述提示词一次，等待完成。
3. 实际播放并下载返回候选，与原片8～10秒机器人画面对照，检查来源时间及候选真实内容。

**实际结果**

- 已分析1/1，五阶段完成；该片自动转服务端完成分析，analysis available、task succeeded、index ready，非前置未就绪。
- 请求done，交付1个3秒、640×360短片，标注原片00:00.000～00:03.000；回复称“开头为纯蓝色，随后出现一个位于画面中央的黄色小机器人”。
- 候选实际播放为蓝画面。下载独立解码0.2/1.2/2.5秒均蓝，12fps抽检全程36帧均无黄色机器人，目标未交付；不是仅回复时间文字不够精确。
- 同轮VFR对照同一提示词返回6～10秒候选，实际播放及解码可见原片8～10秒机器人，该组通过。
- 失败项目：34e921f0-3176-4988-a003-0c8d41d7f6b3；会话：https://staging-app.cinlink.ai/c/1aa9bfae-7d4a-4974-8f47-b8dcb73d6f22 ；run_v2_5a29957419c14b68b0646600bc3ffeaa。
- 对照会话：https://staging-app.cinlink.ai/c/421c7a0b-8dec-4f57-ab98-1a8a1670dc9f ；run_v2_ce82cf0162e44028821ed0b550d4a3bd。

**预期结果**

正确按原片实际播放位置找到并交付包含黄色机器人的候选，来源区间合法且真实内容匹配；不能将无目标蓝背景作为命中。允许候选边界较宽，不要求内部PTS或未公布逐帧精度。

**影响**

含非零起点的合法视频无法通过画面查找取得实际存在的目标，用户可能选错片段或需要手动回到原片定位。

**补充**

同步标识：LF-R1-44-NONZERO-START-20261124

当前LF-44（原LF-54），编号版本LF-20261124-R1；2026-11-24预发实测。新单使用现有“测试环境MAC-chrome”分类，实际客户端为ego Chromium，不声称Chrome固定脚本执行。LF-44整体Failed、VFR子组Passed；固定脚本仍PLAN。

与FWXC-275“普通单镜头返回开头0～2秒未包含查询对象”相关；该单当前已修复，原正常素材场景与本次非零起点条件不同。本次以非零起点样本及VFR对照单独记录，不改旧单状态，不断言内部同根因。查重已覆盖本项目561条当前缺陷，无相同非零起点场景记录。

原片在首次上传前已校准并用真实浏览器时钟独立核验；FFmpeg默认-ss会归一输入起点，故原片参照另按绝对时间核对。旧校准变体未上传。实际失败版本、原片SHA、原始分析/成员与浏览器时钟证据均在脱敏审计；未改原片后重试，未重发查询、未执行额外扩散。未确定抽帧、索引或片段生成哪层根因。LF-45通过，LF-47已按用户优化范围重评通过，其emoji历史观察不纳入本次缺陷。

附件含两份受控原片（M-START、M-VFR）、本轮错误返回短片和脱敏审计，均保持原始字节。最后一张图为源文件9秒独立解码金标，明确不是产品失败截图。

**失败截图**

本轮失败：返回原片0～3秒的3秒候选，实际播放纯蓝，无机器人。

![LF-R1-44-NONZERO-START-20261124-LF44-start-final.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=03b4f7232e8f28c914ce4323e8)

发送前置：M-START.mp4分析五阶段全部完成，已转服务端处理完成。

![LF-R1-44-NONZERO-START-20261124-START-analysis.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4d4abd18933c16be330f0f271c)

正向对照：VFR同提示词返回6～10秒，实际播放返回2.7秒可见源8.7秒机器人。

![LF-R1-44-NONZERO-START-20261124-LF44-vfr-target.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=18b06e7169af3c40614ac90f34)

独立原片金标参照（不是失败UI）：M-START有效播放时间9秒清晰可见黄色机器人。

![LF-R1-44-NONZERO-START-20261124-START-at-9.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=00bca301e5ced8d492a482fe17)


本机回执：`reports/yunxiao/LF-R1-44-NONZERO-START-20261124/result.json`；查重、提交计划及云效核对记录：`reports/yunxiao/LF-R1-44-20261124/`。本次仅同步既有证据，无产品重跑/分析/额外扩散或Git操作。固定PLAN/空脚本及实际Failed保持。
