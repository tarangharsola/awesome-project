import { EditorState } from '../types/editor';
import { UPDATE_CONTENT, SET_LANGUAGE } from './editorActions';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
