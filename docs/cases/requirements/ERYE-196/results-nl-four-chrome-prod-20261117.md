<!-- E196-NL45-UNDO-REVISION-20261117 -->
2026-11-17按用户要求就地优化ERYE196-090～134共45条，仅通过编辑器自然语言测试；122～134为13条撤销/重做专项，覆盖改文、时间、分割、裁剪、删除关联原声、复制、BGM、水印、整组恢复、多层历史和Redo分支。45条新版Not Run、PLAN/空脚本，未重跑生产；090旧失败及FWXC-657保留。原API/故障注入/M2授权专项保留历史，不冒称被本轮覆盖。[完整45条提示词及验收](revision-090-134-natural-language-undo-20261117.md)。
<!-- /E196-NL45-UNDO-REVISION-20261117 -->

<!-- E196-NL4-SYNC-20261117 -->
2026-11-17 ERYE196自然语言缺陷同步：已核验4/4组，071、076→FWXC-655（新建）；076→FWXC-638（追加）；088→FWXC-656（新建）；090→FWXC-657（新建）。7张原图及脱敏附件已OpenAPI回读；旧执行Failed和PLAN保持，未重跑生产。[同步报告](../../../defects/ERYE196-NL-071-076-088-090-sync-prod-20261117.md)。下文“未写云效”仅指原业务执行阶段。
<!-- /E196-NL4-SYNC-20261117 -->

# ERYE196自然语言四条 Chrome生产执行（2026-11-17）

按[自然语言修订](revision-071-076-088-090-natural-language-20261117.md)执行071、076、088、090；Chrome有头、生产https://app.cinlink.ai/、专用U1。目标操作通过会话指令，未直接调用编辑器API/MCP或重放请求。页面请求的被动记录仅辅助归属和保存核对；实际工程、页面、文件为判定依据。扣费和账单暂缓。

已登记4/4：{"Failed": 4}。固定脚本PLAN，路径为空。
当前检查点：四条自然语言新版已全部执行：071/076/088/090均Failed；各独立成功分支已保留，不混用旧API结论；全部轮次结束、无待重发任务，090原20秒工程保留。

| 用例 | 当前本轮结论 | 说明 |
|---|---|---|
| ERYE196-071 | Failed | 缺素材时未明确提示上传；补充后单次追加及80秒保存/刷新通过。 |
| ERYE196-076 | Failed | 缺失素材无明确说明；纠正为已可用B后仍未替换或交付成片。 |
| ERYE196-088 | Failed | 自然语言拒绝发起后立即取消；正常导出及已完成任务保护通过。 |
| ERYE196-090 | Failed | 连续查询保留同一可见结果且未改稿，但回复的下载链接为空、点击不下载。 |

## ERYE196-071：Failed

