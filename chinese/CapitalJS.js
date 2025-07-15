const capitals = {
  "英国": "伦敦",
  "法国": "巴黎",
  "德国": "柏林",
  "西班牙": "马德里",
  "意大利": "罗马",
  "日本": "东京",
  "美国": "华盛顿",
  "加拿大": "渥太华",
  "澳大利亚": "堪培拉",
  "印度": "新德里"
};

let plays, level, currentPlay, country, capitalToGuess, attempts;

function startGame() {
  plays = parseInt(document.getElementById("plays").value);
  let l = document.getElementById("level").value;
  level = l === "hard" ? 1 : l === "medium" ? 3 : 5;
  currentPlay = 0;
  document.getElementById("start-container").style.display = "none";
  document.getElementById("game-container").classList.remove("hidden");
  nextQuestion();
}

function nextQuestion() {
  if (currentPlay >= plays) {
    document.getElementById("message").innerText = "您已完成所有轮次！";
    setTimeout(() => window.location.href = "index.html", 2000);
    return;
  }
  currentPlay++;
  attempts = 0;
  let keys = Object.keys(capitals);
  country = keys[Math.floor(Math.random() * keys.length)];
  capitalToGuess = capitals[country];
  document.getElementById("question").innerText = `${country}的首都是？`;
  document.getElementById("user-answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("message").innerText = "";
}

function checkAnswer() {
  const user = document.getElementById("user-answer").value.trim();
  attempts++;
  if (user === capitalToGuess) {
    document.getElementById("result").innerText = "回答正确！";
    document.getElementById("message").innerText = "";
    setTimeout(nextQuestion, 1000);
  } else if (attempts < level) {
    document.getElementById("result").innerText = "再试一次！";
    document.getElementById("message").innerText = `还有 ${level - attempts} 次机会。`;
  } else {
    document.getElementById("result").innerText = "游戏结束！";
    document.getElementById("message").innerText = `正确答案是：${capitalToGuess}`;
    setTimeout(nextQuestion, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isChinese = document.documentElement.lang === 'zh';

  const startBtn = document.getElementById(isChinese ? "start-btn-zh" : "start-btn");
  const submitBtn = document.getElementById(isChinese ? "submit-btn-zh" : "submit-btn");

  startBtn.addEventListener("click", startGame);
  submitBtn.addEventListener("click", checkAnswer);
});
