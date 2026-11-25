# ERYE-210 当前测试进度

2026-11-16；当前56条有效、0退役：**50 Passed / 6 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run**。

014已替换为水印开关跨TAB恢复并生产Chrome通过；原只读身份浏览及权限拒绝仍待覆盖，不因新版通过视为已验收。[本轮报告](results-014-v2-production-20261116.md)。其他55条结果保持。

| 用例 | 当前状态 | 说明 |
|---|---|---|
| ERYE210-001 | Passed | 生产中文界面五入口为媒体、文稿、字幕、配音、水印，与Media/Scripts/Captions/Voiceover/Watermark一一对应；全部可达，实际切换后返回Media。刷新解决初次创建提示后核验，工程内容及版本1均保持。仅验证本例导航，首次导入保存500另记002，不宣称保存功能通过。 [记录](results-001-005-prod-20261113.md) |
| ERYE210-002 | Passed | 首次导入20秒原片后、任何手动切页前，实际选中['媒体']，页面错误[]；无自动生成结果。 [记录](results-restored-eight-production-20261116.md) |
| ERYE210-003 | Passed | 真实字幕任务112秒完成，无补槽。结果SRT实际下载，8条英语字幕0.160～19.820秒；从该会话当前实际视频编辑器入口首次进入，选中Captions内容页。工程字幕绑定file_cloud_c7kyuocu543kpnakk5k2qdeot5，与本次结果一致；8条文字及时间一致，其他四入口均可访问。导航核验前后工程版本2和全部内容保持。 [记录](results-001-005-prod-20261113.md) |
| ERYE210-004 | Passed | 独立新建真实英语→简体中文翻译配音项目；从Media手动进入Voiceover，选择第1/2句分别定位实际起始时间，切字幕返回稿件与声音保持；未重新生成。结果卡快捷直达仍延期。 [记录](results-restored-final-five-production-20261116.md) |
| ERYE210-005 | Passed | 本例独立新工程真实分析出2个停顿候选，仅停顿/0.8秒且未移除；选择候选后切Captions→Watermark→Scripts，候选、参数和同工程审核内容保持，视频/原声/字幕仍为原结果，无自动裁剪或生成。 [记录](results-restored-final-five-production-20261116.md) |
| ERYE210-006 | Passed | Passed；从Captions通过当前真实Watermark一级→文字/图片二级控件定位，两子页切换正确；NAV006和logo-A.png保持；导航前后版本2及全部内容相同。仅覆盖实际两级入口，不宣称存在独立结果卡快捷入口。 [记录](results-006-010-prod-20261113.md) |
| ERYE210-007 | Failed | Watermark/Image重开记忆：after-close-reopen实际['水印']，Image选中=false；after-refresh实际['水印']，Image选中=false；工程保存内容保持。 [记录](results-restored-eight-production-20261116.md)；[云效FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12) |
| ERYE210-008 | Passed | 生产有头Chrome执行008 v2通过：五模块均可点当前入口收起/展开，收起后切换另一入口显示对应面板；五入口、工程标题和视频预览保留；返回Captions的8条原字幕一致；完整保存内容及版本1→1保持。没有发送Agent指令或生成任务。 [记录](results-008-v2-prod-20261113-04.md) |
| ERYE210-009 | Passed | Passed；五入口及可见子页14个检查点均保持同一工程、12秒、暂停和原C1；版本1及内容不变，会话消息0→0，导航写请求0，页面积分前后及刷新回读均3045。未提交Agent写操作，不宣称Agent执行或服务端账本专项通过。 [记录](results-006-010-prod-20261113.md) |
| ERYE210-010 | Passed | 同账号同Chrome同会话PA=Captions、PB=Media；交替选择及分别刷新后均恢复各自入口，两工程内容保持。本轮未覆盖跨账号/设备。 [记录](results-restored-eight-production-20261116.md) |
| ERYE210-011 | Passed | Passed：用户60秒英语原片的独立新工程真实中文配音及双语字幕完成，46次PB/Media观察无抢占/串改；显式工程选择器选择PA后进入Voiceover可见17条中文文稿、8段音频。结果卡快捷直达仍延期，不计覆盖。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-012 | Passed | 字幕和配音空态均可打开，有生成字幕/创建配音引导；未点击执行，完整内容及版本1→1保持，会话消息0→0，导航写请求0。 [记录](results-011-015-prod-20261113.md) |
| ERYE210-013 | Passed | 仅导入真实WAV的无视频工程：audio-only-text控件启用=False；audio-only-image控件启用=False；无意外文字水印保存。 [记录](results-restored-eight-production-20261116.md) |
| ERYE210-014 | Passed | 本例独立新工程水印OFF时文字/图片替换/宽度/透明度控件受限、两种预览隐藏；跨五TAB保持OFF及原设置；ON恢复控件、原文字和图片；文字改WM014_EDITED切页及刷新保持，图片参数及原视频/字幕/音频不串改，无Agent/导出。原只读权限继续待覆盖。 [记录](results-014-v2-production-20261116.md) |
| ERYE210-015 | Failed | 未选片段时分割禁用，实际提示['分割所选片段']；选中视频后约12秒分割并撤销恢复已完成。 [记录](results-restored-eight-production-20261116.md)；[云效FWXC-586](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d5da04deb674cf55972715cfb1) |
| ERYE210-016 | Passed | Passed：Windows图片水印空态上传可用、宽度/透明度禁用且有引导；真实PNG上传后设宽120、透明度0.6，切页/收起重开保持，原音视频及字幕未改。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-017 | Passed | Passed：本轮新工程原生生成两句旧配音，改首句后旧声保留；单次真实提交断网错误可见，恢复明确生成成功。沿同一已完成结果实时核对首句新文/新声、第二句原文/旧声及无目标旧声叠音，字幕保持。未覆盖服务端已受理后执行失败重试。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-018 | Failed | 真实新译制工程8句稿/声音就绪；首句生成处理中保存水印INDEPENDENT_018成功。原目标任务done并产出新WAV，但工程仍使用全部旧声音；沿同一任务重开配音页核验时出现“编辑器执行数据不符合正式v2协议”，新声未应用，水印保持。未重复生成。 [记录](results-restored-final-five-production-20261116.md)；[云效FWXC-588](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=6b9e807ea6785e241aae941423) |
| ERYE210-019 | Passed | Passed：首条字幕S1和22秒起独立音频A1恰选两个，一次Delete全部移除，其他字幕、原视频和原声未改；一次撤销共同恢复，切五入口及刷新保持。原受限对象拒绝/原子性仍延期。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-020 | Failed | 真实新译制工程8句稿/声音就绪；首句改“配音撤销验证020。”保存并切字幕返回正常。点击一次撤销后未恢复原稿，配音列表随后变为“暂无配音”；旧声音和字幕保持。重做及刷新最终新稿分支未执行，未点击创建配音或再次撤销。 [记录](results-restored-final-five-production-20261116.md)；[云效FWXC-589](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0dd1f5d0d3ba1d48a798f75a03) |
| ERYE210-021 | Passed | C1改CAPTION_021、水印改WATERMARK_021，切页分别保留；手工还原C1后水印不变，刷新重开仍正确，原视频/原声保持。按已保存字段操作，不以Esc或取消草稿作为条件。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-022 | Passed | 真实字号范围8～500；键入abc被浏览器拒绝为空、空值及501切页后保存值仍28；修正36后保存和刷新重开为36px。只覆盖当前水印字号数值入口。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-023 | Passed | 真实鼠标将不透明度从0.75拖至约0.35，保存值匹配；一次撤销回0.75，切页仍一致。Esc未有确认契约，不列硬条件。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-024 | Passed | 关闭启用水印，切字幕再返回仍关闭；一次撤销恢复开关及原水印完整内容，没有因导航重复应用。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-025 | Passed | 未发送输入“仅保留未发送输入025，不执行任何处理。”在五入口和同会话PB切换后保留；清空后为空，消息不增加，PA/PB内容和版本均未变。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-026 | Passed | C1“已保存字幕026”明确保存，切页及刷新重开仍正确；同一工程、C2和其余字幕、音视频、消息保持，重开未新增内容版本。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-027 | Passed | PA_TEXT_027与PB_TEXT_027分别保存，修改PA为PA_UPDATED_027后PB仍原文；PB刷新重开保持，未串改另一工程。仅验证同账号同设备。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-028 | Passed | 无分析结果的新工程仅打开文稿不产生候选/不改时间线；明确点击一次分析后出现2个停顿候选，未应用前轨道内容保持原样。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-029 | Passed | 真实分析后2个高亮停顿：取消停顿类别变0，切页返回重新勾选恢复2，点击可定位；未点移除前视频/原声/字幕保持。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-030 | Passed | 一次移除本轮两个停顿，视频与原声由20秒同步缩短为18.695896秒；一次撤销恢复应用前完整轨道和20秒，无新素材替换。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-031 | Passed | 清理结果保存后，两次刷新重开保持同一片段、时长、字幕和保存版本，未再次裁剪或重复应用。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-032 | Passed | 原8条SRT文字和顺序全部保持；逐条起止与保留视频新位置一致，例如第4条8.60～11.50→7.92～10.82，第7条17.96～18.96→16.66～17.66，未侵入字幕对应源区间。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-033 | Passed | 清空、abc、低于实际最小值和高于最大值的阈值均恢复0.8，候选和内容不变；合法1.2可用，再恢复0.8后候选恢复，未点击移除。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-034 | Passed | 清理后首条字幕改“清理后字幕034”，保存及刷新重开保持；该字幕时码、其余字幕及清理后的音视频范围/时长均未变。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-035 | Passed | PA应用停顿清理后变短，同素材PB仍为原20秒和原8条字幕；PB切换、刷新及完整保存内容核验保持，未串用PA结果。 [记录](results-021-035-v2-prod-20261113.md) |
| ERYE210-036 | Passed | C1原文改为字幕测试，Style字号80px；译文及原配音保持，没有生成任务。重开字幕仍为新文字，保存样式读回80，截图可见原文与译文独立。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-037 | Passed | 本轮新工程真实创建两句旧配音，改第1句后不自动生成且旧音频保留；明确重新生成成功，目标旧音频替换、没有叠音，第二句声音/稿件及字幕不变；沿原结果重开核验通过，片段编号沿用不作失败条件。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-038 | Passed | 新工程真实创建配音基线后，C1字幕独立稿038及第1句配音独立稿038分别保存，反查和刷新均保持，C2仍这是导航测试。，没有自动生成；页面无显式单向同步入口，条件分支按实际不操作。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-039 | Passed | 真实BGM音量改50%（约-6.02dB）、静音并保存，鼠标拖至15秒；沿原结果重开确认实际偏移、静音/音量保持，视频、原声、字幕、其他配音均未改。拖动引起轨道编号变化不作为失败条件。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-040 | Passed | 独立WAV位于14.066666666666666秒，删除前20秒、删除后20秒；其他音视频保持=True；一次撤销恢复原媒体与音频引用。 [记录](results-restored-eight-production-20261116.md) |
| ERYE210-041 | Passed | 同项目两会话实际准备A/B素材，Chat/Project基线可区分；分别按完整名称搜索命中、不存在名称无候选、清空恢复各范围列表；搜索未更换工程、添加时间线素材或生成。 [记录](results-restored-final-five-production-20261116.md) |
| ERYE210-042 | Passed | 独立新工程重新分析后搜索healthcare命中；清空搜索、最短停顿由0.8改合法1.2（真实控件0.2～10），显示停顿候选2→0；未点击移除，轨道内容未变。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-043 | Passed | 每条字幕字符数实际范围6～100，鼠标点击由60改合法31，切页及收起重开保持；源文字/时码/音频未改，一次撤销恢复60，刷新重开仍60。仅排版数据变化不判为字幕内容变化。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-044 | Passed | 真实文件选择器替换现有logo为仓库512×512 PNG，再移除图片水印；文字NAV006及原视频/音轨保持，图片引用确实变更后清空。只覆盖实测PNG，不宣称全部格式规格支持。 [记录](results-021-049-prod-20261113.md) |
| ERYE210-045 | Passed | PA/PB共享真实WAV；PA单删不改PB与原片/字幕，PB音频区间可播放；原素材卡仍在，PA复用同一file_id并刷新保持。 [记录](results-045-049-current-functions-prod-20261116.md) |
| ERYE210-046 | Passed | v3生产Chrome通过：本轮独立新工程真实分析/清理后，同页仅恢复7.800～8.480秒停顿，18.695896→19.375896秒；另一处17.200～17.824104秒仍删除。视频/原声源区间及时间线一致，8条字幕文字顺序和原画面时码对应，刷新重开保持。只分析保留片段的二次分析仍延期。 [记录](results-046-048-v3-production-20261116.md) |
| ERYE210-047 | Failed | 真实翻译配音工程8句中文声音可用；独立WAV背景音量100%→50%，保存及刷新保持；首句改“混音后重新生成047。”并明确重新生成后，页面报“编辑器执行数据不符合正式v2协议”，新声音未成功交付。未将此前无效准备判产品失败。 [记录](results-045-049-current-functions-prod-20261116.md)；[云效FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c) |
| ERYE210-048 | Passed | v3生产Chrome通过：独立新工程引用真实已完成译制的原始工程，8句既有中文声音；仅中文C1改“字幕与译制人声独立048。”，时间线配音静音→切模块/刷新保持→配音启用→刷新保持。同一批声音文件不替换/重复，英文、其他中文、视频、原声和BGM保持。未进入配音页或生成声音，原改配音稿并单句生成仍延期。 [记录](results-046-048-v3-production-20261116.md) |
| ERYE210-049 | Failed | 双水印关闭状态保存及刷新重开保持；第一次原生导出报页面协议错误且未交付可用结果，原任务后台done仅作辅助证据。沿同一受理任务复核，未再次导出；开启后的第二次导出和视频画面核验未执行。 [记录](results-045-049-current-functions-prod-20261116.md)；[云效FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266) |
| ERYE210-050 | Passed | Passed：五入口下工程切换、撤销/重做与Export可达；字幕/文字水印两项已保存修改可跨模块按顺序撤销两次、重做两次，刷新保持且音视频未改。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-051 | Passed | 2026-11-16复测Passed：生产Chrome新工程，在Captions一次提交背景音轨降低6dB请求，Agent约54秒实际执行；音量由100%变为约50.12%（页面音量线显示50%），刷新后仍50%，保存版本1→2。音轨文件/位置及原视频、原声、字幕保持，运行期间未抢占Captions。未手动拖动音量线、未重复提交任务；原11-13失败保留历史。 [记录](results-051-rerun-prod-20261116.md) |
| ERYE210-052 | Passed | Passed：真实分析2个停顿并应用，20秒变约18.695896秒；原生创建配音、首句改Welcome to CinLink并生成，背景音量50%。一次原导出完成，受理后字幕/水印新编辑保存且重开保持；下载H264/AAC、1920×1080、18.70秒MP4。原始1秒帧为BEFORE052及原英语C1，未混入AFTER052/导出后新文，已按文件/帧哈希完成实际画面审核；未再次导出。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-053 | Passed | Passed：1024×768及1280×900下五入口Tab/Enter实际可达、面板正确，Export可见可聚焦；恢复原视口后工程及完整内容保持。仅Windows及实测尺寸，不外推mac或未冻结断点。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-054 | Passed | Passed：原场景明确中英双显并保存，五入口切换保持；仅C1中文改双语独立编辑054，等待页面已同步后刷新并选回中文通道，文字保持，英语轨及音视频未改。不覆盖首次译制默认。 [记录](results-completion-nine-prod-20261113.md) |
| ERYE210-055 | Passed | 连续3轮快速切换五TAB，最终Watermark/Image连续观察稳定，同一工程、图片预览和唯一选中入口一致，无内容写入或自动生成。 [记录](results-restored-eight-production-20261116.md) |
| ERYE210-056 | Passed | 一次原生导出形成真实页面错误['编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。重新加载媒体×']；错误后Media/Captions/Watermark导航及原内容保持，未重复导出；仅导航隔离通过，不代表导出修复。 [记录](results-restored-eight-production-20261116.md) |
