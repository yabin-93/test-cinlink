# FWXC-414 生产回归及两条扩散（2026-11-12 R3）

整项Blocked，不能判完整回归通过。生产app.cinlink.ai，yabinc92 Creator，当日专用项目d15de3bc-fa92-431b-8e8f-dbed3d151a22，每场景独立干净会话，串行零额外业务重试。原缺陷预发，本轮按用户明确指定改生产，不推断预发通过。

## 公共步骤与验收范围

登录上述账号，进入当天专用项目，新建空会话；不上传、不@、不点击快捷入口，逐项只发送下面完整提示词一次。先观察是否有导入前目标澄清，再等待完成，检查真实素材卡、播放器与分辨率展示。媒体文件核验须检查本轮实际文件，不能使用历史素材或另一例产物代替。

## O-a：Blocked（文件核验未覆盖）

提示词：

https://www.youtube.com/watch?v=aqz-KE-bpKQ&t=445s

预期：先自动导入完整原片，不必先澄清；t仅定位。

会话：https://app.cinlink.ai/c/6a294787-0497-4271-ab1d-55fc6ff033be

实际：48秒自动导入完整原片，youtube.mp4，卡片3840×2160，播放器10:34；无导入前澄清。下载按钮已点击一次，尚无本地文件，媒体文件核验待补。

页面专项检查执行通过；完整媒体文件核验未覆盖，整例Blocked。

原始截图：reports/fixed-regression-20261112-r3/414-Oa-result-native.png

## O-b：Blocked（文件核验未覆盖）

提示词：

https://www.youtube.com/watch?v=aqz-KE-bpKQ&start=445

预期：完整导入，不将start当裁剪。

会话：https://app.cinlink.ai/c/90bc5f67-7f68-4df1-8b35-2650e39bac60

实际：36秒自动导入youtube.mp4，3840×2160，10:34，无导入前澄清；下载已点击一次，媒体文件核验待补。

页面专项检查执行通过；完整媒体文件核验未覆盖，整例Blocked。

原始截图：reports/fixed-regression-20261112-r3/414-Ob-read-native.png

## O-c：Blocked（文件核验未覆盖）

提示词：

https://www.youtube.com/watch?v=IwZVXmQdX1E&list=PLB29CbKaE2OY

预期：v+list按单视频自动导入。

会话：https://app.cinlink.ai/c/b5b75002-93ec-4dfb-b27d-9bd6185e1369

实际：31秒按单视频自动导入，卡片3840×2160；原片实际可播放月球画面；无导入前澄清。下载已点击一次，媒体文件核验待补。

页面专项检查执行通过；完整媒体文件核验未覆盖，整例Blocked。

原始截图：reports/fixed-regression-20261112-r3/414-Oc-download-native.png

## E1：Blocked（文件核验未覆盖）

提示词：

https://youtu.be/aqz-KE-bpKQ?t=445

预期：短链接定位也自动导入完整原片。

会话：https://app.cinlink.ai/c/b4746c9f-31cf-45ae-8e3e-ef59a311064c

实际：50秒自动导入原片，3840×2160，无导入前澄清；媒体文件待补，下载为异步按钮处理，不将未落盘归因为产品失败。

页面专项检查执行通过；完整媒体文件核验未覆盖，整例Blocked。

原始截图：reports/fixed-regression-20261112-r3/414-E1-result-native.png

## E2：Blocked（文件核验未覆盖）

提示词：

https://www.youtube.com/watch?v=IwZVXmQdX1E&list=PLB29CbKaE2OY&t=10s

预期：v+list+定位仍为完整单视频。

会话：https://app.cinlink.ai/c/79a36b7b-1e51-42ac-bee0-07754e7bbd23

实际：40秒按v指定单视频自动导入，无导入前澄清，3840×2160；完整文件核验待补。

页面专项检查执行通过；完整媒体文件核验未覆盖，整例Blocked。

原始截图：reports/fixed-regression-20261112-r3/414-E2-result-native.png

## 核验缺口与操作偏差

未取得本轮完整下载文件，无SHA256、全解码或精确时长/实际分辨率实测，不用卡片文字冒充实际编码参数。下载按钮有禁用等待状态，Chrome下载记录和本机Downloads未发现对应新文件；早期部分下载操作后切换了会话，后续保留原页等待，不将该过程直接判为产品下载缺陷，也不自动重发导入任务。前台多次切到云效、其他ChatGPT会话和ego lite，可能影响原生点击；截图不属于当前测试页时停止操作，未将其作为本例证据。

原生方法为macOS AppleScript辅助功能、真实截图，后段补充CoreGraphics鼠标事件；并非恢复了mcp__cua_repl。Chrome通过AppleScript执行JavaScript关闭，未启用该设置；后续只读播放器信息的DevTools尝试未取得有效数据，不计为核验完成。

原页面问题本轮未复现；没有已证实的新增扩散业务失败，保留未覆盖，不把无法核实的问题直接提为新缺陷。原回归及扩散逐项写原缺陷评论，整项不设AI通过，无Git提交推送。


## 持续检查基线（2026-11-13 22:01）

本项仍由陈亚宾创建且云效精确为已修复，已排入持续任务4首次基线。本轮仅完成资料/前置检查，账号或串行条件阻塞，原目标及扩散均未执行，保持已修复；上述历史结论不作为本轮实测。[本轮报告及续跑条件](fixed-monitor-20261113-215548.md)。


最新真实回归：2026-11-14持续任务，见 [本轮记录](FWXC-414-retest-staging-20261114-monitor.md)。云效已回读本轮目标状态；本文件历史结果保留。
