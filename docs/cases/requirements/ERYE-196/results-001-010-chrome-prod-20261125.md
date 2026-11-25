<!-- ERYE196-010-CLOUD-SYNC-20261125 -->
2026-11-25：ERYE196-010“已选视频片段按自然语言分割时定位失败，未引导澄清”已提交云效[FWXC-768](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=3b9e443447949f49a9b452a9a3)。3张原图及1份脱敏审计附件已上传，正文嵌图/附件回读核验通过。首次失败与补充定位后分割、成片验证成功分别记录；010整体Failed及脚本PLAN保持。未重发编辑或导出任务，未提交Git。
<!-- /ERYE196-010-CLOUD-SYNC-20261125 -->

<!-- ERYE196-008-CLOUD-SYNC-20261125 -->
2026-11-25：ERYE196-008“跨工程编辑完成后结果卡缺少目标定位入口”已提交云效[FWXC-767](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b62eed2930df8ed174cbd57362)。2张对应原图及1份脱敏审计附件已上传，正文嵌图/附件回读核验通过。工程隔离通过，008整体Failed及固定脚本PLAN保持；未重发业务任务，未提交Git。
<!-- /ERYE196-008-CLOUD-SYNC-20261125 -->

# ERYE196-001～010 Chrome生产执行记录（2026-11-25）

本轮执行当前设计，包含005/B、005/C及006/B新增参数组。固定脚本仍为PLAN，使用Chrome有头CUA进行实际操作；结果不写入用例正文。历史报告及结论保留，本报告只记录本轮观察。

本轮结论：7条通过、3条失败（004、008、010），无剩余执行阻塞。009通过范围仅为实际GET的无效工程ID保护，未测写请求及会话/任务错配。010补充定位后分割与成片验证正确，但不覆盖首次指令失败。

## 环境与前置

- 环境：https://app.cinlink.ai/；Chrome连接3，本轮专用标签765053821；初始页面账号显示yabin chen，后续页面曾显示yabinc18；未核邮箱身份，本轮未做跨账号权限测试。
- 项目：ERYE196-001-010-生产回归-20261125；项目标识d03402b4-8dc5-4da1-ad5d-27f28342efd8。
- 主会话：https://app.cinlink.ai/c/7438a430-91a2-4219-a100-e6e7d85d7a65 。
- 视频源：ERYE196-A20-30fps-marked.mp4，实际1280×720、20秒、30fps、600帧，含原声；规格来自独立本地MP4头解析，非产品返回。未冒称1920×1080。
- 字幕金标：独立源E196-49-source.srt及caption-gold-49.json，共49条；同文/通道组另用专用两条字幕文件。素材清单与SHA256存于本轮证据目录source-manifest.json。
- 用户确认：视频和图片均需处理任务返回产物后才创建工程；上传、登记、素材预览不能代替工程创建。已有可编辑工程不需每例重复处理。
- 前置登记任务23秒完成，无处理产物；直接初始化/导入字幕请求106秒结束为“未完成，跳过执行失败的节点”，字幕虽已导入，未据此宣称前置通过。
- 后续英语识别请求70秒完成，返回subtitle.srt产物。实际打开的时间线仅字幕、末尾19.82秒，没有视频或原声轨，因此又提交补齐主视频0～20秒、原声及独立49条金标字幕的准备请求。该请求只属前置，不计001～010测试执行。
- 历史工程c247b9a9地址返回404，仅作为前置记录，不计正式用例失败；未修改原工程及其他会话。

## 本轮逐条记录

本轮逐条结论、实际覆盖及证据在下方动态登记；完成一条即同步独立状态。未完成的组单列，不将旧Passed当成本轮通过。

## 证据与恢复

证据目录：`reports/erye196-001-010-chrome-prod-20261125/`；恢复点：`checkpoint.json`。全部原始DOM、截图及源文件仅作本机证据，不自动提交Git或云效。

本轮未接入固定脚本；CUA操作和临时审计不代表固定自动化实现。未执行159～165及其他未请求用例。

<!-- CASE-RESULTS -->
本轮已完成10/10；当前批次{"Passed": 7, "Failed": 3}。历史表格保持原文，当前结论以下表及JSON为准。

