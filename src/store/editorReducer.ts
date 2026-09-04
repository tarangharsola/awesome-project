// src/store/editorReducer.ts
import { UPDATE_CONTENT, SET_LANGUAGE } from './editorActions';
import { EditorState, EditorAction } from '../types/editor';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: EditorAction): EditorState => {
  switch (action.type) {
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};