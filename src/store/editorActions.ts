import { SET_CONTENT, APPLY_REMOTE_CHANGES, SET_LANGUAGE } from './actionTypes';

export const setContent = (content: string) => ({
  type: SET_CONTENT,
  payload: content,
});

export const applyRemoteChanges = (changes: any) => ({
  type: APPLY_REMOTE_CHANGES,
  payload: changes,
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});