// ランタンが浮かび上がる速度と方向を制御する変数
let windX = 0; // 風のX方向（左右の動き）
const sensitivity = 0.1; // ジャイロセンサーの感度調整

function createLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    lantern.style.left = `${Math.random() * 100}vw`;
    document.getElementById('lanterns').appendChild(lantern);

    const duration = 10 + Math.random() * 15;
    lantern.style.animation = `floatUp ${duration}s ease-in forwards`;

    lantern.addEventListener('animationend', () => {
        lantern.remove();
    });
}

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(star);

    const twinklingDuration = 0.5 + Math.random() * 1.5 + 's';
    star.style.animation = `twinkle ${twinklingDuration} infinite ease-in-out`;

    setTimeout(() => {
        star.remove();
    }, 5000); // 星を5秒後に削除
}

// ランタンと星を定期的に生成
setInterval(createLantern, 1000 + Math.random() * 2000);
setInterval(createStar, 50); // 星を密に生成

function handleOrientation(event) {
    // デバイスの傾きを取得
    const beta = event.beta; // Y軸の傾き：前後の傾き
    const gamma = event.gamma; // Z軸の傾き：左右の傾き

    // 傾きに応じて風の方向を調整
    windX = gamma * sensitivity;
}

window.addEventListener('deviceorientation', handleOrientation);

function createLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    lantern.style.left = `${Math.random() * 100}vw`;
    document.getElementById('lanterns').appendChild(lantern);

    const duration = 10 + Math.random() * 15;
    lantern.style.animationDuration = `${duration}s`;

    // ランタンのアニメーション開始位置を設定
    lantern.style.animationName = 'floatUp, glow';
    lantern.style.animationTimingFunction = 'ease-in, ease-in-out';
    lantern.style.animationIterationCount = 'forwards, infinite';

    // ランタンの左右の動きをジャイロセンサーに応じて調整
    lantern.style.transform = `translateX(${windX}vw)`;

    lantern.addEventListener('animationend', () => {
        lantern.remove();
    });
}

// ランタン生成の間隔を設定
setInterval(createLantern, 2000 + Math.random() * 2000);

