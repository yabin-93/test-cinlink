# FWXC-544 本轮回归（2026-11-16 14:00）

原验收和两条扩散均Not Run，已冻结云效已修复候选、原描述、附件及历史，待逐项真实执行。历史结果不作为本轮通过。执行账号yabinc92，有头Chrome，同账号串行、零额外业务重试；必要前置和完整原提示词保留。原验收Passed/Failed分别设✅AI通过/❌AI未通过并回读；Blocked/待人工/未覆盖保持。定时任务不写评论、新单、Git提交推送，不改凭据权限。

证据reports/fixed-monitor-20261116-135748/cloud/FWXC-544/。


## 2026-11-17 Chrome预发 original

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Blocked",
  "conversationId": "72ad7058-ce6b-4a71-8257-89cdaf645997",
  "actual": "独立80字标签/正文测基线已保存。原生粘贴/键入79未改变实际标签（仍80），不据此认定字符保存通过。原缺陷核心为克隆真实完整工程content、当前revision实际projects/save写入81再独立GET；当前原生UI未提供该服务端写入/完整投影读取路径，未执行接口请求，原验收Blocked，云效保持已修复，不用UI maxlength代替后端通过。",
  "evidence": [
    "544-O-ui79.txt",
    "544-O-ui-input-state.txt",
    "544-O-ui-input-state.png"
  ]
}


## 2026-11-17 Chrome预发 expansion1

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "6d122b7b-92d8-42b6-912d-0656beaf12a2",
  "sourceVersionId": "editor_image_b9f94cdedaec4c9e96a1a4d674fa8b17",
  "actual": "执行通过：前台Chrome原生粘贴测×80，正文测，刷新会话重开同源图、点击编号1，完整标签仍测×80、正文保持测且已保存，无生成。最初窗口非前台导致输入/坐标未生效已记录并纠正，不是产品失败。",
  "evidence": [
    "544-E1-before-refresh.txt",
    "544-E1-before-refresh.png",
    "544-E1-after-refresh.txt",
    "544-E1-after-refresh.png"
  ]
}


执行环境澄清：此前原生79输入未生效后确认Chrome非前台，属于工具/窗口焦点偏差，不判产品失败。独立E1恢复前台原生80输入、保存及刷新持久化全部通过。原验收Blocked只因精确服务端81写入及独立GET未覆盖，不以UI边界代替。


## 2026-11-17 Chrome预发 expansion2

{
  "environment": "staging",
  "browser": "Google Chrome native CUA",
  "result": "Passed",
  "conversationId": "2121daa1-c84e-48d9-8e7c-af439f34d88d",
  "actual": "执行通过（Agent入口范围）：81字符标签请求76秒完成，页面明确显示“拒绝超限批注标签修改，并只读核对现有图片工程及批注是否保持不变”，实际批注名称仍完整测×80、正文测，无新批注或图片生成。独立原projects/save接口写入仍未覆盖，不以此判后端已修复。",
  "promptFile": "544-E2-prompt.txt",
  "evidence": [
    "544-E2-before.txt",
    "544-E2-before.png",
    "544-E2-terminal.txt",
    "544-E2-terminal.png"
  ]
}


## 用户明确要求重新回归544原场景

{
  "requestedByUser": true,
  "environment": "staging",
  "browser": "Google Chrome",
  "account": "yabinc92",
  "conversationId": "72ad7058-ce6b-4a71-8257-89cdaf645997",
  "sourceVersionId": "editor_image_77f699167d6845df84b051a9c9f61088",
  "eligibilityStatus": "已修复",
  "eligibilityReadAt": "2026-11-17T11:12:29.075551+08:00",
  "status": "waiting_user_browser_security_warning",
  "apiWriteSubmitted": false,
  "actual": "原54480字标签工程已重开，Chrome原生DevTools实际操作读取工程API地址时触发Chrome防粘贴安全警告；未输入allow pasting、未解除安全提示、未发原projects/save请求。用户需自行完成提示再继续。通用.auth会话不匹配目标92，未用它调用产品写接口。",
  "evidence": [
    "544-original-rerun-console-warning.txt",
    "544-original-rerun-console-warning.png"
  ]
}

未改变原Blocked结果或云效状态；本次原接口尚未实际提交，不计通过。


## 2026-11-17 用户指定原回归重新执行：Passed

{
  "result": "Passed",
  "environment": "staging",
  "browser": "Google Chrome native DevTools/current cookie session",
  "account": "yabinc92",
  "conversationId": "72ad7058-ce6b-4a71-8257-89cdaf645997",
  "projectId": "f49def3e-e49a-4c1e-a837-6828ee374aef",
  "sourceVersionId": "editor_image_77f699167d6845df84b051a9c9f61088",
  "annotationId": "207ce5c4-2138-46b5-9d64-3c5642759ad2",
  "ui79Saved": true,
  "ui80Saved": true,
  "ui81InputLength": 80,
  "baseRevision": 7,
  "operationId": "image_f6a34c8f-2098-4d19-ae39-3d11b01c68ff",
  "server81Status": 400,
  "server81Error": {
    "request_id": "1e17798b46ae4486b99e7a6571bf93d6",
    "code": "INVALID_ARGUMENT",
    "message": "Snapshot input is invalid"
  },
  "afterLabelLength": 80,
  "revisionUnchanged": true,
  "fullContentUnchanged": true,
  "control80Status": 200,
  "control80Applied": false,
  "actual": "执行通过：原生79/80完整保存、粘贴81页面截至80。当前Chrome92真实GET完整content，仅将唯一目标批注label80改81，使用最新revision7及新operation_id单次真实POST projects/save，HTTP400 INVALID_ARGUMENT/Snapshot input is invalid；独立GET200，label仍80、revision仍7且完整content一致。同一完整快照合法80对照HTTP200（applied=false合法无改动），再次独立GET保持原内容，排除快照结构错误。无需恢复，无图片生成。",
  "evidence": [
    "544-rerun-ui79-saved.txt",
    "544-rerun-ui80-saved.txt",
    "544-rerun-ui81.txt",
    "544-rerun-ui81.png",
    "544-rerun-api-preflight.txt",
    "544-rerun-api-result-console.txt",
    "544-rerun-api-control80-console.txt",
    "544-rerun-original-api-audit.json",
    "544-rerun-original-summary.txt",
    "544-rerun-original-summary.png"
  ]
}

原Blocked为此前未取得真实接口链路的历史，本次通过当前Chrome已登录92的原生DevTools执行，未沿用其他本地测试账号。用户手动解除Chrome防粘贴提示后才继续。两条已完成扩散不重发，当前整体P/P/P；固定脚本PLAN。


云效同步：2026-11-17 11:26:41北京时间，官方OpenAPI从已修复更新✅AI通过并GET回读verified=true，评论/附件写入0。最终页面label测×80、已保存，源版不变；证据544-rerun-final-ui.txt/png。真实请求/完整content审计已由独立Python再次验证：唯一label差异、400拒绝、GET完整内容/修订一致、80对照200。无需恢复；P/P/P，固定脚本PLAN，未提交推送Git。

原始HTTP响应与独立GET返回目标批注的实际浏览器截图：544-rerun-raw-response.txt/png（直接输出已取得的响应变量，未再发送任何请求）。完整输入输出以544-rerun-original-api-audit.json为准。
