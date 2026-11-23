# ERYE196 分步补跑：016、021、022、041

日期：2026-11-16。Chrome有头、生产环境，复用测试项目25738b66、会话a9a99d8f-02fa-4889-9bb9-30a752a925a2。按[分步计划](blocked-step-plan-016-021-022-041-20261116.md)逐项更新。固定脚本均PLAN、路径为空；本轮未同步云效。

## 016：Passed（当前UI默认裁剪边界）

基线E196-A20-controlled.mp4，视频及原声均0～20秒。实际拖动视频右侧裁剪柄向起点，视频和关联原声同步保留0～0.08秒；时间轴放大至8后再次向内拖动，仍保持0.08秒，未出现零长度或负长度。向外拖动14个截图像素后，两个片段均为0～0.10秒。本轮可操作增量为界面显示0.02秒，不据此宣称底层帧精度或所有缩放级别统一步长。

0.10秒刷新并重新打开编辑器后保持；撤销恢复0.08秒，再刷新并重新打开后保持。预览仍显示原视频画面，关联原声范围及真实波形保留。随后撤销恢复视频/原声0～20秒供021继续使用，未更改原素材或其他工程。通过范围为UI边界、防越界、关联原声裁剪和持久化；未导出本版、未做听审或编码级音画质量验收。

证据：`reports/erye196-stepwise-rerun-20261116/016-{initial,selected,drag-to-boundary,below-boundary,adjacent-length,adjacent-reloaded,minimum-undo,minimum-reloaded,restored-baseline}.ax.txt`；`016-before-trim.png`、`016-boundary.png`、`016-zoom-max.png`、`016-minimum-reloaded.png`。旧Blocked保留历史，当前实际Passed。全134条当前29 Passed / 14 Failed / 3 Blocked / 1 Not Applicable / 87 Not Run。

## 021：Blocked（准备步骤3、6已完成）

已确认20秒基线恢复；本轮只发送一次“仅追加B10到20～30秒、关联原声对应，其他对象不改、保存后停止”的单项准备请求。未重复旧失败请求或点击重试，未发送正式关联重排。受理证据：`021-append-B-before-send.ax.txt`、`021-append-B-sent.ax.txt`，109秒完成；时间轴缩小后核实A0～20、B20～30及两段对应原声，总长30秒，刷新重开一致。证据`021-append-B-tool-detail.ax.txt`、`021-AB-30s.ax.txt`、`021-AB-reloaded.ax.txt`。步骤3已完成；已单独发送B字幕绑定准备请求一次，证据`021-subtitle-sent.ax.txt`，45秒结束，应用明确反馈当前字幕接口只能固定工程时间，不能建立与B源区间的随动关联；本轮拒绝用固定字幕替代，无字幕写入。证据`021-subtitle-final.ax.txt/png`。固定BGM单项准备92秒完成，刷新重开后独立背景音乐轨仍0～20秒，A/B及原声保持0～20/20～30秒。证据`021-BGM-final.ax.txt`、`021-AB-BGM-reloaded.ax.txt/png`。现有检查点保留，不再重复追加。步骤4关联字幕未建立、步骤5真实关联配音未完成，后续冻结基线及正式随动依赖缺失，整例Blocked。正式重排仍未发，整例仍Blocked直至前置齐备。

## 022：Blocked（正常对照已核验）

本轮只读重开207f1460-389a-4734-b8ac-2fff97f590d5的330d3e24工程，视频20秒、49条字幕、配音面板6句及真实波形轨均存在，前两句配音范围0.16～4.20、5.00～7.68秒，原声静音、固定BGM0～20秒。已记录页面基线，但页面快照不宣称完整工程备份或已验证恢复。未破坏正常关系，未向该工程发送异常操作。证据`022-normal-baseline.ax.txt`、`022-normal-voice-panel.ax.txt/png`。正常对照步骤完成；步骤3可恢复备份尚未实际建立，步骤4真实异常关系仍缺，故负向操作、原子拒绝及恢复未执行，整例Blocked。用户f178候选此前已确认暂无配音，不能充当异常关联夹具。

