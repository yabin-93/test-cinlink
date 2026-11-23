# FWXC-487 Chrome预发回归与验收修订（2026-11-17）

【生产环境】【ERYE199-010】拖入原视频轨5秒位置后新增轨道，未覆盖原片重叠区间

最新：用户明确允许视频换行、优先显示最上方视频。按新口径原回归及两个独立扩散均Passed；旧同轨覆盖Failed已作废归档。以下排队段为历史。本次首次进入持续回归待办，不使用历史结果代替本轮。本次计划按用户授权在预发staging-app.cinlink.ai执行，原缺陷环境及原步骤需结合保存的原描述/截图完整回读。

历史登录阻塞（已由Chrome预发yabinc92接续）：ego空间23/p1已交给用户，最后看到yabinc18，等待用户确认切换yabinc92。不得擅自接管登录页、改用生产、重放生产旧请求或与独立执行任务并发。云效现为已修复，本次未写状态。登录后每项严格原流程＋两条独立扩散，实际通过/失败再同步✅AI通过/❌AI未通过，未执行不判通过/失败。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-487；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Failed",
  "conversationId": "265f2fe1-e766-40ac-8c2d-355964a1740c",
  "projectId": "0a22cd41-df94-4fb8-8aba-1376d420d93e",
  "coverage": "实际未通过：原附件/原单轨A0-10/媒体工程B/缩放1/播放头0.5均核对；自动拖动未触发写入，用户确认手动拖B到原A轨5秒，人工参与明确保留。",
  "requestedDropAtSec": 5,
  "savedBStartSec": 0,
  "manualStep": "用户回复已拖B到5秒；无拖动指针轨迹录像，保存实际按API/UI记载，不冒称与原旧B5-15完全相同。",
  "actual": "拖入前GET版本1单视频轨A0-10，B未入时间线。两次native拖动（预览/真实draggable按钮标题）均未写入，GET仍版本1/content完全相同。用户确认拖到5秒后回读版本3：两条视频轨及各自关联原声；A/原声A完整content与前置精确不变，仍0-10/源0-10；B正确原文件file_cloud_b5gsehtj3zwzr4hoaj7obkajyf位于新增独立轨0-10/源0-10/1倍速，总10秒。未实现原轨A0-5残段+B5-15的覆盖预期。",
  "evidence": [
    "487-O-before-drag-api.txt",
    "487-O-before-drag-ui.txt",
    "487-O-before-drag.png",
    "487-O-drag-input-audit.txt",
    "487-O-label-drag-api.txt",
    "487-O-manual-drag-ready.txt",
    "487-O-after-user-drag-ui.txt",
    "487-O-after-user-drag.png",
    "487-O-after-user-drag-api.txt"
  ]
}


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "265f2fe1-e766-40ac-8c2d-355964a1740c",
  "projectId": "0a22cd41-df94-4fb8-8aba-1376d420d93e",
  "assessmentRevision": 2,
  "coverage": "按用户新口径执行通过：允许视频换行；重叠区最上方视频优先。原人工拖入参与保留；旧同轨覆盖Failed已归档作废。",
  "actual": "用户后续调整现场后A上轨0-10，B下轨约5.03-15.03。6秒两视频均活动，实际预览为video frame180 pts6.000的A，尽管下方B选中；11秒上方A结束，预览切到videoB frame178 pts5.933的B。保存回读两条visible视频轨，A/B均原文件/源0-10/1倍速，6秒均活动、11秒仅B活动。允许分轨后不再要求A裁短，不按旧口径判失败。",
  "userInstructions": [
    "487看上去是对的",
    "允许视频换行",
    "优先显示最上方视频"
  ],
  "evidence": [
    "487-O-new-rule-before-ui.txt",
    "487-O-new-rule-overlap6-ui.txt",
    "487-O-new-rule-overlap6.png",
    "487-O-new-rule-after-top-end11-ui.txt",
    "487-O-new-rule-after-top-end11.png",
    "487-O-new-rule-saved-api.txt"
  ],
  "scopeLimit": "B起点实际5.033秒，保存实测值不冒称精确5秒；未导出；两个独立扩散按新口径继续。"
}


## 用户最新验收口径及结果更正

用户本轮明确：

> 487看上去是对的
> 允许视频换行
> 优先显示最上方视频

据此撤销旧“必须在同一轨覆盖并裁短A，新增视频轨即失败”的验收前提。此前按旧口径作出的Failed及16:25:56❌状态变更保留为已作废历史，单独审计487-cloud-acceptance1-superseded-result.json及state.assessmentHistory，不再计入最新失败。

