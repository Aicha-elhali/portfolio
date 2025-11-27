const wordInput = document.getElementById("wordInput");
const addBtn = document.getElementById("addBtn");
const startBtn = document.getElementById("startBtn");
const wordList = document.getElementById("wordList");
const msg = document.getElementById("msg");  

// Frontend regex 
const WORD_REGEX = /^[A-Za-zÄÖÜäöüß]+$/;

// Load all words 
async function loadWords() {
  const res = await fetch("/api/words/list");
  const list = await res.json();
  renderList(list);
}

// Render words with delete buttons 
function renderList(list) {
  wordList.innerHTML = "";

  list.forEach(word => {
    const item = document.createElement("span");
    item.className = "word-item";

    const text = document.createElement("span");
    text.innerText = word + " ";

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteWord(word);

    item.appendChild(text);
    item.appendChild(delBtn);

    wordList.appendChild(item);
  });
}

// Add a word 
addBtn.onclick = async () => {
  const word = wordInput.value.trim();
  msg.innerText = ""; // Reset message

  if (!word) {
    msg.innerText = "Please enter a word.";
    msg.style.color = "red";
    return;
  }

  if (!WORD_REGEX.test(word)) {
    msg.innerText = "Only letters allowed (A-Z, äöüß).";
    msg.style.color = "red";
    return;
  }

  if (word.length > 12) {
    msg.innerText = "Word must be max. 12 characters.";
    msg.style.color = "red";
    return;
  }

  // send to backend
  const res = await fetch("/api/words/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word })
  });

  const data = await res.json();

  if (data.error) {
    msg.innerText = data.error;
    msg.style.color = "red";
    return;
  }

  msg.innerText = "Word added!";
  msg.style.color = "green";

  wordInput.value = "";
  loadWords();
};

// Delete a word 
async function deleteWord(word) {
  await fetch(`/api/words/delete/${word}`, {
    method: "DELETE"
  });

  msg.innerText = "Word deleted.";
  msg.style.color = "orange";

  loadWords();
}

// Start Game 
startBtn.onclick = async () => {
  const res = await fetch("/api/words/list");
  const list = await res.json();

  if (list.length === 0) {
    msg.innerText = "Add at least one word before starting the game!";
    msg.style.color = "red";
    return;
  }

  window.location.href = "/index.html";
};

// Load words on page load 
loadWords();
