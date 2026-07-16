// 浏览器主页 - JavaScript 主文件
// 版本: 2.0 (移除文件管理器，添加搜索引擎切换功能)

// 搜索引擎配置
const SEARCH_ENGINES = {
    bing: {
        name: '必应',
        url: 'https://www.bing.com/search?q={query}',
        icon: 'fab fa-microsoft',
        placeholder: '使用必应搜索...',
        color: '#007daa'
    },
    google: {
        name: '谷歌',
        url: 'https://www.google.com/search?q={query}',
        icon: 'fab fa-google',
        placeholder: '使用谷歌搜索...',
        color: '#4285f4'
    },
    baidu: {
        name: '百度',
        url: 'https://www.baidu.com/s?wd={query}',
        icon: 'fab fa-baidu',
        placeholder: '使用百度搜索...',
        color: '#2932e1'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q={query}',
        icon: 'fas fa-search',
        placeholder: '使用DuckDuckGo搜索...',
        color: '#de5833'
    }
};

// 当前选中的搜索引擎
let currentEngine = 'bing';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('浏览器主页 v2.0 正在初始化...');
    
    // 设置当前日期
    updateCurrentDate();
    
    // 设置搜索引擎功能
    setupSearchEngine();
    
    // 设置搜索表单
    setupSearchForm();
    
    // 设置卫星百科搜索
    setupSatelliteSearch();
    
    // 设置工具卡片点击事件
    setupToolCards();
    
    // 设置模态框关闭事件
    setupModalClosers();
    
    // 设置键盘快捷键
    setupKeyboardShortcuts();
    
    console.log('浏览器主页 v2.0 初始化完成');
});

// 更新当前日期
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    dateElement.textContent = now.toLocaleDateString('zh-CN', options);
}

// 设置搜索引擎功能
function setupSearchEngine() {
    const engineSelectorBtn = document.getElementById('engineSelectorBtn');
    const engineDropdown = document.getElementById('engineDropdown');
    const searchInput = document.getElementById('searchInput');
    const engineOptions = document.querySelectorAll('.engine-option');
    
    // 从本地存储恢复之前的选择
    const savedEngine = localStorage.getItem('selectedSearchEngine');
    if (savedEngine && SEARCH_ENGINES[savedEngine]) {
        currentEngine = savedEngine;
    }
    
    // 激活当前选中的搜索引擎
    updateCurrentEngineDisplay();
    
    // 引擎选项点击事件
    engineOptions.forEach(option => {
        option.addEventListener('click', function() {
            const engine = this.getAttribute('data-engine');
            if (engine && SEARCH_ENGINES[engine]) {
                // 移除所有选项的激活状态
                engineOptions.forEach(opt => opt.classList.remove('active'));
                // 激活当前选项
                this.classList.add('active');
                
                // 更新当前搜索引擎
                currentEngine = engine;
                localStorage.setItem('selectedSearchEngine', engine);
                
                // 更新搜索框占位符
                updateSearchInputPlaceholder();
                
                console.log(`搜索引擎已切换为: ${SEARCH_ENGINES[engine].name}`);
            }
        });
    });
    
    // 点击按钮打开下拉菜单
    if (engineSelectorBtn) {
        engineSelectorBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = engineDropdown.style.display === 'block';
            engineDropdown.style.display = isVisible ? 'none' : 'block';
        });
    }
    
    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        engineDropdown.style.display = 'none';
    });
    
    // 阻止下拉菜单内部点击事件冒泡
    engineDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// 更新当前搜索引擎显示
function updateCurrentEngineDisplay() {
    const engineOptions = document.querySelectorAll('.engine-option');
    const searchInput = document.getElementById('searchInput');
    const engineSelectorBtn = document.getElementById('engineSelectorBtn');
    
    // 更新选项激活状态
    engineOptions.forEach(option => {
        const engine = option.getAttribute('data-engine');
        if (engine === currentEngine) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // 更新按钮上的当前搜索引擎显示
    if (engineSelectorBtn) {
        const engine = SEARCH_ENGINES[currentEngine];
        if (engine) {
            const iconElement = engineSelectorBtn.querySelector('.current-engine-icon');
            const nameElement = engineSelectorBtn.querySelector('.current-engine-name');
            
            if (iconElement) {
                // 更新图标类名
                iconElement.className = `current-engine-icon ${engine.icon}`;
            }
            
            if (nameElement) {
                // 更新引擎名称
                nameElement.textContent = engine.name;
            }
        }
    }
    
    // 更新搜索框占位符
    updateSearchInputPlaceholder();
}

// 更新搜索框占位符
function updateSearchInputPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && SEARCH_ENGINES[currentEngine]) {
        searchInput.placeholder = SEARCH_ENGINES[currentEngine].placeholder;
    }
}

