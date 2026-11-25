> 2026-11-16最新范围：058已按用户要求删除，不再执行；旧Blocked及原批次统计只作历史。当前有效63条（18P/7F/1B/31NA/6NR），051～068现行15条8P/1F/0B/6NA。见[退役说明](retired-case-058-20261116.md)。

# ERYE199-068 v2：空工程总空态生产复测通过

日期：2026-11-16（Asia/Shanghai）；结果：**Passed**；自动化：AUTO。仅068重跑，其他用例未执行。

生产环境app.cinlink.ai；Ego Lite有头TaskSpace1。新测试项目`34d783a5-d5d5-4f99-94c9-7bca65689763`，新会话`c65a8e1c-dc15-4009-9887-eaedf098038b`，新工程`971badb4-64e1-42ac-9157-a762d6187fb1`；名称`ERYE199-068-2026-11-16T03-05-58-402Z`。无媒体、字幕、配音、水印或业务任务；本次没有上传素材、生成任务、computer-use、云效写入或推送。

## 本例范围

按用户要求，以当前空工程总空态为准。完整前置及新版定义见[正式用例](cases.md#erye199-068-current)及[修订说明](revision-068-empty-project-20261116.md)。本例无需提示词，不点击选择媒体；仅检查该按钮状态，不声称文件选择／导入流程或独立字幕／素材两页空态已验证。旧版Blocked保留于[原定义和结果](revision-068-original-20261116.json)。

## 实际步骤和结果

| 步骤 | 预期 | 实际结果 |
|---|---|---|
| 打开新空工程 | 明确标题和媒体操作说明，非白屏且无错误提示 | 显示“空白工程”与“在此上传或选择媒体，进行清理、缩短、翻译和添加字幕。”；无错误 |
| 检查按钮 | 选择媒体可见启用，无内容时导出禁用 | 两个按钮状态均符合，未点击文件选择 |
| 刷新页面并打开同一工程 | 同一名称／ID，仍为空态 | 标题、说明和按钮状态均保持 |
| 收起编辑区再展开 | 返回本例同一空工程 | 页面恢复正确空态，没有切到历史内容 |
| 核对工程及会话 | 不增加对象或任务 | 每阶段完整内容与基线一致；会话无run记录；未上传夹具 |

## 截图与核验

![初始空态](evidence-068-v2-empty-project-production-20261116/068-initial-empty.png)

![刷新后的空态](evidence-068-v2-empty-project-production-20261116/068-refreshed-empty.png)

![收起编辑区](evidence-068-v2-empty-project-production-20261116/068-editor-collapsed.png)

![重新展开后的空态](evidence-068-v2-empty-project-production-20261116/068-reopened-empty.png)

[按钮与页面状态核验](evidence-068-v2-empty-project-production-20261116/validation.json) · [执行摘要](evidence-068-v2-empty-project-production-20261116/execution-summary.json) · [SHA256清单](evidence-068-v2-empty-project-production-20261116/manifest.json)

## 执行环境与历史

开始时Ego Lite要求GUI初始化，用户确认完成后连接恢复。首次截屏因窗口最小化中断，随后恢复本TaskSpace窗口，在原工程继续；这属于执行环境问题，不作为产品失败。所有截图为本轮原图，未使用2026-11-13旧截图替代。

## 脚本及进度

068已原位更新在cases-051-068.mjs。单独执行068不会准备或上传无关媒体，无新增依赖。

```powershell
npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 068
```

有效64条当前：**18 Passed、7 Failed、2 Blocked、31 Not Applicable、6 Not Run**。原16条范围按最新定义为8P/1F/1B/6NA，068 v2 Passed；2026-11-13原批7P/1F/2B/6NA仍为历史。058及006保持Blocked；原6条优化版仍Not Run。旧两页目标不据新版通过宣称覆盖。
