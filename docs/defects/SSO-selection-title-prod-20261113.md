# FWXC-473：【生产环境】30秒无字幕高光母版选片报缺少主题标题，未交付视频

2026-11-13：[云效缺陷](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9a1336e6a73b018924df1b9e73)。前置已按用户要求压缩为3条；正文及原截图引用通过官方OpenAPI回读确认，其他章节保持。

**现象**

要求生成30秒无新增字幕/水印高光母版，Select highlights失败，报 Correct the previous selection: Return a title for each topic in the cut.，未交付视频。

**前置步骤**

1. 生产环境 https://app.cinlink.ai/，测试账号yabinc18，独立非项目会话。
2. 原片7MB.mp4已登记：约60.5秒、1280×720、英文原声。
3. 除素材登记外，无其他业务产物。

**提示词**

登记消息：

保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。

SSO-025 第1轮：

从最初上传的7MB.mp4原片剪一个30秒高光母版，保持1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

**复现步骤**

1. 按前置建立独立空白会话，上传并登记原片。
2. 发送第1轮完整指令一次。
3. 等待原任务终态，检查Select highlights和交付列表。

**实际结果**

SSO-025 R1：会话 aa4a1154-5be8-4c4e-9bfb-584ec850775a；run_id run_v2_c9edd4abd89e4b50a2cc7e48a3487268；终态 failed。

select_highlights failed；后续工程准备、审阅、渲染/调整尺寸未完成，result_files为空；用户没有收到可填主题标题的业务澄清表单。

**预期结果**

自动完成高光所需的主题信息并交付约30秒、720p、保留选中片段原声且无新增字幕/水印的母版；必要澄清应通过可操作的业务交互完成，而非内部字段校验报错。

**影响**

缺少无字幕母版，中文、英文、日文交付及中文增强分支无法继续。

**补充**

同步标识：sso023-027-prod-20261113-selection-title

2026-11-13生产实测。与“选片超过目标时长”和“缺工具定义”错误不同，单列可观察的标题校验失败；是否共同内部根因待研发确认。

详细实际任务输入、产物信息和完整原提示词见脱敏evidence.json。没有重跑用例，不把依赖阻塞轮或内容未覆盖项报为独立失败。

**失败截图**

SSO-025第1轮实际终态：主题标题校验失败

![SSO-025-r1-complete.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=90f421d99101461438e1acb95d)
