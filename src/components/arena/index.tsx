import React from 'react';

import Board from '../board';
import Keyboard from '../keyboard';

import { board } from '../../types/board'

import './index.scss'


interface Props {
    board: board,
    playerPlay: (letter: string) => void,
    playerDel: () => void,
    playerSubmit: () => void,
}

const Arena = React.memo(({ board, playerPlay, playerDel, playerSubmit }: Props) => {

    return (
        <div className='arena'>
            <Board board={board} />
            <Keyboard
                playerPlay={playerPlay}
                playerDel={playerDel}
                playerSubmit={playerSubmit}
            />
        </div>
    );
})

export default Arena;