"""Prepare portable timeline fixtures from existing F20/F60/D; no product calls."""
from pathlib import Path
import argparse,json,hashlib,shutil,subprocess,math,wave,array
p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--f20',required=True);p.add_argument('--f60',required=True);p.add_argument('--d',required=True);a=p.parse_args()
out=Path(a.out).resolve();media=out/'media';media.mkdir(parents=True,exist_ok=True)
assert not(out/'media.json').exists(),'Existing manifest: verify instead of replacing'
paths={}
for key,source,name in [('F20',a.f20,'F20-English-source-with-BGM.mp4'),('F60',a.f60,'F60-English-source-with-BGM.mp4'),('D',a.d,'D-independent-audio-12s.wav')]:
 src=Path(source).resolve();assert src.is_file();dest=media/name;assert src!=dest;shutil.copy2(src,dest);paths[key]=dest
music=media/'B-independent-melody-12s.wav';assert not music.exists()
rate=48000;samples=array.array('h')
notes=[523.251,659.255,783.991,659.255,587.330,698.456,880.000,698.456]
for i in range(rate*12):
 t=i/rate;phase=t%.5;freq=notes[int(t/.5)%len(notes)];env=min(phase/.015,1)*min((.5-phase)/.10,1)
 samples.append(int(32767*.17*env*(math.sin(2*math.pi*freq*t)+.25*math.sin(2*math.pi*freq*2*t))))
with wave.open(str(music),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(samples.tobytes())
paths['B']=music;manifest={}
for key,f in paths.items():
 probe=json.loads(subprocess.run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)],check=True,capture_output=True).stdout)
 expected={'F20':20,'F60':60,'D':12,'B':12}[key];assert abs(float(probe['format']['duration'])-expected)<.04
 manifest[key]={'name':f.name,'path':str(f),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'probe':probe}
manifest['B']['note']='Locally synthesized distinct ascending/descending melody; independent import, never native separated BGM.'
(out/'media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:{'name':v['name'],'duration':v['probe']['format']['duration']}for k,v in manifest.items()}))
