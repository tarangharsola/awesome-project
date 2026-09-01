import { EditorState } from '../types/editor';
import { INSERT_TEXT, DELETE_TEXT, SET_LANGUAGE, SYNC_DOCUMENT } from './actionTypes';

export const insertText = (position: number, text: string) => ({
  type: INSERT_TEXT,
  payload: { position, text },
});

export const deleteText = (position: number, length: number) => ({
  type: DELETE_TEXT,
  payload: { position, length },
});

export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: language,
});

// New action creator for syncing the entire document state after reconnection
export const syncDocument = (state: EditorState) => ({
  type: SYNC_DOCUMENT,
  payload: state,
});
