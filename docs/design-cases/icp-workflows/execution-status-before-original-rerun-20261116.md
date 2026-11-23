# ICP 电商场景测试进度

生产环境，2026-11-16；仅电商Case 01～05。原始钉钉文档未修改。每例使用本批独立会话，素材来自公开商品页或真实测评；本地预制输入不计为CinLink产物。

| 用例 | 场景 | 当前状态 | 实际结果 |
|---|---|---|---|
| ICP-EC-01 | DTC 电动自行车广告投手 | Not Run | 尚未完成执行与业务验收。 |
| ICP-EC-02 | 女装 shopify独立站运营 | In Progress | 尚未完成执行与业务验收。 |
| ICP-EC-03 | 品牌的社媒运营岗 | Not Run | 尚未完成执行与业务验收。 |
| ICP-EC-04 | 准备进军墨西哥市场的自行车DTC品牌运营 | Not Run | 尚未完成执行与业务验收。 |
| ICP-EC-05 | Amazon 美国站手持吸尘器小家电drop shipping 卖家 | Failed | 补齐产品正文和PNG Logo后，首轮生成视频报Tencent VOD video processing failed at the provider，无成片；后续4轮缺少可修改成片，未执行。 |

状态统计：Not Run 3 / In Progress 1 / Failed 1。

## 逐例记录

### ICP-EC-01

状态：Not Run。

尚未执行。

### ICP-EC-02

状态：In Progress。

尚未执行。

[本例会话](https://app.cinlink.ai/c/1efb5685-b017-4572-8603-8ac9a3c1affb)

准备记录：最初一次附25份素材的请求被20素材上限拒绝；未发现已受理run后，改为先载入5份公共参考，再提交20份商品素材。完整输入保留，不削减SKU。初次准备提示与恢复记录单列，不代替制片业务结论。

- 第1轮：任务状态 `running`；run `run_v2_855799c1ecb540f3a18faed90c544245`。
### ICP-EC-03

状态：Not Run。

尚未执行。

### ICP-EC-04

状态：Not Run。

尚未执行。

### ICP-EC-05

状态：Failed。

补齐产品正文和PNG Logo后，首轮生成视频报Tencent VOD video processing failed at the provider，无成片；后续4轮缺少可修改成片，未执行。

[本例会话](https://app.cinlink.ai/c/b36602f5-04b8-42f7-93cf-95d490f3f1c0)

- 第1轮：任务状态 `failed`；run `run_v2_653aabfe4b8f4fcd9885faf69bda27b7`。
  补槽：{"facts": "完整 product-facts.txt 正文", "logo": "同一官方SVG原样渲染的brand-logo.png"}

![ICP-EC-05本轮失败原图](evidence/20261116/ICP-EC-05-failed-vod-provider.png)


## 验收与未覆盖

依据原表首稿和最终Output核验，不验证内部拟定字段/实现算法。后续假设错误未实际发生时，不能伪称已复现；任务未交付成片时，其依赖修改、语义/画面/音画准确性及导出均未覆盖。

Case 03/04使用本地预制的5分钟横版介绍和35秒竖版英语广告；它们基于同一真实产品测评制作，保留原声、来源及英语文字，分别用于比例改版与本地化测试。它们属于测试输入，不是CinLink生成结果。完整测评保存副本约605秒，拼接重叠边界画面已对照，最终文件完整解码无错误；底层分辨率变化已规范化，输入哈希和探测记录留本机。

自动化入口：`tools/icp/run.mjs`；完整原提示词和前置操作见[cases.md](cases.md)，逐步检查点和原始截图位于本批 `reports/dingtalk-cases-93NwLY-20261116/`。本轮未同步云效、未提交或推送Git。
