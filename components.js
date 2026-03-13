// components.js - 所有页面的公共组件

// 页脚版权信息
const FOOTER_TEXT = "2026 智屿 · 全屋智能体验";

// 网站标题
const SITE_TITLE = "智屿·全屋智能";

// 导航栏链接配置
const NAV_LINKS = [
  { name: "首页", url: "index.html" },
  { name: "方案与案例", url: "cases.html" },
  { name: "虚拟演示", url: "demo.html" }
];

// 获取当前页面文件名
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'index.html';
}

// 生成导航栏HTML
function generateNavBar() {
  const currentPage = getCurrentPage();
  let linksHtml = '';
  
  NAV_LINKS.forEach(link => {
    const isActive = (currentPage === link.url) || 
                     (currentPage === '' && link.url === 'index.html') ||
                     (currentPage === '/' && link.url === 'index.html');
    linksHtml += `<a href="${link.url}" ${isActive ? 'class="active"' : ''}>${link.name}</a>`;
  });
  
  return `
    <div class="nav-bar nav-bar-scalable">
      <div class="logo">${SITE_TITLE}</div>
      <div class="nav-links">
        ${linksHtml}
      </div>
    </div>
  `;
}

// 生成页脚HTML
function generateFooter() {
  return `
    <div class="footer-minimal">
      <span><i class="far fa-copyright"></i> ${FOOTER_TEXT}</span>
      <div class="footer-links">
        <span><i class="fa-regular fa-message"></i> 咨询顾问</span>
        <span><i class="fa-regular fa-file-lines"></i> 方案手册</span>
        <span><i class="fa-regular fa-images"></i> 实景相册</span>
      </div>
    </div>
  `;
}

// 当DOM加载完成后，替换占位符
document.addEventListener('DOMContentLoaded', function() {
  // 替换导航栏
  const navPlaceholders = document.querySelectorAll('[data-component="navbar"]');
  navPlaceholders.forEach(placeholder => {
    placeholder.outerHTML = generateNavBar();
  });
  
  // 替换页脚
  const footerPlaceholders = document.querySelectorAll('[data-component="footer"]');
  footerPlaceholders.forEach(placeholder => {
    placeholder.outerHTML = generateFooter();
  });
  
  // 导航栏自动缩放功能 - 性能优化版
  const navBar = document.querySelector('.nav-bar-scalable');
  if (navBar) {
    let ticking = false;
    let lastScrollTop = 0;
    
    function updateNavBar() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        navBar.classList.add('scrolled');
      } else {
        navBar.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateNavBar);
        ticking = true;
      }
    }, { passive: true });
  }
  
  // 添加返回顶部按钮
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.style.display = 'none';
  document.body.appendChild(backToTopBtn);
  
  // 显示/隐藏返回顶部按钮 - 使用节流优化
  let backToTopTicking = false;
  function updateBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
    backToTopTicking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!backToTopTicking) {
      requestAnimationFrame(updateBackToTop);
      backToTopTicking = true;
    }
  }, { passive: true });
  
  // 点击返回顶部
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});