// 设置搜索表单
function setupSearchForm() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        });
    }
    
    // 回车键搜索
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
        
        // 聚焦时全选文本
        searchInput.addEventListener('focus', function() {
            this.select();
        });
    }
}

// 执行搜索
function performSearch(query) {
    if (!query) {
        // 如果搜索框为空，聚焦到搜索框
        document.getElementById('searchInput').focus();
        return;
    }
    
    const engine = SEARCH_ENGINES[currentEngine];
    if (!engine) {
        console.error('未找到搜索引擎配置');
        return;
    }
    
    const searchUrl = engine.url.replace('{query}', encodeURIComponent(query));
    
    console.log(`正在使用 ${engine.name} 搜索: ${query}`);
    
    // 在新标签页中打开搜索结果
    window.open(searchUrl, '_blank');
    
    // 清空搜索框
    document.getElementById('searchInput').value = '';
}

// 设置卫星百科搜索
function setupSatelliteSearch() {
    const satelliteModal = document.getElementById('satelliteModal');
    const satelliteForm = document.getElementById('satelliteSearchForm');
    const satelliteInput = document.getElementById('satelliteSearchInput');
    
    if (satelliteForm) {
        satelliteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSatelliteSearch(satelliteInput.value.trim());
        });
    }
    
    // 卫星百科搜索输入框回车键
    if (satelliteInput) {
        satelliteInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSatelliteSearch(this.value.trim());
            }
        });
        
        // 当模态框显示时自动聚焦
        const modalObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (satelliteModal.classList.contains('active')) {
                        setTimeout(() => {
                            satelliteInput.focus();
                            satelliteInput.select();
                        }, 300);
                    }
                }
            });
        });
        
        modalObserver.observe(satelliteModal, { attributes: true });
    }
}

// 执行卫星百科搜索
function performSatelliteSearch(query) {
    if (!query) {
        // 如果搜索框为空，聚焦到搜索框
        document.getElementById('satelliteSearchInput').focus();
        return;
    }
    
    const searchUrl = `https://sat.huijiwiki.com/index.php?search=${encodeURIComponent(query)}`;
    
    console.log(`正在搜索卫星百科: ${query}`);
    
    // 在新标签页中打开搜索结果
    window.open(searchUrl, '_blank');
    
    // 关闭模态框
    closeModal('satelliteModal');
}

    // 设置工具卡片点击事件
 function setupToolCards() {
     const satelliteWikiCard = document.getElementById('satelliteWikiCard');
     const unnNewsCard = document.getElementById('unnNewsCard');
     const jimanCard = document.getElementById('jimanCard');
     const aiCard = document.getElementById('aiCard');
     const look4satCard = document.getElementById('look4satCard');
     const ehviewerCard = document.getElementById('ehviewerCard');
     
     // 卫星百科卡片 - 打开卫星百科搜索模态框
     if (satelliteWikiCard) {
         satelliteWikiCard.addEventListener('click', function() {
             openModal('satelliteModal');
         });
     }
     
     // UNN News卡片 - 打开新闻网站
     if (unnNewsCard) {
         unnNewsCard.addEventListener('click', function() {
             window.open('https://unn.mysxl.cn', '_blank');
         });
     }
     
     // 积满卡片 - 打开积满游戏网站
     if (jimanCard) {
         jimanCard.addEventListener('click', function() {
             window.open('https://jm18c-jjd.club', '_blank');
         });
     }
     
     // 爱卡片 - 打开爱心分享网站
     if (aiCard) {
         aiCard.addEventListener('click', function() {
             window.open('https://www.xn--i8s951di30azba.com/', '_blank');
         });
     }
     
     
     // 为工具卡片添加键盘导航
     document.addEventListener('keydown', function(e) {
         // 数字键1-4选择工具卡片
         if (e.key >= '1' && e.key <= '4') {
             const index = parseInt(e.key) - 1;
             const cards = [satelliteWikiCard, unnNewsCard, jimanCard, aiCard];
             if (cards[index]) {
                 cards[index].click();
             }
         }
     });
 }

