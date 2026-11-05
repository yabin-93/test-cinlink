# ERYE196-001 用户当前工程复测

日期：2026-11-05，Asia/Shanghai。本次仅重新执行001。用户明确指定“使用我打开的这个项目”，因此使用其当前工程，不再切到上一批20秒测试PA。保持本机有头Chrome，串行、零业务重试。

**最新结论：ERYE196-001 Passed。** 用户于2026-11-05明确“开发怎么实现的具体可以不验证”，本例按可观察业务结果验收：支持能力/当前工程可读取，选区及轨道匹配，视图操作正常，工程内容、版本和可观察编辑历史保持。字段等价映射、特定字段名/类型及服务端历史实现不再作为001的验收或阻塞项。此前Blocked是范围确认前的历史判定；本次依据同批真实证据更新结论，没有新增运行或补造证据。

## 实际工程及操作

- 工程：`张雅婷(Tin)分享的视频.mp4`；projectId=`3bc78d71-8cf6-4caf-b347-a2f19962f471`。
- 会话：`bb4f1a9a-c3fb-4de0-aa25-f48f15621303`；页面时长02:00.33。界面工程身份、活动编辑会话和详情接口中的projectId一致。
- 环境：staging-app.cinlink.ai，Chrome 156.0.8078.80。实际部署提交未取得；本机staging源码仅用于解释数据结构，不等同部署回执。
- 读取当前工程详情和浏览器编辑器状态后，点击时间尺移动播放头，放大时间轴，切换素材面板，再切换字幕面板；随后重新读取工程详情及本地历史。
- 先以真实DOM确认播放头00:06.00、时间轴缩放1.5→2.25、素材/字幕面板实际展开；发现正式读取入口后，继续验证播放头6→8秒、缩放2.25→1.5、素材→字幕面板，并确认服务端页面上下文同步。各步骤保留原始截图；不包括编辑字幕、拖动片段或更改样式。

## 核验结果

| 检查点 | 实际结果 | 判定范围 |
|---|---|---|
| 工程上下文 | UI、活动编辑会话、服务端详情均对应上述projectId；选中对象列表为空 | 通过；并由下列正式工程/页面读取交叉核对 |
| 正式能力发现 | `POST /cloud-tool-api/mcp/editor`的initialize及tools/list均200；serverInfo=cinlink-editor/1.0.0，协议2025-06-18，返回109个工具及inputSchema/约束/只读标记 | 通过实际部署接口发现目录，不以旧REST路径404判能力缺失 |
| 正式工程/页面读取 | editor_project_get、editor_view_get均200；显式指定页面session_id=`47ddfa63-b99f-404f-aa52-8c53e21f527e`，项目/CID/选区/轨道与当前UI一致；页面视图变化回读收敛 | 通过；当前工程/选区及轨道正确，视图回读同步 |
| 能力信息 | 只读取得实际页面中的contract_version=1、92项supported_operations、parent-layout-v2，以及请求大小33554432字节/字幕块上限100000等前端目录字段 | 已获得前端能力目录；未验证所有目录操作或服务器限制有效性 |
| 服务端版本 | 前后revision均为3，updated_at未变化 | 通过 |
| 工程内容 | 前后完整content深比较及规范化SHA-256一致 | 通过；没有修改源视频/字幕/音轨内容 |
| 本地编辑历史 | past 1→1、future 0→0；pending=0、无inflight保存 | 通过（可观察编辑历史） |
| 写入观测 | 视图操作期间没有工程编辑保存、编辑命令、撤销/重做或turn提交请求 | 通过；view/exchange为只读视图票据交换，不计编辑提交 |
| 旧路径与字段差异 | `/cloud-tool-api/v1/editor/capabilities`和`/cloud-tool-api/v1/editor/context`仍404；实际采用上述MCP入口及数值revision、timeline_rows，无独立timelineId/revisionToken字段 | 仅保留诊断差异；按用户确认，不验证字段命名/类型映射，不作为001阻塞 |
| 服务端历史 | 实际详情响应不包含history；浏览器状态中durable history为空 | 实现细节不纳入本次001验收；保留未查询事实，不要求补齐 |

浏览器状态仅用于测试诊断，按字段白名单只读提取能力目录、工程ID/版本、历史计数及选区，没有调用React setter、修改业务状态或拦截/伪造接口。初次诊断读取的视图缓存滞后，已改用DOM及正式MCP页面回读确认；原辅助记录保留，不将其等待异常计作产品失败。查询返回多个同工程页面时，显式绑定与当前UI变化同步的页面会话，未混用其他窗口结果。最终依据`view-actions-confirmed.json`、`formal-context-check.json`、前后服务端快照及历史计数。

请求审计中有一条较早的浏览器MCP POST没有保留工具名；未将其仅凭HTTP方法判成写入，也不宣称该条已逐项分类。工程save/commands/turns等写入为0，快照及本地历史不变；后续主动调用的initialize/tools/list/editor_project_get/editor_view_get均为已核验的读取操作。

没有发送自然语言提示词或提交AI任务；本例为读取及视图操作，不需要补槽。002～005未重跑、状态不变。001按用户确认的业务验收口径更新为Passed；用例正文同步移除对特定字段及服务端历史实现的要求，保留读取身份正确、视图正常、内容/版本/可观察历史不变的业务预期。002～005的实际阻塞没有通过本次口径确认自动解除。没有云效写入、产品源码修改或发布。

## 本批截图及证据

| 内容 | 原始截图 |
|---|---|
| 用户指定工程、执行前状态 | [执行前](../../../../reports/erye196-001-rerun-20261105-1829/01-user-project-before.png) |
| 播放头移动到6秒 | [播放头](../../../../reports/erye196-001-rerun-20261105-1829/02-playhead-moved.png) |
| 放大时间轴 | [缩放](../../../../reports/erye196-001-rerun-20261105-1829/03-timeline-zoomed.png) |
| 素材面板 | [素材](../../../../reports/erye196-001-rerun-20261105-1829/04-media-panel.png) |
| 字幕面板 | [字幕](../../../../reports/erye196-001-rerun-20261105-1829/05-captions-panel.png) |
| 最终用户工程状态 | [最终状态](../../../../reports/erye196-001-rerun-20261105-1829/06-final-user-project.png) |
| 正式上下文回读后最终8秒/字幕面板 | [正式回读最终状态](../../../../reports/erye196-001-rerun-20261105-1829/07-formal-context-final.png) |

本机底稿`reports/erye196-001-rerun-20261105-1829/`：`before.json`、`after.json`、`runtime-before.json`、`runtime-after.json`、`view-actions-confirmed.json`、`formal-context-check.json`、`formal-view-before.json`、`formal-view-after.json`、`mcp-initialize.json`、`mcp-tools-list.json`、MCP工程/页面读取原始响应、`requests.json`、`read-interface-probes.json`、`summary.json`和`evidence-manifest.json`。00-opened-project.png是用户指定当前工程前的准备截图，排除在本例七张证据之外；final-check.json为发现正式MCP入口前的中间检查，以summary.json及formal-context-check.json为最终结论。

有头浏览器保留在用户工程。上一批独立PA的revision 4结果仍见[原执行记录](results-001-005-20261105.md)，不混作本次工程的revision 3结果。
