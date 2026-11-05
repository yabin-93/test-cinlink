# CINLINK-BILLING-TRANSLATE-USAGE-001 · [FWXC-279](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=49b6b410843766dee777c4f8a6)

2026-11-05已同步云效，优先级高、严重程度2-严重；9张本次原始PNG已上传并嵌入，另附1份脱敏定位JSON，正文/字段/附件/图片引用回读通过。[本批执行记录](../design-cases/multi-workflow/sso015-018-recovery-results-20261105.md)。

**现象**

字幕组合任务在工具启动前因计费预冻结失败而终止，提示`Billing price missing: translate missing_usage`，没有视频产物。015～017共9次相同边界/错误，合并记录。

**前置步骤**

1. 专用预发账号yabinc18登录 https://staging-app.cinlink.ai ，新建非项目会话。
2. 仅上传原片`7MB.mp4`（英文语音，60.496秒，1280×720，含原音轨），发送下方登记指令。
3. 同一会话等待登记结束，再发送目标指令；不重新上传、不@，本轮尚未执行刷新/重开。

**提示词**

登记：保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。

触发指令（015/016/017第1轮均实际发送）：

```text
根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。
```

**复现步骤**

1. 完成素材登记后发送上述目标指令，等待任务受理并结束。
2. 检查任务状态、工具节点及当前轮交付物。

**实际结果**

- 2026-11-05，Web预发、Chrome有头；构建`index-BOgmdX3S.js`。
- 原片ID：`file_cloud_zquu6agl4hjy5eyplmfrfxv4ji`；三会话登记原片的云端SHA-256均与本地原片一致。
- 任务`failed`、产物0，节点在工具启动前失败。完整错误：`Billing freeze failed: HTTP 400 [invalid_input]: Billing price missing: translate missing_usage; tool was not started.`

| 用例 | 失败轮次 | 会话ID | 代表run_id |
|---|---|---|---|
| SSO-015 | 1、3、4、5 | `204d84c1-2399-4a2b-85a9-9a46b5caaf9f` | `run_v2_06ba115677f94332beb43357df5fced6` |
| SSO-016 | 1、3、4、5 | `25a191b8-9d3d-485d-b6e4-a192a3869dc3` | `run_v2_e69150ea63d34e0ebaa291b80ed6bc5e` |
| SSO-017 | 1 | `d0fc4819-0be6-421e-b416-81fc0c94da46` | `run_v2_7be7a4ce8a084e2d99f9d19ce572cf89` |

同错误还出现在“中文字幕＋REC-R3”“英文字幕＋1440p”“30秒高光＋英文字幕”组合；全部9个run、完整触发指令及截图对应关系见脱敏附件。

**预期结果**

已支持的字幕组合能够完成费用预冻结并执行，按指定语言/水印/分辨率交付MP4；正常请求不应因内部`translate missing_usage`终止。

**影响**

用户无法获得要求的成片，字幕相关组合执行受阻，后续依赖成片的恢复/历史操作也无法完成。

**补充**

缺陷键`CINLINK-BILLING-TRANSLATE-USAGE-001`。9次失败合并为1条，失败均在工具启动前，不归因于本轮刷新或重开操作。后续重新登录后的新任务有成功记录，原失败保留；尚不能确定价格配置、用量估算或认证与失败的因果关系，发生频率待确认。未做逐任务账本验收，不推断零扣费。

**失败截图**

SSO-015 第1轮原始页面：计费预冻结失败，工具未启动。

![SSO-015-R1-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5ac12bd74840581c6cdb401914)

SSO-015 第3轮原始页面：计费预冻结失败，工具未启动。

![SSO-015-R3-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e3618a5883fe18ae5d32f55e11)

SSO-015 第4轮原始页面：计费预冻结失败，工具未启动。

![SSO-015-R4-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5d16c3bf3feadbb196629aac4b)

SSO-015 第5轮原始页面：计费预冻结失败，工具未启动。

![SSO-015-R5-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f7091a94d57d5b0b1dce7aa108)

SSO-016 第1轮原始页面：计费预冻结失败，工具未启动。

![SSO-016-R1-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=570687a72c90a4129188ec1b0d)

SSO-016 第3轮原始页面：计费预冻结失败，工具未启动。

![SSO-016-R3-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f0d27c411e6f1d5f5e08506558)

SSO-016 第4轮原始页面：计费预冻结失败，工具未启动。

![SSO-016-R4-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=4845c5bcacd9a82915fb266382)

SSO-016 第5轮原始页面：计费预冻结失败，工具未启动。

![SSO-016-R5-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=87689d8547f0494cdbd02f5806)

SSO-017 第1轮原始页面：计费预冻结失败，工具未启动。

![SSO-017-R1-billing-freeze-failed.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9d34d2925deeb61fe387e72475)
