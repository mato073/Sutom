import React from 'react';

import useGameLoop from '../../hook/useGameLoop';

import Arena from '../arena';
import Menu from '../menu';
import Notification from '../notification';
import Modal from '../modal';
import EndGameModal from '../modal/components/endGameModal';

import { PLAYER_WIN } from '../../types/playerWin';
import { ERROR } from '../../types/error';

import { notificationAction } from '../../utils/notificationAction';

import './index.scss'


const Game = () => {
    const [modal, setModal] = React.useState(false);
    const {
        gameStarted,
        startGame,
        board,
        playerPlay,
        playerDel,
        playerSubmit,
        playerWin,
        error,
        wordLength,
        restartGame,
        stopGame,
        wordToGuess
    } = useGameLoop();


    const restartGameCallback = React.useCallback(() => {
        restartGame();
        setModal(false);
    }, [restartGame])

    const stopGameCallback = React.useCallback(() => {
        stopGame();
        setModal(false);
    }, [stopGame])


    React.useEffect(() => {
        if (playerWin === PLAYER_WIN.WIN || playerWin === PLAYER_WIN.LOSE) {
            setModal(true);
        }
    }, [playerWin])


    React.useEffect(() => {
        if (error === ERROR.NOT_ENOUGH_LETTERS) {
            notificationAction(`You need to play ${wordLength} letters`, 'warning');
        }
    }, [error])

    return (
        <div className='game'>
            <Modal isOpen={modal}>
                <EndGameModal  stopGame={stopGameCallback} restartGame={restartGameCallback} win={playerWin} wordToGuess={wordToGuess} />
            </Modal>
            <Notification />
            {
                gameStarted ?
                    <Arena board={board} playerPlay={playerPlay} playerDel={playerDel} playerSubmit={playerSubmit} />
                    :
                    <Menu startGame={startGame} />
            }
        </div>
    )

}

export default Game;
