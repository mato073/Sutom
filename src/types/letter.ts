export const enum LETTER {
    UNSET = "unset",
    CORRECT = "correct",
    WRONG_PLACE = "wrong_place",
    INCORRECT = "incorrect",
}

export type letterType = typeof LETTER[keyof typeof LETTER];


export type letter = {
    letter: string,
    isCorrect: letterType,
}
