# CINLINK-ERYE196-VIDEO-TRIM-001 · [FWXC-347](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=83eea6f9c327d3ab2a909205f7)

2026-11-06按用户“整理成缺陷提交到云效”要求，针对用户自建工程上的S1单视频裁头失败，新建1条缺陷。沿用用户已明确的无需查重偏好，没有进行重复项查询、修改其他缺陷或重新执行任务。

项目cinlink-WEB；优先级高、严重程度2-严重；负责人使用本次字段默认值，回读为牛诗晴。缺陷标题/正文及项目、类型、负责人、迭代、标签、优先级、严重程度均回读通过。1张本轮真实失败PNG已嵌入正文末尾，另附1份脱敏JSON；2附件ID、名称、字节数与上传副本一致，本地原图及副本SHA256一致。

**现象**

正式环境通过Agent仅执行“裁掉视频开头4秒”时任务失败，视频没有被裁剪。工程读取成功后，视频裁剪调用缺少轨道和片段标识；单一短指令也可复现。

**前置步骤**

1. 使用有工程编辑及Agent任务权限的测试账号进入[正式环境会话](https://app.cinlink.ai/c/9500f848-2da3-4dd4-be21-43149cd5fd29)。本次页面账号1020817070，会话ID：`9500f848-2da3-4dd4-be21-43149cd5fd29`。
2. 在编辑器打开用户手动创建并已保存的工程“英文30S.mp4”（工程ID：`a4c860bc-f50d-4f73-9b20-7c31ca2dd748`）。本次版本2，只有一个视频片段，1920×1080、29.97fps，源及时间线0～30.6306秒。
3. 确认当前工程名称及保存状态。本例只测试单视频裁头，不需要@视频、逐句配音或BGM前置；本次工程已有字幕和独立旁白，记录其基线并保持。

**提示词**

```text
先只做一步：在当前工程“英文30S.mp4”中裁掉视频片段开头4秒，暂时不移动片段，也不调整字幕和旁白。
```

**复现步骤**

1. 在当前工程的Agent输入框一次发送上述短指令。
2. 等待任务结束，查看工程读取、视频裁剪步骤和错误提示。
3. 回读或重新打开该工程，核对视频源范围、时长和已保存版本。

**实际结果**

- `editor_project_get`成功，`editor_video_clip_trim`失败，错误码`INVALID_ARGUMENT`。
- 错误原文：`Editor tool arguments do not match its schema; parameters: missing track_id, clip_id; parameters: missing track_id, clip_id`。
- 实际`parameters`仅为`{"source_in_sec":4,"source_out_sec":30.6306}`，未包含`track_id`、`clip_id`。本次工程中真实视频轨道为`edit_728d71cfd1bf701ea515f155b0185015`，片段为`edit_3970e98669ed3c7a1d90576b82bf781b`。
- run_id：`run_v2_48526a29e3c240fb882571b9a89a7a91`；trace_id：`a054b55f-0fb9-43b1-b003-afbc9dbc00ee`；operation_id：`da636cd5-b4da-43db-82e7-a1255b812c97`；终态`failed`。
- 视频仍为源0～30.6306秒，完整工程内容不变、版本2→2；字幕和旁白后续步骤未开始。

**预期结果**

根据当前已保存工程识别视频轨道和片段，完成本次单视频裁头；保留源4～30.6306秒的内容，保存后重开一致。不额外执行片段移动、字幕或旁白的独立编辑。

**影响**

用户无法通过Agent完成基础的视频片头裁剪；后续字幕、旁白同步链路无法继续验证。

**补充**

关联ERYE196-014的S1单项诊断。本次真实用户自建工程、短指令、一次提交，无补槽或业务重试；不是组合编辑指令过长才出现的问题。需定位工程读取结果到裁剪调用的参数生成/补齐/绑定环节，具体根因未确认。与FWXC-339的批量编辑缺commands相关，是否同根因待研发判断。

截图下半部是本次单视频裁头请求及错误，上半部为同会话此前的组合请求。定位标识：`CINLINK-ERYE196-VIDEO-TRIM-001`。脱敏JSON附有本次真实调用和保存前后对照。

**失败截图**

本次单步裁头失败在截图下半部：工程读取成功，视频裁剪缺track_id/clip_id；原工程仍为30.63秒。

![ERYE196-014-S1-production-video-trim-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ccfe13e756ce7255350bd0ba4e)

## 本地原始证据与回读

[本次单步实测原图](../cases/requirements/ERYE-196/evidence-014-user-project-20261106/014-S1-video-trim-user-result.png)；SHA256：`7d02660557d50bc44172f93db3de39825e4264e0c2bd9c847e8b2f62491f69cf`。未修改截图画面。

| 文件 | 云效附件ID | 字节数 |
|---|---|---|
| ERYE196-014-S1-production-video-trim-failed.png | `ccfe13e756ce7255350bd0ba4e` | 357501 |
| ERYE196-014-S1-production-evidence.json | `07e2d9702d5a43476565a1429a` | 1842 |

本次仅同步该单步缺陷，未修改FWXC-339。014联动用例及S1诊断仍Failed，原工程版本2及内容保持；后续旁白/字幕单项未执行。
