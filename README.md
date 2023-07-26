# SUTOM - Word Guessing Game

<p align="center">
  <img src="screenshot/screenshot3.png" alt="Screenshot 3">
</p>

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Features](#features)
5. [Technologies Used](#technologies-used)
6. [Code Examples](#code-examples)
7. [Project Hierachy](#Project-hierachy)
8. [Screenshots](#screenshots)

## Description

SUTOM is a fun word guessing game inspired by the TV show "Motus." The objective of the game is to guess a word within a certain number of attempts. Players can choose the difficulty of the word, the language, and the number of attempts they have to find the word. They can type letters on their keyboard or use the virtual keyboard provided in the app to make their guesses.

## Installation

To run the game on your local machine, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository to your local machine.
3. Open your terminal/command prompt and navigate to the project's root directory.
4. Run the following commands:

```bash
npm install
npm run dev
```

The game should now be accessible at http://localhost:5173 in your web browser.

## Usage

1. Launch the game using the instructions provided in the installation section.
2. In the main menu, select the difficulty level, language, and number of attempts for the game.
3. Start guessing the word by typing letters on your keyboard or using the virtual keyboard provided in the app.
4. If you correctly guess the word, a success modal will be displayed. Otherwise, a game over modal will appear.
5. After the game ends, you can choose to start a new game with the same settings or go back to the main menu.
6. If you attempt to submit a word with fewer letters than the target word, a notification will be displayed.

## Features
- Choose the difficulty level and language of the word to guess.
- Play the game with a set number of attempts to find the word.
- Interactive virtual keyboard for easier guessing.
- Game Over and Success modals for different game outcomes.

## Technologies Used
- Vite.js
- React.js
- SCSS
- Axios


## Code Examples

The custom hook useGameLoop is the core of the game and manages the game's logic. 
The functions of the hook

<details>
<summary>Click to expand</summary>

```js
   const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            playerDel();
        }
        else if (e.key === 'Enter') {
            playerSubmit();
        }
        else if (/^[a-zA-Z]$/.test(e.key)) {
            playerPlay(e.key.toUpperCase());
        }
    }

    const playerPlay = (letter: string) => {
        setGameSettings((prev: defaultGameSettingsType) => {
            const newBoard = [...prev.board];
            const row = [...newBoard[prev.currentAttempt - 1]];
            const lastKeyPlayedIndex = row.findIndex((item: letter) => item.letter === '');
            if (lastKeyPlayedIndex !== -1) {
                row[lastKeyPlayedIndex].letter = letter;
                newBoard[prev.currentAttempt - 1] = row;
            }
            return {
                ...prev,
                board: newBoard
            }
        });
    }

    const playerDel = () => {
        setGameSettings((prev: defaultGameSettingsType) => {
            const newBoard = [...prev.board];
            const currentRow = newBoard[prev.currentAttempt - 1];
            const lastKeyPlayedIndex = currentRow.findIndex((letter: letter) => letter.letter === '');

            if (lastKeyPlayedIndex !== 0) {
                lastKeyPlayedIndex === -1
                    ? currentRow[currentRow.length - 1].letter = ''
                    : currentRow[lastKeyPlayedIndex - 1].letter = '';

                newBoard[gameSettings.currentAttempt - 1] = currentRow;
            }
            return {
                ...prev,
                board: newBoard
            };
        });
    }


    const playerSubmit = () => {
        const word = gameSettings.board[gameSettings.currentAttempt - 1].map((letter: letter) => letter.letter).join('');
        if (word.length < gameSettings.currentWord.length) {
            setError(() => ERROR.NOT_ENOUGH_LETTERS);
            return;
        }
        if (word === gameSettings.currentWord) {
            setGameSettings((prev: defaultGameSettingsType) => ({
                ...prev,
                playerWin: PLAYER_WIN.WIN
            }));
        }
        else {
            const splittedWord = gameSettings.currentWord.split('');
            const row = gameSettings.board[gameSettings.currentAttempt - 1].map((letter, index) => {
                const existedLetterIndex = splittedWord.findIndex((item) => item === letter.letter);
                if (existedLetterIndex !== -1 && index === existedLetterIndex) {
                    splittedWord[existedLetterIndex] = '';
                    letter.isCorrect = LETTER.CORRECT;
                }
                else if (existedLetterIndex !== -1 && index !== existedLetterIndex) {
                    splittedWord[existedLetterIndex] = '';
                    letter.isCorrect = LETTER.WRONG_PLACE;
                }
                else {
                    letter.isCorrect = LETTER.INCORRECT;
                }
                return letter;
            })
            setGameSettings((prev: defaultGameSettingsType) => {
                const newBoard = [...prev.board];
                newBoard[prev.currentAttempt - 1] = row;
                return {
                    ...prev,
                    board: newBoard,
                    currentAttempt: prev.currentAttempt + 1
                }
            })
        }
    }
    const startGame = async (
        difficulty: number,
        language: languageNameType,
        attempt: number) => {

        const data = await api(difficulty, language, attempt);
        const wordLength = data.length;
        const newBoard: board = Array.from({ length: attempt }, () =>
            Array.from({ length: wordLength }, () => ({ letter: '', isCorrect: LETTER.UNSET }))
        );
        setGameSettings(() => ({
            difficulty,
            language,
            attempt,
            board: newBoard,
            playerWin: PLAYER_WIN.DEFAULT,
            currentAttempt: 1,
            currentWord: data.toUpperCase(),
            maxAttempt: attempt,
        }));
        setGameStarted(() => true);
    }

    const restartGame = () => {
        startGame(gameSettings.difficulty, gameSettings.language, gameSettings.attempt);
    }

    const stopGame = () => {
        setGameStarted(() => false);
    }
```
</details>

## Project hierachy

```bash
├── App.tsx
├── components
│   ├── arena
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── assets
│   │   ├── arrow.tsx
│   │   └── icon
│   │       └── flags
│   │           ├── china.png
│   │           ├── germany.png
│   │           ├── italy.png
│   │           ├── spain.png
│   │           ├── united-kingdom.png
│   │           └── united-states.png
│   ├── board
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── game
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── keyboard
│   │   ├── components
│   │   │   └── keyButton
│   │   │       └── index.tsx
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── menu
│   │   ├── components
│   │   │   ├── attempt
│   │   │   │   └── index.tsx
│   │   │   └── languagesDisplay
│   │   │       └── index.tsx
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── modal
│   │   ├── components
│   │   │   └── endGameModal
│   │   │       ├── index.scss
│   │   │       └── index.tsx
│   │   ├── index.scss
│   │   └── index.tsx
│   └── notification
│       ├── index.scss
│       └── index.tsx
├── hook
│   └── useGameLoop.ts
├── index.scss
├── main.tsx
├── scss
│   └── _variable.scss
├── types
│   ├── board.ts
│   ├── error.ts
│   ├── language.ts
│   ├── letter.ts
│   └── playerWin.ts
├── utils
│   ├── api.ts
│   └── notificationAction.ts
└── vite-env.d.ts
```

## Screenshots

![](screenshot/screenshot1.png)
![](screenshot/screenshot2.png)



