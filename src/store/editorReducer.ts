import { UPDATE_CONTENT, SET_LANGUAGE } from './actionTypes';
import { EditorState } from '../types/editor';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export default function editorReducer(state = initialState, action: any): EditorState {
  switch (action.type) {
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
