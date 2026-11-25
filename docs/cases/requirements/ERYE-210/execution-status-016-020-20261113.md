# ERYE210-016～020 执行进度

2026-11-13；生产环境、有头Google Chrome；2 Failed / 2 Blocked / 1 Not Applicable。

[详细报告](results-016-020-prod-20261113.md) · [当前54条进度](execution-status-current.md)

| 用例 | 状态 | 结果 |
|---|---|---|
| ERYE210-016 | Blocked | Blocked：缺macOS客户端环境，且没有同一操作“未发布/已发布但当前端不支持”的真实对照样本；仅前置门禁，未以五入口可达代替能力发布状态验证。 |
| ERYE210-017 | Blocked | Blocked：独立工程两句旧配音ready及文稿正常可读，五入口导航后完整内容保持；当前配音面板只有清空译文，没有可触发新生成/重试的实际控件。未建立真实生成失败场景，失败保留及修复后重试分支未覆盖。 |
| ERYE210-018 | Failed | Failed：只提交一次真实PA配音任务，在尚无ready音频时独立保存文字水印INDEPENDENT_018，五入口仍可浏览；原任务最终提示“当前任务没有可应用结果”，等待后仍0句配音。水印保留、版本3。失败原因未确认，不推断内部锁或必然由水印修改导致；受限对象编辑分支未覆盖。；[FWXC-506](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=df279e880064725c26669adc36) |
| ERYE210-019 | Not Applicable | Not Applicable：已检查当前Chrome五入口、时间线及片段右键操作，未发现受限轨道/关联同步冲突批次的业务入口；按本例“无该业务入口则不适用”登记，未提交冲突批次，不宣称原子性通过。 |
| ERYE210-020 | Failed | Failed：全新工程建立自身配音稿并刷新后，将第1句“欢迎使用 CinLink。”改为“新稿未提交”，切字幕再回配音、收起重开均保留；点击一次撤销并等待20秒仍为新稿，随后只读刷新重开也未恢复原文。第2句和两段旧音频保持，无配音任务提交。；[FWXC-507](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=4861ae7970e41e1293c07e3612) |
