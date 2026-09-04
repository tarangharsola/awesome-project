// src/types/editor.ts
export interface EditorState {
  content: string;
  language: string;
}

export interface UpdateContentAction {
  type: 'UPDATE_CONTENT';
  payload: string;
}

export interface SetLanguageAction {
  type: 'SET_LANGUAGE';
  payload: string;
}

export type EditorAction = UpdateContentAction | SetLanguageAction;