// 设置模态框关闭事件
function setupModalClosers() {
    const closeModalBtn = document.getElementById('closeModal');
    const satelliteModal = document.getElementById('satelliteModal');
    
    // 关闭卫星百科模态框
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal('satelliteModal');
        });
    }
    
    // 点击模态框背景关闭
    if (satelliteModal) {
        satelliteModal.addEventListener('click', function(e) {
            if (e.target === satelliteModal) {
                closeModal('satelliteModal');
            }
        });
    }
}

// 设置键盘快捷键
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭所有模态框
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Ctrl+K 或 Cmd+K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Ctrl+H 或 Cmd+H 显示帮助信息
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            showHelpInfo();
        }
        
        // 数字键切换搜索引擎 (Ctrl + 数字)
        if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const engineKeys = ['bing', 'google', 'baidu', 'duckduckgo'];
            const index = parseInt(e.key) - 1;
            if (engineKeys[index]) {
                switchSearchEngine(engineKeys[index]);
            }
        }
    });
}

// 切换搜索引擎
function switchSearchEngine(engineKey) {
    if (!SEARCH_ENGINES[engineKey]) return;
    
    currentEngine = engineKey;
    localStorage.setItem('selectedSearchEngine', engineKey);
    
    updateCurrentEngineDisplay();
    
    console.log(`通过快捷键切换搜索引擎为: ${SEARCH_ENGINES[engineKey].name}`);
    
    // 显示切换提示
    showNotification(`已切换到 ${SEARCH_ENGINES[engineKey].name}`);
}

// 打开模态框
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // 清空搜索框内容
        if (modalId === 'satelliteModal') {
            const satelliteInput = document.getElementById('satelliteSearchInput');
            if (satelliteInput) satelliteInput.value = '';
        }
    }
}

// 关闭所有模态框
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// 显示通知消息
function showNotification(message, duration = 2000) {
    // 检查是否已经存在通知
    let notification = document.getElementById('globalNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'globalNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100px);
            transition: opacity 0.3s, transform 0.3s;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        
        // 完全移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}


    // 显示帮助信息
 function showHelpInfo() {
     const helpMessage = `
 ===== 浏览器主页快捷键说明 =====

 🔍 搜索相关:
 Ctrl+K / Cmd+K - 聚焦搜索框
 回车键 - 执行搜索

 🔄 搜索引擎切换:
 Ctrl+1 - 必应 (Bing)
 Ctrl+2 - 谷歌 (Google)
 Ctrl+3 - 百度 (Baidu)
 Ctrl+4 - DuckDuckGo

 🎮 工具卡片:
 1 - 打开卫星百科搜索
 2 - 打开UNN News网站
 3 - 打开积满游戏网站
 4 - 打开爱心分享网站

 🎯 其他功能:
 ESC - 关闭所有窗口
 Ctrl+H - 显示此帮助信息

 ✨ 功能特性:
 • 支持四种搜索引擎切换
 • 自动保存搜索引擎选择
 • 响应式设计，支持移动端
 • 航天科技主题风格
     `.trim();
     
     showNotification(helpMessage, 5000);
 }

// 调试信息
console.log('======= 浏览器主页 v2.0 已增强 =======');
console.log('✓ 已移除文件管理器功能');
console.log('✓ 已添加搜索引擎切换功能');
console.log('✓ 支持必应、谷歌、百度、DuckDuckGo');
console.log('✓ 已改进搜索引擎选择器界面');
console.log('✓ 使用 localStorage 保存设置');
console.log('✓ 支持键盘快捷键');
console.log('✓ 已添加UNN News工具卡片');
console.log('✓ 支持4个工具卡片快捷键(1-4)');
console.log('================================');
