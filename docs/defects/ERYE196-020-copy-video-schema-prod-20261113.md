# 【ERYE196-020】仅复制视频到末尾失败，提示工具参数校验错误

云效：[FWXC-571](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0b999d9b0e437d38a831abdf4d)；状态：🤔AI提缺陷。首次实测2026-11-13，2026-11-16同步；正文、业务字段及附件回读通过。

**现象**

只复制视频、不带字幕配音时，工具调用报参数校验错误，未追加视频副本。

**前置步骤**

1. 生产环境，测试账号yabinc92，Chrome有头浏览器。
2. 20秒单视频工程含已有字幕/配音及独立BGM；已取得源视频片段真实标识。

**提示词**

目标指令（首次实测完整原文）：

```text
复制此片段并接到末尾，不复制关联字幕和配音。独立ERYE196-020：当前A为0～20秒唯一视频，project_id=330d3e24-1ed7-40c1-a637-e6c20907beab，视频track_id=27f281c8-476e-4d52-b50c-ec3e966e8116，clip_id=3f0e5107-eb7a-43f1-a8f8-de45ff274387，file_id=file_cloud_cx4k5vrzshywdkm2vjit6wh65h，源0～20秒，时间线0～20秒，速度1。仅复制视频片段接在20～40秒，不复制字幕、配音或背景音乐，原片段及其他原对象不变。只在当前工程编辑，不生成替代视频。
```

**复现步骤**

1. 发送仅复制视频至20～40秒、不复制字幕配音的完整指令。
2. 查看工具结果并刷新，核对视频片段数和原字幕/配音。

**实际结果**

Editor timeline paste失败：parameters.clips.0.clip invalid anyOf，并提示missing volume、opacity、transform、fade。刷新仍为单视频0～20秒，副本未创建，原49字幕及6配音保持。

首次实测会话： https://app.cinlink.ai/c/207f1460-389a-4734-b8ac-2fff97f590d5

**预期结果**

20～40秒出现正确的视频副本，字幕/配音不重复复制，原对象保持。

**影响**

最小范围的视频复制操作无法完成。

**补充**

同步标识：ERYE196-020-PROD-20261113-SYNC-20261116

未点击重试；副本画面检查未到达。校验报错作为定位证据，产品问题为实际复制失败。

首次实测日期2026-11-13；本次于2026-11-16整理和同步，未重跑业务。原指令中的对象ID为首次实测定位，当前会话经历后续测试；复现前按前置恢复基线并读取该次真实对象标识。未覆盖的后续步骤不计通过。

实际提交时间、完整原指令与必要对象/轨道核对见附件 `ERYE196-020-evidence-audit.json`。原始带签名链接的HAR、浏览器状态和登录资料未上传。

**失败截图**

ERYE196-020 2026-11-13真实场景证据：020-tool-result.png

![020-tool-result.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0d6d79f75ca2cac6f0d9d6ce64)
