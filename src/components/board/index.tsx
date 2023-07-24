import React, { memo } from 'react'


import { board } from '../../types/board'
import { letter } from '../../types/letter'



import './index.scss'

interface Props {
    board: board
}

type Colors = {
    [key: string]: string
}


const colors: Colors = {
    "unset": '',
    "correct": 'green',
    "wrong place": 'yellow',
    "incorrect": 'red',

}


const Board = memo<Props>(({ board }) => {

    const [boardState, setBoardState] = React.useState<board>(board);

    React.useEffect(() => {
        setBoardState(() => [...board]);
    }, [board]);


    return <div>
        {
            boardState.map((row, index) => {
                return <div key={index} className="attempts">
                    {
                        row.map((letter: letter, index2: number) => {
                            return <div key={index2} className={`attempts__letter ${colors[letter.isCorrect]}`}>
                                <span>{letter.letter}</span>
                            </div>
                        })
                    }
                </div>
            }
            )
        }
    </div>

})

export default Board;