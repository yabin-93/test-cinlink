# 【生产环境】视频或原生BGM平移、分割及裁边误带原声，刷新后保留错误

已同步[FWXC-699](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=5358262d15393bcd3c20790044)，截图上传及正文嵌图回读通过；用例保持Failed。

**现象**

编辑器仅操作视频或原生BGM时，原声也被连带平移、分割或裁剪；刷新重开后仍保留错误。将ERYE199-081、083、084、085中的同类失败合为本缺陷。

**前置步骤**

1. Windows / Ego Lite 登录生产环境 app.cinlink.ai，账号有工程编辑权限且测试积分充足。
2. 新建专用项目；每个操作使用独立会话和未编辑的原生工程，选附件F20原片（20秒、1280×720、30fps）完成“翻译配音 / 配音和字幕 / 简体中文 / 译文”，确认有字幕、视频、原声、配音和原生背景音乐。
3. 081另备附件12秒独立音频D及音乐B；通过“媒体→导入素材”登记后分别放入新音频轨6～18秒和2～14秒，与任务原生BGM区分。

**提示词**

四条用例的最短准备路径均可用T1：`将这条视频翻译成简体中文配音，并显示简体中文字幕。`

本批实际复现的其他卡片准备指令如下；E使用F20，C/H使用附件60秒F60，G不附加视频。完整提示词一次发送，不引用旧产物。

| 场景/卡片 | 页面参数 | 完整提示词 |
|---|---|---|
| T1 翻译配音 | 简体中文 / 译文 | 将这条视频翻译成简体中文配音，并显示简体中文字幕。 |
| T2 翻译配音 | 简体中文 / 双语 | 将这条视频翻译成简体中文配音，并显示中英双语字幕。 |
| E 画质增强 | 2倍 | 将这条视频的画质增强2倍，保留完整时长和原音。 |
| C 去口水词 | 默认 | 去掉这条视频中的口水词和多余停顿，保留其余内容与原音。 |
| H 长视频变短 | 30秒 | 将这条视频剪成30秒高光，保留原音。 |
| G AI 生视频 | 5秒、16:9 | 固定镜头拍摄一只红色杯子放在木桌上，背景为浅灰色墙面。 |

正式平移、分割和裁剪均为页面操作，无额外Agent提示词。

**复现步骤**

1. 在新会话选择上述卡片和参数，附加对应原片并发送一次完整提示词，等待完成，从本轮结果点击“进入编辑器”，展开时间轴。C/H出现方案审核时核对并确认；H基线不足30秒时在审核页调整末段至30秒再确认。本批未出现需填写的补槽。
2. 081：导入并放入D、B，先将普通音乐B由2～14秒移到3～15秒，核对其他轨不动，再撤销；随后将任务自带BGM由0～20秒右移到1～21秒，核对视频、原声、译声、字幕及B/D位置。
3. 083：用另一未编辑工程，选中0～20秒视频，把播放头放在10秒，点击“分割所选片段”，核对视频、原生BGM和原声各有几段。
4. 084：用另一未编辑工程，抓视频主体向右平移1秒，核对视频、原生BGM和原声的起止时间，避免抓到边缘或制造同轨重叠。
5. 085：分别用未编辑工程将视频左边缘向右裁0.5秒、右边缘向左裁0.5秒，核对原声是否被同时裁减；左、右边缘分开核验，不连续叠加操作。
6. 各操作后检查非目标轨；点击撤销应回到该操作前，重做再现编辑，再刷新并从该轮结果重开，核对错误是否仍存在。其他卡片按同法分别验证，不在有错误基线的工程继续做依赖操作。

**实际结果**

| 用例/操作 | T1代表性实测结果 |
|---|---|
| 081，移动原生BGM | BGM和视频从0～20变1～21秒时，原声也变1～21秒；独立B/D及字幕、译声保持。 |
| 083，在10秒分割视频 | 视频、BGM拆成0～10和10～20秒，原声也被错误拆成相同两段。 |
| 084，视频主体右移1秒 | 视频、BGM变1～21秒，原声也从0～20变1～21秒。 |
| 085，视频左右裁边 | 裁头时原声入点和开始位置也增加约0.5秒；裁尾时原声出点也减少约0.5秒。 |

