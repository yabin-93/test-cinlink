"""Prepare traceable ICP test inputs from the actual review, without AI edits."""
import argparse, pathlib, subprocess, json, hashlib
p=argparse.ArgumentParser();p.add_argument('--materials',required=True);p.add_argument('--ffmpeg',required=True);p.add_argument('--ffprobe',required=True);a=p.parse_args()
root=pathlib.Path(a.materials).resolve();font='C\\:/Windows/Fonts/arial.ttf'
def run(args):
 with (root/'preparation.log').open('ab') as log:
  subprocess.run([a.ffmpeg,'-y','-hide_banner','-loglevel','warning',*args],cwd=root,stdout=log,stderr=log,check=True)
def probe(file):return json.loads(subprocess.check_output([a.ffprobe,'-v','error','-show_entries','format=duration:stream=codec_type,width,height','-of','json',str(root/file)]))
def ready(file,expected):
 try:return (root/file).stat().st_size>1024 and abs(float(probe(file)['format']['duration'])-expected)<.2
 except (OSError,KeyError,ValueError,subprocess.CalledProcessError):return False
common=['-c:v','libx264','-preset','fast','-crf','24','-c:a','aac','-b:a','128k','-movflags','+faststart']
if not ready('review-full.mp4',605.161):
 run(['-reinit_filter','0','-i','review-part1.webm','-reinit_filter','0','-i','review-part2.webm','-filter_complex','[0:v]trim=duration=420,setpts=PTS-STARTPTS,scale=1280:720,setsar=1,fps=30,format=yuv420p[v0];[0:a]atrim=duration=420,asetpts=PTS-STARTPTS,aresample=48000[a0];[1:v]trim=duration=185.161,setpts=PTS-STARTPTS,scale=1280:720,setsar=1,fps=30,format=yuv420p[v1];[1:a]atrim=duration=185.161,asetpts=PTS-STARTPTS,aresample=48000[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]','-map','[v]','-map','[a]',*common,'-metadata','title=ADO Air 20 Ultra 2025 - source review browser copy','review-full.mp4'])
 if not ready('review-full.mp4',605.161):raise ValueError('完整测评素材的时长校验未通过，禁止继续准备或执行用例')
 print('prepared review-full.mp4',flush=True)
if not ready('product-intro-300s.mp4',300):
 run(['-i','review-full.mp4','-loop','1','-i','brand-logo.png','-filter_complex',f"[0:v]trim=duration=297,setpts=PTS-STARTPTS,subtitles=intro-english.srt:force_style='Fontsize=22,Outline=2'[main];color=c=white:s=1280x720:r=30:d=3[bg];[1:v]scale=400:-1[logo];[bg][logo]overlay=(W-w)/2:(H-h)/2:shortest=1[end];[main][end]concat=n=2:v=1:a=0[v];[0:a]atrim=duration=297,asetpts=PTS-STARTPTS,apad=whole_dur=300[a]",'-map','[v]','-map','[a]','-t','300',*common,'-metadata','comment=Internal QA input prepared from TechMishka public review with original speech; official ADO logo. Not a CinLink result.','product-intro-300s.mp4'])
 print('prepared product-intro-300s.mp4',flush=True)
if not ready('english-ad-35s.mp4',35):
 vf=f"[0:v]trim=duration=35,setpts=PTS-STARTPTS,scale=540:304,pad=540:960:0:280:color=black,subtitles=ad-english.srt:force_style='Fontsize=14,MarginV=24,Outline=1',drawtext=fontfile='{font}':text='ADO Air 20 Ultra':fontcolor=white:fontsize=28:x=(w-tw)/2:y=55,drawtext=fontfile='{font}':text='Foldable Electric Bike':fontcolor=white:fontsize=27:x=(w-tw)/2:y=110:enable='lt(t,15)',drawtext=fontfile='{font}':text='Easy to Fold':fontcolor=white:fontsize=27:x=(w-tw)/2:y=110:enable='between(t,15,27)',drawtext=fontfile='{font}':text='Shop Now':fontcolor=white:fontsize=40:x=(w-tw)/2:y=690:enable='gte(t,27)'[v];[0:a]atrim=duration=27,asetpts=PTS-STARTPTS,apad=whole_dur=35[voice];[1:a]atrim=duration=35,asetpts=PTS-STARTPTS,volume=0.08[bgm];[voice][bgm]amix=inputs=2:duration=first:normalize=0[a]"
 run(['-i','review-full.mp4','-i','Carefree.mp3','-filter_complex',vf,'-map','[v]','-map','[a]','-t','35',*common,'-metadata','comment=Internal QA input. Footage/speech: TechMishka public ADO review. Music: Carefree, Kevin MacLeod, incompetech.com, CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ . Prepared for localization tests; not a CinLink output.','english-ad-35s.mp4'])
 print('prepared english-ad-35s.mp4',flush=True)
for t,name in [(90,'broll-riding.jpg'),(250,'broll-overview.jpg'),(280,'broll-design.jpg')]:
 if not (root/name).exists():run(['-ss',str(t),'-i','review-full.mp4','-frames:v','1','-q:v','2',name])
results=[]
for name in ['review-full.mp4','product-intro-300s.mp4','english-ad-35s.mp4']:
 f=root/name;results.append({'file':name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size,'probe':probe(name)})
(root/'prepared-fixtures.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(results,ensure_ascii=False),flush=True)
