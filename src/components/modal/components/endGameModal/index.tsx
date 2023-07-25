import React from 'react';
import './index.scss'

import { PLAYER_WIN, playerWinType } from '../../../../types/playerWin';

type endGameModal = {
    win: playerWinType,
    restartGame: () => void,
    stopGame: () => void,
    wordToGuess: string
}


const EndGameModal = React.memo(({ win, restartGame, stopGame, wordToGuess }: endGameModal) => {

    const restartGameCallback = React.useCallback(() => {
        restartGame();
    }, [restartGame])


    return (
        <div className='endGameModal'>

            {
                win === PLAYER_WIN.WIN ?
                    <div className='endGameModal__content'>
                        <h3 className='modal-content-title win'>Congratulation !</h3>
                        <div className='modal-content-image-container' >
                            <img src='https://media1.giphy.com/media/3kD720zFVu22rfIA0s/giphy.gif?cid=ecf05e479w5fqwuk3vg5m5j4od2m27utkhlcozvcaoie42ii&rid=giphy.gif&ct=g'></img>
                        </div>
                    </div>
                    :
                    <div className='endGameModal__content'>
                        <h3 className='modal-content-title lose'>Game Over</h3>
                        <h4 className='modal-content-subtitle'>The word to guess was: {wordToGuess}</h4>
                        <div className='modal-content-image-container' >
                            <img src='https://media4.giphy.com/media/0laTZoLJHVHTwiag6Q/giphy.gif?cid=ecf05e47n2ns4ufs2hpuhp25q1b3io7gd2gjg71lz95abnrl&rid=giphy.gif&ct=g'></img>
                        </div>
                    </div>
            }
            <div className='endGameModal__actions'>
                <button onClick={stopGame} className="endGameModal__actions__menu" >
                    Menu
                </button>
                <button onClick={restartGameCallback} className="endGameModal__actions__restart" >
                    Restart
                </button>
            </div>
        </div>
    )
})

export default EndGameModal;