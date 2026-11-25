# ICP 电商场景测试进度

生产环境，2026-11-16；仅电商Case 01～05。原始钉钉文档未修改。每例使用本批独立会话，素材来自公开商品页或真实测评；本地预制输入不计为CinLink产物。

当前批次：`icp-ecommerce-original-20261116-1818`。

本轮按用户最新要求新建项目重跑，已发送的制作/修改指令均使用原表原文，不追加执行建议、限制或重复要求；必要信息通过事实资料或实际补槽提供。前置不满足而未发送的轮次单列；素材准备及已撤销准备尝试不计入业务轮次。上一批额外提示词的结果仅保留历史，不计入本轮。

记录核对：25条原文定义与源表快照一致；19条实际受理提示词与原文一致；18张失败原图已逐字节核对归档。

后续缺陷同步（2026-11-17）：7条已提交并回读通过，15张失败原图已上传、嵌入正文，45份附件核验通过；[缺陷清单及未提范围](defect-sync-production-20261117.md)。测试结果保持原实测，本次没有重新执行产品。

| 用例 | 场景 | 当前状态 | 实际结果 |
|---|---|---|---|
| ICP-EC-01 | DTC 电动自行车广告投手 | Failed | 仅交付B/C两条广告，A缺失；A两轮修改仅分析，完整三条广告目标未达。 |
| ICP-EC-02 | 女装 shopify独立站运营 | Failed | 首轮规划1200秒超时；独立SKU10末轮参数校验失败；第2～4轮缺首稿。；云效：[FWXC-625](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c87a29cd1d5996c0fa46eb4adf)；[FWXC-626](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ddeb25492d57ba95d8e4dc2d2d) |
| ICP-EC-03 | 品牌的社媒运营岗 | Failed | 三版齐全；Reels初次修复不完整，TikTok15秒改版及安全区修改因引用冲突失败。；云效：[FWXC-627](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=734bcbf473a246b0fe65b85187)；[FWXC-628](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=25f4dfa4e583d270cbf389c7c9)；[FWXC-629](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8014ebc4b36863fc090d9a5ad8) |
| ICP-EC-04 | 准备进军墨西哥市场的自行车DTC品牌运营 | Failed | 西语音轨已交付；画面英语未替换，CTA和文字修改均仅分析未改片。；云效：[FWXC-630](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4c5033724b50514e1eee69c3c) |
| ICP-EC-05 | Amazon 美国站手持吸尘器小家电drop shipping 卖家 | Failed | 首轮20秒广告供应商处理失败；独立末轮素材判断和5秒动态替代展示通过；第2～4轮缺首稿。；云效：[FWXC-631](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fc2731f00849917dfea1868f89) |

场景状态：Failed 5。

原文制作/修改轮次：已提交并观察 19/25；明确前置失败未提交 6；待提交的适用轮次 0。已提交轮次业务验收：Failed 12 / Blocked 1 / Passed 2 / Not Applicable 4。任务done只表示任务结束，不能替代业务验收通过。

## 逐例记录

### ICP-EC-01

状态：Failed。

5轮原文均已提交并完成观察：首轮只交付B/C两条1080×1920广告（24.24/26.01秒），缺A；第2轮选A后只交付分析文档，未替换前3秒；第3轮正确保留B既有Shop Now和其他内容；第4轮核实C原声/字幕没有改意，未触发假设错误；第5轮按实际补槽补交同源真实折叠片段后，仍仅交付分析文档，未生成AI镜头或替换A。整例未达到三条完整广告交付。普通自行车收纳痛点画面支持不足单列为素材覆盖限制，不据此认定全部未交付均为产品缺陷。

