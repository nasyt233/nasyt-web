   /*  clock */
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
clock = () => {
    let today = new Date();
    let h = (today.getHours() % 12) + today.getMinutes() / 59;
    let m = today.getMinutes();
    let s = today.getSeconds();

    h *= 30;
    m *= 6;
    s *= 6;

    rotation(hours, h);
    rotation(minutes, m);
    rotation(seconds, s);
    setTimeout(clock, 500);
}

rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`;
}

window.onload = clock();

dragElement = (target, btn) => {
    target.addEventListener('mousedown', (e) => {
        onMouseMove(e);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    onMouseMove = (e) => {
        e.preventDefault();
        let targetRect = target.getBoundingClientRect();
        let x = e.pageX - targetRect.left + 10;
        if (x > targetRect.width) {
            x = targetRect.width
        };
        if (x < 0) {
            x = 0
        };
        btn.x = x - 10;
        btn.style.left = btn.x + 'px';
        let percentPosition = (btn.x + 10) / targetRect.width * 100;
        color.style.width = percentPosition + "%";
        tooltip.style.left = btn.x - 5 + 'px';
        tooltip.style.opacity = 1;
        tooltip.textContent = Math.round(percentPosition) + '%';
    };

    onMouseUp = (e) => {
        window.removeEventListener('mousemove', onMouseMove);
        tooltip.style.opacity = 0;

        btn.addEventListener('mouseover', function() {
            tooltip.style.opacity = 1;
        });

        btn.addEventListener('mouseout', function() {
            tooltip.style.opacity = 0;
        });
    };
};