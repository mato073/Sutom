import React, { FormEvent, useCallback } from 'react';
import './index.scss';

import LanguagesDisplay from './components/languagesDisplay';


import germanyFlag from '../assets/icon/flags/germany.png';
import italyFlag from '../assets/icon/flags/italy.png';
import spainFlag from '../assets/icon/flags/spain.png';
import englishFlag from '../assets/icon/flags/united-kingdom.png';

import { notificationAction } from '../../utils/notificationAction';


const languages = [
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

interface Props {
    startGame: (difficulty: number, language: string, attempts: number) => void;
}

const Menu = ({ startGame }: Props) => {

    const [difficulty, setDifficulty] = React.useState<number>(4);
    const [attempts, setAttempts] = React.useState<number>(5);
    const [language, setLanguage] = React.useState<number>(0);


    const startGameWithOption = (event: FormEvent) => {
        event.preventDefault();
        startGame(difficulty, languages[language].key, attempts);
    }

    /*     const ok = React.useCallback(() => {
            language
        }, [props>])
     */
    return <div>
        <h1>Sutom</h1>
        <section>
            <div>
                <h2>How to Lingo</h2>
                <p>Guess the word by typing it in. You have 5 attempts to guess the word.</p>
            </div>
            <form onSubmit={startGameWithOption}>
                <div>
                    <h2>Difficulty</h2>
                    <p>Choose the difficulty of the game.</p>
                    <div>
                        <input checked={difficulty === 4} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={4} />
                        <label>{`Easy` + ": 4 leters"}</label>
                        <input checked={difficulty === 5} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={5} />
                        <label >{`Medium` + ": 5 leters"}</label>
                        <input checked={difficulty === 6} type="radio" onChange={(event) => setDifficulty(Number(event.target.value))} value={6} />
                        <label >{`Hard` + ": 6 leters"}</label>
                    </div>
                </div>
                <div>
                    <h2>Attempt</h2>
                    <p>Choose the number of attempts you have to guess the word.</p>
                    <select onChange={(event) => setAttempts(Number(event.target.value))} value={attempts}>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                    </select>
                </div>
                <div>
                    <h2>Languge</h2>
                    <p>Choose the language of the words.</p>
                    <div className='container-language'>
                        {
                            languages.map((item, index) => {
                                return <LanguagesDisplay index={index} item={item} setLanguage={setLanguage} language={language} />
                            }
                            )}
                    </div>
                </div>
                <div>
                    <button type="submit">
                        Start Game
                    </button>
                </div>
            </form>
        </section>
        <button onClick={() => notificationAction('success', 'Hello World')}>Test Notification</button>
    </div>
}

export default Menu;