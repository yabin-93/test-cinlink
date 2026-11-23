# CINLINK-ERYE196-VIDEO-SPLIT-001 · [FWXC-350](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=96fde22e756e50026ec43649fa)

2026-11-06按用户要求，将B02“单视频5秒分割调用保留模板、base_revision类型错误”直接新建为1条云效缺陷。沿用不查重偏好，没有查询重复项、更新或重开其他缺陷，本次未重跑B02。

项目cinlink-WEB；优先级高、严重程度2-严重；负责人使用项目默认值，回读为牛诗晴。标题、正文、项目/类型、负责人、迭代、标签和优先级/严重程度回读通过；1张真实失败截图已嵌入正文末尾，另附1份脱敏调用JSON，附件ID/名称/字节数及图片引用均核验通过。

**现象**

正式环境通过Agent将当前唯一视频在时间线5秒处分成两段时，工程读取成功，但分割调用报参数类型错误，任务失败，视频仍为一段。

**前置步骤**

1. 使用有工程编辑及Agent权限的测试账号进入[正式环境会话](https://app.cinlink.ai/c/9500f848-2da3-4dd4-be21-43149cd5fd29)。本次页面账号1020817070，会话ID：`9500f848-2da3-4dd4-be21-43149cd5fd29`。
2. 打开已保存的工程“英文30S.mp4”，工程ID：`a4c860bc-f50d-4f73-9b20-7c31ca2dd748`，本次版本18。
3. 确认视频为唯一完整片段，源0～30.6306秒、时间线起点0、速度1（1920×1080、29.97fps）。保留现有字幕手动分段和时间修改、静音原声及独立旁白；不需要重新上传或@视频。

**提示词**

```text
只把当前工程中唯一的视频片段在时间线5秒处分成两段，保留全部视频内容，不移动片段。
```

**复现步骤**

1. 在当前工程Agent输入框一次发送上述指令。
2. 等待工程读取和视频分割执行结束，查看失败提示。
3. 刷新并重新打开同一工程，核对视频片段数量、源范围及保存版本。

**实际结果**

- `editor_project_get`成功，`editor_video_clip_split`失败，错误码`INVALID_ARGUMENT`。
- 错误原文：`Editor tool arguments do not match its schema; base_revision: invalid type`。
- 实际`base_revision`为字符串`{{steps[0].result.revision}}`，未解析成当前修订值18；`parameters`中的track_id、clip_id也保留前序结果占位表达式，完整实参见JSON附件。
- run_id：`run_v2_aec40ab42ad14b9792b26e618bd1d1b4`；trace_id：`5f6b4eed-9dc1-4dde-bb87-cadd428543bc`；operation_id：`8d34716f-86ce-44a7-8cef-678d45f8fdf3`。终态`failed`；提交时间2026-11-06 17:40:05（Asia/Shanghai）。
- 视频仍为1段、源0～30.6306秒；完整工程内容、字幕和旁白执行前后及刷新后不变，版本18→18→18。

**预期结果**

根据当前工程及真实读取结果完成分割：同一视频形成源0～5秒、5～30.6306秒的两段，时间线起点分别为0和5秒；无内容丢失、重复或空隙，速度及总时长保持，保存后刷新一致。

**影响**

Agent无法完成单视频分割这一基础编辑操作，用户无法继续基于新片段编辑。

**补充**

关联单动作基础用例B02。真实目标视频轨道`edit_728d71cfd1bf701ea515f155b0185015`、片段`edit_3970e98669ed3c7a1d90576b82bf781b`。本次仅提交一次，无补槽或业务重试；未进入分割后切点播放验收。参数模板解析/绑定的具体内部原因待定位。截图中的字幕分段是既有手动编辑，不是本次视频分割产物。定位标识：`CINLINK-ERYE196-VIDEO-SPLIT-001`。

**失败截图**

本轮B02：工程读取成功，分割报base_revision invalid type，原视频仍为一段。

![B02-production-video-split-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7d3260f4868bfa7ffa88c6fd6b)

## 本地证据与附件回读

[本轮主失败截图](../cases/requirements/ERYE-196/evidence-B02-prod-20261106/B02-failed-settled.png) · [执行报告](../cases/requirements/ERYE-196/results-B02-prod-20261106.md)。原图未修改，原始截图、归档及上传副本SHA256一致：`c92f42edbdc7dd93f7a1138da8deeda213b419260878e18fecd7c27543abb611`。

| 文件 | 云效附件ID | 字节数 |
|---|---|---|
| B02-production-video-split-failed.png | `7d3260f4868bfa7ffa88c6fd6b` | 508079 |
| B02-production-video-split-evidence.json | `83ae814e0b35cefb1b75af2997` | 3453 |

B02仍Failed，基础清单0 Passed / 3 Failed / 21 Not Run及原134条预发统计保持。本次仅同步B02缺陷，没有重跑、改工程或修改云端代码，没有修改FWXC-349/FWXC-347等既有缺陷。
