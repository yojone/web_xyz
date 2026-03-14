// components.js - 所有页面的公共组件

// ==================== 滚动位置管理器 ====================
// 用于移动端应用中保存和恢复页面滚动位置
(function() {
  'use strict';

  // 配置项
  const CONFIG = {
    storageKey: 'page_scroll_positions',
    throttleDelay: 200, // 滚动事件节流延迟（毫秒）
    restoreDelay: 100,  // 页面加载后恢复延迟（毫秒）
    maxEntries: 50      // 最大保存的页面条目数
  };

  // 获取当前页面唯一标识
  function getPageKey() {
    return window.location.pathname + window.location.search;
  }

  // 从 sessionStorage 读取滚动位置数据
  function getScrollData() {
    try {
      const data = sessionStorage.getItem(CONFIG.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  // 保存滚动位置数据到 sessionStorage
  function saveScrollData(data) {
    try {
      // 限制条目数量，防止数据过大
      const entries = Object.entries(data);
      if (entries.length > CONFIG.maxEntries) {
        // 删除最旧的条目
        const sortedEntries = entries.sort((a, b) => (a[1].timestamp || 0) - (b[1].timestamp || 0));
        const trimmedData = Object.fromEntries(sortedEntries.slice(-CONFIG.maxEntries));
        sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(trimmedData));
      } else {
        sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
      }
    } catch (e) {
      // 忽略存储错误
    }
  }

  // 保存当前页面滚动位置
  function saveScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // 只保存非零的滚动位置
    if (scrollTop > 0) {
      const data = getScrollData();
      data[getPageKey()] = {
        position: scrollTop,
        timestamp: Date.now()
      };
      saveScrollData(data);
    }
  }

  // 恢复页面滚动位置
  function restoreScrollPosition() {
    const data = getScrollData();
    const pageKey = getPageKey();
    const savedData = data[pageKey];

    if (savedData && savedData.position > 0) {
      // 延迟恢复，确保页面完全渲染
      setTimeout(() => {
        // 检查页面高度是否足够滚动到目标位置
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const targetPosition = Math.min(savedData.position, maxScroll);
        
        if (targetPosition > 0) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto' // 使用 'auto' 避免动画，立即定位
          });
        }
        
        // 恢复后删除该记录，避免重复恢复
        delete data[pageKey];
        saveScrollData(data);
      }, CONFIG.restoreDelay);
    }
  }

  // 节流函数
  function throttle(func, delay) {
    let timeoutId = null;
    let lastExecTime = 0;
    
    return function(...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // 为所有内部链接添加点击事件，保存滚动位置
  function setupLinkHandlers() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // 只处理内部链接
      if (href.startsWith('#')) return;
      if (href.startsWith('javascript:')) return;
      if (link.target === '_blank') return;
      
      // 检查是否是外部链接
      try {
        const linkUrl = new URL(href, window.location.href);
        if (linkUrl.origin !== window.location.origin) return;
      } catch (e) {
        // URL 解析失败，可能是相对路径，继续处理
      }
      
      // 保存当前滚动位置
      saveScrollPosition();
    });
  }

  // 初始化滚动位置管理器
  function init() {
    // 页面加载完成后恢复滚动位置
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', restoreScrollPosition);
    } else {
      restoreScrollPosition();
    }
    
    // 监听滚动事件，使用节流
    const throttledSave = throttle(saveScrollPosition, CONFIG.throttleDelay);
    window.addEventListener('scroll', throttledSave, { passive: true });
    
    // 页面卸载前保存滚动位置
    window.addEventListener('beforeunload', saveScrollPosition);
    window.addEventListener('pagehide', saveScrollPosition);
    
    // 为链接添加点击处理
    setupLinkHandlers();
    
    // 监听 visibilitychange，处理切换标签页的情况
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition();
      }
    });
  }

  // 公共 API
  window.ScrollPositionManager = {
    save: saveScrollPosition,
    restore: restoreScrollPosition,
    clear: function() {
      sessionStorage.removeItem(CONFIG.storageKey);
    },
    getCurrentPosition: function() {
      return window.pageYOffset || document.documentElement.scrollTop || 0;
    }
  };

  // 自动初始化
  init();

})();

// ==================== 公共组件 ====================

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