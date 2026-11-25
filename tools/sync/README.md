# SYNC-001～006 执行工具

本批六条均读取 `docs/design-cases/multi-workflow/editing-dubbing-sync-cases.md` 的两条完整原始提示词，替换实际云端文件名/ID，通过预发会话发送。素材登记单独记准备轮0。使用用户已登录的 Ego Lite TaskSpace，不新开浏览器、不并发账号任务，已受理或受理未知的请求均禁止重发。

本批业务执行已结束，TaskSpace9已正常关闭，未保留页面。当前结果3 Failed/1 Blocked/2 Needs Review；005/006第二轮因缺P1未提交。以下为执行时命令示例，当前核查优先读取本地证据，不重放本批业务请求。

本次报告目录为 `reports/sync001006-staging-20261116`、TaskSpace 9、页面p1。先读 `execution.json` 再继续；001～006的 `prepare/upload/register/submit/confirm` 有检查点，不能把本批命令整段重放。原片8份哈希和005受控夹具由 `prepare-media.py` 校验，夹具PCM与原WAV逐字节一致；这不代替人工预听。

```powershell
# 只观察已提交的当前用例；wait-ms最大45000
node tools/sync/run.mjs --ego 'C:\Program Files\Citro Labs\ego lite\Application\0.6.2.7\ego-browser.exe' --space 9 --report reports/sync001006-staging-20261116 --case SYNC-003 --action observe --wait-ms 30000
```

所有动作：`prepare`（独立项目/会话）、`upload`、`register`、`observe`、`resume`（回到已有会话）、`submit --round 1|2`、`confirm`（仅审阅方案后）、`download --round 1|2`、`artifacts --round 1|2`、`shot`。第二轮必须已有经媒体检查的P1，已确认语义失败的P1不可进入第二轮。`confirm`不重新生成方案。每步完成再运行依赖步骤，同一检查点不可同时写入。

```powershell
python tools/sync/check-media.py --report reports/sync001006-staging-20261116 --case SYNC-003 --round 1
python tools/sync/transcribe.py --input <实际下载MP4绝对路径> --output <独立ASR输出绝对路径> --language zh
python tools/sync/review-subtitles.py --report reports/sync001006-staging-20261116 --case SYNC-003 --round 1
python tools/sync/compare-media.py --report reports/sync001006-staging-20261116 --case SYNC-003 --round 2
python tools/sync/archive.py --report reports/sync001006-staging-20261116
```

`check-media.py`验证完整解码、时长、音轨、画面比例及P1哈希不变；不把媒体前置通过当整例通过。`review-subtitles.py`校验实际SRT边界、生成每条中心的实际视频帧，并可记录独立ASR辅助偏移。`compare-media.py`仅对页面已记录的实际源段抽帧/波形比对，不假定源片前N秒。剪辑范围存 `steps[].reviewedSourceRanges`，多素材须带实际源文件ID。没有SRT、没有源段表或缺听审时，保留相应待复核项，不虚构结果。

云效定义同步使用 `cinlink-test/.artifact-work/testhub-sync001006` 中的官方OpenAPI计划、检查点及回读文件，已创建WLAX-303～308。它与原SSO批次隔离；不重放原22条SSO同步脚本。登记用例定义不等于通过、创建缺陷或写测试执行结果。
