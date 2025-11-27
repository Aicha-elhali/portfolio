"use strict";
const readlineSync = require('readline-sync');
// Aufgabe 1
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
// wrapper so later calls work
function chooseRandomWord(arr) {
    return getRandomElement(arr);
}
// Aufgabe 2 (generic code)
function filterLongWords(words, maxLength) {
    return words.filter(word => word.length <= maxLength);
}
// Aufgabe 3 – returns an Array (not string)
// Initially caused a bug: first returned a string like "_ _ _", instead of an array, which also made Aufgabe 4 not run.
// Fix -> Fixed by using Array.from(word, () => '_') to create an array of underscores, one per letter.
function createHiddenWordArray(word) {
    return Array.from(word, () => '_');
}
// wrapper 
function createHiddenWord(word) {
    return createHiddenWordArray(word);
}
// helper
function formatHiddenWord(arr) {
    return `[ ${arr.join(', ')} ]`;
}
// Aufgabe 4
function updateHiddenWord(originalWord, hiddenArray, guessedLetter) {
    const updated = [...hiddenArray];
    const g = guessedLetter.toLocaleLowerCase('de-DE');
    for (let i = 0; i < originalWord.length; i++) {
        if (originalWord[i].toLocaleLowerCase('de-DE') === g) {
            updated[i] = originalWord[i];
        }
    }
    return updated;
}
// Aufgabe 5.1
function testReadline() {
    const name = readlineSync.question('Name: ');
    console.log(`Hello ${name}, Do you think you can beat this game?`);
}
// Aufgabe 5.2 — getWords (uses generic filterLongWords)
function getWords() {
    const words = [];
    let count;
    // number of words
    do {
        const input = readlineSync.question('How many words do you want to enter? ');
        count = parseInt(input, 10);
        if (Number.isNaN(count) || count <= 0) {
            console.log('Please enter a valid number greater than 0.');
        }
    } while (Number.isNaN(count) || count <= 0);
    // Allow only letters (incl. German umlauts)
    const wordRegex = /^[A-Za-zÄÖÜäöüß]+$/;
    // Collect all words
    for (let i = 0; i < count; i++) {
        let word;
        do {
            word = readlineSync.question(`Enter word ${i + 1}: `);
            if (!wordRegex.test(word)) {
                console.log('Only letters are allowed (including äöüÄÖÜß). Try again.');
            }
            else if (word.length > 12) {
                console.log('The word may have at most 12 letters. Try again.');
            }
        } while (!wordRegex.test(word) || word.length > 12);
        words.push(word);
    }
    //use of Aufgabe 2 helper
    const filteredWords = filterLongWords(words, 12);
    console.log('\nAccepted words (≤ 12 letters):', filteredWords);
    return filteredWords;
}
// MAIN
function main() {
    console.log('--- Hangman ---');
    // a) player enters words
    const userWords = getWords();
    // b) print a random word
    const randomWord = chooseRandomWord(userWords);
    console.log('Random word:', randomWord);
    // c) mask "airplane"
    const demoWord = 'airplane';
    let hiddenDemo = createHiddenWord(demoWord);
    console.log('\nExample: mask "airplane":', formatHiddenWord(hiddenDemo));
    // d) reveal "a"
    hiddenDemo = updateHiddenWord(demoWord, hiddenDemo, 'a');
    console.log('After revealing "a":', formatHiddenWord(hiddenDemo));
    // e) ask to start
    const startGame = readlineSync.question('\nStart game? (y/n): ');
    if (startGame.toLocaleLowerCase('de-DE') !== 'y') {
        console.log('Game Quit. Bye!');
        return;
    }
    // f–i) game sessions 
    let playAgain = true;
    while (playAgain) {
        // f) choose a random word from the entered list
        const wordToGuess = chooseRandomWord(userWords);
        // init
        let hiddenWord = createHiddenWord(wordToGuess);
        let errors = 0;
        const maxErrors = 11; // lose at 11
        const guessed = new Set();
        console.log('\nA new word has been selected!');
        console.log(`The word has ${wordToGuess.length} letters.`);
        console.log(formatHiddenWord(hiddenWord));
        // g) guessing loop
        const guessRegex = /^[A-Za-zÄÖÜäöüß]$/;
        while (errors < maxErrors && hiddenWord.includes('_')) {
            const input = readlineSync.question('Enter one letter: ');
            const guess = input.trim();
            if (!guessRegex.test(guess) || guess.length !== 1) {
                console.log('Please enter a single letter (including äöüÄÖÜß).');
                continue;
            }
            const lower = guess.toLocaleLowerCase('de-DE');
            if (guessed.has(lower)) {
                console.log('You already tried that letter. Choose another one.');
                continue;
            }
            guessed.add(lower);
            if (wordToGuess.toLocaleLowerCase('de-DE').includes(lower)) {
                hiddenWord = updateHiddenWord(wordToGuess, hiddenWord, guess);
                console.log('Hit!', formatHiddenWord(hiddenWord));
            }
            else {
                errors++;
                console.log(`Miss! You have ${maxErrors - errors} tries left.`);
            }
        }
        // h) end of round
        if (!hiddenWord.includes('_')) {
            console.log(`Congrats! You guessed "${wordToGuess}".`);
        }
        else {
            console.log(`Game Over! The word was "${wordToGuess}".`);
        }
        // i) if player wants to play again
        const again = readlineSync.question('\nPlay again? (y/n): ');
        playAgain = again.toLocaleLowerCase('de-DE') === 'y';
    }
    console.log('Game Quit. Bye!');
}
main();
