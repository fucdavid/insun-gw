param(
  [string]$Repo = "fucdavid/insun-gw"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI 'gh' is not installed. Install it and run 'gh auth login' before publishing issues."
}

$issueFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.md" |
  Where-Object { $_.Name -match "^\d{3}-" } |
  Sort-Object Name

foreach ($file in $issueFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $title = ($content -split "`r?`n" | Select-Object -First 1).TrimStart("#").Trim()
  $body = ($content -replace "(?s)^# .+?`r?`n`r?`n", "").Trim()

  Write-Host "Creating issue: $title"
  gh issue create --repo $Repo --title $title --body $body --label "ready-for-agent"
}
