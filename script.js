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

let startX, startY, endX, endY; // スワイプの始点と終点

// スワイプの始点を記録
function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

// スワイプの終点を記録し、風の方向と強さを計算
function touchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    // スワイプの方向（X,Y）と強さ（distanceX, distanceY）を計算
    const distanceX = endX - startX;
    const distanceY = endY - startY;

    // ランタンに風の効果を適用
    applyWindToLanterns(distanceX, distanceY);
}

// スワイプイベントリスナーを追加
document.addEventListener('touchstart', touchStart);
document.addEventListener('touchend', touchEnd);

function applyWindToLanterns(distanceX, distanceY) {
    // 全てのランタンを取得
    const lanterns = document.querySelectorAll('.lantern');

    // 各ランタンに対して風の効果を適用
    lanterns.forEach(lantern => {
        // スワイプの方向と距離に基づいて、ランタンの位置を調整
        const currentTransform = lantern.style.transform;
        const newX = parseInt(currentTransform.replace('translateX(', '').replace('vw)', '')) + distanceX / 10; // 風の強さを適用
        const newY = parseInt(currentTransform.replace('translateY(', '').replace('vh)', '')) - distanceY / 10; // Y軸は画面の向きに合わせて調整
        lantern.style.transform = `translateX(${newX}vw) translateY(${newY}vh)`;
    });
}
