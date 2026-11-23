# FWXC-491 Chrome预发回归记录（2026-11-17）

【生产环境】【ERYE199-012】普通删除前段后，后段自动前移5秒，未保留时间线空隙

最新：本轮原回归Passed（用户手动Delete参与），两独立扩散均Passed。以下排队段为历史，当时三项均Not Run。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

历史登录阻塞（已由Chrome预发yabinc92接续）：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-491；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发原前置进行中

15:10:28官方GET精确已修复且身份/项目匹配。专用工作区3e4382ec-5a23-4db7-99c7-4ba918e9b19c，仅原附件ERYE199-video.mp4，SHA e432370eb6cda0797076d6091622f2f7e0acd94cef690f1679c1a01f2349aba9一致，上传完成、跳过分析。独立CID4c4e5d7a-63e9-4dc8-873f-c05ade86f4e8，31秒素材登记完成后原生导入10秒视频，右缘裁剪A至源0-5/时间轴0-5，原声同步；工程31bdfc64-706a-447d-bab8-41aa72ca4fd9版本2，真实API核对。

页面素材拖入准备曾被控制切换中断；随后GET版本2只有A/原声各一段，未见B写入，未重复拖动。现已提交一次Agent补齐B前置，使用实际project/track/clip/file ID；仅读取该已受理请求。原目标右移B与单次Delete尚未触发，不能标通过或产品失败。

```text
FWXC-491原回归前置续接：当前工程31bdfc64-706a-447d-bab8-41aa72ca4fd9保存版本2，现有视频轨ad579528-355c-4028-aed9-e4c8f6a39789只有A片段b3f76821-60cc-446f-baef-4803d95adcde，原片file_cloud_tr5tonp5hfsyofxcplvjf6skis源0至5秒、时间轴0至5秒；现有原声轨efb67755-fb70-4543-b10f-9a4d6e272723关联该视频轨，原声A同样源0至5、时间轴0至5。请仅补齐B：把同一原片的源0至5秒、1倍速添加到同一现有视频轨5至10秒，并在现有原声轨同步对应的原声B。保留A和现有轨道ID不动，不新建其他工程或新轨，不移动、不删除、不执行波纹或导出，不生成替代视频。使用实际支持的编辑命令和真实ID，需要视图行ID时先回读当前编辑器视图，再续接写入及保存回读。正式右移B和Delete删除A由我之后在页面执行，此步不要替我执行。
```

证据491-O-imported-video.txt、491-O-trimmed-A-ui.txt、491-O-A-only-api.txt、491-O-add-B-preparation-submitted.txt。


## 2026-11-17T07:38:44.289Z 原流程检查点：等待实际Delete触发

原前置已完整达成。94秒只读前置fully=false后，133秒续接copy/paste实写fully=true：版本3，视频/原声均A0-5、B5-10，源都0-5，1倍速、原文件和原轨道保持。原步骤页面播放头0.5秒，拖B主体右移2秒；版本4、A0-5/B7-12，两组源范围保持，原声同步。

只选A及自动关联原声A，B/原声B未选。首次Delete调用被控制切换阻止，GET版本4/contentExactBefore=true；恢复焦点后按键调用完成，但稳定界面与GET仍版本4、A未删除、B仍7-12，内容与删除前完全一致。没有删后业务状态，不把未发生波纹裁剪当修复通过，也不将控制/按键未生效直接归为原产品失败。未重建或重发任何已受理业务。现等待用户在当前Chrome手动Delete一次后回读；原回归保持Not Run/未完成，两个独立扩散未启动。

当前原CID4c4e5d7a-63e9-4dc8-873f-c05ade86f4e8，工程31bdfc64-706a-447d-bab8-41aa72ca4fd9，播放头0.5秒，A与原声A选中/B未选。无在途Agent任务。不要重发AddB或右移B，不再自动补按Delete；用户操作后直接读取当前保存结果。

