import React from 'react'
import axios from 'axios'

import { board } from '../types/board'
import { letter } from '../types/letter'
import { error } from '../types/error'
import { playerWin } from '../types/playerWin'


type StartGame = {
    difficulty: number,
    language: "en" | "es" | "it" | "de",
    attempt: number
}


const useGameLoop = () => {

    const [gameStarted, setGameStarted] = React.useState(false);
    const [currentAttempt, setCurrentAttempt] = React.useState(1);
    const [maxAttempt, setMaxAttempt] = React.useState(5);
    const [currentWord, setCurrentWord] = React.useState('');
    const [board, setBoard] = React.useState<board>([]);
    const [playerWin, setPlayerWin] = React.useState<playerWin>("");
    const [error, setError] = React.useState<error>("");
    const [gameSettings, setGameSettings] = React.useState<StartGame>({
        difficulty: 5,
        language: "en",
        attempt: 5,
    });


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
        setBoard((prev: board) => {
            const newBoard = [...prev];
            const row = [...newBoard[currentAttempt - 1]];
            const lastKeyPlayedIndex = row.findIndex((item: letter) => item.letter === '');
            if (lastKeyPlayedIndex !== -1) {
                row[lastKeyPlayedIndex].letter = letter;
                newBoard[currentAttempt - 1] = row;
            }
            return newBoard;
        });
    }

    const playerDel = () => {
        setBoard((prev: board) => {
            const newBoard = [...prev]; // Create a new copy of the board
            const currentRow = newBoard[currentAttempt - 1];
            const lastKeyPlayedIndex = currentRow.findIndex((letter: letter) => letter.letter === '');

            if (lastKeyPlayedIndex !== 0) {
                lastKeyPlayedIndex === -1
                    ? currentRow[currentRow.length - 1].letter = ''
                    : currentRow[lastKeyPlayedIndex - 1].letter = '';

                newBoard[currentAttempt - 1] = currentRow; // Update the corresponding row
            }
            return newBoard;
        });
    }

    const playerSubmit = () => {
        const word = board[currentAttempt - 1].map((letter: letter) => letter.letter).join('');

        if (word.length < currentWord.length) {
            setError(() => "not enouth letters");
            return;
        }
        if (word === currentWord) {
            setPlayerWin(() => "win");
        }
        else {
            const splittedWord = currentWord.split('');
            const row = board[currentAttempt - 1].map((letter, index) => {
                const existedLetterIndex = splittedWord.findIndex((item) => item === letter.letter);
                if (existedLetterIndex !== -1 && index === existedLetterIndex) {
                    splittedWord[existedLetterIndex] = '';
                    letter.isCorrect = "correct";
                }
                else if (existedLetterIndex !== -1 && index !== existedLetterIndex) {
                    splittedWord[existedLetterIndex] = '';
                    letter.isCorrect = "wrong place";
                }
                else {
                    letter.isCorrect = "incorrect";
                }
                return letter;
            })
            setBoard((prev: board) => {
                const newBoard = [...prev];
                newBoard[currentAttempt - 1] = row;
                return newBoard;
            })
            setCurrentAttempt((prev: number) => prev + 1);
        }
    }



    const startGame = async (
        difficulty: number,
        language: "en" | "es" | "it" | "de",
        attempt: number) => {

        const url = `https://random-word-api.herokuapp.com/word`;
        const params: { "length": number, "lang"?: string } = { "length": difficulty };
        if (language !== "en") params['lang'] = language;
        const { data } = await axios.get(url, {
            params: params
        });
        console.log(data);
        setCurrentWord(() => data[0].toUpperCase());
        const wordLength = data[0].length;
        const newBoard: board = Array.from({ length: attempt }, () =>
            Array.from({ length: wordLength }, () => ({ letter: '', isCorrect: "unset" }))
        );
        setMaxAttempt(() => attempt);
        setBoard(() => newBoard);
        setGameStarted(() => true);
        setGameSettings(() => ({ difficulty, language, attempt }));
    }

    const restartGame = () => {
        setCurrentAttempt(() => 1);
        setBoard(() => []);
        setPlayerWin(() => "");
        startGame(gameSettings.difficulty, gameSettings.language, gameSettings.attempt);
    }

    const stopGame = () => {
        setCurrentAttempt(() => 1);
        setBoard(() => []);
        setPlayerWin(() => "");
        setGameStarted(() => false);
    }


    React.useEffect(() => {
        if (gameStarted) {
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [gameStarted, handleKeyDown]);

    React.useEffect(() => {
        if (currentAttempt > maxAttempt) {
            setPlayerWin(() => "lose");
        }
    }, [currentAttempt, maxAttempt]);

    React.useEffect(() => {
        setError(() => "");
    }, [error])

    return {
        gameStarted,
        startGame,
        board,
        playerPlay,
        playerDel,
        setCurrentAttempt,
        playerSubmit,
        playerWin,
        error,
        wordLength: currentWord.length,
        restartGame,
        stopGame
    }
}

export default useGameLoop