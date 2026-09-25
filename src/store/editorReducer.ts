import { SET_LANGUAGE } from './editorActions';
import { EditorState } from '../types/editor';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    default:
      return state;
  }
};
