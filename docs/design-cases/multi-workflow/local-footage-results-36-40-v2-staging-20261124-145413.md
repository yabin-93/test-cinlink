> 编号说明：本文为调整前记录，使用旧LF编号；当前范围及编号请查[新旧编号对照](local-footage-id-map-20261124.md)。

<!-- LF36-V2-CLOUD-SYNC-20261124 -->
后续云效同步已完成：仅LF-36追加至[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)，评论24509985。标题含LF-36，2张原图+1份脱敏审计及嵌图已回读；原类型/待确认状态/原正文保持。下方“0云效写入”指产品测试执行阶段，不含本次用户授权的后续同步；原Failed及4条Blocked不变，未重跑产品。
<!-- /LF36-V2-CLOUD-SYNC-20261124 -->

# LF-36～40 V2预发执行（2026-11-24）

2026-11-24 LF-36～40 V2预发：已记录5/5，{'Failed': 1, 'Blocked': 4}；仅正文无扩散，PLAN未接固定脚本。执行记录只在独立报告/状态/进度维护，用例正文及统一README未改；0云效/Git写入。

TaskSpace48 / p1；串行、无自动重试、不额外扩散。LF36使用用户指定“查找素材”；状态改变/增删素材仅操作专用测试项目。

| 用例 | 结果 | 实际结论 |
|---|---|---|
| LF-36 | Failed | V2原提示词返回正确7MB.mp4完整原片，实际播放、下载SHA与源一致；当前“查找素材”项目含同一源且发送前已确认逐文件分析完成，回复仍误报项目ID不一致、无法确认归属，归属说明失败。 |
| LF-37 | Blocked | 当前创建项目入口在仅填名称、选择真实0文件空目录后，创建按钮均禁用；页面仍显示未添加文件夹，未创建0素材项目。未用TXT项目冒充空库，正式检索未发送，空项目前置阻塞。 |
| LF-38 | Blocked | 部分就绪项目当前含F5与F6流复制副本9s-fresh.mp4；已完成分析批次仅含F5。女士查询返回正确F5原片并实际播放，男子未就绪查询0新增候选且提示先分析更多视频。随后打开真实分析准备页，仅保留F6待分析并重试读取一次，仍无法读取时长、确认禁用，未受理新分析；就绪后补查阶段阻塞。 |
| LF-39 | Blocked | 仅F5项目已逐文件确认分析完成，新增前男子查询明确无匹配、0候选。当前项目操作菜单仅重命名/归档，分析结果页仅原F5及返回工作台，未提供可用的同项目增量导入入口；复核成员仍只有F5，未把聊天附件或其他项目素材当入库。加入F6及同/新会话补查阶段阻塞。 |
| LF-40 | Blocked | 专用G56项目真实含F5/F6、两项分析已完成；移除前按原指令交付正确9s.mp4，实际播放且下载SHA与原片一致。当前项目菜单仅重命名/归档，分析页无移除当前项目素材入口，成员复核仍2文件；未执行移除，移除后查询未发，依赖步骤阻塞。 |

## LF-36：Failed

V2原提示词返回正确7MB.mp4完整原片，实际播放、下载SHA与源一致；当前“查找素材”项目含同一源且发送前已确认逐文件分析完成，回复仍误报项目ID不一致、无法确认归属，归属说明失败。

验证范围：用户指定项目真实6文件；本轮不做扩散，不修改旧原提示词通过记录，仅追加当前V2失败。

- 素材/分析前置：Passed；逐文件核对五阶段完成，F5/F6在完整6成员清单中

- 原片交付和播放：Passed；7815126字节、完整60.495778秒，源SHA精确一致

- 项目归属说明：Failed；合法成员被误报无法确认归属

实际提示词：

> 在当前项目中查找7MB.mp4，只返回原始素材供预览。

会话：4ed7dfc9-073f-4757-a3a4-a5c9b6de48a1

