const capitals = {
  "England": "London",
  "France": "Paris",
  "Germany": "Berlin",
  "Spain": "Madrid",
  "Italy": "Rome",
  "Japan": "Tokyo",
  "USA": "Washington",
  "Canada": "Ottawa",
  "Australia": "Canberra",
  "India": "New Delhi"
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
    document.getElementById("message").innerText = "Game complete!";
    setTimeout(() => window.location.href = "pythonCapitalGame.html", 2000);
    return;
  }
  currentPlay++;
  attempts = 0;
  let keys = Object.keys(capitals);
  country = keys[Math.floor(Math.random() * keys.length)];
  capitalToGuess = capitals[country];
  document.getElementById("question").innerText = `What is the capital of ${country}?`;
  document.getElementById("user-answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("message").innerText = "";
}

function checkAnswer() {
  const user = document.getElementById("user-answer").value.trim();
  attempts++;
  if (user.toLowerCase() === capitalToGuess.toLowerCase()) {
    document.getElementById("result").innerText = "Correct!";
    document.getElementById("message").innerText = "";
    setTimeout(nextQuestion, 1000);
  } else if (attempts < level) {
    document.getElementById("result").innerText = "Try again!";
    document.getElementById("message").innerText = `${level - attempts} attempts left.`;
  } else {
    document.getElementById("result").innerText = "No more tries.";
    document.getElementById("message").innerText = `The correct answer was ${capitalToGuess}.`;
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
