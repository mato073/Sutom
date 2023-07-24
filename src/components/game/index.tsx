import React from 'react';

import useGameLoop from '../../hook/useGameLoop';
import Board from '../board';
import Keyboard from '../keyboard';
import Menu from '../menu';
import Notification from '../notification';
import Modal from '../modal';
import EndGameModal from '../modal/components/endGameModal';
import Arrow from "../assets/arrow";

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
        stopGame
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
        if (playerWin === 'win' || playerWin === 'lose') {
            setModal(true);
        }
    }, [playerWin])


    React.useEffect(() => {
        if (error === "not enouth letters") {
            notificationAction(`You need to play ${wordLength} letters`, 'warning');
        }
    }, [error])

    return (
        <div className='game'>
            <Modal isOpen={modal}>
                <EndGameModal stopGame={stopGameCallback} restartGame={restartGameCallback} win={playerWin} />
            </Modal>
            <Notification />
            {
                gameStarted ?
                    <>
                        <Board board={board} />
                        <Keyboard playerPlay={(letter: string) => playerPlay(letter)} playerDel={playerDel} playerSubmit={playerSubmit} />
                    </>

                    :
                    <Menu startGame={startGame} />
            }
        </div>
    )

}

export default Game;
