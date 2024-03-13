// ランタンが浮かび上がる速度と方向を制御する変数
let windX = 0; // 風のX方向（左右の動き）
const sensitivity = 0.1; // ジャイロセンサーの感度調整

function handleOrientation(event) {
    // デバイスの傾きを取得
    const gamma = event.gamma; // Z軸の傾き：左右の傾き

    // 傾きに応じて風の方向を調整
    windX = gamma * sensitivity;
}

window.addEventListener('deviceorientation', handleOrientation);

function createLanterns(numberOfLanterns) {
    for (let i = 0; i < numberOfLanterns; i++) {
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
        // 注意: この設定はアニメーションのスタート時のみ有効であり、継続的な追跡にはより複雑なロジックが必要です。
        lantern.style.transform = `translateX(${windX}vw)`;

        lantern.addEventListener('animationend', () => {
            lantern.remove();
        });
    }
}

// ランタン生成の間隔をより短く設定し、一度に生成するランタンの数を増やす
function startLanternFestival() {
    setInterval(() => {
        createLanterns(5); // 一度に5個のランタンを生成
    }, 1000); // 1秒ごとにランタンを生成
}

startLanternFestival();