| 用例 | 本轮状态 | 固定脚本 | 覆盖/说明 |
|---|---|---|---|
| ERYE196-001 | Passed | PLAN / — | 可观察页面上下文和视图；内部版本未暴露不作断言 |
| ERYE196-002 | Passed | PLAN / — | 字符数60；刷新前后各16个重叠窗口完整读取49条，顺序/原文/时间逐条匹配独立SRT，恢复列表开头，视频原声及可观察历史保持。 |
| ERYE196-003 | Passed | PLAN / — | B将law.（7.42～7.68秒）保存为新版C2；A初次仍旧文，继续遍历期间无需刷新即更新。刷新后49条仅目标变化，B撤销后A刷新49条恢复独立金标。 |
| ERYE196-004 | Failed | PLAN / — | 视频、49条原文字幕和独立BGM齐备；检查片段/字幕/BGM选择、上下文菜单及选择工具后，未见对象或4～6秒范围引用到Agent及逐项移除入口；输入框仍为空，不能完成需求§03引用流程。 |
| ERYE196-005 | Passed | PLAN / — | A唯一原文、B同文不同时间、C同时间同文原译文隔离三组均通过；每组目标及刷新结果已核对，非目标字幕与音视频区间保持。 |
| ERYE196-006 | Passed | PLAN / — | A/B两组均先澄清、回答前不改字幕；明确时间及原文通道后仅修改目标，刷新结果及译文保护一致。 |
| ERYE196-007 | Passed | PLAN / — | T2删除4～6秒的欢迎使用 CinLink并重开确认；T1用旧时间和原文修改时明确提示目标已删除或变化，Second caption未误改。刷新后重新指定10～12秒Second caption，仅改为引用修复测试，保存重开保持。 |
| ERYE196-008 | Failed | PLAN / — | 同页运行中A→B切换成立；仅A4～6秒原文变为A目标固定，B内容保持且终态仍显示B。结果卡仅标工程A并显示编辑字幕步骤占位说明，没有目标定位入口，整例未通过。 |
| ERYE196-009 | Passed | PLAN / — | 仅覆盖实际工程GET的无效ID分支：Network合法A读取200及响应身份已核；沿实际资源URL将工程ID替换为无效UUID，浏览器GET返回NOT_FOUND / Project was not found。随后页面核对A、B保存内容均保持，没有回退到其他工程。 |
| ERYE196-010 | Failed | PLAN / — | 选中唯一视频后，首次“当前片段内部第5秒”指令返回轨道/片段定位参数无效，未完成分割，按首次执行记失败。补充工程、轨道、片段和绝对时间后46秒完成；补充验证中两段0–5/5–20、总长20秒，实际导出600帧，切点画面及原声+BGM对应，字幕保持。补充成功不覆盖首次失败。 |

| 新参数组 | 本轮状态 |
|---|---|
| ERYE196-005/B | Passed |
| ERYE196-005/C | Passed |
| ERYE196-006/B | Passed |

### ERYE196-001 — Passed

可观察页面上下文和视图；内部版本未暴露不作断言

```json
{
  "case": "ERYE196-001",
  "status": "Passed",
  "scope": "可观察页面上下文和视图；内部版本未暴露不作断言",
  "cue_count": 49,
  "gold_match": true,
  "video_original_audio": "00:00.00–00:20.00",
  "history_before": [
    "- button \"撤销\"",
    "- button \"重做\" [disabled]"
  ],
  "history_after": [
    "- button \"撤销\"",
    "- button \"重做\" [disabled]"
  ],
  "view_changes": "playhead0→20→0;zoom1→1.5→1;media→captions→media",
  "observation": "只读任务35秒完成，工具读取视图/工程/字幕轨；未显示最终文字摘要，未据此断言内部上下文字段"
}
```

### ERYE196-002 — Passed

字符数60；刷新前后各16个重叠窗口完整读取49条，顺序/原文/时间逐条匹配独立SRT，恢复列表开头，视频原声及可观察历史保持。

