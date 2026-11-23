# ERYE196-048～070 Chrome生产执行

后续提交更新：2026-11-16 ERYE196-048～070去重后已提交3条：049→FWXC-617，061/065→FWXC-621（合并），067→FWXC-622。官方OpenAPI回读验证正文、字段、6张截图和3份核验附件通过；062疑似重复不新建，053待补证。测试结果及PLAN/空脚本保持。[同步报告](../../../defects/ERYE196-048-070-sync-prod-20261116.md)。前文“只读/无写入”指前一阶段，非当前累计状态。

日期：2026-11-16。Chrome有头，https://app.cinlink.ai/，U1=yabinc92。复用专用测试工程，逐例记录目标与复位。用户允许多个浏览器；跨设备/账号须核实真实身份。固定自动化全部PLAN、脚本路径为空，报告辅助工具不计自动化实现。未提交云效。

2026-11-16缺陷证据复核：原6条Failed保留；049/061/062/065/067的明确现象可纳入候选，053缺保存确认时序、暂待补证。云效425条全文去重确认重复0类、疑似1类（062）、未检出同项3类；061/065按现象合为一类候选。未新建或更新云效。详见[确认失败与去重报告](../../../defects/ERYE196-048-070-confirmed-dedup-prod-20261116.md)。

本批已登记 23/23；13 Passed, 6 Failed, 2 Blocked, 2 Not Applicable。未登记项仍Not Run。
全ERYE196：42 Passed; 20 Failed; 5 Blocked; 3 Not Applicable; 64 Not Run。

| 用例 | 实际状态 | 结果摘要 |
|---|---|---|
| ERYE196-048 | Passed | 手动字幕与Agent BGM编辑共享历史，连续撤销/重做顺序正确。 |
| ERYE196-049 | Failed | 旧Agent结果没有用例要求的撤销/查看历史入口；跨标签部分未覆盖。 |
| ERYE196-050 | Passed | 撤销G1后提交G2，新分支保留且旧重做被禁用。 |
| ERYE196-051 | Passed | 0dB无变化请求明确不修改，未新增可撤销动作或媒体任务。 |
| ERYE196-052 | Passed | 一次持续拖拽4～6到4～6.5秒，刷新保留，一次撤销回到6秒。 |
| ERYE196-053 | Failed | 两页在对方新值尚未同步时保存甲/乙，未见冲突提示，最终均为甲。 |
| ERYE196-054 | Passed | Agent分析期间手动改C2可用，Agent完成后两项刷新均保留。 |
| ERYE196-055 | Blocked | 未提交草稿前置未能保持：不按回车输入后，独立刷新页已读到同文。 |
| ERYE196-056 | Passed | 同标签任务运行中第二命令未受理，可继续定位浏览，首请求仅执行一次。 |
| ERYE196-057 | Passed | 受理后断连并恢复，原任务查询后完整三项仅应用一次，刷新一致。 |
| ERYE196-058 | Not Applicable | 本轮Chrome入口没有已公布重复规则及可复用请求标识的真实重放操作。 |
| ERYE196-059 | Not Applicable | 未提供当前产品的实际过期规则及可复现过期记录，条件分支不适用。 |
| ERYE196-060 | Passed | 保存响应中断后重开，三项完整保存一次，无半组或重复应用。 |
| ERYE196-061 | Failed | 关闭后恢复完整，但断网分支先报失败，恢复后原请求实际执行并保存，反馈不一致。 |
| ERYE196-062 | Failed | 三项核心合法组未能保存，batch参数校验失败，刷新无半提交。 |
| ERYE196-063 | Passed | 依次保存甲乙丙，断连恢复及独立页均显示最后的丙，无重复字幕。 |
| ERYE196-064 | Passed | 第一页断连/重开期间第二页保存新文，恢复后两页及完整列表一致。 |
| ERYE196-065 | Failed | 离线提交先报失败，恢复仅同步后却执行云端改文，未要求明确重试。 |
| ERYE196-066 | Passed | Chrome保存/刷新/关闭重开及同账号Safari读取一致，补验完成。 |
| ERYE196-067 | Failed | 1MB受限配额下在线改文无法保存，进入只读未保存恢复状态。 |
| ERYE196-068 | Blocked | U1工程及未发送草稿已准备，缺获准且无PA权限的U2登录会话。 |
| ERYE196-069 | Passed | 手动保存中断时保留未确认提交，先查旧值再明确确认，刷新新值一致。 |
| ERYE196-070 | Passed | 单独上传不改30秒时间线；明确追加后新增30～62秒视频/原声，刷新保持。 |

