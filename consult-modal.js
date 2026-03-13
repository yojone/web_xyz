// 咨询弹窗组件 - 所有页面共享

// 创建弹窗HTML
function createConsultModal() {
  // 检查是否已存在
  if (document.getElementById('consultModal')) return;

  // 构建图片路径
  const wechatQrUrl = `images/wechat.jpg`;

  const modalHtml = `
    <!-- 预约咨询弹窗 -->
    <div class="consult-modal" id="consultModal" onclick="closeConsultModal(event)">
      <div class="modal-content" style="position: relative;" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeConsultModal()">&times;</button>
        <div class="modal-header">
          <h3><i class="fas fa-headset" style="color: #1e4a7a;"></i> 预约免费咨询</h3>
          <p>选择您方便的咨询方式</p>
        </div>
        <div class="modal-options">
          <a class="modal-option" onclick="openWechatModal()">
            <i class="fab fa-weixin" style="color: #07C160;"></i>
            <div class="modal-option-text">
              <strong>微信咨询</strong>
              <span>扫码添加顾问微信，获取专属方案</span>
            </div>
          </a>
          <a class="modal-option" href="tel:+8618874284015">
            <i class="fas fa-phone-alt" style="color: #1e4a7a;"></i>
            <div class="modal-option-text">
              <strong>电话咨询</strong>
              <span>拨打 +8618874284015，立即沟通</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 微信二维码弹窗 -->
    <div class="wechat-modal" id="wechatModal" onclick="closeWechatModal(event)">
      <div class="wechat-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeWechatModal()">&times;</button>
        <h3><i class="fab fa-weixin" style="color: #07C160;"></i> 扫码添加微信</h3>
        <div class="wechat-qr">
          <img src="${wechatQrUrl}" alt="微信二维码" style="width: 100%; height: 100%; object-fit: cover; border-radius: 1rem;">
        </div>
        <p>微信扫一扫，添加专属顾问</p>
        <div class="wechat-tip">
          <i class="fas fa-info-circle"></i> 工作时间：9:00-23:00，顾问将在10分钟内回复
        </div>
      </div>
    </div>
  `;

  // 创建样式
  const styleHtml = `
    <style>
      /* 预约咨询弹窗 */
      .consult-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center; backdrop-filter: blur(5px); }
      .consult-modal.active { display: flex; }
      .modal-content { background: white; border-radius: 2rem; padding: 2.5rem; max-width: 450px; width: 90%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
      .modal-header { margin-bottom: 1.5rem; }
      .modal-header h3 { font-size: 1.5rem; color: #123a58; margin-bottom: 0.5rem; }
      .modal-header p { color: #5a7897; font-size: 0.95rem; }
      .modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #7895b2; cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
      .modal-close:hover { background: rgba(30,74,122,0.1); color: #1e4a7a; }
      .modal-options { display: flex; flex-direction: column; gap: 1rem; }
      .modal-option { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.5rem; background: rgba(245,248,254,0.8); border-radius: 1rem; cursor: pointer; transition: 0.2s; border: 2px solid transparent; text-decoration: none; color: inherit; }
      .modal-option:hover { background: rgba(30,74,122,0.1); border-color: #1e4a7a; }
      .modal-option i { font-size: 1.5rem; width: 40px; }
      .modal-option-text { text-align: left; }
      .modal-option-text strong { display: block; color: #123a58; font-size: 1.1rem; margin-bottom: 0.2rem; }
      .modal-option-text span { color: #5a7897; font-size: 0.85rem; }
      
      /* 微信二维码弹窗 */
      .wechat-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1001; justify-content: center; align-items: center; backdrop-filter: blur(5px); }
      .wechat-modal.active { display: flex; }
      .wechat-content { background: white; border-radius: 2rem; padding: 2rem; max-width: 350px; width: 90%; text-align: center; position: relative; }
      .wechat-content h3 { color: #123a58; margin-bottom: 1rem; }
      .wechat-qr { width: 200px; height: 200px; background: #f0f0f0; border-radius: 1rem; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; }
      .wechat-content p { color: #5a7897; font-size: 0.9rem; margin-bottom: 0.5rem; }
      .wechat-tip { background: rgba(30,74,122,0.1); padding: 0.8rem; border-radius: 0.8rem; font-size: 0.85rem; color: #1e4a7a; }
    </style>
  `;

  // 插入到body末尾
  const div = document.createElement('div');
  div.innerHTML = styleHtml + modalHtml;
  document.body.appendChild(div);
}

// 咨询弹窗
function openConsultModal() {
  createConsultModal();
  document.getElementById('consultModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeConsultModal(event) {
  if (!event || event.target.id === 'consultModal') {
    const modal = document.getElementById('consultModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// 微信弹窗
function openWechatModal() {
  const wechatModal = document.getElementById('wechatModal');
  if (wechatModal) {
    wechatModal.classList.add('active');
  }
}

function closeWechatModal(event) {
  if (!event || event.target.id === 'wechatModal') {
    const modal = document.getElementById('wechatModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 为所有咨询按钮添加点击事件
  const consultButtons = document.querySelectorAll('.btn-consult, [onclick*="consult"], .consult-trigger');
  consultButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openConsultModal();
    });
  });

  // ESC键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConsultModal();
      closeWechatModal();
    }
  });
});