证据491-O-double-baseline-api.txt、491-O-before-delete-api.txt、491-O-selected-only-A.txt、491-O-delete-dispatch-check.txt、491-O-delete-settled-ui.txt、491-O-after-delete-api.txt、491-O-manual-delete-ready.txt/png。云效未写；正式ERYE199-012仍未判本轮通过。

续接完整提示词：
```text
继续刚才尚未满足的同一FWXC-491补B前置任务。使用你刚完成的editor_view_get和editor_project_get结果以及真实编辑器会话bcf9230e-a90c-4066-befe-87b50b86222a，续接实际写入B及保存回读。补充已由实际GET核实：原声A片段ID为e04c417c-287c-411a-9c99-c8795dea5d9f；现有工程31bdfc64-706a-447d-bab8-41aa72ca4fd9版本2，视频A为b3f76821-60cc-446f-baef-4803d95adcde。仅在现有视频轨ad579528-355c-4028-aed9-e4c8f6a39789及关联原声轨efb67755-fb70-4543-b10f-9a4d6e272723中补B，均用原文件file_cloud_tr5tonp5hfsyofxcplvjf6skis的源0-5秒、1倍速、时间轴5-10秒；新B片段ID可由真实编辑命令生成。保留A/原声A与现有轨道ID，不另建工程或轨道，不右移B，不删除A，不波纹、不转写、不生成、不导出。请按已确认的可用插入/复制路径实际写入并回读；若确实不支持请明确说明并保持原工程，不用只查询后结束。
```


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "4c4e5d7a-63e9-4dc8-873f-c05ade86f4e8",
  "projectId": "31bdfc64-706a-447d-bab8-41aa72ca4fd9",
  "coverage": "执行通过：原附件、同轨双源0-5片段，播放头0.5，原生B右移2秒，再由用户手动Delete一次。自动键盘未触发，人工参与明确记录。",
  "manualStep": "用户已按Delete；人工物理键触发后直接回读，未重建或重发业务。",
  "actual": "删除前GET版本4 A0-5/B7-12；用户单次Delete后版本5，只A及关联原声A被移除，所有其他content精确等于仅过滤这两个clip的预期；B视频/原声仍7-12、源0-5、1倍速、原clip/file/track保持，工程总12秒，源metadata200。未出现旧B自动前移5秒。",
  "evidence": [
    "491-O-double-baseline-api.txt",
    "491-O-before-delete-api.txt",
    "491-O-selected-only-A.txt",
    "491-O-manual-delete-ready.txt",
    "491-O-after-user-delete-ui.txt",
    "491-O-after-user-delete.png",
    "491-O-after-user-delete-api.txt"
  ]
}


## 用户Delete参与后的原结果更正