[本例生产会话](https://app.cinlink.ai/c/c7804e5f-f178-4cdd-8f92-0dfec2579d24)；登记时间：2026-11-17T07:21:54.271Z。

正式第一轮53秒结束，仅显示“核对本项目是否已有指定的60秒素材，不修改当前已打开的工程”及“编辑器素材/已完成”，没有明确要求提供U或说明缺失；刷新后仍同样，无新用户澄清。原20秒稿未变。补充U并明确第二轮追加，130秒结束；实际保存revision2，A0～20、U20～80，视频/关联原声各两段，刷新仍80秒，追加段预览可播放并看到绿色顶边。整例Failed仅因第一轮缺失的明确业务反馈，不把追加成功记失败。准备阶段额外自然语言建工程未完成，已改原生建20秒基线；补U时原生源选择曾另开U60工程，已切回原PA并核验20秒后才发送正式第二轮，该切换不归咎产品自动追加。未直接调用编辑器API/MCP。

证据：071-1-finished.png/.txt；071-U-ready-PA-restored.png/.txt；071-2-ended-before-refresh.png/.txt；071-reloaded-80sec.png/.txt；071-appended-U-preview.png/.txt；turns.json及被动network-local.json。自动化PLAN/空脚本。

## ERYE196-076：Failed

[本例生产会话](https://app.cinlink.ai/c/c2c68438-a160-4a48-a143-bd470297a9b6)；登记时间：2026-11-17T07:26:53.001Z。

独立会话c2c68438-a160-4a48-a143-bd470297a9b6，原生准备20秒工程58fb4b35-ad2c-4a9c-8f6a-7ad122438212。缺失文件的项目搜索实际返回0项；正式第一轮58秒结束，仅列“编辑器素材/检查编辑项目/已完成”，未说明缺素材、未改稿/导出。第二轮明确纠正为项目已可用E196-U071-R2-20261117-60s.mp4的0～20秒，79秒结束仍仅检查素材/工程，未执行替换或导出，没有下载卡，也没有澄清问题可补。已再次从原生媒体面板确认B存在；刷新重开PA仍revision1、完整content与20秒A基线一致。Failed按自然语言未执行明确有效纠正、未交付文件及缺失说明判定；未调用编辑器API/MCP补做替换或导出，不将原稿保持误算替换成功。

证据：076-missing-name-check.png/.txt；076-1-ended-no-missing-explanation.png/.txt；076-2-ended-no-replacement-export.png/.txt；076-corrected-B-available.png/.txt；076-reloaded-original-A-no-export.png/.txt；turns.json、network-local.json。自动化PLAN/空脚本。

## ERYE196-088：Failed

[本例生产会话](https://app.cinlink.ai/c/39c96e1a-63b0-4390-ade8-874444f7e49f)；登记时间：2026-11-17T07:32:51.195Z。

独立会话39c96e1a-63b0-4390-ade8-874444f7e49f，原生20秒保存稿1ae1f144-0177-401e-94fd-16c44693546c。第一轮63秒后明确回复：工具未声明受理即返回任务ID，无法执行该取消测试；没有创建NL088-CANCEL，没有用聊天停止冒充取消。按新版自然语言功能要求该分支Failed，不把工具能力限制写成测试环境Blocked，也未拿旧MCP失败结论替代。第二轮正常导出NL088-DONE，41秒交付；本轮原生下载成片7,880,000字节，20秒1280×720 H.264/AAC，完整解码通过。下载监听15秒超时后核验并另存浏览器唯一新增的已完成GUID文件，没有重发导出。第三轮24秒明确依据上一实际工具结果说明已完成、不能取消并保留文件，不创建任务。刷新后已有交付仍在、原工程revision1/content语义完全保持，已完成保护分支Passed。整例Failed因第一轮自然语言取消能力未完成；未验证账务、未直接调用API/MCP补测。

证据：088-1-explicit-cancel-unsupported.png/.txt；088-2-done-downloadable.png/.txt；088-3-completed-task-protected.png/.txt；088-refreshed-result-preserved.png/.txt；088-NL088-DONE.mp4；088-decode.log；088-download-evidence.json；turns.json和network-local.json。自动化PLAN/空脚本。

## ERYE196-090：Failed

[本例生产会话](https://app.cinlink.ai/c/60c557d4-b8b1-4a51-a7fd-22600a695321)；登记时间：2026-11-17T07:39:51.332Z。

独立会话60c557d4-b8b1-4a51-a7fd-22600a695321、工程ff20cce0-0976-48eb-9754-98bc2707fa56。首轮66秒导出NL090-ONE，后续三轮分别30秒、30秒、3.9秒，只确认同一已有结果，三轮前后可见导出成品卡始终1份、未出现新的独立导出步骤，原稿无修改。第三轮“可下载已有结果：下载NL090-ONE.mp4”的实际a元素为href=""、target="_blank"；真实点击后只新开同一会话页，35秒内无下载事件且下载目录无新增文件。前两轮文件链接同样为空，刷新后仍为空。对照：点击原成品卡的原生下载按钮正常取得7,880,000字节、20秒1280×720 H.264/AAC MP4，完整解码通过，SHA与本轮088同内容正常对照一致；未将此对照按钮下载冒称回复链接成功。刷新原工程revision1/content语义保持，原卡文件仍可用。整例Failed仅因自然语言提供的实际下载入口无效；只读接续和可见结果保持分支通过，底层HTTP幂等/账务未验证。由空链接打开的重复会话页已取证并关闭，原测试页保留。

证据：090-1-single-result.png/.txt；090-2-query-result.png/.txt；090-3-query-result.png/.txt；090-4-existing-file-response.png/.txt；090-query-download-empty-href.png/.txt；090-empty-link-opened-same-conversation.png；090-refreshed-single-result-empty-links.png/.txt；090-NL090-ONE-original-card.mp4；090-decode.log；turns.json、network-local.json。自动化PLAN/空脚本。

## 执行与证据边界

完整真实提示词及发送时间保存在本机turns.json，各轮正文/截图和被动网络原文保存在reports/erye196-nl-four-chrome-prod-20261117/。带local文件仅本机保留，未外传凭据或临时签名链接。没有自动写云效、没有Git提交；技术旧结果不抵新版通过，未知任务先读取页面结果、不盲目重发。

## 收尾核验

本轮11条正式提示词＋4条准备消息均有独立发送记录，未重发已受理导出。071保留80秒追加后工程；076保留原20秒稿；088保留正常对照成片和已完成说明；090保留原20秒稿及唯一可见结果，空下载链接打开的重复标签页已关闭。两份对照MP4已实际下载并完整解码通过；这不能替代090回复链接失败的结论。账务未验证。

四条最新均Failed，独立通过的分支见各条说明。ERYE196全134条当前50 Passed、34 Failed、3 Blocked、3 Not Applicable、44 Not Run；070～090按最近证据合并9 Passed、12 Failed，非21条本次全重跑。用例格式检查npm run cases:check通过，543条、issues=0；另核对4条实际登记及PLAN/空脚本、15条唯一发送记录与两份实际成片文件。
