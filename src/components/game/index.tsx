import React from 'react';

import useGameLoop from '../../hook/useGameLoop';
import Board from '../board';
import Keyboard from '../keyboard';
import Menu from '../menu';
import Notification from '../notification';
import Modal from '../modal';
import EndGameModal from '../modal/components/endGameModal';

import { notificationAction } from '../../utils/notificationAction';


const Game = () => {
    const [modal, setModal] = React.useState(false);
    const { gameStarted, startGame, board, playerPlay, playerDel, playerSubmit, playerWin, error } = useGameLoop();


    React.useEffect(() => {
        if (playerWin === 'win' || playerWin === 'lose') {
            setModal(true);
        }
    }, [playerWin])


    React.useEffect(() => {
        if (error === "not enouth letters") {
            notificationAction('You need to play at least 3 letters', 'warning');
        }
    }, [error])


    return (
        <div>
            <Modal isOpen={modal} onClose={() => { }}>
                <EndGameModal win={playerWin} /* newGame={() => { }} */ />
            </Modal>
            <Notification />
            {
                gameStarted ?
                    <>
                        <Board board={board} />
                        <Keyboard playerPlay={(letter: string) => playerPlay(letter)} playerDel={playerDel} />
                        <button onClick={() => playerSubmit()}>Submit</button>
                    </>

                    :
                    <Menu startGame={(difficulty: number, language: string, attempts: number) => startGame(difficulty, language, attempts)} />
            }
        </div>
    )

}

export default Game;
