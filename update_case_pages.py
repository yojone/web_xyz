import os

def update_case_page(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 更新导航栏CSS
    old_css = '.container { max-width: 1300px; margin: 0 auto; padding: 2rem 2.5rem; }\n    .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 2rem 0; }'
    new_css = '.container { max-width: 1300px; margin: 0 auto; padding: 2rem 2.5rem; }\n    .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 2rem 0; transition: all 0.3s ease; }\n    .nav-bar-scalable.scrolled {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      background: rgba(255, 255, 255, 0.95);\n      backdrop-filter: blur(10px);\n      padding: 0.5rem 2.5rem;\n      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n      z-index: 1000;\n    }\n    .nav-bar-scalable.scrolled .logo {\n      font-size: 1.4rem;\n    }\n    .nav-bar-scalable.scrolled .nav-links a {\n      margin-left: 1.5rem;\n      font-size: 0.9rem;\n    }\n    .back-to-top {\n      position: fixed;\n      bottom: 30px;\n      right: 30px;\n      width: 50px;\n      height: 50px;\n      border-radius: 50%;\n      background: #1e4a7a;\n      color: white;\n      border: none;\n      cursor: pointer;\n      display: none;\n      align-items: center;\n      justify-content: center;\n      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n      z-index: 999;\n      transition: all 0.3s ease;\n    }\n    .back-to-top:hover {\n      background: #235f97;\n      transform: translateY(-5px);\n    }\n    .back-to-top i {\n      font-size: 1.2rem;\n    }'
    content = content.replace(old_css, new_css)
    
    # 2. 更新移动端CSS
    old_mobile_css = '@media (max-width: 768px) { \n      .container { padding: 1rem; } \n      .nav-bar { flex-direction: column; gap: 1rem; } \n      .nav-links a { margin-left: 1rem; }\n      .breadcrumb { font-size: 0.85rem; flex-wrap: wrap; }\n      .gallery-grid { grid-template-columns: repeat(2, 1fr); }\n    }'
    new_mobile_css = '@media (max-width: 768px) { \n      .container { padding: 1rem; } \n      .nav-bar { flex-direction: column; gap: 1rem; } \n      .nav-links a { margin-left: 1rem; }\n      .nav-bar-scalable.scrolled {\n        padding: 0.5rem 1rem;\n      }\n      .nav-bar-scalable.scrolled .nav-links a {\n        margin-left: 0.8rem;\n        font-size: 0.8rem;\n      }\n      .back-to-top {\n        bottom: 20px;\n        right: 20px;\n        width: 40px;\n        height: 40px;\n      }\n      .breadcrumb { font-size: 0.85rem; flex-wrap: wrap; }\n      .gallery-grid { grid-template-columns: repeat(2, 1fr); }\n    }'
    content = content.replace(old_mobile_css, new_mobile_css)
    
    # 3. 更新导航栏HTML - 移除"关于我们"并添加nav-bar-scalable类
    old_nav_html = '  <div class="nav-bar">\n    <div class="logo">智屿·全屋智能</div>\n    <div class="nav-links">\n      <a href="index.html">首页</a>\n      <a href="cases.html" class="active">方案与案例</a>\n      <a href="demo.html">虚拟演示</a>\n      <a href="about.html">关于我们</a>\n    </div>\n  </div>'
    new_nav_html = '  <div class="nav-bar nav-bar-scalable">\n    <div class="logo">智屿·全屋智能</div>\n    <div class="nav-links">\n      <a href="index.html">首页</a>\n      <a href="cases.html" class="active">方案与案例</a>\n      <a href="demo.html">虚拟演示</a>\n    </div>\n  </div>'
    content = content.replace(old_nav_html, new_nav_html)
    
    # 4. 添加JavaScript代码
    old_script_end = '<!-- 咨询弹窗脚本 -->\n<script src="consult-modal.js"></script>\n</body>\n</html>'
    new_script_end = '<!-- 咨询弹窗脚本 -->\n<script src="consult-modal.js"></script>\n<script>\n  document.addEventListener(\'DOMContentLoaded\', function() {\n    // 导航栏自动缩放功能\n    const navBar = document.querySelector(\'.nav-bar-scalable\');\n    if (navBar) {\n      let lastScrollTop = 0;\n      window.addEventListener(\'scroll\', function() {\n        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n        \n        if (scrollTop > 50) {\n          navBar.classList.add(\'scrolled\');\n        } else {\n          navBar.classList.remove(\'scrolled\');\n        }\n        \n        lastScrollTop = scrollTop;\n      });\n    }\n    \n    // 添加返回顶部按钮\n    const backToTopBtn = document.createElement(\'button\');\n    backToTopBtn.className = \'back-to-top\';\n    backToTopBtn.innerHTML = \'<i class="fas fa-arrow-up"></i>\';\n    backToTopBtn.style.display = \'none\';\n    document.body.appendChild(backToTopBtn);\n    \n    // 显示/隐藏返回顶部按钮\n    window.addEventListener(\'scroll\', function() {\n      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n      if (scrollTop > 300) {\n        backToTopBtn.style.display = \'flex\';\n      } else {\n        backToTopBtn.style.display = \'none\';\n      }\n    });\n    \n    // 点击返回顶部\n    backToTopBtn.addEventListener(\'click\', function() {\n      window.scrollTo({\n        top: 0,\n        behavior: \'smooth\'\n      });\n    });\n  });\n</script>\n</body>\n</html>'
    content = content.replace(old_script_end, new_script_end)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated: {file_path}')

# 更新case-2到case-8
for i in range(2, 9):
    file_path = f'd:\\N1_Sync\\html\\web_xyz\\case-{i}.html'
    if os.path.exists(file_path):
        update_case_page(file_path)
    else:
        print(f'File not found: {file_path}')

print('All case pages updated successfully!')
