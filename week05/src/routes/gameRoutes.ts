import { Router } from "express";
import { games } from "../storage/games";
import { words, usedWords } from "../storage/words";
import {
  MAX_ERRORS,
  createHiddenWord,
  updateHiddenWord,
  chooseRandomWord,
} from "../game/HangmanLogic";

const router = Router();


// Start game
router.post("/start", (req, res) => {
  const available = words.filter(w => !usedWords.includes(w));

  if (available.length === 0) {
    return res.status(400).json({
      error: "No unused words available. Please add new words!"
    });
  }

  const word = chooseRandomWord(available);
  usedWords.push(word);

  const gameId = Math.random().toString(36).substring(2, 9);

  const state = {
    wordToGuess: word,
    hiddenWord: createHiddenWord(word),
    guessedLetters: new Set(),
    errors: 0,
    maxErrors: MAX_ERRORS,
    isGameOver: false,
    isWin: false,
  };

  games.set(gameId, state);

  res.json({ gameId, state });
});


// Guess letter
router.post("/guess", (req, res) => {
  const { gameId, letter } = req.body;
  const game = games.get(gameId);

  if (!game) return res.status(404).json({ error: "Game not found" });

  if (game.guessedLetters.has(letter)) {
    return res.json({ state: game, message: "already-used" });
  }

  game.guessedLetters.add(letter);

  let hit = false;

  if (game.wordToGuess.toLowerCase().includes(letter.toLowerCase())) {
    game.hiddenWord = updateHiddenWord(game.wordToGuess, game.hiddenWord, letter);
    hit = true;
  } else {
    game.errors++;
  }

  game.isWin = !game.hiddenWord.includes("_");
  game.isGameOver = game.isWin || game.errors >= game.maxErrors;


  const correctWord = game.isGameOver ? game.wordToGuess : null;

  res.json({
    state: {
      ...game,
      correctWord,   
    },
    hit,
    message: hit ? "hit" : "miss",
  });
});


// PLAY AGAIN
router.post("/play-again", (req, res) => {
  const { gameId } = req.body;

  const game = games.get(gameId);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const available = words.filter(w => !usedWords.includes(w));

  if (available.length === 0) {
    return res.status(400).json({
      error: "No unused words left. Please add more words!"
    });
  }

  const newWord = chooseRandomWord(available);
  usedWords.push(newWord);

  // Reset state
  game.wordToGuess = newWord;
  game.hiddenWord = createHiddenWord(newWord);
  game.guessedLetters = new Set();
  game.errors = 0;
  game.isGameOver = false;
  game.isWin = false;

  res.json({
    message: "new-round",
    state: game
  });
});

export default router;
