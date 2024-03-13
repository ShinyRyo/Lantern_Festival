function createLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    lantern.style.left = `${Math.random() * 100}vw`; // ランタンの横位置をランダムに設定
    document.getElementById('lanterns').appendChild(lantern);

    // アニメーション設定
    const duration = 10 + Math.random() * 15; // 10〜25秒の間でランダムに設定
    lantern.style.animation = `floatUp ${duration}s ease-in forwards`;

    // アニメーション終了後にランタンを削除
    lantern.addEventListener('animationend', () => {
        lantern.remove();
    });
}

// 1〜3秒ごとにランタンを作成
setInterval(createLantern, 1000 + Math.random() * 2000);