## ERYE196-048：Passed

工程330d3e24，会话207f1460。人工把原文Efforts（0.16～0.50秒）改为手动A并按回车保存；Agent单次将唯一BGM由100%设为-6dB（界面50%），90秒完成。撤销1：手动A仍在、BGM100%；撤销2：Efforts恢复、BGM100%；重做1：手动A恢复、BGM100%；重做2：手动A、BGM50%。未出现分离历史或重复编辑组。其他字幕、视频时长20秒、配音范围未变。量化音频/费用专项未另审计。

证据：`reports/erye196-048-070-chrome-prod-20261116/048-*.ax.txt；048-final.png`。脚本PLAN/空路径。

## ERYE196-049：Failed

G1为048已保存的Agent BGM修改；随后保存C2=049远端新文形成G2。更正：此前使用super+shift+Tab没有实际切换Chrome标签，不能声称已验证T1跨页实时同步；该部分证据撤销。独立核验G1结果卡，展开后仅任务标题、Editor clip volume set详情及耗时，没有用例要求的结果卡撤销或查看历史入口；仅全局撤销可见，未拿全局撤销冒充旧组定向撤销。Failed限需求入口缺失，非越过远端G2误撤销结论。真正双标签操作已在053改用ctrl+Tab/ctrl+shift+Tab并核对独立选中标签。

证据：`reports/erye196-048-070-chrome-prod-20261116/049-*.ax.txt；049-final.png`。脚本PLAN/空路径。

## ERYE196-050：Passed

复用330d3e24工程，基线C1为手动A、C2 down、BGM50%。人工保存C1=050-G1后撤销，C1回到手动A且重做可用；Agent新批次G2单次把C2改为新分支，79秒完成。C1仍手动A、C2新分支，重做按钮disabled，旧050-G1未复活。未绕过禁用按钮构造请求。049清理仅撤销其后续G2；远端编辑后历史已以手动A/BGM50%为基线，本例明确采用该实际基线，不冒称已恢复最初Efforts/100%。

证据：`reports/erye196-048-070-chrome-prod-20261116/050-*.ax.txt；050-final.png`。脚本PLAN/空路径。

## ERYE196-051：Passed

a9a99d8f工程A0～20/B20～30、独立BGM0～20秒且100%。请求前撤销/重做均disabled。请求60秒完成，明确已为100%/0dB、未静音，未提交编辑、版本仍7。请求后BGM100%、轨道范围保持、撤销/重做仍disabled，无新增媒体生成或重复执行条目。Passed限可观察无操作与历史；独立计费账本未取得，不宣称完成后台账务审计。

证据：`reports/erye196-048-070-chrome-prod-20261116/051-*.ax.txt；051-final.png`。脚本PLAN/空路径。

## ERYE196-052：Passed

a9a99d8f原文Welcome初始4～6秒。时间轴缩放0.75，单次drag将右侧边界拖至6.50秒，轨迹连续经过中间位置，没有拆成多次拖拽。刷新并重开仍4～6.50秒；点击一次撤销直接回4～6.00秒，无需逐一撤销中间值。Second caption及视频/原声/BGM范围保持，最终恢复初始字幕范围。

证据：`reports/erye196-048-070-chrome-prod-20261116/052-*.ax.txt；052-baseline.png；052-selected.png；052-final.png`。脚本PLAN/空路径。

## ERYE196-053：Failed

a9a99d8f同工程两个独立Chrome标签，已通过ctrl+Tab/ctrl+shift+Tab及选中标签核实。第二页3G延迟下提交乙，第一页面仍显示Welcome时保存甲；第二页当时显示乙，均未出现冲突、比较或保留值选择。恢复No throttling并刷新重开第二页，最终甲，第一页面也为甲。Failed限页面未告知冲突/缺少选择处理；未抓取两个保存请求的服务端确认时序，不能进一步声称乙已完成云端持久化后被覆盖。先前错误快捷键及自动保存探测仅作准备，不作为并发执行证据。网络已恢复、DevTools关闭。

