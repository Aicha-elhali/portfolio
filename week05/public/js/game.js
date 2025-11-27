let gameId = null;


//  START GAME
async function startGame() {
  const res = await fetch("/api/game/start", { method: "POST" });
  const data = await res.json();

  gameId = data.gameId;

  resetUI();
  updateUI(data.state);
}


//  GUESS A LETTER
async function guessLetter(letter) {
  const res = await fetch("/api/game/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, letter })
  });

  const data = await res.json();
  const msg = document.getElementById("message");

  updateUI(data.state);

  // only HIT/MISS during active game
  if (!data.state.isGameOver) {
    msg.className = "message show result-animate";

    if (data.hit) {
      msg.innerText = "HIT! 😍";
      msg.classList.add("hit");
    } else {
      msg.innerText = "MISS! 😞";
      msg.classList.add("miss");
      shakeHangman();
    }
  }
}


//  UPDATE UI
function updateUI(state) {

  
  document.getElementById("hiddenWord").innerText = state.hiddenWord.join(" ");

  
  const MAX_LIVES = 12;
  document.getElementById("errors").innerText = MAX_LIVES - state.errors;

  const msg = document.getElementById("message");

  // WIN
  if (state.isWin) {
    msg.innerText = "🎉 YOU WIN!";
    msg.className = "message show result-animate win-effect";
    playAgainBtn.style.display = "block";
    disableAllLetters();
    launchConfetti();
  }

  // LOSE (Reveal Word)
  if (state.isGameOver && !state.isWin) {

    // Word reveal (Backend must send correctWord)
    const correct = state.correctWord || state.hiddenWord.join("");

    msg.innerText = `💀 YOU LOST! The word was: ${correct}`;
    msg.className = "message show result-animate lose-effect";

    // Directly show the full solved word
    document.getElementById("hiddenWord").innerText = correct.split("").join(" ");

    playAgainBtn.style.display = "block";
    disableAllLetters();
  }
}


//  UI RESET AT NEW ROUND
function resetUI() {
  const msg = document.getElementById("message");

  msg.innerText = "";
  msg.className = "message";

  playAgainBtn.style.display = "none";
  enableAllLetters();
}


//  DISABLE / ENABLE LETTERS
function disableAllLetters() {
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = true);
}

function enableAllLetters() {
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = false);
}


//  LETTER GRID (german + english)
const lettersDiv = document.getElementById("letters");
const keys = "abcdefghijklmnopqrstuvwxyzäöüß".split("");

keys.forEach(letter => {
  const btn = document.createElement("button");
  btn.innerText = letter;
  btn.onclick = () => guessLetter(letter);
  lettersDiv.appendChild(btn);
});


//  PLAY AGAIN
const playAgainBtn = document.getElementById("playAgainBtn");
playAgainBtn.style.display = "none";

playAgainBtn.onclick = playAgain;

async function playAgain() {
  const res = await fetch("/api/game/play-again", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId })
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    window.location.href = "/words.html";
    return;
  }

  resetUI();
  updateUI(data.state);
}


//  SHAKE ANIMATION 
function shakeHangman() {
  const img = document.querySelector(".hangman-img");
  if (!img) return;

  img.classList.add("shake");
  setTimeout(() => img.classList.remove("shake"), 400);
}


//  CONFETTI for win
function launchConfetti() {
  if (typeof confetti === "undefined") return;

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}


startGame();
