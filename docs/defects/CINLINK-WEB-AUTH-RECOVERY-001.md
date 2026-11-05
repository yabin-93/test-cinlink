# CINLINK-WEB-AUTH-RECOVERY-001 · [FWXC-280](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=2a054eeafdcc228eb453d2c94a)

2026-11-05已同步云效，优先级高、严重程度2-严重；2张本次原始PNG已上传并嵌入，另附1份脱敏定位JSON，正文/字段/附件/图片引用回读通过。[本批执行记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)。

**现象**

关闭页签后从历史重开原会话，工作台仍显示已登录，但已完成视频无法播放；继续发送指令显示`Authentication is required`，没有创建新任务。认证请求持续失败并重试至429，未引导重新登录。

**前置步骤**

1. 预发账号yabinc18，新建非项目会话，仅上传`7MB.mp4`（英文，60.496秒，1280×720，有音轨）并发送登记指令。
2. 同一会话第1轮字幕水印任务实际发生计费失败；再发送第2轮20秒高光＋2倍增强，完成计划确认并等待`done`及MP4产出。
3. 保留浏览器上下文及登录态，不清除Cookie/缓存；关闭当前页签后打开首页，经侧栏历史选择同一会话。凭证失效的具体触发条件尚未确定。

**提示词**

登记：保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。

准备第1轮（实际failed）：
```text
根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。
```

准备第2轮（实际done）：
```text
先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。
```

触发第3轮（已尝试发送，当时未创建run）：
```text
根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。
```

**复现步骤**

1. 第2轮完成后关闭页签，再从历史打开原会话，观察视频卡片。
2. 在无附件/无引用输入框中输入第3轮指令并点击发送。
3. 检查页面错误、任务是否受理，以及认证刷新/项目令牌交换请求。

**实际结果**

- 2026-11-05，Web预发、Chrome有头；构建`index-BOgmdX3S.js`。
- 会话ID：`d0fc4819-0be6-421e-b416-81fc0c94da46`；已完成第2轮run：`run_v2_9cb9dff8c83b41e38fb539b7c365fa1f`，状态`done`。
- 第2轮MP4 ID：`file_cloud_doqtw47bhf4bh2woycbwh2uax6`，19.861秒、2560×1440；API下载可用、SHA-256未变，页面卡片却显示“视频加载失败”。
- 第3轮点击发送后，UI显示`Failed / Authentication is required`；等待120秒未获得任务受理响应，网络与原会话回读均未发现本次新run。不能把该UI Failed当作服务端run失败。
- 同一现场`/platform-api/v1/auth/validate`返回200共4次；`/platform-api/v1/auth/refresh`返回401共190次、429共116次；`/cloud-tool-api/v1/editor/projects/view/exchange`返回401共78次。

**预期结果**

凭证有效时正常恢复视频播放及任务提交；凭证无法恢复时终止无效重试，明确提示并提供重新登录入口，保留原会话及草稿，不将未创建的任务表现为执行失败。

**影响**

历史视频无法预览，新指令无法执行；用户在仍显示登录的工作台无法按提示自助恢复，并产生大量无效认证请求、触发限流。

**补充**

缺陷键`CINLINK-WEB-AUTH-RECOVERY-001`。单次refresh 401是预期fallback，本项关注持续重试至429和UI未引导恢复；未定位凭证失效/恢复失败的根因及发生频率。09:08人工重新登录后，原会话第3～5轮可执行；未重发已经受理的任务。相关FWXC-242描述执行链缺凭证，本项在提交前认证恢复失败、无新run，尚无同根因证据，独立跟踪。脱敏请求计数及原任务定位见附件。

**失败截图**

017第2轮完成后从历史重开原会话：成片卡片“视频加载失败”，页面仍在已登录工作台，出现Authentication is required。

![SSO-017-R2-reopen-video-auth-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=557f8aa5ec4fb3aa3ecbdb189f)

017尝试发送第3轮后：页面Failed / Authentication is required；未创建新的服务端run。

![SSO-017-R3-authentication-required.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f70a09615f951a36702b6aaaa4)
