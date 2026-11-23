# FWXC-621 2026-11-19预发回归

原问题：离线提交显示失败，恢复后未点重试却继续执行并保存，提交反馈与真实状态不一致。

本轮原回归Blocked，扩散一Failed（独立字幕编辑契约错误），扩散二Passed（执行通过）。原问题未形成完整成功保存链路认证，云效保持已修复；14:07官方GET已回读。没有自动评论、新缺陷、附件或Git写入。原生产历史与本次Chrome预发/yabinc92分别记录，固定业务脚本PLAN。

## 独立基线与原步骤

今日专用项目内独立会话c3c02094-7f8b-4d4a-a764-b1f8446c9fc0，工程00d73af4-5594-4023-b2db-4d0e7ef1ba24。沿用本机原A20标记视频/B10蓝框视频及E196-BGM20.wav，完整解码均退出0；SHA及原路径见同批fixtures/621/source-audit.json。原生建立A20后，首次追加B10准备被NOT_FOUND要求先选择媒体库素材，未修改工程；页面真实选择并暂停B10后补齐前置，追加成功，不重复上传、不生成替代视频。随后分别导入原两cue SRT及固定BGM，R4完整GET确认：视频A0～20接B20～30，唯一关联原声轨同样两段，C1“056首请求已保存”4～6秒，C2“054手动保留”10～12秒，唯一独立BGM0～20秒/速度1/音量1。正式步骤未放宽为单源或缺BGM。

## 原061断网分支：Blocked

完整原提示词单次发送：

> 执行ERYE196-061发送前断网分支：当前30秒基线，请一次同组裁A头2秒并让B及字幕原声接续，C1由056首请求已保存改为061断网前，最终2～4秒；C2前移到8～10秒；固定BGM0～20秒仅降低6dB。三项同组，可一次撤销，不新建或生成视频，不自动重试。

发送前真实DevTools Network=Presets: Offline，输入原文只点一次发送。UI为思考中，未出现该请求的Failed/Failed to fetch。恢复No throttling并一次正常刷新后，原run_v2_1b242c1e67a94b80b00d51337afc8e58显示42秒已完成，实际status=done、intent=false、无澄清，只执行editor_view_get、editor_project_get、editor_subtitle_list三个只读工具；没有裁剪、改字或降音量。R4完整content精确不变。原错误未复现，但目标业务没有执行，三项同组及一次撤销未覆盖，不能判原验收Passed。

## 原065断网分支：Blocked

061未修改工程，因此在同一隔离会话独立准备R5：仅原生将C1改为“064重连期间新文”4～6秒，其余视频、原声、BGM与R4完全相同，C2保持原文/时间。完整原指令只发送一次：

> 把当前4～6秒原文C1“064重连期间新文”改为“离线草稿”，其他字幕、时间、样式、视频及声音不改。不新建工程或生成视频。

发送前真实Offline，前端稍后Failed/Retry，未点击重试。恢复No throttling、正常刷新并只回读：原run_v2_58dff43c96c8410e942c2466ebf0214a实际failed，editor_subtitle_text_update返回INVALID_ARGUMENT / Resolved caption edit does not match the editor contract。完整R5content精确不变，C1未保存为离线草稿。此失败反馈与后台真实失败相符；独立新字幕契约问题阻止覆盖原“错误失败后实际成功保存”路径，不将其冒充原网络缺陷未通过或修复通过。

## 扩散一：Failed

在未改的独立R5基线上选择原C2，改用10～12秒未手工编辑过的字幕，完整给出当前工程、原文、目标文字及真实源块定位；单次Offline提交只改为“621扩散一离线新文”，恢复不重试，只回读原请求。run_v2_b8af47275cd34bb2b325ec21f085c131实际failed，editor_subtitle_text_update返回INVALID_ARGUMENT / Use target=playhead for one displayed segment, or provide the complete manual_layout。R5完整content精确不变，C2未保存。该参数契约拒绝属于已充分指定目标后的独立业务失败，未进行额外参数试错/重发；不是用户缺少业务值的澄清，不靠绕过参数把该分支改为通过。失败截图621-O065-E1-failure-history.png对应同一当前会话、原错误与C2未改界面，已核对。

## 扩散二：Passed，执行通过

同一R5内容精确不变后，选择唯一独立BGM，独立在线发送621-E2单项音量100%→50%请求；明确现有真实轨/片段、0～20秒及所有其他对象保持，不生成、不导出。

原run_v2_a296eb2eb4ea47a6b6a8165d336743b6于10:47:04.588被官方页面实际响应回读为user/assistant均assigned，确认受理且未终态；随后10:47:25.752才切原生Offline。后台10:47:30.189 done/intent=true，终态确实发生在断网期间，10:48:17.651恢复No throttling。原请求29秒完成，未点重试或重发。实际工具project_get→editor_clip_volume_set→project_get，完整工程R6仅BGM片段音量1→0.5，视频、原声、字幕、样式、时间、文件及全部其他内容与R5逐字段一致。原始界面滑杆50与服务端0.5一致。14点恢复原页仅回读，仍R6且content完全相等，原任务仍完成；No throttling已再次实际确认。此单项成功不替代061三项同组验收。

## 证据和状态

所有完整提示词、Offline/恢复时间、未修改截图、原请求标识/真实计划及分阶段完整工程在reports/fixed-monitor-20261119-060155/execution/621-*；核心审计621-E2-acceptance-interruption-audit.json证明受理→Offline→终态→恢复顺序，621-1400-resume-project.json证明续读未重发。只模拟原流程规定的当前标签DevTools Offline，不声称物理断网或关闭所有既有通道。未修改旧生产请求阻断规则，最终当前页面No throttling。新字幕契约失败只写本地，没有自动新建缺陷或云效评论。没有执行原061的一次撤销、没有要求外额成片导出，未覆盖不补算通过。具体用例/进度已同步，README只读。


2026-11-20T12:32:18.4443470+08:00 本轮生产新业务开始前官方回读当前❌AI未通过，已非已修复，移出本轮新开列表。本轮Not Run，不继承外部通过/失败；历史结果保持。证据reports/fixed-regression-20261120-094814/refresh-1230/cloud/external-status-readbacks.json。
