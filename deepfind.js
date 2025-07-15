import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const app = express();
app.use(bodyParser.json());

app.get('/deepfind.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'deepfind.html'));
});

app.get('/deepfind-client.js', (req, res) => {
  res.type('application/javascript').sendFile(path.join(process.cwd(), 'deepfind-client.js'));
});

const usage = {};

app.post('/api/deepseek', async (req, res) => {
  const userId = req.body.userId || 'demo-user';
  const prompt = req.body.prompt || '';
  const today = new Date().toISOString().split('T')[0];
  const key = `${userId}:${today}`;
  const used = usage[key] || 0;
  const tokens = prompt.split(/\s+/).length;
  if (used + tokens > 200) return res.status(429).json({ error: 'Limit reached' });

  const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk-22fb0e0bceac4ec3b8a4cd38d84b59b2',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100
    })
  });
  const data = await resp.json();
  usage[key] = used + tokens;
  res.json({ used: usage[key], response: data });
});

app.listen(3000);
