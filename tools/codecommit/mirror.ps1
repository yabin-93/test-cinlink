param(
  [string]$Branch = "dev",
  [string]$Repo = "cinlink-studio-web",
  [string]$Target = "E:\proj\cinlink-annotation-wt",
  [string[]]$Skip = @("tests", "docs", "vendor", "cloudfront", "scripts", ".github", ".workbuddy")
)

$ErrorActionPreference = "Continue"
$region = "us-east-1"
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Invoke-AwsJson([string[]]$AwsArgs) {
  $out = & aws @AwsArgs
  if ($LASTEXITCODE -ne 0) { throw "aws failed: $($AwsArgs -join ' ') => $out" }
  return ($out | Out-String | ConvertFrom-Json)
}

function Receive-Folder([string]$Path, [string]$Dest) {
  $args = @("codecommit", "get-folder", "--repository-name", $Repo, "--commit-specifier", $Branch, "--region", $region, "--folder-path=$Path")
  $listing = Invoke-AwsJson $args
  foreach ($file in @($listing.files)) {
    if (-not $file) { continue }
    $destPath = Join-Path $Dest ($file.absolutePath -replace "/", "\")
    $destDir = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force $destDir | Out-Null }
    $fileArgs = @("codecommit", "get-file", "--repository-name", $Repo, "--commit-specifier", $Branch, "--file-path", $file.absolutePath, "--region", $region)
    $payload = Invoke-AwsJson $fileArgs
    [System.IO.File]::WriteAllBytes($destPath, [Convert]::FromBase64String($payload.fileContent))
    Write-Host "  file: $($file.absolutePath)"
  }
  foreach ($folder in @($listing.subFolders)) {
    if (-not $folder) { continue }
    $name = $folder.absolutePath
    if ($Path -eq "" -and ($Skip -contains $name)) { Write-Host "  skip: $name"; continue }
    Receive-Folder $name $Dest
  }
}

if (-not (Test-Path $Target)) { New-Item -ItemType Directory -Force $Target | Out-Null }
$head = Invoke-AwsJson @("codecommit", "get-branch", "--repository-name", $Repo, "--branch-name", $Branch, "--region", $region)
Write-Host "branch=$Branch commit=$($head.branch.commitId) target=$Target"
Receive-Folder "" $Target
Write-Host "done"
