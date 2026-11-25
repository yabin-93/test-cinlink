#requires -Version 7.2
param([Parameter(Mandatory)][string]$BatchPath,[Parameter(Mandatory)][string]$DefectNumber)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'common.ps1')
$config=Read-YunxiaoConfig;$batch=(Resolve-Path -LiteralPath $BatchPath).Path
$inventory=Get-Content -LiteralPath (Join-Path $batch 'inventory.json') -Raw|ConvertFrom-Json -AsHashtable
$items=@($inventory.defects|Where-Object serialNumber -ceq $DefectNumber);if($items.Count -ne 1){throw 'Not a unique frozen-batch defect'};$item=$items[0]
$folder=Join-Path $batch $DefectNumber;$oldPath=Join-Path $folder 'result.json';$newPath=Join-Path $folder 'result-corrected.json'
$owned=Get-Content -LiteralPath (Join-Path $folder 'status-update/result.json') -Raw|ConvertFrom-Json -AsHashtable
$oldHash=(Get-FileHash -LiteralPath $oldPath -Algorithm SHA256).Hash.ToLowerInvariant();if(-not $owned.verified -or $owned.evidenceSha256 -cne $oldHash -or $owned.workitemId -cne $item.id){throw 'Previous status write is not verified as this batch owned'}
$e=Get-Content -LiteralPath $newPath -Raw|ConvertFrom-Json -AsHashtable
if($e.id -cne $DefectNumber -or $e.result -notin @('Passed','Failed') -or -not $e.verifiedBusiness -or $e.environment -cne 'production' -or $e.browser -notlike 'ego-browser*' -or -not $e.workspaceId -or -not $e.editorId -or -not $e.conversationId -or -not $e.actual -or -not $e.correctionReason -or $e.steps.Count -lt 1){throw 'Corrected business evidence is incomplete'}
foreach($s in $e.screenshots){if(-not(Test-Path -LiteralPath (Join-Path $folder $s))){throw 'Corrected screenshot missing'}}
if($e.result -eq 'Failed' -and @($e.screenshots|Where-Object {$_ -like 'failed*.png'}).Count -lt 1){throw 'Corrected failure needs real failed screenshot'}
$hash=(Get-FileHash -LiteralPath $newPath -Algorithm SHA256).Hash.ToLowerInvariant();$output=Join-Path $folder 'status-correction';$null=New-Item -ItemType Directory -Path $output -Force;$checkpoint=Join-Path $output 'intent.json';$token=Get-YunxiaoAccessToken -NoPrompt
try{
 $workflow=Invoke-YunxiaoRequest GET "$($config._base)/projects/$($config.projectId)/workitemTypes/$($config.workitemTypeId)/workflows" $null $token $config $output
 $wanted=if($e.result -eq 'Passed'){'✅AI通过'}else{'❌AI未通过'};$targets=@($workflow.statuses|Where-Object name -ceq $wanted);if($targets.Count -ne 1){throw 'No unique target status'};$target=$targets[0]
 $uri="$($config._base)/workitems/$($item.id)";$before=Invoke-YunxiaoRequest GET $uri $null $token $config $output
 if($before.serialNumber -cne $DefectNumber -or $before.space.id -ne $config.projectId -or $before.workitemType.id -ne $config.workitemTypeId -or $before.creator.id -cne '64706f1835bcf6a00f0ddfc3'){throw 'Defect identity changed'}
 if(Test-Path -LiteralPath $checkpoint){$intent=Get-Content -LiteralPath $checkpoint -Raw|ConvertFrom-Json -AsHashtable;if($intent.evidenceSha256 -cne $hash -or $intent.targetId -cne $target.id -or $intent.previousEvidenceSha256 -cne $oldHash -or $before.status.id -cne $target.id){throw 'Uncertain previous correction; never replay'};$baseline=Get-Content -LiteralPath (Join-Path $output 'before.json') -Raw|ConvertFrom-Json -AsHashtable;$changed=$intent.changed}
 else{
  if($before.status.id -notin @($owned.after.id,$target.id)){throw 'Live status is neither our previous status nor corrected target; preserve external change'}
  $baseline=$before;$changed=$before.status.id -cne $target.id;Write-YunxiaoJson (Join-Path $output 'before.json') $before
  Write-YunxiaoJson $checkpoint @{workitemId=$item.id;serialNumber=$DefectNumber;onlyField='status';previousEvidenceSha256=$oldHash;evidenceSha256=$hash;targetId=$target.id;targetName=$target.name;changed=$changed;attempted=$true}
  if($changed){$null=Invoke-YunxiaoRequest PUT $uri @{status=$target.id} $token $config $output}
 }
 $after=Invoke-YunxiaoRequest GET $uri $null $token $config $output;if($after.status.id -cne $target.id){throw 'Corrected status readback mismatch'}
 foreach($key in @('subject','description','formatType')){if($baseline[$key] -cne $after[$key]){throw 'A non-status field changed during correction'}}
 if($baseline.assignedTo.id -ne $after.assignedTo.id -or $baseline.sprint.id -ne $after.sprint.id -or $baseline.creator.id -ne $after.creator.id -or ((@($baseline.labels.id)|Sort-Object)-join '|') -cne ((@($after.labels.id)|Sort-Object)-join '|')){throw 'Other key fields changed'}
 Write-YunxiaoJson (Join-Path $output 'after.json') $after
 $receipt=@{serialNumber=$DefectNumber;workitemId=$item.id;verified=$true;changed=$changed;before=$baseline.status;after=$after.status;onlyField='status';otherCheckedFieldsUnchanged=$true;previousEvidenceSha256=$oldHash;evidenceSha256=$hash;verifiedAt=(Get-Date).ToString('o');url=$item.url;correctionReason=$e.correctionReason};Write-YunxiaoJson (Join-Path $output 'result.json') $receipt;$receipt|ConvertTo-Json -Depth 8
}finally{$token=$null}
