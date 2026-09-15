import { SET_CONTENT, SET_LANGUAGE, SetContentAction, SetLanguageAction } from './editorActions';
import { EditorState } from '../types/editor';

export type EditorAction = SetContentAction | SetLanguageAction;

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: EditorAction): EditorState => {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};