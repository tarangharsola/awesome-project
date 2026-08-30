import { EditorState, Language } from '../types/editor';
import { SET_CONTENT, SET_LANGUAGE } from './editorActions';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload as Language };
    default:
      return state;
  }
};