证据：`reports/erye196-048-070-chrome-prod-20261116/053-T2-delayed-save.ax.txt；053-T1-jia-overlap.ax.txt；053-T2-overlap-outcome.ax.txt；053-network-restored.ax.txt；053-T2-final-reloaded.ax.txt；053-T1-final.ax.txt；053-final.png`。脚本PLAN/空路径。

## ERYE196-054：Passed

a9a99d8f基线C1甲4～6秒、C2 Second caption10～12秒。单次发送C1改054 Agent改文后，明确思考中/停止任务时人工把C2保存为054手动保留。Agent71秒完成，仅Editor subtitle text update。最终两条目标文字和范围正确，刷新重开一致，A/B30秒、原声和BGM范围保持。利用实际分析窗口操作，没有伪造内部规划延迟或声称验证内部重新规划算法。

证据：`reports/erye196-048-070-chrome-prod-20261116/054-*.ax.txt；054-final.png`。脚本PLAN/空路径。

## ERYE196-055：Blocked

T1当前C1输入框内键入本机草稿未提交，保留文本输入焦点且未按回车。切至独立T2刷新重开后，C1已保存为同一文字。当前UI输入/离焦会自动保存，不能将该值继续视为尚未提交的本机草稿。因此未执行T2再改云端新文及草稿比较/重新应用，避免把两个已保存值的覆盖冒充草稿保护。分步：1实际输入完成；2未提交状态核验不满足；3远端写入、4冲突选择及重新应用依赖此状态，待可控草稿窗口。053并发场景不能替代本例。

证据：`reports/erye196-048-070-chrome-prod-20261116/055-local-focused-input.ax.txt；055-second-page-reloaded.ax.txt；055-precondition.png`。脚本PLAN/空路径。

## ERYE196-056：Passed

a9a99d8f单次提交C1改为056首请求已保存。页面处于思考中/停止任务时输入第二请求“仅将BGM音量设为-6dB”并按回车，未新增用户消息或第二任务；当时无发送按钮。期间成功定位第二条字幕，播放位置10秒。首任务88秒完成，一次Editor subtitle text update，C1为目标文字，BGM仍100%，第二条降音未执行。第二请求输入后来被清空，未按保留草稿判通过。Passed限当前UI任务执行期间的提交门禁及浏览；未精确控制后台保存响应阶段或单独验证HTTP延迟。

证据：`reports/erye196-048-070-chrome-prod-20261116/056-*.ax.txt；056-running.png；056-final.png`。脚本PLAN/空路径。

## ERYE196-057：Passed

a9a99d8f独立请求一次，首请求进入思考中/可停止后将本标签DevTools设Offline，保持10秒后恢复No throttling，未重发。断连时未武断显示编辑成功或失败，仍为任务进行中。恢复后同一任务一次Editor batch apply及一次只读Editor project get，111秒完成；A0～18、B18～28及对应原声；C1 057恢复核验2～4、C2 054手动保留8～10；固定BGM0～20/50%。关闭DevTools后刷新重开结果一致，未再次裁短或重复降音，未新增同一业务请求。费用未独立账本审计。此例真实成功与062前例参数校验失败分别记录，未撤销062失败。

证据：`reports/erye196-048-070-chrome-prod-20261116/057-*.ax.txt；057-offline.png；057-final.png`。脚本PLAN/空路径。

## ERYE196-058：Not Applicable

按现行用例的条件分支验收。本轮在生产Chrome页面操作，现有成功结果提供任务详情/编辑器入口，没有可复制并复用请求标识、只改参数重放原请求的实际页面操作，也未提供这类真实接口及重复请求规则。未按需求猜造command字段、端点或409，未把重复发送一条聊天指令当同一请求重放。本轮入口不适用；不宣称产品服务端不存在幂等能力或接口专项已通过。

证据：`reports/erye196-048-070-chrome-prod-20261116/058-059-current-ui-scope.ax.txt`。脚本PLAN/空路径。

## ERYE196-059：Not Applicable

