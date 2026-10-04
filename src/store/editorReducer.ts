import { UPDATE_DOCUMENT, APPLY_REMOTE_CHANGES, SET_LANGUAGE } from './actionTypes';

export interface EditorState {
  content: string;
  language: string;
}

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case UPDATE_DOCUMENT:
      return { ...state, content: action.payload };
    case APPLY_REMOTE_CHANGES:
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};