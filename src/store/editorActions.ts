import { EditorActionTypes } from './actionTypes';

export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export interface UpdateContentAction {
  type: typeof UPDATE_CONTENT;
  payload: string;
}

export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export type EditorAction = UpdateContentAction | SetLanguageAction;

export const updateContent = (content: string): UpdateContentAction => ({
  type: UPDATE_CONTENT,
  payload: content,
});

export const setLanguage = (language: string): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});