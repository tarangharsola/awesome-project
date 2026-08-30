import { Language } from '../types/editor';

export const SET_CONTENT = 'SET_CONTENT';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setContent = (content: string) => ({
  type: SET_CONTENT,
  payload: content,
});

export const setLanguage = (language: Language) => ({
  type: SET_LANGUAGE,
  payload: language,
});
