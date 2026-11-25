> 本文保留 v3 的定义或原判。用户将创建前入口更正为「选择媒体」后，按原证据复核为 Passed。[v4 复核记录](revision-051-select-media-20261123.md)

# ERYE199-051 v3：新建视频工程入口

2026-11-23 用户确认：同一会话还没有视频工程时，显示「新建视频工程」；创建视频工程后，同一入口隐藏。新版按该规则验收，状态为 Not Run，手工执行。 [完整用例](cases.md#erye199-051-current-v3)

051 v2 曾按源码补充「导入普通 MP4 新建工程」。当时生产环境未出现该入口，实测标记 Blocked。该结果、步骤和截图作为 v2 历史保留。自动化运行器识别 051 编号并输出 Not Run，不调用旧版导入脚本。 [v2 实测](results-nine-v2-production-20261116.md#erye199-051)

[ERYE-199](https://devops.aliyun.com/projex/req/ERYE-199) 第 10 节 PE16 / AT15 属于 G3 的 Premiere 工程导入与还原。验收需准备已确认支持的真实 .prproj、依赖素材及参考结果，对照根序列、依赖重连、四级还原报告和 CinLink 副本，核对源工程未被覆盖。FCP7 XML 为备选路径。此专项沿用原延期记录，051 v3 的入口结果不计入该专项的覆盖或通过率。

本次为用例定义修订，未执行生产页面。修订后 142 条有效用例中，46 Passed、20 Failed、1 Blocked、21 Not Applicable、54 Not Run。

同日已完成生产实测，状态更新为 Failed。[结果与截图](results-051-v3-production-20261123.md)
