$replacements = @{
    "â‚¹" = "₹"
    "â€“" = "–"
    "â€™" = "’"
    "â€œ" = "“"
    "â€ " = "”"
    "â€”" = "—"
}

$files = Get-ChildItem -Path "c:\Users\HP\OneDrive\Desktop\ukcorbett\*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content
    
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($file.Name)"
    }
}
