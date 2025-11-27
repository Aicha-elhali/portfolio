import { Router } from "express";
import { words, usedWords } from "../storage/words";
import { WORD_REGEX } from "../game/HangmanLogic";

const router = Router();


// Add word
router.post("/add", (req, res) => {
  const { word } = req.body;

  if (!word || typeof word !== "string") {
    return res.status(400).json({ error: "Please enter a word." });
  }

  const w = word.trim();

  // Only letters (A–Z, äöüß)
  if (!WORD_REGEX.test(w)) {
    return res.status(400).json({ error: "Only letters allowed (A-Z, äöüß)." });
  }

  
  if (w.length > 12) {
    return res.status(400).json({ error: "Max length is 12 characters." });
  }

  // Prevent duplicates
  if (words.some(existing => existing.toLowerCase() === w.toLowerCase())) {
    return res.status(400).json({ error: "Word already exists." });
  }

  words.push(w);
  res.json({ success: true, words });
});


// List words
router.get("/list", (_req, res) => {
  res.json(words);
});


// Delete word
router.delete("/delete/:word", (req, res) => {
  const word = req.params.word.toLowerCase();

  const index = words.findIndex(w => w.toLowerCase() === word);
  if (index === -1) {
    return res.status(404).json({ error: "Word not found." });
  }

  
  const removed = words.splice(index, 1)[0];

  
  const usedIndex = usedWords.findIndex(w => w.toLowerCase() === removed.toLowerCase());
  if (usedIndex !== -1) {
    usedWords.splice(usedIndex, 1);
  }

  res.json({ words });
});


export default router;
