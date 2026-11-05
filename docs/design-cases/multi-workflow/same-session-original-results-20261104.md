# SSO-001～004 无@源视频实测记录

2026-11-04，Asia/Shanghai。执行约16:08～16:28；有头、单worker、零重试。每例单独新建会话，仅挂载一个原片，处理轮均为纯文本，没有@引用标签。

4条、8轮已完成；源视频来源、流程、下载/结构及下述抽样检查通过。0次缺参补槽、3次执行计划确认（SSO-001两次、SSO-004第二轮一次），确认后继续。没有发现产品失败；SSO-005～018未执行。

原片7MB.mp4为英文语音、1280×720、60.495778秒，SHA-256为`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。4例云端回读哈希均与原片一致；UI各挂载一次，云端复用同一F，上传完成请求合计0次，不写成新上传4份文件。F=`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`。

| 用例 | 两轮交付与检查 | 来源/结论 | 首批用例耗时 |
|---|---|---|---|
| SSO-001 | 19.066341秒、29.077秒高光MP4，分别符合20±2和30±2秒 | 两轮输入F；第二轮未消费第一轮19秒成片；历史文件哈希不变 | 291.894秒 |
| SSO-002 | 两轮MP4均60.488005秒、有音轨；首中末帧第一轮右上SSO-OLD，第二轮左上SSO-NEW且无SSO-OLD | 两轮运行时输入F；第一轮原run回读后仅补第二轮；来源/水印抽样通过 | 首批103.496秒；续接94.019秒 |
| SSO-003 | 中文SRT、日文SRT各15条，结构/语言特征/时间范围通过 | 两轮输入F；第二轮未消费第一轮中文SRT，历史文件不变 | 231.763秒 |
| SSO-004 | 英文SRT15条；第二轮高光19.866341秒、有音轨，首中末帧无上一轮新增烧录字幕 | 第二轮输入F，未用上一轮SRT或历史卡片充数 | 331.248秒 |

## 每轮来源证据

来源以工具运行中的输入快照为准，结合云端原片哈希、最终产物检查和上一轮文件排除。不能将工具完成后的同名上下文字段直接等同执行前输入。

| 用例/轮次 | 会话ID | 处理run | 运行中绑定F的工具 | 上一轮产物作为输入 |
|---|---|---|---|---|
| SSO-001/1 | `526c5077-fc76-4100-8485-646bee6cb6ad` | `run_v2_2f77f2c8430e4dfbbf5d992ec3752b7f` | extract_audio、shorten_video、render_highlight_clips | 未发现 |
| SSO-001/2 | `526c5077-fc76-4100-8485-646bee6cb6ad` | `run_v2_b5ae7127581c4cd5a3db5d416c09299f` | extract_audio、shorten_video、render_highlight_clips | 未发现 |
| SSO-002/1 | `d3415fe2-af1f-40c0-9e19-0e806830c4ef` | `run_v2_c4f7172e1bdb40b1ba931170127024b0` | apply_watermark | 未发现 |
| SSO-002/2 | `d3415fe2-af1f-40c0-9e19-0e806830c4ef` | `run_v2_f1350b694b2341e3870b4752900ba4ac` | apply_watermark | 未发现 |
| SSO-003/1 | `e648224a-02af-4591-aa15-7668947eb3db` | `run_v2_4ad86139de144ce18c388db8e6c9b585` | extract_audio、transcribe_audio、translate_subtitle、export_subtitles | 未发现 |
| SSO-003/2 | `e648224a-02af-4591-aa15-7668947eb3db` | `run_v2_7c358d52d0eb4a499904d05c651f20e3` | extract_audio、transcribe_audio、translate_subtitle、export_subtitles | 未发现 |
| SSO-004/1 | `fd494165-b80c-4dff-9783-7b70272e931d` | `run_v2_82bb9a5315d54cbea2cd3506fe84563e` | extract_audio、transcribe_audio、export_subtitles | 未发现 |
| SSO-004/2 | `fd494165-b80c-4dff-9783-7b70272e931d` | `run_v2_a8569fc617844f259cde7ca523d0a7f4` | extract_audio、shorten_video、render_highlight_clips | 未发现 |

脱敏来源证据：[source-evidence.json](../../../reports/sso001-004-plain-source-20261104/source-evidence.json)；[汇总JSON](../../../reports/sso001-004-plain-source-20261104/summary.json)。每轮完整提示词、文件ID、下载路径、哈希和审计保存在对应audit与test-results中；原条目的前置、提示词和预期见[SSO用例](same-session-original-cases.md)。

## SSO-002 首批来源断言误判与续接

首批原始JUnit为**3 passed / 1 failed**：SSO-002第一轮done后，水印工具的input_media_context已被本轮水印输出替换，终态不再含原F。原脚本只读终态字段，因此中止在来源断言，未发第二轮。不能据此认定产品选错素材。

同一原run的执行过程记录证明，apply_watermark处于running时输入为F，转码随后消费本轮中间产物。脚本已增加运行时输入快照，同时核对F和上一轮交付物；没有放宽时长、语言或媒体阈值。续接使用原会话/登记run/第一轮run及真实历史输入证据，只回读第一轮并提交缺失的第二轮。续接JUnit **1 passed**；共8个业务处理run，无重复生成第一轮、无重新上传。原始JUnit、trace和失败PNG不改写。

原始失败截图（脚本来源误判现场，不是产品缺陷截图）：[failure.png](../../../reports/sso001-004-plain-source-20261104/test-results/same-session-original-SSO-002-%E5%8E%9F%E7%89%87%E5%8F%B3%E4%B8%8A%E6%97%A7%E6%B0%B4%E5%8D%B0%E2%86%92%E5%8E%9F%E7%89%87%E5%B7%A6%E4%B8%8A%E6%96%B0%E6%B0%B4%E5%8D%B0-sso/failure.png)；[Playwright自动截图](../../../reports/sso001-004-plain-source-20261104/test-results/same-session-original-SSO-002-%E5%8E%9F%E7%89%87%E5%8F%B3%E4%B8%8A%E6%97%A7%E6%B0%B4%E5%8D%B0%E2%86%92%E5%8E%9F%E7%89%87%E5%B7%A6%E4%B8%8A%E6%96%B0%E6%B0%B4%E5%8D%B0-sso/test-failed-1.png)。

## 内容抽样与验证边界

已查看SSO-002两轮共6张首/中/末产物帧，确认旧/新水印位置及旧水印无残留；SSO-004第二轮3张产物帧未见新增字幕烧录。所有MP4可解码、有音轨，所有SRT结构/语言特征及原片时间范围通过；各例第一轮文件在第二轮后仍可下载，哈希不变。字幕翻译未逐字全量验收，高光语义质量及费用未完整验收，抽帧不等同逐帧检查。

SSO-002脚本修正后`npm run verify`退出0，类型检查和123条离线用例通过。未修改产品源码、未新增FIXME、未向云效写入；SSO仍为独立专项，原MW及默认预发数量不变。
