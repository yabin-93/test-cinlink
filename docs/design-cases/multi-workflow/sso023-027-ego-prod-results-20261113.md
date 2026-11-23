# SSO-023～027 生产环境执行记录（2026-11-13）

生产环境：https://app.cinlink.ai/。ego-browser有头串行、零业务重试；每例独立非项目会话、原片一次登记、不@，历史视频来源按用例配置。

素材：7MB.mp4，7815126字节，SHA-256：9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96。
最新检查点：2026-11-13T03:52:37.280Z。逐轮统计：{"Failed":7,"Blocked":13,"Passed":5}。尚未取得完整内容/来源证据的轮次保留待复核，不以完成状态判通过。

| 用例 | 当前状态 | 会话 |
|---|---|---|
| SSO-023 | Failed | [会话](https://app.cinlink.ai/c/aac95b40-b697-4fb0-b361-2b79496c734f) |
| SSO-024 | Failed | [会话](https://app.cinlink.ai/c/d6ec9e34-4cda-46e6-af47-082da0d59e1f) |
| SSO-025 | Failed | [会话](https://app.cinlink.ai/c/aa4a1154-5be8-4c4e-9bfb-584ec850775a) |
| SSO-026 | Passed | [会话](https://app.cinlink.ai/c/1c4e7f30-e389-4901-b6b4-d5e263ca8b4c) |
| SSO-027 | Failed | [会话](https://app.cinlink.ai/c/c25f1704-5a97-44a9-8439-277b6dc8721c) |

| 轮次 | 状态 | 指定输入 | 实际交付 | 说明 |
|---|---|---|---|---|
| SSO-023-R1 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 无文件/未完成 | Timeline is 29.420s; expected 30–30s |
| SSO-023-R2 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-023-R3 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-023-R4 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 3 has no usable artifact |
| SSO-023-R5 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 3 has no usable artifact |
| SSO-024-R1 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 无文件/未完成 | Correct the previous selection: Selection exceeds the requested duration. |
| SSO-024-R2 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-024-R3 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 20s / 1920×1080 | Width mismatch 1920；Height mismatch 1080；实际20秒1920×1080不符合保留720p；首/中/末实际抽帧复核，首/中新增中文高光说明条（一次诊断就可能改变人生；医疗服务至关重要，必须受到保护），原片对应19.36秒无该文字条，与无新增字幕/水印要求不符。首中末3段原声匹配系数均>0.99。全片逐帧、所有剪切点尚未穷举，不据此报完整内容通过。 |
| SSO-024-R4 | Failed | file_cloud_3o3w4xiemjomt2sizc4nvghbel | 20s / 1920×1080 | Width mismatch 1920；Height mismatch 1080；实际输入为V3，20秒1080p，输出保持20秒1080p及抽样原声（相关系数1.0），英文烧录可见；1080p及中文说明条从V3继承，不报告为本轮新增尺寸变更或来源串用。整体720p要求仍未满足；完整逐句字幕/所有剪切点未穷举。 |
| SSO-024-R5 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 2 has no usable artifact |
| SSO-025-R1 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 无文件/未完成 | Correct the previous selection: Return a title for each topic in the cut. |
| SSO-025-R2 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-025-R3 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-025-R4 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-025-R5 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 2 has no usable artifact |
| SSO-026-R1 | Passed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 60.49s / 1280×720 | 实际文件完整解码，60.49秒720p，首中末画面正常无新增水印；18条英文SRT逐句与独立实际音频ASR对照，无明显错义或数秒漂移，136/143词直接对齐，其余主要healthcare拆词等识别差异；60个1fps抽帧OCR无审片水印。实际顶层F已核对、原声3段相关系数近1。 |
| SSO-026-R2 | Passed | file_cloud_mzuafo4j5wkumhcny24k4qeept | 60.49s / 1280×720 | 实际顶层V1，60.49秒720p；首中末及60个1fps抽帧均仅含指定INTERNAL右上角水印，无另一审片分支水印；字幕画面保持、3段原声相关系数>0.999。历史母版哈希回读保持。 |
| SSO-026-R3 | Passed | file_cloud_mzuafo4j5wkumhcny24k4qeept | 60.49s / 1280×720 | 实际顶层V1，60.49秒720p；首中末及60个1fps抽帧均仅含指定CLIENT右上角水印，无另一审片分支水印；字幕画面保持、3段原声相关系数>0.999。历史母版哈希回读保持。 |
| SSO-026-R4 | Passed | file_cloud_mzuafo4j5wkumhcny24k4qeept | 60.49s / 2560×1440 | 实际顶层V1，60.49秒2560×1440完整解码；首中末保留英文字幕，60个1fps样本无CLIENT/INTERNAL水印；原声3段与V1相关系数>0.999；实际输入和母版/两审片版历史哈希保持。 |
| SSO-026-R5 | Passed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 60.5s / 2560×1440 | 实际顶层原片F，60.50秒2560×1440完整解码；首中末无新增字幕/水印，60个1fps样本底部中央无字幕文字，未识别CLIENT/INTERNAL；原声3段与F相关系数>0.999；历史母版及审片版哈希保持。 |
| SSO-027-R1 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 无文件/未完成 | Correct the previous selection: Selection exceeds the requested duration. |
| SSO-027-R2 | Failed | file_cloud_zquu6agl4hjy5eyplmfrfxv4ji | 无文件/未完成 | Correct the previous selection: Selection exceeds the requested duration. |
| SSO-027-R3 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 2 has no usable artifact |
| SSO-027-R4 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 1 has no usable artifact |
| SSO-027-R5 | Blocked | 依赖缺失 | 无文件/未完成 | Required source round 4 has no usable artifact |

## 已确认发现

- SSO-023 R1：方案审核后渲染报 Timeline is 29.420s; expected 30–30s，无MP4，R2～5依赖阻塞。
- SSO-024 R1：高光选择报 Selection exceeds the requested duration，无MP4；R3交付20秒1080p并加入中文说明条，与720p、无新增文字要求不符。R4来源正确，继承1080p与说明条，不误报为本轮新增尺寸变更。
- SSO-025 R1：高光选择报 Return a title for each topic in the cut，无母版，R2～5依赖阻塞。

## 判定与验证边界

实际失败、依赖阻塞和待内容复核分别统计。字幕以实际SRT、独立ASR及实际画面核验；水印首中末+每秒抽帧。完整解码不代替逐帧人工审片，原声三段匹配不声称全片逐字听审。高光所有剪切点尚未完成的范围保留在逐轮复核记录。


SSO-027 R1与R2均在高光选择阶段报 Selection exceeds the requested duration，未交付MP4；R3～5按依赖阻塞。


## 每轮执行与证据

### SSO-023

会话ID：aac95b40-b697-4fb0-b361-2b79496c734f。

R1：Failed；run_id：run_v2_5f884c9c679840ea8e7109adc91f2169。

先用本会话最初上传的7MB.mp4原片，剪一个30秒高光版本。保留1280×720和选中片段原英语音轨，交付一个MP4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-023/r1-complete.png)

R2：Blocked；run_id：未提交。

给上一轮的30秒高光加简体中文字幕并烧录，保留全部剪辑片段、时长、分辨率和原音轨，交付一个MP4。

R3：Blocked；run_id：未提交。

客户改要英文字幕。请从本会话第1轮的无字幕30秒高光重新制作，生成并烧录英文单语字幕，保留该版片段、时长、分辨率和原音轨，交付一个MP4。

R4：Blocked；run_id：未提交。

在上一轮英文字幕版本右上角加全程文字水印CLIENT-REVIEW，默认样式，其他内容保持，交付一个MP4审片版。

R5：Blocked；run_id：未提交。

客户通过了，请使用本会话第3轮的英文字幕版本作为正式版，将分辨率提升2倍至2560×1440，保留片段、时长和原音轨，交付一个MP4。

### SSO-024

会话ID：d6ec9e34-4cda-46e6-af47-082da0d59e1f。

R1：Failed；run_id：run_v2_cce374c518e04a07a50cd260e030f1cb。

把最初上传的7MB.mp4原片剪成30秒高光，保留1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-024/r1-complete.png)

R2：Blocked；run_id：未提交。

给上一轮30秒版生成并烧录英文单语字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。

R3：Failed；run_id：run_v2_14c55716de8443d196e1ba14987e94a3。

再从最初上传的7MB.mp4原片独立剪一个20秒高光版，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

交付：7MB_20秒高光.mp4；file_id：file_cloud_3o3w4xiemjomt2sizc4nvghbel；12854934字节；SHA-256：c250355102471e42d1339cbffabaffb4232a0cc329c93aa07039c5ad57e2b9e8。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-024/r3-complete.png)

R4：Failed；run_id：run_v2_a59533f26b734dc1aa599e51fc0b0da8。

给上一轮20秒版生成并烧录英文单语字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。

交付：7MB_20秒高光_英文单语字幕.mp4；file_id：file_cloud_av4enmkfk6rzh7fetihcklrqt2；12808554字节；SHA-256：271bac350a98a56da35486fbf2dd8a63413d5402eee58b2626a04369596f0c60。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-024/r4-complete.png)

R5：Blocked；run_id：未提交。

回到本会话第2轮带英文字幕的30秒版，在右上角添加全程文字水印BRAND，默认样式，保持其他内容，交付一个MP4。

### SSO-025

会话ID：aa4a1154-5be8-4c4e-9bfb-584ec850775a。

R1：Failed；run_id：run_v2_c9edd4abd89e4b50a2cc7e48a3487268。

从最初上传的7MB.mp4原片剪一个30秒高光母版，保持1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-025/r1-complete.png)

