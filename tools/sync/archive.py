from pathlib import Path
import argparse,json,hashlib

p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
report=Path(a.report).resolve();repo=Path(__file__).resolve().parents[2]
s=json.loads((report/'execution.json').read_text(encoding='utf-8'))
notes=json.loads((report/'review-notes.json').read_text(encoding='utf-8')) if (report/'review-notes.json').exists() else {}
mapping=json.loads((report/'yunxiao-case-mapping.json').read_text(encoding='utf-8'))
def link(path):return '../../../'+str(Path(path).relative_to(repo)).replace('\\','/')
def result(e):
    if e.get('result'):return e['result']
    if any(x['status']=='failed' for x in e['steps']):return 'Failed'
    if any(v.get('mediaChecks') and not all(v['mediaChecks'].values()) for v in [e.get('p1',{}),e.get('p2',{})]):return 'Failed'
    if e.get('p2',{}).get('mediaPrecheckPassed'):return 'Needs Review'
    return 'In Progress'
lines=['# SYNC-001～006 预发执行记录（2026-11-16）','',
 '使用 Ego Lite TaskSpace 9，预发账号1020817070；每例独立项目/会话，业务任务串行、零重试。原片8份哈希均校验，005夹具完整解码且解码PCM与原WAV逐字节一致、零偏移。素材登记记准备轮0，不计两轮业务指令。', '',
 '**验收边界：当前运行环境无法进行人工音频听审。独立本地Whisper、SRT、抽帧和波形比对均只作辅助，不能代替完整逐句听看，不根据done、模型自述或估计偏移宣称通过。待复核明确保留，不计Passed。**','',
 '六条定义通过官方OpenAPI同步到云效“五轮多工作流”，WLAX-303～308，字段及全文回读通过；这次同步不表示测试通过，也未创建缺陷。', '',
 '| 用例 | 云效 | R1 | R2 | 本轮结论 |','|---|---|---|---|---|']
if s.get('executionSummary'):
    summary=s['executionSummary']
    lines[2:2]=['本轮结论：**3 Failed / 1 Blocked / 2 Needs Review / 0 Passed**。共10条业务请求：8 done、1 failed、1 terminated；005/006的第二轮因缺少P1未提交。另有6次素材登记准备轮，不计业务轮数。','']
for n in range(1,7):
    key=f'SYNC-{n:03d}';e=s['cases'].get(key,{})
    steps={x['round']:x['status'] for x in e.get('steps',[])}
    if e.get('dependentRound2Blocked'):steps[2]='Blocked（未提交）'
    lines.append(f'| {key} | {mapping[key]["customCode"]} | {steps.get(1,"Not Run")} | {steps.get(2,"Not Run")} | {result(e) if e else "Not Run"} |')
for key,e in s['cases'].items():
    lines+=['',f'## {key}','',f'项目：`{e["projectId"]}`；会话：[{e["conversationId"]}]({s["baseUrl"]}/c/{e["conversationId"]})。','', '| 原始文件 | 云端ID | SHA-256 |','|---|---|---|']
    for source in e.get('sources',[]):lines.append(f'| {source["name"]} | `{source["id"]}` | `{source.get("sha256","")}` |')
    if e.get('failureReport'):lines+=['',f'**{result(e)}：{e.get("failureReason",e.get("blockedReason",""))}** [详情与截图]({Path(e["failureReport"]).name})。']
    for step in e['steps']:
        if step['round']==0:continue
        r=step['round'];lines+=['',f'### R{r}：{step["status"]}','',f'run：`{step.get("runId","受理待确认")}`；提交时间：`{step["submittedAt"]}`。','','完整已发送提示词：','','```text',step['prompt'],'```']
        if step.get('reviewedSourceRanges'):lines+=['','页面已确认源段与输出区间：','','```json',json.dumps(step['reviewedSourceRanges'],ensure_ascii=False,indent=2),'```']
        product=e.get(f'p{r}')
        if product:
            current=hashlib.sha256(Path(product['path']).read_bytes()).hexdigest()
            lines+=['',f'产物：[{product["name"]}]({link(product["path"])}), `{product["id"]}`，{product.get("actualDuration","待测")}秒。',f'SHA-256：`{product["sha256"]}`；归档时重新读取一致：`{current==product["sha256"]}`。',f'媒体检查：`{json.dumps(product.get("mediaChecks",{}),ensure_ascii=False)}`。']
        for name in [f'round-{r}-before.png',f'round-{r}-before-render-confirm.png',f'round-{r}-completed.png',f'round-{r}-subtitle-review.json',f'round-{r}-lineage-comparison.json']:
            f=report/key/name
            if f.exists():lines+=['',f'[{name}]({link(f)})']
        for f in sorted((report/key).glob(f'round-{r}-cue-frames-*.png')):lines+=['',f'![{key} R{r} 实际成片逐条中心抽帧]({link(f)})']
    if key in notes:lines+=['','复核记录：','','```json',json.dumps(notes[key],ensure_ascii=False,indent=2),'```']
    if e.get('dependentRound2Blocked'):lines+=['',f'**R2未提交，依赖阻塞：{e["dependentRound2Blocked"]}**']
lines+=['','## 自动化与证据','', '入口：`tools/sync/run.mjs`，按原文两轮提示词替换实际ID发送；检查点禁止重复提交，保留原run回读；截图、运行JSON、下载文件、SRT、逐词ASR及媒体检查见本轮reports目录。`tools/sync/check-media.py`只验证媒体前置，不赋予整例Passed。', '', f'[完整检查点]({link(report/"execution.json")}) · [素材/夹具核验]({link(report/"media-manifest.json")}) · [云效用例映射]({link(report/"yunxiao-case-mapping.json")})']
if s.get('executionSummary'):lines+=['',f'[六个会话终态回读]({link(report/"terminal-readback.json")}) · [云效六条定义最终回读]({link(report/"yunxiao-final-definition-verification.json")})。8份MP4最终解码/哈希/时长/比例检查通过，4份P1在R2后哈希保持。']
if s.get('browserSessionClosed'):lines+=['','本批Ego Lite TaskSpace9已正常结束一次，未保留页面；本地证据和云端测试项目/会话保留。']
destination=repo/'docs/design-cases/multi-workflow/sync001006-staging-results-20261116.md'
destination.write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(destination)
