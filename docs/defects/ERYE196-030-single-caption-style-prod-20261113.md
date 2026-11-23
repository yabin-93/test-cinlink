# 【ERYE196-030】指定单条原文字幕的字号颜色修改被拒绝

云效：[FWXC-573](https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#openWorkitemIdentifier=8d1b8540c0cf21b590f2227d55)；状态：🤔AI提缺陷。首次实测2026-11-13，2026-11-16同步；正文、业务字段及附件回读通过。

**现象**

仅修改C1字号为48、颜色为黄色时，应用说明仅支持工程共享样式，目标单条效果未实现。

**前置步骤**

1. 生产环境，测试账号yabinc92，Chrome有头浏览器。
2. 20秒E196-A20-controlled.mp4已含两句原文及对应中文译文；原文Welcome4～6秒、Second caption10～12秒，全部Arial40/白色。

**提示词**

目标指令（首次实测完整原文）：

```text
仅将C1原文字号设为48，颜色#FFFF00，其余字幕及译文样式保持不变。正式ERYE196-030：当前E196-A20-controlled.mp4的字幕已通过页面准备为Arial、40号、白色。C1原文Welcome 4～6秒，project_id=79784c8a-b5f7-4497-9929-1ea23b39d838，原文file_id=file_cloud_wmb2ycdnyp2buwvkq7icgbuwcb，block_id=80c24d5c-c7cb-4086-89c5-73fed3058d23。只此C1原文变48/黄色；中文译文欢迎及中英C2（Second caption/第二条字幕，10～12秒）保持40/白色，不改变文字、时间、视频或声音，不用整份全局样式修改替代单条范围，不生成替代视频。
```

**复现步骤**

1. 核对并保存40号白色基线，发送只修改C1原文的完整指令。
2. 查看回复及字幕，刷新重开并检查样式和其他cue。

**实际结果**

应用表示不能按单条字幕设置字号和颜色，未使用全局修改替代。刷新后仍4条中英字幕、共享40号白色，C1未变48/黄色。

首次实测会话： https://app.cinlink.ai/c/cc2fd674-0c0f-457f-bcec-8d258cba70a6

**预期结果**

仅C1原文变为48号、#FFFF00，译文及其他cue保持40号白色，文字和时间不变。

**影响**

无法对一条字幕做局部视觉强调。

**补充**

同步标识：ERYE196-030-PROD-20261113-SYNC-20261116

正式请求仅受理一次；提交前的本地输入同步调试不作为产品失败。

首次实测日期2026-11-13；本次于2026-11-16整理和同步，未重跑业务。原指令中的对象ID为首次实测定位，当前会话经历后续测试；复现前按前置恢复基线并读取该次真实对象标识。未覆盖的后续步骤不计通过。

实际提交时间、完整原指令与必要对象/轨道核对见附件 `ERYE196-030-evidence-audit.json`。原始带签名链接的HAR、浏览器状态和登录资料未上传。

**失败截图**

ERYE196-030 2026-11-13真实场景证据：030-outcome.png

![030-outcome.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=6805e5b3d66c86a4f3c90be583)

ERYE196-030 2026-11-13真实场景证据：030-saved-style-proof.png

![030-saved-style-proof.png](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=0fdbae4b1a592c30736c7c2de1)
