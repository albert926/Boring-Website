document.getElementById('send').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const responseBox = document.getElementById('responseBox');
  responseBox.textContent = 'Thinking...';

  const res = await fetch('/api/deepseek', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'demo-user', prompt })
  });

  if (res.ok) {
    const data = await res.json();
    responseBox.textContent = JSON.stringify(data.response, null, 2);
  } else {
    responseBox.textContent = `Error ${res.status}: ${res.statusText}`;
  }
});
