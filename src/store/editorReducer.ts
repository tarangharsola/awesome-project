import { AnyAction } from 'redux';

export interface EditorState {
  content: string;
  language: string;
}

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: AnyAction): EditorState => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};