当前原现场已被用户调整为保存版本4：上轨A0～10秒，下轨B5.033333～15.033333秒，均原附件/源0～10秒/1倍速/可见/不透明。6秒两轨均活动，实际预览为上轨A的video frame180 pts6.000，下轨B虽选中不抢画面；11秒A已结束，实际预览切至videoB frame178 pts5.933。保存中6秒两原文件均活动，11秒仅B活动，与预览吻合。允许分轨与最上方优先原业务验收Passed。

16:37:14官方OpenAPI仅将❌AI未通过更正为✅AI通过并GET验证，评论/附件/新单写入0。原输入人工协助、最初版本3 B0～10以及后续版本4约5.03秒的现场变化如实保留，不冒称从未变过或精确5.000秒。未导出；两个独立扩散已按新口径验证隐藏上轨回落、反向素材顺序及上轨结束回落，不再要求同轨裁除。

关键新证据：487-O-new-rule-overlap6-ui.txt/png、487-O-new-rule-after-top-end11-ui.txt/png、487-O-new-rule-saved-api.txt。旧失败JSON段为历史，不作为当前结论。


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "assessmentRevision": 2,
  "conversationId": "f11e3e0c-6031-4f5e-837e-39d3d5b73f1c",
  "projectId": "05352b01-7345-47ec-a77d-6d5a91ef3096",
  "coverage": "新口径执行通过：独立B上/A下0-10完全重叠，隐藏/恢复最上方视频的显示回落与优先恢复",
  "actual": "原A导入后，Agent前置89秒成功editor_media_insert new_track_index0插入原B，GET版本2 B位于上方、A下方，原A视频/原声完整内容未变。3秒实际预览videoB frame90；原生隐藏上方B后显示video frame90的下方A，GET版本3完整content仅B.visible=false；恢复B后重新显示videoB frame90，GET版本4完整content精确等于版本2基线，保护原工程版本4整份GET精确不变。",
  "evidence": [
    "487-E1-both-baseline-api.txt",
    "487-E1-top-visible3-ui.txt",
    "487-E1-top-visible3.png",
    "487-E1-top-hidden3-ui.txt",
    "487-E1-top-hidden3.png",
    "487-E1-hide-audit.txt",
    "487-E1-top-restored3-ui.txt",
    "487-E1-top-restored3.png",
    "487-E1-final-audit.txt"
  ],
  "scopeLimit": "无导出，不验证音频混音或半透明叠加规则。"
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "assessmentRevision": 2,
  "conversationId": "b39b0632-a8d7-4828-851c-1f309f4315f8",
  "projectId": "cbb15fa1-5389-48c7-a92f-d4abc9b35d46",
  "coverage": "新口径执行通过：独立反向素材顺序，A上0-5/B下0-10，同起点不同结束；下方选中不抢上方/上方结束后显示下方",
  "actual": "独立原B工程版本1；Agent前置87秒成功插入原A为new_track_index0，GET版本2 A上/B下均0-10，原B和原声B完整未变。原生仅裁上方A及关联原声为0-5，GET版本3完整content仅两A片段source_out=5。选中下方B并保持：3秒预览video frame90的A，7秒预览videoB frame210的B，UI下方B仍选中。原工程版本4和E1版本4整份回读均精确不变。",
  "evidence": [
    "487-E2-both-baseline-api.txt",
    "487-E2-upper-trimmed-ui.txt",
    "487-E2-lower-selected-overlap3-ui.txt",
    "487-E2-lower-selected-overlap3.png",
    "487-E2-after-upper-end7-ui.txt",
    "487-E2-after-upper-end7.png",
    "487-E2-final-audit.txt"
  ],
  "scopeLimit": "验证不透明可见视频的预览层序及时间活动范围，未导出、未验证半透明混合/音频混音。"
}


## 最新完整结果：新口径P/P/P

Google Chrome原生CUA，staging-app.cinlink.ai，yabinc92。原10秒A/B附件SHA均与原证据一致；三个独立会话/工程从原文件分别准备，不复用前条业务结果。用户明确允许视频换行、优先显示最上方视频，旧必须同轨裁除的要求不再适用。

| 场景 | 独立前置/实际步骤 | 保存及预览验收 |
|---|---|---|
| 原回归 | 用户手动拖B，后续调整为A上0-10/B下5.033-15.033 | Passed；版本4两可见视频轨；6秒A的video frame180优先，虽B被选中；11秒切到videoB frame178，符合活动范围。原人工参与/实际时间保持记录 |
| 扩散一 | 新工程A后插B为最上方，B上/A下0-10；3秒隐藏B再恢复 | Passed；B→A→B真实预览，均frame90；版本2→3仅B.visible=false，版本4完整content精确恢复基线；原工程版本4整份GET不变 |
| 扩散二 | 新工程先B后插A为最上；原生将A及关联原声裁到0-5，B保持0-10；选中下方B | Passed；3秒仍显示A的video frame90，7秒显示B的videoB frame210；版本3完整content仅两A片段source_out=5，原工程和E1均版本4整份GET不变 |

