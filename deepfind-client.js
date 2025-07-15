document.getElementById('send').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const res = await fetch('/api/deepseek', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'demo-user', prompt })
  });
  const data = await res.json();
  document.getElementById('result').textContent = JSON.stringify(data, null, 2);
});