现行用例明确仅当已有过期规则和真实过期记录才执行，否则不适用。本轮既有历史任务结果可打开，未取得带明确过期状态/期限和恢复入口的记录。没有自行设置TTL、修改日期或将历史普通失败伪装过期，故没有触发恢复/重试。本轮Not Applicable，不代表已验证过期恢复或无需该需求。

证据：`reports/erye196-048-070-chrome-prod-20261116/058-059-current-ui-scope.ax.txt`。脚本PLAN/空路径。

## ERYE196-060：Passed

单次核心组请求后设本标签Offline；实际任务出现Editor batch apply及只读查询，随后离线刷新明确ERR_INTERNET_DISCONNECTED，原响应连接被断开。恢复No throttling后重新加载原会话，不重试或重发。原任务80秒完成；重开工程为A0～18/B18～28及对应原声、C1 060保存恢复2～4秒/C2 054手动保留8～10秒、固定BGM0～20/50%。完整已保存而非半组，未再次裁2秒或降6dB；断网期间未观察到虚假已保存提示。此例覆盖响应丢失恢复，不宣称服务端保存失败回滚；未独立审计费用。

证据：`reports/erye196-048-070-chrome-prod-20261116/060-*.ax.txt；060-offline.png；060-response-disconnected.png；060-final.png`。脚本PLAN/空路径。

## ERYE196-061：Failed

分支A：30秒独立基线，先设本标签Offline，再发送三项核心组。页面立即显示失败/Failed to fetch并提供重试，未显示结果未知；恢复No throttling并刷新，原文请求仍在且显示思考中，本轮没有点击重试或再次发送A。原任务99秒完成一次batch及只读查询，三项完整保存为28秒、061断网前2～4秒、固定BGM0～20/50%。先前确定失败与后来原任务实际保存不一致，Failed；未取得请求标识，不能进一步断言客户端新建了重复任务。A一次撤销恢复30秒。分支B独立单次请求后5秒关闭专用T2，转原T1同会话刷新回读，不重发；原任务102秒完成，一次batch及只读查询。刷新重开为A0～18/B18～28、C1 061关闭后恢复2～4、C2 054手动保留8～10、BGM0～20/50%，未重复裁剪/降音，无半组。B通过，但A反馈失败使整例Failed。

证据：`reports/erye196-048-070-chrome-prod-20261116/061-A-*.ax.txt；061-A-offline.png；061-A-restored-running.png；061-A-final.png；061-B-*.ax.txt；061-B-final.png`。脚本PLAN/空路径。

## ERYE196-062：Failed

a9a99d8f基线A0～20/B20～30、对应原声、C1 056首请求已保存4～6、C2 054手动保留10～12、独立BGM0～20/100%。单次请求同组裁A头2秒并字幕随画面前移、C1改062核心改文、固定BGM降6dB。实际Editor batch apply失败：Editor tool arguments do not match its schema; commands.4: invalid oneOf。未点击重试。刷新重开仍30秒、两条原字幕与时段、BGM100%，未见部分写入。合法组未成立，故“完成后重复打开不重复应用”及“一次撤销恢复整组”后续未覆盖；不能把未写入当作幂等通过。此次是本例合法组功能失败，不按内部字段命名差异定缺陷。

证据：`reports/erye196-048-070-chrome-prod-20261116/062-*.ax.txt；062-core-failed.png`。脚本PLAN/空路径。

## ERYE196-063：Passed

核心组已撤销恢复30秒基线。T1将4～6秒C1依次保存甲、乙、丙，每次回车后核对页面值。随后本标签Offline并恢复No throttling，关闭DevTools后刷新重开，C1仍丙4～6秒、C2仍054手动保留10～12秒，A/B及原声/BGM保持。另新建同工程T2读取仍丙；两条原文无额外重复。覆盖本机断连重连与最终收敛，未声称控制事件序号或人为乱序。

证据：`reports/erye196-048-070-chrome-prod-20261116/063-*.ax.txt；063-final.png`。脚本PLAN/空路径。

## ERYE196-064：Passed

