# CINLINK-MW10-001 · [FWXC-254](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=31ee059fefbd6acaa43a3e8dad)

**现象**

按“增强分辨率→中文字幕烧录→20秒高光”的顺序处理视频，增强及字幕相关步骤完成后，高光阶段的Extract audio报空对象异常，任务Failed且无最终视频或SRT。

**前置步骤**

1. 使用专用测试账号登录CinLink Web预发 https://staging-app.cinlink.ai ，确认工作台可用、余额充足，无同账号并发任务。
2. 进入测试项目并新建空白会话，不带入上一任务产物；本次实测页面位于已有测试项目中。
3. 准备原始视频`7MB.mp4`：7,815,126字节，约60.496秒，1280×720，H.264/AAC，保留音轨。素材实际为英文语音；原提示词仍描述中文语音，回归先沿用该实测输入，差异见“补充”。
4. 上传一次源视频，并在输入框通过`@`选择本次视频，确认只有一个有效视频引用和附件缩略图。实际上传名为`7MB-1793758006834.mp4`；回归可使用新唯一名。
5. 确认增强、字幕与长变短工作流可用；本轮要求倍率2、目标分辨率2560×1440、高光时长20秒、最终MP4及对应中文字幕SRT。

**提示词**

```text
按顺序先把这个视频的分辨率增强到 2 倍，再根据中文语音生成简体中文字幕并烧录，最后剪成 20 秒高光；交付最终 MP4 视频，以及与最终成片时间轴一致的中文字幕 SRT。
```

**复现步骤**

1. 完成前置，核对输入区只有本次源视频的有效`@`引用。
2. 在引用后追加完整提示词，点击发送一次，保持三个处理阶段在同一个复合请求中。
3. 若出现补槽，按倍率2、中文字幕烧录、20秒高光、MP4加SRT的要求填写后继续；若有计划确认，核对处理顺序后确认。本次均未出现。
4. 等待并观察步骤列表：Enhance video quality完成；随后Extract audio、Transcribe audio、Translate subtitles、Burn subtitles完成。
5. 观察后续高光阶段的第二个Extract audio。本次该步骤出现错误；Select highlight clips、Render highlight clips、Transcode the video亦显示失败。
6. 等任务终态，检查页面错误文字、是否有最终MP4和对应SRT，并尝试下载。本次没有可下载产物。

**实际结果**

- 执行日期：2026-11-04，约10:06–10:17（Asia/Shanghai）；整条用例639.462秒。
- run_id：`run_v2_db0f651a768b46648d188fbe7b31d628`；会话ID：`184e5d74-007f-4cb5-9557-af472c1b82e9`。
- 最终`failed`，交付0份。页面有Failed及Retry入口。
- 错误原文：`'NoneType' object has no attribute 'source_duration_sec'`。
- 截图显示前述增强、转写、翻译和烧录步骤已完成，错误出现在高光阶段Extract audio，其余高光与转码步骤显示失败。
- 补槽提交0次、计划确认0次；未点击Retry重跑。

**预期结果**

1. 完成指定顺序的处理，交付约20秒、2倍分辨率的最终MP4与对应时间轴的中文字幕SRT，保留音轨，两份文件均可下载。
2. 增强和烧录产生的中间视频应可继续作为高光阶段输入，不应因空对象访问`source_duration_sec`使整条链路失败。
3. 若上游结果或媒体信息不可用，应明确指出失败阶段和可恢复原因，避免直接暴露空对象异常。
4. 回归须完成整条原链路并核对MP4/SRT、时长、分辨率、音轨和字幕同步；只验证增强或字幕阶段成功不足以确认修复。

**影响**

用户在前序增强和字幕处理完成后仍无法取得高光成片及SRT，整条复合任务无法交付。

**补充**

- 缺陷键：`CINLINK-MW10-001`。源文件SHA-256：`9d03ed8d60860715843f16209ca8f20d2dbfd2a3ce648558672c22ebb721fc96`。
- 源文件实际为英文语音，与此前独立ASR证据一致；提示词按本次实测原文保留。本记录不证明严格中文源语音前置满足，后续应增加中文语音素材对照回归。
- 错误边界由页面步骤与服务端错误共同确认；具体哪个对象为空、是否缺少中间产物元数据，尚未定位，不能写成已确认根因。
- 本次为已有测试项目内的新会话，未据此推断与项目隔离存在因果关系。未完整核验中间产物内容或费用变化。

**失败截图**

提交前：本次源视频的有效@引用和完整提示词。

![MW-10-before-submit.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=5a8769688f1119fe35f0371c68)

失败终态：高光Extract audio显示source_duration_sec空对象错误，Failed且无产物。

![MW-10-failure.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0268a10835280062cbf4eab274)
