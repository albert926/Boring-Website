(() => {
  const canvas = document.getElementById('game');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return match ? match[1] : null;
  }

  let highScore = parseInt(getCookie('highSpace')) || 0;

  const shipImg     = new Image();
  const asteroidImg = new Image();
  shipImg.src       = 'space.png';
  asteroidImg.src   = 'asteroid.png';

  const ship = {
    w: 60,
    h: 60,
    x: W / 2 - 30,
    y: H - 80,
    speed: 6,
    moveLeft: false,
    moveRight: false
  };

  const asteroids = [];
  let spawnTimer = 0;
  const spawnInterval = 90;
  let score = 0;
  let gameOver = false;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    ship.y = H - ship.h - 20;
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  ship.moveLeft  = true;
    if (e.key === 'ArrowRight') ship.moveRight = true;
  });

  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft')  ship.moveLeft  = false;
    if (e.key === 'ArrowRight') ship.moveRight = false;
  });

  canvas.addEventListener('touchmove', e => {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ship.x = t.clientX - rect.left - ship.w / 2;
    ship.x = Math.max(0, Math.min(W - ship.w, ship.x));
  });

  function spawnAsteroid() {
    const size = 40 + Math.random() * 30;
    asteroids.push({
      x: Math.random() * (W - size),
      y: -size,
      size: size,
      speed: 2 + Math.random() * 3,
      angle: 0,
      rotSpeed: (Math.random() * 0.1) - 0.05
    });
  }

  function resetGame() {
    asteroids.length = 0;
    score = 0;
    spawnTimer = 0;
    ship.x = W / 2 - ship.w / 2;
    gameOver = false;
  }

  function update() {
    if (gameOver) return;

    if (ship.moveLeft)  ship.x -= ship.speed;
    if (ship.moveRight) ship.x += ship.speed;
    ship.x = Math.max(0, Math.min(W - ship.w, ship.x));

    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnAsteroid();
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      a.y += a.speed;
      a.angle += a.rotSpeed;

      if (a.y > H) {
        asteroids.splice(i, 1);
        score++;
      }

      if (
        a.x < ship.x + ship.w &&
        a.x + a.size > ship.x &&
        a.y < ship.y + ship.h &&
        a.y + a.size > ship.y
      ) {
        gameOver = true;
        if (score > highScore) {
          highScore = score;
          setCookie('highSpace', highScore, 365);
        }
        setTimeout(resetGame, 2000);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h);

    asteroids.forEach(a => {
      ctx.save();
      ctx.translate(a.x + a.size / 2, a.y + a.size / 2);
      ctx.rotate(a.angle);
      ctx.drawImage(asteroidImg, -a.size / 2, -a.size / 2, a.size, a.size);
      ctx.restore();
    });

    ctx.fillStyle = '#0f0';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`High: ${highScore}`, 10, 60);

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#f00';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 20);
      ctx.font = '24px sans-serif';
      ctx.fillText(`Your Score: ${score}`, W / 2, H / 2 + 20);
      ctx.textAlign = 'start';
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  asteroidImg.onload = () => shipImg.onload = loop;
})();
