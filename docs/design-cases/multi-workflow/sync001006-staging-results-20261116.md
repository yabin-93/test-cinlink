# SYNC-001～006 预发执行记录（2026-11-16）

本轮结论：**3 Failed / 1 Blocked / 2 Needs Review / 0 Passed**。共10条业务请求：8 done、1 failed、1 terminated；005/006的第二轮因缺少P1未提交。另有6次素材登记准备轮，不计业务轮数。

使用 Ego Lite TaskSpace 9，预发账号1020817070；每例独立项目/会话，业务任务串行、零重试。原片8份哈希均校验，005夹具完整解码且解码PCM与原WAV逐字节一致、零偏移。素材登记记准备轮0，不计两轮业务指令。

**验收边界：当前运行环境无法进行人工音频听审。独立本地Whisper、SRT、抽帧和波形比对均只作辅助，不能代替完整逐句听看，不根据done、模型自述或估计偏移宣称通过。待复核明确保留，不计Passed。**

六条定义通过官方OpenAPI同步到云效“五轮多工作流”，WLAX-303～308，字段及全文回读通过；这次同步不表示测试通过，也未创建缺陷。

| 用例 | 云效 | R1 | R2 | 本轮结论 |
|---|---|---|---|---|
| SYNC-001 | WLAX-303 | done | done | Needs Review |
| SYNC-002 | WLAX-304 | done | done | Needs Review |
| SYNC-003 | WLAX-305 | done | done | Failed |
| SYNC-004 | WLAX-306 | done | done | Failed |
| SYNC-005 | WLAX-307 | failed | Blocked（未提交） | Failed |
| SYNC-006 | WLAX-308 | terminated | Blocked（未提交） | Blocked |

## SYNC-001

项目：`0a69b08f-5bcc-4445-93e8-9ed612d42c3f`；会话：[66e32b82-105d-4281-adb4-964a2c827a21](https://staging-app.cinlink.ai/c/66e32b82-105d-4281-adb4-964a2c827a21)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| 1270510918-1-12.mp4 | `file_cloud_igyfjr4oquc5muhhei3dbetq3h` | `988ee53e64e00a18809a65e7138bae8ef44100f8a51e92c0f86c4adbe54107aa` |

### R1：done

run：`run_v2_13201ab0e8b8416b99370058cf68d346`；提交时间：`2026-11-16T11:20:38.016Z`。

完整已发送提示词：

```text
请只处理原始视频“1270510918-1-12.mp4”（文件ID：file_cloud_igyfjr4oquc5muhhei3dbetq3h），选取有完整英语讲话的内容剪成30秒高光，最多4个片段，优先保证句子完整。只做剪辑，保留所选片段的原声及原画面比例，不加字幕、不配音、不加音乐或转场。交付一个MP4，并说明实际保留的源片段范围。
```

产物：[editor-export.mp4](../../../reports/sync001006-staging-20261116/SYNC-001/round-1-product.mp4), `file_cloud_kt56tbvcs753jxwjp343hqvprh`，30.0秒。
SHA-256：`44e1feb455b7afdc68bdd59b27d67f66b4e5f4f4e11544b21d604ace15067214`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "durationMatches": true}`。

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-001/round-1-before.png)

[round-1-before-render-confirm.png](../../../reports/sync001006-staging-20261116/SYNC-001/round-1-before-render-confirm.png)

[round-1-completed.png](../../../reports/sync001006-staging-20261116/SYNC-001/round-1-completed.png)

[round-1-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-001/round-1-lineage-comparison.json)

### R2：done

run：`run_v2_9bf6ac6570484265a62b9626c15afe0a`；提交时间：`2026-11-16T11:28:25.131Z`。

完整已发送提示词：

```text
请只处理刚才的30秒高光视频“editor-export.mp4”（文件ID：file_cloud_kt56tbvcs753jxwjp343hqvprh）。以该视频实际保留的英语讲话为依据，翻译为普通话配音，并添加与普通话配音逐句对应的简体中文字幕，烧录到视频。使用默认普通话声音，用新配音替换原英语人声；保持该高光视频的片段顺序、画面比例和时间线长度，不再次剪辑、不加音乐。交付一个同时包含新配音和新字幕的MP4；如支持，另附对应成片时间线的SRT。
```

产物：[dubbed-video.mp4](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-product.mp4), `file_cloud_4gvmdqufdvtshzjccbcb7xck2i`，30.0秒。
SHA-256：`d7432bc009de5f87a9d0dc455d4b08f2d531634a76a943a8ca2cf68f1a0bdb88`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "p1HashUnchanged": true, "durationMatches": true, "preservesInputDuration": true}`。

