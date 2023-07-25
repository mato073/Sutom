import React, { FormEvent, useCallback } from 'react';
import './index.scss';

import LanguagesDisplay from './components/languagesDisplay';
import Attempt from './components/attempt';

import { languageType, LANGUAGES_NAME, languageNameType } from '../../types/language';


import germanyFlag from '../assets/icon/flags/germany.png';
import italyFlag from '../assets/icon/flags/italy.png';
import spainFlag from '../assets/icon/flags/spain.png';
import englishFlag from '../assets/icon/flags/united-kingdom.png';


const languages: languageType[] = [
    {
        "name": "English",
        "key": LANGUAGES_NAME.EN,
        "flag": englishFlag
    },
    {
        "name": "Spanish",
        "key": LANGUAGES_NAME.ES,
        "flag": spainFlag
    },
    {
        "name": "Italian",
        "key": LANGUAGES_NAME.IT,
        "flag": italyFlag
    },
    {
        "name": "German",
        "key": LANGUAGES_NAME.DE,
        "flag": germanyFlag
    },
]

interface Props {
    startGame: (difficulty: number, language: languageNameType, attempts: number) => void;
}

const Menu = ({ startGame }: Props) => {

    const [difficulty, setDifficulty] = React.useState<number>(4);
    const [attempts, setAttempts] = React.useState<number>(5);
    const [language, setLanguage] = React.useState<languageNameType>(LANGUAGES_NAME.EN);

    const startGameCallback = useCallback((difficulty: number, language: languageNameType, attempts: number) => {
        startGame(difficulty, language, attempts);
    }, [startGame])

    const startGameWithOption = (event: FormEvent) => {
        event.preventDefault();
        startGameCallback(difficulty, language, attempts);
    }

    return <div className='menu'>
        <h1 className='menu__title'>Sutom</h1>
        <section>
            <div className='menu__rules'>
                <h2>How to Sutom</h2>
                <p>Attempt to guess the word by typing it using either your physical keyboard or the virtual onee provided.</p>
                <p>After entering your guess, click "ENTER" on your keyboard or<span className='green'>Validate</span></p>
                <p>Correctly guessed letters that are in the word but in the wrong position will be shown in yellow. <span className='yellow'>L</span></p>
                <p>Correctly guessed letters in the right position will be displayed in green.<span className='green'>L</span></p>
                <p>Incorrectly guessed letters will be shown in red.<span className='red'>L</span></p>
                <p>You have a limited number of attempts to guess the word.</p>
            </div>
            <form className='form' onSubmit={startGameWithOption}>
                <div className='form__difficulty'>
                    <h2>Difficulty</h2>
                    <p>Choose the difficulty of the game.</p>
                    <div className='form__difficulty__radios'>
                        <input checked={difficulty === 4} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={4} />
                        <label>{`Easy` + ": 4 leters"}</label>
                        <input checked={difficulty === 5} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={5} />
                        <label >{`Medium` + ": 5 leters"}</label>
                        <input checked={difficulty === 6} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={6} />
                        <label >{`Hard` + ": 6 leters"}</label>
                    </div>
                </div>
                <div className='form__attempt'>
                    <h2>Attempt</h2>
                    <p>Choose the number of attempts you have to guess the word.</p>
                    <div className='form__attempt__selection'>
                        <Attempt value={5} setAttempts={setAttempts} attempt={attempts} />
                        <Attempt value={6} setAttempts={setAttempts} attempt={attempts} />
                        <Attempt value={7} setAttempts={setAttempts} attempt={attempts} />
                    </div>
                </div>
                <div className='form__language'>
                    <h2>Languge</h2>
                    <p>Choose the language of the word.</p>
                    <div className='form__language__container'>
                        {
                            languages.map((item, index) => {
                                return <LanguagesDisplay key={index} index={index} item={item} setLanguage={setLanguage} language={language} />
                            }
                            )}
                    </div>
                </div>
                <div className='form__action'>
                    <button className='form__action__button' type="submit">
                        Start Game
                    </button>
                </div>
            </form>
        </section>
    </div>
}

export default Menu;