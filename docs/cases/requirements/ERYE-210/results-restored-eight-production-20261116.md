# ERYE210 六条恢复及两条新增：生产Chrome执行（2026-11-16）

<!-- ERYE210-007015-YUNXIAO-20261116 -->
ERYE210-007 → [FWXC-585](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b16072b80de8184ee47ca7bb12)；ERYE210-015 → [FWXC-586](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d5da04deb674cf55972715cfb1)。6张本轮原图已上传/嵌入，12附件及正文/字段/图片引用回读通过；状态🤔AI提缺陷，牛诗晴，生产环境。007中/3-一般，015低/4-轻微。两例仍Failed，当前51条46P/4F/1B；原FWXC-488/493及其余关联保持。本次仅同步既有失败，未重跑产品。 [同步明细](defects-007-015-restored-production-20261116.md)。此前“未云效写入”指原执行阶段。
<!-- /ERYE210-007015-YUNXIAO-20261116 -->


当前有效51条：46 Passed / 4 Failed / 1 Blocked / 0 Not Applicable / 0 Not Run；仍退役5条（004/005/018/020/041）。本轮8条：6 Passed / 2 Failed / 0 Blocked / 0 Not Applicable / 0 Not Run。014原Blocked及047/FWXC-579、049/FWXC-580原Failed保持，其他43条未重跑。

本轮Windows有头Google Chrome、生产 https://app.cinlink.ai；独立新会话/工程，1 worker、零自动重试。实际代码入口 `tests/editor/erye210-restored-eight.spec.ts`，版本 `v3-restored-six-and-navigation-20261116`。修改只从页面执行，回读仅辅助核对内容及媒体未串用；未以接口实现字段作验收条件。

[完整前置、输入、步骤及预期](case-restored-eight-production-20261116.md) · [结构化结果](execution-status-restored-eight-production-20261116.json)

| 用例 | 状态 | 实际结果 |
|---|---|---|
| ERYE210-002 | Passed | 首次导入20秒原片后、任何手动切页前，实际选中['媒体']，页面错误[]；无自动生成结果。 |
| ERYE210-007 | Failed | Watermark/Image重开记忆：after-close-reopen实际['水印']，Image选中=false；after-refresh实际['水印']，Image选中=false；工程保存内容保持。 |
| ERYE210-010 | Passed | 同账号同Chrome同会话PA=Captions、PB=Media；交替选择及分别刷新后均恢复各自入口，两工程内容保持。本轮未覆盖跨账号/设备。 |
| ERYE210-013 | Passed | 仅导入真实WAV的无视频工程：audio-only-text控件启用=False；audio-only-image控件启用=False；无意外文字水印保存。 |
| ERYE210-015 | Failed | 未选片段时分割禁用，实际提示['分割所选片段']；选中视频后约12秒分割并撤销恢复已完成。 |
| ERYE210-040 | Passed | 独立WAV位于14.066666666666666秒，删除前20秒、删除后20秒；其他音视频保持=True；一次撤销恢复原媒体与音频引用。 |
| ERYE210-055 | Passed | 连续3轮快速切换五TAB，最终Watermark/Image连续观察稳定，同一工程、图片预览和唯一选中入口一致，无内容写入或自动生成。 |
| ERYE210-056 | Passed | 一次原生导出形成真实页面错误['编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。重新加载媒体×']；错误后Media/Captions/Watermark导航及原内容保持，未重复导出；仅导航隔离通过，不代表导出修复。 |

## ERYE210-002

首次导入20秒原片后、任何手动切页前，实际选中['媒体']，页面错误[]；无自动生成结果。

实际批次：`prod-restored-eight-20261116-02`；[工程/检查点](evidence-restored-eight-production-20261116/002/location-and-checks.json)。

既有云效历史：[ FWXC-482 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=b484370e7d2723d8befafd0441)；本轮未修改云效状态。

![002-first-import-default](evidence-restored-eight-production-20261116/002/002-first-import-default.png)

![ERYE210-002-passed](evidence-restored-eight-production-20261116/002/ERYE210-002-passed.png)

## ERYE210-007

Watermark/Image重开记忆：after-close-reopen实际['水印']，Image选中=false；after-refresh实际['水印']，Image选中=false；工程保存内容保持。

实际批次：`prod-restored-eight-20261116-01`；[工程/检查点](evidence-restored-eight-production-20261116/007/location-and-checks.json)。

**本轮未通过原因**：Error: 重开应恢复Image子页  expect(received).toBe(expected) // Object.is equality  Expected: "true" Received: "false"

既有云效历史：[ FWXC-488 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=015794cee8eba6c88c1078ec6b)；本轮未修改云效状态。

![007-after-close-reopen](evidence-restored-eight-production-20261116/007/007-after-close-reopen.png)

![007-after-refresh](evidence-restored-eight-production-20261116/007/007-after-refresh.png)

![007-image-before-close](evidence-restored-eight-production-20261116/007/007-image-before-close.png)

![ERYE210-007-failed](evidence-restored-eight-production-20261116/007/ERYE210-007-failed.png)

## ERYE210-010

同账号同Chrome同会话PA=Captions、PB=Media；交替选择及分别刷新后均恢复各自入口，两工程内容保持。本轮未覆盖跨账号/设备。

实际批次：`prod-restored-eight-20261116-01`；[工程/检查点](evidence-restored-eight-production-20261116/010/location-and-checks.json)。

既有云效历史：[ FWXC-489 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8f1fd31451866906c2a5208cd2)；本轮未修改云效状态。

![010-refresh-媒体](evidence-restored-eight-production-20261116/010/010-refresh-媒体.png)

![010-refresh-字幕](evidence-restored-eight-production-20261116/010/010-refresh-字幕.png)

