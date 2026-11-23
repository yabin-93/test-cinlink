# 【ERYE196-080】预览资源失败仅显示无法加载媒体，缺少原因、保存状态说明和重试入口

云效：[FWXC-639](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ee73f3a444f3fb1d1a5f070544)，官方OpenAPI回读核验通过。

**现象**

预览资源失败后文档保留并可刷新恢复，但仅显示无法加载媒体，无原因/重试与保存状态说明。

**前置步骤**

1. macOS Chrome登录CinLink生产环境，测试账号U1（yabinc92）。
2. 打开独立20秒视频工程E196-A20-controlled.mp4（1280×720），原视频及关联原声已保存。
3. 保存稿已有084新版字幕4.267～6.267秒、E196-R1水印、BGM50%及原声100%，预览起初可加载。

**提示词**

无Agent提示词。本机故障注入仅作用于已观察到的当前预览资源：
```javascript
const v = document.querySelector(".ed-preview-visual video");
URL.revokeObjectURL(v.currentSrc);
v.load();
```

**复现步骤**

1. 在隔离标签页打开并回读该保存稿，备份真实文档。
2. 对当前预览blob执行上述资源失效注入，等待浏览器媒体错误。
3. 检查错误说明、编辑保存状态及局部重试入口。
4. 刷新该标签页并回读文档，确认预览和工程是否恢复。

**实际结果**

浏览器实际报MEDIA_ELEMENT_ERROR/Format error（code4）；预览仅显示“无法加载媒体”，未说明编辑是否已保存、具体失败原因或提供局部重试入口。字幕、水印和时间轴仍保留；刷新后预览恢复。前后真实保存稿revision13且content完全相同，未重发编辑批次。
会话520159ef-7b0a-4b0e-8ff8-979eb945b431。

**预期结果**

区分保存成功与预览失败，展示可理解的原因和重试方式；保留保存稿，不要求重做已保存编辑。

**影响**

用户无法判断修改是否保存，也缺少就地恢复预览的操作提示。

**补充**

同步标识：ERYE196-080-PROD-20261117-PREVIEW-ERROR-RECOVERY

2026-11-17 Chrome生产实测；本次仅同步既有失败及只读补核截图，未重发业务任务。
仅为浏览器本地预览资源失效，不是云端合成服务故障。文档保持和刷新恢复分支通过，不扩大为编辑丢失。
需求来源：ERYE-196对应正式用例。
查重：FWXC-574为水印时段设置；FWXC-489为刷新后面板记忆变化，均非预览错误恢复提示。

**失败截图**

本地预览资源失效时的原始页面；无原因/局部重试及保存状态说明。

![080-preview-resource-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7df076188ca98995faa2ba6c5d)

刷新后恢复的实际工程，用于保存稿未回滚的对照。

![080-preview-restored-after-reload.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e521021a43f5bce8413033867b)
