# 本地素材查找专项运行

`npm run test:footage` 仅执行LF-01～03，有头、一个窗口、单worker、零自动重试，不并入默认预发/卡片套件。结果写入带时间戳的独立 `reports/local-footage-*`。

前提：有效登录态、指定目录原视频、Chrome、Python/OpenCV、ffmpeg；当前机器均已具备。脚本会真实创建项目、上传/关联素材、分析并查询，可能消耗积分。首次原生文件夹选择需操作员选择脚本输出的临时夹具目录，后续自动继续；不伪造File System Access句柄或业务响应。

若本轮已通过产品UI上传四个原片，可设置 `CINLINK_FOOTAGE_SOURCE_PROJECT` 为该项目ID，LF-01直接使用它，LF-02/03新建单素材项目并关联相同原片；逐项验证文件集合及云端回读哈希。不要未经检查直接填入历史项目ID。

可选配置：`CINLINK_FOOTAGE_REPORT_DIR`指定本轮全新报告目录；`CINLINK_FOOTAGE_MEDIA_ROOT`改变原片根目录（哈希须匹配登记）；`CINLINK_FOOTAGE_CHROME`指定已安装Chrome路径。`CINLINK_FOOTAGE_CDP_ENDPOINT`只接受本机地址，可复用一个已经登录的测试窗口，脚本结束后保留它供检查。

修正断言或核验原结果时，设置 `CINLINK_FOOTAGE_RESUME_AUDIT_DIR` 指向已有逐例JSON目录，再指定新报告目录。脚本核对用例、提示词、原片哈希、原分析就绪证据后回读原run、下载和播放，**不重新提交任务**。必须保留原JSON、项目和会话，不能把回读称为新的服务端复测。

用例与素材：[当前28条正文](../../docs/design-cases/multi-workflow/local-footage-p0-cases.md) · [新增F5/F6素材](../../docs/design-cases/multi-workflow/local-footage-p0-cases.md#lf-real-media)；[最新逐例执行状态](../../docs/design-cases/multi-workflow/local-footage-execution-status.md)。当前28条已执行，15 Failed/13 Passed（各例限定范围），新增11条本批7 Passed/4 Failed；自动化仍仅LF01～03，PLAN不等于未执行。旧[2026-11-04执行记录](../../docs/design-cases/multi-workflow/local-footage-results-20261104.md)保留作历史。

当前Mac原片目录：`/Users/edy/Pictures/测试素材/单音频轨道/素材查找/`，已增至6片。旧LF01～17按各例F1～F4集合准备，不能整目录上传而改变范围；新增G56仅放F5 `7MB.mp4`与F6 `9s.mp4`，本轮预发项目3a1225cf-106d-4b61-86e8-e98158a18507已创建、上传2片并分析2/2。[本批报告](../../docs/design-cases/multi-workflow/local-footage-results-staging-18-35-20261110.md)。
