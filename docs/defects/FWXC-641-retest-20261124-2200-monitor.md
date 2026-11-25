# FWXC-641 · 当前新修复轮回归

最新实测记录：2026-11-25T12:54:19.290020+08:00。

原环境：production；本轮实测预发staging-app.cinlink.ai、Google Chrome有头、yabinc92。原问题与两条扩散独立判定，历史结果不计本轮实测。

专用项目：3bb7e789-f86b-48ac-aa69-d1fc7a5c8a4b。实际源文件：reports/fixed-acceptance-20261125-104653/fixtures/641/E196-prores-4s-081.mov；SHA256：8c60496b89fa4853dbad6403796f3e99d1f29b728b08ed6ba2aa594ebad167c4。

当前云效：✅AI通过；本轮状态同步已回读：True。

## original · Passed

原附件显式播放4秒但videoWidth/Height为0；同一严格4秒ProRes MOV导入独立编辑器，出现短暂准备预览后时间线视频/原声0–4秒，关闭再重开无旧“页面暂时无法显示”。重开后实际点击预览播放，0.50–0.55秒现场显示与原源解码帧一致的人物和美国旗帜，工程预览恢复，原问题Passed。片尾黑屏不作为失败。未触发旧页面错误后的补救指令，不虚构错误。原MOV本地SHA256及120视频/63音频帧全解码已核，UI保留MOV文件名及独立原源；浏览器blob下载能力不支持，未审计服务端文件完整哈希，不能声称服务端字节级一致。

conversationId：c2b4fe27-0ee9-4add-80be-a127e1e1067d
promptFile：reports/fixed-acceptance-20261125-104653/execution/641/O-preparation-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/641/O-result-ui.txt
screenshot：reports/fixed-acceptance-20261125-104653/execution/641/O-mid-playback.png

## expansion1 · Passed

独立会话仅回复初始化3.3秒后，空编辑器选择同一4秒ProRes原MOV一次，真实时间线视频/原声0–4秒。完整页面刷新，回到原会话并重开保存工程，未出现页面错误，实际播放0.83秒现场显示同一人物/旗帜，片段和MOV源名保留。无重新登记/生成/代理替换，服务端完整源文件哈希未审计。

conversationId：25368451-3356-429a-a020-53384db1a4cc
promptFile：reports/fixed-acceptance-20261125-104653/execution/641/E1-session-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/641/E1-result-ui.txt
screenshot：reports/fixed-acceptance-20261125-104653/execution/641/E1-refreshed-preview.png

## expansion2 · Passed

独立同源云端代理请求40秒完成，UI明确区别原MOV与新MP4。实际一次点击下载后文件已保存（工具download事件超时未重复点击）；实际文件349292B、4.000秒、1280×720 H264/AAC，PyAV完整解码120视频/63音频帧无异常。Chrome显式播放代理currentTime0.257秒、1280×720、paused=false；原MOV附件仍单独存在且不能解码视频。原源与代理未混称，服务端原MOV完整字节哈希未审计。

conversationId：16df9fc5-eb7a-4dc4-9707-1581b53f00eb
promptFile：reports/fixed-acceptance-20261125-104653/execution/641/E2-prompt.txt
evidence：reports/fixed-acceptance-20261125-104653/execution/641/E2-proxy-audit.json
screenshot：reports/fixed-acceptance-20261125-104653/execution/641/E2-proxy-playing.png

固定可重跑脚本状态PLAN；本轮CUA执行不算脚本已实现。受理请求仅回读，不重发；无评论、新单、附件或Git提交。用例正文及README只读。

原描述、附件及历史索引见监控快照；本轮前置历史已保存至reports/fixed-acceptance-20261125-104653/execution/641/prior-preflight-report.md，未覆盖事实保留。


2026-11-25T12:54:31.237666+08:00 FWXC-641本轮结束：original:Passed / expansion1:Passed / expansion2:Passed。预发/yabinc92、Chrome原生有头。云效同步证据见本例状态记录。本轮受理全部终态，无重试、评论、新单、附件或Git；固定脚本PLAN。完整证据reports/fixed-acceptance-20261125-104653/execution/641/final-result.json。
original：原附件显式播放4秒但videoWidth/Height为0；同一严格4秒ProRes MOV导入独立编辑器，出现短暂准备预览后时间线视频/原声0–4秒，关闭再重开无旧“页面暂时无法显示”。重开后实际点击预览播放，0.50–0.55秒现场显示与原源解码帧一致的人物和美国旗帜，工程预览恢复，原问题Passed。片尾黑屏不作为失败。未触发旧页面错误后的补救指令，不虚构错误。原MOV本地SHA256及120视频/63音频帧全解码已核，UI保留MOV文件名及独立原源；浏览器blob下载能力不支持，未审计服务端文件完整哈希，不能声称服务端字节级一致。
expansion1：独立会话仅回复初始化3.3秒后，空编辑器选择同一4秒ProRes原MOV一次，真实时间线视频/原声0–4秒。完整页面刷新，回到原会话并重开保存工程，未出现页面错误，实际播放0.83秒现场显示同一人物/旗帜，片段和MOV源名保留。无重新登记/生成/代理替换，服务端完整源文件哈希未审计。
expansion2：独立同源云端代理请求40秒完成，UI明确区别原MOV与新MP4。实际一次点击下载后文件已保存（工具download事件超时未重复点击）；实际文件349292B、4.000秒、1280×720 H264/AAC，PyAV完整解码120视频/63音频帧无异常。Chrome显式播放代理currentTime0.257秒、1280×720、paused=false；原MOV附件仍单独存在且不能解码视频。原源与代理未混称，服务端原MOV完整字节哈希未审计。
