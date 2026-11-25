"""Read-only speech evidence for actual downloaded test outputs; uses an existing local model."""
import argparse, hashlib, json, os, pathlib

p = argparse.ArgumentParser()
p.add_argument('--manifest', required=True)
p.add_argument('--model', required=True)
p.add_argument('--ffmpeg-dir', required=True)
a = p.parse_args()
model_path = pathlib.Path(a.model)
if not model_path.is_file():
    raise SystemExit('本地模型不存在；不自动下载模型或安装依赖')
os.environ['PATH'] = str(pathlib.Path(a.ffmpeg_dir)) + os.pathsep + os.environ.get('PATH', '')
import torch, whisper
torch.set_num_threads(min(8, os.cpu_count() or 1))
manifest = json.loads(pathlib.Path(a.manifest).read_text(encoding='utf8'))
model = None
for f in manifest['files']:
    if f.get('kind') not in ('video', 'audio'):
        continue
    source = pathlib.Path(f['path'])
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    if digest != f['sha256']:
        raise SystemExit('产物哈希与下载清单不一致')
    target = source.with_suffix('.asr.json')
    if target.is_file():
        old = json.loads(target.read_text(encoding='utf8'))
        if old.get('sourceSha256') == digest:
            print(json.dumps({'file': source.name, 'cached': True, 'language': old.get('language'), 'text': old.get('text')}, ensure_ascii=False))
            continue
    if model is None:
        model = whisper.load_model(str(model_path), device='cpu')
    result = model.transcribe(str(source), fp16=False, temperature=0, condition_on_previous_text=False, word_timestamps=True, verbose=False)
    result.update({'sourceSha256': digest, 'sourceName': source.name, 'model': model_path.name, 'verificationNote': '离线自动识别，仅作实际音轨核验依据；识别不确定处需结合原声/字幕，不能单凭ASR判产品缺陷。'})
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps({'file': source.name, 'language': result['language'], 'text': result['text']}, ensure_ascii=False), flush=True)
