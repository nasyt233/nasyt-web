// 检查是否已经显示过提示
if (!sessionStorage.getItem('shownWelcomeMessage')) {
    alert('欢迎访问');
    alert("web由DARK研究所npp开发")
    // 设置标记，表示已经显示过提示
    sessionStorage.setItem('shownWelcomeMessage', 'true');
}