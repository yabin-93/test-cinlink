"""Compare real decoded product frames/PCM with retained source ranges (read only)."""
from pathlib import Path
import argparse,json,subprocess,sys
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--case',choices=['074','075'],required=True);a=p.parse_args()
out=Path(a.report).resolve();state=json.loads((out/'execution.json').read_text(encoding='utf-8'));e=state['cases'][a.case];d=Path(e['download']['path']).parent
m=json.loads((d/'source-mapping.json').read_text(encoding='utf-8'));source=e['source']['path'];product=e['download']['path'];checks=[]
def check(name,ok,actual):checks.append(dict(name=name,passed=bool(ok),actual=actual))
def run(args):return subprocess.run(args,check=True,capture_output=True).stdout
def frame(file,t):return np.frombuffer(run(['ffmpeg','-v','error','-nostdin','-ss',str(t),'-i',file,'-frames:v','1','-vf','scale=128:72','-pix_fmt','rgb24','-f','rawvideo','-']),dtype=np.uint8).astype(np.float32)
def audio(file,t,duration):return np.frombuffer(run(['ffmpeg','-v','error','-nostdin','-ss',str(t),'-i',file,'-t',str(duration),'-vn','-ac','1','-ar','8000','-f','f32le','-']),dtype=np.float32)
v=next(t for t in m['tracks']if t['type']=='video');au=next(t for t in m['tracks']if t['type']=='audio');clips=v['clips']
check('所有片段来自本例唯一原片',all(c['fileId']==m['sourceFileId']for t in [v,au]for c in t['clips']),m)
shape=lambda t:[(c['sourceIn'],c['sourceOut'],c['start'],c.get('rate',1))for c in t['clips']]
check('视频与原音使用同一保留源区间及顺序',shape(v)==shape(au),{'video':shape(v),'audio':shape(au)})
if a.case=='075':
 review=json.loads((d/'review-selection.json').read_text(encoding='utf-8'))
 import re
 times=[60*int(x)+int(y)+int(z)/1000 for x,y,z in re.findall(r'(\d{2}):(\d{2})\.(\d{3})',review['text'])]
 expected=list(zip(times[::2],times[1::2]))
 check('高光片段与实际确认方案一致',[(c['sourceIn'],c['sourceOut'])for c in clips]==expected,expected)
for i,c in enumerate(clips):
 length=(c['sourceOut']-c['sourceIn'])/c.get('rate',1)
 if length<1:continue # sub-frame remnants are recorded in mapping, not guessed from a nearest frame
 for proportion in [.1,.5,.9]:
  t=c['start']+length*proportion;s=c['sourceIn']+length*proportion
  actual=frame(product,t);errors=[float(np.abs(actual-frame(source,max(0,s+delta))).mean())for delta in [-1/30,0,1/30]]
  check(f'片段{i+1}位置{proportion}实际画面对应原片',min(errors)<12,{'timeline':t,'source':s,'bestMeanPixelError':min(errors)})
 # Select a speech-bearing window by source energy first; a silent midpoint only
 # compares AAC quantization noise and is not evidence of content mismatch.
 candidates=[]
 for proportion in [.15,.3,.5,.7,.85]:
  midpoint=length*proportion;st=c['sourceIn']+midpoint;reference=audio(source,st-.5,1.0);candidates.append((float(np.sqrt(np.mean(reference**2))),midpoint,reference))
 rms,midpoint,reference=max(candidates,key=lambda x:x[0]);pt=c['start']+midpoint;st=c['sourceIn']+midpoint
 actual=audio(product,pt-.3,.6);actual=actual-actual.mean();reference=reference-reference.mean()
 scores=np.correlate(reference,actual,'valid');energy=np.convolve(reference**2,np.ones(len(actual)),'valid');corr=float(np.max(scores/np.sqrt(np.maximum(energy*np.sum(actual**2),1e-15))))
 check(f'片段{i+1}实际原声内容对应',rms>.005 and corr>.85,{'timeline':pt,'source':st,'sourceRms':rms,'correlation':corr})
result={'case':e['id'],'checks':checks,'failures':[c for c in checks if not c['passed']],'note':'原片映射仅作内容核验辅助；没有修改工程或依赖服务端字段命名验收。短于1秒片段登记源区间，未声称逐片人工听审。'}
(d/'source-content-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps({'case':e['id'],'checks':len(checks),'failures':result['failures']},ensure_ascii=False))
