export enum ERROR {
    DEFAULT = "",
    NOT_ENOUGH_LETTERS = "missing_Letters",
}

export type errorType = typeof ERROR[keyof typeof ERROR];

export type error = errorType