R2：Blocked；run_id：未提交。

使用第1轮30秒无字幕母版，生成并烧录简体中文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。

R3：Blocked；run_id：未提交。

继续使用第1轮30秒无字幕母版，生成并烧录英文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。

R4：Blocked；run_id：未提交。

仍使用第1轮30秒无字幕母版，生成并烧录日文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。

R5：Blocked；run_id：未提交。

请把第2轮中文字幕版提升2倍分辨率至2560×1440，保留全部片段、时长、中文字幕和原英语音轨，交付一个MP4。

### SSO-026

会话ID：1c4e7f30-e389-4901-b6b4-d5e263ca8b4c。

R1：Passed；run_id：run_v2_72c4f090d105400a831008f0e100b19d。

给最初上传的7MB.mp4完整原片生成并烧录英文单语字幕，保持1280×720、完整时长和原英语音轨，交付一个无新增水印的MP4。

交付：7MB_英文单语字幕.mp4；file_id：file_cloud_mzuafo4j5wkumhcny24k4qeept；25009249字节；SHA-256：6b5013a5edcec01a487ff97ac1421d0335ad4b03bdec1781084a1fbee69a7183。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-026/r1-complete.png)

R2：Passed；run_id：run_v2_d5033bf61e224ab0a0c393c2d624a8dd。

