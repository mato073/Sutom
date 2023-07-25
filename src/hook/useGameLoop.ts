import React from 'react'

import { board } from '../types/board'
import { letter, LETTER } from '../types/letter'
import { errorType, ERROR } from '../types/error'
import { playerWinType, PLAYER_WIN } from '../types/playerWin'
import { languageNameType, LANGUAGES_NAME } from '../types/language'

import { api } from '../utils/api'


type defaultGameSettingsType = {
    difficulty: number,
    language: languageNameType,
    attempt: number,
    board: board,
    playerWin: playerWinType,
    currentAttempt: number,
    currentWord: string,
    maxAttempt: number,
}

const defaultGameSettings: defaultGameSettingsType = {
    difficulty: 5,
    language: LANGUAGES_NAME.EN,
    attempt: 5,
    board: [],
    playerWin: PLAYER_WIN.DEFAULT,
    currentAttempt: 1,
    currentWord: "",
    maxAttempt: 5,
}

const useGameLoop = () => {

    const [gameSettings, setGameSettings] = React.useState<defaultGameSettingsType>({
        difficulty: defaultGameSettings.difficulty,
        language: defaultGameSettings.language,
        attempt: defaultGameSettings.attempt,
        board: defaultGameSettings.board,
        playerWin: defaultGameSettings.playerWin,
        currentAttempt: defaultGameSettings.currentAttempt,
        currentWord: defaultGameSettings.currentWord,
        maxAttempt: defaultGameSettings.maxAttempt,
    });

    const [error, setError] = React.useState<errorType>(ERROR.DEFAULT);
    const [gameStarted, setGameStarted] = React.useState(false);

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


    React.useEffect(() => {
        if (gameStarted && gameSettings.currentAttempt <= gameSettings.maxAttempt) {
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [gameStarted, handleKeyDown, gameSettings.currentAttempt]);

    React.useEffect(() => {
        if (gameSettings.currentAttempt > gameSettings.maxAttempt) {
            setGameSettings((prev: defaultGameSettingsType) => ({
                ...prev,
                playerWin: PLAYER_WIN.LOSE
            }));
        }
    }, [gameSettings.currentAttempt, gameSettings.maxAttempt]);

    React.useEffect(() => {
        setError(() => ERROR.DEFAULT);
    }, [error])

    return {
        gameStarted,
        startGame,
        board: gameSettings.board,
        playerPlay,
        playerDel,
        setCurrentAttempt: setGameSettings,
        playerSubmit,
        playerWin: gameSettings.playerWin,
        error,
        wordLength: gameSettings.currentWord.length,
        restartGame,
        stopGame,
        wordToGuess: gameSettings.currentWord,
    }
}

export default useGameLoop