# ERYE210-047/049 云效缺陷同步（2026-11-16）

通过官方OpenAPI分别新建2条；正文按九段模板包含必要前置、完整准备指令、详细页面复现步骤、实际/预期及影响。未重跑测试，未重新生成配音或导出。5张本轮原图已上传并嵌入，连同原片、WAV/SRT和脱敏摘要共11附件，正文、字段、附件及图片引用回读通过。

- ERYE210-047 → [FWXC-579](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d4687bf3633ef6956037e3a63c)：【生产环境】【ERYE210-047】混音后单句配音重新生成报错，目标旧声未替换；3截图/6附件。
- ERYE210-049 → [FWXC-580](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=d07993186a112f50ec9926b266)：【生产环境】【ERYE210-049】关闭双水印后原生导出报错，页面未交付可下载视频；2截图/5附件。

两条状态均为🤔AI提缺陷，负责人牛诗晴，生产环境，高 / 2-严重，迭代重构10-29。按现有“不去重”约定分别提交，不修改旧项；同一同步key有检查点防止重复创建。

047只提交真实翻译配音工程的单句更新失败，早期准备错误不作依据；049只报告OFF首次原生导出未完成页面交付，不把后台done视为通过，也不报告未执行的ON画面问题。

047/049保持Failed，014/046/048及其余用例不变；当前43条38 Passed / 2 Failed / 3 Blocked / 0 Not Applicable / 0 Not Run。

[047本地缺陷](../../../defects/ERYE210-047-voice-regenerate-production-20261116.md) · [049本地缺陷](../../../defects/ERYE210-049-watermark-export-production-20261116.md) · [脱敏回执](defect-sync-047-049-production-20261116.json) · [当前进度](execution-status-current.md)。
