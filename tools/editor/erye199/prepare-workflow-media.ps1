param([Parameter(Mandatory=$true)][string]$OutputDir)
Add-Type -AssemblyName System.Speech
$qaSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$qaSynth.SelectVoice('Microsoft Zira Desktop')
$qaSynth.Rate = 1
$qaParts = @{
  'um' = 'Um.'
  'uh' = 'Uh.'
  'chapter1' = 'Our first topic is the weekly project plan. We will review the customer feedback on Monday, prepare a short product demonstration on Tuesday, and share the final schedule with the team. Please keep the original notes so everyone can check the decisions.'
  'chapter2' = 'Our second topic is video editing. Add clear captions, keep the speaker easy to hear, and use quiet background music. Before exporting, check the beginning and the end of every clip. A simple timeline makes the message easier for the audience to follow.'
  'chapter3' = 'Our final topic is the review process. Compare the finished video with the source material, check the wording, and listen for missing or repeated speech. Save the project, open it again, and confirm that the picture, captions, and audio still match the approved version.'
}
try {
  foreach ($qaPart in $qaParts.GetEnumerator()) {
    $qaSynth.SetOutputToWaveFile((Join-Path $OutputDir ($qaPart.Key + '.wav')))
    $qaSynth.Speak($qaPart.Value)
    $qaSynth.SetOutputToNull()
  }
} finally { $qaSynth.Dispose() }
