import { languageNameType, LANGUAGES_NAME } from '../types/language';
import { notificationAction } from './notificationAction';
import axios from 'axios';

export const api = async (difficulty: number, language: languageNameType, attempt: number) => {
    try {

        const url = `https://random-word-api.herokuapp.com/word`;
        const params: { "length": number, "lang"?: string } = { "length": difficulty };
        if (language !== LANGUAGES_NAME.EN) params['lang'] = language;
        const { data } = await axios.get(url, {
            params: params
        });
        if (data.length === 0) notificationAction("Something went wrong", "error");
        return data[0];

    } catch (error) {
        console.log(error);
        notificationAction("Something went wrong", "error");
    }
}