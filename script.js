// ランタンが浮かび上がる速度と方向を制御する変数
let windX = 0; // 風のX方向（左右の動き）
const sensitivity = 0.1; // ジャイロセンサーの感度調整

// デバイスの傾きを取得し、風の方向を調整
function handleOrientation(event) {
    const gamma = event.gamma; // Z軸の傾き：左右の傾き
    windX = gamma * sensitivity;
}

window.addEventListener('deviceorientation', handleOrientation);

// ランタンを生成する関数
function createLanterns(numberOfLanterns) {
    for (let i = 0; i < numberOfLanterns; i++) {
        const lantern = document.createElement('div');
        lantern.classList.add('lantern');
        lantern.style.left = `${Math.random() * 100}vw`;
        document.getElementById('lanterns').appendChild(lantern);

        const duration = 10 + Math.random() * 15;
        lantern.style.animationDuration = `${duration}s`;

        // アニメーションと初期位置設定
        lantern.style.animationName = 'floatUp, glow';
        lantern.style.animationTimingFunction = 'ease-in, ease-in-out';
        lantern.style.animationIterationCount = 'forwards, infinite';
        lantern.style.transform = `translateX(${windX}vw)`;

        lantern.addEventListener('animationend', () => {
            lantern.remove();
        });
    }
}

// ランタン生成の間隔と数を調整する関数
function startLanternFestival() {
    setInterval(() => {
        createLanterns(5); // 一度に2個のランタンを生成
    }, 3000); // 3秒ごとにランタンを生成
}

startLanternFestival();

// スワイプ操作の検出
let startX, startY, endX, endY;

function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function touchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    const distanceX = endX - startX;
    const distanceY = endY - startY;

    applyWindToLanterns(distanceX, distanceY);
}

document.addEventListener('touchstart', touchStart);
document.addEventListener('touchend', touchEnd);

// スワイプに応じてランタンに風の効果を適用する関数
function applyWindToLanterns(distanceX, distanceY) {
    const lanterns = document.querySelectorAll('.lantern');

    lanterns.forEach(lantern => {
        const styles = window.getComputedStyle(lantern);
        const matrix = new WebKitCSSMatrix(styles.transform);
        const newX = matrix.m41 + distanceX * 0.1;
        const newY = matrix.m42 - distanceY * 0.1;

        lantern.style.transform = `translate(${newX}px, ${newY}px)`;
    });
}
