# FWXC-480 Chrome预发回归（2026-11-17）

**原回归 Passed / 扩散一 Passed / 扩散二 Passed，执行通过。** Google Chrome原生有头、staging-app.cinlink.ai、yabinc92。原图→蓝底→绿底均追加到同一图片工程；两独立扩散的黄色版和原生透明版也完成保存及实际刷新核验。20:15官方回读已为✅AI通过，无重复写入；20:35:02再次GET已由后续流程推进为**测试完成**，保留该状态，不回退。本轮0状态写入、0评论/附件/新单，无Git提交推送。固定可重跑脚本仍PLAN，本轮为CUA与实际文件核验。

## 来源与准备

原11.png为1024×1024红纸船、浅色背景。本机原文件1059420字节、SHA256 084c0641a3083dbe3f3e1049200d280cf5936f2448b9768853af3bca4a67a1ce；完整PNG解码RGBA SHA256 0efaa61394adbfa8d1b5c0b2be9e5cf8872491b58b8bcb3cba0181619c5672a5，与原缺陷证据像素摘要精确相同。当前实际源导出为1413124字节、SHA256 a9f55282b6dcdae9e64be7b6d065f8fda475402083c394a14e754498e60e66e7，进一步与原缺陷源导出**字节完全相同**。溯源见fixtures/480-original/manifest.json。

19:55:42官方GET已修复，creator/project门禁通过。独立项目ed679d5e-8d5d-460f-ba2a-9d5e5e8dab03。三会话均重新附加原始文件、分别导入独立图片工程及源版本。准备中的editor_image_project_create均报invalid JSON for conversation_id，但后续editor_open实际打开；通过真实源PNG与工程身份核验准备达成，保留错误，不重发准备或把Agent未确认回复当作图片不存在。

| 场景 | 会话 | 独立图片工程 |
|---|---|---|
| 原回归 | f838db4e-0de4-4819-a351-482290860604 | 6bb4f1a9-2d05-48fb-a8be-6c315495201d |
| 扩散一 | 5e5143b6-d4b9-4e28-a9ea-19bf54f48bc3 | ab67fd25-4701-4d63-bf49-398536c7c908 |
| 扩散二 | 069b53eb-cb3b-48d7-b65f-be35b6bc453c | 78a5b3d8-470d-4edb-96fc-08e5caac6994 |

## 原回归：Passed

原始版editor_image_06b5769e0c074dd7ac491b1fb97e00c7。页面原生移除背景仅一次，建立透明历史editor_image_7484dbeb6c4f479a88f4500472438d6e，再明确切回带浅色背景原始版；蓝底前所选源导出仍a9f字节相同，两历史前置复刻完成。原蓝底完整指令仅发送一次：

> 将工程“11.png”当前已选择的未去背景、保留浅色原背景的原始版本背景改为纯蓝色RGB(0,0,255)，红色纸船主体的形状、颜色、位置不变，保持1024×1024尺寸，生成并保存为同一图片工程的新版本，保留原图及全部历史。不要使用去背景版本，不先去背景，不新建其他工程，不导出。完成此步后停止，后续将基于实际蓝底结果改为绿底。

蓝底run_v2_d02dd72b05074510b0aad545abb8a046，71241ms Agent done。实际editor_view_get→editor_image_history(view)→editor_image_prepare_task→editor_task_get；输入工程6bb4、源06b、1024²/revision5。会话终态时画布仍生成中，继续等待同一次异步任务，未把intent=true直接当最终图片完成。实际新增蓝底editor_image_e83fbf2cf52c4926b79cc6401c9f93c5，原工程三历史保留。下载真实蓝底，实际CmdR重开同一工程后再下载蓝底与原始版，各自字节相同。

蓝底已保存且刷新验证后，补齐原先因依赖失败未发送的绿底步骤，仅发送一次：

> 以工程“11.png”当前已保存并选中的蓝底版本继续，将背景改为纯绿色RGB(0,255,0)，红色纸船主体的形状、颜色、位置及1024×1024尺寸不变，生成并保存为同一图片工程的新版本，保留原图、去背景版及蓝底版全部历史。只使用当前蓝底结果作为来源，不回退原图，不新建其他工程，不导出。完成此步后停止。

绿底run_v2_bd0e6a60fb4e422d81d3b59f4a95e51c，61178ms Agent done，随后等待实际异步图片完成。用户输入上下文和prepare_task实际source_version_id均为已保存蓝底e83，工程仍为6bb4，新增绿底editor_image_2b8fb87a06a849df9a507c4fee86b905。实际再次CmdR、重开原工程，原图/透明/蓝/绿四历史全部保留；逐项打开原图、蓝底、绿底并分别下载。