```json
{
  "case": "ERYE196-002",
  "status": "Passed",
  "summary": "字符数60；刷新前后各16个重叠窗口完整读取49条，顺序/原文/时间逐条匹配独立SRT，恢复列表开头，视频原声及可观察历史保持。",
  "before_count": 49,
  "after_count": 49,
  "before_gold_match": true,
  "after_gold_match": true,
  "history_before": [
    "- button \"撤销\"",
    "- button \"重做\" [disabled]"
  ],
  "history_after": [
    "- button \"撤销\"",
    "- button \"重做\" [disabled]"
  ],
  "first": {
    "text": "Efforts",
    "start": "00:00.16",
    "end": "00:00.50"
  },
  "middle": {
    "text": "of",
    "start": "00:10.20",
    "end": "00:10.28"
  },
  "last": {
    "text": "affects e-",
    "start": "00:19.48",
    "end": "00:19.82"
  },
  "automation": "PLAN / —"
}
```

### ERYE196-003 — Passed

B将law.（7.42～7.68秒）保存为新版C2；A初次仍旧文，继续遍历期间无需刷新即更新。刷新后49条仅目标变化，B撤销后A刷新49条恢复独立金标。

```json
{
  "case": "ERYE196-003",
  "status": "Passed",
  "summary": "B将law.（7.42～7.68秒）保存为新版C2；A初次仍旧文，继续遍历期间无需刷新即更新。刷新后49条仅目标变化，B撤销后A刷新49条恢复独立金标。",
  "target": {
    "start": "00:07.42",
    "end": "00:07.68",
    "before": "law.",
    "after": "新版C2"
  },
  "A_updated_without_reload": true,
  "refreshed_list_count": 49,
  "only_target_changed": true,
  "restored_gold_match": true,
  "other_tracks": "video0–20,originalAudio0–20 unchanged",
  "automation": "PLAN / —"
}
```

### ERYE196-004 — Failed

视频、49条原文字幕和独立BGM齐备；检查片段/字幕/BGM选择、上下文菜单及选择工具后，未见对象或4～6秒范围引用到Agent及逐项移除入口；输入框仍为空，不能完成需求§03引用流程。

```json
{
  "case": "ERYE196-004",
  "status": "Failed",
  "summary": "视频、49条原文字幕和独立BGM齐备；检查片段/字幕/BGM选择、上下文菜单及选择工具后，未见对象或4～6秒范围引用到Agent及逐项移除入口；输入框仍为空，不能完成需求§03引用流程。",
  "prepared": {
    "video": "0–20秒",
    "caption": "strike4.64–4.94秒",
    "bgm": "E196-BGM20.wav0–20秒100%"
  },
  "observed": "对象选择未在Agent输入框形成名称/时间引用；视频右键为浏览器菜单；选择工具未展示范围引用方式",
  "not_executed": [
    "实际4～6秒范围引用",
    "同时加入四项引用",
    "只移除BGM引用",
    "依赖引用的正式改文请求",
    "依赖改文的保存刷新"
  ],
  "automation": "PLAN / —"
}
```

### ERYE196-005 — Passed

A唯一原文、B同文不同时间、C同时间同文原译文隔离三组均通过；每组目标及刷新结果已核对，非目标字幕与音视频区间保持。

