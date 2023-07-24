import React from 'react';

import { languageType } from '../../../../types/language';

interface Props2 {
    index: number;
    item: languageType;
    setLanguage: (lang: "en" | "es" | "it" | "de") => void;
    language: "en" | "es" | "it" | "de";
}

const LanguagesDisplay = React.memo<Props2>(({ index, item, setLanguage, language }) => {

    const setLanguageCallBack = React.useCallback(() => {
        const key = item.key;
        setLanguage(key);
    }, [index, setLanguage])


    return (<div onClick={setLanguageCallBack} className={`form__language__container__flags ${item.key === language ? "active" : ""}`} key={index}>
        <img src={item.flag} />
    </div>)
})

export default LanguagesDisplay