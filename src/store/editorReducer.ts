// src/store/editorReducer.ts
import { UPDATE_CONTENT, SET_CURSOR, SET_LANGUAGE } from './editorActions';

export interface EditorState {
  content: string;
  cursor: { line: number; ch: number } | null;
  language: string;
}

const initialState: EditorState = {
  content: '',
  cursor: null,
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case SET_CURSOR:
      return { ...state, cursor: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};