[round-2-before.png](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-before.png)

[round-2-completed.png](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-completed.png)

[round-2-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-subtitle-review.json)

[round-2-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-lineage-comparison.json)

![SYNC-001 R2 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-001/round-2-cue-frames-1.png)

复核记录：

```json
{
  "result": "Needs Review",
  "completedBusinessRounds": [
    1,
    2
  ],
  "visualReview": "逐条中心抽帧11/11显示对应中文烧录字幕，无画幅改变；保留原新闻画面文字。",
  "auxiliaryAsr": "P1识别到英文新闻内容，P2识别到对应中文译文；没有将本地Whisper当作听审或金标。",
  "openChecks": [
    "全部音节/连续听审",
    "首句及拼接点是否截断",
    "品牌及人名校对",
    "连续声音字幕同步与漂移判断"
  ],
  "sourceRangeRisk": "独立ASR显示P1源起止接近词边界，人工听审待确认，不据此直接判失败。",
  "visualRisk": "新增中文位于底部原新闻滚动文字区域，存在叠字/可读性风险，需在完整视频听看中复核；原有新闻文字自身不计新增字幕重复。"
}
```

## SYNC-002

项目：`b5777363-6e1a-4522-a54a-e85af2b3d9cf`；会话：[139951a0-6eb6-4760-9283-102040223711](https://staging-app.cinlink.ai/c/139951a0-6eb6-4760-9283-102040223711)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| 纯中文.mp4 | `file_cloud_sfpeqbyjlir5laanpjt6hqqyzo` | `1123e89b7fdbb70634e1f3e9c62c603c01d491a2dd2678069705d01db9297563` |

### R1：done

run：`run_v2_8a892b32925b4190a06442287d09b057`；提交时间：`2026-11-16T11:33:47.827Z`。

完整已发送提示词：

```text
请只处理原始视频“纯中文.mp4”（文件ID：file_cloud_sfpeqbyjlir5laanpjt6hqqyzo），选取有完整产品介绍语句的内容剪成20秒高光，最多3个片段，优先保证句子完整。只做剪辑，保留片段原声及原竖屏画面比例，不加字幕、不配音、不加音乐或转场。交付一个MP4，并说明实际保留的源片段范围。
```

页面已确认源段与输出区间：

```json
[
  {
    "sourceStart": 10.1,
    "sourceEnd": 19.2,
    "outputStart": 0,
    "outputEnd": 9.1
  },
  {
    "sourceStart": 96.8,
    "sourceEnd": 107.7,
    "outputStart": 9.1,
    "outputEnd": 20
  }
]
```

产物：[editor-export.mp4](../../../reports/sync001006-staging-20261116/SYNC-002/round-1-product.mp4), `file_cloud_qggnbfbqfeqhid4joqggukdtzm`，20.0秒。
SHA-256：`ff7be9436350d963a6866d1506bbea5c30e123df02d4b63ccaeb9fa6a8088a55`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "durationMatches": true}`。

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-002/round-1-before.png)

[round-1-before-render-confirm.png](../../../reports/sync001006-staging-20261116/SYNC-002/round-1-before-render-confirm.png)

[round-1-completed.png](../../../reports/sync001006-staging-20261116/SYNC-002/round-1-completed.png)

[round-1-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-002/round-1-lineage-comparison.json)

### R2：done

run：`run_v2_00d46c0cebea4da8b235e20917509b0d`；提交时间：`2026-11-16T11:41:47.541Z`。

完整已发送提示词：

```text
请只处理刚才的20秒竖屏高光视频“editor-export.mp4”（文件ID：file_cloud_qggnbfbqfeqhid4joqggukdtzm），将其实际保留的中文讲话翻译成英语配音，并添加与英语配音逐句对应的英文字幕，烧录到视频。使用默认英语声音，以英语配音替换原中文人声；保持该高光视频的画面、顺序、竖屏比例和时间线长度，不再次剪辑，不丢掉末句，不加音乐。英文字幕须完整显示在画面内。交付一个同时包含英语配音及英文字幕的MP4；如支持，另附对应成片时间线的SRT。
```

产物：[subtitled-video.mp4](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-product.mp4), `file_cloud_3aioekad7ncoraokcqpkt2altc`，20.0秒。
SHA-256：`986de75d82bb41ccbb031e63159797796d9a88dd3143d3c6c256a80a19ab33f0`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "p1HashUnchanged": true, "durationMatches": true, "preservesInputDuration": true}`。

