# ERYE237-023真实mask生产重跑（2026-11-16）

**本轮执行Failed：合法擦除任务已受理但生成失败；源单位和实际mask检查Passed，独立后端非法值校验Blocked。** 当前revision为2026-11-16-real-mask-submission-v3。失败发生在实际业务执行，不再因缺少独立mask下载按钮阻塞；不据此宣称笔宽或mask契约有问题。

生产https://app.cinlink.ai/，ego-browser有头TaskSpace18/p1，账号yabinc18。复用群鸟JPEG工程a289c6e4-917b-46d0-a850-30987d286f13、会话39f4248c-0462-4978-912e-b714ad69a992，源版本editor_image_250eb7c0bf2644b58e07406c9dd08641，真实源1000×666。初始空草稿无对象；原8项完成历史保留。UI正常操作、四条独立Agent纯设置请求、一次合法擦除提交，受理后只读原任务，零重发。

| 检查项 | 实际证据/结果 | 判定 |
|---|---|---|
| 画笔25%/1、25%/256、200%/1、200%/256 | 独立原尺寸PNG RGB差分：1px覆盖高1；256px覆盖高257（含抗锯齿），两种缩放同参数原像素一致；25%已有256笔切200%后RGB完全一致 | Passed，4项 |
| 默认值不追改旧笔 | 已有1px后改默认256，原尺寸RGB未变化；旧mask首笔仍1，只有光标直径更新 | Passed |
| UI端点 | 两工具Home后ArrowLeft仍1，End后ArrowRight仍256，实际range最小1最大256 | Passed |
| Agent画笔0/257、主AI擦除0/257 | 四次done，均明确拒绝且plan=[]，无编辑器动作；纯设置期间无待发引用，拒绝前后设置保持。不能由此推断服务端收到非法值 | Passed，4项 |
| 主擦除25%/1、25%/256、200%/1、200%/256 | 四笔在同一实际提交mask内保留，源坐标已登记；真实文件中段alpha覆盖积分依次1.0、256.0、1.0、256.0，无缩放倍率放大 | Passed，4项 |
| 实际mask尺寸/来源/完整性 | 受理快照mask关联原源版本；下载该file_id真实PNG为1000×666 RGBA、22380字节，SHA与本次上传校验一致；不是SVG转换物 | Passed |
| mask数值/通道 | 背景RGBA(0,0,0,0)，标记区域白RGB，alpha归一化0～1含抗锯齿；公开结果schema约定alpha_nonzero_replace_zero_preserve，与实际文件表达一致。服务端adapter实际执行日志本轮不可见，不推断其执行通过 | 文件表达Passed；adapter执行未覆盖 |
| 一次合法擦除生成 | task73bb814b-8f95-43f5-a449-b915728c16a0已受理后终态failed，application_status=pending，result=null；EXECUTION_OUTCOME_UNKNOWN，界面显示External stage outcome is unknown; reconcile it before retrying | Failed |
| 独立后端0/257拒绝 | 实际擦除提交收mask文件与intent，不收笔刷直径；当前未确认可独立传主擦除直径的已发布后端入口，未添加未知字段伪造测试，也未请求生成来探测非法值 | Blocked，仅该技术行 |

实际四笔准备（源归一化坐标）：25%/1=(.75,.25)→(.78,.25)，25%/256=(.25,.25)→(.28,.25)，200%/1=(.55,.35)→(.58,.35)，200%/256=(.45,.65)→(.48,.65)。按实际可见区域重新登记，所有目标均在可见画布，无需平移；各短线端帽包络不相交且不贴源边。200%实际画布CSS2000×1332，源仍1000×666。独立取中段截面，不用成品改动范围反推直径；前端当前公开代码确认归一化坐标映射(W−1,H−1)，未调用隐藏状态或内部函数。

发送原文：“移除当前蒙版覆盖的四条测试区域并自然补全，其余内容保持不变。”

实际受理：source_file_id=file_cloud_wvmacro6uwci2xqdhqxwle6lpc；mask.file_id=file_cloud_gh2knsdubkcpvryuhsl6fw7yp7，purpose=ai_erase；mask.source_version_id与源相同；intent引用同一mask；edit_tools=[erase]，overlays/annotations为空。generation_size=1008×672是生成配置，不替代实际mask1000×666。mask SHA256=3bedf2db560424ceb30deada25a623c25b16166616650f6e4b322da2b4b12680。四条Agent独立run及实际文本保留本地证据。

本轮新增图片任务恰好1条，终态failed且无成品，未取消/重发/重生成；外部阶段是否真正执行或计费仍未知，必须服务端核对原任务后才能决定重试。原完成头e43002eb574248708d3949eba24bdc79和8项历史保持，无待发正文/引用/生成中状态；最终草稿对象、mask、intent为空，原源RGB与基线相同。未删除原历史或回滚掩盖异常。

证据目录reports/erye237-023-real-mask-ego-prod-20261116/：baseline、brush四组PNG及brush-pixel-analysis.json、四条*-run-observation.json和*-terminal-messages.json、mask-fixture.json、mask各步真实截图/预览、actual-erase-submission.json、accepted-jobs.json、actual-submitted-mask-resource（带签名地址仅本机）、actual-submitted-mask.png、actual-mask-pixel-audit.json、erase-terminal.png、final-jobs.json、final-project.json、final-state.png、final-canvas.png。网络缓冲在点击后立即读取，仅覆盖准备/上传前段，不能称完整生成请求；实际受理依据后端generations冻结submission和task回读。真实mask通过该受理file_id的官方资源入口获取。

固定脚本仍PLAN/路径空；本轮为有头操作取证，不是固定自动化接入。仅更新本例及进度文档，未写云效、未Git提交推送。022/031 Passed、028 Blocked不变。

最终校验：543条用例、0问题；源RGB与基线一致、两缩放同参数RGB一致、旧1px不追改、原头及8项历史集合不变。TaskSpace18已finish keep=[]，关闭后无页面操作；SHA清单见evidence-manifest.json。ego-browser提示可升级，本轮未升级。

云效同步2026-11-16：[FWXC-581](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=53fde222a7123c53dc605edd63)，标题包含ERYE237-023。2张原始截图、1份脱敏审计附件及正文嵌图官方回读核验通过，负责人余航；仅新建本次合法擦除失败，未将未覆盖项提单。
