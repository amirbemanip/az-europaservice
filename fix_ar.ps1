
$filePath = "d:\az-europaservice.de\site\codes\az-europa-next\src\locales\ar.json"
$content = Get-Content $filePath -Encoding UTF8
$newContent = @()
foreach ($line in $content) {
    $trimmed = $line.Trim()
    # Skip lines that are just a comma or just a quote-comma (corruption)
    if ($trimmed -eq '",' -or $trimmed -eq ',') { continue }
    
    # Remove control characters except tab
    # In PowerShell, we can use a regex with unicode ranges or just a loop
    $cleanLine = ""
    foreach ($char in $line.ToCharArray()) {
        $val = [int]$char
        if (($val -ge 32) -or ($val -eq 9)) {
            $cleanLine += $char
        }
    }
    
    if ($cleanLine -match '^      ".+      "') {
        $parts = $cleanLine -split '      "'
        $newContent += ($parts[0] + '",')
        $newContent += ('      "' + $parts[1])
    } else {
        $newContent += $cleanLine
    }
}
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($filePath, $newContent, $Utf8NoBomEncoding)
