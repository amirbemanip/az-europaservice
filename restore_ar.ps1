
$filePath = "d:\az-europaservice.de\site\codes\az-europa-next\src\locales\ar.json"
$fixPath = "d:\az-europaservice.de\site\codes\az-europa-next\ar_fix.txt"
$content = Get-Content $filePath -Encoding UTF8
$fixLines = Get-Content $fixPath -Encoding UTF8
$newContent = @()
$inserted = $false

foreach ($line in $content) {
    if ($line -match "Synergy" -and -not $inserted) {
        $newContent += $line
        $newContent += $fixLines[0]
        $newContent += $fixLines[1]
        $inserted = $true
    } elseif ($line -match 'O1U,U% O3O"USU,') {
        # Skip corrupted line
        continue
    } else {
        $newContent += $line
    }
}

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($filePath, $newContent, $Utf8NoBomEncoding)
Write-Host "Restored Arabic career paragraphs from file"
