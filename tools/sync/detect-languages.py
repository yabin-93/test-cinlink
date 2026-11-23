from pathlib import Path
import argparse,json,sys,torch,whisper

sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);a=p.parse_args()
root=Path(a.report).resolve();state=json.loads((root/'execution.json').read_text(encoding='utf-8'))
torch.set_num_threads(4);model=whisper.load_model('large-v3-turbo',device='cpu')
expected={'SYNC-001':['en','zh'],'SYNC-002':['zh','en'],'SYNC-003':['zh','zh'],'SYNC-004':['zh','zh'],'SYNC-005':['zh','en'],'SYNC-006':['en','zh']}
for key,e in state['cases'].items():
    for n in [1,2]:
        product=e.get(f'p{n}')
        if not product:continue
        destination=root/key/f'round-{n}-language-detection.json'
        if destination.exists():continue
        audio=whisper.load_audio(product['path'])[:30*whisper.audio.SAMPLE_RATE]
        mel=whisper.log_mel_spectrogram(whisper.pad_or_trim(audio),n_mels=model.dims.n_mels)
        _,probabilities=model.detect_language(mel)
        top=sorted(probabilities.items(),key=lambda x:x[1],reverse=True)[:3]
        result={'case':key,'round':n,'expected':expected[key][n-1],'detected':top[0][0],'topProbabilities':dict(top),'sourceSha256':product['sha256'],'purpose':'独立首30秒语言识别辅助，未预先指定识别语种，不代替完整听审'}
        destination.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(json.dumps(result,ensure_ascii=False),flush=True)
