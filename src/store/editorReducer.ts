import { UPDATE_CONTENT, SET_LANGUAGE } from '../store/actionTypes';
import { EditorState } from '../types/editor';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
  // other editor related state can be added here
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