用户明确回复已按Delete后，原CID/原工程直接回读：版本4→5，A与关联原声A移除；完整content精确等于删除前仅过滤这两个clip的预期（onlyAandLinkedAudioRemoved=true），B与原声B仍7～12秒/源0～5秒/1倍速，原clip/file/track保持，总12秒，源metadata200。未复现旧B前移5秒，原回归Passed。15:40:50官方OpenAPI仅PUT状态为✅AI通过并GET验证；未写评论/附件/新单。此前自动按键未生效与人工协助明确保留，不声称全自动通过。两独立扩散继续，不重跑已通过原例。


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "05eb46e9-c138-495d-8bea-262b8959a3a4",
  "projectId": "cfa49aac-9654-4b6a-b060-115d418081a4",
  "coverage": "执行通过：独立3秒间隙工程原生Backspace普通删除前段、后段位置保持及一次Undo；非独立波纹删除",
  "actual": "独立原片A/原声A源0-5，新B/原声B源0-5于5-10。原生B右移3秒到8-13，GET版本4仅B对位置改变。单次Backspace版本5仅A/原声A移除，其他完整content精确保持，B仍8-13/源0-5、总13秒；一次Undo版本6完整content精确恢复删除前。",
  "evidence": [
    "491-E1-double-baseline-api.txt",
    "491-E1-before-delete-api.txt",
    "491-E1-selected-only-A.txt",
    "491-E1-after-backspace-ui.txt",
    "491-E1-after-backspace.png",
    "491-E1-after-delete-api.txt",
    "491-E1-after-undo-ui.txt",
    "491-E1-final-audit.txt"
  ],
  "nativeKeyObservation": "本机CUA的BackSpace已实际触发普通删除；此前原例Delete键名调用无效，用户物理Delete完成原例。此差异不作为原产品失败。"
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "e3785cdb-a042-4f6e-b7fc-415120409f9e",
  "projectId": "e8966453-259b-416b-afd4-45e0eb0883c5",
  "prompt": "仅编辑当前工程e8966453-259b-416b-afd4-45e0eb0883c5（保存版本3），当前真实编辑器会话35bfe89b-03b9-49e6-87b1-bae22093edd7。执行一次普通删除：仅移除视频A片段846e682a-0191-4c25-8a9a-40c36d9c3d08（时间轴0-5秒）及关联原声A片段4678b888-7d2b-420d-a0bd-b80b8ebe7993。同轨视频B 153236dc-631c-4ba3-b070-5af510365def和原声B a6aeb76a-3c09-48c4-8337-662ff0c0d16b均为时间轴5-10秒、源0-5秒、1倍速；保持B及原声B的完整内容、时间位置、片段ID、原素材ID和原轨道ID。删除后0-5秒保留空白，总时长仍10秒。不要波纹删除、剪切、删除空隙、移动、重建、生成、转写或导出。请实际执行一次并保存回读。",
  "coverage": "执行通过：独立相邻A0-5/B5-10，Agent普通删除A后B及原声仍5-10/总10秒，前方保留0-5空白；非波纹删除",
  "actual": "独立新工程先GET版本3核对同源双片段及关联原声。正式指令79秒done，实际editor_clip_delete成功；GET版本4仅A/关联原声A移除，完整content精确等于仅过滤二clip的预期，B及原声B仍5-10、源0-5/1倍速、原ID和内容保持。保护原工程版本5与E1版本6整份GET均精确不变。",
  "evidence": [
    "491-E2-before-delete-api.txt",
    "491-E2-before-delete-ui.txt",
    "491-E2-before-delete.png",
    "491-E2-normal-delete-prompt.txt",
    "491-E2-normal-delete-submitted.txt",
    "491-E2-after-delete-ui.txt",
    "491-E2-after-delete.png",
    "491-E2-final-audit.txt"
  ]
}


## 最新完整结果：P/P/P

环境staging-app.cinlink.ai，Google Chrome原生CUA，账号yabinc92。专用工作区3e4382ec-5a23-4db7-99c7-4ba918e9b19c，原附件10秒ERYE199-video.mp4完整SHA与原证据一致。三个独立会话/工程分别从原片新建，不复用前条删后结果。

| 场景 | 目标及入口 | 实际保存验收 |
|---|---|---|
| 原回归 | 原A0-5/B5-10，播放头0.5，原生B主体右移2秒，再用户物理Delete一次只移除A | Passed；版本3→4→5；B/原声B仍7-12、源0-5、1倍速，总12；完整content仅删A及关联原声A的预期差异；原clip/file/track保持，源metadata200 |
| 扩散一 | 独立A/B，B原生右移3秒到8-13，单次Backspace普通删A，再一次Undo | Passed；版本3→4→5→6；仅B对位置改变，仅A对被删，B仍8-13；Undo完整content精确恢复删前 |
| 扩散二 | 独立相邻A0-5/B5-10，不先右移；Agent一次普通删除A，保留0-5空隙 | Passed；79秒done/fully=true，实际editor_clip_delete成功，版本3→4，完整content仅删A对，B/原声B仍5-10、源0-5、1倍速，总10；原工程版本5及E1版本6整份GET精确未变 |

