import { EditorAction } from './actionTypes';

export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const updateContent = (content: string): EditorAction => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setLanguage = (language: string): EditorAction => ({
  type: SET_LANGUAGE,
  payload: language,
});
