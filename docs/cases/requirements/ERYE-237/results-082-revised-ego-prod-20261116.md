# ERYE237-082新版生产重跑（2026-11-16）

当前主UI：**Passed**。生产https://app.cinlink.ai/，ego-browser有头TaskSpace22，yabinc18；按real-export-scope-v2执行。074保持Not Applicable（用户确认扩图无上限），本次未执行074。固定自动化PLAN/脚本空，无云效或Git写入。

使用同一既有人像工程portrait.png（bd3a8b81-3454-40aa-b634-f6a073d261f7）、带背景原版editor_image_28de342515fc438aa5a0893c504fc20d，1254×1254；进入前无草稿/待发引用/运行任务。界面初始历史列表尚未完整加载，第一次寻找源版等待超时，未触发下载；观察实际“更多版本”后打开源版继续，无新项目或生成重试。

| 分支 | 结果 | 实际证据 |
|---|---|---|
| UI-A格式选项 | Passed | 实际下拉仅png“PNG·保留透明背景”、jpeg“JPEG·白色背景”；两项可选，无TIFF。仅证明UI约束，不冒称服务端拒绝 |
| UI-B PNG | Passed | 一次下载actual.png，真实PNG/RGBA，1254×1254、2615339字节，可解码；建议名portrait.png.png，末尾扩展名与编码一致 |
| UI-C JPEG | Passed | 同一V1独立选择JPEG一次下载actual.jpg，真实JPEG/RGB，1254×1254、252953字节，可解码；建议名portrait.png.jpg，与编码一致 |
| 工程保持 | Passed | before/after完整image_document一致，原图及完成头保留，draft=null |
| Technical-D | Not Run | 本次未提交非法参数，未取得新的服务端校验回执；缺宽高控件不阻塞主UI，不以选项不可选推导后台校验正确 |

文件名中重复的.png来自现有源文件名拼接，本例仅验末尾扩展名和真实编码；不把自定义文件名/800×800设置的079/FWXC-614改为通过。未发送Agent提示词，未新建图片、改变比例或执行AI意图。内部provider/费用未取证，不声称零调用/零费用。两次下载均提前等待事件，保留实际文件，与截图分名保存，没有用截图代替产物。

本机证据：reports/erye237-082-revised-ego-prod-20261116/，options-ui.png/txt、options.json、actual.png/jpg、png/jpeg-receipt.json、before/after-project.json、audit.json及SHA256SUMS.txt。TaskSpace22已finish且keep=[]，未遗留草稿或页面。

旧082/Technical Blocked及原批报告保留为历史；主入口改为UI后的本次真实执行通过，不代表旧技术断言已全部满足。当前070～090主规格为9 Passed / 11 Failed / 1 Not Applicable；主例无Blocked，独立Technical缺口仍按各自记录保留。
