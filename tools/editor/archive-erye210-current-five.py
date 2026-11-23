"""Archive the 2026-11-16 production run, preserving raw runs and protected 014.

Run only after reviewing native screenshots. 047/048's ordinary-video preparation
is explicitly excluded; the translated-project run is their only product result.
"""
from pathlib import Path
from collections import Counter
import json
import hashlib
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]
DOC = ROOT / 'docs/cases/requirements/ERYE-210'
REPORTS = ROOT / 'reports/editor-210'
FIRST = REPORTS / 'prod-current-five-20261116-01'
TRANSLATED = REPORTS / 'prod-current-five-translated-20261116-02'
REVIEW = REPORTS / 'prod-current-five-review-20261116-03'
SHORTCUT = REPORTS / 'prod-current-five-shortcut-20261116-04'
FINAL = REPORTS / 'prod-current-five-final-20261116-05'
LIVE047 = REPORTS / 'prod-current-five-final-20261116-08'
LIVE048 = REPORTS / 'prod-current-five-final-20261116-12'
SHORTCUT048 = REPORTS / 'prod-current-five-shortcut-048-20261116-11'
EVIDENCE = DOC / 'evidence-045-049-current-functions-prod-20261116'
REPORT = 'results-045-049-current-functions-prod-20261116.md'
VERSION = 'v2-current-functions-20261116'

def read(p):
    return json.loads(p.read_text(encoding='utf-8'))

def write(p, obj):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def raw(folder, cid):
    f = folder / cid / 'result.json'
    return read(f) if f.exists() else None

def clean(value):
    if isinstance(value, dict):
        return {k: clean(v) for k, v in value.items()
                if not re.search(r'token|cookie|authorization|password|signed.?url|download.?url', k, re.I)}
    if isinstance(value, list):
        return [clean(v) for v in value]
    if isinstance(value, str):
        return re.sub(r'https?://[^\s"<>]*[?][^\s"<>]*', '[private URL omitted]', value)
    return value