独立T1设Offline并刷新至网络错误，T2在线将C1丙改为064重连期间新文4～6秒并保存。T1恢复No throttling、关闭DevTools、重新加载并打开工程，读到新文；T2同样为新文。两页C2 054手动保留10～12秒及30秒视频/原声、固定BGM范围保持，列表只有两条，无遗漏/重复或回退到丙。未制造内部订阅事件或验证事件编号。

证据：`reports/erye196-048-070-chrome-prod-20261116/064-*.ax.txt；064-final.png`。脚本PLAN/空路径。

## ERYE196-065：Failed

发送前在本标签DevTools确认Offline。输入明确C1改为离线草稿并点击发送，页面立即Failed to fetch、失败、重试；输入框清空，指令留在对话记录。恢复No throttling并关闭DevTools，仅刷新同步，没有点击重试或再次发送。原记录变为思考中，64秒完成一次Editor subtitle text update，C1实际变为离线草稿4～6秒。未先保留离线草稿并要求明确重试，且失败反馈与真实执行不一致。未取得请求标识，不能断言是原已受理任务恢复还是客户端新建任务；失败结论限离线门禁/明确重试交互及实际云端改文。其他字幕、30秒视频和BGM保持。

证据：`reports/erye196-048-070-chrome-prod-20261116/065-*.ax.txt；065-offline.png；065-final.png`。脚本PLAN/空路径。

## ERYE196-066：Passed

首轮Chrome将C1保存为066跨浏览器已保存4～6秒，刷新及关闭重开同工程均一致；当时Safari未登录，曾暂记Blocked。用户随后回复已登录，实际Safari核实同账号yabinc92，补验改为Passed。此时Chrome收尾已明确保存最新基线Welcome4～6秒、Second caption10～12秒、A0～20/B20～30及原声、固定BGM0～20/100%，以cleanup-a9-baseline.ax.txt作已保存对照，不把清理后的Welcome误当旧066文字丢失。Safari直接打开同a9会话工程，资源加载完成后两条字幕与媒体范围一致；Safari刷新重开、关闭专用标签再打开均仍为相同最新基线。可点击Welcome进入启用的字幕输入区，未改文，随后Escape退出。Chrome此时前台为用户验证码邮件页，未再操控Chrome；跨浏览器证据由Chrome已保存快照与Safari实际刷新读取对照。未声称另一物理设备、跨浏览器导出或整片音画审计。

证据：`reports/erye196-048-070-chrome-prod-20261116/066-*.ax.txt；066-chrome-final.png；066-safari-final.png；cleanup-a9-baseline.ax.txt`。脚本PLAN/空路径。

## ERYE196-067：Failed

DevTools Application/Storage原站点用量约2613MB、默认配额147064MB。0MB输入未形成明确受限读数，改为1MB并实际确认2613MB used out of1.0MB(custom)，只模拟本测试站点配额，未清除任何数据或Cookie。在线把C1 066跨浏览器已保存改为067在线保存，页面进入只读，提示未保存的内容仍保留在此页面，并提供重试原始提交/导出此页面的更改/加载服务器状态等恢复入口。独立T1刷新重开仍读到旧文066跨浏览器已保存，在线提交未完成，违反本机缓存不可用不阻断在线保存。Failed；后续再造离线草稿分支因本次编辑器只读未执行，不据此断言其警告机制。未点击重试凑通过。收尾取消自定义配额，实际恢复147064MB；仅放弃本例未保存测试改文并使用服务器版本，C1恢复旧文，其他对象保持。

证据：`reports/erye196-048-070-chrome-prod-20261116/067-*.ax.txt；067-quota-zero.png（未生效探测）；067-online-pending.png；067-recovery-screen.png；067-final-restored.png`。脚本PLAN/空路径。

## ERYE196-068：Blocked

当前Chrome账号yabinc92(U1)，工程a9a99d8f已打开，真实字幕/媒体及订阅存在；输入068-U1-未发送草稿且未发送，保留截图。用户允许多个浏览器，但尚未提供第二测试账号别名/已登录位置或确认无PA权限；Safari仍登录页，另Chrome会话工具调用timeoutMs失败，不能当作已登录U2。未退出U1、未冒用其他Google账号，不用匿名访客代替U2。步骤1中U1侧准备完成；切换U2、后退/订阅/缓存隔离及恢复U1草稿依赖缺失，整例Blocked。收尾已清空本例未发送测试草稿，不修改云端内容。

