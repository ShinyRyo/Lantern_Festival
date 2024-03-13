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
