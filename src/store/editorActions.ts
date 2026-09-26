// src/store/editorActions.ts
import { EditorActionTypes } from './actionTypes';

export const updateContent = (content: string) => ({
  type: EditorActionTypes.UPDATE_CONTENT,
  payload: content,
});

export const setLanguage = (language: string) => ({
  type: EditorActionTypes.SET_LANGUAGE,
  payload: language,
});

export const formatDocument = () => ({
  type: EditorActionTypes.FORMAT_DOCUMENT,
});
