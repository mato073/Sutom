import React, { memo } from 'react'


import { board } from '../../types/board'
import { letter, LETTER } from '../../types/letter'



import './index.scss'

interface Props {
    board: board
}

type Colors = {
    [key: string]: string
}


const colors: Colors = {
    [LETTER.UNSET]: '',
    [LETTER.CORRECT]: 'green',
    [LETTER.WRONG_PLACE]: 'yellow',
    [LETTER.INCORRECT]: 'red',

}




const Board = memo<Props>(({ board }) => {

    const [boardState, setBoardState] = React.useState<board>(board);

    React.useEffect(() => {
        setBoardState(() => [...board]);
    }, [board]);


    return <div className='board'>
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