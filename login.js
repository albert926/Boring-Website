const emojis = ['💖', '✨', '🌟', '🦄', '💫', '🎉', '🥳'];

document.addEventListener('mousemove', (e) => {
  const emoji = document.createElement('div');
  emoji.className = 'emoji';
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = `${e.clientX}px`;
  emoji.style.top = `${e.clientY}px`;
  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 1000);
});