```json
{
  "case": "ERYE196-005",
  "status": "Passed",
  "summary": "A唯一原文、B同文不同时间、C同时间同文原译文隔离三组均通过；每组目标及刷新结果已核对，非目标字幕与音视频区间保持。",
  "groups": [
    {
      "group": "A",
      "status": "Passed",
      "target": "Efforts0.16–0.50→欢迎使用 CinLink",
      "count": 49,
      "only_target_changed": true,
      "preview_verified": true,
      "reload_target_verified": true,
      "notes": "无译文基线；视频/原声/BGM区间保持，未额外导出或做全片独立听审"
    },
    {
      "group": "B",
      "status": "Passed",
      "actual": [
        {
          "text": "Welcome",
          "start": "00:04.00",
          "end": "00:06.00"
        },
        {
          "text": "欢迎使用 CinLink",
          "start": "00:10.00",
          "end": "00:12.00"
        }
      ],
      "only_target_changed": true,
      "reload_target_verified": true,
      "other_tracks_unchanged": true
    },
    {
      "group": "C",
      "status": "Passed",
      "summary": "原文主列4～6秒改为欢迎使用 CinLink，同时间译文副列及译文时间轴仍Welcome；10～12秒两列保持，刷新一致。",
      "actual_after": [
        {
          "columns": [
            {
              "column": "primary",
              "file": "file_cloud_x4jvkqtdl2bskhygdhtj2z6ssl",
              "text": "欢迎使用 CinLink"
            },
            {
              "column": "secondary",
              "file": "file_cloud_astdjv4d44fam3rdnlzjepf7yn",
              "text": "Welcome"
            }
          ],
          "time": "00:04.00 – 00:06.00"
        },
        {
          "columns": [
            {
              "column": "primary",
              "file": "file_cloud_x4jvkqtdl2bskhygdhtj2z6ssl",
              "text": "Welcome"
            },
            {
              "column": "secondary",
              "file": "file_cloud_astdjv4d44fam3rdnlzjepf7yn",
              "text": "Welcome"
            }
          ],
          "time": "00:10.00 – 00:12.00"
        }
      ],
      "actual_after_reload": [
        {
          "columns": [
            {
              "column": "primary",
              "file": "file_cloud_x4jvkqtdl2bskhygdhtj2z6ssl",
              "text": "欢迎使用 CinLink"
            },
            {
              "column": "secondary",
              "file": "file_cloud_astdjv4d44fam3rdnlzjepf7yn",
              "text": "Welcome"
            }
          ],
          "time": "00:04.00 – 00:06.00"
        },
        {
          "columns": [
            {
              "column": "primary",
              "file": "file_cloud_x4jvkqtdl2bskhygdhtj2z6ssl",
              "text": "Welcome"
            },
            {
              "column": "secondary",
              "file": "file_cloud_astdjv4d44fam3rdnlzjepf7yn",
              "text": "Welcome"
            }
          ],
          "time": "00:10.00 – 00:12.00"
        }
      ],
      "translation_timeline_after_reload": [
        "      - button \"译文字幕 Welcome 00:04.00–00:06.00\" [pressed]:",
        "      - button \"译文字幕 Welcome 00:10.00–00:12.00\":"
      ],
      "preparation_notes": "SRT译文准备报无有效条目；独立VTT导入后已保存双通道。进入编辑器节点报页面提示，但只有一个测试标签；未重发，重开核验了实际双通道。",
      "interpretation": "基线先导入原文SRT，再增加译文VTT；按原文主列、译文副列及明确标记的译文时间轴分别对照。"
    }
  ],
  "automation": "PLAN / —"
}
```

### ERYE196-006 — Passed

A/B两组均先澄清、回答前不改字幕；明确时间及原文通道后仅修改目标，刷新结果及译文保护一致。

