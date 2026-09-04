// src/store/editorActions.ts
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const updateContent = (content: string) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});