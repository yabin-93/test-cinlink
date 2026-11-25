"""Read native downloads and independently check media content; no app writes."""
from pathlib import Path
import argparse,subprocess,json,hashlib,re,sys
sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--case',required=True);a=p.parse_args();out=Path(a.report).resolve();root=Path(__file__).resolve().parents[3];e=json.loads((out/'execution.json').read_text(encoding='utf-8'))['cases'][a.case]
assert e['runStatus']=='done'and e.get('download');f=Path(e['download']['path']);d=f.parent
def run(cmd):return subprocess.run(cmd,capture_output=True,check=True).stdout
facts=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)]));run(['ffmpeg','-v','error','-nostdin','-i',str(f),'-f','null','-']);v=next(s for s in facts['streams']if s['codec_type']=='video');checks=[]
def check(name,passed,actual):checks.append({'name':name,'passed':bool(passed),'actual':actual})
check('实际下载文件完整可解码',True,{'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
if a.case=='077':check('图片1K正方形',(v['width'],v['height'])==(1024,1024),[v['width'],v['height']])
else:
 duration=float(facts['format']['duration']);check('实际视频时长',abs(duration-(5 if a.case=='076' else 20))<=1/24,duration);check('视频1280x720',(v['width'],v['height'])==(1280,720),[v['width'],v['height']])
 for t in ([.5,3]if a.case=='076'else[2,10]):
  target=d/f'product-frame-{t}.png'
  if not target.exists():run(['ffmpeg','-v','error','-nostdin','-ss',str(t),'-i',str(f),'-frames:v','1',str(target)])
 if a.case!='076':
  asr=d/'product-independent-asr.json'
  if not asr.exists():subprocess.run([sys.executable,str(root/'tools/sync/transcribe.py'),'--input',str(f),'--output',str(asr),'--language','auto'],check=True)
  transcription=json.loads(asr.read_text(encoding='utf-8'))
  if a.case in ['078-S0','078-S1']:
   source=json.loads((out.parent/'erye199-069-075-production-20261118/fixture-support/F20-independent-asr.json').read_text(encoding='utf-8'));normalize=lambda s:re.sub(r'[^a-z0-9]','',s.lower());check('原英语声音未被译配或串用',normalize(transcription['text'])==normalize(source['text']),transcription['text'])
  else:check('实际中文译声',transcription.get('language')=='zh'and len(re.findall(r'[\u4e00-\u9fff]',transcription['text']))>30,transcription['text'])
result={'case':e['id'],'key':a.case,'checks':checks,'failures':[c for c in checks if not c['passed']],'facts':{'width':v['width'],'height':v['height'],'duration':facts['format'].get('duration')},'note':'独立解码和ASR辅助核验，不声称人工逐句听审。'}
(d/'product-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps({'key':a.case,'failures':result['failures'],'facts':result['facts']},ensure_ascii=False))