```json
{
  "case": "ERYE196-006",
  "status": "Passed",
  "summary": "A/B两组均先澄清、回答前不改字幕；明确时间及原文通道后仅修改目标，刷新结果及译文保护一致。",
  "groups": [
    {
      "group": "A",
      "status": "Passed",
      "clarification": "请指出目标字幕的原文或时间；列出Welcome4～6、Second caption10～12",
      "before_answer": {
        "source_cues": [
          "      - button \"原文字幕 Welcome 00:04.00–00:06.00\":",
          "      - button \"原文字幕 Second caption 00:10.00–00:12.00\":"
        ],
        "history": [
          "- button \"撤销\"",
          "- button \"重做\" [disabled]"
        ]
      },
      "answer": "只修改原文通道4～6秒的Welcome，改为欢迎使用 CinLink；10～12秒Second caption及其他内容不变。",
      "actual_source_cues": [
        "      - button \"原文字幕 欢迎使用 CinLink 00:04.00–00:06.00\":",
        "      - button \"原文字幕 Second caption 00:10.00–00:12.00\":"
      ],
      "reload_verified": true,
      "baseline_tracks": "前置形成两条重叠同源视频及两条原声，均0–20秒；按实际基线记录且本例未修改这些轨道",
      "preparation": "独立会话112e843a，131秒前置部分完成但产物和所需两条字幕均实际存在；A原工程重开确认独立。"
    },
    {
      "group": "B",
      "status": "Passed",
      "clarification": "请指定要修改的原文字幕，可提供时间范围或其他足以唯一定位的信息。",
      "before_answer": [
        {
          "texts": [
            "Welcome",
            "Welcome"
          ],
          "time": "00:04.00 – 00:06.00"
        },
        {
          "texts": [
            "Welcome",
            "Welcome"
          ],
          "time": "00:10.00 – 00:12.00"
        }
      ],
      "answer": "只修改原文通道10～12秒的Welcome，改为欢迎使用 CinLink；4～6秒原文及所有译文不变",
      "actual_reloaded": [
        {
          "texts": [
            "Welcome",
            "Welcome"
          ],
          "time": "00:04.00 – 00:06.00"
        },
        {
          "texts": [
            "欢迎使用 CinLink",
            "Welcome"
          ],
          "time": "00:10.00 – 00:12.00"
        }
      ],
      "non_target": "视频/原声/BGM0–20秒区间保持，译文时间轴两条仍Welcome",
      "preparation": "使用已有A双通道恢复原稿；Escape清除对象选择；只读指令明确不沿用前例目标后发送正式模糊请求。"
    }
  ],
  "automation": "PLAN / —"
}
```

### ERYE196-007 — Passed

T2删除4～6秒的欢迎使用 CinLink并重开确认；T1用旧时间和原文修改时明确提示目标已删除或变化，Second caption未误改。刷新后重新指定10～12秒Second caption，仅改为引用修复测试，保存重开保持。

```json
{
  "case": "ERYE196-007",
  "status": "Passed",
  "summary": "T2删除4～6秒的欢迎使用 CinLink并重开确认；T1用旧时间和原文修改时明确提示目标已删除或变化，Second caption未误改。刷新后重新指定10～12秒Second caption，仅改为引用修复测试，保存重开保持。",
  "deleted_target": {
    "text": "欢迎使用 CinLink",
    "start": 4,
    "end": 6
  },
  "invalid_request": "只把起止时间为4～6秒、原文为欢迎使用 CinLink的字幕改为引用失效测试，不修改其他字幕",
  "invalid_response": "目标字幕已删除或已发生变化，请重新选择字幕后再修改。",
  "repair_request": "只把起止时间为10～12秒、原文为Second caption的字幕改为引用修复测试，其他内容不变",
  "final_cues": [
    "      - button \"原文字幕 引用修复测试 00:10.00–00:12.00\":"
  ],
  "track_counts": {
    "video": 2,
    "original_audio": 2
  },
  "tabs": "T2删除保存重开后关闭，T1继续旧目标请求；未重试失败卡片。",
  "automation": "PLAN / —"
}
```

### ERYE196-008 — Failed

同页运行中A→B切换成立；仅A4～6秒原文变为A目标固定，B内容保持且终态仍显示B。结果卡仅标工程A并显示编辑字幕步骤占位说明，没有目标定位入口，整例未通过。

