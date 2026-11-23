"""Check original prompts, accepted runs, archived screenshots and downloaded bytes."""
import argparse, collections, datetime, hashlib, json, pathlib, re

p = argparse.ArgumentParser()
p.add_argument('--report', required=True)
a = p.parse_args()
root = pathlib.Path(__file__).resolve().parents[2]
out = pathlib.Path(a.report).resolve()
docs = root / 'docs/design-cases/icp-workflows'
read = lambda f: json.loads(f.read_text(encoding='utf8'))
state = read(out / 'execution.json')
definitions = read(docs / 'cases.json')
source = read(root / 'reports/dingtalk-cases-93NwLY-20261116/source-cells.json')
normalize = lambda s: re.sub(r'\s+', ' ', str(s)).strip()
runs, source_count, accepted, missing, images, artifacts = set(), 0, 0, 0, 0, 0
grades = collections.Counter()
for definition in definitions:
    cells = {c['cell']: c['value'] for s in source if s['name'] == definition['sheet'] for c in s['cells']}
    for step in definition['steps']:
        assert step['value'] == cells[step['cell']], (definition['id'], step['cell'])
        source_count += 1
    entry = state['cases'][definition['id']]
    folder = out / definition['id']
    messages = read(folder / 'messages.json')['messages']
    indexes = set()
    for step in entry['steps']:
        index, run_id = step['index'], step['runId']
        assert index not in indexes and run_id not in runs
        indexes.add(index)
        runs.add(run_id)
        assert step['documentVerbatim'] and step['prompt'] == definition['steps'][index]['value']
        assert any(m['role'] == 'user' and m.get('run_id') == run_id and normalize(m.get('text', m.get('content_text', ''))) == normalize(step['prompt']) for m in messages), (definition['id'], index, 'acceptance')
        run = read(folder / f'step-{index}-run.json')
        assert run['run_id'] == run_id and run['conversation_id'] == entry['conversationId']
        assert run['status'] == step['status'] and step['status'] in ('done', 'failed', 'cancelled')
        assert step.get('businessStatus') in ('Passed', 'Failed', 'Blocked', 'Not Applicable')
        grades[step['businessStatus']] += 1
        accepted += 1
    unsubmitted = {i + 1 for i in range(len(definition['steps'])) if i not in indexes}
    assert unsubmitted == set(entry.get('unexecutedRounds', [])), (definition['id'], 'unclassified rounds')
    missing += len(unsubmitted)
    for image in folder.glob('failed-*.png'):
        target = docs / 'evidence' / out.name / (definition['id'] + '-' + image.name)
        raw = image.read_bytes()
        assert raw.startswith(b'\x89PNG\r\n\x1a\n') and raw == target.read_bytes()
        images += 1
    for manifest_path in folder.glob('step-*-results/manifest.json'):
        for artifact in read(manifest_path)['files']:
            path = pathlib.Path(artifact['path'])
            raw = path.read_bytes()
            assert path.suffix != '.part' and len(raw) == artifact['bytes'] and hashlib.sha256(raw).hexdigest() == artifact['sha256']
            artifacts += 1
case_counts = dict(collections.Counter(e['status'] for e in state['cases'].values()))
current = read(docs / 'execution-status-current.json')
assert current['counts'] == case_counts
assert current['rounds'] == {'submitted': accepted, 'total': source_count, 'notRunForPrerequisites': missing, 'pendingApplicable': 0, 'businessCounts': dict(grades)}
# Public notes may reference ordinary source URLs, never signed credentials.
credential_pattern = re.compile(r'X-Amz-(?:Signature|Credential)=|Bearer\s+[A-Za-z0-9_.-]{20,}', re.I)
for path in docs.rglob('*'):
    if path.suffix in ('.md', '.json', '.txt'):
        assert not credential_pattern.search(path.read_text(encoding='utf8')), ('public credential', str(path))
result = dict(at=datetime.datetime.now(datetime.timezone.utc).isoformat(), sourceDefinitionsExact=source_count, acceptedPromptsExact=accepted, uniqueAcceptedRuns=len(runs), caseCounts=case_counts, submittedRoundBusinessCounts=dict(grades), unsubmittedForMissingPrerequisites=missing, failureScreenshotsCopiedWithoutChanges=images, downloadedArtifactsIntegrityVerified=artifacts, publicCredentialFindings=0, pendingAcceptedRuns=0)
(out / 'final-record-check.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
state['recordValidation'] = result
(out / 'execution.json').write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(json.dumps(result, ensure_ascii=False))
