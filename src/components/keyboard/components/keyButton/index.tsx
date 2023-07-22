import React from 'react';


interface Props {
    index: number;
    item: string;
    playerPlay: (letter: string) => void;
}

const KeyButton = React.memo(({ index, item, playerPlay }: Props) => {

    const playerPlayCallBack = React.useCallback(() => {
        playerPlay(item);
    }, [item, playerPlay])

    return (
        <button onClick={playerPlayCallBack} key={index}>{item}</button>
    )
})

export default KeyButton