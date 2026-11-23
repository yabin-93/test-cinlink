"""Sample frame and audio lineage evidence, without semantic/sync verdicts."""
from pathlib import Path
import argparse,json,subprocess,io
import numpy as np
from PIL import Image

p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--case',required=True);p.add_argument('--round',type=int,required=True);a=p.parse_args()
root=Path(a.report).resolve();state=json.loads((root/'execution.json').read_text(encoding='utf-8'));e=state['cases'][a.case];product=e[f'p{a.round}']
manifest=json.loads((root/'media-manifest.json').read_text(encoding='utf-8'))
step=next(x for x in e['steps'] if x['round']==a.round)
ranges=step.get('reviewedSourceRanges') or product.get('sourceRangesObservedInReview')
sameTimeline=a.round==2 and a.case in ['SYNC-001','SYNC-002','SYNC-005','SYNC-006']
if sameTimeline:ranges=[{'sourceStart':0,'sourceEnd':float(e['p1']['actualDuration']),'outputStart':0,'outputEnd':float(product['actualDuration'])}]
if not ranges:raise SystemExit('没有经页面记录的实际保留片段表，不能假定源片前N秒')
def frame(file,t):
    raw=subprocess.run(['ffmpeg','-v','error','-nostdin','-ss',str(t),'-i',str(file),'-frames:v','1','-vf','scale=320:180','-f','image2pipe','-vcodec','png','-'],capture_output=True,check=True).stdout
    return np.asarray(Image.open(io.BytesIO(raw)).convert('RGB'),dtype=np.float32)
def pcm(file,start,duration):
    raw=subprocess.run(['ffmpeg','-v','error','-nostdin','-ss',str(start),'-i',str(file),'-t',str(duration),'-vn','-ac','1','-ar','16000','-f','f32le','-'],capture_output=True,check=True).stdout
    return np.frombuffer(raw,dtype='<f4').astype(np.float64)
results=[]
for r in ranges:
    if a.round==2:source=e['p1']['path']
    else:
        fid=r.get('fileId') or e['sources'][0]['id'];name=next(x['name'] for x in e['sources'] if x['id']==fid)
        source=next((x['path'] for x in manifest['sourceFiles'] if Path(x['path']).name==name),None)
        if source is None and a.case=='SYNC-005':source=manifest['controlledFixture']['path']
    result={'source':source,'range':r,'samples':[]}
    for fraction in [0.15,0.5,0.85]:
        st=r['sourceStart']+(r['sourceEnd']-r['sourceStart'])*fraction;ot=r['outputStart']+(r['outputEnd']-r['outputStart'])*fraction
        leftFull=frame(source,st);rightFull=frame(product['path'],ot)
        left=leftFull[:135];right=rightFull[:135]
        sample={'sourceTime':round(st,4),'outputTime':round(ot,4),'upper75PercentMeanAbsolutePixelDifference':round(float(np.mean(np.abs(left-right))),4)}
        if a.round==2 and not sameTimeline:sample['bottom25PercentIncludingExistingSubtitlesMeanAbsolutePixelDifference']=round(float(np.mean(np.abs(leftFull[135:]-rightFull[135:]))),4)
        result['samples'].append(sample)
    if not sameTimeline:
        length=min(r['sourceEnd']-r['sourceStart'],r['outputEnd']-r['outputStart'])
        x=pcm(source,r['sourceStart'],length);y=pcm(product['path'],r['outputStart'],length);n=min(len(x),len(y));x=x[:n];y=y[:n]
        if n>1 and np.std(x)>0 and np.std(y)>0:result['samePositionAudioCorrelation']=float(np.corrcoef(x,y)[0,1])
    results.append(result)
output={'case':a.case,'round':a.round,'purpose':'帧/波形取证辅助，不能替代完整听看或单独证明语义同步','results':results}
(root/a.case/f'round-{a.round}-lineage-comparison.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(output,ensure_ascii=False))
