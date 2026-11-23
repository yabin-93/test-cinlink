from pathlib import Path
import hashlib
import json
import subprocess
import sys
import wave

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'reports/sync001006-staging-20261116'
MEDIA = Path('E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道')
EXPECTED = {
 '1270510918-1-12.mp4': '988ee53e64e00a18809a65e7138bae8ef44100f8a51e92c0f86c4adbe54107aa',
 '纯中文.mp4': '1123e89b7fdbb70634e1f3e9c62c603c01d491a2dd2678069705d01db9297563',
 '双人（英）.mp4': '264d67b80ca1cb15bf95301f7a48aebeba4f0d45117a0225b3144295e576d0b4',
 '日文.mp4': 'cddcc37a4e092a49774759e51acc013297410fd2e2f261ce59e9efd068857c41',
 '自动补充测试素材/fillers-controlled.wav': '6d995e3b7471a0a32f7d2c20e387be866ad10137fb55cace95351ca3caaf7bb0',
 '03jpeg.jpg': '4f8e3093b5b1b446a1eb26ab656f94f96907319421693c650c5b430cc744173e',
 '9s.mp4': '897b9ef16ac9fd2c255067478f179143f1d998b4e962f391e9ede635a4bfe022',
 'x.mp4': 'a0c47d8a7cf9b01bd611046ef471e0b41e1b84ed1248cacab4321f54305a7f89',
}
def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()
def run(args):
    return subprocess.run(args, check=True, capture_output=True).stdout
def probe(path):
    return json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))

OUT.mkdir(parents=True, exist_ok=True)
items=[]
for rel, expected in EXPECTED.items():
    path=MEDIA/rel
    actual=sha(path)
    assert actual == expected, f'源素材哈希变化：{rel}'
    facts=probe(path)
    items.append({'relativePath':rel,'path':str(path),'bytes':path.stat().st_size,'sha256':actual,'probe':facts})
wav=MEDIA/'自动补充测试素材/fillers-controlled.wav'
annotations=json.loads((wav.parent/'fillers.annotations.json').read_text(encoding='utf-8-sig'))
assert annotations['audio_sha256'] == sha(wav)
fixture=OUT/'fixtures/SYNC-005-controlled.mp4'
fixture.parent.mkdir(parents=True,exist_ok=True)
if not fixture.exists():
    run(['ffmpeg','-v','error','-nostdin','-loop','1','-i',str(MEDIA/'03jpeg.jpg'),'-i',str(wav),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','medium','-tune','stillimage','-pix_fmt','yuv420p','-r','25','-c:a','alac','-sample_fmt','s16p','-t','40.68','-movflags','+faststart',str(fixture)])
run(['ffmpeg','-v','error','-nostdin','-i',str(fixture),'-f','null','-'])
decoded=run(['ffmpeg','-v','error','-nostdin','-i',str(fixture),'-map','0:a:0','-f','s16le','-'])
with wave.open(str(wav),'rb') as audio:
    source_pcm=audio.readframes(audio.getnframes())
    sample_rate=audio.getframerate()
assert decoded == source_pcm, 'ALAC视频解码后的PCM与原音频不一致，不能登记为时序已验证'
facts=probe(fixture)
video=next(s for s in facts['streams'] if s['codec_type']=='video')
assert (video['width'],video['height'],video['r_frame_rate']) == (640,360,'25/1')
fixture_record={'path':str(fixture),'sha256':sha(fixture),'bytes':fixture.stat().st_size,'probe':facts,'audioPcmExactlyMatchesSource':True,'measuredOffsetSamples':0,'measuredOffsetSeconds':0,'sampleRate':sample_rate,'annotations':annotations,'listeningReview':'待独立核验；此处PCM相等只证明输入音频完整且未移位，不代替听审'}
manifest={'date':'2026-11-16','environment':'staging','sourceFiles':items,'controlledFixture':fixture_record}
(OUT/'media-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'sourceFilesVerified':len(items),'fixture':str(fixture),'fixtureSha256':fixture_record['sha256'],'pcmExactlyMatches':True,'offsetSeconds':0},ensure_ascii=False))
