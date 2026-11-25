from pathlib import Path
import argparse,json,sys,torch,whisper

sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
root=Path(a.report).resolve();manifest=json.loads((root/'media-manifest.json').read_text(encoding='utf-8'))
torch.set_num_threads(4)
model=whisper.load_model('large-v3-turbo',device='cpu')
for key,name,language in [('M3','双人（英）.mp4','en'),('M4','日文.mp4','ja'),('M6a','9s.mp4','en'),('M6b','x.mp4','en')]:
    destination=root/'baselines'/f'{key}-independent-asr.json'
    if destination.exists():continue
    source=next(x for x in manifest['sourceFiles'] if x['relativePath']==name)
    print(json.dumps({'start':key},ensure_ascii=False),flush=True)
    result=model.transcribe(source['path'],language=language,fp16=False,verbose=False,word_timestamps=True,condition_on_previous_text=False)
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(json.dumps({'purpose':'独立ASR辅助，不能替代听审或用同一被测服务自证','model':'local-openai-whisper-large-v3-turbo','input':source['path'],**result},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'complete':key,'segments':len(result['segments'])},ensure_ascii=False),flush=True)