原例自动CUA Delete键名没有触发删除写入，用户明确已按Delete后原现场版本4→5通过，人工参与保留。扩散一CUA BackSpace已实测可触发本机编辑器普通删除；此输入适配差异不作为产品缺陷，也不声称原例全自动。失败/中断的未写入调用均保留，不重复任何已受理删除业务。

此轮覆盖普通移动/普通删除保留间隙及恢复/隔离，未执行独立波纹删除闭合动作，不能将ERYE199-012整个需求验收标完整Passed。未导出，也未扩展为导出像素或永久原资产删除验证。正式用例保留PLAN。

15:40:50官方OpenAPI仅将原状态从已修复改✅AI通过并验证，16:06:19再次GET保持；云效评论/附件/新单写入0，无Git提交推送。关键证据目录reports/fixed-monitor-20261116-135748/：491-O-after-user-delete-api.txt、491-E1-before-delete-api.txt、491-E1-after-delete-api.txt、491-E1-final-audit.txt、491-E2-before-delete-api.txt、491-E2-final-audit.txt、491-E2-gap-preview.txt/png。

<details><summary>本轮素材、前置和正式Agent完整指令</summary>

### original-register-preparation

```text
FWXC-491原回归素材登记：仅登记本会话上传的ERYE199-video.mp4原文件，不剪辑、不生成、不转写、不导出，不修改其他工程。后续由页面准备同源双片段并验证普通Delete保留间隙。
```

### original-add-B-preparation

```text
FWXC-491原回归前置续接：当前工程31bdfc64-706a-447d-bab8-41aa72ca4fd9保存版本2，现有视频轨ad579528-355c-4028-aed9-e4c8f6a39789只有A片段b3f76821-60cc-446f-baef-4803d95adcde，原片file_cloud_tr5tonp5hfsyofxcplvjf6skis源0至5秒、时间轴0至5秒；现有原声轨efb67755-fb70-4543-b10f-9a4d6e272723关联该视频轨，原声A同样源0至5、时间轴0至5。请仅补齐B：把同一原片的源0至5秒、1倍速添加到同一现有视频轨5至10秒，并在现有原声轨同步对应的原声B。保留A和现有轨道ID不动，不新建其他工程或新轨，不移动、不删除、不执行波纹或导出，不生成替代视频。使用实际支持的编辑命令和真实ID，需要视图行ID时先回读当前编辑器视图，再续接写入及保存回读。正式右移B和Delete删除A由我之后在页面执行，此步不要替我执行。
```

### original-add-B-continuation

```text
继续刚才尚未满足的同一FWXC-491补B前置任务。使用你刚完成的editor_view_get和editor_project_get结果以及真实编辑器会话bcf9230e-a90c-4066-befe-87b50b86222a，续接实际写入B及保存回读。补充已由实际GET核实：原声A片段ID为e04c417c-287c-411a-9c99-c8795dea5d9f；现有工程31bdfc64-706a-447d-bab8-41aa72ca4fd9版本2，视频A为b3f76821-60cc-446f-baef-4803d95adcde。仅在现有视频轨ad579528-355c-4028-aed9-e4c8f6a39789及关联原声轨efb67755-fb70-4543-b10f-9a4d6e272723中补B，均用原文件file_cloud_tr5tonp5hfsyofxcplvjf6skis的源0-5秒、1倍速、时间轴5-10秒；新B片段ID可由真实编辑命令生成。保留A/原声A与现有轨道ID，不另建工程或轨道，不右移B，不删除A，不波纹、不转写、不生成、不导出。请按已确认的可用插入/复制路径实际写入并回读；若确实不支持请明确说明并保持原工程，不用只查询后结束。
```

### expansion1-register-preparation

