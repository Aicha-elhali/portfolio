export interface HangmanState {
  wordToGuess: string;
  hiddenWord: string[];
  guessedLetters: Set<string>;
  errors: number;
  maxErrors: number;
  isGameOver: boolean;
  isWin: boolean;
}
