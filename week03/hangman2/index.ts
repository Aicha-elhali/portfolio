// Notes: Explicit typing + TS features; comments marked with "Improvement:"

// Hoisted constants (peer review)
const LOCALE = "de-DE";
const MAX_ERRORS = 11;
const WORD_REGEX: RegExp  = /^[A-Za-zÄÖÜäöüß]+$/;
const GUESS_REGEX: RegExp = /^[A-Za-zÄÖÜäöüß]$/;


// A typed model describing the current Hangman game state
interface HangmanState {
  wordToGuess: string;         // The secret word chosen for the round
  hiddenWord: string[];        // The word in its hidden form (underscores or revealed letters)
  guessedLetters: Set<string>; // All letters already guessed by the player
  errors: number;              // Number of incorrect guesses so far
  maxErrors: number;           // Maximum allowed wrong guesses before losing
  isGameOver: boolean;         // Whether the round has ended
  isWin: boolean;              // Whether the player successfully guessed the word
}


// Improvement: Use ES module import so TS can type-check the library correctly.
import * as readlineSync from "readline-sync";

class HangmanGame {
  // --- NEW: zentraler Spielzustand ---
  private state!: HangmanState;

  // Aufgabe 1 
  // Improvement: Generic helper with explicit types replaces untyped JS utility.
  private getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // wrapper so later calls work
  private chooseRandomWord(arr: string[]): string {
    return this.getRandomElement<string>(arr);
  }

  // Aufgabe 2 (generic code) 
  // Improvement: Explicit parameter/return types (no inference) for clarity and grading.
  private filterLongWords(words: string[], maxLength: number): string[] {
    return words.filter((word: string): boolean => word.length <= maxLength);
  }

  // Aufgabe 3 – returns an Array (not string) 
  // Fix: use Array.from(word, () => '_') to create an array of underscores.
  private createHiddenWordArray(word: string): string[] {
    return Array.from<string, string>(word, (): string => "_");
  }

  // wrapper
  private createHiddenWord(word: string): string[] {
    return this.createHiddenWordArray(word);
  }

  // helper
  private formatHiddenWord(arr: string[]): string {
    return `[ ${arr.join(", ")} ]`;
  }

  // Aufgabe 4 
  // Improvement: Fully typed update function (string, string[], string) with explicit return type.
  private updateHiddenWord(
    originalWord: string,
    hiddenArray: string[],
    guessedLetter: string
  ): string[] {
    const updated: string[] = [...hiddenArray];
    const g: string = guessedLetter.toLocaleLowerCase(LOCALE);
    for (let i: number = 0; i < originalWord.length; i++) {
      if (originalWord[i].toLocaleLowerCase(LOCALE) === g) {
        updated[i] = originalWord[i];
      }
    }
    return updated;
  }

  // Aufgabe 5.1
  public testReadline(): void {
    const name: string = readlineSync.question("Name: ");
    console.log(`Hello ${name}, Do you think you can beat this game?`);
  }

  // Aufgabe 5.2 — getWords (uses generic filterLongWords) 
  public getWords(): string[] {
    const words: string[] = [];
    let count: number;

    // number of words
    do {
      const input: string = readlineSync.question("How many words do you want to enter? ");
      count = parseInt(input, 10);
      if (Number.isNaN(count) || count <= 0) {
        console.log("Please enter a valid number greater than 0.");
      }
    } while (Number.isNaN(count) || count <= 0);

    // Improvement: Strongly-typed RegExp for input validation (incl. umlauts).
    const wordRegex: RegExp = WORD_REGEX;

    // Collect all words
    for (let i: number = 0; i < count; i++) {
      let word: string;
      do {
        word = readlineSync.question(`Enter word ${i + 1}: `);
        if (!wordRegex.test(word)) {
          console.log("Only letters are allowed (including äöüÄÖÜß). Try again.");
        } else if (word.length > 12) {
          console.log("The word may have at most 12 letters. Try again.");
        }
      } while (!wordRegex.test(word) || word.length > 12);
      words.push(word);
    }

    // use of Aufgabe 2 helper
    const filteredWords: string[] = this.filterLongWords(words, 12);
    console.log("\nAccepted words (≤ 12 letters):", filteredWords);
    return filteredWords;
  }

