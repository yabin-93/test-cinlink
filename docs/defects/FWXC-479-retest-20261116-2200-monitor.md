2026-11-17 Chrome预发FWXC479完成P/P/P：原1.00秒→第30帧1.001秒，独立2.50秒→第75帧2.5025秒且Undo/Redo完整恢复，独立1.02秒→第31帧1.0343666667秒；视频/原声一致，原及扩散二实际刷新保持，两保护工程不变。官方18:08:24仍✅AI通过。43项最新原15P/1F/8B/19NR，扩散38P/5F/3B/40NR；剩余19项，继续463，固定脚本PLAN。

# FWXC-479 Chrome预发回归结果（2026-11-17）

【生产环境】【ERYE199-002】29.97fps工程在1秒处分割未对齐帧边界，刷新后仍保留

本轮原回归、扩散一、扩散二均执行通过。 本次实际Google Chrome原生CUA、预发staging-app.cinlink.ai、yabinc92；生产为原缺陷环境，本轮不冒称生产通过。

旧ego登录等待已解除；官方已更新并最终回读✅AI通过。三独立工程均本轮准备、单次页面分割，无已受理任务重发。

[本次检查](fixed-monitor-20261116-215756.md)。原始描述、评论、附件及下载证据：reports/fixed-monitor-20261116-215756/cloud/FWXC-479；固定自动化PLAN，尚未实现可重跑脚本。无云效评论、新单、Git提交推送。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "56c67b0e-f53a-448e-865c-8057ac98e962",
  "projectId": "83711b2d-bd6c-43f8-8a1f-934dc3a37259",
  "coverage": "执行通过：原附件、原登记提示词、预览进度Home+100次Right定位1.00秒、原生分割一次、刷新重开同工程与实际帧PTS核对",
  "actual": "原片SHA匹配，独立MP4 timing解析300帧/30000时基/1001tick每帧，工程29.97fps。保存版本1→2，视频及关联原声切点均为1.0010000000000001秒，等于第30帧，和源PTS1.001一致，首尾范围及1x保持、无缝隙重叠。实际reload后版本2、所有片段ID/范围/完整content摘要2937acd755febc28c1eb13eaacb35bf66eedac6cec7dc79cdc9c775e559d3f36完全相同。未导出，不推断全片导出帧质量或长期音画同步。",
  "evidence": [
    "479-source-timing-audit.json",
    "479-O-before-register-ui.txt",
    "479-O-before-split-api.txt",
    "479-O-playhead-after-100-right-ui.txt",
    "479-O-before-split1-ui.png",
    "479-O-after-split-ui.png",
    "479-O-after-split-api.txt",
    "479-O-after-refresh-ui.png",
    "479-O-after-refresh-api.txt",
    "479-O-final-audit.json"
  ]
}


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "6222203e-8434-42aa-8882-d527adb4f929",
  "projectId": "13054783-d341-458b-a393-3dca37825349",
  "coverage": "执行通过：独立原片请求2.50秒分割，Home+250 Right定位、按钮一次；一次Undo和一次Redo完整内容核对",
  "actual": "版本1→2切点2.5025秒=源第75帧，视频与关联原声首尾/后段时间起点一致、1x无缝隙重叠。Undo版本3回到单视频/单原声，全content摘要1ace8114e57bdaa9ef252a0a5e8da4faa8f5f9bd1c2eb571a4b73afeed43ba83等于原基线；Redo版本4恢复双段及原clip IDs，全content摘要02d2f807c4b449e5e6e100ce2ec76c0f1ee51487b6f915f1a3b863329aa3c53a等于分割后。原回归工程版本2/摘要保持。未导出。",
  "evidence": [
    "479-E1-before-register-ui.txt",
    "479-E1-before-split-api.txt",
    "479-E1-playhead2.5-ui.txt",
    "479-E1-after-split-ui.png",
    "479-E1-after-split-api.txt",
    "479-E1-after-undo-ui.txt",
    "479-E1-after-undo-api.txt",
    "479-E1-after-redo-ui.png",
    "479-E1-after-redo-api.txt",
    "479-E1-final-audit.json"
  ]
}


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "bbdb9c9d-9ad0-43dc-b28a-24a3b0fa6dd6",
  "projectId": "45123642-ad1f-4159-b8ca-62492fdce295",
  "coverage": "执行通过：独立原片Home+102 Right请求1.02秒，单次原生分割；就近向后帧及刷新持久化",
  "actual": "版本1→2，视频和关联原声都保存1.0343666666666667秒=第31帧，符合就近帧网格。实际reload重开后版本2、片段ID/源边界/时间起点及完整content摘要4b6e729dbf8d458c5defd5a6baee2a7a1299d093c351a64f86644455de52ea28完全一致。原工程版本2及扩散一版本4摘要均保持，无跨工程修改；未导出。",
  "evidence": [
    "479-E2-before-register-ui.txt",
    "479-E2-before-split-api.txt",
    "479-E2-playhead1.02-ui.txt",
    "479-E2-after-split-ui.png",
    "479-E2-after-split-api.txt",
    "479-E2-after-refresh-ui.png",
    "479-E2-after-refresh-api.txt",
    "479-E2-final-audit.json"
  ]
}


## 完整步骤与验收范围

三场景均独立会话、原附件SHA匹配并由页面导入单段视频及关联原声，未复用其他工程成片。原准备指令：

> 本轮测试素材登记：只保存本条附件 E199-CFR2997-48k.mp4 原始视频供当前视频编辑器使用；不要分析项目目录中的其他素材，不要生成、转码或导出视频。

扩散一登记指令：

> FWXC-479扩散一独立素材登记：仅保存本条附件 E199-CFR2997-48k.mp4 原视频供当前视频编辑器使用，不分析其他素材、不生成、不转码、不导出，不修改其他工程。后续由页面在2.50秒分割并验证帧对齐及撤销重做。

扩散二登记指令：

> FWXC-479扩散二独立素材登记：仅保存本条附件 E199-CFR2997-48k.mp4 原视频供当前视频编辑器使用，不分析其他素材、不生成、不转码、不导出，不修改其他工程。后续由页面在1.02秒请求分割，检查就近下一帧及刷新后的关联原声一致性。

登记均只提交一次。目标为页面原生操作：选中视频，聚焦预览进度、Home归零，原100次Right/扩散一250次/扩散二102次分别定位1.00/2.50/1.02秒；分割所选片段各一次。原和扩散二实际刷新重开同一工程后GET精确回读；扩散一原生撤销一次、重做一次并分别GET完整摘要。原片MP4 stts/ctts/elst直接解析，300帧、timescale30000、每帧1001tick，和原附件PTS一致，非用输出自证期望。

原及两独立扩散均执行通过。脚本实现仍PLAN、路径为空；本轮CUA和离线审计不冒称固定自动化已接入。内部时间编码、区间所有边界、导出丢帧/重复帧、长期音画同步和费用未覆盖。生产仅原缺陷环境标注，本轮实际范围为Chrome预发/yabinc92。17:59:19官方更新并回读✅AI通过，18:08:24最终GET同状态，无评论、新单、附件或Git写入。


2026-11-17 22:03持续监控只读复核：官方OpenAPI GET当前状态为“测试完成”（回读时间2026-11-17T22:04:04.9936380+08:00），本轮原判定仍Passed；云端后续/外部推进不代替本轮实测、不计新通过。本监控未写状态、未重发业务，证据reports/fixed-monitor-20261117-215938/status-readbacks/FWXC-479/。
