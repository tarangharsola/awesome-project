import { UPDATE_CONTENT, SET_USERS, SET_LANGUAGE } from './actionTypes';

export const updateContent = (content: string) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setUsers = (users: any) => ({
  type: SET_USERS,
  payload: users,
});

// New action creator for language changes
export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});