```json
{
  "case": "ERYE196-008",
  "status": "Failed",
  "summary": "同页运行中A→B切换成立；仅A4～6秒原文变为A目标固定，B内容保持且终态仍显示B。结果卡仅标工程A并显示编辑字幕步骤占位说明，没有目标定位入口，整例未通过。",
  "A": "ERYE196-A20-30fps-marked.mp4,20秒,两条原文+两条译文+独立BGM",
  "B": "ERYE196-B10-30fps-blue.mp4,10秒蓝色受控源；同会话处理返回MP4后创建工程",
  "prompt": "只把工程A这条字幕原文改为A目标固定。工程A指当前打开的ERYE196-A20-30fps-marked.mp4，目标为4～6秒原文Welcome，其他内容不变。",
  "switch_while_running": true,
  "B_remained_visible_at_terminal": true,
  "A_actual": [
    {
      "texts": [
        "A目标固定",
        "Welcome"
      ],
      "time": "00:04.00 – 00:06.00"
    },
    {
      "texts": [
        "欢迎使用 CinLink",
        "Welcome"
      ],
      "time": "00:10.00 – 00:12.00"
    }
  ],
  "A_reload_verified": true,
  "B_content_equal_at_terminal": true,
  "B_clips_after": [
    "      - button \"视频 视频 00:00.00–00:10.00\":",
    "      - button \"原声 音频 00:00.00–00:10.00\":"
  ],
  "card_title": "修改工程 A 的指定原文字幕",
  "card_expanded": "修改工程 A 的指定原文字幕\n编辑字幕\n\n编辑字幕完成后将自动开始下一步。\n\n已完成总耗时 28s",
  "missing": "结果卡目标定位入口；展开仅为步骤占位说明，未跳转或提供定位操作",
  "validation_navigation": "终态B现场先保存，随后人工切A及刷新核验；再选B时工程列表停留加载、随后关闭，未把刷新后的B另算已核。B比较使用任务结束时的真实B现场。",
  "automation": "PLAN / —"
}
```

### ERYE196-009 — Passed

仅覆盖实际工程GET的无效ID分支：Network合法A读取200及响应身份已核；沿实际资源URL将工程ID替换为无效UUID，浏览器GET返回NOT_FOUND / Project was not found。随后页面核对A、B保存内容均保持，没有回退到其他工程。

```json
{
  "case": "ERYE196-009",
  "status": "Passed",
  "summary": "仅覆盖实际工程GET的无效ID分支：Network合法A读取200及响应身份已核；沿实际资源URL将工程ID替换为无效UUID，浏览器GET返回NOT_FOUND / Project was not found。随后页面核对A、B保存内容均保持，没有回退到其他工程。",
  "scope": "GET读取、无效工程UUID；未覆盖修改请求或会话/任务标识错配，不扩展为权限隔离通过。",
  "actual_route": "https://app.cinlink.ai/cloud-tool-api/v1/editor/projects/{实际观察到的project_id}",
  "A_project_id": "fd6a5475-73e4-4404-b0dc-7cce9886134b",
  "B_project_id": "d9f487a6-dc3e-47d2-9d91-35065ad34bd2",
  "positive_control": "页面Network中实际GET A为200，Response含A名称、A目标固定及欢迎使用 CinLink；直接导航同一A资源URL也显示该工程JSON。",
  "negative_input": "00000000-0000-4000-8000-000000000009",
  "negative_result": {
    "code": "NOT_FOUND",
    "message": "Project was not found."
  },
  "request_method_note": "从Network复制实际GET资源URL后在地址栏改变UUID；这是浏览器导航GET，不是保留原fetch全部请求头的重放。未读取或修改凭据。",
  "B_navigation_observation": "直接导航B资源URL返回UNAUTHENTICATED；不把此响应当作合法对照或产品失败。B内容通过同会话工程选择器实际打开并核对。",
  "after_A": "20秒；视频0–5/5–20，原声/BGM0–20，原文A目标固定4–6及欢迎使用 CinLink10–12，两条译文Welcome保持。",
  "after_B": "10秒；一条视频和一条原声0–10，无字幕；与独立B基线一致。",
  "evidence": [
    "009-positive-response-projection.txt",
    "009-project-list-projection.txt",
    "009-invalid-browser-navigation.txt",
    "009-A-after-native.ax.txt",
    "009-B-after-native.ax.txt",
    "010-final-editor-native.ax.txt"
  ],
  "earlier_attempt": {
    "case": "ERYE196-009",
    "status": "Blocked",
    "summary": "A/B工程前置已具备；在Chrome原生Network被动观察到工程相关真实请求。筛选并准备复制读取请求时，原生控制先后因页面被更改、前台应用变化中断，未取得完整合法请求对照及负向请求；不猜接口或改用伪造URL，不能沿用历史Passed。",
    "observed_urls": [
      "https://app.cinlink.ai/cloud-tool-api/v1/editor/projects/view/exchange",
      "https://app.cinlink.ai/runtime-api/v1/conversations/7438a430-91a2-4219-a100-e6e7d85d7a65?include_messages=false&message_limit=30&include_project_json=true&include_editor_project=true"
    ],
    "observed_status": "Network表显示200，仅被动观察；未将其计为合法工程响应内容核对通过。",
    "blocker": "原生Chrome调试窗口控制中断（前台焦点变化），未能完成请求筛选/资源参数与响应核对及无效目标重放。",
    "not_executed": [
      "合法工程读取响应完整对照",
      "无效工程目标请求",
      "会话/任务标识错配分支",
      "负向执行后的PA/PB内容比较"
    ],
    "requests_mutated_or_replayed": 0,
    "automation": "PLAN / —"
  },
  "automation": "PLAN / —"
}
```