本机证据目录：/Users/edy/Documents/cinlink-test/test-cinlink/reports/local-footage-36-40-v2-20261124-145413

证据：LF36-analysis-5.png, LF36-analysis-6.png, LF36-analysis.json, LF36-membership.json, LF36-final-state.json, LF36-final-conversation.json, LF36-result.png, LF36-preview.png, LF36-source-verification.json

## LF-37：Blocked

当前创建项目入口在仅填名称、选择真实0文件空目录后，创建按钮均禁用；页面仍显示未添加文件夹，未创建0素材项目。未用TXT项目冒充空库，正式检索未发送，空项目前置阻塞。

验证范围：已执行真实UI前置检查；没有生成假项目、删除用户素材或借用其他项目结果。

- 真实0素材项目准备：Blocked；仅名称和真实空目录均无法启用创建

- 空库正式查询：Not Run；依赖真实空项目，不发送

正式检索指令未发送，见前置说明。

本机证据目录：/Users/edy/Documents/cinlink-test/test-cinlink/reports/local-footage-36-40-v2-20261124-145413

证据：LF37-create-entry.png, LF37-create-entry.txt, LF37-no-folder-state.json, LF37-empty-directory-state.json, LF37-empty-directory.png, LF37-empty-directory.txt

## LF-38：Blocked

部分就绪项目当前含F5与F6流复制副本9s-fresh.mp4；已完成分析批次仅含F5。女士查询返回正确F5原片并实际播放，男子未就绪查询0新增候选且提示先分析更多视频。随后打开真实分析准备页，仅保留F6待分析并重试读取一次，仍无法读取时长、确认禁用，未受理新分析；就绪后补查阶段阻塞。

验证范围：前两阶段通过，不补算整体通过。F6副本为已登记流复制样本，容器哈希不同而画面相同；没有把项目排除分析当移除。F5归属误报独立归LF-36。本次已找到可用分析准备页，第三阶段当前卡在F6时长读取，覆盖旧‘无入口’描述；原完成批次未被重发。

- 部分就绪前置回读：Passed；真实2成员、完成批次只含F5且索引ready

- 已分析F5查询：Passed；实际播放正确原片并下载SHA一致，归属说明偏差归LF36

- F6未就绪查询：Passed；0新增候选，未用前轮F5代替，提示先分析更多视频

- 补齐F6分析并再次查询：Blocked；F6时长读取失败，确认并继续禁用，新分析未受理、第三轮未发送

实际提示词：

> 查找当前项目中旗帜前穿黑外套、蓝上衣的女士视频，只查找。

> 查找当前项目里戴眼镜、坐在木桌前且旁边有电脑的男子视频，只查找。

会话：b191d449-272e-4cf0-b77d-ad640ee2a96c

本机证据目录：/Users/edy/Documents/cinlink-test/test-cinlink/reports/local-footage-36-40-v2-20261124-145413

证据：LF38-membership-before.json, LF38-analysis-before.txt, LF38-analysis-before.png, LF38-analysis-batch-before.json, LF38-woman-final-state.json, LF38-woman-result.png, LF38-woman-preview.png, LF38-woman-source-verification.json, LF38-man-unready-final-state.json, LF38-man-unready-result.png, LF38-prepare-analysis-entry.png, LF38-analysis-prepare-budget.txt, LF38-F6-analysis-prepare.txt, LF38-F6-analysis-prepare.png

## LF-39：Blocked

仅F5项目已逐文件确认分析完成，新增前男子查询明确无匹配、0候选。当前项目操作菜单仅重命名/归档，分析结果页仅原F5及返回工作台，未提供可用的同项目增量导入入口；复核成员仍只有F5，未把聊天附件或其他项目素材当入库。加入F6及同/新会话补查阶段阻塞。

验证范围：已执行新增前对照；缺入口仅阻塞依赖步骤，不判增量查找失败，不重建项目冒充同项目新增。

- 仅F5并分析完成：Passed；成员清单1文件，分析五阶段完成

