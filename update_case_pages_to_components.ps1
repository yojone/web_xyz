# PowerShell script to update case pages to use components.js
$caseFiles = @(
    "case-1.html",
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
        
        # 替换导航栏HTML
        $oldNav = "<div class="nav-bar nav-bar-scalable">
    <div class="logo">智屿·全屋智能</div>
    <div class="nav-links">
      <a href="index.html">首页</a>
      <a href="cases.html" class="active">方案与案例</a>
      <a href="demo.html">虚拟演示</a>
    </div>
  </div>"
        $newNav = "<!-- 导航栏占位符 -->
  <div data-component="navbar"></div>"
        
        $content = $content -replace [regex]::Escape($oldNav), $newNav
        
        # 移除旧的导航栏JavaScript代码
        $oldNavScript = "// 导航栏自动缩放功能
    const navBar = document.querySelector('.nav-bar-scalable');
    if (navBar) {
      let lastScrollTop = 0;
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
          navBar.classList.add('scrolled');
        } else {
          navBar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
      });
    }
    
    // 添加返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });"
        
        $content = $content -replace [regex]::Escape($oldNavScript), ""
        
        # 添加components.js引用
        if ($content -notmatch "<script src="components.js"></script>") {
            $content = $content -replace "</head>", "  <!-- 引入公共组件 -->
  <script src="components.js"></script>
</head>"
        }
        
        # 移除导航栏相关的CSS
        $oldNavCSS = "    .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 2rem 0; transition: all 0.3s ease; }
    .nav-bar-scalable.scrolled {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 0.5rem 2.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    .nav-bar-scalable.scrolled .logo {
      font-size: 1.3rem;
    }
    .nav-bar-scalable.scrolled .nav-links a {
      margin-left: 1.2rem;
      font-size: 0.85rem;
    }
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #1e4a7a;
      color: white;
      border: none;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 999;
      transition: all 0.3s ease;
    }
    .back-to-top:hover {
      background: #235f97;
      transform: translateY(-5px);
    }
    .back-to-top i {
      font-size: 1.2rem;
    }"
        
        $content = $content -replace [regex]::Escape($oldNavCSS), ""
        
        Set-Content $file $content
        Write-Host "Updated $file"
    } else {
        Write-Host "File $file not found"
    }
}

Write-Host "All done!"