"""Prepare actual F20/F60 speech fixtures for native-card tests, no product calls."""
from pathlib import Path
import argparse,subprocess,json,hashlib,math,wave,array
parser=argparse.ArgumentParser();parser.add_argument('--out',required=True);parser.add_argument('--source',required=True);args=parser.parse_args()
OUT=Path(args.out).resolve();OUT.mkdir(parents=True,exist_ok=True);support=OUT.parent/'fixture-support';support.mkdir(exist_ok=True)
source=Path(args.source).resolve();assert source.is_file()
def run(cmd):return subprocess.run(cmd,check=True,capture_output=True).stdout
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def probe(p):return json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
f20=OUT/'F20-English-source-with-BGM.mp4';f60=OUT/'F60-English-fillers-three-topics.mp4'
if f60.exists():raise SystemExit('Completed fixtures must be verified, never silently replaced')
sr=48000;music=support/'instrumental-reference.wav';samples=array.array('h')
chords=[(261.63,329.63,392),(220,261.63,329.63),(174.61,220,261.63),(196,246.94,293.66)]
for i in range(sr*20):
 t=i/sr;notes=chords[int(t//2)%len(chords)];envelope=min(1,(t%2)*8)*min(1,(2-t%2)*6)
 samples.append(int(32767*.018*envelope*sum(math.sin(2*math.pi*n*t)+.2*math.sin(4*math.pi*n*t)for n in notes)/3))
with wave.open(str(music),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(samples.tobytes())
vf="scale=1280:720,fps=30,drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='F20 source %{pts\\:hms}':x=20:y=20:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.7"
if not f20.exists():
 run(['ffmpeg','-v','error','-nostdin','-i',str(source),'-i',str(music),'-filter_complex',f'[0:v]{vf}[v];[0:a]atrim=0:20,asetpts=PTS-STARTPTS,aresample=48000[a0];[a0][1:a]amix=inputs=2:duration=first:normalize=0[a]','-map','[v]','-map','[a]','-t','20','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-ac','1','-movflags','+faststart',str(f20)])
run(['powershell','-NoProfile','-ExecutionPolicy','Bypass','-File',str(Path(__file__).with_suffix('.ps1')),'-OutputDir',str(support)])
parts=[];timeline=[];cursor=0
for idx,(filler,length)in enumerate([('um',18),('uh',18),('um',21.6)],1):
 pcm=b''
 for label in [filler,'chapter'+str(idx)]:
  b=run(['ffmpeg','-v','error','-nostdin','-i',str(support/(label+'.wav')),'-f','s16le','-ac','1','-ar',str(sr),'-'])
  timeline.append({'kind':'filler'if label in ['um','uh']else'speech','label':label,'start':cursor+len(pcm)/2/sr,'end':cursor+(len(pcm)+len(b))/2/sr})
  pcm+=b
  if label in ['um','uh']:pcm+=b'\0\0'*int(.25*sr)
 assert len(pcm)/2/sr<=length,('Speech chapter too long',idx,len(pcm)/2/sr)
 parts.append(pcm+b'\0\0'*(round(length*sr)-len(pcm)//2));cursor+=length
 if idx<3:timeline.append({'kind':'pause','start':cursor,'end':cursor+1.2});parts.append(b'\0\0'*round(1.2*sr));cursor+=1.2
wav=support/'F60-speech.wav'
with wave.open(str(wav),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(b''.join(parts))
vf60="drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='F60 synthetic QA %{pts\\:hms}':x=20:y=20:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.7"
run(['ffmpeg','-v','error','-nostdin','-f','lavfi','-i','testsrc2=size=1280x720:rate=30:duration=60','-i',str(wav),'-vf',vf60,'-t','60','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-ac','1','-movflags','+faststart',str(f60)])
items={}
for k,p in [('F20',f20),('F60',f60)]:
 facts=probe(p);v=next(s for s in facts['streams']if s['codec_type']=='video');a=next(s for s in facts['streams']if s['codec_type']=='audio');assert(v['width'],v['height'],v['r_frame_rate'],a['sample_rate'])==(1280,720,'30/1','48000');assert abs(float(facts['format']['duration'])-(20 if k=='F20' else 60))<.05
 items[k]={'path':str(p),'name':p.name,'bytes':p.stat().st_size,'sha256':sha(p),'probe':facts}
items['F20']['source']={'path':str(source),'sha256':sha(source),'sourceInterval':[0,20],'addedMusic':{'path':str(music),'sha256':sha(music),'kind':'controlled low-level instrumental chord sequence'},'speechReference':'English healthcare speech; first words: Efforts to sabotage our healthcare by filing a formal request'}
items['F60']['source']={'type':'synthetic QA speech, Microsoft Zira Desktop','topics':['weekly project plan','video editing','review process'],'timeline':timeline,'pcmPath':str(wav),'notes':'Exact annotated fillers and pauses; synthesis is test data, not a natural speaker recording'}
(OUT.parent/'media.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:{x:y[x]for x in ['name','bytes','sha256']}for k,y in items.items()},ensure_ascii=True))
