import argparse
import json
from pathlib import Path
import sys
import torch
import whisper

sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser()
parser.add_argument('--input',required=True)
parser.add_argument('--output',required=True)
parser.add_argument('--language',required=True)
args=parser.parse_args()
torch.set_num_threads(4)
model=whisper.load_model('large-v3-turbo',device='cuda' if torch.cuda.is_available() else 'cpu')
result=model.transcribe(args.input,language=None if args.language=='auto' else args.language,fp16=torch.cuda.is_available(),verbose=False,word_timestamps=True,condition_on_previous_text=False)
destination=Path(args.output);destination.parent.mkdir(parents=True,exist_ok=True)
destination.write_text(json.dumps({'purpose':'独立ASR辅助，不能替代听审或用同一被测服务自证','model':'local-openai-whisper-large-v3-turbo','input':args.input,**result},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'file':str(destination),'segments':len(result['segments']),'language':result['language'],'text':result['text'][:500]},ensure_ascii=False))
