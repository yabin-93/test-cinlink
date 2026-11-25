# 【LF-18、LF-20、LF-21、LF-28、LF-35】「工具」search_materials：命中正确素材后仍提示项目 ID 不一致

云效：[FWXC-524](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=70fcb61a331c0448bc3ebfb875)；本次证据评论 24498156。

**现象**

当前项目已经包含、分析完成的原始素材，查找后返回正确且可播放的原片，回复却提示“项目 ID 与当前项目不一致，无法确认属于当前项目”。完整名称、部分名称、双名称及人物候选均观察到同类提示。

**前置步骤**

1. 预发环境 https://staging-app.cinlink.ai/ ，测试账号 U1 已登录（macOS、ego Chromium 有头浏览器）。
2. 页面目录上传建立 G56 测试项目，包含 7MB.mp4（约60.5秒，旗帜前女士）与 9s.mp4（9.45秒，木桌前眼镜男子），分析2/2；当前项目素材列表确认两者均在其中。

**提示词**

LF-18 / LF-28同一链，按实际顺序：
> 在当前项目中按完整文件名查找7MB.mp4，返回该原始素材供我预览，不生成或剪辑视频。

> 仅按完整文件名LF_MISSING_20261110.mp4精确查找当前项目；若不存在就明确告知，不要用其他视频替代，也不要生成。

> 在当前项目中按完整文件名查找9s.mp4，返回该原始素材供我预览，不生成或剪辑视频。

LF-20独立会话：
> 按素材名称中的7MB查找当前项目已有的视频，我省略了扩展名；只查找素材，不做处理。

LF-21独立会话：
> 从当前项目按文件名分别找出7MB.mp4和9s.mp4两个原始视频，分别列出并供预览；不合并、不生成新视频。

LF-35独立会话，依次：
> 找出当前项目中真人对镜头讲话的视频，先列候选供我选择，不做其他处理。

> 选择戴黑框眼镜、坐在木桌前且右侧有笔记本电脑的男子那一段

**复现步骤**

1. 在该项目按LF-18三轮原指令查找，分别预览实际返回视频并查看交付说明。
2. 在同项目各独立会话执行LF-20、LF-21和LF-35指令，检查候选和项目归属提示。
3. 对照当前项目素材集合，核对返回文件、可播放内容和原片哈希，区分素材交付与说明误报。

**实际结果**

- LF-18两次均交付正确原片，却提示“同名素材的项目 ID 与当前项目 ID 不一致”。LF-20交付女士原片但称无法确认属于当前项目；LF-21交付两片但都被提示不属于当前项目。
- LF-35首轮列出男子、女士两候选并均可播放，却提示两者项目不同；后续选择男子正确。中间无匹配分支、后续选择及原历史保留均正常，未将这些正常分支报错。
- 当前项目eae9c93e-e9ac-471c-884c-24cf60399d22的素材列表包含上述两份精确file_id和字节数；两份下载原片与源文件SHA256一致。
- LF-18/28会话：1a0c3823-e928-4a82-b50b-e35eac0173bf；两次正向run分别run_v2_afa753ce889d45259cec346a7bebca27、run_v2_55cb6e5b24984d09ad29a81f477b8124。
- LF-20会话61aa4ca6-d80f-4e96-80c8-a6521d6e508a；LF-21会话6e0d2712-1104-4204-b4b0-b0e1d6d96159；LF-35会话5f773d7d-5dc7-4d4d-92a2-4e13dd6bf606。

**预期结果**

对当前项目已登记且正确交付的素材，说明应与当前项目实际素材集合一致，不误报无法确认归属；如存在真实限制，应提供可核实说明，不能仅以来源资产字段不同否定当前项目已包含的素材。

**影响**

用户对已找到素材的归属和可用性产生误解，可能反复上传、检索或放弃正确候选。

**补充**

同步标识：LF-STAGING-20261124-PROJECTWARNING

2026-11-24新用例执行发现，关联FWXC-524补充证据，不是严格复刻原单修复回归，不修改原单状态、类型、原正文、负责人、迭代和标签。LF-18/20/21/28/35在名称/内容交付及链路选择范围仍为Passed，项目归属说明偏差独立登记，LF-28复用LF-18链不计独立请求。工具结果的资产project_id为72cd97f2-d9aa-4b67-b8c5-79d5f645ad87，不能据此推定内部根因；未发现错片或跨账号泄漏。附件含当前项目membership、源/下载哈希、实际回复与run，未上传原始网络日志或签名链接。

**失败截图**

本轮目录导入：两份人物原片的分析结果已就绪；项目归属另以审计附件membership核验。

![LF20261124-G56-analysis-ready.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=63e87a2ab95c76774352b1d596)

LF-18完整名称7MB.mp4：正确女士原片正在播放，回复误报项目不一致。

![LF20261124-LF-18-F5-preview-1.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=2fe513c41ddc214f8298e2b184)

LF-18第三轮9s.mp4：正确男子原片与相同项目归属误报；LF-28复用本链。

![LF20261124-LF-18-F6-preview-1.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=547f4cb25d0fd786fe8d8f1143)

LF-20部分名称7MB：返回正确女士原片，仍称无法确认属于当前项目。

![LF20261124-LF-20-preview-1.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=bd2ea8caed38b5eed96af17540)

LF-21双名称：两片原始素材交付，但回复同时误报项目不同。

![LF20261124-LF-21-preview-2.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9b9be2a314a0484538af0584ac)

LF-35宽泛人物首轮：两候选已列出并播放，首轮误报项目归属；后续选男子已正常。

![LF20261124-LF-35-list-preview-2.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=8989f7e75f67ab207294af359c)
