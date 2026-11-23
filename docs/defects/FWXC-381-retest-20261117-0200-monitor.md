# FWXC-381 Chrome预发回归（2026-11-17）

严格原Blocked；两个独立无圈指令扩散Passed（执行通过）。原前置的对象设置入口未完成，正式原提示词未发送；不能将两个无圈变体冒称原guide流程通过。21:18精确已修复/creator/project门禁通过后合法开轮，21:35官方GET已外部推进✅AI通过，本轮0状态写入，保留现状不回退。固定脚本PLAN/空路径，无评论/附件/新单/Git写入。

环境：staging-app.cinlink.ai，Google Chrome原生CUA，yabinc92。原生产只读证据不作本轮执行。专用项目d71926f4-21b3-48bf-ac63-652a07da4d07。

精确底图：本机历史reports/erye237-021-050-ego-prod-20261113/030-source-canvas.png，所选a408源版1024²全画布像素快照，1772811字节/SHA c269915ef7d0227b4b80be49c0320d5182540771589d75b853f42ad0ada8b1ec。原红斜线、红T1新品、蓝导出测试均为固有像素。不是UI截图裁剪，不以失败输出重建。当前实际源PNG导出字节完全相同。原准备create invalidJSON，但editor_open实际成功，源图导出核验后保留完成步骤，未重建/重发。

原绘制准备：右侧文字实际建立；颜色应用不可靠，右键未显示更多设置，无法勾仅供AI参考；未完成参考圈前置。已保存阻塞截图，退出明确放弃自有未发送草稿，原图历史保留。不再次要求用户手动字号设置。

原正式提示词（未发送）：

> ERYE237-030：根据红圈指示，把圈内原图红色“T1 新品”标签改为蓝色；保留右侧新增文字“保留内容”作为最终图片内容，红圈仅作指示，不要出现在成品。保留人物、黄色手包、背景及当前源画幅，其他区域不改。不把批注点或遮罩烘焙到图片。

### original — Blocked

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Blocked",
  "conversationId": "61b33a60-e67f-46aa-8582-1f2a8277979e",
  "sourceVersionId": "editor_image_1887688e499e40dc9143906dca95419c",
  "actual": "已恢复精确a408历史1024²底图，导出字节与c269915e源完全相同。实际进入画笔并创建右侧保留内容，准备中颜色应用未可靠完成，右键未打开对象更多设置，无法勾仅供AI参考并核验。严格原目标未发送，不以变体代替原通过；保留已完成工程/源图/草稿，后续独立入口扩散。用户已确认463无法设字号，不重复要求手动设置。",
  "evidence": [
    "381-O-source-export.png",
    "381-O-settings-unavailable-ui.png",
    "381-O-settings-unavailable-ui.txt",
    "381-O-prepare-terminal-ui.txt",
    "fixtures/381-original/manifest.json"
  ],
  "projectId": "a6704dcd-67bb-48ab-829a-f3c933647d9a"
}

完整扩散提示词：

> FWXC-381扩散一（直接附件自然语言入口，无参考圈或画笔草稿）：仅编辑附件base030.png中的红色“T1 新品”标签，把这段标签文字改为蓝色；在人物右侧空白处添加蓝色文字“保留内容”作为最终图片内容。左上红色斜线以及原蓝字“导出测试”是源图固有设计内容，必须完整保留，不能当作参考标记清除。保留人物、黄色手包、背景及1024×1024源画幅，其他区域不改，不新增参考圈、批注点或遮罩。请实际生成一个独立结果并打开图片编辑器。

### expansion1 — Passed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "b99f17d6-2a7b-41f9-ab0a-34b5291cbde9",
  "projectId": "bf45e87a-9c12-4a23-aeba-63e880d41d6b",
  "runId": "run_v2_e47513a5257e41e498bef991464d02aa",
  "sourceVersionId": "editor_image_61c30d8d3b244a94941edf4cea7fc152",
  "resultVersionId": "editor_image_5f724a37142448439a2e646085013b45",
  "actual": "执行通过。独立精确a408底图直接附件无圈请求一次，140676ms done后等待实际异步终态。实PNG1024²/1779301字节/SHA11e81f91f2923537b3f97af624ebf00e524878972be88f84ba75dc01dadbc172；T1新品改蓝、右侧蓝保留内容准确存在，原红斜线/原蓝导出测试保留，人物手包背景保持；无参考圈/透明洞。全图生成有像素变化，不称逐像素锁定。",
  "evidence": [
    "381-E1-before-submit-ui.txt",
    "381-E1-terminal-ui.png",
    "381-E1-result.png",
    "381-E1-rgba-audit.json",
    "381-E1-runtime-api.txt"
  ]
}

完整扩散提示词：

> FWXC-381扩散二：在全新独立结果中只把本条附件base030.png左侧蓝色文字“导出测试”改成绿色，文字内容、位置和大小保持。左上红色斜线和其下红色“T1 新品”是原图固有设计，全部保留；本次它们不是参考标记，不能移除、改色或重排。人物、黄色手包、浅灰背景及1024×1024画幅保持，不新增文字、参考圈、批注点或透明洞。只允许目标“导出测试”改色，请实际生成并打开独立结果图片。

### expansion2 — Passed

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "49761126-e3a0-4a2d-83c6-21b15aaffedc",
  "projectId": "6f2dbe94-3ef3-4f6a-b9bd-c4ae84eb48f7",
  "runId": "run_v2_adcff2ba0cd34ea2a9c71c4c49ca5356",
  "sourceVersionId": "editor_image_f6fe228259084241b7bf9d9c4aabbf1b",
  "resultVersionId": "editor_image_fbd1bbdcc49d4f9fad02445ad363c025",
  "actual": "执行通过。独立原底图直接附件将导出测试蓝→绿，明确保留原红斜线及红T1标签，一次提交131226ms done。实PNG1024²/1731177字节SHA13155c652fdf280a428265f5e2d0503b39aee3f3243f0689cb34b9c950929663，绿色目标准确，原红线和红标签仍在，主体手包背景保持，无新增字/参考圈/透明洞。全图生成不声称逐像素保真。",
  "evidence": [
    "381-E2-before-submit-ui.txt",
    "381-E2-terminal-ui.png",
    "381-E2-result.png",
    "381-E2-rgba-audit.json",
    "381-E2-runtime-api.txt"
  ]
}

两独立成品均保留原非目标线条/文字与主体，按业务语义验收，不声称生成外区域逐像素锁定。原工程rev10、扩散一rev4完成后再GET仍相同修订，最终内容摘要已存381-E2-runtime-api.txt；未在扩散前采集完整content hash，不声称哈希前后相等。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“✅AI通过”（回读时间2026-11-17T22:04:06.9262410+08:00），本轮原判定仍Blocked；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-381/。