  // MAIN 
  private main(): void {
    console.log("--- Hangman ---");

    // a) player enters words
    const userWords: string[] = this.getWords();

    // b) print a random word
    const randomWord: string = this.chooseRandomWord(userWords);
    console.log("Random word:", randomWord);

    // c) mask "airplane"
    const demoWord: string = "airplane";
    let hiddenDemo: string[] = this.createHiddenWord(demoWord);
    console.log('\nExample: mask "airplane":', this.formatHiddenWord(hiddenDemo));

    // d) reveal "a"
    hiddenDemo = this.updateHiddenWord(demoWord, hiddenDemo, "a");
    console.log('After revealing "a":', this.formatHiddenWord(hiddenDemo));

    // e) ask to start
    const startGame: string = readlineSync.question("\nStart game? (y/n): ");
    if (startGame.toLocaleLowerCase(LOCALE) !== "y") {
      console.log("Game Quit. Bye!");
      return;
    }

    // f–i) game sessions
    let playAgain: boolean = true;
    while (playAgain) {
      // f) choose a random word from the entered list
      const wordToGuess: string = this.chooseRandomWord(userWords);

      // Initialize state for this round
      this.state = {
        wordToGuess,
        hiddenWord: this.createHiddenWord(wordToGuess),
        guessedLetters: new Set<string>(),
        errors: 0,
        maxErrors: MAX_ERRORS,
        isGameOver: false,
        isWin: false,
      };

      console.log("\nA new word has been selected!");
      console.log(`The word has ${this.state.wordToGuess.length} letters.`);
      console.log(this.formatHiddenWord(this.state.hiddenWord));

      // g) guessing loop
      const guessRegex: RegExp = GUESS_REGEX;
      while (this.state.errors < this.state.maxErrors && this.state.hiddenWord.includes("_")) {
        const input: string = readlineSync.question("Enter one letter: ");
        const guess: string = input.trim();

        if (!guessRegex.test(guess) || guess.length !== 1) {
          console.log("Please enter a single letter (including äöüÄÖÜß).");
          continue;
        }

        const lower: string = guess.toLocaleLowerCase(LOCALE);
        if (this.state.guessedLetters.has(lower)) {
          console.log("You already tried that letter. Choose another one.");
          continue;
        }
        this.state.guessedLetters.add(lower);

        if (this.state.wordToGuess.toLocaleLowerCase(LOCALE).includes(lower)) {
          this.state.hiddenWord = this.updateHiddenWord(
            this.state.wordToGuess,
            this.state.hiddenWord,
            guess
          );
          console.log("HIT! 🥳", this.formatHiddenWord(this.state.hiddenWord)); // more prominent hit or miss (peer review)
        } else {
          this.state.errors++;
          console.log(`MISS! 🙁 You have ${this.state.maxErrors - this.state.errors} tries left.`); // more prominent hit or miss (peer review)
        }

        // Maintain end conditions in state
        this.state.isWin = !this.state.hiddenWord.includes("_");
        this.state.isGameOver = this.state.isWin || this.state.errors >= this.state.maxErrors;
      }

      // h) end of round 
      if (!this.state.hiddenWord.includes("_")) {
        console.log(`Congrats! You guessed "${this.state.wordToGuess}".`);
      } else {
        console.log(`Game Over! The word was "${this.state.wordToGuess}".`);
      }

      // i) if player wants to play again
      const again: string = readlineSync.question("\nPlay again? (y/n): ");
      playAgain = again.toLocaleLowerCase(LOCALE) === "y";
    }

    console.log("Game Quit. Bye!");
  }

  // public start function
  public start(): void {
    this.main();
  }
}

new HangmanGame().start();
