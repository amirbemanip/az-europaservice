
$content = Get-Content d:\az-europaservice.de\site\codes\az-europa-next\src\locales\ar.json -Encoding UTF8
for ($i=0; $i -lt $content.Count; $i++) {
    $line = $content[$i].Trim()
    if ($line -ne "" -and $line -notmatch '[",\[\]\{\}]$') {
        Write-Host "Suspect line at $($i+1): $line"
    }
}
