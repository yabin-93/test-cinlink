# ICP 电商工作流执行

范围仅为钉钉《ICP工作流模拟》“电商场景”Case 01～05，对应 `docs/design-cases/icp-workflows/cases.json`。其他工作表没有默认执行入口。

完整用例正文统一在[《CinLink 测试用例统一入口》电商章节](../../docs/cases/README.md#icp-ecommerce-cases)，含25轮原文提示词、前置和预期。后续修改正文请编辑该章节；原专项`cases.md`只保留跳转，`cases.json`继续作为自动化定义，状态和证据仍在原专项目录。

按用户2026-11-16最新要求，新批次默认 `document-verbatim`：直接发送原表首次提示词及四轮修改原句，不追加操作建议、对象限制或重复要求。素材说明保持为纯事实资料，只有实际补槽或20素材上限等必要情况提供最少信息；旧加提示批次仅保留历史，不继承其结果到原文重跑。

使用已登录的 Ego Lite TaskSpace，`p2` 为 CinLink。生产环境每例建立独立会话，共用本批专用测试项目，不编辑旧项目。首次生成、四轮修改均使用原表完整提示词；补槽按实际素材填写，并沿原任务继续。首稿没有可编辑产物时，依赖产物的修改记未执行，不伪造完成。

示例（将路径和空间编号替换为本机值）：

```powershell
node tools/icp/run.mjs --ego "C:/Program Files/Citro Labs/ego lite/Application/0.6.2.7/ego-browser.exe" --space 8 --report "reports/自己的新批次" --case ICP-EC-05 --action prepare
node tools/icp/run.mjs --ego "C:/Program Files/Citro Labs/ego lite/Application/0.6.2.7/ego-browser.exe" --space 8 --report "reports/自己的新批次" --case ICP-EC-05 --action submit --step 0 --attachments "素材绝对路径清单.json"
node tools/icp/run.mjs --ego "C:/Program Files/Citro Labs/ego lite/Application/0.6.2.7/ego-browser.exe" --space 8 --report "reports/自己的新批次" --case ICP-EC-05 --action observe
```

后续修改使用 `--step 1`～`4`，由执行人先核对原产物、实际触发条件及前一任务终态，再提交。`observe` 只回读，不重发；实际受理 run、提示词、补槽、截图留在原批次。已有检查点禁止自动重建、重试或将历史结果回放为本轮通过。遇用户接管立即停止工具调用。

`download-results.mjs` 读取本轮实际交付；运行中已完成的 `editor_export` 也可提前下载。清单记录 run、文件标识、字节数和 SHA-256；已下载文件校验后复用，未完成的 `.part` 不计成品。认证元数据经当前浏览器读取，签名二进制地址用 Node 流下载，原始地址只在内存中使用。

结束后先运行 `python tools/icp/archive.py --report reports/自己的批次`，再运行 `python tools/icp/audit-records.py --report reports/自己的批次`，最后再次归档以显示核对结果。核对包含源表原文、实际受理的会话及任务、终态、未执行前置、失败截图原样复制和实际下载文件哈希；不重发任务、不用历史结果代替实跑。首稿失败后，只跳过确实依赖成品的修改；仍可基于源素材独立执行的轮次应继续。

`verify-speech.py --manifest <本轮manifest.json> --model <已有本地Whisper模型文件> --ffmpeg-dir <本机FFmpeg目录>` 只对已下载的实际音轨作离线核验，使用已安装依赖和已有模型；结果是辅助证据，ASR错字和不确定尾词不能单独作为缺陷。它不修改视频或字幕。`archive.py --report <本批报告目录>` 同步场景状态、逐轮业务验收、依赖未执行原因及失败原图。

Case 02先用 `--action references --attachments "公共参考5份路径.json" --extra-file "sku-table.txt"` 载入参考资料，并用 `observe` 等待接收确认。随后再 `submit --step 0`，附10张商品图和10段视频。`submit`仅在资料接收任务已完成后结束准备阶段。`observe --wait-ms 45000`可持续观察最多45秒；后续沿同一报告目录继续观察即可，不重发任务。

`attachments` 为 JSON 绝对路径数组，文件应先验证可解码及对应关系。单次请求最多20个素材；公共参考资料可以在同一会话前置载入，再提交商品素材，保留完整输入，不能删除SKU来凑数量。被服务明确拒绝且核实没有受理 run 的准备尝试单独保留，恢复时先核对状态。原始上传资源上限提示不能当作制片结果。

`prepare-video-fixtures.py` 使用本机已有 FFmpeg/FFprobe，准备真实测评的浏览器保存副本、5分钟产品介绍和35秒本地化输入。它只在本地准备测试输入，不调用 CinLink，不可计作其生成成功。保留来源、原始分段、英文字幕、音乐署名及探测记录；核验时长、比例、音画与拼接边界后才能上传。所有素材、签名地址和原始记录只放已忽略的 `reports/`；不添加仓库依赖。

素材采集辅助函数 `collect-asos.mjs` 仅读取公开商品页，按真实商品ID去重并核对视频对应关系。商品网站协商返回JPEG XL时，须先转换成受支持的真实JPEG；不能只改扩展名。
