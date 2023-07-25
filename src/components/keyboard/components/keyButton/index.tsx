import React from 'react';


interface Props {
    item: string;
    playerPlay: (letter: string) => void;
}

const KeyButton = React.memo(({ item, playerPlay }: Props) => {

    const playerPlayCallBack = React.useCallback(() => {
        playerPlay(item);
    }, [item, playerPlay])

    return (
        <button onClick={playerPlayCallBack}>{item}</button>
    )
})

export default KeyButton