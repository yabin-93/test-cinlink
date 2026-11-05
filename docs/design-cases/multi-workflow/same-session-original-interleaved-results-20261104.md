# SSO-001～004 穿插工作流执行记录

日期：2026-11-04，Asia/Shanghai。用例正文见[同会话单原片专项](same-session-original-cases.md)。

按001/002/003/004分别2/3/4/5轮完成本批14轮。**4例在来源、流程、产物结构和指定抽样范围内通过，0产品失败、0当前阻塞、0补槽、3次计划确认**。每个用例使用一个独立会话，所有处理轮留在本例会话中，不@视频、不重新上传原片。SSO-005未执行；其最新五语言烧录字幕定义，以及006～008同工作流新版，均不由本批结果代替。专项仍18条，5 AUTO表示接入，13 PLAN；实际已执行001～004，005已接未执行。

## 实际提示词版本

已按用户手动删除内容移除统一提示词前缀及拼接，脚本直接发送step.prompt。删除前已发出的SSO-001第1～2轮、SSO-002第1～2轮保留当时的实际完整提示词和原run；没有为了更换文字重复生成。其余10轮只发送各轮正文。因此本批14轮不能全部称为“删除前缀后的提示词验证”；逐轮版本及实际文字见下表与summary.json。

## 前置与来源证据

原片为7MB.mp4，英文语音，60.495778秒、1280×720、H.264/AAC。每例仅在前置挂载原片一次，并提交“只登记素材”的准备消息；四次登记不计入14轮业务处理。云端按内容去重，实际上传完成请求为0次，不能记成4次新上传。

- 原片file_id：`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`。
- 原片SHA-256：`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`，四例云端下载回读与本地一致。
- 每轮保存运行中的工具输入快照，14/14关联原片F；根步骤没有引用前轮成片/SRT。部分工具终态会把input_media_context改为输出，故不单凭终态字段或助手文字判断来源。
- 后续轮次回读既有历史文件并核对SHA-256；跨续跑阶段重复下载相同ID的哈希也一致。相同内容/缓存可复用文件ID，不要求14份交付拥有14个不同文件ID。

| 用例 | 会话ID | 登记run | 当前有效审计 |
|---|---|---|---|
| SSO-001 | `eee41db3-d8b3-49f5-8794-173d0cfbc275` | `run_v2_aa1a51a8cd024a5dbd23bab3af1c9cdf` | [审计](<../../../reports/sso-interleaved-variable-rounds-20261104/audit/SSO-001.json>) |
| SSO-002 | `53d469eb-a7aa-44bf-82bb-0de99b7a0af8` | `run_v2_11a59f4c735042279b5e6dd0e2d29140` | [审计](<../../../reports/sso-interleaved-variable-rounds-20261104/transport-recovery/audit/SSO-002.json>) |
| SSO-003 | `9b58c854-cc7d-4308-9ede-2f96f1ad3cfb` | `run_v2_f660d4305cdd461ebfbccf7e5d4bff73` | [审计](<../../../reports/sso-interleaved-variable-rounds-20261104/final-continuation/audit/SSO-003.json>) |
| SSO-004 | `b2e0bbb8-7960-4d65-95cf-df63af4ad6a7` | `run_v2_f1e3fa55e72c4bd88f87b8c04bd5e6bc` | [审计](<../../../reports/sso-interleaved-variable-rounds-20261104/without-prefix/audit/SSO-004.json>) |

## 逐轮结果

| 用例/轮 | 工作流 | 实际交付与核验 | 业务run | 提示词版本 |
|---|---|---|---|---|
| SSO-001/R1 | 英文字幕 | 英文SRT，15条，末条60.46秒；输入F已核验 | `run_v2_6f811a14b0de40919cab7593f6f8903e` | 删除前已发，保留实际记录 |
| SSO-001/R2 | 高光剪辑 | MP4，19.066341秒，1280×720，有音轨；输入F已核验 | `run_v2_0289f0650b1642a6a596a94186aee5db` | 删除前已发，保留实际记录 |
| SSO-002/R1 | 文字水印 | MP4，60.488005秒，1280×720，有音轨；输入F已核验 | `run_v2_aa25d72e8d1f494b9a56895ececda625` | 删除前已发，保留实际记录 |
| SSO-002/R2 | 增强2倍 | MP4，60.495778秒，2560×1440，有音轨；输入F已核验 | `run_v2_abfe4c6b7f8f410bbe65ecbe070bee99` | 删除前已发，保留实际记录 |
| SSO-002/R3 | 英文字幕 | 英文SRT，15条，末条60.46秒；输入F已核验 | `run_v2_7c77f989689340e5bdabf43cf18f84e5` | 仅正文 |
| SSO-003/R1 | 字幕翻译 | 中文SRT，15条，末条60.46秒；输入F已核验 | `run_v2_8905a1646e2942fe8d97e39bdea05fb1` | 仅正文 |
| SSO-003/R2 | 高光剪辑 | MP4，28.608秒，1280×720，有音轨；输入F已核验 | `run_v2_256f3512bdfd4a4c901481021dcd7fbe` | 仅正文 |
| SSO-003/R3 | 文字水印 | MP4，60.488005秒，1280×720，有音轨；输入F已核验 | `run_v2_a833e3582d34409d97b0aa94268388f2` | 仅正文 |
| SSO-003/R4 | 增强2倍 | MP4，60.495778秒，2560×1440，有音轨；输入F已核验 | `run_v2_88136ef7c7d443208f15366bb07415db` | 仅正文 |
| SSO-004/R1 | 英文字幕 | 英文SRT，15条，末条60.46秒；输入F已核验 | `run_v2_c09dd6ef6e2242e7b546e07552b0a233` | 仅正文 |
| SSO-004/R2 | 文字水印 | MP4，60.488005秒，1280×720，有音轨；输入F已核验 | `run_v2_c1504f52c0b74264939711c856b0da47` | 仅正文 |
| SSO-004/R3 | 增强2倍 | MP4，60.495778秒，2560×1440，有音轨；输入F已核验 | `run_v2_3b3565ce680a4f8b8b4047752d07f3ed` | 仅正文 |
| SSO-004/R4 | 高光剪辑 | MP4，19.066341秒，1280×720，有音轨；输入F已核验 | `run_v2_98b569d9c11b4875907cb66998e76002` | 仅正文 |
| SSO-004/R5 | 字幕翻译 | 日文SRT，15条，末条60.46秒；输入F已核验 | `run_v2_13cd12901b714585a41953c3c604c121` | 仅正文 |