## 041：Blocked（正常对照步骤Failed，异常分支未完整覆盖）

本轮重开既有测试会话cc2fd674-0c0f-457f-bcec-8d258cba70a6，工程79784c8a：视频/原声0～20秒；Welcome/欢迎4～6秒，Second caption/第二条字幕10～12秒；文字水印CinLink 回归 #196及鸟群图片水印均全片。已核验正常基线，无需重复初始化和上传旧素材。证据`041-existing-baseline.ax.txt`、`041-baseline.png`。

已单次提交正常同组对照：鸟群水印换回既有有效logo-A（cinlink-smoke-watermark.png），原文Welcome改为041 normal control，其他属性保持。实际Editor batch apply失败：`Editor tool arguments do not match its schema; commands.1: invalid oneOf`。刷新重开字幕仍Welcome/欢迎、Second caption/第二条字幕，预览仍原鸟群图片水印，撤销/重做均不可用，未见部分写入；无需撤销未发生的修改。证据`041-valid-control-sent.ax.txt`、`041-valid-control-failed.ax.txt/png`、`041-control-reloaded.ax.txt`。这是正常对照步骤Failed，不能冒称三种异常素材分支已测或回滚通过。

独立上传准备：本机生成无用户内容的4096×4096随机RGB合法PNG（50,351,112字节），通过当前会话附件选择并发送仅登记指令，不修改工程。曾短暂在本标签页DevTools设3G，随后明确恢复No throttling；登记26秒完成，得到真实附件file_cloud_537ks7skinmbdhyxmx34mtljkh。这是上传成功素材，不替代上传失败前置。证据`041-upload-selected.ax.txt/png`、`041-upload-pending.ax.txt/png`、`041-upload-registration-final.ax.txt`；第一组pending文件名仅为观察点名称，不能据网络Pending推定上传资产Pending。

随后用另一张合法2048×2048随机RGB PNG（12,588,853字节）从编辑器“导入素材”入口上传；在本标签页3G下捕获明确“上传中…0%”，本机切Offline后仍观察到77%，随后上传进度消失、媒体区显示`Failed to fetch (app.cinlink.ai)`。这次确有上传中证据，但错误未附目标文件名/可引用ID，不能断言已获得可引用失败资产。没有发送正式异常水印+C1复合命令。已恢复No throttling、关闭DevTools、重载媒体及刷新重开；素材列表仍停留加载中，无法确认中断文件入库与否。不得将这条客户端网络错误单独归为服务端产品缺陷。

证据：`041-library-upload-pending.ax.txt/png`、`041-library-upload-interrupted.ax.txt/png`、`041-library-upload-offline.ax.txt`、`041-library-upload-failed.png`、`041-network-restored.ax.txt`、`041-final-material-status.ax.txt`。其中failed截图仅记录错误观察点，不代表已确认失败资产身份。

最终字幕复核：Welcome/欢迎4～6秒、Second caption/第二条字幕10～12秒；两水印、视频/原声仍0～20秒，预览保留原图片，撤销/重做仍不可用。`041-final-subtitles.ax.txt`、`041-final-baseline.png`。步骤1～3复用基线完成；步骤4正常同组对照Failed；步骤5实际上传中已观察，但可引用对象/正式复合拒绝未覆盖；步骤6网络中断已做，失败资产身份仍未核准；步骤7缺获准U2私有图。整例保留Blocked，不把准备失败或部分观察算作正式负向分支通过。

## 本轮收尾

当前1 Passed（016）/3 Blocked（021、022、041）；分步骤结果分别保留。全134条29 Passed / 14 Failed / 3 Blocked / 1 Not Applicable / 87 Not Run。固定自动化均PLAN/空脚本；用例检查543条、0问题。没有新建云效缺陷、没有修改已有云效状态，没有Git提交或推送。后续复用021的AB+BGM检查点，022先取得可恢复备份及真实异常关系，041先解决正常同组提交及可引用异常资产；不重复本轮受理任务。
