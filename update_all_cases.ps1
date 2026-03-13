# 批量更新所有case页面，统一使用components.js

$caseFiles = @("case-2.html", "case-3.html", "case-4.html", "case-5.html", "case-6.html", "case-7.html", "case-8.html")

foreach ($file in $caseFiles) {
    Write-Host "正在处理 $file ..."
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 1. 检查是否已引入components.js
    if ($content -notmatch 'components\.js') {
        # 在</head>前添加components.js引用
        $content = $content -replace '(<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.0\.0-beta3/css/all\.min\.css">)', "`$1`n  <!-- 引入公共组件 -->`n  <script src=`"components.js`"></script>"
        Write-Host "  - 已添加components.js引用"
    }
    
    # 2. 替换静态导航栏为动态占位符
    $navPattern = '<div class="nav-bar nav-bar-scalable">\s*<div class="logo">[^<]+</div>\s*<div class="nav-links">\s*<a href="index\.html"[^>]*>首页</a>\s*<a href="cases\.html"[^>]*>方案与案例</a>\s*<a href="demo\.html"[^>]*>虚拟演示</a>\s*</div>\s*</div>'
    $navReplacement = '<!-- 导航栏占位符 - 由components.js动态生成 -->`n  <div data-component="navbar"></div>'
    
    if ($content -match $navPattern) {
        $content = $content -replace $navPattern, $navReplacement
        Write-Host "  - 已替换静态导航栏为动态组件"
    }
    
    # 3. 移除独立的导航栏和返回顶部按钮JavaScript代码
    $jsPattern = '<script>\s*document\.addEventListener\([\'"]DOMContentLoaded[\'"], function\(\) \{\s*// 导航栏自动缩放功能[\s\S]*?// 点击返回顶部\s*backToTopBtn\.addEventListener\([\'"]click[\'"], function\(\) \{\s*window\.scrollTo\(\{\s*top: 0,\s*behavior: [\'"]smooth[\'"]\s*\}\);\s*\}\);\s*\}\);\s*</script>'
    
    if ($content -match $jsPattern) {
        $content = $content -replace $jsPattern, ""
        Write-Host "  - 已移除独立的JavaScript代码"
    }
    
    # 保存文件
    Set-Content $file $content -Encoding UTF8 -NoNewline
    Write-Host "  - 文件已保存" -ForegroundColor Green
    Write-Host ""
}

Write-Host "所有case页面更新完成！" -ForegroundColor Green