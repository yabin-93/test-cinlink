#requires -Version 7.2
param([Parameter(Mandatory)][string]$OutputDirectory,[Parameter(Mandatory)][string]$F20Source)
$ErrorActionPreference='Stop'
$qaSource=(Resolve-Path -LiteralPath $F20Source).Path
$qaOut=[IO.Path]::GetFullPath($OutputDirectory)
$null=New-Item -ItemType Directory -Path $qaOut -Force
$qaMedia=Join-Path $qaOut 'media';$null=New-Item -ItemType Directory -Path $qaMedia -Force
if(Test-Path -LiteralPath (Join-Path $qaOut 'media.json')){throw 'Existing fixture manifest; verify instead of replacing'}
Copy-Item -LiteralPath $qaSource -Destination (Join-Path $qaMedia 'F20-English-source-with-BGM.mp4')
Add-Type -AssemblyName System.Speech
$qaSynth=New-Object System.Speech.Synthesis.SpeechSynthesizer
try{$qaSynth.SelectVoice('Microsoft Huihui Desktop');$qaSynth.SetOutputToWaveFile((Join-Path $qaOut 'D-speech-source.wav'));$qaSynth.Speak('独立音频D。这是单独导入的测试声音。它不属于原声、配音或背景音乐。');$qaSynth.SetOutputToNull()}finally{$qaSynth.Dispose()}
& ffmpeg -v error -nostdin -i (Join-Path $qaOut 'D-speech-source.wav') -af apad -t 12 -ar 48000 -ac 1 -c:a pcm_s16le (Join-Path $qaMedia 'D-independent-audio-12s.wav')
if($LASTEXITCODE -ne 0){throw 'D encode failed'}
$qaItems=@{}
foreach($qaPair in @(@('F20','F20-English-source-with-BGM.mp4'),@('D','D-independent-audio-12s.wav'))){
 $qaPath=Join-Path $qaMedia $qaPair[1]
 $qaFacts=(& ffprobe -v error -show_streams -show_format -of json $qaPath | ConvertFrom-Json -AsHashtable)
 if($LASTEXITCODE -ne 0){throw 'ffprobe failed'}
 $qaItems[$qaPair[0]]=@{path=$qaPath;name=$qaPair[1];sha256=(Get-FileHash -LiteralPath $qaPath -Algorithm SHA256).Hash.ToLowerInvariant();probe=$qaFacts}
}
if([Math]::Abs([double]$qaItems.D.probe.format.duration-12)-gt .001){throw 'D duration is not 12 seconds'}
if([Math]::Abs([double]$qaItems.F20.probe.format.duration-20)-gt .034){throw 'F20 duration is not 20 seconds'}
[IO.File]::WriteAllText((Join-Path $qaOut 'media.json'),($qaItems|ConvertTo-Json -Depth 30),[Text.UTF8Encoding]::new($false))
Write-Output 'F20/D fixtures ready; synthetic D uses Microsoft Huihui Desktop. No product call.'
