// components.js - 所有页面的公共组件

// 页脚版权信息
const FOOTER_TEXT = "2026 智屿 · 全屋智能体验";

// 网站标题
const SITE_TITLE = "智屿·全屋智能";

// 导航栏链接配置
const NAV_LINKS = [
  { name: "首页", url: "index.html" },
  { name: "探索方案", url: "solutions.html" },
  { name: "虚拟演示", url: "demo.html" },
  { name: "实景案例", url: "cases.html" },
  { name: "关于我们", url: "about.html" }
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
    <div class="nav-bar">
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
});