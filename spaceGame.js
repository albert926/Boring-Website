(() => {
  const canvas = document.getElementById('game');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  // images
  const shipImg     = new Image();
  const asteroidImg = new Image();
  shipImg.src       = 'space.png';
  asteroidImg.src   = 'asteroid.png';

  // player setup
  const ship = {
    w: 60, h: 60,
    x: W/2 - 30,
    y: H - 80,
    speed: 6,
    moveLeft: false,
    moveRight: false
  };

  // asteroid array
  const asteroids = [];
  let spawnTimer = 0;
  const spawnInterval = 90;
  let score = 0;

  // handle window resize
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    ship.y = H - ship.h - 20;
  });

  // keyboard controls
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  ship.moveLeft  = true;
    if (e.key === 'ArrowRight') ship.moveRight = true;
  });
  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft')  ship.moveLeft  = false;
    if (e.key === 'ArrowRight') ship.moveRight = false;
  });

  // touch–drag for mobile
  canvas.addEventListener('touchmove', e => {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ship.x = t.clientX - rect.left - ship.w / 2;
    ship.x = Math.max(0, Math.min(W - ship.w, ship.x));
  });

  // spawn a new asteroid
  function spawnAsteroid() {
    const size = 40 + Math.random() * 30;
    asteroids.push({
      x: Math.random() * (W - size),
      y: -size,
      size,
      speed: 2 + Math.random() * 3,
      angle: 0,
      rotSpeed: (Math.random() * 0.1) - 0.05
    });
  }

  // update game state
  function update() {
    if (ship.moveLeft)  ship.x -= ship.speed;
    if (ship.moveRight) ship.x += ship.speed;
    ship.x = Math.max(0, Math.min(W - ship.w, ship.x));

    // spawn logic
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnAsteroid();
    }

    // move asteroids & check collisions
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      a.y += a.speed;
      a.angle += a.rotSpeed;

      // dodged?
      if (a.y > H) {
        asteroids.splice(i, 1);
        score++;
        document.getElementById('score').textContent = score;
      }

      // collision AABB
      if (
        a.x < ship.x + ship.w &&
        a.x + a.size > ship.x &&
        a.y < ship.y + ship.h &&
        a.y + a.size > ship.y
      ) {
        alert('Game Over!\nYour score: ' + score);
        // reset
        asteroids.length = 0;
        score = 0;
        document.getElementById('score').textContent = 0;
        spawnTimer = 0;
        ship.x = W/2 - ship.w/2;
      }
    }
  }

  // draw to canvas
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h);
    asteroids.forEach(a => {
      ctx.save();
      ctx.translate(a.x + a.size/2, a.y + a.size/2);
      ctx.rotate(a.angle);
      ctx.drawImage(asteroidImg, -a.size/2, -a.size/2, a.size, a.size);
      ctx.restore();
    });
  }

  // game loop
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // start once assets are loaded
  asteroidImg.onload = () => {
    shipImg.onload = () => {
      loop();
    };
  };
})();
