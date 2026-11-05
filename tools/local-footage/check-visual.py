"""Fixed-fixture visual oracle. Source/clip frames are saved unmodified.

Requires existing ffmpeg, Python OpenCV and numpy. No model or cloud calls.
The 0.90 correlation threshold is checked against source positive/negative controls;
this recognises these static fixture objects, not arbitrary production footage.
"""
import argparse
import json
from pathlib import Path
import subprocess

import cv2

parser = argparse.ArgumentParser()
parser.add_argument('--case', required=True)
parser.add_argument('--source', required=True)
parser.add_argument('--clip', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()
out = Path(args.output)
out.mkdir(parents=True, exist_ok=True)

reference_sec = 97.5 if args.case == 'LF-01' else 10
negative_sec = 7.5 if args.case == 'LF-01' else 0.5
regions = [('yellow-robot-head', (575, 170, 130, 115))] if args.case == 'LF-01' else [('potted-cactus', (465, 375, 110, 175))]
if args.case == 'LF-03':
    regions.append(('blue-shirt-boy', (820, 355, 110, 200)))

def source_frame(seconds, name):
    destination = out / name
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(seconds), '-i', args.source,
                    '-frames:v', '1', str(destination)], check=True, timeout=45)
    return cv2.imread(str(destination))

reference = source_frame(reference_sec, 'source-positive.png')
negative = source_frame(negative_sec, 'source-negative.png')
assert reference is not None and negative is not None
templates = {name: reference[y:y+h, x:x+w] for name, (x, y, w, h) in regions}

def score(frame, template):
    return float(cv2.minMaxLoc(cv2.matchTemplate(frame, template, cv2.TM_CCOEFF_NORMED))[1])

threshold = 0.90
controls = {name: {'positive': score(reference, template), 'negative': score(negative, template)}
            for name, template in templates.items()}
assert all(c['positive'] >= threshold and c['negative'] < threshold for c in controls.values()), 'Fixture visual controls do not separate; manual review required'

capture = cv2.VideoCapture(args.clip)
assert capture.isOpened(), 'Cannot decode returned clip'
fps = capture.get(cv2.CAP_PROP_FPS)
frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
width, height = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH)), int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
assert (width, height) == (1280, 720), 'Unexpected clip geometry; manual content review required'
stride = max(1, int(round(fps / 4)))
maximum = {name: {'score': -1, 'frame': None, 'sec': None} for name in templates}
sampled = 0
index = 0
best_frames = {}
while True:
    ok, frame = capture.read()
    if not ok:
        break
    if index % stride == 0:
        sampled += 1
        for name, template in templates.items():
            current = score(frame, template)
            if current > maximum[name]['score']:
                maximum[name] = {'score': current, 'frame': index, 'sec': index / fps}
                best_frames[name] = frame.copy()
        if sampled <= 3:
            cv2.imwrite(str(out / f'clip-sample-{sampled}.png'), frame)
    index += 1
capture.release()
assert sampled > 0
for name, frame in best_frames.items():
    cv2.imwrite(str(out / f'clip-best-{name}.png'), frame)
result = {'caseId': args.case, 'threshold': threshold, 'method': 'fixed fixture RGB template correlation, sampled at 4 fps',
          'referenceSec': reference_sec, 'negativeSec': negative_sec, 'controls': controls,
          'width': width, 'height': height, 'fps': fps, 'frameCount': frames, 'sampledFrames': sampled,
          'objects': maximum, 'matched': all(m['score'] >= threshold for m in maximum.values())}
(out / 'visual-check.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps(result))
