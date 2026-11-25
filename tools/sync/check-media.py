from pathlib import Path
import argparse
import hashlib
import json
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser()
parser.add_argument('--report',required=True)
parser.add_argument('--case',required=True)
parser.add_argument('--round',required=True,type=int,choices=[1,2])
args=parser.parse_args()
root=Path(args.report).resolve()
state=json.loads((root/'execution.json').read_text(encoding='utf-8'))
entry=state['cases'][args.case]
product=entry['p1' if args.round==1 else 'p2']
media=Path(product['path'])
probe=json.loads(subprocess.run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(media)],capture_output=True,check=True).stdout)
decode=subprocess.run(['ffmpeg','-v','error','-nostdin','-i',str(media),'-f','null','-'],capture_output=True)
assert decode.returncode==0,decode.stderr.decode(errors='replace')
video=next(x for x in probe['streams'] if x['codec_type']=='video')
audios=[x for x in probe['streams'] if x['codec_type']=='audio']
assert audios,'交付物没有音轨'
actual_hash=hashlib.sha256(media.read_bytes()).hexdigest()
assert actual_hash==product['sha256'],'本地文件哈希发生变化'
duration=float(probe['format']['duration'])
dimensions={'SYNC-001':(1280,720),'SYNC-002':(544,960),'SYNC-003':(1920,1080),'SYNC-004':(640,1138),'SYNC-005':(640,360),'SYNC-006':(1920,1080)}
expected_width,expected_height=dimensions[args.case]
# 要求保留画面比例，不把同比例缩放误判失败；允许编码偶数像素取整。
checks={'fullDecode':True,'sha256Matches':True,'hasAudio':True,'aspectRatioMatches':abs(video['height']-video['width']*expected_height/expected_width)<=2}
if args.round==2:
    checks['p1HashUnchanged']=hashlib.sha256(Path(entry['p1']['path']).read_bytes()).hexdigest()==entry['p1']['sha256']
if args.case in ('SYNC-001','SYNC-002','SYNC-006'):
    target={'SYNC-001':30,'SYNC-002':20,'SYNC-006':18}[args.case]
    checks['durationMatches']=abs(duration-target)<=2
    if args.round==2:
        checks['preservesInputDuration']=abs(duration-float(entry['p1']['actualDuration']))<=0.5
elif args.round==1 and args.case in ('SYNC-003','SYNC-004'):
    target={'SYNC-003':193.329002,'SYNC-004':54.009615}[args.case]
    checks['durationMatches']=abs(duration-target)<=0.5
elif args.round==2 and args.case in ('SYNC-003','SYNC-004'):
    target={'SYNC-003':30,'SYNC-004':20}[args.case]
    checks['durationMatches']=abs(duration-target)<=2
elif args.round==2:
    checks['durationMatches']=abs(duration-float(entry['p1']['actualDuration']))<=0.5
else:
    checks['durationMatches']=0<duration<40.68
product.update({'probe':probe,'actualDuration':duration,'mediaChecks':checks,'mediaPrecheckPassed':all(checks.values()),'semanticReview':'待核；媒体检查通过不代表语义/逐句同步全部通过'})
if args.case=='SYNC-001' and args.round==1:
    product['sourceRangesObservedInReview']=[{'fileId':entry['sources'][0]['id'],'sourceStart':97.5,'sourceEnd':98.74,'outputStart':0,'outputEnd':1.24},{'fileId':entry['sources'][0]['id'],'sourceStart':100.2,'sourceEnd':128.96,'outputStart':1.24,'outputEnd':30}]
(root/args.case/f'round-{args.round}-media-check.json').write_text(json.dumps(product,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(root/'execution.json').write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'case':args.case,'round':args.round,'duration':duration,'dimensions':[video['width'],video['height']],'checks':checks},ensure_ascii=False))
