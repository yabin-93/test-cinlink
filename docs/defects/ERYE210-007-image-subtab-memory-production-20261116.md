# 【生产环境】【ERYE210-007】图片水印子页记忆丢失，收起或刷新重开变为文字页

云效：[FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12)；官方OpenAPI新建，状态🤔AI提缺陷，负责人牛诗晴，中 / 3-一般。3张本轮原图上传并嵌入，6附件及正文/字段/图片引用回读通过。

**现象**

同一视频工程已选择Watermark（水印）→Image（图片），收起编辑区后重开，或刷新页面后重开，一级Watermark仍保持，但子页变成Text（文字）。本轮不是刷新回到字幕页；图片和文字水印本身没有丢失。

**前置步骤**

1. Windows / Google Chrome登录生产环境 https://app.cinlink.ai，账号具有工程编辑权限。
2. 新建专用测试项目、独立会话及视频工程，准备附件20秒原片（1920×1080、30fps、有原声）和8条英语字幕。
3. 工程中已保存文字水印NAV006及一张可预览的PNG图片水印，当前无运行任务或待保存修改。

**提示词**

无Agent提示词。本例只使用页面的水印、收起编辑区、重开和刷新操作，不发起分析、生成或导出；没有补槽和run。

**复现步骤**

1. 为回归独立准备新工程：导入附件E196-A.mp4；通过Media导入附件E196-A-en.srt并绑定为原文英语字幕，确认8条字幕及原片可见，等待“已同步”。本轮实际使用的是新建工程加载已完成的真实素材/水印基线。
2. 进入Watermark→Text，输入NAV006；进入Image上传有效PNG。本次为512×512四色测试PNG，显示宽度160px、透明度75%、右上位置、边距24，作用于全片；确认两类水印均已保存。
3. 明确点击Image子页，确认图片按钮高亮、图片预览和当前工程名称正确；截图一为本轮操作前对照。
4. 点击编辑区顶部“收起编辑区”，再从同一会话“视频编辑器”入口打开；不手动重新选择水印或图片子页。
5. 查看同一工程的已选入口和子页：一级仍为Watermark，子页却变成Text，显示NAV006文本设置，Image未选中；保存截图二。
6. 刷新同一浏览器标签，再打开同一工程；同样不手动切TAB。实际仍为Watermark/Text，未恢复Image；保存截图三。
7. 对照工程中的视频、原声、字幕及两类水印，确认保存内容保持；不要将内容未丢失视为子页记忆通过。

**实际结果**

操作前为Watermark/Image；收起重开和刷新重开后均为Watermark/Text，Image选中值均为false。两次观察仍为同一工程、20秒原片；音视频、字幕及水印保存内容保持。失败点是图片子页记忆丢失。

**预期结果**

在无显式功能入口覆盖的情况下，同一设备普通重开和刷新重开同一工程应恢复已选择的Watermark/Image，包括图片子页。仅导航不修改工程内容、不生成任务。

**影响**

用户离开或刷新编辑区后需要重复定位图片水印，含两类水印时会进入错误的编辑子页；本轮没有发生素材丢失或水印参数被覆盖。

**补充**

同步标识：ERYE210-007-IMAGE-SUBTAB-MEMORY-PROD-20261116

关联需求ERYE-210 N03/N09、AC02，用例ERYE210-007，本轮2026-11-16生产Chrome实测，结果Failed。
本轮会话：https://app.cinlink.ai/c/85bdfaa7-3b9e-4273-9e20-1dd3209fe413
工程：d0b28421-2c3e-4893-9be3-f45e47586f20（ERYE210-007-d0b28421）。
本次按不去重约定新建，旧FWXC-488保持历史；不沿用旧报告“刷新后进入Captions”的现象。旧voice映射和清理旧偏好分支未执行。回归应新建独立工程，不依赖本轮旧工程的初始导航记忆。
附件包含本轮3张原生截图、可复用原片、英语SRT及脱敏核验摘要。水印图片可换成任意正常保存的PNG，问题验证的是子页记忆；本次图片样貌和实际参数见对照截图。没有依据源码或内部存储字段推断原因。

**失败截图**

操作前对照：本轮同一新工程已选Watermark/Image，512×512 PNG预览可见。

![007-01-image-before-close.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=29eecb84b63b7a08679775684f)

失败现场一：收起编辑区后普通重开，Watermark保持，但子页变Text、Image未选中。

![007-02-reopen-loses-image-subtab.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=28c42a1ec2dd141303c2cc05a0)

失败现场二：刷新后重开同一工程，仍为Watermark/Text，未恢复Image；本轮未进入Captions。

![007-03-refresh-loses-image-subtab.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=14bd9b8c3e46387c258bdbb253)
