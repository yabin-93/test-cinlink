# SSO-005～008 五轮同工作流执行记录（2026-11-04）

有头浏览器串行执行4例、20轮业务任务；业务结论为 **3例通过、1例未通过**（19轮通过、1轮未通过）。任务done及Playwright流程/结构检查与内容验收分别统计，不能以脚本通过替代内容结论。

原始Playwright结果：2通过/2失败。SSO-007第5轮在运行时采样中漏掉原始输入，终态字段已变为输出文件，触发来源门禁；随后只读回读同一run的原始计划，根`apply_watermark`明确绑定F，下载本轮MP4并核对前4轮历史文件哈希，补证通过。保留初次失败截图/审计及[补证记录](../../../reports/sso005-008-five-rounds-20261104/SSO-007-round-5-recovery.json)、[原始计划来源](../../../reports/sso005-008-five-rounds-20261104/R5-original-input-proof.json)，没有重发AI任务；不把采样缺口作为产品错源缺陷。SSO-005则相反：脚本结构通过，但实际法文内容未通过。

SSO-008第5轮首个提交响应为401，脚本初批未取到run_id而停止；恢复后回读原会话，发现页面自动认证重试已受理`run_v2_9ef9849721de4cb29678448e9d73ef25`，因此只续读该run并完成计划确认、下载及历史核验，没有再次发送目标指令。前4轮仅核对已有检查点和本地文件哈希，未重新处理。续跑结果及实际代码快照见[续跑报告](../../../reports/sso005-008-five-rounds-20261104/continuation-final/html/index.html)/[续跑审计](../../../reports/sso005-008-five-rounds-20261104/continuation-final/audit/SSO-008.json)；空run_id初始化报错另保留在`continuation/`，未产生AI任务。

已将按run/会话/根步骤身份核对的原始计划回读兜底及401受理核对接回脚本，类型检查通过。初批使用根目录`executed.spec.ts`；008第5轮续读使用`continuation-final/executed.spec.ts`，两份实际代码快照分别保留，补证不改写初批Playwright结论。

## 执行范围与前置

