import React, { FormEvent, useCallback } from 'react';
import './index.scss';

import LanguagesDisplay from './components/languagesDisplay';

import { languageType } from '../../types/language';


import germanyFlag from '../assets/icon/flags/germany.png';
import italyFlag from '../assets/icon/flags/italy.png';
import spainFlag from '../assets/icon/flags/spain.png';
import englishFlag from '../assets/icon/flags/united-kingdom.png';


const languages: languageType[] = [
    {
        "name": "English",
        "key": "en",
        "flag": englishFlag
    },
    {
        "name": "Spanish",
        "key": "es",
        "flag": spainFlag
    },
    {
        "name": "Italian",
        "key": "it",
        "flag": italyFlag
    },
    {
        "name": "German",
        "key": "de",
        "flag": germanyFlag
    },
]

type languageTypeString = "en" | "es" | "it" | "de";

interface Props {
    startGame: (difficulty: number, language: "en" | "es" | "it" | "de", attempts: number) => void;
}

const Menu = ({ startGame }: Props) => {

    const [difficulty, setDifficulty] = React.useState<number>(4);
    const [attempts, setAttempts] = React.useState<number>(5);
    const [language, setLanguage] = React.useState<languageTypeString>("en");

    const startGameCallback = useCallback((difficulty: number, language: "en" | "es" | "it" | "de", attempts: number) => {
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
                <p>Guess the word by typing it in using your keyboard or the virtual one</p>
                <p>If your guess a letter corectly but not in the right place, it will be displayed in yellow. <span className='yellow'>L</span></p>
                <p>If your guess a letter corectly and in the right place, it will be displayed in green.<span className='green'>L</span></p>
                <p>If your guess a letter wrong, it will be displayed in red.<span className='red'>L</span></p>
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
                        <div onClick={() => setAttempts(5)} className={`form__attempt__selection__item ${attempts === 5 ? 'active' : ""}`}>
                            <span>5</span>
                        </div>
                        <div onClick={() => setAttempts(6)} className={`form__attempt__selection__item ${attempts === 6 ? 'active' : ""}`}>
                            <span>6</span>
                        </div>
                        <div onClick={() => setAttempts(7)} className={`form__attempt__selection__item ${attempts === 7 ? 'active' : ""}`}>
                            <span>7</span>
                        </div>
                    </div>
                </div>
                <div className='form__language'>
                    <h2>Languge</h2>
                    <p>Choose the language of the words.</p>
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