[round-2-before.png](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-before.png)

[round-2-completed.png](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-completed.png)

[round-2-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-subtitle-review.json)

[round-2-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-lineage-comparison.json)

![SYNC-002 R2 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-002/round-2-cue-frames-1.png)

复核记录：

```json
{
  "result": "Needs Review",
  "r1VisualReview": "20秒、544x960，两段均为原竖屏人物口播，无新增字幕。",
  "r1AuxiliaryAsr": "P1识别为完整产品定位及机械臂功能内容；服务回复的“结束前切出”表述异常，但尚无充分证据判为实际残句。",
  "openChecks": [
    "连续逐句听看",
    "产品名R2及源语义校对",
    "首尾和全部拼接点逐音节检查",
    "配音与字幕连续同步及漂移判断"
  ],
  "completedBusinessRounds": [
    1,
    2
  ],
  "r2VisualReview": "6/6条字幕中心实际成片抽帧均显示对应英文，长句自动换为多行并完整位于竖屏内。",
  "r2AuxiliaryAsr": "独立Whisper识别内容与6条SRT的两组英语产品介绍一致。"
}
```

## SYNC-003

项目：`40c2b35a-273c-45cb-ae17-044fdadefae3`；会话：[e745e866-dc28-4935-9b1b-bf1fd2f36fc9](https://staging-app.cinlink.ai/c/e745e866-dc28-4935-9b1b-bf1fd2f36fc9)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| 双人（英）.mp4 | `file_cloud_i757uuz6ulwlmentmbfymhzc65` | `264d67b80ca1cb15bf95301f7a48aebeba4f0d45117a0225b3144295e576d0b4` |

**Failed：最终SRT改写已有字幕并漏句，与MP4烧录字幕不一致；实际两轮任务均done。** [详情与截图](sync003-srt-mismatch-20261116.md)。

### R1：done

run：`run_v2_610f6439543d4b03bc0dfeb8cf783d99`；提交时间：`2026-11-16T11:45:32.716Z`。

完整已发送提示词：

```text
请只处理完整原始视频“双人（英）.mp4”（文件ID：file_cloud_i757uuz6ulwlmentmbfymhzc65），将其中的英语讲话翻译成普通话配音，并添加与普通话配音逐句对应的简体中文字幕，烧录到视频。使用默认普通话声音，不要求克隆说话人音色；用普通话配音替换原英语人声，保持原视频完整时长、镜头顺序、画面和比例，不剪辑、不加音乐。交付一个同时包含普通话配音及新字幕的MP4；如支持，另附对应成片时间线的SRT。
```

产物：[dubbed-video.mp4](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-product.mp4), `file_cloud_gk7atg2mtmoagizqigwqlz4izi`，193.32秒。
SHA-256：`514b615c8021d57001483810fdb44332f44286ac71fa0f1356ac62b9ea312a82`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "durationMatches": true}`。

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-before.png)

[round-1-completed.png](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-completed.png)

[round-1-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-subtitle-review.json)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-1.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-2.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-3.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-4.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-5.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-6.png)

![SYNC-003 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-1-cue-frames-7.png)

### R2：done

run：`run_v2_441b8c38ad014f32acf3aa46bdda9b21`；提交时间：`2026-11-16T12:06:31.605Z`。

完整已发送提示词：

```text
请只处理已经包含普通话配音和中文字幕的视频“dubbed-video.mp4”（文件ID：file_cloud_gk7atg2mtmoagizqigwqlz4izi），从其中有完整普通话讲话的内容剪成30秒高光，最多4个片段。必须将所选画面、已有普通话配音和对应的中文字幕一起裁切并按新顺序拼接，保留完整句子；保持画面比例，不重新翻译、不重新配音、不使用原始英语视频，不加音乐或转场。交付一个仍包含已有普通话配音及对应中文字幕的MP4；如支持，另附从本成片0点重新计时的SRT。
```

页面已确认源段与输出区间：

```json
[
  {
    "fileId": "file_cloud_gk7atg2mtmoagizqigwqlz4izi",
    "sourceStart": 125.2,
    "sourceEnd": 133.1,
    "outputStart": 0,
    "outputEnd": 7.9
  },
  {
    "fileId": "file_cloud_gk7atg2mtmoagizqigwqlz4izi",
    "sourceStart": 39.1,
    "sourceEnd": 53.7,
    "outputStart": 7.9,
    "outputEnd": 22.5
  },
  {
    "fileId": "file_cloud_gk7atg2mtmoagizqigwqlz4izi",
    "sourceStart": 111.2,
    "sourceEnd": 113.02,
    "outputStart": 22.5,
    "outputEnd": 24.32
  },
  {
    "fileId": "file_cloud_gk7atg2mtmoagizqigwqlz4izi",
    "sourceStart": 186.08,
    "sourceEnd": 191.76,
    "outputStart": 24.32,
    "outputEnd": 30
  }
]
```

产物：[editor-export.mp4](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-product.mp4), `file_cloud_kg5vvztlnuiiyrndv5ym6lwfyu`，30.0秒。
SHA-256：`0c54ee40d560a8a6df23262aba721f4fc4d706b9b777f216e733d620dd54783b`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "p1HashUnchanged": true, "durationMatches": true}`。