9份MP4均可下载、解码；未剪辑成片与F时长差在±0.5秒内，高光按目标±2秒核对；增强为2560×1440而非累计倍率。5份SRT各15条，语言特征、结构及时间轴范围符合本轮交付。最终交付字段每轮恰好1份，均与实际下载文件ID一致，共9份视频＋5份SRT。

视频逐份查看首/中/末共27帧：SSO-002/R1水印SSO-C2-R1在右上，003/R3的SSO-C3-R3在右下，004/R2的SSO-C4-R2在左上；后续增强/高光样本未见这些历史水印或新增字幕残留。高光分别为001/R2 19.066341秒、003/R2 28.608秒、004/R4 19.066341秒。

## 中断、续跑与失败截图

原始阶段报告按当时真实结果保留，不把阶段失败报告改写为通过。最终结论由下列各例完整审计合并得到；只继续缺失轮次或回读已受理run，没有重复提交已有AI任务。

| 阶段 | 原始执行结果 | 处理及最终采用范围 |
|---|---|---|
| 初始根目录 | 001完成；002增强已受理，因移除前缀而停止本地执行器 | 001采用根目录审计；002原增强后台继续，不调用取消或重提 |
| without-prefix | 1 passed / 2 failed | 004五轮通过；002重开落登录页、003工作台缺少新会话入口，均未新增处理任务 |
| final-continuation | 1 passed / 1 failed | 003四轮通过；002回读原增强成功后，历史水印只读下载发生ECONNRESET，第3轮尚未发送 |
| transport-recovery | 1 passed（9.2分钟） | 002接回前两轮，仅补第3轮，三轮完整通过 |

会话刷新后恢复工作台；短暂401/状态空白未直接判AI任务失败。只读下载针对ECONNRESET加入最多2次网络重试，不重试HTTP错误状态或AI提交；Playwright仍workers=1、retries=0，预发任务串行。

[SSO-002 登录页现场PNG](<../../../reports/sso-interleaved-variable-rounds-20261104/failure-evidence/SSO-002-login.png>)；[SSO-002 历史文件读取连接重置现场PNG](<../../../reports/sso-interleaved-variable-rounds-20261104/final-continuation/test-results/same-session-original-SSO-002-三轮穿插：水印→增强→英文字幕-sso/failure.png>)。两张为本次中断原始截图，不标作已证实的工作流产品缺陷。SSO-003工作台初始化失败当时未取得PNG，保留对应trace/error-context，不补造截图。

## 验证范围与限制

本批确认原片来源、同会话跨轮隔离、终态/交付对应、媒体结构、指定水印及无残留抽样。未完成字幕逐字翻译、高光语义、全片逐帧或增强主观画质的全面验收；音轨存在不代表已对全段音质做听审；未按任务关联核验账单。以上限制不能写成“全部质量及费用通过”。

脚本改动后的类型检查＋123条离线测试通过；SSO-005最新定义由其独立维护记录验证。本次未修改产品源码或写入云效。旧两轮报告与曾拟但未执行的五轮同工作流草稿保留历史，不迁移其通过数。

## 本机证据索引

[汇总及逐轮实际提示词](<../../../reports/sso-interleaved-variable-rounds-20261104/summary.json>)；[14轮来源核验](<../../../reports/sso-interleaved-variable-rounds-20261104/source-evidence-final.json>)；[最终交付对应核验](<../../../reports/sso-interleaved-variable-rounds-20261104/delivery-check.json>)；[5份字幕核验](<../../../reports/sso-interleaved-variable-rounds-20261104/subtitle-check.json>)；[9视频27帧抽样记录](<../../../reports/sso-interleaved-variable-rounds-20261104/visual-review.json>)；[跨续跑历史哈希核对](<../../../reports/sso-interleaved-variable-rounds-20261104/continuation-hash-check.json>)。

底稿、下载媒体、截图与trace仅本机保存；不提交含会话信息或签名地址的原始报告。正文未摘录原始带签名链接。
