# ERYE-210 九条优化与补齐执行结果（2026-11-13）

本页为2026-11-13历史批次。051已于2026-11-16独立新工程复测Passed；[最新复测](results-051-rerun-prod-20261116.md)，[当前进度](execution-status-current.md)。下文原8P/1F及失败截图保留历史。

**本轮9条：8 Passed / 1 Failed（051） / 0 Blocked / 0 Not Applicable / 0 Not Run。** 全部43条当前：36 Passed / 1 Failed / 6 Blocked / 0 Not Applicable / 0 Not Run。仍阻塞的是014和045～049，未扩大本轮范围。

用户确认优化011/017/019，补齐016/050～054并测试。本轮按当前页面业务能力在生产Windows有头Google Chrome执行，各例独立工程、串行、零自动重试；原11条失败仍退役，既有云效缺陷保持。

[完整前置、提示词、步骤与预期](case-nine-optimized-supplement-20261113.md) · [当前进度](execution-status-current.md) · [逐条结构化结果](execution-status-completion-nine-20261113.json) · [原始截图与SHA-256清单](evidence-completion-nine-prod-20261113/manifest.json)。

## 逐条结果

| 用例 | 结果 | 实际核验 | 场景和截图 |
|---|---|---|---|
| ERYE210-011 | Passed | Passed：用户60秒英语原片的独立新工程真实中文配音及双语字幕完成，46次PB/Media观察无抢占/串改；显式工程选择器选择PA后进入Voiceover可见17条中文文稿、8段音频。结果卡快捷直达仍延期，不计覆盖。 | [会话](https://app.cinlink.ai/c/35f6308b-cc03-4eab-aedf-8d13243ef472) · [截图](evidence-completion-nine-prod-20261113/011-011-target-language-result-project.png) |
| ERYE210-016 | Passed | Passed：Windows图片水印空态上传可用、宽度/透明度禁用且有引导；真实PNG上传后设宽120、透明度0.6，切页/收起重开保持，原音视频及字幕未改。 | [会话](https://app.cinlink.ai/c/82c569ed-5625-48f8-8cc5-aa5ef979429f) · [截图](evidence-completion-nine-prod-20261113/016-016-v2-reopened.png) |
| ERYE210-017 | Passed | Passed：本轮新工程原生生成两句旧配音，改首句后旧声保留；单次真实提交断网错误可见，恢复明确生成成功。沿同一已完成结果实时核对首句新文/新声、第二句原文/旧声及无目标旧声叠音，字幕保持。未覆盖服务端已受理后执行失败重试。 | [会话](https://app.cinlink.ai/c/93d0397b-d373-4dfe-b8d8-57d119c27d3b) · [截图](evidence-completion-nine-prod-20261113/017-017-original-result-live-verified.png) |
| ERYE210-019 | Passed | Passed：首条字幕S1和22秒起独立音频A1恰选两个，一次Delete全部移除，其他字幕、原视频和原声未改；一次撤销共同恢复，切五入口及刷新保持。原受限对象拒绝/原子性仍延期。 | [会话](https://app.cinlink.ai/c/9985e36b-2125-4b31-a0fe-c2161f91ec5a) · [截图](evidence-completion-nine-prod-20261113/019-019-one-undo-restored.png) |
| ERYE210-050 | Passed | Passed：五入口下工程切换、撤销/重做与Export可达；字幕/文字水印两项已保存修改可跨模块按顺序撤销两次、重做两次，刷新保持且音视频未改。 | [会话](https://app.cinlink.ai/c/b5b091df-ccf6-46df-9bee-545692bb39be) · [截图](evidence-completion-nine-prod-20261113/050-050-redone-and-reopened.png) |
| ERYE210-051 | Failed | Failed：在Captions明确请求将本工程唯一独立背景音轨降低6dB，Agent以缺少真实音轨/片段标识为由未安排执行，仅给出手工建议；目标音量仍100%，未达到约50.12%，原素材保持。已保存完整提示词、原回复和实际音量控件截图，未同步云效。 | [会话](https://app.cinlink.ai/c/044e1172-f9d6-4f43-b3c9-d435040c003a) · [截图](evidence-completion-nine-prod-20261113/051-051-real-volume-control.png) |
| ERYE210-052 | Passed | Passed：真实分析2个停顿并应用，20秒变约18.695896秒；原生创建配音、首句改Welcome to CinLink并生成，背景音量50%。一次原导出完成，受理后字幕/水印新编辑保存且重开保持；下载H264/AAC、1920×1080、18.70秒MP4。原始1秒帧为BEFORE052及原英语C1，未混入AFTER052/导出后新文，已按文件/帧哈希完成实际画面审核；未再次导出。 | [会话](https://app.cinlink.ai/c/705886fd-43c2-4b69-859f-23da35689896) · [截图](evidence-completion-nine-prod-20261113/052-original-052-export-frozen-frame.png) |
| ERYE210-053 | Passed | Passed：1024×768及1280×900下五入口Tab/Enter实际可达、面板正确，Export可见可聚焦；恢复原视口后工程及完整内容保持。仅Windows及实测尺寸，不外推mac或未冻结断点。 | [会话](https://app.cinlink.ai/c/d191ece5-b86d-4285-919b-c6c5555c403c) · [截图](evidence-completion-nine-prod-20261113/053-053-1024-keyboard.png) |
| ERYE210-054 | Passed | Passed：原场景明确中英双显并保存，五入口切换保持；仅C1中文改双语独立编辑054，等待页面已同步后刷新并选回中文通道，文字保持，英语轨及音视频未改。不覆盖首次译制默认。 | [会话](https://app.cinlink.ai/c/e8272850-188e-4a68-b685-b4c1a41ee496) · [截图](evidence-completion-nine-prod-20261113/054-054-independent-edit-reopened.png) |

## 051失败与回归步骤

[本地缺陷记录](../../../defects/ERYE210-051-agent-background-volume-production-20261113.md)。在Captions一次提交明确工程及唯一背景音轨的降低6dB指令，Agent约49秒后结束回复，但未安排执行，实际音量保持100%。回复明确告知无法定位并建议手动操作，未把其回复描述为已完成音量修改。

完整实际提示词：

> 只把当前工程“ERYE210-051-76e423f8”中唯一独立背景音轨（目前音量100%，起点0秒）降低6dB，音量线性值约0.501187。保留音轨位置、原视频、原声、字幕和配音，不裁剪、不替换素材、不导出、不新建工程，也不修改其他工程。

实际回复关键内容：目标值约50.12%，但当前工程摘要未提供真实音轨及片段标识，无法安全自动定位，建议手动修改。原工程、素材及字幕保持；当前无选区自动定位分支未通过。

![051实际请求、拒绝执行回复及背景音轨现场](evidence-completion-nine-prod-20261113/051-051-real-volume-control.png)

## 052原导出画面核验

本轮实际清理2个停顿，视频由20秒变约18.695896秒；原生配音和50%背景音量保存后，仅点击一次全局Export。受理后将C1改“导出后新文052”、水印改AFTER052，收起并重开，修改保留。

原导出任务为`41efeaba-68c8-492a-9650-d9143d896a24`，文件`file_cloud_uinxlne6no4cijemcb4ktq25m3`。下载实际MP4为1920×1080、H264/AAC、18.70秒；实际查看1秒原始帧，右上为BEFORE052，底部为原英语C1，没有AFTER052或后改中文字。审核绑定原MP4与帧哈希，沿同一已完成导出任务续验，未再次导出。

![052实际导出原始帧：BEFORE052及原英语C1](evidence-completion-nine-prod-20261113/052-original-052-export-frozen-frame.png)

[媒体实查](evidence-completion-nine-prod-20261113/052-export-probe.json) · [画面审核与文件/帧哈希](evidence-completion-nine-prod-20261113/052-visual-review.json)。只做本例业务、结构和该帧抽样，不代替整片逐帧、逐句听辨、字幕排版或音画同步质量专项。

## 优化范围与历史

- 011验当前真实工程选择器＋Voiceover，后台原片配音隔离和结果内容通过；旧结果卡快捷直达未覆盖，继续延期。首轮准备提示词多加了页面不提供的非克隆默认音色限制，任务仅交字幕；保留原任务记录，移除此额外限制后用新独立场景按现有默认设置执行，不重发原任务。
- 017正式基线是在本轮新工程通过页面原生生成的两句真实配音。首轮旧来源复制基线曾留下新旧音频重叠，单列附带观察，不算已修复；原生基线复核没有目标旧声叠音。脚本曾以内部空字段误判第二句文稿，已修正为页面文案、声音和实际时间线验收，并沿原已完成生成实时复核，未重复生成。客户端提交失败覆盖，不外推服务端已受理后执行失败重试。
- 019验两个独立合法对象同次删除和一次撤销；旧受限对象拒绝/混合原子性继续延期。
- 053只验Windows及1024×768、1280×900实测尺寸，不外推mac和未冻结断点。054验用户显式两开后保持及中文独立编辑，不替代首次译制默认。054脚本已补等待保存同步、刷新后明确选择中文通道，在原场景完成核验；中途未等待同步的状态不作为已保存数据丢失缺陷。

## 脚本与验证

011/017/019/050～054在`tests/editor/erye210-completion.spec.ts`，016在`tests/editor/erye210-navigation.spec.ts`；旧011/017/019注册移除，无重复编号。默认43个有效入口：37 AUTO、6仅前置门禁，PLAN为0。

命令：`npm run test:editor:210 -- --grep 'ERYE210-(011|016|017|019|050|051|052|053|054) '`。本轮分批保存准备/断言修正及原场景续验，原始日志位于`reports/editor-210/prod-completion-nine-20261113-01`至`06`。最新业务结果以本报告和逐条结构化记录为准，早期准备/脚本失败不隐去，未以历史回放代替本轮实际页面核验。

未提交云效、未更改既有缺陷状态、未提交或推送代码。


## 2026-11-16 入口说明补充

背景音量可通过音频轴上可上下拖拽的音量线手动调整。051记录的是Agent未按指令调音；核验原结果时只读取该音量线反馈，不手工改变失败现场。此补充仅澄清入口，无新增页面执行，原8 Passed / 1 Failed及证据保持。