原CID265f2fe1-e766-40ac-8c2d-355964a1740c/工程0a22cd41-df94-4fb8-8aba-1376d420d93e；扩散一CIDf11e3e0c-6031-4f5e-837e-39d3d5b73f1c/工程05352b01-7345-47ec-a77d-6d5a91ef3096；扩散二CIDb39b0632-a8d7-4828-851c-1f309f4315f8/工程cbb15fa1-5389-48c7-a92f-d4abc9b35d46。

新状态16:37:14更正为✅AI通过并验证，16:58:45官方再次GET保持；旧❌日志独立归档而非删除。未写云效评论/新单/附件，无Git提交推送。未导出、不覆盖半透明混合/音频混音；固定脚本仍PLAN。

新关键证据目录reports/fixed-monitor-20261116-135748/：487-O-new-rule-overlap6.png、487-O-new-rule-after-top-end11.png、487-O-new-rule-saved-api.txt；487-E1-top-visible3.png、487-E1-top-hidden3.png、487-E1-top-restored3.png、487-E1-hide-audit.txt、487-E1-final-audit.txt；487-E2-lower-selected-overlap3.png、487-E2-after-upper-end7.png、487-E2-final-audit.txt。

<details><summary>独立素材/前置的完整提示词</summary>

### original-register-preparation

```text
FWXC-487原回归素材登记：仅登记本会话上传的ERYE199-video.mp4原10秒A视频，不剪辑、不生成、不转写、不导出，不修改其他工程。项目中的ERYE199-videoB.mp4保留原文件，不放入时间线。后续覆盖拖入回归全部由页面操作。
```

### expansion1-register-preparation

```text
FWXC-487新口径扩散一独立素材登记：仅登记本会话上传的ERYE199-video.mp4原A文件，不剪辑、不生成、不转写、不导出，不修改其他工程。按用户最新允许视频分轨、最上方视频优先的口径，本会话后续验证隐藏上方视频时显示下方、恢复后上方再次优先。
```

### expansion1-multitrack-preparation

```text
FWXC-487新口径扩散一多轨前置：当前独立工程05352b01-7345-47ec-a77d-6d5a91ef3096保存版本1，现有视频A轨e9a6bca2-a2d8-49bc-beff-70cdf97f8d94、片段c4376c98-7bd2-4ed9-ac67-9fbc7578518f，原A文件file_cloud_tr5tonp5hfsyofxcplvjf6skis，时间轴0-10秒、源0-10秒、1倍速；已有真实关联原声。请仅把当前项目原B文件ERYE199-videoB.mp4（file_cloud_b5gsehtj3zwzr4hoaj7obkajyf，完整10秒）加入这个工程的独立新视频行，也从时间轴0秒开始、源0-10秒、1倍速、可见不透明，并保留其原声。允许新增视频行，行序不限定，A及原声A完整保留，不覆盖、不裁短A、不改其他工程、不生成、不转写、不导出。需要真实视图行标识时先读取当前编辑器视图再完成同一前置写入及保存回读，不猜测row ID，不只查询后结束。后续隐藏/恢复最上方视频的验证由页面另行执行，此步只准备两条可区分的完整重叠视频。
```

### expansion2-register-preparation

```text
FWXC-487新口径扩散二独立素材登记：仅登记本会话上传的ERYE199-videoB.mp4原B文件，不剪辑、不生成、不转写、不导出，不改其他工程。本会话将反向准备A上/B下，同起点但上方视频先结束，并检查选中下轨不抢占最上方活动视频。
```

### expansion2-multitrack-preparation

```text
FWXC-487新口径扩散二多轨前置：当前独立工程cbb15fa1-5389-48c7-a92f-d4abc9b35d46版本1，现有B视频轨5841dd57-9f04-4d9d-ab33-b66564d7e894、片段8f2d5013-3512-42c8-b706-cb9a32011f1a，原B文件file_cloud_b5gsehtj3zwzr4hoaj7obkajyf，时间轴0-10秒、源0-10秒、1倍速；已有真实关联原声。请仅把当前项目原A文件ERYE199-video.mp4（file_cloud_tr5tonp5hfsyofxcplvjf6skis，完整10秒）加入这个工程最上方的独立新视频行（new_track_index=0），从时间轴0秒开始、源0-10秒、1倍速、可见不透明，并保留其原声。B及原声B完整保持，不覆盖、不裁短B，不改其他工程，不生成、转写或导出。请用真实编辑器与行标识实际插入并保存回读；需要时先回读视图再完成同一前置，不猜row ID，不只查询后结束。此步只准备A上/B下的完整两视频，后续把上方A裁短至5秒及选中下轨显示检查由页面另行执行。
```

</details>
