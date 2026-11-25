# ERYE-210 自动化接入与生产验证（2026-11-13）
001～010已接入仓库脚本；本次只额外执行001/006用于验证导航脚本，均Passed。原人工实测结果不因接入而改变；008 v2尚未执行；没有重新触发003/004/005生成或分析任务。
串行1 worker、retries=0，有头Google Chrome，生产app.cinlink.ai；每次新建专用项目、独立会话/工程，素材基线只读。
首次验证的字体等待、登录过期和隐藏图片定位属于脚本接入问题，原始输出保留在本机reports/editor-210。已经修正字体截图等待、轮转登录状态保存、前置分类及图片定位范围；用户重新登录后按新批次核验，001/006最终均通过，不将工具错误登记为产品缺陷。
[运行配置与覆盖边界](automation.md) · [实际用例进度](execution-status-current.md) · [脱敏核验数据](evidence-automation-20261113/execution-evidence.json)
| 用例 | 自动化验证 | 会话/工程 |
|---|---|---|
| ERYE210-001 | Passed | [新会话](https://app.cinlink.ai/c/045735da-83f5-4cad-8fcd-64138bb7fe13)；`10fcb24c-f216-454e-8beb-995e410b4334` |
| ERYE210-006 | Passed | [新会话](https://app.cinlink.ai/c/3776b3a8-df40-410b-afe5-b0f48256d876)；`be41b33c-22d3-48a9-84ad-720869256595` |

001核对五入口名称顺序、逐页对应面板、返回Media及完整保存内容不变。006核对真实Watermark两级控件、文字/图片子页及完整保存内容不变；没有把时间线选择当成独立快捷结果入口。

## ERYE210-001 页面证据

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-001-媒体.png)

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-001-字幕.png)

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-001-文稿.png)

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-001-水印.png)

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-001-配音.png)

![ERYE210-001 自动化实际页面](evidence-automation-20261113/ERYE210-001-ERYE210-001-passed.png)

## ERYE210-006 页面证据

![ERYE210-006 自动化实际页面](evidence-automation-20261113/ERYE210-006-006-图片水印.png)

![ERYE210-006 自动化实际页面](evidence-automation-20261113/ERYE210-006-006-文字水印.png)

![ERYE210-006 自动化实际页面](evidence-automation-20261113/ERYE210-006-ERYE210-006-passed.png)
