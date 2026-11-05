# CINLINK-FINDFOOTAGE-002 · [FWXC-274](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=b2f6cc9e5a742bb970e0ef9a5a)

**现象**

查询黄色机器人时，返回的3个“匹配片段”中，1个为机器人，另2个为留声机和飞机，与查询无关，但均标记为匹配。

**前置步骤**

1. 使用专用测试账号yabinc18登录预发 https://staging-app.cinlink.ai ，新建测试项目及空白会话。
2. 导入4个原片：`01_60秒_单镜头_仅背景音乐.mp4`、`02_60秒_单镜头_仅人声.mp4`、`03_60秒_单镜头_无音轨.mp4`、`04_300秒_20镜头_有人声.mp4`。前三片60秒、第四片300秒；均1280×720、24fps。
3. 等待项目文件同步完成，进入本地素材查找并完成分析，确认4/4已分析。F4的90～105秒为黄色机器人、黑板和桌子，105～120秒为留声机，0～15秒为飞机；不添加@引用。

**提示词**

```text
找出画面里出现黄色机器人，旁边有黑板和桌子的片段。
```

**复现步骤**

1. 在该项目内点击Find Local Footage卡片，输入完整提示词并发送一次。
2. 等待Search materials结束，逐个播放所有返回片段。
3. 核对原片来源、源片时间区间和实际画面，不只检查Completed或首条结果。

**实际结果**

- 执行：2026-11-04，Web预发，Chrome有头；构建`index-DNKBwowg.js`。
- 项目：`6d2d9215-76ef-4a37-8a4a-478c123f3a2a`；会话：`6666d6a3-c10f-42d6-8c38-04a56b4ca04a`。
- run_id：`run_v2_d05a1cdaa71a454da65e4b723ef31352`，状态done，任务耗时55.454秒；工具`search_materials`，`mode=segment`、`scope=project`。
- 返回3段，均来自F4（`file_cloud_mt6mojy42mtfqrhg73x5byohee`），均标记`matched=true`，可下载、播放：

| 返回文件 | 原片区间 | 实际画面 |
|---|---|---|
| match-1-7.mp4 | 90～92秒 | 机器人，符合查询 |
| match-2-8.mp4 | 105～107秒 | 留声机，无机器人 |
| match-3-1.mp4 | 0～2秒 | 飞机，无机器人 |

**预期结果**

返回片段应包含查询中的机器人及其相邻场景，来源与时间可追溯；留声机、飞机等无关片段不应作为命中结果。不得仅因首条相关便将整组无关候选视为正确匹配。

**影响**

无关内容混入匹配结果，用户可能选用错误片段，需要逐个排查结果。

**补充**

缺陷键：`CINLINK-FINDFOOTAGE-002`，关联LF-01。原片云端回读哈希一致、分析已就绪，已直接核验返回短片画面。与FWXC-237“工具定义缺失、0结果”不同；本例正常返回内容。召回、筛选或呈现环节的具体根因待确认，不预设相似度阈值。完整源/结果文件ID、区间和原片哈希见附件。

**失败截图**

机器人命中，同时返回留声机与飞机两个无关片段。

![LF-01-search-unrelated-results.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=7335a4240d3cf2ca15c53921eb)
