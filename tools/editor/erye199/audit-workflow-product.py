"""Read actual downloaded native-card product; no product writes or rendering jobs."""
from pathlib import Path
import argparse,subprocess,json,re,hashlib,difflib,sys
sys.stdout.reconfigure(encoding='utf-8')
p=argparse.ArgumentParser();p.add_argument('--report',required=True);p.add_argument('--case',required=True);args=p.parse_args()
root=Path(__file__).resolve().parents[3];out=Path(args.report).resolve();state=json.loads((out/'execution.json').read_text(encoding='utf-8'));entry=state['cases'][args.case]
assert entry['runStatus']=='done'and entry.get('download'),'No completed native product'
product=Path(entry['download']['path']);target=product.parent
def run(cmd):return subprocess.run(cmd,check=True,capture_output=True).stdout
facts=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(product)]));run(['ffmpeg','-v','error','-nostdin','-i',str(product),'-f','null','-'])
v=next(s for s in facts['streams']if s['codec_type']=='video');a=next((s for s in facts['streams']if s['codec_type']=='audio'),None);duration=float(facts['format']['duration'])
asr=target/'product-independent-asr.json'
if not asr.exists():
 subprocess.run([sys.executable,str(root/'tools/sync/transcribe.py'),'--input',str(product),'--output',str(asr),'--language','auto'],check=True)
transcript=json.loads(asr.read_text(encoding='utf-8'));source=json.loads((out/'fixture-support'/(entry['definition']['media']+'-independent-asr.json')).read_text(encoding='utf-8'))
normalize=lambda text:re.sub(r'[^a-z0-9\u4e00-\u9fff]','',text.lower())
checks=[]
def check(name,passed,actual):checks.append({'name':name,'passed':bool(passed),'actual':actual})
check('下载文件完整可解码',True,{'bytes':product.stat().st_size,'sha256':hashlib.sha256(product.read_bytes()).hexdigest()})
check('实际音轨存在',a is not None,a and {'codec':a['codec_name'],'sample_rate':a.get('sample_rate'),'channels':a.get('channels')})
if args.case in ['069','070','071','072','073']:check('完整20秒时长',abs(duration-20)<=1/30,{'duration':duration})
if args.case=='073':check('实际输出尺寸2倍',(v['width'],v['height'])==(2560,1440),{'width':v['width'],'height':v['height']})
else:check('实际视频源规格保持',(v['width'],v['height'])==(1280,720),{'width':v['width'],'height':v['height']})
if args.case in ['069','070','073']:
 check('原英语语音内容保持',normalize(transcript['text'])==normalize(source['text']),{'language':transcript.get('language'),'text':transcript['text'],'sourceText':source['text']})
if args.case in ['071','072']:
 check('实际声音为中文译声',transcript.get('language')=='zh'and len(re.findall(r'[\u4e00-\u9fff]',transcript['text']))>30,{'language':transcript.get('language'),'text':transcript['text']})
if args.case=='074':
 check('清理后实际时长缩短',0<duration<60,{'duration':duration})
 fillers=re.findall(r'(?i)(?:^|\s)(um|uh)(?=[\s.,!?]|$)',transcript['text'])
 check('已标注口水词未保留',not fillers,{'remainingFillers':fillers,'text':transcript['text']})
 check('三个话题主体保留',all(term in transcript['text'].lower()for term in ['first topic','second topic','final topic']),transcript['text'])
 cleaned_source=re.sub(r'(?i)\b(?:um|uh)\b[.,]?','',source['text'])
 check('移除口水词后全部正文与源片一致',normalize(transcript['text'])==normalize(cleaned_source),{'sourceWithoutFillers':cleaned_source,'actual':transcript['text']})
if args.case=='075':check('目标30秒高光实际时长',abs(duration-30)<=1/30,{'duration':duration})
match=re.search(r'\bmax="([0-9.]+)"',entry.get('editorView',{}).get('seekInput',''))
if match:check('编辑页时间轴与本轮成片时长对应',abs(float(match[1])-duration)<=1/30,{'editorDuration':float(match[1]),'productDuration':duration})
result={'case':'ERYE199-'+args.case,'product':str(product),'duration':duration,'width':v['width'],'height':v['height'],'checks':checks,'failures':[c for c in checks if not c['passed']],'transcript':transcript['text'],'language':transcript.get('language'),'note':'本地独立ASR辅助声音内容核对，不冒充人工耳听；仍结合原生预览播放、字幕及源标记观察'}
(target/'product-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps({k:result[k]for k in ['case','duration','width','height','failures','language']},ensure_ascii=False))
