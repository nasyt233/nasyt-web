// 显示运行时间
function show_runtime() {
    window.setTimeout("show_runtime()", 1000);
    const X = new Date("5/27/2025 9:00:00");
    const Y = new Date();
    const T = Y.getTime() - X.getTime();
    const M = 24 * 60 * 60 * 1000;
    const a = T / M;
    const A = Math.floor(a);
    const b = (a - A) * 24;
    const B = Math.floor(b);
    const c = (b - B) * 60;
    const C = Math.floor((b - B) * 60);
    const D = Math.floor((c - C) * 60);
    runtime_span.innerHTML = "此版本已发布: " + A + "天" + B + "小时" + C + "分" + D + "秒";
}

show_runtime();

// 生成一言
function generateQuotes() {
    const apiUrl = 'https://v1.hitokoto.cn/';

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quote = data.hitokoto;
            return quote;
        })
        .catch(error => {
            console.error('随机文案获取失败:', error);
            return "获取随机文案失败";
        });
}

// 创建卡片
async function createCard() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    for (let i = 0; i < 1; i++) {
        const quote = await generateQuotes();
        const card = document.createElement('div');
        card.classList.add('quotes-container');
        card.textContent = quote;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = "复制";

        copyButton.addEventListener('click', () => {
            copyToClipboard(quote, card);
        });

        card.appendChild(copyButton);
        cardContainer.appendChild(card);
    }
}

// 复制文本到剪贴板
function copyToClipboard(text, element) {
    const dummy = document.createElement("textarea");
    dummy.value = text;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    element.textContent = "已复制";
    setTimeout(() => {
        element.textContent = "复制";
    }, 2000);
}

// 创建一言卡片
createCard();


// 侧边栏切换
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('show');
}

// 返回顶部按钮
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.getElementById('back-to-top').addEventListener('click', scrollToTop);

// 随机爱心
(function () {
    var a_idx = 0;
    window.onclick = function (event) {
        var a = new Array("❤2025幸福美满 ❤", "❤2025快乐健康❤", "❤2025事业有成❤", "❤2025心想事成❤");
        var heart = document.createElement("b");
        heart.onselectstart = new Function('event.returnValue=false');

        document.body.appendChild(heart).innerHTML = a[a_idx];
        a_idx = (a_idx + 1) % a.length;
        heart.style.cssText = "position: fixed;left:-100%;";

        var f = 50,
            x = event.clientX - f / 2 - 30,
            y = event.clientY - f,
            c = randomColor(),
            a = 1,
            s = 0.8;

        var timer = setInterval(function () {
            if (a <= 0) {
                document.body.removeChild(heart);
                clearInterval(timer);
            } else {
                heart.style.cssText = "font-size:16px;cursor: default;position: fixed;color:" +
                    c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" +
                    s + ");";

                y--;
                a -= 0.016;
                s += 0.002;
            }
        }, 15)
    }

    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }
}());