import React from 'react';

type endGameModal = {
    win: "" | "win" | "lose",
    /*  newGame: () => void, */
}


const EndGameModal = ({ win,/*  newGame  */ }: endGameModal) => {
    if (win === "win") {
        return <>
            <h1 className='modal-content-title win'>Congratulation</h1>
            <div className='modal-content-image-container' >
                <img src='https://media1.giphy.com/media/3kD720zFVu22rfIA0s/giphy.gif?cid=ecf05e479w5fqwuk3vg5m5j4od2m27utkhlcozvcaoie42ii&rid=giphy.gif&ct=g'></img>
            </div>
            <button className='modal-content-button' type='button' /* onClick={newGame} */>New game</button>
        </>
    }
    else {
        return <>
            <h1 className='modal-content-title loose'>Game Over</h1>
            <div className='modal-content-image-container' >
                <img src='https://media4.giphy.com/media/0laTZoLJHVHTwiag6Q/giphy.gif?cid=ecf05e47n2ns4ufs2hpuhp25q1b3io7gd2gjg71lz95abnrl&rid=giphy.gif&ct=g'></img>
            </div>
            <button className='modal-content-button' type='button' /* onClick={newGame} */>New game</button>
        </>
    }
}

export default EndGameModal;