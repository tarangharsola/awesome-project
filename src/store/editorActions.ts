import { UPDATE_CONTENT, SET_LANGUAGE } from './actionTypes';

export const updateContent = (content: string) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});