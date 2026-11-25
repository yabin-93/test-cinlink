# ERYE210-011～015 执行进度

2026-11-13；生产环境、有头Google Chrome；1 Passed / 2 Failed / 2 Blocked。

[详细报告](results-011-015-prod-20261113.md) · [当前54条进度](execution-status-current.md)

| 用例 | 状态 | 结果 |
|---|---|---|
| ERYE210-011 | Blocked | 后台完成分支Passed：PB/Media建立后原样放行PA真实配音请求，PA两句音频ready、版本1→3，PB页面及完整内容保持、版本1→1。本次从编辑器内生成，未建立可点击的会话结果卡，最后定位分支前置不足；整例Blocked，不据此报缺陷。 |
| ERYE210-012 | Passed | 字幕和配音空态均可打开，有生成字幕/创建配音引导；未点击执行，完整内容及版本1→1保持，会话消息0→0，导航写请求0。 |
| ERYE210-013 | Failed | 仅1.346757秒真实WAV音频、无画面工程仍可填写AUDIO_ONLY_013并实际保存文字水印，版本1→2，无无画面限制说明；图片上传入口也可用，但未上传图片，不宣称图片写入通过。；[FWXC-492](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=0c412f96615825b3473edd810a) |
| ERYE210-014 | Blocked | 缺少真实只读授权工程及独立只读账号，未伪造只读标记，未执行浏览权限或服务端拒绝写入分支。脚本仅接入前置检查入口。 |
| ERYE210-015 | Failed | 文稿页实际时间线分割控件在未选片段时正确禁用，但仅提示“分割所选片段”，未说明请先选择片段。选视频后可在12秒正确分割为0～12/12～20秒，撤销恢复完整原内容。失败仅为缺少选区引导，未验证逐字稿选区清理。；[FWXC-493](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=e5fffc8428963d66f61e42d154) |
