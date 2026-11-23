#!/usr/bin/env python3
"""Decode actual image files, audit pixels; never accept an assistant's success text."""
import sys,json,hashlib
from PIL import Image,ImageChops,ImageStat
mode=sys.argv[1];a=Image.open(sys.argv[2]).convert('RGBA');result={'size':list(a.size),'rgbaSHA256':hashlib.sha256(a.tobytes()).hexdigest()}
if mode=='compare':
 b=Image.open(sys.argv[3]).convert('RGBA');result['equal']=a.size==b.size and a.tobytes()==b.tobytes()
elif mode=='canvas':
 b=Image.open(sys.argv[3]).convert('RGBA');result['sameSize']=a.size==b.size
 bad=0;edge=0
 if a.size==b.size:
  for x,y in zip(a.get_flattened_data(),b.get_flattened_data()):
   if x==y:continue
   if x[3]==y[3] and 0<x[3]<255 and max(abs(x[i]-y[i]) for i in range(3))<=1:edge+=1
   else:bad+=1
 else:bad=1
 result.update(equal=bad==0,invalidPixels=bad,semiAlphaRoundingPixels=edge,policy='alpha and opaque pixels exact; only RGB max1 at equal semi-alpha accepted')
elif mode=='branch':
 b=Image.open(sys.argv[3]).convert('RGBA');result['sameSize']=a.size==b.size
 if a.size==b.size:
  box=ImageChops.difference(a.convert('RGB'),b.convert('RGB')).getbbox();result['changedBBox']=box
  result['onlyUpperLeft']=box is not None and box[0]>=0 and box[1]>=0 and box[2]<=a.width*.4 and box[3]<=a.height*.25
  result['hasWhiteTextPixels']=box is not None and sum(1 for p in a.crop(box).get_flattened_data() if p[:3]==(255,255,255))>20
elif mode=='background':
 target=(0,0,255) if sys.argv[3]=='blue' else (0,255,0)
 corners=[a.getpixel(p) for p in [(0,0),(a.width-1,0),(0,a.height-1),(a.width-1,a.height-1)]]
 result.update(corners=corners,exactTarget=all(p[:3]==target and p[3]==255 for p in corners))
else:
 result['alphaRange']=list(a.getchannel('A').getextrema())
print(json.dumps(result))
