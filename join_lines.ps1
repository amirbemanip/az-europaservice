
$filePath = "d:\az-europaservice.de\site\codes\az-europa-next\src\locales\ar.json"
$content = Get-Content $filePath -Encoding UTF8
$newContent = @()
$buffer = ""

foreach ($line in $content) {
    if ($buffer -eq "") {
        $buffer = $line
    } else {
        # Join with a space and remove the raw newline
        $buffer += " " + $line.Trim()
    }
    
    # If the line ends with a valid JSON structural character, flush the buffer
    if ($line.Trim() -match '[",\[\]\{\}]$') {
        $newContent += $buffer
        $buffer = ""
    }
}

# If anything remains in buffer, add it (shouldn't happen in valid JSON-like structure)
if ($buffer -ne "") { $newContent += $buffer }

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($filePath, $newContent, $Utf8NoBomEncoding)
Write-Host "Joined split lines in ar.json"
