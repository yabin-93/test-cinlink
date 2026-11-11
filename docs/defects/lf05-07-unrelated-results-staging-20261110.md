# FWXC-390 LF-05～07混入无关候选

云效：[FWXC-390](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=673e49a905e5a52e8ebff0e073)。2026-11-10按用户授权直接新建，不去重、不修改旧项；官方OpenAPI回读正文/字段/全部附件通过。图片5份、补充JSON 1份。

**现象**

本地素材查找能够命中目标，但同时将明显无关片段作为匹配结果返回：机器人查询混入留声机/飞机，飞机查询混入机器人/自行车，卫星查询混入宇航员/望远镜，火车查询混入长颈鹿。

**前置步骤**

1. 在macOS Chrome登录预发 https://staging-app.cinlink.ai/ ，账号yabinc18。
2. 新建项目LF-05-07-staging-20261110，导入4个原片：`01_60秒_单镜头_仅背景音乐.mp4`、`02_60秒_单镜头_仅人声.mp4`、`03_60秒_单镜头_无音轨.mp4`、`04_300秒_20镜头_有人声.mp4`，均1280×720；前三个各60秒、第四个300秒。
3. 等待项目同步及4/4分析就绪。LF-05、LF-06、LF-07各使用独立空会话，LF-06两轮留在同一会话；不@、不添加附件、不选历史候选。
4. F4参照：0～15秒飞机、30～45秒火车、90～105秒机器人、285～300秒卫星。

**提示词**

LF-05：找出画面里出现黄色机器人，旁边有黑板和桌子的片段。

LF-06第一轮：找出橙色飞机出现在浅蓝色背景中的片段。

LF-06第二轮：找出太空中的卫星，背景有星星和月亮的片段。

LF-07：找出绿色蒸汽火车在铁轨上的卡通片段。

**复现步骤**

1. 在4/4分析就绪的项目内空会话发送LF-05完整查询一次，等待终态，逐个检查返回候选。
2. 新建同项目空会话，发送LF-06第一轮，终态后再发送第二轮；逐轮查看本轮结果，避免把历史卡片计入本轮。
3. 新建同项目空会话发送LF-07，等待终态并下载候选核对实际画面。

**实际结果**

项目ID：`d8fdc734-ddec-4f2d-ac55-e99ff25aab08`。

|场景|耗时|本轮实际返回|
|---|---|---|
|机器人|49秒|match-1-7.mp4机器人、match-2-8.mp4留声机、match-3-1.mp4飞机|
|飞机|39秒|match-1-1.mp4飞机、match-2-7.mp4机器人、match-3-4.mp4自行车|
|卫星|37秒|match-1-20.mp4卫星、match-2-11.mp4宇航员、match-3-6.mp4望远镜|
|火车|49秒|match-1-3.mp4火车、match-2-14.mp4长颈鹿|

机器人会话：https://staging-app.cinlink.ai/c/dc658e37-b6d4-4306-a426-f5b1f6e917b3

飞机/卫星会话：https://staging-app.cinlink.ai/c/422c31d5-f74b-493b-a67d-7ab5d4a634bd

火车会话：https://staging-app.cinlink.ai/c/ca0d51df-d2f8-44f0-a8f5-d6df4b7b11c5

11个实际短片均已下载并可完整解码，1秒抽帧确认上述内容。未取得原始run_id、source_file_id或服务端源起止区间，不用文件名数字推断来源与时间。

**预期结果**

返回候选的实际画面应符合当前查询的目标对象与场景，不将无关留声机、机器人、自行车、宇航员、望远镜、长颈鹿等片段作为相应查询的匹配项。命中目标应可追溯至正确原片与有效区间，首尾目标不越界。

**影响**

用户需要逐个排除明显无关候选，容易误选不符合创作需求的素材，降低检索准确性和后续编辑效率。

**补充**

同步标识：CINLINK-LF05-07-STAGING-20261110-UNRELATED

覆盖LF-05～07，执行日期2026-11-10。本项按共同可观察现象归组，尚未证明各查询的根因相同。LF-06首尾目标均命中，不报尾镜头漏索引或时间越界；LF-07未取得源ID，不认定跨源或跨项目泄漏。部分下载名沿用缓存文件旧命名，画面按实际内容核验，映射及哈希见附件；不把命名差异作为此缺陷根因。查询均只提交一次；下载操作有重复，不是重复生成。

**失败截图**

LF-05：机器人查询返回无关留声机与飞机

![05-result.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=e9f9ebbd8470d857ddb8d4006f)

LF-06第一轮：飞机查询本轮候选结果

![06a-result.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=43d53d10a6a438014f80c03dbd)

LF-06第一轮实际候选直接抽帧：无关机器人

![06a-match-2-7.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=73287de8d3993041c0e97316c9)

LF-06第二轮：卫星查询返回无关宇航员与望远镜

![06b-result.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f49a977e7d57389fe86a586637)

LF-07：火车查询返回无关长颈鹿

![07-result.jpg](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=fe0d15660488bc537b6de1210f)