对应24个失败变体均有操作后及重开证据。撤销可恢复，重做及刷新保留错误。不同工程的具体分段、时码及run/会话/工程标识在附件evidence-summary.json；仅把原声的错误联动判失败。

**预期结果**

视频仅与原生BGM按已确认规则双向联动；对任一方的移动、分割和裁边不改变原声、译声、字幕和普通导入B/D。无原生BGM的工程仅修改目标视频；非目标片段的时间、源范围保持。保存重开应保留正确结果。

**影响**

常用视频编辑会误改原声时间及源范围，破坏用户已安排的声音位置；影响译配、增强、去口水词、高光及生成视频的后续精剪。

**补充**

同步标识：ERYE199-081083084085-ORIGINAL-AUDIO-COUPLING-PROD-20261119

对应081的1个、083的5个、084的6个、085的12个失败变体，按同一业务现象合并，不推断内部代码根因。083-T2因额外字幕轨导致基线不符，未执行分割，单列另一缺陷。
原片/本轮产物对应核验均正确。071已知译文预览问题FWXC-693保留，不纳入本条；原声轨是否静音不改变其应保持原位置的预期。

**失败截图**

081：普通导入音乐B和独立音频D放入后的基线。

![081-T1-B-placed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=71ae5d85a175e6f77d59ed3371)

083：分割前原生五轨及完整原声基线。

![083-T1-split-baseline-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=24d24b4c9094429ca99e4f46ef)

084：视频主体平移前基线。

![084-T1-move-baseline-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=088dd1a4109eb5d7f74cb128ba)

085：裁头前基线。

![085-T1-trim-head-baseline-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7b07a65fd5bf56b1d489ea723f)

085：裁尾前基线。

![085-T1-trim-tail-baseline-verified.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4d2ac263060bc8cc66356467f4)

081-T1：原生BGM右移1秒后，原声被误联动；重开后错误保留。

![081-T1-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f1f41169efa3d3d5983da87892)

083-T1-split：视频分割后，原声被误联动；重开后错误保留。

![083-T1-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1091ea371d57d63c611ea0b9fb)

083-E-split：视频分割后，原声被误联动；重开后错误保留。

![083-E-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=18ff81939bff70a5c6fa8095e2)

083-C-split：视频分割后，原声被误联动；重开后错误保留。

![083-C-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=53bf0927a62b43bc03cd9a8749)

083-H-split：视频分割后，原声被误联动；重开后错误保留。

![083-H-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0d78ab9eeca48728d4726a9e69)

083-G-split：视频分割后，原声被误联动；重开后错误保留。

![083-G-split-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1134c2a5c05f8385985386a791)

084-T1-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-T1-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=556fe40af9052767bdb12f8264)

084-T2-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-T2-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e450be4b94e86ef0521594a495)

084-E-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-E-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=cf3fb1987959c1949bcebdc99c)

084-C-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-C-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5388f7280ecf9eb7ffe6307a8c)

084-H-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-H-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d76a66a5d4f5754232b572eaa2)

084-G-move：视频主体右移1秒后，原声被误联动；重开后错误保留。

![084-G-move-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=864a3253d61eb9448623ef42e1)

085-T1-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-T1-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=1109a9c9096409e0becbe311bf)

085-T1-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-T1-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=a9d66a3e37789af796935e1364)

085-T2-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-T2-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=647dead743a2c326dec531d65c)

085-T2-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-T2-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=506094ac6f3b90348c7622d25f)

085-E-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-E-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=c006a82ac95216d8255b187bcc)

085-E-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-E-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=cb4243dbc2d649e2393d263379)

085-C-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-C-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=953d0abd191911d5cf7f18ebd6)

085-C-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-C-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=802bc0f643384afafd67089ede)

085-H-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-H-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=254d329e6897ef9420a47b3541)

085-H-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-H-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6bcc055b5a9bbfd292d3a88f9c)

085-G-trim-head：视频裁头0.5秒后，原声被误联动；重开后错误保留。

![085-G-trim-head-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=ff52e06b9b248e18f56d2b454a)

085-G-trim-tail：视频裁尾0.5秒后，原声被误联动；重开后错误保留。

![085-G-trim-tail-failure-after-reopen.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=241c37a7575bb9d2c0db67d471)
