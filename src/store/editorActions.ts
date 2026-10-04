import { SET_LANGUAGE, UPDATE_DOCUMENT, APPLY_REMOTE_CHANGES } from './actionTypes';

export const updateDocument = (content: string) => ({
  type: UPDATE_DOCUMENT,
  payload: content,
});

export const applyRemoteChanges = (content: string) => ({
  type: APPLY_REMOTE_CHANGES,
  payload: content,
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});