def main():
    current_path = DOC / 'execution-status-current.json'
    current = read(current_path)
    if any(c.get('caseVersion', '').startswith('v3-') for c in current['cases'] if c['id'] in ['ERYE210-046', 'ERYE210-048']):
        raise SystemExit('046/048已有较新的v3定义/结果；此历史五例归档器不能覆盖当前状态，请使用对应v3归档器。')
    previous_cases = {c['id']: c for c in current['cases']}
    history = read(DOC / 'case-045-049-migration-history-20261116.json')
    assert next(c for c in current['cases'] if c['id'] == 'ERYE210-014') == history['protected014']
    records = []
    for cid in ['045', '046', '047', '048', '049']:
        folder = TRANSLATED if cid in ['047', '048'] else FIRST
        record = raw(folder, cid)
        live = LIVE047 if cid == '047' else LIVE048
        if cid in ['047', '048'] and raw(live, cid):
            folder, record = live, raw(live, cid)
        if cid in ['046', '049'] and raw(REVIEW, cid):
            folder, record = REVIEW, raw(REVIEW, cid)
        if record is None:
            record = {'id': f'ERYE210-{cid}', 'status': 'Not Run', 'reason': '等待真实翻译配音前置及本轮页面核验', 'checks': [], 'projects': {}}
        record = clean(record)
        # A later defect sync must survive regenerating this execution archive.
        for key in ['cloudDefect', 'cloudSync']:
            if key in previous_cases.get(record['id'], {}):
                record[key] = previous_cases[record['id']][key]
        record['sourceBatch'] = folder.name
        record['report'] = REPORT
        record['evidence'] = EVIDENCE.name + '/manifest.json'
        record['caseVersion'] = 'v2-translated-prerequisite-20261116' if cid in ['047', '048'] else VERSION
        if cid == '046' and folder == FIRST:
            record['rawScriptStatus'] = record['status']
            record['status'] = 'Blocked'
            record['reason'] = '首次分析及清理已完成；同一工程刷新重开后，文稿页只有口水词与停顿/显示已删除文本等控件，没有重新分析入口。第二次分析未提交，已删除源区间复用尚不可验。'
            record['reviewBasis'] = '046-entry-review.json + 046-reopened-current-entry-review.png；原定位失败保留，不判算法缺陷'
        if cid == '049' and folder == FIRST and (FIRST / '049/049-native-export-ui-error.json').exists():
            record['rawScriptStatus'] = record['status']
            record['status'] = 'Failed'
            record['reason'] = '双水印关闭状态保存、刷新重开保持；第一次原生导出后页面报错，未交付可用视频结果。原导出任务后台done且有视频文件，但页面无结果卡；开启后的第二次导出未执行，未重复原导出。'
            record['reviewBasis'] = '049-OFF-original-export-error.png + 049-native-export-ui-error.json + task-get-private.json的脱敏任务状态；不只依据超时判失败'
        actuals = {
            '045': 'PA/PB共享真实WAV；PA单删不改PB与原片/字幕，PB音频区间可播放；原素材卡仍在，PA复用同一file_id并刷新保持。',
            '046': record.get('reason') or '已清理工程再次分析后核对当前结果和已删除源区间，详见逐项检查。',
            '047': record.get('reason') or '真实翻译配音前置下，背景音量线实际拖到50%保存，首句明确再生成后核对其他声音和原片/字幕。',
            '048': record.get('reason') or '真实翻译配音前置下，中文C1与对应配音显式更新，核对英文、中文C2和其余声音。',
            '049': record.get('reason') or '双水印开关、保存重开及原生OFF/ON导出，按真实产物和帧审核。',
        }
        record['actual'] = actuals[cid]
        if cid == '047' and folder == LIVE047:
            record['actual'] = '真实翻译配音工程8句中文声音可用；独立WAV背景音量100%→50%，保存及刷新保持；首句改“混音后重新生成047。”并明确重新生成后，页面报“编辑器执行数据不符合正式v2协议”，新声音未成功交付。未将此前无效准备判产品失败。'
        if cid == '049' and record['status'] == 'Failed':
            record['actual'] = '双水印关闭状态保存及刷新重开保持；第一次原生导出报页面协议错误且未交付可用结果，原任务后台done仅作辅助证据。沿同一受理任务复核，未再次导出；开启后的第二次导出和视频画面核验未执行。'
        if cid == '048' and folder == LIVE048 and record['status'] == 'Blocked':
            record['actual'] = '已完成真实独立英语→中文翻译配音并交付视频/工程文件，配音曾显示8句；当前工程的配音页持续报协议错误，既有文案无法稳定恢复。最终核验只回读、不再点击创建或生成；字幕改稿和后续单句更新目标步骤尚未执行，记阻塞。'
        if cid == '046' and folder == REVIEW:
            if record['status'] == 'Passed':
                record['actual'] = '首次停顿清理20→18.695896秒；通过当前会话明确只重新分析，同一工程没有自动重复裁剪，新候选不重复指向已删源区间，字幕与原声保存重开保持。'
            elif record['status'] == 'Blocked':
                record['actual'] = '首次停顿清理已完成；通过现有会话提交一次明确的只重新分析指令，二次核验尚未完成：'+record.get('reason','')
                boundary = REVIEW / '046/046-agent-analysis-boundary.json'
                if boundary.exists():
                    record['actual'] = '首次清理20→18.695896秒成功；会话明确只重分析保留三段后，Agent说明当前工具仍以20秒原片为源，无法限定保留片段，因此没有提交二次分析。旧候选不算新结果；音视频、字幕及旧分析均保持，二次分析范围记阻塞。'
        record['screenshots'] = []
        sources = [folder] if cid in ['047', '048'] else [FIRST, REVIEW]
        for source in sources:
            # Ordinary-video 047/048 pictures are preparation history, never product failures.
            if cid in ['047', '048'] and source == FIRST:
                continue
            for p in sorted((source / cid).glob('*.png')):
                target = EVIDENCE / cid / (source.name + '--' + p.name)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(p, target)
                record['screenshots'].append(target.relative_to(EVIDENCE).as_posix())
        records.append(record)
    invalid = {'status': 'Invalid preparation; excluded from product results',
               'reason': '用户明确要求先创建翻译配音工程。普通视频+手工字幕的初次047/048不满足前置；原脚本失败只保留为准备历史。',
               'sourceBatch': FIRST.name, 'cases': []}
    for cid in ['047', '048']:
        r = raw(FIRST, cid)
        if r:
            invalid['cases'].append({'id': r['id'], 'rawScriptStatus': r['status'], 'productFailureConclusion': False})
            for p in sorted((FIRST / cid).glob('*.png')):
                target = EVIDENCE / 'precondition-history' / cid / p.name
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(p, target)
    write(EVIDENCE / 'precondition-invalidated.json', invalid)
    preparation_batches = [FINAL, REPORTS / 'prod-current-five-final-20261116-06', REPORTS / 'prod-current-five-final-20261116-07', REPORTS / 'prod-current-five-final-20261116-10']
    prep_history = []
    for source in preparation_batches:
        for cid in ['047', '048']:
            if not raw(source, cid):
                continue
            old = raw(source, cid)
            prep_history.append({'case': old['id'], 'batch': source.name, 'rawStatus': old['status'], 'classification': 'preparation/observer correction; excluded from product failures', 'reason': clean(old.get('reason', ''))})
            for p in sorted((source / cid).glob('*.png')):
                target = EVIDENCE / 'precondition-history' / source.name / cid / p.name
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(p, target)
    write(EVIDENCE / 'additional-precondition-history.json', prep_history)
    # Earlier partial archives must not leave setup-only Failed pictures in the
    # current product-result gallery. Retain the bytes under labelled history.
    evidence_root = EVIDENCE.resolve()
    for cid, qualified in [('047', LIVE047.name), ('048', LIVE048.name)]:
        for p in list((EVIDENCE / cid).glob('*.png')):
            if p.name.startswith(qualified+'--'):
                continue
            destination = EVIDENCE / 'precondition-history/superseded-gallery' / cid / p.name
            assert p.resolve().is_relative_to(evidence_root)
            assert destination.resolve().is_relative_to(evidence_root)
            if destination.exists():
                destination = destination.with_stem(destination.stem+'-'+hashlib.sha256(p.read_bytes()).hexdigest()[:8])
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(p), str(destination))
    task_file = FIRST / '049/task-get-private.json'
    if task_file.exists():
        t = read(task_file).get('body', {}).get('result', {}).get('structuredContent', {})
        write(EVIDENCE / '049/original-task-business-status.json', {
            'taskId': t.get('task_id'), 'projectId': t.get('project_id'), 'status': t.get('status'),
            'files': [{k: f.get(k) for k in ['kind', 'name', 'file_id', 'facts']} for f in (t.get('result') or {}).get('files', [])],
            'newTaskSubmitted': False, 'readOnlySupplement': True})
    if (TRANSLATED / 'translation-baseline-checkpoint-private.json').exists():
        t = read(TRANSLATED / 'translation-baseline-checkpoint-private.json')
        write(EVIDENCE / 'translation-prerequisite.json', {k: t.get(k) for k in ['f', 'prompt', 'submitted', 'completed', 'confirmations', 'waitEndedAt', 'lastStatus']})
    if (TRANSLATED / 'translation-current-status.json').exists():
        write(EVIDENCE / 'translation-status-sample.json', read(TRANSLATED / 'translation-current-status.json'))
    if (SHORTCUT / 'translation-shortcut-private.json').exists():
        t = read(SHORTCUT / 'translation-shortcut-private.json')
        write(EVIDENCE / 'translation-shortcut-prerequisite.json', {k: t.get(k) for k in ['cid', 'prompt', 'parameters', 'submittedParameters', 'runId', 'lastStatus', 'terminal', 'confirmations', 'recoveredFromOriginalNativeMessage', 'recoveryNote']})
        for p in sorted(SHORTCUT.glob('*.png')):
            target = EVIDENCE / 'translation-prerequisite' / p.name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(p, target)
    if (SHORTCUT048 / 'translation-shortcut-private.json').exists():
        t = read(SHORTCUT048 / 'translation-shortcut-private.json')
        write(EVIDENCE / 'translation-shortcut-048-prerequisite.json', {k: t.get(k) for k in ['workspaceId', 'cid', 'prompt', 'parameters', 'submittedParameters', 'runId', 'lastStatus', 'terminal', 'editableProject', 'voiceTexts', 'confirmations']})
        for p in sorted(SHORTCUT048.glob('*.png')):
            target = EVIDENCE / 'translation-prerequisite-048' / p.name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(p, target)
    earlier048 = REPORTS / 'prod-current-five-shortcut-048-20261116-09'
    if (earlier048 / 'translation-shortcut-private.json').exists():
        t = read(earlier048 / 'translation-shortcut-private.json')
        write(EVIDENCE / 'translation-shortcut-048-completed-project.json', {k: t.get(k) for k in ['workspaceId', 'cid', 'prompt', 'parameters', 'runId', 'lastStatus', 'terminal', 'editableProject', 'voiceTexts']})
        for p in sorted(earlier048.glob('*.png')):
            target = EVIDENCE / 'translation-prerequisite-048-completed' / p.name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(p, target)
    for source_file, target_file in [
        (LIVE047 / '047/047-after-failure-business-verification.json', '047/after-failure-business-verification.json'),
        (REVIEW / '046/005-preparation-prompt.json', '046/explicit-conversation-reanalysis-prompt.json'),
        (REVIEW / '046/005-submission.json', '046/original-conversation-submission.json')]:
        if source_file.exists():
            write(EVIDENCE / target_file, clean(read(source_file)))
    if (REVIEW / '046/046-agent-analysis-boundary.json').exists():
        write(EVIDENCE / '046/actual-analysis-capability-boundary.json', read(REVIEW / '046/046-agent-analysis-boundary.json'))
    by_id = {r['id']: r for r in records}
    current['cases'] = [by_id.get(c['id'], c) for c in current['cases']]
    assert len(current['cases']) == len({c['id'] for c in current['cases']}) == 43
    assert next(c for c in current['cases'] if c['id'] == 'ERYE210-014') == history['protected014']
    counts = Counter(c['status'] for c in current['cases'])
    current['counts'] = {k: counts[k] for k in ['Passed', 'Failed', 'Blocked', 'Not Applicable', 'Not Run']}
    current['latestExecution'] = {'date': '2026-11-16', 'cases': list(by_id), 'report': REPORT,
                                  'note': '047/048必须真实翻译配音前置；初次准备无效不计产品失败；014保留；原迁移目标延期。'}
    current['automation'] = '当前43个有效脚本入口：42 AUTO、014唯一BLOCKED登记项。045～049已在生产Chrome执行，实际1P/2F/2B；执行阻塞与自动化登记分开，原迁移目标延期。'
    if not current.get('currentFivePreviousLatestBatch') and current.get('latestBatch'):
        current['currentFivePreviousLatestBatch'] = current['latestBatch']
    current['latestBatch'] = {'batch': 'current-five-combined-production-20261116', 'report': REPORT,
                              'cases': list(by_id), 'sourceBatches': sorted({c['sourceBatch'] for c in records}),
                              'counts': dict(Counter(c['status'] for c in records))}
    current['updated'] = '2026-11-16'
    write(current_path, current)
    write(EVIDENCE / 'execution-evidence.json', {'origin': 'https://app.cinlink.ai', 'browser': 'headed Google Chrome', 'cases': records})
    manifest = [{'file': p.relative_to(EVIDENCE).as_posix(), 'bytes': p.stat().st_size,
                 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
                for p in sorted(EVIDENCE.rglob('*')) if p.is_file() and p.name != 'manifest.json']
    write(EVIDENCE / 'manifest.json', {'nativeScreenshotsUnchanged': True, 'files': manifest})
    batch = Counter(c['status'] for c in records)
    brief = ' / '.join(f'{counts[k]} {k}' for k in ['Passed', 'Failed', 'Blocked', 'Not Applicable', 'Not Run'])
    def cloud_ref(c):
        defect = c.get('cloudDefect')
        return f" [云效 {defect['identifier']}]({defect['url']})" if defect else ''
    latest = '\n'.join(f"| {c['id']} | {c['status']} | {c['actual'].replace('|', '/').replace(chr(10), ' ')}{cloud_ref(c)} |" for c in records)
    path = DOC / 'execution-status-current.md'
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'2026-11-16；当前有效43条：\*\*.*?\*\*。', f'2026-11-16；当前有效43条：**{brief}**。', text, count=1)
    for c in records:
        text = re.sub(r'^\| '+c['id']+r' \|.*$', f"| {c['id']} | {c['status']} | {c['actual'].replace(chr(10), ' ')}{cloud_ref(c)} [记录]({REPORT}) |", text, flags=re.M)
    lead = ('045～049已按用户确认替换并在生产Chrome执行/核验；047/048以用户纠正后的真实翻译配音工程为前置，初次无效准备不计产品缺陷。'
            '014原Blocked保持，其他用例沿用历史实测。旧迁移与回退目标仍延期。')
    text = re.sub(r'051本轮生产Chrome复测通过，.*?\n\n', lead+'\n\n', text, count=1, flags=re.S)
    path.write_text(text, encoding='utf-8')
    path = DOC / 'cases.md'
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'本需求当前43条：.*?。', '本需求当前43条：'+brief+'。', text, count=1)
    for c in records:
        lines = text.splitlines()
        for i, line in enumerate(lines):
            if line.startswith('| '+c['id']+' |'):
                cells = line.split('|')
                cells[-2] = (f' {c["caseVersion"]}；{c["status"]}；[完整步骤及边界]'
                             f'(case-045-049-v2-current-functions-20261116.md#erye210-{c["id"][-3:]})；[本轮执行]({REPORT}){cloud_ref(c)} ')
                lines[i] = '|'.join(cells)
        text = '\n'.join(lines)+'\n'
    assert history['protected014Row'] in text
    path.write_text(text, encoding='utf-8')
    path = ROOT / 'docs/cases/registry.yaml'
    text = path.read_text(encoding='utf-8')
    for c in records:
        m = re.search(r'(?ms)^'+c['id']+r':\n.*?(?=^[A-Z][A-Z0-9_-]*:\n|\Z)', text)
        assert m
        block = re.sub(r'  execution_status: .*', '  execution_status: '+json.dumps(c['status']), m[0])
        block = re.sub(r'  execution_note: .*', '  execution_note: '+json.dumps(c['actual']+'；'+REPORT, ensure_ascii=False), block)
        text = text[:m.start()] + block + text[m.end():]
    path.write_text(text, encoding='utf-8')
    cloud_note = ('执行失败047/049已于2026-11-16按用户授权通过云效OpenAPI同步：'
                  + '；'.join(c['id']+cloud_ref(c) for c in records if c.get('cloudDefect'))
                  + '。对应截图已上传并嵌入、回读核验通过；本地执行状态保持。') if any(c.get('cloudDefect') for c in records) else '测试执行阶段未提交云效、未改云效状态。'
    report = f'''# ERYE-210 045～049 当前功能 v2 生产Chrome执行记录

日期：2026-11-16。生产环境，Windows有头Google Chrome，仓库自动化，单worker、零自动重试。当前43条：**{brief}**。

045～049按用户授权替换；014原Blocked完整保留。新定义和[迁移历史](case-045-049-migration-history-20261116.json)分开，旧入口/缓存迁移与版本回退不算新版覆盖。其他用例本轮未重跑。

| 用例 | 当前结果 | 实际结果与未覆盖范围 |
|---|---|---|
{latest}

## 前置纠正与可复现步骤

登录后，上次登记的源工程在当前账号返回404；已用本地真实20秒E196-A.mp4、8条英文SRT、真实WAV、PNG重新准备当前账号可读工程。所有目标操作在生产Chrome执行，原源工程不作目标修改。

047/048按用户纠正，必须先完成真实英语→中文翻译配音，确认目标语言、可编辑中英字幕及至少两句就绪声音。普通视频加手工字幕的初次准备无效，原脚本Failed与截图保留于precondition-history，不计产品缺陷。实际完成的原生前置见证据translation-shortcut-prerequisite.json和translation-shortcut-048-completed-project.json；translation-prerequisite.json仅是早期自由文本失败的准备历史。

本轮已通过页面“翻译配音”快捷入口选择“配音和字幕”、目标“简体中文”和“双语”，先后完成两个独立真实工程。047直接使用本轮新生成的工程，目标步骤前为8句可见配音；048另有独立完成的工程。早期复制上下文、前置属性缺失和脚本额外点击创建配音的结果单列为准备历史，作废其产品失败结论。补建前置的另一任务因积分不足（需要200、可用100）结束，没有据此认定字幕/配音隔离失败。

逐例完整操作和输入见[正式用例](case-045-049-v2-current-functions-20261116.md)。045在PA媒体聊天库导入唯一WAV、添加到20秒，准备同素材PB，PA单删后核对PB播放，再回PA复用原卡并刷新。046明确分析一次、只选停顿/0.8秒并移除；当前文稿页无二次分析按钮，因此通过现有会话发送明确只分析指令，列出实际18.695896秒及保留源区间，保留原任务核验。047先混音至50%再明确更新首句；048的目标为先改中文C1确认不自动更新声音，再明确改对应配音稿并生成，当前因配音页不可用而未执行该分支。

049在含WM049文字和真实PNG的工程关闭总开关，保存并刷新重开；点击一次右上导出，记录原任务及页面错误/结果。后台状态只用于辅助定位，不代替页面交付验收；没有为恢复结果重复导出。未实际完成的ON导出和画面审核不记通过。

## 证据与自动化

[原生截图、逐项检查和SHA256清单]({EVIDENCE.name}/manifest.json) · [本批脱敏记录]({EVIDENCE.name}/execution-evidence.json) · [当前进度](execution-status-current.md)。原始报告、受理检查点、完整工程和含签名地址的响应仅本机留存；公开证据不复制凭据或签名URL。截图原样复制，未绘制、替换或借用其他轮次失败画面。

047单句再生成失败现场：

![047 真实翻译配音工程单句再生成报错]({EVIDENCE.name}/047/{LIVE047.name}--ERYE210-047-failed.png)

049第一次OFF导出失败现场：

![049 原生导出报错且未交付页面结果]({EVIDENCE.name}/049/{FIRST.name}--049-OFF-original-export-error.png)

[046阻塞现场]({EVIDENCE.name}/046/{REVIEW.name}--ERYE210-046-blocked.png) · [048阻塞现场]({EVIDENCE.name}/048/{LIVE048.name}--ERYE210-048-blocked.png)。未执行的二次范围分析、048目标编辑以及049第二次ON导出不计通过。

5条唯一注册于tests/editor/erye210-current-five.spec.ts；默认仍43个有效入口（42 AUTO、014唯一BLOCKED前置门禁）。typecheck及用例格式检查通过；脚本接入和静态检查不作为产品Passed依据。{cloud_note} 本轮未提交或推送Git。
'''
    (DOC / REPORT).write_text(report, encoding='utf-8')
    meta = DOC / 'meta.yaml'
    text = meta.read_text(encoding='utf-8')
    text = re.sub(r'(?m)^  batch: .*$', '  batch: current-five-combined-production-20261116', text, count=1)
    text = re.sub(r'(?m)^  result: .*$', '  result: CompletedWithRecordedFailuresOrBlocks', text, count=1)
    batch_inline = ', '.join(k.replace(' ', '')+': '+str(batch[k]) for k in ['Passed','Failed','Blocked','Not Applicable','Not Run'])
    current_inline = ', '.join(k.replace(' ', '')+': '+str(counts[k]) for k in ['Passed','Failed','Blocked','Not Applicable','Not Run'])
    text = re.sub(r'(?m)^  latest_batch_counts: .*$', '  latest_batch_counts: {'+batch_inline+'}', text, count=1)
    text = re.sub(r'(?m)^  current_counts: .*$', '  current_counts: {'+current_inline+'}', text, count=1)
    text = re.sub(r'(?m)^  report: .*$', '  report: '+REPORT, text, count=1)
    meta.write_text(text, encoding='utf-8')
    global_files = ['docs/testing-progress.md','docs/codex-context.md','docs/cases/editor-linked-196-206-210.md','docs/verification.md']
    for name in global_files:
        p = ROOT / name
        text = p.read_text(encoding='utf-8')
        prefix = 'requirements/ERYE-210' if name.startswith('docs/cases/') else 'cases/requirements/ERYE-210'
        section = f'''<!-- ERYE210-CURRENT-FIVE-20261116 -->
## ERYE210-045～049当前功能v2生产Chrome执行（2026-11-16）

本批5条：{', '.join(str(batch[k])+' '+k for k in ['Passed','Failed','Blocked','Not Run'])}；当前43条：**{brief}**。014原Blocked和完整结果保持，其他用例沿用历史实测；原11条退役不恢复，旧迁移/缓存/回退目标独立延期。

045共享素材引用隔离及复用通过；047在真实翻译配音工程混音50%保存重开后，明确单句再生成报页面协议错误；049关闭水印后原生导出报错、未交付页面结果，后台原任务done仅作辅助证据。048有独立真实翻译配音完成结果，但配音页无法稳定恢复原文案，目标编辑分支未执行。046通过同一已清理工程的会话入口明确二次只分析，实际结果以本轮报告为准。普通字幕准备、复制/属性缺失和额外创建的脚本错误保留为前置历史，不计产品缺陷。原生失败/阻塞截图及SHA256已归档。

默认仍43个有效脚本入口（42 AUTO、014唯一BLOCKED登记项），自动化接入与实际Blocked分开记录。 [完整用例]({prefix}/cases.md) · [本轮执行与截图]({prefix}/{REPORT}) · [当前进度]({prefix}/execution-status-current.md)。以下章节保留历史时点。

'''
        marker = '<!-- ERYE210-CURRENT-FIVE-20261116 -->'
        if marker in text:
            start = text.index(marker)
            end = text.index('以下章节保留历史时点。', start) + len('以下章节保留历史时点。')
            text = text[:start] + section + text[end:].lstrip('\n')
        else:
            line = text.find('\n')
            text = text[:line+1]+'\n'+section+text[line+1:]
        p.write_text(text, encoding='utf-8')
    print(json.dumps({'batch': dict(batch), 'current': current['counts'], 'report': str(DOC / REPORT), '014Unchanged': True}, ensure_ascii=False))

if __name__ == '__main__':
    main()
