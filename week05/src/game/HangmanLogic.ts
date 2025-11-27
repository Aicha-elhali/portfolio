export const LOCALE = "de-DE";
export const MAX_ERRORS = 11;
export const WORD_REGEX = /^[A-Za-zÄÖÜäöüß]+$/;
export const GUESS_REGEX = /^[A-Za-zÄÖÜäöüß]$/;

export function chooseRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function createHiddenWord(word: string): string[] {
  return Array.from(word, () => "_");
}

export function updateHiddenWord(
  originalWord: string,
  hiddenArray: string[],
  guessedLetter: string
): string[] {
  const updated = [...hiddenArray];
  const g = guessedLetter.toLocaleLowerCase(LOCALE);

  for (let i = 0; i < originalWord.length; i++) {
    if (originalWord[i].toLocaleLowerCase(LOCALE) === g) {
      updated[i] = originalWord[i];
    }
  }
  return updated;
}
