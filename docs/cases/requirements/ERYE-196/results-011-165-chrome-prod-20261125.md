# ERYE196-011～165 Chrome生产执行记录（2026-11-25）

用户确认本轮执行011～165，共155条；001～010本轮结果及历史记录保留。本次为普通用例执行，非云效已修复缺陷专项回归；按正文原步骤、参数组及轮次执行。涉及U2的分支按既有指示暂缓，不以同账号多浏览器冒充。

视频/图片须先处理返回产物再建工程；同一专用测试项目可新建多个会话。每例核验独立或恢复后基线；固定自动化保持PLAN，与有头CUA及临时审计分开。执行结果不写用例正文或统一README。

## 执行检查点

011前置处理中：新会话仅对A20完整0～20秒生成产物并打开对应工程，B10登记备用。只提交一次，尚未将工程创建或正式用例判为通过。

证据：reports/erye196-011-165-chrome-prod-20261125/；检查点checkpoint.json。

<!-- ERYE196-011165-RUN-20261125 -->
本轮已记录2/155；{"Passed": 2}；待执行153。当前阶段：013_subtitle_preparation。未执行条目不沿用历史结果充当本轮通过。

| 用例 | 本轮状态 | 固定脚本 | 实际结果与边界 |
|---|---|---|---|
| ERYE196-011 | Passed | PLAN / — | A0～20、B20～30基线已保存；首次“在B片段内部第4秒分割，不修改A”46秒完成，B形成20～24/24～30两段，A保持0～20，总长30秒。播放23～25秒，B源从约3.16连续到5.08秒；保存重开仍三段，原声两段范围保持。 |
| ERYE196-012 | Passed | PLAN / — | 0秒和20秒从同一20秒视频/原声保存基线分别测试。两组均先要求合法内点，仍按原边界0/20填写后明确拒绝，未产生零长片段或额外切段；每组刷新重开仍视频/原声0～20，撤销/重做可用状态保持。 |

### ERYE196-011 — Passed

```json
{
  "case": "ERYE196-011",
  "status": "Passed",
  "summary": "A0～20、B20～30基线已保存；首次“在B片段内部第4秒分割，不修改A”46秒完成，B形成20～24/24～30两段，A保持0～20，总长30秒。播放23～25秒，B源从约3.16连续到5.08秒；保存重开仍三段，原声两段范围保持。",
  "prompt": "在B片段内部第4秒分割，不修改A",
  "conversation": "https://app.cinlink.ai/c/c79434a2-7796-4ad6-9373-2b6b2fc75177",
  "baseline": "A20+B10，视频与原声均串行0–20/20–30",
  "after": "视频0–20/20–24/24–30；原声0–20/20–30；总长30",
  "playback": {
    "before": {
      "media": [
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/36bb8120-1ed5-4241-bfe4-1a337588027f",
          "time": 0
        },
        {
          "duration": 10,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/2e8f040a-6d99-4341-ad6c-9fc3c730015e",
          "time": 0
        },
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/71eac862-d803-413a-934e-d230ac15e3e6",
          "time": 0
        },
        {
          "duration": 10,
          "ready": 1,
          "src": "blob:https://app.cinlink.ai/2e8f040a-6d99-4341-ad6c-9fc3c730015e",
          "time": 3.16
        },
        {
          "duration": 10,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/2e8f040a-6d99-4341-ad6c-9fc3c730015e",
          "time": 4
        },
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/cdaf837c-0951-4220-8e35-aafa28b77fcf",
          "time": 0
        },
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/12aafed5-1944-4500-a7b6-fd4397c92b58",
          "time": 0
        },
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/36bb8120-1ed5-4241-bfe4-1a337588027f",
          "time": 0
        },
        {
          "duration": 10,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/2e8f040a-6d99-4341-ad6c-9fc3c730015e",
          "time": 0
        },
        {
          "duration": 20,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/71eac862-d803-413a-934e-d230ac15e3e6",
          "time": 0
        },
        {
          "duration": 10,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/6b944f0f-42d2-4f29-9643-4882f032eb50",
          "time": 0
        }
      ],
      "position": "23.16"
    },
    "after": {
      "media": [
        {
          "duration": 10,
          "paused": false,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/2e8f040a-6d99-4341-ad6c-9fc3c730015e",
          "time": 5.081924
        },
        {
          "duration": 20,
          "paused": true,
          "ready": 4,
          "src": "blob:https://app.cinlink.ai/cdaf837c-0951-4220-8e35-aafa28b77fcf",
          "time": 0
        }
      ],
      "position": "25.08"
    }
  },
  "limitations": "页面未暴露内部clip ID，不作为页面验收硬条件；未额外导出或做全片听审。",
  "evidence": [
    "011-before.txt",
    "011-before.jpg",
    "011-after.txt",
    "011-crossplay.json",
    "011-reloaded.txt",
    "011-reloaded.jpg"
  ],
  "automation": "PLAN / —"
}
```

### ERYE196-012 — Passed

```json
{
  "case": "ERYE196-012",
  "status": "Passed",
  "summary": "0秒和20秒从同一20秒视频/原声保存基线分别测试。两组均先要求合法内点，仍按原边界0/20填写后明确拒绝，未产生零长片段或额外切段；每组刷新重开仍视频/原声0～20，撤销/重做可用状态保持。",
  "groups": [
    {
      "group": "0s",
      "prompt": "在当前20秒视频片段内部0秒处分割，其他内容不变",
      "clarification_value": "0",
      "result": "0 秒是片段起点，无法分出两个非空片段。请输入大于 0 秒且小于 20 秒的片段内分割时间。",
      "status": "Passed"
    },
    {
      "group": "20s",
      "prompt": "在当前20秒视频片段内部20秒处分割，其他内容不变",
      "clarification_value": "20",
      "result": "20 秒是片段终点，无法在此分出两个非空片段。请输入大于 0 秒且小于 20 秒的片段内分割时间。",
      "status": "Passed"
    }
  ],
  "conversation": "https://app.cinlink.ai/c/c79434a2-7796-4ad6-9373-2b6b2fc75177",
  "baseline": "唯一A视频和原声0–20，无字幕/BGM；撤销及重做可用",
  "final": "与基线一致；无零长/额外片段，原始素材保持",
  "evidence": [
    "012-A-baseline.txt",
    "012-zero-final.txt",
    "012-zero-final.jpg",
    "012-B-baseline-reloaded.txt",
    "012-end-final.txt",
    "012-end-final.jpg",
    "012-final-reloaded.txt"
  ],
  "automation": "PLAN / —"
}
```
<!-- /ERYE196-011165-RUN-20261125 -->

## 转入仓库同步时的恢复点

转入Git同步时，本地已有011的实际执行记录与对应证据，结果Passed；其余154条尚无本轮结论。当前会话c79434a2-7796-4ad6-9373-2b6b2fc75177，续测先核对当前工程及原任务状态，不重发已受理任务。
