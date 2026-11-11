# 画笔及文字纯绘制结果尺寸缩小 — FWXC-369

2026-11-09通过云效官方OpenAPI直接新建[FWXC-369](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e6d492be908d55a9d0b86124e6)，未做历史去重、旧项修改0。关联IMG-TB-UI-002与IMG-TB-UI-005的同一可观察现象：纯绘制合成结果导出由1254×1254缩为1024×1024；不推断共同根因、模型调用或费用。两张原始完成态JPEG、三份实际导出PNG已上传并嵌入正文，另附evidence.json，共6附件；正文、字段、附件ID/文件名/字节数和5个图片引用回读通过。002/005保持Failed，本专项3 Passed/2 Failed/15 Not Run；本次未重跑生产任务。

证据清单：002-complete.jpg、005-complete.jpg、source-v1-export.png（1254×1254）、002-result-export.png（1024×1024）、005-result-export.png（1024×1024）、evidence.json。原始证据：reports/img-tb-ui-001-005-20261109/；同步计划：reports/yunxiao/img-tb-ui-002-005-20261109/；官方API回读检查点：reports/yunxiao/IMG-TB-UI-COMPOSE-SIZE-PROD-20261109/。

**现象**

图片工具栏纯绘制合成后，画笔与文字两种场景的导出图片均由源版1254×1254缩小为1024×1024；两次都没有要求调整尺寸或宽高比。

**前置步骤**

生产环境 https://app.cinlink.ai/ ，macOS Google Chrome有头，已登录测试账号yabinc18（Creator）。项目IMG-ANN-UI-007-20261109；同一测试会话 https://app.cinlink.ai/c/39cdf63c-d593-4538-816a-5d1c29973e36 。
上传已授权生成人像portrait.png（1254×1254，红T恤、蓝牛仔裤、白鞋、黄色手包），发送素材登记消息。上传后通过工具栏一次移除背景建立图片工程，再从历史选回带背景源V1：editor_image_28de342515fc438aa5a0893c504fc20d。源V1实际导出PNG已核实1254×1254。
每种场景开始前选回同一干净源V1、清理上一场景未发送草稿及引用；保留已完成历史，不以上一结果为底图。通过工具栏画笔添加绘制内容，随后随画笔引用发送完整指令。

**提示词**

素材登记（准备）：IMG-TB-UI-002素材登记：portrait.png。仅登记，不处理、不生成、不导出，后续通过图片工具栏测试。

画笔场景（已发送一次）：仅将当前红色笔迹作为最终图片内容合成，保留人像、黄色手包、背景及画幅，不调用AI重绘。

文字场景（已发送一次）：仅将当前文字作为最终图片内容合成，保持准确文字‘测试 CinLink 2026’，不改人像、手包、背景或画幅，不调用AI重绘。

**复现步骤**

1. 打开源V1，进入工具栏画笔，颜色设RGB(255,0,0)、8px；在图片左上空白区域画一条连续斜线（归一化约从0.10,0.16到0.28,0.24）。
2. 确认待发画笔引用与上述画笔完整指令，发送一次，等待“图片生成完成”。打开结果并通过右上角“导出”下载PNG，检查实际文件宽高。
3. 返回同一源V1，进入文字工具；默认字体准备就绪后，设RGB(0,128,255)、48px，在左上空白区域添加“新品 Hello 2026”。
4. 选中文字，右键“更多绘制设置→编辑文字”，修改为“测试 CinLink 2026”；将文字大小设36px，选中文字后用“应用到所选内容”应用。确认画布完整显示新文字。
5. 确认待发画笔引用与上述文字完整指令，发送一次，等待“图片生成完成”。打开结果并用相同导出入口下载PNG，检查宽高。
6. 返回源V1，通过相同入口导出源版；对比三份实际PNG的尺寸。两份结果关闭重开均可访问，源版历史仍在。

**实际结果**

源版source-v1-export.png：1254×1254，2615339字节。
画笔结果002-result-export.png：1024×1024，1703709字节；结果版本editor_image_65285b32447d460b8e9dca890477422f。
文字结果005-result-export.png：1024×1024，1701078字节；结果版本editor_image_2ebb4d933eb441428acad5e2e56a2447。
两条任务均显示“图片生成完成”，红线及准确文字可见，结果能导出和重开，源版仍为1254×1254。实际PNG头尺寸校验及解码查看均完成，非仅依据预览缩放或文件名判断。生成run_id未取得，不编造。

**预期结果**

仅添加画笔/文字内容、不要求缩放或更改画幅时，应按源版1254×1254完成确定性合成并导出；保持绘制内容的源图坐标和尺寸、未编辑区域及源版历史。不得将结果统一降为1024×1024。

**影响**

纯绘制会意外降低图片分辨率，破坏源尺寸交付及源像素坐标/排版基线，影响后续精确编辑和原尺寸导出。画笔和文字两个入口均观察到。

**补充**

同步标识：IMG-TB-UI-COMPOSE-SIZE-PROD-20261109

2026-11-09生产实测，对应IMG-TB-UI-002与IMG-TB-UI-005，两例均保持Failed。本报告归并两例相同可观察现象，不代表已确认共同根因。
依据ERYE-237 §3.2纯绘制确定性合成要求，以及工具栏专项同尺寸验收基线。尚无后台证据定位缩小发生在合成、版本发布还是导出阶段；未核provider和账务，不将调用AI或额外扣费作为已证实缺陷。未完成同尺寸逐像素对比，不另报未编辑区域像素变化。
附件包含两张本次完成态原始截图、源版及两份结果的实际导出PNG、尺寸/哈希JSON。截图用于核对场景与终态，实际分辨率以PNG文件为准。

**失败截图**

002：红色8px笔迹合成完成，完整请求及结果可见（原始实测截图）

![002-complete.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=434ed45f6fc5994095328bff9e)

005：文字合成完成，最终“测试 CinLink 2026”可见（原始实测截图）

![005-complete.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ac0f442e8035d0873ec12d77c9)

同会话源V1实际导出文件：1254×1254

![source-v1-export.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=668e9dd5a1de04351ef2b7c173)

002实际导出结果：1024×1024，原始PNG可下载核对

![002-result-export.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=da16d392c6ca13c7aedecfa365)

005实际导出结果：1024×1024，原始PNG可下载核对

![005-result-export.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=aaa4d591830103904b08a28b86)
