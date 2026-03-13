# PowerShell script to update case pages

$css1 = '.container { max-width: 1300px; margin: 0 auto; padding: 2rem 2.5rem; }
    .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 2rem 0; }'

$css1_new = '.container { max-width: 1300px; margin: 0 auto; padding: 2rem 2.5rem; }
    .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 2rem 0; transition: all 0.3s ease; }
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
      font-size: 1.4rem;
    }
    .nav-bar-scalable.scrolled .nav-links a {
      margin-left: 1.5rem;
      font-size: 0.9rem;
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
    }'

$mobile_css = '@media (max-width: 768px) { 
      .container { padding: 1rem; } 
      .nav-bar { flex-direction: column; gap: 1rem; } 
      .nav-links a { margin-left: 1rem; }
      .breadcrumb { font-size: 0.85rem; flex-wrap: wrap; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    }'

$mobile_css_new = '@media (max-width: 768px) { 
      .container { padding: 1rem; } 
      .nav-bar { flex-direction: column; gap: 1rem; } 
      .nav-links a { margin-left: 1rem; }
      .nav-bar-scalable.scrolled {
        padding: 0.5rem 1rem;
      }
      .nav-bar-scalable.scrolled .nav-links a {
        margin-left: 0.8rem;
        font-size: 0.8rem;
      }
      .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
      }
      .breadcrumb { font-size: 0.85rem; flex-wrap: wrap; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    }'

$nav_html = '  <div class="nav-bar">
    <div class="logo">智屿·全屋智能</div>
    <div class="nav-links">
      <a href="index.html">首页</a>
      <a href="cases.html" class="active">方案与案例</a>
      <a href="demo.html">虚拟演示</a>
      <a href="about.html">关于我们</a>
    </div>
  </div>'

$nav_html_new = '  <div class="nav-bar nav-bar-scalable">
    <div class="logo">智屿·全屋智能</div>
    <div class="nav-links">
      <a href="index.html">首页</a>
      <a href="cases.html" class="active">方案与案例</a>
      <a href="demo.html">虚拟演示</a>
    </div>
  </div>'

$script_end = '<!-- 咨询弹窗脚本 -->
<script src="consult-modal.js"></script>
</body>
</html>'

$script_end_new = '<!-- 咨询弹窗脚本 -->
<script src="consult-modal.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    // 导航栏自动缩放功能
    const navBar = document.querySelector(".nav-bar-scalable");
    if (navBar) {
      let lastScrollTop = 0;
      window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
          navBar.classList.add("scrolled");
        } else {
          navBar.classList.remove("scrolled");
        }
        
        lastScrollTop = scrollTop;
      });
    }
    
    // 添加返回顶部按钮
    const backToTopBtn = document.createElement("button");
    backToTopBtn.className = "back-to-top";
    backToTopBtn.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
    backToTopBtn.style.display = "none";
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏返回顶部按钮
    window.addEventListener("scroll", function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
</script>
</body>
</html>'

# Update case-3 to case-8
for ($i = 3; $i -le 8; $i++) {
    $file = "case-$i.html"
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        $content = Get-Content -Path $file -Raw -Encoding UTF8
        $content = $content.Replace($css1, $css1_new)
        $content = $content.Replace($mobile_css, $mobile_css_new)
        $content = $content.Replace($nav_html, $nav_html_new)
        $content = $content.Replace($script_end, $script_end_new)
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated $file"
    } else {
        Write-Host "$file not found"
    }
}

Write-Host "All done!"