[round-2-before.png](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-before.png)

[round-2-before-render-confirm.png](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-before-render-confirm.png)

[round-2-completed.png](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-completed.png)

[round-2-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-subtitle-review.json)

[round-2-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-lineage-comparison.json)

![SYNC-003 R2 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-003/round-2-cue-frames-1.png)

复核记录：

```json
{
  "result": "Failed",
  "downloadIncident": "122175800字节成片整文件读取120s和原生下载事件30s均超时；最后沿同一文件HTTP Range 15块成功保存，总长度和云端SHA一致，未重发业务run。",
  "openChecks": [
    "未进行完整人工听审，不据此宣称所有声音字幕同步均通过；本例已由最终SRT错字漏句确定Failed。"
  ],
  "r1VisualReview": "79条SRT已逐条查看中心抽帧；第51条中心落到下一帧，另查120.52/120.56/120.60/120.64/120.68/120.72六帧，确认“什么？”仅在120.60秒这一帧出现。其余78条中心抽帧显示对应中文字幕。",
  "observedRisk": "第51条“什么？”120.600–120.620仅20ms，25fps视频只闪现一帧；第79条“嗯——”193.220–193.300。可读性、原话真实性及声音同步保留复核，不设新的统一毫秒阈值。",
  "r2ObservedSubtitleRisk": "查看当前导出步骤（单击UI步骤“渲染视频”展开并打开编辑区，未手工导出/重生成）发现：原P1字幕“一个有望建成的三维”在R2可导出轨显示“一个勇往直前的三维隧”；P1“就在洛杉矶地下”对应区间在新轨缺失。等待实际SRT与MP4下载核对后确定结论。",
  "confirmedR2Finding": {
    "observedArtifact": "round-2-step-artifacts/exported.srt",
    "fileId": "file_cloud_lkjkfqoa3rxhfiw66hp7py4rde",
    "sha256": "e28cba38e945f12ecdfdcb8076e0f0614ff84305149e61c88817619f2a9d2119",
    "expectedP1Text": "一个有望建成的三维",
    "actualExportedText": "一个勇往直前的三维隧",
    "actualCueTime": "14.939–17.079",
    "missingP1Text": "就在洛杉矶地下。",
    "expectedMappedTime": "10.940–11.400",
    "basis": "要求复用已有中文字幕且与烧录成片一致；最终SRT和最终MP4已分别下载，11.15s与16.0s实际帧确认漏句及错字。"
  },
  "completedBusinessRounds": [
    1,
    2
  ],
  "r2ConfirmedFailure": "最终MP4在11.15s仍显示“就在洛杉矶地下。”，在16.0s仍显示“一个有望建成的三维”；最终editor-export.srt缺前句并将后句写成“一个勇往直前的三维隧”。违反已有字幕文字保留及SRT与烧录字幕一致要求。",
  "r2MediaComparison": "30.000秒/1920x1080，完整解码，P1哈希不变；四段声音与P1对应区间相关系数0.9984～0.9996，抽样底部字幕画面差异低，支持已有声音/烧录字幕随剪辑保留。该项不替代完整听审。"
}
```

