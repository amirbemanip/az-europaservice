
$filePath = "d:\az-europaservice.de\site\codes\az-europa-next\src\locales\ar.json"
$raw = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
# Remove all control characters 00-1F except \t (09), \n (0A), \r (0D)
$clean = [regex]::Replace($raw, "[\x00-\x08\x0B\x0C\x0E-\x1F]", "")
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($filePath, $clean, $Utf8NoBomEncoding)
Write-Host "Cleaned ar.json of all control characters"