- 新增前查F6：Passed；明确未找到匹配，0新增候选

- 同项目新增并分析F6：Blocked；当前项目菜单/分析页无增量入口，成员未改变

- 新增后同会话及新会话复核：Not Run；依赖新增与F6分析，不发送

实际提示词：

> 找出当前项目里戴眼镜、坐在木桌前讲话，旁边有笔记本电脑的男子视频。

会话：14d20803-b8ec-40e0-9d47-90b4325d6c00

本机证据目录：/Users/edy/Documents/cinlink-test/test-cinlink/reports/local-footage-36-40-v2-20261124-145413

证据：LF39-membership-before.json, LF39-analysis-before.txt, LF39-analysis-before.png, LF39-before-final-state.json, LF39-before-result.png, LF39-project-menu.json, LF39-project-menu.png, LF39-current-analysis-actions.json, LF39-current-analysis-actions.png, LF39-membership-after-check.json

## LF-40：Blocked

专用G56项目真实含F5/F6、两项分析已完成；移除前按原指令交付正确9s.mp4，实际播放且下载SHA与原片一致。当前项目菜单仅重命名/归档，分析页无移除当前项目素材入口，成员复核仍2文件；未执行移除，移除后查询未发，依赖步骤阻塞。

验证范围：没有操作用户“查找素材”项目、归档代删、排除分析代删或后台删除。正向归属说明偏差独立归LF36；本例只完成源可用对照，不声称已验移除后隔离。

- F5/F6成员与分析前置：Passed；真实2成员，逐文件分析完成

- 移除前F6正向：Passed；9.45秒原片实际播放，9259791字节、源SHA一致

- 仅移除当前项目F6：Blocked；检查的项目菜单/分析页未提供移除入口，未删任何源

- 移除后新会话查找：Not Run；依赖真实移除，未发送

实际提示词：

> 在当前项目中查找9s.mp4，只返回原始素材供预览。

会话：a335290e-7329-4ff5-8ccf-437150897072

本机证据目录：/Users/edy/Documents/cinlink-test/test-cinlink/reports/local-footage-36-40-v2-20261124-145413

证据：LF40-membership-before.json, LF40-F5-analysis.txt, LF40-F6-analysis.txt, LF40-F6-analysis.png, LF40-before-final-state.json, LF40-before-result.png, LF40-before-preview.png, LF40-before-source-verification.json, LF40-project-menu.json, LF40-project-menu.png, LF40-analysis-actions.json, LF40-analysis-actions.png, LF40-membership-after-check.json

## 收尾核验

本轮1 Failed、4 Blocked；仅各例正文，0额外扩散，共5次查询/5个不同run，均已终态。LF37无正式查询；LF38未受理新的分析、未发就绪后第三轮；LF39未加入F6、未发加入后查询；LF40未移除F6、未发移除后查询。已执行的独立正向/反向分支分别见上文，不能把阻塞步骤当执行通过或产品检索失败。

F6部分就绪准备使用已登记流复制副本9s-fresh.mp4；当前已完成批次仅F5，不将本轮普通无匹配提示当成精确后台索引阶段证明。F6补分析的实际卡点是时长无法读取，并非仍无分析准备页。未通过后台强制入库/删除或伪造空项目完成前置。

状态JSON、状态表与进度逐例更新，V2已登记5条；未执行的33条V2保留Not Run修订标记，原历史最近实测不补算V2通过。固定脚本AUTO3/PLAN63保持，本轮5条PLAN/空路径；未接脚本。用例正文和统一README的字节哈希均与执行前一致，历史记录完整；用户“查找素材”6成员未改变。全部引用证据存在；本轮没有定义改动，不重复跑正式需求格式检查。

TaskSpace48已finish，原LF36失败会话留给用户查看，最终无运行任务、视频已暂停。0云效/Git写入。Ego Lite提示有可用更新，本轮未升级。本机审计：reports/local-footage-36-40-v2-20261124-145413/final-audit.json。
