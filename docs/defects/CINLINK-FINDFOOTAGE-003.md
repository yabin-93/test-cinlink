# CINLINK-FINDFOOTAGE-003 · [FWXC-275](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=1da412ffc6cc76e16f86c97c16)

**现象**

在已分析的单镜头视频中查询仙人掌或蓝衣男孩，源文件命中正确，却均返回原片0～2秒短片；实际画面只有背景和从右侧出现的兔子，没有查询对象。原片10秒参照画面具有目标内容。

**前置步骤**

1. 使用专用测试账号yabinc18登录预发 https://staging-app.cinlink.ai 。分别新建单素材项目及空白会话，不混用两个原片。
2. 场景A仅加入`01_60秒_单镜头_仅背景音乐.mp4`（F1）；场景B仅加入`02_60秒_单镜头_仅人声.mp4`（F2）。两片均60秒、1280×720、24fps、1条AAC音轨；名称不同且源file_id独立。
3. 等待项目同步及媒体分析完成，各项目均为1/1已分析。可复用本轮真实上传文件关联到新项目，云端回读哈希与原片一致。预览原片10秒，确认仙人掌、兔子和蓝衣男孩的画面；不添加@引用。

**提示词**

场景A（LF-02，F1）：

```text
找出绿色盆栽仙人掌的画面，附近有橙色兔子和穿蓝衣服的男孩。
```

场景B（LF-03，F2）：

```text
找出穿蓝色上衣、深色裤子的卡通男孩，旁边有绿色盆栽仙人掌的片段。
```

**复现步骤**

1. 在各自项目内点击Find Local Footage卡片，发送该场景对应提示词一次。
2. 等待任务结束，播放返回短片，查看源file_id及`start_ms/end_ms`。
3. 与对应原片10秒画面对照，检查返回区间是否实际包含查询对象。

**实际结果**

两个场景均done/Completed、返回1个可下载播放的`match-1-1.mp4`；工具为`search_materials`，`mode=segment`、`scope=project`，均返回`start_ms=0`、`end_ms=2000`。来源分别为正确的F1/F2，但实际短片均没有仙人掌或蓝衣男孩。

| 场景 | 项目ID | 会话ID | run_id |
|---|---|---|---|
| A/LF-02 | 0c3c276e-f585-4bff-813d-1316cca93012 | 5f405989-3358-418e-aeea-673f4f29e399 | run_v2_6331afbf67be4e79be443b88b824cf61 |
| B/LF-03 | d70f98ad-ab9f-4207-ba4c-e561944a459f | c9f230f8-95d5-49f9-a889-573c3941bc8d | run_v2_250f26dc3eb649feb23263f29434c666 |

- A原片：`file_cloud_6o6vczw5rmunz6re5m2xkuanet`；B原片：`file_cloud_inq4xfxmsl63zctxr5p5yfv4vl`。
- 执行日期2026-11-04，Chrome有头，预发构建`index-DNKBwowg.js`；任务耗时分别50.574/51.280秒。两条均无补槽或目标任务计划确认。

**预期结果**

在正确原片中定位并返回实际包含仙人掌/蓝衣男孩的时间段，播放内容与查询一致；不能以整段视频的摘要命中替代片段位置定位，也不能返回不含目标的开头2秒。

**影响**

虽然找到源文件，返回短片仍不可用于目标场景，用户需自行回到原片查找位置。

**补充**

缺陷键：`CINLINK-FINDFOOTAGE-003`，覆盖LF-02/03。两个不同源文件、独立项目均出现相同定位问题，合并记录症状，具体根因待确认；目前仅观察到均截取0～2秒，不先认定固定窗口策略。与FWXC-237“0结果”不同。已核验原片哈希、返回区间、实际播放和画面对照；完整文件ID及区间见附件，未做费用验收。

**失败截图**

LF-02：查询仙人掌，返回开头兔子片段，未含目标。

![LF-02-cactus-wrong-segment.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=d0161f68a59f651d9f60116c37)

LF-03：查询蓝衣男孩和仙人掌，返回开头兔子片段，未含目标。

![LF-03-boy-wrong-segment.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6309e07ae61a99eace6d5b65aa)
