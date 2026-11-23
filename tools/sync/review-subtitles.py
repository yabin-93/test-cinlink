"""Independent, auxiliary review evidence; no automatic semantic pass."""
from pathlib import Path
import argparse, json, re, subprocess, difflib, io, math
from PIL import Image, ImageDraw

p=argparse.ArgumentParser()
p.add_argument('--report',required=True);p.add_argument('--case',required=True)
p.add_argument('--round',required=True,type=int);a=p.parse_args()
root=Path(a.report).resolve();folder=root/a.case
media=folder/f'round-{a.round}-product.mp4'
srt_files=list(folder.glob(f'round-{a.round}-*.srt'))
if len(srt_files)!=1: raise SystemExit('需要一份本轮实际SRT；没有则保留人工逐句核验待办')
duration=float(json.loads(subprocess.run(['ffprobe','-v','error','-show_format','-of','json',str(media)],capture_output=True,check=True).stdout)['format']['duration'])
def seconds(v):
    h,m,s=re.split('[:,.]',v)[:3];ms=re.split('[:,.]',v)[3]
    return int(h)*3600+int(m)*60+int(s)+int(ms)/1000
cues=[]
for block in re.split(r'\n\s*\n',srt_files[0].read_text(encoding='utf-8-sig').strip()):
    lines=block.splitlines();match=re.fullmatch(r'(\d\d:\d\d:\d\d[,\.]\d{3})\s*-->\s*(\d\d:\d\d:\d\d[,\.]\d{3})',lines[1])
    if not match: raise ValueError(block)
    cues.append({'ordinal':int(lines[0]),'start':seconds(match[1]),'end':seconds(match[2]),'text':'\n'.join(lines[2:])})
checks={'nonnegative':all(c['start']>=0 for c in cues),'ordered':all(cues[i]['start']>=cues[i-1]['start'] for i in range(1,len(cues))),'validEnds':all(c['end']>=c['start'] for c in cues),'withinProduct':all(c['end']<=duration for c in cues)}
def norm(s):return ''.join(x.lower() for x in s if x.isalnum())
asrpath=folder/f'round-{a.round}-independent-asr.json'
if asrpath.exists():
    asr=json.loads(asrpath.read_text(encoding='utf-8'));chars=[];times=[]
    for segment in asr['segments']:
        for w in segment.get('words',[]):
            text=norm(w['word']);chars+=list(text);times += [(w['start'],w['end'])]*len(text)
    source=''.join(norm(c['text']) for c in cues);target=''.join(chars)
    matching={}
    for block in difflib.SequenceMatcher(None,source,target,autojunk=False).get_matching_blocks():
        for i in range(block.size):matching[block.a+i]=block.b+i
    offset=0
    for c in cues:
        n=norm(c['text']);indexes=[matching[j] for j in range(offset,offset+len(n)) if j in matching];offset+=len(n)
        if indexes:
            start=min(times[j][0] for j in indexes);end=max(times[j][1] for j in indexes)
            c['independentAsrAuxiliary']={'matchedCharacters':len(indexes),'totalCharacters':len(n),'observedSpeechStart':start,'observedSpeechEnd':end,'speechStartMinusSubtitleStart':round(start-c['start'],3),'speechEndMinusSubtitleEnd':round(end-c['end'],3)}
    auxiliaryText=asr['text']
else: auxiliaryText=None
for batch in range(math.ceil(len(cues)/12)):
    cells=[]
    for c in cues[batch*12:(batch+1)*12]:
        t=(c['start']+c['end'])/2
        result=subprocess.run(['ffmpeg','-v','error','-nostdin','-ss',str(t),'-i',str(media),'-frames:v','1','-vf','scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2','-f','image2pipe','-vcodec','png','-'],capture_output=True,check=True)
        cell=Image.new('RGB',(640,390),'white');cell.paste(Image.open(io.BytesIO(result.stdout)),(0,30))
        ImageDraw.Draw(cell).text((10,8),f"Cue {c['ordinal']} | sampled at {t:.3f}s | SRT {c['start']:.3f}-{c['end']:.3f}s",fill='black');cells.append(cell)
    sheet=Image.new('RGB',(1920,390*math.ceil(len(cells)/3)),'#cccccc')
    for i,cell in enumerate(cells):sheet.paste(cell,((i%3)*640,(i//3)*390))
    sheet.save(folder/f'round-{a.round}-cue-frames-{batch+1}.png')
report={'srt':srt_files[0].name,'checks':checks,'duration':duration,'cues':cues,'independentAsrText':auxiliaryText,'verdict':'待人工逐句听看；ASR对齐仅作定位，不按估算偏移或同一服务数据判通过'}
(folder/f'round-{a.round}-subtitle-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'case':a.case,'round':a.round,'cueCount':len(cues),'checks':checks},ensure_ascii=False))
