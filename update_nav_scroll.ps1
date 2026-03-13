# 批量更新case页面的导航栏缩放样式
$caseFiles = @(
    "case-2.html",
    "case-3.html",
    "case-4.html",
    "case-5.html",
    "case-6.html",
    "case-7.html",
    "case-8.html"
)

foreach ($file in $caseFiles) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        $content = Get-Content $file -Raw
        
        # 替换导航栏缩放样式
        $oldStyle = ".nav-bar-scalable.scrolled .logo {\n      font-size: 1.4rem;\n    }\n    .nav-bar-scalable.scrolled .nav-links a {\n      margin-left: 1.5rem;\n      font-size: 0.9rem;\n    }"
        $newStyle = ".nav-bar-scalable.scrolled .logo {\n      font-size: 1.3rem;\n    }\n    .nav-bar-scalable.scrolled .nav-links a {\n      margin-left: 1.2rem;\n      font-size: 0.85rem;\n    }"
        
        $content = $content -replace [regex]::Escape($oldStyle), $newStyle
        
        Set-Content $file $content
        Write-Host "Updated $file"
    } else {
        Write-Host "File $file not found"
    }
}

Write-Host "All done!"