![010-switch-媒体](evidence-restored-eight-production-20261116/010/010-switch-媒体.png)

![010-switch-字幕](evidence-restored-eight-production-20261116/010/010-switch-字幕.png)

![ERYE210-010-passed](evidence-restored-eight-production-20261116/010/ERYE210-010-passed.png)

## ERYE210-013

仅导入真实WAV的无视频工程：audio-only-text控件启用=False；audio-only-image控件启用=False；无意外文字水印保存。

实际批次：`prod-restored-eight-20261116-02`；[工程/检查点](evidence-restored-eight-production-20261116/013/location-and-checks.json)。

既有云效历史：[ FWXC-492 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a)；本轮未修改云效状态。

![013-audio-only-image-controls](evidence-restored-eight-production-20261116/013/013-audio-only-image-controls.png)

![013-audio-only-text-controls](evidence-restored-eight-production-20261116/013/013-audio-only-text-controls.png)

![ERYE210-013-passed](evidence-restored-eight-production-20261116/013/ERYE210-013-passed.png)

## ERYE210-015

未选片段时分割禁用，实际提示['分割所选片段']；选中视频后约12秒分割并撤销恢复已完成。

实际批次：`prod-restored-eight-20261116-01`；[工程/检查点](evidence-restored-eight-production-20261116/015/location-and-checks.json)。

**本轮未通过原因**：Error: 缺选区应明确提示先选择片段  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false

既有云效历史：[ FWXC-493 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154)；本轮未修改云效状态。

![015-no-selection-guidance](evidence-restored-eight-production-20261116/015/015-no-selection-guidance.png)

![015-selected-split-completed](evidence-restored-eight-production-20261116/015/015-selected-split-completed.png)

![015-undo-restored](evidence-restored-eight-production-20261116/015/015-undo-restored.png)

![ERYE210-015-failed](evidence-restored-eight-production-20261116/015/ERYE210-015-failed.png)

## ERYE210-040

独立WAV位于14.066666666666666秒，删除前20秒、删除后20秒；其他音视频保持=True；一次撤销恢复原媒体与音频引用。

实际批次：`prod-restored-eight-20261116-02`；[工程/检查点](evidence-restored-eight-production-20261116/040/location-and-checks.json)。

既有云效历史：[ FWXC-516 ](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=f319c777b70fbfb7010c5a15ad)；本轮未修改云效状态。

![040-overlap-after-delete](evidence-restored-eight-production-20261116/040/040-overlap-after-delete.png)

![040-overlap-before-delete](evidence-restored-eight-production-20261116/040/040-overlap-before-delete.png)

![040-overlap-undo-restored](evidence-restored-eight-production-20261116/040/040-overlap-undo-restored.png)

![ERYE210-040-passed](evidence-restored-eight-production-20261116/040/ERYE210-040-passed.png)

## ERYE210-055

连续3轮快速切换五TAB，最终Watermark/Image连续观察稳定，同一工程、图片预览和唯一选中入口一致，无内容写入或自动生成。

实际批次：`prod-restored-eight-20261116-01`；[工程/检查点](evidence-restored-eight-production-20261116/055/location-and-checks.json)。

![055-final-image-panel-stable](evidence-restored-eight-production-20261116/055/055-final-image-panel-stable.png)

![ERYE210-055-passed](evidence-restored-eight-production-20261116/055/ERYE210-055-passed.png)

## ERYE210-056

一次原生导出形成真实页面错误['编辑器执行数据不符合正式 v2 协议，请保留当前工程并核对服务返回。重新加载媒体×']；错误后Media/Captions/Watermark导航及原内容保持，未重复导出；仅导航隔离通过，不代表导出修复。

实际批次：`prod-restored-eight-20261116-01`；[工程/检查点](evidence-restored-eight-production-20261116/056/location-and-checks.json)。

![056-error-then-媒体](evidence-restored-eight-production-20261116/056/056-error-then-媒体.png)

![056-error-then-字幕](evidence-restored-eight-production-20261116/056/056-error-then-字幕.png)

![056-error-then-水印](evidence-restored-eight-production-20261116/056/056-error-then-水印.png)

![056-genuine-export-error-before-navigation](evidence-restored-eight-production-20261116/056/056-genuine-export-error-before-navigation.png)

![ERYE210-056-passed](evidence-restored-eight-production-20261116/056/ERYE210-056-passed.png)

## 执行边界与观察脚本修正

002/013初次原生导入只发布实际页面工程交换信息，未触发旧GET监听，首次观察超时仅归档为脚本读取问题；修正后按独立新工程重新执行。040首次只在准备阶段因显示时间与30fps帧对齐相差0.006667秒而停止，目标删除尚未执行；按一帧容差修正后沿同一新工程删除/撤销，未重复导入或添加。原始准备失败图单列observer-history，不据此报产品缺陷。最终状态以各例上表实际批次为准。

002、010、013、040本轮修订范围内未复现原失败，既有云效缺陷未改状态；007的一级Watermark已恢复但Image子页仍丢失，015分割/撤销通过但缺选区引导仍缺失。原外部结果入口、旧状态映射、跨账号/设备及逐字稿选区等延期范围不计新版覆盖。

056只证明真实模块错误后的导航隔离；导出错误不因此修复。[原任务只读终态核对](evidence-restored-eight-production-20261116/056/original-task-terminal-audit.json)确认该任务done，但页面错误和未成功交付仍保留；未重新导出。本轮没有云效新建/上传/状态修改，没有Git提交或推送。

[原43条与本轮定义快照](restored-six-definition-history-20261116.json) · [证据清单/SHA-256](evidence-restored-eight-production-20261116/manifest.json) · [当前总进度](execution-status-current.md)。
