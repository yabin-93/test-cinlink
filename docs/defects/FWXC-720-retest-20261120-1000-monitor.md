# FWXC-720 2026-11-20生产待回归

【生产环境】从原声轨分割会误切视频、背景音乐及独立音频

Original / expansion1 / expansion2: Not Run. Candidate captured by official full pagination and identity/creator/Fixed verified; no browser business submitted. Current shared browser access is explicitly denied, and the already accepted production661 task terminal is unknown. Queue in inbox only; no overlapping execution or bypass.

## Original plan

Preserve original S0/S1/T1/T2/E/C/H/X1/X2 variants and their full prompts/inputs from original description. Each new clean conversation must first pass fresh official Fixed/creator gate. From source-audio target split at original10s (or original C/H midpoint frame), compare complete saved project before/after, Undo/Redo and reopen. Verify only source audio changes; video, BGM, independent D, subtitles and dubbed voice remain unchanged. Do not count T1 alone as coverage of all9 variants.

## Expansion1 plan

Independent T1 baseline: source-audio only split at5s; verify unrelated tracks unchanged and one Undo restores exact content, one Redo restores the split.

## Expansion2 plan

Independent T2 plus D at6-18s: source-audio only split at15s; verify D/BGM/video/subtitles/dubbed voice unchanged after module switch and refresh.

## Original evidence

**现象**

在原声轨上发起分割，视频也产生切点。译配工程中任务自带 BGM 同样被切开，添加独立音频的组合还会切开独立音频。

**前置步骤**

1. 登录 CinLink 生产环境，账号具备工程编辑权限及准备流程所需积分。
2. 新建测试项目及独立会话。添加字幕、翻译配音、画质增强用附件 F20，去口水词及长视频变短用附件 F60。
3. 每个入口使用独立未编辑工程。X1/X2 另备附件 D（12 秒 WAV）。

**提示词**

| 入口 | 素材与参数 | 完整提示词 |
|---|---|---|
| S0 添加字幕 | F20 / 不选目标语言 / 原文 | 为这条视频添加原文字幕。 |
| S1 添加字幕 | F20 / 简体中文 / 译文 | 为这条视频添加简体中文字幕。 |
| T1 翻译配音 | F20 / 配音和字幕 / 简体中文 / 译文 | 将这条视频翻译成简体中文配音，并显示简体中文字幕。 |
| T2 翻译配音 | F20 / 配音和字幕 / 简体中文 / 双语 | 将这条视频翻译成简体中文配音，并显示中英双语字幕。 |
| E 画质增强 | F20 / 2 倍 | 将这条视频的画质增强2倍，保留完整时长和原音。 |
| C 去口水词 | F60 / 默认，确认移除 | 去掉这条视频中的口水词和多余停顿，保留其余内容与原音。 |
| H 长视频变短 | F60 / 30 秒，审核确认 | 将这条视频剪成30秒高光，保留原音。 |

X1/X2 分别使用 T1/T2 参数，并导入附件 D。

**复现步骤**

1. 最短路径用 T1：选择上述翻译配音参数并附加 F20，提交后进入本轮编辑器。
2. 将播放头定位在 10 秒，单击原声轨 0～20 秒片段主体，观察哪些片段进入选中状态。点击“分割所选片段”。
3. 分别检查原声、视频、BGM 片段数量。撤销、重做，刷新重开后再次对照切点。
4. 用 S0、S1、T2、E 各建新工程重复。X1/X2 通过“媒体 → 导入素材”登记附件 D，将其独立放到 6～18 秒，源范围 0～12 秒。
5. C/H 按方案审核完成后进入本轮工程，选择原声第一个可分割片段，在片段中点向下对齐 30 fps 帧后分割。本轮切点分别约 6.967 和 6.200 秒。

**实际结果**

- S0/S1/E/C/H：原声正确分割，视频也被误切。E/C/H 单击原声时视频先被自动选中。
- T1/T2：原声正确分割，视频和任务自带 BGM 也在 10 秒被切开。X1/X2 另有独立 D 在 10 秒被切。
- 字幕和译声保持。T1 在同一工程补核验后，撤销、重做及重开能保存编辑，但仍保留误切。

**预期结果**

从原声轨发起分割时，只改变目标原声片段。视频、BGM、独立 D、字幕及译声的片段和时间保持原样。

**影响**

用户剪辑原声时会意外切碎视频和其他音轨，错误可能保存在工程中。

**补充**

同步标识：ERYE199-095-SOURCE-AUDIO-SPLIT-CROSSTRACK-PROD-20261119

覆盖 ERYE199-095 的 9 个变体。FWXC-703 的操作对象是普通导入音频 D，本条的触发对象是原声。各变体的实际源区间和切点见附件。

**失败截图**

095-T1-split：补核验：分割前只选中原声。

![095-T1-split-history-supplement-before-split.png]([URL])

095-E-split：单击原声后，画质增强工程的视频片段也出现选中状态。

![095-E-split-before-split-selected-target.png]([URL])

095-C-split：原声分割后，视频也产生切点，重开仍可见。

![095-C-split-failure-after-reopen.png]([URL])

095-E-split：原声分割后，视频也产生切点，重开仍可见。

![095-E-split-failure-after-reopen.png]([URL])

095-H-split：原声分割后，视频也产生切点，重开仍可见。

![095-H-split-failure-after-reopen.png]([URL])

095-S0-split：原声分割后，视频也产生切点，重开仍可见。

![095-S0-split-failure-after-reopen.png]([URL])

095-S1-split：原声分割后，视频也产生切点，重开仍可见。

![095-S1-split-failure-after-reopen.png]([URL])

095-T1-split：原声分割后，视频、BGM也产生切点，重开仍可见。

![095-T1-split-failure-after-reopen.png]([URL])

095-T2-split：原声分割后，视频、BGM也产生切点，重开仍可见。

![095-T2-split-failure-after-reopen.png]([URL])

095-X1-split：原声分割后，视频、BGM、独立音频 D也产生切点，重开仍可见。

![095-X1-split-failure-after-reopen.png]([URL])

095-X2-split：原声分割后，视频、BGM、独立音频 D也产生切点，重开仍可见。

![095-X2-split-failure-after-reopen.png]([URL])


All15 original files downloaded unchanged; hashes in reports/fixed-monitor-20261120-102620/original-files-manifest.json. Original screenshot read. Requirements reference ERYE199-095. Full original9 variants, source media and expected isolation retained; no prior result used as current execution. Fixed test scripts PLAN. README read-only; no cloud comments/new defects/attachment writes/Git commits.
