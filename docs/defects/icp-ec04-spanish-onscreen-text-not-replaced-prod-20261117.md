# 【生产环境】【电商Case04】西语广告残留英文卖点和CTA，后续文字修改仅返回分析未生成修正版

云效：[FWXC-630](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4c5033724b50514e1eee69c3c)；🤔AI提缺陷，牛诗晴，生产环境。5张失败原图已上传并嵌入，10份附件及正文回读通过。本次只同步2026-11-16既有实测，未重跑产品。

**现象**

英语广告译制成西语后，配音及新增字幕已为西语，但原画面内英语标题、字幕和Shop Now仍在；继续指定CTA及英文文字替换，只交付分析文档，没有修改视频。

**前置步骤**

1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。
2. 上传附件english-ad-35s.mp4（35秒、540×960，英语原声、烧录字幕、Foldable Electric Bike / Easy to Fold / Shop Now），同时提供同型号事实表和Logo。
3. 原片及后续修改始终使用本例工程，品牌ADO及产品名保持，不手工遮盖英文代替应用。

**提示词**

第1轮原文（电商场景!B50，整段一次发送）：

```text
我是一名 DTC 电动自行车品牌的海外营销运营，现在需要把上传的英语产品广告制作成适合墨西哥市场的西班牙语版本。
请直接使用原视频的画面，帮我完成以下工作：
将视频中的英语配音翻译成自然、符合墨西哥用户表达习惯的西班牙语，并替换成西语配音。声音自然，语速不要太快，不需要模仿原配音者的声音。
将原来的英语字幕全部替换成西班牙语字幕，确保翻译准确，字幕出现的时间和配音一致。
将画面中的除字幕以外的英语卖点文字、标题和结尾 CTA 一并替换成西班牙语，例如将“Shop Now”改成“Compra ahora”。
尽量保留原来的产品镜头、剪辑顺序、背景音乐和品牌风格，不要随意改变产品画面。
如果西班牙语句子比英语长，可以适当调整字幕显示时间或配音速度，但要保证听起来自然，也不要让字幕挡住产品。
产品名称、品牌名称保持原样，不要编造产品功能、续航数据、价格或促销活动。
把背景音乐更换为符合西语市场的音乐

请制作一条完整的西班牙语广告视频，时长尽量与原视频一致。
```

第2轮原文（电商场景!B52，整段一次发送）：

```text
视频中有一处产品功能翻译错误。原视频说的是“Foldable Electric Bike”，意思是可折叠电动自行车，但西语版本翻译得不准确，让用户误以为自行车可以拆卸。请重新检查这一段的原文，将产品功能正确翻译成西班牙语，并同步修改对应的配音和字幕。其他内容不要改变。（这里如果西语看不懂，让这个任务变成翻译中文也行）
```

第3轮原文（电商场景!B53，整段一次发送）：

```text
视频结尾的西语 CTA 不太符合我们想要的表达方式。请只将结尾的“Compra ahora”修改为“Descubre más”，并同步修改结尾配音和画面文字，其他镜头、字幕、音乐和配音内容保持不变。
```

第4轮原文（电商场景!B54，整段一次发送）：

```text
西语版本中有几段配音和产品展示画面对不上。例如视频已经切换到折叠功能展示，但配音还在介绍上一段内容。请调整这几段西语配音的时间，让语音介绍和对应的产品画面保持一致。不要为了赶时间把语速加得太快，也不要修改其他正常的内容。
```

第5轮原文（电商场景!B55，整段一次发送）：

```text
视频中还有几处原本就加在画面里的英语文字没有替换，例如“Long Battery Life”和“Easy to Fold”。
请把这些英语文字替换成对应的西班牙语，并尽量保持原来的字体风格、位置和动画效果。不要让新文字挡住产品，也不要破坏文字后面的画面。
如果无法直接替换，请告诉我，并尝试使用自然的文字遮盖等方式完成修改。
```