### ERYE196-010 — Failed

选中唯一视频后，首次“当前片段内部第5秒”指令返回轨道/片段定位参数无效，未完成分割，按首次执行记失败。补充工程、轨道、片段和绝对时间后46秒完成；补充验证中两段0–5/5–20、总长20秒，实际导出600帧，切点画面及原声+BGM对应，字幕保持。补充成功不覆盖首次失败。

```json
{
  "case": "ERYE196-010",
  "status": "Failed",
  "summary": "选中唯一视频后，首次“当前片段内部第5秒”指令返回轨道/片段定位参数无效，未完成分割，按首次执行记失败。补充工程、轨道、片段和绝对时间后46秒完成；补充验证中两段0–5/5–20、总长20秒，实际导出600帧，切点画面及原声+BGM对应，字幕保持。补充成功不覆盖首次失败。",
  "initial_prompt": "在当前片段内部第5秒处分割，保留全部内容，不移动任何片段",
  "initial_context": "A工程唯一视频片段0–20秒已选中，原声和独立BGM0–20，两条原文及两条译文已登记。",
  "initial_result": "轨道/片段定位参数无效；序号从1开始，定位条件与动作参数须明确。",
  "followup_prompt": "补充定位：当前工程ERYE196-A20-30fps-marked.mp4，唯一视频轨道中的第1个视频片段，时间线0～20秒、源素材0～20秒、1倍速。只在时间线绝对5秒（片段内部第5秒）处分割，保留全部内容，不移动任何片段。",
  "followup_result": "46秒完成；保存重开后视频0–5及5–20，原声/BGM0–20，字幕内容和时间保持。",
  "diagnostic_branch_status": "Passed（补充定位后的分割及成片验证）",
  "source_mapping": "页面视频源currentTime在4.966666、约5及5.033333秒连续，跨切点播放继续5.4→6.32→7.57秒，无回到源0秒。内部clip ID未从页面获得，不编造。",
  "media_validation": {
    "source_frames": 600,
    "export_frames": 600,
    "boundary_pts": {
      "0": 0.0,
      "149": 4.966667,
      "150": 5.0,
      "151": 5.033333,
      "599": 19.966667
    },
    "frame144_156_best_source_offsets": [
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ],
      [
        0
      ]
    ],
    "audio_correlation_to_same_position_source_plus_bgm": 0.9997401249466639,
    "cut_audio": [
      {
        "second": 4,
        "correlation_to_same_position_source_plus_bgm": 0.9994956320797557
      },
      {
        "second": 5,
        "correlation_to_same_position_source_plus_bgm": 0.9997200434295668
      },
      {
        "second": 6,
        "correlation_to_same_position_source_plus_bgm": 0.9999569050589459
      }
    ],
    "limits": "Lossy encoding can make nearby visually similar frames indistinguishable; pixel MSE and audio correlation are independent supporting evidence, not a newly invented product threshold. Original and exported artifacts are retained."
  },
  "export_note": "一次导出提交，分辨率为多选，默认480P保留又选择720P，因此本批产出两版；只下载720P做审计，没有额外重发导出。",
  "evidence": [
    "010-before.txt",
    "010-media-audit.json",
    "010-boundary-dom-media.json",
    "010-crossplay.json",
    "010-export-completed-native.ax.txt",
    "010-final-editor-native.ax.txt"
  ],
  "automation": "PLAN / —"
}
```
<!-- /CASE-RESULTS -->
