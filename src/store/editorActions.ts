// src/store/editorActions.ts
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const SET_CURSOR = 'SET_CURSOR';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const updateContent = (content: string) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setCursor = (position: { line: number; ch: number }) => ({
  type: SET_CURSOR,
  payload: position,
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});