**复现步骤**

1. 一次发送第1轮原文并等待完成，下载35秒西语视频，核对实际画面3.5秒及31.5秒的英文卖点、字幕和CTA。
2. 顺序执行第2轮原文；本次plegable译法正确，误译补槽如实说明未发生，不制造错误或切中文，完整回答见附件。
3. 发送第3轮CTA原文；必要补槽说明本轮成片末尾实际上仍为Shop Now，目标是Descubre más（原回答见附件）。等终态并检查视频是否改变。
4. 顺序发送第4轮原文；本次原片无独立折叠操作展示，音画错位假设未发生，补槽按实际说明，保留正常内容。
5. 发送第5轮英文画面文字替换原文，等待直接替换或自然遮盖结果；检查实际视频、工程及新结果是否交付。

**实际结果**

首轮交付35.000秒、540×960西语音轨/字幕视频，但Foldable Electric Bike、Easy to Fold、Shop Now及部分英文烧录字幕保留，局部新旧字幕重叠。第3轮和第5轮均done但仅返回video-analysis.md，工程内容保持，未交付Descubre más CTA/配音或英文画面文字修正版；第5轮明确称尚未替换/遮盖且无修改后视频。

**预期结果**

按原文完成音轨、字幕和画面内卖点/标题/CTA的整体西语本地化；不能直接替换时尝试自然遮盖且不伤产品。后续明确修改请求应交付可核验的视频结果，无法完成的范围应说明。

**影响**

广告仍是英西混合画面，不能作为完整墨西哥市场本地化成片交付，继续修改也未完成。

**补充**

同步标识：ICP-EC04-SPANISH-ONSCREEN-TEXT-NOT-REPLACED-PROD-20261117

- 测试日期：2026-11-16；本次为既有实测缺陷同步，未重新执行产品。
- 关联用例：ICP-EC-04；[历史会话与原输入](https://app.cinlink.ai/c/a7055536-136f-447d-aade-b9df3407daa1)（仅取证，回归另建项目）。
- 第1轮：run_v2_1719b738e98d456eab3efd210f0ac33a；状态done。
- 第2轮：run_v2_2eb1a9555e654ca49928820725c660d1；状态done。
- 第3轮：run_v2_662bbeee20aa4fe085b436abd0d19a3d；状态done。
- 第4轮：run_v2_d26b4f93b6564ca79c6a10da275eea57；状态done。
- 第5轮：run_v2_e5ebac14d84940048f18adb61aa02bda；状态done。
- 附件material-index.json记录实际源文件规格、哈希和文件标识；case-evidence.json保留本次结果及真实补槽；prompt-sequence.md含完整实际执行顺序。
- 本条合并同一画面文字未本地化及后续未执行现象；可折叠误译、折叠演示音画错位均为未触发假设，不作为缺陷；本片未确认出现Long Battery Life，不声称复现该词。配音自然度/墨西哥口音未人工试听验收，不据此提缺陷。

**失败截图**

Case04第1轮完成页：已交付西语版，页面提示画面英文替换未完成。

![failed-step-0-english-text-not-localized.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1f6560eb92cd6984ae22c1ebe1)

Case04第1轮加载完成后的3.5秒预览：英文卖点和原英文字幕仍在，局部英西字幕重叠。

![failed-step-0-english-selling-title-remains.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e982b8620edc80dada481ec124)

Case04第1轮加载完成后的31.5秒预览：结尾仍显示Shop Now。

![failed-step-0-english-CTA-remains.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=aaa8f1d589e332f3514eb8b252)

Case04第3轮：Descubre más修改任务只交付video-analysis.md。

![failed-step-2-CTA-analysis-only.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e59e26433e778a31c240aa1117)

Case04第5轮：应用明确未执行替换/遮盖、没有修改后视频。

![failed-step-4-text-replacement-analysis-only.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=58e9047fcbe4d858696d5c3d87)
