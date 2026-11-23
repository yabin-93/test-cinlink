# 【ERYE196-023】多次分割导出后出现源帧跳过和中段黑帧

云效：[FWXC-572](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=610b6e5c26545cf72f39c59305)；状态：🤔AI提缺陷。首次实测2026-11-13，2026-11-16同步；正文、业务字段及附件回读通过。

**现象**

三次分割、裁尾保存后，CFR导出首切点跳过源帧，VFR导出内部切点出现仅保留字幕的黑帧。

**前置步骤**

1. 生产环境，测试账号yabinc92，Chrome有头浏览器。
2. 独立源E196-CFR2997-32s.mp4与E196-VFR-32s.mp4，约32秒、1280×720，含源帧标记及英语原声；现成E196-BTIME32.srt含85条逐词字幕。
3. 分别打开独立工程并绑定同一原文SRT；CFR工程29.97fps，VFR工程21.001fps，源PTS及独立字幕基线已记录。

**提示词**

目标指令（首次实测完整原文）：

```text
ERYE196-023的CFR29.97样本，先执行第一刀：在时间线10.01秒附近的合法帧边界分割当前唯一视频，原声同步，保留完整源内容和全部85条逐词字幕。项目72334178-7e96-4d12-b2a5-40a6243138cc，实际项目fps=29.97，视频track_id=21cb8bde-a279-4958-90a5-e8ae295987bb，clip_id=a8b30cc7-31df-4f48-b029-da68a571eb2a，file_id=file_cloud_j4cknpzljr6jmnut4xbcsposqi，源0～31.998634、时间线0起、速度1；原声track_id=8f22c4ca-f415-4d3e-89e7-f2d8b014812f，clip_id=ab851366-f0e1-4765-9905-162b9bd132b9同源同时间。源帧时间戳有10.01秒，若需按项目帧对齐，用第300帧约10.01001秒并记录实际切点，允许正常源帧/项目帧映射，不自行发明同步阈值。本轮仅做第一刀并保存，暂不做20/30秒下一刀或裁剪；不要求多刀原子事务，不新建工程或生成视频。请实际执行，不只描述计划。
```

后续实际补充/执行指令（完整原文）：

```text
继续ERYE196-023 CFR样本，现在仅执行第三刀：工程72334178-7e96-4d12-b2a5-40a6243138cc目前实际有三段，切点10.01001001和20.02002002，第三次页面分割按钮未启用，没有发生第三刀。请对当前最后视频片段在项目第900帧即时间线30.030030030030秒分割并保存，原声同步，原有切点和85条逐词字幕保留不变。视频track_id=21cb8bde-a279-4958-90a5-e8ae295987bb，clip_id=768fc7b1-cb97-4746-8a77-4099f3d1eb1b，file_id=file_cloud_j4cknpzljr6jmnut4xbcsposqi，源20.020020020019984～31.998634，时间线从20.020020020019984起，速度1；对应原声track_id=8f22c4ca-f415-4d3e-89e7-f2d8b014812f，clip_id=6afafa4c-c8e6-4811-b37e-25b0b14dc184，源时间相同。本次只做这一刀，不裁剪、不新建工程、不生成视频。
```

后续实际补充/执行指令（完整原文）：

```text
ERYE196-023 CFR样本已完成三刀，现仅将最后视频片段尾端裁剪到项目第958帧，即时间线/源出点31.965298631965秒，同步缩短最后原声尾端。当前工程72334178-7e96-4d12-b2a5-40a6243138cc，视频track_id=21cb8bde-a279-4958-90a5-e8ae295987bb，最后clip_id=split_b73a260bf64310bc5ae29aac3767c8d4，当前源30.03003003003～31.998634，时间线30.03003003003起，速度1；原声track_id=8f22c4ca-f415-4d3e-89e7-f2d8b014812f，最后clip_id=edit_5454dae45cbe4fc816a6f591a35a8690。仅裁尾，不改变前三段及既有切点，不变速，不移动或改写85条字幕，不新建工程、不生成替代视频。请实际执行并保存，记录最终结束值。
```

后续实际补充/执行指令（完整原文）：

```text
ERYE196-023 VFR样本，当前既有工程0f405afd-dcfd-4bd8-b355-e3c7a0689c93实际fps=21.001，先仅在项目第210帧、时间线约9.999523832198秒执行第一刀，原声同步，保留完整源内容及85条逐词字幕。视频track_id=7568a0b3-c6df-46d1-917b-75efd5a66fe8，clip_id=63dc260e-f1e2-4c58-ba0b-7edd319b14d7，file_id=file_cloud_q2pqjsbutvirqqyzym7d5ow7tx，源0～31.998634、时间线0起、速度1；原声track_id=2313d4d2-76f4-4f9c-886b-4c81108c39f7，clip_id=c041e089-08b5-40e8-a936-1b525510ef38同源同时间。源是实际可变帧率，PTS相邻间隔约0.03337/0.06673秒，允许实际项目帧/源帧合法映射，记录保存切点；本轮仅做这一刀，不做后续20/30秒或裁剪，不新建工程或生成视频，请实际执行并保存。
```

