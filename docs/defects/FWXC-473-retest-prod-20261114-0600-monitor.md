# FWXC-473 本轮回归（2026-11-14 06:00）

原验收Passed（执行通过），扩散一Passed（执行通过），扩散二Failed。生产有头Chrome，yabinc92；复用专用项目d15de3bc-fa92-431b-8e8f-dbed3d151a22，原回归独立会话c9d75b5f-0f2a-4d8d-9c5a-330d813b6a78。原SSO-025第1轮，不使用前轮产物或@。

源文件 `/Users/edy/Pictures/测试素材/单音频轨道/素材查找/7MB.mp4`，SHA256 9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96，60.50秒、1280×720。先上传原片一次，原登记语句“保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。”23秒完成已登记；然后严格发送原指令一次：

> 从最初上传的7MB.mp4原片剪一个30秒高光母版，保持1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

原问题在高光选择阶段报“Return a title for each topic in the cut”，没有审阅方案及MP4。本轮以实际选择/审阅和下载产物判定，不以旧错误文字消失单独判通过；已受理只回读，真实补槽填写、真实方案审阅后继续。两条扩散详见本轮case-plan.json：同义约30秒无文字普通对话；长视频变短快捷入口30秒。

本轮证据reports/fixed-monitor-20261114-060021/473-*、cloud/FWXC-473。固定脚本本轮未新集成，原AUTO/PLAN不改。未终态不改云效；本定时任务不评论、不新建缺陷、不Git提交/推送。

本轮原选择阶段已完成并进入审核，原报错未复现；此时业务仍未判通过。实际方案源片区间11.980–17.100、19.400–26.520、27.540–45.300，拼接5.12+7.12+17.76=30.00秒，时间线3段视频及对应原声音频；字幕页暂无字幕。只查看水印设置，文字框为空（面板默认启用开关为on，未输入或改动设置），以实际导出无文字为最终验收。方案已审核确认一次，正在原任务渲染，未点重新生成。证据473-O-plan-review.txt、473-O-review-captions.txt、473-O-review-watermark.txt、473-O-review-plan.png、473-O-approve-dispatched.txt。

原任务390秒完成，实际下载文件473-O-result.mp4：30.01秒、1280×720、H264/AAC，完整解码退出0，SHA256 e169dc86ff2cdc4310984fdbbb72577e6138a4db34f53369e9481c345f0fc7c8。每0.5秒OCR共60帧仅识别源画面固有SE/PLURIBUS UNUM等字样，无新增字幕、中文说明或水印；另目视抽查实际关键帧。源片三段原声音频归一波形相关0.99949/0.84075/0.99986（排除剪点各0.2秒，时间对齐偏移均0），独立ASR英语，核对原声保持。证据473-O-result-file-audit.json、473-O-result-ocr.json、473-O-original-audio-comparison.json、473-O-result-asr-base.json。原缺陷验收实际执行通过；07:20官方OpenAPI改✅AI通过并回读一致，未评论或新建缺陷。

扩散一在独立会话9ead0ec6-efcc-48d0-a36e-28a09b0723a8重新上传登记原片（22秒），按case-plan.json同义指令仅提交一次，正在原任务回读；不使用原回归成片作为输入。

扩散一实际方案源11.980–17.080、19.400–26.520、27.540–45.320，拼接5.10+7.12+17.78=30.00秒，时间线仅3段视频及对应原声；方案已审核确认一次，渲染中。证据473-E1-plan-review.txt/png、473-E1-approve-dispatched.txt。未点击重新生成，也未提交并行业务。

扩散一执行通过：本轮实际下载editor-export (22).mp4，留证473-E1-result.mp4，30.01s、1280×720、完整解码0，SHA256 a7a19a0631573bf5c7a97e3d81f98df9918437d08e15113df6f75a1794c48c1c。60帧OCR只有源画面固有英文，抽帧无新增文字；ASR英语，三段源原声相关0.99949/0.84051/0.99979。检查脚本曾误读历史同名editor-export.mp4，已原样隔离invalid-audit-source-not-regression并按本轮下载记录重新检查，误读结果未用于结论或云效写入。

扩散二登记会话3e69d46f-e870-47a9-84f0-4e5c78c2de8f只回已登记（20秒），会话内没有快捷入口，未提交媒体业务。改在首页真实长视频变短入口、保留缩短视频chip、将精彩片段时长设为30秒，在干净新会话25321124-a04a-4197-87b4-95a5292a09b0只上传原片，提交case-plan.json扩散二原文一次。登记准备不作为快捷入口实测，也没有重试同一媒体业务。证据473-E2-shortcut-config.txt、473-E2-duration-set.txt、473-E2-shortcut-ready.png。

云效本轮最新回读：✅AI通过。官方OpenAPI更新并回读一致。本轮不写评论、新建缺陷或Git提交推送。

扩散二终态Failed：原生快捷入口实际发送文本带“长视频变短：”前缀，参数30秒，输入仅本轮原片。Select highlights明确返回Source ranges overlap，无审核方案及MP4；未点重试。截图473-E2-failed.png、AX 473-E2-terminal-error.txt。原问题与扩散一已真实通过，快捷分支失败独立记录，不把原缺陷改为AI未通过。07:34官方OpenAPI再次回读✅AI通过，零额外状态写入。本轮不新建缺陷或评论。

08:36补充回读（不是重跑）：三条已完成任务实际首个extract_audio输入video_files均为初始F file_cloud_zquu6agl4hjy5eyplmfrfxv4ji。原run_v2_1a58ef0e66aa43a3a1cb3a057e564eeb、工程8de401f7-85b4-48eb-b07c-e1c1c1e9a03a；扩散一run_v2_24e14066a26c47c29897b15f338b1f41、工程572fb9da-65e3-4476-8657-3e53f69f5b20；失败快捷分支run_v2_e39ab52088d548d99d79259376618763、工程2bb9f957-cf68-4b12-a9e4-a61569f64bb2。快捷分支来源正确而选择仍报Source ranges overlap，不是输入了旧SRT。证据473-O-source/473-E1-source/473-E2-source-executed-inputs-sanitized.json及各自过滤去敏HAR，均为本轮原任务回读。结论和云效状态未更改。