证据：`reports/erye196-048-070-chrome-prod-20261116/068-*.ax.txt；068-U1-draft.png；066-safari-login-check.ax.txt`。脚本PLAN/空路径。

## ERYE196-069：Passed

当前C1 066跨浏览器已保存4～6秒。3G下编辑为069保存状态核验，记录输入中和回车提交状态；该正常值实际已保存，首次后置断网未截住此保存，不把它算未知结果。另在已Offline时编辑为069断网待确认并回车，页面明确已保留你的原始提交，请再次确认以继续编辑，提供重试原始提交/导出更改/加载服务器状态，未冒称已保存。恢复No throttling后先到独立T1刷新读取，云端仍069保存状态核验，确认新值未保存。之后在T2明确点击一次重试原始提交，恢复正常编辑；关闭DevTools并刷新重开C1为069断网待确认4～6、C2仍054手动保留10～12，媒体30秒/BGM不变。Passed限此次手动编辑的可观察未确认/恢复/已保存反馈，未精确注入服务端响应延迟或借聊天完成判保存。

证据：`reports/erye196-048-070-chrome-prod-20261116/069-*.ax.txt；069-save-interrupted.png；069-offline-save-feedback.png；069-explicit-original-retry.png；069-final.png`。脚本PLAN/空路径。

## ERYE196-070：Passed

以既有受控CFR32源制作仅追加MP4 free元数据盒的新字节测试副本，视频音频负载不变、SHA全新，文件E196-070-A32-registration-20261116.mp4，8657036字节，SHA/父源记录于070-source-manifest.json。通过当前工程导入素材上传，捕获0%/82%，完成后素材库出现新文件；原工程名不变，仍A0～20/B20～30及对应原声，总30秒，没有自动放置或新建视频工程。随后单次明确追加请求，146秒完成一次Editor media insert；新增视频/原声均30～62秒，原A/B、两条字幕及BGM0～20/100%保持。34.97秒预览新源SRC149，返回0.03秒为原A画面，确认新副本可解码且原片段可预览。刷新重开仍三视频/三原声和62秒。未导出或全片听审，不以此宣称编码级完整质量验证。

证据：`reports/erye196-048-070-chrome-prod-20261116/070-*.ax.txt；070-source-manifest.json；070-registration-only.png；070-appended.png；070-preview-new-source.png；070-preview-original-source.png；070-final.png`。脚本PLAN/空路径。

## 收尾与证据排除

a9工程：已撤销070追加，保留已登记素材；恢复Welcome4～6秒、Second caption10～12秒、A0～20/B20～30及原声，固定BGM0～20/100%。Safari同账号补验066后刷新及关闭重开已再次读取一致。临时网络限速/Offline与自定义存储配额均已恢复。

207工程：批量收尾请求schema失败，未重复原组；两条字幕经界面手动恢复，剩余BGM单项恢复请求60秒完成。目标会话的已保存AX中，49条字幕及范围、8项音量均与048撤销回基线的快照一致，详见cleanup-audit.json。最后一次刷新回读时Chrome切到其他会话88b0103c，该次cleanup-207-final-reloaded.ax.txt和cleanup-207-final.png已隔离排除，不用于本批结论，也不冒称已完成207最后一次刷新核验。随后停止Chrome写入。

报告辅助脚本不算固定自动化实现；本批固定脚本全部PLAN、路径为空。未生成用例自动化代码，未写云效、未提交或推送Git。

## 文档校验

npm run cases:check：退出码0，检查543条，问题0。仅说明用例/登记表格式合规，不代替生产用例执行。

## 055/068后续设计优化（非重跑）

2026-11-16按用户授权就地优化ERYE196-055/068：055先核验可控未保存窗口，再做远端保存、冲突保护与明确重新应用；068先核实不同账号U2无工程权限，再在同一浏览器切换核对缓存、后退、草稿及旧订阅。分步缺项单独记录，不以自动保存输入冒充草稿、不以同账号多浏览器代替U2。仅改设计未重跑，最近Blocked及PLAN/空脚本和统计不变。[分步计划](blocked-step-plan-055-068-20261116.md)。