后续实际补充/执行指令（完整原文）：

```text
ERYE196-023 VFR样本已完成三刀。现在裁尾并同步处理跨尾端字幕：当前工程0f405afd-dcfd-4bd8-b355-e3c7a0689c93，将最后视频片段尾端裁到项目第671帧，即时间线/源出点31.950859482882秒，最后原声尾端同步缩短。视频track_id=7568a0b3-c6df-46d1-917b-75efd5a66fe8，最后clip_id=68878fab-ffdf-4302-9d39-f0f54a4b79d0，源29.998571496595574～31.998634、时间线29.998571496595574起，速度1；原声track_id=2313d4d2-76f4-4f9c-886b-4c81108c39f7，最后clip_id=7bef9bc4-6941-477b-b20b-2200b9c72a07。原文字幕file_id=file_cloud_tfkj3bmjpsh4qs5grunabdi2p7、track_id=subtitle:file_cloud_tfkj3bmjpsh4qs5grunabdi2p7，末条block_id=block_8ea4dbdf6b2b46d74977db72，pediatrician,从31.4到32.0秒跨新片尾，请仅将此条结束同步缩短到31.950859482882秒，起点和文字不变，防止旧字幕延长工程。保留前三段和既有切点、其他84cue及所有文字，不变速、不新建工程、不生成替代视频。可按实际工具顺序完成裁尾及末cue时间更新，不要求原子事务；请实际执行并保存。
```

**复现步骤**

1. CFR发送第一刀指令，在项目300帧分割；随后页面于600帧分割，按完整第三刀指令于900帧分割。
2. 按CFR裁尾原指令缩短至958帧，保存重开并导出。
3. VFR发送第一刀指令于210帧分割；页面于420、630帧继续分割，再按裁尾指令缩短至671帧并同步末条字幕结束。
4. 分别检查实际导出逐帧标记、源PTS、切点前后画面及首中末音频。

**实际结果**

CFR切点10.01001001/20.02002002/30.03003003秒，视频/原声尾31.96529863秒；导出帧299为SRC299，下一帧300为SRC301，源SRC300在该切点被跳过。VFR切点9.99952383/19.99904766/29.99857150秒，尾31.95085948秒、末cue已截尾；导出帧419（19.951431秒，第二切点之前）变黑仅留字幕，独立源同期有人像，帧420恢复。两版首中末PCM抽样均零偏移，相关系数0.9989～0.9999。

首次实测会话： https://app.cinlink.ai/c/b0685856-852a-4826-bcfa-5d5aca295e6c

VFR: https://app.cinlink.ai/c/c354b90c-af9e-449d-8574-7515cb381476

**预期结果**

合法帧映射及分割后，切点附近应保留对应源画面，不产生额外黑帧或内容跳失；字幕、音频与保存工程及成片对应。

**影响**

多次剪辑后的实际成片在切点产生可见异常，保存的连续源映射不足以保证交付画面正确。

**补充**

同步标识：ERYE196-023-PROD-20261113-SYNC-20261116

失败依据是源画面跳失和内部切点黑帧，未自行设定毫秒同步容差。普通VFR合法转帧采样变化未按CFR逐帧一一对应标准判错。CFR末尾黑场由该轮明确保留末字幕至32秒的测试参数引入，已排除，不作为本缺陷现象。未做人工全片听审。输入源、实际成片、SRT及量化审计均附后。

首次实测日期2026-11-13；本次于2026-11-16整理和同步，未重跑业务。原指令中的对象ID为首次实测定位，当前会话经历后续测试；复现前按前置恢复基线并读取该次真实对象标识。未覆盖的后续步骤不计通过。

实际提交时间、完整原指令与必要对象/轨道核对见附件 `ERYE196-023-evidence-audit.json`。原始带签名链接的HAR、浏览器状态和登录资料未上传。

**失败截图**

ERYE196-023 2026-11-13真实场景证据：023-cfr-independent-source-frame-300.png

![023-cfr-independent-source-frame-300.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=648040d345d7750dc015b2e8a8)

ERYE196-023 2026-11-13真实场景证据：023-cfr-exact-export-frame-299.png

![023-cfr-exact-export-frame-299.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=9b8be13906a159e35d86c90ffd)

ERYE196-023 2026-11-13真实场景证据：023-cfr-exact-export-frame-300.png

![023-cfr-exact-export-frame-300.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=c1d1bc23f31e349cdd390521b2)

ERYE196-023 2026-11-13真实场景证据：023-vfr-exact-source-frame-419.png

![023-vfr-exact-source-frame-419.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=36d708f7fafba4319f6db36337)

ERYE196-023 2026-11-13真实场景证据：023-vfr-frame-19.95.png

![023-vfr-frame-19.95.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f811a4a28e4cf398e77d9ed590)

ERYE196-023 2026-11-13真实场景证据：023-vfr-exact-export-frame-420.png

![023-vfr-exact-export-frame-420.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=f47f39d82bd17a700218a498c0)