在上一轮字幕母版右上角添加全程文字水印INTERNAL，默认样式，保留字幕、时长、分辨率和音轨，交付一个MP4内部审片版。

交付：7MB_英文单语字幕_内部审片版.mp4；file_id：file_cloud_rqdefry5byexwl3r36fqrbpa7b；24893308字节；SHA-256：1bbab9cfd661fba4352a973f04e36b696ed061859b1dd484363f4ec9d02400e4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-026/r2-complete.png)

R3：Passed；run_id：run_v2_54ecd3ba2b0d41bc93ccb4cf1e818160。

请从第1轮字幕母版另做客户审片版，右上角添加全程文字水印CLIENT，默认样式，保持其他内容，交付一个MP4。

交付：7MB_英文单语字幕_客户审片版.mp4；file_id：file_cloud_2lehgjpzaqe5cdkkuh6mph7dpk；24891815字节；SHA-256：c1d788a7b0cc3c6961be4941a05bfcc6823defc71f16a82da26d3a585c74b268。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-026/r3-complete.png)

R4：Passed；run_id：run_v2_8fad55e4bbb14a1e92826a32cf3bc742。

客户审片通过，请从第1轮无水印字幕母版制作正式版，提升2倍分辨率至2560×1440，保留完整时长、英文字幕和原音轨，交付一个MP4。

