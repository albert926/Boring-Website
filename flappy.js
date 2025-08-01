// Flappy Bird
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreDiv = document.getElementById('score');
  const messageDiv = document.getElementById('message');
  const width = canvas.width;
  const height = canvas.height;
  const groundHeight = 80;
  const gravity = 0.1;
  const jumpStrength = -4;
  const pipeWidth = 60;
  const pipeGap = 150;
  const pipeInterval = 120;
  let frameCount, bird, pipes, score, gameState = 'start';
  let bestScore = parseInt(getCookie('bestScore')) || 0;
  let pipeSpeed = 1.5;

  const birdImg = new Image();
  birdImg.src = 'flap.png';


  function getCookie(name) {
    const v = `; ${document.cookie}`;
    const parts = v.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const d = new Date();
      d.setTime(d.getTime() + days*24*60*60*1000);
      expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function resetGame() {
    frameCount = 0;
    bird = { x: 80, y: height/2, width: 34, height: 24, velocity: 0 };
    pipes = [];
    score = 0;
    scoreDiv.textContent = '';
  }

  function startGame() {
    resetGame();
    gameState = 'running';
    messageDiv.textContent = '';
    requestAnimationFrame(loop);
  }

  function gameOver() {
    gameState = 'over';
    messageDiv.innerHTML = `Game Over<br>Score: ${score}<br>Best: ${bestScore}<br>Press Space or Tap to Restart`;
  }

  function createPipe() {
    const minY = pipeGap/2 + 50;
    const maxY = height - groundHeight - pipeGap/2 - 50;
    const gapY = Math.random() * (maxY - minY) + minY;
    pipes.push({ x: width, y: gapY });
  }

  function update() {
    frameCount++;
    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (frameCount % pipeInterval === 0) createPipe();

    for (let i = pipes.length-1; i>=0; i--) {
      pipes[i].x -= pipeSpeed;
      if (pipes[i].x + pipeWidth < 0) pipes.splice(i,1);
    }

    if (bird.y + bird.height > height - groundHeight || bird.y < 0) {
      return gameOver();
    }

    for (const pipe of pipes) {
      const topBottom = pipe.y - pipeGap/2;
      const botTop = pipe.y + pipeGap/2;
      if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
        if (bird.y < topBottom || bird.y + bird.height > botTop) {
          return gameOver();
        }
      }
      if (!pipe.scored && pipe.x + pipeWidth < bird.x) {
        pipe.scored = true;
        score++;
        if (score % 10 === 0) pipeSpeed += 0.5;
        scoreDiv.textContent = score;
        if (score > bestScore) {
          bestScore = score;
          setCookie('bestScore', bestScore, 365);
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0,0,width,height);
    // pipes
    ctx.fillStyle = '#008000';
    for (const p of pipes) {
      const topB = p.y - pipeGap/2;
      const botT = p.y + pipeGap/2;
      ctx.fillRect(p.x, 0, pipeWidth, topB);
      ctx.fillRect(p.x, botT, pipeWidth, height - groundHeight - botT);
    }
    // bird
    // ctx.fillStyle = '#FFEB3B';
    // ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    // ctx.strokeStyle = '#000';
    // ctx.strokeRect(bird.x, bird.y, bird.width, bird.height);
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // ground
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, height - groundHeight, width, groundHeight);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, height - groundHeight + 10, width, 10);
  }

  function loop() {
    if (gameState !== 'running') return;
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function drawStartScreen() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, height - groundHeight, width, groundHeight);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, height - groundHeight + 10, width, 10);
    messageDiv.innerHTML = 'Flappy Bird<br>Press Space or Tap to Start';
  }

  function handleJump() {
    if (gameState === 'start') startGame();
    else if (gameState === 'running') bird.velocity = jumpStrength;
    else if (gameState === 'over') startGame();
  }

  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      handleJump();
    }
  });
  canvas.addEventListener('mousedown', handleJump);
  canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  handleJump();
});


  // init
  resetGame();
  drawStartScreen();
})();