- 每例新建独立非项目会话，只上传/登记一次原片；各轮在同一会话内只发送用例正文，不@、不拼接统一前缀、不插入文件ID。登记为准备，不计入5轮业务对话。
- 原片：`E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道/7MB.mp4`，英文语音、60.495778秒、1280×720；SHA-256为`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。各例云端原片下载哈希已核对。
- 命令：`npm run test:sso -- --grep 'SSO-00[5-8]'`；单worker、零重试、任一时刻单个有头窗口。20轮均按原run续读，没有重复AI提交。定义快照、完整实际提示词、run及来源审计在[批次汇总](../../../reports/sso005-008-five-rounds-20261104/summary.json)。
- [用例正文](same-session-original-cases.md)；001～004既有结果及009～018计划条目不计入本次执行。

## 用例结论

| 用例 | 业务结果 | 轮次 | 会话ID |
|---|---|---|---|
| SSO-005 | 未通过 | 4/5轮通过 | `96b4a3ae-1d2f-4224-ba15-3ffae6a26b68` |
| SSO-006 | 通过 | 5/5轮通过 | `03854ac7-401e-4f5e-a1aa-8d671f59a243` |
| SSO-007 | 通过 | 5/5轮通过 | `2cd62e83-83f3-4a3b-ae62-96f036652c67` |
| SSO-008 | 通过 | 5/5轮通过 | `9c99c462-9569-417e-93e7-45f4f4459d9d` |

## 逐轮记录

| 轮次 | 目标语言 | 业务结果 | 服务端状态 | MP4时长/秒 | run_id |
|---|---|---|---|---|---|
| SSO-005 R1 | zh | 通过 | done | 60.488005 | `run_v2_c88718be3320462aba2e595c68560212` |
| SSO-005 R2 | ja | 通过 | done | 60.488005 | `run_v2_4bfc391828eb40b09f89d71befa50b33` |
| SSO-005 R3 | ko | 通过 | done | 60.488005 | `run_v2_25ff7dc782914af7b7ac5f4e4f24e81c` |
| SSO-005 R4 | fr | 未通过 | done | 60.488005 | `run_v2_d647e150cce84aad84a7b32b62a5961e` |
| SSO-005 R5 | es | 通过 | done | 60.488005 | `run_v2_138b51428ff54ae786344429b00102ea` |
| SSO-006 R1 | zh | 通过 | done | 60.44 | `run_v2_629a6caaf1af46238e1d866421e9522d` |
| SSO-006 R2 | ja | 通过 | done | 60.44 | `run_v2_2300d19948314a81a4a51e3de201782a` |
| SSO-006 R3 | ko | 通过 | done | 60.44 | `run_v2_7fca59d85a004015bc0e228b622e83b8` |
| SSO-006 R4 | fr | 通过 | done | 60.44 | `run_v2_e7f5ca13711e48efa1622189528f3cfe` |
| SSO-006 R5 | es | 通过 | done | 60.44 | `run_v2_9c01e8b425174adfa34232154abb9f16` |
| SSO-007 R1 | - | 通过 | done | 60.488005 | `run_v2_d6659112ef4445d9a71b7f242469a18a` |
| SSO-007 R2 | - | 通过 | done | 60.488005 | `run_v2_590573d7e2de424c8bb6ee35d821cf35` |
| SSO-007 R3 | - | 通过 | done | 60.488005 | `run_v2_b3d52f06c28a4286a35fe506535ed724` |
| SSO-007 R4 | - | 通过 | done | 60.488005 | `run_v2_8a70b64d46f64ae89f69c9dc14f07a45` |
| SSO-007 R5 | - | 通过 | done | 60.488005 | `run_v2_b25f76ed44304ae1b93957a414c89984` |
| SSO-008 R1 | - | 通过 | done | 19.066341 | `run_v2_0b4ea252d55140afb4db160f22dbfa4e` |
| SSO-008 R2 | - | 通过 | done | 28.608 | `run_v2_dd416699661f4dfb97c42e7d553a0776` |
| SSO-008 R3 | - | 通过 | done | 14.566016 | `run_v2_8fe73894ce5941efae395440adea0dc5` |
| SSO-008 R4 | - | 通过 | done | 23.936 | `run_v2_d437f8377bb44453af08704c2e43c243` |
| SSO-008 R5 | - | 通过 | done | 19.399349 | `run_v2_9ef9849721de4cb29678448e9d73ef25` |

005字幕目标依次简体中文/日文/韩文/法文/西班牙文，保留原英语音轨；006为对应五语配音及同语字幕。007水印为R1右上、R2左上、R3右下、R4左下、R5右上，文字分别SSO-C7-R1～R5；008目标20/30/15/25/20秒，按各目标±2秒验收，同参数允许缓存或相同内容。

## 已确认问题：法文单语字幕混入亚美尼亚文

SSO-005第4轮的实际译文SRT第7条（27.540～32.240秒）在法文句子末尾混入`ոստիկան`，并被烧录到MP4。任务仍done，媒体结构检查通过，但不满足法文单语字幕要求。目标语言参数为`fr`、`subtitle_mode=single`，中间译文文件ID为`file_cloud_zcpa3662marmcr3pryvsvey5oe`；不据此推断底层原因。

run：`run_v2_d647e150cce84aad84a7b32b62a5961e`。可复制提示词：“根据源视频中的英文语音生成法文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带法文字幕的MP4，不更改配音、不增加水印或画面增强。”

[实际字幕](../../../reports/sso005-008-five-rounds-20261104/subtitle-evidence/SSO-005-round-4.srt) · [原始终态页面截图](../../../reports/sso005-008-five-rounds-20261104/test-results/same-session-original-SSO-005-五轮同工作流：中文→日文→韩文→法文→西班牙文字幕-sso/round-4-final.png) · [服务端快照](../../../reports/sso005-008-five-rounds-20261104/test-results/same-session-original-SSO-005-五轮同工作流：中文→日文→韩文→法文→西班牙文字幕-sso/round-4-server-state.json)。

下面为交付视频30.244秒的原始解码帧，未改写画面：

![法文字幕混入亚美尼亚文](../../../reports/sso005-008-five-rounds-20261104/test-results/same-session-original-SSO-005-五轮同工作流：中文→日文→韩文→法文→西班牙文字幕-sso/round-4-middle.png)

## 云效同步（2026-11-04）

按用户后续授权，已提交 [FWXC-278](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=381366768cf968880d087e2735)，仅覆盖005第4轮已确认的法文混字问题；007采样缺口与008认证续接不作为产品缺陷。2张真实PNG已嵌入正文，另附实际法文SRT和脱敏定位JSON；4份附件及正文/字段均回读通过。全状态96条查重无重复，新建1、旧项更新/评论/重开0。[本地缺陷](../../defects/CINLINK-SUBTITLE-FR-001.md)。

## 验证证据与边界

来源及历史隔离：逐轮记录运行时工具输入F；后续轮未重新上传，原先交付文件回读下载并核对哈希未覆盖。视频均下载、解码、检查分辨率/时长/音轨，并保存首中末帧。005的5条输出音轨与原片对齐偏移为0，16kHz单声道全长波形相关系数均约0.9997546；重编码后PCM哈希不同，不宣称字节完全相同。

006使用本地缓存Whisper large-v3-turbo独立识别，未预置目标语言；[完整语音识别记录](../../../reports/sso005-008-five-rounds-20261104/dub-independent-asr.json)与首中末帧交叉复核。第2轮日语尾部ASR重复感谢语发生在59.56秒后的全静音段并延伸到实际音频之外，已作为识别幻觉排除，不记产品缺陷；保留原始识别及[边界复核](../../../reports/sso005-008-five-rounds-20261104/dub-round-2-asr-tail-review.json)。

006五语在0.5/30/59秒的[字幕与独立语音抽样](../../../reports/sso005-008-five-rounds-20261104/dub-alignment-samples.json)能对应。007音轨另与原片波形比较，008首中末各取1秒音频在原片内匹配，数值及位置保留在本地媒体复核；这些是保留原音轨的旁证，不代替全片听审。

[内容复核](../../../reports/sso005-008-five-rounds-20261104/content-review.json)、[本地媒体复核](../../../reports/sso005-008-five-rounds-20261104/local-media-review.json)、[HTML报告](../../../reports/sso005-008-five-rounds-20261104/html/index.html)、[审计目录](../../../reports/sso005-008-five-rounds-20261104/audit)。结果覆盖本次用例的来源、参数隔离、媒体结构及指定内容抽样，不代表逐字翻译、全片画质或逐任务账本计费已完整验收。