交付：7MB_英文单语字幕_正式版.mp4；file_id：file_cloud_a3kabtpagyb3tkrw5unrljnszb；52798657字节；SHA-256：8d36a0da844713e4d4bfc2d385943888af1978dec224d4b6ba6ae996edcd711a。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-026/r4-complete.png)

R5：Passed；run_id：run_v2_72f66ab939d342bf9ab1732703937306。

另交一份干净原画面版本：仅将最初上传的7MB.mp4原片提升2倍至2560×1440，保持完整时长和原英语音轨，交付一个无新增字幕和水印的MP4。

交付：7MB_干净原画面_2倍增强版.mp4；file_id：file_cloud_j34fuofvgcdwkhq3ws4om44cbq；52413052字节；SHA-256：8b2b537c8a5f854416b6990dba1c8fb0780142384186fe8eedca1d497e3843c4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-026/r5-complete.png)

### SSO-027

会话ID：c25f1704-5a97-44a9-8439-277b6dc8721c。

R1：Failed；run_id：run_v2_03a7bbb25d1b4250a41fb5653242d806。

从最初上传的7MB.mp4原片剪一个20秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-027/r1-complete.png)

R2：Failed；run_id：run_v2_c1362fe4afec4c46ba05b889f3833a0d。

客户想多保留信息，请重新从最初上传的7MB.mp4原片剪一个30秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。

[实际终态截图](../../../reports/sso023-027-ego-prod-20261113/SSO-027/r2-complete.png)

R3：Blocked；run_id：未提交。

给上一轮30秒提案生成并烧录英文字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。

R4：Blocked；run_id：未提交。

客户最终选回第1轮20秒提案，请使用第1轮视频生成并烧录简体中文字幕，保留那一版全部片段、时长、分辨率和原音轨，交付一个MP4。

R5：Blocked；run_id：未提交。

在上一轮确定的20秒中文字幕版右上角添加全程文字水印FINAL，默认样式，保持其他内容，交付一个MP4。


## 云效缺陷同步（2026-11-13）

已通过官方OpenAPI新建4条、关联1条，11张真实截图及5份脱敏证据附件均回读核验。7个失败轮次按实际现象归并；13个依赖阻塞轮不单独建单。未重跑业务任务。

| 云效编号 | 处理 | 问题 |
|---|---|---|
| [FWXC-471](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8054cc65706a5041c47dd9badd) | 新建 | 【生产环境】30秒高光审核后渲染报29.420秒时间轴不满足30–30秒，未交付MP4 |
| [FWXC-472](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=7df1d9ef75e2fc03ebbb7ce59a) | 新建 | 【生产环境】正常提交20秒或30秒高光，选片报超过目标时长后任务失败 |
| [FWXC-473](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=9a1336e6a73b018924df1b9e73) | 新建 | 【生产环境】30秒无字幕高光母版选片报缺少主题标题，未交付视频 |
| [FWXC-474](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=beb727b375efeae040200af58a) | 新建 | 【生产环境】高光明确要求无新增字幕水印，成片仍叠加中文说明条 |
| [FWXC-464](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=11748add9443e48061db3c2a4a) | 关联补充 | SSO-024高光720p要求再次输出1080p：补充FWXC-464实测证据 |

SSO-024 R4使用V3来源正确，其1080p和中文说明条继承自R3，不另建新单。FWXC-464仅追加评论24257706和附件，正文、状态、负责人、迭代保持。其余新单为待确认。前一批001～022的FWXC-464～468在本次查重时已存在，本次未重复创建。

2026-11-13按用户要求精简FWXC-471～474前置为3条，并回读确认；完整提示词、任务信息、失败截图及其他章节保持。FWXC-464补充评论保留原始提交记录，不重复追加。规范已写入AGENTS.md、云效工具说明和正文模板。


完整原提示词、受理run、计划来源、实际文件哈希与真实截图保存在本机 reports/sso023-027-ego-prod-20261113/，其中progress.json为可恢复检查点。未提交Git；云效同步结果见上节，创建/关联后未改变测试判定。
