from pathlib import Path
import argparse,json,re

p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
root=Path(__file__).resolve().parents[2];report=Path(a.report).resolve()
s=json.loads((report/'execution.json').read_text(encoding='utf-8'))
def status(key):
    e=s['cases'].get(key)
    if not e:return 'AUTO，Not Run'
    if e.get('result'):return 'AUTO，'+e['result']+('；R2依赖阻塞（未提交）' if e.get('dependentRound2Blocked') else '')
    if any(x['status']=='failed' for x in e['steps']):return 'AUTO，Failed'
    if any(v.get('mediaChecks') and not all(v['mediaChecks'].values()) for v in [e.get('p1',{}),e.get('p2',{})]):return 'AUTO，Failed'
    if e.get('p2',{}).get('mediaPrecheckPassed'):return 'AUTO，两轮done，Needs Review（完整听审待补）'
    last=e['steps'][-1] if e['steps'] else None
    return 'AUTO，执行中'+(f'（R{last["round"]} {last["status"]}）' if last else '')
states={f'SYNC-{n:03d}':status(f'SYNC-{n:03d}') for n in range(1,7)}
registry=root/'docs/design-cases/multi-workflow/registry.yaml';text=registry.read_text(encoding='utf-8')
for key in states:
    pattern=rf'(?m)^{key}:\n(?:[ \t]+[^\n]*\n)*'
    item=f'{key}:\n  status: AUTO\n  script: "tools/sync/run.mjs"\n'
    text=re.sub(pattern,item,text) if re.search(pattern,text) else text.rstrip()+'\n'+item
registry.write_text(text,encoding='utf-8')
source=root/'docs/design-cases/multi-workflow/editing-dubbing-sync-cases.md';text=source.read_text(encoding='utf-8')
text=text.replace('新增 **SYNC-001～006，共6条P0；0 AUTO / 6 PLAN，全部未执行**。','原2026-11-05新增 **SYNC-001～006，共6条P0，当时0 AUTO / 6 PLAN、全部未执行**；2026-11-16已接入6 AUTO，最新逐例状态见下表及本轮报告。')
text=text.replace('### M5受控视频夹具准备（尚未完成）','### M5受控视频夹具准备（原设计要求；本轮已制备并验证PCM）')
text=text.replace('4. 本轮只编写用例，**没有生成该视频**。','4. 2026-11-05设计时只编写用例，**当时没有生成该视频**。2026-11-16已制备H.264/ALAC夹具，40.68秒，解码PCM与原WAV逐字节相同、偏移0；完整人工听审仍待补，不能因此判整例通过。')
lines=[]
for line in text.splitlines():
    match=re.match(r'^\| \[(SYNC-00[1-6])\]',line)
    if match:cols=line.split('|');cols[-2]=' '+states[match[1]]+' ';line='|'.join(cols)
    elif re.match(r'^\| SYNC-00[1-6] \|',line):line=line.replace('[PLAN]','[AUTO]').replace('| — |','| `tools/sync/run.mjs` |')
    lines.append(line)
text='\n'.join(lines)+'\n'
old='当前6条均为设计稿，自动化 `[PLAN]`、脚本 `—`、业务未执行；SYNC-005另有视频夹具待准备。未新增执行命令，默认预发套件数量和原SSO数量保持原口径。Excel尚未收录该专项，当前以本页及统一入口为准。'
new='2026-11-16：6条已接入 `tools/sync/run.mjs`，6 AUTO/0 PLAN；业务结果按本轮报告逐条记录，AUTO不等于Passed。005夹具已生成且PCM逐字节一致，人工听审未完成。默认预发套件及原SSO计数保持；Excel未更新。执行命令和断点规则见 [工具说明](../../../tools/sync/README.md)，[本轮结果与原图](sync001006-staging-results-20261116.md)。'
text=text.replace(old,new).replace('执行前准备：M5配套视频、原句及实际切点听审、当前版本日语源配音能力核对。本页未将这些准备项写成已完成。','执行前准备中M5配套视频已完成PCM核验；原句及实际切点人工听审仍待补。当前版本日语源能力按实际运行结果核对，不用推测代替服务结果。').replace('未生成配套视频；不能借用两份非转写SRT','夹具PCM已校验；不能借用两份非转写SRT')
source.write_text(text,encoding='utf-8')
index=root/'docs/cases/README.md';text=index.read_text(encoding='utf-8');lines=[]
# The unified entry contains definitions and automation metadata only.
# Business outcomes remain in the专项 result document and progress/context below.
for line in text.splitlines():
    m=re.match(r'^\| \[(SYNC-00[1-6])\]',line)
    if m:cols=line.split('|');cols[-2]=' AUTO ';line='|'.join(cols)
    if line.startswith('**本专项0 AUTO / 6 PLAN，业务执行0条**。'):line='[专项报告](../design-cases/multi-workflow/sync001006-staging-results-20261116.md) · [执行命令](../../tools/sync/README.md)。'
    if line.startswith('| 剪辑配音与字幕同步P0 |'):line='| 剪辑配音与字幕同步P0 | [SYNC-001～006正文](../design-cases/multi-workflow/editing-dubbing-sync-cases.md) | `tools/sync/run.mjs` | 6条P0；[执行命令](../../tools/sync/README.md) |'
    lines.append(line)
index.write_text('\n'.join(lines)+'\n',encoding='utf-8')
spaceText='Ego Lite TaskSpace9已正常结束一次（未保留页面）' if s.get('browserSessionClosed') else 'Ego Lite TaskSpace9/p1（本批专用）'
continuation='本批业务请求均已终态，后续核查读取本地检查点和证据，禁止重发原run。' if s.get('executionSummary') else '沿 `reports/sync001006-staging-20261116/execution.json` 原run继续，禁止重发。'
block='<!-- SYNC-001006-STAGING-20261116 -->\n## 2026-11-16 SYNC-001～006预发执行与云效用例同步\n\n'+'；'.join(f'{k}：{v}' for k,v in states.items())+'。'+spaceText+'；每例独立项目/会话、任务串行。'+continuation+'6 AUTO入口tools/sync/run.mjs；005夹具PCM逐字节一致。六条定义已用官方OpenAPI写入原“五轮多工作流”目录WLAX-303～308并全文回读，未创建缺陷；用例登记不表示测试通过。原SSO/ICP及其他需求结果保持。\n\n[本轮结果与原图](design-cases/multi-workflow/sync001006-staging-results-20261116.md)。\n<!-- /SYNC-001006-STAGING-20261116 -->\n'
context=root/'docs/codex-context.md';text=context.read_text(encoding='utf-8');pattern=r'<!-- SYNC-001006-STAGING-20261116 -->[\s\S]*?<!-- /SYNC-001006-STAGING-20261116 -->\n?'
text=re.sub(pattern,block,text) if re.search(pattern,text) else block+'\n'+text
context.write_text(text,encoding='utf-8')
print(json.dumps(states,ensure_ascii=False))
