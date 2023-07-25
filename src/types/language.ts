
export enum LANGUAGES_NAME {
    EN = "en",
    ES = "es",
    IT = "it",
    DE = "de",
}

export type languageNameType = typeof LANGUAGES_NAME[keyof typeof LANGUAGES_NAME];


export type languageType = {
    name: string;
    key: LANGUAGES_NAME;
    flag: string;
}