[本例会话](https://app.cinlink.ai/c/deb4f615-8abe-421d-a880-51302ab5ef7d)

缺陷判定：源素材缺普通自行车收纳对比与参考，后续依赖A首稿，暂不能明确归为产品缺陷，本次未提交；保留原Failed及未覆盖说明。

- 第1轮：任务状态 `done`；run `run_v2_591bd19e5f414372a75d102f0369b8d1`。
  业务验收：`Failed`。
  业务结果：B/C实际文件已下载，探测符合20～30秒、9:16且含音轨；工程有英语字幕、背景音乐与Shop Now CTA。A未生成。原C引语与源转写一致，未证实文档假设的歧义；成片抽帧未见上传的独立品牌Logo，Logo全时核验待完成。 后续离线核验实际音轨均识别为英语：C开头完整个人评价与原声一致；B保留官方100公里声称及城市/平地条件限制，未把它改成无条件续航保证。ASR仅作辅助证据。
- 第2轮：任务状态 `done`；run `run_v2_d4ca31ac1e32470ea5535262b063df56`。
  业务验收：`Blocked`。
  业务结果：补槽选择A后，仅交付video-analysis.md，页面显示已完成；A仍为605秒源视频工程，未替换前3秒、未生成广告。此轮A首稿前置本就缺失，不能判定完整局部修改能力通过。B/C工程内容未变。
  补槽：{"question": "确认修改对象：A 便携性／B 续航／C 真实体验", "answer": "A｜便携性（未成片，工程仍为原视频）", "method": "选择页面现有选项，未追加提示词"}
- 第3轮：任务状态 `done`；run `run_v2_34dd44ba07644fe5848991a2d75b0711`。
  业务验收：`Passed`。
  业务结果：正确选择B续航工程，返回首轮同一file_id成片；A/B/C业务内容全部保持。原B的CTA已是Shop Now，因此覆盖保持及幂等，不覆盖从其他文字替换。
- 第4轮：任务状态 `done`；run `run_v2_30b315afbe90416cb97b89bf47774f9e`。
  业务验收：`Not Applicable`。
  业务结果：未发现真实语义歧义。填写必要事实后，应用指出原片536.212～540.132秒与C连续原声及字幕一致，保留限定词；未制造无依据修正版。A/B/C内容均保持：{"A":true,"B":true,"C":true}。语义错误修复分支未触发。
  补槽：{"question": "第三条广告哪句评价产生歧义或传达什么错误含义", "answer": "核对开头这句：“Fantastic motor, probably by far my favorite at the moment.” 目前对照原片未发现它已经改变原意；文档这里是语义有误的假设场景。"}
- 第5轮：任务状态 `done`；run `run_v2_b58e50b092a54eecbce0ad43e53f08ba`。
  业务验收：`Failed`。
  业务结果：任务done仅有video-analysis.md，无AI视频结果；原A/B/C内容均保持：{"A":true,"B":true,"C":true}。A仍是605秒原视频工程，无20～30秒A广告可供替换；完整AI镜头替换分支未跑通。
  补槽：{"question": "真实折叠参考", "answerFile": "C:/Users/chen/Documents/ChatGPT/test-cinlink/reports/icp-ecommerce-original-20261116-1818/materials/ado-real-folding-reference-255-290s.mp4", "provenance": "原已上传review-full.mp4中255～290秒，真实ADO Air20 Ultra演示，同一测评来源；未增加制作提示"}

![ICP-EC-01本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-01-failed-A-not-generated.png)


![ICP-EC-01本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-01-failed-step-4-analysis-only.png)

### ICP-EC-02

状态：Failed。

首轮10款整体制作因规划模型等待1200秒超时，零首稿。第2～4轮因无生成SKU03/SKU05及10款风格基线未提交；第5轮素材充分性可独立，已按原文、只给SKU10正面源及原参考重新绑定补跑，但模型参考参数校验失败，仍无AI上身图/视频交付。两次实际失败原图均保存。

[本例会话](https://app.cinlink.ai/c/1c7540dd-4e59-4146-a527-be07c15ad252)

已提交云效：[FWXC-625](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=c87a29cd1d5996c0fa46eb4adf)（第[1]轮）；[FWXC-626](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=ddeb25492d57ba95d8e4dc2d2d)（第[5]轮）。

- 第1轮：任务状态 `failed`；run `run_v2_dfe10952c8ac4e22a1d78953c7d513fe`。
  业务验收：`Failed`。
  业务结果：应用明确run_failed：规划模型等待响应超过 1200 秒，当前请求已超时；零首稿交付。
- 第5轮：任务状态 `failed`；run `run_v2_d2cdcefd1e03452f8cd78c465fceb5dd`。
  业务验收：`Failed`。
  前置调整：首轮无成品，本轮仅独立评估SKU10现有正面源图/2秒正面视频，重新绑定本SKU及原AI模特参考、Logo和事实表；未提供背面，未变更提示词。
  业务结果：基于仅有的SKU10正面图/2秒正面视频、原模特参考和事实表独立补跑。工具参数校验失败：McpProtocolError: TOOL_ARGUMENTS_INVALID: model_reference_file_id requires a per-image batch of product images；未交付可用AI上身图或展示视频，未完成未知背面判断后的可用产物目标。

未执行轮次：[2, 3, 4]；原因：第2～4轮依赖已生成的SKU03/SKU05及10款风格首稿，前置缺失；第5轮已基于原源素材独立执行，工具参数校验失败。。


![ICP-EC-02本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-02-failed-planning-response-timeout.png)


![ICP-EC-02本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-02-failed-step-4-sku10-model-reference-batch.png)

### ICP-EC-03

状态：Failed。

5轮原文均已执行：首轮三版齐全且同源，A/B有裁切和双层字幕、B缺Shop Now；第2轮Reels仅部分修复，骑行主体仍被裁；第3轮AI背景错误假设未触发，事实补槽后正确保持；第4轮TikTok15秒修订因saved highlight工程/修订不匹配失败；第5轮Reels安全区修正版可导出且顺序保持，TikTok因REFERENCE_CONFLICT失败。Shopify各轮均未串改。整体未通过，失败原图及实际MP4已保存。

[本例会话](https://app.cinlink.ai/c/c6361f94-ada7-433b-80fe-f90ecbee664e)

已提交云效：[FWXC-627](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=734bcbf473a246b0fe65b85187)（第[1, 2]轮）；[FWXC-628](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=25f4dfa4e583d270cbf389c7c9)（第[1]轮）；[FWXC-629](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8014ebc4b36863fc090d9a5ad8)（第[4, 5]轮）。

- 第1轮：任务状态 `done`；run `run_v2_2ecdf7ec450e47b282f623cf235c9359`。
  业务验收：`Failed`。
  业务结果：首轮交付3个真实成片：A/Reels26.783秒、1080×1920；B/TikTok19.300秒、1080×1920；C/Shopify28.203秒、1280×720。三版均来自本例上传的300秒原视频，未串用其他用例输出。A/B成片存在原画面字幕裁切和双层字幕；B结尾品牌画面未见已提供的Shop Now CTA，已有浏览器原图。C保持横屏并增加静音可读卖点文字。
- 第2轮：任务状态 `done`；run `run_v2_34aa729b41d64de38de435cef2a156ab`。
  业务验收：`Failed`。
  业务结果：已交付Reels修正版26.783秒、1080×1920，开头及部分侧面/折叠/车身镜头改为完整画面；约7.3～11.27秒仍保留不合适的裁切，骑行主体靠边或被裁，未全面满足产品完整显示。B/TikTok、C/Shopify业务内容均与首稿一致；没有生成AI背景。
- 第3轮：任务状态 `done`；run `run_v2_6eba4d9a7b234100a540e65576ddba64`。
  业务验收：`Not Applicable`。
  业务结果：按原文提交后，应用要求说明问题镜头。补充“未用AI背景、未发现新增配件”的本轮事实后，应用明确保留真实原片，不生成无依据修正版。原A/B/C内容保持：{"A":true,"B":true,"C":true}。AI生成外观错误的修复分支未触发，不能计为该分支已验证通过。
  补槽：{"question": "确认需要修正的镜头或时间", "answer": "本轮 B-TikTok.mp4 全部取自上传原片，没有使用 AI 补背景；暂未发现新增配件或产品外观被 AI 改动。这个描述来自文档的假设场景。"}
- 第4轮：任务状态 `failed`；run `run_v2_d55dcaec8f394f9ab9d17c8aa2e78c08`。
  业务验收：`Failed`。
  业务结果：选择片段后，“生成高光工程”失败：The saved highlight belongs to a different project or revision；审阅及导出跳过，没有15秒修订成片。此前有效A/B/C内容保持：{"A":true,"B":true,"C":true}。失败的B15草稿不作为下一轮有效广告。
- 第5轮：任务状态 `done`；run `run_v2_09e7879a1a26458eb5463ab6d5c01328`。
  业务验收：`Failed`。
  前置调整：第四轮新建的B15草稿失败；选择最近有效的B/TikTok19.29秒继续，A使用第二轮局部修正版，C保持首稿；未追加提示词。
  业务结果：A/Reels安全区修正版实际文件26.783秒、1080×1920：产品镜头完整缩放至中央区域，新增字幕移到中央偏下，实际抽帧核验通过；A/B视频素材顺序和时间均保持，C/Shopify全部业务内容保持。B/TikTok在Editor batch apply失败，错误REFERENCE_CONFLICT：Snapshot original file references do not match，仍是19.29秒首稿、未交付安全区修正版。整轮未完成两版交付。

![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-initial-reels-cropped.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-initial-tiktok-cropped.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-initial-tiktok-missing-CTA.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-step-1-reels-riding-still-cropped.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-step-3-tiktok-revision-mismatch.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-step-4-reference-conflict-detail.png)


![ICP-EC-03本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-03-failed-step-4-tiktok-safe-area.png)

### ICP-EC-04

状态：Failed。

5轮原文均已执行：首轮交付35秒、540×960西语音轨/字幕视频，但实际画面仍有英语卖点、字幕及Shop Now；第2轮可折叠误译、第4轮折叠演示音画错位均为未触发假设，事实补槽后保持；第3轮CTA及第5轮英语画面文字替换仅分析、未制作修改视频。整体未完成本地化，失败原图、MP4和语音核验证据已保存。

[本例会话](https://app.cinlink.ai/c/a7055536-136f-447d-aade-b9df3407daa1)

已提交云效：[FWXC-630](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4c5033724b50514e1eee69c3c)（第[1, 3, 5]轮）。

- 第1轮：任务状态 `done`；run `run_v2_1719b738e98d456eab3efd210f0ac33a`。
  业务验收：`Failed`。
  业务结果：已交付35.000秒、540×960西语视频，实际音轨离线识别为西班牙语；字幕es-MX用“bicicleta eléctrica urbana plegable”正确表达可折叠。新配乐生成及混音完成。但实际MP4和加载完成的预览仍保留Foldable Electric Bike、Easy to Fold、Shop Now及部分原英文字幕，未完成画面本地化；应用也明确提示未处理这些文字。语音自然度、区域口音不单凭ASR计通过，末尾ASR不确定词不据此提缺陷。
- 第2轮：任务状态 `done`；run `run_v2_2eb1a9555e654ca49928820725c660d1`。
  业务验收：`Not Applicable`。
  业务结果：已核验plegable译法正确，事实补槽后应用保留当前西语版本、未切换中文；现有音视频文件、片段时间、字幕和显示样式未变。误译修复分支未触发，不能计作已修复真实错误。
  补槽：{"question": "确认误译位置（时段或西语词句）", "answer": "本轮0.36～5.02秒的字幕和实际西语配音均使用“bicicleta eléctrica urbana plegable”，未发现译成可拆卸。文档这里是误译的假设场景，并非本轮已发生的问题。"}
- 第3轮：任务状态 `done`；run `run_v2_662bbeee20aa4fe085b436abd0d19a3d`。
  业务验收：`Failed`。
  业务结果：必要补槽已指定本轮成片实际Shop Now结尾及目标Descubre más。任务只分析视频并交付video-analysis.md，没有修改视频；原有效工程全部内容与前轮一致（已回读确认），未交付Descubre más画面或配音。取证时预览等待问题单列诊断，不作为此失败依据。
  补槽：{"question": "确认结尾CTA的来源", "answer": "指本轮已交付的“ADO-Air-20-Ultra-墨西哥西语版.mp4”的末尾。实际画面目前仍是“Shop Now”，未见“Compra ahora”；本次目标是文档要求的“Descubre más”，对应结尾画面文字和配音。"}
- 第4轮：任务状态 `done`；run `run_v2_d26b4f93b6564ca79c6a10da275eea57`。
  业务验收：`Not Applicable`。
  业务结果：应用要求定位具体错配段落。按实际素材填写“原片及西语版无单独折叠演示、未定位到新增错配”后，应用保持原配音时间、语速、字幕、镜头和音乐，工程内容保持：true。音画错位修复假设未触发，不据此认定全片已完全对齐。
  补槽：{"question": "确认需要对齐的配音段落", "answer": "本轮原片和已交付的35秒西语版都没有单独的折叠操作展示或讲解。文档这里是音画错位的假设场景；目前未定位到本轮具体新增的配音错配段落。"}
- 第5轮：任务状态 `done`；run `run_v2_e5ebac14d84940048f18adb61aa02bda`。
  业务验收：`Failed`。
  业务结果：应用仅完成画面抽样分析，明确表示尚未替换或遮盖文字、没有修改视频；只列出Foldable Electric Bike、Easy to Fold、INTRO & REVIEW CONTENT、Shop Now的译文建议，未执行原文要求的直接替换或自然遮盖。有效工程内容与前轮一致：true。原表例举的Long Battery Life在本轮抽样未出现，未据此伪称已复现该词残留。

![ICP-EC-04本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-04-failed-step-0-english-CTA-remains.png)


![ICP-EC-04本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-04-failed-step-0-english-selling-title-remains.png)


![ICP-EC-04本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-04-failed-step-0-english-text-not-localized.png)


![ICP-EC-04本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-04-failed-step-2-CTA-analysis-only.png)


![ICP-EC-04本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-04-failed-step-4-text-replacement-analysis-only.png)

### ICP-EC-05

状态：Failed。

首轮Tencent VOD视频处理失败，无20秒广告首稿。第2～4轮依赖广告的外观/动作/卖点修正，缺前置未提交。第5轮已按原文独立执行：明确拒绝推测未知背面/底部并列明所需照片，填必要5秒时长后交付实际动态镜头，抽帧未见未知结构编造，该独立末轮通过。首次补槽网络失败有截图并恢复；整例完整广告目标仍Failed。

[本例会话](https://app.cinlink.ai/c/4a50ae5d-6f02-46df-a810-3416332e5108)

已提交云效：[FWXC-631](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=fc2731f00849917dfea1868f89)（第[1]轮）。

- 第1轮：任务状态 `failed`；run `run_v2_4c441f1d4198468f9e25177a0966ca73`。
  业务验收：`Failed`。
  业务结果：图片排序完成后，生成视频失败：Tencent VOD video processing failed at the provider.；裁剪/尺寸调整未执行，无20秒16:9广告交付。本次没有制作补槽，未自动重试。
- 第5轮：任务状态 `done`；run `run_v2_943653f3c194415f82fb0afaecdc7ce9`。
  业务验收：`Passed`。
  前置调整：首轮无视频，此轮独立评估源素材未知背底结构及正侧面动态展示；重绑原5张商品图、Logo和事实资料，仍无背面/底部素材，原提示词不变。
  业务结果：明确指出两张主体图角度相近，不能可靠生成完整背面/底部旋转，列出所缺完整背面、底部和关键结构近照；必要时长补槽填5秒后，交付实际5.000秒、1706×960无音轨MP4。每0.5秒抽帧与原两张图对照，镜头为已知产品图推近及切换，未见转入未知背底或编造接口/按钮。仅覆盖源角度充分性判断和替代动态展示，不代表20秒完整广告已交付；画面推近有局部特写，不将它当作完整旋转。首次补槽Failed to fetch另存原图，恢复的是未受理补槽，未重发制片任务。
  补槽：{"question": "正面和侧面的补充动态展示镜头需要多少秒？", "answer": "5", "reason": "采用页面建议的5秒，仅填写必要时长，不追加制作提示词", "transportFailure": "首次填写5秒提交后页面Failed to fetch；回读原run仍等待且无选定值，仅恢复提交该补槽一次，不重发原文任务。"}

未执行轮次：[2, 3, 4]；原因：第2～4轮依赖实际广告的外观、使用场景和卖点修正，首稿未生成；第5轮已基于原源图独立执行并通过本轮源角度判断及替代动态展示。。


![ICP-EC-05本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-05-failed-step-0-tencent-vod-provider.png)


![ICP-EC-05本轮失败原图](evidence/icp-ecommerce-original-20261116-1818/ICP-EC-05-failed-step-4-clarification-fetch.png)


## 验收与未覆盖

依据原表首稿和最终Output核验，不验证内部拟定字段/实现算法。后续假设错误未实际发生时，不能伪称已复现；任务未交付成片时，其依赖修改、语义/画面/音画准确性及导出均未覆盖。

Case01提供真实测评及同型号产品素材，但普通自行车收纳对比与参考爆款片的素材覆盖不完整；原测评约264～278秒可见真实折叠操作，必要补槽已提供同源演示片段。素材覆盖限制与实际未交付分别记录，不将全部未交付直接归因为产品缺陷。

Case 03/04使用本地预制的5分钟横版介绍和35秒竖版英语广告；它们基于同一真实产品测评制作，保留原声、来源及英语文字，分别用于比例改版与本地化测试。它们属于测试输入，不是CinLink生成结果。完整测评保存副本约605秒，拼接重叠边界画面已对照，最终文件完整解码无错误；底层分辨率变化已规范化，输入哈希和探测记录留本机。

实际成片音轨已用本机离线识别辅助核验主要语言和词句；不凭ASR错字或不确定尾词判缺陷。配音自然度、墨西哥区域口音未作人工试听验收，未触发的折叠演示音画错位修复也不计通过。

自动化入口：`tools/icp/run.mjs`；完整原提示词和前置操作见[统一入口中的电商用例](../../cases/README.md#icp-ecommerce-cases)，逐步检查点和原始截图位于本批 `reports/icp-ecommerce-original-20261116-1818/`。缺陷同步见上方后续记录；未提交或推送Git。
