

    // 主题切换功能
    const themeSwitcher = document.querySelector('.theme-switcher');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储或系统偏好
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // 应用当前主题
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitcher.textContent = '🌙';
    }
    
    // 切换主题
    themeSwitcher.addEventListener('click', () => {
        let theme;
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            document.documentElement.removeAttribute('data-theme');
            theme = 'dark';
            themeSwitcher.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            theme = 'light';
            themeSwitcher.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    });
    
    // 页面加载完成后隐藏loading动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loading').style.opacity = '0';
            setTimeout(function() {
                document.querySelector('.loading').style.display = 'none';
            }, 500);
        }, 800);
    });