| 实际PNG | 尺寸/字节 | SHA256 | 刷新后结果 |
|---|---|---|---|
| 原图 | 1024² / 1413124 | a9f55282b6dcdae9e64be7b6d065f8fda475402083c394a14e754498e60e66e7 | 与原始源导出字节相同 |
| 蓝底 | 1024² / 401947 | d5f2654105bb5a8cf092e814ea6d895965c86a3943b7d2cde335cfdcf87fc9ca | 蓝、绿完成后均能读到同一字节 |
| 绿底 | 1024² / 566791 | 66d172d7add78143baaa6090ddf8df25ac86e633529babfd44ca963e2c2b867d | 与生成后下载字节相同 |

实际文件已解码查看为相应蓝底/绿底红纸船，未手动导入结果修复历史。原工程最终revision10，content SHA256 79ccc8a51044accf6f356375fc7a17b02864da17799ae39d194a214d4407cd18；两扩散后保持。完整源选择、输入、两次刷新及文件证据见480-O-blue-progress-api.txt、480-O-green-progress-api.txt、480-O-four-history-after-refresh-ui.png、480-O-final-chain-file-audit.json、480-O-final-project-api.txt及480-O-*.png。navigationType=reload与timeOrigin辅助确认真实刷新。

## 扩散一：Passed

独立干净源editor_image_52addb29a1e14c8d93b5f187cc6f84ed，仅一历史，源PNG仍a9f。改变颜色及初始历史数量，提示词仅发送一次：

> FWXC-480扩散一：将工程“11.png”当前已选择的未去背景、保留浅色背景的原始版本背景改为纯黄色RGB(255,255,0)，保留红色纸船主体的形状、颜色和位置，保持1024×1024尺寸。生成并保存为当前同一图片工程的新版本，保留原图和全部历史；不要新建其他工程，不先去背景，不导出。完成后停止，我会刷新并分别查看原图和黄色结果。

run_v2_4c0f425310a542d2a6f4bb30f0ae5cef，68009ms Agent done后继续等待实际异步图片完成；输入明确为独立ab67/源52add，新增黄色editor_image_a2ea5584f2af4728a181ebd26b699b1b。同工程实际刷新重开后原图/黄色两历史保留，逐版实际下载。黄色PNG1024²/481772字节，SHA256 b19d7c3af80e20c4a40c04d5f3695f774d526f5311a5ef961e21a8cdd834b72e，刷新前后字节相同；原图也保持a9f。最终revision4，content SHA256 9c1bbbb242ab405fb68d6fdf7de606e57841b8983ce29521b4dc0f9c343c9174。原蓝绿工程版本和content摘要不变。

证据480-E1-yellow-complete-ui.png、480-E1-after-refresh-ui.png、480-E1-persistence-file-audit.json、480-E1-final-project-api.txt及对应实际PNG。下载提示未自动展开时回读浏览器已完成下载记录，没有重复导出/生成。

## 扩散二：Passed

第三独立原图editor_image_13ab8f4ae2fa43a18f31e562cc1aff20，初始一历史，实际源导出仍a9f。本例无目标文字提示词，页面图片主工具栏“移除背景”只点击一次，完成新增透明版editor_image_a63ef720345b48ed985c623105db744c，属于同一78a5工程。

真实透明PNG1024²/282788字节，SHA256 9176f563dffeb27fbb1e30e0b1fb43993b0d06f6de1952e3df1b73213227db14。完整CRC/deflate/逐行反滤镜解码确认alpha范围0～255、926592完全透明像素。实际CmdR重开后原图/透明两历史保留，逐项下载，各与对应保存PNG字节完全相同，原图a9f保持。验收范围为同工程新历史保存与读取，未扩大为抠图边缘质量通过。

最终revision5，content SHA256 84b1fc8900339e3b258c9ae6f52ebe3eb2ac29f7e46245f0813449229766de30。最终官方GET回读和三工程只读核验均完成，原蓝绿工程revision10/hash79ccc…、黄色工程revision4/hash9c1bbb…均保持。

证据480-E2-remove-background-complete-ui.png、480-E2-after-refresh-ui.png、480-E2-transparent-file-audit.json、480-E2-persistence-file-audit.json、480-E2-final-protected-api.txt及实际透明/原图PNG。全部原始证据在reports/fixed-monitor-20261116-135748/，三场景及两账本已同步。

## 进度

43项最新轮原17P/1F/10B/15NR，扩散44P/7F/3B/32NR。9项NR因当前云端已非已修复而移出可执行队列，不继承外部结果为本轮通过；剩余6项：462/461/381/379/317/569。继续462。固定脚本PLAN，用例格式检查521条、0问题。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“测试完成”（回读时间2026-11-17T22:04:05.7874300+08:00），本轮原判定仍Passed；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-480/。
