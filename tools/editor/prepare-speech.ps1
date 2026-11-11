param([Parameter(Mandatory=$true)][string]$OutDir)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
$speaker = New-Object -ComObject SAPI.SpVoice
$english = @($speaker.GetVoices() | Where-Object { $_.GetAttribute('Language') -match '409|809' })
if ($english.Count -eq 0) { throw '需要 Windows 英语离线语音，未生成虚构语音夹具' }
$speaker.Voice = $english[0]
$speaker.Rate = 1
$words = @('Intro', 'Remove', 'Keep', 'Welcome', 'Second caption')
for ($i=0; $i -lt $words.Count; $i++) {
  $stream = New-Object -ComObject SAPI.SpFileStream
  $stream.Open((Join-Path $OutDir "word-$i.wav"), 3, $false)
  $speaker.AudioOutputStream = $stream
  $null = $speaker.Speak($words[$i])
  $stream.Close()
}
$offsets = @(0,1000,2000,4000,10000)
$inputs = @('-hide_banner','-loglevel','error','-nostdin','-y','-filter_complex_threads','1')
for ($i=0; $i -lt 5; $i++) { $inputs += @('-i',(Join-Path $OutDir "word-$i.wav")) }
$filters = @()
for ($i=0; $i -lt 5; $i++) {
  $limit = if ($i -lt 3) { '0.98' } else { '1.98' }
  $filters += "[$($i):a]atrim=0:$limit,asetpts=PTS-STARTPTS,adelay=$($offsets[$i]):all=1[w$i]"
}
# The 20s source track carries only the first three words. The two caption
# lines are independent dubbing files, so speech is not played twice.
$filters = $filters[0..2]
$filters += '[w0][w1][w2]amix=inputs=3:normalize=0,apad=whole_dur=20[out]'
& ffmpeg @inputs -filter_complex ($filters -join ';') -map '[out]' -t 20 -ar 24000 -ac 1 (Join-Path $OutDir 'speech-20.wav')
if ($LASTEXITCODE -ne 0) { throw '语音夹具合成失败' }
& ffmpeg -hide_banner -loglevel error -y -f lavfi -i 'sine=frequency=180:duration=20' -af 'volume=0.025' -ar 24000 -ac 1 (Join-Path $OutDir 'bgm-20.wav')
if ($LASTEXITCODE -ne 0) { throw 'BGM夹具合成失败' }
foreach ($cue in @(@('3','welcome-2','2'), @('4','second-2','2'), @('0','intro-1','1'))) {
  & ffmpeg -hide_banner -loglevel error -nostdin -y -i (Join-Path $OutDir "word-$($cue[0]).wav") -af "apad=whole_dur=$($cue[2])" -t $cue[2] -ar 24000 -ac 1 (Join-Path $OutDir "$($cue[1]).wav")
  if ($LASTEXITCODE -ne 0) { throw 'Cue fixture failed' }
}
& ffmpeg -hide_banner -loglevel error -nostdin -y -filter_complex_threads 1 -i (Join-Path $OutDir 'word-1.wav') -i (Join-Path $OutDir 'word-2.wav') -filter_complex '[0:a]atrim=0:0.98,asetpts=PTS-STARTPTS[a];[1:a]atrim=0:0.98,asetpts=PTS-STARTPTS,adelay=1000:all=1[b];[a][b]amix=inputs=2:normalize=0,apad=whole_dur=2[out]' -map '[out]' -t 2 -ar 24000 -ac 1 (Join-Path $OutDir 'cross-2.wav')
if ($LASTEXITCODE -ne 0) { throw 'Cross-boundary cue fixture failed' }
Write-Output 'Prepared real source audio, four cue files and fixed BGM.'