## SYNC-004

项目：`d3978d52-df4a-4ce3-afcf-7e1dff05b6b6`；会话：[153d0cb6-31cc-4142-a335-e1fca67b9dcf](https://staging-app.cinlink.ai/c/153d0cb6-31cc-4142-a335-e1fca67b9dcf)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| 日文.mp4 | `file_cloud_dgknoun7uqqsjs3jufbsopr63u` | `cddcc37a4e092a49774759e51acc013297410fd2e2f261ce59e9efd068857c41` |

**Failed：最终MP4在保留P1已有烧录中文字幕的同时又叠加一层中文，新层多出“呃”并遮挡原新闻标识。** [详情与截图](sync004-duplicate-chinese-20261116.md)。

### R1：done

run：`run_v2_bfe7403611c24d1c900f3a0f2422dfb7`；提交时间：`2026-11-16T12:23:56.725Z`。

完整已发送提示词：

```text
请只处理完整原始视频“日文.mp4”（文件ID：file_cloud_dgknoun7uqqsjs3jufbsopr63u），将实际日语讲话翻译成普通话配音，使用默认普通话声音替换日语人声，同时添加与普通话配音逐句对应的简体中文字幕并烧录到视频。保持完整视频时长、镜头、竖屏比例和原画面文字，不剪辑、不抹除原有日文画面字幕、不加音乐。新增中文字幕请放在画面内的可读位置，尽量避免覆盖原有文字。交付一个同时包含普通话配音及新增中文字幕的MP4；如支持，另附对应成片时间线的SRT。
```

产物：[subtitled-video.mp4](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-product.mp4), `file_cloud_lhw2g73rt42rdlpzqp77zertlt`，53.96秒。
SHA-256：`1b970466d5f31734a5c7cffab9906e90270ce510f86c058daa41d02f28342f6c`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "durationMatches": true}`。

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-before.png)

[round-1-completed.png](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-completed.png)

[round-1-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-subtitle-review.json)

![SYNC-004 R1 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-004/round-1-cue-frames-1.png)

### R2：done

run：`run_v2_32070335f0f343f696d151697954e514`；提交时间：`2026-11-16T12:29:10.036Z`。

完整已发送提示词：

```text
请只处理已经包含普通话配音和新增中文字幕的视频“subtitled-video.mp4”（文件ID：file_cloud_lhw2g73rt42rdlpzqp77zertlt），从有完整讲话的内容剪成20秒高光，最多3个片段。所选画面、已有普通话配音和新增中文字幕必须一起裁切和重排，保持完整句子及竖屏比例；不重新翻译、不重新配音、不使用原始日语视频，不抹除原画面日文文字，不加音乐或转场。交付一个MP4，保留已有普通话配音及其对应的新增中文字幕；如支持，另附从本成片0点重新计时的SRT。
```

页面已确认源段与输出区间：

```json
[
  {
    "fileId": "file_cloud_lhw2g73rt42rdlpzqp77zertlt",
    "sourceStart": 24,
    "sourceEnd": 29.92,
    "outputStart": 0,
    "outputEnd": 5.92
  },
  {
    "fileId": "file_cloud_lhw2g73rt42rdlpzqp77zertlt",
    "sourceStart": 12.92,
    "sourceEnd": 21.96,
    "outputStart": 5.92,
    "outputEnd": 14.96
  },
  {
    "fileId": "file_cloud_lhw2g73rt42rdlpzqp77zertlt",
    "sourceStart": 29.92,
    "sourceEnd": 34.96,
    "outputStart": 14.96,
    "outputEnd": 20
  }
]
```

产物：[editor-export.mp4](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-product.mp4), `file_cloud_lkxnp5ez2i7yf6kia6wrclescs`，20.0秒。
SHA-256：`feafe0172731383edd30b445b2c44d35d8093be05c6bd58b592b321880ceac11`；归档时重新读取一致：`True`。
媒体检查：`{"fullDecode": true, "sha256Matches": true, "hasAudio": true, "aspectRatioMatches": true, "p1HashUnchanged": true, "durationMatches": true}`。

[round-2-before.png](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-before.png)

[round-2-before-render-confirm.png](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-before-render-confirm.png)

[round-2-completed.png](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-completed.png)

[round-2-subtitle-review.json](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-subtitle-review.json)

[round-2-lineage-comparison.json](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-lineage-comparison.json)

![SYNC-004 R2 实际成片逐条中心抽帧](../../../reports/sync001006-staging-20261116/SYNC-004/round-2-cue-frames-1.png)

复核记录：

```json
{
  "result": "Failed",
  "r1VisualReview": "10/10条中文字幕中心抽帧均位于底部蓝色区域，原中部日文字幕及顶部日文标题保留，没有把原日文文字计为新增中文重复。",
  "r1MediaReview": "53.96秒/640x1138，完整解码、SHA及画面比例通过；源54.009615秒，差值约-0.050秒。",
  "sourceLanguageSupport": "实际日语转写→翻译→普通话合成和烧录链路done，未出现不支持源语种提示；目标语义及完整听审仍待复核。",
  "openChecks": [
    "完整人工听审仍待补；重复新增中文字幕由最终成片直接确认，整例Failed。"
  ],
  "completedBusinessRounds": [
    1,
    2
  ],
  "r2ConfirmedFailure": "最终20秒MP4中原P1底部的已有中文字幕仍在，又在中部新闻标识区域叠加一层带背景及高亮的新中文字幕；5/5字幕中心抽帧均见两层中文。首条新层为“呃我觉得自己在各种场合都会容易紧张”，原P1底部为“我觉得自己在各种场合都会容易紧张。”，SRT也新增“呃”。原日文字幕/标题不计重复。",
  "r2PositiveEvidence": "20.000秒/640x1138，完整解码，P1哈希不变；三段对应P1音轨波形相关系数0.9990～0.9993，支持已有声音随剪辑保留。"
}
```

## SYNC-005

项目：`09c27f69-a2ee-4408-97a7-b8450bba0607`；会话：[df7bdeb0-bc3f-454c-8940-937e0e902223](https://staging-app.cinlink.ai/c/df7bdeb0-bc3f-454c-8940-937e0e902223)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| SYNC-005-controlled.mp4 | `file_cloud_rkwmbxy4tcknzt2vqk23gpbxln` | `5abf98b044549123eef52cd0fc607921586068981ab0b73ad89e72b2cc6289c3` |

**Failed：R1编辑工具参数校验失败，缺少operation_id/task_id，没有P1。** [详情与截图](sync005-cleanup-schema-failure-20261116.md)。

### R1：failed

run：`run_v2_6195584f56d24dfbae911ff609ed924d`；提交时间：`2026-11-16T12:35:24.003Z`。

完整已发送提示词：

```text
请只处理视频“SYNC-005-controlled.mp4”（文件ID：file_cloud_rkwmbxy4tcknzt2vqk23gpbxln），删除讲话中仅作口癖的“嗯”“啊”“呃”，并同步删除对应的视频时间；保留所有非口癖句子及原有先后顺序，不额外压缩停顿、不加字幕、不配音、不加音乐或转场。保持画面比例，交付一个清理后的MP4，并说明实际删除的位置。
```

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-005/round-1-before.png)

**R2未提交，依赖阻塞：第一轮failed，未交付可用清理后MP4/P1，按用例要求不替换原片进入第二轮。**

## SYNC-006

项目：`2cd8ff65-bd38-4c1b-94ef-9be68164df80`；会话：[21bf040f-47c2-43cc-9594-8cd848c81ce6](https://staging-app.cinlink.ai/c/21bf040f-47c2-43cc-9594-8cd848c81ce6)。

| 原始文件 | 云端ID | SHA-256 |
|---|---|---|
| 9s.mp4 | `file_cloud_mwe3qjluv6ld2dwrtkg2dr2zsf` | `897b9ef16ac9fd2c255067478f179143f1d998b4e962f391e9ede635a4bfe022` |
| x.mp4 | `file_cloud_yqa6bpdhkh6gts5c5hsxaql34j` | `a0c47d8a7cf9b01bd611046ef471e0b41e1b84ed1248cacab4321f54305a7f89` |

**Blocked：服务确认A在9.42秒处讲话中断，无法满足A/B均贡献完整英语讲话的前置，本轮terminated且没有P1。** [详情与截图](sync006-source-a-incomplete-20261116.md)。

### R1：terminated

run：`run_v2_2be1a046fcce42f2a761cef98bc046c9`；提交时间：`2026-11-16T12:39:08.534Z`。

完整已发送提示词：

```text
请将视频A“9s.mp4”（文件ID：file_cloud_mwe3qjluv6ld2dwrtkg2dr2zsf）和视频B“x.mp4”（文件ID：file_cloud_yqa6bpdhkh6gts5c5hsxaql34j）混剪成18秒视频，最多使用4个高光片段。A和B都必须贡献有完整英语讲话的实质片段；B请选择画面切换到女性讲话后的内容，避免只取与A相似的开头男声画面。优先保证句子完整，保留各片段原声和16:9画面比例，不加字幕、不配音、不加音乐或转场。交付一个MP4，并说明每段来自哪个源文件及实际源起止时间。
```

[round-1-before.png](../../../reports/sync001006-staging-20261116/SYNC-006/round-1-before.png)

**R2未提交，依赖阻塞：没有通过第一轮取得混剪P1，第二轮未提交，未更换固定素材或重发原请求。**

## 自动化与证据

入口：`tools/sync/run.mjs`，按原文两轮提示词替换实际ID发送；检查点禁止重复提交，保留原run回读；截图、运行JSON、下载文件、SRT、逐词ASR及媒体检查见本轮reports目录。`tools/sync/check-media.py`只验证媒体前置，不赋予整例Passed。

[完整检查点](../../../reports/sync001006-staging-20261116/execution.json) · [素材/夹具核验](../../../reports/sync001006-staging-20261116/media-manifest.json) · [云效用例映射](../../../reports/sync001006-staging-20261116/yunxiao-case-mapping.json)

[六个会话终态回读](../../../reports/sync001006-staging-20261116/terminal-readback.json) · [云效六条定义最终回读](../../../reports/sync001006-staging-20261116/yunxiao-final-definition-verification.json)。8份MP4最终解码/哈希/时长/比例检查通过，4份P1在R2后哈希保持。

本批Ego Lite TaskSpace9已正常结束一次，未保留页面；本地证据和云端测试项目/会话保留。