```text
FWXC-491扩散一独立素材登记：仅登记本会话上传的ERYE199-video.mp4原片，不剪辑、不生成、不转写、不导出，不改其他工程。本独立会话后续准备3秒空隙，验证页面键盘Backspace普通删除前段时保留后段布局。
```

### expansion1-add-B-preparation

```text
FWXC-491扩散一前置补B：当前新工程cfa49aac-9654-4b6a-b060-115d418081a4版本2，UI已经选中视频A和关联原声A，源都是原文件file_cloud_tr5tonp5hfsyofxcplvjf6skis的0-5秒、1倍速、时间轴0-5秒。视频轨aabb8e83-1a18-40a8-bc59-4e467fa35125，视频A e161b8a7-2ed1-459a-ae06-68b5a79f8031；关联原声轨bf8ff6e6-fcfe-47b1-930d-95319205fb6e，原声A d3f8e4f1-2e96-4f92-83e8-25ea300512d5。这些ID均已真实GET核对。请用当前真实编辑器会话的复制并粘贴到所选轨道路径（editor_view_update、editor_clipboard_copy、editor_clipboard_paste及命令回读），将A及原声A复制为同轨B，粘贴到时间轴5秒，即B为5-10秒、源0-5秒。现有两轨和A保持，不新建工程/轨道，不右移、不删除、不波纹、不生成、转写或导出。请实际完成复制粘贴及保存回读，不只查询后结束；这仅准备本独立工程B，正式3秒右移和删除由页面后续执行。
```

### expansion2-register-preparation

```text
FWXC-491扩散二独立素材登记：仅登记本会话上传的ERYE199-video.mp4原文件，不剪辑、不生成、不转写、不导出，不改其他工程。本独立会话后续验证相邻片段通过Agent普通删除前段后，后段仍保留原5至10秒的位置。
```

### expansion2-add-B-preparation

```text
FWXC-491扩散二前置补B：当前新工程e8966453-259b-416b-afd4-45e0eb0883c5版本2，UI已选视频A与关联原声A，都是原文件file_cloud_tr5tonp5hfsyofxcplvjf6skis源0-5秒、1倍速、时间轴0-5秒。真实视频轨d94e77c2-84bb-4e46-81a4-709cbdbc0256，视频A 846e682a-0191-4c25-8a9a-40c36d9c3d08；关联原声轨2f503c4c-fc34-4719-8768-9f445601ba7b，原声A 4678b888-7d2b-420d-a0bd-b80b8ebe7993，均已实际GET核实。请用当前真实编辑器会话的复制并粘贴到所选轨道路径（editor_view_update、editor_clipboard_copy、editor_clipboard_paste及命令回读），复制A及原声A为同轨B，粘贴到5秒，使B/原声B均5-10秒、源0-5、1倍速。现有工程/两轨/A都保留，不另建工程/轨道，不右移、不删除、不波纹、不转写、不生成、不导出。此步只实际完成B准备并保存回读，不只查询后结束；正式普通删除在前置核验后另发一条独立指令。
```

### expansion2-agent-normal-delete

```text
仅编辑当前工程e8966453-259b-416b-afd4-45e0eb0883c5（保存版本3），当前真实编辑器会话35bfe89b-03b9-49e6-87b1-bae22093edd7。执行一次普通删除：仅移除视频A片段846e682a-0191-4c25-8a9a-40c36d9c3d08（时间轴0-5秒）及关联原声A片段4678b888-7d2b-420d-a0bd-b80b8ebe7993。同轨视频B 153236dc-631c-4ba3-b070-5af510365def和原声B a6aeb76a-3c09-48c4-8337-662ff0c0d16b均为时间轴5-10秒、源0-5秒、1倍速；保持B及原声B的完整内容、时间位置、片段ID、原素材ID和原轨道ID。删除后0-5秒保留空白，总时长仍10秒。不要波纹删除、剪切、删除空隙、移动、重建、生成、转写或导出。请实际执行一次并保存回读。
```

</details>
