# FWXC-327 正式环境回归（2026-11-12）

> 最新[同日R2续补](FWXC-327-retest-prod-20261112-r2.md)已补齐三个缺口，累计九分支文本交付/乱码专项Passed，官方API已设✅AI通过并回读。下方保留首轮过程，不覆盖续补结论。

本轮分支状态：Passed 6、Blocked 3。已完成本轮可执行分支；存在覆盖阻塞，整项不改AI通过。

原缺陷为九条SRT/summary.md文件卡无法直接下载，以及TRANSCRIBE-P01的SRT乱码。本轮按原生产环境、原同名素材、原指令逐项验证，不能把MP4当SRT通过；快捷参数无法选中时不提交参数不符的任务。

- 有头Chrome，账号yabinc18，复用生产测试项目；每条实际受理任务均独立干净新会话，仅SUMMARY-P03另选真实@候选。进入空白页核实项目名称，后续明确使用project_id=9ccba5a7-6b36-4630-9923-15e60a10b0c6。不是今天新建项目，不声明原项目的历史账号/后端绑定已覆盖。
- 原片American+Vs+Asian+Culture.mp4，31001109字节，SHA256 2d9cb7a00357b4d61092566491031f17ed9e217210cf54e2774b48b242b62801；本机路径见FWXC-327/source-audit.json。原缺陷无旧哈希，不冒称与原上传文件逐字节同一。
- 每份文本实际从页面文件卡下载，Chrome回读具体文件名及完成状态，再复制原始字节审计；SRT严格UTF-8解码、序号/时间/正文结构、语言和可读性检查。未完整人工听审逐字准确率；可读词语偏差不等同编码乱码，不验证视频讲者观点的真实性。

| 分支 | 本轮状态 | 新会话 | UI耗时/秒 | 实际下载 |
|---|---|---|---:|---|
| TRANSCRIBE-P01 | Passed | [b18b989c](https://app.cinlink.ai/c/b18b989c-cc23-4fb0-bbd2-374626d391e5) | 94 | 中文字幕 (3).srt，1285字节，13条 |
| TRANSCRIBE-P02 | Passed | [b4bb93e4](https://app.cinlink.ai/c/b4bb93e4-b907-45b9-a972-85121176d9c4) | 89 | 中文字幕 (4).srt，1285字节，13条 |
| TRANSCRIBE-P04 | Blocked | 未受理/未执行 | — | 未取得 |
| TRANSLATE-P01 | Blocked | 未受理/未执行 | — | 未取得 |
| TRANSLATE-P02 | Passed | [fc221f9e](https://app.cinlink.ai/c/fc221f9e-141c-4af9-8c5c-f633e46040a1) | 121 | subtitles (3).srt，1327字节，13条 |
| TRANSLATE-P04 | Blocked | 未受理/未执行 | — | 未取得 |
| SUMMARY-P01 | Passed | [23547ca0](https://app.cinlink.ai/c/23547ca0-543e-4b17-92a9-789b9050b1fd) | 104 | summary (5).md，383字节 |
| SUMMARY-P02 | Passed | [3ee75660](https://app.cinlink.ai/c/3ee75660-e358-450c-bb2a-b320dcbeb016) | 78 | summary (6).md，428字节 |
| SUMMARY-P03 | Passed | [1d6911f9](https://app.cinlink.ai/c/1d6911f9-7cf1-4212-bb22-11e65e743cdb) | 111 | summary (7).md，434字节 |

TRANSCRIBE-P01按/添加字幕、不翻译/原文，正文“把中文语音转成字幕”，本轮实际得到独立中文字幕SRT，补齐上轮只交MP4造成的文件覆盖缺口。P02不选快捷，原正文“把视频里的中文语音转成中文 SRT 字幕文件，不烧录进视频”。两轮独立94/89秒，各1285字节、13条，0.34～47.16秒，SHA256均d6687e3a1e5cbb5fd0aa6bf0c4b81e8348f3a70f18ea90bffde74b1990a57815；相同字节不代表替代执行，两次下载/会话证据独立保存。

TRANSLATE-P02原精确指令“将这段中文视频翻译成英文字幕文件，保留原声，不生成配音”，121秒，英文SRT1327字节、13条、0.34～47.16秒，SHA256 ad39784075aae0e735ff5232c285a1732b10bab4d04ae46e1af16b347fb8858a。任务受理后Mac再次锁屏，用户解锁后只读取原会话终态和下载，没有重新提交。

三条总结原文分别为“总结这段视频的主要观点”“用中文分三点总结这段关于中西文化差异的视频，不要生成新视频”“看看 @American+Vs+Asian+Culture.mp4 主要讲了啥”；P01保留/总结视频快捷入口，P02纯文字，P03真实@候选。实际MD为383/428/434字节，全部严格UTF-8、非空且中文可读；P02正文确为三条项目符号。P02等待期间活动页切到云效列表，已只返回本轮CinLink标签，未操作云效界面或重发；327-S02-04记录的是该无关页，不作验收截图。三份SHA256及完整原文在各SUMMARY-P0N-audit.json。

快捷参数覆盖阻塞：TRANSCRIBE-P04需要English/译文，但原生AX语言列表将全部选项合并为一条文本，键盘选择后仍不翻译/原文；TRANSLATE-P01需要翻译字幕/English/译文，模式列表合并，点击实际选成首项配音，未得到翻译字幕。TRANSLATE-P04同样依赖翻译字幕，故也未提交；其双语文件未生成，不拿其他分支代替。三条均业务提交0，P04仅草稿、翻译P04为共同前置阻塞而未另建实际会话。坐标控制持续noWindowsAvailable；已按受支持文档检查同一Chrome标签的扩展接口，DOM/evaluate报timeoutMs、语义读取超时，未恢复。再次人工解锁后安全坐标点击复核仍报同错，见control-after-second-unlock.json。这不是产品字幕/翻译失败的证据。

每分支最新执行元数据及指令：reports/fixed-regression-20261112-current/FWXC-327/progress.json。文件审计和原始文本同目录；AX/未修改截图在批次根目录327-TC01/TC02/TC04/TR01/TR02/S01/S02/S03前缀。327-TR02-05只有再次锁屏提示，无新截图，不伪造画面。控制器等待中不重发已受理任务。

云效保持已修复，未新增评论/缺陷或改AI通过；逐项完成且全部必要覆盖通过前不改状态。无Git提交/推送。本报告只记录本轮，不使用11月11日结果判通过。

## 同日续补最新结果

[2026-11-12 R2续补](FWXC-327-retest-prod-20261112-r2.md)：原未受理三个参数分支已用独立新会话完成，三份真实SRT下载和格式／编码检查通过；累计本日九分支乱码专项Passed，官方API已改✅AI通过并回读。此处保留早前六通过／三阻塞的冻结过程，不以其旧阻塞覆盖续补结论。
