function createLanterns(number) {
  const lanternArea = document.getElementById('lanternArea');
  for (let i = 0; i < number; i++) {
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    lantern.style.left = `${Math.random() * window.innerWidth}px`;
    lanternArea.appendChild(lantern);
  }
}

function startLanternFestival(interval, number) {
  setInterval(() => createLanterns(number), interval);
}

document.body.addEventListener('touchmove', function(e) {
  const touchLocation = e.touches[0];
  const swipeEffect = document.createElement('div');
  swipeEffect.style.position = 'absolute';
  swipeEffect.style.width = '100px';
  swipeEffect.style.height = '100px';
  swipeEffect.style.background = 'rgba(255, 255, 255, 0.5)';
  swipeEffect.style.borderRadius = '50%';
  swipeEffect.style.top = `${touchLocation.pageY - 50}px`;
  swipeEffect.style.left = `${touchLocation.pageX - 50}px`;
  document.body.appendChild(swipeEffect);
  setTimeout(() => swipeEffect.remove(), 500);
});

startLanternFestival(3000, 5); // 3秒ごとに5つのランタンを生成

// スワイプによるランタンの動きの実装は、このコードでは省略していますが、
// touchmoveイベントで取得した座標情報を基に、ランタンの位置や動きを調整することで実現できます。
