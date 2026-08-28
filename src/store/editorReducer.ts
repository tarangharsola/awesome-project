import { SET_LANGUAGE } from './editorActions';
import { EditorState } from '../types/editor';

export const initialState: EditorState = {
  content: '',
  language: 'javascript',
  // other fields can be added here as needed
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    // other cases can be handled here
    default:
      return state;
  }
};