import React from 'react';

import { languageType } from '../../../../types/language';

interface Props2 {
    index: number;
    item: languageType;
    setLanguage: (index: number) => void;
    language: number;
}

const LanguagesDisplay = React.memo<Props2>(({ index, item, setLanguage, language }) => {

    const setLanguageCallBack = React.useCallback(() => {
        setLanguage(index);
    }, [index, setLanguage])


    return (<div onClick={setLanguageCallBack} className={`container-language-flags ${Number(index) === language ? "active" : ""}`} key={index}>
        <img src={item.flag} />
    </div>)
})

export default LanguagesDisplay