# ERYE237-005/Agent 原始带背景图生产复测 R2

2026-11-09；版本2026-11-09-layered-execution，按用户纠正基线重测。**Failed：蓝底首步失败；绿底和三版连续性未覆盖。** 本批替代前一轮去背景图005作为当前业务回归结果；不覆盖原始证据。

## 前置与源版本

生产https://app.cinlink.ai/，macOS有头Chrome，账号yabinc18 Creator；既有项目ERYE237-001-prod-20261106，会话4d81b2cf-17a2-4972-95b6-583a3948dca0。通过原生CUA操作，串行零重试。

在既有11.png图片工程点击**原始历史项editor_image_7cffcedd67bc40e0915021594dbb3ad7**，实际画布确认为红纸船、浅色不透明背景及投影，保存01-original-before原始截图及AX；排除去背景项editor_image_167a55d52a97443b8eb86683e3b987b2。原始文件1024×1024、PNG color type 2（RGB），SHA为084c0641a3083dbe3f3e1049200d280cf5936f2448b9768853af3bca4a67a1ce。本地元数据与真实画布共同说明选用基线，不能单凭文件头证明远端源绑定。

工程原先已建立，可从其历史选择原图；本轮没有上传、去背景或新建工程。用例005前置已更新为未去背景原图；第二步只允许使用本轮实际蓝底结果。

## 正式指令

提交UTC：2026-11-09T10:08:05.472Z。只提交一次。

> ERYE237-005重新测试第一步：本次使用当前“11.png”图片工程中已经选中的原始图片版本，画面是红色纸船、浅色不透明背景及阴影，不是去背景的透明版本。请以这张原始图片为源，把背景改成纯蓝色，保持红色纸船主体不变，并保存为同一图片工程的新版本，保留原图和已有历史。不要使用去背景版本，不要先执行去背景，不要创建其他工程，不导出。完成蓝底编辑后停止，下一步会继续基于真实蓝底结果把背景改绿。

## 实际执行

Agent规划明确识别原始文件file_cloud_jv7hh3jdwqx2z3ztl42jhz32bj（1024×1024、无透明通道），并说明本次原图替代此前去背景源；拟通过editor_task_submit/image.generate及editor_task_apply保存在已有工程a9da0cf4-a68e-5a70-91d4-e61380a7b3a9。此处标识来自页面实际规划，仅作观察，不冒充已完成工具回执。

页面进入失败终态，第一项Editor project get下显示：

```
Billing freeze failed: HTTP 400 [invalid_input]: Cannot verify editor generation inputs for billing; no task was started.
```

Editor task submit、Editor task apply及末次Editor project get显示失败；没有蓝底新图或新增历史，画布仍是带浅色背景及阴影的原始红纸船。原两项历史保留。未点击重试；未发送绿底请求，不以旧图、透明图或重新生图替代真实蓝底依赖。

预期为原图→蓝底V2→以V2继续绿底V3，两次均追加在同一工程并保留源及旧版本。蓝底编辑在已满足原图前置后失败，故005/Agent为Failed；并非测试没有准备原图而Blocked。

## 与上一轮区别及证据边界

上一轮用了去背景图，Agent终态称缺确定性铺底能力；用户纠正后本轮已换到带背景原图，实际报错为计费输入校验失败，不能再把上一轮的能力说明作为本轮根因。页面“no task was started”是错误原文，不等同于账本已核实零费用；真实provider/账务和完整任务run_id未取得，不编造。

02-blue-observed同期页面短暂出现“请先处理当前未提交草稿，再从历史版本继续编辑”及标注工具选中；03-blue-terminal最终回读该通知已消失。本轮没有创建批注或绘制，没有擅自清除期间变化的草稿；通知的来源及与计费错误关系未确定，不作为已证根因。本轮没有通过手动编辑实现Agent目标。

本机证据：reports/erye237-005-original-prod-20261109-r2/，含01原图前置、02观察、03终态原始JPEG与AX、完整指令/提交时间、baseline、results及SHA清单。正式Agent请求1次，自动重试0、准备任务0、可见受理图片任务0、导出0、云效写入0；费用未核。结束无运行任务，输入框为空，画布保持原图，原两项历史保留。

本次只更新005的Agent分支及源版本规范；001/004 UI Passed、002/003 Agent Failed保持，分层版当前仍2 Passed/3 Failed/258 Not Run。技术分支未执行，旧历史执行字段不改。
