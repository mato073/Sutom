import React from "react";
import Arrow from "../assets/arrow";
import './index.scss'

import KeyButton from './components/keyButton'


const keyborder = {
    row1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    row2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    row3: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
};

interface Props {
    playerDel: () => void;
    playerPlay: (letter: string) => void;
}



const Keyboard = React.memo(({ playerDel, playerPlay }: Props) => {

    const playerDelCallBack = React.useCallback(() => {
        playerDel();
    }, [playerDel])

    /*     const playerValidateCallBack = React.useCallback(() => {
            playerValidate();
        }, [playerValidate]) */


    return (
        <div>
            <div className="row1">
                {keyborder.row1.map((item, index) => {
                    return <KeyButton playerPlay={playerPlay} item={item} index={index} key={index} />
                }
                )}
                <div>
                    <button onClick={playerDelCallBack}>
                        <span>
                            <Arrow direction="left" size={15} />
                        </span>
                        Backspace
                    </button>
                </div>
            </div>
            <div className="row2">
                {keyborder.row2.map((item, index) => {
                    return <KeyButton playerPlay={playerPlay} item={item} index={index} key={index} />
                }
                )}
                <div>
                    <button>Validate</button>
                </div>
            </div>
            <div className="row3">
                {keyborder.row3.map((item, index) => {
                    return <KeyButton playerPlay={playerPlay} item={item} index={index} key={index} />
                }
                )}
            </div>
        </div>
    )
})

export default Keyboard