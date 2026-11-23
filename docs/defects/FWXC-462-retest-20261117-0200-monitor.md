# FWXC-462 Chrome预发回归（2026-11-17）

原回归 Failed；扩散一 Failed；扩散二 Passed（执行通过）。20:58官方OpenAPI更新并回读❌AI未通过，21:18再GET保持该状态。原生擦除区域变透明孔洞，未自然补齐背景；无mask自然语言入口通过不抵消原失败。固定脚本PLAN/空路径，CUA实测不计固定自动化。0评论/附件/新单，无Git提交推送。

环境：staging-app.cinlink.ai，Google Chrome原生CUA，yabinc92；原缺陷生产证据只读复核，未生产重放。开始门禁20:37/20:40精确已修复，creator/project核验通过；461开始前已AI通过，本轮Not Run，不冒称覆盖。

素材：reports/img-ann-ui-20261109/materials/portrait.png，1254×1254/1861272字节，rawSHA618ee76d125668919268cef85375e025f63e51e3ffedbc3c9de7c3ff46d7d900，按旧373授权素材清单精确溯源。当前原图实际导出SHA79eb642da31688e5ccc91f11a1be96dbb61677f6f61d08434b8433a604dd73db。三场景独立，不复用失败结果。

原回归：登记准备首次仅登记完成，保留该结果，仅补打开步骤；随后原生移除背景一次建立两历史，恢复原图。主擦除20px包体/8px提手经AX实际值确认，实际非空紫色mask与自动橡皮擦引用。完整原提示词只发送一次：

> 移除涂抹区域内的黄色手包，用周围一致的背景自然补齐该区域；保留人物的脸、头发、手、手臂、红色上衣、牛仔裤、白鞋及人物阴影，不新增其他物体，画幅不变。

扩散一：独立原图及两历史前置，改32px包体/12px提手，同一完整提示词一次。预期整包及提手移除并以背景补齐；实际11947像素均alpha0，仍失败。mask坐标及画笔值逐项保存在native-mask-strokes/UI证据。两次原生图像生成未取得runtime run_id，不编造。

扩散二：独立新会话直接附件原图，无mask自然语言入口，一条完整请求：

> FWXC-462扩散二：仅编辑本条附件 portrait.png（1254×1254红衣人像、黄色手包、浅灰背景原图），在新的独立图片工程中生成一个结果。移除人物右手提着的整个黄色手包及其提手，用周围一致的浅灰背景自然补齐原手包区域；保留人物的脸、头发、手、手臂、红色上衣、牛仔裤、白鞋及人物阴影，不新增其他物体，画幅保持1254×1254。本场景没有任何涂抹mask、参考圈或批注，不要把区域清成透明洞，不要去除整张背景。请实际生成并打开结果图片，不只返回操作说明。

实际146s done，generate_image/editor_open完成，实际PNG1254²全不透明，手包/提手移除、背景补齐、主体/衣着/阴影保留；执行通过。生成导致全图像素变化，不据此声称像素级保真或已覆盖原掩膜入口。

详细结果与证据（本机reports/fixed-monitor-20261116-135748）：

### original — Failed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Failed",
  "conversationId": "79e04d48-4728-42bb-8507-6079074ccb5f",
  "projectId": "c4a39d71-8ec2-48b6-91f5-09d7b862fa30",
  "sourceVersionId": "editor_image_ba3def3f383b4e3a8accc77c66f7f3ab",
  "resultVersionId": "editor_image_833abaa3419f4ee590aa00a40f1e2fcc",
  "entry": "主擦除工具20px包体/8px提手，非空mask和自动橡皮擦引用，原完整提示词一次",
  "actual": "严格原raw618ee素材/1254²、原图与透明两历史、主擦除20/8px实际AX值、非空mask、完整原提示词均执行。原生图像引用提交一次，生成新增833结果。实际PNG1254²/2594616字节/SHA865e3312bfa54eb6dbf791c86ac43f065b2b1ac5998b83bccfcd24152a1e8e79。全PNG解码与RGBA比较：原图全不透明，11567个涂抹像素变alpha0，bbox651,726–754,886；样点700,830从240,203,117,255变0,0,0,0，其他像素不变，黄边/部分提手残留，未自然补齐背景。显示黑块实为透明孔洞，仍不满足原移除业务。runtime消息仅两准备run，正式原生擦除未取得runtime run_id，不编造。",
  "evidence": [
    "462-O-before-submit-ui.png",
    "462-O-final-mask-ui.png",
    "462-O-body20-mask-ui.txt",
    "462-O-brush8-ui.txt",
    "462-O-generation-complete-ui.png",
    "462-O-erase-result.png",
    "462-O-result-file-audit.json",
    "462-O-rgba-audit.json",
    "462-O-native-mask-strokes.json"
  ]
}

### expansion1 — Failed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Failed",
  "conversationId": "9c74bdae-7e04-445e-a95b-8429f6c97872",
  "projectId": "bcfcd926-9fb2-4d0b-9b93-5514f9ac8ae3",
  "sourceVersionId": "editor_image_3de1eae7ba4544998f8a1bbad6cea02c",
  "resultVersionId": "editor_image_d991a5db58694f41a2628e47670fa73d",
  "actual": "独立同源1254²/两历史原图，32px包体12px提手非空mask，原完整提示词发送一次。实际PNG2593280字节SHA17a36565aee4743126380ad259f689fcfcc1d689728a8b09562d742d14419068。完整RGBA解码11947个变化像素全部变alpha0，bbox650,729–753,884，其他像素不变，黄边残留，无背景自然补齐。原生图像生成未取得runtime run_id。",
  "evidence": [
    "462-E1-before-submit-ui.png",
    "462-E1-final-mask-ui.png",
    "462-E1-generation-complete-ui.png",
    "462-E1-erase-result.png",
    "462-E1-rgba-audit.json",
    "462-E1-native-mask-strokes.json"
  ]
}

### expansion2 — Passed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "61cc3847-ea6f-4ba6-8dab-db5deb3dce88",
  "projectId": "d29a84ed-7a7a-45b3-a69e-83b9db74c604",
  "runId": "run_v2_8387c40eecdc4f07b890ee9d56c040be",
  "sourceVersionId": "editor_image_914b1009d23548a09e6e1e55670c8ce5",
  "resultVersionId": "editor_image_deb3afa999ab439e915803a388ad9114",
  "entry": "新独立会话直接附件原图，无mask自然语言一次",
  "actual": "执行通过。146s done，generate_image/editor_open实际完成，新增独立原/结果两历史。实PNG1254²/2491215字节SHAb1bbe6c527fbbac7d32c17b699b8709d711e9b67808ede9b4398f3442084dee3，黄色手包与提手移除，浅灰背景补齐，人物衣着/手臂/阴影保留，无新增物体。PNG全解码alpha始终255，0透明像素；生成引起全图像素变化，不声称像素级保真。",
  "evidence": [
    "462-E2-before-submit-ui.txt",
    "462-E2-terminal-ui.png",
    "462-E2-result.png",
    "462-E2-rgba-audit.json",
    "462-E2-runtime-api.txt",
    "462-final-protected-api.txt"
  ]
}

保护核验：原工程rev9/hash79cb9dc6373fa132acbae0282ff58de0cbcbaca9917a3a480811eb9bdb1a7805，扩散一rev9/hashb5b7b668f3b0db8ba9cb092091184c7618285aa1ad21aea040368d448df418d0，扩散二完成后均保持。见462-final-protected-api.txt。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“❌AI未通过”（回读时间2026-11-17T22:04:06.2100340+08:00），本轮原判定仍Failed；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-462/。
