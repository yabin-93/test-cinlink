# FWXC-601 · 2026-11-25新修复轮预发回归

原问题：Passed（执行通过）；扩散一Passed（执行通过）；扩散二Failed（已有批注更新报schema invalid oneOf）。原缺陷环境生产，本轮实测预发staging-app.cinlink.ai、Google Chrome原生有头CUA、yabinc92。固定脚本状态PLAN未改变。

原I1 export-image.png 1024×1024，SHA256 3ca1504a4298351fa315fc87b6f7b4ea35a852f2897692c85e9e3d5a211a1803，保持原像素和背景；无批注/待发引用独立基线。原云效截图已查看并与同源文件核对。每次首次业务前官方GET身份/陈亚宾/精确已修复通过，合法轮未重发旧请求。

专用会话项目3bb7e789-f86b-48ac-aa69-d1fc7a5c8a4b，原回归会话8c01b1b7-064d-4ce7-83b4-daa7fe3c0e91。单次Agent准备27s未完成，未重试；从同会话空白编辑器选择媒体导入相同原图，真实形成已保存唯一图片工程export-image.png，源版本editor_image_d3fa408808e24b999bb64541c17e999d。上传/工程导入为各自页面步骤，非失败业务重发。未提交图片生成或导出。

正式原指令保留Q左耳x0.405/y0.39及只保存批注/输入框引用/不改图完整约束；旧projectUUID替为本会话唯一工程名和真实源版本，未虚构内部标识。完整指令见original-prompt.txt。正式请求仅发一次，UI已完成39s；画布有批注1/Q，批注弹窗正文准确“把这里改成蓝色”，输入框已有Q:把这里改成蓝色的未发送引用；已保存且仍唯一原源版本，无新增生成图片。原schema错误未再现且要求业务实际完成。未通过接口断言归一化数值或服务端费用。

证据目录reports/fixed-acceptance-20261125-104653/execution/601/：original-screenshot.png为原历史，source-baseline.png为本轮干净基线，original-accepted-ui.txt、original-result-ui.txt、original-result.json及original-result.png为本轮未加工现场。用例正文/README只读，云效状态同步另附最新回读。

![601原验收现场](../../reports/fixed-acceptance-20261125-104653/execution/601/original-result.png)


2026-11-25T11:11:06.333883+08:00 原Passed已官方OpenAPI设✅AI通过并GET核验，工作流实际状态ID读取匹配；评论/附件0写入。证据reports/fixed-acceptance-20261125-104653/cloud-updates/FWXC-601/result.json。后续两扩散属同一合法修复轮，非新开Fixed轮。


2026-11-25T11:17:47.902383+08:00 FWXC-601扩散一Passed（执行通过）：独立会话c287a5a1-4c9d-4da1-9f57-766aff3a93ed，右耳罩批注及未发送引用实际到位，53s，源版本及画面保持。原Passed/云效✅AI通过GET核验保持，扩散二待执行。证据reports/fixed-acceptance-20261125-104653/execution/601/E1-result-ui.txt及E1-result.png。固定脚本PLAN；正文/README只读。


2026-11-25T11:23:21.108582+08:00 FWXC-601本轮完成：原Passed（执行通过）/E1Passed（执行通过）/E2Failed。E2独立会话ae7992a1-510f-4389-a9ac-4e61e6f330b1更新已有批注两行正文及引用时报schema invalid oneOf，正文仍原值且无待发送引用，源版本保持；未重试。原缺陷✅AI通过已官方回读，扩散失败单独记录，无重复写状态、评论、新单或附件。全部受理已终态，11项待开轮继续。完整证据reports/fixed-acceptance-20261125-104653/execution/601/final-result.json。固定脚本PLAN；用例正文/README只读。
