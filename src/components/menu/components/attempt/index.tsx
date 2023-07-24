import React from 'react';

interface Props {
    value: number;
    attempt: number;
    setAttempts: (attempts: number) => void;
}

const Attempt = React.memo<Props>(({ value, setAttempts, attempt }) => {

    const setAttemptsCallback = React.useCallback(() => {
        setAttempts(value);
    }, [setAttempts, value])


    return <div onClick={setAttemptsCallback} className={`form__attempt__selection__item ${attempt === value ? 'active' : ""}`}>
        <span>{value}</span>
    </div>
})

export default Attempt;