import { EditorState } from '../types/editor';

type Action =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_USERS'; payload: string[] };

const initialState: EditorState = {
  content: '',
  language: 'javascript',
  // other editor state fields can be added here
};

export function editorReducer(state = initialState, action: Action): EditorState {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_USERS':
      // placeholder for future user handling
      return state;
    default:
      return state;
  }
}

export const setContent = (content: string) => ({ type: 'SET_CONTENT' as const, payload: content });
export const setLanguage = (language: string) => ({ type: 'SET_LANGUAGE' as const, payload: language });