# FWXC-414 预发持续回归（2026-11-14）

原验收已Failed：合法单视频裸链接应默认导入完整原片，本轮初始请求直接KeyError: 'params'，未得到原片。原“强制目标澄清”现象未走到，不能称原澄清复现；但同一默认导入验收仍未满足，不能因错误文案变化判修复。与416（原验收仅实际画质展示）、399/403（原验收待确认任务复用）的依赖前置Blocked分开。

Chrome有头、预发staging-app.cinlink.ai、yabinc92，专用项目6c8f7092-e692-42b0-bc72-fc5200d883d8。每个原参数及扩散独立干净新会话，只发送表中完整链接一次，无附件/@/额外目标。失败后不点重试，后续补槽“仅导入”未出现。

| 分支 | 完整提示词 | 结果 | 本轮会话 |
|---|---|---|---|
| Oa | https://www.youtube.com/watch?v=aqz-KE-bpKQ&t=445s | Failed | fd17c216-6d36-4fff-96c3-924cdfc7bea0 |
| Ob | https://www.youtube.com/watch?v=aqz-KE-bpKQ&start=445 | Passed | d99b4073-8d57-421f-a744-3504a083bcc5 |
| Oc | https://www.youtube.com/watch?v=IwZVXmQdX1E&list=PLB29CbKaE2OY | Passed | 11dcf037-7059-4a67-acca-759175dca37f |
| E1 | https://youtu.be/aqz-KE-bpKQ?t=445 | Passed | 09d88fdc-e71c-4017-92cf-47d03efc0b67 |
| E2 | https://www.youtube.com/watch?v=IwZVXmQdX1E&list=PLB29CbKaE2OY&t=10s | Passed | f1bcec14-9887-4b1f-9cb1-3fe0b2ba3b21 |

终态证据为reports/fixed-monitor-20261114-020020/414-分支-import-readback.txt及import-result.png原始截图。Oa未形成素材，原澄清现象未覆盖。Ob/Oc/E1/E2均实际下载，本轮SHA验证：Ob与E1同一743,401,675字节MP4、634.62秒4K AV1 60fps+AAC 5.1；E1整片音视频解码exit0（1110.08秒），Ob按本轮文件字节同一性共享此解码证据。Oc与E2同一90,903,419字节WebM、66.79秒4K AV1+Opus；Oc完整解码exit0（65.63秒），E2按同轮SHA同一性共享该解码证据。未把历史解码冒充本轮，也未重复下载/提交同一业务任务。所有SHA、精确时长、下载路径及解码源见414-分支-file-audit.json。Oc30秒实际提帧已核验月面登月器，与源一致。1个原分支失败、其余2原分支及2扩散通过，整体Failed。

云效状态按本轮实际Failed同步并回读，详见同批cloud-updates/FWXC-414/result.json；结果文件不存在时表示尚在同步，不假报成功。不自动评论、新建缺陷或Git提交推送。固定脚本未接入，仍PLAN。
